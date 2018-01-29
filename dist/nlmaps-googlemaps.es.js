const geocoder = {
    suggestUrl: 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?',
    lookupUrl: 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?'
};

function httpGetAsync(url) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
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
    const coordinateTuple = wktPoint.split('(')[1].split(')')[0];
    const x = parseFloat(coordinateTuple.split(' ')[0]);
    const y = parseFloat(coordinateTuple.split(' ')[1]);

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
    return httpGetAsync(`${this.suggestUrl}q=${encodeURIComponent(searchTerm)}`);
};

/**
 * Make a call to PDOK locatieserver v3 lookup service. This service provides information about objects found through the suggest service. For additional
 * documentation, check: https://github.com/PDOK/locatieserver/wiki/API-Locatieserver
 * @param {string} id The id of the feature that is to be looked up.
 */
geocoder.doLookupRequest = function (id) {
    return httpGetAsync(`${this.lookupUrl}id=${encodeURIComponent(id)}`).then(lookupResult => {
        // A lookup request should always return 1 result
        const geocodeResult = lookupResult.response.docs[0];
        geocodeResult.centroide_ll = wktPointToGeoJson(geocodeResult.centroide_ll);
        geocodeResult.centroide_rd = wktPointToGeoJson(geocodeResult.centroide_rd);
        return geocodeResult;
    });
};

geocoder.createControl = function (zoomFunction, map) {
    this.zoomTo = zoomFunction;
    this.map = map;
    const container = document.createElement('div');
    const searchDiv = document.createElement('div');
    const input = document.createElement('input');
    const results = document.createElement('div');
    const controlWidth = '300px';

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

    input.addEventListener('input', e => {
        this.suggest(e.target.value);
    });

    input.addEventListener('focus', e => {
        this.suggest(e.target.value);
    });
    results.id = 'nlmaps-geocoder-control-results';
    results.style.width = controlWidth;

    container.appendChild(searchDiv);
    searchDiv.appendChild(input);
    container.appendChild(results);

    return container;
};

geocoder.suggest = function (query) {
    if (query.length < 4) {
        this.clearSuggestResults();
        return;
    }

    this.doSuggestRequest(query).then(results => {
        this.showSuggestResults(results.response.docs);
    });
};

geocoder.lookup = function (id) {
    this.doLookupRequest(id).then(result => {
        this.zoomTo(result.centroide_ll, this.map);
        this.showLookupResult(result.weergavenaam);
        this.clearSuggestResults();
    });
};

geocoder.clearSuggestResults = function () {
    document.getElementById('nlmaps-geocoder-control-results').innerHTML = '';
};

geocoder.showLookupResult = function (name) {
    document.getElementById('nlmaps-geocoder-control-input').value = name;
};

geocoder.showSuggestResults = function (results) {
    const resultList = document.createElement('ul');
    resultList.style.padding = '10px 10px 2px 10px';
    resultList.style.width = '100%';
    resultList.style.background = '#FFFFFF';
    resultList.style.borderRadius = '5px 5px';
    resultList.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';

    results.forEach(result => {

        const li = document.createElement('li');
        li.innerHTML = result.weergavenaam;
        li.id = result.id;
        li.style.cursor = 'pointer';
        li.style.padding = '5px';
        li.style.listStyleType = 'none';
        li.style.marginBottom = '5px';
        li.addEventListener('click', e => {
            this.lookup(e.target.id);
        });

        li.addEventListener('mouseenter', () => {
            li.style.background = '#6C62A6';
            li.style.color = '#FFFFFF';
        });

        li.addEventListener('mouseleave', () => {
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
  const wmsParameters = {
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
  const wmsParameters = mapWmsProvider(name, options);
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

const WMS_PROVIDERS = {
  "gebouwen": makeWmsProvider('gebouwen'),
  "percelen": makeWmsProvider('percelen'),
  "drone-no-fly-zones": makeWmsProvider('drone-no-fly-zones'),
  "hoogte": makeWmsProvider('hoogte'),
  "gemeenten": makeWmsProvider('gemeenten'),
  "provincies": makeWmsProvider('provincies')
};

const lufostring = 'luchtfoto/rgb';
const brtstring = 'tiles/service';
const servicecrs = '/EPSG:3857';
const attr = 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a> | <a href="https://www.verbeterdekaart.nl">Verbeter de kaart</a>';
function baseUrl(name) {
  return `https://geodata.nationaalgeoregister.nl/${name === 'luchtfoto' ? lufostring : brtstring}/wmts/`;
}

function mapLayerName(layername) {
  let name;
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
  const baseurl = baseUrl(name);
  const urlname = mapLayerName(name);
  return {
    "bare_url": [baseurl, urlname, servicecrs].join(""),
    "url": [baseurl, urlname, servicecrs, "/{z}/{x}/{y}.", format].join(""),
    "format": format,
    "minZoom": minZoom,
    "maxZoom": maxZoom,
    "attribution": attr,
    "name": `${name === 'luchtfoto' ? '' : 'NLMaps '} ${name}`
  };
}

const BASEMAP_PROVIDERS = {
  "standaard": makeProvider("standaard", "png", 6, 19),
  "pastel": makeProvider("pastel", "png", 6, 19),
  "grijs": makeProvider("grijs", "png", 6, 19),
  "luchtfoto": makeProvider("luchtfoto", "jpeg", 6, 19)
};

const geolocator_icon = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="7.0556mm" width="7.0556mm" version="1.1"
xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" viewBox="0 0 24.999999 24.999999">
<metadata>  <rdf:RDF>   <cc:Work rdf:about="">    <dc:format>image/svg+xml</dc:format>    <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
<dc:title/>   </cc:Work>  </rdf:RDF> </metadata> <g transform="translate(-151.39 -117.97)">  <g transform="translate(.39250 .85750)">
<path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m163.5 123.27c-3.4931 0-6.3379 2.8448-6.3379 6.3379s2.8448 6.3398 6.3379 6.3398 6.3379-2.8467 6.3379-6.3398-2.8448-6.3379-6.3379-6.3379zm0 1.3008c2.7905 0 5.0391 2.2466 5.0391 5.0371s-2.2485 5.0391-5.0391 5.0391c-2.7905 0-5.0391-2.2485-5.0391-5.0391 0-2.7905 2.2485-5.0371 5.0391-5.0371z"/><circle cx="163.5" cy="129.61" r="1.9312" style="fill:#191919"/>
<path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m162.85 120.57v3.3555h1.3008v-3.3555h-1.3008z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m162.85 135.3v3.3555h1.3008v-3.3555h-1.3008z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m154.46 128.96v1.2988h3.3535v-1.2988h-3.3535z"/>
<path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m169.19 128.96v1.2988h3.3535v-1.2988h-3.3535z"/>  </g> </g></svg>`;

const markerUrl = 'https://rawgit.com/webmapper/nlmaps/master/dist/assets/rijksoverheid-marker.png';

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
  let wmsProvider;
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

export { bgLayer, overlayLayer, markerLayer, getMapCenter, geoLocatorControl, geocoderControl };
