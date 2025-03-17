function u(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var t = { exports: {} };
t.exports = function(o) {
  return o || (o = {}), o._subs = [], o._paused = !1, o._pending = [], o.on = function(e, r) {
    o._subs[e] = o._subs[e] || [], o._subs[e].push(r);
  }, o.off = function(e, r) {
    if (o._subs[e]) {
      for (var s in o._subs[e])
        if (o._subs[e][s] === r) {
          o._subs[e].splice(s);
          break;
        }
    }
  }, o.emit = function(e) {
    if (o._subs[e]) {
      var r = Array.prototype.slice.call(arguments, 1);
      if (o._paused) {
        o._pending[e] = o._pending[e] || [], o._pending[e].push(r);
        return;
      }
      for (var s in o._subs[e])
        o._subs[e][s].apply(o, r);
    }
  }, o.pause = function() {
    o._paused = !0;
  }, o.resume = function() {
    o._paused = !1;
    for (var e in o._pending)
      for (var r = 0; r < o._pending[e].length; r++)
        o.emit(e, o._pending[e][r]);
  }, o;
};
var n = t.exports;
const f = /* @__PURE__ */ u(n), a = {
  follow: !1
};
function i(o) {
  this.emit("position", o);
}
function p(o) {
  this.emit("error", o);
}
const l = function(o) {
  const e = Object.assign({}, a, o);
  return {
    start() {
      return e.started = !0, navigator.geolocation.getCurrentPosition(
        i.bind(this),
        p.bind(this),
        { maximumAge: 6e4 }
      ), this;
    },
    stop() {
      return e.started = !1, this;
    },
    isStarted() {
      return e.started;
    },
    log() {
      return console.log(e), this;
    }
  };
};
function d(o) {
  let e = typeof window < "u" ? window.navigator || {} : {};
  if (typeof e < "u" && "geolocation" in e) {
    let r = f(l(o));
    return r.on("position", function() {
      this.stop();
    }), r;
  } else
    throw "geolocation is not available in your browser.";
}
if (typeof window < "u")
  for (const [o, e] of Object.entries({
    geoLocator: d
  }))
    window[o] = e;
export {
  d as default
};
