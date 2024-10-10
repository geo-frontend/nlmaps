# Using the `nlmaps` library

These examples demonstrate some uses of the `nlmaps` library. The examples are presented in the form of a mini-tutorial with instructions and code blocks that you can run and copy/paste yourself. In addition, the working examples can be run by cloning this repository, moving to the `examples` directory, and running the following commands:

    npm install
    npx nx build nlmaps-examples
    npx nx dev nlmaps-examples

and opening [http://localhost:5173/](http://localhost:5173/) in your browser.

## Tutorial

There are two variants:

- Show the usage when `nlmaps` and a map library (MapLibre GL JS, Leaflet, OpenLayers) are loaded as script tags in the browser
- Show the usage with an `npm` workflow, where `nlmaps` is required in a NodeJS script and the result is compiled for the browser. In this case we use `browserify`; other build tools would work similarly but are out of scope of these examples.

This describes how to set up these examples in a clean new directory/npm project.

### including the scripts directly in the browser

#### Set up

Make a directory for your new project, like `mymap`. Move into your new directory.

#### An example with the full `nlmaps` package

Create a file called `nlmaps.html` and paste in the following code:

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf8"/>
        <title>NL Maps with MapLibre GL JS</title>
        <style>
          body {
            font-family: Helvetica, sans-serif;
          }
          #map-div{height:300px}
        </style>
      </head>
      <body>
        <div id="map-div"></div>
        <script src="https://unpkg.com/maplibre-gl@^4.7.1/dist/maplibre-gl.js"></script>
        <script src="https://rawgit.com/geo-frontend/nlmaps/master/dist/nlmaps.iife.js"></script>
        <script>
            var map = nlmaps.createMap({target: 'map-div'})
        </script>
      </body>
    </html>

To view the results, open this file in your browser.

This demonstrates the use of the main `nlmaps` package, using MapLibre GL JS, to create a map. This does the same thing as the [NL Maps wizard](https://nlmaps.nl/#wizard).

Notice the nlmaps script we include is `nlmaps.iife.js`, the whole nlmaps package. We can also include only the code needed for a single map library, if we want to save as many bytes as possible. Let's try it out, using the Leaflet mapping library this time.

#### An example with just `nlmaps-leaflet`

Create a file called `leaflet.html` and paste in the following code:

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf8"/>
        <title>NL Maps with Leaflet</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
          body {
            font-family: Helvetica, sans-serif;
          }
          #map-div{height:300px}
        </style>
      </head>
      <body>
        <div id="map-div"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script src="https://rawgit.com/geo-frontend/nlmaps/refs/heads/master/dist/nlmaps-leaflet.iife.js"></script>
        <script>
            var map = L.map('map-div').setView([52, 5], 10);
            var layer = bgLayer().addTo(map);
        </script>
      </body>
    </html>

Then open this file in your browser.

Notice how now we have included `nlmaps-leaflet.iife.js` instead of `nlmaps.iife.js`. Also, the code to create a layer is slightly different since we are not using the `nlmaps` wrapper package which automatically creates a map for us.

#### Add a geolocator control

The `nlmaps` library also has a geolocator feature which centers the map on the user's location. Let's add it to our two files. In `nlmaps.html`, edit the file as follows. Add the following line after the second `<script>` line, the one which loads `nlmaps.iife.js`:

    <script src="https://rawgit.com/geo-frontend/nlmaps/master/dist/nlmaps-geolocator.iife.js"></script>

And in the last `<script>` block, append the following line:

    nlmaps.geoLocate(map);

To add the geolocator to the second example with the `nlmaps-leaflet` package, the only difference is the code we need to add to our script. In addition to adding the `nlmaps-geolocator.iife.js` script tag as for the `nlmaps` variant, add the following two lines to the `<script>` block in `leaflet.js`:

    var geo = geoLocator();
    geoLocatorControl(geo).addTo(map);

### using NodeJS and compiling with `browserify`

#### Getting set up

To run these examples, you will need NodeJS, npm, and browserify.

To install Nodejs and npm, follow the instructions for your platform [here](https://nodejs.org/en/download/).

Once NodeJS is installed, you can install browserify like this:

    npm install -g browserify

You may need to add `sudo` in front of this command, if you receive a 'permission denied' error. The `-g` flag installs this package as a globally available command on your machine.

Then you can move into a new directory and initialize it as an npm project with the following command:

    npm init -y

(Note that we tell npm to not ask us a bunch of questions about the project by using the `-y` flag. Normally we would enter a project name, license, and repository, but since this is just a quick demo we can skip this.)

Running `npm init` creates a `package.json` file for us, so we can install some packages from `npmjs.org`. For our first example, we need the main `nlmaps` package and a Google Maps wrapper package:

    npm install --save nlmaps google-maps

#### An example with the full `nlmaps` package

Now create a file `index-nlmaps.js` with the following code:

    var googleMapsLoader = require('google-maps');

    googleMapsLoader.load(function(google) {
        var nlmaps = require('nlmaps');
        nlmaps.createMap({target: 'map-div'})
    })

Now, we need to compile this script into something the browser will understand. For this we use `browserify`:

    browserify index-nlmaps.js -o main-nlmaps.js

This compiles the `index-nlmaps.js` file into the output file `main-nlmaps.js`.

To view your example in the browser, create a file `nlmaps.html` which loads `main-nlmaps.js`:

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf8"/>
        <title>NL Maps with Google Maps</title>
        <style>
          body {
            font-family: Helvetica, sans-serif;
          }
          #map-div{height:300px}
        </style>
      </head>
      <body>
        <div id="map-div"></div>
        <script src="main-nlmaps.js"></script>
      </body>
    </html>

#### An example with just `nlmaps-leaflet`

For the next example, we need the `nlmaps-leaflet` package. And we also need the actual Leaflet library, so we'll install that as well:

    npm install --save nlmaps-leaflet leaflet

The procedure is the same as for the previous example. Create a file called `index-leaflet.js` with the following code:

    var leaflet = require('leaflet');
    var bgLayer = require('nlmaps-leaflet').bgLayer;

    var map = L.map('map-div').setView([52, 5], 10);
    var layer = bgLayer().addTo(map);

And create an html file `leaflet.html` which loads your script:

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf8"/>
        <title>NL Maps with Leaflet</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossorigin=""
        />
        <style>
          body {
            font-family: Helvetica, sans-serif;
          }
          #map-div{height:300px}
        </style>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body>
        <div id="map-div"></div>
        <script src="main-leaflet.js"></script>
      </body>
    </html>

Now, compile the Javascript with browserify:

    browserify index-leaflet.js -o main-leaflet.js

And you can view your Leaflet-based map by opening `leaflet.html` in the browser.

#### Add a geolocator

To add a geolocator to our examples, we need to install the package:

    npm install --save nlmaps-geolocator

To use it in the `nlmaps.html` example, edit `index-nlmaps.js` to look like this:

    var googleMapsLoader = require('google-maps');

    googleMapsLoader.KEY='google-key' //substitute with your Google Maps key, see https://developers.google.com/maps/documentation/javascript/get-api-key

    googleMapsLoader.load(function(google) {
        var nlmaps = require('nlmaps');
        var map = nlmaps.createMap({target: 'map-div'})
        nlmaps.geoLocate(map);
    })

Recompile the script with `browserify index-nlmaps.js -o main-nlmaps.js` And see the result by opening/refreshing `nlmaps.html`.

To use it in the `nlmaps-leaflet` example, edit `index-leaflet.js` to look like this:

    var leaflet = require('leaflet');
    var bgLayer = require('nlmaps-leaflet').bgLayer;
    var geoLocatorControl = require('nlmaps-leaflet').geoLocatorControl;
    var geoLocator = require('nlmaps-geolocator');

    var map = L.map('map-div').setView([52, 5], 10);
    var layer = bgLayer().addTo(map);

    var geo = geoLocator();
    geoLocatorControl(geo).addTo(map);

Recompile the script with `browserify index-leaflet.js -o main-leaflet.js` and use the geocoder in `leaflet.html`.

### Further exercises

So far we have only used the default settings for new maps/layers created with the `nlmaps` library. But you can also customize the map by changing the style and the position and zoom. For example:

    nlmaps.createMap({target: 'map-div', style: 'pastel'})

Read the [documentation](https://github.com/geo-frontend/nlmaps#api-documentation) to see what other options you can change and play around with some different settings, or try to use NL Maps with the OpenLayers library.

Happy mapping!
