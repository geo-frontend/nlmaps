import { getMarker } from './index.js';

let markerStore = {
  removeMarker: function () {
    markerStore.marker.remove();
    delete markerStore.marker;
  }
};

function singleMarker(map, popupCreator) {
  return (t, d) => {
    if (t === 1 ) {
      if (markerStore.marker) {
        markerStore.marker.remove();
      }
      let newmarker = L.marker([d.latlng.lat,d.latlng.lng], {
        alt: 'marker',
        icon: new L.icon({
          iconUrl: getMarker().url,
          iconSize: [64, 64],
          iconAnchor: [32, 63]
        })
      });
      markerStore.marker = newmarker;
      markerStore.marker.addTo(map);
      if (popupCreator) {
        let div = popupCreator.call(markerStore, d);
        let popup = L.popup({offset: [0,-50]})
          .setContent(div)
        markerStore.marker.bindPopup(popup).openPopup();
      } else {
        markerStore.marker.on('click', function() {
          removeMarker();
        })
      }
    }
  }
}

function multiMarker(e) {
  if (markerStore.markers && markerStore.markers.length > 0) {
    let hasSameLoc = markerStore.markers.find(el => spatialEq(el._latlng, e)) // any one has same location as new click?  
    if (typeof hasSameLoc !== 'undefined') {
      return;
    }

  }
}

export { singleMarker, markerStore };
