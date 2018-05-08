var config = {
    "version": 0.1,
    "basemaps": {
        "defaults": {
            "crs": "EPSG:3857",
            "attribution": "Kaartgegevens &copy; <a href='https://www.kadaster.nl'>Kadaster</a> | \
            <a href='https://www.verbeterdekaart.nl'>Verbeter de kaart</a>",
            "minZoom": 6,
            "maxZoom": 19,
            "type": "wmts",
            "format": "png",
            "url": "https://geodata.nationaalgeoregister.nl/tiles/service"
        },
        "layers": [{
            "name": "standaard",
            "urlname": "brtachtergrondkaart"
        }, {
            "name": "grijs",
            "urlname": "brtachtergrondkaartgrijs"
        }, {
            "name": "pastel",
            "urlname": "brtachtergrondkaartpastel"
        }, {
            "name": "luchtfoto",
            "urlname": "2016_ortho25",
            "url": "https://geodata.nationaalgeoregister.nl/luchtfoto/rgb",
            "format": "jpeg"
        }]
    },
    "wms": {
        "defaults": {
            "url": "https://geodata.nationaalgeoregister.nl/{workSpaceName}/wms?",
            "version": "1.1.1",
            "transparent": true,
            "format": "image/png",
            "minZoom": 0,
            "maxZoom": 24
        },
        "layers": [{
            "name": "gebouwen",
            "workSpaceName": "bag",
            "layerName": "pand"
        }, {
            "name": "percelen",
            "workSpaceName": "bkadastralekaartv3ag",
            "layerName": "kadastralekaart"
        }, {
            "name": "drone-no-fly-zones",
            "workSpaceName": "dronenoflyzones",
            "layerName": "luchtvaartgebieden,landingsite"
        }, {
            "name": "hoogte",
            "workSpaceName": "ahn2",
            "layerName": "ahn2_05m_int",
            "styleName": "ahn2:ahn2_05m_detail"
        }, {
            "name": "gemeenten",
            "workSpaceName": "bestuurlijkegrenzen",
            "layerName": "gemeenten",
            "styleName": "bestuurlijkegrenzen:bestuurlijkegrenzen_gemeentegrenzen"
        }, {
            "name": "provincies",
            "workSpaceName": "bestuurlijkegrenzen",
            "layerName": "provincies",
            "styleName": "bestuurlijkegrenzen:bestuurlijkegrenzen_provinciegrenzen"
        }]
    },
    "geocoder": {
        "suggestUrl": "https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?",
        "lookupUrl": "https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?"
    },
    "map": {
        "style": 'standaard',
        "center": {
            "latitude": 52.093249,
            "longitude": 5.111994
        },
        "zoom": 8,
        "attribution": true,
        "extent": [-180, -90, 180, 90]
    }
};

var CONFIG = {};

CONFIG.BASE_DEFAULTS = {
    crs: "EPSG:3857",
    attr: "",
    minZoom: 0,
    maxZoom: 19,
    type: "wmts",
    format: "png",
    url: ""
};
CONFIG.WMS_DEFAULTS = {
    url: "",
    version: "1.1.1",
    transparent: true,
    format: "image/png",
    minZoom: 0,
    maxZoom: 24
};
CONFIG.BASEMAP_PROVIDERS = {};
CONFIG.WMS_PROVIDERS = {};
CONFIG.GEOCODER = {};
CONFIG.MAP = {};
CONFIG.MARKER = {};

function err(err) {
    throw err;
}

if (config.version !== 0.1) {
    err('unsupported config version');
}

function mergeConfig(defaults, config$$1) {
    return Object.assign({}, defaults, config$$1);
}

function parseBase(basemaps) {
    var defaults = mergeConfig(CONFIG.BASE_DEFAULTS, basemaps.defaults);
    if (!basemaps.layers || basemaps.layers.length < 0) {
        err('no basemap defined, please define a basemap in the configuration');
    }
    basemaps.layers.forEach(function (layer) {
        if (!layer.name || CONFIG.BASEMAP_PROVIDERS[layer.name] !== undefined) {
            err('basemap names need to be defined and unique: ' + layer.name);
        }
        CONFIG.BASEMAP_PROVIDERS[layer.name] = formatBasemapUrl(mergeConfig(defaults, layer));
    });
}
function parseWMS(wms) {
    var defaults = mergeConfig(CONFIG.WMS_DEFAULTS, wms.defaults);
    if (wms.layers) {
        wms.layers.forEach(function (layer) {
            if (!layer.name || CONFIG.WMS_PROVIDERS[layer.name] !== undefined) {
                err('wms names need to be defined and unique: ' + layer.name);
            }
            CONFIG.WMS_PROVIDERS[layer.name] = applyTemplate(mergeConfig(defaults, layer));
        });
    }
}
function parseGeocoder(geocoder) {
    CONFIG.GEOCODER.lookupUrl = geocoder.lookupUrl;
    CONFIG.GEOCODER.suggestUrl = geocoder.suggestUrl;
}
function parseMap(map) {
    CONFIG.MAP = mergeConfig({}, map);
}

