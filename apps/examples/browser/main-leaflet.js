const map = L.map('map-div').setView([52, 5], 10)
map.attributionControl.setPrefix('')

const layer = bgLayer().addTo(map)

const endpoint = {
  url: 'https://service.pdok.nl/ez/fysischgeografischeregios/wms/v1_0?',
  layerName: 'fysischgeografischeregios',
  styleName: 'fysischgeografischeregios',
}
const overlay = overlayLayer('fysisch-geografische-regios', endpoint)
overlay.setOpacity(0.7)
overlay.addTo(map)
