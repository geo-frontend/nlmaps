import emitonoff from 'emitonoff'
import {
  bgLayer as bgL,
  overlayLayer as overlayL,
  markerLayer as markerL,
  getMapCenter as centerL,
  geocoderControl as geocoderL,
  extentLeafletFormat,
  geoLocatorControl as glL
} from 'nlmaps-leaflet'

import {
  bgLayer as bgOL,
  overlayLayer as overlayOL,
  markerLayer as markerOL,
  getMapCenter as centerOL,
  geocoderControl as geocoderOL,
  geoLocatorControl as glO
} from 'nlmaps-openlayers'

// import { bgLayer as bgL, geoLocatorControl as glL } from 'nlmaps-leaflet';

// import { bgLayer as bgOL,
//          geoLocatorControl as glO } from 'nlmaps-openlayers';

import geoLocator from 'nlmaps-geolocator'
import { singleMarker, multiMarker, markerStore, mapPointerStyle, queryFeatures, CONFIG } from '@geo-frontend/lib'

let nlmaps = {
  leaflet: {
    bgLayer: bgL,
    overlayLayer: overlayL,
    markerLayer: markerL,
    geocoderControl: geocoderL,
    geoLocatorControl: glL
  },
  openlayers: {
    bgLayer: bgOL,
    overlayLayer: overlayOL,
    markerLayer: markerOL,
    geocoderControl: geocoderOL,
    geoLocatorControl: glO
  }
}

//set nlmaps up as event bus
emitonoff(nlmaps)

//for future use
const geoLocateDefaultOpts = {}

function testWhichLib() {
  let defined = []
  if (typeof L === 'object') {
    defined.push('leaflet')
  }
  if (typeof ol === 'object') {
    defined.push('openlayers')
  }
  if (defined.length > 1) {
    return 'too many libs'
  } else if (defined.length === 0) {
    return 'too few libs'
  } else {
    return defined[0]
  }
}

function initMap(lib, opts) {
  let map, rootdiv, el, options
  switch (lib) {
    case 'leaflet':
      //work-around to prevent mapdragging at text selection
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
      map = L.map(el, options).setView([opts.center.latitude, opts.center.longitude], opts.zoom)
      if (opts.attribution) {
        map.attributionControl.setPrefix(false)
      }
      map.zoomControl.setPosition(CONFIG.MAP.zoomposition)
      break
    case 'openlayers':
      map = new ol.Map({
        view: new ol.View({
          center: ol.proj.fromLonLat([opts.center.longitude, opts.center.latitude]),
          zoom: opts.zoom
        }),
        controls: ol.control.defaults({ attribution: false }).extend([new ol.control.Attribution({ collapsible: false })]),
        target: opts.target
      })
      map.getTargetElement().getElementsByClassName('ol-zoom')[0].style.cssText = 'left: 5px !important; bottom: 5px !important'
      map.getTargetElement().getElementsByClassName('ol-zoom')[0].classList.remove('ol-zoom')
      break
  }
  return map
}

// can set center, with optional zoom.
// eslint-disable-next-line no-unused-vars
function setMapLoc(lib, opts, map) {
  let oldZoom
  let view
  switch (lib) {
    case 'leaflet':
      map.panTo([opts.lat, opts.lon])
      if (opts.zoom) {
        map.setZoom(opts.zoom)
      }
      break
    case 'openlayers':
      oldZoom = map.getView().getZoom()
      view = new ol.View({
        center: ol.proj.fromLonLat([opts.lon, opts.lat]),
        zoom: opts.zoom ? opts.zoom : oldZoom
      })
      map.setView(view)
  }
}

function addLayerToMap(lib, layer, map) {
  switch (lib) {
    case 'leaflet':
      map.addLayer(layer)
      break
    case 'openlayers':
      map.addLayer(layer)
      break
  }
}
function createBackgroundLayer(lib, map, name) {
  let bgLayer
  switch (lib) {
    case 'leaflet':
      bgLayer = nlmaps.leaflet.bgLayer(name)
      break
    case 'openlayers':
      bgLayer = nlmaps.openlayers.bgLayer(name)
      break
  }
  return bgLayer
}

function createOverlayLayer(lib, map, name) {
  let overlayLayer
  switch (lib) {
    case 'leaflet':
      overlayLayer = nlmaps.leaflet.overlayLayer(name)
      break
    case 'openlayers':
      overlayLayer = nlmaps.openlayers.overlayLayer(name)
      break
  }
  return overlayLayer
}

function createMarkerLayer(lib, map, latLngObject) {
  let markerLayer
  switch (lib) {
    case 'leaflet':
      markerLayer = nlmaps.leaflet.markerLayer(latLngObject)
      break
    case 'openlayers':
      markerLayer = nlmaps.openlayers.markerLayer(latLngObject)
      break
  }
  return markerLayer
}

function getMapCenter(lib, map) {
  let mapCenter
  switch (lib) {
    case 'leaflet':
      mapCenter = centerL(map)
      break
    case 'openlayers':
      mapCenter = centerOL(map)
      break
  }
  return mapCenter
}

function mergeOpts(defaultopts, useropts) {
  return Object.assign({}, defaultopts, useropts)
}

nlmaps.lib = testWhichLib()

nlmaps.createMap = function (useropts = {}) {
  const opts = mergeOpts(CONFIG.MAP, useropts)
  try {
    if (nlmaps.lib === 'too many libs' || nlmaps.lib === 'too few libs') {
      throw { message: 'one and only one map library can be defined. Please Refer to the documentation to see which map libraries are supported.' }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message)
  }
  const map = initMap(nlmaps.lib, opts)
  // Background layer
  const backgroundLayer = createBackgroundLayer(nlmaps.lib, map, opts.style)
  addLayerToMap(nlmaps.lib, backgroundLayer, map, opts.style)

  // Geocoder
  if (opts.search) {
    addGeocoderControlToMap(nlmaps.lib, map)
  }

  // Marker layer
  if (opts.marker) {
    let markerLocation = opts.marker
    if (typeof opts.marker === 'boolean') {
      markerLocation = getMapCenter(nlmaps.lib, map)
    }
    let marker = createMarkerLayer(nlmaps.lib, map, markerLocation)

    markerStore.addMarker(marker, true)
    addLayerToMap(nlmaps.lib, marker, map)
  }

  // Overlay layer
  if (opts.overlay && opts.overlay !== 'false') {
    const overlayLayer = createOverlayLayer(nlmaps.lib, map, opts.overlay)
    addLayerToMap(nlmaps.lib, overlayLayer, map)
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

function addGeoLocControlToMap(lib, geolocator, map) {
  let control
  switch (lib) {
    case 'leaflet':
      nlmaps[lib].geoLocatorControl(geolocator).addTo(map)
      break
    case 'openlayers':
      control = nlmaps[lib].geoLocatorControl(geolocator, map)
      map.addControl(control)
      break
  }
}

function addGeocoderControlToMap(lib, map) {
  nlmaps[lib].geocoderControl(map, nlmaps)
}

nlmaps.geoLocate = function (map, useropts = {}) {
  const opts = mergeOpts(geoLocateDefaultOpts, useropts)
  const geolocator = geoLocator(opts)
  addGeoLocControlToMap(nlmaps.lib, geolocator, map)
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
