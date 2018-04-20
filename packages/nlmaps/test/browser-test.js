/* eslint-disable no-console */
let map = nlmaps.createMap({target: 'mapdiv'})


function myHandler(t, d) {
 if (t === 1 ){
  console.log(d);
  }
}

let click = nlmaps.clickprovider(map);
click(0, myHandler);


let transform = nlmaps.queryFeatures();
let transformedClicks = transform(click);
transformedClicks(0, myHandler);



