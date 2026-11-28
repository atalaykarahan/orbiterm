import AppKit
import QuartzCore
import SwiftTerm
import Combine
import SwiftUI

// MARK: - live model for one chat window

struct TickerChip: Identifiable, Equatable {
    let id: Int
    /// The session it came from: a window split into panes shows only the focused pane's (ChatHUD.focusSid).
    let sid: String
    let tag: String
    let text: String
    let hex: UInt32
    let at: Date
}

@MainActor
final class ChatHUD: ObservableObject {
    @Published var brief: SessionBrief?
    /// The second-AI note under the header (WorktreeNudge.swift): nil while there is none.
    @Published var nudge: WorktreeOffer?
    /// Folder of a window opened as a terminal: Claude runs there only when started (or resumed) by hand.
    let terminalDir: String?
    /// The AI this chat starts, for "starting …": claude, codex or antigravity.
    var aiName = "claude"
    @Published var exited = false
    /// Rides on the dashboard as its child window. Off while pinned on top, and always off with Settings' "chat
    /// windows on their own" (ChatWindows.free).
    @Published var attached = !ChatWindows.free
    /// Above every app's windows (floating), like an always-on-top pin.
    @Published var onTop = false
    /// A second screen on a chat another build of the app runs: closing it leaves the chat running.
    var mirror = false
    @Published var chips: [TickerChip] = []
    /// Tabs open in this window right now: the HUD's End Session button hides when there are two or more, so the per-tab
    /// × on each chip ends only its own tab and nothing else can.
    @Published var tabCount = 1
    /// A tab here holds several panes, each with its own star on its slim bar (PaneTitleBar): the HUD's star hides, or it
    /// would be one more star with no telling which pane's chat it marks.
    @Published var paneSplit = false
    /// In a split, the focused pane's session and brief: the footer shows its status and its lines only, not every pane's
    /// mixed together. Nil without a split (the footer is the window's one chat).
    @Published var focusSid: String?
    @Published var focusBrief: SessionBrief?
    /// Starred in the sidebar: the HUD's star icon fills in.
    @Published var isFavorite = false
    /// The env view (EnvView.swift) is over the terminal, and it holds changes not saved: the header's env button.
    @Published var envOpen = false
    @Published var envUnsaved = false
    /// False while the window is hidden, so its clocks stop ticking.
    @Published var visible = false
    /// The dashboard's streamer mode (Streamer.swift): the header and the footer show made-up names.
    @Published var streamer = false
    /// The linked worktree this window works in, and what the title row says about it (WorktreeChip.swift, WorktreeShip.swift).
    var wtTop: String?
    var wtMain = ""
    var wtBranch = ""
    @Published var wt: WorktreeStatus?
    @Published var shipBusy: String?
    @Published var shipDeleted = false
    @Published var shipMenuOpen = false
    /// The Claude account of the pane in front, and the note about it, in the worktree note's slot (ClaudeAccountsChat.swift).
    @Published var acct: AcctChipState?
    @Published var acctNote: AcctNote?
    /// A switch (to an account id) waiting for that session's reply to end, by session id; only in memory, on the user's click.
    var pendingSwitch: [String: String] = [:]
    /// Chats going on under another account right now (acctPerform), by session id, with the pid of the Claude that is
    /// leaving: until the new one is up, the window says "starting", never ended.
    @Published var switching: [String: Int32] = [:]
    /// In a split, the focused pane's chat is one of them (its brief is gone for that moment).
    @Published var focusStarting = false
    var acctHold = false, wentAt = 0.0
    var limitQuiet = Set<String>(), lowQuiet = Set<String>()
    var onAcctMenu: (() -> Void)?
    var onAcct: ((AcctAction) -> Void)?
    /// The window's width, for the title row's three sizes (960 pt and up, 640 to 959, under 640).
    @Published var width: CGFloat = 900
    var onShip: ((String) -> Void)?
    var onShipMenu: (() -> Void)?
    private var seq = 0

    init(terminalDir: String?) { self.terminalDir = terminalDir }

    /// A terminal window is a chat while Claude runs in it, and a terminal again once Claude exits.
    var status: String {
        if exited { return "ended" }
        if let b = brief, let old = switching[b.id], !b.live || b.pid == old { return "starting" }
        if let b = brief, b.live || terminalDir == nil { return b.status }
        return terminalDir != nil ? "terminal" : "starting"
    }

    func push(_ e: NativeEvent) {
        if e.kind == "usage" || e.kind == "result" { return }
        let hex: UInt32 = e.kind == "prompt" ? ThemeStore.shared.hex("--accent-soft") : e.kind == "say" ? ThemeStore.shared.hex("--txt2")
            : Theme.catHex[e.cat ?? ""] ?? Theme.planHex
        // Another AI tool's answer (Codex's, Antigravity's: their sessions are "ai:…") is its own, not Claude's.
        let tag = e.kind == "tool" ? Theme.catLabel[e.cat ?? ""] ?? "tool" : e.kind == "prompt" ? "you"
            : e.kind == "say" ? (e.sid.hasPrefix("ai:") ? "reply" : "claude") : e.kind
        seq += 1
        withAnimation(.spring(response: 0.38, dampingFraction: 0.8)) {
            chips.append(TickerChip(id: seq, sid: e.sid, tag: tag, text: String(e.label.prefix(42)), hex: hex, at: Date()))
            // The last 9 of each session (panes each keep theirs, for when the focus moves to them), 36 in all.
            let mine = chips.indices.filter { chips[$0].sid == e.sid }
            if mine.count > 9 { chips.remove(at: mine[0]) }
            if chips.count > 36 { chips.removeFirst(chips.count - 36) }
        }
    }
}

// MARK: - formatting

private func fmtTok(_ n: Int) -> String {
    let d = Double(n)
    if d >= 1e6 { return String(format: "%.1fM", d / 1e6) }
    if d >= 1e4 { return "\(Int((d / 1e3).rounded()))k" }
    if d >= 1e3 { return String(format: "%.1fk", d / 1e3) }
    return "\(n)"
}

private func fmtUsd(_ n: Double) -> String {
    n >= 100 ? String(format: "$%.0f", n) : n >= 0.01 ? String(format: "$%.2f", n) : n > 0 ? String(format: "$%.3f", n) : "$0"
}

private func fmtDur(_ ms: Double) -> String {
    let s = Int(max(0, ms) / 1000)
    if s < 60 { return "\(s)s" }
    if s < 3600 { return "\(s / 60)m\(String(format: "%02d", s % 60))" }
    return "\(s / 3600)h\(String(format: "%02d", (s % 3600) / 60))"
}

private func clock(_ ms: Double) -> String {
    let s = Int(max(0, ms) / 1000)
    let h = s / 3600, m = (s % 3600) / 60, x = s % 60
    return h > 0 ? String(format: "%d:%02d:%02d", h, m, x) : String(format: "%d:%02d", m, x)
}

private func nowMsDate(_ d: Date) -> Double { d.timeIntervalSince1970 * 1000 }

// MARK: - header (title row + HUD row)

struct ChatHeaderView: View {
    @ObservedObject var hud: ChatHUD
    @ObservedObject var theme = ThemeStore.shared
    let onTogglePin: () -> Void
    let onEnd: () -> Void
    let onCopyReply: () -> Void
    let onToggleFavorite: () -> Void
    let onToggleEnv: () -> Void

    var body: some View {
        // Clocks tick once a second. Per-frame effects here kept the main thread busy and froze the
        // app with several chats open; the moving parts of a chat window are Core Animation layers.
        TimelineView(.periodic(from: .now, by: hud.visible ? 1 : 3600)) { tl in
            let status = hud.status
            let hex = Theme.statusHex[status] ?? Theme.endedHex
            ZStack(alignment: .topLeading) {
                if Mur47.on { Mur47Backdrop() } else { HeaderBackdrop(hex: hex) }
                VStack(alignment: .leading, spacing: 0) {
                    TitleRow(hud: hud, now: tl.date, status: status, hex: hex)
                        .frame(height: 32)
                    HUDRow(hud: hud, now: tl.date, hex: hex, onTogglePin: onTogglePin, onEnd: onEnd,
                           onCopyReply: onCopyReply, onToggleFavorite: onToggleFavorite, onToggleEnv: onToggleEnv)
                        .frame(height: 30)
                        .zIndex(1)
                }
            }
        }
        .id(theme.current.id)
        .frame(height: 62)
        .ignoresSafeArea()
    }
}

private struct TitleRow: View {
    @ObservedObject var hud: ChatHUD
    let now: Date
    let status: String
    let hex: UInt32

    var body: some View {
        let color = Color(hex: hex)
        let dir = status == "terminal" ? hud.terminalDir : nil
        // In a linked worktree the name is the repo's (the chip says which worktree), not the worktree folder's.
        let inWorktree = hud.wtTop != nil
        let narrow = inWorktree && hud.width < 640
        let real = inWorktree ? Worktrees.home(hud.wtMain).leaf : dir.map { ($0 as NSString).lastPathComponent } ?? hud.brief?.name ?? "chat"
        let realTitle = dir.map(tildify) ?? hud.brief?.title ?? ""
        // Streamer mode: the made-up ones the dashboard shows (an AI tool's own name stays).
        let tools: Set<String> = ["chat", "Claude", "Codex", "Antigravity", "Gemini", "OpenCode", "Aider", "Cursor", "Copilot"]
        let name = hud.streamer && !tools.contains(real) ? Streamer.fake("project", real) : real
        let title = !hud.streamer ? realTitle : dir.map(Streamer.folder) ?? Streamer.fake("title", realTitle)
        let mur47 = Mur47.on
        HStack(spacing: 8) {
            if mur47 {
                // MUR47: its mark in place of the hexagon, the name in stencil on the walnut
                Text("47")
                    .font(Mur47.stencil(15))
                    .foregroundColor(Theme.cAccent)
                    .shadow(color: Theme.cAccent.opacity(0.7), radius: 6)
                if !narrow {
                    Text(name.uppercased())
                        .font(Mur47.stencil(12))
                        .tracking(1.4)
                        .foregroundColor(Mur47.titleText)
                        .shadow(color: .black.opacity(0.7), radius: 0, x: 0, y: 1)
                        .lineLimit(1)
                }
            } else {
                Image(systemName: "hexagon")
                    .font(.system(size: 12, weight: .bold))
                    .foregroundColor(color)
                    .shadow(color: color, radius: 6)
                if !narrow {
                    Text(name)
                        .font(.mono(12, .bold))
                        .foregroundColor(Theme.cAccent)
                        .shadow(color: Theme.cAccent.opacity(0.6), radius: 6)
                        .lineLimit(1)
                }
            }
            if inWorktree {
                WorktreeChipView(branch: hud.streamer ? Streamer.fake("branch", hud.wt?.branch ?? hud.wtBranch) : hud.wt?.branch ?? hud.wtBranch,
                                 st: hud.wt, deleted: hud.shipDeleted, wide: hud.width >= 960, compact: narrow, streamer: hud.streamer,
                                 action: { hud.onShip?("changes") })
            }
            // Two or more Claude accounts: the one this terminal uses, and a way to change it (ClaudeAccountsChat.swift).
            if let a = hud.acct, !hud.mirror {
                AccountChip(state: a, narrow: hud.width < 640, onOpen: { hud.onAcctMenu?() })
            }
            Text("·").font(.mono(12)).foregroundColor(mur47 ? Mur47.titleText.opacity(0.6) : Theme.cDim2)
            Text(title)
                .font(.mono(12))
                .foregroundColor(mur47 ? Mur47.titleText : Theme.cHi)
                .shadow(color: mur47 ? .black.opacity(0.6) : .clear, radius: 0, x: 0, y: 1)
                .lineLimit(1)
                .truncationMode(.tail)
            Spacer(minLength: 8)
            // A mirror shows the chip only: the actions are for the app the chat runs in. After a delete there's no button.
            if inWorktree, !hud.mirror, !hud.shipDeleted, let wt = hud.wt {
                WorktreeShipButton(st: wt, busy: hud.shipBusy, menuOpen: hud.shipMenuOpen, streamer: hud.streamer,
                                   onMain: { hud.onShip?($0) }, onMore: { hud.onShipMenu?() })
            }
            StatusPill(status: status, hex: hex, since: hud.brief?.statusSince ?? 0,
                       waitingFor: hud.streamer ? hud.brief?.waitingFor.map { Streamer.fake("wait", $0) } : hud.brief?.waitingFor, now: now)
        }
        .padding(.leading, 80)
        .padding(.trailing, 12)
    }
}

private struct StatusPill: View {
    let status: String
    let hex: UInt32
    let since: Double
    let waitingFor: String?
    let now: Date

    var body: some View {
        let color = Color(hex: hex)
        let timed = (status == "busy" || status == "idle" || status == "waiting") && since > 0
        let label = Theme.statusLabel(status) + (timed ? " " + clock(nowMsDate(now) - since) : "")
        let waiting = status == "waiting"
        Text(label)
            .font(.mono(10.5, .bold))
            .tracking(1.2)
            .padding(.horizontal, 8)
            .padding(.vertical, 2)
            .foregroundColor(waiting ? Theme.cInk : color)
            .background(waiting ? color : color.opacity(0.14))
            .overlay(RoundedRectangle(cornerRadius: 3).stroke(color, lineWidth: 1))
            .shadow(color: color.opacity(0.6), radius: 8)
            .opacity(waiting && Int(now.timeIntervalSinceReferenceDate) % 2 == 0 ? 0.45 : 1)
            .hoverTag(waitingFor ?? "", hex: hex, side: .left)
    }
}

/// Our own hover tag. The header redraws every second (TimelineView), which keeps macOS's native help tag
/// from ever appearing, so the buttons here show this one after the pointer rests on them for half a second.
private struct HoverTag: ViewModifier {
    enum Side { case above, left }
    let text: String
    let hex: UInt32
    let side: Side
    @State private var hover = false
    @State private var show = false

    func body(content: Content) -> some View {
        content
            .onHover { inside in
                hover = inside
                if !inside { show = false }
            }
            .simultaneousGesture(TapGesture().onEnded { show = false })
            .task(id: hover) {
                guard hover else { return }
                try? await Task.sleep(nanoseconds: 500_000_000)
                if hover && !Task.isCancelled { show = true }
            }
            .overlay(alignment: side == .above ? .topTrailing : .leading) {
                if show && !text.isEmpty { tag }
            }
            .accessibilityHint(text)
    }

    private var tag: some View {
        let above = side == .above
        let box = Text(text)
            .font(.system(size: 10.5))
            .foregroundColor(Theme.cText)
            .lineLimit(1)
            .fixedSize()
            .padding(.horizontal, 7)
            .padding(.vertical, 3)
            .background(Theme.cBg)
            .overlay(Rectangle().stroke(Color(hex: hex), lineWidth: 1))
            .allowsHitTesting(false)
        return Group {
            if above {
                box.alignmentGuide(.top) { d in d.height + 4 }
            } else {
                box.alignmentGuide(.leading) { d in d.width + 6 }
            }
        }
    }
}

private extension View {
    func hoverTag(_ text: String, hex: UInt32, side: HoverTag.Side = .above) -> some View {
        modifier(HoverTag(text: text, hex: hex, side: side))
    }
}

private struct HUDRow: View {
    @ObservedObject var hud: ChatHUD
    let now: Date
    let hex: UInt32
    let onTogglePin: () -> Void
    let onEnd: () -> Void
    let onCopyReply: () -> Void
    let onToggleFavorite: () -> Void
    let onToggleEnv: () -> Void

    var body: some View {
        HStack(spacing: 14) {
            if let dir = hud.terminalDir, hud.status == "terminal" {
                Text("terminal in \(hud.streamer ? Streamer.folder(dir) : tildify(dir))").foregroundColor(Theme.cDim).lineLimit(1)
            } else if let b = hud.brief {
                // With two or more tabs each tab's chip shows its own context and counts; one bar here would be one tab's.
                let perTab = hud.tabCount > 1 || hud.paneSplit
                if !perTab { ContextBar(ctx: b.ctx, ctxMax: b.ctxMax) }
                if !b.model.isEmpty && !hud.paneSplit {
                    Text([b.model, b.effort].filter { !$0.isEmpty }.joined(separator: " · ")).foregroundColor(Theme.cDim)
                }
                // Only Claude's is priced: another AI tool ("ai:…") would show a $0 it didn't cost.
                if !b.id.hasPrefix("ai:") && !hud.paneSplit {
                    Text(fmtUsd(b.cost)).foregroundColor(Theme.cAmber).fontWeight(.semibold)
                }
                if !perTab { Counts(b: b) }
                if !b.actionName.isEmpty && !hud.paneSplit {
                    ActionLabel(b: b, now: now, streamer: hud.streamer)
                }
            } else {
                Text("starting \(hud.aiName)…").foregroundColor(Theme.cDim)
            }
            Spacer(minLength: 6)
            if let b = hud.brief, !b.spark.isEmpty, hud.status != "terminal", !hud.paneSplit {
                SparkView(values: b.spark, hex: hex).frame(width: 96, height: 18)
            }
            // With split panes each pane's bar has its own copy, env and end buttons (each may run in another folder).
            if hud.status != "terminal" && !hud.paneSplit {
                HUDButton(symbol: "doc.on.doc", active: false,
                          help: "Copy the AI's last reply, all of it (⇧⌘C)", hex: hex, action: onCopyReply)
            }
            if !hud.paneSplit || hud.envOpen {
            HUDButton(symbol: "", label: "env", active: hud.envOpen,
                      help: hud.envOpen ? "Back to the terminal (⇧⌘E)"
                          : "The env files in this folder and the ones in it: open one to edit or copy from it (⇧⌘E)."
                              + (hud.envUnsaved ? " It has changes not saved." : ""),
                      hex: ThemeStore.shared.hex("--amber"), badge: hud.envUnsaved, action: onToggleEnv)
            }
            // With tabs, each chat tab carries its own star (PaneTabBar), and with split panes each pane's bar does; the
            // window's star is for a single chat.
            if hud.tabCount < 2 && !hud.paneSplit {
                HUDButton(symbol: hud.isFavorite ? "star.fill" : "star", active: hud.isFavorite,
                          help: hud.isFavorite ? "Remove this chat from your favorites"
                              : "Add this chat to your favorites in the sidebar",
                          hex: ThemeStore.shared.hex("--amber"), action: onToggleFavorite)
            }
            HUDButton(symbol: hud.onTop ? "pin.fill" : "pin", active: hud.onTop,
                      help: hud.onTop ? "Stop keeping this window above all other apps"
                          : "Keep this window above all other apps",
                      hex: hex, action: onTogglePin)
            // With two or more tabs the HUD's End Session ended the window, not the tab in front: ambiguous. The × on
            // each tab chip ends that tab, so the HUD button hides in multi-tab mode.
            if hud.tabCount <= 1 && !hud.paneSplit {
                HUDButton(symbol: "power", active: false,
                          help: hud.mirror ? "End this chat here and in the other app" : hud.status == "terminal" ? "Close this terminal" : "End this chat and stop the AI",
                          hex: ThemeStore.shared.hex("--red"), action: onEnd)
            }
        }
        .font(.mono(10.5))
        .lineLimit(1)
        .padding(.horizontal, 12)
        .background(Color.black.opacity(0.16))
        .overlay(alignment: .top) { Rectangle().fill(Color(hex: hex, opacity: 0.18)).frame(height: 1) }
        .overlay(alignment: .bottom) { Rectangle().fill(Color(hex: hex, opacity: 0.35)).frame(height: 1) }
    }
}

private struct ContextBar: View {
    let ctx: Int
    let ctxMax: Double

    var body: some View {
        let frac = ctxMax > 0 ? min(1, Double(ctx) / ctxMax) : 0
        HStack(spacing: 6) {
            Text("ctx").foregroundColor(Theme.cDim)
            ZStack(alignment: .leading) {
                Rectangle().fill(Color.white.opacity(0.08))
                Rectangle()
                    .fill(LinearGradient(colors: [Theme.cAccent, Theme.cAmber], startPoint: .leading, endPoint: .trailing))
                    .frame(width: 110 * frac)
                    .shadow(color: Theme.cAccent.opacity(0.7), radius: 4)
            }
            .frame(width: 110, height: 6)
            Text("\(fmtTok(ctx))\(ctxMax > 0 ? " / " + fmtTok(Int(ctxMax)) : "")").foregroundColor(Theme.cText)
        }
    }
}

private struct Counts: View {
    let b: SessionBrief

    var body: some View {
        HStack(spacing: 0) {
            Text("\(b.tools)").foregroundColor(Theme.cText).fontWeight(.semibold)
            Text(" tools · ").foregroundColor(Theme.cDim)
            Text("\(b.web)").foregroundColor(Theme.cText).fontWeight(.semibold)
            Text(" web · ").foregroundColor(Theme.cDim)
            Text("\(b.errors)").foregroundColor(b.errors > 0 ? Theme.cRed : Theme.cText).fontWeight(.semibold)
            Text(" err").foregroundColor(Theme.cDim)
            if b.agentsRunning > 0 {
                Text(" · ⤷\(b.agentsRunning)").foregroundColor(Theme.cViolet).fontWeight(.semibold)
            }
        }
    }
}

private struct ActionLabel: View {
    let b: SessionBrief
    let now: Date
    let streamer: Bool

    var body: some View {
        let color = Color(hex: Theme.catHex[b.actionCat] ?? Theme.planHex)
        HStack(spacing: 5) {
            Text("▸ \(b.actionName)").foregroundColor(color).fontWeight(.bold)
            Text(streamer ? Streamer.call(b.actionCat, b.actionLabel) : b.actionLabel)
                .foregroundColor(Theme.cText)
                .truncationMode(.tail)
            Text(fmtDur(nowMsDate(now) - b.actionSince)).foregroundColor(Theme.cDim)
        }
        .layoutPriority(-1)
    }
}

private struct SparkView: View {
    let values: [Int]
    let hex: UInt32

    var body: some View {
        Canvas { ctx, size in
            let maxV = max(1, values.max() ?? 1)
            let bw = size.width / CGFloat(max(1, values.count))
            for (i, v) in values.enumerated() {
                let h = v > 0 ? max(3, CGFloat(v) / CGFloat(maxV) * (size.height - 2)) : 2
                let alpha = v > 0 ? 0.85 : 0.18
                ctx.fill(Path(CGRect(x: CGFloat(i) * bw + 0.5, y: size.height - h, width: bw - 1, height: h)),
                         with: .color(Color(hex: hex, opacity: alpha)))
            }
        }
    }
}

private struct HUDButton: View {
    let symbol: String
    /// Words instead of a symbol (the env button): the same square, as wide as the word needs.
    var label: String?
    let active: Bool
    let help: String
    let hex: UInt32
    /// A dot at the corner: the env view holds changes not saved.
    var badge = false
    let action: () -> Void
    @State private var hover = false

