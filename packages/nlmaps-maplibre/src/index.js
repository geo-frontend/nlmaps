//import { getProvider, getWmsProvider, geocoder, getMarker } from '@geo-frontend/lib'
import { getProvider, getWmsProvider, geocoder, getMarker } from '@geo-frontend/lib'

function bgLayer(name = 'standaard') {
  const provider = getProvider(name)
  const styleJSON = JSON.parse(
    '{"version":8,"name":"nlmaps","sources":{"bg_source":{"type":"raster","tileSize":256,"attribution":"' +
      provider.attribution +
      '","tiles":["' +
      provider.url +
      '"],"maxzoom":' +
      provider.maxZoom +
      ',"minzoom":' +
      provider.minZoom +
      '}},"layers":[{"id":"bg","type":"raster","source":"bg_source","paint":{}}]}'
  )
  return styleJSON
}

class overlayLayer {
  addTo(map) {
    const addLayer = () => {
      if (map.getLayer(this.layerId)) {
        map.removeLayer(this.layerId)
      }
      if (map.getSource(this.sourceId)) {
        map.removeSource(this.sourceId)
      }
      map.addSource(this.sourceId, this.sourceDef)
      map.addLayer(this.layer)
    }

    this._map = map

    addLayer()
    return this
  }

  remove() {
    if (this._map) {
      if (this._map.getLayer(this.layerId)) {
        this._map.removeLayer(this.layerId)
      }
      if (this._map.getSource(this.sourceId)) {
        this._map.removeSource(this.sourceId)
      }
    }
  }

  constructor(name, options) {
    const wmsProvider = getWmsProvider(name, options)
    this.layerId = wmsProvider.name
    this.sourceId = wmsProvider.name + '-source'
    this.sourceDef = {
      type: 'raster',
      tiles: [
        wmsProvider.url +
          'service=WMS&request=GetMap&version=1.3.0&crs=EPSG:3857&transparent=true&width=512&height=512&bbox={bbox-epsg-3857}' +
          '&layers=' +
          wmsProvider.layerName +
          '&styles=' +
          wmsProvider.styleName +
          '&format=' +
          wmsProvider.format +
          '&transparent=' +
          wmsProvider.transparent
      ],
      maxzoom: wmsProvider.maxZoom,
      minzoom: wmsProvider.minZoom
    }
    this.layer = {
      id: this.layerId,
      type: 'raster',
      source: this.sourceId,
      paint: {}
    }
  }
}

function loadImage(svg) {
  const img = new Image(svg.iconSize[0], svg.iconSize[1])
  img.crossOrigin = 'Anonymous'
  return new Promise((resolve) => {
    img.onload = () => {
      img.decode().then(() => resolve(img))
    }
    img.src = svg.url
  })
}

class markerLayer {
  addTo(map) {
    const addLayer = () => {
      if (map.getImage('nlmaps-marker')) {
        map.removeImage('nlmaps-marker')
      }
      if (map.getLayer(this.layerId)) {
        map.removeLayer(this.layerId)
      }
      if (map.getSource(this.sourceId)) {
        map.removeSource(this.sourceId)
      }
      const nlmapsMarker = getMarker(this.options)
      loadImage(nlmapsMarker)
        .then((img) => map.addImage('nlmaps-marker', img))
        .then(() => {
          map.addSource(this.sourceId, this.sourceDef)
          let coordinates = map.getCenter()
          if (this.options && this.options.longitude && this.options.latitude) {
            coordinates = { lng: this.options.longitude, lat: this.options.latitude }
          }
          map.getSource(this.sourceId).setData({
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [coordinates.lng, coordinates.lat]
                }
              }
            ]
          })
          map.addLayer(this.layer)
        })
    }
    this._map = map
    addLayer()
    return this
  }
  constructor(options) {
    this.options = options
    this.layerId = 'marker-layer'
    this.sourceId = 'marker-source'
    this.sourceDef = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    }
    this.layer = {
      id: this.layerId,
      type: 'symbol',
      source: this.sourceId,
      layout: {
        'icon-image': 'nlmaps-marker',
        'icon-anchor': 'bottom'
      }
    }
  }
}

function zoomTo(point, map) {
  map.jumpTo({
    center: point.coordinates,
    zoom: 18
  })
}

class geocoderControl {
  onAdd(map) {
    this._map = map
    this._container = document.createElement('div')
    this._container.className = 'maplibregl-ctrl'
    let control = geocoder.createControl(zoomTo, map)
    this._container.appendChild(control)
    return this._container
  }
  onRemove() {
    this._container.parentNode.removeChild(this._container)
    this._map = undefined
  }
}

export { bgLayer, overlayLayer, markerLayer, geocoderControl }
//export { bgLayer, overlayLayer, markerLayer, getMapCenter, geoLocatorControl, geocoderControl }
