(function (exports) {
'use strict';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var nlmapsLeaflet_cjs = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, '__esModule', { value: true });

  var geocoder = {
    suggestUrl: 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?',
    lookupUrl: 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?'
  };

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
    var searchDiv = document.createElement('div');
    var input = document.createElement('input');
    var results = document.createElement('div');
    var controlWidth = '300px';

    container.style.width = controlWidth;
    container.style.zIndex = 1000000;
    container.style.position = 'absolute';
    container.style.top = '15px';
    container.style.left = '12px';
    input.id = 'nlmaps-geocoder-control-input';
    input.placeholder = 'Zoeken op adres...';
    input.style.padding = '4px 10px';
    input.style.width = '100%';
    input.style.border = 'none';
    input.style.backgroundColor = '#fff';
    input.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
    input.style.height = '26px';
    input.style.borderRadius = '5px 5px';

    input.addEventListener('input', function (e) {
      _this.suggest(e.target.value);
    });

    input.addEventListener('focus', function (e) {
      _this.suggest(e.target.value);
    });
    results.id = 'nlmaps-geocoder-control-results';
    results.style.width = controlWidth;

    container.appendChild(searchDiv);
    searchDiv.appendChild(input);
    container.appendChild(results);

    return container;
  };

  geocoder.suggest = function (query) {
    var _this2 = this;

    if (query.length < 4) {
      this.clearSuggestResults();
      return;
    }

    this.doSuggestRequest(query).then(function (results) {
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

    var resultList = document.createElement('ul');
    resultList.style.padding = '10px 10px 2px 10px';
    resultList.style.width = '100%';
    resultList.style.background = '#FFFFFF';
    resultList.style.borderRadius = '5px 5px';
    resultList.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';

    results.forEach(function (result) {

      var li = document.createElement('li');
      li.innerHTML = result.weergavenaam;
      li.id = result.id;
      li.style.cursor = 'pointer';
      li.style.padding = '5px';
      li.style.listStyleType = 'none';
      li.style.marginBottom = '5px';
      li.addEventListener('click', function (e) {
        _this4.lookup(e.target.id);
      });

      li.addEventListener('mouseenter', function () {
        li.style.background = '#6C62A6';
        li.style.color = '#FFFFFF';
      });

      li.addEventListener('mouseleave', function () {
        li.style.background = '#FFFFFF';
        li.style.color = '#333';
      });
      resultList.appendChild(li);
    });
    this.clearSuggestResults();
    document.getElementById('nlmaps-geocoder-control-results').appendChild(resultList);
  };

  function wmsBaseUrl(workSpaceName) {
    return 'https://geodata.nationaalgeoregister.nl/' + workSpaceName + '/wms?';
  }

  function mapWmsProvider(name, options) {
    var wmsParameters = {
      workSpaceName: '',
      layerName: '',
      styleName: '',
      url: '',
      minZoom: 0,
      maxZoom: 24
    };

    switch (name) {
      case 'gebouwen':
        wmsParameters.workSpaceName = 'bag';
        wmsParameters.layerName = 'pand';
        wmsParameters.styleName = '';
        break;
      case 'percelen':
        wmsParameters.workSpaceName = 'kadastralekaartv3';
        wmsParameters.layerName = 'kadastralekaart';
        wmsParameters.styleName = '';
        break;
      case 'drone-no-fly-zones':
        wmsParameters.workSpaceName = 'dronenoflyzones';
        wmsParameters.layerName = 'luchtvaartgebieden,landingsite';
        wmsParameters.styleName = '';
        break;
      case 'hoogte':
        wmsParameters.workSpaceName = 'ahn2';
        wmsParameters.layerName = 'ahn2_05m_int';
        wmsParameters.styleName = 'ahn2:ahn2_05m_detail';
        break;
      case 'gemeenten':
        wmsParameters.workSpaceName = 'bestuurlijkegrenzen';
        wmsParameters.layerName = 'gemeenten';
        wmsParameters.styleName = 'bestuurlijkegrenzen:bestuurlijkegrenzen_gemeentegrenzen';
        break;
      case 'provincies':
        wmsParameters.workSpaceName = 'bestuurlijkegrenzen';
        wmsParameters.layerName = 'provincies';
        wmsParameters.styleName = 'bestuurlijkegrenzen:bestuurlijkegrenzen_provinciegrenzen';
        break;
      default:
        wmsParameters.url = options.url;
        wmsParameters.layerName = options.layerName;
        wmsParameters.styleName = options.styleName;
    }
    if (wmsParameters.url === '') {
      wmsParameters.url = wmsBaseUrl(wmsParameters.workSpaceName);
    }

    return wmsParameters;
  }

  function makeWmsProvider(name, options) {
    var wmsParameters = mapWmsProvider(name, options);
    return {
      url: wmsParameters.url,
      service: 'WMS',
      version: '1.1.1',
      request: 'GetMap',
      layers: wmsParameters.layerName,
      styles: wmsParameters.styleName,
      transparent: true,
      format: 'image/png'
    };
  }

  var WMS_PROVIDERS = {
    "gebouwen": makeWmsProvider('gebouwen'),
    "percelen": makeWmsProvider('percelen'),
    "drone-no-fly-zones": makeWmsProvider('drone-no-fly-zones'),
    "hoogte": makeWmsProvider('hoogte'),
    "gemeenten": makeWmsProvider('gemeenten'),
    "provincies": makeWmsProvider('provincies')
  };

  var lufostring = 'luchtfoto/rgb';
  var brtstring = 'tiles/service';
  var servicecrs = '/EPSG:3857';
  var attr = 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a> | <a href="https://www.verbeterdekaart.nl">Verbeter de kaart</a>';
  function baseUrl(name) {
    return 'https://geodata.nationaalgeoregister.nl/' + (name === 'luchtfoto' ? lufostring : brtstring) + '/wmts/';
  }

  function mapLayerName(layername) {
    var name = void 0;
    switch (layername) {
      case 'standaard':
        name = 'brtachtergrondkaart';
        break;
      case 'grijs':
        name = 'brtachtergrondkaartgrijs';
        break;
      case 'pastel':
        name = 'brtachtergrondkaartpastel';
        break;
      case 'luchtfoto':
        name = '2016_ortho25';
        break;
      default:
        name = 'brtachtergrondkaart';
    }
    return name;
  }

  function makeProvider(name, format, minZoom, maxZoom) {
    var baseurl = baseUrl(name);
    var urlname = mapLayerName(name);
    return {
      "bare_url": [baseurl, urlname, servicecrs].join(""),
      "url": [baseurl, urlname, servicecrs, "/{z}/{x}/{y}.", format].join(""),
      "format": format,
      "minZoom": minZoom,
      "maxZoom": maxZoom,
      "attribution": attr,
      "name": (name === 'luchtfoto' ? '' : 'NLMaps ') + ' ' + name
    };
  }

  var BASEMAP_PROVIDERS = {
    "standaard": makeProvider("standaard", "png", 6, 19),
    "pastel": makeProvider("pastel", "png", 6, 19),
    "grijs": makeProvider("grijs", "png", 6, 19),
    "luchtfoto": makeProvider("luchtfoto", "jpeg", 6, 19)
  };

  var geolocator_icon = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="7.0556mm" width="7.0556mm" version="1.1"\nxmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" viewBox="0 0 24.999999 24.999999">\n<metadata>  <rdf:RDF>   <cc:Work rdf:about="">    <dc:format>image/svg+xml</dc:format>    <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>\n<dc:title/>   </cc:Work>  </rdf:RDF> </metadata> <g transform="translate(-151.39 -117.97)">  <g transform="translate(.39250 .85750)">\n<path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m163.5 123.27c-3.4931 0-6.3379 2.8448-6.3379 6.3379s2.8448 6.3398 6.3379 6.3398 6.3379-2.8467 6.3379-6.3398-2.8448-6.3379-6.3379-6.3379zm0 1.3008c2.7905 0 5.0391 2.2466 5.0391 5.0371s-2.2485 5.0391-5.0391 5.0391c-2.7905 0-5.0391-2.2485-5.0391-5.0391 0-2.7905 2.2485-5.0371 5.0391-5.0371z"/><circle cx="163.5" cy="129.61" r="1.9312" style="fill:#191919"/>\n<path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m162.85 120.57v3.3555h1.3008v-3.3555h-1.3008z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m162.85 135.3v3.3555h1.3008v-3.3555h-1.3008z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m154.46 128.96v1.2988h3.3535v-1.2988h-3.3535z"/>\n<path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m169.19 128.96v1.2988h3.3535v-1.2988h-3.3535z"/>  </g> </g></svg>';

  var markerUrl = 'https://rawgit.com/webmapper/nlmaps/master/dist/assets/rijksoverheid-marker.png';

  /*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
   * copyright (c) 2012, Stamen Design
   * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
   */
  //https://geodata.nationaalgeoregister.nl/tiles/service/wmts/
  //https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/
  /*
   * Get the named provider, or throw an exception if it doesn't exist.
   **/
  function getProvider(name) {
    if (name in BASEMAP_PROVIDERS) {
      var provider = BASEMAP_PROVIDERS[name];

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
    if (name in WMS_PROVIDERS) {
      wmsProvider = WMS_PROVIDERS[name];

      // eslint-disable-next-line no-console
      if (wmsProvider.deprecated && console && console.warn) {
        // eslint-disable-next-line no-console
        console.warn(name + " is a deprecated wms; it will be redirected to its replacement. For performance improvements, please change your reference.");
      }
    } else {
      wmsProvider = makeWmsProvider(name, options);
      // eslint-disable-next-line no-console
      console.log('NL Maps: You asked for a wms which does not exist! Available wmses: ' + Object.keys(WMS_PROVIDERS).join(', ') + '. Provide an options object to make your own WMS.');
    }
    return wmsProvider;
  }

  var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  };

  if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof$$1(L)) === 'object') {
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
          if (_typeof$$1(this.options[i]) === 'object') {
            L.extend(this.options[i], options[i]);
          } else {
            this.options[i] = options[i];
          }
        }
      },

      onAdd: function onAdd(map) {
        var div = L.DomUtil.create('div');
        div.id = 'nlmaps-geolocator-control';
        div.style.backgroundColor = '#fff';
        div.style.cursor = 'pointer';
        div.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
        div.style.height = '26px';
        div.style.width = '26px';
        div.style.borderRadius = '26px 26px';
        div.innerHTML = geolocator_icon;
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
    if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof$$1(L)) === 'object') {
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
        icon: new L.icon({
          iconUrl: markerUrl,
          iconSize: [64, 64],
          iconAnchor: [32, 63]
        })
      });
    }
  }

  function bgLayer(name) {
    if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof$$1(L)) === 'object') {
      return L.nlmapsBgLayer(name);
    }
  }

  function overlayLayer(name, options) {
    if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof$$1(L)) === 'object') {
      return L.nlmapsOverlayLayer(name, options);
    }
  }

  function geoLocatorControl(geolocator) {
    if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof$$1(L)) == 'object') {
      return L.geoLocatorControl(geolocator);
    }
  }
  function zoomTo(point, map) {
    map.fitBounds(L.geoJSON(point).getBounds(), { maxZoom: 18 });
  }

  function geocoderControl(map) {
    var control = geocoder.createControl(zoomTo, map);
    map.getContainer().appendChild(control);
  }

  function getMapCenter(map) {
    var latLngObject = map.getCenter();
    return {
      latitude: latLngObject.lat,
      longitude: latLngObject.lng
    };
  }

  exports.bgLayer = bgLayer;
  exports.overlayLayer = overlayLayer;
  exports.markerLayer = markerLayer;
  exports.getMapCenter = getMapCenter;
  exports.geoLocatorControl = geoLocatorControl;
  exports.geocoderControl = geocoderControl;
});

