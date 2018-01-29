# NL Maps

**Table of Contents**

* [Purpose](#purpose)
* [Usage example](#usage-example)
* [Getting set up](#getting-set-up)
* [API documentation](#api-documentation)
* [Advanced usage](#advanced-usage)
* [Raw tile URLs](#raw-tile-urls)
* [Developing](#developing)

## Purpose

The `nlmaps` JavaScript library allows you to create layers for Leaflet, Google Maps, Mapbox, or OpenLayers pre-configured to use the BRT-Achtergrondkaart layers. You don't need to figure out the tile URLs yourself. To make it even easier, it automatically detects the map library you're using and creates a map pre-loaded with one of the BRT-Achtergrondkaart layers.

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

* [Google Maps](https://developers.google.com/maps/documentation/javascript/)
* [Leaflet](http://leafletjs.com/examples.html)
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

Leaflet, Google Maps, Mapbox, or OpenLayers will also need to be available in your final web browser scope. One way you can do this is to install a package that wraps your map library for Node; in that case `npm install -S` it (for example, [leaflet](https://www.npmjs.com/package/leaflet), [google-maps](https://www.npmjs.com/package/google-maps) or [openlayers](https://www.npmjs.com/package/openlayers)). You can also include it as a script in the HTML-file that loads your final app output.

**Note on using Mapbox:** if you are using the Mapbox library, follow the instructions for Leaflet. Since Mapbox includes the Leaflet library it will work the same.

## API documentation

### `nlmaps.createMap(options<object>)`

Creates a map using Leaflet, Google Maps, Mapbox, or OpenLayers with a given BRT-Achtergrondkaart layer already added as a background layer. Configured with an `options` object with the following properties:

* target: _string_ (**required**). This is the id of the `div` in which to create the map.
* center: _object_ (optional). This object contains latitude and longitude properties for setting the initial viewpoint. Defaults to a position near the centre of the Netherlands.
* zoom: _number_ (optional). This is the zoom level at which to initialize the viewpoint. Defaults to `8`.
* style: _string_ (optional). This sets the base map style. One of `'standaard'`, `'pastel'`, '`grijs'` or `'luchtfoto'`, default `'standaard'`.
* marker: _boolean_ or _object_ (optional). Use one of `'true'` or `'false'` for setting whether or not to show a marker at the location specified by `center`. Defaults to `'false'`. To explicitly set the position of the marker, pass the marker an _object_ with latitude and longitude properties.
* overlay: _string_ (optional). This specifies a map overlay on top of the BRT-Achtergrondkaart or aerial imagery. One of `'drone-no-fly-zones'`, `'gebouwen'`, `'gemeenten'`, `'hoogte'`, `'percelen'` or `'provincies'`.
* search: _boolean_ (optional). Use one of `'true'` or `'false'` for setting whether or not to show the search box for places and addresses. Defaults to `'false'`.

Returns a `map` object.

**Example**

    const opts = {
      style: 'grijs',
      target: 'nlmaps-holder',
      center: {
        longitude: 5.4534,
        latitude: 52.3112
      },
      zoom: 15,
      marker: true,
      overlay: 'hoogte',
      search: true
    };
    let map = nlmaps.createMap(opts);
   
### `nlmaps.geoLocate(map<map object>, options<object>)`

Creates a geolocator control and adds it to the map. Clicking on the control will initiate a browser geolocation API request and center the map on the result. The geolocator can also be initialized to perform a geolocation request immediately, without waiting for the user to click on the control.

* map: _object map_ (**required**). the `map` that the geolocator control should be added to.
* options _object_ (optional). An object with one allowed property, `start: true|false`. If set to `true`, the geolocator is initialized on page load.

Returns a `geolocator` object. See the [nlmaps-geolocator](https://www.npmjs.com/package/nlmaps-geolocator) package for more information.

**Example**

    const map = nlmaps.createMap();
    const geolocator = nlmaps.geoLocate(map, {start: true})

### `nlmaps.<leaflet|openlayers>.bgLayer([style<string>]) | nlmaps.googlemaps.bgLayer(map, [style])`

Creates a layer for the given library configured to fetch tiles for `style` tile source, or if `style` is omitted, for the 'standaard' tilesource. In order to use the `nlmaps` library in conjunction with Mapbox, select `nlmaps.leaflet`.

**NOTE:** for Google Maps, you also need to pass the `map` object as the first argument (so if you pass a `style`, also pass `map` first).

Arguments:

* map: _map.object_ (only for Google Maps). The `map` to which the layer will be added.
* style: _string_ (optional). Name of tile source to load. One of `'standaard'`, `'pastel'`,`'grijs'` or '`luchtfoto`'; default `'standaard'`.

Returns a `layer` object.

**Example (OpenLayers)**

    const layer = nlmaps.openlayers.bgLayer();
    layer.addLayer(map);

### `nlmaps.<googlemaps|leaflet|openlayers>.markerLayer([coords<object>])`

Creates a layer for the given library configured to position a marker at the location `coords`. In order to use the `nlmaps` library in conjunction with Mapbox, select `nlmaps.leaflet`.

Arguments:

* coords: _object_ (**required**). This object contains `latitude` and `longitude` properties for setting the location of the marker.

Returns a `layer` object.

**Example (Leaflet)**

    const marker = nlmaps.leaflet.markerLayer({
      longitude: 5.4534,
      latitude: 52.3112
    });
    marker.addTo(map);

### `nlmaps.<leaflet|openlayers>.overlayLayer([overlay<string>]) | nlmaps.googlemaps.overlayLayer(map, [overlay])`

Creates a layer for the given library configured to fetch tiles for one of the pre-defined `overlay` map sources. In order to use the `nlmaps` library in conjunction with Mapbox, select `nlmaps.leaflet`.

**NOTE:** for Google Maps, you also need to pass the `map` object as the first argument (so if you pass an `overlay`, also pass `map` first).

Arguments:

* map: _map.object_ (only for Google Maps). The `map` to which the layer will be added.
* overlay: _string_ (**required**). Name of map source to load. One of `'drone-no-fly-zones'`, `'gebouwen'`, `'gemeenten'`, `'hoogte'`, `'percelen'` or '`provincies`'.

Returns a `layer` object.

**Example (Google Maps)**

    const overlay = nlmaps.googlemaps.overlayLayer(map, 'drone-no-fly-zones');

### `nlmaps.<leaflet|openlayers>.overlayLayer([overlay<string>],[endpoint<object>]) | nlmaps.googlemaps.overlayLayer(map, [overlay], [endpoint])`

Creates a layer for the given library configured to fetch tiles for a custom `overlay` **W**eb **M**apping **S**ervice (WMS). The service must follow the [OGC WMS specification](http://www.opengeospatial.org/standards/wms) and support the Spherical Mercator (EPSG:3857) projection. In order to use the `nlmaps` library in conjunction with Mapbox, select `nlmaps.leaflet`.

**NOTE:** for Google Maps, you also need to pass the `map` object as the first argument (so if you pass an `overlay`, also pass `map` first).

Arguments:

* map: _map.object_ (only for Google Maps). The `map` to which the layer will be added.
* overlay: _string_ (**required**). Name of the custom layer.
* endpoint: _object_ (**required**). This object contains `url`, `layerName`, and `styleName` parameters for specifying the **W**eb **M**apping **S**ervice (WMS).

Returns a `layer` object.

**Example (OpenLayers)**

    const endpoint = {
      url: 'https://geodata.nationaalgeoregister.nl/fysischgeografischeregios/ows?',
      layerName: 'fysischgeografischeregios',
      styleName: 'fysischgeografischeregios:fysischgeografischeregios'
    };
    const overlay = nlmaps.openlayers.overlayLayer('fysisch-geografische-regios', endpoint);
    map.addLayer(overlay);

### `nlmaps.<leaflet|openlayers>.geoLocatorControl(geolocator) | nlmaps.googlemaps.geoLocatorControl(geolocator, map)`

Creates a control for the given library which talks to the given `geolocator`. The control has a very simple interface: click to initiate a geolocation request and have the map be centered on the resulting location. You need to add the control to the map yourself. Arguments:

Arguments:

* geolocator _object geolocator_ (**required**). The `geolocator` to which the control should be connected. If you are using this method, you will probably be creating the geolocator yourself with the [nlmaps-geolocator](https://www.npmjs.com/package/nlmaps-geolocator) package.
* map _object map_ (only for Google Maps). The map with which the control should be associated.

Returns a `geolocator` control.

**Example (Leaflet)**

    import geoLocator from 'nlmaps-geolocator';
    import geoLocatorControl from 'nlmaps-leaflet';
    const geolocator = geoLocator();
    const control = geoLocatorControl(geolocator);
    control.addTo(map);

## Advanced usage

If you're already using a mapping library in your project, you can use the library-specific `bgLayer()`, `overlayLayer()`, and `markerLayer()` functions. All you'll need to do first is create a map and set the view. This is what the `createMap()` function does under the hood, with some default values.

### Leaflet

    let map = L.map('map').setView( new L.LatLng(52.20936, 5.970745), 10);
    let mylayer = nlmaps.leaflet.bgLayer('grijs').addTo(map);
    let marker = nlmaps.leaflet.markerLayer({longitude: 5.5, latitude: 52.5}).addTo(map);

### OpenLayers

    let map = new ol.Map({
      view: new ol.View({
        center: ol.proj.fromLonLat([5.97075, 52.20936]),
        zoom: 10
      }),
      target: 'map'
    });
    let layer = nlmaps.openlayers.bgLayer();
    map.addLayer(layer);
    let marker = nlmaps.openlayers.markerLayer(true)
    map.addLayer(marker);

### Google Maps

Google Maps requires a bit more code, since we have to add our layer to the `mapTypes` list manually. 

    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 52.20936, lng: 5.970745},
      zoom: 8
    });
    
    let mylayer = nlmaps.googlemaps.bgLayer(map, 'pastel');
    
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

    let overlay = nlmaps.googlemaps.overlayLayer(map, 'drone-no-fly-zones');

    let marker = nlmaps.googlemaps.markerLayer({longitude: 5.0, latitude: 52.5});
    marker.setMap(map);

### Include only your library-specific functions

If you want to save as many bytes as possible, simply include the sub-module for your map library instead of the whole `nlmaps` package. Each of these modules provides a `bgLayer()` function which will return a layer for the corresponding map library, a markerLayer() function which will return a marker on the map, and a `geoLocatorControl()` function which returns a control for the geolocator.

**Web browser:**

Download the appropriate `nlmaps-<maplib>.min.js` [release](https://github.com/kadaster/nlmaps/releases/latest) Download and extract the source code and select the appropriate file from the `dist` directory. Upon including the script in your web page, you will have a `bgLayer()` function available which works with the respective map library. In order to use the `nlmaps` library in conjunction with Mapbox, select `leaflet`.

**NodeJS:**

    npm install --save nlmaps-leaflet
    
    //CommonJS
    let bgLayer = require('nlmaps-leaflet').bgLayer; //note the use of property off of require
    let marker = require('nlmaps-leaflet').markerLayer;
    
    //ES2015
    import { bgLayer, markerLayer } from 'nlmaps-leaflet';

These functions can subsequently be used in the same way as the functions from the parent package.

### Removing or further manipulating the map or layer

If you want to remove your map object or layer, you can just use the standard method provided by your library. The objects returned from `createMap()`, `bgLayer()`, `markerLayer()`, and `overlayLayer()` are just standard `map` and `layer` objects for the appropriate libraries. For example, Leaflet has a `map.remove()` function which destroys the map and clears all event listeners.

### The geolocator and the geoLocatorControls

You can also use the `nlmaps-geolocator` package directly instead of calling it with `nlmaps.geoLocate`. This gives you flexibility to implement your own control. Each of the library-specific sub-packages provides a control which interfaces with the `nlmaps-geolocator` API, but these are quite simple controls with, at the moment, hard-coded CSS styling. In the future `nlmaps` may provide a CSS file but for now, if you want to modify the placement, you should provide your own CSS and/or create your own control.

## Raw tile URLs

The tile URLs which `nlmaps` configures for you follow these templates:

For BRT-Achtergrondkaart series:

    https://geodata.nationaalgeoregister.nl/tiles/service/wmts/{stylename}/EPSG:3857/{z}/{x}/{y}.png

For aerial imagery:

    https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/1.0.0/2016_ortho25/EPSG:3857/{z}/{x}/{y}.jpeg

## Developing

### Installation/set up

To develop `nlmaps`, clone the repository and then in the directory run:

    lerna bootstrap
    npm install

`lerna bootstrap` symlinks cross-dependencies between the subpackages into each others' `node_modules` directory so that they can `require()` or `import` each other without having to actually download from npmjs.com

### General development notes
There are some issues when trying to call rollup from npm scripts, so there is a set of scripts in `scripts/` that should be called directly. The usage is as follows:

* `node scripts/build` to build the source from `packages/PACKAGE/src` into `packages/PACKAGE/build` 
* `node scripts/test` to run tests in `packages/PACKAGE/test` -- runs `unit-test.js` with Node and copies/compiles browser test js and html to build.
* `node scripts/serve` to run live-reload servers watching `build`, for use with the test html pages.
* `node scripts/serve-dev` to build, test and serve.
* `node scripts/publish` doesn't actually publish, but copies the build output to the top-level `dist/` directory.

All the above scripts can either operate on all subpackages (the default), or on a subset of packages by using the `-p` flag:

    //only builds nlmaps-leaflet and nlmaps-openlayers
    node scripts/build -p leaflet,openlayers

The list of packages to consider is specified in `scripts/conf.json`.

The scripts can be run in watch mode to recompile/retest when source/test files change:

    //build leaflet, and rebuild on source file changes
    node scripts/build --watch -p leaflet

This is not applicable to the `serve` script, which always live-reloads.

You can use the wrapper `serve-dev` to run the whole development setup, but note that all logging will go to one terminal and may be out of order, making it difficult to interpret. You may therefore want to run different combinations of commands for different subpackages in separate terminals for clarity.

**Note on testing:** The test script looks for a file called 'unit-test.js' to execute; this is meant for testing in nodejs. For the browser, it copies everything matching the glob `*test.html` to the build dir; and for the actual test scripts, it calls rollup with `rollup.test.js` as the config file for each package. These currently use `browser-test.js` as the main entrypoint.

**Also, NOTE:** the live server runs with basic SSL. You have to open the test pages with `https://` or they won't work. You will also need to add an exception for the self-signed security certificates the first time you open them.

### Publishing

[Lerna](https://lernajs.io/) is used for optimising the workflow around managing multi-package JavaScript projects with git and npm. Because of some seeming subtleties of Rollup's interaction with Lerna or NPM, there is a different build script. Use the following procedure to publish the packages.

1. `lerna exec npm -- install` If you need to update dependencies
2. `node scripts/build` can't use npm run or lerna run because rollup can't handle non-externalized dependencies when lerna is symlinking them.
3. `node scripts/publish` this doesn't actually publish yet, but copies the transpiled output from `packages/*/build/` to the top-level `dist/` directory.
4. git `add` and `commit`
5. `lerna publish`   choose version numbers for each changed package

This publishes to npm as well as creates new git tags for the releases, which are pushed to Github. To finish the release, go to the  Github repo's release page and annotate the latest release for the 'nlmaps' package (this makes it show up under the 'latest' path on Github).
