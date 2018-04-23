/* eslint-disable no-console */
let map = nlmaps.createMap({target: 'mapdiv', marker: true, search: true})


function myHandler(t, d) {
 if (t === 1 ){
   console.log('The click happened at: ')
  console.log(d);
  }
}

let clicks = nlmaps.clickprovider(map);
//let singleMarker = nlmaps.singleClick(map, markerCreator);
let singleMarker = nlmaps.singleClick(map)


proj4.defs("EPSG:28992","+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs");

const transformCoords = proj4(proj4.defs('EPSG:4326'), proj4.defs('EPSG:28992'));

function requestFormatter(baseUrl, xy) {
  let xyRD = transformCoords.forward(xy);
  return `${baseUrl}${xyRD.x},${xyRD.y},10`
}

function responseFormatter(res) {
  let filtered = res.results.filter(x => x.hoofdadres === true);
  return filtered.length > 0 ? filtered[0] : null;
}


let featureQuery = nlmaps.queryFeatures(clicks, requestFormatter, responseFormatter);


featureQuery.subscribe(singleMarker)

clicks.subscribe(myHandler)


