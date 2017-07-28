import geoLocator from '../../nlmaps-geolocator/build/nlmaps-geolocator.es.js';
export default function browserTest(){
  let map = new ol.Map({
    view: new ol.View({
      center: [664197,6838137],
      zoom: 10
    }),
    target: 'map'
  });
  let layer = bgLayer.bgLayer();
  map.addLayer(layer);
  let geolocator = geoLocator();
  let control = bgLayer.geoLocatorControl(geolocator, map)
  map.addControl(control)
  console.log(control)

}
