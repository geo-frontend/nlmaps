const mapOptions = {
  target: 'map-div',
  center: { latitude: 52.379189, longitude: 4.899431 },
  zoom: 10,
  style: 'pastel',
  search: true,
  marker: true,
  overlay: 'gemeenten',
}

const map = nlmaps.createMap(mapOptions)
