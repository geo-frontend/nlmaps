import { getProvider, getWmsProvider, geocoder, getMarker, getExtent } from '../../lib/index.js';

function extentLeafletFormat() {
  let extent = getExtent();
  let lowerLeft = L.latLng(extent[0], extent[1])
  let upperRight = L.latLng(extent[2], extent[3])
  let bounds = L.latLngBounds(lowerLeft, upperRight);
  return bounds;
}

//TODO 'standaard' vervangen door eerste layer van baselayers
if (typeof L !== 'undefined' && typeof L === 'object') {
L.NlmapsBgLayer = L.TileLayer.extend({
  initialize: function(name='standaard', options) {
    const provider = getProvider(name);
    const opts = L.Util.extend({}, options, {
      'minZoom':      provider.minZoom,
      'maxZoom':      provider.maxZoom,
      'scheme':       'xyz',
      'attribution':  provider.attribution,
      'subdomains':   provider.subdomains?provider.subdomains:'abc',
       sa_id:          name
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
  initialize: function(name = '', options) {
    const wmsProvider = getWmsProvider(name, options);
    const url = wmsProvider.url;
    delete wmsProvider.url;
    const wmsParams = L.Util.extend({}, options, {
      layers: wmsProvider.layerName,
      maxZoom: 24,
      minZoom: 1,
      styles: wmsProvider.styleName,
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
  initialize: function (options) {
    // set default options if nothing is set (merge one step deep)
    for (let i in options) {
        if (typeof this.options[i] === 'object') {
            L.extend(this.options[i], options[i]);
        } else {
            this.options[i] = options[i];
        }
    }
  },

  onAdd: function(map){
    let div = L.DomUtil.create('div');
    div.id = 'nlmaps-geolocator-control';
    div.className='nlmaps-geolocator-control';
    let img = document.createElement('img');
    div.append(img);
    if (this.options.geolocator.isStarted()){
      L.DomUtil.addClass(div, 'started')
    }
    function moveMap(position){
      map.panTo([position.coords.latitude,position.coords.longitude])
    }
    L.DomEvent.on(div, 'click', function(){
      this.options.geolocator.start();
      L.DomUtil.addClass(div, 'started');
    }, this);
    this.options.geolocator.on('position', function(d) {
      L.DomUtil.removeClass(div, 'started');
      L.DomUtil.addClass(div, 'has-position');
      moveMap(d);
    })
    return div;
  },
  onRemove: function(map){
    return map;
  }
});


L.geoLocatorControl = function(geolocator){
  return new L.Control.GeoLocatorControl({geolocator:geolocator});
}


}
function markerLayer(latLngObject) {
  if (typeof L !== 'undefined' && typeof L === 'object') {
    let lat;
    let lng;
    // LatLngObject should always be defined when it is called from the main package.
    // eslint-disable-next-line eqeqeq
    if (typeof latLngObject == 'undefined') {
      const center = getMapCenter(map);
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
        iconSize: getMarker().iconSize,
        iconAnchor: getMarker().iconAnchor
      })
    });
  }
}

function bgLayer(name) {
  if (typeof L !== 'undefined' && typeof L === 'object') {
    return L.nlmapsBgLayer(name);
  }
}

function overlayLayer(name, options) {
  if (typeof L !== 'undefined' && typeof L === 'object') {
    return L.nlmapsOverlayLayer(name, options);
  }
}

function geoLocatorControl(geolocator) {
  if (typeof L !== 'undefined' && typeof L === 'object') {
    return L.geoLocatorControl(geolocator);
  }
}
function zoomTo(point, map) {
  map.fitBounds(L.geoJSON(point).getBounds(), {maxZoom: 18});
}

function geocoderControl(map) {
  const control = geocoder.createControl(zoomTo, map);
  map.getContainer().parentElement.prepend(control);
}

function getMapCenter(map) {
  const latLngObject = map.getCenter();
  return {
    latitude: latLngObject.lat,
    longitude: latLngObject.lng
  };
}

// Until the building works properly, this is here. Should be in browser-test.js ///
// var map = L.map('map').setView([52, 5], 10);
// var standaard = bgLayer('pastel');
// const overlay = overlayLayer('drone-no-fly-zones', {
//   url: 'https://geodata.nationaalgeoregister.nl/drone-no-fly-zones/wms?',
//   layerName: 'luchtvaartgebieden,landingsite',
//   styleName: ''
// });

// standaard.addTo(map);
// overlay.addTo(map);

export { bgLayer, overlayLayer, markerLayer, extentLeafletFormat, getMapCenter, geoLocatorControl, geocoderControl};
