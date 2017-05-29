# NLMAPS

Automatically configure BRT Achtergrond map layers in Leaflet, Google Maps and OpenLayers.

## What it's for

the `nlmaps` libary allows you to create layers for Leaflet, Google Maps or OpenLayers pre-configured to use the BRT Achtergrondkaart layers. So you don't need to figure out the tile urls yourself.

## Quick start

### Getting nlmaps

**Web browser:**

include the nlmaps script in your web page. You can download it [here].

**NodeJS:**

    npm install --save nlmaps
    
    #CommonJS
    const nlmaps = require('nlmaps')

    #ES2015 module
    import nlmaps from 'nlmaps';


### just give me a map

If you have no clue how web maps work, or you just want to get it working as simply as possible, take the top-level 'nlmaps' package.

`<script>`-tag:

Download nlmaps.min.js from dist/ and include it in your page.

Also include your map library of choice in the page, _before_ nlmaps. Nlmaps will then auto-configure to use the included library.

Create a `div` on the page and give it an id, say 'map'.

Now you can:

    let map = nlmaps.createMap({type: 'leaflet', layer: 'standaard', target: 'map'});

and you have a map!

The available layers are:

 * 'standaard': the standard BRT Achtergrondkaart in full colour. This is the default; you can also leave 'layer' empty.
 * 'pastel': in pastel tints
 * 'grijs': in very low saturation.

### I want a bit more control, thank you

If you're already using a mapping library in your project, you can also just use a library-specific layer creation function. Here's a Leaflet example:

    let map = L.map('map').setView([52, 5], 10);
    let mylayer = nlmaps.leaflet.bgLayer('grijs').addTo(map);

And OpenLayers:

    let map = new ol.Map({
      view: new ol.View({
        center: [664197,6838137],
        zoom: 10
      }),
      target: 'map'
    });
    let layer = nlmaps.openlayers.bgLayer(); //calling bgLayer with no argument defaults to the 'standaard' layer
    map.addLayer(layer);

Google Maps requires a bit more code, since we have to add our layer to the `mapTypes` list manually. To comply with Google's [terms of service]() we will also add a layer switcher control so the standard map is available.

    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 52, lng: 5},
      zoom: 8
    });
    
    let mylayer = nlmaps.openlayers.bgLayer('pastel');
    
    //control for switching between layers
    let maptypeids = ['BRT Achtergrondkaart pastel', 'roadmap']
    map.setoptions({
      maptypecontrol: true,
      maptypecontroloptions: {
        maptypeids: maptypeids
      }

    });
    //add your map to the available layers
    map.maptypes.set('BRT Achtergrondkaart pastel', mylayer);
    //set it as active layer
    map.setmaptypeid('BRT Achtergrondkaart pastel');

**Attribution:** Leaflet and OpenLayers both automatically create an attribution control if you supply an `attribution` option to the layer (which `nlmaps` does.) With Google we have to create it ourselves; see [here]() for an example.


## Advanced usage notes

If you want to save as many bytes as possible, you can also include the sub-module for your map library instead of the whole `nlmaps` package. Each of these modules provides a `bgLayer()` function which will return a layer for the corresponding map library.

**Web browser:**

    download the appropriate `nlmaps-<maplib>.min.js` from [here].

**NodeJS:**

    npm install --save nlmaps-leaflet
    
    //CommonJS
    let bgLayer = require('nlmaps-leaflet').bgLayer; //note the use of property off of require
    
    //ES2015
    import { bgLayer } from 'nlmaps-leaflet';

this `bgLayer()` function can subsequently be used in the same way as `nlmaps.maplib.bgLayer()` from the parent package. Note that of course you will have to have the corresponding map library available.

### Use in NodeJS / when transpiling for browser
The [leaflet-headless](https://www.npmjs.com/package/leaflet-headless) and [google-maps](https://www.npmjs.com/package/google-maps) NPM packages can be used in nodejs. Alternatively (and for OpenLayers) you can include the library via a `<script>` tag so that when you transpile your code to the browser it will find the global `L`, `google.maps` or `ol` objects.

## API

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
