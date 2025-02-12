<template>
  <div :id="mapId" class="map"></div>
</template>

<script>
import L from 'leaflet'
import { bgLayer } from 'nlmaps-leaflet'
export default {
  props: {
    bgmap: {
      type: String,
      required: true,
      default: 'standaard',
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
      }
      const leafletMap = L.map(this.mapId).setView([lat, lng], zoom)
      var layer = bgLayer(this.bgmap).addTo(leafletMap)
      const updateLocation = () =>
        this.$emit('update:viewPort', this.getLocation())

      leafletMap.on('move', updateLocation)
      leafletMap.on('zoom', updateLocation)

      this.mapInstance = leafletMap
    },
    updateBgMap(style) {
      if (this.mapInstance) {
        bgLayer(style).addTo(this.mapInstance)
      }
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
  destroyed() {
    if (this.mapInstance) {
      this.mapInstance.remove()
    }
  },
  watch: {
    bgmap() {
      this.initMap()
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
