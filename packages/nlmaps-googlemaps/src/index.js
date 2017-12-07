import { getProvider, getWmsProvider, geolocator_icon } from '../../lib/index.js';

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
            var proj = map.getProjection();
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
    var layer = new google.maps.ImageMapType(options)
    layer.setOpacity(wmsTiledOptions.opacity)
    return mapObject.overlayMapTypes.push(layer);
}

function overlayLayer(map=map, name) {
  const wmsProvider = getWmsProvider(name);
  const wmsTiledOptions = getWmsTiledOptions(wmsProvider);
  var wmsLayer = new WMSTiled(map, wmsTiledOptions)
  return wmsLayer;
}

function markerLayer(lat, lng) {  
  let markerLocationLatLng; 
  if (lat != undefined && lng != undefined) {
    markerLocationLatLng = new google.maps.LatLng(lat, lng);
  } else {
    markerLocationLatLng = new google.maps.LatLng(map.getCenter().lat(), map.getCenter().lng())
  }

  const marker = new google.maps.Marker({
    title: 'Dit is een marker',
    position: markerLocationLatLng
  })
  marker.setMap(map);

}

// / Until the building works properly, this is here. Should be in browser-test.js ///
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

// var wmsLayer = overlayLayer(map, 'gebouwen');
// markerLayer();
export { bgLayer, overlayLayer, geoLocatorControl };
