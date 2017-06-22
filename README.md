# NL Maps

Automatically configure BRT-Achtergrond map layers in [Leaflet](http://leafletjs.com/), [Google Maps](https://developers.google.com/maps/documentation/javascript/), [Mapbox](https://www.mapbox.com/mapbox.js/), or [OpenLayers](http://openlayers.org/).

**Table of Contents**

* [What it's for](#what-its-for)
* [Usage example](#usage-example)
* [Getting set up](#getting-set-up)
* [API documentation](#api-documentation)
* [Advanced usage](#advanced-usage)
* [Raw tile URLs](#raw-tile-urls)
* [Developing](#developing)

## What it's for

The `nlmaps` JavaScript libary allows you to create layers for Leaflet, Google Maps, Mapbox, or OpenLayers pre-configured to use the BRT Achtergrondkaart layers. You don't need to figure out the tile URLs yourself. To make it even easier, it automatically detect which map library you're using and creates a map pre-loaded with one of the BRT Achtergrondkaart layers.

## Usage example

    let map = nlmaps.createMap({style: 'grijs', target: 'nlmaps-holder'});

Available map styles:

* `standaard`: the default BRT-Achtergrondkaart in color
* `pastel`: in pastel tints
* `grijs`: in very low saturation
* `luchtfoto`: aerial imagery

## Getting set up

### Wizard

The [NL Maps wizard](https://nlmaps.nl/#wizard) makes it super easy to get started with your choice of map library and map style. It gives you a code example that shows you how to include the HTML and JavaScript code to get a working map. It is recommended that you refer to the wizard output even if you are doing things manually.

### Manual browser configuration

You need _one_ of Leaflet, Google Maps, Mapbox, or OpenLayers available in your web page. `nlmaps` autodetects which one is present (and currently considers it an error if more than one is present). For further information on using the respective libraries, refer to their documentation:

* [Leaflet](http://leafletjs.com/examples.html)
* [Google Maps](https://developers.google.com/maps/documentation/javascript/)
* [Mapbox](https://www.mapbox.com/mapbox.js/api/v3.1.1/)
* [OpenLayers](http://openlayers.org/en/latest/doc/quickstart.html)

Finally, you will need the `nlmaps` library itself, which you can download from the [latest release on Github](https://github.com/kadaster/nlmaps/releases/latest). Download and extract the source code and select the file `dist/nlmaps.iife.js` Include it on your web page like this:

    <script src="url_of_nlmaps.iife.js"></script>

### NodeJS
`nlmaps` has been developed against NodeJS version 6.x.

    npm install -S nlmaps
    
    //CommonJS
    let nlmaps = require('nlmaps');
    
    //ES2015 Modules
    import nlmaps from 'nlmaps';

Leaflet, Google Maps, Mapbox, or OpenLayers will also need to be available in your final web browser scope. One way you can do this is to install a package that wraps your map library for Node; in that case `npm install -S` it (for example, [leaflet-headless](https://www.npmjs.com/package/leaflet-headless), [google-maps](https://www.npmjs.com/package/google-maps) or [openlayers](https://www.npmjs.com/package/openlayers)). You can also include it as a script in the html file that loads your final app output.

**Note on using Mapbox:** if you are using the Mapbox library, follow the instructions here for Leaflet. Since Mapbox includes the Leaflet library it will work the same.

## API documentation

### `nlmaps.createMap(options<object>)`

Creates a map using Leaflet, Google Maps, Mapbox, or OpenLayers with a given BRT-Achtergrondkaart layer already added as a background layer. Configured with an options object with the following properties:

* style: _string_ (optional). one of `'standaard'`, `'pastel'`, '`grijs'` or `'luchtfoto'`, default `'standaard'`.
* target: _string_ (required). id of the `div` in which to create the map.
* center: _object_ (optional). object with latitude and longitude properties for setting the initial viewpoint. Defaults to a position near the centre of the Netherlands.
* zoom: _number_ (optional). Zoom level at which to initialize the viewpoint. Defaults to `8`.

returns a `map` object.

**Example**

    const opts = {
      style: 'grijs',
      target: 'nlmaps-holder',
      center: {
        longitude: 5.4534,
        latitude: 52.3112
      },
      zoom: 15
    };
    let map = nlmaps.createMap(opts);

### `nlmaps.<maplib>.bgLayer([style<string>])`

Where `<maplib>` is one of `leaflet`, `openlayers` or `googlemaps`, create a layer for the given library configured to fetch tiles for `style` tile source, or if `style` is omitted, for the 'standaard' tilesource. In order to use the `nlmaps` library in conjunction with Mapbox, select `leaflet`.

Arguments:

* style: _string_ (optional). Name of tilesource to load. One of `'standaard'`, `'pastel'`,`'grijs'` or '`luchtfoto`'; default `'standaard'`.

Returns a `layer` object.

**Example**

    const layer = nlmaps.openlayers.bgLayer();
    layer.addTo(map);


## Advanced usage

If you're already using a mapping library in your project, you can use the library-specific `bgLayer()` function to create a layer object which you can add to your existing map. All you'll need to do first is create a map and set the view. This is what the `createMap()` function does under the hood, with some default values.

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
    let layer = nlmaps.openlayers.bgLayer(); //calling bgLayer with no argument defaults to the 'standaard' style
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
    
To comply with Google Maps JavaScript API [Terms of Service](https://developers.google.com/maps/terms?hl=en#10-license-restrictions) we will also add a layer switcher control so the standard map is available.

    //add control for switching between layers
    let mapTypeIds = [mylayer.name, 'roadmap']
    map.setOptions({
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: mapTypeIds
      }
    });

**Attribution:** Leaflet, Mapbox, and OpenLayers automatically create an attribution control if you supply an `attribution` option to the layer (which `nlmaps` does). With Google Maps we have to create it ourselves; see the [examples](examples/googlemaps-attribution.js) folder for some inspiration.

### Include only your library-specific `bgLayer` function

If you want to save as many bytes as possible, simply include the sub-module for your map library instead of the whole `nlmaps` package. Each of these modules provides a `bgLayer()` function which will return a layer for the corresponding map library.

**Web browser:**

Download the appropriate `nlmaps-<maplib>.min.js` [release](https://github.com/kadaster/nlmaps/releases/latest) Download and extract the source code and select the appropriate file from the `dist` directory. Upon including the script in your web page, you will have a `bgLayer()` function available which works with the respective map library. In order to use the `nlmaps` library in conjunction with Mapbox, select `leaflet`.

**NodeJS:**

    npm install --save nlmaps-leaflet
    
    //CommonJS
    let bgLayer = require('nlmaps-leaflet').bgLayer; //note the use of property off of require
    
    //ES2015
    import { bgLayer } from 'nlmaps-leaflet';

this `bgLayer()` function can subsequently be used in the same way as `nlmaps.maplib.bgLayer()` from the parent package.

### Removing or further manipulating the map or layer

If you want to remove your map object or layer, you can just use the standard method provided by your library. The objects returned from `createMap()` and `bgLayer()` are just standard `map` and `layer` objects for the appropriate libraries. For example, Leaflet has a `map.remove()` function which destroys the map and clears all event listeners.

## Raw tile URLs

The tile URLs which `nlmaps` configures for you follow these templates:

For BRT-Achtergrondkaart series:

    https://geodata.nationaalgeoregister.nl/tiles/service/wmts/{stylename}/EPSG:3857/{z}/{x}/{y}.png

For aerial imagery:

    https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/1.0.0/2016_ortho25/EPSG:3857/{z}/{x}/{y}.png

## Developing

[Lerna](https://lernajs.io/) is used for optimising the workflow around managing multi-package JavaScript projects with git and npm. Because of some seeming subtleties of Rollup's interaction with Lerna or NPM, there is a different build script. Use the following procedure to publish the packages:

1. `node build-all.js` can't use npm run or lerna run because rollup can't handle non-externalized dependencies when lerna is symlinking them.
2. `lerna exec npm -- install` If you need to update dependencies
3. git `add` and `commit`
4. `lerna publish`   choose version numbers for each changed package

Then go to the release page and annotate the latest release for the 'nlmaps' package.
