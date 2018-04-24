/* eslint-disable no-console */
let map = nlmaps.createMap({target: 'mapdiv', marker: true, search: true})

function myHandler(t, d) {
 if (t === 1 ){
   console.log('The click happened at: ')
  console.log(d);
  }
}

function popupCreator(d) {
  let div = document.createElement('div');
  let button = document.createElement('button');
  let p = document.createElement('p');
  if (d.queryResult !== null) {
    p.innerText = d.queryResult._display;
  } else {
    p.innerText = 'geen zoekresultaten'
  }
  div.append(p);
  button.innerHTML = 'verwijder';
  function removeMarker () {
    this.removeMarker()
  };
  button.addEventListener('click', removeMarker.bind(this))
  div.append(button);
  return div;
}
/* eslint-disable-next-line max-len */
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
let clicks = nlmaps.clickprovider(map);

function popupCreator(d) {
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
    button.addEventListener('click',function() {
      this.removeMarker();
    })
  div.append(button);
  return div;
}

let singleMarker = nlmaps.singleMarker(map)


/* eslint-disable-next-line max-len */
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


let singleMarker =  new nlmaps.singleMarker(map, popupCreator)
let featureQuery = amaps.queryFeatures(clicks, requestFormatter, responseFormatter);
featureQuery.subscribe(singleMarker)

featureQuery.subscribe(myHandler)