unwrapExports(nlmapsLeaflet_cjs);
var nlmapsLeaflet_cjs_1 = nlmapsLeaflet_cjs.geocoderControl;
var nlmapsLeaflet_cjs_2 = nlmapsLeaflet_cjs.geoLocatorControl;
var nlmapsLeaflet_cjs_3 = nlmapsLeaflet_cjs.getMapCenter;
var nlmapsLeaflet_cjs_4 = nlmapsLeaflet_cjs.markerLayer;
var nlmapsLeaflet_cjs_5 = nlmapsLeaflet_cjs.overlayLayer;
var nlmapsLeaflet_cjs_6 = nlmapsLeaflet_cjs.bgLayer;

var nlmapsOpenlayers_cjs = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, '__esModule', { value: true });

  var geocoder = {
    suggestUrl: 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?',
    lookupUrl: 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?'
  };

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
    var searchDiv = document.createElement('div');
    var input = document.createElement('input');
    var results = document.createElement('div');
    var controlWidth = '300px';

    container.style.width = controlWidth;
    container.style.zIndex = 1000000;
    container.style.position = 'absolute';
    container.style.top = '15px';
    container.style.left = '12px';
    input.id = 'nlmaps-geocoder-control-input';
    input.placeholder = 'Zoeken op adres...';
    input.style.padding = '4px 10px';
    input.style.width = '100%';
    input.style.border = 'none';
    input.style.backgroundColor = '#fff';
    input.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
    input.style.height = '26px';
    input.style.borderRadius = '5px 5px';

    input.addEventListener('input', function (e) {
      _this.suggest(e.target.value);
    });

    input.addEventListener('focus', function (e) {
      _this.suggest(e.target.value);
    });
    results.id = 'nlmaps-geocoder-control-results';
    results.style.width = controlWidth;

    container.appendChild(searchDiv);
    searchDiv.appendChild(input);
    container.appendChild(results);

    return container;
  };

  geocoder.suggest = function (query) {
    var _this2 = this;

    if (query.length < 4) {
      this.clearSuggestResults();
      return;
    }

    this.doSuggestRequest(query).then(function (results) {
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

    var resultList = document.createElement('ul');
    resultList.style.padding = '10px 10px 2px 10px';
    resultList.style.width = '100%';
    resultList.style.background = '#FFFFFF';
    resultList.style.borderRadius = '5px 5px';
    resultList.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';

    results.forEach(function (result) {

      var li = document.createElement('li');
      li.innerHTML = result.weergavenaam;
      li.id = result.id;
      li.style.cursor = 'pointer';
      li.style.padding = '5px';
      li.style.listStyleType = 'none';
      li.style.marginBottom = '5px';
      li.addEventListener('click', function (e) {
        _this4.lookup(e.target.id);
      });

      li.addEventListener('mouseenter', function () {
        li.style.background = '#6C62A6';
        li.style.color = '#FFFFFF';
      });

      li.addEventListener('mouseleave', function () {
        li.style.background = '#FFFFFF';
        li.style.color = '#333';
      });
      resultList.appendChild(li);
    });
    this.clearSuggestResults();
    document.getElementById('nlmaps-geocoder-control-results').appendChild(resultList);
  };

  function wmsBaseUrl(workSpaceName) {
    return 'https://geodata.nationaalgeoregister.nl/' + workSpaceName + '/wms?';
  }

  function mapWmsProvider(name, options) {
    var wmsParameters = {
      workSpaceName: '',
      layerName: '',
      styleName: '',
      url: '',
      minZoom: 0,
      maxZoom: 24
    };

    switch (name) {
      case 'gebouwen':
        wmsParameters.workSpaceName = 'bag';
        wmsParameters.layerName = 'pand';
        wmsParameters.styleName = '';
        break;
      case 'percelen':
        wmsParameters.workSpaceName = 'kadastralekaartv3';
        wmsParameters.layerName = 'kadastralekaart';
        wmsParameters.styleName = '';
        break;
      case 'drone-no-fly-zones':
        wmsParameters.workSpaceName = 'dronenoflyzones';
        wmsParameters.layerName = 'luchtvaartgebieden,landingsite';
        wmsParameters.styleName = '';
        break;
      case 'hoogte':
        wmsParameters.workSpaceName = 'ahn2';
        wmsParameters.layerName = 'ahn2_05m_int';
        wmsParameters.styleName = 'ahn2:ahn2_05m_detail';
        break;
      case 'gemeenten':
        wmsParameters.workSpaceName = 'bestuurlijkegrenzen';
        wmsParameters.layerName = 'gemeenten';
        wmsParameters.styleName = 'bestuurlijkegrenzen:bestuurlijkegrenzen_gemeentegrenzen';
        break;
      case 'provincies':
        wmsParameters.workSpaceName = 'bestuurlijkegrenzen';
        wmsParameters.layerName = 'provincies';
        wmsParameters.styleName = 'bestuurlijkegrenzen:bestuurlijkegrenzen_provinciegrenzen';
        break;
      default:
        wmsParameters.url = options.url;
        wmsParameters.layerName = options.layerName;
        wmsParameters.styleName = options.styleName;
    }
    if (wmsParameters.url === '') {
      wmsParameters.url = wmsBaseUrl(wmsParameters.workSpaceName);
    }

    return wmsParameters;
  }

  function makeWmsProvider(name, options) {
    var wmsParameters = mapWmsProvider(name, options);
    return {
      url: wmsParameters.url,
      service: 'WMS',
      version: '1.1.1',
      request: 'GetMap',
      layers: wmsParameters.layerName,
      styles: wmsParameters.styleName,
      transparent: true,
      format: 'image/png'
    };
  }

  var WMS_PROVIDERS = {
    "gebouwen": makeWmsProvider('gebouwen'),
    "percelen": makeWmsProvider('percelen'),
    "drone-no-fly-zones": makeWmsProvider('drone-no-fly-zones'),
    "hoogte": makeWmsProvider('hoogte'),
    "gemeenten": makeWmsProvider('gemeenten'),
    "provincies": makeWmsProvider('provincies')
  };

  var lufostring = 'luchtfoto/rgb';
  var brtstring = 'tiles/service';
  var servicecrs = '/EPSG:3857';
  var attr = 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a> | <a href="https://www.verbeterdekaart.nl">Verbeter de kaart</a>';
  function baseUrl(name) {
    return 'https://geodata.nationaalgeoregister.nl/' + (name === 'luchtfoto' ? lufostring : brtstring) + '/wmts/';
  }

  function mapLayerName(layername) {
    var name = void 0;
    switch (layername) {
      case 'standaard':
        name = 'brtachtergrondkaart';
        break;
      case 'grijs':
        name = 'brtachtergrondkaartgrijs';
        break;
      case 'pastel':
        name = 'brtachtergrondkaartpastel';
        break;
      case 'luchtfoto':
        name = '2016_ortho25';
        break;
      default:
        name = 'brtachtergrondkaart';
    }
    return name;
  }

  function makeProvider(name, format, minZoom, maxZoom) {
    var baseurl = baseUrl(name);
    var urlname = mapLayerName(name);
    return {
      "bare_url": [baseurl, urlname, servicecrs].join(""),
      "url": [baseurl, urlname, servicecrs, "/{z}/{x}/{y}.", format].join(""),
      "format": format,
      "minZoom": minZoom,
      "maxZoom": maxZoom,
      "attribution": attr,
      "name": (name === 'luchtfoto' ? '' : 'NLMaps ') + ' ' + name
    };
  }

  var BASEMAP_PROVIDERS = {
    "standaard": makeProvider("standaard", "png", 6, 19),
    "pastel": makeProvider("pastel", "png", 6, 19),
    "grijs": makeProvider("grijs", "png", 6, 19),
    "luchtfoto": makeProvider("luchtfoto", "jpeg", 6, 19)
  };

  var geolocator_icon = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="7.0556mm" width="7.0556mm" version="1.1"\nxmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" viewBox="0 0 24.999999 24.999999">\n<metadata>  <rdf:RDF>   <cc:Work rdf:about="">    <dc:format>image/svg+xml</dc:format>    <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>\n<dc:title/>   </cc:Work>  </rdf:RDF> </metadata> <g transform="translate(-151.39 -117.97)">  <g transform="translate(.39250 .85750)">\n<path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m163.5 123.27c-3.4931 0-6.3379 2.8448-6.3379 6.3379s2.8448 6.3398 6.3379 6.3398 6.3379-2.8467 6.3379-6.3398-2.8448-6.3379-6.3379-6.3379zm0 1.3008c2.7905 0 5.0391 2.2466 5.0391 5.0371s-2.2485 5.0391-5.0391 5.0391c-2.7905 0-5.0391-2.2485-5.0391-5.0391 0-2.7905 2.2485-5.0371 5.0391-5.0371z"/><circle cx="163.5" cy="129.61" r="1.9312" style="fill:#191919"/>\n<path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m162.85 120.57v3.3555h1.3008v-3.3555h-1.3008z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m162.85 135.3v3.3555h1.3008v-3.3555h-1.3008z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m154.46 128.96v1.2988h3.3535v-1.2988h-3.3535z"/>\n<path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m169.19 128.96v1.2988h3.3535v-1.2988h-3.3535z"/>  </g> </g></svg>';

  var markerUrl = 'https://rawgit.com/webmapper/nlmaps/master/dist/assets/rijksoverheid-marker.png';

  /*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
   * copyright (c) 2012, Stamen Design
   * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
   */
  //https://geodata.nationaalgeoregister.nl/tiles/service/wmts/
  //https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/
  /*
   * Get the named provider, or throw an exception if it doesn't exist.
   **/
  function getProvider(name) {
    if (name in BASEMAP_PROVIDERS) {
      var provider = BASEMAP_PROVIDERS[name];

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
    if (name in WMS_PROVIDERS) {
      wmsProvider = WMS_PROVIDERS[name];

      // eslint-disable-next-line no-console
      if (wmsProvider.deprecated && console && console.warn) {
        // eslint-disable-next-line no-console
        console.warn(name + " is a deprecated wms; it will be redirected to its replacement. For performance improvements, please change your reference.");
      }
    } else {
      wmsProvider = makeWmsProvider(name, options);
      // eslint-disable-next-line no-console
      console.log('NL Maps: You asked for a wms which does not exist! Available wmses: ' + Object.keys(WMS_PROVIDERS).join(', ') + '. Provide an options object to make your own WMS.');
    }
    return wmsProvider;
  }

  var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  };

  function bgLayer() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'standaard';

    var provider = getProvider(name);
    if ((typeof ol === 'undefined' ? 'undefined' : _typeof$$1(ol)) === "object") {
      return new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: provider.url,
          attributions: [new ol.Attribution({
            html: provider.attribution
          })]
        })
      });
    } else {
      throw 'openlayers is not defined';
    }
  }
  function markerLayer(latLngObject) {
    var markerStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [32, 63],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        src: markerUrl,
        scale: 1
      })
    });
    var lat = void 0;
    var lng = void 0;

    // eslint-disable-next-line eqeqeq
    if (typeof latLngObject == 'undefined') {
      var mapCenter = getMapCenter(map);
      lat = mapCenter.latitude;
      lng = mapCenter.longitude;
    } else {
      lat = latLngObject.latitude;
      lng = latLngObject.longitude;
    }

    var center = ol.proj.fromLonLat([lng, lat]);

    var markerFeature = new ol.Feature({
      geometry: new ol.geom.Point(center),
      name: 'marker'
    });

    markerFeature.setStyle(markerStyle);

    var markerSource = new ol.source.Vector({
      features: [markerFeature]
    });
    return new ol.layer.Vector({
      source: markerSource
    });
  }

  function overlayLayer(name, options) {
    var wmsProvider = getWmsProvider(name, options);
    if ((typeof ol === 'undefined' ? 'undefined' : _typeof$$1(ol)) === "object") {
      return new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: wmsProvider.url,
          serverType: 'geoserver',
          params: {
            LAYERS: wmsProvider.layers,
            VERSION: wmsProvider.version,
            STYLES: wmsProvider.styles
          }
        })
      });
    } else {
      throw 'openlayers is not defined';
    }
  }

  function geoLocatorControl(geolocator, map) {
    var myControlEl = document.createElement('div');
    myControlEl.id = 'nlmaps-geolocator-control';
    myControlEl.style.backgroundColor = '#fff';
    myControlEl.style.cursor = 'pointer';
    myControlEl.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
    myControlEl.style.height = '26px';
    myControlEl.style.width = '26px';
    myControlEl.style.borderRadius = '26px 26px';
    myControlEl.innerHTML = geolocator_icon;
    myControlEl.className = 'ol-control';
    myControlEl.style.right = '.5em';
    myControlEl.style.top = '.5em';

    myControlEl.addEventListener('click', function () {
      geolocator.start();
    });

    function moveMap(d) {
      var map = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : map;

      var oldZoom = map.getView().getZoom();
      var view = new ol.View({
        center: ol.proj.fromLonLat([d.coords.longitude, d.coords.latitude]),
        zoom: oldZoom
      });
      map.setView(view);
    }
    geolocator.on('position', function (d) {
      moveMap(d, map);
    });
    var control = new ol.control.Control({ element: myControlEl });
    return control;
  }

  function zoomTo(point, map) {
    var newCenter = ol.proj.fromLonLat(point.coordinates);
    map.getView().setCenter(newCenter);
    map.getView().setZoom(18);
  }

  function getMapCenter(map) {
    var EPSG3857Coords = map.getView().getCenter();
    var lngLatCoords = ol.proj.toLonLat(EPSG3857Coords);
    return {
      longitude: lngLatCoords[0],
      latitude: lngLatCoords[1]
    };
  }

  function geocoderControl(map) {
    var control = geocoder.createControl(zoomTo, map);
    control = new ol.control.Control({ element: control });
    map.addControl(control);
  }

  exports.bgLayer = bgLayer;
  exports.overlayLayer = overlayLayer;
  exports.markerLayer = markerLayer;
  exports.getMapCenter = getMapCenter;
  exports.geoLocatorControl = geoLocatorControl;
  exports.geocoderControl = geocoderControl;
});

