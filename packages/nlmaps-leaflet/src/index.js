import { getProvider, getWmsProvider, geolocator_icon, geocoder } from '../../lib/index.js';

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

L.Control.GeocoderControl = L.Control.extend({
  options: {
    position: 'topleft'
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

  onAdd: function(map) {
    const container = L.DomUtil.create('div');
    const searchDiv = L.DomUtil.create('div');
    const results = L.DomUtil.create('div');
    const input = L.DomUtil.create('input');

    searchDiv.appendChild(input);
    container.appendChild(searchDiv);
    container.appendChild(results);

    L.DomEvent.addListener(input, 'input', function(e) {
      this.suggest(e.target.value);
    }, this);

    L.DomEvent.addListener(input, 'focus', function(e) {
      this.suggest(e.target.value);
    }, this);

    const controlWidth = '300px';
    container.id = 'nlmaps-geocoder-control';
    searchDiv.style.width = controlWidth;

    input.id = 'nlmaps-geocoder-control-input';
    input.placeholder = 'Zoeken op adres...'
    input.style.padding = '4px 10px';
    input.style.width = '100%';
    input.style.border = 'none';
    input.style.backgroundColor = '#fff';
    input.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
    input.style.height = '26px';
    input.style.borderRadius = '5px 5px';
    results.id = 'nlmaps-geocoder-control-results';
    results.style.width = controlWidth;
    return container;
  },
  onRemove: function(map){},
  suggest: function(query) {
    if (query.length < 4) {
      this.clearSuggestResults();
      return;
    }
    this.options.geocoder.suggest(query).then((results) => {
      this.showSuggestResults(results.response.docs);
    });
  },
  showSuggestResults: function(results) {
    const resultList = L.DomUtil.create('ul');
    resultList.style.padding = '10px 10px 2px 10px';
    resultList.style.width = '100%';
    resultList.style.background = '#FFFFFF';
    resultList.style.borderRadius = '5px 5px';
    resultList.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
    
    results.forEach((result) => {
      const li = L.DomUtil.create('li');
      li.innerHTML = result.weergavenaam;
      li.id = result.id;
      li.style.cursor = 'pointer';
      li.style.padding = '5px';
      li.style.listStyleType = 'none';
      li.style.marginBottom = '5px';
      L.DomEvent.addListener(li, 'click', function(e) {
        this.lookup(e.target.id);
      }, this);

      L.DomEvent.addListener(li, 'mouseenter', function(e) {
        li.style.background = '#6C62A6';
        li.style.color = '#FFFFFF';
      }, this);

      L.DomEvent.addListener(li, 'mouseleave', function(e) {
        li.style.background = '#FFFFFF';
        li.style.color = '#333';
      }, this);
      resultList.appendChild(li);
    });
    this.clearSuggestResults();
    document.getElementById('nlmaps-geocoder-control-results').appendChild(resultList);
  },
  clearSuggestResults: function () {
    const resultContainer = document.getElementById('nlmaps-geocoder-control-results');
    resultContainer.innerHTML = '';
  },
  lookup: function(id) {
    this.options.geocoder.lookup(id).then((result) => {
      this.zoomTo(result.centroide_ll);
      this.showLookupResult(result.weergavenaam);
      this.clearSuggestResults();
    });
  },
  zoomTo: function(point) {
    this._map.fitBounds(L.geoJSON(point).getBounds(), {maxZoom: 18});
  },
  showLookupResult: function (name) {
    document.getElementById('nlmaps-geocoder-control-input').value = name;
  }
});

L.geoLocatorControl = function(geolocator){
  return new L.Control.GeoLocatorControl({geolocator:geolocator});
}

L.geocoderControl = function(geocoder) {
  return new L.Control.GeocoderControl({geocoder:geocoder});
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
        iconUrl: 'https://rawgit.com/webmapper/nlmaps/master/dist/assets/rijksoverheid-marker.png',
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

function geocoderControl(geocoder) {
  if (typeof L !== 'undefined' && typeof L === 'object') {
    return L.geocoderControl(geocoder);
  }
}

function getMapCenter(map) {
  const latLngObject = map.getCenter();
  return {
    latitude: latLngObject.lat, 
    longitude: latLngObject.lng
  };
}

// Until the building works properly, this is here. Should be in browser-test.js /// 
var map = L.map('map').setView([52, 5], 10);
var standaard = bgLayer('pastel');
const overlay = overlayLayer('gebouwen');
const marker = markerLayer();

standaard.addTo(map);
overlay.addTo(map);
marker.addTo(map);
L.geocoderControl(geocoder).addTo(map);
export { bgLayer, overlayLayer, markerLayer, getMapCenter, geoLocatorControl, geocoderControl};
