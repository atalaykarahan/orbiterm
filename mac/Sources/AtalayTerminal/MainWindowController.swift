import AppKit
import Combine
import SwiftUI

/// The single main screen: the live dashboard (plus an optional chats list). Every chat opens in its
/// own window over it; closing a chat window only hides it, Claude keeps running.
@MainActor
final class MainWindowController: NSWindowController, NSWindowDelegate {
    let engine: RadarEngine
    let sidebar = SidebarModel()
    let radar = RadarView()
    let overlay = OverlayController()
    /// Processes left burning a core where nobody sees them; the dashboard sounds the alarm.
    let runaways = Runaways()
    /// Source Control's files (FileEditor.swift): the ones the page may read and write.
    let files = FilesBridge()

    private var chats: [String: ChatWindowController] = [:]
    private var briefs: [String: SessionBrief] = [:]
    private var lastStatus: [String: String] = [:]
    private var lastWinOpen = ""
    /// The terminal window/pane the user touched last: its chat is the one the sidebar marks.
    private var activeTerminalWindow: String?
    /// The chats list is a panel of the dashboard's page (web/chats.js): its list is pushed from `sidebar` (a change, debounced),
    /// and ⌘B folds its saved chats there.
    private var chatsPush: [AnyCancellable] = []
    private var chatsJSON = ""
    private var chatsBridge: ChatsBridge?
    /// The page's top bar (its CSS px): the traffic lights sit in its middle.
    private var topBar: (top: Double, h: Double)?
    /// AppKit lays the title bar out again by itself (a resize, a key change): its frame is watched to put the lights back.
    private var titlebarObserver: NSObjectProtocol?
    private var placingLights = false
    /// A menu is open on the dashboard.
    private var modalOpen = false
    private var frameObserver: NSObjectProtocol?
    private var fontSize: CGFloat
    private var cascade = 0
    private var lastVisibility = ""
    /// Sessions to open once the engine has reported its first state (`--open-session` at launch).
    private var pendingOpen: [String] = []
    private var hasState = false

    /// The one dashboard window (the cloud bridge sets the terminal text size from a synced setting).
    static weak var shared: MainWindowController?

