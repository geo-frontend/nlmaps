//import {bgLayer, geoLocatorControl} from '../../nlmaps-leaflet/build/nlmaps-leaflet.es.js';

//let map = L.map('mapdiv').setView([52, 5], 10);
//let layers = {
  //standaard: bgLayer(), 
//};
//layers.standaard.addTo(map);
//layers.pastel = bgLayer('pastel');
//layers.grijs = bgLayer('grijs');
//L.control.layers(layers).addTo(map);
//let geo = geolocator();
//geoLocatorControl(geo).addTo(map);

let    map = new google.maps.Map(document.getElementById('mapdiv'), {
      center: {lat: 52, lng: 5},
      zoom: 8
    });
    let ElaMap = bgLayer.bgLayer();