function formatBasemapUrl(layer) {
    switch (layer.type) {
        case 'wmts':
            layer.url = layer.url + "/" + layer.type + "/" + layer.urlname + "/" + layer.crs + "/{z}/{x}/{y}." + layer.format;
            break;
        case 'tms':
            layer.url = layer.url + "/" + layer.urlname + "/{z}/{x}/{y}." + layer.format;
            break;
        default:
            layer.url = layer.url + "/" + layer.type + "/" + layer.urlname + "/" + layer.crs + "/{z}/{x}/{y}." + layer.format;
    }
    return layer;
}

function applyTemplate(layer) {
    //Check if the url is templated
    var start = layer.url.indexOf('{');
    if (start > -1) {
        var end = layer.url.indexOf('}');
        var template = layer.url.slice(start + 1, end);
        if (template.toLowerCase() === "workspacename") {
            layer.url = layer.url.slice(0, start) + layer.workSpaceName + layer.url.slice(end + 1, -1);
        } else {
            err('only workspacename templates are supported for now');
        }
    }
    return layer;
}

function parseFeatureQuery(baseUrl) {
    CONFIG.FEATUREQUERYBASEURL = baseUrl;
}

function parseMarker(marker) {
    CONFIG.MARKER = marker;
}

if (config.featureQuery !== undefined) parseFeatureQuery(config.featureQuery.baseUrl);
parseMap(config.map);
parseBase(config.basemaps);
if (config.wms !== undefined) parseWMS(config.wms);
if (config.geocoder !== undefined) parseGeocoder(config.geocoder);
if (config.marker !== undefined) parseMarker(config.marker);

var geocoder = CONFIG.GEOCODER;

function httpGetAsync(url) {
    // eslint-disable-next-line no-unused-vars
    return new Promise(function (resolve, reject) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            // eslint-disable-next-line eqeqeq
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                resolve(JSON.parse(xmlHttp.responseText));
            }
        };
        xmlHttp.open("GET", url, true); // true for asynchronous
        xmlHttp.send(null);
    });
}

function wktPointToGeoJson(wktPoint) {
    if (!wktPoint.includes('POINT')) {
        throw TypeError('Provided WKT geometry is not a point.');
    }
    var coordinateTuple = wktPoint.split('(')[1].split(')')[0];
    var x = parseFloat(coordinateTuple.split(' ')[0]);
    var y = parseFloat(coordinateTuple.split(' ')[1]);

    return {
        type: 'Point',
        coordinates: [x, y]
    };
}

/**
 * Make a call to PDOK locatieserver v3 suggest service. This service is meant for geocoder autocomplete functionality. For
 * additional documentation, check https://github.com/PDOK/locatieserver/wiki/API-Locatieserver.
 * @param {string} searchTerm The term which to search for
 */
geocoder.doSuggestRequest = function (searchTerm) {
    return httpGetAsync(this.suggestUrl + 'q=' + encodeURIComponent(searchTerm));
};

/**
 * Make a call to PDOK locatieserver v3 lookup service. This service provides information about objects found through the suggest service. For additional
 * documentation, check: https://github.com/PDOK/locatieserver/wiki/API-Locatieserver
 * @param {string} id The id of the feature that is to be looked up.
 */
geocoder.doLookupRequest = function (id) {
    return httpGetAsync(this.lookupUrl + 'id=' + encodeURIComponent(id)).then(function (lookupResult) {
        // A lookup request should always return 1 result
        var geocodeResult = lookupResult.response.docs[0];
        geocodeResult.centroide_ll = wktPointToGeoJson(geocodeResult.centroide_ll);
        geocodeResult.centroide_rd = wktPointToGeoJson(geocodeResult.centroide_rd);
        return geocodeResult;
    });
};

