<template>
  <div :id="mapId" class="map"></div>
</template>

<script>
import L from 'leaflet'
import { bgLayer, overlayLayer } from 'nlmaps-leaflet'
export default {
  props: {
    mapOptions: {
      type: Object,
      required: true,
      default: () => {
        return {
          backgroundLayerName: 'standaard',
          overlay: 'false',
        }
      },
    },
    viewPort: {
      type: Object,
      required: true,
      default: () => {
        return {
          lng: 5,
          lat: 52,
          zoom: 10,
        }
      },
    },
  },
  data() {
    return {
      mapId: 'leaflet',
      mapInstance: null,
    }
  },
  methods: {
    initMap() {
      const { lng, lat, zoom } = this.viewPort
      if (this.mapInstance) {
        this.mapInstance.remove()
        this.mapInstance = null
      }
      const leafletMap = L.map(this.mapId).setView([lat, lng], zoom)
      var layer = bgLayer(this.mapOptions.backgroundLayerName)
      layer.addTo(leafletMap)

      if (this.mapOptions.overlay !== 'false') {
        var wms = overlayLayer(this.mapOptions.overlay)
        wms.addTo(leafletMap)
      }

      const updateLocation = () =>
        this.$emit('update:viewPort', this.getLocation())

      leafletMap.on('move', updateLocation)
      leafletMap.on('zoom', updateLocation)

      this.mapInstance = leafletMap
    },
    getLocation() {
      return {
        ...this.mapInstance.getCenter(),
        zoom: this.mapInstance.getZoom(),
      }
    },
  },
  mounted() {
    const { lng, lat, zoom } = this.viewPort
    this.initMap()
  },
  unmounted() {
    if (this.mapInstance) {
      this.mapInstance.remove()
      this.mapInstance = null
    }
  },
  watch: {
    mapOptions: {
      handler() {
        this.initMap()
      },
      deep: true,
    },
  },
}
</script>

<style>
@import 'leaflet/dist/leaflet.css';
.map {
  /* position: relative;
  display: block; */
  width: 100%;
  height: 30vh;
  padding: 0px;
  margin: 0px;
  /* overflow: hidden; */
}
</style>