    init(engine: RadarEngine) {
        self.engine = engine
        UserDefaults.standard.register(defaults: ["sidebarHidden": false])
        let saved = UserDefaults.standard.double(forKey: "terminalFontSize")
        // Until the user picks a size here, their iTerm2 one.
        fontSize = saved >= 9 ? CGFloat(saved) : ITermLook.current?.fontSize ?? 13
        let window = NSWindow(contentRect: NSRect(x: 0, y: 0, width: 1480, height: 900),
                              styleMask: [.titled, .closable, .miniaturizable, .resizable, .fullSizeContentView], backing: .buffered, defer: false)
        window.title = "Orbiterm"
        // The title bar is the page's top bar: its content runs under it, the traffic lights sit in the bar (positionTrafficLights).
        window.titleVisibility = .hidden
        window.titlebarAppearsTransparent = true
        window.backgroundColor = Theme.bg
        window.appearance = NSAppearance(named: .darkAqua)
        window.minSize = NSSize(width: 980, height: 600)
        window.collectionBehavior = [.fullScreenPrimary]
        window.tabbingMode = .disallowed
        window.isReleasedWhenClosed = false
        window.center()
        window.setFrameAutosaveName("atalay-terminal.main")
        super.init(window: window)
        Self.shared = self
        window.delegate = self
        MessagePanel.dashboard = window
        NoteWindow.dashboard = window
        NoteWindow.radar = radar
        let git = GitBridge(engine: engine, terminalFolders: { [weak self] in self?.terminalFolders() ?? [] })
        // Open File in Source Control's ⋯ menu: the pick is the click that opens the file.
        git.onMenuPick = { [weak self] in self?.files.pressed() }
        radar.handleGit(git)
        radar.handleSpend(SpendBridge(engine: engine))
        radar.handleFiles(files)
        files.onOpen = { [weak self] url, line, cwd in self?.radar.openFile(url, line: line, column: nil, cwd: cwd) }
        files.repositories = { Git.listedRoots() }
        overlay.manager = self
        WorktreeShip.shared.manager = self
        buildLayout()
        wireEngine()
        sidebar.onRenamed = { [weak self] id in self?.chatRenamed(id) }
        // The AI's own /rename, newer than a name typed here: the typed one is dropped (ChatNames.noteCustom).
        NotificationCenter.default.addObserver(forName: ChatNames.superseded, object: nil, queue: .main) { [weak self] n in
            MainActor.assumeIsolated {
                // Not a name typed again meanwhile.
                guard let self, let id = n.object as? String, self.sidebar.customTitles[id] == n.userInfo?["name"] as? String else { return }
                self.sidebar.customTitles[id] = nil
                self.chatRenamed(id)
            }
        }
                MessagePanel.onOpenWait = { [weak self] sid in self?.openFromNotice(sid) }
        runaways.onChange = { [weak self] json in
            self?.radar.push("runaways", json)
            MessagePanel.notices.runaways(json)
            self?.pushTerminals()
        }
        MemoryWatch.shared.start(manager: self, runaways: runaways)
        observeVisibility()
        Mascot.shared.bind(manager: self)
        PowerSaver.shared.onChange = { [weak self] in self?.pushPower() }
        PowerSaver.shared.start()
        DiscordPresence.shared.onChange = { [weak self] in self?.pushDiscord() }
        DiscordPresence.shared.start()
        NotificationCenter.default.addObserver(self, selector: #selector(themeChanged), name: ThemeStore.changed, object: nil)
        let t = Timer(timeInterval: 2, repeats: true) { [weak self] _ in
            MainActor.assumeIsolated {
                // A Claude session at work is work (Activity, for XP); so is a busy job in a terminal (pushTerminals).
                if self?.briefs.values.contains(where: { $0.live && $0.status == "busy" }) == true { Activity.work() }
                // Which AI tools were at work, for their badges: Claude's sessions, and the others by name ("ai:…").
                for b in self?.briefs.values ?? [:].values where b.live && b.status == "busy" {
                    Activity.toolAtWork(b.id.hasPrefix("ai:") ? b.name : "claude", pid: b.pid)
                }
                self?.pushTerminals()
                // How long since the last input anywhere on the Mac: the orbit's cinematic camera waits for five
                // minutes of it, and typing in a terminal window counts.
                let idle = Social.idleSeconds()
                self?.radar.push("idle", String(format: "%.1f", idle))
                Mascot.shared.updateIdle(idle)
            }
        }
        t.tolerance = 0.5
        RunLoop.main.add(t, forMode: .common)
        // The deleted chats whose 30 days are over go from the disk: a minute after the app starts, then every hour.
        let trash = Timer(timeInterval: 3600, repeats: true) { [weak self] _ in
            MainActor.assumeIsolated { self?.sidebar.emptyExpiredTrash() }
        }
        trash.tolerance = 60
        RunLoop.main.add(trash, forMode: .common)
        DispatchQueue.main.asyncAfter(deadline: .now() + 60) { [weak self] in self?.sidebar.emptyExpiredTrash() }
    }

    required init?(coder: NSCoder) { fatalError("not used") }

    // MARK: layout

    private func buildLayout() {
        guard let window else { return }
        let root = NSView()
        root.wantsLayer = true
        root.layer?.backgroundColor = Theme.bg.cgColor
        window.contentView = root

        let actions = SidebarActions(
            open: { [weak self] in self?.userOpenSession($0) },
            fork: { [weak self] in self?.userOpenSession($0, fork: true) },
            newTerminal: { [weak self] in self?.newTerminal(in: $0) },
            newWorktree: { [weak self] in self?.overlay.showNewWorktree(from: $0) },
            ship: { [weak self] id, top in WorktreeShip.shared.handle(id, top: top, from: self?.shipWindow(for: top)) },
            reveal: { NSWorkspace.shared.open(URL(fileURLWithPath: $0)) },
            copyId: {
                NSPasteboard.general.clearContents()
                NSPasteboard.general.setString($0, forType: .string)
            },
            delete: { [weak self] in self?.deleteChats($0) ?? false },
            openTerminal: { [weak self] in self?.openTerminal($0) },
            endTerminal: { [weak self] in self?.endTerminal($0) },
            openFolder: { [weak self] done in self?.openFolder(done: done) ?? done(false) })
        // The chats list is a panel of the dashboard's page (web/chats.js): the page asks, the bridge does.
        let bridge = ChatsBridge(model: sidebar, actions: actions)
        bridge.onReady = { [weak self] in self?.chatsReady() }
        bridge.onClosed = { on in UserDefaults.standard.set(on, forKey: "sidebarHidden") }
        chatsBridge = bridge
        radar.handleChats(bridge)
        radar.handleArchive(ArchiveBridge(model: sidebar))
        radar.handleTrash(TrashBridge(model: sidebar) { [weak self] title, text in
            self?.ask(title, text, ["Delete", "Cancel"], style: .warning) == 0
        })
        // A deleted chat's files are gone: the list is read again now, not at the engine's next look.
        sidebar.onErased = { [weak self] in self?.engine.refreshHistorySoon() }
        // The list follows its model (and the worktrees' state): pushed to the page a moment after a change.
        let changed: [AnyPublisher<Void, Never>] = [
            sidebar.objectWillChange.map { _ in () }.eraseToAnyPublisher(),
            WorktreeShip.shared.objectWillChange.map { _ in () }.eraseToAnyPublisher(),
        ]
        chatsPush = changed.map {
            $0.debounce(for: .milliseconds(100), scheduler: RunLoop.main).sink { [weak self] in self?.pushChats() }
        }

        // The page fills the window: the chats list is one of its panels.
        let web = radar.webView
        web.translatesAutoresizingMaskIntoConstraints = false
        root.addSubview(web)
        NSLayoutConstraint.activate([
            web.topAnchor.constraint(equalTo: root.topAnchor),
            web.leadingAnchor.constraint(equalTo: root.leadingAnchor),
            web.trailingAnchor.constraint(equalTo: root.trailingAnchor),
            web.bottomAnchor.constraint(equalTo: root.bottomAnchor),
        ])
        // The page centres its menus on the whole window, so it needs how far right of the window's edge it starts (nothing
        // sits left of it now) in its own px; the text size changes the px.
        radar.webView.postsFrameChangedNotifications = true
        frameObserver = NotificationCenter.default.addObserver(forName: NSView.frameDidChangeNotification, object: radar.webView, queue: .main) { [weak self] _ in
            MainActor.assumeIsolated {
                self?.pushSide()
                self?.positionTrafficLights()
            }
        }
        radar.onMessage = { [weak self] in self?.handleRadar($0) }
        Cloud.shared.onChange = { [weak self] _ in
            self?.pushCloud()
            DiscordPresence.shared.refresh()
        }
        // Friends and messages: the dashboard (menu, badges) and both message panels hear every live event. Your own
        // XP changing (the daily bonus, a new level) also updates what Cloud knows, so the top bar shows it at once.
        Social.shared.onEvent = { [weak self] json in
            self?.radar.push("social", json)
            MessagePanel.notices.push(json)
            MessagePanel.pushToChats(json)
            Mascot.shared.onSocialJSON(json)
            if json.contains(#""type":"xp""#) { Cloud.shared.apply(xpEvent: json) }
        }
        // The "update available" notice was clicked: the dashboard in front, on its "what's new" screen.
        MessagePanel.onOpenUpdate = { [weak self] in
            self?.showDashboard()
            self?.radar.push("openUpdate", "null")
        }
        // The "updated" note was clicked: the dashboard in front, on the notes of the version you're on.
        MessagePanel.onOpenWhatsNew = { [weak self] in self?.openWhatsNew("notes") }
        // The daily bonus notice was clicked: the dashboard in front, on your profile.
        MessagePanel.onOpenProfile = { [weak self] in
            self?.showDashboard()
            self?.radar.push("openProfile", "null")
        }
        // A shared note's invite was accepted in a notice: the dashboard in front, and that note opened in its window.
        MessagePanel.onOpenShared = { [weak self] id in
            self?.showDashboard()
            self?.radar.callNotes("window.Notes && Notes.openShared && Notes.openShared(id)", ["id": id])
        }
        // A friend's picture or name was clicked in the chat: the dashboard in front, on the friends with their card.
        MessagePanel.onOpenFriend = { [weak self] id in
            guard let data = try? JSONSerialization.data(withJSONObject: [id]), let list = String(data: data, encoding: .utf8) else { return }
            self?.showDashboard()
            self?.radar.push("openFriend", String(list.dropFirst().dropLast()))
        }
        // A notification from the developer was clicked: the dashboard in front, on the notifications.
        MessagePanel.onOpenNotifications = { [weak self] in
            self?.showDashboard()
            self?.radar.push("openView", "\"notifications\"")
        }
        // The "same file" notice: the dashboard in front, on its panels (files.heat names the file).
        MessagePanel.onOpenClash = { [weak self] in
            self?.showDashboard()
            self?.radar.push("openView", "\"dash\"")
        }
        // The danger alarm's Details: the dashboard in front, its engine-failure panel open.
        MessagePanel.onOpenDanger = { [weak self] in
            self?.showDashboard()
            self?.radar.push("openDanger", "null")
        }
        MessagePanel.onEndRunaway = { [weak self] pid, started in self?.runaways.end(pid: pid, started: started) }
        // Fire back (or its Cancel) pressed on the card or in a chat: the dashboard page presses its own 🚀 for that friend.
        MessagePanel.onAttackFire = { [weak self] id in
            self?.radar.callNotes("window.Attack && Attack.press && Attack.press(id); return true", ["id": id])
        }
        MessagePanel.onAttackCancel = { [weak self] id in
            self?.radar.callNotes("window.Attack && Attack.cancelFor && Attack.cancelFor(id); return true", ["id": id])
        }
    }

    // MARK: engine

    private func wireEngine() {
        engine.onInit = { [weak self] js in
            self?.radar.push("init", js)
            self?.pushWinOpen(force: true)
            self?.pushSide()
        }
        engine.onState = { [weak self] js, list in
            guard let self else { return }
            if !js.isEmpty { self.radar.push("state", js) }
            self.apply(list)
        }
        engine.onEvents = { [weak self] js in self?.radar.push("events", js) }
        engine.onNativeEvents = { [weak self] events in self?.route(events) }
        engine.onHistory = { [weak self] items in self?.sidebar.items = items }
    }

    private func handleRadar(_ msg: [String: Any]) {
        switch msg["type"] as? String {
        case "ready":
            // A reloaded page has no menu open.
            for c in chats.values { c.stepBack() }
            MessagePanel.stepAside(false)
            NoteWindow.stepAside(false)
            modalOpen = false
            // A reloaded page starts its feed over: lines from the old one would never dissolve.
            FeedPanel.clearIfCreated()
            engine.requestInit()
            lastVisibility = ""
            dashboardVisibilityChanged()
            pushPower(force: true)
            pushDiscord()
            pushMcp()
            pushCloud()
            terminalsJSON = ""
            pushTerminals()
            radar.push("runaways", runaways.json)
            // The chats list's panel draws once the page's script is up (this is its "ready").
            chatsReady()
            Cleanup.shared.viewChanged(open: false)
            Cleanup.shared.pushPrefs()
            MemoryWatch.shared.pushMemory(force: true)
        // Power save: the switch on the map, and Settings' "on by itself at low battery".
        // Clean Up (Cleanup.swift, web/cleanup.js): the view opened or closed, the list asked for, the run and what goes with it.
        case "cleanupOpen": showCleanup()
        case "cleanupView": Cleanup.shared.viewChanged(open: msg["open"] as? Bool == true)
        case "cleanupList": Cleanup.shared.pushList(force: true)
        case "cleanupRun", "cleanupRetry": Cleanup.shared.run(msg["items"] as? [[String: Any]] ?? [])
        case "cleanupHalt": Cleanup.shared.halt()
        case "cleanupDismiss": MemoryWatch.shared.dismiss()
        case "cleanupLog": Cleanup.shared.showLog()
        case "cleanupPrefs": Cleanup.shared.setPrefs(msg)
        case "openActivityMonitor": Cleanup.openActivityMonitor()
        case "powerSave": PowerSaver.shared.choose(msg["on"] as? Bool == true)
        case "powerSaveAuto": PowerSaver.shared.setAuto(msg["on"] as? Bool == true)
        // Settings · DISCORD: what you're doing on your Discord profile, and the project's name in it.
        case "discordPresence": DiscordPresence.shared.setEnabled(msg["on"] as? Bool == true)
        case "discordProject": DiscordPresence.shared.setShowProject(msg["on"] as? Bool == true)
        case "discordActive": DiscordPresence.shared.setShowActive(msg["on"] as? Bool == true)
        case "open": if let sid = msg["sid"] as? String { userOpenSession(sid) }
        case "fork": if let sid = msg["sid"] as? String { userOpenSession(sid, fork: true) }
        case "newTerminal": overlay.showNewTerminal()
        case "newWorktree": overlay.showNewTerminal(worktree: true)
        case "openTerminal": if let id = msg["id"] as? String { openTerminal(id) }
        case "endLeftover":
            if let pid = (msg["pid"] as? NSNumber)?.int32Value, let started = (msg["started"] as? NSNumber)?.doubleValue {
                runaways.endLeft(pid: pid, started: started)
            }
        case "endSession": if let sid = msg["sid"] as? String { endSession(sid) }
        case "endRunaway":
            if let pid = (msg["pid"] as? NSNumber)?.int32Value, let started = (msg["started"] as? NSNumber)?.doubleValue {
                runaways.end(pid: pid, started: started)
            }
        // A menu (friends, settings, an update) opened or closed on the dashboard.
        case "modal":
            let open = msg["open"] as? Bool == true
            for c in chats.values { open ? c.stepAside() : c.stepBack() }
            MessagePanel.stepAside(open)
            NoteWindow.stepAside(open)
            modalOpen = open
        // Streamer mode (the switch on the map): the chats list and the chat windows show made-up names too.
        case "streamer":
            let on = msg["on"] as? Bool == true
            Streamer.on = on
            sidebar.streamer = on
            for c in chats.values { c.setStreamer(on) }
            NoteWindow.setStreamer(on)
        // A note out of the dashboard in its own window (NoteWindow), closed from the dashboard, and the dashboard's notes
        // loaded (the notes left out at the last quit come back, a reloaded page learns which are out).
        case "noteWindow": if let id = msg["id"] as? String { NoteWindow.show(id: id) }
        case "noteWindowClose":
            if let id = msg["id"] as? String {
                NoteWindow.close(id: id, flush: msg["flush"] as? Bool != false, deleted: msg["deleted"] as? Bool == true)
            }
        case "notesReady": NoteWindow.notesReady()
        // A note hidden from AI or shown again (the dashboard's page): its window, if out, is told.
        case "noteAiHidden": if let id = msg["id"] as? String { NoteWindow.setAiHidden(id: id, on: msg["on"] as? Bool == true) }
        case "log": NSLog("dashboard page: %@", String(describing: msg["msg"] ?? ""))
        // The window has no title bar of its own: the page's top bar is it. Its height (CSS px) places the traffic lights, and a
        // press on its empty part drags the window.
        case "topBar":
            if let top = (msg["top"] as? NSNumber)?.doubleValue, let h = (msg["h"] as? NSNumber)?.doubleValue {
                topBar = (top, h)
                positionTrafficLights()
            }
        case "dragWindow":
            guard let w = window, let event = NSApp.currentEvent, event.type == .leftMouseDown, event.window === w else { return }
            // Terminals still free since a minimize join first, so they ride this drag (only those it moves nothing for).
            rejoinRiders()
            w.performDrag(with: event)
            // The release of that press goes to the drag, not the page: it gets one, or it would go on as a held button (a
            // move would select the bar's text).
            if let up = NSEvent.mouseEvent(with: .leftMouseUp, location: event.locationInWindow, modifierFlags: event.modifierFlags,
                                           timestamp: ProcessInfo.processInfo.systemUptime, windowNumber: w.windowNumber, context: nil,
                                           eventNumber: event.eventNumber, clickCount: event.clickCount, pressure: 0) {
                radar.webView.mouseUp(with: up)
            }
        // A double-click on it, as on the title bar it replaces: what System Settings › Desktop & Dock says one does (zoom).
        case "titleDoubleClick":
            guard let w = window, !w.styleMask.contains(.fullScreen) else { return }
            switch UserDefaults.standard.string(forKey: "AppleActionOnDoubleClick") {
            case "Minimize": w.miniaturize(nil)
            case "None": break
            default: w.zoom(nil)
            }
        // Two chats began (or stopped) writing the same file (files.heat): the corner's notice.
        case "clash":
            guard let key = msg["key"] as? String, !key.isEmpty else { return }
            MessagePanel.notices.clash(["key": key, "file": msg["file"] as? String ?? "", "path": msg["path"] as? String ?? "",
                                        "chats": msg["chats"] as? [String] ?? []])
        case "clashOver": if let key = msg["key"] as? String { MessagePanel.notices.clashOver(key) }
        // A friend's spaceship attack (attack.js): its DANGER banner, over whatever is in front.
        case "attack": MessagePanel.notices.attack(msg)
        // The 🚀 button's state for a friend (attack.js): the who-fired-at-me card and the chats draw Fire back from it.
        case "attackBtn": MessagePanel.attackBtn(msg)
        // The community feed's lines (community.js decides; the panel at the screen's corner draws).
        case "feedLine":
            guard let id = msg["id"] as? String, let kind = msg["kind"] as? String, let html = msg["html"] as? String else { return }
            FeedPanel.shared.add(id: id, kind: kind, html: html)
        case "feedOut": if let id = msg["id"] as? String { FeedPanel.shared.out(id: id) }
        case "feedClear": FeedPanel.shared.clear()
        // The bell's "Replay animation" (inbox.js): a badge's reveal again, over whatever is in front.
        case "badgeReveal":
            guard let id = msg["id"] as? String, !id.isEmpty, id.count <= 64 else { return }
            MessagePanel.notices.replayBadge(id: id, tier: min(max((msg["tier"] as? NSNumber)?.intValue ?? 1, 1), 99))
        // What's new and the tips (cloud.js, whatsnew.js): the page asks for what it can't know, and says when the notes
        // of the version that came by itself were opened (the notifications stop counting them).
        case "whatsNew": pushWhatsNew()
        case "whatsNewRead": UserDefaults.standard.removeObject(forKey: Self.whatsNewKey)
        case "mascotThemeGuard":
            Mascot.shared.onThemeChooserOpened()
        case "worktreeNudge":
            WorktreeNudge.enabled = (msg["on"] as? NSNumber)?.boolValue ?? true
            if !WorktreeNudge.enabled { for c in chats.values { c.hud.nudge = nil } }
        case "chatWindowsFree":
            ChatWindows.free = (msg["on"] as? NSNumber)?.boolValue ?? false
            for c in chats.values { c.applyFree() }
        case "mascotEnabled":
            Mascot.isEnabled = (msg["on"] as? NSNumber)?.boolValue ?? false
        // Viktoria's download (Themes row, Settings > Appearance): get, stop, or remove her files.
        case "mascotGet": MascotAsset.shared.get()
        case "mascotCancel": MascotAsset.shared.cancel()
        case "mascotRemove": MascotAsset.shared.remove()
        case "mascotMischief":
            Mascot.shared.setMischief((msg["level"] as? NSNumber)?.intValue ?? 3)
        case "mascotPanels":
            Mascot.shared.updateWebPanels(
                msg["panels"] as? [[String: Any]] ?? [],
                friends: msg["friends"] as? [String: Any],
                nav: msg["nav"] as? [[String: Any]] ?? []
            )
        default: break
        }
    }

    /// Tells the page how far right of the window's edge it starts (the chat list and the divider), in its px: the text
    /// size zooms the page, so the same points are fewer px. Its menus use it to sit in the middle of the whole window.
    func pushSide() {
        let web = radar.webView
        let px = Int((web.frame.minX / web.pageZoom).rounded())
        web.evaluateJavaScript("document.documentElement.style.setProperty('--side-x','\(px)px'); true", completionHandler: nil)
        Mascot.shared.refreshPlatforms()
    }

    // MARK: the chats list (a panel of the page, web/chats.js)

    /// The list as the page draws it, pushed when it changed.
    func pushChats(force: Bool = false) {
        let json = sidebar.snapshotJSON()
        if json == chatsJSON && !force { return }
        chatsJSON = json
        radar.push("chats", json)
    }

    /// The page (a load or a reload) asked for its list: the list, and whether its saved chats are folded (⌘B).
    private func chatsReady() {
        pushChats(force: true)
        radar.push("chatsFold", UserDefaults.standard.bool(forKey: "sidebarHidden") ? "true" : "false")
        pushFullScreen()
    }

    /// Full screen has no traffic lights in the top bar (they come down with the menu bar): the page drops their room.
    private func pushFullScreen() {
        let on = window?.styleMask.contains(.fullScreen) == true
        radar.webView.evaluateJavaScript("document.documentElement.classList.toggle('mac-full', \(on)); true", completionHandler: nil)
    }

    /// The traffic lights in the middle of the page's top bar (the window has no title bar of its own), 21 px from the left
    /// as the mock has them. AppKit lays them out again on a resize: this puts them back.
    func positionTrafficLights() {
        guard !placingLights, let w = window, !w.styleMask.contains(.fullScreen), let close = w.standardWindowButton(.closeButton),
              let mini = w.standardWindowButton(.miniaturizeButton), let zoom = w.standardWindowButton(.zoomButton),
              let container = close.superview?.superview, let bar = topBar else { return }
        placingLights = true
        defer { placingLights = false }
        if titlebarObserver == nil {
            container.postsFrameChangedNotifications = true
            titlebarObserver = NotificationCenter.default.addObserver(forName: NSView.frameDidChangeNotification, object: container, queue: .main) { [weak self] _ in
                MainActor.assumeIsolated { self?.positionTrafficLights() }
            }
        }
        let z = Double(radar.webView.pageZoom)
        // Where the bar's middle is, from the window's top, in points.
        let middle = CGFloat((bar.top + bar.h / 2) * z)
        let height = max(28, (middle * 2).rounded())
        let frameHeight = container.superview?.frame.height ?? w.frame.height
        if abs(container.frame.height - height) > 0.5 || abs(container.frame.minY - (frameHeight - height)) > 0.5 {
            container.frame = NSRect(x: container.frame.minX, y: frameHeight - height, width: container.frame.width, height: height)
        }
        for (i, b) in [close, mini, zoom].enumerated() {
            let at = NSPoint(x: 20 + CGFloat(i) * 20, y: ((height - b.frame.height) / 2).rounded())
            if b.frame.origin != at { b.setFrameOrigin(at) }
        }
    }

    func windowDidResize(_ notification: Notification) { positionTrafficLights() }

    /// Chat windows ride the dashboard as its child windows, and AppKit takes a minimized parent's children into the Dock
    /// with it. Minimizing the dashboard must not hide a terminal on screen, so they let go first and stay where they are.
    private var ridersToRejoin = Set<String>()
    func windowWillMiniaturize(_ notification: Notification) {
        guard let dash = window else { return }
        for (id, c) in chats where c.detachForDashboardMinimize(dash) { ridersToRejoin.insert(id) }
    }

    func windowDidDeminiaturize(_ notification: Notification) { rejoinRiders() }

    /// The terminals that let go for a minimize ride the dashboard again, each only when that moves nothing. AppKit orders a
    /// parent and its children as one group, and attaching a child orders that group: pinned the moment the dashboard came
    /// back from the Dock (Orbiterm not the active app yet, Chrome clicked meanwhile) with the terminal behind Chrome, it took
    /// the restored dashboard down behind Chrome. So a terminal pins only while Orbiterm is the active app and with no other
    /// app's window between it and the dashboard: one right under the restored dashboard comes back on top of it, one behind
    /// another app stays there, free. Those are asked again at the next chance: the app comes forward, the dashboard or a
    /// terminal gets the keyboard, the dashboard is dragged.
    @objc func rejoinRiders() {
        ridersToRejoin = ridersToRejoin.filter { id in
            guard let c = chats[id], let w = c.window else { return false }
            // Pinned again some other way (a card, a menu closing, its own Dock trip), closed, or pinned on top: done here.
            return w.parent == nil && c.isShown && c.hud.attached
        }
        guard !ridersToRejoin.isEmpty, NSApp.isActive, let dash = window, dash.isVisible, !dash.isMiniaturized else { return }
        // An ordering reaches the window server when the run loop turn ends; the list must see this turn's (a click's).
        CATransaction.flush()
        let me = Int(ProcessInfo.processInfo.processIdentifier)
        let info = CGWindowListCopyWindowInfo([.optionOnScreenOnly, .excludeDesktopElements], kCGNullWindowID) as? [[String: Any]] ?? []
        // The list is one stack for every display, and a terminal rides only on the dashboard's: Chrome used on the other
        // display meanwhile sat between them and kept a terminal buried under the restored dashboard, though the pin moves
        // nothing anyone sees there. (Quartz's frames count from the main display's top left, downwards.)
        let main = NSScreen.screens.first?.frame ?? .zero
        let display = dash.screen.map { CGRect(x: $0.frame.minX, y: main.maxY - $0.frame.maxY, width: $0.frame.width, height: $0.frame.height) } ?? .infinite
        // Normal-level windows, front to back, and whether each may sit between a terminal and the dashboard: Orbiterm's, or
        // another app's that is wholly on another display.
        let stack = info.filter { $0[kCGWindowLayer as String] as? Int == 0 }.map { w -> (number: Int, ours: Bool) in
            let bounds = (w[kCGWindowBounds as String] as? NSDictionary).flatMap { CGRect(dictionaryRepresentation: $0 as CFDictionary) } ?? .infinite
            return (w[kCGWindowNumber as String] as? Int ?? 0, w[kCGWindowOwnerPID as String] as? Int == me || !bounds.intersects(display))
        }
        guard let d = stack.firstIndex(where: { $0.number == dash.windowNumber }) else { return }
        let riders = ridersToRejoin.compactMap { id -> (id: String, chat: ChatWindowController, at: Int)? in
            guard let c = chats[id], let n = c.window?.windowNumber, let at = stack.firstIndex(where: { $0.number == n }) else { return nil }
            return (id, c, at)
        }
        // Each pin goes on top of the dashboard's other children: back one first, so overlapping terminals keep their stacking.
        for r in riders.sorted(by: { $0.at > $1.at }) where stack[min(r.at, d) + 1 ..< max(r.at, d)].allSatisfy(\.ours) {
            if r.chat.repinAfterDashboardRestore() { ridersToRejoin.remove(r.id) }
        }
    }

    func windowWillEnterFullScreen(_ notification: Notification) {
        radar.webView.evaluateJavaScript("document.documentElement.classList.add('mac-full'); true", completionHandler: nil)
    }

    /// Back from full screen AppKit puts the title bar back as its own: the lights go to the top bar's middle again.
    func windowDidExitFullScreen(_ notification: Notification) {
        pushFullScreen()
        positionTrafficLights()
    }

    // MARK: what's new and tips

    /// The build whose notes stay unread in the notifications, set when the app finds it updated itself (AppDelegate).
    static let whatsNewKey = "whatsNewUnread"
    /// The shortcut wheel was opened at least once: its tip on the dashboard is only for someone who never did.
    private static let wheelUsedKey = "tipUsedWheel"

    /// Help → What's New ("notes") or Tips ("tips"), and the "updated" note's click: the dashboard in front, the window open.
    func openWhatsNew(_ what: String) {
        showDashboard()
        radar.push("whatsNew", what == "tips" ? #"{"open":"tips"}"# : #"{"open":"notes"}"#)
    }

    /// The app menu's Settings…: the dashboard in front, Settings open on the category used last (web/cloud.js).
    func openSettings() {
        showDashboard()
        radar.push("openSettings", "null")
    }

    /// Help → Keyboard Shortcuts: the dashboard in front, the list of every shortcut over it (web/cheatsheet.js).
    /// Pressed again on the dashboard it closes the list; from a chat window it always opens it.
    func openShortcutList() {
        let front = window?.isKeyWindow == true
        showDashboard()
        radar.push("openShortcuts", front ? "true" : "false")
    }

    /// The overlay opened the shortcut wheel (Overlay.showShortcuts).
    func wheelOpened() {
        guard !UserDefaults.standard.bool(forKey: Self.wheelUsedKey) else { return }
        UserDefaults.standard.set(true, forKey: Self.wheelUsedKey)
        pushWhatsNew()
    }

    private func pushWhatsNew() {
        let unread = UserDefaults.standard.integer(forKey: Self.whatsNewKey)
        let state: [String: Any] = ["unread": unread > 0 && unread == Cloud.shared.build, "wheel": UserDefaults.standard.bool(forKey: Self.wheelUsedKey)]
        guard let data = try? JSONSerialization.data(withJSONObject: ["state": state]), let json = String(data: data, encoding: .utf8) else { return }
        radar.push("whatsNew", json)
    }

    /// A dashboard card's red button (the page asked already): Claude stops wherever it runs, and the card goes. A chat in
    /// one of our windows ends like its End button; elsewhere (iTerm2, a split pane) Claude gets SIGTERM.
    func endSession(_ sid: String) {
        guard let b = briefs[sid], b.live, let pid = b.pid else { return dismiss(sessionId: sid, pid: nil) }
        if let name = Detached.sessionName(hosting: pid) {
            if let c = chats.values.first(where: { $0.detached?.name == name }) { return c.endChat(confirm: false) }
        }
        // Another AI tool ends with all it started (Codex's launcher left its own binary running, a new planet).
        for p in (sid.hasPrefix("ai:") ? Self.tree([pid]).reversed() : [pid]) { kill(p, SIGTERM) }
        dismiss(sessionId: sid, pid: pid)
    }

    /// The window showing the session `name`: as its own terminal or in one of its tabs and split panes. A session is shown in
    /// one place only, so whatever opens a window for a live one asks first.
    func window(showing name: String) -> ChatWindowController? {
        chats.values.first { $0.detached?.name == name || $0.extras.contains { $0.link?.name == name } }
    }

    /// The window is one of the open ones (not removed while its session lived on).
    func isOpen(_ c: ChatWindowController) -> Bool { chats[c.id] === c }

    private func chat(for brief: SessionBrief) -> ChatWindowController? {
        if let tab = brief.tab, let c = chats[tab] { return c }
        return chats.values.first(where: { $0.sessionId == brief.id && !$0.hud.exited })
    }

    /// Sessions an older build left running in detached screen sessions come back attached, so no conversation or terminal
    /// is lost; the sessions of an update's restart or a crash (the snapshot) start again in a pty of their own, the AI in
    /// them resumed (SessionSnapshot).
    func restoreSessions() {
        let registry = engine.registry
        // Read now, before the first engine state rewrites it (writeSnapshot waits for the restore below).
        let snapshot = SessionSnapshot.read()
        // The previous run died within a minute of restoring (the key is cleared a minute after a restore): resuming the
        // AI again could loop, so the sessions come back as plain shells.
        let defaults = UserDefaults.standard
        let loop = snapshot != nil && defaults.object(forKey: Self.restoreKey) != nil
        if snapshot != nil {
            defaults.set(Date().timeIntervalSince1970, forKey: Self.restoreKey)
            DispatchQueue.main.asyncAfter(deadline: .now() + 60) { UserDefaults.standard.removeObject(forKey: Self.restoreKey) }
        } else {
            defaults.removeObject(forKey: Self.restoreKey)
        }
        DispatchQueue.global(qos: .utility).async {
            let legacy = Detached.runningSessions(registry: registry)
            let elsewhere: Set<String> = snapshot.map { $0.reason == "update" ? [] : Self.runningElsewhere($0, registry: registry) } ?? []
            DispatchQueue.main.async { [weak self] in
                guard let self else { return }
                let running = (snapshot.map { self.startRestored($0, elsewhere: elsewhere, loop: loop) } ?? []) + legacy
                // Everything comes back hidden, so a launch doesn't throw windows on screen: chats are hexagons on the
                // orbit and in the sidebar, terminals flying (or parked) cars, and a click on one opens its window.
                // A window's tabs and split panes (sessions named after the window's) go back into it.
                // Closed tabs opened into windows of their own come back as windows.
                self.standalone.formIntersection(running.map(\.name))
                self.saveStandalone()
                let panes = running.compactMap { s in self.standalone.contains(s.name) ? nil : Detached.extraInfo(s.name).map { (s, $0) } }
                for s in running where (Detached.extraInfo(s.name) == nil || self.standalone.contains(s.name))
                    && self.window(showing: s.name) == nil {
                    self.openWindow(cwd: s.cwd, claudeArgs: s.claude ? [] : nil, sessionId: s.sessionId, title: s.title,
                                    detached: DetachedLink(name: s.name), show: false, restored: true)
                }
                // A parked one stays a car on the orbit.
                for (s, info) in panes where self.parked[s.name] == nil && !self.chats.values.contains(where: { c in c.extras.contains { $0.link?.name == s.name } }) {
                    if let c = self.chats.values.first(where: { $0.detached?.name == info.parent }) {
                        c.adoptPane(session: s.name, kind: info.kind, cwd: s.cwd, focus: false)
                    } else if self.window(showing: s.name) == nil {
                        // Its window's session is gone: on its own.
                        self.openWindow(cwd: s.cwd, claudeArgs: s.claude ? [] : nil, sessionId: s.sessionId, title: s.title,
                                        detached: DetachedLink(name: s.name), show: false, restored: true)
                    }
                }
                self.snapshotReady = true
                self.writeSnapshot()
            }
        }
    }

    /// The snapshot's sessions start again, each in a pty of its own with what it showed (the scrollback an update's restart
    /// kept) and a dimmed note on top: why, and whether its AI chat resumes. After a crash a conversation that still runs
    /// somewhere (`elsewhere`) isn't resumed a second time (Claude would fork it): a plain shell then.
    private func startRestored(_ snapshot: SessionSnapshot, elsewhere: Set<String>, loop: Bool) -> [Detached.RunningSession] {
        var out: [Detached.RunningSession] = []
        let why = loop ? "Orbiterm closed again right after restoring, so this chat wasn't resumed."
            : snapshot.reason == "update" ? "Orbiterm restarted to update." : "Orbiterm closed unexpectedly."
        for e in snapshot.sessions where e.name.hasPrefix(Detached.prefix) && Sessions.live[e.name] == nil {
            var isDir: ObjCBool = false
            let cwd = FileManager.default.fileExists(atPath: e.cwd, isDirectory: &isDir) && isDir.boolValue ? e.cwd : HOME
            var args: [String]?
            var resumed: SessionSnapshot.AI?
            var what = " What ran in this terminal stopped."
            if let a = e.ai {
                let names = ["claude": "Claude", "codex": "Codex", "agy": "Antigravity", "cursor": "Cursor"]
                switch a.tool {
                case "claude": args = ["--resume", a.id]
                case "codex": args = ["codex", "resume", a.id]
                case "agy": args = ["agy", "--conversation", a.id]
                case "cursor": args = ["cursor-agent", "--resume", a.id]
                default: break
                }
                if args != nil, loop {
                    // Said how to resume it by hand instead.
                    let command = ["claude": "claude --resume ", "codex": "codex resume ", "agy": "agy --conversation ",
                                   "cursor": "cursor-agent --resume "][a.tool] ?? ""
                    args = nil
                    what = " To resume it: \(command)\(a.id)"
                } else if args != nil, elsewhere.contains(a.id) {
                    args = nil
                    what = " This chat still runs somewhere else."
                } else if args != nil {
                    resumed = a
                    what = " Resuming this \(names[a.tool] ?? "AI") chat."
                }
            }
            _ = Sessions.start(name: e.name, cwd: cwd, claudeArgs: args, fontSize: fontSize, ai: resumed.map { ($0.tool, $0.id) },
                               history: Detached.takeHistory(e.name), notice: why + what, account: e.account)
            out.append(Detached.RunningSession(name: e.name, sessionId: resumed?.tool == "claude" ? resumed?.id : nil,
                                               claude: resumed?.tool == "claude", cwd: cwd, title: e.title))
        }
        return out
    }

    /// The snapshot's AI conversations that run somewhere right now (so not in a session of this app: it just started): a
    /// Claude with a live entry in its session registry, a Codex, Antigravity or Cursor process with the id in its arguments.
    /// Reads processes (call it off the main thread).
    private nonisolated static func runningElsewhere(_ snapshot: SessionSnapshot, registry: String) -> Set<String> {
        let wanted = snapshot.sessions.compactMap(\.ai)
        var found = Set<String>()
        let claudeIds = Set(wanted.filter { $0.tool == "claude" }.map(\.id))
        if !claudeIds.isEmpty {
            for file in (try? FileManager.default.contentsOfDirectory(atPath: registry)) ?? [] where file.hasSuffix(".json") {
                guard let data = FileManager.default.contents(atPath: registry + "/" + file),
                      let entry = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                      let sid = entry["sessionId"] as? String, claudeIds.contains(sid),
                      let pid = (entry["pid"] as? Int) ?? Int(file.dropLast(5)), pid > 0, kill(Int32(pid), 0) == 0 else { continue }
                found.insert(sid)
            }
        }
        let others = wanted.filter { $0.tool != "claude" }.map(\.id)
        if !others.isEmpty {
            for pid in Proc.all() where pid != getpid() {
                guard let args = Proc.arguments(pid) else { continue }
                for id in others where args.contains(where: { $0.contains(id) }) { found.insert(id) }
            }
        }
        return found
    }

    /// Opening a session needs to know whether it is running somewhere (else a running chat would be
    /// resumed a second time and Claude would fork it), so it waits for the engine's first state.
    func openWhenReady(_ sids: [String]) {
        if hasState { sids.forEach { openSession($0) } } else { pendingOpen += sids }
    }

    /// Status of each live AI session by its process id (AgyRewind asks whether Antigravity is idle).
    static var aiStatus: [Int32: String] = [:]

    /// A chat renamed in the sidebar: its windows (header, tab chips, pane bars, Window menu) take the name at once, and a
    /// name typed by hand for that session's tab gives way to it (the newest rename wins).
    private func chatRenamed(_ id: String) {
        // Before the engine's first state there's nothing to show it on (and apply would run pendingOpen on an empty list).
        guard hasState else { return }
        // Hand-typed names are kept by the terminal's session name, not the brief's: the AI's own pane, and the tab's first pane.
        if let b = briefs.values.first(where: { $0.id == id || $0.convId == id }), let pid = b.pid {
            if let s = Detached.sessionName(hosting: pid) { setTabName(nil, for: s) }
            for c in chats.values { c.clearTabNames(hosting: pid) }
        }
        engine.republishNames()
        radar.webView.evaluateJavaScript("window.GitView && window.GitView.refresh && window.GitView.refresh(); true", completionHandler: nil)
    }

    private func apply(_ raw: [SessionBrief]) {
        let list = raw   // titles already carry the names given in the sidebar (the engine resolves them: ChatNames)
        Self.aiStatus = Dictionary(list.filter(\.live).compactMap { b in b.pid.map { ($0, b.status) } }, uniquingKeysWith: { a, _ in a })
        briefs = Dictionary(list.map { ($0.id, $0) }, uniquingKeysWith: { a, _ in a })
        if !hasState {
            hasState = true
            let open = pendingOpen
            pendingOpen.removeAll()
            DispatchQueue.main.async { [weak self] in open.forEach { self?.openSession($0) } }
        }
        for c in chats.values {
            // After windows merged, several AIs are hosted by one window: the header follows the one under its own shell.
            // While its own chat goes on under another account (the old Claude left, the new one not up yet), that chat
            // still, not another pane's.
            let b = list.first(where: { $0.tab == c.id && ChatWindowController.isUnder($0.pid, shell: c.shellPid) })
                ?? c.sessionId.flatMap { c.hud.switching[$0] != nil ? briefs[$0] : nil }
                ?? list.first(where: { $0.tab == c.id }) ?? c.sessionId.flatMap { briefs[$0] }
            c.apply(b)
            c.applyHosted(list.filter { $0.tab == c.id && $0.live })
            WorktreeNudge.review(c, briefs: briefs)
        }
        let live = list.filter(\.live)
        runaways.liveSessions = live.compactMap { b in
            guard !b.cwd.isEmpty else { return nil }
            let started = b.pid.flatMap { Proc.info($0).map { Double($0.started / 1000) } } ?? 0
            return Runaways.LiveSession(cwd: b.cwd, started: started, busy: b.status == "busy")
        }
        MemoryWatch.setAIPids(live.compactMap(\.pid))
        let needYou = live.filter { $0.status == "waiting" }.count
        NSApp.dockTile.badgeLabel = needYou > 0 ? "\(needYou)" : nil
        for b in live {
            if let prev = lastStatus[b.id], prev != b.status, !NSApp.isActive,
               b.status == "waiting" || (b.status == "idle" && b.host == "app") {
                NSApp.requestUserAttention(.informationalRequest)
            }
            lastStatus[b.id] = b.status
        }
        WaitNotifier.shared.update(live)
        McpHub.shared.update(live)
        DiscordPresence.shared.update(list)
        // Only what the chats list uses of a session (its state, its host, its conversation, its folder, its title): the rest
        // (context, cost, tools…) changes many times a second while it works, and each change would rebuild the list's
        // snapshot (pushChats) for nothing.
        let listed = { (m: [String: SessionBrief]) in
            m.mapValues { [$0.status, $0.live ? "live" : "", $0.host ?? "", $0.convId ?? "", $0.cwd, $0.title, $0.name] }
        }
        if listed(sidebar.briefs) != listed(briefs) { sidebar.briefs = briefs }
        var open = Set(chats.values.compactMap(\.sessionId))
        for sid in open {
            if let cid = briefs[sid]?.convId { open.insert(cid) }
        }
        if sidebar.openInTabs != open { sidebar.openInTabs = open }
        pushWinOpen()
        pushActiveSession()
        Mascot.shared.updateSessions(list)
        writeSnapshot()
    }

    private func route(_ events: [NativeEvent]) {
        Mascot.shared.onNativeEvents(events)
        for e in events {
            let target = briefs[e.sid].flatMap { chat(for: $0) } ?? chats.values.first(where: { $0.sessionId == e.sid })
            target?.hud.push(e)
        }
    }

    /// Tells the dashboard which sessions have a visible chat window (cards light up).
    private func pushWinOpen(force: Bool = false) {
        let map = Dictionary(chats.values.filter { $0.isShown }.compactMap { c in c.sessionId.map { ($0, true) } }, uniquingKeysWith: { a, _ in a })
        guard let data = try? JSONSerialization.data(withJSONObject: map), let js = String(data: data, encoding: .utf8) else { return }
        if !force && js == lastWinOpen { return }
        lastWinOpen = js
        radar.webView.evaluateJavaScript("window.__winOpen = \(js);", completionHandler: nil)
    }

    /// A terminal got the keyboard or input. Resolve the AI under that exact pane, so a Claude and a Codex window can
    /// both be open while the one touched last supplies the top bar's session stats and account limits.
    func terminalFocused(window id: String) {
        activeTerminalWindow = id
        pushActiveSession()
    }

    /// Marks in the sidebar the chat of the terminal touched last. The dashboard's top bar shows every AI at once and
    /// follows no chat.
    private func pushActiveSession() {
        let chat = activeChat ?? activeTerminalWindow.flatMap { chats[$0] }
        let shell = chat?.focusedShellPid ?? 0
        var best: (brief: SessionBrief, distance: Int)?
        if shell > 0 {
            for b in briefs.values where b.live {
                guard var pid = b.pid else { continue }
                for distance in 0..<10 {
                    if pid == shell {
                        if best == nil || distance < best!.distance { best = (b, distance) }
                        break
                    }
                    guard let parent = Proc.parent(pid), parent > 1 else { break }
                    pid = parent
                }
            }
        }
        let sid = best?.brief.id ?? chat?.sessionId ?? ""
        let chatSid = best?.brief.convId ?? (best?.brief.id).flatMap({ $0.hasPrefix("ai:") ? nil : $0 }) ?? chat?.sessionId ?? (sid.isEmpty ? nil : sid)
        if sidebar.activeSessionId != chatSid { sidebar.activeSessionId = chatSid }
    }

    // MARK: terminals, the orbit's flying cars

    private var terminalsJSON = ""
    private var terminalCPU: [Int32: (ns: UInt64, at: TimeInterval)] = [:]

    /// Every app terminal without Claude in it, for the dashboard's orbit: each window's own when it's one and every tab
    /// and split pane (Claude in one is a session there), with what runs there (the shell's foreground job, e.g.
    /// `npm run dev`), in which folder, and how busy; and what a closed terminal left running (Runaways.left). Sent when
    /// it changes.
    private func pushTerminals() {
        let now = ProcessInfo.processInfo.systemUptime
        var list: [[String: Any]] = []
        var measured = Set<Int32>()
        // % of a core the processes under `roots` used since the last time (`key`: the shell, or the process left behind).
        func busy(_ key: Int32, _ roots: [Int32], work: Bool) -> Double {
            guard !roots.isEmpty else { return 0 }
            var cpu = 0.0
            let ns = Self.tree(roots).reduce(UInt64(0)) { $0 &+ (Proc.info($1)?.cpuTime ?? 0) }
            if let prev = terminalCPU[key], now > prev.at, ns >= prev.ns {
                cpu = Double(ns - prev.ns) / ((now - prev.at) * 1e9) * 100
            }
            // A build, tests, a dev server recompiling: work (Activity). An idle dev server isn't.
            if work, cpu >= 5 { Activity.work() }
            terminalCPU[key] = (ns, now)
            measured.insert(key)
            return cpu
        }
        // The chats list shows them too, each in the folder it was opened in (with what runs in it).
        var rows: [TermRow] = []
        // An ended window's other tabs are still running: their cars stay.
        for c in chats.values {
            for pane in c.plainShells() {
                let jobs = Proc.children(of: pane.shell)
                let cwd = Proc.cwd(pane.shell) ?? pane.cwd
                let cpu = busy(pane.shell, jobs, work: true)
                let cmd = jobs.first.flatMap(Proc.arguments).map(Self.commandLabel) ?? ""
                list.append([
                    "id": pane.id, "cwd": tildify(cwd), "dir": (cwd as NSString).lastPathComponent,
                    "cmd": cmd, "running": !jobs.isEmpty, "cpu": cpu.rounded(),
                ])
                rows.append(TermRow(id: pane.id, cwd: pane.cwd, title: (pane.cwd as NSString).lastPathComponent, job: cmd,
                                    shown: c.isShown && !c.hud.exited))
            }
        }
        // Closed tabs and panes, still running (an AI in one, Claude or Codex…, is a session on the orbit, not a car).
        var gone = false
        for (name, link) in parked {
            guard let shell = link.shellPid else {
                // Not before the launch has restored its sessions: one that isn't started yet isn't gone.
                if snapshotReady {
                    parked[name] = nil
                    gone = true
                }
                continue
            }
            guard !ChatWindowController.runsAgent(shell) else { continue }
            let jobs = Proc.children(of: shell)
            let cwd = Proc.cwd(shell) ?? HOME
            let cpu = busy(shell, jobs, work: true)
            let cmd = jobs.first.flatMap(Proc.arguments).map(Self.commandLabel) ?? ""
            list.append([
                "id": "s:" + name, "cwd": tildify(cwd), "dir": (cwd as NSString).lastPathComponent,
                "cmd": cmd, "running": !jobs.isEmpty, "cpu": cpu.rounded(),
            ])
            rows.append(TermRow(id: "s:" + name, cwd: cwd, title: (cwd as NSString).lastPathComponent, job: cmd, shown: false))
        }
        rows.sort { $0.id < $1.id }
        if sidebar.terminals != rows { sidebar.terminals = rows }
        if gone { saveParked() }
        for l in runaways.left {
            let cpu = busy(l.pid, [l.pid], work: false)
            list.append([
                "id": "left:\(l.pid):\(Int64(l.started))", "cwd": tildify(l.cwd), "dir": (l.cwd as NSString).lastPathComponent,
                "cmd": Self.commandLabel(l.args), "running": true, "cpu": cpu.rounded(),
                "left": true, "pid": l.pid, "started": l.started,
            ])
        }
        terminalCPU = terminalCPU.filter { measured.contains($0.key) }
        list.sort { ($0["id"] as? String ?? "") < ($1["id"] as? String ?? "") }
        guard let data = try? JSONSerialization.data(withJSONObject: list), let json = String(data: data, encoding: .utf8),
              json != terminalsJSON else { return }
        terminalsJSON = json
        radar.push("terminals", json)
    }

    /// The folders the app's terminals are in now (each shell's own, after its cd's), for Source Control.
    private func terminalFolders() -> [String] {
        var shells: [Int32] = []
        for c in chats.values where !c.hud.exited {
            shells += c.extras.compactMap { $0.link?.shellPid }
            if c.hud.status == "terminal", let shell = c.detached?.shellPid { shells.append(shell) }
        }
        return shells.compactMap(Proc.cwd)
    }

    /// The jobs and everything they started (npm starts node, node starts esbuild, …).
    static func tree(_ roots: [Int32]) -> [Int32] {
        var all = roots, next = roots
        for _ in 0..<5 where !next.isEmpty {
            next = next.flatMap { Proc.children(of: $0) }
            all += next
        }
        return all
    }

    /// "node /…/node_modules/.bin/vite --port 5173" -> "vite --port 5173"; "npm run dev" stays.
    private static func commandLabel(_ args: [String]) -> String {
        // A process that renamed itself (npm: "npm exec remotion studio") pads its arguments with spaces.
        var parts = args.map { $0.trimmingCharacters(in: .whitespaces) }.filter { !$0.isEmpty }
            .map { $0.contains("/") ? ($0 as NSString).lastPathComponent : $0 }
        if let first = parts.first, first == "node" || first == "nodejs", parts.count > 1 { parts.removeFirst() }
        let label = parts.joined(separator: " ")
        return label.count > 48 ? String(label.prefix(47)) + "…" : label
    }

    /// The hacker name, online count and update state, for the brand, settings and update button.
    /// The network is back or the Mac woke: the notes' live lines (the dashboard's, and each note window's) try again at once.
    func notesNetBack() {
        radar.callNotes("window.Notes && Notes.netBack && Notes.netBack()", [:])
        NoteWindow.netBack()
    }

    private func pushCloud() {
        guard let data = try? JSONSerialization.data(withJSONObject: Cloud.shared.json), let js = String(data: data, encoding: .utf8) else { return }
        radar.push("cloud", js)
        radar.webView.evaluateJavaScript("window.__worktreeNudge = \(WorktreeNudge.enabled)", completionHandler: nil)
        radar.webView.evaluateJavaScript("window.__chatWindowsFree = \(ChatWindows.free)", completionHandler: nil)
    }

    /// Another theme (the theme screen): the window's own background and the sidebar's divider; the page, the sidebar
    /// and the chat windows follow by themselves.
    @objc private func themeChanged() {
        window?.backgroundColor = Theme.bg
        window?.contentView?.layer?.backgroundColor = Theme.bg.cgColor
    }

    // MARK: dashboard visibility

    /// The page renders its 3D view and CSS animations only when someone can see them: full speed when
    /// the dashboard is the key window, slower behind a chat window, paused when hidden or covered.
    private func observeVisibility() {
        let nc = NotificationCenter.default
        let windowNames: [Notification.Name] = [NSWindow.didChangeOcclusionStateNotification, NSWindow.didMiniaturizeNotification,
                                                NSWindow.didDeminiaturizeNotification, NSWindow.didBecomeKeyNotification,
                                                NSWindow.didResignKeyNotification]
        for name in windowNames {
            nc.addObserver(self, selector: #selector(dashboardVisibilityChanged), name: name, object: window)
        }
        // A full-screen chat covers the map even though it is see-through, so any window's move, resize, minimize or close
        // may change whether the dashboard is covered (the handler is cheap and only pushes when the answer changes).
        let anyWindowNames: [Notification.Name] = [NSWindow.didResizeNotification, NSWindow.didMoveNotification,
                                                   NSWindow.didMiniaturizeNotification, NSWindow.didDeminiaturizeNotification,
                                                   NSWindow.willCloseNotification, NSWindow.didBecomeKeyNotification,
                                                   NSWindow.didChangeOcclusionStateNotification]
        for name in anyWindowNames {
            nc.addObserver(self, selector: #selector(dashboardVisibilityChanged), name: name, object: nil)
        }
        let appNames: [Notification.Name] = [NSApplication.didHideNotification, NSApplication.didUnhideNotification,
                                             NSApplication.didBecomeActiveNotification, NSApplication.didResignActiveNotification]
        for name in appNames {
            nc.addObserver(self, selector: #selector(dashboardVisibilityChanged), name: name, object: nil)
        }
        // Orbiterm in front again (the Dock, ⌘-Tab, a click): terminals free since a minimize may ride the dashboard again.
        nc.addObserver(self, selector: #selector(rejoinRiders), name: NSApplication.didBecomeActiveNotification, object: nil)
    }

    @objc func dashboardVisibilityChanged() {
        guard let w = window else { return }
        let visible = w.isVisible && w.occlusionState.contains(.visible) && !w.isMiniaturized && !NSApp.isHidden
        let focused = visible && NSApp.isActive
        let covered = visible && chatCoversDashboard(w)
        let state = "\(visible),\(focused),\(covered)"
        guard state != lastVisibility else { return }
        lastVisibility = state
        radar.webView.evaluateJavaScript("window.__radar && window.__radar.visibility && window.__radar.visibility(\(visible), \(focused), \(covered)); true", completionHandler: nil)
    }

    /// A shown chat window over at least 95% of the dashboard hides the map for practical purposes, though the window is
    /// see-through and occlusionState still says visible; the map then draws at its behind rate.
    private func chatCoversDashboard(_ dash: NSWindow) -> Bool {
        let area = dash.frame.width * dash.frame.height
        guard area > 0 else { return false }
        return chats.values.contains { c in
            guard let cw = c.window, cw.parent === dash, cw.isVisible, !cw.isMiniaturized, cw.alphaValue > 0.05 else { return false }
            let i = cw.frame.intersection(dash.frame)
            return !i.isNull && i.width * i.height >= 0.95 * area
        }
    }

    /// In power save the map draws fewer and smaller frames (PowerSaver); the switch on the map and Settings show it.
    /// The map hears only when power save comes on or goes off: it sets its quality anew each time.
    private var mapSaves: Bool?
    private func pushPower(force: Bool = false) {
        let saver = PowerSaver.shared
        if force || mapSaves != saver.on {
            mapSaves = saver.on
            radar.push("power", saver.on ? "true" : "false")
        }
        radar.push("powerSave", saver.json)
    }

    /// Settings · DISCORD shows its switches and whether Discord answers (DiscordPresence).
    /// Settings › Claude: what the page shows of the local MCP server (Mcp.swift).
    func pushMcp() { radar.push("mcp", McpHub.shared.json) }

    /// The text of a session's terminal (the end of its scrollback and screen), for Claude's read_session; nil when no window shows it.
    func terminalText(session name: String) -> String? {
        // A pty session shows its view with or without a window (a parked pane too).
        var view: ChatTerminalView? = Sessions.live[name]?.terminal
        for c in chats.values where view == nil {
            if c.detached?.name == name { view = c.terminal }
            else if let e = c.extras.first(where: { $0.link?.name == name }) { view = e.terminal }
            if view != nil { break }
        }
        guard let view else { return nil }
        var data = view.getBufferAsData(kind: .normal)
        if data.count < 200 { data = view.getBufferAsData(kind: .alt) }
        return String(decoding: data.suffix(60_000), as: UTF8.self)
    }

    private func pushDiscord() {
        radar.push("discord", DiscordPresence.shared.json)
        Mascot.shared.pushMischiefToPage()
    }

    // MARK: chats

    func showDashboard() {
        window?.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)
    }

    /// A text file ⌘-clicked in a terminal: in Source Control's editor, as VS Code opens one, in a tab of its own (at
    /// `line`). False for a file the editor doesn't show (the terminal opens it in its app). `cwd`: the terminal's folder,
    /// its path is shown from there.
    func openFile(_ url: URL, line: Int?, column: Int?, cwd: String) -> Bool {
        guard FilesBridge.canOpen(url) else { return false }
        files.allow(url)
        showDashboard()
        window?.makeFirstResponder(radar.webView)
        radar.openFile(url, line: line, column: column, cwd: cwd)
        return true
    }

    /// ⌘N: a new file in Source Control's editor (VS Code's Untitled-1), from any window.
    func newFile() {
        showDashboard()
        window?.makeFirstResponder(radar.webView)
        radar.newFile()
    }

    // Friend chats stay above the dashboard when it's clicked, like the terminals.
    func windowDidBecomeKey(_ notification: Notification) {
        rejoinRiders()
        MessagePanel.pinAll()
        NoteWindow.pinAll()
    }

    /// A terminal in `cwd`, not a chat: a new conversation starts with `claude`, an earlier one in that folder
    /// with `claude -r`. Whatever Claude runs there shows up in the window like any chat.
    func newTerminal(in cwd: String, frame: NSRect? = nil, nudgeTold: Bool = false, account: String? = nil) {
        var isDir: ObjCBool = false
        guard FileManager.default.fileExists(atPath: cwd, isDirectory: &isDir), isDir.boolValue else {
            alert("Folder not found", tildify(cwd))
            return
        }
        makeChat(cwd: cwd, claudeArgs: nil, sessionId: nil, title: (cwd as NSString).lastPathComponent, frame: frame, told: nudgeTold, account: account)
    }

    /// A new chat in `cwd` with the AI the new-worktree sheet picked: Claude, Codex, Antigravity, Cursor, or none (a plain terminal).
    /// Each starts in the folder the same way (`cd`, then its command), as a chat opened from the list does.
    func newChat(in cwd: String, ai: String, account: String? = nil) {
        var isDir: ObjCBool = false
        guard FileManager.default.fileExists(atPath: cwd, isDirectory: &isDir), isDir.boolValue else {
            alert("Folder not found", tildify(cwd))
            return
        }
        let args: [String]? = ai == "codex" ? ["codex"] : ai == "agy" ? ["agy"] : ai == "cursor" ? ["cursor-agent"] : ai == "terminal" ? nil : []
        makeChat(cwd: cwd, claudeArgs: args, sessionId: nil, title: (cwd as NSString).lastPathComponent, account: account)
    }

    /// Settings › Claude's "Sign in with Claude…": a terminal runs Claude's own `claude auth login` under the new account's folder.
    func signInAccount(_ id: String) {
        makeChat(cwd: HOME, claudeArgs: ["auth", "login"], sessionId: nil, title: "Sign in to Claude", account: id)
    }

    /// The chat window menu's "Add / Manage Claude Accounts…": the dashboard in front, Settings on Claude (with the add form).
    func openClaudeSettings(add: Bool) {
        showDashboard()
        radar.webView.evaluateJavaScript("window.ClaudeAcct && ClaudeAcct.openSettings(\(add ? "true" : "false"))")
    }

    /// Chat › Claude Account…: the chat window's account menu (ClaudeAccountsChat.swift), for the window in front.
    func showClaudeAccountMenu() {
        guard ClaudeAccounts.multiple, let c = activeChat else { return NSSound.beep() }
        c.acctMenu()
    }

    /// How many Claude chats run under an account (an account with some can't be removed).
    func runningChats(ofAccount id: String) -> Int {
        briefs.values.filter { $0.live && !$0.id.hasPrefix("ai:") && ($0.account.isEmpty ? ClaudeAccounts.defaultId : $0.account) == id }.count
    }

    /// The AIs working in the working tree `path` is in, by name (the folder picker's "· Codex is working here").
    func aiTools(inTreeOf path: String) -> [String] {
        guard let top = Worktrees.info(of: path)?.top else { return [] }
        let live = briefs.values.filter { $0.live && $0.status != "ended" && !$0.cwd.isEmpty && Worktrees.info(of: $0.cwd)?.top == top }
        let trees = briefs.values.filter { $0.live }.compactMap { o -> (id: String, set: Set<Int32>)? in o.pid.map { (o.id, Set(Self.tree([$0]))) } }
        return live.filter { o in
            guard let pid = o.pid else { return true }
            return !trees.contains { $0.id != o.id && $0.set.contains(pid) }
        }.map(WorktreeNudge.name)
    }

    /// The chat in front, when a worktree can be offered for it: a live chat of one of the three AIs, in a git folder.
    func movableChat() -> (c: ChatWindowController, b: SessionBrief)? {
        guard let c = NSApp.keyWindow?.windowController as? ChatWindowController, let b = c.hud.brief, b.live,
              !c.hud.mirror, WorktreeNudge.aiOf(b) != nil, Worktrees.info(of: b.cwd) != nil else { return nil }
        return (c, b)
    }

    /// Whether panes of the window named `window` (a detached session's name) were closed to run on as cars.
    func hasParked(of window: String) -> Bool {
        parked.keys.contains { Detached.extraInfo($0)?.parent == window }
    }

    /// The note's button, Chat → Open in a Worktree…: the name sheet alone, for this chat's AI.
    func moveToWorktree(_ c: ChatWindowController? = nil) {
        guard let (chat, b) = c.flatMap({ c in c.hud.brief.map { (c, $0) } }) ?? movableChat(), let ai = WorktreeNudge.aiOf(b) else { return NSSound.beep() }
        let folder = Worktrees.info(of: b.cwd).map { ($0.top as NSString).lastPathComponent } ?? ""
        // The sheet's account choice starts on the chat's own (two or more Claude accounts).
        overlay.showNewWorktree(from: b.cwd, ai: ai, moving: (window: chat.id, sid: b.id, tool: WorktreeNudge.name(b), folder: folder),
                                account: b.account.isEmpty ? nil : b.account)
    }

    /// The worktree is made: the AI starts in it, in the usual place. The old chat is not touched; its strip says where the
    /// new one is and offers "Close this chat" (the usual confirmation). Nothing closes by itself.
    func finishMove(replacing id: String, sid: String, path: String, ai: String, account: String? = nil) {
        newChat(in: path, ai: ai, account: account)
        guard let old = chats[id], let b = old.hud.brief, b.id == sid || old.sessionId == sid else { return }
        let w = Worktrees.info(of: path)
        old.hud.nudge = WorktreeOffer(sid: sid, tool: WorktreeNudge.name(b), folder: "", top: w?.top ?? path, dir: b.cwd,
                                      ai: WorktreeNudge.aiOf(b) ?? "claude", others: [], openedIn: w?.branch ?? (path as NSString).lastPathComponent)
    }

    // MARK: Clean Up (Cleanup.swift)

    /// The app menu's Clean Up\u{2026}, Settings' Open Clean Up\u{2026}, the map's strip: the dashboard in front, the view open.
    func showCleanup() {
        showDashboard()
        radar.push("openCleanup", "null")
    }

    /// One AI chat Clean Up may list: a live AI of this build's sessions, with what it needs to know of the window it is in.
    struct CleanupChat {
        let brief: SessionBrief
        let title: String
        /// ms since 1970 of the last key or paste in its terminal (0: none seen).
        let lastInput: Double
        /// Its window is the one in front now.
        let inFront: Bool
        /// "claude", "codex", "agy" or "cursor".
        let ai: String
        let aiName: String
        /// Something that would end with it that the summary doesn't name (ChatWindowController.cleanupBlocker).
        let blocker: String?
    }

    /// The live AI chats that run in this build's sessions (a chat running under another's process, Claude's own `codex exec`,
    /// is part of that chat). A mirror of the other build's chat and an AI in another app are not here: they aren't Orbiterm's.
    func cleanupChats() -> [CleanupChat] {
        let live = briefs.values.filter { $0.live && $0.status != "ended" && $0.pid != nil }
        let trees = live.compactMap { o -> (id: String, set: Set<Int32>)? in o.pid.map { (o.id, Set(Self.tree([$0]))) } }
        var out: [CleanupChat] = []
        for b in live {
            guard let pid = b.pid, let kind = WorktreeNudge.aiOf(b),
                  !trees.contains(where: { $0.id != b.id && $0.set.contains(pid) }),
                  let name = Detached.sessionName(hosting: pid) else { continue }
            let win = chats.values.first { $0.detached?.name == name || $0.extras.contains { $0.link?.name == name } }
            if win?.hud.mirror == true { continue }
            let title = (b.title.isEmpty ? (b.cwd as NSString).lastPathComponent : b.title)
            out.append(CleanupChat(brief: b, title: title, lastInput: win?.lastInputAt(session: name) ?? 0,
                                   inFront: win?.window?.isKeyWindow == true, ai: kind, aiName: WorktreeNudge.name(b),
                                   blocker: win?.detached?.name == name ? win?.cleanupBlocker() : nil))
        }
        return out
    }

    /// Every live AI session, whoever runs it (a worktree it works in is in use).
    func cleanupLiveBriefs() -> [SessionBrief] { briefs.values.filter { $0.live } }

    /// A live chat's brief, as it is now.
    func cleanupBrief(_ sid: String) -> SessionBrief? { briefs[sid].flatMap { $0.live ? $0 : nil } }

    /// Ends the chat the user ticked (they agreed on the summary): only this chat, as its End button ends it. A chat in a window of
    /// its own ends with the window's own chat (never another tab); one in a split pane stops its AI. False when it isn't there.
    func cleanupEnd(_ sid: String) -> Bool {
        guard let b = briefs[sid], b.live, b.status == "idle", let pid = b.pid, let name = Detached.sessionName(hosting: pid) else { return false }
        if let c = chats.values.first(where: { $0.detached?.name == name }) { return c.endOwnChatForCleanup() }
        endSession(sid)
        return true
    }

    /// The folders Clean Up looks for worktrees from: where live chats work, where chats were in the last 30 days, the app's
    /// terminals, Source Control's repos.
    func cleanupFolders() -> [String] {
        var out = Set(briefs.values.filter { $0.live && !$0.cwd.isEmpty }.map(\.cwd))
        let since = nowMs() - 30 * 86_400_000
        for item in sidebar.items where item.mtime >= since && !item.cwd.isEmpty { out.insert(item.cwd) }
        out.formUnion(terminalFolders())
        out.formUnion(Git.listedRoots())
        return Array(out)
    }

    // MARK: worktree: PR, merge, delete (WorktreeShip.swift)

    /// Linked worktrees with a window on screen: their status is kept fresh.
    func shipTops() -> Set<String> {
        Set(chats.values.compactMap { $0.isShown && !$0.hud.mirror ? $0.hud.wtTop : nil })
    }

    /// Whether the chats list can be seen now (the dashboard on screen with the list open): only then its groups are read.
    func shipListVisible() -> Bool {
        guard let w = window, w.isVisible, !w.isMiniaturized, w.occlusionState.contains(.visible), NSApp.isActive || w.isKeyWindow else { return false }
        return true
    }

    /// The window in front when it is a window of the worktree `top` (what the chats list's menu and the Chat menu open the sheet
    /// from); else the newest shown window of it, else none (the sheet then stands alone).
    func shipWindow(for top: String) -> ChatWindowController? {
        if let c = NSApp.keyWindow?.delegate as? ChatWindowController, c.hud.wtTop == top, !c.hud.mirror { return c }
        return nil
    }

    /// The chat or terminal window in front, when it is in a linked worktree (Chat menu: Create Pull Request…).
    func shipFront() -> ChatWindowController? {
        guard let c = NSApp.keyWindow?.delegate as? ChatWindowController, c.hud.wtTop != nil, !c.hud.mirror else { return nil }
        return c
    }

    /// The AI chats and terminals open in the worktree `top`: the AI sessions (the app's and any other app's) and the app's terminals.
    func shipLive(top: String) -> [ShipLive] {
        var out: [ShipLive] = []
        // Under the folder counts too: a worktree inside it (`claude -w`) goes to the Trash with it.
        func under(_ cwd: String) -> Bool {
            guard let t = Worktrees.info(of: cwd)?.top else { return cwd == top || cwd.hasPrefix(top + "/") }
            return t == top || t.hasPrefix(top + "/")
        }
        let live = briefs.values.filter { $0.live && $0.status != "ended" && !$0.cwd.isEmpty && under($0.cwd) }
        let trees = briefs.values.filter { $0.live }.compactMap { o -> (id: String, set: Set<Int32>)? in o.pid.map { (o.id, Set(Self.tree([$0]))) } }
        for o in live {
            // One that runs under another's process (Claude's own `codex exec`) is part of that chat.
            if let pid = o.pid, trees.contains(where: { $0.id != o.id && $0.set.contains(pid) }) { continue }
            let inApp = chat(for: o) != nil || (o.pid.flatMap { Detached.sessionName(hosting: $0) } != nil)
            out.append(ShipLive(id: o.id, name: WorktreeNudge.name(o), kind: "chat", status: o.status, inApp: inApp))
        }
        for c in chats.values where !c.hud.mirror {
            if c.hud.status == "terminal", !c.hud.exited, c.hud.wtTop == top {
                out.append(ShipLive(id: c.id, name: "terminal", kind: "terminal", status: "idle", inApp: true))
            }
            for pane in c.extras where under(pane.cwd) {
                out.append(ShipLive(id: "pane:" + (pane.link?.name ?? pane.cwd), name: "terminal", kind: "terminal", status: "idle", inApp: true))
            }
        }
        return out
    }

    /// The AI "Ask … to fix" goes to: the one in the window the sheet dropped from, else the newest live AI chat in the worktree.
    func shipAI(top: String, preferring window: ChatWindowController?) -> ShipAI? {
        func ai(_ b: SessionBrief) -> ShipAI? {
            guard b.live, b.status != "ended", let kind = WorktreeNudge.aiOf(b) else { return nil }
            return ShipAI(name: WorktreeNudge.name(b), sid: b.id, kind: kind)
        }
        if let b = window?.hud.brief, let a = ai(b) { return a }
        let mine = briefs.values.filter { $0.live && !$0.cwd.isEmpty && Worktrees.info(of: $0.cwd)?.top == top && ai($0) != nil }
        return mine.max { $0.statusSince < $1.statusSince }.flatMap(ai)
    }

    /// A pull request's title when the window has none (a terminal's): the newest chat's in the worktree.
    func shipTitle(in top: String) -> String? {
        let mine = briefs.values.filter { !$0.title.isEmpty && !$0.cwd.isEmpty && Worktrees.info(of: $0.cwd)?.top == top }
        return mine.max { $0.statusSince < $1.statusSince }?.title
    }

    /// Delete worktree: every chat and terminal open there ends, as its End button ends it; the windows stay, ended. False when
    /// something still ran after five seconds.
    func endSessions(in top: String) async -> Bool {
        for c in chats.values where !c.hud.mirror {
            c.endPanes(inTop: top)
            if c.hud.wtTop == top, !c.hud.exited { c.endLeavingWindow() }
        }
        for _ in 0..<50 {
            let windows = chats.values.contains { !$0.hud.mirror && $0.hud.wtTop == top && !$0.hud.exited }
            let sessions = shipLive(top: top).contains { $0.kind == "chat" || $0.inApp }
            if !windows && !sessions { return true }
            try? await Task.sleep(nanoseconds: 100_000_000)
        }
        return false
    }

    /// The folder is deleted: the ended windows say so in their terminals; their chips say `deleted` (WorktreeShip.deleted).
    func shipDeleted(top: String, branch: String, sha: String, kept: Bool) {
        let shownBranch = Streamer.on ? Streamer.fake("branch", branch) : branch
        let line = "[worktree deleted \u{00B7} the folder is in the Trash \u{00B7} " + (kept ? "branch \(shownBranch) kept" : "branch \(shownBranch) was \(Streamer.on ? "\u{2026}" : sha)") + "]"
        for c in chats.values where c.hud.wtTop == top && c.hud.exited { c.noteEnded(line) }
    }

    /// "Show Claude": its window to the front (or the one that ran it).
    func showChat(sessionId sid: String) {
        guard let b = briefs[sid], let c = chat(for: b) else { return }
        c.show()
    }

    /// The chip, Show Changes: Source Control on this worktree.
    func showSourceControl(root: String) {
        showDashboard()
        window?.makeFirstResponder(radar.webView)
        let arg = (try? JSONSerialization.data(withJSONObject: [root], options: [])).flatMap { String(data: $0, encoding: .utf8) } ?? "[\"\"]"
        radar.webView.evaluateJavaScript("window.GitView && GitView.show(\(arg)[0]); true", completionHandler: nil)
    }

    /// Delete in the chats list (a chat's menu, a folder's, or the bar over the list while some are picked): asks first,
    /// then the chats (Claude Code's, Codex's, Antigravity's) leave the list for Settings' deleted chats, where they stay
    /// 30 days before they're deleted from the Mac. Running chats stay: they're ended first.
    @discardableResult
    private func deleteChats(_ ids: [String]) -> Bool {
        let pick = sidebar.deletable(ids)
        var stay: [String] = []
        if pick.running > 0 {
            stay.append(pick.running == 1 ? "1 running chat stays in the list: end it first."
                                          : "\(pick.running) running chats stay in the list: end them first.")
        }
        if pick.others > 0 {
            stay.append(pick.others == 1 ? "1 chat that isn't saved yet stays too." : "\(pick.others) chats that aren't saved yet stay too.")
        }
        guard !pick.chats.isEmpty else {
            if pick.running + pick.others == 0 {
                alert("Nothing to delete", "There are no saved chats here.")
                return false
            }
            let one = pick.running + pick.others == 1
            alert(one ? "This chat can't be deleted" : "These chats can't be deleted",
                  pick.others == 0 ? (one ? "It's running: end it first." : "They're running: end them first.") : stay.joined(separator: "\n"))
            return false
        }
        let one = pick.chats.count == 1
        let title = one ? "Delete “\(clip(sidebar.title(of: pick.chats[0]), 60))”?" : "Delete \(pick.chats.count) chats?"
        let text = (one ? "It stays in Settings › deleted chats for 30 days, where you can put it back. Then it's deleted from this Mac for good."
                        : "They stay in Settings › deleted chats for 30 days, where you can put them back. Then they're deleted from this Mac for good.")
            + (stay.isEmpty ? "" : "\n\n" + stay.joined(separator: "\n"))
        guard ask(title, text, ["Delete", "Cancel"], style: .warning) == 0 else { return false }
        sidebar.delete(pick.chats)
        return true
    }

    private func openFromNotice(_ sid: String) {
        if !sid.hasPrefix("ai:"), let b = briefs[sid], b.live, b.host == "term", let pid = b.pid,
           Detached.sessionName(hosting: pid, anyBuild: true) == nil {
            return ITerm.reveal(pid: pid)
        }
        NSApp.activate(ignoringOtherApps: true)
        openSession(sid)
    }

    /// A card click (the page's or the sidebar's): the one thing that may reopen a window the mascot just closed.
    var userOpenDepth = 0
    private func userOpenSession(_ sid: String, fork: Bool = false) {
        userOpenDepth += 1
        defer { userOpenDepth -= 1 }
        openSession(sid, fork: fork)
    }

    /// Opens a saved or running conversation in its own window, in its project folder.
    func openSession(_ sid: String, fork: Bool = false) {
        let brief = briefs[sid]
        // Another AI tool (Codex…) has no conversation to resume or copy here: a click opens the pane it runs in, when
        // that's one of ours.
        if sid.hasPrefix("ai:") {
            guard !fork, let b = brief, b.live, let pid = b.pid else { return }
            if let tab = b.tab, let c = chats[tab] {
                c.show()
                return c.focusPane(hosting: pid)
            }
            // Running outside the app: its terminal (iTerm2's session, Terminal's tab) comes to the front.
            guard let name = Detached.sessionName(hosting: pid, anyBuild: true) else { return ITerm.reveal(pid: pid) }
            // A window that shows it already comes to the front: a session is shown in one place only.
            if let c = window(showing: name) {
                c.show()
                return c.focusPane(hosting: pid)
            }
            if parked[name] != nil { return reopenParked(name, own: true) }
            if let c = chats.values.first(where: { $0.detached?.name == (Detached.extraInfo(name)?.parent ?? name) }) {
                c.show()
                c.focusPane(hosting: pid)
                return
            }
            // Codex in the installed app can be mirrored in staging just like Claude. Previously this path returned
            // without creating a window, so clicking its planet did nothing.
            let own = name.hasPrefix(Detached.prefix)
            // Another build's terminal lives inside that app (no screen session to attach to): say where it runs.
            if !own, !Detached.isScreenSession(name) { return otherAppRuns(name, title: b.title.isEmpty ? b.name : b.title, pid: pid) }
            let c = openWindow(cwd: b.cwd, claudeArgs: nil, sessionId: nil, title: b.title.isEmpty ? b.name : b.title,
                               detached: DetachedLink(name: name), mirror: !own)
            c.focusPane(hosting: pid)
            return
        }
        if !fork, let liveAgy = briefs.values.first(where: { $0.live && $0.convId == sid }) {
            return openSession(liveAgy.id)
        }
        if !fork {
            if let b = brief, b.live, let pid = b.pid {
                // A live chat opens the window its process runs in. Another window here can hold an older copy of the
                // same conversation (a `claude --resume` that didn't fork); that one isn't it. Outside the app: below.
                // On the pane it runs in: a Claude in the window's second tab opens that tab.
                if let tab = b.tab, let c = chats[tab] {
                    c.show()
                    return c.focusPane(hosting: pid)
                }
                // The window (or pane) that shows it comes to the front.
                if let name = Detached.sessionName(hosting: pid), let c = window(showing: name) {
                    c.show()
                    return c.focusPane(hosting: pid)
                }
                // A tab or split pane closed with Claude running in it comes back into its window.
                if let name = Detached.sessionName(hosting: pid), parked[name] != nil { return reopenParked(name, own: true) }
                // A tab or split pane's session goes by its window's.
                if let name = Detached.sessionName(hosting: pid),
                   let c = chats.values.first(where: { $0.detached?.name == (Detached.extraInfo(name)?.parent ?? name) }) {
                    c.show()
                    return c.focusPane(hosting: pid)
                }
            } else {
                if let c = chats.values.first(where: { $0.sessionId == sid && !$0.hud.exited }) { return c.show() }
                if let b = brief, let c = chat(for: b) { return c.show() }
            }
        }
        let item = sidebar.items.first(where: { $0.id == sid })
        let cwd = [item?.cwd, brief?.cwd].compactMap { $0 }.first(where: { !$0.isEmpty }) ?? ""
        var isDir: ObjCBool = false
        guard !cwd.isEmpty, FileManager.default.fileExists(atPath: cwd, isDirectory: &isDir), isDir.boolValue else {
            alert("Project folder not found", cwd.isEmpty ? "Couldn't tell which folder this chat started in." : tildify(cwd))
            return
        }
        let title = [brief?.title, item?.title, item?.lastPrompt, brief?.name].compactMap { $0 }.first(where: { !$0.isEmpty }) ?? String(sid.prefix(8))
        if item?.tool == "antigravity" {
            guard !fork else { return }
            return makeChat(cwd: cwd, claudeArgs: ["agy", "--conversation", sid], sessionId: sid, title: title)
        }
        // A Cursor chat that isn't running: `cursor-agent --resume <chat id>`.
        if item?.tool == "cursor" {
            guard !fork else { return }
            return makeChat(cwd: cwd, claudeArgs: ["cursor-agent", "--resume", sid], sessionId: sid, title: title)
        }
        // A Codex conversation that isn't running (a running one opened its pane above): Codex resumes it.
        if item?.tool == "codex" {
            guard !fork else { return }
            return makeChat(cwd: cwd, claudeArgs: ["codex", "resume", sid], sessionId: sid, title: title)
        }
        let resume = ["--resume", sid]
        if fork {
            // A copy of a Claude running in iTerm2 ends that original when it ends.
            let original = brief.flatMap { $0.live ? $0.pid : nil }
            return makeChat(cwd: cwd, claudeArgs: resume + ["--fork-session"], sessionId: nil, title: "⑂ " + title,
                            origin: original.flatMap { pid in ITerm.tab(of: pid).map { ITermOrigin(tty: $0, claude: pid) } })
        }
        guard let b = brief, b.live, b.host == "term", let pid = b.pid else {
            return makeChat(cwd: cwd, claudeArgs: resume, sessionId: sid, title: title)
        }
        // One of our sessions whose window is gone: show it again, nothing to move.
        if let name = Detached.sessionName(hosting: pid) {
            if let c = window(showing: name) {
                c.show()
                return c.focusPane(hosting: pid)
            }
            openWindow(cwd: cwd, claudeArgs: [], sessionId: sid, title: title, detached: DetachedLink(name: name))
            return
        }
        // Running in another Orbiterm (the installed app and the staging build side by side): a mirror here,
        // a second screen on the same chat. Both windows show it live and type into the one Claude; closing the mirror
        // leaves the chat running there, End Session ends it there too.
        if let name = Detached.sessionName(hosting: pid, anyBuild: true) {
            if let c = chats.values.first(where: { $0.detached?.name == name }) { return c.show() }
            // Only a screen session can be mirrored; another build's own terminal lives inside that app.
            guard Detached.isScreenSession(name) else { return otherAppRuns(name, title: title, pid: pid) }
            openWindow(cwd: cwd, claudeArgs: [], sessionId: sid, title: "⧉ " + title, detached: DetachedLink(name: name), mirror: true)
            return
        }
        // The conversation is running in another terminal (e.g. iTerm2).
        let busy = b.status == "busy"
        var buttons = ["Open a Copy", "Cancel"]
        if !busy { buttons.insert("Move It Here", at: 0) }
        let r = ask("“\(clip(title, 60))” is open in another terminal",
                    (busy ? "It's working right now, so it can't be moved. " : "Moving it closes Claude in the other terminal and continues the conversation in a window here. ")
                        + "A copy is a separate conversation from this point on: what you write in one doesn't reach the other.",
                    buttons)
        // A copy of a Claude running in iTerm2 ends that original when it ends.
        let copied = ITerm.tab(of: pid).map { ITermOrigin(tty: $0, claude: pid) }
        switch buttons.indices.contains(r) ? buttons[r] : "Cancel" {
        case "Move It Here":
            takeOver(pid: pid, then: { [weak self] in
                         self?.makeChat(cwd: cwd, claudeArgs: resume, sessionId: sid, title: title)
                     },
                     failed: { [weak self] in
                         guard let self else { return }
                         if self.ask("Claude in the other terminal didn't close", "Open a copy instead?", ["Open a Copy", "Cancel"]) == 0 {
                             self.makeChat(cwd: cwd, claudeArgs: resume + ["--fork-session"], sessionId: nil, title: "⑂ " + title,
                                           origin: copied)
                         }
                     })
        case "Open a Copy":
            makeChat(cwd: cwd, claudeArgs: resume + ["--fork-session"], sessionId: nil, title: "⑂ " + title, origin: copied)
        default:
            break
        }
    }

    /// A session another build of the app runs in its own terminal can't be shown here (nothing to attach to): the click says
    /// where it runs, and can bring that app forward.
    private func otherAppRuns(_ name: String, title: String, pid: Int32) {
        let owner = Detached.owner(name)
        guard ask("“\(clip(title, 60))” runs in \(owner)", "Open it there: one Orbiterm can't show another's terminals.",
                  ["Show It There", "Cancel"]) == 0, let host = Detached.hostApp(ofSession: pid) else { return }
        NSRunningApplication(processIdentifier: host)?.activate(options: [.activateAllWindows])
    }

    /// The conversation a chat is opened to resume, for the snapshot until its AI shows under the shell (a copy,
    /// `--fork-session`, is a new conversation: unknown yet).
    private static func resuming(_ args: [String]?) -> (tool: String, id: String)? {
        guard let args, !args.contains("--fork-session") else { return nil }
        if args.count == 2, args[0] == "--resume" { return ("claude", args[1]) }
        if args.count == 3, args[0] == "codex", args[1] == "resume" { return ("codex", args[2]) }
        if args.count == 3, args[0] == "agy", args[1] == "--conversation" { return ("agy", args[2]) }
        if args.count == 3, args[0] == "cursor-agent", args[1] == "--resume" { return ("cursor", args[2]) }
        return nil
    }

    /// Opens a chat window and starts its shell (and Claude, with `claudeArgs`) in a pty the app opens itself, so the
    /// window shows it at once.
    private func makeChat(cwd: String, claudeArgs: [String]?, sessionId: String?, title: String, origin: ITermOrigin? = nil,
                          frame: NSRect? = nil, told: Bool = false, account: String? = nil) {
        // A fresh name every time: a name made from the conversation would clash with an older session of it.
        let name = Detached.prefix + UUID().uuidString.lowercased()
        // The window opens at this size, so the shell (and Claude) start at it, not at a default they would redraw from.
        let content = frame ?? nextChatFrame()
        _ = Sessions.start(name: name, cwd: cwd, claudeArgs: claudeArgs, fontSize: fontSize, ai: Self.resuming(claudeArgs),
                           size: ChatWindowController.terminalSize(forContent: content.size), account: account)
        let c = openWindow(cwd: cwd, claudeArgs: claudeArgs, sessionId: sessionId, title: title, detached: DetachedLink(name: name), frame: frame,
                           contentFrame: content)
        c.origin = origin
        c.nudgeTold = told
    }

    @discardableResult
    private func openWindow(cwd: String, claudeArgs: [String]?, sessionId: String?, title: String,
                            detached: DetachedLink?, attach: Bool = true, show: Bool = true, mirror: Bool = false,
                            restored: Bool = false, frame: NSRect? = nil, contentFrame: NSRect? = nil) -> ChatWindowController {
        let c = ChatWindowController(cwd: cwd, claudeArgs: claudeArgs, sessionId: sessionId, title: title,
                                     fontSize: fontSize, frame: frame ?? contentFrame ?? nextChatFrame(), manager: self, detached: detached, mirror: mirror)
        // An exact place (a split's half): the window's frame, title bar included, not just its content.
        if let frame { c.window?.setFrame(frame, display: false) }
        c.takesHistory = restored
        chats[c.id] = c
        if Streamer.on { c.setStreamer(true) }
        if let sessionId, let b = briefs[sessionId] { c.apply(b) } else { c.apply(nil) }
        if show { c.show() }
        syncShells()
        if detached != nil, attach { c.attachSession() }
        return c
    }

    private func nextChatFrame() -> NSRect {
        let base = window?.frame ?? NSScreen.main?.visibleFrame ?? NSRect(x: 0, y: 0, width: 1440, height: 900)
        let w = min(1100, max(860, base.width * 0.62)), h = min(760, max(560, base.height * 0.72))
        let k = CGFloat(cascade % 6) - 2.5
        cascade += 1
        return NSRect(x: base.midX - w / 2 + k * 28, y: base.midY - h / 2 - k * 24, width: w, height: h)
    }

    // MARK: iTerm2's shortcuts (the Chat and Window menus): tabs and split panes in the window in front
    // (ChatWindowController); with nothing more there to move to, the next window instead.

    /// The chat or terminal window in front, if the key window is one.
    private var activeChat: ChatWindowController? { NSApp.keyWindow?.delegate as? ChatWindowController }

    /// The chat and terminal windows on screen, left to right, then top to bottom.
    private var shownChats: [ChatWindowController] {
        chats.values.filter { $0.isShown && $0.window?.isVisible == true }.sorted { a, b in
            let fa = a.window?.frame ?? .zero, fb = b.window?.frame ?? .zero
            return abs(fa.minX - fb.minX) > 24 ? fa.minX < fb.minX : fa.maxY > fb.maxY
        }
    }

    /// ⌘T / ⌥⌘T: a new tab in the window in front (from the dashboard: the folder picker).
    func newTab(next: Bool = false) {
        guard let c = activeChat else { return overlay.showNewTerminal() }
        c.newTab(next: next)
    }

    /// ⌘D / ⇧⌘D: splits the pane in front.
    func split(vertical: Bool) {
        guard let c = activeChat else { return overlay.showNewTerminal() }
        c.split(vertical: vertical)
    }

    /// Some chat window holds env changes not saved: an update's restart waits.
    var hasUnsavedEnv: Bool { chats.values.contains { $0.envUnsaved } }

    /// Before a quit: every chat window with env changes not saved asks (and comes to the front). False when one is cancelled.
    func confirmEnvBeforeQuit() -> Bool {
        for c in chats.values where !c.confirmEnvForQuit() { return false }
        return true
    }

    /// ⌘W: the pane in front closes, or with only the window's own, the window.
    func closePane() {
        // The env view over a terminal closes first, as a tab does (Esc does the same there, whatever the swap says).
        if let c = activeChat, c.closeEnvKey() { return }
        // Esc and ⌘W swapped (Settings › Shortcuts): in a terminal the close keys (not a menu click) are an Esc for the program there (EscClose).
        if NSApp.currentEvent?.type == .keyDown, EscClose.sendEsc() { return }
        // A friend's chat in front closes itself (the terminal behind keeps its panes).
        if MessagePanel.closeKeyChat() { return }
        if NoteWindow.closeKey() { return }
        if let c = activeChat, c.closeFocusedPane() { return }
        NSApp.keyWindow?.performClose(nil)
    }

    /// ⌘] / ⌘[: the next or previous pane; ⇧⌘] / ⇧⌘[ (`tabs`): the next or previous tab.
    func selectPane(step: Int, tabs: Bool = false) {
        if let c = activeChat, tabs ? c.selectTab(step: step) : c.selectPane(step: step) { return }
        let list = shownChats
        guard !list.isEmpty else { return }
        guard let i = activeChat.flatMap({ cur in list.firstIndex { $0 === cur } }) else {
            return (step > 0 ? list.first : list.last)?.show() ?? ()
        }
        list[(i + step + list.count) % list.count].show()
    }

    /// ⌥⌘ and an arrow (`dy` up is +1): the pane that way, else the window that way.
    func selectPane(dx: CGFloat, dy: CGFloat) {
        if let c = activeChat, c.selectPane(dx: dx, dy: dy) { return }
        guard let cur = activeChat, let cf = cur.window?.frame else { return selectPane(step: 1) }
        var best: (ChatWindowController, CGFloat)?
        for o in shownChats where o !== cur {
            guard let f = o.window?.frame else { continue }
            let x = f.midX - cf.midX, y = f.midY - cf.midY
            let along = x * dx + y * dy
            guard along > 20 else { continue }
            let score = along + 2 * abs(x * dy - y * dx)
            if best.map({ score < $0.1 }) ?? true { best = (o, score) }
        }
        best?.0.show()
    }

    /// ⌘1–⌘9: that tab of the window in front.
    func selectTab(number n: Int) { activeChat?.selectTab(n - 1) }

    /// ⌃⌘ and an arrow: moves the divider between the panes.
    func moveDivider(dx: CGFloat, dy: CGFloat) { _ = activeChat?.moveDivider(dx: dx, dy: dy) }

    /// ⌥⇧⌘[ / ⌥⇧⌘]: the shown tab a place left or right.
    func moveTab(step: Int) { _ = activeChat?.moveTab(step: step) }

    // MARK: tabs and windows moving between windows (tear a tab off, drop it on another window, merge windows)
    // A moved session never restarts: its view (the process's terminal) changes windows and its name is changed for its new
    // place (Detached.rehome), so a restart still brings it back where it is. A session shows in one place only.

    /// The terminal window under `p` (screen coordinates) below the window numbered `n`; nil over another app's window or the desktop.
    func chatWindow(atScreen p: NSPoint, below n: Int) -> ChatWindowController? {
        let num = NSWindow.windowNumber(at: p, belowWindowWithWindowNumber: n)
        return chats.values.first { $0.window?.windowNumber == num }
    }

    /// The terminal window under `p` (screen coordinates) other than `a` itself, whatever its level (a pinned one floats above
    /// `a`); nil over another app's window or the desktop.
    func chatWindow(atScreen p: NSPoint, skipping a: ChatWindowController) -> ChatWindowController? {
        var below = 0
        for _ in 0..<12 {
            let n = NSWindow.windowNumber(at: p, belowWindowWithWindowNumber: below)
            if n <= 0 { return nil }
            if n == a.window?.windowNumber {
                below = n
                continue
            }
            return chats.values.first { $0.window?.windowNumber == n }
        }
        return nil
    }

    /// A window other than `a` that can take tabs, with the pointer `p` on its header (or its tab bar).
    func tabTarget(atScreen p: NSPoint, excluding a: ChatWindowController) -> ChatWindowController? {
        guard let c = chatWindow(atScreen: p, skipping: a), c.acceptsTabs, let f = c.window?.frame,
              p.y >= f.maxY - c.dropHeaderHeight else { return nil }
        return c
    }

    /// The pane under the pointer `p` in a window other than `a` that can take tabs, below its header: the side a split
    /// there would take, or nil for the middle (tabs).
    func paneTarget(atScreen p: NSPoint, excluding a: ChatWindowController) -> (win: ChatWindowController, pane: ChatTerminalView, edge: NSRectEdge?)? {
        guard let c = chatWindow(atScreen: p, skipping: a), c.acceptsTabs, let w = c.window, p.y < w.frame.maxY - c.dropHeaderHeight,
              let spot = c.paneSpot(at: w.convertPoint(fromScreen: p)) else { return nil }
        return (c, spot.0, spot.1)
    }

    /// The frame of a window made from a tab of `a` let go at `p`: `a`'s size, the pointer on its header, kept on the screen.
    func tearFrame(like a: ChatWindowController, at p: NSPoint) -> NSRect {
        let size = a.window?.frame.size ?? NSSize(width: 900, height: 600)
        let screen = NSScreen.screens.first { $0.frame.contains(p) } ?? NSScreen.main
        var origin = NSPoint(x: p.x - size.width / 2, y: p.y + 30 - size.height)
        if let vf = screen?.visibleFrame {
            origin.x = max(vf.minX, min(origin.x, vf.maxX - size.width))
            origin.y = max(vf.minY, min(origin.y, vf.maxY - size.height))
        }
        return NSRect(origin: origin, size: size)
    }

    /// A session got a new name (it moved to another window): what is kept by name follows.
    func sessionRenamed(_ old: String, to new: String) {
        guard old != new else { return }
        NotesTools.renameSession(from: old, to: new)
        if let name = tabNames[old] { tabNames[old] = nil; setTabName(name, for: new) }
        if standalone.remove(old) != nil { saveStandalone() }
        pushTerminals()
    }

    /// A window of its own for the tab `cargo` took out of `a`: its first terminal is the window's, at `frame`. Pinned when
    /// `a` is.
    @discardableResult
    private func openTorn(_ cargo: ChatWindowController.TabCargo, like a: ChatWindowController, frame: NSRect) -> ChatWindowController? {
        guard let lead = cargo.items.first else { return nil }
        let name = Detached.rehome(lead.name, parent: nil, kind: .tab) ?? lead.name
        sessionRenamed(lead.name, to: name)
        // The lead's place in a split is kept for it until the new window takes it back.
        var placeholder: NSView?
        if cargo.root !== lead.view, let sv = lead.view.superview as? PaneSplitView {
            let ph = NSView()
            sv.replaceArrangedSubview(lead.view, with: ph)
            placeholder = ph
        }
        let args = Sessions.live[name]?.shellPid.flatMap { ChatWindowController.aiLaunch($0) }
        let c = openWindow(cwd: lead.cwd, claudeArgs: args, sessionId: nil, title: (lead.cwd as NSString).lastPathComponent,
                           detached: DetachedLink(name: name), show: false, frame: frame)
        c.install(cargo, placeholder: placeholder)
        if a.hud.onTop { c.togglePin() }
        c.show()
        return c
    }

    /// `a`'s own tab stays; every other tab goes to a window of its own at `a`'s place, in their order.
    private func splitOffRest(of a: ChatWindowController, keeping own: Int) -> ChatWindowController? {
        let others = (0..<a.tabCount).filter { $0 != own }
        guard let frame = a.window?.frame, !others.isEmpty, others.allSatisfy({ a.canMoveOut(tab: $0) }) else { return nil }
        var cargos: [ChatWindowController.TabCargo] = []
        for j in others.reversed() {
            guard let c = a.detachTab(j) else { return nil }
            cargos.insert(c, at: 0)
        }
        guard let first = cargos.first, let b = openTorn(first, like: a, frame: frame) else { return nil }
        for c in cargos.dropFirst() { b.adopt(c, select: false) }
        return b
    }

    /// Tab `i` of `a` becomes a window at `frame`. The window's own tab does it the other way round: the other tabs go to a
    /// new window at `a`'s place and `a` itself moves to `frame`.
    func tearOff(tab i: Int, of a: ChatWindowController, frame: NSRect) {
        guard a.tabCount > 1, a.canMoveOutOfWindow(tab: i) else { return NSSound.beep() }
        if a.tabHoldsOwn(i) {
            guard splitOffRest(of: a, keeping: i) != nil else { return NSSound.beep() }
            a.window?.setFrameOrigin(frame.origin)
            a.show()
            return
        }
        guard let cargo = a.detachTab(i) else { return NSSound.beep() }
        openTorn(cargo, like: a, frame: frame)
    }

    /// Tab `i` of `a` joins `c` at `slot` of its bar.
    func moveTab(_ i: Int, of a: ChatWindowController, to c: ChatWindowController, slot: Int) {
        guard a !== c, c.acceptsTabs, a.canMoveOutOfWindow(tab: i) else { return NSSound.beep() }
        if a.tabHoldsOwn(i) {
            if a.tabCount > 1, splitOffRest(of: a, keeping: i) == nil { return NSSound.beep() }
            return merge(a, into: c, slot: slot)
        }
        guard let cargo = a.detachTab(i) else { return NSSound.beep() }
        c.adopt(cargo, at: slot)
        c.show()
    }

    /// Pane `tv` of `a` (a split's pane, by its title bar) becomes a window of its own at `frame`.
    func tearOffPane(_ tv: ChatTerminalView, of a: ChatWindowController, frame: NSRect) {
        guard let cargo = a.detachPane(tv) else { return NSSound.beep() }
        openTorn(cargo, like: a, frame: frame)
    }

    func movePaneToNewWindow(_ tv: ChatTerminalView, of a: ChatWindowController) {
        guard let f = a.window?.frame else { return }
        tearOffPane(tv, of: a, frame: tearFrame(like: a, at: NSPoint(x: f.midX + 30, y: f.maxY - 30)))
    }

    /// The pane becomes a tab of `c` at `slot`.
    func movePane(_ tv: ChatTerminalView, of a: ChatWindowController, to c: ChatWindowController, slot: Int) {
        guard a !== c, c.acceptsTabs, let cargo = a.detachPane(tv) else { return NSSound.beep() }
        c.adopt(cargo, at: slot)
        c.show()
    }

    /// The pane becomes a split beside `target` in `c`.
    func movePane(_ tv: ChatTerminalView, of a: ChatWindowController, to c: ChatWindowController,
                  beside target: ChatTerminalView, edge: NSRectEdge) {
        guard a !== c, c.acceptsTabs, let cargo = a.detachPane(tv) else { return NSSound.beep() }
        c.adoptSplit(cargo, beside: target, edge: edge)
        c.show()
    }

    /// Tab `i` of `a` joins `c` as a split beside `target` on `edge`'s side. `a`'s own tab goes with the window: the other
    /// tabs stay in a new window at its place, and `a` is gone. The target's window keeps its pin.
    func moveTabAsSplit(_ i: Int, of a: ChatWindowController, to c: ChatWindowController, beside target: ChatTerminalView, edge: NSRectEdge) {
        guard a !== c, c.acceptsTabs, a.canMoveOutOfWindow(tab: i) else { return NSSound.beep() }
        if a.tabHoldsOwn(i) {
            if a.tabCount > 1, splitOffRest(of: a, keeping: i) == nil { return NSSound.beep() }
            let (cargos, _) = a.detachAllTabs()
            removeChat(a.id)
            guard let cargo = cargos.first else { return }
            c.adoptSplit(cargo, beside: target, edge: edge)
        } else {
            guard let cargo = a.detachTab(i) else { return NSSound.beep() }
            c.adoptSplit(cargo, beside: target, edge: edge)
        }
        c.show()
    }

    /// A window dragged onto a pane's side: its tab in front joins `c` as a split there (a window of one tab dissolves into it).
    func mergeSplit(_ a: ChatWindowController, into c: ChatWindowController, beside target: ChatTerminalView, edge: NSRectEdge) {
        moveTabAsSplit(a.activeTabIndex, of: a, to: c, beside: target, edge: edge)
    }

    /// Every tab of `a` joins `c` (at `slot`, else the end) and `a` goes, without ending anything: the tab that was in front
    /// in `a` is in front in `c`.
    func merge(_ a: ChatWindowController, into c: ChatWindowController, slot: Int? = nil) {
        guard a !== c, a.canDissolve, c.acceptsTabs else { return NSSound.beep() }
        let (cargos, active) = a.detachAllTabs()
        // Nothing of `a` is left to end: its sessions are loose, and the window just closes.
        removeChat(a.id)
        var at = slot ?? c.tabCount
        for (n, cargo) in cargos.enumerated() {
            c.adopt(cargo, at: at, select: n == min(active, cargos.count - 1))
            at += 1
        }
        c.show()
    }

    /// The Window menu's Move Tab to New Window: the tab in front of the window in front.
    var canMoveTabToNewWindow: Bool {
        guard let a = activeChat, a.tabCount > 1 else { return false }
        return a.canMoveOutOfWindow(tab: a.activeTabIndex)
    }

    func moveTabToNewWindow() {
        guard let a = activeChat, canMoveTabToNewWindow else { return NSSound.beep() }
        moveTabToNewWindow(tab: a.activeTabIndex, of: a)
    }

    /// A tab's chip menu: tab `i` of `a` to a window of its own, a little down and right of `a`.
    func moveTabToNewWindow(tab i: Int, of a: ChatWindowController) {
        guard let f = a.window?.frame, a.tabCount > 1, a.canMoveOutOfWindow(tab: i) else { return NSSound.beep() }
        tearOff(tab: i, of: a, frame: tearFrame(like: a, at: NSPoint(x: f.midX + 30, y: f.maxY - 30)))
    }

    // The names typed for tabs (Rename Tab), by the tab's session name, kept across launches (sessions keep their names).
    private lazy var tabNames: [String: String] = UserDefaults.standard.dictionary(forKey: "tabNames") as? [String: String] ?? [:]

    func tabName(for session: String) -> String? { tabNames[session] }

    func setTabName(_ name: String?, for session: String) {
        tabNames[session] = name
        UserDefaults.standard.set(tabNames, forKey: "tabNames")
    }

    /// The windows Merge All Windows takes into the one in front: the others on screen that can give up all their tabs.
    private var mergeableWindows: [ChatWindowController] {
        guard let c = activeChat, c.acceptsTabs else { return [] }
        return shownChats.filter { $0 !== c && !$0.hud.mirror && !$0.hud.exited && $0.canDissolve }
    }

    var canMergeAll: Bool { !mergeableWindows.isEmpty }

    func mergeAllWindows() {
        guard let c = activeChat else { return NSSound.beep() }
        let list = mergeableWindows
        guard !list.isEmpty else { return NSSound.beep() }
        for o in list { merge(o, into: c) }
    }

    /// ⇧⌘↩: only the pane in front shows; with a single pane the window fills the screen.
    func toggleMaximize() {
        guard let c = activeChat, !c.toggleZoom() else { return }
        c.toggleMaximize()
    }

    /// What ⇧⌘T can bring back, the latest last: a closed window (hidden; it kept running), or a closed pane, whose
    /// session lives on for a few seconds, like iTerm2's.
    private enum Closed {
        case window(String)
        case pane(window: String, session: String, kind: PaneKind, cwd: String)
    }
    private var closedItems: [Closed] = []

    /// Tabs and split panes closed with ⌘W or their ×, still running as a closed window's chat does: each is a car on the
    /// orbit (Claude in one, a session), and a click brings it back into its window. The window's End Session ends them.
    /// Kept across launches, so they don't come back into their windows by themselves.
    private lazy var parked: [String: DetachedLink] = Dictionary(
        (UserDefaults.standard.stringArray(forKey: "parkedPanes") ?? []).map { ($0, DetachedLink(name: $0)) }, uniquingKeysWith: { a, _ in a })
    private func saveParked() { UserDefaults.standard.set(Array(parked.keys), forKey: "parkedPanes") }

    /// Parked panes opened from their car: windows of their own from then on, after a restart too (their sessions are still
    /// named after the window they were a tab of).
    private lazy var standalone = Set(UserDefaults.standard.stringArray(forKey: "standalonePanes") ?? [])
    private func saveStandalone() { UserDefaults.standard.set(Array(standalone), forKey: "standalonePanes") }

    func closed(_ id: String) {
        closedItems.removeAll { if case .window(id) = $0 { return true } else { return false } }
        remember(.window(id))
    }

    func closedPane(of window: ChatWindowController, session: String, kind: PaneKind, cwd: String) {
        parked[session] = DetachedLink(name: session)
        saveParked()
        remember(.pane(window: window.id, session: session, kind: kind, cwd: cwd))
        pushTerminals()
    }

    /// A parked pane opened again: from its car, in a window of its own (`own`); with ⇧⌘T, back into its window when that's
    /// still here.
    private func reopenParked(_ name: String, own: Bool) {
        guard let link = parked.removeValue(forKey: name) else { return }
        saveParked()
        // Its shell is gone (it ended, or the app restarted without it): the car goes, nothing opens.
        guard let shell = link.shellPid else { return pushTerminals() }
        // Already shown by a window: that one comes to the front.
        if let c = window(showing: name) {
            c.show()
            c.focusPane(hosting: shell)
            return pushTerminals()
        }
        let cwd = Proc.cwd(shell) ?? HOME
        if !own, let info = Detached.extraInfo(name), let c = chats.values.first(where: { $0.detached?.name == info.parent && !$0.hud.exited }) {
            c.show()
            c.adoptPane(session: name, kind: info.kind, cwd: cwd, focus: true)
        } else {
            standalone.insert(name)
            saveStandalone()
            let claude = ChatWindowController.runsClaude(shell)
            openWindow(cwd: cwd, claudeArgs: claude ? [] : nil, sessionId: nil, title: (cwd as NSString).lastPathComponent,
                       detached: DetachedLink(name: name))
        }
        pushTerminals()
    }

    /// End Session of a window: its parked tabs and panes end with it.
    func endParked(of window: String) {
        for name in parked.keys where Detached.extraInfo(name)?.parent == window {
            parked[name] = nil
            Detached.quit(name)
        }
        saveParked()
    }

    private func remember(_ item: Closed) {
        closedItems.append(item)
        if closedItems.count > 30 { closedItems.removeFirst() }
    }

    /// ⇧⌘T, iTerm2's Undo Close.
    func undoClose() {
        while let item = closedItems.popLast() {
            switch item {
            case let .window(id):
                if let c = chats[id], !c.isShown, !c.hud.exited { return c.show() }
            case let .pane(_, session, _, _):
                guard parked[session] != nil else { continue }
                return reopenParked(session, own: false)
            }
        }
        NSSound.beep()
    }

    /// Panes came or went in a window: the dashboard learns their shells (now, and once new ones have started).
    func panesChanged() {
        syncShells()
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) { [weak self] in self?.syncShells() }
    }

    /// A car on the orbit was clicked: its window comes up with that very pane in front (its tab shown, the keyboard in
    /// it), not whichever was used last; a closed tab's car opens in a window of its own.
    private func openTerminal(_ id: String) {
        if let c = chats.values.first(where: { $0.hasCar(id) }) {
            c.show()
            return c.focusCar(id)
        }
        if id.hasPrefix("s:") { reopenParked(String(id.dropFirst(2)), own: true) }
    }

    /// The chats list's End Terminal: a window's own terminal ends as its End button does (it asks when something runs in
    /// it); a tab's or split pane's, or a closed one still running, ends its session.
    private func endTerminal(_ id: String) {
        if let c = chats.values.first(where: { $0.carId == id && $0.hud.status == "terminal" && !$0.hud.exited }) {
            return c.endChat()
        }
        guard id.hasPrefix("s:") else { return }
        let name = String(id.dropFirst(2))
        if parked.removeValue(forKey: name) != nil { saveParked() }
        Detached.quit(name)
        terminalEnding(id)
        pushTerminals()
    }

    /// The chats list's open folder button: a folder from the system's picker stays at the list's top, with a terminal
    /// opened in it.
    private func openFolder(done finished: @escaping (Bool) -> Void) {
        let panel = NSOpenPanel()
        panel.title = "Open a folder in the chats list"
        panel.canChooseDirectories = true
        panel.canChooseFiles = false
        panel.allowsMultipleSelection = false
        panel.prompt = "Open"
        let done = { [weak self] (r: NSApplication.ModalResponse) in
            guard let self, r == .OK, let url = panel.url else { return finished(false) }
            self.sidebar.pin(url.path)
            self.newTerminal(in: url.path)
            finished(true)
        }
        if let w = window, w.isVisible { panel.beginSheetModal(for: w, completionHandler: done) } else { done(panel.runModal()) }
    }

    /// A terminal ended with its End button: its car explodes on the orbit now, not at the next terminals update.
    func terminalEnding(_ id: String) {
        radar.push("terminalGone", "\"\(id)\"")
    }

    func removeChat(_ id: String) {
        guard let c = chats.removeValue(forKey: id) else { return }
        c.endPanes()
        c.window?.parent?.removeChildWindow(c.window!)
        c.window?.orderOut(nil)
        dashboardVisibilityChanged()
        if activeTerminalWindow == id { activeTerminalWindow = activeChat?.id }
        syncShells()
        pushWinOpen()
        pushActiveSession()
        Mascot.shared.pushTerminalsNow()
    }

    func chatProcessEnded(_ id: String) {
        syncShells()
        pushWinOpen()
        pushActiveSession()
        Mascot.shared.pushTerminalsNow()
    }

    func chatVisibilityChanged() {
        if let id = activeTerminalWindow, chats[id]?.isShown != true { activeTerminalWindow = activeChat?.id }
        dashboardVisibilityChanged()
        pushWinOpen()
        pushActiveSession()
        Mascot.shared.pushTerminalsNow()
    }

    private func syncShells() {
        var map: [Int32: String] = [:]
        for c in chats.values {
            for pid in c.shellPids where pid > 0 { map[pid] = c.id }
        }
        engine.setAppShells(map)
        writeSnapshot()
    }

    /// Status (busy, idle, waiting) of the live session that process `pid` runs.
    func status(of pid: Int32) -> String? { briefs.values.first(where: { $0.pid == pid })?.status }

    /// Id of the live session that process `pid` runs.
    func sessionId(of pid: Int32) -> String? { briefs.values.first(where: { $0.pid == pid })?.id }

    /// A session the user just ended in a window leaves the dashboard at once (see RadarEngine.dismiss).
    func dismiss(sessionId: String?, pid: Int32?) {
        guard let sessionId else { return }
        engine.dismiss(sessionId: sessionId, pid: pid)
    }

    /// What an update's restart would cut off, one label per terminal session of this app: an AI that is working or waiting
    /// for the user, an AI that can't be resumed (its conversation isn't known), or a job running in the foreground of a plain
    /// shell. (An idle AI with a known conversation resumes after the restart; screen sessions an older build left survive it.)
    func restartInterrupts() -> [String] {
        var out: [String] = []
        for s in Sessions.live.values.sorted(by: { $0.name < $1.name }) {
            guard let shell = s.shellPid else { continue }
            let a = inspect(s, shell: shell)
            if a.aiRuns {
                let what = clip(a.brief.flatMap { $0.title.isEmpty ? $0.name : $0.title } ?? "An AI chat", 40)
                if let status = a.brief?.status, status != "idle" {
                    out.append(status == "waiting" ? "\(what) (waiting for you)" : "\(what) (working)")
                } else if a.ai == nil {
                    out.append("\(what) (can't be resumed)")
                }
            } else if let job = a.job {
                out.append(job)
            }
        }
        return out
    }

    /// What a terminal session of the app runs now: the one place that decides it, for the snapshot and for what a restart
    /// would cut off. The AI under its shell (a brief gives its conversation: Claude's id, Codex's, Antigravity's and Cursor's
    /// `convId`; once known it is kept in `session.ai` while a process of that tool still runs under the shell, so a later
    /// gap in the briefs doesn't lose it), and a foreground job. A job is what holds the terminal in front (not "the shell
    /// has children": prompt helpers such as gitstatusd are children of every shell).
    private struct SessionRun {
        var ai: (tool: String, id: String)?
        var aiRuns: Bool
        var brief: SessionBrief?
        var job: String?
    }

    private func inspect(_ s: PtySession, shell: Int32) -> SessionRun {
        // The session's own AI is the one nearest its shell: a Codex that Claude runs through its Bash tool is under the same
        // shell, further down.
        let b = nearestBrief(under: shell)
        if let b {
            var found: (tool: String, id: String)?
            if !b.id.hasPrefix("ai:") {
                found = ("claude", b.id)
            } else if let conv = b.convId {
                if b.name == "Codex" { found = ("codex", conv) }
                if b.name == "Antigravity" { found = ("agy", conv) }
                if b.name == "Cursor" { found = ("cursor", conv) }
            }
            // A nested AI of another tool never replaces the one the session runs while that one still runs.
            if let found, !(s.ai.map { $0.tool != found.tool && Self.toolRuns($0.tool, under: shell) } ?? false) { s.ai = found }
        }
        if let a = s.ai {
            if Self.toolRuns(a.tool, under: shell) {
                s.aiSeen = true
            } else if s.aiSeen || Date().timeIntervalSince(s.started) > 15 {
                // It quit (or never started): not resumed. (Right after a start, the AI takes a moment to show under the shell.)
                s.ai = nil
                s.aiSeen = false
            }
        }
        let aiRuns = ChatWindowController.runsAgent(shell)
        var job: String?
        if !aiRuns {
            if let group = Proc.foregroundGroup(shell), group != shell, !Proc.isClaude(group), Proc.otherAI(group) == nil {
                job = Proc.arguments(group).map(Self.commandLabel) ?? Proc.name(group) ?? "a command"
            } else if let child = Proc.children(of: shell).first(where: { pid in
                // A background job (`npm run dev &`): a direct child that isn't a shell (a prompt's helper subshell) or an AI.
                guard let name = Proc.name(pid) else { return false }
                return !["zsh", "bash", "fish", "sh", "ksh", "tcsh", "csh"].contains(name) && !Proc.isClaude(pid) && Proc.otherAI(pid) == nil
            }) {
                job = Proc.arguments(child).map(Self.commandLabel) ?? Proc.name(child) ?? "a command"
            }
        }
        return SessionRun(ai: s.ai, aiRuns: aiRuns, brief: b, job: job)
    }

    /// The live AI brief nearest `shell` (the shortest parent chain from its process to the shell).
    func nearestBrief(under shell: Int32) -> SessionBrief? {
        var best: (brief: SessionBrief, distance: Int)?
        for b in briefs.values where b.live && b.status != "ended" {
            guard var pid = b.pid else { continue }
            for distance in 0..<8 {
                if pid == shell {
                    if best == nil || distance < best!.distance { best = (b, distance) }
                    break
                }
                guard let parent = Proc.parent(pid), parent > 1 else { break }
                pid = parent
            }
        }
        return best?.brief
    }

    /// Whether a process of `tool` ("claude", "codex", "agy", "cursor") runs under `shell`.
    private static func toolRuns(_ tool: String, under shell: Int32) -> Bool {
        let match: (Int32) -> Bool = { pid in
            switch tool {
            case "claude": return Proc.isClaude(pid)
            case "codex": return Proc.otherAI(pid) == "Codex"
            case "agy": return Proc.otherAI(pid) == "Antigravity"
            case "cursor": return Proc.otherAI(pid) == "Cursor"
            default: return false
            }
        }
        var level = Proc.children(of: shell)
        for _ in 0..<4 where !level.isEmpty {
            if level.contains(where: match) { return true }
            level = level.flatMap { Proc.children(of: $0) }
        }
        return false
    }

    /// What Source Control's editor hasn't saved yet goes to disk (the app quits), then `done`, always later: at the
    /// latest in 2 s (a page that doesn't answer).
    func flushFiles(_ done: @escaping () -> Void) {
        // Through the run loop, never the main queue: a quit asked for from a main-queue job (an update's restart, from a
        // Task) waits in a run loop nested in that job, where the main queue runs nothing, so a reply sent there never
        // came and the app hung on "restarting". The run loop's common modes include the one that wait runs in.
        var finished = false
        let finish = {
            guard !finished else { return }
            finished = true
            RunLoop.main.perform(inModes: [.common], block: done)
        }
        // The note windows first: what they typed last goes through the dashboard's page, which keeps it.
        NoteWindow.flushAll { [weak self] in
            guard let self else { return finish() }
            self.radar.flushFiles { finish() }
        }
        RunLoop.main.add(Timer(timeInterval: 2, repeats: false) { _ in finish() }, forMode: .common)
    }

    /// The app quits (`relaunching`: an update's restart). Every terminal session of the app is written down for the next
    /// launch with its scrollback (an update), or forgotten (a real quit); the windows' views stop. Returns the shells of
    /// the app's own sessions, for `Detached.killTrees` (off the main thread). Screen sessions an older build left are the
    /// legacy quit's (`Detached.quitAll`, kept by an update).
    func terminateAll(relaunching: Bool) -> [Int32] {
        // Once only (a second call would find the sessions half-gone and write that down).
        guard !Sessions.stopping else { return [] }
        let sessions = Array(Sessions.live.values)
        let shells = sessions.compactMap(\.shellPid)
        // Before the launch has restored the last snapshot, the file is that one's: left as it is, either way.
        if snapshotReady {
            if relaunching {
                let snapshot = currentSnapshot(reason: "update")
                lastSnapshot = snapshot
                snapshot.write()
                for s in sessions {
                    // The whole scrollback (a pty has nothing repainting the rows on screen).
                    let text = String(decoding: s.terminal.getBufferAsData(kind: .normal), as: UTF8.self)
                    Detached.saveHistory(s.name, text: text, rows: 0)
                }
            } else {
                lastSnapshot = nil
                SessionSnapshot.delete()
            }
        }
        UserDefaults.standard.removeObject(forKey: Self.restoreKey)
        // From here the sessions' own end-of-process news (their shells are about to be hung up) is ignored, and the
        // snapshot isn't touched again.
        Sessions.stopping = true
        for c in chats.values {
            c.saveHistory()
            c.detachPanes()
            // A pty's shell isn't signalled here: killTrees collects its tree first, then hangs it up, so nothing of it
            // gets away. Only a screen relay (a legacy window's display) stops.
            if c.detached?.pty == nil { c.terminal.terminate() }
        }
        return shells
    }

    // MARK: what comes back after an update or a crash (SessionSnapshot)

    /// Off until the launch has restored the last snapshot: a first engine state must not overwrite it.
    private static let restoreKey = "restoreStartedAt-" + Detached.prefix.dropLast()

    private var snapshotReady = false
    private var lastSnapshot: SessionSnapshot?

    /// Every terminal session of the app with the AI conversation running in it (`inspect`).
    private func currentSnapshot(reason: String) -> SessionSnapshot {
        var entries: [SessionSnapshot.Entry] = []
        for s in Sessions.live.values.sorted(by: { $0.name < $1.name }) {
            guard let shell = s.shellPid else { continue }
            let a = inspect(s, shell: shell)
            let b = a.brief
            let folder = b.flatMap { $0.cwd.isEmpty ? nil : $0.cwd } ?? Proc.cwd(shell) ?? s.cwd
            let title = b.flatMap { $0.title.isEmpty ? nil : $0.title } ?? (folder as NSString).lastPathComponent
            entries.append(.init(name: s.name, cwd: folder, title: title, ai: a.ai.map { .init(tool: $0.tool, id: $0.id) }, account: s.account))
        }
        return SessionSnapshot(reason: reason, sessions: entries)
    }

    /// Writes the snapshot when it changed (every engine state, and whenever a session starts or ends).
    private func writeSnapshot() {
        guard snapshotReady, !Sessions.stopping else { return }
        let snapshot = currentSnapshot(reason: "running")
        guard snapshot != lastSnapshot else { return }
        lastSnapshot = snapshot
        snapshot.write()
    }

    func takeOver(pid: Int32, then: @escaping () -> Void, failed: @escaping () -> Void) {
        kill(pid, SIGTERM)
        DispatchQueue.global(qos: .userInitiated).async {
            for step in 0..<40 {
                if kill(pid, 0) != 0, errno == ESRCH {
                    Thread.sleep(forTimeInterval: 0.3)
                    DispatchQueue.main.async(execute: then)
                    return
                }
                if step == 15 { kill(pid, SIGTERM) }
                Thread.sleep(forTimeInterval: 0.2)
            }
            DispatchQueue.main.async(execute: failed)
        }
    }

    // MARK: view options

    deinit {
        if let frameObserver { NotificationCenter.default.removeObserver(frameObserver) }
        if let titlebarObserver { NotificationCenter.default.removeObserver(titlebarObserver) }
    }

    /// ⌘B (Chats List): the chats list folds its saved chats away, or unfolds them, in the page; the live chats stay. The
    /// state is kept across launches (`sidebarHidden`).
    func toggleSidebar() {
        let on = !UserDefaults.standard.bool(forKey: "sidebarHidden")
        UserDefaults.standard.set(on, forKey: "sidebarHidden")
        radar.push("chatsFold", on ? "true" : "false")
    }

    /// The terminals' text size, and whether the user picked it here (else it's their iTerm2 one): Settings sync
    /// (sync.js) carries it to their other computers.
    var terminalFont: (size: CGFloat, chosen: Bool) { (fontSize, UserDefaults.standard.double(forKey: "terminalFontSize") >= 9) }

    /// A size from another of the user's computers (Settings sync).
    func setFont(_ size: CGFloat) {
        fontSize = min(24, max(9, size))
        UserDefaults.standard.set(Double(fontSize), forKey: "terminalFontSize")
        for c in chats.values { c.setFont(fontSize) }
    }

    func changeFont(by delta: CGFloat?) {
        fontSize = delta.map { min(24, max(9, fontSize + $0)) } ?? ITermLook.current?.fontSize ?? 13
        UserDefaults.standard.set(Double(fontSize), forKey: "terminalFontSize")
        for c in chats.values { c.setFont(fontSize) }
    }

    /// The terminals' font, picked in Settings or from another computer (TerminalFont): every open terminal takes it.
    func setFontFamily(_ family: String?) {
        TerminalFont.set(family)
        for c in chats.values { c.setFont(fontSize) }
    }

    private func alert(_ title: String, _ text: String) {
        _ = ask(title, text, ["OK"], style: .warning)
    }

    @discardableResult
    private func ask(_ title: String, _ text: String, _ buttons: [String], style: NSAlert.Style = .informational) -> Int {
        let a = NSAlert()
        a.messageText = title
        a.informativeText = text
        a.alertStyle = style
        for b in buttons { a.addButton(withTitle: b) }
        return a.runModal().rawValue - NSApplication.ModalResponse.alertFirstButtonReturn.rawValue
    }

    func mascotTerminalSnapshots() -> [[String: Any]] {
        guard let dw = window else { return [] }
        let df = dw.frame
        return chats.values.compactMap { c in
            guard c.isShown, let tw = c.window else { return nil }
            let tf = tw.frame
            let status = c.sessionId.flatMap { briefs[$0]?.status } ?? "idle"
            var item: [String: Any] = [
                "canClose": c.closeOnlyHides,
                "id": c.id,
                "sid": c.sessionId ?? "",
                "wn": tw.windowNumber,
                // Pinned: above every app's windows, so not in Mascot's window list (layer 0 only).
                "floating": tw.level.rawValue > NSWindow.Level.normal.rawValue && tw.isOnActiveSpace,
                "x": Int((tf.minX - df.minX).rounded()),
                "y": Int((df.maxY - tf.maxY).rounded()),
                "w": Int(tf.width.rounded()),
                "h": Int(tf.height.rounded()),
                "status": status,
            ]
            // The close (X) button, dashboard-relative like the rest; only when pressing it just hides the window.
            if c.closeOnlyHides, let r = c.closeButtonScreenRect {
                item["cx"] = Int((r.minX - df.minX).rounded())
                item["cy"] = Int((df.maxY - r.maxY).rounded())
                item["cw"] = Int(r.width.rounded())
                item["ch"] = Int(r.height.rounded())
            }
            return item
        }
    }

    func mascotWebOriginAndZoom() -> (origin: CGPoint, zoom: CGFloat)? {
        guard let dw = window else { return nil }
        let web = radar.webView
        let wr = web.convert(web.bounds, to: nil)
        return (CGPoint(x: wr.minX, y: dw.frame.height - wr.maxY), web.pageZoom)
    }

    func mascotPageEval(_ js: String) {
        radar.webView.evaluateJavaScript("\(js); true", completionHandler: nil)
    }

    func mascotOpenView(_ view: String) {
        guard ["dash", "board", "notes", "friends", "themes", "notifications", "roadmap", "git"].contains(view) else { return }
        radar.push("openView", "\"\(view)\"")
    }

    func mascotNavTap(_ id: String) {
        // A folder's fold (`fold:<key>`) is the page's own (chats.js), reached through `__mascotNav` like the other taps.
        guard let data = try? JSONEncoder().encode(id), let arg = String(data: data, encoding: .utf8) else { return }
        radar.webView.evaluateJavaScript("window.__mascotNav?.(\(arg)); true", completionHandler: nil)
    }

    /// She walked to the terminal's X button and pressed it. The X only hides the window (windowShouldClose), so the
    /// real button is clicked when that is so; otherwise it is only highlighted and the window is hidden the same way
    /// as before. A session is never ended and the typed text stays. Idle sessions only.
    /// Returns false only when keyboard focus could not be parked (nothing was closed then).
    @discardableResult
    func mascotPressClose(_ id: String) -> Bool {
        // Live chats only: a dead (exited) chat or a mirror does something else on close, so she never touches those.
        guard let chat = chats[id], chat.isShown, !chat.isHiding, chat.closeOnlyHides else { return true }
        let status = chat.sessionId.flatMap { briefs[$0]?.status } ?? "idle"
        guard status == "idle" else { return true }
        guard mascotParkKey() else { return false }
        chat.mascotShieldUntil = Date().addingTimeInterval(1.5)
        guard let btn = chat.window?.standardWindowButton(.closeButton), !btn.isHidden else {
            return mascotHideTerminal(id)
        }
        btn.performClick(nil)
        return true
    }

    /// Before she hides a terminal the dashboard takes the keyboard (and no field), so keys still in flight go nowhere
    /// instead of landing in another terminal that AppKit would otherwise make key.
    /// True only if the dashboard is visible, not miniaturized, and really became key.
    private func mascotParkKey() -> Bool {
        guard let dw = window, dw.isVisible, !dw.isMiniaturized else { return false }
        dw.makeKey()
        guard dw.isKeyWindow else { return false }
        dw.makeFirstResponder(nil)
        return true
    }

    /// Returns false only when keyboard focus could not be parked (nothing was hidden then).
    @discardableResult
    func mascotHideTerminal(_ id: String) -> Bool {
        guard let chat = chats[id], chat.isShown, !chat.isHiding, chat.closeOnlyHides else { return true }
        let status = chat.sessionId.flatMap { briefs[$0]?.status } ?? "idle"
        guard status == "idle" else { return true }
        guard mascotParkKey() else { return false }
        chat.mascotShieldUntil = Date().addingTimeInterval(1.5)
        if chat.hide() { closed(id) }
        return true
    }
}

