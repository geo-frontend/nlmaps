#NLMAPS

Automatically configure BRT Achtergrond map layers in Leaflet, Google Maps, Mapbox and Open Layers.

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
