const l = {
    basemaps: {
      defaults: {
        crs: 'EPSG:3857',
        attribution:
          "Kaartgegevens &copy; <a href='https://www.kadaster.nl'>Kadaster</a> |             <a href='https://www.verbeterdekaart.nl'>Verbeter de kaart</a>",
        minZoom: 6,
        maxZoom: 19,
        type: 'wmts',
        format: 'png',
        url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0',
      },
      layers: [
        {
          url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0',
          crs: 'EPSG:3857',
          format: 'png',
          name: 'standaard',
          layerName: 'standaard',
        },
        {
          url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0',
          crs: 'EPSG:3857',
          format: 'png',
          name: 'grijs',
          layerName: 'grijs',
        },
        {
          url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0',
          crs: 'EPSG:3857',
          format: 'png',
          name: 'pastel',
          layerName: 'pastel',
        },
        {
          name: 'luchtfoto',
          crs: 'EPSG:3857',
          layerName: 'Actueel_ortho25',
          url: 'https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0',
          format: 'jpeg',
        },
      ],
    },
    wms: {
      defaults: {
        url: 'https://service.pdok.nl/{workSpaceName}?',
        version: '1.1.1',
        transparent: !0,
        format: 'image/png',
        minZoom: 0,
        maxZoom: 24,
      },
      layers: [
        {
          name: 'adressen',
          url: 'https://service.pdok.nl/kadaster/adressen/wms/v1_0?',
          layerName: 'adressen',
        },
        {
          name: 'percelen',
          url: 'https://service.pdok.nl/kadaster/kadastralekaart/wms/v5_0?',
          layerName: 'Kadastralekaart',
        },
        {
          name: 'gebouwen',
          url: 'https://service.pdok.nl/lv/bag/wms/v2_0?',
          layerName: 'pand',
        },
        {
          name: 'drone-no-fly-zones',
          url: 'https://service.pdok.nl/lvnl/drone-no-flyzones/wms/v1_0?',
          layerName: 'luchtvaartgebieden,landingsite',
        },
        {
          name: 'hoogte',
          url: 'https://service.pdok.nl/rws/ahn/wms/v1_0?',
          layerName: 'dsm_05m',
        },
        {
          name: 'gemeenten',
          url: 'https://service.pdok.nl/kadaster/bestuurlijkegebieden/wms/v1_0?',
          layerName: 'Gemeentegebied',
          styleName: 'Gemeentegebied',
        },
        {
          name: 'provincies',
          url: 'https://service.pdok.nl/kadaster/bestuurlijkegebieden/wms/v1_0?',
          layerName: 'Provinciegebied',
          styleName: 'Provinciegebied',
        },
        {
          name: 'land',
          url: 'https://service.pdok.nl/kadaster/bestuurlijkegebieden/wms/v1_0?',
          layerName: 'Landgebied',
          styleName: 'Landgebied',
        },
      ],
    },
    geocoder: {
      suggestUrl: 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/suggest?',
      lookupUrl: 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?',
      placeholder: 'Zoomen naar adres ...',
    },
    map: {
      style: 'standaard',
      center: {
        latitude: 52.093249,
        longitude: 5.111994,
      },
      zoom: 8,
      attribution: !0,
      extent: [-180, -90, 180, 90],
      zoomposition: 'topleft',
    },
    marker: {
      url: 'https://rawgit.com/geo-frontend/nlmaps/master/dist/assets/img/marker_icon.svg',
      iconSize: [64, 64],
      iconAnchor: [32, 64],
    },
    classnames: {
      geocoderContainer: ['nlmaps-geocoder-control-container'],
      geocoderSearch: ['nlmaps-geocoder-control-search'],
      geocoderButton: ['nlmaps-geocoder-control-button'],
      geocoderResultList: ['nlmaps-geocoder-result-list'],
      geocoderResultItem: ['nlmaps-geocoder-result-item'],
      geocoderResultSelected: ['nlmaps-geocoder-result-selected'],
    },
  },
  n = {}
