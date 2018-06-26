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

geocoder.resultList = [];
geocoder.selectedResult = -1;
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
    const searchDiv = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');
    const results = document.createElement('div');

    parseClasses(container,CONFIG.CLASSNAMES.geocoderContainer);
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

    input.addEventListener('keydown',(e)=>{
        let results = this.resultList;
        if(this.resultList.length > 0) {
            if(e.code === 'ArrowDown') {
                if(this.selectedResult<this.resultList.length-1) {
                    this.selectedResult++;
                }
                this.showLookupResult(results[this.selectedResult]);

            }
            if(e.code === 'ArrowUp') {
                if(this.selectedResult > 0) {
                    this.selectedResult--;
                }
                this.showLookupResult(results[this.selectedResult]);
            }
            if(e.code === 'Escape') {

                this.clearSuggestResults(true);
            }
        }
    })
    input.addEventListener('input', (e) => {

        this.suggest(e.target.value);
    });
    input.addEventListener('focus', (e) => {
        this.suggest(e.target.value);
    });
    button.setAttribute('type','submit');
    searchDiv.addEventListener('submit',(e)=>{
        e.preventDefault();
        if(this.resultList.length>0) {
            this.lookup(this.resultList[this.selectedResult<0?0:this.selectedResult].id);
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
        this.resultList = results.response.docs;
        this.showSuggestResults(this.resultList);
    });
}

geocoder.lookup = function (id) {
    this.doLookupRequest(id).then((result) => {
        this.zoomTo(result.centroide_ll, this.map);
        this.showLookupResult(result);
        this.clearSuggestResults();
    });
}

geocoder.clearSuggestResults = function(input) {
    this.selectedResult = -1;
    if(input)document.getElementById('nlmaps-geocoder-control-input').value = '';
    document.getElementById('nlmaps-geocoder-control-results').innerHTML = '';
    document.getElementById('nlmaps-geocoder-control-results').classList.add('nlmaps-hidden');

}

geocoder.showLookupResult = function(result) {
    let resultNodes = document.getElementsByClassName(CONFIG.CLASSNAMES.geocoderResultItem)
    Array.prototype.map.call(resultNodes,i=>i.classList.remove(CONFIG.CLASSNAMES.geocoderResultSelected));
    let resultNode = document.getElementById(result.id);
    if(resultNode)resultNode.classList.add(CONFIG.CLASSNAMES.geocoderResultSelected);
    document.getElementById('nlmaps-geocoder-control-input').value = result.weergavenaam;
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