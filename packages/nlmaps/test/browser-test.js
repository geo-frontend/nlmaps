/* eslint-disable no-console */
let map = nlmaps.createMap({target: 'mapdiv'})


function myHandler(t, d) {
 if (t === 1 ){
  console.log(d);
  }
}

let click = nlmaps.clickprovider(map);
click(0, myHandler);


let transform = nlmaps.featureQuery('https://api.data.amsterdam.nl/bag/nummeraanduiding/?format=json&locatie=');
let transformedClicks = transform(click);
transformedClicks(0, myHandler);



