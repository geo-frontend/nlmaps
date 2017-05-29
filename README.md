# NLMAPS

Automatically configure BRT Achtergrond map layers in Leaflet, Google Maps and OpenLayers. https://nlmaps.nl

**Table of Contents**

* [What it's for](#what-its-for)
* [Usage example](#usage-example)
* [Getting set up](#getting-set-up)
* [API Documentation](api-documentation)
* [Advanced Usage](advanced-usage)

## What it's for

the `nlmaps` libary allows you to create layers for Leaflet, Google Maps or OpenLayers pre-configured to use the BRT Achtergrondkaart layers. So you don't need to figure out the tile urls yourself. To make it even easier, it can automatically detect which map library you're using and create a map with your chosen layer already loaded.

## Usage example
    let map = nlmaps.createMap({layer: 'grijs', target: 'mapdiv'});

## Getting set up

### Wizard
The nlmaps website has a [wizard](https://nlmaps.nl/gebruik-nlmaps) that makes it super easy to get started with your choice of map library and map style. It gives you a complete html example that shows you how to include the Javascript and CSS mentioned below.

### Manual browser configuration
You need _one_ of Leaflet, Google Maps, or OpenLayers available in your webpage. `nlmaps` autodetects which one is present, and currently considers it an error if more than one is present. Typically you would include one of the following lines in your html page before you include the `nlmaps` script:

    //for OpenLayers
    <script src="https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.1.1/ol.js"></script>
    
    //for Google Maps, fill in your API key instead of YOUR_API_KEY
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
    
    //for Leaflet
    <script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>
    
Read about getting a Google API key [here](https://developers.google.com/maps/documentation/javascript/get-api-key).

If using Leaflet or OpenLayers, you also need the respective CSS. For Leaflet, you would use `https://unpkg.com/leaflet@1.0.3/dist/leaflet.css` and for OpenLayers, `https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.1.1/ol.css`.

Finally, you will need the `nlmaps` library itself.

    <script src="url_of_nlmaps.min.js"></script>


For further information on using the respective libraries, refer to their documentation:

* [Leaflet](https://leafletjs.com/examples.html)
* [OpenLayers](http://openlayers.org/en/latest/doc/quickstart.html)
* [Google Maps](https://developers.google.com/maps/documentation/javascript/)


### NodeJS

    npm install -S nlmaps
    
    //CommonJS
    let nlmaps = require('nlmaps');
    
    //ES2015+ Modules
    import nlmaps from 'nlmaps';
   
    
## API Documentation

### `nlmaps.createMap(options<object>)`
Creates a map using Leaflet, OpenLayers or Google Maps, with a given BRT Achtergrondkaart layer already added as a background layer. Configured with an options object with the following properties:

* layer: _string_ (optional). one of `'standaard'`, `'pastel'` or `'grijs'`, default `'standaard'`.
* target: _string_ (required). ID of the div in which to create the map.
* position: _object_ (optional). object with zoom, latitude and longitude properties for setting the initial viewpoint.

returns a `map` object.

**Example**

    const opts = {
        layer: 'grijs',
        target: 'mapdiv',
        position: {
            latitude: 5.4534,
            longitude: 52.3112,
            zoom: 15
        }
    };
    let map = nlmaps.createMap(opts);

### `nlmaps.<maplib>.bgLayer([layer<string>])`
Where `<maplib>` is one of `leaflet`, `openlayers` or `googlemaps`, create a layer for the given library configured to fetch tiles for `layer` tilesource, or if `layer` is omitted, for the 'standaard' tilesource.

Arguments:

* layer: _string_ (optional). Name of tilesource to load. One of `'standaard'`, `'pastel'` or `'grijs'`; defaults to `'standaard'`.

Returns a `layer` object.

**Example**

    const layer = nlmaps.openlayers.bgLayer();;
    layer.addTo(map);

 * 'standaard': the standard BRT Achtergrondkaart in full colour. This is the default; you can also leave 'layer' empty.
 * 'pastel': in pastel tints
 * 'grijs': in very low saturation.


## Advanced usage
If you're already using a mapping library in your project, you can use the library-specific `bgLayer()` function to create a layer object which you can add to your existing map. All you'll need to do first is create a map and set the view. the `createMap()` function is just a wrapper which does this with some default settings.

### Leaflet

    let map = L.map('map').setView([52.20936, 5.970745], 10);
    let mylayer = nlmaps.leaflet.bgLayer('grijs').addTo(map);

### OpenLayers

    let map = new ol.Map({
      view: new ol.View({
        center: ol.proj.fromLonLat([5.97075, 52.20936]),
        zoom: 10
      }),
      target: 'map'
    });
    let layer = nlmaps.openlayers.bgLayer(); //calling bgLayer with no argument defaults to the 'standaard' layer
    map.addLayer(layer);

### Google Maps
Google Maps requires a bit more code, since we have to add our layer to the `mapTypes` list manually. 

    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 52.20936, lng: 5.970745},
      zoom: 8
    });
    
    let mylayer = nlmaps.openlayers.bgLayer('pastel');
    
    //add your map to the available layers
    map.mapTypes.set(mylayer.name, mylayer);
    //set it as active layer
    map.setMapTypeId(mylayer.name);
    
To comply with Google's [terms of service](https://developers.google.com/maps/terms?hl=en#10-license-restrictions) we will also add a layer switcher control so the standard map is available.

    //add control for switching between layers
    let mapTypeIds = [mylayer.name, 'roadmap']
    map.setOptions({
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: mapTypeIds
      }

    });

**Attribution:** Leaflet and OpenLayers both automatically create an attribution control if you supply an `attribution` option to the layer (which `nlmaps` does.) With Google we have to create it ourselves; see [here]() for an example.


### Include only your library-specific `bgLayer` function

If you want to save as many bytes as possible, you can also include the sub-module for your map library instead of the whole `nlmaps` package. Each of these modules provides a `bgLayer()` function which will return a layer for the corresponding map library.

**Web browser:**

download the appropriate `nlmaps-<maplib>.min.js` from [here](https://gitlab.com/wm2017/nlmaps/blob/master/dist/nlmaps-leaflet.iife.js) (select the appropriate file and click on the 'download raw' button from the top right section above the file).

**NodeJS:**

    npm install --save nlmaps-leaflet
    
    //CommonJS
    let bgLayer = require('nlmaps-leaflet').bgLayer; //note the use of property off of require
    
    //ES2015
    import { bgLayer } from 'nlmaps-leaflet';

this `bgLayer()` function can subsequently be used in the same way as `nlmaps.maplib.bgLayer()` from the parent package. Note that of course you will have to have the corresponding map library available.

### Use in NodeJS / when transpiling for browser
The [leaflet-headless](https://www.npmjs.com/package/leaflet-headless) and [google-maps](https://www.npmjs.com/package/google-maps) NPM packages can be used in nodejs. Alternatively (and for OpenLayers) you can include the library via a `<script>` tag so that when you transpile your code to the browser it will find the global `L`, `google.maps` or `ol` objects.