n.BASE_DEFAULTS = {
  crs: 'EPSG:3857',
  attr: '',
  minZoom: 0,
  maxZoom: 19,
  type: 'wmts',
  format: 'png',
  url: '',
}
n.WMS_DEFAULTS = {
  url: '',
  version: '1.1.1',
  transparent: !0,
  format: 'image/png',
  minZoom: 0,
  maxZoom: 24,
  styleName: '',
}
n.BASEMAP_PROVIDERS = {}
n.WMS_PROVIDERS = {}
n.GEOCODER = {}
n.MAP = {
  zoomposition: 'bottomleft',
}
n.MARKER = {}
n.CLASSNAMES = {
  geocoderContainer: ['nlmaps-geocoder-control-container'],
  geocoderSearch: ['nlmaps-geocoder-control-search'],
  geocoderButton: ['nlmaps-geocoder-control-button'],
  geocoderResultList: ['nlmaps-geocoder-result-list'],
  geocoderResultItem: ['nlmaps-geocoder-result-item'],
}
function p(e) {
  throw e
}
function d(e, t) {
  return Object.assign({}, e, t)
}
function v(e) {
  let t = d(n.BASE_DEFAULTS, e.defaults)
  ;(!e.layers || e.layers.length < 0) &&
    p('no basemap defined, please define a basemap in the configuration'),
    e.layers.forEach((o) => {
      ;(!o.name || n.BASEMAP_PROVIDERS[o.name] !== void 0) &&
        p('basemap names need to be defined and unique: ' + o.name),
        (n.BASEMAP_PROVIDERS[o.name] = b(d(t, o)))
    })
}
function y(e) {
  let t = d(n.WMS_DEFAULTS, e.defaults)
  e.layers &&
    e.layers.forEach((o) => {
      ;(!o.name || n.WMS_PROVIDERS[o.name] !== void 0) &&
        p('wms names need to be defined and unique: ' + o.name),
        (n.WMS_PROVIDERS[o.name] = w(d(t, o)))
    })
}
function k(e) {
  ;(n.GEOCODER.lookupUrl = e.lookupUrl),
    (n.GEOCODER.suggestUrl = e.suggestUrl),
    (n.GEOCODER.placeholder = e.placeholder)
}
function R(e) {
  n.MAP = d(n.MAP, e)
}
function b(e) {
  switch (e.type) {
    case 'wmts':
      e.url = `${e.url}/${e.layerName}/${e.crs}/{z}/{x}/{y}.${e.format}`
      break
    case 'tms':
      e.url = `${e.url}/${e.layerName}/{z}/{x}/{y}.${e.format}`
      break
    default:
      e.url = `${e.url}/${e.type}/${e.layerName}/${e.crs}/{z}/{x}/{y}.${e.format}`
  }
  return e
}
function w(e) {
  let t = e.url.indexOf('{')
  if (t > -1) {
    let o = e.url.indexOf('}')
    e.url.slice(t + 1, o).toLowerCase() === 'workspacename'
      ? (e.url = e.url.slice(0, t) + e.workSpaceName + e.url.slice(o + 1, -1))
      : p('only workspacename templates are supported for now')
  }
  return e
}
function A(e) {
  n.FEATUREQUERYBASEURL = e
}
function C(e) {
  n.CLASSNAMES = d(n.CLASSNAMES, e)
}
function N(e) {
  n.MARKER = e
}
l.featureQuery !== void 0 && A(l.featureQuery.baseUrl)
l.map !== void 0 && R(l.map)
v(l.basemaps)
l.wms !== void 0 && y(l.wms)
l.geocoder !== void 0 && k(l.geocoder)
l.marker !== void 0 && N(l.marker)
l.classnames !== void 0 && C(l.classnames)
const i = n.GEOCODER
function S(e) {
  return new Promise((t, o) => {
    var s = new XMLHttpRequest()
    ;(s.onreadystatechange = function () {
      s.readyState == 4 && s.status == 200 && t(JSON.parse(s.responseText))
    }),
      s.open('GET', e, !0),
      s.send(null)
  })
}
function h(e) {
  if (!e.includes('POINT'))
    throw TypeError('Provided WKT geometry is not a point.')
  const t = e.split('(')[1].split(')')[0],
    o = parseFloat(t.split(' ')[0]),
    s = parseFloat(t.split(' ')[1])
  return {
    type: 'Point',
    coordinates: [o, s],
  }
}
i.resultList = []
i.selectedResult = -1
i.doSuggestRequest = function (e) {
  return S(`${this.suggestUrl}q=${encodeURIComponent(e)}`)
}
i.doLookupRequest = function (e) {
  return S(`${this.lookupUrl}id=${encodeURIComponent(e)}`).then((t) => {
    const o = t.response.docs[0]
    return (
      (o.centroide_ll = h(o.centroide_ll)),
      (o.centroide_rd = h(o.centroide_rd)),
      o
    )
  })
}
i.createControl = function (e, t) {
  ;(this.zoomTo = e), (this.map = t)
  const o = document.createElement('div'),
    s = document.createElement('form'),
    r = document.createElement('input'),
    c = document.createElement('button'),
    m = document.createElement('div')
  return (
    u(o, n.CLASSNAMES.geocoderContainer),
    u(s, n.CLASSNAMES.geocoderSearch),
    o.addEventListener('click', (a) => a.stopPropagation()),
    o.addEventListener('dblclick', (a) => a.stopPropagation()),
    (r.id = 'nlmaps-geocoder-control-input'),
    (r.placeholder = i.placeholder),
    r.setAttribute('aria-label', i.placeholder),
    r.setAttribute('type', 'text'),
    r.setAttribute('autocapitalize', 'off'),
    r.setAttribute('autocomplete', 'off'),
    r.setAttribute('autocorrect', 'off'),
    r.setAttribute('spellcheck', 'false'),
    r.addEventListener('keydown', (a) => {
      let f = this.resultList
      this.resultList.length > 0 &&
        ((a.code === 'ArrowDown' || a.keyCode === 40) &&
          (this.selectedResult < this.resultList.length - 1 &&
            this.selectedResult++,
          this.showLookupResult(f[this.selectedResult])),
        (a.code === 'ArrowUp' || a.keyCode === 38) &&
          (this.selectedResult > 0 && this.selectedResult--,
          this.showLookupResult(f[this.selectedResult])),
        a.code === 'Escape' && this.clearSuggestResults(!0))
    }),
    r.addEventListener('input', (a) => {
      this.suggest(a.target.value)
    }),
    r.addEventListener('focus', (a) => {
      this.suggest(a.target.value)
    }),
    c.setAttribute('type', 'submit'),
    s.addEventListener('submit', (a) => {
      a.preventDefault(),
        this.resultList.length > 0 &&
          this.lookup(
            this.resultList[this.selectedResult < 0 ? 0 : this.selectedResult]
              .id,
          )
    }),
    c.setAttribute('aria-label', i.placeholder),
    u(c, n.CLASSNAMES.geocoderButton),
    (m.id = 'nlmaps-geocoder-control-results'),
    u(m, n.CLASSNAMES.geocoderResultList),
    m.classList.add('nlmaps-hidden'),
    o.appendChild(s),
    s.appendChild(r),
    s.appendChild(c),
    o.appendChild(m),
    o
  )
}
i.suggest = function (e) {
  if (e.length < 3) {
    this.clearSuggestResults()
    return
  }
  this.doSuggestRequest(e).then((t) => {
    ;(this.resultList = t.response.docs),
      this.showSuggestResults(this.resultList)
  })
}
i.lookup = function (e) {
  this.doLookupRequest(e).then((t) => {
    this.zoomTo(t.centroide_ll, this.map),
      this.showLookupResult(t),
      this.clearSuggestResults()
  })
}
i.clearSuggestResults = function (e) {
  ;(this.selectedResult = -1),
    e && (document.getElementById('nlmaps-geocoder-control-input').value = ''),
    (document.getElementById('nlmaps-geocoder-control-results').innerHTML = ''),
    document
      .getElementById('nlmaps-geocoder-control-results')
      .classList.add('nlmaps-hidden')
}
i.showLookupResult = function (e) {
  let t = document.getElementsByClassName(n.CLASSNAMES.geocoderResultItem)
  Array.prototype.map.call(t, (s) =>
    s.classList.remove(n.CLASSNAMES.geocoderResultSelected),
  )
  let o = document.getElementById(e.id)
  o && o.classList.add(n.CLASSNAMES.geocoderResultSelected),
    (document.getElementById('nlmaps-geocoder-control-input').value =
      e.weergavenaam)
}
function u(e, t) {
  t.forEach((o) => {
    e.classList.add(o)
  })
}
i.showSuggestResults = function (e) {
  if ((this.clearSuggestResults(), e.length > 0)) {
    const t = document.createElement('ul')
    e.forEach((o) => {
      const s = document.createElement('li'),
        r = document.createElement('a')
      ;(r.innerHTML = o.weergavenaam),
        (r.id = o.id),
        u(r, n.CLASSNAMES.geocoderResultItem),
        r.setAttribute('href', '#'),
        r.addEventListener('click', (c) => {
          c.preventDefault(), this.lookup(c.target.id)
        }),
        s.appendChild(r),
        t.appendChild(s)
    }),
      document
        .getElementById('nlmaps-geocoder-control-results')
        .classList.remove('nlmaps-hidden'),
      document.getElementById('nlmaps-geocoder-control-results').appendChild(t)
  }
}
function g() {
  return n.MARKER
}
function M() {
  return n.MAP.extent
}
function P(e) {
  if (e in n.BASEMAP_PROVIDERS) {
    var t = n.BASEMAP_PROVIDERS[e]
    return (
      t.deprecated &&
        console &&
        console.warn &&
        console.warn(
          e +
            ' is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference.',
        ),
      t
    )
  } else
    console.error(
      'NL Maps error: You asked for a style which does not exist! Available styles: ' +
        Object.keys(n.BASEMAP_PROVIDERS).join(', '),
    )
}
function _(e, t) {
  let o
  return (
    e in n.WMS_PROVIDERS
      ? ((o = n.WMS_PROVIDERS[e]),
        o.deprecated &&
          console &&
          console.warn &&
          console.warn(
            e +
              ' is a deprecated wms; it will be redirected to its replacement. For performance improvements, please change your reference.',
          ))
      : ((o = Object.assign({}, n.WMS_DEFAULTS, t)),
        console.log(
          'NL Maps: You asked for a wms which does not exist! Available wmses: ' +
            Object.keys(n.WMS_PROVIDERS).join(', ') +
            '. Provide an options object to make your own WMS.',
        )),
    o
  )
}
function O() {
  let e = M(),
    t = L.latLng(e[0], e[1]),
    o = L.latLng(e[2], e[3])
  return L.latLngBounds(t, o)
}
typeof L < 'u' &&
  typeof L == 'object' &&
  ((L.NlmapsBgLayer = L.TileLayer.extend({
    initialize: function (e = 'standaard', t) {
      const o = P(e),
        s = L.Util.extend({}, t, {
          minZoom: o.minZoom,
          maxZoom: o.maxZoom,
          scheme: 'xyz',
          attribution: o.attribution,
          subdomains: o.subdomains ? o.subdomains : 'abc',
          sa_id: e,
        })
      L.TileLayer.prototype.initialize.call(this, o.url, s)
    },
  })),
  (L.nlmapsBgLayer = function (e, t) {
    return new L.NlmapsBgLayer(e, t)
  }),
  (L.NlmapsOverlayLayer = L.TileLayer.WMS.extend({
    initialize: function (e = '', t) {
      const o = _(e, t),
        s = o.url,
        r = L.Util.extend({}, t, {
          layers: o.layerName,
          maxZoom: 24,
          minZoom: 1,
          styles: o.styleName,
          version: o.version,
          transparent: o.transparent,
          format: o.format,
        })
      L.TileLayer.WMS.prototype.initialize.call(this, s, r)
    },
  })),
  (L.nlmapsOverlayLayer = function (e, t) {
    return new L.NlmapsOverlayLayer(e, t)
  }),
  (L.Control.GeoLocatorControl = L.Control.extend({
    options: {
      position: 'topright',
    },
    initialize: function (e) {
      for (let t in e)
        typeof this.options[t] == 'object'
          ? L.extend(this.options[t], e[t])
          : (this.options[t] = e[t])
    },
    onAdd: function (e) {
      let t = L.DomUtil.create('div')
      ;(t.id = 'nlmaps-geolocator-control'),
        (t.className = 'nlmaps-geolocator-control')
      let o = document.createElement('img')
      t.append(o),
        this.options.geolocator.isStarted() && L.DomUtil.addClass(t, 'started')
      function s(r) {
        e.panTo([r.coords.latitude, r.coords.longitude])
      }
      return (
        L.DomEvent.on(
          t,
          'click',
          function () {
            this.options.geolocator.start(), L.DomUtil.addClass(t, 'started')
          },
          this,
        ),
        this.options.geolocator.on('position', function (r) {
          L.DomUtil.removeClass(t, 'started'),
            L.DomUtil.addClass(t, 'has-position'),
            s(r)
        }),
        t
      )
    },
    onRemove: function (e) {
      return e
    },
  })),
  (L.geoLocatorControl = function (e) {
    return new L.Control.GeoLocatorControl({ geolocator: e })
  }))
