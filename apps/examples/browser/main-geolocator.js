var map = L.map('map-div').setView([52, 5], 10);
var layer = bgLayer().addTo(map); 

var geo = geoLocator();
geoLocatorControl(geo).addTo(map);
