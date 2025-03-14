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

The `nlmaps` JavaScript library allows you to create layers for Leaflet, MapLibre GL JS, and OpenLayers pre-configured to use the BRT-Achtergrondkaart layers. You don't need to figure out the tile URLs yourself.

## Usage example

    let map = nlmaps.createMap({style: 'grijs', target: 'nlmaps-holder'});

Available map styles:

- `standaard`: the default BRT-Achtergrondkaart in color
- `pastel`: in pastel tints
- `grijs`: in very low saturation
- `luchtfoto`: aerial imagery

## Getting set up

### Wizard

The [NL Maps wizard](https://nlmaps.nl/#wizard) makes it super easy to get started. It gives you a code example that shows you how to include the HTML and JavaScript code to get a working map. It is recommended that you refer to the wizard output even if you are doing things manually.

### Manual browser configuration

You need Leaflet available in your web page. `nlmaps` autodetects if Leaflet is present (and currently considers it an error if more than one is present). For further information on using Leaflet, refer to its [documentation](http://leafletjs.com/examples.html).

Finally, you will need the `nlmaps` library itself, which you can download from the [latest release on Github](https://github.com/geo-frontend/nlmaps/releases/latest). Download and extract the source code and select the file `dist/nlmaps.iife.js` Include it on your web page like this:

    <script src="url_of_nlmaps.iife.js"></script>

### Node.js

`nlmaps` has been developed against Node.js version 20.14.0.

    npm install -S nlmaps

    //CommonJS
    let nlmaps = require('nlmaps');

    //ES2015 Modules
    import nlmaps from 'nlmaps';

Leaflet, MapLibre GL JS, or OpenLayers will also need to be available in your final web browser scope. One way you can do this is to install a package that wraps your map library for Node; in that case `npm install -S` it (for example, [leaflet](https://www.npmjs.com/package/leaflet), [maplibre-gl](https://www.npmjs.com/package/maplibre-gl) or [openlayers](https://www.npmjs.com/package/ol)). You can also include it as a script in the HTML-file that loads your final app output.

## API documentation

### `nlmaps.createMap(options<object>)`

Creates a map using Leaflet with a given BRT-Achtergrondkaart layer already added as a background layer. Configured with an `options` object with the following properties:

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
      overlay: 'gemeenten',
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

### `nlmaps.leaflet.bgLayer([style<string>])`

Creates a layer for Leaflet configured to fetch tiles for `style` tile source, or if `style` is omitted, for the 'standaard' tilesource.

Arguments:

- style: _string_ (optional). Name of tile source to load. One of `'standaard'`, `'pastel'`,`'grijs'` or '`luchtfoto`'; default `'standaard'`.

Returns a `layer` object.

#### Example

    const layer = nlmaps.leaflet.bgLayer();
    layer.addLayer(map);

### `nlmaps.leaflet.markerLayer([coords<object>])`

Creates a layer for Leaflet configured to position a marker at the location `coords`.

Arguments:

- coords: _object_ (**required**). This object contains `latitude` and `longitude` properties for setting the location of the marker.

Returns a `layer` object.

#### Example

    const marker = nlmaps.leaflet.markerLayer({
      longitude: 5.4534,
      latitude: 52.3112
    });
    marker.addTo(map);

### `nlmaps.leaflet.overlayLayer([overlay<string>])`

Creates a layer for Leaflet configured to fetch tiles for one of the pre-defined `overlay` map sources.

Arguments:

- overlay: _string_ (**required**). Name of map source to load. One of `'adressen'`, `'drone-no-fly-zones'`, `'gebouwen'`, `'gemeenten'`, `'hoogte'`, `'land'`, `'percelen'` or '`provincies`'.

Returns a `layer` object.

#### Example

    const overlay = nlmaps.leaflet.overlayLayer(map, 'gemeenten');

### `nlmaps.leaflet.overlayLayer([overlay<string>],[endpoint<object>])`

Creates a layer for Leaflet configured to fetch tiles for a custom `overlay` **W**eb **M**apping **S**ervice (WMS). The service must follow the [OGC WMS specification](http://www.opengeospatial.org/standards/wms) and support the Spherical Mercator (EPSG:3857) projection.

Arguments:

- overlay: _string_ (**required**). Name of the custom layer.
- endpoint: _object_ (**required**). This object contains `url`, `layerName`, and `styleName` parameters for specifying the **W**eb **M**apping **S**ervice (WMS).

Returns a `layer` object.

#### Example

    const endpoint = {
      url: 'https://service.pdok.nl/ez/fysischgeografischeregios/wms/v1_0?',
      layerName: 'fysischgeografischeregios',
      styleName: 'fysischgeografischeregios'
    };
    const overlay = nlmaps.leaflet.overlayLayer('fysisch-geografische-regios', endpoint);
    overlay.addTo(map);

### `nlmaps.leaflet.geoLocatorControl(geolocator)`

Creates a control for Leaflet which talks to the given `geolocator`. The control has a very simple interface: click to initiate a geolocation request and have the map be centered on the resulting location. You need to add the control to the map yourself. Arguments:

Arguments:

- geolocator _object geolocator_ (**required**). The `geolocator` to which the control should be connected. If you are using this method, you will probably be creating the geolocator yourself with the [nlmaps-geolocator](https://www.npmjs.com/package/nlmaps-geolocator) package.

Returns a `geolocator` control.

#### Example

    import geoLocator from 'nlmaps-geolocator';
    import geoLocatorControl from 'nlmaps-leaflet';
    const geolocator = geoLocator();
    const control = geoLocatorControl(geolocator);
    control.addTo(map);

### `nlmaps.clickProvider(map)`

Creates an event provider for clicks on the map, which can be subscribed to with a listener function or used as input to `nlmaps.queryFeatures`.

The click events returned are original [Leaflet click events](https://leafletjs.com/reference.html#map-click)

Arguments:

- map _object map_ (**required**). The map for which to emit click events.

Returns an object with a `subscribe` function which takes as an argument the callback that should handle the events. `clickProvider` follows the [callbag spec](https://github.com/callbag/callbag) so this callback should have the signature `callback(type, data)` and should expect `type` to be `1`.

#### Example

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

Places a marker on the map. Meant to be used in combination with `nlmaps.clickProvider`. The default behaviour is to move the marker on every click, and remove the marker when it is clicked. An optional `popupCreator` function can be passed to specify how to create a popup on the marker.

Arguments:

- map _object map_ (**required**). The map on which the marker should be placed.
- popuCreator _function(data) => htmlElement_ (**optional**). A function which receives data and creates a popup based on it. The function should return an html element to be used by Leaflet to create the popup.

Returns an function which can be used to subscribe to `nlmaps.clickProvider`.

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

The `nlmaps` object produces the following events:

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

### Include only your library-specific functions

If you want to save as many bytes as possible, simply include the sub-module for your map library instead of the whole `nlmaps` package. Each of these modules provides a `bgLayer()` function which will return a layer for the corresponding map library, a markerLayer() function which will return a marker on the map, and a `geoLocatorControl()` function which returns a control for the geolocator.

**Web browser:**

Download the `nlmaps-leaflet.iife.js` [release](https://github.com/geo-frontend/nlmaps/releases/latest) Download and extract the source code and select the file from the `dist` directory. Upon including the script in your web page, you will have a `bgLayer()` function available which works with Leaflet.

**NodeJS:**

    npm install --save nlmaps-ol

    //CommonJS
    let bgLayer = require('nlmaps-ol').bgLayer; //note the use of property off of require
    let marker = require('nlmaps-ol').markerLayer;

    //ES2015
    import { bgLayer, markerLayer } from 'nlmaps-ol';

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

### General development notes

`nlmaps` is a monorepo using `Nx` and `pnpm`. De website is gemaakt op basis van `Vue.js`.

### Installation/set up

To start development of `nlmaps`, install `pnpm` globally:

    npm install -g pnpm

Then install `Nx` globally:

    pnpm add -g nx

Clone the repository:

    git clone git@github.com:geo-frontend/nlmaps.git
    cd nlmaps

Install its dependencies:

    pnpm install

To serve the website locally:

    npx nx dev nlmaps-website

To serve the examples locally:

    npx nx dev nlmaps-examples

To build the website, examples, and packages:

    npx nx run-many --target=build --all
