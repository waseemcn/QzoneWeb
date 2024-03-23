window = {};
window.$ = {}
window.$pt ={};
var navigator = {};
navigator.appName = "navigator";
navigator.appVersion = "5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Mobile Safari/537.36";
 
$ = window.$ || {},
$pt = window.$pt || {},
$.RSA = $pt.RSA = function() {
    function t(t, e) {
        return new a(t,e)
    }
    function e(t, e) {
        if (e < t.length + 11)
            return uv_alert("Message too long for RSA"),
            null;
        for (var n = new Array, o = t.length - 1; o >= 0 && e > 0; ) {
            var i = t.charCodeAt(o--);
            n[--e] = i
        }
        n[--e] = 0;
        for (var r = new Y, p = new Array; e > 2; ) {
            for (p[0] = 0; 0 == p[0]; )
                r.nextBytes(p);
            n[--e] = p[0]
        }
        return n[--e] = 2,
        n[--e] = 0,
        new a(n)
    }
    function n() {
        this.n = null,
        this.e = 0,
        this.d = null,
        this.p = null,
        this.q = null,
        this.dmp1 = null,
        this.dmq1 = null,
        this.coeff = null
    }
    function o(e, n) {
        null != e && null != n && e.length > 0 && n.length > 0 ? (this.n = t(e, 16),
        this.e = parseInt(n, 16)) : uv_alert("Invalid RSA public key")
    }
    function i(t) {
        return t.modPowInt(this.e, this.n)
    }
    function r(t) {
        var n = e(t, this.n.bitLength() + 7 >> 3);
        if (null == n)
            return null;
        var o = this.doPublic(n);
        if (null == o)
            return null;
        var i = o.toString(16);
        return 0 == (1 & i.length) ? i : "0" + i
    }
    function a(t, e, n) {
        null != t && ("number" == typeof t ? this.fromNumber(t, e, n) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
    }
    function p() {
        return new a(null)
    }
    function s(t, e, n, o, i, r) {
        for (; --r >= 0; ) {
            var a = e * this[t++] + n[o] + i;
            i = Math.floor(a / 67108864),
            n[o++] = 67108863 & a
        }
        return i
    }
    function c(t, e, n, o, i, r) {
        for (var a = 32767 & e, p = e >> 15; --r >= 0; ) {
            var s = 32767 & this[t]
              , c = this[t++] >> 15
              , u = p * s + c * a;
            s = a * s + ((32767 & u) << 15) + n[o] + (1073741823 & i),
            i = (s >>> 30) + (u >>> 15) + p * c + (i >>> 30),
            n[o++] = 1073741823 & s
        }
        return i
    }
    function u(t, e, n, o, i, r) {
        for (var a = 16383 & e, p = e >> 14; --r >= 0; ) {
            var s = 16383 & this[t]
              , c = this[t++] >> 14
              , u = p * s + c * a;
            s = a * s + ((16383 & u) << 14) + n[o] + i,
            i = (s >> 28) + (u >> 14) + p * c,
            n[o++] = 268435455 & s
        }
        return i
    }
    function l(t) {
        return st.charAt(t)
    }
    function d(t, e) {
        var n = ct[t.charCodeAt(e)];
        return null == n ? -1 : n
    }
    function h(t) {
        for (var e = this.t - 1; e >= 0; --e)
            t[e] = this[e];
        t.t = this.t,
        t.s = this.s
    }
    function f(t) {
        this.t = 1,
        this.s = t < 0 ? -1 : 0,
        t > 0 ? this[0] = t : t < -1 ? this[0] = t + DV : this.t = 0
    }
    function g(t) {
        var e = p();
        return e.fromInt(t),
        e
    }
    function w(t, e) {
        var n;
        if (16 == e)
            n = 4;
        else if (8 == e)
            n = 3;
        else if (256 == e)
            n = 8;
        else if (2 == e)
            n = 1;
        else if (32 == e)
            n = 5;
        else {
            if (4 != e)
                return void this.fromRadix(t, e);
            n = 2
        }
        this.t = 0,
        this.s = 0;
        for (var o = t.length, i = !1, r = 0; --o >= 0; ) {
            var p = 8 == n ? 255 & t[o] : d(t, o);
            p < 0 ? "-" == t.charAt(o) && (i = !0) : (i = !1,
            0 == r ? this[this.t++] = p : r + n > this.DB ? (this[this.t - 1] |= (p & (1 << this.DB - r) - 1) << r,
            this[this.t++] = p >> this.DB - r) : this[this.t - 1] |= p << r,
            (r += n) >= this.DB && (r -= this.DB))
        }
        8 == n && 0 != (128 & t[0]) && (this.s = -1,
        r > 0 && (this[this.t - 1] |= (1 << this.DB - r) - 1 << r)),
        this.clamp(),
        i && a.ZERO.subTo(this, this)
    }
    function m() {
        for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; )
            --this.t
    }
    function _(t) {
        if (this.s < 0)
            return "-" + this.negate().toString(t);
        var e;
        if (16 == t)
            e = 4;
        else if (8 == t)
            e = 3;
        else if (2 == t)
            e = 1;
        else if (32 == t)
            e = 5;
        else {
            if (4 != t)
                return this.toRadix(t);
            e = 2
        }
        var n, o = (1 << e) - 1, i = !1, r = "", a = this.t, p = this.DB - a * this.DB % e;
        if (a-- > 0)
            for (p < this.DB && (n = this[a] >> p) > 0 && (i = !0,
            r = l(n)); a >= 0; )
                p < e ? (n = (this[a] & (1 << p) - 1) << e - p,
                n |= this[--a] >> (p += this.DB - e)) : (n = this[a] >> (p -= e) & o,
                p <= 0 && (p += this.DB,
                --a)),
                n > 0 && (i = !0),
                i && (r += l(n));
        return i ? r : "0"
    }
    function v() {
        var t = p();
        return a.ZERO.subTo(this, t),
        t
    }
    function y() {
        return this.s < 0 ? this.negate() : this
    }
    function b(t) {
        var e = this.s - t.s;
        if (0 != e)
            return e;
        var n = this.t;
        if (0 != (e = n - t.t))
            return e;
        for (; --n >= 0; )
            if (0 != (e = this[n] - t[n]))
                return e;
        return 0
    }
    function $(t) {
        var e, n = 1;
        return 0 != (e = t >>> 16) && (t = e,
        n += 16),
        0 != (e = t >> 8) && (t = e,
        n += 8),
        0 != (e = t >> 4) && (t = e,
        n += 4),
        0 != (e = t >> 2) && (t = e,
        n += 2),
        0 != (e = t >> 1) && (t = e,
        n += 1),
        n
    }
    function k() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + $(this[this.t - 1] ^ this.s & this.DM)
    }
    function q(t, e) {
        var n;
        for (n = this.t - 1; n >= 0; --n)
            e[n + t] = this[n];
        for (n = t - 1; n >= 0; --n)
            e[n] = 0;
        e.t = this.t + t,
        e.s = this.s
    }
    function S(t, e) {
        for (var n = t; n < this.t; ++n)
            e[n - t] = this[n];
        e.t = Math.max(this.t - t, 0),
        e.s = this.s
    }
    function T(t, e) {
        var n, o = t % this.DB, i = this.DB - o, r = (1 << i) - 1, a = Math.floor(t / this.DB), p = this.s << o & this.DM;
        for (n = this.t - 1; n >= 0; --n)
            e[n + a + 1] = this[n] >> i | p,
            p = (this[n] & r) << o;
        for (n = a - 1; n >= 0; --n)
            e[n] = 0;
        e[a] = p,
        e.t = this.t + a + 1,
        e.s = this.s,
        e.clamp()
    }
    function I(t, e) {
        e.s = this.s;
        var n = Math.floor(t / this.DB);
        if (n >= this.t)
            return void (e.t = 0);
        var o = t % this.DB
          , i = this.DB - o
          , r = (1 << o) - 1;
        e[0] = this[n] >> o;
        for (var a = n + 1; a < this.t; ++a)
            e[a - n - 1] |= (this[a] & r) << i,
            e[a - n] = this[a] >> o;
        o > 0 && (e[this.t - n - 1] |= (this.s & r) << i),
        e.t = this.t - n,
        e.clamp()
    }
    function A(t, e) {
        for (var n = 0, o = 0, i = Math.min(t.t, this.t); n < i; )
            o += this[n] - t[n],
            e[n++] = o & this.DM,
            o >>= this.DB;
        if (t.t < this.t) {
            for (o -= t.s; n < this.t; )
                o += this[n],
                e[n++] = o & this.DM,
                o >>= this.DB;
            o += this.s
        } else {
            for (o += this.s; n < t.t; )
                o -= t[n],
                e[n++] = o & this.DM,
                o >>= this.DB;
            o -= t.s
        }
        e.s = o < 0 ? -1 : 0,
        o < -1 ? e[n++] = this.DV + o : o > 0 && (e[n++] = o),
        e.t = n,
        e.clamp()
    }
    function E(t, e) {
        var n = this.abs()
          , o = t.abs()
          , i = n.t;
        for (e.t = i + o.t; --i >= 0; )
            e[i] = 0;
        for (i = 0; i < o.t; ++i)
            e[i + n.t] = n.am(0, o[i], e, i, 0, n.t);
        e.s = 0,
        e.clamp(),
        this.s != t.s && a.ZERO.subTo(e, e)
    }
    function C(t) {
        for (var e = this.abs(), n = t.t = 2 * e.t; --n >= 0; )
            t[n] = 0;
        for (n = 0; n < e.t - 1; ++n) {
            var o = e.am(n, e[n], t, 2 * n, 0, 1);
            (t[n + e.t] += e.am(n + 1, 2 * e[n], t, 2 * n + 1, o, e.t - n - 1)) >= e.DV && (t[n + e.t] -= e.DV,
            t[n + e.t + 1] = 1)
        }
        t.t > 0 && (t[t.t - 1] += e.am(n, e[n], t, 2 * n, 0, 1)),
        t.s = 0,
        t.clamp()
    }
    function D(t, e, n) {
        var o = t.abs();
        if (!(o.t <= 0)) {
            var i = this.abs();
            if (i.t < o.t)
                return null != e && e.fromInt(0),
                void (null != n && this.copyTo(n));
            null == n && (n = p());
            var r = p()
              , s = this.s
              , c = t.s
              , u = this.DB - $(o[o.t - 1]);
            u > 0 ? (o.lShiftTo(u, r),
            i.lShiftTo(u, n)) : (o.copyTo(r),
            i.copyTo(n));
            var l = r.t
              , d = r[l - 1];
            if (0 != d) {
                var h = d * (1 << this.F1) + (l > 1 ? r[l - 2] >> this.F2 : 0)
                  , f = this.FV / h
                  , g = (1 << this.F1) / h
                  , w = 1 << this.F2
                  , m = n.t
                  , _ = m - l
                  , v = null == e ? p() : e;
                for (r.dlShiftTo(_, v),
                n.compareTo(v) >= 0 && (n[n.t++] = 1,
                n.subTo(v, n)),
                a.ONE.dlShiftTo(l, v),
                v.subTo(r, r); r.t < l; )
                    r[r.t++] = 0;
                for (; --_ >= 0; ) {
                    var y = n[--m] == d ? this.DM : Math.floor(n[m] * f + (n[m - 1] + w) * g);
                    if ((n[m] += r.am(0, y, n, _, 0, l)) < y)
                        for (r.dlShiftTo(_, v),
                        n.subTo(v, n); n[m] < --y; )
                            n.subTo(v, n)
                }
                null != e && (n.drShiftTo(l, e),
                s != c && a.ZERO.subTo(e, e)),
                n.t = l,
                n.clamp(),
                u > 0 && n.rShiftTo(u, n),
                s < 0 && a.ZERO.subTo(n, n)
            }
        }
    }
    function L(t) {
        var e = p();
        return this.abs().divRemTo(t, null, e),
        this.s < 0 && e.compareTo(a.ZERO) > 0 && t.subTo(e, e),
        e
    }
    function M(t) {
        this.m = t
    }
    function x(t) {
        return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
    }
    function B(t) {
        return t
    }
    function O(t) {
        t.divRemTo(this.m, null, t)
    }
    function R(t, e, n) {
        t.multiplyTo(e, n),
        this.reduce(n)
    }
    function H(t, e) {
        t.squareTo(e),
        this.reduce(e)
    }
    function K() {
        if (this.t < 1)
            return 0;
        var t = this[0];
        if (0 == (1 & t))
            return 0;
        var e = 3 & t;
        return e = e * (2 - (15 & t) * e) & 15,
        e = e * (2 - (255 & t) * e) & 255,
        e = e * (2 - ((65535 & t) * e & 65535)) & 65535,
        e = e * (2 - t * e % this.DV) % this.DV,
        e > 0 ? this.DV - e : -e
    }
    function U(t) {
        this.m = t,
        this.mp = t.invDigit(),
        this.mpl = 32767 & this.mp,
        this.mph = this.mp >> 15,
        this.um = (1 << t.DB - 15) - 1,
        this.mt2 = 2 * t.t
    }
    function N(t) {
        var e = p();
        return t.abs().dlShiftTo(this.m.t, e),
        e.divRemTo(this.m, null, e),
        t.s < 0 && e.compareTo(a.ZERO) > 0 && this.m.subTo(e, e),
        e
    }
    function P(t) {
        var e = p();
        return t.copyTo(e),
        this.reduce(e),
        e
    }
    function Q(t) {
        for (; t.t <= this.mt2; )
            t[t.t++] = 0;
        for (var e = 0; e < this.m.t; ++e) {
            var n = 32767 & t[e]
              , o = n * this.mpl + ((n * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
            for (n = e + this.m.t,
            t[n] += this.m.am(0, o, t, e, 0, this.m.t); t[n] >= t.DV; )
                t[n] -= t.DV,
                t[++n]++
        }
        t.clamp(),
        t.drShiftTo(this.m.t, t),
        t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
    }
    function j(t, e) {
        t.squareTo(e),
        this.reduce(e)
    }
    function F(t, e, n) {
        t.multiplyTo(e, n),
        this.reduce(n)
    }
    function V() {
        return 0 == (this.t > 0 ? 1 & this[0] : this.s)
    }
    function z(t, e) {
        if (t > 4294967295 || t < 1)
            return a.ONE;
        var n = p()
          , o = p()
          , i = e.convert(this)
          , r = $(t) - 1;
        for (i.copyTo(n); --r >= 0; )
            if (e.sqrTo(n, o),
            (t & 1 << r) > 0)
                e.mulTo(o, i, n);
            else {
                var s = n;
                n = o,
                o = s
            }
        return e.revert(n)
    }
    function G(t, e) {
        var n;
        return n = t < 256 || e.isEven() ? new M(e) : new U(e),
        this.exp(t, n)
    }
    function J(t) {
        lt[dt++] ^= 255 & t,
        lt[dt++] ^= t >> 8 & 255,
        lt[dt++] ^= t >> 16 & 255,
        lt[dt++] ^= t >> 24 & 255,
        dt >= gt && (dt -= gt)
    }
    function W() {
        //J((new Date).getTime())
        J(1539492088527)
    }
    function X() {
        if (null == ut) {
            for (W(),
            ut = ot(),
            ut.init(lt),
            dt = 0; dt < lt.length; ++dt)
                lt[dt] = 0;
            dt = 0
        }
        return ut.next()
    }
    function Z(t) {
        var e;
        for (e = 0; e < t.length; ++e)
            t[e] = X()
    }
    function Y() {}
    function tt() {
        this.i = 0,
        this.j = 0,
        this.S = new Array
    }
    function et(t) {
        var e, n, o;
        for (e = 0; e < 256; ++e)
            this.S[e] = e;
        for (n = 0,
        e = 0; e < 256; ++e)
            n = n + this.S[e] + t[e % t.length] & 255,
            o = this.S[e],
            this.S[e] = this.S[n],
            this.S[n] = o;
        this.i = 0,
        this.j = 0
    }
    function nt() {
        var t;
        return this.i = this.i + 1 & 255,
        this.j = this.j + this.S[this.i] & 255,
        t = this.S[this.i],
        this.S[this.i] = this.S[this.j],
        this.S[this.j] = t,
        this.S[t + this.S[this.i] & 255]
    }
    function ot() {
        return new tt
    }
    function it(t, e, o) {
        e = "e9a815ab9d6e86abbf33a4ac64e9196d5be44a09bd0ed6ae052914e1a865ac8331fed863de8ea697e9a7f63329e5e23cda09c72570f46775b7e39ea9670086f847d3c9c51963b131409b1e04265d9747419c635404ca651bbcbc87f99b8008f7f5824653e3658be4ba73e4480156b390bb73bc1f8b33578e7a4e12440e9396f2552c1aff1c92e797ebacdc37c109ab7bce2367a19c56a033ee04534723cc2558cb27368f5b9d32c04d12dbd86bbd68b1d99b7c349a8453ea75d1b2e94491ab30acf6c46a36a75b721b312bedf4e7aad21e54e9bcbcf8144c79b6e3c05eb4a1547750d224c0085d80e6da3907c3d945051c13c7c1dcefd6520ee8379c4f5231ed",
        o = "10001";
        var i = new n;
        return i.setPublic(e, o),
        i.encrypt(t)
    }
    n.prototype.doPublic = i,
    n.prototype.setPublic = o,
    n.prototype.encrypt = r;
    var rt;
    "Microsoft Internet Explorer" == navigator.appName ? (a.prototype.am = c,
    rt = 30) : "Netscape" != navigator.appName ? (a.prototype.am = s,
    rt = 26) : (a.prototype.am = u,
    rt = 28),
    a.prototype.DB = rt,
    a.prototype.DM = (1 << rt) - 1,
    a.prototype.DV = 1 << rt;
    a.prototype.FV = Math.pow(2, 52),
    a.prototype.F1 = 52 - rt,
    a.prototype.F2 = 2 * rt - 52;
    var at, pt, st = "0123456789abcdefghijklmnopqrstuvwxyz", ct = new Array;
    for (at = "0".charCodeAt(0),
    pt = 0; pt <= 9; ++pt)
        ct[at++] = pt;
    for (at = "a".charCodeAt(0),
    pt = 10; pt < 36; ++pt)
        ct[at++] = pt;
    for (at = "A".charCodeAt(0),
    pt = 10; pt < 36; ++pt)
        ct[at++] = pt;
    M.prototype.convert = x,
    M.prototype.revert = B,
    M.prototype.reduce = O,
    M.prototype.mulTo = R,
    M.prototype.sqrTo = H,
    U.prototype.convert = N,
    U.prototype.revert = P,
    U.prototype.reduce = Q,
    U.prototype.mulTo = F,
    U.prototype.sqrTo = j,
    a.prototype.copyTo = h,
    a.prototype.fromInt = f,
    a.prototype.fromString = w,
    a.prototype.clamp = m,
    a.prototype.dlShiftTo = q,
    a.prototype.drShiftTo = S,
    a.prototype.lShiftTo = T,
    a.prototype.rShiftTo = I,
    a.prototype.subTo = A,
    a.prototype.multiplyTo = E,
    a.prototype.squareTo = C,
    a.prototype.divRemTo = D,
    a.prototype.invDigit = K,
    a.prototype.isEven = V,
    a.prototype.exp = z,
    a.prototype.toString = _,
    a.prototype.negate = v,
    a.prototype.abs = y,
    a.prototype.compareTo = b,
    a.prototype.bitLength = k,
    a.prototype.mod = L,
    a.prototype.modPowInt = G,
    a.ZERO = g(0),
    a.ONE = g(1);
    var ut, lt, dt;
    if (null == lt) {
        lt = new Array,
        dt = 0;
        var ht;
        if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto && window.crypto.random) {
            var ft = window.crypto.random(32);
            for (ht = 0; ht < ft.length; ++ht)
                lt[dt++] = 255 & ft.charCodeAt(ht)
        }
        for (; dt < gt; )
            ht = Math.floor(65536 * Math.random()),
            lt[dt++] = ht >>> 8,
            lt[dt++] = 255 & ht;
        dt = 0,
        W()
    }
    Y.prototype.nextBytes = Z,
    tt.prototype.init = et,
    tt.prototype.next = nt;
    var gt = 256;
    return {
        rsa_encrypt: it
    }
}(),
function(t) {
    function e() {
        //return Math.round(4294967295 * Math.random())
        return 1;
    }
    function n(t, e, n) {
        (!n || n > 4) && (n = 4);
        for (var o = 0, i = e; i < e + n; i++)
            o <<= 8,
            o |= t[i];
        return (4294967295 & o) >>> 0
    }
    function o(t, e, n) {
        t[e + 3] = n >> 0 & 255,
        t[e + 2] = n >> 8 & 255,
        t[e + 1] = n >> 16 & 255,
        t[e + 0] = n >> 24 & 255
    }
    function i(t) {
        if (!t)
            return "";
        for (var e = "", n = 0; n < t.length; n++) {
            var o = Number(t[n]).toString(16);
            1 == o.length && (o = "0" + o),
            e += o
        }
        return e
    }
    function r(t) {
        for (var e = "", n = 0; n < t.length; n += 2)
            e += String.fromCharCode(parseInt(t.substr(n, 2), 16));
        return e
    }
    function a(t, e) {
        if (!t)
            return "";
        e && (t = p(t));
        for (var n = [], o = 0; o < t.length; o++)
            n[o] = t.charCodeAt(o);
        return i(n)
    }
    function p(t) {
        var e, n, o = [], i = t.length;
        for (e = 0; e < i; e++)
            n = t.charCodeAt(e),
            n > 0 && n <= 127 ? o.push(t.charAt(e)) : n >= 128 && n <= 2047 ? o.push(String.fromCharCode(192 | n >> 6 & 31), String.fromCharCode(128 | 63 & n)) : n >= 2048 && n <= 65535 && o.push(String.fromCharCode(224 | n >> 12 & 15), String.fromCharCode(128 | n >> 6 & 63), String.fromCharCode(128 | 63 & n));
        return o.join("")
    }
    function s(t) {
        m = new Array(8),
        _ = new Array(8),
        v = y = 0,
        k = !0,
        w = 0;
        var n = t.length
          , o = 0;
        w = (n + 10) % 8,
        0 != w && (w = 8 - w),
        b = new Array(n + w + 10),
        m[0] = 255 & (248 & e() | w);
        for (var i = 1; i <= w; i++)
            m[i] = 255 & e();
        w++;
        for (var i = 0; i < 8; i++)
            _[i] = 0;
        for (o = 1; o <= 2; )
            w < 8 && (m[w++] = 255 & e(),
            o++),
            8 == w && u();
        for (var i = 0; n > 0; )
            w < 8 && (m[w++] = t[i++],
            n--),
            8 == w && u();
        for (o = 1; o <= 7; )
            w < 8 && (m[w++] = 0,
            o++),
            8 == w && u();
        return b
    }
    function c(t) {
        var e = 0
          , n = new Array(8)
          , o = t.length;
        if ($ = t,
        o % 8 != 0 || o < 16)
            return null;
        if (_ = d(t),
        w = 7 & _[0],
        (e = o - w - 10) < 0)
            return null;
        for (var i = 0; i < n.length; i++)
            n[i] = 0;
        b = new Array(e),
        y = 0,
        v = 8,
        w++;
        for (var r = 1; r <= 2; )
            if (w < 8 && (w++,
            r++),
            8 == w && (n = t,
            !h()))
                return null;
        for (var i = 0; 0 != e; )
            if (w < 8 && (b[i] = 255 & (n[y + w] ^ _[w]),
            i++,
            e--,
            w++),
            8 == w && (n = t,
            y = v - 8,
            !h()))
                return null;
        for (r = 1; r < 8; r++) {
            if (w < 8) {
                if (0 != (n[y + w] ^ _[w]))
                    return null;
                w++
            }
            if (8 == w && (n = t,
            y = v,
            !h()))
                return null
        }
        return b
    }
    function u() {
        for (var t = 0; t < 8; t++)
            m[t] ^= k ? _[t] : b[y + t];
        for (var e = l(m), t = 0; t < 8; t++)
            b[v + t] = e[t] ^ _[t],
            _[t] = m[t];
        y = v,
        v += 8,
        w = 0,
        k = !1
    }
    function l(t) {
        for (var e = 16, i = n(t, 0, 4), r = n(t, 4, 4), a = n(g, 0, 4), p = n(g, 4, 4), s = n(g, 8, 4), c = n(g, 12, 4), u = 0; e-- > 0; )
            u += 2654435769,
            u = (4294967295 & u) >>> 0,
            i += (r << 4) + a ^ r + u ^ (r >>> 5) + p,
            i = (4294967295 & i) >>> 0,
            r += (i << 4) + s ^ i + u ^ (i >>> 5) + c,
            r = (4294967295 & r) >>> 0;
        var l = new Array(8);
        return o(l, 0, i),
        o(l, 4, r),
        l
    }
    function d(t) {
        for (var e = 16, i = n(t, 0, 4), r = n(t, 4, 4), a = n(g, 0, 4), p = n(g, 4, 4), s = n(g, 8, 4), c = n(g, 12, 4), u = 3816266640; e-- > 0; )
            r -= (i << 4) + s ^ i + u ^ (i >>> 5) + c,
            r = (4294967295 & r) >>> 0,
            i -= (r << 4) + a ^ r + u ^ (r >>> 5) + p,
            i = (4294967295 & i) >>> 0,
            u -= 2654435769,
            u = (4294967295 & u) >>> 0;
        var l = new Array(8);
        return o(l, 0, i),
        o(l, 4, r),
        l
    }
    function h() {
        for (var t = ($.length,
        0); t < 8; t++)
            _[t] ^= $[v + t];
        return _ = d(_),
        v += 8,
        w = 0,
        !0
    }
    function f(t, e) {
        var n = [];
        if (e)
            for (var o = 0; o < t.length; o++)
                n[o] = 255 & t.charCodeAt(o);
        else
            for (var i = 0, o = 0; o < t.length; o += 2)
                n[i++] = parseInt(t.substr(o, 2), 16);
        return n
    }
    var g = ""
      , w = 0
      , m = []
      , _ = []
      , v = 0
      , y = 0
      , b = []
      , $ = []
      , k = !0;
    t.TEA = {
        encrypt: function(t, e) {
            return i(s(f(t, e)))
        },
        enAsBase64: function(t, e) {
            for (var n = f(t, e), o = s(n), i = "", r = 0; r < o.length; r++)
                i += String.fromCharCode(o[r]);
            return btoa(i)
        },
        decrypt: function(t) {
            return i(c(f(t, !1)))
        },
        initkey: function(t, e) {
            g = f(t, e)
        },
        bytesToStr: r,
        strToBytes: a,
        bytesInStr: i,
        dataFromStr: f
    };
    var q = {};
    q.PADCHAR = "=",
    q.ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    q.getbyte = function(t, e) {
        var n = t.charCodeAt(e);
        if (n > 255)
            throw "INVALID_CHARACTER_ERR: DOM Exception 5";
        return n
    }
    ,
    q.encode = function(t) {
        if (1 != arguments.length)
            throw "SyntaxError: Not enough arguments";
        var e, n, o = q.PADCHAR, i = q.ALPHA, r = q.getbyte, a = [];
        t = "" + t;
        var p = t.length - t.length % 3;
        if (0 == t.length)
            return t;
        for (e = 0; e < p; e += 3)
            n = r(t, e) << 16 | r(t, e + 1) << 8 | r(t, e + 2),
            a.push(i.charAt(n >> 18)),
            a.push(i.charAt(n >> 12 & 63)),
            a.push(i.charAt(n >> 6 & 63)),
            a.push(i.charAt(63 & n));
        switch (t.length - p) {
        case 1:
            n = r(t, e) << 16,
            a.push(i.charAt(n >> 18) + i.charAt(n >> 12 & 63) + o + o);
            break;
        case 2:
            n = r(t, e) << 16 | r(t, e + 1) << 8,
            a.push(i.charAt(n >> 18) + i.charAt(n >> 12 & 63) + i.charAt(n >> 6 & 63) + o)
        }
        return a.join("")
    }
    ,
    window.btoa || (window.btoa = q.encode)
}(window),
$ = window.$ || {},
$pt = window.$pt || {},
$.Encryption = $pt.Encryption = function() {
    function t(t) {
        return e(t)
    }
    function e(t) {
        return l(n(u(t), t.length * m))
    }
    function n(t, e) {
        t[e >> 5] |= 128 << e % 32,
        t[14 + (e + 64 >>> 9 << 4)] = e;
        for (var n = 1732584193, o = -271733879, c = -1732584194, u = 271733878, l = 0; l < t.length; l += 16) {
            var d = n
              , h = o
              , f = c
              , g = u;
            n = i(n, o, c, u, t[l + 0], 7, -680876936),
            u = i(u, n, o, c, t[l + 1], 12, -389564586),
            c = i(c, u, n, o, t[l + 2], 17, 606105819),
            o = i(o, c, u, n, t[l + 3], 22, -1044525330),
            n = i(n, o, c, u, t[l + 4], 7, -176418897),
            u = i(u, n, o, c, t[l + 5], 12, 1200080426),
            c = i(c, u, n, o, t[l + 6], 17, -1473231341),
            o = i(o, c, u, n, t[l + 7], 22, -45705983),
            n = i(n, o, c, u, t[l + 8], 7, 1770035416),
            u = i(u, n, o, c, t[l + 9], 12, -1958414417),
            c = i(c, u, n, o, t[l + 10], 17, -42063),
            o = i(o, c, u, n, t[l + 11], 22, -1990404162),
            n = i(n, o, c, u, t[l + 12], 7, 1804603682),
            u = i(u, n, o, c, t[l + 13], 12, -40341101),
            c = i(c, u, n, o, t[l + 14], 17, -1502002290),
            o = i(o, c, u, n, t[l + 15], 22, 1236535329),
            n = r(n, o, c, u, t[l + 1], 5, -165796510),
            u = r(u, n, o, c, t[l + 6], 9, -1069501632),
            c = r(c, u, n, o, t[l + 11], 14, 643717713),
            o = r(o, c, u, n, t[l + 0], 20, -373897302),
            n = r(n, o, c, u, t[l + 5], 5, -701558691),
            u = r(u, n, o, c, t[l + 10], 9, 38016083),
            c = r(c, u, n, o, t[l + 15], 14, -660478335),
            o = r(o, c, u, n, t[l + 4], 20, -405537848),
            n = r(n, o, c, u, t[l + 9], 5, 568446438),
            u = r(u, n, o, c, t[l + 14], 9, -1019803690),
            c = r(c, u, n, o, t[l + 3], 14, -187363961),
            o = r(o, c, u, n, t[l + 8], 20, 1163531501),
            n = r(n, o, c, u, t[l + 13], 5, -1444681467),
            u = r(u, n, o, c, t[l + 2], 9, -51403784),
            c = r(c, u, n, o, t[l + 7], 14, 1735328473),
            o = r(o, c, u, n, t[l + 12], 20, -1926607734),
            n = a(n, o, c, u, t[l + 5], 4, -378558),
            u = a(u, n, o, c, t[l + 8], 11, -2022574463),
            c = a(c, u, n, o, t[l + 11], 16, 1839030562),
            o = a(o, c, u, n, t[l + 14], 23, -35309556),
            n = a(n, o, c, u, t[l + 1], 4, -1530992060),
            u = a(u, n, o, c, t[l + 4], 11, 1272893353),
            c = a(c, u, n, o, t[l + 7], 16, -155497632),
            o = a(o, c, u, n, t[l + 10], 23, -1094730640),
            n = a(n, o, c, u, t[l + 13], 4, 681279174),
            u = a(u, n, o, c, t[l + 0], 11, -358537222),
            c = a(c, u, n, o, t[l + 3], 16, -722521979),
            o = a(o, c, u, n, t[l + 6], 23, 76029189),
            n = a(n, o, c, u, t[l + 9], 4, -640364487),
            u = a(u, n, o, c, t[l + 12], 11, -421815835),
            c = a(c, u, n, o, t[l + 15], 16, 530742520),
            o = a(o, c, u, n, t[l + 2], 23, -995338651),
            n = p(n, o, c, u, t[l + 0], 6, -198630844),
            u = p(u, n, o, c, t[l + 7], 10, 1126891415),
            c = p(c, u, n, o, t[l + 14], 15, -1416354905),
            o = p(o, c, u, n, t[l + 5], 21, -57434055),
            n = p(n, o, c, u, t[l + 12], 6, 1700485571),
            u = p(u, n, o, c, t[l + 3], 10, -1894986606),
            c = p(c, u, n, o, t[l + 10], 15, -1051523),
            o = p(o, c, u, n, t[l + 1], 21, -2054922799),
            n = p(n, o, c, u, t[l + 8], 6, 1873313359),
            u = p(u, n, o, c, t[l + 15], 10, -30611744),
            c = p(c, u, n, o, t[l + 6], 15, -1560198380),
            o = p(o, c, u, n, t[l + 13], 21, 1309151649),
            n = p(n, o, c, u, t[l + 4], 6, -145523070),
            u = p(u, n, o, c, t[l + 11], 10, -1120210379),
            c = p(c, u, n, o, t[l + 2], 15, 718787259),
            o = p(o, c, u, n, t[l + 9], 21, -343485551),
            n = s(n, d),
            o = s(o, h),
            c = s(c, f),
            u = s(u, g)
        }
        return 16 == _ ? Array(o, c) : Array(n, o, c, u)
    }
    function o(t, e, n, o, i, r) {
        return s(c(s(s(e, t), s(o, r)), i), n)
    }
    function i(t, e, n, i, r, a, p) {
        return o(e & n | ~e & i, t, e, r, a, p)
    }
    function r(t, e, n, i, r, a, p) {
        return o(e & i | n & ~i, t, e, r, a, p)
    }
    function a(t, e, n, i, r, a, p) {
        return o(e ^ n ^ i, t, e, r, a, p)
    }
    function p(t, e, n, i, r, a, p) {
        return o(n ^ (e | ~i), t, e, r, a, p)
    }
    function s(t, e) {
        var n = (65535 & t) + (65535 & e);
        return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n
    }
    function c(t, e) {
        return t << e | t >>> 32 - e
    }
    function u(t) {
        for (var e = Array(), n = (1 << m) - 1, o = 0; o < t.length * m; o += m)
            e[o >> 5] |= (t.charCodeAt(o / m) & n) << o % 32;
        return e
    }
    function l(t) {
        for (var e = w ? "0123456789ABCDEF" : "0123456789abcdef", n = "", o = 0; o < 4 * t.length; o++)
            n += e.charAt(t[o >> 2] >> o % 4 * 8 + 4 & 15) + e.charAt(t[o >> 2] >> o % 4 * 8 & 15);
        return n
    }
    function d(t) {
        for (var e = [], n = 0; n < t.length; n += 2)
            e.push(String.fromCharCode(parseInt(t.substr(n, 2), 16)));
        return e.join("")
    }
    function h(t, e) {
        if (!(Math.random() > (e || 1)))
            try {
                var n = location.protocol + "//ui.ptlogin2.qq.com/cgi-bin/report?id=" + t;
                document.createElement("img").src = n
            } catch (t) {}
    }
    function f(e, n, o, i) {
        o = o || "",
        e = e || "";
        for (var r = i ? e : t(e), a = d(r), p = t(a + n), s = window.TEA.strToBytes(o.toUpperCase(), !0), c = Number(s.length / 2).toString(16); c.length < 4; )
            c = "0" + c;
				window.TEA.initkey(p);
        var u = window.TEA.encrypt(r + window.TEA.strToBytes(n) + c + s);
        window.TEA.initkey("");
        for (var l = Number(u.length / 2).toString(16); l.length < 4; )
            l = "0" + l;
        var f = $pt.RSA.rsa_encrypt(d(l + u));
        return function() {
            h(488358, 1)
        },
        window.btoa(d(f)).replace(/[\/\+=]/g, function(t) {
            return {
                "/": "-",
                "+": "*",
                "=": "_"
            }[t]
        })
    }
    function g(e, n, o) {
        var i = o ? e : t(e)
          , r = i + n.toUpperCase();
        return $.RSA.rsa_encrypt(r)
    }
    var w = 1
      , m = 8
      , _ = 32;
    return {
        getEncryption: f,
        getRSAEncryption: g,
        md5: t
    }
}();
 
 
function entry(n,salt,verifycode) //这个函数是直接封装完成了 直接调用这个函数就可以实现加密
{
    return $.Encryption.getEncryption(n,salt,verifycode, false);
}