unwrapExports(nlmapsOpenlayers_cjs);
var nlmapsOpenlayers_cjs_1 = nlmapsOpenlayers_cjs.geocoderControl;
var nlmapsOpenlayers_cjs_2 = nlmapsOpenlayers_cjs.geoLocatorControl;
var nlmapsOpenlayers_cjs_3 = nlmapsOpenlayers_cjs.getMapCenter;
var nlmapsOpenlayers_cjs_4 = nlmapsOpenlayers_cjs.markerLayer;
var nlmapsOpenlayers_cjs_5 = nlmapsOpenlayers_cjs.overlayLayer;
var nlmapsOpenlayers_cjs_6 = nlmapsOpenlayers_cjs.bgLayer;

var nlmapsGooglemaps_cjs = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, '__esModule', { value: true });

  var geocoder = {
    suggestUrl: 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?',
    lookupUrl: 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?'
  };

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
    var searchDiv = document.createElement('div');
    var input = document.createElement('input');
    var results = document.createElement('div');
    var controlWidth = '300px';

    container.style.width = controlWidth;
    container.style.zIndex = 1000000;
    container.style.position = 'absolute';
    container.style.top = '15px';
    container.style.left = '12px';
    input.id = 'nlmaps-geocoder-control-input';
    input.placeholder = 'Zoeken op adres...';
    input.style.padding = '4px 10px';
    input.style.width = '100%';
    input.style.border = 'none';
    input.style.backgroundColor = '#fff';
    input.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
    input.style.height = '26px';
    input.style.borderRadius = '5px 5px';

    input.addEventListener('input', function (e) {
      _this.suggest(e.target.value);
    });

    input.addEventListener('focus', function (e) {
      _this.suggest(e.target.value);
    });
    results.id = 'nlmaps-geocoder-control-results';
    results.style.width = controlWidth;

    container.appendChild(searchDiv);
    searchDiv.appendChild(input);
    container.appendChild(results);

    return container;
  };

  geocoder.suggest = function (query) {
    var _this2 = this;

    if (query.length < 4) {
      this.clearSuggestResults();
      return;
    }

    this.doSuggestRequest(query).then(function (results) {
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

    var resultList = document.createElement('ul');
    resultList.style.padding = '10px 10px 2px 10px';
    resultList.style.width = '100%';
    resultList.style.background = '#FFFFFF';
    resultList.style.borderRadius = '5px 5px';
    resultList.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';

    results.forEach(function (result) {

      var li = document.createElement('li');
      li.innerHTML = result.weergavenaam;
      li.id = result.id;
      li.style.cursor = 'pointer';
      li.style.padding = '5px';
      li.style.listStyleType = 'none';
      li.style.marginBottom = '5px';
      li.addEventListener('click', function (e) {
        _this4.lookup(e.target.id);
      });

      li.addEventListener('mouseenter', function () {
        li.style.background = '#6C62A6';
        li.style.color = '#FFFFFF';
      });

      li.addEventListener('mouseleave', function () {
        li.style.background = '#FFFFFF';
        li.style.color = '#333';
      });
      resultList.appendChild(li);
    });
    this.clearSuggestResults();
    document.getElementById('nlmaps-geocoder-control-results').appendChild(resultList);
  };

  function wmsBaseUrl(workSpaceName) {
    return 'https://geodata.nationaalgeoregister.nl/' + workSpaceName + '/wms?';
  }

  function mapWmsProvider(name, options) {
    var wmsParameters = {
      workSpaceName: '',
      layerName: '',
      styleName: '',
      url: '',
      minZoom: 0,
      maxZoom: 24
    };

    switch (name) {
      case 'gebouwen':
        wmsParameters.workSpaceName = 'bag';
        wmsParameters.layerName = 'pand';
        wmsParameters.styleName = '';
        break;
      case 'percelen':
        wmsParameters.workSpaceName = 'kadastralekaartv3';
        wmsParameters.layerName = 'kadastralekaart';
        wmsParameters.styleName = '';
        break;
      case 'drone-no-fly-zones':
        wmsParameters.workSpaceName = 'dronenoflyzones';
        wmsParameters.layerName = 'luchtvaartgebieden,landingsite';
        wmsParameters.styleName = '';
        break;
      case 'hoogte':
        wmsParameters.workSpaceName = 'ahn2';
        wmsParameters.layerName = 'ahn2_05m_int';
        wmsParameters.styleName = 'ahn2:ahn2_05m_detail';
        break;
      case 'gemeenten':
        wmsParameters.workSpaceName = 'bestuurlijkegrenzen';
        wmsParameters.layerName = 'gemeenten';
        wmsParameters.styleName = 'bestuurlijkegrenzen:bestuurlijkegrenzen_gemeentegrenzen';
        break;
      case 'provincies':
        wmsParameters.workSpaceName = 'bestuurlijkegrenzen';
        wmsParameters.layerName = 'provincies';
        wmsParameters.styleName = 'bestuurlijkegrenzen:bestuurlijkegrenzen_provinciegrenzen';
        break;
      default:
        wmsParameters.url = options.url;
        wmsParameters.layerName = options.layerName;
        wmsParameters.styleName = options.styleName;
    }
    if (wmsParameters.url === '') {
      wmsParameters.url = wmsBaseUrl(wmsParameters.workSpaceName);
    }

    return wmsParameters;
  }

  function makeWmsProvider(name, options) {
    var wmsParameters = mapWmsProvider(name, options);
    return {
      url: wmsParameters.url,
      service: 'WMS',
      version: '1.1.1',
      request: 'GetMap',
      layers: wmsParameters.layerName,
      styles: wmsParameters.styleName,
      transparent: true,
      format: 'image/png'
    };
  }

  var WMS_PROVIDERS = {
    "gebouwen": makeWmsProvider('gebouwen'),
    "percelen": makeWmsProvider('percelen'),
    "drone-no-fly-zones": makeWmsProvider('drone-no-fly-zones'),
    "hoogte": makeWmsProvider('hoogte'),
    "gemeenten": makeWmsProvider('gemeenten'),
    "provincies": makeWmsProvider('provincies')
  };

  var lufostring = 'luchtfoto/rgb';
  var brtstring = 'tiles/service';
  var servicecrs = '/EPSG:3857';
  var attr = 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a> | <a href="https://www.verbeterdekaart.nl">Verbeter de kaart</a>';
  function baseUrl(name) {
    return 'https://geodata.nationaalgeoregister.nl/' + (name === 'luchtfoto' ? lufostring : brtstring) + '/wmts/';
  }

  function mapLayerName(layername) {
    var name = void 0;
    switch (layername) {
      case 'standaard':
        name = 'brtachtergrondkaart';
        break;
      case 'grijs':
        name = 'brtachtergrondkaartgrijs';
        break;
      case 'pastel':
        name = 'brtachtergrondkaartpastel';
        break;
      case 'luchtfoto':
        name = '2016_ortho25';
        break;
      default:
        name = 'brtachtergrondkaart';
    }
    return name;
  }

  function makeProvider(name, format, minZoom, maxZoom) {
    var baseurl = baseUrl(name);
    var urlname = mapLayerName(name);
    return {
      "bare_url": [baseurl, urlname, servicecrs].join(""),
      "url": [baseurl, urlname, servicecrs, "/{z}/{x}/{y}.", format].join(""),
      "format": format,
      "minZoom": minZoom,
      "maxZoom": maxZoom,
      "attribution": attr,
      "name": (name === 'luchtfoto' ? '' : 'NLMaps ') + ' ' + name
    };
  }

  var BASEMAP_PROVIDERS = {
    "standaard": makeProvider("standaard", "png", 6, 19),
    "pastel": makeProvider("pastel", "png", 6, 19),
    "grijs": makeProvider("grijs", "png", 6, 19),
    "luchtfoto": makeProvider("luchtfoto", "jpeg", 6, 19)
  };

  var geolocator_icon = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="7.0556mm" width="7.0556mm" version="1.1"\nxmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" viewBox="0 0 24.999999 24.999999">\n<metadata>  <rdf:RDF>   <cc:Work rdf:about="">    <dc:format>image/svg+xml</dc:format>    <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>\n<dc:title/>   </cc:Work>  </rdf:RDF> </metadata> <g transform="translate(-151.39 -117.97)">  <g transform="translate(.39250 .85750)">\n<path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m163.5 123.27c-3.4931 0-6.3379 2.8448-6.3379 6.3379s2.8448 6.3398 6.3379 6.3398 6.3379-2.8467 6.3379-6.3398-2.8448-6.3379-6.3379-6.3379zm0 1.3008c2.7905 0 5.0391 2.2466 5.0391 5.0371s-2.2485 5.0391-5.0391 5.0391c-2.7905 0-5.0391-2.2485-5.0391-5.0391 0-2.7905 2.2485-5.0371 5.0391-5.0371z"/><circle cx="163.5" cy="129.61" r="1.9312" style="fill:#191919"/>\n<path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m162.85 120.57v3.3555h1.3008v-3.3555h-1.3008z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m162.85 135.3v3.3555h1.3008v-3.3555h-1.3008z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m154.46 128.96v1.2988h3.3535v-1.2988h-3.3535z"/>\n<path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m169.19 128.96v1.2988h3.3535v-1.2988h-3.3535z"/>  </g> </g></svg>';

  var markerUrl = 'https://rawgit.com/webmapper/nlmaps/master/dist/assets/rijksoverheid-marker.png';

  /*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
   * copyright (c) 2012, Stamen Design
   * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
   */
  //https://geodata.nationaalgeoregister.nl/tiles/service/wmts/
  //https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/
  /*
   * Get the named provider, or throw an exception if it doesn't exist.
   **/
  function getProvider(name) {
    if (name in BASEMAP_PROVIDERS) {
      var provider = BASEMAP_PROVIDERS[name];

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
    if (name in WMS_PROVIDERS) {
      wmsProvider = WMS_PROVIDERS[name];

      // eslint-disable-next-line no-console
      if (wmsProvider.deprecated && console && console.warn) {
        // eslint-disable-next-line no-console
        console.warn(name + " is a deprecated wms; it will be redirected to its replacement. For performance improvements, please change your reference.");
      }
    } else {
      wmsProvider = makeWmsProvider(name, options);
      // eslint-disable-next-line no-console
      console.log('NL Maps: You asked for a wms which does not exist! Available wmses: ' + Object.keys(WMS_PROVIDERS).join(', ') + '. Provide an options object to make your own WMS.');
    }
    return wmsProvider;
  }

  var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  };

  function AttributionControl(controlDiv, attrControlText) {
    if ((typeof google === 'undefined' ? 'undefined' : _typeof$$1(google)) === 'object' && _typeof$$1(google.maps) === 'object') {
      var controlUI = document.createElement('div');
      controlUI.style.backgroundColor = '#fff';
      controlUI.style.opacity = '0.7';
      controlUI.style.border = '2px solid #fff';
      controlUI.style.cursor = 'pointer';
      controlDiv.appendChild(controlUI);

      // Set CSS for the control interior.
      var controlText = document.createElement('div');
      controlText.style.color = 'rgb(25,25,25)';
      controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
      controlText.style.fontSize = '10px';
      controlText.innerHTML = attrControlText;
      controlUI.appendChild(controlText);

      controlDiv.index = 1;
      return controlDiv;
    } else {
      var error = 'google is not defined';
      throw error;
    }
  }

  function geoLocatorControl(geolocator, map) {
    var controlUI = document.createElement('div');
    controlUI.id = 'nlmaps-geolocator-control';
    controlUI.innerHTML = geolocator_icon;
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.cursor = 'pointer';
    controlUI.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
    controlUI.style.height = '26px';
    controlUI.style.width = '26px';
    controlUI.style.borderRadius = '26px 26px';
    controlUI.style.margin = '.5em';
    controlUI.addEventListener('click', function () {
      geolocator.start();
    }, this);
    geolocator.on('position', function (position) {
      map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
    return controlUI;
  }

  function zoomTo(point, map) {
    map.setCenter({ lat: point.coordinates[1], lng: point.coordinates[0] });
    map.setZoom(18);
  }

  function indexOfMapControl(controlArray, control) {
    return controlArray.getArray().indexOf(control);
  }

  function toggleAttrControl(attrControl, map) {
    var currentMapId = map.getMapTypeId();
    var controlArray = map.controls[google.maps.ControlPosition.BOTTOM_RIGHT];
    var indexToRemove = indexOfMapControl(controlArray, attrControl);
    if (currentMapId === 'roadmap' || currentMapId === 'hybrid' || currentMapId === 'sattelite') {
      if (indexToRemove > -1) {
        controlArray.removeAt(indexToRemove);
      }
    } else {
      if (indexToRemove === -1) {
        controlArray.push(attrControl);
      }
    }
  }

  function makeGoogleAttrControl() {
    var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : map;
    var attr = arguments[1];

    var attrControlDiv = document.createElement('div');
    var attrControlText = attr;
    var attrControl = new AttributionControl(attrControlDiv, attrControlText);
    map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(attrControl);
    map.addListener('maptypeid_changed', function () {
      return toggleAttrControl(attrControl, map);
    });
  }

  function makeGoogleLayerOpts(provider) {
    return {
      getTileUrl: function getTileUrl(coord, zoom) {
        var url = provider.bare_url + '/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
        return url;
      },
      tileSize: new google.maps.Size(256, 256),
      isPng: true,
      name: provider.name,
      maxZoom: provider.maxZoom,
      minZoom: provider.minZoom
    };
  }

  function getWmsTiledOptions(wmsProvider) {
    return {
      baseUrl: wmsProvider.url,
      layers: wmsProvider.layers,
      styles: wmsProvider.styles,
      format: wmsProvider.format,
      transparent: wmsProvider.transparent,
      // todo maybe: add opacity to wmsProvider params
      opacity: 0.7
    };
  }

  function bgLayer(map) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'standaard';

    if ((typeof google === 'undefined' ? 'undefined' : _typeof$$1(google)) === 'object' && _typeof$$1(google.maps) === 'object') {
      var provider = getProvider(name);
      var GoogleLayerOpts = makeGoogleLayerOpts(provider);
      var layer = new google.maps.ImageMapType(GoogleLayerOpts);
      // warning: tight coupling with nlmaps.createMap
      var ourmap = map || this.map || 'undefined';
      if (typeof ourmap !== 'undefined') {
        makeGoogleAttrControl(ourmap, provider.attribution);
      }
      return layer;
    } else {
      var error = 'google is not defined';
      throw error;
    }
  }

  function toMercator(coord) {
    var lat = coord.lat();
    var lng = coord.lng();
    if (Math.abs(lng) > 180 || Math.abs(lat) > 90) return;

    var num = lng * 0.017453292519943295;
    var x = 6378137.0 * num;
    var a = lat * 0.017453292519943295;

    var merc_lon = x;
    var merc_lat = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));

    return { x: merc_lon, y: merc_lat };
  }

  function WMSTiled(mapObject, wmsTiledOptions) {
    var options = {
      getTileUrl: function getTileUrl(coord, zoom) {
        var proj = mapObject.getProjection();
        var zfactor = Math.pow(2, zoom);

        var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 256 / zfactor, coord.y * 256 / zfactor));
        var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 256 / zfactor, (coord.y + 1) * 256 / zfactor));

        var ne = toMercator(top);
        var sw = toMercator(bot);
        var bbox = ne.x + ',' + sw.y + ',' + sw.x + ',' + ne.y;

        var url = wmsTiledOptions.baseUrl;
        url += 'SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:3857';
        url += '&WIDTH=256';
        url += '&HEIGHT=256';
        url += '&LAYERS=' + wmsTiledOptions.layers;
        url += '&STYLES=' + wmsTiledOptions.styles;
        url += '&BBOX=' + bbox;
        url += '&FORMAT=' + wmsTiledOptions.format;
        url += '&TRANSPARENT=' + wmsTiledOptions.transparent;
        return url;
      },
      tileSize: new google.maps.Size(256, 256),
      isPng: true
    };
    var layer = new google.maps.ImageMapType(options);
    layer.setOpacity(wmsTiledOptions.opacity);
    return mapObject.overlayMapTypes.push(layer);
  }

  function overlayLayer() {
    var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : map;
    var name = arguments[1];
    var options = arguments[2];

    var wmsProvider = getWmsProvider(name, options);
    var wmsTiledOptions = getWmsTiledOptions(wmsProvider);
    var wmsLayer = new WMSTiled(map, wmsTiledOptions);
    wmsLayer.name = 'wms';

    return wmsLayer;
  }

  function markerLayer(latLngObject) {
    var lat = void 0;
    var lng = void 0;
    // eslint-disable-next-line eqeqeq
    if (typeof latLngObject == 'undefined') {
      var mapCenter = getMapCenter(map);
      lat = mapCenter.latitude;
      lng = mapCenter.longitude;
    } else {
      lat = latLngObject.latitude;
      lng = latLngObject.longitude;
    }

    var markerLocationLatLng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
      title: 'marker',
      position: markerLocationLatLng,
      icon: markerUrl
    });
    return marker;
  }

  function getMapCenter(map) {
    return {
      latitude: map.getCenter().lat(),
      longitude: map.getCenter().lng()
    };
  }

  function geocoderControl(map) {
    var control = geocoder.createControl(zoomTo, map);
    map.getDiv().appendChild(control);
  }

  exports.bgLayer = bgLayer;
  exports.overlayLayer = overlayLayer;
  exports.markerLayer = markerLayer;
  exports.getMapCenter = getMapCenter;
  exports.geoLocatorControl = geoLocatorControl;
  exports.geocoderControl = geocoderControl;
});

