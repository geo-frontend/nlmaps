import {CONFIG} from './configParser';
const geocoder = CONFIG.GEOCODER;

function httpGetAsync(url) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            // eslint-disable-next-line eqeqeq
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
geocoder.doSuggestRequest = function(searchTerm) {
    return httpGetAsync(`${this.suggestUrl}q=${encodeURIComponent(searchTerm)}`);
}

/**
 * Make a call to PDOK locatieserver v3 lookup service. This service provides information about objects found through the suggest service. For additional
 * documentation, check: https://github.com/PDOK/locatieserver/wiki/API-Locatieserver
 * @param {string} id The id of the feature that is to be looked up.
 */
geocoder.doLookupRequest = function(id) {
    return httpGetAsync(`${this.lookupUrl}id=${encodeURIComponent(id)}`).then((lookupResult) => {
        // A lookup request should always return 1 result
        const geocodeResult = lookupResult.response.docs[0];
        geocodeResult.centroide_ll = wktPointToGeoJson(geocodeResult.centroide_ll);
        geocodeResult.centroide_rd = wktPointToGeoJson(geocodeResult.centroide_rd);
        return geocodeResult;
    });
}


geocoder.createControl = function(zoomFunction, map) {
    this.zoomTo = zoomFunction;
    this.map = map;
    const container = document.createElement('div');
    container.className = 'nlmaps-geocoder-control-container';
    const searchDiv = document.createElement('div');
    const input = document.createElement('input');
    const results = document.createElement('div');
    
    input.id = 'nlmaps-geocoder-control-input';
    input.placeholder = 'Zoeken op adres...'

    input.addEventListener('input', (e) => {
        this.suggest(e.target.value);
    });

    input.addEventListener('focus', (e) => {
        this.suggest(e.target.value);
    });
    results.id = 'nlmaps-geocoder-control-results';    

    container.appendChild(searchDiv);
    searchDiv.appendChild(input);
    container.appendChild(results);

    return container;
}

geocoder.suggest = function(query) {
    if (query.length < 4) {
        this.clearSuggestResults();
        return;
    }

    this.doSuggestRequest(query).then((results) => {
        this.showSuggestResults(results.response.docs);
    });
}

geocoder.lookup = function (id) {
    this.doLookupRequest(id).then((result) => {
        this.zoomTo(result.centroide_ll, this.map);
        this.showLookupResult(result.weergavenaam);
        this.clearSuggestResults();
    });
}

geocoder.clearSuggestResults = function() {
    document.getElementById('nlmaps-geocoder-control-results').innerHTML = '';
}

geocoder.showLookupResult = function(name) {
    document.getElementById('nlmaps-geocoder-control-input').value = name;
}

geocoder.showSuggestResults = function(results) {
    const resultList = document.createElement('ul');
    resultList.className = 'nlmaps-geocoder-result-list';
    results.forEach((result) => {

        const li = document.createElement('li');
        li.innerHTML = result.weergavenaam;
        li.id = result.id;
       
        li.addEventListener('click', (e) => {
            this.lookup(e.target.id);
        });

        resultList.appendChild(li);
    });
    this.clearSuggestResults();
    document.getElementById('nlmaps-geocoder-control-results').appendChild(resultList);
}

export { geocoder };