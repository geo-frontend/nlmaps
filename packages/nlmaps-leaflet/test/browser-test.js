let test = require('tape');
let geoLocator = require('../../nlmaps-geolocator');


//remove a div and re-add one with the same name at the same location.
//helper to reset DOM for new tests.
function resetMapDiv(id) {
  const elem = document.getElementById(id);
  let par = elem.parentNode;
  par.removeChild(elem);
  let div = document.createElement('div');
  div.setAttribute('id', id);
  par.appendChild(div);
}

let URL = 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart/EPSG:3857/{z}/{x}/{y}.png';
let ATTR = 'Kaartgegevens &copy; <a href="kadaster.nl">Kadaster</a>';

test('including nlmaps-leaflet creates a bgLayer function', function(t){
  t.assert(typeof bgLayer === 'function', 'bgLayer is a function');
  t.end()

});


test('nlmaps can create a layer object', function(t) {
  let map = L.map('map').setView([52, 5], 10);
  let layers = {
    standaard: bgLayer(), 
  };
  t.assert(typeof layers.standaard === 'object', 'standaard layer has been created -- with NO user-passed layername argument');
  t.assert(typeof layers.standaard.addTo === 'function', 'standaard has the addTo method');
  layers.standaard.addTo(map);
  t.assert(map.hasLayer(layers.standaard), 'map now has layer standaard');
  t.equals(layers.standaard._url, URL, 'standaard url matches what is expected');
  t.equals(layers.standaard.options.attribution, ATTR, 'attribution is correct');

  layers.pastel = bgLayer('pastel');
  layers.grijs = bgLayer('grijs');
  L.control.layers(layers).addTo(map)
  t.end();
})

test('geolocator', function(t) {
  resetMapDiv('map');
  let map = L.map('map').setView([52, 5], 10);
  let layer = bgLayer('pastel');
  layer.addTo(map);
  const geolocator = geoLocator();
  const control = geoLocatorControl(geolocator);
  control.addTo(map);
})

