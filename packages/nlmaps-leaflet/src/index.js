import { getProvider, getWmsProvider, geolocator_icon, geocoder, markerUrl } from '../../lib/index.js';

if (typeof L !== 'undefined' && typeof L === 'object') {
L.NlmapsBgLayer = L.TileLayer.extend({
  initialize: function(name='standaard', options) {
    const provider = getProvider(name);
    const opts = L.Util.extend({}, options, {
      'minZoom':      provider.minZoom,
      'maxZoom':      provider.maxZoom,
      'scheme':       'xyz',
      'attribution':  provider.attribution,
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
    const wmsProvider = getWmsProvider(name);
    const wmsParams = L.Util.extend({}, options, {
      layers: wmsProvider.layers,
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
    div.style.backgroundColor = '#fff';
    div.style.cursor = 'pointer';
    div.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
    div.style.height = '26px';
    div.style.width = '26px';
    div.style.borderRadius = '26px 26px';
    div.innerHTML = geolocator_icon;
    if (this.options.geolocator.isStarted()){
      L.DomUtil.addClass(div, 'started')
    }
    function moveMap(position){
      map.panTo([position.coords.latitude,position.coords.longitude])
    }
    L.DomEvent.on(div, 'click', function(e){
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
  onRemove: function(map){}
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
    if (typeof latLngObject == 'undefined') {
      const center = getMapCenter(map);
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
  if (typeof L !== 'undefined' && typeof L === 'object') {
    return L.nlmapsBgLayer(name);
  }
}

function overlayLayer(name) {
  if (typeof L !== 'undefined' && typeof L === 'object') {
    return L.nlmapsOverlayLayer(name);
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
  map.getContainer().appendChild(control);
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
// console.log(map);
// var standaard = bgLayer('pastel');
// const overlay = overlayLayer('gebouwen');
// const marker = markerLayer();

// standaard.addTo(map);
// overlay.addTo(map);
// marker.addTo(map);
// geocoderControl(map);
// L.geocoderControl(geocoder).addTo(map);
export { bgLayer, overlayLayer, markerLayer, getMapCenter, geoLocatorControl, geocoderControl};