function x(e) {
  if (typeof L < 'u' && typeof L == 'object') {
    let t, o
    if (typeof e > 'u') {
      const s = E(map)
      ;(t = s.latitude), (o = s.longitude)
    } else (t = e.latitude), (o = e.longitude)
    return new L.marker([t, o], {
      alt: 'marker',
      icon: new L.icon({
        iconUrl: g().url,
        iconSize: g().iconSize,
        iconAnchor: g().iconAnchor,
      }),
    })
  }
}
function D(e) {
  if (typeof L < 'u' && typeof L == 'object') return L.nlmapsBgLayer(e)
}
function B(e, t) {
  if (typeof L < 'u' && typeof L == 'object') return L.nlmapsOverlayLayer(e, t)
}
function U(e) {
  if (typeof L < 'u' && typeof L == 'object') return L.geoLocatorControl(e)
}
function I(e, t) {
  t.fitBounds(L.geoJSON(e).getBounds(), { maxZoom: 18 })
}
function T(e) {
  const t = i.createControl(I, e)
  t.addEventListener('click', (o) => o.stopPropagation()),
    e.getContainer().appendChild(t)
}
function E(e) {
  const t = e.getCenter()
  return {
    latitude: t.lat,
    longitude: t.lng,
  }
}
if (typeof window < 'u')
  for (const [e, t] of Object.entries({
    bgLayer: D,
    overlayLayer: B,
    markerLayer: x,
    extentLeafletFormat: O,
    getMapCenter: E,
    geoLocatorControl: U,
    geocoderControl: T,
  }))
    window[e] = t
export {
  D as bgLayer,
  O as extentLeafletFormat,
  U as geoLocatorControl,
  T as geocoderControl,
  E as getMapCenter,
  x as markerLayer,
  B as overlayLayer,
}