    var body: some View {
        let color = Color(hex: hex)
        Button(action: action) {
            Group {
                if let label { Text(label).font(.mono(10, .bold)).accessibilityLabel(badge ? "\(label) files, unsaved changes" : "\(label) files") } else { Image(systemName: symbol).font(.system(size: 10, weight: .bold)) }
            }
                .foregroundColor(active ? Theme.cInk : (hover ? Theme.cHi : Theme.cDim))
                .frame(width: label == nil ? 24 : 34, height: 20)
                // The whole square takes the click, not only the symbol's own pixels (a plain button's default):
                // the power symbol is a thin ring, and most clicks on it missed.
                .contentShape(Rectangle())
                .background(active ? color : Color.clear)
                .overlay(Rectangle().stroke(color.opacity(hover || active ? 1 : 0.4), lineWidth: 1))
                .shadow(color: hover ? color.opacity(0.6) : .clear, radius: 6)
                .overlay(alignment: .topTrailing) {
                    if badge { Circle().fill(Theme.cAmber).frame(width: 6, height: 6).offset(x: 2, y: -2) }
                }
        }
        .buttonStyle(.plain)
        .onHover { hover = $0 }
        .hoverTag(help, hex: hex)
        // An icon alone: the tag's text is its name for VoiceOver too.
        .accessibilityLabel(help)
    }
}

private struct HeaderBackdrop: View {
    let hex: UInt32

    var body: some View {
        Canvas { ctx, size in
            let color = Color(hex: hex)
            ctx.fill(Path(CGRect(x: 0, y: 0, width: size.width, height: 32)),
                     with: .linearGradient(Gradient(colors: [color.opacity(0.14), .clear]), startPoint: .zero, endPoint: CGPoint(x: 0, y: 32)))
            var grid = Path()
            var x: CGFloat = 0
            while x < size.width {
                grid.move(to: CGPoint(x: x, y: 0))
                grid.addLine(to: CGPoint(x: x, y: 32))
                x += 18
            }
            ctx.stroke(grid, with: .color(color.opacity(0.07)), lineWidth: 1)
        }
    }
}

// MARK: - ticker (footer)

struct ChatTickerView: View {
    @ObservedObject var hud: ChatHUD
    @ObservedObject var theme = ThemeStore.shared

    var body: some View {
        TimelineView(.periodic(from: .now, by: hud.visible ? 1 : 3600)) { tl in
            let blinkOff = Int(tl.date.timeIntervalSinceReferenceDate) % 2 == 0
            let status = hud.focusStarting ? "starting" : hud.focusBrief?.status ?? hud.status
            let color = Color(hex: Theme.statusHex[status] ?? Theme.endedHex)
            HStack(spacing: 10) {
                Text(statusText(status))
                    .font(.mono(10.5, .semibold))
                    .foregroundColor(color)
                    .shadow(color: color.opacity(0.6), radius: 6)
                    .opacity(status == "waiting" && blinkOff ? 0.35 : 1)
                    .lineLimit(1)
                Spacer(minLength: 8)
                HStack(spacing: 6) {
                    ForEach(hud.focusSid.map { sid in hud.chips.filter { $0.sid == sid } } ?? Array(hud.chips.suffix(9))) { chip in
                        ChipView(chip: chip, now: tl.date, streamer: hud.streamer)
                            .transition(.asymmetric(insertion: .move(edge: .trailing).combined(with: .opacity), removal: .opacity))
                    }
                }
            }
            .padding(.horizontal, 12)
            .frame(maxHeight: .infinity)
        }
        .frame(height: 26)
        .background(Color.black.opacity(0.2))
        .overlay(alignment: .top) { Rectangle().fill(Color(hex: Theme.statusHex[hud.status] ?? Theme.endedHex, opacity: 0.3)).frame(height: 1) }
    }

    private func statusText(_ status: String) -> String {
        switch status {
        case "busy": return "● working"
        case "idle": return "◆ your turn"
        case "waiting": return "⚠ NEEDS YOU" + ((hud.focusBrief ?? hud.brief)?.waitingFor.map { " · \(hud.streamer ? Streamer.fake("wait", $0) : $0)" } ?? "")
        case "terminal": return "▸ terminal · claude to start · claude -r to resume"
        case "starting": return "◌ starting \(hud.aiName)…"
        default: return "○ ended · close the window to remove it"
        }
    }
}

private struct ChipView: View {
    let chip: TickerChip
    let now: Date
    let streamer: Bool

    var body: some View {
        let color = Color(hex: chip.hex)
        let fresh = now.timeIntervalSince(chip.at) < 1.4
        HStack(spacing: 5) {
            Text(chip.tag).foregroundColor(color).fontWeight(.bold)
            Text(streamer ? Streamer.call(chip.tag, chip.text) : chip.text).foregroundColor(Theme.cText)
        }
        .font(.mono(9.5))
        .lineLimit(1)
        .padding(.horizontal, 7)
        .padding(.vertical, 1)
        .frame(maxWidth: 230)
        .background(fresh ? color.opacity(0.18) : Color.clear)
        .overlay(Rectangle().stroke(color, lineWidth: 1))
        .shadow(color: fresh ? color : .clear, radius: 6)
    }
}

/// Frosted glass that lets the mouse through to what's under it (streamer mode's veil over a chat's terminals).
final class PassThroughVeil: NSVisualEffectView {
    override func hitTest(_ point: NSPoint) -> NSView? { nil }
}

// MARK: - neon border, flash, beam

/// Rotating conic-gradient edge around the window; colour and speed follow the session status.
/// The look is drawn in four edge strips (top, bottom, left, right), each clipped to its own rectangle. One layer
/// spanning the window made the spin and the shadow pulse dirty the whole window every frame; on a full-screen,
/// see-through chat that meant WindowServer recompositing the entire screen at 120 Hz. Each strip holds the same
/// full-window geometry offset by its origin, so it shows exactly the pixels the single layer showed there.
final class NeonBorderView: NSView {
    private final class Strip {
        let clip = CALayer()
        let ring = CALayer()
        let gradient = CAGradientLayer()
        let ringMask = CAShapeLayer()
        let glow = CAShapeLayer()
        init() {
            clip.masksToBounds = true
            ring.mask = ringMask
            ring.addSublayer(gradient)
            clip.addSublayer(glow)
            clip.addSublayer(ring)
            gradient.type = .conic
            gradient.startPoint = CGPoint(x: 0.5, y: 0.5)
            gradient.endPoint = CGPoint(x: 0.5, y: 0)
            ringMask.fillColor = nil
            ringMask.strokeColor = NSColor.black.cgColor
            ringMask.lineWidth = 2.5
            glow.fillColor = nil
            glow.lineWidth = 1
            glow.shadowOffset = .zero
            glow.shadowRadius = 9
            glow.shadowOpacity = 0.8
        }
    }
    /// Ring is 2.5 pt, its glow reaches about 1.25 + 9 * 1.5 pt inward and the corner radius is 12: 28 pt clips none of it.
    private static let stripThickness: CGFloat = 28
    private let strips = (0..<4).map { _ in Strip() }
    private var current = ""

    override init(frame: NSRect) {
        super.init(frame: frame)
        layer = CALayer()
        wantsLayer = true
        for s in strips { layer!.addSublayer(s.clip) }
        setStatus("starting")
    }

    required init?(coder: NSCoder) { fatalError("not used") }

    override func hitTest(_ point: NSPoint) -> NSView? { nil }

    override func layout() {
        super.layout()
        relayout()
    }

    override func setFrameSize(_ newSize: NSSize) {
        super.setFrameSize(newSize)
        relayout()
    }

    private func relayout() {
        CATransaction.begin()
        CATransaction.setDisableActions(true)
        let b = bounds
        let t = min(Self.stripThickness, b.height / 2)
        let w = min(Self.stripThickness, b.width / 2)
        // Top and bottom take the full width; left and right only the height between them, so nothing is drawn twice.
        let rects = [
            CGRect(x: 0, y: b.height - t, width: b.width, height: t),
            CGRect(x: 0, y: 0, width: b.width, height: t),
            CGRect(x: 0, y: t, width: w, height: max(0, b.height - 2 * t)),
            CGRect(x: b.width - w, y: t, width: w, height: max(0, b.height - 2 * t)),
        ]
        let d = hypot(b.width, b.height) * 1.05
        let path = CGPath(roundedRect: b.insetBy(dx: 1.25, dy: 1.25), cornerWidth: 12, cornerHeight: 12, transform: nil)
        let shadowPath = path.copy(strokingWithWidth: 2, lineCap: .round, lineJoin: .round, miterLimit: 1)
        for (s, r) in zip(strips, rects) {
            s.clip.frame = r
            // The old whole-window geometry, shifted so this strip's window is the part that shows.
            let whole = CGRect(x: -r.minX, y: -r.minY, width: b.width, height: b.height)
            s.ring.frame = whole
            s.glow.frame = whole
            s.ringMask.frame = CGRect(origin: .zero, size: b.size)
            s.gradient.bounds = CGRect(x: 0, y: 0, width: d, height: d)
            s.gradient.position = CGPoint(x: b.midX, y: b.midY)
            s.ringMask.path = path
            s.glow.path = path
            s.glow.shadowPath = shadowPath
        }
        CATransaction.commit()
    }

    func setStatus(_ status: String) {
        // Waiting on the user looks like the turn it's in: the corner's notice says it (WaitNotifier), not the border.
        let status = status == "waiting" ? "busy" : status
        guard status != current else { return }
        current = status
        var colors: [UInt32]
        var spin: Double
        var glowHex: UInt32
        let h = { (token: String) in ThemeStore.shared.hex(token) }
        switch status {
        case "busy": colors = [h("--accent"), h("--amber"), h("--warn"), h("--accent")]; spin = 3.2; glowHex = h("--accent")
        case "idle", "terminal": colors = [h("--cyan"), h("--idle-deep"), h("--violet"), h("--cyan")]; spin = 9; glowHex = h("--cyan")
        default: colors = [h("--dim2"), h("--ended-deep"), h("--dim2")]; spin = 0; glowHex = h("--dim2")
        }
        // One start time for all four strips, so the spin and the pulse stay in step and the seams stay invisible.
        let start = CACurrentMediaTime()
        for s in strips {
            s.gradient.colors = colors.map { NSColor(hex: $0).cgColor }
            s.gradient.removeAnimation(forKey: "spin")
            if spin > 0 {
                let a = CABasicAnimation(keyPath: "transform.rotation.z")
                a.fromValue = 0
                a.toValue = -2 * Double.pi
                a.duration = spin
                a.repeatCount = .infinity
                a.beginTime = s.gradient.convertTime(start, from: nil)
                s.gradient.add(a, forKey: "spin")
            }
            s.glow.strokeColor = NSColor(hex: glowHex, alpha: 0.5).cgColor
            s.glow.shadowColor = NSColor(hex: glowHex).cgColor
            s.glow.removeAnimation(forKey: "pulse")
            let p = CABasicAnimation(keyPath: "shadowOpacity")
            p.fromValue = 0.2
            p.toValue = 0.95
            p.duration = 1.6
            p.autoreverses = true
            p.repeatCount = .infinity
            p.beginTime = s.glow.convertTime(start, from: nil)
            s.glow.add(p, forKey: "pulse")
        }
    }

    /// The theme changed: the same status in its colours.
    func repaint() {
        let status = current
        current = ""
        setStatus(status)
    }
}

/// White sheet over the content; brightens the picture while the old-TV effect runs.
final class FlashView: NSView {
    override init(frame: NSRect) {
        super.init(frame: frame)
        wantsLayer = true
        layer?.backgroundColor = NSColor(hex: 0xFFF3E0).cgColor
        layer?.opacity = 0
    }

    required init?(coder: NSCoder) { fatalError("not used") }
    override func hitTest(_ point: NSPoint) -> NSView? { nil }
}

/// The glowing horizontal line and the last dot of the old-TV effect, drawn above the squeezed content.
final class BeamView: NSView {
    let line = CAGradientLayer()
    let dot = CALayer()

    override init(frame: NSRect) {
        super.init(frame: frame)
        layer = CALayer()
        wantsLayer = true
        line.startPoint = CGPoint(x: 0, y: 0.5)
        line.endPoint = CGPoint(x: 1, y: 0.5)
        line.shadowRadius = 10
        line.shadowOpacity = 1
        line.shadowOffset = .zero
        line.opacity = 0
        dot.backgroundColor = NSColor.white.cgColor
        dot.cornerRadius = 4
        dot.shadowRadius = 14
        dot.shadowOpacity = 1
        dot.shadowOffset = .zero
        dot.opacity = 0
        layer!.addSublayer(line)
        layer!.addSublayer(dot)
        paint()
    }

    /// The theme's accent (again when the theme changes).
    func paint() {
        let accent = Theme.accentHex, pale = ThemeStore.shared.hex("--accent-pale")
        line.colors = [NSColor(hex: accent, alpha: 0).cgColor, NSColor(hex: pale).cgColor, NSColor.white.cgColor,
                       NSColor(hex: pale).cgColor, NSColor(hex: accent, alpha: 0).cgColor]
        line.shadowColor = NSColor(hex: accent).cgColor
        dot.shadowColor = ThemeStore.shared.color("--accent-soft").cgColor
    }

    required init?(coder: NSCoder) { fatalError("not used") }
    override func hitTest(_ point: NSPoint) -> NSView? { nil }

    override func layout() {
        super.layout()
        CATransaction.begin()
        CATransaction.setDisableActions(true)
        line.frame = CGRect(x: 0, y: bounds.midY - 1.5, width: bounds.width, height: 3)
        dot.frame = CGRect(x: bounds.midX - 4, y: bounds.midY - 4, width: 8, height: 8)
        CATransaction.commit()
    }
}

// MARK: - chat window

/// The header is the window's title bar, so a double-click on its title row does what a double-click on any title
/// bar does (System Settings → Desktop & Dock): fill the screen and back, minimize, or nothing.
private final class HeaderHostingView<Content: View>: NSHostingView<Content> {
    /// Like a title bar's buttons, the header's work on the first click, while another window is in front too.
    override func acceptsFirstMouse(for event: NSEvent?) -> Bool { true }

    override func mouseDown(with event: NSEvent) {
        let p = convert(event.locationInWindow, from: nil)
        let fromTop = isFlipped ? p.y : bounds.height - p.y
        if event.clickCount == 2, fromTop < 32, let w = window {
            switch UserDefaults.standard.string(forKey: "AppleActionOnDoubleClick") {
            case "Minimize": w.miniaturize(nil)
            case "None": break
            default: w.zoom(nil)
            }
            return
        }
        super.mouseDown(with: event)
    }
}

/// A terminal's window. Pinned above the dashboard it's the dashboard's child window, and AppKit moves a child window
/// itself, a few times a second (a drag left it in place on 158 of 180 frames), where the window server moves a free one
/// with the cursor. So a press on the header lets go of the dashboard before AppKit picks how to move the window
/// (onHeaderPress); the controller pins it again once the button is up.
///
/// An NSPanel (same look and style as the window it was): pinned on top it also takes `.nonactivatingPanel`, which is
/// what lets it show over another app's full-screen Space and take keys without bringing Orbiterm forward.
final class TerminalWindow: NSPanel {
    var onHeaderPress: (() -> Void)?
    /// The pin is on (togglePin): the AppDelegate key monitor routes the menu's keys here while the app is not active.
    var pinnedTop = false

    override init(contentRect: NSRect, styleMask style: NSWindow.StyleMask, backing: NSWindow.BackingStoreType, defer flag: Bool) {
        super.init(contentRect: contentRect, styleMask: style, backing: backing, defer: flag)
        // A panel hides when the app goes to the background and only becomes key when asked; neither fits a terminal.
        hidesOnDeactivate = false
        becomesKeyOnlyIfNeeded = false
    }

    override var canBecomeKey: Bool { true }
    override var canBecomeMain: Bool { true }

    /// The window goes to the display the pointer is on when it is on another one (a window restored from the Dock there):
    /// the same size, shrunk to fit, in the same relative place, kept inside the display. True when it moved.
    @discardableResult
    func moveToUsersScreen() -> Bool {
        // Brought back by a key (Window menu, ⌘`): the pointer says nothing about where the user is.
        guard NSApp.currentEvent?.type != .keyDown else { return false }
        let p = NSEvent.mouseLocation
        guard let target = NSScreen.screens.first(where: { $0.frame.contains(p) }), let from = screen, target != from else { return false }
        let a = from.visibleFrame, b = target.visibleFrame
        var f = frame
        f.size.width = min(f.width, b.width)
        f.size.height = min(f.height, b.height)
        let rx = a.width > 0 ? (frame.minX - a.minX) / a.width : 0, ry = a.height > 0 ? (frame.minY - a.minY) / a.height : 0
        f.origin.x = min(max(b.minX + rx * b.width, b.minX), b.maxX - f.width)
        f.origin.y = min(max(b.minY + ry * b.height, b.minY), b.maxY - f.height)
        setFrame(f, display: true)
        return true
    }

    override func deminiaturize(_ sender: Any?) {
        moveToUsersScreen()
        super.deminiaturize(sender)
    }
    /// A panel stays out of the Window menu by default; a terminal window belongs in it (and in the window cycle, ⌘`).
    override var isExcludedFromWindowsMenu: Bool {
        get { false }
        set {}
    }
    /// NSPanel closes on Esc by default; a terminal needs its Esc (EscClose handles the app's own swap).
    override func cancelOperation(_ sender: Any?) {}

    override func sendEvent(_ event: NSEvent) {
        // Any header press, child window or not: a window dragged by its header may land on another one and merge into it.
        if event.type == .leftMouseDown, frame.height - event.locationInWindow.y < 62 { onHeaderPress?() }
        super.sendEvent(event)
    }
}

@MainActor
final class ChatWindowController: NSWindowController, NSWindowDelegate, LocalProcessTerminalViewDelegate {
    let id = UUID().uuidString
    let cwd: String
    var sessionId: String?
    /// The session this window shows: a pty of the app's own (PtySession, the window takes its view over) or a screen
    /// session an older build left (the window attaches to it). Nil would mean the chat runs in the window itself, which
    /// nothing opens any more.
    private(set) var detached: DetachedLink?
    /// The window shows a pty of the app's own (not a screen session): nothing to attach, fit or save.
    private var onPty = false
    /// A copy's original in iTerm2; it ends with this chat.
    var origin: ITermOrigin?
    /// Sessions already looked at for the second-AI note (one look each), and whether the folder picker already said who works here.
    var resumedStart = false
    var nudgeSeen = Set<String>()
    var nudgeTold = false
    private var nudgeHeight: NSLayoutConstraint!
    private var tabBarTop: NSLayoutConstraint!
    private var nudgeSub: AnyCancellable?
    private var acctNoteSub: AnyCancellable?
    private var shipSub: AnyCancellable?
    private var favSub: AnyCancellable?
    private var shipLastStatus = ""
    private var nudgeAnnounced: String?
    private(set) var terminal: ChatTerminalView!
    let hud: ChatHUD
    weak var manager: MainWindowController?
    private(set) var isShown = false
    private var animating = false
    private var hiding = false
    private var reopenAfterHide = false
    private let container = NSView()
    private let border = NeonBorderView()
    private let flash = FlashView()
    private let beam = BeamView()
    /// How much is selected, and what ⌘C copied, in small type at the terminal's bottom-right, as Claude Code shows it.
    private let selectionBadge = NSTextField(labelWithString: "")
    /// The glass's tint: the terminal's background, a little warmer (the accent) at the top left.
    private let warmTint = CAGradientLayer()
    /// The window's see-through background (windowOpacity), a view of its own under everything: the CRT effect squeezes
    /// the container's sublayers, not its own background, which stayed full size while the window powered off.
    private let backdrop = NSView()
    /// What glows with a neon theme: the header, the footer and the terminals' area (ThemeStore.glow).
    private var glowing: [NSView] = []
    private var themeWatch: NSObjectProtocol?
    private var copiedUntil = Date.distantPast
    /// Out of the way while the dashboard shows a menu (see stepAside).
    private var steppedAside = false
    /// The window's own name (the chat's title, a terminal's folder), for streamer mode to name it again.
    private var realTitle: String
    /// Streamer mode: frosted glass over the terminals (what they show can't be swapped for made-up text). They go on
    /// running under it, and the keyboard still reaches them.
    private let streamVeil = PassThroughVeil()
    /// iTerm2's tabs and split panes (Panes.swift): where the shown tab goes, its tab bar, each tab's root view (a
    /// terminal, or split views of them), and the panes besides this window's own terminal.
    private let paneArea = NSView()
    private let tabBar = PaneTabBar()
    private var tabs: [NSView] = []
    private var activeTab = 0
    private(set) var extras: [ExtraPane] = []
    /// Every AI session running in this window's panes (Claude, Codex, Antigravity), by session id: the dashboard's
    /// briefs whose host is this window.
    private(set) var paneBriefs: [String: SessionBrief] = [:]
    private var paneTop: NSLayoutConstraint!
    private var paneTopUnderTabs: NSLayoutConstraint!
    /// One row for names only; two once a tab has an AI session's figures (context, tools · web · err) to show.
    private lazy var tabBarHeight = tabBar.heightAnchor.constraint(equalToConstant: 24)
    /// ⇧⌘↩: only the pane in front shows in its tab.
    private var zoomed = false
    /// Terminals in the order they had the keyboard, the latest last (a tab shown again gives it back to its latest).
    private var focusHistory: [ChatTerminalView] = []
    /// A tab being dragged by its chip, and the orange area that shows where it would go (iTerm2's drag to split).
    private var draggedTab: Int?
    private let dropZone = NSView()
    /// While a tab is dragged: what follows the pointer, and the other window it is over (its drop mark shows).
    private var ghost: TabDragGhost?
    private weak var dropWindow: ChatWindowController?
    /// The title bars over the panes of tabs that hold several (by terminal), and the pane being dragged by its bar.
    private var paneBars: [ObjectIdentifier: PaneTitleBar] = [:]
    private var draggedPane: ChatTerminalView?
    private var focusWatch: NSKeyValueObservation?
    /// The env view over the terminal (EnvView.swift): its model while it is open, and the view while it shows.
    private var env: EnvModel?
    private var envHost: EnvHostingView?
    private var envSub: AnyCancellable?

