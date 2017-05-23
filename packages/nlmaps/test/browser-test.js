let test = require('tape');


let URL = 'http://tiles.energielabelatlas.nl/v2/osm/{z}/{x}/{y}.png';
let ATTR = 'Kaartgegevens &copy; <a href="cbs.nl">CBS</a>, <a href="kadaster.nl">Kadaster</a>, <a href="openstreetmap.org">OpenStreetMap contributors</a>';


test('nlmaps can populate Leaflet in two-line version', function(t){
  t.assert(typeof L.nlmapsBgLayer === 'function', 'nlmaps has populated property on L');
  t.end()


});
test('nlmaps can populate leaflet in one-line version', function(t){
  t.assert(typeof L === 'object', 'L object created this way');
  t.assert(typeof L.nlmapsBgLayer === 'function', 'nlmaps has populated property on L');
  t.end()

});

test('nlmaps can create a leaflet layer object', function(t) {
  let map = L.map('mapL').setView([52, 5], 10);
  let foo = nlmaps.leaflet.bgLayer();
  foo.addTo(map);
  t.assert(typeof foo === 'object', 'foo layer has been created');
  t.assert(typeof foo.addTo === 'function', 'foo has the addTo method');
  t.assert(map.hasLayer(foo), 'map now has layer foo');
  t.equals(foo._url, URL, 'foos url matches what is expected');
  t.equals(foo.options.attribution, ATTR, 'attribution is correct');
  t.end();
})

test('nlmaps can create a googlemaps layer object and add it to the map', function(t){
    let map = new google.maps.Map(document.getElementById('mapGM'), {
      center: {lat: 52, lng: 5},
      zoom: 8
    });
    let ElaMap = nlmaps.googlemaps.bgLayer();
    function AttributionControl(controlDiv) {
      // Set CSS for the control border.
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
      controlText.innerHTML = ATTR;
      controlUI.appendChild(controlText);
      return controlDiv;
    }

    let mapTypeIds = ['Energielabelatlas', 'roadmap']
    map.mapTypes.set('Energielabelatlas', ElaMap);
    map.setOptions({
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: mapTypeIds
      }

    });
    map.setMapTypeId('Energielabelatlas');
    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    let centerControlDiv = document.createElement('div');
    let centerControl = new AttributionControl(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(centerControl);

    t.pass('ok hahaha');
    t.end();
});

test('nlmaps can create an openlayers layer object and add it to the map', function(t){
  let map = new ol.Map({
    view: new ol.View({
      center: [664197,6838137],
      zoom: 10
    }),
    target: 'mapOL'
  });
  let layer = nlmaps.openlayers.bgLayer();
  map.addLayer(layer);
  t.assert(typeof layer === 'object' && map.getLayers().a[0] === layer, 'layer is first entry in map layers list');
  //t.test('can add the returned layer to an openlayers map')
  t.end();
});