unwrapExports(nlmapsGooglemaps_cjs);
var nlmapsGooglemaps_cjs_1 = nlmapsGooglemaps_cjs.geocoderControl;
var nlmapsGooglemaps_cjs_2 = nlmapsGooglemaps_cjs.geoLocatorControl;
var nlmapsGooglemaps_cjs_3 = nlmapsGooglemaps_cjs.getMapCenter;
var nlmapsGooglemaps_cjs_4 = nlmapsGooglemaps_cjs.markerLayer;
var nlmapsGooglemaps_cjs_5 = nlmapsGooglemaps_cjs.overlayLayer;
var nlmapsGooglemaps_cjs_6 = nlmapsGooglemaps_cjs.bgLayer;

var emitonoff = createCommonjsModule(function (module) {
  var EmitOnOff = module.exports = function (thing) {
    if (!thing) thing = {};

    thing._subs = [];
    thing._paused = false;
    thing._pending = [];

    /**
     * Sub of pubsub
     * @param  {String}   name name of event
     * @param  {Function} cb   your callback
     */
    thing.on = function (name, cb) {
      thing._subs[name] = thing._subs[name] || [];
      thing._subs[name].push(cb);
    };

    /**
     * remove sub of pubsub
     * @param  {String}   name name of event
     * @param  {Function} cb   your callback
     */
    thing.off = function (name, cb) {
      if (!thing._subs[name]) return;
      for (var i in thing._subs[name]) {
        if (thing._subs[name][i] === cb) {
          thing._subs[name].splice(i);
          break;
        }
      }
    };

    /**
     * Pub of pubsub
     * @param  {String}   name name of event
     * @param  {Mixed}    data the data to publish
     */
    thing.emit = function (name) {
      if (!thing._subs[name]) return;

      var args = Array.prototype.slice.call(arguments, 1);

      if (thing._paused) {
        thing._pending[name] = thing._pending[name] || [];
        thing._pending[name].push(args);
        return;
      }

      for (var i in thing._subs[name]) {
        thing._subs[name][i].apply(thing, args);
      }
    };

    thing.pause = function () {
      thing._paused = true;
    };

    thing.resume = function () {
      thing._paused = false;

      for (var name in thing._pending) {
        for (var i = 0; i < thing._pending[name].length; i++) {
          thing.emit(name, thing._pending[name][i]);
        }
      }
    };

    return thing;
  };
});

