var leaflet = require('leaflet');
var bgLayer = require('nlmaps-leaflet').bgLayer;
var geoLocatorControl = require('nlmaps-leaflet').geoLocatorControl;
var geoLocator = require('nlmaps-geolocator');

var map = L.map('map-div').setView([52, 5], 10);
var layer = bgLayer().addTo(map); 

var geo = geoLocator();
geoLocatorControl(geo).addTo(map);

