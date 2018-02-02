var googleMapsLoader = require('google-maps');

googleMapsLoader.KEY='AIzaSyAYCu4ZY9tssUK4luavRsNyTirXdEnC3qw' //substitute with your Google Maps key, see https://developers.google.com/maps/documentation/javascript/get-api-key

googleMapsLoader.load(function(google) {
    var nlmaps = require('nlmaps');
    nlmaps.createMap({target: 'map-div'})
})

