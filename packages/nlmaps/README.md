# NLMAPS

Easily create web maps pre-loaded with the BRT Achtergrondkaart. Works with Leaflet, Google Maps, and OpenLayers.

## How to use

You will need one of Leaflet, Google Maps or OpenLayers in your web page. Then download the nlmaps browser bundle from [download location] or `npm install -S nlmaps`. Now you can create a map:

    let map = nlmaps.createMap({style: 'grijs', target: 'mapdiv'});

or if you already have a map, you can use the library-specific function to create a layer which you can add to your map:

    let layer = nlmaps.leaflet.bgLayer(style: 'pastel');
    layer.addTo(map);


##  Documentation

See the top-level readme https://github.com/nlmaps/nlmaps for full documentation.
