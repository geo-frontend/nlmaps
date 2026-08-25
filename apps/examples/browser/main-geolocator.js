const map = L.map('map-div').setView([52, 5], 10)
map.attributionControl.setPrefix('')

const layer = bgLayer().addTo(map)

const geo = geoLocator()
geoLocatorControl(geo).addTo(map)
