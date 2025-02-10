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
  },
  data() {
    return {
      mapId: 'leaflet',
      mapInstance: null,
    }
  },
  methods: {
    initMap() {
      if (this.mapInstance) {
        this.mapInstance.remove()
      }
      const leafletMap = L.map(this.mapId).setView([52, 5], 10)
      var layer = bgLayer(this.bgmap).addTo(leafletMap)
      this.mapInstance = leafletMap
    },
    updateBgMap(style) {
      if (this.mapInstance) {
        bgLayer(style).addTo(this.mapInstance)
        console.log(this.bgmap)
      }
    },
  },
  mounted() {
    this.initMap()
  },
  destroyed() {
    if (this.mapInstance) {
      this.mapInstance.remove()
    }
  },
  watch: {
    bgmap() {
      //console.log(this.bgmap)
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
