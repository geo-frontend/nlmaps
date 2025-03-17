import { getMarker, mapPointerStyle } from './index.js'
let markerStore = {
  markers: [],
  removeMarker: function (marker) {
    let idx = markerStore.markers.findIndex((x) => x === marker)
    markerStore.markers[idx].remove()
    markerStore.markers.splice(idx, 1)
  },
  addMarker: function (marker, remove = false) {
    markerStore.markers.push(marker)
    if (Object.hasOwn(marker, 'on')) {
      if (remove) {
        marker.on('click', function () {
          markerStore.removeMarker(marker)
        })
      }
    }
  }
}

function createAndAddMarker(map, d, popupCreator, unclickable) {
  let newmarker = L.marker([d.latlng.lat, d.latlng.lng], {
    alt: 'marker',
    icon: new L.icon({
      iconUrl: getMarker().url,
      iconSize: getMarker().iconSize,
      iconAnchor: getMarker().iconAnchor
    })
  })
  newmarker.addTo(map)
  if (popupCreator) {
    let div = popupCreator.call(markerStore, d, newmarker)
    let popup = L.popup({ offset: [0, -50] }).setContent(div)
    newmarker.bindPopup(popup).openPopup()
    markerStore.addMarker(newmarker)
  } else if (unclickable) {
    markerStore.addMarker(newmarker)
  } else {
    markerStore.addMarker(newmarker, true)
  }
}
//TODO: discuss the various function parameters
function singleMarker(map, popupCreator) {
  mapPointerStyle(map)
  return (t, d, p, u) => {
    if (t === 1) {
      if (markerStore.markers[0]) {
        markerStore.removeMarker(markerStore.markers[0])
      }
      createAndAddMarker(map, d, popupCreator, u)
    }
  }
}

function multiMarker(map, popupCreator, unclickable) {
  mapPointerStyle(map)
  return (t, d) => {
    if (t === 1) {
      createAndAddMarker(map, d, popupCreator, unclickable)
    }
  }
}

export { singleMarker, multiMarker, markerStore }