    /// `claudeArgs` nil opens a plain terminal in `cwd`.
    init(cwd: String, claudeArgs: [String]?, sessionId: String?, title: String, fontSize: CGFloat, frame: NSRect,
         manager: MainWindowController, detached: DetachedLink? = nil, mirror: Bool = false) {
        self.cwd = cwd
        self.realTitle = title
        self.sessionId = sessionId
        // Opened on a saved conversation (a resume, a fork, Codex's resume, Antigravity's --conversation): not empty.
        resumedStart = sessionId != nil || (claudeArgs ?? []).contains { ["resume", "fork", "-r", "--resume", "-c", "--continue", "--fork-session", "--conversation"].contains($0) }
        self.detached = detached
        self.hud = ChatHUD(terminalDir: claudeArgs == nil ? cwd : nil)
        hud.aiName = claudeArgs?.first == "agy" ? "antigravity" : claudeArgs?.first == "codex" ? "codex" : claudeArgs?.first == "cursor-agent" ? "cursor" : "claude"
        hud.mirror = mirror
        if let w = Worktrees.info(of: cwd), w.linked {
            hud.wtTop = w.top
            hud.wtMain = w.main
            hud.wtBranch = w.branch
        }
        hud.width = frame.width
        self.manager = manager
        let w = TerminalWindow(contentRect: frame, styleMask: [.titled, .closable, .miniaturizable, .resizable, .fullSizeContentView],
                         backing: .buffered, defer: false)
        w.title = title
        w.titlebarAppearsTransparent = true
        w.titleVisibility = .hidden
        w.isOpaque = false
        w.backgroundColor = .clear
        w.hasShadow = true
        w.appearance = NSAppearance(named: .darkAqua)
        w.tabbingMode = .disallowed
        // Shows over a full-screen dashboard as its child (show). No .moveToActiveSpace: macOS doesn't count such a window
        // as the front one of its Space, so coming back to the desktop it brought the app behind it (Chrome) over it.
        // On its own (ChatWindows.free) it is an ordinary window instead: Split View, Mission Control, the Dock and Move &
        // Resize treat it as one.
        w.collectionBehavior = ChatWindows.free ? ChatWindows.freeBehavior : [.fullScreenAuxiliary, .participatesInCycle]
        w.minSize = NSSize(width: 640, height: 420)
        w.isReleasedWhenClosed = false
        super.init(window: w)
        w.delegate = self
        w.onHeaderPress = { [weak self] in self?.letGoForDrag() }
        var adopted = false
        var unavailable = false
        if let d = detached, let pty = Sessions.live[d.name], !pty.ownerIsLive {
            // The session runs already (started by MainWindowController.makeChat, or restored): its view is the window's.
            // A parked one missed the theme and font changes made meanwhile.
            terminal = pty.terminal
            pty.owner = self
            terminal.chatId = id
            TerminalFactory.paint(terminal)
            terminal.font = TerminalFont.font(fontSize)
            adopted = true
            onPty = true
        } else if let d = detached, Sessions.ended.contains(d.name) || Sessions.live[d.name] != nil {
            // Its session ended already, or another window or pane shows it (the callers check first, so this is only a
            // guard): not attached to anything, and not taking the other window's view. An ended window, to be closed.
            NSLog("Orbiterm: a window was asked to show a session that is gone or shown elsewhere (%@)", d.name)
            terminal = TerminalFactory.makeIdle(chatId: id, fontSize: fontSize, delegate: self)
            onPty = true
            unavailable = true
            // Not linked to the session either: ending this dead window must not end what the other window shows.
            self.detached = nil
        } else if detached != nil {
            terminal = TerminalFactory.makeIdle(chatId: id, fontSize: fontSize, delegate: self)
        } else {
            terminal = TerminalFactory.make(chatId: id, cwd: cwd, claudeArgs: claudeArgs, fontSize: fontSize, delegate: self)
        }
        terminal.sessionShell = { [weak self] in self?.detached?.shellPid ?? 0 }
        terminal.workingDirectory = { [weak self] in self?.cwd }
        terminal.onSelection = { [weak self] text in self?.showSelection(text) }
        terminal.onCopy = { [weak self] text in self?.showCopied(text) }
        terminal.onFocus = { [weak self] in self?.focusChanged() }
        terminal.onOpenFile = { [weak self] url, line, column in
            self?.openFile(url, line: line, column: column, from: self?.terminal) ?? false
        }
        buildLayout()
        paintTheme()
        hud.onShip = { [weak self] in self?.shipAction($0) }
        hud.onShipMenu = { [weak self] in self?.popShipMenu() }
        if let top = hud.wtTop { watchShip(top) }
        if unavailable {
            hud.exited = true
            border.setStatus("ended")
            terminal.feed(text: "\r\n\u{1b}[2m[this terminal ended or is shown in another window · close this window to remove it]\u{1b}[0m\r\n")
        }
        themeWatch = NotificationCenter.default.addObserver(forName: ThemeStore.changed, object: nil, queue: .main) { [weak self] _ in
            MainActor.assumeIsolated { self?.themeChanged() }
        }
        focusWatch = w.observe(\.firstResponder) { [weak self] _, _ in
            MainActor.assumeIsolated { self?.focusChanged() }
        }
        // GPU text rendering: glyphs come from an atlas and cells are drawn as quads, far less CPU than
        // Core Graphics when Claude streams output. Falls back to Core Graphics if Metal can't start.
        if !adopted { try? terminal.setUseMetal(true) }
        // Until the window is shown there is nothing to draw.
        terminal.suspendsRenderingWhenNotVisible = true
    }

    required init?(coder: NSCoder) { fatalError("not used") }

    deinit {
        if let themeWatch { NotificationCenter.default.removeObserver(themeWatch) }
    }

    /// The theme's colours on what the window draws itself.
    /// How much of what's behind shows through the window, terminals included: plainly, no frost (a blur over it read as
    /// a frosted pane, not a see-through terminal). 90% opaque keeps the text easy to read.
    static let windowOpacity: CGFloat = 0.9

    private func paintTheme() {
        for v in glowing { ThemeStore.glow(v, on: ThemeStore.shared.glows) }
        let bg = Theme.terminalBg
        backdrop.wantsLayer = true
        backdrop.layer?.backgroundColor = bg.withAlphaComponent(Self.windowOpacity).cgColor
        warmTint.colors = zip([bg.blended(withFraction: 0.12, of: Theme.accent) ?? bg, bg, bg], [0.3, 0.22, 0.3] as [CGFloat])
            .map { $0.withAlphaComponent($1).cgColor }
        selectionBadge.textColor = Theme.accent
        dropZone.layer?.backgroundColor = NSColor(hex: Theme.accentHex, alpha: 0.2).cgColor
        dropZone.layer?.borderColor = NSColor(hex: Theme.accentHex, alpha: 0.9).cgColor
    }

    /// Another theme (the theme screen): the window, its terminals, tabs and split lines take its colours at once.
    private func themeChanged() {
        paintTheme()
        border.repaint()
        beam.paint()
        for tv in allTerminals { TerminalFactory.paint(tv) }
        if tabs.count > 1 { tabBar.show(titles: tabs.indices.map(tabTitle), active: activeTab); updateTabStats() }
        for bar in paneBars.values { bar.paint() }
        updatePaneBars()
        func redraw(_ v: NSView) { v.needsDisplay = true; v.subviews.forEach(redraw) }
        redraw(paneArea)
    }

    private func buildLayout() {
        guard let w = window else { return }
        let root = NSView()
        root.wantsLayer = true
        root.layer?.backgroundColor = NSColor.clear.cgColor
        w.contentView = root

        container.wantsLayer = true
        container.layer?.cornerRadius = 12
        container.layer?.masksToBounds = true

        let tint = NSView()
        let warm = warmTint
        warm.startPoint = CGPoint(x: 0, y: 1)
        warm.endPoint = CGPoint(x: 1, y: 0)
        let sheen = CAGradientLayer()
        sheen.colors = [NSColor.white.withAlphaComponent(0.08).cgColor, NSColor.white.withAlphaComponent(0).cgColor]
        sheen.startPoint = CGPoint(x: 0, y: 1)
        sheen.endPoint = CGPoint(x: 0.35, y: 0.6)
        tint.layer = CALayer()
        tint.wantsLayer = true
        tint.layer?.addSublayer(warm)
        tint.layer?.addSublayer(sheen)
        tint.postsFrameChangedNotifications = true
        NotificationCenter.default.addObserver(forName: NSView.frameDidChangeNotification, object: tint, queue: .main) { [weak tint] _ in
            guard let tint else { return }
            CATransaction.begin()
            CATransaction.setDisableActions(true)
            warm.frame = tint.bounds
            sheen.frame = tint.bounds
            CATransaction.commit()
        }

        let header = HeaderHostingView(rootView: ChatHeaderView(
            hud: hud,
            onTogglePin: { [weak self] in self?.togglePin() },
            onEnd: { [weak self] in self?.endChat() },
            onCopyReply: { [weak self] in self?.copyLastReply() },
            onToggleFavorite: { [weak self] in self?.toggleFavorite() },
            onToggleEnv: { [weak self] in self?.toggleEnv() }))
        let ticker = NSHostingView(rootView: ChatTickerView(hud: hud))
        glowing = [header, ticker, paneArea, tabBar]

        for v in [container, beam] as [NSView] {
            v.translatesAutoresizingMaskIntoConstraints = false
            root.addSubview(v)
            pin(v, to: root)
        }
        selectionBadge.font = Theme.mono(10.5, .semibold)
        selectionBadge.drawsBackground = true
        selectionBadge.backgroundColor = NSColor.black.withAlphaComponent(0.55)
        selectionBadge.isHidden = true
        tabBar.isHidden = true
        tabBar.onSelect = { [weak self] in self?.selectTab($0) }
        tabBar.onClose = { [weak self] in self?.closeTab($0) }
        tabBar.onDrag = { [weak self] in self?.dragTab($0, $1) }
        tabBar.onRename = { [weak self] in self?.renameTab($0, to: $1) }
        tabBar.onRenameRequest = { [weak self] in self?.beginRename($0) }
        tabBar.onMenu = { [weak self] in self?.tabMenu($0) }
        tabBar.onFavorite = { [weak self] in self?.toggleTabFavorite($0) }
        for v in [backdrop, tint, header, tabBar, paneArea, ticker, selectionBadge, border, flash] as [NSView] {
            v.translatesAutoresizingMaskIntoConstraints = false
            container.addSubview(v)
        }
        streamVeil.material = .hudWindow
        streamVeil.blendingMode = .withinWindow
        streamVeil.state = .active
        streamVeil.isHidden = true
        streamVeil.translatesAutoresizingMaskIntoConstraints = false
        container.addSubview(streamVeil, positioned: .above, relativeTo: paneArea)
        dropZone.wantsLayer = true
        dropZone.layer?.borderWidth = 2
        dropZone.layer?.cornerRadius = 6
        dropZone.isHidden = true
        container.addSubview(dropZone)
        tabs = [terminal]
        mount(terminal)
        // The second-AI note: between the header and the terminal; it takes no focus and no key.
        let nudgeBar = NSHostingView(rootView: WorktreeNudgeBar(hud: hud,
            onMove: { [weak self] in guard let self else { return }; self.manager?.moveToWorktree(self) },
            onClose: { [weak self] in self?.closeOpenedChat() },
            onDismiss: { [weak self] in
                guard let self, let o = self.hud.nudge else { return }
                self.nudgeSeen.insert(o.sid)
                self.hud.nudge = nil
            },
            onNotNow: { [weak self] in
                guard let self, let o = self.hud.nudge else { return }
                WorktreeNudge.quiet(o.top)
                self.nudgeSeen.insert(o.sid)
                self.hud.nudge = nil
            }))
        nudgeBar.translatesAutoresizingMaskIntoConstraints = false
        // With no note the SwiftUI content is empty, and a hosting view's default size constraints would then pin
        // the strip (and the window with it) to zero width. The strip's size comes only from the constraints below.
        nudgeBar.sizingOptions = []
        nudgeBar.isHidden = true
        container.addSubview(nudgeBar, positioned: .below, relativeTo: border)
        nudgeHeight = nudgeBar.heightAnchor.constraint(equalToConstant: 0)
        tabBarTop = tabBar.topAnchor.constraint(equalTo: header.bottomAnchor, constant: 4)
        acctNoteSub = hud.$acctNote.receive(on: DispatchQueue.main).sink { [weak self, weak nudgeBar] note in
            nudgeBar?.isHidden = note == nil && self?.hud.nudge == nil
            self?.layoutNudge(self?.hud.nudge)
        }
        // The stars (the HUD's, the tabs') follow the sidebar's favourites live: its own rows, another window, a star here.
        favSub = manager?.sidebar.$favorites.receive(on: DispatchQueue.main).sink { [weak self] _ in
            guard let self else { return }
            self.syncFavorite()
            if self.tabs.count > 1 { self.updateTabStats() }
            self.updatePaneBars()
        }
        hud.onAcctMenu = { [weak self] in self?.acctMenu() }
        hud.onAcct = { [weak self] in self?.acctNoteAction($0) }
        nudgeSub = hud.$nudge.receive(on: DispatchQueue.main).sink { [weak self, weak nudgeBar] offer in
            nudgeBar?.isHidden = offer == nil && self?.hud.acctNote == nil
            self?.layoutNudge(offer)
            if let o = offer, self?.nudgeAnnounced != o.sid {
                self?.nudgeAnnounced = o.sid
                let text = o.openedIn != nil ? "Opened in the \(o.openedIn ?? "") worktree." : o.line.main + " " + o.line.rest + " Open in a worktree is in the Chat menu."
                if let w = self?.window { NSAccessibility.post(element: w, notification: .announcementRequested, userInfo: [.announcement: text, .priority: NSAccessibilityPriorityLevel.medium.rawValue]) }
            }
        }
        NSLayoutConstraint.activate([
            nudgeBar.topAnchor.constraint(equalTo: header.bottomAnchor),
            nudgeBar.leadingAnchor.constraint(equalTo: container.leadingAnchor),
            nudgeBar.trailingAnchor.constraint(equalTo: container.trailingAnchor),
            nudgeHeight,
        ])
        paneTop = paneArea.topAnchor.constraint(equalTo: header.bottomAnchor, constant: 6)
        paneTopUnderTabs = paneArea.topAnchor.constraint(equalTo: tabBar.bottomAnchor, constant: 5)
        for v in [backdrop, tint, border, flash] as [NSView] { pin(v, to: container) }
        NSLayoutConstraint.activate([
            header.topAnchor.constraint(equalTo: container.topAnchor),
            header.leadingAnchor.constraint(equalTo: container.leadingAnchor),
            header.trailingAnchor.constraint(equalTo: container.trailingAnchor),
            header.heightAnchor.constraint(equalToConstant: 62),
            ticker.bottomAnchor.constraint(equalTo: container.bottomAnchor),
            ticker.leadingAnchor.constraint(equalTo: container.leadingAnchor),
            ticker.trailingAnchor.constraint(equalTo: container.trailingAnchor),
            ticker.heightAnchor.constraint(equalToConstant: 26),
            tabBarTop,
            tabBar.leadingAnchor.constraint(equalTo: container.leadingAnchor, constant: 14),
            tabBar.trailingAnchor.constraint(equalTo: container.trailingAnchor, constant: -10),
            tabBarHeight,
            paneTop,
            paneArea.bottomAnchor.constraint(equalTo: ticker.topAnchor, constant: -4),
            paneArea.leadingAnchor.constraint(equalTo: container.leadingAnchor, constant: 14),
            paneArea.trailingAnchor.constraint(equalTo: container.trailingAnchor, constant: -6),
            selectionBadge.trailingAnchor.constraint(equalTo: paneArea.trailingAnchor, constant: -10),
            selectionBadge.bottomAnchor.constraint(equalTo: paneArea.bottomAnchor, constant: -6),
            // Over the tabs and the terminals.
            streamVeil.topAnchor.constraint(equalTo: header.bottomAnchor),
            streamVeil.bottomAnchor.constraint(equalTo: paneArea.bottomAnchor),
            streamVeil.leadingAnchor.constraint(equalTo: paneArea.leadingAnchor),
            streamVeil.trailingAnchor.constraint(equalTo: paneArea.trailingAnchor),
        ])
    }

    /// The terminal's size in a window whose content is `content`: what buildLayout leaves of it between the header (62 pt and
    /// 6 below it), the footer ticker (26 pt and 4 above it) and the sides (14 pt left, 6 right). Keep in step with buildLayout.
    static func terminalSize(forContent content: NSSize) -> NSSize {
        NSSize(width: max(0, content.width - 20), height: max(0, content.height - 98))
    }

    private static func lineCount(_ text: String) -> Int {
        let lines = text.split(separator: "\n", omittingEmptySubsequences: false)
        return max(1, lines.count - (text.hasSuffix("\n") ? 1 : 0))
    }

    private func showSelection(_ text: String?) {
        guard Date() >= copiedUntil else { return }
        guard let text, !text.isEmpty else { return selectionBadge.isHidden = true }
        let n = Self.lineCount(text)
        selectionBadge.stringValue = n == 1 ? " 1 line selected · \(text.count) chars " : " \(n) lines selected "
        selectionBadge.isHidden = false
    }

    /// Claude's last reply onto the clipboard, the whole of it, from the conversation's transcript (LastReply): on the
    /// terminal, Claude's full-screen view only lets a reply be selected as far as it fits the window.
    func copyLastReply(of tv: ChatTerminalView? = nil) {
        // In a split, the pane with the keyboard (or `tv`): its own AI's conversation, not the window's.
        let sid: String?
        if hud.paneSplit {
            let b = briefFor(tv ?? focusedTerminal)
            sid = b.map { $0.convId ?? $0.id }
        } else {
            sid = sessionId
        }
        guard let sid, let text = LastReply.text(sessionId: sid) else { return NSSound.beep() }
        NSPasteboard.general.clearContents()
        NSPasteboard.general.setString(text, forType: .string)
        showCopied(text)
    }

