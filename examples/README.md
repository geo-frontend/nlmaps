Using the `nlmaps` library
==========================

These examples demonstrate some uses of the `nlmaps` library. The examples are presented in the form of a mini-tutorial with instructions and code blocks that you can run and copy/paste yourself. In addition, the working examples can be run by cloning this repository, moving to the `examples` directory, and running the following commands:

    npm install
    npm run build
    npm run serve

and opening localhost:8080 in your browser.


Tutorial
--------

There are two variants:

*  Show the usage when `nlmaps` and a map library (Google Maps, Leaflet, OpenLayers) are loaded as script tags in the browser
*  Show the usage with an `npm` workflow, where `nlmaps` is required in a NodeJS script and the result is compiled for the browser. In this case we use `browserify`; other build tools would work similarly but are out of scope of these examples.

This describes how to set up these examples in a clean new directory/npm project.

### including the scripts directly in the browser
1. Make a directory for your new project, like `mymap`. Move into your new directory.
2. Create a file called `index.html` and paste in the following code:
    
    
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
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAYCu4ZY9tssUK4luavRsNyTirXdEnC3qw"></script>
        <script src="https://rawgit.com/kadaster/nlmaps/master/dist/nlmaps.iife.js"></script>
        <script>
            var map = nlmaps.createMap({target: 'map-div'})
        </script>
      </body>
    </html>

To view the results, open this file in your browser.

This demonstrates the use of the main `nlmaps` package, using Google Maps, to create a map. This does the same thing as the [NL Maps wizard](https://nlmaps.nl/#wizard).

Notice the nlmaps script we include is `nlmaps.iife.js`, the whole nlmaps package. We can also include only the code needed for a single map library, if we want to save as many bytes as possible. Let's try it out, using the Leaflet mapping library this time.

3. Create a file called `leaflet.html` and paste in the following code:
    
    
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf8"/>
        <title>NL Maps with Leaflet</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" />
        <style>
          body {
            font-family: Helvetica, sans-serif;
          }
          #map-div{height:300px}
        </style>
      </head>
      <body>
        <div id="map-div"></div>
        <script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
        <script src="https://rawgit.com/kadaster/nlmaps/master/dist/nlmaps-leaflet.iife.js"></script>
        <script>
            var map = L.map('map-div').setView([52, 5], 10);
            var layer = bgLayer().addTo(map); 
        </script>
      </body>
    </html>

Then open this file in your browser.

Notice how now we have included `nlmaps-leaflet.iife.js` instead of `nlmaps.iife.js`. Also, the code to create a layer is slightly different since we are not using the `nlmaps` wrapper package which automatically creates a map for us.

4. The `nlmaps` library also has a geolocator feature which centers the map on the user's location. Let's add it to our two files. In `index.html`, edit the file as follows. Add the following line after the second `<script>` line, the one which loads `nlmaps.iife.js`:
    
    
    <script src="https://rawgit.com/kadaster/nlmaps/master/dist/nlmaps-geolocator.iife.js"></script>

And in the last `<script>` block, append the following line:

    nlmaps.geoLocate(map);
    

To add the geolocator to the second example with the `nlmaps-leaflet` package, the only difference is the code we need to add to our script. Add the following two lines to the `<script>` block in `leaflet.js`:

    var geo = geoLocator();
    geoLocatorControl(geo).addTo(map);

### using NodeJS and compiling with `browserify`

1. To run these examples, you will need NodeJS, npm, and browserify.

To install Nodejs and npm, follow the instructions for your platform [here](https://nodejs.org/en/download/https://nodejs.org/en/download/).

Once NodeJS is installed, you can install browserify like this:

    npm install -g browserify

You may need to add `sudo ` in front of this command, if you receive a 'permission denied' error. The `-g` flag installs this package as a globally available command on your machine.

2. Then you can move into a new directory and initialize it as an npm project with the following command:
    
    
    npm init -y

(Note that we tell npm to not ask us a bunch of questions about the project by using the `-y` flag. Normally we would enter a project name, license, and repository, but since this is just a quick demo we can skip this.)

Running `npm init` creates a `package.json` file for us, so we can install some packages from `npmjs.org`. For our first example, we need the main `nlmaps` package and a Google Maps wrapper package:
    
    
    npm install --save nlmaps google-maps
    
3. Now create a file `index.js` with the following code:
   
   
    var googleMapsLoader = require('google-maps');
    
    googleMapsLoader.KEY='abcdefghijk' //substitute with your Google Maps key, see https://developers.google.com/maps/documentation/javascript/get-api-key
    
    googleMapsLoader.load(function(google) {
        var nlmaps = require('nlmaps');
        nlmaps.createMap()
    })

4. Now, we need to compile this script into something the browser will understand. For this we use `browserify`:
    
    
    browserify index.js -o main-nlmaps.js
 
This compiles the `index.js` file into the output file `main-nlmaps.js`.

5. To view your example in the browser, create a file `index.html` which loads `main-nlmaps.js`:
    
    
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
        <a href="../index.html">Back</a>
        <div id="map-div"></div>
        <script src="main-nlmaps.js"></script>
      </body>
    </html>

6. For the next example, we need the `nlmaps-leaflet` package. And we also need the actual Leaflet library, so we'll install that as well:

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
        <style>
          body {
            font-family: Helvetica, sans-serif;
          }
          #map-div{height:300px}
        </style>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" />
      </head>
      <body>
        <a href="../index.html">Back</a>
        <div id="map-div"></div>
        <script src="main-leaflet.js"></script>
      </body>
    </html>

Now, compile the Javascript with browserify:

    browserify index-leaflet.js -o main-leaflet.js

And you can view your Leaflet-based map by opening `leaflet.html` in the browser.
    

1. To add a geolocator to our examples, we need to install the package:

    
    npm install --save nlmaps-geolocator

To use it in the `nlmaps.html` example, edit `index-nlmaps.js` to look like this:

    var googleMapsLoader = require('google-maps');

    googleMapsLoader.KEY='AIzaSyAYCu4ZY9tssUK4luavRsNyTirXdEnC3qw' //substitute with your Google Maps key, see https://developers.google.com/maps/documentation/javascript/get-api-key

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


## Further exercises
So far we have only used the default settings for new maps/layers created with the `nlmaps` library. But you can also customize the map by changing the style and the position and zoom. For example:

    nlmaps.createMap({target: 'map-div', style: 'pastel'})

Read the [documentation] to see what other options you can change and play around with some different settings, or try to use NL Maps with the OpenLayers library.

Happy mapping!
