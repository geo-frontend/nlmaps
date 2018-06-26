(function (exports) {
    'use strict';

    var config = {
        "version": 0.2,
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
                "layerName": "brtachtergrondkaart"
            }, {
                "name": "grijs",
                "layerName": "brtachtergrondkaartgrijs"
            }, {
                "name": "pastel",
                "layerName": "brtachtergrondkaartpastel"
            }, {
                "name": "luchtfoto",
                "layerName": "2016_ortho25",
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
            "extent": [-180, -90, 180, 90],
            "zoomposition": "topright"
        },
        "marker": {
            "url": "./assets/img/marker_icon.svg",
            "iconSize": [64, 64],
            "iconAnchor": [63, 32]
        },
        "classnames": {
            'geocoderContainer': ['nlmaps-geocoder-control-container'],
            'geocoderSearch': ['nlmaps-geocoder-control-search'],
            'geocoderButton': ['nlmaps-geocoder-control-button'],
            'geocoderResultList': ['nlmaps-geocoder-result-list'],
            'geocoderResultItem': ['nlmaps-geocoder-result-item'],
            'geocoderResultSelected': ['nlmaps-geocoder-result-selected']
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
        maxZoom: 24,
        styleName: ""
    };
    CONFIG.BASEMAP_PROVIDERS = {};
    CONFIG.WMS_PROVIDERS = {};
    CONFIG.GEOCODER = {};
    CONFIG.MAP = {
        "zoomposition": "bottomleft"
    };
    CONFIG.MARKER = {};
    CONFIG.CLASSNAMES = {
        'geocoderContainer': ['nlmaps-geocoder-control-container'],
        'geocoderSearch': ['nlmaps-geocoder-control-search'],
        'geocoderButton': ['nlmaps-geocoder-control-button'],
        'geocoderResultList': ['nlmaps-geocoder-result-list'],
        'geocoderResultItem': ['nlmaps-geocoder-result-item']
    };

    function err(err) {
        throw err;
    }

    if (config.version !== 0.2) {
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
        CONFIG.MAP = mergeConfig(CONFIG.MAP, map);
    }

    function formatBasemapUrl(layer) {
        switch (layer.type) {
            case 'wmts':
                layer.url = layer.url + "/" + layer.type + "/" + layer.layerName + "/" + layer.crs + "/{z}/{x}/{y}." + layer.format;
                break;
            case 'tms':
                layer.url = layer.url + "/" + layer.layerName + "/{z}/{x}/{y}." + layer.format;
                break;
            default:
                layer.url = layer.url + "/" + layer.type + "/" + layer.layerName + "/" + layer.crs + "/{z}/{x}/{y}." + layer.format;
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

    function parseClasses(classes) {
        CONFIG.CLASSNAMES = mergeConfig(CONFIG.CLASSNAMES, classes);
    }

    function parseMarker(marker) {
        CONFIG.MARKER = marker;
    }

    if (config.featureQuery !== undefined) parseFeatureQuery(config.featureQuery.baseUrl);
    if (config.map !== undefined) parseMap(config.map);
    parseBase(config.basemaps);
    if (config.wms !== undefined) parseWMS(config.wms);
    if (config.geocoder !== undefined) parseGeocoder(config.geocoder);
    if (config.marker !== undefined) parseMarker(config.marker);
    if (config.classnames !== undefined) parseClasses(config.classnames);

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

    geocoder.resultList = [];
    geocoder.selectedResult = -1;
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
        this.nlmaps = nlmaps;
        var container = document.createElement('div');
        var searchDiv = document.createElement('form');
        var input = document.createElement('input');
        var button = document.createElement('button');
        var results = document.createElement('div');

        parseClasses$1(container, CONFIG.CLASSNAMES.geocoderContainer);
        parseClasses$1(searchDiv, CONFIG.CLASSNAMES.geocoderSearch);
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

        input.addEventListener('keydown', function (e) {
            var results = _this.resultList;
            if (_this.resultList.length > 0) {
                if (e.code === 'ArrowDown') {
                    if (_this.selectedResult < _this.resultList.length - 1) {
                        _this.selectedResult++;
                    }
                    _this.showLookupResult(results[_this.selectedResult]);
                }
                if (e.code === 'ArrowUp') {
                    if (_this.selectedResult > 0) {
                        _this.selectedResult--;
                    }
                    _this.showLookupResult(results[_this.selectedResult]);
                }
                if (e.code === 'Escape') {

                    _this.clearSuggestResults(true);
                }
            }
        });
        input.addEventListener('input', function (e) {

            _this.suggest(e.target.value);
        });
        input.addEventListener('focus', function (e) {
            _this.suggest(e.target.value);
        });
        button.setAttribute('type', 'submit');
        searchDiv.addEventListener('submit', function (e) {
            e.preventDefault();
            if (_this.resultList.length > 0) {
                _this.lookup(_this.resultList[_this.selectedResult < 0 ? 0 : _this.selectedResult].id);
            }
        });
        button.setAttribute('aria-label', 'Zoomen naar adres');
        parseClasses$1(button, CONFIG.CLASSNAMES.geocoderButton);

        results.id = 'nlmaps-geocoder-control-results';
        parseClasses$1(results, CONFIG.CLASSNAMES.geocoderResultList);
        results.classList.add('nlmaps-hidden');
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
            _this2.resultList = results.response.docs;
            _this2.showSuggestResults(_this2.resultList);
        });
    };

    geocoder.lookup = function (id) {
        var _this3 = this;

        this.doLookupRequest(id).then(function (result) {
            _this3.zoomTo(result.centroide_ll, _this3.map);
            _this3.nlmaps.emit('search-select', result.centroide_ll);
            _this3.showLookupResult(result.weergavenaam);
            _this3.clearSuggestResults();
        });
    };

    geocoder.clearSuggestResults = function (input) {
        this.selectedResult = -1;
        if (input) document.getElementById('nlmaps-geocoder-control-input').value = '';
        document.getElementById('nlmaps-geocoder-control-results').innerHTML = '';
        document.getElementById('nlmaps-geocoder-control-results').classList.add('nlmaps-hidden');
    };

    geocoder.showLookupResult = function (result) {
        var resultNodes = document.getElementsByClassName(CONFIG.CLASSNAMES.geocoderResultItem);
        Array.prototype.map.call(resultNodes, function (i) {
            return i.classList.remove(CONFIG.CLASSNAMES.geocoderResultSelected);
        });
        var resultNode = document.getElementById(result.id);
        if (resultNode) resultNode.classList.add(CONFIG.CLASSNAMES.geocoderResultSelected);
        document.getElementById('nlmaps-geocoder-control-input').value = result.weergavenaam;
    };

    function parseClasses$1(el, classes) {
        classes.forEach(function (classname) {
            el.classList.add(classname);
        });
    }

    geocoder.showSuggestResults = function (results) {
        var _this4 = this;

        this.clearSuggestResults();
        if (results.length > 0) {
            var resultList = document.createElement('ul');
            results.forEach(function (result) {

                var li = document.createElement('li');
                var a = document.createElement('a');
                a.innerHTML = result.weergavenaam;
                a.id = result.id;
                parseClasses$1(a, CONFIG.CLASSNAMES.geocoderResultItem);
                a.setAttribute('href', '#');
                a.addEventListener('click', function (e) {
                    e.preventDefault();
                    _this4.lookup(e.target.id);
                });
                li.appendChild(a);
                resultList.appendChild(li);
            });
            document.getElementById('nlmaps-geocoder-control-results').classList.remove('nlmaps-hidden');
            document.getElementById('nlmaps-geocoder-control-results').appendChild(resultList);
        }
    };

    /*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
     * copyright (c) 2012, Stamen Design
     * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
     */

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

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function AttributionControl(controlDiv, attrControlText) {
      if ((typeof google === 'undefined' ? 'undefined' : _typeof(google)) === 'object' && _typeof(google.maps) === 'object') {
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

    function bgLayer(map) {
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'standaard';

      if ((typeof google === 'undefined' ? 'undefined' : _typeof(google)) === 'object' && _typeof(google.maps) === 'object') {
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

    exports.bgLayer = bgLayer;
    exports.geoLocatorControl = geoLocatorControl;

}((this.window = this.window || {})));
//# sourceMappingURL=nlmaps-googlemaps.iife.js.map
