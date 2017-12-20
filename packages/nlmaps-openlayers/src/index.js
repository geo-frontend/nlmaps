import { getProvider, getWmsProvider, geolocator_icon, geocoder, markerUrl } from '../../lib';

let baseTileUrl = 'http://tiles.energielabelatlas.nl/v2/osm';
const BRTAkAttr = 'Kaartgegevens &copy; <a href="cbs.nl">CBS</a>, <a href="kadaster.nl">Kadaster</a>, <a href="openstreetmap.org">OpenStreetMap contributors</a>';

function bgLayer(name='standaard') {
  const provider = getProvider(name);
  if (typeof ol === "object") {
    return new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: provider.url,
        attributions: [
          new ol.Attribution({
            html: provider.attribution
          })
        ]
      })
    })

  } else {
    throw 'openlayers is not defined';
  }
}
function markerLayer(latLngObject) {
  let markerStyle = new ol.style.Style({
    image: new ol.style.Icon(
      ({
        anchor: [32, 63],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        src: markerUrl,
        scale: 1
      })
    )
  });
  let lat;
  let lng;

  if (typeof latLngObject == 'undefined') {
    const mapCenter = getMapCenter(map);
    lat = mapCenter.latitude;
    lng = mapCenter.longitude
  } else {
    lat = latLngObject.latitude;
    lng = latLngObject.longitude;
  }

  const center = ol.proj.fromLonLat([lng, lat]);

  var markerFeature = new ol.Feature({
    geometry: new ol.geom.Point(center),
    name: 'marker'
  });

  markerFeature.setStyle(markerStyle);

  var markerSource = new ol.source.Vector({
    features: [markerFeature]
  });
  return new ol.layer.Vector({
    source: markerSource
  });
}

function overlayLayer(name) {
  const wmsProvider = getWmsProvider(name);
  if (typeof ol === "object") {
    return new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: wmsProvider.url,
        serverType: 'geoserver',
        params: {
          LAYERS: wmsProvider.layers,
          VERSION: wmsProvider.version,
          STYLES: wmsProvider.styles,
          TILED: true
        }
      })
    })

  } else {
    throw 'openlayers is not defined';
  }
}


function geoLocatorControl(geolocator, map){
  let myControlEl = document.createElement('div');
  myControlEl.id = 'nlmaps-geolocator-control';
  myControlEl.style.backgroundColor = '#fff';
  myControlEl.style.cursor = 'pointer';
  myControlEl.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
  myControlEl.style.height = '26px';
  myControlEl.style.width = '26px';
  myControlEl.style.borderRadius = '26px 26px';
  myControlEl.innerHTML = geolocator_icon;
  myControlEl.className = 'ol-control';
  myControlEl.style.right = '.5em';
  myControlEl.style.top = '.5em';

  myControlEl.addEventListener('click',function(e){
    geolocator.start();
  });

  function moveMap(d, map=map){
    let oldZoom = map.getView().getZoom();
    let view = new ol.View({
      center: ol.proj.fromLonLat([d.coords.longitude,d.coords.latitude]),
      zoom: oldZoom
    });
    map.setView(view);
  }
  geolocator.on('position', function(d) { moveMap(d, map)});
  let control = new ol.control.Control({element: myControlEl});
  return control;
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

function clearSuggestResults() {
  document.getElementById('nlmaps-geocoder-control-results').innerHTML = '';
}

function geocoderControl(geocoder, map) {
  const container = document.createElement('div');
  const searchDiv = document.createElement('div');
  const input = document.createElement('input');
  const results = document.createElement('div');
  const controlWidth = '300px'
  container.style.left = '.5em';
  container.style.top = '4.5em';
  container.style.width = controlWidth;
  container.className = 'ol-control';
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

  const control = new ol.control.Control({element: container});
  return control;
}

function zoomTo(point, map) {
  const newCenter = ol.proj.fromLonLat(point.coordinates);
  map.getView().setCenter(newCenter);
  map.getView().setZoom(18);
}

function getMapCenter(map) {
  const EPSG3857Coords = map.getView().getCenter();
  const lngLatCoords = ol.proj.toLonLat(EPSG3857Coords);
  return {
    longitude: lngLatCoords[0],
    latitude: lngLatCoords[1]
  };
}
/// Until the building works properly, this is here. Should be in browser-test.js ///
// let map = new ol.Map({
//   view: new ol.View({
//     center: [664197,6838137],
//     zoom: 10
//   }),
//   target: 'map'
// });

// let layer = bgLayer();
// map.addLayer(layer);
// let overlay = overlayLayer('gebouwen')
// map.addLayer(overlay);
// let marker = markerLayer();
// map.addLayer(marker);

// const geocoderC = geocoderControl(geocoder);
// map.addControl(geocoderC);

export { bgLayer, overlayLayer, markerLayer, getMapCenter, geoLocatorControl, geocoderControl };
