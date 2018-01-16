# NL Maps

**Inhoud**

* [Doel](#doel)
* [Gebruiksvoorbeeld](#gebruiksvoorbeeld)
* [Opzetten](#opzetten)
* [API documentatie](#api-documentatie)
* [Geavanceerd gebruik](#geavanceerd-gebruik)
* [Ruwe tegel URL's](#ruwe-tegel-urls)
* [Ontwikkelen](#ontwikkelen)

## Doel

Met de `nlmaps` JavaScript bibliotheek kun je kaartlagen van de BRT-Achtergrondkaart maken voor Leaflet, Google Maps, Mapbox of OpenLayers. Je hoeft daardoor niet zelf de tegel-URL's te kennen. Om het nog makkelijker te maken, detecteert `nlmaps` automatisch de kaart bibliotheek die je gebruikt en maakt hiermee een kaart waar een van de BRT-Achtergrondkaart stijlen aan is toegevoegd.

## Gebruiksvoorbeeld

    let map = nlmaps.createMap({style: 'grijs', target: 'nlmaps-holder'});

Beschikbare kaartstijlen:

* `standaard`: de standaard BRT-Achtergrondkaart, in kleur
* `pastel`: in pasteltinten
* `grijs`: met lage verzadiging
* `luchtfoto`: luchtfoto's

## Opzetten

### Wizard

De [NL Maps wizard](https://nlmaps.nl/#wizard) maakt het heel eenvoudig om te beginnen met jouw keuze van kaartbibliotheek en kaartstijl. Het genereert code-voorbeelden die je laten zien hoe je een werkende kaart kunt krijgen. Het is aanbevolen om de output van de wizard te raadplegen, ook al ga je `nlmaps` handmatig gebruiken.

### Handmatige browser-configuratie

Je hebt één van de volgende bibliotheken nodig: Leaflet, Google Maps of OpenLayers. `nlmaps` detecteert automatisch welke aanwezig is (en beschouwt het momenteel als een fout als meer dan één aanwezig is). Voor meer informatie over het gebruik van de betreffende bibliotheken raadpleeg de eigen documentatie:

* [Google Maps](https://developers.google.com/maps/documentation/javascript/)
* [Leaflet](http://leafletjs.com/examples.html)
* [Mapbox](https://www.mapbox.com/mapbox.js/api/v3.1.1/)
* [OpenLayers](http://openlayers.org/en/latest/doc/quickstart.html)

Tenslotte heb je nog de `nlmaps` bibliotheek zelf nodig. Deze kun je downloaden van de [laatse release op Github](https://github.com/kadaster/nlmaps/releases/latest). Download en extraheer de broncode en selecteer het bestand `dist/nlmaps.iife.js`. Voeg het toe aan je webpagina als volgt:

    <script src="url_of_nlmaps.iife.js"></script>

### NodeJS
`nlmaps` is ontwikkeld met NodeJS versie 6.x.

    npm install -S nlmaps
    
    //CommonJS
    let nlmaps = require('nlmaps');
    
    //ES2015 Modules
    import nlmaps from 'nlmaps';

Leaflet, Google Maps, Mapbox of OpenLayers zullen ook beschikbaar moeten zijn in je webpagina. Een manier om dit voor elkaar te krijgen is om een package te installeren die je kaartbibliotheek wrapt voor Node: dat doe je met `npm install -S <package-naam>` (bijvoorbeeld, [leaflet](https://www.npmjs.com/package/leaflet), [google-maps](https://www.npmjs.com/package/google-maps) or [openlayers](https://www.npmjs.com/package/openlayers)). Je kan je kaartbibliotheek ook natuurlijk als script zetten in het html-bestand waar je app output in terecht komt.

**Over het gebruik van Mapbox:** Als je de Mapbox-bibliotheek gebruikt, volg dan de instructies voor Leaflet. Mapbox bevat de Leaflet-bibliotheek en zal dus op dezelfde manier werken.

## API documentation

### `nlmaps.createMap(options<object>)`

Maakt een kaart, met gebruik van Leaflet, Google Maps, Mapbox of OpenLayers, waar een BRT-Achtergrondkaartlaag al aan is toegevoegd als achtergrondlaag. De kaart wordt geconfigureerd met een options object met de volgende eigenschappen:

* target: _string_ (**verplicht**). De id van `div` waar de kaart in moet worden gemaakt.
* center: _object_ (optioneel). Het object met de eigenschappen `latitude` en `longitude` om het initiële kaartbeeld in te stellen. De standaardwaarde is het centrum van Nederland.
* zoom: _number_ (optioneel). Het zoomniveau voor het initiële kaartbeeld. De standaardwaarde is `8`.
* style: _string_ (optioneel). De stijl van de referentiekaart. Gebruik er een van `'standaard'`, `'pastel'`, '`grijs'` of `'luchtfoto'`. De standaardwaarde is `'standaard'`.
* marker: _boolean_ or _object_ (optioneel). Gebruik `'true'` of `'false'` om in te stellen of er een marker wordt getoond op de locatie van `center`. De standaardwaarde is `'false'`. Om de positie expliciet in te stellen, geef een object met de eigenschappen `latitude` en `longitude`.
* overlay: _string_ (optioneel). Hiermee stel je een kaart in, die over de BRT-Achtergrondkaart of luchtfoto wordt getoond. Gebruik er een van `'drone-no-fly-zones'`, `'gebouwen'`, `'gemeenten'`, `'hoogte'`, `'percelen'` of `'provincies'`.
* search: _boolean_ (optioneel). Gebruik `'true'` of `'false'` om in te stellen of er een zoekveld voor plaatsen en adressen wordt getoond. De standaardwaarde is `'false'`.

Geeft een `map` object terug.

**Voorbeeld**

    const opts = {
      style: 'grijs',
      target: 'nlmaps-holder',
      center: {
        longitude: 5.4534,
        latitude: 52.3112
      },
      zoom: 15,
      marker: true,
      overlay: 'hoogte',
      search: true
    };
    let map = nlmaps.createMap(opts);
   
### `nlmaps.geoLocate(map<map object>, options<object>)`

Maakt een geolocator control en voegt deze toe aan de kaart. Een klik op de control initialiseert een verzoek aan de browser geolocation API en centreert de kaart op de resulterende locatie. De geolocator kan ook worden ingesteld om meteen een geolocation verzoek uit te voeren, zonder te wachten tot de gebruiker op de control klikt.

* map: _object map_ (**verplicht**). De `map` waar de geolocator aan moet worden toegevoegd.
* options _object_ (optioneel). Een object met een toegestane eigenschap: `start: true|false`. Indien de waarde `true` is ingesteld, dan wordt meteen een geolocation verzoek uitgevoerd.

Geeft een `geolocator` object terug. Zie de [nlmaps-geolocator](https://www.npmjs.com/package/nlmaps-geolocator) package voor meer informatie.

**Voorbeeld**

    const map = nlmaps.createMap();
    const geolocator = nlmaps.geoLocate(map, {start: true})

### `nlmaps.<leaflet|openlayers>.bgLayer([style<string>]) | nlmaps.googlemaps.bgLayer(map, [style])`

Maakt een laag voor de betreffende bibliotheek die tegels opvraagt voor de tegelset `style`. Als `style` wordt weggelaten, vraagt het de 'standaard' tegelset op. Selecteer `nlmaps.leaflet` om `nlmaps` met Mapbox te gebruiken.

**NOOT:** voor Google Maps moet je ook een `map` object meegeven als eerste argument ( als je dus ook een `style` meegeeft, geef dan als eerste argument `map`).

Argumenten:

* map: _map.object_ (alleen voor Google Maps). De `map` waar de laag aan moet worden toegevoegd.
* style: _string_ (optioneel). Naam van de tegelset die geladen moet worden. Een van `'standaard'`, `'pastel'`,`'grijs'` of '`luchtfoto`'; standaardwaarde is `'standaard'`.

Geeft een `layer` object terug.

**Voorbeeld (OpenLayers)**

    const layer = nlmaps.openlayers.bgLayer();
    layer.addLayer(map);

### `nlmaps.<googlemaps|leaflet|openlayers>.markerLayer([coords<object>])`

Maakt een laag voor de betreffende bibliotheek om een marker op de locatie `coords` te plaatsen. Selecteer `nlmaps.leaflet` om `nlmaps` met Mapbox te gebruiken.

Arguments:

* coords: _object_ (**verplicht**). Dit object heeft de eigenschappen `latitude` en `longitude` om de locatie van de marker in te stellen.

Geeft een `layer` object terug.

**Voorbeeld (Leaflet)**

    const marker = nlmaps.leaflet.markerLayer({
      longitude: 5.4534,
      latitude: 52.3112
    });
    marker.addTo(map);

### `nlmaps.<leaflet|openlayers>.overlayLayer([overlay<string>]) | nlmaps.googlemaps.overlayLayer(map, [overlay])`

Maakt een laag voor de betreffende bibliotheek die afbeeldingen opvraagt voor een van de standaard `overlay` kaarten. Selecteer `nlmaps.leaflet` om `nlmaps` met Mapbox te gebruiken.

**NOOT:** voor Google Maps moet je ook een `map` object meegeven als eerste argument ( als je dus ook een `style` meegeeft, geef dan als eerste argument `map`).

Argumenten:

* map: _map.object_ (alleen voor Google Maps). De `map` waar de laag aan moet worden toegevoegd.
* overlay: _string_ (**verplicht**). Naam van de kaart die geladen moet worden. Een van `'drone-no-fly-zones'`, `'gebouwen'`, `'gemeenten'`, `'hoogte'`, `'percelen'` of '`provincies`'.

Geeft een `layer` object terug.

**Voorbeeld (Google Maps)**

    const overlay = nlmaps.googlemaps.overlayLayer('drone-no-fly-zones');

### `nlmaps.<leaflet|openlayers>.overlayLayer([overlay<string>],[endpoint<object>]) | nlmaps.googlemaps.overlayLayer(map, [overlay], [endpoint])`

Maakt een laag voor de betreffende bibliotheek die afbeeldingen opvraagt voor een aanpasbare `overlay` **W**eb **M**apping **S**ervice (WMS). De service moet voldoen aan de [OGC WMS specificatie](http://www.opengeospatial.org/standards/wms) en de Spherical Mercator (EPSG:3857) projectie ondersteunen . Selecteer `nlmaps.leaflet` om `nlmaps` met Mapbox te gebruiken.

**NOOT:** voor Google Maps moet je ook een `map` object meegeven als eerste argument ( als je dus ook een `style` meegeeft, geef dan als eerste argument `map`).

Argumenten:

* map: _map.object_ (alleen voor Google Maps). De `map` waar de laag aan moet worden toegevoegd.
* overlay: _string_ (**verplicht**). Naam van de kaart die geladen moet worden. Een van `'drone-no-fly-zones'`, `'gebouwen'`, `'gemeenten'`, `'hoogte'`, `'percelen'` of '`provincies`'.
* endpoint: _object_ (**verplicht**). Dit object heeft de eigenschappen `url`, `layerName` en `styleName` om de **W**eb **M**apping **S**ervice (WMS) in te stellen.

Geeft een `layer` object terug.

**Voorbeeld (OpenLayers)**

    const endpoint = {
      url: 'https://geodata.nationaalgeoregister.nl/fysischgeografischeregios/ows?',
      layerName: 'fysischgeografischeregios',
      styleName: 'fysischgeografischeregios:fysischgeografischeregios'
    };
    const overlay = nlmaps.openlayers.overlayLayer('fysisch-geografische-regios', endpoint);
    map.addLayer(overlay);

### `nlmaps.<leaflet|openlayers>.geoLocatorControl(geolocator) | nlmaps.googlemaps.geoLocatorControl(geolocator, map)`

Maakt een control voor de betreffende bibliotheek die communiceert met de opgegeven `geolocator`. De control heeft een hele simpele interface: klik om een geolocation verzoek te initialiseren en de kaart op het resultaat te laten centreren. De aangemaakte control moet je zelf toevoegen aan de kaart.

Argumenten:

* geolocator _object geolocator_ (**verplicht**). De `geolocator` waar de control mee verbonden moet worden. Als je deze methode gebuikt, zul je waarschijnlijk de geolocator ook zelf aanmaken met de [nlmaps-geolocator](https://www.npmjs.com/package/nlmaps-geolocator) package.
* map _object map_ (alleen voor Google Maps). De `map` waarmee de control geassocieerd moet worden.

Geeft een `geolocator` control terug.

**Voorbeeld (Leaflet)**

    import geoLocator from 'nlmaps-geolocator';
    import geoLocatorControl from 'nlmaps-leaflet';
    const geolocator = geoLocator();
    const control = geoLocatorControl(geolocator);
    control.addTo(map);

## Geavanceerd gebruik

Als je al een kaartbibliotheek gebruikt in jouw project, kan je de `bgLayer()` functie van de betreffende bibliotheek gebruiken om een layer object te maken die je aan je bestaande kaart kunt toevoegen. Daarvoor moet je eerst zelf een kaart maken en het kaartbeeld instellen. Dit is wat `createMap` onder water doet met wat standaardinstellingen.

### Leaflet

    let map = L.map('map').setView( new L.LatLng(52.20936, 5.970745), 10);
    let mylayer = nlmaps.leaflet.bgLayer('grijs').addTo(map);
    let marker = nlmaps.leaflet.markerLayer({longitude: 5.5, latitude: 52.5}).addTo(map);

### OpenLayers

    let map = new ol.Map({
      view: new ol.View({
        center: ol.proj.fromLonLat([5.97075, 52.20936]),
        zoom: 10
      }),
      target: 'map'
    });
    let layer = nlmaps.openlayers.bgLayer();
    map.addLayer(layer);
    let marker = nlmaps.openlayers.markerLayer(true)
    map.addLayer(marker);

### Google Maps

Voor Google Maps is iets meer code nodig, omdat we onze laag handmatig aan de `mapTypes` lijst moeten toevoegen.

    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 52.20936, lng: 5.970745},
      zoom: 8
    });
    
    let mylayer = nlmaps.googlemaps.bgLayer(map, 'pastel');
    
    //add your map to the available layers
    map.mapTypes.set(mylayer.name, mylayer);
    //set it as active layer
    map.setMapTypeId(mylayer.name);
    
Om te voldoen aan de[gebruiksvoorwaarden](https://developers.google.com/maps/terms?hl=en#10-license-restrictions) van Google Maps, voegen we ook een layer switcher control toe zodat de standaard Google kaart beschikbaar is.

    //add control for switching between layers
    let mapTypeIds = [mylayer.name, 'roadmap']
    map.setOptions({
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: mapTypeIds
      }
    });

    let overlay = nlmaps.googlemaps.overlayLayer(map, 'drone-no-fly-zones');

    let marker = nlmaps.googlemaps.markerLayer({longitude: 5.0, latitude: 52.5});
    marker.setMap(map);

### Neem alleen bibliotheek-specifieke functies op

Als je zoveel mogelijk bytes wil besparen, kun je in plaats van de hele `nlmaps` package de sub-module voor jouw kaartbibliotheek direct toevoegen. Elk van deze modules heeft een `bgLayer()` functie die een laag voor de betreffende bibliotheek teruggeeft, en een `geoLocatorControl()` functie die een control voor de geolocator maakt.

**Web browser:**

Download de betreffende `nlmaps-<maplib>.min.js` [release](https://github.com/kadaster/nlmaps/releases/latest) Download de broncode en pak het uit, en selecteer het betreffende bestand uit de `dist` map. Als je deze nu als script laadt in je webpagina, zul je een `bgLayer()` en `geoLocatorControl()` functie hebben die werkt met de betreffende kaartbibliotheek. Selecteer `nlmaps.leaflet` om Mapbox te gebruiken.

**NodeJS:**

    npm install --save nlmaps-leaflet
    
    //CommonJS
    let bgLayer = require('nlmaps-leaflet').bgLayer; //note the use of property off of require
    let marker = require('nlmaps-leaflet').markerLayer;
    
    //ES2015
    import { bgLayer, markerLayer } from 'nlmaps-leaflet';

Deze functies kunnen vervolgens op dezelfde manier worden gebruikt als de functies uit de `nlmaps` package.

### De kaart of kaartlaag verwijderen of bewerken

Als je de kaart of kaartlaag wilt verwijderen of verder bewerken kun je de methodes gebruiken die de kaartbibliotheek beschikbaar stelt. De objecten die worden teruggegeven door `createMap()` en `bgLayer()` zijn gewoon `map` en `layer` objecten van de betreffende bibliotheken. Bijvoorbeeld: Leaflet heeft een `map.remove()` functie die de kaart verwijderd en alle event listeners wist.

### De geolocator en de geoLocatorControls

Je kunt ook de `nlmaps-geolocator` package zelf gebruiken, in plaats van deze aan te roepen met `nlmaps.geoLocate`. Hiermee heb je de mogelijkheid om je eigen control te maken. De sub-packages voor elke kaartbibliotheek bieden elk een control aan die praat met de `nlmaps-geolocator` API, maar het zijn vrij simpele controls die momenteel met hard-coded css worden gestyled. In de toekomst zal `nlmaps` misschien ook een los css bestand leveren, maar voor nu kun je, indien je de plaatsing van de control wilt veranderen, beter je eigen css leveren en/of een eigen control maken.

## Ruwe tegel URL's

De URL's naar de kaarttegels die `nlmaps` configureert volgen deze sjablonen:

Voor de BRT-Achtergrondkaart serie:

    https://geodata.nationaalgeoregister.nl/tiles/service/wmts/{stylename}/EPSG:3857/{z}/{x}/{y}.png

Voor de luchtfoto's:

    https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/1.0.0/2016_ortho25/EPSG:3857/{z}/{x}/{y}.jpeg

## Ontwikkelen


### Installatie/configuratie

Om aan `nlmaps` te werken, clone de repository en voer uit in de nieuwe directory:

    lerna  bootstrap
    npm install

`lerna bootstrap` maakt symlinks van de subpackages in elkaars `node_modules` mappen zodat zij elkaar kunnen importeren met `require()` of `import` zonder de bestanden van npmjs.com te moeten downloaden.

### Algemene informatie over ontwikkelen
Er zijn een aantal problemen het het aanroepen van rollup vanuit npm scripts, dus is er voor dit project een set scripts in `scripts/` die direct aangeroepen dienen te worden. Ze worden als volgt gebruikt:


* `node scripts/build` om de broncode vanuit `packages/PACKAGE/src` te compileren naar `packages/PACKAGE/build` 
* `node scripts/test` om tests in `packages/PACKAGE/test`  te draaien -- voert `unit-test.js` uit met Node and kopiëert/compileert html en js ten behoevevan browser tests naar `build/`.
* `node scripts/serve` om live-reload servers te draaien die  verversen bij veranderingen in `build`. Voor gebruik met de test html-bestanden.
* `node scripts/serve-dev` om build, test en serve tegelijk uit te voeren.
* `node scripts/publish` Publiceert niet daadwerkelijk, maar kopiëert de output van de build stap naar de `dist/` directory in de bovenste map.

Alle bovengenoemde scripts kunnen worden aangeroepen voor alle subpackages (dit is standaard), of voor een selectie van de subpackages door gebruikt van de `-p` vlag:

    //bouwt alleen nlmaps-leaflet en nlmaps-openlayers
    node scripts/build -p leaflet,openlayers

De lijst van packages die de scripts in beschouwing nemen staat in `scripts/conf.json`.

De scripts kunnen worden gedraaid in watch-modus om te hercompileren/hertesten wanneer een bron- of testbestand verandert:

    //bouw leaflet, en herbouw wanneer de bronbestanden veranderen
    node scripts/build --watch -p leaflet
    
Dit is niet van toepassing op de `serve` script, die altijd automatisch ververst.

Je kan de wrapper `serve-dev` aanroepen om de hele ontwikkel-opstelling in één keer te draaien, maar let wel dat alle logberichten naar één terminal zullen gaan en misschien in de verkeerde volgorde zullen staan. Om het overzicht te behouden kan het daarom wenselijk zijn om verschillende  combinaties van commando's voor verschillende subpackages in aparte terminal-vensters te draaien.

**Noot over testen:** de test-script zoekt naar een bestand genaamd 'unit-test.js' hebben om uit te voeren; deze is bedoeld om door NodeJS uitgevoerd te worden (unit tests en dergelijke). Daarnaast kopiëert het alles dat dat de glob `*test.html` past naar de build-map. En voor het uitvoeren van de browser tests roept het `rollup.test.js` aan uit de `config` map van elk subpackage.

**Verder:** de live-reload server draait met SSL. De testpagina's moeten daarom worden geopend met `https://`, anders zullen ze niet werken. De eerste keer zal een uitzondering moeten worden toegevoegd voor de self-signed security certificaten die worden gebruikt.

### Publiceren

[Lerna](https://lernajs.io/) wordt gebruikt voor het beheren van dit multi-package JavaScript project. Omdat Rollup en Lerna of NPM niet helemaal samengaan is er een aparte build script. Gebruik de volgende procedure om de packages te publiceren:

1. `lerna exec npm -- install` in het geval dat dependencies bijgewerkt moeten worden
2. `node scripts/build` Kan niet met npm run of lerna run omdat rollup niet met de gesymlinkte dependencies van lerna om kan gaan
3. `node scripts/publish` publiceert nog niet daadwerkelijk, maar kopiëert de build output van `packages/*/build/` naar de bovenste `dist/` map.
4. git `add` en `commit`.
5. `lerna publish` kies versienummers voor elk package dat is veranderd.

De laatste stap publiceert naar npm, creëert git tags en pusht deze naar Github. Om de release af te maken, ga je daarna naar de release pagina van de Github repo en annoteer de laatste release van de 'nlmaps' package (dit zorgt ervoor dat het beschikbaar komt onder het pad 'latest' op Github).
