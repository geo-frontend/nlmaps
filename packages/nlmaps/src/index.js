import emitonoff from 'emitonoff'
import {
  bgLayer as bgL,
  overlayLayer as overlayL,
  markerLayer as markerL,
  getMapCenter as centerL,
  geocoderControl as geocoderL,
  extentLeafletFormat,
  geoLocatorControl as glL,
} from '@geo-frontend/nlmaps-leaflet'

import geoLocator from '@geo-frontend/nlmaps-geolocator'
import {
  singleMarker,
  multiMarker,
  markerStore,
  mapPointerStyle,
  queryFeatures,
  CONFIG,
} from '../../lib/src/index.js'

let nlmaps = {
  leaflet: {
    bgLayer: bgL,
    overlayLayer: overlayL,
    markerLayer: markerL,
    geocoderControl: geocoderL,
    geoLocatorControl: glL,
  },
}

//set nlmaps up as event bus
emitonoff(nlmaps)

//for future use
const geoLocateDefaultOpts = {}

function testWhichLib() {
  if (typeof L === 'object') {
    return 'leaflet'
  }
  return 'too few libs'
}

function initMap(opts) {
  let map, rootdiv, el, options
  rootdiv = document.getElementById(opts.target)
  rootdiv.style.position = 'relative'
  rootdiv.style.padding = '0px'
  rootdiv.style.margin = '0px'
  options = {}
  if (!opts.attribution) {
    options.attributionControl = false
  }
  el = L.DomUtil.create('div')
  el.style.height = '100%'
  rootdiv.appendChild(el)
  options.maxBounds = extentLeafletFormat()
  map = L.map(el, options).setView(
    [opts.center.latitude, opts.center.longitude],
    opts.zoom,
  )
  if (opts.attribution) {
    map.attributionControl.setPrefix(false)
  }
  map.zoomControl.setPosition(CONFIG.MAP.zoomposition)
  return map
}

function addLayerToMap(layer, map) {
  map.addLayer(layer)
}
function createBackgroundLayer(name) {
  return nlmaps.leaflet.bgLayer(name)
}

function createOverlayLayer(name) {
  return nlmaps.leaflet.overlayLayer(name)
}

function createMarkerLayer(latLngObject) {
  return nlmaps.leaflet.markerLayer(latLngObject)
}

function getMapCenter(map) {
  return centerL(map)
}

function mergeOpts(defaultopts, useropts) {
  return Object.assign({}, defaultopts, useropts)
}

nlmaps.lib = testWhichLib()

nlmaps.createMap = function (useropts = {}) {
  const opts = mergeOpts(CONFIG.MAP, useropts)
  try {
    if (nlmaps.lib !== 'leaflet') {
      throw {
        message:
          'NL Maps supports only Leaflet at the moment. Please include Leaflet in your project.',
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message)
  }
  const map = initMap(opts)
  // Background layer
  const backgroundLayer = createBackgroundLayer(opts.style)
  addLayerToMap(backgroundLayer, map)

  // Geocoder
  if (opts.search) {
    addGeocoderControlToMap(map)
  }

  // Marker layer
  if (opts.marker) {
    let markerLocation = opts.marker
    if (typeof opts.marker === 'boolean') {
      markerLocation = getMapCenter(map)
    }
    let marker = createMarkerLayer(markerLocation)

    markerStore.addMarker(marker, true)
    addLayerToMap(marker, map)
  }

  // Overlay layer
  if (opts.overlay && opts.overlay !== 'false') {
    const overlayLayer = createOverlayLayer(opts.overlay)
    addLayerToMap(overlayLayer, map)
  }
  //add click event passing through L click event
  if (map !== undefined) {
    if (nlmaps.lib === 'leaflet') {
      map.on('click', function (e) {
        nlmaps.emit('mapclick', e)
      })
    }
  }
  return map
}

function addGeoLocControlToMap(geolocator, map) {
  nlmaps.leaflet.geoLocatorControl(geolocator).addTo(map)
}

function addGeocoderControlToMap(map) {
  nlmaps.leaflet.geocoderControl(map, nlmaps)
}

nlmaps.geoLocate = function (map, useropts = {}) {
  const opts = mergeOpts(geoLocateDefaultOpts, useropts)
  const geolocator = geoLocator(opts)
  addGeoLocControlToMap(geolocator, map)
}

nlmaps.clickProvider = function (map) {
  if (nlmaps.lib === 'leaflet') {
    mapPointerStyle(map)
    const clickSource = function (start, sink) {
      if (start !== 0) return
      map.on('click', function (e) {
        sink(1, e)
      })
      const talkback = () => {}
      sink(0, talkback)
    }
    clickSource.subscribe = function (callback) {
      clickSource(0, callback)
    }
    return clickSource
  }
}

nlmaps.queryFeatures = queryFeatures
nlmaps.singleMarker = singleMarker
nlmaps.multiMarker = multiMarker

export { nlmaps }

if (typeof window !== 'undefined') {
  window.nlmaps = nlmaps
}
