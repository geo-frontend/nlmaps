let marker = {};

function singleClick(e) {
  if (marker.marker) {
    marker.marker.remove();
    if (spatialEq(marker.marker._latlng, e )) {
      return;
    }
  }
  let newmarker = L.marker([e.lat,e.lng]);
  marker.marker = newmarker;
  marker.marker.addTo(map);
  let button = document.createElement('button');
  button.innerHTML = 'remove'
  button.addEventListener('click',function(e) {
    marker.marker.remove();
    delete marker.marker;
  })
  marker.marker.bindPopup(button);


}

function multiClick(e) {
  if (marker.markers && marker.markers.length > 0) {
    let hasSameLoc = marker.markers.find(el => spatialEq(el._latlng, e)) // any one has same location as new click?  
    if (typeof hasSameLoc !== 'undefined') {
      return;
    }

  }
}

function spatialEq(o, n){
 if (distance([o.lat, o.lng],[n.lat, n.lng], {units: 'kilometers'}) < 0.001) {
  return true;
 } else {
  return false;
 }
}

export { singleClick };
