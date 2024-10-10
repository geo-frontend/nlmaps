# NL Maps

## Table of Contents

- [Purpose](#purpose)
- [Usage example](#usage-example)
- [Getting set up](#getting-set-up)
- [API documentation](#api-documentation)
- [Events](#events)
- [Advanced usage](#advanced-usage)
- [Raw tile URLs](#raw-tile-urls)
- [Developing](#developing)

## Purpose

The `nlmaps` JavaScript library allows you to create layers for Leaflet, MapLibre GL JS, or OpenLayers pre-configured to use the BRT-Achtergrondkaart layers. You don't need to figure out the tile URLs yourself. To make it even easier, it automatically detects the map library you're using and creates a map pre-loaded with one of the BRT-Achtergrondkaart layers.

## Usage example

    let map = nlmaps.createMap({style: 'grijs', target: 'nlmaps-holder'});

Available map styles:

- `standaard`: the default BRT-Achtergrondkaart in color
- `pastel`: in pastel tints
- `grijs`: in very low saturation
- `luchtfoto`: aerial imagery

## Extending

In order to create a NL Maps version for your own organisation you can extend upon this package. To see an example of this you can check out the City of Amsterdam's version [`amaps` on GitHub](https://github.com/Amsterdam/amaps).

## Getting set up

### Wizard

The [NL Maps wizard](https://nlmaps.nl/#wizard) makes it super easy to get started with your choice of map library and map style. It gives you a code example that shows you how to include the HTML and JavaScript code to get a working map. It is recommended that you refer to the wizard output even if you are doing things manually.

### Manual browser configuration

You need _one_ of Leaflet, MapLibre GL JS, or OpenLayers available in your web page. `nlmaps` autodetects which one is present (and currently considers it an error if more than one is present). For further information on using the respective libraries, refer to their documentation:

- [Leaflet](http://leafletjs.com/examples.html)
- [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/)
- [OpenLayers](http://openlayers.org/en/latest/doc/quickstart.html)

Finally, you will need the `nlmaps` library itself, which you can download from the [latest release on Github](https://github.com/geo-frontend/nlmaps/releases/latest). Download and extract the source code and select the file `dist/nlmaps.iife.js` Include it on your web page like this:

    <script src="url_of_nlmaps.iife.js"></script>

### NodeJS

`nlmaps` has been developed against NodeJS version 6.x.

    npm install -S nlmaps

    //CommonJS
    let nlmaps = require('nlmaps');

    //ES2015 Modules
    import nlmaps from 'nlmaps';

Leaflet, MapLibre GL JS, or OpenLayers will also need to be available in your final web browser scope. One way you can do this is to install a package that wraps your map library for Node; in that case `npm install -S` it (for example, [leaflet](https://www.npmjs.com/package/leaflet), [maplibre-gl](https://www.npmjs.com/package/maplibre-gl) or [openlayers](https://www.npmjs.com/package/ol)). You can also include it as a script in the HTML-file that loads your final app output.

## API documentation

### `nlmaps.createMap(options<object>)`

Creates a map using Leaflet, MapLibre GL JS, or OpenLayers with a given BRT-Achtergrondkaart layer already added as a background layer. Configured with an `options` object with the following properties:

- target: _string_ (**required**). This is the id of the `div` in which to create the map.
- center: _object_ (optional). This object contains latitude and longitude properties for setting the initial viewpoint. Defaults to a position near the centre of the Netherlands.
- zoom: _number_ (optional). This is the zoom level at which to initialize the viewpoint. Defaults to `8`.
- style: _string_ (optional). This sets the base map style. One of `'standaard'`, `'pastel'`, '`grijs'` or `'luchtfoto'`, default `'standaard'`.
- marker: _boolean_ or _object_ (optional). Use one of `'true'` or `'false'` for setting whether or not to show a marker at the location specified by `center`. Defaults to `'false'`. To explicitly set the position of the marker, pass the marker an _object_ with latitude and longitude properties.
- overlay: _string_ (optional). This specifies a map overlay on top of the BRT-Achtergrondkaart or aerial imagery. One of `'drone-no-fly-zones'`, `'gebouwen'`, `'gemeenten'`, `'hoogte'`, `'percelen'` or `'provincies'`.
- search: _boolean_ (optional). Use one of `'true'` or `'false'` for setting whether or not to show the search box for places and addresses. Defaults to `'false'`.

Returns a `map` object.

#### Example

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

- map: _object map_ (**required**). the `map` that the geolocator control should be added to.
- options _object_ (optional). An object with one allowed property, `start: true|false`. If set to `true`, the geolocator is initialized on page load.

Returns a `geolocator` object. See the [nlmaps-geolocator](https://www.npmjs.com/package/nlmaps-geolocator) package for more information.

#### Example

    const map = nlmaps.createMap();
    const geolocator = nlmaps.geoLocate(map, {start: true})

### `nlmaps.<leaflet|openlayers>.bgLayer([style<string>])`

Creates a layer for the given library configured to fetch tiles for `style` tile source, or if `style` is omitted, for the 'standaard' tilesource. In order to use the `nlmaps` library in conjunction with Mapbox, select `nlmaps.leaflet`.

Arguments:

- style: _string_ (optional). Name of tile source to load. One of `'standaard'`, `'pastel'`,`'grijs'` or '`luchtfoto`'; default `'standaard'`.

Returns a `layer` object.

#### Example (OpenLayers)

    const layer = nlmaps.openlayers.bgLayer();
    layer.addLayer(map);

### `nlmaps.<leaflet|maplibre|openlayers>.markerLayer([coords<object>])`

Creates a layer for the given library configured to position a marker at the location `coords`. In order to use the `nlmaps` library in conjunction with Mapbox, select `nlmaps.leaflet`.

Arguments:

- coords: _object_ (**required**). This object contains `latitude` and `longitude` properties for setting the location of the marker.

Returns a `layer` object.

#### Example (Leaflet)

    const marker = nlmaps.leaflet.markerLayer({
      longitude: 5.4534,
      latitude: 52.3112
    });
    marker.addTo(map);

### `nlmaps.<leaflet|openlayers>.overlayLayer([overlay<string>])`

Creates a layer for the given library configured to fetch tiles for one of the pre-defined `overlay` map sources. In order to use the `nlmaps` library in conjunction with Mapbox, select `nlmaps.leaflet`.

Arguments:

- overlay: _string_ (**required**). Name of map source to load. One of `'drone-no-fly-zones'`, `'gebouwen'`, `'gemeenten'`, `'hoogte'`, `'percelen'` or '`provincies`'.

Returns a `layer` object.

#### Example (Leaflet)

    const overlay = nlmaps.leaflet.overlayLayer(map, 'drone-no-fly-zones');

### `nlmaps.<leaflet|openlayers>.overlayLayer([overlay<string>],[endpoint<object>])`

Creates a layer for the given library configured to fetch tiles for a custom `overlay` **W**eb **M**apping **S**ervice (WMS). The service must follow the [OGC WMS specification](http://www.opengeospatial.org/standards/wms) and support the Spherical Mercator (EPSG:3857) projection. In order to use the `nlmaps` library in conjunction with Mapbox, select `nlmaps.leaflet`.

Arguments:

- overlay: _string_ (**required**). Name of the custom layer.
- endpoint: _object_ (**required**). This object contains `url`, `layerName`, and `styleName` parameters for specifying the **W**eb **M**apping **S**ervice (WMS).

Returns a `layer` object.

#### Example (OpenLayers)

    const endpoint = {
      url: 'https://geodata.nationaalgeoregister.nl/fysischgeografischeregios/ows?',
      layerName: 'fysischgeografischeregios',
      styleName: 'fysischgeografischeregios:fysischgeografischeregios'
    };
    const overlay = nlmaps.openlayers.overlayLayer('fysisch-geografische-regios', endpoint);
    map.addLayer(overlay);

### `nlmaps.<leaflet|openlayers>.geoLocatorControl(geolocator)`

Creates a control for the given library which talks to the given `geolocator`. The control has a very simple interface: click to initiate a geolocation request and have the map be centered on the resulting location. You need to add the control to the map yourself. Arguments:

Arguments:

- geolocator _object geolocator_ (**required**). The `geolocator` to which the control should be connected. If you are using this method, you will probably be creating the geolocator yourself with the [nlmaps-geolocator](https://www.npmjs.com/package/nlmaps-geolocator) package.

Returns a `geolocator` control.

#### Example (Leaflet)

    import geoLocator from 'nlmaps-geolocator';
    import geoLocatorControl from 'nlmaps-leaflet';
    const geolocator = geoLocator();
    const control = geoLocatorControl(geolocator);
    control.addTo(map);

### `nlmaps.clickProvider(map)`

#### only Leaflet

creates an event provider for clicks on the map, which can be subscribed to with a listener function or used as input to `nlmaps.queryFeatures`.

The click events returned are original [Leaflet click events](http://leafletjs.com/reference-1.3.0.html#map-click)

Arguments:

- map _object map_ (**required**). The map for which to emit click events.

returns an object with a `subscribe` function which takes as an argument the callback that should handle the events. `clickProvider` follows the [callbag spec](https://github.com/callbag/callbag) so this callback should have the signature `callback(type, data)` and should expect `type` to be `1`.

#### Example (Leaflet)

    const clicks = nlmaps.clickProvider(map);
    function myHandler(type, data) {
      if (type === 1){
        console.log(data)
      }
    }
    clicks.subscribe(myHandler)

The returned object is itself a `callbag` so it can be used with other `callbags`, as is done with `nlmaps.queryFeatures`.

### `nlmaps.queryFeatures(clickProvider, baseUrl, requestFormatter, responseFormatter)`

creates an interface to query an HTTP API with coordinates from clicks on the map.

Arguments:

- clickProvider _object_ (**required**). an `nlmaps.clickProvider`.
- baseUrl _string_ (**required**). the base url for the API to be queried.
- requestFormatter _function(baseUrl, xy) => formattedUrl string_ (**required**). A function which receives the base url and an xy object of the format `{x: longitude, y: latitude}` and must return the url with which to query the external API
- responseFormatter _function(response) => anything_ (**required**). A function which receives the API response and can be used to handle the response before passing it on.

Returns an object with a `subscribe` method which can be used to handle the response. This method takes as an argument a function of signature `callback(type, data)` and should expect `type` to be `1`. The `data` argument will be an object of signature:

    {
        latlng: {
          lat: <latitude>,
          lng: <longitude>
        },
        queryResult: <queryResult> from reponseFormatter
    }

#### Example

    const clicks = nlmaps.clickProvider(map);

    function requestFormatter(baseUrl, xy) {
      return `${baseUrl}${xy.x},${xy.y}?radius=50`
    }

    function responseFormatter(res) {
      let filtered = res.results.filter(x => x.hoofdadres === true);
      return filtered.length > 0 ? filtered[0] : null;
    }

    let featureQuery = nlmaps.queryFeatures(clicks, requestFormatter, responseFormatter)
    featureQuery.subscribe(myHandler)

### `nlmaps.singleMarker(map, popupCreator)`

**Leaflet only**

places a marker on the map. Meant to be used in combination with `nlmaps.clickProvider`. The default behaviour is to move the marker on every click, and remove the marker when it is clicked. An optional `popupCreator` function can be passed to specify how to create a popup on the marker.

Arguments:

- map _object map_ (**required**). The map on which the marker should be placed.
- popuCreator _function(data) => htmlElement_ (**optional**). A function which receives data and creates a popup based on it. The function should return an html element to be used by Leaflet to create the popup.

returns an function which can be used to subscribe to `nlmaps.clickProvider`.

Example with default functionality:

    const clicks = nlmaps.clickProvider(map);
    const singleMarker = nlmaps.singleMarker(map);
    clicks.subscribe(singleMarker);

Example with a custom popupCreator. Note that this function is bound to an object with a `removeMarker` method, allowing you to remove the parent marker from interaction on the popup.

    function popupCreator(d) {
      let div = document.createElement('div');
      let button = document.createElement('button');
      let p = document.createElement('p');
      p.innerText = d.responseText;
      div.append(p);
      button.innerHTML = 'remove';
      button.addEventListener('click', this.removeMarker)
      div.append(button);
      return div;
    }
    const clicks = nlmaps.clickProvider(map);
    const singleMarker = nlmaps.singleMarker(map, popupCreator);
    clicks.subscribe(singleMarker);

## Events

the `nlmaps` object produces the following events:

- `mapclick` when the map is clicked. Returns the click event from the underlying map library.
- `search-select` when the user selects a search result. Returns the lat/lon location of the result and the 'weergavenaam' of the result.

You can subscribe a listener function to these events as follows:

    nlmaps.on('event-name', listener)

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

### Include only your library-specific functions

If you want to save as many bytes as possible, simply include the sub-module for your map library instead of the whole `nlmaps` package. Each of these modules provides a `bgLayer()` function which will return a layer for the corresponding map library, a markerLayer() function which will return a marker on the map, and a `geoLocatorControl()` function which returns a control for the geolocator.

**Web browser:**

Download the appropriate `nlmaps-<maplib>.min.js` [release](https://github.com/geo-frontend/nlmaps/releases/latest) Download and extract the source code and select the appropriate file from the `dist` directory. Upon including the script in your web page, you will have a `bgLayer()` function available which works with the respective map library. In order to use the `nlmaps` library in conjunction with Mapbox, select `leaflet`.

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

    https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:3857/{z}/{x}/{y}.png

For aerial imagery:

    https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0/Actueel_ortho25/EPSG:3857/{z}/{x}/{y}.jpeg

## Developing

See also [CONTRIBUTING](CONTRIBUTING.md)

### Installation/set up

To develop `nlmaps`, clone the repository and then in the directory run:

    lerna bootstrap
    npm install

`lerna bootstrap` symlinks cross-dependencies between the subpackages into each others' `node_modules` directory so that they can `require()` or `import` each other without having to actually download from npmjs.com

### General development notes

Development is most stable in Node version 10.x.

There are some issues when trying to call rollup from npm scripts, so there is a set of scripts in `scripts/` that should be called directly. The usage is as follows (note that rollup needs to installed as global):

- `node scripts/build` to build the source from `packages/PACKAGE/src` into `packages/PACKAGE/build`
- `node scripts/test` to run tests in `packages/PACKAGE/test` -- runs `unit-test.js` with Node and copies/compiles browser test js and html to build.
- `node scripts/serve` to run live-reload servers watching `build`, for use with the test html pages.
- `node scripts/serve-dev` to build, test and serve.
- `node scripts/publish` doesn't actually publish, but copies the build output to the top-level `dist/` directory.

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
5. `lerna version` to choose version numbers for each changed package.
6. `lerna publish` to publish to the NPM repository.

This publishes to npm as well as creates new git tags for the releases, which are pushed to Github. To finish the release, go to the Github repo's release page and annotate the latest release for the 'nlmaps' package (this makes it show up under the 'latest' path on Github).

**Note:** publishing usually happens automatically via CircleCI.

### Building the webpage

To build the webpage goto the docs folder and make sure you have gulp installed.

Run `gulp build` to start the build process. When the process is finished the compiled website and assets are available in the build folder.

**Note:** the gulp build process copies nlmaps css and assets directly from `../packages/assets`.
