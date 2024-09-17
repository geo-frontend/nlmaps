import { CONFIG } from "./configParser.js";
function query(url) {
  const promise = new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
  return promise;
}

//transforming operator
//returns an object with original latlng and queryResult:
// {
//   queryResult: {},
//   latlng: d.latlng
// }
// user-supplied responseFormatter is used to create queryResult.
const pointToQuery = (url, requestFormatter, responseFormatter) => (inputSource) => {
  return function outputSource(start, outputSink) {
    if (start !== 0) return;
    inputSource(0, (t, d) => {
      if (t === 1) {
        let queryUrl = requestFormatter(url, { x: d.latlng.lng, y: d.latlng.lat });
        query(queryUrl).then((res) => {
          let output = {
            queryResult: responseFormatter(res),
            latlng: d.latlng
          };
          outputSink(1, output);
        });
      } else {
        outputSink(t, d);
      }
    });
  };
};

//constructor to create a 'clickpricker' in one go.
const queryFeatures = function (source, baseUrl, requestFormatter, responseFormatter) {
  const querier = pointToQuery(baseUrl, requestFormatter, responseFormatter)(source);
  querier.subscribe = function (callback) {
    querier(0, callback);
  };
  return querier;
};

export { queryFeatures, pointToQuery };
