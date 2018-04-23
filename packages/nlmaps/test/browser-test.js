/* eslint-disable no-console */
let map = nlmaps.createMap({target: 'mapdiv', marker: true, search: true})


function myHandler(t, d) {
 if (t === 1 ){
   console.log('my special handler says: ')
  console.log(d);
  }
}

let clicks = nlmaps.clickprovider(map);
let singleMarker = nlmaps.singleClick(map);
let featureQuery = nlmaps.queryFeatures(clicks);

featureQuery.subscribe(singleMarker)

clicks.subscribe(myHandler)


