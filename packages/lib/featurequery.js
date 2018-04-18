import proj4 from '../../node_modules/proj4';
function query(url) {
  const promise = new Promise((resolve, reject) => {
    fetch(url)
      .then(res => resolve(res.json()))
      .catch(err => reject(err))
  })
  return promise;

}

proj4.defs("EPSG:28992","+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs");

const trc = proj4(proj4.defs('EPSG:4326'), proj4.defs('EPSG:28992'));

function formatQueryURL(baseUrl, xy) {
  return `${baseUrl}${xy.x},${xy.y},10`
}

function handleQueryResponse(res) {
  let filtered = res.results.filter(x => x.hoofdadres === true);
  if (filtered.length > 0) {
    return filtered[0];
  } else {
    return null
  }
}

const transform = url => inputSource => {
  return function outputSource (start, outputSink) {
    if (start !== 0 ) return;
    inputSource(0, (t, d) => {
      if (t === 1) {
        let xyRD = trc.forward({x: d.latlng.lng, y: d.latlng.lat});
        query(formatQueryURL(url, xyRD)).then(res => {
          let output = handleQueryResponse(res);
          outputSink(1, output);
        })
      } else {
        outputSink(t, d)
      }  
    })
  }
}

const queryFeatures = (map, url) => {
  //constructor to create a 'clickpricker' in one go.

}


export default transform;
