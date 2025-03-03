//import { getProvider, getWmsProvider, geocoder, getMarker } from '@geo-frontend/lib'
import { getProvider, getWmsProvider } from '@geo-frontend/lib'

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

export { bgLayer, overlayLayer }
//export { bgLayer, overlayLayer, markerLayer, getMapCenter, geoLocatorControl, geocoderControl }
