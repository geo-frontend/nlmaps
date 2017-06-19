'use strict';

var nlmapsLeaflet = require('nlmaps-leaflet');
var nlmapsOpenlayers = require('nlmaps-openlayers');
var nlmapsGooglemaps = require('nlmaps-googlemaps');

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var nlmaps = {
  leaflet: {
    bgLayer: nlmapsLeaflet.bgLayer
  },
  openlayers: {
    bgLayer: nlmapsOpenlayers.bgLayer
  },
  googlemaps: {
    bgLayer: nlmapsGooglemaps.bgLayer
  }
};

var mapdefaults = {
  style: 'standaard',
  center: {
    latitude: 51.9984,
    longitude: 4.996
  },
  zoom: 8
};

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

function addGoogleLayer(layer, map) {
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

nlmaps.createMap = function () {
  var useropts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var opts = Object.assign({}, mapdefaults, useropts);
  var lib = testWhichLib();
  if (lib === 'too many libs' || lib === 'too few libs') {
    throw { message: 'one and only one map library can be defined.' };
    return;
  }
  var map = initMap(lib, opts);
  var layer = nlmaps[lib].bgLayer(opts.style);
  addLayerToMap(lib, layer, map);
  return map;
};

module.exports = nlmaps;
