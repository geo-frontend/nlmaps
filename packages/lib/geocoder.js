const geocoder = {
    suggestUrl: 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?',
    lookupUrl: 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?'
};

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
    const searchDiv = document.createElement('div');
    const input = document.createElement('input');
    const results = document.createElement('div');
    const controlWidth = '300px'

    container.style.width = controlWidth;
    container.style.zIndex = 1000000;
    container.style.position = 'absolute';
    container.style.top = '70px';
    container.style.left = '12px';
    input.id = 'nlmaps-geocoder-control-input';
    input.placeholder = 'Zoeken op adres...'
    input.style.padding = '4px 10px';
    input.style.width = '100%';
    input.style.border = 'none';
    input.style.backgroundColor = '#fff';
    input.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
    input.style.height = '26px';
    input.style.borderRadius = '5px 5px';

    input.addEventListener('input', (e) => {
        this.suggest(e.target.value);
    });

    input.addEventListener('focus', (e) => {
        this.suggest(e.target.value);
    });
    results.id = 'nlmaps-geocoder-control-results';
    results.style.width = controlWidth;

    container.appendChild(searchDiv);
    searchDiv.appendChild(input);
    container.appendChild(results);

    return container;
}

geocoder.suggest = function(query) {
    console.log('suggesting');
    if (query.length < 4) {
        this.clearSuggestResults();
        return;
    }

    this.doSuggestRequest(query).then((results) => {
        this.showSuggestResults(results.response.docs);
    });
}

geocoder.lookup = function (id) {
    console.log('doing lookup')
    this.doLookupRequest(id).then((result) => {
        console.log('1 more lookup')
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
    console.log('show suggest result');
    const resultList = document.createElement('ul');
    resultList.style.padding = '10px 10px 2px 10px';
    resultList.style.width = '100%';
    resultList.style.background = '#FFFFFF';
    resultList.style.borderRadius = '5px 5px';
    resultList.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';

    results.forEach((result) => {
        console.log('show suggest result for loop');

        const li = document.createElement('li');
        li.innerHTML = result.weergavenaam;
        li.id = result.id;
        li.style.cursor = 'pointer';
        li.style.padding = '5px';
        li.style.listStyleType = 'none';
        li.style.marginBottom = '5px';
        li.addEventListener('click', (e) => {
            console.log(e.target.id, 'Lookup id');
            this.lookup(e.target.id);
        });

        li.addEventListener('mouseenter', () => {
            li.style.background = '#6C62A6';
            li.style.color = '#FFFFFF';
        });

        li.addEventListener('mouseleave', () => {
            li.style.background = '#FFFFFF';
            li.style.color = '#333';
        });
        resultList.appendChild(li);
    });
    this.clearSuggestResults();
    document.getElementById('nlmaps-geocoder-control-results').appendChild(resultList);
}

export { geocoder };