geocoder.createControl = function (zoomFunction, map) {
    var _this = this;

    this.zoomTo = zoomFunction;
    this.map = map;
    var container = document.createElement('div');
    container.className = 'nlmaps-geocoder-control-container';
    var searchDiv = document.createElement('form');
    var input = document.createElement('input');
    var button = document.createElement('button');
    var results = document.createElement('div');
    searchDiv.className = 'nlmaps-geocoder-control-search';
    container.addEventListener('click', function (e) {
        return e.stopPropagation();
    });
    container.addEventListener('dblclick', function (e) {
        return e.stopPropagation();
    });
    input.id = 'nlmaps-geocoder-control-input';
    input.placeholder = 'Zoomen naar adres...';
    input.setAttribute('aria-label', 'Zoomen naar adres');
    input.setAttribute('type', 'text');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('spellcheck', 'false');

    input.addEventListener('input', function (e) {
        _this.suggest(e.target.value);
    });

    input.addEventListener('focus', function (e) {
        _this.suggest(e.target.value);
    });
    button.setAttribute('type', 'submit');
    searchDiv.addEventListener('submit', function (e) {
        e.preventDefault();
        if (_this.results.length > 0) {
            _this.lookup(_this.results[0]);
        }
    });
    button.setAttribute('aria-label', 'Zoomen naar adres');
    button.className = 'nlmaps-geocoder-control-button';

    results.id = 'nlmaps-geocoder-control-results';

    container.appendChild(searchDiv);
    searchDiv.appendChild(input);
    searchDiv.appendChild(button);
    container.appendChild(results);

    return container;
};

geocoder.suggest = function (query) {
    var _this2 = this;

    if (query.length < 3) {
        this.clearSuggestResults();
        return;
    }

    this.doSuggestRequest(query).then(function (results) {
        _this2.results = results.response.docs.map(function (r) {
            return r.id;
        });
        _this2.showSuggestResults(results.response.docs);
    });
};

geocoder.lookup = function (id) {
    var _this3 = this;

    this.doLookupRequest(id).then(function (result) {
        _this3.zoomTo(result.centroide_ll, _this3.map);
        _this3.showLookupResult(result.weergavenaam);
        _this3.clearSuggestResults();
    });
};

geocoder.clearSuggestResults = function () {

    document.getElementById('nlmaps-geocoder-control-results').innerHTML = '';
};

geocoder.showLookupResult = function (name) {
    document.getElementById('nlmaps-geocoder-control-input').value = name;
};

geocoder.showSuggestResults = function (results) {
    var _this4 = this;

    this.clearSuggestResults();
    if (results.length > 0) {
        var resultList = document.createElement('ul');
        resultList.className = 'nlmaps-geocoder-result-list';
        results.forEach(function (result) {

            var li = document.createElement('li');
            li.innerHTML = result.weergavenaam;
            li.id = result.id;

            li.addEventListener('click', function (e) {
                _this4.lookup(e.target.id);
            });

            resultList.appendChild(li);
        });

        document.getElementById('nlmaps-geocoder-control-results').appendChild(resultList);
    }
};

/*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
 * copyright (c) 2012, Stamen Design
 * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
 */

function getMarker() {
  return CONFIG.MARKER;
}

/*
 * Get the named provider, or throw an exception if it doesn't exist.
 **/
function getProvider(name) {
  if (name in CONFIG.BASEMAP_PROVIDERS) {
    var provider = CONFIG.BASEMAP_PROVIDERS[name];

    // eslint-disable-next-line no-console
    if (provider.deprecated && console && console.warn) {
      // eslint-disable-next-line no-console
      console.warn(name + " is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference.");
    }

    return provider;
  } else {
    // eslint-disable-next-line no-console
    console.error('NL Maps error: You asked for a style which does not exist! Available styles: ' + Object.keys(PROVIDERS).join(', '));
  }
}

/*
 * Get the named wmsProvider, or throw an exception if it doesn't exist.
 **/
