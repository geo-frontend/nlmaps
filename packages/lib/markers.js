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
      let newmarker = L.marker([d.latlng.lat,d.latlng.lng]);
      markerStore.marker = newmarker;
      markerStore.marker.addTo(map);
      let div = document.createElement('div');
      let button = document.createElement('button');
      if (d.queryResult !== null) {
        let p = document.createElement('p');
        p.innerText = d.queryResult._display;
        div.append(p);
      }
      button.innerHTML = 'remove'
        button.addEventListener('click',function(e) {
          markerStore.marker.remove();
          delete markerStore.marker;
        })
      div.append(button);
      markerStore.marker.bindPopup(div).openPopup();
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
