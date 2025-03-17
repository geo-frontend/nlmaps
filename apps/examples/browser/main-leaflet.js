var map = L.map('map-div').setView([52, 5], 10)
map.attributionControl.setPrefix('')

/* eslint-disable no-unused-vars */
var layer = bgLayer().addTo(map)
/* eslint-enable no-unused-vars */

const endpoint = {
  url: 'https://service.pdok.nl/ez/fysischgeografischeregios/wms/v1_0?',
  layerName: 'fysischgeografischeregios',
  styleName: 'fysischgeografischeregios',
}
const overlay = overlayLayer('fysisch-geografische-regios', endpoint)
overlay.setOpacity(0.7)
overlay.addTo(map)
