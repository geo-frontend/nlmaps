NL Maps Geolocator module
=========================

A lightweight wrapper for the browser geolocation API for use with mapping libraries like Leaflet, Openlayers, Google Maps.

You can use this to perform a geolocation request programatically, or you can connect a control for your mapping library to this geolocator.

    npm install nlmaps-geolocator

    import geoLocator from 'nlmaps-geolocator';
    let geolocator = geoLocator();
    geoLocator.start(); //initializes request. Returns geolocation response object with 'coords' property.
    //make your control ...
    let control = myLeafletGeolocatorControl(geolocator);
    control.addTo(map);
    
The `nlmaps` library provides controls for Leaflet, OpenLayers and GoogleMaps, but you are free to implement your own for greater flexibility, according to the following API. The intention is to develop this module as a generic wrapper that can be compatible with a range of different user controls.

API
---

### Creation

    `geoLocator()`: returns a geolocator object.

### Methods

The geolocator object has the following methods:

* `start()`: start a geolocation request.
* `stop()`: currently the geolocator only wraps the `getCurrentPosition()` method of the browser's geolocation API, not the `watchPosition()` method, so the `stop()` method simply sets the internal `started` flag to false. This flag is for future use and can also be queried for styling your control: the status will be started = true while waiting for a position, and then automatically set to false once a position is found. Query it with the following method:
* `isStarted()`: true or false.

If support is added in the future for `watchPosition`, the interface will likely change.

### Events

* `'position'`: data is the `position` object from the geolocation API.
* `'error'`: data is the error, for example if the user denied the geolocation request in the dialog.
