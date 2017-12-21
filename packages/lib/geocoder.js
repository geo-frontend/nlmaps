const geocoder = {
    suggestUrl: 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?',
    lookupUrl: 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?'
};

function httpGetAsync(url) {
    return new Promise((resolve, reject) => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                resolve(JSON.parse(xmlHttp.responseText));  
            }
        }
        xmlHttp.open("GET", url, true); // true for asynchronous 
        xmlHttp.send(null);
    });
}

function wktPointToGeoJson(wktPoint) {
    if (!wktPoint.includes('POINT')) {
        throw TypeError('Provided WKT geometry is not a point.');
    }
    const coordinateTuple = wktPoint.split('(')[1].split(')')[0];
    const x = parseFloat(coordinateTuple.split(' ')[0]);
    const y = parseFloat(coordinateTuple.split(' ')[1]);

    return { 
        type: 'Point',
        coordinates: [x,y]
    }

}

/**
 * Make a call to PDOK locatieserver v3 suggest service. This service is meant for geocoder autocomplete functionality. For
 * additional documentation, check https://github.com/PDOK/locatieserver/wiki/API-Locatieserver.
 * @param {string} searchTerm The term which to search for
 */
geocoder.suggest = function(searchTerm) {
    return httpGetAsync(`${this.suggestUrl}q=${encodeURIComponent(searchTerm)}`);
}

/**
 * Make a call to PDOK locatieserver v3 lookup service. This service provides information about objects found through the suggest service. For additional 
 * documentation, check: https://github.com/PDOK/locatieserver/wiki/API-Locatieserver
 * @param {string} id The id of the feature that is to be looked up.
 */
geocoder.lookup = function(id) {
    return httpGetAsync(`${this.lookupUrl}id=${encodeURIComponent(id)}`).then((lookupResult) => {
        // A lookup request should always return 1 result
        const geocodeResult = lookupResult.response.docs[0];
        geocodeResult.centroide_ll = wktPointToGeoJson(geocodeResult.centroide_ll);
        geocodeResult.centroide_rd = wktPointToGeoJson(geocodeResult.centroide_rd);
        return geocodeResult;
    });
}

export { geocoder };