import { getProvider, geolocator_icon } from '../../lib';
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




function geoLocatorControl(geolocator, map){
  let myControlEl = document.createElement('div');
  myControlEl.style.backgroundColor = '#fff';
  myControlEl.style.cursor = 'pointer';
  myControlEl.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
  myControlEl.style.height = '26px';
  myControlEl.style.width = '26px';
  myControlEl.style.borderRadius = '26px 26px';
  myControlEl.innerHTML = geolocator_icon;
  myControlEl.className = 'ol-control';
  myControlEl.style.bottom = '.5em';

  myControlEl.addEventListener('click',function(e){
    geolocator.start();
  })
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

export { bgLayer, geoLocatorControl };
