import { getProvider, getWmsProvider, geolocator_icon, geocoder, markerUrl } from '../../lib/index.js';

function AttributionControl(controlDiv, attrControlText) {
  if (typeof google === 'object' && typeof google.maps === 'object') {
    let controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.opacity = '0.7';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.cursor = 'pointer';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    let controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '10px';
    controlText.innerHTML = attrControlText;
    controlUI.appendChild(controlText);

    controlDiv.index = 1;
    return controlDiv;
  } else {
    const error = 'google is not defined';
    throw error;
  }
}

function geoLocatorControl (geolocator, map){
    let controlUI = document.createElement('div');
    controlUI.id = 'nlmaps-geolocator-control';
    controlUI.innerHTML = geolocator_icon;
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.cursor = 'pointer';
    controlUI.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
    controlUI.style.height = '26px';
    controlUI.style.width = '26px';
    controlUI.style.borderRadius = '26px 26px';
    controlUI.style.margin = '.5em';
    controlUI.addEventListener( 'click', function(e){
      geolocator.start();
    }, this);
    geolocator.on('position', function(position) {
      map.setCenter({lat:position.coords.latitude,lng:position.coords.longitude});
    })
    return controlUI;
}

function geocoderControl(geocoder) {
  const container = document.createElement('div');
  const searchDiv = document.createElement('div');
  const input = document.createElement('input');
  const results = document.createElement('div');
  const controlWidth = '300px'

  container.style.width = controlWidth;
  input.id = 'nlmaps-geocoder-control-input';
  input.placeholder = 'Zoeken op adres...'
  input.style.padding = '4px 10px';
  input.style.width = '100%';
  input.style.border = 'none';
  input.style.backgroundColor = '#fff';
  input.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
  input.style.height = '26px';
  input.style.borderRadius = '5px 5px';

  input.addEventListener('input', function(e){
    suggest(e.target.value, map);
  });

  input.addEventListener('focus', function(e){
    suggest(e.target.value, map);
  });
  results.id = 'nlmaps-geocoder-control-results';
  results.style.width = controlWidth;

  container.appendChild(searchDiv);
  searchDiv.appendChild(input);
  container.appendChild(results);

  return container;
}

function suggest(query, map) {
  if (query.length < 4) {
    clearSuggestResults();
    return;
  }

  geocoder.suggest(query).then((results) => {
    showSuggestResults(results.response.docs, map);
  });
}

function lookup(id, map) {
  geocoder.lookup(id).then((result) => {
    zoomTo(result.centroide_ll, map);
    showLookupResult(result.weergavenaam);
    clearSuggestResults();
  });
}



function clearSuggestResults() {
  document.getElementById('nlmaps-geocoder-control-results').innerHTML = '';
}

function showLookupResult(name) {
  document.getElementById('nlmaps-geocoder-control-input').value = name;
}

function showSuggestResults(results, map) {
  const resultList = document.createElement('ul');
  resultList.style.padding = '10px 10px 2px 10px';
  resultList.style.width = '100%';
  resultList.style.background = '#FFFFFF';
  resultList.style.borderRadius = '5px 5px';
  resultList.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
  
  results.forEach((result) => {
    const li = document.createElement('li');
    li.innerHTML = result.weergavenaam;
    li.id = result.id;
    li.style.cursor = 'pointer';
    li.style.padding = '5px';
    li.style.listStyleType = 'none';
    li.style.marginBottom = '5px';
    li.addEventListener('click', function(e) {
      lookup(e.target.id, map);
    });

    li.addEventListener('mouseenter', function(e) {
      li.style.background = '#6C62A6';
      li.style.color = '#FFFFFF';
    });

    li.addEventListener('mouseleave', function(e) {
      li.style.background = '#FFFFFF';
      li.style.color = '#333';
    });
    resultList.appendChild(li);
  });
  clearSuggestResults();
  document.getElementById('nlmaps-geocoder-control-results').appendChild(resultList);
}

function zoomTo(point, map) {
  map.setCenter({lat: point.coordinates[1], lng: point.coordinates[0]});
  map.setZoom(18);
}

function indexOfMapControl(controlArray, control){
  return controlArray.getArray().indexOf(control);
}

