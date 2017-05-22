# NLMAPS

Automatically configure BRT Achtergrond map layers in Leaflet, Google Maps and OpenLayers.

## What it's for

the `nlmaps` libary allows you to create layers for Leaflet, Google Maps or OpenLayers pre-configured to use the BRT Achtergrondkaart layers. So you don't need to figure out the tile urls yourself.

## Quick start

### just give me a map

If you have no clue how web maps work, or you just want to get it working as simply as possible, take the top-level 'nlmaps' package.

`<script>`-tag:

Download nlmaps.min.js from dist/ and include it in your page.

Also include your map library of choice in the page, _before_ nlmaps. Nlmaps will then auto-configure to use the included library.

Create a `div` on the page and give it an id, say 'map'.

Now you can:

    let map = nlmaps.createMap({type: 'leaflet', layer: 'brtachtergrond-kleur', target: 'map'});

and you have a map!

**Google Maps:** if you want to use Google Maps with an API key, this simple method won't work. See below under advanced usage.


### I want a bit more control, thank you

You can also use just library-specific layer creation function. You can either use the function provided in the nlmaps package, or include just the sub-package on your page, like 'nlmaps-leaflet.min.js'. Each of the three sub-packages will provide you with a `bgLayer` function which returns a layer specific to the library you're using. So after including your library in your page, and then e.g. 'nlmaps-leaflet', you can:

    let map = L.map('map');
    let mylayer = bgLayer('brtachtergrond-grijs').addTo(map);

Or if you included the `nlmaps` package, you can do:
    
    let mylayer = nlmaps.leaflet.bgLayer().addTo(map); //default behaviour is BRT Achtergrondkaart Kleur


## Advanced usage


    


## Development notes

under 'packages' are packages for each of the sub-libraries. These can be imported as e.g. `import nlmaps-leaflet from nlmaps-leaflet` or `let nlmaps-leaflet = require('nlmaps-leaflet')`. A top-level package, 'nlmaps', pulls these all together and does even more autoconfiguration. So use the sub-library when you want more control over integration, and use the top-level package when you don't know or don't care how to configure our map library of choice and just want a BRT Achtergrondkaart to appear on the screen.

Each sub-package has its own package.json and set of npm scripts. You can `npm run`

* watch-code
* watch-test
* build
* watch-browser-test

in each one. Browser tests are then available at localhost:8080

tests are not complete at the moment.


## To work out:

* Mapbox isn't really a target ... or is it?
* OpenLayers and Google Maps ... level at which to import?
* configurability -- override or not? I think the idea is to provide configurability, and then have a default config provided by the top-level nlmaps package.