var geoLocateDefaultOpts$1 = {
  follow: false
};

function positionHandler(position) {
  this.emit('position', position);
}
function positionErrorHandler(error) {
  this.emit('error', error);
}

var GeoLocator = function GeoLocator(opts) {
  var state = Object.assign({}, geoLocateDefaultOpts$1, opts);

  return {
    start: function start() {
      state.started = true;
      navigator.geolocation.getCurrentPosition(positionHandler.bind(this), positionErrorHandler.bind(this), { maximumAge: 60000 });
      return this;
    },
    stop: function stop() {
      state.started = false;
      return this;
    },
    isStarted: function isStarted() {
      return state.started;
    },
    log: function log() {
      // eslint-disable-next-line no-console
      console.log(state);
      return this;
    }
  };
};

function geoLocator(opts) {
  if ('geolocation' in navigator) {
    var geolocator = emitonoff(GeoLocator(opts));
    geolocator.on('position', function () {
      this.stop();
    });
    return geolocator;
  } else {
    var error = 'geolocation is not available in your browser.';
    throw error;
  }
}

// import { bgLayer as bgL, geoLocatorControl as glL } from 'nlmaps-leaflet';

// import { bgLayer as bgOL,
//          geoLocatorControl as glO } from 'nlmaps-openlayers';

