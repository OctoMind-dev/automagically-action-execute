import "node:fs";
import "node:path";
import { F as k, a as U } from "./index-DJ0tc8mD.js";
let f = 0;
const t = {
  START_BOUNDARY: f++,
  HEADER_FIELD_START: f++,
  HEADER_FIELD: f++,
  HEADER_VALUE_START: f++,
  HEADER_VALUE: f++,
  HEADER_VALUE_ALMOST_DONE: f++,
  HEADERS_ALMOST_DONE: f++,
  PART_DATA_START: f++,
  PART_DATA: f++,
  END: f++
};
let F = 1;
const _ = {
  PART_BOUNDARY: F,
  LAST_BOUNDARY: F *= 2
}, O = 10, g = 13, w = 32, p = 45, B = 58, V = 97, Y = 122, x = (u) => u | 32, R = () => {
};
class C {
  /**
   * @param {string} boundary
   */
  constructor(o) {
    this.index = 0, this.flags = 0, this.onHeaderEnd = R, this.onHeaderField = R, this.onHeadersEnd = R, this.onHeaderValue = R, this.onPartBegin = R, this.onPartData = R, this.onPartEnd = R, this.boundaryChars = {}, o = `\r
--` + o;
    const n = new Uint8Array(o.length);
    for (let r = 0; r < o.length; r++)
      n[r] = o.charCodeAt(r), this.boundaryChars[n[r]] = !0;
    this.boundary = n, this.lookbehind = new Uint8Array(this.boundary.length + 8), this.state = t.START_BOUNDARY;
  }
  /**
   * @param {Uint8Array} data
   */
  write(o) {
    let n = 0;
    const r = o.length;
    let E = this.index, { lookbehind: l, boundary: d, boundaryChars: H, index: e, state: i, flags: A } = this;
    const b = this.boundary.length, m = b - 1, N = o.length;
    let a, P;
    const h = (c) => {
      this[c + "Mark"] = n;
    }, s = (c) => {
      delete this[c + "Mark"];
    }, D = (c, S, T, y) => {
      (S === void 0 || S !== T) && this[c](y && y.subarray(S, T));
    }, L = (c, S) => {
      const T = c + "Mark";
      T in this && (S ? (D(c, this[T], n, o), delete this[T]) : (D(c, this[T], o.length, o), this[T] = 0));
    };
    for (n = 0; n < r; n++)
      switch (a = o[n], i) {
        case t.START_BOUNDARY:
          if (e === d.length - 2) {
            if (a === p)
              A |= _.LAST_BOUNDARY;
            else if (a !== g)
              return;
            e++;
            break;
          } else if (e - 1 === d.length - 2) {
            if (A & _.LAST_BOUNDARY && a === p)
              i = t.END, A = 0;
            else if (!(A & _.LAST_BOUNDARY) && a === O)
              e = 0, D("onPartBegin"), i = t.HEADER_FIELD_START;
            else
              return;
            break;
          }
          a !== d[e + 2] && (e = -2), a === d[e + 2] && e++;
          break;
        case t.HEADER_FIELD_START:
          i = t.HEADER_FIELD, h("onHeaderField"), e = 0;
        case t.HEADER_FIELD:
          if (a === g) {
            s("onHeaderField"), i = t.HEADERS_ALMOST_DONE;
            break;
          }
          if (e++, a === p)
            break;
          if (a === B) {
            if (e === 1)
              return;
            L("onHeaderField", !0), i = t.HEADER_VALUE_START;
            break;
          }
          if (P = x(a), P < V || P > Y)
            return;
          break;
        case t.HEADER_VALUE_START:
          if (a === w)
            break;
          h("onHeaderValue"), i = t.HEADER_VALUE;
        case t.HEADER_VALUE:
          a === g && (L("onHeaderValue", !0), D("onHeaderEnd"), i = t.HEADER_VALUE_ALMOST_DONE);
          break;
        case t.HEADER_VALUE_ALMOST_DONE:
          if (a !== O)
            return;
          i = t.HEADER_FIELD_START;
          break;
        case t.HEADERS_ALMOST_DONE:
          if (a !== O)
            return;
          D("onHeadersEnd"), i = t.PART_DATA_START;
          break;
        case t.PART_DATA_START:
          i = t.PART_DATA, h("onPartData");
        case t.PART_DATA:
          if (E = e, e === 0) {
            for (n += m; n < N && !(o[n] in H); )
              n += b;
            n -= m, a = o[n];
          }
          if (e < d.length)
            d[e] === a ? (e === 0 && L("onPartData", !0), e++) : e = 0;
          else if (e === d.length)
            e++, a === g ? A |= _.PART_BOUNDARY : a === p ? A |= _.LAST_BOUNDARY : e = 0;
          else if (e - 1 === d.length)
            if (A & _.PART_BOUNDARY) {
              if (e = 0, a === O) {
                A &= ~_.PART_BOUNDARY, D("onPartEnd"), D("onPartBegin"), i = t.HEADER_FIELD_START;
                break;
              }
            } else A & _.LAST_BOUNDARY && a === p ? (D("onPartEnd"), i = t.END, A = 0) : e = 0;
          if (e > 0)
            l[e - 1] = a;
          else if (E > 0) {
            const c = new Uint8Array(l.buffer, l.byteOffset, l.byteLength);
            D("onPartData", 0, E, c), E = 0, h("onPartData"), n--;
          }
          break;
        case t.END:
          break;
        default:
          throw new Error(`Unexpected state entered: ${i}`);
      }
    L("onHeaderField"), L("onHeaderValue"), L("onPartData"), this.index = e, this.state = i, this.flags = A;
  }
  end() {
    if (this.state === t.HEADER_FIELD_START && this.index === 0 || this.state === t.PART_DATA && this.index === this.boundary.length)
      this.onPartEnd();
    else if (this.state !== t.END)
      throw new Error("MultipartParser.end(): stream ended unexpectedly");
  }
}
function I(u) {
  const o = u.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!o)
    return;
  const n = o[2] || o[3] || "";
  let r = n.slice(n.lastIndexOf("\\") + 1);
  return r = r.replace(/%22/g, '"'), r = r.replace(/&#(\d{4});/g, (E, l) => String.fromCharCode(l)), r;
}
async function Z(u, o) {
  if (!/multipart/i.test(o))
    throw new TypeError("Failed to fetch");
  const n = o.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!n)
    throw new TypeError("no or bad content-type header, no multipart boundary");
  const r = new C(n[1] || n[2]);
  let E, l, d, H, e, i;
  const A = [], b = new k(), m = (s) => {
    d += h.decode(s, { stream: !0 });
  }, N = (s) => {
    A.push(s);
  }, a = () => {
    const s = new U(A, i, { type: e });
    b.append(H, s);
  }, P = () => {
    b.append(H, d);
  }, h = new TextDecoder("utf-8");
  h.decode(), r.onPartBegin = function() {
    r.onPartData = m, r.onPartEnd = P, E = "", l = "", d = "", H = "", e = "", i = null, A.length = 0;
  }, r.onHeaderField = function(s) {
    E += h.decode(s, { stream: !0 });
  }, r.onHeaderValue = function(s) {
    l += h.decode(s, { stream: !0 });
  }, r.onHeaderEnd = function() {
    if (l += h.decode(), E = E.toLowerCase(), E === "content-disposition") {
      const s = l.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      s && (H = s[2] || s[3] || ""), i = I(l), i && (r.onPartData = N, r.onPartEnd = a);
    } else E === "content-type" && (e = l);
    l = "", E = "";
  };
  for await (const s of u)
    r.write(s);
  return r.end(), b;
}
export {
  Z as toFormData
};
//# sourceMappingURL=multipart-parser-CpbRXZZ4.js.map
