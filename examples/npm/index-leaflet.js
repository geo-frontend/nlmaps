var leaflet = require('leaflet');
var bgLayer = require('nlmaps-leaflet').bgLayer;

var map = L.map('map-div').setView([52, 5], 10);
var layer = bgLayer().addTo(map); 
