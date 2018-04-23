import { markerUrl } from './index.js';

let markerStore = {};


function singleMarker(map, popupCreator) {
  function removeMarker() {
    markerStore.marker.remove();
    delete markerStore.marker;
  }

  return (t, d) => {
    if (t === 1 ) {
      if (markerStore.marker) {
        markerStore.marker.remove();
      }
      let newmarker = L.marker([d.latlng.lat,d.latlng.lng], {
        alt: 'marker',
        icon: new L.icon({
          iconUrl: markerUrl,
          iconSize: [64, 64],
          iconAnchor: [32, 63]
        })
      });
      markerStore.marker = newmarker;
      markerStore.marker.addTo(map);
      if (popupCreator) {
        let div = popupCreator.call(this, d);
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
