<template>
  <div :id="mapId" class="map"></div>
</template>

<script>
import { ref } from 'vue'

const map = ref(null)

export default {
  props: {
    mapOptions: {
      type: Object,
      required: true,
      default: () => {
        return {
          backgroundLayerName: 'standaard',
          geocoder: false,
          marker: false,
          overlay: 'false',
        }
      },
    },
    viewPort: {
      type: Object,
      required: true,
      default: () => {
        return {
          lng: 5.9699,
          lat: 52.2112,
          zoom: 10,
        }
      },
    },
  },
  data() {
    return {
      map: null,
      mapId: 'leaflet',
      mapInstance: null,
      nlmaps: null,
    }
  },
  methods: {
    initMap() {
      const { lng, lat, zoom } = this.viewPort
      if (this.mapInstance) {
        this.mapInstance.remove()
        this.mapInstance = null
        const geocodercontrol = document.getElementsByClassName(
          'nlmaps-geocoder-control-container',
        )
        if (geocodercontrol.length > 0) {
          geocodercontrol[0].remove()
        }
      }
      const leafletMap = L.map(this.mapId).setView([lat, lng], zoom)
      leafletMap.attributionControl.setPrefix('')
      var layer = bgLayer(this.mapOptions.backgroundLayerName)
      layer.addTo(leafletMap)

      if (this.mapOptions.overlay !== 'false') {
        var wms = overlayLayer(this.mapOptions.overlay)
        wms.addTo(leafletMap)
      }
      var marker = null
      if (this.mapOptions.marker) {
        marker = markerLayer({ longitude: lng, latitude: lat })
        marker.addTo(leafletMap)
      }

      if (this.mapOptions.geocoder) {
        const searchControl = geocoderControl(leafletMap)
      }

      const updateLocation = () => {
        this.$emit('update:viewPort', this.getLocation())
        if (marker) {
          marker.setLatLng(this.mapInstance.getCenter()).update()
        }
      }

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
  async mounted() {
    if (typeof window !== 'undefined') {
      const L = (await import('leaflet')).default
      const nlmaps = await import('@geo-frontend/nlmaps-leaflet')
      this.nlmaps = nlmaps
      const { lng, lat, zoom } = this.viewPort
      this.initMap()
    }
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
