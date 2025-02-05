<template>
  <div :id="mapId" class="map"></div>
</template>

<script>
import L from 'leaflet'
import { bgLayer } from 'nlmaps-leaflet'
export default {
  data() {
    return {
      mapId: 'leaflet',
      mapInstance: null,
    }
  },
  methods: {
    initMap() {
      const leafletMap = L.map(this.mapId).setView([52, 5], 10)
      var layer = bgLayer().addTo(leafletMap)
      this.mapInstance = leafletMap
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
