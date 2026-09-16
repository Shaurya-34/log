/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const yr = "168";
const en = "", Lt = "srgb", rn = "srgb-linear", Tr = "display-p3", Fi = "display-p3-linear", Ci = "linear", Ye = "srgb", Pi = "rec709", Li = "p3";
const Nr = "300 es";
class Bn {
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
  }
  hasEventListener(e, t) {
    if (this._listeners === void 0) return !1;
    const n = this._listeners;
    return n[e] !== void 0 && n[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    if (this._listeners === void 0) return;
    const r = this._listeners[e];
    if (r !== void 0) {
      const s = r.indexOf(t);
      s !== -1 && r.splice(s, 1);
    }
  }
  dispatchEvent(e) {
    if (this._listeners === void 0) return;
    const n = this._listeners[e.type];
    if (n !== void 0) {
      e.target = this;
      const r = n.slice(0);
      for (let s = 0, a = r.length; s < a; s++)
        r[s].call(this, e);
      e.target = null;
    }
  }
}
const ht = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], ki = Math.PI / 180, Sr = 180 / Math.PI;
function jn() {
  const i = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (ht[i & 255] + ht[i >> 8 & 255] + ht[i >> 16 & 255] + ht[i >> 24 & 255] + "-" + ht[e & 255] + ht[e >> 8 & 255] + "-" + ht[e >> 16 & 15 | 64] + ht[e >> 24 & 255] + "-" + ht[t & 63 | 128] + ht[t >> 8 & 255] + "-" + ht[t >> 16 & 255] + ht[t >> 24 & 255] + ht[n & 255] + ht[n >> 8 & 255] + ht[n >> 16 & 255] + ht[n >> 24 & 255]).toLowerCase();
}
function _t(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
function fa(i, e) {
  return (i % e + e) % e;
}
function Wi(i, e, t) {
  return (1 - t) * i + t * e;
}
function Vn(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function mt(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
class Oe {
  constructor(e = 0, t = 0) {
    Oe.prototype.isVector2 = !0, this.x = e, this.y = t;
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const t = this.x, n = this.y, r = e.elements;
    return this.x = r[0] * t + r[3] * n + r[6], this.y = r[1] * t + r[4] * n + r[7], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(_t(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y;
    return t * t + n * n;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  rotateAround(e, t) {
    const n = Math.cos(t), r = Math.sin(t), s = this.x - e.x, a = this.y - e.y;
    return this.x = s * n - a * r + e.x, this.y = s * r + a * n + e.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Le {
  constructor(e, t, n, r, s, a, o, l, c) {
    Le.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r, s, a, o, l, c);
  }
  set(e, t, n, r, s, a, o, l, c) {
    const u = this.elements;
    return u[0] = e, u[1] = r, u[2] = o, u[3] = t, u[4] = s, u[5] = l, u[6] = n, u[7] = a, u[8] = c, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
  }
  extractBasis(e, t, n) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[4],
      t[8],
      t[1],
      t[5],
      t[9],
      t[2],
      t[6],
      t[10]
    ), this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements, r = t.elements, s = this.elements, a = n[0], o = n[3], l = n[6], c = n[1], u = n[4], p = n[7], d = n[2], m = n[5], _ = n[8], x = r[0], f = r[3], h = r[6], b = r[1], E = r[4], y = r[7], F = r[2], R = r[5], P = r[8];
    return s[0] = a * x + o * b + l * F, s[3] = a * f + o * E + l * R, s[6] = a * h + o * y + l * P, s[1] = c * x + u * b + p * F, s[4] = c * f + u * E + p * R, s[7] = c * h + u * y + p * P, s[2] = d * x + m * b + _ * F, s[5] = d * f + m * E + _ * R, s[8] = d * h + m * y + _ * P, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], a = e[4], o = e[5], l = e[6], c = e[7], u = e[8];
    return t * a * u - t * o * c - n * s * u + n * o * l + r * s * c - r * a * l;
  }
  invert() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], a = e[4], o = e[5], l = e[6], c = e[7], u = e[8], p = u * a - o * c, d = o * l - u * s, m = c * s - a * l, _ = t * p + n * d + r * m;
    if (_ === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const x = 1 / _;
    return e[0] = p * x, e[1] = (r * c - u * n) * x, e[2] = (o * n - r * a) * x, e[3] = d * x, e[4] = (u * t - r * l) * x, e[5] = (r * s - o * t) * x, e[6] = m * x, e[7] = (n * l - c * t) * x, e[8] = (a * t - n * s) * x, this;
  }
  transpose() {
    let e;
    const t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
  }
  setUvTransform(e, t, n, r, s, a, o) {
    const l = Math.cos(s), c = Math.sin(s);
    return this.set(
      n * l,
      n * c,
      -n * (l * a + c * o) + a + e,
      -r * c,
      r * l,
      -r * (-c * a + l * o) + o + t,
      0,
      0,
      1
    ), this;
  }
  //
  scale(e, t) {
    return this.premultiply(Xi.makeScale(e, t)), this;
  }
  rotate(e) {
    return this.premultiply(Xi.makeRotation(-e)), this;
  }
  translate(e, t) {
    return this.premultiply(Xi.makeTranslation(e, t)), this;
  }
  // for 2D Transforms
  makeTranslation(e, t) {
    return e.isVector2 ? this.set(
      1,
      0,
      e.x,
      0,
      1,
      e.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      e,
      0,
      1,
      t,
      0,
      0,
      1
    ), this;
  }
  makeRotation(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      n,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, t) {
    return this.set(
      e,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  //
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let r = 0; r < 9; r++)
      if (t[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 9; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const Xi = /* @__PURE__ */ new Le();
function Hs(i) {
  for (let e = i.length - 1; e >= 0; --e)
    if (i[e] >= 65535) return !0;
  return !1;
}
function Di(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function pa() {
  const i = Di("canvas");
  return i.style.display = "block", i;
}
const Or = {};
function Zn(i) {
  i in Or || (Or[i] = !0, console.warn(i));
}
function ma(i, e, t) {
  return new Promise(function(n, r) {
    function s() {
      switch (i.clientWaitSync(e, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case i.WAIT_FAILED:
          r();
          break;
        case i.TIMEOUT_EXPIRED:
          setTimeout(s, t);
          break;
        default:
          n();
      }
    }
    setTimeout(s, t);
  });
}
const Br = /* @__PURE__ */ new Le().set(
  0.8224621,
  0.177538,
  0,
  0.0331941,
  0.9668058,
  0,
  0.0170827,
  0.0723974,
  0.9105199
), Gr = /* @__PURE__ */ new Le().set(
  1.2249401,
  -0.2249404,
  0,
  -0.0420569,
  1.0420571,
  0,
  -0.0196376,
  -0.0786361,
  1.0982735
), kn = {
  [rn]: {
    transfer: Ci,
    primaries: Pi,
    luminanceCoefficients: [0.2126, 0.7152, 0.0722],
    toReference: (i) => i,
    fromReference: (i) => i
  },
  [Lt]: {
    transfer: Ye,
    primaries: Pi,
    luminanceCoefficients: [0.2126, 0.7152, 0.0722],
    toReference: (i) => i.convertSRGBToLinear(),
    fromReference: (i) => i.convertLinearToSRGB()
  },
  [Fi]: {
    transfer: Ci,
    primaries: Li,
    luminanceCoefficients: [0.2289, 0.6917, 0.0793],
    toReference: (i) => i.applyMatrix3(Gr),
    fromReference: (i) => i.applyMatrix3(Br)
  },
  [Tr]: {
    transfer: Ye,
    primaries: Li,
    luminanceCoefficients: [0.2289, 0.6917, 0.0793],
    toReference: (i) => i.convertSRGBToLinear().applyMatrix3(Gr),
    fromReference: (i) => i.applyMatrix3(Br).convertLinearToSRGB()
  }
}, _a = /* @__PURE__ */ new Set([rn, Fi]), ke = {
  enabled: !0,
  _workingColorSpace: rn,
  get workingColorSpace() {
    return this._workingColorSpace;
  },
  set workingColorSpace(i) {
    if (!_a.has(i))
      throw new Error(`Unsupported working color space, "${i}".`);
    this._workingColorSpace = i;
  },
  convert: function(i, e, t) {
    if (this.enabled === !1 || e === t || !e || !t)
      return i;
    const n = kn[e].toReference, r = kn[t].fromReference;
    return r(n(i));
  },
  fromWorkingColorSpace: function(i, e) {
    return this.convert(i, this._workingColorSpace, e);
  },
  toWorkingColorSpace: function(i, e) {
    return this.convert(i, e, this._workingColorSpace);
  },
  getPrimaries: function(i) {
    return kn[i].primaries;
  },
  getTransfer: function(i) {
    return i === en ? Ci : kn[i].transfer;
  },
  getLuminanceCoefficients: function(i, e = this._workingColorSpace) {
    return i.fromArray(kn[e].luminanceCoefficients);
  }
};
function Fn(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function qi(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
let vn;
class ga {
  static getDataURL(e) {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let t;
    if (e instanceof HTMLCanvasElement)
      t = e;
    else {
      vn === void 0 && (vn = Di("canvas")), vn.width = e.width, vn.height = e.height;
      const n = vn.getContext("2d");
      e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), t = vn;
    }
    return t.width > 2048 || t.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e), t.toDataURL("image/jpeg", 0.6)) : t.toDataURL("image/png");
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = Di("canvas");
      t.width = e.width, t.height = e.height;
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const r = n.getImageData(0, 0, e.width, e.height), s = r.data;
      for (let a = 0; a < s.length; a++)
        s[a] = Fn(s[a] / 255) * 255;
      return n.putImageData(r, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let n = 0; n < t.length; n++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(Fn(t[n] / 255) * 255) : t[n] = Fn(t[n]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let va = 0;
class Vs {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: va++ }), this.uuid = jn(), this.data = e, this.dataReady = !0, this.version = 0;
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0)
      return e.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, r = this.data;
    if (r !== null) {
      let s;
      if (Array.isArray(r)) {
        s = [];
        for (let a = 0, o = r.length; a < o; a++)
          r[a].isDataTexture ? s.push(Yi(r[a].image)) : s.push(Yi(r[a]));
      } else
        s = Yi(r);
      n.url = s;
    }
    return t || (e.images[this.uuid] = n), n;
  }
}
function Yi(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? ga.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let xa = 0;
class vt extends Bn {
  constructor(e = vt.DEFAULT_IMAGE, t = vt.DEFAULT_MAPPING, n = 1001, r = 1001, s = 1006, a = 1008, o = 1023, l = 1009, c = vt.DEFAULT_ANISOTROPY, u = en) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: xa++ }), this.uuid = jn(), this.name = "", this.source = new Vs(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = s, this.minFilter = a, this.anisotropy = c, this.format = o, this.internalFormat = null, this.type = l, this.offset = new Oe(0, 0), this.repeat = new Oe(1, 1), this.center = new Oe(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Le(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = u, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.pmremVersion = 0;
  }
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.textures[this.uuid] !== void 0)
      return e.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(e) {
    if (this.mapping !== 300) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case 1e3:
          e.x = e.x - Math.floor(e.x);
          break;
        case 1001:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case 1e3:
          e.y = e.y - Math.floor(e.y);
          break;
        case 1001:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
          break;
      }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  set needsUpdate(e) {
    e === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(e) {
    e === !0 && this.pmremVersion++;
  }
}
vt.DEFAULT_IMAGE = null;
vt.DEFAULT_MAPPING = 300;
vt.DEFAULT_ANISOTROPY = 1;
class rt {
  constructor(e = 0, t = 0, n = 0, r = 1) {
    rt.prototype.isVector4 = !0, this.x = e, this.y = t, this.z = n, this.w = r;
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, t, n, r) {
    return this.x = e, this.y = t, this.z = n, this.w = r, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setW(e) {
    return this.w = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  applyMatrix4(e) {
    const t = this.x, n = this.y, r = this.z, s = this.w, a = e.elements;
    return this.x = a[0] * t + a[4] * n + a[8] * r + a[12] * s, this.y = a[1] * t + a[5] * n + a[9] * r + a[13] * s, this.z = a[2] * t + a[6] * n + a[10] * r + a[14] * s, this.w = a[3] * t + a[7] * n + a[11] * r + a[15] * s, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  setAxisAngleFromRotationMatrix(e) {
    let t, n, r, s;
    const l = e.elements, c = l[0], u = l[4], p = l[8], d = l[1], m = l[5], _ = l[9], x = l[2], f = l[6], h = l[10];
    if (Math.abs(u - d) < 0.01 && Math.abs(p - x) < 0.01 && Math.abs(_ - f) < 0.01) {
      if (Math.abs(u + d) < 0.1 && Math.abs(p + x) < 0.1 && Math.abs(_ + f) < 0.1 && Math.abs(c + m + h - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const E = (c + 1) / 2, y = (m + 1) / 2, F = (h + 1) / 2, R = (u + d) / 4, P = (p + x) / 4, T = (_ + f) / 4;
      return E > y && E > F ? E < 0.01 ? (n = 0, r = 0.707106781, s = 0.707106781) : (n = Math.sqrt(E), r = R / n, s = P / n) : y > F ? y < 0.01 ? (n = 0.707106781, r = 0, s = 0.707106781) : (r = Math.sqrt(y), n = R / r, s = T / r) : F < 0.01 ? (n = 0.707106781, r = 0.707106781, s = 0) : (s = Math.sqrt(F), n = P / s, r = T / s), this.set(n, r, s, t), this;
    }
    let b = Math.sqrt((f - _) * (f - _) + (p - x) * (p - x) + (d - u) * (d - u));
    return Math.abs(b) < 1e-3 && (b = 1), this.x = (f - _) / b, this.y = (p - x) / b, this.z = (d - u) / b, this.w = Math.acos((c + m + h - 1) / 2), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this.w = Math.max(e.w, Math.min(t.w, this.w)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this.w = Math.max(e, Math.min(t, this.w)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class Ma extends Bn {
  constructor(e = 1, t = 1, n = {}) {
    super(), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = 1, this.scissor = new rt(0, 0, e, t), this.scissorTest = !1, this.viewport = new rt(0, 0, e, t);
    const r = { width: e, height: t, depth: 1 };
    n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: 1006,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1
    }, n);
    const s = new vt(r, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace);
    s.flipY = !1, s.generateMipmaps = n.generateMipmaps, s.internalFormat = n.internalFormat, this.textures = [];
    const a = n.count;
    for (let o = 0; o < a; o++)
      this.textures[o] = s.clone(), this.textures[o].isRenderTargetTexture = !0;
    this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this.depthTexture = n.depthTexture, this.samples = n.samples;
  }
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  setSize(e, t, n = 1) {
    if (this.width !== e || this.height !== t || this.depth !== n) {
      this.width = e, this.height = t, this.depth = n;
      for (let r = 0, s = this.textures.length; r < s; r++)
        this.textures[r].image.width = e, this.textures[r].image.height = t, this.textures[r].image.depth = n;
      this.dispose();
    }
    this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let n = 0, r = e.textures.length; n < r; n++)
      this.textures[n] = e.textures[n].clone(), this.textures[n].isRenderTargetTexture = !0;
    const t = Object.assign({}, e.texture.image);
    return this.texture.source = new Vs(t), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class tn extends Ma {
  constructor(e = 1, t = 1, n = {}) {
    super(e, t, n), this.isWebGLRenderTarget = !0;
  }
}
class ks extends vt {
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class Sa extends vt {
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class Jn {
  constructor(e = 0, t = 0, n = 0, r = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r;
  }
  static slerpFlat(e, t, n, r, s, a, o) {
    let l = n[r + 0], c = n[r + 1], u = n[r + 2], p = n[r + 3];
    const d = s[a + 0], m = s[a + 1], _ = s[a + 2], x = s[a + 3];
    if (o === 0) {
      e[t + 0] = l, e[t + 1] = c, e[t + 2] = u, e[t + 3] = p;
      return;
    }
    if (o === 1) {
      e[t + 0] = d, e[t + 1] = m, e[t + 2] = _, e[t + 3] = x;
      return;
    }
    if (p !== x || l !== d || c !== m || u !== _) {
      let f = 1 - o;
      const h = l * d + c * m + u * _ + p * x, b = h >= 0 ? 1 : -1, E = 1 - h * h;
      if (E > Number.EPSILON) {
        const F = Math.sqrt(E), R = Math.atan2(F, h * b);
        f = Math.sin(f * R) / F, o = Math.sin(o * R) / F;
      }
      const y = o * b;
      if (l = l * f + d * y, c = c * f + m * y, u = u * f + _ * y, p = p * f + x * y, f === 1 - o) {
        const F = 1 / Math.sqrt(l * l + c * c + u * u + p * p);
        l *= F, c *= F, u *= F, p *= F;
      }
    }
    e[t] = l, e[t + 1] = c, e[t + 2] = u, e[t + 3] = p;
  }
  static multiplyQuaternionsFlat(e, t, n, r, s, a) {
    const o = n[r], l = n[r + 1], c = n[r + 2], u = n[r + 3], p = s[a], d = s[a + 1], m = s[a + 2], _ = s[a + 3];
    return e[t] = o * _ + u * p + l * m - c * d, e[t + 1] = l * _ + u * d + c * p - o * m, e[t + 2] = c * _ + u * m + o * d - l * p, e[t + 3] = u * _ - o * p - l * d - c * m, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, t, n, r) {
    return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, t = !0) {
    const n = e._x, r = e._y, s = e._z, a = e._order, o = Math.cos, l = Math.sin, c = o(n / 2), u = o(r / 2), p = o(s / 2), d = l(n / 2), m = l(r / 2), _ = l(s / 2);
    switch (a) {
      case "XYZ":
        this._x = d * u * p + c * m * _, this._y = c * m * p - d * u * _, this._z = c * u * _ + d * m * p, this._w = c * u * p - d * m * _;
        break;
      case "YXZ":
        this._x = d * u * p + c * m * _, this._y = c * m * p - d * u * _, this._z = c * u * _ - d * m * p, this._w = c * u * p + d * m * _;
        break;
      case "ZXY":
        this._x = d * u * p - c * m * _, this._y = c * m * p + d * u * _, this._z = c * u * _ + d * m * p, this._w = c * u * p - d * m * _;
        break;
      case "ZYX":
        this._x = d * u * p - c * m * _, this._y = c * m * p + d * u * _, this._z = c * u * _ - d * m * p, this._w = c * u * p + d * m * _;
        break;
      case "YZX":
        this._x = d * u * p + c * m * _, this._y = c * m * p + d * u * _, this._z = c * u * _ - d * m * p, this._w = c * u * p - d * m * _;
        break;
      case "XZY":
        this._x = d * u * p - c * m * _, this._y = c * m * p - d * u * _, this._z = c * u * _ + d * m * p, this._w = c * u * p + d * m * _;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const n = t / 2, r = Math.sin(n);
    return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements, n = t[0], r = t[4], s = t[8], a = t[1], o = t[5], l = t[9], c = t[2], u = t[6], p = t[10], d = n + o + p;
    if (d > 0) {
      const m = 0.5 / Math.sqrt(d + 1);
      this._w = 0.25 / m, this._x = (u - l) * m, this._y = (s - c) * m, this._z = (a - r) * m;
    } else if (n > o && n > p) {
      const m = 2 * Math.sqrt(1 + n - o - p);
      this._w = (u - l) / m, this._x = 0.25 * m, this._y = (r + a) / m, this._z = (s + c) / m;
    } else if (o > p) {
      const m = 2 * Math.sqrt(1 + o - n - p);
      this._w = (s - c) / m, this._x = (r + a) / m, this._y = 0.25 * m, this._z = (l + u) / m;
    } else {
      const m = 2 * Math.sqrt(1 + p - n - o);
      this._w = (a - r) / m, this._x = (s + c) / m, this._y = (l + u) / m, this._z = 0.25 * m;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return n < Number.EPSILON ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(_t(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    const n = this.angleTo(e);
    if (n === 0) return this;
    const r = Math.min(1, t / n);
    return this.slerp(e, r), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    const n = e._x, r = e._y, s = e._z, a = e._w, o = t._x, l = t._y, c = t._z, u = t._w;
    return this._x = n * u + a * o + r * c - s * l, this._y = r * u + a * l + s * o - n * c, this._z = s * u + a * c + n * l - r * o, this._w = a * u - n * o - r * l - s * c, this._onChangeCallback(), this;
  }
  slerp(e, t) {
    if (t === 0) return this;
    if (t === 1) return this.copy(e);
    const n = this._x, r = this._y, s = this._z, a = this._w;
    let o = a * e._w + n * e._x + r * e._y + s * e._z;
    if (o < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, o = -o) : this.copy(e), o >= 1)
      return this._w = a, this._x = n, this._y = r, this._z = s, this;
    const l = 1 - o * o;
    if (l <= Number.EPSILON) {
      const m = 1 - t;
      return this._w = m * a + t * this._w, this._x = m * n + t * this._x, this._y = m * r + t * this._y, this._z = m * s + t * this._z, this.normalize(), this;
    }
    const c = Math.sqrt(l), u = Math.atan2(c, o), p = Math.sin((1 - t) * u) / c, d = Math.sin(t * u) / c;
    return this._w = a * p + this._w * d, this._x = n * p + this._x * d, this._y = r * p + this._y * d, this._z = s * p + this._z * d, this._onChangeCallback(), this;
  }
  slerpQuaternions(e, t, n) {
    return this.copy(e).slerp(t, n);
  }
  random() {
    const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), r = Math.sqrt(1 - n), s = Math.sqrt(n);
    return this.set(
      r * Math.sin(e),
      r * Math.cos(e),
      s * Math.sin(t),
      s * Math.cos(t)
    );
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class N {
  constructor(e = 0, t = 0, n = 0) {
    N.prototype.isVector3 = !0, this.x = e, this.y = t, this.z = n;
  }
  set(e, t, n) {
    return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  applyEuler(e) {
    return this.applyQuaternion(zr.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(zr.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    const t = this.x, n = this.y, r = this.z, s = e.elements;
    return this.x = s[0] * t + s[3] * n + s[6] * r, this.y = s[1] * t + s[4] * n + s[7] * r, this.z = s[2] * t + s[5] * n + s[8] * r, this;
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const t = this.x, n = this.y, r = this.z, s = e.elements, a = 1 / (s[3] * t + s[7] * n + s[11] * r + s[15]);
    return this.x = (s[0] * t + s[4] * n + s[8] * r + s[12]) * a, this.y = (s[1] * t + s[5] * n + s[9] * r + s[13]) * a, this.z = (s[2] * t + s[6] * n + s[10] * r + s[14]) * a, this;
  }
  applyQuaternion(e) {
    const t = this.x, n = this.y, r = this.z, s = e.x, a = e.y, o = e.z, l = e.w, c = 2 * (a * r - o * n), u = 2 * (o * t - s * r), p = 2 * (s * n - a * t);
    return this.x = t + l * c + a * p - o * u, this.y = n + l * u + o * c - s * p, this.z = r + l * p + s * u - a * c, this;
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    const t = this.x, n = this.y, r = this.z, s = e.elements;
    return this.x = s[0] * t + s[4] * n + s[8] * r, this.y = s[1] * t + s[5] * n + s[9] * r, this.z = s[2] * t + s[6] * n + s[10] * r, this.normalize();
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  // TODO lengthSquared?
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, t) {
    const n = e.x, r = e.y, s = e.z, a = t.x, o = t.y, l = t.z;
    return this.x = r * l - s * o, this.y = s * a - n * l, this.z = n * o - r * a, this;
  }
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    const n = e.dot(this) / t;
    return this.copy(e).multiplyScalar(n);
  }
  projectOnPlane(e) {
    return Ki.copy(this).projectOnVector(e), this.sub(Ki);
  }
  reflect(e) {
    return this.sub(Ki.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(_t(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y, r = this.z - e.z;
    return t * t + n * n + r * r;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, t, n) {
    const r = Math.sin(t) * e;
    return this.x = r * Math.sin(n), this.y = Math.cos(t) * e, this.z = r * Math.cos(n), this;
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, t, n) {
    return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = n, this.z = r, this;
  }
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t);
    return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const Ki = /* @__PURE__ */ new N(), zr = /* @__PURE__ */ new Jn();
class Qn {
  constructor(e = new N(1 / 0, 1 / 0, 1 / 0), t = new N(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3)
      this.expandByPoint(wt.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++)
      this.expandByPoint(wt.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++)
      this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const n = wt.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
  }
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const n = e.geometry;
    if (n !== void 0) {
      const s = n.getAttribute("position");
      if (t === !0 && s !== void 0 && e.isInstancedMesh !== !0)
        for (let a = 0, o = s.count; a < o; a++)
          e.isMesh === !0 ? e.getVertexPosition(a, wt) : wt.fromBufferAttribute(s, a), wt.applyMatrix4(e.matrixWorld), this.expandByPoint(wt);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), ni.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), ni.copy(n.boundingBox)), ni.applyMatrix4(e.matrixWorld), this.union(ni);
    }
    const r = e.children;
    for (let s = 0, a = r.length; s < a; s++)
      this.expandByObject(r[s], t);
    return this;
  }
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, wt), wt.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(Wn), ii.subVectors(this.max, Wn), xn.subVectors(e.a, Wn), Mn.subVectors(e.b, Wn), Sn.subVectors(e.c, Wn), Yt.subVectors(Mn, xn), Kt.subVectors(Sn, Mn), an.subVectors(xn, Sn);
    let t = [
      0,
      -Yt.z,
      Yt.y,
      0,
      -Kt.z,
      Kt.y,
      0,
      -an.z,
      an.y,
      Yt.z,
      0,
      -Yt.x,
      Kt.z,
      0,
      -Kt.x,
      an.z,
      0,
      -an.x,
      -Yt.y,
      Yt.x,
      0,
      -Kt.y,
      Kt.x,
      0,
      -an.y,
      an.x,
      0
    ];
    return !$i(t, xn, Mn, Sn, ii) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !$i(t, xn, Mn, Sn, ii)) ? !1 : (ri.crossVectors(Yt, Kt), t = [ri.x, ri.y, ri.z], $i(t, xn, Mn, Sn, ii));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, wt).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(wt).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (Gt[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Gt[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Gt[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Gt[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Gt[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Gt[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Gt[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Gt[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Gt), this);
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const Gt = [
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N()
], wt = /* @__PURE__ */ new N(), ni = /* @__PURE__ */ new Qn(), xn = /* @__PURE__ */ new N(), Mn = /* @__PURE__ */ new N(), Sn = /* @__PURE__ */ new N(), Yt = /* @__PURE__ */ new N(), Kt = /* @__PURE__ */ new N(), an = /* @__PURE__ */ new N(), Wn = /* @__PURE__ */ new N(), ii = /* @__PURE__ */ new N(), ri = /* @__PURE__ */ new N(), on = /* @__PURE__ */ new N();
function $i(i, e, t, n, r) {
  for (let s = 0, a = i.length - 3; s <= a; s += 3) {
    on.fromArray(i, s);
    const o = r.x * Math.abs(on.x) + r.y * Math.abs(on.y) + r.z * Math.abs(on.z), l = e.dot(on), c = t.dot(on), u = n.dot(on);
    if (Math.max(-Math.max(l, c, u), Math.min(l, c, u)) > o)
      return !1;
  }
  return !0;
}
const Ea = /* @__PURE__ */ new Qn(), Xn = /* @__PURE__ */ new N(), Zi = /* @__PURE__ */ new N();
class Ni {
  constructor(e = new N(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const n = this.center;
    t !== void 0 ? n.copy(t) : Ea.setFromPoints(e).getCenter(n);
    let r = 0;
    for (let s = 0, a = e.length; s < a; s++)
      r = Math.max(r, n.distanceToSquared(e[s]));
    return this.radius = Math.sqrt(r), this;
  }
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    const n = this.center.distanceToSquared(e);
    return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    Xn.subVectors(e, this.center);
    const t = Xn.lengthSq();
    if (t > this.radius * this.radius) {
      const n = Math.sqrt(t), r = (n - this.radius) * 0.5;
      this.center.addScaledVector(Xn, r / n), this.radius += r;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Zi.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(Xn.copy(e.center).add(Zi)), this.expandByPoint(Xn.copy(e.center).sub(Zi))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const zt = /* @__PURE__ */ new N(), ji = /* @__PURE__ */ new N(), si = /* @__PURE__ */ new N(), $t = /* @__PURE__ */ new N(), Ji = /* @__PURE__ */ new N(), ai = /* @__PURE__ */ new N(), Qi = /* @__PURE__ */ new N();
class Ws {
  constructor(e = new N(), t = new N(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, zt)), this;
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const n = t.dot(this.direction);
    return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const t = zt.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (zt.copy(this.origin).addScaledVector(this.direction, t), zt.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, n, r) {
    ji.copy(e).add(t).multiplyScalar(0.5), si.copy(t).sub(e).normalize(), $t.copy(this.origin).sub(ji);
    const s = e.distanceTo(t) * 0.5, a = -this.direction.dot(si), o = $t.dot(this.direction), l = -$t.dot(si), c = $t.lengthSq(), u = Math.abs(1 - a * a);
    let p, d, m, _;
    if (u > 0)
      if (p = a * l - o, d = a * o - l, _ = s * u, p >= 0)
        if (d >= -_)
          if (d <= _) {
            const x = 1 / u;
            p *= x, d *= x, m = p * (p + a * d + 2 * o) + d * (a * p + d + 2 * l) + c;
          } else
            d = s, p = Math.max(0, -(a * d + o)), m = -p * p + d * (d + 2 * l) + c;
        else
          d = -s, p = Math.max(0, -(a * d + o)), m = -p * p + d * (d + 2 * l) + c;
      else
        d <= -_ ? (p = Math.max(0, -(-a * s + o)), d = p > 0 ? -s : Math.min(Math.max(-s, -l), s), m = -p * p + d * (d + 2 * l) + c) : d <= _ ? (p = 0, d = Math.min(Math.max(-s, -l), s), m = d * (d + 2 * l) + c) : (p = Math.max(0, -(a * s + o)), d = p > 0 ? s : Math.min(Math.max(-s, -l), s), m = -p * p + d * (d + 2 * l) + c);
    else
      d = a > 0 ? -s : s, p = Math.max(0, -(a * d + o)), m = -p * p + d * (d + 2 * l) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, p), r && r.copy(ji).addScaledVector(si, d), m;
  }
  intersectSphere(e, t) {
    zt.subVectors(e.center, this.origin);
    const n = zt.dot(this.direction), r = zt.dot(zt) - n * n, s = e.radius * e.radius;
    if (r > s) return null;
    const a = Math.sqrt(s - r), o = n - a, l = n + a;
    return l < 0 ? null : o < 0 ? this.at(l, t) : this.at(o, t);
  }
  intersectsSphere(e) {
    return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(e.normal) + e.constant) / t;
    return n >= 0 ? n : null;
  }
  intersectPlane(e, t) {
    const n = this.distanceToPlane(e);
    return n === null ? null : this.at(n, t);
  }
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let n, r, s, a, o, l;
    const c = 1 / this.direction.x, u = 1 / this.direction.y, p = 1 / this.direction.z, d = this.origin;
    return c >= 0 ? (n = (e.min.x - d.x) * c, r = (e.max.x - d.x) * c) : (n = (e.max.x - d.x) * c, r = (e.min.x - d.x) * c), u >= 0 ? (s = (e.min.y - d.y) * u, a = (e.max.y - d.y) * u) : (s = (e.max.y - d.y) * u, a = (e.min.y - d.y) * u), n > a || s > r || ((s > n || isNaN(n)) && (n = s), (a < r || isNaN(r)) && (r = a), p >= 0 ? (o = (e.min.z - d.z) * p, l = (e.max.z - d.z) * p) : (o = (e.max.z - d.z) * p, l = (e.min.z - d.z) * p), n > l || o > r) || ((o > n || n !== n) && (n = o), (l < r || r !== r) && (r = l), r < 0) ? null : this.at(n >= 0 ? n : r, t);
  }
  intersectsBox(e) {
    return this.intersectBox(e, zt) !== null;
  }
  intersectTriangle(e, t, n, r, s) {
    Ji.subVectors(t, e), ai.subVectors(n, e), Qi.crossVectors(Ji, ai);
    let a = this.direction.dot(Qi), o;
    if (a > 0) {
      if (r) return null;
      o = 1;
    } else if (a < 0)
      o = -1, a = -a;
    else
      return null;
    $t.subVectors(this.origin, e);
    const l = o * this.direction.dot(ai.crossVectors($t, ai));
    if (l < 0)
      return null;
    const c = o * this.direction.dot(Ji.cross($t));
    if (c < 0 || l + c > a)
      return null;
    const u = -o * $t.dot(Qi);
    return u < 0 ? null : this.at(u / a, s);
  }
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Je {
  constructor(e, t, n, r, s, a, o, l, c, u, p, d, m, _, x, f) {
    Je.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r, s, a, o, l, c, u, p, d, m, _, x, f);
  }
  set(e, t, n, r, s, a, o, l, c, u, p, d, m, _, x, f) {
    const h = this.elements;
    return h[0] = e, h[4] = t, h[8] = n, h[12] = r, h[1] = s, h[5] = a, h[9] = o, h[13] = l, h[2] = c, h[6] = u, h[10] = p, h[14] = d, h[3] = m, h[7] = _, h[11] = x, h[15] = f, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  clone() {
    return new Je().fromArray(this.elements);
  }
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
  }
  copyPosition(e) {
    const t = this.elements, n = e.elements;
    return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
  }
  setFromMatrix3(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[3],
      t[6],
      0,
      t[1],
      t[4],
      t[7],
      0,
      t[2],
      t[5],
      t[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(e, t, n) {
    return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(e, t, n) {
    return this.set(
      e.x,
      t.x,
      n.x,
      0,
      e.y,
      t.y,
      n.y,
      0,
      e.z,
      t.z,
      n.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(e) {
    const t = this.elements, n = e.elements, r = 1 / En.setFromMatrixColumn(e, 0).length(), s = 1 / En.setFromMatrixColumn(e, 1).length(), a = 1 / En.setFromMatrixColumn(e, 2).length();
    return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * s, t[5] = n[5] * s, t[6] = n[6] * s, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromEuler(e) {
    const t = this.elements, n = e.x, r = e.y, s = e.z, a = Math.cos(n), o = Math.sin(n), l = Math.cos(r), c = Math.sin(r), u = Math.cos(s), p = Math.sin(s);
    if (e.order === "XYZ") {
      const d = a * u, m = a * p, _ = o * u, x = o * p;
      t[0] = l * u, t[4] = -l * p, t[8] = c, t[1] = m + _ * c, t[5] = d - x * c, t[9] = -o * l, t[2] = x - d * c, t[6] = _ + m * c, t[10] = a * l;
    } else if (e.order === "YXZ") {
      const d = l * u, m = l * p, _ = c * u, x = c * p;
      t[0] = d + x * o, t[4] = _ * o - m, t[8] = a * c, t[1] = a * p, t[5] = a * u, t[9] = -o, t[2] = m * o - _, t[6] = x + d * o, t[10] = a * l;
    } else if (e.order === "ZXY") {
      const d = l * u, m = l * p, _ = c * u, x = c * p;
      t[0] = d - x * o, t[4] = -a * p, t[8] = _ + m * o, t[1] = m + _ * o, t[5] = a * u, t[9] = x - d * o, t[2] = -a * c, t[6] = o, t[10] = a * l;
    } else if (e.order === "ZYX") {
      const d = a * u, m = a * p, _ = o * u, x = o * p;
      t[0] = l * u, t[4] = _ * c - m, t[8] = d * c + x, t[1] = l * p, t[5] = x * c + d, t[9] = m * c - _, t[2] = -c, t[6] = o * l, t[10] = a * l;
    } else if (e.order === "YZX") {
      const d = a * l, m = a * c, _ = o * l, x = o * c;
      t[0] = l * u, t[4] = x - d * p, t[8] = _ * p + m, t[1] = p, t[5] = a * u, t[9] = -o * u, t[2] = -c * u, t[6] = m * p + _, t[10] = d - x * p;
    } else if (e.order === "XZY") {
      const d = a * l, m = a * c, _ = o * l, x = o * c;
      t[0] = l * u, t[4] = -p, t[8] = c * u, t[1] = d * p + x, t[5] = a * u, t[9] = m * p - _, t[2] = _ * p - m, t[6] = o * u, t[10] = x * p + d;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromQuaternion(e) {
    return this.compose(ya, e, Ta);
  }
  lookAt(e, t, n) {
    const r = this.elements;
    return Et.subVectors(e, t), Et.lengthSq() === 0 && (Et.z = 1), Et.normalize(), Zt.crossVectors(n, Et), Zt.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Et.x += 1e-4 : Et.z += 1e-4, Et.normalize(), Zt.crossVectors(n, Et)), Zt.normalize(), oi.crossVectors(Et, Zt), r[0] = Zt.x, r[4] = oi.x, r[8] = Et.x, r[1] = Zt.y, r[5] = oi.y, r[9] = Et.y, r[2] = Zt.z, r[6] = oi.z, r[10] = Et.z, this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements, r = t.elements, s = this.elements, a = n[0], o = n[4], l = n[8], c = n[12], u = n[1], p = n[5], d = n[9], m = n[13], _ = n[2], x = n[6], f = n[10], h = n[14], b = n[3], E = n[7], y = n[11], F = n[15], R = r[0], P = r[4], T = r[8], S = r[12], v = r[1], C = r[5], G = r[9], U = r[13], H = r[2], q = r[6], V = r[10], j = r[14], k = r[3], se = r[7], ue = r[11], me = r[15];
    return s[0] = a * R + o * v + l * H + c * k, s[4] = a * P + o * C + l * q + c * se, s[8] = a * T + o * G + l * V + c * ue, s[12] = a * S + o * U + l * j + c * me, s[1] = u * R + p * v + d * H + m * k, s[5] = u * P + p * C + d * q + m * se, s[9] = u * T + p * G + d * V + m * ue, s[13] = u * S + p * U + d * j + m * me, s[2] = _ * R + x * v + f * H + h * k, s[6] = _ * P + x * C + f * q + h * se, s[10] = _ * T + x * G + f * V + h * ue, s[14] = _ * S + x * U + f * j + h * me, s[3] = b * R + E * v + y * H + F * k, s[7] = b * P + E * C + y * q + F * se, s[11] = b * T + E * G + y * V + F * ue, s[15] = b * S + E * U + y * j + F * me, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[4], r = e[8], s = e[12], a = e[1], o = e[5], l = e[9], c = e[13], u = e[2], p = e[6], d = e[10], m = e[14], _ = e[3], x = e[7], f = e[11], h = e[15];
    return _ * (+s * l * p - r * c * p - s * o * d + n * c * d + r * o * m - n * l * m) + x * (+t * l * m - t * c * d + s * a * d - r * a * m + r * c * u - s * l * u) + f * (+t * c * p - t * o * m - s * a * p + n * a * m + s * o * u - n * c * u) + h * (-r * o * u - t * l * p + t * o * d + r * a * p - n * a * d + n * l * u);
  }
  transpose() {
    const e = this.elements;
    let t;
    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
  }
  setPosition(e, t, n) {
    const r = this.elements;
    return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = n), this;
  }
  invert() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], a = e[4], o = e[5], l = e[6], c = e[7], u = e[8], p = e[9], d = e[10], m = e[11], _ = e[12], x = e[13], f = e[14], h = e[15], b = p * f * c - x * d * c + x * l * m - o * f * m - p * l * h + o * d * h, E = _ * d * c - u * f * c - _ * l * m + a * f * m + u * l * h - a * d * h, y = u * x * c - _ * p * c + _ * o * m - a * x * m - u * o * h + a * p * h, F = _ * p * l - u * x * l - _ * o * d + a * x * d + u * o * f - a * p * f, R = t * b + n * E + r * y + s * F;
    if (R === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const P = 1 / R;
    return e[0] = b * P, e[1] = (x * d * s - p * f * s - x * r * m + n * f * m + p * r * h - n * d * h) * P, e[2] = (o * f * s - x * l * s + x * r * c - n * f * c - o * r * h + n * l * h) * P, e[3] = (p * l * s - o * d * s - p * r * c + n * d * c + o * r * m - n * l * m) * P, e[4] = E * P, e[5] = (u * f * s - _ * d * s + _ * r * m - t * f * m - u * r * h + t * d * h) * P, e[6] = (_ * l * s - a * f * s - _ * r * c + t * f * c + a * r * h - t * l * h) * P, e[7] = (a * d * s - u * l * s + u * r * c - t * d * c - a * r * m + t * l * m) * P, e[8] = y * P, e[9] = (_ * p * s - u * x * s - _ * n * m + t * x * m + u * n * h - t * p * h) * P, e[10] = (a * x * s - _ * o * s + _ * n * c - t * x * c - a * n * h + t * o * h) * P, e[11] = (u * o * s - a * p * s - u * n * c + t * p * c + a * n * m - t * o * m) * P, e[12] = F * P, e[13] = (u * x * r - _ * p * r + _ * n * d - t * x * d - u * n * f + t * p * f) * P, e[14] = (_ * o * r - a * x * r - _ * n * l + t * x * l + a * n * f - t * o * f) * P, e[15] = (a * p * r - u * o * r + u * n * l - t * p * l - a * n * d + t * o * d) * P, this;
  }
  scale(e) {
    const t = this.elements, n = e.x, r = e.y, s = e.z;
    return t[0] *= n, t[4] *= r, t[8] *= s, t[1] *= n, t[5] *= r, t[9] *= s, t[2] *= n, t[6] *= r, t[10] *= s, t[3] *= n, t[7] *= r, t[11] *= s, this;
  }
  getMaxScaleOnAxis() {
    const e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, n, r));
  }
  makeTranslation(e, t, n) {
    return e.isVector3 ? this.set(
      1,
      0,
      0,
      e.x,
      0,
      1,
      0,
      e.y,
      0,
      0,
      1,
      e.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      e,
      0,
      1,
      0,
      t,
      0,
      0,
      1,
      n,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationX(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      0,
      n,
      0,
      0,
      1,
      0,
      0,
      -n,
      0,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationAxis(e, t) {
    const n = Math.cos(t), r = Math.sin(t), s = 1 - n, a = e.x, o = e.y, l = e.z, c = s * a, u = s * o;
    return this.set(
      c * a + n,
      c * o - r * l,
      c * l + r * o,
      0,
      c * o + r * l,
      u * o + n,
      u * l - r * a,
      0,
      c * l - r * o,
      u * l + r * a,
      s * l * l + n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, t, n) {
    return this.set(
      e,
      0,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeShear(e, t, n, r, s, a) {
    return this.set(
      1,
      n,
      s,
      0,
      e,
      1,
      a,
      0,
      t,
      r,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(e, t, n) {
    const r = this.elements, s = t._x, a = t._y, o = t._z, l = t._w, c = s + s, u = a + a, p = o + o, d = s * c, m = s * u, _ = s * p, x = a * u, f = a * p, h = o * p, b = l * c, E = l * u, y = l * p, F = n.x, R = n.y, P = n.z;
    return r[0] = (1 - (x + h)) * F, r[1] = (m + y) * F, r[2] = (_ - E) * F, r[3] = 0, r[4] = (m - y) * R, r[5] = (1 - (d + h)) * R, r[6] = (f + b) * R, r[7] = 0, r[8] = (_ + E) * P, r[9] = (f - b) * P, r[10] = (1 - (d + x)) * P, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
  }
  decompose(e, t, n) {
    const r = this.elements;
    let s = En.set(r[0], r[1], r[2]).length();
    const a = En.set(r[4], r[5], r[6]).length(), o = En.set(r[8], r[9], r[10]).length();
    this.determinant() < 0 && (s = -s), e.x = r[12], e.y = r[13], e.z = r[14], Ct.copy(this);
    const c = 1 / s, u = 1 / a, p = 1 / o;
    return Ct.elements[0] *= c, Ct.elements[1] *= c, Ct.elements[2] *= c, Ct.elements[4] *= u, Ct.elements[5] *= u, Ct.elements[6] *= u, Ct.elements[8] *= p, Ct.elements[9] *= p, Ct.elements[10] *= p, t.setFromRotationMatrix(Ct), n.x = s, n.y = a, n.z = o, this;
  }
  makePerspective(e, t, n, r, s, a, o = 2e3) {
    const l = this.elements, c = 2 * s / (t - e), u = 2 * s / (n - r), p = (t + e) / (t - e), d = (n + r) / (n - r);
    let m, _;
    if (o === 2e3)
      m = -(a + s) / (a - s), _ = -2 * a * s / (a - s);
    else if (o === 2001)
      m = -a / (a - s), _ = -a * s / (a - s);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return l[0] = c, l[4] = 0, l[8] = p, l[12] = 0, l[1] = 0, l[5] = u, l[9] = d, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = m, l[14] = _, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(e, t, n, r, s, a, o = 2e3) {
    const l = this.elements, c = 1 / (t - e), u = 1 / (n - r), p = 1 / (a - s), d = (t + e) * c, m = (n + r) * u;
    let _, x;
    if (o === 2e3)
      _ = (a + s) * p, x = -2 * p;
    else if (o === 2001)
      _ = s * p, x = -1 * p;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return l[0] = 2 * c, l[4] = 0, l[8] = 0, l[12] = -d, l[1] = 0, l[5] = 2 * u, l[9] = 0, l[13] = -m, l[2] = 0, l[6] = 0, l[10] = x, l[14] = -_, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
  }
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let r = 0; r < 16; r++)
      if (t[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 16; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
  }
}
const En = /* @__PURE__ */ new N(), Ct = /* @__PURE__ */ new Je(), ya = /* @__PURE__ */ new N(0, 0, 0), Ta = /* @__PURE__ */ new N(1, 1, 1), Zt = /* @__PURE__ */ new N(), oi = /* @__PURE__ */ new N(), Et = /* @__PURE__ */ new N(), Hr = /* @__PURE__ */ new Je(), Vr = /* @__PURE__ */ new Jn();
class Nt {
  constructor(e = 0, t = 0, n = 0, r = Nt.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = t, this._z = n, this._order = r;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  set(e, t, n, r = this._order) {
    return this._x = e, this._y = t, this._z = n, this._order = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e, t = this._order, n = !0) {
    const r = e.elements, s = r[0], a = r[4], o = r[8], l = r[1], c = r[5], u = r[9], p = r[2], d = r[6], m = r[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(_t(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-u, m), this._z = Math.atan2(-a, s)) : (this._x = Math.atan2(d, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-_t(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._y = Math.atan2(o, m), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-p, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(_t(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._y = Math.atan2(-p, m), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(l, s));
        break;
      case "ZYX":
        this._y = Math.asin(-_t(p, -1, 1)), Math.abs(p) < 0.9999999 ? (this._x = Math.atan2(d, m), this._z = Math.atan2(l, s)) : (this._x = 0, this._z = Math.atan2(-a, c));
        break;
      case "YZX":
        this._z = Math.asin(_t(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-u, c), this._y = Math.atan2(-p, s)) : (this._x = 0, this._y = Math.atan2(o, m));
        break;
      case "XZY":
        this._z = Math.asin(-_t(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(o, s)) : (this._x = Math.atan2(-u, m), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, t, n) {
    return Hr.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Hr, t, n);
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return Vr.setFromEuler(this), this.setFromQuaternion(Vr, e);
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
Nt.DEFAULT_ORDER = "XYZ";
class Xs {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}
let Aa = 0;
const kr = /* @__PURE__ */ new N(), yn = /* @__PURE__ */ new Jn(), Ht = /* @__PURE__ */ new Je(), li = /* @__PURE__ */ new N(), qn = /* @__PURE__ */ new N(), ba = /* @__PURE__ */ new N(), Ra = /* @__PURE__ */ new Jn(), Wr = /* @__PURE__ */ new N(1, 0, 0), Xr = /* @__PURE__ */ new N(0, 1, 0), qr = /* @__PURE__ */ new N(0, 0, 1), Yr = { type: "added" }, wa = { type: "removed" }, Tn = { type: "childadded", child: null }, er = { type: "childremoved", child: null };
class ut extends Bn {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Aa++ }), this.uuid = jn(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = ut.DEFAULT_UP.clone();
    const e = new N(), t = new Nt(), n = new Jn(), r = new N(1, 1, 1);
    function s() {
      n.setFromEuler(t, !1);
    }
    function a() {
      t.setFromQuaternion(n, void 0, !1);
    }
    t._onChange(s), n._onChange(a), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      modelViewMatrix: {
        value: new Je()
      },
      normalMatrix: {
        value: new Le()
      }
    }), this.matrix = new Je(), this.matrixWorld = new Je(), this.matrixAutoUpdate = ut.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Xs(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, t) {
    return yn.setFromAxisAngle(e, t), this.quaternion.multiply(yn), this;
  }
  rotateOnWorldAxis(e, t) {
    return yn.setFromAxisAngle(e, t), this.quaternion.premultiply(yn), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(Wr, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(Xr, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(qr, e);
  }
  translateOnAxis(e, t) {
    return kr.copy(e).applyQuaternion(this.quaternion), this.position.add(kr.multiplyScalar(t)), this;
  }
  translateX(e) {
    return this.translateOnAxis(Wr, e);
  }
  translateY(e) {
    return this.translateOnAxis(Xr, e);
  }
  translateZ(e) {
    return this.translateOnAxis(qr, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(Ht.copy(this.matrixWorld).invert());
  }
  lookAt(e, t, n) {
    e.isVector3 ? li.copy(e) : li.set(e, t, n);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), qn.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Ht.lookAt(qn, li, this.up) : Ht.lookAt(li, qn, this.up), this.quaternion.setFromRotationMatrix(Ht), r && (Ht.extractRotation(r.matrixWorld), yn.setFromRotationMatrix(Ht), this.quaternion.premultiply(yn.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.add(arguments[t]);
      return this;
    }
    return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(Yr), Tn.child = e, this.dispatchEvent(Tn), Tn.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(wa), er.child = e, this.dispatchEvent(er), er.child = null), this;
  }
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    return this.updateWorldMatrix(!0, !1), Ht.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), Ht.multiply(e.parent.matrixWorld)), e.applyMatrix4(Ht), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(Yr), Tn.child = e, this.dispatchEvent(Tn), Tn.child = null, this;
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let n = 0, r = this.children.length; n < r; n++) {
      const a = this.children[n].getObjectByProperty(e, t);
      if (a !== void 0)
        return a;
    }
  }
  getObjectsByProperty(e, t, n = []) {
    this[e] === t && n.push(this);
    const r = this.children;
    for (let s = 0, a = r.length; s < a; s++)
      r[s].getObjectsByProperty(e, t, n);
    return n;
  }
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(qn, e, ba), e;
  }
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(qn, Ra, e), e;
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  raycast() {
  }
  traverse(e) {
    e(this);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].traverse(e);
  }
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].traverseVisible(e);
  }
  traverseAncestors(e) {
    const t = this.parent;
    t !== null && (e(t), t.traverseAncestors(e));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].updateMatrixWorld(e);
  }
  updateWorldMatrix(e, t) {
    const n = this.parent;
    if (e === !0 && n !== null && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), t === !0) {
      const r = this.children;
      for (let s = 0, a = r.length; s < a; s++)
        r[s].updateWorldMatrix(!1, !0);
    }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string", n = {};
    t && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, n.metadata = {
      version: 4.6,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const r = {};
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.visibility = this._visibility, r.active = this._active, r.bounds = this._bounds.map((o) => ({
      boxInitialized: o.boxInitialized,
      boxMin: o.box.min.toArray(),
      boxMax: o.box.max.toArray(),
      sphereInitialized: o.sphereInitialized,
      sphereRadius: o.sphere.radius,
      sphereCenter: o.sphere.center.toArray()
    })), r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.geometryCount = this._geometryCount, r.matricesTexture = this._matricesTexture.toJSON(e), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (r.boundingSphere = {
      center: r.boundingSphere.center.toArray(),
      radius: r.boundingSphere.radius
    }), this.boundingBox !== null && (r.boundingBox = {
      min: r.boundingBox.min.toArray(),
      max: r.boundingBox.max.toArray()
    }));
    function s(o, l) {
      return o[l.uuid] === void 0 && (o[l.uuid] = l.toJSON(e)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = s(e.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const l = o.shapes;
        if (Array.isArray(l))
          for (let c = 0, u = l.length; c < u; c++) {
            const p = l[c];
            s(e.shapes, p);
          }
        else
          s(e.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const o = [];
        for (let l = 0, c = this.material.length; l < c; l++)
          o.push(s(e.materials, this.material[l]));
        r.material = o;
      } else
        r.material = s(e.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let o = 0; o < this.children.length; o++)
        r.children.push(this.children[o].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const l = this.animations[o];
        r.animations.push(s(e.animations, l));
      }
    }
    if (t) {
      const o = a(e.geometries), l = a(e.materials), c = a(e.textures), u = a(e.images), p = a(e.shapes), d = a(e.skeletons), m = a(e.animations), _ = a(e.nodes);
      o.length > 0 && (n.geometries = o), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), u.length > 0 && (n.images = u), p.length > 0 && (n.shapes = p), d.length > 0 && (n.skeletons = d), m.length > 0 && (n.animations = m), _.length > 0 && (n.nodes = _);
    }
    return n.object = r, n;
    function a(o) {
      const l = [];
      for (const c in o) {
        const u = o[c];
        delete u.metadata, l.push(u);
      }
      return l;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, t = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0)
      for (let n = 0; n < e.children.length; n++) {
        const r = e.children[n];
        this.add(r.clone());
      }
    return this;
  }
}
ut.DEFAULT_UP = /* @__PURE__ */ new N(0, 1, 0);
ut.DEFAULT_MATRIX_AUTO_UPDATE = !0;
ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const Pt = /* @__PURE__ */ new N(), Vt = /* @__PURE__ */ new N(), tr = /* @__PURE__ */ new N(), kt = /* @__PURE__ */ new N(), An = /* @__PURE__ */ new N(), bn = /* @__PURE__ */ new N(), Kr = /* @__PURE__ */ new N(), nr = /* @__PURE__ */ new N(), ir = /* @__PURE__ */ new N(), rr = /* @__PURE__ */ new N();
class It {
  constructor(e = new N(), t = new N(), n = new N()) {
    this.a = e, this.b = t, this.c = n;
  }
  static getNormal(e, t, n, r) {
    r.subVectors(n, t), Pt.subVectors(e, t), r.cross(Pt);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(e, t, n, r, s) {
    Pt.subVectors(r, t), Vt.subVectors(n, t), tr.subVectors(e, t);
    const a = Pt.dot(Pt), o = Pt.dot(Vt), l = Pt.dot(tr), c = Vt.dot(Vt), u = Vt.dot(tr), p = a * c - o * o;
    if (p === 0)
      return s.set(0, 0, 0), null;
    const d = 1 / p, m = (c * l - o * u) * d, _ = (a * u - o * l) * d;
    return s.set(1 - m - _, _, m);
  }
  static containsPoint(e, t, n, r) {
    return this.getBarycoord(e, t, n, r, kt) === null ? !1 : kt.x >= 0 && kt.y >= 0 && kt.x + kt.y <= 1;
  }
  static getInterpolation(e, t, n, r, s, a, o, l) {
    return this.getBarycoord(e, t, n, r, kt) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(s, kt.x), l.addScaledVector(a, kt.y), l.addScaledVector(o, kt.z), l);
  }
  static isFrontFacing(e, t, n, r) {
    return Pt.subVectors(n, t), Vt.subVectors(e, t), Pt.cross(Vt).dot(r) < 0;
  }
  set(e, t, n) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
  }
  setFromPointsAndIndices(e, t, n, r) {
    return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[r]), this;
  }
  setFromAttributeAndIndices(e, t, n, r) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, r), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  getArea() {
    return Pt.subVectors(this.c, this.b), Vt.subVectors(this.a, this.b), Pt.cross(Vt).length() * 0.5;
  }
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return It.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return It.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getInterpolation(e, t, n, r, s) {
    return It.getInterpolation(e, this.a, this.b, this.c, t, n, r, s);
  }
  containsPoint(e) {
    return It.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return It.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    const n = this.a, r = this.b, s = this.c;
    let a, o;
    An.subVectors(r, n), bn.subVectors(s, n), nr.subVectors(e, n);
    const l = An.dot(nr), c = bn.dot(nr);
    if (l <= 0 && c <= 0)
      return t.copy(n);
    ir.subVectors(e, r);
    const u = An.dot(ir), p = bn.dot(ir);
    if (u >= 0 && p <= u)
      return t.copy(r);
    const d = l * p - u * c;
    if (d <= 0 && l >= 0 && u <= 0)
      return a = l / (l - u), t.copy(n).addScaledVector(An, a);
    rr.subVectors(e, s);
    const m = An.dot(rr), _ = bn.dot(rr);
    if (_ >= 0 && m <= _)
      return t.copy(s);
    const x = m * c - l * _;
    if (x <= 0 && c >= 0 && _ <= 0)
      return o = c / (c - _), t.copy(n).addScaledVector(bn, o);
    const f = u * _ - m * p;
    if (f <= 0 && p - u >= 0 && m - _ >= 0)
      return Kr.subVectors(s, r), o = (p - u) / (p - u + (m - _)), t.copy(r).addScaledVector(Kr, o);
    const h = 1 / (f + x + d);
    return a = x * h, o = d * h, t.copy(n).addScaledVector(An, a).addScaledVector(bn, o);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
const qs = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, jt = { h: 0, s: 0, l: 0 }, ci = { h: 0, s: 0, l: 0 };
function sr(i, e, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? i + (e - i) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? i + (e - i) * 6 * (2 / 3 - t) : i;
}
class Ie {
  constructor(e, t, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
  }
  set(e, t, n) {
    if (t === void 0 && n === void 0) {
      const r = e;
      r && r.isColor ? this.copy(r) : typeof r == "number" ? this.setHex(r) : typeof r == "string" && this.setStyle(r);
    } else
      this.setRGB(e, t, n);
    return this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, t = Lt) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, ke.toWorkingColorSpace(this, t), this;
  }
  setRGB(e, t, n, r = ke.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, ke.toWorkingColorSpace(this, r), this;
  }
  setHSL(e, t, n, r = ke.workingColorSpace) {
    if (e = fa(e, 1), t = _t(t, 0, 1), n = _t(n, 0, 1), t === 0)
      this.r = this.g = this.b = n;
    else {
      const s = n <= 0.5 ? n * (1 + t) : n + t - n * t, a = 2 * n - s;
      this.r = sr(a, s, e + 1 / 3), this.g = sr(a, s, e), this.b = sr(a, s, e - 1 / 3);
    }
    return ke.toWorkingColorSpace(this, r), this;
  }
  setStyle(e, t = Lt) {
    function n(s) {
      s !== void 0 && parseFloat(s) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
    }
    let r;
    if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let s;
      const a = r[1], o = r[2];
      switch (a) {
        case "rgb":
        case "rgba":
          if (s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setRGB(
              Math.min(255, parseInt(s[1], 10)) / 255,
              Math.min(255, parseInt(s[2], 10)) / 255,
              Math.min(255, parseInt(s[3], 10)) / 255,
              t
            );
          if (s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setRGB(
              Math.min(100, parseInt(s[1], 10)) / 100,
              Math.min(100, parseInt(s[2], 10)) / 100,
              Math.min(100, parseInt(s[3], 10)) / 100,
              t
            );
          break;
        case "hsl":
        case "hsla":
          if (s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setHSL(
              parseFloat(s[1]) / 360,
              parseFloat(s[2]) / 100,
              parseFloat(s[3]) / 100,
              t
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + e);
      }
    } else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const s = r[1], a = s.length;
      if (a === 3)
        return this.setRGB(
          parseInt(s.charAt(0), 16) / 15,
          parseInt(s.charAt(1), 16) / 15,
          parseInt(s.charAt(2), 16) / 15,
          t
        );
      if (a === 6)
        return this.setHex(parseInt(s, 16), t);
      console.warn("THREE.Color: Invalid hex color " + e);
    } else if (e && e.length > 0)
      return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = Lt) {
    const n = qs[e.toLowerCase()];
    return n !== void 0 ? this.setHex(n, t) : console.warn("THREE.Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = Fn(e.r), this.g = Fn(e.g), this.b = Fn(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = qi(e.r), this.g = qi(e.g), this.b = qi(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = Lt) {
    return ke.fromWorkingColorSpace(dt.copy(this), e), Math.round(_t(dt.r * 255, 0, 255)) * 65536 + Math.round(_t(dt.g * 255, 0, 255)) * 256 + Math.round(_t(dt.b * 255, 0, 255));
  }
  getHexString(e = Lt) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = ke.workingColorSpace) {
    ke.fromWorkingColorSpace(dt.copy(this), t);
    const n = dt.r, r = dt.g, s = dt.b, a = Math.max(n, r, s), o = Math.min(n, r, s);
    let l, c;
    const u = (o + a) / 2;
    if (o === a)
      l = 0, c = 0;
    else {
      const p = a - o;
      switch (c = u <= 0.5 ? p / (a + o) : p / (2 - a - o), a) {
        case n:
          l = (r - s) / p + (r < s ? 6 : 0);
          break;
        case r:
          l = (s - n) / p + 2;
          break;
        case s:
          l = (n - r) / p + 4;
          break;
      }
      l /= 6;
    }
    return e.h = l, e.s = c, e.l = u, e;
  }
  getRGB(e, t = ke.workingColorSpace) {
    return ke.fromWorkingColorSpace(dt.copy(this), t), e.r = dt.r, e.g = dt.g, e.b = dt.b, e;
  }
  getStyle(e = Lt) {
    ke.fromWorkingColorSpace(dt.copy(this), e);
    const t = dt.r, n = dt.g, r = dt.b;
    return e !== Lt ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})`;
  }
  offsetHSL(e, t, n) {
    return this.getHSL(jt), this.setHSL(jt.h + e, jt.s + t, jt.l + n);
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  lerpColors(e, t, n) {
    return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
  }
  lerpHSL(e, t) {
    this.getHSL(jt), e.getHSL(ci);
    const n = Wi(jt.h, ci.h, t), r = Wi(jt.s, ci.s, t), s = Wi(jt.l, ci.l, t);
    return this.setHSL(n, r, s), this;
  }
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  applyMatrix3(e) {
    const t = this.r, n = this.g, r = this.b, s = e.elements;
    return this.r = s[0] * t + s[3] * n + s[6] * r, this.g = s[1] * t + s[4] * n + s[7] * r, this.b = s[2] * t + s[5] * n + s[8] * r, this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const dt = /* @__PURE__ */ new Ie();
Ie.NAMES = qs;
let Ca = 0;
class Gn extends Bn {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Ca++ }), this.uuid = jn(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Ie(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = 7680, this.stencilZFail = 7680, this.stencilZPass = 7680, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  // onBeforeRender and onBeforeCompile only supported in WebGLRenderer
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const n = e[t];
        if (n === void 0) {
          console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const r = this[t];
        if (r === void 0) {
          console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        r && r.isColor ? r.set(n) : r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n;
      }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
      textures: {},
      images: {}
    });
    const n = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (n.blending = this.blending), this.side !== 0 && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== 204 && (n.blendSrc = this.blendSrc), this.blendDst !== 205 && (n.blendDst = this.blendDst), this.blendEquation !== 100 && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (n.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function r(s) {
      const a = [];
      for (const o in s) {
        const l = s[o];
        delete l.metadata, a.push(l);
      }
      return a;
    }
    if (t) {
      const s = r(e.textures), a = r(e.images);
      s.length > 0 && (n.textures = s), a.length > 0 && (n.images = a);
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let n = null;
    if (t !== null) {
      const r = t.length;
      n = new Array(r);
      for (let s = 0; s !== r; ++s)
        n[s] = t[s].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  onBuild() {
    console.warn("Material: onBuild() has been removed.");
  }
}
class Ys extends Gn {
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Ie(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Nt(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const it = /* @__PURE__ */ new N(), ui = /* @__PURE__ */ new Oe();
class Ft {
  constructor(e, t, n = !1) {
    if (Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = 35044, this._updateRange = { offset: 0, count: -1 }, this.updateRanges = [], this.gpuType = 1015, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  get updateRange() {
    return Zn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."), this._updateRange;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  copyAt(e, t, n) {
    e *= this.itemSize, n *= t.itemSize;
    for (let r = 0, s = this.itemSize; r < s; r++)
      this.array[e + r] = t.array[n + r];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let t = 0, n = this.count; t < n; t++)
        ui.fromBufferAttribute(this, t), ui.applyMatrix3(e), this.setXY(t, ui.x, ui.y);
    else if (this.itemSize === 3)
      for (let t = 0, n = this.count; t < n; t++)
        it.fromBufferAttribute(this, t), it.applyMatrix3(e), this.setXYZ(t, it.x, it.y, it.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      it.fromBufferAttribute(this, t), it.applyMatrix4(e), this.setXYZ(t, it.x, it.y, it.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      it.fromBufferAttribute(this, t), it.applyNormalMatrix(e), this.setXYZ(t, it.x, it.y, it.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      it.fromBufferAttribute(this, t), it.transformDirection(e), this.setXYZ(t, it.x, it.y, it.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let n = this.array[e * this.itemSize + t];
    return this.normalized && (n = Vn(n, this.array)), n;
  }
  setComponent(e, t, n) {
    return this.normalized && (n = mt(n, this.array)), this.array[e * this.itemSize + t] = n, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = Vn(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = mt(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = Vn(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = mt(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = Vn(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = mt(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = Vn(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = mt(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = mt(t, this.array), n = mt(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, r) {
    return e *= this.itemSize, this.normalized && (t = mt(t, this.array), n = mt(n, this.array), r = mt(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
  }
  setXYZW(e, t, n, r, s) {
    return e *= this.itemSize, this.normalized && (t = mt(t, this.array), n = mt(n, this.array), r = mt(r, this.array), s = mt(s, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = s, this;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== 35044 && (e.usage = this.usage), e;
  }
}
class Ks extends Ft {
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}
class $s extends Ft {
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}
class xt extends Ft {
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}
let Pa = 0;
const bt = /* @__PURE__ */ new Je(), ar = /* @__PURE__ */ new ut(), Rn = /* @__PURE__ */ new N(), yt = /* @__PURE__ */ new Qn(), Yn = /* @__PURE__ */ new Qn(), ot = /* @__PURE__ */ new N();
class Ot extends Bn {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Pa++ }), this.uuid = jn(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (Hs(e) ? $s : Ks)(e, 1) : this.index = e, this;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  addGroup(e, t, n = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: n
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  applyMatrix4(e) {
    const t = this.attributes.position;
    t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const s = new Le().getNormalMatrix(e);
      n.applyNormalMatrix(s), n.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(e) {
    return bt.makeRotationFromQuaternion(e), this.applyMatrix4(bt), this;
  }
  rotateX(e) {
    return bt.makeRotationX(e), this.applyMatrix4(bt), this;
  }
  rotateY(e) {
    return bt.makeRotationY(e), this.applyMatrix4(bt), this;
  }
  rotateZ(e) {
    return bt.makeRotationZ(e), this.applyMatrix4(bt), this;
  }
  translate(e, t, n) {
    return bt.makeTranslation(e, t, n), this.applyMatrix4(bt), this;
  }
  scale(e, t, n) {
    return bt.makeScale(e, t, n), this.applyMatrix4(bt), this;
  }
  lookAt(e) {
    return ar.lookAt(e), ar.updateMatrix(), this.applyMatrix4(ar.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Rn).negate(), this.translate(Rn.x, Rn.y, Rn.z), this;
  }
  setFromPoints(e) {
    const t = [];
    for (let n = 0, r = e.length; n < r; n++) {
      const s = e[n];
      t.push(s.x, s.y, s.z || 0);
    }
    return this.setAttribute("position", new xt(t, 3)), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Qn());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new N(-1 / 0, -1 / 0, -1 / 0),
        new N(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), t)
        for (let n = 0, r = t.length; n < r; n++) {
          const s = t[n];
          yt.setFromBufferAttribute(s), this.morphTargetsRelative ? (ot.addVectors(this.boundingBox.min, yt.min), this.boundingBox.expandByPoint(ot), ot.addVectors(this.boundingBox.max, yt.max), this.boundingBox.expandByPoint(ot)) : (this.boundingBox.expandByPoint(yt.min), this.boundingBox.expandByPoint(yt.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Ni());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new N(), 1 / 0);
      return;
    }
    if (e) {
      const n = this.boundingSphere.center;
      if (yt.setFromBufferAttribute(e), t)
        for (let s = 0, a = t.length; s < a; s++) {
          const o = t[s];
          Yn.setFromBufferAttribute(o), this.morphTargetsRelative ? (ot.addVectors(yt.min, Yn.min), yt.expandByPoint(ot), ot.addVectors(yt.max, Yn.max), yt.expandByPoint(ot)) : (yt.expandByPoint(Yn.min), yt.expandByPoint(Yn.max));
        }
      yt.getCenter(n);
      let r = 0;
      for (let s = 0, a = e.count; s < a; s++)
        ot.fromBufferAttribute(e, s), r = Math.max(r, n.distanceToSquared(ot));
      if (t)
        for (let s = 0, a = t.length; s < a; s++) {
          const o = t[s], l = this.morphTargetsRelative;
          for (let c = 0, u = o.count; c < u; c++)
            ot.fromBufferAttribute(o, c), l && (Rn.fromBufferAttribute(e, c), ot.add(Rn)), r = Math.max(r, n.distanceToSquared(ot));
        }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const e = this.index, t = this.attributes;
    if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = t.position, r = t.normal, s = t.uv;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Ft(new Float32Array(4 * n.count), 4));
    const a = this.getAttribute("tangent"), o = [], l = [];
    for (let T = 0; T < n.count; T++)
      o[T] = new N(), l[T] = new N();
    const c = new N(), u = new N(), p = new N(), d = new Oe(), m = new Oe(), _ = new Oe(), x = new N(), f = new N();
    function h(T, S, v) {
      c.fromBufferAttribute(n, T), u.fromBufferAttribute(n, S), p.fromBufferAttribute(n, v), d.fromBufferAttribute(s, T), m.fromBufferAttribute(s, S), _.fromBufferAttribute(s, v), u.sub(c), p.sub(c), m.sub(d), _.sub(d);
      const C = 1 / (m.x * _.y - _.x * m.y);
      isFinite(C) && (x.copy(u).multiplyScalar(_.y).addScaledVector(p, -m.y).multiplyScalar(C), f.copy(p).multiplyScalar(m.x).addScaledVector(u, -_.x).multiplyScalar(C), o[T].add(x), o[S].add(x), o[v].add(x), l[T].add(f), l[S].add(f), l[v].add(f));
    }
    let b = this.groups;
    b.length === 0 && (b = [{
      start: 0,
      count: e.count
    }]);
    for (let T = 0, S = b.length; T < S; ++T) {
      const v = b[T], C = v.start, G = v.count;
      for (let U = C, H = C + G; U < H; U += 3)
        h(
          e.getX(U + 0),
          e.getX(U + 1),
          e.getX(U + 2)
        );
    }
    const E = new N(), y = new N(), F = new N(), R = new N();
    function P(T) {
      F.fromBufferAttribute(r, T), R.copy(F);
      const S = o[T];
      E.copy(S), E.sub(F.multiplyScalar(F.dot(S))).normalize(), y.crossVectors(R, S);
      const C = y.dot(l[T]) < 0 ? -1 : 1;
      a.setXYZW(T, E.x, E.y, E.z, C);
    }
    for (let T = 0, S = b.length; T < S; ++T) {
      const v = b[T], C = v.start, G = v.count;
      for (let U = C, H = C + G; U < H; U += 3)
        P(e.getX(U + 0)), P(e.getX(U + 1)), P(e.getX(U + 2));
    }
  }
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0)
        n = new Ft(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let d = 0, m = n.count; d < m; d++)
          n.setXYZ(d, 0, 0, 0);
      const r = new N(), s = new N(), a = new N(), o = new N(), l = new N(), c = new N(), u = new N(), p = new N();
      if (e)
        for (let d = 0, m = e.count; d < m; d += 3) {
          const _ = e.getX(d + 0), x = e.getX(d + 1), f = e.getX(d + 2);
          r.fromBufferAttribute(t, _), s.fromBufferAttribute(t, x), a.fromBufferAttribute(t, f), u.subVectors(a, s), p.subVectors(r, s), u.cross(p), o.fromBufferAttribute(n, _), l.fromBufferAttribute(n, x), c.fromBufferAttribute(n, f), o.add(u), l.add(u), c.add(u), n.setXYZ(_, o.x, o.y, o.z), n.setXYZ(x, l.x, l.y, l.z), n.setXYZ(f, c.x, c.y, c.z);
        }
      else
        for (let d = 0, m = t.count; d < m; d += 3)
          r.fromBufferAttribute(t, d + 0), s.fromBufferAttribute(t, d + 1), a.fromBufferAttribute(t, d + 2), u.subVectors(a, s), p.subVectors(r, s), u.cross(p), n.setXYZ(d + 0, u.x, u.y, u.z), n.setXYZ(d + 1, u.x, u.y, u.z), n.setXYZ(d + 2, u.x, u.y, u.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, n = e.count; t < n; t++)
      ot.fromBufferAttribute(e, t), ot.normalize(), e.setXYZ(t, ot.x, ot.y, ot.z);
  }
  toNonIndexed() {
    function e(o, l) {
      const c = o.array, u = o.itemSize, p = o.normalized, d = new c.constructor(l.length * u);
      let m = 0, _ = 0;
      for (let x = 0, f = l.length; x < f; x++) {
        o.isInterleavedBufferAttribute ? m = l[x] * o.data.stride + o.offset : m = l[x] * u;
        for (let h = 0; h < u; h++)
          d[_++] = c[m++];
      }
      return new Ft(d, u, p);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const t = new Ot(), n = this.index.array, r = this.attributes;
    for (const o in r) {
      const l = r[o], c = e(l, n);
      t.setAttribute(o, c);
    }
    const s = this.morphAttributes;
    for (const o in s) {
      const l = [], c = s[o];
      for (let u = 0, p = c.length; u < p; u++) {
        const d = c[u], m = e(d, n);
        l.push(m);
      }
      t.morphAttributes[o] = l;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, l = a.length; o < l; o++) {
      const c = a[o];
      t.addGroup(c.start, c.count, c.materialIndex);
    }
    return t;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) {
      const l = this.parameters;
      for (const c in l)
        l[c] !== void 0 && (e[c] = l[c]);
      return e;
    }
    e.data = { attributes: {} };
    const t = this.index;
    t !== null && (e.data.index = {
      type: t.array.constructor.name,
      array: Array.prototype.slice.call(t.array)
    });
    const n = this.attributes;
    for (const l in n) {
      const c = n[l];
      e.data.attributes[l] = c.toJSON(e.data);
    }
    const r = {};
    let s = !1;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l], u = [];
      for (let p = 0, d = c.length; p < d; p++) {
        const m = c[p];
        u.push(m.toJSON(e.data));
      }
      u.length > 0 && (r[l] = u, s = !0);
    }
    s && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return o !== null && (e.data.boundingSphere = {
      center: o.center.toArray(),
      radius: o.radius
    }), e;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const n = e.index;
    n !== null && this.setIndex(n.clone(t));
    const r = e.attributes;
    for (const c in r) {
      const u = r[c];
      this.setAttribute(c, u.clone(t));
    }
    const s = e.morphAttributes;
    for (const c in s) {
      const u = [], p = s[c];
      for (let d = 0, m = p.length; d < m; d++)
        u.push(p[d].clone(t));
      this.morphAttributes[c] = u;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const a = e.groups;
    for (let c = 0, u = a.length; c < u; c++) {
      const p = a[c];
      this.addGroup(p.start, p.count, p.materialIndex);
    }
    const o = e.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const l = e.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const $r = /* @__PURE__ */ new Je(), ln = /* @__PURE__ */ new Ws(), hi = /* @__PURE__ */ new Ni(), Zr = /* @__PURE__ */ new N(), wn = /* @__PURE__ */ new N(), Cn = /* @__PURE__ */ new N(), Pn = /* @__PURE__ */ new N(), or = /* @__PURE__ */ new N(), di = /* @__PURE__ */ new N(), fi = /* @__PURE__ */ new Oe(), pi = /* @__PURE__ */ new Oe(), mi = /* @__PURE__ */ new Oe(), jr = /* @__PURE__ */ new N(), Jr = /* @__PURE__ */ new N(), Qr = /* @__PURE__ */ new N(), _i = /* @__PURE__ */ new N(), gi = /* @__PURE__ */ new N();
class gt extends ut {
  constructor(e = new Ot(), t = new Ys()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const r = t[n[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, a = r.length; s < a; s++) {
          const o = r[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s;
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const n = this.geometry, r = n.attributes.position, s = n.morphAttributes.position, a = n.morphTargetsRelative;
    t.fromBufferAttribute(r, e);
    const o = this.morphTargetInfluences;
    if (s && o) {
      di.set(0, 0, 0);
      for (let l = 0, c = s.length; l < c; l++) {
        const u = o[l], p = s[l];
        u !== 0 && (or.fromBufferAttribute(p, e), a ? di.addScaledVector(or, u) : di.addScaledVector(or.sub(t), u));
      }
      t.add(di);
    }
    return t;
  }
  raycast(e, t) {
    const n = this.geometry, r = this.material, s = this.matrixWorld;
    r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), hi.copy(n.boundingSphere), hi.applyMatrix4(s), ln.copy(e.ray).recast(e.near), !(hi.containsPoint(ln.origin) === !1 && (ln.intersectSphere(hi, Zr) === null || ln.origin.distanceToSquared(Zr) > (e.far - e.near) ** 2)) && ($r.copy(s).invert(), ln.copy(e.ray).applyMatrix4($r), !(n.boundingBox !== null && ln.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, ln)));
  }
  _computeIntersections(e, t, n) {
    let r;
    const s = this.geometry, a = this.material, o = s.index, l = s.attributes.position, c = s.attributes.uv, u = s.attributes.uv1, p = s.attributes.normal, d = s.groups, m = s.drawRange;
    if (o !== null)
      if (Array.isArray(a))
        for (let _ = 0, x = d.length; _ < x; _++) {
          const f = d[_], h = a[f.materialIndex], b = Math.max(f.start, m.start), E = Math.min(o.count, Math.min(f.start + f.count, m.start + m.count));
          for (let y = b, F = E; y < F; y += 3) {
            const R = o.getX(y), P = o.getX(y + 1), T = o.getX(y + 2);
            r = vi(this, h, e, n, c, u, p, R, P, T), r && (r.faceIndex = Math.floor(y / 3), r.face.materialIndex = f.materialIndex, t.push(r));
          }
        }
      else {
        const _ = Math.max(0, m.start), x = Math.min(o.count, m.start + m.count);
        for (let f = _, h = x; f < h; f += 3) {
          const b = o.getX(f), E = o.getX(f + 1), y = o.getX(f + 2);
          r = vi(this, a, e, n, c, u, p, b, E, y), r && (r.faceIndex = Math.floor(f / 3), t.push(r));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(a))
        for (let _ = 0, x = d.length; _ < x; _++) {
          const f = d[_], h = a[f.materialIndex], b = Math.max(f.start, m.start), E = Math.min(l.count, Math.min(f.start + f.count, m.start + m.count));
          for (let y = b, F = E; y < F; y += 3) {
            const R = y, P = y + 1, T = y + 2;
            r = vi(this, h, e, n, c, u, p, R, P, T), r && (r.faceIndex = Math.floor(y / 3), r.face.materialIndex = f.materialIndex, t.push(r));
          }
        }
      else {
        const _ = Math.max(0, m.start), x = Math.min(l.count, m.start + m.count);
        for (let f = _, h = x; f < h; f += 3) {
          const b = f, E = f + 1, y = f + 2;
          r = vi(this, a, e, n, c, u, p, b, E, y), r && (r.faceIndex = Math.floor(f / 3), t.push(r));
        }
      }
  }
}
function La(i, e, t, n, r, s, a, o) {
  let l;
  if (e.side === 1 ? l = n.intersectTriangle(a, s, r, !0, o) : l = n.intersectTriangle(r, s, a, e.side === 0, o), l === null) return null;
  gi.copy(o), gi.applyMatrix4(i.matrixWorld);
  const c = t.ray.origin.distanceTo(gi);
  return c < t.near || c > t.far ? null : {
    distance: c,
    point: gi.clone(),
    object: i
  };
}
function vi(i, e, t, n, r, s, a, o, l, c) {
  i.getVertexPosition(o, wn), i.getVertexPosition(l, Cn), i.getVertexPosition(c, Pn);
  const u = La(i, e, t, n, wn, Cn, Pn, _i);
  if (u) {
    r && (fi.fromBufferAttribute(r, o), pi.fromBufferAttribute(r, l), mi.fromBufferAttribute(r, c), u.uv = It.getInterpolation(_i, wn, Cn, Pn, fi, pi, mi, new Oe())), s && (fi.fromBufferAttribute(s, o), pi.fromBufferAttribute(s, l), mi.fromBufferAttribute(s, c), u.uv1 = It.getInterpolation(_i, wn, Cn, Pn, fi, pi, mi, new Oe())), a && (jr.fromBufferAttribute(a, o), Jr.fromBufferAttribute(a, l), Qr.fromBufferAttribute(a, c), u.normal = It.getInterpolation(_i, wn, Cn, Pn, jr, Jr, Qr, new N()), u.normal.dot(n.direction) > 0 && u.normal.multiplyScalar(-1));
    const p = {
      a: o,
      b: l,
      c,
      normal: new N(),
      materialIndex: 0
    };
    It.getNormal(wn, Cn, Pn, p.normal), u.face = p;
  }
  return u;
}
class zn extends Ot {
  constructor(e = 1, t = 1, n = 1, r = 1, s = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: t,
      depth: n,
      widthSegments: r,
      heightSegments: s,
      depthSegments: a
    };
    const o = this;
    r = Math.floor(r), s = Math.floor(s), a = Math.floor(a);
    const l = [], c = [], u = [], p = [];
    let d = 0, m = 0;
    _("z", "y", "x", -1, -1, n, t, e, a, s, 0), _("z", "y", "x", 1, -1, n, t, -e, a, s, 1), _("x", "z", "y", 1, 1, e, n, t, r, a, 2), _("x", "z", "y", 1, -1, e, n, -t, r, a, 3), _("x", "y", "z", 1, -1, e, t, n, r, s, 4), _("x", "y", "z", -1, -1, e, t, -n, r, s, 5), this.setIndex(l), this.setAttribute("position", new xt(c, 3)), this.setAttribute("normal", new xt(u, 3)), this.setAttribute("uv", new xt(p, 2));
    function _(x, f, h, b, E, y, F, R, P, T, S) {
      const v = y / P, C = F / T, G = y / 2, U = F / 2, H = R / 2, q = P + 1, V = T + 1;
      let j = 0, k = 0;
      const se = new N();
      for (let ue = 0; ue < V; ue++) {
        const me = ue * C - U;
        for (let Fe = 0; Fe < q; Fe++) {
          const Xe = Fe * v - G;
          se[x] = Xe * b, se[f] = me * E, se[h] = H, c.push(se.x, se.y, se.z), se[x] = 0, se[f] = 0, se[h] = R > 0 ? 1 : -1, u.push(se.x, se.y, se.z), p.push(Fe / P), p.push(1 - ue / T), j += 1;
        }
      }
      for (let ue = 0; ue < T; ue++)
        for (let me = 0; me < P; me++) {
          const Fe = d + me + q * ue, Xe = d + me + q * (ue + 1), W = d + (me + 1) + q * (ue + 1), J = d + (me + 1) + q * ue;
          l.push(Fe, Xe, J), l.push(Xe, W, J), k += 6;
        }
      o.addGroup(m, k, S), m += k, d += j;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new zn(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
function Nn(i) {
  const e = {};
  for (const t in i) {
    e[t] = {};
    for (const n in i[t]) {
      const r = i[t][n];
      r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion) ? r.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][n] = null) : e[t][n] = r.clone() : Array.isArray(r) ? e[t][n] = r.slice() : e[t][n] = r;
    }
  }
  return e;
}
function ft(i) {
  const e = {};
  for (let t = 0; t < i.length; t++) {
    const n = Nn(i[t]);
    for (const r in n)
      e[r] = n[r];
  }
  return e;
}
function Da(i) {
  const e = [];
  for (let t = 0; t < i.length; t++)
    e.push(i[t].clone());
  return e;
}
function Zs(i) {
  const e = i.getRenderTarget();
  return e === null ? i.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : ke.workingColorSpace;
}
const Ua = { clone: Nn, merge: ft };
var Ia = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Fa = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class nn extends Gn {
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Ia, this.fragmentShader = Fa, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = Nn(e.uniforms), this.uniformsGroups = Da(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const r in this.uniforms) {
      const a = this.uniforms[r].value;
      a && a.isTexture ? t.uniforms[r] = {
        type: "t",
        value: a.toJSON(e).uuid
      } : a && a.isColor ? t.uniforms[r] = {
        type: "c",
        value: a.getHex()
      } : a && a.isVector2 ? t.uniforms[r] = {
        type: "v2",
        value: a.toArray()
      } : a && a.isVector3 ? t.uniforms[r] = {
        type: "v3",
        value: a.toArray()
      } : a && a.isVector4 ? t.uniforms[r] = {
        type: "v4",
        value: a.toArray()
      } : a && a.isMatrix3 ? t.uniforms[r] = {
        type: "m3",
        value: a.toArray()
      } : a && a.isMatrix4 ? t.uniforms[r] = {
        type: "m4",
        value: a.toArray()
      } : t.uniforms[r] = {
        value: a
      };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const n = {};
    for (const r in this.extensions)
      this.extensions[r] === !0 && (n[r] = !0);
    return Object.keys(n).length > 0 && (t.extensions = n), t;
  }
}
class js extends ut {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Je(), this.projectionMatrix = new Je(), this.projectionMatrixInverse = new Je(), this.coordinateSystem = 2e3;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(e, t) {
    super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Jt = /* @__PURE__ */ new N(), es = /* @__PURE__ */ new Oe(), ts = /* @__PURE__ */ new Oe();
class Tt extends js {
  constructor(e = 50, t = 1, n = 0.1, r = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current .filmGauge.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = Sr * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const e = Math.tan(ki * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return Sr * 2 * Math.atan(
      Math.tan(ki * 0.5 * this.fov) / this.zoom
    );
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
   * Sets minTarget and maxTarget to the coordinates of the lower-left and upper-right corners of the view rectangle.
   */
  getViewBounds(e, t, n) {
    Jt.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(Jt.x, Jt.y).multiplyScalar(-e / Jt.z), Jt.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(Jt.x, Jt.y).multiplyScalar(-e / Jt.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   * Copies the result into the target Vector2, where x is width and y is height.
   */
  getViewSize(e, t) {
    return this.getViewBounds(e, es, ts), t.subVectors(ts, es);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *
   * then for each monitor you would call it like this
   *
   *   const w = 1920;
   *   const h = 1080;
   *   const fullWidth = w * 3;
   *   const fullHeight = h * 2;
   *
   *   --A--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   *   --B--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   *   --C--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   *   --D--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   *   --E--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   *   --F--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   *
   *   Note there is no reason monitors have to be the same size or in a grid.
   */
  setViewOffset(e, t, n, r, s, a) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(ki * 0.5 * this.fov) / this.zoom, n = 2 * t, r = this.aspect * n, s = -0.5 * r;
    const a = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = a.fullWidth, c = a.fullHeight;
      s += a.offsetX * r / l, t -= a.offsetY * n / c, r *= a.width / l, n *= a.height / c;
    }
    const o = this.filmOffset;
    o !== 0 && (s += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(s, s + r, t, t - n, e, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}
const Ln = -90, Dn = 1;
class Na extends ut {
  constructor(e, t, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const r = new Tt(Ln, Dn, e, t);
    r.layers = this.layers, this.add(r);
    const s = new Tt(Ln, Dn, e, t);
    s.layers = this.layers, this.add(s);
    const a = new Tt(Ln, Dn, e, t);
    a.layers = this.layers, this.add(a);
    const o = new Tt(Ln, Dn, e, t);
    o.layers = this.layers, this.add(o);
    const l = new Tt(Ln, Dn, e, t);
    l.layers = this.layers, this.add(l);
    const c = new Tt(Ln, Dn, e, t);
    c.layers = this.layers, this.add(c);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [n, r, s, a, o, l] = t;
    for (const c of t) this.remove(c);
    if (e === 2e3)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), s.up.set(0, 0, -1), s.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (e === 2001)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), s.up.set(0, 0, 1), s.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const c of t)
      this.add(c), c.updateMatrixWorld();
  }
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: r } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [s, a, o, l, c, u] = this.children, p = e.getRenderTarget(), d = e.getActiveCubeFace(), m = e.getActiveMipmapLevel(), _ = e.xr.enabled;
    e.xr.enabled = !1;
    const x = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1, e.setRenderTarget(n, 0, r), e.render(t, s), e.setRenderTarget(n, 1, r), e.render(t, a), e.setRenderTarget(n, 2, r), e.render(t, o), e.setRenderTarget(n, 3, r), e.render(t, l), e.setRenderTarget(n, 4, r), e.render(t, c), n.texture.generateMipmaps = x, e.setRenderTarget(n, 5, r), e.render(t, u), e.setRenderTarget(p, d, m), e.xr.enabled = _, n.texture.needsPMREMUpdate = !0;
  }
}
class Js extends vt {
  constructor(e, t, n, r, s, a, o, l, c, u) {
    e = e !== void 0 ? e : [], t = t !== void 0 ? t : 301, super(e, t, n, r, s, a, o, l, c, u), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class Oa extends tn {
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const n = { width: e, height: e, depth: 1 }, r = [n, n, n, n, n, n];
    this.texture = new Js(r, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = t.generateMipmaps !== void 0 ? t.generateMipmaps : !1, this.texture.minFilter = t.minFilter !== void 0 ? t.minFilter : 1006;
  }
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const n = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, r = new zn(5, 5, 5), s = new nn({
      name: "CubemapFromEquirect",
      uniforms: Nn(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: 1,
      blending: 0
    });
    s.uniforms.tEquirect.value = t;
    const a = new gt(r, s), o = t.minFilter;
    return t.minFilter === 1008 && (t.minFilter = 1006), new Na(1, 10, this).update(e, a), t.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
  }
  clear(e, t, n, r) {
    const s = e.getRenderTarget();
    for (let a = 0; a < 6; a++)
      e.setRenderTarget(this, a), e.clear(t, n, r);
    e.setRenderTarget(s);
  }
}
const lr = /* @__PURE__ */ new N(), Ba = /* @__PURE__ */ new N(), Ga = /* @__PURE__ */ new Le();
class dn {
  constructor(e = new N(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  setComponents(e, t, n, r) {
    return this.normal.set(e, t, n), this.constant = r, this;
  }
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  setFromCoplanarPoints(e, t, n) {
    const r = lr.subVectors(n, t).cross(Ba.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(r, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, t) {
    const n = e.delta(lr), r = this.normal.dot(n);
    if (r === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const s = -(e.start.dot(this.normal) + this.constant) / r;
    return s < 0 || s > 1 ? null : t.copy(e.start).addScaledVector(n, s);
  }
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
    return t < 0 && n > 0 || n < 0 && t > 0;
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    const n = t || Ga.getNormalMatrix(e), r = this.coplanarPoint(lr).applyMatrix4(e), s = this.normal.applyMatrix3(n).normalize();
    return this.constant = -r.dot(s), this;
  }
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const cn = /* @__PURE__ */ new Ni(), xi = /* @__PURE__ */ new N();
class Ar {
  constructor(e = new dn(), t = new dn(), n = new dn(), r = new dn(), s = new dn(), a = new dn()) {
    this.planes = [e, t, n, r, s, a];
  }
  set(e, t, n, r, s, a) {
    const o = this.planes;
    return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(r), o[4].copy(s), o[5].copy(a), this;
  }
  copy(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      t[n].copy(e.planes[n]);
    return this;
  }
  setFromProjectionMatrix(e, t = 2e3) {
    const n = this.planes, r = e.elements, s = r[0], a = r[1], o = r[2], l = r[3], c = r[4], u = r[5], p = r[6], d = r[7], m = r[8], _ = r[9], x = r[10], f = r[11], h = r[12], b = r[13], E = r[14], y = r[15];
    if (n[0].setComponents(l - s, d - c, f - m, y - h).normalize(), n[1].setComponents(l + s, d + c, f + m, y + h).normalize(), n[2].setComponents(l + a, d + u, f + _, y + b).normalize(), n[3].setComponents(l - a, d - u, f - _, y - b).normalize(), n[4].setComponents(l - o, d - p, f - x, y - E).normalize(), t === 2e3)
      n[5].setComponents(l + o, d + p, f + x, y + E).normalize();
    else if (t === 2001)
      n[5].setComponents(o, p, x, E).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), cn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), cn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(cn);
  }
  intersectsSprite(e) {
    return cn.center.set(0, 0, 0), cn.radius = 0.7071067811865476, cn.applyMatrix4(e.matrixWorld), this.intersectsSphere(cn);
  }
  intersectsSphere(e) {
    const t = this.planes, n = e.center, r = -e.radius;
    for (let s = 0; s < 6; s++)
      if (t[s].distanceToPoint(n) < r)
        return !1;
    return !0;
  }
  intersectsBox(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) {
      const r = t[n];
      if (xi.x = r.normal.x > 0 ? e.max.x : e.min.x, xi.y = r.normal.y > 0 ? e.max.y : e.min.y, xi.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(xi) < 0)
        return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      if (t[n].distanceToPoint(e) < 0)
        return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function Qs() {
  let i = null, e = !1, t = null, n = null;
  function r(s, a) {
    t(s, a), n = i.requestAnimationFrame(r);
  }
  return {
    start: function() {
      e !== !0 && t !== null && (n = i.requestAnimationFrame(r), e = !0);
    },
    stop: function() {
      i.cancelAnimationFrame(n), e = !1;
    },
    setAnimationLoop: function(s) {
      t = s;
    },
    setContext: function(s) {
      i = s;
    }
  };
}
function za(i) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(o, l) {
    const c = o.array, u = o.usage, p = c.byteLength, d = i.createBuffer();
    i.bindBuffer(l, d), i.bufferData(l, c, u), o.onUploadCallback();
    let m;
    if (c instanceof Float32Array)
      m = i.FLOAT;
    else if (c instanceof Uint16Array)
      o.isFloat16BufferAttribute ? m = i.HALF_FLOAT : m = i.UNSIGNED_SHORT;
    else if (c instanceof Int16Array)
      m = i.SHORT;
    else if (c instanceof Uint32Array)
      m = i.UNSIGNED_INT;
    else if (c instanceof Int32Array)
      m = i.INT;
    else if (c instanceof Int8Array)
      m = i.BYTE;
    else if (c instanceof Uint8Array)
      m = i.UNSIGNED_BYTE;
    else if (c instanceof Uint8ClampedArray)
      m = i.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
    return {
      buffer: d,
      type: m,
      bytesPerElement: c.BYTES_PER_ELEMENT,
      version: o.version,
      size: p
    };
  }
  function n(o, l, c) {
    const u = l.array, p = l._updateRange, d = l.updateRanges;
    if (i.bindBuffer(c, o), p.count === -1 && d.length === 0 && i.bufferSubData(c, 0, u), d.length !== 0) {
      for (let m = 0, _ = d.length; m < _; m++) {
        const x = d[m];
        i.bufferSubData(
          c,
          x.start * u.BYTES_PER_ELEMENT,
          u,
          x.start,
          x.count
        );
      }
      l.clearUpdateRanges();
    }
    p.count !== -1 && (i.bufferSubData(
      c,
      p.offset * u.BYTES_PER_ELEMENT,
      u,
      p.offset,
      p.count
    ), p.count = -1), l.onUploadCallback();
  }
  function r(o) {
    return o.isInterleavedBufferAttribute && (o = o.data), e.get(o);
  }
  function s(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const l = e.get(o);
    l && (i.deleteBuffer(l.buffer), e.delete(o));
  }
  function a(o, l) {
    if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
      const u = e.get(o);
      (!u || u.version < o.version) && e.set(o, {
        buffer: o.buffer,
        type: o.type,
        bytesPerElement: o.elementSize,
        version: o.version
      });
      return;
    }
    const c = e.get(o);
    if (c === void 0)
      e.set(o, t(o, l));
    else if (c.version < o.version) {
      if (c.size !== o.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(c.buffer, o, l), c.version = o.version;
    }
  }
  return {
    get: r,
    remove: s,
    update: a
  };
}
class On extends Ot {
  constructor(e = 1, t = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: n,
      heightSegments: r
    };
    const s = e / 2, a = t / 2, o = Math.floor(n), l = Math.floor(r), c = o + 1, u = l + 1, p = e / o, d = t / l, m = [], _ = [], x = [], f = [];
    for (let h = 0; h < u; h++) {
      const b = h * d - a;
      for (let E = 0; E < c; E++) {
        const y = E * p - s;
        _.push(y, -b, 0), x.push(0, 0, 1), f.push(E / o), f.push(1 - h / l);
      }
    }
    for (let h = 0; h < l; h++)
      for (let b = 0; b < o; b++) {
        const E = b + c * h, y = b + c * (h + 1), F = b + 1 + c * (h + 1), R = b + 1 + c * h;
        m.push(E, y, R), m.push(y, F, R);
      }
    this.setIndex(m), this.setAttribute("position", new xt(_, 3)), this.setAttribute("normal", new xt(x, 3)), this.setAttribute("uv", new xt(f, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new On(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
var Ha = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, Va = `#ifdef USE_ALPHAHASH
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
#endif`, ka = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, Wa = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Xa = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, qa = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, Ya = `#ifdef USE_AOMAP
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
#endif`, Ka = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, $a = `#ifdef USE_BATCHING
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
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`, Za = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, ja = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, Ja = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, Qa = `float G_BlinnPhong_Implicit( ) {
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
} // validated`, eo = `#ifdef USE_IRIDESCENCE
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
#endif`, to = `#ifdef USE_BUMPMAP
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
#endif`, no = `#if NUM_CLIPPING_PLANES > 0
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
#endif`, io = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, ro = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, so = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, ao = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, oo = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, lo = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, co = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`, uo = `#define PI 3.141592653589793
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
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
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
} // validated`, ho = `#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`, fo = `vec3 transformedNormal = objectNormal;
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
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, po = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, mo = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, _o = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, go = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, vo = "gl_FragColor = linearToOutputTexel( gl_FragColor );", xo = `
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, Mo = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, So = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, Eo = `#ifdef USE_ENVMAP
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
#endif`, yo = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, To = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, Ao = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, bo = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Ro = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, wo = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Co = `#ifdef USE_GRADIENTMAP
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
}`, Po = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, Lo = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Do = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, Uo = `uniform bool receiveShadow;
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
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
#endif`, Io = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
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
	#endif
#endif`, Fo = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, No = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, Oo = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, Bo = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, Go = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`, zo = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
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
		vec3 iridescenceF0;
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
		float v = 0.5 / ( gv + gl );
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, Ho = `
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
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
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, Vo = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, ko = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, Wo = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, Xo = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, qo = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Yo = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, Ko = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, $o = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, Zo = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`, jo = `#if defined( USE_POINTS_UV )
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
#endif`, Jo = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, Qo = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, el = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, tl = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, nl = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, il = `#ifdef USE_MORPHTARGETS
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
#endif`, rl = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, sl = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, al = `#ifdef USE_NORMALMAP_OBJECTSPACE
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
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, ol = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, ll = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, cl = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, ul = `#ifdef USE_NORMALMAP
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
#endif`, hl = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, dl = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, fl = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, pl = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, ml = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, _l = `vec3 packNormalToRGB( const in vec3 normal ) {
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
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, gl = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, vl = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, xl = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Ml = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, Sl = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, El = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, yl = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
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
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
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
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
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
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`, Tl = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
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
#endif`, Al = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
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
#endif`, bl = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
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
	#if NUM_POINT_LIGHT_SHADOWS > 0
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
}`, Rl = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, wl = `#ifdef USE_SKINNING
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
#endif`, Cl = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, Pl = `#ifdef USE_SKINNING
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
#endif`, Ll = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, Dl = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, Ul = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, Il = `#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`, Fl = `#ifdef USE_TRANSMISSION
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
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, Nl = `#ifdef USE_TRANSMISSION
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
#endif`, Ol = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, Bl = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, Gl = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, zl = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const Hl = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, Vl = `uniform sampler2D t2D;
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
}`, kl = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Wl = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Xl = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, ql = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Yl = `#include <common>
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
}`, Kl = `#if DEPTH_PACKING == 3200
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
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, $l = `#define DISTANCE
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
}`, Zl = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, jl = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, Jl = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Ql = `uniform float scale;
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
}`, ec = `uniform vec3 diffuse;
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
}`, tc = `#include <common>
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
}`, nc = `uniform vec3 diffuse;
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
}`, ic = `#define LAMBERT
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
}`, rc = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`, sc = `#define MATCAP
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
}`, ac = `#define MATCAP
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
}`, oc = `#define NORMAL
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
}`, lc = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
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
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, cc = `#define PHONG
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
}`, uc = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`, hc = `#define STANDARD
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
}`, dc = `#define STANDARD
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
#include <packing>
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`, fc = `#define TOON
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
}`, pc = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
}`, mc = `uniform float size;
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
}`, _c = `uniform vec3 diffuse;
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
}`, gc = `#include <common>
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
}`, vc = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`, xc = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`, Mc = `uniform vec3 diffuse;
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
}`, Pe = {
  alphahash_fragment: Ha,
  alphahash_pars_fragment: Va,
  alphamap_fragment: ka,
  alphamap_pars_fragment: Wa,
  alphatest_fragment: Xa,
  alphatest_pars_fragment: qa,
  aomap_fragment: Ya,
  aomap_pars_fragment: Ka,
  batching_pars_vertex: $a,
  batching_vertex: Za,
  begin_vertex: ja,
  beginnormal_vertex: Ja,
  bsdfs: Qa,
  iridescence_fragment: eo,
  bumpmap_pars_fragment: to,
  clipping_planes_fragment: no,
  clipping_planes_pars_fragment: io,
  clipping_planes_pars_vertex: ro,
  clipping_planes_vertex: so,
  color_fragment: ao,
  color_pars_fragment: oo,
  color_pars_vertex: lo,
  color_vertex: co,
  common: uo,
  cube_uv_reflection_fragment: ho,
  defaultnormal_vertex: fo,
  displacementmap_pars_vertex: po,
  displacementmap_vertex: mo,
  emissivemap_fragment: _o,
  emissivemap_pars_fragment: go,
  colorspace_fragment: vo,
  colorspace_pars_fragment: xo,
  envmap_fragment: Mo,
  envmap_common_pars_fragment: So,
  envmap_pars_fragment: Eo,
  envmap_pars_vertex: yo,
  envmap_physical_pars_fragment: Io,
  envmap_vertex: To,
  fog_vertex: Ao,
  fog_pars_vertex: bo,
  fog_fragment: Ro,
  fog_pars_fragment: wo,
  gradientmap_pars_fragment: Co,
  lightmap_pars_fragment: Po,
  lights_lambert_fragment: Lo,
  lights_lambert_pars_fragment: Do,
  lights_pars_begin: Uo,
  lights_toon_fragment: Fo,
  lights_toon_pars_fragment: No,
  lights_phong_fragment: Oo,
  lights_phong_pars_fragment: Bo,
  lights_physical_fragment: Go,
  lights_physical_pars_fragment: zo,
  lights_fragment_begin: Ho,
  lights_fragment_maps: Vo,
  lights_fragment_end: ko,
  logdepthbuf_fragment: Wo,
  logdepthbuf_pars_fragment: Xo,
  logdepthbuf_pars_vertex: qo,
  logdepthbuf_vertex: Yo,
  map_fragment: Ko,
  map_pars_fragment: $o,
  map_particle_fragment: Zo,
  map_particle_pars_fragment: jo,
  metalnessmap_fragment: Jo,
  metalnessmap_pars_fragment: Qo,
  morphinstance_vertex: el,
  morphcolor_vertex: tl,
  morphnormal_vertex: nl,
  morphtarget_pars_vertex: il,
  morphtarget_vertex: rl,
  normal_fragment_begin: sl,
  normal_fragment_maps: al,
  normal_pars_fragment: ol,
  normal_pars_vertex: ll,
  normal_vertex: cl,
  normalmap_pars_fragment: ul,
  clearcoat_normal_fragment_begin: hl,
  clearcoat_normal_fragment_maps: dl,
  clearcoat_pars_fragment: fl,
  iridescence_pars_fragment: pl,
  opaque_fragment: ml,
  packing: _l,
  premultiplied_alpha_fragment: gl,
  project_vertex: vl,
  dithering_fragment: xl,
  dithering_pars_fragment: Ml,
  roughnessmap_fragment: Sl,
  roughnessmap_pars_fragment: El,
  shadowmap_pars_fragment: yl,
  shadowmap_pars_vertex: Tl,
  shadowmap_vertex: Al,
  shadowmask_pars_fragment: bl,
  skinbase_vertex: Rl,
  skinning_pars_vertex: wl,
  skinning_vertex: Cl,
  skinnormal_vertex: Pl,
  specularmap_fragment: Ll,
  specularmap_pars_fragment: Dl,
  tonemapping_fragment: Ul,
  tonemapping_pars_fragment: Il,
  transmission_fragment: Fl,
  transmission_pars_fragment: Nl,
  uv_pars_fragment: Ol,
  uv_pars_vertex: Bl,
  uv_vertex: Gl,
  worldpos_vertex: zl,
  background_vert: Hl,
  background_frag: Vl,
  backgroundCube_vert: kl,
  backgroundCube_frag: Wl,
  cube_vert: Xl,
  cube_frag: ql,
  depth_vert: Yl,
  depth_frag: Kl,
  distanceRGBA_vert: $l,
  distanceRGBA_frag: Zl,
  equirect_vert: jl,
  equirect_frag: Jl,
  linedashed_vert: Ql,
  linedashed_frag: ec,
  meshbasic_vert: tc,
  meshbasic_frag: nc,
  meshlambert_vert: ic,
  meshlambert_frag: rc,
  meshmatcap_vert: sc,
  meshmatcap_frag: ac,
  meshnormal_vert: oc,
  meshnormal_frag: lc,
  meshphong_vert: cc,
  meshphong_frag: uc,
  meshphysical_vert: hc,
  meshphysical_frag: dc,
  meshtoon_vert: fc,
  meshtoon_frag: pc,
  points_vert: mc,
  points_frag: _c,
  shadow_vert: gc,
  shadow_frag: vc,
  sprite_vert: xc,
  sprite_frag: Mc
}, ie = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Ie(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Le() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Le() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Le() },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 }
    // basic, lambert, phong
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Le() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Le() },
    normalScale: { value: /* @__PURE__ */ new Oe(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Le() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Ie(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotShadowMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Ie(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Le() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Le() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Ie(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new Oe(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Le() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Le() },
    alphaTest: { value: 0 }
  }
}, Ut = {
  basic: {
    uniforms: /* @__PURE__ */ ft([
      ie.common,
      ie.specularmap,
      ie.envmap,
      ie.aomap,
      ie.lightmap,
      ie.fog
    ]),
    vertexShader: Pe.meshbasic_vert,
    fragmentShader: Pe.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ ft([
      ie.common,
      ie.specularmap,
      ie.envmap,
      ie.aomap,
      ie.lightmap,
      ie.emissivemap,
      ie.bumpmap,
      ie.normalmap,
      ie.displacementmap,
      ie.fog,
      ie.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ie(0) }
      }
    ]),
    vertexShader: Pe.meshlambert_vert,
    fragmentShader: Pe.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ ft([
      ie.common,
      ie.specularmap,
      ie.envmap,
      ie.aomap,
      ie.lightmap,
      ie.emissivemap,
      ie.bumpmap,
      ie.normalmap,
      ie.displacementmap,
      ie.fog,
      ie.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ie(0) },
        specular: { value: /* @__PURE__ */ new Ie(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: Pe.meshphong_vert,
    fragmentShader: Pe.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ ft([
      ie.common,
      ie.envmap,
      ie.aomap,
      ie.lightmap,
      ie.emissivemap,
      ie.bumpmap,
      ie.normalmap,
      ie.displacementmap,
      ie.roughnessmap,
      ie.metalnessmap,
      ie.fog,
      ie.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ie(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Pe.meshphysical_vert,
    fragmentShader: Pe.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ ft([
      ie.common,
      ie.aomap,
      ie.lightmap,
      ie.emissivemap,
      ie.bumpmap,
      ie.normalmap,
      ie.displacementmap,
      ie.gradientmap,
      ie.fog,
      ie.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ie(0) }
      }
    ]),
    vertexShader: Pe.meshtoon_vert,
    fragmentShader: Pe.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ ft([
      ie.common,
      ie.bumpmap,
      ie.normalmap,
      ie.displacementmap,
      ie.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Pe.meshmatcap_vert,
    fragmentShader: Pe.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ ft([
      ie.points,
      ie.fog
    ]),
    vertexShader: Pe.points_vert,
    fragmentShader: Pe.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ ft([
      ie.common,
      ie.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Pe.linedashed_vert,
    fragmentShader: Pe.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ ft([
      ie.common,
      ie.displacementmap
    ]),
    vertexShader: Pe.depth_vert,
    fragmentShader: Pe.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ ft([
      ie.common,
      ie.bumpmap,
      ie.normalmap,
      ie.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Pe.meshnormal_vert,
    fragmentShader: Pe.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ ft([
      ie.sprite,
      ie.fog
    ]),
    vertexShader: Pe.sprite_vert,
    fragmentShader: Pe.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Le() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Pe.background_vert,
    fragmentShader: Pe.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Le() }
    },
    vertexShader: Pe.backgroundCube_vert,
    fragmentShader: Pe.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Pe.cube_vert,
    fragmentShader: Pe.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Pe.equirect_vert,
    fragmentShader: Pe.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ ft([
      ie.common,
      ie.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new N() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Pe.distanceRGBA_vert,
    fragmentShader: Pe.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ ft([
      ie.lights,
      ie.fog,
      {
        color: { value: /* @__PURE__ */ new Ie(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Pe.shadow_vert,
    fragmentShader: Pe.shadow_frag
  }
};
Ut.physical = {
  uniforms: /* @__PURE__ */ ft([
    Ut.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Le() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Le() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new Oe(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Le() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Le() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Le() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new Ie(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Le() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Le() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Le() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new Oe() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Le() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new Ie(0) },
      specularColor: { value: /* @__PURE__ */ new Ie(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Le() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Le() },
      anisotropyVector: { value: /* @__PURE__ */ new Oe() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Le() }
    }
  ]),
  vertexShader: Pe.meshphysical_vert,
  fragmentShader: Pe.meshphysical_frag
};
const Mi = { r: 0, b: 0, g: 0 }, un = /* @__PURE__ */ new Nt(), Sc = /* @__PURE__ */ new Je();
function Ec(i, e, t, n, r, s, a) {
  const o = new Ie(0);
  let l = s === !0 ? 0 : 1, c, u, p = null, d = 0, m = null;
  function _(b) {
    let E = b.isScene === !0 ? b.background : null;
    return E && E.isTexture && (E = (b.backgroundBlurriness > 0 ? t : e).get(E)), E;
  }
  function x(b) {
    let E = !1;
    const y = _(b);
    y === null ? h(o, l) : y && y.isColor && (h(y, 1), E = !0);
    const F = i.xr.getEnvironmentBlendMode();
    F === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, a) : F === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, a), (i.autoClear || E) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function f(b, E) {
    const y = _(E);
    y && (y.isCubeTexture || y.mapping === 306) ? (u === void 0 && (u = new gt(
      new zn(1, 1, 1),
      new nn({
        name: "BackgroundCubeMaterial",
        uniforms: Nn(Ut.backgroundCube.uniforms),
        vertexShader: Ut.backgroundCube.vertexShader,
        fragmentShader: Ut.backgroundCube.fragmentShader,
        side: 1,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), u.geometry.deleteAttribute("normal"), u.geometry.deleteAttribute("uv"), u.onBeforeRender = function(F, R, P) {
      this.matrixWorld.copyPosition(P.matrixWorld);
    }, Object.defineProperty(u.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), r.update(u)), un.copy(E.backgroundRotation), un.x *= -1, un.y *= -1, un.z *= -1, y.isCubeTexture && y.isRenderTargetTexture === !1 && (un.y *= -1, un.z *= -1), u.material.uniforms.envMap.value = y, u.material.uniforms.flipEnvMap.value = y.isCubeTexture && y.isRenderTargetTexture === !1 ? -1 : 1, u.material.uniforms.backgroundBlurriness.value = E.backgroundBlurriness, u.material.uniforms.backgroundIntensity.value = E.backgroundIntensity, u.material.uniforms.backgroundRotation.value.setFromMatrix4(Sc.makeRotationFromEuler(un)), u.material.toneMapped = ke.getTransfer(y.colorSpace) !== Ye, (p !== y || d !== y.version || m !== i.toneMapping) && (u.material.needsUpdate = !0, p = y, d = y.version, m = i.toneMapping), u.layers.enableAll(), b.unshift(u, u.geometry, u.material, 0, 0, null)) : y && y.isTexture && (c === void 0 && (c = new gt(
      new On(2, 2),
      new nn({
        name: "BackgroundMaterial",
        uniforms: Nn(Ut.background.uniforms),
        vertexShader: Ut.background.vertexShader,
        fragmentShader: Ut.background.fragmentShader,
        side: 0,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), r.update(c)), c.material.uniforms.t2D.value = y, c.material.uniforms.backgroundIntensity.value = E.backgroundIntensity, c.material.toneMapped = ke.getTransfer(y.colorSpace) !== Ye, y.matrixAutoUpdate === !0 && y.updateMatrix(), c.material.uniforms.uvTransform.value.copy(y.matrix), (p !== y || d !== y.version || m !== i.toneMapping) && (c.material.needsUpdate = !0, p = y, d = y.version, m = i.toneMapping), c.layers.enableAll(), b.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function h(b, E) {
    b.getRGB(Mi, Zs(i)), n.buffers.color.setClear(Mi.r, Mi.g, Mi.b, E, a);
  }
  return {
    getClearColor: function() {
      return o;
    },
    setClearColor: function(b, E = 1) {
      o.set(b), l = E, h(o, l);
    },
    getClearAlpha: function() {
      return l;
    },
    setClearAlpha: function(b) {
      l = b, h(o, l);
    },
    render: x,
    addToRenderList: f
  };
}
function yc(i, e) {
  const t = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, r = d(null);
  let s = r, a = !1;
  function o(v, C, G, U, H) {
    let q = !1;
    const V = p(U, G, C);
    s !== V && (s = V, c(s.object)), q = m(v, U, G, H), q && _(v, U, G, H), H !== null && e.update(H, i.ELEMENT_ARRAY_BUFFER), (q || a) && (a = !1, y(v, C, G, U), H !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.get(H).buffer));
  }
  function l() {
    return i.createVertexArray();
  }
  function c(v) {
    return i.bindVertexArray(v);
  }
  function u(v) {
    return i.deleteVertexArray(v);
  }
  function p(v, C, G) {
    const U = G.wireframe === !0;
    let H = n[v.id];
    H === void 0 && (H = {}, n[v.id] = H);
    let q = H[C.id];
    q === void 0 && (q = {}, H[C.id] = q);
    let V = q[U];
    return V === void 0 && (V = d(l()), q[U] = V), V;
  }
  function d(v) {
    const C = [], G = [], U = [];
    for (let H = 0; H < t; H++)
      C[H] = 0, G[H] = 0, U[H] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: C,
      enabledAttributes: G,
      attributeDivisors: U,
      object: v,
      attributes: {},
      index: null
    };
  }
  function m(v, C, G, U) {
    const H = s.attributes, q = C.attributes;
    let V = 0;
    const j = G.getAttributes();
    for (const k in j)
      if (j[k].location >= 0) {
        const ue = H[k];
        let me = q[k];
        if (me === void 0 && (k === "instanceMatrix" && v.instanceMatrix && (me = v.instanceMatrix), k === "instanceColor" && v.instanceColor && (me = v.instanceColor)), ue === void 0 || ue.attribute !== me || me && ue.data !== me.data) return !0;
        V++;
      }
    return s.attributesNum !== V || s.index !== U;
  }
  function _(v, C, G, U) {
    const H = {}, q = C.attributes;
    let V = 0;
    const j = G.getAttributes();
    for (const k in j)
      if (j[k].location >= 0) {
        let ue = q[k];
        ue === void 0 && (k === "instanceMatrix" && v.instanceMatrix && (ue = v.instanceMatrix), k === "instanceColor" && v.instanceColor && (ue = v.instanceColor));
        const me = {};
        me.attribute = ue, ue && ue.data && (me.data = ue.data), H[k] = me, V++;
      }
    s.attributes = H, s.attributesNum = V, s.index = U;
  }
  function x() {
    const v = s.newAttributes;
    for (let C = 0, G = v.length; C < G; C++)
      v[C] = 0;
  }
  function f(v) {
    h(v, 0);
  }
  function h(v, C) {
    const G = s.newAttributes, U = s.enabledAttributes, H = s.attributeDivisors;
    G[v] = 1, U[v] === 0 && (i.enableVertexAttribArray(v), U[v] = 1), H[v] !== C && (i.vertexAttribDivisor(v, C), H[v] = C);
  }
  function b() {
    const v = s.newAttributes, C = s.enabledAttributes;
    for (let G = 0, U = C.length; G < U; G++)
      C[G] !== v[G] && (i.disableVertexAttribArray(G), C[G] = 0);
  }
  function E(v, C, G, U, H, q, V) {
    V === !0 ? i.vertexAttribIPointer(v, C, G, H, q) : i.vertexAttribPointer(v, C, G, U, H, q);
  }
  function y(v, C, G, U) {
    x();
    const H = U.attributes, q = G.getAttributes(), V = C.defaultAttributeValues;
    for (const j in q) {
      const k = q[j];
      if (k.location >= 0) {
        let se = H[j];
        if (se === void 0 && (j === "instanceMatrix" && v.instanceMatrix && (se = v.instanceMatrix), j === "instanceColor" && v.instanceColor && (se = v.instanceColor)), se !== void 0) {
          const ue = se.normalized, me = se.itemSize, Fe = e.get(se);
          if (Fe === void 0) continue;
          const Xe = Fe.buffer, W = Fe.type, J = Fe.bytesPerElement, pe = W === i.INT || W === i.UNSIGNED_INT || se.gpuType === 1013;
          if (se.isInterleavedBufferAttribute) {
            const le = se.data, Ee = le.stride, Re = se.offset;
            if (le.isInstancedInterleavedBuffer) {
              for (let Ue = 0; Ue < k.locationSize; Ue++)
                h(k.location + Ue, le.meshPerAttribute);
              v.isInstancedMesh !== !0 && U._maxInstanceCount === void 0 && (U._maxInstanceCount = le.meshPerAttribute * le.count);
            } else
              for (let Ue = 0; Ue < k.locationSize; Ue++)
                f(k.location + Ue);
            i.bindBuffer(i.ARRAY_BUFFER, Xe);
            for (let Ue = 0; Ue < k.locationSize; Ue++)
              E(
                k.location + Ue,
                me / k.locationSize,
                W,
                ue,
                Ee * J,
                (Re + me / k.locationSize * Ue) * J,
                pe
              );
          } else {
            if (se.isInstancedBufferAttribute) {
              for (let le = 0; le < k.locationSize; le++)
                h(k.location + le, se.meshPerAttribute);
              v.isInstancedMesh !== !0 && U._maxInstanceCount === void 0 && (U._maxInstanceCount = se.meshPerAttribute * se.count);
            } else
              for (let le = 0; le < k.locationSize; le++)
                f(k.location + le);
            i.bindBuffer(i.ARRAY_BUFFER, Xe);
            for (let le = 0; le < k.locationSize; le++)
              E(
                k.location + le,
                me / k.locationSize,
                W,
                ue,
                me * J,
                me / k.locationSize * le * J,
                pe
              );
          }
        } else if (V !== void 0) {
          const ue = V[j];
          if (ue !== void 0)
            switch (ue.length) {
              case 2:
                i.vertexAttrib2fv(k.location, ue);
                break;
              case 3:
                i.vertexAttrib3fv(k.location, ue);
                break;
              case 4:
                i.vertexAttrib4fv(k.location, ue);
                break;
              default:
                i.vertexAttrib1fv(k.location, ue);
            }
        }
      }
    }
    b();
  }
  function F() {
    T();
    for (const v in n) {
      const C = n[v];
      for (const G in C) {
        const U = C[G];
        for (const H in U)
          u(U[H].object), delete U[H];
        delete C[G];
      }
      delete n[v];
    }
  }
  function R(v) {
    if (n[v.id] === void 0) return;
    const C = n[v.id];
    for (const G in C) {
      const U = C[G];
      for (const H in U)
        u(U[H].object), delete U[H];
      delete C[G];
    }
    delete n[v.id];
  }
  function P(v) {
    for (const C in n) {
      const G = n[C];
      if (G[v.id] === void 0) continue;
      const U = G[v.id];
      for (const H in U)
        u(U[H].object), delete U[H];
      delete G[v.id];
    }
  }
  function T() {
    S(), a = !0, s !== r && (s = r, c(s.object));
  }
  function S() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: o,
    reset: T,
    resetDefaultState: S,
    dispose: F,
    releaseStatesOfGeometry: R,
    releaseStatesOfProgram: P,
    initAttributes: x,
    enableAttribute: f,
    disableUnusedAttributes: b
  };
}
function Tc(i, e, t) {
  let n;
  function r(c) {
    n = c;
  }
  function s(c, u) {
    i.drawArrays(n, c, u), t.update(u, n, 1);
  }
  function a(c, u, p) {
    p !== 0 && (i.drawArraysInstanced(n, c, u, p), t.update(u, n, p));
  }
  function o(c, u, p) {
    if (p === 0) return;
    e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, c, 0, u, 0, p);
    let m = 0;
    for (let _ = 0; _ < p; _++)
      m += u[_];
    t.update(m, n, 1);
  }
  function l(c, u, p, d) {
    if (p === 0) return;
    const m = e.get("WEBGL_multi_draw");
    if (m === null)
      for (let _ = 0; _ < c.length; _++)
        a(c[_], u[_], d[_]);
    else {
      m.multiDrawArraysInstancedWEBGL(n, c, 0, u, 0, d, 0, p);
      let _ = 0;
      for (let x = 0; x < p; x++)
        _ += u[x];
      for (let x = 0; x < d.length; x++)
        t.update(_, n, d[x]);
    }
  }
  this.setMode = r, this.render = s, this.renderInstances = a, this.renderMultiDraw = o, this.renderMultiDrawInstances = l;
}
function Ac(i, e, t, n) {
  let r;
  function s() {
    if (r !== void 0) return r;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const R = e.get("EXT_texture_filter_anisotropic");
      r = i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      r = 0;
    return r;
  }
  function a(R) {
    return !(R !== 1023 && n.convert(R) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(R) {
    const P = R === 1016 && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
    return !(R !== 1009 && n.convert(R) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    R !== 1015 && !P);
  }
  function l(R) {
    if (R === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0)
        return "highp";
      R = "mediump";
    }
    return R === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let c = t.precision !== void 0 ? t.precision : "highp";
  const u = l(c);
  u !== c && (console.warn("THREE.WebGLRenderer:", c, "not supported, using", u, "instead."), c = u);
  const p = t.logarithmicDepthBuffer === !0, d = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), m = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), _ = i.getParameter(i.MAX_TEXTURE_SIZE), x = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), f = i.getParameter(i.MAX_VERTEX_ATTRIBS), h = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), b = i.getParameter(i.MAX_VARYING_VECTORS), E = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), y = m > 0, F = i.getParameter(i.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: s,
    getMaxPrecision: l,
    textureFormatReadable: a,
    textureTypeReadable: o,
    precision: c,
    logarithmicDepthBuffer: p,
    maxTextures: d,
    maxVertexTextures: m,
    maxTextureSize: _,
    maxCubemapSize: x,
    maxAttributes: f,
    maxVertexUniforms: h,
    maxVaryings: b,
    maxFragmentUniforms: E,
    vertexTextures: y,
    maxSamples: F
  };
}
function bc(i) {
  const e = this;
  let t = null, n = 0, r = !1, s = !1;
  const a = new dn(), o = new Le(), l = { value: null, needsUpdate: !1 };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(p, d) {
    const m = p.length !== 0 || d || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    n !== 0 || r;
    return r = d, n = p.length, m;
  }, this.beginShadows = function() {
    s = !0, u(null);
  }, this.endShadows = function() {
    s = !1;
  }, this.setGlobalState = function(p, d) {
    t = u(p, d, 0);
  }, this.setState = function(p, d, m) {
    const _ = p.clippingPlanes, x = p.clipIntersection, f = p.clipShadows, h = i.get(p);
    if (!r || _ === null || _.length === 0 || s && !f)
      s ? u(null) : c();
    else {
      const b = s ? 0 : n, E = b * 4;
      let y = h.clippingState || null;
      l.value = y, y = u(_, d, E, m);
      for (let F = 0; F !== E; ++F)
        y[F] = t[F];
      h.clippingState = y, this.numIntersection = x ? this.numPlanes : 0, this.numPlanes += b;
    }
  };
  function c() {
    l.value !== t && (l.value = t, l.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0;
  }
  function u(p, d, m, _) {
    const x = p !== null ? p.length : 0;
    let f = null;
    if (x !== 0) {
      if (f = l.value, _ !== !0 || f === null) {
        const h = m + x * 4, b = d.matrixWorldInverse;
        o.getNormalMatrix(b), (f === null || f.length < h) && (f = new Float32Array(h));
        for (let E = 0, y = m; E !== x; ++E, y += 4)
          a.copy(p[E]).applyMatrix4(b, o), a.normal.toArray(f, y), f[y + 3] = a.constant;
      }
      l.value = f, l.needsUpdate = !0;
    }
    return e.numPlanes = x, e.numIntersection = 0, f;
  }
}
function Rc(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(a, o) {
    return o === 303 ? a.mapping = 301 : o === 304 && (a.mapping = 302), a;
  }
  function n(a) {
    if (a && a.isTexture) {
      const o = a.mapping;
      if (o === 303 || o === 304)
        if (e.has(a)) {
          const l = e.get(a).texture;
          return t(l, a.mapping);
        } else {
          const l = a.image;
          if (l && l.height > 0) {
            const c = new Oa(l.height);
            return c.fromEquirectangularTexture(i, a), e.set(a, c), a.addEventListener("dispose", r), t(c.texture, a.mapping);
          } else
            return null;
        }
    }
    return a;
  }
  function r(a) {
    const o = a.target;
    o.removeEventListener("dispose", r);
    const l = e.get(o);
    l !== void 0 && (e.delete(o), l.dispose());
  }
  function s() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: s
  };
}
class ea extends js {
  constructor(e = -1, t = 1, n = 1, r = -1, s = 0.1, a = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = r, this.near = s, this.far = a, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, t, n, r, s, a) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2;
    let s = n - e, a = n + e, o = r + t, l = r - t;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom, u = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      s += c * this.view.offsetX, a = s + c * this.view.width, o -= u * this.view.offsetY, l = o - u * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(s, a, o, l, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}
const In = 4, ns = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], pn = 20, cr = /* @__PURE__ */ new ea(), is = /* @__PURE__ */ new Ie();
let ur = null, hr = 0, dr = 0, fr = !1;
const fn = (1 + Math.sqrt(5)) / 2, Un = 1 / fn, rs = [
  /* @__PURE__ */ new N(-fn, Un, 0),
  /* @__PURE__ */ new N(fn, Un, 0),
  /* @__PURE__ */ new N(-Un, 0, fn),
  /* @__PURE__ */ new N(Un, 0, fn),
  /* @__PURE__ */ new N(0, fn, -Un),
  /* @__PURE__ */ new N(0, fn, Un),
  /* @__PURE__ */ new N(-1, 1, -1),
  /* @__PURE__ */ new N(1, 1, -1),
  /* @__PURE__ */ new N(-1, 1, 1),
  /* @__PURE__ */ new N(1, 1, 1)
];
class ss {
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety (the cubeCamera
   * is placed at the origin).
   */
  fromScene(e, t = 0, n = 0.1, r = 100) {
    ur = this._renderer.getRenderTarget(), hr = this._renderer.getActiveCubeFace(), dr = this._renderer.getActiveMipmapLevel(), fr = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(256);
    const s = this._allocateTargets();
    return s.depthBuffer = !0, this._sceneToCubeUV(e, n, r, s), t > 0 && this._blur(s, 0, 0, t), this._applyPMREM(s), this._cleanup(s), s;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512),
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported equirectangular image size is 64 x 32.
   */
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256,
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported cube size is 16 x 16.
   */
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = ls(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = os(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  // private interface
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodPlanes.length; e++)
      this._lodPlanes[e].dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(ur, hr, dr), this._renderer.xr.enabled = fr, e.scissorTest = !1, Si(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), ur = this._renderer.getRenderTarget(), hr = this._renderer.getActiveCubeFace(), dr = this._renderer.getActiveMipmapLevel(), fr = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = t || this._allocateTargets();
    return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
      magFilter: 1006,
      minFilter: 1006,
      generateMipmaps: !1,
      type: 1016,
      format: 1023,
      colorSpace: rn,
      depthBuffer: !1
    }, r = as(e, t, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = as(e, t, n);
      const { _lodMax: s } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = wc(s)), this._blurMaterial = Cc(s, e, t);
    }
    return r;
  }
  _compileMaterial(e) {
    const t = new gt(this._lodPlanes[0], e);
    this._renderer.compile(t, cr);
  }
  _sceneToCubeUV(e, t, n, r) {
    const o = new Tt(90, 1, t, n), l = [1, -1, 1, 1, 1, 1], c = [1, 1, 1, -1, -1, -1], u = this._renderer, p = u.autoClear, d = u.toneMapping;
    u.getClearColor(is), u.toneMapping = 0, u.autoClear = !1;
    const m = new Ys({
      name: "PMREM.Background",
      side: 1,
      depthWrite: !1,
      depthTest: !1
    }), _ = new gt(new zn(), m);
    let x = !1;
    const f = e.background;
    f ? f.isColor && (m.color.copy(f), e.background = null, x = !0) : (m.color.copy(is), x = !0);
    for (let h = 0; h < 6; h++) {
      const b = h % 3;
      b === 0 ? (o.up.set(0, l[h], 0), o.lookAt(c[h], 0, 0)) : b === 1 ? (o.up.set(0, 0, l[h]), o.lookAt(0, c[h], 0)) : (o.up.set(0, l[h], 0), o.lookAt(0, 0, c[h]));
      const E = this._cubeSize;
      Si(r, b * E, h > 2 ? E : 0, E, E), u.setRenderTarget(r), x && u.render(_, o), u.render(e, o);
    }
    _.geometry.dispose(), _.material.dispose(), u.toneMapping = d, u.autoClear = p, e.background = f;
  }
  _textureToCubeUV(e, t) {
    const n = this._renderer, r = e.mapping === 301 || e.mapping === 302;
    r ? (this._cubemapMaterial === null && (this._cubemapMaterial = ls()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = os());
    const s = r ? this._cubemapMaterial : this._equirectMaterial, a = new gt(this._lodPlanes[0], s), o = s.uniforms;
    o.envMap.value = e;
    const l = this._cubeSize;
    Si(t, 0, 0, 3 * l, 2 * l), n.setRenderTarget(t), n.render(a, cr);
  }
  _applyPMREM(e) {
    const t = this._renderer, n = t.autoClear;
    t.autoClear = !1;
    const r = this._lodPlanes.length;
    for (let s = 1; s < r; s++) {
      const a = Math.sqrt(this._sigmas[s] * this._sigmas[s] - this._sigmas[s - 1] * this._sigmas[s - 1]), o = rs[(r - s - 1) % rs.length];
      this._blur(e, s - 1, s, a, o);
    }
    t.autoClear = n;
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   */
  _blur(e, t, n, r, s) {
    const a = this._pingPongRenderTarget;
    this._halfBlur(
      e,
      a,
      t,
      n,
      r,
      "latitudinal",
      s
    ), this._halfBlur(
      a,
      e,
      n,
      n,
      r,
      "longitudinal",
      s
    );
  }
  _halfBlur(e, t, n, r, s, a, o) {
    const l = this._renderer, c = this._blurMaterial;
    a !== "latitudinal" && a !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const u = 3, p = new gt(this._lodPlanes[r], c), d = c.uniforms, m = this._sizeLods[n] - 1, _ = isFinite(s) ? Math.PI / (2 * m) : 2 * Math.PI / (2 * pn - 1), x = s / _, f = isFinite(s) ? 1 + Math.floor(u * x) : pn;
    f > pn && console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${pn}`);
    const h = [];
    let b = 0;
    for (let P = 0; P < pn; ++P) {
      const T = P / x, S = Math.exp(-T * T / 2);
      h.push(S), P === 0 ? b += S : P < f && (b += 2 * S);
    }
    for (let P = 0; P < h.length; P++)
      h[P] = h[P] / b;
    d.envMap.value = e.texture, d.samples.value = f, d.weights.value = h, d.latitudinal.value = a === "latitudinal", o && (d.poleAxis.value = o);
    const { _lodMax: E } = this;
    d.dTheta.value = _, d.mipInt.value = E - n;
    const y = this._sizeLods[r], F = 3 * y * (r > E - In ? r - E + In : 0), R = 4 * (this._cubeSize - y);
    Si(t, F, R, 3 * y, 2 * y), l.setRenderTarget(t), l.render(p, cr);
  }
}
function wc(i) {
  const e = [], t = [], n = [];
  let r = i;
  const s = i - In + 1 + ns.length;
  for (let a = 0; a < s; a++) {
    const o = Math.pow(2, r);
    t.push(o);
    let l = 1 / o;
    a > i - In ? l = ns[a - i + In - 1] : a === 0 && (l = 0), n.push(l);
    const c = 1 / (o - 2), u = -c, p = 1 + c, d = [u, u, p, u, p, p, u, u, p, p, u, p], m = 6, _ = 6, x = 3, f = 2, h = 1, b = new Float32Array(x * _ * m), E = new Float32Array(f * _ * m), y = new Float32Array(h * _ * m);
    for (let R = 0; R < m; R++) {
      const P = R % 3 * 2 / 3 - 1, T = R > 2 ? 0 : -1, S = [
        P,
        T,
        0,
        P + 2 / 3,
        T,
        0,
        P + 2 / 3,
        T + 1,
        0,
        P,
        T,
        0,
        P + 2 / 3,
        T + 1,
        0,
        P,
        T + 1,
        0
      ];
      b.set(S, x * _ * R), E.set(d, f * _ * R);
      const v = [R, R, R, R, R, R];
      y.set(v, h * _ * R);
    }
    const F = new Ot();
    F.setAttribute("position", new Ft(b, x)), F.setAttribute("uv", new Ft(E, f)), F.setAttribute("faceIndex", new Ft(y, h)), e.push(F), r > In && r--;
  }
  return { lodPlanes: e, sizeLods: t, sigmas: n };
}
function as(i, e, t) {
  const n = new tn(i, e, t);
  return n.texture.mapping = 306, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function Si(i, e, t, n, r) {
  i.viewport.set(e, t, n, r), i.scissor.set(e, t, n, r);
}
function Cc(i, e, t) {
  const n = new Float32Array(pn), r = new N(0, 1, 0);
  return new nn({
    name: "SphericalGaussianBlur",
    defines: {
      n: pn,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${i}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: r }
    },
    vertexShader: br(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function os() {
  return new nn({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: br(),
    fragmentShader: (
      /* glsl */
      `

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
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function ls() {
  return new nn({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: br(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function br() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
function Pc(i) {
  let e = /* @__PURE__ */ new WeakMap(), t = null;
  function n(o) {
    if (o && o.isTexture) {
      const l = o.mapping, c = l === 303 || l === 304, u = l === 301 || l === 302;
      if (c || u) {
        let p = e.get(o);
        const d = p !== void 0 ? p.texture.pmremVersion : 0;
        if (o.isRenderTargetTexture && o.pmremVersion !== d)
          return t === null && (t = new ss(i)), p = c ? t.fromEquirectangular(o, p) : t.fromCubemap(o, p), p.texture.pmremVersion = o.pmremVersion, e.set(o, p), p.texture;
        if (p !== void 0)
          return p.texture;
        {
          const m = o.image;
          return c && m && m.height > 0 || u && m && r(m) ? (t === null && (t = new ss(i)), p = c ? t.fromEquirectangular(o) : t.fromCubemap(o), p.texture.pmremVersion = o.pmremVersion, e.set(o, p), o.addEventListener("dispose", s), p.texture) : null;
        }
      }
    }
    return o;
  }
  function r(o) {
    let l = 0;
    const c = 6;
    for (let u = 0; u < c; u++)
      o[u] !== void 0 && l++;
    return l === c;
  }
  function s(o) {
    const l = o.target;
    l.removeEventListener("dispose", s);
    const c = e.get(l);
    c !== void 0 && (e.delete(l), c.dispose());
  }
  function a() {
    e = /* @__PURE__ */ new WeakMap(), t !== null && (t.dispose(), t = null);
  }
  return {
    get: n,
    dispose: a
  };
}
function Lc(i) {
  const e = {};
  function t(n) {
    if (e[n] !== void 0)
      return e[n];
    let r;
    switch (n) {
      case "WEBGL_depth_texture":
        r = i.getExtension("WEBGL_depth_texture") || i.getExtension("MOZ_WEBGL_depth_texture") || i.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        r = i.getExtension("EXT_texture_filter_anisotropic") || i.getExtension("MOZ_EXT_texture_filter_anisotropic") || i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        r = i.getExtension("WEBGL_compressed_texture_s3tc") || i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        r = i.getExtension("WEBGL_compressed_texture_pvrtc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        r = i.getExtension(n);
    }
    return e[n] = r, r;
  }
  return {
    has: function(n) {
      return t(n) !== null;
    },
    init: function() {
      t("EXT_color_buffer_float"), t("WEBGL_clip_cull_distance"), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture"), t("WEBGL_render_shared_exponent");
    },
    get: function(n) {
      const r = t(n);
      return r === null && Zn("THREE.WebGLRenderer: " + n + " extension not supported."), r;
    }
  };
}
function Dc(i, e, t, n) {
  const r = {}, s = /* @__PURE__ */ new WeakMap();
  function a(p) {
    const d = p.target;
    d.index !== null && e.remove(d.index);
    for (const _ in d.attributes)
      e.remove(d.attributes[_]);
    for (const _ in d.morphAttributes) {
      const x = d.morphAttributes[_];
      for (let f = 0, h = x.length; f < h; f++)
        e.remove(x[f]);
    }
    d.removeEventListener("dispose", a), delete r[d.id];
    const m = s.get(d);
    m && (e.remove(m), s.delete(d)), n.releaseStatesOfGeometry(d), d.isInstancedBufferGeometry === !0 && delete d._maxInstanceCount, t.memory.geometries--;
  }
  function o(p, d) {
    return r[d.id] === !0 || (d.addEventListener("dispose", a), r[d.id] = !0, t.memory.geometries++), d;
  }
  function l(p) {
    const d = p.attributes;
    for (const _ in d)
      e.update(d[_], i.ARRAY_BUFFER);
    const m = p.morphAttributes;
    for (const _ in m) {
      const x = m[_];
      for (let f = 0, h = x.length; f < h; f++)
        e.update(x[f], i.ARRAY_BUFFER);
    }
  }
  function c(p) {
    const d = [], m = p.index, _ = p.attributes.position;
    let x = 0;
    if (m !== null) {
      const b = m.array;
      x = m.version;
      for (let E = 0, y = b.length; E < y; E += 3) {
        const F = b[E + 0], R = b[E + 1], P = b[E + 2];
        d.push(F, R, R, P, P, F);
      }
    } else if (_ !== void 0) {
      const b = _.array;
      x = _.version;
      for (let E = 0, y = b.length / 3 - 1; E < y; E += 3) {
        const F = E + 0, R = E + 1, P = E + 2;
        d.push(F, R, R, P, P, F);
      }
    } else
      return;
    const f = new (Hs(d) ? $s : Ks)(d, 1);
    f.version = x;
    const h = s.get(p);
    h && e.remove(h), s.set(p, f);
  }
  function u(p) {
    const d = s.get(p);
    if (d) {
      const m = p.index;
      m !== null && d.version < m.version && c(p);
    } else
      c(p);
    return s.get(p);
  }
  return {
    get: o,
    update: l,
    getWireframeAttribute: u
  };
}
function Uc(i, e, t) {
  let n;
  function r(d) {
    n = d;
  }
  let s, a;
  function o(d) {
    s = d.type, a = d.bytesPerElement;
  }
  function l(d, m) {
    i.drawElements(n, m, s, d * a), t.update(m, n, 1);
  }
  function c(d, m, _) {
    _ !== 0 && (i.drawElementsInstanced(n, m, s, d * a, _), t.update(m, n, _));
  }
  function u(d, m, _) {
    if (_ === 0) return;
    e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, m, 0, s, d, 0, _);
    let f = 0;
    for (let h = 0; h < _; h++)
      f += m[h];
    t.update(f, n, 1);
  }
  function p(d, m, _, x) {
    if (_ === 0) return;
    const f = e.get("WEBGL_multi_draw");
    if (f === null)
      for (let h = 0; h < d.length; h++)
        c(d[h] / a, m[h], x[h]);
    else {
      f.multiDrawElementsInstancedWEBGL(n, m, 0, s, d, 0, x, 0, _);
      let h = 0;
      for (let b = 0; b < _; b++)
        h += m[b];
      for (let b = 0; b < x.length; b++)
        t.update(h, n, x[b]);
    }
  }
  this.setMode = r, this.setIndex = o, this.render = l, this.renderInstances = c, this.renderMultiDraw = u, this.renderMultiDrawInstances = p;
}
function Ic(i) {
  const e = {
    geometries: 0,
    textures: 0
  }, t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function n(s, a, o) {
    switch (t.calls++, a) {
      case i.TRIANGLES:
        t.triangles += o * (s / 3);
        break;
      case i.LINES:
        t.lines += o * (s / 2);
        break;
      case i.LINE_STRIP:
        t.lines += o * (s - 1);
        break;
      case i.LINE_LOOP:
        t.lines += o * s;
        break;
      case i.POINTS:
        t.points += o * s;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", a);
        break;
    }
  }
  function r() {
    t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
  }
  return {
    memory: e,
    render: t,
    programs: null,
    autoReset: !0,
    reset: r,
    update: n
  };
}
function Fc(i, e, t) {
  const n = /* @__PURE__ */ new WeakMap(), r = new rt();
  function s(a, o, l) {
    const c = a.morphTargetInfluences, u = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, p = u !== void 0 ? u.length : 0;
    let d = n.get(o);
    if (d === void 0 || d.count !== p) {
      let S = function() {
        P.dispose(), n.delete(o), o.removeEventListener("dispose", S);
      };
      d !== void 0 && d.texture.dispose();
      const m = o.morphAttributes.position !== void 0, _ = o.morphAttributes.normal !== void 0, x = o.morphAttributes.color !== void 0, f = o.morphAttributes.position || [], h = o.morphAttributes.normal || [], b = o.morphAttributes.color || [];
      let E = 0;
      m === !0 && (E = 1), _ === !0 && (E = 2), x === !0 && (E = 3);
      let y = o.attributes.position.count * E, F = 1;
      y > e.maxTextureSize && (F = Math.ceil(y / e.maxTextureSize), y = e.maxTextureSize);
      const R = new Float32Array(y * F * 4 * p), P = new ks(R, y, F, p);
      P.type = 1015, P.needsUpdate = !0;
      const T = E * 4;
      for (let v = 0; v < p; v++) {
        const C = f[v], G = h[v], U = b[v], H = y * F * 4 * v;
        for (let q = 0; q < C.count; q++) {
          const V = q * T;
          m === !0 && (r.fromBufferAttribute(C, q), R[H + V + 0] = r.x, R[H + V + 1] = r.y, R[H + V + 2] = r.z, R[H + V + 3] = 0), _ === !0 && (r.fromBufferAttribute(G, q), R[H + V + 4] = r.x, R[H + V + 5] = r.y, R[H + V + 6] = r.z, R[H + V + 7] = 0), x === !0 && (r.fromBufferAttribute(U, q), R[H + V + 8] = r.x, R[H + V + 9] = r.y, R[H + V + 10] = r.z, R[H + V + 11] = U.itemSize === 4 ? r.w : 1);
        }
      }
      d = {
        count: p,
        texture: P,
        size: new Oe(y, F)
      }, n.set(o, d), o.addEventListener("dispose", S);
    }
    if (a.isInstancedMesh === !0 && a.morphTexture !== null)
      l.getUniforms().setValue(i, "morphTexture", a.morphTexture, t);
    else {
      let m = 0;
      for (let x = 0; x < c.length; x++)
        m += c[x];
      const _ = o.morphTargetsRelative ? 1 : 1 - m;
      l.getUniforms().setValue(i, "morphTargetBaseInfluence", _), l.getUniforms().setValue(i, "morphTargetInfluences", c);
    }
    l.getUniforms().setValue(i, "morphTargetsTexture", d.texture, t), l.getUniforms().setValue(i, "morphTargetsTextureSize", d.size);
  }
  return {
    update: s
  };
}
function Nc(i, e, t, n) {
  let r = /* @__PURE__ */ new WeakMap();
  function s(l) {
    const c = n.render.frame, u = l.geometry, p = e.get(l, u);
    if (r.get(p) !== c && (e.update(p), r.set(p, c)), l.isInstancedMesh && (l.hasEventListener("dispose", o) === !1 && l.addEventListener("dispose", o), r.get(l) !== c && (t.update(l.instanceMatrix, i.ARRAY_BUFFER), l.instanceColor !== null && t.update(l.instanceColor, i.ARRAY_BUFFER), r.set(l, c))), l.isSkinnedMesh) {
      const d = l.skeleton;
      r.get(d) !== c && (d.update(), r.set(d, c));
    }
    return p;
  }
  function a() {
    r = /* @__PURE__ */ new WeakMap();
  }
  function o(l) {
    const c = l.target;
    c.removeEventListener("dispose", o), t.remove(c.instanceMatrix), c.instanceColor !== null && t.remove(c.instanceColor);
  }
  return {
    update: s,
    dispose: a
  };
}
class ta extends vt {
  constructor(e, t, n, r, s, a, o, l, c, u = 1026) {
    if (u !== 1026 && u !== 1027)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && u === 1026 && (n = 1014), n === void 0 && u === 1027 && (n = 1020), super(null, r, s, a, o, l, u, n, c), this.isDepthTexture = !0, this.image = { width: e, height: t }, this.magFilter = o !== void 0 ? o : 1003, this.minFilter = l !== void 0 ? l : 1003, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}
const na = /* @__PURE__ */ new vt(), cs = /* @__PURE__ */ new ta(1, 1), ia = /* @__PURE__ */ new ks(), ra = /* @__PURE__ */ new Sa(), sa = /* @__PURE__ */ new Js(), us = [], hs = [], ds = new Float32Array(16), fs = new Float32Array(9), ps = new Float32Array(4);
function Hn(i, e, t) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const r = e * t;
  let s = us[r];
  if (s === void 0 && (s = new Float32Array(r), us[r] = s), e !== 0) {
    n.toArray(s, 0);
    for (let a = 1, o = 0; a !== e; ++a)
      o += t, i[a].toArray(s, o);
  }
  return s;
}
function st(i, e) {
  if (i.length !== e.length) return !1;
  for (let t = 0, n = i.length; t < n; t++)
    if (i[t] !== e[t]) return !1;
  return !0;
}
function at(i, e) {
  for (let t = 0, n = e.length; t < n; t++)
    i[t] = e[t];
}
function Oi(i, e) {
  let t = hs[e];
  t === void 0 && (t = new Int32Array(e), hs[e] = t);
  for (let n = 0; n !== e; ++n)
    t[n] = i.allocateTextureUnit();
  return t;
}
function Oc(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1f(this.addr, e), t[0] = e);
}
function Bc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (st(t, e)) return;
    i.uniform2fv(this.addr, e), at(t, e);
  }
}
function Gc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (i.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (st(t, e)) return;
    i.uniform3fv(this.addr, e), at(t, e);
  }
}
function zc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (st(t, e)) return;
    i.uniform4fv(this.addr, e), at(t, e);
  }
}
function Hc(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (st(t, e)) return;
    i.uniformMatrix2fv(this.addr, !1, e), at(t, e);
  } else {
    if (st(t, n)) return;
    ps.set(n), i.uniformMatrix2fv(this.addr, !1, ps), at(t, n);
  }
}
function Vc(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (st(t, e)) return;
    i.uniformMatrix3fv(this.addr, !1, e), at(t, e);
  } else {
    if (st(t, n)) return;
    fs.set(n), i.uniformMatrix3fv(this.addr, !1, fs), at(t, n);
  }
}
function kc(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (st(t, e)) return;
    i.uniformMatrix4fv(this.addr, !1, e), at(t, e);
  } else {
    if (st(t, n)) return;
    ds.set(n), i.uniformMatrix4fv(this.addr, !1, ds), at(t, n);
  }
}
function Wc(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1i(this.addr, e), t[0] = e);
}
function Xc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (st(t, e)) return;
    i.uniform2iv(this.addr, e), at(t, e);
  }
}
function qc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (st(t, e)) return;
    i.uniform3iv(this.addr, e), at(t, e);
  }
}
function Yc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (st(t, e)) return;
    i.uniform4iv(this.addr, e), at(t, e);
  }
}
function Kc(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1ui(this.addr, e), t[0] = e);
}
function $c(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (st(t, e)) return;
    i.uniform2uiv(this.addr, e), at(t, e);
  }
}
function Zc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (st(t, e)) return;
    i.uniform3uiv(this.addr, e), at(t, e);
  }
}
function jc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (st(t, e)) return;
    i.uniform4uiv(this.addr, e), at(t, e);
  }
}
function Jc(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r);
  let s;
  this.type === i.SAMPLER_2D_SHADOW ? (cs.compareFunction = 515, s = cs) : s = na, t.setTexture2D(e || s, r);
}
function Qc(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture3D(e || ra, r);
}
function eu(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTextureCube(e || sa, r);
}
function tu(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture2DArray(e || ia, r);
}
function nu(i) {
  switch (i) {
    case 5126:
      return Oc;
    case 35664:
      return Bc;
    case 35665:
      return Gc;
    case 35666:
      return zc;
    case 35674:
      return Hc;
    case 35675:
      return Vc;
    case 35676:
      return kc;
    case 5124:
    case 35670:
      return Wc;
    case 35667:
    case 35671:
      return Xc;
    case 35668:
    case 35672:
      return qc;
    case 35669:
    case 35673:
      return Yc;
    case 5125:
      return Kc;
    case 36294:
      return $c;
    case 36295:
      return Zc;
    case 36296:
      return jc;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Jc;
    case 35679:
    case 36299:
    case 36307:
      return Qc;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return eu;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return tu;
  }
}
function iu(i, e) {
  i.uniform1fv(this.addr, e);
}
function ru(i, e) {
  const t = Hn(e, this.size, 2);
  i.uniform2fv(this.addr, t);
}
function su(i, e) {
  const t = Hn(e, this.size, 3);
  i.uniform3fv(this.addr, t);
}
function au(i, e) {
  const t = Hn(e, this.size, 4);
  i.uniform4fv(this.addr, t);
}
function ou(i, e) {
  const t = Hn(e, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, t);
}
function lu(i, e) {
  const t = Hn(e, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, t);
}
function cu(i, e) {
  const t = Hn(e, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, t);
}
function uu(i, e) {
  i.uniform1iv(this.addr, e);
}
function hu(i, e) {
  i.uniform2iv(this.addr, e);
}
function du(i, e) {
  i.uniform3iv(this.addr, e);
}
function fu(i, e) {
  i.uniform4iv(this.addr, e);
}
function pu(i, e) {
  i.uniform1uiv(this.addr, e);
}
function mu(i, e) {
  i.uniform2uiv(this.addr, e);
}
function _u(i, e) {
  i.uniform3uiv(this.addr, e);
}
function gu(i, e) {
  i.uniform4uiv(this.addr, e);
}
function vu(i, e, t) {
  const n = this.cache, r = e.length, s = Oi(t, r);
  st(n, s) || (i.uniform1iv(this.addr, s), at(n, s));
  for (let a = 0; a !== r; ++a)
    t.setTexture2D(e[a] || na, s[a]);
}
function xu(i, e, t) {
  const n = this.cache, r = e.length, s = Oi(t, r);
  st(n, s) || (i.uniform1iv(this.addr, s), at(n, s));
  for (let a = 0; a !== r; ++a)
    t.setTexture3D(e[a] || ra, s[a]);
}
function Mu(i, e, t) {
  const n = this.cache, r = e.length, s = Oi(t, r);
  st(n, s) || (i.uniform1iv(this.addr, s), at(n, s));
  for (let a = 0; a !== r; ++a)
    t.setTextureCube(e[a] || sa, s[a]);
}
function Su(i, e, t) {
  const n = this.cache, r = e.length, s = Oi(t, r);
  st(n, s) || (i.uniform1iv(this.addr, s), at(n, s));
  for (let a = 0; a !== r; ++a)
    t.setTexture2DArray(e[a] || ia, s[a]);
}
function Eu(i) {
  switch (i) {
    case 5126:
      return iu;
    case 35664:
      return ru;
    case 35665:
      return su;
    case 35666:
      return au;
    case 35674:
      return ou;
    case 35675:
      return lu;
    case 35676:
      return cu;
    case 5124:
    case 35670:
      return uu;
    case 35667:
    case 35671:
      return hu;
    case 35668:
    case 35672:
      return du;
    case 35669:
    case 35673:
      return fu;
    case 5125:
      return pu;
    case 36294:
      return mu;
    case 36295:
      return _u;
    case 36296:
      return gu;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return vu;
    case 35679:
    case 36299:
    case 36307:
      return xu;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Mu;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Su;
  }
}
class yu {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = nu(t.type);
  }
}
class Tu {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = Eu(t.type);
  }
}
class Au {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, n) {
    const r = this.seq;
    for (let s = 0, a = r.length; s !== a; ++s) {
      const o = r[s];
      o.setValue(e, t[o.id], n);
    }
  }
}
const pr = /(\w+)(\])?(\[|\.)?/g;
function ms(i, e) {
  i.seq.push(e), i.map[e.id] = e;
}
function bu(i, e, t) {
  const n = i.name, r = n.length;
  for (pr.lastIndex = 0; ; ) {
    const s = pr.exec(n), a = pr.lastIndex;
    let o = s[1];
    const l = s[2] === "]", c = s[3];
    if (l && (o = o | 0), c === void 0 || c === "[" && a + 2 === r) {
      ms(t, c === void 0 ? new yu(o, i, e) : new Tu(o, i, e));
      break;
    } else {
      let p = t.map[o];
      p === void 0 && (p = new Au(o), ms(t, p)), t = p;
    }
  }
}
class wi {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let r = 0; r < n; ++r) {
      const s = e.getActiveUniform(t, r), a = e.getUniformLocation(t, s.name);
      bu(s, a, this);
    }
  }
  setValue(e, t, n, r) {
    const s = this.map[t];
    s !== void 0 && s.setValue(e, n, r);
  }
  setOptional(e, t, n) {
    const r = t[n];
    r !== void 0 && this.setValue(e, n, r);
  }
  static upload(e, t, n, r) {
    for (let s = 0, a = t.length; s !== a; ++s) {
      const o = t[s], l = n[o.id];
      l.needsUpdate !== !1 && o.setValue(e, l.value, r);
    }
  }
  static seqWithValue(e, t) {
    const n = [];
    for (let r = 0, s = e.length; r !== s; ++r) {
      const a = e[r];
      a.id in t && n.push(a);
    }
    return n;
  }
}
function _s(i, e, t) {
  const n = i.createShader(e);
  return i.shaderSource(n, t), i.compileShader(n), n;
}
const Ru = 37297;
let wu = 0;
function Cu(i, e) {
  const t = i.split(`
`), n = [], r = Math.max(e - 6, 0), s = Math.min(e + 6, t.length);
  for (let a = r; a < s; a++) {
    const o = a + 1;
    n.push(`${o === e ? ">" : " "} ${o}: ${t[a]}`);
  }
  return n.join(`
`);
}
function Pu(i) {
  const e = ke.getPrimaries(ke.workingColorSpace), t = ke.getPrimaries(i);
  let n;
  switch (e === t ? n = "" : e === Li && t === Pi ? n = "LinearDisplayP3ToLinearSRGB" : e === Pi && t === Li && (n = "LinearSRGBToLinearDisplayP3"), i) {
    case rn:
    case Fi:
      return [n, "LinearTransferOETF"];
    case Lt:
    case Tr:
      return [n, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space:", i), [n, "LinearTransferOETF"];
  }
}
function gs(i, e, t) {
  const n = i.getShaderParameter(e, i.COMPILE_STATUS), r = i.getShaderInfoLog(e).trim();
  if (n && r === "") return "";
  const s = /ERROR: 0:(\d+)/.exec(r);
  if (s) {
    const a = parseInt(s[1]);
    return t.toUpperCase() + `

` + r + `

` + Cu(i.getShaderSource(e), a);
  } else
    return r;
}
function Lu(i, e) {
  const t = Pu(e);
  return `vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`;
}
function Du(i, e) {
  let t;
  switch (e) {
    case 1:
      t = "Linear";
      break;
    case 2:
      t = "Reinhard";
      break;
    case 3:
      t = "Cineon";
      break;
    case 4:
      t = "ACESFilmic";
      break;
    case 6:
      t = "AgX";
      break;
    case 7:
      t = "Neutral";
      break;
    case 5:
      t = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), t = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
const Ei = /* @__PURE__ */ new N();
function Uu() {
  ke.getLuminanceCoefficients(Ei);
  const i = Ei.x.toFixed(4), e = Ei.y.toFixed(4), t = Ei.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function Iu(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter($n).join(`
`);
}
function Fu(i) {
  const e = [];
  for (const t in i) {
    const n = i[t];
    n !== !1 && e.push("#define " + t + " " + n);
  }
  return e.join(`
`);
}
function Nu(i, e) {
  const t = {}, n = i.getProgramParameter(e, i.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < n; r++) {
    const s = i.getActiveAttrib(e, r), a = s.name;
    let o = 1;
    s.type === i.FLOAT_MAT2 && (o = 2), s.type === i.FLOAT_MAT3 && (o = 3), s.type === i.FLOAT_MAT4 && (o = 4), t[a] = {
      type: s.type,
      location: i.getAttribLocation(e, a),
      locationSize: o
    };
  }
  return t;
}
function $n(i) {
  return i !== "";
}
function vs(i, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function xs(i, e) {
  return i.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const Ou = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Er(i) {
  return i.replace(Ou, Gu);
}
const Bu = /* @__PURE__ */ new Map();
function Gu(i, e) {
  let t = Pe[e];
  if (t === void 0) {
    const n = Bu.get(e);
    if (n !== void 0)
      t = Pe[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, n);
    else
      throw new Error("Can not resolve #include <" + e + ">");
  }
  return Er(t);
}
const zu = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Ms(i) {
  return i.replace(zu, Hu);
}
function Hu(i, e, t, n) {
  let r = "";
  for (let s = parseInt(e); s < parseInt(t); s++)
    r += n.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function Ss(i) {
  let e = `precision ${i.precision} float;
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
	`;
  return i.precision === "highp" ? e += `
#define HIGH_PRECISION` : i.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (e += `
#define LOW_PRECISION`), e;
}
function Vu(i) {
  let e = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === 1 ? e = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === 2 ? e = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === 3 && (e = "SHADOWMAP_TYPE_VSM"), e;
}
function ku(i) {
  let e = "ENVMAP_TYPE_CUBE";
  if (i.envMap)
    switch (i.envMapMode) {
      case 301:
      case 302:
        e = "ENVMAP_TYPE_CUBE";
        break;
      case 306:
        e = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return e;
}
function Wu(i) {
  let e = "ENVMAP_MODE_REFLECTION";
  if (i.envMap)
    switch (i.envMapMode) {
      case 302:
        e = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return e;
}
function Xu(i) {
  let e = "ENVMAP_BLENDING_NONE";
  if (i.envMap)
    switch (i.combine) {
      case 0:
        e = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case 1:
        e = "ENVMAP_BLENDING_MIX";
        break;
      case 2:
        e = "ENVMAP_BLENDING_ADD";
        break;
    }
  return e;
}
function qu(i) {
  const e = i.envMapCubeUVHeight;
  if (e === null) return null;
  const t = Math.log2(e) - 2, n = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 7 * 16)), texelHeight: n, maxMip: t };
}
function Yu(i, e, t, n) {
  const r = i.getContext(), s = t.defines;
  let a = t.vertexShader, o = t.fragmentShader;
  const l = Vu(t), c = ku(t), u = Wu(t), p = Xu(t), d = qu(t), m = Iu(t), _ = Fu(s), x = r.createProgram();
  let f, h, b = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (f = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    _
  ].filter($n).join(`
`), f.length > 0 && (f += `
`), h = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    _
  ].filter($n).join(`
`), h.length > 0 && (h += `
`)) : (f = [
    Ss(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    _,
    t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    t.batching ? "#define USE_BATCHING" : "",
    t.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    t.instancing ? "#define USE_INSTANCING" : "",
    t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + u : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    t.mapUv ? "#define MAP_UV " + t.mapUv : "",
    t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "",
    t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "",
    t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "",
    t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "",
    t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "",
    t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "",
    t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "",
    t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "",
    t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "",
    t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "",
    t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "",
    t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "",
    t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "",
    t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "",
    t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "",
    t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "",
    t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "",
    t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "",
    t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "",
    t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "",
    t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "",
    t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "",
    //
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.skinning ? "#define USE_SKINNING" : "",
    t.morphTargets ? "#define USE_MORPHTARGETS" : "",
    t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    t.morphColors ? "#define USE_MORPHCOLORS" : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter($n).join(`
`), h = [
    Ss(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    _,
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    t.map ? "#define USE_MAP" : "",
    t.matcap ? "#define USE_MATCAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + c : "",
    t.envMap ? "#define " + u : "",
    t.envMap ? "#define " + p : "",
    d ? "#define CUBEUV_TEXEL_WIDTH " + d.texelWidth : "",
    d ? "#define CUBEUV_TEXEL_HEIGHT " + d.texelHeight : "",
    d ? "#define CUBEUV_MAX_MIP " + d.maxMip + ".0" : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoat ? "#define USE_CLEARCOAT" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.dispersion ? "#define USE_DISPERSION" : "",
    t.iridescence ? "#define USE_IRIDESCENCE" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaTest ? "#define USE_ALPHATEST" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.sheen ? "#define USE_SHEEN" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors || t.instancingColor || t.batchingColor ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.gradientMap ? "#define USE_GRADIENTMAP" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    t.toneMapping !== 0 ? "#define TONE_MAPPING" : "",
    t.toneMapping !== 0 ? Pe.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    t.toneMapping !== 0 ? Du("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    Pe.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    Lu("linearToOutputTexel", t.outputColorSpace),
    Uu(),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter($n).join(`
`)), a = Er(a), a = vs(a, t), a = xs(a, t), o = Er(o), o = vs(o, t), o = xs(o, t), a = Ms(a), o = Ms(o), t.isRawShaderMaterial !== !0 && (b = `#version 300 es
`, f = [
    m,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + f, h = [
    "#define varying in",
    t.glslVersion === Nr ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    t.glslVersion === Nr ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + h);
  const E = b + f + a, y = b + h + o, F = _s(r, r.VERTEX_SHADER, E), R = _s(r, r.FRAGMENT_SHADER, y);
  r.attachShader(x, F), r.attachShader(x, R), t.index0AttributeName !== void 0 ? r.bindAttribLocation(x, 0, t.index0AttributeName) : t.morphTargets === !0 && r.bindAttribLocation(x, 0, "position"), r.linkProgram(x);
  function P(C) {
    if (i.debug.checkShaderErrors) {
      const G = r.getProgramInfoLog(x).trim(), U = r.getShaderInfoLog(F).trim(), H = r.getShaderInfoLog(R).trim();
      let q = !0, V = !0;
      if (r.getProgramParameter(x, r.LINK_STATUS) === !1)
        if (q = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(r, x, F, R);
        else {
          const j = gs(r, F, "vertex"), k = gs(r, R, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(x, r.VALIDATE_STATUS) + `

Material Name: ` + C.name + `
Material Type: ` + C.type + `

Program Info Log: ` + G + `
` + j + `
` + k
          );
        }
      else G !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", G) : (U === "" || H === "") && (V = !1);
      V && (C.diagnostics = {
        runnable: q,
        programLog: G,
        vertexShader: {
          log: U,
          prefix: f
        },
        fragmentShader: {
          log: H,
          prefix: h
        }
      });
    }
    r.deleteShader(F), r.deleteShader(R), T = new wi(r, x), S = Nu(r, x);
  }
  let T;
  this.getUniforms = function() {
    return T === void 0 && P(this), T;
  };
  let S;
  this.getAttributes = function() {
    return S === void 0 && P(this), S;
  };
  let v = t.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return v === !1 && (v = r.getProgramParameter(x, Ru)), v;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), r.deleteProgram(x), this.program = void 0;
  }, this.type = t.shaderType, this.name = t.shaderName, this.id = wu++, this.cacheKey = e, this.usedTimes = 1, this.program = x, this.vertexShader = F, this.fragmentShader = R, this;
}
let Ku = 0;
class $u {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e) {
    const t = e.vertexShader, n = e.fragmentShader, r = this._getShaderStage(t), s = this._getShaderStage(n), a = this._getShaderCacheForMaterial(e);
    return a.has(r) === !1 && (a.add(r), r.usedTimes++), a.has(s) === !1 && (a.add(s), s.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const n of t)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let n = t.get(e);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let n = t.get(e);
    return n === void 0 && (n = new Zu(e), t.set(e, n)), n;
  }
}
class Zu {
  constructor(e) {
    this.id = Ku++, this.code = e, this.usedTimes = 0;
  }
}
function ju(i, e, t, n, r, s, a) {
  const o = new Xs(), l = new $u(), c = /* @__PURE__ */ new Set(), u = [], p = r.logarithmicDepthBuffer, d = r.vertexTextures;
  let m = r.precision;
  const _ = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function x(S) {
    return c.add(S), S === 0 ? "uv" : `uv${S}`;
  }
  function f(S, v, C, G, U) {
    const H = G.fog, q = U.geometry, V = S.isMeshStandardMaterial ? G.environment : null, j = (S.isMeshStandardMaterial ? t : e).get(S.envMap || V), k = j && j.mapping === 306 ? j.image.height : null, se = _[S.type];
    S.precision !== null && (m = r.getMaxPrecision(S.precision), m !== S.precision && console.warn("THREE.WebGLProgram.getParameters:", S.precision, "not supported, using", m, "instead."));
    const ue = q.morphAttributes.position || q.morphAttributes.normal || q.morphAttributes.color, me = ue !== void 0 ? ue.length : 0;
    let Fe = 0;
    q.morphAttributes.position !== void 0 && (Fe = 1), q.morphAttributes.normal !== void 0 && (Fe = 2), q.morphAttributes.color !== void 0 && (Fe = 3);
    let Xe, W, J, pe;
    if (se) {
      const Ge = Ut[se];
      Xe = Ge.vertexShader, W = Ge.fragmentShader;
    } else
      Xe = S.vertexShader, W = S.fragmentShader, l.update(S), J = l.getVertexShaderID(S), pe = l.getFragmentShaderID(S);
    const le = i.getRenderTarget(), Ee = U.isInstancedMesh === !0, Re = U.isBatchedMesh === !0, Ue = !!S.map, $e = !!S.matcap, w = !!j, Qe = !!S.aoMap, We = !!S.lightMap, qe = !!S.bumpMap, ve = !!S.normalMap, et = !!S.displacementMap, Ae = !!S.emissiveMap, we = !!S.metalnessMap, A = !!S.roughnessMap, g = S.anisotropy > 0, z = S.clearcoat > 0, K = S.dispersion > 0, Z = S.iridescence > 0, $ = S.sheen > 0, xe = S.transmission > 0, re = g && !!S.anisotropyMap, ce = z && !!S.clearcoatMap, Ce = z && !!S.clearcoatNormalMap, Q = z && !!S.clearcoatRoughnessMap, oe = Z && !!S.iridescenceMap, Ne = Z && !!S.iridescenceThicknessMap, Te = $ && !!S.sheenColorMap, he = $ && !!S.sheenRoughnessMap, be = !!S.specularMap, De = !!S.specularColorMap, Ke = !!S.specularIntensityMap, L = xe && !!S.transmissionMap, ee = xe && !!S.thicknessMap, X = !!S.gradientMap, Y = !!S.alphaMap, ne = S.alphaTest > 0, Me = !!S.alphaHash, Be = !!S.extensions;
    let tt = 0;
    S.toneMapped && (le === null || le.isXRRenderTarget === !0) && (tt = i.toneMapping);
    const lt = {
      shaderID: se,
      shaderType: S.type,
      shaderName: S.name,
      vertexShader: Xe,
      fragmentShader: W,
      defines: S.defines,
      customVertexShaderID: J,
      customFragmentShaderID: pe,
      isRawShaderMaterial: S.isRawShaderMaterial === !0,
      glslVersion: S.glslVersion,
      precision: m,
      batching: Re,
      batchingColor: Re && U._colorsTexture !== null,
      instancing: Ee,
      instancingColor: Ee && U.instanceColor !== null,
      instancingMorph: Ee && U.morphTexture !== null,
      supportsVertexTextures: d,
      outputColorSpace: le === null ? i.outputColorSpace : le.isXRRenderTarget === !0 ? le.texture.colorSpace : rn,
      alphaToCoverage: !!S.alphaToCoverage,
      map: Ue,
      matcap: $e,
      envMap: w,
      envMapMode: w && j.mapping,
      envMapCubeUVHeight: k,
      aoMap: Qe,
      lightMap: We,
      bumpMap: qe,
      normalMap: ve,
      displacementMap: d && et,
      emissiveMap: Ae,
      normalMapObjectSpace: ve && S.normalMapType === 1,
      normalMapTangentSpace: ve && S.normalMapType === 0,
      metalnessMap: we,
      roughnessMap: A,
      anisotropy: g,
      anisotropyMap: re,
      clearcoat: z,
      clearcoatMap: ce,
      clearcoatNormalMap: Ce,
      clearcoatRoughnessMap: Q,
      dispersion: K,
      iridescence: Z,
      iridescenceMap: oe,
      iridescenceThicknessMap: Ne,
      sheen: $,
      sheenColorMap: Te,
      sheenRoughnessMap: he,
      specularMap: be,
      specularColorMap: De,
      specularIntensityMap: Ke,
      transmission: xe,
      transmissionMap: L,
      thicknessMap: ee,
      gradientMap: X,
      opaque: S.transparent === !1 && S.blending === 1 && S.alphaToCoverage === !1,
      alphaMap: Y,
      alphaTest: ne,
      alphaHash: Me,
      combine: S.combine,
      //
      mapUv: Ue && x(S.map.channel),
      aoMapUv: Qe && x(S.aoMap.channel),
      lightMapUv: We && x(S.lightMap.channel),
      bumpMapUv: qe && x(S.bumpMap.channel),
      normalMapUv: ve && x(S.normalMap.channel),
      displacementMapUv: et && x(S.displacementMap.channel),
      emissiveMapUv: Ae && x(S.emissiveMap.channel),
      metalnessMapUv: we && x(S.metalnessMap.channel),
      roughnessMapUv: A && x(S.roughnessMap.channel),
      anisotropyMapUv: re && x(S.anisotropyMap.channel),
      clearcoatMapUv: ce && x(S.clearcoatMap.channel),
      clearcoatNormalMapUv: Ce && x(S.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: Q && x(S.clearcoatRoughnessMap.channel),
      iridescenceMapUv: oe && x(S.iridescenceMap.channel),
      iridescenceThicknessMapUv: Ne && x(S.iridescenceThicknessMap.channel),
      sheenColorMapUv: Te && x(S.sheenColorMap.channel),
      sheenRoughnessMapUv: he && x(S.sheenRoughnessMap.channel),
      specularMapUv: be && x(S.specularMap.channel),
      specularColorMapUv: De && x(S.specularColorMap.channel),
      specularIntensityMapUv: Ke && x(S.specularIntensityMap.channel),
      transmissionMapUv: L && x(S.transmissionMap.channel),
      thicknessMapUv: ee && x(S.thicknessMap.channel),
      alphaMapUv: Y && x(S.alphaMap.channel),
      //
      vertexTangents: !!q.attributes.tangent && (ve || g),
      vertexColors: S.vertexColors,
      vertexAlphas: S.vertexColors === !0 && !!q.attributes.color && q.attributes.color.itemSize === 4,
      pointsUvs: U.isPoints === !0 && !!q.attributes.uv && (Ue || Y),
      fog: !!H,
      useFog: S.fog === !0,
      fogExp2: !!H && H.isFogExp2,
      flatShading: S.flatShading === !0,
      sizeAttenuation: S.sizeAttenuation === !0,
      logarithmicDepthBuffer: p,
      skinning: U.isSkinnedMesh === !0,
      morphTargets: q.morphAttributes.position !== void 0,
      morphNormals: q.morphAttributes.normal !== void 0,
      morphColors: q.morphAttributes.color !== void 0,
      morphTargetsCount: me,
      morphTextureStride: Fe,
      numDirLights: v.directional.length,
      numPointLights: v.point.length,
      numSpotLights: v.spot.length,
      numSpotLightMaps: v.spotLightMap.length,
      numRectAreaLights: v.rectArea.length,
      numHemiLights: v.hemi.length,
      numDirLightShadows: v.directionalShadowMap.length,
      numPointLightShadows: v.pointShadowMap.length,
      numSpotLightShadows: v.spotShadowMap.length,
      numSpotLightShadowsWithMaps: v.numSpotLightShadowsWithMaps,
      numLightProbes: v.numLightProbes,
      numClippingPlanes: a.numPlanes,
      numClipIntersection: a.numIntersection,
      dithering: S.dithering,
      shadowMapEnabled: i.shadowMap.enabled && C.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: tt,
      decodeVideoTexture: Ue && S.map.isVideoTexture === !0 && ke.getTransfer(S.map.colorSpace) === Ye,
      premultipliedAlpha: S.premultipliedAlpha,
      doubleSided: S.side === 2,
      flipSided: S.side === 1,
      useDepthPacking: S.depthPacking >= 0,
      depthPacking: S.depthPacking || 0,
      index0AttributeName: S.index0AttributeName,
      extensionClipCullDistance: Be && S.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (Be && S.extensions.multiDraw === !0 || Re) && n.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: S.customProgramCacheKey()
    };
    return lt.vertexUv1s = c.has(1), lt.vertexUv2s = c.has(2), lt.vertexUv3s = c.has(3), c.clear(), lt;
  }
  function h(S) {
    const v = [];
    if (S.shaderID ? v.push(S.shaderID) : (v.push(S.customVertexShaderID), v.push(S.customFragmentShaderID)), S.defines !== void 0)
      for (const C in S.defines)
        v.push(C), v.push(S.defines[C]);
    return S.isRawShaderMaterial === !1 && (b(v, S), E(v, S), v.push(i.outputColorSpace)), v.push(S.customProgramCacheKey), v.join();
  }
  function b(S, v) {
    S.push(v.precision), S.push(v.outputColorSpace), S.push(v.envMapMode), S.push(v.envMapCubeUVHeight), S.push(v.mapUv), S.push(v.alphaMapUv), S.push(v.lightMapUv), S.push(v.aoMapUv), S.push(v.bumpMapUv), S.push(v.normalMapUv), S.push(v.displacementMapUv), S.push(v.emissiveMapUv), S.push(v.metalnessMapUv), S.push(v.roughnessMapUv), S.push(v.anisotropyMapUv), S.push(v.clearcoatMapUv), S.push(v.clearcoatNormalMapUv), S.push(v.clearcoatRoughnessMapUv), S.push(v.iridescenceMapUv), S.push(v.iridescenceThicknessMapUv), S.push(v.sheenColorMapUv), S.push(v.sheenRoughnessMapUv), S.push(v.specularMapUv), S.push(v.specularColorMapUv), S.push(v.specularIntensityMapUv), S.push(v.transmissionMapUv), S.push(v.thicknessMapUv), S.push(v.combine), S.push(v.fogExp2), S.push(v.sizeAttenuation), S.push(v.morphTargetsCount), S.push(v.morphAttributeCount), S.push(v.numDirLights), S.push(v.numPointLights), S.push(v.numSpotLights), S.push(v.numSpotLightMaps), S.push(v.numHemiLights), S.push(v.numRectAreaLights), S.push(v.numDirLightShadows), S.push(v.numPointLightShadows), S.push(v.numSpotLightShadows), S.push(v.numSpotLightShadowsWithMaps), S.push(v.numLightProbes), S.push(v.shadowMapType), S.push(v.toneMapping), S.push(v.numClippingPlanes), S.push(v.numClipIntersection), S.push(v.depthPacking);
  }
  function E(S, v) {
    o.disableAll(), v.supportsVertexTextures && o.enable(0), v.instancing && o.enable(1), v.instancingColor && o.enable(2), v.instancingMorph && o.enable(3), v.matcap && o.enable(4), v.envMap && o.enable(5), v.normalMapObjectSpace && o.enable(6), v.normalMapTangentSpace && o.enable(7), v.clearcoat && o.enable(8), v.iridescence && o.enable(9), v.alphaTest && o.enable(10), v.vertexColors && o.enable(11), v.vertexAlphas && o.enable(12), v.vertexUv1s && o.enable(13), v.vertexUv2s && o.enable(14), v.vertexUv3s && o.enable(15), v.vertexTangents && o.enable(16), v.anisotropy && o.enable(17), v.alphaHash && o.enable(18), v.batching && o.enable(19), v.dispersion && o.enable(20), v.batchingColor && o.enable(21), S.push(o.mask), o.disableAll(), v.fog && o.enable(0), v.useFog && o.enable(1), v.flatShading && o.enable(2), v.logarithmicDepthBuffer && o.enable(3), v.skinning && o.enable(4), v.morphTargets && o.enable(5), v.morphNormals && o.enable(6), v.morphColors && o.enable(7), v.premultipliedAlpha && o.enable(8), v.shadowMapEnabled && o.enable(9), v.doubleSided && o.enable(10), v.flipSided && o.enable(11), v.useDepthPacking && o.enable(12), v.dithering && o.enable(13), v.transmission && o.enable(14), v.sheen && o.enable(15), v.opaque && o.enable(16), v.pointsUvs && o.enable(17), v.decodeVideoTexture && o.enable(18), v.alphaToCoverage && o.enable(19), S.push(o.mask);
  }
  function y(S) {
    const v = _[S.type];
    let C;
    if (v) {
      const G = Ut[v];
      C = Ua.clone(G.uniforms);
    } else
      C = S.uniforms;
    return C;
  }
  function F(S, v) {
    let C;
    for (let G = 0, U = u.length; G < U; G++) {
      const H = u[G];
      if (H.cacheKey === v) {
        C = H, ++C.usedTimes;
        break;
      }
    }
    return C === void 0 && (C = new Yu(i, v, S, s), u.push(C)), C;
  }
  function R(S) {
    if (--S.usedTimes === 0) {
      const v = u.indexOf(S);
      u[v] = u[u.length - 1], u.pop(), S.destroy();
    }
  }
  function P(S) {
    l.remove(S);
  }
  function T() {
    l.dispose();
  }
  return {
    getParameters: f,
    getProgramCacheKey: h,
    getUniforms: y,
    acquireProgram: F,
    releaseProgram: R,
    releaseShaderCache: P,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: u,
    dispose: T
  };
}
function Ju() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(a) {
    return i.has(a);
  }
  function t(a) {
    let o = i.get(a);
    return o === void 0 && (o = {}, i.set(a, o)), o;
  }
  function n(a) {
    i.delete(a);
  }
  function r(a, o, l) {
    i.get(a)[o] = l;
  }
  function s() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: e,
    get: t,
    remove: n,
    update: r,
    dispose: s
  };
}
function Qu(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.material.id !== e.material.id ? i.material.id - e.material.id : i.z !== e.z ? i.z - e.z : i.id - e.id;
}
function Es(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.z !== e.z ? e.z - i.z : i.id - e.id;
}
function ys() {
  const i = [];
  let e = 0;
  const t = [], n = [], r = [];
  function s() {
    e = 0, t.length = 0, n.length = 0, r.length = 0;
  }
  function a(p, d, m, _, x, f) {
    let h = i[e];
    return h === void 0 ? (h = {
      id: p.id,
      object: p,
      geometry: d,
      material: m,
      groupOrder: _,
      renderOrder: p.renderOrder,
      z: x,
      group: f
    }, i[e] = h) : (h.id = p.id, h.object = p, h.geometry = d, h.material = m, h.groupOrder = _, h.renderOrder = p.renderOrder, h.z = x, h.group = f), e++, h;
  }
  function o(p, d, m, _, x, f) {
    const h = a(p, d, m, _, x, f);
    m.transmission > 0 ? n.push(h) : m.transparent === !0 ? r.push(h) : t.push(h);
  }
  function l(p, d, m, _, x, f) {
    const h = a(p, d, m, _, x, f);
    m.transmission > 0 ? n.unshift(h) : m.transparent === !0 ? r.unshift(h) : t.unshift(h);
  }
  function c(p, d) {
    t.length > 1 && t.sort(p || Qu), n.length > 1 && n.sort(d || Es), r.length > 1 && r.sort(d || Es);
  }
  function u() {
    for (let p = e, d = i.length; p < d; p++) {
      const m = i[p];
      if (m.id === null) break;
      m.id = null, m.object = null, m.geometry = null, m.material = null, m.group = null;
    }
  }
  return {
    opaque: t,
    transmissive: n,
    transparent: r,
    init: s,
    push: o,
    unshift: l,
    finish: u,
    sort: c
  };
}
function eh() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(n, r) {
    const s = i.get(n);
    let a;
    return s === void 0 ? (a = new ys(), i.set(n, [a])) : r >= s.length ? (a = new ys(), s.push(a)) : a = s[r], a;
  }
  function t() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function th() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            direction: new N(),
            color: new Ie()
          };
          break;
        case "SpotLight":
          t = {
            position: new N(),
            direction: new N(),
            color: new Ie(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new N(),
            color: new Ie(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new N(),
            skyColor: new Ie(),
            groundColor: new Ie()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new Ie(),
            position: new N(),
            halfWidth: new N(),
            halfHeight: new N()
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
function nh() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Oe()
          };
          break;
        case "SpotLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Oe()
          };
          break;
        case "PointLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Oe(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
let ih = 0;
function rh(i, e) {
  return (e.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (i.map ? 1 : 0);
}
function sh(i) {
  const e = new th(), t = nh(), n = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let c = 0; c < 9; c++) n.probe.push(new N());
  const r = new N(), s = new Je(), a = new Je();
  function o(c) {
    let u = 0, p = 0, d = 0;
    for (let S = 0; S < 9; S++) n.probe[S].set(0, 0, 0);
    let m = 0, _ = 0, x = 0, f = 0, h = 0, b = 0, E = 0, y = 0, F = 0, R = 0, P = 0;
    c.sort(rh);
    for (let S = 0, v = c.length; S < v; S++) {
      const C = c[S], G = C.color, U = C.intensity, H = C.distance, q = C.shadow && C.shadow.map ? C.shadow.map.texture : null;
      if (C.isAmbientLight)
        u += G.r * U, p += G.g * U, d += G.b * U;
      else if (C.isLightProbe) {
        for (let V = 0; V < 9; V++)
          n.probe[V].addScaledVector(C.sh.coefficients[V], U);
        P++;
      } else if (C.isDirectionalLight) {
        const V = e.get(C);
        if (V.color.copy(C.color).multiplyScalar(C.intensity), C.castShadow) {
          const j = C.shadow, k = t.get(C);
          k.shadowIntensity = j.intensity, k.shadowBias = j.bias, k.shadowNormalBias = j.normalBias, k.shadowRadius = j.radius, k.shadowMapSize = j.mapSize, n.directionalShadow[m] = k, n.directionalShadowMap[m] = q, n.directionalShadowMatrix[m] = C.shadow.matrix, b++;
        }
        n.directional[m] = V, m++;
      } else if (C.isSpotLight) {
        const V = e.get(C);
        V.position.setFromMatrixPosition(C.matrixWorld), V.color.copy(G).multiplyScalar(U), V.distance = H, V.coneCos = Math.cos(C.angle), V.penumbraCos = Math.cos(C.angle * (1 - C.penumbra)), V.decay = C.decay, n.spot[x] = V;
        const j = C.shadow;
        if (C.map && (n.spotLightMap[F] = C.map, F++, j.updateMatrices(C), C.castShadow && R++), n.spotLightMatrix[x] = j.matrix, C.castShadow) {
          const k = t.get(C);
          k.shadowIntensity = j.intensity, k.shadowBias = j.bias, k.shadowNormalBias = j.normalBias, k.shadowRadius = j.radius, k.shadowMapSize = j.mapSize, n.spotShadow[x] = k, n.spotShadowMap[x] = q, y++;
        }
        x++;
      } else if (C.isRectAreaLight) {
        const V = e.get(C);
        V.color.copy(G).multiplyScalar(U), V.halfWidth.set(C.width * 0.5, 0, 0), V.halfHeight.set(0, C.height * 0.5, 0), n.rectArea[f] = V, f++;
      } else if (C.isPointLight) {
        const V = e.get(C);
        if (V.color.copy(C.color).multiplyScalar(C.intensity), V.distance = C.distance, V.decay = C.decay, C.castShadow) {
          const j = C.shadow, k = t.get(C);
          k.shadowIntensity = j.intensity, k.shadowBias = j.bias, k.shadowNormalBias = j.normalBias, k.shadowRadius = j.radius, k.shadowMapSize = j.mapSize, k.shadowCameraNear = j.camera.near, k.shadowCameraFar = j.camera.far, n.pointShadow[_] = k, n.pointShadowMap[_] = q, n.pointShadowMatrix[_] = C.shadow.matrix, E++;
        }
        n.point[_] = V, _++;
      } else if (C.isHemisphereLight) {
        const V = e.get(C);
        V.skyColor.copy(C.color).multiplyScalar(U), V.groundColor.copy(C.groundColor).multiplyScalar(U), n.hemi[h] = V, h++;
      }
    }
    f > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = ie.LTC_FLOAT_1, n.rectAreaLTC2 = ie.LTC_FLOAT_2) : (n.rectAreaLTC1 = ie.LTC_HALF_1, n.rectAreaLTC2 = ie.LTC_HALF_2)), n.ambient[0] = u, n.ambient[1] = p, n.ambient[2] = d;
    const T = n.hash;
    (T.directionalLength !== m || T.pointLength !== _ || T.spotLength !== x || T.rectAreaLength !== f || T.hemiLength !== h || T.numDirectionalShadows !== b || T.numPointShadows !== E || T.numSpotShadows !== y || T.numSpotMaps !== F || T.numLightProbes !== P) && (n.directional.length = m, n.spot.length = x, n.rectArea.length = f, n.point.length = _, n.hemi.length = h, n.directionalShadow.length = b, n.directionalShadowMap.length = b, n.pointShadow.length = E, n.pointShadowMap.length = E, n.spotShadow.length = y, n.spotShadowMap.length = y, n.directionalShadowMatrix.length = b, n.pointShadowMatrix.length = E, n.spotLightMatrix.length = y + F - R, n.spotLightMap.length = F, n.numSpotLightShadowsWithMaps = R, n.numLightProbes = P, T.directionalLength = m, T.pointLength = _, T.spotLength = x, T.rectAreaLength = f, T.hemiLength = h, T.numDirectionalShadows = b, T.numPointShadows = E, T.numSpotShadows = y, T.numSpotMaps = F, T.numLightProbes = P, n.version = ih++);
  }
  function l(c, u) {
    let p = 0, d = 0, m = 0, _ = 0, x = 0;
    const f = u.matrixWorldInverse;
    for (let h = 0, b = c.length; h < b; h++) {
      const E = c[h];
      if (E.isDirectionalLight) {
        const y = n.directional[p];
        y.direction.setFromMatrixPosition(E.matrixWorld), r.setFromMatrixPosition(E.target.matrixWorld), y.direction.sub(r), y.direction.transformDirection(f), p++;
      } else if (E.isSpotLight) {
        const y = n.spot[m];
        y.position.setFromMatrixPosition(E.matrixWorld), y.position.applyMatrix4(f), y.direction.setFromMatrixPosition(E.matrixWorld), r.setFromMatrixPosition(E.target.matrixWorld), y.direction.sub(r), y.direction.transformDirection(f), m++;
      } else if (E.isRectAreaLight) {
        const y = n.rectArea[_];
        y.position.setFromMatrixPosition(E.matrixWorld), y.position.applyMatrix4(f), a.identity(), s.copy(E.matrixWorld), s.premultiply(f), a.extractRotation(s), y.halfWidth.set(E.width * 0.5, 0, 0), y.halfHeight.set(0, E.height * 0.5, 0), y.halfWidth.applyMatrix4(a), y.halfHeight.applyMatrix4(a), _++;
      } else if (E.isPointLight) {
        const y = n.point[d];
        y.position.setFromMatrixPosition(E.matrixWorld), y.position.applyMatrix4(f), d++;
      } else if (E.isHemisphereLight) {
        const y = n.hemi[x];
        y.direction.setFromMatrixPosition(E.matrixWorld), y.direction.transformDirection(f), x++;
      }
    }
  }
  return {
    setup: o,
    setupView: l,
    state: n
  };
}
function Ts(i) {
  const e = new sh(i), t = [], n = [];
  function r(u) {
    c.camera = u, t.length = 0, n.length = 0;
  }
  function s(u) {
    t.push(u);
  }
  function a(u) {
    n.push(u);
  }
  function o() {
    e.setup(t);
  }
  function l(u) {
    e.setupView(t, u);
  }
  const c = {
    lightsArray: t,
    shadowsArray: n,
    camera: null,
    lights: e,
    transmissionRenderTarget: {}
  };
  return {
    init: r,
    state: c,
    setupLights: o,
    setupLightsView: l,
    pushLight: s,
    pushShadow: a
  };
}
function ah(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(r, s = 0) {
    const a = e.get(r);
    let o;
    return a === void 0 ? (o = new Ts(i), e.set(r, [o])) : s >= a.length ? (o = new Ts(i), a.push(o)) : o = a[s], o;
  }
  function n() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: n
  };
}
class oh extends Gn {
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class lh extends Gn {
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
const ch = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, uh = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function hh(i, e, t) {
  let n = new Ar();
  const r = new Oe(), s = new Oe(), a = new rt(), o = new oh({ depthPacking: 3201 }), l = new lh(), c = {}, u = t.maxTextureSize, p = { 0: 1, 1: 0, 2: 2 }, d = new nn({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new Oe() },
      radius: { value: 4 }
    },
    vertexShader: ch,
    fragmentShader: uh
  }), m = d.clone();
  m.defines.HORIZONTAL_PASS = 1;
  const _ = new Ot();
  _.setAttribute(
    "position",
    new Ft(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const x = new gt(_, d), f = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
  let h = this.type;
  this.render = function(R, P, T) {
    if (f.enabled === !1 || f.autoUpdate === !1 && f.needsUpdate === !1 || R.length === 0) return;
    const S = i.getRenderTarget(), v = i.getActiveCubeFace(), C = i.getActiveMipmapLevel(), G = i.state;
    G.setBlending(0), G.buffers.color.setClear(1, 1, 1, 1), G.buffers.depth.setTest(!0), G.setScissorTest(!1);
    const U = h !== 3 && this.type === 3, H = h === 3 && this.type !== 3;
    for (let q = 0, V = R.length; q < V; q++) {
      const j = R[q], k = j.shadow;
      if (k === void 0) {
        console.warn("THREE.WebGLShadowMap:", j, "has no shadow.");
        continue;
      }
      if (k.autoUpdate === !1 && k.needsUpdate === !1) continue;
      r.copy(k.mapSize);
      const se = k.getFrameExtents();
      if (r.multiply(se), s.copy(k.mapSize), (r.x > u || r.y > u) && (r.x > u && (s.x = Math.floor(u / se.x), r.x = s.x * se.x, k.mapSize.x = s.x), r.y > u && (s.y = Math.floor(u / se.y), r.y = s.y * se.y, k.mapSize.y = s.y)), k.map === null || U === !0 || H === !0) {
        const me = this.type !== 3 ? { minFilter: 1003, magFilter: 1003 } : {};
        k.map !== null && k.map.dispose(), k.map = new tn(r.x, r.y, me), k.map.texture.name = j.name + ".shadowMap", k.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(k.map), i.clear();
      const ue = k.getViewportCount();
      for (let me = 0; me < ue; me++) {
        const Fe = k.getViewport(me);
        a.set(
          s.x * Fe.x,
          s.y * Fe.y,
          s.x * Fe.z,
          s.y * Fe.w
        ), G.viewport(a), k.updateMatrices(j, me), n = k.getFrustum(), y(P, T, k.camera, j, this.type);
      }
      k.isPointLightShadow !== !0 && this.type === 3 && b(k, T), k.needsUpdate = !1;
    }
    h = this.type, f.needsUpdate = !1, i.setRenderTarget(S, v, C);
  };
  function b(R, P) {
    const T = e.update(x);
    d.defines.VSM_SAMPLES !== R.blurSamples && (d.defines.VSM_SAMPLES = R.blurSamples, m.defines.VSM_SAMPLES = R.blurSamples, d.needsUpdate = !0, m.needsUpdate = !0), R.mapPass === null && (R.mapPass = new tn(r.x, r.y)), d.uniforms.shadow_pass.value = R.map.texture, d.uniforms.resolution.value = R.mapSize, d.uniforms.radius.value = R.radius, i.setRenderTarget(R.mapPass), i.clear(), i.renderBufferDirect(P, null, T, d, x, null), m.uniforms.shadow_pass.value = R.mapPass.texture, m.uniforms.resolution.value = R.mapSize, m.uniforms.radius.value = R.radius, i.setRenderTarget(R.map), i.clear(), i.renderBufferDirect(P, null, T, m, x, null);
  }
  function E(R, P, T, S) {
    let v = null;
    const C = T.isPointLight === !0 ? R.customDistanceMaterial : R.customDepthMaterial;
    if (C !== void 0)
      v = C;
    else if (v = T.isPointLight === !0 ? l : o, i.localClippingEnabled && P.clipShadows === !0 && Array.isArray(P.clippingPlanes) && P.clippingPlanes.length !== 0 || P.displacementMap && P.displacementScale !== 0 || P.alphaMap && P.alphaTest > 0 || P.map && P.alphaTest > 0) {
      const G = v.uuid, U = P.uuid;
      let H = c[G];
      H === void 0 && (H = {}, c[G] = H);
      let q = H[U];
      q === void 0 && (q = v.clone(), H[U] = q, P.addEventListener("dispose", F)), v = q;
    }
    if (v.visible = P.visible, v.wireframe = P.wireframe, S === 3 ? v.side = P.shadowSide !== null ? P.shadowSide : P.side : v.side = P.shadowSide !== null ? P.shadowSide : p[P.side], v.alphaMap = P.alphaMap, v.alphaTest = P.alphaTest, v.map = P.map, v.clipShadows = P.clipShadows, v.clippingPlanes = P.clippingPlanes, v.clipIntersection = P.clipIntersection, v.displacementMap = P.displacementMap, v.displacementScale = P.displacementScale, v.displacementBias = P.displacementBias, v.wireframeLinewidth = P.wireframeLinewidth, v.linewidth = P.linewidth, T.isPointLight === !0 && v.isMeshDistanceMaterial === !0) {
      const G = i.properties.get(v);
      G.light = T;
    }
    return v;
  }
  function y(R, P, T, S, v) {
    if (R.visible === !1) return;
    if (R.layers.test(P.layers) && (R.isMesh || R.isLine || R.isPoints) && (R.castShadow || R.receiveShadow && v === 3) && (!R.frustumCulled || n.intersectsObject(R))) {
      R.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse, R.matrixWorld);
      const U = e.update(R), H = R.material;
      if (Array.isArray(H)) {
        const q = U.groups;
        for (let V = 0, j = q.length; V < j; V++) {
          const k = q[V], se = H[k.materialIndex];
          if (se && se.visible) {
            const ue = E(R, se, S, v);
            R.onBeforeShadow(i, R, P, T, U, ue, k), i.renderBufferDirect(T, null, U, ue, R, k), R.onAfterShadow(i, R, P, T, U, ue, k);
          }
        }
      } else if (H.visible) {
        const q = E(R, H, S, v);
        R.onBeforeShadow(i, R, P, T, U, q, null), i.renderBufferDirect(T, null, U, q, R, null), R.onAfterShadow(i, R, P, T, U, q, null);
      }
    }
    const G = R.children;
    for (let U = 0, H = G.length; U < H; U++)
      y(G[U], P, T, S, v);
  }
  function F(R) {
    R.target.removeEventListener("dispose", F);
    for (const T in c) {
      const S = c[T], v = R.target.uuid;
      v in S && (S[v].dispose(), delete S[v]);
    }
  }
}
function dh(i) {
  function e() {
    let L = !1;
    const ee = new rt();
    let X = null;
    const Y = new rt(0, 0, 0, 0);
    return {
      setMask: function(ne) {
        X !== ne && !L && (i.colorMask(ne, ne, ne, ne), X = ne);
      },
      setLocked: function(ne) {
        L = ne;
      },
      setClear: function(ne, Me, Be, tt, lt) {
        lt === !0 && (ne *= tt, Me *= tt, Be *= tt), ee.set(ne, Me, Be, tt), Y.equals(ee) === !1 && (i.clearColor(ne, Me, Be, tt), Y.copy(ee));
      },
      reset: function() {
        L = !1, X = null, Y.set(-1, 0, 0, 0);
      }
    };
  }
  function t() {
    let L = !1, ee = null, X = null, Y = null;
    return {
      setTest: function(ne) {
        ne ? pe(i.DEPTH_TEST) : le(i.DEPTH_TEST);
      },
      setMask: function(ne) {
        ee !== ne && !L && (i.depthMask(ne), ee = ne);
      },
      setFunc: function(ne) {
        if (X !== ne) {
          switch (ne) {
            case 0:
              i.depthFunc(i.NEVER);
              break;
            case 1:
              i.depthFunc(i.ALWAYS);
              break;
            case 2:
              i.depthFunc(i.LESS);
              break;
            case 3:
              i.depthFunc(i.LEQUAL);
              break;
            case 4:
              i.depthFunc(i.EQUAL);
              break;
            case 5:
              i.depthFunc(i.GEQUAL);
              break;
            case 6:
              i.depthFunc(i.GREATER);
              break;
            case 7:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          X = ne;
        }
      },
      setLocked: function(ne) {
        L = ne;
      },
      setClear: function(ne) {
        Y !== ne && (i.clearDepth(ne), Y = ne);
      },
      reset: function() {
        L = !1, ee = null, X = null, Y = null;
      }
    };
  }
  function n() {
    let L = !1, ee = null, X = null, Y = null, ne = null, Me = null, Be = null, tt = null, lt = null;
    return {
      setTest: function(Ge) {
        L || (Ge ? pe(i.STENCIL_TEST) : le(i.STENCIL_TEST));
      },
      setMask: function(Ge) {
        ee !== Ge && !L && (i.stencilMask(Ge), ee = Ge);
      },
      setFunc: function(Ge, Bt, Dt) {
        (X !== Ge || Y !== Bt || ne !== Dt) && (i.stencilFunc(Ge, Bt, Dt), X = Ge, Y = Bt, ne = Dt);
      },
      setOp: function(Ge, Bt, Dt) {
        (Me !== Ge || Be !== Bt || tt !== Dt) && (i.stencilOp(Ge, Bt, Dt), Me = Ge, Be = Bt, tt = Dt);
      },
      setLocked: function(Ge) {
        L = Ge;
      },
      setClear: function(Ge) {
        lt !== Ge && (i.clearStencil(Ge), lt = Ge);
      },
      reset: function() {
        L = !1, ee = null, X = null, Y = null, ne = null, Me = null, Be = null, tt = null, lt = null;
      }
    };
  }
  const r = new e(), s = new t(), a = new n(), o = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap();
  let c = {}, u = {}, p = /* @__PURE__ */ new WeakMap(), d = [], m = null, _ = !1, x = null, f = null, h = null, b = null, E = null, y = null, F = null, R = new Ie(0, 0, 0), P = 0, T = !1, S = null, v = null, C = null, G = null, U = null;
  const H = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let q = !1, V = 0;
  const j = i.getParameter(i.VERSION);
  j.indexOf("WebGL") !== -1 ? (V = parseFloat(/^WebGL (\d)/.exec(j)[1]), q = V >= 1) : j.indexOf("OpenGL ES") !== -1 && (V = parseFloat(/^OpenGL ES (\d)/.exec(j)[1]), q = V >= 2);
  let k = null, se = {};
  const ue = i.getParameter(i.SCISSOR_BOX), me = i.getParameter(i.VIEWPORT), Fe = new rt().fromArray(ue), Xe = new rt().fromArray(me);
  function W(L, ee, X, Y) {
    const ne = new Uint8Array(4), Me = i.createTexture();
    i.bindTexture(L, Me), i.texParameteri(L, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(L, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Be = 0; Be < X; Be++)
      L === i.TEXTURE_3D || L === i.TEXTURE_2D_ARRAY ? i.texImage3D(ee, 0, i.RGBA, 1, 1, Y, 0, i.RGBA, i.UNSIGNED_BYTE, ne) : i.texImage2D(ee + Be, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, ne);
    return Me;
  }
  const J = {};
  J[i.TEXTURE_2D] = W(i.TEXTURE_2D, i.TEXTURE_2D, 1), J[i.TEXTURE_CUBE_MAP] = W(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), J[i.TEXTURE_2D_ARRAY] = W(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), J[i.TEXTURE_3D] = W(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), r.setClear(0, 0, 0, 1), s.setClear(1), a.setClear(0), pe(i.DEPTH_TEST), s.setFunc(3), qe(!1), ve(1), pe(i.CULL_FACE), Qe(0);
  function pe(L) {
    c[L] !== !0 && (i.enable(L), c[L] = !0);
  }
  function le(L) {
    c[L] !== !1 && (i.disable(L), c[L] = !1);
  }
  function Ee(L, ee) {
    return u[L] !== ee ? (i.bindFramebuffer(L, ee), u[L] = ee, L === i.DRAW_FRAMEBUFFER && (u[i.FRAMEBUFFER] = ee), L === i.FRAMEBUFFER && (u[i.DRAW_FRAMEBUFFER] = ee), !0) : !1;
  }
  function Re(L, ee) {
    let X = d, Y = !1;
    if (L) {
      X = p.get(ee), X === void 0 && (X = [], p.set(ee, X));
      const ne = L.textures;
      if (X.length !== ne.length || X[0] !== i.COLOR_ATTACHMENT0) {
        for (let Me = 0, Be = ne.length; Me < Be; Me++)
          X[Me] = i.COLOR_ATTACHMENT0 + Me;
        X.length = ne.length, Y = !0;
      }
    } else
      X[0] !== i.BACK && (X[0] = i.BACK, Y = !0);
    Y && i.drawBuffers(X);
  }
  function Ue(L) {
    return m !== L ? (i.useProgram(L), m = L, !0) : !1;
  }
  const $e = {
    100: i.FUNC_ADD,
    101: i.FUNC_SUBTRACT,
    102: i.FUNC_REVERSE_SUBTRACT
  };
  $e[103] = i.MIN, $e[104] = i.MAX;
  const w = {
    200: i.ZERO,
    201: i.ONE,
    202: i.SRC_COLOR,
    204: i.SRC_ALPHA,
    210: i.SRC_ALPHA_SATURATE,
    208: i.DST_COLOR,
    206: i.DST_ALPHA,
    203: i.ONE_MINUS_SRC_COLOR,
    205: i.ONE_MINUS_SRC_ALPHA,
    209: i.ONE_MINUS_DST_COLOR,
    207: i.ONE_MINUS_DST_ALPHA,
    211: i.CONSTANT_COLOR,
    212: i.ONE_MINUS_CONSTANT_COLOR,
    213: i.CONSTANT_ALPHA,
    214: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function Qe(L, ee, X, Y, ne, Me, Be, tt, lt, Ge) {
    if (L === 0) {
      _ === !0 && (le(i.BLEND), _ = !1);
      return;
    }
    if (_ === !1 && (pe(i.BLEND), _ = !0), L !== 5) {
      if (L !== x || Ge !== T) {
        if ((f !== 100 || E !== 100) && (i.blendEquation(i.FUNC_ADD), f = 100, E = 100), Ge)
          switch (L) {
            case 1:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case 3:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case 4:
              i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", L);
              break;
          }
        else
          switch (L) {
            case 1:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              i.blendFunc(i.SRC_ALPHA, i.ONE);
              break;
            case 3:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case 4:
              i.blendFunc(i.ZERO, i.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", L);
              break;
          }
        h = null, b = null, y = null, F = null, R.set(0, 0, 0), P = 0, x = L, T = Ge;
      }
      return;
    }
    ne = ne || ee, Me = Me || X, Be = Be || Y, (ee !== f || ne !== E) && (i.blendEquationSeparate($e[ee], $e[ne]), f = ee, E = ne), (X !== h || Y !== b || Me !== y || Be !== F) && (i.blendFuncSeparate(w[X], w[Y], w[Me], w[Be]), h = X, b = Y, y = Me, F = Be), (tt.equals(R) === !1 || lt !== P) && (i.blendColor(tt.r, tt.g, tt.b, lt), R.copy(tt), P = lt), x = L, T = !1;
  }
  function We(L, ee) {
    L.side === 2 ? le(i.CULL_FACE) : pe(i.CULL_FACE);
    let X = L.side === 1;
    ee && (X = !X), qe(X), L.blending === 1 && L.transparent === !1 ? Qe(0) : Qe(L.blending, L.blendEquation, L.blendSrc, L.blendDst, L.blendEquationAlpha, L.blendSrcAlpha, L.blendDstAlpha, L.blendColor, L.blendAlpha, L.premultipliedAlpha), s.setFunc(L.depthFunc), s.setTest(L.depthTest), s.setMask(L.depthWrite), r.setMask(L.colorWrite);
    const Y = L.stencilWrite;
    a.setTest(Y), Y && (a.setMask(L.stencilWriteMask), a.setFunc(L.stencilFunc, L.stencilRef, L.stencilFuncMask), a.setOp(L.stencilFail, L.stencilZFail, L.stencilZPass)), Ae(L.polygonOffset, L.polygonOffsetFactor, L.polygonOffsetUnits), L.alphaToCoverage === !0 ? pe(i.SAMPLE_ALPHA_TO_COVERAGE) : le(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function qe(L) {
    S !== L && (L ? i.frontFace(i.CW) : i.frontFace(i.CCW), S = L);
  }
  function ve(L) {
    L !== 0 ? (pe(i.CULL_FACE), L !== v && (L === 1 ? i.cullFace(i.BACK) : L === 2 ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : le(i.CULL_FACE), v = L;
  }
  function et(L) {
    L !== C && (q && i.lineWidth(L), C = L);
  }
  function Ae(L, ee, X) {
    L ? (pe(i.POLYGON_OFFSET_FILL), (G !== ee || U !== X) && (i.polygonOffset(ee, X), G = ee, U = X)) : le(i.POLYGON_OFFSET_FILL);
  }
  function we(L) {
    L ? pe(i.SCISSOR_TEST) : le(i.SCISSOR_TEST);
  }
  function A(L) {
    L === void 0 && (L = i.TEXTURE0 + H - 1), k !== L && (i.activeTexture(L), k = L);
  }
  function g(L, ee, X) {
    X === void 0 && (k === null ? X = i.TEXTURE0 + H - 1 : X = k);
    let Y = se[X];
    Y === void 0 && (Y = { type: void 0, texture: void 0 }, se[X] = Y), (Y.type !== L || Y.texture !== ee) && (k !== X && (i.activeTexture(X), k = X), i.bindTexture(L, ee || J[L]), Y.type = L, Y.texture = ee);
  }
  function z() {
    const L = se[k];
    L !== void 0 && L.type !== void 0 && (i.bindTexture(L.type, null), L.type = void 0, L.texture = void 0);
  }
  function K() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function Z() {
    try {
      i.compressedTexImage3D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function $() {
    try {
      i.texSubImage2D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function xe() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function re() {
    try {
      i.compressedTexSubImage2D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function ce() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function Ce() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function Q() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function oe() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function Ne() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function Te(L) {
    Fe.equals(L) === !1 && (i.scissor(L.x, L.y, L.z, L.w), Fe.copy(L));
  }
  function he(L) {
    Xe.equals(L) === !1 && (i.viewport(L.x, L.y, L.z, L.w), Xe.copy(L));
  }
  function be(L, ee) {
    let X = l.get(ee);
    X === void 0 && (X = /* @__PURE__ */ new WeakMap(), l.set(ee, X));
    let Y = X.get(L);
    Y === void 0 && (Y = i.getUniformBlockIndex(ee, L.name), X.set(L, Y));
  }
  function De(L, ee) {
    const Y = l.get(ee).get(L);
    o.get(ee) !== Y && (i.uniformBlockBinding(ee, Y, L.__bindingPointIndex), o.set(ee, Y));
  }
  function Ke() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), c = {}, k = null, se = {}, u = {}, p = /* @__PURE__ */ new WeakMap(), d = [], m = null, _ = !1, x = null, f = null, h = null, b = null, E = null, y = null, F = null, R = new Ie(0, 0, 0), P = 0, T = !1, S = null, v = null, C = null, G = null, U = null, Fe.set(0, 0, i.canvas.width, i.canvas.height), Xe.set(0, 0, i.canvas.width, i.canvas.height), r.reset(), s.reset(), a.reset();
  }
  return {
    buffers: {
      color: r,
      depth: s,
      stencil: a
    },
    enable: pe,
    disable: le,
    bindFramebuffer: Ee,
    drawBuffers: Re,
    useProgram: Ue,
    setBlending: Qe,
    setMaterial: We,
    setFlipSided: qe,
    setCullFace: ve,
    setLineWidth: et,
    setPolygonOffset: Ae,
    setScissorTest: we,
    activeTexture: A,
    bindTexture: g,
    unbindTexture: z,
    compressedTexImage2D: K,
    compressedTexImage3D: Z,
    texImage2D: oe,
    texImage3D: Ne,
    updateUBOMapping: be,
    uniformBlockBinding: De,
    texStorage2D: Ce,
    texStorage3D: Q,
    texSubImage2D: $,
    texSubImage3D: xe,
    compressedTexSubImage2D: re,
    compressedTexSubImage3D: ce,
    scissor: Te,
    viewport: he,
    reset: Ke
  };
}
function As(i, e, t, n) {
  const r = fh(n);
  switch (t) {
    case 1021:
      return i * e;
    case 1024:
      return i * e;
    case 1025:
      return i * e * 2;
    case 1028:
      return i * e / r.components * r.byteLength;
    case 1029:
      return i * e / r.components * r.byteLength;
    case 1030:
      return i * e * 2 / r.components * r.byteLength;
    case 1031:
      return i * e * 2 / r.components * r.byteLength;
    case 1022:
      return i * e * 3 / r.components * r.byteLength;
    case 1023:
      return i * e * 4 / r.components * r.byteLength;
    case 1033:
      return i * e * 4 / r.components * r.byteLength;
    case 33776:
    case 33777:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case 33778:
    case 33779:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case 35841:
    case 35843:
      return Math.max(i, 16) * Math.max(e, 8) / 4;
    case 35840:
    case 35842:
      return Math.max(i, 8) * Math.max(e, 8) / 2;
    case 36196:
    case 37492:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case 37496:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case 37808:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case 37809:
      return Math.floor((i + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case 37810:
      return Math.floor((i + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case 37811:
      return Math.floor((i + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case 37812:
      return Math.floor((i + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case 37813:
      return Math.floor((i + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case 37814:
      return Math.floor((i + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case 37815:
      return Math.floor((i + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case 37816:
      return Math.floor((i + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case 37817:
      return Math.floor((i + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case 37818:
      return Math.floor((i + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case 37819:
      return Math.floor((i + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case 37820:
      return Math.floor((i + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case 37821:
      return Math.floor((i + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    case 36492:
    case 36494:
    case 36495:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
    case 36283:
    case 36284:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 8;
    case 36285:
    case 36286:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${t} format.`
  );
}
function fh(i) {
  switch (i) {
    case 1009:
    case 1010:
      return { byteLength: 1, components: 1 };
    case 1012:
    case 1011:
    case 1016:
      return { byteLength: 2, components: 1 };
    case 1017:
    case 1018:
      return { byteLength: 2, components: 4 };
    case 1014:
    case 1013:
    case 1015:
      return { byteLength: 4, components: 1 };
    case 35902:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${i}.`);
}
function ph(i, e, t, n, r, s, a) {
  const o = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), c = new Oe(), u = /* @__PURE__ */ new WeakMap();
  let p;
  const d = /* @__PURE__ */ new WeakMap();
  let m = !1;
  try {
    m = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function _(A, g) {
    return m ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(A, g)
    ) : Di("canvas");
  }
  function x(A, g, z) {
    let K = 1;
    const Z = we(A);
    if ((Z.width > z || Z.height > z) && (K = z / Math.max(Z.width, Z.height)), K < 1)
      if (typeof HTMLImageElement < "u" && A instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && A instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && A instanceof ImageBitmap || typeof VideoFrame < "u" && A instanceof VideoFrame) {
        const $ = Math.floor(K * Z.width), xe = Math.floor(K * Z.height);
        p === void 0 && (p = _($, xe));
        const re = g ? _($, xe) : p;
        return re.width = $, re.height = xe, re.getContext("2d").drawImage(A, 0, 0, $, xe), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + Z.width + "x" + Z.height + ") to (" + $ + "x" + xe + ")."), re;
      } else
        return "data" in A && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + Z.width + "x" + Z.height + ")."), A;
    return A;
  }
  function f(A) {
    return A.generateMipmaps && A.minFilter !== 1003 && A.minFilter !== 1006;
  }
  function h(A) {
    i.generateMipmap(A);
  }
  function b(A, g, z, K, Z = !1) {
    if (A !== null) {
      if (i[A] !== void 0) return i[A];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + A + "'");
    }
    let $ = g;
    if (g === i.RED && (z === i.FLOAT && ($ = i.R32F), z === i.HALF_FLOAT && ($ = i.R16F), z === i.UNSIGNED_BYTE && ($ = i.R8)), g === i.RED_INTEGER && (z === i.UNSIGNED_BYTE && ($ = i.R8UI), z === i.UNSIGNED_SHORT && ($ = i.R16UI), z === i.UNSIGNED_INT && ($ = i.R32UI), z === i.BYTE && ($ = i.R8I), z === i.SHORT && ($ = i.R16I), z === i.INT && ($ = i.R32I)), g === i.RG && (z === i.FLOAT && ($ = i.RG32F), z === i.HALF_FLOAT && ($ = i.RG16F), z === i.UNSIGNED_BYTE && ($ = i.RG8)), g === i.RG_INTEGER && (z === i.UNSIGNED_BYTE && ($ = i.RG8UI), z === i.UNSIGNED_SHORT && ($ = i.RG16UI), z === i.UNSIGNED_INT && ($ = i.RG32UI), z === i.BYTE && ($ = i.RG8I), z === i.SHORT && ($ = i.RG16I), z === i.INT && ($ = i.RG32I)), g === i.RGB && z === i.UNSIGNED_INT_5_9_9_9_REV && ($ = i.RGB9_E5), g === i.RGBA) {
      const xe = Z ? Ci : ke.getTransfer(K);
      z === i.FLOAT && ($ = i.RGBA32F), z === i.HALF_FLOAT && ($ = i.RGBA16F), z === i.UNSIGNED_BYTE && ($ = xe === Ye ? i.SRGB8_ALPHA8 : i.RGBA8), z === i.UNSIGNED_SHORT_4_4_4_4 && ($ = i.RGBA4), z === i.UNSIGNED_SHORT_5_5_5_1 && ($ = i.RGB5_A1);
    }
    return ($ === i.R16F || $ === i.R32F || $ === i.RG16F || $ === i.RG32F || $ === i.RGBA16F || $ === i.RGBA32F) && e.get("EXT_color_buffer_float"), $;
  }
  function E(A, g) {
    let z;
    return A ? g === null || g === 1014 || g === 1020 ? z = i.DEPTH24_STENCIL8 : g === 1015 ? z = i.DEPTH32F_STENCIL8 : g === 1012 && (z = i.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : g === null || g === 1014 || g === 1020 ? z = i.DEPTH_COMPONENT24 : g === 1015 ? z = i.DEPTH_COMPONENT32F : g === 1012 && (z = i.DEPTH_COMPONENT16), z;
  }
  function y(A, g) {
    return f(A) === !0 || A.isFramebufferTexture && A.minFilter !== 1003 && A.minFilter !== 1006 ? Math.log2(Math.max(g.width, g.height)) + 1 : A.mipmaps !== void 0 && A.mipmaps.length > 0 ? A.mipmaps.length : A.isCompressedTexture && Array.isArray(A.image) ? g.mipmaps.length : 1;
  }
  function F(A) {
    const g = A.target;
    g.removeEventListener("dispose", F), P(g), g.isVideoTexture && u.delete(g);
  }
  function R(A) {
    const g = A.target;
    g.removeEventListener("dispose", R), S(g);
  }
  function P(A) {
    const g = n.get(A);
    if (g.__webglInit === void 0) return;
    const z = A.source, K = d.get(z);
    if (K) {
      const Z = K[g.__cacheKey];
      Z.usedTimes--, Z.usedTimes === 0 && T(A), Object.keys(K).length === 0 && d.delete(z);
    }
    n.remove(A);
  }
  function T(A) {
    const g = n.get(A);
    i.deleteTexture(g.__webglTexture);
    const z = A.source, K = d.get(z);
    delete K[g.__cacheKey], a.memory.textures--;
  }
  function S(A) {
    const g = n.get(A);
    if (A.depthTexture && A.depthTexture.dispose(), A.isWebGLCubeRenderTarget)
      for (let K = 0; K < 6; K++) {
        if (Array.isArray(g.__webglFramebuffer[K]))
          for (let Z = 0; Z < g.__webglFramebuffer[K].length; Z++) i.deleteFramebuffer(g.__webglFramebuffer[K][Z]);
        else
          i.deleteFramebuffer(g.__webglFramebuffer[K]);
        g.__webglDepthbuffer && i.deleteRenderbuffer(g.__webglDepthbuffer[K]);
      }
    else {
      if (Array.isArray(g.__webglFramebuffer))
        for (let K = 0; K < g.__webglFramebuffer.length; K++) i.deleteFramebuffer(g.__webglFramebuffer[K]);
      else
        i.deleteFramebuffer(g.__webglFramebuffer);
      if (g.__webglDepthbuffer && i.deleteRenderbuffer(g.__webglDepthbuffer), g.__webglMultisampledFramebuffer && i.deleteFramebuffer(g.__webglMultisampledFramebuffer), g.__webglColorRenderbuffer)
        for (let K = 0; K < g.__webglColorRenderbuffer.length; K++)
          g.__webglColorRenderbuffer[K] && i.deleteRenderbuffer(g.__webglColorRenderbuffer[K]);
      g.__webglDepthRenderbuffer && i.deleteRenderbuffer(g.__webglDepthRenderbuffer);
    }
    const z = A.textures;
    for (let K = 0, Z = z.length; K < Z; K++) {
      const $ = n.get(z[K]);
      $.__webglTexture && (i.deleteTexture($.__webglTexture), a.memory.textures--), n.remove(z[K]);
    }
    n.remove(A);
  }
  let v = 0;
  function C() {
    v = 0;
  }
  function G() {
    const A = v;
    return A >= r.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + A + " texture units while this GPU supports only " + r.maxTextures), v += 1, A;
  }
  function U(A) {
    const g = [];
    return g.push(A.wrapS), g.push(A.wrapT), g.push(A.wrapR || 0), g.push(A.magFilter), g.push(A.minFilter), g.push(A.anisotropy), g.push(A.internalFormat), g.push(A.format), g.push(A.type), g.push(A.generateMipmaps), g.push(A.premultiplyAlpha), g.push(A.flipY), g.push(A.unpackAlignment), g.push(A.colorSpace), g.join();
  }
  function H(A, g) {
    const z = n.get(A);
    if (A.isVideoTexture && et(A), A.isRenderTargetTexture === !1 && A.version > 0 && z.__version !== A.version) {
      const K = A.image;
      if (K === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (K.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        Xe(z, A, g);
        return;
      }
    }
    t.bindTexture(i.TEXTURE_2D, z.__webglTexture, i.TEXTURE0 + g);
  }
  function q(A, g) {
    const z = n.get(A);
    if (A.version > 0 && z.__version !== A.version) {
      Xe(z, A, g);
      return;
    }
    t.bindTexture(i.TEXTURE_2D_ARRAY, z.__webglTexture, i.TEXTURE0 + g);
  }
  function V(A, g) {
    const z = n.get(A);
    if (A.version > 0 && z.__version !== A.version) {
      Xe(z, A, g);
      return;
    }
    t.bindTexture(i.TEXTURE_3D, z.__webglTexture, i.TEXTURE0 + g);
  }
  function j(A, g) {
    const z = n.get(A);
    if (A.version > 0 && z.__version !== A.version) {
      W(z, A, g);
      return;
    }
    t.bindTexture(i.TEXTURE_CUBE_MAP, z.__webglTexture, i.TEXTURE0 + g);
  }
  const k = {
    1e3: i.REPEAT,
    1001: i.CLAMP_TO_EDGE,
    1002: i.MIRRORED_REPEAT
  }, se = {
    1003: i.NEAREST,
    1004: i.NEAREST_MIPMAP_NEAREST,
    1005: i.NEAREST_MIPMAP_LINEAR,
    1006: i.LINEAR,
    1007: i.LINEAR_MIPMAP_NEAREST,
    1008: i.LINEAR_MIPMAP_LINEAR
  }, ue = {
    512: i.NEVER,
    519: i.ALWAYS,
    513: i.LESS,
    515: i.LEQUAL,
    514: i.EQUAL,
    518: i.GEQUAL,
    516: i.GREATER,
    517: i.NOTEQUAL
  };
  function me(A, g) {
    if (g.type === 1015 && e.has("OES_texture_float_linear") === !1 && (g.magFilter === 1006 || g.magFilter === 1007 || g.magFilter === 1005 || g.magFilter === 1008 || g.minFilter === 1006 || g.minFilter === 1007 || g.minFilter === 1005 || g.minFilter === 1008) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(A, i.TEXTURE_WRAP_S, k[g.wrapS]), i.texParameteri(A, i.TEXTURE_WRAP_T, k[g.wrapT]), (A === i.TEXTURE_3D || A === i.TEXTURE_2D_ARRAY) && i.texParameteri(A, i.TEXTURE_WRAP_R, k[g.wrapR]), i.texParameteri(A, i.TEXTURE_MAG_FILTER, se[g.magFilter]), i.texParameteri(A, i.TEXTURE_MIN_FILTER, se[g.minFilter]), g.compareFunction && (i.texParameteri(A, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(A, i.TEXTURE_COMPARE_FUNC, ue[g.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      if (g.magFilter === 1003 || g.minFilter !== 1005 && g.minFilter !== 1008 || g.type === 1015 && e.has("OES_texture_float_linear") === !1) return;
      if (g.anisotropy > 1 || n.get(g).__currentAnisotropy) {
        const z = e.get("EXT_texture_filter_anisotropic");
        i.texParameterf(A, z.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(g.anisotropy, r.getMaxAnisotropy())), n.get(g).__currentAnisotropy = g.anisotropy;
      }
    }
  }
  function Fe(A, g) {
    let z = !1;
    A.__webglInit === void 0 && (A.__webglInit = !0, g.addEventListener("dispose", F));
    const K = g.source;
    let Z = d.get(K);
    Z === void 0 && (Z = {}, d.set(K, Z));
    const $ = U(g);
    if ($ !== A.__cacheKey) {
      Z[$] === void 0 && (Z[$] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, a.memory.textures++, z = !0), Z[$].usedTimes++;
      const xe = Z[A.__cacheKey];
      xe !== void 0 && (Z[A.__cacheKey].usedTimes--, xe.usedTimes === 0 && T(g)), A.__cacheKey = $, A.__webglTexture = Z[$].texture;
    }
    return z;
  }
  function Xe(A, g, z) {
    let K = i.TEXTURE_2D;
    (g.isDataArrayTexture || g.isCompressedArrayTexture) && (K = i.TEXTURE_2D_ARRAY), g.isData3DTexture && (K = i.TEXTURE_3D);
    const Z = Fe(A, g), $ = g.source;
    t.bindTexture(K, A.__webglTexture, i.TEXTURE0 + z);
    const xe = n.get($);
    if ($.version !== xe.__version || Z === !0) {
      t.activeTexture(i.TEXTURE0 + z);
      const re = ke.getPrimaries(ke.workingColorSpace), ce = g.colorSpace === en ? null : ke.getPrimaries(g.colorSpace), Ce = g.colorSpace === en || re === ce ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, g.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, g.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, g.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Ce);
      let Q = x(g.image, !1, r.maxTextureSize);
      Q = Ae(g, Q);
      const oe = s.convert(g.format, g.colorSpace), Ne = s.convert(g.type);
      let Te = b(g.internalFormat, oe, Ne, g.colorSpace, g.isVideoTexture);
      me(K, g);
      let he;
      const be = g.mipmaps, De = g.isVideoTexture !== !0, Ke = xe.__version === void 0 || Z === !0, L = $.dataReady, ee = y(g, Q);
      if (g.isDepthTexture)
        Te = E(g.format === 1027, g.type), Ke && (De ? t.texStorage2D(i.TEXTURE_2D, 1, Te, Q.width, Q.height) : t.texImage2D(i.TEXTURE_2D, 0, Te, Q.width, Q.height, 0, oe, Ne, null));
      else if (g.isDataTexture)
        if (be.length > 0) {
          De && Ke && t.texStorage2D(i.TEXTURE_2D, ee, Te, be[0].width, be[0].height);
          for (let X = 0, Y = be.length; X < Y; X++)
            he = be[X], De ? L && t.texSubImage2D(i.TEXTURE_2D, X, 0, 0, he.width, he.height, oe, Ne, he.data) : t.texImage2D(i.TEXTURE_2D, X, Te, he.width, he.height, 0, oe, Ne, he.data);
          g.generateMipmaps = !1;
        } else
          De ? (Ke && t.texStorage2D(i.TEXTURE_2D, ee, Te, Q.width, Q.height), L && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, Q.width, Q.height, oe, Ne, Q.data)) : t.texImage2D(i.TEXTURE_2D, 0, Te, Q.width, Q.height, 0, oe, Ne, Q.data);
      else if (g.isCompressedTexture)
        if (g.isCompressedArrayTexture) {
          De && Ke && t.texStorage3D(i.TEXTURE_2D_ARRAY, ee, Te, be[0].width, be[0].height, Q.depth);
          for (let X = 0, Y = be.length; X < Y; X++)
            if (he = be[X], g.format !== 1023)
              if (oe !== null)
                if (De) {
                  if (L)
                    if (g.layerUpdates.size > 0) {
                      const ne = As(he.width, he.height, g.format, g.type);
                      for (const Me of g.layerUpdates) {
                        const Be = he.data.subarray(
                          Me * ne / he.data.BYTES_PER_ELEMENT,
                          (Me + 1) * ne / he.data.BYTES_PER_ELEMENT
                        );
                        t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, X, 0, 0, Me, he.width, he.height, 1, oe, Be, 0, 0);
                      }
                      g.clearLayerUpdates();
                    } else
                      t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, X, 0, 0, 0, he.width, he.height, Q.depth, oe, he.data, 0, 0);
                } else
                  t.compressedTexImage3D(i.TEXTURE_2D_ARRAY, X, Te, he.width, he.height, Q.depth, 0, he.data, 0, 0);
              else
                console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              De ? L && t.texSubImage3D(i.TEXTURE_2D_ARRAY, X, 0, 0, 0, he.width, he.height, Q.depth, oe, Ne, he.data) : t.texImage3D(i.TEXTURE_2D_ARRAY, X, Te, he.width, he.height, Q.depth, 0, oe, Ne, he.data);
        } else {
          De && Ke && t.texStorage2D(i.TEXTURE_2D, ee, Te, be[0].width, be[0].height);
          for (let X = 0, Y = be.length; X < Y; X++)
            he = be[X], g.format !== 1023 ? oe !== null ? De ? L && t.compressedTexSubImage2D(i.TEXTURE_2D, X, 0, 0, he.width, he.height, oe, he.data) : t.compressedTexImage2D(i.TEXTURE_2D, X, Te, he.width, he.height, 0, he.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : De ? L && t.texSubImage2D(i.TEXTURE_2D, X, 0, 0, he.width, he.height, oe, Ne, he.data) : t.texImage2D(i.TEXTURE_2D, X, Te, he.width, he.height, 0, oe, Ne, he.data);
        }
      else if (g.isDataArrayTexture)
        if (De) {
          if (Ke && t.texStorage3D(i.TEXTURE_2D_ARRAY, ee, Te, Q.width, Q.height, Q.depth), L)
            if (g.layerUpdates.size > 0) {
              const X = As(Q.width, Q.height, g.format, g.type);
              for (const Y of g.layerUpdates) {
                const ne = Q.data.subarray(
                  Y * X / Q.data.BYTES_PER_ELEMENT,
                  (Y + 1) * X / Q.data.BYTES_PER_ELEMENT
                );
                t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, Y, Q.width, Q.height, 1, oe, Ne, ne);
              }
              g.clearLayerUpdates();
            } else
              t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, Q.width, Q.height, Q.depth, oe, Ne, Q.data);
        } else
          t.texImage3D(i.TEXTURE_2D_ARRAY, 0, Te, Q.width, Q.height, Q.depth, 0, oe, Ne, Q.data);
      else if (g.isData3DTexture)
        De ? (Ke && t.texStorage3D(i.TEXTURE_3D, ee, Te, Q.width, Q.height, Q.depth), L && t.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, Q.width, Q.height, Q.depth, oe, Ne, Q.data)) : t.texImage3D(i.TEXTURE_3D, 0, Te, Q.width, Q.height, Q.depth, 0, oe, Ne, Q.data);
      else if (g.isFramebufferTexture) {
        if (Ke)
          if (De)
            t.texStorage2D(i.TEXTURE_2D, ee, Te, Q.width, Q.height);
          else {
            let X = Q.width, Y = Q.height;
            for (let ne = 0; ne < ee; ne++)
              t.texImage2D(i.TEXTURE_2D, ne, Te, X, Y, 0, oe, Ne, null), X >>= 1, Y >>= 1;
          }
      } else if (be.length > 0) {
        if (De && Ke) {
          const X = we(be[0]);
          t.texStorage2D(i.TEXTURE_2D, ee, Te, X.width, X.height);
        }
        for (let X = 0, Y = be.length; X < Y; X++)
          he = be[X], De ? L && t.texSubImage2D(i.TEXTURE_2D, X, 0, 0, oe, Ne, he) : t.texImage2D(i.TEXTURE_2D, X, Te, oe, Ne, he);
        g.generateMipmaps = !1;
      } else if (De) {
        if (Ke) {
          const X = we(Q);
          t.texStorage2D(i.TEXTURE_2D, ee, Te, X.width, X.height);
        }
        L && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, oe, Ne, Q);
      } else
        t.texImage2D(i.TEXTURE_2D, 0, Te, oe, Ne, Q);
      f(g) && h(K), xe.__version = $.version, g.onUpdate && g.onUpdate(g);
    }
    A.__version = g.version;
  }
  function W(A, g, z) {
    if (g.image.length !== 6) return;
    const K = Fe(A, g), Z = g.source;
    t.bindTexture(i.TEXTURE_CUBE_MAP, A.__webglTexture, i.TEXTURE0 + z);
    const $ = n.get(Z);
    if (Z.version !== $.__version || K === !0) {
      t.activeTexture(i.TEXTURE0 + z);
      const xe = ke.getPrimaries(ke.workingColorSpace), re = g.colorSpace === en ? null : ke.getPrimaries(g.colorSpace), ce = g.colorSpace === en || xe === re ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, g.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, g.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, g.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, ce);
      const Ce = g.isCompressedTexture || g.image[0].isCompressedTexture, Q = g.image[0] && g.image[0].isDataTexture, oe = [];
      for (let Y = 0; Y < 6; Y++)
        !Ce && !Q ? oe[Y] = x(g.image[Y], !0, r.maxCubemapSize) : oe[Y] = Q ? g.image[Y].image : g.image[Y], oe[Y] = Ae(g, oe[Y]);
      const Ne = oe[0], Te = s.convert(g.format, g.colorSpace), he = s.convert(g.type), be = b(g.internalFormat, Te, he, g.colorSpace), De = g.isVideoTexture !== !0, Ke = $.__version === void 0 || K === !0, L = Z.dataReady;
      let ee = y(g, Ne);
      me(i.TEXTURE_CUBE_MAP, g);
      let X;
      if (Ce) {
        De && Ke && t.texStorage2D(i.TEXTURE_CUBE_MAP, ee, be, Ne.width, Ne.height);
        for (let Y = 0; Y < 6; Y++) {
          X = oe[Y].mipmaps;
          for (let ne = 0; ne < X.length; ne++) {
            const Me = X[ne];
            g.format !== 1023 ? Te !== null ? De ? L && t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ne, 0, 0, Me.width, Me.height, Te, Me.data) : t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ne, be, Me.width, Me.height, 0, Me.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : De ? L && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ne, 0, 0, Me.width, Me.height, Te, he, Me.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ne, be, Me.width, Me.height, 0, Te, he, Me.data);
          }
        }
      } else {
        if (X = g.mipmaps, De && Ke) {
          X.length > 0 && ee++;
          const Y = we(oe[0]);
          t.texStorage2D(i.TEXTURE_CUBE_MAP, ee, be, Y.width, Y.height);
        }
        for (let Y = 0; Y < 6; Y++)
          if (Q) {
            De ? L && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, 0, 0, 0, oe[Y].width, oe[Y].height, Te, he, oe[Y].data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, 0, be, oe[Y].width, oe[Y].height, 0, Te, he, oe[Y].data);
            for (let ne = 0; ne < X.length; ne++) {
              const Be = X[ne].image[Y].image;
              De ? L && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ne + 1, 0, 0, Be.width, Be.height, Te, he, Be.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ne + 1, be, Be.width, Be.height, 0, Te, he, Be.data);
            }
          } else {
            De ? L && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, 0, 0, 0, Te, he, oe[Y]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, 0, be, Te, he, oe[Y]);
            for (let ne = 0; ne < X.length; ne++) {
              const Me = X[ne];
              De ? L && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ne + 1, 0, 0, Te, he, Me.image[Y]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ne + 1, be, Te, he, Me.image[Y]);
            }
          }
      }
      f(g) && h(i.TEXTURE_CUBE_MAP), $.__version = Z.version, g.onUpdate && g.onUpdate(g);
    }
    A.__version = g.version;
  }
  function J(A, g, z, K, Z, $) {
    const xe = s.convert(z.format, z.colorSpace), re = s.convert(z.type), ce = b(z.internalFormat, xe, re, z.colorSpace);
    if (!n.get(g).__hasExternalTextures) {
      const Q = Math.max(1, g.width >> $), oe = Math.max(1, g.height >> $);
      Z === i.TEXTURE_3D || Z === i.TEXTURE_2D_ARRAY ? t.texImage3D(Z, $, ce, Q, oe, g.depth, 0, xe, re, null) : t.texImage2D(Z, $, ce, Q, oe, 0, xe, re, null);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, A), ve(g) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, K, Z, n.get(z).__webglTexture, 0, qe(g)) : (Z === i.TEXTURE_2D || Z >= i.TEXTURE_CUBE_MAP_POSITIVE_X && Z <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, K, Z, n.get(z).__webglTexture, $), t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function pe(A, g, z) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, A), g.depthBuffer) {
      const K = g.depthTexture, Z = K && K.isDepthTexture ? K.type : null, $ = E(g.stencilBuffer, Z), xe = g.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, re = qe(g);
      ve(g) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, re, $, g.width, g.height) : z ? i.renderbufferStorageMultisample(i.RENDERBUFFER, re, $, g.width, g.height) : i.renderbufferStorage(i.RENDERBUFFER, $, g.width, g.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, xe, i.RENDERBUFFER, A);
    } else {
      const K = g.textures;
      for (let Z = 0; Z < K.length; Z++) {
        const $ = K[Z], xe = s.convert($.format, $.colorSpace), re = s.convert($.type), ce = b($.internalFormat, xe, re, $.colorSpace), Ce = qe(g);
        z && ve(g) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Ce, ce, g.width, g.height) : ve(g) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Ce, ce, g.width, g.height) : i.renderbufferStorage(i.RENDERBUFFER, ce, g.width, g.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function le(A, g) {
    if (g && g.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (t.bindFramebuffer(i.FRAMEBUFFER, A), !(g.depthTexture && g.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    (!n.get(g.depthTexture).__webglTexture || g.depthTexture.image.width !== g.width || g.depthTexture.image.height !== g.height) && (g.depthTexture.image.width = g.width, g.depthTexture.image.height = g.height, g.depthTexture.needsUpdate = !0), H(g.depthTexture, 0);
    const K = n.get(g.depthTexture).__webglTexture, Z = qe(g);
    if (g.depthTexture.format === 1026)
      ve(g) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, K, 0, Z) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, K, 0);
    else if (g.depthTexture.format === 1027)
      ve(g) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, K, 0, Z) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, K, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function Ee(A) {
    const g = n.get(A), z = A.isWebGLCubeRenderTarget === !0;
    if (g.__boundDepthTexture !== A.depthTexture) {
      const K = A.depthTexture;
      if (g.__depthDisposeCallback && g.__depthDisposeCallback(), K) {
        const Z = () => {
          delete g.__boundDepthTexture, delete g.__depthDisposeCallback, K.removeEventListener("dispose", Z);
        };
        K.addEventListener("dispose", Z), g.__depthDisposeCallback = Z;
      }
      g.__boundDepthTexture = K;
    }
    if (A.depthTexture && !g.__autoAllocateDepthBuffer) {
      if (z) throw new Error("target.depthTexture not supported in Cube render targets");
      le(g.__webglFramebuffer, A);
    } else if (z) {
      g.__webglDepthbuffer = [];
      for (let K = 0; K < 6; K++)
        if (t.bindFramebuffer(i.FRAMEBUFFER, g.__webglFramebuffer[K]), g.__webglDepthbuffer[K] === void 0)
          g.__webglDepthbuffer[K] = i.createRenderbuffer(), pe(g.__webglDepthbuffer[K], A, !1);
        else {
          const Z = A.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, $ = g.__webglDepthbuffer[K];
          i.bindRenderbuffer(i.RENDERBUFFER, $), i.framebufferRenderbuffer(i.FRAMEBUFFER, Z, i.RENDERBUFFER, $);
        }
    } else if (t.bindFramebuffer(i.FRAMEBUFFER, g.__webglFramebuffer), g.__webglDepthbuffer === void 0)
      g.__webglDepthbuffer = i.createRenderbuffer(), pe(g.__webglDepthbuffer, A, !1);
    else {
      const K = A.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, Z = g.__webglDepthbuffer;
      i.bindRenderbuffer(i.RENDERBUFFER, Z), i.framebufferRenderbuffer(i.FRAMEBUFFER, K, i.RENDERBUFFER, Z);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Re(A, g, z) {
    const K = n.get(A);
    g !== void 0 && J(K.__webglFramebuffer, A, A.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), z !== void 0 && Ee(A);
  }
  function Ue(A) {
    const g = A.texture, z = n.get(A), K = n.get(g);
    A.addEventListener("dispose", R);
    const Z = A.textures, $ = A.isWebGLCubeRenderTarget === !0, xe = Z.length > 1;
    if (xe || (K.__webglTexture === void 0 && (K.__webglTexture = i.createTexture()), K.__version = g.version, a.memory.textures++), $) {
      z.__webglFramebuffer = [];
      for (let re = 0; re < 6; re++)
        if (g.mipmaps && g.mipmaps.length > 0) {
          z.__webglFramebuffer[re] = [];
          for (let ce = 0; ce < g.mipmaps.length; ce++)
            z.__webglFramebuffer[re][ce] = i.createFramebuffer();
        } else
          z.__webglFramebuffer[re] = i.createFramebuffer();
    } else {
      if (g.mipmaps && g.mipmaps.length > 0) {
        z.__webglFramebuffer = [];
        for (let re = 0; re < g.mipmaps.length; re++)
          z.__webglFramebuffer[re] = i.createFramebuffer();
      } else
        z.__webglFramebuffer = i.createFramebuffer();
      if (xe)
        for (let re = 0, ce = Z.length; re < ce; re++) {
          const Ce = n.get(Z[re]);
          Ce.__webglTexture === void 0 && (Ce.__webglTexture = i.createTexture(), a.memory.textures++);
        }
      if (A.samples > 0 && ve(A) === !1) {
        z.__webglMultisampledFramebuffer = i.createFramebuffer(), z.__webglColorRenderbuffer = [], t.bindFramebuffer(i.FRAMEBUFFER, z.__webglMultisampledFramebuffer);
        for (let re = 0; re < Z.length; re++) {
          const ce = Z[re];
          z.__webglColorRenderbuffer[re] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, z.__webglColorRenderbuffer[re]);
          const Ce = s.convert(ce.format, ce.colorSpace), Q = s.convert(ce.type), oe = b(ce.internalFormat, Ce, Q, ce.colorSpace, A.isXRRenderTarget === !0), Ne = qe(A);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, Ne, oe, A.width, A.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + re, i.RENDERBUFFER, z.__webglColorRenderbuffer[re]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), A.depthBuffer && (z.__webglDepthRenderbuffer = i.createRenderbuffer(), pe(z.__webglDepthRenderbuffer, A, !0)), t.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if ($) {
      t.bindTexture(i.TEXTURE_CUBE_MAP, K.__webglTexture), me(i.TEXTURE_CUBE_MAP, g);
      for (let re = 0; re < 6; re++)
        if (g.mipmaps && g.mipmaps.length > 0)
          for (let ce = 0; ce < g.mipmaps.length; ce++)
            J(z.__webglFramebuffer[re][ce], A, g, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + re, ce);
        else
          J(z.__webglFramebuffer[re], A, g, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + re, 0);
      f(g) && h(i.TEXTURE_CUBE_MAP), t.unbindTexture();
    } else if (xe) {
      for (let re = 0, ce = Z.length; re < ce; re++) {
        const Ce = Z[re], Q = n.get(Ce);
        t.bindTexture(i.TEXTURE_2D, Q.__webglTexture), me(i.TEXTURE_2D, Ce), J(z.__webglFramebuffer, A, Ce, i.COLOR_ATTACHMENT0 + re, i.TEXTURE_2D, 0), f(Ce) && h(i.TEXTURE_2D);
      }
      t.unbindTexture();
    } else {
      let re = i.TEXTURE_2D;
      if ((A.isWebGL3DRenderTarget || A.isWebGLArrayRenderTarget) && (re = A.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), t.bindTexture(re, K.__webglTexture), me(re, g), g.mipmaps && g.mipmaps.length > 0)
        for (let ce = 0; ce < g.mipmaps.length; ce++)
          J(z.__webglFramebuffer[ce], A, g, i.COLOR_ATTACHMENT0, re, ce);
      else
        J(z.__webglFramebuffer, A, g, i.COLOR_ATTACHMENT0, re, 0);
      f(g) && h(re), t.unbindTexture();
    }
    A.depthBuffer && Ee(A);
  }
  function $e(A) {
    const g = A.textures;
    for (let z = 0, K = g.length; z < K; z++) {
      const Z = g[z];
      if (f(Z)) {
        const $ = A.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : i.TEXTURE_2D, xe = n.get(Z).__webglTexture;
        t.bindTexture($, xe), h($), t.unbindTexture();
      }
    }
  }
  const w = [], Qe = [];
  function We(A) {
    if (A.samples > 0) {
      if (ve(A) === !1) {
        const g = A.textures, z = A.width, K = A.height;
        let Z = i.COLOR_BUFFER_BIT;
        const $ = A.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, xe = n.get(A), re = g.length > 1;
        if (re)
          for (let ce = 0; ce < g.length; ce++)
            t.bindFramebuffer(i.FRAMEBUFFER, xe.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ce, i.RENDERBUFFER, null), t.bindFramebuffer(i.FRAMEBUFFER, xe.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ce, i.TEXTURE_2D, null, 0);
        t.bindFramebuffer(i.READ_FRAMEBUFFER, xe.__webglMultisampledFramebuffer), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, xe.__webglFramebuffer);
        for (let ce = 0; ce < g.length; ce++) {
          if (A.resolveDepthBuffer && (A.depthBuffer && (Z |= i.DEPTH_BUFFER_BIT), A.stencilBuffer && A.resolveStencilBuffer && (Z |= i.STENCIL_BUFFER_BIT)), re) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, xe.__webglColorRenderbuffer[ce]);
            const Ce = n.get(g[ce]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, Ce, 0);
          }
          i.blitFramebuffer(0, 0, z, K, 0, 0, z, K, Z, i.NEAREST), l === !0 && (w.length = 0, Qe.length = 0, w.push(i.COLOR_ATTACHMENT0 + ce), A.depthBuffer && A.resolveDepthBuffer === !1 && (w.push($), Qe.push($), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, Qe)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, w));
        }
        if (t.bindFramebuffer(i.READ_FRAMEBUFFER, null), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), re)
          for (let ce = 0; ce < g.length; ce++) {
            t.bindFramebuffer(i.FRAMEBUFFER, xe.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ce, i.RENDERBUFFER, xe.__webglColorRenderbuffer[ce]);
            const Ce = n.get(g[ce]).__webglTexture;
            t.bindFramebuffer(i.FRAMEBUFFER, xe.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ce, i.TEXTURE_2D, Ce, 0);
          }
        t.bindFramebuffer(i.DRAW_FRAMEBUFFER, xe.__webglMultisampledFramebuffer);
      } else if (A.depthBuffer && A.resolveDepthBuffer === !1 && l) {
        const g = A.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [g]);
      }
    }
  }
  function qe(A) {
    return Math.min(r.maxSamples, A.samples);
  }
  function ve(A) {
    const g = n.get(A);
    return A.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && g.__useRenderToTexture !== !1;
  }
  function et(A) {
    const g = a.render.frame;
    u.get(A) !== g && (u.set(A, g), A.update());
  }
  function Ae(A, g) {
    const z = A.colorSpace, K = A.format, Z = A.type;
    return A.isCompressedTexture === !0 || A.isVideoTexture === !0 || z !== rn && z !== en && (ke.getTransfer(z) === Ye ? (K !== 1023 || Z !== 1009) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", z)), g;
  }
  function we(A) {
    return typeof HTMLImageElement < "u" && A instanceof HTMLImageElement ? (c.width = A.naturalWidth || A.width, c.height = A.naturalHeight || A.height) : typeof VideoFrame < "u" && A instanceof VideoFrame ? (c.width = A.displayWidth, c.height = A.displayHeight) : (c.width = A.width, c.height = A.height), c;
  }
  this.allocateTextureUnit = G, this.resetTextureUnits = C, this.setTexture2D = H, this.setTexture2DArray = q, this.setTexture3D = V, this.setTextureCube = j, this.rebindTextures = Re, this.setupRenderTarget = Ue, this.updateRenderTargetMipmap = $e, this.updateMultisampleRenderTarget = We, this.setupDepthRenderbuffer = Ee, this.setupFrameBufferTexture = J, this.useMultisampledRTT = ve;
}
function mh(i, e) {
  function t(n, r = en) {
    let s;
    const a = ke.getTransfer(r);
    if (n === 1009) return i.UNSIGNED_BYTE;
    if (n === 1017) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === 1018) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === 35902) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === 1010) return i.BYTE;
    if (n === 1011) return i.SHORT;
    if (n === 1012) return i.UNSIGNED_SHORT;
    if (n === 1013) return i.INT;
    if (n === 1014) return i.UNSIGNED_INT;
    if (n === 1015) return i.FLOAT;
    if (n === 1016) return i.HALF_FLOAT;
    if (n === 1021) return i.ALPHA;
    if (n === 1022) return i.RGB;
    if (n === 1023) return i.RGBA;
    if (n === 1024) return i.LUMINANCE;
    if (n === 1025) return i.LUMINANCE_ALPHA;
    if (n === 1026) return i.DEPTH_COMPONENT;
    if (n === 1027) return i.DEPTH_STENCIL;
    if (n === 1028) return i.RED;
    if (n === 1029) return i.RED_INTEGER;
    if (n === 1030) return i.RG;
    if (n === 1031) return i.RG_INTEGER;
    if (n === 1033) return i.RGBA_INTEGER;
    if (n === 33776 || n === 33777 || n === 33778 || n === 33779)
      if (a === Ye)
        if (s = e.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
          if (n === 33776) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === 33777) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === 33778) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === 33779) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (s = e.get("WEBGL_compressed_texture_s3tc"), s !== null) {
        if (n === 33776) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === 33777) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === 33778) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === 33779) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (n === 35840 || n === 35841 || n === 35842 || n === 35843)
      if (s = e.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (n === 35840) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === 35841) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === 35842) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === 35843) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (n === 36196 || n === 37492 || n === 37496)
      if (s = e.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (n === 36196 || n === 37492) return a === Ye ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (n === 37496) return a === Ye ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (n === 37808 || n === 37809 || n === 37810 || n === 37811 || n === 37812 || n === 37813 || n === 37814 || n === 37815 || n === 37816 || n === 37817 || n === 37818 || n === 37819 || n === 37820 || n === 37821)
      if (s = e.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (n === 37808) return a === Ye ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === 37809) return a === Ye ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === 37810) return a === Ye ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === 37811) return a === Ye ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === 37812) return a === Ye ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === 37813) return a === Ye ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === 37814) return a === Ye ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === 37815) return a === Ye ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === 37816) return a === Ye ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === 37817) return a === Ye ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === 37818) return a === Ye ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === 37819) return a === Ye ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === 37820) return a === Ye ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === 37821) return a === Ye ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (n === 36492 || n === 36494 || n === 36495)
      if (s = e.get("EXT_texture_compression_bptc"), s !== null) {
        if (n === 36492) return a === Ye ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === 36494) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === 36495) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (n === 36283 || n === 36284 || n === 36285 || n === 36286)
      if (s = e.get("EXT_texture_compression_rgtc"), s !== null) {
        if (n === 36492) return s.COMPRESSED_RED_RGTC1_EXT;
        if (n === 36284) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === 36285) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === 36286) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return n === 1020 ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: t };
}
class _h extends Tt {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.cameras = e;
  }
}
class yi extends ut {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const gh = { type: "move" };
class mr {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new yi(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new yi(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new N(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new N()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new yi(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new N(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new N()), this._grip;
  }
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t)
        for (const n of e.hand.values())
          this._getHandJoint(t, n);
    }
    return this.dispatchEvent({ type: "connected", data: e }), this;
  }
  disconnect(e) {
    return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(e, t, n) {
    let r = null, s = null, a = null;
    const o = this._targetRay, l = this._grip, c = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (c && e.hand) {
        a = !0;
        for (const x of e.hand.values()) {
          const f = t.getJointPose(x, n), h = this._getHandJoint(c, x);
          f !== null && (h.matrix.fromArray(f.transform.matrix), h.matrix.decompose(h.position, h.rotation, h.scale), h.matrixWorldNeedsUpdate = !0, h.jointRadius = f.radius), h.visible = f !== null;
        }
        const u = c.joints["index-finger-tip"], p = c.joints["thumb-tip"], d = u.position.distanceTo(p.position), m = 0.02, _ = 5e-3;
        c.inputState.pinching && d > m + _ ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !c.inputState.pinching && d <= m - _ && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        l !== null && e.gripSpace && (s = t.getPose(e.gripSpace, n), s !== null && (l.matrix.fromArray(s.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(s.linearVelocity)) : l.hasLinearVelocity = !1, s.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(s.angularVelocity)) : l.hasAngularVelocity = !1));
      o !== null && (r = t.getPose(e.targetRaySpace, n), r === null && s !== null && (r = s), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(gh)));
    }
    return o !== null && (o.visible = r !== null), l !== null && (l.visible = s !== null), c !== null && (c.visible = a !== null), this;
  }
  // private method
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const n = new yi();
      n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
    }
    return e.joints[t.jointName];
  }
}
const vh = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, xh = `
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

}`;
class Mh {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(e, t, n) {
    if (this.texture === null) {
      const r = new vt(), s = e.properties.get(r);
      s.__webglTexture = t.texture, (t.depthNear != n.depthNear || t.depthFar != n.depthFar) && (this.depthNear = t.depthNear, this.depthFar = t.depthFar), this.texture = r;
    }
  }
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport, n = new nn({
        vertexShader: vh,
        fragmentShader: xh,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new gt(new On(20, 20), n);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}
class Sh extends Bn {
  constructor(e, t) {
    super();
    const n = this;
    let r = null, s = 1, a = null, o = "local-floor", l = 1, c = null, u = null, p = null, d = null, m = null, _ = null;
    const x = new Mh(), f = t.getContextAttributes();
    let h = null, b = null;
    const E = [], y = [], F = new Oe();
    let R = null;
    const P = new Tt();
    P.layers.enable(1), P.viewport = new rt();
    const T = new Tt();
    T.layers.enable(2), T.viewport = new rt();
    const S = [P, T], v = new _h();
    v.layers.enable(1), v.layers.enable(2);
    let C = null, G = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(W) {
      let J = E[W];
      return J === void 0 && (J = new mr(), E[W] = J), J.getTargetRaySpace();
    }, this.getControllerGrip = function(W) {
      let J = E[W];
      return J === void 0 && (J = new mr(), E[W] = J), J.getGripSpace();
    }, this.getHand = function(W) {
      let J = E[W];
      return J === void 0 && (J = new mr(), E[W] = J), J.getHandSpace();
    };
    function U(W) {
      const J = y.indexOf(W.inputSource);
      if (J === -1)
        return;
      const pe = E[J];
      pe !== void 0 && (pe.update(W.inputSource, W.frame, c || a), pe.dispatchEvent({ type: W.type, data: W.inputSource }));
    }
    function H() {
      r.removeEventListener("select", U), r.removeEventListener("selectstart", U), r.removeEventListener("selectend", U), r.removeEventListener("squeeze", U), r.removeEventListener("squeezestart", U), r.removeEventListener("squeezeend", U), r.removeEventListener("end", H), r.removeEventListener("inputsourceschange", q);
      for (let W = 0; W < E.length; W++) {
        const J = y[W];
        J !== null && (y[W] = null, E[W].disconnect(J));
      }
      C = null, G = null, x.reset(), e.setRenderTarget(h), m = null, d = null, p = null, r = null, b = null, Xe.stop(), n.isPresenting = !1, e.setPixelRatio(R), e.setSize(F.width, F.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(W) {
      s = W, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(W) {
      o = W, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || a;
    }, this.setReferenceSpace = function(W) {
      c = W;
    }, this.getBaseLayer = function() {
      return d !== null ? d : m;
    }, this.getBinding = function() {
      return p;
    }, this.getFrame = function() {
      return _;
    }, this.getSession = function() {
      return r;
    }, this.setSession = async function(W) {
      if (r = W, r !== null) {
        if (h = e.getRenderTarget(), r.addEventListener("select", U), r.addEventListener("selectstart", U), r.addEventListener("selectend", U), r.addEventListener("squeeze", U), r.addEventListener("squeezestart", U), r.addEventListener("squeezeend", U), r.addEventListener("end", H), r.addEventListener("inputsourceschange", q), f.xrCompatible !== !0 && await t.makeXRCompatible(), R = e.getPixelRatio(), e.getSize(F), r.renderState.layers === void 0) {
          const J = {
            antialias: f.antialias,
            alpha: !0,
            depth: f.depth,
            stencil: f.stencil,
            framebufferScaleFactor: s
          };
          m = new XRWebGLLayer(r, t, J), r.updateRenderState({ baseLayer: m }), e.setPixelRatio(1), e.setSize(m.framebufferWidth, m.framebufferHeight, !1), b = new tn(
            m.framebufferWidth,
            m.framebufferHeight,
            {
              format: 1023,
              type: 1009,
              colorSpace: e.outputColorSpace,
              stencilBuffer: f.stencil
            }
          );
        } else {
          let J = null, pe = null, le = null;
          f.depth && (le = f.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, J = f.stencil ? 1027 : 1026, pe = f.stencil ? 1020 : 1014);
          const Ee = {
            colorFormat: t.RGBA8,
            depthFormat: le,
            scaleFactor: s
          };
          p = new XRWebGLBinding(r, t), d = p.createProjectionLayer(Ee), r.updateRenderState({ layers: [d] }), e.setPixelRatio(1), e.setSize(d.textureWidth, d.textureHeight, !1), b = new tn(
            d.textureWidth,
            d.textureHeight,
            {
              format: 1023,
              type: 1009,
              depthTexture: new ta(d.textureWidth, d.textureHeight, pe, void 0, void 0, void 0, void 0, void 0, void 0, J),
              stencilBuffer: f.stencil,
              colorSpace: e.outputColorSpace,
              samples: f.antialias ? 4 : 0,
              resolveDepthBuffer: d.ignoreDepthValues === !1
            }
          );
        }
        b.isXRRenderTarget = !0, this.setFoveation(l), c = null, a = await r.requestReferenceSpace(o), Xe.setContext(r), Xe.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (r !== null)
        return r.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return x.getDepthTexture();
    };
    function q(W) {
      for (let J = 0; J < W.removed.length; J++) {
        const pe = W.removed[J], le = y.indexOf(pe);
        le >= 0 && (y[le] = null, E[le].disconnect(pe));
      }
      for (let J = 0; J < W.added.length; J++) {
        const pe = W.added[J];
        let le = y.indexOf(pe);
        if (le === -1) {
          for (let Re = 0; Re < E.length; Re++)
            if (Re >= y.length) {
              y.push(pe), le = Re;
              break;
            } else if (y[Re] === null) {
              y[Re] = pe, le = Re;
              break;
            }
          if (le === -1) break;
        }
        const Ee = E[le];
        Ee && Ee.connect(pe);
      }
    }
    const V = new N(), j = new N();
    function k(W, J, pe) {
      V.setFromMatrixPosition(J.matrixWorld), j.setFromMatrixPosition(pe.matrixWorld);
      const le = V.distanceTo(j), Ee = J.projectionMatrix.elements, Re = pe.projectionMatrix.elements, Ue = Ee[14] / (Ee[10] - 1), $e = Ee[14] / (Ee[10] + 1), w = (Ee[9] + 1) / Ee[5], Qe = (Ee[9] - 1) / Ee[5], We = (Ee[8] - 1) / Ee[0], qe = (Re[8] + 1) / Re[0], ve = Ue * We, et = Ue * qe, Ae = le / (-We + qe), we = Ae * -We;
      if (J.matrixWorld.decompose(W.position, W.quaternion, W.scale), W.translateX(we), W.translateZ(Ae), W.matrixWorld.compose(W.position, W.quaternion, W.scale), W.matrixWorldInverse.copy(W.matrixWorld).invert(), Ee[10] === -1)
        W.projectionMatrix.copy(J.projectionMatrix), W.projectionMatrixInverse.copy(J.projectionMatrixInverse);
      else {
        const A = Ue + Ae, g = $e + Ae, z = ve - we, K = et + (le - we), Z = w * $e / g * A, $ = Qe * $e / g * A;
        W.projectionMatrix.makePerspective(z, K, Z, $, A, g), W.projectionMatrixInverse.copy(W.projectionMatrix).invert();
      }
    }
    function se(W, J) {
      J === null ? W.matrixWorld.copy(W.matrix) : W.matrixWorld.multiplyMatrices(J.matrixWorld, W.matrix), W.matrixWorldInverse.copy(W.matrixWorld).invert();
    }
    this.updateCamera = function(W) {
      if (r === null) return;
      let J = W.near, pe = W.far;
      x.texture !== null && (x.depthNear > 0 && (J = x.depthNear), x.depthFar > 0 && (pe = x.depthFar)), v.near = T.near = P.near = J, v.far = T.far = P.far = pe, (C !== v.near || G !== v.far) && (r.updateRenderState({
        depthNear: v.near,
        depthFar: v.far
      }), C = v.near, G = v.far);
      const le = W.parent, Ee = v.cameras;
      se(v, le);
      for (let Re = 0; Re < Ee.length; Re++)
        se(Ee[Re], le);
      Ee.length === 2 ? k(v, P, T) : v.projectionMatrix.copy(P.projectionMatrix), ue(W, v, le);
    };
    function ue(W, J, pe) {
      pe === null ? W.matrix.copy(J.matrixWorld) : (W.matrix.copy(pe.matrixWorld), W.matrix.invert(), W.matrix.multiply(J.matrixWorld)), W.matrix.decompose(W.position, W.quaternion, W.scale), W.updateMatrixWorld(!0), W.projectionMatrix.copy(J.projectionMatrix), W.projectionMatrixInverse.copy(J.projectionMatrixInverse), W.isPerspectiveCamera && (W.fov = Sr * 2 * Math.atan(1 / W.projectionMatrix.elements[5]), W.zoom = 1);
    }
    this.getCamera = function() {
      return v;
    }, this.getFoveation = function() {
      if (!(d === null && m === null))
        return l;
    }, this.setFoveation = function(W) {
      l = W, d !== null && (d.fixedFoveation = W), m !== null && m.fixedFoveation !== void 0 && (m.fixedFoveation = W);
    }, this.hasDepthSensing = function() {
      return x.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return x.getMesh(v);
    };
    let me = null;
    function Fe(W, J) {
      if (u = J.getViewerPose(c || a), _ = J, u !== null) {
        const pe = u.views;
        m !== null && (e.setRenderTargetFramebuffer(b, m.framebuffer), e.setRenderTarget(b));
        let le = !1;
        pe.length !== v.cameras.length && (v.cameras.length = 0, le = !0);
        for (let Re = 0; Re < pe.length; Re++) {
          const Ue = pe[Re];
          let $e = null;
          if (m !== null)
            $e = m.getViewport(Ue);
          else {
            const Qe = p.getViewSubImage(d, Ue);
            $e = Qe.viewport, Re === 0 && (e.setRenderTargetTextures(
              b,
              Qe.colorTexture,
              d.ignoreDepthValues ? void 0 : Qe.depthStencilTexture
            ), e.setRenderTarget(b));
          }
          let w = S[Re];
          w === void 0 && (w = new Tt(), w.layers.enable(Re), w.viewport = new rt(), S[Re] = w), w.matrix.fromArray(Ue.transform.matrix), w.matrix.decompose(w.position, w.quaternion, w.scale), w.projectionMatrix.fromArray(Ue.projectionMatrix), w.projectionMatrixInverse.copy(w.projectionMatrix).invert(), w.viewport.set($e.x, $e.y, $e.width, $e.height), Re === 0 && (v.matrix.copy(w.matrix), v.matrix.decompose(v.position, v.quaternion, v.scale)), le === !0 && v.cameras.push(w);
        }
        const Ee = r.enabledFeatures;
        if (Ee && Ee.includes("depth-sensing")) {
          const Re = p.getDepthInformation(pe[0]);
          Re && Re.isValid && Re.texture && x.init(e, Re, r.renderState);
        }
      }
      for (let pe = 0; pe < E.length; pe++) {
        const le = y[pe], Ee = E[pe];
        le !== null && Ee !== void 0 && Ee.update(le, J, c || a);
      }
      me && me(W, J), J.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: J }), _ = null;
    }
    const Xe = new Qs();
    Xe.setAnimationLoop(Fe), this.setAnimationLoop = function(W) {
      me = W;
    }, this.dispose = function() {
    };
  }
}
const hn = /* @__PURE__ */ new Nt(), Eh = /* @__PURE__ */ new Je();
function yh(i, e) {
  function t(f, h) {
    f.matrixAutoUpdate === !0 && f.updateMatrix(), h.value.copy(f.matrix);
  }
  function n(f, h) {
    h.color.getRGB(f.fogColor.value, Zs(i)), h.isFog ? (f.fogNear.value = h.near, f.fogFar.value = h.far) : h.isFogExp2 && (f.fogDensity.value = h.density);
  }
  function r(f, h, b, E, y) {
    h.isMeshBasicMaterial || h.isMeshLambertMaterial ? s(f, h) : h.isMeshToonMaterial ? (s(f, h), p(f, h)) : h.isMeshPhongMaterial ? (s(f, h), u(f, h)) : h.isMeshStandardMaterial ? (s(f, h), d(f, h), h.isMeshPhysicalMaterial && m(f, h, y)) : h.isMeshMatcapMaterial ? (s(f, h), _(f, h)) : h.isMeshDepthMaterial ? s(f, h) : h.isMeshDistanceMaterial ? (s(f, h), x(f, h)) : h.isMeshNormalMaterial ? s(f, h) : h.isLineBasicMaterial ? (a(f, h), h.isLineDashedMaterial && o(f, h)) : h.isPointsMaterial ? l(f, h, b, E) : h.isSpriteMaterial ? c(f, h) : h.isShadowMaterial ? (f.color.value.copy(h.color), f.opacity.value = h.opacity) : h.isShaderMaterial && (h.uniformsNeedUpdate = !1);
  }
  function s(f, h) {
    f.opacity.value = h.opacity, h.color && f.diffuse.value.copy(h.color), h.emissive && f.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity), h.map && (f.map.value = h.map, t(h.map, f.mapTransform)), h.alphaMap && (f.alphaMap.value = h.alphaMap, t(h.alphaMap, f.alphaMapTransform)), h.bumpMap && (f.bumpMap.value = h.bumpMap, t(h.bumpMap, f.bumpMapTransform), f.bumpScale.value = h.bumpScale, h.side === 1 && (f.bumpScale.value *= -1)), h.normalMap && (f.normalMap.value = h.normalMap, t(h.normalMap, f.normalMapTransform), f.normalScale.value.copy(h.normalScale), h.side === 1 && f.normalScale.value.negate()), h.displacementMap && (f.displacementMap.value = h.displacementMap, t(h.displacementMap, f.displacementMapTransform), f.displacementScale.value = h.displacementScale, f.displacementBias.value = h.displacementBias), h.emissiveMap && (f.emissiveMap.value = h.emissiveMap, t(h.emissiveMap, f.emissiveMapTransform)), h.specularMap && (f.specularMap.value = h.specularMap, t(h.specularMap, f.specularMapTransform)), h.alphaTest > 0 && (f.alphaTest.value = h.alphaTest);
    const b = e.get(h), E = b.envMap, y = b.envMapRotation;
    E && (f.envMap.value = E, hn.copy(y), hn.x *= -1, hn.y *= -1, hn.z *= -1, E.isCubeTexture && E.isRenderTargetTexture === !1 && (hn.y *= -1, hn.z *= -1), f.envMapRotation.value.setFromMatrix4(Eh.makeRotationFromEuler(hn)), f.flipEnvMap.value = E.isCubeTexture && E.isRenderTargetTexture === !1 ? -1 : 1, f.reflectivity.value = h.reflectivity, f.ior.value = h.ior, f.refractionRatio.value = h.refractionRatio), h.lightMap && (f.lightMap.value = h.lightMap, f.lightMapIntensity.value = h.lightMapIntensity, t(h.lightMap, f.lightMapTransform)), h.aoMap && (f.aoMap.value = h.aoMap, f.aoMapIntensity.value = h.aoMapIntensity, t(h.aoMap, f.aoMapTransform));
  }
  function a(f, h) {
    f.diffuse.value.copy(h.color), f.opacity.value = h.opacity, h.map && (f.map.value = h.map, t(h.map, f.mapTransform));
  }
  function o(f, h) {
    f.dashSize.value = h.dashSize, f.totalSize.value = h.dashSize + h.gapSize, f.scale.value = h.scale;
  }
  function l(f, h, b, E) {
    f.diffuse.value.copy(h.color), f.opacity.value = h.opacity, f.size.value = h.size * b, f.scale.value = E * 0.5, h.map && (f.map.value = h.map, t(h.map, f.uvTransform)), h.alphaMap && (f.alphaMap.value = h.alphaMap, t(h.alphaMap, f.alphaMapTransform)), h.alphaTest > 0 && (f.alphaTest.value = h.alphaTest);
  }
  function c(f, h) {
    f.diffuse.value.copy(h.color), f.opacity.value = h.opacity, f.rotation.value = h.rotation, h.map && (f.map.value = h.map, t(h.map, f.mapTransform)), h.alphaMap && (f.alphaMap.value = h.alphaMap, t(h.alphaMap, f.alphaMapTransform)), h.alphaTest > 0 && (f.alphaTest.value = h.alphaTest);
  }
  function u(f, h) {
    f.specular.value.copy(h.specular), f.shininess.value = Math.max(h.shininess, 1e-4);
  }
  function p(f, h) {
    h.gradientMap && (f.gradientMap.value = h.gradientMap);
  }
  function d(f, h) {
    f.metalness.value = h.metalness, h.metalnessMap && (f.metalnessMap.value = h.metalnessMap, t(h.metalnessMap, f.metalnessMapTransform)), f.roughness.value = h.roughness, h.roughnessMap && (f.roughnessMap.value = h.roughnessMap, t(h.roughnessMap, f.roughnessMapTransform)), h.envMap && (f.envMapIntensity.value = h.envMapIntensity);
  }
  function m(f, h, b) {
    f.ior.value = h.ior, h.sheen > 0 && (f.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen), f.sheenRoughness.value = h.sheenRoughness, h.sheenColorMap && (f.sheenColorMap.value = h.sheenColorMap, t(h.sheenColorMap, f.sheenColorMapTransform)), h.sheenRoughnessMap && (f.sheenRoughnessMap.value = h.sheenRoughnessMap, t(h.sheenRoughnessMap, f.sheenRoughnessMapTransform))), h.clearcoat > 0 && (f.clearcoat.value = h.clearcoat, f.clearcoatRoughness.value = h.clearcoatRoughness, h.clearcoatMap && (f.clearcoatMap.value = h.clearcoatMap, t(h.clearcoatMap, f.clearcoatMapTransform)), h.clearcoatRoughnessMap && (f.clearcoatRoughnessMap.value = h.clearcoatRoughnessMap, t(h.clearcoatRoughnessMap, f.clearcoatRoughnessMapTransform)), h.clearcoatNormalMap && (f.clearcoatNormalMap.value = h.clearcoatNormalMap, t(h.clearcoatNormalMap, f.clearcoatNormalMapTransform), f.clearcoatNormalScale.value.copy(h.clearcoatNormalScale), h.side === 1 && f.clearcoatNormalScale.value.negate())), h.dispersion > 0 && (f.dispersion.value = h.dispersion), h.iridescence > 0 && (f.iridescence.value = h.iridescence, f.iridescenceIOR.value = h.iridescenceIOR, f.iridescenceThicknessMinimum.value = h.iridescenceThicknessRange[0], f.iridescenceThicknessMaximum.value = h.iridescenceThicknessRange[1], h.iridescenceMap && (f.iridescenceMap.value = h.iridescenceMap, t(h.iridescenceMap, f.iridescenceMapTransform)), h.iridescenceThicknessMap && (f.iridescenceThicknessMap.value = h.iridescenceThicknessMap, t(h.iridescenceThicknessMap, f.iridescenceThicknessMapTransform))), h.transmission > 0 && (f.transmission.value = h.transmission, f.transmissionSamplerMap.value = b.texture, f.transmissionSamplerSize.value.set(b.width, b.height), h.transmissionMap && (f.transmissionMap.value = h.transmissionMap, t(h.transmissionMap, f.transmissionMapTransform)), f.thickness.value = h.thickness, h.thicknessMap && (f.thicknessMap.value = h.thicknessMap, t(h.thicknessMap, f.thicknessMapTransform)), f.attenuationDistance.value = h.attenuationDistance, f.attenuationColor.value.copy(h.attenuationColor)), h.anisotropy > 0 && (f.anisotropyVector.value.set(h.anisotropy * Math.cos(h.anisotropyRotation), h.anisotropy * Math.sin(h.anisotropyRotation)), h.anisotropyMap && (f.anisotropyMap.value = h.anisotropyMap, t(h.anisotropyMap, f.anisotropyMapTransform))), f.specularIntensity.value = h.specularIntensity, f.specularColor.value.copy(h.specularColor), h.specularColorMap && (f.specularColorMap.value = h.specularColorMap, t(h.specularColorMap, f.specularColorMapTransform)), h.specularIntensityMap && (f.specularIntensityMap.value = h.specularIntensityMap, t(h.specularIntensityMap, f.specularIntensityMapTransform));
  }
  function _(f, h) {
    h.matcap && (f.matcap.value = h.matcap);
  }
  function x(f, h) {
    const b = e.get(h).light;
    f.referencePosition.value.setFromMatrixPosition(b.matrixWorld), f.nearDistance.value = b.shadow.camera.near, f.farDistance.value = b.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: r
  };
}
function Th(i, e, t, n) {
  let r = {}, s = {}, a = [];
  const o = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(b, E) {
    const y = E.program;
    n.uniformBlockBinding(b, y);
  }
  function c(b, E) {
    let y = r[b.id];
    y === void 0 && (_(b), y = u(b), r[b.id] = y, b.addEventListener("dispose", f));
    const F = E.program;
    n.updateUBOMapping(b, F);
    const R = e.render.frame;
    s[b.id] !== R && (d(b), s[b.id] = R);
  }
  function u(b) {
    const E = p();
    b.__bindingPointIndex = E;
    const y = i.createBuffer(), F = b.__size, R = b.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, y), i.bufferData(i.UNIFORM_BUFFER, F, R), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, E, y), y;
  }
  function p() {
    for (let b = 0; b < o; b++)
      if (a.indexOf(b) === -1)
        return a.push(b), b;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function d(b) {
    const E = r[b.id], y = b.uniforms, F = b.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, E);
    for (let R = 0, P = y.length; R < P; R++) {
      const T = Array.isArray(y[R]) ? y[R] : [y[R]];
      for (let S = 0, v = T.length; S < v; S++) {
        const C = T[S];
        if (m(C, R, S, F) === !0) {
          const G = C.__offset, U = Array.isArray(C.value) ? C.value : [C.value];
          let H = 0;
          for (let q = 0; q < U.length; q++) {
            const V = U[q], j = x(V);
            typeof V == "number" || typeof V == "boolean" ? (C.__data[0] = V, i.bufferSubData(i.UNIFORM_BUFFER, G + H, C.__data)) : V.isMatrix3 ? (C.__data[0] = V.elements[0], C.__data[1] = V.elements[1], C.__data[2] = V.elements[2], C.__data[3] = 0, C.__data[4] = V.elements[3], C.__data[5] = V.elements[4], C.__data[6] = V.elements[5], C.__data[7] = 0, C.__data[8] = V.elements[6], C.__data[9] = V.elements[7], C.__data[10] = V.elements[8], C.__data[11] = 0) : (V.toArray(C.__data, H), H += j.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, G, C.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function m(b, E, y, F) {
    const R = b.value, P = E + "_" + y;
    if (F[P] === void 0)
      return typeof R == "number" || typeof R == "boolean" ? F[P] = R : F[P] = R.clone(), !0;
    {
      const T = F[P];
      if (typeof R == "number" || typeof R == "boolean") {
        if (T !== R)
          return F[P] = R, !0;
      } else if (T.equals(R) === !1)
        return T.copy(R), !0;
    }
    return !1;
  }
  function _(b) {
    const E = b.uniforms;
    let y = 0;
    const F = 16;
    for (let P = 0, T = E.length; P < T; P++) {
      const S = Array.isArray(E[P]) ? E[P] : [E[P]];
      for (let v = 0, C = S.length; v < C; v++) {
        const G = S[v], U = Array.isArray(G.value) ? G.value : [G.value];
        for (let H = 0, q = U.length; H < q; H++) {
          const V = U[H], j = x(V), k = y % F, se = k % j.boundary, ue = k + se;
          y += se, ue !== 0 && F - ue < j.storage && (y += F - ue), G.__data = new Float32Array(j.storage / Float32Array.BYTES_PER_ELEMENT), G.__offset = y, y += j.storage;
        }
      }
    }
    const R = y % F;
    return R > 0 && (y += F - R), b.__size = y, b.__cache = {}, this;
  }
  function x(b) {
    const E = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof b == "number" || typeof b == "boolean" ? (E.boundary = 4, E.storage = 4) : b.isVector2 ? (E.boundary = 8, E.storage = 8) : b.isVector3 || b.isColor ? (E.boundary = 16, E.storage = 12) : b.isVector4 ? (E.boundary = 16, E.storage = 16) : b.isMatrix3 ? (E.boundary = 48, E.storage = 48) : b.isMatrix4 ? (E.boundary = 64, E.storage = 64) : b.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", b), E;
  }
  function f(b) {
    const E = b.target;
    E.removeEventListener("dispose", f);
    const y = a.indexOf(E.__bindingPointIndex);
    a.splice(y, 1), i.deleteBuffer(r[E.id]), delete r[E.id], delete s[E.id];
  }
  function h() {
    for (const b in r)
      i.deleteBuffer(r[b]);
    a = [], r = {}, s = {};
  }
  return {
    bind: l,
    update: c,
    dispose: h
  };
}
class Ah {
  constructor(e = {}) {
    const {
      canvas: t = pa(),
      context: n = null,
      depth: r = !0,
      stencil: s = !1,
      alpha: a = !1,
      antialias: o = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: c = !1,
      powerPreference: u = "default",
      failIfMajorPerformanceCaveat: p = !1
    } = e;
    this.isWebGLRenderer = !0;
    let d;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      d = n.getContextAttributes().alpha;
    } else
      d = a;
    const m = new Uint32Array(4), _ = new Int32Array(4);
    let x = null, f = null;
    const h = [], b = [];
    this.domElement = t, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = Lt, this.toneMapping = 0, this.toneMappingExposure = 1;
    const E = this;
    let y = !1, F = 0, R = 0, P = null, T = -1, S = null;
    const v = new rt(), C = new rt();
    let G = null;
    const U = new Ie(0);
    let H = 0, q = t.width, V = t.height, j = 1, k = null, se = null;
    const ue = new rt(0, 0, q, V), me = new rt(0, 0, q, V);
    let Fe = !1;
    const Xe = new Ar();
    let W = !1, J = !1;
    const pe = new Je(), le = new N(), Ee = new rt(), Re = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let Ue = !1;
    function $e() {
      return P === null ? j : 1;
    }
    let w = n;
    function Qe(M, D) {
      return t.getContext(M, D);
    }
    try {
      const M = {
        alpha: !0,
        depth: r,
        stencil: s,
        antialias: o,
        premultipliedAlpha: l,
        preserveDrawingBuffer: c,
        powerPreference: u,
        failIfMajorPerformanceCaveat: p
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${yr}`), t.addEventListener("webglcontextlost", X, !1), t.addEventListener("webglcontextrestored", Y, !1), t.addEventListener("webglcontextcreationerror", ne, !1), w === null) {
        const D = "webgl2";
        if (w = Qe(D, M), w === null)
          throw Qe(D) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (M) {
      throw console.error("THREE.WebGLRenderer: " + M.message), M;
    }
    let We, qe, ve, et, Ae, we, A, g, z, K, Z, $, xe, re, ce, Ce, Q, oe, Ne, Te, he, be, De, Ke;
    function L() {
      We = new Lc(w), We.init(), be = new mh(w, We), qe = new Ac(w, We, e, be), ve = new dh(w), et = new Ic(w), Ae = new Ju(), we = new ph(w, We, ve, Ae, qe, be, et), A = new Rc(E), g = new Pc(E), z = new za(w), De = new yc(w, z), K = new Dc(w, z, et, De), Z = new Nc(w, K, z, et), Ne = new Fc(w, qe, we), Ce = new bc(Ae), $ = new ju(E, A, g, We, qe, De, Ce), xe = new yh(E, Ae), re = new eh(), ce = new ah(We), oe = new Ec(E, A, g, ve, Z, d, l), Q = new hh(E, Z, qe), Ke = new Th(w, et, qe, ve), Te = new Tc(w, We, et), he = new Uc(w, We, et), et.programs = $.programs, E.capabilities = qe, E.extensions = We, E.properties = Ae, E.renderLists = re, E.shadowMap = Q, E.state = ve, E.info = et;
    }
    L();
    const ee = new Sh(E, w);
    this.xr = ee, this.getContext = function() {
      return w;
    }, this.getContextAttributes = function() {
      return w.getContextAttributes();
    }, this.forceContextLoss = function() {
      const M = We.get("WEBGL_lose_context");
      M && M.loseContext();
    }, this.forceContextRestore = function() {
      const M = We.get("WEBGL_lose_context");
      M && M.restoreContext();
    }, this.getPixelRatio = function() {
      return j;
    }, this.setPixelRatio = function(M) {
      M !== void 0 && (j = M, this.setSize(q, V, !1));
    }, this.getSize = function(M) {
      return M.set(q, V);
    }, this.setSize = function(M, D, O = !0) {
      if (ee.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      q = M, V = D, t.width = Math.floor(M * j), t.height = Math.floor(D * j), O === !0 && (t.style.width = M + "px", t.style.height = D + "px"), this.setViewport(0, 0, M, D);
    }, this.getDrawingBufferSize = function(M) {
      return M.set(q * j, V * j).floor();
    }, this.setDrawingBufferSize = function(M, D, O) {
      q = M, V = D, j = O, t.width = Math.floor(M * O), t.height = Math.floor(D * O), this.setViewport(0, 0, M, D);
    }, this.getCurrentViewport = function(M) {
      return M.copy(v);
    }, this.getViewport = function(M) {
      return M.copy(ue);
    }, this.setViewport = function(M, D, O, B) {
      M.isVector4 ? ue.set(M.x, M.y, M.z, M.w) : ue.set(M, D, O, B), ve.viewport(v.copy(ue).multiplyScalar(j).round());
    }, this.getScissor = function(M) {
      return M.copy(me);
    }, this.setScissor = function(M, D, O, B) {
      M.isVector4 ? me.set(M.x, M.y, M.z, M.w) : me.set(M, D, O, B), ve.scissor(C.copy(me).multiplyScalar(j).round());
    }, this.getScissorTest = function() {
      return Fe;
    }, this.setScissorTest = function(M) {
      ve.setScissorTest(Fe = M);
    }, this.setOpaqueSort = function(M) {
      k = M;
    }, this.setTransparentSort = function(M) {
      se = M;
    }, this.getClearColor = function(M) {
      return M.copy(oe.getClearColor());
    }, this.setClearColor = function() {
      oe.setClearColor.apply(oe, arguments);
    }, this.getClearAlpha = function() {
      return oe.getClearAlpha();
    }, this.setClearAlpha = function() {
      oe.setClearAlpha.apply(oe, arguments);
    }, this.clear = function(M = !0, D = !0, O = !0) {
      let B = 0;
      if (M) {
        let I = !1;
        if (P !== null) {
          const te = P.texture.format;
          I = te === 1033 || te === 1031 || te === 1029;
        }
        if (I) {
          const te = P.texture.type, ae = te === 1009 || te === 1014 || te === 1012 || te === 1020 || te === 1017 || te === 1018, de = oe.getClearColor(), fe = oe.getClearAlpha(), Se = de.r, ye = de.g, _e = de.b;
          ae ? (m[0] = Se, m[1] = ye, m[2] = _e, m[3] = fe, w.clearBufferuiv(w.COLOR, 0, m)) : (_[0] = Se, _[1] = ye, _[2] = _e, _[3] = fe, w.clearBufferiv(w.COLOR, 0, _));
        } else
          B |= w.COLOR_BUFFER_BIT;
      }
      D && (B |= w.DEPTH_BUFFER_BIT), O && (B |= w.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), w.clear(B);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", X, !1), t.removeEventListener("webglcontextrestored", Y, !1), t.removeEventListener("webglcontextcreationerror", ne, !1), re.dispose(), ce.dispose(), Ae.dispose(), A.dispose(), g.dispose(), Z.dispose(), De.dispose(), Ke.dispose(), $.dispose(), ee.dispose(), ee.removeEventListener("sessionstart", Dt), ee.removeEventListener("sessionend", Cr), sn.stop();
    };
    function X(M) {
      M.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), y = !0;
    }
    function Y() {
      console.log("THREE.WebGLRenderer: Context Restored."), y = !1;
      const M = et.autoReset, D = Q.enabled, O = Q.autoUpdate, B = Q.needsUpdate, I = Q.type;
      L(), et.autoReset = M, Q.enabled = D, Q.autoUpdate = O, Q.needsUpdate = B, Q.type = I;
    }
    function ne(M) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", M.statusMessage);
    }
    function Me(M) {
      const D = M.target;
      D.removeEventListener("dispose", Me), Be(D);
    }
    function Be(M) {
      tt(M), Ae.remove(M);
    }
    function tt(M) {
      const D = Ae.get(M).programs;
      D !== void 0 && (D.forEach(function(O) {
        $.releaseProgram(O);
      }), M.isShaderMaterial && $.releaseShaderCache(M));
    }
    this.renderBufferDirect = function(M, D, O, B, I, te) {
      D === null && (D = Re);
      const ae = I.isMesh && I.matrixWorld.determinant() < 0, de = ca(M, D, O, B, I);
      ve.setMaterial(B, ae);
      let fe = O.index, Se = 1;
      if (B.wireframe === !0) {
        if (fe = K.getWireframeAttribute(O), fe === void 0) return;
        Se = 2;
      }
      const ye = O.drawRange, _e = O.attributes.position;
      let ze = ye.start * Se, Ze = (ye.start + ye.count) * Se;
      te !== null && (ze = Math.max(ze, te.start * Se), Ze = Math.min(Ze, (te.start + te.count) * Se)), fe !== null ? (ze = Math.max(ze, 0), Ze = Math.min(Ze, fe.count)) : _e != null && (ze = Math.max(ze, 0), Ze = Math.min(Ze, _e.count));
      const je = Ze - ze;
      if (je < 0 || je === 1 / 0) return;
      De.setup(I, B, de, O, fe);
      let Mt, He = Te;
      if (fe !== null && (Mt = z.get(fe), He = he, He.setIndex(Mt)), I.isMesh)
        B.wireframe === !0 ? (ve.setLineWidth(B.wireframeLinewidth * $e()), He.setMode(w.LINES)) : He.setMode(w.TRIANGLES);
      else if (I.isLine) {
        let ge = B.linewidth;
        ge === void 0 && (ge = 1), ve.setLineWidth(ge * $e()), I.isLineSegments ? He.setMode(w.LINES) : I.isLineLoop ? He.setMode(w.LINE_LOOP) : He.setMode(w.LINE_STRIP);
      } else I.isPoints ? He.setMode(w.POINTS) : I.isSprite && He.setMode(w.TRIANGLES);
      if (I.isBatchedMesh)
        if (I._multiDrawInstances !== null)
          He.renderMultiDrawInstances(I._multiDrawStarts, I._multiDrawCounts, I._multiDrawCount, I._multiDrawInstances);
        else if (We.get("WEBGL_multi_draw"))
          He.renderMultiDraw(I._multiDrawStarts, I._multiDrawCounts, I._multiDrawCount);
        else {
          const ge = I._multiDrawStarts, ct = I._multiDrawCounts, Ve = I._multiDrawCount, Rt = fe ? z.get(fe).bytesPerElement : 1, gn = Ae.get(B).currentProgram.getUniforms();
          for (let St = 0; St < Ve; St++)
            gn.setValue(w, "_gl_DrawID", St), He.render(ge[St] / Rt, ct[St]);
        }
      else if (I.isInstancedMesh)
        He.renderInstances(ze, je, I.count);
      else if (O.isInstancedBufferGeometry) {
        const ge = O._maxInstanceCount !== void 0 ? O._maxInstanceCount : 1 / 0, ct = Math.min(O.instanceCount, ge);
        He.renderInstances(ze, je, ct);
      } else
        He.render(ze, je);
    };
    function lt(M, D, O) {
      M.transparent === !0 && M.side === 2 && M.forceSinglePass === !1 ? (M.side = 1, M.needsUpdate = !0, ti(M, D, O), M.side = 0, M.needsUpdate = !0, ti(M, D, O), M.side = 2) : ti(M, D, O);
    }
    this.compile = function(M, D, O = null) {
      O === null && (O = M), f = ce.get(O), f.init(D), b.push(f), O.traverseVisible(function(I) {
        I.isLight && I.layers.test(D.layers) && (f.pushLight(I), I.castShadow && f.pushShadow(I));
      }), M !== O && M.traverseVisible(function(I) {
        I.isLight && I.layers.test(D.layers) && (f.pushLight(I), I.castShadow && f.pushShadow(I));
      }), f.setupLights();
      const B = /* @__PURE__ */ new Set();
      return M.traverse(function(I) {
        const te = I.material;
        if (te)
          if (Array.isArray(te))
            for (let ae = 0; ae < te.length; ae++) {
              const de = te[ae];
              lt(de, O, I), B.add(de);
            }
          else
            lt(te, O, I), B.add(te);
      }), b.pop(), f = null, B;
    }, this.compileAsync = function(M, D, O = null) {
      const B = this.compile(M, D, O);
      return new Promise((I) => {
        function te() {
          if (B.forEach(function(ae) {
            Ae.get(ae).currentProgram.isReady() && B.delete(ae);
          }), B.size === 0) {
            I(M);
            return;
          }
          setTimeout(te, 10);
        }
        We.get("KHR_parallel_shader_compile") !== null ? te() : setTimeout(te, 10);
      });
    };
    let Ge = null;
    function Bt(M) {
      Ge && Ge(M);
    }
    function Dt() {
      sn.stop();
    }
    function Cr() {
      sn.start();
    }
    const sn = new Qs();
    sn.setAnimationLoop(Bt), typeof self < "u" && sn.setContext(self), this.setAnimationLoop = function(M) {
      Ge = M, ee.setAnimationLoop(M), M === null ? sn.stop() : sn.start();
    }, ee.addEventListener("sessionstart", Dt), ee.addEventListener("sessionend", Cr), this.render = function(M, D) {
      if (D !== void 0 && D.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (y === !0) return;
      if (M.matrixWorldAutoUpdate === !0 && M.updateMatrixWorld(), D.parent === null && D.matrixWorldAutoUpdate === !0 && D.updateMatrixWorld(), ee.enabled === !0 && ee.isPresenting === !0 && (ee.cameraAutoUpdate === !0 && ee.updateCamera(D), D = ee.getCamera()), M.isScene === !0 && M.onBeforeRender(E, M, D, P), f = ce.get(M, b.length), f.init(D), b.push(f), pe.multiplyMatrices(D.projectionMatrix, D.matrixWorldInverse), Xe.setFromProjectionMatrix(pe), J = this.localClippingEnabled, W = Ce.init(this.clippingPlanes, J), x = re.get(M, h.length), x.init(), h.push(x), ee.enabled === !0 && ee.isPresenting === !0) {
        const te = E.xr.getDepthSensingMesh();
        te !== null && Gi(te, D, -1 / 0, E.sortObjects);
      }
      Gi(M, D, 0, E.sortObjects), x.finish(), E.sortObjects === !0 && x.sort(k, se), Ue = ee.enabled === !1 || ee.isPresenting === !1 || ee.hasDepthSensing() === !1, Ue && oe.addToRenderList(x, M), this.info.render.frame++, W === !0 && Ce.beginShadows();
      const O = f.state.shadowsArray;
      Q.render(O, M, D), W === !0 && Ce.endShadows(), this.info.autoReset === !0 && this.info.reset();
      const B = x.opaque, I = x.transmissive;
      if (f.setupLights(), D.isArrayCamera) {
        const te = D.cameras;
        if (I.length > 0)
          for (let ae = 0, de = te.length; ae < de; ae++) {
            const fe = te[ae];
            Lr(B, I, M, fe);
          }
        Ue && oe.render(M);
        for (let ae = 0, de = te.length; ae < de; ae++) {
          const fe = te[ae];
          Pr(x, M, fe, fe.viewport);
        }
      } else
        I.length > 0 && Lr(B, I, M, D), Ue && oe.render(M), Pr(x, M, D);
      P !== null && (we.updateMultisampleRenderTarget(P), we.updateRenderTargetMipmap(P)), M.isScene === !0 && M.onAfterRender(E, M, D), De.resetDefaultState(), T = -1, S = null, b.pop(), b.length > 0 ? (f = b[b.length - 1], W === !0 && Ce.setGlobalState(E.clippingPlanes, f.state.camera)) : f = null, h.pop(), h.length > 0 ? x = h[h.length - 1] : x = null;
    };
    function Gi(M, D, O, B) {
      if (M.visible === !1) return;
      if (M.layers.test(D.layers)) {
        if (M.isGroup)
          O = M.renderOrder;
        else if (M.isLOD)
          M.autoUpdate === !0 && M.update(D);
        else if (M.isLight)
          f.pushLight(M), M.castShadow && f.pushShadow(M);
        else if (M.isSprite) {
          if (!M.frustumCulled || Xe.intersectsSprite(M)) {
            B && Ee.setFromMatrixPosition(M.matrixWorld).applyMatrix4(pe);
            const ae = Z.update(M), de = M.material;
            de.visible && x.push(M, ae, de, O, Ee.z, null);
          }
        } else if ((M.isMesh || M.isLine || M.isPoints) && (!M.frustumCulled || Xe.intersectsObject(M))) {
          const ae = Z.update(M), de = M.material;
          if (B && (M.boundingSphere !== void 0 ? (M.boundingSphere === null && M.computeBoundingSphere(), Ee.copy(M.boundingSphere.center)) : (ae.boundingSphere === null && ae.computeBoundingSphere(), Ee.copy(ae.boundingSphere.center)), Ee.applyMatrix4(M.matrixWorld).applyMatrix4(pe)), Array.isArray(de)) {
            const fe = ae.groups;
            for (let Se = 0, ye = fe.length; Se < ye; Se++) {
              const _e = fe[Se], ze = de[_e.materialIndex];
              ze && ze.visible && x.push(M, ae, ze, O, Ee.z, _e);
            }
          } else de.visible && x.push(M, ae, de, O, Ee.z, null);
        }
      }
      const te = M.children;
      for (let ae = 0, de = te.length; ae < de; ae++)
        Gi(te[ae], D, O, B);
    }
    function Pr(M, D, O, B) {
      const I = M.opaque, te = M.transmissive, ae = M.transparent;
      f.setupLightsView(O), W === !0 && Ce.setGlobalState(E.clippingPlanes, O), B && ve.viewport(v.copy(B)), I.length > 0 && ei(I, D, O), te.length > 0 && ei(te, D, O), ae.length > 0 && ei(ae, D, O), ve.buffers.depth.setTest(!0), ve.buffers.depth.setMask(!0), ve.buffers.color.setMask(!0), ve.setPolygonOffset(!1);
    }
    function Lr(M, D, O, B) {
      if ((O.isScene === !0 ? O.overrideMaterial : null) !== null)
        return;
      f.state.transmissionRenderTarget[B.id] === void 0 && (f.state.transmissionRenderTarget[B.id] = new tn(1, 1, {
        generateMipmaps: !0,
        type: We.has("EXT_color_buffer_half_float") || We.has("EXT_color_buffer_float") ? 1016 : 1009,
        minFilter: 1008,
        samples: 4,
        stencilBuffer: s,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
        colorSpace: ke.workingColorSpace
      }));
      const te = f.state.transmissionRenderTarget[B.id], ae = B.viewport || v;
      te.setSize(ae.z, ae.w);
      const de = E.getRenderTarget();
      E.setRenderTarget(te), E.getClearColor(U), H = E.getClearAlpha(), H < 1 && E.setClearColor(16777215, 0.5), E.clear(), Ue && oe.render(O);
      const fe = E.toneMapping;
      E.toneMapping = 0;
      const Se = B.viewport;
      if (B.viewport !== void 0 && (B.viewport = void 0), f.setupLightsView(B), W === !0 && Ce.setGlobalState(E.clippingPlanes, B), ei(M, O, B), we.updateMultisampleRenderTarget(te), we.updateRenderTargetMipmap(te), We.has("WEBGL_multisampled_render_to_texture") === !1) {
        let ye = !1;
        for (let _e = 0, ze = D.length; _e < ze; _e++) {
          const Ze = D[_e], je = Ze.object, Mt = Ze.geometry, He = Ze.material, ge = Ze.group;
          if (He.side === 2 && je.layers.test(B.layers)) {
            const ct = He.side;
            He.side = 1, He.needsUpdate = !0, Dr(je, O, B, Mt, He, ge), He.side = ct, He.needsUpdate = !0, ye = !0;
          }
        }
        ye === !0 && (we.updateMultisampleRenderTarget(te), we.updateRenderTargetMipmap(te));
      }
      E.setRenderTarget(de), E.setClearColor(U, H), Se !== void 0 && (B.viewport = Se), E.toneMapping = fe;
    }
    function ei(M, D, O) {
      const B = D.isScene === !0 ? D.overrideMaterial : null;
      for (let I = 0, te = M.length; I < te; I++) {
        const ae = M[I], de = ae.object, fe = ae.geometry, Se = B === null ? ae.material : B, ye = ae.group;
        de.layers.test(O.layers) && Dr(de, D, O, fe, Se, ye);
      }
    }
    function Dr(M, D, O, B, I, te) {
      M.onBeforeRender(E, D, O, B, I, te), M.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse, M.matrixWorld), M.normalMatrix.getNormalMatrix(M.modelViewMatrix), I.onBeforeRender(E, D, O, B, M, te), I.transparent === !0 && I.side === 2 && I.forceSinglePass === !1 ? (I.side = 1, I.needsUpdate = !0, E.renderBufferDirect(O, D, B, I, M, te), I.side = 0, I.needsUpdate = !0, E.renderBufferDirect(O, D, B, I, M, te), I.side = 2) : E.renderBufferDirect(O, D, B, I, M, te), M.onAfterRender(E, D, O, B, I, te);
    }
    function ti(M, D, O) {
      D.isScene !== !0 && (D = Re);
      const B = Ae.get(M), I = f.state.lights, te = f.state.shadowsArray, ae = I.state.version, de = $.getParameters(M, I.state, te, D, O), fe = $.getProgramCacheKey(de);
      let Se = B.programs;
      B.environment = M.isMeshStandardMaterial ? D.environment : null, B.fog = D.fog, B.envMap = (M.isMeshStandardMaterial ? g : A).get(M.envMap || B.environment), B.envMapRotation = B.environment !== null && M.envMap === null ? D.environmentRotation : M.envMapRotation, Se === void 0 && (M.addEventListener("dispose", Me), Se = /* @__PURE__ */ new Map(), B.programs = Se);
      let ye = Se.get(fe);
      if (ye !== void 0) {
        if (B.currentProgram === ye && B.lightsStateVersion === ae)
          return Ir(M, de), ye;
      } else
        de.uniforms = $.getUniforms(M), M.onBeforeCompile(de, E), ye = $.acquireProgram(de, fe), Se.set(fe, ye), B.uniforms = de.uniforms;
      const _e = B.uniforms;
      return (!M.isShaderMaterial && !M.isRawShaderMaterial || M.clipping === !0) && (_e.clippingPlanes = Ce.uniform), Ir(M, de), B.needsLights = ha(M), B.lightsStateVersion = ae, B.needsLights && (_e.ambientLightColor.value = I.state.ambient, _e.lightProbe.value = I.state.probe, _e.directionalLights.value = I.state.directional, _e.directionalLightShadows.value = I.state.directionalShadow, _e.spotLights.value = I.state.spot, _e.spotLightShadows.value = I.state.spotShadow, _e.rectAreaLights.value = I.state.rectArea, _e.ltc_1.value = I.state.rectAreaLTC1, _e.ltc_2.value = I.state.rectAreaLTC2, _e.pointLights.value = I.state.point, _e.pointLightShadows.value = I.state.pointShadow, _e.hemisphereLights.value = I.state.hemi, _e.directionalShadowMap.value = I.state.directionalShadowMap, _e.directionalShadowMatrix.value = I.state.directionalShadowMatrix, _e.spotShadowMap.value = I.state.spotShadowMap, _e.spotLightMatrix.value = I.state.spotLightMatrix, _e.spotLightMap.value = I.state.spotLightMap, _e.pointShadowMap.value = I.state.pointShadowMap, _e.pointShadowMatrix.value = I.state.pointShadowMatrix), B.currentProgram = ye, B.uniformsList = null, ye;
    }
    function Ur(M) {
      if (M.uniformsList === null) {
        const D = M.currentProgram.getUniforms();
        M.uniformsList = wi.seqWithValue(D.seq, M.uniforms);
      }
      return M.uniformsList;
    }
    function Ir(M, D) {
      const O = Ae.get(M);
      O.outputColorSpace = D.outputColorSpace, O.batching = D.batching, O.batchingColor = D.batchingColor, O.instancing = D.instancing, O.instancingColor = D.instancingColor, O.instancingMorph = D.instancingMorph, O.skinning = D.skinning, O.morphTargets = D.morphTargets, O.morphNormals = D.morphNormals, O.morphColors = D.morphColors, O.morphTargetsCount = D.morphTargetsCount, O.numClippingPlanes = D.numClippingPlanes, O.numIntersection = D.numClipIntersection, O.vertexAlphas = D.vertexAlphas, O.vertexTangents = D.vertexTangents, O.toneMapping = D.toneMapping;
    }
    function ca(M, D, O, B, I) {
      D.isScene !== !0 && (D = Re), we.resetTextureUnits();
      const te = D.fog, ae = B.isMeshStandardMaterial ? D.environment : null, de = P === null ? E.outputColorSpace : P.isXRRenderTarget === !0 ? P.texture.colorSpace : rn, fe = (B.isMeshStandardMaterial ? g : A).get(B.envMap || ae), Se = B.vertexColors === !0 && !!O.attributes.color && O.attributes.color.itemSize === 4, ye = !!O.attributes.tangent && (!!B.normalMap || B.anisotropy > 0), _e = !!O.morphAttributes.position, ze = !!O.morphAttributes.normal, Ze = !!O.morphAttributes.color;
      let je = 0;
      B.toneMapped && (P === null || P.isXRRenderTarget === !0) && (je = E.toneMapping);
      const Mt = O.morphAttributes.position || O.morphAttributes.normal || O.morphAttributes.color, He = Mt !== void 0 ? Mt.length : 0, ge = Ae.get(B), ct = f.state.lights;
      if (W === !0 && (J === !0 || M !== S)) {
        const At = M === S && B.id === T;
        Ce.setState(B, M, At);
      }
      let Ve = !1;
      B.version === ge.__version ? (ge.needsLights && ge.lightsStateVersion !== ct.state.version || ge.outputColorSpace !== de || I.isBatchedMesh && ge.batching === !1 || !I.isBatchedMesh && ge.batching === !0 || I.isBatchedMesh && ge.batchingColor === !0 && I.colorTexture === null || I.isBatchedMesh && ge.batchingColor === !1 && I.colorTexture !== null || I.isInstancedMesh && ge.instancing === !1 || !I.isInstancedMesh && ge.instancing === !0 || I.isSkinnedMesh && ge.skinning === !1 || !I.isSkinnedMesh && ge.skinning === !0 || I.isInstancedMesh && ge.instancingColor === !0 && I.instanceColor === null || I.isInstancedMesh && ge.instancingColor === !1 && I.instanceColor !== null || I.isInstancedMesh && ge.instancingMorph === !0 && I.morphTexture === null || I.isInstancedMesh && ge.instancingMorph === !1 && I.morphTexture !== null || ge.envMap !== fe || B.fog === !0 && ge.fog !== te || ge.numClippingPlanes !== void 0 && (ge.numClippingPlanes !== Ce.numPlanes || ge.numIntersection !== Ce.numIntersection) || ge.vertexAlphas !== Se || ge.vertexTangents !== ye || ge.morphTargets !== _e || ge.morphNormals !== ze || ge.morphColors !== Ze || ge.toneMapping !== je || ge.morphTargetsCount !== He) && (Ve = !0) : (Ve = !0, ge.__version = B.version);
      let Rt = ge.currentProgram;
      Ve === !0 && (Rt = ti(B, D, I));
      let gn = !1, St = !1, zi = !1;
      const nt = Rt.getUniforms(), qt = ge.uniforms;
      if (ve.useProgram(Rt.program) && (gn = !0, St = !0, zi = !0), B.id !== T && (T = B.id, St = !0), gn || S !== M) {
        nt.setValue(w, "projectionMatrix", M.projectionMatrix), nt.setValue(w, "viewMatrix", M.matrixWorldInverse);
        const At = nt.map.cameraPosition;
        At !== void 0 && At.setValue(w, le.setFromMatrixPosition(M.matrixWorld)), qe.logarithmicDepthBuffer && nt.setValue(
          w,
          "logDepthBufFC",
          2 / (Math.log(M.far + 1) / Math.LN2)
        ), (B.isMeshPhongMaterial || B.isMeshToonMaterial || B.isMeshLambertMaterial || B.isMeshBasicMaterial || B.isMeshStandardMaterial || B.isShaderMaterial) && nt.setValue(w, "isOrthographic", M.isOrthographicCamera === !0), S !== M && (S = M, St = !0, zi = !0);
      }
      if (I.isSkinnedMesh) {
        nt.setOptional(w, I, "bindMatrix"), nt.setOptional(w, I, "bindMatrixInverse");
        const At = I.skeleton;
        At && (At.boneTexture === null && At.computeBoneTexture(), nt.setValue(w, "boneTexture", At.boneTexture, we));
      }
      I.isBatchedMesh && (nt.setOptional(w, I, "batchingTexture"), nt.setValue(w, "batchingTexture", I._matricesTexture, we), nt.setOptional(w, I, "batchingIdTexture"), nt.setValue(w, "batchingIdTexture", I._indirectTexture, we), nt.setOptional(w, I, "batchingColorTexture"), I._colorsTexture !== null && nt.setValue(w, "batchingColorTexture", I._colorsTexture, we));
      const Hi = O.morphAttributes;
      if ((Hi.position !== void 0 || Hi.normal !== void 0 || Hi.color !== void 0) && Ne.update(I, O, Rt), (St || ge.receiveShadow !== I.receiveShadow) && (ge.receiveShadow = I.receiveShadow, nt.setValue(w, "receiveShadow", I.receiveShadow)), B.isMeshGouraudMaterial && B.envMap !== null && (qt.envMap.value = fe, qt.flipEnvMap.value = fe.isCubeTexture && fe.isRenderTargetTexture === !1 ? -1 : 1), B.isMeshStandardMaterial && B.envMap === null && D.environment !== null && (qt.envMapIntensity.value = D.environmentIntensity), St && (nt.setValue(w, "toneMappingExposure", E.toneMappingExposure), ge.needsLights && ua(qt, zi), te && B.fog === !0 && xe.refreshFogUniforms(qt, te), xe.refreshMaterialUniforms(qt, B, j, V, f.state.transmissionRenderTarget[M.id]), wi.upload(w, Ur(ge), qt, we)), B.isShaderMaterial && B.uniformsNeedUpdate === !0 && (wi.upload(w, Ur(ge), qt, we), B.uniformsNeedUpdate = !1), B.isSpriteMaterial && nt.setValue(w, "center", I.center), nt.setValue(w, "modelViewMatrix", I.modelViewMatrix), nt.setValue(w, "normalMatrix", I.normalMatrix), nt.setValue(w, "modelMatrix", I.matrixWorld), B.isShaderMaterial || B.isRawShaderMaterial) {
        const At = B.uniformsGroups;
        for (let Vi = 0, da = At.length; Vi < da; Vi++) {
          const Fr = At[Vi];
          Ke.update(Fr, Rt), Ke.bind(Fr, Rt);
        }
      }
      return Rt;
    }
    function ua(M, D) {
      M.ambientLightColor.needsUpdate = D, M.lightProbe.needsUpdate = D, M.directionalLights.needsUpdate = D, M.directionalLightShadows.needsUpdate = D, M.pointLights.needsUpdate = D, M.pointLightShadows.needsUpdate = D, M.spotLights.needsUpdate = D, M.spotLightShadows.needsUpdate = D, M.rectAreaLights.needsUpdate = D, M.hemisphereLights.needsUpdate = D;
    }
    function ha(M) {
      return M.isMeshLambertMaterial || M.isMeshToonMaterial || M.isMeshPhongMaterial || M.isMeshStandardMaterial || M.isShadowMaterial || M.isShaderMaterial && M.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return F;
    }, this.getActiveMipmapLevel = function() {
      return R;
    }, this.getRenderTarget = function() {
      return P;
    }, this.setRenderTargetTextures = function(M, D, O) {
      Ae.get(M.texture).__webglTexture = D, Ae.get(M.depthTexture).__webglTexture = O;
      const B = Ae.get(M);
      B.__hasExternalTextures = !0, B.__autoAllocateDepthBuffer = O === void 0, B.__autoAllocateDepthBuffer || We.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), B.__useRenderToTexture = !1);
    }, this.setRenderTargetFramebuffer = function(M, D) {
      const O = Ae.get(M);
      O.__webglFramebuffer = D, O.__useDefaultFramebuffer = D === void 0;
    }, this.setRenderTarget = function(M, D = 0, O = 0) {
      P = M, F = D, R = O;
      let B = !0, I = null, te = !1, ae = !1;
      if (M) {
        const fe = Ae.get(M);
        if (fe.__useDefaultFramebuffer !== void 0)
          ve.bindFramebuffer(w.FRAMEBUFFER, null), B = !1;
        else if (fe.__webglFramebuffer === void 0)
          we.setupRenderTarget(M);
        else if (fe.__hasExternalTextures)
          we.rebindTextures(M, Ae.get(M.texture).__webglTexture, Ae.get(M.depthTexture).__webglTexture);
        else if (M.depthBuffer) {
          const _e = M.depthTexture;
          if (fe.__boundDepthTexture !== _e) {
            if (_e !== null && Ae.has(_e) && (M.width !== _e.image.width || M.height !== _e.image.height))
              throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            we.setupDepthRenderbuffer(M);
          }
        }
        const Se = M.texture;
        (Se.isData3DTexture || Se.isDataArrayTexture || Se.isCompressedArrayTexture) && (ae = !0);
        const ye = Ae.get(M).__webglFramebuffer;
        M.isWebGLCubeRenderTarget ? (Array.isArray(ye[D]) ? I = ye[D][O] : I = ye[D], te = !0) : M.samples > 0 && we.useMultisampledRTT(M) === !1 ? I = Ae.get(M).__webglMultisampledFramebuffer : Array.isArray(ye) ? I = ye[O] : I = ye, v.copy(M.viewport), C.copy(M.scissor), G = M.scissorTest;
      } else
        v.copy(ue).multiplyScalar(j).floor(), C.copy(me).multiplyScalar(j).floor(), G = Fe;
      if (ve.bindFramebuffer(w.FRAMEBUFFER, I) && B && ve.drawBuffers(M, I), ve.viewport(v), ve.scissor(C), ve.setScissorTest(G), te) {
        const fe = Ae.get(M.texture);
        w.framebufferTexture2D(w.FRAMEBUFFER, w.COLOR_ATTACHMENT0, w.TEXTURE_CUBE_MAP_POSITIVE_X + D, fe.__webglTexture, O);
      } else if (ae) {
        const fe = Ae.get(M.texture), Se = D || 0;
        w.framebufferTextureLayer(w.FRAMEBUFFER, w.COLOR_ATTACHMENT0, fe.__webglTexture, O || 0, Se);
      }
      T = -1;
    }, this.readRenderTargetPixels = function(M, D, O, B, I, te, ae) {
      if (!(M && M.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let de = Ae.get(M).__webglFramebuffer;
      if (M.isWebGLCubeRenderTarget && ae !== void 0 && (de = de[ae]), de) {
        ve.bindFramebuffer(w.FRAMEBUFFER, de);
        try {
          const fe = M.texture, Se = fe.format, ye = fe.type;
          if (!qe.textureFormatReadable(Se)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!qe.textureTypeReadable(ye)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          D >= 0 && D <= M.width - B && O >= 0 && O <= M.height - I && w.readPixels(D, O, B, I, be.convert(Se), be.convert(ye), te);
        } finally {
          const fe = P !== null ? Ae.get(P).__webglFramebuffer : null;
          ve.bindFramebuffer(w.FRAMEBUFFER, fe);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(M, D, O, B, I, te, ae) {
      if (!(M && M.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let de = Ae.get(M).__webglFramebuffer;
      if (M.isWebGLCubeRenderTarget && ae !== void 0 && (de = de[ae]), de) {
        ve.bindFramebuffer(w.FRAMEBUFFER, de);
        try {
          const fe = M.texture, Se = fe.format, ye = fe.type;
          if (!qe.textureFormatReadable(Se))
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
          if (!qe.textureTypeReadable(ye))
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
          if (D >= 0 && D <= M.width - B && O >= 0 && O <= M.height - I) {
            const _e = w.createBuffer();
            w.bindBuffer(w.PIXEL_PACK_BUFFER, _e), w.bufferData(w.PIXEL_PACK_BUFFER, te.byteLength, w.STREAM_READ), w.readPixels(D, O, B, I, be.convert(Se), be.convert(ye), 0), w.flush();
            const ze = w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE, 0);
            await ma(w, ze, 4);
            try {
              w.bindBuffer(w.PIXEL_PACK_BUFFER, _e), w.getBufferSubData(w.PIXEL_PACK_BUFFER, 0, te);
            } finally {
              w.deleteBuffer(_e), w.deleteSync(ze);
            }
            return te;
          }
        } finally {
          const fe = P !== null ? Ae.get(P).__webglFramebuffer : null;
          ve.bindFramebuffer(w.FRAMEBUFFER, fe);
        }
      }
    }, this.copyFramebufferToTexture = function(M, D = null, O = 0) {
      M.isTexture !== !0 && (Zn("WebGLRenderer: copyFramebufferToTexture function signature has changed."), D = arguments[0] || null, M = arguments[1]);
      const B = Math.pow(2, -O), I = Math.floor(M.image.width * B), te = Math.floor(M.image.height * B), ae = D !== null ? D.x : 0, de = D !== null ? D.y : 0;
      we.setTexture2D(M, 0), w.copyTexSubImage2D(w.TEXTURE_2D, O, 0, 0, ae, de, I, te), ve.unbindTexture();
    }, this.copyTextureToTexture = function(M, D, O = null, B = null, I = 0) {
      M.isTexture !== !0 && (Zn("WebGLRenderer: copyTextureToTexture function signature has changed."), B = arguments[0] || null, M = arguments[1], D = arguments[2], I = arguments[3] || 0, O = null);
      let te, ae, de, fe, Se, ye;
      O !== null ? (te = O.max.x - O.min.x, ae = O.max.y - O.min.y, de = O.min.x, fe = O.min.y) : (te = M.image.width, ae = M.image.height, de = 0, fe = 0), B !== null ? (Se = B.x, ye = B.y) : (Se = 0, ye = 0);
      const _e = be.convert(D.format), ze = be.convert(D.type);
      we.setTexture2D(D, 0), w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL, D.flipY), w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL, D.premultiplyAlpha), w.pixelStorei(w.UNPACK_ALIGNMENT, D.unpackAlignment);
      const Ze = w.getParameter(w.UNPACK_ROW_LENGTH), je = w.getParameter(w.UNPACK_IMAGE_HEIGHT), Mt = w.getParameter(w.UNPACK_SKIP_PIXELS), He = w.getParameter(w.UNPACK_SKIP_ROWS), ge = w.getParameter(w.UNPACK_SKIP_IMAGES), ct = M.isCompressedTexture ? M.mipmaps[I] : M.image;
      w.pixelStorei(w.UNPACK_ROW_LENGTH, ct.width), w.pixelStorei(w.UNPACK_IMAGE_HEIGHT, ct.height), w.pixelStorei(w.UNPACK_SKIP_PIXELS, de), w.pixelStorei(w.UNPACK_SKIP_ROWS, fe), M.isDataTexture ? w.texSubImage2D(w.TEXTURE_2D, I, Se, ye, te, ae, _e, ze, ct.data) : M.isCompressedTexture ? w.compressedTexSubImage2D(w.TEXTURE_2D, I, Se, ye, ct.width, ct.height, _e, ct.data) : w.texSubImage2D(w.TEXTURE_2D, I, Se, ye, te, ae, _e, ze, ct), w.pixelStorei(w.UNPACK_ROW_LENGTH, Ze), w.pixelStorei(w.UNPACK_IMAGE_HEIGHT, je), w.pixelStorei(w.UNPACK_SKIP_PIXELS, Mt), w.pixelStorei(w.UNPACK_SKIP_ROWS, He), w.pixelStorei(w.UNPACK_SKIP_IMAGES, ge), I === 0 && D.generateMipmaps && w.generateMipmap(w.TEXTURE_2D), ve.unbindTexture();
    }, this.copyTextureToTexture3D = function(M, D, O = null, B = null, I = 0) {
      M.isTexture !== !0 && (Zn("WebGLRenderer: copyTextureToTexture3D function signature has changed."), O = arguments[0] || null, B = arguments[1] || null, M = arguments[2], D = arguments[3], I = arguments[4] || 0);
      let te, ae, de, fe, Se, ye, _e, ze, Ze;
      const je = M.isCompressedTexture ? M.mipmaps[I] : M.image;
      O !== null ? (te = O.max.x - O.min.x, ae = O.max.y - O.min.y, de = O.max.z - O.min.z, fe = O.min.x, Se = O.min.y, ye = O.min.z) : (te = je.width, ae = je.height, de = je.depth, fe = 0, Se = 0, ye = 0), B !== null ? (_e = B.x, ze = B.y, Ze = B.z) : (_e = 0, ze = 0, Ze = 0);
      const Mt = be.convert(D.format), He = be.convert(D.type);
      let ge;
      if (D.isData3DTexture)
        we.setTexture3D(D, 0), ge = w.TEXTURE_3D;
      else if (D.isDataArrayTexture || D.isCompressedArrayTexture)
        we.setTexture2DArray(D, 0), ge = w.TEXTURE_2D_ARRAY;
      else {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
        return;
      }
      w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL, D.flipY), w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL, D.premultiplyAlpha), w.pixelStorei(w.UNPACK_ALIGNMENT, D.unpackAlignment);
      const ct = w.getParameter(w.UNPACK_ROW_LENGTH), Ve = w.getParameter(w.UNPACK_IMAGE_HEIGHT), Rt = w.getParameter(w.UNPACK_SKIP_PIXELS), gn = w.getParameter(w.UNPACK_SKIP_ROWS), St = w.getParameter(w.UNPACK_SKIP_IMAGES);
      w.pixelStorei(w.UNPACK_ROW_LENGTH, je.width), w.pixelStorei(w.UNPACK_IMAGE_HEIGHT, je.height), w.pixelStorei(w.UNPACK_SKIP_PIXELS, fe), w.pixelStorei(w.UNPACK_SKIP_ROWS, Se), w.pixelStorei(w.UNPACK_SKIP_IMAGES, ye), M.isDataTexture || M.isData3DTexture ? w.texSubImage3D(ge, I, _e, ze, Ze, te, ae, de, Mt, He, je.data) : D.isCompressedArrayTexture ? w.compressedTexSubImage3D(ge, I, _e, ze, Ze, te, ae, de, Mt, je.data) : w.texSubImage3D(ge, I, _e, ze, Ze, te, ae, de, Mt, He, je), w.pixelStorei(w.UNPACK_ROW_LENGTH, ct), w.pixelStorei(w.UNPACK_IMAGE_HEIGHT, Ve), w.pixelStorei(w.UNPACK_SKIP_PIXELS, Rt), w.pixelStorei(w.UNPACK_SKIP_ROWS, gn), w.pixelStorei(w.UNPACK_SKIP_IMAGES, St), I === 0 && D.generateMipmaps && w.generateMipmap(ge), ve.unbindTexture();
    }, this.initRenderTarget = function(M) {
      Ae.get(M).__webglFramebuffer === void 0 && we.setupRenderTarget(M);
    }, this.initTexture = function(M) {
      M.isCubeTexture ? we.setTextureCube(M, 0) : M.isData3DTexture ? we.setTexture3D(M, 0) : M.isDataArrayTexture || M.isCompressedArrayTexture ? we.setTexture2DArray(M, 0) : we.setTexture2D(M, 0), ve.unbindTexture();
    }, this.resetState = function() {
      F = 0, R = 0, P = null, ve.reset(), De.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return 2e3;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorSpace = e === Tr ? "display-p3" : "srgb", t.unpackColorSpace = ke.workingColorSpace === Fi ? "display-p3" : "srgb";
  }
}
class bh extends ut {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Nt(), this.environmentIntensity = 1, this.environmentRotation = new Nt(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}
class aa extends Gn {
  constructor(e) {
    super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new Ie(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this;
  }
}
const Ui = /* @__PURE__ */ new N(), Ii = /* @__PURE__ */ new N(), bs = /* @__PURE__ */ new Je(), Kn = /* @__PURE__ */ new Ws(), Ti = /* @__PURE__ */ new Ni(), _r = /* @__PURE__ */ new N(), Rs = /* @__PURE__ */ new N();
class Rh extends ut {
  constructor(e = new Ot(), t = new aa()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, n = [0];
      for (let r = 1, s = t.count; r < s; r++)
        Ui.fromBufferAttribute(t, r - 1), Ii.fromBufferAttribute(t, r), n[r] = n[r - 1], n[r] += Ui.distanceTo(Ii);
      e.setAttribute("lineDistance", new xt(n, 1));
    } else
      console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(e, t) {
    const n = this.geometry, r = this.matrixWorld, s = e.params.Line.threshold, a = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), Ti.copy(n.boundingSphere), Ti.applyMatrix4(r), Ti.radius += s, e.ray.intersectsSphere(Ti) === !1) return;
    bs.copy(r).invert(), Kn.copy(e.ray).applyMatrix4(bs);
    const o = s / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = o * o, c = this.isLineSegments ? 2 : 1, u = n.index, d = n.attributes.position;
    if (u !== null) {
      const m = Math.max(0, a.start), _ = Math.min(u.count, a.start + a.count);
      for (let x = m, f = _ - 1; x < f; x += c) {
        const h = u.getX(x), b = u.getX(x + 1), E = Ai(this, e, Kn, l, h, b);
        E && t.push(E);
      }
      if (this.isLineLoop) {
        const x = u.getX(_ - 1), f = u.getX(m), h = Ai(this, e, Kn, l, x, f);
        h && t.push(h);
      }
    } else {
      const m = Math.max(0, a.start), _ = Math.min(d.count, a.start + a.count);
      for (let x = m, f = _ - 1; x < f; x += c) {
        const h = Ai(this, e, Kn, l, x, x + 1);
        h && t.push(h);
      }
      if (this.isLineLoop) {
        const x = Ai(this, e, Kn, l, _ - 1, m);
        x && t.push(x);
      }
    }
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const r = t[n[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, a = r.length; s < a; s++) {
          const o = r[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s;
        }
      }
    }
  }
}
function Ai(i, e, t, n, r, s) {
  const a = i.geometry.attributes.position;
  if (Ui.fromBufferAttribute(a, r), Ii.fromBufferAttribute(a, s), t.distanceSqToSegment(Ui, Ii, _r, Rs) > n) return;
  _r.applyMatrix4(i.matrixWorld);
  const l = e.ray.origin.distanceTo(_r);
  if (!(l < e.near || l > e.far))
    return {
      distance: l,
      // What do we want? intersection point on the ray or on the segment??
      // point: raycaster.ray.at( distance ),
      point: Rs.clone().applyMatrix4(i.matrixWorld),
      index: r,
      face: null,
      faceIndex: null,
      object: i
    };
}
const ws = /* @__PURE__ */ new N(), Cs = /* @__PURE__ */ new N();
class wh extends Rh {
  constructor(e, t) {
    super(e, t), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, n = [];
      for (let r = 0, s = t.count; r < s; r += 2)
        ws.fromBufferAttribute(t, r), Cs.fromBufferAttribute(t, r + 1), n[r] = r === 0 ? 0 : n[r - 1], n[r + 1] = n[r] + ws.distanceTo(Cs);
      e.setAttribute("lineDistance", new xt(n, 1));
    } else
      console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class Bi extends Ot {
  constructor(e = 1, t = 1, n = 1, r = 32, s = 1, a = !1, o = 0, l = Math.PI * 2) {
    super(), this.type = "CylinderGeometry", this.parameters = {
      radiusTop: e,
      radiusBottom: t,
      height: n,
      radialSegments: r,
      heightSegments: s,
      openEnded: a,
      thetaStart: o,
      thetaLength: l
    };
    const c = this;
    r = Math.floor(r), s = Math.floor(s);
    const u = [], p = [], d = [], m = [];
    let _ = 0;
    const x = [], f = n / 2;
    let h = 0;
    b(), a === !1 && (e > 0 && E(!0), t > 0 && E(!1)), this.setIndex(u), this.setAttribute("position", new xt(p, 3)), this.setAttribute("normal", new xt(d, 3)), this.setAttribute("uv", new xt(m, 2));
    function b() {
      const y = new N(), F = new N();
      let R = 0;
      const P = (t - e) / n;
      for (let T = 0; T <= s; T++) {
        const S = [], v = T / s, C = v * (t - e) + e;
        for (let G = 0; G <= r; G++) {
          const U = G / r, H = U * l + o, q = Math.sin(H), V = Math.cos(H);
          F.x = C * q, F.y = -v * n + f, F.z = C * V, p.push(F.x, F.y, F.z), y.set(q, P, V).normalize(), d.push(y.x, y.y, y.z), m.push(U, 1 - v), S.push(_++);
        }
        x.push(S);
      }
      for (let T = 0; T < r; T++)
        for (let S = 0; S < s; S++) {
          const v = x[S][T], C = x[S + 1][T], G = x[S + 1][T + 1], U = x[S][T + 1];
          u.push(v, C, U), u.push(C, G, U), R += 6;
        }
      c.addGroup(h, R, 0), h += R;
    }
    function E(y) {
      const F = _, R = new Oe(), P = new N();
      let T = 0;
      const S = y === !0 ? e : t, v = y === !0 ? 1 : -1;
      for (let G = 1; G <= r; G++)
        p.push(0, f * v, 0), d.push(0, v, 0), m.push(0.5, 0.5), _++;
      const C = _;
      for (let G = 0; G <= r; G++) {
        const H = G / r * l + o, q = Math.cos(H), V = Math.sin(H);
        P.x = S * V, P.y = f * v, P.z = S * q, p.push(P.x, P.y, P.z), d.push(0, v, 0), R.x = q * 0.5 + 0.5, R.y = V * 0.5 * v + 0.5, m.push(R.x, R.y), _++;
      }
      for (let G = 0; G < r; G++) {
        const U = F + G, H = C + G;
        y === !0 ? u.push(H, H + 1, U) : u.push(H + 1, H, U), T += 3;
      }
      c.addGroup(h, T, y === !0 ? 1 : 2), h += T;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Bi(e.radiusTop, e.radiusBottom, e.height, e.radialSegments, e.heightSegments, e.openEnded, e.thetaStart, e.thetaLength);
  }
}
class Rr extends Bi {
  constructor(e = 1, t = 1, n = 32, r = 1, s = !1, a = 0, o = Math.PI * 2) {
    super(0, e, t, n, r, s, a, o), this.type = "ConeGeometry", this.parameters = {
      radius: e,
      height: t,
      radialSegments: n,
      heightSegments: r,
      openEnded: s,
      thetaStart: a,
      thetaLength: o
    };
  }
  static fromJSON(e) {
    return new Rr(e.radius, e.height, e.radialSegments, e.heightSegments, e.openEnded, e.thetaStart, e.thetaLength);
  }
}
class bi extends Gn {
  constructor(e) {
    super(), this.isMeshStandardMaterial = !0, this.defines = { STANDARD: "" }, this.type = "MeshStandardMaterial", this.color = new Ie(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Ie(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new Oe(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Nt(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
class oa extends ut {
  constructor(e, t = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Ie(e), this.intensity = t;
  }
  dispose() {
  }
  copy(e, t) {
    return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, this.groundColor !== void 0 && (t.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (t.object.distance = this.distance), this.angle !== void 0 && (t.object.angle = this.angle), this.decay !== void 0 && (t.object.decay = this.decay), this.penumbra !== void 0 && (t.object.penumbra = this.penumbra), this.shadow !== void 0 && (t.object.shadow = this.shadow.toJSON()), this.target !== void 0 && (t.object.target = this.target.uuid), t;
  }
}
const gr = /* @__PURE__ */ new Je(), Ps = /* @__PURE__ */ new N(), Ls = /* @__PURE__ */ new N();
class Ch {
  constructor(e) {
    this.camera = e, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new Oe(512, 512), this.map = null, this.mapPass = null, this.matrix = new Je(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Ar(), this._frameExtents = new Oe(1, 1), this._viewportCount = 1, this._viewports = [
      new rt(0, 0, 1, 1)
    ];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(e) {
    const t = this.camera, n = this.matrix;
    Ps.setFromMatrixPosition(e.matrixWorld), t.position.copy(Ps), Ls.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(Ls), t.updateMatrixWorld(), gr.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(gr), n.set(
      0.5,
      0,
      0,
      0.5,
      0,
      0.5,
      0,
      0.5,
      0,
      0,
      0.5,
      0.5,
      0,
      0,
      0,
      1
    ), n.multiply(gr);
  }
  getViewport(e) {
    return this._viewports[e];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(e) {
    return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.mapSize.copy(e.mapSize), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const e = {};
    return this.intensity !== 1 && (e.intensity = this.intensity), this.bias !== 0 && (e.bias = this.bias), this.normalBias !== 0 && (e.normalBias = this.normalBias), this.radius !== 1 && (e.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
  }
}
class Ph extends Ch {
  constructor() {
    super(new ea(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class Lh extends oa {
  constructor(e, t) {
    super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(ut.DEFAULT_UP), this.updateMatrix(), this.target = new ut(), this.shadow = new Ph();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e) {
    return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
}
class Dh extends oa {
  constructor(e, t) {
    super(e, t), this.isAmbientLight = !0, this.type = "AmbientLight";
  }
}
class Uh extends wh {
  constructor(e = 10, t = 10, n = 4473924, r = 8947848) {
    n = new Ie(n), r = new Ie(r);
    const s = t / 2, a = e / t, o = e / 2, l = [], c = [];
    for (let d = 0, m = 0, _ = -o; d <= t; d++, _ += a) {
      l.push(-o, 0, _, o, 0, _), l.push(_, 0, -o, _, 0, o);
      const x = d === s ? n : r;
      x.toArray(c, m), m += 3, x.toArray(c, m), m += 3, x.toArray(c, m), m += 3, x.toArray(c, m), m += 3;
    }
    const u = new Ot();
    u.setAttribute("position", new xt(l, 3)), u.setAttribute("color", new xt(c, 3));
    const p = new aa({ vertexColors: !0, toneMapped: !1 });
    super(u, p), this.type = "GridHelper";
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: yr
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = yr);
function Ih(i) {
  let e = i;
  return function() {
    e |= 0, e = e + 1831565813 | 0;
    let t = Math.imul(e ^ e >>> 15, 1 | e);
    return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function Ds(i) {
  const { seed: e, length: t, width: n, density: r, sizeVariance: s } = i, a = Ih(e), o = [], l = 1 / r;
  let c = l * (0.5 + a());
  for (; c < t; ) {
    const u = a() < 0.5 ? "pole" : "box", p = (a() - 0.5) * n * 0.9, d = 1 + (a() - 0.5) * 2 * s;
    u === "pole" ? o.push({
      type: u,
      x: p,
      z: c,
      radius: 0.4 * d,
      height: 3 * d
    }) : o.push({
      type: u,
      x: p,
      z: c,
      width: 0.8 * d,
      depth: 0.8 * d,
      height: 2 * d
    }), c += l * (0.4 + a() * 1.6);
  }
  return o;
}
function Us() {
  return { x: 0, z: 0, lateralVel: 0 };
}
function Fh(i, e, t, n) {
  i.lateralVel += e * 4 * t, i.lateralVel *= Math.max(0, 1 - n.lateralDamping * t), i.x += i.lateralVel * t, i.z += n.speed * t;
}
const Nh = 0.3;
function Oh(i) {
  return i.type === "pole" ? i.radius : Math.hypot(i.width, i.depth) / 2;
}
function Bh(i, e, t) {
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (Math.hypot(i - r.x, e - r.z) < Oh(r) + Nh)
      return n;
  }
  return null;
}
const Qt = { length: 120, width: 8, density: 0.3, sizeVariance: 0.4 }, Gh = { speed: 4, lateralDamping: 2 }, vr = 1 / 60;
function zh(i) {
  const e = new Ah({ canvas: i, antialias: !0 });
  return e.setPixelRatio(Math.min(window.devicePixelRatio, 2)), e;
}
function Is(i, e, t) {
  const n = new bh();
  n.background = new Ie(15921904);
  const r = new Dh(16777215, 0.7), s = new Lh(16777215, 0.6);
  s.position.set(5, 10, 5), n.add(r, s);
  const a = new gt(
    new Rr(0.3, 0.6, 8),
    new bi({ color: 3355443, flatShading: !0 })
  );
  a.rotation.x = Math.PI / 2, n.add(a);
  const o = new gt(
    new On(t * 3, e),
    new bi({ color: 14606046 })
  );
  o.rotation.x = -Math.PI / 2, o.position.z = e / 2, n.add(o);
  const l = new Uh(Math.max(t * 3, e), 40, 12303291, 14211288);
  l.position.set(0, 0.01, e / 2), n.add(l);
  const c = new bi({ color: 10132122, flatShading: !0 });
  for (const _ of i) {
    const x = _.type === "pole" ? new gt(new Bi(_.radius, _.radius, _.height, 12), c) : new gt(new zn(_.width, _.height, _.depth), c);
    x.position.set(_.x, _.height / 2, _.z), n.add(x);
  }
  const u = new On(e, 4), p = new bi({
    color: 15263974,
    side: 2,
    transparent: !0,
    opacity: 0.15
  }), d = new gt(u, p);
  d.rotation.y = Math.PI / 2, d.position.set(-t / 2, 2, e / 2), n.add(d);
  const m = d.clone();
  return m.position.x = t / 2, n.add(m), { scene: n, droneMesh: a };
}
const Wt = 64, mn = 48, Hh = 90;
function Vh() {
  const i = new Tt(Hh, Wt / mn, 0.05, 200), e = new tn(Wt, mn);
  e.texture.colorSpace = Lt;
  const t = new Uint8Array(Wt * mn * 4);
  return { camera: i, target: e, pixelBuffer: t };
}
function kh(i) {
  const e = i.fov * Math.PI / 180;
  return 2 * Math.atan(Math.tan(e / 2) * i.aspect) * 180 / Math.PI;
}
function Wh(i, e, t, n, r) {
  const { camera: s, target: a } = t;
  s.position.set(n, 0.6, r), s.lookAt(n, 0.6, r + 1), i.setRenderTarget(a), i.render(e, s), i.setRenderTarget(null);
}
async function Xh(i, e, t, n, r) {
  return Wh(i, e, t, n, r), await i.readRenderTargetPixelsAsync(t.target, 0, 0, Wt, mn, t.pixelBuffer), qh(t.pixelBuffer);
}
function qh(i) {
  const e = new Float32Array(Wt * mn);
  for (let t = 0; t < mn; t++)
    for (let n = 0; n < Wt; n++) {
      const r = ((mn - 1 - t) * Wt + (Wt - 1 - n)) * 4;
      e[t * Wt + n] = (0.299 * i[r] + 0.587 * i[r + 1] + 0.114 * i[r + 2]) / 255;
    }
  return e;
}
const pt = 16, _n = 12, Xt = pt * _n, wr = (pt - 1) / 2, Yh = (_n - 1) / 2, Fs = 0.01, Kh = 4, $h = 2567e-7, Zh = 1.7, jh = 42, Jh = 0.52, Qh = 1.45, ed = 1.62, td = {
  // Half of the GF drive at the LPLC2 curve's 42 deg peak, i.e. fire where the published tuning curve is at
  // half maximum (~18 deg object). A rule read off the biology, not a number fitted to our corridors.
  escapeThreshold: 1.23,
  steeringGain: 1,
  evasiveDurationS: 0.3,
  hysteresis: 0.8,
  excessMargin: 1.5,
  componentRatio: 0.35,
  gradientFloorSq: 5e-3
  // normal flow blows up on near-flat cells
}, xr = Float32Array.from(
  { length: Xt },
  (i, e) => Math.hypot(e % pt - wr, (e / pt | 0) - Yh)
);
function Ns(i = {}) {
  return {
    config: { hFovDeg: 90, vFovDeg: 90, rmoEnabled: !0, ...td, ...i },
    state: {
      prevOmm: null,
      prevSizeDeg: 0,
      armed: !0,
      evasiveUntil: -1 / 0,
      simTime: 0
    }
  };
}
function nd(i) {
  const e = Math.max(i, 1e-3), t = Math.log(e) - Math.log(jh);
  return Zh * Math.exp(-(t * t) / (2 * Jh));
}
function id(i) {
  const e = new Float32Array(Xt);
  for (let t = 0; t < i.length; t++)
    e[((t / 64 | 0) >> 2) * pt + (t % 64 >> 2)] += i[t];
  for (let t = 0; t < Xt; t++) e[t] /= 16;
  return e;
}
function Ri(i, e, t) {
  const n = Math.min(Math.max(e, 0), pt - 1), r = Math.min(Math.max(t, 0), _n - 1);
  return i[r * pt + n];
}
function rd(i, e) {
  const t = new Uint8Array(Xt), n = [];
  let r = { cellCount: 0, centroidX: wr, width: 0, height: 0 };
  for (let s = 0; s < Xt; s++) {
    if (t[s] || i[s] <= e) continue;
    n.length = 0, n.push(s), t[s] = 1;
    let a = 0, o = 0, l = pt, c = -1, u = _n, p = -1;
    for (; n.length > 0; ) {
      const d = n.pop(), m = d % pt, _ = d / pt | 0;
      a++, o += m, m < l && (l = m), m > c && (c = m), _ < u && (u = _), _ > p && (p = _);
      for (let x = -1; x <= 1; x++)
        for (let f = -1; f <= 1; f++) {
          const h = m + f, b = _ + x;
          if (h < 0 || b < 0 || h >= pt || b >= _n) continue;
          const E = b * pt + h;
          t[E] || i[E] <= e || (t[E] = 1, n.push(E));
        }
    }
    a > r.cellCount && (r = { cellCount: a, centroidX: o / a, width: c - l + 1, height: p - u + 1 });
  }
  return r;
}
function sd(i, e, t) {
  const { config: n, state: r } = i;
  r.simTime += t;
  const s = id(e);
  if (!r.prevOmm)
    return r.prevOmm = s, { steering: 0, debug: { gfDrive: 0, sizeDeg: 0, rateDegPerSec: 0, escaping: !1 } };
  const a = r.prevOmm, o = new Float32Array(Xt);
  for (let E = 0; E < _n; E++)
    for (let y = 0; y < pt; y++) {
      const F = E * pt + y, R = (Ri(s, y + 1, E) - Ri(s, y - 1, E)) / 2, P = (Ri(s, y, E + 1) - Ri(s, y, E - 1)) / 2, T = R * R + P * P;
      T < n.gradientFloorSq || (o[F] = Math.abs((s[F] - a[F]) / t) / Math.sqrt(T));
    }
  const l = new Float32Array(Xt);
  if (n.rmoEnabled) {
    const E = [];
    for (let F = 0; F < Xt; F++)
      o[F] > Fs && xr[F] >= Kh && E.push(o[F] / xr[F]);
    E.sort((F, R) => F - R);
    const y = E.length > 0 ? E[Math.floor(E.length / 2)] : 0;
    for (let F = 0; F < Xt; F++)
      l[F] = Math.max(0, o[F] - y * xr[F] * n.excessMargin);
  } else
    l.set(o);
  const c = rd(l, Math.max(Fs, n.componentRatio * Math.max(...l))), u = c.width * n.hFovDeg / pt, p = c.height * n.vFovDeg / _n, d = 2 * Math.sqrt(u * p / Math.PI), m = (d - r.prevSizeDeg) / t, _ = Qh * nd(d) + ed * ($h * m);
  let x = r.simTime < r.evasiveUntil;
  r.armed && _ >= n.escapeThreshold ? (r.evasiveUntil = r.simTime + n.evasiveDurationS, r.armed = !1, x = !0) : _ < n.escapeThreshold * n.hysteresis && (r.armed = !0);
  const f = c.centroidX < wr ? 1 : -1, h = Math.max(-1, Math.min(1, n.steeringGain * f * _ / n.escapeThreshold)), b = x ? f : h;
  return r.prevOmm = s, r.prevSizeDeg = d, { steering: b, debug: { gfDrive: _, sizeDeg: d, rateDegPerSec: m, escaping: x } };
}
const Os = 64 * 48, ad = 0.05;
function od(i) {
  const e = new Float32Array(new Uint8Array(i).buffer);
  let t = 0;
  const n = (s) => e.subarray(t, t += s), r = {
    conv1: { w: n(16 * 4 * 25), b: n(16) },
    conv2: { w: n(32 * 16 * 9), b: n(32) },
    conv3: { w: n(16 * 32 * 9), b: n(16) },
    fc1: { w: n(32 * 16 * 6 * 8), b: n(32) },
    fc2: { w: n(32), b: n(1) }
  };
  if (t !== e.length) throw new Error(`cnn weights: expected ${t} floats, got ${e.length}`);
  return r;
}
function Mr(i, e, t, n, r, s) {
  const a = r.b.length, o = t / 2, l = n / 2, c = (s - 1) / 2, u = new Float32Array(a * o * l);
  for (let p = 0; p < a; p++)
    for (let d = 0; d < o; d++)
      for (let m = 0; m < l; m++) {
        let _ = r.b[p];
        for (let x = 0; x < e; x++)
          for (let f = 0; f < s; f++) {
            const h = d * 2 - c + f;
            if (!(h < 0 || h >= t))
              for (let b = 0; b < s; b++) {
                const E = m * 2 - c + b;
                E < 0 || E >= n || (_ += i[(x * t + h) * n + E] * r.w[((p * e + x) * s + f) * s + b]);
              }
          }
        u[(p * o + d) * l + m] = Math.max(0, _);
      }
  return u;
}
function Bs(i, e) {
  const t = new Float32Array(e.b.length);
  for (let n = 0; n < t.length; n++) {
    let r = e.b[n];
    for (let s = 0; s < i.length; s++) r += e.w[n * i.length + s] * i[s];
    t[n] = r;
  }
  return t;
}
function ld(i, e) {
  const t = Mr(e, 4, 48, 64, i.conv1, 5), n = Mr(t, 16, 24, 32, i.conv2, 3), r = Mr(n, 32, 12, 16, i.conv3, 3), s = Bs(r, i.fc1).map((a) => Math.max(0, a));
  return Math.tanh(Bs(s, i.fc2)[0]);
}
function Gs(i) {
  return { weights: i, frames: [], t: 0, nextFrameT: 0, steering: 0 };
}
function cd(i, e, t) {
  const n = i.t >= i.nextFrameT - 1e-6;
  if (i.t += t, !n) return i.steering;
  if (i.nextFrameT += ad, i.frames.push(Float32Array.from(e, (r) => Math.round(r * 255) / 255)), i.frames.length > 4 && i.frames.shift(), i.frames.length === 4) {
    const r = new Float32Array(4 * Os);
    i.frames.forEach((s, a) => r.set(s, a * Os)), i.steering = ld(i.weights, r);
  }
  return i.steering;
}
const zs = 240, ud = 3104720, hd = 7163608, dd = `
.fvc { --fvc-ink: #14161a; --fvc-muted: #6b7280; --fvc-line: #d9d9d4; --fvc-panel: #fff;
  --fvc-fly: #2f5fd0; --fvc-cnn: #6d4ed8; margin: 0; color: var(--fvc-ink); }
@media (prefers-color-scheme: dark) {
  .fvc { --fvc-ink: #e8e8e4; --fvc-muted: #9aa0aa; --fvc-line: #34363b; --fvc-panel: #1b1d21;
    --fvc-fly: #7aa2f7; --fvc-cnn: #a48cf0; }
}
[data-theme="dark"] .fvc { --fvc-ink: #e8e8e4; --fvc-muted: #9aa0aa; --fvc-line: #34363b; --fvc-panel: #1b1d21;
  --fvc-fly: #7aa2f7; --fvc-cnn: #a48cf0; }
[data-theme="light"] .fvc { --fvc-ink: #14161a; --fvc-muted: #6b7280; --fvc-line: #d9d9d4; --fvc-panel: #fff;
  --fvc-fly: #2f5fd0; --fvc-cnn: #6d4ed8; }
.fvc * { box-sizing: border-box; }
.fvc-panels { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.fvc-panel { min-width: 0; }
.fvc-panel.is-hidden { display: none; }
.fvc-head { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; margin-bottom: 6px; }
.fvc-name { font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; }
.fvc-panel[data-who="fly"] .fvc-name { color: var(--fvc-fly); }
.fvc-panel[data-who="cnn"] .fvc-name { color: var(--fvc-cnn); }
.fvc-note { color: var(--fvc-muted); font-size: 12px; }
.fvc-hits { font-variant-numeric: tabular-nums; }
.fvc-stage { position: relative; aspect-ratio: 16 / 10; border: 1px solid var(--fvc-line); background: var(--fvc-panel); }
.fvc-view { width: 100%; height: 100%; display: block; }
.fvc-eye { position: absolute; left: 8px; bottom: 8px; width: 128px; height: 96px; max-width: 45%;
  image-rendering: pixelated; border: 1px solid var(--fvc-line); background: var(--fvc-panel); }
.fvc-eye-label { position: absolute; left: 8px; bottom: 108px; padding: 1px 5px; font-size: 11px;
  color: var(--fvc-muted); background: color-mix(in srgb, var(--fvc-panel) 85%, transparent); }
.fvc-trace { width: 100%; height: 72px; display: block; border: 1px solid var(--fvc-line); border-top: 0;
  background: var(--fvc-panel); }
.fvc-trace-label { margin-top: 6px; font-size: 12px; color: var(--fvc-muted); }
.fvc-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; margin-top: 18px;
  padding-top: 14px; border-top: 1px solid var(--fvc-line); }
.fvc-controls label { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.fvc-controls input[type="range"] { width: 120px; accent-color: var(--fvc-fly); }
.fvc-controls input[type="checkbox"] { accent-color: var(--fvc-fly); }
.fvc button { font: inherit; font-size: 13px; padding: 5px 12px; color: var(--fvc-ink); background: var(--fvc-panel);
  border: 1px solid var(--fvc-line); border-radius: 2px; cursor: pointer; }
.fvc button:hover { border-color: var(--fvc-muted); }
.fvc-val { color: var(--fvc-muted); font-variant-numeric: tabular-nums; min-width: 3.2em; }
.fvc-swap { display: none; }
@media (max-width: 720px) {
  .fvc-panels { grid-template-columns: 1fr; }
  .fvc-swap { display: inline-flex; }
}
`, fd = `
<div class="fvc-panels">
  <section class="fvc-panel" data-who="fly">
    <div class="fvc-head">
      <span class="fvc-name">Fly circuit</span>
      <span class="fvc-note">zero training &middot; <span class="fvc-hits" data-hits>0</span> hits</span>
    </div>
    <div class="fvc-stage">
      <canvas class="fvc-view" data-view></canvas>
      <span class="fvc-eye-label">what it sees</span>
      <canvas class="fvc-eye" data-eye width="64" height="48"></canvas>
    </div>
    <canvas class="fvc-trace" data-trace></canvas>
    <div class="fvc-trace-label">Giant Fiber drive, with escape threshold</div>
  </section>
  <section class="fvc-panel" data-who="cnn">
    <div class="fvc-head">
      <span class="fvc-name">CNN</span>
      <span class="fvc-note">200 training episodes &middot; <span class="fvc-hits" data-hits>0</span> hits</span>
    </div>
    <div class="fvc-stage">
      <canvas class="fvc-view" data-view></canvas>
      <span class="fvc-eye-label">what it sees</span>
      <canvas class="fvc-eye" data-eye width="64" height="48"></canvas>
    </div>
    <canvas class="fvc-trace" data-trace></canvas>
    <div class="fvc-trace-label">steering output</div>
  </section>
</div>
<div class="fvc-controls">
  <button type="button" data-restart>Restart</button>
  <button type="button" data-next-seed>New corridor</button>
  <span class="fvc-note">corridor <span data-seed>1</span></span>
  <label><input type="checkbox" data-rmo checked> motion opponency</label>
  <label>escape threshold
    <input type="range" data-threshold min="0.3" max="2.5" step="0.01" value="1.23">
    <span class="fvc-val" data-threshold-val>1.23</span>
  </label>
  <label>speed
    <input type="range" data-speed min="1" max="8" step="0.5" value="4">
    <span class="fvc-val" data-speed-val>4.0</span>
  </label>
  <button type="button" class="fvc-swap" data-swap>Show CNN</button>
</div>
`;
function pd(i, e = "cnn.bin") {
  i.classList.add("fvc"), i.innerHTML = fd;
  const t = (T, S = i) => S.querySelector(T), n = {
    rmo: t("[data-rmo]"),
    threshold: t("[data-threshold]"),
    speed: t("[data-speed]"),
    seed: t("[data-seed]")
  }, r = { ...Gh };
  function s(T, S) {
    const v = t(`.fvc-panel[data-who="${T}"]`), C = t("[data-view]", v), { scene: G, droneMesh: U } = Is([], Qt.length, Qt.width);
    return U.material.color.set(S), {
      view: C,
      eye: t("[data-eye]", v).getContext("2d"),
      trace: t("[data-trace]", v).getContext("2d"),
      hits: t("[data-hits]", v),
      color: `#${S.toString(16).padStart(6, "0")}`,
      renderer: zh(C),
      chase: new Tt(60, 16 / 10, 0.1, 300),
      droneCam: Vh(),
      scene: G,
      droneMesh: U,
      drone: Us(),
      samples: [],
      collisions: 0,
      lastHit: null
    };
  }
  const a = { fly: s("fly", ud), cnn: s("cnn", hd) };
  let o = 1, l = Ds({ seed: o, ...Qt }), c = Ns({}), u = null;
  function p() {
    l = Ds({ seed: o, ...Qt }), n.seed.textContent = String(o);
    for (const T of Object.values(a)) {
      const { scene: S, droneMesh: v } = Is(l, Qt.length, Qt.width);
      v.material.color.set(T.color), T.scene = S, T.droneMesh = v, T.renderer.compileAsync(S, T.chase), T.renderer.setRenderTarget(T.droneCam.target), T.renderer.compileAsync(S, T.droneCam.camera), T.renderer.setRenderTarget(null);
    }
    d();
  }
  function d() {
    for (const T of Object.values(a))
      T.drone = Us(), T.samples = [], T.collisions = 0, T.lastHit = null, T.hits.textContent = "0";
    c = Ns({
      hFovDeg: kh(a.fly.droneCam.camera),
      vFovDeg: a.fly.droneCam.camera.fov,
      rmoEnabled: n.rmo.checked,
      escapeThreshold: Number(n.threshold.value)
    }), u && (u = Gs(u.weights));
  }
  function m(T, S) {
    const v = T.eye.createImageData(64, 48);
    for (let C = 0; C < S.length; C++) {
      const G = Math.round(S[C] * 255);
      v.data.set([G, G, G, 255], C * 4);
    }
    T.eye.putImageData(v, 0, 0);
  }
  function _(T, S, v, C, G) {
    const { trace: U } = T;
    U.canvas.width !== U.canvas.clientWidth && (U.canvas.width = U.canvas.clientWidth, U.canvas.height = U.canvas.clientHeight);
    const { width: H, height: q } = U.canvas;
    T.samples.push(S), T.samples.length > zs && T.samples.shift();
    const V = (j) => q - (j - C) / (v - C) * q;
    U.clearRect(0, 0, H, q), U.setLineDash([3, 3]), U.strokeStyle = "#c8c8c2", U.beginPath(), U.moveTo(0, V(G)), U.lineTo(H, V(G)), U.stroke(), U.setLineDash([]), U.strokeStyle = T.color, U.lineWidth = 1.5, U.beginPath(), T.samples.forEach((j, k) => {
      const se = k / (zs - 1) * H;
      k === 0 ? U.moveTo(se, V(j)) : U.lineTo(se, V(j));
    }), U.stroke();
  }
  function x(T) {
    T.droneMesh.visible = !1;
    const S = Xh(T.renderer, T.scene, T.droneCam, T.drone.x, T.drone.z);
    return T.droneMesh.visible = !0, S;
  }
  function f(T, S, v) {
    m(T, S), Fh(T.drone, v(S), vr, r), T.drone.x = Math.max(-8 / 2, Math.min(Qt.width / 2, T.drone.x));
    const C = Bh(T.drone.x, T.drone.z, l);
    C !== null && C !== T.lastHit && (T.hits.textContent = String(++T.collisions)), T.lastHit = C;
  }
  function h(T) {
    const { clientWidth: S, clientHeight: v } = T.view;
    (T.view.width !== S || T.view.height !== v) && (T.renderer.setSize(S, v, !1), T.chase.aspect = S / v, T.chase.updateProjectionMatrix()), T.droneMesh.position.set(T.drone.x, 0.6, T.drone.z), T.chase.position.set(T.drone.x, 2.2, T.drone.z - 6), T.chase.lookAt(T.drone.x, 0.6, T.drone.z + 5), T.renderer.render(T.scene, T.chase);
  }
  async function b() {
    const { fly: T, cnn: S } = a, [v, C] = await Promise.all([x(T), x(S)]);
    let G = 0;
    f(T, v, (U) => {
      const H = sd(c, U, vr);
      return G = H.debug.gfDrive, H.steering;
    }), _(T, G, Math.max(2.5, c.config.escapeThreshold * 1.5), 0, c.config.escapeThreshold), f(S, C, (U) => u ? cd(u, U, vr) : 0), _(S, u ? u.steering : 0, 1, -1, 0), h(T), h(S), Math.min(T.drone.z, S.drone.z) >= Qt.length && (o++, p());
  }
  let E = !1, y = !1;
  async function F() {
    if (!E || document.hidden) {
      y = !1;
      return;
    }
    await b(), requestAnimationFrame(F);
  }
  function R() {
    y || !E || document.hidden || (y = !0, requestAnimationFrame(F));
  }
  new IntersectionObserver((T) => {
    E = T[0].isIntersecting, R();
  }).observe(i), document.addEventListener("visibilitychange", R), t("[data-restart]").onclick = d, t("[data-next-seed]").onclick = () => {
    o++, p();
  }, n.rmo.onchange = d, n.threshold.oninput = () => {
    t("[data-threshold-val]").textContent = Number(n.threshold.value).toFixed(2), c.config.escapeThreshold = Number(n.threshold.value);
  }, n.speed.oninput = () => {
    t("[data-speed-val]").textContent = Number(n.speed.value).toFixed(1), r.speed = Number(n.speed.value);
  };
  const P = t("[data-swap]");
  P.onclick = () => {
    const T = t('.fvc-panel[data-who="fly"]'), S = t('.fvc-panel[data-who="cnn"]'), v = !T.classList.contains("is-hidden");
    T.classList.toggle("is-hidden", v), S.classList.toggle("is-hidden", !v), P.textContent = v ? "Show fly circuit" : "Show CNN";
  }, window.matchMedia("(max-width: 720px)").matches && t('.fvc-panel[data-who="cnn"]').classList.add("is-hidden"), fetch(e).then((T) => T.arrayBuffer()).then((T) => {
    u = Gs(od(new Uint8Array(T)));
  }), p(), Object.assign(i, { flyvscnn: { panels: a, frame: b } });
}
const la = document.createElement("style");
la.textContent = dd;
document.head.append(la);
for (const i of document.querySelectorAll("[data-fly-vs-cnn]"))
  pd(i, i.dataset.weights || "cnn.bin");
export {
  pd as mountWidget
};
