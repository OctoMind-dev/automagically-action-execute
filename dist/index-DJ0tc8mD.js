import UA, { PassThrough as no, pipeline as Lr } from "node:stream";
import As, { types as oo, promisify as _C, deprecate as Qo } from "node:util";
import ju from "node:events";
import { setTimeout as vC } from "node:timers";
import Os from "node:http";
import GC from "node:https";
import _r from "node:zlib";
import { Buffer as fA } from "node:buffer";
import { format as MC } from "node:url";
import { isIP as YC } from "node:net";
import "node:fs";
import "node:path";
var H = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function zu(A) {
  return A && A.__esModule && Object.prototype.hasOwnProperty.call(A, "default") ? A.default : A;
}
function Co(A) {
  if (A.__esModule) return A;
  var e = A.default;
  if (typeof e == "function") {
    var t = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(A).forEach(function(r) {
    var s = Object.getOwnPropertyDescriptor(A, r);
    Object.defineProperty(t, r, s.get ? s : {
      enumerable: !0,
      get: function() {
        return A[r];
      }
    });
  }), t;
}
var $o = {}, jr = {};
const PC = {}, JC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PC
}, Symbol.toStringTag, { value: "Module" })), G = /* @__PURE__ */ Co(JC);
var Zt = {};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.toCommandProperties = Zt.toCommandValue = void 0;
function OC(A) {
  return A == null ? "" : typeof A == "string" || A instanceof String ? A : JSON.stringify(A);
}
Zt.toCommandValue = OC;
function HC(A) {
  return Object.keys(A).length ? {
    title: A.title,
    file: A.file,
    line: A.startLine,
    endLine: A.endLine,
    col: A.startColumn,
    endColumn: A.endColumn
  } : {};
}
Zt.toCommandProperties = HC;
var VC = H && H.__createBinding || (Object.create ? function(A, e, t, r) {
  r === void 0 && (r = t);
  var s = Object.getOwnPropertyDescriptor(e, t);
  (!s || ("get" in s ? !e.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(A, r, s);
} : function(A, e, t, r) {
  r === void 0 && (r = t), A[r] = e[t];
}), WC = H && H.__setModuleDefault || (Object.create ? function(A, e) {
  Object.defineProperty(A, "default", { enumerable: !0, value: e });
} : function(A, e) {
  A.default = e;
}), qC = H && H.__importStar || function(A) {
  if (A && A.__esModule) return A;
  var e = {};
  if (A != null) for (var t in A) t !== "default" && Object.prototype.hasOwnProperty.call(A, t) && VC(e, A, t);
  return WC(e, A), e;
};
Object.defineProperty(jr, "__esModule", { value: !0 });
jr.issue = jr.issueCommand = void 0;
const xC = qC(G), Zu = Zt;
function $u(A, e, t) {
  const r = new zC(A, e, t);
  process.stdout.write(r.toString() + xC.EOL);
}
jr.issueCommand = $u;
function jC(A, e = "") {
  $u(A, {}, e);
}
jr.issue = jC;
const ag = "::";
class zC {
  constructor(e, t, r) {
    e || (e = "missing.command"), this.command = e, this.properties = t, this.message = r;
  }
  toString() {
    let e = ag + this.command;
    if (this.properties && Object.keys(this.properties).length > 0) {
      e += " ";
      let t = !0;
      for (const r in this.properties)
        if (this.properties.hasOwnProperty(r)) {
          const s = this.properties[r];
          s && (t ? t = !1 : e += ",", e += `${r}=${$C(s)}`);
        }
    }
    return e += `${ag}${ZC(this.message)}`, e;
  }
}
function ZC(A) {
  return (0, Zu.toCommandValue)(A).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}
function $C(A) {
  return (0, Zu.toCommandValue)(A).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
}
var zr = {}, XC = H && H.__createBinding || (Object.create ? function(A, e, t, r) {
  r === void 0 && (r = t);
  var s = Object.getOwnPropertyDescriptor(e, t);
  (!s || ("get" in s ? !e.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(A, r, s);
} : function(A, e, t, r) {
  r === void 0 && (r = t), A[r] = e[t];
}), KC = H && H.__setModuleDefault || (Object.create ? function(A, e) {
  Object.defineProperty(A, "default", { enumerable: !0, value: e });
} : function(A, e) {
  A.default = e;
}), Ka = H && H.__importStar || function(A) {
  if (A && A.__esModule) return A;
  var e = {};
  if (A != null) for (var t in A) t !== "default" && Object.prototype.hasOwnProperty.call(A, t) && XC(e, A, t);
  return KC(e, A), e;
};
Object.defineProperty(zr, "__esModule", { value: !0 });
zr.prepareKeyValueMessage = zr.issueFileCommand = void 0;
const ed = Ka(G), cg = Ka(G), Ta = Ka(G), Xu = Zt;
function Ad(A, e) {
  const t = process.env[`GITHUB_${A}`];
  if (!t)
    throw new Error(`Unable to find environment variable for file command ${A}`);
  if (!cg.existsSync(t))
    throw new Error(`Missing file at path: ${t}`);
  cg.appendFileSync(t, `${(0, Xu.toCommandValue)(e)}${Ta.EOL}`, {
    encoding: "utf8"
  });
}
zr.issueFileCommand = Ad;
function td(A, e) {
  const t = `ghadelimiter_${ed.randomUUID()}`, r = (0, Xu.toCommandValue)(e);
  if (A.includes(t))
    throw new Error(`Unexpected input: name should not contain the delimiter "${t}"`);
  if (r.includes(t))
    throw new Error(`Unexpected input: value should not contain the delimiter "${t}"`);
  return `${A}<<${t}${Ta.EOL}${r}${Ta.EOL}${t}`;
}
zr.prepareKeyValueMessage = td;
var ms = {}, aA = {}, Zr = {};
Object.defineProperty(Zr, "__esModule", { value: !0 });
Zr.checkBypass = Zr.getProxyUrl = void 0;
function rd(A) {
  const e = A.protocol === "https:";
  if (Ku(A))
    return;
  const t = e ? process.env.https_proxy || process.env.HTTPS_PROXY : process.env.http_proxy || process.env.HTTP_PROXY;
  if (t)
    try {
      return new URL(t);
    } catch {
      if (!t.startsWith("http://") && !t.startsWith("https://"))
        return new URL(`http://${t}`);
    }
  else
    return;
}
Zr.getProxyUrl = rd;
function Ku(A) {
  if (!A.hostname)
    return !1;
  const e = A.hostname;
  if (sd(e))
    return !0;
  const t = process.env.no_proxy || process.env.NO_PROXY || "";
  if (!t)
    return !1;
  let r;
  A.port ? r = Number(A.port) : A.protocol === "http:" ? r = 80 : A.protocol === "https:" && (r = 443);
  const s = [A.hostname.toUpperCase()];
  typeof r == "number" && s.push(`${s[0]}:${r}`);
  for (const o of t.split(",").map((i) => i.trim().toUpperCase()).filter((i) => i))
    if (o === "*" || s.some((i) => i === o || i.endsWith(`.${o}`) || o.startsWith(".") && i.endsWith(`${o}`)))
      return !0;
  return !1;
}
Zr.checkBypass = Ku;
function sd(A) {
  const e = A.toLowerCase();
  return e === "localhost" || e.startsWith("127.") || e.startsWith("[::1]") || e.startsWith("[0:0:0:0:0:0:0:1]");
}
var ts = {}, nd = G, ec = G, eE = G, od = G, id = G;
ts.httpOverHttp = ad;
ts.httpsOverHttp = cd;
ts.httpOverHttps = gd;
ts.httpsOverHttps = ld;
function ad(A) {
  var e = new Tt(A);
  return e.request = ec.request, e;
}
function cd(A) {
  var e = new Tt(A);
  return e.request = ec.request, e.createSocket = AE, e.defaultPort = 443, e;
}
function gd(A) {
  var e = new Tt(A);
  return e.request = eE.request, e;
}
function ld(A) {
  var e = new Tt(A);
  return e.request = eE.request, e.createSocket = AE, e.defaultPort = 443, e;
}
function Tt(A) {
  var e = this;
  e.options = A || {}, e.proxyOptions = e.options.proxy || {}, e.maxSockets = e.options.maxSockets || ec.Agent.defaultMaxSockets, e.requests = [], e.sockets = [], e.on("free", function(r, s, o, i) {
    for (var c = tE(s, o, i), g = 0, u = e.requests.length; g < u; ++g) {
      var l = e.requests[g];
      if (l.host === c.host && l.port === c.port) {
        e.requests.splice(g, 1), l.request.onSocket(r);
        return;
      }
    }
    r.destroy(), e.removeSocket(r);
  });
}
id.inherits(Tt, od.EventEmitter);
Tt.prototype.addRequest = function(e, t, r, s) {
  var o = this, i = Ac({ request: e }, o.options, tE(t, r, s));
  if (o.sockets.length >= this.maxSockets) {
    o.requests.push(i);
    return;
  }
  o.createSocket(i, function(c) {
    c.on("free", g), c.on("close", u), c.on("agentRemove", u), e.onSocket(c);
    function g() {
      o.emit("free", c, i);
    }
    function u(l) {
      o.removeSocket(c), c.removeListener("free", g), c.removeListener("close", u), c.removeListener("agentRemove", u);
    }
  });
};
Tt.prototype.createSocket = function(e, t) {
  var r = this, s = {};
  r.sockets.push(s);
  var o = Ac({}, r.proxyOptions, {
    method: "CONNECT",
    path: e.host + ":" + e.port,
    agent: !1,
    headers: {
      host: e.host + ":" + e.port
    }
  });
  e.localAddress && (o.localAddress = e.localAddress), o.proxyAuth && (o.headers = o.headers || {}, o.headers["Proxy-Authorization"] = "Basic " + new Buffer(o.proxyAuth).toString("base64")), Ht("making CONNECT request");
  var i = r.request(o);
  i.useChunkedEncodingByDefault = !1, i.once("response", c), i.once("upgrade", g), i.once("connect", u), i.once("error", l), i.end();
  function c(h) {
    h.upgrade = !0;
  }
  function g(h, E, f) {
    process.nextTick(function() {
      u(h, E, f);
    });
  }
  function u(h, E, f) {
    if (i.removeAllListeners(), E.removeAllListeners(), h.statusCode !== 200) {
      Ht(
        "tunneling socket could not be established, statusCode=%d",
        h.statusCode
      ), E.destroy();
      var I = new Error("tunneling socket could not be established, statusCode=" + h.statusCode);
      I.code = "ECONNRESET", e.request.emit("error", I), r.removeSocket(s);
      return;
    }
    if (f.length > 0) {
      Ht("got illegal response body from proxy"), E.destroy();
      var I = new Error("got illegal response body from proxy");
      I.code = "ECONNRESET", e.request.emit("error", I), r.removeSocket(s);
      return;
    }
    return Ht("tunneling connection has established"), r.sockets[r.sockets.indexOf(s)] = E, t(E);
  }
  function l(h) {
    i.removeAllListeners(), Ht(
      `tunneling socket could not be established, cause=%s
`,
      h.message,
      h.stack
    );
    var E = new Error("tunneling socket could not be established, cause=" + h.message);
    E.code = "ECONNRESET", e.request.emit("error", E), r.removeSocket(s);
  }
};
Tt.prototype.removeSocket = function(e) {
  var t = this.sockets.indexOf(e);
  if (t !== -1) {
    this.sockets.splice(t, 1);
    var r = this.requests.shift();
    r && this.createSocket(r, function(s) {
      r.request.onSocket(s);
    });
  }
};
function AE(A, e) {
  var t = this;
  Tt.prototype.createSocket.call(t, A, function(r) {
    var s = A.request.getHeader("host"), o = Ac({}, t.options, {
      socket: r,
      servername: s ? s.replace(/:.*$/, "") : A.host
    }), i = nd.connect(0, o);
    t.sockets[t.sockets.indexOf(r)] = i, e(i);
  });
}
function tE(A, e, t) {
  return typeof A == "string" ? {
    host: A,
    port: e,
    localAddress: t
  } : A;
}
function Ac(A) {
  for (var e = 1, t = arguments.length; e < t; ++e) {
    var r = arguments[e];
    if (typeof r == "object")
      for (var s = Object.keys(r), o = 0, i = s.length; o < i; ++o) {
        var c = s[o];
        r[c] !== void 0 && (A[c] = r[c]);
      }
  }
  return A;
}
var Ht;
process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG) ? Ht = function() {
  var A = Array.prototype.slice.call(arguments);
  typeof A[0] == "string" ? A[0] = "TUNNEL: " + A[0] : A.unshift("TUNNEL:"), console.error.apply(console, A);
} : Ht = function() {
};
ts.debug = Ht;
var ud = ts, Ie = {}, He = {
  kClose: Symbol("close"),
  kDestroy: Symbol("destroy"),
  kDispatch: Symbol("dispatch"),
  kUrl: Symbol("url"),
  kWriting: Symbol("writing"),
  kResuming: Symbol("resuming"),
  kQueue: Symbol("queue"),
  kConnect: Symbol("connect"),
  kConnecting: Symbol("connecting"),
  kHeadersList: Symbol("headers list"),
  kKeepAliveDefaultTimeout: Symbol("default keep alive timeout"),
  kKeepAliveMaxTimeout: Symbol("max keep alive timeout"),
  kKeepAliveTimeoutThreshold: Symbol("keep alive timeout threshold"),
  kKeepAliveTimeoutValue: Symbol("keep alive timeout"),
  kKeepAlive: Symbol("keep alive"),
  kHeadersTimeout: Symbol("headers timeout"),
  kBodyTimeout: Symbol("body timeout"),
  kServerName: Symbol("server name"),
  kLocalAddress: Symbol("local address"),
  kHost: Symbol("host"),
  kNoRef: Symbol("no ref"),
  kBodyUsed: Symbol("used"),
  kRunning: Symbol("running"),
  kBlocking: Symbol("blocking"),
  kPending: Symbol("pending"),
  kSize: Symbol("size"),
  kBusy: Symbol("busy"),
  kQueued: Symbol("queued"),
  kFree: Symbol("free"),
  kConnected: Symbol("connected"),
  kClosed: Symbol("closed"),
  kNeedDrain: Symbol("need drain"),
  kReset: Symbol("reset"),
  kDestroyed: Symbol.for("nodejs.stream.destroyed"),
  kMaxHeadersSize: Symbol("max headers size"),
  kRunningIdx: Symbol("running index"),
  kPendingIdx: Symbol("pending index"),
  kError: Symbol("error"),
  kClients: Symbol("clients"),
  kClient: Symbol("client"),
  kParser: Symbol("parser"),
  kOnDestroyed: Symbol("destroy callbacks"),
  kPipelining: Symbol("pipelining"),
  kSocket: Symbol("socket"),
  kHostHeader: Symbol("host header"),
  kConnector: Symbol("connector"),
  kStrictContentLength: Symbol("strict content length"),
  kMaxRedirections: Symbol("maxRedirections"),
  kMaxRequests: Symbol("maxRequestsPerClient"),
  kProxy: Symbol("proxy agent options"),
  kCounter: Symbol("socket request counter"),
  kInterceptors: Symbol("dispatch interceptors"),
  kMaxResponseSize: Symbol("max response size"),
  kHTTP2Session: Symbol("http2Session"),
  kHTTP2SessionState: Symbol("http2Session state"),
  kHTTP2BuildRequest: Symbol("http2 build request"),
  kHTTP1BuildRequest: Symbol("http1 build request"),
  kHTTP2CopyHeaders: Symbol("http2 copy headers"),
  kHTTPConnVersion: Symbol("http connection version"),
  kRetryHandlerDefaultRetry: Symbol("retry agent default retry"),
  kConstruct: Symbol("constructable")
};
let cA = class extends Error {
  constructor(e) {
    super(e), this.name = "UndiciError", this.code = "UND_ERR";
  }
}, Ed = class rE extends cA {
  constructor(e) {
    super(e), Error.captureStackTrace(this, rE), this.name = "ConnectTimeoutError", this.message = e || "Connect Timeout Error", this.code = "UND_ERR_CONNECT_TIMEOUT";
  }
}, hd = class sE extends cA {
  constructor(e) {
    super(e), Error.captureStackTrace(this, sE), this.name = "HeadersTimeoutError", this.message = e || "Headers Timeout Error", this.code = "UND_ERR_HEADERS_TIMEOUT";
  }
}, Qd = class nE extends cA {
  constructor(e) {
    super(e), Error.captureStackTrace(this, nE), this.name = "HeadersOverflowError", this.message = e || "Headers Overflow Error", this.code = "UND_ERR_HEADERS_OVERFLOW";
  }
}, Cd = class oE extends cA {
  constructor(e) {
    super(e), Error.captureStackTrace(this, oE), this.name = "BodyTimeoutError", this.message = e || "Body Timeout Error", this.code = "UND_ERR_BODY_TIMEOUT";
  }
}, dd = class iE extends cA {
  constructor(e, t, r, s) {
    super(e), Error.captureStackTrace(this, iE), this.name = "ResponseStatusCodeError", this.message = e || "Response Status Code Error", this.code = "UND_ERR_RESPONSE_STATUS_CODE", this.body = s, this.status = t, this.statusCode = t, this.headers = r;
  }
}, Bd = class aE extends cA {
  constructor(e) {
    super(e), Error.captureStackTrace(this, aE), this.name = "InvalidArgumentError", this.message = e || "Invalid Argument Error", this.code = "UND_ERR_INVALID_ARG";
  }
}, Id = class cE extends cA {
  constructor(e) {
    super(e), Error.captureStackTrace(this, cE), this.name = "InvalidReturnValueError", this.message = e || "Invalid Return Value Error", this.code = "UND_ERR_INVALID_RETURN_VALUE";
  }
}, fd = class gE extends cA {
  constructor(e) {
    super(e), Error.captureStackTrace(this, gE), this.name = "AbortError", this.message = e || "Request aborted", this.code = "UND_ERR_ABORTED";
  }
}, pd = class lE extends cA {
  constructor(e) {
    super(e), Error.captureStackTrace(this, lE), this.name = "InformationalError", this.message = e || "Request information", this.code = "UND_ERR_INFO";
  }
}, md = class uE extends cA {
  constructor(e) {
    super(e), Error.captureStackTrace(this, uE), this.name = "RequestContentLengthMismatchError", this.message = e || "Request body length does not match content-length header", this.code = "UND_ERR_REQ_CONTENT_LENGTH_MISMATCH";
  }
}, yd = class EE extends cA {
  constructor(e) {
    super(e), Error.captureStackTrace(this, EE), this.name = "ResponseContentLengthMismatchError", this.message = e || "Response body length does not match content-length header", this.code = "UND_ERR_RES_CONTENT_LENGTH_MISMATCH";
  }
}, wd = class hE extends cA {
  constructor(e) {
    super(e), Error.captureStackTrace(this, hE), this.name = "ClientDestroyedError", this.message = e || "The client is destroyed", this.code = "UND_ERR_DESTROYED";
  }
}, bd = class QE extends cA {
  constructor(e) {
    super(e), Error.captureStackTrace(this, QE), this.name = "ClientClosedError", this.message = e || "The client is closed", this.code = "UND_ERR_CLOSED";
  }
}, Rd = class CE extends cA {
  constructor(e, t) {
    super(e), Error.captureStackTrace(this, CE), this.name = "SocketError", this.message = e || "Socket error", this.code = "UND_ERR_SOCKET", this.socket = t;
  }
}, dE = class BE extends cA {
  constructor(e) {
    super(e), Error.captureStackTrace(this, BE), this.name = "NotSupportedError", this.message = e || "Not supported error", this.code = "UND_ERR_NOT_SUPPORTED";
  }
}, Dd = class extends cA {
  constructor(e) {
    super(e), Error.captureStackTrace(this, dE), this.name = "MissingUpstreamError", this.message = e || "No upstream has been added to the BalancedPool", this.code = "UND_ERR_BPL_MISSING_UPSTREAM";
  }
}, Sd = class IE extends Error {
  constructor(e, t, r) {
    super(e), Error.captureStackTrace(this, IE), this.name = "HTTPParserError", this.code = t ? `HPE_${t}` : void 0, this.data = r ? r.toString() : void 0;
  }
}, kd = class fE extends cA {
  constructor(e) {
    super(e), Error.captureStackTrace(this, fE), this.name = "ResponseExceededMaxSizeError", this.message = e || "Response content exceeded max size", this.code = "UND_ERR_RES_EXCEEDED_MAX_SIZE";
  }
}, Fd = class pE extends cA {
  constructor(e, t, { headers: r, data: s }) {
    super(e), Error.captureStackTrace(this, pE), this.name = "RequestRetryError", this.message = e || "Request retry error", this.code = "UND_ERR_REQ_RETRY", this.statusCode = t, this.data = s, this.headers = r;
  }
};
var Me = {
  HTTPParserError: Sd,
  UndiciError: cA,
  HeadersTimeoutError: hd,
  HeadersOverflowError: Qd,
  BodyTimeoutError: Cd,
  RequestContentLengthMismatchError: md,
  ConnectTimeoutError: Ed,
  ResponseStatusCodeError: dd,
  InvalidArgumentError: Bd,
  InvalidReturnValueError: Id,
  RequestAbortedError: fd,
  ClientDestroyedError: wd,
  ClientClosedError: bd,
  InformationalError: pd,
  SocketError: Rd,
  NotSupportedError: dE,
  ResponseContentLengthMismatchError: yd,
  BalancedPoolMissingUpstreamError: Dd,
  ResponseExceededMaxSizeError: kd,
  RequestRetryError: Fd
};
const io = {}, Na = [
  "Accept",
  "Accept-Encoding",
  "Accept-Language",
  "Accept-Ranges",
  "Access-Control-Allow-Credentials",
  "Access-Control-Allow-Headers",
  "Access-Control-Allow-Methods",
  "Access-Control-Allow-Origin",
  "Access-Control-Expose-Headers",
  "Access-Control-Max-Age",
  "Access-Control-Request-Headers",
  "Access-Control-Request-Method",
  "Age",
  "Allow",
  "Alt-Svc",
  "Alt-Used",
  "Authorization",
  "Cache-Control",
  "Clear-Site-Data",
  "Connection",
  "Content-Disposition",
  "Content-Encoding",
  "Content-Language",
  "Content-Length",
  "Content-Location",
  "Content-Range",
  "Content-Security-Policy",
  "Content-Security-Policy-Report-Only",
  "Content-Type",
  "Cookie",
  "Cross-Origin-Embedder-Policy",
  "Cross-Origin-Opener-Policy",
  "Cross-Origin-Resource-Policy",
  "Date",
  "Device-Memory",
  "Downlink",
  "ECT",
  "ETag",
  "Expect",
  "Expect-CT",
  "Expires",
  "Forwarded",
  "From",
  "Host",
  "If-Match",
  "If-Modified-Since",
  "If-None-Match",
  "If-Range",
  "If-Unmodified-Since",
  "Keep-Alive",
  "Last-Modified",
  "Link",
  "Location",
  "Max-Forwards",
  "Origin",
  "Permissions-Policy",
  "Pragma",
  "Proxy-Authenticate",
  "Proxy-Authorization",
  "RTT",
  "Range",
  "Referer",
  "Referrer-Policy",
  "Refresh",
  "Retry-After",
  "Sec-WebSocket-Accept",
  "Sec-WebSocket-Extensions",
  "Sec-WebSocket-Key",
  "Sec-WebSocket-Protocol",
  "Sec-WebSocket-Version",
  "Server",
  "Server-Timing",
  "Service-Worker-Allowed",
  "Service-Worker-Navigation-Preload",
  "Set-Cookie",
  "SourceMap",
  "Strict-Transport-Security",
  "Supports-Loading-Mode",
  "TE",
  "Timing-Allow-Origin",
  "Trailer",
  "Transfer-Encoding",
  "Upgrade",
  "Upgrade-Insecure-Requests",
  "User-Agent",
  "Vary",
  "Via",
  "WWW-Authenticate",
  "X-Content-Type-Options",
  "X-DNS-Prefetch-Control",
  "X-Frame-Options",
  "X-Permitted-Cross-Domain-Policies",
  "X-Powered-By",
  "X-Requested-With",
  "X-XSS-Protection"
];
for (let A = 0; A < Na.length; ++A) {
  const e = Na[A], t = e.toLowerCase();
  io[e] = io[t] = t;
}
Object.setPrototypeOf(io, null);
var Td = {
  wellknownHeaderNames: Na,
  headerNameLowerCasedRecord: io
};
const mE = G, { kDestroyed: yE, kBodyUsed: gg } = He, { IncomingMessage: Nd } = G, $r = G, Ud = G, { InvalidArgumentError: hA } = Me, { Blob: lg } = G, ao = G, { stringify: Ld } = G, { headerNameLowerCasedRecord: _d } = Td, [Xo, ug] = process.versions.node.split(".").map((A) => Number(A));
function vd() {
}
function tc(A) {
  return A && typeof A == "object" && typeof A.pipe == "function" && typeof A.on == "function";
}
function wE(A) {
  return lg && A instanceof lg || A && typeof A == "object" && (typeof A.stream == "function" || typeof A.arrayBuffer == "function") && /^(Blob|File)$/.test(A[Symbol.toStringTag]);
}
function Gd(A, e) {
  if (A.includes("?") || A.includes("#"))
    throw new Error('Query params cannot be passed when url already contains "?" or "#".');
  const t = Ld(e);
  return t && (A += "?" + t), A;
}
function bE(A) {
  if (typeof A == "string") {
    if (A = new URL(A), !/^https?:/.test(A.origin || A.protocol))
      throw new hA("Invalid URL protocol: the URL must start with `http:` or `https:`.");
    return A;
  }
  if (!A || typeof A != "object")
    throw new hA("Invalid URL: The URL argument must be a non-null object.");
  if (!/^https?:/.test(A.origin || A.protocol))
    throw new hA("Invalid URL protocol: the URL must start with `http:` or `https:`.");
  if (!(A instanceof URL)) {
    if (A.port != null && A.port !== "" && !Number.isFinite(parseInt(A.port)))
      throw new hA("Invalid URL: port must be a valid integer or a string representation of an integer.");
    if (A.path != null && typeof A.path != "string")
      throw new hA("Invalid URL path: the path must be a string or null/undefined.");
    if (A.pathname != null && typeof A.pathname != "string")
      throw new hA("Invalid URL pathname: the pathname must be a string or null/undefined.");
    if (A.hostname != null && typeof A.hostname != "string")
      throw new hA("Invalid URL hostname: the hostname must be a string or null/undefined.");
    if (A.origin != null && typeof A.origin != "string")
      throw new hA("Invalid URL origin: the origin must be a string or null/undefined.");
    const e = A.port != null ? A.port : A.protocol === "https:" ? 443 : 80;
    let t = A.origin != null ? A.origin : `${A.protocol}//${A.hostname}:${e}`, r = A.path != null ? A.path : `${A.pathname || ""}${A.search || ""}`;
    t.endsWith("/") && (t = t.substring(0, t.length - 1)), r && !r.startsWith("/") && (r = `/${r}`), A = new URL(t + r);
  }
  return A;
}
function Md(A) {
  if (A = bE(A), A.pathname !== "/" || A.search || A.hash)
    throw new hA("invalid url");
  return A;
}
function Yd(A) {
  if (A[0] === "[") {
    const t = A.indexOf("]");
    return mE(t !== -1), A.substring(1, t);
  }
  const e = A.indexOf(":");
  return e === -1 ? A : A.substring(0, e);
}
function Pd(A) {
  if (!A)
    return null;
  mE.strictEqual(typeof A, "string");
  const e = Yd(A);
  return Ud.isIP(e) ? "" : e;
}
function Jd(A) {
  return JSON.parse(JSON.stringify(A));
}
function Od(A) {
  return A != null && typeof A[Symbol.asyncIterator] == "function";
}
function Hd(A) {
  return A != null && (typeof A[Symbol.iterator] == "function" || typeof A[Symbol.asyncIterator] == "function");
}
function Vd(A) {
  if (A == null)
    return 0;
  if (tc(A)) {
    const e = A._readableState;
    return e && e.objectMode === !1 && e.ended === !0 && Number.isFinite(e.length) ? e.length : null;
  } else {
    if (wE(A))
      return A.size != null ? A.size : null;
    if (DE(A))
      return A.byteLength;
  }
  return null;
}
function rc(A) {
  return !A || !!(A.destroyed || A[yE]);
}
function RE(A) {
  const e = A && A._readableState;
  return rc(A) && e && !e.endEmitted;
}
function Wd(A, e) {
  A == null || !tc(A) || rc(A) || (typeof A.destroy == "function" ? (Object.getPrototypeOf(A).constructor === Nd && (A.socket = null), A.destroy(e)) : e && process.nextTick((t, r) => {
    t.emit("error", r);
  }, A, e), A.destroyed !== !0 && (A[yE] = !0));
}
const qd = /timeout=(\d+)/;
function xd(A) {
  const e = A.toString().match(qd);
  return e ? parseInt(e[1], 10) * 1e3 : null;
}
function jd(A) {
  return _d[A] || A.toLowerCase();
}
function zd(A, e = {}) {
  if (!Array.isArray(A)) return A;
  for (let t = 0; t < A.length; t += 2) {
    const r = A[t].toString().toLowerCase();
    let s = e[r];
    s ? (Array.isArray(s) || (s = [s], e[r] = s), s.push(A[t + 1].toString("utf8"))) : Array.isArray(A[t + 1]) ? e[r] = A[t + 1].map((o) => o.toString("utf8")) : e[r] = A[t + 1].toString("utf8");
  }
  return "content-length" in e && "content-disposition" in e && (e["content-disposition"] = Buffer.from(e["content-disposition"]).toString("latin1")), e;
}
function Zd(A) {
  const e = [];
  let t = !1, r = -1;
  for (let s = 0; s < A.length; s += 2) {
    const o = A[s + 0].toString(), i = A[s + 1].toString("utf8");
    o.length === 14 && (o === "content-length" || o.toLowerCase() === "content-length") ? (e.push(o, i), t = !0) : o.length === 19 && (o === "content-disposition" || o.toLowerCase() === "content-disposition") ? r = e.push(o, i) - 1 : e.push(o, i);
  }
  return t && r !== -1 && (e[r] = Buffer.from(e[r]).toString("latin1")), e;
}
function DE(A) {
  return A instanceof Uint8Array || Buffer.isBuffer(A);
}
function $d(A, e, t) {
  if (!A || typeof A != "object")
    throw new hA("handler must be an object");
  if (typeof A.onConnect != "function")
    throw new hA("invalid onConnect method");
  if (typeof A.onError != "function")
    throw new hA("invalid onError method");
  if (typeof A.onBodySent != "function" && A.onBodySent !== void 0)
    throw new hA("invalid onBodySent method");
  if (t || e === "CONNECT") {
    if (typeof A.onUpgrade != "function")
      throw new hA("invalid onUpgrade method");
  } else {
    if (typeof A.onHeaders != "function")
      throw new hA("invalid onHeaders method");
    if (typeof A.onData != "function")
      throw new hA("invalid onData method");
    if (typeof A.onComplete != "function")
      throw new hA("invalid onComplete method");
  }
}
function Xd(A) {
  return !!(A && ($r.isDisturbed ? $r.isDisturbed(A) || A[gg] : A[gg] || A.readableDidRead || A._readableState && A._readableState.dataEmitted || RE(A)));
}
function Kd(A) {
  return !!(A && ($r.isErrored ? $r.isErrored(A) : /state: 'errored'/.test(
    ao.inspect(A)
  )));
}
function eB(A) {
  return !!(A && ($r.isReadable ? $r.isReadable(A) : /state: 'readable'/.test(
    ao.inspect(A)
  )));
}
function AB(A) {
  return {
    localAddress: A.localAddress,
    localPort: A.localPort,
    remoteAddress: A.remoteAddress,
    remotePort: A.remotePort,
    remoteFamily: A.remoteFamily,
    timeout: A.timeout,
    bytesWritten: A.bytesWritten,
    bytesRead: A.bytesRead
  };
}
async function* tB(A) {
  for await (const e of A)
    yield Buffer.isBuffer(e) ? e : Buffer.from(e);
}
let ys;
function rB(A) {
  if (ys || (ys = G.ReadableStream), ys.from)
    return ys.from(tB(A));
  let e;
  return new ys(
    {
      async start() {
        e = A[Symbol.asyncIterator]();
      },
      async pull(t) {
        const { done: r, value: s } = await e.next();
        if (r)
          queueMicrotask(() => {
            t.close();
          });
        else {
          const o = Buffer.isBuffer(s) ? s : Buffer.from(s);
          t.enqueue(new Uint8Array(o));
        }
        return t.desiredSize > 0;
      },
      async cancel(t) {
        await e.return();
      }
    },
    0
  );
}
function sB(A) {
  return A && typeof A == "object" && typeof A.append == "function" && typeof A.delete == "function" && typeof A.get == "function" && typeof A.getAll == "function" && typeof A.has == "function" && typeof A.set == "function" && A[Symbol.toStringTag] === "FormData";
}
function nB(A) {
  if (A) {
    if (typeof A.throwIfAborted == "function")
      A.throwIfAborted();
    else if (A.aborted) {
      const e = new Error("The operation was aborted");
      throw e.name = "AbortError", e;
    }
  }
}
function oB(A, e) {
  return "addEventListener" in A ? (A.addEventListener("abort", e, { once: !0 }), () => A.removeEventListener("abort", e)) : (A.addListener("abort", e), () => A.removeListener("abort", e));
}
const iB = !!String.prototype.toWellFormed;
function aB(A) {
  return iB ? `${A}`.toWellFormed() : ao.toUSVString ? ao.toUSVString(A) : `${A}`;
}
function cB(A) {
  if (A == null || A === "") return { start: 0, end: null, size: null };
  const e = A ? A.match(/^bytes (\d+)-(\d+)\/(\d+)?$/) : null;
  return e ? {
    start: parseInt(e[1]),
    end: e[2] ? parseInt(e[2]) : null,
    size: e[3] ? parseInt(e[3]) : null
  } : null;
}
const SE = /* @__PURE__ */ Object.create(null);
SE.enumerable = !0;
var ke = {
  kEnumerableProperty: SE,
  nop: vd,
  isDisturbed: Xd,
  isErrored: Kd,
  isReadable: eB,
  toUSVString: aB,
  isReadableAborted: RE,
  isBlobLike: wE,
  parseOrigin: Md,
  parseURL: bE,
  getServerName: Pd,
  isStream: tc,
  isIterable: Hd,
  isAsyncIterable: Od,
  isDestroyed: rc,
  headerNameToString: jd,
  parseRawHeaders: Zd,
  parseHeaders: zd,
  parseKeepAliveTimeout: xd,
  destroy: Wd,
  bodyLength: Vd,
  deepClone: Jd,
  ReadableStreamFrom: rB,
  isBuffer: DE,
  validateHandler: $d,
  getSocketInfo: AB,
  isFormDataLike: sB,
  buildURL: Gd,
  throwIfAborted: nB,
  addAbortListener: oB,
  parseRangeHeader: cB,
  nodeMajor: Xo,
  nodeMinor: ug,
  nodeHasAutoSelectFamily: Xo > 18 || Xo === 18 && ug >= 13,
  safeHTTPMethods: ["GET", "HEAD", "OPTIONS", "TRACE"]
};
let Ko = Date.now(), Pt;
const Jt = [];
function gB() {
  Ko = Date.now();
  let A = Jt.length, e = 0;
  for (; e < A; ) {
    const t = Jt[e];
    t.state === 0 ? t.state = Ko + t.delay : t.state > 0 && Ko >= t.state && (t.state = -1, t.callback(t.opaque)), t.state === -1 ? (t.state = -2, e !== A - 1 ? Jt[e] = Jt.pop() : Jt.pop(), A -= 1) : e += 1;
  }
  Jt.length > 0 && kE();
}
function kE() {
  Pt && Pt.refresh ? Pt.refresh() : (clearTimeout(Pt), Pt = setTimeout(gB, 1e3), Pt.unref && Pt.unref());
}
class Eg {
  constructor(e, t, r) {
    this.callback = e, this.delay = t, this.opaque = r, this.state = -2, this.refresh();
  }
  refresh() {
    this.state === -2 && (Jt.push(this), (!Pt || Jt.length === 1) && kE()), this.state = 0;
  }
  clear() {
    this.state = -1;
  }
}
var lB = {
  setTimeout(A, e, t) {
    return e < 1e3 ? setTimeout(A, e, t) : new Eg(A, e, t);
  },
  clearTimeout(A) {
    A instanceof Eg ? A.clear() : clearTimeout(A);
  }
}, vr = { exports: {} }, ei, hg;
function FE() {
  if (hg) return ei;
  hg = 1;
  const A = ju.EventEmitter, e = As.inherits;
  function t(r) {
    if (typeof r == "string" && (r = Buffer.from(r)), !Buffer.isBuffer(r))
      throw new TypeError("The needle has to be a String or a Buffer.");
    const s = r.length;
    if (s === 0)
      throw new Error("The needle cannot be an empty String/Buffer.");
    if (s > 256)
      throw new Error("The needle cannot have a length bigger than 256.");
    this.maxMatches = 1 / 0, this.matches = 0, this._occ = new Array(256).fill(s), this._lookbehind_size = 0, this._needle = r, this._bufpos = 0, this._lookbehind = Buffer.alloc(s);
    for (var o = 0; o < s - 1; ++o)
      this._occ[r[o]] = s - 1 - o;
  }
  return e(t, A), t.prototype.reset = function() {
    this._lookbehind_size = 0, this.matches = 0, this._bufpos = 0;
  }, t.prototype.push = function(r, s) {
    Buffer.isBuffer(r) || (r = Buffer.from(r, "binary"));
    const o = r.length;
    this._bufpos = s || 0;
    let i;
    for (; i !== o && this.matches < this.maxMatches; )
      i = this._sbmh_feed(r);
    return i;
  }, t.prototype._sbmh_feed = function(r) {
    const s = r.length, o = this._needle, i = o.length, c = o[i - 1];
    let g = -this._lookbehind_size, u;
    if (g < 0) {
      for (; g < 0 && g <= s - i; ) {
        if (u = this._sbmh_lookup_char(r, g + i - 1), u === c && this._sbmh_memcmp(r, g, i - 1))
          return this._lookbehind_size = 0, ++this.matches, this.emit("info", !0), this._bufpos = g + i;
        g += this._occ[u];
      }
      if (g < 0)
        for (; g < 0 && !this._sbmh_memcmp(r, g, s - g); )
          ++g;
      if (g >= 0)
        this.emit("info", !1, this._lookbehind, 0, this._lookbehind_size), this._lookbehind_size = 0;
      else {
        const l = this._lookbehind_size + g;
        return l > 0 && this.emit("info", !1, this._lookbehind, 0, l), this._lookbehind.copy(
          this._lookbehind,
          0,
          l,
          this._lookbehind_size - l
        ), this._lookbehind_size -= l, r.copy(this._lookbehind, this._lookbehind_size), this._lookbehind_size += s, this._bufpos = s, s;
      }
    }
    if (g += (g >= 0) * this._bufpos, r.indexOf(o, g) !== -1)
      return g = r.indexOf(o, g), ++this.matches, g > 0 ? this.emit("info", !0, r, this._bufpos, g) : this.emit("info", !0), this._bufpos = g + i;
    for (g = s - i; g < s && (r[g] !== o[0] || Buffer.compare(
      r.subarray(g, g + s - g),
      o.subarray(0, s - g)
    ) !== 0); )
      ++g;
    return g < s && (r.copy(this._lookbehind, 0, g, g + (s - g)), this._lookbehind_size = s - g), g > 0 && this.emit("info", !1, r, this._bufpos, g < s ? g : s), this._bufpos = s, s;
  }, t.prototype._sbmh_lookup_char = function(r, s) {
    return s < 0 ? this._lookbehind[this._lookbehind_size + s] : r[s];
  }, t.prototype._sbmh_memcmp = function(r, s, o) {
    for (var i = 0; i < o; ++i)
      if (this._sbmh_lookup_char(r, s + i) !== this._needle[i])
        return !1;
    return !0;
  }, ei = t, ei;
}
var Ai, Qg;
function uB() {
  if (Qg) return Ai;
  Qg = 1;
  const A = As.inherits, e = UA.Readable;
  function t(r) {
    e.call(this, r);
  }
  return A(t, e), t.prototype._read = function(r) {
  }, Ai = t, Ai;
}
var ti, Cg;
function sc() {
  return Cg || (Cg = 1, ti = function(e, t, r) {
    if (!e || e[t] === void 0 || e[t] === null)
      return r;
    if (typeof e[t] != "number" || isNaN(e[t]))
      throw new TypeError("Limit " + t + " is not a valid number");
    return e[t];
  }), ti;
}
var ri, dg;
function EB() {
  if (dg) return ri;
  dg = 1;
  const A = ju.EventEmitter, e = As.inherits, t = sc(), r = FE(), s = Buffer.from(`\r
\r
`), o = /\r\n/g, i = /^([^:]+):[ \t]?([\x00-\xFF]+)?$/;
  function c(g) {
    A.call(this), g = g || {};
    const u = this;
    this.nread = 0, this.maxed = !1, this.npairs = 0, this.maxHeaderPairs = t(g, "maxHeaderPairs", 2e3), this.maxHeaderSize = t(g, "maxHeaderSize", 80 * 1024), this.buffer = "", this.header = {}, this.finished = !1, this.ss = new r(s), this.ss.on("info", function(l, h, E, f) {
      h && !u.maxed && (u.nread + f - E >= u.maxHeaderSize ? (f = u.maxHeaderSize - u.nread + E, u.nread = u.maxHeaderSize, u.maxed = !0) : u.nread += f - E, u.buffer += h.toString("binary", E, f)), l && u._finish();
    });
  }
  return e(c, A), c.prototype.push = function(g) {
    const u = this.ss.push(g);
    if (this.finished)
      return u;
  }, c.prototype.reset = function() {
    this.finished = !1, this.buffer = "", this.header = {}, this.ss.reset();
  }, c.prototype._finish = function() {
    this.buffer && this._parseHeader(), this.ss.matches = this.ss.maxMatches;
    const g = this.header;
    this.header = {}, this.buffer = "", this.finished = !0, this.nread = this.npairs = 0, this.maxed = !1, this.emit("header", g);
  }, c.prototype._parseHeader = function() {
    if (this.npairs === this.maxHeaderPairs)
      return;
    const g = this.buffer.split(o), u = g.length;
    let l, h;
    for (var E = 0; E < u; ++E) {
      if (g[E].length === 0)
        continue;
      if ((g[E][0] === "	" || g[E][0] === " ") && h) {
        this.header[h][this.header[h].length - 1] += g[E];
        continue;
      }
      const f = g[E].indexOf(":");
      if (f === -1 || f === 0)
        return;
      if (l = i.exec(g[E]), h = l[1].toLowerCase(), this.header[h] = this.header[h] || [], this.header[h].push(l[2] || ""), ++this.npairs === this.maxHeaderPairs)
        break;
    }
  }, ri = c, ri;
}
var si, Bg;
function TE() {
  if (Bg) return si;
  Bg = 1;
  const A = UA.Writable, e = As.inherits, t = FE(), r = uB(), s = EB(), o = 45, i = Buffer.from("-"), c = Buffer.from(`\r
`), g = function() {
  };
  function u(l) {
    if (!(this instanceof u))
      return new u(l);
    if (A.call(this, l), !l || !l.headerFirst && typeof l.boundary != "string")
      throw new TypeError("Boundary required");
    typeof l.boundary == "string" ? this.setBoundary(l.boundary) : this._bparser = void 0, this._headerFirst = l.headerFirst, this._dashes = 0, this._parts = 0, this._finished = !1, this._realFinish = !1, this._isPreamble = !0, this._justMatched = !1, this._firstWrite = !0, this._inHeader = !0, this._part = void 0, this._cb = void 0, this._ignoreData = !1, this._partOpts = { highWaterMark: l.partHwm }, this._pause = !1;
    const h = this;
    this._hparser = new s(l), this._hparser.on("header", function(E) {
      h._inHeader = !1, h._part.emit("header", E);
    });
  }
  return e(u, A), u.prototype.emit = function(l) {
    if (l === "finish" && !this._realFinish) {
      if (!this._finished) {
        const h = this;
        process.nextTick(function() {
          if (h.emit("error", new Error("Unexpected end of multipart data")), h._part && !h._ignoreData) {
            const E = h._isPreamble ? "Preamble" : "Part";
            h._part.emit("error", new Error(E + " terminated early due to unexpected end of multipart data")), h._part.push(null), process.nextTick(function() {
              h._realFinish = !0, h.emit("finish"), h._realFinish = !1;
            });
            return;
          }
          h._realFinish = !0, h.emit("finish"), h._realFinish = !1;
        });
      }
    } else
      A.prototype.emit.apply(this, arguments);
  }, u.prototype._write = function(l, h, E) {
    if (!this._hparser && !this._bparser)
      return E();
    if (this._headerFirst && this._isPreamble) {
      this._part || (this._part = new r(this._partOpts), this._events.preamble ? this.emit("preamble", this._part) : this._ignore());
      const f = this._hparser.push(l);
      if (!this._inHeader && f !== void 0 && f < l.length)
        l = l.slice(f);
      else
        return E();
    }
    this._firstWrite && (this._bparser.push(c), this._firstWrite = !1), this._bparser.push(l), this._pause ? this._cb = E : E();
  }, u.prototype.reset = function() {
    this._part = void 0, this._bparser = void 0, this._hparser = void 0;
  }, u.prototype.setBoundary = function(l) {
    const h = this;
    this._bparser = new t(`\r
--` + l), this._bparser.on("info", function(E, f, I, C) {
      h._oninfo(E, f, I, C);
    });
  }, u.prototype._ignore = function() {
    this._part && !this._ignoreData && (this._ignoreData = !0, this._part.on("error", g), this._part.resume());
  }, u.prototype._oninfo = function(l, h, E, f) {
    let I;
    const C = this;
    let B = 0, p, Q = !0;
    if (!this._part && this._justMatched && h) {
      for (; this._dashes < 2 && E + B < f; )
        if (h[E + B] === o)
          ++B, ++this._dashes;
        else {
          this._dashes && (I = i), this._dashes = 0;
          break;
        }
      if (this._dashes === 2 && (E + B < f && this._events.trailer && this.emit("trailer", h.slice(E + B, f)), this.reset(), this._finished = !0, C._parts === 0 && (C._realFinish = !0, C.emit("finish"), C._realFinish = !1)), this._dashes)
        return;
    }
    this._justMatched && (this._justMatched = !1), this._part || (this._part = new r(this._partOpts), this._part._read = function(m) {
      C._unpause();
    }, this._isPreamble && this._events.preamble ? this.emit("preamble", this._part) : this._isPreamble !== !0 && this._events.part ? this.emit("part", this._part) : this._ignore(), this._isPreamble || (this._inHeader = !0)), h && E < f && !this._ignoreData && (this._isPreamble || !this._inHeader ? (I && (Q = this._part.push(I)), Q = this._part.push(h.slice(E, f)), Q || (this._pause = !0)) : !this._isPreamble && this._inHeader && (I && this._hparser.push(I), p = this._hparser.push(h.slice(E, f)), !this._inHeader && p !== void 0 && p < f && this._oninfo(!1, h, E + p, f))), l && (this._hparser.reset(), this._isPreamble ? this._isPreamble = !1 : E !== f && (++this._parts, this._part.on("end", function() {
      --C._parts === 0 && (C._finished ? (C._realFinish = !0, C.emit("finish"), C._realFinish = !1) : C._unpause());
    })), this._part.push(null), this._part = void 0, this._ignoreData = !1, this._justMatched = !0, this._dashes = 0);
  }, u.prototype._unpause = function() {
    if (this._pause && (this._pause = !1, this._cb)) {
      const l = this._cb;
      this._cb = void 0, l();
    }
  }, si = u, si;
}
var ni, Ig;
function nc() {
  if (Ig) return ni;
  Ig = 1;
  const A = new TextDecoder("utf-8"), e = /* @__PURE__ */ new Map([
    ["utf-8", A],
    ["utf8", A]
  ]);
  function t(r, s, o) {
    if (r)
      if (e.has(o))
        try {
          return e.get(o).decode(Buffer.from(r, s));
        } catch {
        }
      else
        try {
          return e.set(o, new TextDecoder(o)), e.get(o).decode(Buffer.from(r, s));
        } catch {
        }
    return r;
  }
  return ni = t, ni;
}
var oi, fg;
function NE() {
  if (fg) return oi;
  fg = 1;
  const A = nc(), e = /%([a-fA-F0-9]{2})/g;
  function t(s, o) {
    return String.fromCharCode(parseInt(o, 16));
  }
  function r(s) {
    const o = [];
    let i = "key", c = "", g = !1, u = !1, l = 0, h = "";
    for (var E = 0, f = s.length; E < f; ++E) {
      const I = s[E];
      if (I === "\\" && g)
        if (u)
          u = !1;
        else {
          u = !0;
          continue;
        }
      else if (I === '"')
        if (u)
          u = !1;
        else {
          g ? (g = !1, i = "key") : g = !0;
          continue;
        }
      else if (u && g && (h += "\\"), u = !1, (i === "charset" || i === "lang") && I === "'") {
        i === "charset" ? (i = "lang", c = h.substring(1)) : i = "value", h = "";
        continue;
      } else if (i === "key" && (I === "*" || I === "=") && o.length) {
        I === "*" ? i = "charset" : i = "value", o[l] = [h, void 0], h = "";
        continue;
      } else if (!g && I === ";") {
        i = "key", c ? (h.length && (h = A(
          h.replace(e, t),
          "binary",
          c
        )), c = "") : h.length && (h = A(h, "binary", "utf8")), o[l] === void 0 ? o[l] = h : o[l][1] = h, h = "", ++l;
        continue;
      } else if (!g && (I === " " || I === "	"))
        continue;
      h += I;
    }
    return c && h.length ? h = A(
      h.replace(e, t),
      "binary",
      c
    ) : h && (h = A(h, "binary", "utf8")), o[l] === void 0 ? h && (o[l] = h) : o[l][1] = h, o;
  }
  return oi = r, oi;
}
var ii, pg;
function hB() {
  return pg || (pg = 1, ii = function(e) {
    if (typeof e != "string")
      return "";
    for (var t = e.length - 1; t >= 0; --t)
      switch (e.charCodeAt(t)) {
        case 47:
        case 92:
          return e = e.slice(t + 1), e === ".." || e === "." ? "" : e;
      }
    return e === ".." || e === "." ? "" : e;
  }), ii;
}
var ai, mg;
function QB() {
  if (mg) return ai;
  mg = 1;
  const { Readable: A } = UA, { inherits: e } = As, t = TE(), r = NE(), s = nc(), o = hB(), i = sc(), c = /^boundary$/i, g = /^form-data$/i, u = /^charset$/i, l = /^filename$/i, h = /^name$/i;
  E.detect = /^multipart\/form-data/i;
  function E(C, B) {
    let p, Q;
    const m = this;
    let w;
    const y = B.limits, b = B.isPartAFile || ((K, Ae, $) => Ae === "application/octet-stream" || $ !== void 0), S = B.parsedConType || [], D = B.defCharset || "utf8", N = B.preservePath, v = { highWaterMark: B.fileHwm };
    for (p = 0, Q = S.length; p < Q; ++p)
      if (Array.isArray(S[p]) && c.test(S[p][0])) {
        w = S[p][1];
        break;
      }
    function _() {
      oe === 0 && L && !C._done && (L = !1, m.end());
    }
    if (typeof w != "string")
      throw new Error("Multipart: Boundary not found");
    const U = i(y, "fieldSize", 1 * 1024 * 1024), z = i(y, "fileSize", 1 / 0), P = i(y, "files", 1 / 0), ee = i(y, "fields", 1 / 0), te = i(y, "parts", 1 / 0), ge = i(y, "headerPairs", 2e3), ne = i(y, "headerSize", 80 * 1024);
    let Qe = 0, W = 0, oe = 0, le, M, L = !1;
    this._needDrain = !1, this._pause = !1, this._cb = void 0, this._nparts = 0, this._boy = C;
    const q = {
      boundary: w,
      maxHeaderPairs: ge,
      maxHeaderSize: ne,
      partHwm: v.highWaterMark,
      highWaterMark: B.highWaterMark
    };
    this.parser = new t(q), this.parser.on("drain", function() {
      if (m._needDrain = !1, m._cb && !m._pause) {
        const K = m._cb;
        m._cb = void 0, K();
      }
    }).on("part", function K(Ae) {
      if (++m._nparts > te)
        return m.parser.removeListener("part", K), m.parser.on("part", f), C.hitPartsLimit = !0, C.emit("partsLimit"), f(Ae);
      if (M) {
        const $ = M;
        $.emit("end"), $.removeAllListeners("end");
      }
      Ae.on("header", function($) {
        let Z, J, he, we, fe, Ye, Ue = 0;
        if ($["content-type"] && (he = r($["content-type"][0]), he[0])) {
          for (Z = he[0].toLowerCase(), p = 0, Q = he.length; p < Q; ++p)
            if (u.test(he[p][0])) {
              we = he[p][1].toLowerCase();
              break;
            }
        }
        if (Z === void 0 && (Z = "text/plain"), we === void 0 && (we = D), $["content-disposition"]) {
          if (he = r($["content-disposition"][0]), !g.test(he[0]))
            return f(Ae);
          for (p = 0, Q = he.length; p < Q; ++p)
            h.test(he[p][0]) ? J = he[p][1] : l.test(he[p][0]) && (Ye = he[p][1], N || (Ye = o(Ye)));
        } else
          return f(Ae);
        $["content-transfer-encoding"] ? fe = $["content-transfer-encoding"][0].toLowerCase() : fe = "7bit";
        let Pe, Ve;
        if (b(J, Z, Ye)) {
          if (Qe === P)
            return C.hitFilesLimit || (C.hitFilesLimit = !0, C.emit("filesLimit")), f(Ae);
          if (++Qe, !C._events.file) {
            m.parser._ignore();
            return;
          }
          ++oe;
          const me = new I(v);
          le = me, me.on("end", function() {
            if (--oe, m._pause = !1, _(), m._cb && !m._needDrain) {
              const Be = m._cb;
              m._cb = void 0, Be();
            }
          }), me._read = function(Be) {
            if (m._pause && (m._pause = !1, m._cb && !m._needDrain)) {
              const Ne = m._cb;
              m._cb = void 0, Ne();
            }
          }, C.emit("file", J, me, Ye, fe, Z), Pe = function(Be) {
            if ((Ue += Be.length) > z) {
              const Ne = z - Ue + Be.length;
              Ne > 0 && me.push(Be.slice(0, Ne)), me.truncated = !0, me.bytesRead = z, Ae.removeAllListeners("data"), me.emit("limit");
              return;
            } else me.push(Be) || (m._pause = !0);
            me.bytesRead = Ue;
          }, Ve = function() {
            le = void 0, me.push(null);
          };
        } else {
          if (W === ee)
            return C.hitFieldsLimit || (C.hitFieldsLimit = !0, C.emit("fieldsLimit")), f(Ae);
          ++W, ++oe;
          let me = "", Be = !1;
          M = Ae, Pe = function(Ne) {
            if ((Ue += Ne.length) > U) {
              const rA = U - (Ue - Ne.length);
              me += Ne.toString("binary", 0, rA), Be = !0, Ae.removeAllListeners("data");
            } else
              me += Ne.toString("binary");
          }, Ve = function() {
            M = void 0, me.length && (me = s(me, "binary", we)), C.emit("field", J, me, !1, Be, fe, Z), --oe, _();
          };
        }
        Ae._readableState.sync = !1, Ae.on("data", Pe), Ae.on("end", Ve);
      }).on("error", function($) {
        le && le.emit("error", $);
      });
    }).on("error", function(K) {
      C.emit("error", K);
    }).on("finish", function() {
      L = !0, _();
    });
  }
  E.prototype.write = function(C, B) {
    const p = this.parser.write(C);
    p && !this._pause ? B() : (this._needDrain = !p, this._cb = B);
  }, E.prototype.end = function() {
    const C = this;
    C.parser.writable ? C.parser.end() : C._boy._done || process.nextTick(function() {
      C._boy._done = !0, C._boy.emit("finish");
    });
  };
  function f(C) {
    C.resume();
  }
  function I(C) {
    A.call(this, C), this.bytesRead = 0, this.truncated = !1;
  }
  return e(I, A), I.prototype._read = function(C) {
  }, ai = E, ai;
}
var ci, yg;
function CB() {
  if (yg) return ci;
  yg = 1;
  const A = /\+/g, e = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];
  function t() {
    this.buffer = void 0;
  }
  return t.prototype.write = function(r) {
    r = r.replace(A, " ");
    let s = "", o = 0, i = 0;
    const c = r.length;
    for (; o < c; ++o)
      this.buffer !== void 0 ? e[r.charCodeAt(o)] ? (this.buffer += r[o], ++i, this.buffer.length === 2 && (s += String.fromCharCode(parseInt(this.buffer, 16)), this.buffer = void 0)) : (s += "%" + this.buffer, this.buffer = void 0, --o) : r[o] === "%" && (o > i && (s += r.substring(i, o), i = o), this.buffer = "", ++i);
    return i < c && this.buffer === void 0 && (s += r.substring(i)), s;
  }, t.prototype.reset = function() {
    this.buffer = void 0;
  }, ci = t, ci;
}
var gi, wg;
function dB() {
  if (wg) return gi;
  wg = 1;
  const A = CB(), e = nc(), t = sc(), r = /^charset$/i;
  s.detect = /^application\/x-www-form-urlencoded/i;
  function s(o, i) {
    const c = i.limits, g = i.parsedConType;
    this.boy = o, this.fieldSizeLimit = t(c, "fieldSize", 1 * 1024 * 1024), this.fieldNameSizeLimit = t(c, "fieldNameSize", 100), this.fieldsLimit = t(c, "fields", 1 / 0);
    let u;
    for (var l = 0, h = g.length; l < h; ++l)
      if (Array.isArray(g[l]) && r.test(g[l][0])) {
        u = g[l][1].toLowerCase();
        break;
      }
    u === void 0 && (u = i.defCharset || "utf8"), this.decoder = new A(), this.charset = u, this._fields = 0, this._state = "key", this._checkingBytes = !0, this._bytesKey = 0, this._bytesVal = 0, this._key = "", this._val = "", this._keyTrunc = !1, this._valTrunc = !1, this._hitLimit = !1;
  }
  return s.prototype.write = function(o, i) {
    if (this._fields === this.fieldsLimit)
      return this.boy.hitFieldsLimit || (this.boy.hitFieldsLimit = !0, this.boy.emit("fieldsLimit")), i();
    let c, g, u, l = 0;
    const h = o.length;
    for (; l < h; )
      if (this._state === "key") {
        for (c = g = void 0, u = l; u < h; ++u) {
          if (this._checkingBytes || ++l, o[u] === 61) {
            c = u;
            break;
          } else if (o[u] === 38) {
            g = u;
            break;
          }
          if (this._checkingBytes && this._bytesKey === this.fieldNameSizeLimit) {
            this._hitLimit = !0;
            break;
          } else this._checkingBytes && ++this._bytesKey;
        }
        if (c !== void 0)
          c > l && (this._key += this.decoder.write(o.toString("binary", l, c))), this._state = "val", this._hitLimit = !1, this._checkingBytes = !0, this._val = "", this._bytesVal = 0, this._valTrunc = !1, this.decoder.reset(), l = c + 1;
        else if (g !== void 0) {
          ++this._fields;
          let E;
          const f = this._keyTrunc;
          if (g > l ? E = this._key += this.decoder.write(o.toString("binary", l, g)) : E = this._key, this._hitLimit = !1, this._checkingBytes = !0, this._key = "", this._bytesKey = 0, this._keyTrunc = !1, this.decoder.reset(), E.length && this.boy.emit(
            "field",
            e(E, "binary", this.charset),
            "",
            f,
            !1
          ), l = g + 1, this._fields === this.fieldsLimit)
            return i();
        } else this._hitLimit ? (u > l && (this._key += this.decoder.write(o.toString("binary", l, u))), l = u, (this._bytesKey = this._key.length) === this.fieldNameSizeLimit && (this._checkingBytes = !1, this._keyTrunc = !0)) : (l < h && (this._key += this.decoder.write(o.toString("binary", l))), l = h);
      } else {
        for (g = void 0, u = l; u < h; ++u) {
          if (this._checkingBytes || ++l, o[u] === 38) {
            g = u;
            break;
          }
          if (this._checkingBytes && this._bytesVal === this.fieldSizeLimit) {
            this._hitLimit = !0;
            break;
          } else this._checkingBytes && ++this._bytesVal;
        }
        if (g !== void 0) {
          if (++this._fields, g > l && (this._val += this.decoder.write(o.toString("binary", l, g))), this.boy.emit(
            "field",
            e(this._key, "binary", this.charset),
            e(this._val, "binary", this.charset),
            this._keyTrunc,
            this._valTrunc
          ), this._state = "key", this._hitLimit = !1, this._checkingBytes = !0, this._key = "", this._bytesKey = 0, this._keyTrunc = !1, this.decoder.reset(), l = g + 1, this._fields === this.fieldsLimit)
            return i();
        } else this._hitLimit ? (u > l && (this._val += this.decoder.write(o.toString("binary", l, u))), l = u, (this._val === "" && this.fieldSizeLimit === 0 || (this._bytesVal = this._val.length) === this.fieldSizeLimit) && (this._checkingBytes = !1, this._valTrunc = !0)) : (l < h && (this._val += this.decoder.write(o.toString("binary", l))), l = h);
      }
    i();
  }, s.prototype.end = function() {
    this.boy._done || (this._state === "key" && this._key.length > 0 ? this.boy.emit(
      "field",
      e(this._key, "binary", this.charset),
      "",
      this._keyTrunc,
      !1
    ) : this._state === "val" && this.boy.emit(
      "field",
      e(this._key, "binary", this.charset),
      e(this._val, "binary", this.charset),
      this._keyTrunc,
      this._valTrunc
    ), this.boy._done = !0, this.boy.emit("finish"));
  }, gi = s, gi;
}
var bg;
function BB() {
  if (bg) return vr.exports;
  bg = 1;
  const A = UA.Writable, { inherits: e } = As, t = TE(), r = QB(), s = dB(), o = NE();
  function i(c) {
    if (!(this instanceof i))
      return new i(c);
    if (typeof c != "object")
      throw new TypeError("Busboy expected an options-Object.");
    if (typeof c.headers != "object")
      throw new TypeError("Busboy expected an options-Object with headers-attribute.");
    if (typeof c.headers["content-type"] != "string")
      throw new TypeError("Missing Content-Type-header.");
    const {
      headers: g,
      ...u
    } = c;
    this.opts = {
      autoDestroy: !1,
      ...u
    }, A.call(this, this.opts), this._done = !1, this._parser = this.getParserByHeaders(g), this._finished = !1;
  }
  return e(i, A), i.prototype.emit = function(c) {
    if (c === "finish") {
      if (this._done) {
        if (this._finished)
          return;
      } else {
        this._parser?.end();
        return;
      }
      this._finished = !0;
    }
    A.prototype.emit.apply(this, arguments);
  }, i.prototype.getParserByHeaders = function(c) {
    const g = o(c["content-type"]), u = {
      defCharset: this.opts.defCharset,
      fileHwm: this.opts.fileHwm,
      headers: c,
      highWaterMark: this.opts.highWaterMark,
      isPartAFile: this.opts.isPartAFile,
      limits: this.opts.limits,
      parsedConType: g,
      preservePath: this.opts.preservePath
    };
    if (r.detect.test(g[0]))
      return new r(this, u);
    if (s.detect.test(g[0]))
      return new s(this, u);
    throw new Error("Unsupported Content-Type.");
  }, i.prototype._write = function(c, g, u) {
    this._parser.write(c, u);
  }, vr.exports = i, vr.exports.default = i, vr.exports.Busboy = i, vr.exports.Dicer = t, vr.exports;
}
var li, Rg;
function fr() {
  if (Rg) return li;
  Rg = 1;
  const { MessageChannel: A, receiveMessageOnPort: e } = G, t = ["GET", "HEAD", "POST"], r = new Set(t), s = [101, 204, 205, 304], o = [301, 302, 303, 307, 308], i = new Set(o), c = [
    "1",
    "7",
    "9",
    "11",
    "13",
    "15",
    "17",
    "19",
    "20",
    "21",
    "22",
    "23",
    "25",
    "37",
    "42",
    "43",
    "53",
    "69",
    "77",
    "79",
    "87",
    "95",
    "101",
    "102",
    "103",
    "104",
    "109",
    "110",
    "111",
    "113",
    "115",
    "117",
    "119",
    "123",
    "135",
    "137",
    "139",
    "143",
    "161",
    "179",
    "389",
    "427",
    "465",
    "512",
    "513",
    "514",
    "515",
    "526",
    "530",
    "531",
    "532",
    "540",
    "548",
    "554",
    "556",
    "563",
    "587",
    "601",
    "636",
    "989",
    "990",
    "993",
    "995",
    "1719",
    "1720",
    "1723",
    "2049",
    "3659",
    "4045",
    "5060",
    "5061",
    "6000",
    "6566",
    "6665",
    "6666",
    "6667",
    "6668",
    "6669",
    "6697",
    "10080"
  ], g = new Set(c), u = [
    "",
    "no-referrer",
    "no-referrer-when-downgrade",
    "same-origin",
    "origin",
    "strict-origin",
    "origin-when-cross-origin",
    "strict-origin-when-cross-origin",
    "unsafe-url"
  ], l = new Set(u), h = ["follow", "manual", "error"], E = ["GET", "HEAD", "OPTIONS", "TRACE"], f = new Set(E), I = ["navigate", "same-origin", "no-cors", "cors"], C = ["omit", "same-origin", "include"], B = [
    "default",
    "no-store",
    "reload",
    "no-cache",
    "force-cache",
    "only-if-cached"
  ], p = [
    "content-encoding",
    "content-language",
    "content-location",
    "content-type",
    // See https://github.com/nodejs/undici/issues/2021
    // 'Content-Length' is a forbidden header name, which is typically
    // removed in the Headers implementation. However, undici doesn't
    // filter out headers, so we add it here.
    "content-length"
  ], Q = [
    "half"
  ], m = ["CONNECT", "TRACE", "TRACK"], w = new Set(m), y = [
    "audio",
    "audioworklet",
    "font",
    "image",
    "manifest",
    "paintworklet",
    "script",
    "style",
    "track",
    "video",
    "xslt",
    ""
  ], b = new Set(y), S = globalThis.DOMException ?? (() => {
    try {
      atob("~");
    } catch (v) {
      return Object.getPrototypeOf(v).constructor;
    }
  })();
  let D;
  const N = globalThis.structuredClone ?? // https://github.com/nodejs/node/blob/b27ae24dcc4251bad726d9d84baf678d1f707fed/lib/internal/structured_clone.js
  // structuredClone was added in v17.0.0, but fetch supports v16.8
  function(_, U = void 0) {
    if (arguments.length === 0)
      throw new TypeError("missing argument");
    return D || (D = new A()), D.port1.unref(), D.port2.unref(), D.port1.postMessage(_, U?.transfer), e(D.port2).message;
  };
  return li = {
    DOMException: S,
    structuredClone: N,
    subresource: y,
    forbiddenMethods: m,
    requestBodyHeader: p,
    referrerPolicy: u,
    requestRedirect: h,
    requestMode: I,
    requestCredentials: C,
    requestCache: B,
    redirectStatus: o,
    corsSafeListedMethods: t,
    nullBodyStatus: s,
    safeMethods: E,
    badPorts: c,
    requestDuplex: Q,
    subresourceSet: b,
    badPortsSet: g,
    redirectStatusSet: i,
    corsSafeListedMethodsSet: r,
    safeMethodsSet: f,
    forbiddenMethodsSet: w,
    referrerPolicySet: l
  }, li;
}
var ui, Dg;
function js() {
  if (Dg) return ui;
  Dg = 1;
  const A = Symbol.for("undici.globalOrigin.1");
  function e() {
    return globalThis[A];
  }
  function t(r) {
    if (r === void 0) {
      Object.defineProperty(globalThis, A, {
        value: void 0,
        writable: !0,
        enumerable: !1,
        configurable: !1
      });
      return;
    }
    const s = new URL(r);
    if (s.protocol !== "http:" && s.protocol !== "https:")
      throw new TypeError(`Only http & https urls are allowed, received ${s.protocol}`);
    Object.defineProperty(globalThis, A, {
      value: s,
      writable: !0,
      enumerable: !1,
      configurable: !1
    });
  }
  return ui = {
    getGlobalOrigin: e,
    setGlobalOrigin: t
  }, ui;
}
var Ei, Sg;
function ot() {
  if (Sg) return Ei;
  Sg = 1;
  const { redirectStatusSet: A, referrerPolicySet: e, badPortsSet: t } = fr(), { getGlobalOrigin: r } = js(), { performance: s } = G, { isBlobLike: o, toUSVString: i, ReadableStreamFrom: c } = ke, g = G, { isUint8Array: u } = G;
  let l = [], h;
  try {
    h = G;
    const F = ["sha256", "sha384", "sha512"];
    l = h.getHashes().filter((j) => F.includes(j));
  } catch {
  }
  function E(F) {
    const j = F.urlList, re = j.length;
    return re === 0 ? null : j[re - 1].toString();
  }
  function f(F, j) {
    if (!A.has(F.status))
      return null;
    let re = F.headersList.get("location");
    return re !== null && y(re) && (re = new URL(re, E(F))), re && !re.hash && (re.hash = j), re;
  }
  function I(F) {
    return F.urlList[F.urlList.length - 1];
  }
  function C(F) {
    const j = I(F);
    return VA(j) && t.has(j.port) ? "blocked" : "allowed";
  }
  function B(F) {
    return F instanceof Error || F?.constructor?.name === "Error" || F?.constructor?.name === "DOMException";
  }
  function p(F) {
    for (let j = 0; j < F.length; ++j) {
      const re = F.charCodeAt(j);
      if (!(re === 9 || // HTAB
      re >= 32 && re <= 126 || // SP / VCHAR
      re >= 128 && re <= 255))
        return !1;
    }
    return !0;
  }
  function Q(F) {
    switch (F) {
      case 34:
      case 40:
      case 41:
      case 44:
      case 47:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 91:
      case 92:
      case 93:
      case 123:
      case 125:
        return !1;
      default:
        return F >= 33 && F <= 126;
    }
  }
  function m(F) {
    if (F.length === 0)
      return !1;
    for (let j = 0; j < F.length; ++j)
      if (!Q(F.charCodeAt(j)))
        return !1;
    return !0;
  }
  function w(F) {
    return m(F);
  }
  function y(F) {
    return !(F.startsWith("	") || F.startsWith(" ") || F.endsWith("	") || F.endsWith(" ") || F.includes("\0") || F.includes("\r") || F.includes(`
`));
  }
  function b(F, j) {
    const { headersList: re } = j, Ce = (re.get("referrer-policy") ?? "").split(",");
    let Re = "";
    if (Ce.length > 0)
      for (let We = Ce.length; We !== 0; We--) {
        const sA = Ce[We - 1].trim();
        if (e.has(sA)) {
          Re = sA;
          break;
        }
      }
    Re !== "" && (F.referrerPolicy = Re);
  }
  function S() {
    return "allowed";
  }
  function D() {
    return "success";
  }
  function N() {
    return "success";
  }
  function v(F) {
    let j = null;
    j = F.mode, F.headersList.set("sec-fetch-mode", j);
  }
  function _(F) {
    let j = F.origin;
    if (F.responseTainting === "cors" || F.mode === "websocket")
      j && F.headersList.append("origin", j);
    else if (F.method !== "GET" && F.method !== "HEAD") {
      switch (F.referrerPolicy) {
        case "no-referrer":
          j = null;
          break;
        case "no-referrer-when-downgrade":
        case "strict-origin":
        case "strict-origin-when-cross-origin":
          F.origin && Ze(F.origin) && !Ze(I(F)) && (j = null);
          break;
        case "same-origin":
          K(F, I(F)) || (j = null);
          break;
      }
      j && F.headersList.append("origin", j);
    }
  }
  function U(F) {
    return s.now();
  }
  function z(F) {
    return {
      startTime: F.startTime ?? 0,
      redirectStartTime: 0,
      redirectEndTime: 0,
      postRedirectStartTime: F.startTime ?? 0,
      finalServiceWorkerStartTime: 0,
      finalNetworkResponseStartTime: 0,
      finalNetworkRequestStartTime: 0,
      endTime: 0,
      encodedBodySize: 0,
      decodedBodySize: 0,
      finalConnectionTimingInfo: null
    };
  }
  function P() {
    return {
      referrerPolicy: "strict-origin-when-cross-origin"
    };
  }
  function ee(F) {
    return {
      referrerPolicy: F.referrerPolicy
    };
  }
  function te(F) {
    const j = F.referrerPolicy;
    g(j);
    let re = null;
    if (F.referrer === "client") {
      const Ke = r();
      if (!Ke || Ke.origin === "null")
        return "no-referrer";
      re = new URL(Ke);
    } else F.referrer instanceof URL && (re = F.referrer);
    let Ce = ge(re);
    const Re = ge(re, !0);
    Ce.toString().length > 4096 && (Ce = Re);
    const We = K(F, Ce), sA = ne(Ce) && !ne(F.url);
    switch (j) {
      case "origin":
        return Re ?? ge(re, !0);
      case "unsafe-url":
        return Ce;
      case "same-origin":
        return We ? Re : "no-referrer";
      case "origin-when-cross-origin":
        return We ? Ce : Re;
      case "strict-origin-when-cross-origin": {
        const Ke = I(F);
        return K(Ce, Ke) ? Ce : ne(Ce) && !ne(Ke) ? "no-referrer" : Re;
      }
      case "strict-origin":
      case "no-referrer-when-downgrade":
      default:
        return sA ? "no-referrer" : Re;
    }
  }
  function ge(F, j) {
    return g(F instanceof URL), F.protocol === "file:" || F.protocol === "about:" || F.protocol === "blank:" ? "no-referrer" : (F.username = "", F.password = "", F.hash = "", j && (F.pathname = "", F.search = ""), F);
  }
  function ne(F) {
    if (!(F instanceof URL))
      return !1;
    if (F.href === "about:blank" || F.href === "about:srcdoc" || F.protocol === "data:" || F.protocol === "file:") return !0;
    return j(F.origin);
    function j(re) {
      if (re == null || re === "null") return !1;
      const Ce = new URL(re);
      return !!(Ce.protocol === "https:" || Ce.protocol === "wss:" || /^127(?:\.[0-9]+){0,2}\.[0-9]+$|^\[(?:0*:)*?:?0*1\]$/.test(Ce.hostname) || Ce.hostname === "localhost" || Ce.hostname.includes("localhost.") || Ce.hostname.endsWith(".localhost"));
    }
  }
  function Qe(F, j) {
    if (h === void 0)
      return !0;
    const re = oe(j);
    if (re === "no metadata" || re.length === 0)
      return !0;
    const Ce = le(re), Re = M(re, Ce);
    for (const We of Re) {
      const sA = We.algo, Ke = We.hash;
      let gA = h.createHash(sA).update(F).digest("base64");
      if (gA[gA.length - 1] === "=" && (gA[gA.length - 2] === "=" ? gA = gA.slice(0, -2) : gA = gA.slice(0, -1)), L(gA, Ke))
        return !0;
    }
    return !1;
  }
  const W = /(?<algo>sha256|sha384|sha512)-((?<hash>[A-Za-z0-9+/]+|[A-Za-z0-9_-]+)={0,2}(?:\s|$)( +[!-~]*)?)?/i;
  function oe(F) {
    const j = [];
    let re = !0;
    for (const Ce of F.split(" ")) {
      re = !1;
      const Re = W.exec(Ce);
      if (Re === null || Re.groups === void 0 || Re.groups.algo === void 0)
        continue;
      const We = Re.groups.algo.toLowerCase();
      l.includes(We) && j.push(Re.groups);
    }
    return re === !0 ? "no metadata" : j;
  }
  function le(F) {
    let j = F[0].algo;
    if (j[3] === "5")
      return j;
    for (let re = 1; re < F.length; ++re) {
      const Ce = F[re];
      if (Ce.algo[3] === "5") {
        j = "sha512";
        break;
      } else {
        if (j[3] === "3")
          continue;
        Ce.algo[3] === "3" && (j = "sha384");
      }
    }
    return j;
  }
  function M(F, j) {
    if (F.length === 1)
      return F;
    let re = 0;
    for (let Ce = 0; Ce < F.length; ++Ce)
      F[Ce].algo === j && (F[re++] = F[Ce]);
    return F.length = re, F;
  }
  function L(F, j) {
    if (F.length !== j.length)
      return !1;
    for (let re = 0; re < F.length; ++re)
      if (F[re] !== j[re]) {
        if (F[re] === "+" && j[re] === "-" || F[re] === "/" && j[re] === "_")
          continue;
        return !1;
      }
    return !0;
  }
  function q(F) {
  }
  function K(F, j) {
    return F.origin === j.origin && F.origin === "null" || F.protocol === j.protocol && F.hostname === j.hostname && F.port === j.port;
  }
  function Ae() {
    let F, j;
    return { promise: new Promise((Ce, Re) => {
      F = Ce, j = Re;
    }), resolve: F, reject: j };
  }
  function $(F) {
    return F.controller.state === "aborted";
  }
  function Z(F) {
    return F.controller.state === "aborted" || F.controller.state === "terminated";
  }
  const J = {
    delete: "DELETE",
    DELETE: "DELETE",
    get: "GET",
    GET: "GET",
    head: "HEAD",
    HEAD: "HEAD",
    options: "OPTIONS",
    OPTIONS: "OPTIONS",
    post: "POST",
    POST: "POST",
    put: "PUT",
    PUT: "PUT"
  };
  Object.setPrototypeOf(J, null);
  function he(F) {
    return J[F.toLowerCase()] ?? F;
  }
  function we(F) {
    const j = JSON.stringify(F);
    if (j === void 0)
      throw new TypeError("Value is not JSON serializable");
    return g(typeof j == "string"), j;
  }
  const fe = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));
  function Ye(F, j, re) {
    const Ce = {
      index: 0,
      kind: re,
      target: F
    }, Re = {
      next() {
        if (Object.getPrototypeOf(this) !== Re)
          throw new TypeError(
            `'next' called on an object that does not implement interface ${j} Iterator.`
          );
        const { index: We, kind: sA, target: Ke } = Ce, gA = Ke(), is = gA.length;
        if (We >= is)
          return { value: void 0, done: !0 };
        const It = gA[We];
        return Ce.index = We + 1, Ue(It, sA);
      },
      // The class string of an iterator prototype object for a given interface is the
      // result of concatenating the identifier of the interface and the string " Iterator".
      [Symbol.toStringTag]: `${j} Iterator`
    };
    return Object.setPrototypeOf(Re, fe), Object.setPrototypeOf({}, Re);
  }
  function Ue(F, j) {
    let re;
    switch (j) {
      case "key": {
        re = F[0];
        break;
      }
      case "value": {
        re = F[1];
        break;
      }
      case "key+value": {
        re = F;
        break;
      }
    }
    return { value: re, done: !1 };
  }
  async function Pe(F, j, re) {
    const Ce = j, Re = re;
    let We;
    try {
      We = F.stream.getReader();
    } catch (sA) {
      Re(sA);
      return;
    }
    try {
      const sA = await be(We);
      Ce(sA);
    } catch (sA) {
      Re(sA);
    }
  }
  let Ve = globalThis.ReadableStream;
  function me(F) {
    return Ve || (Ve = G.ReadableStream), F instanceof Ve || F[Symbol.toStringTag] === "ReadableStream" && typeof F.tee == "function";
  }
  const Be = 65535;
  function Ne(F) {
    return F.length < Be ? String.fromCharCode(...F) : F.reduce((j, re) => j + String.fromCharCode(re), "");
  }
  function rA(F) {
    try {
      F.close();
    } catch (j) {
      if (!j.message.includes("Controller is already closed"))
        throw j;
    }
  }
  function $A(F) {
    for (let j = 0; j < F.length; j++)
      g(F.charCodeAt(j) <= 255);
    return F;
  }
  async function be(F) {
    const j = [];
    let re = 0;
    for (; ; ) {
      const { done: Ce, value: Re } = await F.read();
      if (Ce)
        return Buffer.concat(j, re);
      if (!u(Re))
        throw new TypeError("Received non-Uint8Array chunk");
      j.push(Re), re += Re.length;
    }
  }
  function Le(F) {
    g("protocol" in F);
    const j = F.protocol;
    return j === "about:" || j === "blob:" || j === "data:";
  }
  function Ze(F) {
    return typeof F == "string" ? F.startsWith("https:") : F.protocol === "https:";
  }
  function VA(F) {
    g("protocol" in F);
    const j = F.protocol;
    return j === "http:" || j === "https:";
  }
  const Nt = Object.hasOwn || ((F, j) => Object.prototype.hasOwnProperty.call(F, j));
  return Ei = {
    isAborted: $,
    isCancelled: Z,
    createDeferredPromise: Ae,
    ReadableStreamFrom: c,
    toUSVString: i,
    tryUpgradeRequestToAPotentiallyTrustworthyURL: q,
    coarsenedSharedCurrentTime: U,
    determineRequestsReferrer: te,
    makePolicyContainer: P,
    clonePolicyContainer: ee,
    appendFetchMetadata: v,
    appendRequestOriginHeader: _,
    TAOCheck: N,
    corsCheck: D,
    crossOriginResourcePolicyCheck: S,
    createOpaqueTimingInfo: z,
    setRequestReferrerPolicyOnRedirect: b,
    isValidHTTPToken: m,
    requestBadPort: C,
    requestCurrentURL: I,
    responseURL: E,
    responseLocationURL: f,
    isBlobLike: o,
    isURLPotentiallyTrustworthy: ne,
    isValidReasonPhrase: p,
    sameOrigin: K,
    normalizeMethod: he,
    serializeJavascriptValueToJSONString: we,
    makeIterator: Ye,
    isValidHeaderName: w,
    isValidHeaderValue: y,
    hasOwn: Nt,
    isErrorLike: B,
    fullyReadBody: Pe,
    bytesMatch: Qe,
    isReadableStreamLike: me,
    readableStreamClose: rA,
    isomorphicEncode: $A,
    isomorphicDecode: Ne,
    urlIsLocal: Le,
    urlHasHttpsScheme: Ze,
    urlIsHttpHttpsScheme: VA,
    readAllBytes: be,
    normalizeMethodRecord: J,
    parseMetadata: oe
  }, Ei;
}
var hi, kg;
function $t() {
  return kg || (kg = 1, hi = {
    kUrl: Symbol("url"),
    kHeaders: Symbol("headers"),
    kSignal: Symbol("signal"),
    kState: Symbol("state"),
    kGuard: Symbol("guard"),
    kRealm: Symbol("realm")
  }), hi;
}
var Qi, Fg;
function LA() {
  if (Fg) return Qi;
  Fg = 1;
  const { types: A } = G, { hasOwn: e, toUSVString: t } = ot(), r = {};
  return r.converters = {}, r.util = {}, r.errors = {}, r.errors.exception = function(s) {
    return new TypeError(`${s.header}: ${s.message}`);
  }, r.errors.conversionFailed = function(s) {
    const o = s.types.length === 1 ? "" : " one of", i = `${s.argument} could not be converted to${o}: ${s.types.join(", ")}.`;
    return r.errors.exception({
      header: s.prefix,
      message: i
    });
  }, r.errors.invalidArgument = function(s) {
    return r.errors.exception({
      header: s.prefix,
      message: `"${s.value}" is an invalid ${s.type}.`
    });
  }, r.brandCheck = function(s, o, i = void 0) {
    if (i?.strict !== !1 && !(s instanceof o))
      throw new TypeError("Illegal invocation");
    return s?.[Symbol.toStringTag] === o.prototype[Symbol.toStringTag];
  }, r.argumentLengthCheck = function({ length: s }, o, i) {
    if (s < o)
      throw r.errors.exception({
        message: `${o} argument${o !== 1 ? "s" : ""} required, but${s ? " only" : ""} ${s} found.`,
        ...i
      });
  }, r.illegalConstructor = function() {
    throw r.errors.exception({
      header: "TypeError",
      message: "Illegal constructor"
    });
  }, r.util.Type = function(s) {
    switch (typeof s) {
      case "undefined":
        return "Undefined";
      case "boolean":
        return "Boolean";
      case "string":
        return "String";
      case "symbol":
        return "Symbol";
      case "number":
        return "Number";
      case "bigint":
        return "BigInt";
      case "function":
      case "object":
        return s === null ? "Null" : "Object";
    }
  }, r.util.ConvertToInt = function(s, o, i, c = {}) {
    let g, u;
    o === 64 ? (g = Math.pow(2, 53) - 1, i === "unsigned" ? u = 0 : u = Math.pow(-2, 53) + 1) : i === "unsigned" ? (u = 0, g = Math.pow(2, o) - 1) : (u = Math.pow(-2, o) - 1, g = Math.pow(2, o - 1) - 1);
    let l = Number(s);
    if (l === 0 && (l = 0), c.enforceRange === !0) {
      if (Number.isNaN(l) || l === Number.POSITIVE_INFINITY || l === Number.NEGATIVE_INFINITY)
        throw r.errors.exception({
          header: "Integer conversion",
          message: `Could not convert ${s} to an integer.`
        });
      if (l = r.util.IntegerPart(l), l < u || l > g)
        throw r.errors.exception({
          header: "Integer conversion",
          message: `Value must be between ${u}-${g}, got ${l}.`
        });
      return l;
    }
    return !Number.isNaN(l) && c.clamp === !0 ? (l = Math.min(Math.max(l, u), g), Math.floor(l) % 2 === 0 ? l = Math.floor(l) : l = Math.ceil(l), l) : Number.isNaN(l) || l === 0 && Object.is(0, l) || l === Number.POSITIVE_INFINITY || l === Number.NEGATIVE_INFINITY ? 0 : (l = r.util.IntegerPart(l), l = l % Math.pow(2, o), i === "signed" && l >= Math.pow(2, o) - 1 ? l - Math.pow(2, o) : l);
  }, r.util.IntegerPart = function(s) {
    const o = Math.floor(Math.abs(s));
    return s < 0 ? -1 * o : o;
  }, r.sequenceConverter = function(s) {
    return (o) => {
      if (r.util.Type(o) !== "Object")
        throw r.errors.exception({
          header: "Sequence",
          message: `Value of type ${r.util.Type(o)} is not an Object.`
        });
      const i = o?.[Symbol.iterator]?.(), c = [];
      if (i === void 0 || typeof i.next != "function")
        throw r.errors.exception({
          header: "Sequence",
          message: "Object is not an iterator."
        });
      for (; ; ) {
        const { done: g, value: u } = i.next();
        if (g)
          break;
        c.push(s(u));
      }
      return c;
    };
  }, r.recordConverter = function(s, o) {
    return (i) => {
      if (r.util.Type(i) !== "Object")
        throw r.errors.exception({
          header: "Record",
          message: `Value of type ${r.util.Type(i)} is not an Object.`
        });
      const c = {};
      if (!A.isProxy(i)) {
        const u = Object.keys(i);
        for (const l of u) {
          const h = s(l), E = o(i[l]);
          c[h] = E;
        }
        return c;
      }
      const g = Reflect.ownKeys(i);
      for (const u of g)
        if (Reflect.getOwnPropertyDescriptor(i, u)?.enumerable) {
          const h = s(u), E = o(i[u]);
          c[h] = E;
        }
      return c;
    };
  }, r.interfaceConverter = function(s) {
    return (o, i = {}) => {
      if (i.strict !== !1 && !(o instanceof s))
        throw r.errors.exception({
          header: s.name,
          message: `Expected ${o} to be an instance of ${s.name}.`
        });
      return o;
    };
  }, r.dictionaryConverter = function(s) {
    return (o) => {
      const i = r.util.Type(o), c = {};
      if (i === "Null" || i === "Undefined")
        return c;
      if (i !== "Object")
        throw r.errors.exception({
          header: "Dictionary",
          message: `Expected ${o} to be one of: Null, Undefined, Object.`
        });
      for (const g of s) {
        const { key: u, defaultValue: l, required: h, converter: E } = g;
        if (h === !0 && !e(o, u))
          throw r.errors.exception({
            header: "Dictionary",
            message: `Missing required key "${u}".`
          });
        let f = o[u];
        const I = e(g, "defaultValue");
        if (I && f !== null && (f = f ?? l), h || I || f !== void 0) {
          if (f = E(f), g.allowedValues && !g.allowedValues.includes(f))
            throw r.errors.exception({
              header: "Dictionary",
              message: `${f} is not an accepted type. Expected one of ${g.allowedValues.join(", ")}.`
            });
          c[u] = f;
        }
      }
      return c;
    };
  }, r.nullableConverter = function(s) {
    return (o) => o === null ? o : s(o);
  }, r.converters.DOMString = function(s, o = {}) {
    if (s === null && o.legacyNullToEmptyString)
      return "";
    if (typeof s == "symbol")
      throw new TypeError("Could not convert argument of type symbol to string.");
    return String(s);
  }, r.converters.ByteString = function(s) {
    const o = r.converters.DOMString(s);
    for (let i = 0; i < o.length; i++)
      if (o.charCodeAt(i) > 255)
        throw new TypeError(
          `Cannot convert argument to a ByteString because the character at index ${i} has a value of ${o.charCodeAt(i)} which is greater than 255.`
        );
    return o;
  }, r.converters.USVString = t, r.converters.boolean = function(s) {
    return !!s;
  }, r.converters.any = function(s) {
    return s;
  }, r.converters["long long"] = function(s) {
    return r.util.ConvertToInt(s, 64, "signed");
  }, r.converters["unsigned long long"] = function(s) {
    return r.util.ConvertToInt(s, 64, "unsigned");
  }, r.converters["unsigned long"] = function(s) {
    return r.util.ConvertToInt(s, 32, "unsigned");
  }, r.converters["unsigned short"] = function(s, o) {
    return r.util.ConvertToInt(s, 16, "unsigned", o);
  }, r.converters.ArrayBuffer = function(s, o = {}) {
    if (r.util.Type(s) !== "Object" || !A.isAnyArrayBuffer(s))
      throw r.errors.conversionFailed({
        prefix: `${s}`,
        argument: `${s}`,
        types: ["ArrayBuffer"]
      });
    if (o.allowShared === !1 && A.isSharedArrayBuffer(s))
      throw r.errors.exception({
        header: "ArrayBuffer",
        message: "SharedArrayBuffer is not allowed."
      });
    return s;
  }, r.converters.TypedArray = function(s, o, i = {}) {
    if (r.util.Type(s) !== "Object" || !A.isTypedArray(s) || s.constructor.name !== o.name)
      throw r.errors.conversionFailed({
        prefix: `${o.name}`,
        argument: `${s}`,
        types: [o.name]
      });
    if (i.allowShared === !1 && A.isSharedArrayBuffer(s.buffer))
      throw r.errors.exception({
        header: "ArrayBuffer",
        message: "SharedArrayBuffer is not allowed."
      });
    return s;
  }, r.converters.DataView = function(s, o = {}) {
    if (r.util.Type(s) !== "Object" || !A.isDataView(s))
      throw r.errors.exception({
        header: "DataView",
        message: "Object is not a DataView."
      });
    if (o.allowShared === !1 && A.isSharedArrayBuffer(s.buffer))
      throw r.errors.exception({
        header: "ArrayBuffer",
        message: "SharedArrayBuffer is not allowed."
      });
    return s;
  }, r.converters.BufferSource = function(s, o = {}) {
    if (A.isAnyArrayBuffer(s))
      return r.converters.ArrayBuffer(s, o);
    if (A.isTypedArray(s))
      return r.converters.TypedArray(s, s.constructor);
    if (A.isDataView(s))
      return r.converters.DataView(s, o);
    throw new TypeError(`Could not convert ${s} to a BufferSource.`);
  }, r.converters["sequence<ByteString>"] = r.sequenceConverter(
    r.converters.ByteString
  ), r.converters["sequence<sequence<ByteString>>"] = r.sequenceConverter(
    r.converters["sequence<ByteString>"]
  ), r.converters["record<ByteString, ByteString>"] = r.recordConverter(
    r.converters.ByteString,
    r.converters.ByteString
  ), Qi = {
    webidl: r
  }, Qi;
}
var Ci, Tg;
function Bt() {
  if (Tg) return Ci;
  Tg = 1;
  const A = G, { atob: e } = G, { isomorphicDecode: t } = ot(), r = new TextEncoder(), s = /^[!#$%&'*+-.^_|~A-Za-z0-9]+$/, o = /(\u000A|\u000D|\u0009|\u0020)/, i = /[\u0009|\u0020-\u007E|\u0080-\u00FF]/;
  function c(y) {
    A(y.protocol === "data:");
    let b = g(y, !0);
    b = b.slice(5);
    const S = { position: 0 };
    let D = l(
      ",",
      b,
      S
    );
    const N = D.length;
    if (D = w(D, !0, !0), S.position >= b.length)
      return "failure";
    S.position++;
    const v = b.slice(N + 1);
    let _ = h(v);
    if (/;(\u0020){0,}base64$/i.test(D)) {
      const z = t(_);
      if (_ = I(z), _ === "failure")
        return "failure";
      D = D.slice(0, -6), D = D.replace(/(\u0020)+$/, ""), D = D.slice(0, -1);
    }
    D.startsWith(";") && (D = "text/plain" + D);
    let U = f(D);
    return U === "failure" && (U = f("text/plain;charset=US-ASCII")), { mimeType: U, body: _ };
  }
  function g(y, b = !1) {
    if (!b)
      return y.href;
    const S = y.href, D = y.hash.length;
    return D === 0 ? S : S.substring(0, S.length - D);
  }
  function u(y, b, S) {
    let D = "";
    for (; S.position < b.length && y(b[S.position]); )
      D += b[S.position], S.position++;
    return D;
  }
  function l(y, b, S) {
    const D = b.indexOf(y, S.position), N = S.position;
    return D === -1 ? (S.position = b.length, b.slice(N)) : (S.position = D, b.slice(N, S.position));
  }
  function h(y) {
    const b = r.encode(y);
    return E(b);
  }
  function E(y) {
    const b = [];
    for (let S = 0; S < y.length; S++) {
      const D = y[S];
      if (D !== 37)
        b.push(D);
      else if (D === 37 && !/^[0-9A-Fa-f]{2}$/i.test(String.fromCharCode(y[S + 1], y[S + 2])))
        b.push(37);
      else {
        const N = String.fromCharCode(y[S + 1], y[S + 2]), v = Number.parseInt(N, 16);
        b.push(v), S += 2;
      }
    }
    return Uint8Array.from(b);
  }
  function f(y) {
    y = Q(y, !0, !0);
    const b = { position: 0 }, S = l(
      "/",
      y,
      b
    );
    if (S.length === 0 || !s.test(S) || b.position > y.length)
      return "failure";
    b.position++;
    let D = l(
      ";",
      y,
      b
    );
    if (D = Q(D, !1, !0), D.length === 0 || !s.test(D))
      return "failure";
    const N = S.toLowerCase(), v = D.toLowerCase(), _ = {
      type: N,
      subtype: v,
      /** @type {Map<string, string>} */
      parameters: /* @__PURE__ */ new Map(),
      // https://mimesniff.spec.whatwg.org/#mime-type-essence
      essence: `${N}/${v}`
    };
    for (; b.position < y.length; ) {
      b.position++, u(
        // https://fetch.spec.whatwg.org/#http-whitespace
        (P) => o.test(P),
        y,
        b
      );
      let U = u(
        (P) => P !== ";" && P !== "=",
        y,
        b
      );
      if (U = U.toLowerCase(), b.position < y.length) {
        if (y[b.position] === ";")
          continue;
        b.position++;
      }
      if (b.position > y.length)
        break;
      let z = null;
      if (y[b.position] === '"')
        z = C(y, b, !0), l(
          ";",
          y,
          b
        );
      else if (z = l(
        ";",
        y,
        b
      ), z = Q(z, !1, !0), z.length === 0)
        continue;
      U.length !== 0 && s.test(U) && (z.length === 0 || i.test(z)) && !_.parameters.has(U) && _.parameters.set(U, z);
    }
    return _;
  }
  function I(y) {
    if (y = y.replace(/[\u0009\u000A\u000C\u000D\u0020]/g, ""), y.length % 4 === 0 && (y = y.replace(/=?=$/, "")), y.length % 4 === 1 || /[^+/0-9A-Za-z]/.test(y))
      return "failure";
    const b = e(y), S = new Uint8Array(b.length);
    for (let D = 0; D < b.length; D++)
      S[D] = b.charCodeAt(D);
    return S;
  }
  function C(y, b, S) {
    const D = b.position;
    let N = "";
    for (A(y[b.position] === '"'), b.position++; N += u(
      (_) => _ !== '"' && _ !== "\\",
      y,
      b
    ), !(b.position >= y.length); ) {
      const v = y[b.position];
      if (b.position++, v === "\\") {
        if (b.position >= y.length) {
          N += "\\";
          break;
        }
        N += y[b.position], b.position++;
      } else {
        A(v === '"');
        break;
      }
    }
    return S ? N : y.slice(D, b.position);
  }
  function B(y) {
    A(y !== "failure");
    const { parameters: b, essence: S } = y;
    let D = S;
    for (let [N, v] of b.entries())
      D += ";", D += N, D += "=", s.test(v) || (v = v.replace(/(\\|")/g, "\\$1"), v = '"' + v, v += '"'), D += v;
    return D;
  }
  function p(y) {
    return y === "\r" || y === `
` || y === "	" || y === " ";
  }
  function Q(y, b = !0, S = !0) {
    let D = 0, N = y.length - 1;
    if (b)
      for (; D < y.length && p(y[D]); D++) ;
    if (S)
      for (; N > 0 && p(y[N]); N--) ;
    return y.slice(D, N + 1);
  }
  function m(y) {
    return y === "\r" || y === `
` || y === "	" || y === "\f" || y === " ";
  }
  function w(y, b = !0, S = !0) {
    let D = 0, N = y.length - 1;
    if (b)
      for (; D < y.length && m(y[D]); D++) ;
    if (S)
      for (; N > 0 && m(y[N]); N--) ;
    return y.slice(D, N + 1);
  }
  return Ci = {
    dataURLProcessor: c,
    URLSerializer: g,
    collectASequenceOfCodePoints: u,
    collectASequenceOfCodePointsFast: l,
    stringPercentDecode: h,
    parseMIMEType: f,
    collectAnHTTPQuotedString: C,
    serializeAMimeType: B
  }, Ci;
}
var di, Ng;
function oc() {
  if (Ng) return di;
  Ng = 1;
  const { Blob: A, File: e } = G, { types: t } = G, { kState: r } = $t(), { isBlobLike: s } = ot(), { webidl: o } = LA(), { parseMIMEType: i, serializeAMimeType: c } = Bt(), { kEnumerableProperty: g } = ke, u = new TextEncoder();
  class l extends A {
    constructor(B, p, Q = {}) {
      o.argumentLengthCheck(arguments, 2, { header: "File constructor" }), B = o.converters["sequence<BlobPart>"](B), p = o.converters.USVString(p), Q = o.converters.FilePropertyBag(Q);
      const m = p;
      let w = Q.type, y;
      e: {
        if (w) {
          if (w = i(w), w === "failure") {
            w = "";
            break e;
          }
          w = c(w).toLowerCase();
        }
        y = Q.lastModified;
      }
      super(E(B, Q), { type: w }), this[r] = {
        name: m,
        lastModified: y,
        type: w
      };
    }
    get name() {
      return o.brandCheck(this, l), this[r].name;
    }
    get lastModified() {
      return o.brandCheck(this, l), this[r].lastModified;
    }
    get type() {
      return o.brandCheck(this, l), this[r].type;
    }
  }
  class h {
    constructor(B, p, Q = {}) {
      const m = p, w = Q.type, y = Q.lastModified ?? Date.now();
      this[r] = {
        blobLike: B,
        name: m,
        type: w,
        lastModified: y
      };
    }
    stream(...B) {
      return o.brandCheck(this, h), this[r].blobLike.stream(...B);
    }
    arrayBuffer(...B) {
      return o.brandCheck(this, h), this[r].blobLike.arrayBuffer(...B);
    }
    slice(...B) {
      return o.brandCheck(this, h), this[r].blobLike.slice(...B);
    }
    text(...B) {
      return o.brandCheck(this, h), this[r].blobLike.text(...B);
    }
    get size() {
      return o.brandCheck(this, h), this[r].blobLike.size;
    }
    get type() {
      return o.brandCheck(this, h), this[r].blobLike.type;
    }
    get name() {
      return o.brandCheck(this, h), this[r].name;
    }
    get lastModified() {
      return o.brandCheck(this, h), this[r].lastModified;
    }
    get [Symbol.toStringTag]() {
      return "File";
    }
  }
  Object.defineProperties(l.prototype, {
    [Symbol.toStringTag]: {
      value: "File",
      configurable: !0
    },
    name: g,
    lastModified: g
  }), o.converters.Blob = o.interfaceConverter(A), o.converters.BlobPart = function(C, B) {
    if (o.util.Type(C) === "Object") {
      if (s(C))
        return o.converters.Blob(C, { strict: !1 });
      if (ArrayBuffer.isView(C) || t.isAnyArrayBuffer(C))
        return o.converters.BufferSource(C, B);
    }
    return o.converters.USVString(C, B);
  }, o.converters["sequence<BlobPart>"] = o.sequenceConverter(
    o.converters.BlobPart
  ), o.converters.FilePropertyBag = o.dictionaryConverter([
    {
      key: "lastModified",
      converter: o.converters["long long"],
      get defaultValue() {
        return Date.now();
      }
    },
    {
      key: "type",
      converter: o.converters.DOMString,
      defaultValue: ""
    },
    {
      key: "endings",
      converter: (C) => (C = o.converters.DOMString(C), C = C.toLowerCase(), C !== "native" && (C = "transparent"), C),
      defaultValue: "transparent"
    }
  ]);
  function E(C, B) {
    const p = [];
    for (const Q of C)
      if (typeof Q == "string") {
        let m = Q;
        B.endings === "native" && (m = f(m)), p.push(u.encode(m));
      } else t.isAnyArrayBuffer(Q) || t.isTypedArray(Q) ? Q.buffer ? p.push(
        new Uint8Array(Q.buffer, Q.byteOffset, Q.byteLength)
      ) : p.push(new Uint8Array(Q)) : s(Q) && p.push(Q);
    return p;
  }
  function f(C) {
    let B = `
`;
    return process.platform === "win32" && (B = `\r
`), C.replace(/\r?\n/g, B);
  }
  function I(C) {
    return e && C instanceof e || C instanceof l || C && (typeof C.stream == "function" || typeof C.arrayBuffer == "function") && C[Symbol.toStringTag] === "File";
  }
  return di = { File: l, FileLike: h, isFileLike: I }, di;
}
var Bi, Ug;
function ic() {
  if (Ug) return Bi;
  Ug = 1;
  const { isBlobLike: A, toUSVString: e, makeIterator: t } = ot(), { kState: r } = $t(), { File: s, FileLike: o, isFileLike: i } = oc(), { webidl: c } = LA(), { Blob: g, File: u } = G, l = u ?? s;
  class h {
    constructor(I) {
      if (I !== void 0)
        throw c.errors.conversionFailed({
          prefix: "FormData constructor",
          argument: "Argument 1",
          types: ["undefined"]
        });
      this[r] = [];
    }
    append(I, C, B = void 0) {
      if (c.brandCheck(this, h), c.argumentLengthCheck(arguments, 2, { header: "FormData.append" }), arguments.length === 3 && !A(C))
        throw new TypeError(
          "Failed to execute 'append' on 'FormData': parameter 2 is not of type 'Blob'"
        );
      I = c.converters.USVString(I), C = A(C) ? c.converters.Blob(C, { strict: !1 }) : c.converters.USVString(C), B = arguments.length === 3 ? c.converters.USVString(B) : void 0;
      const p = E(I, C, B);
      this[r].push(p);
    }
    delete(I) {
      c.brandCheck(this, h), c.argumentLengthCheck(arguments, 1, { header: "FormData.delete" }), I = c.converters.USVString(I), this[r] = this[r].filter((C) => C.name !== I);
    }
    get(I) {
      c.brandCheck(this, h), c.argumentLengthCheck(arguments, 1, { header: "FormData.get" }), I = c.converters.USVString(I);
      const C = this[r].findIndex((B) => B.name === I);
      return C === -1 ? null : this[r][C].value;
    }
    getAll(I) {
      return c.brandCheck(this, h), c.argumentLengthCheck(arguments, 1, { header: "FormData.getAll" }), I = c.converters.USVString(I), this[r].filter((C) => C.name === I).map((C) => C.value);
    }
    has(I) {
      return c.brandCheck(this, h), c.argumentLengthCheck(arguments, 1, { header: "FormData.has" }), I = c.converters.USVString(I), this[r].findIndex((C) => C.name === I) !== -1;
    }
    set(I, C, B = void 0) {
      if (c.brandCheck(this, h), c.argumentLengthCheck(arguments, 2, { header: "FormData.set" }), arguments.length === 3 && !A(C))
        throw new TypeError(
          "Failed to execute 'set' on 'FormData': parameter 2 is not of type 'Blob'"
        );
      I = c.converters.USVString(I), C = A(C) ? c.converters.Blob(C, { strict: !1 }) : c.converters.USVString(C), B = arguments.length === 3 ? e(B) : void 0;
      const p = E(I, C, B), Q = this[r].findIndex((m) => m.name === I);
      Q !== -1 ? this[r] = [
        ...this[r].slice(0, Q),
        p,
        ...this[r].slice(Q + 1).filter((m) => m.name !== I)
      ] : this[r].push(p);
    }
    entries() {
      return c.brandCheck(this, h), t(
        () => this[r].map((I) => [I.name, I.value]),
        "FormData",
        "key+value"
      );
    }
    keys() {
      return c.brandCheck(this, h), t(
        () => this[r].map((I) => [I.name, I.value]),
        "FormData",
        "key"
      );
    }
    values() {
      return c.brandCheck(this, h), t(
        () => this[r].map((I) => [I.name, I.value]),
        "FormData",
        "value"
      );
    }
    /**
     * @param {(value: string, key: string, self: FormData) => void} callbackFn
     * @param {unknown} thisArg
     */
    forEach(I, C = globalThis) {
      if (c.brandCheck(this, h), c.argumentLengthCheck(arguments, 1, { header: "FormData.forEach" }), typeof I != "function")
        throw new TypeError(
          "Failed to execute 'forEach' on 'FormData': parameter 1 is not of type 'Function'."
        );
      for (const [B, p] of this)
        I.apply(C, [p, B, this]);
    }
  }
  h.prototype[Symbol.iterator] = h.prototype.entries, Object.defineProperties(h.prototype, {
    [Symbol.toStringTag]: {
      value: "FormData",
      configurable: !0
    }
  });
  function E(f, I, C) {
    if (f = Buffer.from(f).toString("utf8"), typeof I == "string")
      I = Buffer.from(I).toString("utf8");
    else if (i(I) || (I = I instanceof g ? new l([I], "blob", { type: I.type }) : new o(I, "blob", { type: I.type })), C !== void 0) {
      const B = {
        type: I.type,
        lastModified: I.lastModified
      };
      I = u && I instanceof u || I instanceof s ? new l([I], C, B) : new o(I, C, B);
    }
    return { name: f, value: I };
  }
  return Bi = { FormData: h }, Bi;
}
var Ii, Lg;
function Bo() {
  if (Lg) return Ii;
  Lg = 1;
  const A = BB(), e = ke, {
    ReadableStreamFrom: t,
    isBlobLike: r,
    isReadableStreamLike: s,
    readableStreamClose: o,
    createDeferredPromise: i,
    fullyReadBody: c
  } = ot(), { FormData: g } = ic(), { kState: u } = $t(), { webidl: l } = LA(), { DOMException: h, structuredClone: E } = fr(), { Blob: f, File: I } = G, { kBodyUsed: C } = He, B = G, { isErrored: p } = ke, { isUint8Array: Q, isArrayBuffer: m } = G, { File: w } = oc(), { parseMIMEType: y, serializeAMimeType: b } = Bt();
  let S = globalThis.ReadableStream;
  const D = I ?? w, N = new TextEncoder(), v = new TextDecoder();
  function _(M, L = !1) {
    S || (S = G.ReadableStream);
    let q = null;
    M instanceof S ? q = M : r(M) ? q = M.stream() : q = new S({
      async pull(he) {
        he.enqueue(
          typeof Ae == "string" ? N.encode(Ae) : Ae
        ), queueMicrotask(() => o(he));
      },
      start() {
      },
      type: void 0
    }), B(s(q));
    let K = null, Ae = null, $ = null, Z = null;
    if (typeof M == "string")
      Ae = M, Z = "text/plain;charset=UTF-8";
    else if (M instanceof URLSearchParams)
      Ae = M.toString(), Z = "application/x-www-form-urlencoded;charset=UTF-8";
    else if (m(M))
      Ae = new Uint8Array(M.slice());
    else if (ArrayBuffer.isView(M))
      Ae = new Uint8Array(M.buffer.slice(M.byteOffset, M.byteOffset + M.byteLength));
    else if (e.isFormDataLike(M)) {
      const he = `----formdata-undici-0${`${Math.floor(Math.random() * 1e11)}`.padStart(11, "0")}`, we = `--${he}\r
Content-Disposition: form-data`;
      /*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
      const fe = (Be) => Be.replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22"), Ye = (Be) => Be.replace(/\r?\n|\r/g, `\r
`), Ue = [], Pe = new Uint8Array([13, 10]);
      $ = 0;
      let Ve = !1;
      for (const [Be, Ne] of M)
        if (typeof Ne == "string") {
          const rA = N.encode(we + `; name="${fe(Ye(Be))}"\r
\r
${Ye(Ne)}\r
`);
          Ue.push(rA), $ += rA.byteLength;
        } else {
          const rA = N.encode(`${we}; name="${fe(Ye(Be))}"` + (Ne.name ? `; filename="${fe(Ne.name)}"` : "") + `\r
Content-Type: ${Ne.type || "application/octet-stream"}\r
\r
`);
          Ue.push(rA, Ne, Pe), typeof Ne.size == "number" ? $ += rA.byteLength + Ne.size + Pe.byteLength : Ve = !0;
        }
      const me = N.encode(`--${he}--`);
      Ue.push(me), $ += me.byteLength, Ve && ($ = null), Ae = M, K = async function* () {
        for (const Be of Ue)
          Be.stream ? yield* Be.stream() : yield Be;
      }, Z = "multipart/form-data; boundary=" + he;
    } else if (r(M))
      Ae = M, $ = M.size, M.type && (Z = M.type);
    else if (typeof M[Symbol.asyncIterator] == "function") {
      if (L)
        throw new TypeError("keepalive");
      if (e.isDisturbed(M) || M.locked)
        throw new TypeError(
          "Response body object should not be disturbed or locked"
        );
      q = M instanceof S ? M : t(M);
    }
    if ((typeof Ae == "string" || e.isBuffer(Ae)) && ($ = Buffer.byteLength(Ae)), K != null) {
      let he;
      q = new S({
        async start() {
          he = K(M)[Symbol.asyncIterator]();
        },
        async pull(we) {
          const { value: fe, done: Ye } = await he.next();
          return Ye ? queueMicrotask(() => {
            we.close();
          }) : p(q) || we.enqueue(new Uint8Array(fe)), we.desiredSize > 0;
        },
        async cancel(we) {
          await he.return();
        },
        type: void 0
      });
    }
    return [{ stream: q, source: Ae, length: $ }, Z];
  }
  function U(M, L = !1) {
    return S || (S = G.ReadableStream), M instanceof S && (B(!e.isDisturbed(M), "The body has already been consumed."), B(!M.locked, "The stream is locked.")), _(M, L);
  }
  function z(M) {
    const [L, q] = M.stream.tee(), K = E(q, { transfer: [q] }), [, Ae] = K.tee();
    return M.stream = L, {
      stream: Ae,
      length: M.length,
      source: M.source
    };
  }
  async function* P(M) {
    if (M)
      if (Q(M))
        yield M;
      else {
        const L = M.stream;
        if (e.isDisturbed(L))
          throw new TypeError("The body has already been consumed.");
        if (L.locked)
          throw new TypeError("The stream is locked.");
        L[C] = !0, yield* L;
      }
  }
  function ee(M) {
    if (M.aborted)
      throw new h("The operation was aborted.", "AbortError");
  }
  function te(M) {
    return {
      blob() {
        return ne(this, (q) => {
          let K = le(this);
          return K === "failure" ? K = "" : K && (K = b(K)), new f([q], { type: K });
        }, M);
      },
      arrayBuffer() {
        return ne(this, (q) => new Uint8Array(q).buffer, M);
      },
      text() {
        return ne(this, W, M);
      },
      json() {
        return ne(this, oe, M);
      },
      async formData() {
        l.brandCheck(this, M), ee(this[u]);
        const q = this.headers.get("Content-Type");
        if (/multipart\/form-data/.test(q)) {
          const K = {};
          for (const [J, he] of this.headers) K[J.toLowerCase()] = he;
          const Ae = new g();
          let $;
          try {
            $ = new A({
              headers: K,
              preservePath: !0
            });
          } catch (J) {
            throw new h(`${J}`, "AbortError");
          }
          $.on("field", (J, he) => {
            Ae.append(J, he);
          }), $.on("file", (J, he, we, fe, Ye) => {
            const Ue = [];
            if (fe === "base64" || fe.toLowerCase() === "base64") {
              let Pe = "";
              he.on("data", (Ve) => {
                Pe += Ve.toString().replace(/[\r\n]/gm, "");
                const me = Pe.length - Pe.length % 4;
                Ue.push(Buffer.from(Pe.slice(0, me), "base64")), Pe = Pe.slice(me);
              }), he.on("end", () => {
                Ue.push(Buffer.from(Pe, "base64")), Ae.append(J, new D(Ue, we, { type: Ye }));
              });
            } else
              he.on("data", (Pe) => {
                Ue.push(Pe);
              }), he.on("end", () => {
                Ae.append(J, new D(Ue, we, { type: Ye }));
              });
          });
          const Z = new Promise((J, he) => {
            $.on("finish", J), $.on("error", (we) => he(new TypeError(we)));
          });
          if (this.body !== null) for await (const J of P(this[u].body)) $.write(J);
          return $.end(), await Z, Ae;
        } else if (/application\/x-www-form-urlencoded/.test(q)) {
          let K;
          try {
            let $ = "";
            const Z = new TextDecoder("utf-8", { ignoreBOM: !0 });
            for await (const J of P(this[u].body)) {
              if (!Q(J))
                throw new TypeError("Expected Uint8Array chunk");
              $ += Z.decode(J, { stream: !0 });
            }
            $ += Z.decode(), K = new URLSearchParams($);
          } catch ($) {
            throw Object.assign(new TypeError(), { cause: $ });
          }
          const Ae = new g();
          for (const [$, Z] of K)
            Ae.append($, Z);
          return Ae;
        } else
          throw await Promise.resolve(), ee(this[u]), l.errors.exception({
            header: `${M.name}.formData`,
            message: "Could not parse content as FormData."
          });
      }
    };
  }
  function ge(M) {
    Object.assign(M.prototype, te(M));
  }
  async function ne(M, L, q) {
    if (l.brandCheck(M, q), ee(M[u]), Qe(M[u].body))
      throw new TypeError("Body is unusable");
    const K = i(), Ae = (Z) => K.reject(Z), $ = (Z) => {
      try {
        K.resolve(L(Z));
      } catch (J) {
        Ae(J);
      }
    };
    return M[u].body == null ? ($(new Uint8Array()), K.promise) : (await c(M[u].body, $, Ae), K.promise);
  }
  function Qe(M) {
    return M != null && (M.stream.locked || e.isDisturbed(M.stream));
  }
  function W(M) {
    return M.length === 0 ? "" : (M[0] === 239 && M[1] === 187 && M[2] === 191 && (M = M.subarray(3)), v.decode(M));
  }
  function oe(M) {
    return JSON.parse(W(M));
  }
  function le(M) {
    const { headersList: L } = M[u], q = L.get("content-type");
    return q === null ? "failure" : y(q);
  }
  return Ii = {
    extractBody: _,
    safelyExtractBody: U,
    cloneBody: z,
    mixinBody: ge
  }, Ii;
}
const {
  InvalidArgumentError: Ge,
  NotSupportedError: IB
} = Me, mt = G, { kHTTP2BuildRequest: fB, kHTTP2CopyHeaders: pB, kHTTP1BuildRequest: mB } = He, FA = ke, UE = /^[\^_`a-zA-Z\-0-9!#$%&'*+.|~]+$/, LE = /[^\t\x20-\x7e\x80-\xff]/, yB = /[^\u0021-\u00ff]/, tt = Symbol("handler"), tA = {};
let fi;
try {
  const A = G;
  tA.create = A.channel("undici:request:create"), tA.bodySent = A.channel("undici:request:bodySent"), tA.headers = A.channel("undici:request:headers"), tA.trailers = A.channel("undici:request:trailers"), tA.error = A.channel("undici:request:error");
} catch {
  tA.create = { hasSubscribers: !1 }, tA.bodySent = { hasSubscribers: !1 }, tA.headers = { hasSubscribers: !1 }, tA.trailers = { hasSubscribers: !1 }, tA.error = { hasSubscribers: !1 };
}
let wB = class Ua {
  constructor(e, {
    path: t,
    method: r,
    body: s,
    headers: o,
    query: i,
    idempotent: c,
    blocking: g,
    upgrade: u,
    headersTimeout: l,
    bodyTimeout: h,
    reset: E,
    throwOnError: f,
    expectContinue: I
  }, C) {
    if (typeof t != "string")
      throw new Ge("path must be a string");
    if (t[0] !== "/" && !(t.startsWith("http://") || t.startsWith("https://")) && r !== "CONNECT")
      throw new Ge("path must be an absolute URL or start with a slash");
    if (yB.exec(t) !== null)
      throw new Ge("invalid request path");
    if (typeof r != "string")
      throw new Ge("method must be a string");
    if (UE.exec(r) === null)
      throw new Ge("invalid request method");
    if (u && typeof u != "string")
      throw new Ge("upgrade must be a string");
    if (l != null && (!Number.isFinite(l) || l < 0))
      throw new Ge("invalid headersTimeout");
    if (h != null && (!Number.isFinite(h) || h < 0))
      throw new Ge("invalid bodyTimeout");
    if (E != null && typeof E != "boolean")
      throw new Ge("invalid reset");
    if (I != null && typeof I != "boolean")
      throw new Ge("invalid expectContinue");
    if (this.headersTimeout = l, this.bodyTimeout = h, this.throwOnError = f === !0, this.method = r, this.abort = null, s == null)
      this.body = null;
    else if (FA.isStream(s)) {
      this.body = s;
      const B = this.body._readableState;
      (!B || !B.autoDestroy) && (this.endHandler = function() {
        FA.destroy(this);
      }, this.body.on("end", this.endHandler)), this.errorHandler = (p) => {
        this.abort ? this.abort(p) : this.error = p;
      }, this.body.on("error", this.errorHandler);
    } else if (FA.isBuffer(s))
      this.body = s.byteLength ? s : null;
    else if (ArrayBuffer.isView(s))
      this.body = s.buffer.byteLength ? Buffer.from(s.buffer, s.byteOffset, s.byteLength) : null;
    else if (s instanceof ArrayBuffer)
      this.body = s.byteLength ? Buffer.from(s) : null;
    else if (typeof s == "string")
      this.body = s.length ? Buffer.from(s) : null;
    else if (FA.isFormDataLike(s) || FA.isIterable(s) || FA.isBlobLike(s))
      this.body = s;
    else
      throw new Ge("body must be a string, a Buffer, a Readable stream, an iterable, or an async iterable");
    if (this.completed = !1, this.aborted = !1, this.upgrade = u || null, this.path = i ? FA.buildURL(t, i) : t, this.origin = e, this.idempotent = c ?? (r === "HEAD" || r === "GET"), this.blocking = g ?? !1, this.reset = E ?? null, this.host = null, this.contentLength = null, this.contentType = null, this.headers = "", this.expectContinue = I ?? !1, Array.isArray(o)) {
      if (o.length % 2 !== 0)
        throw new Ge("headers array must be even");
      for (let B = 0; B < o.length; B += 2)
        ws(this, o[B], o[B + 1]);
    } else if (o && typeof o == "object") {
      const B = Object.keys(o);
      for (let p = 0; p < B.length; p++) {
        const Q = B[p];
        ws(this, Q, o[Q]);
      }
    } else if (o != null)
      throw new Ge("headers must be an object or an array");
    if (FA.isFormDataLike(this.body)) {
      if (FA.nodeMajor < 16 || FA.nodeMajor === 16 && FA.nodeMinor < 8)
        throw new Ge("Form-Data bodies are only supported in node v16.8 and newer.");
      fi || (fi = Bo().extractBody);
      const [B, p] = fi(s);
      this.contentType == null && (this.contentType = p, this.headers += `content-type: ${p}\r
`), this.body = B.stream, this.contentLength = B.length;
    } else FA.isBlobLike(s) && this.contentType == null && s.type && (this.contentType = s.type, this.headers += `content-type: ${s.type}\r
`);
    FA.validateHandler(C, r, u), this.servername = FA.getServerName(this.host), this[tt] = C, tA.create.hasSubscribers && tA.create.publish({ request: this });
  }
  onBodySent(e) {
    if (this[tt].onBodySent)
      try {
        return this[tt].onBodySent(e);
      } catch (t) {
        this.abort(t);
      }
  }
  onRequestSent() {
    if (tA.bodySent.hasSubscribers && tA.bodySent.publish({ request: this }), this[tt].onRequestSent)
      try {
        return this[tt].onRequestSent();
      } catch (e) {
        this.abort(e);
      }
  }
  onConnect(e) {
    if (mt(!this.aborted), mt(!this.completed), this.error)
      e(this.error);
    else
      return this.abort = e, this[tt].onConnect(e);
  }
  onHeaders(e, t, r, s) {
    mt(!this.aborted), mt(!this.completed), tA.headers.hasSubscribers && tA.headers.publish({ request: this, response: { statusCode: e, headers: t, statusText: s } });
    try {
      return this[tt].onHeaders(e, t, r, s);
    } catch (o) {
      this.abort(o);
    }
  }
  onData(e) {
    mt(!this.aborted), mt(!this.completed);
    try {
      return this[tt].onData(e);
    } catch (t) {
      return this.abort(t), !1;
    }
  }
  onUpgrade(e, t, r) {
    return mt(!this.aborted), mt(!this.completed), this[tt].onUpgrade(e, t, r);
  }
  onComplete(e) {
    this.onFinally(), mt(!this.aborted), this.completed = !0, tA.trailers.hasSubscribers && tA.trailers.publish({ request: this, trailers: e });
    try {
      return this[tt].onComplete(e);
    } catch (t) {
      this.onError(t);
    }
  }
  onError(e) {
    if (this.onFinally(), tA.error.hasSubscribers && tA.error.publish({ request: this, error: e }), !this.aborted)
      return this.aborted = !0, this[tt].onError(e);
  }
  onFinally() {
    this.errorHandler && (this.body.off("error", this.errorHandler), this.errorHandler = null), this.endHandler && (this.body.off("end", this.endHandler), this.endHandler = null);
  }
  // TODO: adjust to support H2
  addHeader(e, t) {
    return ws(this, e, t), this;
  }
  static [mB](e, t, r) {
    return new Ua(e, t, r);
  }
  static [fB](e, t, r) {
    const s = t.headers;
    t = { ...t, headers: null };
    const o = new Ua(e, t, r);
    if (o.headers = {}, Array.isArray(s)) {
      if (s.length % 2 !== 0)
        throw new Ge("headers array must be even");
      for (let i = 0; i < s.length; i += 2)
        ws(o, s[i], s[i + 1], !0);
    } else if (s && typeof s == "object") {
      const i = Object.keys(s);
      for (let c = 0; c < i.length; c++) {
        const g = i[c];
        ws(o, g, s[g], !0);
      }
    } else if (s != null)
      throw new Ge("headers must be an object or an array");
    return o;
  }
  static [pB](e) {
    const t = e.split(`\r
`), r = {};
    for (const s of t) {
      const [o, i] = s.split(": ");
      i == null || i.length === 0 || (r[o] ? r[o] += `,${i}` : r[o] = i);
    }
    return r;
  }
};
function rr(A, e, t) {
  if (e && typeof e == "object")
    throw new Ge(`invalid ${A} header`);
  if (e = e != null ? `${e}` : "", LE.exec(e) !== null)
    throw new Ge(`invalid ${A} header`);
  return t ? e : `${A}: ${e}\r
`;
}
function ws(A, e, t, r = !1) {
  if (t && typeof t == "object" && !Array.isArray(t))
    throw new Ge(`invalid ${e} header`);
  if (t === void 0)
    return;
  if (A.host === null && e.length === 4 && e.toLowerCase() === "host") {
    if (LE.exec(t) !== null)
      throw new Ge(`invalid ${e} header`);
    A.host = t;
  } else if (A.contentLength === null && e.length === 14 && e.toLowerCase() === "content-length") {
    if (A.contentLength = parseInt(t, 10), !Number.isFinite(A.contentLength))
      throw new Ge("invalid content-length header");
  } else if (A.contentType === null && e.length === 12 && e.toLowerCase() === "content-type")
    A.contentType = t, r ? A.headers[e] = rr(e, t, r) : A.headers += rr(e, t);
  else {
    if (e.length === 17 && e.toLowerCase() === "transfer-encoding")
      throw new Ge("invalid transfer-encoding header");
    if (e.length === 10 && e.toLowerCase() === "connection") {
      const s = typeof t == "string" ? t.toLowerCase() : null;
      if (s !== "close" && s !== "keep-alive")
        throw new Ge("invalid connection header");
      s === "close" && (A.reset = !0);
    } else {
      if (e.length === 10 && e.toLowerCase() === "keep-alive")
        throw new Ge("invalid keep-alive header");
      if (e.length === 7 && e.toLowerCase() === "upgrade")
        throw new Ge("invalid upgrade header");
      if (e.length === 6 && e.toLowerCase() === "expect")
        throw new IB("expect header not supported");
      if (UE.exec(e) === null)
        throw new Ge("invalid header key");
      if (Array.isArray(t))
        for (let s = 0; s < t.length; s++)
          r ? A.headers[e] ? A.headers[e] += `,${rr(e, t[s], r)}` : A.headers[e] = rr(e, t[s], r) : A.headers += rr(e, t[s]);
      else
        r ? A.headers[e] = rr(e, t, r) : A.headers += rr(e, t);
    }
  }
}
var bB = wB;
const RB = G;
let DB = class extends RB {
  dispatch() {
    throw new Error("not implemented");
  }
  close() {
    throw new Error("not implemented");
  }
  destroy() {
    throw new Error("not implemented");
  }
};
var ac = DB;
const SB = ac, {
  ClientDestroyedError: pi,
  ClientClosedError: kB,
  InvalidArgumentError: Gr
} = Me, { kDestroy: FB, kClose: TB, kDispatch: mi, kInterceptors: sr } = He, Mr = Symbol("destroyed"), bs = Symbol("closed"), yt = Symbol("onDestroyed"), Yr = Symbol("onClosed"), Dn = Symbol("Intercepted Dispatch");
let NB = class extends SB {
  constructor() {
    super(), this[Mr] = !1, this[yt] = null, this[bs] = !1, this[Yr] = [];
  }
  get destroyed() {
    return this[Mr];
  }
  get closed() {
    return this[bs];
  }
  get interceptors() {
    return this[sr];
  }
  set interceptors(e) {
    if (e) {
      for (let t = e.length - 1; t >= 0; t--)
        if (typeof this[sr][t] != "function")
          throw new Gr("interceptor must be an function");
    }
    this[sr] = e;
  }
  close(e) {
    if (e === void 0)
      return new Promise((r, s) => {
        this.close((o, i) => o ? s(o) : r(i));
      });
    if (typeof e != "function")
      throw new Gr("invalid callback");
    if (this[Mr]) {
      queueMicrotask(() => e(new pi(), null));
      return;
    }
    if (this[bs]) {
      this[Yr] ? this[Yr].push(e) : queueMicrotask(() => e(null, null));
      return;
    }
    this[bs] = !0, this[Yr].push(e);
    const t = () => {
      const r = this[Yr];
      this[Yr] = null;
      for (let s = 0; s < r.length; s++)
        r[s](null, null);
    };
    this[TB]().then(() => this.destroy()).then(() => {
      queueMicrotask(t);
    });
  }
  destroy(e, t) {
    if (typeof e == "function" && (t = e, e = null), t === void 0)
      return new Promise((s, o) => {
        this.destroy(e, (i, c) => i ? (
          /* istanbul ignore next: should never error */
          o(i)
        ) : s(c));
      });
    if (typeof t != "function")
      throw new Gr("invalid callback");
    if (this[Mr]) {
      this[yt] ? this[yt].push(t) : queueMicrotask(() => t(null, null));
      return;
    }
    e || (e = new pi()), this[Mr] = !0, this[yt] = this[yt] || [], this[yt].push(t);
    const r = () => {
      const s = this[yt];
      this[yt] = null;
      for (let o = 0; o < s.length; o++)
        s[o](null, null);
    };
    this[FB](e).then(() => {
      queueMicrotask(r);
    });
  }
  [Dn](e, t) {
    if (!this[sr] || this[sr].length === 0)
      return this[Dn] = this[mi], this[mi](e, t);
    let r = this[mi].bind(this);
    for (let s = this[sr].length - 1; s >= 0; s--)
      r = this[sr][s](r);
    return this[Dn] = r, r(e, t);
  }
  dispatch(e, t) {
    if (!t || typeof t != "object")
      throw new Gr("handler must be an object");
    try {
      if (!e || typeof e != "object")
        throw new Gr("opts must be an object.");
      if (this[Mr] || this[yt])
        throw new pi();
      if (this[bs])
        throw new kB();
      return this[Dn](e, t);
    } catch (r) {
      if (typeof t.onError != "function")
        throw new Gr("invalid onError method");
      return t.onError(r), !1;
    }
  }
};
var Io = NB;
const UB = G, _g = G, _E = ke, { InvalidArgumentError: LB, ConnectTimeoutError: _B } = Me;
let yi, La;
H.FinalizationRegistry && !process.env.NODE_V8_COVERAGE ? La = class {
  constructor(e) {
    this._maxCachedSessions = e, this._sessionCache = /* @__PURE__ */ new Map(), this._sessionRegistry = new H.FinalizationRegistry((t) => {
      if (this._sessionCache.size < this._maxCachedSessions)
        return;
      const r = this._sessionCache.get(t);
      r !== void 0 && r.deref() === void 0 && this._sessionCache.delete(t);
    });
  }
  get(e) {
    const t = this._sessionCache.get(e);
    return t ? t.deref() : null;
  }
  set(e, t) {
    this._maxCachedSessions !== 0 && (this._sessionCache.set(e, new WeakRef(t)), this._sessionRegistry.register(t, e));
  }
} : La = class {
  constructor(e) {
    this._maxCachedSessions = e, this._sessionCache = /* @__PURE__ */ new Map();
  }
  get(e) {
    return this._sessionCache.get(e);
  }
  set(e, t) {
    if (this._maxCachedSessions !== 0) {
      if (this._sessionCache.size >= this._maxCachedSessions) {
        const { value: r } = this._sessionCache.keys().next();
        this._sessionCache.delete(r);
      }
      this._sessionCache.set(e, t);
    }
  }
};
function vB({ allowH2: A, maxCachedSessions: e, socketPath: t, timeout: r, ...s }) {
  if (e != null && (!Number.isInteger(e) || e < 0))
    throw new LB("maxCachedSessions must be a positive integer or zero");
  const o = { path: t, ...s }, i = new La(e ?? 100);
  return r = r ?? 1e4, A = A ?? !1, function({ hostname: g, host: u, protocol: l, port: h, servername: E, localAddress: f, httpSocket: I }, C) {
    let B;
    if (l === "https:") {
      yi || (yi = G), E = E || o.servername || _E.getServerName(u) || null;
      const Q = E || g, m = i.get(Q) || null;
      _g(Q), B = yi.connect({
        highWaterMark: 16384,
        // TLS in node can't have bigger HWM anyway...
        ...o,
        servername: E,
        session: m,
        localAddress: f,
        // TODO(HTTP/2): Add support for h2c
        ALPNProtocols: A ? ["http/1.1", "h2"] : ["http/1.1"],
        socket: I,
        // upgrade socket connection
        port: h || 443,
        host: g
      }), B.on("session", function(w) {
        i.set(Q, w);
      });
    } else
      _g(!I, "httpSocket can only be sent on TLS update"), B = UB.connect({
        highWaterMark: 64 * 1024,
        // Same as nodejs fs streams.
        ...o,
        localAddress: f,
        port: h || 80,
        host: g
      });
    if (o.keepAlive == null || o.keepAlive) {
      const Q = o.keepAliveInitialDelay === void 0 ? 6e4 : o.keepAliveInitialDelay;
      B.setKeepAlive(!0, Q);
    }
    const p = GB(() => MB(B), r);
    return B.setNoDelay(!0).once(l === "https:" ? "secureConnect" : "connect", function() {
      if (p(), C) {
        const Q = C;
        C = null, Q(null, this);
      }
    }).on("error", function(Q) {
      if (p(), C) {
        const m = C;
        C = null, m(Q);
      }
    }), B;
  };
}
function GB(A, e) {
  if (!e)
    return () => {
    };
  let t = null, r = null;
  const s = setTimeout(() => {
    t = setImmediate(() => {
      process.platform === "win32" ? r = setImmediate(() => A()) : A();
    });
  }, e);
  return () => {
    clearTimeout(s), clearImmediate(t), clearImmediate(r);
  };
}
function MB(A) {
  _E.destroy(A, new _B());
}
var fo = vB, wi = {}, Rs = {}, vg;
function YB() {
  if (vg) return Rs;
  vg = 1, Object.defineProperty(Rs, "__esModule", { value: !0 }), Rs.enumToMap = void 0;
  function A(e) {
    const t = {};
    return Object.keys(e).forEach((r) => {
      const s = e[r];
      typeof s == "number" && (t[r] = s);
    }), t;
  }
  return Rs.enumToMap = A, Rs;
}
var Gg;
function PB() {
  return Gg || (Gg = 1, function(A) {
    Object.defineProperty(A, "__esModule", { value: !0 }), A.SPECIAL_HEADERS = A.HEADER_STATE = A.MINOR = A.MAJOR = A.CONNECTION_TOKEN_CHARS = A.HEADER_CHARS = A.TOKEN = A.STRICT_TOKEN = A.HEX = A.URL_CHAR = A.STRICT_URL_CHAR = A.USERINFO_CHARS = A.MARK = A.ALPHANUM = A.NUM = A.HEX_MAP = A.NUM_MAP = A.ALPHA = A.FINISH = A.H_METHOD_MAP = A.METHOD_MAP = A.METHODS_RTSP = A.METHODS_ICE = A.METHODS_HTTP = A.METHODS = A.LENIENT_FLAGS = A.FLAGS = A.TYPE = A.ERROR = void 0;
    const e = YB();
    (function(s) {
      s[s.OK = 0] = "OK", s[s.INTERNAL = 1] = "INTERNAL", s[s.STRICT = 2] = "STRICT", s[s.LF_EXPECTED = 3] = "LF_EXPECTED", s[s.UNEXPECTED_CONTENT_LENGTH = 4] = "UNEXPECTED_CONTENT_LENGTH", s[s.CLOSED_CONNECTION = 5] = "CLOSED_CONNECTION", s[s.INVALID_METHOD = 6] = "INVALID_METHOD", s[s.INVALID_URL = 7] = "INVALID_URL", s[s.INVALID_CONSTANT = 8] = "INVALID_CONSTANT", s[s.INVALID_VERSION = 9] = "INVALID_VERSION", s[s.INVALID_HEADER_TOKEN = 10] = "INVALID_HEADER_TOKEN", s[s.INVALID_CONTENT_LENGTH = 11] = "INVALID_CONTENT_LENGTH", s[s.INVALID_CHUNK_SIZE = 12] = "INVALID_CHUNK_SIZE", s[s.INVALID_STATUS = 13] = "INVALID_STATUS", s[s.INVALID_EOF_STATE = 14] = "INVALID_EOF_STATE", s[s.INVALID_TRANSFER_ENCODING = 15] = "INVALID_TRANSFER_ENCODING", s[s.CB_MESSAGE_BEGIN = 16] = "CB_MESSAGE_BEGIN", s[s.CB_HEADERS_COMPLETE = 17] = "CB_HEADERS_COMPLETE", s[s.CB_MESSAGE_COMPLETE = 18] = "CB_MESSAGE_COMPLETE", s[s.CB_CHUNK_HEADER = 19] = "CB_CHUNK_HEADER", s[s.CB_CHUNK_COMPLETE = 20] = "CB_CHUNK_COMPLETE", s[s.PAUSED = 21] = "PAUSED", s[s.PAUSED_UPGRADE = 22] = "PAUSED_UPGRADE", s[s.PAUSED_H2_UPGRADE = 23] = "PAUSED_H2_UPGRADE", s[s.USER = 24] = "USER";
    })(A.ERROR || (A.ERROR = {})), function(s) {
      s[s.BOTH = 0] = "BOTH", s[s.REQUEST = 1] = "REQUEST", s[s.RESPONSE = 2] = "RESPONSE";
    }(A.TYPE || (A.TYPE = {})), function(s) {
      s[s.CONNECTION_KEEP_ALIVE = 1] = "CONNECTION_KEEP_ALIVE", s[s.CONNECTION_CLOSE = 2] = "CONNECTION_CLOSE", s[s.CONNECTION_UPGRADE = 4] = "CONNECTION_UPGRADE", s[s.CHUNKED = 8] = "CHUNKED", s[s.UPGRADE = 16] = "UPGRADE", s[s.CONTENT_LENGTH = 32] = "CONTENT_LENGTH", s[s.SKIPBODY = 64] = "SKIPBODY", s[s.TRAILING = 128] = "TRAILING", s[s.TRANSFER_ENCODING = 512] = "TRANSFER_ENCODING";
    }(A.FLAGS || (A.FLAGS = {})), function(s) {
      s[s.HEADERS = 1] = "HEADERS", s[s.CHUNKED_LENGTH = 2] = "CHUNKED_LENGTH", s[s.KEEP_ALIVE = 4] = "KEEP_ALIVE";
    }(A.LENIENT_FLAGS || (A.LENIENT_FLAGS = {}));
    var t;
    (function(s) {
      s[s.DELETE = 0] = "DELETE", s[s.GET = 1] = "GET", s[s.HEAD = 2] = "HEAD", s[s.POST = 3] = "POST", s[s.PUT = 4] = "PUT", s[s.CONNECT = 5] = "CONNECT", s[s.OPTIONS = 6] = "OPTIONS", s[s.TRACE = 7] = "TRACE", s[s.COPY = 8] = "COPY", s[s.LOCK = 9] = "LOCK", s[s.MKCOL = 10] = "MKCOL", s[s.MOVE = 11] = "MOVE", s[s.PROPFIND = 12] = "PROPFIND", s[s.PROPPATCH = 13] = "PROPPATCH", s[s.SEARCH = 14] = "SEARCH", s[s.UNLOCK = 15] = "UNLOCK", s[s.BIND = 16] = "BIND", s[s.REBIND = 17] = "REBIND", s[s.UNBIND = 18] = "UNBIND", s[s.ACL = 19] = "ACL", s[s.REPORT = 20] = "REPORT", s[s.MKACTIVITY = 21] = "MKACTIVITY", s[s.CHECKOUT = 22] = "CHECKOUT", s[s.MERGE = 23] = "MERGE", s[s["M-SEARCH"] = 24] = "M-SEARCH", s[s.NOTIFY = 25] = "NOTIFY", s[s.SUBSCRIBE = 26] = "SUBSCRIBE", s[s.UNSUBSCRIBE = 27] = "UNSUBSCRIBE", s[s.PATCH = 28] = "PATCH", s[s.PURGE = 29] = "PURGE", s[s.MKCALENDAR = 30] = "MKCALENDAR", s[s.LINK = 31] = "LINK", s[s.UNLINK = 32] = "UNLINK", s[s.SOURCE = 33] = "SOURCE", s[s.PRI = 34] = "PRI", s[s.DESCRIBE = 35] = "DESCRIBE", s[s.ANNOUNCE = 36] = "ANNOUNCE", s[s.SETUP = 37] = "SETUP", s[s.PLAY = 38] = "PLAY", s[s.PAUSE = 39] = "PAUSE", s[s.TEARDOWN = 40] = "TEARDOWN", s[s.GET_PARAMETER = 41] = "GET_PARAMETER", s[s.SET_PARAMETER = 42] = "SET_PARAMETER", s[s.REDIRECT = 43] = "REDIRECT", s[s.RECORD = 44] = "RECORD", s[s.FLUSH = 45] = "FLUSH";
    })(t = A.METHODS || (A.METHODS = {})), A.METHODS_HTTP = [
      t.DELETE,
      t.GET,
      t.HEAD,
      t.POST,
      t.PUT,
      t.CONNECT,
      t.OPTIONS,
      t.TRACE,
      t.COPY,
      t.LOCK,
      t.MKCOL,
      t.MOVE,
      t.PROPFIND,
      t.PROPPATCH,
      t.SEARCH,
      t.UNLOCK,
      t.BIND,
      t.REBIND,
      t.UNBIND,
      t.ACL,
      t.REPORT,
      t.MKACTIVITY,
      t.CHECKOUT,
      t.MERGE,
      t["M-SEARCH"],
      t.NOTIFY,
      t.SUBSCRIBE,
      t.UNSUBSCRIBE,
      t.PATCH,
      t.PURGE,
      t.MKCALENDAR,
      t.LINK,
      t.UNLINK,
      t.PRI,
      // TODO(indutny): should we allow it with HTTP?
      t.SOURCE
    ], A.METHODS_ICE = [
      t.SOURCE
    ], A.METHODS_RTSP = [
      t.OPTIONS,
      t.DESCRIBE,
      t.ANNOUNCE,
      t.SETUP,
      t.PLAY,
      t.PAUSE,
      t.TEARDOWN,
      t.GET_PARAMETER,
      t.SET_PARAMETER,
      t.REDIRECT,
      t.RECORD,
      t.FLUSH,
      // For AirPlay
      t.GET,
      t.POST
    ], A.METHOD_MAP = e.enumToMap(t), A.H_METHOD_MAP = {}, Object.keys(A.METHOD_MAP).forEach((s) => {
      /^H/.test(s) && (A.H_METHOD_MAP[s] = A.METHOD_MAP[s]);
    }), function(s) {
      s[s.SAFE = 0] = "SAFE", s[s.SAFE_WITH_CB = 1] = "SAFE_WITH_CB", s[s.UNSAFE = 2] = "UNSAFE";
    }(A.FINISH || (A.FINISH = {})), A.ALPHA = [];
    for (let s = 65; s <= 90; s++)
      A.ALPHA.push(String.fromCharCode(s)), A.ALPHA.push(String.fromCharCode(s + 32));
    A.NUM_MAP = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9
    }, A.HEX_MAP = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
      a: 10,
      b: 11,
      c: 12,
      d: 13,
      e: 14,
      f: 15
    }, A.NUM = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9"
    ], A.ALPHANUM = A.ALPHA.concat(A.NUM), A.MARK = ["-", "_", ".", "!", "~", "*", "'", "(", ")"], A.USERINFO_CHARS = A.ALPHANUM.concat(A.MARK).concat(["%", ";", ":", "&", "=", "+", "$", ","]), A.STRICT_URL_CHAR = [
      "!",
      '"',
      "$",
      "%",
      "&",
      "'",
      "(",
      ")",
      "*",
      "+",
      ",",
      "-",
      ".",
      "/",
      ":",
      ";",
      "<",
      "=",
      ">",
      "@",
      "[",
      "\\",
      "]",
      "^",
      "_",
      "`",
      "{",
      "|",
      "}",
      "~"
    ].concat(A.ALPHANUM), A.URL_CHAR = A.STRICT_URL_CHAR.concat(["	", "\f"]);
    for (let s = 128; s <= 255; s++)
      A.URL_CHAR.push(s);
    A.HEX = A.NUM.concat(["a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F"]), A.STRICT_TOKEN = [
      "!",
      "#",
      "$",
      "%",
      "&",
      "'",
      "*",
      "+",
      "-",
      ".",
      "^",
      "_",
      "`",
      "|",
      "~"
    ].concat(A.ALPHANUM), A.TOKEN = A.STRICT_TOKEN.concat([" "]), A.HEADER_CHARS = ["	"];
    for (let s = 32; s <= 255; s++)
      s !== 127 && A.HEADER_CHARS.push(s);
    A.CONNECTION_TOKEN_CHARS = A.HEADER_CHARS.filter((s) => s !== 44), A.MAJOR = A.NUM_MAP, A.MINOR = A.MAJOR;
    var r;
    (function(s) {
      s[s.GENERAL = 0] = "GENERAL", s[s.CONNECTION = 1] = "CONNECTION", s[s.CONTENT_LENGTH = 2] = "CONTENT_LENGTH", s[s.TRANSFER_ENCODING = 3] = "TRANSFER_ENCODING", s[s.UPGRADE = 4] = "UPGRADE", s[s.CONNECTION_KEEP_ALIVE = 5] = "CONNECTION_KEEP_ALIVE", s[s.CONNECTION_CLOSE = 6] = "CONNECTION_CLOSE", s[s.CONNECTION_UPGRADE = 7] = "CONNECTION_UPGRADE", s[s.TRANSFER_ENCODING_CHUNKED = 8] = "TRANSFER_ENCODING_CHUNKED";
    })(r = A.HEADER_STATE || (A.HEADER_STATE = {})), A.SPECIAL_HEADERS = {
      connection: r.CONNECTION,
      "content-length": r.CONTENT_LENGTH,
      "proxy-connection": r.CONNECTION,
      "transfer-encoding": r.TRANSFER_ENCODING,
      upgrade: r.UPGRADE
    };
  }(wi)), wi;
}
const Rt = ke, { kBodyUsed: Ys } = He, cc = G, { InvalidArgumentError: JB } = Me, OB = G, HB = [300, 301, 302, 303, 307, 308], Mg = Symbol("body");
class Yg {
  constructor(e) {
    this[Mg] = e, this[Ys] = !1;
  }
  async *[Symbol.asyncIterator]() {
    cc(!this[Ys], "disturbed"), this[Ys] = !0, yield* this[Mg];
  }
}
let VB = class {
  constructor(e, t, r, s) {
    if (t != null && (!Number.isInteger(t) || t < 0))
      throw new JB("maxRedirections must be a positive number");
    Rt.validateHandler(s, r.method, r.upgrade), this.dispatch = e, this.location = null, this.abort = null, this.opts = { ...r, maxRedirections: 0 }, this.maxRedirections = t, this.handler = s, this.history = [], Rt.isStream(this.opts.body) ? (Rt.bodyLength(this.opts.body) === 0 && this.opts.body.on("data", function() {
      cc(!1);
    }), typeof this.opts.body.readableDidRead != "boolean" && (this.opts.body[Ys] = !1, OB.prototype.on.call(this.opts.body, "data", function() {
      this[Ys] = !0;
    }))) : this.opts.body && typeof this.opts.body.pipeTo == "function" ? this.opts.body = new Yg(this.opts.body) : this.opts.body && typeof this.opts.body != "string" && !ArrayBuffer.isView(this.opts.body) && Rt.isIterable(this.opts.body) && (this.opts.body = new Yg(this.opts.body));
  }
  onConnect(e) {
    this.abort = e, this.handler.onConnect(e, { history: this.history });
  }
  onUpgrade(e, t, r) {
    this.handler.onUpgrade(e, t, r);
  }
  onError(e) {
    this.handler.onError(e);
  }
  onHeaders(e, t, r, s) {
    if (this.location = this.history.length >= this.maxRedirections || Rt.isDisturbed(this.opts.body) ? null : WB(e, t), this.opts.origin && this.history.push(new URL(this.opts.path, this.opts.origin)), !this.location)
      return this.handler.onHeaders(e, t, r, s);
    const { origin: o, pathname: i, search: c } = Rt.parseURL(new URL(this.location, this.opts.origin && new URL(this.opts.path, this.opts.origin))), g = c ? `${i}${c}` : i;
    this.opts.headers = qB(this.opts.headers, e === 303, this.opts.origin !== o), this.opts.path = g, this.opts.origin = o, this.opts.maxRedirections = 0, this.opts.query = null, e === 303 && this.opts.method !== "HEAD" && (this.opts.method = "GET", this.opts.body = null);
  }
  onData(e) {
    if (!this.location) return this.handler.onData(e);
  }
  onComplete(e) {
    this.location ? (this.location = null, this.abort = null, this.dispatch(this.opts, this)) : this.handler.onComplete(e);
  }
  onBodySent(e) {
    this.handler.onBodySent && this.handler.onBodySent(e);
  }
};
function WB(A, e) {
  if (HB.indexOf(A) === -1)
    return null;
  for (let t = 0; t < e.length; t += 2)
    if (e[t].toString().toLowerCase() === "location")
      return e[t + 1];
}
function Pg(A, e, t) {
  if (A.length === 4)
    return Rt.headerNameToString(A) === "host";
  if (e && Rt.headerNameToString(A).startsWith("content-"))
    return !0;
  if (t && (A.length === 13 || A.length === 6 || A.length === 19)) {
    const r = Rt.headerNameToString(A);
    return r === "authorization" || r === "cookie" || r === "proxy-authorization";
  }
  return !1;
}
function qB(A, e, t) {
  const r = [];
  if (Array.isArray(A))
    for (let s = 0; s < A.length; s += 2)
      Pg(A[s], e, t) || r.push(A[s], A[s + 1]);
  else if (A && typeof A == "object")
    for (const s of Object.keys(A))
      Pg(s, e, t) || r.push(s, A[s]);
  else
    cc(A == null, "headers must be an object or an array");
  return r;
}
var vE = VB;
const xB = vE;
function jB({ maxRedirections: A }) {
  return (e) => function(r, s) {
    const { maxRedirections: o = A } = r;
    if (!o)
      return e(r, s);
    const i = new xB(e, o, r, s);
    return r = { ...r, maxRedirections: 0 }, e(r, i);
  };
}
var gc = jB, bi, Jg;
function Og() {
  return Jg || (Jg = 1, bi = "AGFzbQEAAAABMAhgAX8Bf2ADf39/AX9gBH9/f38Bf2AAAGADf39/AGABfwBgAn9/AGAGf39/f39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQACA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAA0ZFAwMEAAAFAAAAAAAABQEFAAUFBQAABgAAAAAGBgYGAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAABAQcAAAUFAwABBAUBcAESEgUDAQACBggBfwFBgNQECwfRBSIGbWVtb3J5AgALX2luaXRpYWxpemUACRlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQALbGxodHRwX2luaXQAChhsbGh0dHBfc2hvdWxkX2tlZXBfYWxpdmUAQQxsbGh0dHBfYWxsb2MADAZtYWxsb2MARgtsbGh0dHBfZnJlZQANBGZyZWUASA9sbGh0dHBfZ2V0X3R5cGUADhVsbGh0dHBfZ2V0X2h0dHBfbWFqb3IADxVsbGh0dHBfZ2V0X2h0dHBfbWlub3IAEBFsbGh0dHBfZ2V0X21ldGhvZAARFmxsaHR0cF9nZXRfc3RhdHVzX2NvZGUAEhJsbGh0dHBfZ2V0X3VwZ3JhZGUAEwxsbGh0dHBfcmVzZXQAFA5sbGh0dHBfZXhlY3V0ZQAVFGxsaHR0cF9zZXR0aW5nc19pbml0ABYNbGxodHRwX2ZpbmlzaAAXDGxsaHR0cF9wYXVzZQAYDWxsaHR0cF9yZXN1bWUAGRtsbGh0dHBfcmVzdW1lX2FmdGVyX3VwZ3JhZGUAGhBsbGh0dHBfZ2V0X2Vycm5vABsXbGxodHRwX2dldF9lcnJvcl9yZWFzb24AHBdsbGh0dHBfc2V0X2Vycm9yX3JlYXNvbgAdFGxsaHR0cF9nZXRfZXJyb3JfcG9zAB4RbGxodHRwX2Vycm5vX25hbWUAHxJsbGh0dHBfbWV0aG9kX25hbWUAIBJs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ADcDACAAQShqQgA3AwAgAEEgakIANwMAIABBEGpCADcDACAAQQhqQgA3AwAgAEHdATYCHEEAC3sBAX8CQCAAKAIMIgMNAAJAIAAoAgRFDQAgACABNgIECwJAIAAgASACEMSAgIAAIgMNACAAKAIMDwsgACADNgIcQQAhAyAAKAIEIgFFDQAgACABIAIgACgCCBGBgICAAAAiAUUNACAAIAI2AhQgACABNgIMIAEhAwsgAwvk8wEDDn8DfgR/I4CAgIAAQRBrIgMkgICAgAAgASEEIAEhBSABIQYgASEHIAEhCCABIQkgASEKIAEhCyABIQwgASENIAEhDiABIQ8CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgACgCHCIQQX9qDt0B2gEB2QECAwQFBgcICQoLDA0O2AEPENcBERLWARMUFRYXGBkaG+AB3wEcHR7VAR8gISIjJCXUASYnKCkqKyzTAdIBLS7RAdABLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVG2wFHSElKzwHOAUvNAUzMAU1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4ABgQGCAYMBhAGFAYYBhwGIAYkBigGLAYwBjQGOAY8BkAGRAZIBkwGUAZUBlgGXAZgBmQGaAZsBnAGdAZ4BnwGgAaEBogGjAaQBpQGmAacBqAGpAaoBqwGsAa0BrgGvAbABsQGyAbMBtAG1AbYBtwHLAcoBuAHJAbkByAG6AbsBvAG9Ab4BvwHAAcEBwgHDAcQBxQHGAQDcAQtBACEQDMYBC0EOIRAMxQELQQ0hEAzEAQtBDyEQDMMBC0EQIRAMwgELQRMhEAzBAQtBFCEQDMABC0EVIRAMvwELQRYhEAy+AQtBFyEQDL0BC0EYIRAMvAELQRkhEAy7AQtBGiEQDLoBC0EbIRAMuQELQRwhEAy4AQtBCCEQDLcBC0EdIRAMtgELQSAhEAy1AQtBHyEQDLQBC0EHIRAMswELQSEhEAyyAQtBIiEQDLEBC0EeIRAMsAELQSMhEAyvAQtBEiEQDK4BC0ERIRAMrQELQSQhEAysAQtBJSEQDKsBC0EmIRAMqgELQSchEAypAQtBwwEhEAyoAQtBKSEQDKcBC0ErIRAMpgELQSwhEAylAQtBLSEQDKQBC0EuIRAMowELQS8hEAyiAQtBxAEhEAyhAQtBMCEQDKABC0E0IRAMnwELQQwhEAyeAQtBMSEQDJ0BC0EyIRAMnAELQTMhEAybAQtBOSEQDJoBC0E1IRAMmQELQcUBIRAMmAELQQshEAyXAQtBOiEQDJYBC0E2IRAMlQELQQohEAyUAQtBNyEQDJMBC0E4IRAMkgELQTwhEAyRAQtBOyEQDJABC0E9IRAMjwELQQkhEAyOAQtBKCEQDI0BC0E+IRAMjAELQT8hEAyLAQtBwAAhEAyKAQtBwQAhEAyJAQtBwgAhEAyIAQtBwwAhEAyHAQtBxAAhEAyGAQtBxQAhEAyFAQtBxgAhEAyEAQtBKiEQDIMBC0HHACEQDIIBC0HIACEQDIEBC0HJACEQDIABC0HKACEQDH8LQcsAIRAMfgtBzQAhEAx9C0HMACEQDHwLQc4AIRAMewtBzwAhEAx6C0HQACEQDHkLQdEAIRAMeAtB0gAhEAx3C0HTACEQDHYLQdQAIRAMdQtB1gAhEAx0C0HVACEQDHMLQQYhEAxyC0HXACEQDHELQQUhEAxwC0HYACEQDG8LQQQhEAxuC0HZACEQDG0LQdoAIRAMbAtB2wAhEAxrC0HcACEQDGoLQQMhEAxpC0HdACEQDGgLQd4AIRAMZwtB3wAhEAxmC0HhACEQDGULQeAAIRAMZAtB4gAhEAxjC0HjACEQDGILQQIhEAxhC0HkACEQDGALQeUAIRAMXwtB5gAhEAxeC0HnACEQDF0LQegAIRAMXAtB6QAhEAxbC0HqACEQDFoLQesAIRAMWQtB7AAhEAxYC0HtACEQDFcLQe4AIRAMVgtB7wAhEAxVC0HwACEQDFQLQfEAIRAMUwtB8gAhEAxSC0HzACEQDFELQfQAIRAMUAtB9QAhEAxPC0H2ACEQDE4LQfcAIRAMTQtB+AAhEAxMC0H5ACEQDEsLQfoAIRAMSgtB+wAhEAxJC0H8ACEQDEgLQf0AIRAMRwtB/gAhEAxGC0H/ACEQDEULQYABIRAMRAtBgQEhEAxDC0GCASEQDEILQYMBIRAMQQtBhAEhEAxAC0GFASEQDD8LQYYBIRAMPgtBhwEhEAw9C0GIASEQDDwLQYkBIRAMOwtBigEhEAw6C0GLASEQDDkLQYwBIRAMOAtBjQEhEAw3C0GOASEQDDYLQY8BIRAMNQtBkAEhEAw0C0GRASEQDDMLQZIBIRAMMgtBkwEhEAwxC0GUASEQDDALQZUBIRAMLwtBlgEhEAwuC0GXASEQDC0LQZgBIRAMLAtBmQEhEAwrC0GaASEQDCoLQZsBIRAMKQtBnAEhEAwoC0GdASEQDCcLQZ4BIRAMJgtBnwEhEAwlC0GgASEQDCQLQaEBIRAMIwtBogEhEAwiC0GjASEQDCELQaQBIRAMIAtBpQEhEAwfC0GmASEQDB4LQacBIRAMHQtBqAEhEAwcC0GpASEQDBsLQaoBIRAMGgtBqwEhEAwZC0GsASEQDBgLQa0BIRAMFwtBrgEhEAwWC0EBIRAMFQtBrwEhEAwUC0GwASEQDBMLQbEBIRAMEgtBswEhEAwRC0GyASEQDBALQbQBIRAMDwtBtQEhEAwOC0G2ASEQDA0LQbcBIRAMDAtBuAEhEAwLC0G5ASEQDAoLQboBIRAMCQtBuwEhEAwIC0HGASEQDAcLQbwBIRAMBgtBvQEhEAwFC0G+ASEQDAQLQb8BIRAMAwtBwAEhEAwCC0HCASEQDAELQcEBIRALA0ACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAC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FCAAIBA2AgxBACEQDLIBCyAAKAIEIRAgAEEANgIEAkAgACAQIAEQp4CAgAAiEA0AIAEhAQxNCyAAQdMANgIcIAAgATYCFCAAIBA2AgxBACEQDLEBCyAAKAIEIRAgAEEANgIEAkAgACAQIAEQp4CAgAAiEA0AIAEhAQxRCyAAQeUANgIcIAAgATYCFCAAIBA2AgxBACEQDLABCyAAQQA2AhwgACABNgIUIABBxoqAgAA2AhAgAEEHNgIMQQAhEAyvAQsgACgCBCEQIABBADYCBAJAIAAgECABEKeAgIAAIhANACABIQEMSQsgAEHSADYCHCAAIAE2AhQgACAQNgIMQQAhEAyuAQsgACgCBCEQIABBADYCBAJAIAAgECABEKeAgIAAIhANACABIQEMSQsgAEHTADYCHCAAIAE2AhQgACAQNgIMQQAhEAytAQsgACgCBCEQIABBADYCBAJAIAAgECABEKeAgIAAIhANACABIQEMTQsgAEHlADYCHCAAIAE2AhQgACAQNgIMQQAhEAysAQsgAEEANgIcIAAgATYCFCAAQdyIgIAANgIQIABBBzYCDEEAIRAMqwELIBBBP0cNASABQQFqIQELQQUhEAyQAQtBACEQIABBADYCHCAAIAE2AhQgAEH9koCAADYCECAAQQc2AgwMqAELIAAoAgQhECAAQQA2AgQCQCAAIBAgARCngICAACIQDQAgASEBDEILIABB0gA2AhwgACABNgIUIAAgEDYCDEEAIRAMpwELIAAoAgQhECAAQQA2AgQCQCAAIBAgARCngICAACIQDQAgASEBDEILIABB0wA2AhwgACABNgIUIAAgEDYCDEEAIRAMpgELIAAoAgQhECAAQQA2AgQCQCAAIBAgARCngICAACIQDQAgASEBDEYLIABB5QA2AhwgACABNgIUIAAgEDYCDEEAIRAMpQELIAAoAgQhASAAQQA2AgQCQCAAIAEgFBCngICAACIBDQAgFCEBDD8LIABB0gA2AhwgACAUNgIUIAAgATYCDEEAIRAMpAELIAAoAgQhASAAQQA2AgQCQCAAIAEgFBCngICAACIBDQAgFCEBDD8LIABB0wA2AhwgACAUNgIUIAAgATYCDEEAIRAMowELIAAoAgQhASAAQQA2AgQCQCAAIAEgFBCngICAACIBDQAgFCEBDEMLIABB5QA2AhwgACAU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YWdlX2JlZ2luYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfZXh0ZW5zaW9uX3ZhbHVlYCBjYWxsYmFjayBlcnJvcgBgb25fc3RhdHVzX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fdmVyc2lvbl9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX3VybF9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25faGVhZGVyX3ZhbHVlX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fbWVzc2FnZV9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX21ldGhvZF9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2hlYWRlcl9maWVsZF9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lYCBjYWxsYmFjayBlcnJvcgBVbmV4cGVjdGVkIGNoYXIgaW4gdXJsIHNlcnZlcgBJbnZhbGlkIGhlYWRlciB2YWx1ZSBjaGFyAEludmFsaWQgaGVhZGVyIGZpZWxkIGNoYXIAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl92ZXJzaW9uAEludmFsaWQgbWlub3IgdmVyc2lvbgBJbnZhbGlkIG1ham9yIHZlcnNpb24ARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgdmVyc2lvbgBFeHBlY3RlZCBDUkxGIGFmdGVyIHZlcnNpb24ASW52YWxpZCBIVFRQIHZlcnNpb24ASW52YWxpZCBoZWFkZXIgdG9rZW4AU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl91cmwASW52YWxpZCBjaGFyYWN0ZXJzIGluIHVybABVbmV4cGVjdGVkIHN0YXJ0IGNoYXIgaW4gdXJsAERvdWJsZSBAIGluIHVybABFbXB0eSBDb250ZW50LUxlbmd0aABJbnZhbGlkIGNoYXJhY3RlciBpbiBDb250ZW50LUxlbmd0aABEdXBsaWNhdGUgQ29udGVudC1MZW5ndGgASW52YWxpZCBjaGFyIGluIHVybCBwYXRoAENvbnRlbnQtTGVuZ3RoIGNhbid0IGJlIHByZXNlbnQgd2l0aCBUcmFuc2Zlci1FbmNvZGluZwBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBzaXplAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25faGVhZGVyX3ZhbHVlAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fY2h1bmtfZXh0ZW5zaW9uX3ZhbHVlAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgdmFsdWUATWlzc2luZyBleHBlY3RlZCBMRiBhZnRlciBoZWFkZXIgdmFsdWUASW52YWxpZCBgVHJhbnNmZXItRW5jb2RpbmdgIGhlYWRlciB2YWx1ZQBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zIHF1b3RlIHZhbHVlAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgcXVvdGVkIHZhbHVlAFBhdXNlZCBieSBvbl9oZWFkZXJzX2NvbXBsZXRlAEludmFsaWQgRU9GIHN0YXRlAG9uX3Jlc2V0IHBhdXNlAG9uX2NodW5rX2hlYWRlciBwYXVzZQBvbl9tZXNzYWdlX2JlZ2luIHBhdXNlAG9uX2NodW5rX2V4dGVuc2lvbl92YWx1ZSBwYXVzZQBvbl9zdGF0dXNfY29tcGxldGUgcGF1c2UAb25fdmVyc2lvbl9jb21wbGV0ZSBwYXVzZQBvbl91cmxfY29tcGxldGUgcGF1c2UAb25fY2h1bmtfY29tcGxldGUgcGF1c2UAb25faGVhZGVyX3ZhbHVlX2NvbXBsZXRlIHBhdXNlAG9uX21lc3NhZ2VfY29tcGxldGUgcGF1c2UAb25fbWV0aG9kX2NvbXBsZXRlIHBhdXNlAG9uX2hlYWRlcl9maWVsZF9jb21wbGV0ZSBwYXVzZQBvbl9jaHVua19leHRlbnNpb25fbmFtZSBwYXVzZQBVbmV4cGVjdGVkIHNwYWNlIGFmdGVyIHN0YXJ0IGxpbmUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9jaHVua19leHRlbnNpb25fbmFtZQBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zIG5hbWUAUGF1c2Ugb24gQ09OTkVDVC9VcGdyYWRlAFBhdXNlIG9uIFBSSS9VcGdyYWRlAEV4cGVjdGVkIEhUVFAvMiBDb25uZWN0aW9uIFByZWZhY2UAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9tZXRob2QARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgbWV0aG9kAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25faGVhZGVyX2ZpZWxkAFBhdXNlZABJbnZhbGlkIHdvcmQgZW5jb3VudGVyZWQASW52YWxpZCBtZXRob2QgZW5jb3VudGVyZWQAVW5leHBlY3RlZCBjaGFyIGluIHVybCBzY2hlbWEAUmVxdWVzdCBoYXMgaW52YWxpZCBgVHJhbnNmZXItRW5jb2RpbmdgAFNXSVRDSF9QUk9YWQBVU0VfUFJPWFkATUtBQ1RJVklUWQBVTlBST0NFU1NBQkxFX0VOVElUWQBDT1BZAE1PVkVEX1BFUk1BTkVOVExZAFRPT19FQVJMWQBOT1RJRlkARkFJTEVEX0RFUEVOREVOQ1kAQkFEX0dBVEVXQVkAUExBWQBQVVQAQ0hFQ0tPVVQAR0FURVdBWV9USU1FT1VUAFJFUVVFU1RfVElNRU9VVABORVRXT1JLX0NPTk5FQ1RfVElNRU9VVABDT05ORUNUSU9OX1RJTUVPVVQATE9HSU5fVElNRU9VVABORVRXT1JLX1JFQURfVElNRU9VVABQT1NUAE1JU0RJUkVDVEVEX1JFUVVFU1QAQ0xJRU5UX0NMT1NFRF9SRVFVRVNUAENMSUVOVF9DTE9TRURfTE9BRF9CQUxBTkNFRF9SRVFVRVNUAEJBRF9SRVFVRVNUAEhUVFBfUkVRVUVTVF9TRU5UX1RPX0hUVFBTX1BPUlQAUkVQT1JUAElNX0FfVEVBUE9UAFJFU0VUX0NPTlRFTlQATk9fQ09OVEVOVABQQVJUSUFMX0NPTlRFTlQASFBFX0lOVkFMSURfQ09OU1RBTlQASFBFX0NCX1JFU0VUAEdFVABIUEVfU1RSSUNUAENPTkZMSUNUAFRFTVBPUkFSWV9SRURJUkVDVABQRVJNQU5FTlRfUkVESVJFQ1QAQ09OTkVDVABNVUxUSV9TVEFUVVMASFBFX0lOVkFMSURfU1RBVFVTAFRPT19NQU5ZX1JFUVVFU1RTAEVBUkxZX0hJTlRTAFVOQVZBSUxBQkxFX0ZPUl9MRUdBTF9SRUFTT05TAE9QVElPTlMAU1dJVENISU5HX1BST1RPQ09MUwBWQVJJQU5UX0FMU09fTkVHT1RJQVRFUwBNVUxUSVBMRV9DSE9JQ0VTAElOVEVSTkFMX1NFUlZFUl9FUlJPUgBXRUJfU0VSVkVSX1VOS05PV05fRVJST1IAUkFJTEdVTl9FUlJPUgBJREVOVElUWV9QUk9WSURFUl9BVVRIRU5USUNBVElPTl9FUlJPUgBTU0xfQ0VSVElGSUNBVEVfRVJST1IASU5WQUxJRF9YX0ZPUldBUkRFRF9GT1IAU0VUX1BBUkFNRVRFUgBHRVRfUEFSQU1FVEVSAEhQRV9VU0VSAFNFRV9PVEhFUgBIUEVfQ0JfQ0hVTktfSEVBREVSAE1LQ0FMRU5EQVIAU0VUVVAAV0VCX1NFUlZFUl9JU19ET1dOAFRFQVJET1dOAEhQRV9DTE9TRURfQ09OTkVDVElPTgBIRVVSSVNUSUNfRVhQSVJBVElPTgBESVNDT05ORUNURURfT1BFUkFUSU9OAE5PTl9BVVRIT1JJVEFUSVZFX0lORk9STUFUSU9OAEhQRV9JTlZBTElEX1ZFUlNJT04ASFBFX0NCX01FU1NBR0VfQkVHSU4AU0lURV9JU19GUk9aRU4ASFBFX0lOVkFMSURfSEVBREVSX1RPS0VOAElOVkFMSURfVE9LRU4ARk9SQklEREVOAEVOSEFOQ0VfWU9VUl9DQUxNAEhQRV9JTlZBTElEX1VSTABCTE9DS0VEX0JZX1BBUkVOVEFMX0NPTlRST0wATUtDT0wAQUNMAEhQRV9JTlRFUk5BTABSRVFVRVNUX0hFQURFUl9GSUVMRFNfVE9PX0xBUkdFX1VOT0ZGSUNJQUwASFBFX09LAFVOTElOSwBVTkxPQ0sAUFJJAFJFVFJZX1dJVEgASFBFX0lOVkFMSURfQ09OVEVOVF9MRU5HVEgASFBFX1VORVhQRUNURURfQ09OVEVOVF9MRU5HVEgARkxVU0gAUFJPUFBBVENIAE0tU0VBUkNIAFVSSV9UT09fTE9ORwBQUk9DRVNTSU5HAE1JU0NFTExBTkVPVVNfUEVSU0lTVEVOVF9XQVJOSU5HAE1JU0NFTExBTkVPVVNfV0FSTklORwBIUEVfSU5WQUxJRF9UUkFOU0ZFUl9FTkNPRElORwBFeHBlY3RlZCBDUkxGAEhQRV9JTlZBTElEX0NIVU5LX1NJWkUATU9WRQBDT05USU5VRQBIUEVfQ0JfU1RBVFVTX0NPTVBMRVRFAEhQRV9DQl9IRUFERVJTX0NPTVBMRVRFAEhQRV9DQl9WRVJTSU9OX0NPTVBMRVRFAEhQRV9DQl9VUkxfQ09NUExFVEUASFBFX0NCX0NIVU5LX0NPTVBMRVRFAEhQRV9DQl9IRUFERVJfVkFMVUVfQ09NUExFVEUASFBFX0NCX0NIVU5LX0VYVEVOU0lPTl9WQUxVRV9DT01QTEVURQBIUEVfQ0JfQ0hVTktfRVhURU5TSU9OX05BTUVfQ09NUExFVEUASFBFX0NCX01FU1NBR0VfQ09NUExFVEUASFBFX0NCX01FVEhPRF9DT01QTEVURQBIUEVfQ0JfSEVBREVSX0ZJRUxEX0NPTVBMRVRFAERFTEVURQBIUEVfSU5WQUxJRF9FT0ZfU1RBVEUASU5WQUxJRF9TU0xfQ0VSVElGSUNBVEUAUEFVU0UATk9fUkVTUE9OU0UAVU5TVVBQT1JURURfTUVESUFfVFlQRQBHT05FAE5PVF9BQ0NFUFRBQkxFAFNFUlZJQ0VfVU5BVkFJTEFCTEUAUkFOR0VfTk9UX1NBVElTRklBQkxFAE9SSUdJTl9JU19VTlJFQUNIQUJMRQBSRVNQT05TRV9JU19TVEFMRQBQVVJHRQBNRVJHRQBSRVFVRVNUX0hFQURFUl9GSUVMRFNfVE9PX0xBUkdFAFJFUVVFU1RfSEVBREVSX1RPT19MQVJHRQBQQVlMT0FEX1RPT19MQVJHRQBJTlNVRkZJQ0lFTlRfU1RPUkFHRQBIUEVfUEFVU0VEX1VQR1JBREUASFBFX1BBVVNFRF9IMl9VUEdSQURFAFNPVVJDRQBBTk5PVU5DRQBUUkFDRQBIUEVfVU5FWFBFQ1RFRF9TUEFDRQBERVNDUklCRQBVTlNVQlNDUklCRQBSRUNPUkQASFBFX0lOVkFMSURfTUVUSE9EAE5PVF9GT1VORABQUk9QRklORABVTkJJTkQAUkVCSU5EAFVOQVVUSE9SSVpFRABNRVRIT0RfTk9UX0FMTE9XRUQASFRUUF9WRVJTSU9OX05PVF9TVVBQT1JURUQAQUxSRUFEWV9SRVBPUlRFRABBQ0NFUFRFRABOT1RfSU1QTEVNRU5URUQATE9PUF9ERVRFQ1RFRABIUEVfQ1JfRVhQRUNURUQASFBFX0xGX0VYUEVDVEVEAENSRUFURUQASU1fVVNFRABIUEVfUEFVU0VEAFRJTUVPVVRfT0NDVVJFRABQQVlNRU5UX1JFUVVJUkVEAFBSRUNPTkRJVElPTl9SRVFVSVJFRABQUk9YWV9BVVRIRU5USUNBVElPTl9SRVFVSVJFRABORVRXT1JLX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEAExFTkdUSF9SRVFVSVJFRABTU0xfQ0VSVElGSUNBVEVfUkVRVUlSRUQAVVBHUkFERV9SRVFVSVJFRABQQUdFX0VYUElSRUQAUFJFQ09ORElUSU9OX0ZBSUxFRABFWFBFQ1RBVElPTl9GQUlMRUQAUkVWQUxJREFUSU9OX0ZBSUxFRABTU0xfSEFORFNIQUtFX0ZBSUxFRABMT0NLRUQAVFJBTlNGT1JNQVRJT05fQVBQTElFRABOT1RfTU9ESUZJRUQATk9UX0VYVEVOREVEAEJBTkRXSURUSF9MSU1JVF9FWENFRURFRABTSVRFX0lTX09WRVJMT0FERUQASEVBRABFeHBlY3RlZCBIVFRQLwAAXhMAACYTAAAwEAAA8BcAAJ0TAAAVEgAAORcAAPASAAAKEAAAdRIAAK0SAACCEwAATxQAAH8QAACgFQAAIxQAAIkSAACLFAAATRUAANQRAADPFAAAEBgAAMkWAADcFgAAwREAAOAXAAC7FAAAdBQAAHwVAADlFAAACBcAAB8QAABlFQAAoxQAACgVAAACFQAAmRUAACwQAACLGQAATw8AANQOAABqEAAAzhAAAAIXAACJDgAAbhMAABwTAABmFAAAVhcAAMETAADNEwAAbBMAAGgXAABmFwAAXxcAACITAADODwAAaQ4AANgOAABjFgAAyxMAAKoOAAAoFwAAJhcAAMUTAABdFgAA6BEAAGcTAABlEwAA8hYAAHMTAAAdFwAA+RYAAPMRAADPDgAAzhUAAAwSAACzEQAApREAAGEQAAAyFwAAuxMAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAIDAgICAgIAAAICAAICAAICAgICAgICAgIABAAAAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgIAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAACAAICAgICAAACAgACAgACAgICAgICAgICAAMABAAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbG9zZWVlcC1hbGl2ZQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBY2h1bmtlZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEAAQEBAQEAAAEBAAEBAAEBAQEBAQEBAQEAAAAAAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABlY3Rpb25lbnQtbGVuZ3Rob25yb3h5LWNvbm5lY3Rpb24AAAAAAAAAAAAAAAAAAAByYW5zZmVyLWVuY29kaW5ncGdyYWRlDQoNCg0KU00NCg0KVFRQL0NFL1RTUC8AAAAAAAAAAAAAAAABAgABAwAAAAAAAAAAAAAAAAAAAAAAAAQBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAQIAAQMAAAAAAAAAAAAAAAAAAAAAAAAEAQEFAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAAAAQAAAgAAAAAAAAAAAAAAAAAAAAAAAAMEAAAEBAQEBAQEBAQEBAUEBAQEBAQEBAQEBAQABAAGBwQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAIAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABOT1VOQ0VFQ0tPVVRORUNURVRFQ1JJQkVMVVNIRVRFQURTRUFSQ0hSR0VDVElWSVRZTEVOREFSVkVPVElGWVBUSU9OU0NIU0VBWVNUQVRDSEdFT1JESVJFQ1RPUlRSQ0hQQVJBTUVURVJVUkNFQlNDUklCRUFSRE9XTkFDRUlORE5LQ0tVQlNDUklCRUhUVFAvQURUUC8="), bi;
}
var Ri, Hg;
function zB() {
  return Hg || (Hg = 1, Ri = "AGFzbQEAAAABMAhgAX8Bf2ADf39/AX9gBH9/f38Bf2AAAGADf39/AGABfwBgAn9/AGAGf39/f39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQACA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAA0ZFAwMEAAAFAAAAAAAABQEFAAUFBQAABgAAAAAGBgYGAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAABAQcAAAUFAwABBAUBcAESEgUDAQACBggBfwFBgNQECwfRBSIGbWVtb3J5AgALX2luaXRpYWxpemUACRlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQALbGxodHRwX2luaXQAChhsbGh0dHBfc2hvdWxkX2tlZXBfYWxpdmUAQQxsbGh0dHBfYWxsb2MADAZtYWxsb2MARgtsbGh0dHBfZnJlZQANBGZyZWUASA9sbGh0dHBfZ2V0X3R5cGUADhVsbGh0dHBfZ2V0X2h0dHBfbWFqb3IADxVsbGh0dHBfZ2V0X2h0dHBfbWlub3IAEBFsbGh0dHBfZ2V0X21ldGhvZAARFmxsaHR0cF9nZXRfc3RhdHVzX2NvZGUAEhJsbGh0dHBfZ2V0X3VwZ3JhZGUAEwxsbGh0dHBfcmVzZXQAFA5sbGh0dHBfZXhlY3V0ZQAVFGxsaHR0cF9zZXR0aW5nc19pbml0ABYNbGxodHRwX2ZpbmlzaAAXDGxsaHR0cF9wYXVzZQAYDWxsaHR0cF9yZXN1bWUAGRtsbGh0dHBfcmVzdW1lX2FmdGVyX3VwZ3JhZGUAGhBsbGh0dHBfZ2V0X2Vycm5vABsXbGxodHRwX2dldF9lcnJvcl9yZWFzb24AHBdsbGh0dHBfc2V0X2Vycm9yX3JlYXNvbgAdFGxsaHR0cF9nZXRfZXJyb3JfcG9zAB4RbGxodHRwX2Vycm5vX25hbWUAHxJsbGh0dHBfbWV0aG9kX25hbWUAIBJs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IAH9CwMAIABBMGogAf0LAwAgAEEgaiAB/QsDACAAQd0BNgIcQQALewEBfwJAIAAoAgwiAw0AAkAgACgCBEUNACAAIAE2AgQLAkAgACABIAIQxICAgAAiAw0AIAAoAgwPCyAAIAM2AhxBACEDIAAoAgQiAUUNACAAIAEgAiAAKAIIEYGAgIAAACIBRQ0AIAAgAjYCFCAAIAE2AgwgASEDCyADC+TzAQMOfwN+BH8jgICAgABBEGsiAySAgICAACABIQQgASEFIAEhBiABIQcgASEIIAEhCSABIQogASELIAEhDCABIQ0gASEOIAEhDwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAKAIcIhBBf2oO3QHaAQHZAQIDBAUGBwgJCgsMDQ7YAQ8Q1wEREtYBExQVFhcYGRob4AHfARwdHtUBHyAhIiMkJdQBJicoKSorLNMB0gEtLtEB0AEvMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUbbAUdISUrPAc4BS80BTMwBTU5PUFFSU1RVVldYWVpbXF1eX2BhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ent8fX5/gAGBAYIBgwGEAYUBhgGHAYgBiQGKAYsBjAGNAY4BjwGQAZEB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QAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIBAOxwEAAQID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YWNrIGVycm9yAGBvbl9jaHVua19leHRlbnNpb25fdmFsdWVgIGNhbGxiYWNrIGVycm9yAGBvbl9zdGF0dXNfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl92ZXJzaW9uX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fdXJsX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9oZWFkZXJfdmFsdWVfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9tZXNzYWdlX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fbWV0aG9kX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25faGVhZGVyX2ZpZWxkX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfZXh0ZW5zaW9uX25hbWVgIGNhbGxiYWNrIGVycm9yAFVuZXhwZWN0ZWQgY2hhciBpbiB1cmwgc2VydmVyAEludmFsaWQgaGVhZGVyIHZhbHVlIGNoYXIASW52YWxpZCBoZWFkZXIgZmllbGQgY2hhcgBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX3ZlcnNpb24ASW52YWxpZCBtaW5vciB2ZXJzaW9uAEludmFsaWQgbWFqb3IgdmVyc2lvbgBFeHBlY3RlZCBzcGFjZSBhZnRlciB2ZXJzaW9uAEV4cGVjdGVkIENSTEYgYWZ0ZXIgdmVyc2lvbgBJbnZhbGlkIEhUVFAgdmVyc2lvbgBJbnZhbGlkIGhlYWRlciB0b2tlbgBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX3VybABJbnZhbGlkIGNoYXJhY3RlcnMgaW4gdXJsAFVuZXhwZWN0ZWQgc3RhcnQgY2hhciBpbiB1cmwARG91YmxlIEAgaW4gdXJsAEVtcHR5IENvbnRlbnQtTGVuZ3RoAEludmFsaWQgY2hhcmFjdGVyIGluIENvbnRlbnQtTGVuZ3RoAER1cGxpY2F0ZSBDb250ZW50LUxlbmd0aABJbnZhbGlkIGNoYXIgaW4gdXJsIHBhdGgAQ29udGVudC1MZW5ndGggY2FuJ3QgYmUgcHJlc2VudCB3aXRoIFRyYW5zZmVyLUVuY29kaW5nAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIHNpemUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9oZWFkZXJfdmFsdWUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9jaHVua19leHRlbnNpb25fdmFsdWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyB2YWx1ZQBNaXNzaW5nIGV4cGVjdGVkIExGIGFmdGVyIGhlYWRlciB2YWx1ZQBJbnZhbGlkIGBUcmFuc2Zlci1FbmNvZGluZ2AgaGVhZGVyIHZhbHVlAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgcXVvdGUgdmFsdWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyBxdW90ZWQgdmFsdWUAUGF1c2VkIGJ5IG9uX2hlYWRlcnNfY29tcGxldGUASW52YWxpZCBFT0Ygc3RhdGUAb25fcmVzZXQgcGF1c2UAb25fY2h1bmtfaGVhZGVyIHBhdXNlAG9uX21lc3NhZ2VfYmVnaW4gcGF1c2UAb25fY2h1bmtfZXh0ZW5zaW9uX3ZhbHVlIHBhdXNlAG9uX3N0YXR1c19jb21wbGV0ZSBwYXVzZQBvbl92ZXJzaW9uX2NvbXBsZXRlIHBhdXNlAG9uX3VybF9jb21wbGV0ZSBwYXVzZQBvbl9jaHVua19jb21wbGV0ZSBwYXVzZQBvbl9oZWFkZXJfdmFsdWVfY29tcGxldGUgcGF1c2UAb25fbWVzc2FnZV9jb21wbGV0ZSBwYXVzZQBvbl9tZXRob2RfY29tcGxldGUgcGF1c2UAb25faGVhZGVyX2ZpZWxkX2NvbXBsZXRlIHBhdXNlAG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lIHBhdXNlAFVuZXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgc3RhcnQgbGluZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgbmFtZQBQYXVzZSBvbiBDT05ORUNUL1VwZ3JhZGUAUGF1c2Ugb24gUFJJL1VwZ3JhZGUARXhwZWN0ZWQgSFRUUC8yIENvbm5lY3Rpb24gUHJlZmFjZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX21ldGhvZABFeHBlY3RlZCBzcGFjZSBhZnRlciBtZXRob2QAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9oZWFkZXJfZmllbGQAUGF1c2VkAEludmFsaWQgd29yZCBlbmNvdW50ZXJlZABJbnZhbGlkIG1ldGhvZCBlbmNvdW50ZXJlZABVbmV4cGVjdGVkIGNoYXIgaW4gdXJsIHNjaGVtYQBSZXF1ZXN0IGhhcyBpbnZhbGlkIGBUcmFuc2Zlci1FbmNvZGluZ2AAU1dJVENIX1BST1hZAFVTRV9QUk9YWQBNS0FDVElWSVRZAFVOUFJPQ0VTU0FCTEVfRU5USVRZAENPUFkATU9WRURfUEVSTUFORU5UTFkAVE9PX0VBUkxZAE5PVElGWQBGQUlMRURfREVQRU5ERU5DWQBCQURfR0FURVdBWQBQTEFZAFBVVABDSEVDS09VVABHQVRFV0FZX1RJTUVPVVQAUkVRVUVTVF9USU1FT1VUAE5FVFdPUktfQ09OTkVDVF9USU1FT1VUAENPTk5FQ1RJT05fVElNRU9VVABMT0dJTl9USU1FT1VUAE5FVFdPUktfUkVBRF9USU1FT1VUAFBPU1QATUlTRElSRUNURURfUkVRVUVTVABDTElFTlRfQ0xPU0VEX1JFUVVFU1QAQ0xJRU5UX0NMT1NFRF9MT0FEX0JBTEFOQ0VEX1JFUVVFU1QAQkFEX1JFUVVFU1QASFRUUF9SRVFVRVNUX1NFTlRfVE9fSFRUUFNfUE9SVABSRVBPUlQASU1fQV9URUFQT1QAUkVTRVRfQ09OVEVOVABOT19DT05URU5UAFBBUlRJQUxfQ09OVEVOVABIUEVfSU5WQUxJRF9DT05TVEFOVABIUEVfQ0JfUkVTRVQAR0VUAEhQRV9TVFJJQ1QAQ09ORkxJQ1QAVEVNUE9SQVJZX1JFRElSRUNUAFBFUk1BTkVOVF9SRURJUkVDVABDT05ORUNUAE1VTFRJX1NUQVRVUwBIUEVfSU5WQUxJRF9TVEFUVVMAVE9PX01BTllfUkVRVUVTVFMARUFSTFlfSElOVFMAVU5BVkFJTEFCTEVfRk9SX0xFR0FMX1JFQVNPTlMAT1BUSU9OUwBTV0lUQ0hJTkdfUFJPVE9DT0xTAFZBUklBTlRfQUxTT19ORUdPVElBVEVTAE1VTFRJUExFX0NIT0lDRVMASU5URVJOQUxfU0VSVkVSX0VSUk9SAFdFQl9TRVJWRVJfVU5LTk9XTl9FUlJPUgBSQUlMR1VOX0VSUk9SAElERU5USVRZX1BST1ZJREVSX0FVVEhFTlRJQ0FUSU9OX0VSUk9SAFNTTF9DRVJUSUZJQ0FURV9FUlJPUgBJTlZBTElEX1hfRk9SV0FSREVEX0ZPUgBTRVRfUEFSQU1FVEVSAEdFVF9QQVJBTUVURVIASFBFX1VTRVIAU0VFX09USEVSAEhQRV9DQl9DSFVOS19IRUFERVIATUtDQUxFTkRBUgBTRVRVUABXRUJfU0VSVkVSX0lTX0RPV04AVEVBUkRPV04ASFBFX0NMT1NFRF9DT05ORUNUSU9OAEhFVVJJU1RJQ19FWFBJUkFUSU9OAERJU0NPTk5FQ1RFRF9PUEVSQVRJT04ATk9OX0FVVEhPUklUQVRJVkVfSU5GT1JNQVRJT04ASFBFX0lOVkFMSURfVkVSU0lPTgBIUEVfQ0JfTUVTU0FHRV9CRUdJTgBTSVRFX0lTX0ZST1pFTgBIUEVfSU5WQUxJRF9IRUFERVJfVE9LRU4ASU5WQUxJRF9UT0tFTgBGT1JCSURERU4ARU5IQU5DRV9ZT1VSX0NBTE0ASFBFX0lOVkFMSURfVVJMAEJMT0NLRURfQllfUEFSRU5UQUxfQ09OVFJPTABNS0NPTABBQ0wASFBFX0lOVEVSTkFMAFJFUVVFU1RfSEVBREVSX0ZJRUxEU19UT09fTEFSR0VfVU5PRkZJQ0lBTABIUEVfT0sAVU5MSU5LAFVOTE9DSwBQUkkAUkVUUllfV0lUSABIUEVfSU5WQUxJRF9DT05URU5UX0xFTkdUSABIUEVfVU5FWFBFQ1RFRF9DT05URU5UX0xFTkdUSABGTFVTSABQUk9QUEFUQ0gATS1TRUFSQ0gAVVJJX1RPT19MT05HAFBST0NFU1NJTkcATUlTQ0VMTEFORU9VU19QRVJTSVNURU5UX1dBUk5JTkcATUlTQ0VMTEFORU9VU19XQVJOSU5HAEhQRV9JTlZBTElEX1RSQU5TRkVSX0VOQ09ESU5HAEV4cGVjdGVkIENSTEYASFBFX0lOVkFMSURfQ0hVTktfU0laRQBNT1ZFAENPTlRJTlVFAEhQRV9DQl9TVEFUVVNfQ09NUExFVEUASFBFX0NCX0hFQURFUlNfQ09NUExFVEUASFBFX0NCX1ZFUlNJT05fQ09NUExFVEUASFBFX0NCX1VSTF9DT01QTEVURQBIUEVfQ0JfQ0hVTktfQ09NUExFVEUASFBFX0NCX0hFQURFUl9WQUxVRV9DT01QTEVURQBIUEVfQ0JfQ0hVTktfRVhURU5TSU9OX1ZBTFVFX0NPTVBMRVRFAEhQRV9DQl9DSFVOS19FWFRFTlNJT05fTkFNRV9DT01QTEVURQBIUEVfQ0JfTUVTU0FHRV9DT01QTEVURQBIUEVfQ0JfTUVUSE9EX0NPTVBMRVRFAEhQRV9DQl9IRUFERVJfRklFTERfQ09NUExFVEUAREVMRVRFAEhQRV9JTlZBTElEX0VPRl9TVEFURQBJTlZBTElEX1NTTF9DRVJUSUZJQ0FURQBQQVVTRQBOT19SRVNQT05TRQBVTlNVUFBPUlRFRF9NRURJQV9UWVBFAEdPTkUATk9UX0FDQ0VQVEFCTEUAU0VSVklDRV9VTkFWQUlMQUJMRQBSQU5HRV9OT1RfU0FUSVNGSUFCTEUAT1JJR0lOX0lTX1VOUkVBQ0hBQkxFAFJFU1BPTlNFX0lTX1NUQUxFAFBVUkdFAE1FUkdFAFJFUVVFU1RfSEVBREVSX0ZJRUxEU19UT09fTEFSR0UAUkVRVUVTVF9IRUFERVJfVE9PX0xBUkdFAFBBWUxPQURfVE9PX0xBUkdFAElOU1VGRklDSUVOVF9TVE9SQUdFAEhQRV9QQVVTRURfVVBHUkFERQBIUEVfUEFVU0VEX0gyX1VQR1JBREUAU09VUkNFAEFOTk9VTkNFAFRSQUNFAEhQRV9VTkVYUEVDVEVEX1NQQUNFAERFU0NSSUJFAFVOU1VCU0NSSUJFAFJFQ09SRABIUEVfSU5WQUxJRF9NRVRIT0QATk9UX0ZPVU5EAFBST1BGSU5EAFVOQklORABSRUJJTkQAVU5BVVRIT1JJWkVEAE1FVEhPRF9OT1RfQUxMT1dFRABIVFRQX1ZFUlNJT05fTk9UX1NVUFBPUlRFRABBTFJFQURZX1JFUE9SVEVEAEFDQ0VQVEVEAE5PVF9JTVBMRU1FTlRFRABMT09QX0RFVEVDVEVEAEhQRV9DUl9FWFBFQ1RFRABIUEVfTEZfRVhQRUNURUQAQ1JFQVRFRABJTV9VU0VEAEhQRV9QQVVTRUQAVElNRU9VVF9PQ0NVUkVEAFBBWU1FTlRfUkVRVUlSRUQAUFJFQ09ORElUSU9OX1JFUVVJUkVEAFBST1hZX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEAE5FVFdPUktfQVVUSEVOVElDQVRJT05fUkVRVUlSRUQATEVOR1RIX1JFUVVJUkVEAFNTTF9DRVJUSUZJQ0FURV9SRVFVSVJFRABVUEdSQURFX1JFUVVJUkVEAFBBR0VfRVhQSVJFRABQUkVDT05ESVRJT05fRkFJTEVEAEVYUEVDVEFUSU9OX0ZBSUxFRABSRVZBTElEQVRJT05fRkFJTEVEAFNTTF9IQU5EU0hBS0VfRkFJTEVEAExPQ0tFRABUUkFOU0ZPUk1BVElPTl9BUFBMSUVEAE5PVF9NT0RJRklFRABOT1RfRVhURU5ERUQAQkFORFdJRFRIX0xJTUlUX0VYQ0VFREVEAFNJVEVfSVNfT1ZFUkxPQURFRABIRUFEAEV4cGVjdGVkIEhUVFAvAABeEwAAJhMAADAQAADwFwAAnRMAABUSAAA5FwAA8BIAAAoQAAB1EgAArRIAAIITAABPFAAAfxAAAKAVAAAjFAAAiRIAAIsUAABNFQAA1BEAAM8UAAAQGAAAyRYAANwWAADBEQAA4BcAALsUAAB0FAAAfBUAAOUUAAAIFwAAHxAAAGUVAACjFAAAKBUAAAIVAACZFQAALBAAAIsZAABPDwAA1A4AAGoQAADOEAAAAhcAAIkOAABuEwAAHBMAAGYUAABWFwAAwRMAAM0TAABsEwAAaBcAAGYXAABfFwAAIhMAAM4PAABpDgAA2A4AAGMWAADLEwAAqg4AACgXAAAmFwAAxRMAAF0WAADoEQAAZxMAAGUTAADyFgAAcxMAAB0XAAD5FgAA8xEAAM8OAADOFQAADBIAALMRAAClEQAAYRAAADIXAAC7EwAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAgMCAgICAgAAAgIAAgIAAgICAgICAgICAgAEAAAAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAgICAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgICAgIAAAICAAICAAICAgICAgICAgIAAwAEAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgIAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsb3NlZWVwLWFsaXZlAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQEBAQEBAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQFjaHVua2VkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQABAQEBAQAAAQEAAQEAAQEBAQEBAQEBAQAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGVjdGlvbmVudC1sZW5ndGhvbnJveHktY29ubmVjdGlvbgAAAAAAAAAAAAAAAAAAAHJhbnNmZXItZW5jb2RpbmdwZ3JhZGUNCg0KDQpTTQ0KDQpUVFAvQ0UvVFNQLwAAAAAAAAAAAAAAAAECAAEDAAAAAAAAAAAAAAAAAAAAAAAABAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAABAgABAwAAAAAAAAAAAAAAAAAAAAAAAAQBAQUBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAABAAACAAAAAAAAAAAAAAAAAAAAAAAAAwQAAAQEBAQEBAQEBAQEBQQEBAQEBAQEBAQEBAAEAAYHBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQABAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAgAAAAACAAAAAAAAAAAAAAAAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE5PVU5DRUVDS09VVE5FQ1RFVEVDUklCRUxVU0hFVEVBRFNFQVJDSFJHRUNUSVZJVFlMRU5EQVJWRU9USUZZUFRJT05TQ0hTRUFZU1RBVENIR0VPUkRJUkVDVE9SVFJDSFBBUkFNRVRFUlVSQ0VCU0NSSUJFQVJET1dOQUNFSU5ETktDS1VCU0NSSUJFSFRUUC9BRFRQLw=="), Ri;
}
const ie = G, GE = G, ZB = G, { pipeline: $B } = G, ue = ke, Di = lB, _a = bB, XB = Io, {
  RequestContentLengthMismatchError: Dt,
  ResponseContentLengthMismatchError: KB,
  InvalidArgumentError: $e,
  RequestAbortedError: lc,
  HeadersTimeoutError: eI,
  HeadersOverflowError: AI,
  SocketError: Xr,
  InformationalError: Qt,
  BodyTimeoutError: tI,
  HTTPParserError: rI,
  ResponseExceededMaxSizeError: sI,
  ClientDestroyedError: nI
} = Me, oI = fo, {
  kUrl: QA,
  kReset: RA,
  kServerName: Vt,
  kClient: Ct,
  kBusy: va,
  kParser: je,
  kConnect: iI,
  kBlocking: Kr,
  kResuming: hr,
  kRunning: qe,
  kPending: Ir,
  kSize: Cr,
  kWriting: St,
  kQueue: Je,
  kConnected: aI,
  kConnecting: Vr,
  kNeedDrain: xt,
  kNoRef: vs,
  kKeepAliveDefaultTimeout: Ga,
  kHostHeader: ME,
  kPendingIdx: JA,
  kRunningIdx: Oe,
  kError: CA,
  kPipelining: jt,
  kSocket: ze,
  kKeepAliveTimeoutValue: Hs,
  kMaxHeadersSize: Xn,
  kKeepAliveMaxTimeout: YE,
  kKeepAliveTimeoutThreshold: PE,
  kHeadersTimeout: JE,
  kBodyTimeout: OE,
  kStrictContentLength: Vs,
  kConnector: Gs,
  kMaxRedirections: cI,
  kMaxRequests: Ws,
  kCounter: HE,
  kClose: gI,
  kDestroy: lI,
  kDispatch: uI,
  kInterceptors: EI,
  kLocalAddress: Ms,
  kMaxResponseSize: VE,
  kHTTPConnVersion: dt,
  // HTTP2
  kHost: WE,
  kHTTP2Session: OA,
  kHTTP2SessionState: co,
  kHTTP2BuildRequest: hI,
  kHTTP2CopyHeaders: QI,
  kHTTP1BuildRequest: CI
} = He;
let go;
try {
  go = G;
} catch {
  go = { constants: {} };
}
const {
  constants: {
    HTTP2_HEADER_AUTHORITY: dI,
    HTTP2_HEADER_METHOD: BI,
    HTTP2_HEADER_PATH: II,
    HTTP2_HEADER_SCHEME: fI,
    HTTP2_HEADER_CONTENT_LENGTH: pI,
    HTTP2_HEADER_EXPECT: mI,
    HTTP2_HEADER_STATUS: yI
  }
} = go;
let Vg = !1;
const Sn = Buffer[Symbol.species], Wt = Symbol("kClosedResolve"), IA = {};
try {
  const A = G;
  IA.sendHeaders = A.channel("undici:client:sendHeaders"), IA.beforeConnect = A.channel("undici:client:beforeConnect"), IA.connectError = A.channel("undici:client:connectError"), IA.connected = A.channel("undici:client:connected");
} catch {
  IA.sendHeaders = { hasSubscribers: !1 }, IA.beforeConnect = { hasSubscribers: !1 }, IA.connectError = { hasSubscribers: !1 }, IA.connected = { hasSubscribers: !1 };
}
let wI = class extends XB {
  /**
   *
   * @param {string|URL} url
   * @param {import('../types/client').Client.Options} options
   */
  constructor(e, {
    interceptors: t,
    maxHeaderSize: r,
    headersTimeout: s,
    socketTimeout: o,
    requestTimeout: i,
    connectTimeout: c,
    bodyTimeout: g,
    idleTimeout: u,
    keepAlive: l,
    keepAliveTimeout: h,
    maxKeepAliveTimeout: E,
    keepAliveMaxTimeout: f,
    keepAliveTimeoutThreshold: I,
    socketPath: C,
    pipelining: B,
    tls: p,
    strictContentLength: Q,
    maxCachedSessions: m,
    maxRedirections: w,
    connect: y,
    maxRequestsPerClient: b,
    localAddress: S,
    maxResponseSize: D,
    autoSelectFamily: N,
    autoSelectFamilyAttemptTimeout: v,
    // h2
    allowH2: _,
    maxConcurrentStreams: U
  } = {}) {
    if (super(), l !== void 0)
      throw new $e("unsupported keepAlive, use pipelining=0 instead");
    if (o !== void 0)
      throw new $e("unsupported socketTimeout, use headersTimeout & bodyTimeout instead");
    if (i !== void 0)
      throw new $e("unsupported requestTimeout, use headersTimeout & bodyTimeout instead");
    if (u !== void 0)
      throw new $e("unsupported idleTimeout, use keepAliveTimeout instead");
    if (E !== void 0)
      throw new $e("unsupported maxKeepAliveTimeout, use keepAliveMaxTimeout instead");
    if (r != null && !Number.isFinite(r))
      throw new $e("invalid maxHeaderSize");
    if (C != null && typeof C != "string")
      throw new $e("invalid socketPath");
    if (c != null && (!Number.isFinite(c) || c < 0))
      throw new $e("invalid connectTimeout");
    if (h != null && (!Number.isFinite(h) || h <= 0))
      throw new $e("invalid keepAliveTimeout");
    if (f != null && (!Number.isFinite(f) || f <= 0))
      throw new $e("invalid keepAliveMaxTimeout");
    if (I != null && !Number.isFinite(I))
      throw new $e("invalid keepAliveTimeoutThreshold");
    if (s != null && (!Number.isInteger(s) || s < 0))
      throw new $e("headersTimeout must be a positive integer or zero");
    if (g != null && (!Number.isInteger(g) || g < 0))
      throw new $e("bodyTimeout must be a positive integer or zero");
    if (y != null && typeof y != "function" && typeof y != "object")
      throw new $e("connect must be a function or an object");
    if (w != null && (!Number.isInteger(w) || w < 0))
      throw new $e("maxRedirections must be a positive number");
    if (b != null && (!Number.isInteger(b) || b < 0))
      throw new $e("maxRequestsPerClient must be a positive number");
    if (S != null && (typeof S != "string" || GE.isIP(S) === 0))
      throw new $e("localAddress must be valid string IP address");
    if (D != null && (!Number.isInteger(D) || D < -1))
      throw new $e("maxResponseSize must be a positive number");
    if (v != null && (!Number.isInteger(v) || v < -1))
      throw new $e("autoSelectFamilyAttemptTimeout must be a positive number");
    if (_ != null && typeof _ != "boolean")
      throw new $e("allowH2 must be a valid boolean value");
    if (U != null && (typeof U != "number" || U < 1))
      throw new $e("maxConcurrentStreams must be a possitive integer, greater than 0");
    typeof y != "function" && (y = oI({
      ...p,
      maxCachedSessions: m,
      allowH2: _,
      socketPath: C,
      timeout: c,
      ...ue.nodeHasAutoSelectFamily && N ? { autoSelectFamily: N, autoSelectFamilyAttemptTimeout: v } : void 0,
      ...y
    })), this[EI] = t && t.Client && Array.isArray(t.Client) ? t.Client : [kI({ maxRedirections: w })], this[QA] = ue.parseOrigin(e), this[Gs] = y, this[ze] = null, this[jt] = B ?? 1, this[Xn] = r || ZB.maxHeaderSize, this[Ga] = h ?? 4e3, this[YE] = f ?? 6e5, this[PE] = I ?? 1e3, this[Hs] = this[Ga], this[Vt] = null, this[Ms] = S ?? null, this[hr] = 0, this[xt] = 0, this[ME] = `host: ${this[QA].hostname}${this[QA].port ? `:${this[QA].port}` : ""}\r
`, this[OE] = g ?? 3e5, this[JE] = s ?? 3e5, this[Vs] = Q ?? !0, this[cI] = w, this[Ws] = b, this[Wt] = null, this[VE] = D > -1 ? D : -1, this[dt] = "h1", this[OA] = null, this[co] = _ ? {
      // streams: null, // Fixed queue of streams - For future support of `push`
      openStreams: 0,
      // Keep track of them to decide wether or not unref the session
      maxConcurrentStreams: U ?? 100
      // Max peerConcurrentStreams for a Node h2 server
    } : null, this[WE] = `${this[QA].hostname}${this[QA].port ? `:${this[QA].port}` : ""}`, this[Je] = [], this[Oe] = 0, this[JA] = 0;
  }
  get pipelining() {
    return this[jt];
  }
  set pipelining(e) {
    this[jt] = e, HA(this, !0);
  }
  get [Ir]() {
    return this[Je].length - this[JA];
  }
  get [qe]() {
    return this[JA] - this[Oe];
  }
  get [Cr]() {
    return this[Je].length - this[Oe];
  }
  get [aI]() {
    return !!this[ze] && !this[Vr] && !this[ze].destroyed;
  }
  get [va]() {
    const e = this[ze];
    return e && (e[RA] || e[St] || e[Kr]) || this[Cr] >= (this[jt] || 1) || this[Ir] > 0;
  }
  /* istanbul ignore: only used for test */
  [iI](e) {
    zE(this), this.once("connect", e);
  }
  [uI](e, t) {
    const r = e.origin || this[QA].origin, s = this[dt] === "h2" ? _a[hI](r, e, t) : _a[CI](r, e, t);
    return this[Je].push(s), this[hr] || (ue.bodyLength(s.body) == null && ue.isIterable(s.body) ? (this[hr] = 1, process.nextTick(HA, this)) : HA(this, !0)), this[hr] && this[xt] !== 2 && this[va] && (this[xt] = 2), this[xt] < 2;
  }
  async [gI]() {
    return new Promise((e) => {
      this[Cr] ? this[Wt] = e : e(null);
    });
  }
  async [lI](e) {
    return new Promise((t) => {
      const r = this[Je].splice(this[JA]);
      for (let o = 0; o < r.length; o++) {
        const i = r[o];
        DA(this, i, e);
      }
      const s = () => {
        this[Wt] && (this[Wt](), this[Wt] = null), t();
      };
      this[OA] != null && (ue.destroy(this[OA], e), this[OA] = null, this[co] = null), this[ze] ? ue.destroy(this[ze].on("close", s), e) : queueMicrotask(s), HA(this);
    });
  }
};
function bI(A) {
  ie(A.code !== "ERR_TLS_CERT_ALTNAME_INVALID"), this[ze][CA] = A, po(this[Ct], A);
}
function RI(A, e, t) {
  const r = new Qt(`HTTP/2: "frameError" received - type ${A}, code ${e}`);
  t === 0 && (this[ze][CA] = r, po(this[Ct], r));
}
function DI() {
  ue.destroy(this, new Xr("other side closed")), ue.destroy(this[ze], new Xr("other side closed"));
}
function SI(A) {
  const e = this[Ct], t = new Qt(`HTTP/2: "GOAWAY" frame received with code ${A}`);
  if (e[ze] = null, e[OA] = null, e.destroyed) {
    ie(this[Ir] === 0);
    const r = e[Je].splice(e[Oe]);
    for (let s = 0; s < r.length; s++) {
      const o = r[s];
      DA(this, o, t);
    }
  } else if (e[qe] > 0) {
    const r = e[Je][e[Oe]];
    e[Je][e[Oe]++] = null, DA(e, r, t);
  }
  e[JA] = e[Oe], ie(e[qe] === 0), e.emit(
    "disconnect",
    e[QA],
    [e],
    t
  ), HA(e);
}
const ct = PB(), kI = gc, FI = Buffer.alloc(0);
async function TI() {
  const A = process.env.JEST_WORKER_ID ? Og() : void 0;
  let e;
  try {
    e = await WebAssembly.compile(Buffer.from(zB(), "base64"));
  } catch {
    e = await WebAssembly.compile(Buffer.from(A || Og(), "base64"));
  }
  return await WebAssembly.instantiate(e, {
    env: {
      /* eslint-disable camelcase */
      wasm_on_url: (t, r, s) => 0,
      wasm_on_status: (t, r, s) => {
        ie.strictEqual(iA.ptr, t);
        const o = r - ut + lt.byteOffset;
        return iA.onStatus(new Sn(lt.buffer, o, s)) || 0;
      },
      wasm_on_message_begin: (t) => (ie.strictEqual(iA.ptr, t), iA.onMessageBegin() || 0),
      wasm_on_header_field: (t, r, s) => {
        ie.strictEqual(iA.ptr, t);
        const o = r - ut + lt.byteOffset;
        return iA.onHeaderField(new Sn(lt.buffer, o, s)) || 0;
      },
      wasm_on_header_value: (t, r, s) => {
        ie.strictEqual(iA.ptr, t);
        const o = r - ut + lt.byteOffset;
        return iA.onHeaderValue(new Sn(lt.buffer, o, s)) || 0;
      },
      wasm_on_headers_complete: (t, r, s, o) => (ie.strictEqual(iA.ptr, t), iA.onHeadersComplete(r, !!s, !!o) || 0),
      wasm_on_body: (t, r, s) => {
        ie.strictEqual(iA.ptr, t);
        const o = r - ut + lt.byteOffset;
        return iA.onBody(new Sn(lt.buffer, o, s)) || 0;
      },
      wasm_on_message_complete: (t) => (ie.strictEqual(iA.ptr, t), iA.onMessageComplete() || 0)
      /* eslint-enable camelcase */
    }
  });
}
let Si = null, Ma = TI();
Ma.catch();
let iA = null, lt = null, kn = 0, ut = null;
const es = 1, Kn = 2, Ya = 3;
class NI {
  constructor(e, t, { exports: r }) {
    ie(Number.isFinite(e[Xn]) && e[Xn] > 0), this.llhttp = r, this.ptr = this.llhttp.llhttp_alloc(ct.TYPE.RESPONSE), this.client = e, this.socket = t, this.timeout = null, this.timeoutValue = null, this.timeoutType = null, this.statusCode = null, this.statusText = "", this.upgrade = !1, this.headers = [], this.headersSize = 0, this.headersMaxSize = e[Xn], this.shouldKeepAlive = !1, this.paused = !1, this.resume = this.resume.bind(this), this.bytesRead = 0, this.keepAlive = "", this.contentLength = "", this.connection = "", this.maxResponseSize = e[VE];
  }
  setTimeout(e, t) {
    this.timeoutType = t, e !== this.timeoutValue ? (Di.clearTimeout(this.timeout), e ? (this.timeout = Di.setTimeout(UI, e, this), this.timeout.unref && this.timeout.unref()) : this.timeout = null, this.timeoutValue = e) : this.timeout && this.timeout.refresh && this.timeout.refresh();
  }
  resume() {
    this.socket.destroyed || !this.paused || (ie(this.ptr != null), ie(iA == null), this.llhttp.llhttp_resume(this.ptr), ie(this.timeoutType === Kn), this.timeout && this.timeout.refresh && this.timeout.refresh(), this.paused = !1, this.execute(this.socket.read() || FI), this.readMore());
  }
  readMore() {
    for (; !this.paused && this.ptr; ) {
      const e = this.socket.read();
      if (e === null)
        break;
      this.execute(e);
    }
  }
  execute(e) {
    ie(this.ptr != null), ie(iA == null), ie(!this.paused);
    const { socket: t, llhttp: r } = this;
    e.length > kn && (ut && r.free(ut), kn = Math.ceil(e.length / 4096) * 4096, ut = r.malloc(kn)), new Uint8Array(r.memory.buffer, ut, kn).set(e);
    try {
      let s;
      try {
        lt = e, iA = this, s = r.llhttp_execute(this.ptr, ut, e.length);
      } catch (i) {
        throw i;
      } finally {
        iA = null, lt = null;
      }
      const o = r.llhttp_get_error_pos(this.ptr) - ut;
      if (s === ct.ERROR.PAUSED_UPGRADE)
        this.onUpgrade(e.slice(o));
      else if (s === ct.ERROR.PAUSED)
        this.paused = !0, t.unshift(e.slice(o));
      else if (s !== ct.ERROR.OK) {
        const i = r.llhttp_get_error_reason(this.ptr);
        let c = "";
        if (i) {
          const g = new Uint8Array(r.memory.buffer, i).indexOf(0);
          c = "Response does not match the HTTP/1.1 protocol (" + Buffer.from(r.memory.buffer, i, g).toString() + ")";
        }
        throw new rI(c, ct.ERROR[s], e.slice(o));
      }
    } catch (s) {
      ue.destroy(t, s);
    }
  }
  destroy() {
    ie(this.ptr != null), ie(iA == null), this.llhttp.llhttp_free(this.ptr), this.ptr = null, Di.clearTimeout(this.timeout), this.timeout = null, this.timeoutValue = null, this.timeoutType = null, this.paused = !1;
  }
  onStatus(e) {
    this.statusText = e.toString();
  }
  onMessageBegin() {
    const { socket: e, client: t } = this;
    if (e.destroyed || !t[Je][t[Oe]])
      return -1;
  }
  onHeaderField(e) {
    const t = this.headers.length;
    t & 1 ? this.headers[t - 1] = Buffer.concat([this.headers[t - 1], e]) : this.headers.push(e), this.trackHeader(e.length);
  }
  onHeaderValue(e) {
    let t = this.headers.length;
    (t & 1) === 1 ? (this.headers.push(e), t += 1) : this.headers[t - 1] = Buffer.concat([this.headers[t - 1], e]);
    const r = this.headers[t - 2];
    r.length === 10 && r.toString().toLowerCase() === "keep-alive" ? this.keepAlive += e.toString() : r.length === 10 && r.toString().toLowerCase() === "connection" ? this.connection += e.toString() : r.length === 14 && r.toString().toLowerCase() === "content-length" && (this.contentLength += e.toString()), this.trackHeader(e.length);
  }
  trackHeader(e) {
    this.headersSize += e, this.headersSize >= this.headersMaxSize && ue.destroy(this.socket, new AI());
  }
  onUpgrade(e) {
    const { upgrade: t, client: r, socket: s, headers: o, statusCode: i } = this;
    ie(t);
    const c = r[Je][r[Oe]];
    ie(c), ie(!s.destroyed), ie(s === r[ze]), ie(!this.paused), ie(c.upgrade || c.method === "CONNECT"), this.statusCode = null, this.statusText = "", this.shouldKeepAlive = null, ie(this.headers.length % 2 === 0), this.headers = [], this.headersSize = 0, s.unshift(e), s[je].destroy(), s[je] = null, s[Ct] = null, s[CA] = null, s.removeListener("error", xE).removeListener("readable", qE).removeListener("end", jE).removeListener("close", Pa), r[ze] = null, r[Je][r[Oe]++] = null, r.emit("disconnect", r[QA], [r], new Qt("upgrade"));
    try {
      c.onUpgrade(i, o, s);
    } catch (g) {
      ue.destroy(s, g);
    }
    HA(r);
  }
  onHeadersComplete(e, t, r) {
    const { client: s, socket: o, headers: i, statusText: c } = this;
    if (o.destroyed)
      return -1;
    const g = s[Je][s[Oe]];
    if (!g)
      return -1;
    if (ie(!this.upgrade), ie(this.statusCode < 200), e === 100)
      return ue.destroy(o, new Xr("bad response", ue.getSocketInfo(o))), -1;
    if (t && !g.upgrade)
      return ue.destroy(o, new Xr("bad upgrade", ue.getSocketInfo(o))), -1;
    if (ie.strictEqual(this.timeoutType, es), this.statusCode = e, this.shouldKeepAlive = r || // Override llhttp value which does not allow keepAlive for HEAD.
    g.method === "HEAD" && !o[RA] && this.connection.toLowerCase() === "keep-alive", this.statusCode >= 200) {
      const l = g.bodyTimeout != null ? g.bodyTimeout : s[OE];
      this.setTimeout(l, Kn);
    } else this.timeout && this.timeout.refresh && this.timeout.refresh();
    if (g.method === "CONNECT")
      return ie(s[qe] === 1), this.upgrade = !0, 2;
    if (t)
      return ie(s[qe] === 1), this.upgrade = !0, 2;
    if (ie(this.headers.length % 2 === 0), this.headers = [], this.headersSize = 0, this.shouldKeepAlive && s[jt]) {
      const l = this.keepAlive ? ue.parseKeepAliveTimeout(this.keepAlive) : null;
      if (l != null) {
        const h = Math.min(
          l - s[PE],
          s[YE]
        );
        h <= 0 ? o[RA] = !0 : s[Hs] = h;
      } else
        s[Hs] = s[Ga];
    } else
      o[RA] = !0;
    const u = g.onHeaders(e, i, this.resume, c) === !1;
    return g.aborted ? -1 : g.method === "HEAD" || e < 200 ? 1 : (o[Kr] && (o[Kr] = !1, HA(s)), u ? ct.ERROR.PAUSED : 0);
  }
  onBody(e) {
    const { client: t, socket: r, statusCode: s, maxResponseSize: o } = this;
    if (r.destroyed)
      return -1;
    const i = t[Je][t[Oe]];
    if (ie(i), ie.strictEqual(this.timeoutType, Kn), this.timeout && this.timeout.refresh && this.timeout.refresh(), ie(s >= 200), o > -1 && this.bytesRead + e.length > o)
      return ue.destroy(r, new sI()), -1;
    if (this.bytesRead += e.length, i.onData(e) === !1)
      return ct.ERROR.PAUSED;
  }
  onMessageComplete() {
    const { client: e, socket: t, statusCode: r, upgrade: s, headers: o, contentLength: i, bytesRead: c, shouldKeepAlive: g } = this;
    if (t.destroyed && (!r || g))
      return -1;
    if (s)
      return;
    const u = e[Je][e[Oe]];
    if (ie(u), ie(r >= 100), this.statusCode = null, this.statusText = "", this.bytesRead = 0, this.contentLength = "", this.keepAlive = "", this.connection = "", ie(this.headers.length % 2 === 0), this.headers = [], this.headersSize = 0, !(r < 200)) {
      if (u.method !== "HEAD" && i && c !== parseInt(i, 10))
        return ue.destroy(t, new KB()), -1;
      if (u.onComplete(o), e[Je][e[Oe]++] = null, t[St])
        return ie.strictEqual(e[qe], 0), ue.destroy(t, new Qt("reset")), ct.ERROR.PAUSED;
      if (g) {
        if (t[RA] && e[qe] === 0)
          return ue.destroy(t, new Qt("reset")), ct.ERROR.PAUSED;
        e[jt] === 1 ? setImmediate(HA, e) : HA(e);
      } else return ue.destroy(t, new Qt("reset")), ct.ERROR.PAUSED;
    }
  }
}
function UI(A) {
  const { socket: e, timeoutType: t, client: r } = A;
  t === es ? (!e[St] || e.writableNeedDrain || r[qe] > 1) && (ie(!A.paused, "cannot be paused while waiting for headers"), ue.destroy(e, new eI())) : t === Kn ? A.paused || ue.destroy(e, new tI()) : t === Ya && (ie(r[qe] === 0 && r[Hs]), ue.destroy(e, new Qt("socket idle timeout")));
}
function qE() {
  const { [je]: A } = this;
  A && A.readMore();
}
function xE(A) {
  const { [Ct]: e, [je]: t } = this;
  if (ie(A.code !== "ERR_TLS_CERT_ALTNAME_INVALID"), e[dt] !== "h2" && A.code === "ECONNRESET" && t.statusCode && !t.shouldKeepAlive) {
    t.onMessageComplete();
    return;
  }
  this[CA] = A, po(this[Ct], A);
}
function po(A, e) {
  if (A[qe] === 0 && e.code !== "UND_ERR_INFO" && e.code !== "UND_ERR_SOCKET") {
    ie(A[JA] === A[Oe]);
    const t = A[Je].splice(A[Oe]);
    for (let r = 0; r < t.length; r++) {
      const s = t[r];
      DA(A, s, e);
    }
    ie(A[Cr] === 0);
  }
}
function jE() {
  const { [je]: A, [Ct]: e } = this;
  if (e[dt] !== "h2" && A.statusCode && !A.shouldKeepAlive) {
    A.onMessageComplete();
    return;
  }
  ue.destroy(this, new Xr("other side closed", ue.getSocketInfo(this)));
}
function Pa() {
  const { [Ct]: A, [je]: e } = this;
  A[dt] === "h1" && e && (!this[CA] && e.statusCode && !e.shouldKeepAlive && e.onMessageComplete(), this[je].destroy(), this[je] = null);
  const t = this[CA] || new Xr("closed", ue.getSocketInfo(this));
  if (A[ze] = null, A.destroyed) {
    ie(A[Ir] === 0);
    const r = A[Je].splice(A[Oe]);
    for (let s = 0; s < r.length; s++) {
      const o = r[s];
      DA(A, o, t);
    }
  } else if (A[qe] > 0 && t.code !== "UND_ERR_INFO") {
    const r = A[Je][A[Oe]];
    A[Je][A[Oe]++] = null, DA(A, r, t);
  }
  A[JA] = A[Oe], ie(A[qe] === 0), A.emit("disconnect", A[QA], [A], t), HA(A);
}
async function zE(A) {
  ie(!A[Vr]), ie(!A[ze]);
  let { host: e, hostname: t, protocol: r, port: s } = A[QA];
  if (t[0] === "[") {
    const o = t.indexOf("]");
    ie(o !== -1);
    const i = t.substring(1, o);
    ie(GE.isIP(i)), t = i;
  }
  A[Vr] = !0, IA.beforeConnect.hasSubscribers && IA.beforeConnect.publish({
    connectParams: {
      host: e,
      hostname: t,
      protocol: r,
      port: s,
      servername: A[Vt],
      localAddress: A[Ms]
    },
    connector: A[Gs]
  });
  try {
    const o = await new Promise((c, g) => {
      A[Gs]({
        host: e,
        hostname: t,
        protocol: r,
        port: s,
        servername: A[Vt],
        localAddress: A[Ms]
      }, (u, l) => {
        u ? g(u) : c(l);
      });
    });
    if (A.destroyed) {
      ue.destroy(o.on("error", () => {
      }), new nI());
      return;
    }
    if (A[Vr] = !1, ie(o), o.alpnProtocol === "h2") {
      Vg || (Vg = !0, process.emitWarning("H2 support is experimental, expect them to change at any time.", {
        code: "UNDICI-H2"
      }));
      const c = go.connect(A[QA], {
        createConnection: () => o,
        peerMaxConcurrentStreams: A[co].maxConcurrentStreams
      });
      A[dt] = "h2", c[Ct] = A, c[ze] = o, c.on("error", bI), c.on("frameError", RI), c.on("end", DI), c.on("goaway", SI), c.on("close", Pa), c.unref(), A[OA] = c, o[OA] = c;
    } else
      Si || (Si = await Ma, Ma = null), o[vs] = !1, o[St] = !1, o[RA] = !1, o[Kr] = !1, o[je] = new NI(A, o, Si);
    o[HE] = 0, o[Ws] = A[Ws], o[Ct] = A, o[CA] = null, o.on("error", xE).on("readable", qE).on("end", jE).on("close", Pa), A[ze] = o, IA.connected.hasSubscribers && IA.connected.publish({
      connectParams: {
        host: e,
        hostname: t,
        protocol: r,
        port: s,
        servername: A[Vt],
        localAddress: A[Ms]
      },
      connector: A[Gs],
      socket: o
    }), A.emit("connect", A[QA], [A]);
  } catch (o) {
    if (A.destroyed)
      return;
    if (A[Vr] = !1, IA.connectError.hasSubscribers && IA.connectError.publish({
      connectParams: {
        host: e,
        hostname: t,
        protocol: r,
        port: s,
        servername: A[Vt],
        localAddress: A[Ms]
      },
      connector: A[Gs],
      error: o
    }), o.code === "ERR_TLS_CERT_ALTNAME_INVALID")
      for (ie(A[qe] === 0); A[Ir] > 0 && A[Je][A[JA]].servername === A[Vt]; ) {
        const i = A[Je][A[JA]++];
        DA(A, i, o);
      }
    else
      po(A, o);
    A.emit("connectionError", A[QA], [A], o);
  }
  HA(A);
}
function Wg(A) {
  A[xt] = 0, A.emit("drain", A[QA], [A]);
}
function HA(A, e) {
  A[hr] !== 2 && (A[hr] = 2, LI(A, e), A[hr] = 0, A[Oe] > 256 && (A[Je].splice(0, A[Oe]), A[JA] -= A[Oe], A[Oe] = 0));
}
function LI(A, e) {
  for (; ; ) {
    if (A.destroyed) {
      ie(A[Ir] === 0);
      return;
    }
    if (A[Wt] && !A[Cr]) {
      A[Wt](), A[Wt] = null;
      return;
    }
    const t = A[ze];
    if (t && !t.destroyed && t.alpnProtocol !== "h2") {
      if (A[Cr] === 0 ? !t[vs] && t.unref && (t.unref(), t[vs] = !0) : t[vs] && t.ref && (t.ref(), t[vs] = !1), A[Cr] === 0)
        t[je].timeoutType !== Ya && t[je].setTimeout(A[Hs], Ya);
      else if (A[qe] > 0 && t[je].statusCode < 200 && t[je].timeoutType !== es) {
        const s = A[Je][A[Oe]], o = s.headersTimeout != null ? s.headersTimeout : A[JE];
        t[je].setTimeout(o, es);
      }
    }
    if (A[va])
      A[xt] = 2;
    else if (A[xt] === 2) {
      e ? (A[xt] = 1, process.nextTick(Wg, A)) : Wg(A);
      continue;
    }
    if (A[Ir] === 0 || A[qe] >= (A[jt] || 1))
      return;
    const r = A[Je][A[JA]];
    if (A[QA].protocol === "https:" && A[Vt] !== r.servername) {
      if (A[qe] > 0)
        return;
      if (A[Vt] = r.servername, t && t.servername !== r.servername) {
        ue.destroy(t, new Qt("servername changed"));
        return;
      }
    }
    if (A[Vr])
      return;
    if (!t && !A[OA]) {
      zE(A);
      return;
    }
    if (t.destroyed || t[St] || t[RA] || t[Kr] || A[qe] > 0 && !r.idempotent || A[qe] > 0 && (r.upgrade || r.method === "CONNECT") || A[qe] > 0 && ue.bodyLength(r.body) !== 0 && (ue.isStream(r.body) || ue.isAsyncIterable(r.body)))
      return;
    !r.aborted && _I(A, r) ? A[JA]++ : A[Je].splice(A[JA], 1);
  }
}
function ZE(A) {
  return A !== "GET" && A !== "HEAD" && A !== "OPTIONS" && A !== "TRACE" && A !== "CONNECT";
}
function _I(A, e) {
  if (A[dt] === "h2") {
    vI(A, A[OA], e);
    return;
  }
  const { body: t, method: r, path: s, host: o, upgrade: i, headers: c, blocking: g, reset: u } = e, l = r === "PUT" || r === "POST" || r === "PATCH";
  t && typeof t.read == "function" && t.read(0);
  const h = ue.bodyLength(t);
  let E = h;
  if (E === null && (E = e.contentLength), E === 0 && !l && (E = null), ZE(r) && E > 0 && e.contentLength !== null && e.contentLength !== E) {
    if (A[Vs])
      return DA(A, e, new Dt()), !1;
    process.emitWarning(new Dt());
  }
  const f = A[ze];
  try {
    e.onConnect((C) => {
      e.aborted || e.completed || (DA(A, e, C || new lc()), ue.destroy(f, new Qt("aborted")));
    });
  } catch (C) {
    DA(A, e, C);
  }
  if (e.aborted)
    return !1;
  r === "HEAD" && (f[RA] = !0), (i || r === "CONNECT") && (f[RA] = !0), u != null && (f[RA] = u), A[Ws] && f[HE]++ >= A[Ws] && (f[RA] = !0), g && (f[Kr] = !0);
  let I = `${r} ${s} HTTP/1.1\r
`;
  return typeof o == "string" ? I += `host: ${o}\r
` : I += A[ME], i ? I += `connection: upgrade\r
upgrade: ${i}\r
` : A[jt] && !f[RA] ? I += `connection: keep-alive\r
` : I += `connection: close\r
`, c && (I += c), IA.sendHeaders.hasSubscribers && IA.sendHeaders.publish({ request: e, headers: I, socket: f }), !t || h === 0 ? (E === 0 ? f.write(`${I}content-length: 0\r
\r
`, "latin1") : (ie(E === null, "no body must not have content length"), f.write(`${I}\r
`, "latin1")), e.onRequestSent()) : ue.isBuffer(t) ? (ie(E === t.byteLength, "buffer body must have content length"), f.cork(), f.write(`${I}content-length: ${E}\r
\r
`, "latin1"), f.write(t), f.uncork(), e.onBodySent(t), e.onRequestSent(), l || (f[RA] = !0)) : ue.isBlobLike(t) ? typeof t.stream == "function" ? lo({ body: t.stream(), client: A, request: e, socket: f, contentLength: E, header: I, expectsPayload: l }) : XE({ body: t, client: A, request: e, socket: f, contentLength: E, header: I, expectsPayload: l }) : ue.isStream(t) ? $E({ body: t, client: A, request: e, socket: f, contentLength: E, header: I, expectsPayload: l }) : ue.isIterable(t) ? lo({ body: t, client: A, request: e, socket: f, contentLength: E, header: I, expectsPayload: l }) : ie(!1), !0;
}
function vI(A, e, t) {
  const { body: r, method: s, path: o, host: i, upgrade: c, expectContinue: g, signal: u, headers: l } = t;
  let h;
  if (typeof l == "string" ? h = _a[QI](l.trim()) : h = l, c)
    return DA(A, t, new Error("Upgrade not supported for H2")), !1;
  try {
    t.onConnect((Q) => {
      t.aborted || t.completed || DA(A, t, Q || new lc());
    });
  } catch (Q) {
    DA(A, t, Q);
  }
  if (t.aborted)
    return !1;
  let E;
  const f = A[co];
  if (h[dI] = i || A[WE], h[BI] = s, s === "CONNECT")
    return e.ref(), E = e.request(h, { endStream: !1, signal: u }), E.id && !E.pending ? (t.onUpgrade(null, null, E), ++f.openStreams) : E.once("ready", () => {
      t.onUpgrade(null, null, E), ++f.openStreams;
    }), E.once("close", () => {
      f.openStreams -= 1, f.openStreams === 0 && e.unref();
    }), !0;
  h[II] = o, h[fI] = "https";
  const I = s === "PUT" || s === "POST" || s === "PATCH";
  r && typeof r.read == "function" && r.read(0);
  let C = ue.bodyLength(r);
  if (C == null && (C = t.contentLength), (C === 0 || !I) && (C = null), ZE(s) && C > 0 && t.contentLength != null && t.contentLength !== C) {
    if (A[Vs])
      return DA(A, t, new Dt()), !1;
    process.emitWarning(new Dt());
  }
  C != null && (ie(r, "no body must not have content length"), h[pI] = `${C}`), e.ref();
  const B = s === "GET" || s === "HEAD";
  return g ? (h[mI] = "100-continue", E = e.request(h, { endStream: B, signal: u }), E.once("continue", p)) : (E = e.request(h, {
    endStream: B,
    signal: u
  }), p()), ++f.openStreams, E.once("response", (Q) => {
    const { [yI]: m, ...w } = Q;
    t.onHeaders(Number(m), w, E.resume.bind(E), "") === !1 && E.pause();
  }), E.once("end", () => {
    t.onComplete([]);
  }), E.on("data", (Q) => {
    t.onData(Q) === !1 && E.pause();
  }), E.once("close", () => {
    f.openStreams -= 1, f.openStreams === 0 && e.unref();
  }), E.once("error", function(Q) {
    A[OA] && !A[OA].destroyed && !this.closed && !this.destroyed && (f.streams -= 1, ue.destroy(E, Q));
  }), E.once("frameError", (Q, m) => {
    const w = new Qt(`HTTP/2: "frameError" received - type ${Q}, code ${m}`);
    DA(A, t, w), A[OA] && !A[OA].destroyed && !this.closed && !this.destroyed && (f.streams -= 1, ue.destroy(E, w));
  }), !0;
  function p() {
    r ? ue.isBuffer(r) ? (ie(C === r.byteLength, "buffer body must have content length"), E.cork(), E.write(r), E.uncork(), E.end(), t.onBodySent(r), t.onRequestSent()) : ue.isBlobLike(r) ? typeof r.stream == "function" ? lo({
      client: A,
      request: t,
      contentLength: C,
      h2stream: E,
      expectsPayload: I,
      body: r.stream(),
      socket: A[ze],
      header: ""
    }) : XE({
      body: r,
      client: A,
      request: t,
      contentLength: C,
      expectsPayload: I,
      h2stream: E,
      header: "",
      socket: A[ze]
    }) : ue.isStream(r) ? $E({
      body: r,
      client: A,
      request: t,
      contentLength: C,
      expectsPayload: I,
      socket: A[ze],
      h2stream: E,
      header: ""
    }) : ue.isIterable(r) ? lo({
      body: r,
      client: A,
      request: t,
      contentLength: C,
      expectsPayload: I,
      header: "",
      h2stream: E,
      socket: A[ze]
    }) : ie(!1) : t.onRequestSent();
  }
}
function $E({ h2stream: A, body: e, client: t, request: r, socket: s, contentLength: o, header: i, expectsPayload: c }) {
  if (ie(o !== 0 || t[qe] === 0, "stream body cannot be pipelined"), t[dt] === "h2") {
    let C = function(B) {
      r.onBodySent(B);
    };
    const I = $B(
      e,
      A,
      (B) => {
        B ? (ue.destroy(e, B), ue.destroy(A, B)) : r.onRequestSent();
      }
    );
    I.on("data", C), I.once("end", () => {
      I.removeListener("data", C), ue.destroy(I);
    });
    return;
  }
  let g = !1;
  const u = new KE({ socket: s, request: r, contentLength: o, client: t, expectsPayload: c, header: i }), l = function(I) {
    if (!g)
      try {
        !u.write(I) && this.pause && this.pause();
      } catch (C) {
        ue.destroy(this, C);
      }
  }, h = function() {
    g || e.resume && e.resume();
  }, E = function() {
    if (g)
      return;
    const I = new lc();
    queueMicrotask(() => f(I));
  }, f = function(I) {
    if (!g) {
      if (g = !0, ie(s.destroyed || s[St] && t[qe] <= 1), s.off("drain", h).off("error", f), e.removeListener("data", l).removeListener("end", f).removeListener("error", f).removeListener("close", E), !I)
        try {
          u.end();
        } catch (C) {
          I = C;
        }
      u.destroy(I), I && (I.code !== "UND_ERR_INFO" || I.message !== "reset") ? ue.destroy(e, I) : ue.destroy(e);
    }
  };
  e.on("data", l).on("end", f).on("error", f).on("close", E), e.resume && e.resume(), s.on("drain", h).on("error", f);
}
async function XE({ h2stream: A, body: e, client: t, request: r, socket: s, contentLength: o, header: i, expectsPayload: c }) {
  ie(o === e.size, "blob body must have content length");
  const g = t[dt] === "h2";
  try {
    if (o != null && o !== e.size)
      throw new Dt();
    const u = Buffer.from(await e.arrayBuffer());
    g ? (A.cork(), A.write(u), A.uncork()) : (s.cork(), s.write(`${i}content-length: ${o}\r
\r
`, "latin1"), s.write(u), s.uncork()), r.onBodySent(u), r.onRequestSent(), c || (s[RA] = !0), HA(t);
  } catch (u) {
    ue.destroy(g ? A : s, u);
  }
}
async function lo({ h2stream: A, body: e, client: t, request: r, socket: s, contentLength: o, header: i, expectsPayload: c }) {
  ie(o !== 0 || t[qe] === 0, "iterator body cannot be pipelined");
  let g = null;
  function u() {
    if (g) {
      const E = g;
      g = null, E();
    }
  }
  const l = () => new Promise((E, f) => {
    ie(g === null), s[CA] ? f(s[CA]) : g = E;
  });
  if (t[dt] === "h2") {
    A.on("close", u).on("drain", u);
    try {
      for await (const E of e) {
        if (s[CA])
          throw s[CA];
        const f = A.write(E);
        r.onBodySent(E), f || await l();
      }
    } catch (E) {
      A.destroy(E);
    } finally {
      r.onRequestSent(), A.end(), A.off("close", u).off("drain", u);
    }
    return;
  }
  s.on("close", u).on("drain", u);
  const h = new KE({ socket: s, request: r, contentLength: o, client: t, expectsPayload: c, header: i });
  try {
    for await (const E of e) {
      if (s[CA])
        throw s[CA];
      h.write(E) || await l();
    }
    h.end();
  } catch (E) {
    h.destroy(E);
  } finally {
    s.off("close", u).off("drain", u);
  }
}
class KE {
  constructor({ socket: e, request: t, contentLength: r, client: s, expectsPayload: o, header: i }) {
    this.socket = e, this.request = t, this.contentLength = r, this.client = s, this.bytesWritten = 0, this.expectsPayload = o, this.header = i, e[St] = !0;
  }
  write(e) {
    const { socket: t, request: r, contentLength: s, client: o, bytesWritten: i, expectsPayload: c, header: g } = this;
    if (t[CA])
      throw t[CA];
    if (t.destroyed)
      return !1;
    const u = Buffer.byteLength(e);
    if (!u)
      return !0;
    if (s !== null && i + u > s) {
      if (o[Vs])
        throw new Dt();
      process.emitWarning(new Dt());
    }
    t.cork(), i === 0 && (c || (t[RA] = !0), s === null ? t.write(`${g}transfer-encoding: chunked\r
`, "latin1") : t.write(`${g}content-length: ${s}\r
\r
`, "latin1")), s === null && t.write(`\r
${u.toString(16)}\r
`, "latin1"), this.bytesWritten += u;
    const l = t.write(e);
    return t.uncork(), r.onBodySent(e), l || t[je].timeout && t[je].timeoutType === es && t[je].timeout.refresh && t[je].timeout.refresh(), l;
  }
  end() {
    const { socket: e, contentLength: t, client: r, bytesWritten: s, expectsPayload: o, header: i, request: c } = this;
    if (c.onRequestSent(), e[St] = !1, e[CA])
      throw e[CA];
    if (!e.destroyed) {
      if (s === 0 ? o ? e.write(`${i}content-length: 0\r
\r
`, "latin1") : e.write(`${i}\r
`, "latin1") : t === null && e.write(`\r
0\r
\r
`, "latin1"), t !== null && s !== t) {
        if (r[Vs])
          throw new Dt();
        process.emitWarning(new Dt());
      }
      e[je].timeout && e[je].timeoutType === es && e[je].timeout.refresh && e[je].timeout.refresh(), HA(r);
    }
  }
  destroy(e) {
    const { socket: t, client: r } = this;
    t[St] = !1, e && (ie(r[qe] <= 1, "pipeline should only contain this request"), ue.destroy(t, e));
  }
}
function DA(A, e, t) {
  try {
    e.onError(t), ie(e.aborted);
  } catch (r) {
    A.emit("error", r);
  }
}
var mo = wI;
const eh = 2048, ki = eh - 1;
class qg {
  constructor() {
    this.bottom = 0, this.top = 0, this.list = new Array(eh), this.next = null;
  }
  isEmpty() {
    return this.top === this.bottom;
  }
  isFull() {
    return (this.top + 1 & ki) === this.bottom;
  }
  push(e) {
    this.list[this.top] = e, this.top = this.top + 1 & ki;
  }
  shift() {
    const e = this.list[this.bottom];
    return e === void 0 ? null : (this.list[this.bottom] = void 0, this.bottom = this.bottom + 1 & ki, e);
  }
}
var GI = class {
  constructor() {
    this.head = this.tail = new qg();
  }
  isEmpty() {
    return this.head.isEmpty();
  }
  push(e) {
    this.head.isFull() && (this.head = this.head.next = new qg()), this.head.push(e);
  }
  shift() {
    const e = this.tail, t = e.shift();
    return e.isEmpty() && e.next !== null && (this.tail = e.next), t;
  }
};
const { kFree: MI, kConnected: YI, kPending: PI, kQueued: JI, kRunning: OI, kSize: HI } = He, nr = Symbol("pool");
let VI = class {
  constructor(e) {
    this[nr] = e;
  }
  get connected() {
    return this[nr][YI];
  }
  get free() {
    return this[nr][MI];
  }
  get pending() {
    return this[nr][PI];
  }
  get queued() {
    return this[nr][JI];
  }
  get running() {
    return this[nr][OI];
  }
  get size() {
    return this[nr][HI];
  }
};
var WI = VI;
const qI = Io, xI = GI, { kConnected: Fi, kSize: xg, kRunning: jg, kPending: zg, kQueued: Ds, kBusy: jI, kFree: zI, kUrl: ZI, kClose: $I, kDestroy: XI, kDispatch: KI } = He, ef = WI, TA = Symbol("clients"), bA = Symbol("needDrain"), Ss = Symbol("queue"), Ti = Symbol("closed resolve"), Ni = Symbol("onDrain"), Zg = Symbol("onConnect"), $g = Symbol("onDisconnect"), Xg = Symbol("onConnectionError"), Ja = Symbol("get dispatcher"), Ah = Symbol("add client"), th = Symbol("remove client"), Kg = Symbol("stats");
let Af = class extends qI {
  constructor() {
    super(), this[Ss] = new xI(), this[TA] = [], this[Ds] = 0;
    const e = this;
    this[Ni] = function(r, s) {
      const o = e[Ss];
      let i = !1;
      for (; !i; ) {
        const c = o.shift();
        if (!c)
          break;
        e[Ds]--, i = !this.dispatch(c.opts, c.handler);
      }
      this[bA] = i, !this[bA] && e[bA] && (e[bA] = !1, e.emit("drain", r, [e, ...s])), e[Ti] && o.isEmpty() && Promise.all(e[TA].map((c) => c.close())).then(e[Ti]);
    }, this[Zg] = (t, r) => {
      e.emit("connect", t, [e, ...r]);
    }, this[$g] = (t, r, s) => {
      e.emit("disconnect", t, [e, ...r], s);
    }, this[Xg] = (t, r, s) => {
      e.emit("connectionError", t, [e, ...r], s);
    }, this[Kg] = new ef(this);
  }
  get [jI]() {
    return this[bA];
  }
  get [Fi]() {
    return this[TA].filter((e) => e[Fi]).length;
  }
  get [zI]() {
    return this[TA].filter((e) => e[Fi] && !e[bA]).length;
  }
  get [zg]() {
    let e = this[Ds];
    for (const { [zg]: t } of this[TA])
      e += t;
    return e;
  }
  get [jg]() {
    let e = 0;
    for (const { [jg]: t } of this[TA])
      e += t;
    return e;
  }
  get [xg]() {
    let e = this[Ds];
    for (const { [xg]: t } of this[TA])
      e += t;
    return e;
  }
  get stats() {
    return this[Kg];
  }
  async [$I]() {
    return this[Ss].isEmpty() ? Promise.all(this[TA].map((e) => e.close())) : new Promise((e) => {
      this[Ti] = e;
    });
  }
  async [XI](e) {
    for (; ; ) {
      const t = this[Ss].shift();
      if (!t)
        break;
      t.handler.onError(e);
    }
    return Promise.all(this[TA].map((t) => t.destroy(e)));
  }
  [KI](e, t) {
    const r = this[Ja]();
    return r ? r.dispatch(e, t) || (r[bA] = !0, this[bA] = !this[Ja]()) : (this[bA] = !0, this[Ss].push({ opts: e, handler: t }), this[Ds]++), !this[bA];
  }
  [Ah](e) {
    return e.on("drain", this[Ni]).on("connect", this[Zg]).on("disconnect", this[$g]).on("connectionError", this[Xg]), this[TA].push(e), this[bA] && process.nextTick(() => {
      this[bA] && this[Ni](e[ZI], [this, e]);
    }), this;
  }
  [th](e) {
    e.close(() => {
      const t = this[TA].indexOf(e);
      t !== -1 && this[TA].splice(t, 1);
    }), this[bA] = this[TA].some((t) => !t[bA] && t.closed !== !0 && t.destroyed !== !0);
  }
};
var rh = {
  PoolBase: Af,
  kClients: TA,
  kNeedDrain: bA,
  kAddClient: Ah,
  kRemoveClient: th,
  kGetDispatcher: Ja
};
const {
  PoolBase: tf,
  kClients: el,
  kNeedDrain: rf,
  kAddClient: sf,
  kGetDispatcher: nf
} = rh, of = mo, {
  InvalidArgumentError: Ui
} = Me, Li = ke, { kUrl: Al, kInterceptors: af } = He, cf = fo, _i = Symbol("options"), vi = Symbol("connections"), tl = Symbol("factory");
function gf(A, e) {
  return new of(A, e);
}
let lf = class extends tf {
  constructor(e, {
    connections: t,
    factory: r = gf,
    connect: s,
    connectTimeout: o,
    tls: i,
    maxCachedSessions: c,
    socketPath: g,
    autoSelectFamily: u,
    autoSelectFamilyAttemptTimeout: l,
    allowH2: h,
    ...E
  } = {}) {
    if (super(), t != null && (!Number.isFinite(t) || t < 0))
      throw new Ui("invalid connections");
    if (typeof r != "function")
      throw new Ui("factory must be a function.");
    if (s != null && typeof s != "function" && typeof s != "object")
      throw new Ui("connect must be a function or an object");
    typeof s != "function" && (s = cf({
      ...i,
      maxCachedSessions: c,
      allowH2: h,
      socketPath: g,
      timeout: o,
      ...Li.nodeHasAutoSelectFamily && u ? { autoSelectFamily: u, autoSelectFamilyAttemptTimeout: l } : void 0,
      ...s
    })), this[af] = E.interceptors && E.interceptors.Pool && Array.isArray(E.interceptors.Pool) ? E.interceptors.Pool : [], this[vi] = t || null, this[Al] = Li.parseOrigin(e), this[_i] = { ...Li.deepClone(E), connect: s, allowH2: h }, this[_i].interceptors = E.interceptors ? { ...E.interceptors } : void 0, this[tl] = r;
  }
  [nf]() {
    let e = this[el].find((t) => !t[rf]);
    return e || ((!this[vi] || this[el].length < this[vi]) && (e = this[tl](this[Al], this[_i]), this[sf](e)), e);
  }
};
var zs = lf;
const {
  BalancedPoolMissingUpstreamError: uf,
  InvalidArgumentError: Ef
} = Me, {
  PoolBase: hf,
  kClients: mA,
  kNeedDrain: ks,
  kAddClient: Qf,
  kRemoveClient: Cf,
  kGetDispatcher: df
} = rh, Bf = zs, { kUrl: Gi, kInterceptors: If } = He, { parseOrigin: rl } = ke, sl = Symbol("factory"), Fn = Symbol("options"), nl = Symbol("kGreatestCommonDivisor"), or = Symbol("kCurrentWeight"), ir = Symbol("kIndex"), xA = Symbol("kWeight"), Tn = Symbol("kMaxWeightPerServer"), Nn = Symbol("kErrorPenalty");
function sh(A, e) {
  return e === 0 ? A : sh(e, A % e);
}
function ff(A, e) {
  return new Bf(A, e);
}
let pf = class extends hf {
  constructor(e = [], { factory: t = ff, ...r } = {}) {
    if (super(), this[Fn] = r, this[ir] = -1, this[or] = 0, this[Tn] = this[Fn].maxWeightPerServer || 100, this[Nn] = this[Fn].errorPenalty || 15, Array.isArray(e) || (e = [e]), typeof t != "function")
      throw new Ef("factory must be a function.");
    this[If] = r.interceptors && r.interceptors.BalancedPool && Array.isArray(r.interceptors.BalancedPool) ? r.interceptors.BalancedPool : [], this[sl] = t;
    for (const s of e)
      this.addUpstream(s);
    this._updateBalancedPoolStats();
  }
  addUpstream(e) {
    const t = rl(e).origin;
    if (this[mA].find((s) => s[Gi].origin === t && s.closed !== !0 && s.destroyed !== !0))
      return this;
    const r = this[sl](t, Object.assign({}, this[Fn]));
    this[Qf](r), r.on("connect", () => {
      r[xA] = Math.min(this[Tn], r[xA] + this[Nn]);
    }), r.on("connectionError", () => {
      r[xA] = Math.max(1, r[xA] - this[Nn]), this._updateBalancedPoolStats();
    }), r.on("disconnect", (...s) => {
      const o = s[2];
      o && o.code === "UND_ERR_SOCKET" && (r[xA] = Math.max(1, r[xA] - this[Nn]), this._updateBalancedPoolStats());
    });
    for (const s of this[mA])
      s[xA] = this[Tn];
    return this._updateBalancedPoolStats(), this;
  }
  _updateBalancedPoolStats() {
    this[nl] = this[mA].map((e) => e[xA]).reduce(sh, 0);
  }
  removeUpstream(e) {
    const t = rl(e).origin, r = this[mA].find((s) => s[Gi].origin === t && s.closed !== !0 && s.destroyed !== !0);
    return r && this[Cf](r), this;
  }
  get upstreams() {
    return this[mA].filter((e) => e.closed !== !0 && e.destroyed !== !0).map((e) => e[Gi].origin);
  }
  [df]() {
    if (this[mA].length === 0)
      throw new uf();
    if (!this[mA].find((o) => !o[ks] && o.closed !== !0 && o.destroyed !== !0) || this[mA].map((o) => o[ks]).reduce((o, i) => o && i, !0))
      return;
    let r = 0, s = this[mA].findIndex((o) => !o[ks]);
    for (; r++ < this[mA].length; ) {
      this[ir] = (this[ir] + 1) % this[mA].length;
      const o = this[mA][this[ir]];
      if (o[xA] > this[mA][s][xA] && !o[ks] && (s = this[ir]), this[ir] === 0 && (this[or] = this[or] - this[nl], this[or] <= 0 && (this[or] = this[Tn])), o[xA] >= this[or] && !o[ks])
        return o;
    }
    return this[or] = this[mA][s][xA], this[ir] = s, this[mA][s];
  }
};
var mf = pf;
const { kConnected: nh, kSize: oh } = He;
class ol {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value[nh] === 0 && this.value[oh] === 0 ? void 0 : this.value;
  }
}
class il {
  constructor(e) {
    this.finalizer = e;
  }
  register(e, t) {
    e.on && e.on("disconnect", () => {
      e[nh] === 0 && e[oh] === 0 && this.finalizer(t);
    });
  }
}
var ih = function() {
  return process.env.NODE_V8_COVERAGE ? {
    WeakRef: ol,
    FinalizationRegistry: il
  } : {
    WeakRef: H.WeakRef || ol,
    FinalizationRegistry: H.FinalizationRegistry || il
  };
};
const { InvalidArgumentError: Un } = Me, { kClients: Yt, kRunning: al, kClose: yf, kDestroy: wf, kDispatch: bf, kInterceptors: Rf } = He, Df = Io, Sf = zs, kf = mo, Ff = ke, Tf = gc, { WeakRef: Nf, FinalizationRegistry: Uf } = ih(), cl = Symbol("onConnect"), gl = Symbol("onDisconnect"), ll = Symbol("onConnectionError"), Lf = Symbol("maxRedirections"), ul = Symbol("onDrain"), El = Symbol("factory"), hl = Symbol("finalizer"), Mi = Symbol("options");
function _f(A, e) {
  return e && e.connections === 1 ? new kf(A, e) : new Sf(A, e);
}
let vf = class extends Df {
  constructor({ factory: e = _f, maxRedirections: t = 0, connect: r, ...s } = {}) {
    if (super(), typeof e != "function")
      throw new Un("factory must be a function.");
    if (r != null && typeof r != "function" && typeof r != "object")
      throw new Un("connect must be a function or an object");
    if (!Number.isInteger(t) || t < 0)
      throw new Un("maxRedirections must be a positive number");
    r && typeof r != "function" && (r = { ...r }), this[Rf] = s.interceptors && s.interceptors.Agent && Array.isArray(s.interceptors.Agent) ? s.interceptors.Agent : [Tf({ maxRedirections: t })], this[Mi] = { ...Ff.deepClone(s), connect: r }, this[Mi].interceptors = s.interceptors ? { ...s.interceptors } : void 0, this[Lf] = t, this[El] = e, this[Yt] = /* @__PURE__ */ new Map(), this[hl] = new Uf(
      /* istanbul ignore next: gc is undeterministic */
      (i) => {
        const c = this[Yt].get(i);
        c !== void 0 && c.deref() === void 0 && this[Yt].delete(i);
      }
    );
    const o = this;
    this[ul] = (i, c) => {
      o.emit("drain", i, [o, ...c]);
    }, this[cl] = (i, c) => {
      o.emit("connect", i, [o, ...c]);
    }, this[gl] = (i, c, g) => {
      o.emit("disconnect", i, [o, ...c], g);
    }, this[ll] = (i, c, g) => {
      o.emit("connectionError", i, [o, ...c], g);
    };
  }
  get [al]() {
    let e = 0;
    for (const t of this[Yt].values()) {
      const r = t.deref();
      r && (e += r[al]);
    }
    return e;
  }
  [bf](e, t) {
    let r;
    if (e.origin && (typeof e.origin == "string" || e.origin instanceof URL))
      r = String(e.origin);
    else
      throw new Un("opts.origin must be a non-empty string or URL.");
    const s = this[Yt].get(r);
    let o = s ? s.deref() : null;
    return o || (o = this[El](e.origin, this[Mi]).on("drain", this[ul]).on("connect", this[cl]).on("disconnect", this[gl]).on("connectionError", this[ll]), this[Yt].set(r, new Nf(o)), this[hl].register(o, r)), o.dispatch(e, t);
  }
  async [yf]() {
    const e = [];
    for (const t of this[Yt].values()) {
      const r = t.deref();
      r && e.push(r.close());
    }
    await Promise.all(e);
  }
  async [wf](e) {
    const t = [];
    for (const r of this[Yt].values()) {
      const s = r.deref();
      s && t.push(s.destroy(e));
    }
    await Promise.all(t);
  }
};
var yo = vf, rs = {}, uc = { exports: {} };
const ah = G, { Readable: Gf } = G, { RequestAbortedError: ch, NotSupportedError: Mf, InvalidArgumentError: Yf } = Me, eo = ke, { ReadableStreamFrom: Pf, toUSVString: Jf } = ke;
let Yi;
const PA = Symbol("kConsume"), Ln = Symbol("kReading"), Ot = Symbol("kBody"), Ql = Symbol("abort"), gh = Symbol("kContentType"), Cl = () => {
};
var Of = class extends Gf {
  constructor({
    resume: e,
    abort: t,
    contentType: r = "",
    highWaterMark: s = 64 * 1024
    // Same as nodejs fs streams.
  }) {
    super({
      autoDestroy: !0,
      read: e,
      highWaterMark: s
    }), this._readableState.dataEmitted = !1, this[Ql] = t, this[PA] = null, this[Ot] = null, this[gh] = r, this[Ln] = !1;
  }
  destroy(e) {
    return this.destroyed ? this : (!e && !this._readableState.endEmitted && (e = new ch()), e && this[Ql](), super.destroy(e));
  }
  emit(e, ...t) {
    return e === "data" ? this._readableState.dataEmitted = !0 : e === "error" && (this._readableState.errorEmitted = !0), super.emit(e, ...t);
  }
  on(e, ...t) {
    return (e === "data" || e === "readable") && (this[Ln] = !0), super.on(e, ...t);
  }
  addListener(e, ...t) {
    return this.on(e, ...t);
  }
  off(e, ...t) {
    const r = super.off(e, ...t);
    return (e === "data" || e === "readable") && (this[Ln] = this.listenerCount("data") > 0 || this.listenerCount("readable") > 0), r;
  }
  removeListener(e, ...t) {
    return this.off(e, ...t);
  }
  push(e) {
    return this[PA] && e !== null && this.readableLength === 0 ? (lh(this[PA], e), this[Ln] ? super.push(e) : !0) : super.push(e);
  }
  // https://fetch.spec.whatwg.org/#dom-body-text
  async text() {
    return _n(this, "text");
  }
  // https://fetch.spec.whatwg.org/#dom-body-json
  async json() {
    return _n(this, "json");
  }
  // https://fetch.spec.whatwg.org/#dom-body-blob
  async blob() {
    return _n(this, "blob");
  }
  // https://fetch.spec.whatwg.org/#dom-body-arraybuffer
  async arrayBuffer() {
    return _n(this, "arrayBuffer");
  }
  // https://fetch.spec.whatwg.org/#dom-body-formdata
  async formData() {
    throw new Mf();
  }
  // https://fetch.spec.whatwg.org/#dom-body-bodyused
  get bodyUsed() {
    return eo.isDisturbed(this);
  }
  // https://fetch.spec.whatwg.org/#dom-body-body
  get body() {
    return this[Ot] || (this[Ot] = Pf(this), this[PA] && (this[Ot].getReader(), ah(this[Ot].locked))), this[Ot];
  }
  dump(e) {
    let t = e && Number.isFinite(e.limit) ? e.limit : 262144;
    const r = e && e.signal;
    if (r)
      try {
        if (typeof r != "object" || !("aborted" in r))
          throw new Yf("signal must be an AbortSignal");
        eo.throwIfAborted(r);
      } catch (s) {
        return Promise.reject(s);
      }
    return this.closed ? Promise.resolve(null) : new Promise((s, o) => {
      const i = r ? eo.addAbortListener(r, () => {
        this.destroy();
      }) : Cl;
      this.on("close", function() {
        i(), r && r.aborted ? o(r.reason || Object.assign(new Error("The operation was aborted"), { name: "AbortError" })) : s(null);
      }).on("error", Cl).on("data", function(c) {
        t -= c.length, t <= 0 && this.destroy();
      }).resume();
    });
  }
};
function Hf(A) {
  return A[Ot] && A[Ot].locked === !0 || A[PA];
}
function Vf(A) {
  return eo.isDisturbed(A) || Hf(A);
}
async function _n(A, e) {
  if (Vf(A))
    throw new TypeError("unusable");
  return ah(!A[PA]), new Promise((t, r) => {
    A[PA] = {
      type: e,
      stream: A,
      resolve: t,
      reject: r,
      length: 0,
      body: []
    }, A.on("error", function(s) {
      Oa(this[PA], s);
    }).on("close", function() {
      this[PA].body !== null && Oa(this[PA], new ch());
    }), process.nextTick(Wf, A[PA]);
  });
}
function Wf(A) {
  if (A.body === null)
    return;
  const { _readableState: e } = A.stream;
  for (const t of e.buffer)
    lh(A, t);
  for (e.endEmitted ? dl(this[PA]) : A.stream.on("end", function() {
    dl(this[PA]);
  }), A.stream.resume(); A.stream.read() != null; )
    ;
}
function dl(A) {
  const { type: e, body: t, resolve: r, stream: s, length: o } = A;
  try {
    if (e === "text")
      r(Jf(Buffer.concat(t)));
    else if (e === "json")
      r(JSON.parse(Buffer.concat(t)));
    else if (e === "arrayBuffer") {
      const i = new Uint8Array(o);
      let c = 0;
      for (const g of t)
        i.set(g, c), c += g.byteLength;
      r(i.buffer);
    } else e === "blob" && (Yi || (Yi = G.Blob), r(new Yi(t, { type: s[gh] })));
    Oa(A);
  } catch (i) {
    s.destroy(i);
  }
}
function lh(A, e) {
  A.length += e.length, A.body.push(e);
}
function Oa(A, e) {
  A.body !== null && (e ? A.reject(e) : A.resolve(), A.type = null, A.stream = null, A.resolve = null, A.reject = null, A.length = 0, A.body = null);
}
const qf = G, {
  ResponseStatusCodeError: vn
} = Me, { toUSVString: Bl } = ke;
async function xf({ callback: A, body: e, contentType: t, statusCode: r, statusMessage: s, headers: o }) {
  qf(e);
  let i = [], c = 0;
  for await (const g of e)
    if (i.push(g), c += g.length, c > 128 * 1024) {
      i = null;
      break;
    }
  if (r === 204 || !t || !i) {
    process.nextTick(A, new vn(`Response status code ${r}${s ? `: ${s}` : ""}`, r, o));
    return;
  }
  try {
    if (t.startsWith("application/json")) {
      const g = JSON.parse(Bl(Buffer.concat(i)));
      process.nextTick(A, new vn(`Response status code ${r}${s ? `: ${s}` : ""}`, r, o, g));
      return;
    }
    if (t.startsWith("text/")) {
      const g = Bl(Buffer.concat(i));
      process.nextTick(A, new vn(`Response status code ${r}${s ? `: ${s}` : ""}`, r, o, g));
      return;
    }
  } catch {
  }
  process.nextTick(A, new vn(`Response status code ${r}${s ? `: ${s}` : ""}`, r, o));
}
var uh = { getResolveErrorBodyCallback: xf };
const { addAbortListener: jf } = ke, { RequestAbortedError: zf } = Me, qr = Symbol("kListener"), qt = Symbol("kSignal");
function Il(A) {
  A.abort ? A.abort() : A.onError(new zf());
}
function Zf(A, e) {
  if (A[qt] = null, A[qr] = null, !!e) {
    if (e.aborted) {
      Il(A);
      return;
    }
    A[qt] = e, A[qr] = () => {
      Il(A);
    }, jf(A[qt], A[qr]);
  }
}
function $f(A) {
  A[qt] && ("removeEventListener" in A[qt] ? A[qt].removeEventListener("abort", A[qr]) : A[qt].removeListener("abort", A[qr]), A[qt] = null, A[qr] = null);
}
var Zs = {
  addSignal: Zf,
  removeSignal: $f
};
const Xf = Of, {
  InvalidArgumentError: Pr,
  RequestAbortedError: Kf
} = Me, gt = ke, { getResolveErrorBodyCallback: ep } = uh, { AsyncResource: Ap } = G, { addSignal: tp, removeSignal: fl } = Zs;
class Eh extends Ap {
  constructor(e, t) {
    if (!e || typeof e != "object")
      throw new Pr("invalid opts");
    const { signal: r, method: s, opaque: o, body: i, onInfo: c, responseHeaders: g, throwOnError: u, highWaterMark: l } = e;
    try {
      if (typeof t != "function")
        throw new Pr("invalid callback");
      if (l && (typeof l != "number" || l < 0))
        throw new Pr("invalid highWaterMark");
      if (r && typeof r.on != "function" && typeof r.addEventListener != "function")
        throw new Pr("signal must be an EventEmitter or EventTarget");
      if (s === "CONNECT")
        throw new Pr("invalid method");
      if (c && typeof c != "function")
        throw new Pr("invalid onInfo callback");
      super("UNDICI_REQUEST");
    } catch (h) {
      throw gt.isStream(i) && gt.destroy(i.on("error", gt.nop), h), h;
    }
    this.responseHeaders = g || null, this.opaque = o || null, this.callback = t, this.res = null, this.abort = null, this.body = i, this.trailers = {}, this.context = null, this.onInfo = c || null, this.throwOnError = u, this.highWaterMark = l, gt.isStream(i) && i.on("error", (h) => {
      this.onError(h);
    }), tp(this, r);
  }
  onConnect(e, t) {
    if (!this.callback)
      throw new Kf();
    this.abort = e, this.context = t;
  }
  onHeaders(e, t, r, s) {
    const { callback: o, opaque: i, abort: c, context: g, responseHeaders: u, highWaterMark: l } = this, h = u === "raw" ? gt.parseRawHeaders(t) : gt.parseHeaders(t);
    if (e < 200) {
      this.onInfo && this.onInfo({ statusCode: e, headers: h });
      return;
    }
    const f = (u === "raw" ? gt.parseHeaders(t) : h)["content-type"], I = new Xf({ resume: r, abort: c, contentType: f, highWaterMark: l });
    this.callback = null, this.res = I, o !== null && (this.throwOnError && e >= 400 ? this.runInAsyncScope(
      ep,
      null,
      { callback: o, body: I, contentType: f, statusCode: e, statusMessage: s, headers: h }
    ) : this.runInAsyncScope(o, null, null, {
      statusCode: e,
      headers: h,
      trailers: this.trailers,
      opaque: i,
      body: I,
      context: g
    }));
  }
  onData(e) {
    const { res: t } = this;
    return t.push(e);
  }
  onComplete(e) {
    const { res: t } = this;
    fl(this), gt.parseHeaders(e, this.trailers), t.push(null);
  }
  onError(e) {
    const { res: t, callback: r, body: s, opaque: o } = this;
    fl(this), r && (this.callback = null, queueMicrotask(() => {
      this.runInAsyncScope(r, null, e, { opaque: o });
    })), t && (this.res = null, queueMicrotask(() => {
      gt.destroy(t, e);
    })), s && (this.body = null, gt.destroy(s, e));
  }
}
function hh(A, e) {
  if (e === void 0)
    return new Promise((t, r) => {
      hh.call(this, A, (s, o) => s ? r(s) : t(o));
    });
  try {
    this.dispatch(A, new Eh(A, e));
  } catch (t) {
    if (typeof e != "function")
      throw t;
    const r = A && A.opaque;
    queueMicrotask(() => e(t, { opaque: r }));
  }
}
uc.exports = hh;
uc.exports.RequestHandler = Eh;
var rp = uc.exports;
const { finished: sp, PassThrough: np } = G, {
  InvalidArgumentError: Jr,
  InvalidReturnValueError: op,
  RequestAbortedError: ip
} = Me, rt = ke, { getResolveErrorBodyCallback: ap } = uh, { AsyncResource: cp } = G, { addSignal: gp, removeSignal: pl } = Zs;
class lp extends cp {
  constructor(e, t, r) {
    if (!e || typeof e != "object")
      throw new Jr("invalid opts");
    const { signal: s, method: o, opaque: i, body: c, onInfo: g, responseHeaders: u, throwOnError: l } = e;
    try {
      if (typeof r != "function")
        throw new Jr("invalid callback");
      if (typeof t != "function")
        throw new Jr("invalid factory");
      if (s && typeof s.on != "function" && typeof s.addEventListener != "function")
        throw new Jr("signal must be an EventEmitter or EventTarget");
      if (o === "CONNECT")
        throw new Jr("invalid method");
      if (g && typeof g != "function")
        throw new Jr("invalid onInfo callback");
      super("UNDICI_STREAM");
    } catch (h) {
      throw rt.isStream(c) && rt.destroy(c.on("error", rt.nop), h), h;
    }
    this.responseHeaders = u || null, this.opaque = i || null, this.factory = t, this.callback = r, this.res = null, this.abort = null, this.context = null, this.trailers = null, this.body = c, this.onInfo = g || null, this.throwOnError = l || !1, rt.isStream(c) && c.on("error", (h) => {
      this.onError(h);
    }), gp(this, s);
  }
  onConnect(e, t) {
    if (!this.callback)
      throw new ip();
    this.abort = e, this.context = t;
  }
  onHeaders(e, t, r, s) {
    const { factory: o, opaque: i, context: c, callback: g, responseHeaders: u } = this, l = u === "raw" ? rt.parseRawHeaders(t) : rt.parseHeaders(t);
    if (e < 200) {
      this.onInfo && this.onInfo({ statusCode: e, headers: l });
      return;
    }
    this.factory = null;
    let h;
    if (this.throwOnError && e >= 400) {
      const I = (u === "raw" ? rt.parseHeaders(t) : l)["content-type"];
      h = new np(), this.callback = null, this.runInAsyncScope(
        ap,
        null,
        { callback: g, body: h, contentType: I, statusCode: e, statusMessage: s, headers: l }
      );
    } else {
      if (o === null)
        return;
      if (h = this.runInAsyncScope(o, null, {
        statusCode: e,
        headers: l,
        opaque: i,
        context: c
      }), !h || typeof h.write != "function" || typeof h.end != "function" || typeof h.on != "function")
        throw new op("expected Writable");
      sp(h, { readable: !1 }, (f) => {
        const { callback: I, res: C, opaque: B, trailers: p, abort: Q } = this;
        this.res = null, (f || !C.readable) && rt.destroy(C, f), this.callback = null, this.runInAsyncScope(I, null, f || null, { opaque: B, trailers: p }), f && Q();
      });
    }
    return h.on("drain", r), this.res = h, (h.writableNeedDrain !== void 0 ? h.writableNeedDrain : h._writableState && h._writableState.needDrain) !== !0;
  }
  onData(e) {
    const { res: t } = this;
    return t ? t.write(e) : !0;
  }
  onComplete(e) {
    const { res: t } = this;
    pl(this), t && (this.trailers = rt.parseHeaders(e), t.end());
  }
  onError(e) {
    const { res: t, callback: r, opaque: s, body: o } = this;
    pl(this), this.factory = null, t ? (this.res = null, rt.destroy(t, e)) : r && (this.callback = null, queueMicrotask(() => {
      this.runInAsyncScope(r, null, e, { opaque: s });
    })), o && (this.body = null, rt.destroy(o, e));
  }
}
function Qh(A, e, t) {
  if (t === void 0)
    return new Promise((r, s) => {
      Qh.call(this, A, e, (o, i) => o ? s(o) : r(i));
    });
  try {
    this.dispatch(A, new lp(A, e, t));
  } catch (r) {
    if (typeof t != "function")
      throw r;
    const s = A && A.opaque;
    queueMicrotask(() => t(r, { opaque: s }));
  }
}
var up = Qh;
const {
  Readable: Ch,
  Duplex: Ep,
  PassThrough: hp
} = G, {
  InvalidArgumentError: Fs,
  InvalidReturnValueError: Qp,
  RequestAbortedError: Ao
} = Me, jA = ke, { AsyncResource: Cp } = G, { addSignal: dp, removeSignal: Bp } = Zs, Ip = G, xr = Symbol("resume");
class fp extends Ch {
  constructor() {
    super({ autoDestroy: !0 }), this[xr] = null;
  }
  _read() {
    const { [xr]: e } = this;
    e && (this[xr] = null, e());
  }
  _destroy(e, t) {
    this._read(), t(e);
  }
}
class pp extends Ch {
  constructor(e) {
    super({ autoDestroy: !0 }), this[xr] = e;
  }
  _read() {
    this[xr]();
  }
  _destroy(e, t) {
    !e && !this._readableState.endEmitted && (e = new Ao()), t(e);
  }
}
class mp extends Cp {
  constructor(e, t) {
    if (!e || typeof e != "object")
      throw new Fs("invalid opts");
    if (typeof t != "function")
      throw new Fs("invalid handler");
    const { signal: r, method: s, opaque: o, onInfo: i, responseHeaders: c } = e;
    if (r && typeof r.on != "function" && typeof r.addEventListener != "function")
      throw new Fs("signal must be an EventEmitter or EventTarget");
    if (s === "CONNECT")
      throw new Fs("invalid method");
    if (i && typeof i != "function")
      throw new Fs("invalid onInfo callback");
    super("UNDICI_PIPELINE"), this.opaque = o || null, this.responseHeaders = c || null, this.handler = t, this.abort = null, this.context = null, this.onInfo = i || null, this.req = new fp().on("error", jA.nop), this.ret = new Ep({
      readableObjectMode: e.objectMode,
      autoDestroy: !0,
      read: () => {
        const { body: g } = this;
        g && g.resume && g.resume();
      },
      write: (g, u, l) => {
        const { req: h } = this;
        h.push(g, u) || h._readableState.destroyed ? l() : h[xr] = l;
      },
      destroy: (g, u) => {
        const { body: l, req: h, res: E, ret: f, abort: I } = this;
        !g && !f._readableState.endEmitted && (g = new Ao()), I && g && I(), jA.destroy(l, g), jA.destroy(h, g), jA.destroy(E, g), Bp(this), u(g);
      }
    }).on("prefinish", () => {
      const { req: g } = this;
      g.push(null);
    }), this.res = null, dp(this, r);
  }
  onConnect(e, t) {
    const { ret: r, res: s } = this;
    if (Ip(!s, "pipeline cannot be retried"), r.destroyed)
      throw new Ao();
    this.abort = e, this.context = t;
  }
  onHeaders(e, t, r) {
    const { opaque: s, handler: o, context: i } = this;
    if (e < 200) {
      if (this.onInfo) {
        const g = this.responseHeaders === "raw" ? jA.parseRawHeaders(t) : jA.parseHeaders(t);
        this.onInfo({ statusCode: e, headers: g });
      }
      return;
    }
    this.res = new pp(r);
    let c;
    try {
      this.handler = null;
      const g = this.responseHeaders === "raw" ? jA.parseRawHeaders(t) : jA.parseHeaders(t);
      c = this.runInAsyncScope(o, null, {
        statusCode: e,
        headers: g,
        opaque: s,
        body: this.res,
        context: i
      });
    } catch (g) {
      throw this.res.on("error", jA.nop), g;
    }
    if (!c || typeof c.on != "function")
      throw new Qp("expected Readable");
    c.on("data", (g) => {
      const { ret: u, body: l } = this;
      !u.push(g) && l.pause && l.pause();
    }).on("error", (g) => {
      const { ret: u } = this;
      jA.destroy(u, g);
    }).on("end", () => {
      const { ret: g } = this;
      g.push(null);
    }).on("close", () => {
      const { ret: g } = this;
      g._readableState.ended || jA.destroy(g, new Ao());
    }), this.body = c;
  }
  onData(e) {
    const { res: t } = this;
    return t.push(e);
  }
  onComplete(e) {
    const { res: t } = this;
    t.push(null);
  }
  onError(e) {
    const { ret: t } = this;
    this.handler = null, jA.destroy(t, e);
  }
}
function yp(A, e) {
  try {
    const t = new mp(A, e);
    return this.dispatch({ ...A, body: t.req }, t), t.ret;
  } catch (t) {
    return new hp().destroy(t);
  }
}
var wp = yp;
const { InvalidArgumentError: Pi, RequestAbortedError: bp, SocketError: Rp } = Me, { AsyncResource: Dp } = G, ml = ke, { addSignal: Sp, removeSignal: yl } = Zs, kp = G;
class Fp extends Dp {
  constructor(e, t) {
    if (!e || typeof e != "object")
      throw new Pi("invalid opts");
    if (typeof t != "function")
      throw new Pi("invalid callback");
    const { signal: r, opaque: s, responseHeaders: o } = e;
    if (r && typeof r.on != "function" && typeof r.addEventListener != "function")
      throw new Pi("signal must be an EventEmitter or EventTarget");
    super("UNDICI_UPGRADE"), this.responseHeaders = o || null, this.opaque = s || null, this.callback = t, this.abort = null, this.context = null, Sp(this, r);
  }
  onConnect(e, t) {
    if (!this.callback)
      throw new bp();
    this.abort = e, this.context = null;
  }
  onHeaders() {
    throw new Rp("bad upgrade", null);
  }
  onUpgrade(e, t, r) {
    const { callback: s, opaque: o, context: i } = this;
    kp.strictEqual(e, 101), yl(this), this.callback = null;
    const c = this.responseHeaders === "raw" ? ml.parseRawHeaders(t) : ml.parseHeaders(t);
    this.runInAsyncScope(s, null, null, {
      headers: c,
      socket: r,
      opaque: o,
      context: i
    });
  }
  onError(e) {
    const { callback: t, opaque: r } = this;
    yl(this), t && (this.callback = null, queueMicrotask(() => {
      this.runInAsyncScope(t, null, e, { opaque: r });
    }));
  }
}
function dh(A, e) {
  if (e === void 0)
    return new Promise((t, r) => {
      dh.call(this, A, (s, o) => s ? r(s) : t(o));
    });
  try {
    const t = new Fp(A, e);
    this.dispatch({
      ...A,
      method: A.method || "GET",
      upgrade: A.protocol || "Websocket"
    }, t);
  } catch (t) {
    if (typeof e != "function")
      throw t;
    const r = A && A.opaque;
    queueMicrotask(() => e(t, { opaque: r }));
  }
}
var Tp = dh;
const { AsyncResource: Np } = G, { InvalidArgumentError: Ji, RequestAbortedError: Up, SocketError: Lp } = Me, wl = ke, { addSignal: _p, removeSignal: bl } = Zs;
class vp extends Np {
  constructor(e, t) {
    if (!e || typeof e != "object")
      throw new Ji("invalid opts");
    if (typeof t != "function")
      throw new Ji("invalid callback");
    const { signal: r, opaque: s, responseHeaders: o } = e;
    if (r && typeof r.on != "function" && typeof r.addEventListener != "function")
      throw new Ji("signal must be an EventEmitter or EventTarget");
    super("UNDICI_CONNECT"), this.opaque = s || null, this.responseHeaders = o || null, this.callback = t, this.abort = null, _p(this, r);
  }
  onConnect(e, t) {
    if (!this.callback)
      throw new Up();
    this.abort = e, this.context = t;
  }
  onHeaders() {
    throw new Lp("bad connect", null);
  }
  onUpgrade(e, t, r) {
    const { callback: s, opaque: o, context: i } = this;
    bl(this), this.callback = null;
    let c = t;
    c != null && (c = this.responseHeaders === "raw" ? wl.parseRawHeaders(t) : wl.parseHeaders(t)), this.runInAsyncScope(s, null, null, {
      statusCode: e,
      headers: c,
      socket: r,
      opaque: o,
      context: i
    });
  }
  onError(e) {
    const { callback: t, opaque: r } = this;
    bl(this), t && (this.callback = null, queueMicrotask(() => {
      this.runInAsyncScope(t, null, e, { opaque: r });
    }));
  }
}
function Bh(A, e) {
  if (e === void 0)
    return new Promise((t, r) => {
      Bh.call(this, A, (s, o) => s ? r(s) : t(o));
    });
  try {
    const t = new vp(A, e);
    this.dispatch({ ...A, method: "CONNECT" }, t);
  } catch (t) {
    if (typeof e != "function")
      throw t;
    const r = A && A.opaque;
    queueMicrotask(() => e(t, { opaque: r }));
  }
}
var Gp = Bh;
rs.request = rp;
rs.stream = up;
rs.pipeline = wp;
rs.upgrade = Tp;
rs.connect = Gp;
const { UndiciError: Mp } = Me;
let Yp = class Ih extends Mp {
  constructor(e) {
    super(e), Error.captureStackTrace(this, Ih), this.name = "MockNotMatchedError", this.message = e || "The request does not match any registered mock dispatches", this.code = "UND_MOCK_ERR_MOCK_NOT_MATCHED";
  }
};
var fh = {
  MockNotMatchedError: Yp
}, $s = {
  kAgent: Symbol("agent"),
  kOptions: Symbol("options"),
  kFactory: Symbol("factory"),
  kDispatches: Symbol("dispatches"),
  kDispatchKey: Symbol("dispatch key"),
  kDefaultHeaders: Symbol("default headers"),
  kDefaultTrailers: Symbol("default trailers"),
  kContentLength: Symbol("content length"),
  kMockAgent: Symbol("mock agent"),
  kMockAgentSet: Symbol("mock agent set"),
  kMockAgentGet: Symbol("mock agent get"),
  kMockDispatch: Symbol("mock dispatch"),
  kClose: Symbol("close"),
  kOriginalClose: Symbol("original agent close"),
  kOrigin: Symbol("origin"),
  kIsMockActive: Symbol("is mock active"),
  kNetConnect: Symbol("net connect"),
  kGetNetConnect: Symbol("get net connect"),
  kConnected: Symbol("connected")
};
const { MockNotMatchedError: Qr } = fh, {
  kDispatches: Gn,
  kMockAgent: Pp,
  kOriginalDispatch: Jp,
  kOrigin: Op,
  kGetNetConnect: Hp
} = $s, { buildURL: Vp, nop: Wp } = ke, { STATUS_CODES: qp } = G, {
  types: {
    isPromise: xp
  }
} = G;
function kt(A, e) {
  return typeof A == "string" ? A === e : A instanceof RegExp ? A.test(e) : typeof A == "function" ? A(e) === !0 : !1;
}
function ph(A) {
  return Object.fromEntries(
    Object.entries(A).map(([e, t]) => [e.toLocaleLowerCase(), t])
  );
}
function mh(A, e) {
  if (Array.isArray(A)) {
    for (let t = 0; t < A.length; t += 2)
      if (A[t].toLocaleLowerCase() === e.toLocaleLowerCase())
        return A[t + 1];
    return;
  } else return typeof A.get == "function" ? A.get(e) : ph(A)[e.toLocaleLowerCase()];
}
function yh(A) {
  const e = A.slice(), t = [];
  for (let r = 0; r < e.length; r += 2)
    t.push([e[r], e[r + 1]]);
  return Object.fromEntries(t);
}
function wh(A, e) {
  if (typeof A.headers == "function")
    return Array.isArray(e) && (e = yh(e)), A.headers(e ? ph(e) : {});
  if (typeof A.headers > "u")
    return !0;
  if (typeof e != "object" || typeof A.headers != "object")
    return !1;
  for (const [t, r] of Object.entries(A.headers)) {
    const s = mh(e, t);
    if (!kt(r, s))
      return !1;
  }
  return !0;
}
function Rl(A) {
  if (typeof A != "string")
    return A;
  const e = A.split("?");
  if (e.length !== 2)
    return A;
  const t = new URLSearchParams(e.pop());
  return t.sort(), [...e, t.toString()].join("?");
}
function jp(A, { path: e, method: t, body: r, headers: s }) {
  const o = kt(A.path, e), i = kt(A.method, t), c = typeof A.body < "u" ? kt(A.body, r) : !0, g = wh(A, s);
  return o && i && c && g;
}
function bh(A) {
  return Buffer.isBuffer(A) ? A : typeof A == "object" ? JSON.stringify(A) : A.toString();
}
function Rh(A, e) {
  const t = e.query ? Vp(e.path, e.query) : e.path, r = typeof t == "string" ? Rl(t) : t;
  let s = A.filter(({ consumed: o }) => !o).filter(({ path: o }) => kt(Rl(o), r));
  if (s.length === 0)
    throw new Qr(`Mock dispatch not matched for path '${r}'`);
  if (s = s.filter(({ method: o }) => kt(o, e.method)), s.length === 0)
    throw new Qr(`Mock dispatch not matched for method '${e.method}'`);
  if (s = s.filter(({ body: o }) => typeof o < "u" ? kt(o, e.body) : !0), s.length === 0)
    throw new Qr(`Mock dispatch not matched for body '${e.body}'`);
  if (s = s.filter((o) => wh(o, e.headers)), s.length === 0)
    throw new Qr(`Mock dispatch not matched for headers '${typeof e.headers == "object" ? JSON.stringify(e.headers) : e.headers}'`);
  return s[0];
}
function zp(A, e, t) {
  const r = { timesInvoked: 0, times: 1, persist: !1, consumed: !1 }, s = typeof t == "function" ? { callback: t } : { ...t }, o = { ...r, ...e, pending: !0, data: { error: null, ...s } };
  return A.push(o), o;
}
function Ha(A, e) {
  const t = A.findIndex((r) => r.consumed ? jp(r, e) : !1);
  t !== -1 && A.splice(t, 1);
}
function Dh(A) {
  const { path: e, method: t, body: r, headers: s, query: o } = A;
  return {
    path: e,
    method: t,
    body: r,
    headers: s,
    query: o
  };
}
function Va(A) {
  return Object.entries(A).reduce((e, [t, r]) => [
    ...e,
    Buffer.from(`${t}`),
    Array.isArray(r) ? r.map((s) => Buffer.from(`${s}`)) : Buffer.from(`${r}`)
  ], []);
}
function Sh(A) {
  return qp[A] || "unknown";
}
async function Zp(A) {
  const e = [];
  for await (const t of A)
    e.push(t);
  return Buffer.concat(e).toString("utf8");
}
function kh(A, e) {
  const t = Dh(A), r = Rh(this[Gn], t);
  r.timesInvoked++, r.data.callback && (r.data = { ...r.data, ...r.data.callback(A) });
  const { data: { statusCode: s, data: o, headers: i, trailers: c, error: g }, delay: u, persist: l } = r, { timesInvoked: h, times: E } = r;
  if (r.consumed = !l && h >= E, r.pending = h < E, g !== null)
    return Ha(this[Gn], t), e.onError(g), !0;
  typeof u == "number" && u > 0 ? setTimeout(() => {
    f(this[Gn]);
  }, u) : f(this[Gn]);
  function f(C, B = o) {
    const p = Array.isArray(A.headers) ? yh(A.headers) : A.headers, Q = typeof B == "function" ? B({ ...A, headers: p }) : B;
    if (xp(Q)) {
      Q.then((b) => f(C, b));
      return;
    }
    const m = bh(Q), w = Va(i), y = Va(c);
    e.abort = Wp, e.onHeaders(s, w, I, Sh(s)), e.onData(Buffer.from(m)), e.onComplete(y), Ha(C, t);
  }
  function I() {
  }
  return !0;
}
function $p() {
  const A = this[Pp], e = this[Op], t = this[Jp];
  return function(s, o) {
    if (A.isMockActive)
      try {
        kh.call(this, s, o);
      } catch (i) {
        if (i instanceof Qr) {
          const c = A[Hp]();
          if (c === !1)
            throw new Qr(`${i.message}: subsequent request to origin ${e} was not allowed (net.connect disabled)`);
          if (Fh(c, e))
            t.call(this, s, o);
          else
            throw new Qr(`${i.message}: subsequent request to origin ${e} was not allowed (net.connect is not enabled for this origin)`);
        } else
          throw i;
      }
    else
      t.call(this, s, o);
  };
}
function Fh(A, e) {
  const t = new URL(e);
  return A === !0 ? !0 : !!(Array.isArray(A) && A.some((r) => kt(r, t.host)));
}
function Xp(A) {
  if (A) {
    const { agent: e, ...t } = A;
    return t;
  }
}
var wo = {
  getResponseData: bh,
  getMockDispatch: Rh,
  addMockDispatch: zp,
  deleteMockDispatch: Ha,
  buildKey: Dh,
  generateKeyValues: Va,
  matchValue: kt,
  getResponse: Zp,
  getStatusText: Sh,
  mockDispatch: kh,
  buildMockDispatch: $p,
  checkNetConnect: Fh,
  buildMockOptions: Xp,
  getHeaderByName: mh
}, bo = {};
const { getResponseData: Kp, buildKey: em, addMockDispatch: Oi } = wo, {
  kDispatches: Mn,
  kDispatchKey: Yn,
  kDefaultHeaders: Hi,
  kDefaultTrailers: Vi,
  kContentLength: Wi,
  kMockDispatch: Pn
} = $s, { InvalidArgumentError: nt } = Me, { buildURL: Am } = ke;
class to {
  constructor(e) {
    this[Pn] = e;
  }
  /**
   * Delay a reply by a set amount in ms.
   */
  delay(e) {
    if (typeof e != "number" || !Number.isInteger(e) || e <= 0)
      throw new nt("waitInMs must be a valid integer > 0");
    return this[Pn].delay = e, this;
  }
  /**
   * For a defined reply, never mark as consumed.
   */
  persist() {
    return this[Pn].persist = !0, this;
  }
  /**
   * Allow one to define a reply for a set amount of matching requests.
   */
  times(e) {
    if (typeof e != "number" || !Number.isInteger(e) || e <= 0)
      throw new nt("repeatTimes must be a valid integer > 0");
    return this[Pn].times = e, this;
  }
}
let tm = class {
  constructor(e, t) {
    if (typeof e != "object")
      throw new nt("opts must be an object");
    if (typeof e.path > "u")
      throw new nt("opts.path must be defined");
    if (typeof e.method > "u" && (e.method = "GET"), typeof e.path == "string")
      if (e.query)
        e.path = Am(e.path, e.query);
      else {
        const r = new URL(e.path, "data://");
        e.path = r.pathname + r.search;
      }
    typeof e.method == "string" && (e.method = e.method.toUpperCase()), this[Yn] = em(e), this[Mn] = t, this[Hi] = {}, this[Vi] = {}, this[Wi] = !1;
  }
  createMockScopeDispatchData(e, t, r = {}) {
    const s = Kp(t), o = this[Wi] ? { "content-length": s.length } : {}, i = { ...this[Hi], ...o, ...r.headers }, c = { ...this[Vi], ...r.trailers };
    return { statusCode: e, data: t, headers: i, trailers: c };
  }
  validateReplyParameters(e, t, r) {
    if (typeof e > "u")
      throw new nt("statusCode must be defined");
    if (typeof t > "u")
      throw new nt("data must be defined");
    if (typeof r != "object")
      throw new nt("responseOptions must be an object");
  }
  /**
   * Mock an undici request with a defined reply.
   */
  reply(e) {
    if (typeof e == "function") {
      const c = (u) => {
        const l = e(u);
        if (typeof l != "object")
          throw new nt("reply options callback must return an object");
        const { statusCode: h, data: E = "", responseOptions: f = {} } = l;
        return this.validateReplyParameters(h, E, f), {
          ...this.createMockScopeDispatchData(h, E, f)
        };
      }, g = Oi(this[Mn], this[Yn], c);
      return new to(g);
    }
    const [t, r = "", s = {}] = [...arguments];
    this.validateReplyParameters(t, r, s);
    const o = this.createMockScopeDispatchData(t, r, s), i = Oi(this[Mn], this[Yn], o);
    return new to(i);
  }
  /**
   * Mock an undici request with a defined error.
   */
  replyWithError(e) {
    if (typeof e > "u")
      throw new nt("error must be defined");
    const t = Oi(this[Mn], this[Yn], { error: e });
    return new to(t);
  }
  /**
   * Set default reply headers on the interceptor for subsequent replies
   */
  defaultReplyHeaders(e) {
    if (typeof e > "u")
      throw new nt("headers must be defined");
    return this[Hi] = e, this;
  }
  /**
   * Set default reply trailers on the interceptor for subsequent replies
   */
  defaultReplyTrailers(e) {
    if (typeof e > "u")
      throw new nt("trailers must be defined");
    return this[Vi] = e, this;
  }
  /**
   * Set reply content length header for replies on the interceptor
   */
  replyContentLength() {
    return this[Wi] = !0, this;
  }
};
bo.MockInterceptor = tm;
bo.MockScope = to;
const { promisify: rm } = G, sm = mo, { buildMockDispatch: nm } = wo, {
  kDispatches: Dl,
  kMockAgent: Sl,
  kClose: kl,
  kOriginalClose: Fl,
  kOrigin: Tl,
  kOriginalDispatch: om,
  kConnected: qi
} = $s, { MockInterceptor: im } = bo, Nl = He, { InvalidArgumentError: am } = Me;
let cm = class extends sm {
  constructor(e, t) {
    if (super(e, t), !t || !t.agent || typeof t.agent.dispatch != "function")
      throw new am("Argument opts.agent must implement Agent");
    this[Sl] = t.agent, this[Tl] = e, this[Dl] = [], this[qi] = 1, this[om] = this.dispatch, this[Fl] = this.close.bind(this), this.dispatch = nm.call(this), this.close = this[kl];
  }
  get [Nl.kConnected]() {
    return this[qi];
  }
  /**
   * Sets up the base interceptor for mocking replies from undici.
   */
  intercept(e) {
    return new im(e, this[Dl]);
  }
  async [kl]() {
    await rm(this[Fl])(), this[qi] = 0, this[Sl][Nl.kClients].delete(this[Tl]);
  }
};
var Th = cm;
const { promisify: gm } = G, lm = zs, { buildMockDispatch: um } = wo, {
  kDispatches: Ul,
  kMockAgent: Ll,
  kClose: _l,
  kOriginalClose: vl,
  kOrigin: Gl,
  kOriginalDispatch: Em,
  kConnected: xi
} = $s, { MockInterceptor: hm } = bo, Ml = He, { InvalidArgumentError: Qm } = Me;
let Cm = class extends lm {
  constructor(e, t) {
    if (super(e, t), !t || !t.agent || typeof t.agent.dispatch != "function")
      throw new Qm("Argument opts.agent must implement Agent");
    this[Ll] = t.agent, this[Gl] = e, this[Ul] = [], this[xi] = 1, this[Em] = this.dispatch, this[vl] = this.close.bind(this), this.dispatch = um.call(this), this.close = this[_l];
  }
  get [Ml.kConnected]() {
    return this[xi];
  }
  /**
   * Sets up the base interceptor for mocking replies from undici.
   */
  intercept(e) {
    return new hm(e, this[Ul]);
  }
  async [_l]() {
    await gm(this[vl])(), this[xi] = 0, this[Ll][Ml.kClients].delete(this[Gl]);
  }
};
var Nh = Cm;
const dm = {
  pronoun: "it",
  is: "is",
  was: "was",
  this: "this"
}, Bm = {
  pronoun: "they",
  is: "are",
  was: "were",
  this: "these"
};
var Im = class {
  constructor(e, t) {
    this.singular = e, this.plural = t;
  }
  pluralize(e) {
    const t = e === 1, r = t ? dm : Bm, s = t ? this.singular : this.plural;
    return { ...r, count: e, noun: s };
  }
};
const { Transform: fm } = G, { Console: pm } = G;
var mm = class {
  constructor({ disableColors: e } = {}) {
    this.transform = new fm({
      transform(t, r, s) {
        s(null, t);
      }
    }), this.logger = new pm({
      stdout: this.transform,
      inspectOptions: {
        colors: !e && !process.env.CI
      }
    });
  }
  format(e) {
    const t = e.map(
      ({ method: r, path: s, data: { statusCode: o }, persist: i, times: c, timesInvoked: g, origin: u }) => ({
        Method: r,
        Origin: u,
        Path: s,
        "Status code": o,
        Persistent: i ? "✅" : "❌",
        Invocations: g,
        Remaining: i ? 1 / 0 : c - g
      })
    );
    return this.logger.table(t), this.transform.read().toString();
  }
};
const { kClients: ar } = He, ym = yo, {
  kAgent: ji,
  kMockAgentSet: Jn,
  kMockAgentGet: Yl,
  kDispatches: zi,
  kIsMockActive: On,
  kNetConnect: cr,
  kGetNetConnect: wm,
  kOptions: Hn,
  kFactory: Vn
} = $s, bm = Th, Rm = Nh, { matchValue: Dm, buildMockOptions: Sm } = wo, { InvalidArgumentError: Pl, UndiciError: km } = Me, Fm = ac, Tm = Im, Nm = mm;
class Um {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}
let Lm = class extends Fm {
  constructor(e) {
    if (super(e), this[cr] = !0, this[On] = !0, e && e.agent && typeof e.agent.dispatch != "function")
      throw new Pl("Argument opts.agent must implement Agent");
    const t = e && e.agent ? e.agent : new ym(e);
    this[ji] = t, this[ar] = t[ar], this[Hn] = Sm(e);
  }
  get(e) {
    let t = this[Yl](e);
    return t || (t = this[Vn](e), this[Jn](e, t)), t;
  }
  dispatch(e, t) {
    return this.get(e.origin), this[ji].dispatch(e, t);
  }
  async close() {
    await this[ji].close(), this[ar].clear();
  }
  deactivate() {
    this[On] = !1;
  }
  activate() {
    this[On] = !0;
  }
  enableNetConnect(e) {
    if (typeof e == "string" || typeof e == "function" || e instanceof RegExp)
      Array.isArray(this[cr]) ? this[cr].push(e) : this[cr] = [e];
    else if (typeof e > "u")
      this[cr] = !0;
    else
      throw new Pl("Unsupported matcher. Must be one of String|Function|RegExp.");
  }
  disableNetConnect() {
    this[cr] = !1;
  }
  // This is required to bypass issues caused by using global symbols - see:
  // https://github.com/nodejs/undici/issues/1447
  get isMockActive() {
    return this[On];
  }
  [Jn](e, t) {
    this[ar].set(e, new Um(t));
  }
  [Vn](e) {
    const t = Object.assign({ agent: this }, this[Hn]);
    return this[Hn] && this[Hn].connections === 1 ? new bm(e, t) : new Rm(e, t);
  }
  [Yl](e) {
    const t = this[ar].get(e);
    if (t)
      return t.deref();
    if (typeof e != "string") {
      const r = this[Vn]("http://localhost:9999");
      return this[Jn](e, r), r;
    }
    for (const [r, s] of Array.from(this[ar])) {
      const o = s.deref();
      if (o && typeof r != "string" && Dm(r, e)) {
        const i = this[Vn](e);
        return this[Jn](e, i), i[zi] = o[zi], i;
      }
    }
  }
  [wm]() {
    return this[cr];
  }
  pendingInterceptors() {
    const e = this[ar];
    return Array.from(e.entries()).flatMap(([t, r]) => r.deref()[zi].map((s) => ({ ...s, origin: t }))).filter(({ pending: t }) => t);
  }
  assertNoPendingInterceptors({ pendingInterceptorsFormatter: e = new Nm() } = {}) {
    const t = this.pendingInterceptors();
    if (t.length === 0)
      return;
    const r = new Tm("interceptor", "interceptors").pluralize(t.length);
    throw new km(`
${r.count} ${r.noun} ${r.is} pending:

${e.format(t)}
`.trim());
  }
};
var _m = Lm;
const { kProxy: vm, kClose: Gm, kDestroy: Mm, kInterceptors: Ym } = He, { URL: Jl } = G, Ol = yo, Pm = zs, Jm = Io, { InvalidArgumentError: Ps, RequestAbortedError: Om } = Me, Hl = fo, Ts = Symbol("proxy agent"), Wn = Symbol("proxy client"), Ns = Symbol("proxy headers"), Zi = Symbol("request tls settings"), Hm = Symbol("proxy tls settings"), Vl = Symbol("connect endpoint function");
function Vm(A) {
  return A === "https:" ? 443 : 80;
}
function Wm(A) {
  if (typeof A == "string" && (A = { uri: A }), !A || !A.uri)
    throw new Ps("Proxy opts.uri is mandatory");
  return {
    uri: A.uri,
    protocol: A.protocol || "https"
  };
}
function qm(A, e) {
  return new Pm(A, e);
}
let xm = class extends Jm {
  constructor(e) {
    if (super(e), this[vm] = Wm(e), this[Ts] = new Ol(e), this[Ym] = e.interceptors && e.interceptors.ProxyAgent && Array.isArray(e.interceptors.ProxyAgent) ? e.interceptors.ProxyAgent : [], typeof e == "string" && (e = { uri: e }), !e || !e.uri)
      throw new Ps("Proxy opts.uri is mandatory");
    const { clientFactory: t = qm } = e;
    if (typeof t != "function")
      throw new Ps("Proxy opts.clientFactory must be a function.");
    this[Zi] = e.requestTls, this[Hm] = e.proxyTls, this[Ns] = e.headers || {};
    const r = new Jl(e.uri), { origin: s, port: o, host: i, username: c, password: g } = r;
    if (e.auth && e.token)
      throw new Ps("opts.auth cannot be used in combination with opts.token");
    e.auth ? this[Ns]["proxy-authorization"] = `Basic ${e.auth}` : e.token ? this[Ns]["proxy-authorization"] = e.token : c && g && (this[Ns]["proxy-authorization"] = `Basic ${Buffer.from(`${decodeURIComponent(c)}:${decodeURIComponent(g)}`).toString("base64")}`);
    const u = Hl({ ...e.proxyTls });
    this[Vl] = Hl({ ...e.requestTls }), this[Wn] = t(r, { connect: u }), this[Ts] = new Ol({
      ...e,
      connect: async (l, h) => {
        let E = l.host;
        l.port || (E += `:${Vm(l.protocol)}`);
        try {
          const { socket: f, statusCode: I } = await this[Wn].connect({
            origin: s,
            port: o,
            path: E,
            signal: l.signal,
            headers: {
              ...this[Ns],
              host: i
            }
          });
          if (I !== 200 && (f.on("error", () => {
          }).destroy(), h(new Om(`Proxy response (${I}) !== 200 when HTTP Tunneling`))), l.protocol !== "https:") {
            h(null, f);
            return;
          }
          let C;
          this[Zi] ? C = this[Zi].servername : C = l.servername, this[Vl]({ ...l, servername: C, httpSocket: f }, h);
        } catch (f) {
          h(f);
        }
      }
    });
  }
  dispatch(e, t) {
    const { host: r } = new Jl(e.origin), s = jm(e.headers);
    return zm(s), this[Ts].dispatch(
      {
        ...e,
        headers: {
          ...s,
          host: r
        }
      },
      t
    );
  }
  async [Gm]() {
    await this[Ts].close(), await this[Wn].close();
  }
  async [Mm]() {
    await this[Ts].destroy(), await this[Wn].destroy();
  }
};
function jm(A) {
  if (Array.isArray(A)) {
    const e = {};
    for (let t = 0; t < A.length; t += 2)
      e[A[t]] = A[t + 1];
    return e;
  }
  return A;
}
function zm(A) {
  if (A && Object.keys(A).find((t) => t.toLowerCase() === "proxy-authorization"))
    throw new Ps("Proxy-Authorization should be sent in ProxyAgent constructor");
}
var Zm = xm;
const gr = G, { kRetryHandlerDefaultRetry: Wl } = He, { RequestRetryError: qn } = Me, { isDisturbed: ql, parseHeaders: $m, parseRangeHeader: xl } = ke;
function Xm(A) {
  const e = Date.now();
  return new Date(A).getTime() - e;
}
let Km = class Uh {
  constructor(e, t) {
    const { retryOptions: r, ...s } = e, {
      // Retry scoped
      retry: o,
      maxRetries: i,
      maxTimeout: c,
      minTimeout: g,
      timeoutFactor: u,
      // Response scoped
      methods: l,
      errorCodes: h,
      retryAfter: E,
      statusCodes: f
    } = r ?? {};
    this.dispatch = t.dispatch, this.handler = t.handler, this.opts = s, this.abort = null, this.aborted = !1, this.retryOpts = {
      retry: o ?? Uh[Wl],
      retryAfter: E ?? !0,
      maxTimeout: c ?? 30 * 1e3,
      // 30s,
      timeout: g ?? 500,
      // .5s
      timeoutFactor: u ?? 2,
      maxRetries: i ?? 5,
      // What errors we should retry
      methods: l ?? ["GET", "HEAD", "OPTIONS", "PUT", "DELETE", "TRACE"],
      // Indicates which errors to retry
      statusCodes: f ?? [500, 502, 503, 504, 429],
      // List of errors to retry
      errorCodes: h ?? [
        "ECONNRESET",
        "ECONNREFUSED",
        "ENOTFOUND",
        "ENETDOWN",
        "ENETUNREACH",
        "EHOSTDOWN",
        "EHOSTUNREACH",
        "EPIPE"
      ]
    }, this.retryCount = 0, this.start = 0, this.end = null, this.etag = null, this.resume = null, this.handler.onConnect((I) => {
      this.aborted = !0, this.abort ? this.abort(I) : this.reason = I;
    });
  }
  onRequestSent() {
    this.handler.onRequestSent && this.handler.onRequestSent();
  }
  onUpgrade(e, t, r) {
    this.handler.onUpgrade && this.handler.onUpgrade(e, t, r);
  }
  onConnect(e) {
    this.aborted ? e(this.reason) : this.abort = e;
  }
  onBodySent(e) {
    if (this.handler.onBodySent) return this.handler.onBodySent(e);
  }
  static [Wl](e, { state: t, opts: r }, s) {
    const { statusCode: o, code: i, headers: c } = e, { method: g, retryOptions: u } = r, {
      maxRetries: l,
      timeout: h,
      maxTimeout: E,
      timeoutFactor: f,
      statusCodes: I,
      errorCodes: C,
      methods: B
    } = u;
    let { counter: p, currentTimeout: Q } = t;
    if (Q = Q != null && Q > 0 ? Q : h, i && i !== "UND_ERR_REQ_RETRY" && i !== "UND_ERR_SOCKET" && !C.includes(i)) {
      s(e);
      return;
    }
    if (Array.isArray(B) && !B.includes(g)) {
      s(e);
      return;
    }
    if (o != null && Array.isArray(I) && !I.includes(o)) {
      s(e);
      return;
    }
    if (p > l) {
      s(e);
      return;
    }
    let m = c != null && c["retry-after"];
    m && (m = Number(m), m = isNaN(m) ? Xm(m) : m * 1e3);
    const w = m > 0 ? Math.min(m, E) : Math.min(Q * f ** p, E);
    t.currentTimeout = w, setTimeout(() => s(null), w);
  }
  onHeaders(e, t, r, s) {
    const o = $m(t);
    if (this.retryCount += 1, e >= 300)
      return this.abort(
        new qn("Request failed", e, {
          headers: o,
          count: this.retryCount
        })
      ), !1;
    if (this.resume != null) {
      if (this.resume = null, e !== 206)
        return !0;
      const c = xl(o["content-range"]);
      if (!c)
        return this.abort(
          new qn("Content-Range mismatch", e, {
            headers: o,
            count: this.retryCount
          })
        ), !1;
      if (this.etag != null && this.etag !== o.etag)
        return this.abort(
          new qn("ETag mismatch", e, {
            headers: o,
            count: this.retryCount
          })
        ), !1;
      const { start: g, size: u, end: l = u } = c;
      return gr(this.start === g, "content-range mismatch"), gr(this.end == null || this.end === l, "content-range mismatch"), this.resume = r, !0;
    }
    if (this.end == null) {
      if (e === 206) {
        const c = xl(o["content-range"]);
        if (c == null)
          return this.handler.onHeaders(
            e,
            t,
            r,
            s
          );
        const { start: g, size: u, end: l = u } = c;
        gr(
          g != null && Number.isFinite(g) && this.start !== g,
          "content-range mismatch"
        ), gr(Number.isFinite(g)), gr(
          l != null && Number.isFinite(l) && this.end !== l,
          "invalid content-length"
        ), this.start = g, this.end = l;
      }
      if (this.end == null) {
        const c = o["content-length"];
        this.end = c != null ? Number(c) : null;
      }
      return gr(Number.isFinite(this.start)), gr(
        this.end == null || Number.isFinite(this.end),
        "invalid content-length"
      ), this.resume = r, this.etag = o.etag != null ? o.etag : null, this.handler.onHeaders(
        e,
        t,
        r,
        s
      );
    }
    const i = new qn("Request failed", e, {
      headers: o,
      count: this.retryCount
    });
    return this.abort(i), !1;
  }
  onData(e) {
    return this.start += e.length, this.handler.onData(e);
  }
  onComplete(e) {
    return this.retryCount = 0, this.handler.onComplete(e);
  }
  onError(e) {
    if (this.aborted || ql(this.opts.body))
      return this.handler.onError(e);
    this.retryOpts.retry(
      e,
      {
        state: { counter: this.retryCount++, currentTimeout: this.retryAfter },
        opts: { retryOptions: this.retryOpts, ...this.opts }
      },
      t.bind(this)
    );
    function t(r) {
      if (r != null || this.aborted || ql(this.opts.body))
        return this.handler.onError(r);
      this.start !== 0 && (this.opts = {
        ...this.opts,
        headers: {
          ...this.opts.headers,
          range: `bytes=${this.start}-${this.end ?? ""}`
        }
      });
      try {
        this.dispatch(this.opts, this);
      } catch (s) {
        this.handler.onError(s);
      }
    }
  }
};
var ey = Km;
const Lh = Symbol.for("undici.globalDispatcher.1"), { InvalidArgumentError: Ay } = Me, ty = yo;
vh() === void 0 && _h(new ty());
function _h(A) {
  if (!A || typeof A.dispatch != "function")
    throw new Ay("Argument agent must implement Agent");
  Object.defineProperty(globalThis, Lh, {
    value: A,
    writable: !0,
    enumerable: !1,
    configurable: !1
  });
}
function vh() {
  return globalThis[Lh];
}
var Xs = {
  setGlobalDispatcher: _h,
  getGlobalDispatcher: vh
}, ry = class {
  constructor(e) {
    this.handler = e;
  }
  onConnect(...e) {
    return this.handler.onConnect(...e);
  }
  onError(...e) {
    return this.handler.onError(...e);
  }
  onUpgrade(...e) {
    return this.handler.onUpgrade(...e);
  }
  onHeaders(...e) {
    return this.handler.onHeaders(...e);
  }
  onData(...e) {
    return this.handler.onData(...e);
  }
  onComplete(...e) {
    return this.handler.onComplete(...e);
  }
  onBodySent(...e) {
    return this.handler.onBodySent(...e);
  }
}, $i, jl;
function ss() {
  if (jl) return $i;
  jl = 1;
  const { kHeadersList: A, kConstruct: e } = He, { kGuard: t } = $t(), { kEnumerableProperty: r } = ke, {
    makeIterator: s,
    isValidHeaderName: o,
    isValidHeaderValue: i
  } = ot(), { webidl: c } = LA(), g = G, u = Symbol("headers map"), l = Symbol("headers map sorted");
  function h(p) {
    return p === 10 || p === 13 || p === 9 || p === 32;
  }
  function E(p) {
    let Q = 0, m = p.length;
    for (; m > Q && h(p.charCodeAt(m - 1)); ) --m;
    for (; m > Q && h(p.charCodeAt(Q)); ) ++Q;
    return Q === 0 && m === p.length ? p : p.substring(Q, m);
  }
  function f(p, Q) {
    if (Array.isArray(Q))
      for (let m = 0; m < Q.length; ++m) {
        const w = Q[m];
        if (w.length !== 2)
          throw c.errors.exception({
            header: "Headers constructor",
            message: `expected name/value pair to be length 2, found ${w.length}.`
          });
        I(p, w[0], w[1]);
      }
    else if (typeof Q == "object" && Q !== null) {
      const m = Object.keys(Q);
      for (let w = 0; w < m.length; ++w)
        I(p, m[w], Q[m[w]]);
    } else
      throw c.errors.conversionFailed({
        prefix: "Headers constructor",
        argument: "Argument 1",
        types: ["sequence<sequence<ByteString>>", "record<ByteString, ByteString>"]
      });
  }
  function I(p, Q, m) {
    if (m = E(m), o(Q)) {
      if (!i(m))
        throw c.errors.invalidArgument({
          prefix: "Headers.append",
          value: m,
          type: "header value"
        });
    } else throw c.errors.invalidArgument({
      prefix: "Headers.append",
      value: Q,
      type: "header name"
    });
    if (p[t] === "immutable")
      throw new TypeError("immutable");
    return p[t], p[A].append(Q, m);
  }
  class C {
    /** @type {[string, string][]|null} */
    cookies = null;
    constructor(Q) {
      Q instanceof C ? (this[u] = new Map(Q[u]), this[l] = Q[l], this.cookies = Q.cookies === null ? null : [...Q.cookies]) : (this[u] = new Map(Q), this[l] = null);
    }
    // https://fetch.spec.whatwg.org/#header-list-contains
    contains(Q) {
      return Q = Q.toLowerCase(), this[u].has(Q);
    }
    clear() {
      this[u].clear(), this[l] = null, this.cookies = null;
    }
    // https://fetch.spec.whatwg.org/#concept-header-list-append
    append(Q, m) {
      this[l] = null;
      const w = Q.toLowerCase(), y = this[u].get(w);
      if (y) {
        const b = w === "cookie" ? "; " : ", ";
        this[u].set(w, {
          name: y.name,
          value: `${y.value}${b}${m}`
        });
      } else
        this[u].set(w, { name: Q, value: m });
      w === "set-cookie" && (this.cookies ??= [], this.cookies.push(m));
    }
    // https://fetch.spec.whatwg.org/#concept-header-list-set
    set(Q, m) {
      this[l] = null;
      const w = Q.toLowerCase();
      w === "set-cookie" && (this.cookies = [m]), this[u].set(w, { name: Q, value: m });
    }
    // https://fetch.spec.whatwg.org/#concept-header-list-delete
    delete(Q) {
      this[l] = null, Q = Q.toLowerCase(), Q === "set-cookie" && (this.cookies = null), this[u].delete(Q);
    }
    // https://fetch.spec.whatwg.org/#concept-header-list-get
    get(Q) {
      const m = this[u].get(Q.toLowerCase());
      return m === void 0 ? null : m.value;
    }
    *[Symbol.iterator]() {
      for (const [Q, { value: m }] of this[u])
        yield [Q, m];
    }
    get entries() {
      const Q = {};
      if (this[u].size)
        for (const { name: m, value: w } of this[u].values())
          Q[m] = w;
      return Q;
    }
  }
  class B {
    constructor(Q = void 0) {
      Q !== e && (this[A] = new C(), this[t] = "none", Q !== void 0 && (Q = c.converters.HeadersInit(Q), f(this, Q)));
    }
    // https://fetch.spec.whatwg.org/#dom-headers-append
    append(Q, m) {
      return c.brandCheck(this, B), c.argumentLengthCheck(arguments, 2, { header: "Headers.append" }), Q = c.converters.ByteString(Q), m = c.converters.ByteString(m), I(this, Q, m);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-delete
    delete(Q) {
      if (c.brandCheck(this, B), c.argumentLengthCheck(arguments, 1, { header: "Headers.delete" }), Q = c.converters.ByteString(Q), !o(Q))
        throw c.errors.invalidArgument({
          prefix: "Headers.delete",
          value: Q,
          type: "header name"
        });
      if (this[t] === "immutable")
        throw new TypeError("immutable");
      this[t], this[A].contains(Q) && this[A].delete(Q);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-get
    get(Q) {
      if (c.brandCheck(this, B), c.argumentLengthCheck(arguments, 1, { header: "Headers.get" }), Q = c.converters.ByteString(Q), !o(Q))
        throw c.errors.invalidArgument({
          prefix: "Headers.get",
          value: Q,
          type: "header name"
        });
      return this[A].get(Q);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-has
    has(Q) {
      if (c.brandCheck(this, B), c.argumentLengthCheck(arguments, 1, { header: "Headers.has" }), Q = c.converters.ByteString(Q), !o(Q))
        throw c.errors.invalidArgument({
          prefix: "Headers.has",
          value: Q,
          type: "header name"
        });
      return this[A].contains(Q);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-set
    set(Q, m) {
      if (c.brandCheck(this, B), c.argumentLengthCheck(arguments, 2, { header: "Headers.set" }), Q = c.converters.ByteString(Q), m = c.converters.ByteString(m), m = E(m), o(Q)) {
        if (!i(m))
          throw c.errors.invalidArgument({
            prefix: "Headers.set",
            value: m,
            type: "header value"
          });
      } else throw c.errors.invalidArgument({
        prefix: "Headers.set",
        value: Q,
        type: "header name"
      });
      if (this[t] === "immutable")
        throw new TypeError("immutable");
      this[t], this[A].set(Q, m);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-getsetcookie
    getSetCookie() {
      c.brandCheck(this, B);
      const Q = this[A].cookies;
      return Q ? [...Q] : [];
    }
    // https://fetch.spec.whatwg.org/#concept-header-list-sort-and-combine
    get [l]() {
      if (this[A][l])
        return this[A][l];
      const Q = [], m = [...this[A]].sort((y, b) => y[0] < b[0] ? -1 : 1), w = this[A].cookies;
      for (let y = 0; y < m.length; ++y) {
        const [b, S] = m[y];
        if (b === "set-cookie")
          for (let D = 0; D < w.length; ++D)
            Q.push([b, w[D]]);
        else
          g(S !== null), Q.push([b, S]);
      }
      return this[A][l] = Q, Q;
    }
    keys() {
      if (c.brandCheck(this, B), this[t] === "immutable") {
        const Q = this[l];
        return s(
          () => Q,
          "Headers",
          "key"
        );
      }
      return s(
        () => [...this[l].values()],
        "Headers",
        "key"
      );
    }
    values() {
      if (c.brandCheck(this, B), this[t] === "immutable") {
        const Q = this[l];
        return s(
          () => Q,
          "Headers",
          "value"
        );
      }
      return s(
        () => [...this[l].values()],
        "Headers",
        "value"
      );
    }
    entries() {
      if (c.brandCheck(this, B), this[t] === "immutable") {
        const Q = this[l];
        return s(
          () => Q,
          "Headers",
          "key+value"
        );
      }
      return s(
        () => [...this[l].values()],
        "Headers",
        "key+value"
      );
    }
    /**
     * @param {(value: string, key: string, self: Headers) => void} callbackFn
     * @param {unknown} thisArg
     */
    forEach(Q, m = globalThis) {
      if (c.brandCheck(this, B), c.argumentLengthCheck(arguments, 1, { header: "Headers.forEach" }), typeof Q != "function")
        throw new TypeError(
          "Failed to execute 'forEach' on 'Headers': parameter 1 is not of type 'Function'."
        );
      for (const [w, y] of this)
        Q.apply(m, [y, w, this]);
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
      return c.brandCheck(this, B), this[A];
    }
  }
  return B.prototype[Symbol.iterator] = B.prototype.entries, Object.defineProperties(B.prototype, {
    append: r,
    delete: r,
    get: r,
    has: r,
    set: r,
    getSetCookie: r,
    keys: r,
    values: r,
    entries: r,
    forEach: r,
    [Symbol.iterator]: { enumerable: !1 },
    [Symbol.toStringTag]: {
      value: "Headers",
      configurable: !0
    }
  }), c.converters.HeadersInit = function(p) {
    if (c.util.Type(p) === "Object")
      return p[Symbol.iterator] ? c.converters["sequence<sequence<ByteString>>"](p) : c.converters["record<ByteString, ByteString>"](p);
    throw c.errors.conversionFailed({
      prefix: "Headers constructor",
      argument: "Argument 1",
      types: ["sequence<sequence<ByteString>>", "record<ByteString, ByteString>"]
    });
  }, $i = {
    fill: f,
    Headers: B,
    HeadersList: C
  }, $i;
}
var Xi, zl;
function Ec() {
  if (zl) return Xi;
  zl = 1;
  const { Headers: A, HeadersList: e, fill: t } = ss(), { extractBody: r, cloneBody: s, mixinBody: o } = Bo(), i = ke, { kEnumerableProperty: c } = i, {
    isValidReasonPhrase: g,
    isCancelled: u,
    isAborted: l,
    isBlobLike: h,
    serializeJavascriptValueToJSONString: E,
    isErrorLike: f,
    isomorphicEncode: I
  } = ot(), {
    redirectStatusSet: C,
    nullBodyStatus: B,
    DOMException: p
  } = fr(), { kState: Q, kHeaders: m, kGuard: w, kRealm: y } = $t(), { webidl: b } = LA(), { FormData: S } = ic(), { getGlobalOrigin: D } = js(), { URLSerializer: N } = Bt(), { kHeadersList: v, kConstruct: _ } = He, U = G, { types: z } = G, P = globalThis.ReadableStream || G.ReadableStream, ee = new TextEncoder("utf-8");
  class te {
    // Creates network error Response.
    static error() {
      const q = { settingsObject: {} }, K = new te();
      return K[Q] = Qe(), K[y] = q, K[m][v] = K[Q].headersList, K[m][w] = "immutable", K[m][y] = q, K;
    }
    // https://fetch.spec.whatwg.org/#dom-response-json
    static json(q, K = {}) {
      b.argumentLengthCheck(arguments, 1, { header: "Response.json" }), K !== null && (K = b.converters.ResponseInit(K));
      const Ae = ee.encode(
        E(q)
      ), $ = r(Ae), Z = { settingsObject: {} }, J = new te();
      return J[y] = Z, J[m][w] = "response", J[m][y] = Z, M(J, K, { body: $[0], type: "application/json" }), J;
    }
    // Creates a redirect Response that redirects to url with status status.
    static redirect(q, K = 302) {
      const Ae = { settingsObject: {} };
      b.argumentLengthCheck(arguments, 1, { header: "Response.redirect" }), q = b.converters.USVString(q), K = b.converters["unsigned short"](K);
      let $;
      try {
        $ = new URL(q, D());
      } catch (he) {
        throw Object.assign(new TypeError("Failed to parse URL from " + q), {
          cause: he
        });
      }
      if (!C.has(K))
        throw new RangeError("Invalid status code " + K);
      const Z = new te();
      Z[y] = Ae, Z[m][w] = "immutable", Z[m][y] = Ae, Z[Q].status = K;
      const J = I(N($));
      return Z[Q].headersList.append("location", J), Z;
    }
    // https://fetch.spec.whatwg.org/#dom-response
    constructor(q = null, K = {}) {
      q !== null && (q = b.converters.BodyInit(q)), K = b.converters.ResponseInit(K), this[y] = { settingsObject: {} }, this[Q] = ne({}), this[m] = new A(_), this[m][w] = "response", this[m][v] = this[Q].headersList, this[m][y] = this[y];
      let Ae = null;
      if (q != null) {
        const [$, Z] = r(q);
        Ae = { body: $, type: Z };
      }
      M(this, K, Ae);
    }
    // Returns response’s type, e.g., "cors".
    get type() {
      return b.brandCheck(this, te), this[Q].type;
    }
    // Returns response’s URL, if it has one; otherwise the empty string.
    get url() {
      b.brandCheck(this, te);
      const q = this[Q].urlList, K = q[q.length - 1] ?? null;
      return K === null ? "" : N(K, !0);
    }
    // Returns whether response was obtained through a redirect.
    get redirected() {
      return b.brandCheck(this, te), this[Q].urlList.length > 1;
    }
    // Returns response’s status.
    get status() {
      return b.brandCheck(this, te), this[Q].status;
    }
    // Returns whether response’s status is an ok status.
    get ok() {
      return b.brandCheck(this, te), this[Q].status >= 200 && this[Q].status <= 299;
    }
    // Returns response’s status message.
    get statusText() {
      return b.brandCheck(this, te), this[Q].statusText;
    }
    // Returns response’s headers as Headers.
    get headers() {
      return b.brandCheck(this, te), this[m];
    }
    get body() {
      return b.brandCheck(this, te), this[Q].body ? this[Q].body.stream : null;
    }
    get bodyUsed() {
      return b.brandCheck(this, te), !!this[Q].body && i.isDisturbed(this[Q].body.stream);
    }
    // Returns a clone of response.
    clone() {
      if (b.brandCheck(this, te), this.bodyUsed || this.body && this.body.locked)
        throw b.errors.exception({
          header: "Response.clone",
          message: "Body has already been consumed."
        });
      const q = ge(this[Q]), K = new te();
      return K[Q] = q, K[y] = this[y], K[m][v] = q.headersList, K[m][w] = this[m][w], K[m][y] = this[m][y], K;
    }
  }
  o(te), Object.defineProperties(te.prototype, {
    type: c,
    url: c,
    status: c,
    ok: c,
    redirected: c,
    statusText: c,
    headers: c,
    clone: c,
    body: c,
    bodyUsed: c,
    [Symbol.toStringTag]: {
      value: "Response",
      configurable: !0
    }
  }), Object.defineProperties(te, {
    json: c,
    redirect: c,
    error: c
  });
  function ge(L) {
    if (L.internalResponse)
      return oe(
        ge(L.internalResponse),
        L.type
      );
    const q = ne({ ...L, body: null });
    return L.body != null && (q.body = s(L.body)), q;
  }
  function ne(L) {
    return {
      aborted: !1,
      rangeRequested: !1,
      timingAllowPassed: !1,
      requestIncludesCredentials: !1,
      type: "default",
      status: 200,
      timingInfo: null,
      cacheState: "",
      statusText: "",
      ...L,
      headersList: L.headersList ? new e(L.headersList) : new e(),
      urlList: L.urlList ? [...L.urlList] : []
    };
  }
  function Qe(L) {
    const q = f(L);
    return ne({
      type: "error",
      status: 0,
      error: q ? L : new Error(L && String(L)),
      aborted: L && L.name === "AbortError"
    });
  }
  function W(L, q) {
    return q = {
      internalResponse: L,
      ...q
    }, new Proxy(L, {
      get(K, Ae) {
        return Ae in q ? q[Ae] : K[Ae];
      },
      set(K, Ae, $) {
        return U(!(Ae in q)), K[Ae] = $, !0;
      }
    });
  }
  function oe(L, q) {
    if (q === "basic")
      return W(L, {
        type: "basic",
        headersList: L.headersList
      });
    if (q === "cors")
      return W(L, {
        type: "cors",
        headersList: L.headersList
      });
    if (q === "opaque")
      return W(L, {
        type: "opaque",
        urlList: Object.freeze([]),
        status: 0,
        statusText: "",
        body: null
      });
    if (q === "opaqueredirect")
      return W(L, {
        type: "opaqueredirect",
        status: 0,
        statusText: "",
        headersList: [],
        body: null
      });
    U(!1);
  }
  function le(L, q = null) {
    return U(u(L)), l(L) ? Qe(Object.assign(new p("The operation was aborted.", "AbortError"), { cause: q })) : Qe(Object.assign(new p("Request was cancelled."), { cause: q }));
  }
  function M(L, q, K) {
    if (q.status !== null && (q.status < 200 || q.status > 599))
      throw new RangeError('init["status"] must be in the range of 200 to 599, inclusive.');
    if ("statusText" in q && q.statusText != null && !g(String(q.statusText)))
      throw new TypeError("Invalid statusText");
    if ("status" in q && q.status != null && (L[Q].status = q.status), "statusText" in q && q.statusText != null && (L[Q].statusText = q.statusText), "headers" in q && q.headers != null && t(L[m], q.headers), K) {
      if (B.includes(L.status))
        throw b.errors.exception({
          header: "Response constructor",
          message: "Invalid response status code " + L.status
        });
      L[Q].body = K.body, K.type != null && !L[Q].headersList.contains("Content-Type") && L[Q].headersList.append("content-type", K.type);
    }
  }
  return b.converters.ReadableStream = b.interfaceConverter(
    P
  ), b.converters.FormData = b.interfaceConverter(
    S
  ), b.converters.URLSearchParams = b.interfaceConverter(
    URLSearchParams
  ), b.converters.XMLHttpRequestBodyInit = function(L) {
    return typeof L == "string" ? b.converters.USVString(L) : h(L) ? b.converters.Blob(L, { strict: !1 }) : z.isArrayBuffer(L) || z.isTypedArray(L) || z.isDataView(L) ? b.converters.BufferSource(L) : i.isFormDataLike(L) ? b.converters.FormData(L, { strict: !1 }) : L instanceof URLSearchParams ? b.converters.URLSearchParams(L) : b.converters.DOMString(L);
  }, b.converters.BodyInit = function(L) {
    return L instanceof P ? b.converters.ReadableStream(L) : L?.[Symbol.asyncIterator] ? L : b.converters.XMLHttpRequestBodyInit(L);
  }, b.converters.ResponseInit = b.dictionaryConverter([
    {
      key: "status",
      converter: b.converters["unsigned short"],
      defaultValue: 200
    },
    {
      key: "statusText",
      converter: b.converters.ByteString,
      defaultValue: ""
    },
    {
      key: "headers",
      converter: b.converters.HeadersInit
    }
  ]), Xi = {
    makeNetworkError: Qe,
    makeResponse: ne,
    makeAppropriateNetworkError: le,
    filterResponse: oe,
    Response: te,
    cloneResponse: ge
  }, Xi;
}
var Ki, Zl;
function Ro() {
  if (Zl) return Ki;
  Zl = 1;
  const { extractBody: A, mixinBody: e, cloneBody: t } = Bo(), { Headers: r, fill: s, HeadersList: o } = ss(), { FinalizationRegistry: i } = ih(), c = ke, {
    isValidHTTPToken: g,
    sameOrigin: u,
    normalizeMethod: l,
    makePolicyContainer: h,
    normalizeMethodRecord: E
  } = ot(), {
    forbiddenMethodsSet: f,
    corsSafeListedMethodsSet: I,
    referrerPolicy: C,
    requestRedirect: B,
    requestMode: p,
    requestCredentials: Q,
    requestCache: m,
    requestDuplex: w
  } = fr(), { kEnumerableProperty: y } = c, { kHeaders: b, kSignal: S, kState: D, kGuard: N, kRealm: v } = $t(), { webidl: _ } = LA(), { getGlobalOrigin: U } = js(), { URLSerializer: z } = Bt(), { kHeadersList: P, kConstruct: ee } = He, te = G, { getMaxListeners: ge, setMaxListeners: ne, getEventListeners: Qe, defaultMaxListeners: W } = G;
  let oe = globalThis.TransformStream;
  const le = Symbol("abortController"), M = new i(({ signal: Ae, abort: $ }) => {
    Ae.removeEventListener("abort", $);
  });
  class L {
    // https://fetch.spec.whatwg.org/#dom-request
    constructor($, Z = {}) {
      if ($ === ee)
        return;
      _.argumentLengthCheck(arguments, 1, { header: "Request constructor" }), $ = _.converters.RequestInfo($), Z = _.converters.RequestInit(Z), this[v] = {
        settingsObject: {
          baseUrl: U(),
          get origin() {
            return this.baseUrl?.origin;
          },
          policyContainer: h()
        }
      };
      let J = null, he = null;
      const we = this[v].settingsObject.baseUrl;
      let fe = null;
      if (typeof $ == "string") {
        let be;
        try {
          be = new URL($, we);
        } catch (Le) {
          throw new TypeError("Failed to parse URL from " + $, { cause: Le });
        }
        if (be.username || be.password)
          throw new TypeError(
            "Request cannot be constructed from a URL that includes credentials: " + $
          );
        J = q({ urlList: [be] }), he = "cors";
      } else
        te($ instanceof L), J = $[D], fe = $[S];
      const Ye = this[v].settingsObject.origin;
      let Ue = "client";
      if (J.window?.constructor?.name === "EnvironmentSettingsObject" && u(J.window, Ye) && (Ue = J.window), Z.window != null)
        throw new TypeError(`'window' option '${Ue}' must be null`);
      "window" in Z && (Ue = "no-window"), J = q({
        // URL request’s URL.
        // undici implementation note: this is set as the first item in request's urlList in makeRequest
        // method request’s method.
        method: J.method,
        // header list A copy of request’s header list.
        // undici implementation note: headersList is cloned in makeRequest
        headersList: J.headersList,
        // unsafe-request flag Set.
        unsafeRequest: J.unsafeRequest,
        // client This’s relevant settings object.
        client: this[v].settingsObject,
        // window window.
        window: Ue,
        // priority request’s priority.
        priority: J.priority,
        // origin request’s origin. The propagation of the origin is only significant for navigation requests
        // being handled by a service worker. In this scenario a request can have an origin that is different
        // from the current client.
        origin: J.origin,
        // referrer request’s referrer.
        referrer: J.referrer,
        // referrer policy request’s referrer policy.
        referrerPolicy: J.referrerPolicy,
        // mode request’s mode.
        mode: J.mode,
        // credentials mode request’s credentials mode.
        credentials: J.credentials,
        // cache mode request’s cache mode.
        cache: J.cache,
        // redirect mode request’s redirect mode.
        redirect: J.redirect,
        // integrity metadata request’s integrity metadata.
        integrity: J.integrity,
        // keepalive request’s keepalive.
        keepalive: J.keepalive,
        // reload-navigation flag request’s reload-navigation flag.
        reloadNavigation: J.reloadNavigation,
        // history-navigation flag request’s history-navigation flag.
        historyNavigation: J.historyNavigation,
        // URL list A clone of request’s URL list.
        urlList: [...J.urlList]
      });
      const Pe = Object.keys(Z).length !== 0;
      if (Pe && (J.mode === "navigate" && (J.mode = "same-origin"), J.reloadNavigation = !1, J.historyNavigation = !1, J.origin = "client", J.referrer = "client", J.referrerPolicy = "", J.url = J.urlList[J.urlList.length - 1], J.urlList = [J.url]), Z.referrer !== void 0) {
        const be = Z.referrer;
        if (be === "")
          J.referrer = "no-referrer";
        else {
          let Le;
          try {
            Le = new URL(be, we);
          } catch (Ze) {
            throw new TypeError(`Referrer "${be}" is not a valid URL.`, { cause: Ze });
          }
          Le.protocol === "about:" && Le.hostname === "client" || Ye && !u(Le, this[v].settingsObject.baseUrl) ? J.referrer = "client" : J.referrer = Le;
        }
      }
      Z.referrerPolicy !== void 0 && (J.referrerPolicy = Z.referrerPolicy);
      let Ve;
      if (Z.mode !== void 0 ? Ve = Z.mode : Ve = he, Ve === "navigate")
        throw _.errors.exception({
          header: "Request constructor",
          message: "invalid request mode navigate."
        });
      if (Ve != null && (J.mode = Ve), Z.credentials !== void 0 && (J.credentials = Z.credentials), Z.cache !== void 0 && (J.cache = Z.cache), J.cache === "only-if-cached" && J.mode !== "same-origin")
        throw new TypeError(
          "'only-if-cached' can be set only with 'same-origin' mode"
        );
      if (Z.redirect !== void 0 && (J.redirect = Z.redirect), Z.integrity != null && (J.integrity = String(Z.integrity)), Z.keepalive !== void 0 && (J.keepalive = !!Z.keepalive), Z.method !== void 0) {
        let be = Z.method;
        if (!g(be))
          throw new TypeError(`'${be}' is not a valid HTTP method.`);
        if (f.has(be.toUpperCase()))
          throw new TypeError(`'${be}' HTTP method is unsupported.`);
        be = E[be] ?? l(be), J.method = be;
      }
      Z.signal !== void 0 && (fe = Z.signal), this[D] = J;
      const me = new AbortController();
      if (this[S] = me.signal, this[S][v] = this[v], fe != null) {
        if (!fe || typeof fe.aborted != "boolean" || typeof fe.addEventListener != "function")
          throw new TypeError(
            "Failed to construct 'Request': member signal is not of type AbortSignal."
          );
        if (fe.aborted)
          me.abort(fe.reason);
        else {
          this[le] = me;
          const be = new WeakRef(me), Le = function() {
            const Ze = be.deref();
            Ze !== void 0 && Ze.abort(this.reason);
          };
          try {
            (typeof ge == "function" && ge(fe) === W || Qe(fe, "abort").length >= W) && ne(100, fe);
          } catch {
          }
          c.addAbortListener(fe, Le), M.register(me, { signal: fe, abort: Le });
        }
      }
      if (this[b] = new r(ee), this[b][P] = J.headersList, this[b][N] = "request", this[b][v] = this[v], Ve === "no-cors") {
        if (!I.has(J.method))
          throw new TypeError(
            `'${J.method} is unsupported in no-cors mode.`
          );
        this[b][N] = "request-no-cors";
      }
      if (Pe) {
        const be = this[b][P], Le = Z.headers !== void 0 ? Z.headers : new o(be);
        if (be.clear(), Le instanceof o) {
          for (const [Ze, VA] of Le)
            be.append(Ze, VA);
          be.cookies = Le.cookies;
        } else
          s(this[b], Le);
      }
      const Be = $ instanceof L ? $[D].body : null;
      if ((Z.body != null || Be != null) && (J.method === "GET" || J.method === "HEAD"))
        throw new TypeError("Request with GET/HEAD method cannot have body.");
      let Ne = null;
      if (Z.body != null) {
        const [be, Le] = A(
          Z.body,
          J.keepalive
        );
        Ne = be, Le && !this[b][P].contains("content-type") && this[b].append("content-type", Le);
      }
      const rA = Ne ?? Be;
      if (rA != null && rA.source == null) {
        if (Ne != null && Z.duplex == null)
          throw new TypeError("RequestInit: duplex option is required when sending a body.");
        if (J.mode !== "same-origin" && J.mode !== "cors")
          throw new TypeError(
            'If request is made from ReadableStream, mode should be "same-origin" or "cors"'
          );
        J.useCORSPreflightFlag = !0;
      }
      let $A = rA;
      if (Ne == null && Be != null) {
        if (c.isDisturbed(Be.stream) || Be.stream.locked)
          throw new TypeError(
            "Cannot construct a Request with a Request object that has already been used."
          );
        oe || (oe = G.TransformStream);
        const be = new oe();
        Be.stream.pipeThrough(be), $A = {
          source: Be.source,
          length: Be.length,
          stream: be.readable
        };
      }
      this[D].body = $A;
    }
    // Returns request’s HTTP method, which is "GET" by default.
    get method() {
      return _.brandCheck(this, L), this[D].method;
    }
    // Returns the URL of request as a string.
    get url() {
      return _.brandCheck(this, L), z(this[D].url);
    }
    // Returns a Headers object consisting of the headers associated with request.
    // Note that headers added in the network layer by the user agent will not
    // be accounted for in this object, e.g., the "Host" header.
    get headers() {
      return _.brandCheck(this, L), this[b];
    }
    // Returns the kind of resource requested by request, e.g., "document"
    // or "script".
    get destination() {
      return _.brandCheck(this, L), this[D].destination;
    }
    // Returns the referrer of request. Its value can be a same-origin URL if
    // explicitly set in init, the empty string to indicate no referrer, and
    // "about:client" when defaulting to the global’s default. This is used
    // during fetching to determine the value of the `Referer` header of the
    // request being made.
    get referrer() {
      return _.brandCheck(this, L), this[D].referrer === "no-referrer" ? "" : this[D].referrer === "client" ? "about:client" : this[D].referrer.toString();
    }
    // Returns the referrer policy associated with request.
    // This is used during fetching to compute the value of the request’s
    // referrer.
    get referrerPolicy() {
      return _.brandCheck(this, L), this[D].referrerPolicy;
    }
    // Returns the mode associated with request, which is a string indicating
    // whether the request will use CORS, or will be restricted to same-origin
    // URLs.
    get mode() {
      return _.brandCheck(this, L), this[D].mode;
    }
    // Returns the credentials mode associated with request,
    // which is a string indicating whether credentials will be sent with the
    // request always, never, or only when sent to a same-origin URL.
    get credentials() {
      return this[D].credentials;
    }
    // Returns the cache mode associated with request,
    // which is a string indicating how the request will
    // interact with the browser’s cache when fetching.
    get cache() {
      return _.brandCheck(this, L), this[D].cache;
    }
    // Returns the redirect mode associated with request,
    // which is a string indicating how redirects for the
    // request will be handled during fetching. A request
    // will follow redirects by default.
    get redirect() {
      return _.brandCheck(this, L), this[D].redirect;
    }
    // Returns request’s subresource integrity metadata, which is a
    // cryptographic hash of the resource being fetched. Its value
    // consists of multiple hashes separated by whitespace. [SRI]
    get integrity() {
      return _.brandCheck(this, L), this[D].integrity;
    }
    // Returns a boolean indicating whether or not request can outlive the
    // global in which it was created.
    get keepalive() {
      return _.brandCheck(this, L), this[D].keepalive;
    }
    // Returns a boolean indicating whether or not request is for a reload
    // navigation.
    get isReloadNavigation() {
      return _.brandCheck(this, L), this[D].reloadNavigation;
    }
    // Returns a boolean indicating whether or not request is for a history
    // navigation (a.k.a. back-foward navigation).
    get isHistoryNavigation() {
      return _.brandCheck(this, L), this[D].historyNavigation;
    }
    // Returns the signal associated with request, which is an AbortSignal
    // object indicating whether or not request has been aborted, and its
    // abort event handler.
    get signal() {
      return _.brandCheck(this, L), this[S];
    }
    get body() {
      return _.brandCheck(this, L), this[D].body ? this[D].body.stream : null;
    }
    get bodyUsed() {
      return _.brandCheck(this, L), !!this[D].body && c.isDisturbed(this[D].body.stream);
    }
    get duplex() {
      return _.brandCheck(this, L), "half";
    }
    // Returns a clone of request.
    clone() {
      if (_.brandCheck(this, L), this.bodyUsed || this.body?.locked)
        throw new TypeError("unusable");
      const $ = K(this[D]), Z = new L(ee);
      Z[D] = $, Z[v] = this[v], Z[b] = new r(ee), Z[b][P] = $.headersList, Z[b][N] = this[b][N], Z[b][v] = this[b][v];
      const J = new AbortController();
      return this.signal.aborted ? J.abort(this.signal.reason) : c.addAbortListener(
        this.signal,
        () => {
          J.abort(this.signal.reason);
        }
      ), Z[S] = J.signal, Z;
    }
  }
  e(L);
  function q(Ae) {
    const $ = {
      method: "GET",
      localURLsOnly: !1,
      unsafeRequest: !1,
      body: null,
      client: null,
      reservedClient: null,
      replacesClientId: "",
      window: "client",
      keepalive: !1,
      serviceWorkers: "all",
      initiator: "",
      destination: "",
      priority: null,
      origin: "client",
      policyContainer: "client",
      referrer: "client",
      referrerPolicy: "",
      mode: "no-cors",
      useCORSPreflightFlag: !1,
      credentials: "same-origin",
      useCredentials: !1,
      cache: "default",
      redirect: "follow",
      integrity: "",
      cryptoGraphicsNonceMetadata: "",
      parserMetadata: "",
      reloadNavigation: !1,
      historyNavigation: !1,
      userActivation: !1,
      taintedOrigin: !1,
      redirectCount: 0,
      responseTainting: "basic",
      preventNoCacheCacheControlHeaderModification: !1,
      done: !1,
      timingAllowFailed: !1,
      ...Ae,
      headersList: Ae.headersList ? new o(Ae.headersList) : new o()
    };
    return $.url = $.urlList[0], $;
  }
  function K(Ae) {
    const $ = q({ ...Ae, body: null });
    return Ae.body != null && ($.body = t(Ae.body)), $;
  }
  return Object.defineProperties(L.prototype, {
    method: y,
    url: y,
    headers: y,
    redirect: y,
    clone: y,
    signal: y,
    duplex: y,
    destination: y,
    body: y,
    bodyUsed: y,
    isHistoryNavigation: y,
    isReloadNavigation: y,
    keepalive: y,
    integrity: y,
    cache: y,
    credentials: y,
    attribute: y,
    referrerPolicy: y,
    referrer: y,
    mode: y,
    [Symbol.toStringTag]: {
      value: "Request",
      configurable: !0
    }
  }), _.converters.Request = _.interfaceConverter(
    L
  ), _.converters.RequestInfo = function(Ae) {
    return typeof Ae == "string" ? _.converters.USVString(Ae) : Ae instanceof L ? _.converters.Request(Ae) : _.converters.USVString(Ae);
  }, _.converters.AbortSignal = _.interfaceConverter(
    AbortSignal
  ), _.converters.RequestInit = _.dictionaryConverter([
    {
      key: "method",
      converter: _.converters.ByteString
    },
    {
      key: "headers",
      converter: _.converters.HeadersInit
    },
    {
      key: "body",
      converter: _.nullableConverter(
        _.converters.BodyInit
      )
    },
    {
      key: "referrer",
      converter: _.converters.USVString
    },
    {
      key: "referrerPolicy",
      converter: _.converters.DOMString,
      // https://w3c.github.io/webappsec-referrer-policy/#referrer-policy
      allowedValues: C
    },
    {
      key: "mode",
      converter: _.converters.DOMString,
      // https://fetch.spec.whatwg.org/#concept-request-mode
      allowedValues: p
    },
    {
      key: "credentials",
      converter: _.converters.DOMString,
      // https://fetch.spec.whatwg.org/#requestcredentials
      allowedValues: Q
    },
    {
      key: "cache",
      converter: _.converters.DOMString,
      // https://fetch.spec.whatwg.org/#requestcache
      allowedValues: m
    },
    {
      key: "redirect",
      converter: _.converters.DOMString,
      // https://fetch.spec.whatwg.org/#requestredirect
      allowedValues: B
    },
    {
      key: "integrity",
      converter: _.converters.DOMString
    },
    {
      key: "keepalive",
      converter: _.converters.boolean
    },
    {
      key: "signal",
      converter: _.nullableConverter(
        (Ae) => _.converters.AbortSignal(
          Ae,
          { strict: !1 }
        )
      )
    },
    {
      key: "window",
      converter: _.converters.any
    },
    {
      key: "duplex",
      converter: _.converters.DOMString,
      allowedValues: w
    }
  ]), Ki = { Request: L, makeRequest: q }, Ki;
}
var ea, $l;
function hc() {
  if ($l) return ea;
  $l = 1;
  const {
    Response: A,
    makeNetworkError: e,
    makeAppropriateNetworkError: t,
    filterResponse: r,
    makeResponse: s
  } = Ec(), { Headers: o } = ss(), { Request: i, makeRequest: c } = Ro(), g = G, {
    bytesMatch: u,
    makePolicyContainer: l,
    clonePolicyContainer: h,
    requestBadPort: E,
    TAOCheck: f,
    appendRequestOriginHeader: I,
    responseLocationURL: C,
    requestCurrentURL: B,
    setRequestReferrerPolicyOnRedirect: p,
    tryUpgradeRequestToAPotentiallyTrustworthyURL: Q,
    createOpaqueTimingInfo: m,
    appendFetchMetadata: w,
    corsCheck: y,
    crossOriginResourcePolicyCheck: b,
    determineRequestsReferrer: S,
    coarsenedSharedCurrentTime: D,
    createDeferredPromise: N,
    isBlobLike: v,
    sameOrigin: _,
    isCancelled: U,
    isAborted: z,
    isErrorLike: P,
    fullyReadBody: ee,
    readableStreamClose: te,
    isomorphicEncode: ge,
    urlIsLocal: ne,
    urlIsHttpHttpsScheme: Qe,
    urlHasHttpsScheme: W
  } = ot(), { kState: oe, kHeaders: le, kGuard: M, kRealm: L } = $t(), q = G, { safelyExtractBody: K } = Bo(), {
    redirectStatusSet: Ae,
    nullBodyStatus: $,
    safeMethodsSet: Z,
    requestBodyHeader: J,
    subresourceSet: he,
    DOMException: we
  } = fr(), { kHeadersList: fe } = He, Ye = G, { Readable: Ue, pipeline: Pe } = G, { addAbortListener: Ve, isErrored: me, isReadable: Be, nodeMajor: Ne, nodeMinor: rA } = ke, { dataURLProcessor: $A, serializeAMimeType: be } = Bt(), { TransformStream: Le } = G, { getGlobalDispatcher: Ze } = Xs, { webidl: VA } = LA(), { STATUS_CODES: Nt } = G, F = ["GET", "HEAD"];
  let j, re = globalThis.ReadableStream;
  class Ce extends Ye {
    constructor(se) {
      super(), this.dispatcher = se, this.connection = null, this.dump = !1, this.state = "ongoing", this.setMaxListeners(21);
    }
    terminate(se) {
      this.state === "ongoing" && (this.state = "terminated", this.connection?.destroy(se), this.emit("terminated", se));
    }
    // https://fetch.spec.whatwg.org/#fetch-controller-abort
    abort(se) {
      this.state === "ongoing" && (this.state = "aborted", se || (se = new we("The operation was aborted.", "AbortError")), this.serializedAbortReason = se, this.connection?.destroy(se), this.emit("terminated", se));
    }
  }
  function Re(T, se = {}) {
    VA.argumentLengthCheck(arguments, 1, { header: "globalThis.fetch" });
    const V = N();
    let O;
    try {
      O = new i(T, se);
    } catch (de) {
      return V.reject(de), V.promise;
    }
    const ae = O[oe];
    if (O.signal.aborted)
      return Ke(V, ae, null, O.signal.reason), V.promise;
    ae.client.globalObject?.constructor?.name === "ServiceWorkerGlobalScope" && (ae.serviceWorkers = "none");
    let ye = null;
    const eA = null;
    let dA = !1, _e = null;
    return Ve(
      O.signal,
      () => {
        dA = !0, q(_e != null), _e.abort(O.signal.reason), Ke(V, ae, ye, O.signal.reason);
      }
    ), _e = gA({
      request: ae,
      processResponseEndOfBody: (de) => We(de, "fetch"),
      processResponse: (de) => {
        if (dA)
          return Promise.resolve();
        if (de.aborted)
          return Ke(V, ae, ye, _e.serializedAbortReason), Promise.resolve();
        if (de.type === "error")
          return V.reject(
            Object.assign(new TypeError("fetch failed"), { cause: de.error })
          ), Promise.resolve();
        ye = new A(), ye[oe] = de, ye[L] = eA, ye[le][fe] = de.headersList, ye[le][M] = "immutable", ye[le][L] = eA, V.resolve(ye);
      },
      dispatcher: se.dispatcher ?? Ze()
      // undici
    }), V.promise;
  }
  function We(T, se = "other") {
    if (T.type === "error" && T.aborted || !T.urlList?.length)
      return;
    const V = T.urlList[0];
    let O = T.timingInfo, ae = T.cacheState;
    Qe(V) && O !== null && (T.timingAllowPassed || (O = m({
      startTime: O.startTime
    }), ae = ""), O.endTime = D(), T.timingInfo = O, sA(
      O,
      V,
      se,
      globalThis,
      ae
    ));
  }
  function sA(T, se, V, O, ae) {
    (Ne > 18 || Ne === 18 && rA >= 2) && performance.markResourceTiming(T, se.href, V, O, ae);
  }
  function Ke(T, se, V, O) {
    if (O || (O = new we("The operation was aborted.", "AbortError")), T.reject(O), se.body != null && Be(se.body?.stream) && se.body.stream.cancel(O).catch((X) => {
      if (X.code !== "ERR_INVALID_STATE")
        throw X;
    }), V == null)
      return;
    const ae = V[oe];
    ae.body != null && Be(ae.body?.stream) && ae.body.stream.cancel(O).catch((X) => {
      if (X.code !== "ERR_INVALID_STATE")
        throw X;
    });
  }
  function gA({
    request: T,
    processRequestBodyChunkLength: se,
    processRequestEndOfBody: V,
    processResponse: O,
    processResponseEndOfBody: ae,
    processResponseConsumeBody: X,
    useParallelQueue: ye = !1,
    dispatcher: eA
    // undici
  }) {
    let dA = null, _e = !1;
    T.client != null && (dA = T.client.globalObject, _e = T.client.crossOriginIsolatedCapability);
    const XA = D(_e), Xt = m({
      startTime: XA
    }), de = {
      controller: new Ce(eA),
      request: T,
      timingInfo: Xt,
      processRequestBodyChunkLength: se,
      processRequestEndOfBody: V,
      processResponse: O,
      processResponseConsumeBody: X,
      processResponseEndOfBody: ae,
      taskDestination: dA,
      crossOriginIsolatedCapability: _e
    };
    return q(!T.body || T.body.stream), T.window === "client" && (T.window = T.client?.globalObject?.constructor?.name === "Window" ? T.client : "no-window"), T.origin === "client" && (T.origin = T.client?.origin), T.policyContainer === "client" && (T.client != null ? T.policyContainer = h(
      T.client.policyContainer
    ) : T.policyContainer = l()), T.headersList.contains("accept") || T.headersList.append("accept", "*/*"), T.headersList.contains("accept-language") || T.headersList.append("accept-language", "*"), T.priority, he.has(T.destination), is(de).catch((lA) => {
      de.controller.terminate(lA);
    }), de.controller;
  }
  async function is(T, se = !1) {
    const V = T.request;
    let O = null;
    if (V.localURLsOnly && !ne(B(V)) && (O = e("local URLs only")), Q(V), E(V) === "blocked" && (O = e("bad port")), V.referrerPolicy === "" && (V.referrerPolicy = V.policyContainer.referrerPolicy), V.referrer !== "no-referrer" && (V.referrer = S(V)), O === null && (O = await (async () => {
      const X = B(V);
      return (
        // - request’s current URL’s origin is same origin with request’s origin,
        //   and request’s response tainting is "basic"
        _(X, V.url) && V.responseTainting === "basic" || // request’s current URL’s scheme is "data"
        X.protocol === "data:" || // - request’s mode is "navigate" or "websocket"
        V.mode === "navigate" || V.mode === "websocket" ? (V.responseTainting = "basic", await It(T)) : V.mode === "same-origin" ? e('request mode cannot be "same-origin"') : V.mode === "no-cors" ? V.redirect !== "follow" ? e(
          'redirect mode cannot be "follow" for "no-cors" request'
        ) : (V.responseTainting = "opaque", await It(T)) : Qe(B(V)) ? (V.responseTainting = "cors", await cs(T)) : e("URL scheme must be a HTTP(S) scheme")
      );
    })()), se)
      return O;
    O.status !== 0 && !O.internalResponse && (V.responseTainting, V.responseTainting === "basic" ? O = r(O, "basic") : V.responseTainting === "cors" ? O = r(O, "cors") : V.responseTainting === "opaque" ? O = r(O, "opaque") : q(!1));
    let ae = O.status === 0 ? O : O.internalResponse;
    if (ae.urlList.length === 0 && ae.urlList.push(...V.urlList), V.timingAllowFailed || (O.timingAllowPassed = !0), O.type === "opaque" && ae.status === 206 && ae.rangeRequested && !V.headers.contains("range") && (O = ae = e()), O.status !== 0 && (V.method === "HEAD" || V.method === "CONNECT" || $.includes(ae.status)) && (ae.body = null, T.controller.dump = !0), V.integrity) {
      const X = (eA) => as(T, e(eA));
      if (V.responseTainting === "opaque" || O.body == null) {
        X(O.error);
        return;
      }
      const ye = (eA) => {
        if (!u(eA, V.integrity)) {
          X("integrity mismatch");
          return;
        }
        O.body = K(eA)[0], as(T, O);
      };
      await ee(O.body, ye, X);
    } else
      as(T, O);
  }
  function It(T) {
    if (U(T) && T.request.redirectCount === 0)
      return Promise.resolve(t(T));
    const { request: se } = T, { protocol: V } = B(se);
    switch (V) {
      case "about:":
        return Promise.resolve(e("about scheme is not supported"));
      case "blob:": {
        j || (j = G.resolveObjectURL);
        const O = B(se);
        if (O.search.length !== 0)
          return Promise.resolve(e("NetworkError when attempting to fetch resource."));
        const ae = j(O.toString());
        if (se.method !== "GET" || !v(ae))
          return Promise.resolve(e("invalid method"));
        const X = K(ae), ye = X[0], eA = ge(`${ye.length}`), dA = X[1] ?? "", _e = s({
          statusText: "OK",
          headersList: [
            ["content-length", { name: "Content-Length", value: eA }],
            ["content-type", { name: "Content-Type", value: dA }]
          ]
        });
        return _e.body = ye, Promise.resolve(_e);
      }
      case "data:": {
        const O = B(se), ae = $A(O);
        if (ae === "failure")
          return Promise.resolve(e("failed to fetch the data URL"));
        const X = be(ae.mimeType);
        return Promise.resolve(s({
          statusText: "OK",
          headersList: [
            ["content-type", { name: "Content-Type", value: X }]
          ],
          body: K(ae.body)[0]
        }));
      }
      case "file:":
        return Promise.resolve(e("not implemented... yet..."));
      case "http:":
      case "https:":
        return cs(T).catch((O) => e(O));
      default:
        return Promise.resolve(e("unknown scheme"));
    }
  }
  function tn(T, se) {
    T.request.done = !0, T.processResponseDone != null && queueMicrotask(() => T.processResponseDone(se));
  }
  function as(T, se) {
    se.type === "error" && (se.urlList = [T.request.urlList[0]], se.timingInfo = m({
      startTime: T.timingInfo.startTime
    }));
    const V = () => {
      T.request.done = !0, T.processResponseEndOfBody != null && queueMicrotask(() => T.processResponseEndOfBody(se));
    };
    if (T.processResponse != null && queueMicrotask(() => T.processResponse(se)), se.body == null)
      V();
    else {
      const O = (X, ye) => {
        ye.enqueue(X);
      }, ae = new Le({
        start() {
        },
        transform: O,
        flush: V
      }, {
        size() {
          return 1;
        }
      }, {
        size() {
          return 1;
        }
      });
      se.body = { stream: se.body.stream.pipeThrough(ae) };
    }
    if (T.processResponseConsumeBody != null) {
      const O = (X) => T.processResponseConsumeBody(se, X), ae = (X) => T.processResponseConsumeBody(se, X);
      if (se.body == null)
        queueMicrotask(() => O(null));
      else
        return ee(se.body, O, ae);
      return Promise.resolve();
    }
  }
  async function cs(T) {
    const se = T.request;
    let V = null, O = null;
    const ae = T.timingInfo;
    if (se.serviceWorkers, V === null) {
      if (se.redirect === "follow" && (se.serviceWorkers = "none"), O = V = await pr(T), se.responseTainting === "cors" && y(se, V) === "failure")
        return e("cors failure");
      f(se, V) === "failure" && (se.timingAllowFailed = !0);
    }
    return (se.responseTainting === "opaque" || V.type === "opaque") && b(
      se.origin,
      se.client,
      se.destination,
      O
    ) === "blocked" ? e("blocked") : (Ae.has(O.status) && (se.redirect !== "manual" && T.controller.connection.destroy(), se.redirect === "error" ? V = e("unexpected redirect") : se.redirect === "manual" ? V = O : se.redirect === "follow" ? V = await gs(T, V) : q(!1)), V.timingInfo = ae, V);
  }
  function gs(T, se) {
    const V = T.request, O = se.internalResponse ? se.internalResponse : se;
    let ae;
    try {
      if (ae = C(
        O,
        B(V).hash
      ), ae == null)
        return se;
    } catch (ye) {
      return Promise.resolve(e(ye));
    }
    if (!Qe(ae))
      return Promise.resolve(e("URL scheme must be a HTTP(S) scheme"));
    if (V.redirectCount === 20)
      return Promise.resolve(e("redirect count exceeded"));
    if (V.redirectCount += 1, V.mode === "cors" && (ae.username || ae.password) && !_(V, ae))
      return Promise.resolve(e('cross origin not allowed for request mode "cors"'));
    if (V.responseTainting === "cors" && (ae.username || ae.password))
      return Promise.resolve(e(
        'URL cannot contain credentials for request mode "cors"'
      ));
    if (O.status !== 303 && V.body != null && V.body.source == null)
      return Promise.resolve(e());
    if ([301, 302].includes(O.status) && V.method === "POST" || O.status === 303 && !F.includes(V.method)) {
      V.method = "GET", V.body = null;
      for (const ye of J)
        V.headersList.delete(ye);
    }
    _(B(V), ae) || (V.headersList.delete("authorization"), V.headersList.delete("proxy-authorization", !0), V.headersList.delete("cookie"), V.headersList.delete("host")), V.body != null && (q(V.body.source != null), V.body = K(V.body.source)[0]);
    const X = T.timingInfo;
    return X.redirectEndTime = X.postRedirectStartTime = D(T.crossOriginIsolatedCapability), X.redirectStartTime === 0 && (X.redirectStartTime = X.startTime), V.urlList.push(ae), p(V, O), is(T, !0);
  }
  async function pr(T, se = !1, V = !1) {
    const O = T.request;
    let ae = null, X = null, ye = null;
    O.window === "no-window" && O.redirect === "error" ? (ae = T, X = O) : (X = c(O), ae = { ...T }, ae.request = X);
    const eA = O.credentials === "include" || O.credentials === "same-origin" && O.responseTainting === "basic", dA = X.body ? X.body.length : null;
    let _e = null;
    if (X.body == null && ["POST", "PUT"].includes(X.method) && (_e = "0"), dA != null && (_e = ge(`${dA}`)), _e != null && X.headersList.append("content-length", _e), dA != null && X.keepalive, X.referrer instanceof URL && X.headersList.append("referer", ge(X.referrer.href)), I(X), w(X), X.headersList.contains("user-agent") || X.headersList.append("user-agent", typeof esbuildDetection > "u" ? "undici" : "node"), X.cache === "default" && (X.headersList.contains("if-modified-since") || X.headersList.contains("if-none-match") || X.headersList.contains("if-unmodified-since") || X.headersList.contains("if-match") || X.headersList.contains("if-range")) && (X.cache = "no-store"), X.cache === "no-cache" && !X.preventNoCacheCacheControlHeaderModification && !X.headersList.contains("cache-control") && X.headersList.append("cache-control", "max-age=0"), (X.cache === "no-store" || X.cache === "reload") && (X.headersList.contains("pragma") || X.headersList.append("pragma", "no-cache"), X.headersList.contains("cache-control") || X.headersList.append("cache-control", "no-cache")), X.headersList.contains("range") && X.headersList.append("accept-encoding", "identity"), X.headersList.contains("accept-encoding") || (W(B(X)) ? X.headersList.append("accept-encoding", "br, gzip, deflate") : X.headersList.append("accept-encoding", "gzip, deflate")), X.headersList.delete("host"), X.cache = "no-store", X.mode !== "no-store" && X.mode, ye == null) {
      if (X.mode === "only-if-cached")
        return e("only if cached");
      const XA = await Uo(
        ae,
        eA,
        V
      );
      !Z.has(X.method) && XA.status >= 200 && XA.status <= 399, ye == null && (ye = XA);
    }
    if (ye.urlList = [...X.urlList], X.headersList.contains("range") && (ye.rangeRequested = !0), ye.requestIncludesCredentials = eA, ye.status === 407)
      return O.window === "no-window" ? e() : U(T) ? t(T) : e("proxy authentication required");
    if (
      // response’s status is 421
      ye.status === 421 && // isNewConnectionFetch is false
      !V && // request’s body is null, or request’s body is non-null and request’s body’s source is non-null
      (O.body == null || O.body.source != null)
    ) {
      if (U(T))
        return t(T);
      T.controller.connection.destroy(), ye = await pr(
        T,
        se,
        !0
      );
    }
    return ye;
  }
  async function Uo(T, se = !1, V = !1) {
    q(!T.controller.connection || T.controller.connection.destroyed), T.controller.connection = {
      abort: null,
      destroyed: !1,
      destroy(de) {
        this.destroyed || (this.destroyed = !0, this.abort?.(de ?? new we("The operation was aborted.", "AbortError")));
      }
    };
    const O = T.request;
    let ae = null;
    const X = T.timingInfo;
    O.cache = "no-store", O.mode;
    let ye = null;
    if (O.body == null && T.processRequestEndOfBody)
      queueMicrotask(() => T.processRequestEndOfBody());
    else if (O.body != null) {
      const de = async function* (nA) {
        U(T) || (yield nA, T.processRequestBodyChunkLength?.(nA.byteLength));
      }, lA = () => {
        U(T) || T.processRequestEndOfBody && T.processRequestEndOfBody();
      }, _A = (nA) => {
        U(T) || (nA.name === "AbortError" ? T.controller.abort() : T.controller.terminate(nA));
      };
      ye = async function* () {
        try {
          for await (const nA of O.body.stream)
            yield* de(nA);
          lA();
        } catch (nA) {
          _A(nA);
        }
      }();
    }
    try {
      const { body: de, status: lA, statusText: _A, headersList: nA, socket: mr } = await Xt({ body: ye });
      if (mr)
        ae = s({ status: lA, statusText: _A, headersList: nA, socket: mr });
      else {
        const xe = de[Symbol.asyncIterator]();
        T.controller.next = () => xe.next(), ae = s({ status: lA, statusText: _A, headersList: nA });
      }
    } catch (de) {
      return de.name === "AbortError" ? (T.controller.connection.destroy(), t(T, de)) : e(de);
    }
    const eA = () => {
      T.controller.resume();
    }, dA = (de) => {
      T.controller.abort(de);
    };
    re || (re = G.ReadableStream);
    const _e = new re(
      {
        async start(de) {
          T.controller.controller = de;
        },
        async pull(de) {
          await eA();
        },
        async cancel(de) {
          await dA(de);
        }
      },
      {
        highWaterMark: 0,
        size() {
          return 1;
        }
      }
    );
    ae.body = { stream: _e }, T.controller.on("terminated", XA), T.controller.resume = async () => {
      for (; ; ) {
        let de, lA;
        try {
          const { done: _A, value: nA } = await T.controller.next();
          if (z(T))
            break;
          de = _A ? void 0 : nA;
        } catch (_A) {
          T.controller.ended && !X.encodedBodySize ? de = void 0 : (de = _A, lA = !0);
        }
        if (de === void 0) {
          te(T.controller.controller), tn(T, ae);
          return;
        }
        if (X.decodedBodySize += de?.byteLength ?? 0, lA) {
          T.controller.terminate(de);
          return;
        }
        if (T.controller.controller.enqueue(new Uint8Array(de)), me(_e)) {
          T.controller.terminate();
          return;
        }
        if (!T.controller.controller.desiredSize)
          return;
      }
    };
    function XA(de) {
      z(T) ? (ae.aborted = !0, Be(_e) && T.controller.controller.error(
        T.controller.serializedAbortReason
      )) : Be(_e) && T.controller.controller.error(new TypeError("terminated", {
        cause: P(de) ? de : void 0
      })), T.controller.connection.destroy();
    }
    return ae;
    async function Xt({ body: de }) {
      const lA = B(O), _A = T.controller.dispatcher;
      return new Promise((nA, mr) => _A.dispatch(
        {
          path: lA.pathname + lA.search,
          origin: lA.origin,
          method: O.method,
          body: T.controller.dispatcher.isMockActive ? O.body && (O.body.source || O.body.stream) : de,
          headers: O.headersList.entries,
          maxRedirections: 0,
          upgrade: O.mode === "websocket" ? "websocket" : void 0
        },
        {
          body: null,
          abort: null,
          onConnect(xe) {
            const { connection: oA } = T.controller;
            oA.destroyed ? xe(new we("The operation was aborted.", "AbortError")) : (T.controller.on("terminated", xe), this.abort = oA.abort = xe);
          },
          onHeaders(xe, oA, Ut, yr) {
            if (xe < 200)
              return;
            let vA = [], KA = "";
            const it = new o();
            if (Array.isArray(oA))
              for (let SA = 0; SA < oA.length; SA += 2) {
                const GA = oA[SA + 0].toString("latin1"), WA = oA[SA + 1].toString("latin1");
                GA.toLowerCase() === "content-encoding" ? vA = WA.toLowerCase().split(",").map((wr) => wr.trim()) : GA.toLowerCase() === "location" && (KA = WA), it[fe].append(GA, WA);
              }
            else {
              const SA = Object.keys(oA);
              for (const GA of SA) {
                const WA = oA[GA];
                GA.toLowerCase() === "content-encoding" ? vA = WA.toLowerCase().split(",").map((wr) => wr.trim()).reverse() : GA.toLowerCase() === "location" && (KA = WA), it[fe].append(GA, WA);
              }
            }
            this.body = new Ue({ read: Ut });
            const uA = [], ls = O.redirect === "follow" && KA && Ae.has(xe);
            if (O.method !== "HEAD" && O.method !== "CONNECT" && !$.includes(xe) && !ls)
              for (const SA of vA)
                if (SA === "x-gzip" || SA === "gzip")
                  uA.push(g.createGunzip({
                    // Be less strict when decoding compressed responses, since sometimes
                    // servers send slightly invalid responses that are still accepted
                    // by common browsers.
                    // Always using Z_SYNC_FLUSH is what cURL does.
                    flush: g.constants.Z_SYNC_FLUSH,
                    finishFlush: g.constants.Z_SYNC_FLUSH
                  }));
                else if (SA === "deflate")
                  uA.push(g.createInflate());
                else if (SA === "br")
                  uA.push(g.createBrotliDecompress());
                else {
                  uA.length = 0;
                  break;
                }
            return nA({
              status: xe,
              statusText: yr,
              headersList: it[fe],
              body: uA.length ? Pe(this.body, ...uA, () => {
              }) : this.body.on("error", () => {
              })
            }), !0;
          },
          onData(xe) {
            if (T.controller.dump)
              return;
            const oA = xe;
            return X.encodedBodySize += oA.byteLength, this.body.push(oA);
          },
          onComplete() {
            this.abort && T.controller.off("terminated", this.abort), T.controller.ended = !0, this.body.push(null);
          },
          onError(xe) {
            this.abort && T.controller.off("terminated", this.abort), this.body?.destroy(xe), T.controller.terminate(xe), mr(xe);
          },
          onUpgrade(xe, oA, Ut) {
            if (xe !== 101)
              return;
            const yr = new o();
            for (let vA = 0; vA < oA.length; vA += 2) {
              const KA = oA[vA + 0].toString("latin1"), it = oA[vA + 1].toString("latin1");
              yr[fe].append(KA, it);
            }
            return nA({
              status: xe,
              statusText: Nt[xe],
              headersList: yr[fe],
              socket: Ut
            }), !0;
          }
        }
      ));
    }
  }
  return ea = {
    fetch: Re,
    Fetch: Ce,
    fetching: gA,
    finalizeAndReportTiming: We
  }, ea;
}
var Aa, Xl;
function Gh() {
  return Xl || (Xl = 1, Aa = {
    kState: Symbol("FileReader state"),
    kResult: Symbol("FileReader result"),
    kError: Symbol("FileReader error"),
    kLastProgressEventFired: Symbol("FileReader last progress event fired timestamp"),
    kEvents: Symbol("FileReader events"),
    kAborted: Symbol("FileReader aborted")
  }), Aa;
}
var ta, Kl;
function sy() {
  if (Kl) return ta;
  Kl = 1;
  const { webidl: A } = LA(), e = Symbol("ProgressEvent state");
  class t extends Event {
    constructor(s, o = {}) {
      s = A.converters.DOMString(s), o = A.converters.ProgressEventInit(o ?? {}), super(s, o), this[e] = {
        lengthComputable: o.lengthComputable,
        loaded: o.loaded,
        total: o.total
      };
    }
    get lengthComputable() {
      return A.brandCheck(this, t), this[e].lengthComputable;
    }
    get loaded() {
      return A.brandCheck(this, t), this[e].loaded;
    }
    get total() {
      return A.brandCheck(this, t), this[e].total;
    }
  }
  return A.converters.ProgressEventInit = A.dictionaryConverter([
    {
      key: "lengthComputable",
      converter: A.converters.boolean,
      defaultValue: !1
    },
    {
      key: "loaded",
      converter: A.converters["unsigned long long"],
      defaultValue: 0
    },
    {
      key: "total",
      converter: A.converters["unsigned long long"],
      defaultValue: 0
    },
    {
      key: "bubbles",
      converter: A.converters.boolean,
      defaultValue: !1
    },
    {
      key: "cancelable",
      converter: A.converters.boolean,
      defaultValue: !1
    },
    {
      key: "composed",
      converter: A.converters.boolean,
      defaultValue: !1
    }
  ]), ta = {
    ProgressEvent: t
  }, ta;
}
var ra, eu;
function ny() {
  if (eu) return ra;
  eu = 1;
  function A(e) {
    if (!e)
      return "failure";
    switch (e.trim().toLowerCase()) {
      case "unicode-1-1-utf-8":
      case "unicode11utf8":
      case "unicode20utf8":
      case "utf-8":
      case "utf8":
      case "x-unicode20utf8":
        return "UTF-8";
      case "866":
      case "cp866":
      case "csibm866":
      case "ibm866":
        return "IBM866";
      case "csisolatin2":
      case "iso-8859-2":
      case "iso-ir-101":
      case "iso8859-2":
      case "iso88592":
      case "iso_8859-2":
      case "iso_8859-2:1987":
      case "l2":
      case "latin2":
        return "ISO-8859-2";
      case "csisolatin3":
      case "iso-8859-3":
      case "iso-ir-109":
      case "iso8859-3":
      case "iso88593":
      case "iso_8859-3":
      case "iso_8859-3:1988":
      case "l3":
      case "latin3":
        return "ISO-8859-3";
      case "csisolatin4":
      case "iso-8859-4":
      case "iso-ir-110":
      case "iso8859-4":
      case "iso88594":
      case "iso_8859-4":
      case "iso_8859-4:1988":
      case "l4":
      case "latin4":
        return "ISO-8859-4";
      case "csisolatincyrillic":
      case "cyrillic":
      case "iso-8859-5":
      case "iso-ir-144":
      case "iso8859-5":
      case "iso88595":
      case "iso_8859-5":
      case "iso_8859-5:1988":
        return "ISO-8859-5";
      case "arabic":
      case "asmo-708":
      case "csiso88596e":
      case "csiso88596i":
      case "csisolatinarabic":
      case "ecma-114":
      case "iso-8859-6":
      case "iso-8859-6-e":
      case "iso-8859-6-i":
      case "iso-ir-127":
      case "iso8859-6":
      case "iso88596":
      case "iso_8859-6":
      case "iso_8859-6:1987":
        return "ISO-8859-6";
      case "csisolatingreek":
      case "ecma-118":
      case "elot_928":
      case "greek":
      case "greek8":
      case "iso-8859-7":
      case "iso-ir-126":
      case "iso8859-7":
      case "iso88597":
      case "iso_8859-7":
      case "iso_8859-7:1987":
      case "sun_eu_greek":
        return "ISO-8859-7";
      case "csiso88598e":
      case "csisolatinhebrew":
      case "hebrew":
      case "iso-8859-8":
      case "iso-8859-8-e":
      case "iso-ir-138":
      case "iso8859-8":
      case "iso88598":
      case "iso_8859-8":
      case "iso_8859-8:1988":
      case "visual":
        return "ISO-8859-8";
      case "csiso88598i":
      case "iso-8859-8-i":
      case "logical":
        return "ISO-8859-8-I";
      case "csisolatin6":
      case "iso-8859-10":
      case "iso-ir-157":
      case "iso8859-10":
      case "iso885910":
      case "l6":
      case "latin6":
        return "ISO-8859-10";
      case "iso-8859-13":
      case "iso8859-13":
      case "iso885913":
        return "ISO-8859-13";
      case "iso-8859-14":
      case "iso8859-14":
      case "iso885914":
        return "ISO-8859-14";
      case "csisolatin9":
      case "iso-8859-15":
      case "iso8859-15":
      case "iso885915":
      case "iso_8859-15":
      case "l9":
        return "ISO-8859-15";
      case "iso-8859-16":
        return "ISO-8859-16";
      case "cskoi8r":
      case "koi":
      case "koi8":
      case "koi8-r":
      case "koi8_r":
        return "KOI8-R";
      case "koi8-ru":
      case "koi8-u":
        return "KOI8-U";
      case "csmacintosh":
      case "mac":
      case "macintosh":
      case "x-mac-roman":
        return "macintosh";
      case "iso-8859-11":
      case "iso8859-11":
      case "iso885911":
      case "tis-620":
      case "windows-874":
        return "windows-874";
      case "cp1250":
      case "windows-1250":
      case "x-cp1250":
        return "windows-1250";
      case "cp1251":
      case "windows-1251":
      case "x-cp1251":
        return "windows-1251";
      case "ansi_x3.4-1968":
      case "ascii":
      case "cp1252":
      case "cp819":
      case "csisolatin1":
      case "ibm819":
      case "iso-8859-1":
      case "iso-ir-100":
      case "iso8859-1":
      case "iso88591":
      case "iso_8859-1":
      case "iso_8859-1:1987":
      case "l1":
      case "latin1":
      case "us-ascii":
      case "windows-1252":
      case "x-cp1252":
        return "windows-1252";
      case "cp1253":
      case "windows-1253":
      case "x-cp1253":
        return "windows-1253";
      case "cp1254":
      case "csisolatin5":
      case "iso-8859-9":
      case "iso-ir-148":
      case "iso8859-9":
      case "iso88599":
      case "iso_8859-9":
      case "iso_8859-9:1989":
      case "l5":
      case "latin5":
      case "windows-1254":
      case "x-cp1254":
        return "windows-1254";
      case "cp1255":
      case "windows-1255":
      case "x-cp1255":
        return "windows-1255";
      case "cp1256":
      case "windows-1256":
      case "x-cp1256":
        return "windows-1256";
      case "cp1257":
      case "windows-1257":
      case "x-cp1257":
        return "windows-1257";
      case "cp1258":
      case "windows-1258":
      case "x-cp1258":
        return "windows-1258";
      case "x-mac-cyrillic":
      case "x-mac-ukrainian":
        return "x-mac-cyrillic";
      case "chinese":
      case "csgb2312":
      case "csiso58gb231280":
      case "gb2312":
      case "gb_2312":
      case "gb_2312-80":
      case "gbk":
      case "iso-ir-58":
      case "x-gbk":
        return "GBK";
      case "gb18030":
        return "gb18030";
      case "big5":
      case "big5-hkscs":
      case "cn-big5":
      case "csbig5":
      case "x-x-big5":
        return "Big5";
      case "cseucpkdfmtjapanese":
      case "euc-jp":
      case "x-euc-jp":
        return "EUC-JP";
      case "csiso2022jp":
      case "iso-2022-jp":
        return "ISO-2022-JP";
      case "csshiftjis":
      case "ms932":
      case "ms_kanji":
      case "shift-jis":
      case "shift_jis":
      case "sjis":
      case "windows-31j":
      case "x-sjis":
        return "Shift_JIS";
      case "cseuckr":
      case "csksc56011987":
      case "euc-kr":
      case "iso-ir-149":
      case "korean":
      case "ks_c_5601-1987":
      case "ks_c_5601-1989":
      case "ksc5601":
      case "ksc_5601":
      case "windows-949":
        return "EUC-KR";
      case "csiso2022kr":
      case "hz-gb-2312":
      case "iso-2022-cn":
      case "iso-2022-cn-ext":
      case "iso-2022-kr":
      case "replacement":
        return "replacement";
      case "unicodefffe":
      case "utf-16be":
        return "UTF-16BE";
      case "csunicode":
      case "iso-10646-ucs-2":
      case "ucs-2":
      case "unicode":
      case "unicodefeff":
      case "utf-16":
      case "utf-16le":
        return "UTF-16LE";
      case "x-user-defined":
        return "x-user-defined";
      default:
        return "failure";
    }
  }
  return ra = {
    getEncoding: A
  }, ra;
}
var sa, Au;
function oy() {
  if (Au) return sa;
  Au = 1;
  const {
    kState: A,
    kError: e,
    kResult: t,
    kAborted: r,
    kLastProgressEventFired: s
  } = Gh(), { ProgressEvent: o } = sy(), { getEncoding: i } = ny(), { DOMException: c } = fr(), { serializeAMimeType: g, parseMIMEType: u } = Bt(), { types: l } = G, { StringDecoder: h } = G, { btoa: E } = G, f = {
    enumerable: !0,
    writable: !1,
    configurable: !1
  };
  function I(w, y, b, S) {
    if (w[A] === "loading")
      throw new c("Invalid state", "InvalidStateError");
    w[A] = "loading", w[t] = null, w[e] = null;
    const N = y.stream().getReader(), v = [];
    let _ = N.read(), U = !0;
    (async () => {
      for (; !w[r]; )
        try {
          const { done: z, value: P } = await _;
          if (U && !w[r] && queueMicrotask(() => {
            C("loadstart", w);
          }), U = !1, !z && l.isUint8Array(P))
            v.push(P), (w[s] === void 0 || Date.now() - w[s] >= 50) && !w[r] && (w[s] = Date.now(), queueMicrotask(() => {
              C("progress", w);
            })), _ = N.read();
          else if (z) {
            queueMicrotask(() => {
              w[A] = "done";
              try {
                const ee = B(v, b, y.type, S);
                if (w[r])
                  return;
                w[t] = ee, C("load", w);
              } catch (ee) {
                w[e] = ee, C("error", w);
              }
              w[A] !== "loading" && C("loadend", w);
            });
            break;
          }
        } catch (z) {
          if (w[r])
            return;
          queueMicrotask(() => {
            w[A] = "done", w[e] = z, C("error", w), w[A] !== "loading" && C("loadend", w);
          });
          break;
        }
    })();
  }
  function C(w, y) {
    const b = new o(w, {
      bubbles: !1,
      cancelable: !1
    });
    y.dispatchEvent(b);
  }
  function B(w, y, b, S) {
    switch (y) {
      case "DataURL": {
        let D = "data:";
        const N = u(b || "application/octet-stream");
        N !== "failure" && (D += g(N)), D += ";base64,";
        const v = new h("latin1");
        for (const _ of w)
          D += E(v.write(_));
        return D += E(v.end()), D;
      }
      case "Text": {
        let D = "failure";
        if (S && (D = i(S)), D === "failure" && b) {
          const N = u(b);
          N !== "failure" && (D = i(N.parameters.get("charset")));
        }
        return D === "failure" && (D = "UTF-8"), p(w, D);
      }
      case "ArrayBuffer":
        return m(w).buffer;
      case "BinaryString": {
        let D = "";
        const N = new h("latin1");
        for (const v of w)
          D += N.write(v);
        return D += N.end(), D;
      }
    }
  }
  function p(w, y) {
    const b = m(w), S = Q(b);
    let D = 0;
    S !== null && (y = S, D = S === "UTF-8" ? 3 : 2);
    const N = b.slice(D);
    return new TextDecoder(y).decode(N);
  }
  function Q(w) {
    const [y, b, S] = w;
    return y === 239 && b === 187 && S === 191 ? "UTF-8" : y === 254 && b === 255 ? "UTF-16BE" : y === 255 && b === 254 ? "UTF-16LE" : null;
  }
  function m(w) {
    const y = w.reduce((S, D) => S + D.byteLength, 0);
    let b = 0;
    return w.reduce((S, D) => (S.set(D, b), b += D.byteLength, S), new Uint8Array(y));
  }
  return sa = {
    staticPropertyDescriptors: f,
    readOperation: I,
    fireAProgressEvent: C
  }, sa;
}
var na, tu;
function iy() {
  if (tu) return na;
  tu = 1;
  const {
    staticPropertyDescriptors: A,
    readOperation: e,
    fireAProgressEvent: t
  } = oy(), {
    kState: r,
    kError: s,
    kResult: o,
    kEvents: i,
    kAborted: c
  } = Gh(), { webidl: g } = LA(), { kEnumerableProperty: u } = ke;
  class l extends EventTarget {
    constructor() {
      super(), this[r] = "empty", this[o] = null, this[s] = null, this[i] = {
        loadend: null,
        error: null,
        abort: null,
        load: null,
        progress: null,
        loadstart: null
      };
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dfn-readAsArrayBuffer
     * @param {import('buffer').Blob} blob
     */
    readAsArrayBuffer(E) {
      g.brandCheck(this, l), g.argumentLengthCheck(arguments, 1, { header: "FileReader.readAsArrayBuffer" }), E = g.converters.Blob(E, { strict: !1 }), e(this, E, "ArrayBuffer");
    }
    /**
     * @see https://w3c.github.io/FileAPI/#readAsBinaryString
     * @param {import('buffer').Blob} blob
     */
    readAsBinaryString(E) {
      g.brandCheck(this, l), g.argumentLengthCheck(arguments, 1, { header: "FileReader.readAsBinaryString" }), E = g.converters.Blob(E, { strict: !1 }), e(this, E, "BinaryString");
    }
    /**
     * @see https://w3c.github.io/FileAPI/#readAsDataText
     * @param {import('buffer').Blob} blob
     * @param {string?} encoding
     */
    readAsText(E, f = void 0) {
      g.brandCheck(this, l), g.argumentLengthCheck(arguments, 1, { header: "FileReader.readAsText" }), E = g.converters.Blob(E, { strict: !1 }), f !== void 0 && (f = g.converters.DOMString(f)), e(this, E, "Text", f);
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dfn-readAsDataURL
     * @param {import('buffer').Blob} blob
     */
    readAsDataURL(E) {
      g.brandCheck(this, l), g.argumentLengthCheck(arguments, 1, { header: "FileReader.readAsDataURL" }), E = g.converters.Blob(E, { strict: !1 }), e(this, E, "DataURL");
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dfn-abort
     */
    abort() {
      if (this[r] === "empty" || this[r] === "done") {
        this[o] = null;
        return;
      }
      this[r] === "loading" && (this[r] = "done", this[o] = null), this[c] = !0, t("abort", this), this[r] !== "loading" && t("loadend", this);
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dom-filereader-readystate
     */
    get readyState() {
      switch (g.brandCheck(this, l), this[r]) {
        case "empty":
          return this.EMPTY;
        case "loading":
          return this.LOADING;
        case "done":
          return this.DONE;
      }
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dom-filereader-result
     */
    get result() {
      return g.brandCheck(this, l), this[o];
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dom-filereader-error
     */
    get error() {
      return g.brandCheck(this, l), this[s];
    }
    get onloadend() {
      return g.brandCheck(this, l), this[i].loadend;
    }
    set onloadend(E) {
      g.brandCheck(this, l), this[i].loadend && this.removeEventListener("loadend", this[i].loadend), typeof E == "function" ? (this[i].loadend = E, this.addEventListener("loadend", E)) : this[i].loadend = null;
    }
    get onerror() {
      return g.brandCheck(this, l), this[i].error;
    }
    set onerror(E) {
      g.brandCheck(this, l), this[i].error && this.removeEventListener("error", this[i].error), typeof E == "function" ? (this[i].error = E, this.addEventListener("error", E)) : this[i].error = null;
    }
    get onloadstart() {
      return g.brandCheck(this, l), this[i].loadstart;
    }
    set onloadstart(E) {
      g.brandCheck(this, l), this[i].loadstart && this.removeEventListener("loadstart", this[i].loadstart), typeof E == "function" ? (this[i].loadstart = E, this.addEventListener("loadstart", E)) : this[i].loadstart = null;
    }
    get onprogress() {
      return g.brandCheck(this, l), this[i].progress;
    }
    set onprogress(E) {
      g.brandCheck(this, l), this[i].progress && this.removeEventListener("progress", this[i].progress), typeof E == "function" ? (this[i].progress = E, this.addEventListener("progress", E)) : this[i].progress = null;
    }
    get onload() {
      return g.brandCheck(this, l), this[i].load;
    }
    set onload(E) {
      g.brandCheck(this, l), this[i].load && this.removeEventListener("load", this[i].load), typeof E == "function" ? (this[i].load = E, this.addEventListener("load", E)) : this[i].load = null;
    }
    get onabort() {
      return g.brandCheck(this, l), this[i].abort;
    }
    set onabort(E) {
      g.brandCheck(this, l), this[i].abort && this.removeEventListener("abort", this[i].abort), typeof E == "function" ? (this[i].abort = E, this.addEventListener("abort", E)) : this[i].abort = null;
    }
  }
  return l.EMPTY = l.prototype.EMPTY = 0, l.LOADING = l.prototype.LOADING = 1, l.DONE = l.prototype.DONE = 2, Object.defineProperties(l.prototype, {
    EMPTY: A,
    LOADING: A,
    DONE: A,
    readAsArrayBuffer: u,
    readAsBinaryString: u,
    readAsText: u,
    readAsDataURL: u,
    abort: u,
    readyState: u,
    result: u,
    error: u,
    onloadstart: u,
    onprogress: u,
    onload: u,
    onabort: u,
    onerror: u,
    onloadend: u,
    [Symbol.toStringTag]: {
      value: "FileReader",
      writable: !1,
      enumerable: !1,
      configurable: !0
    }
  }), Object.defineProperties(l, {
    EMPTY: A,
    LOADING: A,
    DONE: A
  }), na = {
    FileReader: l
  }, na;
}
var oa, ru;
function Qc() {
  return ru || (ru = 1, oa = {
    kConstruct: He.kConstruct
  }), oa;
}
var ia, su;
function ay() {
  if (su) return ia;
  su = 1;
  const A = G, { URLSerializer: e } = Bt(), { isValidHeaderName: t } = ot();
  function r(o, i, c = !1) {
    const g = e(o, c), u = e(i, c);
    return g === u;
  }
  function s(o) {
    A(o !== null);
    const i = [];
    for (let c of o.split(",")) {
      if (c = c.trim(), c.length) {
        if (!t(c))
          continue;
      } else continue;
      i.push(c);
    }
    return i;
  }
  return ia = {
    urlEquals: r,
    fieldValues: s
  }, ia;
}
var aa, nu;
function cy() {
  if (nu) return aa;
  nu = 1;
  const { kConstruct: A } = Qc(), { urlEquals: e, fieldValues: t } = ay(), { kEnumerableProperty: r, isDisturbed: s } = ke, { kHeadersList: o } = He, { webidl: i } = LA(), { Response: c, cloneResponse: g } = Ec(), { Request: u } = Ro(), { kState: l, kHeaders: h, kGuard: E, kRealm: f } = $t(), { fetching: I } = hc(), { urlIsHttpHttpsScheme: C, createDeferredPromise: B, readAllBytes: p } = ot(), Q = G, { getGlobalDispatcher: m } = Xs;
  class w {
    /**
     * @see https://w3c.github.io/ServiceWorker/#dfn-relevant-request-response-list
     * @type {requestResponseList}
     */
    #e;
    constructor() {
      arguments[0] !== A && i.illegalConstructor(), this.#e = arguments[1];
    }
    async match(S, D = {}) {
      i.brandCheck(this, w), i.argumentLengthCheck(arguments, 1, { header: "Cache.match" }), S = i.converters.RequestInfo(S), D = i.converters.CacheQueryOptions(D);
      const N = await this.matchAll(S, D);
      if (N.length !== 0)
        return N[0];
    }
    async matchAll(S = void 0, D = {}) {
      i.brandCheck(this, w), S !== void 0 && (S = i.converters.RequestInfo(S)), D = i.converters.CacheQueryOptions(D);
      let N = null;
      if (S !== void 0)
        if (S instanceof u) {
          if (N = S[l], N.method !== "GET" && !D.ignoreMethod)
            return [];
        } else typeof S == "string" && (N = new u(S)[l]);
      const v = [];
      if (S === void 0)
        for (const U of this.#e)
          v.push(U[1]);
      else {
        const U = this.#r(N, D);
        for (const z of U)
          v.push(z[1]);
      }
      const _ = [];
      for (const U of v) {
        const z = new c(U.body?.source ?? null), P = z[l].body;
        z[l] = U, z[l].body = P, z[h][o] = U.headersList, z[h][E] = "immutable", _.push(z);
      }
      return Object.freeze(_);
    }
    async add(S) {
      i.brandCheck(this, w), i.argumentLengthCheck(arguments, 1, { header: "Cache.add" }), S = i.converters.RequestInfo(S);
      const D = [S];
      return await this.addAll(D);
    }
    async addAll(S) {
      i.brandCheck(this, w), i.argumentLengthCheck(arguments, 1, { header: "Cache.addAll" }), S = i.converters["sequence<RequestInfo>"](S);
      const D = [], N = [];
      for (const ge of S) {
        if (typeof ge == "string")
          continue;
        const ne = ge[l];
        if (!C(ne.url) || ne.method !== "GET")
          throw i.errors.exception({
            header: "Cache.addAll",
            message: "Expected http/s scheme when method is not GET."
          });
      }
      const v = [];
      for (const ge of S) {
        const ne = new u(ge)[l];
        if (!C(ne.url))
          throw i.errors.exception({
            header: "Cache.addAll",
            message: "Expected http/s scheme."
          });
        ne.initiator = "fetch", ne.destination = "subresource", N.push(ne);
        const Qe = B();
        v.push(I({
          request: ne,
          dispatcher: m(),
          processResponse(W) {
            if (W.type === "error" || W.status === 206 || W.status < 200 || W.status > 299)
              Qe.reject(i.errors.exception({
                header: "Cache.addAll",
                message: "Received an invalid status code or the request failed."
              }));
            else if (W.headersList.contains("vary")) {
              const oe = t(W.headersList.get("vary"));
              for (const le of oe)
                if (le === "*") {
                  Qe.reject(i.errors.exception({
                    header: "Cache.addAll",
                    message: "invalid vary field value"
                  }));
                  for (const M of v)
                    M.abort();
                  return;
                }
            }
          },
          processResponseEndOfBody(W) {
            if (W.aborted) {
              Qe.reject(new DOMException("aborted", "AbortError"));
              return;
            }
            Qe.resolve(W);
          }
        })), D.push(Qe.promise);
      }
      const U = await Promise.all(D), z = [];
      let P = 0;
      for (const ge of U) {
        const ne = {
          type: "put",
          // 7.3.2
          request: N[P],
          // 7.3.3
          response: ge
          // 7.3.4
        };
        z.push(ne), P++;
      }
      const ee = B();
      let te = null;
      try {
        this.#t(z);
      } catch (ge) {
        te = ge;
      }
      return queueMicrotask(() => {
        te === null ? ee.resolve(void 0) : ee.reject(te);
      }), ee.promise;
    }
    async put(S, D) {
      i.brandCheck(this, w), i.argumentLengthCheck(arguments, 2, { header: "Cache.put" }), S = i.converters.RequestInfo(S), D = i.converters.Response(D);
      let N = null;
      if (S instanceof u ? N = S[l] : N = new u(S)[l], !C(N.url) || N.method !== "GET")
        throw i.errors.exception({
          header: "Cache.put",
          message: "Expected an http/s scheme when method is not GET"
        });
      const v = D[l];
      if (v.status === 206)
        throw i.errors.exception({
          header: "Cache.put",
          message: "Got 206 status"
        });
      if (v.headersList.contains("vary")) {
        const ne = t(v.headersList.get("vary"));
        for (const Qe of ne)
          if (Qe === "*")
            throw i.errors.exception({
              header: "Cache.put",
              message: "Got * vary field value"
            });
      }
      if (v.body && (s(v.body.stream) || v.body.stream.locked))
        throw i.errors.exception({
          header: "Cache.put",
          message: "Response body is locked or disturbed"
        });
      const _ = g(v), U = B();
      if (v.body != null) {
        const Qe = v.body.stream.getReader();
        p(Qe).then(U.resolve, U.reject);
      } else
        U.resolve(void 0);
      const z = [], P = {
        type: "put",
        // 14.
        request: N,
        // 15.
        response: _
        // 16.
      };
      z.push(P);
      const ee = await U.promise;
      _.body != null && (_.body.source = ee);
      const te = B();
      let ge = null;
      try {
        this.#t(z);
      } catch (ne) {
        ge = ne;
      }
      return queueMicrotask(() => {
        ge === null ? te.resolve() : te.reject(ge);
      }), te.promise;
    }
    async delete(S, D = {}) {
      i.brandCheck(this, w), i.argumentLengthCheck(arguments, 1, { header: "Cache.delete" }), S = i.converters.RequestInfo(S), D = i.converters.CacheQueryOptions(D);
      let N = null;
      if (S instanceof u) {
        if (N = S[l], N.method !== "GET" && !D.ignoreMethod)
          return !1;
      } else
        Q(typeof S == "string"), N = new u(S)[l];
      const v = [], _ = {
        type: "delete",
        request: N,
        options: D
      };
      v.push(_);
      const U = B();
      let z = null, P;
      try {
        P = this.#t(v);
      } catch (ee) {
        z = ee;
      }
      return queueMicrotask(() => {
        z === null ? U.resolve(!!P?.length) : U.reject(z);
      }), U.promise;
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#dom-cache-keys
     * @param {any} request
     * @param {import('../../types/cache').CacheQueryOptions} options
     * @returns {readonly Request[]}
     */
    async keys(S = void 0, D = {}) {
      i.brandCheck(this, w), S !== void 0 && (S = i.converters.RequestInfo(S)), D = i.converters.CacheQueryOptions(D);
      let N = null;
      if (S !== void 0)
        if (S instanceof u) {
          if (N = S[l], N.method !== "GET" && !D.ignoreMethod)
            return [];
        } else typeof S == "string" && (N = new u(S)[l]);
      const v = B(), _ = [];
      if (S === void 0)
        for (const U of this.#e)
          _.push(U[0]);
      else {
        const U = this.#r(N, D);
        for (const z of U)
          _.push(z[0]);
      }
      return queueMicrotask(() => {
        const U = [];
        for (const z of _) {
          const P = new u("https://a");
          P[l] = z, P[h][o] = z.headersList, P[h][E] = "immutable", P[f] = z.client, U.push(P);
        }
        v.resolve(Object.freeze(U));
      }), v.promise;
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#batch-cache-operations-algorithm
     * @param {CacheBatchOperation[]} operations
     * @returns {requestResponseList}
     */
    #t(S) {
      const D = this.#e, N = [...D], v = [], _ = [];
      try {
        for (const U of S) {
          if (U.type !== "delete" && U.type !== "put")
            throw i.errors.exception({
              header: "Cache.#batchCacheOperations",
              message: 'operation type does not match "delete" or "put"'
            });
          if (U.type === "delete" && U.response != null)
            throw i.errors.exception({
              header: "Cache.#batchCacheOperations",
              message: "delete operation should not have an associated response"
            });
          if (this.#r(U.request, U.options, v).length)
            throw new DOMException("???", "InvalidStateError");
          let z;
          if (U.type === "delete") {
            if (z = this.#r(U.request, U.options), z.length === 0)
              return [];
            for (const P of z) {
              const ee = D.indexOf(P);
              Q(ee !== -1), D.splice(ee, 1);
            }
          } else if (U.type === "put") {
            if (U.response == null)
              throw i.errors.exception({
                header: "Cache.#batchCacheOperations",
                message: "put operation should have an associated response"
              });
            const P = U.request;
            if (!C(P.url))
              throw i.errors.exception({
                header: "Cache.#batchCacheOperations",
                message: "expected http or https scheme"
              });
            if (P.method !== "GET")
              throw i.errors.exception({
                header: "Cache.#batchCacheOperations",
                message: "not get method"
              });
            if (U.options != null)
              throw i.errors.exception({
                header: "Cache.#batchCacheOperations",
                message: "options must not be defined"
              });
            z = this.#r(U.request);
            for (const ee of z) {
              const te = D.indexOf(ee);
              Q(te !== -1), D.splice(te, 1);
            }
            D.push([U.request, U.response]), v.push([U.request, U.response]);
          }
          _.push([U.request, U.response]);
        }
        return _;
      } catch (U) {
        throw this.#e.length = 0, this.#e = N, U;
      }
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#query-cache
     * @param {any} requestQuery
     * @param {import('../../types/cache').CacheQueryOptions} options
     * @param {requestResponseList} targetStorage
     * @returns {requestResponseList}
     */
    #r(S, D, N) {
      const v = [], _ = N ?? this.#e;
      for (const U of _) {
        const [z, P] = U;
        this.#A(S, z, P, D) && v.push(U);
      }
      return v;
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#request-matches-cached-item-algorithm
     * @param {any} requestQuery
     * @param {any} request
     * @param {any | null} response
     * @param {import('../../types/cache').CacheQueryOptions | undefined} options
     * @returns {boolean}
     */
    #A(S, D, N = null, v) {
      const _ = new URL(S.url), U = new URL(D.url);
      if (v?.ignoreSearch && (U.search = "", _.search = ""), !e(_, U, !0))
        return !1;
      if (N == null || v?.ignoreVary || !N.headersList.contains("vary"))
        return !0;
      const z = t(N.headersList.get("vary"));
      for (const P of z) {
        if (P === "*")
          return !1;
        const ee = D.headersList.get(P), te = S.headersList.get(P);
        if (ee !== te)
          return !1;
      }
      return !0;
    }
  }
  Object.defineProperties(w.prototype, {
    [Symbol.toStringTag]: {
      value: "Cache",
      configurable: !0
    },
    match: r,
    matchAll: r,
    add: r,
    addAll: r,
    put: r,
    delete: r,
    keys: r
  });
  const y = [
    {
      key: "ignoreSearch",
      converter: i.converters.boolean,
      defaultValue: !1
    },
    {
      key: "ignoreMethod",
      converter: i.converters.boolean,
      defaultValue: !1
    },
    {
      key: "ignoreVary",
      converter: i.converters.boolean,
      defaultValue: !1
    }
  ];
  return i.converters.CacheQueryOptions = i.dictionaryConverter(y), i.converters.MultiCacheQueryOptions = i.dictionaryConverter([
    ...y,
    {
      key: "cacheName",
      converter: i.converters.DOMString
    }
  ]), i.converters.Response = i.interfaceConverter(c), i.converters["sequence<RequestInfo>"] = i.sequenceConverter(
    i.converters.RequestInfo
  ), aa = {
    Cache: w
  }, aa;
}
var ca, ou;
function gy() {
  if (ou) return ca;
  ou = 1;
  const { kConstruct: A } = Qc(), { Cache: e } = cy(), { webidl: t } = LA(), { kEnumerableProperty: r } = ke;
  class s {
    /**
     * @see https://w3c.github.io/ServiceWorker/#dfn-relevant-name-to-cache-map
     * @type {Map<string, import('./cache').requestResponseList}
     */
    #e = /* @__PURE__ */ new Map();
    constructor() {
      arguments[0] !== A && t.illegalConstructor();
    }
    async match(i, c = {}) {
      if (t.brandCheck(this, s), t.argumentLengthCheck(arguments, 1, { header: "CacheStorage.match" }), i = t.converters.RequestInfo(i), c = t.converters.MultiCacheQueryOptions(c), c.cacheName != null) {
        if (this.#e.has(c.cacheName)) {
          const g = this.#e.get(c.cacheName);
          return await new e(A, g).match(i, c);
        }
      } else
        for (const g of this.#e.values()) {
          const l = await new e(A, g).match(i, c);
          if (l !== void 0)
            return l;
        }
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#cache-storage-has
     * @param {string} cacheName
     * @returns {Promise<boolean>}
     */
    async has(i) {
      return t.brandCheck(this, s), t.argumentLengthCheck(arguments, 1, { header: "CacheStorage.has" }), i = t.converters.DOMString(i), this.#e.has(i);
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#dom-cachestorage-open
     * @param {string} cacheName
     * @returns {Promise<Cache>}
     */
    async open(i) {
      if (t.brandCheck(this, s), t.argumentLengthCheck(arguments, 1, { header: "CacheStorage.open" }), i = t.converters.DOMString(i), this.#e.has(i)) {
        const g = this.#e.get(i);
        return new e(A, g);
      }
      const c = [];
      return this.#e.set(i, c), new e(A, c);
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#cache-storage-delete
     * @param {string} cacheName
     * @returns {Promise<boolean>}
     */
    async delete(i) {
      return t.brandCheck(this, s), t.argumentLengthCheck(arguments, 1, { header: "CacheStorage.delete" }), i = t.converters.DOMString(i), this.#e.delete(i);
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#cache-storage-keys
     * @returns {string[]}
     */
    async keys() {
      return t.brandCheck(this, s), [...this.#e.keys()];
    }
  }
  return Object.defineProperties(s.prototype, {
    [Symbol.toStringTag]: {
      value: "CacheStorage",
      configurable: !0
    },
    match: r,
    has: r,
    open: r,
    delete: r,
    keys: r
  }), ca = {
    CacheStorage: s
  }, ca;
}
var ga, iu;
function ly() {
  return iu || (iu = 1, ga = {
    maxAttributeValueSize: 1024,
    maxNameValuePairSize: 4096
  }), ga;
}
var la, au;
function Mh() {
  if (au) return la;
  au = 1;
  const A = G, { kHeadersList: e } = He;
  function t(E) {
    if (E.length === 0)
      return !1;
    for (const f of E) {
      const I = f.charCodeAt(0);
      if (I >= 0 || I <= 8 || I >= 10 || I <= 31 || I === 127)
        return !1;
    }
  }
  function r(E) {
    for (const f of E) {
      const I = f.charCodeAt(0);
      if (I <= 32 || I > 127 || f === "(" || f === ")" || f === ">" || f === "<" || f === "@" || f === "," || f === ";" || f === ":" || f === "\\" || f === '"' || f === "/" || f === "[" || f === "]" || f === "?" || f === "=" || f === "{" || f === "}")
        throw new Error("Invalid cookie name");
    }
  }
  function s(E) {
    for (const f of E) {
      const I = f.charCodeAt(0);
      if (I < 33 || // exclude CTLs (0-31)
      I === 34 || I === 44 || I === 59 || I === 92 || I > 126)
        throw new Error("Invalid header value");
    }
  }
  function o(E) {
    for (const f of E)
      if (f.charCodeAt(0) < 33 || f === ";")
        throw new Error("Invalid cookie path");
  }
  function i(E) {
    if (E.startsWith("-") || E.endsWith(".") || E.endsWith("-"))
      throw new Error("Invalid cookie domain");
  }
  function c(E) {
    typeof E == "number" && (E = new Date(E));
    const f = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ], I = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ], C = f[E.getUTCDay()], B = E.getUTCDate().toString().padStart(2, "0"), p = I[E.getUTCMonth()], Q = E.getUTCFullYear(), m = E.getUTCHours().toString().padStart(2, "0"), w = E.getUTCMinutes().toString().padStart(2, "0"), y = E.getUTCSeconds().toString().padStart(2, "0");
    return `${C}, ${B} ${p} ${Q} ${m}:${w}:${y} GMT`;
  }
  function g(E) {
    if (E < 0)
      throw new Error("Invalid cookie max-age");
  }
  function u(E) {
    if (E.name.length === 0)
      return null;
    r(E.name), s(E.value);
    const f = [`${E.name}=${E.value}`];
    E.name.startsWith("__Secure-") && (E.secure = !0), E.name.startsWith("__Host-") && (E.secure = !0, E.domain = null, E.path = "/"), E.secure && f.push("Secure"), E.httpOnly && f.push("HttpOnly"), typeof E.maxAge == "number" && (g(E.maxAge), f.push(`Max-Age=${E.maxAge}`)), E.domain && (i(E.domain), f.push(`Domain=${E.domain}`)), E.path && (o(E.path), f.push(`Path=${E.path}`)), E.expires && E.expires.toString() !== "Invalid Date" && f.push(`Expires=${c(E.expires)}`), E.sameSite && f.push(`SameSite=${E.sameSite}`);
    for (const I of E.unparsed) {
      if (!I.includes("="))
        throw new Error("Invalid unparsed");
      const [C, ...B] = I.split("=");
      f.push(`${C.trim()}=${B.join("=")}`);
    }
    return f.join("; ");
  }
  let l;
  function h(E) {
    if (E[e])
      return E[e];
    l || (l = Object.getOwnPropertySymbols(E).find(
      (I) => I.description === "headers list"
    ), A(l, "Headers cannot be parsed"));
    const f = E[l];
    return A(f), f;
  }
  return la = {
    isCTLExcludingHtab: t,
    stringify: u,
    getHeadersList: h
  }, la;
}
var ua, cu;
function uy() {
  if (cu) return ua;
  cu = 1;
  const { maxNameValuePairSize: A, maxAttributeValueSize: e } = ly(), { isCTLExcludingHtab: t } = Mh(), { collectASequenceOfCodePointsFast: r } = Bt(), s = G;
  function o(c) {
    if (t(c))
      return null;
    let g = "", u = "", l = "", h = "";
    if (c.includes(";")) {
      const E = { position: 0 };
      g = r(";", c, E), u = c.slice(E.position);
    } else
      g = c;
    if (!g.includes("="))
      h = g;
    else {
      const E = { position: 0 };
      l = r(
        "=",
        g,
        E
      ), h = g.slice(E.position + 1);
    }
    return l = l.trim(), h = h.trim(), l.length + h.length > A ? null : {
      name: l,
      value: h,
      ...i(u)
    };
  }
  function i(c, g = {}) {
    if (c.length === 0)
      return g;
    s(c[0] === ";"), c = c.slice(1);
    let u = "";
    c.includes(";") ? (u = r(
      ";",
      c,
      { position: 0 }
    ), c = c.slice(u.length)) : (u = c, c = "");
    let l = "", h = "";
    if (u.includes("=")) {
      const f = { position: 0 };
      l = r(
        "=",
        u,
        f
      ), h = u.slice(f.position + 1);
    } else
      l = u;
    if (l = l.trim(), h = h.trim(), h.length > e)
      return i(c, g);
    const E = l.toLowerCase();
    if (E === "expires") {
      const f = new Date(h);
      g.expires = f;
    } else if (E === "max-age") {
      const f = h.charCodeAt(0);
      if ((f < 48 || f > 57) && h[0] !== "-" || !/^\d+$/.test(h))
        return i(c, g);
      const I = Number(h);
      g.maxAge = I;
    } else if (E === "domain") {
      let f = h;
      f[0] === "." && (f = f.slice(1)), f = f.toLowerCase(), g.domain = f;
    } else if (E === "path") {
      let f = "";
      h.length === 0 || h[0] !== "/" ? f = "/" : f = h, g.path = f;
    } else if (E === "secure")
      g.secure = !0;
    else if (E === "httponly")
      g.httpOnly = !0;
    else if (E === "samesite") {
      let f = "Default";
      const I = h.toLowerCase();
      I.includes("none") && (f = "None"), I.includes("strict") && (f = "Strict"), I.includes("lax") && (f = "Lax"), g.sameSite = f;
    } else
      g.unparsed ??= [], g.unparsed.push(`${l}=${h}`);
    return i(c, g);
  }
  return ua = {
    parseSetCookie: o,
    parseUnparsedAttributes: i
  }, ua;
}
var Ea, gu;
function Ey() {
  if (gu) return Ea;
  gu = 1;
  const { parseSetCookie: A } = uy(), { stringify: e, getHeadersList: t } = Mh(), { webidl: r } = LA(), { Headers: s } = ss();
  function o(u) {
    r.argumentLengthCheck(arguments, 1, { header: "getCookies" }), r.brandCheck(u, s, { strict: !1 });
    const l = u.get("cookie"), h = {};
    if (!l)
      return h;
    for (const E of l.split(";")) {
      const [f, ...I] = E.split("=");
      h[f.trim()] = I.join("=");
    }
    return h;
  }
  function i(u, l, h) {
    r.argumentLengthCheck(arguments, 2, { header: "deleteCookie" }), r.brandCheck(u, s, { strict: !1 }), l = r.converters.DOMString(l), h = r.converters.DeleteCookieAttributes(h), g(u, {
      name: l,
      value: "",
      expires: /* @__PURE__ */ new Date(0),
      ...h
    });
  }
  function c(u) {
    r.argumentLengthCheck(arguments, 1, { header: "getSetCookies" }), r.brandCheck(u, s, { strict: !1 });
    const l = t(u).cookies;
    return l ? l.map((h) => A(Array.isArray(h) ? h[1] : h)) : [];
  }
  function g(u, l) {
    r.argumentLengthCheck(arguments, 2, { header: "setCookie" }), r.brandCheck(u, s, { strict: !1 }), l = r.converters.Cookie(l), e(l) && u.append("Set-Cookie", e(l));
  }
  return r.converters.DeleteCookieAttributes = r.dictionaryConverter([
    {
      converter: r.nullableConverter(r.converters.DOMString),
      key: "path",
      defaultValue: null
    },
    {
      converter: r.nullableConverter(r.converters.DOMString),
      key: "domain",
      defaultValue: null
    }
  ]), r.converters.Cookie = r.dictionaryConverter([
    {
      converter: r.converters.DOMString,
      key: "name"
    },
    {
      converter: r.converters.DOMString,
      key: "value"
    },
    {
      converter: r.nullableConverter((u) => typeof u == "number" ? r.converters["unsigned long long"](u) : new Date(u)),
      key: "expires",
      defaultValue: null
    },
    {
      converter: r.nullableConverter(r.converters["long long"]),
      key: "maxAge",
      defaultValue: null
    },
    {
      converter: r.nullableConverter(r.converters.DOMString),
      key: "domain",
      defaultValue: null
    },
    {
      converter: r.nullableConverter(r.converters.DOMString),
      key: "path",
      defaultValue: null
    },
    {
      converter: r.nullableConverter(r.converters.boolean),
      key: "secure",
      defaultValue: null
    },
    {
      converter: r.nullableConverter(r.converters.boolean),
      key: "httpOnly",
      defaultValue: null
    },
    {
      converter: r.converters.USVString,
      key: "sameSite",
      allowedValues: ["Strict", "Lax", "None"]
    },
    {
      converter: r.sequenceConverter(r.converters.DOMString),
      key: "unparsed",
      defaultValue: []
    }
  ]), Ea = {
    getCookies: o,
    deleteCookie: i,
    getSetCookies: c,
    setCookie: g
  }, Ea;
}
var ha, lu;
function Ks() {
  if (lu) return ha;
  lu = 1;
  const A = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11", e = {
    enumerable: !0,
    writable: !1,
    configurable: !1
  }, t = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
  }, r = {
    CONTINUATION: 0,
    TEXT: 1,
    BINARY: 2,
    CLOSE: 8,
    PING: 9,
    PONG: 10
  }, s = 2 ** 16 - 1, o = {
    INFO: 0,
    PAYLOADLENGTH_16: 2,
    PAYLOADLENGTH_64: 3,
    READ_DATA: 4
  }, i = Buffer.allocUnsafe(0);
  return ha = {
    uid: A,
    staticPropertyDescriptors: e,
    states: t,
    opcodes: r,
    maxUnsigned16Bit: s,
    parserStates: o,
    emptyBuffer: i
  }, ha;
}
var Qa, uu;
function Do() {
  return uu || (uu = 1, Qa = {
    kWebSocketURL: Symbol("url"),
    kReadyState: Symbol("ready state"),
    kController: Symbol("controller"),
    kResponse: Symbol("response"),
    kBinaryType: Symbol("binary type"),
    kSentClose: Symbol("sent close"),
    kReceivedClose: Symbol("received close"),
    kByteParser: Symbol("byte parser")
  }), Qa;
}
var Ca, Eu;
function Yh() {
  if (Eu) return Ca;
  Eu = 1;
  const { webidl: A } = LA(), { kEnumerableProperty: e } = ke, { MessagePort: t } = G;
  class r extends Event {
    #e;
    constructor(g, u = {}) {
      A.argumentLengthCheck(arguments, 1, { header: "MessageEvent constructor" }), g = A.converters.DOMString(g), u = A.converters.MessageEventInit(u), super(g, u), this.#e = u;
    }
    get data() {
      return A.brandCheck(this, r), this.#e.data;
    }
    get origin() {
      return A.brandCheck(this, r), this.#e.origin;
    }
    get lastEventId() {
      return A.brandCheck(this, r), this.#e.lastEventId;
    }
    get source() {
      return A.brandCheck(this, r), this.#e.source;
    }
    get ports() {
      return A.brandCheck(this, r), Object.isFrozen(this.#e.ports) || Object.freeze(this.#e.ports), this.#e.ports;
    }
    initMessageEvent(g, u = !1, l = !1, h = null, E = "", f = "", I = null, C = []) {
      return A.brandCheck(this, r), A.argumentLengthCheck(arguments, 1, { header: "MessageEvent.initMessageEvent" }), new r(g, {
        bubbles: u,
        cancelable: l,
        data: h,
        origin: E,
        lastEventId: f,
        source: I,
        ports: C
      });
    }
  }
  class s extends Event {
    #e;
    constructor(g, u = {}) {
      A.argumentLengthCheck(arguments, 1, { header: "CloseEvent constructor" }), g = A.converters.DOMString(g), u = A.converters.CloseEventInit(u), super(g, u), this.#e = u;
    }
    get wasClean() {
      return A.brandCheck(this, s), this.#e.wasClean;
    }
    get code() {
      return A.brandCheck(this, s), this.#e.code;
    }
    get reason() {
      return A.brandCheck(this, s), this.#e.reason;
    }
  }
  class o extends Event {
    #e;
    constructor(g, u) {
      A.argumentLengthCheck(arguments, 1, { header: "ErrorEvent constructor" }), super(g, u), g = A.converters.DOMString(g), u = A.converters.ErrorEventInit(u ?? {}), this.#e = u;
    }
    get message() {
      return A.brandCheck(this, o), this.#e.message;
    }
    get filename() {
      return A.brandCheck(this, o), this.#e.filename;
    }
    get lineno() {
      return A.brandCheck(this, o), this.#e.lineno;
    }
    get colno() {
      return A.brandCheck(this, o), this.#e.colno;
    }
    get error() {
      return A.brandCheck(this, o), this.#e.error;
    }
  }
  Object.defineProperties(r.prototype, {
    [Symbol.toStringTag]: {
      value: "MessageEvent",
      configurable: !0
    },
    data: e,
    origin: e,
    lastEventId: e,
    source: e,
    ports: e,
    initMessageEvent: e
  }), Object.defineProperties(s.prototype, {
    [Symbol.toStringTag]: {
      value: "CloseEvent",
      configurable: !0
    },
    reason: e,
    code: e,
    wasClean: e
  }), Object.defineProperties(o.prototype, {
    [Symbol.toStringTag]: {
      value: "ErrorEvent",
      configurable: !0
    },
    message: e,
    filename: e,
    lineno: e,
    colno: e,
    error: e
  }), A.converters.MessagePort = A.interfaceConverter(t), A.converters["sequence<MessagePort>"] = A.sequenceConverter(
    A.converters.MessagePort
  );
  const i = [
    {
      key: "bubbles",
      converter: A.converters.boolean,
      defaultValue: !1
    },
    {
      key: "cancelable",
      converter: A.converters.boolean,
      defaultValue: !1
    },
    {
      key: "composed",
      converter: A.converters.boolean,
      defaultValue: !1
    }
  ];
  return A.converters.MessageEventInit = A.dictionaryConverter([
    ...i,
    {
      key: "data",
      converter: A.converters.any,
      defaultValue: null
    },
    {
      key: "origin",
      converter: A.converters.USVString,
      defaultValue: ""
    },
    {
      key: "lastEventId",
      converter: A.converters.DOMString,
      defaultValue: ""
    },
    {
      key: "source",
      // Node doesn't implement WindowProxy or ServiceWorker, so the only
      // valid value for source is a MessagePort.
      converter: A.nullableConverter(A.converters.MessagePort),
      defaultValue: null
    },
    {
      key: "ports",
      converter: A.converters["sequence<MessagePort>"],
      get defaultValue() {
        return [];
      }
    }
  ]), A.converters.CloseEventInit = A.dictionaryConverter([
    ...i,
    {
      key: "wasClean",
      converter: A.converters.boolean,
      defaultValue: !1
    },
    {
      key: "code",
      converter: A.converters["unsigned short"],
      defaultValue: 0
    },
    {
      key: "reason",
      converter: A.converters.USVString,
      defaultValue: ""
    }
  ]), A.converters.ErrorEventInit = A.dictionaryConverter([
    ...i,
    {
      key: "message",
      converter: A.converters.DOMString,
      defaultValue: ""
    },
    {
      key: "filename",
      converter: A.converters.USVString,
      defaultValue: ""
    },
    {
      key: "lineno",
      converter: A.converters["unsigned long"],
      defaultValue: 0
    },
    {
      key: "colno",
      converter: A.converters["unsigned long"],
      defaultValue: 0
    },
    {
      key: "error",
      converter: A.converters.any
    }
  ]), Ca = {
    MessageEvent: r,
    CloseEvent: s,
    ErrorEvent: o
  }, Ca;
}
var da, hu;
function Cc() {
  if (hu) return da;
  hu = 1;
  const { kReadyState: A, kController: e, kResponse: t, kBinaryType: r, kWebSocketURL: s } = Do(), { states: o, opcodes: i } = Ks(), { MessageEvent: c, ErrorEvent: g } = Yh();
  function u(p) {
    return p[A] === o.OPEN;
  }
  function l(p) {
    return p[A] === o.CLOSING;
  }
  function h(p) {
    return p[A] === o.CLOSED;
  }
  function E(p, Q, m = Event, w) {
    const y = new m(p, w);
    Q.dispatchEvent(y);
  }
  function f(p, Q, m) {
    if (p[A] !== o.OPEN)
      return;
    let w;
    if (Q === i.TEXT)
      try {
        w = new TextDecoder("utf-8", { fatal: !0 }).decode(m);
      } catch {
        B(p, "Received invalid UTF-8 in text frame.");
        return;
      }
    else Q === i.BINARY && (p[r] === "blob" ? w = new Blob([m]) : w = new Uint8Array(m).buffer);
    E("message", p, c, {
      origin: p[s].origin,
      data: w
    });
  }
  function I(p) {
    if (p.length === 0)
      return !1;
    for (const Q of p) {
      const m = Q.charCodeAt(0);
      if (m < 33 || m > 126 || Q === "(" || Q === ")" || Q === "<" || Q === ">" || Q === "@" || Q === "," || Q === ";" || Q === ":" || Q === "\\" || Q === '"' || Q === "/" || Q === "[" || Q === "]" || Q === "?" || Q === "=" || Q === "{" || Q === "}" || m === 32 || // SP
      m === 9)
        return !1;
    }
    return !0;
  }
  function C(p) {
    return p >= 1e3 && p < 1015 ? p !== 1004 && // reserved
    p !== 1005 && // "MUST NOT be set as a status code"
    p !== 1006 : p >= 3e3 && p <= 4999;
  }
  function B(p, Q) {
    const { [e]: m, [t]: w } = p;
    m.abort(), w?.socket && !w.socket.destroyed && w.socket.destroy(), Q && E("error", p, g, {
      error: new Error(Q)
    });
  }
  return da = {
    isEstablished: u,
    isClosing: l,
    isClosed: h,
    fireEvent: E,
    isValidSubprotocol: I,
    isValidStatusCode: C,
    failWebsocketConnection: B,
    websocketMessageReceived: f
  }, da;
}
var Ba, Qu;
function hy() {
  if (Qu) return Ba;
  Qu = 1;
  const A = G, { uid: e, states: t } = Ks(), {
    kReadyState: r,
    kSentClose: s,
    kByteParser: o,
    kReceivedClose: i
  } = Do(), { fireEvent: c, failWebsocketConnection: g } = Cc(), { CloseEvent: u } = Yh(), { makeRequest: l } = Ro(), { fetching: h } = hc(), { Headers: E } = ss(), { getGlobalDispatcher: f } = Xs, { kHeadersList: I } = He, C = {};
  C.open = A.channel("undici:websocket:open"), C.close = A.channel("undici:websocket:close"), C.socketError = A.channel("undici:websocket:socket_error");
  let B;
  try {
    B = G;
  } catch {
  }
  function p(y, b, S, D, N) {
    const v = y;
    v.protocol = y.protocol === "ws:" ? "http:" : "https:";
    const _ = l({
      urlList: [v],
      serviceWorkers: "none",
      referrer: "no-referrer",
      mode: "websocket",
      credentials: "include",
      cache: "no-store",
      redirect: "error"
    });
    if (N.headers) {
      const ee = new E(N.headers)[I];
      _.headersList = ee;
    }
    const U = B.randomBytes(16).toString("base64");
    _.headersList.append("sec-websocket-key", U), _.headersList.append("sec-websocket-version", "13");
    for (const ee of b)
      _.headersList.append("sec-websocket-protocol", ee);
    const z = "";
    return h({
      request: _,
      useParallelQueue: !0,
      dispatcher: N.dispatcher ?? f(),
      processResponse(ee) {
        if (ee.type === "error" || ee.status !== 101) {
          g(S, "Received network error or non-101 status code.");
          return;
        }
        if (b.length !== 0 && !ee.headersList.get("Sec-WebSocket-Protocol")) {
          g(S, "Server did not respond with sent protocols.");
          return;
        }
        if (ee.headersList.get("Upgrade")?.toLowerCase() !== "websocket") {
          g(S, 'Server did not set Upgrade header to "websocket".');
          return;
        }
        if (ee.headersList.get("Connection")?.toLowerCase() !== "upgrade") {
          g(S, 'Server did not set Connection header to "upgrade".');
          return;
        }
        const te = ee.headersList.get("Sec-WebSocket-Accept"), ge = B.createHash("sha1").update(U + e).digest("base64");
        if (te !== ge) {
          g(S, "Incorrect hash received in Sec-WebSocket-Accept header.");
          return;
        }
        const ne = ee.headersList.get("Sec-WebSocket-Extensions");
        if (ne !== null && ne !== z) {
          g(S, "Received different permessage-deflate than the one set.");
          return;
        }
        const Qe = ee.headersList.get("Sec-WebSocket-Protocol");
        if (Qe !== null && Qe !== _.headersList.get("Sec-WebSocket-Protocol")) {
          g(S, "Protocol was not set in the opening handshake.");
          return;
        }
        ee.socket.on("data", Q), ee.socket.on("close", m), ee.socket.on("error", w), C.open.hasSubscribers && C.open.publish({
          address: ee.socket.address(),
          protocol: Qe,
          extensions: ne
        }), D(ee);
      }
    });
  }
  function Q(y) {
    this.ws[o].write(y) || this.pause();
  }
  function m() {
    const { ws: y } = this, b = y[s] && y[i];
    let S = 1005, D = "";
    const N = y[o].closingInfo;
    N ? (S = N.code ?? 1005, D = N.reason) : y[s] || (S = 1006), y[r] = t.CLOSED, c("close", y, u, {
      wasClean: b,
      code: S,
      reason: D
    }), C.close.hasSubscribers && C.close.publish({
      websocket: y,
      code: S,
      reason: D
    });
  }
  function w(y) {
    const { ws: b } = this;
    b[r] = t.CLOSING, C.socketError.hasSubscribers && C.socketError.publish(y), this.destroy();
  }
  return Ba = {
    establishWebSocketConnection: p
  }, Ba;
}
var Ia, Cu;
function Ph() {
  if (Cu) return Ia;
  Cu = 1;
  const { maxUnsigned16Bit: A } = Ks();
  let e;
  try {
    e = G;
  } catch {
  }
  class t {
    /**
     * @param {Buffer|undefined} data
     */
    constructor(s) {
      this.frameData = s, this.maskKey = e.randomBytes(4);
    }
    createFrame(s) {
      const o = this.frameData?.byteLength ?? 0;
      let i = o, c = 6;
      o > A ? (c += 8, i = 127) : o > 125 && (c += 2, i = 126);
      const g = Buffer.allocUnsafe(o + c);
      g[0] = g[1] = 0, g[0] |= 128, g[0] = (g[0] & 240) + s;
      /*! ws. MIT License. Einar Otto Stangvik <einaros@gmail.com> */
      g[c - 4] = this.maskKey[0], g[c - 3] = this.maskKey[1], g[c - 2] = this.maskKey[2], g[c - 1] = this.maskKey[3], g[1] = i, i === 126 ? g.writeUInt16BE(o, 2) : i === 127 && (g[2] = g[3] = 0, g.writeUIntBE(o, 4, 6)), g[1] |= 128;
      for (let u = 0; u < o; u++)
        g[c + u] = this.frameData[u] ^ this.maskKey[u % 4];
      return g;
    }
  }
  return Ia = {
    WebsocketFrameSend: t
  }, Ia;
}
var fa, du;
function Qy() {
  if (du) return fa;
  du = 1;
  const { Writable: A } = G, e = G, { parserStates: t, opcodes: r, states: s, emptyBuffer: o } = Ks(), { kReadyState: i, kSentClose: c, kResponse: g, kReceivedClose: u } = Do(), { isValidStatusCode: l, failWebsocketConnection: h, websocketMessageReceived: E } = Cc(), { WebsocketFrameSend: f } = Ph(), I = {};
  I.ping = e.channel("undici:websocket:ping"), I.pong = e.channel("undici:websocket:pong");
  class C extends A {
    #e = [];
    #t = 0;
    #r = t.INFO;
    #A = {};
    #s = [];
    constructor(p) {
      super(), this.ws = p;
    }
    /**
     * @param {Buffer} chunk
     * @param {() => void} callback
     */
    _write(p, Q, m) {
      this.#e.push(p), this.#t += p.length, this.run(m);
    }
    /**
     * Runs whenever a new chunk is received.
     * Callback is called whenever there are no more chunks buffering,
     * or not enough bytes are buffered to parse.
     */
    run(p) {
      for (; ; ) {
        if (this.#r === t.INFO) {
          if (this.#t < 2)
            return p();
          const Q = this.consume(2);
          if (this.#A.fin = (Q[0] & 128) !== 0, this.#A.opcode = Q[0] & 15, this.#A.originalOpcode ??= this.#A.opcode, this.#A.fragmented = !this.#A.fin && this.#A.opcode !== r.CONTINUATION, this.#A.fragmented && this.#A.opcode !== r.BINARY && this.#A.opcode !== r.TEXT) {
            h(this.ws, "Invalid frame type was fragmented.");
            return;
          }
          const m = Q[1] & 127;
          if (m <= 125 ? (this.#A.payloadLength = m, this.#r = t.READ_DATA) : m === 126 ? this.#r = t.PAYLOADLENGTH_16 : m === 127 && (this.#r = t.PAYLOADLENGTH_64), this.#A.fragmented && m > 125) {
            h(this.ws, "Fragmented frame exceeded 125 bytes.");
            return;
          } else if ((this.#A.opcode === r.PING || this.#A.opcode === r.PONG || this.#A.opcode === r.CLOSE) && m > 125) {
            h(this.ws, "Payload length for control frame exceeded 125 bytes.");
            return;
          } else if (this.#A.opcode === r.CLOSE) {
            if (m === 1) {
              h(this.ws, "Received close frame with a 1-byte body.");
              return;
            }
            const w = this.consume(m);
            if (this.#A.closeInfo = this.parseCloseBody(!1, w), !this.ws[c]) {
              const y = Buffer.allocUnsafe(2);
              y.writeUInt16BE(this.#A.closeInfo.code, 0);
              const b = new f(y);
              this.ws[g].socket.write(
                b.createFrame(r.CLOSE),
                (S) => {
                  S || (this.ws[c] = !0);
                }
              );
            }
            this.ws[i] = s.CLOSING, this.ws[u] = !0, this.end();
            return;
          } else if (this.#A.opcode === r.PING) {
            const w = this.consume(m);
            if (!this.ws[u]) {
              const y = new f(w);
              this.ws[g].socket.write(y.createFrame(r.PONG)), I.ping.hasSubscribers && I.ping.publish({
                payload: w
              });
            }
            if (this.#r = t.INFO, this.#t > 0)
              continue;
            p();
            return;
          } else if (this.#A.opcode === r.PONG) {
            const w = this.consume(m);
            if (I.pong.hasSubscribers && I.pong.publish({
              payload: w
            }), this.#t > 0)
              continue;
            p();
            return;
          }
        } else if (this.#r === t.PAYLOADLENGTH_16) {
          if (this.#t < 2)
            return p();
          const Q = this.consume(2);
          this.#A.payloadLength = Q.readUInt16BE(0), this.#r = t.READ_DATA;
        } else if (this.#r === t.PAYLOADLENGTH_64) {
          if (this.#t < 8)
            return p();
          const Q = this.consume(8), m = Q.readUInt32BE(0);
          if (m > 2 ** 31 - 1) {
            h(this.ws, "Received payload length > 2^31 bytes.");
            return;
          }
          const w = Q.readUInt32BE(4);
          this.#A.payloadLength = (m << 8) + w, this.#r = t.READ_DATA;
        } else if (this.#r === t.READ_DATA) {
          if (this.#t < this.#A.payloadLength)
            return p();
          if (this.#t >= this.#A.payloadLength) {
            const Q = this.consume(this.#A.payloadLength);
            if (this.#s.push(Q), !this.#A.fragmented || this.#A.fin && this.#A.opcode === r.CONTINUATION) {
              const m = Buffer.concat(this.#s);
              E(this.ws, this.#A.originalOpcode, m), this.#A = {}, this.#s.length = 0;
            }
            this.#r = t.INFO;
          }
        }
        if (!(this.#t > 0)) {
          p();
          break;
        }
      }
    }
    /**
     * Take n bytes from the buffered Buffers
     * @param {number} n
     * @returns {Buffer|null}
     */
    consume(p) {
      if (p > this.#t)
        return null;
      if (p === 0)
        return o;
      if (this.#e[0].length === p)
        return this.#t -= this.#e[0].length, this.#e.shift();
      const Q = Buffer.allocUnsafe(p);
      let m = 0;
      for (; m !== p; ) {
        const w = this.#e[0], { length: y } = w;
        if (y + m === p) {
          Q.set(this.#e.shift(), m);
          break;
        } else if (y + m > p) {
          Q.set(w.subarray(0, p - m), m), this.#e[0] = w.subarray(p - m);
          break;
        } else
          Q.set(this.#e.shift(), m), m += w.length;
      }
      return this.#t -= p, Q;
    }
    parseCloseBody(p, Q) {
      let m;
      if (Q.length >= 2 && (m = Q.readUInt16BE(0)), p)
        return l(m) ? { code: m } : null;
      let w = Q.subarray(2);
      if (w[0] === 239 && w[1] === 187 && w[2] === 191 && (w = w.subarray(3)), m !== void 0 && !l(m))
        return null;
      try {
        w = new TextDecoder("utf-8", { fatal: !0 }).decode(w);
      } catch {
        return null;
      }
      return { code: m, reason: w };
    }
    get closingInfo() {
      return this.#A.closeInfo;
    }
  }
  return fa = {
    ByteParser: C
  }, fa;
}
var pa, Bu;
function Cy() {
  if (Bu) return pa;
  Bu = 1;
  const { webidl: A } = LA(), { DOMException: e } = fr(), { URLSerializer: t } = Bt(), { getGlobalOrigin: r } = js(), { staticPropertyDescriptors: s, states: o, opcodes: i, emptyBuffer: c } = Ks(), {
    kWebSocketURL: g,
    kReadyState: u,
    kController: l,
    kBinaryType: h,
    kResponse: E,
    kSentClose: f,
    kByteParser: I
  } = Do(), { isEstablished: C, isClosing: B, isValidSubprotocol: p, failWebsocketConnection: Q, fireEvent: m } = Cc(), { establishWebSocketConnection: w } = hy(), { WebsocketFrameSend: y } = Ph(), { ByteParser: b } = Qy(), { kEnumerableProperty: S, isBlobLike: D } = ke, { getGlobalDispatcher: N } = Xs, { types: v } = G;
  let _ = !1;
  class U extends EventTarget {
    #e = {
      open: null,
      error: null,
      close: null,
      message: null
    };
    #t = 0;
    #r = "";
    #A = "";
    /**
     * @param {string} url
     * @param {string|string[]} protocols
     */
    constructor(P, ee = []) {
      super(), A.argumentLengthCheck(arguments, 1, { header: "WebSocket constructor" }), _ || (_ = !0, process.emitWarning("WebSockets are experimental, expect them to change at any time.", {
        code: "UNDICI-WS"
      }));
      const te = A.converters["DOMString or sequence<DOMString> or WebSocketInit"](ee);
      P = A.converters.USVString(P), ee = te.protocols;
      const ge = r();
      let ne;
      try {
        ne = new URL(P, ge);
      } catch (Qe) {
        throw new e(Qe, "SyntaxError");
      }
      if (ne.protocol === "http:" ? ne.protocol = "ws:" : ne.protocol === "https:" && (ne.protocol = "wss:"), ne.protocol !== "ws:" && ne.protocol !== "wss:")
        throw new e(
          `Expected a ws: or wss: protocol, got ${ne.protocol}`,
          "SyntaxError"
        );
      if (ne.hash || ne.href.endsWith("#"))
        throw new e("Got fragment", "SyntaxError");
      if (typeof ee == "string" && (ee = [ee]), ee.length !== new Set(ee.map((Qe) => Qe.toLowerCase())).size)
        throw new e("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
      if (ee.length > 0 && !ee.every((Qe) => p(Qe)))
        throw new e("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
      this[g] = new URL(ne.href), this[l] = w(
        ne,
        ee,
        this,
        (Qe) => this.#s(Qe),
        te
      ), this[u] = U.CONNECTING, this[h] = "blob";
    }
    /**
     * @see https://websockets.spec.whatwg.org/#dom-websocket-close
     * @param {number|undefined} code
     * @param {string|undefined} reason
     */
    close(P = void 0, ee = void 0) {
      if (A.brandCheck(this, U), P !== void 0 && (P = A.converters["unsigned short"](P, { clamp: !0 })), ee !== void 0 && (ee = A.converters.USVString(ee)), P !== void 0 && P !== 1e3 && (P < 3e3 || P > 4999))
        throw new e("invalid code", "InvalidAccessError");
      let te = 0;
      if (ee !== void 0 && (te = Buffer.byteLength(ee), te > 123))
        throw new e(
          `Reason must be less than 123 bytes; received ${te}`,
          "SyntaxError"
        );
      if (!(this[u] === U.CLOSING || this[u] === U.CLOSED)) if (!C(this))
        Q(this, "Connection was closed before it was established."), this[u] = U.CLOSING;
      else if (B(this))
        this[u] = U.CLOSING;
      else {
        const ge = new y();
        P !== void 0 && ee === void 0 ? (ge.frameData = Buffer.allocUnsafe(2), ge.frameData.writeUInt16BE(P, 0)) : P !== void 0 && ee !== void 0 ? (ge.frameData = Buffer.allocUnsafe(2 + te), ge.frameData.writeUInt16BE(P, 0), ge.frameData.write(ee, 2, "utf-8")) : ge.frameData = c, this[E].socket.write(ge.createFrame(i.CLOSE), (Qe) => {
          Qe || (this[f] = !0);
        }), this[u] = o.CLOSING;
      }
    }
    /**
     * @see https://websockets.spec.whatwg.org/#dom-websocket-send
     * @param {NodeJS.TypedArray|ArrayBuffer|Blob|string} data
     */
    send(P) {
      if (A.brandCheck(this, U), A.argumentLengthCheck(arguments, 1, { header: "WebSocket.send" }), P = A.converters.WebSocketSendData(P), this[u] === U.CONNECTING)
        throw new e("Sent before connected.", "InvalidStateError");
      if (!C(this) || B(this))
        return;
      const ee = this[E].socket;
      if (typeof P == "string") {
        const te = Buffer.from(P), ne = new y(te).createFrame(i.TEXT);
        this.#t += te.byteLength, ee.write(ne, () => {
          this.#t -= te.byteLength;
        });
      } else if (v.isArrayBuffer(P)) {
        const te = Buffer.from(P), ne = new y(te).createFrame(i.BINARY);
        this.#t += te.byteLength, ee.write(ne, () => {
          this.#t -= te.byteLength;
        });
      } else if (ArrayBuffer.isView(P)) {
        const te = Buffer.from(P, P.byteOffset, P.byteLength), ne = new y(te).createFrame(i.BINARY);
        this.#t += te.byteLength, ee.write(ne, () => {
          this.#t -= te.byteLength;
        });
      } else if (D(P)) {
        const te = new y();
        P.arrayBuffer().then((ge) => {
          const ne = Buffer.from(ge);
          te.frameData = ne;
          const Qe = te.createFrame(i.BINARY);
          this.#t += ne.byteLength, ee.write(Qe, () => {
            this.#t -= ne.byteLength;
          });
        });
      }
    }
    get readyState() {
      return A.brandCheck(this, U), this[u];
    }
    get bufferedAmount() {
      return A.brandCheck(this, U), this.#t;
    }
    get url() {
      return A.brandCheck(this, U), t(this[g]);
    }
    get extensions() {
      return A.brandCheck(this, U), this.#A;
    }
    get protocol() {
      return A.brandCheck(this, U), this.#r;
    }
    get onopen() {
      return A.brandCheck(this, U), this.#e.open;
    }
    set onopen(P) {
      A.brandCheck(this, U), this.#e.open && this.removeEventListener("open", this.#e.open), typeof P == "function" ? (this.#e.open = P, this.addEventListener("open", P)) : this.#e.open = null;
    }
    get onerror() {
      return A.brandCheck(this, U), this.#e.error;
    }
    set onerror(P) {
      A.brandCheck(this, U), this.#e.error && this.removeEventListener("error", this.#e.error), typeof P == "function" ? (this.#e.error = P, this.addEventListener("error", P)) : this.#e.error = null;
    }
    get onclose() {
      return A.brandCheck(this, U), this.#e.close;
    }
    set onclose(P) {
      A.brandCheck(this, U), this.#e.close && this.removeEventListener("close", this.#e.close), typeof P == "function" ? (this.#e.close = P, this.addEventListener("close", P)) : this.#e.close = null;
    }
    get onmessage() {
      return A.brandCheck(this, U), this.#e.message;
    }
    set onmessage(P) {
      A.brandCheck(this, U), this.#e.message && this.removeEventListener("message", this.#e.message), typeof P == "function" ? (this.#e.message = P, this.addEventListener("message", P)) : this.#e.message = null;
    }
    get binaryType() {
      return A.brandCheck(this, U), this[h];
    }
    set binaryType(P) {
      A.brandCheck(this, U), P !== "blob" && P !== "arraybuffer" ? this[h] = "blob" : this[h] = P;
    }
    /**
     * @see https://websockets.spec.whatwg.org/#feedback-from-the-protocol
     */
    #s(P) {
      this[E] = P;
      const ee = new b(this);
      ee.on("drain", function() {
        this.ws[E].socket.resume();
      }), P.socket.ws = this, this[I] = ee, this[u] = o.OPEN;
      const te = P.headersList.get("sec-websocket-extensions");
      te !== null && (this.#A = te);
      const ge = P.headersList.get("sec-websocket-protocol");
      ge !== null && (this.#r = ge), m("open", this);
    }
  }
  return U.CONNECTING = U.prototype.CONNECTING = o.CONNECTING, U.OPEN = U.prototype.OPEN = o.OPEN, U.CLOSING = U.prototype.CLOSING = o.CLOSING, U.CLOSED = U.prototype.CLOSED = o.CLOSED, Object.defineProperties(U.prototype, {
    CONNECTING: s,
    OPEN: s,
    CLOSING: s,
    CLOSED: s,
    url: S,
    readyState: S,
    bufferedAmount: S,
    onopen: S,
    onerror: S,
    onclose: S,
    close: S,
    onmessage: S,
    binaryType: S,
    send: S,
    extensions: S,
    protocol: S,
    [Symbol.toStringTag]: {
      value: "WebSocket",
      writable: !1,
      enumerable: !1,
      configurable: !0
    }
  }), Object.defineProperties(U, {
    CONNECTING: s,
    OPEN: s,
    CLOSING: s,
    CLOSED: s
  }), A.converters["sequence<DOMString>"] = A.sequenceConverter(
    A.converters.DOMString
  ), A.converters["DOMString or sequence<DOMString>"] = function(z) {
    return A.util.Type(z) === "Object" && Symbol.iterator in z ? A.converters["sequence<DOMString>"](z) : A.converters.DOMString(z);
  }, A.converters.WebSocketInit = A.dictionaryConverter([
    {
      key: "protocols",
      converter: A.converters["DOMString or sequence<DOMString>"],
      get defaultValue() {
        return [];
      }
    },
    {
      key: "dispatcher",
      converter: (z) => z,
      get defaultValue() {
        return N();
      }
    },
    {
      key: "headers",
      converter: A.nullableConverter(A.converters.HeadersInit)
    }
  ]), A.converters["DOMString or sequence<DOMString> or WebSocketInit"] = function(z) {
    return A.util.Type(z) === "Object" && !(Symbol.iterator in z) ? A.converters.WebSocketInit(z) : { protocols: A.converters["DOMString or sequence<DOMString>"](z) };
  }, A.converters.WebSocketSendData = function(z) {
    if (A.util.Type(z) === "Object") {
      if (D(z))
        return A.converters.Blob(z, { strict: !1 });
      if (ArrayBuffer.isView(z) || v.isAnyArrayBuffer(z))
        return A.converters.BufferSource(z);
    }
    return A.converters.USVString(z);
  }, pa = {
    WebSocket: U
  }, pa;
}
const dy = mo, Jh = ac, Oh = Me, By = zs, Iy = mf, fy = yo, dr = ke, { InvalidArgumentError: xn } = Oh, ns = rs, py = fo, my = Th, yy = _m, wy = Nh, by = fh, Ry = Zm, Dy = ey, { getGlobalDispatcher: Hh, setGlobalDispatcher: Sy } = Xs, ky = ry, Fy = vE, Ty = gc;
let Wa;
try {
  Wa = !0;
} catch {
  Wa = !1;
}
Object.assign(Jh.prototype, ns);
Ie.Dispatcher = Jh;
Ie.Client = dy;
Ie.Pool = By;
Ie.BalancedPool = Iy;
Ie.Agent = fy;
Ie.ProxyAgent = Ry;
Ie.RetryHandler = Dy;
Ie.DecoratorHandler = ky;
Ie.RedirectHandler = Fy;
Ie.createRedirectInterceptor = Ty;
Ie.buildConnector = py;
Ie.errors = Oh;
function en(A) {
  return (e, t, r) => {
    if (typeof t == "function" && (r = t, t = null), !e || typeof e != "string" && typeof e != "object" && !(e instanceof URL))
      throw new xn("invalid url");
    if (t != null && typeof t != "object")
      throw new xn("invalid opts");
    if (t && t.path != null) {
      if (typeof t.path != "string")
        throw new xn("invalid opts.path");
      let i = t.path;
      t.path.startsWith("/") || (i = `/${i}`), e = new URL(dr.parseOrigin(e).origin + i);
    } else
      t || (t = typeof e == "object" ? e : {}), e = dr.parseURL(e);
    const { agent: s, dispatcher: o = Hh() } = t;
    if (s)
      throw new xn("unsupported opts.agent. Did you mean opts.client?");
    return A.call(o, {
      ...t,
      origin: e.origin,
      path: e.search ? `${e.pathname}${e.search}` : e.pathname,
      method: t.method || (t.body ? "PUT" : "GET")
    }, r);
  };
}
Ie.setGlobalDispatcher = Sy;
Ie.getGlobalDispatcher = Hh;
if (dr.nodeMajor > 16 || dr.nodeMajor === 16 && dr.nodeMinor >= 8) {
  let A = null;
  Ie.fetch = async function(i) {
    A || (A = hc().fetch);
    try {
      return await A(...arguments);
    } catch (c) {
      throw typeof c == "object" && Error.captureStackTrace(c, this), c;
    }
  }, Ie.Headers = ss().Headers, Ie.Response = Ec().Response, Ie.Request = Ro().Request, Ie.FormData = ic().FormData, Ie.File = oc().File, Ie.FileReader = iy().FileReader;
  const { setGlobalOrigin: e, getGlobalOrigin: t } = js();
  Ie.setGlobalOrigin = e, Ie.getGlobalOrigin = t;
  const { CacheStorage: r } = gy(), { kConstruct: s } = Qc();
  Ie.caches = new r(s);
}
if (dr.nodeMajor >= 16) {
  const { deleteCookie: A, getCookies: e, getSetCookies: t, setCookie: r } = Ey();
  Ie.deleteCookie = A, Ie.getCookies = e, Ie.getSetCookies = t, Ie.setCookie = r;
  const { parseMIMEType: s, serializeAMimeType: o } = Bt();
  Ie.parseMIMEType = s, Ie.serializeAMimeType = o;
}
if (dr.nodeMajor >= 18 && Wa) {
  const { WebSocket: A } = Cy();
  Ie.WebSocket = A;
}
Ie.request = en(ns.request);
Ie.stream = en(ns.stream);
Ie.pipeline = en(ns.pipeline);
Ie.connect = en(ns.connect);
Ie.upgrade = en(ns.upgrade);
Ie.MockClient = my;
Ie.MockPool = wy;
Ie.MockAgent = yy;
Ie.mockErrors = by;
var Ny = H && H.__createBinding || (Object.create ? function(A, e, t, r) {
  r === void 0 && (r = t);
  var s = Object.getOwnPropertyDescriptor(e, t);
  (!s || ("get" in s ? !e.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(A, r, s);
} : function(A, e, t, r) {
  r === void 0 && (r = t), A[r] = e[t];
}), Uy = H && H.__setModuleDefault || (Object.create ? function(A, e) {
  Object.defineProperty(A, "default", { enumerable: !0, value: e });
} : function(A, e) {
  A.default = e;
}), So = H && H.__importStar || function(A) {
  if (A && A.__esModule) return A;
  var e = {};
  if (A != null) for (var t in A) t !== "default" && Object.prototype.hasOwnProperty.call(A, t) && Ny(e, A, t);
  return Uy(e, A), e;
}, Xe = H && H.__awaiter || function(A, e, t, r) {
  function s(o) {
    return o instanceof t ? o : new t(function(i) {
      i(o);
    });
  }
  return new (t || (t = Promise))(function(o, i) {
    function c(l) {
      try {
        u(r.next(l));
      } catch (h) {
        i(h);
      }
    }
    function g(l) {
      try {
        u(r.throw(l));
      } catch (h) {
        i(h);
      }
    }
    function u(l) {
      l.done ? o(l.value) : s(l.value).then(c, g);
    }
    u((r = r.apply(A, e || [])).next());
  });
};
Object.defineProperty(aA, "__esModule", { value: !0 });
aA.HttpClient = aA.isHttps = aA.HttpClientResponse = aA.HttpClientError = aA.getProxyUrl = aA.MediaTypes = aA.Headers = aA.HttpCodes = void 0;
const jn = So(G), ma = So(G), qa = So(Zr), zn = So(ud), Ly = Ie;
var zA;
(function(A) {
  A[A.OK = 200] = "OK", A[A.MultipleChoices = 300] = "MultipleChoices", A[A.MovedPermanently = 301] = "MovedPermanently", A[A.ResourceMoved = 302] = "ResourceMoved", A[A.SeeOther = 303] = "SeeOther", A[A.NotModified = 304] = "NotModified", A[A.UseProxy = 305] = "UseProxy", A[A.SwitchProxy = 306] = "SwitchProxy", A[A.TemporaryRedirect = 307] = "TemporaryRedirect", A[A.PermanentRedirect = 308] = "PermanentRedirect", A[A.BadRequest = 400] = "BadRequest", A[A.Unauthorized = 401] = "Unauthorized", A[A.PaymentRequired = 402] = "PaymentRequired", A[A.Forbidden = 403] = "Forbidden", A[A.NotFound = 404] = "NotFound", A[A.MethodNotAllowed = 405] = "MethodNotAllowed", A[A.NotAcceptable = 406] = "NotAcceptable", A[A.ProxyAuthenticationRequired = 407] = "ProxyAuthenticationRequired", A[A.RequestTimeout = 408] = "RequestTimeout", A[A.Conflict = 409] = "Conflict", A[A.Gone = 410] = "Gone", A[A.TooManyRequests = 429] = "TooManyRequests", A[A.InternalServerError = 500] = "InternalServerError", A[A.NotImplemented = 501] = "NotImplemented", A[A.BadGateway = 502] = "BadGateway", A[A.ServiceUnavailable = 503] = "ServiceUnavailable", A[A.GatewayTimeout = 504] = "GatewayTimeout";
})(zA || (aA.HttpCodes = zA = {}));
var BA;
(function(A) {
  A.Accept = "accept", A.ContentType = "content-type";
})(BA || (aA.Headers = BA = {}));
var bt;
(function(A) {
  A.ApplicationJson = "application/json";
})(bt || (aA.MediaTypes = bt = {}));
function _y(A) {
  const e = qa.getProxyUrl(new URL(A));
  return e ? e.href : "";
}
aA.getProxyUrl = _y;
const vy = [
  zA.MovedPermanently,
  zA.ResourceMoved,
  zA.SeeOther,
  zA.TemporaryRedirect,
  zA.PermanentRedirect
], Gy = [
  zA.BadGateway,
  zA.ServiceUnavailable,
  zA.GatewayTimeout
], My = ["OPTIONS", "GET", "DELETE", "HEAD"], Yy = 10, Py = 5;
class ko extends Error {
  constructor(e, t) {
    super(e), this.name = "HttpClientError", this.statusCode = t, Object.setPrototypeOf(this, ko.prototype);
  }
}
aA.HttpClientError = ko;
class Vh {
  constructor(e) {
    this.message = e;
  }
  readBody() {
    return Xe(this, void 0, void 0, function* () {
      return new Promise((e) => Xe(this, void 0, void 0, function* () {
        let t = Buffer.alloc(0);
        this.message.on("data", (r) => {
          t = Buffer.concat([t, r]);
        }), this.message.on("end", () => {
          e(t.toString());
        });
      }));
    });
  }
  readBodyBuffer() {
    return Xe(this, void 0, void 0, function* () {
      return new Promise((e) => Xe(this, void 0, void 0, function* () {
        const t = [];
        this.message.on("data", (r) => {
          t.push(r);
        }), this.message.on("end", () => {
          e(Buffer.concat(t));
        });
      }));
    });
  }
}
aA.HttpClientResponse = Vh;
function Jy(A) {
  return new URL(A).protocol === "https:";
}
aA.isHttps = Jy;
class Oy {
  constructor(e, t, r) {
    this._ignoreSslError = !1, this._allowRedirects = !0, this._allowRedirectDowngrade = !1, this._maxRedirects = 50, this._allowRetries = !1, this._maxRetries = 1, this._keepAlive = !1, this._disposed = !1, this.userAgent = e, this.handlers = t || [], this.requestOptions = r, r && (r.ignoreSslError != null && (this._ignoreSslError = r.ignoreSslError), this._socketTimeout = r.socketTimeout, r.allowRedirects != null && (this._allowRedirects = r.allowRedirects), r.allowRedirectDowngrade != null && (this._allowRedirectDowngrade = r.allowRedirectDowngrade), r.maxRedirects != null && (this._maxRedirects = Math.max(r.maxRedirects, 0)), r.keepAlive != null && (this._keepAlive = r.keepAlive), r.allowRetries != null && (this._allowRetries = r.allowRetries), r.maxRetries != null && (this._maxRetries = r.maxRetries));
  }
  options(e, t) {
    return Xe(this, void 0, void 0, function* () {
      return this.request("OPTIONS", e, null, t || {});
    });
  }
  get(e, t) {
    return Xe(this, void 0, void 0, function* () {
      return this.request("GET", e, null, t || {});
    });
  }
  del(e, t) {
    return Xe(this, void 0, void 0, function* () {
      return this.request("DELETE", e, null, t || {});
    });
  }
  post(e, t, r) {
    return Xe(this, void 0, void 0, function* () {
      return this.request("POST", e, t, r || {});
    });
  }
  patch(e, t, r) {
    return Xe(this, void 0, void 0, function* () {
      return this.request("PATCH", e, t, r || {});
    });
  }
  put(e, t, r) {
    return Xe(this, void 0, void 0, function* () {
      return this.request("PUT", e, t, r || {});
    });
  }
  head(e, t) {
    return Xe(this, void 0, void 0, function* () {
      return this.request("HEAD", e, null, t || {});
    });
  }
  sendStream(e, t, r, s) {
    return Xe(this, void 0, void 0, function* () {
      return this.request(e, t, r, s);
    });
  }
  /**
   * Gets a typed object from an endpoint
   * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
   */
  getJson(e, t = {}) {
    return Xe(this, void 0, void 0, function* () {
      t[BA.Accept] = this._getExistingOrDefaultHeader(t, BA.Accept, bt.ApplicationJson);
      const r = yield this.get(e, t);
      return this._processResponse(r, this.requestOptions);
    });
  }
  postJson(e, t, r = {}) {
    return Xe(this, void 0, void 0, function* () {
      const s = JSON.stringify(t, null, 2);
      r[BA.Accept] = this._getExistingOrDefaultHeader(r, BA.Accept, bt.ApplicationJson), r[BA.ContentType] = this._getExistingOrDefaultHeader(r, BA.ContentType, bt.ApplicationJson);
      const o = yield this.post(e, s, r);
      return this._processResponse(o, this.requestOptions);
    });
  }
  putJson(e, t, r = {}) {
    return Xe(this, void 0, void 0, function* () {
      const s = JSON.stringify(t, null, 2);
      r[BA.Accept] = this._getExistingOrDefaultHeader(r, BA.Accept, bt.ApplicationJson), r[BA.ContentType] = this._getExistingOrDefaultHeader(r, BA.ContentType, bt.ApplicationJson);
      const o = yield this.put(e, s, r);
      return this._processResponse(o, this.requestOptions);
    });
  }
  patchJson(e, t, r = {}) {
    return Xe(this, void 0, void 0, function* () {
      const s = JSON.stringify(t, null, 2);
      r[BA.Accept] = this._getExistingOrDefaultHeader(r, BA.Accept, bt.ApplicationJson), r[BA.ContentType] = this._getExistingOrDefaultHeader(r, BA.ContentType, bt.ApplicationJson);
      const o = yield this.patch(e, s, r);
      return this._processResponse(o, this.requestOptions);
    });
  }
  /**
   * Makes a raw http request.
   * All other methods such as get, post, patch, and request ultimately call this.
   * Prefer get, del, post and patch
   */
  request(e, t, r, s) {
    return Xe(this, void 0, void 0, function* () {
      if (this._disposed)
        throw new Error("Client has already been disposed.");
      const o = new URL(t);
      let i = this._prepareRequest(e, o, s);
      const c = this._allowRetries && My.includes(e) ? this._maxRetries + 1 : 1;
      let g = 0, u;
      do {
        if (u = yield this.requestRaw(i, r), u && u.message && u.message.statusCode === zA.Unauthorized) {
          let h;
          for (const E of this.handlers)
            if (E.canHandleAuthentication(u)) {
              h = E;
              break;
            }
          return h ? h.handleAuthentication(this, i, r) : u;
        }
        let l = this._maxRedirects;
        for (; u.message.statusCode && vy.includes(u.message.statusCode) && this._allowRedirects && l > 0; ) {
          const h = u.message.headers.location;
          if (!h)
            break;
          const E = new URL(h);
          if (o.protocol === "https:" && o.protocol !== E.protocol && !this._allowRedirectDowngrade)
            throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
          if (yield u.readBody(), E.hostname !== o.hostname)
            for (const f in s)
              f.toLowerCase() === "authorization" && delete s[f];
          i = this._prepareRequest(e, E, s), u = yield this.requestRaw(i, r), l--;
        }
        if (!u.message.statusCode || !Gy.includes(u.message.statusCode))
          return u;
        g += 1, g < c && (yield u.readBody(), yield this._performExponentialBackoff(g));
      } while (g < c);
      return u;
    });
  }
  /**
   * Needs to be called if keepAlive is set to true in request options.
   */
  dispose() {
    this._agent && this._agent.destroy(), this._disposed = !0;
  }
  /**
   * Raw request.
   * @param info
   * @param data
   */
  requestRaw(e, t) {
    return Xe(this, void 0, void 0, function* () {
      return new Promise((r, s) => {
        function o(i, c) {
          i ? s(i) : c ? r(c) : s(new Error("Unknown error"));
        }
        this.requestRawWithCallback(e, t, o);
      });
    });
  }
  /**
   * Raw request with callback.
   * @param info
   * @param data
   * @param onResult
   */
  requestRawWithCallback(e, t, r) {
    typeof t == "string" && (e.options.headers || (e.options.headers = {}), e.options.headers["Content-Length"] = Buffer.byteLength(t, "utf8"));
    let s = !1;
    function o(g, u) {
      s || (s = !0, r(g, u));
    }
    const i = e.httpModule.request(e.options, (g) => {
      const u = new Vh(g);
      o(void 0, u);
    });
    let c;
    i.on("socket", (g) => {
      c = g;
    }), i.setTimeout(this._socketTimeout || 3 * 6e4, () => {
      c && c.end(), o(new Error(`Request timeout: ${e.options.path}`));
    }), i.on("error", function(g) {
      o(g);
    }), t && typeof t == "string" && i.write(t, "utf8"), t && typeof t != "string" ? (t.on("close", function() {
      i.end();
    }), t.pipe(i)) : i.end();
  }
  /**
   * Gets an http agent. This function is useful when you need an http agent that handles
   * routing through a proxy server - depending upon the url and proxy environment variables.
   * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
   */
  getAgent(e) {
    const t = new URL(e);
    return this._getAgent(t);
  }
  getAgentDispatcher(e) {
    const t = new URL(e), r = qa.getProxyUrl(t);
    if (r && r.hostname)
      return this._getProxyAgentDispatcher(t, r);
  }
  _prepareRequest(e, t, r) {
    const s = {};
    s.parsedUrl = t;
    const o = s.parsedUrl.protocol === "https:";
    s.httpModule = o ? ma : jn;
    const i = o ? 443 : 80;
    if (s.options = {}, s.options.host = s.parsedUrl.hostname, s.options.port = s.parsedUrl.port ? parseInt(s.parsedUrl.port) : i, s.options.path = (s.parsedUrl.pathname || "") + (s.parsedUrl.search || ""), s.options.method = e, s.options.headers = this._mergeHeaders(r), this.userAgent != null && (s.options.headers["user-agent"] = this.userAgent), s.options.agent = this._getAgent(s.parsedUrl), this.handlers)
      for (const c of this.handlers)
        c.prepareRequest(s.options);
    return s;
  }
  _mergeHeaders(e) {
    return this.requestOptions && this.requestOptions.headers ? Object.assign({}, Zn(this.requestOptions.headers), Zn(e || {})) : Zn(e || {});
  }
  _getExistingOrDefaultHeader(e, t, r) {
    let s;
    return this.requestOptions && this.requestOptions.headers && (s = Zn(this.requestOptions.headers)[t]), e[t] || s || r;
  }
  _getAgent(e) {
    let t;
    const r = qa.getProxyUrl(e), s = r && r.hostname;
    if (this._keepAlive && s && (t = this._proxyAgent), this._keepAlive && !s && (t = this._agent), t)
      return t;
    const o = e.protocol === "https:";
    let i = 100;
    if (this.requestOptions && (i = this.requestOptions.maxSockets || jn.globalAgent.maxSockets), r && r.hostname) {
      const c = {
        maxSockets: i,
        keepAlive: this._keepAlive,
        proxy: Object.assign(Object.assign({}, (r.username || r.password) && {
          proxyAuth: `${r.username}:${r.password}`
        }), { host: r.hostname, port: r.port })
      };
      let g;
      const u = r.protocol === "https:";
      o ? g = u ? zn.httpsOverHttps : zn.httpsOverHttp : g = u ? zn.httpOverHttps : zn.httpOverHttp, t = g(c), this._proxyAgent = t;
    }
    if (this._keepAlive && !t) {
      const c = { keepAlive: this._keepAlive, maxSockets: i };
      t = o ? new ma.Agent(c) : new jn.Agent(c), this._agent = t;
    }
    return t || (t = o ? ma.globalAgent : jn.globalAgent), o && this._ignoreSslError && (t.options = Object.assign(t.options || {}, {
      rejectUnauthorized: !1
    })), t;
  }
  _getProxyAgentDispatcher(e, t) {
    let r;
    if (this._keepAlive && (r = this._proxyAgentDispatcher), r)
      return r;
    const s = e.protocol === "https:";
    return r = new Ly.ProxyAgent(Object.assign({ uri: t.href, pipelining: this._keepAlive ? 1 : 0 }, (t.username || t.password) && {
      token: `${t.username}:${t.password}`
    })), this._proxyAgentDispatcher = r, s && this._ignoreSslError && (r.options = Object.assign(r.options.requestTls || {}, {
      rejectUnauthorized: !1
    })), r;
  }
  _performExponentialBackoff(e) {
    return Xe(this, void 0, void 0, function* () {
      e = Math.min(Yy, e);
      const t = Py * Math.pow(2, e);
      return new Promise((r) => setTimeout(() => r(), t));
    });
  }
  _processResponse(e, t) {
    return Xe(this, void 0, void 0, function* () {
      return new Promise((r, s) => Xe(this, void 0, void 0, function* () {
        const o = e.message.statusCode || 0, i = {
          statusCode: o,
          result: null,
          headers: {}
        };
        o === zA.NotFound && r(i);
        function c(l, h) {
          if (typeof h == "string") {
            const E = new Date(h);
            if (!isNaN(E.valueOf()))
              return E;
          }
          return h;
        }
        let g, u;
        try {
          u = yield e.readBody(), u && u.length > 0 && (t && t.deserializeDates ? g = JSON.parse(u, c) : g = JSON.parse(u), i.result = g), i.headers = e.message.headers;
        } catch {
        }
        if (o > 299) {
          let l;
          g && g.message ? l = g.message : u && u.length > 0 ? l = u : l = `Failed request: (${o})`;
          const h = new ko(l, o);
          h.result = i.result, s(h);
        } else
          r(i);
      }));
    });
  }
}
aA.HttpClient = Oy;
const Zn = (A) => Object.keys(A).reduce((e, t) => (e[t.toLowerCase()] = A[t], e), {});
var zt = {}, dc = H && H.__awaiter || function(A, e, t, r) {
  function s(o) {
    return o instanceof t ? o : new t(function(i) {
      i(o);
    });
  }
  return new (t || (t = Promise))(function(o, i) {
    function c(l) {
      try {
        u(r.next(l));
      } catch (h) {
        i(h);
      }
    }
    function g(l) {
      try {
        u(r.throw(l));
      } catch (h) {
        i(h);
      }
    }
    function u(l) {
      l.done ? o(l.value) : s(l.value).then(c, g);
    }
    u((r = r.apply(A, e || [])).next());
  });
};
Object.defineProperty(zt, "__esModule", { value: !0 });
zt.PersonalAccessTokenCredentialHandler = zt.BearerCredentialHandler = zt.BasicCredentialHandler = void 0;
class Hy {
  constructor(e, t) {
    this.username = e, this.password = t;
  }
  prepareRequest(e) {
    if (!e.headers)
      throw Error("The request has no headers");
    e.headers.Authorization = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`;
  }
  // This handler cannot handle 401
  canHandleAuthentication() {
    return !1;
  }
  handleAuthentication() {
    return dc(this, void 0, void 0, function* () {
      throw new Error("not implemented");
    });
  }
}
zt.BasicCredentialHandler = Hy;
class Vy {
  constructor(e) {
    this.token = e;
  }
  // currently implements pre-authorization
  // TODO: support preAuth = false where it hooks on 401
  prepareRequest(e) {
    if (!e.headers)
      throw Error("The request has no headers");
    e.headers.Authorization = `Bearer ${this.token}`;
  }
  // This handler cannot handle 401
  canHandleAuthentication() {
    return !1;
  }
  handleAuthentication() {
    return dc(this, void 0, void 0, function* () {
      throw new Error("not implemented");
    });
  }
}
zt.BearerCredentialHandler = Vy;
class Wy {
  constructor(e) {
    this.token = e;
  }
  // currently implements pre-authorization
  // TODO: support preAuth = false where it hooks on 401
  prepareRequest(e) {
    if (!e.headers)
      throw Error("The request has no headers");
    e.headers.Authorization = `Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`;
  }
  // This handler cannot handle 401
  canHandleAuthentication() {
    return !1;
  }
  handleAuthentication() {
    return dc(this, void 0, void 0, function* () {
      throw new Error("not implemented");
    });
  }
}
zt.PersonalAccessTokenCredentialHandler = Wy;
var Iu;
function qy() {
  if (Iu) return ms;
  Iu = 1;
  var A = H && H.__awaiter || function(o, i, c, g) {
    function u(l) {
      return l instanceof c ? l : new c(function(h) {
        h(l);
      });
    }
    return new (c || (c = Promise))(function(l, h) {
      function E(C) {
        try {
          I(g.next(C));
        } catch (B) {
          h(B);
        }
      }
      function f(C) {
        try {
          I(g.throw(C));
        } catch (B) {
          h(B);
        }
      }
      function I(C) {
        C.done ? l(C.value) : u(C.value).then(E, f);
      }
      I((g = g.apply(o, i || [])).next());
    });
  };
  Object.defineProperty(ms, "__esModule", { value: !0 }), ms.OidcClient = void 0;
  const e = aA, t = zt, r = qh();
  class s {
    static createHttpClient(i = !0, c = 10) {
      const g = {
        allowRetries: i,
        maxRetries: c
      };
      return new e.HttpClient("actions/oidc-client", [new t.BearerCredentialHandler(s.getRequestToken())], g);
    }
    static getRequestToken() {
      const i = process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;
      if (!i)
        throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
      return i;
    }
    static getIDTokenUrl() {
      const i = process.env.ACTIONS_ID_TOKEN_REQUEST_URL;
      if (!i)
        throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
      return i;
    }
    static getCall(i) {
      var c;
      return A(this, void 0, void 0, function* () {
        const l = (c = (yield s.createHttpClient().getJson(i).catch((h) => {
          throw new Error(`Failed to get ID Token. 
 
        Error Code : ${h.statusCode}
 
        Error Message: ${h.message}`);
        })).result) === null || c === void 0 ? void 0 : c.value;
        if (!l)
          throw new Error("Response json body do not have ID Token field");
        return l;
      });
    }
    static getIDToken(i) {
      return A(this, void 0, void 0, function* () {
        try {
          let c = s.getIDTokenUrl();
          if (i) {
            const u = encodeURIComponent(i);
            c = `${c}&audience=${u}`;
          }
          (0, r.debug)(`ID token url is ${c}`);
          const g = yield s.getCall(c);
          return (0, r.setSecret)(g), g;
        } catch (c) {
          throw new Error(`Error message: ${c.message}`);
        }
      });
    }
  }
  return ms.OidcClient = s, ms;
}
var ya = {}, fu;
function pu() {
  return fu || (fu = 1, function(A) {
    var e = H && H.__awaiter || function(u, l, h, E) {
      function f(I) {
        return I instanceof h ? I : new h(function(C) {
          C(I);
        });
      }
      return new (h || (h = Promise))(function(I, C) {
        function B(m) {
          try {
            Q(E.next(m));
          } catch (w) {
            C(w);
          }
        }
        function p(m) {
          try {
            Q(E.throw(m));
          } catch (w) {
            C(w);
          }
        }
        function Q(m) {
          m.done ? I(m.value) : f(m.value).then(B, p);
        }
        Q((E = E.apply(u, l || [])).next());
      });
    };
    Object.defineProperty(A, "__esModule", { value: !0 }), A.summary = A.markdownSummary = A.SUMMARY_DOCS_URL = A.SUMMARY_ENV_VAR = void 0;
    const t = G, r = G, { access: s, appendFile: o, writeFile: i } = r.promises;
    A.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY", A.SUMMARY_DOCS_URL = "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";
    class c {
      constructor() {
        this._buffer = "";
      }
      /**
       * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
       * Also checks r/w permissions.
       *
       * @returns step summary file path
       */
      filePath() {
        return e(this, void 0, void 0, function* () {
          if (this._filePath)
            return this._filePath;
          const l = process.env[A.SUMMARY_ENV_VAR];
          if (!l)
            throw new Error(`Unable to find environment variable for $${A.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
          try {
            yield s(l, r.constants.R_OK | r.constants.W_OK);
          } catch {
            throw new Error(`Unable to access summary file: '${l}'. Check if the file has correct read/write permissions.`);
          }
          return this._filePath = l, this._filePath;
        });
      }
      /**
       * Wraps content in an HTML tag, adding any HTML attributes
       *
       * @param {string} tag HTML tag to wrap
       * @param {string | null} content content within the tag
       * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
       *
       * @returns {string} content wrapped in HTML element
       */
      wrap(l, h, E = {}) {
        const f = Object.entries(E).map(([I, C]) => ` ${I}="${C}"`).join("");
        return h ? `<${l}${f}>${h}</${l}>` : `<${l}${f}>`;
      }
      /**
       * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
       *
       * @param {SummaryWriteOptions} [options] (optional) options for write operation
       *
       * @returns {Promise<Summary>} summary instance
       */
      write(l) {
        return e(this, void 0, void 0, function* () {
          const h = !!l?.overwrite, E = yield this.filePath();
          return yield (h ? i : o)(E, this._buffer, { encoding: "utf8" }), this.emptyBuffer();
        });
      }
      /**
       * Clears the summary buffer and wipes the summary file
       *
       * @returns {Summary} summary instance
       */
      clear() {
        return e(this, void 0, void 0, function* () {
          return this.emptyBuffer().write({ overwrite: !0 });
        });
      }
      /**
       * Returns the current summary buffer as a string
       *
       * @returns {string} string of summary buffer
       */
      stringify() {
        return this._buffer;
      }
      /**
       * If the summary buffer is empty
       *
       * @returns {boolen} true if the buffer is empty
       */
      isEmptyBuffer() {
        return this._buffer.length === 0;
      }
      /**
       * Resets the summary buffer without writing to summary file
       *
       * @returns {Summary} summary instance
       */
      emptyBuffer() {
        return this._buffer = "", this;
      }
      /**
       * Adds raw text to the summary buffer
       *
       * @param {string} text content to add
       * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
       *
       * @returns {Summary} summary instance
       */
      addRaw(l, h = !1) {
        return this._buffer += l, h ? this.addEOL() : this;
      }
      /**
       * Adds the operating system-specific end-of-line marker to the buffer
       *
       * @returns {Summary} summary instance
       */
      addEOL() {
        return this.addRaw(t.EOL);
      }
      /**
       * Adds an HTML codeblock to the summary buffer
       *
       * @param {string} code content to render within fenced code block
       * @param {string} lang (optional) language to syntax highlight code
       *
       * @returns {Summary} summary instance
       */
      addCodeBlock(l, h) {
        const E = Object.assign({}, h && { lang: h }), f = this.wrap("pre", this.wrap("code", l), E);
        return this.addRaw(f).addEOL();
      }
      /**
       * Adds an HTML list to the summary buffer
       *
       * @param {string[]} items list of items to render
       * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
       *
       * @returns {Summary} summary instance
       */
      addList(l, h = !1) {
        const E = h ? "ol" : "ul", f = l.map((C) => this.wrap("li", C)).join(""), I = this.wrap(E, f);
        return this.addRaw(I).addEOL();
      }
      /**
       * Adds an HTML table to the summary buffer
       *
       * @param {SummaryTableCell[]} rows table rows
       *
       * @returns {Summary} summary instance
       */
      addTable(l) {
        const h = l.map((f) => {
          const I = f.map((C) => {
            if (typeof C == "string")
              return this.wrap("td", C);
            const { header: B, data: p, colspan: Q, rowspan: m } = C, w = B ? "th" : "td", y = Object.assign(Object.assign({}, Q && { colspan: Q }), m && { rowspan: m });
            return this.wrap(w, p, y);
          }).join("");
          return this.wrap("tr", I);
        }).join(""), E = this.wrap("table", h);
        return this.addRaw(E).addEOL();
      }
      /**
       * Adds a collapsable HTML details element to the summary buffer
       *
       * @param {string} label text for the closed state
       * @param {string} content collapsable content
       *
       * @returns {Summary} summary instance
       */
      addDetails(l, h) {
        const E = this.wrap("details", this.wrap("summary", l) + h);
        return this.addRaw(E).addEOL();
      }
      /**
       * Adds an HTML image tag to the summary buffer
       *
       * @param {string} src path to the image you to embed
       * @param {string} alt text description of the image
       * @param {SummaryImageOptions} options (optional) addition image attributes
       *
       * @returns {Summary} summary instance
       */
      addImage(l, h, E) {
        const { width: f, height: I } = E || {}, C = Object.assign(Object.assign({}, f && { width: f }), I && { height: I }), B = this.wrap("img", null, Object.assign({ src: l, alt: h }, C));
        return this.addRaw(B).addEOL();
      }
      /**
       * Adds an HTML section heading element
       *
       * @param {string} text heading text
       * @param {number | string} [level=1] (optional) the heading level, default: 1
       *
       * @returns {Summary} summary instance
       */
      addHeading(l, h) {
        const E = `h${h}`, f = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(E) ? E : "h1", I = this.wrap(f, l);
        return this.addRaw(I).addEOL();
      }
      /**
       * Adds an HTML thematic break (<hr>) to the summary buffer
       *
       * @returns {Summary} summary instance
       */
      addSeparator() {
        const l = this.wrap("hr", null);
        return this.addRaw(l).addEOL();
      }
      /**
       * Adds an HTML line break (<br>) to the summary buffer
       *
       * @returns {Summary} summary instance
       */
      addBreak() {
        const l = this.wrap("br", null);
        return this.addRaw(l).addEOL();
      }
      /**
       * Adds an HTML blockquote to the summary buffer
       *
       * @param {string} text quote text
       * @param {string} cite (optional) citation url
       *
       * @returns {Summary} summary instance
       */
      addQuote(l, h) {
        const E = Object.assign({}, h && { cite: h }), f = this.wrap("blockquote", l, E);
        return this.addRaw(f).addEOL();
      }
      /**
       * Adds an HTML anchor tag to the summary buffer
       *
       * @param {string} text link text/content
       * @param {string} href hyperlink
       *
       * @returns {Summary} summary instance
       */
      addLink(l, h) {
        const E = this.wrap("a", l, { href: h });
        return this.addRaw(E).addEOL();
      }
    }
    const g = new c();
    A.markdownSummary = g, A.summary = g;
  }(ya)), ya;
}
var wt = {}, mu;
function xy() {
  if (mu) return wt;
  mu = 1;
  var A = H && H.__createBinding || (Object.create ? function(c, g, u, l) {
    l === void 0 && (l = u);
    var h = Object.getOwnPropertyDescriptor(g, u);
    (!h || ("get" in h ? !g.__esModule : h.writable || h.configurable)) && (h = { enumerable: !0, get: function() {
      return g[u];
    } }), Object.defineProperty(c, l, h);
  } : function(c, g, u, l) {
    l === void 0 && (l = u), c[l] = g[u];
  }), e = H && H.__setModuleDefault || (Object.create ? function(c, g) {
    Object.defineProperty(c, "default", { enumerable: !0, value: g });
  } : function(c, g) {
    c.default = g;
  }), t = H && H.__importStar || function(c) {
    if (c && c.__esModule) return c;
    var g = {};
    if (c != null) for (var u in c) u !== "default" && Object.prototype.hasOwnProperty.call(c, u) && A(g, c, u);
    return e(g, c), g;
  };
  Object.defineProperty(wt, "__esModule", { value: !0 }), wt.toPlatformPath = wt.toWin32Path = wt.toPosixPath = void 0;
  const r = t(G);
  function s(c) {
    return c.replace(/[\\]/g, "/");
  }
  wt.toPosixPath = s;
  function o(c) {
    return c.replace(/[/]/g, "\\");
  }
  wt.toWin32Path = o;
  function i(c) {
    return c.replace(/[/\\]/g, r.sep);
  }
  return wt.toPlatformPath = i, wt;
}
var wa = {}, lr = {}, ur = {}, yA = {}, ba = {}, yu;
function Wh() {
  return yu || (yu = 1, function(A) {
    var e = H && H.__createBinding || (Object.create ? function(C, B, p, Q) {
      Q === void 0 && (Q = p), Object.defineProperty(C, Q, { enumerable: !0, get: function() {
        return B[p];
      } });
    } : function(C, B, p, Q) {
      Q === void 0 && (Q = p), C[Q] = B[p];
    }), t = H && H.__setModuleDefault || (Object.create ? function(C, B) {
      Object.defineProperty(C, "default", { enumerable: !0, value: B });
    } : function(C, B) {
      C.default = B;
    }), r = H && H.__importStar || function(C) {
      if (C && C.__esModule) return C;
      var B = {};
      if (C != null) for (var p in C) p !== "default" && Object.hasOwnProperty.call(C, p) && e(B, C, p);
      return t(B, C), B;
    }, s = H && H.__awaiter || function(C, B, p, Q) {
      function m(w) {
        return w instanceof p ? w : new p(function(y) {
          y(w);
        });
      }
      return new (p || (p = Promise))(function(w, y) {
        function b(N) {
          try {
            D(Q.next(N));
          } catch (v) {
            y(v);
          }
        }
        function S(N) {
          try {
            D(Q.throw(N));
          } catch (v) {
            y(v);
          }
        }
        function D(N) {
          N.done ? w(N.value) : m(N.value).then(b, S);
        }
        D((Q = Q.apply(C, B || [])).next());
      });
    }, o;
    Object.defineProperty(A, "__esModule", { value: !0 }), A.getCmdPath = A.tryGetExecutablePath = A.isRooted = A.isDirectory = A.exists = A.READONLY = A.UV_FS_O_EXLOCK = A.IS_WINDOWS = A.unlink = A.symlink = A.stat = A.rmdir = A.rm = A.rename = A.readlink = A.readdir = A.open = A.mkdir = A.lstat = A.copyFile = A.chmod = void 0;
    const i = r(G), c = r(G);
    o = i.promises, A.chmod = o.chmod, A.copyFile = o.copyFile, A.lstat = o.lstat, A.mkdir = o.mkdir, A.open = o.open, A.readdir = o.readdir, A.readlink = o.readlink, A.rename = o.rename, A.rm = o.rm, A.rmdir = o.rmdir, A.stat = o.stat, A.symlink = o.symlink, A.unlink = o.unlink, A.IS_WINDOWS = process.platform === "win32", A.UV_FS_O_EXLOCK = 268435456, A.READONLY = i.constants.O_RDONLY;
    function g(C) {
      return s(this, void 0, void 0, function* () {
        try {
          yield A.stat(C);
        } catch (B) {
          if (B.code === "ENOENT")
            return !1;
          throw B;
        }
        return !0;
      });
    }
    A.exists = g;
    function u(C, B = !1) {
      return s(this, void 0, void 0, function* () {
        return (B ? yield A.stat(C) : yield A.lstat(C)).isDirectory();
      });
    }
    A.isDirectory = u;
    function l(C) {
      if (C = E(C), !C)
        throw new Error('isRooted() parameter "p" cannot be empty');
      return A.IS_WINDOWS ? C.startsWith("\\") || /^[A-Z]:/i.test(C) : C.startsWith("/");
    }
    A.isRooted = l;
    function h(C, B) {
      return s(this, void 0, void 0, function* () {
        let p;
        try {
          p = yield A.stat(C);
        } catch (m) {
          m.code !== "ENOENT" && console.log(`Unexpected error attempting to determine if executable file exists '${C}': ${m}`);
        }
        if (p && p.isFile()) {
          if (A.IS_WINDOWS) {
            const m = c.extname(C).toUpperCase();
            if (B.some((w) => w.toUpperCase() === m))
              return C;
          } else if (f(p))
            return C;
        }
        const Q = C;
        for (const m of B) {
          C = Q + m, p = void 0;
          try {
            p = yield A.stat(C);
          } catch (w) {
            w.code !== "ENOENT" && console.log(`Unexpected error attempting to determine if executable file exists '${C}': ${w}`);
          }
          if (p && p.isFile()) {
            if (A.IS_WINDOWS) {
              try {
                const w = c.dirname(C), y = c.basename(C).toUpperCase();
                for (const b of yield A.readdir(w))
                  if (y === b.toUpperCase()) {
                    C = c.join(w, b);
                    break;
                  }
              } catch (w) {
                console.log(`Unexpected error attempting to determine the actual case of the file '${C}': ${w}`);
              }
              return C;
            } else if (f(p))
              return C;
          }
        }
        return "";
      });
    }
    A.tryGetExecutablePath = h;
    function E(C) {
      return C = C || "", A.IS_WINDOWS ? (C = C.replace(/\//g, "\\"), C.replace(/\\\\+/g, "\\")) : C.replace(/\/\/+/g, "/");
    }
    function f(C) {
      return (C.mode & 1) > 0 || (C.mode & 8) > 0 && C.gid === process.getgid() || (C.mode & 64) > 0 && C.uid === process.getuid();
    }
    function I() {
      var C;
      return (C = process.env.COMSPEC) !== null && C !== void 0 ? C : "cmd.exe";
    }
    A.getCmdPath = I;
  }(ba)), ba;
}
var wu;
function jy() {
  if (wu) return yA;
  wu = 1;
  var A = H && H.__createBinding || (Object.create ? function(B, p, Q, m) {
    m === void 0 && (m = Q), Object.defineProperty(B, m, { enumerable: !0, get: function() {
      return p[Q];
    } });
  } : function(B, p, Q, m) {
    m === void 0 && (m = Q), B[m] = p[Q];
  }), e = H && H.__setModuleDefault || (Object.create ? function(B, p) {
    Object.defineProperty(B, "default", { enumerable: !0, value: p });
  } : function(B, p) {
    B.default = p;
  }), t = H && H.__importStar || function(B) {
    if (B && B.__esModule) return B;
    var p = {};
    if (B != null) for (var Q in B) Q !== "default" && Object.hasOwnProperty.call(B, Q) && A(p, B, Q);
    return e(p, B), p;
  }, r = H && H.__awaiter || function(B, p, Q, m) {
    function w(y) {
      return y instanceof Q ? y : new Q(function(b) {
        b(y);
      });
    }
    return new (Q || (Q = Promise))(function(y, b) {
      function S(v) {
        try {
          N(m.next(v));
        } catch (_) {
          b(_);
        }
      }
      function D(v) {
        try {
          N(m.throw(v));
        } catch (_) {
          b(_);
        }
      }
      function N(v) {
        v.done ? y(v.value) : w(v.value).then(S, D);
      }
      N((m = m.apply(B, p || [])).next());
    });
  };
  Object.defineProperty(yA, "__esModule", { value: !0 }), yA.findInPath = yA.which = yA.mkdirP = yA.rmRF = yA.mv = yA.cp = void 0;
  const s = G, o = t(G), i = t(Wh());
  function c(B, p, Q = {}) {
    return r(this, void 0, void 0, function* () {
      const { force: m, recursive: w, copySourceDirectory: y } = f(Q), b = (yield i.exists(p)) ? yield i.stat(p) : null;
      if (b && b.isFile() && !m)
        return;
      const S = b && b.isDirectory() && y ? o.join(p, o.basename(B)) : p;
      if (!(yield i.exists(B)))
        throw new Error(`no such file or directory: ${B}`);
      if ((yield i.stat(B)).isDirectory())
        if (w)
          yield I(B, S, 0, m);
        else
          throw new Error(`Failed to copy. ${B} is a directory, but tried to copy without recursive flag.`);
      else {
        if (o.relative(B, S) === "")
          throw new Error(`'${S}' and '${B}' are the same file`);
        yield C(B, S, m);
      }
    });
  }
  yA.cp = c;
  function g(B, p, Q = {}) {
    return r(this, void 0, void 0, function* () {
      if (yield i.exists(p)) {
        let m = !0;
        if ((yield i.isDirectory(p)) && (p = o.join(p, o.basename(B)), m = yield i.exists(p)), m)
          if (Q.force == null || Q.force)
            yield u(p);
          else
            throw new Error("Destination already exists");
      }
      yield l(o.dirname(p)), yield i.rename(B, p);
    });
  }
  yA.mv = g;
  function u(B) {
    return r(this, void 0, void 0, function* () {
      if (i.IS_WINDOWS && /[*"<>|]/.test(B))
        throw new Error('File path must not contain `*`, `"`, `<`, `>` or `|` on Windows');
      try {
        yield i.rm(B, {
          force: !0,
          maxRetries: 3,
          recursive: !0,
          retryDelay: 300
        });
      } catch (p) {
        throw new Error(`File was unable to be removed ${p}`);
      }
    });
  }
  yA.rmRF = u;
  function l(B) {
    return r(this, void 0, void 0, function* () {
      s.ok(B, "a path argument must be provided"), yield i.mkdir(B, { recursive: !0 });
    });
  }
  yA.mkdirP = l;
  function h(B, p) {
    return r(this, void 0, void 0, function* () {
      if (!B)
        throw new Error("parameter 'tool' is required");
      if (p) {
        const m = yield h(B, !1);
        if (!m)
          throw i.IS_WINDOWS ? new Error(`Unable to locate executable file: ${B}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`) : new Error(`Unable to locate executable file: ${B}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
        return m;
      }
      const Q = yield E(B);
      return Q && Q.length > 0 ? Q[0] : "";
    });
  }
  yA.which = h;
  function E(B) {
    return r(this, void 0, void 0, function* () {
      if (!B)
        throw new Error("parameter 'tool' is required");
      const p = [];
      if (i.IS_WINDOWS && process.env.PATHEXT)
        for (const w of process.env.PATHEXT.split(o.delimiter))
          w && p.push(w);
      if (i.isRooted(B)) {
        const w = yield i.tryGetExecutablePath(B, p);
        return w ? [w] : [];
      }
      if (B.includes(o.sep))
        return [];
      const Q = [];
      if (process.env.PATH)
        for (const w of process.env.PATH.split(o.delimiter))
          w && Q.push(w);
      const m = [];
      for (const w of Q) {
        const y = yield i.tryGetExecutablePath(o.join(w, B), p);
        y && m.push(y);
      }
      return m;
    });
  }
  yA.findInPath = E;
  function f(B) {
    const p = B.force == null ? !0 : B.force, Q = !!B.recursive, m = B.copySourceDirectory == null ? !0 : !!B.copySourceDirectory;
    return { force: p, recursive: Q, copySourceDirectory: m };
  }
  function I(B, p, Q, m) {
    return r(this, void 0, void 0, function* () {
      if (Q >= 255)
        return;
      Q++, yield l(p);
      const w = yield i.readdir(B);
      for (const y of w) {
        const b = `${B}/${y}`, S = `${p}/${y}`;
        (yield i.lstat(b)).isDirectory() ? yield I(b, S, Q, m) : yield C(b, S, m);
      }
      yield i.chmod(p, (yield i.stat(B)).mode);
    });
  }
  function C(B, p, Q) {
    return r(this, void 0, void 0, function* () {
      if ((yield i.lstat(B)).isSymbolicLink()) {
        try {
          yield i.lstat(p), yield i.unlink(p);
        } catch (w) {
          w.code === "EPERM" && (yield i.chmod(p, "0666"), yield i.unlink(p));
        }
        const m = yield i.readlink(B);
        yield i.symlink(m, p, i.IS_WINDOWS ? "junction" : null);
      } else (!(yield i.exists(p)) || Q) && (yield i.copyFile(B, p));
    });
  }
  return yA;
}
var bu;
function zy() {
  if (bu) return ur;
  bu = 1;
  var A = H && H.__createBinding || (Object.create ? function(C, B, p, Q) {
    Q === void 0 && (Q = p), Object.defineProperty(C, Q, { enumerable: !0, get: function() {
      return B[p];
    } });
  } : function(C, B, p, Q) {
    Q === void 0 && (Q = p), C[Q] = B[p];
  }), e = H && H.__setModuleDefault || (Object.create ? function(C, B) {
    Object.defineProperty(C, "default", { enumerable: !0, value: B });
  } : function(C, B) {
    C.default = B;
  }), t = H && H.__importStar || function(C) {
    if (C && C.__esModule) return C;
    var B = {};
    if (C != null) for (var p in C) p !== "default" && Object.hasOwnProperty.call(C, p) && A(B, C, p);
    return e(B, C), B;
  }, r = H && H.__awaiter || function(C, B, p, Q) {
    function m(w) {
      return w instanceof p ? w : new p(function(y) {
        y(w);
      });
    }
    return new (p || (p = Promise))(function(w, y) {
      function b(N) {
        try {
          D(Q.next(N));
        } catch (v) {
          y(v);
        }
      }
      function S(N) {
        try {
          D(Q.throw(N));
        } catch (v) {
          y(v);
        }
      }
      function D(N) {
        N.done ? w(N.value) : m(N.value).then(b, S);
      }
      D((Q = Q.apply(C, B || [])).next());
    });
  };
  Object.defineProperty(ur, "__esModule", { value: !0 }), ur.argStringToArray = ur.ToolRunner = void 0;
  const s = t(G), o = t(G), i = t(G), c = t(G), g = t(jy()), u = t(Wh()), l = G, h = process.platform === "win32";
  class E extends o.EventEmitter {
    constructor(B, p, Q) {
      if (super(), !B)
        throw new Error("Parameter 'toolPath' cannot be null or empty.");
      this.toolPath = B, this.args = p || [], this.options = Q || {};
    }
    _debug(B) {
      this.options.listeners && this.options.listeners.debug && this.options.listeners.debug(B);
    }
    _getCommandString(B, p) {
      const Q = this._getSpawnFileName(), m = this._getSpawnArgs(B);
      let w = p ? "" : "[command]";
      if (h)
        if (this._isCmdFile()) {
          w += Q;
          for (const y of m)
            w += ` ${y}`;
        } else if (B.windowsVerbatimArguments) {
          w += `"${Q}"`;
          for (const y of m)
            w += ` ${y}`;
        } else {
          w += this._windowsQuoteCmdArg(Q);
          for (const y of m)
            w += ` ${this._windowsQuoteCmdArg(y)}`;
        }
      else {
        w += Q;
        for (const y of m)
          w += ` ${y}`;
      }
      return w;
    }
    _processLineBuffer(B, p, Q) {
      try {
        let m = p + B.toString(), w = m.indexOf(s.EOL);
        for (; w > -1; ) {
          const y = m.substring(0, w);
          Q(y), m = m.substring(w + s.EOL.length), w = m.indexOf(s.EOL);
        }
        return m;
      } catch (m) {
        return this._debug(`error processing line. Failed with error ${m}`), "";
      }
    }
    _getSpawnFileName() {
      return h && this._isCmdFile() ? process.env.COMSPEC || "cmd.exe" : this.toolPath;
    }
    _getSpawnArgs(B) {
      if (h && this._isCmdFile()) {
        let p = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
        for (const Q of this.args)
          p += " ", p += B.windowsVerbatimArguments ? Q : this._windowsQuoteCmdArg(Q);
        return p += '"', [p];
      }
      return this.args;
    }
    _endsWith(B, p) {
      return B.endsWith(p);
    }
    _isCmdFile() {
      const B = this.toolPath.toUpperCase();
      return this._endsWith(B, ".CMD") || this._endsWith(B, ".BAT");
    }
    _windowsQuoteCmdArg(B) {
      if (!this._isCmdFile())
        return this._uvQuoteCmdArg(B);
      if (!B)
        return '""';
      const p = [
        " ",
        "	",
        "&",
        "(",
        ")",
        "[",
        "]",
        "{",
        "}",
        "^",
        "=",
        ";",
        "!",
        "'",
        "+",
        ",",
        "`",
        "~",
        "|",
        "<",
        ">",
        '"'
      ];
      let Q = !1;
      for (const y of B)
        if (p.some((b) => b === y)) {
          Q = !0;
          break;
        }
      if (!Q)
        return B;
      let m = '"', w = !0;
      for (let y = B.length; y > 0; y--)
        m += B[y - 1], w && B[y - 1] === "\\" ? m += "\\" : B[y - 1] === '"' ? (w = !0, m += '"') : w = !1;
      return m += '"', m.split("").reverse().join("");
    }
    _uvQuoteCmdArg(B) {
      if (!B)
        return '""';
      if (!B.includes(" ") && !B.includes("	") && !B.includes('"'))
        return B;
      if (!B.includes('"') && !B.includes("\\"))
        return `"${B}"`;
      let p = '"', Q = !0;
      for (let m = B.length; m > 0; m--)
        p += B[m - 1], Q && B[m - 1] === "\\" ? p += "\\" : B[m - 1] === '"' ? (Q = !0, p += "\\") : Q = !1;
      return p += '"', p.split("").reverse().join("");
    }
    _cloneExecOptions(B) {
      B = B || {};
      const p = {
        cwd: B.cwd || process.cwd(),
        env: B.env || process.env,
        silent: B.silent || !1,
        windowsVerbatimArguments: B.windowsVerbatimArguments || !1,
        failOnStdErr: B.failOnStdErr || !1,
        ignoreReturnCode: B.ignoreReturnCode || !1,
        delay: B.delay || 1e4
      };
      return p.outStream = B.outStream || process.stdout, p.errStream = B.errStream || process.stderr, p;
    }
    _getSpawnOptions(B, p) {
      B = B || {};
      const Q = {};
      return Q.cwd = B.cwd, Q.env = B.env, Q.windowsVerbatimArguments = B.windowsVerbatimArguments || this._isCmdFile(), B.windowsVerbatimArguments && (Q.argv0 = `"${p}"`), Q;
    }
    /**
     * Exec a tool.
     * Output will be streamed to the live console.
     * Returns promise with return code
     *
     * @param     tool     path to tool to exec
     * @param     options  optional exec options.  See ExecOptions
     * @returns   number
     */
    exec() {
      return r(this, void 0, void 0, function* () {
        return !u.isRooted(this.toolPath) && (this.toolPath.includes("/") || h && this.toolPath.includes("\\")) && (this.toolPath = c.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath)), this.toolPath = yield g.which(this.toolPath, !0), new Promise((B, p) => r(this, void 0, void 0, function* () {
          this._debug(`exec tool: ${this.toolPath}`), this._debug("arguments:");
          for (const D of this.args)
            this._debug(`   ${D}`);
          const Q = this._cloneExecOptions(this.options);
          !Q.silent && Q.outStream && Q.outStream.write(this._getCommandString(Q) + s.EOL);
          const m = new I(Q, this.toolPath);
          if (m.on("debug", (D) => {
            this._debug(D);
          }), this.options.cwd && !(yield u.exists(this.options.cwd)))
            return p(new Error(`The cwd: ${this.options.cwd} does not exist!`));
          const w = this._getSpawnFileName(), y = i.spawn(w, this._getSpawnArgs(Q), this._getSpawnOptions(this.options, w));
          let b = "";
          y.stdout && y.stdout.on("data", (D) => {
            this.options.listeners && this.options.listeners.stdout && this.options.listeners.stdout(D), !Q.silent && Q.outStream && Q.outStream.write(D), b = this._processLineBuffer(D, b, (N) => {
              this.options.listeners && this.options.listeners.stdline && this.options.listeners.stdline(N);
            });
          });
          let S = "";
          if (y.stderr && y.stderr.on("data", (D) => {
            m.processStderr = !0, this.options.listeners && this.options.listeners.stderr && this.options.listeners.stderr(D), !Q.silent && Q.errStream && Q.outStream && (Q.failOnStdErr ? Q.errStream : Q.outStream).write(D), S = this._processLineBuffer(D, S, (N) => {
              this.options.listeners && this.options.listeners.errline && this.options.listeners.errline(N);
            });
          }), y.on("error", (D) => {
            m.processError = D.message, m.processExited = !0, m.processClosed = !0, m.CheckComplete();
          }), y.on("exit", (D) => {
            m.processExitCode = D, m.processExited = !0, this._debug(`Exit code ${D} received from tool '${this.toolPath}'`), m.CheckComplete();
          }), y.on("close", (D) => {
            m.processExitCode = D, m.processExited = !0, m.processClosed = !0, this._debug(`STDIO streams have closed for tool '${this.toolPath}'`), m.CheckComplete();
          }), m.on("done", (D, N) => {
            b.length > 0 && this.emit("stdline", b), S.length > 0 && this.emit("errline", S), y.removeAllListeners(), D ? p(D) : B(N);
          }), this.options.input) {
            if (!y.stdin)
              throw new Error("child process missing stdin");
            y.stdin.end(this.options.input);
          }
        }));
      });
    }
  }
  ur.ToolRunner = E;
  function f(C) {
    const B = [];
    let p = !1, Q = !1, m = "";
    function w(y) {
      Q && y !== '"' && (m += "\\"), m += y, Q = !1;
    }
    for (let y = 0; y < C.length; y++) {
      const b = C.charAt(y);
      if (b === '"') {
        Q ? w(b) : p = !p;
        continue;
      }
      if (b === "\\" && Q) {
        w(b);
        continue;
      }
      if (b === "\\" && p) {
        Q = !0;
        continue;
      }
      if (b === " " && !p) {
        m.length > 0 && (B.push(m), m = "");
        continue;
      }
      w(b);
    }
    return m.length > 0 && B.push(m.trim()), B;
  }
  ur.argStringToArray = f;
  class I extends o.EventEmitter {
    constructor(B, p) {
      if (super(), this.processClosed = !1, this.processError = "", this.processExitCode = 0, this.processExited = !1, this.processStderr = !1, this.delay = 1e4, this.done = !1, this.timeout = null, !p)
        throw new Error("toolPath must not be empty");
      this.options = B, this.toolPath = p, B.delay && (this.delay = B.delay);
    }
    CheckComplete() {
      this.done || (this.processClosed ? this._setResult() : this.processExited && (this.timeout = l.setTimeout(I.HandleTimeout, this.delay, this)));
    }
    _debug(B) {
      this.emit("debug", B);
    }
    _setResult() {
      let B;
      this.processExited && (this.processError ? B = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`) : this.processExitCode !== 0 && !this.options.ignoreReturnCode ? B = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`) : this.processStderr && this.options.failOnStdErr && (B = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`))), this.timeout && (clearTimeout(this.timeout), this.timeout = null), this.done = !0, this.emit("done", B, this.processExitCode);
    }
    static HandleTimeout(B) {
      if (!B.done) {
        if (!B.processClosed && B.processExited) {
          const p = `The STDIO streams did not close within ${B.delay / 1e3} seconds of the exit event from process '${B.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
          B._debug(p);
        }
        B._setResult();
      }
    }
  }
  return ur;
}
var Ru;
function Zy() {
  if (Ru) return lr;
  Ru = 1;
  var A = H && H.__createBinding || (Object.create ? function(g, u, l, h) {
    h === void 0 && (h = l), Object.defineProperty(g, h, { enumerable: !0, get: function() {
      return u[l];
    } });
  } : function(g, u, l, h) {
    h === void 0 && (h = l), g[h] = u[l];
  }), e = H && H.__setModuleDefault || (Object.create ? function(g, u) {
    Object.defineProperty(g, "default", { enumerable: !0, value: u });
  } : function(g, u) {
    g.default = u;
  }), t = H && H.__importStar || function(g) {
    if (g && g.__esModule) return g;
    var u = {};
    if (g != null) for (var l in g) l !== "default" && Object.hasOwnProperty.call(g, l) && A(u, g, l);
    return e(u, g), u;
  }, r = H && H.__awaiter || function(g, u, l, h) {
    function E(f) {
      return f instanceof l ? f : new l(function(I) {
        I(f);
      });
    }
    return new (l || (l = Promise))(function(f, I) {
      function C(Q) {
        try {
          p(h.next(Q));
        } catch (m) {
          I(m);
        }
      }
      function B(Q) {
        try {
          p(h.throw(Q));
        } catch (m) {
          I(m);
        }
      }
      function p(Q) {
        Q.done ? f(Q.value) : E(Q.value).then(C, B);
      }
      p((h = h.apply(g, u || [])).next());
    });
  };
  Object.defineProperty(lr, "__esModule", { value: !0 }), lr.getExecOutput = lr.exec = void 0;
  const s = G, o = t(zy());
  function i(g, u, l) {
    return r(this, void 0, void 0, function* () {
      const h = o.argStringToArray(g);
      if (h.length === 0)
        throw new Error("Parameter 'commandLine' cannot be null or empty.");
      const E = h[0];
      return u = h.slice(1).concat(u || []), new o.ToolRunner(E, u, l).exec();
    });
  }
  lr.exec = i;
  function c(g, u, l) {
    var h, E;
    return r(this, void 0, void 0, function* () {
      let f = "", I = "";
      const C = new s.StringDecoder("utf8"), B = new s.StringDecoder("utf8"), p = (h = l?.listeners) === null || h === void 0 ? void 0 : h.stdout, Q = (E = l?.listeners) === null || E === void 0 ? void 0 : E.stderr, m = (S) => {
        I += B.write(S), Q && Q(S);
      }, w = (S) => {
        f += C.write(S), p && p(S);
      }, y = Object.assign(Object.assign({}, l?.listeners), { stdout: w, stderr: m }), b = yield i(g, u, Object.assign(Object.assign({}, l), { listeners: y }));
      return f += C.end(), I += B.end(), {
        exitCode: b,
        stdout: f,
        stderr: I
      };
    });
  }
  return lr.getExecOutput = c, lr;
}
var Du;
function $y() {
  return Du || (Du = 1, function(A) {
    var e = H && H.__createBinding || (Object.create ? function(E, f, I, C) {
      C === void 0 && (C = I);
      var B = Object.getOwnPropertyDescriptor(f, I);
      (!B || ("get" in B ? !f.__esModule : B.writable || B.configurable)) && (B = { enumerable: !0, get: function() {
        return f[I];
      } }), Object.defineProperty(E, C, B);
    } : function(E, f, I, C) {
      C === void 0 && (C = I), E[C] = f[I];
    }), t = H && H.__setModuleDefault || (Object.create ? function(E, f) {
      Object.defineProperty(E, "default", { enumerable: !0, value: f });
    } : function(E, f) {
      E.default = f;
    }), r = H && H.__importStar || function(E) {
      if (E && E.__esModule) return E;
      var f = {};
      if (E != null) for (var I in E) I !== "default" && Object.prototype.hasOwnProperty.call(E, I) && e(f, E, I);
      return t(f, E), f;
    }, s = H && H.__awaiter || function(E, f, I, C) {
      function B(p) {
        return p instanceof I ? p : new I(function(Q) {
          Q(p);
        });
      }
      return new (I || (I = Promise))(function(p, Q) {
        function m(b) {
          try {
            y(C.next(b));
          } catch (S) {
            Q(S);
          }
        }
        function w(b) {
          try {
            y(C.throw(b));
          } catch (S) {
            Q(S);
          }
        }
        function y(b) {
          b.done ? p(b.value) : B(b.value).then(m, w);
        }
        y((C = C.apply(E, f || [])).next());
      });
    }, o = H && H.__importDefault || function(E) {
      return E && E.__esModule ? E : { default: E };
    };
    Object.defineProperty(A, "__esModule", { value: !0 }), A.getDetails = A.isLinux = A.isMacOS = A.isWindows = A.arch = A.platform = void 0;
    const i = o(G), c = r(Zy()), g = () => s(void 0, void 0, void 0, function* () {
      const { stdout: E } = yield c.getExecOutput('powershell -command "(Get-CimInstance -ClassName Win32_OperatingSystem).Version"', void 0, {
        silent: !0
      }), { stdout: f } = yield c.getExecOutput('powershell -command "(Get-CimInstance -ClassName Win32_OperatingSystem).Caption"', void 0, {
        silent: !0
      });
      return {
        name: f.trim(),
        version: E.trim()
      };
    }), u = () => s(void 0, void 0, void 0, function* () {
      var E, f, I, C;
      const { stdout: B } = yield c.getExecOutput("sw_vers", void 0, {
        silent: !0
      }), p = (f = (E = B.match(/ProductVersion:\s*(.+)/)) === null || E === void 0 ? void 0 : E[1]) !== null && f !== void 0 ? f : "";
      return {
        name: (C = (I = B.match(/ProductName:\s*(.+)/)) === null || I === void 0 ? void 0 : I[1]) !== null && C !== void 0 ? C : "",
        version: p
      };
    }), l = () => s(void 0, void 0, void 0, function* () {
      const { stdout: E } = yield c.getExecOutput("lsb_release", ["-i", "-r", "-s"], {
        silent: !0
      }), [f, I] = E.trim().split(`
`);
      return {
        name: f,
        version: I
      };
    });
    A.platform = i.default.platform(), A.arch = i.default.arch(), A.isWindows = A.platform === "win32", A.isMacOS = A.platform === "darwin", A.isLinux = A.platform === "linux";
    function h() {
      return s(this, void 0, void 0, function* () {
        return Object.assign(Object.assign({}, yield A.isWindows ? g() : A.isMacOS ? u() : l()), {
          platform: A.platform,
          arch: A.arch,
          isWindows: A.isWindows,
          isMacOS: A.isMacOS,
          isLinux: A.isLinux
        });
      });
    }
    A.getDetails = h;
  }(wa)), wa;
}
var Su;
function qh() {
  return Su || (Su = 1, function(A) {
    var e = H && H.__createBinding || (Object.create ? function(W, oe, le, M) {
      M === void 0 && (M = le);
      var L = Object.getOwnPropertyDescriptor(oe, le);
      (!L || ("get" in L ? !oe.__esModule : L.writable || L.configurable)) && (L = { enumerable: !0, get: function() {
        return oe[le];
      } }), Object.defineProperty(W, M, L);
    } : function(W, oe, le, M) {
      M === void 0 && (M = le), W[M] = oe[le];
    }), t = H && H.__setModuleDefault || (Object.create ? function(W, oe) {
      Object.defineProperty(W, "default", { enumerable: !0, value: oe });
    } : function(W, oe) {
      W.default = oe;
    }), r = H && H.__importStar || function(W) {
      if (W && W.__esModule) return W;
      var oe = {};
      if (W != null) for (var le in W) le !== "default" && Object.prototype.hasOwnProperty.call(W, le) && e(oe, W, le);
      return t(oe, W), oe;
    }, s = H && H.__awaiter || function(W, oe, le, M) {
      function L(q) {
        return q instanceof le ? q : new le(function(K) {
          K(q);
        });
      }
      return new (le || (le = Promise))(function(q, K) {
        function Ae(J) {
          try {
            Z(M.next(J));
          } catch (he) {
            K(he);
          }
        }
        function $(J) {
          try {
            Z(M.throw(J));
          } catch (he) {
            K(he);
          }
        }
        function Z(J) {
          J.done ? q(J.value) : L(J.value).then(Ae, $);
        }
        Z((M = M.apply(W, oe || [])).next());
      });
    };
    Object.defineProperty(A, "__esModule", { value: !0 }), A.platform = A.toPlatformPath = A.toWin32Path = A.toPosixPath = A.markdownSummary = A.summary = A.getIDToken = A.getState = A.saveState = A.group = A.endGroup = A.startGroup = A.info = A.notice = A.warning = A.error = A.debug = A.isDebug = A.setFailed = A.setCommandEcho = A.setOutput = A.getBooleanInput = A.getMultilineInput = A.getInput = A.addPath = A.setSecret = A.exportVariable = A.ExitCode = void 0;
    const o = jr, i = zr, c = Zt, g = r(G), u = r(G), l = qy();
    var h;
    (function(W) {
      W[W.Success = 0] = "Success", W[W.Failure = 1] = "Failure";
    })(h || (A.ExitCode = h = {}));
    function E(W, oe) {
      const le = (0, c.toCommandValue)(oe);
      if (process.env[W] = le, process.env.GITHUB_ENV || "")
        return (0, i.issueFileCommand)("ENV", (0, i.prepareKeyValueMessage)(W, oe));
      (0, o.issueCommand)("set-env", { name: W }, le);
    }
    A.exportVariable = E;
    function f(W) {
      (0, o.issueCommand)("add-mask", {}, W);
    }
    A.setSecret = f;
    function I(W) {
      process.env.GITHUB_PATH || "" ? (0, i.issueFileCommand)("PATH", W) : (0, o.issueCommand)("add-path", {}, W), process.env.PATH = `${W}${u.delimiter}${process.env.PATH}`;
    }
    A.addPath = I;
    function C(W, oe) {
      const le = process.env[`INPUT_${W.replace(/ /g, "_").toUpperCase()}`] || "";
      if (oe && oe.required && !le)
        throw new Error(`Input required and not supplied: ${W}`);
      return oe && oe.trimWhitespace === !1 ? le : le.trim();
    }
    A.getInput = C;
    function B(W, oe) {
      const le = C(W, oe).split(`
`).filter((M) => M !== "");
      return oe && oe.trimWhitespace === !1 ? le : le.map((M) => M.trim());
    }
    A.getMultilineInput = B;
    function p(W, oe) {
      const le = ["true", "True", "TRUE"], M = ["false", "False", "FALSE"], L = C(W, oe);
      if (le.includes(L))
        return !0;
      if (M.includes(L))
        return !1;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${W}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    A.getBooleanInput = p;
    function Q(W, oe) {
      if (process.env.GITHUB_OUTPUT || "")
        return (0, i.issueFileCommand)("OUTPUT", (0, i.prepareKeyValueMessage)(W, oe));
      process.stdout.write(g.EOL), (0, o.issueCommand)("set-output", { name: W }, (0, c.toCommandValue)(oe));
    }
    A.setOutput = Q;
    function m(W) {
      (0, o.issue)("echo", W ? "on" : "off");
    }
    A.setCommandEcho = m;
    function w(W) {
      process.exitCode = h.Failure, S(W);
    }
    A.setFailed = w;
    function y() {
      return process.env.RUNNER_DEBUG === "1";
    }
    A.isDebug = y;
    function b(W) {
      (0, o.issueCommand)("debug", {}, W);
    }
    A.debug = b;
    function S(W, oe = {}) {
      (0, o.issueCommand)("error", (0, c.toCommandProperties)(oe), W instanceof Error ? W.toString() : W);
    }
    A.error = S;
    function D(W, oe = {}) {
      (0, o.issueCommand)("warning", (0, c.toCommandProperties)(oe), W instanceof Error ? W.toString() : W);
    }
    A.warning = D;
    function N(W, oe = {}) {
      (0, o.issueCommand)("notice", (0, c.toCommandProperties)(oe), W instanceof Error ? W.toString() : W);
    }
    A.notice = N;
    function v(W) {
      process.stdout.write(W + g.EOL);
    }
    A.info = v;
    function _(W) {
      (0, o.issue)("group", W);
    }
    A.startGroup = _;
    function U() {
      (0, o.issue)("endgroup");
    }
    A.endGroup = U;
    function z(W, oe) {
      return s(this, void 0, void 0, function* () {
        _(W);
        let le;
        try {
          le = yield oe();
        } finally {
          U();
        }
        return le;
      });
    }
    A.group = z;
    function P(W, oe) {
      if (process.env.GITHUB_STATE || "")
        return (0, i.issueFileCommand)("STATE", (0, i.prepareKeyValueMessage)(W, oe));
      (0, o.issueCommand)("save-state", { name: W }, (0, c.toCommandValue)(oe));
    }
    A.saveState = P;
    function ee(W) {
      return process.env[`STATE_${W}`] || "";
    }
    A.getState = ee;
    function te(W) {
      return s(this, void 0, void 0, function* () {
        return yield l.OidcClient.getIDToken(W);
      });
    }
    A.getIDToken = te;
    var ge = pu();
    Object.defineProperty(A, "summary", { enumerable: !0, get: function() {
      return ge.summary;
    } });
    var ne = pu();
    Object.defineProperty(A, "markdownSummary", { enumerable: !0, get: function() {
      return ne.markdownSummary;
    } });
    var Qe = xy();
    Object.defineProperty(A, "toPosixPath", { enumerable: !0, get: function() {
      return Qe.toPosixPath;
    } }), Object.defineProperty(A, "toWin32Path", { enumerable: !0, get: function() {
      return Qe.toWin32Path;
    } }), Object.defineProperty(A, "toPlatformPath", { enumerable: !0, get: function() {
      return Qe.toPlatformPath;
    } }), A.platform = r($y());
  }($o)), $o;
}
var Xy = qh();
const wA = /* @__PURE__ */ zu(Xy);
var Et = {}, An = {};
Object.defineProperty(An, "__esModule", { value: !0 });
An.Context = void 0;
const ku = G, Ky = G;
let ew = class {
  /**
   * Hydrate the context from the environment
   */
  constructor() {
    var e, t, r;
    if (this.payload = {}, process.env.GITHUB_EVENT_PATH)
      if ((0, ku.existsSync)(process.env.GITHUB_EVENT_PATH))
        this.payload = JSON.parse((0, ku.readFileSync)(process.env.GITHUB_EVENT_PATH, { encoding: "utf8" }));
      else {
        const s = process.env.GITHUB_EVENT_PATH;
        process.stdout.write(`GITHUB_EVENT_PATH ${s} does not exist${Ky.EOL}`);
      }
    this.eventName = process.env.GITHUB_EVENT_NAME, this.sha = process.env.GITHUB_SHA, this.ref = process.env.GITHUB_REF, this.workflow = process.env.GITHUB_WORKFLOW, this.action = process.env.GITHUB_ACTION, this.actor = process.env.GITHUB_ACTOR, this.job = process.env.GITHUB_JOB, this.runNumber = parseInt(process.env.GITHUB_RUN_NUMBER, 10), this.runId = parseInt(process.env.GITHUB_RUN_ID, 10), this.apiUrl = (e = process.env.GITHUB_API_URL) !== null && e !== void 0 ? e : "https://api.github.com", this.serverUrl = (t = process.env.GITHUB_SERVER_URL) !== null && t !== void 0 ? t : "https://github.com", this.graphqlUrl = (r = process.env.GITHUB_GRAPHQL_URL) !== null && r !== void 0 ? r : "https://api.github.com/graphql";
  }
  get issue() {
    const e = this.payload;
    return Object.assign(Object.assign({}, this.repo), { number: (e.issue || e.pull_request || e).number });
  }
  get repo() {
    if (process.env.GITHUB_REPOSITORY) {
      const [e, t] = process.env.GITHUB_REPOSITORY.split("/");
      return { owner: e, repo: t };
    }
    if (this.payload.repository)
      return {
        owner: this.payload.repository.owner.login,
        repo: this.payload.repository.name
      };
    throw new Error("context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'");
  }
};
An.Context = ew;
var xh = {}, ZA = {}, Aw = H && H.__createBinding || (Object.create ? function(A, e, t, r) {
  r === void 0 && (r = t);
  var s = Object.getOwnPropertyDescriptor(e, t);
  (!s || ("get" in s ? !e.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(A, r, s);
} : function(A, e, t, r) {
  r === void 0 && (r = t), A[r] = e[t];
}), tw = H && H.__setModuleDefault || (Object.create ? function(A, e) {
  Object.defineProperty(A, "default", { enumerable: !0, value: e });
} : function(A, e) {
  A.default = e;
}), rw = H && H.__importStar || function(A) {
  if (A && A.__esModule) return A;
  var e = {};
  if (A != null) for (var t in A) t !== "default" && Object.prototype.hasOwnProperty.call(A, t) && Aw(e, A, t);
  return tw(e, A), e;
}, sw = H && H.__awaiter || function(A, e, t, r) {
  function s(o) {
    return o instanceof t ? o : new t(function(i) {
      i(o);
    });
  }
  return new (t || (t = Promise))(function(o, i) {
    function c(l) {
      try {
        u(r.next(l));
      } catch (h) {
        i(h);
      }
    }
    function g(l) {
      try {
        u(r.throw(l));
      } catch (h) {
        i(h);
      }
    }
    function u(l) {
      l.done ? o(l.value) : s(l.value).then(c, g);
    }
    u((r = r.apply(A, e || [])).next());
  });
};
Object.defineProperty(ZA, "__esModule", { value: !0 });
ZA.getApiBaseUrl = ZA.getProxyFetch = ZA.getProxyAgentDispatcher = ZA.getProxyAgent = ZA.getAuthString = void 0;
const jh = rw(aA), nw = Ie;
function ow(A, e) {
  if (!A && !e.auth)
    throw new Error("Parameter token or opts.auth is required");
  if (A && e.auth)
    throw new Error("Parameters token and opts.auth may not both be specified");
  return typeof e.auth == "string" ? e.auth : `token ${A}`;
}
ZA.getAuthString = ow;
function iw(A) {
  return new jh.HttpClient().getAgent(A);
}
ZA.getProxyAgent = iw;
function zh(A) {
  return new jh.HttpClient().getAgentDispatcher(A);
}
ZA.getProxyAgentDispatcher = zh;
function aw(A) {
  const e = zh(A);
  return (r, s) => sw(this, void 0, void 0, function* () {
    return (0, nw.fetch)(r, Object.assign(Object.assign({}, s), { dispatcher: e }));
  });
}
ZA.getProxyFetch = aw;
function cw() {
  return process.env.GITHUB_API_URL || "https://api.github.com";
}
ZA.getApiBaseUrl = cw;
function Fo() {
  return typeof navigator == "object" && "userAgent" in navigator ? navigator.userAgent : typeof process == "object" && "version" in process ? `Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})` : "<environment undetectable>";
}
var To = { exports: {} }, gw = Zh;
function Zh(A, e, t, r) {
  if (typeof t != "function")
    throw new Error("method for before hook must be a function");
  return r || (r = {}), Array.isArray(e) ? e.reverse().reduce(function(s, o) {
    return Zh.bind(null, A, o, s, r);
  }, t)() : Promise.resolve().then(function() {
    return A.registry[e] ? A.registry[e].reduce(function(s, o) {
      return o.hook.bind(null, s, r);
    }, t)() : t(r);
  });
}
var lw = uw;
function uw(A, e, t, r) {
  var s = r;
  A.registry[t] || (A.registry[t] = []), e === "before" && (r = function(o, i) {
    return Promise.resolve().then(s.bind(null, i)).then(o.bind(null, i));
  }), e === "after" && (r = function(o, i) {
    var c;
    return Promise.resolve().then(o.bind(null, i)).then(function(g) {
      return c = g, s(c, i);
    }).then(function() {
      return c;
    });
  }), e === "error" && (r = function(o, i) {
    return Promise.resolve().then(o.bind(null, i)).catch(function(c) {
      return s(c, i);
    });
  }), A.registry[t].push({
    hook: r,
    orig: s
  });
}
var Ew = hw;
function hw(A, e, t) {
  if (A.registry[e]) {
    var r = A.registry[e].map(function(s) {
      return s.orig;
    }).indexOf(t);
    r !== -1 && A.registry[e].splice(r, 1);
  }
}
var $h = gw, Qw = lw, Cw = Ew, Fu = Function.bind, Tu = Fu.bind(Fu);
function Xh(A, e, t) {
  var r = Tu(Cw, null).apply(
    null,
    t ? [e, t] : [e]
  );
  A.api = { remove: r }, A.remove = r, ["before", "error", "after", "wrap"].forEach(function(s) {
    var o = t ? [e, s, t] : [e, s];
    A[s] = A.api[s] = Tu(Qw, null).apply(null, o);
  });
}
function dw() {
  var A = "h", e = {
    registry: {}
  }, t = $h.bind(null, e, A);
  return Xh(t, e, A), t;
}
function Kh() {
  var A = {
    registry: {}
  }, e = $h.bind(null, A);
  return Xh(e, A), e;
}
var Nu = !1;
function os() {
  return Nu || (console.warn(
    '[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4'
  ), Nu = !0), Kh();
}
os.Singular = dw.bind();
os.Collection = Kh.bind();
To.exports = os;
To.exports.Hook = os;
To.exports.Singular = os.Singular;
var Bw = To.exports.Collection = os.Collection;
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
function Uu(A) {
  return Object.prototype.toString.call(A) === "[object Object]";
}
function eQ(A) {
  var e, t;
  return Uu(A) === !1 ? !1 : (e = A.constructor, e === void 0 ? !0 : (t = e.prototype, !(Uu(t) === !1 || t.hasOwnProperty("isPrototypeOf") === !1)));
}
var Iw = "9.0.1", fw = `octokit-endpoint.js/${Iw} ${Fo()}`, pw = {
  method: "GET",
  baseUrl: "https://api.github.com",
  headers: {
    accept: "application/vnd.github.v3+json",
    "user-agent": fw
  },
  mediaType: {
    format: ""
  }
};
function mw(A) {
  return A ? Object.keys(A).reduce((e, t) => (e[t.toLowerCase()] = A[t], e), {}) : {};
}
function AQ(A, e) {
  const t = Object.assign({}, A);
  return Object.keys(e).forEach((r) => {
    eQ(e[r]) ? r in A ? t[r] = AQ(A[r], e[r]) : Object.assign(t, { [r]: e[r] }) : Object.assign(t, { [r]: e[r] });
  }), t;
}
function Lu(A) {
  for (const e in A)
    A[e] === void 0 && delete A[e];
  return A;
}
function xa(A, e, t) {
  if (typeof e == "string") {
    let [s, o] = e.split(" ");
    t = Object.assign(o ? { method: s, url: o } : { url: s }, t);
  } else
    t = Object.assign({}, e);
  t.headers = mw(t.headers), Lu(t), Lu(t.headers);
  const r = AQ(A || {}, t);
  return t.url === "/graphql" && (A && A.mediaType.previews?.length && (r.mediaType.previews = A.mediaType.previews.filter(
    (s) => !r.mediaType.previews.includes(s)
  ).concat(r.mediaType.previews)), r.mediaType.previews = (r.mediaType.previews || []).map((s) => s.replace(/-preview/, ""))), r;
}
function yw(A, e) {
  const t = /\?/.test(A) ? "&" : "?", r = Object.keys(e);
  return r.length === 0 ? A : A + t + r.map((s) => s === "q" ? "q=" + e.q.split("+").map(encodeURIComponent).join("+") : `${s}=${encodeURIComponent(e[s])}`).join("&");
}
var ww = /\{[^}]+\}/g;
function bw(A) {
  return A.replace(/^\W+|\W+$/g, "").split(/,/);
}
function Rw(A) {
  const e = A.match(ww);
  return e ? e.map(bw).reduce((t, r) => t.concat(r), []) : [];
}
function _u(A, e) {
  return Object.keys(A).filter((t) => !e.includes(t)).reduce((t, r) => (t[r] = A[r], t), {});
}
function tQ(A) {
  return A.split(/(%[0-9A-Fa-f]{2})/g).map(function(e) {
    return /%[0-9A-Fa-f]/.test(e) || (e = encodeURI(e).replace(/%5B/g, "[").replace(/%5D/g, "]")), e;
  }).join("");
}
function Wr(A) {
  return encodeURIComponent(A).replace(/[!'()*]/g, function(e) {
    return "%" + e.charCodeAt(0).toString(16).toUpperCase();
  });
}
function Us(A, e, t) {
  return e = A === "+" || A === "#" ? tQ(e) : Wr(e), t ? Wr(t) + "=" + e : e;
}
function Or(A) {
  return A != null;
}
function Ra(A) {
  return A === ";" || A === "&" || A === "?";
}
function Dw(A, e, t, r) {
  var s = A[t], o = [];
  if (Or(s) && s !== "")
    if (typeof s == "string" || typeof s == "number" || typeof s == "boolean")
      s = s.toString(), r && r !== "*" && (s = s.substring(0, parseInt(r, 10))), o.push(
        Us(e, s, Ra(e) ? t : "")
      );
    else if (r === "*")
      Array.isArray(s) ? s.filter(Or).forEach(function(i) {
        o.push(
          Us(e, i, Ra(e) ? t : "")
        );
      }) : Object.keys(s).forEach(function(i) {
        Or(s[i]) && o.push(Us(e, s[i], i));
      });
    else {
      const i = [];
      Array.isArray(s) ? s.filter(Or).forEach(function(c) {
        i.push(Us(e, c));
      }) : Object.keys(s).forEach(function(c) {
        Or(s[c]) && (i.push(Wr(c)), i.push(Us(e, s[c].toString())));
      }), Ra(e) ? o.push(Wr(t) + "=" + i.join(",")) : i.length !== 0 && o.push(i.join(","));
    }
  else
    e === ";" ? Or(s) && o.push(Wr(t)) : s === "" && (e === "&" || e === "?") ? o.push(Wr(t) + "=") : s === "" && o.push("");
  return o;
}
function Sw(A) {
  return {
    expand: kw.bind(null, A)
  };
}
function kw(A, e) {
  var t = ["+", "#", ".", "/", ";", "?", "&"];
  return A.replace(
    /\{([^\{\}]+)\}|([^\{\}]+)/g,
    function(r, s, o) {
      if (s) {
        let c = "";
        const g = [];
        if (t.indexOf(s.charAt(0)) !== -1 && (c = s.charAt(0), s = s.substr(1)), s.split(/,/g).forEach(function(u) {
          var l = /([^:\*]*)(?::(\d+)|(\*))?/.exec(u);
          g.push(Dw(e, c, l[1], l[2] || l[3]));
        }), c && c !== "+") {
          var i = ",";
          return c === "?" ? i = "&" : c !== "#" && (i = c), (g.length !== 0 ? c : "") + g.join(i);
        } else
          return g.join(",");
      } else
        return tQ(o);
    }
  );
}
function rQ(A) {
  let e = A.method.toUpperCase(), t = (A.url || "/").replace(/:([a-z]\w+)/g, "{$1}"), r = Object.assign({}, A.headers), s, o = _u(A, [
    "method",
    "baseUrl",
    "url",
    "headers",
    "request",
    "mediaType"
  ]);
  const i = Rw(t);
  t = Sw(t).expand(o), /^http/.test(t) || (t = A.baseUrl + t);
  const c = Object.keys(A).filter((l) => i.includes(l)).concat("baseUrl"), g = _u(o, c);
  if (!/application\/octet-stream/i.test(r.accept) && (A.mediaType.format && (r.accept = r.accept.split(/,/).map(
    (l) => l.replace(
      /application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/,
      `application/vnd$1$2.${A.mediaType.format}`
    )
  ).join(",")), t.endsWith("/graphql") && A.mediaType.previews?.length)) {
    const l = r.accept.match(/[\w-]+(?=-preview)/g) || [];
    r.accept = l.concat(A.mediaType.previews).map((h) => {
      const E = A.mediaType.format ? `.${A.mediaType.format}` : "+json";
      return `application/vnd.github.${h}-preview${E}`;
    }).join(",");
  }
  return ["GET", "HEAD"].includes(e) ? t = yw(t, g) : "data" in g ? s = g.data : Object.keys(g).length && (s = g), !r["content-type"] && typeof s < "u" && (r["content-type"] = "application/json; charset=utf-8"), ["PATCH", "PUT"].includes(e) && typeof s > "u" && (s = ""), Object.assign(
    { method: e, url: t, headers: r },
    typeof s < "u" ? { body: s } : null,
    A.request ? { request: A.request } : null
  );
}
function Fw(A, e, t) {
  return rQ(xa(A, e, t));
}
function sQ(A, e) {
  const t = xa(A, e), r = Fw.bind(null, t);
  return Object.assign(r, {
    DEFAULTS: t,
    defaults: sQ.bind(null, t),
    merge: xa.bind(null, t),
    parse: rQ
  });
}
var Tw = sQ(null, pw);
class vu extends Error {
  constructor(e) {
    super(e), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.name = "Deprecation";
  }
}
var Bc = { exports: {} }, Nw = nQ;
function nQ(A, e) {
  if (A && e) return nQ(A)(e);
  if (typeof A != "function")
    throw new TypeError("need wrapper function");
  return Object.keys(A).forEach(function(r) {
    t[r] = A[r];
  }), t;
  function t() {
    for (var r = new Array(arguments.length), s = 0; s < r.length; s++)
      r[s] = arguments[s];
    var o = A.apply(this, r), i = r[r.length - 1];
    return typeof o == "function" && o !== i && Object.keys(i).forEach(function(c) {
      o[c] = i[c];
    }), o;
  }
}
var oQ = Nw;
Bc.exports = oQ(ro);
Bc.exports.strict = oQ(iQ);
ro.proto = ro(function() {
  Object.defineProperty(Function.prototype, "once", {
    value: function() {
      return ro(this);
    },
    configurable: !0
  }), Object.defineProperty(Function.prototype, "onceStrict", {
    value: function() {
      return iQ(this);
    },
    configurable: !0
  });
});
function ro(A) {
  var e = function() {
    return e.called ? e.value : (e.called = !0, e.value = A.apply(this, arguments));
  };
  return e.called = !1, e;
}
function iQ(A) {
  var e = function() {
    if (e.called)
      throw new Error(e.onceError);
    return e.called = !0, e.value = A.apply(this, arguments);
  }, t = A.name || "Function wrapped with `once`";
  return e.onceError = t + " shouldn't be called more than once", e.called = !1, e;
}
var Uw = Bc.exports;
const aQ = /* @__PURE__ */ zu(Uw);
var Lw = aQ((A) => console.warn(A)), _w = aQ((A) => console.warn(A)), Ls = class extends Error {
  constructor(A, e, t) {
    super(A), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.name = "HttpError", this.status = e;
    let r;
    "headers" in t && typeof t.headers < "u" && (r = t.headers), "response" in t && (this.response = t.response, r = t.response.headers);
    const s = Object.assign({}, t.request);
    t.request.headers.authorization && (s.headers = Object.assign({}, t.request.headers, {
      authorization: t.request.headers.authorization.replace(
        / .*$/,
        " [REDACTED]"
      )
    })), s.url = s.url.replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]").replace(/\baccess_token=\w+/g, "access_token=[REDACTED]"), this.request = s, Object.defineProperty(this, "code", {
      get() {
        return Lw(
          new vu(
            "[@octokit/request-error] `error.code` is deprecated, use `error.status`."
          )
        ), e;
      }
    }), Object.defineProperty(this, "headers", {
      get() {
        return _w(
          new vu(
            "[@octokit/request-error] `error.headers` is deprecated, use `error.response.headers`."
          )
        ), r || {};
      }
    });
  }
}, vw = "8.1.4";
function Gw(A) {
  return A.arrayBuffer();
}
function Gu(A) {
  const e = A.request && A.request.log ? A.request.log : console, t = A.request?.parseSuccessResponseBody !== !1;
  (eQ(A.body) || Array.isArray(A.body)) && (A.body = JSON.stringify(A.body));
  let r = {}, s, o, { fetch: i } = globalThis;
  if (A.request?.fetch && (i = A.request.fetch), !i)
    throw new Error(
      "fetch is not set. Please pass a fetch implementation as new Octokit({ request: { fetch }}). Learn more at https://github.com/octokit/octokit.js/#fetch-missing"
    );
  return i(A.url, {
    method: A.method,
    body: A.body,
    headers: A.headers,
    signal: A.request?.signal,
    // duplex must be set if request.body is ReadableStream or Async Iterables.
    // See https://fetch.spec.whatwg.org/#dom-requestinit-duplex.
    ...A.body && { duplex: "half" }
  }).then(async (c) => {
    o = c.url, s = c.status;
    for (const g of c.headers)
      r[g[0]] = g[1];
    if ("deprecation" in r) {
      const g = r.link && r.link.match(/<([^>]+)>; rel="deprecation"/), u = g && g.pop();
      e.warn(
        `[@octokit/request] "${A.method} ${A.url}" is deprecated. It is scheduled to be removed on ${r.sunset}${u ? `. See ${u}` : ""}`
      );
    }
    if (!(s === 204 || s === 205)) {
      if (A.method === "HEAD") {
        if (s < 400)
          return;
        throw new Ls(c.statusText, s, {
          response: {
            url: o,
            status: s,
            headers: r,
            data: void 0
          },
          request: A
        });
      }
      if (s === 304)
        throw new Ls("Not modified", s, {
          response: {
            url: o,
            status: s,
            headers: r,
            data: await Da(c)
          },
          request: A
        });
      if (s >= 400) {
        const g = await Da(c);
        throw new Ls(Mw(g), s, {
          response: {
            url: o,
            status: s,
            headers: r,
            data: g
          },
          request: A
        });
      }
      return t ? await Da(c) : c.body;
    }
  }).then((c) => ({
    status: s,
    url: o,
    headers: r,
    data: c
  })).catch((c) => {
    if (c instanceof Ls)
      throw c;
    if (c.name === "AbortError")
      throw c;
    let g = c.message;
    throw c.name === "TypeError" && "cause" in c && (c.cause instanceof Error ? g = c.cause.message : typeof c.cause == "string" && (g = c.cause)), new Ls(g, 500, {
      request: A
    });
  });
}
async function Da(A) {
  const e = A.headers.get("content-type");
  return /application\/json/.test(e) ? A.json() : !e || /^text\/|charset=utf-8$/.test(e) ? A.text() : Gw(A);
}
function Mw(A) {
  return typeof A == "string" ? A : "message" in A ? Array.isArray(A.errors) ? `${A.message}: ${A.errors.map(JSON.stringify).join(", ")}` : A.message : `Unknown error: ${JSON.stringify(A)}`;
}
function ja(A, e) {
  const t = A.defaults(e);
  return Object.assign(function(s, o) {
    const i = t.merge(s, o);
    if (!i.request || !i.request.hook)
      return Gu(t.parse(i));
    const c = (g, u) => Gu(
      t.parse(t.merge(g, u))
    );
    return Object.assign(c, {
      endpoint: t,
      defaults: ja.bind(null, t)
    }), i.request.hook(c, i);
  }, {
    endpoint: t,
    defaults: ja.bind(null, t)
  });
}
var za = ja(Tw, {
  headers: {
    "user-agent": `octokit-request.js/${vw} ${Fo()}`
  }
}), Yw = "7.0.2";
function Pw(A) {
  return `Request failed due to following response errors:
` + A.errors.map((e) => ` - ${e.message}`).join(`
`);
}
var Jw = class extends Error {
  constructor(A, e, t) {
    super(Pw(t)), this.request = A, this.headers = e, this.response = t, this.name = "GraphqlResponseError", this.errors = t.errors, this.data = t.data, Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
}, Ow = [
  "method",
  "baseUrl",
  "url",
  "headers",
  "request",
  "query",
  "mediaType"
], Hw = ["query", "method", "url"], Mu = /\/api\/v3\/?$/;
function Vw(A, e, t) {
  if (t) {
    if (typeof e == "string" && "query" in t)
      return Promise.reject(
        new Error('[@octokit/graphql] "query" cannot be used as variable name')
      );
    for (const i in t)
      if (Hw.includes(i))
        return Promise.reject(
          new Error(
            `[@octokit/graphql] "${i}" cannot be used as variable name`
          )
        );
  }
  const r = typeof e == "string" ? Object.assign({ query: e }, t) : e, s = Object.keys(
    r
  ).reduce((i, c) => Ow.includes(c) ? (i[c] = r[c], i) : (i.variables || (i.variables = {}), i.variables[c] = r[c], i), {}), o = r.baseUrl || A.endpoint.DEFAULTS.baseUrl;
  return Mu.test(o) && (s.url = o.replace(Mu, "/api/graphql")), A(s).then((i) => {
    if (i.data.errors) {
      const c = {};
      for (const g of Object.keys(i.headers))
        c[g] = i.headers[g];
      throw new Jw(
        s,
        c,
        i.data
      );
    }
    return i.data.data;
  });
}
function Ic(A, e) {
  const t = A.defaults(e);
  return Object.assign((s, o) => Vw(t, s, o), {
    defaults: Ic.bind(null, t),
    endpoint: t.endpoint
  });
}
Ic(za, {
  headers: {
    "user-agent": `octokit-graphql.js/${Yw} ${Fo()}`
  },
  method: "POST",
  url: "/graphql"
});
function Ww(A) {
  return Ic(A, {
    method: "POST",
    url: "/graphql"
  });
}
var qw = /^v1\./, xw = /^ghs_/, jw = /^ghu_/;
async function zw(A) {
  const e = A.split(/\./).length === 3, t = qw.test(A) || xw.test(A), r = jw.test(A);
  return {
    type: "token",
    token: A,
    tokenType: e ? "app" : t ? "installation" : r ? "user-to-server" : "oauth"
  };
}
function Zw(A) {
  return A.split(/\./).length === 3 ? `bearer ${A}` : `token ${A}`;
}
async function $w(A, e, t, r) {
  const s = e.endpoint.merge(
    t,
    r
  );
  return s.headers.authorization = Zw(A), e(s);
}
var Xw = function(e) {
  if (!e)
    throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
  if (typeof e != "string")
    throw new Error(
      "[@octokit/auth-token] Token passed to createTokenAuth is not a string"
    );
  return e = e.replace(/^(token|bearer) +/i, ""), Object.assign(zw.bind(null, e), {
    hook: $w.bind(null, e)
  });
}, Yu = "5.0.1", Kw = class {
  static {
    this.VERSION = Yu;
  }
  static defaults(A) {
    return class extends this {
      constructor(...t) {
        const r = t[0] || {};
        if (typeof A == "function") {
          super(A(r));
          return;
        }
        super(
          Object.assign(
            {},
            A,
            r,
            r.userAgent && A.userAgent ? {
              userAgent: `${r.userAgent} ${A.userAgent}`
            } : null
          )
        );
      }
    };
  }
  static {
    this.plugins = [];
  }
  /**
   * Attach a plugin (or many) to your Octokit instance.
   *
   * @example
   * const API = Octokit.plugin(plugin1, plugin2, plugin3, ...)
   */
  static plugin(...A) {
    const e = this.plugins;
    return class extends this {
      static {
        this.plugins = e.concat(
          A.filter((r) => !e.includes(r))
        );
      }
    };
  }
  constructor(A = {}) {
    const e = new Bw(), t = {
      baseUrl: za.endpoint.DEFAULTS.baseUrl,
      headers: {},
      request: Object.assign({}, A.request, {
        // @ts-ignore internal usage only, no need to type
        hook: e.bind(null, "request")
      }),
      mediaType: {
        previews: [],
        format: ""
      }
    };
    if (t.headers["user-agent"] = [
      A.userAgent,
      `octokit-core.js/${Yu} ${Fo()}`
    ].filter(Boolean).join(" "), A.baseUrl && (t.baseUrl = A.baseUrl), A.previews && (t.mediaType.previews = A.previews), A.timeZone && (t.headers["time-zone"] = A.timeZone), this.request = za.defaults(t), this.graphql = Ww(this.request).defaults(t), this.log = Object.assign(
      {
        debug: () => {
        },
        info: () => {
        },
        warn: console.warn.bind(console),
        error: console.error.bind(console)
      },
      A.log
    ), this.hook = e, A.authStrategy) {
      const { authStrategy: s, ...o } = A, i = s(
        Object.assign(
          {
            request: this.request,
            log: this.log,
            // we pass the current octokit instance as well as its constructor options
            // to allow for authentication strategies that return a new octokit instance
            // that shares the same internal state as the current one. The original
            // requirement for this was the "event-octokit" authentication strategy
            // of https://github.com/probot/octokit-auth-probot.
            octokit: this,
            octokitOptions: o
          },
          A.auth
        )
      );
      e.wrap("request", i.hook), this.auth = i;
    } else if (!A.auth)
      this.auth = async () => ({
        type: "unauthenticated"
      });
    else {
      const s = Xw(A.auth);
      e.wrap("request", s.hook), this.auth = s;
    }
    this.constructor.plugins.forEach((s) => {
      Object.assign(this, s(this, A));
    });
  }
};
const eb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Octokit: Kw
}, Symbol.toStringTag, { value: "Module" })), Ab = /* @__PURE__ */ Co(eb);
var cQ = "10.0.1", tb = {
  actions: {
    addCustomLabelsToSelfHostedRunnerForOrg: [
      "POST /orgs/{org}/actions/runners/{runner_id}/labels"
    ],
    addCustomLabelsToSelfHostedRunnerForRepo: [
      "POST /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"
    ],
    addSelectedRepoToOrgSecret: [
      "PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"
    ],
    addSelectedRepoToOrgVariable: [
      "PUT /orgs/{org}/actions/variables/{name}/repositories/{repository_id}"
    ],
    approveWorkflowRun: [
      "POST /repos/{owner}/{repo}/actions/runs/{run_id}/approve"
    ],
    cancelWorkflowRun: [
      "POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel"
    ],
    createEnvironmentVariable: [
      "POST /repositories/{repository_id}/environments/{environment_name}/variables"
    ],
    createOrUpdateEnvironmentSecret: [
      "PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"
    ],
    createOrUpdateOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}"],
    createOrUpdateRepoSecret: [
      "PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}"
    ],
    createOrgVariable: ["POST /orgs/{org}/actions/variables"],
    createRegistrationTokenForOrg: [
      "POST /orgs/{org}/actions/runners/registration-token"
    ],
    createRegistrationTokenForRepo: [
      "POST /repos/{owner}/{repo}/actions/runners/registration-token"
    ],
    createRemoveTokenForOrg: ["POST /orgs/{org}/actions/runners/remove-token"],
    createRemoveTokenForRepo: [
      "POST /repos/{owner}/{repo}/actions/runners/remove-token"
    ],
    createRepoVariable: ["POST /repos/{owner}/{repo}/actions/variables"],
    createWorkflowDispatch: [
      "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches"
    ],
    deleteActionsCacheById: [
      "DELETE /repos/{owner}/{repo}/actions/caches/{cache_id}"
    ],
    deleteActionsCacheByKey: [
      "DELETE /repos/{owner}/{repo}/actions/caches{?key,ref}"
    ],
    deleteArtifact: [
      "DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"
    ],
    deleteEnvironmentSecret: [
      "DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"
    ],
    deleteEnvironmentVariable: [
      "DELETE /repositories/{repository_id}/environments/{environment_name}/variables/{name}"
    ],
    deleteOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}"],
    deleteOrgVariable: ["DELETE /orgs/{org}/actions/variables/{name}"],
    deleteRepoSecret: [
      "DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}"
    ],
    deleteRepoVariable: [
      "DELETE /repos/{owner}/{repo}/actions/variables/{name}"
    ],
    deleteSelfHostedRunnerFromOrg: [
      "DELETE /orgs/{org}/actions/runners/{runner_id}"
    ],
    deleteSelfHostedRunnerFromRepo: [
      "DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}"
    ],
    deleteWorkflowRun: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}"],
    deleteWorkflowRunLogs: [
      "DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs"
    ],
    disableSelectedRepositoryGithubActionsOrganization: [
      "DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}"
    ],
    disableWorkflow: [
      "PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable"
    ],
    downloadArtifact: [
      "GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}"
    ],
    downloadJobLogsForWorkflowRun: [
      "GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs"
    ],
    downloadWorkflowRunAttemptLogs: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/logs"
    ],
    downloadWorkflowRunLogs: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs"
    ],
    enableSelectedRepositoryGithubActionsOrganization: [
      "PUT /orgs/{org}/actions/permissions/repositories/{repository_id}"
    ],
    enableWorkflow: [
      "PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable"
    ],
    generateRunnerJitconfigForOrg: [
      "POST /orgs/{org}/actions/runners/generate-jitconfig"
    ],
    generateRunnerJitconfigForRepo: [
      "POST /repos/{owner}/{repo}/actions/runners/generate-jitconfig"
    ],
    getActionsCacheList: ["GET /repos/{owner}/{repo}/actions/caches"],
    getActionsCacheUsage: ["GET /repos/{owner}/{repo}/actions/cache/usage"],
    getActionsCacheUsageByRepoForOrg: [
      "GET /orgs/{org}/actions/cache/usage-by-repository"
    ],
    getActionsCacheUsageForOrg: ["GET /orgs/{org}/actions/cache/usage"],
    getAllowedActionsOrganization: [
      "GET /orgs/{org}/actions/permissions/selected-actions"
    ],
    getAllowedActionsRepository: [
      "GET /repos/{owner}/{repo}/actions/permissions/selected-actions"
    ],
    getArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
    getEnvironmentPublicKey: [
      "GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key"
    ],
    getEnvironmentSecret: [
      "GET /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"
    ],
    getEnvironmentVariable: [
      "GET /repositories/{repository_id}/environments/{environment_name}/variables/{name}"
    ],
    getGithubActionsDefaultWorkflowPermissionsOrganization: [
      "GET /orgs/{org}/actions/permissions/workflow"
    ],
    getGithubActionsDefaultWorkflowPermissionsRepository: [
      "GET /repos/{owner}/{repo}/actions/permissions/workflow"
    ],
    getGithubActionsPermissionsOrganization: [
      "GET /orgs/{org}/actions/permissions"
    ],
    getGithubActionsPermissionsRepository: [
      "GET /repos/{owner}/{repo}/actions/permissions"
    ],
    getJobForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}"],
    getOrgPublicKey: ["GET /orgs/{org}/actions/secrets/public-key"],
    getOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}"],
    getOrgVariable: ["GET /orgs/{org}/actions/variables/{name}"],
    getPendingDeploymentsForRun: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"
    ],
    getRepoPermissions: [
      "GET /repos/{owner}/{repo}/actions/permissions",
      {},
      { renamed: ["actions", "getGithubActionsPermissionsRepository"] }
    ],
    getRepoPublicKey: ["GET /repos/{owner}/{repo}/actions/secrets/public-key"],
    getRepoSecret: ["GET /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    getRepoVariable: ["GET /repos/{owner}/{repo}/actions/variables/{name}"],
    getReviewsForRun: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/approvals"
    ],
    getSelfHostedRunnerForOrg: ["GET /orgs/{org}/actions/runners/{runner_id}"],
    getSelfHostedRunnerForRepo: [
      "GET /repos/{owner}/{repo}/actions/runners/{runner_id}"
    ],
    getWorkflow: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}"],
    getWorkflowAccessToRepository: [
      "GET /repos/{owner}/{repo}/actions/permissions/access"
    ],
    getWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}"],
    getWorkflowRunAttempt: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}"
    ],
    getWorkflowRunUsage: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing"
    ],
    getWorkflowUsage: [
      "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing"
    ],
    listArtifactsForRepo: ["GET /repos/{owner}/{repo}/actions/artifacts"],
    listEnvironmentSecrets: [
      "GET /repositories/{repository_id}/environments/{environment_name}/secrets"
    ],
    listEnvironmentVariables: [
      "GET /repositories/{repository_id}/environments/{environment_name}/variables"
    ],
    listJobsForWorkflowRun: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs"
    ],
    listJobsForWorkflowRunAttempt: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/jobs"
    ],
    listLabelsForSelfHostedRunnerForOrg: [
      "GET /orgs/{org}/actions/runners/{runner_id}/labels"
    ],
    listLabelsForSelfHostedRunnerForRepo: [
      "GET /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"
    ],
    listOrgSecrets: ["GET /orgs/{org}/actions/secrets"],
    listOrgVariables: ["GET /orgs/{org}/actions/variables"],
    listRepoOrganizationSecrets: [
      "GET /repos/{owner}/{repo}/actions/organization-secrets"
    ],
    listRepoOrganizationVariables: [
      "GET /repos/{owner}/{repo}/actions/organization-variables"
    ],
    listRepoSecrets: ["GET /repos/{owner}/{repo}/actions/secrets"],
    listRepoVariables: ["GET /repos/{owner}/{repo}/actions/variables"],
    listRepoWorkflows: ["GET /repos/{owner}/{repo}/actions/workflows"],
    listRunnerApplicationsForOrg: ["GET /orgs/{org}/actions/runners/downloads"],
    listRunnerApplicationsForRepo: [
      "GET /repos/{owner}/{repo}/actions/runners/downloads"
    ],
    listSelectedReposForOrgSecret: [
      "GET /orgs/{org}/actions/secrets/{secret_name}/repositories"
    ],
    listSelectedReposForOrgVariable: [
      "GET /orgs/{org}/actions/variables/{name}/repositories"
    ],
    listSelectedRepositoriesEnabledGithubActionsOrganization: [
      "GET /orgs/{org}/actions/permissions/repositories"
    ],
    listSelfHostedRunnersForOrg: ["GET /orgs/{org}/actions/runners"],
    listSelfHostedRunnersForRepo: ["GET /repos/{owner}/{repo}/actions/runners"],
    listWorkflowRunArtifacts: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts"
    ],
    listWorkflowRuns: [
      "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs"
    ],
    listWorkflowRunsForRepo: ["GET /repos/{owner}/{repo}/actions/runs"],
    reRunJobForWorkflowRun: [
      "POST /repos/{owner}/{repo}/actions/jobs/{job_id}/rerun"
    ],
    reRunWorkflow: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun"],
    reRunWorkflowFailedJobs: [
      "POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun-failed-jobs"
    ],
    removeAllCustomLabelsFromSelfHostedRunnerForOrg: [
      "DELETE /orgs/{org}/actions/runners/{runner_id}/labels"
    ],
    removeAllCustomLabelsFromSelfHostedRunnerForRepo: [
      "DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"
    ],
    removeCustomLabelFromSelfHostedRunnerForOrg: [
      "DELETE /orgs/{org}/actions/runners/{runner_id}/labels/{name}"
    ],
    removeCustomLabelFromSelfHostedRunnerForRepo: [
      "DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels/{name}"
    ],
    removeSelectedRepoFromOrgSecret: [
      "DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"
    ],
    removeSelectedRepoFromOrgVariable: [
      "DELETE /orgs/{org}/actions/variables/{name}/repositories/{repository_id}"
    ],
    reviewCustomGatesForRun: [
      "POST /repos/{owner}/{repo}/actions/runs/{run_id}/deployment_protection_rule"
    ],
    reviewPendingDeploymentsForRun: [
      "POST /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"
    ],
    setAllowedActionsOrganization: [
      "PUT /orgs/{org}/actions/permissions/selected-actions"
    ],
    setAllowedActionsRepository: [
      "PUT /repos/{owner}/{repo}/actions/permissions/selected-actions"
    ],
    setCustomLabelsForSelfHostedRunnerForOrg: [
      "PUT /orgs/{org}/actions/runners/{runner_id}/labels"
    ],
    setCustomLabelsForSelfHostedRunnerForRepo: [
      "PUT /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"
    ],
    setGithubActionsDefaultWorkflowPermissionsOrganization: [
      "PUT /orgs/{org}/actions/permissions/workflow"
    ],
    setGithubActionsDefaultWorkflowPermissionsRepository: [
      "PUT /repos/{owner}/{repo}/actions/permissions/workflow"
    ],
    setGithubActionsPermissionsOrganization: [
      "PUT /orgs/{org}/actions/permissions"
    ],
    setGithubActionsPermissionsRepository: [
      "PUT /repos/{owner}/{repo}/actions/permissions"
    ],
    setSelectedReposForOrgSecret: [
      "PUT /orgs/{org}/actions/secrets/{secret_name}/repositories"
    ],
    setSelectedReposForOrgVariable: [
      "PUT /orgs/{org}/actions/variables/{name}/repositories"
    ],
    setSelectedRepositoriesEnabledGithubActionsOrganization: [
      "PUT /orgs/{org}/actions/permissions/repositories"
    ],
    setWorkflowAccessToRepository: [
      "PUT /repos/{owner}/{repo}/actions/permissions/access"
    ],
    updateEnvironmentVariable: [
      "PATCH /repositories/{repository_id}/environments/{environment_name}/variables/{name}"
    ],
    updateOrgVariable: ["PATCH /orgs/{org}/actions/variables/{name}"],
    updateRepoVariable: [
      "PATCH /repos/{owner}/{repo}/actions/variables/{name}"
    ]
  },
  activity: {
    checkRepoIsStarredByAuthenticatedUser: ["GET /user/starred/{owner}/{repo}"],
    deleteRepoSubscription: ["DELETE /repos/{owner}/{repo}/subscription"],
    deleteThreadSubscription: [
      "DELETE /notifications/threads/{thread_id}/subscription"
    ],
    getFeeds: ["GET /feeds"],
    getRepoSubscription: ["GET /repos/{owner}/{repo}/subscription"],
    getThread: ["GET /notifications/threads/{thread_id}"],
    getThreadSubscriptionForAuthenticatedUser: [
      "GET /notifications/threads/{thread_id}/subscription"
    ],
    listEventsForAuthenticatedUser: ["GET /users/{username}/events"],
    listNotificationsForAuthenticatedUser: ["GET /notifications"],
    listOrgEventsForAuthenticatedUser: [
      "GET /users/{username}/events/orgs/{org}"
    ],
    listPublicEvents: ["GET /events"],
    listPublicEventsForRepoNetwork: ["GET /networks/{owner}/{repo}/events"],
    listPublicEventsForUser: ["GET /users/{username}/events/public"],
    listPublicOrgEvents: ["GET /orgs/{org}/events"],
    listReceivedEventsForUser: ["GET /users/{username}/received_events"],
    listReceivedPublicEventsForUser: [
      "GET /users/{username}/received_events/public"
    ],
    listRepoEvents: ["GET /repos/{owner}/{repo}/events"],
    listRepoNotificationsForAuthenticatedUser: [
      "GET /repos/{owner}/{repo}/notifications"
    ],
    listReposStarredByAuthenticatedUser: ["GET /user/starred"],
    listReposStarredByUser: ["GET /users/{username}/starred"],
    listReposWatchedByUser: ["GET /users/{username}/subscriptions"],
    listStargazersForRepo: ["GET /repos/{owner}/{repo}/stargazers"],
    listWatchedReposForAuthenticatedUser: ["GET /user/subscriptions"],
    listWatchersForRepo: ["GET /repos/{owner}/{repo}/subscribers"],
    markNotificationsAsRead: ["PUT /notifications"],
    markRepoNotificationsAsRead: ["PUT /repos/{owner}/{repo}/notifications"],
    markThreadAsRead: ["PATCH /notifications/threads/{thread_id}"],
    setRepoSubscription: ["PUT /repos/{owner}/{repo}/subscription"],
    setThreadSubscription: [
      "PUT /notifications/threads/{thread_id}/subscription"
    ],
    starRepoForAuthenticatedUser: ["PUT /user/starred/{owner}/{repo}"],
    unstarRepoForAuthenticatedUser: ["DELETE /user/starred/{owner}/{repo}"]
  },
  apps: {
    addRepoToInstallation: [
      "PUT /user/installations/{installation_id}/repositories/{repository_id}",
      {},
      { renamed: ["apps", "addRepoToInstallationForAuthenticatedUser"] }
    ],
    addRepoToInstallationForAuthenticatedUser: [
      "PUT /user/installations/{installation_id}/repositories/{repository_id}"
    ],
    checkToken: ["POST /applications/{client_id}/token"],
    createFromManifest: ["POST /app-manifests/{code}/conversions"],
    createInstallationAccessToken: [
      "POST /app/installations/{installation_id}/access_tokens"
    ],
    deleteAuthorization: ["DELETE /applications/{client_id}/grant"],
    deleteInstallation: ["DELETE /app/installations/{installation_id}"],
    deleteToken: ["DELETE /applications/{client_id}/token"],
    getAuthenticated: ["GET /app"],
    getBySlug: ["GET /apps/{app_slug}"],
    getInstallation: ["GET /app/installations/{installation_id}"],
    getOrgInstallation: ["GET /orgs/{org}/installation"],
    getRepoInstallation: ["GET /repos/{owner}/{repo}/installation"],
    getSubscriptionPlanForAccount: [
      "GET /marketplace_listing/accounts/{account_id}"
    ],
    getSubscriptionPlanForAccountStubbed: [
      "GET /marketplace_listing/stubbed/accounts/{account_id}"
    ],
    getUserInstallation: ["GET /users/{username}/installation"],
    getWebhookConfigForApp: ["GET /app/hook/config"],
    getWebhookDelivery: ["GET /app/hook/deliveries/{delivery_id}"],
    listAccountsForPlan: ["GET /marketplace_listing/plans/{plan_id}/accounts"],
    listAccountsForPlanStubbed: [
      "GET /marketplace_listing/stubbed/plans/{plan_id}/accounts"
    ],
    listInstallationReposForAuthenticatedUser: [
      "GET /user/installations/{installation_id}/repositories"
    ],
    listInstallationRequestsForAuthenticatedApp: [
      "GET /app/installation-requests"
    ],
    listInstallations: ["GET /app/installations"],
    listInstallationsForAuthenticatedUser: ["GET /user/installations"],
    listPlans: ["GET /marketplace_listing/plans"],
    listPlansStubbed: ["GET /marketplace_listing/stubbed/plans"],
    listReposAccessibleToInstallation: ["GET /installation/repositories"],
    listSubscriptionsForAuthenticatedUser: ["GET /user/marketplace_purchases"],
    listSubscriptionsForAuthenticatedUserStubbed: [
      "GET /user/marketplace_purchases/stubbed"
    ],
    listWebhookDeliveries: ["GET /app/hook/deliveries"],
    redeliverWebhookDelivery: [
      "POST /app/hook/deliveries/{delivery_id}/attempts"
    ],
    removeRepoFromInstallation: [
      "DELETE /user/installations/{installation_id}/repositories/{repository_id}",
      {},
      { renamed: ["apps", "removeRepoFromInstallationForAuthenticatedUser"] }
    ],
    removeRepoFromInstallationForAuthenticatedUser: [
      "DELETE /user/installations/{installation_id}/repositories/{repository_id}"
    ],
    resetToken: ["PATCH /applications/{client_id}/token"],
    revokeInstallationAccessToken: ["DELETE /installation/token"],
    scopeToken: ["POST /applications/{client_id}/token/scoped"],
    suspendInstallation: ["PUT /app/installations/{installation_id}/suspended"],
    unsuspendInstallation: [
      "DELETE /app/installations/{installation_id}/suspended"
    ],
    updateWebhookConfigForApp: ["PATCH /app/hook/config"]
  },
  billing: {
    getGithubActionsBillingOrg: ["GET /orgs/{org}/settings/billing/actions"],
    getGithubActionsBillingUser: [
      "GET /users/{username}/settings/billing/actions"
    ],
    getGithubPackagesBillingOrg: ["GET /orgs/{org}/settings/billing/packages"],
    getGithubPackagesBillingUser: [
      "GET /users/{username}/settings/billing/packages"
    ],
    getSharedStorageBillingOrg: [
      "GET /orgs/{org}/settings/billing/shared-storage"
    ],
    getSharedStorageBillingUser: [
      "GET /users/{username}/settings/billing/shared-storage"
    ]
  },
  checks: {
    create: ["POST /repos/{owner}/{repo}/check-runs"],
    createSuite: ["POST /repos/{owner}/{repo}/check-suites"],
    get: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}"],
    getSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}"],
    listAnnotations: [
      "GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations"
    ],
    listForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-runs"],
    listForSuite: [
      "GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs"
    ],
    listSuitesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-suites"],
    rerequestRun: [
      "POST /repos/{owner}/{repo}/check-runs/{check_run_id}/rerequest"
    ],
    rerequestSuite: [
      "POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest"
    ],
    setSuitesPreferences: [
      "PATCH /repos/{owner}/{repo}/check-suites/preferences"
    ],
    update: ["PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}"]
  },
  codeScanning: {
    deleteAnalysis: [
      "DELETE /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}{?confirm_delete}"
    ],
    getAlert: [
      "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}",
      {},
      { renamedParameters: { alert_id: "alert_number" } }
    ],
    getAnalysis: [
      "GET /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}"
    ],
    getCodeqlDatabase: [
      "GET /repos/{owner}/{repo}/code-scanning/codeql/databases/{language}"
    ],
    getDefaultSetup: ["GET /repos/{owner}/{repo}/code-scanning/default-setup"],
    getSarif: ["GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}"],
    listAlertInstances: [
      "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances"
    ],
    listAlertsForOrg: ["GET /orgs/{org}/code-scanning/alerts"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/code-scanning/alerts"],
    listAlertsInstances: [
      "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances",
      {},
      { renamed: ["codeScanning", "listAlertInstances"] }
    ],
    listCodeqlDatabases: [
      "GET /repos/{owner}/{repo}/code-scanning/codeql/databases"
    ],
    listRecentAnalyses: ["GET /repos/{owner}/{repo}/code-scanning/analyses"],
    updateAlert: [
      "PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}"
    ],
    updateDefaultSetup: [
      "PATCH /repos/{owner}/{repo}/code-scanning/default-setup"
    ],
    uploadSarif: ["POST /repos/{owner}/{repo}/code-scanning/sarifs"]
  },
  codesOfConduct: {
    getAllCodesOfConduct: ["GET /codes_of_conduct"],
    getConductCode: ["GET /codes_of_conduct/{key}"]
  },
  codespaces: {
    addRepositoryForSecretForAuthenticatedUser: [
      "PUT /user/codespaces/secrets/{secret_name}/repositories/{repository_id}"
    ],
    addSelectedRepoToOrgSecret: [
      "PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}"
    ],
    codespaceMachinesForAuthenticatedUser: [
      "GET /user/codespaces/{codespace_name}/machines"
    ],
    createForAuthenticatedUser: ["POST /user/codespaces"],
    createOrUpdateOrgSecret: [
      "PUT /orgs/{org}/codespaces/secrets/{secret_name}"
    ],
    createOrUpdateRepoSecret: [
      "PUT /repos/{owner}/{repo}/codespaces/secrets/{secret_name}"
    ],
    createOrUpdateSecretForAuthenticatedUser: [
      "PUT /user/codespaces/secrets/{secret_name}"
    ],
    createWithPrForAuthenticatedUser: [
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/codespaces"
    ],
    createWithRepoForAuthenticatedUser: [
      "POST /repos/{owner}/{repo}/codespaces"
    ],
    deleteForAuthenticatedUser: ["DELETE /user/codespaces/{codespace_name}"],
    deleteFromOrganization: [
      "DELETE /orgs/{org}/members/{username}/codespaces/{codespace_name}"
    ],
    deleteOrgSecret: ["DELETE /orgs/{org}/codespaces/secrets/{secret_name}"],
    deleteRepoSecret: [
      "DELETE /repos/{owner}/{repo}/codespaces/secrets/{secret_name}"
    ],
    deleteSecretForAuthenticatedUser: [
      "DELETE /user/codespaces/secrets/{secret_name}"
    ],
    exportForAuthenticatedUser: [
      "POST /user/codespaces/{codespace_name}/exports"
    ],
    getCodespacesForUserInOrg: [
      "GET /orgs/{org}/members/{username}/codespaces"
    ],
    getExportDetailsForAuthenticatedUser: [
      "GET /user/codespaces/{codespace_name}/exports/{export_id}"
    ],
    getForAuthenticatedUser: ["GET /user/codespaces/{codespace_name}"],
    getOrgPublicKey: ["GET /orgs/{org}/codespaces/secrets/public-key"],
    getOrgSecret: ["GET /orgs/{org}/codespaces/secrets/{secret_name}"],
    getPublicKeyForAuthenticatedUser: [
      "GET /user/codespaces/secrets/public-key"
    ],
    getRepoPublicKey: [
      "GET /repos/{owner}/{repo}/codespaces/secrets/public-key"
    ],
    getRepoSecret: [
      "GET /repos/{owner}/{repo}/codespaces/secrets/{secret_name}"
    ],
    getSecretForAuthenticatedUser: [
      "GET /user/codespaces/secrets/{secret_name}"
    ],
    listDevcontainersInRepositoryForAuthenticatedUser: [
      "GET /repos/{owner}/{repo}/codespaces/devcontainers"
    ],
    listForAuthenticatedUser: ["GET /user/codespaces"],
    listInOrganization: [
      "GET /orgs/{org}/codespaces",
      {},
      { renamedParameters: { org_id: "org" } }
    ],
    listInRepositoryForAuthenticatedUser: [
      "GET /repos/{owner}/{repo}/codespaces"
    ],
    listOrgSecrets: ["GET /orgs/{org}/codespaces/secrets"],
    listRepoSecrets: ["GET /repos/{owner}/{repo}/codespaces/secrets"],
    listRepositoriesForSecretForAuthenticatedUser: [
      "GET /user/codespaces/secrets/{secret_name}/repositories"
    ],
    listSecretsForAuthenticatedUser: ["GET /user/codespaces/secrets"],
    listSelectedReposForOrgSecret: [
      "GET /orgs/{org}/codespaces/secrets/{secret_name}/repositories"
    ],
    preFlightWithRepoForAuthenticatedUser: [
      "GET /repos/{owner}/{repo}/codespaces/new"
    ],
    publishForAuthenticatedUser: [
      "POST /user/codespaces/{codespace_name}/publish"
    ],
    removeRepositoryForSecretForAuthenticatedUser: [
      "DELETE /user/codespaces/secrets/{secret_name}/repositories/{repository_id}"
    ],
    removeSelectedRepoFromOrgSecret: [
      "DELETE /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}"
    ],
    repoMachinesForAuthenticatedUser: [
      "GET /repos/{owner}/{repo}/codespaces/machines"
    ],
    setRepositoriesForSecretForAuthenticatedUser: [
      "PUT /user/codespaces/secrets/{secret_name}/repositories"
    ],
    setSelectedReposForOrgSecret: [
      "PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories"
    ],
    startForAuthenticatedUser: ["POST /user/codespaces/{codespace_name}/start"],
    stopForAuthenticatedUser: ["POST /user/codespaces/{codespace_name}/stop"],
    stopInOrganization: [
      "POST /orgs/{org}/members/{username}/codespaces/{codespace_name}/stop"
    ],
    updateForAuthenticatedUser: ["PATCH /user/codespaces/{codespace_name}"]
  },
  copilot: {
    addCopilotForBusinessSeatsForTeams: [
      "POST /orgs/{org}/copilot/billing/selected_teams"
    ],
    addCopilotForBusinessSeatsForUsers: [
      "POST /orgs/{org}/copilot/billing/selected_users"
    ],
    cancelCopilotSeatAssignmentForTeams: [
      "DELETE /orgs/{org}/copilot/billing/selected_teams"
    ],
    cancelCopilotSeatAssignmentForUsers: [
      "DELETE /orgs/{org}/copilot/billing/selected_users"
    ],
    getCopilotOrganizationDetails: ["GET /orgs/{org}/copilot/billing"],
    getCopilotSeatAssignmentDetailsForUser: [
      "GET /orgs/{org}/members/{username}/copilot"
    ],
    listCopilotSeats: ["GET /orgs/{org}/copilot/billing/seats"]
  },
  dependabot: {
    addSelectedRepoToOrgSecret: [
      "PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}"
    ],
    createOrUpdateOrgSecret: [
      "PUT /orgs/{org}/dependabot/secrets/{secret_name}"
    ],
    createOrUpdateRepoSecret: [
      "PUT /repos/{owner}/{repo}/dependabot/secrets/{secret_name}"
    ],
    deleteOrgSecret: ["DELETE /orgs/{org}/dependabot/secrets/{secret_name}"],
    deleteRepoSecret: [
      "DELETE /repos/{owner}/{repo}/dependabot/secrets/{secret_name}"
    ],
    getAlert: ["GET /repos/{owner}/{repo}/dependabot/alerts/{alert_number}"],
    getOrgPublicKey: ["GET /orgs/{org}/dependabot/secrets/public-key"],
    getOrgSecret: ["GET /orgs/{org}/dependabot/secrets/{secret_name}"],
    getRepoPublicKey: [
      "GET /repos/{owner}/{repo}/dependabot/secrets/public-key"
    ],
    getRepoSecret: [
      "GET /repos/{owner}/{repo}/dependabot/secrets/{secret_name}"
    ],
    listAlertsForEnterprise: [
      "GET /enterprises/{enterprise}/dependabot/alerts"
    ],
    listAlertsForOrg: ["GET /orgs/{org}/dependabot/alerts"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/dependabot/alerts"],
    listOrgSecrets: ["GET /orgs/{org}/dependabot/secrets"],
    listRepoSecrets: ["GET /repos/{owner}/{repo}/dependabot/secrets"],
    listSelectedReposForOrgSecret: [
      "GET /orgs/{org}/dependabot/secrets/{secret_name}/repositories"
    ],
    removeSelectedRepoFromOrgSecret: [
      "DELETE /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}"
    ],
    setSelectedReposForOrgSecret: [
      "PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories"
    ],
    updateAlert: [
      "PATCH /repos/{owner}/{repo}/dependabot/alerts/{alert_number}"
    ]
  },
  dependencyGraph: {
    createRepositorySnapshot: [
      "POST /repos/{owner}/{repo}/dependency-graph/snapshots"
    ],
    diffRange: [
      "GET /repos/{owner}/{repo}/dependency-graph/compare/{basehead}"
    ],
    exportSbom: ["GET /repos/{owner}/{repo}/dependency-graph/sbom"]
  },
  emojis: { get: ["GET /emojis"] },
  gists: {
    checkIsStarred: ["GET /gists/{gist_id}/star"],
    create: ["POST /gists"],
    createComment: ["POST /gists/{gist_id}/comments"],
    delete: ["DELETE /gists/{gist_id}"],
    deleteComment: ["DELETE /gists/{gist_id}/comments/{comment_id}"],
    fork: ["POST /gists/{gist_id}/forks"],
    get: ["GET /gists/{gist_id}"],
    getComment: ["GET /gists/{gist_id}/comments/{comment_id}"],
    getRevision: ["GET /gists/{gist_id}/{sha}"],
    list: ["GET /gists"],
    listComments: ["GET /gists/{gist_id}/comments"],
    listCommits: ["GET /gists/{gist_id}/commits"],
    listForUser: ["GET /users/{username}/gists"],
    listForks: ["GET /gists/{gist_id}/forks"],
    listPublic: ["GET /gists/public"],
    listStarred: ["GET /gists/starred"],
    star: ["PUT /gists/{gist_id}/star"],
    unstar: ["DELETE /gists/{gist_id}/star"],
    update: ["PATCH /gists/{gist_id}"],
    updateComment: ["PATCH /gists/{gist_id}/comments/{comment_id}"]
  },
  git: {
    createBlob: ["POST /repos/{owner}/{repo}/git/blobs"],
    createCommit: ["POST /repos/{owner}/{repo}/git/commits"],
    createRef: ["POST /repos/{owner}/{repo}/git/refs"],
    createTag: ["POST /repos/{owner}/{repo}/git/tags"],
    createTree: ["POST /repos/{owner}/{repo}/git/trees"],
    deleteRef: ["DELETE /repos/{owner}/{repo}/git/refs/{ref}"],
    getBlob: ["GET /repos/{owner}/{repo}/git/blobs/{file_sha}"],
    getCommit: ["GET /repos/{owner}/{repo}/git/commits/{commit_sha}"],
    getRef: ["GET /repos/{owner}/{repo}/git/ref/{ref}"],
    getTag: ["GET /repos/{owner}/{repo}/git/tags/{tag_sha}"],
    getTree: ["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"],
    listMatchingRefs: ["GET /repos/{owner}/{repo}/git/matching-refs/{ref}"],
    updateRef: ["PATCH /repos/{owner}/{repo}/git/refs/{ref}"]
  },
  gitignore: {
    getAllTemplates: ["GET /gitignore/templates"],
    getTemplate: ["GET /gitignore/templates/{name}"]
  },
  interactions: {
    getRestrictionsForAuthenticatedUser: ["GET /user/interaction-limits"],
    getRestrictionsForOrg: ["GET /orgs/{org}/interaction-limits"],
    getRestrictionsForRepo: ["GET /repos/{owner}/{repo}/interaction-limits"],
    getRestrictionsForYourPublicRepos: [
      "GET /user/interaction-limits",
      {},
      { renamed: ["interactions", "getRestrictionsForAuthenticatedUser"] }
    ],
    removeRestrictionsForAuthenticatedUser: ["DELETE /user/interaction-limits"],
    removeRestrictionsForOrg: ["DELETE /orgs/{org}/interaction-limits"],
    removeRestrictionsForRepo: [
      "DELETE /repos/{owner}/{repo}/interaction-limits"
    ],
    removeRestrictionsForYourPublicRepos: [
      "DELETE /user/interaction-limits",
      {},
      { renamed: ["interactions", "removeRestrictionsForAuthenticatedUser"] }
    ],
    setRestrictionsForAuthenticatedUser: ["PUT /user/interaction-limits"],
    setRestrictionsForOrg: ["PUT /orgs/{org}/interaction-limits"],
    setRestrictionsForRepo: ["PUT /repos/{owner}/{repo}/interaction-limits"],
    setRestrictionsForYourPublicRepos: [
      "PUT /user/interaction-limits",
      {},
      { renamed: ["interactions", "setRestrictionsForAuthenticatedUser"] }
    ]
  },
  issues: {
    addAssignees: [
      "POST /repos/{owner}/{repo}/issues/{issue_number}/assignees"
    ],
    addLabels: ["POST /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    checkUserCanBeAssigned: ["GET /repos/{owner}/{repo}/assignees/{assignee}"],
    checkUserCanBeAssignedToIssue: [
      "GET /repos/{owner}/{repo}/issues/{issue_number}/assignees/{assignee}"
    ],
    create: ["POST /repos/{owner}/{repo}/issues"],
    createComment: [
      "POST /repos/{owner}/{repo}/issues/{issue_number}/comments"
    ],
    createLabel: ["POST /repos/{owner}/{repo}/labels"],
    createMilestone: ["POST /repos/{owner}/{repo}/milestones"],
    deleteComment: [
      "DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}"
    ],
    deleteLabel: ["DELETE /repos/{owner}/{repo}/labels/{name}"],
    deleteMilestone: [
      "DELETE /repos/{owner}/{repo}/milestones/{milestone_number}"
    ],
    get: ["GET /repos/{owner}/{repo}/issues/{issue_number}"],
    getComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    getEvent: ["GET /repos/{owner}/{repo}/issues/events/{event_id}"],
    getLabel: ["GET /repos/{owner}/{repo}/labels/{name}"],
    getMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}"],
    list: ["GET /issues"],
    listAssignees: ["GET /repos/{owner}/{repo}/assignees"],
    listComments: ["GET /repos/{owner}/{repo}/issues/{issue_number}/comments"],
    listCommentsForRepo: ["GET /repos/{owner}/{repo}/issues/comments"],
    listEvents: ["GET /repos/{owner}/{repo}/issues/{issue_number}/events"],
    listEventsForRepo: ["GET /repos/{owner}/{repo}/issues/events"],
    listEventsForTimeline: [
      "GET /repos/{owner}/{repo}/issues/{issue_number}/timeline"
    ],
    listForAuthenticatedUser: ["GET /user/issues"],
    listForOrg: ["GET /orgs/{org}/issues"],
    listForRepo: ["GET /repos/{owner}/{repo}/issues"],
    listLabelsForMilestone: [
      "GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels"
    ],
    listLabelsForRepo: ["GET /repos/{owner}/{repo}/labels"],
    listLabelsOnIssue: [
      "GET /repos/{owner}/{repo}/issues/{issue_number}/labels"
    ],
    listMilestones: ["GET /repos/{owner}/{repo}/milestones"],
    lock: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/lock"],
    removeAllLabels: [
      "DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels"
    ],
    removeAssignees: [
      "DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees"
    ],
    removeLabel: [
      "DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}"
    ],
    setLabels: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    unlock: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock"],
    update: ["PATCH /repos/{owner}/{repo}/issues/{issue_number}"],
    updateComment: ["PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    updateLabel: ["PATCH /repos/{owner}/{repo}/labels/{name}"],
    updateMilestone: [
      "PATCH /repos/{owner}/{repo}/milestones/{milestone_number}"
    ]
  },
  licenses: {
    get: ["GET /licenses/{license}"],
    getAllCommonlyUsed: ["GET /licenses"],
    getForRepo: ["GET /repos/{owner}/{repo}/license"]
  },
  markdown: {
    render: ["POST /markdown"],
    renderRaw: [
      "POST /markdown/raw",
      { headers: { "content-type": "text/plain; charset=utf-8" } }
    ]
  },
  meta: {
    get: ["GET /meta"],
    getAllVersions: ["GET /versions"],
    getOctocat: ["GET /octocat"],
    getZen: ["GET /zen"],
    root: ["GET /"]
  },
  migrations: {
    cancelImport: ["DELETE /repos/{owner}/{repo}/import"],
    deleteArchiveForAuthenticatedUser: [
      "DELETE /user/migrations/{migration_id}/archive"
    ],
    deleteArchiveForOrg: [
      "DELETE /orgs/{org}/migrations/{migration_id}/archive"
    ],
    downloadArchiveForOrg: [
      "GET /orgs/{org}/migrations/{migration_id}/archive"
    ],
    getArchiveForAuthenticatedUser: [
      "GET /user/migrations/{migration_id}/archive"
    ],
    getCommitAuthors: ["GET /repos/{owner}/{repo}/import/authors"],
    getImportStatus: ["GET /repos/{owner}/{repo}/import"],
    getLargeFiles: ["GET /repos/{owner}/{repo}/import/large_files"],
    getStatusForAuthenticatedUser: ["GET /user/migrations/{migration_id}"],
    getStatusForOrg: ["GET /orgs/{org}/migrations/{migration_id}"],
    listForAuthenticatedUser: ["GET /user/migrations"],
    listForOrg: ["GET /orgs/{org}/migrations"],
    listReposForAuthenticatedUser: [
      "GET /user/migrations/{migration_id}/repositories"
    ],
    listReposForOrg: ["GET /orgs/{org}/migrations/{migration_id}/repositories"],
    listReposForUser: [
      "GET /user/migrations/{migration_id}/repositories",
      {},
      { renamed: ["migrations", "listReposForAuthenticatedUser"] }
    ],
    mapCommitAuthor: ["PATCH /repos/{owner}/{repo}/import/authors/{author_id}"],
    setLfsPreference: ["PATCH /repos/{owner}/{repo}/import/lfs"],
    startForAuthenticatedUser: ["POST /user/migrations"],
    startForOrg: ["POST /orgs/{org}/migrations"],
    startImport: ["PUT /repos/{owner}/{repo}/import"],
    unlockRepoForAuthenticatedUser: [
      "DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock"
    ],
    unlockRepoForOrg: [
      "DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock"
    ],
    updateImport: ["PATCH /repos/{owner}/{repo}/import"]
  },
  orgs: {
    addSecurityManagerTeam: [
      "PUT /orgs/{org}/security-managers/teams/{team_slug}"
    ],
    blockUser: ["PUT /orgs/{org}/blocks/{username}"],
    cancelInvitation: ["DELETE /orgs/{org}/invitations/{invitation_id}"],
    checkBlockedUser: ["GET /orgs/{org}/blocks/{username}"],
    checkMembershipForUser: ["GET /orgs/{org}/members/{username}"],
    checkPublicMembershipForUser: ["GET /orgs/{org}/public_members/{username}"],
    convertMemberToOutsideCollaborator: [
      "PUT /orgs/{org}/outside_collaborators/{username}"
    ],
    createInvitation: ["POST /orgs/{org}/invitations"],
    createWebhook: ["POST /orgs/{org}/hooks"],
    delete: ["DELETE /orgs/{org}"],
    deleteWebhook: ["DELETE /orgs/{org}/hooks/{hook_id}"],
    enableOrDisableSecurityProductOnAllOrgRepos: [
      "POST /orgs/{org}/{security_product}/{enablement}"
    ],
    get: ["GET /orgs/{org}"],
    getMembershipForAuthenticatedUser: ["GET /user/memberships/orgs/{org}"],
    getMembershipForUser: ["GET /orgs/{org}/memberships/{username}"],
    getWebhook: ["GET /orgs/{org}/hooks/{hook_id}"],
    getWebhookConfigForOrg: ["GET /orgs/{org}/hooks/{hook_id}/config"],
    getWebhookDelivery: [
      "GET /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}"
    ],
    list: ["GET /organizations"],
    listAppInstallations: ["GET /orgs/{org}/installations"],
    listBlockedUsers: ["GET /orgs/{org}/blocks"],
    listFailedInvitations: ["GET /orgs/{org}/failed_invitations"],
    listForAuthenticatedUser: ["GET /user/orgs"],
    listForUser: ["GET /users/{username}/orgs"],
    listInvitationTeams: ["GET /orgs/{org}/invitations/{invitation_id}/teams"],
    listMembers: ["GET /orgs/{org}/members"],
    listMembershipsForAuthenticatedUser: ["GET /user/memberships/orgs"],
    listOutsideCollaborators: ["GET /orgs/{org}/outside_collaborators"],
    listPatGrantRepositories: [
      "GET /orgs/{org}/personal-access-tokens/{pat_id}/repositories"
    ],
    listPatGrantRequestRepositories: [
      "GET /orgs/{org}/personal-access-token-requests/{pat_request_id}/repositories"
    ],
    listPatGrantRequests: ["GET /orgs/{org}/personal-access-token-requests"],
    listPatGrants: ["GET /orgs/{org}/personal-access-tokens"],
    listPendingInvitations: ["GET /orgs/{org}/invitations"],
    listPublicMembers: ["GET /orgs/{org}/public_members"],
    listSecurityManagerTeams: ["GET /orgs/{org}/security-managers"],
    listWebhookDeliveries: ["GET /orgs/{org}/hooks/{hook_id}/deliveries"],
    listWebhooks: ["GET /orgs/{org}/hooks"],
    pingWebhook: ["POST /orgs/{org}/hooks/{hook_id}/pings"],
    redeliverWebhookDelivery: [
      "POST /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}/attempts"
    ],
    removeMember: ["DELETE /orgs/{org}/members/{username}"],
    removeMembershipForUser: ["DELETE /orgs/{org}/memberships/{username}"],
    removeOutsideCollaborator: [
      "DELETE /orgs/{org}/outside_collaborators/{username}"
    ],
    removePublicMembershipForAuthenticatedUser: [
      "DELETE /orgs/{org}/public_members/{username}"
    ],
    removeSecurityManagerTeam: [
      "DELETE /orgs/{org}/security-managers/teams/{team_slug}"
    ],
    reviewPatGrantRequest: [
      "POST /orgs/{org}/personal-access-token-requests/{pat_request_id}"
    ],
    reviewPatGrantRequestsInBulk: [
      "POST /orgs/{org}/personal-access-token-requests"
    ],
    setMembershipForUser: ["PUT /orgs/{org}/memberships/{username}"],
    setPublicMembershipForAuthenticatedUser: [
      "PUT /orgs/{org}/public_members/{username}"
    ],
    unblockUser: ["DELETE /orgs/{org}/blocks/{username}"],
    update: ["PATCH /orgs/{org}"],
    updateMembershipForAuthenticatedUser: [
      "PATCH /user/memberships/orgs/{org}"
    ],
    updatePatAccess: ["POST /orgs/{org}/personal-access-tokens/{pat_id}"],
    updatePatAccesses: ["POST /orgs/{org}/personal-access-tokens"],
    updateWebhook: ["PATCH /orgs/{org}/hooks/{hook_id}"],
    updateWebhookConfigForOrg: ["PATCH /orgs/{org}/hooks/{hook_id}/config"]
  },
  packages: {
    deletePackageForAuthenticatedUser: [
      "DELETE /user/packages/{package_type}/{package_name}"
    ],
    deletePackageForOrg: [
      "DELETE /orgs/{org}/packages/{package_type}/{package_name}"
    ],
    deletePackageForUser: [
      "DELETE /users/{username}/packages/{package_type}/{package_name}"
    ],
    deletePackageVersionForAuthenticatedUser: [
      "DELETE /user/packages/{package_type}/{package_name}/versions/{package_version_id}"
    ],
    deletePackageVersionForOrg: [
      "DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"
    ],
    deletePackageVersionForUser: [
      "DELETE /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}"
    ],
    getAllPackageVersionsForAPackageOwnedByAnOrg: [
      "GET /orgs/{org}/packages/{package_type}/{package_name}/versions",
      {},
      { renamed: ["packages", "getAllPackageVersionsForPackageOwnedByOrg"] }
    ],
    getAllPackageVersionsForAPackageOwnedByTheAuthenticatedUser: [
      "GET /user/packages/{package_type}/{package_name}/versions",
      {},
      {
        renamed: [
          "packages",
          "getAllPackageVersionsForPackageOwnedByAuthenticatedUser"
        ]
      }
    ],
    getAllPackageVersionsForPackageOwnedByAuthenticatedUser: [
      "GET /user/packages/{package_type}/{package_name}/versions"
    ],
    getAllPackageVersionsForPackageOwnedByOrg: [
      "GET /orgs/{org}/packages/{package_type}/{package_name}/versions"
    ],
    getAllPackageVersionsForPackageOwnedByUser: [
      "GET /users/{username}/packages/{package_type}/{package_name}/versions"
    ],
    getPackageForAuthenticatedUser: [
      "GET /user/packages/{package_type}/{package_name}"
    ],
    getPackageForOrganization: [
      "GET /orgs/{org}/packages/{package_type}/{package_name}"
    ],
    getPackageForUser: [
      "GET /users/{username}/packages/{package_type}/{package_name}"
    ],
    getPackageVersionForAuthenticatedUser: [
      "GET /user/packages/{package_type}/{package_name}/versions/{package_version_id}"
    ],
    getPackageVersionForOrganization: [
      "GET /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"
    ],
    getPackageVersionForUser: [
      "GET /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}"
    ],
    listDockerMigrationConflictingPackagesForAuthenticatedUser: [
      "GET /user/docker/conflicts"
    ],
    listDockerMigrationConflictingPackagesForOrganization: [
      "GET /orgs/{org}/docker/conflicts"
    ],
    listDockerMigrationConflictingPackagesForUser: [
      "GET /users/{username}/docker/conflicts"
    ],
    listPackagesForAuthenticatedUser: ["GET /user/packages"],
    listPackagesForOrganization: ["GET /orgs/{org}/packages"],
    listPackagesForUser: ["GET /users/{username}/packages"],
    restorePackageForAuthenticatedUser: [
      "POST /user/packages/{package_type}/{package_name}/restore{?token}"
    ],
    restorePackageForOrg: [
      "POST /orgs/{org}/packages/{package_type}/{package_name}/restore{?token}"
    ],
    restorePackageForUser: [
      "POST /users/{username}/packages/{package_type}/{package_name}/restore{?token}"
    ],
    restorePackageVersionForAuthenticatedUser: [
      "POST /user/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"
    ],
    restorePackageVersionForOrg: [
      "POST /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"
    ],
    restorePackageVersionForUser: [
      "POST /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"
    ]
  },
  projects: {
    addCollaborator: ["PUT /projects/{project_id}/collaborators/{username}"],
    createCard: ["POST /projects/columns/{column_id}/cards"],
    createColumn: ["POST /projects/{project_id}/columns"],
    createForAuthenticatedUser: ["POST /user/projects"],
    createForOrg: ["POST /orgs/{org}/projects"],
    createForRepo: ["POST /repos/{owner}/{repo}/projects"],
    delete: ["DELETE /projects/{project_id}"],
    deleteCard: ["DELETE /projects/columns/cards/{card_id}"],
    deleteColumn: ["DELETE /projects/columns/{column_id}"],
    get: ["GET /projects/{project_id}"],
    getCard: ["GET /projects/columns/cards/{card_id}"],
    getColumn: ["GET /projects/columns/{column_id}"],
    getPermissionForUser: [
      "GET /projects/{project_id}/collaborators/{username}/permission"
    ],
    listCards: ["GET /projects/columns/{column_id}/cards"],
    listCollaborators: ["GET /projects/{project_id}/collaborators"],
    listColumns: ["GET /projects/{project_id}/columns"],
    listForOrg: ["GET /orgs/{org}/projects"],
    listForRepo: ["GET /repos/{owner}/{repo}/projects"],
    listForUser: ["GET /users/{username}/projects"],
    moveCard: ["POST /projects/columns/cards/{card_id}/moves"],
    moveColumn: ["POST /projects/columns/{column_id}/moves"],
    removeCollaborator: [
      "DELETE /projects/{project_id}/collaborators/{username}"
    ],
    update: ["PATCH /projects/{project_id}"],
    updateCard: ["PATCH /projects/columns/cards/{card_id}"],
    updateColumn: ["PATCH /projects/columns/{column_id}"]
  },
  pulls: {
    checkIfMerged: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
    create: ["POST /repos/{owner}/{repo}/pulls"],
    createReplyForReviewComment: [
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies"
    ],
    createReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
    createReviewComment: [
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/comments"
    ],
    deletePendingReview: [
      "DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"
    ],
    deleteReviewComment: [
      "DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}"
    ],
    dismissReview: [
      "PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals"
    ],
    get: ["GET /repos/{owner}/{repo}/pulls/{pull_number}"],
    getReview: [
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"
    ],
    getReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
    list: ["GET /repos/{owner}/{repo}/pulls"],
    listCommentsForReview: [
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments"
    ],
    listCommits: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/commits"],
    listFiles: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/files"],
    listRequestedReviewers: [
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"
    ],
    listReviewComments: [
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/comments"
    ],
    listReviewCommentsForRepo: ["GET /repos/{owner}/{repo}/pulls/comments"],
    listReviews: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
    merge: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
    removeRequestedReviewers: [
      "DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"
    ],
    requestReviewers: [
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"
    ],
    submitReview: [
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events"
    ],
    update: ["PATCH /repos/{owner}/{repo}/pulls/{pull_number}"],
    updateBranch: [
      "PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch"
    ],
    updateReview: [
      "PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"
    ],
    updateReviewComment: [
      "PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}"
    ]
  },
  rateLimit: { get: ["GET /rate_limit"] },
  reactions: {
    createForCommitComment: [
      "POST /repos/{owner}/{repo}/comments/{comment_id}/reactions"
    ],
    createForIssue: [
      "POST /repos/{owner}/{repo}/issues/{issue_number}/reactions"
    ],
    createForIssueComment: [
      "POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions"
    ],
    createForPullRequestReviewComment: [
      "POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions"
    ],
    createForRelease: [
      "POST /repos/{owner}/{repo}/releases/{release_id}/reactions"
    ],
    createForTeamDiscussionCommentInOrg: [
      "POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions"
    ],
    createForTeamDiscussionInOrg: [
      "POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions"
    ],
    deleteForCommitComment: [
      "DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}"
    ],
    deleteForIssue: [
      "DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}"
    ],
    deleteForIssueComment: [
      "DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}"
    ],
    deleteForPullRequestComment: [
      "DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}"
    ],
    deleteForRelease: [
      "DELETE /repos/{owner}/{repo}/releases/{release_id}/reactions/{reaction_id}"
    ],
    deleteForTeamDiscussion: [
      "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions/{reaction_id}"
    ],
    deleteForTeamDiscussionComment: [
      "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}"
    ],
    listForCommitComment: [
      "GET /repos/{owner}/{repo}/comments/{comment_id}/reactions"
    ],
    listForIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/reactions"],
    listForIssueComment: [
      "GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions"
    ],
    listForPullRequestReviewComment: [
      "GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions"
    ],
    listForRelease: [
      "GET /repos/{owner}/{repo}/releases/{release_id}/reactions"
    ],
    listForTeamDiscussionCommentInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions"
    ],
    listForTeamDiscussionInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions"
    ]
  },
  repos: {
    acceptInvitation: [
      "PATCH /user/repository_invitations/{invitation_id}",
      {},
      { renamed: ["repos", "acceptInvitationForAuthenticatedUser"] }
    ],
    acceptInvitationForAuthenticatedUser: [
      "PATCH /user/repository_invitations/{invitation_id}"
    ],
    addAppAccessRestrictions: [
      "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
      {},
      { mapToData: "apps" }
    ],
    addCollaborator: ["PUT /repos/{owner}/{repo}/collaborators/{username}"],
    addStatusCheckContexts: [
      "POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
      {},
      { mapToData: "contexts" }
    ],
    addTeamAccessRestrictions: [
      "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
      {},
      { mapToData: "teams" }
    ],
    addUserAccessRestrictions: [
      "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
      {},
      { mapToData: "users" }
    ],
    checkAutomatedSecurityFixes: [
      "GET /repos/{owner}/{repo}/automated-security-fixes"
    ],
    checkCollaborator: ["GET /repos/{owner}/{repo}/collaborators/{username}"],
    checkVulnerabilityAlerts: [
      "GET /repos/{owner}/{repo}/vulnerability-alerts"
    ],
    codeownersErrors: ["GET /repos/{owner}/{repo}/codeowners/errors"],
    compareCommits: ["GET /repos/{owner}/{repo}/compare/{base}...{head}"],
    compareCommitsWithBasehead: [
      "GET /repos/{owner}/{repo}/compare/{basehead}"
    ],
    createAutolink: ["POST /repos/{owner}/{repo}/autolinks"],
    createCommitComment: [
      "POST /repos/{owner}/{repo}/commits/{commit_sha}/comments"
    ],
    createCommitSignatureProtection: [
      "POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures"
    ],
    createCommitStatus: ["POST /repos/{owner}/{repo}/statuses/{sha}"],
    createDeployKey: ["POST /repos/{owner}/{repo}/keys"],
    createDeployment: ["POST /repos/{owner}/{repo}/deployments"],
    createDeploymentBranchPolicy: [
      "POST /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies"
    ],
    createDeploymentProtectionRule: [
      "POST /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules"
    ],
    createDeploymentStatus: [
      "POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"
    ],
    createDispatchEvent: ["POST /repos/{owner}/{repo}/dispatches"],
    createForAuthenticatedUser: ["POST /user/repos"],
    createFork: ["POST /repos/{owner}/{repo}/forks"],
    createInOrg: ["POST /orgs/{org}/repos"],
    createOrUpdateEnvironment: [
      "PUT /repos/{owner}/{repo}/environments/{environment_name}"
    ],
    createOrUpdateFileContents: ["PUT /repos/{owner}/{repo}/contents/{path}"],
    createOrgRuleset: ["POST /orgs/{org}/rulesets"],
    createPagesDeployment: ["POST /repos/{owner}/{repo}/pages/deployment"],
    createPagesSite: ["POST /repos/{owner}/{repo}/pages"],
    createRelease: ["POST /repos/{owner}/{repo}/releases"],
    createRepoRuleset: ["POST /repos/{owner}/{repo}/rulesets"],
    createTagProtection: ["POST /repos/{owner}/{repo}/tags/protection"],
    createUsingTemplate: [
      "POST /repos/{template_owner}/{template_repo}/generate"
    ],
    createWebhook: ["POST /repos/{owner}/{repo}/hooks"],
    declineInvitation: [
      "DELETE /user/repository_invitations/{invitation_id}",
      {},
      { renamed: ["repos", "declineInvitationForAuthenticatedUser"] }
    ],
    declineInvitationForAuthenticatedUser: [
      "DELETE /user/repository_invitations/{invitation_id}"
    ],
    delete: ["DELETE /repos/{owner}/{repo}"],
    deleteAccessRestrictions: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"
    ],
    deleteAdminBranchProtection: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"
    ],
    deleteAnEnvironment: [
      "DELETE /repos/{owner}/{repo}/environments/{environment_name}"
    ],
    deleteAutolink: ["DELETE /repos/{owner}/{repo}/autolinks/{autolink_id}"],
    deleteBranchProtection: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection"
    ],
    deleteCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}"],
    deleteCommitSignatureProtection: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures"
    ],
    deleteDeployKey: ["DELETE /repos/{owner}/{repo}/keys/{key_id}"],
    deleteDeployment: [
      "DELETE /repos/{owner}/{repo}/deployments/{deployment_id}"
    ],
    deleteDeploymentBranchPolicy: [
      "DELETE /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}"
    ],
    deleteFile: ["DELETE /repos/{owner}/{repo}/contents/{path}"],
    deleteInvitation: [
      "DELETE /repos/{owner}/{repo}/invitations/{invitation_id}"
    ],
    deleteOrgRuleset: ["DELETE /orgs/{org}/rulesets/{ruleset_id}"],
    deletePagesSite: ["DELETE /repos/{owner}/{repo}/pages"],
    deletePullRequestReviewProtection: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"
    ],
    deleteRelease: ["DELETE /repos/{owner}/{repo}/releases/{release_id}"],
    deleteReleaseAsset: [
      "DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}"
    ],
    deleteRepoRuleset: ["DELETE /repos/{owner}/{repo}/rulesets/{ruleset_id}"],
    deleteTagProtection: [
      "DELETE /repos/{owner}/{repo}/tags/protection/{tag_protection_id}"
    ],
    deleteWebhook: ["DELETE /repos/{owner}/{repo}/hooks/{hook_id}"],
    disableAutomatedSecurityFixes: [
      "DELETE /repos/{owner}/{repo}/automated-security-fixes"
    ],
    disableDeploymentProtectionRule: [
      "DELETE /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}"
    ],
    disablePrivateVulnerabilityReporting: [
      "DELETE /repos/{owner}/{repo}/private-vulnerability-reporting"
    ],
    disableVulnerabilityAlerts: [
      "DELETE /repos/{owner}/{repo}/vulnerability-alerts"
    ],
    downloadArchive: [
      "GET /repos/{owner}/{repo}/zipball/{ref}",
      {},
      { renamed: ["repos", "downloadZipballArchive"] }
    ],
    downloadTarballArchive: ["GET /repos/{owner}/{repo}/tarball/{ref}"],
    downloadZipballArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}"],
    enableAutomatedSecurityFixes: [
      "PUT /repos/{owner}/{repo}/automated-security-fixes"
    ],
    enablePrivateVulnerabilityReporting: [
      "PUT /repos/{owner}/{repo}/private-vulnerability-reporting"
    ],
    enableVulnerabilityAlerts: [
      "PUT /repos/{owner}/{repo}/vulnerability-alerts"
    ],
    generateReleaseNotes: [
      "POST /repos/{owner}/{repo}/releases/generate-notes"
    ],
    get: ["GET /repos/{owner}/{repo}"],
    getAccessRestrictions: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"
    ],
    getAdminBranchProtection: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"
    ],
    getAllDeploymentProtectionRules: [
      "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules"
    ],
    getAllEnvironments: ["GET /repos/{owner}/{repo}/environments"],
    getAllStatusCheckContexts: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts"
    ],
    getAllTopics: ["GET /repos/{owner}/{repo}/topics"],
    getAppsWithAccessToProtectedBranch: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps"
    ],
    getAutolink: ["GET /repos/{owner}/{repo}/autolinks/{autolink_id}"],
    getBranch: ["GET /repos/{owner}/{repo}/branches/{branch}"],
    getBranchProtection: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection"
    ],
    getBranchRules: ["GET /repos/{owner}/{repo}/rules/branches/{branch}"],
    getClones: ["GET /repos/{owner}/{repo}/traffic/clones"],
    getCodeFrequencyStats: ["GET /repos/{owner}/{repo}/stats/code_frequency"],
    getCollaboratorPermissionLevel: [
      "GET /repos/{owner}/{repo}/collaborators/{username}/permission"
    ],
    getCombinedStatusForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/status"],
    getCommit: ["GET /repos/{owner}/{repo}/commits/{ref}"],
    getCommitActivityStats: ["GET /repos/{owner}/{repo}/stats/commit_activity"],
    getCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}"],
    getCommitSignatureProtection: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures"
    ],
    getCommunityProfileMetrics: ["GET /repos/{owner}/{repo}/community/profile"],
    getContent: ["GET /repos/{owner}/{repo}/contents/{path}"],
    getContributorsStats: ["GET /repos/{owner}/{repo}/stats/contributors"],
    getCustomDeploymentProtectionRule: [
      "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}"
    ],
    getDeployKey: ["GET /repos/{owner}/{repo}/keys/{key_id}"],
    getDeployment: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}"],
    getDeploymentBranchPolicy: [
      "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}"
    ],
    getDeploymentStatus: [
      "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}"
    ],
    getEnvironment: [
      "GET /repos/{owner}/{repo}/environments/{environment_name}"
    ],
    getLatestPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/latest"],
    getLatestRelease: ["GET /repos/{owner}/{repo}/releases/latest"],
    getOrgRuleset: ["GET /orgs/{org}/rulesets/{ruleset_id}"],
    getOrgRulesets: ["GET /orgs/{org}/rulesets"],
    getPages: ["GET /repos/{owner}/{repo}/pages"],
    getPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/{build_id}"],
    getPagesHealthCheck: ["GET /repos/{owner}/{repo}/pages/health"],
    getParticipationStats: ["GET /repos/{owner}/{repo}/stats/participation"],
    getPullRequestReviewProtection: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"
    ],
    getPunchCardStats: ["GET /repos/{owner}/{repo}/stats/punch_card"],
    getReadme: ["GET /repos/{owner}/{repo}/readme"],
    getReadmeInDirectory: ["GET /repos/{owner}/{repo}/readme/{dir}"],
    getRelease: ["GET /repos/{owner}/{repo}/releases/{release_id}"],
    getReleaseAsset: ["GET /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    getReleaseByTag: ["GET /repos/{owner}/{repo}/releases/tags/{tag}"],
    getRepoRuleset: ["GET /repos/{owner}/{repo}/rulesets/{ruleset_id}"],
    getRepoRulesets: ["GET /repos/{owner}/{repo}/rulesets"],
    getStatusChecksProtection: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"
    ],
    getTeamsWithAccessToProtectedBranch: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams"
    ],
    getTopPaths: ["GET /repos/{owner}/{repo}/traffic/popular/paths"],
    getTopReferrers: ["GET /repos/{owner}/{repo}/traffic/popular/referrers"],
    getUsersWithAccessToProtectedBranch: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users"
    ],
    getViews: ["GET /repos/{owner}/{repo}/traffic/views"],
    getWebhook: ["GET /repos/{owner}/{repo}/hooks/{hook_id}"],
    getWebhookConfigForRepo: [
      "GET /repos/{owner}/{repo}/hooks/{hook_id}/config"
    ],
    getWebhookDelivery: [
      "GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}"
    ],
    listActivities: ["GET /repos/{owner}/{repo}/activity"],
    listAutolinks: ["GET /repos/{owner}/{repo}/autolinks"],
    listBranches: ["GET /repos/{owner}/{repo}/branches"],
    listBranchesForHeadCommit: [
      "GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head"
    ],
    listCollaborators: ["GET /repos/{owner}/{repo}/collaborators"],
    listCommentsForCommit: [
      "GET /repos/{owner}/{repo}/commits/{commit_sha}/comments"
    ],
    listCommitCommentsForRepo: ["GET /repos/{owner}/{repo}/comments"],
    listCommitStatusesForRef: [
      "GET /repos/{owner}/{repo}/commits/{ref}/statuses"
    ],
    listCommits: ["GET /repos/{owner}/{repo}/commits"],
    listContributors: ["GET /repos/{owner}/{repo}/contributors"],
    listCustomDeploymentRuleIntegrations: [
      "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps"
    ],
    listDeployKeys: ["GET /repos/{owner}/{repo}/keys"],
    listDeploymentBranchPolicies: [
      "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies"
    ],
    listDeploymentStatuses: [
      "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"
    ],
    listDeployments: ["GET /repos/{owner}/{repo}/deployments"],
    listForAuthenticatedUser: ["GET /user/repos"],
    listForOrg: ["GET /orgs/{org}/repos"],
    listForUser: ["GET /users/{username}/repos"],
    listForks: ["GET /repos/{owner}/{repo}/forks"],
    listInvitations: ["GET /repos/{owner}/{repo}/invitations"],
    listInvitationsForAuthenticatedUser: ["GET /user/repository_invitations"],
    listLanguages: ["GET /repos/{owner}/{repo}/languages"],
    listPagesBuilds: ["GET /repos/{owner}/{repo}/pages/builds"],
    listPublic: ["GET /repositories"],
    listPullRequestsAssociatedWithCommit: [
      "GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls"
    ],
    listReleaseAssets: [
      "GET /repos/{owner}/{repo}/releases/{release_id}/assets"
    ],
    listReleases: ["GET /repos/{owner}/{repo}/releases"],
    listTagProtection: ["GET /repos/{owner}/{repo}/tags/protection"],
    listTags: ["GET /repos/{owner}/{repo}/tags"],
    listTeams: ["GET /repos/{owner}/{repo}/teams"],
    listWebhookDeliveries: [
      "GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries"
    ],
    listWebhooks: ["GET /repos/{owner}/{repo}/hooks"],
    merge: ["POST /repos/{owner}/{repo}/merges"],
    mergeUpstream: ["POST /repos/{owner}/{repo}/merge-upstream"],
    pingWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/pings"],
    redeliverWebhookDelivery: [
      "POST /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}/attempts"
    ],
    removeAppAccessRestrictions: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
      {},
      { mapToData: "apps" }
    ],
    removeCollaborator: [
      "DELETE /repos/{owner}/{repo}/collaborators/{username}"
    ],
    removeStatusCheckContexts: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
      {},
      { mapToData: "contexts" }
    ],
    removeStatusCheckProtection: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"
    ],
    removeTeamAccessRestrictions: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
      {},
      { mapToData: "teams" }
    ],
    removeUserAccessRestrictions: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
      {},
      { mapToData: "users" }
    ],
    renameBranch: ["POST /repos/{owner}/{repo}/branches/{branch}/rename"],
    replaceAllTopics: ["PUT /repos/{owner}/{repo}/topics"],
    requestPagesBuild: ["POST /repos/{owner}/{repo}/pages/builds"],
    setAdminBranchProtection: [
      "POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"
    ],
    setAppAccessRestrictions: [
      "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
      {},
      { mapToData: "apps" }
    ],
    setStatusCheckContexts: [
      "PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
      {},
      { mapToData: "contexts" }
    ],
    setTeamAccessRestrictions: [
      "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
      {},
      { mapToData: "teams" }
    ],
    setUserAccessRestrictions: [
      "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
      {},
      { mapToData: "users" }
    ],
    testPushWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/tests"],
    transfer: ["POST /repos/{owner}/{repo}/transfer"],
    update: ["PATCH /repos/{owner}/{repo}"],
    updateBranchProtection: [
      "PUT /repos/{owner}/{repo}/branches/{branch}/protection"
    ],
    updateCommitComment: ["PATCH /repos/{owner}/{repo}/comments/{comment_id}"],
    updateDeploymentBranchPolicy: [
      "PUT /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}"
    ],
    updateInformationAboutPagesSite: ["PUT /repos/{owner}/{repo}/pages"],
    updateInvitation: [
      "PATCH /repos/{owner}/{repo}/invitations/{invitation_id}"
    ],
    updateOrgRuleset: ["PUT /orgs/{org}/rulesets/{ruleset_id}"],
    updatePullRequestReviewProtection: [
      "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"
    ],
    updateRelease: ["PATCH /repos/{owner}/{repo}/releases/{release_id}"],
    updateReleaseAsset: [
      "PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}"
    ],
    updateRepoRuleset: ["PUT /repos/{owner}/{repo}/rulesets/{ruleset_id}"],
    updateStatusCheckPotection: [
      "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks",
      {},
      { renamed: ["repos", "updateStatusCheckProtection"] }
    ],
    updateStatusCheckProtection: [
      "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"
    ],
    updateWebhook: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}"],
    updateWebhookConfigForRepo: [
      "PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config"
    ],
    uploadReleaseAsset: [
      "POST /repos/{owner}/{repo}/releases/{release_id}/assets{?name,label}",
      { baseUrl: "https://uploads.github.com" }
    ]
  },
  search: {
    code: ["GET /search/code"],
    commits: ["GET /search/commits"],
    issuesAndPullRequests: ["GET /search/issues"],
    labels: ["GET /search/labels"],
    repos: ["GET /search/repositories"],
    topics: ["GET /search/topics"],
    users: ["GET /search/users"]
  },
  secretScanning: {
    getAlert: [
      "GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"
    ],
    listAlertsForEnterprise: [
      "GET /enterprises/{enterprise}/secret-scanning/alerts"
    ],
    listAlertsForOrg: ["GET /orgs/{org}/secret-scanning/alerts"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/secret-scanning/alerts"],
    listLocationsForAlert: [
      "GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations"
    ],
    updateAlert: [
      "PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"
    ]
  },
  securityAdvisories: {
    createPrivateVulnerabilityReport: [
      "POST /repos/{owner}/{repo}/security-advisories/reports"
    ],
    createRepositoryAdvisory: [
      "POST /repos/{owner}/{repo}/security-advisories"
    ],
    createRepositoryAdvisoryCveRequest: [
      "POST /repos/{owner}/{repo}/security-advisories/{ghsa_id}/cve"
    ],
    getGlobalAdvisory: ["GET /advisories/{ghsa_id}"],
    getRepositoryAdvisory: [
      "GET /repos/{owner}/{repo}/security-advisories/{ghsa_id}"
    ],
    listGlobalAdvisories: ["GET /advisories"],
    listOrgRepositoryAdvisories: ["GET /orgs/{org}/security-advisories"],
    listRepositoryAdvisories: ["GET /repos/{owner}/{repo}/security-advisories"],
    updateRepositoryAdvisory: [
      "PATCH /repos/{owner}/{repo}/security-advisories/{ghsa_id}"
    ]
  },
  teams: {
    addOrUpdateMembershipForUserInOrg: [
      "PUT /orgs/{org}/teams/{team_slug}/memberships/{username}"
    ],
    addOrUpdateProjectPermissionsInOrg: [
      "PUT /orgs/{org}/teams/{team_slug}/projects/{project_id}"
    ],
    addOrUpdateRepoPermissionsInOrg: [
      "PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"
    ],
    checkPermissionsForProjectInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/projects/{project_id}"
    ],
    checkPermissionsForRepoInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"
    ],
    create: ["POST /orgs/{org}/teams"],
    createDiscussionCommentInOrg: [
      "POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"
    ],
    createDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions"],
    deleteDiscussionCommentInOrg: [
      "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"
    ],
    deleteDiscussionInOrg: [
      "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"
    ],
    deleteInOrg: ["DELETE /orgs/{org}/teams/{team_slug}"],
    getByName: ["GET /orgs/{org}/teams/{team_slug}"],
    getDiscussionCommentInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"
    ],
    getDiscussionInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"
    ],
    getMembershipForUserInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/memberships/{username}"
    ],
    list: ["GET /orgs/{org}/teams"],
    listChildInOrg: ["GET /orgs/{org}/teams/{team_slug}/teams"],
    listDiscussionCommentsInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"
    ],
    listDiscussionsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions"],
    listForAuthenticatedUser: ["GET /user/teams"],
    listMembersInOrg: ["GET /orgs/{org}/teams/{team_slug}/members"],
    listPendingInvitationsInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/invitations"
    ],
    listProjectsInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects"],
    listReposInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos"],
    removeMembershipForUserInOrg: [
      "DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}"
    ],
    removeProjectInOrg: [
      "DELETE /orgs/{org}/teams/{team_slug}/projects/{project_id}"
    ],
    removeRepoInOrg: [
      "DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"
    ],
    updateDiscussionCommentInOrg: [
      "PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"
    ],
    updateDiscussionInOrg: [
      "PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"
    ],
    updateInOrg: ["PATCH /orgs/{org}/teams/{team_slug}"]
  },
  users: {
    addEmailForAuthenticated: [
      "POST /user/emails",
      {},
      { renamed: ["users", "addEmailForAuthenticatedUser"] }
    ],
    addEmailForAuthenticatedUser: ["POST /user/emails"],
    addSocialAccountForAuthenticatedUser: ["POST /user/social_accounts"],
    block: ["PUT /user/blocks/{username}"],
    checkBlocked: ["GET /user/blocks/{username}"],
    checkFollowingForUser: ["GET /users/{username}/following/{target_user}"],
    checkPersonIsFollowedByAuthenticated: ["GET /user/following/{username}"],
    createGpgKeyForAuthenticated: [
      "POST /user/gpg_keys",
      {},
      { renamed: ["users", "createGpgKeyForAuthenticatedUser"] }
    ],
    createGpgKeyForAuthenticatedUser: ["POST /user/gpg_keys"],
    createPublicSshKeyForAuthenticated: [
      "POST /user/keys",
      {},
      { renamed: ["users", "createPublicSshKeyForAuthenticatedUser"] }
    ],
    createPublicSshKeyForAuthenticatedUser: ["POST /user/keys"],
    createSshSigningKeyForAuthenticatedUser: ["POST /user/ssh_signing_keys"],
    deleteEmailForAuthenticated: [
      "DELETE /user/emails",
      {},
      { renamed: ["users", "deleteEmailForAuthenticatedUser"] }
    ],
    deleteEmailForAuthenticatedUser: ["DELETE /user/emails"],
    deleteGpgKeyForAuthenticated: [
      "DELETE /user/gpg_keys/{gpg_key_id}",
      {},
      { renamed: ["users", "deleteGpgKeyForAuthenticatedUser"] }
    ],
    deleteGpgKeyForAuthenticatedUser: ["DELETE /user/gpg_keys/{gpg_key_id}"],
    deletePublicSshKeyForAuthenticated: [
      "DELETE /user/keys/{key_id}",
      {},
      { renamed: ["users", "deletePublicSshKeyForAuthenticatedUser"] }
    ],
    deletePublicSshKeyForAuthenticatedUser: ["DELETE /user/keys/{key_id}"],
    deleteSocialAccountForAuthenticatedUser: ["DELETE /user/social_accounts"],
    deleteSshSigningKeyForAuthenticatedUser: [
      "DELETE /user/ssh_signing_keys/{ssh_signing_key_id}"
    ],
    follow: ["PUT /user/following/{username}"],
    getAuthenticated: ["GET /user"],
    getByUsername: ["GET /users/{username}"],
    getContextForUser: ["GET /users/{username}/hovercard"],
    getGpgKeyForAuthenticated: [
      "GET /user/gpg_keys/{gpg_key_id}",
      {},
      { renamed: ["users", "getGpgKeyForAuthenticatedUser"] }
    ],
    getGpgKeyForAuthenticatedUser: ["GET /user/gpg_keys/{gpg_key_id}"],
    getPublicSshKeyForAuthenticated: [
      "GET /user/keys/{key_id}",
      {},
      { renamed: ["users", "getPublicSshKeyForAuthenticatedUser"] }
    ],
    getPublicSshKeyForAuthenticatedUser: ["GET /user/keys/{key_id}"],
    getSshSigningKeyForAuthenticatedUser: [
      "GET /user/ssh_signing_keys/{ssh_signing_key_id}"
    ],
    list: ["GET /users"],
    listBlockedByAuthenticated: [
      "GET /user/blocks",
      {},
      { renamed: ["users", "listBlockedByAuthenticatedUser"] }
    ],
    listBlockedByAuthenticatedUser: ["GET /user/blocks"],
    listEmailsForAuthenticated: [
      "GET /user/emails",
      {},
      { renamed: ["users", "listEmailsForAuthenticatedUser"] }
    ],
    listEmailsForAuthenticatedUser: ["GET /user/emails"],
    listFollowedByAuthenticated: [
      "GET /user/following",
      {},
      { renamed: ["users", "listFollowedByAuthenticatedUser"] }
    ],
    listFollowedByAuthenticatedUser: ["GET /user/following"],
    listFollowersForAuthenticatedUser: ["GET /user/followers"],
    listFollowersForUser: ["GET /users/{username}/followers"],
    listFollowingForUser: ["GET /users/{username}/following"],
    listGpgKeysForAuthenticated: [
      "GET /user/gpg_keys",
      {},
      { renamed: ["users", "listGpgKeysForAuthenticatedUser"] }
    ],
    listGpgKeysForAuthenticatedUser: ["GET /user/gpg_keys"],
    listGpgKeysForUser: ["GET /users/{username}/gpg_keys"],
    listPublicEmailsForAuthenticated: [
      "GET /user/public_emails",
      {},
      { renamed: ["users", "listPublicEmailsForAuthenticatedUser"] }
    ],
    listPublicEmailsForAuthenticatedUser: ["GET /user/public_emails"],
    listPublicKeysForUser: ["GET /users/{username}/keys"],
    listPublicSshKeysForAuthenticated: [
      "GET /user/keys",
      {},
      { renamed: ["users", "listPublicSshKeysForAuthenticatedUser"] }
    ],
    listPublicSshKeysForAuthenticatedUser: ["GET /user/keys"],
    listSocialAccountsForAuthenticatedUser: ["GET /user/social_accounts"],
    listSocialAccountsForUser: ["GET /users/{username}/social_accounts"],
    listSshSigningKeysForAuthenticatedUser: ["GET /user/ssh_signing_keys"],
    listSshSigningKeysForUser: ["GET /users/{username}/ssh_signing_keys"],
    setPrimaryEmailVisibilityForAuthenticated: [
      "PATCH /user/email/visibility",
      {},
      { renamed: ["users", "setPrimaryEmailVisibilityForAuthenticatedUser"] }
    ],
    setPrimaryEmailVisibilityForAuthenticatedUser: [
      "PATCH /user/email/visibility"
    ],
    unblock: ["DELETE /user/blocks/{username}"],
    unfollow: ["DELETE /user/following/{username}"],
    updateAuthenticated: ["PATCH /user"]
  }
}, rb = tb, Br = /* @__PURE__ */ new Map();
for (const [A, e] of Object.entries(rb))
  for (const [t, r] of Object.entries(e)) {
    const [s, o, i] = r, [c, g] = s.split(/ /), u = Object.assign(
      {
        method: c,
        url: g
      },
      o
    );
    Br.has(A) || Br.set(A, /* @__PURE__ */ new Map()), Br.get(A).set(t, {
      scope: A,
      methodName: t,
      endpointDefaults: u,
      decorations: i
    });
  }
var sb = {
  has({ scope: A }, e) {
    return Br.get(A).has(e);
  },
  getOwnPropertyDescriptor(A, e) {
    return {
      value: this.get(A, e),
      // ensures method is in the cache
      configurable: !0,
      writable: !0,
      enumerable: !0
    };
  },
  defineProperty(A, e, t) {
    return Object.defineProperty(A.cache, e, t), !0;
  },
  deleteProperty(A, e) {
    return delete A.cache[e], !0;
  },
  ownKeys({ scope: A }) {
    return [...Br.get(A).keys()];
  },
  set(A, e, t) {
    return A.cache[e] = t;
  },
  get({ octokit: A, scope: e, cache: t }, r) {
    if (t[r])
      return t[r];
    const s = Br.get(e).get(r);
    if (!s)
      return;
    const { endpointDefaults: o, decorations: i } = s;
    return i ? t[r] = nb(
      A,
      e,
      r,
      o,
      i
    ) : t[r] = A.request.defaults(o), t[r];
  }
};
function gQ(A) {
  const e = {};
  for (const t of Br.keys())
    e[t] = new Proxy({ octokit: A, scope: t, cache: {} }, sb);
  return e;
}
function nb(A, e, t, r, s) {
  const o = A.request.defaults(r);
  function i(...c) {
    let g = o.endpoint.merge(...c);
    if (s.mapToData)
      return g = Object.assign({}, g, {
        data: g[s.mapToData],
        [s.mapToData]: void 0
      }), o(g);
    if (s.renamed) {
      const [u, l] = s.renamed;
      A.log.warn(
        `octokit.${e}.${t}() has been renamed to octokit.${u}.${l}()`
      );
    }
    if (s.deprecated && A.log.warn(s.deprecated), s.renamedParameters) {
      const u = o.endpoint.merge(...c);
      for (const [l, h] of Object.entries(
        s.renamedParameters
      ))
        l in u && (A.log.warn(
          `"${l}" parameter is deprecated for "octokit.${e}.${t}()". Use "${h}" instead`
        ), h in u || (u[h] = u[l]), delete u[l]);
      return o(u);
    }
    return o(...c);
  }
  return Object.assign(i, o);
}
function lQ(A) {
  return {
    rest: gQ(A)
  };
}
lQ.VERSION = cQ;
function uQ(A) {
  const e = gQ(A);
  return {
    ...e,
    rest: e
  };
}
uQ.VERSION = cQ;
const ob = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  legacyRestEndpointMethods: uQ,
  restEndpointMethods: lQ
}, Symbol.toStringTag, { value: "Module" })), ib = /* @__PURE__ */ Co(ob);
var ab = "9.0.0";
function cb(A) {
  if (!A.data)
    return {
      ...A,
      data: []
    };
  if (!("total_count" in A.data && !("url" in A.data)))
    return A;
  const t = A.data.incomplete_results, r = A.data.repository_selection, s = A.data.total_count;
  delete A.data.incomplete_results, delete A.data.repository_selection, delete A.data.total_count;
  const o = Object.keys(A.data)[0], i = A.data[o];
  return A.data = i, typeof t < "u" && (A.data.incomplete_results = t), typeof r < "u" && (A.data.repository_selection = r), A.data.total_count = s, A;
}
function fc(A, e, t) {
  const r = typeof e == "function" ? e.endpoint(t) : A.request.endpoint(e, t), s = typeof e == "function" ? e : A.request, o = r.method, i = r.headers;
  let c = r.url;
  return {
    [Symbol.asyncIterator]: () => ({
      async next() {
        if (!c)
          return { done: !0 };
        try {
          const g = await s({ method: o, url: c, headers: i }), u = cb(g);
          return c = ((u.headers.link || "").match(
            /<([^>]+)>;\s*rel="next"/
          ) || [])[1], { value: u };
        } catch (g) {
          if (g.status !== 409)
            throw g;
          return c = "", {
            value: {
              status: 200,
              headers: {},
              data: []
            }
          };
        }
      }
    })
  };
}
function EQ(A, e, t, r) {
  return typeof t == "function" && (r = t, t = void 0), hQ(
    A,
    [],
    fc(A, e, t)[Symbol.asyncIterator](),
    r
  );
}
function hQ(A, e, t, r) {
  return t.next().then((s) => {
    if (s.done)
      return e;
    let o = !1;
    function i() {
      o = !0;
    }
    return e = e.concat(
      r ? r(s.value, i) : s.value.data
    ), o ? e : hQ(A, e, t, r);
  });
}
var gb = Object.assign(EQ, {
  iterator: fc
}), QQ = [
  "GET /advisories",
  "GET /app/hook/deliveries",
  "GET /app/installation-requests",
  "GET /app/installations",
  "GET /assignments/{assignment_id}/accepted_assignments",
  "GET /classrooms",
  "GET /classrooms/{classroom_id}/assignments",
  "GET /enterprises/{enterprise}/dependabot/alerts",
  "GET /enterprises/{enterprise}/secret-scanning/alerts",
  "GET /events",
  "GET /gists",
  "GET /gists/public",
  "GET /gists/starred",
  "GET /gists/{gist_id}/comments",
  "GET /gists/{gist_id}/commits",
  "GET /gists/{gist_id}/forks",
  "GET /installation/repositories",
  "GET /issues",
  "GET /licenses",
  "GET /marketplace_listing/plans",
  "GET /marketplace_listing/plans/{plan_id}/accounts",
  "GET /marketplace_listing/stubbed/plans",
  "GET /marketplace_listing/stubbed/plans/{plan_id}/accounts",
  "GET /networks/{owner}/{repo}/events",
  "GET /notifications",
  "GET /organizations",
  "GET /orgs/{org}/actions/cache/usage-by-repository",
  "GET /orgs/{org}/actions/permissions/repositories",
  "GET /orgs/{org}/actions/runners",
  "GET /orgs/{org}/actions/secrets",
  "GET /orgs/{org}/actions/secrets/{secret_name}/repositories",
  "GET /orgs/{org}/actions/variables",
  "GET /orgs/{org}/actions/variables/{name}/repositories",
  "GET /orgs/{org}/blocks",
  "GET /orgs/{org}/code-scanning/alerts",
  "GET /orgs/{org}/codespaces",
  "GET /orgs/{org}/codespaces/secrets",
  "GET /orgs/{org}/codespaces/secrets/{secret_name}/repositories",
  "GET /orgs/{org}/copilot/billing/seats",
  "GET /orgs/{org}/dependabot/alerts",
  "GET /orgs/{org}/dependabot/secrets",
  "GET /orgs/{org}/dependabot/secrets/{secret_name}/repositories",
  "GET /orgs/{org}/events",
  "GET /orgs/{org}/failed_invitations",
  "GET /orgs/{org}/hooks",
  "GET /orgs/{org}/hooks/{hook_id}/deliveries",
  "GET /orgs/{org}/installations",
  "GET /orgs/{org}/invitations",
  "GET /orgs/{org}/invitations/{invitation_id}/teams",
  "GET /orgs/{org}/issues",
  "GET /orgs/{org}/members",
  "GET /orgs/{org}/members/{username}/codespaces",
  "GET /orgs/{org}/migrations",
  "GET /orgs/{org}/migrations/{migration_id}/repositories",
  "GET /orgs/{org}/outside_collaborators",
  "GET /orgs/{org}/packages",
  "GET /orgs/{org}/packages/{package_type}/{package_name}/versions",
  "GET /orgs/{org}/personal-access-token-requests",
  "GET /orgs/{org}/personal-access-token-requests/{pat_request_id}/repositories",
  "GET /orgs/{org}/personal-access-tokens",
  "GET /orgs/{org}/personal-access-tokens/{pat_id}/repositories",
  "GET /orgs/{org}/projects",
  "GET /orgs/{org}/public_members",
  "GET /orgs/{org}/repos",
  "GET /orgs/{org}/rulesets",
  "GET /orgs/{org}/secret-scanning/alerts",
  "GET /orgs/{org}/security-advisories",
  "GET /orgs/{org}/teams",
  "GET /orgs/{org}/teams/{team_slug}/discussions",
  "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments",
  "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions",
  "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions",
  "GET /orgs/{org}/teams/{team_slug}/invitations",
  "GET /orgs/{org}/teams/{team_slug}/members",
  "GET /orgs/{org}/teams/{team_slug}/projects",
  "GET /orgs/{org}/teams/{team_slug}/repos",
  "GET /orgs/{org}/teams/{team_slug}/teams",
  "GET /projects/columns/{column_id}/cards",
  "GET /projects/{project_id}/collaborators",
  "GET /projects/{project_id}/columns",
  "GET /repos/{owner}/{repo}/actions/artifacts",
  "GET /repos/{owner}/{repo}/actions/caches",
  "GET /repos/{owner}/{repo}/actions/organization-secrets",
  "GET /repos/{owner}/{repo}/actions/organization-variables",
  "GET /repos/{owner}/{repo}/actions/runners",
  "GET /repos/{owner}/{repo}/actions/runs",
  "GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts",
  "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/jobs",
  "GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs",
  "GET /repos/{owner}/{repo}/actions/secrets",
  "GET /repos/{owner}/{repo}/actions/variables",
  "GET /repos/{owner}/{repo}/actions/workflows",
  "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs",
  "GET /repos/{owner}/{repo}/activity",
  "GET /repos/{owner}/{repo}/assignees",
  "GET /repos/{owner}/{repo}/branches",
  "GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations",
  "GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs",
  "GET /repos/{owner}/{repo}/code-scanning/alerts",
  "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances",
  "GET /repos/{owner}/{repo}/code-scanning/analyses",
  "GET /repos/{owner}/{repo}/codespaces",
  "GET /repos/{owner}/{repo}/codespaces/devcontainers",
  "GET /repos/{owner}/{repo}/codespaces/secrets",
  "GET /repos/{owner}/{repo}/collaborators",
  "GET /repos/{owner}/{repo}/comments",
  "GET /repos/{owner}/{repo}/comments/{comment_id}/reactions",
  "GET /repos/{owner}/{repo}/commits",
  "GET /repos/{owner}/{repo}/commits/{commit_sha}/comments",
  "GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls",
  "GET /repos/{owner}/{repo}/commits/{ref}/check-runs",
  "GET /repos/{owner}/{repo}/commits/{ref}/check-suites",
  "GET /repos/{owner}/{repo}/commits/{ref}/status",
  "GET /repos/{owner}/{repo}/commits/{ref}/statuses",
  "GET /repos/{owner}/{repo}/contributors",
  "GET /repos/{owner}/{repo}/dependabot/alerts",
  "GET /repos/{owner}/{repo}/dependabot/secrets",
  "GET /repos/{owner}/{repo}/deployments",
  "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses",
  "GET /repos/{owner}/{repo}/environments",
  "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies",
  "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps",
  "GET /repos/{owner}/{repo}/events",
  "GET /repos/{owner}/{repo}/forks",
  "GET /repos/{owner}/{repo}/hooks",
  "GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries",
  "GET /repos/{owner}/{repo}/invitations",
  "GET /repos/{owner}/{repo}/issues",
  "GET /repos/{owner}/{repo}/issues/comments",
  "GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions",
  "GET /repos/{owner}/{repo}/issues/events",
  "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
  "GET /repos/{owner}/{repo}/issues/{issue_number}/events",
  "GET /repos/{owner}/{repo}/issues/{issue_number}/labels",
  "GET /repos/{owner}/{repo}/issues/{issue_number}/reactions",
  "GET /repos/{owner}/{repo}/issues/{issue_number}/timeline",
  "GET /repos/{owner}/{repo}/keys",
  "GET /repos/{owner}/{repo}/labels",
  "GET /repos/{owner}/{repo}/milestones",
  "GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels",
  "GET /repos/{owner}/{repo}/notifications",
  "GET /repos/{owner}/{repo}/pages/builds",
  "GET /repos/{owner}/{repo}/projects",
  "GET /repos/{owner}/{repo}/pulls",
  "GET /repos/{owner}/{repo}/pulls/comments",
  "GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions",
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/comments",
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/commits",
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews",
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments",
  "GET /repos/{owner}/{repo}/releases",
  "GET /repos/{owner}/{repo}/releases/{release_id}/assets",
  "GET /repos/{owner}/{repo}/releases/{release_id}/reactions",
  "GET /repos/{owner}/{repo}/rules/branches/{branch}",
  "GET /repos/{owner}/{repo}/rulesets",
  "GET /repos/{owner}/{repo}/secret-scanning/alerts",
  "GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations",
  "GET /repos/{owner}/{repo}/security-advisories",
  "GET /repos/{owner}/{repo}/stargazers",
  "GET /repos/{owner}/{repo}/subscribers",
  "GET /repos/{owner}/{repo}/tags",
  "GET /repos/{owner}/{repo}/teams",
  "GET /repos/{owner}/{repo}/topics",
  "GET /repositories",
  "GET /repositories/{repository_id}/environments/{environment_name}/secrets",
  "GET /repositories/{repository_id}/environments/{environment_name}/variables",
  "GET /search/code",
  "GET /search/commits",
  "GET /search/issues",
  "GET /search/labels",
  "GET /search/repositories",
  "GET /search/topics",
  "GET /search/users",
  "GET /teams/{team_id}/discussions",
  "GET /teams/{team_id}/discussions/{discussion_number}/comments",
  "GET /teams/{team_id}/discussions/{discussion_number}/comments/{comment_number}/reactions",
  "GET /teams/{team_id}/discussions/{discussion_number}/reactions",
  "GET /teams/{team_id}/invitations",
  "GET /teams/{team_id}/members",
  "GET /teams/{team_id}/projects",
  "GET /teams/{team_id}/repos",
  "GET /teams/{team_id}/teams",
  "GET /user/blocks",
  "GET /user/codespaces",
  "GET /user/codespaces/secrets",
  "GET /user/emails",
  "GET /user/followers",
  "GET /user/following",
  "GET /user/gpg_keys",
  "GET /user/installations",
  "GET /user/installations/{installation_id}/repositories",
  "GET /user/issues",
  "GET /user/keys",
  "GET /user/marketplace_purchases",
  "GET /user/marketplace_purchases/stubbed",
  "GET /user/memberships/orgs",
  "GET /user/migrations",
  "GET /user/migrations/{migration_id}/repositories",
  "GET /user/orgs",
  "GET /user/packages",
  "GET /user/packages/{package_type}/{package_name}/versions",
  "GET /user/public_emails",
  "GET /user/repos",
  "GET /user/repository_invitations",
  "GET /user/social_accounts",
  "GET /user/ssh_signing_keys",
  "GET /user/starred",
  "GET /user/subscriptions",
  "GET /user/teams",
  "GET /users",
  "GET /users/{username}/events",
  "GET /users/{username}/events/orgs/{org}",
  "GET /users/{username}/events/public",
  "GET /users/{username}/followers",
  "GET /users/{username}/following",
  "GET /users/{username}/gists",
  "GET /users/{username}/gpg_keys",
  "GET /users/{username}/keys",
  "GET /users/{username}/orgs",
  "GET /users/{username}/packages",
  "GET /users/{username}/projects",
  "GET /users/{username}/received_events",
  "GET /users/{username}/received_events/public",
  "GET /users/{username}/repos",
  "GET /users/{username}/social_accounts",
  "GET /users/{username}/ssh_signing_keys",
  "GET /users/{username}/starred",
  "GET /users/{username}/subscriptions"
];
function lb(A) {
  return typeof A == "string" ? QQ.includes(A) : !1;
}
function CQ(A) {
  return {
    paginate: Object.assign(EQ.bind(null, A), {
      iterator: fc.bind(null, A)
    })
  };
}
CQ.VERSION = ab;
const ub = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  composePaginateRest: gb,
  isPaginatingEndpoint: lb,
  paginateRest: CQ,
  paginatingEndpoints: QQ
}, Symbol.toStringTag, { value: "Module" })), Eb = /* @__PURE__ */ Co(ub);
(function(A) {
  var e = H && H.__createBinding || (Object.create ? function(h, E, f, I) {
    I === void 0 && (I = f);
    var C = Object.getOwnPropertyDescriptor(E, f);
    (!C || ("get" in C ? !E.__esModule : C.writable || C.configurable)) && (C = { enumerable: !0, get: function() {
      return E[f];
    } }), Object.defineProperty(h, I, C);
  } : function(h, E, f, I) {
    I === void 0 && (I = f), h[I] = E[f];
  }), t = H && H.__setModuleDefault || (Object.create ? function(h, E) {
    Object.defineProperty(h, "default", { enumerable: !0, value: E });
  } : function(h, E) {
    h.default = E;
  }), r = H && H.__importStar || function(h) {
    if (h && h.__esModule) return h;
    var E = {};
    if (h != null) for (var f in h) f !== "default" && Object.prototype.hasOwnProperty.call(h, f) && e(E, h, f);
    return t(E, h), E;
  };
  Object.defineProperty(A, "__esModule", { value: !0 }), A.getOctokitOptions = A.GitHub = A.defaults = A.context = void 0;
  const s = r(An), o = r(ZA), i = Ab, c = ib, g = Eb;
  A.context = new s.Context();
  const u = o.getApiBaseUrl();
  A.defaults = {
    baseUrl: u,
    request: {
      agent: o.getProxyAgent(u),
      fetch: o.getProxyFetch(u)
    }
  }, A.GitHub = i.Octokit.plugin(c.restEndpointMethods, g.paginateRest).defaults(A.defaults);
  function l(h, E) {
    const f = Object.assign({}, E || {}), I = o.getAuthString(h, f);
    return I && (f.auth = I), f;
  }
  A.getOctokitOptions = l;
})(xh);
var hb = H && H.__createBinding || (Object.create ? function(A, e, t, r) {
  r === void 0 && (r = t);
  var s = Object.getOwnPropertyDescriptor(e, t);
  (!s || ("get" in s ? !e.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(A, r, s);
} : function(A, e, t, r) {
  r === void 0 && (r = t), A[r] = e[t];
}), Qb = H && H.__setModuleDefault || (Object.create ? function(A, e) {
  Object.defineProperty(A, "default", { enumerable: !0, value: e });
} : function(A, e) {
  A.default = e;
}), Cb = H && H.__importStar || function(A) {
  if (A && A.__esModule) return A;
  var e = {};
  if (A != null) for (var t in A) t !== "default" && Object.prototype.hasOwnProperty.call(A, t) && hb(e, A, t);
  return Qb(e, A), e;
};
Object.defineProperty(Et, "__esModule", { value: !0 });
Et.getOctokit = Et.context = void 0;
const db = Cb(An), Pu = xh;
Et.context = new db.Context();
function Bb(A, e, ...t) {
  const r = Pu.GitHub.plugin(...t);
  return new r((0, Pu.getOctokitOptions)(A, e));
}
Et.getOctokit = Bb;
function Ib(A) {
  if (!/^data:/i.test(A))
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  A = A.replace(/\r?\n/g, "");
  const e = A.indexOf(",");
  if (e === -1 || e <= 4)
    throw new TypeError("malformed data: URI");
  const t = A.substring(5, e).split(";");
  let r = "", s = !1;
  const o = t[0] || "text/plain";
  let i = o;
  for (let l = 1; l < t.length; l++)
    t[l] === "base64" ? s = !0 : t[l] && (i += `;${t[l]}`, t[l].indexOf("charset=") === 0 && (r = t[l].substring(8)));
  !t[0] && !r.length && (i += ";charset=US-ASCII", r = "US-ASCII");
  const c = s ? "base64" : "ascii", g = unescape(A.substring(e + 1)), u = Buffer.from(g, c);
  return u.type = o, u.typeFull = i, u.charset = r, u;
}
var $n = { exports: {} }, Ju;
function fb() {
  return Ju || (Ju = 1, function(A, e) {
    (function(t, r) {
      r(e);
    })(H, function(t) {
      const r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol : (n) => `Symbol(${n})`;
      function s() {
      }
      function o() {
        if (typeof self < "u")
          return self;
        if (typeof window < "u")
          return window;
        if (typeof H < "u")
          return H;
      }
      const i = o();
      function c(n) {
        return typeof n == "object" && n !== null || typeof n == "function";
      }
      const g = s, u = Promise, l = Promise.prototype.then, h = Promise.resolve.bind(u), E = Promise.reject.bind(u);
      function f(n) {
        return new u(n);
      }
      function I(n) {
        return h(n);
      }
      function C(n) {
        return E(n);
      }
      function B(n, a, d) {
        return l.call(n, a, d);
      }
      function p(n, a, d) {
        B(B(n, a, d), void 0, g);
      }
      function Q(n, a) {
        p(n, a);
      }
      function m(n, a) {
        p(n, void 0, a);
      }
      function w(n, a, d) {
        return B(n, a, d);
      }
      function y(n) {
        B(n, void 0, g);
      }
      const b = (() => {
        const n = i && i.queueMicrotask;
        if (typeof n == "function")
          return n;
        const a = I(void 0);
        return (d) => B(a, d);
      })();
      function S(n, a, d) {
        if (typeof n != "function")
          throw new TypeError("Argument is not a function");
        return Function.prototype.apply.call(n, a, d);
      }
      function D(n, a, d) {
        try {
          return I(S(n, a, d));
        } catch (R) {
          return C(R);
        }
      }
      const N = 16384;
      class v {
        constructor() {
          this._cursor = 0, this._size = 0, this._front = {
            _elements: [],
            _next: void 0
          }, this._back = this._front, this._cursor = 0, this._size = 0;
        }
        get length() {
          return this._size;
        }
        // For exception safety, this method is structured in order:
        // 1. Read state
        // 2. Calculate required state mutations
        // 3. Perform state mutations
        push(a) {
          const d = this._back;
          let R = d;
          d._elements.length === N - 1 && (R = {
            _elements: [],
            _next: void 0
          }), d._elements.push(a), R !== d && (this._back = R, d._next = R), ++this._size;
        }
        // Like push(), shift() follows the read -> calculate -> mutate pattern for
        // exception safety.
        shift() {
          const a = this._front;
          let d = a;
          const R = this._cursor;
          let k = R + 1;
          const Y = a._elements, x = Y[R];
          return k === N && (d = a._next, k = 0), --this._size, this._cursor = k, a !== d && (this._front = d), Y[R] = void 0, x;
        }
        // The tricky thing about forEach() is that it can be called
        // re-entrantly. The queue may be mutated inside the callback. It is easy to
        // see that push() within the callback has no negative effects since the end
        // of the queue is checked for on every iteration. If shift() is called
        // repeatedly within the callback then the next iteration may return an
        // element that has been removed. In this case the callback will be called
        // with undefined values until we either "catch up" with elements that still
        // exist or reach the back of the queue.
        forEach(a) {
          let d = this._cursor, R = this._front, k = R._elements;
          for (; (d !== k.length || R._next !== void 0) && !(d === k.length && (R = R._next, k = R._elements, d = 0, k.length === 0)); )
            a(k[d]), ++d;
        }
        // Return the element that would be returned if shift() was called now,
        // without modifying the queue.
        peek() {
          const a = this._front, d = this._cursor;
          return a._elements[d];
        }
      }
      function _(n, a) {
        n._ownerReadableStream = a, a._reader = n, a._state === "readable" ? ee(n) : a._state === "closed" ? ge(n) : te(n, a._storedError);
      }
      function U(n, a) {
        const d = n._ownerReadableStream;
        return et(d, a);
      }
      function z(n) {
        n._ownerReadableStream._state === "readable" ? ne(n, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")) : Qe(n, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")), n._ownerReadableStream._reader = void 0, n._ownerReadableStream = void 0;
      }
      function P(n) {
        return new TypeError("Cannot " + n + " a stream using a released reader");
      }
      function ee(n) {
        n._closedPromise = f((a, d) => {
          n._closedPromise_resolve = a, n._closedPromise_reject = d;
        });
      }
      function te(n, a) {
        ee(n), ne(n, a);
      }
      function ge(n) {
        ee(n), W(n);
      }
      function ne(n, a) {
        n._closedPromise_reject !== void 0 && (y(n._closedPromise), n._closedPromise_reject(a), n._closedPromise_resolve = void 0, n._closedPromise_reject = void 0);
      }
      function Qe(n, a) {
        te(n, a);
      }
      function W(n) {
        n._closedPromise_resolve !== void 0 && (n._closedPromise_resolve(void 0), n._closedPromise_resolve = void 0, n._closedPromise_reject = void 0);
      }
      const oe = r("[[AbortSteps]]"), le = r("[[ErrorSteps]]"), M = r("[[CancelSteps]]"), L = r("[[PullSteps]]"), q = Number.isFinite || function(n) {
        return typeof n == "number" && isFinite(n);
      }, K = Math.trunc || function(n) {
        return n < 0 ? Math.ceil(n) : Math.floor(n);
      };
      function Ae(n) {
        return typeof n == "object" || typeof n == "function";
      }
      function $(n, a) {
        if (n !== void 0 && !Ae(n))
          throw new TypeError(`${a} is not an object.`);
      }
      function Z(n, a) {
        if (typeof n != "function")
          throw new TypeError(`${a} is not a function.`);
      }
      function J(n) {
        return typeof n == "object" && n !== null || typeof n == "function";
      }
      function he(n, a) {
        if (!J(n))
          throw new TypeError(`${a} is not an object.`);
      }
      function we(n, a, d) {
        if (n === void 0)
          throw new TypeError(`Parameter ${a} is required in '${d}'.`);
      }
      function fe(n, a, d) {
        if (n === void 0)
          throw new TypeError(`${a} is required in '${d}'.`);
      }
      function Ye(n) {
        return Number(n);
      }
      function Ue(n) {
        return n === 0 ? 0 : n;
      }
      function Pe(n) {
        return Ue(K(n));
      }
      function Ve(n, a) {
        const R = Number.MAX_SAFE_INTEGER;
        let k = Number(n);
        if (k = Ue(k), !q(k))
          throw new TypeError(`${a} is not a finite number`);
        if (k = Pe(k), k < 0 || k > R)
          throw new TypeError(`${a} is outside the accepted range of 0 to ${R}, inclusive`);
        return !q(k) || k === 0 ? 0 : k;
      }
      function me(n, a) {
        if (!vt(n))
          throw new TypeError(`${a} is not a ReadableStream.`);
      }
      function Be(n) {
        return new Le(n);
      }
      function Ne(n, a) {
        n._reader._readRequests.push(a);
      }
      function rA(n, a, d) {
        const k = n._reader._readRequests.shift();
        d ? k._closeSteps() : k._chunkSteps(a);
      }
      function $A(n) {
        return n._reader._readRequests.length;
      }
      function be(n) {
        const a = n._reader;
        return !(a === void 0 || !Ze(a));
      }
      class Le {
        constructor(a) {
          if (we(a, 1, "ReadableStreamDefaultReader"), me(a, "First parameter"), Gt(a))
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          _(this, a), this._readRequests = new v();
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed,
         * or rejected if the stream ever errors or the reader's lock is released before the stream finishes closing.
         */
        get closed() {
          return Ze(this) ? this._closedPromise : C(Nt("closed"));
        }
        /**
         * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
         */
        cancel(a = void 0) {
          return Ze(this) ? this._ownerReadableStream === void 0 ? C(P("cancel")) : U(this, a) : C(Nt("cancel"));
        }
        /**
         * Returns a promise that allows access to the next chunk from the stream's internal queue, if available.
         *
         * If reading a chunk causes the queue to become empty, more data will be pulled from the underlying source.
         */
        read() {
          if (!Ze(this))
            return C(Nt("read"));
          if (this._ownerReadableStream === void 0)
            return C(P("read from"));
          let a, d;
          const R = f((Y, x) => {
            a = Y, d = x;
          });
          return VA(this, {
            _chunkSteps: (Y) => a({ value: Y, done: !1 }),
            _closeSteps: () => a({ value: void 0, done: !0 }),
            _errorSteps: (Y) => d(Y)
          }), R;
        }
        /**
         * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
         * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
         * from now on; otherwise, the reader will appear closed.
         *
         * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
         * the reader's {@link ReadableStreamDefaultReader.read | read()} method has not yet been settled. Attempting to
         * do so will throw a `TypeError` and leave the reader locked to the stream.
         */
        releaseLock() {
          if (!Ze(this))
            throw Nt("releaseLock");
          if (this._ownerReadableStream !== void 0) {
            if (this._readRequests.length > 0)
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            z(this);
          }
        }
      }
      Object.defineProperties(Le.prototype, {
        cancel: { enumerable: !0 },
        read: { enumerable: !0 },
        releaseLock: { enumerable: !0 },
        closed: { enumerable: !0 }
      }), typeof r.toStringTag == "symbol" && Object.defineProperty(Le.prototype, r.toStringTag, {
        value: "ReadableStreamDefaultReader",
        configurable: !0
      });
      function Ze(n) {
        return !c(n) || !Object.prototype.hasOwnProperty.call(n, "_readRequests") ? !1 : n instanceof Le;
      }
      function VA(n, a) {
        const d = n._ownerReadableStream;
        d._disturbed = !0, d._state === "closed" ? a._closeSteps() : d._state === "errored" ? a._errorSteps(d._storedError) : d._readableStreamController[L](a);
      }
      function Nt(n) {
        return new TypeError(`ReadableStreamDefaultReader.prototype.${n} can only be used on a ReadableStreamDefaultReader`);
      }
      const F = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
      }).prototype);
      class j {
        constructor(a, d) {
          this._ongoingPromise = void 0, this._isFinished = !1, this._reader = a, this._preventCancel = d;
        }
        next() {
          const a = () => this._nextSteps();
          return this._ongoingPromise = this._ongoingPromise ? w(this._ongoingPromise, a, a) : a(), this._ongoingPromise;
        }
        return(a) {
          const d = () => this._returnSteps(a);
          return this._ongoingPromise ? w(this._ongoingPromise, d, d) : d();
        }
        _nextSteps() {
          if (this._isFinished)
            return Promise.resolve({ value: void 0, done: !0 });
          const a = this._reader;
          if (a._ownerReadableStream === void 0)
            return C(P("iterate"));
          let d, R;
          const k = f((x, ce) => {
            d = x, R = ce;
          });
          return VA(a, {
            _chunkSteps: (x) => {
              this._ongoingPromise = void 0, b(() => d({ value: x, done: !1 }));
            },
            _closeSteps: () => {
              this._ongoingPromise = void 0, this._isFinished = !0, z(a), d({ value: void 0, done: !0 });
            },
            _errorSteps: (x) => {
              this._ongoingPromise = void 0, this._isFinished = !0, z(a), R(x);
            }
          }), k;
        }
        _returnSteps(a) {
          if (this._isFinished)
            return Promise.resolve({ value: a, done: !0 });
          this._isFinished = !0;
          const d = this._reader;
          if (d._ownerReadableStream === void 0)
            return C(P("finish iterating"));
          if (!this._preventCancel) {
            const R = U(d, a);
            return z(d), w(R, () => ({ value: a, done: !0 }));
          }
          return z(d), I({ value: a, done: !0 });
        }
      }
      const re = {
        next() {
          return Re(this) ? this._asyncIteratorImpl.next() : C(We("next"));
        },
        return(n) {
          return Re(this) ? this._asyncIteratorImpl.return(n) : C(We("return"));
        }
      };
      F !== void 0 && Object.setPrototypeOf(re, F);
      function Ce(n, a) {
        const d = Be(n), R = new j(d, a), k = Object.create(re);
        return k._asyncIteratorImpl = R, k;
      }
      function Re(n) {
        if (!c(n) || !Object.prototype.hasOwnProperty.call(n, "_asyncIteratorImpl"))
          return !1;
        try {
          return n._asyncIteratorImpl instanceof j;
        } catch {
          return !1;
        }
      }
      function We(n) {
        return new TypeError(`ReadableStreamAsyncIterator.${n} can only be used on a ReadableSteamAsyncIterator`);
      }
      const sA = Number.isNaN || function(n) {
        return n !== n;
      };
      function Ke(n) {
        return n.slice();
      }
      function gA(n, a, d, R, k) {
        new Uint8Array(n).set(new Uint8Array(d, R, k), a);
      }
      function is(n) {
        return n;
      }
      function It(n) {
        return !1;
      }
      function tn(n, a, d) {
        if (n.slice)
          return n.slice(a, d);
        const R = d - a, k = new ArrayBuffer(R);
        return gA(k, 0, n, a, R), k;
      }
      function as(n) {
        return !(typeof n != "number" || sA(n) || n < 0);
      }
      function cs(n) {
        const a = tn(n.buffer, n.byteOffset, n.byteOffset + n.byteLength);
        return new Uint8Array(a);
      }
      function gs(n) {
        const a = n._queue.shift();
        return n._queueTotalSize -= a.size, n._queueTotalSize < 0 && (n._queueTotalSize = 0), a.value;
      }
      function pr(n, a, d) {
        if (!as(d) || d === 1 / 0)
          throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
        n._queue.push({ value: a, size: d }), n._queueTotalSize += d;
      }
      function Uo(n) {
        return n._queue.peek().value;
      }
      function T(n) {
        n._queue = new v(), n._queueTotalSize = 0;
      }
      class se {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the view for writing in to, or `null` if the BYOB request has already been responded to.
         */
        get view() {
          if (!ae(this))
            throw Lo("view");
          return this._view;
        }
        respond(a) {
          if (!ae(this))
            throw Lo("respond");
          if (we(a, 1, "respond"), a = Ve(a, "First parameter"), this._associatedReadableByteStreamController === void 0)
            throw new TypeError("This BYOB request has been invalidated");
          It(this._view.buffer), GA(this._associatedReadableByteStreamController, a);
        }
        respondWithNewView(a) {
          if (!ae(this))
            throw Lo("respondWithNewView");
          if (we(a, 1, "respondWithNewView"), !ArrayBuffer.isView(a))
            throw new TypeError("You can only respond with array buffer views");
          if (this._associatedReadableByteStreamController === void 0)
            throw new TypeError("This BYOB request has been invalidated");
          It(a.buffer), WA(this._associatedReadableByteStreamController, a);
        }
      }
      Object.defineProperties(se.prototype, {
        respond: { enumerable: !0 },
        respondWithNewView: { enumerable: !0 },
        view: { enumerable: !0 }
      }), typeof r.toStringTag == "symbol" && Object.defineProperty(se.prototype, r.toStringTag, {
        value: "ReadableStreamBYOBRequest",
        configurable: !0
      });
      class V {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the current BYOB pull request, or `null` if there isn't one.
         */
        get byobRequest() {
          if (!O(this))
            throw us("byobRequest");
          return ls(this);
        }
        /**
         * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
         * over-full. An underlying byte source ought to use this information to determine when and how to apply backpressure.
         */
        get desiredSize() {
          if (!O(this))
            throw us("desiredSize");
          return SA(this);
        }
        /**
         * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
         * the stream, but once those are read, the stream will become closed.
         */
        close() {
          if (!O(this))
            throw us("close");
          if (this._closeRequested)
            throw new TypeError("The stream has already been closed; do not close it again!");
          const a = this._controlledReadableByteStream._state;
          if (a !== "readable")
            throw new TypeError(`The stream (in ${a} state) is not in the readable state and cannot be closed`);
          KA(this);
        }
        enqueue(a) {
          if (!O(this))
            throw us("enqueue");
          if (we(a, 1, "enqueue"), !ArrayBuffer.isView(a))
            throw new TypeError("chunk must be an array buffer view");
          if (a.byteLength === 0)
            throw new TypeError("chunk must have non-zero byteLength");
          if (a.buffer.byteLength === 0)
            throw new TypeError("chunk's buffer must have non-zero byteLength");
          if (this._closeRequested)
            throw new TypeError("stream is closed or draining");
          const d = this._controlledReadableByteStream._state;
          if (d !== "readable")
            throw new TypeError(`The stream (in ${d} state) is not in the readable state and cannot be enqueued to`);
          it(this, a);
        }
        /**
         * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
         */
        error(a = void 0) {
          if (!O(this))
            throw us("error");
          uA(this, a);
        }
        /** @internal */
        [M](a) {
          ye(this), T(this);
          const d = this._cancelAlgorithm(a);
          return vA(this), d;
        }
        /** @internal */
        [L](a) {
          const d = this._controlledReadableByteStream;
          if (this._queueTotalSize > 0) {
            const k = this._queue.shift();
            this._queueTotalSize -= k.byteLength, de(this);
            const Y = new Uint8Array(k.buffer, k.byteOffset, k.byteLength);
            a._chunkSteps(Y);
            return;
          }
          const R = this._autoAllocateChunkSize;
          if (R !== void 0) {
            let k;
            try {
              k = new ArrayBuffer(R);
            } catch (x) {
              a._errorSteps(x);
              return;
            }
            const Y = {
              buffer: k,
              bufferByteLength: R,
              byteOffset: 0,
              byteLength: R,
              bytesFilled: 0,
              elementSize: 1,
              viewConstructor: Uint8Array,
              readerType: "default"
            };
            this._pendingPullIntos.push(Y);
          }
          Ne(d, a), X(this);
        }
      }
      Object.defineProperties(V.prototype, {
        close: { enumerable: !0 },
        enqueue: { enumerable: !0 },
        error: { enumerable: !0 },
        byobRequest: { enumerable: !0 },
        desiredSize: { enumerable: !0 }
      }), typeof r.toStringTag == "symbol" && Object.defineProperty(V.prototype, r.toStringTag, {
        value: "ReadableByteStreamController",
        configurable: !0
      });
      function O(n) {
        return !c(n) || !Object.prototype.hasOwnProperty.call(n, "_controlledReadableByteStream") ? !1 : n instanceof V;
      }
      function ae(n) {
        return !c(n) || !Object.prototype.hasOwnProperty.call(n, "_associatedReadableByteStreamController") ? !1 : n instanceof se;
      }
      function X(n) {
        if (!yr(n))
          return;
        if (n._pulling) {
          n._pullAgain = !0;
          return;
        }
        n._pulling = !0;
        const d = n._pullAlgorithm();
        p(d, () => {
          n._pulling = !1, n._pullAgain && (n._pullAgain = !1, X(n));
        }, (R) => {
          uA(n, R);
        });
      }
      function ye(n) {
        lA(n), n._pendingPullIntos = new v();
      }
      function eA(n, a) {
        let d = !1;
        n._state === "closed" && (d = !0);
        const R = dA(a);
        a.readerType === "default" ? rA(n, R, d) : bQ(n, R, d);
      }
      function dA(n) {
        const a = n.bytesFilled, d = n.elementSize;
        return new n.viewConstructor(n.buffer, n.byteOffset, a / d);
      }
      function _e(n, a, d, R) {
        n._queue.push({ buffer: a, byteOffset: d, byteLength: R }), n._queueTotalSize += R;
      }
      function XA(n, a) {
        const d = a.elementSize, R = a.bytesFilled - a.bytesFilled % d, k = Math.min(n._queueTotalSize, a.byteLength - a.bytesFilled), Y = a.bytesFilled + k, x = Y - Y % d;
        let ce = k, pe = !1;
        x > R && (ce = x - a.bytesFilled, pe = !0);
        const Se = n._queue;
        for (; ce > 0; ) {
          const Fe = Se.peek(), Te = Math.min(ce, Fe.byteLength), AA = a.byteOffset + a.bytesFilled;
          gA(a.buffer, AA, Fe.buffer, Fe.byteOffset, Te), Fe.byteLength === Te ? Se.shift() : (Fe.byteOffset += Te, Fe.byteLength -= Te), n._queueTotalSize -= Te, Xt(n, Te, a), ce -= Te;
        }
        return pe;
      }
      function Xt(n, a, d) {
        d.bytesFilled += a;
      }
      function de(n) {
        n._queueTotalSize === 0 && n._closeRequested ? (vA(n), fs(n._controlledReadableByteStream)) : X(n);
      }
      function lA(n) {
        n._byobRequest !== null && (n._byobRequest._associatedReadableByteStreamController = void 0, n._byobRequest._view = null, n._byobRequest = null);
      }
      function _A(n) {
        for (; n._pendingPullIntos.length > 0; ) {
          if (n._queueTotalSize === 0)
            return;
          const a = n._pendingPullIntos.peek();
          XA(n, a) && (Ut(n), eA(n._controlledReadableByteStream, a));
        }
      }
      function nA(n, a, d) {
        const R = n._controlledReadableByteStream;
        let k = 1;
        a.constructor !== DataView && (k = a.constructor.BYTES_PER_ELEMENT);
        const Y = a.constructor, x = a.buffer, ce = {
          buffer: x,
          bufferByteLength: x.byteLength,
          byteOffset: a.byteOffset,
          byteLength: a.byteLength,
          bytesFilled: 0,
          elementSize: k,
          viewConstructor: Y,
          readerType: "byob"
        };
        if (n._pendingPullIntos.length > 0) {
          n._pendingPullIntos.push(ce), yc(R, d);
          return;
        }
        if (R._state === "closed") {
          const pe = new Y(ce.buffer, ce.byteOffset, 0);
          d._closeSteps(pe);
          return;
        }
        if (n._queueTotalSize > 0) {
          if (XA(n, ce)) {
            const pe = dA(ce);
            de(n), d._chunkSteps(pe);
            return;
          }
          if (n._closeRequested) {
            const pe = new TypeError("Insufficient bytes to fill elements in the given buffer");
            uA(n, pe), d._errorSteps(pe);
            return;
          }
        }
        n._pendingPullIntos.push(ce), yc(R, d), X(n);
      }
      function mr(n, a) {
        const d = n._controlledReadableByteStream;
        if (_o(d))
          for (; wc(d) > 0; ) {
            const R = Ut(n);
            eA(d, R);
          }
      }
      function xe(n, a, d) {
        if (Xt(n, a, d), d.bytesFilled < d.elementSize)
          return;
        Ut(n);
        const R = d.bytesFilled % d.elementSize;
        if (R > 0) {
          const k = d.byteOffset + d.bytesFilled, Y = tn(d.buffer, k - R, k);
          _e(n, Y, 0, Y.byteLength);
        }
        d.bytesFilled -= R, eA(n._controlledReadableByteStream, d), _A(n);
      }
      function oA(n, a) {
        const d = n._pendingPullIntos.peek();
        lA(n), n._controlledReadableByteStream._state === "closed" ? mr(n) : xe(n, a, d), X(n);
      }
      function Ut(n) {
        return n._pendingPullIntos.shift();
      }
      function yr(n) {
        const a = n._controlledReadableByteStream;
        return a._state !== "readable" || n._closeRequested || !n._started ? !1 : !!(be(a) && $A(a) > 0 || _o(a) && wc(a) > 0 || SA(n) > 0);
      }
      function vA(n) {
        n._pullAlgorithm = void 0, n._cancelAlgorithm = void 0;
      }
      function KA(n) {
        const a = n._controlledReadableByteStream;
        if (!(n._closeRequested || a._state !== "readable")) {
          if (n._queueTotalSize > 0) {
            n._closeRequested = !0;
            return;
          }
          if (n._pendingPullIntos.length > 0 && n._pendingPullIntos.peek().bytesFilled > 0) {
            const R = new TypeError("Insufficient bytes to fill elements in the given buffer");
            throw uA(n, R), R;
          }
          vA(n), fs(a);
        }
      }
      function it(n, a) {
        const d = n._controlledReadableByteStream;
        if (n._closeRequested || d._state !== "readable")
          return;
        const R = a.buffer, k = a.byteOffset, Y = a.byteLength, x = R;
        if (n._pendingPullIntos.length > 0) {
          const ce = n._pendingPullIntos.peek();
          It(ce.buffer), ce.buffer = ce.buffer;
        }
        if (lA(n), be(d))
          if ($A(d) === 0)
            _e(n, x, k, Y);
          else {
            n._pendingPullIntos.length > 0 && Ut(n);
            const ce = new Uint8Array(x, k, Y);
            rA(d, ce, !1);
          }
        else _o(d) ? (_e(n, x, k, Y), _A(n)) : _e(n, x, k, Y);
        X(n);
      }
      function uA(n, a) {
        const d = n._controlledReadableByteStream;
        d._state === "readable" && (ye(n), T(n), vA(n), jc(d, a));
      }
      function ls(n) {
        if (n._byobRequest === null && n._pendingPullIntos.length > 0) {
          const a = n._pendingPullIntos.peek(), d = new Uint8Array(a.buffer, a.byteOffset + a.bytesFilled, a.byteLength - a.bytesFilled), R = Object.create(se.prototype);
          wQ(R, n, d), n._byobRequest = R;
        }
        return n._byobRequest;
      }
      function SA(n) {
        const a = n._controlledReadableByteStream._state;
        return a === "errored" ? null : a === "closed" ? 0 : n._strategyHWM - n._queueTotalSize;
      }
      function GA(n, a) {
        const d = n._pendingPullIntos.peek();
        if (n._controlledReadableByteStream._state === "closed") {
          if (a !== 0)
            throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
        } else {
          if (a === 0)
            throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
          if (d.bytesFilled + a > d.byteLength)
            throw new RangeError("bytesWritten out of range");
        }
        d.buffer = d.buffer, oA(n, a);
      }
      function WA(n, a) {
        const d = n._pendingPullIntos.peek();
        if (n._controlledReadableByteStream._state === "closed") {
          if (a.byteLength !== 0)
            throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
        } else if (a.byteLength === 0)
          throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
        if (d.byteOffset + d.bytesFilled !== a.byteOffset)
          throw new RangeError("The region specified by view does not match byobRequest");
        if (d.bufferByteLength !== a.buffer.byteLength)
          throw new RangeError("The buffer of view has different capacity than byobRequest");
        if (d.bytesFilled + a.byteLength > d.byteLength)
          throw new RangeError("The region specified by view is larger than byobRequest");
        const k = a.byteLength;
        d.buffer = a.buffer, oA(n, k);
      }
      function wr(n, a, d, R, k, Y, x) {
        a._controlledReadableByteStream = n, a._pullAgain = !1, a._pulling = !1, a._byobRequest = null, a._queue = a._queueTotalSize = void 0, T(a), a._closeRequested = !1, a._started = !1, a._strategyHWM = Y, a._pullAlgorithm = R, a._cancelAlgorithm = k, a._autoAllocateChunkSize = x, a._pendingPullIntos = new v(), n._readableStreamController = a;
        const ce = d();
        p(I(ce), () => {
          a._started = !0, X(a);
        }, (pe) => {
          uA(a, pe);
        });
      }
      function yQ(n, a, d) {
        const R = Object.create(V.prototype);
        let k = () => {
        }, Y = () => I(void 0), x = () => I(void 0);
        a.start !== void 0 && (k = () => a.start(R)), a.pull !== void 0 && (Y = () => a.pull(R)), a.cancel !== void 0 && (x = (pe) => a.cancel(pe));
        const ce = a.autoAllocateChunkSize;
        if (ce === 0)
          throw new TypeError("autoAllocateChunkSize must be greater than 0");
        wr(n, R, k, Y, x, d, ce);
      }
      function wQ(n, a, d) {
        n._associatedReadableByteStreamController = a, n._view = d;
      }
      function Lo(n) {
        return new TypeError(`ReadableStreamBYOBRequest.prototype.${n} can only be used on a ReadableStreamBYOBRequest`);
      }
      function us(n) {
        return new TypeError(`ReadableByteStreamController.prototype.${n} can only be used on a ReadableByteStreamController`);
      }
      function mc(n) {
        return new Es(n);
      }
      function yc(n, a) {
        n._reader._readIntoRequests.push(a);
      }
      function bQ(n, a, d) {
        const k = n._reader._readIntoRequests.shift();
        d ? k._closeSteps(a) : k._chunkSteps(a);
      }
      function wc(n) {
        return n._reader._readIntoRequests.length;
      }
      function _o(n) {
        const a = n._reader;
        return !(a === void 0 || !Kt(a));
      }
      class Es {
        constructor(a) {
          if (we(a, 1, "ReadableStreamBYOBReader"), me(a, "First parameter"), Gt(a))
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          if (!O(a._readableStreamController))
            throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
          _(this, a), this._readIntoRequests = new v();
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
         * the reader's lock is released before the stream finishes closing.
         */
        get closed() {
          return Kt(this) ? this._closedPromise : C(rn("closed"));
        }
        /**
         * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
         */
        cancel(a = void 0) {
          return Kt(this) ? this._ownerReadableStream === void 0 ? C(P("cancel")) : U(this, a) : C(rn("cancel"));
        }
        /**
         * Attempts to reads bytes into view, and returns a promise resolved with the result.
         *
         * If reading a chunk causes the queue to become empty, more data will be pulled from the underlying source.
         */
        read(a) {
          if (!Kt(this))
            return C(rn("read"));
          if (!ArrayBuffer.isView(a))
            return C(new TypeError("view must be an array buffer view"));
          if (a.byteLength === 0)
            return C(new TypeError("view must have non-zero byteLength"));
          if (a.buffer.byteLength === 0)
            return C(new TypeError("view's buffer must have non-zero byteLength"));
          if (It(a.buffer), this._ownerReadableStream === void 0)
            return C(P("read from"));
          let d, R;
          const k = f((x, ce) => {
            d = x, R = ce;
          });
          return bc(this, a, {
            _chunkSteps: (x) => d({ value: x, done: !1 }),
            _closeSteps: (x) => d({ value: x, done: !0 }),
            _errorSteps: (x) => R(x)
          }), k;
        }
        /**
         * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
         * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
         * from now on; otherwise, the reader will appear closed.
         *
         * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
         * the reader's {@link ReadableStreamBYOBReader.read | read()} method has not yet been settled. Attempting to
         * do so will throw a `TypeError` and leave the reader locked to the stream.
         */
        releaseLock() {
          if (!Kt(this))
            throw rn("releaseLock");
          if (this._ownerReadableStream !== void 0) {
            if (this._readIntoRequests.length > 0)
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            z(this);
          }
        }
      }
      Object.defineProperties(Es.prototype, {
        cancel: { enumerable: !0 },
        read: { enumerable: !0 },
        releaseLock: { enumerable: !0 },
        closed: { enumerable: !0 }
      }), typeof r.toStringTag == "symbol" && Object.defineProperty(Es.prototype, r.toStringTag, {
        value: "ReadableStreamBYOBReader",
        configurable: !0
      });
      function Kt(n) {
        return !c(n) || !Object.prototype.hasOwnProperty.call(n, "_readIntoRequests") ? !1 : n instanceof Es;
      }
      function bc(n, a, d) {
        const R = n._ownerReadableStream;
        R._disturbed = !0, R._state === "errored" ? d._errorSteps(R._storedError) : nA(R._readableStreamController, a, d);
      }
      function rn(n) {
        return new TypeError(`ReadableStreamBYOBReader.prototype.${n} can only be used on a ReadableStreamBYOBReader`);
      }
      function hs(n, a) {
        const { highWaterMark: d } = n;
        if (d === void 0)
          return a;
        if (sA(d) || d < 0)
          throw new RangeError("Invalid highWaterMark");
        return d;
      }
      function sn(n) {
        const { size: a } = n;
        return a || (() => 1);
      }
      function nn(n, a) {
        $(n, a);
        const d = n?.highWaterMark, R = n?.size;
        return {
          highWaterMark: d === void 0 ? void 0 : Ye(d),
          size: R === void 0 ? void 0 : RQ(R, `${a} has member 'size' that`)
        };
      }
      function RQ(n, a) {
        return Z(n, a), (d) => Ye(n(d));
      }
      function DQ(n, a) {
        $(n, a);
        const d = n?.abort, R = n?.close, k = n?.start, Y = n?.type, x = n?.write;
        return {
          abort: d === void 0 ? void 0 : SQ(d, n, `${a} has member 'abort' that`),
          close: R === void 0 ? void 0 : kQ(R, n, `${a} has member 'close' that`),
          start: k === void 0 ? void 0 : FQ(k, n, `${a} has member 'start' that`),
          write: x === void 0 ? void 0 : TQ(x, n, `${a} has member 'write' that`),
          type: Y
        };
      }
      function SQ(n, a, d) {
        return Z(n, d), (R) => D(n, a, [R]);
      }
      function kQ(n, a, d) {
        return Z(n, d), () => D(n, a, []);
      }
      function FQ(n, a, d) {
        return Z(n, d), (R) => S(n, a, [R]);
      }
      function TQ(n, a, d) {
        return Z(n, d), (R, k) => D(n, a, [R, k]);
      }
      function Rc(n, a) {
        if (!br(n))
          throw new TypeError(`${a} is not a WritableStream.`);
      }
      function NQ(n) {
        if (typeof n != "object" || n === null)
          return !1;
        try {
          return typeof n.aborted == "boolean";
        } catch {
          return !1;
        }
      }
      const UQ = typeof AbortController == "function";
      function LQ() {
        if (UQ)
          return new AbortController();
      }
      class Qs {
        constructor(a = {}, d = {}) {
          a === void 0 ? a = null : he(a, "First parameter");
          const R = nn(d, "Second parameter"), k = DQ(a, "First parameter");
          if (Sc(this), k.type !== void 0)
            throw new RangeError("Invalid type is specified");
          const x = sn(R), ce = hs(R, 1);
          jQ(this, k, ce, x);
        }
        /**
         * Returns whether or not the writable stream is locked to a writer.
         */
        get locked() {
          if (!br(this))
            throw ln("locked");
          return Rr(this);
        }
        /**
         * Aborts the stream, signaling that the producer can no longer successfully write to the stream and it is to be
         * immediately moved to an errored state, with any queued-up writes discarded. This will also execute any abort
         * mechanism of the underlying sink.
         *
         * The returned promise will fulfill if the stream shuts down successfully, or reject if the underlying sink signaled
         * that there was an error doing so. Additionally, it will reject with a `TypeError` (without attempting to cancel
         * the stream) if the stream is currently locked.
         */
        abort(a = void 0) {
          return br(this) ? Rr(this) ? C(new TypeError("Cannot abort a stream that already has a writer")) : on(this, a) : C(ln("abort"));
        }
        /**
         * Closes the stream. The underlying sink will finish processing any previously-written chunks, before invoking its
         * close behavior. During this time any further attempts to write will fail (without erroring the stream).
         *
         * The method returns a promise that will fulfill if all remaining chunks are successfully written and the stream
         * successfully closes, or rejects if an error is encountered during this process. Additionally, it will reject with
         * a `TypeError` (without attempting to cancel the stream) if the stream is currently locked.
         */
        close() {
          return br(this) ? Rr(this) ? C(new TypeError("Cannot close a stream that already has a writer")) : at(this) ? C(new TypeError("Cannot close an already-closing stream")) : kc(this) : C(ln("close"));
        }
        /**
         * Creates a {@link WritableStreamDefaultWriter | writer} and locks the stream to the new writer. While the stream
         * is locked, no other writer can be acquired until this one is released.
         *
         * This functionality is especially useful for creating abstractions that desire the ability to write to a stream
         * without interruption or interleaving. By getting a writer for the stream, you can ensure nobody else can write at
         * the same time, which would cause the resulting written data to be unpredictable and probably useless.
         */
        getWriter() {
          if (!br(this))
            throw ln("getWriter");
          return Dc(this);
        }
      }
      Object.defineProperties(Qs.prototype, {
        abort: { enumerable: !0 },
        close: { enumerable: !0 },
        getWriter: { enumerable: !0 },
        locked: { enumerable: !0 }
      }), typeof r.toStringTag == "symbol" && Object.defineProperty(Qs.prototype, r.toStringTag, {
        value: "WritableStream",
        configurable: !0
      });
      function Dc(n) {
        return new Cs(n);
      }
      function _Q(n, a, d, R, k = 1, Y = () => 1) {
        const x = Object.create(Qs.prototype);
        Sc(x);
        const ce = Object.create(Dr.prototype);
        return _c(x, ce, n, a, d, R, k, Y), x;
      }
      function Sc(n) {
        n._state = "writable", n._storedError = void 0, n._writer = void 0, n._writableStreamController = void 0, n._writeRequests = new v(), n._inFlightWriteRequest = void 0, n._closeRequest = void 0, n._inFlightCloseRequest = void 0, n._pendingAbortRequest = void 0, n._backpressure = !1;
      }
      function br(n) {
        return !c(n) || !Object.prototype.hasOwnProperty.call(n, "_writableStreamController") ? !1 : n instanceof Qs;
      }
      function Rr(n) {
        return n._writer !== void 0;
      }
      function on(n, a) {
        var d;
        if (n._state === "closed" || n._state === "errored")
          return I(void 0);
        n._writableStreamController._abortReason = a, (d = n._writableStreamController._abortController) === null || d === void 0 || d.abort();
        const R = n._state;
        if (R === "closed" || R === "errored")
          return I(void 0);
        if (n._pendingAbortRequest !== void 0)
          return n._pendingAbortRequest._promise;
        let k = !1;
        R === "erroring" && (k = !0, a = void 0);
        const Y = f((x, ce) => {
          n._pendingAbortRequest = {
            _promise: void 0,
            _resolve: x,
            _reject: ce,
            _reason: a,
            _wasAlreadyErroring: k
          };
        });
        return n._pendingAbortRequest._promise = Y, k || Go(n, a), Y;
      }
      function kc(n) {
        const a = n._state;
        if (a === "closed" || a === "errored")
          return C(new TypeError(`The stream (in ${a} state) is not in the writable state and cannot be closed`));
        const d = f((k, Y) => {
          const x = {
            _resolve: k,
            _reject: Y
          };
          n._closeRequest = x;
        }), R = n._writer;
        return R !== void 0 && n._backpressure && a === "writable" && qo(R), zQ(n._writableStreamController), d;
      }
      function vQ(n) {
        return f((d, R) => {
          const k = {
            _resolve: d,
            _reject: R
          };
          n._writeRequests.push(k);
        });
      }
      function vo(n, a) {
        if (n._state === "writable") {
          Go(n, a);
          return;
        }
        Mo(n);
      }
      function Go(n, a) {
        const d = n._writableStreamController;
        n._state = "erroring", n._storedError = a;
        const R = n._writer;
        R !== void 0 && Tc(R, a), !JQ(n) && d._started && Mo(n);
      }
      function Mo(n) {
        n._state = "errored", n._writableStreamController[le]();
        const a = n._storedError;
        if (n._writeRequests.forEach((k) => {
          k._reject(a);
        }), n._writeRequests = new v(), n._pendingAbortRequest === void 0) {
          an(n);
          return;
        }
        const d = n._pendingAbortRequest;
        if (n._pendingAbortRequest = void 0, d._wasAlreadyErroring) {
          d._reject(a), an(n);
          return;
        }
        const R = n._writableStreamController[oe](d._reason);
        p(R, () => {
          d._resolve(), an(n);
        }, (k) => {
          d._reject(k), an(n);
        });
      }
      function GQ(n) {
        n._inFlightWriteRequest._resolve(void 0), n._inFlightWriteRequest = void 0;
      }
      function MQ(n, a) {
        n._inFlightWriteRequest._reject(a), n._inFlightWriteRequest = void 0, vo(n, a);
      }
      function YQ(n) {
        n._inFlightCloseRequest._resolve(void 0), n._inFlightCloseRequest = void 0, n._state === "erroring" && (n._storedError = void 0, n._pendingAbortRequest !== void 0 && (n._pendingAbortRequest._resolve(), n._pendingAbortRequest = void 0)), n._state = "closed";
        const d = n._writer;
        d !== void 0 && Yc(d);
      }
      function PQ(n, a) {
        n._inFlightCloseRequest._reject(a), n._inFlightCloseRequest = void 0, n._pendingAbortRequest !== void 0 && (n._pendingAbortRequest._reject(a), n._pendingAbortRequest = void 0), vo(n, a);
      }
      function at(n) {
        return !(n._closeRequest === void 0 && n._inFlightCloseRequest === void 0);
      }
      function JQ(n) {
        return !(n._inFlightWriteRequest === void 0 && n._inFlightCloseRequest === void 0);
      }
      function OQ(n) {
        n._inFlightCloseRequest = n._closeRequest, n._closeRequest = void 0;
      }
      function HQ(n) {
        n._inFlightWriteRequest = n._writeRequests.shift();
      }
      function an(n) {
        n._closeRequest !== void 0 && (n._closeRequest._reject(n._storedError), n._closeRequest = void 0);
        const a = n._writer;
        a !== void 0 && Vo(a, n._storedError);
      }
      function Yo(n, a) {
        const d = n._writer;
        d !== void 0 && a !== n._backpressure && (a ? tC(d) : qo(d)), n._backpressure = a;
      }
      class Cs {
        constructor(a) {
          if (we(a, 1, "WritableStreamDefaultWriter"), Rc(a, "First parameter"), Rr(a))
            throw new TypeError("This stream has already been locked for exclusive writing by another writer");
          this._ownerWritableStream = a, a._writer = this;
          const d = a._state;
          if (d === "writable")
            !at(a) && a._backpressure ? En(this) : Pc(this), un(this);
          else if (d === "erroring")
            Wo(this, a._storedError), un(this);
          else if (d === "closed")
            Pc(this), eC(this);
          else {
            const R = a._storedError;
            Wo(this, R), Mc(this, R);
          }
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
         * the writer’s lock is released before the stream finishes closing.
         */
        get closed() {
          return er(this) ? this._closedPromise : C(Ar("closed"));
        }
        /**
         * Returns the desired size to fill the stream’s internal queue. It can be negative, if the queue is over-full.
         * A producer can use this information to determine the right amount of data to write.
         *
         * It will be `null` if the stream cannot be successfully written to (due to either being errored, or having an abort
         * queued up). It will return zero if the stream is closed. And the getter will throw an exception if invoked when
         * the writer’s lock is released.
         */
        get desiredSize() {
          if (!er(this))
            throw Ar("desiredSize");
          if (this._ownerWritableStream === void 0)
            throw ds("desiredSize");
          return xQ(this);
        }
        /**
         * Returns a promise that will be fulfilled when the desired size to fill the stream’s internal queue transitions
         * from non-positive to positive, signaling that it is no longer applying backpressure. Once the desired size dips
         * back to zero or below, the getter will return a new promise that stays pending until the next transition.
         *
         * If the stream becomes errored or aborted, or the writer’s lock is released, the returned promise will become
         * rejected.
         */
        get ready() {
          return er(this) ? this._readyPromise : C(Ar("ready"));
        }
        /**
         * If the reader is active, behaves the same as {@link WritableStream.abort | stream.abort(reason)}.
         */
        abort(a = void 0) {
          return er(this) ? this._ownerWritableStream === void 0 ? C(ds("abort")) : VQ(this, a) : C(Ar("abort"));
        }
        /**
         * If the reader is active, behaves the same as {@link WritableStream.close | stream.close()}.
         */
        close() {
          if (!er(this))
            return C(Ar("close"));
          const a = this._ownerWritableStream;
          return a === void 0 ? C(ds("close")) : at(a) ? C(new TypeError("Cannot close an already-closing stream")) : Fc(this);
        }
        /**
         * Releases the writer’s lock on the corresponding stream. After the lock is released, the writer is no longer active.
         * If the associated stream is errored when the lock is released, the writer will appear errored in the same way from
         * now on; otherwise, the writer will appear closed.
         *
         * Note that the lock can still be released even if some ongoing writes have not yet finished (i.e. even if the
         * promises returned from previous calls to {@link WritableStreamDefaultWriter.write | write()} have not yet settled).
         * It’s not necessary to hold the lock on the writer for the duration of the write; the lock instead simply prevents
         * other producers from writing in an interleaved manner.
         */
        releaseLock() {
          if (!er(this))
            throw Ar("releaseLock");
          this._ownerWritableStream !== void 0 && Nc(this);
        }
        write(a = void 0) {
          return er(this) ? this._ownerWritableStream === void 0 ? C(ds("write to")) : Uc(this, a) : C(Ar("write"));
        }
      }
      Object.defineProperties(Cs.prototype, {
        abort: { enumerable: !0 },
        close: { enumerable: !0 },
        releaseLock: { enumerable: !0 },
        write: { enumerable: !0 },
        closed: { enumerable: !0 },
        desiredSize: { enumerable: !0 },
        ready: { enumerable: !0 }
      }), typeof r.toStringTag == "symbol" && Object.defineProperty(Cs.prototype, r.toStringTag, {
        value: "WritableStreamDefaultWriter",
        configurable: !0
      });
      function er(n) {
        return !c(n) || !Object.prototype.hasOwnProperty.call(n, "_ownerWritableStream") ? !1 : n instanceof Cs;
      }
      function VQ(n, a) {
        const d = n._ownerWritableStream;
        return on(d, a);
      }
      function Fc(n) {
        const a = n._ownerWritableStream;
        return kc(a);
      }
      function WQ(n) {
        const a = n._ownerWritableStream, d = a._state;
        return at(a) || d === "closed" ? I(void 0) : d === "errored" ? C(a._storedError) : Fc(n);
      }
      function qQ(n, a) {
        n._closedPromiseState === "pending" ? Vo(n, a) : AC(n, a);
      }
      function Tc(n, a) {
        n._readyPromiseState === "pending" ? Jc(n, a) : rC(n, a);
      }
      function xQ(n) {
        const a = n._ownerWritableStream, d = a._state;
        return d === "errored" || d === "erroring" ? null : d === "closed" ? 0 : vc(a._writableStreamController);
      }
      function Nc(n) {
        const a = n._ownerWritableStream, d = new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");
        Tc(n, d), qQ(n, d), a._writer = void 0, n._ownerWritableStream = void 0;
      }
      function Uc(n, a) {
        const d = n._ownerWritableStream, R = d._writableStreamController, k = ZQ(R, a);
        if (d !== n._ownerWritableStream)
          return C(ds("write to"));
        const Y = d._state;
        if (Y === "errored")
          return C(d._storedError);
        if (at(d) || Y === "closed")
          return C(new TypeError("The stream is closing or closed and cannot be written to"));
        if (Y === "erroring")
          return C(d._storedError);
        const x = vQ(d);
        return $Q(R, a, k), x;
      }
      const Lc = {};
      class Dr {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * The reason which was passed to `WritableStream.abort(reason)` when the stream was aborted.
         *
         * @deprecated
         *  This property has been removed from the specification, see https://github.com/whatwg/streams/pull/1177.
         *  Use {@link WritableStreamDefaultController.signal}'s `reason` instead.
         */
        get abortReason() {
          if (!Po(this))
            throw Ho("abortReason");
          return this._abortReason;
        }
        /**
         * An `AbortSignal` that can be used to abort the pending write or close operation when the stream is aborted.
         */
        get signal() {
          if (!Po(this))
            throw Ho("signal");
          if (this._abortController === void 0)
            throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
          return this._abortController.signal;
        }
        /**
         * Closes the controlled writable stream, making all future interactions with it fail with the given error `e`.
         *
         * This method is rarely used, since usually it suffices to return a rejected promise from one of the underlying
         * sink's methods. However, it can be useful for suddenly shutting down a stream in response to an event outside the
         * normal lifecycle of interactions with the underlying sink.
         */
        error(a = void 0) {
          if (!Po(this))
            throw Ho("error");
          this._controlledWritableStream._state === "writable" && Gc(this, a);
        }
        /** @internal */
        [oe](a) {
          const d = this._abortAlgorithm(a);
          return cn(this), d;
        }
        /** @internal */
        [le]() {
          T(this);
        }
      }
      Object.defineProperties(Dr.prototype, {
        abortReason: { enumerable: !0 },
        signal: { enumerable: !0 },
        error: { enumerable: !0 }
      }), typeof r.toStringTag == "symbol" && Object.defineProperty(Dr.prototype, r.toStringTag, {
        value: "WritableStreamDefaultController",
        configurable: !0
      });
      function Po(n) {
        return !c(n) || !Object.prototype.hasOwnProperty.call(n, "_controlledWritableStream") ? !1 : n instanceof Dr;
      }
      function _c(n, a, d, R, k, Y, x, ce) {
        a._controlledWritableStream = n, n._writableStreamController = a, a._queue = void 0, a._queueTotalSize = void 0, T(a), a._abortReason = void 0, a._abortController = LQ(), a._started = !1, a._strategySizeAlgorithm = ce, a._strategyHWM = x, a._writeAlgorithm = R, a._closeAlgorithm = k, a._abortAlgorithm = Y;
        const pe = Oo(a);
        Yo(n, pe);
        const Se = d(), Fe = I(Se);
        p(Fe, () => {
          a._started = !0, gn(a);
        }, (Te) => {
          a._started = !0, vo(n, Te);
        });
      }
      function jQ(n, a, d, R) {
        const k = Object.create(Dr.prototype);
        let Y = () => {
        }, x = () => I(void 0), ce = () => I(void 0), pe = () => I(void 0);
        a.start !== void 0 && (Y = () => a.start(k)), a.write !== void 0 && (x = (Se) => a.write(Se, k)), a.close !== void 0 && (ce = () => a.close()), a.abort !== void 0 && (pe = (Se) => a.abort(Se)), _c(n, k, Y, x, ce, pe, d, R);
      }
      function cn(n) {
        n._writeAlgorithm = void 0, n._closeAlgorithm = void 0, n._abortAlgorithm = void 0, n._strategySizeAlgorithm = void 0;
      }
      function zQ(n) {
        pr(n, Lc, 0), gn(n);
      }
      function ZQ(n, a) {
        try {
          return n._strategySizeAlgorithm(a);
        } catch (d) {
          return Jo(n, d), 1;
        }
      }
      function vc(n) {
        return n._strategyHWM - n._queueTotalSize;
      }
      function $Q(n, a, d) {
        try {
          pr(n, a, d);
        } catch (k) {
          Jo(n, k);
          return;
        }
        const R = n._controlledWritableStream;
        if (!at(R) && R._state === "writable") {
          const k = Oo(n);
          Yo(R, k);
        }
        gn(n);
      }
      function gn(n) {
        const a = n._controlledWritableStream;
        if (!n._started || a._inFlightWriteRequest !== void 0)
          return;
        if (a._state === "erroring") {
          Mo(a);
          return;
        }
        if (n._queue.length === 0)
          return;
        const R = Uo(n);
        R === Lc ? XQ(n) : KQ(n, R);
      }
      function Jo(n, a) {
        n._controlledWritableStream._state === "writable" && Gc(n, a);
      }
      function XQ(n) {
        const a = n._controlledWritableStream;
        OQ(a), gs(n);
        const d = n._closeAlgorithm();
        cn(n), p(d, () => {
          YQ(a);
        }, (R) => {
          PQ(a, R);
        });
      }
      function KQ(n, a) {
        const d = n._controlledWritableStream;
        HQ(d);
        const R = n._writeAlgorithm(a);
        p(R, () => {
          GQ(d);
          const k = d._state;
          if (gs(n), !at(d) && k === "writable") {
            const Y = Oo(n);
            Yo(d, Y);
          }
          gn(n);
        }, (k) => {
          d._state === "writable" && cn(n), MQ(d, k);
        });
      }
      function Oo(n) {
        return vc(n) <= 0;
      }
      function Gc(n, a) {
        const d = n._controlledWritableStream;
        cn(n), Go(d, a);
      }
      function ln(n) {
        return new TypeError(`WritableStream.prototype.${n} can only be used on a WritableStream`);
      }
      function Ho(n) {
        return new TypeError(`WritableStreamDefaultController.prototype.${n} can only be used on a WritableStreamDefaultController`);
      }
      function Ar(n) {
        return new TypeError(`WritableStreamDefaultWriter.prototype.${n} can only be used on a WritableStreamDefaultWriter`);
      }
      function ds(n) {
        return new TypeError("Cannot " + n + " a stream using a released writer");
      }
      function un(n) {
        n._closedPromise = f((a, d) => {
          n._closedPromise_resolve = a, n._closedPromise_reject = d, n._closedPromiseState = "pending";
        });
      }
      function Mc(n, a) {
        un(n), Vo(n, a);
      }
      function eC(n) {
        un(n), Yc(n);
      }
      function Vo(n, a) {
        n._closedPromise_reject !== void 0 && (y(n._closedPromise), n._closedPromise_reject(a), n._closedPromise_resolve = void 0, n._closedPromise_reject = void 0, n._closedPromiseState = "rejected");
      }
      function AC(n, a) {
        Mc(n, a);
      }
      function Yc(n) {
        n._closedPromise_resolve !== void 0 && (n._closedPromise_resolve(void 0), n._closedPromise_resolve = void 0, n._closedPromise_reject = void 0, n._closedPromiseState = "resolved");
      }
      function En(n) {
        n._readyPromise = f((a, d) => {
          n._readyPromise_resolve = a, n._readyPromise_reject = d;
        }), n._readyPromiseState = "pending";
      }
      function Wo(n, a) {
        En(n), Jc(n, a);
      }
      function Pc(n) {
        En(n), qo(n);
      }
      function Jc(n, a) {
        n._readyPromise_reject !== void 0 && (y(n._readyPromise), n._readyPromise_reject(a), n._readyPromise_resolve = void 0, n._readyPromise_reject = void 0, n._readyPromiseState = "rejected");
      }
      function tC(n) {
        En(n);
      }
      function rC(n, a) {
        Wo(n, a);
      }
      function qo(n) {
        n._readyPromise_resolve !== void 0 && (n._readyPromise_resolve(void 0), n._readyPromise_resolve = void 0, n._readyPromise_reject = void 0, n._readyPromiseState = "fulfilled");
      }
      const Oc = typeof DOMException < "u" ? DOMException : void 0;
      function sC(n) {
        if (!(typeof n == "function" || typeof n == "object"))
          return !1;
        try {
          return new n(), !0;
        } catch {
          return !1;
        }
      }
      function nC() {
        const n = function(d, R) {
          this.message = d || "", this.name = R || "Error", Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
        };
        return n.prototype = Object.create(Error.prototype), Object.defineProperty(n.prototype, "constructor", { value: n, writable: !0, configurable: !0 }), n;
      }
      const oC = sC(Oc) ? Oc : nC();
      function Hc(n, a, d, R, k, Y) {
        const x = Be(n), ce = Dc(a);
        n._disturbed = !0;
        let pe = !1, Se = I(void 0);
        return f((Fe, Te) => {
          let AA;
          if (Y !== void 0) {
            if (AA = () => {
              const Ee = new oC("Aborted", "AbortError"), De = [];
              R || De.push(() => a._state === "writable" ? on(a, Ee) : I(void 0)), k || De.push(() => n._state === "readable" ? et(n, Ee) : I(void 0)), kA(() => Promise.all(De.map((ve) => ve())), !0, Ee);
            }, Y.aborted) {
              AA();
              return;
            }
            Y.addEventListener("abort", AA);
          }
          function At() {
            return f((Ee, De) => {
              function ve(MA) {
                MA ? Ee() : B(Fr(), ve, De);
              }
              ve(!1);
            });
          }
          function Fr() {
            return pe ? I(!0) : B(ce._readyPromise, () => f((Ee, De) => {
              VA(x, {
                _chunkSteps: (ve) => {
                  Se = B(Uc(ce, ve), void 0, s), Ee(!1);
                },
                _closeSteps: () => Ee(!0),
                _errorSteps: De
              });
            }));
          }
          if (ft(n, x._closedPromise, (Ee) => {
            R ? qA(!0, Ee) : kA(() => on(a, Ee), !0, Ee);
          }), ft(a, ce._closedPromise, (Ee) => {
            k ? qA(!0, Ee) : kA(() => et(n, Ee), !0, Ee);
          }), pA(n, x._closedPromise, () => {
            d ? qA() : kA(() => WQ(ce));
          }), at(a) || a._state === "closed") {
            const Ee = new TypeError("the destination writable stream closed before all data could be piped to it");
            k ? qA(!0, Ee) : kA(() => et(n, Ee), !0, Ee);
          }
          y(At());
          function Mt() {
            const Ee = Se;
            return B(Se, () => Ee !== Se ? Mt() : void 0);
          }
          function ft(Ee, De, ve) {
            Ee._state === "errored" ? ve(Ee._storedError) : m(De, ve);
          }
          function pA(Ee, De, ve) {
            Ee._state === "closed" ? ve() : Q(De, ve);
          }
          function kA(Ee, De, ve) {
            if (pe)
              return;
            pe = !0, a._state === "writable" && !at(a) ? Q(Mt(), MA) : MA();
            function MA() {
              p(Ee(), () => pt(De, ve), (Tr) => pt(!0, Tr));
            }
          }
          function qA(Ee, De) {
            pe || (pe = !0, a._state === "writable" && !at(a) ? Q(Mt(), () => pt(Ee, De)) : pt(Ee, De));
          }
          function pt(Ee, De) {
            Nc(ce), z(x), Y !== void 0 && Y.removeEventListener("abort", AA), Ee ? Te(De) : Fe(void 0);
          }
        });
      }
      class Sr {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
         * over-full. An underlying source ought to use this information to determine when and how to apply backpressure.
         */
        get desiredSize() {
          if (!hn(this))
            throw dn("desiredSize");
          return xo(this);
        }
        /**
         * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
         * the stream, but once those are read, the stream will become closed.
         */
        close() {
          if (!hn(this))
            throw dn("close");
          if (!kr(this))
            throw new TypeError("The stream is not in a state that permits close");
          Is(this);
        }
        enqueue(a = void 0) {
          if (!hn(this))
            throw dn("enqueue");
          if (!kr(this))
            throw new TypeError("The stream is not in a state that permits enqueue");
          return Cn(this, a);
        }
        /**
         * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
         */
        error(a = void 0) {
          if (!hn(this))
            throw dn("error");
          Lt(this, a);
        }
        /** @internal */
        [M](a) {
          T(this);
          const d = this._cancelAlgorithm(a);
          return Qn(this), d;
        }
        /** @internal */
        [L](a) {
          const d = this._controlledReadableStream;
          if (this._queue.length > 0) {
            const R = gs(this);
            this._closeRequested && this._queue.length === 0 ? (Qn(this), fs(d)) : Bs(this), a._chunkSteps(R);
          } else
            Ne(d, a), Bs(this);
        }
      }
      Object.defineProperties(Sr.prototype, {
        close: { enumerable: !0 },
        enqueue: { enumerable: !0 },
        error: { enumerable: !0 },
        desiredSize: { enumerable: !0 }
      }), typeof r.toStringTag == "symbol" && Object.defineProperty(Sr.prototype, r.toStringTag, {
        value: "ReadableStreamDefaultController",
        configurable: !0
      });
      function hn(n) {
        return !c(n) || !Object.prototype.hasOwnProperty.call(n, "_controlledReadableStream") ? !1 : n instanceof Sr;
      }
      function Bs(n) {
        if (!Vc(n))
          return;
        if (n._pulling) {
          n._pullAgain = !0;
          return;
        }
        n._pulling = !0;
        const d = n._pullAlgorithm();
        p(d, () => {
          n._pulling = !1, n._pullAgain && (n._pullAgain = !1, Bs(n));
        }, (R) => {
          Lt(n, R);
        });
      }
      function Vc(n) {
        const a = n._controlledReadableStream;
        return !kr(n) || !n._started ? !1 : !!(Gt(a) && $A(a) > 0 || xo(n) > 0);
      }
      function Qn(n) {
        n._pullAlgorithm = void 0, n._cancelAlgorithm = void 0, n._strategySizeAlgorithm = void 0;
      }
      function Is(n) {
        if (!kr(n))
          return;
        const a = n._controlledReadableStream;
        n._closeRequested = !0, n._queue.length === 0 && (Qn(n), fs(a));
      }
      function Cn(n, a) {
        if (!kr(n))
          return;
        const d = n._controlledReadableStream;
        if (Gt(d) && $A(d) > 0)
          rA(d, a, !1);
        else {
          let R;
          try {
            R = n._strategySizeAlgorithm(a);
          } catch (k) {
            throw Lt(n, k), k;
          }
          try {
            pr(n, a, R);
          } catch (k) {
            throw Lt(n, k), k;
          }
        }
        Bs(n);
      }
      function Lt(n, a) {
        const d = n._controlledReadableStream;
        d._state === "readable" && (T(n), Qn(n), jc(d, a));
      }
      function xo(n) {
        const a = n._controlledReadableStream._state;
        return a === "errored" ? null : a === "closed" ? 0 : n._strategyHWM - n._queueTotalSize;
      }
      function iC(n) {
        return !Vc(n);
      }
      function kr(n) {
        const a = n._controlledReadableStream._state;
        return !n._closeRequested && a === "readable";
      }
      function Wc(n, a, d, R, k, Y, x) {
        a._controlledReadableStream = n, a._queue = void 0, a._queueTotalSize = void 0, T(a), a._started = !1, a._closeRequested = !1, a._pullAgain = !1, a._pulling = !1, a._strategySizeAlgorithm = x, a._strategyHWM = Y, a._pullAlgorithm = R, a._cancelAlgorithm = k, n._readableStreamController = a;
        const ce = d();
        p(I(ce), () => {
          a._started = !0, Bs(a);
        }, (pe) => {
          Lt(a, pe);
        });
      }
      function aC(n, a, d, R) {
        const k = Object.create(Sr.prototype);
        let Y = () => {
        }, x = () => I(void 0), ce = () => I(void 0);
        a.start !== void 0 && (Y = () => a.start(k)), a.pull !== void 0 && (x = () => a.pull(k)), a.cancel !== void 0 && (ce = (pe) => a.cancel(pe)), Wc(n, k, Y, x, ce, d, R);
      }
      function dn(n) {
        return new TypeError(`ReadableStreamDefaultController.prototype.${n} can only be used on a ReadableStreamDefaultController`);
      }
      function cC(n, a) {
        return O(n._readableStreamController) ? lC(n) : gC(n);
      }
      function gC(n, a) {
        const d = Be(n);
        let R = !1, k = !1, Y = !1, x = !1, ce, pe, Se, Fe, Te;
        const AA = f((pA) => {
          Te = pA;
        });
        function At() {
          return R ? (k = !0, I(void 0)) : (R = !0, VA(d, {
            _chunkSteps: (kA) => {
              b(() => {
                k = !1;
                const qA = kA, pt = kA;
                Y || Cn(Se._readableStreamController, qA), x || Cn(Fe._readableStreamController, pt), R = !1, k && At();
              });
            },
            _closeSteps: () => {
              R = !1, Y || Is(Se._readableStreamController), x || Is(Fe._readableStreamController), (!Y || !x) && Te(void 0);
            },
            _errorSteps: () => {
              R = !1;
            }
          }), I(void 0));
        }
        function Fr(pA) {
          if (Y = !0, ce = pA, x) {
            const kA = Ke([ce, pe]), qA = et(n, kA);
            Te(qA);
          }
          return AA;
        }
        function Mt(pA) {
          if (x = !0, pe = pA, Y) {
            const kA = Ke([ce, pe]), qA = et(n, kA);
            Te(qA);
          }
          return AA;
        }
        function ft() {
        }
        return Se = jo(ft, At, Fr), Fe = jo(ft, At, Mt), m(d._closedPromise, (pA) => {
          Lt(Se._readableStreamController, pA), Lt(Fe._readableStreamController, pA), (!Y || !x) && Te(void 0);
        }), [Se, Fe];
      }
      function lC(n) {
        let a = Be(n), d = !1, R = !1, k = !1, Y = !1, x = !1, ce, pe, Se, Fe, Te;
        const AA = f((Ee) => {
          Te = Ee;
        });
        function At(Ee) {
          m(Ee._closedPromise, (De) => {
            Ee === a && (uA(Se._readableStreamController, De), uA(Fe._readableStreamController, De), (!Y || !x) && Te(void 0));
          });
        }
        function Fr() {
          Kt(a) && (z(a), a = Be(n), At(a)), VA(a, {
            _chunkSteps: (De) => {
              b(() => {
                R = !1, k = !1;
                const ve = De;
                let MA = De;
                if (!Y && !x)
                  try {
                    MA = cs(De);
                  } catch (Tr) {
                    uA(Se._readableStreamController, Tr), uA(Fe._readableStreamController, Tr), Te(et(n, Tr));
                    return;
                  }
                Y || it(Se._readableStreamController, ve), x || it(Fe._readableStreamController, MA), d = !1, R ? ft() : k && pA();
              });
            },
            _closeSteps: () => {
              d = !1, Y || KA(Se._readableStreamController), x || KA(Fe._readableStreamController), Se._readableStreamController._pendingPullIntos.length > 0 && GA(Se._readableStreamController, 0), Fe._readableStreamController._pendingPullIntos.length > 0 && GA(Fe._readableStreamController, 0), (!Y || !x) && Te(void 0);
            },
            _errorSteps: () => {
              d = !1;
            }
          });
        }
        function Mt(Ee, De) {
          Ze(a) && (z(a), a = mc(n), At(a));
          const ve = De ? Fe : Se, MA = De ? Se : Fe;
          bc(a, Ee, {
            _chunkSteps: (Nr) => {
              b(() => {
                R = !1, k = !1;
                const Ur = De ? x : Y;
                if (De ? Y : x)
                  Ur || WA(ve._readableStreamController, Nr);
                else {
                  let ig;
                  try {
                    ig = cs(Nr);
                  } catch (Zo) {
                    uA(ve._readableStreamController, Zo), uA(MA._readableStreamController, Zo), Te(et(n, Zo));
                    return;
                  }
                  Ur || WA(ve._readableStreamController, Nr), it(MA._readableStreamController, ig);
                }
                d = !1, R ? ft() : k && pA();
              });
            },
            _closeSteps: (Nr) => {
              d = !1;
              const Ur = De ? x : Y, Rn = De ? Y : x;
              Ur || KA(ve._readableStreamController), Rn || KA(MA._readableStreamController), Nr !== void 0 && (Ur || WA(ve._readableStreamController, Nr), !Rn && MA._readableStreamController._pendingPullIntos.length > 0 && GA(MA._readableStreamController, 0)), (!Ur || !Rn) && Te(void 0);
            },
            _errorSteps: () => {
              d = !1;
            }
          });
        }
        function ft() {
          if (d)
            return R = !0, I(void 0);
          d = !0;
          const Ee = ls(Se._readableStreamController);
          return Ee === null ? Fr() : Mt(Ee._view, !1), I(void 0);
        }
        function pA() {
          if (d)
            return k = !0, I(void 0);
          d = !0;
          const Ee = ls(Fe._readableStreamController);
          return Ee === null ? Fr() : Mt(Ee._view, !0), I(void 0);
        }
        function kA(Ee) {
          if (Y = !0, ce = Ee, x) {
            const De = Ke([ce, pe]), ve = et(n, De);
            Te(ve);
          }
          return AA;
        }
        function qA(Ee) {
          if (x = !0, pe = Ee, Y) {
            const De = Ke([ce, pe]), ve = et(n, De);
            Te(ve);
          }
          return AA;
        }
        function pt() {
        }
        return Se = xc(pt, ft, kA), Fe = xc(pt, pA, qA), At(a), [Se, Fe];
      }
      function uC(n, a) {
        $(n, a);
        const d = n, R = d?.autoAllocateChunkSize, k = d?.cancel, Y = d?.pull, x = d?.start, ce = d?.type;
        return {
          autoAllocateChunkSize: R === void 0 ? void 0 : Ve(R, `${a} has member 'autoAllocateChunkSize' that`),
          cancel: k === void 0 ? void 0 : EC(k, d, `${a} has member 'cancel' that`),
          pull: Y === void 0 ? void 0 : hC(Y, d, `${a} has member 'pull' that`),
          start: x === void 0 ? void 0 : QC(x, d, `${a} has member 'start' that`),
          type: ce === void 0 ? void 0 : CC(ce, `${a} has member 'type' that`)
        };
      }
      function EC(n, a, d) {
        return Z(n, d), (R) => D(n, a, [R]);
      }
      function hC(n, a, d) {
        return Z(n, d), (R) => D(n, a, [R]);
      }
      function QC(n, a, d) {
        return Z(n, d), (R) => S(n, a, [R]);
      }
      function CC(n, a) {
        if (n = `${n}`, n !== "bytes")
          throw new TypeError(`${a} '${n}' is not a valid enumeration value for ReadableStreamType`);
        return n;
      }
      function dC(n, a) {
        $(n, a);
        const d = n?.mode;
        return {
          mode: d === void 0 ? void 0 : BC(d, `${a} has member 'mode' that`)
        };
      }
      function BC(n, a) {
        if (n = `${n}`, n !== "byob")
          throw new TypeError(`${a} '${n}' is not a valid enumeration value for ReadableStreamReaderMode`);
        return n;
      }
      function IC(n, a) {
        return $(n, a), { preventCancel: !!n?.preventCancel };
      }
      function qc(n, a) {
        $(n, a);
        const d = n?.preventAbort, R = n?.preventCancel, k = n?.preventClose, Y = n?.signal;
        return Y !== void 0 && fC(Y, `${a} has member 'signal' that`), {
          preventAbort: !!d,
          preventCancel: !!R,
          preventClose: !!k,
          signal: Y
        };
      }
      function fC(n, a) {
        if (!NQ(n))
          throw new TypeError(`${a} is not an AbortSignal.`);
      }
      function pC(n, a) {
        $(n, a);
        const d = n?.readable;
        fe(d, "readable", "ReadableWritablePair"), me(d, `${a} has member 'readable' that`);
        const R = n?.writable;
        return fe(R, "writable", "ReadableWritablePair"), Rc(R, `${a} has member 'writable' that`), { readable: d, writable: R };
      }
      class _t {
        constructor(a = {}, d = {}) {
          a === void 0 ? a = null : he(a, "First parameter");
          const R = nn(d, "Second parameter"), k = uC(a, "First parameter");
          if (zo(this), k.type === "bytes") {
            if (R.size !== void 0)
              throw new RangeError("The strategy for a byte stream cannot have a size function");
            const Y = hs(R, 0);
            yQ(this, k, Y);
          } else {
            const Y = sn(R), x = hs(R, 1);
            aC(this, k, x, Y);
          }
        }
        /**
         * Whether or not the readable stream is locked to a {@link ReadableStreamDefaultReader | reader}.
         */
        get locked() {
          if (!vt(this))
            throw tr("locked");
          return Gt(this);
        }
        /**
         * Cancels the stream, signaling a loss of interest in the stream by a consumer.
         *
         * The supplied `reason` argument will be given to the underlying source's {@link UnderlyingSource.cancel | cancel()}
         * method, which might or might not use it.
         */
        cancel(a = void 0) {
          return vt(this) ? Gt(this) ? C(new TypeError("Cannot cancel a stream that already has a reader")) : et(this, a) : C(tr("cancel"));
        }
        getReader(a = void 0) {
          if (!vt(this))
            throw tr("getReader");
          return dC(a, "First parameter").mode === void 0 ? Be(this) : mc(this);
        }
        pipeThrough(a, d = {}) {
          if (!vt(this))
            throw tr("pipeThrough");
          we(a, 1, "pipeThrough");
          const R = pC(a, "First parameter"), k = qc(d, "Second parameter");
          if (Gt(this))
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
          if (Rr(R.writable))
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
          const Y = Hc(this, R.writable, k.preventClose, k.preventAbort, k.preventCancel, k.signal);
          return y(Y), R.readable;
        }
        pipeTo(a, d = {}) {
          if (!vt(this))
            return C(tr("pipeTo"));
          if (a === void 0)
            return C("Parameter 1 is required in 'pipeTo'.");
          if (!br(a))
            return C(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));
          let R;
          try {
            R = qc(d, "Second parameter");
          } catch (k) {
            return C(k);
          }
          return Gt(this) ? C(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream")) : Rr(a) ? C(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream")) : Hc(this, a, R.preventClose, R.preventAbort, R.preventCancel, R.signal);
        }
        /**
         * Tees this readable stream, returning a two-element array containing the two resulting branches as
         * new {@link ReadableStream} instances.
         *
         * Teeing a stream will lock it, preventing any other consumer from acquiring a reader.
         * To cancel the stream, cancel both of the resulting branches; a composite cancellation reason will then be
         * propagated to the stream's underlying source.
         *
         * Note that the chunks seen in each branch will be the same object. If the chunks are not immutable,
         * this could allow interference between the two branches.
         */
        tee() {
          if (!vt(this))
            throw tr("tee");
          const a = cC(this);
          return Ke(a);
        }
        values(a = void 0) {
          if (!vt(this))
            throw tr("values");
          const d = IC(a, "First parameter");
          return Ce(this, d.preventCancel);
        }
      }
      Object.defineProperties(_t.prototype, {
        cancel: { enumerable: !0 },
        getReader: { enumerable: !0 },
        pipeThrough: { enumerable: !0 },
        pipeTo: { enumerable: !0 },
        tee: { enumerable: !0 },
        values: { enumerable: !0 },
        locked: { enumerable: !0 }
      }), typeof r.toStringTag == "symbol" && Object.defineProperty(_t.prototype, r.toStringTag, {
        value: "ReadableStream",
        configurable: !0
      }), typeof r.asyncIterator == "symbol" && Object.defineProperty(_t.prototype, r.asyncIterator, {
        value: _t.prototype.values,
        writable: !0,
        configurable: !0
      });
      function jo(n, a, d, R = 1, k = () => 1) {
        const Y = Object.create(_t.prototype);
        zo(Y);
        const x = Object.create(Sr.prototype);
        return Wc(Y, x, n, a, d, R, k), Y;
      }
      function xc(n, a, d) {
        const R = Object.create(_t.prototype);
        zo(R);
        const k = Object.create(V.prototype);
        return wr(R, k, n, a, d, 0, void 0), R;
      }
      function zo(n) {
        n._state = "readable", n._reader = void 0, n._storedError = void 0, n._disturbed = !1;
      }
      function vt(n) {
        return !c(n) || !Object.prototype.hasOwnProperty.call(n, "_readableStreamController") ? !1 : n instanceof _t;
      }
      function Gt(n) {
        return n._reader !== void 0;
      }
      function et(n, a) {
        if (n._disturbed = !0, n._state === "closed")
          return I(void 0);
        if (n._state === "errored")
          return C(n._storedError);
        fs(n);
        const d = n._reader;
        d !== void 0 && Kt(d) && (d._readIntoRequests.forEach((k) => {
          k._closeSteps(void 0);
        }), d._readIntoRequests = new v());
        const R = n._readableStreamController[M](a);
        return w(R, s);
      }
      function fs(n) {
        n._state = "closed";
        const a = n._reader;
        a !== void 0 && (W(a), Ze(a) && (a._readRequests.forEach((d) => {
          d._closeSteps();
        }), a._readRequests = new v()));
      }
      function jc(n, a) {
        n._state = "errored", n._storedError = a;
        const d = n._reader;
        d !== void 0 && (ne(d, a), Ze(d) ? (d._readRequests.forEach((R) => {
          R._errorSteps(a);
        }), d._readRequests = new v()) : (d._readIntoRequests.forEach((R) => {
          R._errorSteps(a);
        }), d._readIntoRequests = new v()));
      }
      function tr(n) {
        return new TypeError(`ReadableStream.prototype.${n} can only be used on a ReadableStream`);
      }
      function zc(n, a) {
        $(n, a);
        const d = n?.highWaterMark;
        return fe(d, "highWaterMark", "QueuingStrategyInit"), {
          highWaterMark: Ye(d)
        };
      }
      const Zc = (n) => n.byteLength;
      try {
        Object.defineProperty(Zc, "name", {
          value: "size",
          configurable: !0
        });
      } catch {
      }
      class Bn {
        constructor(a) {
          we(a, 1, "ByteLengthQueuingStrategy"), a = zc(a, "First parameter"), this._byteLengthQueuingStrategyHighWaterMark = a.highWaterMark;
        }
        /**
         * Returns the high water mark provided to the constructor.
         */
        get highWaterMark() {
          if (!Xc(this))
            throw $c("highWaterMark");
          return this._byteLengthQueuingStrategyHighWaterMark;
        }
        /**
         * Measures the size of `chunk` by returning the value of its `byteLength` property.
         */
        get size() {
          if (!Xc(this))
            throw $c("size");
          return Zc;
        }
      }
      Object.defineProperties(Bn.prototype, {
        highWaterMark: { enumerable: !0 },
        size: { enumerable: !0 }
      }), typeof r.toStringTag == "symbol" && Object.defineProperty(Bn.prototype, r.toStringTag, {
        value: "ByteLengthQueuingStrategy",
        configurable: !0
      });
      function $c(n) {
        return new TypeError(`ByteLengthQueuingStrategy.prototype.${n} can only be used on a ByteLengthQueuingStrategy`);
      }
      function Xc(n) {
        return !c(n) || !Object.prototype.hasOwnProperty.call(n, "_byteLengthQueuingStrategyHighWaterMark") ? !1 : n instanceof Bn;
      }
      const Kc = () => 1;
      try {
        Object.defineProperty(Kc, "name", {
          value: "size",
          configurable: !0
        });
      } catch {
      }
      class In {
        constructor(a) {
          we(a, 1, "CountQueuingStrategy"), a = zc(a, "First parameter"), this._countQueuingStrategyHighWaterMark = a.highWaterMark;
        }
        /**
         * Returns the high water mark provided to the constructor.
         */
        get highWaterMark() {
          if (!Ag(this))
            throw eg("highWaterMark");
          return this._countQueuingStrategyHighWaterMark;
        }
        /**
         * Measures the size of `chunk` by always returning 1.
         * This ensures that the total queue size is a count of the number of chunks in the queue.
         */
        get size() {
          if (!Ag(this))
            throw eg("size");
          return Kc;
        }
      }
      Object.defineProperties(In.prototype, {
        highWaterMark: { enumerable: !0 },
        size: { enumerable: !0 }
      }), typeof r.toStringTag == "symbol" && Object.defineProperty(In.prototype, r.toStringTag, {
        value: "CountQueuingStrategy",
        configurable: !0
      });
      function eg(n) {
        return new TypeError(`CountQueuingStrategy.prototype.${n} can only be used on a CountQueuingStrategy`);
      }
      function Ag(n) {
        return !c(n) || !Object.prototype.hasOwnProperty.call(n, "_countQueuingStrategyHighWaterMark") ? !1 : n instanceof In;
      }
      function mC(n, a) {
        $(n, a);
        const d = n?.flush, R = n?.readableType, k = n?.start, Y = n?.transform, x = n?.writableType;
        return {
          flush: d === void 0 ? void 0 : yC(d, n, `${a} has member 'flush' that`),
          readableType: R,
          start: k === void 0 ? void 0 : wC(k, n, `${a} has member 'start' that`),
          transform: Y === void 0 ? void 0 : bC(Y, n, `${a} has member 'transform' that`),
          writableType: x
        };
      }
      function yC(n, a, d) {
        return Z(n, d), (R) => D(n, a, [R]);
      }
      function wC(n, a, d) {
        return Z(n, d), (R) => S(n, a, [R]);
      }
      function bC(n, a, d) {
        return Z(n, d), (R, k) => D(n, a, [R, k]);
      }
      class fn {
        constructor(a = {}, d = {}, R = {}) {
          a === void 0 && (a = null);
          const k = nn(d, "Second parameter"), Y = nn(R, "Third parameter"), x = mC(a, "First parameter");
          if (x.readableType !== void 0)
            throw new RangeError("Invalid readableType specified");
          if (x.writableType !== void 0)
            throw new RangeError("Invalid writableType specified");
          const ce = hs(Y, 0), pe = sn(Y), Se = hs(k, 1), Fe = sn(k);
          let Te;
          const AA = f((At) => {
            Te = At;
          });
          RC(this, AA, Se, Fe, ce, pe), SC(this, x), x.start !== void 0 ? Te(x.start(this._transformStreamController)) : Te(void 0);
        }
        /**
         * The readable side of the transform stream.
         */
        get readable() {
          if (!tg(this))
            throw og("readable");
          return this._readable;
        }
        /**
         * The writable side of the transform stream.
         */
        get writable() {
          if (!tg(this))
            throw og("writable");
          return this._writable;
        }
      }
      Object.defineProperties(fn.prototype, {
        readable: { enumerable: !0 },
        writable: { enumerable: !0 }
      }), typeof r.toStringTag == "symbol" && Object.defineProperty(fn.prototype, r.toStringTag, {
        value: "TransformStream",
        configurable: !0
      });
      function RC(n, a, d, R, k, Y) {
        function x() {
          return a;
        }
        function ce(AA) {
          return TC(n, AA);
        }
        function pe(AA) {
          return NC(n, AA);
        }
        function Se() {
          return UC(n);
        }
        n._writable = _Q(x, ce, Se, pe, d, R);
        function Fe() {
          return LC(n);
        }
        function Te(AA) {
          return mn(n, AA), I(void 0);
        }
        n._readable = jo(x, Fe, Te, k, Y), n._backpressure = void 0, n._backpressureChangePromise = void 0, n._backpressureChangePromise_resolve = void 0, yn(n, !0), n._transformStreamController = void 0;
      }
      function tg(n) {
        return !c(n) || !Object.prototype.hasOwnProperty.call(n, "_transformStreamController") ? !1 : n instanceof fn;
      }
      function pn(n, a) {
        Lt(n._readable._readableStreamController, a), mn(n, a);
      }
      function mn(n, a) {
        rg(n._transformStreamController), Jo(n._writable._writableStreamController, a), n._backpressure && yn(n, !1);
      }
      function yn(n, a) {
        n._backpressureChangePromise !== void 0 && n._backpressureChangePromise_resolve(), n._backpressureChangePromise = f((d) => {
          n._backpressureChangePromise_resolve = d;
        }), n._backpressure = a;
      }
      class ps {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the desired size to fill the readable side’s internal queue. It can be negative, if the queue is over-full.
         */
        get desiredSize() {
          if (!wn(this))
            throw bn("desiredSize");
          const a = this._controlledTransformStream._readable._readableStreamController;
          return xo(a);
        }
        enqueue(a = void 0) {
          if (!wn(this))
            throw bn("enqueue");
          sg(this, a);
        }
        /**
         * Errors both the readable side and the writable side of the controlled transform stream, making all future
         * interactions with it fail with the given error `e`. Any chunks queued for transformation will be discarded.
         */
        error(a = void 0) {
          if (!wn(this))
            throw bn("error");
          kC(this, a);
        }
        /**
         * Closes the readable side and errors the writable side of the controlled transform stream. This is useful when the
         * transformer only needs to consume a portion of the chunks written to the writable side.
         */
        terminate() {
          if (!wn(this))
            throw bn("terminate");
          FC(this);
        }
      }
      Object.defineProperties(ps.prototype, {
        enqueue: { enumerable: !0 },
        error: { enumerable: !0 },
        terminate: { enumerable: !0 },
        desiredSize: { enumerable: !0 }
      }), typeof r.toStringTag == "symbol" && Object.defineProperty(ps.prototype, r.toStringTag, {
        value: "TransformStreamDefaultController",
        configurable: !0
      });
      function wn(n) {
        return !c(n) || !Object.prototype.hasOwnProperty.call(n, "_controlledTransformStream") ? !1 : n instanceof ps;
      }
      function DC(n, a, d, R) {
        a._controlledTransformStream = n, n._transformStreamController = a, a._transformAlgorithm = d, a._flushAlgorithm = R;
      }
      function SC(n, a) {
        const d = Object.create(ps.prototype);
        let R = (Y) => {
          try {
            return sg(d, Y), I(void 0);
          } catch (x) {
            return C(x);
          }
        }, k = () => I(void 0);
        a.transform !== void 0 && (R = (Y) => a.transform(Y, d)), a.flush !== void 0 && (k = () => a.flush(d)), DC(n, d, R, k);
      }
      function rg(n) {
        n._transformAlgorithm = void 0, n._flushAlgorithm = void 0;
      }
      function sg(n, a) {
        const d = n._controlledTransformStream, R = d._readable._readableStreamController;
        if (!kr(R))
          throw new TypeError("Readable side is not in a state that permits enqueue");
        try {
          Cn(R, a);
        } catch (Y) {
          throw mn(d, Y), d._readable._storedError;
        }
        iC(R) !== d._backpressure && yn(d, !0);
      }
      function kC(n, a) {
        pn(n._controlledTransformStream, a);
      }
      function ng(n, a) {
        const d = n._transformAlgorithm(a);
        return w(d, void 0, (R) => {
          throw pn(n._controlledTransformStream, R), R;
        });
      }
      function FC(n) {
        const a = n._controlledTransformStream, d = a._readable._readableStreamController;
        Is(d);
        const R = new TypeError("TransformStream terminated");
        mn(a, R);
      }
      function TC(n, a) {
        const d = n._transformStreamController;
        if (n._backpressure) {
          const R = n._backpressureChangePromise;
          return w(R, () => {
            const k = n._writable;
            if (k._state === "erroring")
              throw k._storedError;
            return ng(d, a);
          });
        }
        return ng(d, a);
      }
      function NC(n, a) {
        return pn(n, a), I(void 0);
      }
      function UC(n) {
        const a = n._readable, d = n._transformStreamController, R = d._flushAlgorithm();
        return rg(d), w(R, () => {
          if (a._state === "errored")
            throw a._storedError;
          Is(a._readableStreamController);
        }, (k) => {
          throw pn(n, k), a._storedError;
        });
      }
      function LC(n) {
        return yn(n, !1), n._backpressureChangePromise;
      }
      function bn(n) {
        return new TypeError(`TransformStreamDefaultController.prototype.${n} can only be used on a TransformStreamDefaultController`);
      }
      function og(n) {
        return new TypeError(`TransformStream.prototype.${n} can only be used on a TransformStream`);
      }
      t.ByteLengthQueuingStrategy = Bn, t.CountQueuingStrategy = In, t.ReadableByteStreamController = V, t.ReadableStream = _t, t.ReadableStreamBYOBReader = Es, t.ReadableStreamBYOBRequest = se, t.ReadableStreamDefaultController = Sr, t.ReadableStreamDefaultReader = Le, t.TransformStream = fn, t.TransformStreamDefaultController = ps, t.WritableStream = Qs, t.WritableStreamDefaultController = Dr, t.WritableStreamDefaultWriter = Cs, Object.defineProperty(t, "__esModule", { value: !0 });
    });
  }($n, $n.exports)), $n.exports;
}
const pb = 65536;
if (!globalThis.ReadableStream)
  try {
    const A = require("node:process"), { emitWarning: e } = A;
    try {
      A.emitWarning = () => {
      }, Object.assign(globalThis, require("node:stream/web")), A.emitWarning = e;
    } catch (t) {
      throw A.emitWarning = e, t;
    }
  } catch {
    Object.assign(globalThis, fb());
  }
try {
  const { Blob: A } = G;
  A && !A.prototype.stream && (A.prototype.stream = function(t) {
    let r = 0;
    const s = this;
    return new ReadableStream({
      type: "bytes",
      async pull(o) {
        const c = await s.slice(r, Math.min(s.size, r + pb)).arrayBuffer();
        r += c.byteLength, o.enqueue(new Uint8Array(c)), r === s.size && o.close();
      }
    });
  });
} catch {
}
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
const Ou = 65536;
async function* Sa(A, e = !0) {
  for (const t of A)
    if ("stream" in t)
      yield* (
        /** @type {AsyncIterableIterator<Uint8Array>} */
        t.stream()
      );
    else if (ArrayBuffer.isView(t))
      if (e) {
        let r = t.byteOffset;
        const s = t.byteOffset + t.byteLength;
        for (; r !== s; ) {
          const o = Math.min(s - r, Ou), i = t.buffer.slice(r, r + o);
          r += i.byteLength, yield new Uint8Array(i);
        }
      } else
        yield t;
    else {
      let r = 0, s = (
        /** @type {Blob} */
        t
      );
      for (; r !== s.size; ) {
        const i = await s.slice(r, Math.min(s.size, r + Ou)).arrayBuffer();
        r += i.byteLength, yield new Uint8Array(i);
      }
    }
}
const dQ = class Za {
  /** @type {Array.<(Blob|Uint8Array)>} */
  #e = [];
  #t = "";
  #r = 0;
  #A = "transparent";
  /**
   * The Blob() constructor returns a new Blob object. The content
   * of the blob consists of the concatenation of the values given
   * in the parameter array.
   *
   * @param {*} blobParts
   * @param {{ type?: string, endings?: string }} [options]
   */
  constructor(e = [], t = {}) {
    if (typeof e != "object" || e === null)
      throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
    if (typeof e[Symbol.iterator] != "function")
      throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
    if (typeof t != "object" && typeof t != "function")
      throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
    t === null && (t = {});
    const r = new TextEncoder();
    for (const o of e) {
      let i;
      ArrayBuffer.isView(o) ? i = new Uint8Array(o.buffer.slice(o.byteOffset, o.byteOffset + o.byteLength)) : o instanceof ArrayBuffer ? i = new Uint8Array(o.slice(0)) : o instanceof Za ? i = o : i = r.encode(`${o}`), this.#r += ArrayBuffer.isView(i) ? i.byteLength : i.size, this.#e.push(i);
    }
    this.#A = `${t.endings === void 0 ? "transparent" : t.endings}`;
    const s = t.type === void 0 ? "" : String(t.type);
    this.#t = /^[\x20-\x7E]*$/.test(s) ? s : "";
  }
  /**
   * The Blob interface's size property returns the
   * size of the Blob in bytes.
   */
  get size() {
    return this.#r;
  }
  /**
   * The type property of a Blob object returns the MIME type of the file.
   */
  get type() {
    return this.#t;
  }
  /**
   * The text() method in the Blob interface returns a Promise
   * that resolves with a string containing the contents of
   * the blob, interpreted as UTF-8.
   *
   * @return {Promise<string>}
   */
  async text() {
    const e = new TextDecoder();
    let t = "";
    for await (const r of Sa(this.#e, !1))
      t += e.decode(r, { stream: !0 });
    return t += e.decode(), t;
  }
  /**
   * The arrayBuffer() method in the Blob interface returns a
   * Promise that resolves with the contents of the blob as
   * binary data contained in an ArrayBuffer.
   *
   * @return {Promise<ArrayBuffer>}
   */
  async arrayBuffer() {
    const e = new Uint8Array(this.size);
    let t = 0;
    for await (const r of Sa(this.#e, !1))
      e.set(r, t), t += r.length;
    return e.buffer;
  }
  stream() {
    const e = Sa(this.#e, !0);
    return new globalThis.ReadableStream({
      // @ts-ignore
      type: "bytes",
      async pull(t) {
        const r = await e.next();
        r.done ? t.close() : t.enqueue(r.value);
      },
      async cancel() {
        await e.return();
      }
    });
  }
  /**
   * The Blob interface's slice() method creates and returns a
   * new Blob object which contains data from a subset of the
   * blob on which it's called.
   *
   * @param {number} [start]
   * @param {number} [end]
   * @param {string} [type]
   */
  slice(e = 0, t = this.size, r = "") {
    const { size: s } = this;
    let o = e < 0 ? Math.max(s + e, 0) : Math.min(e, s), i = t < 0 ? Math.max(s + t, 0) : Math.min(t, s);
    const c = Math.max(i - o, 0), g = this.#e, u = [];
    let l = 0;
    for (const E of g) {
      if (l >= c)
        break;
      const f = ArrayBuffer.isView(E) ? E.byteLength : E.size;
      if (o && f <= o)
        o -= f, i -= f;
      else {
        let I;
        ArrayBuffer.isView(E) ? (I = E.subarray(o, Math.min(f, i)), l += I.byteLength) : (I = E.slice(o, Math.min(f, i)), l += I.size), i -= f, u.push(I), o = 0;
      }
    }
    const h = new Za([], { type: String(r).toLowerCase() });
    return h.#r = c, h.#e = u, h;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](e) {
    return e && typeof e == "object" && typeof e.constructor == "function" && (typeof e.stream == "function" || typeof e.arrayBuffer == "function") && /^(Blob|File)$/.test(e[Symbol.toStringTag]);
  }
};
Object.defineProperties(dQ.prototype, {
  size: { enumerable: !0 },
  type: { enumerable: !0 },
  slice: { enumerable: !0 }
});
const uo = dQ, mb = class extends uo {
  #e = 0;
  #t = "";
  /**
   * @param {*[]} fileBits
   * @param {string} fileName
   * @param {{lastModified?: number, type?: string}} options
   */
  // @ts-ignore
  constructor(e, t, r = {}) {
    if (arguments.length < 2)
      throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
    super(e, r), r === null && (r = {});
    const s = r.lastModified === void 0 ? Date.now() : Number(r.lastModified);
    Number.isNaN(s) || (this.#e = s), this.#t = String(t);
  }
  get name() {
    return this.#t;
  }
  get lastModified() {
    return this.#e;
  }
  get [Symbol.toStringTag]() {
    return "File";
  }
  static [Symbol.hasInstance](e) {
    return !!e && e instanceof uo && /^(File)$/.test(e[Symbol.toStringTag]);
  }
}, yb = mb;
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
var { toStringTag: Js, iterator: wb, hasInstance: bb } = Symbol, Hu = Math.random, Rb = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(","), Vu = (A, e, t) => (A += "", /^(Blob|File)$/.test(e && e[Js]) ? [(t = t !== void 0 ? t + "" : e[Js] == "File" ? e.name : "blob", A), e.name !== t || e[Js] == "blob" ? new yb([e], t, e) : e] : [A, e + ""]), ka = (A, e) => (e ? A : A.replace(/\r?\n|\r/g, `\r
`)).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22"), Er = (A, e, t) => {
  if (e.length < t)
    throw new TypeError(`Failed to execute '${A}' on 'FormData': ${t} arguments required, but only ${e.length} present.`);
};
const $a = class {
  #e = [];
  constructor(...e) {
    if (e.length) throw new TypeError("Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.");
  }
  get [Js]() {
    return "FormData";
  }
  [wb]() {
    return this.entries();
  }
  static [bb](e) {
    return e && typeof e == "object" && e[Js] === "FormData" && !Rb.some((t) => typeof e[t] != "function");
  }
  append(...e) {
    Er("append", arguments, 2), this.#e.push(Vu(...e));
  }
  delete(e) {
    Er("delete", arguments, 1), e += "", this.#e = this.#e.filter(([t]) => t !== e);
  }
  get(e) {
    Er("get", arguments, 1), e += "";
    for (var t = this.#e, r = t.length, s = 0; s < r; s++) if (t[s][0] === e) return t[s][1];
    return null;
  }
  getAll(e, t) {
    return Er("getAll", arguments, 1), t = [], e += "", this.#e.forEach((r) => r[0] === e && t.push(r[1])), t;
  }
  has(e) {
    return Er("has", arguments, 1), e += "", this.#e.some((t) => t[0] === e);
  }
  forEach(e, t) {
    Er("forEach", arguments, 1);
    for (var [r, s] of this) e.call(t, s, r, this);
  }
  set(...e) {
    Er("set", arguments, 2);
    var t = [], r = !0;
    e = Vu(...e), this.#e.forEach((s) => {
      s[0] === e[0] ? r && (r = !t.push(e)) : t.push(s);
    }), r && t.push(e), this.#e = t;
  }
  *entries() {
    yield* this.#e;
  }
  *keys() {
    for (var [e] of this) yield e;
  }
  *values() {
    for (var [, e] of this) yield e;
  }
};
function Db(A, e = uo) {
  var t = `${Hu()}${Hu()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), r = [], s = `--${t}\r
Content-Disposition: form-data; name="`;
  return A.forEach((o, i) => typeof o == "string" ? r.push(s + ka(i) + `"\r
\r
${o.replace(/\r(?!\n)|(?<!\r)\n/g, `\r
`)}\r
`) : r.push(s + ka(i) + `"; filename="${ka(o.name, 1)}"\r
Content-Type: ${o.type || "application/octet-stream"}\r
\r
`, o, `\r
`)), r.push(`--${t}--`), new e(r, { type: "multipart/form-data; boundary=" + t });
}
class No extends Error {
  constructor(e, t) {
    super(e), Error.captureStackTrace(this, this.constructor), this.type = t;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
}
class ht extends No {
  /**
   * @param  {string} message -      Error message for human
   * @param  {string} [type] -        Error type for machine
   * @param  {SystemError} [systemError] - For Node.js system error
   */
  constructor(e, t, r) {
    super(e, t), r && (this.code = this.errno = r.code, this.erroredSysCall = r.syscall);
  }
}
const Eo = Symbol.toStringTag, BQ = (A) => typeof A == "object" && typeof A.append == "function" && typeof A.delete == "function" && typeof A.get == "function" && typeof A.getAll == "function" && typeof A.has == "function" && typeof A.set == "function" && typeof A.sort == "function" && A[Eo] === "URLSearchParams", ho = (A) => A && typeof A == "object" && typeof A.arrayBuffer == "function" && typeof A.type == "string" && typeof A.stream == "function" && typeof A.constructor == "function" && /^(Blob|File)$/.test(A[Eo]), Sb = (A) => typeof A == "object" && (A[Eo] === "AbortSignal" || A[Eo] === "EventTarget"), kb = (A, e) => {
  const t = new URL(e).hostname, r = new URL(A).hostname;
  return t === r || t.endsWith(`.${r}`);
}, Fb = (A, e) => {
  const t = new URL(e).protocol, r = new URL(A).protocol;
  return t === r;
}, Tb = _C(UA.pipeline), NA = Symbol("Body internals");
class qs {
  constructor(e, {
    size: t = 0
  } = {}) {
    let r = null;
    e === null ? e = null : BQ(e) ? e = fA.from(e.toString()) : ho(e) || fA.isBuffer(e) || (oo.isAnyArrayBuffer(e) ? e = fA.from(e) : ArrayBuffer.isView(e) ? e = fA.from(e.buffer, e.byteOffset, e.byteLength) : e instanceof UA || (e instanceof $a ? (e = Db(e), r = e.type.split("=")[1]) : e = fA.from(String(e))));
    let s = e;
    fA.isBuffer(e) ? s = UA.Readable.from(e) : ho(e) && (s = UA.Readable.from(e.stream())), this[NA] = {
      body: e,
      stream: s,
      boundary: r,
      disturbed: !1,
      error: null
    }, this.size = t, e instanceof UA && e.on("error", (o) => {
      const i = o instanceof No ? o : new ht(`Invalid response body while trying to fetch ${this.url}: ${o.message}`, "system", o);
      this[NA].error = i;
    });
  }
  get body() {
    return this[NA].stream;
  }
  get bodyUsed() {
    return this[NA].disturbed;
  }
  /**
   * Decode response as ArrayBuffer
   *
   * @return  Promise
   */
  async arrayBuffer() {
    const { buffer: e, byteOffset: t, byteLength: r } = await Fa(this);
    return e.slice(t, t + r);
  }
  async formData() {
    const e = this.headers.get("content-type");
    if (e.startsWith("application/x-www-form-urlencoded")) {
      const r = new $a(), s = new URLSearchParams(await this.text());
      for (const [o, i] of s)
        r.append(o, i);
      return r;
    }
    const { toFormData: t } = await import("./multipart-parser-CpbRXZZ4.js");
    return t(this.body, e);
  }
  /**
   * Return raw response as Blob
   *
   * @return Promise
   */
  async blob() {
    const e = this.headers && this.headers.get("content-type") || this[NA].body && this[NA].body.type || "", t = await this.arrayBuffer();
    return new uo([t], {
      type: e
    });
  }
  /**
   * Decode response as json
   *
   * @return  Promise
   */
  async json() {
    const e = await this.text();
    return JSON.parse(e);
  }
  /**
   * Decode response as text
   *
   * @return  Promise
   */
  async text() {
    const e = await Fa(this);
    return new TextDecoder().decode(e);
  }
  /**
   * Decode response as buffer (non-spec api)
   *
   * @return  Promise
   */
  buffer() {
    return Fa(this);
  }
}
qs.prototype.buffer = Qo(qs.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
Object.defineProperties(qs.prototype, {
  body: { enumerable: !0 },
  bodyUsed: { enumerable: !0 },
  arrayBuffer: { enumerable: !0 },
  blob: { enumerable: !0 },
  json: { enumerable: !0 },
  text: { enumerable: !0 },
  data: { get: Qo(
    () => {
    },
    "data doesn't exist, use json(), text(), arrayBuffer(), or body instead",
    "https://github.com/node-fetch/node-fetch/issues/1000 (response)"
  ) }
});
async function Fa(A) {
  if (A[NA].disturbed)
    throw new TypeError(`body used already for: ${A.url}`);
  if (A[NA].disturbed = !0, A[NA].error)
    throw A[NA].error;
  const { body: e } = A;
  if (e === null)
    return fA.alloc(0);
  if (!(e instanceof UA))
    return fA.alloc(0);
  const t = [];
  let r = 0;
  try {
    for await (const s of e) {
      if (A.size > 0 && r + s.length > A.size) {
        const o = new ht(`content size at ${A.url} over limit: ${A.size}`, "max-size");
        throw e.destroy(o), o;
      }
      r += s.length, t.push(s);
    }
  } catch (s) {
    throw s instanceof No ? s : new ht(`Invalid response body while trying to fetch ${A.url}: ${s.message}`, "system", s);
  }
  if (e.readableEnded === !0 || e._readableState.ended === !0)
    try {
      return t.every((s) => typeof s == "string") ? fA.from(t.join("")) : fA.concat(t, r);
    } catch (s) {
      throw new ht(`Could not create Buffer from response body for ${A.url}: ${s.message}`, "system", s);
    }
  else
    throw new ht(`Premature close of server response while trying to fetch ${A.url}`);
}
const pc = (A, e) => {
  let t, r, { body: s } = A[NA];
  if (A.bodyUsed)
    throw new Error("cannot clone body after it is used");
  return s instanceof UA && typeof s.getBoundary != "function" && (t = new no({ highWaterMark: e }), r = new no({ highWaterMark: e }), s.pipe(t), s.pipe(r), A[NA].stream = t, s = r), s;
}, Nb = Qo(
  (A) => A.getBoundary(),
  "form-data doesn't follow the spec and requires special treatment. Use alternative package",
  "https://github.com/node-fetch/node-fetch/issues/1167"
), IQ = (A, e) => A === null ? null : typeof A == "string" ? "text/plain;charset=UTF-8" : BQ(A) ? "application/x-www-form-urlencoded;charset=UTF-8" : ho(A) ? A.type || null : fA.isBuffer(A) || oo.isAnyArrayBuffer(A) || ArrayBuffer.isView(A) ? null : A instanceof $a ? `multipart/form-data; boundary=${e[NA].boundary}` : A && typeof A.getBoundary == "function" ? `multipart/form-data;boundary=${Nb(A)}` : A instanceof UA ? null : "text/plain;charset=UTF-8", Ub = (A) => {
  const { body: e } = A[NA];
  return e === null ? 0 : ho(e) ? e.size : fA.isBuffer(e) ? e.length : e && typeof e.getLengthSync == "function" && e.hasKnownLength && e.hasKnownLength() ? e.getLengthSync() : null;
}, Lb = async (A, { body: e }) => {
  e === null ? A.end() : await Tb(e, A);
}, so = typeof Os.validateHeaderName == "function" ? Os.validateHeaderName : (A) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(A)) {
    const e = new TypeError(`Header name must be a valid HTTP token [${A}]`);
    throw Object.defineProperty(e, "code", { value: "ERR_INVALID_HTTP_TOKEN" }), e;
  }
}, Xa = typeof Os.validateHeaderValue == "function" ? Os.validateHeaderValue : (A, e) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(e)) {
    const t = new TypeError(`Invalid character in header content ["${A}"]`);
    throw Object.defineProperty(t, "code", { value: "ERR_INVALID_CHAR" }), t;
  }
};
class Ft extends URLSearchParams {
  /**
   * Headers class
   *
   * @constructor
   * @param {HeadersInit} [init] - Response headers
   */
  constructor(e) {
    let t = [];
    if (e instanceof Ft) {
      const r = e.raw();
      for (const [s, o] of Object.entries(r))
        t.push(...o.map((i) => [s, i]));
    } else if (e != null) if (typeof e == "object" && !oo.isBoxedPrimitive(e)) {
      const r = e[Symbol.iterator];
      if (r == null)
        t.push(...Object.entries(e));
      else {
        if (typeof r != "function")
          throw new TypeError("Header pairs must be iterable");
        t = [...e].map((s) => {
          if (typeof s != "object" || oo.isBoxedPrimitive(s))
            throw new TypeError("Each header pair must be an iterable object");
          return [...s];
        }).map((s) => {
          if (s.length !== 2)
            throw new TypeError("Each header pair must be a name/value tuple");
          return [...s];
        });
      }
    } else
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    return t = t.length > 0 ? t.map(([r, s]) => (so(r), Xa(r, String(s)), [String(r).toLowerCase(), String(s)])) : void 0, super(t), new Proxy(this, {
      get(r, s, o) {
        switch (s) {
          case "append":
          case "set":
            return (i, c) => (so(i), Xa(i, String(c)), URLSearchParams.prototype[s].call(
              r,
              String(i).toLowerCase(),
              String(c)
            ));
          case "delete":
          case "has":
          case "getAll":
            return (i) => (so(i), URLSearchParams.prototype[s].call(
              r,
              String(i).toLowerCase()
            ));
          case "keys":
            return () => (r.sort(), new Set(URLSearchParams.prototype.keys.call(r)).keys());
          default:
            return Reflect.get(r, s, o);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(e) {
    const t = this.getAll(e);
    if (t.length === 0)
      return null;
    let r = t.join(", ");
    return /^content-encoding$/i.test(e) && (r = r.toLowerCase()), r;
  }
  forEach(e, t = void 0) {
    for (const r of this.keys())
      Reflect.apply(e, t, [this.get(r), r, this]);
  }
  *values() {
    for (const e of this.keys())
      yield this.get(e);
  }
  /**
   * @type {() => IterableIterator<[string, string]>}
   */
  *entries() {
    for (const e of this.keys())
      yield [e, this.get(e)];
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * Node-fetch non-spec method
   * returning all headers and their values as array
   * @returns {Record<string, string[]>}
   */
  raw() {
    return [...this.keys()].reduce((e, t) => (e[t] = this.getAll(t), e), {});
  }
  /**
   * For better console.log(headers) and also to convert Headers into Node.js Request compatible format
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((e, t) => {
      const r = this.getAll(t);
      return t === "host" ? e[t] = r[0] : e[t] = r.length > 1 ? r : r[0], e;
    }, {});
  }
}
Object.defineProperties(
  Ft.prototype,
  ["get", "entries", "forEach", "values"].reduce((A, e) => (A[e] = { enumerable: !0 }, A), {})
);
function _b(A = []) {
  return new Ft(
    A.reduce((e, t, r, s) => (r % 2 === 0 && e.push(s.slice(r, r + 2)), e), []).filter(([e, t]) => {
      try {
        return so(e), Xa(e, String(t)), !0;
      } catch {
        return !1;
      }
    })
  );
}
const vb = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), fQ = (A) => vb.has(A), st = Symbol("Response internals");
class YA extends qs {
  constructor(e = null, t = {}) {
    super(e, t);
    const r = t.status != null ? t.status : 200, s = new Ft(t.headers);
    if (e !== null && !s.has("Content-Type")) {
      const o = IQ(e, this);
      o && s.append("Content-Type", o);
    }
    this[st] = {
      type: "default",
      url: t.url,
      status: r,
      statusText: t.statusText || "",
      headers: s,
      counter: t.counter,
      highWaterMark: t.highWaterMark
    };
  }
  get type() {
    return this[st].type;
  }
  get url() {
    return this[st].url || "";
  }
  get status() {
    return this[st].status;
  }
  /**
   * Convenience property representing if the request ended normally
   */
  get ok() {
    return this[st].status >= 200 && this[st].status < 300;
  }
  get redirected() {
    return this[st].counter > 0;
  }
  get statusText() {
    return this[st].statusText;
  }
  get headers() {
    return this[st].headers;
  }
  get highWaterMark() {
    return this[st].highWaterMark;
  }
  /**
   * Clone this response
   *
   * @return  Response
   */
  clone() {
    return new YA(pc(this, this.highWaterMark), {
      type: this.type,
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size,
      highWaterMark: this.highWaterMark
    });
  }
  /**
   * @param {string} url    The URL that the new response is to originate from.
   * @param {number} status An optional status code for the response (e.g., 302.)
   * @returns {Response}    A Response object.
   */
  static redirect(e, t = 302) {
    if (!fQ(t))
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    return new YA(null, {
      headers: {
        location: new URL(e).toString()
      },
      status: t
    });
  }
  static error() {
    const e = new YA(null, { status: 0, statusText: "" });
    return e[st].type = "error", e;
  }
  static json(e = void 0, t = {}) {
    const r = JSON.stringify(e);
    if (r === void 0)
      throw new TypeError("data is not JSON serializable");
    const s = new Ft(t && t.headers);
    return s.has("content-type") || s.set("content-type", "application/json"), new YA(r, {
      ...t,
      headers: s
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
}
Object.defineProperties(YA.prototype, {
  type: { enumerable: !0 },
  url: { enumerable: !0 },
  status: { enumerable: !0 },
  ok: { enumerable: !0 },
  redirected: { enumerable: !0 },
  statusText: { enumerable: !0 },
  headers: { enumerable: !0 },
  clone: { enumerable: !0 }
});
const Gb = (A) => {
  if (A.search)
    return A.search;
  const e = A.href.length - 1, t = A.hash || (A.href[e] === "#" ? "#" : "");
  return A.href[e - t.length] === "?" ? "?" : "";
};
function Wu(A, e = !1) {
  return A == null || (A = new URL(A), /^(about|blob|data):$/.test(A.protocol)) ? "no-referrer" : (A.username = "", A.password = "", A.hash = "", e && (A.pathname = "", A.search = ""), A);
}
const pQ = /* @__PURE__ */ new Set([
  "",
  "no-referrer",
  "no-referrer-when-downgrade",
  "same-origin",
  "origin",
  "strict-origin",
  "origin-when-cross-origin",
  "strict-origin-when-cross-origin",
  "unsafe-url"
]), Mb = "strict-origin-when-cross-origin";
function Yb(A) {
  if (!pQ.has(A))
    throw new TypeError(`Invalid referrerPolicy: ${A}`);
  return A;
}
function Pb(A) {
  if (/^(http|ws)s:$/.test(A.protocol))
    return !0;
  const e = A.host.replace(/(^\[)|(]$)/g, ""), t = YC(e);
  return t === 4 && /^127\./.test(e) || t === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(e) ? !0 : A.host === "localhost" || A.host.endsWith(".localhost") ? !1 : A.protocol === "file:";
}
function Hr(A) {
  return /^about:(blank|srcdoc)$/.test(A) || A.protocol === "data:" || /^(blob|filesystem):$/.test(A.protocol) ? !0 : Pb(A);
}
function Jb(A, { referrerURLCallback: e, referrerOriginCallback: t } = {}) {
  if (A.referrer === "no-referrer" || A.referrerPolicy === "")
    return null;
  const r = A.referrerPolicy;
  if (A.referrer === "about:client")
    return "no-referrer";
  const s = A.referrer;
  let o = Wu(s), i = Wu(s, !0);
  o.toString().length > 4096 && (o = i), e && (o = e(o)), t && (i = t(i));
  const c = new URL(A.url);
  switch (r) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return i;
    case "unsafe-url":
      return o;
    case "strict-origin":
      return Hr(o) && !Hr(c) ? "no-referrer" : i.toString();
    case "strict-origin-when-cross-origin":
      return o.origin === c.origin ? o : Hr(o) && !Hr(c) ? "no-referrer" : i;
    case "same-origin":
      return o.origin === c.origin ? o : "no-referrer";
    case "origin-when-cross-origin":
      return o.origin === c.origin ? o : i;
    case "no-referrer-when-downgrade":
      return Hr(o) && !Hr(c) ? "no-referrer" : o;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${r}`);
  }
}
function Ob(A) {
  const e = (A.get("referrer-policy") || "").split(/[,\s]+/);
  let t = "";
  for (const r of e)
    r && pQ.has(r) && (t = r);
  return t;
}
const EA = Symbol("Request internals"), _s = (A) => typeof A == "object" && typeof A[EA] == "object", Hb = Qo(
  () => {
  },
  ".data is not a valid RequestInit property, use .body instead",
  "https://github.com/node-fetch/node-fetch/issues/1000 (request)"
);
class xs extends qs {
  constructor(e, t = {}) {
    let r;
    if (_s(e) ? r = new URL(e.url) : (r = new URL(e), e = {}), r.username !== "" || r.password !== "")
      throw new TypeError(`${r} is an url with embedded credentials.`);
    let s = t.method || e.method || "GET";
    if (/^(delete|get|head|options|post|put)$/i.test(s) && (s = s.toUpperCase()), !_s(t) && "data" in t && Hb(), (t.body != null || _s(e) && e.body !== null) && (s === "GET" || s === "HEAD"))
      throw new TypeError("Request with GET/HEAD method cannot have body");
    const o = t.body ? t.body : _s(e) && e.body !== null ? pc(e) : null;
    super(o, {
      size: t.size || e.size || 0
    });
    const i = new Ft(t.headers || e.headers || {});
    if (o !== null && !i.has("Content-Type")) {
      const u = IQ(o, this);
      u && i.set("Content-Type", u);
    }
    let c = _s(e) ? e.signal : null;
    if ("signal" in t && (c = t.signal), c != null && !Sb(c))
      throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    let g = t.referrer == null ? e.referrer : t.referrer;
    if (g === "")
      g = "no-referrer";
    else if (g) {
      const u = new URL(g);
      g = /^about:(\/\/)?client$/.test(u) ? "client" : u;
    } else
      g = void 0;
    this[EA] = {
      method: s,
      redirect: t.redirect || e.redirect || "follow",
      headers: i,
      parsedURL: r,
      signal: c,
      referrer: g
    }, this.follow = t.follow === void 0 ? e.follow === void 0 ? 20 : e.follow : t.follow, this.compress = t.compress === void 0 ? e.compress === void 0 ? !0 : e.compress : t.compress, this.counter = t.counter || e.counter || 0, this.agent = t.agent || e.agent, this.highWaterMark = t.highWaterMark || e.highWaterMark || 16384, this.insecureHTTPParser = t.insecureHTTPParser || e.insecureHTTPParser || !1, this.referrerPolicy = t.referrerPolicy || e.referrerPolicy || "";
  }
  /** @returns {string} */
  get method() {
    return this[EA].method;
  }
  /** @returns {string} */
  get url() {
    return MC(this[EA].parsedURL);
  }
  /** @returns {Headers} */
  get headers() {
    return this[EA].headers;
  }
  get redirect() {
    return this[EA].redirect;
  }
  /** @returns {AbortSignal} */
  get signal() {
    return this[EA].signal;
  }
  // https://fetch.spec.whatwg.org/#dom-request-referrer
  get referrer() {
    if (this[EA].referrer === "no-referrer")
      return "";
    if (this[EA].referrer === "client")
      return "about:client";
    if (this[EA].referrer)
      return this[EA].referrer.toString();
  }
  get referrerPolicy() {
    return this[EA].referrerPolicy;
  }
  set referrerPolicy(e) {
    this[EA].referrerPolicy = Yb(e);
  }
  /**
   * Clone this request
   *
   * @return  Request
   */
  clone() {
    return new xs(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
}
Object.defineProperties(xs.prototype, {
  method: { enumerable: !0 },
  url: { enumerable: !0 },
  headers: { enumerable: !0 },
  redirect: { enumerable: !0 },
  clone: { enumerable: !0 },
  signal: { enumerable: !0 },
  referrer: { enumerable: !0 },
  referrerPolicy: { enumerable: !0 }
});
const Vb = (A) => {
  const { parsedURL: e } = A[EA], t = new Ft(A[EA].headers);
  t.has("Accept") || t.set("Accept", "*/*");
  let r = null;
  if (A.body === null && /^(post|put)$/i.test(A.method) && (r = "0"), A.body !== null) {
    const c = Ub(A);
    typeof c == "number" && !Number.isNaN(c) && (r = String(c));
  }
  r && t.set("Content-Length", r), A.referrerPolicy === "" && (A.referrerPolicy = Mb), A.referrer && A.referrer !== "no-referrer" ? A[EA].referrer = Jb(A) : A[EA].referrer = "no-referrer", A[EA].referrer instanceof URL && t.set("Referer", A.referrer), t.has("User-Agent") || t.set("User-Agent", "node-fetch"), A.compress && !t.has("Accept-Encoding") && t.set("Accept-Encoding", "gzip, deflate, br");
  let { agent: s } = A;
  typeof s == "function" && (s = s(e));
  const o = Gb(e), i = {
    // Overwrite search to retain trailing ? (issue #776)
    path: e.pathname + o,
    // The following options are not expressed in the URL
    method: A.method,
    headers: t[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: A.insecureHTTPParser,
    agent: s
  };
  return {
    /** @type {URL} */
    parsedURL: e,
    options: i
  };
};
class Wb extends No {
  constructor(e, t = "aborted") {
    super(e, t);
  }
}
/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
if (!globalThis.DOMException)
  try {
    const { MessageChannel: A } = G, e = new A().port1, t = new ArrayBuffer();
    e.postMessage(t, [t, t]);
  } catch (A) {
    A.constructor.name === "DOMException" && (globalThis.DOMException = A.constructor);
  }
const qb = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
async function mQ(A, e) {
  return new Promise((t, r) => {
    const s = new xs(A, e), { parsedURL: o, options: i } = Vb(s);
    if (!qb.has(o.protocol))
      throw new TypeError(`node-fetch cannot load ${A}. URL scheme "${o.protocol.replace(/:$/, "")}" is not supported.`);
    if (o.protocol === "data:") {
      const I = Ib(s.url), C = new YA(I, { headers: { "Content-Type": I.typeFull } });
      t(C);
      return;
    }
    const c = (o.protocol === "https:" ? GC : Os).request, { signal: g } = s;
    let u = null;
    const l = () => {
      const I = new Wb("The operation was aborted.");
      r(I), s.body && s.body instanceof UA.Readable && s.body.destroy(I), !(!u || !u.body) && u.body.emit("error", I);
    };
    if (g && g.aborted) {
      l();
      return;
    }
    const h = () => {
      l(), f();
    }, E = c(o.toString(), i);
    g && g.addEventListener("abort", h);
    const f = () => {
      E.abort(), g && g.removeEventListener("abort", h);
    };
    E.on("error", (I) => {
      r(new ht(`request to ${s.url} failed, reason: ${I.message}`, "system", I)), f();
    }), xb(E, (I) => {
      u && u.body && u.body.destroy(I);
    }), process.version < "v14" && E.on("socket", (I) => {
      let C;
      I.prependListener("end", () => {
        C = I._eventsCount;
      }), I.prependListener("close", (B) => {
        if (u && C < I._eventsCount && !B) {
          const p = new Error("Premature close");
          p.code = "ERR_STREAM_PREMATURE_CLOSE", u.body.emit("error", p);
        }
      });
    }), E.on("response", (I) => {
      E.setTimeout(0);
      const C = _b(I.rawHeaders);
      if (fQ(I.statusCode)) {
        const w = C.get("Location");
        let y = null;
        try {
          y = w === null ? null : new URL(w, s.url);
        } catch {
          if (s.redirect !== "manual") {
            r(new ht(`uri requested responds with an invalid redirect URL: ${w}`, "invalid-redirect")), f();
            return;
          }
        }
        switch (s.redirect) {
          case "error":
            r(new ht(`uri requested responds with a redirect, redirect mode is set to error: ${s.url}`, "no-redirect")), f();
            return;
          case "manual":
            break;
          case "follow": {
            if (y === null)
              break;
            if (s.counter >= s.follow) {
              r(new ht(`maximum redirect reached at: ${s.url}`, "max-redirect")), f();
              return;
            }
            const b = {
              headers: new Ft(s.headers),
              follow: s.follow,
              counter: s.counter + 1,
              agent: s.agent,
              compress: s.compress,
              method: s.method,
              body: pc(s),
              signal: s.signal,
              size: s.size,
              referrer: s.referrer,
              referrerPolicy: s.referrerPolicy
            };
            if (!kb(s.url, y) || !Fb(s.url, y))
              for (const D of ["authorization", "www-authenticate", "cookie", "cookie2"])
                b.headers.delete(D);
            if (I.statusCode !== 303 && s.body && e.body instanceof UA.Readable) {
              r(new ht("Cannot follow redirect with body being a readable stream", "unsupported-redirect")), f();
              return;
            }
            (I.statusCode === 303 || (I.statusCode === 301 || I.statusCode === 302) && s.method === "POST") && (b.method = "GET", b.body = void 0, b.headers.delete("content-length"));
            const S = Ob(C);
            S && (b.referrerPolicy = S), t(mQ(new xs(y, b))), f();
            return;
          }
          default:
            return r(new TypeError(`Redirect option '${s.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      g && I.once("end", () => {
        g.removeEventListener("abort", h);
      });
      let B = Lr(I, new no(), (w) => {
        w && r(w);
      });
      process.version < "v12.10" && I.on("aborted", h);
      const p = {
        url: s.url,
        status: I.statusCode,
        statusText: I.statusMessage,
        headers: C,
        size: s.size,
        counter: s.counter,
        highWaterMark: s.highWaterMark
      }, Q = C.get("Content-Encoding");
      if (!s.compress || s.method === "HEAD" || Q === null || I.statusCode === 204 || I.statusCode === 304) {
        u = new YA(B, p), t(u);
        return;
      }
      const m = {
        flush: _r.Z_SYNC_FLUSH,
        finishFlush: _r.Z_SYNC_FLUSH
      };
      if (Q === "gzip" || Q === "x-gzip") {
        B = Lr(B, _r.createGunzip(m), (w) => {
          w && r(w);
        }), u = new YA(B, p), t(u);
        return;
      }
      if (Q === "deflate" || Q === "x-deflate") {
        const w = Lr(I, new no(), (y) => {
          y && r(y);
        });
        w.once("data", (y) => {
          (y[0] & 15) === 8 ? B = Lr(B, _r.createInflate(), (b) => {
            b && r(b);
          }) : B = Lr(B, _r.createInflateRaw(), (b) => {
            b && r(b);
          }), u = new YA(B, p), t(u);
        }), w.once("end", () => {
          u || (u = new YA(B, p), t(u));
        });
        return;
      }
      if (Q === "br") {
        B = Lr(B, _r.createBrotliDecompress(), (w) => {
          w && r(w);
        }), u = new YA(B, p), t(u);
        return;
      }
      u = new YA(B, p), t(u);
    }), Lb(E, s).catch(r);
  });
}
function xb(A, e) {
  const t = fA.from(`0\r
\r
`);
  let r = !1, s = !1, o;
  A.on("response", (i) => {
    const { headers: c } = i;
    r = c["transfer-encoding"] === "chunked" && !c["content-length"];
  }), A.on("socket", (i) => {
    const c = () => {
      if (r && !s) {
        const u = new Error("Premature close");
        u.code = "ERR_STREAM_PREMATURE_CLOSE", e(u);
      }
    }, g = (u) => {
      s = fA.compare(u.slice(-5), t) === 0, !s && o && (s = fA.compare(o.slice(-3), t.slice(0, 3)) === 0 && fA.compare(u.slice(-2), t.slice(3)) === 0), o = u;
    };
    i.prependListener("close", c), i.on("data", g), A.on("close", () => {
      i.removeListener("close", c), i.removeListener("data", g);
    });
  });
}
const qu = async ({
  url: A,
  token: e,
  body: t,
  method: r
}) => {
  const s = await mQ(A, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": e
    },
    body: t,
    method: r
  });
  if (!s.ok) {
    const o = s.headers.get("Content-Type");
    throw new Error(
      `response not ok ${s.status}, ${JSON.stringify(
        {
          body: o === "application/json" ? await s.json() : {}
        },
        null,
        2
      )}`
    );
  }
  return await s.json();
}, jb = 5e3, zb = 2 * 60 * 60 * 1e3, Zb = "https://app.octomind.dev", $b = (A) => new Promise((e) => vC(e, A)), xu = (A) => `${A}/api/apiKey/v2/execute`, Xb = (A, e, t) => `${A}/api/apiKey/v2/test-targets/${e}/test-reports/${t}`, Kb = async ({
  pollingIntervalInMilliseconds: A = jb,
  maximumPollingTimeInMilliseconds: e = zb
} = {}) => {
  const t = wA.getInput("automagicallyBaseUrl"), r = t.length === 0 ? Zb : t, s = Et.context.issue.number;
  (!s || s < 1) && wA.warning(
    "issue.number variable (Pull Request ID) not available. Make sure you run this action in a workflow triggered by pull request if you expect a comment with the test results on your PR"
  );
  const o = {
    issueNumber: s,
    repo: Et.context.repo.repo,
    owner: Et.context.repo.owner,
    ref: Et.context.ref,
    sha: Et.context.sha
  };
  wA.debug(
    JSON.stringify(
      { executeUrl: xu(r), context: o },
      null,
      2
    )
  );
  const i = wA.getInput("url");
  i.length === 0 && wA.setFailed("url is set to an empty string");
  const c = wA.getInput("token");
  c.length === 0 && wA.setFailed("token is set to an empty string");
  const g = wA.getInput("testTargetId");
  g.length === 0 && wA.setFailed("testTargetId is set to an empty string");
  const u = wA.getBooleanInput("blocking");
  try {
    const l = await qu({
      url: xu(r),
      method: "POST",
      token: c,
      body: JSON.stringify({
        url: i,
        testTargetId: g,
        context: {
          source: "github",
          ...o
        }
      })
    }), h = l.testReportUrl;
    if (wA.setOutput("testReportUrl", l.testReportUrl), await wA.summary.addHeading("🐙 Octomind").addLink("View your Test Report", h).write(), u) {
      let E = l.testReport.status;
      const f = Date.now();
      let I = f;
      for (; E === "WAITING" && I - f < e; )
        E = (await qu({
          method: "GET",
          token: c,
          url: Xb(
            r,
            g,
            l.testReport.id
          )
        })).status, await $b(A), I = Date.now();
      E !== "PASSED" && wA.setFailed(
        `some test results failed, check your test report at ${h} to find out more.`
      );
    }
  } catch (l) {
    l instanceof Error ? wA.setFailed(
      `unable to execute automagically:  ${typeof l.message == "object" ? JSON.stringify({
        error: l.message
      }) : l.message}`
    ) : wA.setFailed("unknown Error");
  }
};
await Kb();
export {
  $a as F,
  yb as a
};
//# sourceMappingURL=index-DJ0tc8mD.js.map
