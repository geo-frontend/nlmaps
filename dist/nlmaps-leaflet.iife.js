var window = (function (exports) {
'use strict';

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

  wmsParameters.url = wmsBaseUrl(wmsParameters.workSpaceName);

  return wmsParameters;
}

function makeWmsProvider(name) {
  const wmsParameters = mapWmsProvider(name);
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
function getWmsProvider(name) {
  if (name in WMS_PROVIDERS) {
    let wmsProvider = WMS_PROVIDERS[name];

    // eslint-disable-next-line no-console
    if (wmsProvider.deprecated && console && console.warn) {
      // eslint-disable-next-line no-console
      console.warn(name + " is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference.");
    }

    return wmsProvider;
  } else {
    // eslint-disable-next-line no-console
    console.error('NL Maps error: You asked for a style which does not exist! Available styles: ' + Object.keys(WMS_PROVIDERS).join(', '));
  }
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

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

      var wmsProvider = getWmsProvider(name);
      var wmsParams = L.Util.extend({}, options, {
        layers: wmsProvider.layers,
        maxZoom: 24,
        minZoom: 1,
        styles: wmsProvider.styles,
        version: wmsProvider.version,
        transparent: wmsProvider.transparent,
        format: wmsProvider.format
      });
      L.TileLayer.WMS.prototype.initialize.call(this, wmsProvider.url, wmsParams);
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
function bgLayer(name) {
  if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof(L)) === 'object') {
    return L.nlmapsBgLayer(name);
  }
}

function geoLocatorControl(geolocator) {
  if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof(L)) == 'object') {
    return L.geoLocatorControl(geolocator);
  }
}

exports.bgLayer = bgLayer;
exports.geoLocatorControl = geoLocatorControl;

return exports;

}({}));
