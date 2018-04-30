import { getMarker } from './index.js';

let markerStore = {};


function singleClick(map) {
  return function singleMarker(t, d) {
    if (t === 1 ) {
      if (markerStore.marker) {
        markerStore.marker.remove();
//        if (spatialEq(marker.marker._latlng, d.latlng )) {
//          return;
//        }
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
      let div = document.createElement('div');
      let button = document.createElement('button');
      let p = document.createElement('p');
      if (d.queryResult !== null) {
        p.innerText = d.queryResult._display;
      } else {
        p.innerText = 'geen zoekresultaten'
      }
      div.append(p);
      button.innerHTML = 'verwijder'
        button.addEventListener('click',function(e) {
          markerStore.marker.remove();
          delete markerStore.marker;
        })
      div.append(button);
      let popup = L.popup({offset: [0,-50]})
        .setContent(div)
      markerStore.marker.bindPopup(popup).openPopup();
    }
  }
}

function multiClick(e) {
  if (markerStore.markers && markerStore.markers.length > 0) {
    let hasSameLoc = markerStore.markers.find(el => spatialEq(el._latlng, e)) // any one has same location as new click?  
    if (typeof hasSameLoc !== 'undefined') {
      return;
    }

  }
}

//function spatialEq(o, n){
 //if (distance([o.lat, o.lng],[n.lat, n.lng], {units: 'kilometers'}) < 0.001) {
  //return true;
 //} else {
  //return false;
 //}
//}


export { singleClick, markerStore };