    private func showCopied(_ text: String) {
        let n = Self.lineCount(text)
        selectionBadge.stringValue = n == 1 ? " copied 1 line " : " copied \(n) lines "
        selectionBadge.isHidden = false
        copiedUntil = Date().addingTimeInterval(2.5)
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.6) { [weak self] in
            guard let self else { return }
            self.showSelection(self.terminal.getSelection())
        }
    }

    private func pin(_ v: NSView, to p: NSView) {
        NSLayoutConstraint.activate([
            v.topAnchor.constraint(equalTo: p.topAnchor),
            v.bottomAnchor.constraint(equalTo: p.bottomAnchor),
            v.leadingAnchor.constraint(equalTo: p.leadingAnchor),
            v.trailingAnchor.constraint(equalTo: p.trailingAnchor),
        ])
    }

    // MARK: show / hide with the old-TV effect

    /// Set when the mascot closes this window: until then only a user's own click on a card may bring it back (a show()
    /// during the 0.55 s power-off would set `reopenAfterHide` and the window would flicker back open).
    var mascotShieldUntil = Date.distantPast
    var isHiding: Bool { hiding }

    func show() {
        guard let w = window else { return }
        if Date() < mascotShieldUntil {
            if (manager?.userOpenDepth ?? 0) == 0 { return }
            mascotShieldUntil = .distantPast
        }
        if hiding {
            reopenAfterHide = true
            return
        }
        // A card can be clicked while this window is still considered shown but was ordered out for a dashboard modal,
        // or while another app owns the foreground. Reclaim and repin it before ordering it front; otherwise the click
        // reaches openSession successfully yet appears to do nothing.
        steppedAside = false
        if hud.attached, let parent = showOnDashboard(for: w), w.parent != parent {
            w.parent?.removeChildWindow(w)
            parent.addChildWindow(w, ordered: .above)
        }
        // Pinned on top it follows the user wherever they are (another app's full-screen Space too): no bringing
        // Orbiterm forward, which would switch Spaces.
        let pinned = hud.onTop
        func front() {
            if pinned {
                w.orderFrontRegardless()
                w.makeKey()
            } else {
                w.makeKeyAndOrderFront(nil)
            }
        }
        if !pinned { NSApp.activate(ignoringOtherApps: true) }
        if isShown {
            front()
            focus(focusTarget(in: activeTab))
            return
        }
        isShown = true
        hud.visible = true
        for tv in allTerminals { tv.suspendsRenderingWhenNotVisible = false }
        // A window that attached while hidden takes over the session size now.
        fitSession()
        extras.forEach { $0.fit() }
        if hud.attached, let parent = showOnDashboard(for: w) { parent.addChildWindow(w, ordered: .above) }
        w.layoutIfNeeded()
        setButtonsHidden(true)
        container.layer?.sublayerTransform = squeeze(0.003, 0.003)
        front()
        focus(focusTarget(in: activeTab))
        runPowerOn()
        manager?.chatVisibilityChanged()
    }

    /// For the mascot: the close (X) button's frame in screen coordinates (nil while it is hidden by an animation).
    var closeButtonScreenRect: CGRect? {
        guard let w = window, isShown, let b = w.standardWindowButton(.closeButton), !b.isHidden else { return nil }
        return w.convertToScreen(b.convert(b.bounds, to: nil))
    }

    /// Whether pressing the X only hides the window (windowShouldClose's last branch). A mirror or an exited chat
    /// does something else, so the mascot never presses the real button then.
    var closeOnlyHides: Bool { !hud.mirror && !hud.exited }

    /// Powers the window off and orders it out; false when it can't (hidden already, or still animating).
    @discardableResult
    func hide(then: (() -> Void)? = nil) -> Bool {
        guard let w = window, isShown, !animating else { return false }
        hiding = true
        runPowerOff { [weak self] in
            guard let self else { return }
            self.hiding = false
            w.parent?.removeChildWindow(w)
            w.orderOut(nil)
            self.isShown = false
            // Nothing to draw while hidden; SwiftTerm resumes when the window is shown again.
            self.hud.visible = false
            self.env?.mask()
            for tv in self.allTerminals { tv.suspendsRenderingWhenNotVisible = true }
            self.resetEffect()
            self.manager?.chatVisibilityChanged()
            let reopen = self.reopenAfterHide
            self.reopenAfterHide = false
            then?()
            // A destructive close owns its completion. Only a normal hide may be reversed by a card click.
            if reopen, then == nil { self.show() }
        }
        return true
    }

    private func squeeze(_ sx: CGFloat, _ sy: CGFloat) -> CATransform3D {
        let b = container.bounds
        var t = CATransform3DMakeTranslation(b.midX, b.midY, 0)
        t = CATransform3DScale(t, sx, sy, 1)
        return CATransform3DTranslate(t, -b.midX, -b.midY, 0)
    }

    private func setButtonsHidden(_ hidden: Bool) {
        for kind in [NSWindow.ButtonType.closeButton, .miniaturizeButton, .zoomButton] {
            window?.standardWindowButton(kind)?.isHidden = hidden
        }
    }

    private func keyframes(_ path: String, _ values: [Any], _ times: [NSNumber], _ duration: Double, _ timing: CAMediaTimingFunctionName) -> CAKeyframeAnimation {
        let a = CAKeyframeAnimation(keyPath: path)
        a.values = values
        a.keyTimes = times
        a.duration = duration
        a.timingFunction = CAMediaTimingFunction(name: timing)
        a.fillMode = .forwards
        a.isRemovedOnCompletion = false
        return a
    }

    private func runPowerOn() {
        animating = true
        let d = 0.7
        CATransaction.begin()
        CATransaction.setCompletionBlock { [weak self] in
            guard let self else { return }
            self.resetEffect()
            self.animating = false
            self.window?.invalidateShadow()
        }
        let t: [CATransform3D] = [squeeze(0.003, 0.003), squeeze(0.03, 0.003), squeeze(1, 0.006), squeeze(1, 1.035), squeeze(1, 0.988), squeeze(1, 1)]
        container.layer?.add(keyframes("sublayerTransform", t.map { NSValue(caTransform3D: $0) }, [0, 0.1, 0.36, 0.62, 0.78, 1], d, .easeOut), forKey: "crt")
        flash.layer?.add(keyframes("opacity", [0.95, 0.95, 0.85, 0.35, 0.1, 0], [0, 0.1, 0.36, 0.62, 0.78, 1], d, .easeOut), forKey: "crt")
        beam.line.add(keyframes("transform.scale.x", [0.003, 0.03, 1, 1], [0, 0.1, 0.36, 1], d, .easeOut), forKey: "crt")
        beam.line.add(keyframes("opacity", [1, 1, 1, 0, 0], [0, 0.1, 0.36, 0.55, 1], d, .easeOut), forKey: "crt-o")
        CATransaction.commit()
    }

    private func runPowerOff(_ done: @escaping () -> Void) {
        animating = true
        setButtonsHidden(true)
        let d = 0.55
        CATransaction.begin()
        CATransaction.setCompletionBlock { [weak self] in
            self?.animating = false
            done()
        }
        let t: [CATransform3D] = [squeeze(1, 1), squeeze(1, 0.006), squeeze(0.004, 0.004), squeeze(0.0001, 0.002)]
        container.layer?.add(keyframes("sublayerTransform", t.map { NSValue(caTransform3D: $0) }, [0, 0.38, 0.7, 1], d, .easeIn), forKey: "crt")
        flash.layer?.add(keyframes("opacity", [0, 0.9, 1, 1], [0, 0.38, 0.7, 1], d, .easeIn), forKey: "crt")
        beam.line.add(keyframes("transform.scale.x", [1, 1, 0.004, 0.0001], [0, 0.38, 0.7, 1], d, .easeIn), forKey: "crt")
        beam.line.add(keyframes("opacity", [0, 0.9, 1, 0], [0, 0.38, 0.7, 1], d, .easeIn), forKey: "crt-o")
        beam.dot.add(keyframes("opacity", [0, 0, 1, 0.6], [0, 0.6, 0.75, 1], d, .easeOut), forKey: "crt")
        CATransaction.commit()
    }

    private func resetEffect() {
        container.layer?.removeAnimation(forKey: "crt")
        container.layer?.sublayerTransform = CATransform3DIdentity
        flash.layer?.removeAnimation(forKey: "crt")
        beam.line.removeAllAnimations()
        beam.dot.removeAllAnimations()
        setButtonsHidden(false)
    }

    // MARK: actions

    /// Star this chat in the sidebar's favourites. No sessionId yet (Claude hasn't opened its transcript): a beep —
    /// nothing to star. A terminal with no Claude in it is not a chat either.
    func toggleFavorite() {
        guard let t = starTarget else { return NSSound.beep() }
        toggleStar(t.id, conv: t.conv)
        syncFavorite()
    }

    /// The star in the HUD syncs with the sidebar: the session id came in late (a new chat) or changed (a resume), or
    /// the sidebar was changed from its own row. Called on every brief update and once per sidebar favourites change.
    func syncFavorite() {
        let on = starTarget.map { Self.starred(manager?.sidebar.favorites ?? [], id: $0.id, conv: $0.conv) } ?? false
        if hud.isFavorite != on { hud.isFavorite = on }
    }

    /// The chat the HUD's star is for, and its saved conversation (Antigravity's, Codex's, Cursor's) when its brief is the
    /// HUD's: the window's session, else a brand-new chat's live brief whose id hasn't reached the window yet.
    private var starTarget: (id: String, conv: String?)? {
        if let sid = sessionId { return (sid, hud.brief?.id == sid ? hud.brief?.convId : nil) }
        guard hud.terminalDir == nil, let b = hud.brief, b.live else { return nil }
        return (b.id, b.convId)
    }

    /// The star on a tab's chip: favourites the chat that chip shows (`key`, as TabStats.starId), not the window's.
    private func toggleTabFavorite(_ key: String) {
        // By either id: a chip drawn before its conversation was known still names its chat.
        let b = paneBriefs.values.first { $0.id == key || $0.convId == key }
        toggleStar(b?.id ?? key, conv: b?.convId)
        if tabs.count > 1 { updateTabStats() }
        updatePaneBars()
        syncFavorite()
    }

    /// The sidebar lists Antigravity's, Codex's and Cursor's chats by their saved conversation (their live id,
    /// "ai:<pid>:<start>", goes with the process), Claude's by the session id: a star goes on that. One starred under the
    /// live id (the sidebar's row before the conversation was known) counts too, and its star comes off with the other.
    private static func starred(_ favs: Set<String>, id: String, conv: String?) -> Bool {
        favs.contains(conv ?? id) || favs.contains(id)
    }

    /// In or out of the sidebar's favourites; starred, an archived chat comes back to the list (as the sidebar's own star).
    private func toggleStar(_ id: String, conv: String?) {
        guard let sidebar = manager?.sidebar else { return NSSound.beep() }
        let key = conv ?? id
        if Self.starred(sidebar.favorites, id: id, conv: conv) {
            sidebar.favorites.subtract([key, id])
        } else {
            sidebar.favorites.insert(key)
            // Archived (on its own, or its whole folder): it comes back, else the star would show nowhere in the list.
            if let item = sidebar.chat(key) ?? sidebar.chat(id), sidebar.isArchived(item) {
                sidebar.toggleArchived(item)
            } else if sidebar.archived.contains(key) {
                sidebar.archived.remove(key)
            }
        }
    }

    /// The pin: on top of every app's windows (Discord, Chrome…), on any desktop. A window rides above the dashboard
    /// by default, as its child, and goes behind other apps with it; pinned, it leaves the dashboard (a child takes
    /// its parent's level, and can't leave a full-screen dashboard's Space) and floats. Unpinned, it rides on the
    /// dashboard again.
    func togglePin() {
        guard let w = window else { return }
        hud.onTop.toggle()
        hud.attached = !hud.onTop && !ChatWindows.free
        if hud.onTop {
            w.parent?.removeChildWindow(w)
            // On every Space and over other apps' full-screen Spaces (a nonactivating panel), whatever the dashboard
            // does; no ordering out and in, which would move the user to another Space.
            (w as? TerminalWindow)?.pinnedTop = true
            w.styleMask.insert(.nonactivatingPanel)
            Self.preventActivation(w, true)
            w.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary, .participatesInCycle]
            w.level = .floating
            w.canHide = false
            if isShown { w.orderFrontRegardless() }
        } else {
            (w as? TerminalWindow)?.pinnedTop = false
            w.styleMask.remove(.nonactivatingPanel)
            Self.preventActivation(w, false)
            w.level = .normal
            w.collectionBehavior = ChatWindows.free ? ChatWindows.freeBehavior : [.fullScreenAuxiliary, .participatesInCycle]
            w.canHide = true
            // Only while the dashboard is on this Space: a child window drags its parent's Space along (as NoteWindow.attach).
            if hud.attached, let parent = rideableDashboard(for: w) {
                parent.addChildWindow(w, ordered: .above)
            }
            // Unpinned while Orbiterm is in the background (the click hit a nonactivating panel): keys go to it from now on,
            // as to any window clicked. Key and front first, so the activation lands on this Space, not on a full-screen
            // dashboard's.
            if isShown, !w.isMiniaturized, w.isOnActiveSpace {
                w.makeKeyAndOrderFront(nil)
                NSApp.activate(ignoringOtherApps: true)
            }
        }
        manager?.dashboardVisibilityChanged()
    }

    /// The mask alone doesn't make an existing window nonactivating: the window server's flag is set only at init (as
    /// FeedPanel and Mascot are made) or through this. Without it a click on the pinned window still brings the app (and
    /// the dashboard's Space) forward, and it gets no keys while another app is in front. Cleared again on unpin.
    private static func preventActivation(_ w: NSWindow, _ on: Bool) {
        let sel = NSSelectorFromString("_setPreventsActivation:")
        guard w.responds(to: sel) else { return }
        typealias F = @convention(c) (AnyObject, Selector, Bool) -> Void
        unsafeBitCast(w.method(for: sel), to: F.self)(w, sel, on)
    }

    /// Settings' "chat windows on their own" changed: an unpinned window lets go of the dashboard and becomes an
    /// ordinary window, or rides on it again. A pinned one stays as it is; unpinned later, it follows the setting.
    func applyFree() {
        guard let w = window, !hud.onTop else { return }
        hud.attached = !ChatWindows.free
        if ChatWindows.free {
            w.parent?.removeChildWindow(w)
            w.collectionBehavior = ChatWindows.freeBehavior
        } else {
            w.collectionBehavior = [.fullScreenAuxiliary, .participatesInCycle]
            if isShown, !steppedAside, !w.isMiniaturized, w.parent == nil, let parent = rideableDashboard(for: w) {
                parent.addChildWindow(w, ordered: .above)
            }
        }
        manager?.dashboardVisibilityChanged()
    }

    // MARK: tiling (Fn+Control+arrows, like macOS)

    enum Tile { case left, right, top, bottom, topLeft, topRight, bottomLeft, bottomRight, fill }
    private var tile: Tile?
    private var tiledFrame: NSRect?
    private var untiledFrame: NSRect?

    /// macOS tiles windows with Fn+Control and the arrows (F fills, C centres, R returns), but not a window pinned
    /// above the dashboard (a child window), so the app does it for its chat windows. A second arrow makes a quarter:
    /// left then up is the top-left quarter.
    func tile(key: UInt16) {
        guard let w = window, let screen = (w.screen ?? NSScreen.main)?.visibleFrame else { return }
        // A nudge's shake ends first: its frame back where it was, before it is read (the way back, the tile it is in).
        WindowShake.stop(w)
        if let tiledFrame, w.frame != tiledFrame { tile = nil }
        let t = tile
        let next: Tile?
        switch key {
        case 123, 115: next = [.top, .topLeft, .topRight].contains(t) ? .topLeft : [.bottom, .bottomLeft, .bottomRight].contains(t) ? .bottomLeft : .left
        case 124, 119: next = [.top, .topLeft, .topRight].contains(t) ? .topRight : [.bottom, .bottomLeft, .bottomRight].contains(t) ? .bottomRight : .right
        case 126, 116: next = [.left, .topLeft, .bottomLeft].contains(t) ? .topLeft : [.right, .topRight, .bottomRight].contains(t) ? .topRight : .top
        case 125, 121: next = [.left, .topLeft, .bottomLeft].contains(t) ? .bottomLeft : [.right, .topRight, .bottomRight].contains(t) ? .bottomRight : .bottom
        case 3: next = .fill
        case 8:
            var f = w.frame
            f.origin = NSPoint(x: screen.midX - f.width / 2, y: screen.midY - f.height / 2)
            return place(f, as: nil)
        case 15:
            guard let back = untiledFrame else { return }
            untiledFrame = nil
            return place(back, as: nil)
        default: return
        }
        guard let next else { return }
        let gap: CGFloat = 8
        let s = screen.insetBy(dx: gap / 2, dy: gap / 2)
        let halfW = s.width / 2, halfH = s.height / 2
        let r: NSRect
        switch next {
        case .left: r = NSRect(x: s.minX, y: s.minY, width: halfW, height: s.height)
        case .right: r = NSRect(x: s.midX, y: s.minY, width: halfW, height: s.height)
        case .top: r = NSRect(x: s.minX, y: s.midY, width: s.width, height: halfH)
        case .bottom: r = NSRect(x: s.minX, y: s.minY, width: s.width, height: halfH)
        case .topLeft: r = NSRect(x: s.minX, y: s.midY, width: halfW, height: halfH)
        case .topRight: r = NSRect(x: s.midX, y: s.midY, width: halfW, height: halfH)
        case .bottomLeft: r = NSRect(x: s.minX, y: s.minY, width: halfW, height: halfH)
        case .bottomRight: r = NSRect(x: s.midX, y: s.minY, width: halfW, height: halfH)
        case .fill: r = s
        }
        if tile == nil { untiledFrame = w.frame }
        place(r.insetBy(dx: gap / 2, dy: gap / 2), as: next)
    }

    private func place(_ frame: NSRect, as t: Tile?) {
        guard let w = window else { return }
        tile = t
        tiledFrame = t == nil ? nil : frame
        w.setFrame(frame, display: true, animate: true)
        fitSession()
    }

    // MARK: iTerm2's split and pane shortcuts (MainWindowController.split and the rest)

    /// ⇧⌘↩ with a single pane: the window fills the screen, and back.
    func toggleMaximize() {
        if tile == .fill, window?.frame == tiledFrame, untiledFrame != nil { tile(key: 15) } else { tile(key: 3) }
    }

    // MARK: tabs and split panes (iTerm2's ⌘T, ⌘D, ⇧⌘D, ⌘[ ⌘], ⌥⌘ arrows, ⇧⌘[ ⇧⌘], ⌃⌘ arrows, ⇧⌘↩, ⌘W)

    /// Every terminal in this window: its own first, then the extra panes.
    var allTerminals: [ChatTerminalView] { [terminal] + extras.map(\.terminal) }

    /// The shells of every pane (the dashboard maps them to this window).
    var shellPids: [Int32] { [shellPid] + extras.map(\.shellPid) }

    private func extra(of tv: ChatTerminalView) -> ExtraPane? { extras.first { $0.terminal === tv } }

    /// The car of the window's own terminal on the orbit. Cars go by their session's name, which stays the same while it
    /// lives: a tab closed into a car, and a car opened into a window of its own, keep the car they had.
    var carId: String { "s:" + (detached?.name ?? id) }

    /// The window's terminals with no Claude in them, for the orbit's cars: its own when it's a terminal, and every tab
    /// and split pane besides (a dev server in the tab next to a chat).
    func plainShells() -> [(id: String, shell: Int32, cwd: String)] {
        var out: [(id: String, shell: Int32, cwd: String)] = []
        if hud.status == "terminal", let shell = detached?.shellPid { out.append((carId, shell, hud.terminalDir ?? cwd)) }
        for pane in extras {
            let shell = pane.shellPid
            // An AI in a pane (Claude, Codex…) is a session on the orbit, not a car.
            guard shell > 0, !Self.runsAgent(shell) else { continue }
            out.append(("s:" + paneKey(pane), shell, pane.cwd))
        }
        return out
    }

    /// The pane whose car is `id`, its own or a tab's or split's, when it's in this window.
    private func terminal(forCar id: String) -> ChatTerminalView? {
        if id == carId { return terminal }
        return extras.first { "s:" + paneKey($0) == id }?.terminal
    }

    func hasCar(_ id: String) -> Bool { terminal(forCar: id) != nil }

    private func paneKey(_ pane: ExtraPane) -> String { pane.link?.name ?? "pid\(pane.shellPid)" }

    static func runsClaude(_ shell: Int32) -> Bool { runs(shell, Proc.isClaude) }

    /// Claude or another AI tool (Proc.otherAIs) in the shell: a session on the orbit.
    static func runsAgent(_ shell: Int32) -> Bool { runs(shell) { Proc.isClaude($0) || Proc.otherAI($0) != nil } }

    private static func runs(_ shell: Int32, _ match: (Int32) -> Bool) -> Bool {
        var level = Proc.children(of: shell)
        for _ in 0..<4 where !level.isEmpty {
            if level.contains(where: match) { return true }
            level = level.flatMap { Proc.children(of: $0) }
        }
        return false
    }

    /// The orbit opened this window for one of its cars: that pane's tab comes to the front and the keyboard goes to it,
    /// so a window split five ways opens on the pane that was clicked.
    func focusCar(_ id: String) {
        if let tv = terminal(forCar: id) { reveal(tv) }
    }

    /// The same for the pane a process runs in (a Claude session clicked on the orbit): the one whose shell it's under.
    func focusPane(hosting pid: Int32) {
        var cur = pid
        for _ in 0..<8 {
            if cur == shellPid { return reveal(terminal) }
            if let pane = extras.first(where: { $0.shellPid == cur }) { return reveal(pane.terminal) }
            guard let parent = Proc.parent(cur), parent > 1 else { return }
            cur = parent
        }
    }

    private func reveal(_ tv: ChatTerminalView) {
        if zoomed, tv !== focusedTerminal { _ = toggleZoom() }
        if let t = tabs.indices.first(where: { i in terminals(in: i).contains { $0 === tv } }), t != activeTab { selectTab(t) }
        focus(tv)
    }

    /// The pane with the keyboard, else the one used last in the shown tab.
    var focusedTerminal: ChatTerminalView {
        if let tv = window?.firstResponder as? ChatTerminalView, allTerminals.contains(where: { $0 === tv }) { return tv }
        return focusTarget(in: activeTab)
    }

    /// The shell in the pane the user interacted with last, for selecting that pane's AI in the dashboard top bar.
    var focusedShellPid: Int32 {
        let tv = focusedTerminal
        if tv === terminal { return shellPid }
        return extra(of: tv)?.shellPid ?? 0
    }

    private func focusTarget(in tab: Int) -> ChatTerminalView {
        let ts = terminals(in: tab)
        return focusHistory.last { t in ts.contains { $0 === t } } ?? ts.first ?? terminal
    }

    /// Where a new terminal "here" opens: the folder the shell of the pane in front is in now (it may have cd'd).
    var currentFolder: String {
        if let pane = extra(of: focusedTerminal) { return pane.currentFolder }
        return (shellPid > 0 ? Proc.cwd(shellPid) : nil) ?? cwd
    }

    /// Tab `i`'s terminals, left to right and top to bottom.
    private func terminals(in i: Int) -> [ChatTerminalView] {
        guard tabs.indices.contains(i) else { return [] }
        func walk(_ v: NSView) -> [ChatTerminalView] {
            if let tv = v as? ChatTerminalView { return [tv] }
            return (v as? PaneSplitView)?.arrangedSubviews.flatMap(walk) ?? []
        }
        return walk(tabs[i])
    }

    /// The shown tab's root fills the pane area.
    private func mount(_ v: NSView) {
        v.removeFromSuperview()
        v.translatesAutoresizingMaskIntoConstraints = false
        paneArea.addSubview(v)
        pin(v, to: paneArea)
    }

    private func makeExtra(kind: PaneKind, cwd: String, session: String? = nil, size: NSSize? = nil) -> ExtraPane {
        let pane = ExtraPane(owner: self, cwd: cwd, kind: kind, fontSize: terminal.font.pointSize, session: session, parent: detached?.name,
                             size: size)
        pane.terminal.sessionShell = { [weak pane] in pane?.link?.shellPid ?? 0 }
        pane.terminal.workingDirectory = { [weak pane] in pane?.cwd }
        pane.terminal.onSelection = { [weak self] in self?.showSelection($0) }
        pane.terminal.onCopy = { [weak self] in self?.showCopied($0) }
        pane.terminal.onFocus = { [weak self] in self?.focusChanged() }
        pane.terminal.onOpenFile = { [weak self, weak pane] url, line, column in
            self?.openFile(url, line: line, column: column, from: pane?.terminal) ?? false
        }
        pane.terminal.suspendsRenderingWhenNotVisible = !isShown
        extras.append(pane)
        return pane
    }

    /// ⌘T: a new tab with a shell in the folder of the pane in front. In a mirror too (a chat the other app runs): the
    /// tab's shell is this app's own.
    func newTab(next: Bool = false) {
        // The new shell starts at the size of the pane in front (a tab fills the same area).
        let pane = makeExtra(kind: .tab, cwd: currentFolder, size: focusedTerminal.frame.size)
        // ⌥⌘T: right after the tab in front; ⌘T: at the end.
        let at = next ? min(activeTab + 1, tabs.count) : tabs.count
        tabs.insert(pane.terminal, at: at)
        selectTab(at)
        focus(pane.terminal)
    }

    /// ⌘D (`vertical`: side by side) / ⇧⌘D (one above the other): the pane in front gives half its place to a shell in
    /// its folder.
    func split(vertical: Bool) {
        hideEnv()
        if zoomed { _ = toggleZoom() }
        let old = focusedTerminal
        // The new shell starts at half the pane in front (less the divider).
        var half = old.frame.size
        if vertical { half.width = (half.width - 5) / 2 } else { half.height = (half.height - 5) / 2 }
        let pane = makeExtra(kind: vertical ? .vertical : .horizontal, cwd: currentFolder, size: half)
        insert(pane.terminal, beside: old, vertical: vertical)
        refreshPanes()
        focus(pane.terminal)
    }

    /// A pane's session still running (⇧⌘T right after closing it, or after the app restarted) comes back: in a tab of
    /// its own or split off the shown tab's last pane.
    func adoptPane(session: String, kind: PaneKind, cwd: String, focus: Bool) {
        // Not a session that ended meanwhile, nor one another window or pane shows (it can't be in two places).
        if Sessions.ended.contains(session) { return }
        if let pty = Sessions.live[session], pty.ownerIsLive { return }
        let pane = makeExtra(kind: kind, cwd: cwd, session: session)
        if kind == .tab {
            tabs.append(pane.terminal)
            if focus { selectTab(tabs.count - 1) }
        } else {
            if zoomed { _ = toggleZoom() }
            insert(pane.terminal, beside: terminals(in: activeTab).last ?? terminal, vertical: kind == .vertical)
        }
        refreshPanes()
        if focus { self.focus(pane.terminal) }
        pane.start(session: session, fit: isShown)
    }

    /// A text file ⌘-clicked in `tv`: in Source Control's editor, its path shown from the folder `tv` is in. False for a
    /// file the editor doesn't show (the terminal opens it in its app).
    func openFile(_ url: URL, line: Int?, column: Int?, from tv: ChatTerminalView?) -> Bool {
        let tv = tv ?? focusedTerminal
        let folder = tv === terminal ? (shellPid > 0 ? Proc.cwd(shellPid) : nil) ?? cwd : extra(of: tv)?.currentFolder ?? cwd
        return manager?.openFile(url, line: line, column: column, cwd: folder) ?? false
    }

    /// `new` goes beside `old`: after it (right or below), or `before` it.
    private func insert(_ new: NSView, beside old: NSView, vertical: Bool, before: Bool = false) {
        // Only the pane in front is halved, as in iTerm2; the others keep their size.
        if let sv = old.superview as? PaneSplitView, sv.isVertical == vertical, let i = sv.arrangedSubviews.firstIndex(of: old) {
            return sv.insertArrangedSubview(new, at: before ? i : i + 1, from: old)
        }
        let sv = PaneSplitView()
        sv.isVertical = vertical
        replace(old, with: sv)
        sv.addArrangedSubview(before ? new : old)
        sv.addArrangedSubview(before ? old : new)
    }

    /// Puts `new` where `old` is: in its split view, or as its tab's root.
    private func replace(_ old: NSView, with new: NSView) {
        if let sv = old.superview as? PaneSplitView {
            sv.replaceArrangedSubview(old, with: new)
        } else if let t = tabs.firstIndex(where: { $0 === old }) {
            let shown = old.superview === paneArea
            old.removeFromSuperview()
            tabs[t] = new
            if shown { mount(new) }
        }
    }

    /// Takes a pane's view out: its split view closes up, a split view left with one pane gives way to it, a tab left with
    /// none closes.
    private func removePaneView(_ v: NSView) {
        focusHistory.removeAll { $0 === v }
        if let t = tabs.firstIndex(where: { $0 === v }) {
            v.removeFromSuperview()
            tabs.remove(at: t)
            if activeTab > t || activeTab >= tabs.count { activeTab = max(0, activeTab - 1) }
            if let root = tabs.indices.contains(activeTab) ? tabs[activeTab] : nil, root.superview !== paneArea { mount(root) }
            return
        }
        guard let sv = v.superview as? PaneSplitView else { return v.removeFromSuperview() }
        v.removeFromSuperview()
        if sv.arrangedSubviews.count == 1, let only = sv.arrangedSubviews.first {
            replace(sv, with: only)
        }
    }

    func selectTab(_ i: Int) {
        guard tabs.indices.contains(i) else { return }
        hideEnv()
        if zoomed { _ = toggleZoom() }
        if tabs.indices.contains(activeTab), tabs[activeTab].superview === paneArea, activeTab != i { tabs[activeTab].removeFromSuperview() }
        activeTab = i
        if tabs[i].superview !== paneArea { mount(tabs[i]) }
        refreshPanes()
        focus(focusTarget(in: i))
        for tv in terminals(in: i) { extra(of: tv)?.fit() }
        if terminals(in: i).contains(where: { $0 === terminal }) { fitSession() }
    }

    // MARK: dragging a tab, as in iTerm2: along the bar to move it, onto a pane of the shown tab to split it there

    /// Where a dragged tab would go: a pane of the shown tab and the side it would take, or a place in the tab bar.
    private enum TabDrop { case pane(ChatTerminalView, NSRectEdge), slot(Int), window(ChatWindowController, Int), windowSplit(ChatWindowController, ChatTerminalView, NSRectEdge), detach(NSPoint) }

    private func tabDrop(at point: NSPoint) -> TabDrop? {
        guard let i = draggedTab else { return nil }
        // Over another terminal window: the tab joins it (on its bar's slot, else at the end). Windows under the ghost only.
        let screen = NSEvent.mouseLocation
        let movable = canMoveOutOfWindow(tab: i)
        let hit = manager?.chatWindow(atScreen: screen, below: ghost?.floor ?? 0)
        if let hit, hit !== self {
            guard movable, hit.acceptsTabs else { return nil }
            // Over one of its panes' sides: a split there, as inside a window; its middle, its bar or header: a tab.
            if let w = hit.window, let spot = hit.paneSpot(at: w.convertPoint(fromScreen: screen)), let edge = spot.1 {
                return .windowSplit(hit, spot.0, edge)
            }
            return .window(hit, hit.incomingSlot(atScreen: screen))
        }
        if let slot = tabBar.slot(at: point) { return .slot(slot) }
        // Over no window at all: the tab becomes a window of its own, there.
        if hit == nil, window?.frame.contains(screen) == false { return movable ? .detach(screen) : nil }
        // Inside the window, well below the tab bar and on no pane that takes a split: the tab tears off there (iTerm2), so a
        // big, zoomed or tiled window still has room to drop it.
        func tearInside() -> TabDrop? {
            guard movable, tabs.count > 1, let w = window else { return nil }
            let bar = tabBar.convert(tabBar.bounds, to: nil)
            return point.y < bar.minY - 40 && w.frame.contains(screen) ? .detach(screen) : nil
        }
        // Only into another tab's panes: the shown one's (a tab can't split into itself).
        guard i != activeTab else { return tearInside() }
        for tv in terminals(in: activeTab) where !tv.isHidden {
            let f = tv.convert(tv.bounds, to: nil)
            guard f.contains(point) else { continue }
            // The nearest side (window coordinates count up from the bottom).
            let dx = (point.x - f.midX) / f.width, dy = (point.y - f.midY) / f.height
            return .pane(tv, abs(dx) > abs(dy) ? (dx < 0 ? .minX : .maxX) : (dy < 0 ? .minY : .maxY))
        }
        return tearInside()
    }

    private func dragTab(_ i: Int, _ phase: TabDrag) {
        switch phase {
        case .began:
            guard tabs.indices.contains(i) else { return }
            if zoomed { _ = toggleZoom() }
            draggedTab = i
            ghost?.close()
            ghost = TabDragGhost(title: tabTitle(i))
            ghost?.move(to: NSEvent.mouseLocation)
        case .moved(let p):
            guard draggedTab != nil else { return }
            ghost?.move(to: NSEvent.mouseLocation)
            showDrop(tabDrop(at: p))
        case .ended(let p):
            guard draggedTab != nil else { return }
            let drop = tabDrop(at: p)
            showDrop(nil)
            ghost?.close()
            ghost = nil
            draggedTab = nil
            switch drop {
            case .slot(let slot): moveTab(i, to: slot)
            case .pane(let tv, let edge): joinTab(i, beside: tv, edge: edge)
            // The bar is rebuilt by the move: after this event, not in it.
            case .window(let other, let slot): DispatchQueue.main.async { [weak self, weak other] in
                guard let self, let other else { return }
                self.manager?.moveTab(i, of: self, to: other, slot: slot)
            }
            case .windowSplit(let other, let tv, let edge): DispatchQueue.main.async { [weak self, weak other, weak tv] in
                guard let self, let other, let tv else { return }
                self.manager?.moveTabAsSplit(i, of: self, to: other, beside: tv, edge: edge)
            }
            case .detach(let point): DispatchQueue.main.async { [weak self] in
                guard let self, let m = self.manager else { return }
                m.tearOff(tab: i, of: self, frame: m.tearFrame(like: self, at: point))
            }
            case nil: break
            }
        }
    }

    /// The orange area over the half of the pane the tab would take, or a line in the tab bar where it would go.
    private func showDrop(_ drop: TabDrop?) {
        var over: ChatWindowController?
        if case .window(let other, let slot)? = drop {
            over = other
            other.showIncomingTab(slot: slot)
        }
        if case .windowSplit(let other, let tv, let edge)? = drop {
            over = other
            other.showSplitZone(tv, edge)
        }
        if dropWindow !== over { dropWindow?.hideIncomingTab() }
        dropWindow = over
        var outline: NSRect?
        if case .detach(let point)? = drop { outline = manager?.tearFrame(like: self, at: point) }
        ghost?.showOutline(outline)
        guard let drop else { return dropZone.isHidden = true }
        var r: NSRect
        switch drop {
        case .window, .windowSplit, .detach:
            return dropZone.isHidden = true
        case .slot(let i):
            r = tabBar.marker(at: i)
        case .pane(let tv, let edge):
            r = tv.convert(tv.bounds, to: nil)
            switch edge {
            case .minX: r.size.width /= 2
            case .maxX: r.origin.x += r.width / 2; r.size.width /= 2
            case .minY: r.size.height /= 2
            default: r.origin.y += r.height / 2; r.size.height /= 2
            }
        }
        dropZone.frame = container.convert(r, from: nil)
        dropZone.isHidden = false
    }

    /// Tab `i` let go on a pane of the shown tab: its panes leave their tab and join this one, beside `target` on
    /// `edge`'s side, taking half its room.
    private func joinTab(_ i: Int, beside target: ChatTerminalView, edge: NSRectEdge) {
        guard i != activeTab, tabs.indices.contains(i) else { return }
        let root = tabs.remove(at: i)
        root.removeFromSuperview()
        if i < activeTab { activeTab -= 1 }
        let vertical = edge == .minX || edge == .maxX
        insert(root, beside: target, vertical: vertical, before: edge == .minX || edge == .maxY)
        for tv in terminals(in: activeTab) where tv === root || tv.isDescendant(of: root) {
            extra(of: tv)?.rekind(vertical ? .vertical : .horizontal)
        }
        refreshPanes()
        window?.layoutIfNeeded()
        for tv in terminals(in: activeTab) { extra(of: tv)?.fit() }
        fitSession()
        focus(terminals(in: activeTab).first { $0 === root || $0.isDescendant(of: root) } ?? target)
    }

    /// Tab `i` moves to `slot` in the bar (its place before the move: 0 is first, the tab count after the last).
    private func moveTab(_ i: Int, to slot: Int) {
        guard tabs.indices.contains(i) else { return }
        let j = slot > i ? slot - 1 : slot
        guard j != i, tabs.indices.contains(j) else { return }
        let shown = tabs[activeTab]
        tabs.insert(tabs.remove(at: i), at: j)
        activeTab = tabs.firstIndex { $0 === shown } ?? activeTab
        refreshPanes()
    }

    /// ⌥⇧⌘[ / ⌥⇧⌘]: the shown tab moves a place left or right; false when it can't.
    func moveTab(step: Int) -> Bool {
        let to = activeTab + step
        guard tabs.count > 1, tabs.indices.contains(to) else { return false }
        moveTab(activeTab, to: step > 0 ? to + 1 : to)
        return true
    }

    /// ⇧⌘] / ⇧⌘[: the next or previous tab; false with only one (the caller moves to another window).
    func selectTab(step: Int) -> Bool {
        guard tabs.count > 1 else { return false }
        selectTab((activeTab + step + tabs.count) % tabs.count)
        return true
    }

    // MARK: tabs between windows (tear off, drop on another window, merge): the same sessions, never restarted

    /// A tab taken out of a window while its sessions run on: its view tree and, left to right, each terminal with the
    /// name of its session, the folder it was opened in and how it sat (a tab of its own, or a split's side).
    struct TabCargo {
        var root: NSView
        var items: [(view: ChatTerminalView, name: String, cwd: String, kind: PaneKind)]
    }

    var tabCount: Int { tabs.count }
    var activeTabIndex: Int { activeTab }

    func tabHoldsOwn(_ i: Int) -> Bool { terminals(in: i).contains { $0 === terminal } }

    /// The window's own session can leave: a pty (not a screen session an older build left), running, not a mirror of
    /// another build's chat, not a copy of an iTerm2 one.
    private var ownMovable: Bool { detached?.pty != nil && !hud.exited && !hud.mirror && origin == nil }

    /// Tab `i` can go to another window: every session in it is a pty of this app's (the process moves with its view).
    func canMoveOut(tab i: Int) -> Bool {
        guard tabs.indices.contains(i) else { return false }
        return terminals(in: i).allSatisfy { tv in
            tv === terminal ? ownMovable : extra(of: tv)?.link?.pty != nil
        }
    }

    /// The same for tab `i` leaving this window as a whole: the window's own tab leaves the others behind in a window of
    /// their own, so those must be able to move too.
    func canMoveOutOfWindow(tab i: Int) -> Bool {
        guard canMoveOut(tab: i) else { return false }
        guard tabHoldsOwn(i) else { return true }
        guard env?.dirty != true else { return false }
        return tabs.indices.allSatisfy { $0 == i || canMoveOut(tab: $0) }
    }

    /// Every tab can join another window (Merge All Windows, a window dragged onto another).
    var canDissolve: Bool {
        guard !hud.mirror, origin == nil, env?.dirty != true, !tabs.isEmpty else { return false }
        return tabs.indices.allSatisfy { canMoveOut(tab: $0) }
    }

    /// Tabs can be dropped here: a window on screen with a pty of its own, not a mirror.
    var acceptsTabs: Bool {
        guard let w = window, isShown, !hiding, w.isVisible, !w.isMiniaturized else { return false }
        return !hud.mirror && !hud.exited && detached?.pty != nil && env?.dirty != true
    }

    /// Where a tab let go at `p` (screen coordinates) over this window goes: on the bar's slot, else at the end.
    func incomingSlot(atScreen p: NSPoint) -> Int {
        guard tabs.count > 1, let w = window else { return tabs.count }
        return tabBar.slot(at: w.convertPoint(fromScreen: p)) ?? tabs.count
    }

    /// The orange mark a tab or window dragged over this one leaves: a line in the bar, or the header when there is no bar.
    func showIncomingTab(slot: Int?) {
        if tabs.count > 1 {
            dropZone.frame = container.convert(tabBar.marker(at: slot ?? tabs.count), from: nil)
        } else {
            dropZone.frame = NSRect(x: 0, y: container.bounds.height - 62, width: container.bounds.width, height: 62)
        }
        dropZone.isHidden = false
    }

    func hideIncomingTab() {
        dropZone.isHidden = true
        dropZone.alphaValue = 1
    }

    private func cargo(ofTab i: Int) -> TabCargo {
        var items: [(view: ChatTerminalView, name: String, cwd: String, kind: PaneKind)] = []
        for (n, tv) in terminals(in: i).enumerated() {
            let kind: PaneKind = n == 0 ? .tab : ((tv.superview as? PaneSplitView)?.isVertical ?? true ? .vertical : .horizontal)
            if tv === terminal {
                items.append((tv, detached?.name ?? "", cwd, kind))
            } else if let pane = extra(of: tv) {
                items.append((tv, pane.link?.name ?? "", pane.cwd, kind))
            }
        }
        return TabCargo(root: tabs[i], items: items)
    }

    /// Lets go of a session without ending it: nobody shows it until another window or pane takes its view.
    private func release(_ tv: ChatTerminalView) {
        focusHistory.removeAll { $0 === tv }
        // Its title bar belongs to this window: the one that takes the pane makes its own.
        if let bar = paneBars.removeValue(forKey: ObjectIdentifier(tv)) { bar.removeFromSuperview() }
        if tv === terminal {
            detached?.pty?.owner = nil
        } else if let pane = extra(of: tv) {
            pane.detach()
            extras.removeAll { $0 === pane }
        }
    }

    /// Takes tab `i` out of this window, its sessions running on (never the tab with the window's own terminal: that one
    /// leaves with the window). The window closes up around the gap.
    func detachTab(_ i: Int) -> TabCargo? {
        guard canMoveOut(tab: i), !tabHoldsOwn(i) else { return nil }
        hideEnv()
        if zoomed { _ = toggleZoom() }
        let c = cargo(ofTab: i)
        for item in c.items { release(item.view) }
        removePaneView(c.root)
        refreshPanes()
        focus(focusTarget(in: activeTab))
        return c
    }

    /// Takes every tab out for good (the window is about to go, see MainWindowController.merge), the tab that was in front
    /// last in the answer's `active`.
    func detachAllTabs() -> (cargos: [TabCargo], active: Int) {
        hideEnv()
        if env != nil { dropEnv() }
        if zoomed { _ = toggleZoom() }
        let all = tabs.indices.map { cargo(ofTab: $0) }
        for c in all { for item in c.items { release(item.view) } }
        let active = activeTab
        extras.removeAll()
        for c in all { c.root.removeFromSuperview() }
        tabs.removeAll()
        focusHistory.removeAll()
        return (all, active)
    }

    /// A tab from another window joins this one at `slot` (the end by default): each of its sessions is renamed for its
    /// place here and its view becomes a pane of this window.
    func adopt(_ cargo: TabCargo, at slot: Int? = nil, select: Bool = true) {
        guard let parent = detached?.name else { return }
        hideEnv()
        if zoomed { _ = toggleZoom() }
        for item in cargo.items {
            let name = Detached.rehome(item.name, parent: parent, kind: item.kind) ?? item.name
            manager?.sessionRenamed(item.name, to: name)
            _ = makeExtra(kind: item.kind, cwd: item.cwd, session: name)
        }
        let at = min(max(slot ?? tabs.count, 0), tabs.count)
        let shown = tabs.indices.contains(activeTab) ? tabs[activeTab] : nil
        tabs.insert(cargo.root, at: at)
        if let shown { activeTab = tabs.firstIndex { $0 === shown } ?? activeTab }
        if select {
            selectTab(at)
        } else {
            refreshPanes()
        }
        window?.layoutIfNeeded()
    }

    /// This new window was made for the lead terminal (its own `terminal`) of `cargo`'s tab: the rest of the tab, its
    /// split view with a `placeholder` where the lead sat, moves in around it.
    func install(_ cargo: TabCargo, placeholder: NSView?) {
        guard let parent = detached?.name else { return }
        if cargo.root !== terminal {
            if let placeholder, let sv = placeholder.superview as? PaneSplitView { sv.replaceArrangedSubview(placeholder, with: terminal) }
            tabs[0] = cargo.root
            mount(cargo.root)
            for item in cargo.items where item.view !== terminal {
                let name = Detached.rehome(item.name, parent: parent, kind: item.kind) ?? item.name
                manager?.sessionRenamed(item.name, to: name)
                _ = makeExtra(kind: item.kind, cwd: item.cwd, session: name)
            }
        }
        refreshPanes()
        window?.layoutIfNeeded()
    }

    /// How a new window for the AI running under `shell` is told apart from a plain terminal (see openWindow's claudeArgs):
    /// nil for none, else the tool's command (empty for Claude).
    static func aiLaunch(_ shell: Int32) -> [String]? {
        let tools = ["Codex": "codex", "Antigravity": "agy", "Cursor": "cursor-agent"]
        var level = Proc.children(of: shell)
        for _ in 0..<4 where !level.isEmpty {
            if level.contains(where: Proc.isClaude) { return [] }
            for pid in level { if let name = Proc.otherAI(pid) { return tools[name].map { [$0] } ?? [] } }
            level = level.flatMap { Proc.children(of: $0) }
        }
        return nil
    }

    /// A tab's ×: what runs in it exits at once (its planet or car leaves the orbit) and the other
    /// tabs stay.
    private func closeTab(_ i: Int) {
        guard tabs.indices.contains(i) else { return }
        let ts = terminals(in: i)
        let panes = ts.compactMap { extra(of: $0) }
        let own = panes.count < ts.count
        // A mirror's own chat runs in the other build of the app: closing its tab only closes the window, as before.
        if own, hud.mirror {
            if hide() { manager?.closed(id) }
            return
        }
        if own { endOwnTab(confirm: false) }
        endPanes(panes)
    }

    /// ⌘]/⌘[: the next or previous pane in the shown tab; false with only one.
    func selectPane(step: Int) -> Bool {
        hideEnv()
        if zoomed { _ = toggleZoom() }
        let ts = terminals(in: activeTab)
        guard ts.count > 1 else { return false }
        let i = ts.firstIndex { $0 === focusedTerminal } ?? 0
        focus(ts[(i + step + ts.count) % ts.count])
        return true
    }

    /// ⌥⌘ and an arrow (`dy` up is +1): the pane that way in the shown tab; false when there's none.
    func selectPane(dx: CGFloat, dy: CGFloat) -> Bool {
        hideEnv()
        if zoomed { _ = toggleZoom() }
        let cur = focusedTerminal
        let cf = cur.convert(cur.bounds, to: nil)
        var best: (ChatTerminalView, CGFloat)?
        for tv in terminals(in: activeTab) where tv !== cur {
            let f = tv.convert(tv.bounds, to: nil)
            let x = f.midX - cf.midX, y = f.midY - cf.midY
            let along = x * dx + y * dy
            guard along > 10 else { continue }
            let score = along + 2 * abs(x * dy - y * dx)
            if best.map({ score < $0.1 }) ?? true { best = (tv, score) }
        }
        guard let best else { return false }
        focus(best.0)
        return true
    }

    /// ⌃⌘ and an arrow: the nearest divider across that way moves 40 points; false when there's none.
    func moveDivider(dx: CGFloat, dy: CGFloat) -> Bool {
        if zoomed { _ = toggleZoom() }
        var v: NSView = focusedTerminal
        while let sv = v.superview as? PaneSplitView {
            if sv.isVertical == (dx != 0), let i = sv.arrangedSubviews.firstIndex(of: v) {
                let k = i < sv.arrangedSubviews.count - 1 ? i : i - 1
                let f = sv.arrangedSubviews[k].frame
                // A split view counts from the top: up is a smaller y.
                sv.setPosition(sv.isVertical ? f.maxX + dx * 40 : f.maxY - dy * 40, ofDividerAt: k)
                return true
            }
            v = sv
        }
        return false
    }

    /// ⇧⌘↩: only the pane in front shows in its tab, and back; false with only one pane.
    func toggleZoom() -> Bool {
        if zoomed {
            zoomed = false
            func unhide(_ v: NSView) {
                guard let sv = v as? PaneSplitView else { return }
                for s in sv.arrangedSubviews {
                    s.isHidden = false
                    unhide(s)
                }
                sv.needsLayout = true
            }
            if tabs.indices.contains(activeTab) { unhide(tabs[activeTab]) }
        } else {
            guard terminals(in: activeTab).count > 1 else { return false }
            zoomed = true
            var v: NSView = focusedTerminal
            while let sv = v.superview as? PaneSplitView {
                for s in sv.arrangedSubviews where s !== v { s.isHidden = true }
                sv.needsLayout = true
                v = sv
            }
        }
        window?.layoutIfNeeded()
        dimInactive()
        for tv in terminals(in: activeTab) { extra(of: tv)?.fit() }
        fitSession()
        return true
    }

    // MARK: the env view

    /// Env changes here are not saved.
    var envUnsaved: Bool { env?.dirty == true }

    /// Whether the env view is over the terminal now.
    var envShown: Bool { envHost?.isHidden == false }

    /// The env button, and ⇧⌘E: the env files under the folder of the pane in front, as a view over the terminal in this
    /// window. Pressed again it goes back to the terminal.
    func toggleEnv() {
        if envShown { return leaveEnv() }
        // Another folder in front now (another tab): a new look there, unless something here isn't saved.
        if let m = env, m.root != currentFolder, !m.dirty { dropEnv() }
        if let m = env {
            // Shown again after a tab or pane change: where it was, the list looked at again.
            m.scan(refresh: true)
        } else {
            let m = EnvModel(root: currentFolder)
            m.onLeave = { [weak self] in self?.leaveEnv() }
            m.onBack = { [weak self] in self?.envBack() }
            let host = EnvHostingView(rootView: EnvPanel(model: m, hud: hud))
            host.model = m
            host.sizingOptions = []
            host.translatesAutoresizingMaskIntoConstraints = false
            container.addSubview(host, positioned: .above, relativeTo: streamVeil)
            NSLayoutConstraint.activate([
                host.topAnchor.constraint(equalTo: paneArea.topAnchor),
                host.bottomAnchor.constraint(equalTo: paneArea.bottomAnchor),
                host.leadingAnchor.constraint(equalTo: paneArea.leadingAnchor),
                host.trailingAnchor.constraint(equalTo: paneArea.trailingAnchor),
            ])
            env = m
            envHost = host
            envSub = m.$dirty.receive(on: DispatchQueue.main).sink { [weak self] in self?.hud.envUnsaved = $0 }
            m.scan()
        }
        envHost?.isHidden = false
        paneArea.isHidden = true
        hud.envOpen = true
        window?.makeFirstResponder(envHost)
        if let w = window {
            NSAccessibility.post(element: w, notification: .announcementRequested, userInfo: [.announcement: "Env files", .priority: NSAccessibilityPriorityLevel.low.rawValue])
        }
    }

    /// The terminal comes in front again (a tab or a pane was picked): the env view stays as it is, values masked.
    func hideEnv() {
        guard envShown else { return }
        envHost?.isHidden = true
        paneArea.isHidden = false
        env?.mask()
        hud.envOpen = false
    }

    /// The env view and what it held go away at once (nothing unsaved is left, or it was given up).
    private func dropEnv() {
        envHost?.removeFromSuperview()
        envHost = nil
        envSub = nil
        env?.forgetFile()
        env = nil
        paneArea.isHidden = false
        hud.envOpen = false
        hud.envUnsaved = false
    }

    /// A quit with the env file unsaved: asks, window in front. False when the user cancels (or the save fails).
    func confirmEnvForQuit() -> Bool {
        guard let m = env, m.dirty else { return true }
        if !isShown { show() }
        window?.makeKeyAndOrderFront(nil)
        let alert = NSAlert()
        alert.messageText = "Save changes to \((m.openRel as NSString?)?.lastPathComponent ?? "the env file")?"
        alert.informativeText = "Without saving, your changes to it are lost."
        alert.addButton(withTitle: "Save")
        alert.addButton(withTitle: "Don’t Save")
        alert.addButton(withTitle: "Cancel")
        switch alert.runModal() {
        case .alertFirstButtonReturn: return m.save()
        case .alertSecondButtonReturn: return true
        default: return false
        }
    }

    /// Leaves the env view for good: asks first when changes aren't saved. What it held is dropped.
    func leaveEnv() {
        confirmEnv { [weak self] in
            guard let self else { return }
            self.envHost?.removeFromSuperview()
            self.envHost = nil
            self.envSub = nil
            self.env?.forgetFile()
            self.env = nil
            self.paneArea.isHidden = false
            self.hud.envOpen = false
            self.hud.envUnsaved = false
            self.focus(self.focusedTerminal)
        }
    }

    private func envBack() {
        confirmEnv { [weak self] in
            self?.env?.backToList()
            self?.window?.makeFirstResponder(self?.envHost)
        }
    }

    /// Runs `then` at once, or after the user saves or drops the changes in the env file shown.
    private func confirmEnv(_ then: @escaping () -> Void) {
        guard let m = env, m.dirty, let w = window else { return then() }
        if !isShown { show() }
        let alert = NSAlert()
        alert.messageText = "Save changes to \((m.openRel as NSString?)?.lastPathComponent ?? "the env file")?"
        alert.informativeText = "Without saving, your changes to it are lost."
        alert.addButton(withTitle: "Save")
        alert.addButton(withTitle: "Don’t Save")
        alert.addButton(withTitle: "Cancel")
        alert.beginSheetModal(for: w) { r in
            MainActor.assumeIsolated {
                if r == .alertFirstButtonReturn { if m.save() { then() } } else if r == .alertSecondButtonReturn { then() }
            }
        }
    }

    /// ⌘W with the env view in front closes it, as it closes a tab: true when it did (or asked about changes).
    func closeEnvKey() -> Bool {
        guard envShown else { return false }
        leaveEnv()
        return true
    }

    /// What ⌘W does here (MainWindowController.closePane): a pane besides the window's own closes, else the window
    /// (it hides; what runs goes on).
    func closeLikeCommandW() {
        if closeEnvKey() { return }
        if closeFocusedPane() { return }
        window?.performClose(nil)
    }

    /// ⌘W: a pane besides this window's own closes, as in iTerm2. False for the window's own pane: the window itself
    /// closes then (hides; its chat keeps running).
    func closeFocusedPane() -> Bool {
        guard let pane = extra(of: focusedTerminal) else { return false }
        close(pane)
        return true
    }

    /// Closes a pane as a window closes: what runs in it goes on, a car on the orbit until it's opened again (a click,
    /// ⇧⌘T) or the window's End Session ends it. A pane that never got its session (a screen one not attached yet) just stops.
    private func close(_ pane: ExtraPane) {
        if zoomed { _ = toggleZoom() }
        let folder = pane.currentFolder
        removePaneView(pane.terminal)
        extras.removeAll { $0 === pane }
        if let name = pane.link?.name {
            pane.detach()
            manager?.closedPane(of: self, session: name, kind: pane.kind, cwd: folder)
        } else {
            pane.end()
        }
        refreshPanes()
        focus(focusTarget(in: activeTab))
    }

    /// A pane's shell exited: the pane goes, as in iTerm2.
    func paneEnded(_ pane: ExtraPane) {
        guard extras.contains(where: { $0 === pane }) else { return }
        if zoomed { _ = toggleZoom() }
        removePaneView(pane.terminal)
        extras.removeAll { $0 === pane }
        refreshPanes()
        if window?.isKeyWindow == true { focus(focusTarget(in: activeTab)) }
    }

    /// Every extra pane's shell stops (End, or the window goes).
    func endPanes() {
        for pane in extras { pane.end() }
    }

    // MARK: worktree: PR, merge, delete (WorktreeShip.swift)

    /// Keeps the title row's chip and button in step with the worktree's status.
    private func watchShip(_ top: String) {
        let ship = WorktreeShip.shared
        ship.startTimer()
        syncShip(top)
        shipSub = ship.objectWillChange.receive(on: DispatchQueue.main).sink { [weak self] _ in self?.syncShip(top) }
        ship.refresh(top, pr: true)
    }

    private func syncShip(_ top: String) {
        let ship = WorktreeShip.shared
        if hud.wt != ship.status[top] { hud.wt = ship.status[top] }
        if hud.shipBusy != ship.busy[top] { hud.shipBusy = ship.busy[top] }
        let gone = ship.deleted.contains(top)
        if hud.shipDeleted != gone { hud.shipDeleted = gone }
    }

    private func shipAction(_ id: String) {
        guard let top = hud.wtTop else { return }
        WorktreeShip.shared.handle(id, top: top, from: self)
    }

    /// ▾: every action of the worktree, as a system menu at the button.
    private func popShipMenu() {
        guard hud.wtTop != nil, let w = window, let view = w.contentView else { return }
        let menu = WorktreeShip.menu(hud.wt, deleted: hud.shipDeleted, streamer: hud.streamer) { [weak self] id in self?.shipAction(id) }
        hud.shipMenuOpen = true
        let p = view.convert(w.mouseLocationOutsideOfEventStream, from: nil)
        menu.popUp(positioning: nil, at: NSPoint(x: p.x, y: p.y - 6), in: view)
        hud.shipMenuOpen = false
    }

    /// The chat's own title, offered as a pull request's title (the AI wrote it already).
    func shipTitle() -> String? {
        let t = hud.brief?.title.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        return t.isEmpty ? nil : t
    }

    /// The AI's turn ended or began: the worktree's files may have changed, so its status is read again at once.
    private func shipStatusChanged(_ status: String) {
        guard let top = hud.wtTop, status != shipLastStatus else { return }
        let before = shipLastStatus
        shipLastStatus = status
        if before == "busy", status != "busy" { WorktreeShip.shared.refresh(top, force: true) }
    }

    /// Delete worktree: this window's chat or terminal stops, as its End button stops it, but the window stays, ended, until the
    /// user closes it (spec 9.2). Nothing else is closed.
    func endLeavingWindow() {
        guard !hud.exited, !hud.mirror else { return }
        manager?.dismiss(sessionId: sessionId, pid: hud.brief?.live == true ? hud.brief?.pid : nil)
        manager?.terminalEnding(carId)
        if let detached {
            Detached.quit(detached.name)
            manager?.endParked(of: detached.name)
        }
        endPanes()
        terminal.terminate()
        // The process ending reports itself (processTerminated); when it doesn't within a moment, the window says it ended itself.
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) { [weak self] in
            guard let self, !self.hud.exited else { return }
            self.processTerminated(source: self.terminal, exitCode: nil)
        }
    }

    /// The panes of this window that are in the worktree `top` end (their shells, and what runs in them).
    func endPanes(inTop top: String) {
        let mine = extras.filter { Worktrees.info(of: $0.cwd)?.top == top }
        if !mine.isEmpty { endPanes(mine) }
    }

    /// A dim line in the ended window's terminal.
    func noteEnded(_ line: String) {
        terminal.feed(text: "\u{1b}[2m\(line)\u{1b}[0m\r\n")
    }

    /// The app quits or restarts: the panes let go of their sessions (a screen session keeps running and comes back next
    /// launch; a pty's shell ends with the app, its pane comes back from the snapshot).
    func detachPanes() {
        for pane in extras { pane.detach() }
    }

    private func refreshPanes() {
        let many = tabs.count > 1
        hud.tabCount = tabs.count
        tabBar.isHidden = !many
        if many {
            paneTop.isActive = false
            paneTopUnderTabs.isActive = true
            tabBar.show(titles: tabs.indices.map(tabTitle), active: activeTab)
            updateTabStats()
        } else {
            paneTopUnderTabs.isActive = false
            paneTop.isActive = true
        }
        syncPaneBars()
        dimInactive()
        manager?.panesChanged()
    }

    /// The tab's chip name: what the user typed (Rename Tab), else the automatic one.
    private func tabTitle(_ i: Int) -> String {
        if let key = tabKey(i), let custom = manager?.tabName(for: key) { return custom }
        return autoTabTitle(i)
    }

    /// The window's title for its own tab; else the AI's title in the tab (Claude, Codex, Antigravity), else its folder.
    private func autoTabTitle(_ i: Int) -> String {
        let ts = terminals(in: i)
        if ts.contains(where: { $0 === terminal }) { return window?.title ?? "" }
        let folder = ts.first.flatMap { extra(of: $0) }?.currentFolder ?? cwd
        if let b = briefForTab(i), !b.title.isEmpty { return hud.streamer ? Streamer.fake("title", b.title) : b.title }
        return hud.streamer ? Streamer.project(folder) : (folder as NSString).lastPathComponent
    }

    /// A chat was renamed in the dashboard: the hand-typed names of the tab holding the AI under `pid` (its first pane's) and of
    /// its own pane go, so the new name shows.
    func clearTabNames(hosting pid: Int32) {
        for i in tabs.indices {
            for tv in terminals(in: i) {
                let shell = tv === terminal ? shellPid : extra(of: tv)?.shellPid ?? 0
                guard Self.isUnder(pid, shell: shell) else { continue }
                if let key = tabKey(i) { manager?.setTabName(nil, for: key) }
                if let key = sessionName(of: tv) { manager?.setTabName(nil, for: key) }
            }
        }
        refreshPanes()
    }

    /// The session a name typed for the tab is kept under: the first terminal's (names survive a restart).
    private func tabKey(_ i: Int) -> String? {
        guard let tv = terminals(in: i).first else { return nil }
        return tv === terminal ? detached?.name : extra(of: tv)?.link?.name
    }

    /// The AI session running in tab `i`: the one in its pane in front, else in any of its panes.
    private func briefForTab(_ i: Int) -> SessionBrief? {
        let front = focusTarget(in: i)
        for tv in [front] + terminals(in: i).filter({ $0 !== front }) {
            let shell = tv === terminal ? shellPid : extra(of: tv)?.shellPid ?? 0
            if let b = paneBriefs.values.first(where: { Self.isUnder($0.pid, shell: shell) }) { return b }
        }
        return nil
    }

    private func beginRename(_ i: Int) {
        guard tabs.indices.contains(i) else { return }
        tabBar.beginRename(at: i, text: tabTitle(i))
    }

    /// A name typed in the tab's chip: empty goes back to the automatic one; the same as the automatic one changes nothing.
    private func renameTab(_ i: Int, to text: String?) {
        defer { focus(focusTarget(in: activeTab)) }
        guard let text, let key = tabKey(i) else { return }
        let t = text.trimmingCharacters(in: .whitespacesAndNewlines)
        let custom = manager?.tabName(for: key)
        if t.isEmpty {
            manager?.setTabName(nil, for: key)
        } else if t != (custom ?? autoTabTitle(i)) {
            manager?.setTabName(t, for: key)
        }
        refreshPanes()
    }

    /// The right-click menu of tab `i`'s chip.
    private func tabMenu(_ i: Int) -> NSMenu {
        let menu = NSMenu()
        menu.autoenablesItems = false
        func add(_ title: String, enabled: Bool = true, _ block: @escaping () -> Void) {
            let item = BlockMenuItem(title: title) { DispatchQueue.main.async(execute: block) }
            item.isEnabled = enabled
            menu.addItem(item)
        }
        add("Rename Tab\u{2026}") { [weak self] in self?.beginRename(i) }
        add("New Tab to the Right") { [weak self] in
            self?.selectTab(i)
            self?.newTab(next: true)
        }
        add("Move Tab to New Window", enabled: tabs.count > 1 && canMoveOutOfWindow(tab: i)) { [weak self] in
            guard let self else { return }
            self.manager?.moveTabToNewWindow(tab: i, of: self)
        }
        menu.addItem(.separator())
        add("Close Tab") { [weak self] in
            guard let self else { return }
            if self.tabRuns(i), !self.ask("Close this tab?", "What runs in it stops.", "Close Tab") { return }
            self.closeTab(i)
        }
        add("Close Other Tabs", enabled: tabs.count > 1) { [weak self] in self?.closeOtherTabs(keeping: i) }
        return menu
    }

    // MARK: pane title bars (tabs that hold several panes) and moving a pane out of its split

    /// A tab holding several panes gives each a slim bar on top, placed by the split view that holds the pane; a tab with
    /// one pane has none. Bars are kept per terminal, so one being dragged is never rebuilt under the pointer.
    private func syncPaneBars() {
        var live = Set<ObjectIdentifier>()
        for i in tabs.indices {
            let ts = terminals(in: i)
            guard ts.count > 1 else { continue }
            for tv in ts {
                let key = ObjectIdentifier(tv)
                live.insert(key)
                let bar = paneBars[key] ?? makePaneBar(tv)
                paneBars[key] = bar
                if let sv = tv.superview as? PaneSplitView, bar.superview !== sv {
                    bar.removeFromSuperview()
                    sv.addSubview(bar)
                    sv.needsLayout = true
                }
            }
        }
        for (key, bar) in paneBars where !live.contains(key) {
            (bar.superview as? PaneSplitView)?.needsLayout = true
            bar.removeFromSuperview()
            paneBars[key] = nil
        }
        updatePaneBars()
    }

    private func makePaneBar(_ tv: ChatTerminalView) -> PaneTitleBar {
        let bar = PaneTitleBar(pane: tv)
        bar.onSelect = { [weak self, weak tv] in if let tv { self?.focus(tv) } }
        bar.onClose = { [weak self, weak tv] in if let tv { self?.closePaneFromBar(tv) } }
        bar.onDrag = { [weak self, weak tv] phase in if let tv { self?.dragPane(tv, phase) } }
        bar.onRename = { [weak self, weak tv] in if let tv { self?.renamePane(tv, to: $0) } }
        bar.onRenameRequest = { [weak self, weak tv] in if let tv { self?.beginPaneRename(tv) } }
        bar.onMenu = { [weak self, weak tv] in tv.flatMap { self?.paneMenu($0) } }
        bar.onFavorite = { [weak self] in self?.toggleTabFavorite($0) }
        bar.onCopy = { [weak self, weak tv] in if let tv { self?.copyLastReply(of: tv) } }
        bar.onEnv = { [weak self, weak tv] in
            guard let self, let tv else { return }
            self.focus(tv)
            self.toggleEnv()
        }
        return bar
    }

    /// Each bar's name and AI figures (the tab chip's: context, tools, web, errors) and which one has the keyboard.
    /// The footer follows the focused pane in a split (ChatHUD.focusSid / focusBrief).
    private func syncFocusHUD() {
        let split = tabs.indices.contains(activeTab) && terminals(in: activeTab).count > 1
        let brief = split ? briefFor(focusedTerminal) : nil
        // Its chat going on under another account: that chat's lines, "starting" until the new Claude is up.
        let moving = split && brief == nil ? sessionName(of: focusedTerminal).flatMap { Sessions.live[$0]?.ai }
            .flatMap { $0.tool == "claude" && hud.switching[$0.id] != nil ? $0.id : nil } : nil
        if hud.focusSid != brief?.id ?? moving { hud.focusSid = brief?.id ?? moving }
        if hud.focusBrief != brief { hud.focusBrief = brief }
        if hud.focusStarting != (moving != nil) { hud.focusStarting = moving != nil }
    }

    private func updatePaneBars() {
        let split = tabs.indices.contains(activeTab) && terminals(in: activeTab).count > 1
        if hud.paneSplit != split { hud.paneSplit = split }
        syncFocusHUD()
        guard !paneBars.isEmpty else { return }
        let focus = tabs.indices.contains(activeTab) ? focusedTerminal : nil
        let several = Set(allTerminals.compactMap { briefFor($0) }.compactMap(acctMark).map(\.id)).count > 1
        let favs = manager?.sidebar.favorites ?? []
        for bar in paneBars.values {
            guard let tv = bar.pane as? ChatTerminalView, !bar.isEditing else { continue }
            let stats = briefFor(tv).map { b in
                TabStats(ctx: b.ctx, ctxMax: b.ctxMax, tools: b.tools, web: b.web, errors: b.errors, status: b.status,
                         account: several ? acctMark(b) : nil,
                         starId: b.live ? b.convId ?? b.id : nil, starred: Self.starred(favs, id: b.id, conv: b.convId))
            }
            bar.set(title: paneTitle(tv), stats: stats)
            bar.envUnsaved = env?.dirty == true && env?.root == paneFolder(tv)
            bar.focused = tv === focus
        }
    }

    private func paneFolder(_ tv: ChatTerminalView) -> String {
        if let pane = extra(of: tv) { return pane.currentFolder }
        return (shellPid > 0 ? Proc.cwd(shellPid) : nil) ?? cwd
    }

    func sessionName(of tv: ChatTerminalView) -> String? {
        tv === terminal ? detached?.name : extra(of: tv)?.link?.name
    }

    /// The AI session running in pane `tv`.
    func briefFor(_ tv: ChatTerminalView) -> SessionBrief? {
        let shell = tv === terminal ? shellPid : extra(of: tv)?.shellPid ?? 0
        return paneBriefs.values.first { Self.isUnder($0.pid, shell: shell) }
    }

    /// A pane's name, as a tab's: what the user typed, else its AI's title, else its folder.
    private func paneTitle(_ tv: ChatTerminalView) -> String {
        if let key = sessionName(of: tv), let custom = manager?.tabName(for: key) { return custom }
        return autoPaneTitle(tv)
    }

    private func autoPaneTitle(_ tv: ChatTerminalView) -> String {
        if tv === terminal { return window?.title ?? "" }
        let folder = extra(of: tv)?.currentFolder ?? cwd
        if let b = briefFor(tv), !b.title.isEmpty { return hud.streamer ? Streamer.fake("title", b.title) : b.title }
        return hud.streamer ? Streamer.project(folder) : (folder as NSString).lastPathComponent
    }

    private func beginPaneRename(_ tv: ChatTerminalView) {
        paneBars[ObjectIdentifier(tv)]?.beginEditing(text: paneTitle(tv))
    }

    private func renamePane(_ tv: ChatTerminalView, to text: String?) {
        defer { focus(terminals(in: activeTab).contains { $0 === tv } ? tv : focusTarget(in: activeTab)) }
        guard let text, let key = sessionName(of: tv) else { return }
        let t = text.trimmingCharacters(in: .whitespacesAndNewlines)
        let custom = manager?.tabName(for: key)
        if t.isEmpty {
            manager?.setTabName(nil, for: key)
        } else if t != (custom ?? autoPaneTitle(tv)) {
            manager?.setTabName(t, for: key)
        }
        refreshPanes()
    }

    /// A pane's shell has an AI or a job running.
    func paneRuns(_ tv: ChatTerminalView) -> Bool {
        let shell = tv === terminal ? shellPid : extra(of: tv)?.shellPid ?? 0
        return shell > 0 && (Self.runsAgent(shell) || !Proc.children(of: shell).isEmpty)
    }

    /// The bar's x: the pane's session ends as a tab's does (asks first when something runs in it).
    private func closePaneFromBar(_ tv: ChatTerminalView) {
        if paneRuns(tv), !ask("Close this pane?", "What runs in it stops.", "Close Pane") { return }
        if tv === terminal {
            // A mirror's own chat runs in the other app: not ended from here.
            guard !hud.mirror else { return NSSound.beep() }
            endOwnTab(confirm: false)
        } else if let pane = extra(of: tv) {
            endPanes([pane])
        }
    }

    /// The pane's session is a pty of an extra pane (the window's own terminal stays in its window).
    private func canMovePane(_ tv: ChatTerminalView) -> Bool {
        tv !== terminal && !hud.mirror && extra(of: tv)?.link?.pty != nil
    }

    private func paneMenu(_ tv: ChatTerminalView) -> NSMenu {
        let menu = NSMenu()
        menu.autoenablesItems = false
        func add(_ title: String, enabled: Bool = true, _ block: @escaping () -> Void) {
            let item = BlockMenuItem(title: title) { DispatchQueue.main.async(execute: block) }
            item.isEnabled = enabled
            menu.addItem(item)
        }
        add("Rename\u{2026}") { [weak self, weak tv] in if let tv { self?.beginPaneRename(tv) } }
        add("Move Pane to New Tab") { [weak self, weak tv] in if let tv { self?.paneToTab(tv) } }
        add("Move Pane to New Window", enabled: canMovePane(tv)) { [weak self, weak tv] in
            guard let self, let tv else { return }
            self.manager?.movePaneToNewWindow(tv, of: self)
        }
        menu.addItem(.separator())
        add("Close Pane") { [weak self, weak tv] in if let tv { self?.closePaneFromBar(tv) } }
        return menu
    }

    /// The pane's place in window coordinates, its title bar included.
    private func paneFrame(_ tv: ChatTerminalView) -> NSRect {
        var f = tv.convert(tv.bounds, to: nil)
        if let bar = paneBars[ObjectIdentifier(tv)], bar.superview != nil, !bar.isHidden { f = f.union(bar.convert(bar.bounds, to: nil)) }
        return f
    }

    /// The pane of the shown tab under `point` (window coordinates) and the side a pane let go there would take.
    func splitTarget(at point: NSPoint, excluding: ChatTerminalView? = nil) -> (ChatTerminalView, NSRectEdge)? {
        for tv in terminals(in: activeTab) where !tv.isHidden && tv !== excluding {
            let f = paneFrame(tv)
            guard f.contains(point) else { continue }
            let dx = (point.x - f.midX) / f.width, dy = (point.y - f.midY) / f.height
            return (tv, abs(dx) > abs(dy) ? (dx < 0 ? .minX : .maxX) : (dy < 0 ? .minY : .maxY))
        }
        return nil
    }

    /// The pane of the shown tab under `point` (window coordinates): the side a pane let go there would take, or nil for its
    /// middle (a tab, as a header drop).
    func paneSpot(at point: NSPoint) -> (ChatTerminalView, NSRectEdge?)? {
        for tv in terminals(in: activeTab) where !tv.isHidden {
            let f = paneFrame(tv)
            guard f.contains(point) else { continue }
            let dx = (point.x - f.midX) / f.width, dy = (point.y - f.midY) / f.height
            if abs(dx) < 0.2, abs(dy) < 0.2 { return (tv, nil) }
            return (tv, abs(dx) > abs(dy) ? (dx < 0 ? .minX : .maxX) : (dy < 0 ? .minY : .maxY))
        }
        return nil
    }

    /// The preview of a drop on pane `tv`: a half on `edge`'s side, or the whole pane (a tab).
    func showSpot(_ tv: ChatTerminalView, _ edge: NSRectEdge?, animated: Bool = false) {
        if let edge { return showSplitZone(tv, edge, animated: animated) }
        placeZone(container.convert(paneFrame(tv), from: nil), animated: animated)
    }

    /// The preview at `r` (the container's coordinates). Animated (a window dragged over this one): it fades in over about
    /// 150 ms and slides between places over about 70 ms, unless Reduce Motion is on.
    private func placeZone(_ r: NSRect, animated: Bool) {
        let still = !animated || NSWorkspace.shared.accessibilityDisplayShouldReduceMotion
        if still {
            dropZone.frame = r
            dropZone.alphaValue = 1
            dropZone.isHidden = false
        } else if dropZone.isHidden {
            dropZone.frame = r
            dropZone.alphaValue = 0
            dropZone.isHidden = false
            NSAnimationContext.runAnimationGroup { c in
                c.duration = 0.15
                dropZone.animator().alphaValue = 1
            }
        } else if dropZone.frame != r {
            NSAnimationContext.runAnimationGroup { c in
                c.duration = 0.07
                dropZone.animator().frame = r
            }
        }
    }

    /// The orange area over the half of `tv` a pane would take on `edge`'s side.
    func showSplitZone(_ tv: ChatTerminalView, _ edge: NSRectEdge, animated: Bool = false) {
        var r = paneFrame(tv)
        switch edge {
        case .minX: r.size.width /= 2
        case .maxX: r.origin.x += r.width / 2; r.size.width /= 2
        case .minY: r.size.height /= 2
        default: r.origin.y += r.height / 2; r.size.height /= 2
        }
        placeZone(container.convert(r, from: nil), animated: animated)
    }

    /// Where a pane dragged by its bar would go.
    private enum PaneDrop {
        case tab(Int), split(ChatTerminalView, NSRectEdge)
        case otherTab(ChatWindowController, Int), otherSplit(ChatWindowController, ChatTerminalView, NSRectEdge)
        case detach(NSPoint)
    }

    private func paneDrop(for tv: ChatTerminalView, at point: NSPoint) -> PaneDrop? {
        let screen = NSEvent.mouseLocation
        let movable = canMovePane(tv)
        let hit = manager?.chatWindow(atScreen: screen, below: ghost?.floor ?? 0)
        if let hit, hit !== self {
            guard movable, hit.acceptsTabs, let w = hit.window else { return nil }
            // Over its panes: a split there; over its bar or header: a tab.
            if let t = hit.splitTarget(at: w.convertPoint(fromScreen: screen)) { return .otherSplit(hit, t.0, t.1) }
            return .otherTab(hit, hit.incomingSlot(atScreen: screen))
        }
        guard let w = window else { return nil }
        guard hit === self || w.frame.contains(screen) else { return movable ? .detach(screen) : nil }
        if tabs.count > 1, let slot = tabBar.slot(at: point) { return .tab(slot) }
        if point.y >= w.frame.height - 62 { return .tab(tabs.count) }
        if let t = splitTarget(at: point, excluding: tv) { return .split(t.0, t.1) }
        // Let go over its own pane or its own bar: nothing happens.
        if paneFrame(tv).contains(point) { return nil }
        // Inside the window, well away from the bars, on no pane that takes a split: a window of its own, there.
        let top = tabs.count > 1 ? tabBar.convert(tabBar.bounds, to: nil).minY : w.frame.height - 62
        return movable && point.y < top - 40 ? .detach(screen) : nil
    }

    private func showPaneDrop(_ drop: PaneDrop?) {
        var over: ChatWindowController?
        var outline: NSRect?
        var mine = false
        switch drop {
        case .otherTab(let o, let slot)?: over = o; o.showIncomingTab(slot: slot)
        case .otherSplit(let o, let t, let e)?: over = o; o.showSplitZone(t, e)
        case .detach(let p)?: outline = manager?.tearFrame(like: self, at: p)
        case .tab(let slot)?: mine = true; showIncomingTab(slot: slot)
        case .split(let t, let e)?: mine = true; showSplitZone(t, e)
        case nil: break
        }
        if dropWindow !== over { dropWindow?.hideIncomingTab() }
        dropWindow = over
        ghost?.showOutline(outline)
        if !mine { dropZone.isHidden = true }
    }

    private func dragPane(_ tv: ChatTerminalView, _ phase: TabDrag) {
        switch phase {
        case .began:
            if zoomed { _ = toggleZoom() }
            draggedPane = tv
            ghost?.close()
            ghost = TabDragGhost(title: paneTitle(tv))
            ghost?.move(to: NSEvent.mouseLocation)
        case .moved(let p):
            guard draggedPane != nil else { return }
            ghost?.move(to: NSEvent.mouseLocation)
            showPaneDrop(paneDrop(for: tv, at: p))
        case .ended(let p):
            guard draggedPane != nil else { return }
            let drop = paneDrop(for: tv, at: p)
            showPaneDrop(nil)
            ghost?.close()
            ghost = nil
            draggedPane = nil
            // The bars are rebuilt by the move: after this event, not in it.
            DispatchQueue.main.async { [weak self, weak tv] in
                guard let self, let tv, let m = self.manager else { return }
                switch drop {
                case .tab(let slot)?: self.paneToTab(tv, at: slot)
                case .split(let t, let e)?: self.paneToSplit(tv, beside: t, edge: e)
                case .otherTab(let o, let slot)?: m.movePane(tv, of: self, to: o, slot: slot)
                case .otherSplit(let o, let t, let e)?: m.movePane(tv, of: self, to: o, beside: t, edge: e)
                case .detach(let point)?: m.tearOffPane(tv, of: self, frame: m.tearFrame(like: self, at: point))
                case nil: break
                }
            }
        }
    }

    /// Pane `tv` leaves its split and becomes a tab of its own at `slot` (the end by default). Its session stays.
    func paneToTab(_ tv: ChatTerminalView, at slot: Int? = nil) {
        guard terminals(in: activeTab).count > 1, terminals(in: activeTab).contains(where: { $0 === tv }) else { return }
        hideEnv()
        if zoomed { _ = toggleZoom() }
        removePaneView(tv)
        tv.alphaValue = 1
        extra(of: tv)?.rekind(.tab)
        let shown = tabs.indices.contains(activeTab) ? tabs[activeTab] : nil
        let at = min(max(slot ?? tabs.count, 0), tabs.count)
        tabs.insert(tv, at: at)
        if let shown { activeTab = tabs.firstIndex { $0 === shown } ?? activeTab }
        selectTab(at)
        window?.layoutIfNeeded()
        focus(tv)
    }

    /// Pane `tv` moves beside `target` (another pane of the shown tab) on `edge`'s side, taking half its room.
    func paneToSplit(_ tv: ChatTerminalView, beside target: ChatTerminalView, edge: NSRectEdge) {
        let ts = terminals(in: activeTab)
        guard tv !== target, ts.contains(where: { $0 === tv }), ts.contains(where: { $0 === target }) else { return }
        hideEnv()
        if zoomed { _ = toggleZoom() }
        // The split closes up around the gap first (the remaining pane takes the room), then the pane goes in beside the target.
        removePaneView(tv)
        let vertical = edge == .minX || edge == .maxX
        insert(tv, beside: target, vertical: vertical, before: edge == .minX || edge == .maxY)
        extra(of: tv)?.rekind(vertical ? .vertical : .horizontal)
        refreshPanes()
        window?.layoutIfNeeded()
        for t in terminals(in: activeTab) { extra(of: t)?.fit() }
        fitSession()
        focus(tv)
    }

    /// Takes pane `tv` out of its split for another window, its session running on: it leaves the window's panes, the split
    /// closes up. Never the window's own terminal.
    func detachPane(_ tv: ChatTerminalView) -> TabCargo? {
        guard canMovePane(tv), let pane = extra(of: tv), let name = pane.link?.name,
              terminals(in: activeTab).contains(where: { $0 === tv }) else { return nil }
        hideEnv()
        if zoomed { _ = toggleZoom() }
        let cargo = TabCargo(root: tv, items: [(tv, name, pane.cwd, .tab)])
        release(tv)
        removePaneView(tv)
        tv.alphaValue = 1
        refreshPanes()
        focus(focusTarget(in: activeTab))
        return cargo
    }

    /// A pane, or a whole tab's panes, from another window joins the shown tab beside `target` on `edge`'s side.
    func adoptSplit(_ cargo: TabCargo, beside target: ChatTerminalView, edge: NSRectEdge) {
        guard let parent = detached?.name, !cargo.items.isEmpty else { return }
        // The target went away meanwhile: the panes (already out of their old window) become a tab here instead of showing nowhere.
        guard terminals(in: activeTab).contains(where: { $0 === target }) else { return adopt(cargo) }
        hideEnv()
        if zoomed { _ = toggleZoom() }
        let vertical = edge == .minX || edge == .maxX
        let kind: PaneKind = vertical ? .vertical : .horizontal
        var first: ChatTerminalView?
        for item in cargo.items {
            // The first pane takes the outer split's kind; the others keep how they sat in their tab.
            let k = item.view === cargo.items.first?.view ? kind : item.kind
            let name = Detached.rehome(item.name, parent: parent, kind: k) ?? item.name
            manager?.sessionRenamed(item.name, to: name)
            let pane = makeExtra(kind: k, cwd: item.cwd, session: name)
            first = first ?? pane.terminal
        }
        insert(cargo.root, beside: target, vertical: vertical, before: edge == .minX || edge == .maxY)
        refreshPanes()
        window?.layoutIfNeeded()
        for t in terminals(in: activeTab) { extra(of: t)?.fit() }
        fitSession()
        if let first { focus(first) }
    }

    /// An AI or a job runs in one of tab `i`'s panes.
    private func tabRuns(_ i: Int) -> Bool {
        terminals(in: i).contains { tv in
            let shell = tv === terminal ? shellPid : extra(of: tv)?.shellPid ?? 0
            return shell > 0 && (Self.runsAgent(shell) || !Proc.children(of: shell).isEmpty)
        }
    }

    /// How far down from the window's top a tab or window dragged over it counts as on its header (header, and the bar).
    var dropHeaderHeight: CGFloat { 62 + (tabs.count > 1 ? 40 : 0) }

    /// Closes every tab but `i` the way the x on a tab does; asks first when an AI or a job runs in one of them.
    private func closeOtherTabs(keeping i: Int) {
        guard tabs.indices.contains(i) else { return }
        // A mirror's own tab only closes the window: left alone.
        let others = tabs.indices.filter { $0 != i && !(hud.mirror && tabHoldsOwn($0)) }
        guard !others.isEmpty else { return }
        let running = others.contains { tabRuns($0) }
        if running, !ask("Close the other tabs?", "What runs in them stops.", "Close Tabs") { return }
        let keep = tabs[i]
        for j in others.reversed() { closeTab(j) }
        if let k = tabs.firstIndex(where: { $0 === keep }) { selectTab(k) }
    }

    /// As in iTerm2, the panes without the keyboard dim a little.
    private func dimInactive() {
        let ts = terminals(in: activeTab)
        let focus = focusedTerminal
        for tv in ts { tv.alphaValue = ts.count > 1 && tv !== focus ? 0.7 : 1 }
        for bar in paneBars.values { bar.focused = bar.pane === focus }
        syncFocusHUD()
    }

    /// Gives a pane the keyboard.
    private func focus(_ tv: ChatTerminalView) {
        // The env view is over the terminals: the keys go there, never to a terminal nobody sees.
        if envShown { window?.makeFirstResponder(envHost); return }
        window?.makeFirstResponder(tv)
        focusChanged()
    }

    private func focusChanged() {
        guard let tv = window?.firstResponder as? ChatTerminalView, allTerminals.contains(where: { $0 === tv }) else { return }
        focusHistory.removeAll { $0 === tv }
        focusHistory.append(tv)
        dimInactive()
        manager?.terminalFocused(window: id)
        acctRefresh()
    }

    /// The dashboard's menus (friends, settings, updates) open on the dashboard, under the windows pinned above it:
    /// those step out of the way meanwhile. Always-on-top windows stay, so do windows on their own (ChatWindows.free), and
    /// so do windows in the Dock: ordered out and in again (stepBack), a minimized window came back out of the Dock when the
    /// menu closed.
    func stepAside() {
        guard let w = window, isShown, hud.attached, !steppedAside, !w.isMiniaturized else { return }
        steppedAside = true
        w.parent?.removeChildWindow(w)
        w.orderOut(nil)
        manager?.dashboardVisibilityChanged()
    }

    func stepBack() {
        guard steppedAside, let w = window else { return }
        steppedAside = false
        guard isShown else { return }
        if hud.attached, let parent = rideableDashboard(for: w) { parent.addChildWindow(w, ordered: .above) }
        w.orderFront(nil)
        manager?.dashboardVisibilityChanged()
    }

    /// `confirm` false: asked already (a dashboard card's red button).
    func endChat(confirm: Bool = true) {
        // Env changes not saved: asked first (what is dropped then is dropped with the window).
        if env?.dirty == true {
            confirmEnv { [weak self] in
                self?.dropEnv()
                self?.endChat(confirm: confirm)
            }
            return
        }
        // With tabs, End Session ends the tab in front only: another tab's panes, or the window's own chat or terminal
        // (its tab goes, the others run on).
        if tabs.count > 1, !hud.mirror {
            if !terminals(in: activeTab).contains(where: { $0 === terminal }) { return endTab(activeTab, confirm: confirm) }
            return endOwnTab(confirm: confirm && !hud.exited)
        }
        // A mirror (the chat runs in the other build of the app): End Session ends it there too, as its own window's
        // would; closing the mirror's window only closes it (closeMirror). It used to only close here as well, and the
        // chat, still running, kept coming back.
        if hud.mirror {
            let owner = detached.map { Detached.owner($0.name) } ?? "the other app"
            if confirm, !hud.exited, !ask("End this chat?", "It runs in \(owner): Claude stops there too. The conversation stays saved and you can resume it later.", "End Chat") { return }
            manager?.dismiss(sessionId: sessionId, pid: hud.brief?.live == true ? hud.brief?.pid : nil)
            let finish = { [weak self] in
                guard let self else { return }
                if let detached = self.detached { Detached.quit(detached.name) }
                // Its own tabs (⌘T in a mirror) end with it.
                self.endPanes()
                self.terminal.terminate()
                self.manager?.removeChat(self.id)
            }
            if !hide(then: finish) { finish() }
            return
        }
        // A copy takes its original along: the Claude it was copied from stops in its iTerm2 tab, which closes.
        // Only while that Claude still runs there.
        let original = origin.flatMap { o in Proc.info(o.claude)?.tty == o.tty && Proc.isClaude(o.claude) ? o : nil }
        let shellOnly = hud.status == "terminal"
        // Like iTerm2: a terminal whose shell runs nothing closes without asking.
        let idle = shellOnly && shellPid > 0 && Proc.children(of: shellPid).isEmpty
        // Its own chat over, what's left are panes: asks when something runs in them.
        if confirm, hud.exited, original == nil, busy(extras), !ask("End this tab?", "What runs in it stops.", "End Tab") { return }
        if confirm, (!hud.exited && !idle) || original != nil {
            let a = NSAlert()
            a.messageText = shellOnly ? "Close this terminal?" : "End this chat?"
            if shellOnly {
                a.informativeText = "The shell in this window stops."
            } else if let original {
                let busy = manager?.status(of: original.claude) == "busy"
                a.informativeText = "Claude stops here and in the iTerm2 tab it was copied from" + (busy ? ", where it is still working" : "")
                    + ", and that tab closes. Both conversations stay saved and you can resume them later."
            } else {
                a.informativeText = "Claude in this window stops. The conversation stays saved and you can resume it later."
            }
            a.alertStyle = .warning
            a.addButton(withTitle: shellOnly ? "Close Terminal" : "End Chat")
            a.addButton(withTitle: "Cancel")
            guard a.runModal() == .alertFirstButtonReturn else { return }
        }
        // The dashboard drops the session now, while the window powers off, so it can't be clicked open again; a
        // terminal's car blows up on the orbit at the same moment.
        manager?.dismiss(sessionId: sessionId, pid: hud.brief?.live == true ? hud.brief?.pid : nil)
        manager?.terminalEnding(carId)
        if let original { manager?.dismiss(sessionId: manager?.sessionId(of: original.claude), pid: original.claude) }
        let finish = { [weak self] in
            guard let self else { return }
            if let detached = self.detached {
                Detached.quit(detached.name)
                // Its tabs and panes closed earlier, still running, end with it.
                self.manager?.endParked(of: detached.name)
            }
            self.endPanes()
            self.terminal.terminate()
            if let original { ITerm.end(original) }
            self.manager?.removeChat(self.id)
        }
        // Without the power-off animation (window hidden, or still powering on) the chat ends all the same.
        if !hide(then: finish) { finish() }
    }

    /// End Session on a tab of extra panes: they end (their shells and what runs in them), the window stays.
    private func endTab(_ i: Int, confirm: Bool) {
        let panes = terminals(in: i).compactMap { extra(of: $0) }
        if confirm, busy(panes), !ask("End this tab?", "What runs in it stops.", "End Tab") { return }
        endPanes(panes)
    }

    /// Extra panes end: their shells and what runs in them stop. An AI session in one leaves the orbit at once (its
    /// planet blows up), rather than when the engine next notices its process gone.
    private func endPanes(_ panes: [ExtraPane]) {
        guard !panes.isEmpty else { return }
        if zoomed { _ = toggleZoom() }
        for pane in panes {
            for b in paneBriefs.values where Self.isUnder(b.pid, shell: pane.shellPid) {
                manager?.dismiss(sessionId: b.id, pid: b.pid)
            }
            if let name = pane.link?.name { manager?.terminalEnding("s:" + name) }
            removePaneView(pane.terminal)
            extras.removeAll { $0 === pane }
            pane.end()
        }
        refreshPanes()
        focus(focusTarget(in: activeTab))
    }

    /// Whether process `pid` runs under `shell` (its parent, or a few levels up).
    static func isUnder(_ pid: Int32?, shell: Int32) -> Bool {
        guard var cur = pid, shell > 0 else { return false }
        for _ in 0..<8 {
            if cur == shell { return true }
            guard let parent = Proc.parent(cur), parent > 1 else { return false }
            cur = parent
        }
        return false
    }

    /// End Session on the window's own tab while others are open: its chat or terminal ends and its tab goes; the
    /// window lives on with the other tabs (closed, they keep running as cars).
    /// The strip's "Close this chat" (after "Open in a worktree"): ends only this window's own AI, after asking, naming that AI
    /// and anything else that stops with it. Never the front tab's chat, never other tabs' or panes' (they keep running).
    func closeOpenedChat() {
        let tool = hud.nudge?.tool ?? "The AI"
        let alone = tabs.count == 1 && extras.isEmpty
        let parked = detached.map { manager?.hasParked(of: $0.name) ?? false } ?? false
        var text = "\(tool) in this window stops. The conversation stays saved."
        if alone && parked { text += " Panes closed from this window earlier, still running, stop too." }
        else if !alone { text += " The other tabs and panes keep running." }
        if hud.status == "terminal" || hud.exited { return }
        guard ask("End this chat?", text, "End Chat") else { return }
        hud.nudge = nil
        if alone { endChat(confirm: false) } else { endOwnTab(confirm: false) }
    }

    /// When something was last typed, pasted or dropped into the terminal that shows the session `name` (ms since 1970; 0 when
    /// never, nil when this window doesn't show it): how long a chat has been left alone (Clean Up).
    func lastInputAt(session name: String) -> Double? {
        if detached?.name == name { return terminal.typedAt }
        return extras.first(where: { $0.link?.name == name })?.terminal.typedAt
    }

    /// Why Clean Up can't end this window's chat without ending more than its summary names: ending a window that is alone also
    /// stops the panes it closed earlier (still running) and the iTerm2 chat it was copied from. Nil: nothing else goes with it.
    func cleanupBlocker() -> String? {
        guard tabs.count == 1, extras.isEmpty else { return nil }
        if let detached, manager?.hasParked(of: detached.name) == true { return "Panes it closed are still running in it" }
        if let o = origin, Proc.info(o.claude)?.tty == o.tty, Proc.isClaude(o.claude) { return "It was copied from an iTerm2 chat" }
        return nil
    }

    /// Clean Up (the user agreed on its summary): ends this window's own chat and nothing else, never the front tab's, and
    /// never the other tabs' or panes'. False when there is nothing to end here.
    @discardableResult
    func endOwnChatForCleanup() -> Bool {
        guard !hud.exited, !hud.mirror, hud.status != "terminal", cleanupBlocker() == nil else { return false }
        hud.nudge = nil
        if tabs.count == 1 && extras.isEmpty { endChat(confirm: false) } else { endOwnTab(confirm: false) }
        return true
    }

    private func endOwnTab(confirm: Bool) {
        let shellOnly = hud.status == "terminal"
        if confirm, !ask(shellOnly ? "End this terminal?" : "End this chat?",
                         shellOnly ? "The shell in this tab stops; the other tabs keep running." : "Claude in this tab stops; the other tabs keep running. The conversation stays saved.",
                         shellOnly ? "End Terminal" : "End Chat") { return }
        manager?.dismiss(sessionId: sessionId, pid: hud.brief?.live == true ? hud.brief?.pid : nil)
        manager?.terminalEnding(carId)
        if let detached { Detached.quit(detached.name) }
        // Its tab goes (or its place in a split, which closes up).
        if zoomed { _ = toggleZoom() }
        removePaneView(terminal)
        refreshPanes()
        focus(focusTarget(in: activeTab))
    }

    private func busy(_ panes: [ExtraPane]) -> Bool {
        panes.contains { $0.shellPid > 0 && !Proc.children(of: $0.shellPid).isEmpty }
    }

    private func ask(_ title: String, _ text: String, _ ok: String) -> Bool {
        let a = NSAlert()
        a.messageText = title
        a.informativeText = text
        a.alertStyle = .warning
        a.addButton(withTitle: ok)
        a.addButton(withTitle: "Cancel")
        return a.runModal() == .alertFirstButtonReturn
    }

    /// The window goes after its own chat or terminal ended: its other tabs and panes keep running, as cars.
    func parkPanes() {
        for pane in extras {
            let folder = pane.currentFolder
            guard let name = pane.link?.name else {
                pane.end()
                continue
            }
            pane.detach()
            manager?.closedPane(of: self, session: name, kind: pane.kind, cwd: folder)
        }
        extras.removeAll()
    }

    private var attached = false
    /// Becomes a display of the detached session.
    /// Restored after a restart: takes back its kept scrollback before it attaches (see Detached.saveHistory).
    var takesHistory = false
    /// The terminal's height in rows, as it last reported it.
    private var termRows = 0

    func attachSession() {
        guard let detached, !attached else { return }
        attached = true
        // A pty session is the window's view already: nothing to attach, and its scrollback came with the restart.
        if onPty {
            takesHistory = false
            return
        }
        if takesHistory {
            takesHistory = false
            let history = Detached.takeHistory(detached.name)
            if !history.isEmpty {
                // Then blank rows push it all above the screen, where screen's repaint can't overwrite it.
                terminal.feed(text: history.joined(separator: "\r\n") + String(repeating: "\r\n", count: max(termRows, 60) + 1))
            }
        }
        // A mirror attaches at the size its own app gave the chat; fitSession then fits it to the mirror, the window in use.
        TerminalFactory.attach(terminal, screenName: detached.name, cwd: cwd, fit: isShown && !hud.mirror)
        fitSession()
    }

    /// On quit: this window's scrollback, for the window that attaches to the session next time.
    func saveHistory() {
        guard let detached, attached, !onPty, !hud.mirror, !hud.exited else { return }
        let text = String(decoding: terminal.getBufferAsData(kind: .normal), as: UTF8.self)
        Detached.saveHistory(detached.name, text: text, rows: termRows)
    }

    private var fitWork: DispatchWorkItem?
    /// Fits the session to this window once its size has settled, so Claude draws at the window's size: a mirror's too.
    /// Also when the window comes to the front: with a mirror open, the window in use sets the size, and the other one
    /// takes it back the same way. While two windows show the session, `-X fit` fits it to the one that attached last,
    /// whichever window asks, so the window types the command into its own display instead (screen's command key,
    /// Ctrl-^, then :fit; straight to the session, not as typing). That can show ":fit" on the bottom row for a moment,
    /// so only then.
    func fitSession() {
        // A pty takes its view's size by itself.
        guard let detached, attached, isShown, !onPty else { return }
        fitWork?.cancel()
        let name = detached.name
        let work = DispatchWorkItem { [weak self] in
            if Detached.displays(name) > 1 {
                self?.terminal.process.send(data: ArraySlice("\u{1e}:fit\r".utf8))
            } else {
                Detached.fit(name)
            }
        }
        fitWork = work
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.6, execute: work)
    }

    /// A mirror's window closes; the chat runs on in the app that owns it, and the window's own tabs as cars.
    private func closeMirror() {
        if env?.dirty == true {
            confirmEnv { [weak self] in
                self?.dropEnv()
                self?.closeMirror()
            }
            return
        }
        parkPanes()
        let finish = { [weak self] in
            guard let self else { return }
            self.terminal.terminate()
            self.manager?.removeChat(self.id)
        }
        if !hide(then: finish) { finish() }
    }

    func applyHosted(_ list: [SessionBrief]) {
        paneBriefs = Dictionary(list.map { ($0.id, $0) }, uniquingKeysWith: { a, _ in a })
        list.forEach(switchArrived)
        if tabs.count > 1 { updateTabStats() }
        updatePaneBars()
    }

    /// Each tab's chip shows the AI session running in it: the one in its pane in front, else in any of its panes.
    private func updateTabStats() {
        // A tab's name follows its AI's title: the chips are rebuilt only when a name changed (not mid-drag or mid-edit).
        if draggedTab == nil, !tabBar.isEditing {
            let titles = tabs.indices.map(tabTitle)
            if titles != tabBar.shownTitles { tabBar.show(titles: titles, active: activeTab, reveal: false) }
        }
        // The account's initial on each chip, only when the window's tabs use more than one Claude account.
        let briefs = tabs.indices.map { briefForTab($0) }
        let several = Set(briefs.compactMap { $0.flatMap(acctMark) }.map(\.id)).count > 1
        let favs = manager?.sidebar.favorites ?? []
        let stats: [TabStats?] = briefs.map { brief in
            brief.map { b in
                TabStats(ctx: b.ctx, ctxMax: b.ctxMax, tools: b.tools, web: b.web, errors: b.errors, status: b.status,
                         account: several ? acctMark(b) : nil,
                         starId: b.live ? b.convId ?? b.id : nil, starred: Self.starred(favs, id: b.id, conv: b.convId))
            }
        }
        let height: CGFloat = stats.contains { $0 != nil } ? 36 : 24
        if tabBarHeight.constant != height { tabBarHeight.constant = height }
        tabBar.setStats(stats)
    }

    /// A chat that went on under another account is up again: its new Claude (another process) is live.
    private func switchArrived(_ b: SessionBrief) {
        if b.live, let old = hud.switching[b.id], b.pid != old { hud.switching[b.id] = nil }
    }

    /// A switch began or timed out: the border and the split's footer follow at once (the rest with the engine's next state).
    func acctSwitchShown() {
        border.setStatus(hud.status)
        updatePaneBars()
    }

    func apply(_ brief: SessionBrief?) {
        if let brief {
            switchArrived(brief)
            if hud.brief != brief { hud.brief = brief }
            if brief.tab == id { sessionId = brief.id }
            realTitle = brief.title.isEmpty ? brief.name : brief.title
            nameWindow()
        }
        if hud.terminalDir != nil, brief?.live != true, hud.switching[brief?.id ?? ""] == nil { sessionId = nil }
        border.setStatus(hud.status)
        syncFavorite()
        shipStatusChanged(brief?.status ?? "")
        acctRefresh()
    }

    /// The window's title (Mission Control's, the Window menu's, its first tab's): made up in streamer mode.
    private func nameWindow() {
        let title = hud.streamer ? Streamer.fake("title", realTitle) : realTitle
        if window?.title != title { window?.title = title }
    }

    /// The dashboard's streamer mode: made-up names in the header, the footer, the tabs and the title, frosted glass over
    /// the terminals. The chat itself goes on as it was.
    func setStreamer(_ on: Bool) {
        guard hud.streamer != on else { return }
        hud.streamer = on
        if on { env?.mask() }
        streamVeil.isHidden = !on
        nameWindow()
        if tabs.count > 1 { tabBar.show(titles: tabs.indices.map(tabTitle), active: activeTab); updateTabStats() }
        updatePaneBars()
    }

    func setFont(_ size: CGFloat) { for tv in allTerminals { tv.font = TerminalFont.font(size) } }

    /// The process that is Claude's parent: the shell inside the detached session, or our own shell.
    var shellPid: Int32 {
        if hud.exited { return 0 }
        if let detached { return detached.shellPid ?? 0 }
        return terminal.process.shellPid
    }

    // MARK: dragging a pinned window (TerminalWindow)

    private var repinTimer: Timer?

    /// A header drag over another terminal window: where the window started, the window under the pointer and since when,
    /// and the one that shows its drop mark (after about a third of a second): letting go there merges this window into it.
    private var dragStartFrame: NSRect?
    private weak var mergeHover: ChatWindowController?
    private var mergeHoverSince = Date()
    private weak var mergeCandidate: ChatWindowController?
    /// Over a pane's body: the pane under the pointer and since when; once it has rested ~0.5 s its preview shows (the
    /// spot), and only then does letting go there count.
    private struct SplitSpot {
        weak var win: ChatWindowController?
        weak var pane: ChatTerminalView?
        var edge: NSRectEdge?
    }
    private weak var splitHoverPane: ChatTerminalView?
    private var splitHoverSince = Date()
    private var splitSpot: SplitSpot?
    /// The pointer's last sample (for its speed), where the preview armed, whether ⌥ armed it, and Esc pressed in this drag.
    private var splitLastPoint = NSPoint.zero
    private var splitLastAt = Date()
    private var splitArmPoint = NSPoint.zero
    private var splitByOption = false
    private var mergeCancelled = false
    /// A window is being dragged by its header (letGoForDrag to the mouse-up): the app's Esc monitor cancels its merge then,
    /// and Esc never reaches the terminal.
    static var headerDragActive = false
    private static weak var headerDragger: ChatWindowController?

    /// Esc during a header drag: no merge for the rest of this drag.
    static func cancelHeaderMerge() {
        headerDragger?.mergeCancelled = true
        headerDragger?.clearMergeHover()
    }

    private func letGoForDrag() {
        guard let w = window else { return }
        dragStartFrame = w.frame
        mergeCancelled = false
        Self.headerDragActive = true
        Self.headerDragger = self
        clearMergeHover()
        w.parent?.removeChildWindow(w)
        repinTimer?.invalidate()
        // In .common modes: a drag tracks the mouse, and default-mode timers wait.
        // Stops itself if the controller is gone, or it would fire 20 times a second for good.
        let t = Timer(timeInterval: 0.05, repeats: true) { [weak self] t in
            MainActor.assumeIsolated {
                guard let self else {
                    Self.headerDragActive = false
                    return t.invalidate()
                }
                self.repinAfterDrag()
            }
        }
        RunLoop.main.add(t, forMode: .common)
        repinTimer = t
    }

    /// The button is up: pinned again, unless the press changed that (the pin button, minimize, close).
    private func repinAfterDrag() {
        guard NSEvent.pressedMouseButtons & 1 == 0 else { return trackMergeHover() }
        repinTimer?.invalidate()
        repinTimer = nil
        Self.headerDragActive = false
        // Let go over a pane that showed its preview: this window (or its tab in front) joins it as a split there, or as tabs
        // for the middle.
        if let spot = splitSpot, let win = spot.win, let pane = spot.pane, let w = window, let start = dragStartFrame, win.acceptsTabs,
           w.frame.size == start.size, hypot(w.frame.origin.x - start.origin.x, w.frame.origin.y - start.origin.y) > 8 {
            let edge = spot.edge
            clearMergeHover()
            DispatchQueue.main.async { [weak self, weak win, weak pane] in
                guard let self, let win, let pane else { return }
                if let edge { self.manager?.mergeSplit(self, into: win, beside: pane, edge: edge) } else { self.manager?.merge(self, into: win) }
            }
            return
        }
        // Let go over another window that showed its mark: this window's tabs join it. (Not for a click, which doesn't move it.)
        if let target = mergeCandidate, let w = window, let start = dragStartFrame, target.acceptsTabs, canDissolve,
           w.frame.size == start.size, hypot(w.frame.origin.x - start.origin.x, w.frame.origin.y - start.origin.y) > 8 {
            clearMergeHover()
            DispatchQueue.main.async { [weak self, weak target] in
                guard let self, let target else { return }
                self.manager?.merge(self, into: target)
            }
            return
        }
        clearMergeHover()
        guard let w = window, w.parent == nil, isShown, !hiding, !steppedAside, !w.isMiniaturized, hud.attached,
              let parent = rideableDashboard(for: w) else { return }
        parent.addChildWindow(w, ordered: .above)
    }

    /// While the button is down: the window under the pointer (below this one) that could take this window's tabs (its
    /// header) or a split of them (its panes).
    private func trackMergeHover() {
        if mergeCancelled { return clearMergeHover() }
        guard let w = window, isShown, !hiding, let start = dragStartFrame, w.frame.size == start.size,
              hypot(w.frame.origin.x - start.origin.x, w.frame.origin.y - start.origin.y) > 8 else { return clearMergeHover() }
        let canTabs = canDissolve
        let canSplit = canMoveOutOfWindow(tab: activeTabIndex)
        guard canTabs || canSplit else { return clearMergeHover() }
        let p = NSEvent.mouseLocation
        let target = canTabs ? manager?.tabTarget(atScreen: p, excluding: self) : nil
        if target !== mergeHover {
            clearHeaderHover()
            mergeHover = target
            mergeHoverSince = Date()
        } else if let target, mergeCandidate == nil, Date().timeIntervalSince(mergeHoverSince) > 0.35 {
            mergeCandidate = target
            target.showIncomingTab(slot: nil)
        }
        if target == nil, let hit = manager?.paneTarget(atScreen: p, excluding: self), hit.edge == nil ? canTabs : canSplit {
            let now = Date()
            let dt = max(now.timeIntervalSince(splitLastAt), 0.001)
            // Points travelled per 100 ms since the last tick.
            let speed = hypot(p.x - splitLastPoint.x, p.y - splitLastPoint.y) / dt * 0.1
            splitLastPoint = p
            splitLastAt = now
            func arm() {
                if let old = splitSpot?.win, old !== hit.win { old.hideIncomingTab() }
                splitSpot = SplitSpot(win: hit.win, pane: hit.pane, edge: hit.edge)
                hit.win.showSpot(hit.pane, hit.edge, animated: true)
            }
            if NSEvent.modifierFlags.contains(.shift) {
                // ⇧ held (as VS Code's force-split drag): the preview shows at once and follows the pointer.
                splitByOption = true
                splitHoverPane = hit.pane
                arm()
                return
            }
            if splitByOption { clearSplitHover() }
            if let sp = splitSpot, sp.pane !== hit.pane || hypot(p.x - splitArmPoint.x, p.y - splitArmPoint.y) > 60 {
                // Moved on from where it armed: the preview goes and the pointer must slow down again.
                clearSplitHover()
            }
            if splitSpot != nil {
                arm()
            } else {
                // At rest (within 4 pt per 100 ms) and well inside the pane (not skimming its edge) for 300 ms: the preview shows.
                let deep = hit.win.window.map { $0.convertToScreen(hit.win.paneFrame(hit.pane)).insetBy(dx: 24, dy: 24).contains(p) } ?? false
                if hit.pane !== splitHoverPane || !deep || speed > 4 {
                    splitHoverPane = deep ? hit.pane : nil
                    splitHoverSince = now
                } else if now.timeIntervalSince(splitHoverSince) > 0.3 {
                    splitArmPoint = p
                    arm()
                }
            }
        } else {
            clearSplitHover()
        }
    }

    private func clearHeaderHover() {
        mergeCandidate?.hideIncomingTab()
        mergeCandidate = nil
        mergeHover = nil
    }

    private func clearSplitHover() {
        splitSpot?.win?.hideIncomingTab()
        splitSpot = nil
        splitHoverPane = nil
        splitByOption = false
    }

    private func clearMergeHover() {
        clearHeaderHover()
        clearSplitHover()
    }

    // MARK: NSWindowDelegate

    /// The note's height: none, one line, or two when the window is narrow. Once per change: every height change resizes
    /// the terminal, so it doesn't animate.
    func layoutNudge(_ offer: WorktreeOffer?) {
        let h: CGFloat = offer == nil && hud.acctNote == nil ? 0 : (window?.frame.width ?? 900) < 700 ? 50 : 34
        if nudgeHeight.constant != h {
            nudgeHeight.constant = h
            paneTop.constant = 6 + h
            tabBarTop.constant = 4 + h
        }
    }

    func windowDidResize(_ notification: Notification) {
        layoutNudge(hud.nudge)
        if let w = window, abs(hud.width - w.frame.width) >= 1 { hud.width = w.frame.width }
    }

    // A window pinned above the dashboard is the dashboard's child, and a child minimized on its own left the
    // dashboard black. So it lets go of the dashboard on its way to the Dock and pins again when it comes back.
    func windowWillMiniaturize(_ notification: Notification) {
        // A press on the minimize button (in the header) or ⌘M mid-drag left the repin timer running: it could pin the
        // window again during the Dock animation. windowDidDeminiaturize pins it again.
        repinTimer?.invalidate()
        repinTimer = nil
        Self.headerDragActive = false
        clearMergeHover()
        guard let w = window else { return }
        w.parent?.removeChildWindow(w)
    }

    // The window clicked last comes to the front of the others pinned above the dashboard: AppKit doesn't reorder a
    // parent's child windows on a click.
    func windowDidBecomeKey(_ notification: Notification) {
        focusChanged()
        if let top = hud.wtTop { WorktreeShip.shared.refresh(top, pr: true) }
        manager?.terminalFocused(window: id)
        fitSession()
        // Clicked forward while free since a dashboard minimize: it rides the dashboard again if that moves nothing.
        manager?.rejoinRiders()
        guard let w = window, let parent = w.parent, parent.childWindows?.last != w else { return }
        parent.removeChildWindow(w)
        parent.addChildWindow(w, ordered: .above)
    }

    func windowDidDeminiaturize(_ notification: Notification) {
        guard let w = window else { return }
        // Restored from the Dock on another display than the one it was minimized on: it comes to the user's display and
        // stays free there (its old frame is still on the dashboard's, which would pull it onto that Space).
        _ = (w as? TerminalWindow)?.moveToUsersScreen()
        guard hud.attached, let parent = rideableDashboard(for: w) else { return }
        parent.addChildWindow(w, ordered: .above)
    }

    /// The dashboard was minimized: AppKit takes a parent's child windows into the Dock with it, so the window lets go first
    /// and stays on screen where it is. Returns whether it was riding the dashboard (so restoring can pin it again).
    func detachForDashboardMinimize(_ dash: NSWindow) -> Bool {
        guard let w = window, w.parent === dash else { return false }
        dash.removeChildWindow(w)
        return true
    }

    /// Back from the Dock, the dashboard takes a window that let go of it for that again (MainWindowController.rejoinRiders
    /// says when) by the same rules as everywhere else (shown, not minimized, still free, dashboard on this Space and display),
    /// so one the user minimized, closed or moved to another display meanwhile stays free. True when it pinned.
    @discardableResult
    func repinAfterDashboardRestore() -> Bool {
        guard let w = window, w.parent == nil, isShown, !hiding, !steppedAside, !w.isMiniaturized, hud.attached,
              let parent = rideableDashboard(for: w) else { return false }
        parent.addChildWindow(w, ordered: .above)
        return true
    }

    /// The dashboard show() puts this window on as its child: wherever the window is when the user is on the dashboard (a card
    /// or its menu was clicked, so it is key), else only as rideableDashboard allows. A tab torn off, a merge or ⌘] on the
    /// desktop pulled the window onto a full-screen dashboard's Space elsewhere. Key but off the active Space (swiped to an
    /// empty desktop, the app still in front) isn't "on the dashboard".
    private func showOnDashboard(for w: NSWindow) -> NSWindow? {
        if let parent = manager?.window, parent.isKeyWindow, parent.isVisible, !parent.isMiniaturized, parent.isOnActiveSpace { return parent }
        return rideableDashboard(for: w)
    }

    /// The dashboard this window may ride on as its child right now, or nil to stay free where it is. A child is pulled
    /// to its parent's Space: brought back from the Dock on the main display while the dashboard was full screen on
    /// another one, the window showed for a moment and then slid onto the dashboard's Space. So only while the dashboard
    /// is on the Space the user is looking at and, when it's full screen, on this window's display. A card opened from
    /// the dashboard (show) still brings the window to it.
    private func rideableDashboard(for w: NSWindow) -> NSWindow? {
        guard let parent = manager?.window, parent.isVisible, !parent.isMiniaturized, parent.isOnActiveSpace else { return nil }
        // Each display's current Space counts as active: only on the dashboard's own display.
        guard w.screen == parent.screen else { return nil }
        return parent
    }

    func windowShouldClose(_ sender: NSWindow) -> Bool {
        if hud.mirror {
            closeMirror()
        } else if hud.exited {
            if env?.dirty == true {
                confirmEnv { [weak self] in
                    self?.dropEnv()
                    self?.window?.performClose(nil)
                }
                return false
            }
            // Its other tabs, still running, become cars instead of ending with it.
            parkPanes()
            hide { [weak self] in
                guard let self else { return }
                self.manager?.removeChat(self.id)
            }
        } else {
            // Closing only hides: a chat comes back from its dashboard card, a terminal from its flying car on the
            // orbit, the last one closed with ⇧⌘T. Ending is the power button (End).
            if hide() { manager?.closed(id) }
        }
        return false
    }

    // MARK: LocalProcessTerminalViewDelegate

    func sizeChanged(source: LocalProcessTerminalView, newCols: Int, newRows: Int) {
        termRows = newRows
        fitSession()
    }
    func setTerminalTitle(source: LocalProcessTerminalView, title: String) {}
    func hostCurrentDirectoryUpdate(source: TerminalView, directory: String?) {}

    func processTerminated(source: TerminalView, exitCode: Int32?) {
        // The app is quitting or restarting: the views are being torn down, and what a screen relay's exit would do here
        // (remove the chat, end its panes) is no news to act on.
        guard !Sessions.stopping else { return }
        hud.exited = true
        border.setStatus("ended")
        terminal.feed(text: "\r\n\u{1b}[2m[chat ended · close this window to remove it]\u{1b}[0m\r\n")
        manager?.chatProcessEnded(id)
        // Env changes not saved: the window comes forward and asks (Save, Don't Save, Cancel); then it goes as any ended
        // chat's does (removeChat ends its panes). Cancel keeps it, and closing it asks again.
        if !isShown {
            if env?.dirty == true {
                confirmEnv { [weak self] in
                    guard let self else { return }
                    self.dropEnv()
                    self.manager?.removeChat(self.id)
                }
            } else {
                manager?.removeChat(id)
            }
        }
    }
}

