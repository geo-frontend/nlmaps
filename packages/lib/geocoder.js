import "babel-polyfill";
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
    parseClasses(container,CONFIG.CLASSNAMES.geocoderContainer);
    const searchDiv = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');
    const results = document.createElement('div');
    parseClasses(searchDiv,CONFIG.CLASSNAMES.geocoderSearch);
    container.addEventListener('click', e => e.stopPropagation());
    container.addEventListener('dblclick', e => e.stopPropagation());
    input.id = 'nlmaps-geocoder-control-input';
    input.placeholder = 'Zoomen naar adres...';
    input.setAttribute('aria-label', 'Zoomen naar adres');
    input.setAttribute('type','text');
    input.setAttribute('autocapitalize','off');
    input.setAttribute('autocomplete','off');
    input.setAttribute('autocorrect','off');
    input.setAttribute('spellcheck','false');

    input.addEventListener('input', (e) => {
        this.suggest(e.target.value);
    });

    input.addEventListener('focus', (e) => {
        this.suggest(e.target.value);
    });
    button.setAttribute('type','submit');
    searchDiv.addEventListener('submit',(e)=>{
        e.preventDefault();
        if(this.results.length>0) {
            this.lookup(this.results[0])
        }
    })
    button.setAttribute('aria-label', 'Zoomen naar adres');
    parseClasses(button,CONFIG.CLASSNAMES.geocoderButton);

    results.id = 'nlmaps-geocoder-control-results';
    parseClasses(results,CONFIG.CLASSNAMES.geocoderResultList);
    results.classList.add('nlmaps-hidden');
    container.appendChild(searchDiv);
    searchDiv.appendChild(input);
    searchDiv.appendChild(button);
    container.appendChild(results);

    return container;
}

geocoder.suggest = function(query) {
    if (query.length < 3) {
        this.clearSuggestResults();
        return;
    }

    this.doSuggestRequest(query).then((results) => {
        this.results = results.response.docs.map(r=>r.id)
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
    document.getElementById('nlmaps-geocoder-control-results').classList.add('nlmaps-hidden');

}

geocoder.showLookupResult = function(name) {
    document.getElementById('nlmaps-geocoder-control-input').value = name;
}

function parseClasses(el,classes) {
    classes.forEach(classname => {
        el.classList.add(classname);
    });
}

geocoder.showSuggestResults = function(results) {
    this.clearSuggestResults();
    if (results.length > 0) {
        const resultList = document.createElement('ul');
        results.forEach((result) => {

            const li = document.createElement('li');
            const a = document.createElement('a');
            a.innerHTML = result.weergavenaam;
            a.id = result.id;
            parseClasses(a,CONFIG.CLASSNAMES.geocoderResultItem);
            a.setAttribute('href','#');
            a.addEventListener('click', (e) => {
                e.preventDefault();
                this.lookup(e.target.id);
            });
            li.appendChild(a);
            resultList.appendChild(li);
        });
        document.getElementById('nlmaps-geocoder-control-results').classList.remove('nlmaps-hidden');
        document.getElementById('nlmaps-geocoder-control-results').appendChild(resultList);
    }



}

export { geocoder };