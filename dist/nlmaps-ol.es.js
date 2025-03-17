var ol = Object.defineProperty;
var al = (n, t, e) => t in n ? ol(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var xr = (n, t, e) => al(n, typeof t != "symbol" ? t + "" : t, e);
const vt = {
  basemaps: {
    defaults: {
      crs: "EPSG:3857",
      attribution: "Kaartgegevens &copy; <a href='https://www.kadaster.nl'>Kadaster</a> |             <a href='https://www.verbeterdekaart.nl'>Verbeter de kaart</a>",
      minZoom: 6,
      maxZoom: 19,
      type: "wmts",
      format: "png",
      url: "https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0"
    },
    layers: [
      {
        url: "https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0",
        crs: "EPSG:3857",
        format: "png",
        name: "standaard",
        layerName: "standaard"
      },
      {
        url: "https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0",
        crs: "EPSG:3857",
        format: "png",
        name: "grijs",
        layerName: "grijs"
      },
      {
        url: "https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0",
        crs: "EPSG:3857",
        format: "png",
        name: "pastel",
        layerName: "pastel"
      },
      {
        name: "luchtfoto",
        crs: "EPSG:3857",
        layerName: "Actueel_ortho25",
        url: "https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0",
        format: "jpeg"
      }
    ]
  },
  wms: {
    defaults: {
      url: "https://service.pdok.nl/{workSpaceName}?",
      version: "1.1.1",
      transparent: !0,
      format: "image/png",
      minZoom: 0,
      maxZoom: 24
    },
    layers: [
      {
        name: "adressen",
        url: "https://service.pdok.nl/kadaster/adressen/wms/v1_0?",
        layerName: "adressen"
      },
      {
        name: "percelen",
        url: "https://service.pdok.nl/kadaster/kadastralekaart/wms/v5_0?",
        layerName: "Kadastralekaart"
      },
      {
        name: "gebouwen",
        url: "https://service.pdok.nl/lv/bag/wms/v2_0?",
        layerName: "pand"
      },
      {
        name: "drone-no-fly-zones",
        url: "https://service.pdok.nl/lvnl/drone-no-flyzones/wms/v1_0?",
        layerName: "luchtvaartgebieden,landingsite"
      },
      {
        name: "hoogte",
        url: "https://service.pdok.nl/rws/ahn/wms/v1_0?",
        layerName: "dsm_05m"
      },
      {
        name: "gemeenten",
        url: "https://service.pdok.nl/kadaster/bestuurlijkegebieden/wms/v1_0?",
        layerName: "Gemeentegebied",
        styleName: "Gemeentegebied"
      },
      {
        name: "provincies",
        url: "https://service.pdok.nl/kadaster/bestuurlijkegebieden/wms/v1_0?",
        layerName: "Provinciegebied",
        styleName: "Provinciegebied"
      },
      {
        name: "land",
        url: "https://service.pdok.nl/kadaster/bestuurlijkegebieden/wms/v1_0?",
        layerName: "Landgebied",
        styleName: "Landgebied"
      }
    ]
  },
  geocoder: {
    suggestUrl: "https://api.pdok.nl/bzk/locatieserver/search/v3_1/suggest?",
    lookupUrl: "https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?",
    placeholder: "Zoomen naar adres ..."
  },
  map: {
    style: "standaard",
    center: {
      latitude: 52.093249,
      longitude: 5.111994
    },
    zoom: 8,
    attribution: !0,
    extent: [-180, -90, 180, 90],
    zoomposition: "topleft"
  },
  marker: {
    url: "https://rawgit.com/geo-frontend/nlmaps/master/dist/assets/img/marker_icon.svg",
    iconSize: [64, 64],
    iconAnchor: [32, 64]
  },
  classnames: {
    geocoderContainer: ["nlmaps-geocoder-control-container"],
    geocoderSearch: ["nlmaps-geocoder-control-search"],
    geocoderButton: ["nlmaps-geocoder-control-button"],
    geocoderResultList: ["nlmaps-geocoder-result-list"],
    geocoderResultItem: ["nlmaps-geocoder-result-item"],
    geocoderResultSelected: ["nlmaps-geocoder-result-selected"]
  }
}, j = {};
j.BASE_DEFAULTS = {
  crs: "EPSG:3857",
  attr: "",
  minZoom: 0,
  maxZoom: 19,
  type: "wmts",
  format: "png",
  url: ""
};
j.WMS_DEFAULTS = {
  url: "",
  version: "1.1.1",
  transparent: !0,
  format: "image/png",
  minZoom: 0,
  maxZoom: 24,
  styleName: ""
};
j.BASEMAP_PROVIDERS = {};
j.WMS_PROVIDERS = {};
j.GEOCODER = {};
j.MAP = {
  zoomposition: "bottomleft"
};
j.MARKER = {};
j.CLASSNAMES = {
  geocoderContainer: ["nlmaps-geocoder-control-container"],
  geocoderSearch: ["nlmaps-geocoder-control-search"],
  geocoderButton: ["nlmaps-geocoder-control-button"],
  geocoderResultList: ["nlmaps-geocoder-result-list"],
  geocoderResultItem: ["nlmaps-geocoder-result-item"]
};
function gn(n) {
  throw n;
}
function ui(n, t) {
  return Object.assign({}, n, t);
}
function ll(n) {
  let t = ui(j.BASE_DEFAULTS, n.defaults);
  (!n.layers || n.layers.length < 0) && gn("no basemap defined, please define a basemap in the configuration"), n.layers.forEach((e) => {
    (!e.name || j.BASEMAP_PROVIDERS[e.name] !== void 0) && gn("basemap names need to be defined and unique: " + e.name), j.BASEMAP_PROVIDERS[e.name] = dl(
      ui(t, e)
    );
  });
}
function hl(n) {
  let t = ui(j.WMS_DEFAULTS, n.defaults);
  n.layers && n.layers.forEach((e) => {
    (!e.name || j.WMS_PROVIDERS[e.name] !== void 0) && gn("wms names need to be defined and unique: " + e.name), j.WMS_PROVIDERS[e.name] = fl(
      ui(t, e)
    );
  });
}
function cl(n) {
  j.GEOCODER.lookupUrl = n.lookupUrl, j.GEOCODER.suggestUrl = n.suggestUrl, j.GEOCODER.placeholder = n.placeholder;
}
function ul(n) {
  j.MAP = ui(j.MAP, n);
}
function dl(n) {
  switch (n.type) {
    case "wmts":
      n.url = `${n.url}/${n.layerName}/${n.crs}/{z}/{x}/{y}.${n.format}`;
      break;
    case "tms":
      n.url = `${n.url}/${n.layerName}/{z}/{x}/{y}.${n.format}`;
      break;
    default:
      n.url = `${n.url}/${n.type}/${n.layerName}/${n.crs}/{z}/{x}/{y}.${n.format}`;
  }
  return n;
}
function fl(n) {
  let t = n.url.indexOf("{");
  if (t > -1) {
    let e = n.url.indexOf("}");
    n.url.slice(t + 1, e).toLowerCase() === "workspacename" ? n.url = n.url.slice(0, t) + n.workSpaceName + n.url.slice(e + 1, -1) : gn("only workspacename templates are supported for now");
  }
  return n;
}
function gl(n) {
  j.FEATUREQUERYBASEURL = n;
}
function _l(n) {
  j.CLASSNAMES = ui(j.CLASSNAMES, n);
}
function ml(n) {
  j.MARKER = n;
}
vt.featureQuery !== void 0 && gl(vt.featureQuery.baseUrl);
vt.map !== void 0 && ul(vt.map);
ll(vt.basemaps);
vt.wms !== void 0 && hl(vt.wms);
vt.geocoder !== void 0 && cl(vt.geocoder);
vt.marker !== void 0 && ml(vt.marker);
vt.classnames !== void 0 && _l(vt.classnames);
const It = j.GEOCODER;
function ko(n) {
  return new Promise((t, e) => {
    var i = new XMLHttpRequest();
    i.onreadystatechange = function() {
      i.readyState == 4 && i.status == 200 && t(JSON.parse(i.responseText));
    }, i.open("GET", n, !0), i.send(null);
  });
}
function Rr(n) {
  if (!n.includes("POINT"))
    throw TypeError("Provided WKT geometry is not a point.");
  const t = n.split("(")[1].split(")")[0], e = parseFloat(t.split(" ")[0]), i = parseFloat(t.split(" ")[1]);
  return {
    type: "Point",
    coordinates: [e, i]
  };
}
It.resultList = [];
It.selectedResult = -1;
It.doSuggestRequest = function(n) {
  return ko(`${this.suggestUrl}q=${encodeURIComponent(n)}`);
};
It.doLookupRequest = function(n) {
  return ko(`${this.lookupUrl}id=${encodeURIComponent(n)}`).then((t) => {
    const e = t.response.docs[0];
    return e.centroide_ll = Rr(e.centroide_ll), e.centroide_rd = Rr(e.centroide_rd), e;
  });
};
It.createControl = function(n, t) {
  this.zoomTo = n, this.map = t;
  const e = document.createElement("div"), i = document.createElement("form"), s = document.createElement("input"), r = document.createElement("button"), o = document.createElement("div");
  return vi(e, j.CLASSNAMES.geocoderContainer), vi(i, j.CLASSNAMES.geocoderSearch), e.addEventListener("click", (a) => a.stopPropagation()), e.addEventListener("dblclick", (a) => a.stopPropagation()), s.id = "nlmaps-geocoder-control-input", s.placeholder = It.placeholder, s.setAttribute("aria-label", It.placeholder), s.setAttribute("type", "text"), s.setAttribute("autocapitalize", "off"), s.setAttribute("autocomplete", "off"), s.setAttribute("autocorrect", "off"), s.setAttribute("spellcheck", "false"), s.addEventListener("keydown", (a) => {
    let l = this.resultList;
    this.resultList.length > 0 && ((a.code === "ArrowDown" || a.keyCode === 40) && (this.selectedResult < this.resultList.length - 1 && this.selectedResult++, this.showLookupResult(l[this.selectedResult])), (a.code === "ArrowUp" || a.keyCode === 38) && (this.selectedResult > 0 && this.selectedResult--, this.showLookupResult(l[this.selectedResult])), a.code === "Escape" && this.clearSuggestResults(!0));
  }), s.addEventListener("input", (a) => {
    this.suggest(a.target.value);
  }), s.addEventListener("focus", (a) => {
    this.suggest(a.target.value);
  }), r.setAttribute("type", "submit"), i.addEventListener("submit", (a) => {
    a.preventDefault(), this.resultList.length > 0 && this.lookup(this.resultList[this.selectedResult < 0 ? 0 : this.selectedResult].id);
  }), r.setAttribute("aria-label", It.placeholder), vi(r, j.CLASSNAMES.geocoderButton), o.id = "nlmaps-geocoder-control-results", vi(o, j.CLASSNAMES.geocoderResultList), o.classList.add("nlmaps-hidden"), e.appendChild(i), i.appendChild(s), i.appendChild(r), e.appendChild(o), e;
};
It.suggest = function(n) {
  if (n.length < 3) {
    this.clearSuggestResults();
    return;
  }
  this.doSuggestRequest(n).then((t) => {
    this.resultList = t.response.docs, this.showSuggestResults(this.resultList);
  });
};
It.lookup = function(n) {
  this.doLookupRequest(n).then((t) => {
    this.zoomTo(t.centroide_ll, this.map), this.showLookupResult(t), this.clearSuggestResults();
  });
};
It.clearSuggestResults = function(n) {
  this.selectedResult = -1, n && (document.getElementById("nlmaps-geocoder-control-input").value = ""), document.getElementById("nlmaps-geocoder-control-results").innerHTML = "", document.getElementById("nlmaps-geocoder-control-results").classList.add("nlmaps-hidden");
};
It.showLookupResult = function(n) {
  let t = document.getElementsByClassName(j.CLASSNAMES.geocoderResultItem);
  Array.prototype.map.call(t, (i) => i.classList.remove(j.CLASSNAMES.geocoderResultSelected));
  let e = document.getElementById(n.id);
  e && e.classList.add(j.CLASSNAMES.geocoderResultSelected), document.getElementById("nlmaps-geocoder-control-input").value = n.weergavenaam;
};
function vi(n, t) {
  t.forEach((e) => {
    n.classList.add(e);
  });
}
It.showSuggestResults = function(n) {
  if (this.clearSuggestResults(), n.length > 0) {
    const t = document.createElement("ul");
    n.forEach((e) => {
      const i = document.createElement("li"), s = document.createElement("a");
      s.innerHTML = e.weergavenaam, s.id = e.id, vi(s, j.CLASSNAMES.geocoderResultItem), s.setAttribute("href", "#"), s.addEventListener("click", (r) => {
        r.preventDefault(), this.lookup(r.target.id);
      }), i.appendChild(s), t.appendChild(i);
    }), document.getElementById("nlmaps-geocoder-control-results").classList.remove("nlmaps-hidden"), document.getElementById("nlmaps-geocoder-control-results").appendChild(t);
  }
};
function Tr() {
  return j.MARKER;
}
function pl(n) {
  if (n in j.BASEMAP_PROVIDERS) {
    var t = j.BASEMAP_PROVIDERS[n];
    return t.deprecated && console && console.warn && console.warn(n + " is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference."), t;
  } else
    console.error("NL Maps error: You asked for a style which does not exist! Available styles: " + Object.keys(j.BASEMAP_PROVIDERS).join(", "));
}
function yl(n, t) {
  let e;
  return n in j.WMS_PROVIDERS ? (e = j.WMS_PROVIDERS[n], e.deprecated && console && console.warn && console.warn(n + " is a deprecated wms; it will be redirected to its replacement. For performance improvements, please change your reference.")) : (e = Object.assign({}, j.WMS_DEFAULTS, t), console.log(
    "NL Maps: You asked for a wms which does not exist! Available wmses: " + Object.keys(j.WMS_PROVIDERS).join(", ") + ". Provide an options object to make your own WMS."
  )), e;
}
const El = {
  /**
   * Triggered after a map frame is rendered.
   * @event module:ol/MapEvent~MapEvent#postrender
   * @api
   */
  POSTRENDER: "postrender"
}, Go = {
  /**
   * Triggered when a property is changed.
   * @event module:ol/Object.ObjectEvent#propertychange
   * @api
   */
  PROPERTYCHANGE: "propertychange"
}, ut = {
  /**
   * Generic change event. Triggered when the revision counter is increased.
   * @event module:ol/events/Event~BaseEvent#change
   * @api
   */
  CHANGE: "change",
  /**
   * Generic error event. Triggered when an error occurs.
   * @event module:ol/events/Event~BaseEvent#error
   * @api
   */
  ERROR: "error",
  LOAD: "load"
};
class No {
  constructor() {
    this.disposed = !1;
  }
  /**
   * Clean up.
   */
  dispose() {
    this.disposed || (this.disposed = !0, this.disposeInternal());
  }
  /**
   * Extension point for disposable objects.
   * @protected
   */
  disposeInternal() {
  }
}
function xl(n, t, e) {
  let i, s;
  e = e || ne;
  let r = 0, o = n.length, a = !1;
  for (; r < o; )
    i = r + (o - r >> 1), s = +e(n[i], t), s < 0 ? r = i + 1 : (o = i, a = !s);
  return a ? r : ~r;
}
function ne(n, t) {
  return n > t ? 1 : n < t ? -1 : 0;
}
function Rl(n, t) {
  return n < t ? 1 : n > t ? -1 : 0;
}
function vs(n, t, e) {
  if (n[0] <= t)
    return 0;
  const i = n.length;
  if (t <= n[i - 1])
    return i - 1;
  if (typeof e == "function") {
    for (let s = 1; s < i; ++s) {
      const r = n[s];
      if (r === t)
        return s;
      if (r < t)
        return e(t, n[s - 1], r) > 0 ? s - 1 : s;
    }
    return i - 1;
  }
  if (e > 0) {
    for (let s = 1; s < i; ++s)
      if (n[s] < t)
        return s - 1;
    return i - 1;
  }
  if (e < 0) {
    for (let s = 1; s < i; ++s)
      if (n[s] <= t)
        return s;
    return i - 1;
  }
  for (let s = 1; s < i; ++s) {
    if (n[s] == t)
      return s;
    if (n[s] < t)
      return n[s - 1] - t < t - n[s] ? s - 1 : s;
  }
  return i - 1;
}
function Tl(n, t, e) {
  for (; t < e; ) {
    const i = n[t];
    n[t] = n[e], n[e] = i, ++t, --e;
  }
}
function Ms(n, t) {
  const e = Array.isArray(t) ? t : [t], i = e.length;
  for (let s = 0; s < i; s++)
    n[n.length] = e[s];
}
function Ei(n, t) {
  const e = n.length;
  if (e !== t.length)
    return !1;
  for (let i = 0; i < e; i++)
    if (n[i] !== t[i])
      return !1;
  return !0;
}
function Sl(n, t, e) {
  const i = t || ne;
  return n.every(function(s, r) {
    if (r === 0)
      return !0;
    const o = i(n[r - 1], s);
    return !(o > 0 || o === 0);
  });
}
function wl() {
  return !0;
}
function di() {
}
function Xo(n) {
  let t, e, i;
  return function() {
    const s = Array.prototype.slice.call(arguments);
    return (!e || this !== i || !Ei(s, e)) && (i = this, e = s, t = n.apply(this, arguments)), t;
  };
}
function Il(n) {
  function t() {
    let e;
    try {
      e = n();
    } catch (i) {
      return Promise.reject(i);
    }
    return e instanceof Promise ? e : Promise.resolve(e);
  }
  return t();
}
function Ls(n) {
  for (const t in n)
    delete n[t];
}
function fi(n) {
  let t;
  for (t in n)
    return !1;
  return !t;
}
class xi {
  /**
   * @param {string} type Type.
   */
  constructor(t) {
    this.propagationStopped, this.defaultPrevented, this.type = t, this.target = null;
  }
  /**
   * Prevent default. This means that no emulated `click`, `singleclick` or `doubleclick` events
   * will be fired.
   * @api
   */
  preventDefault() {
    this.defaultPrevented = !0;
  }
  /**
   * Stop event propagation.
   * @api
   */
  stopPropagation() {
    this.propagationStopped = !0;
  }
}
class bs extends No {
  /**
   * @param {*} [target] Default event target for dispatched events.
   */
  constructor(t) {
    super(), this.eventTarget_ = t, this.pendingRemovals_ = null, this.dispatching_ = null, this.listeners_ = null;
  }
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */
  addEventListener(t, e) {
    if (!t || !e)
      return;
    const i = this.listeners_ || (this.listeners_ = {}), s = i[t] || (i[t] = []);
    s.includes(e) || s.push(e);
  }
  /**
   * Dispatches an event and calls all listeners listening for events
   * of this type. The event parameter can either be a string or an
   * Object with a `type` property.
   *
   * @param {import("./Event.js").default|string} event Event object.
   * @return {boolean|undefined} `false` if anyone called preventDefault on the
   *     event object or if any of the listeners returned false.
   * @api
   */
  dispatchEvent(t) {
    const e = typeof t == "string", i = e ? t : t.type, s = this.listeners_ && this.listeners_[i];
    if (!s)
      return;
    const r = e ? new xi(t) : (
      /** @type {Event} */
      t
    );
    r.target || (r.target = this.eventTarget_ || this);
    const o = this.dispatching_ || (this.dispatching_ = {}), a = this.pendingRemovals_ || (this.pendingRemovals_ = {});
    i in o || (o[i] = 0, a[i] = 0), ++o[i];
    let l;
    for (let h = 0, c = s.length; h < c; ++h)
      if ("handleEvent" in s[h] ? l = /** @type {import("../events.js").ListenerObject} */
      s[h].handleEvent(r) : l = /** @type {import("../events.js").ListenerFunction} */
      s[h].call(this, r), l === !1 || r.propagationStopped) {
        l = !1;
        break;
      }
    if (--o[i] === 0) {
      let h = a[i];
      for (delete a[i]; h--; )
        this.removeEventListener(i, di);
      delete o[i];
    }
    return l;
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.listeners_ && Ls(this.listeners_);
  }
  /**
   * Get the listeners for a specified event type. Listeners are returned in the
   * order that they will be called in.
   *
   * @param {string} type Type.
   * @return {Array<import("../events.js").Listener>|undefined} Listeners.
   */
  getListeners(t) {
    return this.listeners_ && this.listeners_[t] || void 0;
  }
  /**
   * @param {string} [type] Type. If not provided,
   *     `true` will be returned if this event target has any listeners.
   * @return {boolean} Has listeners.
   */
  hasListener(t) {
    return this.listeners_ ? t ? t in this.listeners_ : Object.keys(this.listeners_).length > 0 : !1;
  }
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */
  removeEventListener(t, e) {
    if (!this.listeners_)
      return;
    const i = this.listeners_[t];
    if (!i)
      return;
    const s = i.indexOf(e);
    s !== -1 && (this.pendingRemovals_ && t in this.pendingRemovals_ ? (i[s] = di, ++this.pendingRemovals_[t]) : (i.splice(s, 1), i.length === 0 && delete this.listeners_[t]));
  }
}
function kt(n, t, e, i, s) {
  if (s) {
    const o = e;
    e = function(a) {
      return n.removeEventListener(t, e), o.call(i ?? this, a);
    };
  } else i && i !== n && (e = e.bind(i));
  const r = {
    target: n,
    type: t,
    listener: e
  };
  return n.addEventListener(t, e), r;
}
function _n(n, t, e, i) {
  return kt(n, t, e, i, !0);
}
function Ct(n) {
  n && n.target && (n.target.removeEventListener(n.type, n.listener), Ls(n));
}
class Vi extends bs {
  constructor() {
    super(), this.on = /** @type {ObservableOnSignature<import("./events").EventsKey>} */
    this.onInternal, this.once = /** @type {ObservableOnSignature<import("./events").EventsKey>} */
    this.onceInternal, this.un = /** @type {ObservableOnSignature<void>} */
    this.unInternal, this.revision_ = 0;
  }
  /**
   * Increases the revision counter and dispatches a 'change' event.
   * @api
   */
  changed() {
    ++this.revision_, this.dispatchEvent(ut.CHANGE);
  }
  /**
   * Get the version number for this object.  Each time the object is modified,
   * its version number will be incremented.
   * @return {number} Revision.
   * @api
   */
  getRevision() {
    return this.revision_;
  }
  /**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */
  onInternal(t, e) {
    if (Array.isArray(t)) {
      const i = t.length, s = new Array(i);
      for (let r = 0; r < i; ++r)
        s[r] = kt(this, t[r], e);
      return s;
    }
    return kt(
      this,
      /** @type {string} */
      t,
      e
    );
  }
  /**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */
  onceInternal(t, e) {
    let i;
    if (Array.isArray(t)) {
      const s = t.length;
      i = new Array(s);
      for (let r = 0; r < s; ++r)
        i[r] = _n(this, t[r], e);
    } else
      i = _n(
        this,
        /** @type {string} */
        t,
        e
      );
    return e.ol_key = i, i;
  }
  /**
   * Unlisten for a certain type of event.
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @protected
   */
  unInternal(t, e) {
    const i = (
      /** @type {Object} */
      e.ol_key
    );
    if (i)
      Cl(i);
    else if (Array.isArray(t))
      for (let s = 0, r = t.length; s < r; ++s)
        this.removeEventListener(t[s], e);
    else
      this.removeEventListener(t, e);
  }
}
Vi.prototype.on;
Vi.prototype.once;
Vi.prototype.un;
function Cl(n) {
  if (Array.isArray(n))
    for (let t = 0, e = n.length; t < e; ++t)
      Ct(n[t]);
  else
    Ct(
      /** @type {import("./events.js").EventsKey} */
      n
    );
}
function J() {
  throw new Error("Unimplemented abstract method.");
}
let Al = 0;
function H(n) {
  return n.ol_uid || (n.ol_uid = String(++Al));
}
class Sr extends xi {
  /**
   * @param {string} type The event type.
   * @param {string} key The property name.
   * @param {*} oldValue The old value for `key`.
   */
  constructor(t, e, i) {
    super(t), this.key = e, this.oldValue = i;
  }
}
class Ie extends Vi {
  /**
   * @param {Object<string, *>} [values] An object with key-value pairs.
   */
  constructor(t) {
    super(), this.on, this.once, this.un, H(this), this.values_ = null, t !== void 0 && this.setProperties(t);
  }
  /**
   * Gets a value.
   * @param {string} key Key name.
   * @return {*} Value.
   * @api
   */
  get(t) {
    let e;
    return this.values_ && this.values_.hasOwnProperty(t) && (e = this.values_[t]), e;
  }
  /**
   * Get a list of object property names.
   * @return {Array<string>} List of property names.
   * @api
   */
  getKeys() {
    return this.values_ && Object.keys(this.values_) || [];
  }
  /**
   * Get an object of all property names and values.
   * @return {Object<string, *>} Object.
   * @api
   */
  getProperties() {
    return this.values_ && Object.assign({}, this.values_) || {};
  }
  /**
   * Get an object of all property names and values.
   * @return {Object<string, *>?} Object.
   */
  getPropertiesInternal() {
    return this.values_;
  }
  /**
   * @return {boolean} The object has properties.
   */
  hasProperties() {
    return !!this.values_;
  }
  /**
   * @param {string} key Key name.
   * @param {*} oldValue Old value.
   */
  notify(t, e) {
    let i;
    i = `change:${t}`, this.hasListener(i) && this.dispatchEvent(new Sr(i, t, e)), i = Go.PROPERTYCHANGE, this.hasListener(i) && this.dispatchEvent(new Sr(i, t, e));
  }
  /**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */
  addChangeListener(t, e) {
    this.addEventListener(`change:${t}`, e);
  }
  /**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */
  removeChangeListener(t, e) {
    this.removeEventListener(`change:${t}`, e);
  }
  /**
   * Sets a value.
   * @param {string} key Key name.
   * @param {*} value Value.
   * @param {boolean} [silent] Update without triggering an event.
   * @api
   */
  set(t, e, i) {
    const s = this.values_ || (this.values_ = {});
    if (i)
      s[t] = e;
    else {
      const r = s[t];
      s[t] = e, r !== e && this.notify(t, r);
    }
  }
  /**
   * Sets a collection of key-value pairs.  Note that this changes any existing
   * properties and adds new ones (it does not remove any existing properties).
   * @param {Object<string, *>} values Values.
   * @param {boolean} [silent] Update without triggering an event.
   * @api
   */
  setProperties(t, e) {
    for (const i in t)
      this.set(i, t[i], e);
  }
  /**
   * Apply any properties from another object without triggering events.
   * @param {BaseObject} source The source object.
   * @protected
   */
  applyProperties(t) {
    t.values_ && Object.assign(this.values_ || (this.values_ = {}), t.values_);
  }
  /**
   * Unsets a property.
   * @param {string} key Key name.
   * @param {boolean} [silent] Unset without triggering an event.
   * @api
   */
  unset(t, e) {
    if (this.values_ && t in this.values_) {
      const i = this.values_[t];
      delete this.values_[t], fi(this.values_) && (this.values_ = null), e || this.notify(t, i);
    }
  }
}
class zo extends Ie {
  /**
   * @param {Options} options Control options.
   */
  constructor(t) {
    super();
    const e = t.element;
    e && !t.target && !e.style.pointerEvents && (e.style.pointerEvents = "auto"), this.element = e || null, this.target_ = null, this.map_ = null, this.listenerKeys = [], t.render && (this.render = t.render), t.target && this.setTarget(t.target);
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    var t;
    (t = this.element) == null || t.remove(), super.disposeInternal();
  }
  /**
   * Get the map associated with this control.
   * @return {import("../Map.js").default|null} Map.
   * @api
   */
  getMap() {
    return this.map_;
  }
  /**
   * Remove the control from its current map and attach it to the new map.
   * Pass `null` to just remove the control from the current map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../Map.js").default|null} map Map.
   * @api
   */
  setMap(t) {
    var e;
    this.map_ && ((e = this.element) == null || e.remove());
    for (let i = 0, s = this.listenerKeys.length; i < s; ++i)
      Ct(this.listenerKeys[i]);
    if (this.listenerKeys.length = 0, this.map_ = t, t) {
      const i = this.target_ ?? t.getOverlayContainerStopEvent();
      this.element && i.appendChild(this.element), this.render !== di && this.listenerKeys.push(
        kt(t, El.POSTRENDER, this.render, this)
      ), t.render();
    }
  }
  /**
   * Renders the control.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @api
   */
  render(t) {
  }
  /**
   * This function is used to set a target element for the control. It has no
   * effect if it is called after the control has been added to the map (i.e.
   * after `setMap` is called on the control). If no `target` is set in the
   * options passed to the control constructor and if `setTarget` is not called
   * then the control is added to the map's overlay container.
   * @param {HTMLElement|string} target Target.
   * @api
   */
  setTarget(t) {
    this.target_ = typeof t == "string" ? document.getElementById(t) : t;
  }
}
function vl(...n) {
  console.warn(...n);
}
const ct = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16
};
function wr(n) {
  const t = At();
  for (let e = 0, i = n.length; e < i; ++e)
    ki(t, n[e]);
  return t;
}
function Gi(n, t, e) {
  return e ? (e[0] = n[0] - t, e[1] = n[1] - t, e[2] = n[2] + t, e[3] = n[3] + t, e) : [
    n[0] - t,
    n[1] - t,
    n[2] + t,
    n[3] + t
  ];
}
function Ml(n, t) {
  return n.slice();
}
function Wo(n, t, e) {
  let i, s;
  return t < n[0] ? i = n[0] - t : n[2] < t ? i = t - n[2] : i = 0, e < n[1] ? s = n[1] - e : n[3] < e ? s = e - n[3] : s = 0, i * i + s * s;
}
function gi(n, t) {
  return Uo(n, t[0], t[1]);
}
function Mi(n, t) {
  return n[0] <= t[0] && t[2] <= n[2] && n[1] <= t[1] && t[3] <= n[3];
}
function Uo(n, t, e) {
  return n[0] <= t && t <= n[2] && n[1] <= e && e <= n[3];
}
function gs(n, t) {
  const e = n[0], i = n[1], s = n[2], r = n[3], o = t[0], a = t[1];
  let l = ct.UNKNOWN;
  return o < e ? l = l | ct.LEFT : o > s && (l = l | ct.RIGHT), a < i ? l = l | ct.BELOW : a > r && (l = l | ct.ABOVE), l === ct.UNKNOWN && (l = ct.INTERSECTING), l;
}
function At() {
  return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
}
function Te(n, t, e, i, s) {
  return s ? (s[0] = n, s[1] = t, s[2] = e, s[3] = i, s) : [n, t, e, i];
}
function Fs(n) {
  return Te(1 / 0, 1 / 0, -1 / 0, -1 / 0, n);
}
function Yo(n, t) {
  const e = n[0], i = n[1];
  return Te(e, i, e, i, t);
}
function Ds(n, t, e, i, s) {
  const r = Fs(s);
  return jo(r, n, t, e, i);
}
function Os(n, t) {
  return n[0] == t[0] && n[2] == t[2] && n[1] == t[1] && n[3] == t[3];
}
function Bo(n, t) {
  return t[0] < n[0] && (n[0] = t[0]), t[2] > n[2] && (n[2] = t[2]), t[1] < n[1] && (n[1] = t[1]), t[3] > n[3] && (n[3] = t[3]), n;
}
function ki(n, t) {
  t[0] < n[0] && (n[0] = t[0]), t[0] > n[2] && (n[2] = t[0]), t[1] < n[1] && (n[1] = t[1]), t[1] > n[3] && (n[3] = t[1]);
}
function jo(n, t, e, i, s) {
  for (; e < i; e += s)
    Ll(n, t[e], t[e + 1]);
  return n;
}
function Ll(n, t, e) {
  n[0] = Math.min(n[0], t), n[1] = Math.min(n[1], e), n[2] = Math.max(n[2], t), n[3] = Math.max(n[3], e);
}
function Zo(n, t) {
  let e;
  return e = t(bn(n)), e || (e = t(Fn(n)), e) || (e = t(Dn(n)), e) || (e = t(le(n)), e) ? e : !1;
}
function Ni(n) {
  let t = 0;
  return Ps(n) || (t = $(n) * lt(n)), t;
}
function bn(n) {
  return [n[0], n[1]];
}
function Fn(n) {
  return [n[2], n[1]];
}
function Ge(n) {
  return [(n[0] + n[2]) / 2, (n[1] + n[3]) / 2];
}
function bl(n, t) {
  let e;
  if (t === "bottom-left")
    e = bn(n);
  else if (t === "bottom-right")
    e = Fn(n);
  else if (t === "top-left")
    e = le(n);
  else if (t === "top-right")
    e = Dn(n);
  else
    throw new Error("Invalid corner");
  return e;
}
function Fl(n, t, e, i, s) {
  const [r, o, a, l, h, c, u, d] = Ko(
    n,
    t,
    e,
    i
  );
  return Te(
    Math.min(r, a, h, u),
    Math.min(o, l, c, d),
    Math.max(r, a, h, u),
    Math.max(o, l, c, d),
    s
  );
}
function Ko(n, t, e, i) {
  const s = t * i[0] / 2, r = t * i[1] / 2, o = Math.cos(e), a = Math.sin(e), l = s * o, h = s * a, c = r * o, u = r * a, d = n[0], g = n[1];
  return [
    d - l + u,
    g - h - c,
    d - l - u,
    g - h + c,
    d + l - u,
    g + h + c,
    d + l + u,
    g + h - c,
    d - l + u,
    g - h - c
  ];
}
function lt(n) {
  return n[3] - n[1];
}
function Zt(n, t, e) {
  const i = e || At();
  return St(n, t) ? (n[0] > t[0] ? i[0] = n[0] : i[0] = t[0], n[1] > t[1] ? i[1] = n[1] : i[1] = t[1], n[2] < t[2] ? i[2] = n[2] : i[2] = t[2], n[3] < t[3] ? i[3] = n[3] : i[3] = t[3]) : Fs(i), i;
}
function le(n) {
  return [n[0], n[3]];
}
function Dn(n) {
  return [n[2], n[3]];
}
function $(n) {
  return n[2] - n[0];
}
function St(n, t) {
  return n[0] <= t[2] && n[2] >= t[0] && n[1] <= t[3] && n[3] >= t[1];
}
function Ps(n) {
  return n[2] < n[0] || n[3] < n[1];
}
function Dl(n, t) {
  return t ? (t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t) : n;
}
function Ol(n, t, e) {
  let i = !1;
  const s = gs(n, t), r = gs(n, e);
  if (s === ct.INTERSECTING || r === ct.INTERSECTING)
    i = !0;
  else {
    const o = n[0], a = n[1], l = n[2], h = n[3], c = t[0], u = t[1], d = e[0], g = e[1], f = (g - u) / (d - c);
    let _, m;
    r & ct.ABOVE && !(s & ct.ABOVE) && (_ = d - (g - h) / f, i = _ >= o && _ <= l), !i && r & ct.RIGHT && !(s & ct.RIGHT) && (m = g - (d - l) * f, i = m >= a && m <= h), !i && r & ct.BELOW && !(s & ct.BELOW) && (_ = d - (g - a) / f, i = _ >= o && _ <= l), !i && r & ct.LEFT && !(s & ct.LEFT) && (m = g - (d - o) * f, i = m >= a && m <= h);
  }
  return i;
}
function Vo(n, t) {
  const e = t.getExtent(), i = Ge(n);
  if (t.canWrapX() && (i[0] < e[0] || i[0] >= e[2])) {
    const s = $(e), o = Math.floor(
      (i[0] - e[0]) / s
    ) * s;
    n[0] -= o, n[2] -= o;
  }
  return n;
}
function ks(n, t, e) {
  if (t.canWrapX()) {
    const i = t.getExtent();
    if (!isFinite(n[0]) || !isFinite(n[2]))
      return [[i[0], n[1], i[2], n[3]]];
    Vo(n, t);
    const s = $(i);
    if ($(n) > s && !e)
      return [[i[0], n[1], i[2], n[3]]];
    if (n[0] < i[0])
      return [
        [n[0] + s, n[1], i[2], n[3]],
        [i[0], n[1], n[2], n[3]]
      ];
    if (n[2] > i[2])
      return [
        [n[0], n[1], i[2], n[3]],
        [i[0], n[1], n[2] - s, n[3]]
      ];
  }
  return [n];
}
function st(n, t, e) {
  return Math.min(Math.max(n, t), e);
}
function Pl(n, t, e, i, s, r) {
  const o = s - e, a = r - i;
  if (o !== 0 || a !== 0) {
    const l = ((n - e) * o + (t - i) * a) / (o * o + a * a);
    l > 1 ? (e = s, i = r) : l > 0 && (e += o * l, i += a * l);
  }
  return ri(n, t, e, i);
}
function ri(n, t, e, i) {
  const s = e - n, r = i - t;
  return s * s + r * r;
}
function kl(n) {
  const t = n.length;
  for (let i = 0; i < t; i++) {
    let s = i, r = Math.abs(n[i][i]);
    for (let a = i + 1; a < t; a++) {
      const l = Math.abs(n[a][i]);
      l > r && (r = l, s = a);
    }
    if (r === 0)
      return null;
    const o = n[s];
    n[s] = n[i], n[i] = o;
    for (let a = i + 1; a < t; a++) {
      const l = -n[a][i] / n[i][i];
      for (let h = i; h < t + 1; h++)
        i == h ? n[a][h] = 0 : n[a][h] += l * n[i][h];
    }
  }
  const e = new Array(t);
  for (let i = t - 1; i >= 0; i--) {
    e[i] = n[i][t] / n[i][i];
    for (let s = i - 1; s >= 0; s--)
      n[s][t] -= n[s][i] * e[i];
  }
  return e;
}
function Ir(n) {
  return n * 180 / Math.PI;
}
function Ee(n) {
  return n * Math.PI / 180;
}
function se(n, t) {
  const e = n % t;
  return e * t < 0 ? e + t : e;
}
function Pt(n, t, e) {
  return n + e * (t - n);
}
function On(n, t) {
  const e = Math.pow(10, t);
  return Math.round(n * e) / e;
}
function Cr(n, t) {
  return Math.round(On(n, t));
}
function sn(n, t) {
  return Math.floor(On(n, t));
}
function rn(n, t) {
  return Math.ceil(On(n, t));
}
function _s(n, t, e) {
  if (n >= t && n < e)
    return n;
  const i = e - t;
  return ((n - t) % i + i) % i + t;
}
function $o(n, t) {
  const e = ("" + n).split("."), i = ("" + t).split(".");
  for (let s = 0; s < Math.max(e.length, i.length); s++) {
    const r = parseInt(e[s] || "0", 10), o = parseInt(i[s] || "0", 10);
    if (r > o)
      return 1;
    if (o > r)
      return -1;
  }
  return 0;
}
function Gl(n, t) {
  return n[0] += +t[0], n[1] += +t[1], n;
}
function mn(n, t) {
  let e = !0;
  for (let i = n.length - 1; i >= 0; --i)
    if (n[i] != t[i]) {
      e = !1;
      break;
    }
  return e;
}
function Nl(n, t) {
  const e = Math.cos(t), i = Math.sin(t), s = n[0] * e - n[1] * i, r = n[1] * e + n[0] * i;
  return n[0] = s, n[1] = r, n;
}
function Xl(n, t) {
  if (t.canWrapX()) {
    const e = $(t.getExtent()), i = zl(n, t, e);
    i && (n[0] -= i * e);
  }
  return n;
}
function zl(n, t, e) {
  const i = t.getExtent();
  let s = 0;
  return t.canWrapX() && (n[0] < i[0] || n[0] > i[2]) && (e = e || $(i), s = Math.floor(
    (n[0] - i[0]) / e
  )), s;
}
const Gs = {
  // use the radius of the Normal sphere
  radians: 6370997 / (2 * Math.PI),
  degrees: 2 * Math.PI * 6370997 / 360,
  ft: 0.3048,
  m: 1,
  "us-ft": 1200 / 3937
};
class Ns {
  /**
   * @param {Options} options Projection options.
   */
  constructor(t) {
    this.code_ = t.code, this.units_ = /** @type {import("./Units.js").Units} */
    t.units, this.extent_ = t.extent !== void 0 ? t.extent : null, this.worldExtent_ = t.worldExtent !== void 0 ? t.worldExtent : null, this.axisOrientation_ = t.axisOrientation !== void 0 ? t.axisOrientation : "enu", this.global_ = t.global !== void 0 ? t.global : !1, this.canWrapX_ = !!(this.global_ && this.extent_), this.getPointResolutionFunc_ = t.getPointResolution, this.defaultTileGrid_ = null, this.metersPerUnit_ = t.metersPerUnit;
  }
  /**
   * @return {boolean} The projection is suitable for wrapping the x-axis
   */
  canWrapX() {
    return this.canWrapX_;
  }
  /**
   * Get the code for this projection, e.g. 'EPSG:4326'.
   * @return {string} Code.
   * @api
   */
  getCode() {
    return this.code_;
  }
  /**
   * Get the validity extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent() {
    return this.extent_;
  }
  /**
   * Get the units of this projection.
   * @return {import("./Units.js").Units} Units.
   * @api
   */
  getUnits() {
    return this.units_;
  }
  /**
   * Get the amount of meters per unit of this projection.  If the projection is
   * not configured with `metersPerUnit` or a units identifier, the return is
   * `undefined`.
   * @return {number|undefined} Meters.
   * @api
   */
  getMetersPerUnit() {
    return this.metersPerUnit_ || Gs[this.units_];
  }
  /**
   * Get the world extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getWorldExtent() {
    return this.worldExtent_;
  }
  /**
   * Get the axis orientation of this projection.
   * Example values are:
   * enu - the default easting, northing, elevation.
   * neu - northing, easting, up - useful for "lat/long" geographic coordinates,
   *     or south orientated transverse mercator.
   * wnu - westing, northing, up - some planetary coordinate systems have
   *     "west positive" coordinate systems
   * @return {string} Axis orientation.
   * @api
   */
  getAxisOrientation() {
    return this.axisOrientation_;
  }
  /**
   * Is this projection a global projection which spans the whole world?
   * @return {boolean} Whether the projection is global.
   * @api
   */
  isGlobal() {
    return this.global_;
  }
  /**
   * Set if the projection is a global projection which spans the whole world
   * @param {boolean} global Whether the projection is global.
   * @api
   */
  setGlobal(t) {
    this.global_ = t, this.canWrapX_ = !!(t && this.extent_);
  }
  /**
   * @return {import("../tilegrid/TileGrid.js").default} The default tile grid.
   */
  getDefaultTileGrid() {
    return this.defaultTileGrid_;
  }
  /**
   * @param {import("../tilegrid/TileGrid.js").default} tileGrid The default tile grid.
   */
  setDefaultTileGrid(t) {
    this.defaultTileGrid_ = t;
  }
  /**
   * Set the validity extent for this projection.
   * @param {import("../extent.js").Extent} extent Extent.
   * @api
   */
  setExtent(t) {
    this.extent_ = t, this.canWrapX_ = !!(this.global_ && t);
  }
  /**
   * Set the world extent for this projection.
   * @param {import("../extent.js").Extent} worldExtent World extent
   *     [minlon, minlat, maxlon, maxlat].
   * @api
   */
  setWorldExtent(t) {
    this.worldExtent_ = t;
  }
  /**
   * Set the getPointResolution function (see {@link module:ol/proj.getPointResolution}
   * for this projection.
   * @param {function(number, import("../coordinate.js").Coordinate):number} func Function
   * @api
   */
  setGetPointResolution(t) {
    this.getPointResolutionFunc_ = t;
  }
  /**
   * Get the custom point resolution function for this projection (if set).
   * @return {GetPointResolution|undefined} The custom point
   * resolution function (if set).
   */
  getPointResolutionFunc() {
    return this.getPointResolutionFunc_;
  }
}
const $i = 6378137, ei = Math.PI * $i, Wl = [-ei, -ei, ei, ei], Ul = [-180, -85, 180, 85], on = $i * Math.log(Math.tan(Math.PI / 2));
class je extends Ns {
  /**
   * @param {string} code Code.
   */
  constructor(t) {
    super({
      code: t,
      units: "m",
      extent: Wl,
      global: !0,
      worldExtent: Ul,
      getPointResolution: function(e, i) {
        return e / Math.cosh(i[1] / $i);
      }
    });
  }
}
const Ar = [
  new je("EPSG:3857"),
  new je("EPSG:102100"),
  new je("EPSG:102113"),
  new je("EPSG:900913"),
  new je("http://www.opengis.net/def/crs/EPSG/0/3857"),
  new je("http://www.opengis.net/gml/srs/epsg.xml#3857")
];
function Yl(n, t, e, i) {
  const s = n.length;
  e = e > 1 ? e : 2, i = i ?? e, t === void 0 && (e > 2 ? t = n.slice() : t = new Array(s));
  for (let r = 0; r < s; r += i) {
    t[r] = ei * n[r] / 180;
    let o = $i * Math.log(Math.tan(Math.PI * (+n[r + 1] + 90) / 360));
    o > on ? o = on : o < -on && (o = -on), t[r + 1] = o;
  }
  return t;
}
function Bl(n, t, e, i) {
  const s = n.length;
  e = e > 1 ? e : 2, i = i ?? e, t === void 0 && (e > 2 ? t = n.slice() : t = new Array(s));
  for (let r = 0; r < s; r += i)
    t[r] = 180 * n[r] / ei, t[r + 1] = 360 * Math.atan(Math.exp(n[r + 1] / $i)) / Math.PI - 90;
  return t;
}
const jl = 6378137, vr = [-180, -90, 180, 90], Zl = Math.PI * jl / 180;
class Le extends Ns {
  /**
   * @param {string} code Code.
   * @param {string} [axisOrientation] Axis orientation.
   */
  constructor(t, e) {
    super({
      code: t,
      units: "degrees",
      extent: vr,
      axisOrientation: e,
      global: !0,
      metersPerUnit: Zl,
      worldExtent: vr
    });
  }
}
const Mr = [
  new Le("CRS:84"),
  new Le("EPSG:4326", "neu"),
  new Le("urn:ogc:def:crs:OGC:1.3:CRS84"),
  new Le("urn:ogc:def:crs:OGC:2:84"),
  new Le("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),
  new Le("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
  new Le("http://www.opengis.net/def/crs/EPSG/0/4326", "neu")
];
let ms = {};
function Kl(n) {
  return ms[n] || ms[n.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] || null;
}
function Vl(n, t) {
  ms[n] = t;
}
let oi = {};
function Xi(n, t, e) {
  const i = n.getCode(), s = t.getCode();
  i in oi || (oi[i] = {}), oi[i][s] = e;
}
function qn(n, t) {
  return n in oi && t in oi[n] ? oi[n][t] : null;
}
const pn = 0.9996, Gt = 669438e-8, Pn = Gt * Gt, kn = Pn * Gt, Fe = Gt / (1 - Gt), Lr = Math.sqrt(1 - Gt), _i = (1 - Lr) / (1 + Lr), qo = _i * _i, Xs = qo * _i, zs = Xs * _i, Ho = zs * _i, Jo = 1 - Gt / 4 - 3 * Pn / 64 - 5 * kn / 256, $l = 3 * Gt / 8 + 3 * Pn / 32 + 45 * kn / 1024, ql = 15 * Pn / 256 + 45 * kn / 1024, Hl = 35 * kn / 3072, Jl = 3 / 2 * _i - 27 / 32 * Xs + 269 / 512 * Ho, Ql = 21 / 16 * qo - 55 / 32 * zs, th = 151 / 96 * Xs - 417 / 128 * Ho, eh = 1097 / 512 * zs, yn = 6378137;
function ih(n, t, e) {
  const i = n - 5e5, o = (e.north ? t : t - 1e7) / pn / (yn * Jo), a = o + Jl * Math.sin(2 * o) + Ql * Math.sin(4 * o) + th * Math.sin(6 * o) + eh * Math.sin(8 * o), l = Math.sin(a), h = l * l, c = Math.cos(a), u = l / c, d = u * u, g = d * d, f = 1 - Gt * h, _ = Math.sqrt(1 - Gt * h), m = yn / _, p = (1 - Gt) / f, y = Fe * c ** 2, R = y * y, E = i / (m * pn), x = E * E, w = x * E, v = w * E, S = v * E, A = S * E, I = a - u / p * (x / 2 - v / 24 * (5 + 3 * d + 10 * y - 4 * R - 9 * Fe)) + A / 720 * (61 + 90 * d + 298 * y + 45 * g - 252 * Fe - 3 * R);
  let P = (E - w / 6 * (1 + 2 * d + y) + S / 120 * (5 - 2 * y + 28 * d - 3 * R + 8 * Fe + 24 * g)) / c;
  return P = _s(
    P + Ee(Qo(e.number)),
    -Math.PI,
    Math.PI
  ), [Ir(P), Ir(I)];
}
const br = -80, Fr = 84, nh = -180, sh = 180;
function rh(n, t, e) {
  n = _s(n, nh, sh), t < br ? t = br : t > Fr && (t = Fr);
  const i = Ee(t), s = Math.sin(i), r = Math.cos(i), o = s / r, a = o * o, l = a * a, h = Ee(n), c = Qo(e.number), u = Ee(c), d = yn / Math.sqrt(1 - Gt * s ** 2), g = Fe * r ** 2, f = r * _s(h - u, -Math.PI, Math.PI), _ = f * f, m = _ * f, p = m * f, y = p * f, R = y * f, E = yn * (Jo * i - $l * Math.sin(2 * i) + ql * Math.sin(4 * i) - Hl * Math.sin(6 * i)), x = pn * d * (f + m / 6 * (1 - a + g) + y / 120 * (5 - 18 * a + l + 72 * g - 58 * Fe)) + 5e5;
  let w = pn * (E + d * o * (_ / 2 + p / 24 * (5 - a + 9 * g + 4 * g ** 2) + R / 720 * (61 - 58 * a + l + 600 * g - 330 * Fe)));
  return e.north || (w += 1e7), [x, w];
}
function Qo(n) {
  return (n - 1) * 6 - 180 + 3;
}
const oh = [
  /^EPSG:(\d+)$/,
  /^urn:ogc:def:crs:EPSG::(\d+)$/,
  /^http:\/\/www\.opengis\.net\/def\/crs\/EPSG\/0\/(\d+)$/
];
function ta(n) {
  let t = 0;
  for (const s of oh) {
    const r = n.match(s);
    if (r) {
      t = parseInt(r[1]);
      break;
    }
  }
  if (!t)
    return null;
  let e = 0, i = !1;
  return t > 32700 && t < 32761 ? e = t - 32700 : t > 32600 && t < 32661 && (i = !0, e = t - 32600), e ? { number: e, north: i } : null;
}
function Dr(n, t) {
  return function(e, i, s, r) {
    const o = e.length;
    s = s > 1 ? s : 2, r = r ?? s, i || (s > 2 ? i = e.slice() : i = new Array(o));
    for (let a = 0; a < o; a += r) {
      const l = e[a], h = e[a + 1], c = n(l, h, t);
      i[a] = c[0], i[a + 1] = c[1];
    }
    return i;
  };
}
function ah(n) {
  return ta(n) ? new Ns({ code: n, units: "m" }) : null;
}
function lh(n) {
  const t = ta(n.getCode());
  return t ? {
    forward: Dr(rh, t),
    inverse: Dr(ih, t)
  } : null;
}
const hh = 63710088e-1;
function Or(n, t, e) {
  e = e || hh;
  const i = Ee(n[1]), s = Ee(t[1]), r = (s - i) / 2, o = Ee(t[0] - n[0]) / 2, a = Math.sin(r) * Math.sin(r) + Math.sin(o) * Math.sin(o) * Math.cos(i) * Math.cos(s);
  return 2 * e * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
const ch = [lh], uh = [ah];
let ps = !0;
function ea(n) {
  ps = !1;
}
function Ws(n, t) {
  if (t !== void 0) {
    for (let e = 0, i = n.length; e < i; ++e)
      t[e] = n[e];
    t = t;
  } else
    t = n.slice();
  return t;
}
function ys(n) {
  Vl(n.getCode(), n), Xi(n, n, Ws);
}
function dh(n) {
  n.forEach(ys);
}
function pt(n) {
  if (typeof n != "string")
    return n;
  const t = Kl(n);
  if (t)
    return t;
  for (const e of uh) {
    const i = e(n);
    if (i)
      return i;
  }
  return null;
}
function Pr(n, t, e, i) {
  n = pt(n);
  let s;
  const r = n.getPointResolutionFunc();
  if (r)
    s = r(t, e);
  else {
    const o = n.getUnits();
    if (o == "degrees" || i == "degrees")
      s = t;
    else {
      const a = Bs(
        n,
        pt("EPSG:4326")
      );
      if (!a && o !== "degrees")
        s = t * n.getMetersPerUnit();
      else {
        let h = [
          e[0] - t / 2,
          e[1],
          e[0] + t / 2,
          e[1],
          e[0],
          e[1] - t / 2,
          e[0],
          e[1] + t / 2
        ];
        h = a(h, h, 2);
        const c = Or(h.slice(0, 2), h.slice(2, 4)), u = Or(h.slice(4, 6), h.slice(6, 8));
        s = (c + u) / 2;
      }
      const l = n.getMetersPerUnit();
      l !== void 0 && (s /= l);
    }
  }
  return s;
}
function kr(n) {
  dh(n), n.forEach(function(t) {
    n.forEach(function(e) {
      t !== e && Xi(t, e, Ws);
    });
  });
}
function fh(n, t, e, i) {
  n.forEach(function(s) {
    t.forEach(function(r) {
      Xi(s, r, e), Xi(r, s, i);
    });
  });
}
function Us(n, t) {
  return n ? typeof n == "string" ? pt(n) : (
    /** @type {Projection} */
    n
  ) : pt(t);
}
function gh(n) {
  return (
    /**
     * @param {Array<number>} input Input.
     * @param {Array<number>} [output] Output.
     * @param {number} [dimension] Dimensions that should be transformed.
     * @param {number} [stride] Stride.
     * @return {Array<number>} Output.
     */
    function(t, e, i, s) {
      const r = t.length;
      i = i !== void 0 ? i : 2, s = s ?? i, e = e !== void 0 ? e : new Array(r);
      for (let o = 0; o < r; o += s) {
        const a = n(t.slice(o, o + i)), l = a.length;
        for (let h = 0, c = s; h < c; ++h)
          e[o + h] = h >= l ? t[o + h] : a[h];
      }
      return e;
    }
  );
}
function Ys(n, t) {
  return ea(), qi(
    n,
    "EPSG:4326",
    "EPSG:3857"
  );
}
function _h(n, t) {
  const e = qi(
    n,
    "EPSG:3857",
    "EPSG:4326"
  ), i = e[0];
  return (i < -180 || i > 180) && (e[0] = se(i + 180, 360) - 180), e;
}
function ai(n, t) {
  if (n === t)
    return !0;
  const e = n.getUnits() === t.getUnits();
  return (n.getCode() === t.getCode() || Bs(n, t) === Ws) && e;
}
function Bs(n, t) {
  const e = n.getCode(), i = t.getCode();
  let s = qn(e, i);
  if (s)
    return s;
  let r = null, o = null;
  for (const l of ch)
    r || (r = l(n)), o || (o = l(t));
  if (!r && !o)
    return null;
  const a = "EPSG:4326";
  if (o)
    if (r)
      s = Hn(
        r.inverse,
        o.forward
      );
    else {
      const l = qn(e, a);
      l && (s = Hn(
        l,
        o.forward
      ));
    }
  else {
    const l = qn(a, i);
    l && (s = Hn(
      r.inverse,
      l
    ));
  }
  return s && (ys(n), ys(t), Xi(n, t, s)), s;
}
function Hn(n, t) {
  return function(e, i, s, r) {
    return i = n(e, i, s, r), t(i, i, s, r);
  };
}
function En(n, t) {
  const e = pt(n), i = pt(t);
  return Bs(e, i);
}
function qi(n, t, e) {
  const i = En(t, e);
  if (!i) {
    const s = pt(t).getCode(), r = pt(e).getCode();
    throw new Error(
      `No transform available between ${s} and ${r}`
    );
  }
  return i(n, void 0, n.length);
}
function Gr(n, t) {
  return n;
}
function ce(n, t) {
  return ps && !mn(n, [0, 0]) && n[0] >= -180 && n[0] <= 180 && n[1] >= -90 && n[1] <= 90 && (ps = !1, vl(
    "Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates."
  )), n;
}
function ia(n, t) {
  return n;
}
function pe(n, t) {
  return n;
}
function mh() {
  kr(Ar), kr(Mr), fh(
    Mr,
    Ar,
    Yl,
    Bl
  );
}
mh();
function et(n, t) {
  if (!n)
    throw new Error(t);
}
class js extends Ie {
  /**
   * @param {Geometry|ObjectWithGeometry<Geometry>} [geometryOrProperties]
   *     You may pass a Geometry object directly, or an object literal containing
   *     properties. If you pass an object literal, you may include a Geometry
   *     associated with a `geometry` key.
   */
  constructor(t) {
    if (super(), this.on, this.once, this.un, this.id_ = void 0, this.geometryName_ = "geometry", this.style_ = null, this.styleFunction_ = void 0, this.geometryChangeKey_ = null, this.addChangeListener(this.geometryName_, this.handleGeometryChanged_), t)
      if (typeof /** @type {?} */
      t.getSimplifiedGeometry == "function") {
        const e = (
          /** @type {Geometry} */
          t
        );
        this.setGeometry(e);
      } else {
        const e = t;
        this.setProperties(e);
      }
  }
  /**
   * Clone this feature. If the original feature has a geometry it
   * is also cloned. The feature id is not set in the clone.
   * @return {Feature<Geometry>} The clone.
   * @api
   */
  clone() {
    const t = (
      /** @type {Feature<Geometry>} */
      new js(this.hasProperties() ? this.getProperties() : null)
    );
    t.setGeometryName(this.getGeometryName());
    const e = this.getGeometry();
    e && t.setGeometry(
      /** @type {Geometry} */
      e.clone()
    );
    const i = this.getStyle();
    return i && t.setStyle(i), t;
  }
  /**
   * Get the feature's default geometry.  A feature may have any number of named
   * geometries.  The "default" geometry (the one that is rendered by default) is
   * set when calling {@link module:ol/Feature~Feature#setGeometry}.
   * @return {Geometry|undefined} The default geometry for the feature.
   * @api
   * @observable
   */
  getGeometry() {
    return (
      /** @type {Geometry|undefined} */
      this.get(this.geometryName_)
    );
  }
  /**
   * Get the feature identifier.  This is a stable identifier for the feature and
   * is either set when reading data from a remote source or set explicitly by
   * calling {@link module:ol/Feature~Feature#setId}.
   * @return {number|string|undefined} Id.
   * @api
   */
  getId() {
    return this.id_;
  }
  /**
   * Get the name of the feature's default geometry.  By default, the default
   * geometry is named `geometry`.
   * @return {string} Get the property name associated with the default geometry
   *     for this feature.
   * @api
   */
  getGeometryName() {
    return this.geometryName_;
  }
  /**
   * Get the feature's style. Will return what was provided to the
   * {@link module:ol/Feature~Feature#setStyle} method.
   * @return {import("./style/Style.js").StyleLike|undefined} The feature style.
   * @api
   */
  getStyle() {
    return this.style_;
  }
  /**
   * Get the feature's style function.
   * @return {import("./style/Style.js").StyleFunction|undefined} Return a function
   * representing the current style of this feature.
   * @api
   */
  getStyleFunction() {
    return this.styleFunction_;
  }
  /**
   * @private
   */
  handleGeometryChange_() {
    this.changed();
  }
  /**
   * @private
   */
  handleGeometryChanged_() {
    this.geometryChangeKey_ && (Ct(this.geometryChangeKey_), this.geometryChangeKey_ = null);
    const t = this.getGeometry();
    t && (this.geometryChangeKey_ = kt(
      t,
      ut.CHANGE,
      this.handleGeometryChange_,
      this
    )), this.changed();
  }
  /**
   * Set the default geometry for the feature.  This will update the property
   * with the name returned by {@link module:ol/Feature~Feature#getGeometryName}.
   * @param {Geometry|undefined} geometry The new geometry.
   * @api
   * @observable
   */
  setGeometry(t) {
    this.set(this.geometryName_, t);
  }
  /**
   * Set the style for the feature to override the layer style.  This can be a
   * single style object, an array of styles, or a function that takes a
   * resolution and returns an array of styles. To unset the feature style, call
   * `setStyle()` without arguments or a falsey value.
   * @param {import("./style/Style.js").StyleLike} [style] Style for this feature.
   * @api
   * @fires module:ol/events/Event~BaseEvent#event:change
   */
  setStyle(t) {
    this.style_ = t, this.styleFunction_ = t ? ph(t) : void 0, this.changed();
  }
  /**
   * Set the feature id.  The feature id is considered stable and may be used when
   * requesting features or comparing identifiers returned from a remote source.
   * The feature id can be used with the
   * {@link module:ol/source/Vector~VectorSource#getFeatureById} method.
   * @param {number|string|undefined} id The feature id.
   * @api
   * @fires module:ol/events/Event~BaseEvent#event:change
   */
  setId(t) {
    this.id_ = t, this.changed();
  }
  /**
   * Set the property name to be used when getting the feature's default geometry.
   * When calling {@link module:ol/Feature~Feature#getGeometry}, the value of the property with
   * this name will be returned.
   * @param {string} name The property name of the default geometry.
   * @api
   */
  setGeometryName(t) {
    this.removeChangeListener(this.geometryName_, this.handleGeometryChanged_), this.geometryName_ = t, this.addChangeListener(this.geometryName_, this.handleGeometryChanged_), this.handleGeometryChanged_();
  }
}
function ph(n) {
  if (typeof n == "function")
    return n;
  let t;
  return Array.isArray(n) ? t = n : (et(
    typeof /** @type {?} */
    n.getZIndex == "function",
    "Expected an `ol/style/Style` or an array of `ol/style/Style.js`"
  ), t = [
    /** @type {import("./style/Style.js").default} */
    n
  ]), function() {
    return t;
  };
}
new Array(6);
function re() {
  return [1, 0, 0, 1, 0, 0];
}
function yh(n, t) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n[4] = t[4], n[5] = t[5], n;
}
function _t(n, t) {
  const e = t[0], i = t[1];
  return t[0] = n[0] * e + n[2] * i + n[4], t[1] = n[1] * e + n[3] * i + n[5], t;
}
function Se(n, t, e, i, s, r, o, a) {
  const l = Math.sin(r), h = Math.cos(r);
  return n[0] = i * h, n[1] = s * l, n[2] = -i * l, n[3] = s * h, n[4] = o * i * h - a * i * l + t, n[5] = o * s * l + a * s * h + e, n;
}
function Eh(n, t) {
  const e = xh(t);
  et(e !== 0, "Transformation matrix cannot be inverted");
  const i = t[0], s = t[1], r = t[2], o = t[3], a = t[4], l = t[5];
  return n[0] = o / e, n[1] = -s / e, n[2] = -r / e, n[3] = i / e, n[4] = (r * l - o * a) / e, n[5] = -(i * l - s * a) / e, n;
}
function xh(n) {
  return n[0] * n[3] - n[1] * n[2];
}
const Nr = [1e6, 1e6, 1e6, 1e6, 2, 2];
function Rh(n) {
  return "matrix(" + n.map(
    (e, i) => Math.round(e * Nr[i]) / Nr[i]
  ).join(", ") + ")";
}
function xe(n, t, e, i, s, r, o) {
  r = r || [], o = o || 2;
  let a = 0;
  for (let l = t; l < e; l += i) {
    const h = n[l], c = n[l + 1];
    r[a++] = s[0] * h + s[2] * c + s[4], r[a++] = s[1] * h + s[3] * c + s[5];
    for (let u = 2; u < o; u++)
      r[a++] = n[l + u];
  }
  return r && r.length != a && (r.length = a), r;
}
function na(n, t, e, i, s, r, o) {
  o = o || [];
  const a = Math.cos(s), l = Math.sin(s), h = r[0], c = r[1];
  let u = 0;
  for (let d = t; d < e; d += i) {
    const g = n[d] - h, f = n[d + 1] - c;
    o[u++] = h + g * a - f * l, o[u++] = c + g * l + f * a;
    for (let _ = d + 2; _ < d + i; ++_)
      o[u++] = n[_];
  }
  return o && o.length != u && (o.length = u), o;
}
function Th(n, t, e, i, s, r, o, a) {
  a = a || [];
  const l = o[0], h = o[1];
  let c = 0;
  for (let u = t; u < e; u += i) {
    const d = n[u] - l, g = n[u + 1] - h;
    a[c++] = l + s * d, a[c++] = h + r * g;
    for (let f = u + 2; f < u + i; ++f)
      a[c++] = n[f];
  }
  return a && a.length != c && (a.length = c), a;
}
function Sh(n, t, e, i, s, r, o) {
  o = o || [];
  let a = 0;
  for (let l = t; l < e; l += i) {
    o[a++] = n[l] + s, o[a++] = n[l + 1] + r;
    for (let h = l + 2; h < l + i; ++h)
      o[a++] = n[h];
  }
  return o && o.length != a && (o.length = a), o;
}
const Xr = re(), wh = [NaN, NaN];
class Ih extends Ie {
  constructor() {
    super(), this.extent_ = At(), this.extentRevision_ = -1, this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = 0, this.simplifyTransformedInternal = Xo(
      (t, e, i) => {
        if (!i)
          return this.getSimplifiedGeometry(e);
        const s = this.clone();
        return s.applyTransform(i), s.getSimplifiedGeometry(e);
      }
    );
  }
  /**
   * Get a transformed and simplified version of the geometry.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
   * @return {Geometry} Simplified geometry.
   */
  simplifyTransformed(t, e) {
    return this.simplifyTransformedInternal(
      this.getRevision(),
      t,
      e
    );
  }
  /**
   * Make a complete copy of the geometry.
   * @abstract
   * @return {!Geometry} Clone.
   */
  clone() {
    return J();
  }
  /**
   * @abstract
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(t, e, i, s) {
    return J();
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */
  containsXY(t, e) {
    return this.closestPointXY(t, e, wh, Number.MIN_VALUE) === 0;
  }
  /**
   * Return the closest point of the geometry to the passed point as
   * {@link module:ol/coordinate~Coordinate coordinate}.
   * @param {import("../coordinate.js").Coordinate} point Point.
   * @param {import("../coordinate.js").Coordinate} [closestPoint] Closest point.
   * @return {import("../coordinate.js").Coordinate} Closest point.
   * @api
   */
  getClosestPoint(t, e) {
    return e = e || [NaN, NaN], this.closestPointXY(t[0], t[1], e, 1 / 0), e;
  }
  /**
   * Returns true if this geometry includes the specified coordinate. If the
   * coordinate is on the boundary of the geometry, returns false.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {boolean} Contains coordinate.
   * @api
   */
  intersectsCoordinate(t) {
    return this.containsXY(t[0], t[1]);
  }
  /**
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */
  computeExtent(t) {
    return J();
  }
  /**
   * Get the extent of the geometry.
   * @param {import("../extent.js").Extent} [extent] Extent.
   * @return {import("../extent.js").Extent} extent Extent.
   * @api
   */
  getExtent(t) {
    if (this.extentRevision_ != this.getRevision()) {
      const e = this.computeExtent(this.extent_);
      (isNaN(e[0]) || isNaN(e[1])) && Fs(e), this.extentRevision_ = this.getRevision();
    }
    return Dl(this.extent_, t);
  }
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} angle Rotation angle in radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */
  rotate(t, e) {
    J();
  }
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */
  scale(t, e, i) {
    J();
  }
  /**
   * Create a simplified version of this geometry.  For linestrings, this uses
   * the [Douglas Peucker](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm)
   * algorithm.  For polygons, a quantization-based
   * simplification is used to preserve topology.
   * @param {number} tolerance The tolerance distance for simplification.
   * @return {Geometry} A new, simplified version of the original geometry.
   * @api
   */
  simplify(t) {
    return this.getSimplifiedGeometry(t * t);
  }
  /**
   * Create a simplified version of this geometry using the Douglas Peucker
   * algorithm.
   * See https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Geometry} Simplified geometry.
   */
  getSimplifiedGeometry(t) {
    return J();
  }
  /**
   * Get the type of this geometry.
   * @abstract
   * @return {Type} Geometry type.
   */
  getType() {
    return J();
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @abstract
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   */
  applyTransform(t) {
    J();
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   */
  intersectsExtent(t) {
    return J();
  }
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @abstract
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */
  translate(t, e) {
    J();
  }
  /**
   * Transform each coordinate of the geometry from one coordinate reference
   * system to another. The geometry is modified in place.
   * For example, a line will be transformed to a line and a circle to a circle.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   *
   * @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @return {this} This geometry.  Note that original geometry is
   *     modified in place.
   * @api
   */
  transform(t, e) {
    const i = pt(t), s = i.getUnits() == "tile-pixels" ? function(r, o, a) {
      const l = i.getExtent(), h = i.getWorldExtent(), c = lt(h) / lt(l);
      Se(
        Xr,
        h[0],
        h[3],
        c,
        -c,
        0,
        0,
        0
      );
      const u = xe(
        r,
        0,
        r.length,
        a,
        Xr,
        o
      ), d = En(i, e);
      return d ? d(u, u, a) : u;
    } : En(i, e);
    return this.applyTransform(s), this;
  }
}
class Zs extends Ih {
  constructor() {
    super(), this.layout = "XY", this.stride = 2, this.flatCoordinates;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   * @override
   */
  computeExtent(t) {
    return Ds(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t
    );
  }
  /**
   * @abstract
   * @return {Array<*> | null} Coordinates.
   */
  getCoordinates() {
    return J();
  }
  /**
   * Return the first coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} First coordinate.
   * @api
   */
  getFirstCoordinate() {
    return this.flatCoordinates.slice(0, this.stride);
  }
  /**
   * @return {Array<number>} Flat coordinates.
   */
  getFlatCoordinates() {
    return this.flatCoordinates;
  }
  /**
   * Return the last coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} Last point.
   * @api
   */
  getLastCoordinate() {
    return this.flatCoordinates.slice(
      this.flatCoordinates.length - this.stride
    );
  }
  /**
   * Return the {@link import("./Geometry.js").GeometryLayout layout} of the geometry.
   * @return {import("./Geometry.js").GeometryLayout} Layout.
   * @api
   */
  getLayout() {
    return this.layout;
  }
  /**
   * Create a simplified version of this geometry using the Douglas Peucker algorithm.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   * @override
   */
  getSimplifiedGeometry(t) {
    if (this.simplifiedGeometryRevision !== this.getRevision() && (this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = this.getRevision()), t < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && t <= this.simplifiedGeometryMaxMinSquaredTolerance)
      return this;
    const e = this.getSimplifiedGeometryInternal(t);
    return e.getFlatCoordinates().length < this.flatCoordinates.length ? e : (this.simplifiedGeometryMaxMinSquaredTolerance = t, this);
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   * @protected
   */
  getSimplifiedGeometryInternal(t) {
    return this;
  }
  /**
   * @return {number} Stride.
   */
  getStride() {
    return this.stride;
  }
  /**
   * @param {import("./Geometry.js").GeometryLayout} layout Layout.
   * @param {Array<number>} flatCoordinates Flat coordinates.
   */
  setFlatCoordinates(t, e) {
    this.stride = zr(t), this.layout = t, this.flatCoordinates = e;
  }
  /**
   * @abstract
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  setCoordinates(t, e) {
    J();
  }
  /**
   * @param {import("./Geometry.js").GeometryLayout|undefined} layout Layout.
   * @param {Array<*>} coordinates Coordinates.
   * @param {number} nesting Nesting.
   * @protected
   */
  setLayout(t, e, i) {
    let s;
    if (t)
      s = zr(t);
    else {
      for (let r = 0; r < i; ++r) {
        if (e.length === 0) {
          this.layout = "XY", this.stride = 2;
          return;
        }
        e = /** @type {Array<unknown>} */
        e[0];
      }
      s = e.length, t = Ch(s);
    }
    this.layout = t, this.stride = s;
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   * @api
   * @override
   */
  applyTransform(t) {
    this.flatCoordinates && (t(
      this.flatCoordinates,
      this.flatCoordinates,
      this.layout.startsWith("XYZ") ? 3 : 2,
      this.stride
    ), this.changed());
  }
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in counter-clockwise radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   * @override
   */
  rotate(t, e) {
    const i = this.getFlatCoordinates();
    if (i) {
      const s = this.getStride();
      na(
        i,
        0,
        i.length,
        s,
        t,
        e,
        i
      ), this.changed();
    }
  }
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   * @override
   */
  scale(t, e, i) {
    e === void 0 && (e = t), i || (i = Ge(this.getExtent()));
    const s = this.getFlatCoordinates();
    if (s) {
      const r = this.getStride();
      Th(
        s,
        0,
        s.length,
        r,
        t,
        e,
        i,
        s
      ), this.changed();
    }
  }
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   * @override
   */
  translate(t, e) {
    const i = this.getFlatCoordinates();
    if (i) {
      const s = this.getStride();
      Sh(
        i,
        0,
        i.length,
        s,
        t,
        e,
        i
      ), this.changed();
    }
  }
}
function Ch(n) {
  let t;
  return n == 2 ? t = "XY" : n == 3 ? t = "XYZ" : n == 4 && (t = "XYZM"), /** @type {import("./Geometry.js").GeometryLayout} */
  t;
}
function zr(n) {
  let t;
  return n == "XY" ? t = 2 : n == "XYZ" || n == "XYM" ? t = 3 : n == "XYZM" && (t = 4), /** @type {number} */
  t;
}
function Ah(n, t, e) {
  const i = n.getFlatCoordinates();
  if (!i)
    return null;
  const s = n.getStride();
  return xe(
    i,
    0,
    i.length,
    s,
    t,
    e
  );
}
function vh(n, t, e, i) {
  for (let s = 0, r = e.length; s < r; ++s)
    n[t++] = e[s];
  return t;
}
function sa(n, t, e, i) {
  for (let s = 0, r = e.length; s < r; ++s) {
    const o = e[s];
    for (let a = 0; a < i; ++a)
      n[t++] = o[a];
  }
  return t;
}
function Mh(n, t, e, i, s) {
  s = s || [];
  let r = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = sa(
      n,
      t,
      e[o],
      i
    );
    s[r++] = l, t = l;
  }
  return s.length = r, s;
}
class Gn extends Zs {
  /**
   * @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(t, e) {
    super(), this.setCoordinates(t, e);
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Point} Clone.
   * @api
   * @override
   */
  clone() {
    const t = new Gn(this.flatCoordinates.slice(), this.layout);
    return t.applyProperties(this), t;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(t, e, i, s) {
    const r = this.flatCoordinates, o = ri(
      t,
      e,
      r[0],
      r[1]
    );
    if (o < s) {
      const a = this.stride;
      for (let l = 0; l < a; ++l)
        i[l] = r[l];
      return i.length = a, o;
    }
    return s;
  }
  /**
   * Return the coordinate of the point.
   * @return {import("../coordinate.js").Coordinate} Coordinates.
   * @api
   * @override
   */
  getCoordinates() {
    return this.flatCoordinates.slice();
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   * @override
   */
  computeExtent(t) {
    return Yo(this.flatCoordinates, t);
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "Point";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(t) {
    return Uo(t, this.flatCoordinates[0], this.flatCoordinates[1]);
  }
  /**
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(t, e) {
    this.setLayout(e, t, 0), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = vh(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
const B = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3
}, Wr = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
};
var Ur = {
  red: 0,
  orange: 60,
  yellow: 120,
  green: 180,
  blue: 240,
  purple: 300
};
function Lh(n) {
  var c, u;
  var t, e = [], i = 1, s;
  if (typeof n == "number")
    return { space: "rgb", values: [n >>> 16, (n & 65280) >>> 8, n & 255], alpha: 1 };
  if (typeof n == "number") return { space: "rgb", values: [n >>> 16, (n & 65280) >>> 8, n & 255], alpha: 1 };
  if (n = String(n).toLowerCase(), Wr[n])
    e = Wr[n].slice(), s = "rgb";
  else if (n === "transparent")
    i = 0, s = "rgb", e = [0, 0, 0];
  else if (n[0] === "#") {
    var r = n.slice(1), o = r.length, a = o <= 4;
    i = 1, a ? (e = [
      parseInt(r[0] + r[0], 16),
      parseInt(r[1] + r[1], 16),
      parseInt(r[2] + r[2], 16)
    ], o === 4 && (i = parseInt(r[3] + r[3], 16) / 255)) : (e = [
      parseInt(r[0] + r[1], 16),
      parseInt(r[2] + r[3], 16),
      parseInt(r[4] + r[5], 16)
    ], o === 8 && (i = parseInt(r[6] + r[7], 16) / 255)), e[0] || (e[0] = 0), e[1] || (e[1] = 0), e[2] || (e[2] = 0), s = "rgb";
  } else if (t = /^((?:rgba?|hs[lvb]a?|hwba?|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms|oklch|oklab|color))\s*\(([^\)]*)\)/.exec(n)) {
    var l = t[1];
    s = l.replace(/a$/, "");
    var h = s === "cmyk" ? 4 : s === "gray" ? 1 : 3;
    e = t[2].trim().split(/\s*[,\/]\s*|\s+/), s === "color" && (s = e.shift()), e = e.map(function(d, g) {
      if (d[d.length - 1] === "%")
        return d = parseFloat(d) / 100, g === 3 ? d : s === "rgb" ? d * 255 : s[0] === "h" || s[0] === "l" && !g ? d * 100 : s === "lab" ? d * 125 : s === "lch" ? g < 2 ? d * 150 : d * 360 : s[0] === "o" && !g ? d : s === "oklab" ? d * 0.4 : s === "oklch" ? g < 2 ? d * 0.4 : d * 360 : d;
      if (s[g] === "h" || g === 2 && s[s.length - 1] === "h") {
        if (Ur[d] !== void 0) return Ur[d];
        if (d.endsWith("deg")) return parseFloat(d);
        if (d.endsWith("turn")) return parseFloat(d) * 360;
        if (d.endsWith("grad")) return parseFloat(d) * 360 / 400;
        if (d.endsWith("rad")) return parseFloat(d) * 180 / Math.PI;
      }
      return d === "none" ? 0 : parseFloat(d);
    }), i = e.length > h ? e.pop() : 1;
  } else /[0-9](?:\s|\/|,)/.test(n) && (e = n.match(/([0-9]+)/g).map(function(d) {
    return parseFloat(d);
  }), s = ((u = (c = n.match(/([a-z])/ig)) == null ? void 0 : c.join("")) == null ? void 0 : u.toLowerCase()) || "rgb");
  return {
    space: s,
    values: e,
    alpha: i
  };
}
const zi = {
  name: "rgb",
  min: [0, 0, 0],
  max: [255, 255, 255],
  channel: ["red", "green", "blue"],
  alias: ["RGB"]
};
var Jn = {
  name: "hsl",
  min: [0, 0, 0],
  max: [360, 100, 100],
  channel: ["hue", "saturation", "lightness"],
  alias: ["HSL"],
  rgb: function(n) {
    var t = n[0] / 360, e = n[1] / 100, i = n[2] / 100, s, r, o, a, l, h = 0;
    if (e === 0) return l = i * 255, [l, l, l];
    for (r = i < 0.5 ? i * (1 + e) : i + e - i * e, s = 2 * i - r, a = [0, 0, 0]; h < 3; )
      o = t + 1 / 3 * -(h - 1), o < 0 ? o++ : o > 1 && o--, l = 6 * o < 1 ? s + (r - s) * 6 * o : 2 * o < 1 ? r : 3 * o < 2 ? s + (r - s) * (2 / 3 - o) * 6 : s, a[h++] = l * 255;
    return a;
  }
};
zi.hsl = function(n) {
  var t = n[0] / 255, e = n[1] / 255, i = n[2] / 255, s = Math.min(t, e, i), r = Math.max(t, e, i), o = r - s, a, l, h;
  return r === s ? a = 0 : t === r ? a = (e - i) / o : e === r ? a = 2 + (i - t) / o : i === r && (a = 4 + (t - e) / o), a = Math.min(a * 60, 360), a < 0 && (a += 360), h = (s + r) / 2, r === s ? l = 0 : h <= 0.5 ? l = o / (r + s) : l = o / (2 - r - s), [a, l * 100, h * 100];
};
function bh(n) {
  Array.isArray(n) && n.raw && (n = String.raw(...arguments)), n instanceof Number && (n = +n);
  var t, e = Lh(n);
  if (!e.space) return [];
  const i = e.space[0] === "h" ? Jn.min : zi.min, s = e.space[0] === "h" ? Jn.max : zi.max;
  return t = Array(3), t[0] = Math.min(Math.max(e.values[0], i[0]), s[0]), t[1] = Math.min(Math.max(e.values[1], i[1]), s[1]), t[2] = Math.min(Math.max(e.values[2], i[2]), s[2]), e.space[0] === "h" && (t = Jn.rgb(t)), t.push(Math.min(Math.max(e.alpha, 0), 1)), t;
}
const mt = {
  name: "xyz",
  min: [0, 0, 0],
  channel: ["X", "Y", "Z"],
  alias: ["XYZ", "ciexyz", "cie1931"],
  // Whitepoint reference values with observer/illuminant
  // http://en.wikipedia.org/wiki/Standard_illuminant
  whitepoint: {
    //1931 2°
    2: {
      //incadescent
      A: [109.85, 100, 35.585],
      // B:[],
      C: [98.074, 100, 118.232],
      D50: [96.422, 100, 82.521],
      D55: [95.682, 100, 92.149],
      //daylight
      D65: [95.045592705167, 100, 108.9057750759878],
      D75: [94.972, 100, 122.638],
      //flourescent
      // F1: [],
      F2: [99.187, 100, 67.395],
      // F3: [],
      // F4: [],
      // F5: [],
      // F6:[],
      F7: [95.044, 100, 108.755],
      // F8: [],
      // F9: [],
      // F10: [],
      F11: [100.966, 100, 64.37],
      // F12: [],
      E: [100, 100, 100]
    },
    //1964  10°
    10: {
      //incadescent
      A: [111.144, 100, 35.2],
      C: [97.285, 100, 116.145],
      D50: [96.72, 100, 81.427],
      D55: [95.799, 100, 90.926],
      //daylight
      D65: [94.811, 100, 107.304],
      D75: [94.416, 100, 120.641],
      //flourescent
      F2: [103.28, 100, 69.026],
      F7: [95.792, 100, 107.687],
      F11: [103.866, 100, 65.627],
      E: [100, 100, 100]
    }
  }
};
mt.max = mt.whitepoint[2].D65;
mt.rgb = function(n, t) {
  t = t || mt.whitepoint[2].E;
  var e = n[0] / t[0], i = n[1] / t[1], s = n[2] / t[2], r, o, a;
  return r = e * 3.240969941904521 + i * -1.537383177570093 + s * -0.498610760293, o = e * -0.96924363628087 + i * 1.87596750150772 + s * 0.041555057407175, a = e * 0.055630079696993 + i * -0.20397695888897 + s * 1.056971514242878, r = r > 31308e-7 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r = r * 12.92, o = o > 31308e-7 ? 1.055 * Math.pow(o, 1 / 2.4) - 0.055 : o = o * 12.92, a = a > 31308e-7 ? 1.055 * Math.pow(a, 1 / 2.4) - 0.055 : a = a * 12.92, r = Math.min(Math.max(0, r), 1), o = Math.min(Math.max(0, o), 1), a = Math.min(Math.max(0, a), 1), [r * 255, o * 255, a * 255];
};
zi.xyz = function(n, t) {
  var e = n[0] / 255, i = n[1] / 255, s = n[2] / 255;
  e = e > 0.04045 ? Math.pow((e + 0.055) / 1.055, 2.4) : e / 12.92, i = i > 0.04045 ? Math.pow((i + 0.055) / 1.055, 2.4) : i / 12.92, s = s > 0.04045 ? Math.pow((s + 0.055) / 1.055, 2.4) : s / 12.92;
  var r = e * 0.41239079926595 + i * 0.35758433938387 + s * 0.18048078840183, o = e * 0.21263900587151 + i * 0.71516867876775 + s * 0.072192315360733, a = e * 0.019330818715591 + i * 0.11919477979462 + s * 0.95053215224966;
  return t = t || mt.whitepoint[2].E, [r * t[0], o * t[1], a * t[2]];
};
var Ks = {
  name: "luv",
  //NOTE: luv has no rigidly defined limits
  //easyrgb fails to get proper coords
  //boronine states no rigid limits
  //colorMine refers this ones:
  min: [0, -134, -140],
  max: [100, 224, 122],
  channel: ["lightness", "u", "v"],
  alias: ["LUV", "cieluv", "cie1976"],
  xyz: function(n, t, e) {
    var i, s, r, o, a, l, h, c, u, d, g, f, _;
    if (r = n[0], o = n[1], a = n[2], r === 0) return [0, 0, 0];
    var m = 0.0011070564598794539;
    return t = t || "D65", e = e || 2, u = mt.whitepoint[e][t][0], d = mt.whitepoint[e][t][1], g = mt.whitepoint[e][t][2], f = 4 * u / (u + 15 * d + 3 * g), _ = 9 * d / (u + 15 * d + 3 * g), i = o / (13 * r) + f || 0, s = a / (13 * r) + _ || 0, h = r > 8 ? d * Math.pow((r + 16) / 116, 3) : d * r * m, l = h * 9 * i / (4 * s) || 0, c = h * (12 - 3 * i - 20 * s) / (4 * s) || 0, [l, h, c];
  }
};
mt.luv = function(n, t, e) {
  var i, s, r, o, a, l, h, c, u, d, g, f, _, m = 0.008856451679035631, p = 903.2962962962961;
  t = t || "D65", e = e || 2, u = mt.whitepoint[e][t][0], d = mt.whitepoint[e][t][1], g = mt.whitepoint[e][t][2], f = 4 * u / (u + 15 * d + 3 * g), _ = 9 * d / (u + 15 * d + 3 * g), l = n[0], h = n[1], c = n[2], i = 4 * l / (l + 15 * h + 3 * c) || 0, s = 9 * h / (l + 15 * h + 3 * c) || 0;
  var y = h / d;
  return r = y <= m ? p * y : 116 * Math.pow(y, 1 / 3) - 16, o = 13 * r * (i - f), a = 13 * r * (s - _), [r, o, a];
};
var ra = {
  name: "lchuv",
  channel: ["lightness", "chroma", "hue"],
  alias: ["LCHuv", "cielchuv"],
  min: [0, 0, 0],
  max: [100, 100, 360],
  luv: function(n) {
    var t = n[0], e = n[1], i = n[2], s, r, o;
    return o = i / 360 * 2 * Math.PI, s = e * Math.cos(o), r = e * Math.sin(o), [t, s, r];
  },
  xyz: function(n) {
    return Ks.xyz(ra.luv(n));
  }
};
Ks.lchuv = function(n) {
  var t = n[0], e = n[1], i = n[2], s = Math.sqrt(e * e + i * i), r = Math.atan2(i, e), o = r * 360 / 2 / Math.PI;
  return o < 0 && (o += 360), [t, s, o];
};
mt.lchuv = function(n) {
  return Ks.lchuv(mt.luv(n));
};
const Vs = [NaN, NaN, NaN, 0];
function Fh(n) {
  return typeof n == "string" ? n : qs(n);
}
const Dh = 1024, Ii = {};
let Qn = 0;
function Oh(n) {
  if (n.length === 4)
    return n;
  const t = n.slice();
  return t[3] = 1, t;
}
function Yr(n) {
  const t = mt.lchuv(zi.xyz(n));
  return t[3] = n[3], t;
}
function Ph(n) {
  const t = mt.rgb(ra.xyz(n));
  return t[3] = n[3], t;
}
function $s(n) {
  if (n === "none")
    return Vs;
  if (Ii.hasOwnProperty(n))
    return Ii[n];
  if (Qn >= Dh) {
    let e = 0;
    for (const i in Ii)
      e++ & 3 || (delete Ii[i], --Qn);
  }
  const t = bh(n);
  if (t.length !== 4)
    throw new Error('failed to parse "' + n + '" as color');
  for (const e of t)
    if (isNaN(e))
      throw new Error('failed to parse "' + n + '" as color');
  return oa(t), Ii[n] = t, ++Qn, t;
}
function mi(n) {
  return Array.isArray(n) ? n : $s(n);
}
function oa(n) {
  return n[0] = st(n[0] + 0.5 | 0, 0, 255), n[1] = st(n[1] + 0.5 | 0, 0, 255), n[2] = st(n[2] + 0.5 | 0, 0, 255), n[3] = st(n[3], 0, 1), n;
}
function qs(n) {
  let t = n[0];
  t != (t | 0) && (t = t + 0.5 | 0);
  let e = n[1];
  e != (e | 0) && (e = e + 0.5 | 0);
  let i = n[2];
  i != (i | 0) && (i = i + 0.5 | 0);
  const s = n[3] === void 0 ? 1 : Math.round(n[3] * 1e3) / 1e3;
  return "rgba(" + t + "," + e + "," + i + "," + s + ")";
}
const we = typeof navigator < "u" && typeof navigator.userAgent < "u" ? navigator.userAgent.toLowerCase() : "";
we.includes("firefox");
const kh = we.includes("safari") && !we.includes("chrom");
kh && (we.includes("version/15.4") || /cpu (os|iphone os) 15_4 like mac os x/.test(we));
we.includes("webkit") && we.includes("edge");
we.includes("macintosh");
const Hs = typeof WorkerGlobalScope < "u" && typeof OffscreenCanvas < "u" && self instanceof WorkerGlobalScope, aa = typeof Image < "u" && Image.prototype.decode;
(function() {
  let n = !1;
  try {
    const t = Object.defineProperty({}, "passive", {
      get: function() {
        n = !0;
      }
    });
    window.addEventListener("_", null, t), window.removeEventListener("_", null, t);
  } catch {
  }
  return n;
})();
function rt(n, t, e, i) {
  let s;
  return e && e.length ? s = /** @type {HTMLCanvasElement} */
  e.shift() : Hs ? s = new OffscreenCanvas(n || 300, t || 300) : s = document.createElement("canvas"), n && (s.width = n), t && (s.height = t), /** @type {CanvasRenderingContext2D} */
  s.getContext("2d", i);
}
let ts;
function xn() {
  return ts || (ts = rt(1, 1)), ts;
}
function Nn(n) {
  const t = n.canvas;
  t.width = 1, t.height = 1, n.clearRect(0, 0, 1, 1);
}
function Gh(n, t, e) {
  const i = (
    /** @type {HTMLImageElement} */
    n
  );
  let s = !0, r = !1, o = !1;
  const a = [
    _n(i, ut.LOAD, function() {
      o = !0, r || t();
    })
  ];
  return i.src && aa ? (r = !0, i.decode().then(function() {
    s && t();
  }).catch(function(l) {
    s && (o ? t() : e());
  })) : a.push(_n(i, ut.ERROR, e)), function() {
    s = !1, a.forEach(Ct);
  };
}
function Nh(n, t) {
  return new Promise((e, i) => {
    function s() {
      o(), e(n);
    }
    function r() {
      o(), i(new Error("Image load error"));
    }
    function o() {
      n.removeEventListener("load", s), n.removeEventListener("error", r);
    }
    n.addEventListener("load", s), n.addEventListener("error", r);
  });
}
function Xh(n, t) {
  return t && (n.src = t), n.src && aa ? new Promise(
    (e, i) => n.decode().then(() => e(n)).catch(
      (s) => n.complete && n.width ? e(n) : i(s)
    )
  ) : Nh(n);
}
class zh {
  constructor() {
    this.cache_ = {}, this.patternCache_ = {}, this.cacheSize_ = 0, this.maxCacheSize_ = 1024;
  }
  /**
   * FIXME empty description for jsdoc
   */
  clear() {
    this.cache_ = {}, this.patternCache_ = {}, this.cacheSize_ = 0;
  }
  /**
   * @return {boolean} Can expire cache.
   */
  canExpireCache() {
    return this.cacheSize_ > this.maxCacheSize_;
  }
  /**
   * FIXME empty description for jsdoc
   */
  expire() {
    if (this.canExpireCache()) {
      let t = 0;
      for (const e in this.cache_) {
        const i = this.cache_[e];
        !(t++ & 3) && !i.hasListener() && (delete this.cache_[e], delete this.patternCache_[e], --this.cacheSize_);
      }
    }
  }
  /**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color|string|null} color Color.
   * @return {import("./IconImage.js").default} Icon image.
   */
  get(t, e, i) {
    const s = es(t, e, i);
    return s in this.cache_ ? this.cache_[s] : null;
  }
  /**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color|string|null} color Color.
   * @return {CanvasPattern} Icon image.
   */
  getPattern(t, e, i) {
    const s = es(t, e, i);
    return s in this.patternCache_ ? this.patternCache_[s] : null;
  }
  /**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color|string|null} color Color.
   * @param {import("./IconImage.js").default|null} iconImage Icon image.
   * @param {boolean} [pattern] Also cache a `'repeat'` pattern with this `iconImage`.
   */
  set(t, e, i, s, r) {
    const o = es(t, e, i), a = o in this.cache_;
    this.cache_[o] = s, r && (s.getImageState() === B.IDLE && s.load(), s.getImageState() === B.LOADING ? s.ready().then(() => {
      this.patternCache_[o] = xn().createPattern(
        s.getImage(1),
        "repeat"
      );
    }) : this.patternCache_[o] = xn().createPattern(
      s.getImage(1),
      "repeat"
    )), a || ++this.cacheSize_;
  }
  /**
   * Set the cache size of the icon cache. Default is `1024`. Change this value when
   * your map uses more than 1024 different icon images and you are not caching icon
   * styles on the application level.
   * @param {number} maxCacheSize Cache max size.
   * @api
   */
  setSize(t) {
    this.maxCacheSize_ = t, this.expire();
  }
}
function es(n, t, e) {
  const i = e ? mi(e) : "null";
  return t + ":" + n + ":" + i;
}
const Kt = new zh();
let Ci = null;
class la extends bs {
  /**
   * @param {HTMLImageElement|HTMLCanvasElement|ImageBitmap|null} image Image.
   * @param {string|undefined} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../ImageState.js").default|undefined} imageState Image state.
   * @param {import("../color.js").Color|string|null} color Color.
   */
  constructor(t, e, i, s, r) {
    super(), this.hitDetectionImage_ = null, this.image_ = t, this.crossOrigin_ = i, this.canvas_ = {}, this.color_ = r, this.imageState_ = s === void 0 ? B.IDLE : s, this.size_ = t && t.width && t.height ? [t.width, t.height] : null, this.src_ = e, this.tainted_, this.ready_ = null;
  }
  /**
   * @private
   */
  initializeImage_() {
    this.image_ = new Image(), this.crossOrigin_ !== null && (this.image_.crossOrigin = this.crossOrigin_);
  }
  /**
   * @private
   * @return {boolean} The image canvas is tainted.
   */
  isTainted_() {
    if (this.tainted_ === void 0 && this.imageState_ === B.LOADED) {
      Ci || (Ci = rt(1, 1, void 0, {
        willReadFrequently: !0
      })), Ci.drawImage(this.image_, 0, 0);
      try {
        Ci.getImageData(0, 0, 1, 1), this.tainted_ = !1;
      } catch {
        Ci = null, this.tainted_ = !0;
      }
    }
    return this.tainted_ === !0;
  }
  /**
   * @private
   */
  dispatchChangeEvent_() {
    this.dispatchEvent(ut.CHANGE);
  }
  /**
   * @private
   */
  handleImageError_() {
    this.imageState_ = B.ERROR, this.dispatchChangeEvent_();
  }
  /**
   * @private
   */
  handleImageLoad_() {
    this.imageState_ = B.LOADED, this.size_ = [this.image_.width, this.image_.height], this.dispatchChangeEvent_();
  }
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image or Canvas element or image bitmap.
   */
  getImage(t) {
    return this.image_ || this.initializeImage_(), this.replaceColor_(t), this.canvas_[t] ? this.canvas_[t] : this.image_;
  }
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Image or Canvas element.
   */
  getPixelRatio(t) {
    return this.replaceColor_(t), this.canvas_[t] ? t : 1;
  }
  /**
   * @return {import("../ImageState.js").default} Image state.
   */
  getImageState() {
    return this.imageState_;
  }
  /**
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image element.
   */
  getHitDetectionImage() {
    if (this.image_ || this.initializeImage_(), !this.hitDetectionImage_)
      if (this.isTainted_()) {
        const t = this.size_[0], e = this.size_[1], i = rt(t, e);
        i.fillRect(0, 0, t, e), this.hitDetectionImage_ = i.canvas;
      } else
        this.hitDetectionImage_ = this.image_;
    return this.hitDetectionImage_;
  }
  /**
   * Get the size of the icon (in pixels).
   * @return {import("../size.js").Size} Image size.
   */
  getSize() {
    return this.size_;
  }
  /**
   * @return {string|undefined} Image src.
   */
  getSrc() {
    return this.src_;
  }
  /**
   * Load not yet loaded URI.
   */
  load() {
    if (this.imageState_ === B.IDLE) {
      this.image_ || this.initializeImage_(), this.imageState_ = B.LOADING;
      try {
        this.src_ !== void 0 && (this.image_.src = this.src_);
      } catch {
        this.handleImageError_();
      }
      this.image_ instanceof HTMLImageElement && Xh(this.image_, this.src_).then((t) => {
        this.image_ = t, this.handleImageLoad_();
      }).catch(this.handleImageError_.bind(this));
    }
  }
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @private
   */
  replaceColor_(t) {
    if (!this.color_ || this.canvas_[t] || this.imageState_ !== B.LOADED)
      return;
    const e = this.image_, i = rt(
      Math.ceil(e.width * t),
      Math.ceil(e.height * t)
    ), s = i.canvas;
    i.scale(t, t), i.drawImage(e, 0, 0), i.globalCompositeOperation = "multiply", i.fillStyle = Fh(this.color_), i.fillRect(0, 0, s.width / t, s.height / t), i.globalCompositeOperation = "destination-in", i.drawImage(e, 0, 0), this.canvas_[t] = s;
  }
  /**
   * @return {Promise<void>} Promise that resolves when the image is loaded.
   */
  ready() {
    return this.ready_ || (this.ready_ = new Promise((t) => {
      if (this.imageState_ === B.LOADED || this.imageState_ === B.ERROR)
        t();
      else {
        const e = () => {
          (this.imageState_ === B.LOADED || this.imageState_ === B.ERROR) && (this.removeEventListener(ut.CHANGE, e), t());
        };
        this.addEventListener(ut.CHANGE, e);
      }
    })), this.ready_;
  }
}
function Js(n, t, e, i, s, r) {
  let o = t === void 0 ? void 0 : Kt.get(t, e, s);
  return o || (o = new la(
    n,
    n && "src" in n ? n.src || void 0 : t,
    e,
    i,
    s
  ), Kt.set(t, e, s, o, r)), r && o && !Kt.getPattern(t, e, s) && Kt.set(t, e, s, o, r), o;
}
function Vt(n) {
  return n ? Array.isArray(n) ? qs(n) : typeof n == "object" && "src" in n ? Wh(n) : n : null;
}
function Wh(n) {
  if (!n.offset || !n.size)
    return Kt.getPattern(n.src, "anonymous", n.color);
  const t = n.src + ":" + n.offset, e = Kt.getPattern(
    t,
    void 0,
    n.color
  );
  if (e)
    return e;
  const i = Kt.get(n.src, "anonymous", null);
  if (i.getImageState() !== B.LOADED)
    return null;
  const s = rt(
    n.size[0],
    n.size[1]
  );
  return s.drawImage(
    i.getImage(1),
    n.offset[0],
    n.offset[1],
    n.size[0],
    n.size[1],
    0,
    0,
    n.size[0],
    n.size[1]
  ), Js(
    s.canvas,
    t,
    void 0,
    B.LOADED,
    n.color,
    !0
  ), Kt.getPattern(t, void 0, n.color);
}
const Uh = new RegExp(
  [
    "^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)",
    "(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)",
    "(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)",
    "(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?",
    "(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))",
    "(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))",
    `?\\s*([-,\\"\\'\\sa-z]+?)\\s*$`
  ].join(""),
  "i"
), Br = [
  "style",
  "variant",
  "weight",
  "size",
  "lineHeight",
  "family"
], ha = function(n) {
  const t = n.match(Uh);
  if (!t)
    return null;
  const e = (
    /** @type {FontParameters} */
    {
      lineHeight: "normal",
      size: "1.2em",
      style: "normal",
      weight: "normal",
      variant: "normal"
    }
  );
  for (let i = 0, s = Br.length; i < s; ++i) {
    const r = t[i + 1];
    r !== void 0 && (e[Br[i]] = r);
  }
  return e.families = e.family.split(/,\s?/), e;
}, ca = "10px sans-serif", Rt = "#000", pi = "round", oe = [], ae = 0, yi = "round", Wi = 10, Ui = "#000", Yi = "center", Rn = "middle", De = [0, 0, 0, 0], Bi = 1, ue = new Ie();
let Je = null, Es;
const xs = {}, Yh = function() {
  const t = "32px ", e = ["monospace", "serif"], i = e.length, s = "wmytzilWMYTZIL@#/&?$%10";
  let r, o;
  function a(h, c, u) {
    let d = !0;
    for (let g = 0; g < i; ++g) {
      const f = e[g];
      if (o = Tn(
        h + " " + c + " " + t + f,
        s
      ), u != f) {
        const _ = Tn(
          h + " " + c + " " + t + u + "," + f,
          s
        );
        d = d && _ != o;
      }
    }
    return !!d;
  }
  function l() {
    let h = !0;
    const c = ue.getKeys();
    for (let u = 0, d = c.length; u < d; ++u) {
      const g = c[u];
      if (ue.get(g) < 100) {
        const [f, _, m] = g.split(`
`);
        a(f, _, m) ? (Ls(xs), Je = null, Es = void 0, ue.set(g, 100)) : (ue.set(g, ue.get(g) + 1, !0), h = !1);
      }
    }
    h && (clearInterval(r), r = void 0);
  }
  return function(h) {
    const c = ha(h);
    if (!c)
      return;
    const u = c.families;
    for (let d = 0, g = u.length; d < g; ++d) {
      const f = u[d], _ = c.style + `
` + c.weight + `
` + f;
      ue.get(_) === void 0 && (ue.set(_, 100, !0), a(c.style, c.weight, f) || (ue.set(_, 0, !0), r === void 0 && (r = setInterval(l, 32))));
    }
  };
}(), Bh = /* @__PURE__ */ function() {
  let n;
  return function(t) {
    let e = xs[t];
    if (e == null) {
      if (Hs) {
        const i = ha(t), s = ua(t, "Žg");
        e = (isNaN(Number(i.lineHeight)) ? 1.2 : Number(i.lineHeight)) * (s.actualBoundingBoxAscent + s.actualBoundingBoxDescent);
      } else
        n || (n = document.createElement("div"), n.innerHTML = "M", n.style.minHeight = "0", n.style.maxHeight = "none", n.style.height = "auto", n.style.padding = "0", n.style.border = "none", n.style.position = "absolute", n.style.display = "block", n.style.left = "-99999px"), n.style.font = t, document.body.appendChild(n), e = n.offsetHeight, document.body.removeChild(n);
      xs[t] = e;
    }
    return e;
  };
}();
function ua(n, t) {
  return Je || (Je = rt(1, 1)), n != Es && (Je.font = n, Es = Je.font), Je.measureText(t);
}
function Tn(n, t) {
  return ua(n, t).width;
}
function jr(n, t, e) {
  if (t in e)
    return e[t];
  const i = t.split(`
`).reduce((s, r) => Math.max(s, Tn(n, r)), 0);
  return e[t] = i, i;
}
function jh(n, t) {
  const e = [], i = [], s = [];
  let r = 0, o = 0, a = 0, l = 0;
  for (let h = 0, c = t.length; h <= c; h += 2) {
    const u = t[h];
    if (u === `
` || h === c) {
      r = Math.max(r, o), s.push(o), o = 0, a += l, l = 0;
      continue;
    }
    const d = t[h + 1] || n.font, g = Tn(d, u);
    e.push(g), o += g;
    const f = Bh(d);
    i.push(f), l = Math.max(l, f);
  }
  return { width: r, height: a, widths: e, heights: i, lineWidths: s };
}
function Zh(n, t, e, i, s, r, o, a, l, h, c) {
  n.save(), e !== 1 && (n.globalAlpha === void 0 ? n.globalAlpha = (u) => u.globalAlpha *= e : n.globalAlpha *= e), t && n.transform.apply(n, t), /** @type {*} */
  i.contextInstructions ? (n.translate(l, h), n.scale(c[0], c[1]), Kh(
    /** @type {Label} */
    i,
    n
  )) : c[0] < 0 || c[1] < 0 ? (n.translate(l, h), n.scale(c[0], c[1]), n.drawImage(
    /** @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} */
    i,
    s,
    r,
    o,
    a,
    0,
    0,
    o,
    a
  )) : n.drawImage(
    /** @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} */
    i,
    s,
    r,
    o,
    a,
    l,
    h,
    o * c[0],
    a * c[1]
  ), n.restore();
}
function Kh(n, t) {
  const e = n.contextInstructions;
  for (let i = 0, s = e.length; i < s; i += 2)
    Array.isArray(e[i + 1]) ? t[e[i]].apply(
      t,
      e[i + 1]
    ) : t[e[i]] = e[i + 1];
}
function Vh(n, t, e) {
  return e === void 0 && (e = [0, 0]), e[0] = n[0] * t + 0.5 | 0, e[1] = n[1] * t + 0.5 | 0, e;
}
function dt(n, t) {
  return Array.isArray(n) ? n : (t === void 0 ? t = [n, n] : (t[0] = n, t[1] = n), t);
}
class Xn {
  /**
   * @param {Options} options Options.
   */
  constructor(t) {
    this.opacity_ = t.opacity, this.rotateWithView_ = t.rotateWithView, this.rotation_ = t.rotation, this.scale_ = t.scale, this.scaleArray_ = dt(t.scale), this.displacement_ = t.displacement, this.declutterMode_ = t.declutterMode;
  }
  /**
   * Clones the style.
   * @return {ImageStyle} The cloned style.
   * @api
   */
  clone() {
    const t = this.getScale();
    return new Xn({
      opacity: this.getOpacity(),
      scale: Array.isArray(t) ? t.slice() : t,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
  }
  /**
   * Get the symbolizer opacity.
   * @return {number} Opacity.
   * @api
   */
  getOpacity() {
    return this.opacity_;
  }
  /**
   * Determine whether the symbolizer rotates with the map.
   * @return {boolean} Rotate with map.
   * @api
   */
  getRotateWithView() {
    return this.rotateWithView_;
  }
  /**
   * Get the symoblizer rotation.
   * @return {number} Rotation.
   * @api
   */
  getRotation() {
    return this.rotation_;
  }
  /**
   * Get the symbolizer scale.
   * @return {number|import("../size.js").Size} Scale.
   * @api
   */
  getScale() {
    return this.scale_;
  }
  /**
   * Get the symbolizer scale array.
   * @return {import("../size.js").Size} Scale array.
   */
  getScaleArray() {
    return this.scaleArray_;
  }
  /**
   * Get the displacement of the shape
   * @return {Array<number>} Shape's center displacement
   * @api
   */
  getDisplacement() {
    return this.displacement_;
  }
  /**
   * Get the declutter mode of the shape
   * @return {import("./Style.js").DeclutterMode} Shape's declutter mode
   * @api
   */
  getDeclutterMode() {
    return this.declutterMode_;
  }
  /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @abstract
   * @return {Array<number>} Anchor.
   */
  getAnchor() {
    return J();
  }
  /**
   * Get the image element for the symbolizer.
   * @abstract
   * @param {number} pixelRatio Pixel ratio.
   * @return {import('../DataTile.js').ImageLike} Image element.
   */
  getImage(t) {
    return J();
  }
  /**
   * @abstract
   * @return {import('../DataTile.js').ImageLike} Image element.
   */
  getHitDetectionImage() {
    return J();
  }
  /**
   * Get the image pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Pixel ratio.
   */
  getPixelRatio(t) {
    return 1;
  }
  /**
   * @abstract
   * @return {import("../ImageState.js").default} Image state.
   */
  getImageState() {
    return J();
  }
  /**
   * @abstract
   * @return {import("../size.js").Size} Image size.
   */
  getImageSize() {
    return J();
  }
  /**
   * Get the origin of the symbolizer.
   * @abstract
   * @return {Array<number>} Origin.
   */
  getOrigin() {
    return J();
  }
  /**
   * Get the size of the symbolizer (in pixels).
   * @abstract
   * @return {import("../size.js").Size} Size.
   */
  getSize() {
    return J();
  }
  /**
   * Set the displacement.
   *
   * @param {Array<number>} displacement Displacement.
   * @api
   */
  setDisplacement(t) {
    this.displacement_ = t;
  }
  /**
   * Set the opacity.
   *
   * @param {number} opacity Opacity.
   * @api
   */
  setOpacity(t) {
    this.opacity_ = t;
  }
  /**
   * Set whether to rotate the style with the view.
   *
   * @param {boolean} rotateWithView Rotate with map.
   * @api
   */
  setRotateWithView(t) {
    this.rotateWithView_ = t;
  }
  /**
   * Set the rotation.
   *
   * @param {number} rotation Rotation.
   * @api
   */
  setRotation(t) {
    this.rotation_ = t;
  }
  /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size} scale Scale.
   * @api
   */
  setScale(t) {
    this.scale_ = t, this.scaleArray_ = dt(t);
  }
  /**
   * @abstract
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */
  listenImageChange(t) {
    J();
  }
  /**
   * Load not yet loaded URI.
   * @abstract
   */
  load() {
    J();
  }
  /**
   * @abstract
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */
  unlistenImageChange(t) {
    J();
  }
  /**
   * @return {Promise<void>} `false` or Promise that resolves when the style is ready to use.
   */
  ready() {
    return Promise.resolve();
  }
}
class zn extends Xn {
  /**
   * @param {Options} options Options.
   */
  constructor(t) {
    super({
      opacity: 1,
      rotateWithView: t.rotateWithView !== void 0 ? t.rotateWithView : !1,
      rotation: t.rotation !== void 0 ? t.rotation : 0,
      scale: t.scale !== void 0 ? t.scale : 1,
      displacement: t.displacement !== void 0 ? t.displacement : [0, 0],
      declutterMode: t.declutterMode
    }), this.hitDetectionCanvas_ = null, this.fill_ = t.fill !== void 0 ? t.fill : null, this.origin_ = [0, 0], this.points_ = t.points, this.radius = t.radius, this.radius2_ = t.radius2, this.angle_ = t.angle !== void 0 ? t.angle : 0, this.stroke_ = t.stroke !== void 0 ? t.stroke : null, this.size_, this.renderOptions_, this.imageState_ = this.fill_ && this.fill_.loading() ? B.LOADING : B.LOADED, this.imageState_ === B.LOADING && this.ready().then(() => this.imageState_ = B.LOADED), this.render();
  }
  /**
   * Clones the style.
   * @return {RegularShape} The cloned style.
   * @api
   * @override
   */
  clone() {
    const t = this.getScale(), e = new zn({
      fill: this.getFill() ? this.getFill().clone() : void 0,
      points: this.getPoints(),
      radius: this.getRadius(),
      radius2: this.getRadius2(),
      angle: this.getAngle(),
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      scale: Array.isArray(t) ? t.slice() : t,
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
    return e.setOpacity(this.getOpacity()), e;
  }
  /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @return {Array<number>} Anchor.
   * @api
   * @override
   */
  getAnchor() {
    const t = this.size_, e = this.getDisplacement(), i = this.getScaleArray();
    return [
      t[0] / 2 - e[0] / i[0],
      t[1] / 2 + e[1] / i[1]
    ];
  }
  /**
   * Get the angle used in generating the shape.
   * @return {number} Shape's rotation in radians.
   * @api
   */
  getAngle() {
    return this.angle_;
  }
  /**
   * Get the fill style for the shape.
   * @return {import("./Fill.js").default|null} Fill style.
   * @api
   */
  getFill() {
    return this.fill_;
  }
  /**
   * Set the fill style.
   * @param {import("./Fill.js").default|null} fill Fill style.
   * @api
   */
  setFill(t) {
    this.fill_ = t, this.render();
  }
  /**
   * @return {HTMLCanvasElement} Image element.
   * @override
   */
  getHitDetectionImage() {
    return this.hitDetectionCanvas_ || (this.hitDetectionCanvas_ = this.createHitDetectionCanvas_(
      this.renderOptions_
    )), this.hitDetectionCanvas_;
  }
  /**
   * Get the image icon.
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLCanvasElement} Image or Canvas element.
   * @api
   * @override
   */
  getImage(t) {
    var r, o;
    const e = (r = this.fill_) == null ? void 0 : r.getKey(), i = `${t},${this.angle_},${this.radius},${this.radius2_},${this.points_},${e}` + Object.values(this.renderOptions_).join(",");
    let s = (
      /** @type {HTMLCanvasElement} */
      (o = Kt.get(i, null, null)) == null ? void 0 : o.getImage(1)
    );
    if (!s) {
      const a = this.renderOptions_, l = Math.ceil(a.size * t), h = rt(l, l);
      this.draw_(a, h, t), s = h.canvas, Kt.set(
        i,
        null,
        null,
        new la(s, void 0, null, B.LOADED, null)
      );
    }
    return s;
  }
  /**
   * Get the image pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Pixel ratio.
   * @override
   */
  getPixelRatio(t) {
    return t;
  }
  /**
   * @return {import("../size.js").Size} Image size.
   * @override
   */
  getImageSize() {
    return this.size_;
  }
  /**
   * @return {import("../ImageState.js").default} Image state.
   * @override
   */
  getImageState() {
    return this.imageState_;
  }
  /**
   * Get the origin of the symbolizer.
   * @return {Array<number>} Origin.
   * @api
   * @override
   */
  getOrigin() {
    return this.origin_;
  }
  /**
   * Get the number of points for generating the shape.
   * @return {number} Number of points for stars and regular polygons.
   * @api
   */
  getPoints() {
    return this.points_;
  }
  /**
   * Get the (primary) radius for the shape.
   * @return {number} Radius.
   * @api
   */
  getRadius() {
    return this.radius;
  }
  /**
   * Get the secondary radius for the shape.
   * @return {number|undefined} Radius2.
   * @api
   */
  getRadius2() {
    return this.radius2_;
  }
  /**
   * Get the size of the symbolizer (in pixels).
   * @return {import("../size.js").Size} Size.
   * @api
   * @override
   */
  getSize() {
    return this.size_;
  }
  /**
   * Get the stroke style for the shape.
   * @return {import("./Stroke.js").default|null} Stroke style.
   * @api
   */
  getStroke() {
    return this.stroke_;
  }
  /**
   * Set the stroke style.
   * @param {import("./Stroke.js").default|null} stroke Stroke style.
   * @api
   */
  setStroke(t) {
    this.stroke_ = t, this.render();
  }
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   * @override
   */
  listenImageChange(t) {
  }
  /**
   * Load not yet loaded URI.
   * @override
   */
  load() {
  }
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   * @override
   */
  unlistenImageChange(t) {
  }
  /**
   * Calculate additional canvas size needed for the miter.
   * @param {string} lineJoin Line join
   * @param {number} strokeWidth Stroke width
   * @param {number} miterLimit Miter limit
   * @return {number} Additional canvas size needed
   * @private
   */
  calculateLineJoinSize_(t, e, i) {
    if (e === 0 || this.points_ === 1 / 0 || t !== "bevel" && t !== "miter")
      return e;
    let s = this.radius, r = this.radius2_ === void 0 ? s : this.radius2_;
    if (s < r) {
      const w = s;
      s = r, r = w;
    }
    const o = this.radius2_ === void 0 ? this.points_ : this.points_ * 2, a = 2 * Math.PI / o, l = r * Math.sin(a), h = Math.sqrt(r * r - l * l), c = s - h, u = Math.sqrt(l * l + c * c), d = u / l;
    if (t === "miter" && d <= i)
      return d * e;
    const g = e / 2 / d, f = e / 2 * (c / u), m = Math.sqrt((s + g) * (s + g) + f * f) - s;
    if (this.radius2_ === void 0 || t === "bevel")
      return m * 2;
    const p = s * Math.sin(a), y = Math.sqrt(s * s - p * p), R = r - y, x = Math.sqrt(p * p + R * R) / p;
    if (x <= i) {
      const w = x * e / 2 - r - s;
      return 2 * Math.max(m, w);
    }
    return m * 2;
  }
  /**
   * @return {RenderOptions}  The render options
   * @protected
   */
  createRenderOptions() {
    let t = pi, e = yi, i = 0, s = null, r = 0, o, a = 0;
    this.stroke_ && (o = Vt(this.stroke_.getColor() ?? Ui), a = this.stroke_.getWidth() ?? Bi, s = this.stroke_.getLineDash(), r = this.stroke_.getLineDashOffset() ?? 0, e = this.stroke_.getLineJoin() ?? yi, t = this.stroke_.getLineCap() ?? pi, i = this.stroke_.getMiterLimit() ?? Wi);
    const l = this.calculateLineJoinSize_(e, a, i), h = Math.max(this.radius, this.radius2_ || 0), c = Math.ceil(2 * h + l);
    return {
      strokeStyle: o,
      strokeWidth: a,
      size: c,
      lineCap: t,
      lineDash: s,
      lineDashOffset: r,
      lineJoin: e,
      miterLimit: i
    };
  }
  /**
   * @protected
   */
  render() {
    this.renderOptions_ = this.createRenderOptions();
    const t = this.renderOptions_.size;
    this.hitDetectionCanvas_ = null, this.size_ = [t, t];
  }
  /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @param {CanvasRenderingContext2D} context The rendering context.
   * @param {number} pixelRatio The pixel ratio.
   */
  draw_(t, e, i) {
    if (e.scale(i, i), e.translate(t.size / 2, t.size / 2), this.createPath_(e), this.fill_) {
      let s = this.fill_.getColor();
      s === null && (s = Rt), e.fillStyle = Vt(s), e.fill();
    }
    t.strokeStyle && (e.strokeStyle = t.strokeStyle, e.lineWidth = t.strokeWidth, t.lineDash && (e.setLineDash(t.lineDash), e.lineDashOffset = t.lineDashOffset), e.lineCap = t.lineCap, e.lineJoin = t.lineJoin, e.miterLimit = t.miterLimit, e.stroke());
  }
  /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @return {HTMLCanvasElement} Canvas containing the icon
   */
  createHitDetectionCanvas_(t) {
    let e;
    if (this.fill_) {
      let i = this.fill_.getColor(), s = 0;
      typeof i == "string" && (i = mi(i)), i === null ? s = 1 : Array.isArray(i) && (s = i.length === 4 ? i[3] : 1), s === 0 && (e = rt(t.size, t.size), this.drawHitDetectionCanvas_(t, e));
    }
    return e ? e.canvas : this.getImage(1);
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context The context to draw in.
   */
  createPath_(t) {
    let e = this.points_;
    const i = this.radius;
    if (e === 1 / 0)
      t.arc(0, 0, i, 0, 2 * Math.PI);
    else {
      const s = this.radius2_ === void 0 ? i : this.radius2_;
      this.radius2_ !== void 0 && (e *= 2);
      const r = this.angle_ - Math.PI / 2, o = 2 * Math.PI / e;
      for (let a = 0; a < e; a++) {
        const l = r + a * o, h = a % 2 === 0 ? i : s;
        t.lineTo(h * Math.cos(l), h * Math.sin(l));
      }
      t.closePath();
    }
  }
  /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @param {CanvasRenderingContext2D} context The context.
   */
  drawHitDetectionCanvas_(t, e) {
    e.translate(t.size / 2, t.size / 2), this.createPath_(e), e.fillStyle = Rt, e.fill(), t.strokeStyle && (e.strokeStyle = t.strokeStyle, e.lineWidth = t.strokeWidth, t.lineDash && (e.setLineDash(t.lineDash), e.lineDashOffset = t.lineDashOffset), e.lineJoin = t.lineJoin, e.miterLimit = t.miterLimit, e.stroke());
  }
  /**
   * @override
   */
  ready() {
    return this.fill_ ? this.fill_.ready() : Promise.resolve();
  }
}
class Wn extends zn {
  /**
   * @param {Options} [options] Options.
   */
  constructor(t) {
    t = t || { radius: 5 }, super({
      points: 1 / 0,
      fill: t.fill,
      radius: t.radius,
      stroke: t.stroke,
      scale: t.scale !== void 0 ? t.scale : 1,
      rotation: t.rotation !== void 0 ? t.rotation : 0,
      rotateWithView: t.rotateWithView !== void 0 ? t.rotateWithView : !1,
      displacement: t.displacement !== void 0 ? t.displacement : [0, 0],
      declutterMode: t.declutterMode
    });
  }
  /**
   * Clones the style.
   * @return {CircleStyle} The cloned style.
   * @api
   * @override
   */
  clone() {
    const t = this.getScale(), e = new Wn({
      fill: this.getFill() ? this.getFill().clone() : void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      radius: this.getRadius(),
      scale: Array.isArray(t) ? t.slice() : t,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
    return e.setOpacity(this.getOpacity()), e;
  }
  /**
   * Set the circle radius.
   *
   * @param {number} radius Circle radius.
   * @api
   */
  setRadius(t) {
    this.radius = t, this.render();
  }
}
class Hi {
  /**
   * @param {Options} [options] Options.
   */
  constructor(t) {
    t = t || {}, this.patternImage_ = null, this.color_ = null, t.color !== void 0 && this.setColor(t.color);
  }
  /**
   * Clones the style. The color is not cloned if it is a {@link module:ol/colorlike~ColorLike}.
   * @return {Fill} The cloned style.
   * @api
   */
  clone() {
    const t = this.getColor();
    return new Hi({
      color: Array.isArray(t) ? t.slice() : t || void 0
    });
  }
  /**
   * Get the fill color.
   * @return {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null} Color.
   * @api
   */
  getColor() {
    return this.color_;
  }
  /**
   * Set the color.
   *
   * @param {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null} color Color.
   * @api
   */
  setColor(t) {
    if (t !== null && typeof t == "object" && "src" in t) {
      const e = Js(
        null,
        t.src,
        "anonymous",
        void 0,
        t.offset ? null : t.color ? t.color : null,
        !(t.offset && t.size)
      );
      e.ready().then(() => {
        this.patternImage_ = null;
      }), e.getImageState() === B.IDLE && e.load(), e.getImageState() === B.LOADING && (this.patternImage_ = e);
    }
    this.color_ = t;
  }
  /**
   * @return {string} Key of the fill for cache lookup.
   */
  getKey() {
    const t = this.getColor();
    return t ? t instanceof CanvasPattern || t instanceof CanvasGradient ? H(t) : typeof t == "object" && "src" in t ? t.src + ":" + t.offset : mi(t).toString() : "";
  }
  /**
   * @return {boolean} The fill style is loading an image pattern.
   */
  loading() {
    return !!this.patternImage_;
  }
  /**
   * @return {Promise<void>} `false` or a promise that resolves when the style is ready to use.
   */
  ready() {
    return this.patternImage_ ? this.patternImage_.ready() : Promise.resolve();
  }
}
function Zr(n, t, e, i) {
  return e !== void 0 && i !== void 0 ? [e / n, i / t] : e !== void 0 ? e / n : i !== void 0 ? i / t : 1;
}
class Ji extends Xn {
  /**
   * @param {Options} [options] Options.
   */
  constructor(t) {
    t = t || {};
    const e = t.opacity !== void 0 ? t.opacity : 1, i = t.rotation !== void 0 ? t.rotation : 0, s = t.scale !== void 0 ? t.scale : 1, r = t.rotateWithView !== void 0 ? t.rotateWithView : !1;
    super({
      opacity: e,
      rotation: i,
      scale: s,
      displacement: t.displacement !== void 0 ? t.displacement : [0, 0],
      rotateWithView: r,
      declutterMode: t.declutterMode
    }), this.anchor_ = t.anchor !== void 0 ? t.anchor : [0.5, 0.5], this.normalizedAnchor_ = null, this.anchorOrigin_ = t.anchorOrigin !== void 0 ? t.anchorOrigin : "top-left", this.anchorXUnits_ = t.anchorXUnits !== void 0 ? t.anchorXUnits : "fraction", this.anchorYUnits_ = t.anchorYUnits !== void 0 ? t.anchorYUnits : "fraction", this.crossOrigin_ = t.crossOrigin !== void 0 ? t.crossOrigin : null;
    const o = t.img !== void 0 ? t.img : null;
    let a = t.src;
    et(
      !(a !== void 0 && o),
      "`image` and `src` cannot be provided at the same time"
    ), (a === void 0 || a.length === 0) && o && (a = /** @type {HTMLImageElement} */
    o.src || H(o)), et(
      a !== void 0 && a.length > 0,
      "A defined and non-empty `src` or `image` must be provided"
    ), et(
      !((t.width !== void 0 || t.height !== void 0) && t.scale !== void 0),
      "`width` or `height` cannot be provided together with `scale`"
    );
    let l;
    if (t.src !== void 0 ? l = B.IDLE : o !== void 0 && ("complete" in o ? o.complete ? l = o.src ? B.LOADED : B.IDLE : l = B.LOADING : l = B.LOADED), this.color_ = t.color !== void 0 ? mi(t.color) : null, this.iconImage_ = Js(
      o,
      /** @type {string} */
      a,
      this.crossOrigin_,
      l,
      this.color_
    ), this.offset_ = t.offset !== void 0 ? t.offset : [0, 0], this.offsetOrigin_ = t.offsetOrigin !== void 0 ? t.offsetOrigin : "top-left", this.origin_ = null, this.size_ = t.size !== void 0 ? t.size : null, this.initialOptions_, t.width !== void 0 || t.height !== void 0) {
      let h, c;
      if (t.size)
        [h, c] = t.size;
      else {
        const u = this.getImage(1);
        if (u.width && u.height)
          h = u.width, c = u.height;
        else if (u instanceof HTMLImageElement) {
          this.initialOptions_ = t;
          const d = () => {
            if (this.unlistenImageChange(d), !this.initialOptions_)
              return;
            const g = this.iconImage_.getSize();
            this.setScale(
              Zr(
                g[0],
                g[1],
                t.width,
                t.height
              )
            );
          };
          this.listenImageChange(d);
          return;
        }
      }
      h !== void 0 && this.setScale(
        Zr(h, c, t.width, t.height)
      );
    }
  }
  /**
   * Clones the style. The underlying Image/HTMLCanvasElement is not cloned.
   * @return {Icon} The cloned style.
   * @api
   * @override
   */
  clone() {
    let t, e, i;
    return this.initialOptions_ ? (e = this.initialOptions_.width, i = this.initialOptions_.height) : (t = this.getScale(), t = Array.isArray(t) ? t.slice() : t), new Ji({
      anchor: this.anchor_.slice(),
      anchorOrigin: this.anchorOrigin_,
      anchorXUnits: this.anchorXUnits_,
      anchorYUnits: this.anchorYUnits_,
      color: this.color_ && this.color_.slice ? this.color_.slice() : this.color_ || void 0,
      crossOrigin: this.crossOrigin_,
      offset: this.offset_.slice(),
      offsetOrigin: this.offsetOrigin_,
      opacity: this.getOpacity(),
      rotateWithView: this.getRotateWithView(),
      rotation: this.getRotation(),
      scale: t,
      width: e,
      height: i,
      size: this.size_ !== null ? this.size_.slice() : void 0,
      src: this.getSrc(),
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
  }
  /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @return {Array<number>} Anchor.
   * @api
   * @override
   */
  getAnchor() {
    let t = this.normalizedAnchor_;
    if (!t) {
      t = this.anchor_;
      const s = this.getSize();
      if (this.anchorXUnits_ == "fraction" || this.anchorYUnits_ == "fraction") {
        if (!s)
          return null;
        t = this.anchor_.slice(), this.anchorXUnits_ == "fraction" && (t[0] *= s[0]), this.anchorYUnits_ == "fraction" && (t[1] *= s[1]);
      }
      if (this.anchorOrigin_ != "top-left") {
        if (!s)
          return null;
        t === this.anchor_ && (t = this.anchor_.slice()), (this.anchorOrigin_ == "top-right" || this.anchorOrigin_ == "bottom-right") && (t[0] = -t[0] + s[0]), (this.anchorOrigin_ == "bottom-left" || this.anchorOrigin_ == "bottom-right") && (t[1] = -t[1] + s[1]);
      }
      this.normalizedAnchor_ = t;
    }
    const e = this.getDisplacement(), i = this.getScaleArray();
    return [
      t[0] - e[0] / i[0],
      t[1] + e[1] / i[1]
    ];
  }
  /**
   * Set the anchor point. The anchor determines the center point for the
   * symbolizer.
   *
   * @param {Array<number>} anchor Anchor.
   * @api
   */
  setAnchor(t) {
    this.anchor_ = t, this.normalizedAnchor_ = null;
  }
  /**
   * Get the icon color.
   * @return {import("../color.js").Color} Color.
   * @api
   */
  getColor() {
    return this.color_;
  }
  /**
   * Get the image icon.
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image or Canvas element. If the Icon
   * style was configured with `src` or with a not let loaded `img`, an `ImageBitmap` will be returned.
   * @api
   * @override
   */
  getImage(t) {
    return this.iconImage_.getImage(t);
  }
  /**
   * Get the pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} The pixel ratio of the image.
   * @api
   * @override
   */
  getPixelRatio(t) {
    return this.iconImage_.getPixelRatio(t);
  }
  /**
   * @return {import("../size.js").Size} Image size.
   * @override
   */
  getImageSize() {
    return this.iconImage_.getSize();
  }
  /**
   * @return {import("../ImageState.js").default} Image state.
   * @override
   */
  getImageState() {
    return this.iconImage_.getImageState();
  }
  /**
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image element.
   * @override
   */
  getHitDetectionImage() {
    return this.iconImage_.getHitDetectionImage();
  }
  /**
   * Get the origin of the symbolizer.
   * @return {Array<number>} Origin.
   * @api
   * @override
   */
  getOrigin() {
    if (this.origin_)
      return this.origin_;
    let t = this.offset_;
    if (this.offsetOrigin_ != "top-left") {
      const e = this.getSize(), i = this.iconImage_.getSize();
      if (!e || !i)
        return null;
      t = t.slice(), (this.offsetOrigin_ == "top-right" || this.offsetOrigin_ == "bottom-right") && (t[0] = i[0] - e[0] - t[0]), (this.offsetOrigin_ == "bottom-left" || this.offsetOrigin_ == "bottom-right") && (t[1] = i[1] - e[1] - t[1]);
    }
    return this.origin_ = t, this.origin_;
  }
  /**
   * Get the image URL.
   * @return {string|undefined} Image src.
   * @api
   */
  getSrc() {
    return this.iconImage_.getSrc();
  }
  /**
   * Get the size of the icon (in pixels).
   * @return {import("../size.js").Size} Image size.
   * @api
   * @override
   */
  getSize() {
    return this.size_ ? this.size_ : this.iconImage_.getSize();
  }
  /**
   * Get the width of the icon (in pixels). Will return undefined when the icon image is not yet loaded.
   * @return {number} Icon width (in pixels).
   * @api
   */
  getWidth() {
    const t = this.getScaleArray();
    if (this.size_)
      return this.size_[0] * t[0];
    if (this.iconImage_.getImageState() == B.LOADED)
      return this.iconImage_.getSize()[0] * t[0];
  }
  /**
   * Get the height of the icon (in pixels). Will return undefined when the icon image is not yet loaded.
   * @return {number} Icon height (in pixels).
   * @api
   */
  getHeight() {
    const t = this.getScaleArray();
    if (this.size_)
      return this.size_[1] * t[1];
    if (this.iconImage_.getImageState() == B.LOADED)
      return this.iconImage_.getSize()[1] * t[1];
  }
  /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size} scale Scale.
   * @api
   * @override
   */
  setScale(t) {
    delete this.initialOptions_, super.setScale(t);
  }
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   * @override
   */
  listenImageChange(t) {
    this.iconImage_.addEventListener(ut.CHANGE, t);
  }
  /**
   * Load not yet loaded URI.
   * When rendering a feature with an icon style, the vector renderer will
   * automatically call this method. However, you might want to call this
   * method yourself for preloading or other purposes.
   * @api
   * @override
   */
  load() {
    this.iconImage_.load();
  }
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   * @override
   */
  unlistenImageChange(t) {
    this.iconImage_.removeEventListener(ut.CHANGE, t);
  }
  /**
   * @override
   */
  ready() {
    return this.iconImage_.ready();
  }
}
class Un {
  /**
   * @param {Options} [options] Options.
   */
  constructor(t) {
    t = t || {}, this.color_ = t.color !== void 0 ? t.color : null, this.lineCap_ = t.lineCap, this.lineDash_ = t.lineDash !== void 0 ? t.lineDash : null, this.lineDashOffset_ = t.lineDashOffset, this.lineJoin_ = t.lineJoin, this.miterLimit_ = t.miterLimit, this.width_ = t.width;
  }
  /**
   * Clones the style.
   * @return {Stroke} The cloned style.
   * @api
   */
  clone() {
    const t = this.getColor();
    return new Un({
      color: Array.isArray(t) ? t.slice() : t || void 0,
      lineCap: this.getLineCap(),
      lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0,
      lineDashOffset: this.getLineDashOffset(),
      lineJoin: this.getLineJoin(),
      miterLimit: this.getMiterLimit(),
      width: this.getWidth()
    });
  }
  /**
   * Get the stroke color.
   * @return {import("../color.js").Color|import("../colorlike.js").ColorLike} Color.
   * @api
   */
  getColor() {
    return this.color_;
  }
  /**
   * Get the line cap type for the stroke.
   * @return {CanvasLineCap|undefined} Line cap.
   * @api
   */
  getLineCap() {
    return this.lineCap_;
  }
  /**
   * Get the line dash style for the stroke.
   * @return {Array<number>|null} Line dash.
   * @api
   */
  getLineDash() {
    return this.lineDash_;
  }
  /**
   * Get the line dash offset for the stroke.
   * @return {number|undefined} Line dash offset.
   * @api
   */
  getLineDashOffset() {
    return this.lineDashOffset_;
  }
  /**
   * Get the line join type for the stroke.
   * @return {CanvasLineJoin|undefined} Line join.
   * @api
   */
  getLineJoin() {
    return this.lineJoin_;
  }
  /**
   * Get the miter limit for the stroke.
   * @return {number|undefined} Miter limit.
   * @api
   */
  getMiterLimit() {
    return this.miterLimit_;
  }
  /**
   * Get the stroke width.
   * @return {number|undefined} Width.
   * @api
   */
  getWidth() {
    return this.width_;
  }
  /**
   * Set the color.
   *
   * @param {import("../color.js").Color|import("../colorlike.js").ColorLike} color Color.
   * @api
   */
  setColor(t) {
    this.color_ = t;
  }
  /**
   * Set the line cap.
   *
   * @param {CanvasLineCap|undefined} lineCap Line cap.
   * @api
   */
  setLineCap(t) {
    this.lineCap_ = t;
  }
  /**
   * Set the line dash.
   *
   * @param {Array<number>|null} lineDash Line dash.
   * @api
   */
  setLineDash(t) {
    this.lineDash_ = t;
  }
  /**
   * Set the line dash offset.
   *
   * @param {number|undefined} lineDashOffset Line dash offset.
   * @api
   */
  setLineDashOffset(t) {
    this.lineDashOffset_ = t;
  }
  /**
   * Set the line join.
   *
   * @param {CanvasLineJoin|undefined} lineJoin Line join.
   * @api
   */
  setLineJoin(t) {
    this.lineJoin_ = t;
  }
  /**
   * Set the miter limit.
   *
   * @param {number|undefined} miterLimit Miter limit.
   * @api
   */
  setMiterLimit(t) {
    this.miterLimit_ = t;
  }
  /**
   * Set the width.
   *
   * @param {number|undefined} width Width.
   * @api
   */
  setWidth(t) {
    this.width_ = t;
  }
}
class Re {
  /**
   * @param {Options} [options] Style options.
   */
  constructor(t) {
    t = t || {}, this.geometry_ = null, this.geometryFunction_ = Kr, t.geometry !== void 0 && this.setGeometry(t.geometry), this.fill_ = t.fill !== void 0 ? t.fill : null, this.image_ = t.image !== void 0 ? t.image : null, this.renderer_ = t.renderer !== void 0 ? t.renderer : null, this.hitDetectionRenderer_ = t.hitDetectionRenderer !== void 0 ? t.hitDetectionRenderer : null, this.stroke_ = t.stroke !== void 0 ? t.stroke : null, this.text_ = t.text !== void 0 ? t.text : null, this.zIndex_ = t.zIndex;
  }
  /**
   * Clones the style.
   * @return {Style} The cloned style.
   * @api
   */
  clone() {
    let t = this.getGeometry();
    return t && typeof t == "object" && (t = /** @type {import("../geom/Geometry.js").default} */
    t.clone()), new Re({
      geometry: t ?? void 0,
      fill: this.getFill() ? this.getFill().clone() : void 0,
      image: this.getImage() ? this.getImage().clone() : void 0,
      renderer: this.getRenderer() ?? void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      text: this.getText() ? this.getText().clone() : void 0,
      zIndex: this.getZIndex()
    });
  }
  /**
   * Get the custom renderer function that was configured with
   * {@link #setRenderer} or the `renderer` constructor option.
   * @return {RenderFunction|null} Custom renderer function.
   * @api
   */
  getRenderer() {
    return this.renderer_;
  }
  /**
   * Sets a custom renderer function for this style. When set, `fill`, `stroke`
   * and `image` options of the style will be ignored.
   * @param {RenderFunction|null} renderer Custom renderer function.
   * @api
   */
  setRenderer(t) {
    this.renderer_ = t;
  }
  /**
   * Sets a custom renderer function for this style used
   * in hit detection.
   * @param {RenderFunction|null} renderer Custom renderer function.
   * @api
   */
  setHitDetectionRenderer(t) {
    this.hitDetectionRenderer_ = t;
  }
  /**
   * Get the custom renderer function that was configured with
   * {@link #setHitDetectionRenderer} or the `hitDetectionRenderer` constructor option.
   * @return {RenderFunction|null} Custom renderer function.
   * @api
   */
  getHitDetectionRenderer() {
    return this.hitDetectionRenderer_;
  }
  /**
   * Get the geometry to be rendered.
   * @return {string|import("../geom/Geometry.js").default|GeometryFunction|null}
   * Feature property or geometry or function that returns the geometry that will
   * be rendered with this style.
   * @api
   */
  getGeometry() {
    return this.geometry_;
  }
  /**
   * Get the function used to generate a geometry for rendering.
   * @return {!GeometryFunction} Function that is called with a feature
   * and returns the geometry to render instead of the feature's geometry.
   * @api
   */
  getGeometryFunction() {
    return this.geometryFunction_;
  }
  /**
   * Get the fill style.
   * @return {import("./Fill.js").default|null} Fill style.
   * @api
   */
  getFill() {
    return this.fill_;
  }
  /**
   * Set the fill style.
   * @param {import("./Fill.js").default|null} fill Fill style.
   * @api
   */
  setFill(t) {
    this.fill_ = t;
  }
  /**
   * Get the image style.
   * @return {import("./Image.js").default|null} Image style.
   * @api
   */
  getImage() {
    return this.image_;
  }
  /**
   * Set the image style.
   * @param {import("./Image.js").default} image Image style.
   * @api
   */
  setImage(t) {
    this.image_ = t;
  }
  /**
   * Get the stroke style.
   * @return {import("./Stroke.js").default|null} Stroke style.
   * @api
   */
  getStroke() {
    return this.stroke_;
  }
  /**
   * Set the stroke style.
   * @param {import("./Stroke.js").default|null} stroke Stroke style.
   * @api
   */
  setStroke(t) {
    this.stroke_ = t;
  }
  /**
   * Get the text style.
   * @return {import("./Text.js").default|null} Text style.
   * @api
   */
  getText() {
    return this.text_;
  }
  /**
   * Set the text style.
   * @param {import("./Text.js").default} text Text style.
   * @api
   */
  setText(t) {
    this.text_ = t;
  }
  /**
   * Get the z-index for the style.
   * @return {number|undefined} ZIndex.
   * @api
   */
  getZIndex() {
    return this.zIndex_;
  }
  /**
   * Set a geometry that is rendered instead of the feature's geometry.
   *
   * @param {string|import("../geom/Geometry.js").default|GeometryFunction} geometry
   *     Feature property or geometry or function returning a geometry to render
   *     for this style.
   * @api
   */
  setGeometry(t) {
    typeof t == "function" ? this.geometryFunction_ = t : typeof t == "string" ? this.geometryFunction_ = function(e) {
      return (
        /** @type {import("../geom/Geometry.js").default} */
        e.get(t)
      );
    } : t ? t !== void 0 && (this.geometryFunction_ = function() {
      return (
        /** @type {import("../geom/Geometry.js").default} */
        t
      );
    }) : this.geometryFunction_ = Kr, this.geometry_ = t;
  }
  /**
   * Set the z-index.
   *
   * @param {number|undefined} zIndex ZIndex.
   * @api
   */
  setZIndex(t) {
    this.zIndex_ = t;
  }
}
function $h(n) {
  let t;
  if (typeof n == "function")
    t = n;
  else {
    let e;
    Array.isArray(n) ? e = n : (et(
      typeof /** @type {?} */
      n.getZIndex == "function",
      "Expected an `Style` or an array of `Style`"
    ), e = [
      /** @type {Style} */
      n
    ]), t = function() {
      return e;
    };
  }
  return t;
}
let is = null;
function da(n, t) {
  if (!is) {
    const e = new Hi({
      color: "rgba(255,255,255,0.4)"
    }), i = new Un({
      color: "#3399CC",
      width: 1.25
    });
    is = [
      new Re({
        image: new Wn({
          fill: e,
          stroke: i,
          radius: 5
        }),
        fill: e,
        stroke: i
      })
    ];
  }
  return is;
}
function Kr(n) {
  return n.getGeometry();
}
const qh = "#333";
class Qs {
  /**
   * @param {Options} [options] Options.
   */
  constructor(t) {
    t = t || {}, this.font_ = t.font, this.rotation_ = t.rotation, this.rotateWithView_ = t.rotateWithView, this.keepUpright_ = t.keepUpright, this.scale_ = t.scale, this.scaleArray_ = dt(t.scale !== void 0 ? t.scale : 1), this.text_ = t.text, this.textAlign_ = t.textAlign, this.justify_ = t.justify, this.repeat_ = t.repeat, this.textBaseline_ = t.textBaseline, this.fill_ = t.fill !== void 0 ? t.fill : new Hi({ color: qh }), this.maxAngle_ = t.maxAngle !== void 0 ? t.maxAngle : Math.PI / 4, this.placement_ = t.placement !== void 0 ? t.placement : "point", this.overflow_ = !!t.overflow, this.stroke_ = t.stroke !== void 0 ? t.stroke : null, this.offsetX_ = t.offsetX !== void 0 ? t.offsetX : 0, this.offsetY_ = t.offsetY !== void 0 ? t.offsetY : 0, this.backgroundFill_ = t.backgroundFill ? t.backgroundFill : null, this.backgroundStroke_ = t.backgroundStroke ? t.backgroundStroke : null, this.padding_ = t.padding === void 0 ? null : t.padding, this.declutterMode_ = t.declutterMode;
  }
  /**
   * Clones the style.
   * @return {Text} The cloned style.
   * @api
   */
  clone() {
    const t = this.getScale();
    return new Qs({
      font: this.getFont(),
      placement: this.getPlacement(),
      repeat: this.getRepeat(),
      maxAngle: this.getMaxAngle(),
      overflow: this.getOverflow(),
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      keepUpright: this.getKeepUpright(),
      scale: Array.isArray(t) ? t.slice() : t,
      text: this.getText(),
      textAlign: this.getTextAlign(),
      justify: this.getJustify(),
      textBaseline: this.getTextBaseline(),
      fill: this.getFill() ? this.getFill().clone() : void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      offsetX: this.getOffsetX(),
      offsetY: this.getOffsetY(),
      backgroundFill: this.getBackgroundFill() ? this.getBackgroundFill().clone() : void 0,
      backgroundStroke: this.getBackgroundStroke() ? this.getBackgroundStroke().clone() : void 0,
      padding: this.getPadding() || void 0,
      declutterMode: this.getDeclutterMode()
    });
  }
  /**
   * Get the `overflow` configuration.
   * @return {boolean} Let text overflow the length of the path they follow.
   * @api
   */
  getOverflow() {
    return this.overflow_;
  }
  /**
   * Get the font name.
   * @return {string|undefined} Font.
   * @api
   */
  getFont() {
    return this.font_;
  }
  /**
   * Get the maximum angle between adjacent characters.
   * @return {number} Angle in radians.
   * @api
   */
  getMaxAngle() {
    return this.maxAngle_;
  }
  /**
   * Get the label placement.
   * @return {TextPlacement} Text placement.
   * @api
   */
  getPlacement() {
    return this.placement_;
  }
  /**
   * Get the repeat interval of the text.
   * @return {number|undefined} Repeat interval in pixels.
   * @api
   */
  getRepeat() {
    return this.repeat_;
  }
  /**
   * Get the x-offset for the text.
   * @return {number} Horizontal text offset.
   * @api
   */
  getOffsetX() {
    return this.offsetX_;
  }
  /**
   * Get the y-offset for the text.
   * @return {number} Vertical text offset.
   * @api
   */
  getOffsetY() {
    return this.offsetY_;
  }
  /**
   * Get the fill style for the text.
   * @return {import("./Fill.js").default|null} Fill style.
   * @api
   */
  getFill() {
    return this.fill_;
  }
  /**
   * Determine whether the text rotates with the map.
   * @return {boolean|undefined} Rotate with map.
   * @api
   */
  getRotateWithView() {
    return this.rotateWithView_;
  }
  /**
   * Determine whether the text can be rendered upside down.
   * @return {boolean|undefined} Keep text upright.
   * @api
   */
  getKeepUpright() {
    return this.keepUpright_;
  }
  /**
   * Get the text rotation.
   * @return {number|undefined} Rotation.
   * @api
   */
  getRotation() {
    return this.rotation_;
  }
  /**
   * Get the text scale.
   * @return {number|import("../size.js").Size|undefined} Scale.
   * @api
   */
  getScale() {
    return this.scale_;
  }
  /**
   * Get the symbolizer scale array.
   * @return {import("../size.js").Size} Scale array.
   */
  getScaleArray() {
    return this.scaleArray_;
  }
  /**
   * Get the stroke style for the text.
   * @return {import("./Stroke.js").default|null} Stroke style.
   * @api
   */
  getStroke() {
    return this.stroke_;
  }
  /**
   * Get the text to be rendered.
   * @return {string|Array<string>|undefined} Text.
   * @api
   */
  getText() {
    return this.text_;
  }
  /**
   * Get the text alignment.
   * @return {CanvasTextAlign|undefined} Text align.
   * @api
   */
  getTextAlign() {
    return this.textAlign_;
  }
  /**
   * Get the justification.
   * @return {TextJustify|undefined} Justification.
   * @api
   */
  getJustify() {
    return this.justify_;
  }
  /**
   * Get the text baseline.
   * @return {CanvasTextBaseline|undefined} Text baseline.
   * @api
   */
  getTextBaseline() {
    return this.textBaseline_;
  }
  /**
   * Get the background fill style for the text.
   * @return {import("./Fill.js").default|null} Fill style.
   * @api
   */
  getBackgroundFill() {
    return this.backgroundFill_;
  }
  /**
   * Get the background stroke style for the text.
   * @return {import("./Stroke.js").default|null} Stroke style.
   * @api
   */
  getBackgroundStroke() {
    return this.backgroundStroke_;
  }
  /**
   * Get the padding for the text.
   * @return {Array<number>|null} Padding.
   * @api
   */
  getPadding() {
    return this.padding_;
  }
  /**
   * Get the declutter mode of the shape
   * @return {import("./Style.js").DeclutterMode} Shape's declutter mode
   * @api
   */
  getDeclutterMode() {
    return this.declutterMode_;
  }
  /**
   * Set the `overflow` property.
   *
   * @param {boolean} overflow Let text overflow the path that it follows.
   * @api
   */
  setOverflow(t) {
    this.overflow_ = t;
  }
  /**
   * Set the font.
   *
   * @param {string|undefined} font Font.
   * @api
   */
  setFont(t) {
    this.font_ = t;
  }
  /**
   * Set the maximum angle between adjacent characters.
   *
   * @param {number} maxAngle Angle in radians.
   * @api
   */
  setMaxAngle(t) {
    this.maxAngle_ = t;
  }
  /**
   * Set the x offset.
   *
   * @param {number} offsetX Horizontal text offset.
   * @api
   */
  setOffsetX(t) {
    this.offsetX_ = t;
  }
  /**
   * Set the y offset.
   *
   * @param {number} offsetY Vertical text offset.
   * @api
   */
  setOffsetY(t) {
    this.offsetY_ = t;
  }
  /**
   * Set the text placement.
   *
   * @param {TextPlacement} placement Placement.
   * @api
   */
  setPlacement(t) {
    this.placement_ = t;
  }
  /**
   * Set the repeat interval of the text.
   * @param {number|undefined} [repeat] Repeat interval in pixels.
   * @api
   */
  setRepeat(t) {
    this.repeat_ = t;
  }
  /**
   * Set whether to rotate the text with the view.
   *
   * @param {boolean} rotateWithView Rotate with map.
   * @api
   */
  setRotateWithView(t) {
    this.rotateWithView_ = t;
  }
  /**
   * Set whether the text can be rendered upside down.
   *
   * @param {boolean} keepUpright Keep text upright.
   * @api
   */
  setKeepUpright(t) {
    this.keepUpright_ = t;
  }
  /**
   * Set the fill.
   *
   * @param {import("./Fill.js").default|null} fill Fill style.
   * @api
   */
  setFill(t) {
    this.fill_ = t;
  }
  /**
   * Set the rotation.
   *
   * @param {number|undefined} rotation Rotation.
   * @api
   */
  setRotation(t) {
    this.rotation_ = t;
  }
  /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size|undefined} scale Scale.
   * @api
   */
  setScale(t) {
    this.scale_ = t, this.scaleArray_ = dt(t !== void 0 ? t : 1);
  }
  /**
   * Set the stroke.
   *
   * @param {import("./Stroke.js").default|null} stroke Stroke style.
   * @api
   */
  setStroke(t) {
    this.stroke_ = t;
  }
  /**
   * Set the text.
   *
   * @param {string|Array<string>|undefined} text Text.
   * @api
   */
  setText(t) {
    this.text_ = t;
  }
  /**
   * Set the text alignment.
   *
   * @param {CanvasTextAlign|undefined} textAlign Text align.
   * @api
   */
  setTextAlign(t) {
    this.textAlign_ = t;
  }
  /**
   * Set the justification.
   *
   * @param {TextJustify|undefined} justify Justification.
   * @api
   */
  setJustify(t) {
    this.justify_ = t;
  }
  /**
   * Set the text baseline.
   *
   * @param {CanvasTextBaseline|undefined} textBaseline Text baseline.
   * @api
   */
  setTextBaseline(t) {
    this.textBaseline_ = t;
  }
  /**
   * Set the background fill.
   *
   * @param {import("./Fill.js").default|null} fill Fill style.
   * @api
   */
  setBackgroundFill(t) {
    this.backgroundFill_ = t;
  }
  /**
   * Set the background stroke.
   *
   * @param {import("./Stroke.js").default|null} stroke Stroke style.
   * @api
   */
  setBackgroundStroke(t) {
    this.backgroundStroke_ = t;
  }
  /**
   * Set the padding (`[top, right, bottom, left]`).
   *
   * @param {Array<number>|null} padding Padding.
   * @api
   */
  setPadding(t) {
    this.padding_ = t;
  }
}
const ii = {
  /**
   * Triggered when an item is added to the collection.
   * @event module:ol/Collection.CollectionEvent#add
   * @api
   */
  ADD: "add",
  /**
   * Triggered when an item is removed from the collection.
   * @event module:ol/Collection.CollectionEvent#remove
   * @api
   */
  REMOVE: "remove"
}, Vr = {
  LENGTH: "length"
};
class an extends xi {
  /**
   * @param {import("./CollectionEventType.js").default} type Type.
   * @param {T} element Element.
   * @param {number} index The index of the added or removed element.
   */
  constructor(t, e, i) {
    super(t), this.element = e, this.index = i;
  }
}
class Hh extends Ie {
  /**
   * @param {Array<T>} [array] Array.
   * @param {Options} [options] Collection options.
   */
  constructor(t, e) {
    if (super(), this.on, this.once, this.un, e = e || {}, this.unique_ = !!e.unique, this.array_ = t || [], this.unique_)
      for (let i = 0, s = this.array_.length; i < s; ++i)
        this.assertUnique_(this.array_[i], i);
    this.updateLength_();
  }
  /**
   * Remove all elements from the collection.
   * @api
   */
  clear() {
    for (; this.getLength() > 0; )
      this.pop();
  }
  /**
   * Add elements to the collection.  This pushes each item in the provided array
   * to the end of the collection.
   * @param {!Array<T>} arr Array.
   * @return {Collection<T>} This collection.
   * @api
   */
  extend(t) {
    for (let e = 0, i = t.length; e < i; ++e)
      this.push(t[e]);
    return this;
  }
  /**
   * Iterate over each element, calling the provided callback.
   * @param {function(T, number, Array<T>): *} f The function to call
   *     for every element. This function takes 3 arguments (the element, the
   *     index and the array). The return value is ignored.
   * @api
   */
  forEach(t) {
    const e = this.array_;
    for (let i = 0, s = e.length; i < s; ++i)
      t(e[i], i, e);
  }
  /**
   * Get a reference to the underlying Array object. Warning: if the array
   * is mutated, no events will be dispatched by the collection, and the
   * collection's "length" property won't be in sync with the actual length
   * of the array.
   * @return {!Array<T>} Array.
   * @api
   */
  getArray() {
    return this.array_;
  }
  /**
   * Get the element at the provided index.
   * @param {number} index Index.
   * @return {T} Element.
   * @api
   */
  item(t) {
    return this.array_[t];
  }
  /**
   * Get the length of this collection.
   * @return {number} The length of the array.
   * @observable
   * @api
   */
  getLength() {
    return this.get(Vr.LENGTH);
  }
  /**
   * Insert an element at the provided index.
   * @param {number} index Index.
   * @param {T} elem Element.
   * @api
   */
  insertAt(t, e) {
    if (t < 0 || t > this.getLength())
      throw new Error("Index out of bounds: " + t);
    this.unique_ && this.assertUnique_(e), this.array_.splice(t, 0, e), this.updateLength_(), this.dispatchEvent(
      new an(ii.ADD, e, t)
    );
  }
  /**
   * Remove the last element of the collection and return it.
   * Return `undefined` if the collection is empty.
   * @return {T|undefined} Element.
   * @api
   */
  pop() {
    return this.removeAt(this.getLength() - 1);
  }
  /**
   * Insert the provided element at the end of the collection.
   * @param {T} elem Element.
   * @return {number} New length of the collection.
   * @api
   */
  push(t) {
    this.unique_ && this.assertUnique_(t);
    const e = this.getLength();
    return this.insertAt(e, t), this.getLength();
  }
  /**
   * Remove the first occurrence of an element from the collection.
   * @param {T} elem Element.
   * @return {T|undefined} The removed element or undefined if none found.
   * @api
   */
  remove(t) {
    const e = this.array_;
    for (let i = 0, s = e.length; i < s; ++i)
      if (e[i] === t)
        return this.removeAt(i);
  }
  /**
   * Remove the element at the provided index and return it.
   * Return `undefined` if the collection does not contain this index.
   * @param {number} index Index.
   * @return {T|undefined} Value.
   * @api
   */
  removeAt(t) {
    if (t < 0 || t >= this.getLength())
      return;
    const e = this.array_[t];
    return this.array_.splice(t, 1), this.updateLength_(), this.dispatchEvent(
      /** @type {CollectionEvent<T>} */
      new an(ii.REMOVE, e, t)
    ), e;
  }
  /**
   * Set the element at the provided index.
   * @param {number} index Index.
   * @param {T} elem Element.
   * @api
   */
  setAt(t, e) {
    const i = this.getLength();
    if (t >= i) {
      this.insertAt(t, e);
      return;
    }
    if (t < 0)
      throw new Error("Index out of bounds: " + t);
    this.unique_ && this.assertUnique_(e, t);
    const s = this.array_[t];
    this.array_[t] = e, this.dispatchEvent(
      /** @type {CollectionEvent<T>} */
      new an(ii.REMOVE, s, t)
    ), this.dispatchEvent(
      /** @type {CollectionEvent<T>} */
      new an(ii.ADD, e, t)
    );
  }
  /**
   * @private
   */
  updateLength_() {
    this.set(Vr.LENGTH, this.array_.length);
  }
  /**
   * @private
   * @param {T} elem Element.
   * @param {number} [except] Optional index to ignore.
   */
  assertUnique_(t, e) {
    for (let i = 0, s = this.array_.length; i < s; ++i)
      if (this.array_[i] === t && i !== e)
        throw new Error("Duplicate item added to a unique collection");
  }
}
function $r(n, t, e, i, s, r, o) {
  const a = n[t], l = n[t + 1], h = n[e] - a, c = n[e + 1] - l;
  let u;
  if (h === 0 && c === 0)
    u = t;
  else {
    const d = ((s - a) * h + (r - l) * c) / (h * h + c * c);
    if (d > 1)
      u = e;
    else if (d > 0) {
      for (let g = 0; g < i; ++g)
        o[g] = Pt(
          n[t + g],
          n[e + g],
          d
        );
      o.length = i;
      return;
    } else
      u = t;
  }
  for (let d = 0; d < i; ++d)
    o[d] = n[u + d];
  o.length = i;
}
function fa(n, t, e, i, s) {
  let r = n[t], o = n[t + 1];
  for (t += i; t < e; t += i) {
    const a = n[t], l = n[t + 1], h = ri(r, o, a, l);
    h > s && (s = h), r = a, o = l;
  }
  return s;
}
function Jh(n, t, e, i, s) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    s = fa(n, t, a, i, s), t = a;
  }
  return s;
}
function ga(n, t, e, i, s, r, o, a, l, h, c) {
  if (t == e)
    return h;
  let u, d;
  if (s === 0) {
    if (d = ri(
      o,
      a,
      n[t],
      n[t + 1]
    ), d < h) {
      for (u = 0; u < i; ++u)
        l[u] = n[t + u];
      return l.length = i, d;
    }
    return h;
  }
  c = c || [NaN, NaN];
  let g = t + i;
  for (; g < e; )
    if ($r(
      n,
      g - i,
      g,
      i,
      o,
      a,
      c
    ), d = ri(o, a, c[0], c[1]), d < h) {
      for (h = d, u = 0; u < i; ++u)
        l[u] = c[u];
      l.length = i, g += i;
    } else
      g += i * Math.max(
        (Math.sqrt(d) - Math.sqrt(h)) / s | 0,
        1
      );
  if ($r(
    n,
    e - i,
    t,
    i,
    o,
    a,
    c
  ), d = ri(o, a, c[0], c[1]), d < h) {
    for (h = d, u = 0; u < i; ++u)
      l[u] = c[u];
    l.length = i;
  }
  return h;
}
function Qh(n, t, e, i, s, r, o, a, l, h, c) {
  c = c || [NaN, NaN];
  for (let u = 0, d = e.length; u < d; ++u) {
    const g = e[u];
    h = ga(
      n,
      t,
      g,
      i,
      s,
      r,
      o,
      a,
      l,
      h,
      c
    ), t = g;
  }
  return h;
}
function ni(n, t, e, i, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = t; o < e; o += i)
    s[r++] = n.slice(o, o + i);
  return s.length = r, s;
}
function Sn(n, t, e, i, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    s[r++] = ni(
      n,
      t,
      l,
      i,
      s[r]
    ), t = l;
  }
  return s.length = r, s;
}
function qr(n, t, e, i, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    s[r++] = l.length === 1 && l[0] === t ? [] : Sn(
      n,
      t,
      l,
      i,
      s[r]
    ), t = l[l.length - 1];
  }
  return s.length = r, s;
}
function Hr(n, t, e, i, s, r, o) {
  let a, l;
  const h = (e - t) / i;
  if (h === 1)
    a = t;
  else if (h === 2)
    a = t, l = s;
  else if (h !== 0) {
    let c = n[t], u = n[t + 1], d = 0;
    const g = [0];
    for (let m = t + i; m < e; m += i) {
      const p = n[m], y = n[m + 1];
      d += Math.sqrt((p - c) * (p - c) + (y - u) * (y - u)), g.push(d), c = p, u = y;
    }
    const f = s * d, _ = xl(g, f);
    _ < 0 ? (l = (f - g[-_ - 2]) / (g[-_ - 1] - g[-_ - 2]), a = t + (-_ - 2) * i) : a = t + _ * i;
  }
  o = o > 1 ? o : 2, r = r || new Array(o);
  for (let c = 0; c < o; ++c)
    r[c] = a === void 0 ? NaN : l === void 0 ? n[a + c] : Pt(n[a + c], n[a + i + c], l);
  return r;
}
function tc(n, t, e, i, s) {
  return !Zo(
    s,
    /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @return {boolean} Contains (x, y).
     */
    function(o) {
      return !Oe(
        n,
        t,
        e,
        i,
        o[0],
        o[1]
      );
    }
  );
}
function Oe(n, t, e, i, s, r) {
  let o = 0, a = n[e - i], l = n[e - i + 1];
  for (; t < e; t += i) {
    const h = n[t], c = n[t + 1];
    l <= r ? c > r && (h - a) * (r - l) - (s - a) * (c - l) > 0 && o++ : c <= r && (h - a) * (r - l) - (s - a) * (c - l) < 0 && o--, a = h, l = c;
  }
  return o !== 0;
}
function _a(n, t, e, i, s, r) {
  if (e.length === 0 || !Oe(n, t, e[0], i, s, r))
    return !1;
  for (let o = 1, a = e.length; o < a; ++o)
    if (Oe(n, e[o - 1], e[o], i, s, r))
      return !1;
  return !0;
}
function ec(n, t, e, i, s) {
  let r;
  for (t += i; t < e; t += i)
    if (r = s(
      n.slice(t - i, t),
      n.slice(t, t + i)
    ), r)
      return r;
  return !1;
}
function ma(n, t, e, i, s, r) {
  return r = r ?? jo(At(), n, t, e, i), St(s, r) ? r[0] >= s[0] && r[2] <= s[2] || r[1] >= s[1] && r[3] <= s[3] ? !0 : ec(
    n,
    t,
    e,
    i,
    /**
     * @param {import("../../coordinate.js").Coordinate} point1 Start point.
     * @param {import("../../coordinate.js").Coordinate} point2 End point.
     * @return {boolean} `true` if the segment and the extent intersect,
     *     `false` otherwise.
     */
    function(o, a) {
      return Ol(s, o, a);
    }
  ) : !1;
}
function pa(n, t, e, i, s) {
  return !!(ma(n, t, e, i, s) || Oe(
    n,
    t,
    e,
    i,
    s[0],
    s[1]
  ) || Oe(
    n,
    t,
    e,
    i,
    s[0],
    s[3]
  ) || Oe(
    n,
    t,
    e,
    i,
    s[2],
    s[1]
  ) || Oe(
    n,
    t,
    e,
    i,
    s[2],
    s[3]
  ));
}
function ic(n, t, e, i, s) {
  if (!pa(n, t, e[0], i, s))
    return !1;
  if (e.length === 1)
    return !0;
  for (let r = 1, o = e.length; r < o; ++r)
    if (tc(
      n,
      e[r - 1],
      e[r],
      i,
      s
    ) && !ma(
      n,
      e[r - 1],
      e[r],
      i,
      s
    ))
      return !1;
  return !0;
}
function nc(n, t, e, i) {
  let s = n[t], r = n[t + 1], o = 0;
  for (let a = t + i; a < e; a += i) {
    const l = n[a], h = n[a + 1];
    o += Math.sqrt((l - s) * (l - s) + (h - r) * (h - r)), s = l, r = h;
  }
  return o;
}
function tr(n, t, e, i, s, r, o) {
  const a = (e - t) / i;
  if (a < 3) {
    for (; t < e; t += i)
      r[o++] = n[t], r[o++] = n[t + 1];
    return o;
  }
  const l = new Array(a);
  l[0] = 1, l[a - 1] = 1;
  const h = [t, e - i];
  let c = 0;
  for (; h.length > 0; ) {
    const u = h.pop(), d = h.pop();
    let g = 0;
    const f = n[d], _ = n[d + 1], m = n[u], p = n[u + 1];
    for (let y = d + i; y < u; y += i) {
      const R = n[y], E = n[y + 1], x = Pl(R, E, f, _, m, p);
      x > g && (c = y, g = x);
    }
    g > s && (l[(c - t) / i] = 1, d + i < c && h.push(d, c), c + i < u && h.push(c, u));
  }
  for (let u = 0; u < a; ++u)
    l[u] && (r[o++] = n[t + u * i], r[o++] = n[t + u * i + 1]);
  return o;
}
function sc(n, t, e, i, s, r, o, a) {
  for (let l = 0, h = e.length; l < h; ++l) {
    const c = e[l];
    o = tr(
      n,
      t,
      c,
      i,
      s,
      r,
      o
    ), a.push(o), t = c;
  }
  return o;
}
function be(n, t) {
  return t * Math.round(n / t);
}
function rc(n, t, e, i, s, r, o) {
  if (t == e)
    return o;
  let a = be(n[t], s), l = be(n[t + 1], s);
  t += i, r[o++] = a, r[o++] = l;
  let h, c;
  do
    if (h = be(n[t], s), c = be(n[t + 1], s), t += i, t == e)
      return r[o++] = h, r[o++] = c, o;
  while (h == a && c == l);
  for (; t < e; ) {
    const u = be(n[t], s), d = be(n[t + 1], s);
    if (t += i, u == h && d == c)
      continue;
    const g = h - a, f = c - l, _ = u - a, m = d - l;
    if (g * m == f * _ && (g < 0 && _ < g || g == _ || g > 0 && _ > g) && (f < 0 && m < f || f == m || f > 0 && m > f)) {
      h = u, c = d;
      continue;
    }
    r[o++] = h, r[o++] = c, a = h, l = c, h = u, c = d;
  }
  return r[o++] = h, r[o++] = c, o;
}
function ya(n, t, e, i, s, r, o, a) {
  for (let l = 0, h = e.length; l < h; ++l) {
    const c = e[l];
    o = rc(
      n,
      t,
      c,
      i,
      s,
      r,
      o
    ), a.push(o), t = c;
  }
  return o;
}
const Pe = {
  /**
   * Triggered before a layer is rendered.
   * @event module:ol/render/Event~RenderEvent#prerender
   * @api
   */
  PRERENDER: "prerender",
  /**
   * Triggered after a layer is rendered.
   * @event module:ol/render/Event~RenderEvent#postrender
   * @api
   */
  POSTRENDER: "postrender",
  /**
   * Triggered before layers are composed.  When dispatched by the map, the event object will not have
   * a `context` set.  When dispatched by a layer, the event object will have a `context` set.  Only
   * WebGL layers currently dispatch this event.
   * @event module:ol/render/Event~RenderEvent#precompose
   * @api
   */
  PRECOMPOSE: "precompose"
};
class Ea {
  /**
   * Render a geometry with a custom renderer.
   *
   * @param {import("../geom/SimpleGeometry.js").default} geometry Geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {Function} renderer Renderer.
   * @param {Function} hitDetectionRenderer Renderer.
   * @param {number} [index] Render order index.
   */
  drawCustom(t, e, i, s, r) {
  }
  /**
   * Render a geometry.
   *
   * @param {import("../geom/Geometry.js").default} geometry The geometry to render.
   */
  drawGeometry(t) {
  }
  /**
   * Set the rendering style.
   *
   * @param {import("../style/Style.js").default} style The rendering style.
   */
  setStyle(t) {
  }
  /**
   * @param {import("../geom/Circle.js").default} circleGeometry Circle geometry.
   * @param {import("../Feature.js").default} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawCircle(t, e, i) {
  }
  /**
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("../style/Style.js").default} style Style.
   * @param {number} [index] Render order index.
   */
  drawFeature(t, e, i) {
  }
  /**
   * @param {import("../geom/GeometryCollection.js").default} geometryCollectionGeometry Geometry collection.
   * @param {import("../Feature.js").default} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawGeometryCollection(t, e, i) {
  }
  /**
   * @param {import("../geom/LineString.js").default|import("./Feature.js").default} lineStringGeometry Line string geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawLineString(t, e, i) {
  }
  /**
   * @param {import("../geom/MultiLineString.js").default|import("./Feature.js").default} multiLineStringGeometry MultiLineString geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawMultiLineString(t, e, i) {
  }
  /**
   * @param {import("../geom/MultiPoint.js").default|import("./Feature.js").default} multiPointGeometry MultiPoint geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawMultiPoint(t, e, i) {
  }
  /**
   * @param {import("../geom/MultiPolygon.js").default} multiPolygonGeometry MultiPolygon geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawMultiPolygon(t, e, i) {
  }
  /**
   * @param {import("../geom/Point.js").default|import("./Feature.js").default} pointGeometry Point geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawPoint(t, e, i) {
  }
  /**
   * @param {import("../geom/Polygon.js").default|import("./Feature.js").default} polygonGeometry Polygon geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawPolygon(t, e, i) {
  }
  /**
   * @param {import("../geom/SimpleGeometry.js").default|import("./Feature.js").default} geometry Geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawText(t, e, i) {
  }
  /**
   * @param {import("../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../style/Stroke.js").default} strokeStyle Stroke style.
   */
  setFillStrokeStyle(t, e) {
  }
  /**
   * @param {import("../style/Image.js").default} imageStyle Image style.
   * @param {import("../render/canvas.js").DeclutterImageWithText} [declutterImageWithText] Shared data for combined decluttering with a text style.
   */
  setImageStyle(t, e) {
  }
  /**
   * @param {import("../style/Text.js").default} textStyle Text style.
   * @param {import("../render/canvas.js").DeclutterImageWithText} [declutterImageWithText] Shared data for combined decluttering with an image style.
   */
  setTextStyle(t, e) {
  }
}
class oc extends Ea {
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../../extent.js").Extent} extent Extent.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {number} [squaredTolerance] Optional squared tolerance for simplification.
   * @param {import("../../proj.js").TransformFunction} [userTransform] Transform from user to view projection.
   */
  constructor(t, e, i, s, r, o, a) {
    super(), this.context_ = t, this.pixelRatio_ = e, this.extent_ = i, this.transform_ = s, this.transformRotation_ = s ? On(Math.atan2(s[1], s[0]), 10) : 0, this.viewRotation_ = r, this.squaredTolerance_ = o, this.userTransform_ = a, this.contextFillState_ = null, this.contextStrokeState_ = null, this.contextTextState_ = null, this.fillState_ = null, this.strokeState_ = null, this.image_ = null, this.imageAnchorX_ = 0, this.imageAnchorY_ = 0, this.imageHeight_ = 0, this.imageOpacity_ = 0, this.imageOriginX_ = 0, this.imageOriginY_ = 0, this.imageRotateWithView_ = !1, this.imageRotation_ = 0, this.imageScale_ = [0, 0], this.imageWidth_ = 0, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = !1, this.textRotation_ = 0, this.textScale_ = [0, 0], this.textFillState_ = null, this.textStrokeState_ = null, this.textState_ = null, this.pixelCoordinates_ = [], this.tmpLocalTransform_ = re();
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   */
  drawImages_(t, e, i, s) {
    if (!this.image_)
      return;
    const r = xe(
      t,
      e,
      i,
      s,
      this.transform_,
      this.pixelCoordinates_
    ), o = this.context_, a = this.tmpLocalTransform_, l = o.globalAlpha;
    this.imageOpacity_ != 1 && (o.globalAlpha = l * this.imageOpacity_);
    let h = this.imageRotation_;
    this.transformRotation_ === 0 && (h -= this.viewRotation_), this.imageRotateWithView_ && (h += this.viewRotation_);
    for (let c = 0, u = r.length; c < u; c += 2) {
      const d = r[c] - this.imageAnchorX_, g = r[c + 1] - this.imageAnchorY_;
      if (h !== 0 || this.imageScale_[0] != 1 || this.imageScale_[1] != 1) {
        const f = d + this.imageAnchorX_, _ = g + this.imageAnchorY_;
        Se(
          a,
          f,
          _,
          1,
          1,
          h,
          -f,
          -_
        ), o.save(), o.transform.apply(o, a), o.translate(f, _), o.scale(this.imageScale_[0], this.imageScale_[1]), o.drawImage(
          this.image_,
          this.imageOriginX_,
          this.imageOriginY_,
          this.imageWidth_,
          this.imageHeight_,
          -this.imageAnchorX_,
          -this.imageAnchorY_,
          this.imageWidth_,
          this.imageHeight_
        ), o.restore();
      } else
        o.drawImage(
          this.image_,
          this.imageOriginX_,
          this.imageOriginY_,
          this.imageWidth_,
          this.imageHeight_,
          d,
          g,
          this.imageWidth_,
          this.imageHeight_
        );
    }
    this.imageOpacity_ != 1 && (o.globalAlpha = l);
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   */
  drawText_(t, e, i, s) {
    if (!this.textState_ || this.text_ === "")
      return;
    this.textFillState_ && this.setContextFillState_(this.textFillState_), this.textStrokeState_ && this.setContextStrokeState_(this.textStrokeState_), this.setContextTextState_(this.textState_);
    const r = xe(
      t,
      e,
      i,
      s,
      this.transform_,
      this.pixelCoordinates_
    ), o = this.context_;
    let a = this.textRotation_;
    for (this.transformRotation_ === 0 && (a -= this.viewRotation_), this.textRotateWithView_ && (a += this.viewRotation_); e < i; e += s) {
      const l = r[e] + this.textOffsetX_, h = r[e + 1] + this.textOffsetY_;
      a !== 0 || this.textScale_[0] != 1 || this.textScale_[1] != 1 ? (o.save(), o.translate(l - this.textOffsetX_, h - this.textOffsetY_), o.rotate(a), o.translate(this.textOffsetX_, this.textOffsetY_), o.scale(this.textScale_[0], this.textScale_[1]), this.textStrokeState_ && o.strokeText(this.text_, 0, 0), this.textFillState_ && o.fillText(this.text_, 0, 0), o.restore()) : (this.textStrokeState_ && o.strokeText(this.text_, l, h), this.textFillState_ && o.fillText(this.text_, l, h));
    }
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @param {boolean} close Close.
   * @private
   * @return {number} end End.
   */
  moveToLineTo_(t, e, i, s, r) {
    const o = this.context_, a = xe(
      t,
      e,
      i,
      s,
      this.transform_,
      this.pixelCoordinates_
    );
    o.moveTo(a[0], a[1]);
    let l = a.length;
    r && (l -= 2);
    for (let h = 2; h < l; h += 2)
      o.lineTo(a[h], a[h + 1]);
    return r && o.closePath(), i;
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @private
   * @return {number} End.
   */
  drawRings_(t, e, i, s) {
    for (let r = 0, o = i.length; r < o; ++r)
      e = this.moveToLineTo_(
        t,
        e,
        i[r],
        s,
        !0
      );
    return e;
  }
  /**
   * Render a circle geometry into the canvas.  Rendering is immediate and uses
   * the current fill and stroke styles.
   *
   * @param {import("../../geom/Circle.js").default} geometry Circle geometry.
   * @api
   * @override
   */
  drawCircle(t) {
    if (this.squaredTolerance_ && (t = /** @type {import("../../geom/Circle.js").default} */
    t.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    )), !!St(this.extent_, t.getExtent())) {
      if (this.fillState_ || this.strokeState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const e = Ah(
          t,
          this.transform_,
          this.pixelCoordinates_
        ), i = e[2] - e[0], s = e[3] - e[1], r = Math.sqrt(i * i + s * s), o = this.context_;
        o.beginPath(), o.arc(
          e[0],
          e[1],
          r,
          0,
          2 * Math.PI
        ), this.fillState_ && o.fill(), this.strokeState_ && o.stroke();
      }
      this.text_ !== "" && this.drawText_(t.getCenter(), 0, 2, 2);
    }
  }
  /**
   * Set the rendering style.  Note that since this is an immediate rendering API,
   * any `zIndex` on the provided style will be ignored.
   *
   * @param {import("../../style/Style.js").default} style The rendering style.
   * @api
   * @override
   */
  setStyle(t) {
    this.setFillStrokeStyle(t.getFill(), t.getStroke()), this.setImageStyle(t.getImage()), this.setTextStyle(t.getText());
  }
  /**
   * @param {import("../../transform.js").Transform} transform Transform.
   */
  setTransform(t) {
    this.transform_ = t;
  }
  /**
   * Render a geometry into the canvas.  Call
   * {@link module:ol/render/canvas/Immediate~CanvasImmediateRenderer#setStyle renderer.setStyle()} first to set the rendering style.
   *
   * @param {import("../../geom/Geometry.js").default|import("../Feature.js").default} geometry The geometry to render.
   * @api
   * @override
   */
  drawGeometry(t) {
    switch (t.getType()) {
      case "Point":
        this.drawPoint(
          /** @type {import("../../geom/Point.js").default} */
          t
        );
        break;
      case "LineString":
        this.drawLineString(
          /** @type {import("../../geom/LineString.js").default} */
          t
        );
        break;
      case "Polygon":
        this.drawPolygon(
          /** @type {import("../../geom/Polygon.js").default} */
          t
        );
        break;
      case "MultiPoint":
        this.drawMultiPoint(
          /** @type {import("../../geom/MultiPoint.js").default} */
          t
        );
        break;
      case "MultiLineString":
        this.drawMultiLineString(
          /** @type {import("../../geom/MultiLineString.js").default} */
          t
        );
        break;
      case "MultiPolygon":
        this.drawMultiPolygon(
          /** @type {import("../../geom/MultiPolygon.js").default} */
          t
        );
        break;
      case "GeometryCollection":
        this.drawGeometryCollection(
          /** @type {import("../../geom/GeometryCollection.js").default} */
          t
        );
        break;
      case "Circle":
        this.drawCircle(
          /** @type {import("../../geom/Circle.js").default} */
          t
        );
        break;
    }
  }
  /**
   * Render a feature into the canvas.  Note that any `zIndex` on the provided
   * style will be ignored - features are rendered immediately in the order that
   * this method is called.  If you need `zIndex` support, you should be using an
   * {@link module:ol/layer/Vector~VectorLayer} instead.
   *
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {import("../../style/Style.js").default} style Style.
   * @api
   * @override
   */
  drawFeature(t, e) {
    const i = e.getGeometryFunction()(t);
    i && (this.setStyle(e), this.drawGeometry(i));
  }
  /**
   * Render a GeometryCollection to the canvas.  Rendering is immediate and
   * uses the current styles appropriate for each geometry in the collection.
   *
   * @param {import("../../geom/GeometryCollection.js").default} geometry Geometry collection.
   * @override
   */
  drawGeometryCollection(t) {
    const e = t.getGeometriesArray();
    for (let i = 0, s = e.length; i < s; ++i)
      this.drawGeometry(e[i]);
  }
  /**
   * Render a Point geometry into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/Point.js").default|import("../Feature.js").default} geometry Point geometry.
   * @override
   */
  drawPoint(t) {
    this.squaredTolerance_ && (t = /** @type {import("../../geom/Point.js").default} */
    t.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    ));
    const e = t.getFlatCoordinates(), i = t.getStride();
    this.image_ && this.drawImages_(e, 0, e.length, i), this.text_ !== "" && this.drawText_(e, 0, e.length, i);
  }
  /**
   * Render a MultiPoint geometry  into the canvas.  Rendering is immediate and
   * uses the current style.
   *
   * @param {import("../../geom/MultiPoint.js").default|import("../Feature.js").default} geometry MultiPoint geometry.
   * @override
   */
  drawMultiPoint(t) {
    this.squaredTolerance_ && (t = /** @type {import("../../geom/MultiPoint.js").default} */
    t.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    ));
    const e = t.getFlatCoordinates(), i = t.getStride();
    this.image_ && this.drawImages_(e, 0, e.length, i), this.text_ !== "" && this.drawText_(e, 0, e.length, i);
  }
  /**
   * Render a LineString into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/LineString.js").default|import("../Feature.js").default} geometry LineString geometry.
   * @override
   */
  drawLineString(t) {
    if (this.squaredTolerance_ && (t = /** @type {import("../../geom/LineString.js").default} */
    t.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    )), !!St(this.extent_, t.getExtent())) {
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        const e = this.context_, i = t.getFlatCoordinates();
        e.beginPath(), this.moveToLineTo_(
          i,
          0,
          i.length,
          t.getStride(),
          !1
        ), e.stroke();
      }
      if (this.text_ !== "") {
        const e = t.getFlatMidpoint();
        this.drawText_(e, 0, 2, 2);
      }
    }
  }
  /**
   * Render a MultiLineString geometry into the canvas.  Rendering is immediate
   * and uses the current style.
   *
   * @param {import("../../geom/MultiLineString.js").default|import("../Feature.js").default} geometry MultiLineString geometry.
   * @override
   */
  drawMultiLineString(t) {
    this.squaredTolerance_ && (t = /** @type {import("../../geom/MultiLineString.js").default} */
    t.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    ));
    const e = t.getExtent();
    if (St(this.extent_, e)) {
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        const i = this.context_, s = t.getFlatCoordinates();
        let r = 0;
        const o = (
          /** @type {Array<number>} */
          t.getEnds()
        ), a = t.getStride();
        i.beginPath();
        for (let l = 0, h = o.length; l < h; ++l)
          r = this.moveToLineTo_(
            s,
            r,
            o[l],
            a,
            !1
          );
        i.stroke();
      }
      if (this.text_ !== "") {
        const i = t.getFlatMidpoints();
        this.drawText_(i, 0, i.length, 2);
      }
    }
  }
  /**
   * Render a Polygon geometry into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/Polygon.js").default|import("../Feature.js").default} geometry Polygon geometry.
   * @override
   */
  drawPolygon(t) {
    if (this.squaredTolerance_ && (t = /** @type {import("../../geom/Polygon.js").default} */
    t.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    )), !!St(this.extent_, t.getExtent())) {
      if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const e = this.context_;
        e.beginPath(), this.drawRings_(
          t.getOrientedFlatCoordinates(),
          0,
          /** @type {Array<number>} */
          t.getEnds(),
          t.getStride()
        ), this.fillState_ && e.fill(), this.strokeState_ && e.stroke();
      }
      if (this.text_ !== "") {
        const e = t.getFlatInteriorPoint();
        this.drawText_(e, 0, 2, 2);
      }
    }
  }
  /**
   * Render MultiPolygon geometry into the canvas.  Rendering is immediate and
   * uses the current style.
   * @param {import("../../geom/MultiPolygon.js").default} geometry MultiPolygon geometry.
   * @override
   */
  drawMultiPolygon(t) {
    if (this.squaredTolerance_ && (t = /** @type {import("../../geom/MultiPolygon.js").default} */
    t.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    )), !!St(this.extent_, t.getExtent())) {
      if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const e = this.context_, i = t.getOrientedFlatCoordinates();
        let s = 0;
        const r = t.getEndss(), o = t.getStride();
        e.beginPath();
        for (let a = 0, l = r.length; a < l; ++a) {
          const h = r[a];
          s = this.drawRings_(i, s, h, o);
        }
        this.fillState_ && e.fill(), this.strokeState_ && e.stroke();
      }
      if (this.text_ !== "") {
        const e = t.getFlatInteriorPoints();
        this.drawText_(e, 0, e.length, 2);
      }
    }
  }
  /**
   * @param {import("../canvas.js").FillState} fillState Fill state.
   * @private
   */
  setContextFillState_(t) {
    const e = this.context_, i = this.contextFillState_;
    i ? i.fillStyle != t.fillStyle && (i.fillStyle = t.fillStyle, e.fillStyle = t.fillStyle) : (e.fillStyle = t.fillStyle, this.contextFillState_ = {
      fillStyle: t.fillStyle
    });
  }
  /**
   * @param {import("../canvas.js").StrokeState} strokeState Stroke state.
   * @private
   */
  setContextStrokeState_(t) {
    const e = this.context_, i = this.contextStrokeState_;
    i ? (i.lineCap != t.lineCap && (i.lineCap = t.lineCap, e.lineCap = t.lineCap), Ei(i.lineDash, t.lineDash) || e.setLineDash(
      i.lineDash = t.lineDash
    ), i.lineDashOffset != t.lineDashOffset && (i.lineDashOffset = t.lineDashOffset, e.lineDashOffset = t.lineDashOffset), i.lineJoin != t.lineJoin && (i.lineJoin = t.lineJoin, e.lineJoin = t.lineJoin), i.lineWidth != t.lineWidth && (i.lineWidth = t.lineWidth, e.lineWidth = t.lineWidth), i.miterLimit != t.miterLimit && (i.miterLimit = t.miterLimit, e.miterLimit = t.miterLimit), i.strokeStyle != t.strokeStyle && (i.strokeStyle = t.strokeStyle, e.strokeStyle = t.strokeStyle)) : (e.lineCap = t.lineCap, e.setLineDash(t.lineDash), e.lineDashOffset = t.lineDashOffset, e.lineJoin = t.lineJoin, e.lineWidth = t.lineWidth, e.miterLimit = t.miterLimit, e.strokeStyle = t.strokeStyle, this.contextStrokeState_ = {
      lineCap: t.lineCap,
      lineDash: t.lineDash,
      lineDashOffset: t.lineDashOffset,
      lineJoin: t.lineJoin,
      lineWidth: t.lineWidth,
      miterLimit: t.miterLimit,
      strokeStyle: t.strokeStyle
    });
  }
  /**
   * @param {import("../canvas.js").TextState} textState Text state.
   * @private
   */
  setContextTextState_(t) {
    const e = this.context_, i = this.contextTextState_, s = t.textAlign ? t.textAlign : Yi;
    i ? (i.font != t.font && (i.font = t.font, e.font = t.font), i.textAlign != s && (i.textAlign = s, e.textAlign = s), i.textBaseline != t.textBaseline && (i.textBaseline = t.textBaseline, e.textBaseline = t.textBaseline)) : (e.font = t.font, e.textAlign = s, e.textBaseline = t.textBaseline, this.contextTextState_ = {
      font: t.font,
      textAlign: s,
      textBaseline: t.textBaseline
    });
  }
  /**
   * Set the fill and stroke style for subsequent draw operations.  To clear
   * either fill or stroke styles, pass null for the appropriate parameter.
   *
   * @param {import("../../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
   * @override
   */
  setFillStrokeStyle(t, e) {
    if (!t)
      this.fillState_ = null;
    else {
      const i = t.getColor();
      this.fillState_ = {
        fillStyle: Vt(
          i || Rt
        )
      };
    }
    if (!e)
      this.strokeState_ = null;
    else {
      const i = e.getColor(), s = e.getLineCap(), r = e.getLineDash(), o = e.getLineDashOffset(), a = e.getLineJoin(), l = e.getWidth(), h = e.getMiterLimit(), c = r || oe;
      this.strokeState_ = {
        lineCap: s !== void 0 ? s : pi,
        lineDash: this.pixelRatio_ === 1 ? c : c.map((u) => u * this.pixelRatio_),
        lineDashOffset: (o || ae) * this.pixelRatio_,
        lineJoin: a !== void 0 ? a : yi,
        lineWidth: (l !== void 0 ? l : Bi) * this.pixelRatio_,
        miterLimit: h !== void 0 ? h : Wi,
        strokeStyle: Vt(
          i || Ui
        )
      };
    }
  }
  /**
   * Set the image style for subsequent draw operations.  Pass null to remove
   * the image style.
   *
   * @param {import("../../style/Image.js").default} imageStyle Image style.
   * @override
   */
  setImageStyle(t) {
    let e;
    if (!t || !(e = t.getSize())) {
      this.image_ = null;
      return;
    }
    const i = t.getPixelRatio(this.pixelRatio_), s = t.getAnchor(), r = t.getOrigin();
    this.image_ = t.getImage(this.pixelRatio_), this.imageAnchorX_ = s[0] * i, this.imageAnchorY_ = s[1] * i, this.imageHeight_ = e[1] * i, this.imageOpacity_ = t.getOpacity(), this.imageOriginX_ = r[0], this.imageOriginY_ = r[1], this.imageRotateWithView_ = t.getRotateWithView(), this.imageRotation_ = t.getRotation();
    const o = t.getScaleArray();
    this.imageScale_ = [
      o[0] * this.pixelRatio_ / i,
      o[1] * this.pixelRatio_ / i
    ], this.imageWidth_ = e[0] * i;
  }
  /**
   * Set the text style for subsequent draw operations.  Pass null to
   * remove the text style.
   *
   * @param {import("../../style/Text.js").default} textStyle Text style.
   * @override
   */
  setTextStyle(t) {
    if (!t)
      this.text_ = "";
    else {
      const e = t.getFill();
      if (!e)
        this.textFillState_ = null;
      else {
        const g = e.getColor();
        this.textFillState_ = {
          fillStyle: Vt(
            g || Rt
          )
        };
      }
      const i = t.getStroke();
      if (!i)
        this.textStrokeState_ = null;
      else {
        const g = i.getColor(), f = i.getLineCap(), _ = i.getLineDash(), m = i.getLineDashOffset(), p = i.getLineJoin(), y = i.getWidth(), R = i.getMiterLimit();
        this.textStrokeState_ = {
          lineCap: f !== void 0 ? f : pi,
          lineDash: _ || oe,
          lineDashOffset: m || ae,
          lineJoin: p !== void 0 ? p : yi,
          lineWidth: y !== void 0 ? y : Bi,
          miterLimit: R !== void 0 ? R : Wi,
          strokeStyle: Vt(
            g || Ui
          )
        };
      }
      const s = t.getFont(), r = t.getOffsetX(), o = t.getOffsetY(), a = t.getRotateWithView(), l = t.getRotation(), h = t.getScaleArray(), c = t.getText(), u = t.getTextAlign(), d = t.getTextBaseline();
      this.textState_ = {
        font: s !== void 0 ? s : ca,
        textAlign: u !== void 0 ? u : Yi,
        textBaseline: d !== void 0 ? d : Rn
      }, this.text_ = c !== void 0 ? Array.isArray(c) ? c.reduce((g, f, _) => g += _ % 2 ? " " : f, "") : c : "", this.textOffsetX_ = r !== void 0 ? this.pixelRatio_ * r : 0, this.textOffsetY_ = o !== void 0 ? this.pixelRatio_ * o : 0, this.textRotateWithView_ = a !== void 0 ? a : !1, this.textRotation_ = l !== void 0 ? l : 0, this.textScale_ = [
        this.pixelRatio_ * h[0],
        this.pixelRatio_ * h[1]
      ];
    }
  }
}
const ac = 0.5, xa = {
  Point: _c,
  LineString: dc,
  Polygon: pc,
  MultiPoint: mc,
  MultiLineString: fc,
  MultiPolygon: gc,
  GeometryCollection: uc,
  Circle: hc
};
function lc(n, t) {
  return parseInt(H(n), 10) - parseInt(H(t), 10);
}
function Jr(n, t) {
  const e = Ra(n, t);
  return e * e;
}
function Ra(n, t) {
  return ac * n / t;
}
function hc(n, t, e, i, s) {
  const r = e.getFill(), o = e.getStroke();
  if (r || o) {
    const l = n.getBuilder(e.getZIndex(), "Circle");
    l.setFillStrokeStyle(r, o), l.drawCircle(t, i, s);
  }
  const a = e.getText();
  if (a && a.getText()) {
    const l = n.getBuilder(e.getZIndex(), "Text");
    l.setTextStyle(a), l.drawText(t, i);
  }
}
function Qr(n, t, e, i, s, r, o, a) {
  const l = [], h = e.getImage();
  if (h) {
    let d = !0;
    const g = h.getImageState();
    g == B.LOADED || g == B.ERROR ? d = !1 : g == B.IDLE && h.load(), d && l.push(h.ready());
  }
  const c = e.getFill();
  c && c.loading() && l.push(c.ready());
  const u = l.length > 0;
  return u && Promise.all(l).then(() => s(null)), cc(
    n,
    t,
    e,
    i,
    r,
    o,
    a
  ), u;
}
function cc(n, t, e, i, s, r, o) {
  const a = e.getGeometryFunction()(t);
  if (!a)
    return;
  const l = a.simplifyTransformed(
    i,
    s
  );
  if (e.getRenderer())
    Ta(n, l, e, t, o);
  else {
    const c = xa[l.getType()];
    c(
      n,
      l,
      e,
      t,
      o,
      r
    );
  }
}
function Ta(n, t, e, i, s) {
  if (t.getType() == "GeometryCollection") {
    const o = (
      /** @type {import("../geom/GeometryCollection.js").default} */
      t.getGeometries()
    );
    for (let a = 0, l = o.length; a < l; ++a)
      Ta(n, o[a], e, i, s);
    return;
  }
  n.getBuilder(e.getZIndex(), "Default").drawCustom(
    /** @type {import("../geom/SimpleGeometry.js").default} */
    t,
    i,
    e.getRenderer(),
    e.getHitDetectionRenderer(),
    s
  );
}
function uc(n, t, e, i, s, r) {
  const o = t.getGeometriesArray();
  let a, l;
  for (a = 0, l = o.length; a < l; ++a) {
    const h = xa[o[a].getType()];
    h(
      n,
      o[a],
      e,
      i,
      s,
      r
    );
  }
}
function dc(n, t, e, i, s) {
  const r = e.getStroke();
  if (r) {
    const a = n.getBuilder(
      e.getZIndex(),
      "LineString"
    );
    a.setFillStrokeStyle(null, r), a.drawLineString(t, i, s);
  }
  const o = e.getText();
  if (o && o.getText()) {
    const a = n.getBuilder(e.getZIndex(), "Text");
    a.setTextStyle(o), a.drawText(t, i, s);
  }
}
function fc(n, t, e, i, s) {
  const r = e.getStroke();
  if (r) {
    const a = n.getBuilder(
      e.getZIndex(),
      "LineString"
    );
    a.setFillStrokeStyle(null, r), a.drawMultiLineString(t, i, s);
  }
  const o = e.getText();
  if (o && o.getText()) {
    const a = n.getBuilder(e.getZIndex(), "Text");
    a.setTextStyle(o), a.drawText(t, i, s);
  }
}
function gc(n, t, e, i, s) {
  const r = e.getFill(), o = e.getStroke();
  if (o || r) {
    const l = n.getBuilder(e.getZIndex(), "Polygon");
    l.setFillStrokeStyle(r, o), l.drawMultiPolygon(t, i, s);
  }
  const a = e.getText();
  if (a && a.getText()) {
    const l = n.getBuilder(e.getZIndex(), "Text");
    l.setTextStyle(a), l.drawText(t, i, s);
  }
}
function _c(n, t, e, i, s, r) {
  const o = e.getImage(), a = e.getText(), l = a && a.getText(), h = r && o && l ? {} : void 0;
  if (o) {
    if (o.getImageState() != B.LOADED)
      return;
    const c = n.getBuilder(e.getZIndex(), "Image");
    c.setImageStyle(o, h), c.drawPoint(t, i, s);
  }
  if (l) {
    const c = n.getBuilder(e.getZIndex(), "Text");
    c.setTextStyle(a, h), c.drawText(t, i, s);
  }
}
function mc(n, t, e, i, s, r) {
  const o = e.getImage(), a = o && o.getOpacity() !== 0, l = e.getText(), h = l && l.getText(), c = r && a && h ? {} : void 0;
  if (a) {
    if (o.getImageState() != B.LOADED)
      return;
    const u = n.getBuilder(e.getZIndex(), "Image");
    u.setImageStyle(o, c), u.drawMultiPoint(t, i, s);
  }
  if (h) {
    const u = n.getBuilder(e.getZIndex(), "Text");
    u.setTextStyle(l, c), u.drawText(t, i, s);
  }
}
function pc(n, t, e, i, s) {
  const r = e.getFill(), o = e.getStroke();
  if (r || o) {
    const l = n.getBuilder(e.getZIndex(), "Polygon");
    l.setFillStrokeStyle(r, o), l.drawPolygon(t, i, s);
  }
  const a = e.getText();
  if (a && a.getText()) {
    const l = n.getBuilder(e.getZIndex(), "Text");
    l.setTextStyle(a), l.drawText(t, i, s);
  }
}
let yc = !1;
function Ec(n, t, e, i, s, r, o) {
  const a = new XMLHttpRequest();
  a.open(
    "GET",
    typeof n == "function" ? n(e, i, s) : n,
    !0
  ), t.getType() == "arraybuffer" && (a.responseType = "arraybuffer"), a.withCredentials = yc, a.onload = function(l) {
    if (!a.status || a.status >= 200 && a.status < 300) {
      const h = t.getType();
      try {
        let c;
        h == "text" || h == "json" ? c = a.responseText : h == "xml" ? c = a.responseXML || a.responseText : h == "arraybuffer" && (c = /** @type {ArrayBuffer} */
        a.response), c ? r(
          /** @type {Array<FeatureType>} */
          t.readFeatures(c, {
            extent: e,
            featureProjection: s
          }),
          t.readProjection(c)
        ) : o();
      } catch {
        o();
      }
    } else
      o();
  }, a.onerror = o, a.send();
}
function to(n, t) {
  return function(e, i, s, r, o) {
    Ec(
      n,
      t,
      e,
      i,
      s,
      /**
       * @param {Array<FeatureType>} features The loaded features.
       * @param {import("./proj/Projection.js").default} dataProjection Data
       * projection.
       */
      (a, l) => {
        this.addFeatures(a), r !== void 0 && r(a);
      },
      /* FIXME handle error */
      o || di
    );
  };
}
function xc(n, t) {
  return [[-1 / 0, -1 / 0, 1 / 0, 1 / 0]];
}
function Rc(n, t, e, i) {
  const s = [];
  let r = At();
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    r = Ds(
      n,
      t,
      l[0],
      i
    ), s.push((r[0] + r[2]) / 2, (r[1] + r[3]) / 2), t = l[l.length - 1];
  }
  return s;
}
function er(n, t, e, i, s, r, o) {
  let a, l, h, c, u, d, g;
  const f = s[r + 1], _ = [];
  for (let y = 0, R = e.length; y < R; ++y) {
    const E = e[y];
    for (c = n[E - i], d = n[E - i + 1], a = t; a < E; a += i)
      u = n[a], g = n[a + 1], (f <= d && g <= f || d <= f && f <= g) && (h = (f - d) / (g - d) * (u - c) + c, _.push(h)), c = u, d = g;
  }
  let m = NaN, p = -1 / 0;
  for (_.sort(ne), c = _[0], a = 1, l = _.length; a < l; ++a) {
    u = _[a];
    const y = Math.abs(u - c);
    y > p && (h = (c + u) / 2, _a(n, t, e, i, h, f) && (m = h, p = y)), c = u;
  }
  return isNaN(m) && (m = s[r]), o ? (o.push(m, f, p), o) : [m, f, p];
}
function Tc(n, t, e, i, s) {
  let r = [];
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    r = er(
      n,
      t,
      l,
      i,
      s,
      2 * o,
      r
    ), t = l[l.length - 1];
  }
  return r;
}
function Sc(n, t, e, i) {
  for (; t < e - i; ) {
    for (let s = 0; s < i; ++s) {
      const r = n[t + s];
      n[t + s] = n[e - i + s], n[e - i + s] = r;
    }
    t += i, e -= i;
  }
}
function ir(n, t, e, i) {
  let s = 0, r = n[e - i], o = n[e - i + 1];
  for (; t < e; t += i) {
    const a = n[t], l = n[t + 1];
    s += (a - r) * (l + o), r = a, o = l;
  }
  return s === 0 ? void 0 : s > 0;
}
function wc(n, t, e, i, s) {
  s = s !== void 0 ? s : !1;
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r], l = ir(
      n,
      t,
      a,
      i
    );
    if (r === 0) {
      if (s && l || !s && !l)
        return !1;
    } else if (s && !l || !s && l)
      return !1;
    t = a;
  }
  return !0;
}
function eo(n, t, e, i, s) {
  s = s !== void 0 ? s : !1;
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r], l = ir(
      n,
      t,
      a,
      i
    );
    (r === 0 ? s && l || !s && !l : s && !l || !s && l) && Sc(n, t, a, i), t = a;
  }
  return t;
}
function Ic(n, t) {
  const e = [];
  let i = 0, s = 0, r;
  for (let o = 0, a = t.length; o < a; ++o) {
    const l = t[o], h = ir(n, i, l, 2);
    if (r === void 0 && (r = h), h === r)
      e.push(t.slice(s, o + 1));
    else {
      if (e.length === 0)
        continue;
      e[e.length - 1].push(t[s]);
    }
    s = o + 1, i = l;
  }
  return e;
}
function Sa(n, t, e, i) {
  let s = 0;
  const r = n[e - i], o = n[e - i + 1];
  let a = 0, l = 0;
  for (; t < e; t += i) {
    const h = n[t] - r, c = n[t + 1] - o;
    s += l * h - a * c, a = h, l = c;
  }
  return s / 2;
}
function Cc(n, t, e, i) {
  let s = 0;
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    s += Sa(n, t, a, i), t = a;
  }
  return s;
}
class ji extends Zs {
  /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(t, e) {
    super(), this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, e !== void 0 && !Array.isArray(t[0]) ? this.setFlatCoordinates(
      e,
      /** @type {Array<number>} */
      t
    ) : this.setCoordinates(
      /** @type {Array<import("../coordinate.js").Coordinate>} */
      t,
      e
    );
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!LinearRing} Clone.
   * @api
   * @override
   */
  clone() {
    return new ji(this.flatCoordinates.slice(), this.layout);
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(t, e, i, s) {
    return s < Wo(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      fa(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), ga(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      this.maxDelta_,
      !0,
      t,
      e,
      i,
      s
    ));
  }
  /**
   * Return the area of the linear ring on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */
  getArea() {
    return Sa(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  /**
   * Return the coordinates of the linear ring.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   * @override
   */
  getCoordinates() {
    return ni(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LinearRing} Simplified LinearRing.
   * @protected
   * @override
   */
  getSimplifiedGeometryInternal(t) {
    const e = [];
    return e.length = tr(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      e,
      0
    ), new ji(e, "XY");
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "LinearRing";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(t) {
    return !1;
  }
  /**
   * Set the coordinates of the linear ring.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(t, e) {
    this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = sa(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
class wn extends Zs {
  /**
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>|!Array<number>} coordinates
   *     Array of linear rings that define the polygon. The first linear ring of the
   *     array defines the outer-boundary or surface of the polygon. Each subsequent
   *     linear ring defines a hole in the surface of the polygon. A linear ring is
   *     an array of vertices' coordinates where the first coordinate and the last are
   *     equivalent. (For internal use, flat coordinates in combination with
   *     `layout` and `ends` are also accepted.)
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<number>} [ends] Ends (for internal use with flat coordinates).
   */
  constructor(t, e, i) {
    super(), this.ends_ = [], this.flatInteriorPointRevision_ = -1, this.flatInteriorPoint_ = null, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.orientedRevision_ = -1, this.orientedFlatCoordinates_ = null, e !== void 0 && i ? (this.setFlatCoordinates(
      e,
      /** @type {Array<number>} */
      t
    ), this.ends_ = i) : this.setCoordinates(
      /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */
      t,
      e
    );
  }
  /**
   * Append the passed linear ring to this polygon.
   * @param {LinearRing} linearRing Linear ring.
   * @api
   */
  appendLinearRing(t) {
    this.flatCoordinates ? Ms(this.flatCoordinates, t.getFlatCoordinates()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.ends_.push(this.flatCoordinates.length), this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Polygon} Clone.
   * @api
   * @override
   */
  clone() {
    const t = new wn(
      this.flatCoordinates.slice(),
      this.layout,
      this.ends_.slice()
    );
    return t.applyProperties(this), t;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(t, e, i, s) {
    return s < Wo(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      Jh(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), Qh(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      this.maxDelta_,
      !0,
      t,
      e,
      i,
      s
    ));
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   * @override
   */
  containsXY(t, e) {
    return _a(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      t,
      e
    );
  }
  /**
   * Return the area of the polygon on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */
  getArea() {
    return Cc(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride
    );
  }
  /**
   * Get the coordinate array for this geometry.  This array has the structure
   * of a GeoJSON coordinate array for polygons.
   *
   * @param {boolean} [right] Orient coordinates according to the right-hand
   *     rule (counter-clockwise for exterior and clockwise for interior rings).
   *     If `false`, coordinates will be oriented according to the left-hand rule
   *     (clockwise for exterior and counter-clockwise for interior rings).
   *     By default, coordinate orientation will depend on how the geometry was
   *     constructed.
   * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
   * @api
   * @override
   */
  getCoordinates(t) {
    let e;
    return t !== void 0 ? (e = this.getOrientedFlatCoordinates().slice(), eo(e, 0, this.ends_, this.stride, t)) : e = this.flatCoordinates, Sn(e, 0, this.ends_, this.stride);
  }
  /**
   * @return {Array<number>} Ends.
   */
  getEnds() {
    return this.ends_;
  }
  /**
   * @return {Array<number>} Interior point.
   */
  getFlatInteriorPoint() {
    if (this.flatInteriorPointRevision_ != this.getRevision()) {
      const t = Ge(this.getExtent());
      this.flatInteriorPoint_ = er(
        this.getOrientedFlatCoordinates(),
        0,
        this.ends_,
        this.stride,
        t,
        0
      ), this.flatInteriorPointRevision_ = this.getRevision();
    }
    return (
      /** @type {import("../coordinate.js").Coordinate} */
      this.flatInteriorPoint_
    );
  }
  /**
   * Return an interior point of the polygon.
   * @return {Point} Interior point as XYM coordinate, where M is the
   * length of the horizontal intersection that the point belongs to.
   * @api
   */
  getInteriorPoint() {
    return new Gn(this.getFlatInteriorPoint(), "XYM");
  }
  /**
   * Return the number of rings of the polygon,  this includes the exterior
   * ring and any interior rings.
   *
   * @return {number} Number of rings.
   * @api
   */
  getLinearRingCount() {
    return this.ends_.length;
  }
  /**
   * Return the Nth linear ring of the polygon geometry. Return `null` if the
   * given index is out of range.
   * The exterior linear ring is available at index `0` and the interior rings
   * at index `1` and beyond.
   *
   * @param {number} index Index.
   * @return {LinearRing|null} Linear ring.
   * @api
   */
  getLinearRing(t) {
    return t < 0 || this.ends_.length <= t ? null : new ji(
      this.flatCoordinates.slice(
        t === 0 ? 0 : this.ends_[t - 1],
        this.ends_[t]
      ),
      this.layout
    );
  }
  /**
   * Return the linear rings of the polygon.
   * @return {Array<LinearRing>} Linear rings.
   * @api
   */
  getLinearRings() {
    const t = this.layout, e = this.flatCoordinates, i = this.ends_, s = [];
    let r = 0;
    for (let o = 0, a = i.length; o < a; ++o) {
      const l = i[o], h = new ji(
        e.slice(r, l),
        t
      );
      s.push(h), r = l;
    }
    return s;
  }
  /**
   * @return {Array<number>} Oriented flat coordinates.
   */
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const t = this.flatCoordinates;
      wc(t, 0, this.ends_, this.stride) ? this.orientedFlatCoordinates_ = t : (this.orientedFlatCoordinates_ = t.slice(), this.orientedFlatCoordinates_.length = eo(
        this.orientedFlatCoordinates_,
        0,
        this.ends_,
        this.stride
      )), this.orientedRevision_ = this.getRevision();
    }
    return (
      /** @type {Array<number>} */
      this.orientedFlatCoordinates_
    );
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Polygon} Simplified Polygon.
   * @protected
   * @override
   */
  getSimplifiedGeometryInternal(t) {
    const e = [], i = [];
    return e.length = ya(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      Math.sqrt(t),
      e,
      0,
      i
    ), new wn(e, "XY", i);
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "Polygon";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(t) {
    return ic(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      t
    );
  }
  /**
   * Set the coordinates of the polygon.
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(t, e) {
    this.setLayout(e, t, 2), this.flatCoordinates || (this.flatCoordinates = []);
    const i = Mh(
      this.flatCoordinates,
      0,
      t,
      this.stride,
      this.ends_
    );
    this.flatCoordinates.length = i.length === 0 ? 0 : i[i.length - 1], this.changed();
  }
}
function io(n) {
  if (Ps(n))
    throw new Error("Cannot create polygon from empty extent");
  const t = n[0], e = n[1], i = n[2], s = n[3], r = [
    t,
    e,
    t,
    s,
    i,
    s,
    i,
    e,
    t,
    e
  ];
  return new wn(r, "XY", [r.length]);
}
const no = re();
class Xt {
  /**
   * @param {Type} type Geometry type.
   * @param {Array<number>} flatCoordinates Flat coordinates. These always need
   *     to be right-handed for polygons.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @param {Object<string, *>} properties Properties.
   * @param {number|string|undefined} id Feature id.
   */
  constructor(t, e, i, s, r, o) {
    this.styleFunction, this.extent_, this.id_ = o, this.type_ = t, this.flatCoordinates_ = e, this.flatInteriorPoints_ = null, this.flatMidpoints_ = null, this.ends_ = i || null, this.properties_ = r, this.squaredTolerance_, this.stride_ = s, this.simplifiedGeometry_;
  }
  /**
   * Get a feature property by its key.
   * @param {string} key Key
   * @return {*} Value for the requested key.
   * @api
   */
  get(t) {
    return this.properties_[t];
  }
  /**
   * Get the extent of this feature's geometry.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent() {
    return this.extent_ || (this.extent_ = this.type_ === "Point" ? Yo(this.flatCoordinates_) : Ds(
      this.flatCoordinates_,
      0,
      this.flatCoordinates_.length,
      2
    )), this.extent_;
  }
  /**
   * @return {Array<number>} Flat interior points.
   */
  getFlatInteriorPoint() {
    if (!this.flatInteriorPoints_) {
      const t = Ge(this.getExtent());
      this.flatInteriorPoints_ = er(
        this.flatCoordinates_,
        0,
        this.ends_,
        2,
        t,
        0
      );
    }
    return this.flatInteriorPoints_;
  }
  /**
   * @return {Array<number>} Flat interior points.
   */
  getFlatInteriorPoints() {
    if (!this.flatInteriorPoints_) {
      const t = Ic(this.flatCoordinates_, this.ends_), e = Rc(this.flatCoordinates_, 0, t, 2);
      this.flatInteriorPoints_ = Tc(
        this.flatCoordinates_,
        0,
        t,
        2,
        e
      );
    }
    return this.flatInteriorPoints_;
  }
  /**
   * @return {Array<number>} Flat midpoint.
   */
  getFlatMidpoint() {
    return this.flatMidpoints_ || (this.flatMidpoints_ = Hr(
      this.flatCoordinates_,
      0,
      this.flatCoordinates_.length,
      2,
      0.5
    )), this.flatMidpoints_;
  }
  /**
   * @return {Array<number>} Flat midpoints.
   */
  getFlatMidpoints() {
    if (!this.flatMidpoints_) {
      this.flatMidpoints_ = [];
      const t = this.flatCoordinates_;
      let e = 0;
      const i = (
        /** @type {Array<number>} */
        this.ends_
      );
      for (let s = 0, r = i.length; s < r; ++s) {
        const o = i[s], a = Hr(t, e, o, 2, 0.5);
        Ms(this.flatMidpoints_, a), e = o;
      }
    }
    return this.flatMidpoints_;
  }
  /**
   * Get the feature identifier.  This is a stable identifier for the feature and
   * is set when reading data from a remote source.
   * @return {number|string|undefined} Id.
   * @api
   */
  getId() {
    return this.id_;
  }
  /**
   * @return {Array<number>} Flat coordinates.
   */
  getOrientedFlatCoordinates() {
    return this.flatCoordinates_;
  }
  /**
   * For API compatibility with {@link module:ol/Feature~Feature}, this method is useful when
   * determining the geometry type in style function (see {@link #getType}).
   * @return {RenderFeature} Feature.
   * @api
   */
  getGeometry() {
    return this;
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {RenderFeature} Simplified geometry.
   */
  getSimplifiedGeometry(t) {
    return this;
  }
  /**
   * Get a transformed and simplified version of the geometry.
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
   * @return {RenderFeature} Simplified geometry.
   */
  simplifyTransformed(t, e) {
    return this;
  }
  /**
   * Get the feature properties.
   * @return {Object<string, *>} Feature properties.
   * @api
   */
  getProperties() {
    return this.properties_;
  }
  /**
   * Get an object of all property names and values.  This has the same behavior as getProperties,
   * but is here to conform with the {@link module:ol/Feature~Feature} interface.
   * @return {Object<string, *>?} Object.
   */
  getPropertiesInternal() {
    return this.properties_;
  }
  /**
   * @return {number} Stride.
   */
  getStride() {
    return this.stride_;
  }
  /**
   * @return {import('../style/Style.js').StyleFunction|undefined} Style
   */
  getStyleFunction() {
    return this.styleFunction;
  }
  /**
   * Get the type of this feature's geometry.
   * @return {Type} Geometry type.
   * @api
   */
  getType() {
    return this.type_;
  }
  /**
   * Transform geometry coordinates from tile pixel space to projected.
   *
   * @param {import("../proj.js").ProjectionLike} projection The data projection
   */
  transform(t) {
    t = pt(t);
    const e = t.getExtent(), i = t.getWorldExtent();
    if (e && i) {
      const s = lt(i) / lt(e);
      Se(
        no,
        i[0],
        i[3],
        s,
        -s,
        0,
        0,
        0
      ), xe(
        this.flatCoordinates_,
        0,
        this.flatCoordinates_.length,
        2,
        no,
        this.flatCoordinates_
      );
    }
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   */
  applyTransform(t) {
    t(this.flatCoordinates_, this.flatCoordinates_, this.stride_);
  }
  /**
   * @return {RenderFeature} A cloned render feature.
   */
  clone() {
    var t;
    return new Xt(
      this.type_,
      this.flatCoordinates_.slice(),
      (t = this.ends_) == null ? void 0 : t.slice(),
      this.stride_,
      Object.assign({}, this.properties_),
      this.id_
    );
  }
  /**
   * @return {Array<number>|null} Ends.
   */
  getEnds() {
    return this.ends_;
  }
  /**
   * Add transform and resolution based geometry simplification to this instance.
   * @return {RenderFeature} This render feature.
   */
  enableSimplifyTransformed() {
    return this.simplifyTransformed = Xo((t, e) => {
      if (t === this.squaredTolerance_)
        return this.simplifiedGeometry_;
      this.simplifiedGeometry_ = this.clone(), e && this.simplifiedGeometry_.applyTransform(e);
      const i = this.simplifiedGeometry_.getFlatCoordinates();
      let s;
      switch (this.type_) {
        case "LineString":
          i.length = tr(
            i,
            0,
            this.simplifiedGeometry_.flatCoordinates_.length,
            this.simplifiedGeometry_.stride_,
            t,
            i,
            0
          ), s = [i.length];
          break;
        case "MultiLineString":
          s = [], i.length = sc(
            i,
            0,
            this.simplifiedGeometry_.ends_,
            this.simplifiedGeometry_.stride_,
            t,
            i,
            0,
            s
          );
          break;
        case "Polygon":
          s = [], i.length = ya(
            i,
            0,
            this.simplifiedGeometry_.ends_,
            this.simplifiedGeometry_.stride_,
            Math.sqrt(t),
            i,
            0,
            s
          );
          break;
      }
      return s && (this.simplifiedGeometry_ = new Xt(
        this.type_,
        i,
        s,
        2,
        this.properties_,
        this.id_
      )), this.squaredTolerance_ = t, this.simplifiedGeometry_;
    }), this;
  }
}
Xt.prototype.getFlatCoordinates = Xt.prototype.getOrientedFlatCoordinates;
function wa(n, t, e = 0, i = n.length - 1, s = Ac) {
  for (; i > e; ) {
    if (i - e > 600) {
      const l = i - e + 1, h = t - e + 1, c = Math.log(l), u = 0.5 * Math.exp(2 * c / 3), d = 0.5 * Math.sqrt(c * u * (l - u) / l) * (h - l / 2 < 0 ? -1 : 1), g = Math.max(e, Math.floor(t - h * u / l + d)), f = Math.min(i, Math.floor(t + (l - h) * u / l + d));
      wa(n, t, g, f, s);
    }
    const r = n[t];
    let o = e, a = i;
    for (Ai(n, e, t), s(n[i], r) > 0 && Ai(n, e, i); o < a; ) {
      for (Ai(n, o, a), o++, a--; s(n[o], r) < 0; ) o++;
      for (; s(n[a], r) > 0; ) a--;
    }
    s(n[e], r) === 0 ? Ai(n, e, a) : (a++, Ai(n, a, i)), a <= t && (e = a + 1), t <= a && (i = a - 1);
  }
}
function Ai(n, t, e) {
  const i = n[t];
  n[t] = n[e], n[e] = i;
}
function Ac(n, t) {
  return n < t ? -1 : n > t ? 1 : 0;
}
let Ia = class {
  constructor(t = 9) {
    this._maxEntries = Math.max(4, t), this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4)), this.clear();
  }
  all() {
    return this._all(this.data, []);
  }
  search(t) {
    let e = this.data;
    const i = [];
    if (!hn(t, e)) return i;
    const s = this.toBBox, r = [];
    for (; e; ) {
      for (let o = 0; o < e.children.length; o++) {
        const a = e.children[o], l = e.leaf ? s(a) : a;
        hn(t, l) && (e.leaf ? i.push(a) : ss(t, l) ? this._all(a, i) : r.push(a));
      }
      e = r.pop();
    }
    return i;
  }
  collides(t) {
    let e = this.data;
    if (!hn(t, e)) return !1;
    const i = [];
    for (; e; ) {
      for (let s = 0; s < e.children.length; s++) {
        const r = e.children[s], o = e.leaf ? this.toBBox(r) : r;
        if (hn(t, o)) {
          if (e.leaf || ss(t, o)) return !0;
          i.push(r);
        }
      }
      e = i.pop();
    }
    return !1;
  }
  load(t) {
    if (!(t && t.length)) return this;
    if (t.length < this._minEntries) {
      for (let i = 0; i < t.length; i++)
        this.insert(t[i]);
      return this;
    }
    let e = this._build(t.slice(), 0, t.length - 1, 0);
    if (!this.data.children.length)
      this.data = e;
    else if (this.data.height === e.height)
      this._splitRoot(this.data, e);
    else {
      if (this.data.height < e.height) {
        const i = this.data;
        this.data = e, e = i;
      }
      this._insert(e, this.data.height - e.height - 1, !0);
    }
    return this;
  }
  insert(t) {
    return t && this._insert(t, this.data.height - 1), this;
  }
  clear() {
    return this.data = Qe([]), this;
  }
  remove(t, e) {
    if (!t) return this;
    let i = this.data;
    const s = this.toBBox(t), r = [], o = [];
    let a, l, h;
    for (; i || r.length; ) {
      if (i || (i = r.pop(), l = r[r.length - 1], a = o.pop(), h = !0), i.leaf) {
        const c = vc(t, i.children, e);
        if (c !== -1)
          return i.children.splice(c, 1), r.push(i), this._condense(r), this;
      }
      !h && !i.leaf && ss(i, s) ? (r.push(i), o.push(a), a = 0, l = i, i = i.children[0]) : l ? (a++, i = l.children[a], h = !1) : i = null;
    }
    return this;
  }
  toBBox(t) {
    return t;
  }
  compareMinX(t, e) {
    return t.minX - e.minX;
  }
  compareMinY(t, e) {
    return t.minY - e.minY;
  }
  toJSON() {
    return this.data;
  }
  fromJSON(t) {
    return this.data = t, this;
  }
  _all(t, e) {
    const i = [];
    for (; t; )
      t.leaf ? e.push(...t.children) : i.push(...t.children), t = i.pop();
    return e;
  }
  _build(t, e, i, s) {
    const r = i - e + 1;
    let o = this._maxEntries, a;
    if (r <= o)
      return a = Qe(t.slice(e, i + 1)), Ze(a, this.toBBox), a;
    s || (s = Math.ceil(Math.log(r) / Math.log(o)), o = Math.ceil(r / Math.pow(o, s - 1))), a = Qe([]), a.leaf = !1, a.height = s;
    const l = Math.ceil(r / o), h = l * Math.ceil(Math.sqrt(o));
    so(t, e, i, h, this.compareMinX);
    for (let c = e; c <= i; c += h) {
      const u = Math.min(c + h - 1, i);
      so(t, c, u, l, this.compareMinY);
      for (let d = c; d <= u; d += l) {
        const g = Math.min(d + l - 1, u);
        a.children.push(this._build(t, d, g, s - 1));
      }
    }
    return Ze(a, this.toBBox), a;
  }
  _chooseSubtree(t, e, i, s) {
    for (; s.push(e), !(e.leaf || s.length - 1 === i); ) {
      let r = 1 / 0, o = 1 / 0, a;
      for (let l = 0; l < e.children.length; l++) {
        const h = e.children[l], c = ns(h), u = bc(t, h) - c;
        u < o ? (o = u, r = c < r ? c : r, a = h) : u === o && c < r && (r = c, a = h);
      }
      e = a || e.children[0];
    }
    return e;
  }
  _insert(t, e, i) {
    const s = i ? t : this.toBBox(t), r = [], o = this._chooseSubtree(s, this.data, e, r);
    for (o.children.push(t), bi(o, s); e >= 0 && r[e].children.length > this._maxEntries; )
      this._split(r, e), e--;
    this._adjustParentBBoxes(s, r, e);
  }
  // split overflowed node into two
  _split(t, e) {
    const i = t[e], s = i.children.length, r = this._minEntries;
    this._chooseSplitAxis(i, r, s);
    const o = this._chooseSplitIndex(i, r, s), a = Qe(i.children.splice(o, i.children.length - o));
    a.height = i.height, a.leaf = i.leaf, Ze(i, this.toBBox), Ze(a, this.toBBox), e ? t[e - 1].children.push(a) : this._splitRoot(i, a);
  }
  _splitRoot(t, e) {
    this.data = Qe([t, e]), this.data.height = t.height + 1, this.data.leaf = !1, Ze(this.data, this.toBBox);
  }
  _chooseSplitIndex(t, e, i) {
    let s, r = 1 / 0, o = 1 / 0;
    for (let a = e; a <= i - e; a++) {
      const l = Li(t, 0, a, this.toBBox), h = Li(t, a, i, this.toBBox), c = Fc(l, h), u = ns(l) + ns(h);
      c < r ? (r = c, s = a, o = u < o ? u : o) : c === r && u < o && (o = u, s = a);
    }
    return s || i - e;
  }
  // sorts node children by the best axis for split
  _chooseSplitAxis(t, e, i) {
    const s = t.leaf ? this.compareMinX : Mc, r = t.leaf ? this.compareMinY : Lc, o = this._allDistMargin(t, e, i, s), a = this._allDistMargin(t, e, i, r);
    o < a && t.children.sort(s);
  }
  // total margin of all possible split distributions where each node is at least m full
  _allDistMargin(t, e, i, s) {
    t.children.sort(s);
    const r = this.toBBox, o = Li(t, 0, e, r), a = Li(t, i - e, i, r);
    let l = ln(o) + ln(a);
    for (let h = e; h < i - e; h++) {
      const c = t.children[h];
      bi(o, t.leaf ? r(c) : c), l += ln(o);
    }
    for (let h = i - e - 1; h >= e; h--) {
      const c = t.children[h];
      bi(a, t.leaf ? r(c) : c), l += ln(a);
    }
    return l;
  }
  _adjustParentBBoxes(t, e, i) {
    for (let s = i; s >= 0; s--)
      bi(e[s], t);
  }
  _condense(t) {
    for (let e = t.length - 1, i; e >= 0; e--)
      t[e].children.length === 0 ? e > 0 ? (i = t[e - 1].children, i.splice(i.indexOf(t[e]), 1)) : this.clear() : Ze(t[e], this.toBBox);
  }
};
function vc(n, t, e) {
  if (!e) return t.indexOf(n);
  for (let i = 0; i < t.length; i++)
    if (e(n, t[i])) return i;
  return -1;
}
function Ze(n, t) {
  Li(n, 0, n.children.length, t, n);
}
function Li(n, t, e, i, s) {
  s || (s = Qe(null)), s.minX = 1 / 0, s.minY = 1 / 0, s.maxX = -1 / 0, s.maxY = -1 / 0;
  for (let r = t; r < e; r++) {
    const o = n.children[r];
    bi(s, n.leaf ? i(o) : o);
  }
  return s;
}
function bi(n, t) {
  return n.minX = Math.min(n.minX, t.minX), n.minY = Math.min(n.minY, t.minY), n.maxX = Math.max(n.maxX, t.maxX), n.maxY = Math.max(n.maxY, t.maxY), n;
}
function Mc(n, t) {
  return n.minX - t.minX;
}
function Lc(n, t) {
  return n.minY - t.minY;
}
function ns(n) {
  return (n.maxX - n.minX) * (n.maxY - n.minY);
}
function ln(n) {
  return n.maxX - n.minX + (n.maxY - n.minY);
}
function bc(n, t) {
  return (Math.max(t.maxX, n.maxX) - Math.min(t.minX, n.minX)) * (Math.max(t.maxY, n.maxY) - Math.min(t.minY, n.minY));
}
function Fc(n, t) {
  const e = Math.max(n.minX, t.minX), i = Math.max(n.minY, t.minY), s = Math.min(n.maxX, t.maxX), r = Math.min(n.maxY, t.maxY);
  return Math.max(0, s - e) * Math.max(0, r - i);
}
function ss(n, t) {
  return n.minX <= t.minX && n.minY <= t.minY && t.maxX <= n.maxX && t.maxY <= n.maxY;
}
function hn(n, t) {
  return t.minX <= n.maxX && t.minY <= n.maxY && t.maxX >= n.minX && t.maxY >= n.minY;
}
function Qe(n) {
  return {
    children: n,
    height: 1,
    leaf: !0,
    minX: 1 / 0,
    minY: 1 / 0,
    maxX: -1 / 0,
    maxY: -1 / 0
  };
}
function so(n, t, e, i, s) {
  const r = [t, e];
  for (; r.length; ) {
    if (e = r.pop(), t = r.pop(), e - t <= i) continue;
    const o = t + Math.ceil((e - t) / i / 2) * i;
    wa(n, o, t, e, s), r.push(t, o, o, e);
  }
}
class ro {
  /**
   * @param {number} [maxEntries] Max entries.
   */
  constructor(t) {
    this.rbush_ = new Ia(t), this.items_ = {};
  }
  /**
   * Insert a value into the RBush.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {T} value Value.
   */
  insert(t, e) {
    const i = {
      minX: t[0],
      minY: t[1],
      maxX: t[2],
      maxY: t[3],
      value: e
    };
    this.rbush_.insert(i), this.items_[H(e)] = i;
  }
  /**
   * Bulk-insert values into the RBush.
   * @param {Array<import("../extent.js").Extent>} extents Extents.
   * @param {Array<T>} values Values.
   */
  load(t, e) {
    const i = new Array(e.length);
    for (let s = 0, r = e.length; s < r; s++) {
      const o = t[s], a = e[s], l = {
        minX: o[0],
        minY: o[1],
        maxX: o[2],
        maxY: o[3],
        value: a
      };
      i[s] = l, this.items_[H(a)] = l;
    }
    this.rbush_.load(i);
  }
  /**
   * Remove a value from the RBush.
   * @param {T} value Value.
   * @return {boolean} Removed.
   */
  remove(t) {
    const e = H(t), i = this.items_[e];
    return delete this.items_[e], this.rbush_.remove(i) !== null;
  }
  /**
   * Update the extent of a value in the RBush.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {T} value Value.
   */
  update(t, e) {
    const i = this.items_[H(e)], s = [i.minX, i.minY, i.maxX, i.maxY];
    Os(s, t) || (this.remove(e), this.insert(t, e));
  }
  /**
   * Return all values in the RBush.
   * @return {Array<T>} All.
   */
  getAll() {
    return this.rbush_.all().map(function(e) {
      return e.value;
    });
  }
  /**
   * Return all values in the given extent.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {Array<T>} All in extent.
   */
  getInExtent(t) {
    const e = {
      minX: t[0],
      minY: t[1],
      maxX: t[2],
      maxY: t[3]
    };
    return this.rbush_.search(e).map(function(s) {
      return s.value;
    });
  }
  /**
   * Calls a callback function with each value in the tree.
   * If the callback returns a truthy value, this value is returned without
   * checking the rest of the tree.
   * @param {function(T): R} callback Callback.
   * @return {R|undefined} Callback return value.
   * @template R
   */
  forEach(t) {
    return this.forEach_(this.getAll(), t);
  }
  /**
   * Calls a callback function with each value in the provided extent.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(T): R} callback Callback.
   * @return {R|undefined} Callback return value.
   * @template R
   */
  forEachInExtent(t, e) {
    return this.forEach_(this.getInExtent(t), e);
  }
  /**
   * @param {Array<T>} values Values.
   * @param {function(T): R} callback Callback.
   * @return {R|undefined} Callback return value.
   * @template R
   * @private
   */
  forEach_(t, e) {
    let i;
    for (let s = 0, r = t.length; s < r; s++)
      if (i = e(t[s]), i)
        return i;
    return i;
  }
  /**
   * @return {boolean} Is empty.
   */
  isEmpty() {
    return fi(this.items_);
  }
  /**
   * Remove all values from the RBush.
   */
  clear() {
    this.rbush_.clear(), this.items_ = {};
  }
  /**
   * @param {import("../extent.js").Extent} [extent] Extent.
   * @return {import("../extent.js").Extent} Extent.
   */
  getExtent(t) {
    const e = this.rbush_.toJSON();
    return Te(e.minX, e.minY, e.maxX, e.maxY, t);
  }
  /**
   * @param {RBush<T>} rbush R-Tree.
   */
  concat(t) {
    this.rbush_.load(t.rbush_.all());
    for (const e in t.items_)
      this.items_[e] = t.items_[e];
  }
}
class Ca extends Ie {
  /**
   * @param {Options} options Source options.
   */
  constructor(t) {
    super(), this.projection = pt(t.projection), this.attributions_ = oo(t.attributions), this.attributionsCollapsible_ = t.attributionsCollapsible ?? !0, this.loading = !1, this.state_ = t.state !== void 0 ? t.state : "ready", this.wrapX_ = t.wrapX !== void 0 ? t.wrapX : !1, this.interpolate_ = !!t.interpolate, this.viewResolver = null, this.viewRejector = null;
    const e = this;
    this.viewPromise_ = new Promise(function(i, s) {
      e.viewResolver = i, e.viewRejector = s;
    });
  }
  /**
   * Get the attribution function for the source.
   * @return {?Attribution} Attribution function.
   * @api
   */
  getAttributions() {
    return this.attributions_;
  }
  /**
   * @return {boolean} Attributions are collapsible.
   * @api
   */
  getAttributionsCollapsible() {
    return this.attributionsCollapsible_;
  }
  /**
   * Get the projection of the source.
   * @return {import("../proj/Projection.js").default|null} Projection.
   * @api
   */
  getProjection() {
    return this.projection;
  }
  /**
   * @param {import("../proj/Projection").default} [projection] Projection.
   * @return {Array<number>|null} Resolutions.
   */
  getResolutions(t) {
    return null;
  }
  /**
   * @return {Promise<import("../View.js").ViewOptions>} A promise for view-related properties.
   */
  getView() {
    return this.viewPromise_;
  }
  /**
   * Get the state of the source, see {@link import("./Source.js").State} for possible states.
   * @return {import("./Source.js").State} State.
   * @api
   */
  getState() {
    return this.state_;
  }
  /**
   * @return {boolean|undefined} Wrap X.
   */
  getWrapX() {
    return this.wrapX_;
  }
  /**
   * @return {boolean} Use linear interpolation when resampling.
   */
  getInterpolate() {
    return this.interpolate_;
  }
  /**
   * Refreshes the source. The source will be cleared, and data from the server will be reloaded.
   * @api
   */
  refresh() {
    this.changed();
  }
  /**
   * Set the attributions of the source.
   * @param {AttributionLike|undefined} attributions Attributions.
   *     Can be passed as `string`, `Array<string>`, {@link module:ol/source/Source~Attribution},
   *     or `undefined`.
   * @api
   */
  setAttributions(t) {
    this.attributions_ = oo(t), this.changed();
  }
  /**
   * Set the state of the source.
   * @param {import("./Source.js").State} state State.
   */
  setState(t) {
    this.state_ = t, this.changed();
  }
}
function oo(n) {
  return n ? typeof n == "function" ? n : (Array.isArray(n) || (n = [n]), (t) => n) : null;
}
const Dt = {
  /**
   * Triggered when a feature is added to the source.
   * @event module:ol/source/Vector.VectorSourceEvent#addfeature
   * @api
   */
  ADDFEATURE: "addfeature",
  /**
   * Triggered when a feature is updated.
   * @event module:ol/source/Vector.VectorSourceEvent#changefeature
   * @api
   */
  CHANGEFEATURE: "changefeature",
  /**
   * Triggered when the clear method is called on the source.
   * @event module:ol/source/Vector.VectorSourceEvent#clear
   * @api
   */
  CLEAR: "clear",
  /**
   * Triggered when a feature is removed from the source.
   * See {@link module:ol/source/Vector~VectorSource#clear source.clear()} for exceptions.
   * @event module:ol/source/Vector.VectorSourceEvent#removefeature
   * @api
   */
  REMOVEFEATURE: "removefeature",
  /**
   * Triggered when features starts loading.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloadstart
   * @api
   */
  FEATURESLOADSTART: "featuresloadstart",
  /**
   * Triggered when features finishes loading.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloadend
   * @api
   */
  FEATURESLOADEND: "featuresloadend",
  /**
   * Triggered if feature loading results in an error.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloaderror
   * @api
   */
  FEATURESLOADERROR: "featuresloaderror"
};
class de extends xi {
  /**
   * @param {string} type Type.
   * @param {FeatureType} [feature] Feature.
   * @param {Array<FeatureType>} [features] Features.
   */
  constructor(t, e, i) {
    super(t), this.feature = e, this.features = i;
  }
}
class Dc extends Ca {
  /**
   * @param {Options<FeatureType>} [options] Vector source options.
   */
  constructor(t) {
    t = t || {}, super({
      attributions: t.attributions,
      interpolate: !0,
      projection: void 0,
      state: "ready",
      wrapX: t.wrapX !== void 0 ? t.wrapX : !0
    }), this.on, this.once, this.un, this.loader_ = di, this.format_ = t.format || null, this.overlaps_ = t.overlaps === void 0 ? !0 : t.overlaps, this.url_ = t.url, t.loader !== void 0 ? this.loader_ = t.loader : this.url_ !== void 0 && (et(this.format_, "`format` must be set when `url` is set"), this.loader_ = to(this.url_, this.format_)), this.strategy_ = t.strategy !== void 0 ? t.strategy : xc;
    const e = t.useSpatialIndex !== void 0 ? t.useSpatialIndex : !0;
    this.featuresRtree_ = e ? new ro() : null, this.loadedExtentsRtree_ = new ro(), this.loadingExtentsCount_ = 0, this.nullGeometryFeatures_ = {}, this.idIndex_ = {}, this.uidIndex_ = {}, this.featureChangeKeys_ = {}, this.featuresCollection_ = null;
    let i, s;
    Array.isArray(t.features) ? s = t.features : t.features && (i = t.features, s = i.getArray()), !e && i === void 0 && (i = new Hh(s)), s !== void 0 && this.addFeaturesInternal(s), i !== void 0 && this.bindFeaturesCollection_(i);
  }
  /**
   * Add a single feature to the source.  If you want to add a batch of features
   * at once, call {@link module:ol/source/Vector~VectorSource#addFeatures #addFeatures()}
   * instead. A feature will not be added to the source if feature with
   * the same id is already there. The reason for this behavior is to avoid
   * feature duplication when using bbox or tile loading strategies.
   * Note: this also applies if a {@link module:ol/Collection~Collection} is used for features,
   * meaning that if a feature with a duplicate id is added in the collection, it will
   * be removed from it right away.
   * @param {FeatureType} feature Feature to add.
   * @api
   */
  addFeature(t) {
    this.addFeatureInternal(t), this.changed();
  }
  /**
   * Add a feature without firing a `change` event.
   * @param {FeatureType} feature Feature.
   * @protected
   */
  addFeatureInternal(t) {
    const e = H(t);
    if (!this.addToIndex_(e, t)) {
      this.featuresCollection_ && this.featuresCollection_.remove(t);
      return;
    }
    this.setupChangeEvents_(e, t);
    const i = t.getGeometry();
    if (i) {
      const s = i.getExtent();
      this.featuresRtree_ && this.featuresRtree_.insert(s, t);
    } else
      this.nullGeometryFeatures_[e] = t;
    this.dispatchEvent(
      new de(Dt.ADDFEATURE, t)
    );
  }
  /**
   * @param {string} featureKey Unique identifier for the feature.
   * @param {FeatureType} feature The feature.
   * @private
   */
  setupChangeEvents_(t, e) {
    e instanceof Xt || (this.featureChangeKeys_[t] = [
      kt(e, ut.CHANGE, this.handleFeatureChange_, this),
      kt(
        e,
        Go.PROPERTYCHANGE,
        this.handleFeatureChange_,
        this
      )
    ]);
  }
  /**
   * @param {string} featureKey Unique identifier for the feature.
   * @param {FeatureType} feature The feature.
   * @return {boolean} The feature is "valid", in the sense that it is also a
   *     candidate for insertion into the Rtree.
   * @private
   */
  addToIndex_(t, e) {
    let i = !0;
    if (e.getId() !== void 0) {
      const s = String(e.getId());
      if (!(s in this.idIndex_))
        this.idIndex_[s] = e;
      else if (e instanceof Xt) {
        const r = this.idIndex_[s];
        r instanceof Xt ? Array.isArray(r) ? r.push(e) : this.idIndex_[s] = [r, e] : i = !1;
      } else
        i = !1;
    }
    return i && (et(
      !(t in this.uidIndex_),
      "The passed `feature` was already added to the source"
    ), this.uidIndex_[t] = e), i;
  }
  /**
   * Add a batch of features to the source.
   * @param {Array<FeatureType>} features Features to add.
   * @api
   */
  addFeatures(t) {
    this.addFeaturesInternal(t), this.changed();
  }
  /**
   * Add features without firing a `change` event.
   * @param {Array<FeatureType>} features Features.
   * @protected
   */
  addFeaturesInternal(t) {
    const e = [], i = [], s = [];
    for (let r = 0, o = t.length; r < o; r++) {
      const a = t[r], l = H(a);
      this.addToIndex_(l, a) && i.push(a);
    }
    for (let r = 0, o = i.length; r < o; r++) {
      const a = i[r], l = H(a);
      this.setupChangeEvents_(l, a);
      const h = a.getGeometry();
      if (h) {
        const c = h.getExtent();
        e.push(c), s.push(a);
      } else
        this.nullGeometryFeatures_[l] = a;
    }
    if (this.featuresRtree_ && this.featuresRtree_.load(e, s), this.hasListener(Dt.ADDFEATURE))
      for (let r = 0, o = i.length; r < o; r++)
        this.dispatchEvent(
          new de(Dt.ADDFEATURE, i[r])
        );
  }
  /**
   * @param {!Collection<FeatureType>} collection Collection.
   * @private
   */
  bindFeaturesCollection_(t) {
    let e = !1;
    this.addEventListener(
      Dt.ADDFEATURE,
      /**
       * @param {VectorSourceEvent<FeatureType>} evt The vector source event
       */
      function(i) {
        e || (e = !0, t.push(i.feature), e = !1);
      }
    ), this.addEventListener(
      Dt.REMOVEFEATURE,
      /**
       * @param {VectorSourceEvent<FeatureType>} evt The vector source event
       */
      function(i) {
        e || (e = !0, t.remove(i.feature), e = !1);
      }
    ), t.addEventListener(
      ii.ADD,
      /**
       * @param {import("../Collection.js").CollectionEvent<FeatureType>} evt The collection event
       */
      (i) => {
        e || (e = !0, this.addFeature(i.element), e = !1);
      }
    ), t.addEventListener(
      ii.REMOVE,
      /**
       * @param {import("../Collection.js").CollectionEvent<FeatureType>} evt The collection event
       */
      (i) => {
        e || (e = !0, this.removeFeature(i.element), e = !1);
      }
    ), this.featuresCollection_ = t;
  }
  /**
   * Remove all features from the source.
   * @param {boolean} [fast] Skip dispatching of {@link module:ol/source/Vector.VectorSourceEvent#event:removefeature} events.
   * @api
   */
  clear(t) {
    if (t) {
      for (const i in this.featureChangeKeys_)
        this.featureChangeKeys_[i].forEach(Ct);
      this.featuresCollection_ || (this.featureChangeKeys_ = {}, this.idIndex_ = {}, this.uidIndex_ = {});
    } else if (this.featuresRtree_) {
      this.featuresRtree_.forEach((i) => {
        this.removeFeatureInternal(i);
      });
      for (const i in this.nullGeometryFeatures_)
        this.removeFeatureInternal(this.nullGeometryFeatures_[i]);
    }
    this.featuresCollection_ && this.featuresCollection_.clear(), this.featuresRtree_ && this.featuresRtree_.clear(), this.nullGeometryFeatures_ = {};
    const e = new de(Dt.CLEAR);
    this.dispatchEvent(e), this.changed();
  }
  /**
   * Iterate through all features on the source, calling the provided callback
   * with each one.  If the callback returns any "truthy" value, iteration will
   * stop and the function will return the same value.
   * Note: this function only iterate through the feature that have a defined geometry.
   *
   * @param {function(FeatureType): T} callback Called with each feature
   *     on the source.  Return a truthy value to stop iteration.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */
  forEachFeature(t) {
    if (this.featuresRtree_)
      return this.featuresRtree_.forEach(t);
    this.featuresCollection_ && this.featuresCollection_.forEach(t);
  }
  /**
   * Iterate through all features whose geometries contain the provided
   * coordinate, calling the callback with each feature.  If the callback returns
   * a "truthy" value, iteration will stop and the function will return the same
   * value.
   *
   * For {@link module:ol/render/Feature~RenderFeature} features, the callback will be
   * called for all features.
   *
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {function(FeatureType): T} callback Called with each feature
   *     whose goemetry contains the provided coordinate.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   */
  forEachFeatureAtCoordinateDirect(t, e) {
    const i = [t[0], t[1], t[0], t[1]];
    return this.forEachFeatureInExtent(i, function(s) {
      const r = s.getGeometry();
      if (r instanceof Xt || r.intersectsCoordinate(t))
        return e(s);
    });
  }
  /**
   * Iterate through all features whose bounding box intersects the provided
   * extent (note that the feature's geometry may not intersect the extent),
   * calling the callback with each feature.  If the callback returns a "truthy"
   * value, iteration will stop and the function will return the same value.
   *
   * If you are interested in features whose geometry intersects an extent, call
   * the {@link module:ol/source/Vector~VectorSource#forEachFeatureIntersectingExtent #forEachFeatureIntersectingExtent()} method instead.
   *
   * When `useSpatialIndex` is set to false, this method will loop through all
   * features, equivalent to {@link module:ol/source/Vector~VectorSource#forEachFeature #forEachFeature()}.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(FeatureType): T} callback Called with each feature
   *     whose bounding box intersects the provided extent.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */
  forEachFeatureInExtent(t, e) {
    if (this.featuresRtree_)
      return this.featuresRtree_.forEachInExtent(t, e);
    this.featuresCollection_ && this.featuresCollection_.forEach(e);
  }
  /**
   * Iterate through all features whose geometry intersects the provided extent,
   * calling the callback with each feature.  If the callback returns a "truthy"
   * value, iteration will stop and the function will return the same value.
   *
   * If you only want to test for bounding box intersection, call the
   * {@link module:ol/source/Vector~VectorSource#forEachFeatureInExtent #forEachFeatureInExtent()} method instead.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(FeatureType): T} callback Called with each feature
   *     whose geometry intersects the provided extent.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */
  forEachFeatureIntersectingExtent(t, e) {
    return this.forEachFeatureInExtent(
      t,
      /**
       * @param {FeatureType} feature Feature.
       * @return {T|undefined} The return value from the last call to the callback.
       */
      function(i) {
        const s = i.getGeometry();
        if (s instanceof Xt || s.intersectsExtent(t)) {
          const r = e(i);
          if (r)
            return r;
        }
      }
    );
  }
  /**
   * Get the features collection associated with this source. Will be `null`
   * unless the source was configured with `useSpatialIndex` set to `false`, or
   * with a {@link module:ol/Collection~Collection} as `features`.
   * @return {Collection<FeatureType>|null} The collection of features.
   * @api
   */
  getFeaturesCollection() {
    return this.featuresCollection_;
  }
  /**
   * Get a snapshot of the features currently on the source in random order. The returned array
   * is a copy, the features are references to the features in the source.
   * @return {Array<FeatureType>} Features.
   * @api
   */
  getFeatures() {
    let t;
    return this.featuresCollection_ ? t = this.featuresCollection_.getArray().slice(0) : this.featuresRtree_ && (t = this.featuresRtree_.getAll(), fi(this.nullGeometryFeatures_) || Ms(t, Object.values(this.nullGeometryFeatures_))), t;
  }
  /**
   * Get all features whose geometry intersects the provided coordinate.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {Array<FeatureType>} Features.
   * @api
   */
  getFeaturesAtCoordinate(t) {
    const e = [];
    return this.forEachFeatureAtCoordinateDirect(t, function(i) {
      e.push(i);
    }), e;
  }
  /**
   * Get all features whose bounding box intersects the provided extent.  Note that this returns an array of
   * all features intersecting the given extent in random order (so it may include
   * features whose geometries do not intersect the extent).
   *
   * When `useSpatialIndex` is set to false, this method will return all
   * features.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {import("../proj/Projection.js").default} [projection] Include features
   * where `extent` exceeds the x-axis bounds of `projection` and wraps around the world.
   * @return {Array<FeatureType>} Features.
   * @api
   */
  getFeaturesInExtent(t, e) {
    if (this.featuresRtree_) {
      if (!(e && e.canWrapX() && this.getWrapX()))
        return this.featuresRtree_.getInExtent(t);
      const s = ks(t, e);
      return [].concat(
        ...s.map((r) => this.featuresRtree_.getInExtent(r))
      );
    }
    return this.featuresCollection_ ? this.featuresCollection_.getArray().slice(0) : [];
  }
  /**
   * Get the closest feature to the provided coordinate.
   *
   * This method is not available when the source is configured with
   * `useSpatialIndex` set to `false` and the features in this source are of type
   * {@link module:ol/Feature~Feature}.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {function(FeatureType):boolean} [filter] Feature filter function.
   *     The filter function will receive one argument, the {@link module:ol/Feature~Feature feature}
   *     and it should return a boolean value. By default, no filtering is made.
   * @return {FeatureType} Closest feature.
   * @api
   */
  getClosestFeatureToCoordinate(t, e) {
    const i = t[0], s = t[1];
    let r = null;
    const o = [NaN, NaN];
    let a = 1 / 0;
    const l = [-1 / 0, -1 / 0, 1 / 0, 1 / 0];
    return e = e || wl, this.featuresRtree_.forEachInExtent(
      l,
      /**
       * @param {FeatureType} feature Feature.
       */
      function(h) {
        if (e(h)) {
          const c = h.getGeometry(), u = a;
          if (a = c instanceof Xt ? 0 : c.closestPointXY(i, s, o, a), a < u) {
            r = h;
            const d = Math.sqrt(a);
            l[0] = i - d, l[1] = s - d, l[2] = i + d, l[3] = s + d;
          }
        }
      }
    ), r;
  }
  /**
   * Get the extent of the features currently in the source.
   *
   * This method is not available when the source is configured with
   * `useSpatialIndex` set to `false`.
   * @param {import("../extent.js").Extent} [extent] Destination extent. If provided, no new extent
   *     will be created. Instead, that extent's coordinates will be overwritten.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent(t) {
    return this.featuresRtree_.getExtent(t);
  }
  /**
   * Get a feature by its identifier (the value returned by feature.getId()). When `RenderFeature`s
   * are used, `getFeatureById()` can return an array of `RenderFeature`s. This allows for handling
   * of `GeometryCollection` geometries, where format readers create one `RenderFeature` per
   * `GeometryCollection` member.
   * Note that the index treats string and numeric identifiers as the same.  So
   * `source.getFeatureById(2)` will return a feature with id `'2'` or `2`.
   *
   * @param {string|number} id Feature identifier.
   * @return {FeatureClassOrArrayOfRenderFeatures<FeatureType>|null} The feature (or `null` if not found).
   * @api
   */
  getFeatureById(t) {
    const e = this.idIndex_[t.toString()];
    return e !== void 0 ? (
      /** @type {FeatureClassOrArrayOfRenderFeatures<FeatureType>} */
      e
    ) : null;
  }
  /**
   * Get a feature by its internal unique identifier (using `getUid`).
   *
   * @param {string} uid Feature identifier.
   * @return {FeatureType|null} The feature (or `null` if not found).
   */
  getFeatureByUid(t) {
    const e = this.uidIndex_[t];
    return e !== void 0 ? e : null;
  }
  /**
   * Get the format associated with this source.
   *
   * @return {import("../format/Feature.js").default<FeatureType>|null}} The feature format.
   * @api
   */
  getFormat() {
    return this.format_;
  }
  /**
   * @return {boolean} The source can have overlapping geometries.
   */
  getOverlaps() {
    return this.overlaps_;
  }
  /**
   * Get the url associated with this source.
   *
   * @return {string|import("../featureloader.js").FeatureUrlFunction|undefined} The url.
   * @api
   */
  getUrl() {
    return this.url_;
  }
  /**
   * @param {Event} event Event.
   * @private
   */
  handleFeatureChange_(t) {
    const e = (
      /** @type {FeatureType} */
      t.target
    ), i = H(e), s = e.getGeometry();
    if (!s)
      i in this.nullGeometryFeatures_ || (this.featuresRtree_ && this.featuresRtree_.remove(e), this.nullGeometryFeatures_[i] = e);
    else {
      const o = s.getExtent();
      i in this.nullGeometryFeatures_ ? (delete this.nullGeometryFeatures_[i], this.featuresRtree_ && this.featuresRtree_.insert(o, e)) : this.featuresRtree_ && this.featuresRtree_.update(o, e);
    }
    const r = e.getId();
    if (r !== void 0) {
      const o = r.toString();
      this.idIndex_[o] !== e && (this.removeFromIdIndex_(e), this.idIndex_[o] = e);
    } else
      this.removeFromIdIndex_(e), this.uidIndex_[i] = e;
    this.changed(), this.dispatchEvent(
      new de(Dt.CHANGEFEATURE, e)
    );
  }
  /**
   * Returns true if the feature is contained within the source.
   * @param {FeatureType} feature Feature.
   * @return {boolean} Has feature.
   * @api
   */
  hasFeature(t) {
    const e = t.getId();
    return e !== void 0 ? e in this.idIndex_ : H(t) in this.uidIndex_;
  }
  /**
   * @return {boolean} Is empty.
   */
  isEmpty() {
    return this.featuresRtree_ ? this.featuresRtree_.isEmpty() && fi(this.nullGeometryFeatures_) : this.featuresCollection_ ? this.featuresCollection_.getLength() === 0 : !0;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */
  loadFeatures(t, e, i) {
    const s = this.loadedExtentsRtree_, r = this.strategy_(t, e, i);
    for (let o = 0, a = r.length; o < a; ++o) {
      const l = r[o];
      s.forEachInExtent(
        l,
        /**
         * @param {{extent: import("../extent.js").Extent}} object Object.
         * @return {boolean} Contains.
         */
        function(c) {
          return Mi(c.extent, l);
        }
      ) || (++this.loadingExtentsCount_, this.dispatchEvent(
        new de(Dt.FEATURESLOADSTART)
      ), this.loader_.call(
        this,
        l,
        e,
        i,
        /**
         * @param {Array<FeatureType>} features Loaded features
         */
        (c) => {
          --this.loadingExtentsCount_, this.dispatchEvent(
            new de(
              Dt.FEATURESLOADEND,
              void 0,
              c
            )
          );
        },
        () => {
          --this.loadingExtentsCount_, this.dispatchEvent(
            new de(Dt.FEATURESLOADERROR)
          );
        }
      ), s.insert(l, { extent: l.slice() }));
    }
    this.loading = this.loader_.length < 4 ? !1 : this.loadingExtentsCount_ > 0;
  }
  /**
   * @override
   */
  refresh() {
    this.clear(!0), this.loadedExtentsRtree_.clear(), super.refresh();
  }
  /**
   * Remove an extent from the list of loaded extents.
   * @param {import("../extent.js").Extent} extent Extent.
   * @api
   */
  removeLoadedExtent(t) {
    const e = this.loadedExtentsRtree_, i = e.forEachInExtent(t, function(s) {
      if (Os(s.extent, t))
        return s;
    });
    i && e.remove(i);
  }
  /**
   * Batch remove features from the source.  If you want to remove all features
   * at once, use the {@link module:ol/source/Vector~VectorSource#clear #clear()} method
   * instead.
   * @param {Array<FeatureType>} features Features to remove.
   * @api
   */
  removeFeatures(t) {
    let e = !1;
    for (let i = 0, s = t.length; i < s; ++i)
      e = this.removeFeatureInternal(t[i]) || e;
    e && this.changed();
  }
  /**
   * Remove a single feature from the source. If you want to batch remove
   * features, use the {@link module:ol/source/Vector~VectorSource#removeFeatures #removeFeatures()} method
   * instead.
   * @param {FeatureType} feature Feature to remove.
   * @api
   */
  removeFeature(t) {
    if (!t)
      return;
    this.removeFeatureInternal(t) && this.changed();
  }
  /**
   * Remove feature without firing a `change` event.
   * @param {FeatureType} feature Feature.
   * @return {boolean} True if the feature was removed, false if it was not found.
   * @protected
   */
  removeFeatureInternal(t) {
    const e = H(t);
    if (!(e in this.uidIndex_))
      return !1;
    e in this.nullGeometryFeatures_ ? delete this.nullGeometryFeatures_[e] : this.featuresRtree_ && this.featuresRtree_.remove(t);
    const i = this.featureChangeKeys_[e];
    i == null || i.forEach(Ct), delete this.featureChangeKeys_[e];
    const s = t.getId();
    if (s !== void 0) {
      const r = s.toString(), o = this.idIndex_[r];
      o === t ? delete this.idIndex_[r] : Array.isArray(o) && (o.splice(o.indexOf(t), 1), o.length === 1 && (this.idIndex_[r] = o[0]));
    }
    return delete this.uidIndex_[e], this.hasListener(Dt.REMOVEFEATURE) && this.dispatchEvent(
      new de(Dt.REMOVEFEATURE, t)
    ), !0;
  }
  /**
   * Remove a feature from the id index.  Called internally when the feature id
   * may have changed.
   * @param {FeatureType} feature The feature.
   * @private
   */
  removeFromIdIndex_(t) {
    for (const e in this.idIndex_)
      if (this.idIndex_[e] === t) {
        delete this.idIndex_[e];
        break;
      }
  }
  /**
   * Set the new loader of the source. The next render cycle will use the
   * new loader.
   * @param {import("../featureloader.js").FeatureLoader} loader The loader to set.
   * @api
   */
  setLoader(t) {
    this.loader_ = t;
  }
  /**
   * Points the source to a new url. The next render cycle will use the new url.
   * @param {string|import("../featureloader.js").FeatureUrlFunction} url Url.
   * @api
   */
  setUrl(t) {
    et(this.format_, "`format` must be set when `url` is set"), this.url_ = t, this.setLoader(to(t, this.format_));
  }
  /**
   * @param {boolean} overlaps The source can have overlapping geometries.
   */
  setOverlaps(t) {
    this.overlaps_ = t, this.changed();
  }
}
const Ot = {
  ANIMATING: 0,
  INTERACTING: 1
}, X = {
  BEGIN_GEOMETRY: 0,
  BEGIN_PATH: 1,
  CIRCLE: 2,
  CLOSE_PATH: 3,
  CUSTOM: 4,
  DRAW_CHARS: 5,
  DRAW_IMAGE: 6,
  END_GEOMETRY: 7,
  FILL: 8,
  MOVE_TO_LINE_TO: 9,
  SET_FILL_STYLE: 10,
  SET_STROKE_STYLE: 11,
  STROKE: 12
}, cn = [X.FILL], ye = [X.STROKE], ke = [X.BEGIN_PATH], ao = [X.CLOSE_PATH];
class Qi extends Ea {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(t, e, i, s) {
    super(), this.tolerance = t, this.maxExtent = e, this.pixelRatio = s, this.maxLineWidth = 0, this.resolution = i, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_ = null, this.bufferedMaxExtent_ = null, this.instructions = [], this.coordinates = [], this.tmpCoordinate_ = [], this.hitDetectionInstructions = [], this.state = /** @type {import("../canvas.js").FillStrokeState} */
    {};
  }
  /**
   * @protected
   * @param {Array<number>} dashArray Dash array.
   * @return {Array<number>} Dash array with pixel ratio applied
   */
  applyPixelRatio(t) {
    const e = this.pixelRatio;
    return e == 1 ? t : t.map(function(i) {
      return i * e;
    });
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} stride Stride.
   * @protected
   * @return {number} My end
   */
  appendFlatPointCoordinates(t, e) {
    const i = this.getBufferedMaxExtent(), s = this.tmpCoordinate_, r = this.coordinates;
    let o = r.length;
    for (let a = 0, l = t.length; a < l; a += e)
      s[0] = t[a], s[1] = t[a + 1], gi(i, s) && (r[o++] = s[0], r[o++] = s[1]);
    return o;
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @param {boolean} closed Last input coordinate equals first.
   * @param {boolean} skipFirst Skip first coordinate.
   * @protected
   * @return {number} My end.
   */
  appendFlatLineCoordinates(t, e, i, s, r, o) {
    const a = this.coordinates;
    let l = a.length;
    const h = this.getBufferedMaxExtent();
    o && (e += s);
    let c = t[e], u = t[e + 1];
    const d = this.tmpCoordinate_;
    let g = !0, f, _, m;
    for (f = e + s; f < i; f += s)
      d[0] = t[f], d[1] = t[f + 1], m = gs(h, d), m !== _ ? (g && (a[l++] = c, a[l++] = u, g = !1), a[l++] = d[0], a[l++] = d[1]) : m === ct.INTERSECTING ? (a[l++] = d[0], a[l++] = d[1], g = !1) : g = !0, c = d[0], u = d[1], _ = m;
    return (r && g || f === e + s) && (a[l++] = c, a[l++] = u), l;
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @param {Array<number>} builderEnds Builder ends.
   * @return {number} Offset.
   */
  drawCustomCoordinates_(t, e, i, s, r) {
    for (let o = 0, a = i.length; o < a; ++o) {
      const l = i[o], h = this.appendFlatLineCoordinates(
        t,
        e,
        l,
        s,
        !1,
        !1
      );
      r.push(h), e = l;
    }
    return e;
  }
  /**
   * @param {import("../../geom/SimpleGeometry.js").default} geometry Geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {Function} renderer Renderer.
   * @param {Function} hitDetectionRenderer Renderer.
   * @param {number} [index] Render order index.
   * @override
   */
  drawCustom(t, e, i, s, r) {
    this.beginGeometry(t, e, r);
    const o = t.getType(), a = t.getStride(), l = this.coordinates.length;
    let h, c, u, d, g;
    switch (o) {
      case "MultiPolygon":
        h = /** @type {import("../../geom/MultiPolygon.js").default} */
        t.getOrientedFlatCoordinates(), d = [];
        const f = (
          /** @type {import("../../geom/MultiPolygon.js").default} */
          t.getEndss()
        );
        g = 0;
        for (let _ = 0, m = f.length; _ < m; ++_) {
          const p = [];
          g = this.drawCustomCoordinates_(
            h,
            g,
            f[_],
            a,
            p
          ), d.push(p);
        }
        this.instructions.push([
          X.CUSTOM,
          l,
          d,
          t,
          i,
          qr,
          r
        ]), this.hitDetectionInstructions.push([
          X.CUSTOM,
          l,
          d,
          t,
          s || i,
          qr,
          r
        ]);
        break;
      case "Polygon":
      case "MultiLineString":
        u = [], h = o == "Polygon" ? (
          /** @type {import("../../geom/Polygon.js").default} */
          t.getOrientedFlatCoordinates()
        ) : t.getFlatCoordinates(), g = this.drawCustomCoordinates_(
          h,
          0,
          /** @type {import("../../geom/Polygon.js").default|import("../../geom/MultiLineString.js").default} */
          t.getEnds(),
          a,
          u
        ), this.instructions.push([
          X.CUSTOM,
          l,
          u,
          t,
          i,
          Sn,
          r
        ]), this.hitDetectionInstructions.push([
          X.CUSTOM,
          l,
          u,
          t,
          s || i,
          Sn,
          r
        ]);
        break;
      case "LineString":
      case "Circle":
        h = t.getFlatCoordinates(), c = this.appendFlatLineCoordinates(
          h,
          0,
          h.length,
          a,
          !1,
          !1
        ), this.instructions.push([
          X.CUSTOM,
          l,
          c,
          t,
          i,
          ni,
          r
        ]), this.hitDetectionInstructions.push([
          X.CUSTOM,
          l,
          c,
          t,
          s || i,
          ni,
          r
        ]);
        break;
      case "MultiPoint":
        h = t.getFlatCoordinates(), c = this.appendFlatPointCoordinates(h, a), c > l && (this.instructions.push([
          X.CUSTOM,
          l,
          c,
          t,
          i,
          ni,
          r
        ]), this.hitDetectionInstructions.push([
          X.CUSTOM,
          l,
          c,
          t,
          s || i,
          ni,
          r
        ]));
        break;
      case "Point":
        h = t.getFlatCoordinates(), this.coordinates.push(h[0], h[1]), c = this.coordinates.length, this.instructions.push([
          X.CUSTOM,
          l,
          c,
          t,
          i,
          void 0,
          r
        ]), this.hitDetectionInstructions.push([
          X.CUSTOM,
          l,
          c,
          t,
          s || i,
          void 0,
          r
        ]);
        break;
    }
    this.endGeometry(e);
  }
  /**
   * @protected
   * @param {import("../../geom/Geometry").default|import("../Feature.js").default} geometry The geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} index Render order index
   */
  beginGeometry(t, e, i) {
    this.beginGeometryInstruction1_ = [
      X.BEGIN_GEOMETRY,
      e,
      0,
      t,
      i
    ], this.instructions.push(this.beginGeometryInstruction1_), this.beginGeometryInstruction2_ = [
      X.BEGIN_GEOMETRY,
      e,
      0,
      t,
      i
    ], this.hitDetectionInstructions.push(this.beginGeometryInstruction2_);
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */
  finish() {
    return {
      instructions: this.instructions,
      hitDetectionInstructions: this.hitDetectionInstructions,
      coordinates: this.coordinates
    };
  }
  /**
   * Reverse the hit detection instructions.
   */
  reverseHitDetectionInstructions() {
    const t = this.hitDetectionInstructions;
    t.reverse();
    let e;
    const i = t.length;
    let s, r, o = -1;
    for (e = 0; e < i; ++e)
      s = t[e], r = /** @type {import("./Instruction.js").default} */
      s[0], r == X.END_GEOMETRY ? o = e : r == X.BEGIN_GEOMETRY && (s[2] = e, Tl(this.hitDetectionInstructions, o, e), o = -1);
  }
  /**
   * @param {import("../../style/Fill.js").default} fillStyle Fill style.
   * @param {import('../canvas.js').FillStrokeState} [state] State.
   * @return {import('../canvas.js').FillStrokeState} State.
   */
  fillStyleToState(t, e = (
    /** @type {import('../canvas.js').FillStrokeState} */
    {}
  )) {
    if (t) {
      const i = t.getColor();
      e.fillPatternScale = i && typeof i == "object" && "src" in i ? this.pixelRatio : 1, e.fillStyle = Vt(
        i || Rt
      );
    } else
      e.fillStyle = void 0;
    return e;
  }
  /**
   * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @return {import("../canvas.js").FillStrokeState} State.
   */
  strokeStyleToState(t, e = (
    /** @type {import('../canvas.js').FillStrokeState} */
    {}
  )) {
    if (t) {
      const i = t.getColor();
      e.strokeStyle = Vt(
        i || Ui
      );
      const s = t.getLineCap();
      e.lineCap = s !== void 0 ? s : pi;
      const r = t.getLineDash();
      e.lineDash = r ? r.slice() : oe;
      const o = t.getLineDashOffset();
      e.lineDashOffset = o || ae;
      const a = t.getLineJoin();
      e.lineJoin = a !== void 0 ? a : yi;
      const l = t.getWidth();
      e.lineWidth = l !== void 0 ? l : Bi;
      const h = t.getMiterLimit();
      e.miterLimit = h !== void 0 ? h : Wi, e.lineWidth > this.maxLineWidth && (this.maxLineWidth = e.lineWidth, this.bufferedMaxExtent_ = null);
    } else
      e.strokeStyle = void 0, e.lineCap = void 0, e.lineDash = null, e.lineDashOffset = void 0, e.lineJoin = void 0, e.lineWidth = void 0, e.miterLimit = void 0;
    return e;
  }
  /**
   * @param {import("../../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
   * @override
   */
  setFillStrokeStyle(t, e) {
    const i = this.state;
    this.fillStyleToState(t, i), this.strokeStyleToState(e, i);
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @return {Array<*>} Fill instruction.
   */
  createFill(t) {
    const e = t.fillStyle, i = [X.SET_FILL_STYLE, e];
    return typeof e != "string" && i.push(t.fillPatternScale), i;
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   */
  applyStroke(t) {
    this.instructions.push(this.createStroke(t));
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @return {Array<*>} Stroke instruction.
   */
  createStroke(t) {
    return [
      X.SET_STROKE_STYLE,
      t.strokeStyle,
      t.lineWidth * this.pixelRatio,
      t.lineCap,
      t.lineJoin,
      t.miterLimit,
      t.lineDash ? this.applyPixelRatio(t.lineDash) : null,
      t.lineDashOffset * this.pixelRatio
    ];
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState):Array<*>} createFill Create fill.
   */
  updateFillStyle(t, e) {
    const i = t.fillStyle;
    (typeof i != "string" || t.currentFillStyle != i) && (i !== void 0 && this.instructions.push(e.call(this, t)), t.currentFillStyle = i);
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState): void} applyStroke Apply stroke.
   */
  updateStrokeStyle(t, e) {
    const i = t.strokeStyle, s = t.lineCap, r = t.lineDash, o = t.lineDashOffset, a = t.lineJoin, l = t.lineWidth, h = t.miterLimit;
    (t.currentStrokeStyle != i || t.currentLineCap != s || r != t.currentLineDash && !Ei(t.currentLineDash, r) || t.currentLineDashOffset != o || t.currentLineJoin != a || t.currentLineWidth != l || t.currentMiterLimit != h) && (i !== void 0 && e.call(this, t), t.currentStrokeStyle = i, t.currentLineCap = s, t.currentLineDash = r, t.currentLineDashOffset = o, t.currentLineJoin = a, t.currentLineWidth = l, t.currentMiterLimit = h);
  }
  /**
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */
  endGeometry(t) {
    this.beginGeometryInstruction1_[2] = this.instructions.length, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_[2] = this.hitDetectionInstructions.length, this.beginGeometryInstruction2_ = null;
    const e = [X.END_GEOMETRY, t];
    this.instructions.push(e), this.hitDetectionInstructions.push(e);
  }
  /**
   * Get the buffered rendering extent.  Rendering will be clipped to the extent
   * provided to the constructor.  To account for symbolizers that may intersect
   * this extent, we calculate a buffered extent (e.g. based on stroke width).
   * @return {import("../../extent.js").Extent} The buffered rendering extent.
   * @protected
   */
  getBufferedMaxExtent() {
    if (!this.bufferedMaxExtent_ && (this.bufferedMaxExtent_ = Ml(this.maxExtent), this.maxLineWidth > 0)) {
      const t = this.resolution * (this.maxLineWidth + 1) / 2;
      Gi(this.bufferedMaxExtent_, t, this.bufferedMaxExtent_);
    }
    return this.bufferedMaxExtent_;
  }
}
class Oc extends Qi {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(t, e, i, s) {
    super(t, e, i, s), this.hitDetectionImage_ = null, this.image_ = null, this.imagePixelRatio_ = void 0, this.anchorX_ = void 0, this.anchorY_ = void 0, this.height_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.scale_ = void 0, this.width_ = void 0, this.declutterMode_ = void 0, this.declutterImageWithText_ = void 0;
  }
  /**
   * @param {import("../../geom/Point.js").default|import("../Feature.js").default} pointGeometry Point geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   * @override
   */
  drawPoint(t, e, i) {
    if (!this.image_ || this.maxExtent && !gi(this.maxExtent, t.getFlatCoordinates()))
      return;
    this.beginGeometry(t, e, i);
    const s = t.getFlatCoordinates(), r = t.getStride(), o = this.coordinates.length, a = this.appendFlatPointCoordinates(s, r);
    this.instructions.push([
      X.DRAW_IMAGE,
      o,
      a,
      this.image_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_ * this.imagePixelRatio_,
      this.anchorY_ * this.imagePixelRatio_,
      Math.ceil(this.height_ * this.imagePixelRatio_),
      this.opacity_,
      this.originX_ * this.imagePixelRatio_,
      this.originY_ * this.imagePixelRatio_,
      this.rotateWithView_,
      this.rotation_,
      [
        this.scale_[0] * this.pixelRatio / this.imagePixelRatio_,
        this.scale_[1] * this.pixelRatio / this.imagePixelRatio_
      ],
      Math.ceil(this.width_ * this.imagePixelRatio_),
      this.declutterMode_,
      this.declutterImageWithText_
    ]), this.hitDetectionInstructions.push([
      X.DRAW_IMAGE,
      o,
      a,
      this.hitDetectionImage_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_,
      this.anchorY_,
      this.height_,
      1,
      this.originX_,
      this.originY_,
      this.rotateWithView_,
      this.rotation_,
      this.scale_,
      this.width_,
      this.declutterMode_,
      this.declutterImageWithText_
    ]), this.endGeometry(e);
  }
  /**
   * @param {import("../../geom/MultiPoint.js").default|import("../Feature.js").default} multiPointGeometry MultiPoint geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   * @override
   */
  drawMultiPoint(t, e, i) {
    if (!this.image_)
      return;
    this.beginGeometry(t, e, i);
    const s = t.getFlatCoordinates(), r = [];
    for (let l = 0, h = s.length; l < h; l += t.getStride())
      (!this.maxExtent || gi(this.maxExtent, s.slice(l, l + 2))) && r.push(
        s[l],
        s[l + 1]
      );
    const o = this.coordinates.length, a = this.appendFlatPointCoordinates(r, 2);
    this.instructions.push([
      X.DRAW_IMAGE,
      o,
      a,
      this.image_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_ * this.imagePixelRatio_,
      this.anchorY_ * this.imagePixelRatio_,
      Math.ceil(this.height_ * this.imagePixelRatio_),
      this.opacity_,
      this.originX_ * this.imagePixelRatio_,
      this.originY_ * this.imagePixelRatio_,
      this.rotateWithView_,
      this.rotation_,
      [
        this.scale_[0] * this.pixelRatio / this.imagePixelRatio_,
        this.scale_[1] * this.pixelRatio / this.imagePixelRatio_
      ],
      Math.ceil(this.width_ * this.imagePixelRatio_),
      this.declutterMode_,
      this.declutterImageWithText_
    ]), this.hitDetectionInstructions.push([
      X.DRAW_IMAGE,
      o,
      a,
      this.hitDetectionImage_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_,
      this.anchorY_,
      this.height_,
      1,
      this.originX_,
      this.originY_,
      this.rotateWithView_,
      this.rotation_,
      this.scale_,
      this.width_,
      this.declutterMode_,
      this.declutterImageWithText_
    ]), this.endGeometry(e);
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   * @override
   */
  finish() {
    return this.reverseHitDetectionInstructions(), this.anchorX_ = void 0, this.anchorY_ = void 0, this.hitDetectionImage_ = null, this.image_ = null, this.imagePixelRatio_ = void 0, this.height_ = void 0, this.scale_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.width_ = void 0, super.finish();
  }
  /**
   * @param {import("../../style/Image.js").default} imageStyle Image style.
   * @param {Object} [sharedData] Shared data.
   * @override
   */
  setImageStyle(t, e) {
    const i = t.getAnchor(), s = t.getSize(), r = t.getOrigin();
    this.imagePixelRatio_ = t.getPixelRatio(this.pixelRatio), this.anchorX_ = i[0], this.anchorY_ = i[1], this.hitDetectionImage_ = t.getHitDetectionImage(), this.image_ = t.getImage(this.pixelRatio), this.height_ = s[1], this.opacity_ = t.getOpacity(), this.originX_ = r[0], this.originY_ = r[1], this.rotateWithView_ = t.getRotateWithView(), this.rotation_ = t.getRotation(), this.scale_ = t.getScaleArray(), this.width_ = s[0], this.declutterMode_ = t.getDeclutterMode(), this.declutterImageWithText_ = e;
  }
}
class Pc extends Qi {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(t, e, i, s) {
    super(t, e, i, s);
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   * @return {number} end.
   */
  drawFlatCoordinates_(t, e, i, s) {
    const r = this.coordinates.length, o = this.appendFlatLineCoordinates(
      t,
      e,
      i,
      s,
      !1,
      !1
    ), a = [
      X.MOVE_TO_LINE_TO,
      r,
      o
    ];
    return this.instructions.push(a), this.hitDetectionInstructions.push(a), i;
  }
  /**
   * @param {import("../../geom/LineString.js").default|import("../Feature.js").default} lineStringGeometry Line string geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   * @override
   */
  drawLineString(t, e, i) {
    const s = this.state, r = s.strokeStyle, o = s.lineWidth;
    if (r === void 0 || o === void 0)
      return;
    this.updateStrokeStyle(s, this.applyStroke), this.beginGeometry(t, e, i), this.hitDetectionInstructions.push(
      [
        X.SET_STROKE_STYLE,
        s.strokeStyle,
        s.lineWidth,
        s.lineCap,
        s.lineJoin,
        s.miterLimit,
        oe,
        ae
      ],
      ke
    );
    const a = t.getFlatCoordinates(), l = t.getStride();
    this.drawFlatCoordinates_(
      a,
      0,
      a.length,
      l
    ), this.hitDetectionInstructions.push(ye), this.endGeometry(e);
  }
  /**
   * @param {import("../../geom/MultiLineString.js").default|import("../Feature.js").default} multiLineStringGeometry MultiLineString geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   * @override
   */
  drawMultiLineString(t, e, i) {
    const s = this.state, r = s.strokeStyle, o = s.lineWidth;
    if (r === void 0 || o === void 0)
      return;
    this.updateStrokeStyle(s, this.applyStroke), this.beginGeometry(t, e, i), this.hitDetectionInstructions.push(
      [
        X.SET_STROKE_STYLE,
        s.strokeStyle,
        s.lineWidth,
        s.lineCap,
        s.lineJoin,
        s.miterLimit,
        oe,
        ae
      ],
      ke
    );
    const a = t.getEnds(), l = t.getFlatCoordinates(), h = t.getStride();
    let c = 0;
    for (let u = 0, d = a.length; u < d; ++u)
      c = this.drawFlatCoordinates_(
        l,
        c,
        /** @type {number} */
        a[u],
        h
      );
    this.hitDetectionInstructions.push(ye), this.endGeometry(e);
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   * @override
   */
  finish() {
    const t = this.state;
    return t.lastStroke != null && t.lastStroke != this.coordinates.length && this.instructions.push(ye), this.reverseHitDetectionInstructions(), this.state = null, super.finish();
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @override
   */
  applyStroke(t) {
    t.lastStroke != null && t.lastStroke != this.coordinates.length && (this.instructions.push(ye), t.lastStroke = this.coordinates.length), t.lastStroke = 0, super.applyStroke(t), this.instructions.push(ke);
  }
}
class lo extends Qi {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(t, e, i, s) {
    super(t, e, i, s);
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @private
   * @return {number} End.
   */
  drawFlatCoordinatess_(t, e, i, s) {
    const r = this.state, o = r.fillStyle !== void 0, a = r.strokeStyle !== void 0, l = i.length;
    this.instructions.push(ke), this.hitDetectionInstructions.push(ke);
    for (let h = 0; h < l; ++h) {
      const c = i[h], u = this.coordinates.length, d = this.appendFlatLineCoordinates(
        t,
        e,
        c,
        s,
        !0,
        !a
      ), g = [
        X.MOVE_TO_LINE_TO,
        u,
        d
      ];
      this.instructions.push(g), this.hitDetectionInstructions.push(g), a && (this.instructions.push(ao), this.hitDetectionInstructions.push(ao)), e = c;
    }
    return o && (this.instructions.push(cn), this.hitDetectionInstructions.push(cn)), a && (this.instructions.push(ye), this.hitDetectionInstructions.push(ye)), e;
  }
  /**
   * @param {import("../../geom/Circle.js").default} circleGeometry Circle geometry.
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {number} [index] Render order index.
   * @override
   */
  drawCircle(t, e, i) {
    const s = this.state, r = s.fillStyle, o = s.strokeStyle;
    if (r === void 0 && o === void 0)
      return;
    this.setFillStrokeStyles_(), this.beginGeometry(t, e, i), s.fillStyle !== void 0 && this.hitDetectionInstructions.push([
      X.SET_FILL_STYLE,
      Rt
    ]), s.strokeStyle !== void 0 && this.hitDetectionInstructions.push([
      X.SET_STROKE_STYLE,
      s.strokeStyle,
      s.lineWidth,
      s.lineCap,
      s.lineJoin,
      s.miterLimit,
      oe,
      ae
    ]);
    const a = t.getFlatCoordinates(), l = t.getStride(), h = this.coordinates.length;
    this.appendFlatLineCoordinates(
      a,
      0,
      a.length,
      l,
      !1,
      !1
    );
    const c = [X.CIRCLE, h];
    this.instructions.push(ke, c), this.hitDetectionInstructions.push(ke, c), s.fillStyle !== void 0 && (this.instructions.push(cn), this.hitDetectionInstructions.push(cn)), s.strokeStyle !== void 0 && (this.instructions.push(ye), this.hitDetectionInstructions.push(ye)), this.endGeometry(e);
  }
  /**
   * @param {import("../../geom/Polygon.js").default|import("../Feature.js").default} polygonGeometry Polygon geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   * @override
   */
  drawPolygon(t, e, i) {
    const s = this.state, r = s.fillStyle, o = s.strokeStyle;
    if (r === void 0 && o === void 0)
      return;
    this.setFillStrokeStyles_(), this.beginGeometry(t, e, i), s.fillStyle !== void 0 && this.hitDetectionInstructions.push([
      X.SET_FILL_STYLE,
      Rt
    ]), s.strokeStyle !== void 0 && this.hitDetectionInstructions.push([
      X.SET_STROKE_STYLE,
      s.strokeStyle,
      s.lineWidth,
      s.lineCap,
      s.lineJoin,
      s.miterLimit,
      oe,
      ae
    ]);
    const a = t.getEnds(), l = t.getOrientedFlatCoordinates(), h = t.getStride();
    this.drawFlatCoordinatess_(
      l,
      0,
      /** @type {Array<number>} */
      a,
      h
    ), this.endGeometry(e);
  }
  /**
   * @param {import("../../geom/MultiPolygon.js").default} multiPolygonGeometry MultiPolygon geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   * @override
   */
  drawMultiPolygon(t, e, i) {
    const s = this.state, r = s.fillStyle, o = s.strokeStyle;
    if (r === void 0 && o === void 0)
      return;
    this.setFillStrokeStyles_(), this.beginGeometry(t, e, i), s.fillStyle !== void 0 && this.hitDetectionInstructions.push([
      X.SET_FILL_STYLE,
      Rt
    ]), s.strokeStyle !== void 0 && this.hitDetectionInstructions.push([
      X.SET_STROKE_STYLE,
      s.strokeStyle,
      s.lineWidth,
      s.lineCap,
      s.lineJoin,
      s.miterLimit,
      oe,
      ae
    ]);
    const a = t.getEndss(), l = t.getOrientedFlatCoordinates(), h = t.getStride();
    let c = 0;
    for (let u = 0, d = a.length; u < d; ++u)
      c = this.drawFlatCoordinatess_(
        l,
        c,
        a[u],
        h
      );
    this.endGeometry(e);
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   * @override
   */
  finish() {
    this.reverseHitDetectionInstructions(), this.state = null;
    const t = this.tolerance;
    if (t !== 0) {
      const e = this.coordinates;
      for (let i = 0, s = e.length; i < s; ++i)
        e[i] = be(e[i], t);
    }
    return super.finish();
  }
  /**
   * @private
   */
  setFillStrokeStyles_() {
    const t = this.state;
    t.fillStyle !== void 0 && this.updateFillStyle(t, this.createFill), t.strokeStyle !== void 0 && this.updateStrokeStyle(t, this.applyStroke);
  }
}
function kc(n, t, e, i, s) {
  const r = [];
  let o = e, a = 0, l = t.slice(e, 2);
  for (; a < n && o + s < i; ) {
    const [h, c] = l.slice(-2), u = t[o + s], d = t[o + s + 1], g = Math.sqrt(
      (u - h) * (u - h) + (d - c) * (d - c)
    );
    if (a += g, a >= n) {
      const f = (n - a + g) / g, _ = Pt(h, u, f), m = Pt(c, d, f);
      l.push(_, m), r.push(l), l = [_, m], a == n && (o += s), a = 0;
    } else if (a < n)
      l.push(
        t[o + s],
        t[o + s + 1]
      ), o += s;
    else {
      const f = g - a, _ = Pt(h, u, f / g), m = Pt(c, d, f / g);
      l.push(_, m), r.push(l), l = [_, m], a = 0, o += s;
    }
  }
  return a > 0 && r.push(l), r;
}
function Gc(n, t, e, i, s) {
  let r = e, o = e, a = 0, l = 0, h = e, c, u, d, g, f, _, m, p, y, R;
  for (u = e; u < i; u += s) {
    const E = t[u], x = t[u + 1];
    f !== void 0 && (y = E - f, R = x - _, g = Math.sqrt(y * y + R * R), m !== void 0 && (l += d, c = Math.acos((m * y + p * R) / (d * g)), c > n && (l > a && (a = l, r = h, o = u), l = 0, h = u - s)), d = g, m = y, p = R), f = E, _ = x;
  }
  return l += g, l > a ? [h, u] : [r, o];
}
const In = {
  left: 0,
  center: 0.5,
  right: 1,
  top: 0,
  middle: 0.5,
  hanging: 0.2,
  alphabetic: 0.8,
  ideographic: 0.8,
  bottom: 1
};
class Nc extends Qi {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(t, e, i, s) {
    super(t, e, i, s), this.labels_ = null, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = void 0, this.textKeepUpright_ = void 0, this.textRotation_ = 0, this.textFillState_ = null, this.fillStates = {}, this.fillStates[Rt] = { fillStyle: Rt }, this.textStrokeState_ = null, this.strokeStates = {}, this.textState_ = /** @type {import("../canvas.js").TextState} */
    {}, this.textStates = {}, this.textKey_ = "", this.fillKey_ = "", this.strokeKey_ = "", this.declutterMode_ = void 0, this.declutterImageWithText_ = void 0;
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   * @override
   */
  finish() {
    const t = super.finish();
    return t.textStates = this.textStates, t.fillStates = this.fillStates, t.strokeStates = this.strokeStates, t;
  }
  /**
   * @param {import("../../geom/SimpleGeometry.js").default|import("../Feature.js").default} geometry Geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   * @override
   */
  drawText(t, e, i) {
    const s = this.textFillState_, r = this.textStrokeState_, o = this.textState_;
    if (this.text_ === "" || !o || !s && !r)
      return;
    const a = this.coordinates;
    let l = a.length;
    const h = t.getType();
    let c = null, u = t.getStride();
    if (o.placement === "line" && (h == "LineString" || h == "MultiLineString" || h == "Polygon" || h == "MultiPolygon")) {
      if (!St(this.maxExtent, t.getExtent()))
        return;
      let d;
      if (c = t.getFlatCoordinates(), h == "LineString")
        d = [c.length];
      else if (h == "MultiLineString")
        d = /** @type {import("../../geom/MultiLineString.js").default} */
        t.getEnds();
      else if (h == "Polygon")
        d = /** @type {import("../../geom/Polygon.js").default} */
        t.getEnds().slice(0, 1);
      else if (h == "MultiPolygon") {
        const m = (
          /** @type {import("../../geom/MultiPolygon.js").default} */
          t.getEndss()
        );
        d = [];
        for (let p = 0, y = m.length; p < y; ++p)
          d.push(m[p][0]);
      }
      this.beginGeometry(t, e, i);
      const g = o.repeat, f = g ? void 0 : o.textAlign;
      let _ = 0;
      for (let m = 0, p = d.length; m < p; ++m) {
        let y;
        g ? y = kc(
          g * this.resolution,
          c,
          _,
          d[m],
          u
        ) : y = [c.slice(_, d[m])];
        for (let R = 0, E = y.length; R < E; ++R) {
          const x = y[R];
          let w = 0, v = x.length;
          if (f == null) {
            const A = Gc(
              o.maxAngle,
              x,
              0,
              x.length,
              2
            );
            w = A[0], v = A[1];
          }
          for (let A = w; A < v; A += u)
            a.push(x[A], x[A + 1]);
          const S = a.length;
          _ = d[m], this.drawChars_(l, S), l = S;
        }
      }
      this.endGeometry(e);
    } else {
      let d = o.overflow ? null : [];
      switch (h) {
        case "Point":
        case "MultiPoint":
          c = /** @type {import("../../geom/MultiPoint.js").default} */
          t.getFlatCoordinates();
          break;
        case "LineString":
          c = /** @type {import("../../geom/LineString.js").default} */
          t.getFlatMidpoint();
          break;
        case "Circle":
          c = /** @type {import("../../geom/Circle.js").default} */
          t.getCenter();
          break;
        case "MultiLineString":
          c = /** @type {import("../../geom/MultiLineString.js").default} */
          t.getFlatMidpoints(), u = 2;
          break;
        case "Polygon":
          c = /** @type {import("../../geom/Polygon.js").default} */
          t.getFlatInteriorPoint(), o.overflow || d.push(c[2] / this.resolution), u = 3;
          break;
        case "MultiPolygon":
          const E = (
            /** @type {import("../../geom/MultiPolygon.js").default} */
            t.getFlatInteriorPoints()
          );
          c = [];
          for (let x = 0, w = E.length; x < w; x += 3)
            o.overflow || d.push(E[x + 2] / this.resolution), c.push(E[x], E[x + 1]);
          if (c.length === 0)
            return;
          u = 2;
          break;
      }
      const g = this.appendFlatPointCoordinates(c, u);
      if (g === l)
        return;
      if (d && (g - l) / 2 !== c.length / u) {
        let E = l / 2;
        d = d.filter((x, w) => {
          const v = a[(E + w) * 2] === c[w * u] && a[(E + w) * 2 + 1] === c[w * u + 1];
          return v || --E, v;
        });
      }
      this.saveTextStates_();
      const f = o.backgroundFill ? this.createFill(this.fillStyleToState(o.backgroundFill)) : null, _ = o.backgroundStroke ? this.createStroke(this.strokeStyleToState(o.backgroundStroke)) : null;
      this.beginGeometry(t, e, i);
      let m = o.padding;
      if (m != De && (o.scale[0] < 0 || o.scale[1] < 0)) {
        let E = o.padding[0], x = o.padding[1], w = o.padding[2], v = o.padding[3];
        o.scale[0] < 0 && (x = -x, v = -v), o.scale[1] < 0 && (E = -E, w = -w), m = [E, x, w, v];
      }
      const p = this.pixelRatio;
      this.instructions.push([
        X.DRAW_IMAGE,
        l,
        g,
        null,
        NaN,
        NaN,
        NaN,
        1,
        0,
        0,
        this.textRotateWithView_,
        this.textRotation_,
        [1, 1],
        NaN,
        this.declutterMode_,
        this.declutterImageWithText_,
        m == De ? De : m.map(function(E) {
          return E * p;
        }),
        f,
        _,
        this.text_,
        this.textKey_,
        this.strokeKey_,
        this.fillKey_,
        this.textOffsetX_,
        this.textOffsetY_,
        d
      ]);
      const y = 1 / p, R = f ? f.slice(0) : null;
      R && (R[1] = Rt), this.hitDetectionInstructions.push([
        X.DRAW_IMAGE,
        l,
        g,
        null,
        NaN,
        NaN,
        NaN,
        1,
        0,
        0,
        this.textRotateWithView_,
        this.textRotation_,
        [y, y],
        NaN,
        this.declutterMode_,
        this.declutterImageWithText_,
        m,
        R,
        _,
        this.text_,
        this.textKey_,
        this.strokeKey_,
        this.fillKey_ ? Rt : this.fillKey_,
        this.textOffsetX_,
        this.textOffsetY_,
        d
      ]), this.endGeometry(e);
    }
  }
  /**
   * @private
   */
  saveTextStates_() {
    const t = this.textStrokeState_, e = this.textState_, i = this.textFillState_, s = this.strokeKey_;
    t && (s in this.strokeStates || (this.strokeStates[s] = {
      strokeStyle: t.strokeStyle,
      lineCap: t.lineCap,
      lineDashOffset: t.lineDashOffset,
      lineWidth: t.lineWidth,
      lineJoin: t.lineJoin,
      miterLimit: t.miterLimit,
      lineDash: t.lineDash
    }));
    const r = this.textKey_;
    r in this.textStates || (this.textStates[r] = {
      font: e.font,
      textAlign: e.textAlign || Yi,
      justify: e.justify,
      textBaseline: e.textBaseline || Rn,
      scale: e.scale
    });
    const o = this.fillKey_;
    i && (o in this.fillStates || (this.fillStates[o] = {
      fillStyle: i.fillStyle
    }));
  }
  /**
   * @private
   * @param {number} begin Begin.
   * @param {number} end End.
   */
  drawChars_(t, e) {
    const i = this.textStrokeState_, s = this.textState_, r = this.strokeKey_, o = this.textKey_, a = this.fillKey_;
    this.saveTextStates_();
    const l = this.pixelRatio, h = In[s.textBaseline], c = this.textOffsetY_ * l, u = this.text_, d = i ? i.lineWidth * Math.abs(s.scale[0]) / 2 : 0;
    this.instructions.push([
      X.DRAW_CHARS,
      t,
      e,
      h,
      s.overflow,
      a,
      s.maxAngle,
      l,
      c,
      r,
      d * l,
      u,
      o,
      1,
      this.declutterMode_,
      this.textKeepUpright_
    ]), this.hitDetectionInstructions.push([
      X.DRAW_CHARS,
      t,
      e,
      h,
      s.overflow,
      a && Rt,
      s.maxAngle,
      l,
      c,
      r,
      d * l,
      u,
      o,
      1 / l,
      this.declutterMode_,
      this.textKeepUpright_
    ]);
  }
  /**
   * @param {import("../../style/Text.js").default} textStyle Text style.
   * @param {Object} [sharedData] Shared data.
   * @override
   */
  setTextStyle(t, e) {
    let i, s, r;
    if (!t)
      this.text_ = "";
    else {
      const o = t.getFill();
      o ? (s = this.textFillState_, s || (s = /** @type {import("../canvas.js").FillState} */
      {}, this.textFillState_ = s), s.fillStyle = Vt(
        o.getColor() || Rt
      )) : (s = null, this.textFillState_ = s);
      const a = t.getStroke();
      if (!a)
        r = null, this.textStrokeState_ = r;
      else {
        r = this.textStrokeState_, r || (r = /** @type {import("../canvas.js").StrokeState} */
        {}, this.textStrokeState_ = r);
        const _ = a.getLineDash(), m = a.getLineDashOffset(), p = a.getWidth(), y = a.getMiterLimit();
        r.lineCap = a.getLineCap() || pi, r.lineDash = _ ? _.slice() : oe, r.lineDashOffset = m === void 0 ? ae : m, r.lineJoin = a.getLineJoin() || yi, r.lineWidth = p === void 0 ? Bi : p, r.miterLimit = y === void 0 ? Wi : y, r.strokeStyle = Vt(
          a.getColor() || Ui
        );
      }
      i = this.textState_;
      const l = t.getFont() || ca;
      Yh(l);
      const h = t.getScaleArray();
      i.overflow = t.getOverflow(), i.font = l, i.maxAngle = t.getMaxAngle(), i.placement = t.getPlacement(), i.textAlign = t.getTextAlign(), i.repeat = t.getRepeat(), i.justify = t.getJustify(), i.textBaseline = t.getTextBaseline() || Rn, i.backgroundFill = t.getBackgroundFill(), i.backgroundStroke = t.getBackgroundStroke(), i.padding = t.getPadding() || De, i.scale = h === void 0 ? [1, 1] : h;
      const c = t.getOffsetX(), u = t.getOffsetY(), d = t.getRotateWithView(), g = t.getKeepUpright(), f = t.getRotation();
      this.text_ = t.getText() || "", this.textOffsetX_ = c === void 0 ? 0 : c, this.textOffsetY_ = u === void 0 ? 0 : u, this.textRotateWithView_ = d === void 0 ? !1 : d, this.textKeepUpright_ = g === void 0 ? !0 : g, this.textRotation_ = f === void 0 ? 0 : f, this.strokeKey_ = r ? (typeof r.strokeStyle == "string" ? r.strokeStyle : H(r.strokeStyle)) + r.lineCap + r.lineDashOffset + "|" + r.lineWidth + r.lineJoin + r.miterLimit + "[" + r.lineDash.join() + "]" : "", this.textKey_ = i.font + i.scale + (i.textAlign || "?") + (i.repeat || "?") + (i.justify || "?") + (i.textBaseline || "?"), this.fillKey_ = s && s.fillStyle ? typeof s.fillStyle == "string" ? s.fillStyle : "|" + H(s.fillStyle) : "";
    }
    this.declutterMode_ = t.getDeclutterMode(), this.declutterImageWithText_ = e;
  }
}
const Xc = {
  Circle: lo,
  Default: Qi,
  Image: Oc,
  LineString: Pc,
  Polygon: lo,
  Text: Nc
};
class zc {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Max extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(t, e, i, s) {
    this.tolerance_ = t, this.maxExtent_ = e, this.pixelRatio_ = s, this.resolution_ = i, this.buildersByZIndex_ = {};
  }
  /**
   * @return {!Object<string, !Object<import("../canvas.js").BuilderType, import("./Builder.js").SerializableInstructions>>} The serializable instructions
   */
  finish() {
    const t = {};
    for (const e in this.buildersByZIndex_) {
      t[e] = t[e] || {};
      const i = this.buildersByZIndex_[e];
      for (const s in i) {
        const r = i[s].finish();
        t[e][s] = r;
      }
    }
    return t;
  }
  /**
   * @param {number|undefined} zIndex Z index.
   * @param {import("../canvas.js").BuilderType} builderType Replay type.
   * @return {import("../VectorContext.js").default} Replay.
   */
  getBuilder(t, e) {
    const i = t !== void 0 ? t.toString() : "0";
    let s = this.buildersByZIndex_[i];
    s === void 0 && (s = {}, this.buildersByZIndex_[i] = s);
    let r = s[e];
    if (r === void 0) {
      const o = Xc[e];
      r = new o(
        this.tolerance_,
        this.maxExtent_,
        this.resolution_,
        this.pixelRatio_
      ), s[e] = r;
    }
    return r;
  }
}
function Wc(n, t, e, i, s, r, o, a, l, h, c, u, d = !0) {
  let g = n[t], f = n[t + 1], _ = 0, m = 0, p = 0, y = 0;
  function R() {
    _ = g, m = f, t += i, g = n[t], f = n[t + 1], y += p, p = Math.sqrt((g - _) * (g - _) + (f - m) * (f - m));
  }
  do
    R();
  while (t < e - i && y + p < r);
  let E = p === 0 ? 0 : (r - y) / p;
  const x = Pt(_, g, E), w = Pt(m, f, E), v = t - i, S = y, A = r + a * l(h, s, c);
  for (; t < e - i && y + p < A; )
    R();
  E = p === 0 ? 0 : (A - y) / p;
  const I = Pt(_, g, E), P = Pt(m, f, E);
  let L = !1;
  if (d)
    if (u) {
      const D = [x, w, I, P];
      na(D, 0, 4, 2, u, D, D), L = D[0] > D[2];
    } else
      L = x > I;
  const F = Math.PI, M = [], G = v + i === t;
  t = v, p = 0, y = S, g = n[t], f = n[t + 1];
  let b;
  if (G) {
    R(), b = Math.atan2(f - m, g - _), L && (b += b > 0 ? -F : F);
    const D = (I + x) / 2, z = (P + w) / 2;
    return M[0] = [D, z, (A - r) / 2, b, s], M;
  }
  s = s.replace(/\n/g, " ");
  for (let D = 0, z = s.length; D < z; ) {
    R();
    let N = Math.atan2(f - m, g - _);
    if (L && (N += N > 0 ? -F : F), b !== void 0) {
      let V = N - b;
      if (V += V > F ? -2 * F : V < -F ? 2 * F : 0, Math.abs(V) > o)
        return null;
    }
    b = N;
    const k = D;
    let W = 0;
    for (; D < z; ++D) {
      const V = L ? z - D - 1 : D, it = a * l(h, s[V], c);
      if (t + i < e && y + p < r + W + it / 2)
        break;
      W += it;
    }
    if (D === k)
      continue;
    const C = L ? s.substring(z - k, z - D) : s.substring(k, D);
    E = p === 0 ? 0 : (r + W / 2 - y) / p;
    const Z = Pt(_, g, E), tt = Pt(m, f, E);
    M.push([Z, tt, W / 2, N, C]), r += W;
  }
  return M;
}
class Aa {
  constructor() {
    /**
     * @private
     * @param {...*} args Args.
     * @return {ZIndexContext} This.
     */
    xr(this, "pushMethodArgs_", (...t) => (this.instructions_[this.zIndex + this.offset_].push(t), this));
    this.instructions_ = [], this.zIndex = 0, this.offset_ = 0, this.context_ = /** @type {ZIndexContextProxy} */
    new Proxy(xn(), {
      get: (t, e) => {
        if (typeof /** @type {*} */
        xn()[e] == "function")
          return this.instructions_[this.zIndex + this.offset_] || (this.instructions_[this.zIndex + this.offset_] = []), this.instructions_[this.zIndex + this.offset_].push(e), this.pushMethodArgs_;
      },
      set: (t, e, i) => (this.instructions_[this.zIndex + this.offset_] || (this.instructions_[this.zIndex + this.offset_] = []), this.instructions_[this.zIndex + this.offset_].push(e, i), !0)
    });
  }
  /**
   * Push a function that renders to the context directly.
   * @param {function(CanvasRenderingContext2D): void} render Function.
   */
  pushFunction(t) {
    this.instructions_[this.zIndex + this.offset_].push(t);
  }
  /**
   * Get a proxy for CanvasRenderingContext2D which does not support getting state
   * (e.g. `context.globalAlpha`, which will return `undefined`). To set state, if it relies on a
   * previous state (e.g. `context.globalAlpha = context.globalAlpha / 2`), set a function,
   * e.g. `context.globalAlpha = (context) => context.globalAlpha / 2`.
   * @return {ZIndexContextProxy} Context.
   */
  getContext() {
    return this.context_;
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   */
  draw(t) {
    this.instructions_.forEach((e) => {
      for (let i = 0, s = e.length; i < s; ++i) {
        const r = e[i];
        if (typeof r == "function") {
          r(t);
          continue;
        }
        const o = e[++i];
        if (typeof /** @type {*} */
        t[r] == "function")
          t[r](...o);
        else {
          if (typeof o == "function") {
            t[r] = o(t);
            continue;
          }
          t[r] = o;
        }
      }
    });
  }
  clear() {
    this.instructions_.length = 0, this.zIndex = 0, this.offset_ = 0;
  }
  /**
   * Offsets the zIndex by the highest current zIndex. Useful for rendering multiple worlds or tiles, to
   * avoid conflicting context.clip() or context.save()/restore() calls.
   */
  offset() {
    this.offset_ = this.instructions_.length, this.zIndex = 0;
  }
}
const Ke = At(), fe = [], te = [], ee = [], ge = [];
function ho(n) {
  return n[3].declutterBox;
}
const co = new RegExp(
  /* eslint-disable prettier/prettier */
  "[֑-ࣿיִ-﷿ﹰ-ﻼࠀ-࿿-]"
  /* eslint-enable prettier/prettier */
);
function rs(n, t) {
  return t === "start" ? t = co.test(n) ? "right" : "left" : t === "end" && (t = co.test(n) ? "left" : "right"), In[t];
}
function Uc(n, t, e) {
  return e > 0 && n.push(`
`, ""), n.push(t, ""), n;
}
class Yc {
  /**
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {boolean} overlaps The replay can have overlapping geometries.
   * @param {import("../canvas.js").SerializableInstructions} instructions The serializable instructions.
   * @param {boolean} [deferredRendering] Enable deferred rendering.
   */
  constructor(t, e, i, s, r) {
    this.overlaps = i, this.pixelRatio = e, this.resolution = t, this.alignAndScaleFill_, this.instructions = s.instructions, this.coordinates = s.coordinates, this.coordinateCache_ = {}, this.renderedTransform_ = re(), this.hitDetectionInstructions = s.hitDetectionInstructions, this.pixelCoordinates_ = null, this.viewRotation_ = 0, this.fillStates = s.fillStates || {}, this.strokeStates = s.strokeStates || {}, this.textStates = s.textStates || {}, this.widths_ = {}, this.labels_ = {}, this.zIndexContext_ = r ? new Aa() : null;
  }
  /**
   * @return {ZIndexContext} ZIndex context.
   */
  getZIndexContext() {
    return this.zIndexContext_;
  }
  /**
   * @param {string|Array<string>} text Text.
   * @param {string} textKey Text style key.
   * @param {string} fillKey Fill style key.
   * @param {string} strokeKey Stroke style key.
   * @return {import("../canvas.js").Label} Label.
   */
  createLabel(t, e, i, s) {
    const r = t + e + i + s;
    if (this.labels_[r])
      return this.labels_[r];
    const o = s ? this.strokeStates[s] : null, a = i ? this.fillStates[i] : null, l = this.textStates[e], h = this.pixelRatio, c = [
      l.scale[0] * h,
      l.scale[1] * h
    ], u = l.justify ? In[l.justify] : rs(
      Array.isArray(t) ? t[0] : t,
      l.textAlign || Yi
    ), d = s && o.lineWidth ? o.lineWidth : 0, g = Array.isArray(t) ? t : String(t).split(`
`).reduce(Uc, []), { width: f, height: _, widths: m, heights: p, lineWidths: y } = jh(
      l,
      g
    ), R = f + d, E = [], x = (R + 2) * c[0], w = (_ + d) * c[1], v = {
      width: x < 0 ? Math.floor(x) : Math.ceil(x),
      height: w < 0 ? Math.floor(w) : Math.ceil(w),
      contextInstructions: E
    };
    (c[0] != 1 || c[1] != 1) && E.push("scale", c), s && (E.push("strokeStyle", o.strokeStyle), E.push("lineWidth", d), E.push("lineCap", o.lineCap), E.push("lineJoin", o.lineJoin), E.push("miterLimit", o.miterLimit), E.push("setLineDash", [o.lineDash]), E.push("lineDashOffset", o.lineDashOffset)), i && E.push("fillStyle", a.fillStyle), E.push("textBaseline", "middle"), E.push("textAlign", "center");
    const S = 0.5 - u;
    let A = u * R + S * d;
    const I = [], P = [];
    let L = 0, F = 0, M = 0, G = 0, b;
    for (let D = 0, z = g.length; D < z; D += 2) {
      const N = g[D];
      if (N === `
`) {
        F += L, L = 0, A = u * R + S * d, ++G;
        continue;
      }
      const k = g[D + 1] || l.font;
      k !== b && (s && I.push("font", k), i && P.push("font", k), b = k), L = Math.max(L, p[M]);
      const W = [
        N,
        A + S * m[M] + u * (m[M] - y[G]),
        0.5 * (d + L) + F
      ];
      A += m[M], s && I.push("strokeText", W), i && P.push("fillText", W), ++M;
    }
    return Array.prototype.push.apply(E, I), Array.prototype.push.apply(E, P), this.labels_[r] = v, v;
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../coordinate.js").Coordinate} p1 1st point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p2 2nd point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p3 3rd point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p4 4th point of the background box.
   * @param {Array<*>} fillInstruction Fill instruction.
   * @param {Array<*>} strokeInstruction Stroke instruction.
   */
  replayTextBackground_(t, e, i, s, r, o, a) {
    t.beginPath(), t.moveTo.apply(t, e), t.lineTo.apply(t, i), t.lineTo.apply(t, s), t.lineTo.apply(t, r), t.lineTo.apply(t, e), o && (this.alignAndScaleFill_ = /** @type {number} */
    o[2], t.fillStyle = /** @type {string} */
    o[1], this.fill_(t)), a && (this.setStrokeStyle_(
      t,
      /** @type {Array<*>} */
      a
    ), t.stroke());
  }
  /**
   * @private
   * @param {number} sheetWidth Width of the sprite sheet.
   * @param {number} sheetHeight Height of the sprite sheet.
   * @param {number} centerX X.
   * @param {number} centerY Y.
   * @param {number} width Width.
   * @param {number} height Height.
   * @param {number} anchorX Anchor X.
   * @param {number} anchorY Anchor Y.
   * @param {number} originX Origin X.
   * @param {number} originY Origin Y.
   * @param {number} rotation Rotation.
   * @param {import("../../size.js").Size} scale Scale.
   * @param {boolean} snapToPixel Snap to pixel.
   * @param {Array<number>} padding Padding.
   * @param {boolean} fillStroke Background fill or stroke.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @return {ImageOrLabelDimensions} Dimensions for positioning and decluttering the image or label.
   */
  calculateImageOrLabelDimensions_(t, e, i, s, r, o, a, l, h, c, u, d, g, f, _, m) {
    a *= d[0], l *= d[1];
    let p = i - a, y = s - l;
    const R = r + h > t ? t - h : r, E = o + c > e ? e - c : o, x = f[3] + R * d[0] + f[1], w = f[0] + E * d[1] + f[2], v = p - f[3], S = y - f[0];
    (_ || u !== 0) && (fe[0] = v, ge[0] = v, fe[1] = S, te[1] = S, te[0] = v + x, ee[0] = te[0], ee[1] = S + w, ge[1] = ee[1]);
    let A;
    return u !== 0 ? (A = Se(
      re(),
      i,
      s,
      1,
      1,
      u,
      -i,
      -s
    ), _t(A, fe), _t(A, te), _t(A, ee), _t(A, ge), Te(
      Math.min(fe[0], te[0], ee[0], ge[0]),
      Math.min(fe[1], te[1], ee[1], ge[1]),
      Math.max(fe[0], te[0], ee[0], ge[0]),
      Math.max(fe[1], te[1], ee[1], ge[1]),
      Ke
    )) : Te(
      Math.min(v, v + x),
      Math.min(S, S + w),
      Math.max(v, v + x),
      Math.max(S, S + w),
      Ke
    ), g && (p = Math.round(p), y = Math.round(y)), {
      drawImageX: p,
      drawImageY: y,
      drawImageW: R,
      drawImageH: E,
      originX: h,
      originY: c,
      declutterBox: {
        minX: Ke[0],
        minY: Ke[1],
        maxX: Ke[2],
        maxY: Ke[3],
        value: m
      },
      canvasTransform: A,
      scale: d
    };
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import('../../size.js').Size} scaledCanvasSize Scaled canvas size.
   * @param {import("../canvas.js").Label|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} imageOrLabel Image.
   * @param {ImageOrLabelDimensions} dimensions Dimensions.
   * @param {number} opacity Opacity.
   * @param {Array<*>} fillInstruction Fill instruction.
   * @param {Array<*>} strokeInstruction Stroke instruction.
   * @return {boolean} The image or label was rendered.
   */
  replayImageOrLabel_(t, e, i, s, r, o, a) {
    const l = !!(o || a), h = s.declutterBox, c = a ? a[2] * s.scale[0] / 2 : 0;
    return h.minX - c <= e[0] && h.maxX + c >= 0 && h.minY - c <= e[1] && h.maxY + c >= 0 && (l && this.replayTextBackground_(
      t,
      fe,
      te,
      ee,
      ge,
      /** @type {Array<*>} */
      o,
      /** @type {Array<*>} */
      a
    ), Zh(
      t,
      s.canvasTransform,
      r,
      i,
      s.originX,
      s.originY,
      s.drawImageW,
      s.drawImageH,
      s.drawImageX,
      s.drawImageY,
      s.scale
    )), !0;
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   */
  fill_(t) {
    const e = this.alignAndScaleFill_;
    if (e) {
      const i = _t(this.renderedTransform_, [0, 0]), s = 512 * this.pixelRatio;
      t.save(), t.translate(i[0] % s, i[1] % s), e !== 1 && t.scale(e, e), t.rotate(this.viewRotation_);
    }
    t.fill(), e && t.restore();
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {Array<*>} instruction Instruction.
   */
  setStrokeStyle_(t, e) {
    t.strokeStyle = /** @type {import("../../colorlike.js").ColorLike} */
    e[1], t.lineWidth = /** @type {number} */
    e[2], t.lineCap = /** @type {CanvasLineCap} */
    e[3], t.lineJoin = /** @type {CanvasLineJoin} */
    e[4], t.miterLimit = /** @type {number} */
    e[5], t.lineDashOffset = /** @type {number} */
    e[7], t.setLineDash(
      /** @type {Array<number>} */
      e[6]
    );
  }
  /**
   * @private
   * @param {string|Array<string>} text The text to draw.
   * @param {string} textKey The key of the text state.
   * @param {string} strokeKey The key for the stroke state.
   * @param {string} fillKey The key for the fill state.
   * @return {{label: import("../canvas.js").Label, anchorX: number, anchorY: number}} The text image and its anchor.
   */
  drawLabelWithPointPlacement_(t, e, i, s) {
    const r = this.textStates[e], o = this.createLabel(t, e, s, i), a = this.strokeStates[i], l = this.pixelRatio, h = rs(
      Array.isArray(t) ? t[0] : t,
      r.textAlign || Yi
    ), c = In[r.textBaseline || Rn], u = a && a.lineWidth ? a.lineWidth : 0, d = o.width / l - 2 * r.scale[0], g = h * d + 2 * (0.5 - h) * u, f = c * o.height / l + 2 * (0.5 - c) * u;
    return {
      label: o,
      anchorX: g,
      anchorY: f
    };
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import('../../size.js').Size} scaledCanvasSize Scaled canvas size
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {Array<*>} instructions Instructions array.
   * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
   * @param {FeatureCallback<T>} [featureCallback] Feature callback.
   * @param {import("../../extent.js").Extent} [hitExtent] Only check
   *     features that intersect this extent.
   * @param {import("rbush").default<DeclutterEntry>} [declutterTree] Declutter tree.
   * @return {T|undefined} Callback result.
   * @template T
   */
  execute_(t, e, i, s, r, o, a, l) {
    const h = this.zIndexContext_;
    let c;
    this.pixelCoordinates_ && Ei(i, this.renderedTransform_) ? c = this.pixelCoordinates_ : (this.pixelCoordinates_ || (this.pixelCoordinates_ = []), c = xe(
      this.coordinates,
      0,
      this.coordinates.length,
      2,
      i,
      this.pixelCoordinates_
    ), yh(this.renderedTransform_, i));
    let u = 0;
    const d = s.length;
    let g = 0, f, _, m, p, y, R, E, x, w, v, S, A, I, P = 0, L = 0;
    const F = this.coordinateCache_, M = this.viewRotation_, G = Math.round(Math.atan2(-i[1], i[0]) * 1e12) / 1e12, b = (
      /** @type {import("../../render.js").State} */
      {
        context: t,
        pixelRatio: this.pixelRatio,
        resolution: this.resolution,
        rotation: M
      }
    ), D = this.instructions != s || this.overlaps ? 0 : 200;
    let z, N, k, W;
    for (; u < d; ) {
      const C = s[u];
      switch (
        /** @type {import("./Instruction.js").default} */
        C[0]
      ) {
        case X.BEGIN_GEOMETRY:
          z = /** @type {import("../../Feature.js").FeatureLike} */
          C[1], W = C[3], z.getGeometry() ? a !== void 0 && !St(a, W.getExtent()) ? u = /** @type {number} */
          C[2] + 1 : ++u : u = /** @type {number} */
          C[2], h && (h.zIndex = C[4]);
          break;
        case X.BEGIN_PATH:
          P > D && (this.fill_(t), P = 0), L > D && (t.stroke(), L = 0), !P && !L && (t.beginPath(), y = NaN, R = NaN), ++u;
          break;
        case X.CIRCLE:
          g = /** @type {number} */
          C[1];
          const tt = c[g], V = c[g + 1], it = c[g + 2], ot = c[g + 3], yt = it - tt, $t = ot - V, ht = Math.sqrt(yt * yt + $t * $t);
          t.moveTo(tt + ht, V), t.arc(tt, V, ht, 0, 2 * Math.PI, !0), ++u;
          break;
        case X.CLOSE_PATH:
          t.closePath(), ++u;
          break;
        case X.CUSTOM:
          g = /** @type {number} */
          C[1], f = C[2];
          const ze = (
            /** @type {import("../../geom/SimpleGeometry.js").default} */
            C[3]
          ), We = C[4], Ue = C[5];
          b.geometry = ze, b.feature = z, u in F || (F[u] = []);
          const Ut = F[u];
          Ue ? Ue(c, g, f, 2, Ut) : (Ut[0] = c[g], Ut[1] = c[g + 1], Ut.length = 2), h && (h.zIndex = C[6]), We(Ut, b), ++u;
          break;
        case X.DRAW_IMAGE:
          g = /** @type {number} */
          C[1], f = /** @type {number} */
          C[2], w = /** @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} */
          C[3], _ = /** @type {number} */
          C[4], m = /** @type {number} */
          C[5];
          let Ce = (
            /** @type {number} */
            C[6]
          );
          const Mt = (
            /** @type {number} */
            C[7]
          ), Yt = (
            /** @type {number} */
            C[8]
          ), Ye = (
            /** @type {number} */
            C[9]
          ), Ae = (
            /** @type {boolean} */
            C[10]
          );
          let Be = (
            /** @type {number} */
            C[11]
          );
          const Ri = (
            /** @type {import("../../size.js").Size} */
            C[12]
          );
          let qt = (
            /** @type {number} */
            C[13]
          );
          p = C[14] || "declutter";
          const ve = (
            /** @type {{args: import("../canvas.js").DeclutterImageWithText, declutterMode: import('../../style/Style.js').DeclutterMode}} */
            C[15]
          );
          if (!w && C.length >= 20) {
            v = /** @type {string} */
            C[19], S = /** @type {string} */
            C[20], A = /** @type {string} */
            C[21], I = /** @type {string} */
            C[22];
            const Lt = this.drawLabelWithPointPlacement_(
              v,
              S,
              A,
              I
            );
            w = Lt.label, C[3] = w;
            const Me = (
              /** @type {number} */
              C[23]
            );
            _ = (Lt.anchorX - Me) * this.pixelRatio, C[4] = _;
            const bt = (
              /** @type {number} */
              C[24]
            );
            m = (Lt.anchorY - bt) * this.pixelRatio, C[5] = m, Ce = w.height, C[6] = Ce, qt = w.width, C[13] = qt;
          }
          let gt;
          C.length > 25 && (gt = /** @type {number} */
          C[25]);
          let Zn, en, nn;
          C.length > 17 ? (Zn = /** @type {Array<number>} */
          C[16], en = /** @type {Array<*>} */
          C[17], nn = /** @type {Array<*>} */
          C[18]) : (Zn = De, en = null, nn = null), Ae && G ? Be += M : !Ae && !G && (Be -= M);
          let el = 0;
          for (; g < f; g += 2) {
            if (gt && gt[el++] < qt / this.pixelRatio)
              continue;
            const Lt = this.calculateImageOrLabelDimensions_(
              w.width,
              w.height,
              c[g],
              c[g + 1],
              qt,
              Ce,
              _,
              m,
              Yt,
              Ye,
              Be,
              Ri,
              r,
              Zn,
              !!en || !!nn,
              z
            ), Me = [
              t,
              e,
              w,
              Lt,
              Mt,
              en,
              nn
            ];
            if (l) {
              let bt, Bt, Ft;
              if (ve) {
                const nt = f - g;
                if (!ve[nt]) {
                  ve[nt] = { args: Me, declutterMode: p };
                  continue;
                }
                const Et = ve[nt];
                bt = Et.args, Bt = Et.declutterMode, delete ve[nt], Ft = ho(bt);
              }
              let Ht, Jt;
              if (bt && (Bt !== "declutter" || !l.collides(Ft)) && (Ht = !0), (p !== "declutter" || !l.collides(Lt.declutterBox)) && (Jt = !0), Bt === "declutter" && p === "declutter") {
                const nt = Ht && Jt;
                Ht = nt, Jt = nt;
              }
              Ht && (Bt !== "none" && l.insert(Ft), this.replayImageOrLabel_.apply(this, bt)), Jt && (p !== "none" && l.insert(Lt.declutterBox), this.replayImageOrLabel_.apply(this, Me));
            } else
              this.replayImageOrLabel_.apply(this, Me);
          }
          ++u;
          break;
        case X.DRAW_CHARS:
          const fr = (
            /** @type {number} */
            C[1]
          ), gr = (
            /** @type {number} */
            C[2]
          ), Kn = (
            /** @type {number} */
            C[3]
          ), il = (
            /** @type {number} */
            C[4]
          );
          I = /** @type {string} */
          C[5];
          const nl = (
            /** @type {number} */
            C[6]
          ), _r = (
            /** @type {number} */
            C[7]
          ), mr = (
            /** @type {number} */
            C[8]
          );
          A = /** @type {string} */
          C[9];
          const Vn = (
            /** @type {number} */
            C[10]
          );
          v = /** @type {string} */
          C[11], S = /** @type {string} */
          C[12];
          const pr = [
            /** @type {number} */
            C[13],
            /** @type {number} */
            C[13]
          ];
          p = C[14] || "declutter";
          const sl = (
            /** @type {boolean} */
            C[15]
          ), $n = this.textStates[S], Ti = $n.font, Si = [
            $n.scale[0] * _r,
            $n.scale[1] * _r
          ];
          let wi;
          Ti in this.widths_ ? wi = this.widths_[Ti] : (wi = {}, this.widths_[Ti] = wi);
          const yr = nc(c, fr, gr, 2), Er = Math.abs(Si[0]) * jr(Ti, v, wi);
          if (il || Er <= yr) {
            const Lt = this.textStates[S].textAlign, Me = (yr - Er) * rs(v, Lt), bt = Wc(
              c,
              fr,
              gr,
              2,
              v,
              Me,
              nl,
              Math.abs(Si[0]),
              jr,
              Ti,
              wi,
              G ? 0 : this.viewRotation_,
              sl
            );
            t: if (bt) {
              const Bt = [];
              let Ft, Ht, Jt, nt, Et;
              if (A)
                for (Ft = 0, Ht = bt.length; Ft < Ht; ++Ft) {
                  Et = bt[Ft], Jt = /** @type {string} */
                  Et[4], nt = this.createLabel(Jt, S, "", A), _ = /** @type {number} */
                  Et[2] + (Si[0] < 0 ? -Vn : Vn), m = Kn * nt.height + (0.5 - Kn) * 2 * Vn * Si[1] / Si[0] - mr;
                  const Qt = this.calculateImageOrLabelDimensions_(
                    nt.width,
                    nt.height,
                    Et[0],
                    Et[1],
                    nt.width,
                    nt.height,
                    _,
                    m,
                    0,
                    0,
                    Et[3],
                    pr,
                    !1,
                    De,
                    !1,
                    z
                  );
                  if (l && p === "declutter" && l.collides(Qt.declutterBox))
                    break t;
                  Bt.push([
                    t,
                    e,
                    nt,
                    Qt,
                    1,
                    null,
                    null
                  ]);
                }
              if (I)
                for (Ft = 0, Ht = bt.length; Ft < Ht; ++Ft) {
                  Et = bt[Ft], Jt = /** @type {string} */
                  Et[4], nt = this.createLabel(Jt, S, I, ""), _ = /** @type {number} */
                  Et[2], m = Kn * nt.height - mr;
                  const Qt = this.calculateImageOrLabelDimensions_(
                    nt.width,
                    nt.height,
                    Et[0],
                    Et[1],
                    nt.width,
                    nt.height,
                    _,
                    m,
                    0,
                    0,
                    Et[3],
                    pr,
                    !1,
                    De,
                    !1,
                    z
                  );
                  if (l && p === "declutter" && l.collides(Qt.declutterBox))
                    break t;
                  Bt.push([
                    t,
                    e,
                    nt,
                    Qt,
                    1,
                    null,
                    null
                  ]);
                }
              l && p !== "none" && l.load(Bt.map(ho));
              for (let Qt = 0, rl = Bt.length; Qt < rl; ++Qt)
                this.replayImageOrLabel_.apply(this, Bt[Qt]);
            }
          }
          ++u;
          break;
        case X.END_GEOMETRY:
          if (o !== void 0) {
            z = /** @type {import("../../Feature.js").FeatureLike} */
            C[1];
            const Lt = o(
              z,
              W,
              p
            );
            if (Lt)
              return Lt;
          }
          ++u;
          break;
        case X.FILL:
          D ? P++ : this.fill_(t), ++u;
          break;
        case X.MOVE_TO_LINE_TO:
          for (g = /** @type {number} */
          C[1], f = /** @type {number} */
          C[2], N = c[g], k = c[g + 1], t.moveTo(N, k), y = N + 0.5 | 0, R = k + 0.5 | 0, g += 2; g < f; g += 2)
            N = c[g], k = c[g + 1], E = N + 0.5 | 0, x = k + 0.5 | 0, (g == f - 2 || E !== y || x !== R) && (t.lineTo(N, k), y = E, R = x);
          ++u;
          break;
        case X.SET_FILL_STYLE:
          this.alignAndScaleFill_ = C[2], P && (this.fill_(t), P = 0, L && (t.stroke(), L = 0)), t.fillStyle = C[1], ++u;
          break;
        case X.SET_STROKE_STYLE:
          L && (t.stroke(), L = 0), this.setStrokeStyle_(
            t,
            /** @type {Array<*>} */
            C
          ), ++u;
          break;
        case X.STROKE:
          D ? L++ : t.stroke(), ++u;
          break;
        default:
          ++u;
          break;
      }
    }
    P && this.fill_(t), L && t.stroke();
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import('../../size.js').Size} scaledCanvasSize Scaled canvas size.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
   * @param {import("rbush").default<DeclutterEntry>} [declutterTree] Declutter tree.
   */
  execute(t, e, i, s, r, o) {
    this.viewRotation_ = s, this.execute_(
      t,
      e,
      i,
      this.instructions,
      r,
      void 0,
      void 0,
      o
    );
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {FeatureCallback<T>} [featureCallback] Feature callback.
   * @param {import("../../extent.js").Extent} [hitExtent] Only check
   *     features that intersect this extent.
   * @return {T|undefined} Callback result.
   * @template T
   */
  executeHitDetection(t, e, i, s, r) {
    return this.viewRotation_ = i, this.execute_(
      t,
      [t.canvas.width, t.canvas.height],
      e,
      this.hitDetectionInstructions,
      !0,
      s,
      r
    );
  }
}
const si = [
  "Polygon",
  "Circle",
  "LineString",
  "Image",
  "Text",
  "Default"
], va = ["Image", "Text"], Bc = si.filter(
  (n) => !va.includes(n)
);
class jc {
  /**
   * @param {import("../../extent.js").Extent} maxExtent Max extent for clipping. When a
   * `maxExtent` was set on the Builder for this executor group, the same `maxExtent`
   * should be set here, unless the target context does not exceed that extent (which
   * can be the case when rendering to tiles).
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {boolean} overlaps The executor group can have overlapping geometries.
   * @param {!Object<string, !Object<import("../canvas.js").BuilderType, import("../canvas.js").SerializableInstructions>>} allInstructions
   * The serializable instructions.
   * @param {number} [renderBuffer] Optional rendering buffer.
   * @param {boolean} [deferredRendering] Enable deferred rendering with renderDeferred().
   */
  constructor(t, e, i, s, r, o, a) {
    this.maxExtent_ = t, this.overlaps_ = s, this.pixelRatio_ = i, this.resolution_ = e, this.renderBuffer_ = o, this.executorsByZIndex_ = {}, this.hitDetectionContext_ = null, this.hitDetectionTransform_ = re(), this.renderedContext_ = null, this.deferredZIndexContexts_ = {}, this.createExecutors_(r, a);
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../transform.js").Transform} transform Transform.
   */
  clip(t, e) {
    const i = this.getClipCoords(e);
    t.beginPath(), t.moveTo(i[0], i[1]), t.lineTo(i[2], i[3]), t.lineTo(i[4], i[5]), t.lineTo(i[6], i[7]), t.clip();
  }
  /**
   * Create executors and populate them using the provided instructions.
   * @private
   * @param {!Object<string, !Object<string, import("../canvas.js").SerializableInstructions>>} allInstructions The serializable instructions
   * @param {boolean} deferredRendering Enable deferred rendering.
   */
  createExecutors_(t, e) {
    for (const i in t) {
      let s = this.executorsByZIndex_[i];
      s === void 0 && (s = {}, this.executorsByZIndex_[i] = s);
      const r = t[i];
      for (const o in r) {
        const a = r[o];
        s[o] = new Yc(
          this.resolution_,
          this.pixelRatio_,
          this.overlaps_,
          a,
          e
        );
      }
    }
  }
  /**
   * @param {Array<import("../canvas.js").BuilderType>} executors Executors.
   * @return {boolean} Has executors of the provided types.
   */
  hasExecutors(t) {
    for (const e in this.executorsByZIndex_) {
      const i = this.executorsByZIndex_[e];
      for (let s = 0, r = t.length; s < r; ++s)
        if (t[s] in i)
          return !0;
    }
    return !1;
  }
  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {function(import("../../Feature.js").FeatureLike, import("../../geom/SimpleGeometry.js").default, number): T} callback Feature callback.
   * @param {Array<import("../../Feature.js").FeatureLike>} declutteredFeatures Decluttered features.
   * @return {T|undefined} Callback result.
   * @template T
   */
  forEachFeatureAtCoordinate(t, e, i, s, r, o) {
    s = Math.round(s);
    const a = s * 2 + 1, l = Se(
      this.hitDetectionTransform_,
      s + 0.5,
      s + 0.5,
      1 / e,
      -1 / e,
      -i,
      -t[0],
      -t[1]
    ), h = !this.hitDetectionContext_;
    h && (this.hitDetectionContext_ = rt(
      a,
      a,
      void 0,
      { willReadFrequently: !0 }
    ));
    const c = this.hitDetectionContext_;
    c.canvas.width !== a || c.canvas.height !== a ? (c.canvas.width = a, c.canvas.height = a) : h || c.clearRect(0, 0, a, a);
    let u;
    this.renderBuffer_ !== void 0 && (u = At(), ki(u, t), Gi(
      u,
      e * (this.renderBuffer_ + s),
      u
    ));
    const d = Zc(s);
    let g;
    function f(x, w, v) {
      const S = c.getImageData(
        0,
        0,
        a,
        a
      ).data;
      for (let A = 0, I = d.length; A < I; A++)
        if (S[d[A]] > 0) {
          if (!o || v === "none" || g !== "Image" && g !== "Text" || o.includes(x)) {
            const P = (d[A] - 3) / 4, L = s - P % a, F = s - (P / a | 0), M = r(x, w, L * L + F * F);
            if (M)
              return M;
          }
          c.clearRect(0, 0, a, a);
          break;
        }
    }
    const _ = Object.keys(this.executorsByZIndex_).map(Number);
    _.sort(ne);
    let m, p, y, R, E;
    for (m = _.length - 1; m >= 0; --m) {
      const x = _[m].toString();
      for (y = this.executorsByZIndex_[x], p = si.length - 1; p >= 0; --p)
        if (g = si[p], R = y[g], R !== void 0 && (E = R.executeHitDetection(
          c,
          l,
          i,
          f,
          u
        ), E))
          return E;
    }
  }
  /**
   * @param {import("../../transform.js").Transform} transform Transform.
   * @return {Array<number>|null} Clip coordinates.
   */
  getClipCoords(t) {
    const e = this.maxExtent_;
    if (!e)
      return null;
    const i = e[0], s = e[1], r = e[2], o = e[3], a = [i, s, i, o, r, o, r, s];
    return xe(a, 0, 8, 2, t, a), a;
  }
  /**
   * @return {boolean} Is empty.
   */
  isEmpty() {
    return fi(this.executorsByZIndex_);
  }
  /**
   * @param {CanvasRenderingContext2D} targetContext Context.
   * @param {import('../../size.js').Size} scaledCanvasSize Scale of the context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {boolean} snapToPixel Snap point symbols and test to integer pixel.
   * @param {Array<import("../canvas.js").BuilderType>} [builderTypes] Ordered replay types to replay.
   *     Default is {@link module:ol/render/replay~ALL}
   * @param {import("rbush").default<import('./Executor.js').DeclutterEntry>|null} [declutterTree] Declutter tree.
   *     When set to null, no decluttering is done, even when the executor group has a `ZIndexContext`.
   */
  execute(t, e, i, s, r, o, a) {
    const l = Object.keys(this.executorsByZIndex_).map(Number);
    l.sort(a ? Rl : ne), o = o || si;
    const h = si.length;
    for (let c = 0, u = l.length; c < u; ++c) {
      const d = l[c].toString(), g = this.executorsByZIndex_[d];
      for (let f = 0, _ = o.length; f < _; ++f) {
        const m = o[f], p = g[m];
        if (p !== void 0) {
          const y = a === null ? void 0 : p.getZIndexContext(), R = y ? y.getContext() : t, E = this.maxExtent_ && m !== "Image" && m !== "Text";
          if (E && (R.save(), this.clip(R, i)), !y || m === "Text" || m === "Image" ? p.execute(
            R,
            e,
            i,
            s,
            r,
            a
          ) : y.pushFunction(
            (x) => p.execute(
              x,
              e,
              i,
              s,
              r,
              a
            )
          ), E && R.restore(), y) {
            y.offset();
            const x = l[c] * h + f;
            this.deferredZIndexContexts_[x] || (this.deferredZIndexContexts_[x] = []), this.deferredZIndexContexts_[x].push(y);
          }
        }
      }
    }
    this.renderedContext_ = t;
  }
  getDeferredZIndexContexts() {
    return this.deferredZIndexContexts_;
  }
  getRenderedContext() {
    return this.renderedContext_;
  }
  renderDeferred() {
    const t = this.deferredZIndexContexts_, e = Object.keys(t).map(Number).sort(ne);
    for (let i = 0, s = e.length; i < s; ++i)
      t[e[i]].forEach((r) => {
        r.draw(this.renderedContext_), r.clear();
      }), t[e[i]].length = 0;
  }
}
const os = {};
function Zc(n) {
  if (os[n] !== void 0)
    return os[n];
  const t = n * 2 + 1, e = n * n, i = new Array(e + 1);
  for (let r = 0; r <= n; ++r)
    for (let o = 0; o <= n; ++o) {
      const a = r * r + o * o;
      if (a > e)
        break;
      let l = i[a];
      l || (l = [], i[a] = l), l.push(((n + r) * t + (n + o)) * 4 + 3), r > 0 && l.push(((n - r) * t + (n + o)) * 4 + 3), o > 0 && (l.push(((n + r) * t + (n - o)) * 4 + 3), r > 0 && l.push(((n - r) * t + (n - o)) * 4 + 3));
    }
  const s = [];
  for (let r = 0, o = i.length; r < o; ++r)
    i[r] && s.push(...i[r]);
  return os[n] = s, s;
}
const jt = 0.5;
function Kc(n, t, e, i, s, r, o, a, l) {
  const h = s, c = n[0] * jt, u = n[1] * jt, d = rt(c, u);
  d.imageSmoothingEnabled = !1;
  const g = d.canvas, f = new oc(
    d,
    jt,
    s,
    null,
    o,
    a,
    null
  ), _ = e.length, m = Math.floor((256 * 256 * 256 - 1) / _), p = {};
  for (let R = 1; R <= _; ++R) {
    const E = e[R - 1], x = E.getStyleFunction() || i;
    if (!x)
      continue;
    let w = x(E, r);
    if (!w)
      continue;
    Array.isArray(w) || (w = [w]);
    const S = (R * m).toString(16).padStart(7, "#00000");
    for (let A = 0, I = w.length; A < I; ++A) {
      const P = w[A], L = P.getGeometryFunction()(E);
      if (!L || !St(h, L.getExtent()))
        continue;
      const F = P.clone(), M = F.getFill();
      M && M.setColor(S);
      const G = F.getStroke();
      G && (G.setColor(S), G.setLineDash(null)), F.setText(void 0);
      const b = P.getImage();
      if (b) {
        const k = b.getImageSize();
        if (!k)
          continue;
        const W = rt(
          k[0],
          k[1],
          void 0,
          { alpha: !1 }
        ), C = W.canvas;
        W.fillStyle = S, W.fillRect(0, 0, C.width, C.height), F.setImage(
          new Ji({
            img: C,
            anchor: b.getAnchor(),
            anchorXUnits: "pixels",
            anchorYUnits: "pixels",
            offset: b.getOrigin(),
            opacity: 1,
            size: b.getSize(),
            scale: b.getScale(),
            rotation: b.getRotation(),
            rotateWithView: b.getRotateWithView()
          })
        );
      }
      const D = F.getZIndex() || 0;
      let z = p[D];
      z || (z = {}, p[D] = z, z.Polygon = [], z.Circle = [], z.LineString = [], z.Point = []);
      const N = L.getType();
      if (N === "GeometryCollection") {
        const k = (
          /** @type {import("../../geom/GeometryCollection.js").default} */
          L.getGeometriesArrayRecursive()
        );
        for (let W = 0, C = k.length; W < C; ++W) {
          const Z = k[W];
          z[Z.getType().replace("Multi", "")].push(
            Z,
            F
          );
        }
      } else
        z[N.replace("Multi", "")].push(L, F);
    }
  }
  const y = Object.keys(p).map(Number).sort(ne);
  for (let R = 0, E = y.length; R < E; ++R) {
    const x = p[y[R]];
    for (const w in x) {
      const v = x[w];
      for (let S = 0, A = v.length; S < A; S += 2) {
        f.setStyle(v[S + 1]);
        for (let I = 0, P = t.length; I < P; ++I)
          f.setTransform(t[I]), f.drawGeometry(v[S]);
      }
    }
  }
  return d.getImageData(0, 0, g.width, g.height);
}
function Vc(n, t, e) {
  const i = [];
  if (e) {
    const s = Math.floor(Math.round(n[0]) * jt), r = Math.floor(Math.round(n[1]) * jt), o = (st(s, 0, e.width - 1) + st(r, 0, e.height - 1) * e.width) * 4, a = e.data[o], l = e.data[o + 1], c = e.data[o + 2] + 256 * (l + 256 * a), u = Math.floor((256 * 256 * 256 - 1) / t.length);
    c && c % u === 0 && i.push(t[c / u - 1]);
  }
  return i;
}
class $c extends xi {
  /**
   * @param {import("./EventType.js").default} type Type.
   * @param {import("../transform.js").Transform} [inversePixelTransform] Transform for
   *     CSS pixels to rendered pixels.
   * @param {import("../Map.js").FrameState} [frameState] Frame state.
   * @param {?(CanvasRenderingContext2D|WebGLRenderingContext)} [context] Context.
   */
  constructor(t, e, i, s) {
    super(t), this.inversePixelTransform = e, this.frameState = i, this.context = s;
  }
}
const qc = 5;
class Hc extends Vi {
  /**
   * @param {LayerType} layer Layer.
   */
  constructor(t) {
    super(), this.ready = !0, this.boundHandleImageChange_ = this.handleImageChange_.bind(this), this.layer_ = t, this.staleKeys_ = new Array(), this.maxStaleKeys = qc;
  }
  /**
   * @return {Array<string>} Get the list of stale keys.
   */
  getStaleKeys() {
    return this.staleKeys_;
  }
  /**
   * @param {string} key The new stale key.
   */
  prependStaleKey(t) {
    this.staleKeys_.unshift(t), this.staleKeys_.length > this.maxStaleKeys && (this.staleKeys_.length = this.maxStaleKeys);
  }
  /**
   * Asynchronous layer level hit detection.
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with
   * an array of features.
   */
  getFeatures(t) {
    return J();
  }
  /**
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   */
  getData(t) {
    return null;
  }
  /**
   * Determine whether render should be called.
   * @abstract
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */
  prepareFrame(t) {
    return J();
  }
  /**
   * Render the layer.
   * @abstract
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement|null} target Target that may be used to render content to.
   * @return {HTMLElement|null} The rendered element.
   */
  renderFrame(t, e) {
    return J();
  }
  /**
   * @abstract
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("./Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   */
  forEachFeatureAtCoordinate(t, e, i, s, r) {
  }
  /**
   * @return {LayerType} Layer.
   */
  getLayer() {
    return this.layer_;
  }
  /**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   * @abstract
   */
  handleFontsChanged() {
  }
  /**
   * Handle changes in image state.
   * @param {import("../events/Event.js").default} event Image change event.
   * @private
   */
  handleImageChange_(t) {
    const e = (
      /** @type {import("../Image.js").default} */
      t.target
    );
    (e.getState() === B.LOADED || e.getState() === B.ERROR) && this.renderIfReadyAndVisible();
  }
  /**
   * Load the image if not already loaded, and register the image change
   * listener if needed.
   * @param {import("../Image.js").default} image Image.
   * @return {boolean} `true` if the image is already loaded, `false` otherwise.
   * @protected
   */
  loadImage(t) {
    let e = t.getState();
    return e != B.LOADED && e != B.ERROR && t.addEventListener(ut.CHANGE, this.boundHandleImageChange_), e == B.IDLE && (t.load(), e = t.getState()), e == B.LOADED;
  }
  /**
   * @protected
   */
  renderIfReadyAndVisible() {
    const t = this.getLayer();
    t && t.getVisible() && t.getSourceState() === "ready" && t.changed();
  }
  /**
   * @param {import("../Map.js").FrameState} frameState Frame state.
   */
  renderDeferred(t) {
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    delete this.layer_, super.disposeInternal();
  }
}
const uo = [];
let ti = null;
function Jc() {
  ti = rt(1, 1, void 0, {
    willReadFrequently: !0
  });
}
class Ma extends Hc {
  /**
   * @param {LayerType} layer Layer.
   */
  constructor(t) {
    super(t), this.container = null, this.renderedResolution, this.tempTransform = re(), this.pixelTransform = re(), this.inversePixelTransform = re(), this.context = null, this.deferredContext_ = null, this.containerReused = !1, this.frameState = null;
  }
  /**
   * @param {import('../../DataTile.js').ImageLike} image Image.
   * @param {number} col The column index.
   * @param {number} row The row index.
   * @return {Uint8ClampedArray|null} The image data.
   */
  getImageData(t, e, i) {
    ti || Jc(), ti.clearRect(0, 0, 1, 1);
    let s;
    try {
      ti.drawImage(t, e, i, 1, 1, 0, 0, 1, 1), s = ti.getImageData(0, 0, 1, 1).data;
    } catch {
      return ti = null, null;
    }
    return s;
  }
  /**
   * @param {import('../../Map.js').FrameState} frameState Frame state.
   * @return {string} Background color.
   */
  getBackground(t) {
    let i = this.getLayer().getBackground();
    return typeof i == "function" && (i = i(t.viewState.resolution)), i || void 0;
  }
  /**
   * Get a rendering container from an existing target, if compatible.
   * @param {HTMLElement} target Potential render target.
   * @param {string} transform CSS Transform.
   * @param {string} [backgroundColor] Background color.
   */
  useContainer(t, e, i) {
    const s = this.getLayer().getClassName();
    let r, o;
    if (t && t.className === s && (!i || t && t.style.backgroundColor && Ei(
      mi(t.style.backgroundColor),
      mi(i)
    ))) {
      const a = t.firstElementChild;
      a instanceof HTMLCanvasElement && (o = a.getContext("2d"));
    }
    if (o && o.canvas.style.transform === e ? (this.container = t, this.context = o, this.containerReused = !0) : this.containerReused ? (this.container = null, this.context = null, this.containerReused = !1) : this.container && (this.container.style.backgroundColor = null), !this.container) {
      r = document.createElement("div"), r.className = s;
      let a = r.style;
      a.position = "absolute", a.width = "100%", a.height = "100%", o = rt();
      const l = o.canvas;
      r.appendChild(l), a = l.style, a.position = "absolute", a.left = "0", a.transformOrigin = "top left", this.container = r, this.context = o;
    }
    !this.containerReused && i && !this.container.style.backgroundColor && (this.container.style.backgroundColor = i);
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("../../extent.js").Extent} extent Clip extent.
   * @protected
   */
  clipUnrotated(t, e, i) {
    const s = le(i), r = Dn(i), o = Fn(i), a = bn(i);
    _t(e.coordinateToPixelTransform, s), _t(e.coordinateToPixelTransform, r), _t(e.coordinateToPixelTransform, o), _t(e.coordinateToPixelTransform, a);
    const l = this.inversePixelTransform;
    _t(l, s), _t(l, r), _t(l, o), _t(l, a), t.save(), t.beginPath(), t.moveTo(Math.round(s[0]), Math.round(s[1])), t.lineTo(Math.round(r[0]), Math.round(r[1])), t.lineTo(Math.round(o[0]), Math.round(o[1])), t.lineTo(Math.round(a[0]), Math.round(a[1])), t.clip();
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @protected
   */
  prepareContainer(t, e) {
    const i = t.extent, s = t.viewState.resolution, r = t.viewState.rotation, o = t.pixelRatio, a = Math.round($(i) / s * o), l = Math.round(lt(i) / s * o);
    Se(
      this.pixelTransform,
      t.size[0] / 2,
      t.size[1] / 2,
      1 / o,
      1 / o,
      r,
      -a / 2,
      -l / 2
    ), Eh(this.inversePixelTransform, this.pixelTransform);
    const h = Rh(this.pixelTransform);
    if (this.useContainer(e, h, this.getBackground(t)), !this.containerReused) {
      const c = this.context.canvas;
      c.width != a || c.height != l ? (c.width = a, c.height = l) : this.context.clearRect(0, 0, a, l), h !== c.style.transform && (c.style.transform = h);
    }
  }
  /**
   * @param {import("../../render/EventType.js").default} type Event type.
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @private
   */
  dispatchRenderEvent_(t, e, i) {
    const s = this.getLayer();
    if (s.hasListener(t)) {
      const r = new $c(
        t,
        this.inversePixelTransform,
        i,
        e
      );
      s.dispatchEvent(r);
    }
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @protected
   */
  preRender(t, e) {
    this.frameState = e, !e.declutter && this.dispatchRenderEvent_(Pe.PRERENDER, t, e);
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @protected
   */
  postRender(t, e) {
    e.declutter || this.dispatchRenderEvent_(Pe.POSTRENDER, t, e);
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   */
  renderDeferredInternal(t) {
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {import('../../render/canvas/ZIndexContext.js').ZIndexContextProxy} Context.
   */
  getRenderContext(t) {
    return t.declutter && !this.deferredContext_ && (this.deferredContext_ = new Aa()), t.declutter ? this.deferredContext_.getContext() : this.context;
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @override
   */
  renderDeferred(t) {
    t.declutter && (this.dispatchRenderEvent_(
      Pe.PRERENDER,
      this.context,
      t
    ), t.declutter && this.deferredContext_ && (this.deferredContext_.draw(this.context), this.deferredContext_.clear()), this.renderDeferredInternal(t), this.dispatchRenderEvent_(
      Pe.POSTRENDER,
      this.context,
      t
    ));
  }
  /**
   * Creates a transform for rendering to an element that will be rotated after rendering.
   * @param {import("../../coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} width Width of the rendered element (in pixels).
   * @param {number} height Height of the rendered element (in pixels).
   * @param {number} offsetX Offset on the x-axis in view coordinates.
   * @protected
   * @return {!import("../../transform.js").Transform} Transform.
   */
  getRenderTransform(t, e, i, s, r, o, a) {
    const l = r / 2, h = o / 2, c = s / e, u = -c, d = -t[0] + a, g = -t[1];
    return Se(
      this.tempTransform,
      l,
      h,
      c,
      u,
      -i,
      d,
      g
    );
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    delete this.frameState, super.disposeInternal();
  }
}
class Qc extends Ma {
  /**
   * @param {import("../../layer/BaseVector.js").default} vectorLayer Vector layer.
   */
  constructor(t) {
    super(t), this.boundHandleStyleImageChange_ = this.handleStyleImageChange_.bind(this), this.animatingOrInteracting_, this.hitDetectionImageData_ = null, this.clipped_ = !1, this.renderedFeatures_ = null, this.renderedRevision_ = -1, this.renderedResolution_ = NaN, this.renderedExtent_ = At(), this.wrappedRenderedExtent_ = At(), this.renderedRotation_, this.renderedCenter_ = null, this.renderedProjection_ = null, this.renderedPixelRatio_ = 1, this.renderedRenderOrder_ = null, this.renderedFrameDeclutter_, this.replayGroup_ = null, this.replayGroupChanged = !0, this.clipping = !0, this.targetContext_ = null, this.opacity_ = 1;
  }
  /**
   * @param {ExecutorGroup} executorGroup Executor group.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {boolean} [declutterable] `true` to only render declutterable items,
   *     `false` to only render non-declutterable items, `undefined` to render all.
   */
  renderWorlds(t, e, i) {
    const s = e.extent, r = e.viewState, o = r.center, a = r.resolution, l = r.projection, h = r.rotation, c = l.getExtent(), u = this.getLayer().getSource(), d = this.getLayer().getDeclutter(), g = e.pixelRatio, f = e.viewHints, _ = !(f[Ot.ANIMATING] || f[Ot.INTERACTING]), m = this.context, p = Math.round($(s) / a * g), y = Math.round(lt(s) / a * g), R = u.getWrapX() && l.canWrapX(), E = R ? $(c) : null, x = R ? Math.ceil((s[2] - c[2]) / E) + 1 : 1;
    let w = R ? Math.floor((s[0] - c[0]) / E) : 0;
    do {
      let v = this.getRenderTransform(
        o,
        a,
        0,
        g,
        p,
        y,
        w * E
      );
      e.declutter && (v = v.slice(0)), t.execute(
        m,
        [m.canvas.width, m.canvas.height],
        v,
        h,
        _,
        i === void 0 ? si : i ? va : Bc,
        i ? d && e.declutter[d] : void 0
      );
    } while (++w < x);
  }
  /**
   * @private
   */
  setDrawContext_() {
    this.opacity_ !== 1 && (this.targetContext_ = this.context, this.context = rt(
      this.context.canvas.width,
      this.context.canvas.height,
      uo
    ));
  }
  /**
   * @private
   */
  resetDrawContext_() {
    if (this.opacity_ !== 1) {
      const t = this.targetContext_.globalAlpha;
      this.targetContext_.globalAlpha = this.opacity_, this.targetContext_.drawImage(this.context.canvas, 0, 0), this.targetContext_.globalAlpha = t, Nn(this.context), uo.push(this.context.canvas), this.context = this.targetContext_, this.targetContext_ = null;
    }
  }
  /**
   * Render declutter items for this layer
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   */
  renderDeclutter(t) {
    !this.replayGroup_ || !this.getLayer().getDeclutter() || this.renderWorlds(this.replayGroup_, t, !0);
  }
  /**
   * Render deferred instructions.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @override
   */
  renderDeferredInternal(t) {
    this.replayGroup_ && (this.replayGroup_.renderDeferred(), this.clipped_ && this.context.restore(), this.resetDrawContext_());
  }
  /**
   * Render the layer.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement|null} target Target that may be used to render content to.
   * @return {HTMLElement|null} The rendered element.
   * @override
   */
  renderFrame(t, e) {
    const i = t.layerStatesArray[t.layerIndex];
    this.opacity_ = i.opacity;
    const s = t.viewState;
    this.prepareContainer(t, e);
    const r = this.context, o = this.replayGroup_;
    let a = o && !o.isEmpty();
    if (!a && !(this.getLayer().hasListener(Pe.PRERENDER) || this.getLayer().hasListener(Pe.POSTRENDER)))
      return null;
    if (this.setDrawContext_(), this.preRender(r, t), s.projection, this.clipped_ = !1, a && i.extent && this.clipping) {
      const l = pe(i.extent);
      a = St(l, t.extent), this.clipped_ = a && !Mi(l, t.extent), this.clipped_ && this.clipUnrotated(r, t, l);
    }
    return a && this.renderWorlds(
      o,
      t,
      this.getLayer().getDeclutter() ? !1 : void 0
    ), !t.declutter && this.clipped_ && r.restore(), this.postRender(r, t), this.renderedRotation_ !== s.rotation && (this.renderedRotation_ = s.rotation, this.hitDetectionImageData_ = null), t.declutter || this.resetDrawContext_(), this.container;
  }
  /**
   * Asynchronous layer level hit detection.
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../../Feature").default>>} Promise
   * that resolves with an array of features.
   * @override
   */
  getFeatures(t) {
    return new Promise((e) => {
      if (this.frameState && !this.hitDetectionImageData_ && !this.animatingOrInteracting_) {
        const i = this.frameState.size.slice(), s = this.renderedCenter_, r = this.renderedResolution_, o = this.renderedRotation_, a = this.renderedProjection_, l = this.wrappedRenderedExtent_, h = this.getLayer(), c = [], u = i[0] * jt, d = i[1] * jt;
        c.push(
          this.getRenderTransform(
            s,
            r,
            o,
            jt,
            u,
            d,
            0
          ).slice()
        );
        const g = h.getSource(), f = a.getExtent();
        if (g.getWrapX() && a.canWrapX() && !Mi(f, l)) {
          let _ = l[0];
          const m = $(f);
          let p = 0, y;
          for (; _ < f[0]; )
            --p, y = m * p, c.push(
              this.getRenderTransform(
                s,
                r,
                o,
                jt,
                u,
                d,
                y
              ).slice()
            ), _ += m;
          for (p = 0, _ = l[2]; _ > f[2]; )
            ++p, y = m * p, c.push(
              this.getRenderTransform(
                s,
                r,
                o,
                jt,
                u,
                d,
                y
              ).slice()
            ), _ -= m;
        }
        this.hitDetectionImageData_ = Kc(
          i,
          c,
          this.renderedFeatures_,
          h.getStyleFunction(),
          l,
          r,
          o,
          Jr(r, this.renderedPixelRatio_)
        );
      }
      e(
        Vc(t, this.renderedFeatures_, this.hitDetectionImageData_)
      );
    });
  }
  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("../vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("../Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   * @override
   */
  forEachFeatureAtCoordinate(t, e, i, s, r) {
    var d, g;
    if (!this.replayGroup_)
      return;
    const o = e.viewState.resolution, a = e.viewState.rotation, l = this.getLayer(), h = {}, c = function(f, _, m) {
      const p = H(f), y = h[p];
      if (y) {
        if (y !== !0 && m < y.distanceSq) {
          if (m === 0)
            return h[p] = !0, r.splice(r.lastIndexOf(y), 1), s(f, l, _);
          y.geometry = _, y.distanceSq = m;
        }
      } else {
        if (m === 0)
          return h[p] = !0, s(f, l, _);
        r.push(
          h[p] = {
            feature: f,
            layer: l,
            geometry: _,
            distanceSq: m,
            callback: s
          }
        );
      }
    }, u = this.getLayer().getDeclutter();
    return this.replayGroup_.forEachFeatureAtCoordinate(
      t,
      o,
      a,
      i,
      c,
      u ? (g = (d = e.declutter) == null ? void 0 : d[u]) == null ? void 0 : g.all().map((f) => f.value) : null
    );
  }
  /**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   * @override
   */
  handleFontsChanged() {
    const t = this.getLayer();
    t.getVisible() && this.replayGroup_ && t.changed();
  }
  /**
   * Handle changes in image style state.
   * @param {import("../../events/Event.js").default} event Image style change event.
   * @private
   */
  handleStyleImageChange_(t) {
    this.renderIfReadyAndVisible();
  }
  /**
   * Determine whether render should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   * @override
   */
  prepareFrame(t) {
    const e = this.getLayer(), i = e.getSource();
    if (!i)
      return !1;
    const s = t.viewHints[Ot.ANIMATING], r = t.viewHints[Ot.INTERACTING], o = e.getUpdateWhileAnimating(), a = e.getUpdateWhileInteracting();
    if (this.ready && !o && s || !a && r)
      return this.animatingOrInteracting_ = !0, !0;
    this.animatingOrInteracting_ = !1;
    const l = t.extent, h = t.viewState, c = h.projection, u = h.resolution, d = t.pixelRatio, g = e.getRevision(), f = e.getRenderBuffer();
    let _ = e.getRenderOrder();
    _ === void 0 && (_ = lc);
    const m = h.center.slice(), p = Gi(
      l,
      f * u
    ), y = p.slice(), R = [p.slice()], E = c.getExtent();
    if (i.getWrapX() && c.canWrapX() && !Mi(E, t.extent)) {
      const M = $(E), G = Math.max($(p) / 2, M);
      p[0] = E[0] - G, p[2] = E[2] + G, Xl(m, c);
      const b = Vo(R[0], c);
      b[0] < E[0] && b[2] < E[2] ? R.push([
        b[0] + M,
        b[1],
        b[2] + M,
        b[3]
      ]) : b[0] > E[0] && b[2] > E[2] && R.push([
        b[0] - M,
        b[1],
        b[2] - M,
        b[3]
      ]);
    }
    if (this.ready && this.renderedResolution_ == u && this.renderedRevision_ == g && this.renderedRenderOrder_ == _ && this.renderedFrameDeclutter_ === !!t.declutter && Mi(this.wrappedRenderedExtent_, p))
      return Ei(this.renderedExtent_, y) || (this.hitDetectionImageData_ = null, this.renderedExtent_ = y), this.renderedCenter_ = m, this.replayGroupChanged = !1, !0;
    this.replayGroup_ = null;
    const x = new zc(
      Ra(u, d),
      p,
      u,
      d
    );
    let w;
    for (let M = 0, G = R.length; M < G; ++M)
      i.loadFeatures(R[M], u, c);
    const v = Jr(u, d);
    let S = !0;
    const A = (
      /**
       * @param {import("../../Feature.js").default} feature Feature.
       * @param {number} index Index.
       */
      (M, G) => {
        let b;
        const D = M.getStyleFunction() || e.getStyleFunction();
        if (D && (b = D(M, u)), b) {
          const z = this.renderFeature(
            M,
            v,
            b,
            x,
            w,
            this.getLayer().getDeclutter(),
            G
          );
          S = S && !z;
        }
      }
    ), I = ia(p), P = i.getFeaturesInExtent(I);
    _ && P.sort(_);
    for (let M = 0, G = P.length; M < G; ++M)
      A(P[M], M);
    this.renderedFeatures_ = P, this.ready = S;
    const L = x.finish(), F = new jc(
      p,
      u,
      d,
      i.getOverlaps(),
      L,
      e.getRenderBuffer(),
      !!t.declutter
    );
    return this.renderedResolution_ = u, this.renderedRevision_ = g, this.renderedRenderOrder_ = _, this.renderedFrameDeclutter_ = !!t.declutter, this.renderedExtent_ = y, this.wrappedRenderedExtent_ = p, this.renderedCenter_ = m, this.renderedProjection_ = c, this.renderedPixelRatio_ = d, this.replayGroup_ = F, this.hitDetectionImageData_ = null, this.replayGroupChanged = !0, !0;
  }
  /**
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {number} squaredTolerance Squared render tolerance.
   * @param {import("../../style/Style.js").default|Array<import("../../style/Style.js").default>} styles The style or array of styles.
   * @param {import("../../render/canvas/BuilderGroup.js").default} builderGroup Builder group.
   * @param {import("../../proj.js").TransformFunction} [transform] Transform from user to view projection.
   * @param {boolean} [declutter] Enable decluttering.
   * @param {number} [index] Render order index.
   * @return {boolean} `true` if an image is loading.
   */
  renderFeature(t, e, i, s, r, o, a) {
    if (!i)
      return !1;
    let l = !1;
    if (Array.isArray(i))
      for (let h = 0, c = i.length; h < c; ++h)
        l = Qr(
          s,
          t,
          i[h],
          e,
          this.boundHandleStyleImageChange_,
          r,
          o,
          a
        ) || l;
    else
      l = Qr(
        s,
        t,
        i,
        e,
        this.boundHandleStyleImageChange_,
        r,
        o,
        a
      );
    return l;
  }
}
let Xe = 0;
const xt = 1 << Xe++, K = 1 << Xe++, Tt = 1 << Xe++, zt = 1 << Xe++, Ne = 1 << Xe++, Fi = 1 << Xe++, un = Math.pow(2, Xe) - 1, nr = {
  [xt]: "boolean",
  [K]: "number",
  [Tt]: "string",
  [zt]: "color",
  [Ne]: "number[]",
  [Fi]: "size"
}, tu = Object.keys(nr).map(Number).sort(ne);
function eu(n) {
  return n in nr;
}
function Di(n) {
  const t = [];
  for (const e of tu)
    Oi(n, e) && t.push(nr[e]);
  return t.length === 0 ? "untyped" : t.length < 3 ? t.join(" or ") : t.slice(0, -1).join(", ") + ", or " + t[t.length - 1];
}
function Oi(n, t) {
  return (n & t) === t;
}
function _e(n, t) {
  return n === t;
}
class at {
  /**
   * @param {number} type The value type.
   * @param {LiteralValue} value The literal value.
   */
  constructor(t, e) {
    if (!eu(t))
      throw new Error(
        `literal expressions must have a specific type, got ${Di(t)}`
      );
    this.type = t, this.value = e;
  }
}
class iu {
  /**
   * @param {number} type The return type.
   * @param {string} operator The operator.
   * @param {...Expression} args The arguments.
   */
  constructor(t, e, ...i) {
    this.type = t, this.operator = e, this.args = i;
  }
}
function La() {
  return {
    variables: /* @__PURE__ */ new Set(),
    properties: /* @__PURE__ */ new Set(),
    featureId: !1,
    geometryType: !1,
    mapState: !1
  };
}
function ft(n, t, e) {
  switch (typeof n) {
    case "boolean": {
      if (_e(t, Tt))
        return new at(Tt, n ? "true" : "false");
      if (!Oi(t, xt))
        throw new Error(
          `got a boolean, but expected ${Di(t)}`
        );
      return new at(xt, n);
    }
    case "number": {
      if (_e(t, Fi))
        return new at(Fi, dt(n));
      if (_e(t, xt))
        return new at(xt, !!n);
      if (_e(t, Tt))
        return new at(Tt, n.toString());
      if (!Oi(t, K))
        throw new Error(`got a number, but expected ${Di(t)}`);
      return new at(K, n);
    }
    case "string": {
      if (_e(t, zt))
        return new at(zt, $s(n));
      if (_e(t, xt))
        return new at(xt, !!n);
      if (!Oi(t, Tt))
        throw new Error(`got a string, but expected ${Di(t)}`);
      return new at(Tt, n);
    }
  }
  if (!Array.isArray(n))
    throw new Error("expression must be an array or a primitive value");
  if (n.length === 0)
    throw new Error("empty expression");
  if (typeof n[0] == "string")
    return fu(n, t, e);
  for (const i of n)
    if (typeof i != "number")
      throw new Error("expected an array of numbers");
  if (_e(t, Fi)) {
    if (n.length !== 2)
      throw new Error(
        `expected an array of two values for a size, got ${n.length}`
      );
    return new at(Fi, n);
  }
  if (_e(t, zt)) {
    if (n.length === 3)
      return new at(zt, [...n, 1]);
    if (n.length === 4)
      return new at(zt, n);
    throw new Error(
      `expected an array of 3 or 4 values for a color, got ${n.length}`
    );
  }
  if (!Oi(t, Ne))
    throw new Error(
      `got an array of numbers, but expected ${Di(t)}`
    );
  return new at(Ne, n);
}
const T = {
  Get: "get",
  Var: "var",
  Concat: "concat",
  GeometryType: "geometry-type",
  LineMetric: "line-metric",
  Any: "any",
  All: "all",
  Not: "!",
  Resolution: "resolution",
  Zoom: "zoom",
  Time: "time",
  Equal: "==",
  NotEqual: "!=",
  GreaterThan: ">",
  GreaterThanOrEqualTo: ">=",
  LessThan: "<",
  LessThanOrEqualTo: "<=",
  Multiply: "*",
  Divide: "/",
  Add: "+",
  Subtract: "-",
  Clamp: "clamp",
  Mod: "%",
  Pow: "^",
  Abs: "abs",
  Floor: "floor",
  Ceil: "ceil",
  Round: "round",
  Sin: "sin",
  Cos: "cos",
  Atan: "atan",
  Sqrt: "sqrt",
  Match: "match",
  Between: "between",
  Interpolate: "interpolate",
  Coalesce: "coalesce",
  Case: "case",
  In: "in",
  Number: "number",
  String: "string",
  Array: "array",
  Color: "color",
  Id: "id",
  Band: "band",
  Palette: "palette",
  ToString: "to-string",
  Has: "has"
}, nu = {
  [T.Get]: U(Y(1, 1 / 0), fo),
  [T.Var]: U(Y(1, 1), su),
  [T.Has]: U(Y(1, 1 / 0), fo),
  [T.Id]: U(ru, Ve),
  [T.Concat]: U(
    Y(2, 1 / 0),
    q(Tt)
  ),
  [T.GeometryType]: U(ou, Ve),
  [T.LineMetric]: U(Ve),
  [T.Resolution]: U(as, Ve),
  [T.Zoom]: U(as, Ve),
  [T.Time]: U(as, Ve),
  [T.Any]: U(
    Y(2, 1 / 0),
    q(xt)
  ),
  [T.All]: U(
    Y(2, 1 / 0),
    q(xt)
  ),
  [T.Not]: U(
    Y(1, 1),
    q(xt)
  ),
  [T.Equal]: U(
    Y(2, 2),
    q(un)
  ),
  [T.NotEqual]: U(
    Y(2, 2),
    q(un)
  ),
  [T.GreaterThan]: U(
    Y(2, 2),
    q(K)
  ),
  [T.GreaterThanOrEqualTo]: U(
    Y(2, 2),
    q(K)
  ),
  [T.LessThan]: U(
    Y(2, 2),
    q(K)
  ),
  [T.LessThanOrEqualTo]: U(
    Y(2, 2),
    q(K)
  ),
  [T.Multiply]: U(
    Y(2, 1 / 0),
    go
  ),
  [T.Coalesce]: U(
    Y(2, 1 / 0),
    go
  ),
  [T.Divide]: U(
    Y(2, 2),
    q(K)
  ),
  [T.Add]: U(
    Y(2, 1 / 0),
    q(K)
  ),
  [T.Subtract]: U(
    Y(2, 2),
    q(K)
  ),
  [T.Clamp]: U(
    Y(3, 3),
    q(K)
  ),
  [T.Mod]: U(
    Y(2, 2),
    q(K)
  ),
  [T.Pow]: U(
    Y(2, 2),
    q(K)
  ),
  [T.Abs]: U(
    Y(1, 1),
    q(K)
  ),
  [T.Floor]: U(
    Y(1, 1),
    q(K)
  ),
  [T.Ceil]: U(
    Y(1, 1),
    q(K)
  ),
  [T.Round]: U(
    Y(1, 1),
    q(K)
  ),
  [T.Sin]: U(
    Y(1, 1),
    q(K)
  ),
  [T.Cos]: U(
    Y(1, 1),
    q(K)
  ),
  [T.Atan]: U(
    Y(1, 2),
    q(K)
  ),
  [T.Sqrt]: U(
    Y(1, 1),
    q(K)
  ),
  [T.Match]: U(
    Y(4, 1 / 0),
    _o,
    lu
  ),
  [T.Between]: U(
    Y(3, 3),
    q(K)
  ),
  [T.Interpolate]: U(
    Y(6, 1 / 0),
    _o,
    hu
  ),
  [T.Case]: U(
    Y(3, 1 / 0),
    au,
    cu
  ),
  [T.In]: U(Y(2, 2), uu),
  [T.Number]: U(
    Y(1, 1 / 0),
    q(un)
  ),
  [T.String]: U(
    Y(1, 1 / 0),
    q(un)
  ),
  [T.Array]: U(
    Y(1, 1 / 0),
    q(K)
  ),
  [T.Color]: U(
    Y(1, 4),
    q(K)
  ),
  [T.Band]: U(
    Y(1, 3),
    q(K)
  ),
  [T.Palette]: U(
    Y(2, 2),
    du
  ),
  [T.ToString]: U(
    Y(1, 1),
    q(xt | K | Tt | zt)
  )
};
function fo(n, t, e) {
  const i = n.length - 1, s = new Array(i);
  for (let r = 0; r < i; ++r) {
    const o = n[r + 1];
    switch (typeof o) {
      case "number": {
        s[r] = new at(K, o);
        break;
      }
      case "string": {
        s[r] = new at(Tt, o);
        break;
      }
      default:
        throw new Error(
          `expected a string key or numeric array index for a get operation, got ${o}`
        );
    }
    r === 0 && e.properties.add(String(o));
  }
  return s;
}
function su(n, t, e) {
  const i = n[1];
  if (typeof i != "string")
    throw new Error("expected a string argument for var operation");
  return e.variables.add(i), [new at(Tt, i)];
}
function ru(n, t, e) {
  e.featureId = !0;
}
function ou(n, t, e) {
  e.geometryType = !0;
}
function as(n, t, e) {
  e.mapState = !0;
}
function Ve(n, t, e) {
  const i = n[0];
  if (n.length !== 1)
    throw new Error(`expected no arguments for ${i} operation`);
  return [];
}
function Y(n, t) {
  return function(e, i, s) {
    const r = e[0], o = e.length - 1;
    if (n === t) {
      if (o !== n) {
        const a = n === 1 ? "" : "s";
        throw new Error(
          `expected ${n} argument${a} for ${r}, got ${o}`
        );
      }
    } else if (o < n || o > t) {
      const a = t === 1 / 0 ? `${n} or more` : `${n} to ${t}`;
      throw new Error(
        `expected ${a} arguments for ${r}, got ${o}`
      );
    }
  };
}
function go(n, t, e) {
  const i = n.length - 1, s = new Array(i);
  for (let r = 0; r < i; ++r) {
    const o = ft(n[r + 1], t, e);
    s[r] = o;
  }
  return s;
}
function q(n) {
  return function(t, e, i) {
    const s = t.length - 1, r = new Array(s);
    for (let o = 0; o < s; ++o) {
      const a = ft(t[o + 1], n, i);
      r[o] = a;
    }
    return r;
  };
}
function au(n, t, e) {
  const i = n[0], s = n.length - 1;
  if (s % 2 === 0)
    throw new Error(
      `expected an odd number of arguments for ${i}, got ${s} instead`
    );
}
function _o(n, t, e) {
  const i = n[0], s = n.length - 1;
  if (s % 2 === 1)
    throw new Error(
      `expected an even number of arguments for operation ${i}, got ${s} instead`
    );
}
function lu(n, t, e) {
  const i = n.length - 1, s = Tt | K | xt, r = ft(n[1], s, e), o = ft(n[n.length - 1], t, e), a = new Array(i - 2);
  for (let l = 0; l < i - 2; l += 2) {
    try {
      const h = ft(n[l + 2], r.type, e);
      a[l] = h;
    } catch (h) {
      throw new Error(
        `failed to parse argument ${l + 1} of match expression: ${h.message}`
      );
    }
    try {
      const h = ft(n[l + 3], o.type, e);
      a[l + 1] = h;
    } catch (h) {
      throw new Error(
        `failed to parse argument ${l + 2} of match expression: ${h.message}`
      );
    }
  }
  return [r, ...a, o];
}
function hu(n, t, e) {
  const i = n[1];
  let s;
  switch (i[0]) {
    case "linear":
      s = 1;
      break;
    case "exponential":
      const l = i[1];
      if (typeof l != "number" || l <= 0)
        throw new Error(
          `expected a number base for exponential interpolation, got ${JSON.stringify(l)} instead`
        );
      s = l;
      break;
    default:
      throw new Error(
        `invalid interpolation type: ${JSON.stringify(i)}`
      );
  }
  const r = new at(K, s);
  let o;
  try {
    o = ft(n[2], K, e);
  } catch (l) {
    throw new Error(
      `failed to parse argument 1 in interpolate expression: ${l.message}`
    );
  }
  const a = new Array(n.length - 3);
  for (let l = 0; l < a.length; l += 2) {
    try {
      const h = ft(n[l + 3], K, e);
      a[l] = h;
    } catch (h) {
      throw new Error(
        `failed to parse argument ${l + 2} for interpolate expression: ${h.message}`
      );
    }
    try {
      const h = ft(n[l + 4], t, e);
      a[l + 1] = h;
    } catch (h) {
      throw new Error(
        `failed to parse argument ${l + 3} for interpolate expression: ${h.message}`
      );
    }
  }
  return [r, o, ...a];
}
function cu(n, t, e) {
  const i = ft(n[n.length - 1], t, e), s = new Array(n.length - 1);
  for (let r = 0; r < s.length - 1; r += 2) {
    try {
      const o = ft(n[r + 1], xt, e);
      s[r] = o;
    } catch (o) {
      throw new Error(
        `failed to parse argument ${r} of case expression: ${o.message}`
      );
    }
    try {
      const o = ft(n[r + 2], i.type, e);
      s[r + 1] = o;
    } catch (o) {
      throw new Error(
        `failed to parse argument ${r + 1} of case expression: ${o.message}`
      );
    }
  }
  return s[s.length - 1] = i, s;
}
function uu(n, t, e) {
  let i = n[2];
  if (!Array.isArray(i))
    throw new Error(
      'the second argument for the "in" operator must be an array'
    );
  let s;
  if (typeof i[0] == "string") {
    if (i[0] !== "literal")
      throw new Error(
        'for the "in" operator, a string array should be wrapped in a "literal" operator to disambiguate from expressions'
      );
    if (!Array.isArray(i[1]))
      throw new Error(
        'failed to parse "in" expression: the literal operator must be followed by an array'
      );
    i = i[1], s = Tt;
  } else
    s = K;
  const r = new Array(i.length);
  for (let a = 0; a < r.length; a++)
    try {
      const l = ft(i[a], s, e);
      r[a] = l;
    } catch (l) {
      throw new Error(
        `failed to parse haystack item ${a} for "in" expression: ${l.message}`
      );
    }
  return [ft(n[1], s, e), ...r];
}
function du(n, t, e) {
  let i;
  try {
    i = ft(n[1], K, e);
  } catch (o) {
    throw new Error(
      `failed to parse first argument in palette expression: ${o.message}`
    );
  }
  const s = n[2];
  if (!Array.isArray(s))
    throw new Error("the second argument of palette must be an array");
  const r = new Array(s.length);
  for (let o = 0; o < r.length; o++) {
    let a;
    try {
      a = ft(s[o], zt, e);
    } catch (l) {
      throw new Error(
        `failed to parse color at index ${o} in palette expression: ${l.message}`
      );
    }
    if (!(a instanceof at))
      throw new Error(
        `the palette color at index ${o} must be a literal value`
      );
    r[o] = a;
  }
  return [i, ...r];
}
function U(...n) {
  return function(t, e, i) {
    const s = t[0];
    let r;
    for (let o = 0; o < n.length; o++) {
      const a = n[o](t, e, i);
      if (o == n.length - 1) {
        if (!a)
          throw new Error(
            "expected last argument validator to return the parsed args"
          );
        r = a;
      }
    }
    return new iu(e, s, ...r);
  };
}
function fu(n, t, e) {
  const i = n[0], s = nu[i];
  if (!s)
    throw new Error(`unknown operator: ${i}`);
  return s(n, t, e);
}
function ba(n) {
  if (!n)
    return "";
  const t = n.getType();
  switch (t) {
    case "Point":
    case "LineString":
    case "Polygon":
      return t;
    case "MultiPoint":
    case "MultiLineString":
    case "MultiPolygon":
      return (
        /** @type {'Point'|'LineString'|'Polygon'} */
        t.substring(5)
      );
    case "Circle":
      return "Polygon";
    case "GeometryCollection":
      return ba(
        /** @type {import("../geom/GeometryCollection.js").default} */
        n.getGeometries()[0]
      );
    default:
      return "";
  }
}
function Fa() {
  return {
    variables: {},
    properties: {},
    resolution: NaN,
    featureId: null,
    geometryType: ""
  };
}
function he(n, t, e) {
  const i = ft(n, t, e);
  return Wt(i);
}
function Wt(n, t) {
  if (n instanceof at) {
    if (n.type === zt && typeof n.value == "string") {
      const i = $s(n.value);
      return function() {
        return i;
      };
    }
    return function() {
      return n.value;
    };
  }
  const e = n.operator;
  switch (e) {
    case T.Number:
    case T.String:
    case T.Coalesce:
      return gu(n);
    case T.Get:
    case T.Var:
    case T.Has:
      return _u(n);
    case T.Id:
      return (i) => i.featureId;
    case T.GeometryType:
      return (i) => i.geometryType;
    case T.Concat: {
      const i = n.args.map((s) => Wt(s));
      return (s) => "".concat(...i.map((r) => r(s).toString()));
    }
    case T.Resolution:
      return (i) => i.resolution;
    case T.Any:
    case T.All:
    case T.Between:
    case T.In:
    case T.Not:
      return pu(n);
    case T.Equal:
    case T.NotEqual:
    case T.LessThan:
    case T.LessThanOrEqualTo:
    case T.GreaterThan:
    case T.GreaterThanOrEqualTo:
      return mu(n);
    case T.Multiply:
    case T.Divide:
    case T.Add:
    case T.Subtract:
    case T.Clamp:
    case T.Mod:
    case T.Pow:
    case T.Abs:
    case T.Floor:
    case T.Ceil:
    case T.Round:
    case T.Sin:
    case T.Cos:
    case T.Atan:
    case T.Sqrt:
      return yu(n);
    case T.Case:
      return Eu(n);
    case T.Match:
      return xu(n);
    case T.Interpolate:
      return Ru(n);
    case T.ToString:
      return Tu(n);
    default:
      throw new Error(`Unsupported operator ${e}`);
  }
}
function gu(n, t) {
  const e = n.operator, i = n.args.length, s = new Array(i);
  for (let r = 0; r < i; ++r)
    s[r] = Wt(n.args[r]);
  switch (e) {
    case T.Coalesce:
      return (r) => {
        for (let o = 0; o < i; ++o) {
          const a = s[o](r);
          if (typeof a < "u" && a !== null)
            return a;
        }
        throw new Error("Expected one of the values to be non-null");
      };
    case T.Number:
    case T.String:
      return (r) => {
        for (let o = 0; o < i; ++o) {
          const a = s[o](r);
          if (typeof a === e)
            return a;
        }
        throw new Error(`Expected one of the values to be a ${e}`);
      };
    default:
      throw new Error(`Unsupported assertion operator ${e}`);
  }
}
function _u(n, t) {
  const i = (
    /** @type {string} */
    /** @type {LiteralExpression} */
    n.args[0].value
  );
  switch (n.operator) {
    case T.Get:
      return (s) => {
        const r = n.args;
        let o = s.properties[i];
        for (let a = 1, l = r.length; a < l; ++a) {
          const c = (
            /** @type {string|number} */
            /** @type {LiteralExpression} */
            r[a].value
          );
          o = o[c];
        }
        return o;
      };
    case T.Var:
      return (s) => s.variables[i];
    case T.Has:
      return (s) => {
        const r = n.args;
        if (!(i in s.properties))
          return !1;
        let o = s.properties[i];
        for (let a = 1, l = r.length; a < l; ++a) {
          const c = (
            /** @type {string|number} */
            /** @type {LiteralExpression} */
            r[a].value
          );
          if (!o || !Object.hasOwn(o, c))
            return !1;
          o = o[c];
        }
        return !0;
      };
    default:
      throw new Error(`Unsupported accessor operator ${n.operator}`);
  }
}
function mu(n, t) {
  const e = n.operator, i = Wt(n.args[0]), s = Wt(n.args[1]);
  switch (e) {
    case T.Equal:
      return (r) => i(r) === s(r);
    case T.NotEqual:
      return (r) => i(r) !== s(r);
    case T.LessThan:
      return (r) => i(r) < s(r);
    case T.LessThanOrEqualTo:
      return (r) => i(r) <= s(r);
    case T.GreaterThan:
      return (r) => i(r) > s(r);
    case T.GreaterThanOrEqualTo:
      return (r) => i(r) >= s(r);
    default:
      throw new Error(`Unsupported comparison operator ${e}`);
  }
}
function pu(n, t) {
  const e = n.operator, i = n.args.length, s = new Array(i);
  for (let r = 0; r < i; ++r)
    s[r] = Wt(n.args[r]);
  switch (e) {
    case T.Any:
      return (r) => {
        for (let o = 0; o < i; ++o)
          if (s[o](r))
            return !0;
        return !1;
      };
    case T.All:
      return (r) => {
        for (let o = 0; o < i; ++o)
          if (!s[o](r))
            return !1;
        return !0;
      };
    case T.Between:
      return (r) => {
        const o = s[0](r), a = s[1](r), l = s[2](r);
        return o >= a && o <= l;
      };
    case T.In:
      return (r) => {
        const o = s[0](r);
        for (let a = 1; a < i; ++a)
          if (o === s[a](r))
            return !0;
        return !1;
      };
    case T.Not:
      return (r) => !s[0](r);
    default:
      throw new Error(`Unsupported logical operator ${e}`);
  }
}
function yu(n, t) {
  const e = n.operator, i = n.args.length, s = new Array(i);
  for (let r = 0; r < i; ++r)
    s[r] = Wt(n.args[r]);
  switch (e) {
    case T.Multiply:
      return (r) => {
        let o = 1;
        for (let a = 0; a < i; ++a)
          o *= s[a](r);
        return o;
      };
    case T.Divide:
      return (r) => s[0](r) / s[1](r);
    case T.Add:
      return (r) => {
        let o = 0;
        for (let a = 0; a < i; ++a)
          o += s[a](r);
        return o;
      };
    case T.Subtract:
      return (r) => s[0](r) - s[1](r);
    case T.Clamp:
      return (r) => {
        const o = s[0](r), a = s[1](r);
        if (o < a)
          return a;
        const l = s[2](r);
        return o > l ? l : o;
      };
    case T.Mod:
      return (r) => s[0](r) % s[1](r);
    case T.Pow:
      return (r) => Math.pow(s[0](r), s[1](r));
    case T.Abs:
      return (r) => Math.abs(s[0](r));
    case T.Floor:
      return (r) => Math.floor(s[0](r));
    case T.Ceil:
      return (r) => Math.ceil(s[0](r));
    case T.Round:
      return (r) => Math.round(s[0](r));
    case T.Sin:
      return (r) => Math.sin(s[0](r));
    case T.Cos:
      return (r) => Math.cos(s[0](r));
    case T.Atan:
      return i === 2 ? (r) => Math.atan2(s[0](r), s[1](r)) : (r) => Math.atan(s[0](r));
    case T.Sqrt:
      return (r) => Math.sqrt(s[0](r));
    default:
      throw new Error(`Unsupported numeric operator ${e}`);
  }
}
function Eu(n, t) {
  const e = n.args.length, i = new Array(e);
  for (let s = 0; s < e; ++s)
    i[s] = Wt(n.args[s]);
  return (s) => {
    for (let r = 0; r < e - 1; r += 2)
      if (i[r](s))
        return i[r + 1](s);
    return i[e - 1](s);
  };
}
function xu(n, t) {
  const e = n.args.length, i = new Array(e);
  for (let s = 0; s < e; ++s)
    i[s] = Wt(n.args[s]);
  return (s) => {
    const r = i[0](s);
    for (let o = 1; o < e; o += 2)
      if (r === i[o](s))
        return i[o + 1](s);
    return i[e - 1](s);
  };
}
function Ru(n, t) {
  const e = n.args.length, i = new Array(e);
  for (let s = 0; s < e; ++s)
    i[s] = Wt(n.args[s]);
  return (s) => {
    const r = i[0](s), o = i[1](s);
    let a, l;
    for (let h = 2; h < e; h += 2) {
      const c = i[h](s);
      let u = i[h + 1](s);
      const d = Array.isArray(u);
      if (d && (u = Oh(u)), c >= o)
        return h === 2 ? u : d ? Su(
          r,
          o,
          a,
          l,
          c,
          u
        ) : Pi(
          r,
          o,
          a,
          l,
          c,
          u
        );
      a = c, l = u;
    }
    return l;
  };
}
function Tu(n, t) {
  const e = n.operator, i = n.args.length, s = new Array(i);
  for (let r = 0; r < i; ++r)
    s[r] = Wt(n.args[r]);
  switch (e) {
    case T.ToString:
      return (r) => {
        const o = s[0](r);
        return n.args[0].type === zt ? qs(o) : o.toString();
      };
    default:
      throw new Error(`Unsupported convert operator ${e}`);
  }
}
function Pi(n, t, e, i, s, r) {
  const o = s - e;
  if (o === 0)
    return i;
  const a = t - e, l = n === 1 ? a / o : (Math.pow(n, a) - 1) / (Math.pow(n, o) - 1);
  return i + l * (r - i);
}
function Su(n, t, e, i, s, r) {
  if (s - e === 0)
    return i;
  const a = Yr(i), l = Yr(r);
  let h = l[2] - a[2];
  h > 180 ? h -= 360 : h < -180 && (h += 360);
  const c = [
    Pi(n, t, e, a[0], s, l[0]),
    Pi(n, t, e, a[1], s, l[1]),
    a[2] + Pi(n, t, e, 0, s, h),
    Pi(n, t, e, i[3], s, r[3])
  ];
  return oa(Ph(c));
}
function wu(n) {
  return !0;
}
function Iu(n) {
  const t = La(), e = Cu(n, t), i = Fa();
  return function(s, r) {
    if (i.properties = s.getPropertiesInternal(), i.resolution = r, t.featureId) {
      const o = s.getId();
      o !== void 0 ? i.featureId = o : i.featureId = null;
    }
    return t.geometryType && (i.geometryType = ba(
      s.getGeometry()
    )), e(i);
  };
}
function mo(n) {
  const t = La(), e = n.length, i = new Array(e);
  for (let o = 0; o < e; ++o)
    i[o] = Rs(n[o], t);
  const s = Fa(), r = new Array(e);
  return function(o, a) {
    if (s.properties = o.getPropertiesInternal(), s.resolution = a, t.featureId) {
      const h = o.getId();
      h !== void 0 ? s.featureId = h : s.featureId = null;
    }
    let l = 0;
    for (let h = 0; h < e; ++h) {
      const c = i[h](s);
      c && (r[l] = c, l += 1);
    }
    return r.length = l, r;
  };
}
function Cu(n, t) {
  const e = n.length, i = new Array(e);
  for (let s = 0; s < e; ++s) {
    const r = n[s], o = "filter" in r ? he(r.filter, xt, t) : wu;
    let a;
    if (Array.isArray(r.style)) {
      const l = r.style.length;
      a = new Array(l);
      for (let h = 0; h < l; ++h)
        a[h] = Rs(r.style[h], t);
    } else
      a = [Rs(r.style, t)];
    i[s] = { filter: o, styles: a };
  }
  return function(s) {
    const r = [];
    let o = !1;
    for (let a = 0; a < e; ++a) {
      const l = i[a].filter;
      if (l(s) && !(n[a].else && o)) {
        o = !0;
        for (const h of i[a].styles) {
          const c = h(s);
          c && r.push(c);
        }
      }
    }
    return r;
  };
}
function Rs(n, t) {
  const e = Zi(n, "", t), i = Ki(n, "", t), s = Au(n, t), r = vu(n, t), o = wt(n, "z-index", t);
  if (!e && !i && !s && !r && !fi(n))
    throw new Error(
      "No fill, stroke, point, or text symbolizer properties in style: " + JSON.stringify(n)
    );
  const a = new Re();
  return function(l) {
    let h = !0;
    if (e) {
      const c = e(l);
      c && (h = !1), a.setFill(c);
    }
    if (i) {
      const c = i(l);
      c && (h = !1), a.setStroke(c);
    }
    if (s) {
      const c = s(l);
      c && (h = !1), a.setText(c);
    }
    if (r) {
      const c = r(l);
      c && (h = !1), a.setImage(c);
    }
    return o && a.setZIndex(o(l)), h ? null : a;
  };
}
function Zi(n, t, e) {
  let i;
  if (t + "fill-pattern-src" in n)
    i = Fu(n, t + "fill-", e);
  else {
    if (n[t + "fill-color"] === "none")
      return (r) => null;
    i = sr(
      n,
      t + "fill-color",
      e
    );
  }
  if (!i)
    return null;
  const s = new Hi();
  return function(r) {
    const o = i(r);
    return o === Vs ? null : (s.setColor(o), s);
  };
}
function Ki(n, t, e) {
  const i = wt(
    n,
    t + "stroke-width",
    e
  ), s = sr(
    n,
    t + "stroke-color",
    e
  );
  if (!i && !s)
    return null;
  const r = ie(
    n,
    t + "stroke-line-cap",
    e
  ), o = ie(
    n,
    t + "stroke-line-join",
    e
  ), a = Da(
    n,
    t + "stroke-line-dash",
    e
  ), l = wt(
    n,
    t + "stroke-line-dash-offset",
    e
  ), h = wt(
    n,
    t + "stroke-miter-limit",
    e
  ), c = new Un();
  return function(u) {
    if (s) {
      const d = s(u);
      if (d === Vs)
        return null;
      c.setColor(d);
    }
    if (i && c.setWidth(i(u)), r) {
      const d = r(u);
      if (d !== "butt" && d !== "round" && d !== "square")
        throw new Error("Expected butt, round, or square line cap");
      c.setLineCap(d);
    }
    if (o) {
      const d = o(u);
      if (d !== "bevel" && d !== "round" && d !== "miter")
        throw new Error("Expected bevel, round, or miter line join");
      c.setLineJoin(d);
    }
    return a && c.setLineDash(a(u)), l && c.setLineDashOffset(l(u)), h && c.setMiterLimit(h(u)), c;
  };
}
function Au(n, t) {
  const e = "text-", i = ie(n, e + "value", t);
  if (!i)
    return null;
  const s = Zi(n, e, t), r = Zi(
    n,
    e + "background-",
    t
  ), o = Ki(n, e, t), a = Ki(
    n,
    e + "background-",
    t
  ), l = ie(n, e + "font", t), h = wt(
    n,
    e + "max-angle",
    t
  ), c = wt(
    n,
    e + "offset-x",
    t
  ), u = wt(
    n,
    e + "offset-y",
    t
  ), d = li(
    n,
    e + "overflow",
    t
  ), g = ie(
    n,
    e + "placement",
    t
  ), f = wt(n, e + "repeat", t), _ = Yn(n, e + "scale", t), m = li(
    n,
    e + "rotate-with-view",
    t
  ), p = wt(
    n,
    e + "rotation",
    t
  ), y = ie(n, e + "align", t), R = ie(
    n,
    e + "justify",
    t
  ), E = ie(
    n,
    e + "baseline",
    t
  ), x = li(
    n,
    e + "keep-upright",
    t
  ), w = Da(
    n,
    e + "padding",
    t
  ), v = Bn(
    n,
    e + "declutter-mode"
  ), S = new Qs({ declutterMode: v });
  return function(A) {
    if (S.setText(i(A)), s && S.setFill(s(A)), r && S.setBackgroundFill(r(A)), o && S.setStroke(o(A)), a && S.setBackgroundStroke(a(A)), l && S.setFont(l(A)), h && S.setMaxAngle(h(A)), c && S.setOffsetX(c(A)), u && S.setOffsetY(u(A)), d && S.setOverflow(d(A)), g) {
      const I = g(A);
      if (I !== "point" && I !== "line")
        throw new Error("Expected point or line for text-placement");
      S.setPlacement(I);
    }
    if (f && S.setRepeat(f(A)), _ && S.setScale(_(A)), m && S.setRotateWithView(m(A)), p && S.setRotation(p(A)), y) {
      const I = y(A);
      if (I !== "left" && I !== "center" && I !== "right" && I !== "end" && I !== "start")
        throw new Error(
          "Expected left, right, center, start, or end for text-align"
        );
      S.setTextAlign(I);
    }
    if (R) {
      const I = R(A);
      if (I !== "left" && I !== "right" && I !== "center")
        throw new Error("Expected left, right, or center for text-justify");
      S.setJustify(I);
    }
    if (E) {
      const I = E(A);
      if (I !== "bottom" && I !== "top" && I !== "middle" && I !== "alphabetic" && I !== "hanging")
        throw new Error(
          "Expected bottom, top, middle, alphabetic, or hanging for text-baseline"
        );
      S.setTextBaseline(I);
    }
    return w && S.setPadding(w(A)), x && S.setKeepUpright(x(A)), S;
  };
}
function vu(n, t) {
  return "icon-src" in n ? Mu(n, t) : "shape-points" in n ? Lu(n, t) : "circle-radius" in n ? bu(n, t) : null;
}
function Mu(n, t) {
  const e = "icon-", i = e + "src", s = Oa(n[i], i), r = Cn(
    n,
    e + "anchor",
    t
  ), o = Yn(n, e + "scale", t), a = wt(
    n,
    e + "opacity",
    t
  ), l = Cn(
    n,
    e + "displacement",
    t
  ), h = wt(
    n,
    e + "rotation",
    t
  ), c = li(
    n,
    e + "rotate-with-view",
    t
  ), u = yo(n, e + "anchor-origin"), d = Eo(
    n,
    e + "anchor-x-units"
  ), g = Eo(
    n,
    e + "anchor-y-units"
  ), f = ku(n, e + "color"), _ = Ou(n, e + "cross-origin"), m = Pu(n, e + "offset"), p = yo(n, e + "offset-origin"), y = An(n, e + "width"), R = An(n, e + "height"), E = Du(n, e + "size"), x = Bn(
    n,
    e + "declutter-mode"
  ), w = new Ji({
    src: s,
    anchorOrigin: u,
    anchorXUnits: d,
    anchorYUnits: g,
    color: f,
    crossOrigin: _,
    offset: m,
    offsetOrigin: p,
    height: R,
    width: y,
    size: E,
    declutterMode: x
  });
  return function(v) {
    return a && w.setOpacity(a(v)), l && w.setDisplacement(l(v)), h && w.setRotation(h(v)), c && w.setRotateWithView(c(v)), o && w.setScale(o(v)), r && w.setAnchor(r(v)), w;
  };
}
function Lu(n, t) {
  const e = "shape-", i = e + "points", s = e + "radius", r = Ts(n[i], i), o = Ts(n[s], s), a = Zi(n, e, t), l = Ki(n, e, t), h = Yn(n, e + "scale", t), c = Cn(
    n,
    e + "displacement",
    t
  ), u = wt(
    n,
    e + "rotation",
    t
  ), d = li(
    n,
    e + "rotate-with-view",
    t
  ), g = An(n, e + "radius2"), f = An(n, e + "angle"), _ = Bn(
    n,
    e + "declutter-mode"
  ), m = new zn({
    points: r,
    radius: o,
    radius2: g,
    angle: f,
    declutterMode: _
  });
  return function(p) {
    return a && m.setFill(a(p)), l && m.setStroke(l(p)), c && m.setDisplacement(c(p)), u && m.setRotation(u(p)), d && m.setRotateWithView(d(p)), h && m.setScale(h(p)), m;
  };
}
function bu(n, t) {
  const e = "circle-", i = Zi(n, e, t), s = Ki(n, e, t), r = wt(n, e + "radius", t), o = Yn(n, e + "scale", t), a = Cn(
    n,
    e + "displacement",
    t
  ), l = wt(
    n,
    e + "rotation",
    t
  ), h = li(
    n,
    e + "rotate-with-view",
    t
  ), c = Bn(
    n,
    e + "declutter-mode"
  ), u = new Wn({
    radius: 5,
    // this is arbitrary, but required - the evaluated radius is used below
    declutterMode: c
  });
  return function(d) {
    return r && u.setRadius(r(d)), i && u.setFill(i(d)), s && u.setStroke(s(d)), a && u.setDisplacement(a(d)), l && u.setRotation(l(d)), h && u.setRotateWithView(h(d)), o && u.setScale(o(d)), u;
  };
}
function wt(n, t, e) {
  if (!(t in n))
    return;
  const i = he(n[t], K, e);
  return function(s) {
    return Ts(i(s), t);
  };
}
function ie(n, t, e) {
  if (!(t in n))
    return null;
  const i = he(n[t], Tt, e);
  return function(s) {
    return Oa(i(s), t);
  };
}
function Fu(n, t, e) {
  const i = ie(
    n,
    t + "pattern-src",
    e
  ), s = po(
    n,
    t + "pattern-offset",
    e
  ), r = po(
    n,
    t + "pattern-size",
    e
  ), o = sr(
    n,
    t + "color",
    e
  );
  return function(a) {
    return {
      src: i(a),
      offset: s && s(a),
      size: r && r(a),
      color: o && o(a)
    };
  };
}
function li(n, t, e) {
  if (!(t in n))
    return null;
  const i = he(n[t], xt, e);
  return function(s) {
    const r = i(s);
    if (typeof r != "boolean")
      throw new Error(`Expected a boolean for ${t}`);
    return r;
  };
}
function sr(n, t, e) {
  if (!(t in n))
    return null;
  const i = he(n[t], zt, e);
  return function(s) {
    return Pa(i(s), t);
  };
}
function Da(n, t, e) {
  if (!(t in n))
    return null;
  const i = he(n[t], Ne, e);
  return function(s) {
    return tn(i(s), t);
  };
}
function Cn(n, t, e) {
  if (!(t in n))
    return null;
  const i = he(n[t], Ne, e);
  return function(s) {
    const r = tn(i(s), t);
    if (r.length !== 2)
      throw new Error(`Expected two numbers for ${t}`);
    return r;
  };
}
function po(n, t, e) {
  if (!(t in n))
    return null;
  const i = he(n[t], Ne, e);
  return function(s) {
    return ka(i(s), t);
  };
}
function Yn(n, t, e) {
  if (!(t in n))
    return null;
  const i = he(
    n[t],
    Ne | K,
    e
  );
  return function(s) {
    return Gu(i(s), t);
  };
}
function An(n, t) {
  const e = n[t];
  if (e !== void 0) {
    if (typeof e != "number")
      throw new Error(`Expected a number for ${t}`);
    return e;
  }
}
function Du(n, t) {
  const e = n[t];
  if (e !== void 0) {
    if (typeof e == "number")
      return dt(e);
    if (!Array.isArray(e))
      throw new Error(`Expected a number or size array for ${t}`);
    if (e.length !== 2 || typeof e[0] != "number" || typeof e[1] != "number")
      throw new Error(`Expected a number or size array for ${t}`);
    return e;
  }
}
function Ou(n, t) {
  const e = n[t];
  if (e !== void 0) {
    if (typeof e != "string")
      throw new Error(`Expected a string for ${t}`);
    return e;
  }
}
function yo(n, t) {
  const e = n[t];
  if (e !== void 0) {
    if (e !== "bottom-left" && e !== "bottom-right" && e !== "top-left" && e !== "top-right")
      throw new Error(
        `Expected bottom-left, bottom-right, top-left, or top-right for ${t}`
      );
    return e;
  }
}
function Eo(n, t) {
  const e = n[t];
  if (e !== void 0) {
    if (e !== "pixels" && e !== "fraction")
      throw new Error(`Expected pixels or fraction for ${t}`);
    return e;
  }
}
function Pu(n, t) {
  const e = n[t];
  if (e !== void 0)
    return tn(e, t);
}
function Bn(n, t) {
  const e = n[t];
  if (e !== void 0) {
    if (typeof e != "string")
      throw new Error(`Expected a string for ${t}`);
    if (e !== "declutter" && e !== "obstacle" && e !== "none")
      throw new Error(`Expected declutter, obstacle, or none for ${t}`);
    return e;
  }
}
function ku(n, t) {
  const e = n[t];
  if (e !== void 0)
    return Pa(e, t);
}
function tn(n, t) {
  if (!Array.isArray(n))
    throw new Error(`Expected an array for ${t}`);
  const e = n.length;
  for (let i = 0; i < e; ++i)
    if (typeof n[i] != "number")
      throw new Error(`Expected an array of numbers for ${t}`);
  return n;
}
function Oa(n, t) {
  if (typeof n != "string")
    throw new Error(`Expected a string for ${t}`);
  return n;
}
function Ts(n, t) {
  if (typeof n != "number")
    throw new Error(`Expected a number for ${t}`);
  return n;
}
function Pa(n, t) {
  if (typeof n == "string")
    return n;
  const e = tn(n, t), i = e.length;
  if (i < 3 || i > 4)
    throw new Error(`Expected a color with 3 or 4 values for ${t}`);
  return e;
}
function ka(n, t) {
  const e = tn(n, t);
  if (e.length !== 2)
    throw new Error(`Expected an array of two numbers for ${t}`);
  return e;
}
function Gu(n, t) {
  return typeof n == "number" ? n : ka(n, t);
}
const Nt = {
  CENTER: "center",
  RESOLUTION: "resolution",
  ROTATION: "rotation"
};
function xo(n, t, e) {
  return (
    /**
     * @param {import("./coordinate.js").Coordinate|undefined} center Center.
     * @param {number|undefined} resolution Resolution.
     * @param {import("./size.js").Size} size Viewport size; unused if `onlyCenter` was specified.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @param {Array<number>} [centerShift] Shift between map center and viewport center.
     * @return {import("./coordinate.js").Coordinate|undefined} Center.
     */
    function(i, s, r, o, a) {
      if (!i)
        return;
      if (!s && !t)
        return i;
      const l = t ? 0 : r[0] * s, h = t ? 0 : r[1] * s, c = a ? a[0] : 0, u = a ? a[1] : 0;
      let d = n[0] + l / 2 + c, g = n[2] - l / 2 + c, f = n[1] + h / 2 + u, _ = n[3] - h / 2 + u;
      d > g && (d = (g + d) / 2, g = d), f > _ && (f = (_ + f) / 2, _ = f);
      let m = st(i[0], d, g), p = st(i[1], f, _);
      if (o && e && s) {
        const y = 30 * s;
        m += -y * Math.log(1 + Math.max(0, d - i[0]) / y) + y * Math.log(1 + Math.max(0, i[0] - g) / y), p += -y * Math.log(1 + Math.max(0, f - i[1]) / y) + y * Math.log(1 + Math.max(0, i[1] - _) / y);
      }
      return [m, p];
    }
  );
}
function Nu(n) {
  return n;
}
function Ga(n) {
  return Math.pow(n, 3);
}
function Xu(n) {
  return 1 - Ga(1 - n);
}
function zu(n) {
  return 3 * n * n - 2 * n * n * n;
}
function rr(n, t, e, i) {
  const s = $(t) / e[0], r = lt(t) / e[1];
  return i ? Math.min(n, Math.max(s, r)) : Math.min(n, Math.min(s, r));
}
function or(n, t, e) {
  let i = Math.min(n, t);
  const s = 50;
  return i *= Math.log(1 + s * Math.max(0, n / t - 1)) / s + 1, e && (i = Math.max(i, e), i /= Math.log(1 + s * Math.max(0, e / n - 1)) / s + 1), st(i, e / 2, t * 2);
}
function Wu(n, t, e, i) {
  return t = t !== void 0 ? t : !0, /**
   * @param {number|undefined} resolution Resolution.
   * @param {number} direction Direction.
   * @param {import("./size.js").Size} size Viewport size.
   * @param {boolean} [isMoving] True if an interaction or animation is in progress.
   * @return {number|undefined} Resolution.
   */
  function(s, r, o, a) {
    if (s !== void 0) {
      const l = n[0], h = n[n.length - 1], c = e ? rr(
        l,
        e,
        o,
        i
      ) : l;
      if (a)
        return t ? or(
          s,
          c,
          h
        ) : st(s, h, c);
      const u = Math.min(c, s), d = Math.floor(vs(n, u, r));
      return n[d] > c && d < n.length - 1 ? n[d + 1] : n[d];
    }
  };
}
function Uu(n, t, e, i, s, r) {
  return i = i !== void 0 ? i : !0, e = e !== void 0 ? e : 0, /**
   * @param {number|undefined} resolution Resolution.
   * @param {number} direction Direction.
   * @param {import("./size.js").Size} size Viewport size.
   * @param {boolean} [isMoving] True if an interaction or animation is in progress.
   * @return {number|undefined} Resolution.
   */
  function(o, a, l, h) {
    if (o !== void 0) {
      const c = s ? rr(
        t,
        s,
        l,
        r
      ) : t;
      if (h)
        return i ? or(
          o,
          c,
          e
        ) : st(o, e, c);
      const u = 1e-9, d = Math.ceil(
        Math.log(t / c) / Math.log(n) - u
      ), g = -a * (0.5 - u) + 0.5, f = Math.min(c, o), _ = Math.floor(
        Math.log(t / f) / Math.log(n) + g
      ), m = Math.max(d, _), p = t / Math.pow(n, m);
      return st(p, e, c);
    }
  };
}
function Ro(n, t, e, i, s) {
  return e = e !== void 0 ? e : !0, /**
   * @param {number|undefined} resolution Resolution.
   * @param {number} direction Direction.
   * @param {import("./size.js").Size} size Viewport size.
   * @param {boolean} [isMoving] True if an interaction or animation is in progress.
   * @return {number|undefined} Resolution.
   */
  function(r, o, a, l) {
    if (r !== void 0) {
      const h = i ? rr(
        n,
        i,
        a,
        s
      ) : n;
      return !e || !l ? st(r, t, h) : or(
        r,
        h,
        t
      );
    }
  };
}
function Yu(n) {
  if (n !== void 0)
    return 0;
}
function To(n) {
  if (n !== void 0)
    return n;
}
function Bu(n) {
  const t = 2 * Math.PI / n;
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function(e, i) {
      if (i)
        return e;
      if (e !== void 0)
        return e = Math.floor(e / t + 0.5) * t, e;
    }
  );
}
function ju(n) {
  const t = Ee(5);
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function(e, i) {
      return i || e === void 0 ? e : Math.abs(e) <= t ? 0 : e;
    }
  );
}
const Zu = 42, ar = 256, ls = 0;
class Ss extends Ie {
  /**
   * @param {ViewOptions} [options] View options.
   */
  constructor(t) {
    super(), this.on, this.once, this.un, t = Object.assign({}, t), this.hints_ = [0, 0], this.animations_ = [], this.updateAnimationKey_, this.projection_ = Us(t.projection, "EPSG:3857"), this.viewportSize_ = [100, 100], this.targetCenter_ = null, this.targetResolution_, this.targetRotation_, this.nextCenter_ = null, this.nextResolution_, this.nextRotation_, this.cancelAnchor_ = void 0, t.projection && ea(), t.center && (t.center = ce(t.center, this.projection_)), t.extent && (t.extent = pe(t.extent, this.projection_)), this.applyOptions_(t);
  }
  /**
   * Set up the view with the given options.
   * @param {ViewOptions} options View options.
   */
  applyOptions_(t) {
    const e = Object.assign({}, t);
    for (const a in Nt)
      delete e[a];
    this.setProperties(e, !0);
    const i = Vu(t);
    this.maxResolution_ = i.maxResolution, this.minResolution_ = i.minResolution, this.zoomFactor_ = i.zoomFactor, this.resolutions_ = t.resolutions, this.padding_ = t.padding, this.minZoom_ = i.minZoom;
    const s = Ku(t), r = i.constraint, o = $u(t);
    this.constraints_ = {
      center: s,
      resolution: r,
      rotation: o
    }, this.setRotation(t.rotation !== void 0 ? t.rotation : 0), this.setCenterInternal(
      t.center !== void 0 ? t.center : null
    ), t.resolution !== void 0 ? this.setResolution(t.resolution) : t.zoom !== void 0 && this.setZoom(t.zoom);
  }
  /**
   * Padding (in css pixels).
   * If the map viewport is partially covered with other content (overlays) along
   * its edges, this setting allows to shift the center of the viewport away from that
   * content. The order of the values in the array is top, right, bottom, left.
   * The default is no padding, which is equivalent to `[0, 0, 0, 0]`.
   * @type {Array<number>|undefined}
   * @api
   */
  get padding() {
    return this.padding_;
  }
  set padding(t) {
    let e = this.padding_;
    this.padding_ = t;
    const i = this.getCenterInternal();
    if (i) {
      const s = t || [0, 0, 0, 0];
      e = e || [0, 0, 0, 0];
      const r = this.getResolution(), o = r / 2 * (s[3] - e[3] + e[1] - s[1]), a = r / 2 * (s[0] - e[0] + e[2] - s[2]);
      this.setCenterInternal([i[0] + o, i[1] - a]);
    }
  }
  /**
   * Get an updated version of the view options used to construct the view.  The
   * current resolution (or zoom), center, and rotation are applied to any stored
   * options.  The provided options can be used to apply new min/max zoom or
   * resolution limits.
   * @param {ViewOptions} newOptions New options to be applied.
   * @return {ViewOptions} New options updated with the current view state.
   */
  getUpdatedOptions_(t) {
    const e = this.getProperties();
    return e.resolution !== void 0 ? e.resolution = this.getResolution() : e.zoom = this.getZoom(), e.center = this.getCenterInternal(), e.rotation = this.getRotation(), Object.assign({}, e, t);
  }
  /**
   * Animate the view.  The view's center, zoom (or resolution), and rotation
   * can be animated for smooth transitions between view states.  For example,
   * to animate the view to a new zoom level:
   *
   *     view.animate({zoom: view.getZoom() + 1});
   *
   * By default, the animation lasts one second and uses in-and-out easing.  You
   * can customize this behavior by including `duration` (in milliseconds) and
   * `easing` options (see {@link module:ol/easing}).
   *
   * To chain together multiple animations, call the method with multiple
   * animation objects.  For example, to first zoom and then pan:
   *
   *     view.animate({zoom: 10}, {center: [0, 0]});
   *
   * If you provide a function as the last argument to the animate method, it
   * will get called at the end of an animation series.  The callback will be
   * called with `true` if the animation series completed on its own or `false`
   * if it was cancelled.
   *
   * Animations are cancelled by user interactions (e.g. dragging the map) or by
   * calling `view.setCenter()`, `view.setResolution()`, or `view.setRotation()`
   * (or another method that calls one of these).
   *
   * @param {...(AnimationOptions|function(boolean): void)} var_args Animation
   *     options.  Multiple animations can be run in series by passing multiple
   *     options objects.  To run multiple animations in parallel, call the method
   *     multiple times.  An optional callback can be provided as a final
   *     argument.  The callback will be called with a boolean indicating whether
   *     the animation completed without being cancelled.
   * @api
   */
  animate(t) {
    this.isDef() && !this.getAnimating() && this.resolveConstraints(0);
    const e = new Array(arguments.length);
    for (let i = 0; i < e.length; ++i) {
      let s = arguments[i];
      s.center && (s = Object.assign({}, s), s.center = ce(
        s.center,
        this.getProjection()
      )), s.anchor && (s = Object.assign({}, s), s.anchor = ce(
        s.anchor,
        this.getProjection()
      )), e[i] = s;
    }
    this.animateInternal.apply(this, e);
  }
  /**
   * @param {...(AnimationOptions|function(boolean): void)} var_args Animation options.
   */
  animateInternal(t) {
    let e = arguments.length, i;
    e > 1 && typeof arguments[e - 1] == "function" && (i = arguments[e - 1], --e);
    let s = 0;
    for (; s < e && !this.isDef(); ++s) {
      const c = arguments[s];
      c.center && this.setCenterInternal(c.center), c.zoom !== void 0 ? this.setZoom(c.zoom) : c.resolution && this.setResolution(c.resolution), c.rotation !== void 0 && this.setRotation(c.rotation);
    }
    if (s === e) {
      i && dn(i, !0);
      return;
    }
    let r = Date.now(), o = this.targetCenter_.slice(), a = this.targetResolution_, l = this.targetRotation_;
    const h = [];
    for (; s < e; ++s) {
      const c = (
        /** @type {AnimationOptions} */
        arguments[s]
      ), u = {
        start: r,
        complete: !1,
        anchor: c.anchor,
        duration: c.duration !== void 0 ? c.duration : 1e3,
        easing: c.easing || zu,
        callback: i
      };
      if (c.center && (u.sourceCenter = o, u.targetCenter = c.center.slice(), o = u.targetCenter), c.zoom !== void 0 ? (u.sourceResolution = a, u.targetResolution = this.getResolutionForZoom(c.zoom), a = u.targetResolution) : c.resolution && (u.sourceResolution = a, u.targetResolution = c.resolution, a = u.targetResolution), c.rotation !== void 0) {
        u.sourceRotation = l;
        const d = se(c.rotation - l + Math.PI, 2 * Math.PI) - Math.PI;
        u.targetRotation = l + d, l = u.targetRotation;
      }
      qu(u) ? u.complete = !0 : r += u.duration, h.push(u);
    }
    this.animations_.push(h), this.setHint(Ot.ANIMATING, 1), this.updateAnimations_();
  }
  /**
   * Determine if the view is being animated.
   * @return {boolean} The view is being animated.
   * @api
   */
  getAnimating() {
    return this.hints_[Ot.ANIMATING] > 0;
  }
  /**
   * Determine if the user is interacting with the view, such as panning or zooming.
   * @return {boolean} The view is being interacted with.
   * @api
   */
  getInteracting() {
    return this.hints_[Ot.INTERACTING] > 0;
  }
  /**
   * Cancel any ongoing animations.
   * @api
   */
  cancelAnimations() {
    this.setHint(Ot.ANIMATING, -this.hints_[Ot.ANIMATING]);
    let t;
    for (let e = 0, i = this.animations_.length; e < i; ++e) {
      const s = this.animations_[e];
      if (s[0].callback && dn(s[0].callback, !1), !t)
        for (let r = 0, o = s.length; r < o; ++r) {
          const a = s[r];
          if (!a.complete) {
            t = a.anchor;
            break;
          }
        }
    }
    this.animations_.length = 0, this.cancelAnchor_ = t, this.nextCenter_ = null, this.nextResolution_ = NaN, this.nextRotation_ = NaN;
  }
  /**
   * Update all animations.
   */
  updateAnimations_() {
    if (this.updateAnimationKey_ !== void 0 && (cancelAnimationFrame(this.updateAnimationKey_), this.updateAnimationKey_ = void 0), !this.getAnimating())
      return;
    const t = Date.now();
    let e = !1;
    for (let i = this.animations_.length - 1; i >= 0; --i) {
      const s = this.animations_[i];
      let r = !0;
      for (let o = 0, a = s.length; o < a; ++o) {
        const l = s[o];
        if (l.complete)
          continue;
        const h = t - l.start;
        let c = l.duration > 0 ? h / l.duration : 1;
        c >= 1 ? (l.complete = !0, c = 1) : r = !1;
        const u = l.easing(c);
        if (l.sourceCenter) {
          const d = l.sourceCenter[0], g = l.sourceCenter[1], f = l.targetCenter[0], _ = l.targetCenter[1];
          this.nextCenter_ = l.targetCenter;
          const m = d + u * (f - d), p = g + u * (_ - g);
          this.targetCenter_ = [m, p];
        }
        if (l.sourceResolution && l.targetResolution) {
          const d = u === 1 ? l.targetResolution : l.sourceResolution + u * (l.targetResolution - l.sourceResolution);
          if (l.anchor) {
            const g = this.getViewportSize_(this.getRotation()), f = this.constraints_.resolution(
              d,
              0,
              g,
              !0
            );
            this.targetCenter_ = this.calculateCenterZoom(
              f,
              l.anchor
            );
          }
          this.nextResolution_ = l.targetResolution, this.targetResolution_ = d, this.applyTargetState_(!0);
        }
        if (l.sourceRotation !== void 0 && l.targetRotation !== void 0) {
          const d = u === 1 ? se(l.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : l.sourceRotation + u * (l.targetRotation - l.sourceRotation);
          if (l.anchor) {
            const g = this.constraints_.rotation(
              d,
              !0
            );
            this.targetCenter_ = this.calculateCenterRotate(
              g,
              l.anchor
            );
          }
          this.nextRotation_ = l.targetRotation, this.targetRotation_ = d;
        }
        if (this.applyTargetState_(!0), e = !0, !l.complete)
          break;
      }
      if (r) {
        this.animations_[i] = null, this.setHint(Ot.ANIMATING, -1), this.nextCenter_ = null, this.nextResolution_ = NaN, this.nextRotation_ = NaN;
        const o = s[0].callback;
        o && dn(o, !0);
      }
    }
    this.animations_ = this.animations_.filter(Boolean), e && this.updateAnimationKey_ === void 0 && (this.updateAnimationKey_ = requestAnimationFrame(
      this.updateAnimations_.bind(this)
    ));
  }
  /**
   * @param {number} rotation Target rotation.
   * @param {import("./coordinate.js").Coordinate} anchor Rotation anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for rotation and anchor.
   */
  calculateCenterRotate(t, e) {
    let i;
    const s = this.getCenterInternal();
    return s !== void 0 && (i = [s[0] - e[0], s[1] - e[1]], Nl(i, t - this.getRotation()), Gl(i, e)), i;
  }
  /**
   * @param {number} resolution Target resolution.
   * @param {import("./coordinate.js").Coordinate} anchor Zoom anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for resolution and anchor.
   */
  calculateCenterZoom(t, e) {
    let i;
    const s = this.getCenterInternal(), r = this.getResolution();
    if (s !== void 0 && r !== void 0) {
      const o = e[0] - t * (e[0] - s[0]) / r, a = e[1] - t * (e[1] - s[1]) / r;
      i = [o, a];
    }
    return i;
  }
  /**
   * Returns the current viewport size.
   * @private
   * @param {number} [rotation] Take into account the rotation of the viewport when giving the size
   * @return {import("./size.js").Size} Viewport size or `[100, 100]` when no viewport is found.
   */
  getViewportSize_(t) {
    const e = this.viewportSize_;
    if (t) {
      const i = e[0], s = e[1];
      return [
        Math.abs(i * Math.cos(t)) + Math.abs(s * Math.sin(t)),
        Math.abs(i * Math.sin(t)) + Math.abs(s * Math.cos(t))
      ];
    }
    return e;
  }
  /**
   * Stores the viewport size on the view. The viewport size is not read every time from the DOM
   * to avoid performance hit and layout reflow.
   * This should be done on map size change.
   * Note: the constraints are not resolved during an animation to avoid stopping it
   * @param {import("./size.js").Size} [size] Viewport size; if undefined, [100, 100] is assumed
   */
  setViewportSize(t) {
    this.viewportSize_ = Array.isArray(t) ? t.slice() : [100, 100], this.getAnimating() || this.resolveConstraints(0);
  }
  /**
   * Get the view center.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   * @observable
   * @api
   */
  getCenter() {
    const t = this.getCenterInternal();
    return t && Gr(t, this.getProjection());
  }
  /**
   * Get the view center without transforming to user projection.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   */
  getCenterInternal() {
    return (
      /** @type {import("./coordinate.js").Coordinate|undefined} */
      this.get(Nt.CENTER)
    );
  }
  /**
   * @return {Constraints} Constraints.
   */
  getConstraints() {
    return this.constraints_;
  }
  /**
   * @return {boolean} Resolution constraint is set
   */
  getConstrainResolution() {
    return this.get("constrainResolution");
  }
  /**
   * @param {Array<number>} [hints] Destination array.
   * @return {Array<number>} Hint.
   */
  getHints(t) {
    return t !== void 0 ? (t[0] = this.hints_[0], t[1] = this.hints_[1], t) : this.hints_.slice();
  }
  /**
   * Calculate the extent for the current view state and the passed box size.
   * @param {import("./size.js").Size} [size] The pixel dimensions of the box
   * into which the calculated extent should fit. Defaults to the size of the
   * map the view is associated with.
   * If no map or multiple maps are connected to the view, provide the desired
   * box size (e.g. `map.getSize()`).
   * @return {import("./extent.js").Extent} Extent.
   * @api
   */
  calculateExtent(t) {
    const e = this.calculateExtentInternal(t);
    return ia(e, this.getProjection());
  }
  /**
   * @param {import("./size.js").Size} [size] Box pixel size. If not provided,
   * the map's last known viewport size will be used.
   * @return {import("./extent.js").Extent} Extent.
   */
  calculateExtentInternal(t) {
    t = t || this.getViewportSizeMinusPadding_();
    const e = (
      /** @type {!import("./coordinate.js").Coordinate} */
      this.getCenterInternal()
    );
    et(e, "The view center is not defined");
    const i = (
      /** @type {!number} */
      this.getResolution()
    );
    et(i !== void 0, "The view resolution is not defined");
    const s = (
      /** @type {!number} */
      this.getRotation()
    );
    return et(s !== void 0, "The view rotation is not defined"), Fl(e, i, s, t);
  }
  /**
   * Get the maximum resolution of the view.
   * @return {number} The maximum resolution of the view.
   * @api
   */
  getMaxResolution() {
    return this.maxResolution_;
  }
  /**
   * Get the minimum resolution of the view.
   * @return {number} The minimum resolution of the view.
   * @api
   */
  getMinResolution() {
    return this.minResolution_;
  }
  /**
   * Get the maximum zoom level for the view.
   * @return {number} The maximum zoom level.
   * @api
   */
  getMaxZoom() {
    return (
      /** @type {number} */
      this.getZoomForResolution(this.minResolution_)
    );
  }
  /**
   * Set a new maximum zoom level for the view.
   * @param {number} zoom The maximum zoom level.
   * @api
   */
  setMaxZoom(t) {
    this.applyOptions_(this.getUpdatedOptions_({ maxZoom: t }));
  }
  /**
   * Get the minimum zoom level for the view.
   * @return {number} The minimum zoom level.
   * @api
   */
  getMinZoom() {
    return (
      /** @type {number} */
      this.getZoomForResolution(this.maxResolution_)
    );
  }
  /**
   * Set a new minimum zoom level for the view.
   * @param {number} zoom The minimum zoom level.
   * @api
   */
  setMinZoom(t) {
    this.applyOptions_(this.getUpdatedOptions_({ minZoom: t }));
  }
  /**
   * Set whether the view should allow intermediary zoom levels.
   * @param {boolean} enabled Whether the resolution is constrained.
   * @api
   */
  setConstrainResolution(t) {
    this.applyOptions_(this.getUpdatedOptions_({ constrainResolution: t }));
  }
  /**
   * Get the view projection.
   * @return {import("./proj/Projection.js").default} The projection of the view.
   * @api
   */
  getProjection() {
    return this.projection_;
  }
  /**
   * Get the view resolution.
   * @return {number|undefined} The resolution of the view.
   * @observable
   * @api
   */
  getResolution() {
    return (
      /** @type {number|undefined} */
      this.get(Nt.RESOLUTION)
    );
  }
  /**
   * Get the resolutions for the view. This returns the array of resolutions
   * passed to the constructor of the View, or undefined if none were given.
   * @return {Array<number>|undefined} The resolutions of the view.
   * @api
   */
  getResolutions() {
    return this.resolutions_;
  }
  /**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size} [size] Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   * @api
   */
  getResolutionForExtent(t, e) {
    return this.getResolutionForExtentInternal(
      pe(t, this.getProjection()),
      e
    );
  }
  /**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size} [size] Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   */
  getResolutionForExtentInternal(t, e) {
    e = e || this.getViewportSizeMinusPadding_();
    const i = $(t) / e[0], s = lt(t) / e[1];
    return Math.max(i, s);
  }
  /**
   * Return a function that returns a value between 0 and 1 for a
   * resolution. Exponential scaling is assumed.
   * @param {number} [power] Power.
   * @return {function(number): number} Resolution for value function.
   */
  getResolutionForValueFunction(t) {
    t = t || 2;
    const e = this.getConstrainedResolution(this.maxResolution_), i = this.minResolution_, s = Math.log(e / i) / Math.log(t);
    return (
      /**
       * @param {number} value Value.
       * @return {number} Resolution.
       */
      function(r) {
        return e / Math.pow(t, r * s);
      }
    );
  }
  /**
   * Get the view rotation.
   * @return {number} The rotation of the view in radians.
   * @observable
   * @api
   */
  getRotation() {
    return (
      /** @type {number} */
      this.get(Nt.ROTATION)
    );
  }
  /**
   * Return a function that returns a resolution for a value between
   * 0 and 1. Exponential scaling is assumed.
   * @param {number} [power] Power.
   * @return {function(number): number} Value for resolution function.
   */
  getValueForResolutionFunction(t) {
    const e = Math.log(t || 2), i = this.getConstrainedResolution(this.maxResolution_), s = this.minResolution_, r = Math.log(i / s) / e;
    return (
      /**
       * @param {number} resolution Resolution.
       * @return {number} Value.
       */
      function(o) {
        return Math.log(i / o) / e / r;
      }
    );
  }
  /**
   * Returns the size of the viewport minus padding.
   * @private
   * @param {number} [rotation] Take into account the rotation of the viewport when giving the size
   * @return {import("./size.js").Size} Viewport size reduced by the padding.
   */
  getViewportSizeMinusPadding_(t) {
    let e = this.getViewportSize_(t);
    const i = this.padding_;
    return i && (e = [
      e[0] - i[1] - i[3],
      e[1] - i[0] - i[2]
    ]), e;
  }
  /**
   * @return {State} View state.
   */
  getState() {
    const t = this.getProjection(), e = this.getResolution(), i = this.getRotation();
    let s = (
      /** @type {import("./coordinate.js").Coordinate} */
      this.getCenterInternal()
    );
    const r = this.padding_;
    if (r) {
      const o = this.getViewportSizeMinusPadding_();
      s = hs(
        s,
        this.getViewportSize_(),
        [o[0] / 2 + r[3], o[1] / 2 + r[0]],
        e,
        i
      );
    }
    return {
      center: s.slice(0),
      projection: t !== void 0 ? t : null,
      resolution: e,
      nextCenter: this.nextCenter_,
      nextResolution: this.nextResolution_,
      nextRotation: this.nextRotation_,
      rotation: i,
      zoom: this.getZoom()
    };
  }
  /**
   * @return {ViewStateLayerStateExtent} Like `FrameState`, but just `viewState` and `extent`.
   */
  getViewStateAndExtent() {
    return {
      viewState: this.getState(),
      extent: this.calculateExtent()
    };
  }
  /**
   * Get the current zoom level. This method may return non-integer zoom levels
   * if the view does not constrain the resolution, or if an interaction or
   * animation is underway.
   * @return {number|undefined} Zoom.
   * @api
   */
  getZoom() {
    let t;
    const e = this.getResolution();
    return e !== void 0 && (t = this.getZoomForResolution(e)), t;
  }
  /**
   * Get the zoom level for a resolution.
   * @param {number} resolution The resolution.
   * @return {number|undefined} The zoom level for the provided resolution.
   * @api
   */
  getZoomForResolution(t) {
    let e = this.minZoom_ || 0, i, s;
    if (this.resolutions_) {
      const r = vs(this.resolutions_, t, 1);
      e = r, i = this.resolutions_[r], r == this.resolutions_.length - 1 ? s = 2 : s = i / this.resolutions_[r + 1];
    } else
      i = this.maxResolution_, s = this.zoomFactor_;
    return e + Math.log(i / t) / Math.log(s);
  }
  /**
   * Get the resolution for a zoom level.
   * @param {number} zoom Zoom level.
   * @return {number} The view resolution for the provided zoom level.
   * @api
   */
  getResolutionForZoom(t) {
    var e;
    if ((e = this.resolutions_) != null && e.length) {
      if (this.resolutions_.length === 1)
        return this.resolutions_[0];
      const i = st(
        Math.floor(t),
        0,
        this.resolutions_.length - 2
      ), s = this.resolutions_[i] / this.resolutions_[i + 1];
      return this.resolutions_[i] / Math.pow(s, st(t - i, 0, 1));
    }
    return this.maxResolution_ / Math.pow(this.zoomFactor_, t - this.minZoom_);
  }
  /**
   * Fit the given geometry or extent based on the given map size and border.
   * The size is pixel dimensions of the box to fit the extent into.
   * In most cases you will want to use the map size, that is `map.getSize()`.
   * Takes care of the map angle.
   * @param {import("./geom/SimpleGeometry.js").default|import("./extent.js").Extent} geometryOrExtent The geometry or
   *     extent to fit the view to.
   * @param {FitOptions} [options] Options.
   * @api
   */
  fit(t, e) {
    let i;
    if (et(
      Array.isArray(t) || typeof /** @type {?} */
      t.getSimplifiedGeometry == "function",
      "Invalid extent or geometry provided as `geometry`"
    ), Array.isArray(t)) {
      et(
        !Ps(t),
        "Cannot fit empty extent provided as `geometry`"
      );
      const s = pe(t, this.getProjection());
      i = io(s);
    } else if (t.getType() === "Circle") {
      const s = pe(
        t.getExtent(),
        this.getProjection()
      );
      i = io(s), i.rotate(this.getRotation(), Ge(s));
    } else
      i = t;
    this.fitInternal(i, e);
  }
  /**
   * Calculate rotated extent
   * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
   * @return {import("./extent").Extent} The rotated extent for the geometry.
   */
  rotatedExtentForGeometry(t) {
    const e = this.getRotation(), i = Math.cos(e), s = Math.sin(-e), r = t.getFlatCoordinates(), o = t.getStride();
    let a = 1 / 0, l = 1 / 0, h = -1 / 0, c = -1 / 0;
    for (let u = 0, d = r.length; u < d; u += o) {
      const g = r[u] * i - r[u + 1] * s, f = r[u] * s + r[u + 1] * i;
      a = Math.min(a, g), l = Math.min(l, f), h = Math.max(h, g), c = Math.max(c, f);
    }
    return [a, l, h, c];
  }
  /**
   * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
   * @param {FitOptions} [options] Options.
   */
  fitInternal(t, e) {
    e = e || {};
    let i = e.size;
    i || (i = this.getViewportSizeMinusPadding_());
    const s = e.padding !== void 0 ? e.padding : [0, 0, 0, 0], r = e.nearest !== void 0 ? e.nearest : !1;
    let o;
    e.minResolution !== void 0 ? o = e.minResolution : e.maxZoom !== void 0 ? o = this.getResolutionForZoom(e.maxZoom) : o = 0;
    const a = this.rotatedExtentForGeometry(t);
    let l = this.getResolutionForExtentInternal(a, [
      i[0] - s[1] - s[3],
      i[1] - s[0] - s[2]
    ]);
    l = isNaN(l) ? o : Math.max(l, o), l = this.getConstrainedResolution(l, r ? 0 : 1);
    const h = this.getRotation(), c = Math.sin(h), u = Math.cos(h), d = Ge(a);
    d[0] += (s[1] - s[3]) / 2 * l, d[1] += (s[0] - s[2]) / 2 * l;
    const g = d[0] * u - d[1] * c, f = d[1] * u + d[0] * c, _ = this.getConstrainedCenter([g, f], l), m = e.callback ? e.callback : di;
    e.duration !== void 0 ? this.animateInternal(
      {
        resolution: l,
        center: _,
        duration: e.duration,
        easing: e.easing
      },
      m
    ) : (this.targetResolution_ = l, this.targetCenter_ = _, this.applyTargetState_(!1, !0), dn(m, !0));
  }
  /**
   * Center on coordinate and view position.
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   * @api
   */
  centerOn(t, e, i) {
    this.centerOnInternal(
      ce(t, this.getProjection()),
      e,
      i
    );
  }
  /**
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   */
  centerOnInternal(t, e, i) {
    this.setCenterInternal(
      hs(
        t,
        e,
        i,
        this.getResolution(),
        this.getRotation()
      )
    );
  }
  /**
   * Calculates the shift between map and viewport center.
   * @param {import("./coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {import("./size.js").Size} size Size.
   * @return {Array<number>|undefined} Center shift.
   */
  calculateCenterShift(t, e, i, s) {
    let r;
    const o = this.padding_;
    if (o && t) {
      const a = this.getViewportSizeMinusPadding_(-i), l = hs(
        t,
        s,
        [a[0] / 2 + o[3], a[1] / 2 + o[0]],
        e,
        i
      );
      r = [
        t[0] - l[0],
        t[1] - l[1]
      ];
    }
    return r;
  }
  /**
   * @return {boolean} Is defined.
   */
  isDef() {
    return !!this.getCenterInternal() && this.getResolution() !== void 0;
  }
  /**
   * Adds relative coordinates to the center of the view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
   * @api
   */
  adjustCenter(t) {
    const e = Gr(this.targetCenter_, this.getProjection());
    this.setCenter([
      e[0] + t[0],
      e[1] + t[1]
    ]);
  }
  /**
   * Adds relative coordinates to the center of the view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
   */
  adjustCenterInternal(t) {
    const e = this.targetCenter_;
    this.setCenterInternal([
      e[0] + t[0],
      e[1] + t[1]
    ]);
  }
  /**
   * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} ratio The ratio to apply on the view resolution.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */
  adjustResolution(t, e) {
    e = e && ce(e, this.getProjection()), this.adjustResolutionInternal(t, e);
  }
  /**
   * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} ratio The ratio to apply on the view resolution.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */
  adjustResolutionInternal(t, e) {
    const i = this.getAnimating() || this.getInteracting(), s = this.getViewportSize_(this.getRotation()), r = this.constraints_.resolution(
      this.targetResolution_ * t,
      0,
      s,
      i
    );
    e && (this.targetCenter_ = this.calculateCenterZoom(r, e)), this.targetResolution_ *= t, this.applyTargetState_();
  }
  /**
   * Adds a value to the view zoom level, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} delta Relative value to add to the zoom level.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */
  adjustZoom(t, e) {
    this.adjustResolution(Math.pow(this.zoomFactor_, -t), e);
  }
  /**
   * Adds a value to the view rotation, optionally using an anchor. Any rotation
   * constraint will apply.
   * @param {number} delta Relative value to add to the zoom rotation, in radians.
   * @param {import("./coordinate.js").Coordinate} [anchor] The rotation center.
   * @api
   */
  adjustRotation(t, e) {
    e && (e = ce(e, this.getProjection())), this.adjustRotationInternal(t, e);
  }
  /**
   * @param {number} delta Relative value to add to the zoom rotation, in radians.
   * @param {import("./coordinate.js").Coordinate} [anchor] The rotation center.
   */
  adjustRotationInternal(t, e) {
    const i = this.getAnimating() || this.getInteracting(), s = this.constraints_.rotation(
      this.targetRotation_ + t,
      i
    );
    e && (this.targetCenter_ = this.calculateCenterRotate(s, e)), this.targetRotation_ += t, this.applyTargetState_();
  }
  /**
   * Set the center of the current view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   * @observable
   * @api
   */
  setCenter(t) {
    this.setCenterInternal(
      t && ce(t, this.getProjection())
    );
  }
  /**
   * Set the center using the view projection (not the user projection).
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   */
  setCenterInternal(t) {
    this.targetCenter_ = t, this.applyTargetState_();
  }
  /**
   * @param {import("./ViewHint.js").default} hint Hint.
   * @param {number} delta Delta.
   * @return {number} New value.
   */
  setHint(t, e) {
    return this.hints_[t] += e, this.changed(), this.hints_[t];
  }
  /**
   * Set the resolution for this view. Any resolution constraint will apply.
   * @param {number|undefined} resolution The resolution of the view.
   * @observable
   * @api
   */
  setResolution(t) {
    this.targetResolution_ = t, this.applyTargetState_();
  }
  /**
   * Set the rotation for this view. Any rotation constraint will apply.
   * @param {number} rotation The rotation of the view in radians.
   * @observable
   * @api
   */
  setRotation(t) {
    this.targetRotation_ = t, this.applyTargetState_();
  }
  /**
   * Zoom to a specific zoom level. Any resolution constrain will apply.
   * @param {number} zoom Zoom level.
   * @api
   */
  setZoom(t) {
    this.setResolution(this.getResolutionForZoom(t));
  }
  /**
   * Recompute rotation/resolution/center based on target values.
   * Note: we have to compute rotation first, then resolution and center considering that
   * parameters can influence one another in case a view extent constraint is present.
   * @param {boolean} [doNotCancelAnims] Do not cancel animations.
   * @param {boolean} [forceMoving] Apply constraints as if the view is moving.
   * @private
   */
  applyTargetState_(t, e) {
    const i = this.getAnimating() || this.getInteracting() || e, s = this.constraints_.rotation(
      this.targetRotation_,
      i
    ), r = this.getViewportSize_(s), o = this.constraints_.resolution(
      this.targetResolution_,
      0,
      r,
      i
    ), a = this.constraints_.center(
      this.targetCenter_,
      o,
      r,
      i,
      this.calculateCenterShift(
        this.targetCenter_,
        o,
        s,
        r
      )
    );
    this.get(Nt.ROTATION) !== s && this.set(Nt.ROTATION, s), this.get(Nt.RESOLUTION) !== o && (this.set(Nt.RESOLUTION, o), this.set("zoom", this.getZoom(), !0)), (!a || !this.get(Nt.CENTER) || !mn(this.get(Nt.CENTER), a)) && this.set(Nt.CENTER, a), this.getAnimating() && !t && this.cancelAnimations(), this.cancelAnchor_ = void 0;
  }
  /**
   * If any constraints need to be applied, an animation will be triggered.
   * This is typically done on interaction end.
   * Note: calling this with a duration of 0 will apply the constrained values straight away,
   * without animation.
   * @param {number} [duration] The animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */
  resolveConstraints(t, e, i) {
    t = t !== void 0 ? t : 200;
    const s = e || 0, r = this.constraints_.rotation(this.targetRotation_), o = this.getViewportSize_(r), a = this.constraints_.resolution(
      this.targetResolution_,
      s,
      o
    ), l = this.constraints_.center(
      this.targetCenter_,
      a,
      o,
      !1,
      this.calculateCenterShift(
        this.targetCenter_,
        a,
        r,
        o
      )
    );
    if (t === 0 && !this.cancelAnchor_) {
      this.targetResolution_ = a, this.targetRotation_ = r, this.targetCenter_ = l, this.applyTargetState_();
      return;
    }
    i = i || (t === 0 ? this.cancelAnchor_ : void 0), this.cancelAnchor_ = void 0, (this.getResolution() !== a || this.getRotation() !== r || !this.getCenterInternal() || !mn(this.getCenterInternal(), l)) && (this.getAnimating() && this.cancelAnimations(), this.animateInternal({
      rotation: r,
      center: l,
      resolution: a,
      duration: t,
      easing: Xu,
      anchor: i
    }));
  }
  /**
   * Notify the View that an interaction has started.
   * The view state will be resolved to a stable one if needed
   * (depending on its constraints).
   * @api
   */
  beginInteraction() {
    this.resolveConstraints(0), this.setHint(Ot.INTERACTING, 1);
  }
  /**
   * Notify the View that an interaction has ended. The view state will be resolved
   * to a stable one if needed (depending on its constraints).
   * @param {number} [duration] Animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */
  endInteraction(t, e, i) {
    i = i && ce(i, this.getProjection()), this.endInteractionInternal(t, e, i);
  }
  /**
   * Notify the View that an interaction has ended. The view state will be resolved
   * to a stable one if needed (depending on its constraints).
   * @param {number} [duration] Animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */
  endInteractionInternal(t, e, i) {
    this.getInteracting() && (this.setHint(Ot.INTERACTING, -1), this.resolveConstraints(t, e, i));
  }
  /**
   * Get a valid position for the view center according to the current constraints.
   * @param {import("./coordinate.js").Coordinate|undefined} targetCenter Target center position.
   * @param {number} [targetResolution] Target resolution. If not supplied, the current one will be used.
   * This is useful to guess a valid center position at a different zoom level.
   * @return {import("./coordinate.js").Coordinate|undefined} Valid center position.
   */
  getConstrainedCenter(t, e) {
    const i = this.getViewportSize_(this.getRotation());
    return this.constraints_.center(
      t,
      e || this.getResolution(),
      i
    );
  }
  /**
   * Get a valid zoom level according to the current view constraints.
   * @param {number|undefined} targetZoom Target zoom.
   * @param {number} [direction] Indicate which resolution should be used
   * by a renderer if the view resolution does not match any resolution of the tile source.
   * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
   * will be used. If -1, the nearest higher resolution will be used.
   * @return {number|undefined} Valid zoom level.
   */
  getConstrainedZoom(t, e) {
    const i = this.getResolutionForZoom(t);
    return this.getZoomForResolution(
      this.getConstrainedResolution(i, e)
    );
  }
  /**
   * Get a valid resolution according to the current view constraints.
   * @param {number|undefined} targetResolution Target resolution.
   * @param {number} [direction] Indicate which resolution should be used
   * by a renderer if the view resolution does not match any resolution of the tile source.
   * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
   * will be used. If -1, the nearest higher resolution will be used.
   * @return {number|undefined} Valid resolution.
   */
  getConstrainedResolution(t, e) {
    e = e || 0;
    const i = this.getViewportSize_(this.getRotation());
    return this.constraints_.resolution(t, e, i);
  }
}
function dn(n, t) {
  setTimeout(function() {
    n(t);
  }, 0);
}
function Ku(n) {
  if (n.extent !== void 0) {
    const e = n.smoothExtentConstraint !== void 0 ? n.smoothExtentConstraint : !0;
    return xo(n.extent, n.constrainOnlyCenter, e);
  }
  const t = Us(n.projection, "EPSG:3857");
  if (n.multiWorld !== !0 && t.isGlobal()) {
    const e = t.getExtent().slice();
    return e[0] = -1 / 0, e[2] = 1 / 0, xo(e, !1, !1);
  }
  return Nu;
}
function Vu(n) {
  let t, e, i, o = n.minZoom !== void 0 ? n.minZoom : ls, a = n.maxZoom !== void 0 ? n.maxZoom : 28;
  const l = n.zoomFactor !== void 0 ? n.zoomFactor : 2, h = n.multiWorld !== void 0 ? n.multiWorld : !1, c = n.smoothResolutionConstraint !== void 0 ? n.smoothResolutionConstraint : !0, u = n.showFullExtent !== void 0 ? n.showFullExtent : !1, d = Us(n.projection, "EPSG:3857"), g = d.getExtent();
  let f = n.constrainOnlyCenter, _ = n.extent;
  if (!h && !_ && d.isGlobal() && (f = !1, _ = g), n.resolutions !== void 0) {
    const m = n.resolutions;
    e = m[o], i = m[a] !== void 0 ? m[a] : m[m.length - 1], n.constrainResolution ? t = Wu(
      m,
      c,
      !f && _,
      u
    ) : t = Ro(
      e,
      i,
      c,
      !f && _,
      u
    );
  } else {
    const p = (g ? Math.max($(g), lt(g)) : (
      // use an extent that can fit the whole world if need be
      360 * Gs.degrees / d.getMetersPerUnit()
    )) / ar / Math.pow(2, ls), y = p / Math.pow(2, 28 - ls);
    e = n.maxResolution, e !== void 0 ? o = 0 : e = p / Math.pow(l, o), i = n.minResolution, i === void 0 && (n.maxZoom !== void 0 ? n.maxResolution !== void 0 ? i = e / Math.pow(l, a) : i = p / Math.pow(l, a) : i = y), a = o + Math.floor(
      Math.log(e / i) / Math.log(l)
    ), i = e / Math.pow(l, a - o), n.constrainResolution ? t = Uu(
      l,
      e,
      i,
      c,
      !f && _,
      u
    ) : t = Ro(
      e,
      i,
      c,
      !f && _,
      u
    );
  }
  return {
    constraint: t,
    maxResolution: e,
    minResolution: i,
    minZoom: o,
    zoomFactor: l
  };
}
function $u(n) {
  if (n.enableRotation !== void 0 ? n.enableRotation : !0) {
    const e = n.constrainRotation;
    return e === void 0 || e === !0 ? ju() : e === !1 ? To : typeof e == "number" ? Bu(e) : To;
  }
  return Yu;
}
function qu(n) {
  return !(n.sourceCenter && n.targetCenter && !mn(n.sourceCenter, n.targetCenter) || n.sourceResolution !== n.targetResolution || n.sourceRotation !== n.targetRotation);
}
function hs(n, t, e, i, s) {
  const r = Math.cos(-s);
  let o = Math.sin(-s), a = n[0] * r - n[1] * o, l = n[1] * r + n[0] * o;
  a += (t[0] / 2 - e[0]) * i, l += (e[1] - t[1] / 2) * i, o = -o;
  const h = a * r - l * o, c = l * r + a * o;
  return [h, c];
}
const Q = {
  OPACITY: "opacity",
  VISIBLE: "visible",
  EXTENT: "extent",
  Z_INDEX: "zIndex",
  MAX_RESOLUTION: "maxResolution",
  MIN_RESOLUTION: "minResolution",
  MAX_ZOOM: "maxZoom",
  MIN_ZOOM: "minZoom",
  SOURCE: "source",
  MAP: "map"
};
class Hu extends Ie {
  /**
   * @param {Options} options Layer options.
   */
  constructor(t) {
    super(), this.on, this.once, this.un, this.background_ = t.background;
    const e = Object.assign({}, t);
    typeof t.properties == "object" && (delete e.properties, Object.assign(e, t.properties)), e[Q.OPACITY] = t.opacity !== void 0 ? t.opacity : 1, et(
      typeof e[Q.OPACITY] == "number",
      "Layer opacity must be a number"
    ), e[Q.VISIBLE] = t.visible !== void 0 ? t.visible : !0, e[Q.Z_INDEX] = t.zIndex, e[Q.MAX_RESOLUTION] = t.maxResolution !== void 0 ? t.maxResolution : 1 / 0, e[Q.MIN_RESOLUTION] = t.minResolution !== void 0 ? t.minResolution : 0, e[Q.MIN_ZOOM] = t.minZoom !== void 0 ? t.minZoom : -1 / 0, e[Q.MAX_ZOOM] = t.maxZoom !== void 0 ? t.maxZoom : 1 / 0, this.className_ = e.className !== void 0 ? e.className : "ol-layer", delete e.className, this.setProperties(e), this.state_ = null;
  }
  /**
   * Get the background for this layer.
   * @return {BackgroundColor|false} Layer background.
   */
  getBackground() {
    return this.background_;
  }
  /**
   * @return {string} CSS class name.
   */
  getClassName() {
    return this.className_;
  }
  /**
   * This method is not meant to be called by layers or layer renderers because the state
   * is incorrect if the layer is included in a layer group.
   *
   * @param {boolean} [managed] Layer is managed.
   * @return {import("./Layer.js").State} Layer state.
   */
  getLayerState(t) {
    const e = this.state_ || /** @type {?} */
    {
      layer: this,
      managed: t === void 0 ? !0 : t
    }, i = this.getZIndex();
    return e.opacity = st(Math.round(this.getOpacity() * 100) / 100, 0, 1), e.visible = this.getVisible(), e.extent = this.getExtent(), e.zIndex = i === void 0 && !e.managed ? 1 / 0 : i, e.maxResolution = this.getMaxResolution(), e.minResolution = Math.max(this.getMinResolution(), 0), e.minZoom = this.getMinZoom(), e.maxZoom = this.getMaxZoom(), this.state_ = e, e;
  }
  /**
   * @abstract
   * @param {Array<import("./Layer.js").default>} [array] Array of layers (to be
   *     modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   */
  getLayersArray(t) {
    return J();
  }
  /**
   * @abstract
   * @param {Array<import("./Layer.js").State>} [states] Optional list of layer
   *     states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   */
  getLayerStatesArray(t) {
    return J();
  }
  /**
   * Return the {@link module:ol/extent~Extent extent} of the layer or `undefined` if it
   * will be visible regardless of extent.
   * @return {import("../extent.js").Extent|undefined} The layer extent.
   * @observable
   * @api
   */
  getExtent() {
    return (
      /** @type {import("../extent.js").Extent|undefined} */
      this.get(Q.EXTENT)
    );
  }
  /**
   * Return the maximum resolution of the layer. Returns Infinity if
   * the layer has no maximum resolution set.
   * @return {number} The maximum resolution of the layer.
   * @observable
   * @api
   */
  getMaxResolution() {
    return (
      /** @type {number} */
      this.get(Q.MAX_RESOLUTION)
    );
  }
  /**
   * Return the minimum resolution of the layer. Returns 0 if
   * the layer has no minimum resolution set.
   * @return {number} The minimum resolution of the layer.
   * @observable
   * @api
   */
  getMinResolution() {
    return (
      /** @type {number} */
      this.get(Q.MIN_RESOLUTION)
    );
  }
  /**
   * Return the minimum zoom level of the layer. Returns -Infinity if
   * the layer has no minimum zoom set.
   * @return {number} The minimum zoom level of the layer.
   * @observable
   * @api
   */
  getMinZoom() {
    return (
      /** @type {number} */
      this.get(Q.MIN_ZOOM)
    );
  }
  /**
   * Return the maximum zoom level of the layer. Returns Infinity if
   * the layer has no maximum zoom set.
   * @return {number} The maximum zoom level of the layer.
   * @observable
   * @api
   */
  getMaxZoom() {
    return (
      /** @type {number} */
      this.get(Q.MAX_ZOOM)
    );
  }
  /**
   * Return the opacity of the layer (between 0 and 1).
   * @return {number} The opacity of the layer.
   * @observable
   * @api
   */
  getOpacity() {
    return (
      /** @type {number} */
      this.get(Q.OPACITY)
    );
  }
  /**
   * @abstract
   * @return {import("../source/Source.js").State} Source state.
   */
  getSourceState() {
    return J();
  }
  /**
   * Return the value of this layer's `visible` property. To find out whether the layer
   * is visible on a map, use `isVisible()` instead.
   * @return {boolean} The value of the `visible` property of the layer.
   * @observable
   * @api
   */
  getVisible() {
    return (
      /** @type {boolean} */
      this.get(Q.VISIBLE)
    );
  }
  /**
   * Return the Z-index of the layer, which is used to order layers before
   * rendering. Returns undefined if the layer is unmanaged.
   * @return {number|undefined} The Z-index of the layer.
   * @observable
   * @api
   */
  getZIndex() {
    return (
      /** @type {number|undefined} */
      this.get(Q.Z_INDEX)
    );
  }
  /**
   * Sets the background color.
   * @param {BackgroundColor} [background] Background color.
   */
  setBackground(t) {
    this.background_ = t, this.changed();
  }
  /**
   * Set the extent at which the layer is visible.  If `undefined`, the layer
   * will be visible at all extents.
   * @param {import("../extent.js").Extent|undefined} extent The extent of the layer.
   * @observable
   * @api
   */
  setExtent(t) {
    this.set(Q.EXTENT, t);
  }
  /**
   * Set the maximum resolution at which the layer is visible.
   * @param {number} maxResolution The maximum resolution of the layer.
   * @observable
   * @api
   */
  setMaxResolution(t) {
    this.set(Q.MAX_RESOLUTION, t);
  }
  /**
   * Set the minimum resolution at which the layer is visible.
   * @param {number} minResolution The minimum resolution of the layer.
   * @observable
   * @api
   */
  setMinResolution(t) {
    this.set(Q.MIN_RESOLUTION, t);
  }
  /**
   * Set the maximum zoom (exclusive) at which the layer is visible.
   * Note that the zoom levels for layer visibility are based on the
   * view zoom level, which may be different from a tile source zoom level.
   * @param {number} maxZoom The maximum zoom of the layer.
   * @observable
   * @api
   */
  setMaxZoom(t) {
    this.set(Q.MAX_ZOOM, t);
  }
  /**
   * Set the minimum zoom (inclusive) at which the layer is visible.
   * Note that the zoom levels for layer visibility are based on the
   * view zoom level, which may be different from a tile source zoom level.
   * @param {number} minZoom The minimum zoom of the layer.
   * @observable
   * @api
   */
  setMinZoom(t) {
    this.set(Q.MIN_ZOOM, t);
  }
  /**
   * Set the opacity of the layer, allowed values range from 0 to 1.
   * @param {number} opacity The opacity of the layer.
   * @observable
   * @api
   */
  setOpacity(t) {
    et(typeof t == "number", "Layer opacity must be a number"), this.set(Q.OPACITY, t);
  }
  /**
   * Set the visibility of the layer (`true` or `false`).
   * @param {boolean} visible The visibility of the layer.
   * @observable
   * @api
   */
  setVisible(t) {
    this.set(Q.VISIBLE, t);
  }
  /**
   * Set Z-index of the layer, which is used to order layers before rendering.
   * The default Z-index is 0.
   * @param {number} zindex The z-index of the layer.
   * @observable
   * @api
   */
  setZIndex(t) {
    this.set(Q.Z_INDEX, t);
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.state_ && (this.state_.layer = null, this.state_ = null), super.disposeInternal();
  }
}
class Na extends Hu {
  /**
   * @param {Options<SourceType>} options Layer options.
   */
  constructor(t) {
    const e = Object.assign({}, t);
    delete e.source, super(e), this.on, this.once, this.un, this.mapPrecomposeKey_ = null, this.mapRenderKey_ = null, this.sourceChangeKey_ = null, this.renderer_ = null, this.sourceReady_ = !1, this.rendered = !1, t.render && (this.render = t.render), t.map && this.setMap(t.map), this.addChangeListener(
      Q.SOURCE,
      this.handleSourcePropertyChange_
    );
    const i = t.source ? (
      /** @type {SourceType} */
      t.source
    ) : null;
    this.setSource(i);
  }
  /**
   * @param {Array<import("./Layer.js").default>} [array] Array of layers (to be modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   * @override
   */
  getLayersArray(t) {
    return t = t || [], t.push(this), t;
  }
  /**
   * @param {Array<import("./Layer.js").State>} [states] Optional list of layer states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   * @override
   */
  getLayerStatesArray(t) {
    return t = t || [], t.push(this.getLayerState()), t;
  }
  /**
   * Get the layer source.
   * @return {SourceType|null} The layer source (or `null` if not yet set).
   * @observable
   * @api
   */
  getSource() {
    return (
      /** @type {SourceType} */
      this.get(Q.SOURCE) || null
    );
  }
  /**
   * @return {SourceType|null} The source being rendered.
   */
  getRenderSource() {
    return this.getSource();
  }
  /**
   * @return {import("../source/Source.js").State} Source state.
   * @override
   */
  getSourceState() {
    const t = this.getSource();
    return t ? t.getState() : "undefined";
  }
  /**
   * @private
   */
  handleSourceChange_() {
    this.changed(), !(this.sourceReady_ || this.getSource().getState() !== "ready") && (this.sourceReady_ = !0, this.dispatchEvent("sourceready"));
  }
  /**
   * @private
   */
  handleSourcePropertyChange_() {
    this.sourceChangeKey_ && (Ct(this.sourceChangeKey_), this.sourceChangeKey_ = null), this.sourceReady_ = !1;
    const t = this.getSource();
    t && (this.sourceChangeKey_ = kt(
      t,
      ut.CHANGE,
      this.handleSourceChange_,
      this
    ), t.getState() === "ready" && (this.sourceReady_ = !0, setTimeout(() => {
      this.dispatchEvent("sourceready");
    }, 0)), this.clearRenderer()), this.changed();
  }
  /**
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with
   * an array of features.
   */
  getFeatures(t) {
    return this.renderer_ ? this.renderer_.getFeatures(t) : Promise.resolve([]);
  }
  /**
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   */
  getData(t) {
    return !this.renderer_ || !this.rendered ? null : this.renderer_.getData(t);
  }
  /**
   * The layer is visible on the map view, i.e. within its min/max resolution or zoom and
   * extent, not set to `visible: false`, and not inside a layer group that is set
   * to `visible: false`.
   * @param {View|import("../View.js").ViewStateLayerStateExtent} [view] View or {@link import("../Map.js").FrameState}.
   * Only required when the layer is not added to a map.
   * @return {boolean} The layer is visible in the map view.
   * @api
   */
  isVisible(t) {
    let e;
    const i = this.getMapInternal();
    !t && i && (t = i.getView()), t instanceof Ss ? e = {
      viewState: t.getState(),
      extent: t.calculateExtent()
    } : e = t, !e.layerStatesArray && i && (e.layerStatesArray = i.getLayerGroup().getLayerStatesArray());
    let s;
    if (e.layerStatesArray) {
      if (s = e.layerStatesArray.find(
        (o) => o.layer === this
      ), !s)
        return !1;
    } else
      s = this.getLayerState();
    const r = this.getExtent();
    return Ju(s, e.viewState) && (!r || St(r, e.extent));
  }
  /**
   * Get the attributions of the source of this layer for the given view.
   * @param {View|import("../View.js").ViewStateLayerStateExtent} [view] View or {@link import("../Map.js").FrameState}.
   * Only required when the layer is not added to a map.
   * @return {Array<string>} Attributions for this layer at the given view.
   * @api
   */
  getAttributions(t) {
    var r;
    if (!this.isVisible(t))
      return [];
    const e = (r = this.getSource()) == null ? void 0 : r.getAttributions();
    if (!e)
      return [];
    const i = t instanceof Ss ? t.getViewStateAndExtent() : t;
    let s = e(i);
    return Array.isArray(s) || (s = [s]), s;
  }
  /**
   * In charge to manage the rendering of the layer. One layer type is
   * bounded with one layer renderer.
   * @param {?import("../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target which the renderer may (but need not) use
   * for rendering its content.
   * @return {HTMLElement|null} The rendered element.
   */
  render(t, e) {
    const i = this.getRenderer();
    return i.prepareFrame(t) ? (this.rendered = !0, i.renderFrame(t, e)) : null;
  }
  /**
   * Called when a layer is not visible during a map render.
   */
  unrender() {
    this.rendered = !1;
  }
  /** @return {string} Declutter */
  getDeclutter() {
  }
  /**
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {import("../layer/Layer.js").State} layerState Layer state.
   */
  renderDeclutter(t, e) {
  }
  /**
   * When the renderer follows a layout -> render approach, do the final rendering here.
   * @param {import('../Map.js').FrameState} frameState Frame state
   */
  renderDeferred(t) {
    const e = this.getRenderer();
    e && e.renderDeferred(t);
  }
  /**
   * For use inside the library only.
   * @param {import("../Map.js").default|null} map Map.
   */
  setMapInternal(t) {
    t || this.unrender(), this.set(Q.MAP, t);
  }
  /**
   * For use inside the library only.
   * @return {import("../Map.js").default|null} Map.
   */
  getMapInternal() {
    return this.get(Q.MAP);
  }
  /**
   * Sets the layer to be rendered on top of other layers on a map. The map will
   * not manage this layer in its layers collection. This
   * is useful for temporary layers. To remove an unmanaged layer from the map,
   * use `#setMap(null)`.
   *
   * To add the layer to a map and have it managed by the map, use
   * {@link module:ol/Map~Map#addLayer} instead.
   * @param {import("../Map.js").default|null} map Map.
   * @api
   */
  setMap(t) {
    this.mapPrecomposeKey_ && (Ct(this.mapPrecomposeKey_), this.mapPrecomposeKey_ = null), t || this.changed(), this.mapRenderKey_ && (Ct(this.mapRenderKey_), this.mapRenderKey_ = null), t && (this.mapPrecomposeKey_ = kt(
      t,
      Pe.PRECOMPOSE,
      this.handlePrecompose_,
      this
    ), this.mapRenderKey_ = kt(this, ut.CHANGE, t.render, t), this.changed());
  }
  /**
   * @param {import("../events/Event.js").default} renderEvent Render event
   * @private
   */
  handlePrecompose_(t) {
    const e = (
      /** @type {import("../render/Event.js").default} */
      t.frameState.layerStatesArray
    ), i = this.getLayerState(!1);
    et(
      !e.some(
        (s) => s.layer === i.layer
      ),
      "A layer can only be added to the map once. Use either `layer.setMap()` or `map.addLayer()`, not both."
    ), e.push(i);
  }
  /**
   * Set the layer source.
   * @param {SourceType|null} source The layer source.
   * @observable
   * @api
   */
  setSource(t) {
    this.set(Q.SOURCE, t);
  }
  /**
   * Get the renderer for this layer.
   * @return {RendererType|null} The layer renderer.
   */
  getRenderer() {
    return this.renderer_ || (this.renderer_ = this.createRenderer()), this.renderer_;
  }
  /**
   * @return {boolean} The layer has a renderer.
   */
  hasRenderer() {
    return !!this.renderer_;
  }
  /**
   * Create a renderer for this layer.
   * @return {RendererType} A layer renderer.
   * @protected
   */
  createRenderer() {
    return null;
  }
  /**
   * This will clear the renderer so that a new one can be created next time it is needed
   */
  clearRenderer() {
    this.renderer_ && (this.renderer_.dispose(), delete this.renderer_);
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.clearRenderer(), this.setSource(null), super.disposeInternal();
  }
}
function Ju(n, t) {
  if (!n.visible)
    return !1;
  const e = t.resolution;
  if (e < n.minResolution || e >= n.maxResolution)
    return !1;
  const i = t.zoom;
  return i > n.minZoom && i <= n.maxZoom;
}
const So = {
  RENDER_ORDER: "renderOrder"
};
class Qu extends Na {
  /**
   * @param {Options<FeatureType, VectorSourceType>} [options] Options.
   */
  constructor(t) {
    t = t || {};
    const e = Object.assign({}, t);
    delete e.style, delete e.renderBuffer, delete e.updateWhileAnimating, delete e.updateWhileInteracting, super(e), this.declutter_ = t.declutter ? String(t.declutter) : void 0, this.renderBuffer_ = t.renderBuffer !== void 0 ? t.renderBuffer : 100, this.style_ = null, this.styleFunction_ = void 0, this.setStyle(t.style), this.updateWhileAnimating_ = t.updateWhileAnimating !== void 0 ? t.updateWhileAnimating : !1, this.updateWhileInteracting_ = t.updateWhileInteracting !== void 0 ? t.updateWhileInteracting : !1;
  }
  /**
   * @return {string} Declutter group.
   * @override
   */
  getDeclutter() {
    return this.declutter_;
  }
  /**
   * Get the topmost feature that intersects the given pixel on the viewport. Returns a promise
   * that resolves with an array of features. The array will either contain the topmost feature
   * when a hit was detected, or it will be empty.
   *
   * The hit detection algorithm used for this method is optimized for performance, but is less
   * accurate than the one used in [map.getFeaturesAtPixel()]{@link import("../Map.js").default#getFeaturesAtPixel}.
   * Text is not considered, and icons are only represented by their bounding box instead of the exact
   * image.
   *
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with an array of features.
   * @api
   * @override
   */
  getFeatures(t) {
    return super.getFeatures(t);
  }
  /**
   * @return {number|undefined} Render buffer.
   */
  getRenderBuffer() {
    return this.renderBuffer_;
  }
  /**
   * @return {import("../render.js").OrderFunction|null|undefined} Render order.
   */
  getRenderOrder() {
    return (
      /** @type {import("../render.js").OrderFunction|null|undefined} */
      this.get(So.RENDER_ORDER)
    );
  }
  /**
   * Get the style for features.  This returns whatever was passed to the `style`
   * option at construction or to the `setStyle` method.
   * @return {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike|null|undefined} Layer style.
   * @api
   */
  getStyle() {
    return this.style_;
  }
  /**
   * Get the style function.
   * @return {import("../style/Style.js").StyleFunction|undefined} Layer style function.
   * @api
   */
  getStyleFunction() {
    return this.styleFunction_;
  }
  /**
   * @return {boolean} Whether the rendered layer should be updated while
   *     animating.
   */
  getUpdateWhileAnimating() {
    return this.updateWhileAnimating_;
  }
  /**
   * @return {boolean} Whether the rendered layer should be updated while
   *     interacting.
   */
  getUpdateWhileInteracting() {
    return this.updateWhileInteracting_;
  }
  /**
   * Render declutter items for this layer
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {import("../layer/Layer.js").State} layerState Layer state.
   * @override
   */
  renderDeclutter(t, e) {
    const i = this.getDeclutter();
    i in t.declutter || (t.declutter[i] = new Ia(9)), this.getRenderer().renderDeclutter(t, e);
  }
  /**
   * @param {import("../render.js").OrderFunction|null|undefined} renderOrder
   *     Render order.
   */
  setRenderOrder(t) {
    this.set(So.RENDER_ORDER, t);
  }
  /**
   * Set the style for features.  This can be a single style object, an array
   * of styles, or a function that takes a feature and resolution and returns
   * an array of styles. If set to `null`, the layer has no style (a `null` style),
   * so only features that have their own styles will be rendered in the layer. Call
   * `setStyle()` without arguments to reset to the default style. See
   * [the ol/style/Style module]{@link module:ol/style/Style~Style} for information on the default style.
   *
   * If your layer has a static style, you can use [flat style]{@link module:ol/style/flat~FlatStyle} object
   * literals instead of using the `Style` and symbolizer constructors (`Fill`, `Stroke`, etc.):
   * ```js
   * vectorLayer.setStyle({
   *   "fill-color": "yellow",
   *   "stroke-color": "black",
   *   "stroke-width": 4
   * })
   * ```
   *
   * @param {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike|null} [style] Layer style.
   * @api
   */
  setStyle(t) {
    this.style_ = t === void 0 ? da : t;
    const e = td(t);
    this.styleFunction_ = t === null ? void 0 : $h(e), this.changed();
  }
  /**
   * @param {boolean|string|number} declutter Declutter images and text.
   * @api
   */
  setDeclutter(t) {
    this.declutter_ = t ? String(t) : void 0, this.changed();
  }
}
function td(n) {
  if (n === void 0)
    return da;
  if (!n)
    return null;
  if (typeof n == "function" || n instanceof Re)
    return n;
  if (!Array.isArray(n))
    return mo([n]);
  if (n.length === 0)
    return [];
  const t = n.length, e = n[0];
  if (e instanceof Re) {
    const s = new Array(t);
    for (let r = 0; r < t; ++r) {
      const o = n[r];
      if (!(o instanceof Re))
        throw new Error("Expected a list of style instances");
      s[r] = o;
    }
    return s;
  }
  if ("style" in e) {
    const s = new Array(t);
    for (let r = 0; r < t; ++r) {
      const o = n[r];
      if (!("style" in o))
        throw new Error("Expected a list of rules with a style property");
      s[r] = o;
    }
    return Iu(s);
  }
  return mo(
    /** @type {Array<import("../style/flat.js").FlatStyle>} */
    n
  );
}
class ed extends Qu {
  /**
   * @param {Options<VectorSourceType, FeatureType>} [options] Options.
   */
  constructor(t) {
    super(t);
  }
  /**
   * @override
   */
  createRenderer() {
    return new Qc(this);
  }
}
function jn() {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}
function ws(n, t, e, i, s, r, o) {
  o = o ?? jn();
  const a = 1 / (n - t), l = 1 / (e - i), h = 1 / (s - r);
  return o[0] = -2 * a, o[1] = 0, o[2] = 0, o[3] = 0, o[4] = 0, o[5] = -2 * l, o[6] = 0, o[7] = 0, o[8] = 0, o[9] = 0, o[10] = 2 * h, o[11] = 0, o[12] = (n + t) * a, o[13] = (i + e) * l, o[14] = (r + s) * h, o[15] = 1, o;
}
function wo(n, t, e, i, s) {
  return s = s ?? jn(), s[0] = n[0] * t, s[1] = n[1] * t, s[2] = n[2] * t, s[3] = n[3] * t, s[4] = n[4] * e, s[5] = n[5] * e, s[6] = n[6] * e, s[7] = n[7] * e, s[8] = n[8] * i, s[9] = n[9] * i, s[10] = n[10] * i, s[11] = n[11] * i, s[12] = n[12], s[13] = n[13], s[14] = n[14], s[15] = n[15], s;
}
function id(n, t, e, i, s) {
  s = s ?? jn();
  let r, o, a, l, h, c, u, d, g, f, _, m;
  return n === s ? (s[12] = n[0] * t + n[4] * e + n[8] * i + n[12], s[13] = n[1] * t + n[5] * e + n[9] * i + n[13], s[14] = n[2] * t + n[6] * e + n[10] * i + n[14], s[15] = n[3] * t + n[7] * e + n[11] * i + n[15]) : (r = n[0], o = n[1], a = n[2], l = n[3], h = n[4], c = n[5], u = n[6], d = n[7], g = n[8], f = n[9], _ = n[10], m = n[11], s[0] = r, s[1] = o, s[2] = a, s[3] = l, s[4] = h, s[5] = c, s[6] = u, s[7] = d, s[8] = g, s[9] = f, s[10] = _, s[11] = m, s[12] = r * t + h * e + g * i + n[12], s[13] = o * t + c * e + f * i + n[13], s[14] = a * t + u * e + _ * i + n[14], s[15] = l * t + d * e + m * i + n[15]), s;
}
function nd(n, t, e, i) {
  return i = i ?? jn(), i[0] = 1, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = 1, i[6] = 0, i[7] = 0, i[8] = 0, i[9] = 0, i[10] = 1, i[11] = 0, i[12] = n, i[13] = t, i[14] = e, i[15] = 1, i;
}
const O = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  /**
   * Indicates that tile loading failed
   * @type {number}
   */
  ERROR: 3,
  EMPTY: 4
};
class lr extends bs {
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {Options} [options] Tile options.
   */
  constructor(t, e, i) {
    super(), i = i || {}, this.tileCoord = t, this.state = e, this.key = "", this.transition_ = i.transition === void 0 ? 250 : i.transition, this.transitionStarts_ = {}, this.interpolate = !!i.interpolate;
  }
  /**
   * @protected
   */
  changed() {
    this.dispatchEvent(ut.CHANGE);
  }
  /**
   * Called by the tile cache when the tile is removed from the cache due to expiry
   */
  release() {
    this.setState(O.EMPTY);
  }
  /**
   * @return {string} Key.
   */
  getKey() {
    return this.key + "/" + this.tileCoord;
  }
  /**
   * Get the tile coordinate for this tile.
   * @return {import("./tilecoord.js").TileCoord} The tile coordinate.
   * @api
   */
  getTileCoord() {
    return this.tileCoord;
  }
  /**
   * @return {import("./TileState.js").default} State.
   */
  getState() {
    return this.state;
  }
  /**
   * Sets the state of this tile. If you write your own {@link module:ol/Tile~LoadFunction tileLoadFunction} ,
   * it is important to set the state correctly to {@link module:ol/TileState~ERROR}
   * when the tile cannot be loaded. Otherwise the tile cannot be removed from
   * the tile queue and will block other requests.
   * @param {import("./TileState.js").default} state State.
   * @api
   */
  setState(t) {
    if (this.state !== O.EMPTY) {
      if (this.state !== O.ERROR && this.state > t)
        throw new Error("Tile load sequence violation");
      this.state = t, this.changed();
    }
  }
  /**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   * @abstract
   * @api
   */
  load() {
    J();
  }
  /**
   * Get the alpha value for rendering.
   * @param {string} id An id for the renderer.
   * @param {number} time The render frame time.
   * @return {number} A number between 0 and 1.
   */
  getAlpha(t, e) {
    if (!this.transition_)
      return 1;
    let i = this.transitionStarts_[t];
    if (!i)
      i = e, this.transitionStarts_[t] = i;
    else if (i === -1)
      return 1;
    const s = e - i + 1e3 / 60;
    return s >= this.transition_ ? 1 : Ga(s / this.transition_);
  }
  /**
   * Determine if a tile is in an alpha transition.  A tile is considered in
   * transition if tile.getAlpha() has not yet been called or has been called
   * and returned 1.
   * @param {string} id An id for the renderer.
   * @return {boolean} The tile is in transition.
   */
  inTransition(t) {
    return this.transition_ ? this.transitionStarts_[t] !== -1 : !1;
  }
  /**
   * Mark a transition as complete.
   * @param {string} id An id for the renderer.
   */
  endTransition(t) {
    this.transition_ && (this.transitionStarts_[t] = -1);
  }
  /**
   * @override
   */
  disposeInternal() {
    this.release(), super.disposeInternal();
  }
}
function vn(n) {
  return n instanceof Image || n instanceof HTMLCanvasElement || n instanceof HTMLVideoElement || n instanceof ImageBitmap ? n : null;
}
function sd(n) {
  return n instanceof Uint8Array || n instanceof Uint8ClampedArray || n instanceof Float32Array || n instanceof DataView ? n : null;
}
const rd = new Error("disposed");
let $e = null;
function od(n) {
  $e || ($e = rt(
    n.width,
    n.height,
    void 0,
    { willReadFrequently: !0 }
  ));
  const t = $e.canvas, e = n.width;
  t.width !== e && (t.width = e);
  const i = n.height;
  return t.height !== i && (t.height = i), $e.clearRect(0, 0, e, i), $e.drawImage(n, 0, 0), $e.getImageData(0, 0, e, i).data;
}
const ad = [256, 256];
class Mn extends lr {
  /**
   * @param {Options} options Tile options.
   */
  constructor(t) {
    const e = O.IDLE;
    super(t.tileCoord, e, {
      transition: t.transition,
      interpolate: t.interpolate
    }), this.loader_ = t.loader, this.data_ = null, this.error_ = null, this.size_ = t.size || null, this.controller_ = t.controller || null;
  }
  /**
   * Get the tile size.
   * @return {import('./size.js').Size} Tile size.
   */
  getSize() {
    if (this.size_)
      return this.size_;
    const t = vn(this.data_);
    return t ? [t.width, t.height] : ad;
  }
  /**
   * Get the data for the tile.
   * @return {Data} Tile data.
   * @api
   */
  getData() {
    return this.data_;
  }
  /**
   * Get any loading error.
   * @return {Error} Loading error.
   * @api
   */
  getError() {
    return this.error_;
  }
  /**
   * Load the tile data.
   * @api
   * @override
   */
  load() {
    if (this.state !== O.IDLE && this.state !== O.ERROR)
      return;
    this.state = O.LOADING, this.changed();
    const t = this;
    this.loader_().then(function(e) {
      t.data_ = e, t.state = O.LOADED, t.changed();
    }).catch(function(e) {
      t.error_ = e, t.state = O.ERROR, t.changed();
    });
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.controller_ && (this.controller_.abort(rd), this.controller_ = null), super.disposeInternal();
  }
}
class Xa extends lr {
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {string} src Image source URI.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @param {import("./Tile.js").Options} [options] Tile options.
   */
  constructor(t, e, i, s, r, o) {
    super(t, e, o), this.crossOrigin_ = s, this.src_ = i, this.key = i, this.image_ = new Image(), s !== null && (this.image_.crossOrigin = s), this.unlisten_ = null, this.tileLoadFunction_ = r;
  }
  /**
   * Get the HTML image element for this tile (may be a Canvas, Image, or Video).
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @api
   */
  getImage() {
    return this.image_;
  }
  /**
   * Sets an HTML image element for this tile (may be a Canvas or preloaded Image).
   * @param {HTMLCanvasElement|HTMLImageElement} element Element.
   */
  setImage(t) {
    this.image_ = t, this.state = O.LOADED, this.unlistenImage_(), this.changed();
  }
  /**
   * Tracks loading or read errors.
   *
   * @private
   */
  handleImageError_() {
    this.state = O.ERROR, this.unlistenImage_(), this.image_ = ld(), this.changed();
  }
  /**
   * Tracks successful image load.
   *
   * @private
   */
  handleImageLoad_() {
    const t = (
      /** @type {HTMLImageElement} */
      this.image_
    );
    t.naturalWidth && t.naturalHeight ? this.state = O.LOADED : this.state = O.EMPTY, this.unlistenImage_(), this.changed();
  }
  /**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   *
   * To retry loading tiles on failed requests, use a custom `tileLoadFunction`
   * that checks for error status codes and reloads only when the status code is
   * 408, 429, 500, 502, 503 and 504, and only when not too many retries have been
   * made already:
   *
   * ```js
   * const retryCodes = [408, 429, 500, 502, 503, 504];
   * const retries = {};
   * source.setTileLoadFunction((tile, src) => {
   *   const image = tile.getImage();
   *   fetch(src)
   *     .then((response) => {
   *       if (retryCodes.includes(response.status)) {
   *         retries[src] = (retries[src] || 0) + 1;
   *         if (retries[src] <= 3) {
   *           setTimeout(() => tile.load(), retries[src] * 1000);
   *         }
   *         return Promise.reject();
   *       }
   *       return response.blob();
   *     })
   *     .then((blob) => {
   *       const imageUrl = URL.createObjectURL(blob);
   *       image.src = imageUrl;
   *       setTimeout(() => URL.revokeObjectURL(imageUrl), 5000);
   *     })
   *     .catch(() => tile.setState(3)); // error
   * });
   * ```
   * @api
   * @override
   */
  load() {
    this.state == O.ERROR && (this.state = O.IDLE, this.image_ = new Image(), this.crossOrigin_ !== null && (this.image_.crossOrigin = this.crossOrigin_)), this.state == O.IDLE && (this.state = O.LOADING, this.changed(), this.tileLoadFunction_(this, this.src_), this.unlisten_ = Gh(
      this.image_,
      this.handleImageLoad_.bind(this),
      this.handleImageError_.bind(this)
    ));
  }
  /**
   * Discards event handlers which listen for load completion or errors.
   *
   * @private
   */
  unlistenImage_() {
    this.unlisten_ && (this.unlisten_(), this.unlisten_ = null);
  }
  /**
   * @override
   */
  disposeInternal() {
    this.unlistenImage_(), this.image_ = null, super.disposeInternal();
  }
}
function ld() {
  const n = rt(1, 1);
  return n.fillStyle = "rgba(0,0,0,0)", n.fillRect(0, 0, 1, 1), n.canvas;
}
let cs;
const hi = [];
function Io(n, t, e, i, s) {
  n.beginPath(), n.moveTo(0, 0), n.lineTo(t, e), n.lineTo(i, s), n.closePath(), n.save(), n.clip(), n.fillRect(0, 0, Math.max(t, i) + 1, Math.max(e, s)), n.restore();
}
function us(n, t) {
  return Math.abs(n[t * 4] - 210) > 2 || Math.abs(n[t * 4 + 3] - 0.75 * 255) > 2;
}
function hd() {
  if (cs === void 0) {
    const n = rt(6, 6, hi);
    n.globalCompositeOperation = "lighter", n.fillStyle = "rgba(210, 0, 0, 0.75)", Io(n, 4, 5, 4, 0), Io(n, 4, 5, 0, 5);
    const t = n.getImageData(0, 0, 3, 3).data;
    cs = us(t, 0) || us(t, 4) || us(t, 8), Nn(n), hi.push(n.canvas);
  }
  return cs;
}
function Is(n, t, e, i) {
  const s = qi(e, t, n);
  let r = Pr(
    t,
    i,
    e
  );
  const o = t.getMetersPerUnit();
  o !== void 0 && (r *= o);
  const a = n.getMetersPerUnit();
  a !== void 0 && (r /= a);
  const l = n.getExtent();
  if (!l || gi(l, s)) {
    const h = Pr(n, r, s) / r;
    isFinite(h) && h > 0 && (r /= h);
  }
  return r;
}
function za(n, t, e, i) {
  const s = Ge(e);
  let r = Is(
    n,
    t,
    s,
    i
  );
  return (!isFinite(r) || r <= 0) && Zo(e, function(o) {
    return r = Is(
      n,
      t,
      o,
      i
    ), isFinite(r) && r > 0;
  }), r;
}
function cd(n, t, e, i, s, r, o, a, l, h, c, u, d, g) {
  const f = rt(
    Math.round(e * n),
    Math.round(e * t),
    hi
  );
  if (u || (f.imageSmoothingEnabled = !1), l.length === 0)
    return f.canvas;
  f.scale(e, e);
  function _(x) {
    return Math.round(x * e) / e;
  }
  f.globalCompositeOperation = "lighter";
  const m = At();
  l.forEach(function(x, w, v) {
    Bo(m, x.extent);
  });
  let p;
  const y = e / i, R = (u ? 1 : 1 + Math.pow(2, -24)) / y;
  p = rt(
    Math.round($(m) * y),
    Math.round(lt(m) * y),
    hi
  ), u || (p.imageSmoothingEnabled = !1), l.forEach(function(x, w, v) {
    if (x.image.width > 0 && x.image.height > 0) {
      if (x.clipExtent) {
        p.save();
        const L = (x.clipExtent[0] - m[0]) * y, F = -(x.clipExtent[3] - m[3]) * y, M = $(x.clipExtent) * y, G = lt(x.clipExtent) * y;
        p.rect(
          u ? L : Math.round(L),
          u ? F : Math.round(F),
          u ? M : Math.round(L + M) - Math.round(L),
          u ? G : Math.round(F + G) - Math.round(F)
        ), p.clip();
      }
      const S = (x.extent[0] - m[0]) * y, A = -(x.extent[3] - m[3]) * y, I = $(x.extent) * y, P = lt(x.extent) * y;
      p.drawImage(
        x.image,
        h,
        h,
        x.image.width - 2 * h,
        x.image.height - 2 * h,
        u ? S : Math.round(S),
        u ? A : Math.round(A),
        u ? I : Math.round(S + I) - Math.round(S),
        u ? P : Math.round(A + P) - Math.round(A)
      ), x.clipExtent && p.restore();
    }
  });
  const E = le(o);
  return a.getTriangles().forEach(function(x, w, v) {
    const S = x.source, A = x.target;
    let I = S[0][0], P = S[0][1], L = S[1][0], F = S[1][1], M = S[2][0], G = S[2][1];
    const b = _((A[0][0] - E[0]) / r), D = _(
      -(A[0][1] - E[1]) / r
    ), z = _((A[1][0] - E[0]) / r), N = _(
      -(A[1][1] - E[1]) / r
    ), k = _((A[2][0] - E[0]) / r), W = _(
      -(A[2][1] - E[1]) / r
    ), C = I, Z = P;
    I = 0, P = 0, L -= C, F -= Z, M -= C, G -= Z;
    const tt = [
      [L, F, 0, 0, z - b],
      [M, G, 0, 0, k - b],
      [0, 0, L, F, N - D],
      [0, 0, M, G, W - D]
    ], V = kl(tt);
    if (!V)
      return;
    if (f.save(), f.beginPath(), hd() || !u) {
      f.moveTo(z, N);
      const ot = 4, yt = b - z, $t = D - N;
      for (let ht = 0; ht < ot; ht++)
        f.lineTo(
          z + _((ht + 1) * yt / ot),
          N + _(ht * $t / (ot - 1))
        ), ht != ot - 1 && f.lineTo(
          z + _((ht + 1) * yt / ot),
          N + _((ht + 1) * $t / (ot - 1))
        );
      f.lineTo(k, W);
    } else
      f.moveTo(z, N), f.lineTo(b, D), f.lineTo(k, W);
    f.clip(), f.transform(
      V[0],
      V[2],
      V[1],
      V[3],
      b,
      D
    ), f.translate(
      m[0] - C,
      m[3] - Z
    );
    let it;
    if (p)
      it = p.canvas, f.scale(R, -R);
    else {
      const ot = l[0], yt = ot.extent;
      it = ot.image, f.scale(
        $(yt) / it.width,
        -lt(yt) / it.height
      );
    }
    f.drawImage(it, 0, 0), f.restore();
  }), p && (Nn(p), hi.push(p.canvas)), c && (f.save(), f.globalCompositeOperation = "source-over", f.strokeStyle = "black", f.lineWidth = 1, a.getTriangles().forEach(function(x, w, v) {
    const S = x.target, A = (S[0][0] - E[0]) / r, I = -(S[0][1] - E[1]) / r, P = (S[1][0] - E[0]) / r, L = -(S[1][1] - E[1]) / r, F = (S[2][0] - E[0]) / r, M = -(S[2][1] - E[1]) / r;
    f.beginPath(), f.moveTo(P, L), f.lineTo(A, I), f.lineTo(F, M), f.closePath(), f.stroke();
  }), f.restore()), f.canvas;
}
const ud = 10, Co = 0.25;
class Wa {
  /**
   * @param {import("../proj/Projection.js").default} sourceProj Source projection.
   * @param {import("../proj/Projection.js").default} targetProj Target projection.
   * @param {import("../extent.js").Extent} targetExtent Target extent to triangulate.
   * @param {import("../extent.js").Extent} maxSourceExtent Maximal source extent that can be used.
   * @param {number} errorThreshold Acceptable error (in source units).
   * @param {?number} destinationResolution The (optional) resolution of the destination.
   * @param {import("../transform.js").Transform} [sourceMatrix] Source transform matrix.
   */
  constructor(t, e, i, s, r, o, a) {
    this.sourceProj_ = t, this.targetProj_ = e;
    let l = {};
    const h = a ? gh(
      (R) => _t(
        a,
        qi(R, this.targetProj_, this.sourceProj_)
      )
    ) : En(this.targetProj_, this.sourceProj_);
    this.transformInv_ = function(R) {
      const E = R[0] + "/" + R[1];
      return l[E] || (l[E] = h(R)), l[E];
    }, this.maxSourceExtent_ = s, this.errorThresholdSquared_ = r * r, this.triangles_ = [], this.wrapsXInSource_ = !1, this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!s && !!this.sourceProj_.getExtent() && $(s) >= $(this.sourceProj_.getExtent()), this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? $(this.sourceProj_.getExtent()) : null, this.targetWorldWidth_ = this.targetProj_.getExtent() ? $(this.targetProj_.getExtent()) : null;
    const c = le(i), u = Dn(i), d = Fn(i), g = bn(i), f = this.transformInv_(c), _ = this.transformInv_(u), m = this.transformInv_(d), p = this.transformInv_(g), y = ud + (o ? Math.max(
      0,
      Math.ceil(
        Math.log2(
          Ni(i) / (o * o * 256 * 256)
        )
      )
    ) : 0);
    if (this.addQuad_(
      c,
      u,
      d,
      g,
      f,
      _,
      m,
      p,
      y
    ), this.wrapsXInSource_) {
      let R = 1 / 0;
      this.triangles_.forEach(function(E, x, w) {
        R = Math.min(
          R,
          E.source[0][0],
          E.source[1][0],
          E.source[2][0]
        );
      }), this.triangles_.forEach((E) => {
        if (Math.max(
          E.source[0][0],
          E.source[1][0],
          E.source[2][0]
        ) - R > this.sourceWorldWidth_ / 2) {
          const x = [
            [E.source[0][0], E.source[0][1]],
            [E.source[1][0], E.source[1][1]],
            [E.source[2][0], E.source[2][1]]
          ];
          x[0][0] - R > this.sourceWorldWidth_ / 2 && (x[0][0] -= this.sourceWorldWidth_), x[1][0] - R > this.sourceWorldWidth_ / 2 && (x[1][0] -= this.sourceWorldWidth_), x[2][0] - R > this.sourceWorldWidth_ / 2 && (x[2][0] -= this.sourceWorldWidth_);
          const w = Math.min(
            x[0][0],
            x[1][0],
            x[2][0]
          );
          Math.max(
            x[0][0],
            x[1][0],
            x[2][0]
          ) - w < this.sourceWorldWidth_ / 2 && (E.source = x);
        }
      });
    }
    l = {};
  }
  /**
   * Adds triangle to the triangulation.
   * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
   * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
   * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
   * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
   * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
   * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
   * @private
   */
  addTriangle_(t, e, i, s, r, o) {
    this.triangles_.push({
      source: [s, r, o],
      target: [t, e, i]
    });
  }
  /**
   * Adds quad (points in clock-wise order) to the triangulation
   * (and reprojects the vertices) if valid.
   * Performs quad subdivision if needed to increase precision.
   *
   * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
   * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
   * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
   * @param {import("../coordinate.js").Coordinate} d The target d coordinate.
   * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
   * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
   * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
   * @param {import("../coordinate.js").Coordinate} dSrc The source d coordinate.
   * @param {number} maxSubdivision Maximal allowed subdivision of the quad.
   * @private
   */
  addQuad_(t, e, i, s, r, o, a, l, h) {
    const c = wr([r, o, a, l]), u = this.sourceWorldWidth_ ? $(c) / this.sourceWorldWidth_ : null, d = (
      /** @type {number} */
      this.sourceWorldWidth_
    ), g = this.sourceProj_.canWrapX() && u > 0.5 && u < 1;
    let f = !1;
    if (h > 0) {
      if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
        const m = wr([t, e, i, s]);
        f = $(m) / this.targetWorldWidth_ > Co || f;
      }
      !g && this.sourceProj_.isGlobal() && u && (f = u > Co || f);
    }
    if (!f && this.maxSourceExtent_ && isFinite(c[0]) && isFinite(c[1]) && isFinite(c[2]) && isFinite(c[3]) && !St(c, this.maxSourceExtent_))
      return;
    let _ = 0;
    if (!f && (!isFinite(r[0]) || !isFinite(r[1]) || !isFinite(o[0]) || !isFinite(o[1]) || !isFinite(a[0]) || !isFinite(a[1]) || !isFinite(l[0]) || !isFinite(l[1]))) {
      if (h > 0)
        f = !0;
      else if (_ = (!isFinite(r[0]) || !isFinite(r[1]) ? 8 : 0) + (!isFinite(o[0]) || !isFinite(o[1]) ? 4 : 0) + (!isFinite(a[0]) || !isFinite(a[1]) ? 2 : 0) + (!isFinite(l[0]) || !isFinite(l[1]) ? 1 : 0), _ != 1 && _ != 2 && _ != 4 && _ != 8)
        return;
    }
    if (h > 0) {
      if (!f) {
        const m = [(t[0] + i[0]) / 2, (t[1] + i[1]) / 2], p = this.transformInv_(m);
        let y;
        g ? y = (se(r[0], d) + se(a[0], d)) / 2 - se(p[0], d) : y = (r[0] + a[0]) / 2 - p[0];
        const R = (r[1] + a[1]) / 2 - p[1];
        f = y * y + R * R > this.errorThresholdSquared_;
      }
      if (f) {
        if (Math.abs(t[0] - i[0]) <= Math.abs(t[1] - i[1])) {
          const m = [(e[0] + i[0]) / 2, (e[1] + i[1]) / 2], p = this.transformInv_(m), y = [(s[0] + t[0]) / 2, (s[1] + t[1]) / 2], R = this.transformInv_(y);
          this.addQuad_(
            t,
            e,
            m,
            y,
            r,
            o,
            p,
            R,
            h - 1
          ), this.addQuad_(
            y,
            m,
            i,
            s,
            R,
            p,
            a,
            l,
            h - 1
          );
        } else {
          const m = [(t[0] + e[0]) / 2, (t[1] + e[1]) / 2], p = this.transformInv_(m), y = [(i[0] + s[0]) / 2, (i[1] + s[1]) / 2], R = this.transformInv_(y);
          this.addQuad_(
            t,
            m,
            y,
            s,
            r,
            p,
            R,
            l,
            h - 1
          ), this.addQuad_(
            m,
            e,
            i,
            y,
            p,
            o,
            a,
            R,
            h - 1
          );
        }
        return;
      }
    }
    if (g) {
      if (!this.canWrapXInSource_)
        return;
      this.wrapsXInSource_ = !0;
    }
    _ & 11 || this.addTriangle_(t, i, s, r, a, l), _ & 14 || this.addTriangle_(t, i, e, r, a, o), _ && (_ & 13 || this.addTriangle_(e, s, t, o, l, r), _ & 7 || this.addTriangle_(e, s, i, o, l, a));
  }
  /**
   * Calculates extent of the `source` coordinates from all the triangles.
   *
   * @return {import("../extent.js").Extent} Calculated extent.
   */
  calculateSourceExtent() {
    const t = At();
    return this.triangles_.forEach(function(e, i, s) {
      const r = e.source;
      ki(t, r[0]), ki(t, r[1]), ki(t, r[2]);
    }), t;
  }
  /**
   * @return {Array<Triangle>} Array of the calculated triangles.
   */
  getTriangles() {
    return this.triangles_;
  }
}
const Ua = 0.5;
class Ya extends lr {
  /**
   * @param {import("../proj/Projection.js").default} sourceProj Source projection.
   * @param {import("../tilegrid/TileGrid.js").default} sourceTileGrid Source tile grid.
   * @param {import("../proj/Projection.js").default} targetProj Target projection.
   * @param {import("../tilegrid/TileGrid.js").default} targetTileGrid Target tile grid.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Coordinate of the tile.
   * @param {import("../tilecoord.js").TileCoord} wrappedTileCoord Coordinate of the tile wrapped in X.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} gutter Gutter of the source tiles.
   * @param {FunctionType} getTileFunction
   *     Function returning source tiles (z, x, y, pixelRatio).
   * @param {number} [errorThreshold] Acceptable reprojection error (in px).
   * @param {boolean} [renderEdges] Render reprojection edges.
   * @param {import("../Tile.js").Options} [options] Tile options.
   */
  constructor(t, e, i, s, r, o, a, l, h, c, u, d) {
    super(r, O.IDLE, d), this.renderEdges_ = u !== void 0 ? u : !1, this.pixelRatio_ = a, this.gutter_ = l, this.canvas_ = null, this.sourceTileGrid_ = e, this.targetTileGrid_ = s, this.wrappedTileCoord_ = o || r, this.sourceTiles_ = [], this.sourcesListenerKeys_ = null, this.sourceZ_ = 0, this.clipExtent_ = t.canWrapX() ? t.getExtent() : void 0;
    const g = s.getTileCoordExtent(
      this.wrappedTileCoord_
    ), f = this.targetTileGrid_.getExtent();
    let _ = this.sourceTileGrid_.getExtent();
    const m = f ? Zt(g, f) : g;
    if (Ni(m) === 0) {
      this.state = O.EMPTY;
      return;
    }
    const p = t.getExtent();
    p && (_ ? _ = Zt(_, p) : _ = p);
    const y = s.getResolution(
      this.wrappedTileCoord_[0]
    ), R = za(
      t,
      i,
      m,
      y
    );
    if (!isFinite(R) || R <= 0) {
      this.state = O.EMPTY;
      return;
    }
    const E = c !== void 0 ? c : Ua;
    if (this.triangulation_ = new Wa(
      t,
      i,
      m,
      _,
      R * E,
      y
    ), this.triangulation_.getTriangles().length === 0) {
      this.state = O.EMPTY;
      return;
    }
    this.sourceZ_ = e.getZForResolution(R);
    let x = this.triangulation_.calculateSourceExtent();
    if (_ && (t.canWrapX() ? (x[1] = st(
      x[1],
      _[1],
      _[3]
    ), x[3] = st(
      x[3],
      _[1],
      _[3]
    )) : x = Zt(x, _)), !Ni(x))
      this.state = O.EMPTY;
    else {
      let w = 0, v = 0;
      t.canWrapX() && (w = $(p), v = Math.floor(
        (x[0] - p[0]) / w
      )), ks(
        x.slice(),
        t,
        !0
      ).forEach((A) => {
        const I = e.getTileRangeForExtentAndZ(
          A,
          this.sourceZ_
        );
        for (let P = I.minX; P <= I.maxX; P++)
          for (let L = I.minY; L <= I.maxY; L++) {
            const F = h(this.sourceZ_, P, L, a);
            if (F) {
              const M = v * w;
              this.sourceTiles_.push({ tile: F, offset: M });
            }
          }
        ++v;
      }), this.sourceTiles_.length === 0 && (this.state = O.EMPTY);
    }
  }
  /**
   * Get the HTML Canvas element for this tile.
   * @return {HTMLCanvasElement} Canvas.
   */
  getImage() {
    return this.canvas_;
  }
  /**
   * @private
   */
  reproject_() {
    const t = [];
    if (this.sourceTiles_.forEach((e) => {
      var s;
      const i = e.tile;
      if (i && i.getState() == O.LOADED) {
        const r = this.sourceTileGrid_.getTileCoordExtent(i.tileCoord);
        r[0] += e.offset, r[2] += e.offset;
        const o = (s = this.clipExtent_) == null ? void 0 : s.slice();
        o && (o[0] += e.offset, o[2] += e.offset), t.push({
          extent: r,
          clipExtent: o,
          image: i.getImage()
        });
      }
    }), this.sourceTiles_.length = 0, t.length === 0)
      this.state = O.ERROR;
    else {
      const e = this.wrappedTileCoord_[0], i = this.targetTileGrid_.getTileSize(e), s = typeof i == "number" ? i : i[0], r = typeof i == "number" ? i : i[1], o = this.targetTileGrid_.getResolution(e), a = this.sourceTileGrid_.getResolution(
        this.sourceZ_
      ), l = this.targetTileGrid_.getTileCoordExtent(
        this.wrappedTileCoord_
      );
      this.canvas_ = cd(
        s,
        r,
        this.pixelRatio_,
        a,
        this.sourceTileGrid_.getExtent(),
        o,
        l,
        this.triangulation_,
        t,
        this.gutter_,
        this.renderEdges_,
        this.interpolate
      ), this.state = O.LOADED;
    }
    this.changed();
  }
  /**
   * Load not yet loaded URI.
   * @override
   */
  load() {
    if (this.state == O.IDLE) {
      this.state = O.LOADING, this.changed();
      let t = 0;
      this.sourcesListenerKeys_ = [], this.sourceTiles_.forEach(({ tile: e }) => {
        const i = e.getState();
        if (i == O.IDLE || i == O.LOADING) {
          t++;
          const s = kt(e, ut.CHANGE, (r) => {
            const o = e.getState();
            (o == O.LOADED || o == O.ERROR || o == O.EMPTY) && (Ct(s), t--, t === 0 && (this.unlistenSources_(), this.reproject_()));
          });
          this.sourcesListenerKeys_.push(s);
        }
      }), t === 0 ? setTimeout(this.reproject_.bind(this), 0) : this.sourceTiles_.forEach(function({ tile: e }, i, s) {
        e.getState() == O.IDLE && e.load();
      });
    }
  }
  /**
   * @private
   */
  unlistenSources_() {
    this.sourcesListenerKeys_.forEach(Ct), this.sourcesListenerKeys_ = null;
  }
  /**
   * Remove from the cache due to expiry
   * @override
   */
  release() {
    this.canvas_ && (Nn(this.canvas_.getContext("2d")), hi.push(this.canvas_), this.canvas_ = null), super.release();
  }
}
class hr {
  /**
   * @param {number} minX Minimum X.
   * @param {number} maxX Maximum X.
   * @param {number} minY Minimum Y.
   * @param {number} maxY Maximum Y.
   */
  constructor(t, e, i, s) {
    this.minX = t, this.maxX = e, this.minY = i, this.maxY = s;
  }
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {boolean} Contains tile coordinate.
   */
  contains(t) {
    return this.containsXY(t[1], t[2]);
  }
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Contains.
   */
  containsTileRange(t) {
    return this.minX <= t.minX && t.maxX <= this.maxX && this.minY <= t.minY && t.maxY <= this.maxY;
  }
  /**
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @return {boolean} Contains coordinate.
   */
  containsXY(t, e) {
    return this.minX <= t && t <= this.maxX && this.minY <= e && e <= this.maxY;
  }
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Equals.
   */
  equals(t) {
    return this.minX == t.minX && this.minY == t.minY && this.maxX == t.maxX && this.maxY == t.maxY;
  }
  /**
   * @param {TileRange} tileRange Tile range.
   */
  extend(t) {
    t.minX < this.minX && (this.minX = t.minX), t.maxX > this.maxX && (this.maxX = t.maxX), t.minY < this.minY && (this.minY = t.minY), t.maxY > this.maxY && (this.maxY = t.maxY);
  }
  /**
   * @return {number} Height.
   */
  getHeight() {
    return this.maxY - this.minY + 1;
  }
  /**
   * @return {import("./size.js").Size} Size.
   */
  getSize() {
    return [this.getWidth(), this.getHeight()];
  }
  /**
   * @return {number} Width.
   */
  getWidth() {
    return this.maxX - this.minX + 1;
  }
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Intersects.
   */
  intersects(t) {
    return this.minX <= t.maxX && this.maxX >= t.minX && this.minY <= t.maxY && this.maxY >= t.minY;
  }
}
function qe(n, t, e, i, s) {
  return s !== void 0 ? (s.minX = n, s.maxX = t, s.minY = e, s.maxY = i, s) : new hr(n, t, e, i);
}
class dd {
  /**
   * @param {number} [highWaterMark] High water mark.
   */
  constructor(t) {
    this.highWaterMark = t !== void 0 ? t : 2048, this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null;
  }
  deleteOldest() {
    const t = this.pop();
    t instanceof No && t.dispose();
  }
  /**
   * @return {boolean} Can expire cache.
   */
  canExpireCache() {
    return this.highWaterMark > 0 && this.getCount() > this.highWaterMark;
  }
  /**
   * Expire the cache. When the cache entry is a {@link module:ol/Disposable~Disposable},
   * the entry will be disposed.
   * @param {!Object<string, boolean>} [keep] Keys to keep. To be implemented by subclasses.
   */
  expireCache(t) {
    for (; this.canExpireCache(); )
      this.deleteOldest();
  }
  /**
   * FIXME empty description for jsdoc
   */
  clear() {
    for (; this.oldest_; )
      this.deleteOldest();
  }
  /**
   * @param {string} key Key.
   * @return {boolean} Contains key.
   */
  containsKey(t) {
    return this.entries_.hasOwnProperty(t);
  }
  /**
   * @param {function(T, string, LRUCache<T>): ?} f The function
   *     to call for every entry from the oldest to the newer. This function takes
   *     3 arguments (the entry value, the entry key and the LRUCache object).
   *     The return value is ignored.
   */
  forEach(t) {
    let e = this.oldest_;
    for (; e; )
      t(e.value_, e.key_, this), e = e.newer;
  }
  /**
   * @param {string} key Key.
   * @param {*} [options] Options (reserved for subclasses).
   * @return {T} Value.
   */
  get(t, e) {
    const i = this.entries_[t];
    return et(
      i !== void 0,
      "Tried to get a value for a key that does not exist in the cache"
    ), i === this.newest_ || (i === this.oldest_ ? (this.oldest_ = /** @type {Entry} */
    this.oldest_.newer, this.oldest_.older = null) : (i.newer.older = i.older, i.older.newer = i.newer), i.newer = null, i.older = this.newest_, this.newest_.newer = i, this.newest_ = i), i.value_;
  }
  /**
   * Remove an entry from the cache.
   * @param {string} key The entry key.
   * @return {T} The removed entry.
   */
  remove(t) {
    const e = this.entries_[t];
    return et(
      e !== void 0,
      "Tried to get a value for a key that does not exist in the cache"
    ), e === this.newest_ ? (this.newest_ = /** @type {Entry} */
    e.older, this.newest_ && (this.newest_.newer = null)) : e === this.oldest_ ? (this.oldest_ = /** @type {Entry} */
    e.newer, this.oldest_ && (this.oldest_.older = null)) : (e.newer.older = e.older, e.older.newer = e.newer), delete this.entries_[t], --this.count_, e.value_;
  }
  /**
   * @return {number} Count.
   */
  getCount() {
    return this.count_;
  }
  /**
   * @return {Array<string>} Keys.
   */
  getKeys() {
    const t = new Array(this.count_);
    let e = 0, i;
    for (i = this.newest_; i; i = i.older)
      t[e++] = i.key_;
    return t;
  }
  /**
   * @return {Array<T>} Values.
   */
  getValues() {
    const t = new Array(this.count_);
    let e = 0, i;
    for (i = this.newest_; i; i = i.older)
      t[e++] = i.value_;
    return t;
  }
  /**
   * @return {T} Last value.
   */
  peekLast() {
    return this.oldest_.value_;
  }
  /**
   * @return {string} Last key.
   */
  peekLastKey() {
    return this.oldest_.key_;
  }
  /**
   * Get the key of the newest item in the cache.  Throws if the cache is empty.
   * @return {string} The newest key.
   */
  peekFirstKey() {
    return this.newest_.key_;
  }
  /**
   * Return an entry without updating least recently used time.
   * @param {string} key Key.
   * @return {T|undefined} Value.
   */
  peek(t) {
    var e;
    return (e = this.entries_[t]) == null ? void 0 : e.value_;
  }
  /**
   * @return {T} value Value.
   */
  pop() {
    const t = this.oldest_;
    return delete this.entries_[t.key_], t.newer && (t.newer.older = null), this.oldest_ = /** @type {Entry} */
    t.newer, this.oldest_ || (this.newest_ = null), --this.count_, t.value_;
  }
  /**
   * @param {string} key Key.
   * @param {T} value Value.
   */
  replace(t, e) {
    this.get(t), this.entries_[t].value_ = e;
  }
  /**
   * @param {string} key Key.
   * @param {T} value Value.
   */
  set(t, e) {
    et(
      !(t in this.entries_),
      "Tried to set a value for a key that is used already"
    );
    const i = {
      key_: t,
      newer: null,
      older: this.newest_,
      value_: e
    };
    this.newest_ ? this.newest_.newer = i : this.oldest_ = i, this.newest_ = i, this.entries_[t] = i, ++this.count_;
  }
  /**
   * Set a maximum number of entries for the cache.
   * @param {number} size Cache size.
   * @api
   */
  setSize(t) {
    this.highWaterMark = t;
  }
}
function Ln(n, t, e, i) {
  return i !== void 0 ? (i[0] = n, i[1] = t, i[2] = e, i) : [n, t, e];
}
function fd(n, t, e) {
  return n + "/" + t + "/" + e;
}
function Ba(n) {
  return ja(n[0], n[1], n[2]);
}
function ja(n, t, e) {
  return (t << n) + e;
}
function gd(n, t) {
  const e = n[0], i = n[1], s = n[2];
  if (t.getMinZoom() > e || e > t.getMaxZoom())
    return !1;
  const r = t.getFullTileRange(e);
  return r ? r.containsXY(i, s) : !0;
}
function ds(n, t, e, i) {
  return `${n},${fd(t, e, i)}`;
}
function fs(n, t, e) {
  if (!(e in n))
    return n[e] = /* @__PURE__ */ new Set([t]), !0;
  const i = n[e], s = i.has(t);
  return s || i.add(t), !s;
}
function _d(n, t, e) {
  const i = n[e];
  return i ? i.delete(t) : !1;
}
function Ao(n, t) {
  const e = n.layerStatesArray[n.layerIndex];
  e.extent && (t = Zt(
    t,
    pe(e.extent, n.viewState.projection)
  ));
  const i = (
    /** @type {import("../../source/Tile.js").default} */
    e.layer.getRenderSource()
  );
  if (!i.getWrapX()) {
    const s = i.getTileGridForProjection(n.viewState.projection).getExtent();
    s && (t = Zt(t, s));
  }
  return t;
}
class md extends Ma {
  /**
   * @param {LayerType} tileLayer Tile layer.
   * @param {Options} [options] Options.
   */
  constructor(t, e) {
    super(t), e = e || {}, this.extentChanged = !0, this.renderComplete = !1, this.renderedExtent_ = null, this.renderedPixelRatio, this.renderedProjection = null, this.renderedRevision_, this.renderedTiles = [], this.renderedSourceKey_, this.renderedSourceRevision_, this.tempExtent = At(), this.tempTileRange_ = new hr(0, 0, 0, 0), this.tempTileCoord_ = Ln(0, 0, 0);
    const i = e.cacheSize !== void 0 ? e.cacheSize : 512;
    this.tileCache_ = new dd(i), this.maxStaleKeys = i * 0.5;
  }
  /**
   * @return {LRUCache} Tile cache.
   */
  getTileCache() {
    return this.tileCache_;
  }
  /**
   * Get a tile from the cache or create one if needed.
   *
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {import("../../Tile.js").default|null} Tile (or null if outside source extent).
   * @protected
   */
  getOrCreateTile(t, e, i, s) {
    const r = this.tileCache_, a = this.getLayer().getSource(), l = ds(a.getKey(), t, e, i);
    let h;
    if (r.containsKey(l))
      h = r.get(l);
    else {
      if (h = a.getTile(
        t,
        e,
        i,
        s.pixelRatio,
        s.viewState.projection
      ), !h)
        return null;
      r.set(l, h);
    }
    return h;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {import("../../Tile.js").default|null} Tile (or null if outside source extent).
   * @protected
   */
  getTile(t, e, i, s) {
    const r = this.getOrCreateTile(t, e, i, s);
    return r || null;
  }
  /**
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray} Data at the pixel location.
   * @override
   */
  getData(t) {
    const e = this.frameState;
    if (!e)
      return null;
    const i = this.getLayer(), s = _t(
      e.pixelToCoordinateTransform,
      t.slice()
    ), r = i.getExtent();
    if (r && !gi(r, s))
      return null;
    const o = e.viewState, a = i.getRenderSource(), l = a.getTileGridForProjection(o.projection), h = a.getTilePixelRatio(e.pixelRatio);
    for (let c = l.getZForResolution(o.resolution); c >= l.getMinZoom(); --c) {
      const u = l.getTileCoordForCoordAndZ(s, c), d = this.getTile(c, u[1], u[2], e);
      if (!d || d.getState() !== O.LOADED)
        continue;
      const g = l.getOrigin(c), f = dt(l.getTileSize(c)), _ = l.getResolution(c);
      let m;
      if (d instanceof Xa || d instanceof Ya)
        m = d.getImage();
      else if (d instanceof Mn) {
        if (m = vn(d.getData()), !m)
          continue;
      } else
        continue;
      const p = Math.floor(
        h * ((s[0] - g[0]) / _ - u[1] * f[0])
      ), y = Math.floor(
        h * ((g[1] - s[1]) / _ - u[2] * f[1])
      ), R = Math.round(
        h * a.getGutterForProjection(o.projection)
      );
      return this.getImageData(m, p + R, y + R);
    }
    return null;
  }
  /**
   * Determine whether render should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   * @override
   */
  prepareFrame(t) {
    this.renderedProjection ? t.viewState.projection !== this.renderedProjection && (this.tileCache_.clear(), this.renderedProjection = t.viewState.projection) : this.renderedProjection = t.viewState.projection;
    const e = this.getLayer().getSource();
    if (!e)
      return !1;
    const i = e.getRevision();
    return this.renderedRevision_ ? this.renderedRevision_ !== i && (this.renderedRevision_ = i, this.renderedSourceKey_ === e.getKey() && this.tileCache_.clear()) : this.renderedRevision_ = i, !0;
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("../../extent.js").Extent} extent The extent to be rendered.
   * @param {number} initialZ The zoom level.
   * @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
   * @param {number} preload Number of additional levels to load.
   */
  enqueueTiles(t, e, i, s, r) {
    const o = t.viewState, a = this.getLayer(), l = a.getRenderSource(), h = l.getTileGridForProjection(o.projection), c = H(l);
    c in t.wantedTiles || (t.wantedTiles[c] = {});
    const u = t.wantedTiles[c], d = a.getMapInternal(), g = Math.max(
      i - r,
      h.getMinZoom(),
      h.getZForResolution(
        Math.min(
          a.getMaxResolution(),
          d ? d.getView().getResolutionForZoom(Math.max(a.getMinZoom(), 0)) : h.getResolution(0)
        ),
        l.zDirection
      )
    ), f = o.rotation, _ = f ? Ko(
      o.center,
      o.resolution,
      f,
      t.size
    ) : void 0;
    for (let m = i; m >= g; --m) {
      const p = h.getTileRangeForExtentAndZ(
        e,
        m,
        this.tempTileRange_
      ), y = h.getResolution(m);
      for (let R = p.minX; R <= p.maxX; ++R)
        for (let E = p.minY; E <= p.maxY; ++E) {
          if (f && !h.tileCoordIntersectsViewport([m, R, E], _))
            continue;
          const x = this.getTile(m, R, E, t);
          if (!x || !fs(s, x, m))
            continue;
          const v = x.getKey();
          if (u[v] = !0, x.getState() === O.IDLE && !t.tileQueue.isKeyQueued(v)) {
            const S = Ln(m, R, E, this.tempTileCoord_);
            t.tileQueue.enqueue([
              x,
              c,
              h.getTileCoordCenter(S),
              y
            ]);
          }
        }
    }
  }
  /**
   * Look for tiles covering the provided tile coordinate at an alternate
   * zoom level.  Loaded tiles will be added to the provided tile texture lookup.
   * @param {import("../../tilecoord.js").TileCoord} tileCoord The target tile coordinate.
   * @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
   * @return {boolean} The tile coordinate is covered by loaded tiles at the alternate zoom level.
   * @private
   */
  findStaleTile_(t, e) {
    const i = this.tileCache_, s = t[0], r = t[1], o = t[2], a = this.getStaleKeys();
    for (let l = 0; l < a.length; ++l) {
      const h = ds(a[l], s, r, o);
      if (i.containsKey(h)) {
        const c = i.peek(h);
        if (c.getState() === O.LOADED)
          return c.endTransition(H(this)), fs(e, c, s), !0;
      }
    }
    return !1;
  }
  /**
   * Look for tiles covering the provided tile coordinate at an alternate
   * zoom level.  Loaded tiles will be added to the provided tile texture lookup.
   * @param {import("../../tilegrid/TileGrid.js").default} tileGrid The tile grid.
   * @param {import("../../tilecoord.js").TileCoord} tileCoord The target tile coordinate.
   * @param {number} altZ The alternate zoom level.
   * @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
   * @return {boolean} The tile coordinate is covered by loaded tiles at the alternate zoom level.
   * @private
   */
  findAltTiles_(t, e, i, s) {
    const r = t.getTileRangeForTileCoordAndZ(
      e,
      i,
      this.tempTileRange_
    );
    if (!r)
      return !1;
    let o = !0;
    const a = this.tileCache_, h = this.getLayer().getRenderSource().getKey();
    for (let c = r.minX; c <= r.maxX; ++c)
      for (let u = r.minY; u <= r.maxY; ++u) {
        const d = ds(h, i, c, u);
        let g = !1;
        if (a.containsKey(d)) {
          const f = a.peek(d);
          f.getState() === O.LOADED && (fs(s, f, i), g = !0);
        }
        g || (o = !1);
      }
    return o;
  }
  /**
   * Render the layer.
   *
   * The frame rendering logic has three parts:
   *
   *  1. Enqueue tiles
   *  2. Find alt tiles for those that are not yet loaded
   *  3. Render loaded tiles
   *
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @return {HTMLElement} The rendered element.
   * @override
   */
  renderFrame(t, e) {
    let i = !0;
    this.renderComplete = !0;
    const s = t.layerStatesArray[t.layerIndex], r = t.viewState, o = r.projection, a = r.resolution, l = r.center, h = t.pixelRatio, c = this.getLayer(), u = c.getSource(), d = u.getTileGridForProjection(o), g = d.getZForResolution(a, u.zDirection), f = d.getResolution(g), _ = u.getKey();
    this.renderedSourceKey_ ? this.renderedSourceKey_ !== _ && (this.prependStaleKey(this.renderedSourceKey_), this.renderedSourceKey_ = _) : this.renderedSourceKey_ = _;
    let m = t.extent;
    const p = u.getTilePixelRatio(h);
    this.prepareContainer(t, e);
    const y = this.context.canvas.width, R = this.context.canvas.height, E = s.extent && pe(s.extent);
    E && (m = Zt(
      m,
      pe(s.extent)
    ));
    const x = f * y / 2 / p, w = f * R / 2 / p, v = [
      l[0] - x,
      l[1] - w,
      l[0] + x,
      l[1] + w
    ], S = {};
    this.renderedTiles.length = 0;
    const A = c.getPreload();
    if (t.nextExtent) {
      const N = d.getZForResolution(
        r.nextResolution,
        u.zDirection
      ), k = Ao(t, t.nextExtent);
      this.enqueueTiles(t, k, N, S, A);
    }
    const I = Ao(t, m);
    if (this.enqueueTiles(t, I, g, S, 0), A > 0 && setTimeout(() => {
      this.enqueueTiles(
        t,
        I,
        g - 1,
        S,
        A - 1
      );
    }, 0), !(g in S))
      return this.container;
    const P = H(this), L = t.time;
    for (const N of S[g]) {
      const k = N.getState();
      if (k === O.EMPTY)
        continue;
      const W = N.tileCoord;
      if (k === O.LOADED && N.getAlpha(P, L) === 1) {
        N.endTransition(P);
        continue;
      }
      if (k !== O.IDLE && (i = !1), k !== O.ERROR && (this.renderComplete = !1), this.findStaleTile_(W, S)) {
        _d(S, N, g), t.animate = !0;
        continue;
      }
      if (this.findAltTiles_(
        d,
        W,
        g + 1,
        S
      ))
        continue;
      const tt = d.getMinZoom();
      for (let V = g - 1; V >= tt && !this.findAltTiles_(
        d,
        W,
        V,
        S
      ); --V)
        ;
    }
    const F = f / a * h / p, M = this.getRenderContext(t);
    Se(
      this.tempTransform,
      y / 2,
      R / 2,
      F,
      F,
      0,
      -y / 2,
      -R / 2
    ), s.extent && this.clipUnrotated(M, t, E), u.getInterpolate() || (M.imageSmoothingEnabled = !1), this.preRender(M, t);
    const G = Object.keys(S).map(Number);
    G.sort(ne);
    let b;
    const D = [], z = [];
    for (let N = G.length - 1; N >= 0; --N) {
      const k = G[N], W = u.getTilePixelSize(
        k,
        h,
        o
      ), Z = d.getResolution(k) / f, tt = W[0] * Z * F, V = W[1] * Z * F, it = d.getTileCoordForCoordAndZ(
        le(v),
        k
      ), ot = d.getTileCoordExtent(it), yt = _t(this.tempTransform, [
        p * (ot[0] - v[0]) / f,
        p * (v[3] - ot[3]) / f
      ]), $t = p * u.getGutterForProjection(o);
      for (const ht of S[k]) {
        if (ht.getState() !== O.LOADED)
          continue;
        const ze = ht.tileCoord, We = it[1] - ze[1], Ue = Math.round(yt[0] - (We - 1) * tt), Ut = it[2] - ze[2], Ce = Math.round(yt[1] - (Ut - 1) * V), Mt = Math.round(yt[0] - We * tt), Yt = Math.round(yt[1] - Ut * V), Ye = Ue - Mt, Ae = Ce - Yt, Be = G.length === 1;
        let Ri = !1;
        b = [Mt, Yt, Mt + Ye, Yt, Mt + Ye, Yt + Ae, Mt, Yt + Ae];
        for (let qt = 0, ve = D.length; qt < ve; ++qt)
          if (!Be && k < z[qt]) {
            const gt = D[qt];
            St(
              [Mt, Yt, Mt + Ye, Yt + Ae],
              [gt[0], gt[3], gt[4], gt[7]]
            ) && (Ri || (M.save(), Ri = !0), M.beginPath(), M.moveTo(b[0], b[1]), M.lineTo(b[2], b[3]), M.lineTo(b[4], b[5]), M.lineTo(b[6], b[7]), M.moveTo(gt[6], gt[7]), M.lineTo(gt[4], gt[5]), M.lineTo(gt[2], gt[3]), M.lineTo(gt[0], gt[1]), M.clip());
          }
        D.push(b), z.push(k), this.drawTile(ht, t, Mt, Yt, Ye, Ae, $t, Be), Ri && M.restore(), this.renderedTiles.unshift(ht), this.updateUsedTiles(t.usedTiles, u, ht);
      }
    }
    if (this.renderedResolution = f, this.extentChanged = !this.renderedExtent_ || !Os(this.renderedExtent_, v), this.renderedExtent_ = v, this.renderedPixelRatio = h, this.postRender(this.context, t), s.extent && M.restore(), M.imageSmoothingEnabled = !0, this.renderComplete) {
      const N = (k, W) => {
        const C = H(u), Z = W.wantedTiles[C], tt = Z ? Object.keys(Z).length : 0;
        this.updateCacheSize(tt), this.tileCache_.expireCache();
      };
      t.postRenderFunctions.push(N);
    }
    return !this.renderComplete && !i && (t.animate = !0), this.container;
  }
  /**
   * Increases the cache size if needed
   * @param {number} tileCount Minimum number of tiles needed.
   */
  updateCacheSize(t) {
    this.tileCache_.highWaterMark = Math.max(
      this.tileCache_.highWaterMark,
      t * 2
    );
  }
  /**
   * @param {import("../../Tile.js").default} tile Tile.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {number} x Left of the tile.
   * @param {number} y Top of the tile.
   * @param {number} w Width of the tile.
   * @param {number} h Height of the tile.
   * @param {number} gutter Tile gutter.
   * @param {boolean} transition Apply an alpha transition.
   * @protected
   */
  drawTile(t, e, i, s, r, o, a, l) {
    let h;
    if (t instanceof Mn) {
      if (h = vn(t.getData()), !h)
        throw new Error("Rendering array data is not yet supported");
    } else
      h = this.getTileImage(
        /** @type {import("../../ImageTile.js").default} */
        t
      );
    if (!h)
      return;
    const c = this.getRenderContext(e), u = H(this), d = e.layerStatesArray[e.layerIndex], g = d.opacity * (l ? t.getAlpha(u, e.time) : 1), f = g !== c.globalAlpha;
    f && (c.save(), c.globalAlpha = g), c.drawImage(
      h,
      a,
      a,
      h.width - 2 * a,
      h.height - 2 * a,
      i,
      s,
      r,
      o
    ), f && c.restore(), g !== d.opacity ? e.animate = !0 : l && t.endTransition(u);
  }
  /**
   * @return {HTMLCanvasElement} Image
   */
  getImage() {
    const t = this.context;
    return t ? t.canvas : null;
  }
  /**
   * Get the image from a tile.
   * @param {import("../../ImageTile.js").default} tile Tile.
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @protected
   */
  getTileImage(t) {
    return t.getImage();
  }
  /**
   * @param {!Object<string, !Object<string, boolean>>} usedTiles Used tiles.
   * @param {import("../../source/Tile.js").default} tileSource Tile source.
   * @param {import('../../Tile.js').default} tile Tile.
   * @protected
   */
  updateUsedTiles(t, e, i) {
    const s = H(e);
    s in t || (t[s] = {}), t[s][i.getKey()] = !0;
  }
}
const fn = {
  PRELOAD: "preload",
  USE_INTERIM_TILES_ON_ERROR: "useInterimTilesOnError"
};
class pd extends Na {
  /**
   * @param {Options<TileSourceType>} [options] Tile layer options.
   */
  constructor(t) {
    t = t || {};
    const e = Object.assign({}, t), i = t.cacheSize;
    delete t.cacheSize, delete e.preload, delete e.useInterimTilesOnError, super(e), this.on, this.once, this.un, this.cacheSize_ = i, this.setPreload(t.preload !== void 0 ? t.preload : 0), this.setUseInterimTilesOnError(
      t.useInterimTilesOnError !== void 0 ? t.useInterimTilesOnError : !0
    );
  }
  /**
   * @return {number|undefined} The suggested cache size
   * @protected
   */
  getCacheSize() {
    return this.cacheSize_;
  }
  /**
   * Return the level as number to which we will preload tiles up to.
   * @return {number} The level to preload tiles up to.
   * @observable
   * @api
   */
  getPreload() {
    return (
      /** @type {number} */
      this.get(fn.PRELOAD)
    );
  }
  /**
   * Set the level as number to which we will preload tiles up to.
   * @param {number} preload The level to preload tiles up to.
   * @observable
   * @api
   */
  setPreload(t) {
    this.set(fn.PRELOAD, t);
  }
  /**
   * Deprecated.  Whether we use interim tiles on error.
   * @return {boolean} Use interim tiles on error.
   * @observable
   * @api
   */
  getUseInterimTilesOnError() {
    return (
      /** @type {boolean} */
      this.get(fn.USE_INTERIM_TILES_ON_ERROR)
    );
  }
  /**
   * Deprecated.  Set whether we use interim tiles on error.
   * @param {boolean} useInterimTilesOnError Use interim tiles on error.
   * @observable
   * @api
   */
  setUseInterimTilesOnError(t) {
    this.set(fn.USE_INTERIM_TILES_ON_ERROR, t);
  }
  /**
   * Get data for a pixel location.  The return type depends on the source data.  For image tiles,
   * a four element RGBA array will be returned.  For data tiles, the array length will match the
   * number of bands in the dataset.  For requests outside the layer extent, `null` will be returned.
   * Data for a image tiles can only be retrieved if the source's `crossOrigin` property is set.
   *
   * ```js
   * // display layer data on every pointer move
   * map.on('pointermove', (event) => {
   *   console.log(layer.getData(event.pixel));
   * });
   * ```
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   * @api
   * @override
   */
  getData(t) {
    return super.getData(t);
  }
}
class Za extends pd {
  /**
   * @param {import("./BaseTile.js").Options<TileSourceType>} [options] Tile layer options.
   */
  constructor(t) {
    super(t);
  }
  /**
   * @override
   */
  createRenderer() {
    return new md(this, {
      cacheSize: this.getCacheSize()
    });
  }
}
const He = [0, 0, 0], me = 5;
class Ka {
  /**
   * @param {Options} options Tile grid options.
   */
  constructor(t) {
    this.minZoom = t.minZoom !== void 0 ? t.minZoom : 0, this.resolutions_ = t.resolutions, et(
      Sl(
        this.resolutions_,
        /**
         * @param {number} a First resolution
         * @param {number} b Second resolution
         * @return {number} Comparison result
         */
        (s, r) => r - s
      ),
      "`resolutions` must be sorted in descending order"
    );
    let e;
    if (!t.origins) {
      for (let s = 0, r = this.resolutions_.length - 1; s < r; ++s)
        if (!e)
          e = this.resolutions_[s] / this.resolutions_[s + 1];
        else if (this.resolutions_[s] / this.resolutions_[s + 1] !== e) {
          e = void 0;
          break;
        }
    }
    this.zoomFactor_ = e, this.maxZoom = this.resolutions_.length - 1, this.origin_ = t.origin !== void 0 ? t.origin : null, this.origins_ = null, t.origins !== void 0 && (this.origins_ = t.origins, et(
      this.origins_.length == this.resolutions_.length,
      "Number of `origins` and `resolutions` must be equal"
    ));
    const i = t.extent;
    i !== void 0 && !this.origin_ && !this.origins_ && (this.origin_ = le(i)), et(
      !this.origin_ && this.origins_ || this.origin_ && !this.origins_,
      "Either `origin` or `origins` must be configured, never both"
    ), this.tileSizes_ = null, t.tileSizes !== void 0 && (this.tileSizes_ = t.tileSizes, et(
      this.tileSizes_.length == this.resolutions_.length,
      "Number of `tileSizes` and `resolutions` must be equal"
    )), this.tileSize_ = t.tileSize !== void 0 ? t.tileSize : this.tileSizes_ ? null : ar, et(
      !this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_,
      "Either `tileSize` or `tileSizes` must be configured, never both"
    ), this.extent_ = i !== void 0 ? i : null, this.fullTileRanges_ = null, this.tmpSize_ = [0, 0], this.tmpExtent_ = [0, 0, 0, 0], t.sizes !== void 0 ? this.fullTileRanges_ = t.sizes.map((s, r) => {
      const o = new hr(
        Math.min(0, s[0]),
        Math.max(s[0] - 1, -1),
        Math.min(0, s[1]),
        Math.max(s[1] - 1, -1)
      );
      if (i) {
        const a = this.getTileRangeForExtentAndZ(i, r);
        o.minX = Math.max(a.minX, o.minX), o.maxX = Math.min(a.maxX, o.maxX), o.minY = Math.max(a.minY, o.minY), o.maxY = Math.min(a.maxY, o.maxY);
      }
      return o;
    }) : i && this.calculateTileRanges_(i);
  }
  /**
   * Call a function with each tile coordinate for a given extent and zoom level.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} zoom Integer zoom level.
   * @param {function(import("../tilecoord.js").TileCoord): void} callback Function called with each tile coordinate.
   * @api
   */
  forEachTileCoord(t, e, i) {
    const s = this.getTileRangeForExtentAndZ(t, e);
    for (let r = s.minX, o = s.maxX; r <= o; ++r)
      for (let a = s.minY, l = s.maxY; a <= l; ++a)
        i([e, r, a]);
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {function(number, import("../TileRange.js").default): boolean} callback Callback.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
   * @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
   * @return {boolean} Callback succeeded.
   */
  forEachTileCoordParentTileRange(t, e, i, s) {
    let r, o, a, l = null, h = t[0] - 1;
    for (this.zoomFactor_ === 2 ? (o = t[1], a = t[2]) : l = this.getTileCoordExtent(t, s); h >= this.minZoom; ) {
      if (o !== void 0 && a !== void 0 ? (o = Math.floor(o / 2), a = Math.floor(a / 2), r = qe(o, o, a, a, i)) : r = this.getTileRangeForExtentAndZ(
        l,
        h,
        i
      ), e(h, r))
        return !0;
      --h;
    }
    return !1;
  }
  /**
   * Get the extent for this tile grid, if it was configured.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent() {
    return this.extent_;
  }
  /**
   * Get the maximum zoom level for the grid.
   * @return {number} Max zoom.
   * @api
   */
  getMaxZoom() {
    return this.maxZoom;
  }
  /**
   * Get the minimum zoom level for the grid.
   * @return {number} Min zoom.
   * @api
   */
  getMinZoom() {
    return this.minZoom;
  }
  /**
   * Get the origin for the grid at the given zoom level.
   * @param {number} z Integer zoom level.
   * @return {import("../coordinate.js").Coordinate} Origin.
   * @api
   */
  getOrigin(t) {
    return this.origin_ ? this.origin_ : this.origins_[t];
  }
  /**
   * Get the resolution for the given zoom level.
   * @param {number} z Integer zoom level.
   * @return {number} Resolution.
   * @api
   */
  getResolution(t) {
    return this.resolutions_[t];
  }
  /**
   * Get the list of resolutions for the tile grid.
   * @return {Array<number>} Resolutions.
   * @api
   */
  getResolutions() {
    return this.resolutions_;
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
   * @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
   * @return {import("../TileRange.js").default|null} Tile range.
   */
  getTileCoordChildTileRange(t, e, i) {
    if (t[0] < this.maxZoom) {
      if (this.zoomFactor_ === 2) {
        const r = t[1] * 2, o = t[2] * 2;
        return qe(
          r,
          r + 1,
          o,
          o + 1,
          e
        );
      }
      const s = this.getTileCoordExtent(
        t,
        i || this.tmpExtent_
      );
      return this.getTileRangeForExtentAndZ(
        s,
        t[0] + 1,
        e
      );
    }
    return null;
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {number} z Integer zoom level.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
   * @return {import("../TileRange.js").default|null} Tile range.
   */
  getTileRangeForTileCoordAndZ(t, e, i) {
    if (e > this.maxZoom || e < this.minZoom)
      return null;
    const s = t[0], r = t[1], o = t[2];
    if (e === s)
      return qe(
        r,
        o,
        r,
        o,
        i
      );
    if (this.zoomFactor_) {
      const l = Math.pow(this.zoomFactor_, e - s), h = Math.floor(r * l), c = Math.floor(o * l);
      if (e < s)
        return qe(h, h, c, c, i);
      const u = Math.floor(l * (r + 1)) - 1, d = Math.floor(l * (o + 1)) - 1;
      return qe(h, u, c, d, i);
    }
    const a = this.getTileCoordExtent(t, this.tmpExtent_);
    return this.getTileRangeForExtentAndZ(a, e, i);
  }
  /**
   * Get a tile range for the given extent and integer zoom level.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} z Integer zoom level.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary tile range object.
   * @return {import("../TileRange.js").default} Tile range.
   */
  getTileRangeForExtentAndZ(t, e, i) {
    this.getTileCoordForXYAndZ_(t[0], t[3], e, !1, He);
    const s = He[1], r = He[2];
    this.getTileCoordForXYAndZ_(t[2], t[1], e, !0, He);
    const o = He[1], a = He[2];
    return qe(s, o, r, a, i);
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {import("../coordinate.js").Coordinate} Tile center.
   */
  getTileCoordCenter(t) {
    const e = this.getOrigin(t[0]), i = this.getResolution(t[0]), s = dt(this.getTileSize(t[0]), this.tmpSize_);
    return [
      e[0] + (t[1] + 0.5) * s[0] * i,
      e[1] - (t[2] + 0.5) * s[1] * i
    ];
  }
  /**
   * Get the extent of a tile coordinate.
   *
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../extent.js").Extent} [tempExtent] Temporary extent object.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getTileCoordExtent(t, e) {
    const i = this.getOrigin(t[0]), s = this.getResolution(t[0]), r = dt(this.getTileSize(t[0]), this.tmpSize_), o = i[0] + t[1] * r[0] * s, a = i[1] - (t[2] + 1) * r[1] * s, l = o + r[0] * s, h = a + r[1] * s;
    return Te(o, a, l, h, e);
  }
  /**
   * Get the tile coordinate for the given map coordinate and resolution.  This
   * method considers that coordinates that intersect tile boundaries should be
   * assigned the higher tile coordinate.
   *
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @api
   */
  getTileCoordForCoordAndResolution(t, e, i) {
    return this.getTileCoordForXYAndResolution_(
      t[0],
      t[1],
      e,
      !1,
      i
    );
  }
  /**
   * Note that this method should not be called for resolutions that correspond
   * to an integer zoom level.  Instead call the `getTileCoordForXYAndZ_` method.
   * @param {number} x X.
   * @param {number} y Y.
   * @param {number} resolution Resolution (for a non-integer zoom level).
   * @param {boolean} reverseIntersectionPolicy Instead of letting edge
   *     intersections go to the higher tile coordinate, let edge intersections
   *     go to the lower tile coordinate.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @private
   */
  getTileCoordForXYAndResolution_(t, e, i, s, r) {
    const o = this.getZForResolution(i), a = i / this.getResolution(o), l = this.getOrigin(o), h = dt(this.getTileSize(o), this.tmpSize_);
    let c = a * (t - l[0]) / i / h[0], u = a * (l[1] - e) / i / h[1];
    return s ? (c = rn(c, me) - 1, u = rn(u, me) - 1) : (c = sn(c, me), u = sn(u, me)), Ln(o, c, u, r);
  }
  /**
   * Although there is repetition between this method and `getTileCoordForXYAndResolution_`,
   * they should have separate implementations.  This method is for integer zoom
   * levels.  The other method should only be called for resolutions corresponding
   * to non-integer zoom levels.
   * @param {number} x Map x coordinate.
   * @param {number} y Map y coordinate.
   * @param {number} z Integer zoom level.
   * @param {boolean} reverseIntersectionPolicy Instead of letting edge
   *     intersections go to the higher tile coordinate, let edge intersections
   *     go to the lower tile coordinate.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @private
   */
  getTileCoordForXYAndZ_(t, e, i, s, r) {
    const o = this.getOrigin(i), a = this.getResolution(i), l = dt(this.getTileSize(i), this.tmpSize_);
    let h = (t - o[0]) / a / l[0], c = (o[1] - e) / a / l[1];
    return s ? (h = rn(h, me) - 1, c = rn(c, me) - 1) : (h = sn(h, me), c = sn(c, me)), Ln(i, h, c, r);
  }
  /**
   * Get a tile coordinate given a map coordinate and zoom level.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} z Integer zoom level, e.g. the result of a `getZForResolution()` method call
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @api
   */
  getTileCoordForCoordAndZ(t, e, i) {
    return this.getTileCoordForXYAndZ_(
      t[0],
      t[1],
      e,
      !1,
      i
    );
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {number} Tile resolution.
   */
  getTileCoordResolution(t) {
    return this.resolutions_[t[0]];
  }
  /**
   * Get the tile size for a zoom level. The type of the return value matches the
   * `tileSize` or `tileSizes` that the tile grid was configured with. To always
   * get an {@link import("../size.js").Size}, run the result through {@link module:ol/size.toSize}.
   * @param {number} z Z.
   * @return {number|import("../size.js").Size} Tile size.
   * @api
   */
  getTileSize(t) {
    return this.tileSize_ ? this.tileSize_ : this.tileSizes_[t];
  }
  /**
   * @param {number} z Zoom level.
   * @return {import("../TileRange.js").default|null} Extent tile range for the specified zoom level.
   */
  getFullTileRange(t) {
    return this.fullTileRanges_ ? this.fullTileRanges_[t] : this.extent_ ? this.getTileRangeForExtentAndZ(this.extent_, t) : null;
  }
  /**
   * @param {number} resolution Resolution.
   * @param {number|import("../array.js").NearestDirectionFunction} [opt_direction]
   *     If 0, the nearest resolution will be used.
   *     If 1, the nearest higher resolution (lower Z) will be used. If -1, the
   *     nearest lower resolution (higher Z) will be used. Default is 0.
   *     Use a {@link module:ol/array~NearestDirectionFunction} for more precise control.
   *
   * For example to change tile Z at the midpoint of zoom levels
   * ```js
   * function(value, high, low) {
   *   return value - low * Math.sqrt(high / low);
   * }
   * ```
   * @return {number} Z.
   * @api
   */
  getZForResolution(t, e) {
    const i = vs(
      this.resolutions_,
      t,
      e || 0
    );
    return st(i, this.minZoom, this.maxZoom);
  }
  /**
   * The tile with the provided tile coordinate intersects the given viewport.
   * @param {import('../tilecoord.js').TileCoord} tileCoord Tile coordinate.
   * @param {Array<number>} viewport Viewport as returned from {@link module:ol/extent.getRotatedViewport}.
   * @return {boolean} The tile with the provided tile coordinate intersects the given viewport.
   */
  tileCoordIntersectsViewport(t, e) {
    return pa(
      e,
      0,
      e.length,
      2,
      this.getTileCoordExtent(t)
    );
  }
  /**
   * @param {!import("../extent.js").Extent} extent Extent for this tile grid.
   * @private
   */
  calculateTileRanges_(t) {
    const e = this.resolutions_.length, i = new Array(e);
    for (let s = this.minZoom; s < e; ++s)
      i[s] = this.getTileRangeForExtentAndZ(t, s);
    this.fullTileRanges_ = i;
  }
}
function cr(n) {
  let t = n.getDefaultTileGrid();
  return t || (t = Rd(n), n.setDefaultTileGrid(t)), t;
}
function yd(n, t, e) {
  const i = t[0], s = n.getTileCoordCenter(t), r = ur(e);
  if (!gi(r, s)) {
    const o = $(r), a = Math.ceil(
      (r[0] - s[0]) / o
    );
    return s[0] += o * a, n.getTileCoordForCoordAndZ(s, i);
  }
  return t;
}
function Ed(n, t, e, i) {
  i = i !== void 0 ? i : "top-left";
  const s = Va(n, t, e);
  return new Ka({
    extent: n,
    origin: bl(n, i),
    resolutions: s,
    tileSize: e
  });
}
function xd(n) {
  const t = n || {}, e = t.extent || pt("EPSG:3857").getExtent(), i = {
    extent: e,
    minZoom: t.minZoom,
    tileSize: t.tileSize,
    resolutions: Va(
      e,
      t.maxZoom,
      t.tileSize,
      t.maxResolution
    )
  };
  return new Ka(i);
}
function Va(n, t, e, i) {
  t = t !== void 0 ? t : Zu, e = dt(e !== void 0 ? e : ar);
  const s = lt(n), r = $(n);
  i = i > 0 ? i : Math.max(r / e[0], s / e[1]);
  const o = t + 1, a = new Array(o);
  for (let l = 0; l < o; ++l)
    a[l] = i / Math.pow(2, l);
  return a;
}
function Rd(n, t, e, i) {
  const s = ur(n);
  return Ed(s, t, e, i);
}
function ur(n) {
  n = pt(n);
  let t = n.getExtent();
  if (!t) {
    const e = 180 * Gs.degrees / n.getMetersPerUnit();
    t = Te(-e, -e, e, e);
  }
  return t;
}
function $a(n, t) {
  const e = [];
  Object.keys(t).forEach(function(s) {
    t[s] !== null && t[s] !== void 0 && e.push(s + "=" + encodeURIComponent(t[s]));
  });
  const i = e.join("&");
  return n = n.replace(/[?&]$/, ""), n += n.includes("?") ? "&" : "?", n + i;
}
const Td = /\{z\}/g, Sd = /\{x\}/g, wd = /\{y\}/g, Id = /\{-y\}/g;
function qa(n, t, e, i, s) {
  return n.replace(Td, t.toString()).replace(Sd, e.toString()).replace(wd, i.toString()).replace(Id, function() {
    if (s === void 0)
      throw new Error(
        "If the URL template has a {-y} placeholder, the grid extent must be known"
      );
    return (s - i).toString();
  });
}
function Cd(n, t, e, i) {
  const s = ja(t, e, i), r = se(s, n.length);
  return n[r];
}
function Ha(n) {
  const t = [];
  let e = /\{([a-z])-([a-z])\}/.exec(n);
  if (e) {
    const i = e[1].charCodeAt(0), s = e[2].charCodeAt(0);
    let r;
    for (r = i; r <= s; ++r)
      t.push(n.replace(e[0], String.fromCharCode(r)));
    return t;
  }
  if (e = /\{(\d+)-(\d+)\}/.exec(n), e) {
    const i = parseInt(e[2], 10);
    for (let s = parseInt(e[1], 10); s <= i; s++)
      t.push(n.replace(e[0], s.toString()));
    return t;
  }
  return t.push(n), t;
}
function Ad(n, t) {
  return (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function(e, i, s) {
      if (!e)
        return;
      let r;
      const o = e[0];
      if (t) {
        const a = t.getFullTileRange(o);
        a && (r = a.getHeight() - 1);
      }
      return qa(n, o, e[1], e[2], r);
    }
  );
}
function vd(n, t) {
  const e = n.length, i = new Array(e);
  for (let s = 0; s < e; ++s)
    i[s] = Ad(n[s], t);
  return Md(i);
}
function Md(n) {
  return n.length === 1 ? n[0] : (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function(t, e, i) {
      if (!t)
        return;
      const s = Ba(t), r = se(s, n.length);
      return n[r](t, e, i);
    }
  );
}
class Ja extends Ca {
  /**
   * @param {Options} options SourceTile source options.
   */
  constructor(t) {
    super({
      attributions: t.attributions,
      attributionsCollapsible: t.attributionsCollapsible,
      projection: t.projection,
      state: t.state,
      wrapX: t.wrapX,
      interpolate: t.interpolate
    }), this.on, this.once, this.un, this.tilePixelRatio_ = t.tilePixelRatio !== void 0 ? t.tilePixelRatio : 1, this.tileGrid = t.tileGrid !== void 0 ? t.tileGrid : null;
    const e = [256, 256];
    this.tileGrid && dt(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()), e), this.tmpSize = [0, 0], this.key_ = t.key || H(this), this.tileOptions = {
      transition: t.transition,
      interpolate: t.interpolate
    }, this.zDirection = t.zDirection ? t.zDirection : 0;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   */
  getGutterForProjection(t) {
    return 0;
  }
  /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   */
  getKey() {
    return this.key_;
  }
  /**
   * Set the value to be used as the key for all tiles in the source.
   * @param {string} key The key for tiles.
   * @protected
   */
  setKey(t) {
    this.key_ !== t && (this.key_ = t, this.changed());
  }
  /**
   * @param {import("../proj/Projection").default} [projection] Projection.
   * @return {Array<number>|null} Resolutions.
   * @override
   */
  getResolutions(t) {
    const e = t ? this.getTileGridForProjection(t) : this.tileGrid;
    return e ? e.getResolutions() : null;
  }
  /**
   * @abstract
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {TileType|null} Tile.
   */
  getTile(t, e, i, s, r) {
    return J();
  }
  /**
   * Return the tile grid of the tile source.
   * @return {import("../tilegrid/TileGrid.js").default|null} Tile grid.
   * @api
   */
  getTileGrid() {
    return this.tileGrid;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   */
  getTileGridForProjection(t) {
    return this.tileGrid ? this.tileGrid : cr(t);
  }
  /**
   * Get the tile pixel ratio for this source. Subclasses may override this
   * method, which is meant to return a supported pixel ratio that matches the
   * provided `pixelRatio` as close as possible.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Tile pixel ratio.
   */
  getTilePixelRatio(t) {
    return this.tilePixelRatio_;
  }
  /**
   * @param {number} z Z.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../size.js").Size} Tile size.
   */
  getTilePixelSize(t, e, i) {
    const s = this.getTileGridForProjection(i), r = this.getTilePixelRatio(e), o = dt(s.getTileSize(t), this.tmpSize);
    return r == 1 ? o : Vh(o, r, this.tmpSize);
  }
  /**
   * Returns a tile coordinate wrapped around the x-axis. When the tile coordinate
   * is outside the resolution and extent range of the tile grid, `null` will be
   * returned.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../proj/Projection.js").default} [projection] Projection.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate to be passed to the tileUrlFunction or
   *     null if no tile URL should be created for the passed `tileCoord`.
   */
  getTileCoordForTileUrlFunction(t, e) {
    const i = e !== void 0 ? e : this.getProjection(), s = e !== void 0 ? this.getTileGridForProjection(i) : this.tileGrid || this.getTileGridForProjection(i);
    return this.getWrapX() && i.isGlobal() && (t = yd(s, t, i)), gd(t, s) ? t : null;
  }
  /**
   * Remove all cached reprojected tiles from the source. The next render cycle will create new tiles.
   * @api
   */
  clear() {
  }
  /**
   * @override
   */
  refresh() {
    this.clear(), super.refresh();
  }
}
class Qa extends xi {
  /**
   * @param {string} type Type.
   * @param {import("../Tile.js").default} tile The tile.
   */
  constructor(t, e) {
    super(t), this.tile = e;
  }
}
const ci = {
  /**
   * Triggered when a tile starts loading.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadstart
   * @api
   */
  TILELOADSTART: "tileloadstart",
  /**
   * Triggered when a tile finishes loading, either when its data is loaded,
   * or when loading was aborted because the tile is no longer needed.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadend
   * @api
   */
  TILELOADEND: "tileloadend",
  /**
   * Triggered if tile loading results in an error. Note that this is not the
   * right place to re-fetch tiles. See {@link module:ol/ImageTile~ImageTile#load}
   * for details.
   * @event module:ol/source/Tile.TileSourceEvent#tileloaderror
   * @api
   */
  TILELOADERROR: "tileloaderror"
};
class dr extends Ja {
  /**
   * @param {Options} options Image tile options.
   */
  constructor(t) {
    super({
      attributions: t.attributions,
      cacheSize: t.cacheSize,
      projection: t.projection,
      state: t.state,
      tileGrid: t.tileGrid,
      tilePixelRatio: t.tilePixelRatio,
      wrapX: t.wrapX,
      transition: t.transition,
      interpolate: t.interpolate,
      key: t.key,
      attributionsCollapsible: t.attributionsCollapsible,
      zDirection: t.zDirection
    }), this.generateTileUrlFunction_ = this.tileUrlFunction === dr.prototype.tileUrlFunction, this.tileLoadFunction = t.tileLoadFunction, t.tileUrlFunction && (this.tileUrlFunction = t.tileUrlFunction), this.urls = null, t.urls ? this.setUrls(t.urls) : t.url && this.setUrl(t.url), this.tileLoadingKeys_ = {};
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Return the tile load function of the source.
   * @return {import("../Tile.js").LoadFunction} TileLoadFunction
   * @api
   */
  getTileLoadFunction() {
    return this.tileLoadFunction;
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Return the tile URL function of the source.
   * @return {import("../Tile.js").UrlFunction} TileUrlFunction
   * @api
   */
  getTileUrlFunction() {
    return Object.getPrototypeOf(this).tileUrlFunction === this.tileUrlFunction ? this.tileUrlFunction.bind(this) : this.tileUrlFunction;
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Return the URLs used for this source.
   * When a tileUrlFunction is used instead of url or urls,
   * null will be returned.
   * @return {!Array<string>|null} URLs.
   * @api
   */
  getUrls() {
    return this.urls;
  }
  /**
   * Handle tile change events.
   * @param {import("../events/Event.js").default} event Event.
   * @protected
   */
  handleTileChange(t) {
    const e = (
      /** @type {import("../Tile.js").default} */
      t.target
    ), i = H(e), s = e.getState();
    let r;
    s == O.LOADING ? (this.tileLoadingKeys_[i] = !0, r = ci.TILELOADSTART) : i in this.tileLoadingKeys_ && (delete this.tileLoadingKeys_[i], r = s == O.ERROR ? ci.TILELOADERROR : s == O.LOADED ? ci.TILELOADEND : void 0), r != null && this.dispatchEvent(new Qa(r, e));
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Set the tile load function of the source.
   * @param {import("../Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @api
   */
  setTileLoadFunction(t) {
    this.tileLoadFunction = t, this.changed();
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Set the tile URL function of the source.
   * @param {import("../Tile.js").UrlFunction} tileUrlFunction Tile URL function.
   * @param {string} [key] Optional new tile key for the source.
   * @api
   */
  setTileUrlFunction(t, e) {
    this.tileUrlFunction = t, typeof e < "u" ? this.setKey(e) : this.changed();
  }
  /**
   * Set the URL to use for requests.
   * @param {string} url URL.
   * @api
   */
  setUrl(t) {
    const e = Ha(t);
    this.urls = e, this.setUrls(e);
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Set the URLs to use for requests.
   * @param {Array<string>} urls URLs.
   * @api
   */
  setUrls(t) {
    this.urls = t;
    const e = t.join(`
`);
    this.generateTileUrlFunction_ ? this.setTileUrlFunction(vd(t, this.tileGrid), e) : this.setKey(e);
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {string|undefined} Tile URL.
   */
  tileUrlFunction(t, e, i) {
  }
}
class Ld extends dr {
  /**
   * @param {!Options} options Image tile options.
   */
  constructor(t) {
    super({
      attributions: t.attributions,
      cacheSize: t.cacheSize,
      projection: t.projection,
      state: t.state,
      tileGrid: t.tileGrid,
      tileLoadFunction: t.tileLoadFunction ? t.tileLoadFunction : bd,
      tilePixelRatio: t.tilePixelRatio,
      tileUrlFunction: t.tileUrlFunction,
      url: t.url,
      urls: t.urls,
      wrapX: t.wrapX,
      transition: t.transition,
      interpolate: t.interpolate !== void 0 ? t.interpolate : !0,
      key: t.key,
      attributionsCollapsible: t.attributionsCollapsible,
      zDirection: t.zDirection
    }), this.crossOrigin = t.crossOrigin !== void 0 ? t.crossOrigin : null, this.tileClass = t.tileClass !== void 0 ? t.tileClass : Xa, this.tileGridForProjection = {}, this.reprojectionErrorThreshold_ = t.reprojectionErrorThreshold, this.renderReprojectionEdges_ = !1;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   * @override
   */
  getGutterForProjection(t) {
    return this.getProjection() && t && !ai(this.getProjection(), t) ? 0 : this.getGutter();
  }
  /**
   * @return {number} Gutter.
   */
  getGutter() {
    return 0;
  }
  /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   * @override
   */
  getKey() {
    let t = super.getKey();
    return this.getInterpolate() || (t += ":disable-interpolation"), t;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   * @override
   */
  getTileGridForProjection(t) {
    const e = this.getProjection();
    if (this.tileGrid && (!e || ai(e, t)))
      return this.tileGrid;
    const i = H(t);
    return i in this.tileGridForProjection || (this.tileGridForProjection[i] = cr(t)), this.tileGridForProjection[i];
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {string} key The key set on the tile.
   * @return {!ImageTile} Tile.
   * @private
   */
  createTile_(t, e, i, s, r, o) {
    const a = [t, e, i], l = this.getTileCoordForTileUrlFunction(
      a,
      r
    ), h = l ? this.tileUrlFunction(l, s, r) : void 0, c = new this.tileClass(
      a,
      h !== void 0 ? O.IDLE : O.EMPTY,
      h !== void 0 ? h : "",
      this.crossOrigin,
      this.tileLoadFunction,
      this.tileOptions
    );
    return c.key = o, c.addEventListener(ut.CHANGE, this.handleTileChange.bind(this)), c;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!(ImageTile|ReprojTile)} Tile.
   * @override
   */
  getTile(t, e, i, s, r) {
    const o = this.getProjection();
    if (!o || !r || ai(o, r))
      return this.getTileInternal(
        t,
        e,
        i,
        s,
        o || r
      );
    const a = [t, e, i], l = this.getKey(), h = this.getTileGridForProjection(o), c = this.getTileGridForProjection(r), u = this.getTileCoordForTileUrlFunction(
      a,
      r
    ), d = new Ya(
      o,
      h,
      r,
      c,
      a,
      u,
      this.getTilePixelRatio(s),
      this.getGutter(),
      (g, f, _, m) => this.getTileInternal(g, f, _, m, o),
      this.reprojectionErrorThreshold_,
      this.renderReprojectionEdges_,
      this.tileOptions
    );
    return d.key = l, d;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {!import("../proj/Projection.js").default} projection Projection.
   * @return {!ImageTile} Tile.
   * @protected
   */
  getTileInternal(t, e, i, s, r) {
    const o = this.getKey();
    return this.createTile_(t, e, i, s, r, o);
  }
  /**
   * Sets whether to render reprojection edges or not (usually for debugging).
   * @param {boolean} render Render the edges.
   * @api
   */
  setRenderReprojectionEdges(t) {
    this.renderReprojectionEdges_ != t && (this.renderReprojectionEdges_ = t, this.changed());
  }
  /**
   * Sets the tile grid to use when reprojecting the tiles to the given
   * projection instead of the default tile grid for the projection.
   *
   * This can be useful when the default tile grid cannot be created
   * (e.g. projection has no extent defined) or
   * for optimization reasons (custom tile size, resolutions, ...).
   *
   * @param {import("../proj.js").ProjectionLike} projection Projection.
   * @param {import("../tilegrid/TileGrid.js").default} tilegrid Tile grid to use for the projection.
   * @api
   */
  setTileGridForProjection(t, e) {
    const i = pt(t);
    if (i) {
      const s = H(i);
      s in this.tileGridForProjection || (this.tileGridForProjection[s] = e);
    }
  }
}
function bd(n, t) {
  n.getImage().src = t;
}
const Fd = `
  attribute vec4 a_position;
  attribute vec4 a_texcoord;

  uniform mat4 u_matrix;
  uniform mat4 u_textureMatrix;

  varying vec2 v_texcoord;

  void main() {
    gl_Position = u_matrix * a_position;
    vec2 texcoord = (u_textureMatrix * a_texcoord).xy;
    v_texcoord = texcoord;
  }
`, Dd = `
  precision mediump float;

  varying vec2 v_texcoord;

  uniform sampler2D u_texture;

  void main() {
    if (
      v_texcoord.x < 0.0 ||
      v_texcoord.y < 0.0 ||
      v_texcoord.x > 1.0 ||
      v_texcoord.y > 1.0
    ) {
      discard;
    }
    gl_FragColor = texture2D(u_texture, v_texcoord);
  }
`;
class Od {
  /**
   * @param {WebGLRenderingContext} gl Context to render in.
   */
  constructor(t) {
    this.gl_ = t, this.program_ = Cs(t, Dd, Fd), this.positionLocation = t.getAttribLocation(this.program_, "a_position"), this.texcoordLocation = t.getAttribLocation(this.program_, "a_texcoord"), this.matrixLocation = t.getUniformLocation(this.program_, "u_matrix"), this.textureMatrixLocation = t.getUniformLocation(
      this.program_,
      "u_textureMatrix"
    ), this.textureLocation = t.getUniformLocation(this.program_, "u_texture"), this.positionBuffer = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, this.positionBuffer), this.positions = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1], t.bufferData(
      t.ARRAY_BUFFER,
      new Float32Array(this.positions),
      t.STATIC_DRAW
    ), this.texcoordBuffer = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, this.texcoordBuffer), this.texcoords = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1], t.bufferData(
      t.ARRAY_BUFFER,
      new Float32Array(this.texcoords),
      t.STATIC_DRAW
    );
  }
  /**
   * 2dContext drawImage call implemented in webgl.
   * Unlike images, textures do not have a width and height associated
   * with them so we'll pass in the width and height of the texture.
   *
   * @param {WebGLTexture} tex Image to draw.
   * @param {number} texWidth Image width.
   * @param {number} texHeight Image height.
   * @param {number} srcX Top-left x-point to read src image.
   * @param {number} srcY Top-left y-point to read src image.
   * @param {number} [srcWidth] Width of source to read.
   * @param {number} [srcHeight] Height of source to read.
   * @param {number} [dstX] Top-left x-point of destination.
   * @param {number} [dstY] Top-left y-point of destination.
   * @param {number} [dstWidth] Width of written image in destination.
   * @param {number} [dstHeight] Height of written image in destination.
   * @param {number} [width] Width of canvas.
   * @param {number} [height] Height of canvas.
   */
  drawImage(t, e, i, s, r, o, a, l, h, c, u, d, g) {
    const f = this.gl_;
    l === void 0 && (l = s), h === void 0 && (h = r), o === void 0 && (o = e), a === void 0 && (a = i), c === void 0 && (c = o), u === void 0 && (u = a), d === void 0 && (d = f.canvas.width), g === void 0 && (g = f.canvas.height), f.bindTexture(f.TEXTURE_2D, t), f.useProgram(this.program_), f.bindBuffer(f.ARRAY_BUFFER, this.positionBuffer), f.enableVertexAttribArray(this.positionLocation), f.vertexAttribPointer(this.positionLocation, 2, f.FLOAT, !1, 0, 0), f.bindBuffer(f.ARRAY_BUFFER, this.texcoordBuffer), f.enableVertexAttribArray(this.texcoordLocation), f.vertexAttribPointer(this.texcoordLocation, 2, f.FLOAT, !1, 0, 0);
    let _ = ws(0, d, 0, g, -1, 1);
    _ = id(_, l, h, 0), _ = wo(_, c, u, 1), f.uniformMatrix4fv(this.matrixLocation, !1, _);
    let m = nd(s / e, r / i, 0);
    m = wo(
      m,
      o / e,
      a / i,
      1
    ), f.uniformMatrix4fv(this.textureMatrixLocation, !1, m), f.uniform1i(this.textureLocation, 0), f.drawArrays(f.TRIANGLES, 0, this.positions.length / 2);
  }
}
function vo(n, t, e) {
  const i = n.createShader(t);
  if (i === null)
    throw new Error("Shader compilation failed");
  if (n.shaderSource(i, e), n.compileShader(i), !n.getShaderParameter(i, n.COMPILE_STATUS)) {
    const s = n.getShaderInfoLog(i);
    throw s === null ? new Error("Shader info log creation failed") : new Error(s);
  }
  return i;
}
function Cs(n, t, e) {
  const i = n.createProgram(), s = vo(n, n.VERTEX_SHADER, e), r = vo(n, n.FRAGMENT_SHADER, t);
  if (i === null)
    throw new Error("Program creation failed");
  if (n.attachShader(i, s), n.attachShader(i, r), n.linkProgram(i), !n.getProgramParameter(i, n.LINK_STATUS))
    throw n.getProgramInfoLog(i) === null ? new Error("Program info log creation failed") : new Error();
  return i;
}
const Pd = `
  attribute vec4 a_position;

  uniform mat4 u_matrix;

  void main() {
     gl_Position = u_matrix * a_position;
  }
`, kd = `
  precision mediump float;

  uniform vec4 u_val;
  void main() {
     gl_FragColor = u_val;
  }
`, Gd = `
  attribute vec4 a_position;
  attribute vec2 a_texcoord;

  varying vec2 v_texcoord;

  uniform mat4 u_matrix;

  void main() {
     gl_Position = u_matrix * a_position;
     v_texcoord = a_texcoord;
  }
`, Nd = `
  precision mediump float;

  varying vec2 v_texcoord;

  uniform sampler2D u_texture;

  void main() {
    if (v_texcoord.x < 0.0 || v_texcoord.x > 1.0 || v_texcoord.y < 0.0 || v_texcoord.y > 1.0) {
      discard;
    }
    gl_FragColor = texture2D(u_texture, v_texcoord);
  }
`;
function Xd(n, t, e, i) {
  let s;
  return e && e.length ? s = /** @type {HTMLCanvasElement} */
  e.shift() : Hs ? s = new OffscreenCanvas(n || 300, t || 300) : s = document.createElement("canvas"), n && (s.width = n), t && (s.height = t), /** @type {WebGLRenderingContext} */
  s.getContext("webgl", i);
}
function zd(n) {
  const t = n.canvas;
  t.width = 1, t.height = 1, n.clear(n.COLOR_BUFFER_BIT | n.DEPTH_BUFFER_BIT | n.STENCIL_BUFFER_BIT);
}
const Mo = [];
function Wd(n, t, e, i, s, r, o, a, l, h, c, u, d, g) {
  const f = Math.round(i * t), _ = Math.round(i * e);
  n.canvas.width = f, n.canvas.height = _;
  let m, p;
  if (p = n.createTexture(), n.bindTexture(n.TEXTURE_2D, p), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE), d ? (n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.LINEAR)) : (n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.NEAREST), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.NEAREST)), n.texImage2D(
    n.TEXTURE_2D,
    0,
    n.RGBA,
    f,
    _,
    0,
    n.RGBA,
    c,
    null
  ), m = n.createFramebuffer(), n.bindFramebuffer(n.FRAMEBUFFER, m), n.framebufferTexture2D(
    n.FRAMEBUFFER,
    n.COLOR_ATTACHMENT0,
    n.TEXTURE_2D,
    p,
    0
  ), m === null)
    throw new Error("Could not create framebuffer");
  if (p === null)
    throw new Error("Could not create texture");
  if (l.length === 0)
    return {
      width: f,
      height: _,
      framebuffer: m,
      texture: p
    };
  const y = At();
  l.forEach(function(I, P, L) {
    Bo(y, I.extent);
  });
  let R, E, x;
  const w = 1 / s;
  {
    if (R = n.createTexture(), p === null)
      throw new Error("Could not create texture");
    E = Math.round($(y) * w), x = Math.round(lt(y) * w);
    const I = n.getParameter(n.MAX_TEXTURE_SIZE), P = Math.max(E, x), L = P > I ? I / P : 1, F = Math.round(E * L), M = Math.round(x * L);
    n.bindTexture(n.TEXTURE_2D, R), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE), d ? (n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.LINEAR)) : (n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.NEAREST), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.NEAREST)), n.texImage2D(
      n.TEXTURE_2D,
      0,
      n.RGBA,
      F,
      M,
      0,
      n.RGBA,
      c,
      null
    );
    const G = n.createFramebuffer();
    n.bindFramebuffer(n.FRAMEBUFFER, G), n.framebufferTexture2D(
      n.FRAMEBUFFER,
      n.COLOR_ATTACHMENT0,
      n.TEXTURE_2D,
      R,
      0
    );
    const b = new Od(n);
    l.forEach(function(D, z, N) {
      const k = (D.extent[0] - y[0]) * w * L, W = -(D.extent[3] - y[3]) * w * L, C = $(D.extent) * w * L, Z = lt(D.extent) * w * L;
      if (n.bindFramebuffer(n.FRAMEBUFFER, G), n.viewport(0, 0, F, M), D.clipExtent) {
        const tt = (D.clipExtent[0] - y[0]) * w * L, V = -(D.clipExtent[3] - y[3]) * w * L, it = $(D.clipExtent) * w * L, ot = lt(D.clipExtent) * w * L;
        n.enable(n.SCISSOR_TEST), n.scissor(
          d ? tt : Math.round(tt),
          d ? V : Math.round(V),
          d ? it : Math.round(tt + it) - Math.round(tt),
          d ? ot : Math.round(V + ot) - Math.round(V)
        );
      }
      b.drawImage(
        D.texture,
        D.width,
        D.height,
        h,
        h,
        D.width - 2 * h,
        D.height - 2 * h,
        d ? k : Math.round(k),
        d ? W : Math.round(W),
        d ? C : Math.round(k + C) - Math.round(k),
        d ? Z : Math.round(W + Z) - Math.round(W),
        F,
        M
      ), n.disable(n.SCISSOR_TEST);
    }), n.deleteFramebuffer(G);
  }
  const v = le(o), S = le(y), A = (I) => {
    const P = (I[0][0] - v[0]) / r * i, L = -(I[0][1] - v[1]) / r * i, F = (I[1][0] - v[0]) / r * i, M = -(I[1][1] - v[1]) / r * i, G = (I[2][0] - v[0]) / r * i, b = -(I[2][1] - v[1]) / r * i;
    return { u1: F, v1: M, u0: P, v0: L, u2: G, v2: b };
  };
  n.bindFramebuffer(n.FRAMEBUFFER, m), n.viewport(0, 0, f, _);
  {
    const I = [], P = [], L = Cs(
      n,
      Nd,
      Gd
    );
    n.useProgram(L);
    const F = n.getUniformLocation(L, "u_texture");
    n.bindTexture(n.TEXTURE_2D, R), n.uniform1i(F, 0), a.getTriangles().forEach(function(k, W, C) {
      const Z = k.source, tt = k.target, { u1: V, v1: it, u0: ot, v0: yt, u2: $t, v2: ht } = A(tt), ze = (Z[0][0] - S[0]) / s / E, We = -(Z[0][1] - S[1]) / s / x, Ue = (Z[1][0] - S[0]) / s / E, Ut = -(Z[1][1] - S[1]) / s / x, Ce = (Z[2][0] - S[0]) / s / E, Mt = -(Z[2][1] - S[1]) / s / x;
      I.push(V, it, ot, yt, $t, ht), P.push(Ue, Ut, ze, We, Ce, Mt);
    });
    const M = ws(0, f, _, 0, -1, 1), G = n.getUniformLocation(L, "u_matrix");
    n.uniformMatrix4fv(G, !1, M);
    const b = n.getAttribLocation(L, "a_position"), D = n.createBuffer();
    n.bindBuffer(n.ARRAY_BUFFER, D), n.bufferData(n.ARRAY_BUFFER, new Float32Array(I), n.STATIC_DRAW), n.vertexAttribPointer(b, 2, n.FLOAT, !1, 0, 0), n.enableVertexAttribArray(b);
    const z = n.getAttribLocation(L, "a_texcoord"), N = n.createBuffer();
    n.bindBuffer(n.ARRAY_BUFFER, N), n.bufferData(n.ARRAY_BUFFER, new Float32Array(P), n.STATIC_DRAW), n.vertexAttribPointer(z, 2, n.FLOAT, !1, 0, 0), n.enableVertexAttribArray(z), n.drawArrays(n.TRIANGLES, 0, I.length / 2);
  }
  if (u) {
    const I = Cs(
      n,
      kd,
      Pd
    );
    n.useProgram(I);
    const P = ws(0, f, _, 0, -1, 1), L = n.getUniformLocation(I, "u_matrix");
    n.uniformMatrix4fv(L, !1, P);
    const F = Array.isArray(u) ? u : [0, 0, 0, 255], M = n.getUniformLocation(I, "u_val");
    n.uniform4fv(M, F);
    const G = n.getAttribLocation(I, "a_position"), b = n.createBuffer();
    n.bindBuffer(n.ARRAY_BUFFER, b), n.vertexAttribPointer(G, 2, n.FLOAT, !1, 0, 0), n.enableVertexAttribArray(G);
    const D = a.getTriangles().reduce(function(z, N) {
      const k = N.target, { u1: W, v1: C, u0: Z, v0: tt, u2: V, v2: it } = A(k);
      return z.concat([W, C, Z, tt, Z, tt, V, it, V, it, W, C]);
    }, []);
    n.bufferData(n.ARRAY_BUFFER, new Float32Array(D), n.STATIC_DRAW), n.drawArrays(n.LINES, 0, D.length / 2);
  }
  return {
    width: f,
    height: _,
    framebuffer: m,
    texture: p
  };
}
class Ud extends Mn {
  /**
   * @param {Options} options Tile options.
   */
  constructor(t) {
    super({
      tileCoord: t.tileCoord,
      loader: () => Promise.resolve(new Uint8ClampedArray(4)),
      interpolate: t.interpolate,
      transition: t.transition
    }), this.renderEdges_ = t.renderEdges !== void 0 ? t.renderEdges : !1, this.pixelRatio_ = t.pixelRatio, this.gutter_ = t.gutter, this.reprojData_ = null, this.reprojError_ = null, this.reprojSize_ = void 0, this.sourceTileGrid_ = t.sourceTileGrid, this.targetTileGrid_ = t.targetTileGrid, this.wrappedTileCoord_ = t.wrappedTileCoord || t.tileCoord, this.sourceTiles_ = [], this.sourcesListenerKeys_ = null, this.sourceZ_ = 0;
    const e = t.sourceProj, i = e.getExtent(), s = t.sourceTileGrid.getExtent();
    this.clipExtent_ = e.canWrapX() ? s ? Zt(i, s) : i : s;
    const r = this.targetTileGrid_.getTileCoordExtent(
      this.wrappedTileCoord_
    ), o = this.targetTileGrid_.getExtent();
    let a = this.sourceTileGrid_.getExtent();
    const l = o ? Zt(r, o) : r;
    if (Ni(l) === 0) {
      this.state = O.EMPTY;
      return;
    }
    i && (a ? a = Zt(a, i) : a = i);
    const h = this.targetTileGrid_.getResolution(
      this.wrappedTileCoord_[0]
    ), c = t.targetProj, u = za(
      e,
      c,
      l,
      h
    );
    if (!isFinite(u) || u <= 0) {
      this.state = O.EMPTY;
      return;
    }
    const d = t.errorThreshold !== void 0 ? t.errorThreshold : Ua;
    if (this.triangulation_ = new Wa(
      e,
      c,
      l,
      a,
      u * d,
      h,
      t.transformMatrix
    ), this.triangulation_.getTriangles().length === 0) {
      this.state = O.EMPTY;
      return;
    }
    this.sourceZ_ = this.sourceTileGrid_.getZForResolution(u);
    let g = this.triangulation_.calculateSourceExtent();
    if (a && (e.canWrapX() ? (g[1] = st(
      g[1],
      a[1],
      a[3]
    ), g[3] = st(
      g[3],
      a[1],
      a[3]
    )) : g = Zt(g, a)), !Ni(g))
      this.state = O.EMPTY;
    else {
      let f = 0, _ = 0;
      e.canWrapX() && (f = $(i), _ = Math.floor(
        (g[0] - i[0]) / f
      )), ks(
        g.slice(),
        e,
        !0
      ).forEach((p) => {
        const y = this.sourceTileGrid_.getTileRangeForExtentAndZ(
          p,
          this.sourceZ_
        ), R = t.getTileFunction;
        for (let E = y.minX; E <= y.maxX; E++)
          for (let x = y.minY; x <= y.maxY; x++) {
            const w = R(this.sourceZ_, E, x, this.pixelRatio_);
            if (w) {
              const v = _ * f;
              this.sourceTiles_.push({ tile: w, offset: v });
            }
          }
        ++_;
      }), this.sourceTiles_.length === 0 && (this.state = O.EMPTY);
    }
  }
  /**
   * Get the tile size.
   * @return {import('../size.js').Size} Tile size.
   * @override
   */
  getSize() {
    return this.reprojSize_;
  }
  /**
   * Get the data for the tile.
   * @return {import("../DataTile.js").Data} Tile data.
   * @override
   */
  getData() {
    return this.reprojData_;
  }
  /**
   * Get any loading error.
   * @return {Error} Loading error.
   * @override
   */
  getError() {
    return this.reprojError_;
  }
  /**
   * @private
   */
  reproject_() {
    const t = [];
    let e = !1;
    if (this.sourceTiles_.forEach((E) => {
      var W;
      const x = E.tile;
      if (!x || x.getState() !== O.LOADED)
        return;
      const w = x.getSize(), v = this.gutter_;
      let S;
      const A = sd(x.getData());
      A ? S = A : (e = !0, S = od(vn(x.getData())));
      const I = [w[0] + 2 * v, w[1] + 2 * v], P = S instanceof Float32Array, L = I[0] * I[1], F = P ? Float32Array : Uint8ClampedArray, M = new F(S.buffer), G = F.BYTES_PER_ELEMENT, b = G * M.length / L, D = M.byteLength / I[1], z = Math.floor(
        D / G / I[0]
      ), N = this.sourceTileGrid_.getTileCoordExtent(x.tileCoord);
      N[0] += E.offset, N[2] += E.offset;
      const k = (W = this.clipExtent_) == null ? void 0 : W.slice();
      k && (k[0] += E.offset, k[2] += E.offset), t.push({
        extent: N,
        clipExtent: k,
        data: M,
        dataType: F,
        bytesPerPixel: b,
        pixelSize: I,
        bandCount: z
      });
    }), this.sourceTiles_.length = 0, t.length === 0) {
      this.state = O.ERROR, this.changed();
      return;
    }
    const i = this.wrappedTileCoord_[0], s = this.targetTileGrid_.getTileSize(i), r = typeof s == "number" ? s : s[0], o = typeof s == "number" ? s : s[1], a = r * this.pixelRatio_, l = o * this.pixelRatio_, h = this.targetTileGrid_.getResolution(i), c = this.sourceTileGrid_.getResolution(this.sourceZ_), u = this.targetTileGrid_.getTileCoordExtent(
      this.wrappedTileCoord_
    ), d = t[0].bandCount, g = new t[0].dataType(d * a * l), f = Xd(a, l, Mo, {
      premultipliedAlpha: !1,
      antialias: !1
    });
    let _;
    const m = f.RGBA;
    let p;
    t[0].dataType == Float32Array ? (p = f.FLOAT, f.getExtension("WEBGL_color_buffer_float"), f.getExtension("OES_texture_float"), f.getExtension("EXT_float_blend"), _ = f.getExtension("OES_texture_float_linear") !== null && this.interpolate) : (p = f.UNSIGNED_BYTE, _ = this.interpolate);
    const y = 4, R = Math.ceil(d / y);
    for (let E = R - 1; E >= 0; --E) {
      const x = [];
      for (let F = 0, M = t.length; F < M; ++F) {
        const G = t[F], b = G.pixelSize, D = b[0], z = b[1], N = new G.dataType(y * D * z), k = G.data;
        let W = E * y;
        for (let Z = 0, tt = N.length; Z < tt; Z += y)
          N[Z] = k[W], N[Z + 1] = k[W + 1], N[Z + 2] = k[W + 2], N[Z + 3] = k[W + 3], W += d;
        const C = f.createTexture();
        f.bindTexture(f.TEXTURE_2D, C), _ ? (f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.LINEAR), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.LINEAR)) : (f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.NEAREST), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.NEAREST)), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE), f.texImage2D(
          f.TEXTURE_2D,
          0,
          m,
          D,
          z,
          0,
          m,
          p,
          N
        ), x.push({
          extent: G.extent,
          clipExtent: G.clipExtent,
          texture: C,
          width: D,
          height: z
        });
      }
      const { framebuffer: w, width: v, height: S } = Wd(
        f,
        r,
        o,
        this.pixelRatio_,
        c,
        h,
        u,
        this.triangulation_,
        x,
        this.gutter_,
        p,
        this.renderEdges_,
        _
      ), A = v, I = S * y, P = new t[0].dataType(A * I);
      f.bindFramebuffer(f.FRAMEBUFFER, w), f.readPixels(0, 0, v, S, f.RGBA, p, P);
      let L = E * y;
      for (let F = 0, M = P.length; F < M; F += y) {
        const G = (A - 1 - (F / I | 0)) * I + F % I;
        g[L] = P[G], g[L + 1] = P[G + 1], g[L + 2] = P[G + 2], g[L + 3] = P[G + 3], L += d;
      }
    }
    if (zd(f), Mo.push(f.canvas), e) {
      const E = rt(r, o), x = new ImageData(g, r);
      E.putImageData(x, 0, 0), this.reprojData_ = E.canvas;
    } else
      this.reprojData_ = g;
    this.reprojSize_ = [Math.round(a), Math.round(l)], this.state = O.LOADED, this.changed();
  }
  /**
   * Load not yet loaded URI.
   * @override
   */
  load() {
    if (this.state !== O.IDLE && this.state !== O.ERROR)
      return;
    this.state = O.LOADING, this.changed();
    let t = 0;
    this.sourcesListenerKeys_ = [], this.sourceTiles_.forEach(({ tile: e }) => {
      const i = e.getState();
      if (i !== O.IDLE && i !== O.LOADING)
        return;
      t++;
      const s = kt(e, ut.CHANGE, () => {
        const r = e.getState();
        (r == O.LOADED || r == O.ERROR || r == O.EMPTY) && (Ct(s), t--, t === 0 && (this.unlistenSources_(), this.reproject_()));
      });
      this.sourcesListenerKeys_.push(s);
    }), t === 0 ? setTimeout(this.reproject_.bind(this), 0) : this.sourceTiles_.forEach(function({ tile: e }) {
      e.getState() == O.IDLE && e.load();
    });
  }
  /**
   * @private
   */
  unlistenSources_() {
    this.sourcesListenerKeys_.forEach(Ct), this.sourcesListenerKeys_ = null;
  }
}
class Yd extends Ja {
  /**
   * @param {Options} options DataTile source options.
   */
  constructor(t) {
    const e = t.projection === void 0 ? "EPSG:3857" : t.projection;
    let i = t.tileGrid;
    i === void 0 && e && (i = xd({
      extent: ur(e),
      maxResolution: t.maxResolution,
      maxZoom: t.maxZoom,
      minZoom: t.minZoom,
      tileSize: t.tileSize
    })), super({
      cacheSize: 0.1,
      // don't cache on the source
      attributions: t.attributions,
      attributionsCollapsible: t.attributionsCollapsible,
      projection: e,
      tileGrid: i,
      state: t.state,
      wrapX: t.wrapX,
      transition: t.transition,
      interpolate: t.interpolate,
      key: t.key,
      zDirection: t.zDirection
    }), this.gutter_ = t.gutter !== void 0 ? t.gutter : 0, this.tileSize_ = t.tileSize ? dt(t.tileSize) : null, this.tileSizes_ = null, this.tileLoadingKeys_ = {}, this.loader_ = t.loader, this.handleTileChange_ = this.handleTileChange_.bind(this), this.bandCount = t.bandCount === void 0 ? 4 : t.bandCount, this.tileGridForProjection_ = {}, this.crossOrigin_ = t.crossOrigin || "anonymous", this.transformMatrix = null;
  }
  /**
   * Set the source tile sizes.  The length of the array is expected to match the number of
   * levels in the tile grid.
   * @protected
   * @param {Array<import('../size.js').Size>} tileSizes An array of tile sizes.
   */
  setTileSizes(t) {
    this.tileSizes_ = t;
  }
  /**
   * Get the source tile size at the given zoom level.  This may be different than the rendered tile
   * size.
   * @protected
   * @param {number} z Tile zoom level.
   * @return {import('../size.js').Size} The source tile size.
   */
  getTileSize(t) {
    if (this.tileSizes_)
      return this.tileSizes_[t];
    if (this.tileSize_)
      return this.tileSize_;
    const e = this.getTileGrid();
    return e ? dt(e.getTileSize(t)) : [256, 256];
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   * @override
   */
  getGutterForProjection(t) {
    const e = this.getProjection();
    return (!e || ai(e, t)) && !this.transformMatrix ? this.gutter_ : 0;
  }
  /**
   * @param {Loader} loader The data loader.
   * @protected
   */
  setLoader(t) {
    this.loader_ = t;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../proj/Projection.js").default} targetProj The output projection.
   * @param {import("../proj/Projection.js").default} sourceProj The input projection.
   * @return {!TileType} Tile.
   */
  getReprojTile_(t, e, i, s, r) {
    const o = this.tileGrid || this.getTileGridForProjection(r || s), a = Math.max.apply(
      null,
      o.getResolutions().map((g, f) => {
        const _ = dt(o.getTileSize(f)), m = this.getTileSize(f);
        return Math.max(
          m[0] / _[0],
          m[1] / _[1]
        );
      })
    ), l = this.getTileGridForProjection(s), h = [t, e, i], c = this.getTileCoordForTileUrlFunction(
      h,
      s
    ), u = Object.assign(
      {
        sourceProj: r || s,
        sourceTileGrid: o,
        targetProj: s,
        targetTileGrid: l,
        tileCoord: h,
        wrappedTileCoord: c,
        pixelRatio: a,
        gutter: this.gutter_,
        getTileFunction: (g, f, _, m) => this.getTile(g, f, _, m),
        transformMatrix: this.transformMatrix
      },
      /** @type {import("../reproj/DataTile.js").Options} */
      this.tileOptions
    ), d = (
      /** @type {TileType} */
      /** @type {*} */
      new Ud(u)
    );
    return d.key = this.getKey(), d;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} [projection] Projection.
   * @return {TileType|null} Tile (or null if outside source extent).
   * @override
   */
  getTile(t, e, i, s, r) {
    var R;
    const o = this.getProjection();
    if (r && (o && !ai(o, r) || this.transformMatrix))
      return this.getReprojTile_(t, e, i, r, o);
    const a = this.getTileSize(t), l = this.loader_, h = new AbortController(), c = {
      signal: h.signal,
      crossOrigin: this.crossOrigin_
    }, u = this.getTileCoordForTileUrlFunction([t, e, i]);
    if (!u)
      return null;
    const d = u[0], g = u[1], f = u[2], _ = (R = this.getTileGrid()) == null ? void 0 : R.getFullTileRange(d);
    _ && (c.maxY = _.getHeight() - 1);
    function m() {
      return Il(function() {
        return l(d, g, f, c);
      });
    }
    const p = Object.assign(
      {
        tileCoord: [t, e, i],
        loader: m,
        size: a,
        controller: h
      },
      this.tileOptions
    ), y = (
      /** @type {TileType} */
      /** @type {*} */
      new Mn(p)
    );
    return y.key = this.getKey(), y.addEventListener(ut.CHANGE, this.handleTileChange_), y;
  }
  /**
   * Handle tile change events.
   * @param {import("../events/Event.js").default} event Event.
   */
  handleTileChange_(t) {
    const e = (
      /** @type {import("../Tile.js").default} */
      t.target
    ), i = H(e), s = e.getState();
    let r;
    s == O.LOADING ? (this.tileLoadingKeys_[i] = !0, r = ci.TILELOADSTART) : i in this.tileLoadingKeys_ && (delete this.tileLoadingKeys_[i], r = s == O.ERROR ? ci.TILELOADERROR : s == O.LOADED ? ci.TILELOADEND : void 0), r && this.dispatchEvent(new Qa(r, e));
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   * @override
   */
  getTileGridForProjection(t) {
    const e = this.getProjection();
    if (this.tileGrid && (!e || ai(e, t)) && !this.transformMatrix)
      return this.tileGrid;
    const i = H(t);
    return i in this.tileGridForProjection_ || (this.tileGridForProjection_[i] = cr(t)), this.tileGridForProjection_[i];
  }
  /**
   * Sets the tile grid to use when reprojecting the tiles to the given
   * projection instead of the default tile grid for the projection.
   *
   * This can be useful when the default tile grid cannot be created
   * (e.g. projection has no extent defined) or
   * for optimization reasons (custom tile size, resolutions, ...).
   *
   * @param {import("../proj.js").ProjectionLike} projection Projection.
   * @param {import("../tilegrid/TileGrid.js").default} tilegrid Tile grid to use for the projection.
   * @api
   */
  setTileGridForProjection(t, e) {
    const i = pt(t);
    if (i) {
      const s = H(i);
      s in this.tileGridForProjection_ || (this.tileGridForProjection_[s] = e);
    }
  }
}
const Lo = 4, Bd = new Error("Image failed to load");
function tl(n, t, e, i, s) {
  return new Promise((r, o) => {
    const a = new Image();
    a.crossOrigin = s.crossOrigin ?? null, a.addEventListener("load", () => r(a)), a.addEventListener("error", () => o(Bd)), a.src = qa(n, t, e, i, s.maxY);
  });
}
function bo(n) {
  return function(t, e, i, s) {
    const r = Cd(n, t, e, i);
    return tl(r, t, e, i, s);
  };
}
function jd(n) {
  return function(t, e, i, s) {
    const r = n(t, e, i, s);
    return tl(r, t, e, i, s);
  };
}
function Fo(n) {
  let t;
  if (Array.isArray(n))
    t = bo(n);
  else if (typeof n == "string") {
    const e = Ha(n);
    t = bo(e);
  } else if (typeof n == "function")
    t = jd(n);
  else
    throw new Error(
      "The url option must be a single template, an array of templates, or a function for getting a URL"
    );
  return t;
}
let Do = 0;
function Oo(n) {
  return Array.isArray(n) ? n.join(`
`) : typeof n == "string" ? n : (++Do, "url-function-key-" + Do);
}
class Zd extends Yd {
  /**
   * @param {Options} [options] DataTile source options.
   */
  constructor(t) {
    t = t || {};
    let e = t.loader, i;
    t.url && (e = Fo(t.url), i = Oo(t.url));
    const s = e ? t.state : "loading", r = t.wrapX === void 0 ? !0 : t.wrapX;
    super({
      loader: e,
      key: i,
      attributions: t.attributions,
      attributionsCollapsible: t.attributionsCollapsible,
      maxZoom: t.maxZoom,
      minZoom: t.minZoom,
      tileSize: t.tileSize,
      gutter: t.gutter,
      maxResolution: t.maxResolution,
      projection: t.projection,
      tileGrid: t.tileGrid,
      state: s,
      wrapX: r,
      transition: t.transition,
      interpolate: t.interpolate !== !1,
      crossOrigin: t.crossOrigin,
      zDirection: t.zDirection
    });
  }
  /**
   * @param {UrlLike} url The new URL.
   * @api
   */
  setUrl(t) {
    const e = Fo(t);
    this.setLoader(e), this.setKey(Oo(t)), this.getState() !== "ready" && this.setState("ready");
  }
}
const As = "1.3.0";
function Kd(n, t, e, i, s) {
  s.WIDTH = e[0], s.HEIGHT = e[1];
  const r = i.getAxisOrientation(), o = $o(s.VERSION, "1.3") >= 0;
  s[o ? "CRS" : "SRS"] = i.getCode();
  const a = o && r.startsWith("ne") ? [t[1], t[0], t[3], t[2]] : t;
  return s.BBOX = a.join(","), $a(n, s);
}
function Vd(n, t, e, i, s, r, o) {
  r = Object.assign({ REQUEST: "GetMap" }, r);
  const a = t / e, l = [
    Cr($(n) / a, Lo),
    Cr(lt(n) / a, Lo)
  ];
  if (e != 1)
    switch (o) {
      case "geoserver":
        const c = 90 * e + 0.5 | 0;
        "FORMAT_OPTIONS" in r ? r.FORMAT_OPTIONS += ";dpi:" + c : r.FORMAT_OPTIONS = "dpi:" + c;
        break;
      case "mapserver":
        r.MAP_RESOLUTION = 90 * e;
        break;
      case "carmentaserver":
      case "qgis":
        r.DPI = 90 * e;
        break;
      default:
        throw new Error("Unknown `serverType` configured");
    }
  return Kd(s, n, l, i, r);
}
function Po(n, t) {
  return Object.assign(
    {
      REQUEST: t,
      SERVICE: "WMS",
      VERSION: As,
      FORMAT: "image/png",
      STYLES: "",
      TRANSPARENT: "TRUE"
    },
    n
  );
}
class $d extends Ld {
  /**
   * @param {Options} [options] Tile WMS options.
   */
  constructor(t) {
    t = t || /** @type {Options} */
    {};
    const e = Object.assign({}, t.params);
    super({
      attributions: t.attributions,
      attributionsCollapsible: t.attributionsCollapsible,
      cacheSize: t.cacheSize,
      crossOrigin: t.crossOrigin,
      interpolate: t.interpolate,
      projection: t.projection,
      reprojectionErrorThreshold: t.reprojectionErrorThreshold,
      tileClass: t.tileClass,
      tileGrid: t.tileGrid,
      tileLoadFunction: t.tileLoadFunction,
      url: t.url,
      urls: t.urls,
      wrapX: t.wrapX !== void 0 ? t.wrapX : !0,
      transition: t.transition,
      zDirection: t.zDirection
    }), this.gutter_ = t.gutter !== void 0 ? t.gutter : 0, this.params_ = e, this.v13_ = !0, this.serverType_ = t.serverType, this.hidpi_ = t.hidpi !== void 0 ? t.hidpi : !0, this.tmpExtent_ = At(), this.updateV13_(), this.setKey(this.getKeyForParams_());
  }
  /**
   * Return the GetFeatureInfo URL for the passed coordinate, resolution, and
   * projection. Return `undefined` if the GetFeatureInfo URL cannot be
   * constructed.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {import("../proj.js").ProjectionLike} projection Projection.
   * @param {!Object} params GetFeatureInfo params. `INFO_FORMAT` at least should
   *     be provided. If `QUERY_LAYERS` is not provided then the layers specified
   *     in the `LAYERS` parameter will be used. `VERSION` should not be
   *     specified here.
   * @return {string|undefined} GetFeatureInfo URL.
   * @api
   */
  getFeatureInfoUrl(t, e, i, s) {
    const r = pt(i), o = this.getProjection() || r;
    let a = this.getTileGrid();
    a || (a = this.getTileGridForProjection(o));
    const l = qi(
      t,
      r,
      o
    ), h = Is(
      o,
      r,
      t,
      e
    ), c = a.getZForResolution(h, this.zDirection), u = a.getResolution(c), d = a.getTileCoordForCoordAndZ(l, c);
    if (a.getResolutions().length <= d[0])
      return;
    let g = a.getTileCoordExtent(d, this.tmpExtent_);
    const f = this.gutter_;
    f !== 0 && (g = Gi(g, u * f, g));
    const _ = {
      QUERY_LAYERS: this.params_.LAYERS
    };
    Object.assign(
      _,
      Po(this.params_, "GetFeatureInfo"),
      s
    );
    const m = Math.floor((l[0] - g[0]) / u), p = Math.floor((g[3] - l[1]) / u);
    return _[this.v13_ ? "I" : "X"] = m, _[this.v13_ ? "J" : "Y"] = p, this.getRequestUrl_(
      d,
      g,
      1,
      o || r,
      _
    );
  }
  /**
   * Return the GetLegendGraphic URL, optionally optimized for the passed
   * resolution and possibly including any passed specific parameters. Returns
   * `undefined` if the GetLegendGraphic URL cannot be constructed.
   *
   * @param {number} [resolution] Resolution. If set to undefined, `SCALE`
   *     will not be calculated and included in URL.
   * @param {Object} [params] GetLegendGraphic params. If `LAYER` is set, the
   *     request is generated for this wms layer, else it will try to use the
   *     configured wms layer. Default `FORMAT` is `image/png`.
   *     `VERSION` should not be specified here.
   * @return {string|undefined} GetLegendGraphic URL.
   * @api
   */
  getLegendUrl(t, e) {
    if (this.urls[0] === void 0)
      return;
    const i = {
      SERVICE: "WMS",
      VERSION: As,
      REQUEST: "GetLegendGraphic",
      FORMAT: "image/png"
    };
    if (e === void 0 || e.LAYER === void 0) {
      const s = this.params_.LAYERS;
      if (!(!Array.isArray(s) || s.length === 1))
        return;
      i.LAYER = s;
    }
    if (t !== void 0) {
      const s = this.getProjection() ? this.getProjection().getMetersPerUnit() : 1, r = 28e-5;
      i.SCALE = t * s / r;
    }
    return Object.assign(i, e), $a(
      /** @type {string} */
      this.urls[0],
      i
    );
  }
  /**
   * @return {number} Gutter.
   * @override
   */
  getGutter() {
    return this.gutter_;
  }
  /**
   * Get the user-provided params, i.e. those passed to the constructor through
   * the "params" option, and possibly updated using the updateParams method.
   * @return {Object} Params.
   * @api
   */
  getParams() {
    return this.params_;
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../extent.js").Extent} tileExtent Tile extent.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {Object} params Params.
   * @return {string|undefined} Request URL.
   * @private
   */
  getRequestUrl_(t, e, i, s, r) {
    const o = this.urls;
    if (!o)
      return;
    let a;
    if (o.length == 1)
      a = o[0];
    else {
      const l = se(Ba(t), o.length);
      a = o[l];
    }
    return Vd(
      e,
      (this.tileGrid || this.getTileGridForProjection(s)).getResolution(t[0]),
      i,
      s,
      a,
      r,
      this.serverType_
    );
  }
  /**
   * Get the tile pixel ratio for this source.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Tile pixel ratio.
   * @override
   */
  getTilePixelRatio(t) {
    return !this.hidpi_ || this.serverType_ === void 0 ? 1 : t;
  }
  /**
   * @private
   * @return {string} The key for the current params.
   */
  getKeyForParams_() {
    let t = 0;
    const e = [];
    for (const i in this.params_)
      e[t++] = i + "-" + this.params_[i];
    return e.join("/");
  }
  /**
   * Update the user-provided params.
   * @param {Object} params Params.
   * @api
   */
  updateParams(t) {
    Object.assign(this.params_, t), this.updateV13_(), this.setKey(this.getKeyForParams_());
  }
  /**
   * @private
   */
  updateV13_() {
    const t = this.params_.VERSION || As;
    this.v13_ = $o(t, "1.3") >= 0;
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord The tile coordinate
   * @param {number} pixelRatio The pixel ratio
   * @param {import("../proj/Projection.js").default} projection The projection
   * @return {string|undefined} The tile URL
   * @override
   */
  tileUrlFunction(t, e, i) {
    let s = this.getTileGrid();
    if (s || (s = this.getTileGridForProjection(i)), s.getResolutions().length <= t[0])
      return;
    e != 1 && (!this.hidpi_ || this.serverType_ === void 0) && (e = 1);
    const r = s.getResolution(t[0]);
    let o = s.getTileCoordExtent(t, this.tmpExtent_);
    const a = this.gutter_;
    a !== 0 && (o = Gi(o, r * a, o));
    const l = Object.assign(
      {},
      Po(this.params_, "GetMap")
    );
    return this.getRequestUrl_(
      t,
      o,
      e,
      i,
      l
    );
  }
}
function tf(n = "standaard") {
  const t = pl(n);
  if (t.subdomains) {
    let e = t.subdomains;
    t.url = t.url.replace(
      "{s}",
      "{" + e.slice(0, 1) + "-" + e.slice(-1) + "}"
    );
  }
  return new Za({
    source: new Zd({
      attributions: [t.attribution],
      url: t.url
    })
  });
}
function ef(n) {
  let t = new Re({
    image: new Ji({
      anchor: Tr().iconAnchor,
      anchorXUnits: "pixels",
      anchorYUnits: "pixels",
      src: Tr().url
    })
  }), e, i;
  if (typeof n != "object") {
    const a = Hd(map);
    e = a.latitude, i = a.longitude;
  } else
    e = n.latitude, i = n.longitude;
  const s = Ys([i, e]);
  var r = new js({
    geometry: new Gn(s),
    name: "marker"
  });
  r.setStyle(t);
  var o = new Dc({
    features: [r]
  });
  return new ed({
    source: o
  });
}
function nf(n, t) {
  const e = yl(n, t);
  return new Za({
    source: new $d({
      url: e.url,
      params: {
        LAYERS: e.layerName,
        VERSION: e.version,
        STYLES: e.styleName
      }
    })
  });
}
function sf(n, t) {
  let e = document.createElement("img"), i = document.createElement("div");
  i.className = "nlmaps-geolocator-control ol-control", i.appendChild(e), i.addEventListener("click", function() {
    n.start();
  });
  function s(o, a = a) {
    let l = a.getView().getZoom(), h = Ss({
      center: Ys([o.coords.longitude, o.coords.latitude]),
      zoom: l
    });
    a.setView(h);
  }
  return n.on("position", function(o) {
    s(o, t);
  }), new zo({ element: i });
}
function qd(n, t) {
  const e = Ys(n.coordinates);
  t.getView().setCenter(e), t.getView().setZoom(18);
}
function Hd(n) {
  const t = n.getView().getCenter(), e = _h(t);
  return {
    longitude: e[0],
    latitude: e[1]
  };
}
function rf(n) {
  let t = It.createControl(qd, n);
  t = new zo({ element: t }), n.addControl(t);
}
export {
  tf as bgLayer,
  sf as geoLocatorControl,
  rf as geocoderControl,
  Hd as getMapCenter,
  ef as markerLayer,
  nf as overlayLayer
};