// MARK: - the second-AI note (SPEC §19.5)

/// "Codex is already working in orbiterm-frontend. Both could change the same files." with Open in a worktree and Not now (after opening: Opened in the … worktree + Close this chat).
struct WorktreeNudgeBar: View {
    @ObservedObject var hud: ChatHUD
    @ObservedObject var theme = ThemeStore.shared
    let onMove: () -> Void
    let onClose: () -> Void
    let onDismiss: () -> Void
    let onNotNow: () -> Void
    @State private var hoverMove = false
    @State private var hoverNot = false
    @State private var shown = false

    var body: some View {
        if let n = hud.acctNote {
            AccountNoteBar(note: n, act: { hud.onAcct?($0) })
        } else if let o = hud.nudge {
            GeometryReader { geo in
                HStack(spacing: 8) {
                    Image(systemName: "arrow.triangle.branch").font(.system(size: 12)).foregroundColor(Theme.cAccentSoft)
                    // Under 420 pt the second sentence is left out (VoiceOver still reads both).
                    let done = o.openedIn != nil
                    let main = done ? "Opened in the \(o.openedIn ?? "") worktree." : o.line.main
                    let rest = done ? "This chat is still running." : o.line.rest
                    (Text(main).fontWeight(.semibold).foregroundColor(Theme.cHi)
                        + Text(geo.size.width < 420 ? "" : " " + rest).foregroundColor(theme.swiftUI("--txt2")))
                        .font(.system(size: 12))
                        .lineSpacing(2)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .accessibilityLabel(main + " " + rest)
                    Button(action: done ? onClose : onMove) {
                        Text(done ? "Close this chat" : "Open in a worktree")
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundColor(hoverMove ? Theme.cHi : Theme.cAccentSoft)
                            .padding(.horizontal, 10)
                            .frame(height: 24)
                            .background(RoundedRectangle(cornerRadius: 6).fill(Theme.cAccent.opacity(hoverMove ? 0.14 : 0)))
                            .overlay(RoundedRectangle(cornerRadius: 6).stroke(Theme.cAccent, lineWidth: 1))
                            .contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)
                    .onHover { hoverMove = $0 }
                    .help(done ? "Ends this chat, after the usual question. The new one in the worktree keeps going."
                          : "Start a chat in its own copy of the repo, on a branch of its own. This one keeps running.")
                    Button(action: done ? onDismiss : onNotNow) {
                        Text(done ? "Dismiss" : "Not now").font(.system(size: 12)).foregroundColor(hoverNot ? Theme.cHi : theme.swiftUI("--txt3"))
                            .padding(.horizontal, 6).frame(height: 24).contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)
                    .onHover { hoverNot = $0 }
                    .help(done ? "Hide this note. Nothing is closed." : "Hide this. Not again for \(o.folder) for a day.")
                }
                .padding(.horizontal, 12)
                .frame(maxHeight: .infinity)
                .background(Theme.cAccent.opacity(0.08))
                .overlay(alignment: .top) { Rectangle().fill(Theme.cAccent.opacity(0.18)).frame(height: 1) }
                .overlay(alignment: .bottom) { Rectangle().fill(Theme.cAccent.opacity(0.35)).frame(height: 1) }
            }
            .accessibilityElement(children: .contain)
            .opacity(shown ? 1 : 0)
            .onAppear {
                // 150 ms ease-out in; instantly with Reduce Motion.
                if NSWorkspace.shared.accessibilityDisplayShouldReduceMotion { shown = true } else { withAnimation(.easeOut(duration: 0.15)) { shown = true } }
            }
        }
    }
}
