import { getMarker, mapPointerStyle } from './index.js';


let markerStore = {
  markers: [],
  removeMarker: function (marker) {
    let idx = markerStore.markers.findIndex(x => x === marker)
    markerStore.markers[idx].remove();
    markerStore.markers.splice(idx, 1);
  },
  addMarker: function(marker, remove=false) {
    markerStore.markers.push(marker);
    if (remove) {
        marker.on('click', function() {
         markerStore.removeMarker(marker);
        })
    }
  }
};

function singleMarker(map, popupCreator) {
  mapPointerStyle(map);
  return (t, d) => {
    if (t === 1 ) {
      if (markerStore.markers[0]) {
        markerStore.removeMarker(markerStore.markers[0]);
      }
      let newmarker = L.marker([d.latlng.lat,d.latlng.lng], {
        alt: 'marker',
        icon: new L.icon({
          iconUrl: getMarker().url,
          iconSize: getMarker().iconSize,
          iconAnchor: getMarker().iconAnchor
        })
      });
      markerStore.addMarker(newmarker);
      newmarker.addTo(map);
      if (popupCreator) {
        let div = popupCreator.call(markerStore, d, newmarker);
        let popup = L.popup({offset: [0,-50]})
          .setContent(div)
        newmarker.bindPopup(popup).openPopup();
      }
    }
  }
}

function multiMarker(map, popupCreator) {
  mapPointerStyle(map);
  return (t, d) => {
    if (t === 1 ) {
      let newmarker = L.marker([d.latlng.lat,d.latlng.lng], {
        alt: 'marker',
        icon: new L.icon({
          iconUrl: getMarker().url,
          iconSize: getMarker().iconSize,
          iconAnchor: getMarker().iconAnchor
        })
      });
      markerStore.addMarker(newmarker);
      newmarker.addTo(map);
      if (popupCreator) {
        let div = popupCreator.call(markerStore, d, newmarker);
        let popup = L.popup({offset: [0,-50]})
          .setContent(div)
        newmarker.bindPopup(popup).openPopup();
      } else {
        newmarker.on('click', function() {
          markerStore.removeMarker(newmarker);
        })
      }
      
    }
  }

}

export { singleMarker, multiMarker, markerStore };
