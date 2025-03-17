function K(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var w = { exports: {} }, N;
function Q() {
  return N || (N = 1, w.exports = function(e) {
    return e || (e = {}), e._subs = [], e._paused = !1, e._pending = [], e.on = function(t, o) {
      e._subs[t] = e._subs[t] || [], e._subs[t].push(o);
    }, e.off = function(t, o) {
      if (e._subs[t]) {
        for (var r in e._subs[t])
          if (e._subs[t][r] === o) {
            e._subs[t].splice(r);
            break;
          }
      }
    }, e.emit = function(t) {
      if (e._subs[t]) {
        var o = Array.prototype.slice.call(arguments, 1);
        if (e._paused) {
          e._pending[t] = e._pending[t] || [], e._pending[t].push(o);
          return;
        }
        for (var r in e._subs[t])
          e._subs[t][r].apply(e, o);
      }
    }, e.pause = function() {
      e._paused = !0;
    }, e.resume = function() {
      e._paused = !1;
      for (var t in e._pending)
        for (var o = 0; o < e._pending[t].length; o++)
          e.emit(t, e._pending[t][o]);
    }, e;
  }), w.exports;
}
var H = Q();
const J = /* @__PURE__ */ K(H), f = {
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
}, s = {};
s.BASE_DEFAULTS = {
  crs: "EPSG:3857",
  attr: "",
  minZoom: 0,
  maxZoom: 19,
  type: "wmts",
  format: "png",
  url: ""
};
s.WMS_DEFAULTS = {
  url: "",
  version: "1.1.1",
  transparent: !0,
  format: "image/png",
  minZoom: 0,
  maxZoom: 24,
  styleName: ""
};
s.BASEMAP_PROVIDERS = {};
s.WMS_PROVIDERS = {};
s.GEOCODER = {};
s.MAP = {
  zoomposition: "bottomleft"
};
s.MARKER = {};
s.CLASSNAMES = {
  geocoderContainer: ["nlmaps-geocoder-control-container"],
  geocoderSearch: ["nlmaps-geocoder-control-search"],
  geocoderButton: ["nlmaps-geocoder-control-button"],
  geocoderResultList: ["nlmaps-geocoder-result-list"],
  geocoderResultItem: ["nlmaps-geocoder-result-item"]
};
function v(e) {
  throw e;
}
function y(e, t) {
  return Object.assign({}, e, t);
}
function Y(e) {
  let t = y(s.BASE_DEFAULTS, e.defaults);
  (!e.layers || e.layers.length < 0) && v("no basemap defined, please define a basemap in the configuration"), e.layers.forEach((o) => {
    (!o.name || s.BASEMAP_PROVIDERS[o.name] !== void 0) && v("basemap names need to be defined and unique: " + o.name), s.BASEMAP_PROVIDERS[o.name] = oe(y(t, o));
  });
}
function X(e) {
  let t = y(s.WMS_DEFAULTS, e.defaults);
  e.layers && e.layers.forEach((o) => {
    (!o.name || s.WMS_PROVIDERS[o.name] !== void 0) && v("wms names need to be defined and unique: " + o.name), s.WMS_PROVIDERS[o.name] = re(y(t, o));
  });
}
function ee(e) {
  s.GEOCODER.lookupUrl = e.lookupUrl, s.GEOCODER.suggestUrl = e.suggestUrl, s.GEOCODER.placeholder = e.placeholder;
}
function te(e) {
  s.MAP = y(s.MAP, e);
}
function oe(e) {
  switch (e.type) {
    case "wmts":
      e.url = `${e.url}/${e.layerName}/${e.crs}/{z}/{x}/{y}.${e.format}`;
      break;
    case "tms":
      e.url = `${e.url}/${e.layerName}/{z}/{x}/{y}.${e.format}`;
      break;
    default:
      e.url = `${e.url}/${e.type}/${e.layerName}/${e.crs}/{z}/{x}/{y}.${e.format}`;
  }
  return e;
}
function re(e) {
  let t = e.url.indexOf("{");
  if (t > -1) {
    let o = e.url.indexOf("}");
    e.url.slice(t + 1, o).toLowerCase() === "workspacename" ? e.url = e.url.slice(0, t) + e.workSpaceName + e.url.slice(o + 1, -1) : v("only workspacename templates are supported for now");
  }
  return e;
}
function ne(e) {
  s.FEATUREQUERYBASEURL = e;
}
function se(e) {
  s.CLASSNAMES = y(s.CLASSNAMES, e);
}
function ae(e) {
  s.MARKER = e;
}
f.featureQuery !== void 0 && ne(f.featureQuery.baseUrl);
f.map !== void 0 && te(f.map);
Y(f.basemaps);
f.wms !== void 0 && X(f.wms);
f.geocoder !== void 0 && ee(f.geocoder);
f.marker !== void 0 && ae(f.marker);
f.classnames !== void 0 && se(f.classnames);
const d = s.GEOCODER;
function x(e) {
  return new Promise((t, o) => {
    var r = new XMLHttpRequest();
    r.onreadystatechange = function() {
      r.readyState == 4 && r.status == 200 && t(JSON.parse(r.responseText));
    }, r.open("GET", e, !0), r.send(null);
  });
}
function P(e) {
  if (!e.includes("POINT"))
    throw TypeError("Provided WKT geometry is not a point.");
  const t = e.split("(")[1].split(")")[0], o = parseFloat(t.split(" ")[0]), r = parseFloat(t.split(" ")[1]);
  return {
    type: "Point",
    coordinates: [o, r]
  };
}
d.resultList = [];
d.selectedResult = -1;
d.doSuggestRequest = function(e) {
  return x(`${this.suggestUrl}q=${encodeURIComponent(e)}`);
};
d.doLookupRequest = function(e) {
  return x(`${this.lookupUrl}id=${encodeURIComponent(e)}`).then((t) => {
    const o = t.response.docs[0];
    return o.centroide_ll = P(o.centroide_ll), o.centroide_rd = P(o.centroide_rd), o;
  });
};
d.createControl = function(e, t) {
  this.zoomTo = e, this.map = t;
  const o = document.createElement("div"), r = document.createElement("form"), n = document.createElement("input"), i = document.createElement("button"), u = document.createElement("div");
  return S(o, s.CLASSNAMES.geocoderContainer), S(r, s.CLASSNAMES.geocoderSearch), o.addEventListener("click", (l) => l.stopPropagation()), o.addEventListener("dblclick", (l) => l.stopPropagation()), n.id = "nlmaps-geocoder-control-input", n.placeholder = d.placeholder, n.setAttribute("aria-label", d.placeholder), n.setAttribute("type", "text"), n.setAttribute("autocapitalize", "off"), n.setAttribute("autocomplete", "off"), n.setAttribute("autocorrect", "off"), n.setAttribute("spellcheck", "false"), n.addEventListener("keydown", (l) => {
    let h = this.resultList;
    this.resultList.length > 0 && ((l.code === "ArrowDown" || l.keyCode === 40) && (this.selectedResult < this.resultList.length - 1 && this.selectedResult++, this.showLookupResult(h[this.selectedResult])), (l.code === "ArrowUp" || l.keyCode === 38) && (this.selectedResult > 0 && this.selectedResult--, this.showLookupResult(h[this.selectedResult])), l.code === "Escape" && this.clearSuggestResults(!0));
  }), n.addEventListener("input", (l) => {
    this.suggest(l.target.value);
  }), n.addEventListener("focus", (l) => {
    this.suggest(l.target.value);
  }), i.setAttribute("type", "submit"), r.addEventListener("submit", (l) => {
    l.preventDefault(), this.resultList.length > 0 && this.lookup(this.resultList[this.selectedResult < 0 ? 0 : this.selectedResult].id);
  }), i.setAttribute("aria-label", d.placeholder), S(i, s.CLASSNAMES.geocoderButton), u.id = "nlmaps-geocoder-control-results", S(u, s.CLASSNAMES.geocoderResultList), u.classList.add("nlmaps-hidden"), o.appendChild(r), r.appendChild(n), r.appendChild(i), o.appendChild(u), o;
};
d.suggest = function(e) {
  if (e.length < 3) {
    this.clearSuggestResults();
    return;
  }
  this.doSuggestRequest(e).then((t) => {
    this.resultList = t.response.docs, this.showSuggestResults(this.resultList);
  });
};
d.lookup = function(e) {
  this.doLookupRequest(e).then((t) => {
    this.zoomTo(t.centroide_ll, this.map), this.showLookupResult(t), this.clearSuggestResults();
  });
};
d.clearSuggestResults = function(e) {
  this.selectedResult = -1, e && (document.getElementById("nlmaps-geocoder-control-input").value = ""), document.getElementById("nlmaps-geocoder-control-results").innerHTML = "", document.getElementById("nlmaps-geocoder-control-results").classList.add("nlmaps-hidden");
};
d.showLookupResult = function(e) {
  let t = document.getElementsByClassName(s.CLASSNAMES.geocoderResultItem);
  Array.prototype.map.call(t, (r) => r.classList.remove(s.CLASSNAMES.geocoderResultSelected));
  let o = document.getElementById(e.id);
  o && o.classList.add(s.CLASSNAMES.geocoderResultSelected), document.getElementById("nlmaps-geocoder-control-input").value = e.weergavenaam;
};
function S(e, t) {
  t.forEach((o) => {
    e.classList.add(o);
  });
}
d.showSuggestResults = function(e) {
  if (this.clearSuggestResults(), e.length > 0) {
    const t = document.createElement("ul");
    e.forEach((o) => {
      const r = document.createElement("li"), n = document.createElement("a");
      n.innerHTML = o.weergavenaam, n.id = o.id, S(n, s.CLASSNAMES.geocoderResultItem), n.setAttribute("href", "#"), n.addEventListener("click", (i) => {
        i.preventDefault(), this.lookup(i.target.id);
      }), r.appendChild(n), t.appendChild(r);
    }), document.getElementById("nlmaps-geocoder-control-results").classList.remove("nlmaps-hidden"), document.getElementById("nlmaps-geocoder-control-results").appendChild(t);
  }
};
function R() {
  return s.MARKER;
}
function le() {
  return s.MAP.extent;
}
function ie(e) {
  if (e in s.BASEMAP_PROVIDERS) {
    var t = s.BASEMAP_PROVIDERS[e];
    return t.deprecated && console && console.warn && console.warn(e + " is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference."), t;
  } else
    console.error("NL Maps error: You asked for a style which does not exist! Available styles: " + Object.keys(s.BASEMAP_PROVIDERS).join(", "));
}
function ce(e, t) {
  let o;
  return e in s.WMS_PROVIDERS ? (o = s.WMS_PROVIDERS[e], o.deprecated && console && console.warn && console.warn(e + " is a deprecated wms; it will be redirected to its replacement. For performance improvements, please change your reference.")) : (o = Object.assign({}, s.WMS_DEFAULTS, t), console.log(
    "NL Maps: You asked for a wms which does not exist! Available wmses: " + Object.keys(s.WMS_PROVIDERS).join(", ") + ". Provide an options object to make your own WMS."
  )), o;
}
function D() {
  let e = le(), t = L.latLng(e[0], e[1]), o = L.latLng(e[2], e[3]);
  return L.latLngBounds(t, o);
}
typeof L < "u" && typeof L == "object" && (L.NlmapsBgLayer = L.TileLayer.extend({
  initialize: function(e = "standaard", t) {
    const o = ie(e), r = L.Util.extend({}, t, {
      minZoom: o.minZoom,
      maxZoom: o.maxZoom,
      scheme: "xyz",
      attribution: o.attribution,
      subdomains: o.subdomains ? o.subdomains : "abc",
      sa_id: e
    });
    L.TileLayer.prototype.initialize.call(this, o.url, r);
  }
}), L.nlmapsBgLayer = function(e, t) {
  return new L.NlmapsBgLayer(e, t);
}, L.NlmapsOverlayLayer = L.TileLayer.WMS.extend({
  initialize: function(e = "", t) {
    const o = ce(e, t), r = o.url, n = L.Util.extend({}, t, {
      layers: o.layerName,
      maxZoom: 24,
      minZoom: 1,
      styles: o.styleName,
      version: o.version,
      transparent: o.transparent,
      format: o.format
    });
    L.TileLayer.WMS.prototype.initialize.call(this, r, n);
  }
}), L.nlmapsOverlayLayer = function(e, t) {
  return new L.NlmapsOverlayLayer(e, t);
}, L.Control.GeoLocatorControl = L.Control.extend({
  options: {
    position: "topright"
  },
  initialize: function(e) {
    for (let t in e)
      typeof this.options[t] == "object" ? L.extend(this.options[t], e[t]) : this.options[t] = e[t];
  },
  onAdd: function(e) {
    let t = L.DomUtil.create("div");
    t.id = "nlmaps-geolocator-control", t.className = "nlmaps-geolocator-control";
    let o = document.createElement("img");
    t.append(o), this.options.geolocator.isStarted() && L.DomUtil.addClass(t, "started");
    function r(n) {
      e.panTo([n.coords.latitude, n.coords.longitude]);
    }
    return L.DomEvent.on(
      t,
      "click",
      function() {
        this.options.geolocator.start(), L.DomUtil.addClass(t, "started");
      },
      this
    ), this.options.geolocator.on("position", function(n) {
      L.DomUtil.removeClass(t, "started"), L.DomUtil.addClass(t, "has-position"), r(n);
    }), t;
  },
  onRemove: function(e) {
    return e;
  }
}), L.geoLocatorControl = function(e) {
  return new L.Control.GeoLocatorControl({ geolocator: e });
});
function U(e) {
  if (typeof L < "u" && typeof L == "object") {
    let t, o;
    if (typeof e > "u") {
      const r = C(map);
      t = r.latitude, o = r.longitude;
    } else
      t = e.latitude, o = e.longitude;
    return new L.marker([t, o], {
      alt: "marker",
      icon: new L.icon({
        iconUrl: R().url,
        iconSize: R().iconSize,
        iconAnchor: R().iconAnchor
      })
    });
  }
}
function B(e) {
  if (typeof L < "u" && typeof L == "object")
    return L.nlmapsBgLayer(e);
}
function I(e, t) {
  if (typeof L < "u" && typeof L == "object")
    return L.nlmapsOverlayLayer(e, t);
}
function T(e) {
  if (typeof L < "u" && typeof L == "object")
    return L.geoLocatorControl(e);
}
function ue(e, t) {
  t.fitBounds(L.geoJSON(e).getBounds(), { maxZoom: 18 });
}
function z(e) {
  const t = d.createControl(ue, e);
  t.addEventListener("click", (o) => o.stopPropagation()), e.getContainer().appendChild(t);
}
function C(e) {
  const t = e.getCenter();
  return {
    latitude: t.lat,
    longitude: t.lng
  };
}
if (typeof window < "u")
  for (const [e, t] of Object.entries({
    bgLayer: B,
    overlayLayer: I,
    markerLayer: U,
    extentLeafletFormat: D,
    getMapCenter: C,
    geoLocatorControl: T,
    geocoderControl: z
  }))
    window[e] = t;
function de(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var $ = { exports: {} };
$.exports = function(e) {
  return e || (e = {}), e._subs = [], e._paused = !1, e._pending = [], e.on = function(t, o) {
    e._subs[t] = e._subs[t] || [], e._subs[t].push(o);
  }, e.off = function(t, o) {
    if (e._subs[t]) {
      for (var r in e._subs[t])
        if (e._subs[t][r] === o) {
          e._subs[t].splice(r);
          break;
        }
    }
  }, e.emit = function(t) {
    if (e._subs[t]) {
      var o = Array.prototype.slice.call(arguments, 1);
      if (e._paused) {
        e._pending[t] = e._pending[t] || [], e._pending[t].push(o);
        return;
      }
      for (var r in e._subs[t])
        e._subs[t][r].apply(e, o);
    }
  }, e.pause = function() {
    e._paused = !0;
  }, e.resume = function() {
    e._paused = !1;
    for (var t in e._pending)
      for (var o = 0; o < e._pending[t].length; o++)
        e.emit(t, e._pending[t][o]);
  }, e;
};
var pe = $.exports;
const me = /* @__PURE__ */ de(pe), fe = {
  follow: !1
};
function ge(e) {
  this.emit("position", e);
}
function he(e) {
  this.emit("error", e);
}
const Le = function(e) {
  const t = Object.assign({}, fe, e);
  return {
    start() {
      return t.started = !0, navigator.geolocation.getCurrentPosition(
        ge.bind(this),
        he.bind(this),
        { maximumAge: 6e4 }
      ), this;
    },
    stop() {
      return t.started = !1, this;
    },
    isStarted() {
      return t.started;
    },
    log() {
      return console.log(t), this;
    }
  };
};
function j(e) {
  let t = typeof window < "u" ? window.navigator || {} : {};
  if (typeof t < "u" && "geolocation" in t) {
    let o = me(Le(e));
    return o.on("position", function() {
      this.stop();
    }), o;
  } else
    throw "geolocation is not available in your browser.";
}
if (typeof window < "u")
  for (const [e, t] of Object.entries({
    geoLocator: j
  }))
    window[e] = t;
const g = {
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
}, a = {};
a.BASE_DEFAULTS = {
  crs: "EPSG:3857",
  attr: "",
  minZoom: 0,
  maxZoom: 19,
  type: "wmts",
  format: "png",
  url: ""
};
a.WMS_DEFAULTS = {
  url: "",
  version: "1.1.1",
  transparent: !0,
  format: "image/png",
  minZoom: 0,
  maxZoom: 24,
  styleName: ""
};
a.BASEMAP_PROVIDERS = {};
a.WMS_PROVIDERS = {};
a.GEOCODER = {};
a.MAP = {
  zoomposition: "bottomleft"
};
a.MARKER = {};
a.CLASSNAMES = {
  geocoderContainer: ["nlmaps-geocoder-control-container"],
  geocoderSearch: ["nlmaps-geocoder-control-search"],
  geocoderButton: ["nlmaps-geocoder-control-button"],
  geocoderResultList: ["nlmaps-geocoder-result-list"],
  geocoderResultItem: ["nlmaps-geocoder-result-item"]
};
function E(e) {
  throw e;
}
function k(e, t) {
  return Object.assign({}, e, t);
}
function ye(e) {
  let t = k(a.BASE_DEFAULTS, e.defaults);
  (!e.layers || e.layers.length < 0) && E("no basemap defined, please define a basemap in the configuration"), e.layers.forEach((o) => {
    (!o.name || a.BASEMAP_PROVIDERS[o.name] !== void 0) && E("basemap names need to be defined and unique: " + o.name), a.BASEMAP_PROVIDERS[o.name] = ve(k(t, o));
  });
}
function ke(e) {
  let t = k(a.WMS_DEFAULTS, e.defaults);
  e.layers && e.layers.forEach((o) => {
    (!o.name || a.WMS_PROVIDERS[o.name] !== void 0) && E("wms names need to be defined and unique: " + o.name), a.WMS_PROVIDERS[o.name] = Ee(k(t, o));
  });
}
function Se(e) {
  a.GEOCODER.lookupUrl = e.lookupUrl, a.GEOCODER.suggestUrl = e.suggestUrl, a.GEOCODER.placeholder = e.placeholder;
}
function be(e) {
  a.MAP = k(a.MAP, e);
}
function ve(e) {
  switch (e.type) {
    case "wmts":
      e.url = `${e.url}/${e.layerName}/${e.crs}/{z}/{x}/{y}.${e.format}`;
      break;
    case "tms":
      e.url = `${e.url}/${e.layerName}/{z}/{x}/{y}.${e.format}`;
      break;
    default:
      e.url = `${e.url}/${e.type}/${e.layerName}/${e.crs}/{z}/{x}/{y}.${e.format}`;
  }
  return e;
}
function Ee(e) {
  let t = e.url.indexOf("{");
  if (t > -1) {
    let o = e.url.indexOf("}");
    e.url.slice(t + 1, o).toLowerCase() === "workspacename" ? e.url = e.url.slice(0, t) + e.workSpaceName + e.url.slice(o + 1, -1) : E("only workspacename templates are supported for now");
  }
  return e;
}
function we(e) {
  a.FEATUREQUERYBASEURL = e;
}
function Re(e) {
  a.CLASSNAMES = k(a.CLASSNAMES, e);
}
function Ae(e) {
  a.MARKER = e;
}
g.featureQuery !== void 0 && we(g.featureQuery.baseUrl);
g.map !== void 0 && be(g.map);
ye(g.basemaps);
g.wms !== void 0 && ke(g.wms);
g.geocoder !== void 0 && Se(g.geocoder);
g.marker !== void 0 && Ae(g.marker);
g.classnames !== void 0 && Re(g.classnames);
const m = a.GEOCODER;
function G(e) {
  return new Promise((t, o) => {
    var r = new XMLHttpRequest();
    r.onreadystatechange = function() {
      r.readyState == 4 && r.status == 200 && t(JSON.parse(r.responseText));
    }, r.open("GET", e, !0), r.send(null);
  });
}
function O(e) {
  if (!e.includes("POINT"))
    throw TypeError("Provided WKT geometry is not a point.");
  const t = e.split("(")[1].split(")")[0], o = parseFloat(t.split(" ")[0]), r = parseFloat(t.split(" ")[1]);
  return {
    type: "Point",
    coordinates: [o, r]
  };
}
m.resultList = [];
m.selectedResult = -1;
m.doSuggestRequest = function(e) {
  return G(`${this.suggestUrl}q=${encodeURIComponent(e)}`);
};
m.doLookupRequest = function(e) {
  return G(`${this.lookupUrl}id=${encodeURIComponent(e)}`).then((t) => {
    const o = t.response.docs[0];
    return o.centroide_ll = O(o.centroide_ll), o.centroide_rd = O(o.centroide_rd), o;
  });
};
m.createControl = function(e, t) {
  this.zoomTo = e, this.map = t;
  const o = document.createElement("div"), r = document.createElement("form"), n = document.createElement("input"), i = document.createElement("button"), u = document.createElement("div");
  return b(o, a.CLASSNAMES.geocoderContainer), b(r, a.CLASSNAMES.geocoderSearch), o.addEventListener("click", (l) => l.stopPropagation()), o.addEventListener("dblclick", (l) => l.stopPropagation()), n.id = "nlmaps-geocoder-control-input", n.placeholder = m.placeholder, n.setAttribute("aria-label", m.placeholder), n.setAttribute("type", "text"), n.setAttribute("autocapitalize", "off"), n.setAttribute("autocomplete", "off"), n.setAttribute("autocorrect", "off"), n.setAttribute("spellcheck", "false"), n.addEventListener("keydown", (l) => {
    let h = this.resultList;
    this.resultList.length > 0 && ((l.code === "ArrowDown" || l.keyCode === 40) && (this.selectedResult < this.resultList.length - 1 && this.selectedResult++, this.showLookupResult(h[this.selectedResult])), (l.code === "ArrowUp" || l.keyCode === 38) && (this.selectedResult > 0 && this.selectedResult--, this.showLookupResult(h[this.selectedResult])), l.code === "Escape" && this.clearSuggestResults(!0));
  }), n.addEventListener("input", (l) => {
    this.suggest(l.target.value);
  }), n.addEventListener("focus", (l) => {
    this.suggest(l.target.value);
  }), i.setAttribute("type", "submit"), r.addEventListener("submit", (l) => {
    l.preventDefault(), this.resultList.length > 0 && this.lookup(this.resultList[this.selectedResult < 0 ? 0 : this.selectedResult].id);
  }), i.setAttribute("aria-label", m.placeholder), b(i, a.CLASSNAMES.geocoderButton), u.id = "nlmaps-geocoder-control-results", b(u, a.CLASSNAMES.geocoderResultList), u.classList.add("nlmaps-hidden"), o.appendChild(r), r.appendChild(n), r.appendChild(i), o.appendChild(u), o;
};
m.suggest = function(e) {
  if (e.length < 3) {
    this.clearSuggestResults();
    return;
  }
  this.doSuggestRequest(e).then((t) => {
    this.resultList = t.response.docs, this.showSuggestResults(this.resultList);
  });
};
m.lookup = function(e) {
  this.doLookupRequest(e).then((t) => {
    this.zoomTo(t.centroide_ll, this.map), this.showLookupResult(t), this.clearSuggestResults();
  });
};
m.clearSuggestResults = function(e) {
  this.selectedResult = -1, e && (document.getElementById("nlmaps-geocoder-control-input").value = ""), document.getElementById("nlmaps-geocoder-control-results").innerHTML = "", document.getElementById("nlmaps-geocoder-control-results").classList.add("nlmaps-hidden");
};
m.showLookupResult = function(e) {
  let t = document.getElementsByClassName(a.CLASSNAMES.geocoderResultItem);
  Array.prototype.map.call(t, (r) => r.classList.remove(a.CLASSNAMES.geocoderResultSelected));
  let o = document.getElementById(e.id);
  o && o.classList.add(a.CLASSNAMES.geocoderResultSelected), document.getElementById("nlmaps-geocoder-control-input").value = e.weergavenaam;
};
function b(e, t) {
  t.forEach((o) => {
    e.classList.add(o);
  });
}
m.showSuggestResults = function(e) {
  if (this.clearSuggestResults(), e.length > 0) {
    const t = document.createElement("ul");
    e.forEach((o) => {
      const r = document.createElement("li"), n = document.createElement("a");
      n.innerHTML = o.weergavenaam, n.id = o.id, b(n, a.CLASSNAMES.geocoderResultItem), n.setAttribute("href", "#"), n.addEventListener("click", (i) => {
        i.preventDefault(), this.lookup(i.target.id);
      }), r.appendChild(n), t.appendChild(r);
    }), document.getElementById("nlmaps-geocoder-control-results").classList.remove("nlmaps-hidden"), document.getElementById("nlmaps-geocoder-control-results").appendChild(t);
  }
};
let p = {
  markers: [],
  removeMarker: function(e) {
    let t = p.markers.findIndex((o) => o === e);
    p.markers[t].remove(), p.markers.splice(t, 1);
  },
  addMarker: function(e, t = !1) {
    p.markers.push(e), Object.hasOwn(e, "on") && t && e.on("click", function() {
      p.removeMarker(e);
    });
  }
};
function Z(e, t, o, r) {
  let n = L.marker([t.latlng.lat, t.latlng.lng], {
    alt: "marker",
    icon: new L.icon({
      iconUrl: A().url,
      iconSize: A().iconSize,
      iconAnchor: A().iconAnchor
    })
  });
  if (n.addTo(e), o) {
    let i = o.call(p, t, n), u = L.popup({ offset: [0, -50] }).setContent(i);
    n.bindPopup(u).openPopup(), p.addMarker(n);
  } else r ? p.addMarker(n) : p.addMarker(n, !0);
}
function _e(e, t) {
  return M(e), (o, r, n, i) => {
    o === 1 && (p.markers[0] && p.removeMarker(p.markers[0]), Z(e, r, t, i));
  };
}
function Ce(e, t, o) {
  return M(e), (r, n) => {
    r === 1 && Z(e, n, t, o);
  };
}
function Me(e) {
  return new Promise((o, r) => {
    fetch(e).then((n) => o(n.json())).catch((n) => r(n));
  });
}
const Ne = (e, t, o) => (r) => function(i, u) {
  i === 0 && r(0, (l, h) => {
    if (l === 1) {
      let F = t(e, { x: h.latlng.lng, y: h.latlng.lat });
      Me(F).then((V) => {
        let W = {
          queryResult: o(V),
          latlng: h.latlng
        };
        u(1, W);
      });
    } else
      u(l, h);
  });
}, Pe = function(e, t, o, r) {
  const n = Ne(t, o, r)(e);
  return n.subscribe = function(i) {
    n(0, i);
  }, n;
};
function A() {
  return a.MARKER;
}
function M(e) {
  Object.hasOwn(e, "_container") && e._container.classList.add("nlmaps-marker-cursor");
}
let c = {
  leaflet: {
    bgLayer: B,
    overlayLayer: I,
    markerLayer: U,
    geocoderControl: z,
    geoLocatorControl: T
  }
};
J(c);
const Oe = {};
function xe() {
  return typeof L == "object" ? "leaflet" : "too few libs";
}
function De(e) {
  let t, o, r, n;
  return o = document.getElementById(e.target), o.style.position = "relative", o.style.padding = "0px", o.style.margin = "0px", n = {}, e.attribution || (n.attributionControl = !1), r = L.DomUtil.create("div"), r.style.height = "100%", o.appendChild(r), n.maxBounds = D(), t = L.map(r, n).setView(
    [e.center.latitude, e.center.longitude],
    e.zoom
  ), e.attribution && t.attributionControl.setPrefix(!1), t.zoomControl.setPosition(a.MAP.zoomposition), t;
}
function _(e, t) {
  t.addLayer(e);
}
function Ue(e) {
  return c.leaflet.bgLayer(e);
}
function Be(e) {
  return c.leaflet.overlayLayer(e);
}
function Ie(e) {
  return c.leaflet.markerLayer(e);
}
function Te(e) {
  return C(e);
}
function q(e, t) {
  return Object.assign({}, e, t);
}
c.lib = xe();
c.createMap = function(e = {}) {
  const t = q(a.MAP, e);
  try {
    if (c.lib !== "leaflet")
      throw {
        message: "NL Maps supports only Leaflet at the moment. Please include Leaflet in your project."
      };
  } catch (n) {
    console.error(n.message);
  }
  const o = De(t), r = Ue(t.style);
  if (_(r, o), t.search && $e(o), t.marker) {
    let n = t.marker;
    typeof t.marker == "boolean" && (n = Te(o));
    let i = Ie(n);
    p.addMarker(i, !0), _(i, o);
  }
  if (t.overlay && t.overlay !== "false") {
    const n = Be(t.overlay);
    _(n, o);
  }
  return o !== void 0 && c.lib === "leaflet" && o.on("click", function(n) {
    c.emit("mapclick", n);
  }), o;
};
function ze(e, t) {
  c.leaflet.geoLocatorControl(e).addTo(t);
}
function $e(e) {
  c.leaflet.geocoderControl(e, c);
}
c.geoLocate = function(e, t = {}) {
  const o = q(Oe, t), r = j(o);
  ze(r, e);
};
c.clickProvider = function(e) {
  if (c.lib === "leaflet") {
    M(e);
    const t = function(o, r) {
      if (o !== 0) return;
      e.on("click", function(i) {
        r(1, i);
      }), r(0, () => {
      });
    };
    return t.subscribe = function(o) {
      t(0, o);
    }, t;
  }
};
c.queryFeatures = Pe;
c.singleMarker = _e;
c.multiMarker = Ce;
typeof window < "u" && (window.nlmaps = c);
export {
  c as nlmaps
};
