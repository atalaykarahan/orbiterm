(()=>{var Jn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},gs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ff=0,uu=1,Bf=2;var Ko=1,zf=2,Lr=3,_s=0,Rn=1,Be=2,jn=0,Dr=1,Ne=2,du=3,fu=4,Hf=5;var Hs=100,kf=101,Vf=102,Gf=103,Wf=104,Xf=200,qf=201,Yf=202,Zf=203,pu=204,mu=205,$f=206,Kf=207,Jf=208,jf=209,Qf=210,tp=211,ep=212,np=213,ip=214,ml=0,gl=1,_l=2,xr=3,xl=4,yl=5,vl=6,Ml=7,gu=0,sp=1,rp=2,_i=0,Jo=1,jo=2,Qo=3,ta=4,ea=5,na=6,ks=7;var _u=300,xs=301,Vs=302,Zl=303,$l=304,ia=306,Sl=1e3,Ci=1001,bl=1002,sn=1003,op=1004;var sa=1005;var hn=1006,Kl=1007;var ys=1008;var Dn=1009,xu=1010,yu=1011,Nr=1012,Jl=1013,xi=1014,Qn=1015,dn=1016,jl=1017,Ql=1018,Ur=1020,vu=35902,Mu=35899,Su=1021,bu=1022,ti=1023,Pi=1026,vs=1027,tc=1028,ec=1029,Ms=1030,nc=1031;var ic=1033,ra=33776,oa=33777,aa=33778,la=33779,sc=35840,rc=35841,oc=35842,ac=35843,lc=36196,cc=37492,hc=37496,uc=37488,dc=37489,ca=37490,fc=37491,pc=37808,mc=37809,gc=37810,_c=37811,xc=37812,yc=37813,vc=37814,Mc=37815,Sc=37816,bc=37817,Ec=37818,Tc=37819,wc=37820,Ac=37821,Rc=36492,Cc=36494,Pc=36495,Ic=36283,Lc=36284,ha=36285,Dc=36286;var Eo=2300,El=2301,fl=2302,eu=2303,nu=2400,iu=2401,su=2402;var ap=3200;var Nc=0,lp=1,Yi="",Ie="srgb",To="srgb-linear",wo="linear",le="srgb";var pl=7680;var cp=519,hp=512,up=513,dp=514,Uc=515,fp=516,pp=517,Oc=518,mp=519,Eu=35044,Ss=35048;var Tu="300 es",pi=2e3,yr=2001;function Mg(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Sg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Ao(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function gp(){let i=Ao("canvas");return i.style.display="block",i}var nf={},vr=null;function Ro(...i){let t="THREE."+i.shift();vr?vr("log",t,...i):console.log(t,...i)}function _p(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Lt(...i){i=_p(i);let t="THREE."+i.shift();if(vr)vr("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Ot(...i){i=_p(i);let t="THREE."+i.shift();if(vr)vr("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Ns(...i){let t=i.join(" ");t in nf||(nf[t]=!0,Lt(...i))}function xp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var yp={[ml]:gl,[_l]:vl,[xl]:Ml,[xr]:yl,[gl]:ml,[vl]:_l,[Ml]:xl,[yl]:xr},mi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],sf=1234567,gr=Math.PI/180,Mr=180/Math.PI;function Gi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(gn[i&255]+gn[i>>8&255]+gn[i>>16&255]+gn[i>>24&255]+"-"+gn[t&255]+gn[t>>8&255]+"-"+gn[t>>16&15|64]+gn[t>>24&255]+"-"+gn[e&63|128]+gn[e>>8&255]+"-"+gn[e>>16&255]+gn[e>>24&255]+gn[n&255]+gn[n>>8&255]+gn[n>>16&255]+gn[n>>24&255]).toLowerCase()}function Xt(i,t,e){return Math.max(t,Math.min(e,i))}function wu(i,t){return(i%t+t)%t}function bg(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Eg(i,t,e){return i!==t?(e-i)/(t-i):0}function bo(i,t,e){return(1-e)*i+e*t}function Tg(i,t,e,n){return bo(i,t,1-Math.exp(-e*n))}function wg(i,t=1){return t-Math.abs(wu(i,t*2)-t)}function Ag(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Rg(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Cg(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Pg(i,t){return i+Math.random()*(t-i)}function Ig(i){return i*(.5-Math.random())}function Lg(i){i!==void 0&&(sf=i);let t=sf+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Dg(i){return i*gr}function Ng(i){return i*Mr}function Ug(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Og(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Fg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Bg(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*d,l*u,a*c);break;case"YZY":i.set(l*u,a*h,l*d,a*c);break;case"ZXZ":i.set(l*d,l*u,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*h,a*c);break;default:Lt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function fi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function _e(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Or={DEG2RAD:gr,RAD2DEG:Mr,generateUUID:Gi,clamp:Xt,euclideanModulo:wu,mapLinear:bg,inverseLerp:Eg,lerp:bo,damp:Tg,pingpong:wg,smoothstep:Ag,smootherstep:Rg,randInt:Cg,randFloat:Pg,randFloatSpread:Ig,seededRandom:Lg,degToRad:Dg,radToDeg:Ng,isPowerOfTwo:Ug,ceilPowerOfTwo:Og,floorPowerOfTwo:Fg,setQuaternionFromProperEuler:Bg,normalize:_e,denormalize:fi},Iu=class Iu{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Iu.prototype.isVector2=!0;var lt=Iu,He=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(d!==v||l!==u||c!==f||h!==g){let m=l*u+c*f+h*g+d*v;m<0&&(u=-u,f=-f,g=-g,v=-v,m=-m);let p=1-a;if(m<.9995){let M=Math.acos(m),I=Math.sin(M);p=Math.sin(p*M)/I,a=Math.sin(a*M)/I,l=l*p+u*a,c=c*p+f*a,h=h*p+g*a,d=d*p+v*a}else{l=l*p+u*a,c=c*p+f*a,h=h*p+g*a,d=d*p+v*a;let M=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=M,c*=M,h*=M,d*=M}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-a*f,t[e+2]=c*g+h*f+a*u-l*d,t[e+3]=h*g-a*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),d=a(r/2),u=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:Lt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Lu=class Lu{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(rf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(rf.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ih.copy(this).projectOnVector(t),this.sub(Ih)}reflect(t){return this.sub(Ih.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Lu.prototype.isVector3=!0;var C=Lu,Ih=new C,rf=new He,Du=class Du{constructor(t,e,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],M=s[1],I=s[4],x=s[7],b=s[2],E=s[5],R=s[8];return r[0]=o*v+a*M+l*b,r[3]=o*m+a*I+l*E,r[6]=o*p+a*x+l*R,r[1]=c*v+h*M+d*b,r[4]=c*m+h*I+d*E,r[7]=c*p+h*x+d*R,r[2]=u*v+f*M+g*b,r[5]=u*m+f*I+g*E,r[8]=u*p+f*x+g*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,g=e*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return t[0]=d*v,t[1]=(s*c-h*n)*v,t[2]=(a*n-s*o)*v,t[3]=u*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-a*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return Ns("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Lh.makeScale(t,e)),this}rotate(t){return Ns("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Lh.makeRotation(-t)),this}translate(t,e){return Ns("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Lh.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Du.prototype.isMatrix3=!0;var Ht=Du,Lh=new Ht,of=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),af=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function zg(){let i={enabled:!0,workingColorSpace:To,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===le&&(s.r=Wi(s.r),s.g=Wi(s.g),s.b=Wi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===le&&(s.r=_r(s.r),s.g=_r(s.g),s.b=_r(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Yi?wo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ns("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ns("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[To]:{primaries:t,whitePoint:n,transfer:wo,toXYZ:of,fromXYZ:af,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:t,whitePoint:n,transfer:le,toXYZ:of,fromXYZ:af,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}}),i}var $t=zg();function Wi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function _r(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var js,Tl=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{js===void 0&&(js=Ao("canvas")),js.width=t.width,js.height=t.height;let s=js.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=js}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ao("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Wi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Wi(e[n]/255)*255):e[n]=Wi(e[n]);return{data:e,width:t.width,height:t.height}}else return Lt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Hg=0,Sr=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Hg++}),this.uuid=Gi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Dh(s[o].image)):r.push(Dh(s[o]))}else r=Dh(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Dh(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Tl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Lt("Texture: Unable to serialize Texture."),{})}var kg=0,Nh=new C,An=class i extends mi{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Ci,s=Ci,r=hn,o=ys,a=ti,l=Dn,c=i.DEFAULT_ANISOTROPY,h=Yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:kg++}),this.uuid=Gi(),this.name="",this.source=new Sr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new lt(0,0),this.repeat=new lt(1,1),this.center=new lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Nh).x}get height(){return this.source.getSize(Nh).y}get depth(){return this.source.getSize(Nh).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Lt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Lt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==_u)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Sl:t.x=t.x-Math.floor(t.x);break;case Ci:t.x=t.x<0?0:1;break;case bl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Sl:t.y=t.y-Math.floor(t.y);break;case Ci:t.y=t.y<0?0:1;break;case bl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};An.DEFAULT_IMAGE=null;An.DEFAULT_MAPPING=_u;An.DEFAULT_ANISOTROPY=1;var Nu=class Nu{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let I=(c+1)/2,x=(f+1)/2,b=(p+1)/2,E=(h+u)/4,R=(d+v)/4,_=(g+m)/4;return I>x&&I>b?I<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(I),s=E/n,r=R/n):x>b?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=E/s,r=_/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=R/r,s=_/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-v)/M,this.z=(u-h)/M,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this.w=Xt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this.w=Xt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Nu.prototype.isVector4=!0;var Le=Nu,wl=class extends mi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Le(0,0,t,e),this.scissorTest=!1,this.viewport=new Le(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new An(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:hn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Sr(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},qe=class extends wl{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Co=class extends An{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Al=class extends An{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Yl=class Yl{constructor(t,e,n,s,r,o,a,l,c,h,d,u,f,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,d,u,f,g,v,m)}set(t,e,n,s,r,o,a,l,c,h,d,u,f,g,v,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Yl().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Qs.setFromMatrixColumn(t,0).length(),r=1/Qs.setFromMatrixColumn(t,1).length(),o=1/Qs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=o*h,f=o*d,g=a*h,v=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-v*c,e[9]=-a*l,e[2]=v-u*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,g=c*h,v=c*d;e[0]=u+v*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=v+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,g=c*h,v=c*d;e[0]=u-v*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=v-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*h,f=o*d,g=a*h,v=a*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+v,e[1]=l*d,e[5]=v*c+u,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,f=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=v-u*d,e[8]=g*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-v*d}else if(t.order==="XZY"){let u=o*l,f=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+v,e[5]=o*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*h,e[10]=v*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Vg,t,Gg)}lookAt(t,e,n){let s=this.elements;return Bn.subVectors(t,e),Bn.lengthSq()===0&&(Bn.z=1),Bn.normalize(),is.crossVectors(n,Bn),is.lengthSq()===0&&(Math.abs(n.z)===1?Bn.x+=1e-4:Bn.z+=1e-4,Bn.normalize(),is.crossVectors(n,Bn)),is.normalize(),Fa.crossVectors(Bn,is),s[0]=is.x,s[4]=Fa.x,s[8]=Bn.x,s[1]=is.y,s[5]=Fa.y,s[9]=Bn.y,s[2]=is.z,s[6]=Fa.z,s[10]=Bn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],M=n[3],I=n[7],x=n[11],b=n[15],E=s[0],R=s[4],_=s[8],T=s[12],A=s[1],w=s[5],P=s[9],D=s[13],L=s[2],U=s[6],z=s[10],V=s[14],X=s[3],H=s[7],Y=s[11],$=s[15];return r[0]=o*E+a*A+l*L+c*X,r[4]=o*R+a*w+l*U+c*H,r[8]=o*_+a*P+l*z+c*Y,r[12]=o*T+a*D+l*V+c*$,r[1]=h*E+d*A+u*L+f*X,r[5]=h*R+d*w+u*U+f*H,r[9]=h*_+d*P+u*z+f*Y,r[13]=h*T+d*D+u*V+f*$,r[2]=g*E+v*A+m*L+p*X,r[6]=g*R+v*w+m*U+p*H,r[10]=g*_+v*P+m*z+p*Y,r[14]=g*T+v*D+m*V+p*$,r[3]=M*E+I*A+x*L+b*X,r[7]=M*R+I*w+x*U+b*H,r[11]=M*_+I*P+x*z+b*Y,r[15]=M*T+I*D+x*V+b*$,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15],M=l*f-c*u,I=a*f-c*d,x=a*u-l*d,b=o*f-c*h,E=o*u-l*h,R=o*d-a*h;return e*(v*M-m*I+p*x)-n*(g*M-m*b+p*E)+s*(g*I-v*b+p*R)-r*(g*x-v*E+m*R)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],M=e*a-n*o,I=e*l-s*o,x=e*c-r*o,b=n*l-s*a,E=n*c-r*a,R=s*c-r*l,_=h*v-d*g,T=h*m-u*g,A=h*p-f*g,w=d*m-u*v,P=d*p-f*v,D=u*p-f*m,L=M*D-I*P+x*w+b*A-E*T+R*_;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/L;return t[0]=(a*D-l*P+c*w)*U,t[1]=(s*P-n*D-r*w)*U,t[2]=(v*R-m*E+p*b)*U,t[3]=(u*E-d*R-f*b)*U,t[4]=(l*A-o*D-c*T)*U,t[5]=(e*D-s*A+r*T)*U,t[6]=(m*x-g*R-p*I)*U,t[7]=(h*R-u*x+f*I)*U,t[8]=(o*P-a*A+c*_)*U,t[9]=(n*A-e*P-r*_)*U,t[10]=(g*E-v*x+p*M)*U,t[11]=(d*x-h*E-f*M)*U,t[12]=(a*T-o*w-l*_)*U,t[13]=(e*w-n*T+s*_)*U,t[14]=(v*I-g*b-m*M)*U,t[15]=(h*b-d*I+u*M)*U,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,g=r*d,v=o*h,m=o*d,p=a*d,M=l*c,I=l*h,x=l*d,b=n.x,E=n.y,R=n.z;return s[0]=(1-(v+p))*b,s[1]=(f+x)*b,s[2]=(g-I)*b,s[3]=0,s[4]=(f-x)*E,s[5]=(1-(u+p))*E,s[6]=(m+M)*E,s[7]=0,s[8]=(g+I)*R,s[9]=(m-M)*R,s[10]=(1-(u+v))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Qs.set(s[0],s[1],s[2]).length(),a=Qs.set(s[4],s[5],s[6]).length(),l=Qs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),hi.copy(this);let c=1/o,h=1/a,d=1/l;return hi.elements[0]*=c,hi.elements[1]*=c,hi.elements[2]*=c,hi.elements[4]*=h,hi.elements[5]*=h,hi.elements[6]*=h,hi.elements[8]*=d,hi.elements[9]*=d,hi.elements[10]*=d,e.setFromRotationMatrix(hi),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,s,r,o,a=pi,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s),g,v;if(l)g=r/(o-r),v=o*r/(o-r);else if(a===pi)g=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===yr)g=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=pi,l=!1){let c=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),f=-(n+s)/(n-s),g,v;if(l)g=1/(o-r),v=o/(o-r);else if(a===pi)g=-2/(o-r),v=-(o+r)/(o-r);else if(a===yr)g=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Yl.prototype.isMatrix4=!0;var Kt=Yl,Qs=new C,hi=new Kt,Vg=new C(0,0,0),Gg=new C(1,1,1),is=new C,Fa=new C,Bn=new C,lf=new Kt,cf=new He,Xi=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Lt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return lf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(lf,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return cf.setFromEuler(this),this.setFromQuaternion(cf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Xi.DEFAULT_ORDER="XYZ";var br=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Wg=0,hf=new C,tr=new He,Bi=new Kt,Ba=new C,fo=new C,Xg=new C,qg=new He,uf=new C(1,0,0),df=new C(0,1,0),ff=new C(0,0,1),pf={type:"added"},Yg={type:"removed"},er={type:"childadded",child:null},Uh={type:"childremoved",child:null},Ye=class i extends mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wg++}),this.uuid=Gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new C,e=new Xi,n=new He,s=new C(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Kt},normalMatrix:{value:new Ht}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new br,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return tr.setFromAxisAngle(t,e),this.quaternion.multiply(tr),this}rotateOnWorldAxis(t,e){return tr.setFromAxisAngle(t,e),this.quaternion.premultiply(tr),this}rotateX(t){return this.rotateOnAxis(uf,t)}rotateY(t){return this.rotateOnAxis(df,t)}rotateZ(t){return this.rotateOnAxis(ff,t)}translateOnAxis(t,e){return hf.copy(t).applyQuaternion(this.quaternion),this.position.add(hf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(uf,t)}translateY(t){return this.translateOnAxis(df,t)}translateZ(t){return this.translateOnAxis(ff,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Bi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ba.copy(t):Ba.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),fo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bi.lookAt(fo,Ba,this.up):Bi.lookAt(Ba,fo,this.up),this.quaternion.setFromRotationMatrix(Bi),s&&(Bi.extractRotation(s.matrixWorld),tr.setFromRotationMatrix(Bi),this.quaternion.premultiply(tr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Ot("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(pf),er.child=t,this.dispatchEvent(er),er.child=null):Ot("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Yg),Uh.child=t,this.dispatchEvent(Uh),Uh.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Bi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Bi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Bi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(pf),er.child=t,this.dispatchEvent(er),er.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fo,t,Xg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fo,qg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ye.DEFAULT_UP=new C(0,1,0);Ye.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Re=class extends Ye{constructor(){super(),this.isGroup=!0,this.type="Group"}},Zg={type:"move"},Er=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Re,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Re,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Re,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let v of t.hand.values()){let m=e.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Zg)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Re;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},vp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ss={h:0,s:0,l:0},za={h:0,s:0,l:0};function Oh(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var mt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=$t.workingColorSpace){return this.r=t,this.g=e,this.b=n,$t.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=$t.workingColorSpace){if(t=wu(t,1),e=Xt(e,0,1),n=Xt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Oh(o,r,t+1/3),this.g=Oh(o,r,t),this.b=Oh(o,r,t-1/3)}return $t.colorSpaceToWorking(this,s),this}setStyle(t,e=Ie){function n(r){r!==void 0&&parseFloat(r)<1&&Lt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Lt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Lt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ie){let n=vp[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Lt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Wi(t.r),this.g=Wi(t.g),this.b=Wi(t.b),this}copyLinearToSRGB(t){return this.r=_r(t.r),this.g=_r(t.g),this.b=_r(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ie){return $t.workingToColorSpace(_n.copy(this),t),Math.round(Xt(_n.r*255,0,255))*65536+Math.round(Xt(_n.g*255,0,255))*256+Math.round(Xt(_n.b*255,0,255))}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.workingToColorSpace(_n.copy(this),e);let n=_n.r,s=_n.g,r=_n.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=$t.workingColorSpace){return $t.workingToColorSpace(_n.copy(this),e),t.r=_n.r,t.g=_n.g,t.b=_n.b,t}getStyle(t=Ie){$t.workingToColorSpace(_n.copy(this),t);let e=_n.r,n=_n.g,s=_n.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ss),this.setHSL(ss.h+t,ss.s+e,ss.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ss),t.getHSL(za);let n=bo(ss.h,za.h,e),s=bo(ss.s,za.s,e),r=bo(ss.l,za.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},_n=new mt;mt.NAMES=vp;var Us=class extends Ye{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xi,this.environmentIntensity=1,this.environmentRotation=new Xi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},ui=new C,zi=new C,Fh=new C,Hi=new C,nr=new C,ir=new C,mf=new C,Bh=new C,zh=new C,Hh=new C,kh=new Le,Vh=new Le,Gh=new Le,Ri=class i{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),ui.subVectors(t,e),s.cross(ui);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){ui.subVectors(s,e),zi.subVectors(n,e),Fh.subVectors(t,e);let o=ui.dot(ui),a=ui.dot(zi),l=ui.dot(Fh),c=zi.dot(zi),h=zi.dot(Fh),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Hi)===null?!1:Hi.x>=0&&Hi.y>=0&&Hi.x+Hi.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Hi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Hi.x),l.addScaledVector(o,Hi.y),l.addScaledVector(a,Hi.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return kh.setScalar(0),Vh.setScalar(0),Gh.setScalar(0),kh.fromBufferAttribute(t,e),Vh.fromBufferAttribute(t,n),Gh.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(kh,r.x),o.addScaledVector(Vh,r.y),o.addScaledVector(Gh,r.z),o}static isFrontFacing(t,e,n,s){return ui.subVectors(n,e),zi.subVectors(t,e),ui.cross(zi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ui.subVectors(this.c,this.b),zi.subVectors(this.a,this.b),ui.cross(zi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;nr.subVectors(s,n),ir.subVectors(r,n),Bh.subVectors(t,n);let l=nr.dot(Bh),c=ir.dot(Bh);if(l<=0&&c<=0)return e.copy(n);zh.subVectors(t,s);let h=nr.dot(zh),d=ir.dot(zh);if(h>=0&&d<=h)return e.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(nr,o);Hh.subVectors(t,r);let f=nr.dot(Hh),g=ir.dot(Hh);if(g>=0&&f<=g)return e.copy(r);let v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(ir,a);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return mf.subVectors(r,s),a=(d-h)/(d-h+(f-g)),e.copy(s).addScaledVector(mf,a);let p=1/(m+v+u);return o=v*p,a=u*p,e.copy(n).addScaledVector(nr,o).addScaledVector(ir,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Ii=class{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(di.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(di.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=di.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,di):di.fromBufferAttribute(r,o),di.applyMatrix4(t.matrixWorld),this.expandByPoint(di);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ha.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ha.copy(n.boundingBox)),Ha.applyMatrix4(t.matrixWorld),this.union(Ha)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,di),di.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(po),ka.subVectors(this.max,po),sr.subVectors(t.a,po),rr.subVectors(t.b,po),or.subVectors(t.c,po),rs.subVectors(rr,sr),os.subVectors(or,rr),Ps.subVectors(sr,or);let e=[0,-rs.z,rs.y,0,-os.z,os.y,0,-Ps.z,Ps.y,rs.z,0,-rs.x,os.z,0,-os.x,Ps.z,0,-Ps.x,-rs.y,rs.x,0,-os.y,os.x,0,-Ps.y,Ps.x,0];return!Wh(e,sr,rr,or,ka)||(e=[1,0,0,0,1,0,0,0,1],!Wh(e,sr,rr,or,ka))?!1:(Va.crossVectors(rs,os),e=[Va.x,Va.y,Va.z],Wh(e,sr,rr,or,ka))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,di).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(di).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ki),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},ki=[new C,new C,new C,new C,new C,new C,new C,new C],di=new C,Ha=new Ii,sr=new C,rr=new C,or=new C,rs=new C,os=new C,Ps=new C,po=new C,ka=new C,Va=new C,Is=new C;function Wh(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Is.fromArray(i,r);let a=s.x*Math.abs(Is.x)+s.y*Math.abs(Is.y)+s.z*Math.abs(Is.z),l=t.dot(Is),c=e.dot(Is),h=n.dot(Is);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Xe=new C,Ga=new lt,$g=0,ue=class extends mi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$g++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Eu,this.updateRanges=[],this.gpuType=Qn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ga.fromBufferAttribute(this,e),Ga.applyMatrix3(t),this.setXY(e,Ga.x,Ga.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix3(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix4(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyNormalMatrix(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.transformDirection(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=fi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=_e(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=fi(e,this.array)),e}setX(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=fi(e,this.array)),e}setY(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=fi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=fi(e,this.array)),e}setW(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array),s=_e(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array),s=_e(s,this.array),r=_e(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Po=class extends ue{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Io=class extends ue{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var zt=class extends ue{constructor(t,e,n){super(new Float32Array(t),e,n)}},Kg=new Ii,mo=new C,Xh=new C,Li=class{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Kg.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;mo.subVectors(t,this.center);let e=mo.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(mo,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Xh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(mo.copy(t.center).add(Xh)),this.expandByPoint(mo.copy(t.center).sub(Xh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Jg=0,Zn=new Kt,qh=new Ye,ar=new C,zn=new Ii,go=new Ii,nn=new C,te=class i extends mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jg++}),this.uuid=Gi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Mg(t)?Io:Po)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ht().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Zn.makeRotationFromQuaternion(t),this.applyMatrix4(Zn),this}rotateX(t){return Zn.makeRotationX(t),this.applyMatrix4(Zn),this}rotateY(t){return Zn.makeRotationY(t),this.applyMatrix4(Zn),this}rotateZ(t){return Zn.makeRotationZ(t),this.applyMatrix4(Zn),this}translate(t,e,n){return Zn.makeTranslation(t,e,n),this.applyMatrix4(Zn),this}scale(t,e,n){return Zn.makeScale(t,e,n),this.applyMatrix4(Zn),this}lookAt(t){return qh.lookAt(t),qh.updateMatrix(),this.applyMatrix4(qh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ar).negate(),this.translate(ar.x,ar.y,ar.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new zt(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Lt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ii);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];zn.setFromBufferAttribute(r),this.morphTargetsRelative?(nn.addVectors(this.boundingBox.min,zn.min),this.boundingBox.expandByPoint(nn),nn.addVectors(this.boundingBox.max,zn.max),this.boundingBox.expandByPoint(nn)):(this.boundingBox.expandByPoint(zn.min),this.boundingBox.expandByPoint(zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ot('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Li);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){let n=this.boundingSphere.center;if(zn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];go.setFromBufferAttribute(a),this.morphTargetsRelative?(nn.addVectors(zn.min,go.min),zn.expandByPoint(nn),nn.addVectors(zn.max,go.max),zn.expandByPoint(nn)):(zn.expandByPoint(go.min),zn.expandByPoint(go.max))}zn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)nn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(nn));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)nn.fromBufferAttribute(a,c),l&&(ar.fromBufferAttribute(t,c),nn.add(ar)),s=Math.max(s,n.distanceToSquared(nn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ot('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Ot("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new ue(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let _=0;_<n.count;_++)a[_]=new C,l[_]=new C;let c=new C,h=new C,d=new C,u=new lt,f=new lt,g=new lt,v=new C,m=new C;function p(_,T,A){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,T),d.fromBufferAttribute(n,A),u.fromBufferAttribute(r,_),f.fromBufferAttribute(r,T),g.fromBufferAttribute(r,A),h.sub(c),d.sub(c),f.sub(u),g.sub(u);let w=1/(f.x*g.y-g.x*f.y);isFinite(w)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(w),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(w),a[_].add(v),a[T].add(v),a[A].add(v),l[_].add(m),l[T].add(m),l[A].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let _=0,T=M.length;_<T;++_){let A=M[_],w=A.start,P=A.count;for(let D=w,L=w+P;D<L;D+=3)p(t.getX(D+0),t.getX(D+1),t.getX(D+2))}let I=new C,x=new C,b=new C,E=new C;function R(_){b.fromBufferAttribute(s,_),E.copy(b);let T=a[_];I.copy(T),I.sub(b.multiplyScalar(b.dot(T))).normalize(),x.crossVectors(E,T);let w=x.dot(l[_])<0?-1:1;o.setXYZW(_,I.x,I.y,I.z,w)}for(let _=0,T=M.length;_<T;++_){let A=M[_],w=A.start,P=A.count;for(let D=w,L=w+P;D<L;D+=3)R(t.getX(D+0)),R(t.getX(D+1)),R(t.getX(D+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new ue(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new C,r=new C,o=new C,a=new C,l=new C,c=new C,h=new C,d=new C;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),v=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)nn.fromBufferAttribute(t,e),nn.normalize(),t.setXYZ(e,nn.x,nn.y,nn.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new ue(u,h,d)}if(this.index===null)return Lt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Lo=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Eu,this.updateRanges=[],this.version=0,this.uuid=Gi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}},Tn=new C,Tr=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Tn.fromBufferAttribute(this,e),Tn.applyMatrix4(t),this.setXYZ(e,Tn.x,Tn.y,Tn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Tn.fromBufferAttribute(this,e),Tn.applyNormalMatrix(t),this.setXYZ(e,Tn.x,Tn.y,Tn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Tn.fromBufferAttribute(this,e),Tn.transformDirection(t),this.setXYZ(e,Tn.x,Tn.y,Tn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=fi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=_e(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=fi(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=fi(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=fi(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=fi(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array),s=_e(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array),s=_e(s,this.array),r=_e(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Ro("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new ue(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Ro("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Yh=new C,jg=new C,Qg=new Ht,wn=class{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Yh.subVectors(n,e).cross(jg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Yh),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Qg.getNormalMatrix(t),s=this.coplanarPoint(Yh).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},t0=0,gi=class extends mi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:t0++}),this.uuid=Gi(),this.name="",this.type="Material",this.blending=Dr,this.side=_s,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pu,this.blendDst=mu,this.blendEquation=Hs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new mt(0,0,0),this.blendAlpha=0,this.depthFunc=xr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pl,this.stencilZFail=pl,this.stencilZPass=pl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Lt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Lt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new mt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new wn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new lt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new lt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},un=class extends gi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new mt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},lr,_o=new C,cr=new C,hr=new C,ur=new lt,xo=new lt,Mp=new Kt,Wa=new C,yo=new C,Xa=new C,gf=new lt,Zh=new lt,_f=new lt,xn=class extends Ye{constructor(t=new un){if(super(),this.isSprite=!0,this.type="Sprite",lr===void 0){lr=new te;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Lo(e,5);lr.setIndex([0,1,2,0,2,3]),lr.setAttribute("position",new Tr(n,3,0,!1)),lr.setAttribute("uv",new Tr(n,2,3,!1))}this.geometry=lr,this.material=t,this.center=new lt(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&Ot('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),cr.setFromMatrixScale(this.matrixWorld),Mp.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),hr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&cr.multiplyScalar(-hr.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;qa(Wa.set(-.5,-.5,0),hr,o,cr,s,r),qa(yo.set(.5,-.5,0),hr,o,cr,s,r),qa(Xa.set(.5,.5,0),hr,o,cr,s,r),gf.set(0,0),Zh.set(1,0),_f.set(1,1);let a=t.ray.intersectTriangle(Wa,yo,Xa,!1,_o);if(a===null&&(qa(yo.set(-.5,.5,0),hr,o,cr,s,r),Zh.set(0,1),a=t.ray.intersectTriangle(Wa,Xa,yo,!1,_o),a===null))return;let l=t.ray.origin.distanceTo(_o);l<t.near||l>t.far||e.push({distance:l,point:_o.clone(),uv:Ri.getInterpolation(_o,Wa,yo,Xa,gf,Zh,_f,new lt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function qa(i,t,e,n,s,r){ur.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(xo.x=r*ur.x-s*ur.y,xo.y=s*ur.x+r*ur.y):xo.copy(ur),i.copy(t),i.x+=xo.x,i.y+=xo.y,i.applyMatrix4(Mp)}var Vi=new C,$h=new C,Ya=new C,Za=new C,qi=class{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Vi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Vi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Vi.copy(this.origin).addScaledVector(this.direction,e),Vi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){$h.copy(t).add(e).multiplyScalar(.5),Ya.copy(e).sub(t).normalize(),Za.copy(this.origin).sub($h);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Ya),a=Za.dot(this.direction),l=-Za.dot(Ya),c=Za.lengthSq(),h=Math.abs(1-o*o),d,u,f,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let v=1/h;d*=v,u*=v,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy($h).addScaledVector(Ya,u),f}intersectSphere(t,e){if(t.radius<0)return null;Vi.subVectors(t.center,this.origin);let n=Vi.dot(this.direction),s=Vi.dot(Vi)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Vi)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,d=t.x-o.x,u=t.y-o.y,f=t.z-o.z,g=e.x-o.x,v=e.y-o.y,m=e.z-o.z,p=n.x-o.x,M=n.y-o.y,I=n.z-o.z,x=Math.abs(l),b=Math.abs(c),E=Math.abs(h),R,_,T,A,w,P,D,L,U,z,V,X;if(x>=b&&x>=E?(T=l,P=d,U=g,X=p,l>=0?(R=c,_=h,A=u,w=f,D=v,L=m,z=M,V=I):(R=h,_=c,A=f,w=u,D=m,L=v,z=I,V=M)):b>=E?(T=c,P=u,U=v,X=M,c>=0?(R=h,_=l,A=f,w=d,D=m,L=g,z=I,V=p):(R=l,_=h,A=d,w=f,D=g,L=m,z=p,V=I)):(T=h,P=f,U=m,X=I,h>=0?(R=l,_=c,A=d,w=u,D=g,L=v,z=p,V=M):(R=c,_=l,A=u,w=d,D=v,L=g,z=M,V=p)),T===0)return null;let H=R/T,Y=_/T,$=1/T,ht=A-H*P,ot=w-Y*P,Rt=D-H*U,Bt=L-Y*U,Zt=z-H*X,K=V-Y*X,et=Zt*Bt-K*Rt,Mt=ht*K-ot*Zt,it=Rt*ot-Bt*ht;if(s){if(et<0||Mt<0||it<0)return null}else if((et<0||Mt<0||it<0)&&(et>0||Mt>0||it>0))return null;let j=et+Mt+it;if(j===0)return null;let Ut=$*(et*P+Mt*U+it*X);return(j>0?Ut<0:Ut>0)?null:this.at(Ut/j,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},De=class extends gi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xi,this.combine=gu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},xf=new Kt,Ls=new qi,$a=new Li,yf=new C,Ka=new C,Ja=new C,ja=new C,Kh=new C,Qa=new C,vf=new C,tl=new C,Yt=class extends Ye{constructor(t=new te,e=new De){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Qa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(Kh.fromBufferAttribute(d,t),o?Qa.addScaledVector(Kh,h):Qa.addScaledVector(Kh.sub(e),h))}e.add(Qa)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$a.copy(n.boundingSphere),$a.applyMatrix4(r),Ls.copy(t.ray).recast(t.near),!($a.containsPoint(Ls.origin)===!1&&(Ls.intersectSphere($a,yf)===null||Ls.origin.distanceToSquared(yf)>(t.far-t.near)**2))&&(xf.copy(r).invert(),Ls.copy(t.ray).applyMatrix4(xf),!(n.boundingBox!==null&&Ls.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ls)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){let m=u[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),I=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let x=M,b=I;x<b;x+=3){let E=a.getX(x),R=a.getX(x+1),_=a.getX(x+2);s=el(this,p,t,n,c,h,d,E,R,_),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){let M=a.getX(m),I=a.getX(m+1),x=a.getX(m+2);s=el(this,o,t,n,c,h,d,M,I,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){let m=u[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),I=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=M,b=I;x<b;x+=3){let E=x,R=x+1,_=x+2;s=el(this,p,t,n,c,h,d,E,R,_),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){let M=m,I=m+1,x=m+2;s=el(this,o,t,n,c,h,d,M,I,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function e0(i,t,e,n,s,r,o,a){let l;if(t.side===Rn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===_s,a),l===null)return null;tl.copy(a),tl.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(tl);return c<e.near||c>e.far?null:{distance:c,point:tl.clone(),object:i}}function el(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Ka),i.getVertexPosition(l,Ja),i.getVertexPosition(c,ja);let h=e0(i,t,e,n,Ka,Ja,ja,vf);if(h){let d=new C;Ri.getBarycoord(vf,Ka,Ja,ja,d),s&&(h.uv=Ri.getInterpolatedAttribute(s,a,l,c,d,new lt)),r&&(h.uv1=Ri.getInterpolatedAttribute(r,a,l,c,d,new lt)),o&&(h.normal=Ri.getInterpolatedAttribute(o,a,l,c,d,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new C,materialIndex:0};Ri.getNormal(Ka,Ja,ja,u.normal),h.face=u,h.barycoord=d}return h}var Do=class extends An{constructor(t=null,e=1,n=1,s,r,o,a,l,c=sn,h=sn,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var wr=class extends ue{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},dr=new Kt,Mf=new Kt,nl=[],Sf=new Ii,n0=new Kt,vo=new Yt,Mo=new Li,No=class extends Yt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new wr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,n0)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ii),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,dr),Sf.copy(t.boundingBox).applyMatrix4(dr),this.boundingBox.union(Sf)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Li),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,dr),Mo.copy(t.boundingSphere).applyMatrix4(dr),this.boundingSphere.union(Mo)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(vo.geometry=this.geometry,vo.material=this.material,vo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Mo.copy(this.boundingSphere),Mo.applyMatrix4(n),t.ray.intersectsSphere(Mo)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,dr),Mf.multiplyMatrices(n,dr),vo.matrixWorld=Mf,vo.raycast(t,nl);for(let o=0,a=nl.length;o<a;o++){let l=nl[o];l.instanceId=r,l.object=this,e.push(l)}nl.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new wr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Do(new Float32Array(s*this.count),s,this.count,tc,Qn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ds=new Li,i0=new lt(.5,.5),il=new C,Ar=class{constructor(t=new wn,e=new wn,n=new wn,s=new wn,r=new wn,o=new wn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=pi,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],v=r[9],m=r[10],p=r[11],M=r[12],I=r[13],x=r[14],b=r[15];if(s[0].setComponents(c-o,f-h,p-g,b-M).normalize(),s[1].setComponents(c+o,f+h,p+g,b+M).normalize(),s[2].setComponents(c+a,f+d,p+v,b+I).normalize(),s[3].setComponents(c-a,f-d,p-v,b-I).normalize(),n)s[4].setComponents(l,u,m,x).normalize(),s[5].setComponents(c-l,f-u,p-m,b-x).normalize();else if(s[4].setComponents(c-l,f-u,p-m,b-x).normalize(),e===pi)s[5].setComponents(c+l,f+u,p+m,b+x).normalize();else if(e===yr)s[5].setComponents(l,u,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ds.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ds.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ds)}intersectsSprite(t){Ds.center.set(0,0,0);let e=i0.distanceTo(t.center);return Ds.radius=.7071067811865476+e,Ds.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ds)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(il.x=s.normal.x>0?t.max.x:t.min.x,il.y=s.normal.y>0?t.max.y:t.min.y,il.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(il)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Di=class extends gi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new mt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Rl=new C,Cl=new C,bf=new Kt,So=new qi,sl=new Li,Jh=new C,Ef=new C,Pl=class extends Ye{constructor(t=new te,e=new Di){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Rl.fromBufferAttribute(e,s-1),Cl.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Rl.distanceTo(Cl);t.setAttribute("lineDistance",new zt(n,1))}else Lt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),sl.copy(n.boundingSphere),sl.applyMatrix4(s),sl.radius+=r,t.ray.intersectsSphere(sl)===!1)return;bf.copy(s).invert(),So.copy(t.ray).applyMatrix4(bf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=f,m=g-1;v<m;v+=c){let p=h.getX(v),M=h.getX(v+1),I=rl(this,t,So,l,p,M,v);I&&e.push(I)}if(this.isLineLoop){let v=h.getX(g-1),m=h.getX(f),p=rl(this,t,So,l,v,m,g-1);p&&e.push(p)}}else{let f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let v=f,m=g-1;v<m;v+=c){let p=rl(this,t,So,l,v,v+1,v);p&&e.push(p)}if(this.isLineLoop){let v=rl(this,t,So,l,g-1,f,g-1);v&&e.push(v)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function rl(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(Rl.fromBufferAttribute(a,s),Cl.fromBufferAttribute(a,r),e.distanceSqToSegment(Rl,Cl,Jh,Ef)>n)return;Jh.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Jh);if(!(c<t.near||c>t.far))return{distance:c,point:Ef.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var Tf=new C,wf=new C,$n=class extends Pl{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Tf.fromBufferAttribute(e,s),wf.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Tf.distanceTo(wf);t.setAttribute("lineDistance",new zt(n,1))}else Lt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Il=class extends gi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new mt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Af=new Kt,ru=new qi,ol=new Li,al=new C,Os=class extends Ye{constructor(t=new te,e=new Il){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ol.copy(n.boundingSphere),ol.applyMatrix4(s),ol.radius+=r,t.ray.intersectsSphere(ol)===!1)return;Af.copy(s).invert(),ru.copy(t.ray).applyMatrix4(Af);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=u,v=f;g<v;g++){let m=c.getX(g);al.fromBufferAttribute(d,m),Rf(al,m,l,s,t,e,this)}}else{let u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=u,v=f;g<v;g++)al.fromBufferAttribute(d,g),Rf(al,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Rf(i,t,e,n,s,r,o){let a=ru.distanceSqToPoint(i);if(a<e){let l=new C;ru.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Uo=class extends An{constructor(t=[],e=xs,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Kn=class extends An{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ls=class extends An{constructor(t,e,n=xi,s,r,o,a=sn,l=sn,c,h=Pi,d=1){if(h!==Pi&&h!==vs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Sr(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Ll=class extends ls{constructor(t,e=xi,n=xs,s,r,o=sn,a=sn,l,c=Pi){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Oo=class extends An{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},yn=class i extends te{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new zt(c,3)),this.setAttribute("normal",new zt(h,3)),this.setAttribute("uv",new zt(d,2));function g(v,m,p,M,I,x,b,E,R,_,T){let A=x/R,w=b/_,P=x/2,D=b/2,L=E/2,U=R+1,z=_+1,V=0,X=0,H=new C;for(let Y=0;Y<z;Y++){let $=Y*w-D;for(let ht=0;ht<U;ht++){let ot=ht*A-P;H[v]=ot*M,H[m]=$*I,H[p]=L,c.push(H.x,H.y,H.z),H[v]=0,H[m]=0,H[p]=E>0?1:-1,h.push(H.x,H.y,H.z),d.push(ht/R),d.push(1-Y/_),V+=1}}for(let Y=0;Y<_;Y++)for(let $=0;$<R;$++){let ht=u+$+U*Y,ot=u+$+U*(Y+1),Rt=u+($+1)+U*(Y+1),Bt=u+($+1)+U*Y;l.push(ht,ot,Bt),l.push(ot,Rt,Bt),X+=6}a.addGroup(f,X,T),f+=X,u+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Fo=class i extends te{constructor(t=1,e=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:s,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],h=e/2,d=Math.PI/2*t,u=e,f=2*d+u,g=n*2+r,v=s+1,m=new C,p=new C;for(let M=0;M<=g;M++){let I=0,x=0,b=0,E=0;if(M<=n){let T=M/n,A=T*Math.PI/2;x=-h-t*Math.cos(A),b=t*Math.sin(A),E=-t*Math.cos(A),I=T*d}else if(M<=n+r){let T=(M-n)/r;x=-h+T*e,b=t,E=0,I=d+T*u}else{let T=(M-n-r)/n,A=T*Math.PI/2;x=h+t*Math.sin(A),b=t*Math.cos(A),E=t*Math.sin(A),I=d+u+T*d}let R=Math.max(0,Math.min(1,I/f)),_=0;M===0?_=.5/s:M===g&&(_=-.5/s);for(let T=0;T<=s;T++){let A=T/s,w=A*Math.PI*2,P=Math.sin(w),D=Math.cos(w);p.x=-b*D,p.y=x,p.z=b*P,a.push(p.x,p.y,p.z),m.set(-b*D,E,b*P),m.normalize(),l.push(m.x,m.y,m.z),c.push(A+_,R)}if(M>0){let T=(M-1)*v;for(let A=0;A<s;A++){let w=T+A,P=T+A+1,D=M*v+A,L=M*v+A+1;o.push(w,P,D),o.push(P,L,D)}}}this.setIndex(o),this.setAttribute("position",new zt(a,3)),this.setAttribute("normal",new zt(l,3)),this.setAttribute("uv",new zt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},Rr=class i extends te{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],l=[],c=new C,h=new lt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){let f=n+d/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[u]/t+1)/2,h.y=(o[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new zt(o,3)),this.setAttribute("normal",new zt(a,3)),this.setAttribute("uv",new zt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Hn=class i extends te{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],g=0,v=[],m=n/2,p=0;M(),o===!1&&(t>0&&I(!0),e>0&&I(!1)),this.setIndex(h),this.setAttribute("position",new zt(d,3)),this.setAttribute("normal",new zt(u,3)),this.setAttribute("uv",new zt(f,2));function M(){let x=new C,b=new C,E=0,R=(e-t)/n;for(let _=0;_<=r;_++){let T=[],A=_/r,w=A*(e-t)+t;for(let P=0;P<=s;P++){let D=P/s,L=D*l+a,U=Math.sin(L),z=Math.cos(L);b.x=w*U,b.y=-A*n+m,b.z=w*z,d.push(b.x,b.y,b.z),x.set(U,R,z).normalize(),u.push(x.x,x.y,x.z),f.push(D,1-A),T.push(g++)}v.push(T)}for(let _=0;_<s;_++)for(let T=0;T<r;T++){let A=v[T][_],w=v[T+1][_],P=v[T+1][_+1],D=v[T][_+1];(t>0||T!==0)&&(h.push(A,w,D),E+=3),(e>0||T!==r-1)&&(h.push(w,P,D),E+=3)}c.addGroup(p,E,0),p+=E}function I(x){let b=g,E=new lt,R=new C,_=0,T=x===!0?t:e,A=x===!0?1:-1;for(let P=1;P<=s;P++)d.push(0,m*A,0),u.push(0,A,0),f.push(.5,.5),g++;let w=g;for(let P=0;P<=s;P++){let L=P/s*l+a,U=Math.cos(L),z=Math.sin(L);R.x=T*z,R.y=m*A,R.z=T*U,d.push(R.x,R.y,R.z),u.push(0,A,0),E.x=U*.5+.5,E.y=z*.5*A+.5,f.push(E.x,E.y),g++}for(let P=0;P<s;P++){let D=b+P,L=w+P;x===!0?h.push(L,L+1,D):h.push(L+1,L,D),_+=3}c.addGroup(p,_,x===!0?1:2),p+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Fs=class i extends Hn{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Bo=class i extends te{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new zt(r,3)),this.setAttribute("normal",new zt(r.slice(),3)),this.setAttribute("uv",new zt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){let I=new C,x=new C,b=new C;for(let E=0;E<e.length;E+=3)f(e[E+0],I),f(e[E+1],x),f(e[E+2],b),l(I,x,b,M)}function l(M,I,x,b){let E=b+1,R=[];for(let _=0;_<=E;_++){R[_]=[];let T=M.clone().lerp(x,_/E),A=I.clone().lerp(x,_/E),w=E-_;for(let P=0;P<=w;P++)P===0&&_===E?R[_][P]=T:R[_][P]=T.clone().lerp(A,P/w)}for(let _=0;_<E;_++)for(let T=0;T<2*(E-_)-1;T++){let A=Math.floor(T/2);T%2===0?(u(R[_][A+1]),u(R[_+1][A]),u(R[_][A])):(u(R[_][A+1]),u(R[_+1][A+1]),u(R[_+1][A]))}}function c(M){let I=new C;for(let x=0;x<r.length;x+=3)I.x=r[x+0],I.y=r[x+1],I.z=r[x+2],I.normalize().multiplyScalar(M),r[x+0]=I.x,r[x+1]=I.y,r[x+2]=I.z}function h(){let M=new C;for(let I=0;I<r.length;I+=3){M.x=r[I+0],M.y=r[I+1],M.z=r[I+2];let x=m(M)/2/Math.PI+.5,b=p(M)/Math.PI+.5;o.push(x,1-b)}g(),d()}function d(){for(let M=0;M<o.length;M+=6){let I=o[M+0],x=o[M+2],b=o[M+4],E=Math.max(I,x,b),R=Math.min(I,x,b);E>.9&&R<.1&&(I<.2&&(o[M+0]+=1),x<.2&&(o[M+2]+=1),b<.2&&(o[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function f(M,I){let x=M*3;I.x=t[x+0],I.y=t[x+1],I.z=t[x+2]}function g(){let M=new C,I=new C,x=new C,b=new C,E=new lt,R=new lt,_=new lt;for(let T=0,A=0;T<r.length;T+=9,A+=6){M.set(r[T+0],r[T+1],r[T+2]),I.set(r[T+3],r[T+4],r[T+5]),x.set(r[T+6],r[T+7],r[T+8]),E.set(o[A+0],o[A+1]),R.set(o[A+2],o[A+3]),_.set(o[A+4],o[A+5]),b.copy(M).add(I).add(x).divideScalar(3);let w=m(b);v(E,A+0,M,w),v(R,A+2,I,w),v(_,A+4,x,w)}}function v(M,I,x,b){b<0&&M.x===1&&(o[I]=M.x-1),x.x===0&&x.z===0&&(o[I]=b/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.detail)}};var ll=new C,cl=new C,jh=new C,hl=new Ri,cs=class extends te{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(gr*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:v,b:m,c:p}=hl;if(v.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),hl.getNormal(jh),d[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,d[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,d[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let M=0;M<3;M++){let I=(M+1)%3,x=d[M],b=d[I],E=hl[h[M]],R=hl[h[I]],_=`${x}_${b}`,T=`${b}_${x}`;T in u&&u[T]?(jh.dot(u[T].normal)<=r&&(f.push(E.x,E.y,E.z),f.push(R.x,R.y,R.z)),u[T]=null):_ in u||(u[_]={index0:c[M],index1:c[I],normal:jh.clone()})}}for(let g in u)if(u[g]){let{index0:v,index1:m}=u[g];ll.fromBufferAttribute(a,v),cl.fromBufferAttribute(a,m),f.push(ll.x,ll.y,ll.z),f.push(cl.x,cl.y,cl.z)}this.setAttribute("position",new zt(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var zo=class i extends Bo{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}},Ho=class i extends te{constructor(t=[new lt(0,-.5),new lt(.5,0),new lt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Xt(s,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],h=1/e,d=new C,u=new lt,f=new C,g=new C,v=new C,m=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(g)}for(let M=0;M<=e;M++){let I=n+M*h*s,x=Math.sin(I),b=Math.cos(I);for(let E=0;E<=t.length-1;E++){d.x=t[E].x*x,d.y=t[E].y,d.z=t[E].x*b,o.push(d.x,d.y,d.z),u.x=M/e,u.y=E/(t.length-1),a.push(u.x,u.y);let R=l[3*E+0]*x,_=l[3*E+1],T=l[3*E+0]*b;c.push(R,_,T)}}for(let M=0;M<e;M++)for(let I=0;I<t.length-1;I++){let x=I+M*t.length,b=x,E=x+t.length,R=x+t.length+1,_=x+1;r.push(b,E,_),r.push(R,_,E)}this.setIndex(r),this.setAttribute("position",new zt(o,3)),this.setAttribute("uv",new zt(a,2)),this.setAttribute("normal",new zt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},ko=class i extends Bo{constructor(t=1,e=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}},Bs=class i extends te{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,d=t/a,u=e/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){let M=p*u-o;for(let I=0;I<c;I++){let x=I*d-r;g.push(x,-M,0),v.push(0,0,1),m.push(I/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){let I=M+c*p,x=M+c*(p+1),b=M+1+c*(p+1),E=M+1+c*p;f.push(I,x,E),f.push(x,b,E)}this.setIndex(f),this.setAttribute("position",new zt(g,3)),this.setAttribute("normal",new zt(v,3)),this.setAttribute("uv",new zt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var zs=class i extends te{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new C,u=new C,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){let M=[],I=p/n,x=o+I*a,b=t*Math.cos(x),E=Math.sqrt(t*t-b*b),R=0;p===0&&o===0?R=.5/e:p===n&&l===Math.PI&&(R=-.5/e);for(let _=0;_<=e;_++){let T=_/e,A=s+T*r;d.x=-E*Math.cos(A),d.y=b,d.z=E*Math.sin(A),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),m.push(T+R,1-I),M.push(c++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){let I=h[p][M+1],x=h[p][M],b=h[p+1][M],E=h[p+1][M+1];(p!==0||o>0)&&f.push(I,x,E),(p!==n-1||l<Math.PI)&&f.push(x,b,E)}this.setIndex(f),this.setAttribute("position",new zt(g,3)),this.setAttribute("normal",new zt(v,3)),this.setAttribute("uv",new zt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var hs=class i extends te{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],d=[],u=new C,f=new C,g=new C;for(let v=0;v<=n;v++){let m=o+v/n*a;for(let p=0;p<=s;p++){let M=p/s*r;f.x=(t+e*Math.cos(m))*Math.cos(M),f.y=(t+e*Math.cos(m))*Math.sin(M),f.z=e*Math.sin(m),c.push(f.x,f.y,f.z),u.x=t*Math.cos(M),u.y=t*Math.sin(M),g.subVectors(f,u).normalize(),h.push(g.x,g.y,g.z),d.push(p/s),d.push(v/n)}}for(let v=1;v<=n;v++)for(let m=1;m<=s;m++){let p=(s+1)*v+m-1,M=(s+1)*(v-1)+m-1,I=(s+1)*(v-1)+m,x=(s+1)*v+m;l.push(p,M,x),l.push(M,I,x)}this.setIndex(l),this.setAttribute("position",new zt(c,3)),this.setAttribute("normal",new zt(h,3)),this.setAttribute("uv",new zt(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Gs(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Cf(s))s.isRenderTargetTexture?(Lt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Cf(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Mn(i){let t={};for(let e=0;e<i.length;e++){let n=Gs(i[e]);for(let s in n)t[s]=n[s]}return t}function Cf(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function s0(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Au(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}var Zi={clone:Gs,merge:Mn},r0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,o0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Se=class extends gi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=r0,this.fragmentShader=o0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Gs(t.uniforms),this.uniformsGroups=s0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new mt().setHex(s.value);break;case"v2":this.uniforms[n].value=new lt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new C().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Le().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ht().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Kt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Cr=class extends Se{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},vn=class extends gi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new mt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Nc,this.normalScale=new lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},us=class extends vn{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new lt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Xt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new mt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new mt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new mt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var Dl=class extends gi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ap,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Nl=class extends gi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function fr(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Qh(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var ds=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ul=class extends ds{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:nu,endingEnd:nu}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case iu:r=t,a=2*e-n;break;case su:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case iu:o=t,l=2*n-e;break;case su:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),v=g*g,m=v*g,p=-u*m+2*u*v-u*g,M=(1+u)*m+(-1.5-2*u)*v+(-.5+u)*g+1,I=(-1-f)*m+(1.5+f)*v+.5*g,x=f*m-f*v;for(let b=0;b!==a;++b)r[b]=p*o[h+b]+M*o[c+b]+I*o[l+b]+x*o[d+b];return r}},Ol=class extends ds{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},Fl=class extends ds{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Bl=class extends ds{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(n-e)/(s-e),v=1-g;for(let m=0;m!==a;++m)r[m]=o[c+m]*v+o[l+m]*g;return r}let u=a*2,f=t-1;for(let g=0;g!==a;++g){let v=o[c+g],m=o[l+g],p=f*u+g*2,M=d[p],I=d[p+1],x=t*u+g*2,b=h[x],E=h[x+1],R=l0(n,e,M,b,s);r[g]=Sp(R,v,I,E,m)}return r}};function Sp(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function a0(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function l0(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=Sp(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let l=a0(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var kn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=fr(e,this.TimeBufferType),this.values=fr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:fr(t.times,Array),values:fr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),Qh(t.settings)&&(n.settings={inTangents:fr(t.settings.inTangents,Array),outTangents:fr(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Fl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ol(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ul(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Bl(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Eo:e=this.InterpolantFactoryMethodDiscrete;break;case El:e=this.InterpolantFactoryMethodLinear;break;case fl:e=this.InterpolantFactoryMethodSmooth;break;case eu:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Lt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Eo;case this.InterpolantFactoryMethodLinear:return El;case this.InterpolantFactoryMethodSmooth:return fl;case this.InterpolantFactoryMethodBezier:return eu}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;Qh(this.settings)&&(Pf(this.settings.inTangents,t),Pf(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Ot("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ot("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Ot("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){Ot("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Sg(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){Ot("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===fl,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let d=a*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){let v=e[d+g];if(v!==e[u+g]||v!==e[f+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,Qh(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Pf(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}kn.prototype.ValueTypeName="";kn.prototype.TimeBufferType=Float32Array;kn.prototype.ValueBufferType=Float32Array;kn.prototype.DefaultInterpolation=El;var fs=class extends kn{constructor(t,e,n){super(t,e,n)}};fs.prototype.ValueTypeName="bool";fs.prototype.ValueBufferType=Array;fs.prototype.DefaultInterpolation=Eo;fs.prototype.InterpolantFactoryMethodLinear=void 0;fs.prototype.InterpolantFactoryMethodSmooth=void 0;var zl=class extends kn{constructor(t,e,n,s){super(t,e,n,s)}};zl.prototype.ValueTypeName="color";var Hl=class extends kn{constructor(t,e,n,s){super(t,e,n,s)}};Hl.prototype.ValueTypeName="number";var kl=class extends ds{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)He.slerpFlat(r,0,o,c-a,o,c,l);return r}},Vo=class extends kn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new kl(this.times,this.values,this.getValueSize(),t)}};Vo.prototype.ValueTypeName="quaternion";Vo.prototype.InterpolantFactoryMethodSmooth=void 0;var ps=class extends kn{constructor(t,e,n){super(t,e,n)}};ps.prototype.ValueTypeName="string";ps.prototype.ValueBufferType=Array;ps.prototype.DefaultInterpolation=Eo;ps.prototype.InterpolantFactoryMethodLinear=void 0;ps.prototype.InterpolantFactoryMethodSmooth=void 0;var Vl=class extends kn{constructor(t,e,n,s){super(t,e,n,s)}};Vl.prototype.ValueTypeName="vector";var Gl=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},bp=new Gl,Wl=class{constructor(t){this.manager=t!==void 0?t:bp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Wl.DEFAULT_MATERIAL_NAME="__DEFAULT";var Pr=class extends Ye{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new mt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var tu=new Kt,If=new C,Lf=new C,Go=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new lt(512,512),this.mapType=Dn,this.map=null,this.mapPass=null,this.matrix=new Kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ar,this._frameExtents=new lt(1,1),this._viewportCount=1,this._viewports=[new Le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;If.setFromMatrixPosition(t.matrixWorld),e.position.copy(If),Lf.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Lf),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){tu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(tu,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===yr||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(tu)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},ul=new C,dl=new He,Ai=new C,Wo=class extends Ye{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=pi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ul,dl,Ai),Ai.x===1&&Ai.y===1&&Ai.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ul,dl,Ai.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(ul,dl,Ai),Ai.x===1&&Ai.y===1&&Ai.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ul,dl,Ai.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},as=new C,Df=new lt,Nf=new lt,cn=class extends Wo{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Mr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(gr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Mr*2*Math.atan(Math.tan(gr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){as.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(as.x,as.y).multiplyScalar(-t/as.z),as.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(as.x,as.y).multiplyScalar(-t/as.z)}getViewSize(t,e){return this.getViewBounds(t,Df,Nf),e.subVectors(Nf,Df)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(gr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var ou=class extends Go{constructor(){super(new cn(90,1,.5,500)),this.isPointLightShadow=!0}},Xo=class extends Pr{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new ou}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},ms=class extends Wo{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},au=class extends Go{constructor(){super(new ms(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ir=class extends Pr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ye.DEFAULT_UP),this.updateMatrix(),this.target=new Ye,this.shadow=new au}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},qo=class extends Pr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var pr=-90,mr=1,Xl=class extends Ye{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new cn(pr,mr,t,e);s.layers=this.layers,this.add(s);let r=new cn(pr,mr,t,e);r.layers=this.layers,this.add(r);let o=new cn(pr,mr,t,e);o.layers=this.layers,this.add(o);let a=new cn(pr,mr,t,e);a.layers=this.layers,this.add(a);let l=new cn(pr,mr,t,e);l.layers=this.layers,this.add(l);let c=new cn(pr,mr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===pi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===yr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},ql=class extends cn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},Yo=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=c0.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function c0(){this._document.hidden===!1&&this.reset()}var Ru="\\[\\]\\.:\\/",h0=new RegExp("["+Ru+"]","g"),Cu="[^"+Ru+"]",u0="[^"+Ru.replace("\\.","")+"]",d0=/((?:WC+[\/:])*)/.source.replace("WC",Cu),f0=/(WCOD+)?/.source.replace("WCOD",u0),p0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Cu),m0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Cu),g0=new RegExp("^"+d0+f0+p0+m0+"$"),_0=["material","materials","bones","map"],lu=class{constructor(t,e,n){let s=n||Ae.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Ae=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(h0,"")}static parseTrackName(t){let e=g0.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);_0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Lt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ot("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ot("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ot("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Ot("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Ot("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;Ot("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ae.Composite=lu;Ae.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ae.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ae.prototype.GetterByBindingType=[Ae.prototype._getValue_direct,Ae.prototype._getValue_array,Ae.prototype._getValue_arrayElement,Ae.prototype._getValue_toArray];Ae.prototype.SetterByBindingTypeAndVersioning=[[Ae.prototype._setValue_direct,Ae.prototype._setValue_direct_setNeedsUpdate,Ae.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_array,Ae.prototype._setValue_array_setNeedsUpdate,Ae.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_arrayElement,Ae.prototype._setValue_arrayElement_setNeedsUpdate,Ae.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_fromArray,Ae.prototype._setValue_fromArray_setNeedsUpdate,Ae.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var jS=new Float32Array(1);var Uf=new Kt,Zo=class{constructor(t,e,n=0,s=1/0){this.ray=new qi(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new br,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Ot("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Uf.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Uf),this}intersectObject(t,e=!0,n=[]){return cu(t,this,n,e),n.sort(Of),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)cu(t[s],this,n,e);return n.sort(Of),n}};function Of(i,t){return i.distance-t.distance}function cu(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)cu(r[o],t,e,!0)}}var Ni=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Xt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Xt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Uu=class Uu{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Uu.prototype.isMatrix2=!0;var hu=Uu;var $o=class extends mi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function Pu(i,t,e,n){let s=x0(n);switch(e){case Su:return i*t;case tc:return i*t/s.components*s.byteLength;case ec:return i*t/s.components*s.byteLength;case Ms:return i*t*2/s.components*s.byteLength;case nc:return i*t*2/s.components*s.byteLength;case bu:return i*t*3/s.components*s.byteLength;case ti:return i*t*4/s.components*s.byteLength;case ic:return i*t*4/s.components*s.byteLength;case ra:case oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case aa:case la:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case rc:case ac:return Math.max(i,16)*Math.max(t,8)/4;case sc:case oc:return Math.max(i,8)*Math.max(t,8)/2;case lc:case cc:case uc:case dc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case hc:case ca:case fc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case pc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case mc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case gc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case _c:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case xc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case yc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case vc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Mc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Sc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case bc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ec:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Tc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case wc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ac:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Rc:case Cc:case Pc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ic:case Lc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ha:case Dc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function x0(i){switch(i){case Dn:case xu:return{byteLength:1,components:1};case Nr:case yu:case dn:return{byteLength:2,components:1};case jl:case Ql:return{byteLength:2,components:4};case xi:case Jl:case Qn:return{byteLength:4,components:1};case vu:case Mu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Lt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Xp(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function b0(i){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],v=d[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let v=d[f];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var E0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,T0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,w0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,A0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,R0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,C0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,P0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,I0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,L0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,D0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,N0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,U0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,O0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,F0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,B0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,z0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,H0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,k0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,V0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,G0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,W0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,X0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,q0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Y0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Z0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,$0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,K0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,J0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,j0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Q0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,t_="gl_FragColor = linearToOutputTexel( gl_FragColor );",e_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,n_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,i_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,s_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,r_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,o_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,a_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,l_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,c_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,h_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,u_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,d_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,f_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,p_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,m_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,g_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,__=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,x_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,y_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,v_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,M_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,S_=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,b_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,E_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,T_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,w_=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,A_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,R_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,C_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,P_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,I_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,L_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,D_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,N_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,U_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,O_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,F_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,B_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,z_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,H_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,k_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,V_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,G_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,W_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,X_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,q_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Y_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Z_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,K_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,J_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,j_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Q_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,tx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ex=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ix=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ox=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,ax=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,lx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,cx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,hx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ux=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,dx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,px=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_x=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,xx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,yx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,bx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ex=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ax=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Px=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ix=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Lx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Dx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Nx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ux=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ox=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,zx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Gx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Xx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,qx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,$x=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Qx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ty=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ey=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ny=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,iy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qt={alphahash_fragment:E0,alphahash_pars_fragment:T0,alphamap_fragment:w0,alphamap_pars_fragment:A0,alphatest_fragment:R0,alphatest_pars_fragment:C0,aomap_fragment:P0,aomap_pars_fragment:I0,batching_pars_vertex:L0,batching_vertex:D0,begin_vertex:N0,beginnormal_vertex:U0,bsdfs:O0,iridescence_fragment:F0,bumpmap_pars_fragment:B0,clipping_planes_fragment:z0,clipping_planes_pars_fragment:H0,clipping_planes_pars_vertex:k0,clipping_planes_vertex:V0,color_fragment:G0,color_pars_fragment:W0,color_pars_vertex:X0,color_vertex:q0,common:Y0,cube_uv_reflection_fragment:Z0,defaultnormal_vertex:$0,displacementmap_pars_vertex:K0,displacementmap_vertex:J0,emissivemap_fragment:j0,emissivemap_pars_fragment:Q0,colorspace_fragment:t_,colorspace_pars_fragment:e_,envmap_fragment:n_,envmap_common_pars_fragment:i_,envmap_pars_fragment:s_,envmap_pars_vertex:r_,envmap_physical_pars_fragment:g_,envmap_vertex:o_,fog_vertex:a_,fog_pars_vertex:l_,fog_fragment:c_,fog_pars_fragment:h_,gradientmap_pars_fragment:u_,lightmap_pars_fragment:d_,lights_lambert_fragment:f_,lights_lambert_pars_fragment:p_,lights_pars_begin:m_,lights_toon_fragment:__,lights_toon_pars_fragment:x_,lights_phong_fragment:y_,lights_phong_pars_fragment:v_,lights_physical_fragment:M_,lights_physical_pars_fragment:S_,lights_fragment_begin:b_,lights_fragment_maps:E_,lights_fragment_end:T_,lightprobes_pars_fragment:w_,logdepthbuf_fragment:A_,logdepthbuf_pars_fragment:R_,logdepthbuf_pars_vertex:C_,logdepthbuf_vertex:P_,map_fragment:I_,map_pars_fragment:L_,map_particle_fragment:D_,map_particle_pars_fragment:N_,metalnessmap_fragment:U_,metalnessmap_pars_fragment:O_,morphinstance_vertex:F_,morphcolor_vertex:B_,morphnormal_vertex:z_,morphtarget_pars_vertex:H_,morphtarget_vertex:k_,normal_fragment_begin:V_,normal_fragment_maps:G_,normal_pars_fragment:W_,normal_pars_vertex:X_,normal_vertex:q_,normalmap_pars_fragment:Y_,clearcoat_normal_fragment_begin:Z_,clearcoat_normal_fragment_maps:$_,clearcoat_pars_fragment:K_,iridescence_pars_fragment:J_,opaque_fragment:j_,packing:Q_,premultiplied_alpha_fragment:tx,project_vertex:ex,dithering_fragment:nx,dithering_pars_fragment:ix,roughnessmap_fragment:sx,roughnessmap_pars_fragment:rx,shadowmap_pars_fragment:ox,shadowmap_pars_vertex:ax,shadowmap_vertex:lx,shadowmask_pars_fragment:cx,skinbase_vertex:hx,skinning_pars_vertex:ux,skinning_vertex:dx,skinnormal_vertex:fx,specularmap_fragment:px,specularmap_pars_fragment:mx,tonemapping_fragment:gx,tonemapping_pars_fragment:_x,transmission_fragment:xx,transmission_pars_fragment:yx,uv_pars_fragment:vx,uv_pars_vertex:Mx,uv_vertex:Sx,worldpos_vertex:bx,background_vert:Ex,background_frag:Tx,backgroundCube_vert:wx,backgroundCube_frag:Ax,cube_vert:Rx,cube_frag:Cx,depth_vert:Px,depth_frag:Ix,distance_vert:Lx,distance_frag:Dx,equirect_vert:Nx,equirect_frag:Ux,linedashed_vert:Ox,linedashed_frag:Fx,meshbasic_vert:Bx,meshbasic_frag:zx,meshlambert_vert:Hx,meshlambert_frag:kx,meshmatcap_vert:Vx,meshmatcap_frag:Gx,meshnormal_vert:Wx,meshnormal_frag:Xx,meshphong_vert:qx,meshphong_frag:Yx,meshphysical_vert:Zx,meshphysical_frag:$x,meshtoon_vert:Kx,meshtoon_frag:Jx,points_vert:jx,points_frag:Qx,shadow_vert:ty,shadow_frag:ey,sprite_vert:ny,sprite_frag:iy},_t={common:{diffuse:{value:new mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new C},probesMax:{value:new C},probesResolution:{value:new C}},points:{diffuse:{value:new mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new mt(16777215)},opacity:{value:1},center:{value:new lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},Oi={basic:{uniforms:Mn([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:Mn([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new mt(0)},envMapIntensity:{value:1}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:Mn([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new mt(0)},specular:{value:new mt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:Mn([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:Mn([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new mt(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:Mn([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:Mn([_t.points,_t.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:Mn([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:Mn([_t.common,_t.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:Mn([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:Mn([_t.sprite,_t.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distance:{uniforms:Mn([_t.common,_t.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distance_vert,fragmentShader:qt.distance_frag},shadow:{uniforms:Mn([_t.lights,_t.fog,{color:{value:new mt(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};Oi.physical={uniforms:Mn([Oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new mt(0)},specularColor:{value:new mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};var Fc={r:0,b:0,g:0},sy=new Kt,qp=new Ht;qp.set(-1,0,0,0,1,0,0,0,1);function ry(i,t,e,n,s,r){let o=new mt(0),a=s===!0?0:1,l,c,h=null,d=0,u=null;function f(M){let I=M.isScene===!0?M.background:null;if(I&&I.isTexture){let x=M.backgroundBlurriness>0;I=t.get(I,x)}return I}function g(M){let I=!1,x=f(M);x===null?m(o,a):x&&x.isColor&&(m(x,1),I=!0);let b=i.xr.getEnvironmentBlendMode();b==="additive"?e.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||I)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(M,I){let x=f(I);x&&(x.isCubeTexture||x.mapping===ia)?(c===void 0&&(c=new Yt(new yn(1,1,1),new Se({name:"BackgroundCubeMaterial",uniforms:Gs(Oi.backgroundCube.uniforms),vertexShader:Oi.backgroundCube.vertexShader,fragmentShader:Oi.backgroundCube.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=I.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(sy.makeRotationFromEuler(I.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(qp),c.material.toneMapped=$t.getTransfer(x.colorSpace)!==le,(h!==x||d!==x.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=x,d=x.version,u=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Yt(new Bs(2,2),new Se({name:"BackgroundMaterial",uniforms:Gs(Oi.background.uniforms),vertexShader:Oi.background.vertexShader,fragmentShader:Oi.background.fragmentShader,side:_s,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,l.material.toneMapped=$t.getTransfer(x.colorSpace)!==le,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||d!==x.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=x,d=x.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function m(M,I){M.getRGB(Fc,Au(i)),e.buffers.color.setClear(Fc.r,Fc.g,Fc.b,I,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,I=1){o.set(M),a=I,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,m(o,a)},render:g,addToRenderList:v,dispose:p}}function oy(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(w,P,D,L,U){let z=!1,V=d(w,L,D,P);r!==V&&(r=V,c(r.object)),z=f(w,L,D,U),z&&g(w,L,D,U),U!==null&&t.update(U,i.ELEMENT_ARRAY_BUFFER),(z||o)&&(o=!1,x(w,P,D,L),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function l(){return i.createVertexArray()}function c(w){return i.bindVertexArray(w)}function h(w){return i.deleteVertexArray(w)}function d(w,P,D,L){let U=L.wireframe===!0,z=n[P.id];z===void 0&&(z={},n[P.id]=z);let V=w.isInstancedMesh===!0?w.id:0,X=z[V];X===void 0&&(X={},z[V]=X);let H=X[D.id];H===void 0&&(H={},X[D.id]=H);let Y=H[U];return Y===void 0&&(Y=u(l()),H[U]=Y),Y}function u(w){let P=[],D=[],L=[];for(let U=0;U<e;U++)P[U]=0,D[U]=0,L[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:D,attributeDivisors:L,object:w,attributes:{},index:null}}function f(w,P,D,L){let U=r.attributes,z=P.attributes,V=0,X=D.getAttributes();for(let H in X)if(X[H].location>=0){let $=U[H],ht=z[H];if(ht===void 0&&(H==="instanceMatrix"&&w.instanceMatrix&&(ht=w.instanceMatrix),H==="instanceColor"&&w.instanceColor&&(ht=w.instanceColor)),$===void 0||$.attribute!==ht||ht&&$.data!==ht.data)return!0;V++}return r.attributesNum!==V||r.index!==L}function g(w,P,D,L){let U={},z=P.attributes,V=0,X=D.getAttributes();for(let H in X)if(X[H].location>=0){let $=z[H];$===void 0&&(H==="instanceMatrix"&&w.instanceMatrix&&($=w.instanceMatrix),H==="instanceColor"&&w.instanceColor&&($=w.instanceColor));let ht={};ht.attribute=$,$&&$.data&&(ht.data=$.data),U[H]=ht,V++}r.attributes=U,r.attributesNum=V,r.index=L}function v(){let w=r.newAttributes;for(let P=0,D=w.length;P<D;P++)w[P]=0}function m(w){p(w,0)}function p(w,P){let D=r.newAttributes,L=r.enabledAttributes,U=r.attributeDivisors;D[w]=1,L[w]===0&&(i.enableVertexAttribArray(w),L[w]=1),U[w]!==P&&(i.vertexAttribDivisor(w,P),U[w]=P)}function M(){let w=r.newAttributes,P=r.enabledAttributes;for(let D=0,L=P.length;D<L;D++)P[D]!==w[D]&&(i.disableVertexAttribArray(D),P[D]=0)}function I(w,P,D,L,U,z,V){V===!0?i.vertexAttribIPointer(w,P,D,U,z):i.vertexAttribPointer(w,P,D,L,U,z)}function x(w,P,D,L){v();let U=L.attributes,z=D.getAttributes(),V=P.defaultAttributeValues;for(let X in z){let H=z[X];if(H.location>=0){let Y=U[X];if(Y===void 0&&(X==="instanceMatrix"&&w.instanceMatrix&&(Y=w.instanceMatrix),X==="instanceColor"&&w.instanceColor&&(Y=w.instanceColor)),Y!==void 0){let $=Y.normalized,ht=Y.itemSize,ot=t.get(Y);if(ot===void 0)continue;let Rt=ot.buffer,Bt=ot.type,Zt=ot.bytesPerElement,K=Bt===i.INT||Bt===i.UNSIGNED_INT||Y.gpuType===Jl;if(Y.isInterleavedBufferAttribute){let et=Y.data,Mt=et.stride,it=Y.offset;if(et.isInstancedInterleavedBuffer){for(let j=0;j<H.locationSize;j++)p(H.location+j,et.meshPerAttribute);w.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let j=0;j<H.locationSize;j++)m(H.location+j);i.bindBuffer(i.ARRAY_BUFFER,Rt);for(let j=0;j<H.locationSize;j++)I(H.location+j,ht/H.locationSize,Bt,$,Mt*Zt,(it+ht/H.locationSize*j)*Zt,K)}else{if(Y.isInstancedBufferAttribute){for(let et=0;et<H.locationSize;et++)p(H.location+et,Y.meshPerAttribute);w.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let et=0;et<H.locationSize;et++)m(H.location+et);i.bindBuffer(i.ARRAY_BUFFER,Rt);for(let et=0;et<H.locationSize;et++)I(H.location+et,ht/H.locationSize,Bt,$,ht*Zt,ht/H.locationSize*et*Zt,K)}}else if(V!==void 0){let $=V[X];if($!==void 0)switch($.length){case 2:i.vertexAttrib2fv(H.location,$);break;case 3:i.vertexAttrib3fv(H.location,$);break;case 4:i.vertexAttrib4fv(H.location,$);break;default:i.vertexAttrib1fv(H.location,$)}}}}M()}function b(){T();for(let w in n){let P=n[w];for(let D in P){let L=P[D];for(let U in L){let z=L[U];for(let V in z)h(z[V].object),delete z[V];delete L[U]}}delete n[w]}}function E(w){if(n[w.id]===void 0)return;let P=n[w.id];for(let D in P){let L=P[D];for(let U in L){let z=L[U];for(let V in z)h(z[V].object),delete z[V];delete L[U]}}delete n[w.id]}function R(w){for(let P in n){let D=n[P];for(let L in D){let U=D[L];if(U[w.id]===void 0)continue;let z=U[w.id];for(let V in z)h(z[V].object),delete z[V];delete U[w.id]}}}function _(w){for(let P in n){let D=n[P],L=w.isInstancedMesh===!0?w.id:0,U=D[L];if(U!==void 0){for(let z in U){let V=U[z];for(let X in V)h(V[X].object),delete V[X];delete U[z]}delete D[L],Object.keys(D).length===0&&delete n[P]}}}function T(){A(),o=!0,r!==s&&(r=s,c(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:A,dispose:b,releaseStatesOfGeometry:E,releaseStatesOfObject:_,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:m,disableUnusedAttributes:M}}function ay(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function ly(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==ti&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let _=R===dn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Dn&&R!==Qn&&!_&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Lt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Lt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),I=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:I,maxFragmentUniforms:x,maxSamples:b,samples:E}}function cy(i){let t=this,e=null,n=0,s=!1,r=!1,o=new wn,a=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let M=r?0:n,I=M*4,x=p.clippingState||null;l.value=x,x=h(g,u,I,f);for(let b=0;b!==I;++b)x[b]=e[b];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){let v=d!==null?d.length:0,m=null;if(v!==0){if(m=l.value,g!==!0||m===null){let p=f+v*4,M=u.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let I=0,x=f;I!==v;++I,x+=4)o.copy(d[I]).applyMatrix4(M,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}var Br=4,hy=6,uy=20,dy=256,ua=new ms,Ep=new mt,Ou=null,Fu=0,Bu=0,zu=!1,fy=new C,Ws=new C,Hr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=fy}=r;Ou=this._renderer.getRenderTarget(),Fu=this._renderer.getActiveCubeFace(),Bu=this._renderer.getActiveMipmapLevel(),zu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ap(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Ou,Fu,Bu),this._renderer.xr.enabled=zu,t.scissorTest=!1,Fr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===xs||t.mapping===Vs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ou=this._renderer.getRenderTarget(),Fu=this._renderer.getActiveCubeFace(),Bu=this._renderer.getActiveMipmapLevel(),zu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:hn,minFilter:hn,generateMipmaps:!1,type:dn,format:ti,colorSpace:To,depthBuffer:!1},s=Tp(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tp(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=py(r)),this._blurMaterial=gy(r,t,e),this._ggxMaterial=my(r,t,e)}return s}_compileMaterial(t){let e=new Yt(new te,t);this._renderer.compile(e,ua)}_sceneToCubeUV(t,e,n,s,r){let l=new cn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Ep),d.toneMapping=_i,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Yt(new yn,new De({name:"PMREM.Background",side:Rn,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,m=v.material,p=!1,M=t.background;M?M.isColor&&(m.color.copy(M),t.background=null,p=!0):(m.color.copy(Ep),p=!0);for(let I=0;I<6;I++){let x=I%3;x===0?(l.up.set(0,c[I],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[I],r.y,r.z)):x===1?(l.up.set(0,0,c[I]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[I],r.z)):(l.up.set(0,c[I],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[I]));let b=this._cubeSize;Fr(s,x*b,I>2?b:0,b,b),d.setRenderTarget(s),p&&d.render(v,l),d.render(t,l)}d.toneMapping=f,d.autoClear=u,t.background=M}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===xs||t.mapping===Vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ap()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wp());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Fr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,ua)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:g}=this,v=this._sizeLods[n],m=3*v*(n>g-Br?n-g+Br:0),p=4*(this._cubeSize-v);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=g-e,Fr(r,m,p,3*v,2*v),s.setRenderTarget(r),s.render(a,ua),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Fr(t,m,p,3*v,2*v),s.setRenderTarget(t),s.render(a,ua)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,s,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[s];l.material=a;let c=a.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],d=3*h*(s>this._lodMax-Br?s-this._lodMax+Br:0),u=4*(this._cubeSize-h);Fr(e,d,u,3*h,2*h),o.setRenderTarget(e),o.render(l,ua)}};function py(i){let t=[],e=[],n=i,s=i-Br+1+hy;for(let r=0;r<s;r++){let o=Math.pow(2,n);t.push(o);let a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,g=new Float32Array(f*u*d),v=new Float32Array(f*u*d);for(let p=0;p<d;p++){let M=p%3*2/3-1,I=p>2?0:-1,x=[M,I,0,M+2/3,I,0,M+2/3,I+1,0,M,I,0,M+2/3,I+1,0,M,I+1,0];g.set(x,f*u*p);for(let b=0;b<u;b++){let E=h[b*2]*2-1,R=h[b*2+1]*2-1;p===0?Ws.set(1,R,E):p===1?Ws.set(-E,1,-R):p===2?Ws.set(-E,R,1):p===3?Ws.set(-1,R,-E):p===4?Ws.set(-E,-1,R):Ws.set(E,R,-1),Ws.toArray(v,(p*u+b)*f)}}let m=new te;m.setAttribute("position",new ue(g,f)),m.setAttribute("outputDirection",new ue(v,f)),e.push(new Yt(m,null)),n>Br&&n--}return{lodMeshes:e,sizeLods:t}}function Tp(i,t,e){let n=new qe(i,t,e);return n.texture.mapping=ia,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Fr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function my(i,t,e){return new Se({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:dy,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:kc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function gy(i,t,e){return new Se({name:"SphericalGaussianBlur",defines:{SAMPLES:uy,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:kc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function wp(){return new Se({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:kc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Ap(){return new Se({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:kc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function kc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var zc=class extends qe{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Uo(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new yn(5,5,5),r=new Se({name:"CubemapFromEquirect",uniforms:Gs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Rn,blending:jn});r.uniforms.tEquirect.value=e;let o=new Yt(s,r),a=e.minFilter;return e.minFilter===ys&&(e.minFilter=hn),new Xl(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}};function _y(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?o(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===Zl||f===$l)if(t.has(u)){let g=t.get(u).texture;return a(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let v=new zc(g.height);return v.fromEquirectangularTexture(i,u),t.set(u,v),u.addEventListener("dispose",c),a(v.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){let f=u.mapping,g=f===Zl||f===$l,v=f===xs||f===Vs;if(g||v){let m=e.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new Hr(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let M=u.image;return g&&M&&M.height>0||v&&M&&l(M)?(n===null&&(n=new Hr(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function a(u,f){return f===Zl?u.mapping=xs:f===$l&&(u.mapping=Vs),u}function l(u){let f=0,g=6;for(let v=0;v<g;v++)u[v]!==void 0&&f++;return f===g}function c(u){let f=u.target;f.removeEventListener("dispose",c);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function xy(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Ns("WebGLRenderer: "+n+" extension not supported."),s}}}function yy(i,t,e,n){let s={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete s[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)t.update(u[f],i.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,g=d.attributes.position,v=0;if(g===void 0)return;if(f!==null){let M=f.array;v=f.version;for(let I=0,x=M.length;I<x;I+=3){let b=M[I+0],E=M[I+1],R=M[I+2];u.push(b,E,E,R,R,b)}}else{let M=g.array;v=g.version;for(let I=0,x=M.length/3-1;I<x;I+=3){let b=I+0,E=I+1,R=I+2;u.push(b,E,E,R,R,b)}}let m=new(g.count>=65535?Io:Po)(u,1);m.version=v;let p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function vy(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*o),e.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*o,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let v=0;for(let m=0;m<f;m++)v+=u[m];e.update(v,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function My(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Ot("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Sy(i,t,e){let n=new WeakMap,s=new Le;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let T=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],I=0;f===!0&&(I=1),g===!0&&(I=2),v===!0&&(I=3);let x=a.attributes.position.count*I,b=1;x>t.maxTextureSize&&(b=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let E=new Float32Array(x*b*4*d),R=new Co(E,x,b,d);R.type=Qn,R.needsUpdate=!0;let _=I*4;for(let A=0;A<d;A++){let w=m[A],P=p[A],D=M[A],L=x*b*4*A;for(let U=0;U<w.count;U++){let z=U*_;f===!0&&(s.fromBufferAttribute(w,U),E[L+z+0]=s.x,E[L+z+1]=s.y,E[L+z+2]=s.z,E[L+z+3]=0),g===!0&&(s.fromBufferAttribute(P,U),E[L+z+4]=s.x,E[L+z+5]=s.y,E[L+z+6]=s.z,E[L+z+7]=0),v===!0&&(s.fromBufferAttribute(D,U),E[L+z+8]=s.x,E[L+z+9]=s.y,E[L+z+10]=s.z,E[L+z+11]=D.itemSize===4?s.w:1)}}u={count:d,texture:R,size:new lt(x,b)},n.set(a,u),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function by(i,t,e,n,s){let r=new WeakMap;function o(c){let h=s.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var Ey={[Jo]:"LINEAR_TONE_MAPPING",[jo]:"REINHARD_TONE_MAPPING",[Qo]:"CINEON_TONE_MAPPING",[ta]:"ACES_FILMIC_TONE_MAPPING",[na]:"AGX_TONE_MAPPING",[ks]:"NEUTRAL_TONE_MAPPING",[ea]:"CUSTOM_TONE_MAPPING"};function Ty(i,t,e,n,s,r){let o=new qe(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new te;c.setAttribute("position",new zt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new zt([0,2,0,0,2,0],2));let h=new Cr({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Yt(c,h),u=new ms(-1,1,1,-1,0,1),f=null,g=null,v=!1,m,p=null,M=[],I=!1;this.setSize=function(x,b){o.setSize(x,b),a!==null&&a.setSize(x,b),l!==null&&l.setSize(x,b);for(let E=0;E<M.length;E++){let R=M[E];R.setSize&&R.setSize(x,b)}},this.setEffects=function(x){M=x,I=M.length>0&&M[0].isRenderPass===!0;let b=o.width,E=o.height;M.length>0&&a===null&&(a=new qe(b,E,{type:dn,depthBuffer:!1,stencilBuffer:!1}),l=new qe(b,E,{type:dn,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<M.length;R++){let _=M[R];_.setSize&&_.setSize(b,E)}},this.begin=function(x,b){if(v||x.toneMapping===_i&&M.length===0)return!1;if(p=b,b!==null){let E=b.width,R=b.height;(o.width!==E||o.height!==R)&&this.setSize(E,R)}return I===!1&&x.setRenderTarget(o),m=x.toneMapping,x.toneMapping=_i,!0},this.hasRenderPass=function(){return I},this.end=function(x,b){x.toneMapping=m,v=!0;let E=o,R=a;for(let _=0;_<M.length;_++){let T=M[_];T.enabled!==!1&&(T.render(x,R,E,b),T.needsSwap!==!1&&(E=R,R=R===a?l:a))}if(f!==x.outputColorSpace||g!==x.toneMapping){f=x.outputColorSpace,g=x.toneMapping,h.defines={},$t.getTransfer(f)===le&&(h.defines.SRGB_TRANSFER="");let _=Ey[g];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=E.texture,x.setRenderTarget(p),x.render(d,u),p=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var Yp=new An,Vu=new ls(1,1),Zp=new Co,$p=new Al,Kp=new Uo,Rp=[],Cp=[],Pp=new Float32Array(16),Ip=new Float32Array(9),Lp=new Float32Array(4);function kr(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Rp[s];if(r===void 0&&(r=new Float32Array(s),Rp[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ze(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function $e(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Vc(i,t){let e=Cp[t];e===void 0&&(e=new Int32Array(t),Cp[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function wy(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Ay(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;i.uniform2fv(this.addr,t),$e(e,t)}}function Ry(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ze(e,t))return;i.uniform3fv(this.addr,t),$e(e,t)}}function Cy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;i.uniform4fv(this.addr,t),$e(e,t)}}function Py(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ze(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),$e(e,t)}else{if(Ze(e,n))return;Lp.set(n),i.uniformMatrix2fv(this.addr,!1,Lp),$e(e,n)}}function Iy(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ze(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),$e(e,t)}else{if(Ze(e,n))return;Ip.set(n),i.uniformMatrix3fv(this.addr,!1,Ip),$e(e,n)}}function Ly(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ze(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),$e(e,t)}else{if(Ze(e,n))return;Pp.set(n),i.uniformMatrix4fv(this.addr,!1,Pp),$e(e,n)}}function Dy(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Ny(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;i.uniform2iv(this.addr,t),$e(e,t)}}function Uy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ze(e,t))return;i.uniform3iv(this.addr,t),$e(e,t)}}function Oy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;i.uniform4iv(this.addr,t),$e(e,t)}}function Fy(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function By(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;i.uniform2uiv(this.addr,t),$e(e,t)}}function zy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ze(e,t))return;i.uniform3uiv(this.addr,t),$e(e,t)}}function Hy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;i.uniform4uiv(this.addr,t),$e(e,t)}}function ky(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Vu.compareFunction=e.isReversedDepthBuffer()?Oc:Uc,r=Vu):r=Yp,e.setTexture2D(t||r,s)}function Vy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||$p,s)}function Gy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Kp,s)}function Wy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Zp,s)}function Xy(i){switch(i){case 5126:return wy;case 35664:return Ay;case 35665:return Ry;case 35666:return Cy;case 35674:return Py;case 35675:return Iy;case 35676:return Ly;case 5124:case 35670:return Dy;case 35667:case 35671:return Ny;case 35668:case 35672:return Uy;case 35669:case 35673:return Oy;case 5125:return Fy;case 36294:return By;case 36295:return zy;case 36296:return Hy;case 35678:case 36198:case 36298:case 36306:case 35682:return ky;case 35679:case 36299:case 36307:return Vy;case 35680:case 36300:case 36308:case 36293:return Gy;case 36289:case 36303:case 36311:case 36292:return Wy}}function qy(i,t){i.uniform1fv(this.addr,t)}function Yy(i,t){let e=kr(t,this.size,2);i.uniform2fv(this.addr,e)}function Zy(i,t){let e=kr(t,this.size,3);i.uniform3fv(this.addr,e)}function $y(i,t){let e=kr(t,this.size,4);i.uniform4fv(this.addr,e)}function Ky(i,t){let e=kr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Jy(i,t){let e=kr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function jy(i,t){let e=kr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Qy(i,t){i.uniform1iv(this.addr,t)}function tv(i,t){i.uniform2iv(this.addr,t)}function ev(i,t){i.uniform3iv(this.addr,t)}function nv(i,t){i.uniform4iv(this.addr,t)}function iv(i,t){i.uniform1uiv(this.addr,t)}function sv(i,t){i.uniform2uiv(this.addr,t)}function rv(i,t){i.uniform3uiv(this.addr,t)}function ov(i,t){i.uniform4uiv(this.addr,t)}function av(i,t,e){let n=this.cache,s=t.length,r=Vc(e,s);Ze(n,r)||(i.uniform1iv(this.addr,r),$e(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Vu:o=Yp;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function lv(i,t,e){let n=this.cache,s=t.length,r=Vc(e,s);Ze(n,r)||(i.uniform1iv(this.addr,r),$e(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||$p,r[o])}function cv(i,t,e){let n=this.cache,s=t.length,r=Vc(e,s);Ze(n,r)||(i.uniform1iv(this.addr,r),$e(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Kp,r[o])}function hv(i,t,e){let n=this.cache,s=t.length,r=Vc(e,s);Ze(n,r)||(i.uniform1iv(this.addr,r),$e(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Zp,r[o])}function uv(i){switch(i){case 5126:return qy;case 35664:return Yy;case 35665:return Zy;case 35666:return $y;case 35674:return Ky;case 35675:return Jy;case 35676:return jy;case 5124:case 35670:return Qy;case 35667:case 35671:return tv;case 35668:case 35672:return ev;case 35669:case 35673:return nv;case 5125:return iv;case 36294:return sv;case 36295:return rv;case 36296:return ov;case 35678:case 36198:case 36298:case 36306:case 35682:return av;case 35679:case 36299:case 36307:return lv;case 35680:case 36300:case 36308:case 36293:return cv;case 36289:case 36303:case 36311:case 36292:return hv}}var Gu=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Xy(e.type)}},Wu=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=uv(e.type)}},Xu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Hu=/(\w+)(\])?(\[|\.)?/g;function Dp(i,t){i.seq.push(t),i.map[t.id]=t}function dv(i,t,e){let n=i.name,s=n.length;for(Hu.lastIndex=0;;){let r=Hu.exec(n),o=Hu.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Dp(e,c===void 0?new Gu(a,i,t):new Wu(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new Xu(a),Dp(e,d)),e=d}}}var zr=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);dv(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Np(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var fv=37297,pv=0;function mv(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Up=new Ht;function gv(i){$t._getMatrix(Up,$t.workingColorSpace,i);let t=`mat3( ${Up.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(i)){case wo:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return Lt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Op(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+mv(i.getShaderSource(t),a)}else return r}function _v(i,t){let e=gv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var xv={[Jo]:"Linear",[jo]:"Reinhard",[Qo]:"Cineon",[ta]:"ACESFilmic",[na]:"AgX",[ks]:"Neutral",[ea]:"Custom"};function yv(i,t){let e=xv[t];return e===void 0?(Lt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Bc=new C;function vv(){$t.getLuminanceCoefficients(Bc);let i=Bc.x.toFixed(4),t=Bc.y.toFixed(4),e=Bc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Mv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fa).join(`
`)}function Sv(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function bv(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function fa(i){return i!==""}function Fp(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Bp(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Ev=/^[ \t]*#include +<([\w\d./]+)>/gm;function qu(i){return i.replace(Ev,wv)}var Tv=new Map;function wv(i,t){let e=qt[t];if(e===void 0){let n=Tv.get(t);if(n!==void 0)e=qt[n],Lt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return qu(e)}var Av=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zp(i){return i.replace(Av,Rv)}function Rv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Hp(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Cv={[Ko]:"SHADOWMAP_TYPE_PCF",[Lr]:"SHADOWMAP_TYPE_VSM"};function Pv(i){return Cv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Iv={[xs]:"ENVMAP_TYPE_CUBE",[Vs]:"ENVMAP_TYPE_CUBE",[ia]:"ENVMAP_TYPE_CUBE_UV"};function Lv(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Iv[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Dv={[Vs]:"ENVMAP_MODE_REFRACTION"};function Nv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Dv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Uv={[gu]:"ENVMAP_BLENDING_MULTIPLY",[sp]:"ENVMAP_BLENDING_MIX",[rp]:"ENVMAP_BLENDING_ADD"};function Ov(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Uv[i.combine]||"ENVMAP_BLENDING_NONE"}function Fv(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Bv(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Pv(e),c=Lv(e),h=Nv(e),d=Ov(e),u=Fv(e),f=Mv(e),g=Sv(r),v=s.createProgram(),m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(fa).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(fa).join(`
`),p.length>0&&(p+=`
`)):(m=[Hp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fa).join(`
`),p=[Hp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==_i?"#define TONE_MAPPING":"",e.toneMapping!==_i?qt.tonemapping_pars_fragment:"",e.toneMapping!==_i?yv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,_v("linearToOutputTexel",e.outputColorSpace),vv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(fa).join(`
`)),o=qu(o),o=Fp(o,e),o=Bp(o,e),a=qu(a),a=Fp(a,e),a=Bp(a,e),o=zp(o),a=zp(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Tu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Tu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let I=M+m+o,x=M+p+a,b=Np(s,s.VERTEX_SHADER,I),E=Np(s,s.FRAGMENT_SHADER,x);s.attachShader(v,b),s.attachShader(v,E),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(w){if(i.debug.checkShaderErrors){let P=s.getProgramInfoLog(v)||"",D=s.getShaderInfoLog(b)||"",L=s.getShaderInfoLog(E)||"",U=P.trim(),z=D.trim(),V=L.trim(),X=!0,H=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,b,E);else{let Y=Op(s,b,"vertex"),$=Op(s,E,"fragment");Ot("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+U+`
`+Y+`
`+$)}else U!==""?Lt("WebGLProgram: Program Info Log:",U):(z===""||V==="")&&(H=!1);H&&(w.diagnostics={runnable:X,programLog:U,vertexShader:{log:z,prefix:m},fragmentShader:{log:V,prefix:p}})}s.deleteShader(b),s.deleteShader(E),_=new zr(s,v),T=bv(s,v)}let _;this.getUniforms=function(){return _===void 0&&R(this),_};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let A=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(v,fv)),A},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=pv++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=b,this.fragmentShader=E,this}var zv=0,Yu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Zu(t),e.set(t,n)),n}},Zu=class{constructor(t){this.id=zv++,this.code=t,this.usedTimes=0}};function Hv(i){return i===Ms||i===ca||i===ha}function kv(i,t,e,n,s,r){let o=new br,a=new Yu,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function v(_,T,A,w,P,D){let L=w.fog,U=P.geometry,z=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?w.environment:null,V=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,X=t.get(_.envMap||z,V),H=X&&X.mapping===ia?X.image.height:null,Y=f[_.type];_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&Lt("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));let $=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,ht=$!==void 0?$.length:0,ot=0;U.morphAttributes.position!==void 0&&(ot=1),U.morphAttributes.normal!==void 0&&(ot=2),U.morphAttributes.color!==void 0&&(ot=3);let Rt,Bt,Zt,K;if(Y){let be=Oi[Y];Rt=be.vertexShader,Bt=be.fragmentShader}else{Rt=_.vertexShader,Bt=_.fragmentShader;let be=a.getVertexShaderStage(_),pe=a.getFragmentShaderStage(_);a.update(_,be,pe),Zt=be.id,K=pe.id}let et=i.getRenderTarget(),Mt=i.state.buffers.depth.getReversed(),it=P.isInstancedMesh===!0,j=P.isBatchedMesh===!0,Ut=!!_.map,ae=!!_.matcap,Ft=!!X,ie=!!_.aoMap,fe=!!_.lightMap,Qt=!!_.bumpMap&&_.wireframe===!1,Pe=!!_.normalMap,en=!!_.displacementMap,Ln=!!_.emissiveMap,Fe=!!_.metalnessMap,Ge=!!_.roughnessMap,B=_.anisotropy>0,pn=_.clearcoat>0,ge=_.dispersion>0,N=_.retroreflectivity>0,y=_.iridescence>0,k=_.sheen>0,q=_.transmission>0,J=B&&!!_.anisotropyMap,at=pn&&!!_.clearcoatMap,ct=pn&&!!_.clearcoatNormalMap,Q=pn&&!!_.clearcoatRoughnessMap,nt=y&&!!_.iridescenceMap,ut=y&&!!_.iridescenceThicknessMap,Ct=k&&!!_.sheenColorMap,gt=k&&!!_.sheenRoughnessMap,dt=!!_.specularMap,Pt=!!_.specularColorMap,Nt=!!_.specularIntensityMap,Gt=q&&!!_.transmissionMap,F=q&&!!_.thicknessMap,ft=!!_.gradientMap,tt=!!_.alphaMap,pt=_.alphaTest>0,vt=!!_.alphaHash,st=!!_.extensions,It=_i;_.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(It=i.toneMapping);let wt={shaderID:Y,shaderType:_.type,shaderName:_.name,vertexShader:Rt,fragmentShader:Bt,defines:_.defines,customVertexShaderID:Zt,customFragmentShaderID:K,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:j,batchingColor:j&&P._colorsTexture!==null,instancing:it,instancingColor:it&&P.instanceColor!==null,instancingMorph:it&&P.morphTexture!==null,outputColorSpace:et===null?i.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:$t.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Ut,matcap:ae,envMap:Ft,envMapMode:Ft&&X.mapping,envMapCubeUVHeight:H,aoMap:ie,lightMap:fe,bumpMap:Qt,normalMap:Pe,displacementMap:en,emissiveMap:Ln,normalMapObjectSpace:Pe&&_.normalMapType===lp,normalMapTangentSpace:Pe&&_.normalMapType===Nc,packedNormalMap:Pe&&_.normalMapType===Nc&&Hv(_.normalMap.format),metalnessMap:Fe,roughnessMap:Ge,anisotropy:B,anisotropyMap:J,clearcoat:pn,clearcoatMap:at,clearcoatNormalMap:ct,clearcoatRoughnessMap:Q,dispersion:ge,retroreflection:N,iridescence:y,iridescenceMap:nt,iridescenceThicknessMap:ut,sheen:k,sheenColorMap:Ct,sheenRoughnessMap:gt,specularMap:dt,specularColorMap:Pt,specularIntensityMap:Nt,transmission:q,transmissionMap:Gt,thicknessMap:F,gradientMap:ft,opaque:_.transparent===!1&&_.blending===Dr&&_.alphaToCoverage===!1,alphaMap:tt,alphaTest:pt,alphaHash:vt,combine:_.combine,mapUv:Ut&&g(_.map.channel),aoMapUv:ie&&g(_.aoMap.channel),lightMapUv:fe&&g(_.lightMap.channel),bumpMapUv:Qt&&g(_.bumpMap.channel),normalMapUv:Pe&&g(_.normalMap.channel),displacementMapUv:en&&g(_.displacementMap.channel),emissiveMapUv:Ln&&g(_.emissiveMap.channel),metalnessMapUv:Fe&&g(_.metalnessMap.channel),roughnessMapUv:Ge&&g(_.roughnessMap.channel),anisotropyMapUv:J&&g(_.anisotropyMap.channel),clearcoatMapUv:at&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:ct&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:ut&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:gt&&g(_.sheenRoughnessMap.channel),specularMapUv:dt&&g(_.specularMap.channel),specularColorMapUv:Pt&&g(_.specularColorMap.channel),specularIntensityMapUv:Nt&&g(_.specularIntensityMap.channel),transmissionMapUv:Gt&&g(_.transmissionMap.channel),thicknessMapUv:F&&g(_.thicknessMap.channel),alphaMapUv:tt&&g(_.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(Pe||B),vertexNormals:!!U.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!U.attributes.uv&&(Ut||tt),fog:!!L,useFog:_.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||U.attributes.normal===void 0&&Pe===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Mt,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:ht,morphTextureStride:ot,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:D.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:It,decodeVideoTexture:Ut&&_.map.isVideoTexture===!0&&$t.getTransfer(_.map.colorSpace)===le,decodeVideoTextureEmissive:Ln&&_.emissiveMap.isVideoTexture===!0&&$t.getTransfer(_.emissiveMap.colorSpace)===le,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Be,flipSided:_.side===Rn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:st&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(st&&_.extensions.multiDraw===!0||j)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return wt.vertexUv1s=l.has(1),wt.vertexUv2s=l.has(2),wt.vertexUv3s=l.has(3),l.clear(),wt}function m(_){let T=[];if(_.shaderID?T.push(_.shaderID):(T.push(_.customVertexShaderID),T.push(_.customFragmentShaderID)),_.defines!==void 0)for(let A in _.defines)T.push(A),T.push(_.defines[A]);return _.isRawShaderMaterial===!1&&(p(T,_),M(T,_),T.push(i.outputColorSpace)),T.push(_.customProgramCacheKey),T.join()}function p(_,T){_.push(T.precision),_.push(T.outputColorSpace),_.push(T.envMapMode),_.push(T.envMapCubeUVHeight),_.push(T.mapUv),_.push(T.alphaMapUv),_.push(T.lightMapUv),_.push(T.aoMapUv),_.push(T.bumpMapUv),_.push(T.normalMapUv),_.push(T.displacementMapUv),_.push(T.emissiveMapUv),_.push(T.metalnessMapUv),_.push(T.roughnessMapUv),_.push(T.anisotropyMapUv),_.push(T.clearcoatMapUv),_.push(T.clearcoatNormalMapUv),_.push(T.clearcoatRoughnessMapUv),_.push(T.iridescenceMapUv),_.push(T.iridescenceThicknessMapUv),_.push(T.sheenColorMapUv),_.push(T.sheenRoughnessMapUv),_.push(T.specularMapUv),_.push(T.specularColorMapUv),_.push(T.specularIntensityMapUv),_.push(T.transmissionMapUv),_.push(T.thicknessMapUv),_.push(T.combine),_.push(T.fogExp2),_.push(T.sizeAttenuation),_.push(T.morphTargetsCount),_.push(T.morphAttributeCount),_.push(T.numSunLights),_.push(T.numDirLights),_.push(T.numPointLights),_.push(T.numSpotLights),_.push(T.numSpotLightMaps),_.push(T.numHemiLights),_.push(T.numRectAreaLights),_.push(T.numSunLightShadows),_.push(T.numDirLightShadows),_.push(T.numPointLightShadows),_.push(T.numSpotLightShadows),_.push(T.numSpotLightShadowsWithMaps),_.push(T.numLightProbes),_.push(T.shadowMapType),_.push(T.toneMapping),_.push(T.numClippingPlanes),_.push(T.numClipIntersection),_.push(T.depthPacking)}function M(_,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.retroreflection&&o.enable(24),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),T.hasPositionAttribute&&o.enable(23),_.push(o.mask)}function I(_){let T=f[_.type],A;if(T){let w=Oi[T];A=Zi.clone(w.uniforms)}else A=_.uniforms;return A}function x(_,T){let A=h.get(T);return A!==void 0?++A.usedTimes:(A=new Bv(i,T,_,s),c.push(A),h.set(T,A)),A}function b(_){if(--_.usedTimes===0){let T=c.indexOf(_);c[T]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function E(_){a.remove(_)}function R(){a.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:I,acquireProgram:x,releaseProgram:b,releaseShaderCache:E,programs:c,dispose:R}}function Vv(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Gv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function kp(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Vp(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function a(u,f,g,v,m,p){let M=i[t];return M===void 0?(M={id:u.id,object:u,geometry:f,material:g,materialVariant:o(u),groupOrder:v,renderOrder:u.renderOrder,z:m,group:p},i[t]=M):(M.id=u.id,M.object=u,M.geometry=f,M.material=g,M.materialVariant=o(u),M.groupOrder=v,M.renderOrder=u.renderOrder,M.z=m,M.group=p),t++,M}function l(u,f,g,v,m,p,M){M.reversedDepth===!0&&(m=-m);let I=a(u,f,g,v,m,p);g.transmission>0?n.push(I):g.transparent===!0?s.push(I):e.push(I)}function c(u,f,g,v,m,p){let M=a(u,f,g,v,m,p);g.transmission>0?n.unshift(M):g.transparent===!0?s.unshift(M):e.unshift(M)}function h(u,f){e.length>1&&e.sort(u||Gv),n.length>1&&n.sort(f||kp),s.length>1&&s.sort(f||kp)}function d(){for(let u=t,f=i.length;u<f;u++){let g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function Wv(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Vp,i.set(n,[o])):s>=r.length?(o=new Vp,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Xv(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new C,color:new mt};break;case"SpotLight":e={position:new C,direction:new C,color:new mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new mt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new mt,groundColor:new mt};break;case"RectAreaLight":e={color:new mt,position:new C,halfWidth:new C,halfHeight:new C};break}return i[t.id]=e,e}}}function qv(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Yv=0;function Zv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function $v(i){let t=new Xv,e=qv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);let s=new C,r=new Kt,o=new Kt;function a(c){let h=0,d=0,u=0;for(let P=0;P<9;P++)n.probe[P].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,M=0,I=0,x=0,b=0,E=0,R=0,_=0,T=0,A=0;c.sort(Zv);for(let P=0,D=c.length;P<D;P++){let L=c[P],U=L.color,z=L.intensity,V=L.distance,X=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Ms?X=L.shadow.map.texture:X=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=U.r*z,d+=U.g*z,u+=U.b*z;else if(L.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(L.sh.coefficients[H],z);A++}else if(L.isSunLight){let H=t.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let Y=L.shadow,$=e.get(L);$.shadowIntensity=Y.intensity,$.shadowBias=Y.bias,$.shadowNormalBias=Y.normalBias,$.shadowRadius=Y.radius,$.shadowMapSize.copy(Y.mapSize).multiply(Y.getFrameExtents()),n.sunShadow[g]=$,n.sunShadowMap[g]=X;let ht=Y.getViewportCount();for(let ot=0;ot<ht;ot++)n.sunShadowMatrix[v+ot]=Y.getMatrix(ot),n.sunShadowCascade[v+ot]=Y._cascadeData[ot];v+=ht,g++}n.sun[f]=H,f++}else if(L.isDirectionalLight){let H=t.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let Y=L.shadow,$=e.get(L);$.shadowIntensity=Y.intensity,$.shadowBias=Y.bias,$.shadowNormalBias=Y.normalBias,$.shadowRadius=Y.radius,$.shadowMapSize=Y.mapSize,n.directionalShadow[m]=$,n.directionalShadowMap[m]=X,n.directionalShadowMatrix[m]=L.shadow.matrix,b++}n.directional[m]=H,m++}else if(L.isSpotLight){let H=t.get(L);H.position.setFromMatrixPosition(L.matrixWorld),H.color.copy(U).multiplyScalar(z),H.distance=V,H.coneCos=Math.cos(L.angle),H.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),H.decay=L.decay,n.spot[M]=H;let Y=L.shadow;if(L.map&&(n.spotLightMap[_]=L.map,_++,Y.updateMatrices(L),L.castShadow&&T++),n.spotLightMatrix[M]=Y.matrix,L.castShadow){let $=e.get(L);$.shadowIntensity=Y.intensity,$.shadowBias=Y.bias,$.shadowNormalBias=Y.normalBias,$.shadowRadius=Y.radius,$.shadowMapSize=Y.mapSize,n.spotShadow[M]=$,n.spotShadowMap[M]=X,R++}M++}else if(L.isRectAreaLight){let H=t.get(L);H.color.copy(U).multiplyScalar(z),H.halfWidth.set(L.width*.5,0,0),H.halfHeight.set(0,L.height*.5,0),n.rectArea[I]=H,I++}else if(L.isPointLight){let H=t.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),H.distance=L.distance,H.decay=L.decay,L.castShadow){let Y=L.shadow,$=e.get(L);$.shadowIntensity=Y.intensity,$.shadowBias=Y.bias,$.shadowNormalBias=Y.normalBias,$.shadowRadius=Y.radius,$.shadowMapSize=Y.mapSize,$.shadowCameraNear=Y.camera.near,$.shadowCameraFar=Y.camera.far,n.pointShadow[p]=$,n.pointShadowMap[p]=X,n.pointShadowMatrix[p]=L.shadow.matrix,E++}n.point[p]=H,p++}else if(L.isHemisphereLight){let H=t.get(L);H.skyColor.copy(L.color).multiplyScalar(z),H.groundColor.copy(L.groundColor).multiplyScalar(z),n.hemi[x]=H,x++}}I>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_t.LTC_FLOAT_1,n.rectAreaLTC2=_t.LTC_FLOAT_2):(n.rectAreaLTC1=_t.LTC_HALF_1,n.rectAreaLTC2=_t.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let w=n.hash;(w.sunLength!==f||w.directionalLength!==m||w.pointLength!==p||w.spotLength!==M||w.rectAreaLength!==I||w.hemiLength!==x||w.numSunShadows!==g||w.numDirectionalShadows!==b||w.numPointShadows!==E||w.numSpotShadows!==R||w.numSpotMaps!==_||w.numLightProbes!==A)&&(n.sun.length=f,n.directional.length=m,n.spot.length=M,n.rectArea.length=I,n.point.length=p,n.hemi.length=x,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+_-T,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,w.sunLength=f,w.directionalLength=m,w.pointLength=p,w.spotLength=M,w.rectAreaLength=I,w.hemiLength=x,w.numSunShadows=g,w.numDirectionalShadows=b,w.numPointShadows=E,w.numSpotShadows=R,w.numSpotMaps=_,w.numLightProbes=A,n.version=Yv++)}function l(c,h){let d=0,u=0,f=0,g=0,v=0,m=0,p=h.matrixWorldInverse;for(let M=0,I=c.length;M<I;M++){let x=c[M];if(x.isSunLight){let b=n.sun[d];b.direction.setFromMatrixPosition(x.matrixWorld),b.direction.transformDirection(p),d++}else if(x.isDirectionalLight){let b=n.directional[u];b.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(p),u++}else if(x.isSpotLight){let b=n.spot[g];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(p),g++}else if(x.isRectAreaLight){let b=n.rectArea[v];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(p),o.identity(),r.copy(x.matrixWorld),r.premultiply(p),o.extractRotation(r),b.halfWidth.set(x.width*.5,0,0),b.halfHeight.set(0,x.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),v++}else if(x.isPointLight){let b=n.point[f];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(p),f++}else if(x.isHemisphereLight){let b=n.hemi[m];b.direction.setFromMatrixPosition(x.matrixWorld),b.direction.transformDirection(p),m++}}}return{setup:a,setupView:l,state:n}}function Gp(i){let t=new $v(i),e=[],n=[],s=[];function r(u){d.camera=u,e.length=0,n.length=0,s.length=0}function o(u){e.push(u)}function a(u){n.push(u)}function l(u){s.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function Kv(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Gp(i),t.set(s,[a])):r>=o.length?(a=new Gp(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Jv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Qv=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],tM=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],Wp=new Kt,da=new C,ku=new C;function eM(i,t,e){let n=new Ar,s=new lt,r=new lt,o=new Le,a=new Dl,l=new Nl,c={},h=e.maxTextureSize,d={[_s]:Rn,[Rn]:_s,[Be]:Be},u=new Se({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new lt},radius:{value:4}},vertexShader:Jv,fragmentShader:jv}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new te;g.setAttribute("position",new ue(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Yt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ko;let p=this.type;this.render=function(E,R,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===zf&&(Lt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ko);let T=i.getRenderTarget(),A=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),P=i.state;P.setBlending(jn),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);let D=p!==this.type;D&&R.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(U=>U.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,U=E.length;L<U;L++){let z=E[L],V=z.shadow;if(V===void 0){Lt("WebGLShadowMap:",z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let X=V.getFrameExtents();s.multiply(X),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/X.x),s.x=r.x*X.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/X.y),s.y=r.y*X.y,V.mapSize.y=r.y));let H=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=H,V.map===null||D===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Lr){if(z.isPointLight){Lt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new qe(s.x,s.y,{format:Ms,type:dn,minFilter:hn,magFilter:hn,generateMipmaps:!1}),V.map.texture.name=z.name+".shadowMap",V.map.depthTexture=new ls(s.x,s.y,Qn),V.map.depthTexture.name=z.name+".shadowMapDepth",V.map.depthTexture.format=Pi,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=sn,V.map.depthTexture.magFilter=sn}else z.isPointLight?(V.map=new zc(s.x),V.map.depthTexture=new Ll(s.x,xi)):(V.map=new qe(s.x,s.y),V.map.depthTexture=new ls(s.x,s.y,xi)),V.map.depthTexture.name=z.name+".shadowMap",V.map.depthTexture.format=Pi,this.type===Ko?(V.map.depthTexture.compareFunction=H?Oc:Uc,V.map.depthTexture.minFilter=hn,V.map.depthTexture.magFilter=hn):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=sn,V.map.depthTexture.magFilter=sn);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==s.x||V.map.height!==s.y)&&V.map.setSize(s.x,s.y);let Y=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();z.isPointLight!==!0&&V.updateMatrices(z,_);for(let $=0;$<Y;$++){let ht=V.getCamera($);if(z.isPointLight){let ot=V.camera,Rt=V.matrix,Bt=z.distance||ot.far;Bt!==ot.far&&(ot.far=Bt,ot.updateProjectionMatrix()),da.setFromMatrixPosition(z.matrixWorld),ot.position.copy(da),ku.copy(ot.position),ku.add(Qv[$]),ot.up.copy(tM[$]),ot.lookAt(ku),ot.updateMatrixWorld(),Rt.makeTranslation(-da.x,-da.y,-da.z),Wp.multiplyMatrices(ot.projectionMatrix,ot.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Wp,ot.coordinateSystem,ot.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,$),i.clear();else{$===0&&(i.setRenderTarget(V.map),i.clear());let ot=V.getViewport($);o.set(r.x*ot.x,r.y*ot.y,r.x*ot.z,r.y*ot.w),P.viewport(o)}n=V.getFrustum($),x(R,_,ht,z,this.type)}V.isPointLightShadow!==!0&&this.type===Lr&&M(V,_),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(T,A,w)};function M(E,R){let _=t.update(v);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null?E.mapPass=new qe(s.x,s.y,{format:Ms,type:dn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(R,null,_,u,v,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(R,null,_,f,v,null)}function I(E,R,_,T){let A=null,w=_.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(w!==void 0)A=w;else if(A=_.isPointLight===!0?l:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let P=A.uuid,D=R.uuid,L=c[P];L===void 0&&(L={},c[P]=L);let U=L[D];U===void 0&&(U=A.clone(),L[D]=U,R.addEventListener("dispose",b)),A=U}if(A.visible=R.visible,A.wireframe=R.wireframe,T===Lr?A.side=R.shadowSide!==null?R.shadowSide:R.side:A.side=R.shadowSide!==null?R.shadowSide:d[R.side],A.alphaMap=R.alphaMap,A.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,A.map=R.map,A.clipShadows=R.clipShadows,A.clippingPlanes=R.clippingPlanes,A.clipIntersection=R.clipIntersection,A.displacementMap=R.displacementMap,A.displacementScale=R.displacementScale,A.displacementBias=R.displacementBias,A.wireframeLinewidth=R.wireframeLinewidth,A.linewidth=R.linewidth,_.isPointLight===!0&&A.isMeshDistanceMaterial===!0){let P=i.properties.get(A);P.light=_}return A}function x(E,R,_,T,A){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&A===Lr)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,E.matrixWorld);let D=t.update(E),L=E.material;if(Array.isArray(L)){let U=D.groups;for(let z=0,V=U.length;z<V;z++){let X=U[z],H=L[X.materialIndex];if(H&&H.visible){let Y=I(E,H,T,A);E.onBeforeShadow(i,E,R,_,D,Y,X),i.renderBufferDirect(_,null,D,Y,E,X),E.onAfterShadow(i,E,R,_,D,Y,X)}}}else if(L.visible){let U=I(E,L,T,A);E.onBeforeShadow(i,E,R,_,D,U,null),i.renderBufferDirect(_,null,D,U,E,null),E.onAfterShadow(i,E,R,_,D,U,null)}}let P=E.children;for(let D=0,L=P.length;D<L;D++)x(P[D],R,_,T,A)}function b(E){E.target.removeEventListener("dispose",b);for(let _ in c){let T=c[_],A=E.target.uuid;A in T&&(T[A].dispose(),delete T[A])}}}function nM(i,t){function e(){let F=!1,ft=new Le,tt=null,pt=new Le(0,0,0,0);return{setMask:function(vt){tt!==vt&&!F&&(i.colorMask(vt,vt,vt,vt),tt=vt)},setLocked:function(vt){F=vt},setClear:function(vt,st,It,wt,be){be===!0&&(vt*=wt,st*=wt,It*=wt),ft.set(vt,st,It,wt),pt.equals(ft)===!1&&(i.clearColor(vt,st,It,wt),pt.copy(ft))},reset:function(){F=!1,tt=null,pt.set(-1,0,0,0)}}}function n(){let F=!1,ft=!1,tt=null,pt=null,vt=null;return{setReversed:function(st){if(ft!==st){let It=t.get("EXT_clip_control");st?It.clipControlEXT(It.LOWER_LEFT_EXT,It.ZERO_TO_ONE_EXT):It.clipControlEXT(It.LOWER_LEFT_EXT,It.NEGATIVE_ONE_TO_ONE_EXT),ft=st;let wt=vt;vt=null,this.setClear(wt)}},getReversed:function(){return ft},setTest:function(st){st?et(i.DEPTH_TEST):Mt(i.DEPTH_TEST)},setMask:function(st){tt!==st&&!F&&(i.depthMask(st),tt=st)},setFunc:function(st){if(ft&&(st=yp[st]),pt!==st){switch(st){case ml:i.depthFunc(i.NEVER);break;case gl:i.depthFunc(i.ALWAYS);break;case _l:i.depthFunc(i.LESS);break;case xr:i.depthFunc(i.LEQUAL);break;case xl:i.depthFunc(i.EQUAL);break;case yl:i.depthFunc(i.GEQUAL);break;case vl:i.depthFunc(i.GREATER);break;case Ml:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pt=st}},setLocked:function(st){F=st},setClear:function(st){vt!==st&&(vt=st,ft&&(st=1-st),i.clearDepth(st))},reset:function(){F=!1,tt=null,pt=null,vt=null,ft=!1}}}function s(){let F=!1,ft=null,tt=null,pt=null,vt=null,st=null,It=null,wt=null,be=null;return{setTest:function(pe){F||(pe?et(i.STENCIL_TEST):Mt(i.STENCIL_TEST))},setMask:function(pe){ft!==pe&&!F&&(i.stencilMask(pe),ft=pe)},setFunc:function(pe,ci,Ti){(tt!==pe||pt!==ci||vt!==Ti)&&(i.stencilFunc(pe,ci,Ti),tt=pe,pt=ci,vt=Ti)},setOp:function(pe,ci,Ti){(st!==pe||It!==ci||wt!==Ti)&&(i.stencilOp(pe,ci,Ti),st=pe,It=ci,wt=Ti)},setLocked:function(pe){F=pe},setClear:function(pe){be!==pe&&(i.clearStencil(pe),be=pe)},reset:function(){F=!1,ft=null,tt=null,pt=null,vt=null,st=null,It=null,wt=null,be=null}}}let r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,g=[],v=null,m=!1,p=null,M=null,I=null,x=null,b=null,E=null,R=null,_=new mt(0,0,0),T=0,A=!1,w=null,P=null,D=null,L=null,U=null,z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,X=0,H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(H)[1]),V=X>=1):H.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),V=X>=2);let Y=null,$={},ht=i.getParameter(i.SCISSOR_BOX),ot=i.getParameter(i.VIEWPORT),Rt=new Le().fromArray(ht),Bt=new Le().fromArray(ot);function Zt(F,ft,tt,pt){let vt=new Uint8Array(4),st=i.createTexture();i.bindTexture(F,st),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let It=0;It<tt;It++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(ft,0,i.RGBA,1,1,pt,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(ft+It,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return st}let K={};K[i.TEXTURE_2D]=Zt(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=Zt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=Zt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=Zt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),et(i.DEPTH_TEST),o.setFunc(xr),Qt(!1),Pe(uu),et(i.CULL_FACE),ie(jn);function et(F){h[F]!==!0&&(i.enable(F),h[F]=!0)}function Mt(F){h[F]!==!1&&(i.disable(F),h[F]=!1)}function it(F,ft){return u[F]!==ft?(i.bindFramebuffer(F,ft),u[F]=ft,F===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ft),F===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ft),!0):!1}function j(F,ft){let tt=g,pt=!1;if(F){tt=f.get(ft),tt===void 0&&(tt=[],f.set(ft,tt));let vt=F.textures;if(tt.length!==vt.length||tt[0]!==i.COLOR_ATTACHMENT0){for(let st=0,It=vt.length;st<It;st++)tt[st]=i.COLOR_ATTACHMENT0+st;tt.length=vt.length,pt=!0}}else tt[0]!==i.BACK&&(tt[0]=i.BACK,pt=!0);pt&&i.drawBuffers(tt)}function Ut(F){return v!==F?(i.useProgram(F),v=F,!0):!1}let ae={[Hs]:i.FUNC_ADD,[kf]:i.FUNC_SUBTRACT,[Vf]:i.FUNC_REVERSE_SUBTRACT};ae[Gf]=i.MIN,ae[Wf]=i.MAX;let Ft={[Xf]:i.ZERO,[qf]:i.ONE,[Yf]:i.SRC_COLOR,[pu]:i.SRC_ALPHA,[Qf]:i.SRC_ALPHA_SATURATE,[Jf]:i.DST_COLOR,[$f]:i.DST_ALPHA,[Zf]:i.ONE_MINUS_SRC_COLOR,[mu]:i.ONE_MINUS_SRC_ALPHA,[jf]:i.ONE_MINUS_DST_COLOR,[Kf]:i.ONE_MINUS_DST_ALPHA,[tp]:i.CONSTANT_COLOR,[ep]:i.ONE_MINUS_CONSTANT_COLOR,[np]:i.CONSTANT_ALPHA,[ip]:i.ONE_MINUS_CONSTANT_ALPHA};function ie(F,ft,tt,pt,vt,st,It,wt,be,pe){if(F===jn){m===!0&&(Mt(i.BLEND),m=!1);return}if(m===!1&&(et(i.BLEND),m=!0),F!==Hf){if(F!==p||pe!==A){if((M!==Hs||b!==Hs)&&(i.blendEquation(i.FUNC_ADD),M=Hs,b=Hs),pe)switch(F){case Dr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ne:i.blendFunc(i.ONE,i.ONE);break;case du:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case fu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ot("WebGLState: Invalid blending: ",F);break}else switch(F){case Dr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ne:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case du:Ot("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case fu:Ot("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ot("WebGLState: Invalid blending: ",F);break}I=null,x=null,E=null,R=null,_.set(0,0,0),T=0,p=F,A=pe}return}vt=vt||ft,st=st||tt,It=It||pt,(ft!==M||vt!==b)&&(i.blendEquationSeparate(ae[ft],ae[vt]),M=ft,b=vt),(tt!==I||pt!==x||st!==E||It!==R)&&(i.blendFuncSeparate(Ft[tt],Ft[pt],Ft[st],Ft[It]),I=tt,x=pt,E=st,R=It),(wt.equals(_)===!1||be!==T)&&(i.blendColor(wt.r,wt.g,wt.b,be),_.copy(wt),T=be),p=F,A=!1}function fe(F,ft){F.side===Be?Mt(i.CULL_FACE):et(i.CULL_FACE);let tt=F.side===Rn;ft&&(tt=!tt),Qt(tt),F.blending===Dr&&F.transparent===!1?ie(jn):ie(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);let pt=F.stencilWrite;a.setTest(pt),pt&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Ln(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?et(i.SAMPLE_ALPHA_TO_COVERAGE):Mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Qt(F){w!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),w=F)}function Pe(F){F!==Ff?(et(i.CULL_FACE),F!==P&&(F===uu?i.cullFace(i.BACK):F===Bf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Mt(i.CULL_FACE),P=F}function en(F){F!==D&&(V&&i.lineWidth(F),D=F)}function Ln(F,ft,tt){F?(et(i.POLYGON_OFFSET_FILL),(L!==ft||U!==tt)&&(L=ft,U=tt,o.getReversed()&&(ft=-ft),i.polygonOffset(ft,tt))):Mt(i.POLYGON_OFFSET_FILL)}function Fe(F){F?et(i.SCISSOR_TEST):Mt(i.SCISSOR_TEST)}function Ge(F){F===void 0&&(F=i.TEXTURE0+z-1),Y!==F&&(i.activeTexture(F),Y=F)}function B(F,ft,tt){tt===void 0&&(Y===null?tt=i.TEXTURE0+z-1:tt=Y);let pt=$[tt];pt===void 0&&(pt={type:void 0,texture:void 0},$[tt]=pt),(pt.type!==F||pt.texture!==ft)&&(Y!==tt&&(i.activeTexture(tt),Y=tt),i.bindTexture(F,ft||K[F]),pt.type=F,pt.texture=ft)}function pn(){let F=$[Y];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function ge(){try{i.compressedTexImage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function N(){try{i.compressedTexImage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function y(){try{i.texSubImage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function k(){try{i.texSubImage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function J(){try{i.compressedTexSubImage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function at(){try{i.texStorage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function ct(){try{i.texStorage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function Q(){try{i.texImage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function nt(){try{i.texImage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function ut(F){return d[F]!==void 0?d[F]:i.getParameter(F)}function Ct(F,ft){d[F]!==ft&&(i.pixelStorei(F,ft),d[F]=ft)}function gt(F){Rt.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),Rt.copy(F))}function dt(F){Bt.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),Bt.copy(F))}function Pt(F,ft){let tt=c.get(ft);tt===void 0&&(tt=new WeakMap,c.set(ft,tt));let pt=tt.get(F);pt===void 0&&(pt=i.getUniformBlockIndex(ft,F.name),tt.set(F,pt))}function Nt(F,ft){let pt=c.get(ft).get(F);l.get(ft)!==pt&&(i.uniformBlockBinding(ft,pt,F.__bindingPointIndex),l.set(ft,pt))}function Gt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},Y=null,$={},u={},f=new WeakMap,g=[],v=null,m=!1,p=null,M=null,I=null,x=null,b=null,E=null,R=null,_=new mt(0,0,0),T=0,A=!1,w=null,P=null,D=null,L=null,U=null,Rt.set(0,0,i.canvas.width,i.canvas.height),Bt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:et,disable:Mt,bindFramebuffer:it,drawBuffers:j,useProgram:Ut,setBlending:ie,setMaterial:fe,setFlipSided:Qt,setCullFace:Pe,setLineWidth:en,setPolygonOffset:Ln,setScissorTest:Fe,activeTexture:Ge,bindTexture:B,unbindTexture:pn,compressedTexImage2D:ge,compressedTexImage3D:N,texImage2D:Q,texImage3D:nt,pixelStorei:Ct,getParameter:ut,updateUBOMapping:Pt,uniformBlockBinding:Nt,texStorage2D:at,texStorage3D:ct,texSubImage2D:y,texSubImage3D:k,compressedTexSubImage2D:q,compressedTexSubImage3D:J,scissor:gt,viewport:dt,reset:Gt}}function iM(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new lt,h=new WeakMap,d=new Set,u,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(N,y){return g?new OffscreenCanvas(N,y):Ao("canvas")}function m(N,y,k){let q=1,J=ge(N);if((J.width>k||J.height>k)&&(q=k/Math.max(J.width,J.height)),q<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){let at=Math.floor(q*J.width),ct=Math.floor(q*J.height);u===void 0&&(u=v(at,ct));let Q=y?v(at,ct):u;return Q.width=at,Q.height=ct,Q.getContext("2d").drawImage(N,0,0,at,ct),Lt("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+at+"x"+ct+")."),Q}else return"data"in N&&Lt("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),N;return N}function p(N){return N.generateMipmaps}function M(N){i.generateMipmap(N)}function I(N){return N.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?i.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(N,y,k,q,J,at=!1){if(N!==null){if(i[N]!==void 0)return i[N];Lt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let ct;q&&(ct=t.get("EXT_texture_norm16"),ct||Lt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=y;if(y===i.RED&&(k===i.FLOAT&&(Q=i.R32F),k===i.HALF_FLOAT&&(Q=i.R16F),k===i.UNSIGNED_BYTE&&(Q=i.R8),k===i.UNSIGNED_SHORT&&ct&&(Q=ct.R16_EXT),k===i.SHORT&&ct&&(Q=ct.R16_SNORM_EXT)),y===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(Q=i.R8UI),k===i.UNSIGNED_SHORT&&(Q=i.R16UI),k===i.UNSIGNED_INT&&(Q=i.R32UI),k===i.BYTE&&(Q=i.R8I),k===i.SHORT&&(Q=i.R16I),k===i.INT&&(Q=i.R32I)),y===i.RG&&(k===i.FLOAT&&(Q=i.RG32F),k===i.HALF_FLOAT&&(Q=i.RG16F),k===i.UNSIGNED_BYTE&&(Q=i.RG8),k===i.UNSIGNED_SHORT&&ct&&(Q=ct.RG16_EXT),k===i.SHORT&&ct&&(Q=ct.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(Q=i.RG8UI),k===i.UNSIGNED_SHORT&&(Q=i.RG16UI),k===i.UNSIGNED_INT&&(Q=i.RG32UI),k===i.BYTE&&(Q=i.RG8I),k===i.SHORT&&(Q=i.RG16I),k===i.INT&&(Q=i.RG32I)),y===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),k===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),k===i.UNSIGNED_INT&&(Q=i.RGB32UI),k===i.BYTE&&(Q=i.RGB8I),k===i.SHORT&&(Q=i.RGB16I),k===i.INT&&(Q=i.RGB32I)),y===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),k===i.UNSIGNED_INT&&(Q=i.RGBA32UI),k===i.BYTE&&(Q=i.RGBA8I),k===i.SHORT&&(Q=i.RGBA16I),k===i.INT&&(Q=i.RGBA32I)),y===i.RGB&&(k===i.UNSIGNED_SHORT&&ct&&(Q=ct.RGB16_EXT),k===i.SHORT&&ct&&(Q=ct.RGB16_SNORM_EXT),k===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(Q=i.R11F_G11F_B10F)),y===i.RGBA){let nt=at?wo:$t.getTransfer(J);k===i.FLOAT&&(Q=i.RGBA32F),k===i.HALF_FLOAT&&(Q=i.RGBA16F),k===i.UNSIGNED_BYTE&&(Q=nt===le?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT&&ct&&(Q=ct.RGBA16_EXT),k===i.SHORT&&ct&&(Q=ct.RGBA16_SNORM_EXT),k===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function b(N,y){let k;return N?y===null||y===xi||y===Ur?k=i.DEPTH24_STENCIL8:y===Qn?k=i.DEPTH32F_STENCIL8:y===Nr&&(k=i.DEPTH24_STENCIL8,Lt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===xi||y===Ur?k=i.DEPTH_COMPONENT24:y===Qn?k=i.DEPTH_COMPONENT32F:y===Nr&&(k=i.DEPTH_COMPONENT16),k}function E(N,y){return p(N)===!0||N.isFramebufferTexture&&N.minFilter!==sn&&N.minFilter!==hn?Math.log2(Math.max(y.width,y.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?y.mipmaps.length:1}function R(N){let y=N.target;y.removeEventListener("dispose",R),T(y),y.isVideoTexture&&h.delete(y),y.isHTMLTexture&&d.delete(y)}function _(N){let y=N.target;y.removeEventListener("dispose",_),w(y)}function T(N){let y=n.get(N);if(y.__webglInit===void 0)return;let k=N.source,q=f.get(k);if(q){let J=q[y.__cacheKey];J.usedTimes--,J.usedTimes===0&&A(N),Object.keys(q).length===0&&f.delete(k)}n.remove(N)}function A(N){let y=n.get(N);i.deleteTexture(y.__webglTexture);let k=N.source,q=f.get(k);delete q[y.__cacheKey],o.memory.textures--}function w(N){let y=n.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),n.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(y.__webglFramebuffer[q]))for(let J=0;J<y.__webglFramebuffer[q].length;J++)i.deleteFramebuffer(y.__webglFramebuffer[q][J]);else i.deleteFramebuffer(y.__webglFramebuffer[q]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[q])}else{if(Array.isArray(y.__webglFramebuffer))for(let q=0;q<y.__webglFramebuffer.length;q++)i.deleteFramebuffer(y.__webglFramebuffer[q]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let q=0;q<y.__webglColorRenderbuffer.length;q++)y.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[q]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let k=N.textures;for(let q=0,J=k.length;q<J;q++){let at=n.get(k[q]);at.__webglTexture&&(i.deleteTexture(at.__webglTexture),o.memory.textures--),n.remove(k[q])}n.remove(N)}let P=0;function D(){P=0}function L(){return P}function U(N){P=N}function z(){let N=P;return N>=s.maxTextures&&Lt("WebGLTextures: Trying to use "+(N+1)+" texture units while this GPU supports only "+s.maxTextures),P+=1,N}function V(N){let y=[];return y.push(N.wrapS),y.push(N.wrapT),y.push(N.wrapR||0),y.push(N.magFilter),y.push(N.minFilter),y.push(N.anisotropy),y.push(N.internalFormat),y.push(N.format),y.push(N.type),y.push(N.generateMipmaps),y.push(N.premultiplyAlpha),y.push(N.flipY),y.push(N.unpackAlignment),y.push(N.colorSpace),y.join()}function X(N,y){let k=n.get(N);if(N.isVideoTexture&&B(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&k.__version!==N.version){let q=N.image;if(q===null)Lt("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Lt("WebGLRenderer: Texture marked for update but image is incomplete");else{Mt(k,N,y);return}}else N.isExternalTexture&&(k.__webglTexture=N.sourceTexture?N.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+y)}function H(N,y){let k=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&k.__version!==N.version){Mt(k,N,y);return}else N.isExternalTexture&&(k.__webglTexture=N.sourceTexture?N.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+y)}function Y(N,y){let k=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&k.__version!==N.version){Mt(k,N,y);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+y)}function $(N,y){let k=n.get(N);if(N.isCubeDepthTexture!==!0&&N.version>0&&k.__version!==N.version){it(k,N,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+y)}let ht={[Sl]:i.REPEAT,[Ci]:i.CLAMP_TO_EDGE,[bl]:i.MIRRORED_REPEAT},ot={[sn]:i.NEAREST,[op]:i.NEAREST_MIPMAP_NEAREST,[sa]:i.NEAREST_MIPMAP_LINEAR,[hn]:i.LINEAR,[Kl]:i.LINEAR_MIPMAP_NEAREST,[ys]:i.LINEAR_MIPMAP_LINEAR},Rt={[hp]:i.NEVER,[mp]:i.ALWAYS,[up]:i.LESS,[Uc]:i.LEQUAL,[dp]:i.EQUAL,[Oc]:i.GEQUAL,[fp]:i.GREATER,[pp]:i.NOTEQUAL};function Bt(N,y){if(y.type===Qn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===hn||y.magFilter===Kl||y.magFilter===sa||y.magFilter===ys||y.minFilter===hn||y.minFilter===Kl||y.minFilter===sa||y.minFilter===ys)&&Lt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(N,i.TEXTURE_WRAP_S,ht[y.wrapS]),i.texParameteri(N,i.TEXTURE_WRAP_T,ht[y.wrapT]),(N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY)&&i.texParameteri(N,i.TEXTURE_WRAP_R,ht[y.wrapR]),i.texParameteri(N,i.TEXTURE_MAG_FILTER,ot[y.magFilter]),i.texParameteri(N,i.TEXTURE_MIN_FILTER,ot[y.minFilter]),y.compareFunction&&(i.texParameteri(N,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(N,i.TEXTURE_COMPARE_FUNC,Rt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===sn||y.minFilter!==sa&&y.minFilter!==ys||y.type===Qn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let k=t.get("EXT_texture_filter_anisotropic");i.texParameterf(N,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Zt(N,y){let k=!1;N.__webglInit===void 0&&(N.__webglInit=!0,y.addEventListener("dispose",R));let q=y.source,J=f.get(q);J===void 0&&(J={},f.set(q,J));let at=V(y);if(at!==N.__cacheKey){J[at]===void 0&&(J[at]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,k=!0),J[at].usedTimes++;let ct=J[N.__cacheKey];ct!==void 0&&(J[N.__cacheKey].usedTimes--,ct.usedTimes===0&&A(y)),N.__cacheKey=at,N.__webglTexture=J[at].texture}return k}function K(N,y,k){return Math.floor(Math.floor(N/k)/y)}function et(N,y,k,q){let at=N.updateRanges;if(at.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,k,q,y.data);else{at.sort((Ct,gt)=>Ct.start-gt.start);let ct=0;for(let Ct=1;Ct<at.length;Ct++){let gt=at[ct],dt=at[Ct],Pt=gt.start+gt.count,Nt=K(dt.start,y.width,4),Gt=K(gt.start,y.width,4);dt.start<=Pt+1&&Nt===Gt&&K(dt.start+dt.count-1,y.width,4)===Nt?gt.count=Math.max(gt.count,dt.start+dt.count-gt.start):(++ct,at[ct]=dt)}at.length=ct+1;let Q=e.getParameter(i.UNPACK_ROW_LENGTH),nt=e.getParameter(i.UNPACK_SKIP_PIXELS),ut=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let Ct=0,gt=at.length;Ct<gt;Ct++){let dt=at[Ct],Pt=Math.floor(dt.start/4),Nt=Math.ceil(dt.count/4),Gt=Pt%y.width,F=Math.floor(Pt/y.width),ft=Nt,tt=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Gt),e.pixelStorei(i.UNPACK_SKIP_ROWS,F),e.texSubImage2D(i.TEXTURE_2D,0,Gt,F,ft,tt,k,q,y.data)}N.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Q),e.pixelStorei(i.UNPACK_SKIP_PIXELS,nt),e.pixelStorei(i.UNPACK_SKIP_ROWS,ut)}}function Mt(N,y,k){let q=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(q=i.TEXTURE_3D);let J=Zt(N,y),at=y.source;e.bindTexture(q,N.__webglTexture,i.TEXTURE0+k);let ct=n.get(at);if(at.version!==ct.__version||J===!0){if(e.activeTexture(i.TEXTURE0+k),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let tt=$t.getPrimaries($t.workingColorSpace),pt=y.colorSpace===Yi?null:$t.getPrimaries(y.colorSpace),vt=y.colorSpace===Yi||tt===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt)}e.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let nt=m(y.image,!1,s.maxTextureSize);nt=pn(y,nt);let ut=r.convert(y.format,y.colorSpace),Ct=r.convert(y.type),gt=x(y.internalFormat,ut,Ct,y.normalized,y.colorSpace,y.isVideoTexture);Bt(q,y);let dt,Pt=y.mipmaps,Nt=y.isVideoTexture!==!0,Gt=ct.__version===void 0||J===!0,F=at.dataReady,ft=E(y,nt);if(y.isDepthTexture)gt=b(y.format===vs,y.type),Gt&&(Nt?e.texStorage2D(i.TEXTURE_2D,1,gt,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,gt,nt.width,nt.height,0,ut,Ct,null));else if(y.isDataTexture)if(Pt.length>0){Nt&&Gt&&e.texStorage2D(i.TEXTURE_2D,ft,gt,Pt[0].width,Pt[0].height);for(let tt=0,pt=Pt.length;tt<pt;tt++)dt=Pt[tt],Nt?F&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,dt.width,dt.height,ut,Ct,dt.data):e.texImage2D(i.TEXTURE_2D,tt,gt,dt.width,dt.height,0,ut,Ct,dt.data);y.generateMipmaps=!1}else Nt?(Gt&&e.texStorage2D(i.TEXTURE_2D,ft,gt,nt.width,nt.height),F&&et(y,nt,ut,Ct)):e.texImage2D(i.TEXTURE_2D,0,gt,nt.width,nt.height,0,ut,Ct,nt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Nt&&Gt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,gt,Pt[0].width,Pt[0].height,nt.depth);for(let tt=0,pt=Pt.length;tt<pt;tt++)if(dt=Pt[tt],y.format!==ti)if(ut!==null)if(Nt){if(F)if(y.layerUpdates.size>0){let vt=Pu(dt.width,dt.height,y.format,y.type);for(let st of y.layerUpdates){let It=dt.data.subarray(st*vt/dt.data.BYTES_PER_ELEMENT,(st+1)*vt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,st,dt.width,dt.height,1,ut,It)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,dt.width,dt.height,nt.depth,ut,dt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,tt,gt,dt.width,dt.height,nt.depth,0,dt.data,0,0);else Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Nt?F&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,dt.width,dt.height,nt.depth,ut,Ct,dt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,tt,gt,dt.width,dt.height,nt.depth,0,ut,Ct,dt.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{Nt&&Gt&&e.texStorage2D(i.TEXTURE_2D,ft,gt,Pt[0].width,Pt[0].height);for(let tt=0,pt=Pt.length;tt<pt;tt++)dt=Pt[tt],y.format!==ti?ut!==null?Nt?F&&e.compressedTexSubImage2D(i.TEXTURE_2D,tt,0,0,dt.width,dt.height,ut,dt.data):e.compressedTexImage2D(i.TEXTURE_2D,tt,gt,dt.width,dt.height,0,dt.data):Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Nt?F&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,dt.width,dt.height,ut,Ct,dt.data):e.texImage2D(i.TEXTURE_2D,tt,gt,dt.width,dt.height,0,ut,Ct,dt.data)}else if(y.isDataArrayTexture)if(Nt){if(Gt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,gt,nt.width,nt.height,nt.depth),F)if(y.layerUpdates.size>0){let tt=Pu(nt.width,nt.height,y.format,y.type);for(let pt of y.layerUpdates){let vt=nt.data.subarray(pt*tt/nt.data.BYTES_PER_ELEMENT,(pt+1)*tt/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,pt,nt.width,nt.height,1,ut,Ct,vt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,ut,Ct,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,gt,nt.width,nt.height,nt.depth,0,ut,Ct,nt.data);else if(y.isData3DTexture)Nt?(Gt&&e.texStorage3D(i.TEXTURE_3D,ft,gt,nt.width,nt.height,nt.depth),F&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,ut,Ct,nt.data)):e.texImage3D(i.TEXTURE_3D,0,gt,nt.width,nt.height,nt.depth,0,ut,Ct,nt.data);else if(y.isFramebufferTexture){if(Gt)if(Nt)e.texStorage2D(i.TEXTURE_2D,ft,gt,nt.width,nt.height);else{let tt=nt.width,pt=nt.height;for(let vt=0;vt<ft;vt++)e.texImage2D(i.TEXTURE_2D,vt,gt,tt,pt,0,ut,Ct,null),tt>>=1,pt>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){let tt=i.canvas;if(tt.hasAttribute("layoutsubtree")||tt.setAttribute("layoutsubtree","true"),nt.parentNode!==tt){tt.appendChild(nt),d.add(y),tt.onpaint=pt=>{let vt=pt.changedElements;for(let st of d)vt.includes(st.image)&&(st.needsUpdate=!0)},tt.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,nt);else{let vt=i.RGBA,st=i.RGBA,It=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,vt,st,It,nt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Pt.length>0){if(Nt&&Gt){let tt=ge(Pt[0]);e.texStorage2D(i.TEXTURE_2D,ft,gt,tt.width,tt.height)}for(let tt=0,pt=Pt.length;tt<pt;tt++)dt=Pt[tt],Nt?F&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,ut,Ct,dt):e.texImage2D(i.TEXTURE_2D,tt,gt,ut,Ct,dt);y.generateMipmaps=!1}else if(Nt){if(Gt){let tt=ge(nt);e.texStorage2D(i.TEXTURE_2D,ft,gt,tt.width,tt.height)}F&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut,Ct,nt)}else e.texImage2D(i.TEXTURE_2D,0,gt,ut,Ct,nt);p(y)&&M(q),ct.__version=at.version,y.onUpdate&&y.onUpdate(y)}N.__version=y.version}function it(N,y,k){if(y.image.length!==6)return;let q=Zt(N,y),J=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+k);let at=n.get(J);if(J.version!==at.__version||q===!0){e.activeTexture(i.TEXTURE0+k);let ct=$t.getPrimaries($t.workingColorSpace),Q=y.colorSpace===Yi?null:$t.getPrimaries(y.colorSpace),nt=y.colorSpace===Yi||ct===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let ut=y.isCompressedTexture||y.image[0].isCompressedTexture,Ct=y.image[0]&&y.image[0].isDataTexture,gt=[];for(let st=0;st<6;st++)!ut&&!Ct?gt[st]=m(y.image[st],!0,s.maxCubemapSize):gt[st]=Ct?y.image[st].image:y.image[st],gt[st]=pn(y,gt[st]);let dt=gt[0],Pt=r.convert(y.format,y.colorSpace),Nt=r.convert(y.type),Gt=x(y.internalFormat,Pt,Nt,y.normalized,y.colorSpace),F=y.isVideoTexture!==!0,ft=at.__version===void 0||q===!0,tt=J.dataReady,pt=E(y,dt);Bt(i.TEXTURE_CUBE_MAP,y);let vt;if(ut){F&&ft&&e.texStorage2D(i.TEXTURE_CUBE_MAP,pt,Gt,dt.width,dt.height);for(let st=0;st<6;st++){vt=gt[st].mipmaps;for(let It=0;It<vt.length;It++){let wt=vt[It];y.format!==ti?Pt!==null?F?tt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,It,0,0,wt.width,wt.height,Pt,wt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,It,Gt,wt.width,wt.height,0,wt.data):Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,It,0,0,wt.width,wt.height,Pt,Nt,wt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,It,Gt,wt.width,wt.height,0,Pt,Nt,wt.data)}}}else{if(vt=y.mipmaps,F&&ft){vt.length>0&&pt++;let st=ge(gt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,pt,Gt,st.width,st.height)}for(let st=0;st<6;st++)if(Ct){F?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,gt[st].width,gt[st].height,Pt,Nt,gt[st].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Gt,gt[st].width,gt[st].height,0,Pt,Nt,gt[st].data);for(let It=0;It<vt.length;It++){let be=vt[It].image[st].image;F?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,It+1,0,0,be.width,be.height,Pt,Nt,be.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,It+1,Gt,be.width,be.height,0,Pt,Nt,be.data)}}else{F?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,Pt,Nt,gt[st]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Gt,Pt,Nt,gt[st]);for(let It=0;It<vt.length;It++){let wt=vt[It];F?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,It+1,0,0,Pt,Nt,wt.image[st]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,It+1,Gt,Pt,Nt,wt.image[st])}}}p(y)&&M(i.TEXTURE_CUBE_MAP),at.__version=J.version,y.onUpdate&&y.onUpdate(y)}N.__version=y.version}function j(N,y,k,q,J,at){let ct=r.convert(k.format,k.colorSpace),Q=r.convert(k.type),nt=x(k.internalFormat,ct,Q,k.normalized,k.colorSpace),ut=n.get(y),Ct=n.get(k);if(Ct.__renderTarget=y,!ut.__hasExternalTextures){let gt=Math.max(1,y.width>>at),dt=Math.max(1,y.height>>at);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?e.texImage3D(J,at,nt,gt,dt,y.depth,0,ct,Q,null):e.texImage2D(J,at,nt,gt,dt,0,ct,Q,null)}e.bindFramebuffer(i.FRAMEBUFFER,N),Ge(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,J,Ct.__webglTexture,0,Fe(y)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,J,Ct.__webglTexture,at),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(N,y,k){if(i.bindRenderbuffer(i.RENDERBUFFER,N),y.depthBuffer){let q=y.depthTexture,J=q&&q.isDepthTexture?q.type:null,at=b(y.stencilBuffer,J),ct=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ge(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Fe(y),at,y.width,y.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,Fe(y),at,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,at,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ct,i.RENDERBUFFER,N)}else{let q=y.textures;for(let J=0;J<q.length;J++){let at=q[J],ct=r.convert(at.format,at.colorSpace),Q=r.convert(at.type),nt=x(at.internalFormat,ct,Q,at.normalized,at.colorSpace);Ge(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Fe(y),nt,y.width,y.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,Fe(y),nt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,nt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ae(N,y,k){let q=y.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,N),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let J=n.get(y.depthTexture);if(J.__renderTarget=y,(!J.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),q){if(J.__webglInit===void 0&&(J.__webglInit=!0,y.depthTexture.addEventListener("dispose",R)),J.__webglTexture===void 0){J.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),Bt(i.TEXTURE_CUBE_MAP,y.depthTexture);let ut=r.convert(y.depthTexture.format),Ct=r.convert(y.depthTexture.type),gt;y.depthTexture.format===Pi?gt=i.DEPTH_COMPONENT24:y.depthTexture.format===vs&&(gt=i.DEPTH24_STENCIL8);for(let dt=0;dt<6;dt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,gt,y.width,y.height,0,ut,Ct,null)}}else X(y.depthTexture,0);let at=J.__webglTexture,ct=Fe(y),Q=q?i.TEXTURE_CUBE_MAP_POSITIVE_X+k:i.TEXTURE_2D,nt=y.depthTexture.format===vs?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===Pi)Ge(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,Q,at,0,ct):i.framebufferTexture2D(i.FRAMEBUFFER,nt,Q,at,0);else if(y.depthTexture.format===vs)Ge(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,Q,at,0,ct):i.framebufferTexture2D(i.FRAMEBUFFER,nt,Q,at,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ft(N){let y=n.get(N),k=N.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==N.depthTexture){let q=N.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),q){let J=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,q.removeEventListener("dispose",J)};q.addEventListener("dispose",J),y.__depthDisposeCallback=J}y.__boundDepthTexture=q}if(N.depthTexture&&!y.__autoAllocateDepthBuffer)if(k)for(let q=0;q<6;q++)ae(y.__webglFramebuffer[q],N,q);else{let q=N.texture.mipmaps;q&&q.length>0?ae(y.__webglFramebuffer[0],N,0):ae(y.__webglFramebuffer,N,0)}else if(k){y.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[q]),y.__webglDepthbuffer[q]===void 0)y.__webglDepthbuffer[q]=i.createRenderbuffer(),Ut(y.__webglDepthbuffer[q],N,!1);else{let J=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=y.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,at)}}else{let q=N.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Ut(y.__webglDepthbuffer,N,!1);else{let J=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,at)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ie(N,y,k){let q=n.get(N);y!==void 0&&j(q.__webglFramebuffer,N,N.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Ft(N)}function fe(N){let y=N.texture,k=n.get(N),q=n.get(y);N.addEventListener("dispose",_);let J=N.textures,at=N.isWebGLCubeRenderTarget===!0,ct=J.length>1;if(ct||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=y.version,o.memory.textures++),at){k.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer[Q]=[];for(let nt=0;nt<y.mipmaps.length;nt++)k.__webglFramebuffer[Q][nt]=i.createFramebuffer()}else k.__webglFramebuffer[Q]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer=[];for(let Q=0;Q<y.mipmaps.length;Q++)k.__webglFramebuffer[Q]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(ct)for(let Q=0,nt=J.length;Q<nt;Q++){let ut=n.get(J[Q]);ut.__webglTexture===void 0&&(ut.__webglTexture=i.createTexture(),o.memory.textures++)}if(N.samples>0&&Ge(N)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let Q=0;Q<J.length;Q++){let nt=J[Q];k.__webglColorRenderbuffer[Q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[Q]);let ut=r.convert(nt.format,nt.colorSpace),Ct=r.convert(nt.type),gt=x(nt.internalFormat,ut,Ct,nt.normalized,nt.colorSpace,N.isXRRenderTarget===!0),dt=Fe(N);i.renderbufferStorageMultisample(i.RENDERBUFFER,dt,gt,N.width,N.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,k.__webglColorRenderbuffer[Q])}i.bindRenderbuffer(i.RENDERBUFFER,null),N.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),Ut(k.__webglDepthRenderbuffer,N,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(at){e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Bt(i.TEXTURE_CUBE_MAP,y);for(let Q=0;Q<6;Q++)if(y.mipmaps&&y.mipmaps.length>0)for(let nt=0;nt<y.mipmaps.length;nt++)j(k.__webglFramebuffer[Q][nt],N,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,nt);else j(k.__webglFramebuffer[Q],N,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);p(y)&&M(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ct){for(let Q=0,nt=J.length;Q<nt;Q++){let ut=J[Q],Ct=n.get(ut),gt=i.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(gt=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(gt,Ct.__webglTexture),Bt(gt,ut),j(k.__webglFramebuffer,N,ut,i.COLOR_ATTACHMENT0+Q,gt,0),p(ut)&&M(gt)}e.unbindTexture()}else{let Q=i.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(Q=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Q,q.__webglTexture),Bt(Q,y),y.mipmaps&&y.mipmaps.length>0)for(let nt=0;nt<y.mipmaps.length;nt++)j(k.__webglFramebuffer[nt],N,y,i.COLOR_ATTACHMENT0,Q,nt);else j(k.__webglFramebuffer,N,y,i.COLOR_ATTACHMENT0,Q,0);p(y)&&M(Q),e.unbindTexture()}N.depthBuffer&&Ft(N)}function Qt(N){let y=N.textures;for(let k=0,q=y.length;k<q;k++){let J=y[k];if(p(J)){let at=I(N),ct=n.get(J).__webglTexture;e.bindTexture(at,ct),M(at),e.unbindTexture()}}}let Pe=[],en=[];function Ln(N){if(N.samples>0){if(Ge(N)===!1){let y=N.textures,k=N.width,q=N.height,J=i.COLOR_BUFFER_BIT,at=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=n.get(N),Q=y.length>1;if(Q)for(let ut=0;ut<y.length;ut++)e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ct.__webglMultisampledFramebuffer);let nt=N.texture.mipmaps;nt&&nt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ct.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ct.__webglFramebuffer);for(let ut=0;ut<y.length;ut++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),Q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ct.__webglColorRenderbuffer[ut]);let Ct=n.get(y[ut]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ct,0)}i.blitFramebuffer(0,0,k,q,0,0,k,q,J,i.NEAREST),l===!0&&(Pe.length=0,en.length=0,Pe.push(i.COLOR_ATTACHMENT0+ut),N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&(Pe.push(at),en.push(at),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,en)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Pe))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Q)for(let ut=0;ut<y.length;ut++){e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,ct.__webglColorRenderbuffer[ut]);let Ct=n.get(y[ut]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,Ct,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ct.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&l){let y=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function Fe(N){return Math.min(s.maxSamples,N.samples)}function Ge(N){let y=n.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function B(N){let y=o.render.frame;h.get(N)!==y&&(h.set(N,y),N.update())}function pn(N,y){let k=N.colorSpace,q=N.format,J=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||k!==To&&k!==Yi&&($t.getTransfer(k)===le?(q!==ti||J!==Dn)&&Lt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ot("WebGLTextures: Unsupported texture color space:",k)),y}function ge(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(c.width=N.naturalWidth||N.width,c.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(c.width=N.displayWidth,c.height=N.displayHeight):(c.width=N.width,c.height=N.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=D,this.getTextureUnits=L,this.setTextureUnits=U,this.setTexture2D=X,this.setTexture2DArray=H,this.setTexture3D=Y,this.setTextureCube=$,this.rebindTextures=ie,this.setupRenderTarget=fe,this.updateRenderTargetMipmap=Qt,this.updateMultisampleRenderTarget=Ln,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=j,this.useMultisampledRTT=Ge,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function sM(i,t){function e(n,s=Yi){let r,o=$t.getTransfer(s);if(n===Dn)return i.UNSIGNED_BYTE;if(n===jl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ql)return i.UNSIGNED_SHORT_5_5_5_1;if(n===vu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Mu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===xu)return i.BYTE;if(n===yu)return i.SHORT;if(n===Nr)return i.UNSIGNED_SHORT;if(n===Jl)return i.INT;if(n===xi)return i.UNSIGNED_INT;if(n===Qn)return i.FLOAT;if(n===dn)return i.HALF_FLOAT;if(n===Su)return i.ALPHA;if(n===bu)return i.RGB;if(n===ti)return i.RGBA;if(n===Pi)return i.DEPTH_COMPONENT;if(n===vs)return i.DEPTH_STENCIL;if(n===tc)return i.RED;if(n===ec)return i.RED_INTEGER;if(n===Ms)return i.RG;if(n===nc)return i.RG_INTEGER;if(n===ic)return i.RGBA_INTEGER;if(n===ra||n===oa||n===aa||n===la)if(o===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ra)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===la)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ra)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===oa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===aa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===la)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===sc||n===rc||n===oc||n===ac)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===sc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===rc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===oc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ac)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===lc||n===cc||n===hc||n===uc||n===dc||n===ca||n===fc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===lc||n===cc)return o===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===hc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===uc)return r.COMPRESSED_R11_EAC;if(n===dc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ca)return r.COMPRESSED_RG11_EAC;if(n===fc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===pc||n===mc||n===gc||n===_c||n===xc||n===yc||n===vc||n===Mc||n===Sc||n===bc||n===Ec||n===Tc||n===wc||n===Ac)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===pc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===mc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===gc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===_c)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===xc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===yc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===vc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Mc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Sc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===bc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ec)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Tc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===wc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ac)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Rc||n===Cc||n===Pc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Rc)return o===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Cc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Pc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ic||n===Lc||n===ha||n===Dc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ic)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Lc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ha)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Dc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ur?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var rM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,oM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,$u=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Oo(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Se({vertexShader:rM,fragmentShader:oM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Yt(new Bs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ku=class extends mi{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,v=typeof XRWebGLBinding<"u",m=new $u,p={},M=e.getContextAttributes(),I=null,x=null,b=[],E=[],R=new lt,_=null,T=null,A=new cn;A.viewport=new Le;let w=new cn;w.viewport=new Le;let P=[A,w],D=new ql,L=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let et=b[K];return et===void 0&&(et=new Er,b[K]=et),et.getTargetRaySpace()},this.getControllerGrip=function(K){let et=b[K];return et===void 0&&(et=new Er,b[K]=et),et.getGripSpace()},this.getHand=function(K){let et=b[K];return et===void 0&&(et=new Er,b[K]=et),et.getHandSpace()};function z(K){let et=E.indexOf(K.inputSource);if(et===-1)return;let Mt=b[et];Mt!==void 0&&(Mt.update(K.inputSource,K.frame,c||o),Mt.dispatchEvent({type:K.type,data:K.inputSource}))}function V(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",X);for(let K=0;K<b.length;K++){let et=E[K];et!==null&&(E[K]=null,b[K].disconnect(et))}L=null,U=null,m.reset();for(let K in p)delete p[K];if(t.setRenderTarget(I),f=null,u=null,d=null,s=null,x=null,Zt.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(R.width,R.height,!1),T!==null){let K=T.camera;K.fov=T.fov,K.zoom=T.zoom,K.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&Lt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&Lt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(I=t.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",V),s.addEventListener("inputsourceschange",X),M.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let Mt=null,it=null,j=null;M.depth&&(j=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Mt=M.stencil?vs:Pi,it=M.stencil?Ur:xi);let Ut={colorFormat:e.RGBA8,depthFormat:j,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Ut),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),x=new qe(u.textureWidth,u.textureHeight,{format:ti,type:Dn,depthTexture:new ls(u.textureWidth,u.textureHeight,it,void 0,void 0,void 0,void 0,void 0,void 0,Mt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let Mt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,Mt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new qe(f.framebufferWidth,f.framebufferHeight,{format:ti,type:Dn,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Zt.setContext(s),Zt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(K){for(let et=0;et<K.removed.length;et++){let Mt=K.removed[et],it=E.indexOf(Mt);it>=0&&(E[it]=null,b[it].disconnect(Mt))}for(let et=0;et<K.added.length;et++){let Mt=K.added[et],it=E.indexOf(Mt);if(it===-1){for(let Ut=0;Ut<b.length;Ut++)if(Ut>=E.length){E.push(Mt),it=Ut;break}else if(E[Ut]===null){E[Ut]=Mt,it=Ut;break}if(it===-1)break}let j=b[it];j&&j.connect(Mt)}}let H=new C,Y=new C;function $(K,et,Mt){H.setFromMatrixPosition(et.matrixWorld),Y.setFromMatrixPosition(Mt.matrixWorld);let it=H.distanceTo(Y),j=et.projectionMatrix.elements,Ut=Mt.projectionMatrix.elements,ae=j[14]/(j[10]-1),Ft=j[14]/(j[10]+1),ie=(j[9]+1)/j[5],fe=(j[9]-1)/j[5],Qt=(j[8]-1)/j[0],Pe=(Ut[8]+1)/Ut[0],en=ae*Qt,Ln=ae*Pe,Fe=it/(-Qt+Pe),Ge=Fe*-Qt;if(et.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Ge),K.translateZ(Fe),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),j[10]===-1)K.projectionMatrix.copy(et.projectionMatrix),K.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{let B=ae+Fe,pn=Ft+Fe,ge=en-Ge,N=Ln+(it-Ge),y=ie*Ft/pn*B,k=fe*Ft/pn*B;K.projectionMatrix.makePerspective(ge,N,y,k,B,pn),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ht(K,et){et===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(et.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let et=K.near,Mt=K.far;m.texture!==null&&(m.depthNear>0&&(et=m.depthNear),m.depthFar>0&&(Mt=m.depthFar)),D.near=w.near=A.near=et,D.far=w.far=A.far=Mt,(L!==D.near||U!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),L=D.near,U=D.far),D.layers.mask=K.layers.mask|6,A.layers.mask=D.layers.mask&-5,w.layers.mask=D.layers.mask&-3;let it=K.parent,j=D.cameras;ht(D,it);for(let Ut=0;Ut<j.length;Ut++)ht(j[Ut],it);j.length===2?$(D,A,w):D.projectionMatrix.copy(A.projectionMatrix),T===null&&K.isPerspectiveCamera&&(T={camera:K,fov:K.fov,zoom:K.zoom}),ot(K,D,it)};function ot(K,et,Mt){Mt===null?K.matrix.copy(et.matrixWorld):(K.matrix.copy(Mt.matrixWorld),K.matrix.invert(),K.matrix.multiply(et.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(et.projectionMatrix),K.projectionMatrixInverse.copy(et.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Mr*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(K){l=K,u!==null&&(u.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(K){return p[K]};let Rt=null;function Bt(K,et){if(h=et.getViewerPose(c||o),g=et,h!==null){let Mt=h.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let it=!1;Mt.length!==D.cameras.length&&(D.cameras.length=0,it=!0);for(let Ft=0;Ft<Mt.length;Ft++){let ie=Mt[Ft],fe=null;if(f!==null)fe=f.getViewport(ie);else{let Pe=d.getViewSubImage(u,ie);fe=Pe.viewport,Ft===0&&(t.setRenderTargetTextures(x,Pe.colorTexture,Pe.depthStencilTexture),t.setRenderTarget(x))}let Qt=P[Ft];Qt===void 0&&(Qt=new cn,Qt.layers.enable(Ft),Qt.viewport=new Le,P[Ft]=Qt),Qt.matrix.fromArray(ie.transform.matrix),Qt.matrix.decompose(Qt.position,Qt.quaternion,Qt.scale),Qt.projectionMatrix.fromArray(ie.projectionMatrix),Qt.projectionMatrixInverse.copy(Qt.projectionMatrix).invert(),Qt.viewport.set(fe.x,fe.y,fe.width,fe.height),Ft===0&&(D.matrix.copy(Qt.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),it===!0&&D.cameras.push(Qt)}let j=s.enabledFeatures;if(j&&j.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=n.getBinding();let Ft=d.getDepthInformation(Mt[0]);Ft&&Ft.isValid&&Ft.texture&&m.init(Ft,s.renderState)}if(j&&j.includes("camera-access")&&v){t.state.unbindTexture(),d=n.getBinding();for(let Ft=0;Ft<Mt.length;Ft++){let ie=Mt[Ft].camera;if(ie){let fe=p[ie];fe||(fe=new Oo,p[ie]=fe);let Qt=d.getCameraImage(ie);fe.sourceTexture=Qt}}}}for(let Mt=0;Mt<b.length;Mt++){let it=E[Mt],j=b[Mt];it!==null&&j!==void 0&&j.update(it,et,c||o)}Rt&&Rt(K,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}let Zt=new Xp;Zt.setAnimationLoop(Bt),this.setAnimationLoop=function(K){Rt=K},this.dispose=function(){}}},aM=new Kt,Jp=new Ht;Jp.set(-1,0,0,0,1,0,0,0,1);function lM(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Au(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,I,x){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,M,I):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Rn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Rn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let M=t.get(p),I=M.envMap,x=M.envMapRotation;I&&(m.envMap.value=I,m.envMapRotation.value.setFromMatrix4(aM.makeRotationFromEuler(x)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Jp),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,I){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=I*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Rn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){let M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function cM(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,b){let E=b.program;n.uniformBlockBinding(x,E)}function c(x,b){let E=s[x.id];E===void 0&&(m(x),E=h(x),s[x.id]=E,x.addEventListener("dispose",M));let R=b.program;n.updateUBOMapping(x,R);let _=t.render.frame;r[x.id]!==_&&(u(x),r[x.id]=_)}function h(x){let b=d();x.__bindingPointIndex=b;let E=i.createBuffer(),R=x.__size,_=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,R,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,E),E}function d(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return Ot("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){let b=s[x.id],E=x.uniforms,R=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let _=0,T=E.length;_<T;_++){let A=E[_];if(Array.isArray(A))for(let w=0,P=A.length;w<P;w++)f(A[w],_,w,R);else f(A,_,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(x,b,E,R){if(v(x,b,E,R)===!0){let _=x.__offset,T=x.value;if(Array.isArray(T)){let A=0;for(let w=0;w<T.length;w++){let P=T[w],D=p(P);g(P,x.__data,A),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(A+=D.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,x.__data)}}function g(x,b,E){typeof x=="number"||typeof x=="boolean"?b[0]=x:x.isMatrix3?(b[0]=x.elements[0],b[1]=x.elements[1],b[2]=x.elements[2],b[3]=0,b[4]=x.elements[3],b[5]=x.elements[4],b[6]=x.elements[5],b[7]=0,b[8]=x.elements[6],b[9]=x.elements[7],b[10]=x.elements[8],b[11]=0):ArrayBuffer.isView(x)?b.set(new x.constructor(x.buffer,x.byteOffset,b.length)):x.toArray(b,E)}function v(x,b,E,R){let _=x.value,T=b+"_"+E;if(R[T]===void 0)return typeof _=="number"||typeof _=="boolean"?R[T]=_:ArrayBuffer.isView(_)?R[T]=_.slice():R[T]=_.clone(),!0;{let A=R[T];if(typeof _=="number"||typeof _=="boolean"){if(A!==_)return R[T]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(A.equals(_)===!1)return A.copy(_),!0}}return!1}function m(x){let b=x.uniforms,E=0,R=16;for(let T=0,A=b.length;T<A;T++){let w=Array.isArray(b[T])?b[T]:[b[T]];for(let P=0,D=w.length;P<D;P++){let L=w[P],U=Array.isArray(L.value)?L.value:[L.value];for(let z=0,V=U.length;z<V;z++){let X=U[z],H=p(X),Y=E%R,$=Y%H.boundary,ht=Y+$;E+=$,ht!==0&&R-ht<H.storage&&(E+=R-ht),L.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=E,E+=H.storage}}}let _=E%R;return _>0&&(E+=R-_),x.__size=E,x.__cache={},this}function p(x){let b={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(b.boundary=4,b.storage=4):x.isVector2?(b.boundary=8,b.storage=8):x.isVector3||x.isColor?(b.boundary=16,b.storage=12):x.isVector4?(b.boundary=16,b.storage=16):x.isMatrix3?(b.boundary=48,b.storage=48):x.isMatrix4?(b.boundary=64,b.storage=64):x.isTexture?Lt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(b.boundary=16,b.storage=x.byteLength):Lt("WebGLRenderer: Unsupported uniform value type.",x),b}function M(x){let b=x.target;b.removeEventListener("dispose",M);let E=o.indexOf(b.__bindingPointIndex);o.splice(E,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function I(){for(let x in s)i.deleteBuffer(s[x]);o=[],s={},r={}}return{bind:l,update:c,dispose:I}}var hM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ui=null;function uM(){return Ui===null&&(Ui=new Do(hM,16,16,Ms,dn),Ui.name="DFG_LUT",Ui.minFilter=hn,Ui.magFilter=hn,Ui.wrapS=Ci,Ui.wrapT=Ci,Ui.generateMipmaps=!1,Ui.needsUpdate=!0),Ui}var Hc=class{constructor(t={}){let{canvas:e=gp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Dn}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;let v=f,m=new Set([ic,nc,ec]),p=new Set([Dn,xi,Nr,Ur,jl,Ql]),M=new Uint32Array(4),I=new Int32Array(4),x=new C,b=null,E=null,R=[],_=[],T=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,w=!1,P=null,D=null,L=null,U=null;this._outputColorSpace=Ie;let z=0,V=0,X=null,H=-1,Y=null,$=new Le,ht=new Le,ot=null,Rt=new mt(0),Bt=0,Zt=e.width,K=e.height,et=1,Mt=null,it=null,j=new Le(0,0,Zt,K),Ut=new Le(0,0,Zt,K),ae=!1,Ft=new Ar,ie=!1,fe=!1,Qt=new Kt,Pe=new C,en=new Le,Ln={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Fe=!1;function Ge(){return X===null?et:1}let B=n;function pn(S,O){return e.getContext(S,O)}let ge,N,y,k,q,J,at,ct,Q,nt,ut,Ct,gt,dt,Pt,Nt,Gt,F,ft,tt,pt,vt,st;try{let S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",be,!1),e.addEventListener("webglcontextrestored",pe,!1),e.addEventListener("webglcontextcreationerror",ci,!1),B===null){let O="webgl2";if(B=pn(O,S),B===null)throw pn(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}It()}catch(S){throw e.removeEventListener("webglcontextlost",be,!1),e.removeEventListener("webglcontextrestored",pe,!1),e.removeEventListener("webglcontextcreationerror",ci,!1),Ot("WebGLRenderer: "+S.message),S}function It(){ge=new xy(B),ge.init(),pt=new sM(B,ge),N=new ly(B,ge,t,pt),y=new nM(B,ge),N.reversedDepthBuffer&&u&&y.buffers.depth.setReversed(!0),D=B.createFramebuffer(),L=B.createFramebuffer(),U=B.createFramebuffer(),k=new My(B),q=new Vv,J=new iM(B,ge,y,q,N,pt,k),at=new _y(A),ct=new b0(B),vt=new oy(B,ct),Q=new yy(B,ct,k,vt),nt=new by(B,Q,ct,vt,k),F=new Sy(B,N,J),Pt=new cy(q),ut=new kv(A,at,ge,N,vt,Pt),Ct=new lM(A,q),gt=new Wv,dt=new Kv(ge),Gt=new ry(A,at,y,nt,g,l),Nt=new eM(A,nt,N),st=new cM(B,k,N,y),ft=new ay(B,ge,k),tt=new vy(B,ge,k),k.programs=ut.programs,A.capabilities=N,A.extensions=ge,A.properties=q,A.renderLists=gt,A.shadowMap=Nt,A.state=y,A.info=k}v!==Dn&&(T=new Ty(v,e.width,e.height,a,s,r));let wt=new Ku(A,B);this.xr=wt,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let S=ge.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=ge.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(S){S!==void 0&&(et=S,this.setSize(Zt,K,!1))},this.getSize=function(S){return S.set(Zt,K)},this.setSize=function(S,O,Z=!0){if(wt.isPresenting){Lt("WebGLRenderer: Can't change size while VR device is presenting.");return}Zt=S,K=O,e.width=Math.floor(S*et),e.height=Math.floor(O*et),Z===!0&&(e.style.width=S+"px",e.style.height=O+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,S,O)},this.getDrawingBufferSize=function(S){return S.set(Zt*et,K*et).floor()},this.setDrawingBufferSize=function(S,O,Z){Zt=S,K=O,et=Z,e.width=Math.floor(S*Z),e.height=Math.floor(O*Z),this.setViewport(0,0,S,O)},this.setEffects=function(S){if(v===Dn){Ot("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let O=0;O<S.length;O++)if(S[O].isOutputPass===!0){Lt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy($)},this.getViewport=function(S){return S.copy(j)},this.setViewport=function(S,O,Z,G){S.isVector4?j.set(S.x,S.y,S.z,S.w):j.set(S,O,Z,G),y.viewport($.copy(j).multiplyScalar(et).round())},this.getScissor=function(S){return S.copy(Ut)},this.setScissor=function(S,O,Z,G){S.isVector4?Ut.set(S.x,S.y,S.z,S.w):Ut.set(S,O,Z,G),y.scissor(ht.copy(Ut).multiplyScalar(et).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(S){y.setScissorTest(ae=S)},this.setOpaqueSort=function(S){Mt=S},this.setTransparentSort=function(S){it=S},this.getClearColor=function(S){return S.copy(Gt.getClearColor())},this.setClearColor=function(){Gt.setClearColor(...arguments)},this.getClearAlpha=function(){return Gt.getClearAlpha()},this.setClearAlpha=function(){Gt.setClearAlpha(...arguments)},this.clear=function(S=!0,O=!0,Z=!0){let G=0;if(S){let W=!1;if(X!==null){let yt=X.texture.format;W=m.has(yt)}if(W){let yt=X.texture.type,bt=p.has(yt),xt=Gt.getClearColor(),Et=Gt.getClearAlpha(),At=xt.r,Wt=xt.g,jt=xt.b;bt?(M[0]=At,M[1]=Wt,M[2]=jt,M[3]=Et,B.clearBufferuiv(B.COLOR,0,M)):(I[0]=At,I[1]=Wt,I[2]=jt,I[3]=Et,B.clearBufferiv(B.COLOR,0,I))}else G|=B.COLOR_BUFFER_BIT}O&&(G|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(G|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&B.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),P=S},this.dispose=function(){e.removeEventListener("webglcontextlost",be,!1),e.removeEventListener("webglcontextrestored",pe,!1),e.removeEventListener("webglcontextcreationerror",ci,!1),Gt.dispose(),gt.dispose(),dt.dispose(),q.dispose(),at.dispose(),nt.dispose(),vt.dispose(),st.dispose(),ut.dispose(),wt.dispose(),wt.removeEventListener("sessionstart",Yd),wt.removeEventListener("sessionend",Zd),Cs.stop()};function be(S){S.preventDefault(),Ro("WebGLRenderer: Context Lost."),w=!0}function pe(){Ro("WebGLRenderer: Context Restored."),w=!1;let S=k.autoReset,O=Nt.enabled,Z=Nt.autoUpdate,G=Nt.needsUpdate,W=Nt.type;It(),k.autoReset=S,Nt.enabled=O,Nt.autoUpdate=Z,Nt.needsUpdate=G,Nt.type=W}function ci(S){Ot("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ti(S){let O=S.target;O.removeEventListener("dispose",Ti),pg(O)}function pg(S){mg(S),q.remove(S)}function mg(S){let O=q.get(S).programs;O!==void 0&&(O.forEach(function(Z){ut.releaseProgram(Z)}),S.isShaderMaterial&&ut.releaseShaderCache(S))}this.renderBufferDirect=function(S,O,Z,G,W,yt){O===null&&(O=Ln);let bt=W.isMesh&&W.matrixWorld.determinantAffine()<0,xt=xg(S,O,Z,G,W);y.setMaterial(G,bt);let Et=Z.index,At=1;if(G.wireframe===!0){if(Et=Q.getWireframeAttribute(Z),Et===void 0)return;At=2}let Wt=Z.drawRange,jt=Z.attributes.position,Tt=Wt.start*At,me=(Wt.start+Wt.count)*At;yt!==null&&(Tt=Math.max(Tt,yt.start*At),me=Math.min(me,(yt.start+yt.count)*At)),Et!==null?(Tt=Math.max(Tt,0),me=Math.min(me,Et.count)):jt!=null&&(Tt=Math.max(Tt,0),me=Math.min(me,jt.count));let We=me-Tt;if(We<0||We===1/0)return;vt.setup(W,G,xt,Z,Et);let we,Me=ft;if(Et!==null&&(we=ct.get(Et),Me=tt,Me.setIndex(we)),W.isMesh)G.wireframe===!0?(y.setLineWidth(G.wireframeLinewidth*Ge()),Me.setMode(B.LINES)):Me.setMode(B.TRIANGLES);else if(W.isLine){let mn=G.linewidth;mn===void 0&&(mn=1),y.setLineWidth(mn*Ge()),W.isLineSegments?Me.setMode(B.LINES):W.isLineLoop?Me.setMode(B.LINE_LOOP):Me.setMode(B.LINE_STRIP)}else W.isPoints?Me.setMode(B.POINTS):W.isSprite&&Me.setMode(B.TRIANGLES);if(W.isBatchedMesh)if(ge.get("WEBGL_multi_draw"))Me.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let mn=W._multiDrawStarts,St=W._multiDrawCounts,En=W._multiDrawCount,oe=Et?ct.get(Et).bytesPerElement:1,Yn=q.get(G).currentProgram.getUniforms();for(let wi=0;wi<En;wi++)Yn.setValue(B,"_gl_DrawID",wi),Me.render(mn[wi]/oe,St[wi])}else if(W.isInstancedMesh)Me.renderInstances(Tt,We,W.count);else if(Z.isInstancedBufferGeometry){let mn=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,St=Math.min(Z.instanceCount,mn);Me.renderInstances(Tt,We,St)}else Me.render(Tt,We)};function qd(S,O,Z,G){P!==null&&S.isNodeMaterial&&P.setObject(G,S),ie===!0&&Pt.setState(S,Z,!1),S.transparent===!0&&S.side===Be&&S.forceSinglePass===!1?(S.side=Rn,S.needsUpdate=!0,Oa(S,O,G),S.side=_s,S.needsUpdate=!0,Oa(S,O,G),S.side=Be):Oa(S,O,G)}this.compile=function(S,O,Z=null){Z===null&&(Z=S),P!==null&&P.renderStart(S,O,Z),E=dt.get(Z),E.init(O),_.push(E),Z.traverseVisible(function(W){W.isLight&&W.layers.test(O.layers)&&(E.pushLight(W),W.castShadow&&E.pushShadow(W))}),S!==Z&&S.traverseVisible(function(W){W.isLight&&W.layers.test(O.layers)&&(E.pushLight(W),W.castShadow&&E.pushShadow(W))}),E.setupLights(),P!==null&&P.updateLights(E.state.lightsArray),fe=this.localClippingEnabled,ie=Pt.init(this.clippingPlanes,fe),ie===!0&&Pt.setGlobalState(this.clippingPlanes,O),P!==null&&Nt.render(E.state.shadowsArray,Z,O);let G=new Set;return S.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let yt=W.material;if(yt)if(Array.isArray(yt))for(let bt=0;bt<yt.length;bt++){let xt=yt[bt];qd(xt,Z,O,W),G.add(xt)}else qd(yt,Z,O,W),G.add(yt)}),E=_.pop(),P!==null&&P.renderEnd(),G},this.compileAsync=function(S,O,Z=null){let G=this.compile(S,O,Z);return new Promise(W=>{function yt(){if(G.forEach(function(bt){let Et=q.get(bt).currentProgram;(Et===void 0||Et.isReady())&&G.delete(bt)}),G.size===0){W(S);return}setTimeout(yt,10)}ge.get("KHR_parallel_shader_compile")!==null?yt():setTimeout(yt,10)})};let Ch=null;function gg(S){Ch&&Ch(S)}function Yd(){Cs.stop()}function Zd(){Cs.start()}let Cs=new Xp;Cs.setAnimationLoop(gg),typeof self<"u"&&Cs.setContext(self),this.setAnimationLoop=function(S){Ch=S,wt.setAnimationLoop(S),S===null?Cs.stop():Cs.start()},wt.addEventListener("sessionstart",Yd),wt.addEventListener("sessionend",Zd),this.render=function(S,O){if(O!==void 0&&O.isCamera!==!0){Ot("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;P!==null&&P.renderStart(S,O);let Z=wt.enabled===!0&&wt.isPresenting===!0,G=T!==null&&(X===null||Z)&&T.begin(A,X);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),wt.enabled===!0&&wt.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(wt.cameraAutoUpdate===!0&&wt.updateCamera(O),O=wt.getCamera()),S.isScene===!0&&S.onBeforeRender(A,S,O,X),E=dt.get(S,_.length),E.init(O),E.state.textureUnits=J.getTextureUnits(),_.push(E),Qt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Ft.setFromProjectionMatrix(Qt,pi,O.reversedDepth),fe=this.localClippingEnabled,ie=Pt.init(this.clippingPlanes,fe),b=gt.get(S,R.length),b.init(),R.push(b),wt.enabled===!0&&wt.isPresenting===!0){let bt=A.xr.getDepthSensingMesh();bt!==null&&Ph(bt,O,-1/0,A.sortObjects)}Ph(S,O,0,A.sortObjects),b.finish(),P!==null&&P.updateLights(E.state.lightsArray),A.sortObjects===!0&&b.sort(Mt,it),Fe=wt.enabled===!1||wt.isPresenting===!1||wt.hasDepthSensing()===!1,Fe&&Gt.addToRenderList(b,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ie===!0&&Pt.beginShadows();let W=E.state.shadowsArray;if(Nt.render(W,S,O),ie===!0&&Pt.endShadows(),(G&&T.hasRenderPass())===!1){let bt=b.opaque,xt=b.transmissive;if(E.setupLights(),O.isArrayCamera){let Et=O.cameras;if(xt.length>0)for(let At=0,Wt=Et.length;At<Wt;At++){let jt=Et[At];Kd(bt,xt,S,jt)}Fe&&Gt.render(S);for(let At=0,Wt=Et.length;At<Wt;At++){let jt=Et[At];$d(b,S,jt,jt.viewport)}}else xt.length>0&&Kd(bt,xt,S,O),Fe&&Gt.render(S),$d(b,S,O)}X!==null&&V===0&&(J.updateMultisampleRenderTarget(X),J.updateRenderTargetMipmap(X)),G&&T.end(A),S.isScene===!0&&S.onAfterRender(A,S,O),vt.resetDefaultState(),H=-1,Y=null,_.pop(),_.length>0?(E=_[_.length-1],J.setTextureUnits(E.state.textureUnits),ie===!0&&Pt.setGlobalState(A.clippingPlanes,E.state.camera)):E=null,R.pop(),R.length>0?b=R[R.length-1]:b=null,P!==null&&P.renderEnd()};function Ph(S,O,Z,G){if(S.visible===!1)return;if(S.layers.test(O.layers)){if(S.isGroup)Z=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(O);else if(S.isLightProbeGrid)E.pushLightProbeGrid(S);else if(S.isLight)E.pushLight(S),S.castShadow&&E.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||S.intersectsFrustum(Ft)){G&&en.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Qt);let bt=nt.update(S),xt=S.material;xt.visible&&b.push(S,bt,xt,Z,en.z,null,O)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||S.intersectsFrustum(Ft))){let bt=nt.update(S),xt=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),en.copy(S.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),en.copy(bt.boundingSphere.center)),en.applyMatrix4(S.matrixWorld).applyMatrix4(Qt)),Array.isArray(xt)){let Et=bt.groups;for(let At=0,Wt=Et.length;At<Wt;At++){let jt=Et[At],Tt=xt[jt.materialIndex];Tt&&Tt.visible&&b.push(S,bt,Tt,Z,en.z,jt,O)}}else xt.visible&&b.push(S,bt,xt,Z,en.z,null,O)}}let yt=S.children;for(let bt=0,xt=yt.length;bt<xt;bt++)Ph(yt[bt],O,Z,G)}function $d(S,O,Z,G){let{opaque:W,transmissive:yt,transparent:bt}=S;E.setupLightsView(Z),ie===!0&&Pt.setGlobalState(A.clippingPlanes,Z),G&&y.viewport($.copy(G)),W.length>0&&Ua(W,O,Z),yt.length>0&&Ua(yt,O,Z),bt.length>0&&Ua(bt,O,Z),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function Kd(S,O,Z,G){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[G.id]===void 0){let Tt=ge.has("EXT_color_buffer_half_float")||ge.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[G.id]=new qe(1,1,{generateMipmaps:!0,type:Tt?dn:Dn,minFilter:ys,samples:Math.max(4,N.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:$t.workingColorSpace})}let yt=E.state.transmissionRenderTarget[G.id],bt=G.viewport||$;yt.setSize(bt.z*A.transmissionResolutionScale,bt.w*A.transmissionResolutionScale);let xt=A.getRenderTarget(),Et=A.getActiveCubeFace(),At=A.getActiveMipmapLevel();A.setRenderTarget(yt),A.getClearColor(Rt),Bt=A.getClearAlpha(),Bt<1&&A.setClearColor(16777215,.5),A.clear(),Fe&&Gt.render(Z);let Wt=A.toneMapping;A.toneMapping=_i;let jt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),E.setupLightsView(G),ie===!0&&Pt.setGlobalState(A.clippingPlanes,G),Ua(S,Z,G),J.updateMultisampleRenderTarget(yt),J.updateRenderTargetMipmap(yt),ge.has("WEBGL_multisampled_render_to_texture")===!1){let Tt=!1;for(let me=0,We=O.length;me<We;me++){let we=O[me],{object:Me,geometry:mn,material:St,group:En}=we;if(St.side===Be&&Me.layers.test(G.layers)){let oe=St.side;St.side=Rn,St.needsUpdate=!0,Jd(Me,Z,G,mn,St,En),St.side=oe,St.needsUpdate=!0,Tt=!0}}Tt===!0&&(J.updateMultisampleRenderTarget(yt),J.updateRenderTargetMipmap(yt))}A.setRenderTarget(xt,Et,At),A.setClearColor(Rt,Bt),jt!==void 0&&(G.viewport=jt),A.toneMapping=Wt}function Ua(S,O,Z){let G=O.isScene===!0?O.overrideMaterial:null;for(let W=0,yt=S.length;W<yt;W++){let bt=S[W],{object:xt,geometry:Et,group:At}=bt,Wt=bt.material;Wt.allowOverride===!0&&G!==null&&(Wt=G),xt.layers.test(Z.layers)&&Jd(xt,O,Z,Et,Wt,At)}}function Jd(S,O,Z,G,W,yt){P!==null&&W.isNodeMaterial&&P.setObject(S,W),S.onBeforeRender(A,O,Z,G,W,yt),S.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),W.onBeforeRender(A,O,Z,G,S,yt),W.transparent===!0&&W.side===Be&&W.forceSinglePass===!1?(W.side=Rn,W.needsUpdate=!0,A.renderBufferDirect(Z,O,G,W,S,yt),W.side=_s,W.needsUpdate=!0,A.renderBufferDirect(Z,O,G,W,S,yt),W.side=Be):A.renderBufferDirect(Z,O,G,W,S,yt),S.onAfterRender(A,O,Z,G,W,yt)}function Oa(S,O,Z){O.isScene!==!0&&(O=Ln);let G=q.get(S),W=E.state.lights,yt=E.state.shadowsArray,bt=W.state.version,xt=ut.getParameters(S,W.state,yt,O,Z,E.state.lightProbeGridArray),Et=ut.getProgramCacheKey(xt),At=G.programs;G.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?O.environment:null,G.fog=O.fog;let Wt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;G.envMap=at.get(S.envMap||G.environment,Wt),G.envMapRotation=G.environment!==null&&S.envMap===null?O.environmentRotation:S.envMapRotation,At===void 0&&(S.addEventListener("dispose",Ti),At=new Map,G.programs=At);let jt=At.get(Et);if(jt!==void 0){if(G.currentProgram===jt&&G.lightsStateVersion===bt)return Qd(S,xt),jt}else xt.uniforms=ut.getUniforms(S),P!==null&&S.isNodeMaterial&&P.build(S,Z,xt),S.onBeforeCompile(xt,A),jt=ut.acquireProgram(xt,Et),At.set(Et,jt),G.uniforms=xt.uniforms;let Tt=G.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Tt.clippingPlanes=Pt.uniform),Qd(S,xt),G.needsLights=vg(S),G.lightsStateVersion=bt,G.needsLights&&(Tt.ambientLightColor.value=W.state.ambient,Tt.lightProbe.value=W.state.probe,Tt.sunLights.value=W.state.sun,Tt.sunLightShadows.value=W.state.sunShadow,Tt.directionalLights.value=W.state.directional,Tt.directionalLightShadows.value=W.state.directionalShadow,Tt.spotLights.value=W.state.spot,Tt.spotLightShadows.value=W.state.spotShadow,Tt.rectAreaLights.value=W.state.rectArea,Tt.ltc_1.value=W.state.rectAreaLTC1,Tt.ltc_2.value=W.state.rectAreaLTC2,Tt.pointLights.value=W.state.point,Tt.pointLightShadows.value=W.state.pointShadow,Tt.hemisphereLights.value=W.state.hemi,Tt.sunShadowMatrix.value=W.state.sunShadowMatrix,Tt.sunShadowCascade.value=W.state.sunShadowCascade,Tt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Tt.spotLightMatrix.value=W.state.spotLightMatrix,Tt.spotLightMap.value=W.state.spotLightMap,Tt.pointShadowMatrix.value=W.state.pointShadowMatrix),G.lightProbeGrid=E.state.lightProbeGridArray.length>0,G.currentProgram=jt,G.uniformsList=null,jt}function jd(S){if(S.uniformsList===null){let O=S.currentProgram.getUniforms();S.uniformsList=zr.seqWithValue(O.seq,S.uniforms)}return S.uniformsList}function Qd(S,O){let Z=q.get(S);Z.outputColorSpace=O.outputColorSpace,Z.batching=O.batching,Z.batchingColor=O.batchingColor,Z.instancing=O.instancing,Z.instancingColor=O.instancingColor,Z.instancingMorph=O.instancingMorph,Z.skinning=O.skinning,Z.morphTargets=O.morphTargets,Z.morphNormals=O.morphNormals,Z.morphColors=O.morphColors,Z.morphTargetsCount=O.morphTargetsCount,Z.numClippingPlanes=O.numClippingPlanes,Z.numIntersection=O.numClipIntersection,Z.vertexAlphas=O.vertexAlphas,Z.vertexTangents=O.vertexTangents,Z.toneMapping=O.toneMapping}function _g(S,O){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;x.setFromMatrixPosition(O.matrixWorld);for(let Z=0,G=S.length;Z<G;Z++){let W=S[Z];if(W.texture!==null&&W.boundingBox.containsPoint(x))return W}return null}function xg(S,O,Z,G,W){O.isScene!==!0&&(O=Ln),J.resetTextureUnits();let yt=O.fog,bt=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?O.environment:null,xt=X===null?A.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:$t.workingColorSpace,Et=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,At=at.get(G.envMap||bt,Et),Wt=G.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,jt=!!Z.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Tt=!!Z.morphAttributes.position,me=!!Z.morphAttributes.normal,We=!!Z.morphAttributes.color,we=_i;G.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(we=A.toneMapping);let Me=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,mn=Me!==void 0?Me.length:0,St=q.get(G),En=E.state.lights;if(ie===!0&&(fe===!0||S!==Y)){let Ee=S===Y&&G.id===H;Pt.setState(G,S,Ee)}let oe=!1;G.version===St.__version?(St.needsLights&&St.lightsStateVersion!==En.state.version||St.outputColorSpace!==xt||W.isBatchedMesh&&St.batching===!1||!W.isBatchedMesh&&St.batching===!0||W.isBatchedMesh&&St.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&St.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&St.instancing===!1||!W.isInstancedMesh&&St.instancing===!0||W.isSkinnedMesh&&St.skinning===!1||!W.isSkinnedMesh&&St.skinning===!0||W.isInstancedMesh&&St.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&St.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&St.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&St.instancingMorph===!1&&W.morphTexture!==null||St.envMap!==At||G.fog===!0&&St.fog!==yt||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==Pt.numPlanes||St.numIntersection!==Pt.numIntersection)||St.vertexAlphas!==Wt||St.vertexTangents!==jt||St.morphTargets!==Tt||St.morphNormals!==me||St.morphColors!==We||St.toneMapping!==we||St.morphTargetsCount!==mn||!!St.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(oe=!0):(oe=!0,St.__version=G.version);let Yn=St.currentProgram;oe===!0&&(Yn=Oa(G,O,W),P&&G.isNodeMaterial&&P.onUpdateProgram(G,Yn,St));let wi=!1,ts=!1,Ks=!1,ve=Yn.getUniforms(),Ve=St.uniforms;if(y.useProgram(Yn.program)&&(wi=!0,ts=!0,Ks=!0),G.id!==H&&(H=G.id,ts=!0),St.needsLights){let Ee=_g(E.state.lightProbeGridArray,W);St.lightProbeGrid!==Ee&&(St.lightProbeGrid=Ee,ts=!0)}if(wi||Y!==S){y.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ve.setValue(B,"projectionMatrix",S.projectionMatrix),ve.setValue(B,"viewMatrix",S.matrixWorldInverse);let ns=ve.map.cameraPosition;ns!==void 0&&ns.setValue(B,Pe.setFromMatrixPosition(S.matrixWorld)),N.logarithmicDepthBuffer&&ve.setValue(B,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ve.setValue(B,"isOrthographic",S.isOrthographicCamera===!0),Y!==S&&(Y=S,ts=!0,Ks=!0)}if(St.needsLights&&(En.state.sunShadowMap.length>0&&ve.setValue(B,"sunShadowMap",En.state.sunShadowMap,J),En.state.directionalShadowMap.length>0&&ve.setValue(B,"directionalShadowMap",En.state.directionalShadowMap,J),En.state.spotShadowMap.length>0&&ve.setValue(B,"spotShadowMap",En.state.spotShadowMap,J),En.state.pointShadowMap.length>0&&ve.setValue(B,"pointShadowMap",En.state.pointShadowMap,J)),W.isSkinnedMesh){ve.setOptional(B,W,"bindMatrix"),ve.setOptional(B,W,"bindMatrixInverse");let Ee=W.skeleton;Ee&&(Ee.boneTexture===null&&Ee.computeBoneTexture(),ve.setValue(B,"boneTexture",Ee.boneTexture,J))}W.isBatchedMesh&&(ve.setOptional(B,W,"batchingTexture"),ve.setValue(B,"batchingTexture",W._matricesTexture,J),ve.setOptional(B,W,"batchingIdTexture"),ve.setValue(B,"batchingIdTexture",W._indirectTexture,J),ve.setOptional(B,W,"batchingColorTexture"),W._colorsTexture!==null&&ve.setValue(B,"batchingColorTexture",W._colorsTexture,J));let es=Z.morphAttributes;if((es.position!==void 0||es.normal!==void 0||es.color!==void 0)&&F.update(W,Z,Yn),(ts||St.receiveShadow!==W.receiveShadow)&&(St.receiveShadow=W.receiveShadow,ve.setValue(B,"receiveShadow",W.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&O.environment!==null&&(Ve.envMapIntensity.value=O.environmentIntensity),Ve.dfgLUT!==void 0&&(Ve.dfgLUT.value=uM()),ts){if(ve.setValue(B,"toneMappingExposure",A.toneMappingExposure),St.needsLights&&yg(Ve,Ks),yt&&G.fog===!0&&Ct.refreshFogUniforms(Ve,yt),Ct.refreshMaterialUniforms(Ve,G,et,K,E.state.transmissionRenderTarget[S.id]),St.needsLights&&St.lightProbeGrid){let Ee=St.lightProbeGrid;Ve.probesSH.value=Ee.texture,Ve.probesMin.value.copy(Ee.boundingBox.min),Ve.probesMax.value.copy(Ee.boundingBox.max),Ve.probesResolution.value.copy(Ee.resolution)}zr.upload(B,jd(St),Ve,J)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(zr.upload(B,jd(St),Ve,J),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ve.setValue(B,"center",W.center),ve.setValue(B,"modelViewMatrix",W.modelViewMatrix),ve.setValue(B,"normalMatrix",W.normalMatrix),ve.setValue(B,"modelMatrix",W.matrixWorld),G.uniformsGroups!==void 0){let Ee=G.uniformsGroups;for(let ns=0,Js=Ee.length;ns<Js;ns++){let ef=Ee[ns];st.update(ef,Yn),st.bind(ef,Yn)}}return Yn}function yg(S,O){S.ambientLightColor.needsUpdate=O,S.lightProbe.needsUpdate=O,S.sunLights.needsUpdate=O,S.sunLightShadows.needsUpdate=O,S.directionalLights.needsUpdate=O,S.directionalLightShadows.needsUpdate=O,S.pointLights.needsUpdate=O,S.pointLightShadows.needsUpdate=O,S.spotLights.needsUpdate=O,S.spotLightShadows.needsUpdate=O,S.rectAreaLights.needsUpdate=O,S.hemisphereLights.needsUpdate=O}function vg(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return X},this.setRenderTargetTextures=function(S,O,Z){let G=q.get(S);G.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),q.get(S.texture).__webglTexture=O,q.get(S.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:Z,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,O){let Z=q.get(S);Z.__webglFramebuffer=O,Z.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(S,O=0,Z=0){X=S,z=O,V=Z;let G=null,W=!1,yt=!1;if(S){let xt=q.get(S);if(xt.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(B.FRAMEBUFFER,xt.__webglFramebuffer),$.copy(S.viewport),ht.copy(S.scissor),ot=S.scissorTest,y.viewport($),y.scissor(ht),y.setScissorTest(ot),H=-1;return}else if(xt.__webglFramebuffer===void 0)J.setupRenderTarget(S);else if(xt.__hasExternalTextures)J.rebindTextures(S,q.get(S.texture).__webglTexture,q.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let Wt=S.depthTexture;if(xt.__boundDepthTexture!==Wt){if(Wt!==null&&q.has(Wt)&&(S.width!==Wt.image.width||S.height!==Wt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(S)}}let Et=S.texture;(Et.isData3DTexture||Et.isDataArrayTexture||Et.isCompressedArrayTexture)&&(yt=!0);let At=q.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(At[O])?G=At[O][Z]:G=At[O],W=!0):S.samples>0&&J.useMultisampledRTT(S)===!1?G=q.get(S).__webglMultisampledFramebuffer:Array.isArray(At)?G=At[Z]:G=At,$.copy(S.viewport),ht.copy(S.scissor),ot=S.scissorTest}else $.copy(j).multiplyScalar(et).floor(),ht.copy(Ut).multiplyScalar(et).floor(),ot=ae;if(Z!==0&&(G=D),y.bindFramebuffer(B.FRAMEBUFFER,G)&&y.drawBuffers(S,G),y.viewport($),y.scissor(ht),y.setScissorTest(ot),W){let xt=q.get(S.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+O,xt.__webglTexture,Z)}else if(yt){let xt=O;for(let Et=0;Et<S.textures.length;Et++){let At=q.get(S.textures[Et]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Et,At.__webglTexture,Z,xt)}}else if(S!==null&&Z!==0){let xt=q.get(S.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,xt.__webglTexture,Z)}H=-1};function tf(S){let O=q.get(S);return(O.__readFormat!==S.format||O.__readType!==S.type)&&(O.__readFormat=S.format,O.__readType=S.type,O.__formatReadable=N.textureFormatReadable(S.format),O.__typeReadable=N.textureTypeReadable(S.type)),O}this.readRenderTargetPixels=function(S,O,Z,G,W,yt,bt,xt=0){if(!(S&&S.isWebGLRenderTarget)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=q.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&bt!==void 0&&(Et=Et[bt]),Et){y.bindFramebuffer(B.FRAMEBUFFER,Et);try{let At=S.textures[xt],Wt=At.format,jt=At.type;S.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+xt);let Tt=tf(At);if(Tt.__formatReadable===!1){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Tt.__typeReadable===!1){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=S.width-G&&Z>=0&&Z<=S.height-W&&B.readPixels(O,Z,G,W,pt.convert(Wt),pt.convert(jt),yt)}finally{let At=X!==null?q.get(X).__webglFramebuffer:null;y.bindFramebuffer(B.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(S,O,Z,G,W,yt,bt,xt=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=q.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&bt!==void 0&&(Et=Et[bt]),Et)if(O>=0&&O<=S.width-G&&Z>=0&&Z<=S.height-W){y.bindFramebuffer(B.FRAMEBUFFER,Et);let At=S.textures[xt],Wt=At.format,jt=At.type;S.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+xt);let Tt=tf(At);if(Tt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Tt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let me=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,me),B.bufferData(B.PIXEL_PACK_BUFFER,yt.byteLength,B.STREAM_READ),B.readPixels(O,Z,G,W,pt.convert(Wt),pt.convert(jt),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);let We=X!==null?q.get(X).__webglFramebuffer:null;y.bindFramebuffer(B.FRAMEBUFFER,We);let we=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await xp(B,we,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,me),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,yt),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(me),B.deleteSync(we),yt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,O=null,Z=0){let G=Math.pow(2,-Z),W=Math.floor(S.image.width*G),yt=Math.floor(S.image.height*G),bt=O!==null?O.x:0,xt=O!==null?O.y:0;J.setTexture2D(S,0),B.copyTexSubImage2D(B.TEXTURE_2D,Z,0,0,bt,xt,W,yt),y.unbindTexture()},this.copyTextureToTexture=function(S,O,Z=null,G=null,W=0,yt=0){let bt,xt,Et,At,Wt,jt,Tt,me,We,we=S.isCompressedTexture?S.mipmaps[yt]:S.image;if(Z!==null)bt=Z.max.x-Z.min.x,xt=Z.max.y-Z.min.y,Et=Z.isBox3?Z.max.z-Z.min.z:1,At=Z.min.x,Wt=Z.min.y,jt=Z.isBox3?Z.min.z:0;else{let Ve=Math.pow(2,-W);bt=Math.floor(we.width*Ve),xt=Math.floor(we.height*Ve),S.isDataArrayTexture?Et=we.depth:S.isData3DTexture?Et=Math.floor(we.depth*Ve):Et=1,At=0,Wt=0,jt=0}G!==null?(Tt=G.x,me=G.y,We=G.z):(Tt=0,me=0,We=0);let Me=pt.convert(O.format),mn=pt.convert(O.type),St;O.isData3DTexture?(J.setTexture3D(O,0),St=B.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(J.setTexture2DArray(O,0),St=B.TEXTURE_2D_ARRAY):(J.setTexture2D(O,0),St=B.TEXTURE_2D),y.activeTexture(B.TEXTURE0),y.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,O.flipY),y.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),y.pixelStorei(B.UNPACK_ALIGNMENT,O.unpackAlignment);let En=y.getParameter(B.UNPACK_ROW_LENGTH),oe=y.getParameter(B.UNPACK_IMAGE_HEIGHT),Yn=y.getParameter(B.UNPACK_SKIP_PIXELS),wi=y.getParameter(B.UNPACK_SKIP_ROWS),ts=y.getParameter(B.UNPACK_SKIP_IMAGES);y.pixelStorei(B.UNPACK_ROW_LENGTH,we.width),y.pixelStorei(B.UNPACK_IMAGE_HEIGHT,we.height),y.pixelStorei(B.UNPACK_SKIP_PIXELS,At),y.pixelStorei(B.UNPACK_SKIP_ROWS,Wt),y.pixelStorei(B.UNPACK_SKIP_IMAGES,jt);let Ks=S.isDataArrayTexture||S.isData3DTexture,ve=O.isDataArrayTexture||O.isData3DTexture;if(S.isDepthTexture){let Ve=q.get(S),es=q.get(O),Ee=q.get(Ve.__renderTarget),ns=q.get(es.__renderTarget);y.bindFramebuffer(B.READ_FRAMEBUFFER,Ee.__webglFramebuffer),y.bindFramebuffer(B.DRAW_FRAMEBUFFER,ns.__webglFramebuffer);for(let Js=0;Js<Et;Js++)Ks&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,q.get(S).__webglTexture,W,jt+Js),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,q.get(O).__webglTexture,yt,We+Js)),B.blitFramebuffer(At,Wt,bt,xt,Tt,me,bt,xt,B.DEPTH_BUFFER_BIT,B.NEAREST);y.bindFramebuffer(B.READ_FRAMEBUFFER,null),y.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(W!==0||S.isRenderTargetTexture||q.has(S)){let Ve=q.get(S),es=q.get(O);y.bindFramebuffer(B.READ_FRAMEBUFFER,L),y.bindFramebuffer(B.DRAW_FRAMEBUFFER,U);for(let Ee=0;Ee<Et;Ee++)Ks?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ve.__webglTexture,W,jt+Ee):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ve.__webglTexture,W),ve?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,es.__webglTexture,yt,We+Ee):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,es.__webglTexture,yt),W!==0?B.blitFramebuffer(At,Wt,bt,xt,Tt,me,bt,xt,B.COLOR_BUFFER_BIT,B.NEAREST):ve?B.copyTexSubImage3D(St,yt,Tt,me,We+Ee,At,Wt,bt,xt):B.copyTexSubImage2D(St,yt,Tt,me,At,Wt,bt,xt);y.bindFramebuffer(B.READ_FRAMEBUFFER,null),y.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else ve?S.isDataTexture||S.isData3DTexture?B.texSubImage3D(St,yt,Tt,me,We,bt,xt,Et,Me,mn,we.data):O.isCompressedArrayTexture?B.compressedTexSubImage3D(St,yt,Tt,me,We,bt,xt,Et,Me,we.data):B.texSubImage3D(St,yt,Tt,me,We,bt,xt,Et,Me,mn,we):S.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,yt,Tt,me,bt,xt,Me,mn,we.data):S.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,yt,Tt,me,we.width,we.height,Me,we.data):B.texSubImage2D(B.TEXTURE_2D,yt,Tt,me,bt,xt,Me,mn,we);y.pixelStorei(B.UNPACK_ROW_LENGTH,En),y.pixelStorei(B.UNPACK_IMAGE_HEIGHT,oe),y.pixelStorei(B.UNPACK_SKIP_PIXELS,Yn),y.pixelStorei(B.UNPACK_SKIP_ROWS,wi),y.pixelStorei(B.UNPACK_SKIP_IMAGES,ts),yt===0&&O.generateMipmaps&&B.generateMipmap(St),y.unbindTexture()},this.initRenderTarget=function(S){q.get(S).__webglFramebuffer===void 0&&J.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?J.setTextureCube(S,0):S.isData3DTexture?J.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?J.setTexture2DArray(S,0):J.setTexture2D(S,0),y.unbindTexture()},this.resetState=function(){z=0,V=0,X=null,y.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}};var jp={type:"change"},ju={type:"start"},tm={type:"end"},Gc=new qi,Qp=new wn,dM=Math.cos(70*Or.DEG2RAD),Ke=new C,Nn=2*Math.PI,xe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ju=1e-6,Wc=class extends $o{constructor(t,e=null){super(t,e),this.state=xe.NONE,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Jn.ROTATE,MIDDLE:Jn.DOLLY,RIGHT:Jn.PAN},this.touches={ONE:gs.ROTATE,TWO:gs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new C,this._lastQuaternion=new He,this._lastTargetPosition=new C,this._quat=new He().setFromUnitVectors(t.up,new C(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ni,this._sphericalDelta=new Ni,this._scale=1,this._panOffset=new C,this._rotateStart=new lt,this._rotateEnd=new lt,this._rotateDelta=new lt,this._panStart=new lt,this._panEnd=new lt,this._panDelta=new lt,this._dollyStart=new lt,this._dollyEnd=new lt,this._dollyDelta=new lt,this._dollyDirection=new C,this._mouse=new lt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=pM.bind(this),this._onPointerDown=fM.bind(this),this._onPointerUp=mM.bind(this),this._onContextMenu=SM.bind(this),this._onMouseWheel=xM.bind(this),this._onKeyDown=yM.bind(this),this._onTouchStart=vM.bind(this),this._onTouchMove=MM.bind(this),this._onMouseDown=gM.bind(this),this._onMouseMove=_M.bind(this),this._interceptControlDown=bM.bind(this),this._interceptControlUp=EM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=xe.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(jp),this.update(),this.state=xe.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Ke.copy(e).sub(this.target),Ke.applyQuaternion(this._quat),this._spherical.setFromVector3(Ke),this.autoRotate&&this.state===xe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Nn:n>Math.PI&&(n-=Nn),s<-Math.PI?s+=Nn:s>Math.PI&&(s-=Nn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ke.setFromSpherical(this._spherical),Ke.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ke),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Ke.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new C(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new C(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ke.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Gc.origin.copy(this.object.position),Gc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Gc.direction))<dM?this.object.lookAt(this.target):(Qp.setFromNormalAndCoplanarPoint(this.object.up,this.target),Gc.intersectPlane(Qp,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ju||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ju||this._lastTargetPosition.distanceToSquared(this.target)>Ju?(this.dispatchEvent(jp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Nn/60*this.autoRotateSpeed*t:Nn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ke.setFromMatrixColumn(e,0),Ke.multiplyScalar(-t),this._panOffset.add(Ke)}_panUp(t,e){this.screenSpacePanning===!0?Ke.setFromMatrixColumn(e,1):(Ke.setFromMatrixColumn(e,0),Ke.crossVectors(this.object.up,Ke)),Ke.multiplyScalar(t),this._panOffset.add(Ke)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ke.copy(s).sub(this.target);let r=Ke.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Nn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Nn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Nn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Nn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Nn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Nn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Nn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Nn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new lt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function fM(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function pM(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function mM(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(tm),this.state=xe.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function gM(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Jn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=xe.DOLLY;break;case Jn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=xe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=xe.ROTATE}break;case Jn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=xe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=xe.PAN}break;default:this.state=xe.NONE}this.state!==xe.NONE&&this.dispatchEvent(ju)}function _M(i){switch(this.state){case xe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case xe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case xe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function xM(i){this.enabled===!1||this.enableZoom===!1||this.state!==xe.NONE||(i.preventDefault(),this.dispatchEvent(ju),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(tm))}function yM(i){this.enabled!==!1&&this._handleKeyDown(i)}function vM(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case gs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=xe.TOUCH_ROTATE;break;case gs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=xe.TOUCH_PAN;break;default:this.state=xe.NONE}break;case 2:switch(this.touches.TWO){case gs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=xe.TOUCH_DOLLY_PAN;break;case gs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=xe.TOUCH_DOLLY_ROTATE;break;default:this.state=xe.NONE}break;default:this.state=xe.NONE}this.state!==xe.NONE&&this.dispatchEvent(ju)}function MM(i){switch(this._trackPointer(i),this.state){case xe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case xe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case xe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case xe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=xe.NONE}}function SM(i){this.enabled!==!1&&i.preventDefault()}function bM(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function EM(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var yi=class extends Ye{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new lt(.5,.5),this.rotation2D=0,this.addEventListener("removed",function(){this.traverse(function(e){e.element&&e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this.rotation2D=t.rotation2D,this}},Vr=new C,em=new Kt,nm=new Kt,im=new C,sm=new C,Xc=class{constructor(t={}){let e=this,n,s,r,o,a={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.sortObjects=!0,this.getSize=function(){return{width:n,height:s}},this.render=function(g,v){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),v.parent===null&&v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),em.copy(v.matrixWorldInverse),nm.multiplyMatrices(v.projectionMatrix,em),h(g,g,v),this.sortObjects&&f(g)},this.setSize=function(g,v){n=g,s=v,r=n/2,o=s/2,l.style.width=g+"px",l.style.height=v+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let v=0,m=g.children.length;v<m;v++)c(g.children[v])}function h(g,v,m){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){Vr.setFromMatrixPosition(g.matrixWorld),Vr.applyMatrix4(nm);let p=Vr.z>=-1&&Vr.z<=1&&g.layers.test(m.layers)===!0,M=g.element;if(M.style.display=p===!0?"":"none",p===!0){g.onBeforeRender(e,v,m);let x=100*g.center.x,b=100*g.center.y;M.style.transformOrigin=`${x}% ${b}%`;let E=-g.rotation2D,R=Vr.x*r+r,_=-Vr.y*o+o;M.style.transform=`translate(${-x}%, ${-b}%) translate(${R}px, ${_}px) rotate(${E}rad)`,M.parentNode!==l&&l.appendChild(M),g.onAfterRender(e,v,m)}let I={distanceToCameraSquared:d(m,g)};a.objects.set(g,I)}for(let p=0,M=g.children.length;p<M;p++)h(g.children[p],v,m)}function d(g,v){return im.setFromMatrixPosition(g.matrixWorld),sm.setFromMatrixPosition(v.matrixWorld),im.distanceToSquared(sm)}function u(g){let v=[];return g.traverseVisible(function(m){m.isCSS2DObject&&v.push(m)}),v}function f(g){let v=u(g).sort(function(p,M){if(p.renderOrder!==M.renderOrder)return M.renderOrder-p.renderOrder;let I=a.objects.get(p).distanceToCameraSquared,x=a.objects.get(M).distanceToCameraSquared;return I-x}),m=v.length;for(let p=0,M=v.length;p<M;p++)v[p].element.style.zIndex=m-p}}};var Gr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Vn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},TM=new ms(-1,1,1,-1,0,1),Qu=class extends te{constructor(){super(),this.setAttribute("position",new zt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new zt([0,2,0,0,2,0],2))}},wM=new Qu,bs=class{constructor(t){this._mesh=new Yt(wM,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,TM)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var qc=class extends Vn{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof Se?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Zi.clone(t.uniforms),this.material=new Se({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new bs(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var pa=class extends Vn{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){let s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Yc=class extends Vn{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var Zc=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let n=t.getSize(new lt);this._width=n.width,this._height=n.height,e=new qe(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:dn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new qc(Gr),this.copyPass.material.blending=jn,this.timer=new Yo}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());let e=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){let a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}pa!==void 0&&(o instanceof pa?n=!0:o instanceof Yc&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new lt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var ma={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var $c=class extends Vn{constructor(){super(),this.isOutputPass=!0,this.uniforms=Zi.clone(ma.uniforms),this.material=new Cr({name:ma.name,uniforms:this.uniforms,vertexShader:ma.vertexShader,fragmentShader:ma.fragmentShader}),this._fsQuad=new bs(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},$t.getTransfer(this._outputColorSpace)===le&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Jo?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===jo?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Qo?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ta?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===na?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ks?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===ea&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Kc=class extends Vn{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new mt}render(t,e,n){let s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}};var rm={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new mt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var Wr=class i extends Vn{constructor(t,e=1,n,s){super(),this.strength=e,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new lt(t.x,t.y):new lt(256,256),this.clearColor=new mt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new qe(r,o,{type:dn,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let d=new qe(r,o,{type:dn,depthBuffer:!1});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let u=new qe(r,o,{type:dn,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),o=Math.round(o/2)}let a=rm;this.highPassUniforms=Zi.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Se({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new lt(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Zi.clone(Gr.uniforms),this.blendMaterial=new Se({uniforms:this.copyUniforms,vertexShader:Gr.vertexShader,fragmentShader:Gr.fragmentShader,premultipliedAlpha:!0,blending:Ne,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new mt,this._oldClearAlpha=1,this._basic=new De,this._fsQuad=new bs(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new lt(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){let e=[],n=t/3;for(let o=0;o<t;o++)e.push(.39894*Math.exp(-.5*o*o/(n*n))/n);let s=[],r=[];for(let o=1;o<t;o+=2){let a=e[o],l=o+1<t?e[o+1]:0,c=a+l;s.push((o*a+(o+1)*l)/c),r.push(c)}return new Se({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new lt(.5,.5)},direction:{value:new lt(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new Se({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Wr.BlurDirectionX=new lt(1,0);Wr.BlurDirectionY=new lt(0,1);var Dt=Math.PI*2,Ce=(i,t,e)=>Math.max(t,Math.min(e,i)),Un=(i,t,e)=>i+(t-i)*e,Gn=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2,Je=i=>1-Math.pow(1-i,3),Cn=(i,t)=>1-Math.exp(-i*t);function Es(i){return()=>{i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Wn(i,t,e){let n=document.createElement(i);return t&&(n.className=t),e!=null&&(n.innerHTML=e),n}function ei(i,t){t=String(t??""),i&&i.textContent!==t&&(i.textContent=t)}var td={transparent:!0,depthWrite:!1,blending:Ne,premultipliedAlpha:!0},qr=class{constructor(t,e){this.cap=t,this.n=0,this.pos=new Float32Array(t*3),this.col=new Float32Array(t*3),this.size=new Float32Array(t);let n=new te;n.setAttribute("position",new ue(this.pos,3).setUsage(Ss)),n.setAttribute("rgb",new ue(this.col,3).setUsage(Ss)),n.setAttribute("size",new ue(this.size,1).setUsage(Ss)),n.setDrawRange(0,0),this.material=new Se({...td,uniforms:{map:{value:e},focal:{value:600}},vertexShader:`
        attribute vec3 rgb;
        attribute float size;
        uniform float focal;
        varying vec3 vC;
        void main() {
          vC = rgb;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = clamp(size * focal / max(1.0, -mv.z), 0.0, 220.0);
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        uniform sampler2D map;
        varying vec3 vC;
        void main() {
          float a = texture2D(map, gl_PointCoord).a;
          gl_FragColor = vec4(vC * a, a);
        }`}),this.points=new Os(n,this.material),this.points.frustumCulled=!1}begin(){this.n=0}add(t,e,n,s){if(this.n>=this.cap||n<=.002||s<=0)return;let r=this.n++;this.pos[r*3]=t.x,this.pos[r*3+1]=t.y,this.pos[r*3+2]=t.z,this.col[r*3]=e.r*n,this.col[r*3+1]=e.g*n,this.col[r*3+2]=e.b*n,this.size[r]=s}end(){let t=this.points.geometry;t.setDrawRange(0,this.n);for(let e of["position","rgb","size"]){let n=t.attributes[e];n.clearUpdateRanges(),n.addUpdateRange(0,this.n*n.itemSize),n.needsUpdate=!0}}},jc=class{constructor(t){this.cap=t,this.n=0,this.pos=new Float32Array(t*3),this.col=new Float32Array(t*4),this.dist=new Float32Array(t);let e=new te;e.setAttribute("position",new ue(this.pos,3).setUsage(Ss)),e.setAttribute("rgba",new ue(this.col,4).setUsage(Ss)),e.setAttribute("dist",new ue(this.dist,1).setUsage(Ss)),e.setDrawRange(0,0),this.material=new Se({...td,uniforms:{time:{value:0}},vertexShader:`
        attribute vec4 rgba;
        attribute float dist;
        varying vec4 vC;
        varying float vD;
        void main() {
          vC = rgba;
          vD = dist;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,fragmentShader:`
        uniform float time;
        varying vec4 vC;
        varying float vD;
        void main() {
          if (vD >= 0.0 && fract((vD - time * 34.0) / 15.0) > 0.5) discard;
          gl_FragColor = vec4(vC.rgb * vC.a, vC.a);
        }`}),this.lines=new $n(e,this.material),this.lines.frustumCulled=!1}begin(){this.n=0}vert(t,e,n,s){let r=this.n++;this.pos[r*3]=t.x,this.pos[r*3+1]=t.y,this.pos[r*3+2]=t.z,this.col[r*4]=e.r,this.col[r*4+1]=e.g,this.col[r*4+2]=e.b,this.col[r*4+3]=n,this.dist[r]=s}path(t,e,n,s){if(this.n+(t.length-1)*2>this.cap)return;let r=0,o=typeof n=="function"?n:()=>n;for(let a=0;a<t.length-1;a++){let l=t[a],c=t[a+1],h=l.distanceTo(c);this.vert(l,e,o(a/(t.length-1)),s?r:-1),this.vert(c,e,o((a+1)/(t.length-1)),s?r+h:-1),r+=h}}circle(t,e,n,s,r,o,a=48){if(!(this.n+a*2>this.cap||o<=.002))for(let l=0;l<a;l++){let c=l/a*Dt,h=(l+1)/a*Dt;Jc.copy(t).addScaledVector(n,Math.cos(c)*e).addScaledVector(s,Math.sin(c)*e),this.vert(Jc,r,o,-1),Jc.copy(t).addScaledVector(n,Math.cos(h)*e).addScaledVector(s,Math.sin(h)*e),this.vert(Jc,r,o,-1)}}end(){let t=this.lines.geometry;t.setDrawRange(0,this.n);for(let e of["position","rgba","dist"]){let n=t.attributes[e];n.clearUpdateRanges(),n.addUpdateRange(0,this.n*n.itemSize),n.needsUpdate=!0}}},Jc=new C,Xr=96,Yr=(()=>{let i=1/Math.cos(Math.PI/Xr),t=new Float32Array((Xr+1)*6),e=new Float32Array((Xr+1)*2),n=[];for(let r=0;r<=Xr;r++){let o=r/Xr*Dt,a=Math.cos(o),l=Math.sin(o);t.set([a,l,0,a*i,l*i,0],r*6),e[r*2+1]=1,r<Xr&&n.push(r*2,r*2+1,r*2+2,r*2+1,r*2+3,r*2+2)}let s=new te;return s.setAttribute("position",new ue(t,3)),s.setAttribute("edge",new ue(e,1)),s.setIndex(n),s})();function Zr(i={}){return new Se({...td,side:Be,uniforms:{color:{value:new mt(i.color??16777215)},opacity:{value:i.opacity??1},scale:{value:1},rIn:{value:.9},rOut:{value:1},glow:{value:i.glow??0},head:{value:-100},tail:{value:1.4},tailFloor:{value:i.floor??.14},dashes:{value:i.dashes??0},dashSpeed:{value:i.dashSpeed??0},time:{value:0}},vertexShader:`
      uniform float scale, rIn, rOut;
      attribute float edge;
      varying vec2 vP;
      void main() {
        // vP in world units on the ring's plane; the mesh is scaled by scale, the band's outer radius.
        float inner = max(rIn - (scale - rOut), 0.0);
        vP = position.xy * mix(inner, scale, edge);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(vP / scale, 0.0, 1.0);
      }`,fragmentShader:`
      uniform vec3 color;
      uniform float opacity, rIn, rOut, glow, head, tail, tailFloor, dashes, dashSpeed, time;
      varying vec2 vP;
      void main() {
        float r = length(vP);
        float aa = fwidth(r) * 1.25;
        float m = smoothstep(rIn - aa, rIn + aa, r) * (1.0 - smoothstep(rOut - aa, rOut + aa, r));
        if (glow > 0.0) {
          float mid = 0.5 * (rIn + rOut), hw = 0.5 * (rOut - rIn);
          m = max(m, exp(-max(abs(r - mid) - hw, 0.0) / glow) * 0.32);
        }
        float ang = atan(vP.y, vP.x);
        float k = 1.0;
        if (head > -50.0) {
          float d = mod(head - ang, 6.2831853);
          k = mix(tailFloor, 1.0, exp(-d / tail));
        }
        if (dashes > 0.0) k *= step(fract(ang / 6.2831853 * dashes - time * dashSpeed), 0.5);
        float a = m * k * opacity;
        if (a < 0.002) discard;
        gl_FragColor = vec4(color * a, a);
      }`})}function $r(i,t,e,n=6){let s=t+e+n;i.scale.setScalar(s);let r=i.material.uniforms;r.scale.value=s,r.rIn.value=t-e/2,r.rOut.value=t+e/2}var vi={size:256,hex:82};function Kr(i,t,e,n){i.beginPath();for(let s=0;s<6;s++){let r=-Math.PI/2+s*Math.PI/3,o=t+Math.cos(r)*n,a=e+Math.sin(r)*n;s?i.lineTo(o,a):i.moveTo(o,a)}i.closePath()}function Qc(i){let t=new Kn(i);return t.colorSpace=Ie,t.anisotropy=4,t}var th=class{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=this.canvas.height=vi.size,this.x=this.canvas.getContext("2d"),this.texture=Qc(this.canvas),this.key=""}draw(t,e,n){let s=t.STATUS[e.status]||t.STATUS.busy,r=e.ctxMax?Math.min(1,e.ctx/e.ctxMax):0,o=t.clipT(e.name,11),a=e.status==="waiting"?"! "+s.label:s.label,l=[o,a,s.color,r.toFixed(2),n].join("|");if(l===this.key)return;this.key=l;let c=this.x,h=vi.size/2,d=vi.hex;c.clearRect(0,0,vi.size,vi.size),c.lineWidth=8,c.strokeStyle="rgba(255,255,255,0.08)",c.beginPath(),c.arc(h,h,d+25,0,Dt),c.stroke(),r>0&&(c.strokeStyle=t.ctxColor(r),c.beginPath(),c.arc(h,h,d+25,-Math.PI/2,-Math.PI/2+r*Dt),c.stroke()),Kr(c,h,h,d),c.fillStyle="rgba(18,10,4,0.96)",c.fill(),c.lineWidth=7,c.strokeStyle=s.color,c.stroke(),Kr(c,h,h,d*.74),c.lineWidth=3.5,c.strokeStyle=t.hexA(n,.6),c.stroke(),c.textAlign="center",c.textBaseline="middle";let u=31;for(c.font=`700 ${u}px ${t.FONT}`;u>16&&c.measureText(o).width>d*1.62;)c.font=`700 ${--u}px ${t.FONT}`;c.fillStyle="#fff8f0",c.fillText(o,h,h-d*.13);let f=21;for(c.font=`${f}px ${t.FONT}`;f>12&&c.measureText(a).width>d*1.62;)c.font=`${--f}px ${t.FONT}`;c.fillStyle=s.color,c.fillText(a,h,h+d*.31),this.texture.needsUpdate=!0}dispose(){this.texture.dispose()}};function om(){let i=document.createElement("canvas");i.width=i.height=vi.size;let t=i.getContext("2d"),e=vi.size/2;t.strokeStyle="#fff",t.shadowColor="#fff",t.lineWidth=10;for(let n of[34,18,8])t.shadowBlur=n,Kr(t,e,e,vi.hex),t.stroke();return Qc(i)}function am(){let i=()=>{let e=document.createElement("canvas");e.width=e.height=128;let n=e.getContext("2d"),s=64;return Kr(n,s,s,40),n.fillStyle="rgba(12,8,22,0.55)",n.fill(),n.lineWidth=5,n.strokeStyle="rgba(157,107,255,0.7)",n.stroke(),n.fillStyle="rgba(157,107,255,0.8)",n.fillRect(s-12,s-13,8,26),n.fillRect(s+4,s-13,8,26),Qc(e)},t=e=>{let n=document.createElement("canvas");n.width=n.height=128;let s=n.getContext("2d"),r=64,o=40;return Kr(s,r,r,o),s.fillStyle=e?"rgba(12,7,26,0.95)":"rgba(12,8,6,0.9)",s.fill(),s.lineWidth=6,s.strokeStyle=e?"#9d6bff":"#5c4d40",s.stroke(),e?(Kr(s,r,r,o*.55),s.fillStyle="rgba(157,107,255,0.55)",s.fill()):(s.fillStyle="#3dffa8",s.font='700 40px "SF Mono", Menlo, monospace',s.textAlign="center",s.textBaseline="middle",s.fillText("\u2713",r,r+2)),Qc(n)};return{running:t(!0),done:t(!1),parked:i()}}var eh=Ie,nd={accent:"#f88008","accent-soft":"#ffb057",txt:"#f5ebe0",txt2:"#d9c3a8",hi:"#fff8f0","deep-rgb":"5, 3, 2"},ed=new mt(nd.accent).getHSL({},eh);function Sn(i,t=1){let e=i.getHex();return`rgba(${e>>16},${e>>8&255},${e&255},${t})`}function id(){let i=getComputedStyle(document.getElementById("mapwrap")||document.documentElement),t=a=>i.getPropertyValue(`--${a}`).trim()||nd[a],e=a=>new mt().setStyle(a.endsWith("-rgb")?`rgb(${t(a)})`:t(a)),n=e("accent"),s=n.getHSL({},eh),r=s.h-ed.h,o=ed.s?s.s/ed.s:1;return{key:Object.keys(nd).map(t).join("|"),accent:n,soft:e("accent-soft"),txt:e("txt"),txt2:e("txt2"),hi:e("hi"),bg:e("deep-rgb").multiplyScalar(.6),tint(a){let l=new mt(a),c=l.getHSL({},eh);return l.setHSL(((c.h+r)%1+1)%1,Math.min(1,c.s*o),c.l,eh)}}}var ni=512,ce=ni/2,ke=118,rn=ke/55;function nh(i=ni){let t=document.createElement("canvas");return t.width=t.height=i,t}function ih(i){let t=new Kn(i);return t.colorSpace=Ie,t.anisotropy=4,t}function lm(i,t,e,n){let s=ni/ke*e,r=new Re,o=(w,P={})=>{let D=new xn(new un({map:w,transparent:!0,depthWrite:!1,...P}));return D.scale.setScalar(s),r.add(D),D},a=new xn(new un({map:t,transparent:!0,depthWrite:!1,blending:Ne,opacity:.45}));a.scale.setScalar(e*3.4),r.add(a);let l=nh(256),c=l.getContext("2d"),h=ih(l),d=o(h,{transparent:!1,depthWrite:!0,alphaTest:.5}),u=nh(),f=u.getContext("2d"),g=ih(u),v=o(g,{blending:Ne}),m=nh(),p=m.getContext("2d");p.strokeStyle="rgba(157,107,255,0.7)",p.lineWidth=2.8;for(let w=0;w<3;w++)p.beginPath(),p.arc(ce,ce,ke+27*rn,w*Dt/3,w*Dt/3+.9),p.stroke();let M=o(ih(m),{blending:Ne}),I=nh(),x=I.getContext("2d"),b=ih(I);o(b);let E=(w,P,D,L,U,z=-Math.PI/2)=>{x.lineWidth=U,x.strokeStyle=L,x.beginPath(),x.arc(ce,ce,w,0,Dt),x.stroke(),P>0&&(x.strokeStyle=D,x.beginPath(),x.arc(ce,ce,w,z,z+Math.min(1,P)*Dt),x.stroke())},R="",_;function T(w){_=w,a.material.color.copy(_.accent).multiplyScalar(1.3),c.clearRect(0,0,256,256),c.fillStyle=Sn(_.tint("#0d0805")),c.beginPath(),c.arc(128,128,(ke+12*rn)/ni*256,0,Dt),c.fill(),h.needsUpdate=!0,f.clearRect(0,0,ni,ni),f.lineWidth=2.4;for(let P=0;P<90;P++){let D=P/90*Dt,L=P%5===0;f.strokeStyle=Sn(_.soft,L?.6:.25),f.beginPath(),f.moveTo(ce+Math.cos(D)*(ke+13*rn),ce+Math.sin(D)*(ke+13*rn)),f.lineTo(ce+Math.cos(D)*(ke+(L?21:16)*rn),ce+Math.sin(D)*(ke+(L?21:16)*rn)),f.stroke()}g.needsUpdate=!0,R=""}T(n);function A(w,P,D){let L=[w.tools,D.toFixed(1),w.okRate.toFixed(3),w.cacheHit.toFixed(2),i.CATS.map(X=>P[X]||0)].join("|");if(L===R)return;R=L,x.clearRect(0,0,ni,ni);let U=x.createRadialGradient(ce,ce,0,ce,ce,ke-16*rn);U.addColorStop(0,Sn(_.accent,.2)),U.addColorStop(1,Sn(_.accent,0)),x.fillStyle=U,x.beginPath(),x.arc(ce,ce,ke-16*rn,0,Dt),x.fill();let z=i.CATS.reduce((X,H)=>X+(P[H]||0),0);if(x.lineWidth=6*rn,z){let X=-Math.PI/2;for(let H of i.CATS){let Y=P[H]||0;if(!Y)continue;let $=X+Y/z*Dt;x.strokeStyle=i.CAT[H].color,x.beginPath(),x.arc(ce,ce,ke+4*rn,X+.012,Math.max(X+.013,$-.012)),x.stroke(),X=$}}else E(ke+4*rn,0,"#000","rgba(255,255,255,0.06)",6*rn);E(ke-6*rn,w.okRate,"#3dffa8","rgba(255,77,77,0.55)",3*rn),E(ke-13*rn,w.cacheHit,Sn(_.accent),"rgba(255,255,255,0.08)",3*rn);let V=Math.round(ke*.13);x.textAlign="center",x.textBaseline="alphabetic",x.fillStyle=Sn(_.txt,.62),x.font=`${V}px ${i.FONT}`,x.fillText(`${w.tools} calls today`,ce,ce-ke*.36),x.fillStyle=Sn(_.hi),x.font=`700 ${Math.round(ke*.42)}px ${i.FONT}`,x.fillText(D.toFixed(1),ce,ce+ke*.1),x.fillStyle=Sn(_.soft,.92),x.font=`${V}px ${i.FONT}`,x.fillText("TOOLS / MIN",ce,ce+ke*.3),x.fillStyle=Sn(_.txt,.62),x.fillText(`ok ${(w.okRate*100).toFixed(1)}% \xB7 cache ${(w.cacheHit*100).toFixed(0)}%`,ce,ce+ke*.48),b.needsUpdate=!0}return{group:r,occluder:d,draw:A,paint:T,px:ni,size:s,reach:(ke+30*rn)/ni*s,snapshot(w,P){w.setTransform(1,0,0,1,0,0),w.globalCompositeOperation="source-over",w.clearRect(0,0,ni,ni),w.fillStyle=Sn(_.tint("#0d0805")),w.beginPath(),w.arc(ce,ce,ke+12*rn,0,Dt),w.fill(),w.globalCompositeOperation="lighter";for(let[D,L]of[[u,P/14e3],[m,-P/6e3]])w.setTransform(1,0,0,1,ce,ce),w.rotate(L),w.drawImage(D,-ce,-ce);w.setTransform(1,0,0,1,0,0),w.globalCompositeOperation="source-over",w.drawImage(I,0,0)},update(w,P){v.material.rotation=-w/14e3,M.material.rotation=w/6e3,a.material.opacity=.14+.08*(.5+.5*Math.sin(w/700))+.12*P}}}function hm(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new te,c=0;for(let h=0;h<i.length;++h){let d=i[h],u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0,d=[];for(let u=0;u<i.length;++u){let f=i[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=i[u].attributes.position.count}l.setIndex(d)}for(let h in r){let d=cm(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(let h in o){let d=o[h][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){let f=[];for(let v=0;v<o[h].length;++v)f.push(o[h][v][u]);let g=cm(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}}return l}function cm(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new ue(o,e,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let d=l/e;for(let u=0,f=h.count;u<f;u++)for(let g=0;g<e;g++){let v=h.getComponent(u,g);a.setComponent(u+d,g,v)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function um(i,t=Math.PI/3){let e=i.index?i.toNonIndexed():i,n=e.attributes.position,s=n.count,r;if(n.isBufferAttribute===!0&&n.itemSize===3&&n.normalized===!1)r=n.array;else{r=new Float64Array(s*3);for(let x=0;x<s;x++)r[3*x+0]=n.getX(x),r[3*x+1]=n.getY(x),r[3*x+2]=n.getZ(x)}let o=Math.cos(t),a=(1+1e-10)*100,l=s/3,c=new Float64Array(l*3);for(let x=0;x<l;x++){let b=9*x,E=r[b+0],R=r[b+1],_=r[b+2],T=r[b+3],A=r[b+4],w=r[b+5],P=r[b+6],D=r[b+7],L=r[b+8],U=P-T,z=D-A,V=L-w,X=E-T,H=R-A,Y=_-w,$=z*Y-V*H,ht=V*X-U*Y,ot=U*H-z*X,Rt=1/(Math.sqrt($*$+ht*ht+ot*ot)||1);c[3*x+0]=$*Rt,c[3*x+1]=ht*Rt,c[3*x+2]=ot*Rt}let h=new Int32Array(s),d=new Float64Array(s*3),u=1;for(;u<s*2;)u<<=1;let f=u-1,g=new Int32Array(u),v=0;for(let x=0;x<s;x++){let b=3*x,E=Math.trunc(r[b+0]*a),R=Math.trunc(r[b+1]*a),_=Math.trunc(r[b+2]*a),T=(Math.imul(E,73856093)^Math.imul(R,19349663)^Math.imul(_,83492791))&f;for(;;){let A=g[T];if(A===0){let P=3*v;d[P+0]=E,d[P+1]=R,d[P+2]=_,g[T]=v+1,h[x]=v++;break}let w=3*(A-1);if(d[w+0]===E&&d[w+1]===R&&d[w+2]===_){h[x]=A-1;break}T=T+1&f}}let m=new Int32Array(v+1);for(let x=0;x<s;x++)m[h[x]+1]++;for(let x=0;x<v;x++)m[x+1]+=m[x];let p=new Int32Array(s),M=m.slice(0,v);for(let x=0;x<l;x++){let b=3*x;p[M[h[b+0]]++]=x,p[M[h[b+1]]++]=x,p[M[h[b+2]]++]=x}let I=new Float32Array(s*3);for(let x=0;x<l;x++){let b=3*x,E=c[b+0],R=c[b+1],_=c[b+2];for(let T=0;T<3;T++){let A=b+T,w=h[A],P=0,D=0,L=0;for(let z=m[w],V=m[w+1];z<V;z++){let X=3*p[z],H=c[X+0],Y=c[X+1],$=c[X+2];E*H+R*Y+_*$>o&&(P+=H,D+=Y,L+=$)}let U=1/(Math.sqrt(P*P+D*D+L*L)||1);I[3*A+0]=P*U,I[3*A+1]=D*U,I[3*A+2]=L*U}}return e.setAttribute("normal",new ue(I,3,!1)),e}var sh=null;function AM(){if(sh)return sh;let i=new Hn(13,15.5,3,6);return sh={base:i,baseEdges:new cs(i),core:new ko(6.5,0),ring:new hs(11.5,.8,6,48),ring2:new hs(15,.35,4,64),spire:new Hn(.45,.8,9,6),tip:new zs(.75,8,6)},sh}function pm(i){let t=AM(),e=new Re,n=new vn({color:3813418,metalness:.72,roughness:.36,flatShading:!0,emissive:i,emissiveIntensity:.05});e.add(new Yt(t.base,n)),e.add(new $n(t.baseEdges,new Di({color:i.clone().multiplyScalar(1.4),transparent:!0,opacity:.55})));let s=new vn({color:788486,emissive:i,emissiveIntensity:.9,metalness:.2,roughness:.3,flatShading:!0}),r=new Yt(t.core,s);r.position.y=11,e.add(r);let o=new Yt(t.ring,new De({color:i.clone().multiplyScalar(1.3),transparent:!0,opacity:.85}));o.position.y=11,e.add(o);let a=new Yt(t.ring2,new De({color:i.clone(),transparent:!0,opacity:.35}));a.position.y=11,a.rotation.x=Math.PI/2,e.add(a);let l=new De({color:i.clone().multiplyScalar(2)});for(let c=0;c<3;c++){let h=c/3*Math.PI*2+Math.PI/6,d=new Yt(t.spire,n);d.position.set(Math.cos(h)*10.5,5.5,Math.sin(h)*10.5),e.add(d);let u=new Yt(t.tip,l);u.position.set(Math.cos(h)*10.5,10.4,Math.sin(h)*10.5),e.add(u)}return{group:e,core:r,coreMat:s,ring:o,ring2:a}}function mm(){let i=new Re,t=new vn({color:1456762,metalness:.15,roughness:.55,emissive:662080,emissiveIntensity:1}),e=new vn({color:861008,metalness:.15,roughness:.6}),n=new De({color:16773320}),s=new De({color:16777215}),r=[],o=(h,d,u,f,g,v,m,p)=>{let M=new yn(d,u,f);r.push(M);let I=new Yt(M,g);return I.position.set(v,m,p),h.add(I),I},a=34,l=16;o(i,l-1.6,a-4,l-1.6,t,0,-2,0);for(let[h,d]of[[-1,-1],[1,-1],[-1,1],[1,1]])o(i,2,a,2,e,h*(l/2-1),0,d*(l/2-1));o(i,l+1,1.6,l+1,e,0,-a/2-.8,0),o(i,l,2.6,l,e,0,a/2-2.3,0),o(i,l+.6,1.2,l+.6,t,0,a/2-.4,0),o(i,l-3,1.4,l-3,t,0,a/2+.9,0);let c=o(i,2,2.6,2,s,0,a/2+3,0);o(i,2.8,.6,2.8,e,0,a/2+4.6,0);for(let h=0;h<4;h++){let d=new Re;d.rotation.y=h*Math.PI/2,i.add(d);let u=l/2-.72;o(d,.5,a-6,.4,e,0,-2.5,u+.1);for(let f of[-1,1]){let g=f*3.4;for(let[v,m]of[[-1.15,0],[1.15,0],[-1.15,-2],[1.15,-2]])o(d,1.9,1.6,.3,n,g+v,a/2-6+m,u);for(let v of[4,-3.5,-11])o(d,4.8,6,.5,e,g,v-2,u)}}return{group:i,blue:t,lamp:c,own:[t,e,n,s,...r]}}var gm=29.5;function si(i,t=()=>!0,e=!0){let n=i[0].pts.length,s=[],r=(a,l)=>[a.pts[l%n][0],a.pts[l%n][1],a.z];for(let a=0;a<i.length-1;a++)for(let l=0;l<n;l++){if(!t(a,l))continue;let c=r(i[a],l),h=r(i[a],l+1),d=r(i[a+1],l+1),u=r(i[a+1],l);s.push(...c,...u,...h,...h,...u,...d)}for(let a of e?[i[0],i[i.length-1]]:[]){let l=a.pts.reduce((c,h)=>c+h[1],0)/n;for(let c=0;c<n;c++)s.push(0,l,a.z,...r(a,c),...r(a,c+1))}let o=new te;return o.setAttribute("position",new zt(s,3)),um(o,.6)}function ii(i,t,e,n,s,r,o){let a=[[.45*t,e-.04],[.8*t,n],[.97*t,s],[t,r],[.93*t,o+.55],[.7*t,o]];return{z:i,pts:[[0,e],...a,[0,o],...[...a].reverse().map(([l,c])=>[-l,c])]}}var Ki=(i,t,e,n,s)=>({z:i,pts:[[-t,n],[-e,s-.35],[-e*.6,s],[e*.6,s],[e,s-.35],[t,n]]});function _m(i,t,e,n){let s=new Yt(new Hn(e,e,i.distanceTo(t),6),n);return s.position.copy(i).add(t).multiplyScalar(.5),s.quaternion.setFromUnitVectors(new C(0,1,0),t.clone().sub(i).normalize()),s}var bn=(i,t,e)=>new C(i,t,e),rh=null;function RM(){if(rh)return rh;let i=si([ii(14.2,2.4,1.65,1.75,1.7,1.45,1.05),ii(13.6,4.1,2,2.2,2.1,1.7,.9),ii(12.4,5.3,2.4,2.75,2.6,2,.8),ii(10.5,6,2.75,3.4,3.2,2.25,.72),ii(8.4,6.3,2.95,3.95,3.7,2.45,.7),ii(5.6,6.05,3.3,3.55,3.35,2.35,.65),ii(1,5.95,3.4,3.5,3.3,2.25,.62),ii(-4,6.2,3.5,3.65,3.45,2.35,.62),ii(-8.4,6.6,3.6,4.05,3.8,2.55,.68),ii(-11.6,6.35,3.55,3.75,3.55,2.5,.85),ii(-13.6,5.95,3.35,3.4,3.25,2.35,1.1),ii(-14.2,5.7,3.2,3.25,3.1,2.3,1.2)]),t=[Ki(5.8,4.1,3.5,3.3,3.42),Ki(1.6,4.35,3.3,3.35,5.85),Ki(-2.6,4.45,3.35,3.45,5.95),Ki(-9.6,4.7,2.9,3.6,3.68)],e=(u,f)=>f!==5&&(u===0||u===1&&(f===0||f===4)||u===2&&f>=1&&f<=3),n=si(t,e,!1),s=si(t,(u,f)=>f!==5&&!e(u,f),!1),r=new Hn(1.85,1.85,1.3,24);r.rotateZ(Math.PI/2);let o=new Hn(1.22,1.22,1.36,18);o.rotateZ(Math.PI/2);let a=[];for(let u=0;u<5;u++){let f=new yn(1.42,.24,2.25);f.rotateX(u/5*Math.PI),a.push(f)}let l=new Hn(.32,.32,1.46,10);l.rotateZ(Math.PI/2),a.push(l);let c=hm(a.map(u=>u.index?u.toNonIndexed():u)),h=new Hn(.65,.85,1.2,12);h.rotateX(Math.PI/2);let d=new hs(1.9,.26,8,28);return d.rotateX(Math.PI/2),rh={body:i,bodyEdges:new cs(i,32),glass:n,roof:s,roofEdges:new cs(s,25),tire:r,rim:o,spokes:c,nozzle:h,fan:d,wing:new yn(9.8,.28,2.3),fin:new yn(.28,1.6,2),vent:new yn(.2,.32,1.5),mirror:new yn(.9,.45,.6),intake:new yn(4,.3,.2),taillight:new yn(10.6,.22,.2)},rh}var dm=null;function CM(i){return dm||(dm={trim:new vn({color:723983,metalness:.4,roughness:.5,envMap:i,envMapIntensity:.5}),rubber:new vn({color:657932,metalness:0,roughness:.9}),rim:new vn({color:1382429,metalness:.8,roughness:.35,envMap:i,envMapIntensity:.8}),spokes:new vn({color:12634322,metalness:1,roughness:.2,envMap:i}),head:new De({color:15136511}),tail:new De({color:16720440})})}function xm(){let i=new Us;i.background=new mt(460810);let t=(e,n,s,r,o,a,l)=>{let c=new Yt(new Bs(e,n),new De({color:new mt(s).multiplyScalar(r),side:Be}));c.position.set(o,a,l),c.lookAt(0,0,0),i.add(c)};return t(14,6,16777215,2,0,10,0),t(26,.9,16777215,3,0,6,11),t(26,.9,16777215,3,0,6,-11),t(9,6,16752714,2,-13,1,0),t(9,6,8364031,1.3,13,1,0),i}function ym(i,t){let e=RM(),n=CM(t),s=new Re,r=new us({color:1777446,metalness:.55,roughness:.36,clearcoat:1,clearcoatRoughness:.24,envMap:t,emissive:i,emissiveIntensity:.02,side:Be}),o=new us({color:5914128,metalness:1,roughness:.08,envMap:t,envMapIntensity:1.2,emissive:13208104,emissiveIntensity:.1,side:Be}),a=new Di({color:i.clone().multiplyScalar(1.2),transparent:!0,opacity:.26}),l=new De({color:i.clone().multiplyScalar(1.4),transparent:!0,opacity:.85}),c=[r,o,a,l],h=(f,g,v,m,p)=>{let M=new Yt(f,g);return M.position.set(v,m,p),s.add(M),M},d=(f,g,v,m)=>{let p=_m(f,g,v,m);c.push(p.geometry),s.add(p)};s.add(new Yt(e.body,r),new $n(e.bodyEdges,a),new Yt(e.glass,o),new Yt(e.roof,r),new $n(e.roofEdges,a));for(let f of[-1,1])d(bn(f*4.1,3.3,5.8),bn(f*3.3,5.5,1.6),.17,n.trim),d(bn(f*4.4,3.4,-.6),bn(f*3.33,5.55,-.6),.15,n.trim),h(e.mirror,r,f*4.85,3.85,4.3),d(bn(f*2.6,1.92,13.95),bn(f*4.95,2.56,12.55),.13,n.head);h(e.intake,n.trim,0,1.35,14.22),h(e.taillight,n.tail,0,2.95,-14.25);for(let[f,g]of[[5.75,8.4],[6.05,-8.4]])for(let v of[-1,1])h(e.tire,n.rubber,v*f,1.85,g),h(e.rim,n.rim,v*f,1.85,g),h(e.spokes,n.spokes,v*f,1.85,g);h(e.wing,n.trim,0,5,-12.7).rotation.x=-.1;for(let f of[-1,1])h(e.fin,n.trim,f*3.3,4.2,-12.5);let u=[];for(let f of[-1,1]){h(e.nozzle,n.trim,f*2.7,2.15,-14.5),u.push({at:bn(f*2.7,2.15,-15.5),main:!0});for(let[g,v,m]of[[6.02,2.3,4],[6.27,2.37,-4.6]])h(e.vent,n.trim,f*g,v,m),u.push({at:bn(f*(g+.5),v-.25,m),main:!1})}return h(e.fan,l,0,.5,-1),u.push({at:bn(0,-.8,-1),main:!1,fan:!0}),{group:s,metal:r,glassMat:o,own:c,jets:u.map(f=>f.at),jetKinds:u}}var rd=30;function Mi(i,t,e,n){let s=e-n,r=[[.4*t,e-.05*s],[.8*t,n+.74*s],[t,n+.46*s],[.86*t,n+.2*s],[.5*t,n+.03*s]];return{z:i,pts:[[0,e],...r,[0,n],...[...r].reverse().map(([o,a])=>[-o,a])]}}function oh(i,t,e,n,s){let r=(o,a)=>[o*(t-e)-t,s+a*n];return{z:i,pts:[r(0,0),r(.12,.4),r(.4,.5),r(.75,.28),r(1,0),r(.75,-.2),r(.4,-.36),r(.12,-.32)]}}function sd(i,t,e,n){let s=-(t*.62+e*.38);return{z:i,pts:[[0,-t],[n/2,s],[0,-e],[-n/2,s]]}}var fm=(i,t=24)=>new Ho(i.map(([e,n])=>new lt(e,n)),t).rotateX(Math.PI/2);function vm(i){let t=new Re,e=[],n=it=>(e.push(it),it),s=(it,j)=>n(new us({color:it,metalness:.5,roughness:.36,clearcoat:1,clearcoatRoughness:.3,envMap:i,side:Be,...j})),r=s(14247434,{emissive:16285704,emissiveIntensity:.05}),o=s(14207150,{metalness:.3}),a=n(new vn({color:1315086,metalness:.65,roughness:.42,envMap:i,envMapIntensity:.7,side:Be})),l=n(new us({color:5914128,metalness:1,roughness:.08,envMap:i,envMapIntensity:1.2,emissive:13208104,emissiveIntensity:.14,side:Be})),c=n(new Di({color:16773336,transparent:!0,opacity:.34})),h=n(new De({color:16758858})),d=n(new De({color:16730652})),u=n(new De({color:16768168})),f=(it,j)=>n(new De({color:it,transparent:!0,opacity:j,depthWrite:!1,blending:Ne,side:Be})),g=f(16742938,.42),v=f(16769200,.8),m=(it,j,Ut=0,ae=0,Ft=0,ie=t)=>{let fe=new Yt(it,j);return fe.position.set(Ut,ae,Ft),ie.add(fe),fe},p=(it,j,Ut=t)=>{let ae=new $n(n(new cs(it,j)),c);return it.dispose(),Ut.add(ae),ae},M=(it,j,Ut,ae)=>{let Ft=_m(it,j,Ut,ae);n(Ft.geometry),t.add(Ft)},I=[Mi(15,.3,.12,-.28),Mi(14.1,.95,.5,-.68),Mi(12.4,1.65,.92,-1.08),Mi(9.8,2.3,1.32,-1.46),Mi(6.6,2.85,1.68,-1.76),Mi(2.6,3.2,1.98,-1.94),Mi(-2,3.35,2.12,-1.98),Mi(-6.4,3.2,2.02,-1.86),Mi(-10,2.75,1.7,-1.6),Mi(-12.6,2.15,1.32,-1.24),Mi(-13.6,1.7,1.05,-.98)],x=it=>it<=1||it>=10,b=it=>it===2||it===9,E=(it,j)=>it>=1&&it<=3&&(j===0||j===11);m(n(si(I,(it,j)=>it===0||E(it,j))),a),m(n(si(I,(it,j)=>it>0&&x(j)&&!E(it,j),!1)),r),m(n(si(I,(it,j)=>it>0&&b(j),!1)),o),m(n(si(I,(it,j)=>it>0&&!x(j)&&!b(j),!1)),a),p(si(I),26);let R=[Ki(8.7,.85,.45,1.28,1.62),Ki(6.9,1.42,.95,1.22,2.74),Ki(4.4,1.62,1.15,1.3,3.3),Ki(2,1.55,1.02,1.5,3.14),Ki(-1.6,1.05,.55,1.9,2.32)];m(n(si(R,(it,j)=>j!==5&&it<3,!1)),l),m(n(si(R,(it,j)=>j!==5&&it===3,!1)),r);let _=(it,j)=>bn(it.pts[j][0],it.pts[j][1],it.z);for(let it of[R[1],R[3]])for(let j=0;j<5;j++)M(_(it,j),_(it,j+1),.1,a);for(let it=0;it<3;it++)for(let j of[0,5])M(_(R[it],j),_(R[it+1],j),.09,a);let T=[oh(2.2,3.4,-8.8,1,-.4),oh(6.4,-.4,-9.2,.72,-.2),oh(10.6,-3.68,-9.41,.46,.16),oh(12.3,-5,-9.5,.36,.3)],A=it=>si(T,it,!1).rotateY(Math.PI/2),w=[[n(A((it,j)=>it!==1&&j<4)),r],[n(A((it,j)=>it===1&&j<4)),o],[n(A((it,j)=>j>=4)),a]],P=[sd(0,-7.4,-13.3,.5),sd(3.1,-10.4,-14.3,.26),sd(4.5,-11.75,-14.75,.14)],D=(it,j)=>si(P,it,j).rotateX(-Math.PI/2),L=[[n(D(it=>it===0,!0)),r],[n(D(it=>it===1,!1)),o]],U=n(fm([[.86,-4.5],[1.12,-4.15],[1.42,-4.6],[1.72,-6.2],[1.84,-9.2],[1.7,-12],[1.44,-13.5]])),z=n(fm([[1.5,-13.3],[1.6,-13.8],[1.34,-15],[1.14,-15],[1,-14.1]])),V=n(new Rr(.92,20)),X=n(new Fs(.46,1.5,16).rotateX(Math.PI/2)),H=n(new Rr(1.04,20).rotateY(Math.PI)),Y=n(new hs(1.26,.07,6,28)),$=n(new Fs(.9,5.6,14,1,!0).rotateX(-Math.PI/2).translate(0,0,-2.8)),ht=n(new Fs(.5,3,12,1,!0).rotateX(-Math.PI/2).translate(0,0,-1.5)),ot=n(new Fo(.5,5,6,12).rotateX(Math.PI/2)),Rt=n(new Hn(.17,.2,3.4,10).rotateX(Math.PI/2)),Bt=n(new zs(.3,10,8)),Zt=n(new zs(.28,10,8)),K=[],et=[],Mt=[];for(let it of[1,-1]){let j=new Re;j.scale.x=it,t.add(j);for(let[ae,Ft]of w)m(ae,Ft,0,0,0,j);p(A(),30,j);for(let[ae,Ft]of[[U,r],[z,a]])m(ae,Ft,4.25,.45,0,j);m(V,a,4.25,.45,-4.55,j),m(X,o,4.25,.45,-4.2,j),m(H,u,4.25,.45,-14.2,j),m(Y,h,4.25,.45,-14.98,j),Mt.push(m($,g,4.25,.45,-14.9,j),m(ht,v,4.25,.45,-14.9,j)),K.push(bn(it*4.25,.45,-15.3));let Ut=new Re;Ut.position.set(4.25,2.05,0),Ut.rotation.z=-.32,j.add(Ut);for(let[ae,Ft]of L)m(ae,Ft,0,0,0,Ut);p(D(),30,Ut),m(ot,r,12.45,.32,-6.6,j),m(Rt,a,12.45,.32,-2.2,j),m(Bt,h,12.45,.32,-.4,j),m(Zt,d,12.45,.32,-9.75,j),et.push(bn(it*12.45,.32,-.2))}return M(bn(0,-.08,14.9),bn(0,-.08,16.7),.07,a),M(bn(0,2,-4.1),bn(0,3.5,-5.1),.06,a),m(Bt,h,0,3.5,-5.1).scale.setScalar(.5),m(n(new yn(.45,.1,7)),h,0,-2,-1),{group:t,own:e,jets:K,muzzles:et,cones:Mt}}var rt={ENTER:2400,SLOW:5e3,FIRE:5800,GAP:140,BOLT:240,BOOM:6320,LEAVE:6900,GONE:9100,REFORM:11400,WHOLE:13800,END:14500},ah=[0,1,2].map(i=>rt.FIRE+i*rt.GAP),od=3.6,Pn={R:262,LEAN:.9,W0:1.2,W1:.22,BANK:.3,AIM:Dt-.3},fn=new mt("#ffd23f"),In=new mt("#ff8a1f"),lh=new mt("#ff4a12"),PM=new mt("#ffe7c4"),Si=new mt("#fff4e0"),ld=new mt(1,1,1),bm=new mt("#6a5b50"),Em=new mt("#c96a2a"),Ji=new C,Mm=new C(0,0,1),IM=new He,LM=i=>i*i*i,on=(i,t,e)=>Ce((i-t)/e,0,1);function ad(i){let t=Pn.W0*Math.min(i,rt.SLOW)/1e3;if(i>rt.SLOW){let e=(rt.FIRE-rt.SLOW)/1e3,n=Math.min(i-rt.SLOW,rt.FIRE-rt.SLOW)/1e3;t+=Pn.W0*n-(Pn.W0-Pn.W1)*n*n/(2*e)}return i>rt.FIRE&&(t+=Pn.W1*(i-rt.FIRE)/1e3),t}function Ts(i,t,e,n,s,r,o,a){let l=Es(t),c=[];for(let h=0;h<i;h++){let d=l()*2-1,u=l()*Dt,f=Math.sqrt(1-d*d);c.push({d:new C(Math.cos(u)*f,d,Math.sin(u)*f),v:e+l()*(n-e),life:s+l()*(r-s),col:o[h%o.length],size:a*(.7+l()*.7),at:l()})}return c}var Sm=Ts(150,3,220,900,.5,1.4,[ld,fn,In,Si,fn],3.4),DM=Ts(60,5,60,230,1.5,3.2,[In,lh,fn],2.8),NM=Ts(22,9,90,300,.25,.6,[fn,Si],2.6),UM=Ts(70,13,180,360,.7,1.1,[fn,Si,In],2.8),OM=Ts(50,17,80,260,.4,.9,[Si,fn],2.6),FM=Ts(10,21,40,110,.45,.75,[In,lh,fn],70),ga=null;function BM(){if(ga)return ga;let i=128,t=document.createElement("canvas"),e=Es(11);t.width=t.height=i;let n=t.getContext("2d"),s=n.createImageData(i,i),r=[[4,.5],[9,.32],[18,.18]].map(([a,l])=>({n:a,w:l,g:Array.from({length:(a+1)*(a+1)},()=>e())})),o=({n:a,g:l},c,h)=>{let d=Math.min(a-1,Math.floor(c*a)),u=Math.min(a-1,Math.floor(h*a)),f=c*a-d,g=h*a-u,v=f*f*(3-2*f),m=g*g*(3-2*g),p=(M,I)=>l[I*(a+1)+M];return Un(Un(p(d,u),p(d+1,u),v),Un(p(d,u+1),p(d+1,u+1),v),m)};for(let a=0;a<i;a++)for(let l=0;l<i;l++){let c=l/(i-1),h=a/(i-1),d=Math.hypot(c-.5,h-.5)*2,u=Ce((r.reduce((g,v)=>g+v.w*o(v,c,h),0)*1.5-d*d*1.05-.12)*1.7,0,1),f=(a*i+l)*4;s.data[f]=s.data[f+1]=s.data[f+2]=255,s.data[f+3]=Math.round(190*u*u*(3-2*u))}return n.putImageData(s,0,0),ga=new Kn(t),ga.colorSpace=Ie,ga}function zM(i,t,e,n,s){let r=[];for(let o=0;o<i.length;o++){let a=i[o],l=i[(o+1)%i.length],c=(a[0]-t)*n+(a[1]-e)*s,h=(l[0]-t)*n+(l[1]-e)*s;if(c<=0&&r.push(a),c<0&&h>0||c>0&&h<0){let d=c/(c-h);r.push([a[0]+(l[0]-a[0])*d,a[1]+(l[1]-a[1])*d])}}return r}function HM(i){let t=Es(41),e=[[(t()-.5)*i*.14,(t()-.5)*i*.14]];for(let[r,o]of[[6,.31],[10,.6],[15,.88]]){let a=t()*Dt;for(let l=0;l<r;l++){let c=a+(l+(t()-.5)*.7)/r*Dt,h=i*(o+(t()-.5)*.12);e.push([Math.cos(c)*h,Math.sin(c)*h])}}let n=Array.from({length:56},(r,o)=>[Math.cos(o/56*Dt)*i,Math.sin(o/56*Dt)*i]),s=[];return e.forEach((r,o)=>{let a=n;if(e.forEach((h,d)=>{d!==o&&a.length&&(a=zM(a,(r[0]+h[0])/2,(r[1]+h[1])/2,h[0]-r[0],h[1]-r[1]))}),a.length<3)return;let l=a.reduce((h,d)=>h+d[0],0)/a.length,c=a.reduce((h,d)=>h+d[1],0)/a.length;s.push({cx:l,cy:c,poly:a.map(h=>[h[0]-l,h[1]-c])})}),s}function kM(i){let t=i.core,e=[],n=Es(57),s=R=>(e.push(R),R),r=document.createElement("canvas");r.width=r.height=t.px;let o=r.getContext("2d"),a=s(new Kn(r));a.colorSpace=Ie,a.anisotropy=4;let l=s(new De({map:a,transparent:!0,alphaTest:.01,side:Be})),c=s(new Di({color:16777215,transparent:!0,opacity:0,depthWrite:!1,blending:Ne})),h=s(new De({color:16742938,transparent:!0,opacity:0,depthWrite:!1,blending:Ne,side:Be})),d=new Re,u=t.reach*1.02,f=HM(u).map(R=>{let _=[],T=[],A=[],w=R.poly.length,P=Y=>[(Y[0]+R.cx)/t.size+.5,(Y[1]+R.cy)/t.size+.5];for(let Y=0;Y<w;Y++){let $=R.poly[Y],ht=R.poly[(Y+1)%w];_.push(0,0,0,$[0],$[1],0,ht[0],ht[1],0),T.push(...P([0,0]),...P($),...P(ht)),A.push($[0],$[1],1.5,ht[0],ht[1],1.5)}let D=s(new te),L=s(new te);D.setAttribute("position",new zt(_,3)),D.setAttribute("uv",new zt(T,2)),L.setAttribute("position",new zt(A,3));let U=new Re,z=new Yt(D,l),V=new Yt(D,h);V.position.z=.6,z.add(V),U.add(z,new $n(L,c)),d.add(U);let X=Math.hypot(R.cx,R.cy),H=Math.atan2(R.cy,R.cx)+(n()-.5)*.7;return{holder:U,mesh:z,home:new C(R.cx,R.cy,0),out:new C(Math.cos(H),Math.sin(H),(n()-.5)*1.3).normalize(),v:150+n()*300+(1-X/u)*90,axis:new C(n()-.5,n()-.5,(n()-.5)*.6).normalize(),w:(n()<.5?-1:1)*(2.5+n()*6.5),wait:850*Ce(X/u*.8+n()*.2,0,1),takes:1150+n()*300,turn:(n()-.5)*1.6}}),g=26,v=s(new vn({color:2825492,roughness:.85,metalness:.25,flatShading:!0,emissive:16734740,emissiveIntensity:1.4})),m=new No(s(new zo(1,0)),v,g);m.frustumCulled=!1,m.visible=!1;let p=Ts(g,23,170,520,0,1,[In],1).map(R=>({d:R.d,v:R.v,size:2.2+R.life*4.3,wait:R.at*700,shape:new C(1,.55+n()*.45,.7+n()*.6),axis:new C(n()-.5,n()-.5,n()-.5).normalize(),w:2+n()*7})),M=Ts(18,29,40,170,3,4.6,[bm],1).map(R=>{let _=s(new un({map:BM(),color:Em.clone(),transparent:!0,opacity:0,depthWrite:!1,rotation:R.at*Dt})),T=new xn(_);return T.visible=!1,{sprite:T,mat:_,d:R.d,reach:R.v,life:R.life,late:R.at*.3,from:40+R.at*30,to:110+R.size*80,spin:(R.at-.5)*.5}}),I=new xn(s(new un({map:i.glowTex,transparent:!0,opacity:0,depthWrite:!1,depthTest:!1,blending:Ne})));I.visible=!1;let x=()=>{let R=new Yt(Yr,s(Zr({glow:5})));return R.visible=!1,R},b=[x(),x()];b[1].rotation.x=-Math.PI/2;let E=[d,m,I,...b,...M.map(R=>R.sprite)];return{own:e,pen:o,map:a,face:l,seam:c,heat:h,root:d,shards:f,lumps:m,rocks:p,rock:v,puffs:M,flash:I,rings:b,all:E}}function Tm(i){let t=null,e=new C,n=new C,s=new C,r=new C,o=new C,a=new C,l=new C,c=new C,h=new Kt,d=new He,u=new He,f=new C(1,1,1),g=new mt,v=(A,w,P)=>P.setFromRotationMatrix(h.lookAt(A,Ji,w));function m(A,w,P){let D=A.th0+ad(Ce(w,0,rt.LEAVE));if(P.copy(A.U).multiplyScalar(Math.cos(D)*Pn.R).addScaledVector(A.W,Math.sin(D)*Pn.R),w<rt.ENTER&&P.lerpVectors(A.from,P,Je(Math.max(0,w)/rt.ENTER)),w>rt.LEAVE){let L=(w-rt.LEAVE)/1e3;P.addScaledVector(A.tan,Pn.W1*Pn.R*L).addScaledVector(A.away,560*L*L)}return P}function p(){if(t||!i.SIZE.w||!i.ACT.visible||document.hidden)return null;let A=i.stage(Pn.R+od*rd*.6)?i.VIEW0:i.CAM,w=A.right.clone(),P=A.up.clone().multiplyScalar(Math.cos(Pn.LEAN)).addScaledVector(A.fwd,Math.sin(Pn.LEAN)).normalize(),D=new C().crossVectors(w,P).normalize(),L=Pn.AIM-ad(rt.FIRE),U=L+ad(rt.LEAVE),z=w.clone().multiplyScalar(Math.cos(U)).addScaledVector(P,Math.sin(U)),V=w.clone().multiplyScalar(-Math.sin(U)).addScaledVector(P,Math.cos(U)),X=vm(i.reflections());X.group.scale.setScalar(od),X.group.visible=!1,X.glow=new un({map:i.glowTex,color:In.clone().multiplyScalar(1.7),transparent:!0,opacity:.9,depthWrite:!1,blending:Ne}),X.own.push(X.glow),X.glows=X.jets.map(Y=>{let $=new xn(X.glow);return $.position.copy(Y),X.group.add($),$});let H=kM(i);return i.scene.add(X.group,...H.all),t={t0:performance.now(),U:w,W:P,N:D,th0:L,tan:V,ship:X,bits:H,size:od,thrust:1,sun:i.sun.intensity,from:w.clone().multiplyScalar(1300).addScaledVector(P,900).addScaledVector(D,150),away:V.clone().multiplyScalar(.45).addScaledVector(z,.8).addScaledVector(D,.5).normalize(),jets:X.jets.map(()=>new C),guns:X.muzzles.map(()=>new C),shook:!1,jolted:!1,drawn:0},i.poke(2600),{enter:rt.ENTER,fire:rt.FIRE,boom:rt.BOOM,leave:rt.LEAVE,gone:rt.GONE,reform:rt.REFORM,whole:rt.WHOLE,end:rt.END}}function M(){let A=t;t=null,i.scene.remove(A.ship.group,...A.bits.all);for(let w of[...A.ship.own,...A.bits.own])w.dispose();A.bits.lumps.dispose(),i.core.group.visible=!0,i.core.group.scale.setScalar(1),i.sun.intensity=A.sun}function I(A,w){i.core.snapshot(A.bits.pen,A.t0+w),A.bits.map.needsUpdate=!0}function x(A,w,P){let D=A.ship.group;if(D.visible=w<rt.GONE,!D.visible)return;m(A,w,e),s.copy(m(A,w+14,s)).sub(m(A,w-14,r)).normalize();let L=o.copy(e).negate().normalize(),U=Gn(on(w,rt.FIRE-650,550)),z=U*(1-Gn(on(w,rt.LEAVE,450))),V=Pn.BANK*Gn(on(w,600,1400))*(1-U);v(s,c.copy(A.N).multiplyScalar(Math.cos(V)).addScaledVector(L,Math.sin(V)),d),d.slerp(v(L,A.N,u),z),d.multiply(u.setFromAxisAngle(Mm,Dt*Gn(on(w,rt.LEAVE+300,1e3))));for(let H of ah)w>=H&&w<H+120&&e.addScaledVector(L,-6*(1-(w-H)/120));D.position.copy(e),D.quaternion.copy(d),D.updateMatrixWorld(!0),A.jets.forEach((H,Y)=>D.localToWorld(H.copy(A.ship.jets[Y]))),A.guns.forEach((H,Y)=>D.localToWorld(H.copy(A.ship.muzzles[Y])));let X=w<rt.ENTER?1.25-.7*Je(w/rt.ENTER):w<rt.SLOW?.55:w<rt.LEAVE?Un(.55,.3,on(w,rt.SLOW,600)):Un(.3,1.6,on(w,rt.LEAVE,500));A.thrust=X,A.ship.glow.opacity=Math.min(1,.3+X*.55);for(let H of A.ship.glows)H.scale.setScalar(2.2+X*3+Math.sin(P/37)*.4);A.ship.cones.forEach((H,Y)=>H.scale.set(1,1,(.3+X*(Y%2?.8:1))*(1+.08*Math.sin(P/29+Y))))}function b(A,w){let P=A.bits,D=Math.max(0,(w-rt.BOOM)/1e3),L=(1-Math.exp(-2.3*D))/2.3+.035*D,U=(1-Math.exp(-1.6*D))/1.6+.06*D;P.root.quaternion.copy(i.camera.quaternion);for(let ot of P.shards){let Rt=Gn(on(w,rt.REFORM+ot.wait,ot.takes));a.copy(ot.out).multiplyScalar(ot.v*L*(1-Rt)).applyAxisAngle(Mm,ot.turn*Math.sin(Math.PI*Rt)),ot.holder.position.copy(ot.home).add(a),ot.holder.quaternion.setFromAxisAngle(ot.axis,ot.w*U).slerp(IM,Rt),ot.mesh.visible=w>=rt.BOOM&&w<rt.WHOLE}let z=0,V=0;if(w<rt.BOOM)for(let ot of ah.slice(0,2))w>=ot+rt.BOLT&&(z+=.3+.5*Math.exp(-(w-ot-rt.BOLT)/120));else w<rt.REFORM?(V=Math.exp(-3*D),z=.22+Math.exp(-1.2*D)):w<rt.WHOLE?(V=on(w,rt.REFORM,rt.WHOLE-rt.REFORM)**2,z=.22+.7*V):(V=1-on(w,rt.WHOLE,500),z=1-Je(on(w,rt.WHOLE,rt.END-rt.WHOLE-60)));if(P.seam.opacity=Math.min(1,z),P.seam.color.copy(In).lerp(Si,V),P.heat.opacity=w<rt.BOOM?0:w<rt.REFORM?.14+.8*Math.exp(-2.2*D):.14+.45*V,P.heat.color.copy(lh).lerp(fn,V),P.lumps.visible=w>=rt.BOOM&&w<rt.WHOLE,P.lumps.visible){let ot=(1-Math.exp(-1.5*D))/1.5+.05*D;P.rocks.forEach((Rt,Bt)=>{let Zt=LM(on(w,rt.REFORM+Rt.wait,1e3));a.copy(Rt.d).multiplyScalar(Rt.v*ot*(1-Zt)),d.setFromAxisAngle(Rt.axis,Rt.w*U),P.lumps.setMatrixAt(Bt,h.compose(a,d,f.copy(Rt.shape).multiplyScalar(Math.max(.001,Rt.size*(1-Zt)))))}),P.lumps.instanceMatrix.needsUpdate=!0,P.rock.emissiveIntensity=.1+1.3*Math.exp(-1.3*D)+.9*on(w,rt.REFORM,1200)}for(let ot of P.puffs){let Rt=D-ot.late,Bt=Rt/ot.life;ot.sprite.visible=w>=rt.BOOM&&Rt>0&&Bt<1,ot.sprite.visible&&(ot.sprite.position.copy(ot.d).multiplyScalar(ot.reach*(1-Math.exp(-1.4*Rt))).addScaledVector(i.CAM.up,14*Rt),ot.sprite.scale.setScalar(Un(ot.from,ot.to,Je(Bt))),ot.mat.opacity=.42*Math.min(1,Rt/.15)*(1-Bt)**1.5,ot.mat.color.copy(Em).lerp(bm,Ce(Rt/.45,0,1)),ot.mat.rotation+=ot.spin*.01)}let X=P.flash,H=(w-rt.WHOLE)/1e3;X.visible=w>=rt.BOOM&&D<.55||H>-.14&&H<.5,X.visible&&D<.55?(X.scale.setScalar(90+620*Je(Ce(D/.2,0,1))),X.material.opacity=(1-D/.55)**2,X.material.color.copy(ld).lerp(fn,Ce(D/.4,0,1)).multiplyScalar(2)):X.visible&&(X.scale.setScalar(H<0?230:230+110*Je(H/.5)),X.material.opacity=H<0?1+H/.14:(1-H/.5)**2,X.material.color.copy(Si).multiplyScalar(1.6)),X.position.copy(n);let[Y,$]=P.rings,ht=(ot,Rt,Bt,Zt,K,et,Mt)=>{ot.visible=Rt>0&&Rt<1,ot.visible&&($r(ot,Bt+(Zt-Bt)*Je(Rt),K*(1-Rt)+.8,26),ot.material.uniforms.opacity.value=et*(1-Rt)**1.3,ot.material.uniforms.color.value.copy(Mt))};Y.quaternion.copy(i.camera.quaternion),w<rt.REFORM?ht(Y,D,60,530,5,.95,g.copy(fn).lerp(In,Ce(D,0,1))):ht(Y,H/.7,70,220,3,.7,Si),ht($,(D-.06)/1.24,60,620,4,.8,In)}function E(A,w){let P=t;if(!P)return;let D=w-P.t0;if(D>=rt.END)return M();i.poke(400);let L=(D-rt.BOOM)/1e3,U=i.core.group;if(n.copy(i.CAM.fwd).multiplyScalar(-8),x(P,D,w),D<rt.BOOM){let V=0;for(let X of ah.slice(0,2)){let H=(D-X-rt.BOLT)/1e3;H>=0&&(V+=.07*Math.exp(-7*H)*Math.sin(H*46))}U.visible=!0,U.scale.setScalar(1+V),P.drawn||I(P,rt.BOOM),P.drawn=1}else D<rt.WHOLE?(P.drawn<2&&I(P,rt.BOOM),D>=rt.REFORM&&P.drawn<3&&I(P,rt.WHOLE),D>=rt.WHOLE-250&&P.drawn<4&&I(P,rt.WHOLE),P.drawn=D>=rt.WHOLE-250?4:D>=rt.REFORM?3:2,U.visible=!1,U.scale.setScalar(1)):(U.visible=!0,U.scale.setScalar(1+.09*(1-Je(on(D,rt.WHOLE,450)))));b(P,D);let z=(D-rt.WHOLE)/1e3;i.sun.intensity=P.sun*(D<rt.BOOM?1:D<rt.REFORM?.22+3.2*Math.exp(-9*L):D<rt.WHOLE?Un(.22,.8,on(D,rt.REFORM,rt.WHOLE-rt.REFORM)**2):1+.9*Math.exp(-6*z)),!P.shook&&D>=rt.BOOM&&D<rt.BOOM+500&&(P.shook=!0,i.shake(16,620)),!P.jolted&&D>=rt.BOOM+300&&D<rt.BOOM+900&&(P.jolted=!0,i.jolt())}function R(A,w,P,D,L){if(!(P<0))for(let U of A)P>=U.life||(a.copy(w).addScaledVector(U.d,U.v/D*(1-Math.exp(-D*P))),i.glow.add(a,U.col,L*(1-P/U.life),U.size))}function _(A){let w=t;if(!w)return;let P=A-w.t0,D=(P-rt.BOOM)/1e3;if(P<rt.GONE){let L=.16*Gn(on(P,900,1300))*(1-on(P,rt.LEAVE,700));i.lines.circle(Ji,Pn.R,w.U,w.W,In,L,96);for(let U=1;U<=18;U++){m(w,P-U*24,s).sub(e);for(let z of w.jets)i.glow.add(l.copy(z).add(s),U<6?fn:In,.85*w.thrust*(1-U/19),3.2*w.size*(1-U/24))}for(let U of w.jets)i.glow.add(U,In,.8*w.thrust,5.5*w.size)}if(ah.forEach((L,U)=>{let z=P-L;for(let X of w.guns){if(z>-130&&z<0&&i.glow.add(X,fn,1.2*(1+z/130),16),z>=0&&z<80&&i.glow.add(X,Si,2.2*(1-z/80),30),z<0||z>=rt.BOLT)continue;s.subVectors(n,X);let H=s.length(),Y=z/rt.BOLT;s.normalize();let $=a.copy(X).addScaledVector(s,H*Y);for(let ht=1;ht<=9;ht++)i.glow.add(l.copy($).addScaledVector(s,-Math.min(H*Y,ht*8)),In,1.3*(1-ht/10),12-ht*.8);i.glow.add($,fn,1.8,24),i.glow.add($,ld,2.4,8),i.lines.path([l.copy($).addScaledVector(s,-Math.min(H*Y,60)),$],fn,ht=>ht,!1)}let V=(z-rt.BOLT)/1e3;U<2&&V>=0&&V<.6&&(R(NM,n,V,4,1.8),i.glow.add(n,Si,2.2*Math.exp(-10*V),70),i.lines.circle(n,i.coreR*(1.25+.5*Je(V/.6)),i.CAM.right,i.CAM.up,fn,.8*(1-V/.6),64))}),!(D<0)){if(D<.8){i.glow.add(Ji,Si,3*Math.exp(-7*D),200);for(let L of FM)D>=L.life||i.glow.add(a.copy(L.d).multiplyScalar(L.v*Je(D/L.life)),L.col,1.5*(1-D/L.life)**2,L.size*(1+D/L.life))}R(Sm,Ji,D,3,2),R(Sm,Ji,D-.22,3.4,1.4);for(let L of DM)D>=L.life||(a.copy(L.d).multiplyScalar(L.v/1.2*(1-Math.exp(-1.2*D))),i.glow.add(a,L.col,1.5*(1-D/L.life)*(.6+.4*Math.sin(A/60+L.at*40)),L.size));if(D<1.4)for(let L of w.bits.rocks)for(let U=0;U<6;U++){let z=Math.max(0,D-U*.035);i.glow.add(a.copy(L.d).multiplyScalar(L.v*((1-Math.exp(-1.5*z))/1.5+.05*z)),U?In:fn,1.3*(1-D/1.4)*(1-U/7),L.size*(1.5-U*.16))}if(P<rt.WHOLE){let L=.75+.25*Math.sin(A/90)*Math.sin(A/37);i.glow.add(Ji,lh,.5*L*Math.min(1,D),80),i.glow.add(Ji,In,.35*L*Math.min(1,D),36)}if(P>=rt.REFORM&&P<rt.WHOLE){let L=on(P,rt.REFORM,rt.WHOLE-rt.REFORM);for(let U of UM){let z=on(P,rt.REFORM+U.at*1300,U.life*1e3);z<=0||z>=1||i.glow.add(a.copy(U.d).multiplyScalar(U.v*(1-z)**2),U.col,1.6*Math.sin(Math.PI*z),U.size)}i.glow.add(Ji,Si,2.2*L*L,50+90*L),i.lines.circle(Ji,Un(300,i.coreR*1.5,Gn(L)),i.CAM.right,i.CAM.up,fn,.5*L,72)}if(P>=rt.WHOLE){let L=(P-rt.WHOLE)/1e3;R(OM,n,L,3.2,1.6),i.glow.add(n,PM,1.6*Math.exp(-5*L),120)}}}return{start:p,update:E,draw:_,ship:()=>t&&t.ship.group.visible?{at:t.ship.group.position,length:t.size*rd}:null,active:()=>!!t}}var VM={transparent:!0,depthWrite:!1,blending:Ne,premultipliedAlpha:!0},cd={warm:[1,.72,.45],blue:[.62,.78,1],white:[1,.95,.88]};function GM(i,t,e,n){let s=Es(n),r=new Float32Array(i*3),o=new Float32Array(i*3),a=new Float32Array(i),l=new Float32Array(i),c=[],h=new Float32Array(i);for(let v=0;v<i;v++){let m=s()*Dt,p=s()*2-1,M=Math.sqrt(1-p*p),I=t+s()*(e-t);r.set([Math.cos(m)*M*I,p*I,Math.sin(m)*M*I],v*3);let x=s();c[v]=x<.14?"warm":x<.28?"blue":"white",h[v]=.3+Math.pow(s(),3)*1.4,a[v]=.8+Math.pow(s(),5)*2.2,l[v]=s()*Dt}let d=new te;d.setAttribute("position",new ue(r,3)),d.setAttribute("rgb",new ue(o,3)),d.setAttribute("size",new ue(a,1)),d.setAttribute("phase",new ue(l,1));let u=new Se({...VM,uniforms:{time:{value:0},dpr:{value:1}},vertexShader:`
      attribute vec3 rgb;
      attribute float size;
      attribute float phase;
      uniform float time, dpr;
      varying vec3 vC;
      void main() {
        vC = rgb * (0.72 + 0.28 * sin(time * 1.6 + phase * 9.0));
        gl_PointSize = size * dpr;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,fragmentShader:`
      varying vec3 vC;
      void main() {
        float a = smoothstep(0.5, 0.0, length(gl_PointCoord - 0.5));
        gl_FragColor = vec4(vC * a, a);
      }`}),f=new Os(d,u);f.frustumCulled=!1;let g=new mt;return f.paint=v=>{let m={};for(let p in cd)m[p]=p==="blue"?cd[p]:v.tint(g.setRGB(...cd[p])).toArray();for(let p=0;p<i;p++){let M=m[c[p]],I=h[p];o.set([M[0]*I,M[1]*I,M[2]*I],p*3)}d.attributes.rgb.needsUpdate=!0},f}function wm(i,t){let e=new Re,n=GM(3200,3e3,4600,7);e.add(n);let s=new qr(700,i),r=[],o=Es(29);for(let l=0;l<700;l++){let c=80+Math.pow(o(),.7)*900,h=o()*Dt,d=new C(Math.cos(h)*c,(o()-.5)*(60+c*.6),Math.sin(h)*c),u=new mt().setHSL(.08+o()*.05,.5,.7+o()*.25);r.push({v:d,c:u,bright:.12+o()*.3,size:1+o()*1.8})}e.add(s.points);function a(l){n.paint(l),s.begin();for(let c of r)s.add(c.v,l.tint(c.c),c.bright,c.size);s.end()}return a(t),{group:e,paint:a,update(l,c,h){n.material.uniforms.time.value=l/1e3,n.material.uniforms.dpr.value=h,s.points.rotation.y+=c*.006}}}function Am(){let i=document.createElement("canvas");i.width=i.height=128;let t=i.getContext("2d"),e=128,n=t.createRadialGradient(e/2,e/2,0,e/2,e/2,e/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.16,"rgba(255,255,255,0.72)"),n.addColorStop(.42,"rgba(255,255,255,0.16)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,e,e);let s=new Kn(i);return s.colorSpace=Ie,s}var Vt=window.RADAR,{CAT:ws,CATS:Rs,STATUS:Aa}=Vt,ee={CORE_R:60,HEX:34,ATOM_R:150,ATOM_STEP:15,TILT:1.2,STATION_R:390,PARK_HEX_PX:27,PARK_CAR_PX:86,POLAR:1.08},Rm=vi.size/vi.hex*ee.HEX,Ta=13,yd=new C(0,1,0),Ld=new C(1,0,0),Dd=new C(0,0,1),Nd=new mt(1,1,1),Eh=new mt("#9d6bff"),ye={a:new C,b:new C,c:new C,d:new C,p:new C,m:new Kt},Fn=i=>new mt(i),Te=document.getElementById("space"),lo=Am(),WM=om(),ch=am(),Xm=new Map,$s=new Hc({antialias:!1,powerPreference:"high-performance"});$s.toneMapping=ks;$s.toneMappingExposure=1.05;Te.appendChild($s.domElement);var La=new Xc;La.sortObjects=!1;La.domElement.className="labels";Te.appendChild(La.domElement);var an=id(),he=new Us;he.background=new mt;var se=new cn(40,1,2,12e3);he.matrixWorldAutoUpdate=!1;var qm=new qo(16777215,.75),Ud=new Xo(16777215,4.2,0,0);he.add(qm,Ud);var Ym=new Ir(8364031,1.2);Ym.position.set(-400,500,-600);he.add(Ym);var Od=new Ir(16777215,.55);Od.position.set(300,600,500);he.add(Od);var Fd=wm(lo,an);he.add(Fd.group);var co=lm(Vt,lo,ee.CORE_R,an);he.add(co.group);function Zm(){he.background.copy(an.bg),qm.color.copy(an.tint(9074534)),Ud.color.copy(an.tint(16752714)),Od.color.copy(an.tint(16769728))}Zm();window.addEventListener("themechange",()=>{let i=id();i.key!==an.key&&(an=i,Zm(),Fd.paint(an),co.paint(an),Wd(),Id=0,ln())});var On=new qr(8e3,lo),qn=new jc(4e4);he.add(qn.lines,On.points);var ne=new Wc(se,Te);ne.enableDamping=!0;ne.dampingFactor=.08;ne.rotateSpeed=.55;ne.zoomSpeed=1.1;ne.panSpeed=.9;ne.screenSpacePanning=!0;ne.zoomToCursor=!0;ne.minDistance=110;ne.maxDistance=2600;ne.minPolarAngle=.06;ne.maxPolarAngle=Math.PI-.06;ne.mouseButtons={LEFT:Jn.ROTATE,MIDDLE:Jn.DOLLY,RIGHT:Jn.PAN};var so=new Zc($s);so.addPass(new Kc(he,se));var XM=new Wr(new lt(512,512),.62,.45,.6);so.addPass(XM);so.addPass(new $c);var As={front:{fps:60,dpr:1.5},behind:{fps:20,dpr:1.25},saver:{fps:30,dpr:1.25}},re={visible:!0,focused:!0,saver:!1,covered:!1,until:0,shown:!0};function $m(){let i=(!re.saver||re.focused)&&!re.covered?As.front.dpr:As.behind.dpr;return Math.min(i,re.saver?As.saver.dpr:i,window.devicePixelRatio||1)}var Cm=0;function Km(){clearTimeout(Cm),de.w&&($m()<de.dpr?Cm=setTimeout(vd,1500):vd())}var de={w:0,h:0,dpr:1},kt={right:new C,up:new C,fwd:new C,dist:1,focal:1,fit:800},_h=!1;function vd(){if(!re.shown)return;let i=Math.max(200,Te.clientWidth),t=Math.max(160,Te.clientHeight),e=$m();i===de.w&&t===de.h&&e===de.dpr||(de.w=i,de.h=t,de.dpr=e,$s.setPixelRatio(e),$s.setSize(i,t,!1),so.setPixelRatio(de.dpr),so.setSize(i,t),La.setSize(i,t),se.aspect=i/t,se.updateProjectionMatrix(),kt.fit=qM(),_h||(_h=!0,YM()))}new ResizeObserver(()=>{re.shown=Te.clientWidth>0&&Te.clientHeight>0,re.shown&&(vd(),Qi())}).observe(Te);function qM(){let i=Or.degToRad(se.fov/2),t=Math.atan(Math.tan(i)*se.aspect),e=(ee.STATION_R+30)/(Math.tan(t)*.74),n=(ee.ATOM_R+3*ee.ATOM_STEP+ee.HEX+30)/(Math.tan(i)*.86);return Ce(Math.max(e,n),320,2200)}var Md=(i,t=ee.POLAR,e=0)=>new C().setFromSphericalCoords(i,t,e),bi={until:0,amp:0,ms:1,off:new C};function Jm(i,t){bi.amp=i,bi.ms=t,bi.until=performance.now()+t}var je=null;function Bd(i,t,e){je={t0:performance.now(),ms:e,fromT:ne.target.clone(),toT:i.clone(),fromP:se.position.clone(),toP:t.clone()},Qi()}function ho(){Bd(new C,Md(kt.fit),1100)}function YM(){se.position.copy(Md(kt.fit*2.4,.5,-.9)),ne.target.set(0,0,0),ne.update(),Bd(new C,Md(kt.fit),2600)}ne.addEventListener("start",()=>{je=null,Vt.hideTip()});ne.addEventListener("change",()=>ln());var _a=new Ni,hh=new Ni,Pm=new Ni;function ZM(i){if(!je)return;let t=Ce((i-je.t0)/je.ms,0,1),e=Gn(t);ne.target.lerpVectors(je.fromT,je.toT,e),_a.setFromVector3(ye.a.copy(je.fromP).sub(je.fromT)),hh.setFromVector3(ye.b.copy(je.toP).sub(je.toT));let n=hh.theta-_a.theta;n>Math.PI&&(n-=Dt),n<-Math.PI&&(n+=Dt),Pm.set(Un(_a.radius,hh.radius,e),Un(_a.phi,hh.phi,e),_a.theta+n*e),se.position.setFromSpherical(Pm).add(ne.target),t>=1&&(je=null)}function $M(){se.updateMatrixWorld();let i=se.matrixWorld.elements;kt.right.set(i[0],i[1],i[2]).normalize(),kt.up.set(i[4],i[5],i[6]).normalize(),kt.fwd.set(-i[8],-i[9],-i[10]).normalize(),kt.dist=se.position.distanceTo(ne.target),kt.focal=de.h/2/Math.tan(Or.degToRad(se.fov/2))}function KM(){let i=ne.target,t=700,e=i.length();e<=t||(ye.a.copy(i).multiplyScalar(t/e).sub(i),i.add(ye.a),se.position.add(ye.a))}var uh=new C;function ro(i,t){return uh.copy(i).project(se),t.x=(uh.x*.5+.5)*de.w,t.y=(-uh.y*.5+.5)*de.h,t.z=uh.z,t}function Da(i){let t=ye.d.copy(i).sub(se.position).dot(kt.fwd);return t>1?kt.focal/t:0}var Qr=(()=>{let i=new C().setFromSphericalCoords(1,ee.POLAR,0).negate(),t=new C().crossVectors(i,yd).normalize(),e=new C().crossVectors(t,i).normalize();return{fwd:i,right:t,up:e}})();function JM(i,t){let e=ye.a.copy(Qr.right).multiplyScalar(Math.cos(i)).addScaledVector(Qr.up,Math.sin(i)),n=ye.b.copy(Qr.right).multiplyScalar(-Math.sin(i)).addScaledVector(Qr.up,Math.cos(i));n.multiplyScalar(Math.cos(ee.TILT)).addScaledVector(Qr.fwd,Math.sin(ee.TILT)).normalize();let s=ye.c.crossVectors(e,n).normalize();return ye.m.makeBasis(e,n,s),t.setFromRotationMatrix(ye.m)}function jm(i){let t=Ce(1-62/(de.w/2),.7,.92),e=[.58,.22,-.14,-.48];if(i<8)return{x:(i%2?1:-1)*t,y:e[i>>1]};let n=i-8,s=[-.3,.3,0,-.6,.6];return{x:s[n%s.length],y:n<s.length?.8:-.62}}var hd=new C;function Qm(i,t){let e=jm(i),n=Ce(kt.dist*.5,50,900);return hd.set(e.x,e.y,.5).unproject(se).sub(se.position).normalize(),t.copy(se.position).addScaledVector(hd,n),n*hd.dot(kt.fwd)/kt.focal}var Xs=[],Im=new C,ud={x:0,y:0,z:0},dd={x:0,y:0,z:0};function jM(i){let t=-se.position.dot(kt.fwd);return Im.copy(i).sub(se.position).dot(kt.fwd)<=t||t<=1?!1:(ro(i,ud),ro(Im.set(0,0,0),dd),Math.hypot(ud.x-dd.x,ud.y-dd.y)<ee.CORE_R*1.1*kt.focal/t)}var Oe=new Map,Lm=i=>i==="idle"||i==="waiting"?"park":"orbit",Dm=i=>Fn(Aa[i]?.color||Aa.busy.color),Nm=new Zo,Um=new lt,dh=new C;function Sd(i){return Um.set(i.x/de.w*2-1,-(i.y/de.h)*2+1),Nm.setFromCamera(Um,se),Nm.ray}var bd=class{constructor(t,e,n){this.sid=t.id,this.owner=this,this.s=t,this.ci=Vt.colorIndex(t.id),this.hueCss=Vt.sessColor(t.id),this.hue=Fn(this.hueCss),this.status=t.status,this.color=Dm(t.status),this.icon=new th,this.icon.draw(Vt,t,this.hueCss),this.sprite=new xn(new un({map:this.icon.texture,transparent:!0,depthWrite:!1})),this.sprite.scale.setScalar(Rm),this.sprite.renderOrder=3,this.glowSprite=new xn(new un({map:WM,color:this.color.clone(),transparent:!0,depthWrite:!1,blending:Ne})),this.glowSprite.scale.setScalar(Rm),this.glowSprite.renderOrder=2,this.halo=new Yt(Yr,Zr({glow:1.2,dashes:16,dashSpeed:.3})),this.halo.renderOrder=2,this.root=new Re,this.root.add(this.glowSprite,this.halo,this.sprite),this.root.visible=!1,he.add(this.root),this.orbitRing=new Yt(Yr,Zr({glow:2.2,floor:.38})),he.add(this.orbitRing),this.orbitAlpha=0,this.quat=new He,this.pos=new C,this.prev=new C,this.vel=new C,this.homePos=new C,this.dragTarget=new C,this.dragOff=new C,this.dragPlane=new wn,this.theta=(this.ci*2.39996+.6)%Dt,this.r=this.rTarget=ee.ATOM_R,this.phi=this.phiTarget=0,this.fresh=!0,this.scale=.04,this.homeScale=1,this.homeKind=Lm(t.status),this.slot=-1,this.mode="fly",this.fly={from:new C,fromScale:.04,t0:e+n,dur:1500},this.warp=!0,this.kick=0,this.drones=new Map,this.dying=0,this.lastUsageFx=0,this.makeLabels()}makeLabels(){this.label=Wn("div","sl"),this.label.dataset.sid=this.sid,this.labelObj=new yi(this.label),this.labelObj.center.set(.5,0),this.labelObj.visible=!1,he.add(this.labelObj),this.fts=Wn("div","fts"),this.ftObj=new yi(this.fts),this.ftObj.center.set(.5,1),this.ftObj.visible=!1,he.add(this.ftObj)}setSession(t,e){this.s=t,t.status!==this.status&&(this.status=t.status,this.color.copy(Dm(t.status)));let n=Lm(t.status);n!==this.homeKind&&(this.homeKind=n,this.mode!=="drag"&&!this.dying&&this.startFly(e)),this.syncDrones(t.agents||[],e),this.refreshLabel()}startFly(t){this.mode="fly",this.fly.from.copy(this.pos),this.fly.fromScale=this.scale,this.fly.t0=t,this.fly.dur=1400,this.warp=!1,ln(1600)}syncDrones(t,e){let n=new Set,s=t.filter(r=>!r.ended&&!(Xm.get(`${this.sid}:${r.id}`)>=r.lastTs));for(let r of t){let o=this.drones.get(r.id);o&&r.ended&&!o.dying&&(o.dying=e,Qe(o.pos,Eh,10,40))}s.forEach((r,o)=>{let a=this.drones.get(r.id);a||(a=new Ed(this,r,e),this.drones.set(r.id,a)),a.ag=r,a.idx=o,a.count=s.length,a.dying=0,n.add(r.id)});for(let[r,o]of this.drones)!n.has(r)&&!o.dying&&(o.dying=e)}home(t,e){return this.homeKind==="park"&&this.slot>=0?(this.homeScale=ee.PARK_HEX_PX/ee.HEX*Qm(this.slot,t),t.addScaledVector(kt.up,Math.sin(e/760+this.ci*1.7)*1.2*this.homeScale)):(this.homeScale=1,t.set(Math.cos(this.theta)*this.r,Math.sin(this.theta)*this.r,0).applyQuaternion(this.quat))}beginDrag(t){this.mode="drag",this.warp=!1,this.dragPlane.setFromNormalAndCoplanarPoint(kt.fwd,this.pos),this.dragOff.set(0,0,0),Sd(t).intersectPlane(this.dragPlane,dh)&&this.dragOff.copy(this.pos).sub(dh),this.dragTarget.copy(this.pos),Te.classList.add("dragging")}dragTo(t){Sd(t).intersectPlane(this.dragPlane,dh)&&this.dragTarget.copy(dh).add(this.dragOff)}endDrag(){this.mode="spring",this.vel.clampLength(0,1400),Te.classList.remove("dragging")}update(t,e){this.r+=(this.rTarget-this.r)*Cn(1.6,t),this.phi+=(this.phiTarget-this.phi)*Cn(1.4,t),JM(this.phi,this.quat),this.kick=Math.max(0,this.kick-t*1.6);let n=this.status==="ended",s=.42*Math.sqrt(ee.ATOM_R/this.r)*(n?.3:1)*(1+this.kick*1.2);this.theta=(this.theta+s*t)%Dt;let r=this.home(this.homePos,e);if(this.prev.copy(this.pos),this.dying){let o=Ce((e-this.dying)/700,0,1);if(this.scale=this.dieScale*(1-Je(o)),o>=1)return!1}else if(this.mode==="drag")this.pos.lerp(this.dragTarget,Cn(18,t));else if(this.mode==="spring"){let a=1.36*Math.sqrt(34);ye.d.copy(r).sub(this.pos).multiplyScalar(34).addScaledVector(this.vel,-a),this.vel.addScaledVector(ye.d,t),this.pos.addScaledVector(this.vel,t),this.scale+=(this.homeScale-this.scale)*Cn(5,t),this.pos.distanceTo(r)<.4*this.homeScale&&this.vel.length()<4&&(this.mode="locked")}else if(this.mode==="fly"){let o=Ce((e-this.fly.t0)/this.fly.dur,0,1),a=Gn(o);this.pos.lerpVectors(this.fly.from,r,this.warp?Je(o):a),this.scale=Un(this.fly.fromScale,this.homeScale,this.warp?Je(o):a),o>=1&&(this.mode="locked",this.warp=!1)}else this.pos.copy(r),this.scale=this.homeScale;t>0&&this.mode!=="spring"&&this.vel.lerp(ye.d.copy(this.pos).sub(this.prev).divideScalar(t),Cn(12,t)),this.root.visible=!(this.mode==="fly"&&e<this.fly.t0),this.root.position.copy(this.pos),this.root.scale.setScalar(Math.max(.001,this.scale)),this.updateLook(e),this.updateOrbitRing(t);for(let[o,a]of this.drones)a.update(t,e)===!1&&this.drones.delete(o);return!0}updateLook(t){let e=this.status,n=.1;e==="busy"?n=.6+.2*Math.sin(t/280):e==="waiting"?n=.45+.55*(.5+.5*Math.sin(t/160)):e==="idle"&&(n=.45),n+=this.kick*.6+(Ue&&Ue.kind==="session"&&Ue.owner===this?.4:0),this.glowSprite.material.color.copy(this.color).multiplyScalar(1.7*n),this.sprite.material.opacity=e==="ended"?.5:1;let s=this.halo.material.uniforms,r=e==="busy";this.halo.quaternion.copy(se.quaternion),$r(this.halo,ee.HEX*(r?1.62:1.8),r?1.1:1.3),s.color.value.copy(this.color).multiplyScalar(1.4),s.time.value=t/1e3,s.dashes.value=r?16:0,s.opacity.value=r?.5:e==="idle"?.2+.3*(.5+.5*Math.sin(t/900)):e==="waiting"?.65:0}updateOrbitRing(t){let e=this.homeKind==="orbit"&&!this.dying?this.status==="ended"?.18:.55:0;if(this.orbitAlpha+=(e-this.orbitAlpha)*Cn(3,t),this.orbitRing.visible=this.orbitAlpha>.01,!this.orbitRing.visible)return;this.orbitRing.quaternion.copy(this.quat),$r(this.orbitRing,this.r,.9,12);let n=this.orbitRing.material.uniforms;n.color.value.copy(this.hue),n.opacity.value=this.orbitAlpha,n.head.value=this.theta,n.tail.value=1.7}placeLabel(){let t=this.root.visible&&!this.dying&&this.homeKind!=="park"&&!jM(this.pos);if(this.labelObj.visible=this.ftObj.visible=t,!t)return;let e=ee.HEX*this.scale;this.labelObj.position.copy(this.pos).addScaledVector(kt.up,-e*1.28),this.ftObj.position.copy(this.pos).addScaledVector(kt.up,e*1.32)}refreshLabel(){let t=this.s;this.icon.draw(Vt,t,this.hueCss),this.label.classList.toggle("ended",t.status==="ended"),ei(this.label,(t.wt?"\u2387 ":"")+Vt.clipT(t.title||t.lastPrompt||t.cwd||"",32))}die(t){this.dying=t,this.dieScale=this.scale,Qe(this.pos,this.color,26,90);for(let e of this.drones.values())e.dying=e.dying||t}dispose(){he.remove(this.root,this.orbitRing,this.labelObj,this.ftObj);for(let t of this.drones.values())t.dispose();this.icon.dispose(),this.sprite.material.dispose(),this.glowSprite.material.dispose(),this.halo.material.dispose(),this.orbitRing.material.dispose()}},Ed=class{constructor(t,e,n){this.owner=t,this.ag=e,this.born=n,this.dying=0,this.idx=0,this.count=1,this.running=null,this.parked=null,this.phase=0,this.lastNow=0,this.pos=t.pos.clone(),this.sprite=new xn(new un({map:ch.running,transparent:!0,depthWrite:!1})),this.sprite.scale.setScalar(128/40*Ta),this.sprite.renderOrder=3,this.spin=new Yt(Yr,Zr({glow:.8,dashes:1,dashSpeed:.55})),$r(this.spin,Ta*1.38,1.3,4),this.spin.renderOrder=2,this.root=new Re,this.root.add(this.spin,this.sprite),he.add(this.root),this.labelEl=Wn("div","dl"),this.labelObj=new yi(this.labelEl),this.labelObj.center.set(.5,0),he.add(this.labelObj)}update(t,e){let n=this.owner,s=n.scale,r=this.count>7?this.idx%2*14:0,o=!!this.ag.parked&&!this.ag.running;this.lastNow===0?this.phase=e:o||(this.phase+=e-this.lastNow),this.lastNow=e;let a=this.idx/Math.max(1,this.count)*Dt+this.phase/9e3,l=(ee.HEX+46+r)*s,c=(ee.HEX+24+r*.6)*s;this.pos.copy(n.pos).addScaledVector(kt.right,Math.cos(a)*l).addScaledVector(kt.up,Math.sin(a)*c).addScaledVector(kt.fwd,Math.sin(a)*16*s),o&&this.pos.addScaledVector(kt.up,Math.sin(e/760+this.idx*1.7)*1.2*s);let h=Je(Ce((e-this.born)/500,0,1));if(this.dying){let v=Ce((e-this.dying)/600,0,1);if(h*=1-v,v>=1)return this.dispose(),!1}let d=!!this.ag.running;(d!==this.running||o!==this.parked)&&(this.running=d,this.parked=o,this.sprite.material.map=d?ch.running:o?ch.parked:ch.done),this.root.visible=n.root.visible,this.root.position.copy(this.pos),this.root.scale.setScalar(Math.max(.001,s*h)),this.sprite.material.opacity=d?1:o?.55:.7,this.spin.quaternion.copy(se.quaternion);let u=this.spin.material.uniforms;u.color.value.copy(Eh).multiplyScalar(1.6),u.opacity.value=d?.85:0,u.time.value=e/1e3;let f=Ue&&Ue.kind==="drone"&&Ue.drone===this,g=this.root.visible&&!this.dying&&(f||o);if(this.labelObj.visible=g,g){let v=`idle \xB7 ${Math.max(1,Math.floor((Date.now()-this.ag.lastTs)/6e4))}m`;ei(this.labelEl,o?f?`${Vt.clipT(this.ag.desc||this.ag.type||"subagent",14)} \xB7 ${v}`:v:Vt.clipT(this.ag.desc||this.ag.type||"subagent",18)),this.labelObj.position.copy(this.pos).addScaledVector(kt.up,-Ta*1.2*s)}return!0}dispose(){he.remove(this.root,this.labelObj),this.sprite.material.dispose(),this.spin.material.dispose()}},fd=!1,Td={pos:new C,scale:1};function QM(i,t){let e=new Set,n=[...i.sessions].sort((r,o)=>Vt.colorIndex(r.id)-Vt.colorIndex(o.id)),s=0;for(let r of n){let o=Oe.get(r.id);o||(o=new bd(r,t,fd?0:s),s+=160,Oe.set(r.id,o),fd&&oi(Td,an.accent,70,1200,0,!0)),o.setSession(r,t),e.add(r.id)}fd=!0;for(let r of Oe.values())!e.has(r.sid)&&!r.dying&&r.die(t);tg(),zd()}function tg(){let i=[...Oe.values()].filter(e=>!e.dying&&e.homeKind==="orbit").sort((e,n)=>(e.status==="ended")-(n.status==="ended")||e.ci-n.ci),t=i.length;i.forEach((e,n)=>{e.phiTarget=n*Math.PI/Math.max(1,t),e.rTarget=ee.ATOM_R+n*ee.ATOM_STEP,e.fresh&&(e.phi=e.phiTarget,e.r=e.rTarget)});for(let e of Oe.values())e.fresh=!1}var tS=[6,7,4,5,2,3,0,1,13,14,15,16,17],Jr=new Map,fh=i=>i.sid?"s:"+i.sid:"c:"+i.id;function zd(){for(let r=0;r<Xs.length;r++){let o=Xs[r];o&&(o.dying||o.homeKind!=="park")&&(Xs[r]=null)}let i=new Set([...Oe.values(),...tn.values()].filter(r=>!r.dying).map(fh));for(let r of Jr.keys())i.has(r)||Jr.delete(r);let t=new Set(Jr.values());for(let r of[...Oe.values(),...tn.values()])(r.homeKind!=="park"||r.dying)&&(r.slot=-1);let e=[...Oe.values()].filter(r=>!r.dying&&r.homeKind==="park").sort((r,o)=>(r.status==="waiting"?0:1)-(o.status==="waiting"?0:1)||(r.s.statusSince||0)-(o.s.statusSince||0)),n=[...tn.values()].filter(r=>!r.dying&&r.homeKind==="park").sort((r,o)=>r.parkedAt-o.parkedAt),s=(r,o)=>{let a=Jr.get(fh(r));if(a!==void 0&&!Xs[a])return a;let l=h=>!Xs[h]&&!t.has(h),c=o.find(l);if(c!==void 0)return c;for(let h=0;;h++)if(l(h))return h};for(let[r,o]of[[e,[]],[n,tS]])for(let a of r)a.slot>=0&&Xs[a.slot]===a||(a.slot=s(a,o),Xs[a.slot]=a,Jr.has(fh(a))||(Jr.set(fh(a),a.slot),t.add(a.slot)))}var Ei={};Rs.forEach((i,t)=>{let e=Fn(ws[i].color),n=pm(e),s=-Math.PI/2+t/Rs.length*Dt;n.group.position.set(Math.cos(s)*ee.STATION_R,0,Math.sin(s)*ee.STATION_R),n.group.rotation.y=-s,he.add(n.group);let r=new xn(new un({map:lo,color:e.clone().multiplyScalar(1.4),transparent:!0,opacity:.3,depthWrite:!1,blending:Ne}));r.scale.setScalar(50),r.position.y=11,n.group.add(r);let o=Wn("div","stl",'<div class="h"><b></b><span class="n"></span><span class="live"></span></div><div class="l"></div>');o.style.setProperty("--c",ws[i].color),o.querySelector("b").textContent=ws[i].station;let a=new yi(o);a.center.set(.5,0),he.add(a),Ei[i]={c:i,i:t,col:e,m:n,halo:r,pos:n.group.position.clone().setY(11),hitAt:0,last:"",live:0,el:o,obj:a,scale:1}});function eS(i,t){for(let e of Rs){let n=Ei[e],s=Math.max(0,1-(t-n.hitAt)/700),r=n.live?.5+.5*Math.sin(t/160):0;n.m.coreMat.emissiveIntensity=.75+s*3.2+r*1.2,n.m.core.rotation.y+=i*(.6+s*4),n.m.core.position.y=11+Math.sin(t/900+n.i)*1.3,n.m.ring.rotation.y+=i*(.5+(n.live?1.6:0)),n.m.ring.rotation.x=1.15+.25*Math.sin(t/2100+n.i),n.m.ring2.rotation.z+=i*.22,n.halo.material.opacity=.2+s*.8+r*.3,n.halo.scale.setScalar(50+s*30),n.obj.position.copy(n.pos).addScaledVector(kt.up,-26)}}function nS(){for(let i of Rs)Ei[i].last="";Zs&&eg(Zs)}function eg(i){for(let t of Rs){let e=Ei[t];e.live=i.pendingByCat?.[t]||0,ei(e.el.querySelector(".n"),String(i.byCat?.[t]??0)),ei(e.el.querySelector(".live"),e.live?`\u25CF ${e.live} live`:""),ei(e.el.querySelector(".l"),Vt.clipT(e.last||i.lastByCat?.[t]?.l||"",26))}}var ri={R:305,Y:18,LIFT:12,SIZE:1.7},Ra=Fn("#8fd3ff"),ng=Fn("#ffa040"),tn=new Map,iS=1400,pd=null;function ig(){if(!pd){let i=new Hr($s);pd=i.fromScene(xm(),.02).texture,i.dispose()}return pd}var sS=0,ph=new Map;function rS(i){let t=new Set,e=performance.now(),n=new Set((i||[]).map(r=>r.id)),s=new Set([...li.values()].filter(r=>!r.dying).map(r=>r.r.pid));for(let[r,o]of ph)(o<e||!n.has(r))&&ph.delete(r);for(let r of i||[]){if(ph.has(r.id)||r.left&&s.has(r.pid))continue;t.add(r.id);let o=tn.get(r.id);(!o||o.dying)&&(o&&Hd(o),o=lS(r),tn.set(r.id,o)),o.t=r;let a=r.running?"lane":"park";a!==o.homeKind&&(o.homeKind&&(o.fly={t0:e,from:o.pos.clone(),fromQ:o.m.group.quaternion.clone(),fromScale:o.base}),a==="lane"?(o.theta=aS(),o.speed=o.lift=0):o.parkedAt=e,o.homeKind=a),ei(o.el.querySelector("b"),r.running?Vt.clipT(r.cmd||"running",30):r.dir||"terminal"),ei(o.el.querySelector("span"),r.left?`left running \xB7 ${r.dir}`:r.running?`${r.dir}${r.cpu>=1?` \xB7 ${Math.round(r.cpu)}% cpu`:""}`:"idle shell"),o.el.classList.toggle("left",!!r.left),o.el.classList.toggle("idle",!r.running),o.el.classList.toggle("parked",a==="park")}for(let r of tn.values())!t.has(r.id)&&!r.dying&&sg(r,e);zd(),Ue?.kind==="ship"&&Ah(),Qi()}function sg(i,t){i.dying=t,Qe(i.pos,Ra,44,260),Qe(i.pos,Fn("#ffb057"),30,170),Qe(i.pos,Nd,18,110),oi({pos:i.pos.clone(),scale:i.size/ri.SIZE},"#8fd3ff",70,650),ln()}function oS(i){ph.set(i,performance.now()+3e4);let t=tn.get(i);t&&!t.dying&&sg(t,performance.now())}function aS(){let i=[...tn.values()].filter(n=>!n.dying&&n.homeKind==="lane").map(n=>(n.theta%Dt+Dt)%Dt).sort((n,s)=>n-s);if(!i.length)return Dt*.12;let t=0,e=0;return i.forEach((n,s)=>{let r=s+1<i.length?i[s+1]:i[0]+Dt;r-n>t&&(t=r-n,e=n+t/2)}),e}function lS(i){let t=i.left?ng:Ra,e=ym(t,ig());e.group.scale.setScalar(.01),he.add(e.group);let n=new un({map:lo,color:t.clone().multiplyScalar(1.6),transparent:!0,opacity:0,depthWrite:!1,blending:Ne}),s=e.jetKinds.map(l=>{let c=new xn(n);return c.position.copy(l.at),c.userData.main=l.main,c.userData.fan=!!l.fan,e.group.add(c),c}),r={material:n,flames:s},o=Wn("div","shl","<b></b><span></span>"),a=new yi(o);return a.center.set(.5,0),he.add(a),{id:i.id,t:i,m:e,flame:r,el:o,obj:a,homeKind:null,slot:-1,fly:null,parkedAt:0,theta:0,speed:0,lift:0,base:ri.SIZE,grow:.01,size:.01,pos:new C,dying:0,i:sS++}}function Hd(i){he.remove(i.m.group,i.obj),i.obj.element.remove();for(let t of i.m.own)t.dispose();i.flame.material.dispose(),tn.delete(i.id),Ue?.ship===i&&uo(null)}var Om=new C,cS=new C,Fm=new C,qs=new C,xh=new He,Bm=new He,hS=new He,uS=new Kt;function dS(i,t,e){if(i.homeKind==="park"&&i.slot>=0){let o=Qm(i.slot,qs);qs.addScaledVector(kt.up,Math.sin(e/900+i.i*1.7)*2*o);let a=jm(i.slot).x>0?-1:1;return xh.copy(se.quaternion).multiply(Bm.setFromAxisAngle(Ld,.24)).multiply(hS.setFromAxisAngle(yd,a*(1.05+.08*Math.sin(e/2600+i.i)))),ee.PARK_CAR_PX/gm*o}let n=i.t.running,s=n?.09+Math.min(1,(i.t.cpu||0)/60)*.16:0;i.speed+=(s-i.speed)*Cn(1.2,t),i.theta+=i.speed*t,i.lift+=((n?ri.LIFT:0)-i.lift)*Cn(1.5,t);let r=Math.sin(e/900+i.i*1.7)*1.4;return qs.set(Math.cos(i.theta)*ri.R,ri.Y+i.lift+r,Math.sin(i.theta)*ri.R),Om.set(-Math.sin(i.theta),0,Math.cos(i.theta)),xh.setFromRotationMatrix(uS.lookAt(cS.copy(qs).add(Om),qs,yd)).multiply(Bm.setFromAxisAngle(Dd,-.35*Math.min(1,i.speed/.12))),ri.SIZE}function fS(i,t){for(let e of[...tn.values()]){let n=e.t.running&&!e.dying;if(!e.dying){let r=dS(e,i,t);if(e.fly){let o=Ce((t-e.fly.t0)/iS,0,1),a=Gn(o);e.pos.lerpVectors(e.fly.from,qs,a),e.m.group.quaternion.slerpQuaternions(e.fly.fromQ,xh,a),e.base=Un(e.fly.fromScale,r,a),o>=1&&(e.fly=null)}else e.pos.copy(qs),e.m.group.quaternion.copy(xh),e.base=r}e.grow+=((e.dying?0:1)-e.grow)*Cn(e.dying?24:3.5,i),e.size=Math.max(.01,e.base*e.grow),e.m.group.position.copy(e.pos),e.m.group.scale.setScalar(e.size);let s=e.fly&&!e.dying?.6:n?.55+.2*Math.sin(t/80+e.i)+Math.min(.3,(e.t.cpu||0)/200):.04;e.flame.material.opacity+=(s-e.flame.material.opacity)*Cn(6,i);for(let r of e.flame.flames){let[o,a]=r.userData.main?[4,7]:r.userData.fan?[3,5]:[1,1.4];r.scale.setScalar(o+s*a)}e.m.glassMat.emissiveIntensity=n?.16:.06,e.obj.visible=!e.dying,e.obj.position.copy(e.pos).addScaledVector(kt.up,-10.6*e.size),e.dying&&e.grow<.02&&Hd(e)}}var Ca=i=>!i.dying&&i.homeKind==="lane";function pS(){let i=!1;for(let t of tn.values())i||(i=Ca(t));if(i){qn.circle(ye.p.set(0,ri.Y,0),ri.R,Ld,Dd,Ra,.09,128);for(let t of tn.values()){if(!Ca(t)||t.fly||!t.t.running)continue;let e=.006+t.speed*.05;for(let n=1;n<=14;n++){let s=t.theta-n*e;Fm.set(Math.cos(s)*ri.R,t.pos.y,Math.sin(s)*ri.R),On.add(Fm,Ra,.45*(1-n/15)*t.flame.material.opacity,5.5*(1-n/18))}}}}var li=new Map,eo=Fn("#ff3b1f"),yh=Fn("#ffb057"),wd=ee.STATION_R*1.12,mS=2600,zm=8e3,Hm=new C,mh=new Map;function gS(i){let t=new Set,e=performance.now();for(let[n,s]of mh)e>s&&mh.delete(n);for(let n of i||[]){let s=`${n.pid}:${n.started}`;if(t.add(s),mh.has(s))continue;for(let o of[...tn.values()])o.t.left&&o.t.pid===n.pid&&Hd(o);let r=li.get(s);if(!r){let o=mm();o.group.scale.setScalar(.01),he.add(o.group);let a=Wn("div","mtl","<b></b><span></span>"),l=new yi(a);l.center.set(.5,1.6),he.add(l);let c=new C().setFromSphericalCoords(wd*3.2,.9+Math.random()*.6,Math.random()*Dt),h=Array.from({length:24},()=>new C);r={k:s,r:n,model:o,el:a,obj:l,theta:Math.random()*Dt,tilt:.35+Math.random()*.3,spin:Math.random()*Dt,pos:c.clone(),grow:0,dying:0,enter:{t0:e,from:c},trail:h,trailN:0,trailAt:0},li.set(s,r),re.visible&&!document.hidden?Vd(r):Mh=r}r.r=n,ei(r.el.querySelector("b"),`\u26A0 ${n.name}`),ei(r.el.querySelector("span"),`${Math.round(n.cpu)}% cpu`)}for(let n of li.values())t.has(n.k)||n.dying||(n.dying=e,Qe(n.pos,eo,40,220),Qe(n.pos,yh,24,140),Qe(n.pos,Fn("#6f9cff"),18,160));Ue?.kind==="box"&&Ah(),Qi()}function _S(i){let t=performance.now();for(let e of li.values())e.dying||e.r.pid!==i||(mh.set(e.k,t+15e3),e.dying=t,Qe(e.pos,eo,90,320),Qe(e.pos,yh,60,220),Qe(e.pos,Fn("#6f9cff"),36,260),Qe(e.pos,Nd,30,140),oi({pos:e.pos.clone(),scale:1.6},"#ff5a3c",140,700),oi({pos:e.pos.clone(),scale:1.6},"#ffffff",90,420),Jm(14,520));ln(1500)}function xS(i,t,e){let n=Math.sin(t)*wd;return e.set(Math.cos(t)*wd,n*Math.sin(i.tilt),n*Math.cos(i.tilt))}function yS(i){he.remove(i.model.group,i.obj),i.el.remove();for(let t of i.model.own)t.dispose();li.delete(i.k),Ue?.b===i&&uo(null)}function vS(i,t){for(let e of[...li.values()]){if(e.grow+=((e.dying?0:1)-e.grow)*Cn(e.dying?10:2,i),e.dying&&e.grow<.03){yS(e);continue}let n=Math.min(1,e.r.cpu/100);if(e.theta+=(.05+n*.07)*i,xS(e,e.theta,e.pos),e.enter){let o=Ce((t-e.enter.t0)/mS,0,1);o>=1?e.enter=null:e.pos.lerpVectors(e.enter.from,e.pos,Je(o))}if(t-e.trailAt>90){e.trailAt=t;let o=e.trail.pop();e.trail.unshift(o.copy(e.pos)),e.trailN=Math.min(e.trail.length,e.trailN+1)}let s=e.model.group;s.position.copy(e.pos),s.rotation.x+=i*(.9+n),s.rotation.y+=i*.45,s.rotation.z+=i*(.55+n*.6),s.scale.setScalar(Math.max(.01,e.grow*1.4));let r=.75+.25*Math.sin(t/55+e.spin)*Math.sin(t/23+e.spin*2);e.model.blue.emissive.setRGB(.05+.2*n*r,.14,.55),e.model.lamp.visible=Math.sin(t/260+e.spin)>-.3,e.obj.visible=!e.dying,e.obj.position.copy(e.pos)}}function MS(i){for(let t of li.values()){let e=Math.min(1.5,t.r.cpu/100)*t.grow,n=.85+.15*Math.sin(i/45+t.spin);On.add(t.pos,eo,1.2*e*n,44+14*e);for(let s=0;s<7;s++){let r=i/140+s*.9+t.spin,o=9+4*Math.sin(i/90+s);Hm.set(Math.cos(r)*o,Math.sin(r*1.3)*o,Math.sin(r)*o).add(t.pos),On.add(Hm,s%2?yh:eo,1.1*e*(.6+.4*Math.sin(i/37+s*2)),11+5*e)}for(let s=0;s<t.trailN;s++){let r=(s+1)/(t.trail.length+1);On.add(t.trail[s],s<5?yh:eo,1.3*(1-r)*e,(16+10*e)*(1-r*.75))}}}var SS=i=>`<div class="h" style="color:#ff5a3c">\u26A0 ${Vt.esc(i.name)} \xB7 ${Math.round(i.cpu)}% cpu</div><div class="r">${Vt.esc(Vt.clipT(i.cmd,70))}</div><div class="d">burning a core with nobody to see it \xB7 click to end it</div>`,vh={IDLE_MS:3e5,SHOT_MS:9e3,SHOT_JITTER:4e3},Pa=performance.now(),Jt=null,Th=(()=>{try{return localStorage.getItem("cinematic")!=="off"}catch{return!0}})(),Na=Wn("div","cine-tag","\u25C9 cinematic \xB7 move the mouse to take over");Te.parentElement.appendChild(Na);var md=new C,jr=new C,xa=new C;function kd(i){Pa=performance.now(),Jt&&(Jt.alarm&&i&&i.type==="pointermove"||(Jt=null,Na.classList.remove("on"),ho()))}for(let i of["pointerdown","pointermove","wheel","keydown"])addEventListener(i,kd,{passive:!0,capture:!0});function bS(i){let t=performance.now()-i*1e3;t>Pa&&(Pa=t),Jt&&!Jt.alarm&&i<3&&kd()}function rg(i){Th=i;try{localStorage.setItem("cinematic",i?"on":"off")}catch{}let t=document.querySelector('#viewctl [data-v="cine"]');t&&(t.classList.toggle("off",!i),t.title=i?"Cinematic camera when you are away (5 min): on \xB7 click to turn off":"Cinematic camera: off \xB7 click to turn on"),!i&&Jt&&kd()}var Mh=null;function Vd(i){if(Mh=null,ze||!_h||i.dying)return;let t=performance.now();Jt={kind:"box",key:i.k,b:i,style:"chase",t0:t,until:t+zm,ang:Math.random()*Dt,prev:null,alarm:!0},je=null,Vt.hideTip(),ln(zm)}function ES(){let i=[{kind:"core",key:"core"}];for(let t of Oe.values())!t.dying&&t.root.visible&&t.homeKind==="orbit"&&i.push({kind:"session",key:t.sid,n:t});for(let t of tn.values())Ca(t)&&!t.fly&&i.push({kind:"car",key:t.id,s:t});for(let t of li.values())t.dying||i.push({kind:"box",key:t.k,b:t});return i}function Ad(i){let t=ES(),e=t.filter(r=>r.key!==Jt?.key),n=e.filter(r=>r.kind!=="core"),s=n.length&&Math.random()<.8?n[Math.floor(Math.random()*n.length)]:e[Math.floor(Math.random()*e.length)]||t[0];return{...s,style:s.kind==="core"||Math.random()<.4?"orbit":"chase",t0:i,until:i+vh.SHOT_MS+Math.random()*vh.SHOT_JITTER,ang:Math.random()*Dt,prev:null}}function gd(i){return i.kind==="core"?ye.p.set(0,0,0):i.kind==="session"?Oe.get(i.key)===i.n&&!i.n.dying?i.n.pos:null:i.kind==="box"?li.get(i.key)===i.b&&!i.b.dying?i.b.pos:null:tn.get(i.key)===i.s&&Ca(i.s)?i.s.pos:null}function og(){return!Th||ze||!_h?!1:(Jt=Ad(performance.now()),je=null,Vt.hideTip(),Na.classList.add("on"),!0)}function TS(i,t){if(!Jt){t-Pa>vh.IDLE_MS&&!re.saver&&!Ia.active()&&og();return}if(t>Jt.until||Jt.alarm&&!gd(Jt)){if(Jt.alarm&&(t-Pa<vh.IDLE_MS||re.saver)){Jt=null,ho();return}Jt=Ad(t)}let e=gd(Jt);if(!e&&(Jt=Ad(t),e=gd(Jt),!e))return;let n=Jt.kind==="core"?620:Jt.kind==="car"?260:Jt.kind==="box"?220:360;Jt.style==="chase"?(Jt.prev&&jr.subVectors(e,Jt.prev),(!Jt.prev||jr.lengthSq()<1e-6)&&jr.set(-e.z,0,e.x),jr.y=0,jr.normalize(),xa.set(e.x,0,e.z),xa.lengthSq()<1&&xa.set(1,0,0),xa.normalize(),md.copy(e).addScaledVector(jr,-n*.75).addScaledVector(xa,n*.5).add(ye.b.set(0,n*.4,0)),Jt.prev=(Jt.prev||new C).copy(e)):(Jt.ang+=i*.12,md.set(e.x+Math.cos(Jt.ang)*n,e.y+n*.42,e.z+Math.sin(Jt.ang)*n)),ne.target.lerp(e,Cn(3,i)),se.position.lerp(md,Cn(1.1,i)),ln(600)}var ag=Wn("div","corel"),Gd=new yi(ag);Gd.center.set(.5,0);he.add(Gd);var Rd=0,km=.2,no=[],Ys=[],io=[],Sh=new Map,wS=i=>{let t=Oe.get(i.s);if(!t||t.dying)return null;let e=i.a&&t.drones.get(i.a);return e&&!e.dying?e:t},ba=i=>!i||i.dying||i.owner&&i.owner.dying,AS=i=>i.owner?i.owner.scale:i.scale||1;function Qe(i,t,e,n=70){let s=performance.now(),r=t.isColor?t.clone():Fn(t);for(let o=0;o<e;o++){let a=new C(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize().multiplyScalar(n*(.3+Math.random()));Ys.push({p:i.clone(),v:a,t0:s,life:380+Math.random()*480,col:r})}Ys.length>1500&&Ys.splice(0,Ys.length-1500)}function oi(i,t,e,n,s=0,r=!0){io.push({node:i,col:Fn(t),maxR:e,life:n,t0:performance.now()+s,face:r}),io.length>160&&io.shift()}function ya(i,t,e,n,s){let r=i.fts;for(;r.childElementCount>=3;)r.firstElementChild.remove();let o=Wn("div","ft"+(s?" b":""));o.textContent=t,o.style.color=e,o.style.animationDuration=n+"ms",r.appendChild(o),setTimeout(()=>o.remove(),n)}function Vm(i){let t=Vt.clipT(i.l||"",34);switch(i.c){case"web":return(i.n==="WebSearch"?"\u2315 ":"\u2193 ")+t;case"edit":return"\u270E "+t;case"read":return"\u25A4 "+t;case"bash":return"$ "+t;case"agent":return"\u25C6 "+t;case"plan":return i.n+(t?" "+t:"");default:return t||i.n}}function Gm(i,t){let e=Wn("div","bl");e.textContent=i,e.style.color=t;let n=new yi(e);return n.center.set(0,1),he.add(n),{e,obj:n}}function Cd(i,t){let e=`${i.s}|${i.a||""}|${i.c}`,n=Sh.get(e)||{t:0,n:0};n.t=Math.max(n.t,t),n.n++,Sh.set(e,n)}function RS(i){let t=performance.now();if(!re.visible||!re.shown||document.hidden){i.k==="tool"&&Cd(i,t);return}ln(1600);let e=wS(i);switch(i.k){case"tool":{Cd(i,t);let n=Ei[i.c];if(!e||!n)break;let s=no.filter(r=>r.label).length<6;no.push({a:e,b:n,col:Fn(ws[i.c].color),t0:t,dur:1100+Math.random()*450,size:4.4,dir:1,text:Vm(i),label:s?Gm(Vm(i),ws[i.c].color):null}),e.owner.kick=Math.min(1.5,e.owner.kick+.6),(i.n==="Agent"||i.n==="Task")&&(oi(e,ws.agent.color,70,1400),ya(e.owner,`\u25C6 spawn \xB7 ${Vt.clipT(i.l,40)}`,ws.agent.color,3400,!0));break}case"result":{let n=Ei[i.c];if(!e||!n)break;no.push({a:n,b:e,col:Fn(i.ok?"#3dffa8":"#ff4d4d"),t0:t,dur:780+Math.random()*300,size:3.2,dir:-1,ok:i.ok,label:i.ok?null:Gm("\u2717 failed","#ff4d4d")});break}case"prompt":if(!e)break;oi(e,an.tint("#fff0e0"),110,1700),oi(e,an.accent,80,1400,200),Qe(e.pos,an.tint("#fff0e0"),18),ya(e.owner,`\u203A ${Vt.clipT(i.l,70)}`,"#ffffff",5600,!0);break;case"say":e&&ya(e.owner,`\u201C${Vt.clipT(i.l,60)}\u201D`,Sn(an.txt2),3800);break;case"think":e&&oi(e,"#9d6bff",34,900);break;case"usage":if(!e||t-e.owner.lastUsageFx<700)break;e.owner.lastUsageFx=t,ya(e.owner,`+${Vt.fmtTok(i.out)} out \xB7 ${Vt.fmtUsd(i.c)}`,Sn(an.soft),2200);break;case"sys":if(!e)break;ya(e.owner,`${i.err?"\u26A0 ":""}${Vt.clipT(i.l,48)}`,i.err?"#ff4d4d":"#ffd23f",4400,!0),i.err&&Qe(e.pos,"#ff4d4d",16);break}}var wa=new C,va=new C;function lg(i,t,e){let n=i.distanceTo(t);return e.addVectors(i,t).multiplyScalar(.5*.8),e.y+=14+n*.2,e}function Pd(i,t,e,n,s){let r=1-n;return s.set(r*r*i.x+2*r*n*t.x+n*n*e.x,r*r*i.y+2*r*n*t.y+n*n*e.y,r*r*i.z+2*r*n*t.z+n*n*e.z)}function CS(i){for(let t=no.length-1;t>=0;t--){let e=no[t],n=(i-e.t0)/e.dur;if(ba(e.a)||ba(e.b)||n>=1){n>=1&&!ba(e.a)&&!ba(e.b)&&PS(e,i),e.label&&he.remove(e.label.obj),no.splice(t,1);continue}if(n<0)continue;let s=e.a.pos,r=e.b.pos;lg(s,r,wa);let o=Gn(n);for(let a=12;a>=1;a--){let l=o-a*.016;l>0&&On.add(Pd(s,wa,r,l,va),e.col,(1-a/13)*1.2,e.size*(1-a/16))}Pd(s,wa,r,o,va),On.add(va,e.col,1.6,e.size*2.6),On.add(va,Nd,2.6,e.size*.85),e.label&&(e.label.obj.position.copy(va),e.label.e.style.opacity=Math.min(1,Math.sin(n*Math.PI)*1.5).toFixed(2))}}function PS(i,t){i.dir>0?(i.b.hitAt=t,i.text&&(i.b.last=i.text.replace(/^[⌕↓✎▤$◆]\s/,"")),Qe(i.b.pos,i.col,12,60),ei(i.b.el.querySelector(".l"),Vt.clipT(i.b.last,26))):(oi(i.b,i.col,i.ok===!1?40:16,650),i.ok===!1&&Qe(i.b.pos,"#ff4d4d",12))}function IS(i,t){for(let e=Ys.length-1;e>=0;e--){let n=Ys[e],s=(t-n.t0)/n.life;if(s>=1){Ys.splice(e,1);continue}n.p.addScaledVector(n.v,i),n.v.multiplyScalar(Math.pow(.04,i)),On.add(n.p,n.col,(1-s)*1.8,2.4)}}function LS(i){for(let t=io.length-1;t>=0;t--){let e=io[t],n=(i-e.t0)/e.life;if(n<0)continue;if(n>=1||e.node!==Td&&ba(e.node)){io.splice(t,1);continue}let r=((e.node===Td?ee.CORE_R:e.node.owner===e.node?ee.HEX:Ta)+Je(n)*e.maxR)*AS(e.node),o=.85*(1-n),[a,l]=e.face?[kt.right,kt.up]:[Ld,Dd];qn.circle(e.node.pos,r,a,l,e.col,o,56),qn.circle(e.node.pos,r*.985,a,l,e.col,o*.6,56)}}function DS(i){for(let t of Oe.values())if(!(t.dying||!t.root.visible)){if(t.status==="busy"){let e=ee.HEX*1.62*t.scale;for(let n=0;n<3;n++){let s=i/520+n*Dt/3;ye.p.copy(t.pos).addScaledVector(kt.right,Math.cos(s)*e).addScaledVector(kt.up,Math.sin(s)*e),On.add(ye.p,t.color,1.5,5*t.scale)}}else if(t.homeKind==="park"){let e=t.status==="waiting"?1300:2200,n=t.status==="waiting"?3:2;for(let s=0;s<n;s++){let r=(i+s*e/n+t.ci*300)%e/e,o=ee.HEX*(1.3+Je(r)*(t.status==="waiting"?1.6:1.1))*t.scale;qn.circle(t.pos,o,kt.right,kt.up,t.color,(1-r)*(t.status==="waiting"?.95:.55),56)}}}}var Fi=Array.from({length:17},()=>new C);function NS(i){for(let[t,e]of Sh){let n=i-e.t;if(n>6e5){Sh.delete(t);continue}let[s,r,o]=t.split("|"),a=Oe.get(s),l=Ei[o];if(!a||a.dying||!l||!a.root.visible)continue;let c=r&&a.drones.get(r)||a,h=n<25e3;lg(c.pos,l.pos,wa);for(let u=0;u<=16;u++)Pd(c.pos,wa,l.pos,u/16,Fi[u]);let d=h?.42:.05+.16*(1-n/6e5);qn.path(Fi,l.col,u=>d*Math.min(1,u*6,(1-u)*6+.25),h)}}function US(){for(let i of Oe.values())if(!(i.dying||!i.root.visible)){for(let t of i.drones.values())t.dying||(Fi[0].copy(i.pos),Fi[1].copy(t.pos),qn.path([Fi[0],Fi[1]],Eh,t.ag.running?.45:.12,!!t.ag.running));(i.mode==="drag"||i.mode==="spring")&&(Fi[0].copy(i.pos),Fi[1].copy(i.homePos),qn.path([Fi[0],Fi[1]],i.color,.4,!0),qn.circle(i.homePos,ee.HEX*.5*i.homeScale,kt.right,kt.up,i.color,.45,32))}}var Ue=null,ze=null,Xn=null,Ma={x:0,y:0,z:0};function wh(i,t,e){let n=e&&e.closest&&e.closest(".sl");if(n){let a=Oe.get(n.dataset.sid);if(a&&!a.dying)return{kind:"session",owner:a}}let s=null,r=1,o=(a,l,c,h=1)=>{if(ro(l,Ma),Ma.z>1||Ma.z<-1)return;let d=Math.max(9,c*Da(l)+3),u=Math.hypot(Ma.x-i,Ma.y-t)/d*h;u<r&&(r=u,s=a)};for(let a of Oe.values())if(!(a.dying||!a.root.visible)){o({kind:"session",owner:a},a.pos,ee.HEX*a.scale);for(let l of a.drones.values())l.dying||o({kind:"drone",owner:a,drone:l},l.pos,Ta*1.2*a.scale,.7)}for(let a of Rs)o({kind:"station",cat:a},Ei[a].pos,20,1.2);for(let a of tn.values())a.dying||o({kind:"ship",ship:a},a.pos,12*a.size,.9);for(let a of li.values())a.dying||o({kind:"box",b:a},a.pos,22,.8);return s}function uo(i){Ue=i,Te.style.cursor=i?i.kind==="session"?"grab":"pointer":"",Ah()}function Ah(){if(!Ue||!Xn||ze)return Vt.hideTip();Ue.kind==="session"?Vt.showTip(Vt.sessionTip(Ue.owner.s),Xn.x,Xn.y):Ue.kind==="drone"?Vt.showTip(Vt.agentTip(Ue.drone.ag,Ue.owner.s),Xn.x,Xn.y):Ue.kind==="ship"?Vt.showTip(Vt.terminalTip(Ue.ship.t),Xn.x,Xn.y):Ue.kind==="box"?Vt.showTip(SS(Ue.b.r),Xn.x,Xn.y):Vt.showTip(Vt.stationTip(Ue.cat),Xn.x,Xn.y)}function Rh(i){let t=Te.getBoundingClientRect();return{x:i.clientX-t.left,y:i.clientY-t.top}}Te.addEventListener("pointerdown",i=>{if(i.button!==0||i.altKey)return;let t=Rh(i),e=wh(t.x,t.y,i.target);e&&(i.stopPropagation(),i.preventDefault(),Te.setPointerCapture(i.pointerId),ze={h:e,id:i.pointerId,x:t.x,y:t.y,moved:!1},je=null,Vt.hideTip(),ln())},!0);Te.addEventListener("pointermove",i=>{let t=Rh(i);if(Xn=t,ln(600),ze&&i.pointerId===ze.id){i.stopPropagation(),!ze.moved&&Math.hypot(t.x-ze.x,t.y-ze.y)>4&&(ze.moved=!0,ze.h.kind==="session"&&ze.h.owner.beginDrag(t)),ze.moved&&ze.h.kind==="session"&&ze.h.owner.mode==="drag"&&ze.h.owner.dragTo(t);return}i.buttons||uo(wh(t.x,t.y,i.target))},!0);function cg(i,t){if(!ze||i.pointerId!==ze.id)return;i.stopPropagation();let{h:e,moved:n}=ze;ze=null,e.kind==="session"&&e.owner.mode==="drag"&&e.owner.endDrag(),!(n||t)&&(e.kind==="session"||e.kind==="drone"?(oi(e.drone||e.owner,"#ffffff",36,600),Vt.focusSession(e.owner.sid)):e.kind==="station"?Ei[e.cat].hitAt=performance.now():e.kind==="ship"?(Qe(e.ship.pos,e.ship.t.left?ng:Ra,12,55),e.ship.t.left?window.Danger?.openLeft?.(e.ship.t):Vt.openTerminal(e.ship.id)):e.kind==="box"&&(Qe(e.b.pos,eo,14,60),window.Danger?.open(e.b.r.pid)))}Te.addEventListener("pointerup",i=>cg(i,!1),!0);Te.addEventListener("pointercancel",i=>cg(i,!0),!0);Te.addEventListener("pointerleave",()=>{Xn=null,ze||uo(null)});Te.addEventListener("contextmenu",i=>{document.querySelector(".pn-ctx")?.remove();let t=Rh(i),e=wh(t.x,t.y,i.target);if(!e||e.kind!=="drone")return;i.preventDefault(),i.stopPropagation();let n=Wn("div","pn-ctx"),s=Wn("button");s.type="button",s.textContent="Dismiss",n.appendChild(s),document.body.appendChild(n),n.style.left=`${Math.max(4,Math.min(i.clientX,innerWidth-n.offsetWidth-4))}px`,n.style.top=`${Math.max(4,Math.min(i.clientY,innerHeight-n.offsetHeight-4))}px`,s.onclick=()=>{n.remove();let r=e.drone;Xm.set(`${e.owner.sid}:${r.ag.id}`,r.ag.lastTs||Date.now()),r.dying||(r.dying=performance.now(),Qe(r.pos,Eh,10,40)),uo(null),ln()}},!0);Te.addEventListener("dblclick",i=>{let t=Rh(i);wh(t.x,t.y,i.target)||ho()});var hg=0;Te.addEventListener("wheel",()=>ln(),{passive:!0,capture:!0});Te.addEventListener("gesturestart",i=>{i.preventDefault(),ln(),hg=se.position.distanceTo(ne.target),je=null});Te.addEventListener("gesturechange",i=>{i.preventDefault();let t=Ce(hg/i.scale,ne.minDistance,ne.maxDistance);se.position.sub(ne.target).setLength(t).add(ne.target)});Te.addEventListener("gestureend",i=>i.preventDefault());var ji=document.getElementById("minimap"),OS=ji.getContext("2d"),oo={w:0,h:0};new ResizeObserver(([i])=>{oo.w=i.contentRect.width,oo.h=i.contentRect.height}).observe(ji);var ug=()=>(Math.min(oo.w,oo.h)*.5-5)/(ee.STATION_R+24),_d=new C,Sa=new C;function FS(i,t,e){let n=Sd({x:(i+1)/2*de.w,y:(1-t)/2*de.h}),s=n.direction.y<-.02?-n.origin.y/n.direction.y:3e3;return e.copy(n.origin).addScaledVector(n.direction,Math.min(s,3e3)),e.y=0,e}function BS(){let i=oo.w,t=oo.h,e=de.dpr;if(!i||!t)return;ji.width!==Math.round(i*e)&&(ji.width=Math.round(i*e),ji.height=Math.round(t*e));let n=OS,s=ug(),r=i/2,o=t/2;n.setTransform(e,0,0,e,0,0),n.clearRect(0,0,i,t),n.lineWidth=1;for(let h of Oe.values())if(!(h.dying||h.homeKind!=="orbit")){n.strokeStyle=Vt.hexA(h.hueCss,.35),n.beginPath();for(let d=0;d<=40;d++){let u=d/40*Dt;Sa.set(Math.cos(u)*h.r,Math.sin(u)*h.r,0).applyQuaternion(h.quat),d?n.lineTo(r+Sa.x*s,o+Sa.z*s):n.moveTo(r+Sa.x*s,o+Sa.z*s)}n.stroke()}for(let h of Rs){let d=Ei[h].pos;n.fillStyle=ws[h].color,n.fillRect(r+d.x*s-2,o+d.z*s-2,4,4)}let a=[...tn.values()].filter(Ca);if(a.length){n.strokeStyle="rgba(143, 211, 255, 0.22)",n.beginPath(),n.arc(r,o,ri.R*s,0,Dt),n.stroke();for(let h of a){let d=r+h.pos.x*s,u=o+h.pos.z*s,f=-Math.sin(h.theta),g=Math.cos(h.theta);n.fillStyle=h.t.running?"#8fd3ff":"rgba(143, 211, 255, 0.45)",n.beginPath(),n.moveTo(d+f*4,u+g*4),n.lineTo(d-f*3-g*2.6,u-g*3+f*2.6),n.lineTo(d-f*3+g*2.6,u-g*3-f*2.6),n.closePath(),n.fill()}}n.fillStyle=Sn(an.accent),n.beginPath(),n.arc(r,o,3.2,0,Dt),n.fill();for(let h of Oe.values())h.dying||h.homeKind!=="orbit"||!h.root.visible||(n.fillStyle=Aa[h.status]?.color||"#f88008",n.beginPath(),n.arc(r+h.pos.x*s,o+h.pos.z*s,h.mode==="drag"?3.4:2.4,0,Dt),n.fill());n.strokeStyle=Sn(an.soft,.85),n.beginPath(),[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([h,d],u)=>{FS(h,d,_d);let f=Ce(r+_d.x*s,-4,i+4),g=Ce(o+_d.z*s,-4,t+4);u?n.lineTo(f,g):n.moveTo(f,g)}),n.closePath(),n.stroke();let l=[...Oe.values()].filter(h=>!h.dying&&h.homeKind==="park"),c=tn.size-a.length-[...tn.values()].filter(h=>h.dying).length;l.length+c&&(n.font=`8px ${Vt.FONT}`,n.fillStyle=l.some(h=>h.status==="waiting")?"#ff2e63":"#00e5ff",n.fillText(`${l.length+c} parked`,4,t-4))}function dg(i){ln();let t=ji.getBoundingClientRect(),e=ug(),n=(i.clientX-t.left-t.width/2)/e,s=(i.clientY-t.top-t.height/2)/e,r=Math.hypot(n,s),o=r>700?700/r:1;ye.a.set(n*o,0,s*o).sub(ne.target),ne.target.add(ye.a),se.position.add(ye.a),je=null}ji.addEventListener("pointerdown",i=>{ji.setPointerCapture(i.pointerId),dg(i)});ji.addEventListener("pointermove",i=>{i.buttons&&dg(i)});for(let i of document.querySelectorAll("#viewctl button"))i.addEventListener("click",()=>{if(i.dataset.v==="reset")return ho();if(i.dataset.v==="cine")return rg(!Th);let t=se.position.clone().sub(ne.target);t.setLength(Ce(t.length()*(i.dataset.v==="in"?.7:1.4),ne.minDistance,ne.maxDistance)),Bd(ne.target,ne.target.clone().add(t),420)});var Zs=null,Wm=0;function zS(i){Zs=i,QM(i,performance.now()),eg(i),Wd(),Ue&&Ah()}function HS(i,t){let e=Oe.get(i);if(e)if(ln(2e3),t==="waiting")for(let n=0;n<3;n++)oi(e,Aa.waiting.color,90,1400,n*260);else t==="idle"&&oi(e,Aa.idle.color,80,1500)}function kS(i){let t=performance.now(),e=Date.now();for(let n of i)n.k==="tool"&&e-n.t<6e5&&Cd(n,t-(e-n.t))}function Wd(){let i=Zs?.totals;i&&(co.draw(i,Zs.byCat||{},Rd),ei(ag,Zs.sessions.length?"":"no Claude Code session in the last 30 min"))}var ai={x:0,y:0,z:0};function VS(i){if(ze||Jt?.alarm)return!1;let t=!!Jt;Jt&&(Jt=null,Na.classList.remove("on")),ro(ye.p.set(0,0,0),ai);let e=i*Da(ye.p),n=Math.min(de.w,de.h);return ai.z<1&&e>n*.14&&Math.abs(ai.x-de.w/2)+e<de.w/2&&Math.abs(ai.y-de.h/2)+e*.75<de.h/2&&!t&&!je?!1:(ho(),!0)}function GS(){return!de.w||!re.visible||(ro(ye.p.set(0,0,0),ai),ai.z>=1)?null:{x:ai.x,y:ai.y,r:ee.CORE_R*Da(ye.p)}}function WS(){let i=Ia.ship();return!i||!de.w||!re.visible||(ro(ye.p.copy(i.at),ai),ai.z>=1)?null:{x:ai.x,y:ai.y,r:.5*i.length*Da(ye.p)}}function XS(){let i=performance.now();for(let t of Rs)Ei[t].hitAt=i;for(let t of Oe.values())t.kick=Math.min(1.5,t.kick+1)}var to=1400,xd=(()=>{let i=[[0,0,0]],t=[-5,4,5,-3,-4,3,2,-2],e=0,n=0;for(;e<to-110;){e+=45+55*(e/to);let s=Math.pow(1-e/to,1.3),r=n%2?-1:1;i.push([Math.round(e),+(8*s*r).toFixed(2),+(t[n%t.length]*s*r).toFixed(2)]),n++}return i.push([to,0,0]),i})(),gh={t0:0};function qS(){return!de.w||!re.visible||!re.shown||re.covered||document.hidden||window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches?!1:(gh.t0=performance.now(),ln(to+140),!0)}function YS(i){if(!gh.t0)return;let t=i-gh.t0,e=0,n=0;if(t<to){let r=1;for(;xd[r][0]<t;)r++;let[o,a,l]=xd[r-1],[c,h,d]=xd[r],u=(1-Math.cos(Math.PI*((t-o)/(c-o))))/2;e=a+(h-a)*u,n=l+(d-l)*u,ln(120)}else gh.t0=0;let s=1.25/(Da(ye.p.set(0,0,0))||1);co.group.position.set(0,0,0).addScaledVector(kt.right,e*s).addScaledVector(kt.up,-n*s)}var Ia=Tm({scene:he,camera:se,CAM:kt,VIEW0:Qr,SIZE:de,ACT:re,glow:On,lines:qn,glowTex:lo,poke:ln,reflections:ig,core:co,coreR:ee.CORE_R,sun:Ud,shake:Jm,stage:VS,jolt:XS}),ao=0,Ea=performance.now(),Id=0;function ln(i=1500){re.until=performance.now()+i,Qi()}var bh=0;function fg(){bh=0,!ao&&re.visible&&re.shown&&!document.hidden&&(ao=requestAnimationFrame(Xd))}function Qi(){if(bh)return clearTimeout(bh),fg();ao||!re.visible||!re.shown||document.hidden||(Ea=performance.now(),ao=requestAnimationFrame(Xd))}function ZS(i){if(ze||je)return As.front.fps;let t=!re.covered&&(re.focused||i<re.until)?As.front.fps:As.behind.fps;return re.saver?Math.min(t,As.saver.fps):t}document.addEventListener("visibilitychange",Qi);function Xd(i){if(ao=0,!re.visible||!re.shown||document.hidden)return;let t=1e3/ZS(i),e=t-(i-Ea)-2;if(e>12){bh=setTimeout(fg,e);return}if(ao=requestAnimationFrame(Xd),i-Ea<t-2)return;let n=Math.min(.05,Math.max(0,(i-Ea)/1e3));if(Ea=i,!de.w)return;if(se.position.sub(bi.off),bi.off.set(0,0,0),ZM(i),TS(n,i),ne.update(),KM(),i<bi.until){let o=(bi.until-i)/bi.ms;bi.off.set(Math.random()-.5,Math.random()-.5,Math.random()-.5).multiplyScalar(2*bi.amp*o),se.position.add(bi.off)}$M(),Te.classList.toggle("far",kt.dist>kt.fit*1.5),On.material.uniforms.focal.value=kt.focal*de.dpr,qn.material.uniforms.time.value=i/1e3;let s=Zs?.totals;s&&(Rd+=(s.toolsPerMin-Rd)*Cn(3,n),km=Ce(s.toolsPerMin/18,0,1)),Fd.update(i,n,de.dpr),co.update(i,km);for(let[o,a]of Oe)a.update(n,i)===!1&&(a.dispose(),Oe.delete(o),Ue?.owner===a&&uo(null),tg(),zd());eS(n,i),fS(n,i),vS(n,i),Ia.update(n,i),YS(i),Gd.position.set(0,0,0).addScaledVector(kt.up,-ee.CORE_R*1.7),On.begin(),qn.begin(),NS(i),US(),CS(i),LS(i),DS(i),IS(n,i),pS(),MS(i),Ia.draw(i),On.end(),qn.end();let r=i-Wm>250;r&&(Wm=i);for(let o of Oe.values())o.placeLabel(),r&&!o.dying&&o.refreshLabel();r&&Wd(),he.updateMatrixWorld(),so.render(),La.render(he,se),i-Id>250&&(Id=i,BS())}Qi();function $S(i,t,e){re.visible=i,re.focused=t,re.covered=!!e,i&&Mh&&Vd(Mh),Km(),Qi()}function KS(i){re.saver=!!i,re.saver&&Jt&&!Jt.alarm&&(Jt=null,Na.classList.remove("on"),ho()),Km(),Qi()}function JS(i){let t=[...li.values()].find(e=>!e.dying&&e.r.pid===i);t&&Vd(t)}rg(Th);window.Orbit={quality:As,state:zS,event:RS,status:HS,seed:kS,activity:$S,power:KS,terminals:rS,terminalGone:oS,cinematic:og,idle:bS,runaways:gS,focusRunaway:JS,blowUp:_S,relabel:nS,attack:Ia.start,corePoint:GS,shipPoint:WS,nudge:qS};for(let[i,t]of Vt.MAPQ.splice(0))window.Orbit[i](...t);})();