function getWmsProvider(name, options) {
  var wmsProvider = void 0;
  if (name in CONFIG.WMS_PROVIDERS) {
    wmsProvider = CONFIG.WMS_PROVIDERS[name];

    // eslint-disable-next-line no-console
    if (wmsProvider.deprecated && console && console.warn) {
      // eslint-disable-next-line no-console
      console.warn(name + " is a deprecated wms; it will be redirected to its replacement. For performance improvements, please change your reference.");
    }
  } else {
    wmsProvider = Object.assign({}, CONFIG.WMS_DEFAULTS, options);
    // eslint-disable-next-line no-console
    console.log('NL Maps: You asked for a wms which does not exist! Available wmses: ' + Object.keys(CONFIG.WMS_PROVIDERS).join(', ') + '. Provide an options object to make your own WMS.');
  }
  return wmsProvider;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

//TODO 'standaard' vervangen door eerste layer van baselayers
if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof(L)) === 'object') {
  L.NlmapsBgLayer = L.TileLayer.extend({
    initialize: function initialize() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'standaard';
      var options = arguments[1];

      var provider = getProvider(name);
      var opts = L.Util.extend({}, options, {
        'minZoom': provider.minZoom,
        'maxZoom': provider.maxZoom,
        'scheme': 'xyz',
        'attribution': provider.attribution,
        'subdomains': provider.subdomains ? provider.subdomains : 'abc',
        sa_id: name
      });
      L.TileLayer.prototype.initialize.call(this, provider.url, opts);
    }
  });

  /*
   * Factory function for consistency with Leaflet conventions
   **/
  L.nlmapsBgLayer = function (options, source) {
    return new L.NlmapsBgLayer(options, source);
  };

  L.NlmapsOverlayLayer = L.TileLayer.WMS.extend({
    initialize: function initialize() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var options = arguments[1];

      var wmsProvider = getWmsProvider(name, options);
      var url = wmsProvider.url;
      delete wmsProvider.url;
      var wmsParams = L.Util.extend({}, options, {
        layers: wmsProvider.layers,
        maxZoom: 24,
        minZoom: 1,
        styles: wmsProvider.styles,
        version: wmsProvider.version,
        transparent: wmsProvider.transparent,
        format: wmsProvider.format
      });
      L.TileLayer.WMS.prototype.initialize.call(this, url, wmsParams);
    }
  });

  /*
   * Factory function for consistency with Leaflet conventions
   **/
  L.nlmapsOverlayLayer = function (options, source) {
    return new L.NlmapsOverlayLayer(options, source);
  };

  L.Control.GeoLocatorControl = L.Control.extend({
    options: {
      position: 'topright'
    },
    initialize: function initialize(options) {
      // set default options if nothing is set (merge one step deep)
      for (var i in options) {
        if (_typeof(this.options[i]) === 'object') {
          L.extend(this.options[i], options[i]);
        } else {
          this.options[i] = options[i];
        }
      }
    },

    onAdd: function onAdd(map) {
      var div = L.DomUtil.create('div');
      div.id = 'nlmaps-geolocator-control';
      div.className = 'nlmaps-geolocator-control';
      var img = document.createElement('img');
      div.append(img);
      if (this.options.geolocator.isStarted()) {
        L.DomUtil.addClass(div, 'started');
      }
      function moveMap(position) {
        map.panTo([position.coords.latitude, position.coords.longitude]);
      }
      L.DomEvent.on(div, 'click', function () {
        this.options.geolocator.start();
        L.DomUtil.addClass(div, 'started');
      }, this);
      this.options.geolocator.on('position', function (d) {
        L.DomUtil.removeClass(div, 'started');
        L.DomUtil.addClass(div, 'has-position');
        moveMap(d);
      });
      return div;
    },
    onRemove: function onRemove(map) {
      return map;
    }
  });

  L.geoLocatorControl = function (geolocator) {
    return new L.Control.GeoLocatorControl({ geolocator: geolocator });
  };
}
function markerLayer(latLngObject) {
  if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof(L)) === 'object') {
    var lat = void 0;
    var lng = void 0;
    // LatLngObject should always be defined when it is called from the main package.
    // eslint-disable-next-line eqeqeq
    if (typeof latLngObject == 'undefined') {
      var center = getMapCenter(map);
      lat = center.latitude;
      lng = center.longitude;
    } else {
      lat = latLngObject.latitude;
      lng = latLngObject.longitude;
    }
    return new L.marker([lat, lng], {
      alt: 'marker',
      icon: new L.icon({
        iconUrl: getMarker().url,
        iconSize: [64, 64],
        iconAnchor: [32, 63]
      })
    });
  }
}

function bgLayer(name) {
  if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof(L)) === 'object') {
    return L.nlmapsBgLayer(name);
  }
}

function overlayLayer(name, options) {
  if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof(L)) === 'object') {
    return L.nlmapsOverlayLayer(name, options);
  }
}

function geoLocatorControl(geolocator) {
  if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof(L)) === 'object') {
    return L.geoLocatorControl(geolocator);
  }
}
function zoomTo(point, map) {
  map.fitBounds(L.geoJSON(point).getBounds(), { maxZoom: 18 });
}

function geocoderControl(map) {
  var control = geocoder.createControl(zoomTo, map);
  map.getContainer().parentElement.appendChild(control);
}

function getMapCenter(map) {
  var latLngObject = map.getCenter();
  return {
    latitude: latLngObject.lat,
    longitude: latLngObject.lng
  };
}

export { bgLayer, overlayLayer, markerLayer, getMapCenter, geoLocatorControl, geocoderControl };
//# sourceMappingURL=nlmaps-leaflet.es.js.map