// import { bgLayer as bgGM,
//          geoLocatorControl as glG } from 'nlmaps-googlemaps';

var nlmaps = {
  leaflet: {
    bgLayer: nlmapsLeaflet_cjs_6,
    overlayLayer: nlmapsLeaflet_cjs_5,
    markerLayer: nlmapsLeaflet_cjs_4,
    geocoderControl: nlmapsLeaflet_cjs_1,
    geoLocatorControl: nlmapsLeaflet_cjs_2
  },
  openlayers: {
    bgLayer: nlmapsOpenlayers_cjs_6,
    overlayLayer: nlmapsOpenlayers_cjs_5,
    markerLayer: nlmapsOpenlayers_cjs_4,
    geocoderControl: nlmapsOpenlayers_cjs_1,
    geoLocatorControl: nlmapsOpenlayers_cjs_2
  },
  googlemaps: {
    bgLayer: nlmapsGooglemaps_cjs_6,
    overlayLayer: nlmapsGooglemaps_cjs_5,
    markerLayer: nlmapsGooglemaps_cjs_4,
    geoLocatorControl: nlmapsGooglemaps_cjs_2,
    geocoderControl: nlmapsGooglemaps_cjs_1
  }
};

var mapdefaults = {
  style: 'standaard',
  center: {
    latitude: 51.9984,
    longitude: 4.996
  },
  zoom: 8,
  attribution: true
};