function toggleAttrControl(attrControl, map) {
  let currentMapId = map.getMapTypeId();
    let controlArray = map.controls[google.maps.ControlPosition.BOTTOM_RIGHT];
    let indexToRemove = indexOfMapControl(controlArray, attrControl);
    if (currentMapId === 'roadmap' ||currentMapId === 'hybrid' ||currentMapId === 'sattelite'  ) {
      if ( indexToRemove > -1) {
        controlArray.removeAt(indexToRemove);
      }
    } else {
      if ( indexToRemove === -1) {
        controlArray.push(attrControl);
      }
    }
}

function makeGoogleAttrControl(map=map, attr){
    let attrControlDiv = document.createElement('div');
    let attrControlText =  attr ;
    let attrControl = new AttributionControl(attrControlDiv, attrControlText);
    map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(attrControl);
    map.addListener('maptypeid_changed', () => toggleAttrControl(attrControl, map));
}

function makeGoogleLayerOpts(provider){
  return {
    getTileUrl: function (coord, zoom) {
      let url = `${provider.bare_url}/${zoom}/${coord.x}/${coord.y}.png`;
      return url;
    },
    tileSize: new google.maps.Size(256, 256),
    isPng: true,
    name: provider.name,
    maxZoom: provider.maxZoom,
    minZoom: provider.minZoom
  }
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

function bgLayer (map, name='standaard') {
  if (typeof google === 'object' && typeof google.maps === 'object') {
    const provider = getProvider(name);
    const GoogleLayerOpts = makeGoogleLayerOpts(provider);
    let layer = new google.maps.ImageMapType(GoogleLayerOpts);
    //warning: tight coupling with nlmaps.createMap
    let ourmap =  map || this.map || 'undefined';
    if (typeof ourmap !== 'undefined') {
      makeGoogleAttrControl(ourmap, provider.attribution)
    }
    return layer;
  } else {
    const error = 'google is not defined';
    throw error;
  }
}

function toMercator(coord) {
    var lat = coord.lat();
    var lng = coord.lng();
    if ((Math.abs(lng) > 180 || Math.abs(lat) > 90))
    return;

    var num = lng * 0.017453292519943295;
    var x = 6378137.0 * num;
    var a = lat * 0.017453292519943295;

    var merc_lon = x;
    var merc_lat = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));

    return { x: merc_lon, y: merc_lat };
}

function WMSTiled(mapObject, wmsTiledOptions) {
    var options = {
        getTileUrl: function(coord, zoom) {
            var proj = mapObject.getProjection();
            var zfactor = Math.pow(2, zoom);

            var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 256 / zfactor, coord.y * 256 / zfactor) );
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
    let layer = new google.maps.ImageMapType(options);
    layer.setOpacity(wmsTiledOptions.opacity);
    return mapObject.overlayMapTypes.push(layer);
}

function overlayLayer(map=map, name) {
  const wmsProvider = getWmsProvider(name);
  const wmsTiledOptions = getWmsTiledOptions(wmsProvider);
  const wmsLayer = new WMSTiled(map, wmsTiledOptions);
  wmsLayer.name = 'wms';

  return wmsLayer;
}

function markerLayer(latLngObject) {  
  let lat;
  let lng;

  if (typeof latLngObject == 'undefined') {
    const mapCenter = getMapCenter(map);
    lat = mapCenter.latitude;
    lng = mapCenter.longitude;
  } else {
    lat = latLngObject.latitude;
    lng = latLngObject.longitude;
  }

  const markerLocationLatLng = new google.maps.LatLng(lat, lng);
  const marker = new google.maps.Marker({
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

// Until the building works properly, this is here. Should be in browser-test.js ///
// var map = new google.maps.Map(document.getElementById('map'), {
//   center: { lat: 52, lng: 5 },
//   zoom: 8
// });

// var ElaMap = bgLayer(map);

// var mapTypeIds = ['Brt Achtergrondkaart', 'roadmap'];
// map.mapTypes.set('Brt Achtergrondkaart', ElaMap);
// map.setOptions({
//   mapTypeControl: true,
//   mapTypeControlOptions: {
//     mapTypeIds: mapTypeIds
//   }
// });
// map.setMapTypeId('Brt Achtergrondkaart');
// const geocoderC = geocoderControl(geocoder, map);
// console.log(geocoderC);

// var wmsLayer = overlayLayer(map, 'gebouwen');
// markerLayer();

// map.controls[google.maps.ControlPosition.TOP_LEFT].push(geocoderC);
export { bgLayer, overlayLayer, markerLayer, getMapCenter, geoLocatorControl, geocoderControl };
