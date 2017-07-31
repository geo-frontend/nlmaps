# NL Maps

Automatische configuratie van BRT-Achtergrondkaart lagen in [Leaflet](http://leafletjs.com/), [Google Maps](https://developers.google.com/maps/documentation/javascript/), [Mapbox](https://www.mapbox.com/mapbox.js/), of [OpenLayers](http://openlayers.org/).

**Inhoud**

* [Waarvoor](#waarvoor)
* [Gebruiksvoorbeeld](#gebruiksvoorbeeld)
* [Opzetten](#opzetten)
* [API documentatie](#api-documentatie)
* [Geavanceerd gebruik](#geavanceerd-gebruik)
* [Ruwe tegel URL's](#ruwe-tegel-urls)
* [Ontwikkelen](#ontwikkelen)


## Waarvoor

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

* [Leaflet](http://leafletjs.com/examples.html)
* [Google Maps](https://developers.google.com/maps/documentation/javascript/)
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

Leaflet, Google Maps, Mapbox of OpenLayers zullen ook beschikbaar moeten zijn in je webpagina. Een manier om dit voor elkaar te krijgen is om een package te installeren die je kaartbibliotheek wrapt voor Node: dat doe je met `npm install -S <package-naam>` (bijvoorbeeld, [leaflet-headless](https://www.npmjs.com/package/leaflet-headless), [google-maps](https://www.npmjs.com/package/google-maps) or [openlayers](https://www.npmjs.com/package/openlayers)). Je kan je kaartbibliotheek ook natuurlijk als script zetten in het html-bestand waar je app output in terecht komt.

**Over het gebruik van Mapbox:** Als je de Mapbox bibliotheek gebruikt, volg dan de instructies voor Leaflet. Mapbox bevat de Leaflet bibliotheek en zal dus op dezelfde manier werken.

## API documentation

### `nlmaps.createMap(options<object>)`

Maakt een kaart, met gebruik van Leaflet, Google Maps, Mapbox of OpenLayers, waar een BRT-Achtergrondkaartlaag al aan is toegevoegd als achtergrondlaag. De kaart wordt geconfigureerd met een options object met de volgende eigenschappen:

* style: _string_ (optioneel). een van `'standaard'`, `'pastel'`, '`grijs'` of `'luchtfoto'`, default `'standaard'`.
* target: _string_ (verplicht). id van `div` waar de kaart in moet worden gemaakt.
* center: _object_ (optioneel). object met latitude en longitude eigenschappen voor het instellen van het initiële kaartbeeld. Standaard rond het centrum van Nederland.
* zoom: _number_ (optioneel). Zoomniveau voor het initiële kaartbeeld. Standaard `8`.

Geeft een `map` object terug.

**Voorbeeld**

    const opts = {
      style: 'grijs',
      target: 'nlmaps-holder',
      center: {
        longitude: 5.4534,
        latitude: 52.3112
      },
      zoom: 15
    };
    let map = nlmaps.createMap(opts);
   
### nlmaps.geolocate(map<map object>, options<object>)

Maakt een geolocator control en voegt deze toe aan de kaart. Een klik op de control initialiseert een verzoek aan de browser geolocation API en centreert de kaart op de resulterende locatie. De geolocator kan ook worden ingesteld om meteen een geolocation verzoek uit te voeren, zonder te wachten tot de gebruiker op de control klikt.

* map: _object map_ (verplicht). De `map` waar de geolocator aan moet worden toegevoegd.
* options _object_ (optioneel). Een object met een toegestane eigenschap: `start: true|false`. Wanneer `true`, voert de geocoder meteen een geolocation verzoek uit.

Geeft een `geolocator` object terug. Zie de [nlmaps-geolocator]() package voor meer informatie.

**Voorbeeld**

    const map = nlmaps.createMap();
    const geolocator = nlmaps.geoLocate(map, {start: true})

### `nlmaps.<leaflet|openlayers>.bgLayer([style<string>]) | nlmaps.googlemaps.bgLayer(map, [style])`

Maakt een laag voor de betreffende bibliotheek die tegels opvraagt voor de tegelset `style`. Als `style` wordt weggelaten, vraagt het de 'standaard' tegelset op. Om `nlmaps` te gebruiken met Mapbox, selecteer `leaflet`.

**NOOT:** voor Googe Maps moet je ook een `map` object meegeven als eerste argument. Dus als je ook een style meegeeft, geef dan als eerste argument `map`. Dit is nodig voor het maken van de Attributie control, omdat Google Maps dit niet automatisch configureert.

Argumenten:

* map: _map.object_ (alleen voor Google Maps). De `map` waar de laag aan moet worden toegevoegd.
* style: _string_ (optioneel). Naam van de tegelset die moet worden geladen. Een van `'standaard'`, `'pastel'`,`'grijs'` of '`luchtfoto`'; standaardwaarde is `'standaard'`.

Geeft een `layer` object terug.

**Voorbeeld**

    const layer = nlmaps.openlayers.bgLayer();
    layer.addTo(map);


### nlmaps.<leaflet|openlayers>.geoLocatorControl(geolocator) | nlmaps.googlemaps.geoLocatorControl(geolocator, map)

Maakt een control voor de betreffende bibliotheek die communiceert met de opgegeven `geolocator`. De control heeft een hele simpele interface: klik om een geolocation verzoek te initialiseren en de kaart op het resultaat te laten centreren. De aangemaakte control moet je zelf toevoegen aan de kaart.

Argumenten:

* geolocator _object geolocator_ (verplicht): De `geolocator` waar de control mee verbonden moet worden. Als je deze methode gebuikt, zul je waarschijnlijk de geolocator ook zelf aanmaken met de [nlmaps-geolocator]() package.
* map _object map_ (alleen voor Google Maps): de `map` waarmee de control geassocieerd moet worden.

Geeft een geolocator control terug.

**Voorbeeld**

    import geoLocator from 'nlmaps-geolocator';
    import geoLocatorControl from 'nlmaps-leaflet';
    const geolocator = geoLocator();
    const control = geoLocatorControl(geolocator);
    control.addTo(map);

## Geavanceerd gebruik

Als je al een kaartbibliotheek gebruikt in jouw project, kan je de `bgLayer()` functie van de betreffende bibliotheek gebruiken om een layer object te maken die je aan je bestaande kaart kunt toevoegen. Daarvoor moet je eerst zelf een kaart maken en het kaartbeeld instellen. Dit is wat `createMap` onder water doet met wat standaardinstellingen.

### Leaflet

    let map = L.map('map').setView([52.20936, 5.970745], 10);
    let mylayer = nlmaps.leaflet.bgLayer('grijs').addTo(map);

### OpenLayers

    let map = new ol.Map({
      view: new ol.View({
        center: ol.proj.fromLonLat([5.97075, 52.20936]),
        zoom: 10
      }),
      target: 'map'
    });
    let layer = nlmaps.openlayers.bgLayer(); //calling bgLayer with no argument defaults to the 'standaard' style
    map.addLayer(layer);

### Google Maps

Voor Google Maps is iets meer code nodig, omdat we onze laag handmatig aan de `mapTypes` lijst moeten toevoegen.

    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 52.20936, lng: 5.970745},
      zoom: 8
    });
    
    let mylayer = nlmaps.openlayers.bgLayer(map, 'pastel'); //don't forget to pass map as first argument
    
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


### Alleen de `bgLayer` functie voor jouw kaartbibliotheek laden

Als je zoveel mogelijk bytes wil besparen, kun je in plaats van de hele `nlmaps` package de sub-module voor jouw kaartbibliotheek direct toevoegen. Elk van deze modules heeft een `bgLayer()` functie die een laag voor de betreffende bibliotheek teruggeeft, en een `geoLocatorControl()` functie die een control voor de geolocator maakt.

**Web browser:**

Download de betreffende `nlmaps-<maplib>.min.js` [release](https://github.com/kadaster/nlmaps/releases/latest) Download de broncode en pak het uit, en selecteer het betreffende bestand uit de `dist` map. Als je deze nu als script laadt in je webpagina, zul je een `bgLayer()` en `geoLocatorControl()` functie hebben die werkt met de betreffende kaartbibliotheek. Om Mapbox te gebruiken, selecteer `leaflet`.

**NodeJS:**

    npm install --save nlmaps-leaflet
    
    //CommonJS
    let bgLayer = require('nlmaps-leaflet').bgLayer; //note the use of property off of require
    
    //ES2015
    import { bgLayer } from 'nlmaps-leaflet';

Deze functies kunnen vervolgens op dezelfde manier worden gebruikt als de `nlmaps.<maplib>.bgLayer()` functies uit de `nlmaps` package.

### De kaart of kaartlaag verwijderen of bewerken

Als je de kaart of kaartlaag wilt verwijderen of verder bewerken kun je de methodes gebruiken die de kaartbibliotheek beschikbaar stelt. De objecten die worden teruggegeven door `createMap()` en `bgLayer()` zijn gewoon `map` en `layer` objecten van de betreffende bibliotheken. Bijvoorbeeld: Leaflet heeft een `map.remove()` functie die de kaart verwijderd en alle event listeners wist.

### De geolocator en de geoLocatorControls

Je kunt ook de `nlmaps-geolocator` package zelf gebruiken, in plaats van deze aan te roepen met `nlmaps.geoLocate`. Hiermee heb je de mogelijkheid om je eigen control te maken. De sub-packages voor elke kaartbibliotheek bieden elk een control aan die praat met de `nlmaps-geolocator` API, maar het zijn vrij simpele controls die momenteel met hard-coded css worden gestyled. In de toekomst zal `nlmaps` misschien ook een los css bestand leveren, maar voor nu kun je, indien je de plaatsing van de control wilt veranderen, beter je eigen css leveren en/of een eigen control maken.

## Ruwe tegel URL's

De tegel URL's die `nlmaps` configureert volgen deze templates:

Voor de BRT-Achtergrondkaart serie:

    https://geodata.nationaalgeoregister.nl/tiles/service/wmts/{stylename}/EPSG:3857/{z}/{x}/{y}.png

Voor de luchtfoto's:

    https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/1.0.0/2016_ortho25/EPSG:3857/{z}/{x}/{y}.png


## Ontwikkelen

[Lerna](https://lernajs.io/) wordt gebruikt voor het beheren van dit multi-package JavaScript project. Omdat Rollup en Lerna of NPM niet helemaal samengaan is er een aparte build script. Gebruik de volgende procedure om de packages te publiceren:

1. `node build-all.js` Kan niet met npm run of lerna run omdat rollup niet met de gesymlinkte dependencies van lerna om kan gaan
2. `lerna exec npm -- install` indien dependencies geupdated moeten worden
3. git `add` en `commit`
4. `lerna publish` kiest nieuwe versienummers voor elke package die is veranderd

Ga daarna naar de release pagina en annoteer de laatste release voor de 'nlmaps' package.
