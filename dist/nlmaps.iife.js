var nlmaps = (function () {
'use strict';

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator$1 = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
 * copyright (c) 2012, Stamen Design
 * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
 */
//https://geodata.nationaalgeoregister.nl/tiles/service/wmts/
//https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/

var lufostring = 'luchtfoto/rgb';
var brtstring = 'tiles/service';
var servicecrs = '/EPSG:3857';
var attr = 'Kaartgegevens &copy; <a href="kadaster.nl">Kadaster</a> | <a href="http://www.verbeterdekaart.nl">verbeter de kaart</a>';
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

var PROVIDERS = {
  "standaard": makeProvider("standaard", "png", 6, 19),
  "pastel": makeProvider("pastel", "png", 6, 19),
  "grijs": makeProvider("grijs", "png", 6, 19),
  "luchtfoto": makeProvider("luchtfoto", "jpeg", 6, 19)
};

/*
 *  * Get the named provider, or throw an exception if it doesn't exist.
 *   */
function getProvider(name) {
  if (name in PROVIDERS) {
    var provider = PROVIDERS[name];

    if (provider.deprecated && console && console.warn) {
      console.warn(name + " is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference.");
    }

    return provider;
  } else {
    console.error('NL Maps error: You asked for a style which does not exist! Available styles: ' + Object.keys(PROVIDERS).join(', '));
  }
}

var geolocator_icon = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="7.0556mm" width="7.0556mm" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" viewBox="0 0 24.999999 24.999999"> <metadata>  <rdf:RDF>   <cc:Work rdf:about="">    <dc:format>image/svg+xml</dc:format>    <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>    <dc:title/>   </cc:Work>  </rdf:RDF> </metadata> <g transform="translate(-151.39 -117.97)">  <g transform="translate(.39250 .85750)">   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m163.5 123.27c-3.4931 0-6.3379 2.8448-6.3379 6.3379s2.8448 6.3398 6.3379 6.3398 6.3379-2.8467 6.3379-6.3398-2.8448-6.3379-6.3379-6.3379zm0 1.3008c2.7905 0 5.0391 2.2466 5.0391 5.0371s-2.2485 5.0391-5.0391 5.0391c-2.7905 0-5.0391-2.2485-5.0391-5.0391 0-2.7905 2.2485-5.0371 5.0391-5.0371z"/>   <circle cx="163.5" cy="129.61" r="1.9312" style="fill:#191919"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m162.85 120.57v3.3555h1.3008v-3.3555h-1.3008z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m162.85 135.3v3.3555h1.3008v-3.3555h-1.3008z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m154.46 128.96v1.2988h3.3535v-1.2988h-3.3535z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m169.19 128.96v1.2988h3.3535v-1.2988h-3.3535z"/>  </g> </g></svg>';

var _typeof = typeof Symbol === "function" && _typeof$1(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === 'undefined' ? 'undefined' : _typeof$1(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof$1(obj);
};

var asyncGenerator$$1 = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function wrap(fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function _await(value) {
      return new AwaitValue(value);
    }
  };
}();

var get$$1 = function get$$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var set$$1 = function set$$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
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
   *      * Factory function for consistency with Leaflet conventions
   *           */
  L.nlmapsBgLayer = function (options, source) {
    return new L.NlmapsBgLayer(options, source);
  };

  L.Control.GeoLocatorControl = L.Control.extend({
    options: {
      position: 'topleft'
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
      var div = L.DomUtil.create('div', 'mycontrol');
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
      L.DomEvent.on(div, 'click', function (e) {
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
    onRemove: function onRemove(map) {}
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
  if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof(L)) === 'object') {
    return L.geoLocatorControl(geolocator);
  }
}

/*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
 * copyright (c) 2012, Stamen Design
 * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
 */
//https://geodata.nationaalgeoregister.nl/tiles/service/wmts/
//https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/

var lufostring$1 = 'luchtfoto/rgb';
var brtstring$1 = 'tiles/service';
var servicecrs$1 = '/EPSG:3857';
var attr$1 = 'Kaartgegevens &copy; <a href="kadaster.nl">Kadaster</a> | <a href="http://www.verbeterdekaart.nl">verbeter de kaart</a>';
function baseUrl$1(name) {
  return 'https://geodata.nationaalgeoregister.nl/' + (name === 'luchtfoto' ? lufostring$1 : brtstring$1) + '/wmts/';
}

function mapLayerName$1(layername) {
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

function makeProvider$1(name, format, minZoom, maxZoom) {
  var baseurl = baseUrl$1(name);
  var urlname = mapLayerName$1(name);
  return {
    "bare_url": [baseurl, urlname, servicecrs$1].join(""),
    "url": [baseurl, urlname, servicecrs$1, "/{z}/{x}/{y}.", format].join(""),
    "format": format,
    "minZoom": minZoom,
    "maxZoom": maxZoom,
    "attribution": attr$1,
    "name": (name === 'luchtfoto' ? '' : 'NLMaps ') + ' ' + name
  };
}

var PROVIDERS$1 = {
  "standaard": makeProvider$1("standaard", "png", 6, 19),
  "pastel": makeProvider$1("pastel", "png", 6, 19),
  "grijs": makeProvider$1("grijs", "png", 6, 19),
  "luchtfoto": makeProvider$1("luchtfoto", "jpeg", 6, 19)
};

/*
 *  * Get the named provider, or throw an exception if it doesn't exist.
 *   */
function getProvider$1(name) {
  if (name in PROVIDERS$1) {
    var provider = PROVIDERS$1[name];

    if (provider.deprecated && console && console.warn) {
      console.warn(name + " is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference.");
    }

    return provider;
  } else {
    console.error('NL Maps error: You asked for a style which does not exist! Available styles: ' + Object.keys(PROVIDERS$1).join(', '));
  }
}

var geolocator_icon$1 = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="7.0556mm" width="7.0556mm" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" viewBox="0 0 24.999999 24.999999"> <metadata>  <rdf:RDF>   <cc:Work rdf:about="">    <dc:format>image/svg+xml</dc:format>    <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>    <dc:title/>   </cc:Work>  </rdf:RDF> </metadata> <g transform="translate(-151.39 -117.97)">  <g transform="translate(.39250 .85750)">   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m163.5 123.27c-3.4931 0-6.3379 2.8448-6.3379 6.3379s2.8448 6.3398 6.3379 6.3398 6.3379-2.8467 6.3379-6.3398-2.8448-6.3379-6.3379-6.3379zm0 1.3008c2.7905 0 5.0391 2.2466 5.0391 5.0371s-2.2485 5.0391-5.0391 5.0391c-2.7905 0-5.0391-2.2485-5.0391-5.0391 0-2.7905 2.2485-5.0371 5.0391-5.0371z"/>   <circle cx="163.5" cy="129.61" r="1.9312" style="fill:#191919"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m162.85 120.57v3.3555h1.3008v-3.3555h-1.3008z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m162.85 135.3v3.3555h1.3008v-3.3555h-1.3008z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m154.46 128.96v1.2988h3.3535v-1.2988h-3.3535z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m169.19 128.96v1.2988h3.3535v-1.2988h-3.3535z"/>  </g> </g></svg>';

var _typeof$2 = typeof Symbol === "function" && _typeof$1(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === 'undefined' ? 'undefined' : _typeof$1(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof$1(obj);
};

function bgLayer$1() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'standaard';

  var provider = getProvider$1(name);
  if ((typeof ol === 'undefined' ? 'undefined' : _typeof$2(ol)) === "object") {
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

function geoLocatorControl$1(geolocator, map) {
  var myControlEl = document.createElement('div');
  myControlEl.style.backgroundColor = '#fff';
  myControlEl.style.cursor = 'pointer';
  myControlEl.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
  myControlEl.style.height = '26px';
  myControlEl.style.width = '26px';
  myControlEl.style.borderRadius = '26px 26px';
  myControlEl.innerHTML = geolocator_icon$1;
  myControlEl.className = 'ol-control';
  myControlEl.style.bottom = '.5em';

  myControlEl.addEventListener('click', function (e) {
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

/*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
 * copyright (c) 2012, Stamen Design
 * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
 */
//https://geodata.nationaalgeoregister.nl/tiles/service/wmts/
//https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/

var lufostring$2 = 'luchtfoto/rgb';
var brtstring$2 = 'tiles/service';
var servicecrs$2 = '/EPSG:3857';
var attr$2 = 'Kaartgegevens &copy; <a href="kadaster.nl">Kadaster</a> | <a href="http://www.verbeterdekaart.nl">verbeter de kaart</a>';
function baseUrl$2(name) {
  return 'https://geodata.nationaalgeoregister.nl/' + (name === 'luchtfoto' ? lufostring$2 : brtstring$2) + '/wmts/';
}

function mapLayerName$2(layername) {
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

function makeProvider$2(name, format, minZoom, maxZoom) {
  var baseurl = baseUrl$2(name);
  var urlname = mapLayerName$2(name);
  return {
    "bare_url": [baseurl, urlname, servicecrs$2].join(""),
    "url": [baseurl, urlname, servicecrs$2, "/{z}/{x}/{y}.", format].join(""),
    "format": format,
    "minZoom": minZoom,
    "maxZoom": maxZoom,
    "attribution": attr$2,
    "name": (name === 'luchtfoto' ? '' : 'NLMaps ') + ' ' + name
  };
}

var PROVIDERS$2 = {
  "standaard": makeProvider$2("standaard", "png", 6, 19),
  "pastel": makeProvider$2("pastel", "png", 6, 19),
  "grijs": makeProvider$2("grijs", "png", 6, 19),
  "luchtfoto": makeProvider$2("luchtfoto", "jpeg", 6, 19)
};

/*
 *  * Get the named provider, or throw an exception if it doesn't exist.
 *   */
function getProvider$2(name) {
  if (name in PROVIDERS$2) {
    var provider = PROVIDERS$2[name];

    if (provider.deprecated && console && console.warn) {
      console.warn(name + " is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference.");
    }

    return provider;
  } else {
    console.error('NL Maps error: You asked for a style which does not exist! Available styles: ' + Object.keys(PROVIDERS$2).join(', '));
  }
}

var geolocator_icon$2 = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="7.0556mm" width="7.0556mm" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" viewBox="0 0 24.999999 24.999999"> <metadata>  <rdf:RDF>   <cc:Work rdf:about="">    <dc:format>image/svg+xml</dc:format>    <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>    <dc:title/>   </cc:Work>  </rdf:RDF> </metadata> <g transform="translate(-151.39 -117.97)">  <g transform="translate(.39250 .85750)">   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m163.5 123.27c-3.4931 0-6.3379 2.8448-6.3379 6.3379s2.8448 6.3398 6.3379 6.3398 6.3379-2.8467 6.3379-6.3398-2.8448-6.3379-6.3379-6.3379zm0 1.3008c2.7905 0 5.0391 2.2466 5.0391 5.0371s-2.2485 5.0391-5.0391 5.0391c-2.7905 0-5.0391-2.2485-5.0391-5.0391 0-2.7905 2.2485-5.0371 5.0391-5.0371z"/>   <circle cx="163.5" cy="129.61" r="1.9312" style="fill:#191919"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m162.85 120.57v3.3555h1.3008v-3.3555h-1.3008z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m162.85 135.3v3.3555h1.3008v-3.3555h-1.3008z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m154.46 128.96v1.2988h3.3535v-1.2988h-3.3535z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m169.19 128.96v1.2988h3.3535v-1.2988h-3.3535z"/>  </g> </g></svg>';

var _typeof$3 = typeof Symbol === "function" && _typeof$1(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === 'undefined' ? 'undefined' : _typeof$1(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof$1(obj);
};

var asyncGenerator$2 = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function wrap(fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function _await(value) {
      return new AwaitValue(value);
    }
  };
}();

var get$2 = function get$2(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$2(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var set$2 = function set$2(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$2(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

function AttributionControl(controlDiv, attrControlText) {
  console.log('this is obviously not side-effect free');
  if ((typeof google === 'undefined' ? 'undefined' : _typeof$3(google)) === 'object' && _typeof$3(google.maps) === 'object') {
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

function geoLocatorControl$2(geolocator, map) {
  var controlUI = document.createElement('div');
  controlUI.innerHTML = geolocator_icon$2;
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.cursor = 'pointer';
  controlUI.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
  controlUI.style.height = '26px';
  controlUI.style.width = '26px';
  controlUI.style.borderRadius = '26px 26px';
  function moveMap(position) {
    var map = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : map;

    map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
  }
  controlUI.addEventListener('click', function (e) {
    geolocator.start();
  }, this);
  geolocator.on('position', function (d) {
    moveMap(d, map);
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

function bgLayer$2() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'standaard';

  if ((typeof google === 'undefined' ? 'undefined' : _typeof$3(google)) === 'object' && _typeof$3(google.maps) === 'object') {
    var provider = getProvider$2(name);
    var GoogleLayerOpts = makeGoogleLayerOpts(provider);
    var layer = new google.maps.ImageMapType(GoogleLayerOpts);
    //warning: tight coupling with nlmaps.createMap
    var ourmap = this.map || map;
    if (typeof ourmap !== 'undefined') {
      makeGoogleAttrControl(ourmap, provider.attribution);
    }
    return layer;
  } else {
    var error = 'google is not defined';
    throw error;
  }
}

/*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
 * copyright (c) 2012, Stamen Design
 * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
 */
//https://geodata.nationaalgeoregister.nl/tiles/service/wmts/
//https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/

const lufostring$3 = 'luchtfoto/rgb';
const brtstring$3 = 'tiles/service';
const servicecrs$3 = '/EPSG:3857';
const attr$3 = 'Kaartgegevens &copy; <a href="kadaster.nl">Kadaster</a> | <a href="http://www.verbeterdekaart.nl">verbeter de kaart</a>';
function baseUrl$3(name) {
  return `https://geodata.nationaalgeoregister.nl/${name === 'luchtfoto' ? lufostring$3 : brtstring$3}/wmts/`;
}

function mapLayerName$3(layername) {
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

function makeProvider$3(name, format, minZoom, maxZoom) {
  const baseurl = baseUrl$3(name);
  const urlname = mapLayerName$3(name);
  return {
    "bare_url": [baseurl, urlname, servicecrs$3].join(""),
    "url": [baseurl, urlname, servicecrs$3, "/{z}/{x}/{y}.", format].join(""),
    "format": format,
    "minZoom": minZoom,
    "maxZoom": maxZoom,
    "attribution": attr$3,
    "name": `${name === 'luchtfoto' ? '' : 'NLMaps '} ${name}`
  };
}

const PROVIDERS$3 = {
  "standaard": makeProvider$3("standaard", "png", 6, 19),
  "pastel": makeProvider$3("pastel", "png", 6, 19),
  "grijs": makeProvider$3("grijs", "png", 6, 19),
  "luchtfoto": makeProvider$3("luchtfoto", "jpeg", 6, 19)
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index = createCommonjsModule(function (module) {
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

const geoLocateDefaultOpts$1 = {
  follow: false
};

function positionHandler(position) {
  this.emit('position', position);
}
function positionErrorHandler(error) {
  this.emit('error', error);
}

const GeoLocator = function (opts) {
  const state = Object.assign({}, geoLocateDefaultOpts$1, opts);

  return {
    start() {
      state.started = true;
      navigator.geolocation.getCurrentPosition(positionHandler.bind(this), positionErrorHandler.bind(this), { maximumAge: 60000 });
      return this;
    },
    stop() {
      state.started = false;
      return this;
    },
    isStarted() {
      return state.started;
    },
    log() {
      console.log(state);
      return this;
    }
  };
};

function geoLocator(opts) {
  if ('geolocation' in navigator) {
    let geolocator = index(GeoLocator(opts));
    geolocator.on('position', function (position) {
      this.stop();
    });
    return geolocator;
  } else {
    let error = 'geolocation is not available in your browser.';
    throw error;
  }
}

var nlmaps = {
  leaflet: {
    bgLayer: bgLayer,
    geoLocatorControl: geoLocatorControl
  },
  openlayers: {
    bgLayer: bgLayer$1,
    geoLocatorControl: geoLocatorControl$1
  },
  googlemaps: {
    bgLayer: bgLayer$2,
    geoLocatorControl: geoLocatorControl$2
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

function testWhichLib() {
  var defined = [];
  if ((typeof L === 'undefined' ? 'undefined' : _typeof$1(L)) === 'object') {
    defined.push('leaflet');
  }
  if ((typeof google === 'undefined' ? 'undefined' : _typeof$1(google)) === 'object' && _typeof$1(google.maps) === 'object') {
    defined.push('googlemaps');
  }
  if ((typeof ol === 'undefined' ? 'undefined' : _typeof$1(ol)) === 'object') {
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

  }
  return map;
}

function addGoogleLayer(layer, map, name) {
  var mapTypeIds = [layer.name, 'roadmap'];
  map.setOptions({
    mapTypeControl: true,
    mapTypeControlOptions: {
      mapTypeIds: mapTypeIds
    }
  });
  map.mapTypes.set(layer.name, layer);
  map.setMapTypeId(layer.name);
}

function addLayerToMap(lib, layer, map, name) {
  switch (lib) {
    case 'leaflet':
      map.addLayer(layer);
      break;
    case 'googlemaps':
      addGoogleLayer(layer, map, name);
      break;
    case 'openlayers':
      map.addLayer(layer);
      break;

  }
}

//partial application with map added to this
var partialApply = function partialApply(fn, mapProxy, name) {
  var foo = {
    map: mapProxy
  };
  return function () {
    return fn.call(foo, name);
  };
};

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
      return;
    }
  } catch (e) {
    console.error(e.message);
  }
  var map = initMap(nlmaps.lib, opts);
  var addLayer = partialApply(nlmaps[nlmaps.lib].bgLayer, map, opts.style);
  var layer = addLayer();
  addLayerToMap(nlmaps.lib, layer, map, opts.style);
  return map;
};

var geoLocateDefaultOpts = {
  follow: false
};

function addGeoLocControlToMap(lib, geolocator, map) {
  var control = void 0;
  switch (lib) {
    case 'leaflet':
      nlmaps[lib].geoLocatorControl(geolocator).addTo(map);
      break;
    case 'googlemaps':
      control = nlmaps[lib].geoLocatorControl(geolocator, map);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(control);
      break;
    case 'openlayers':
      control = nlmaps[lib].geoLocatorControl(geolocator, map);
      map.addControl(control);

      break;

  }
}

nlmaps.geoLocate = function (map) {
  var useropts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var opts = mergeOpts(geoLocateDefaultOpts, useropts);
  var geolocator = geoLocator(opts);
  console.log('oh hai');
  addGeoLocControlToMap(nlmaps.lib, geolocator, map);
  //
};

return nlmaps;

}());