//for future use
var geoLocateDefaultOpts = {};

function testWhichLib() {
  var defined = [];
  if ((typeof L === 'undefined' ? 'undefined' : _typeof(L)) === 'object') {
    defined.push('leaflet');
  }
  if ((typeof google === 'undefined' ? 'undefined' : _typeof(google)) === 'object' && _typeof(google.maps) === 'object') {
    defined.push('googlemaps');
  }
  if ((typeof ol === 'undefined' ? 'undefined' : _typeof(ol)) === 'object') {
    defined.push('openlayers');
  }
  if (defined.length > 1) {
    return 'too many libs';
  } else if (defined.length === 0) {
    return 'too few libs';
  } else {
    return defined[0];
  }
}

function initMap(lib, opts) {
  var map = void 0;
  switch (lib) {
    case 'leaflet':
      map = L.map(opts.target).setView([opts.center.latitude, opts.center.longitude], opts.zoom);
      map.zoomControl.setPosition('topright');
      break;
    case 'googlemaps':
      map = new google.maps.Map(document.getElementById(opts.target), {
        center: { lat: opts.center.latitude, lng: opts.center.longitude },
        zoom: opts.zoom
      });

      break;
    case 'openlayers':
      map = new ol.Map({
        view: new ol.View({
          center: ol.proj.fromLonLat([opts.center.longitude, opts.center.latitude]),
          zoom: opts.zoom
        }),
        target: opts.target
      });
      map.getTargetElement().getElementsByClassName('ol-zoom')[0].style.cssText = "top: 5px !important; right: 5px !important";
      map.getTargetElement().getElementsByClassName('ol-zoom')[0].classList.remove('ol-zoom');
      break;
  }
  return map;
}

function addGoogleLayer(layer, map) {
  // Markers are not considered to be a layer in google maps. Therefore, they must be added differently.
  // It is important that a layer has the title 'marker' in order to be recognized as a layer.
  if (layer.title === 'marker') {
    layer.setMap(map);
    return;
  }

  if (layer.name === 'wms') {
    map.setOptions({
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: mapTypeIds,
        position: google.maps.ControlPosition.BOTTOM_LEFT
      }
    });
    return;
  }
  var mapTypeIds = [layer.name, 'roadmap'];

  map.setOptions({
    mapTypeControl: true,
    mapTypeControlOptions: {
      mapTypeIds: mapTypeIds,
      position: google.maps.ControlPosition.BOTTOM_LEFT
    }
  });

  map.mapTypes.set(layer.name, layer);
  map.setMapTypeId(layer.name);
}

function addLayerToMap(lib, layer, map) {
  switch (lib) {
    case 'leaflet':
      map.addLayer(layer);
      break;
    case 'googlemaps':
      addGoogleLayer(layer, map);
      break;
    case 'openlayers':
      map.addLayer(layer);
      break;
  }
}
function createBackgroundLayer(lib, map, name) {
  var bgLayer$$1 = void 0;
  switch (lib) {
    case 'leaflet':
      bgLayer$$1 = nlmaps.leaflet.bgLayer(name);
      break;
    case 'googlemaps':
      bgLayer$$1 = nlmaps.googlemaps.bgLayer(map, name);
      break;
    case 'openlayers':
      bgLayer$$1 = nlmaps.openlayers.bgLayer(name);
      break;
  }
  return bgLayer$$1;
}

function createOverlayLayer(lib, map, name) {
  var overlayLayer$$1 = void 0;
  switch (lib) {
    case 'leaflet':
      overlayLayer$$1 = nlmaps.leaflet.overlayLayer(name);
      break;
    case 'googlemaps':
      overlayLayer$$1 = nlmaps.googlemaps.overlayLayer(map, name);
      break;
    case 'openlayers':
      overlayLayer$$1 = nlmaps.openlayers.overlayLayer(name);
      break;
  }
  return overlayLayer$$1;
}

function createMarkerLayer(lib, map, latLngObject) {
  var markerLayer$$1 = void 0;
  switch (lib) {
    case 'leaflet':
      markerLayer$$1 = nlmaps.leaflet.markerLayer(latLngObject);
      break;
    case 'googlemaps':
      markerLayer$$1 = nlmaps.googlemaps.markerLayer(latLngObject);
      break;
    case 'openlayers':
      markerLayer$$1 = nlmaps.openlayers.markerLayer(latLngObject);
      break;
  }
  return markerLayer$$1;
}

function getMapCenter$$1(lib, map) {
  var mapCenter = void 0;
  switch (lib) {
    case 'leaflet':
      mapCenter = nlmapsLeaflet_cjs_3(map);
      break;
    case 'googlemaps':
      mapCenter = nlmapsGooglemaps_cjs_3(map);
      break;
    case 'openlayers':
      mapCenter = nlmapsOpenlayers_cjs_3(map);
      break;
  }
  return mapCenter;
}

function mergeOpts(defaultopts, useropts) {
  return Object.assign({}, defaultopts, useropts);
}

nlmaps.lib = testWhichLib();

nlmaps.createMap = function () {
  var useropts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var opts = mergeOpts(mapdefaults, useropts);
  try {
    if (nlmaps.lib === 'too many libs' || nlmaps.lib === 'too few libs') {
      throw { message: 'one and only one map library can be defined. Please Refer to the documentation to see which map libraries are supported.' };
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
  var map = initMap(nlmaps.lib, opts);
  // Background layer
  var backgroundLayer = createBackgroundLayer(nlmaps.lib, map, opts.style);
  addLayerToMap(nlmaps.lib, backgroundLayer, map, opts.style);

  // Geocoder
  if (opts.search) {
    addGeocoderControlToMap(nlmaps.lib, map);
  }

  // Marker layer
  if (opts.marker) {
    var markerLocation = opts.marker;
    if (typeof opts.marker === "boolean") {
      markerLocation = getMapCenter$$1(nlmaps.lib, map);
    }
    var markerLayer$$1 = createMarkerLayer(nlmaps.lib, map, markerLocation);
    addLayerToMap(nlmaps.lib, markerLayer$$1, map);
  }

  // Overlay layer
  if (opts.overlay && opts.overlay !== 'false') {
    var overlayLayer$$1 = createOverlayLayer(nlmaps.lib, map, opts.overlay);
    addLayerToMap(nlmaps.lib, overlayLayer$$1, map);
  }
  return map;
};

function addGeoLocControlToMap(lib, geolocator, map) {
  var control = void 0;
  switch (lib) {
    case 'leaflet':
      nlmaps[lib].geoLocatorControl(geolocator).addTo(map);
      break;
    case 'googlemaps':
      control = nlmaps[lib].geoLocatorControl(geolocator, map);
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(control);
      break;
    case 'openlayers':
      control = nlmaps[lib].geoLocatorControl(geolocator, map);
      map.addControl(control);
      break;
  }
}

function addGeocoderControlToMap(lib, map) {
  nlmaps[lib].geocoderControl(map);
}

nlmaps.geoLocate = function (map) {
  var useropts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var opts = mergeOpts(geoLocateDefaultOpts, useropts);
  var geolocator = geoLocator(opts);
  addGeoLocControlToMap(nlmaps.lib, geolocator, map);
};

return nlmaps;

}((this.window = this.window || {})));
