<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BenefitsBlock from '@/components/Benefits.vue'
import LeafletMap from '@/components/LeafletMap.vue'

export default {
  components: {
    DefaultLayout,
  },
}
</script>
<template>
  <DefaultLayout>
    <section class="section-brand spotlight">
      <div class="container">
        <h1 class="heading spotlight-heading">
          {{ $route.meta.description }}
        </h1>
        <p class="spotlight-description">
          De meest actuele kaart nu beschikbaar
        </p>
        <div class="section-actions">
          <a href="/" class="btn btn-primary">Terug naar NL Maps</a>
          <a
            href="https://github.com/geo-frontend/nlmaps/"
            target="_blank"
            class="btn btn-primary btn-icon btn-github"
          >
            <span>Bekijk op GitHub</span>
          </a>
        </div>
      </div>
      <img src="@/assets/img/map.png" alt="" class="spotlight-map" />
    </section>
    <section class="section">
      <div class="container container-narrow">
        <div class="markdown js-docs">
          <h2>NL Maps</h2>
          <h3>Inhoud</h3>
          <ol>
            <li><a href="#doel">Doel</a></li>
            <li><a href="#gebruiksvoorbeeld">Gebruiksvoorbeeld</a></li>
            <li><a href="#opzetten">Opzetten</a></li>
            <li><a href="#api-documentatie">API documentatie</a></li>
            <li><a href="#geavanceerd-gebruik">Geavanceerd gebruik</a></li>
            <li><a href="#ruwe-tegel-urls">Ruwe tegel URL's</a></li>
            <li><a href="#ontwikkelen">Ontwikkelen</a></li>
          </ol>
          <h3 id="doel">Doel</h3>
          <p>
            Met de <code>nlmaps</code> JavaScript-bibliotheek kun je kaartlagen
            van de BRT-Achtergrondkaart maken voor Leaflet, Maplibre GL JS en
            OpenLayers. Je hoeft daardoor niet zelf de tegel-URL's te kennen.
          </p>
          <h3 id="gebruiksvoorbeeld">Gebruiksvoorbeeld</h3>
          <pre><code>let map = nlmaps.createMap({style: 'grijs', target: 'nlmaps-holder'});</code></pre>
          <p>Beschikbare kaartstijlen:</p>
          <ul>
            <li>
              <code>standaard</code>: de standaard BRT-Achtergrondkaart, in
              kleur
            </li>
            <li><code>pastel</code>: in pasteltinten</li>
            <li><code>grijs</code>: met lage verzadiging</li>
            <li><code>luchtfoto</code>: luchtfoto's</li>
          </ul>
          <h3 id="opzetten">Opzetten</h3>
          <h4>Wizard</h4>
          <p>
            De <a href="https://nlmaps.nl/#wizard">NL Maps wizard</a> maakt het
            heel eenvoudig om te beginnen. Het genereert code-voorbeelden die je
            laten zien hoe je een werkende kaart kunt krijgen. Het is aanbevolen
            om de output van de wizard te raadplegen, ook al ga je
            <code>nlmaps</code> handmatig gebruiken.
          </p>
          <h4>Handmatige browser-configuratie</h4>
          <p>
            Wil je <code>nlmaps</code> gebruiken in een webpagina, dan heb je
            ook Leaflet nodig. <code>nlmaps</code> detecteert automatisch of
            deze bibliotheek al aanwezig is (en beschouwt het momenteel als een
            fout als meer dan één aanwezig is). Voor meer informatie over het
            gebruik van Leaflet raadpleeg de eigen
            <a href="http://leafletjs.com/examples.html">documentatie</a>.
          </p>
          <p>
            Tenslotte heb je nog de <code>nlmaps</code> bibliotheek zelf nodig.
            Deze kun je downloaden van de
            <a href="https://github.com/kadaster/nlmaps/releases/latest"
              >laatse release op Github</a
            >. Download en extraheer de broncode en selecteer het bestand
            <code>dist/nlmaps.iife.js</code>. Voeg het toe aan je webpagina als
            volgt:
          </p>
          <code>&lt;script src="url_of_nlmaps.iife.js"&gt;&lt;/script&gt;</code>
          <h4>Node.js</h4>
          <p><code>nlmaps</code> is ontwikkeld met Node.js versie 20.14.0</p>
          <pre><code>npm install -S @geo-frontend/nlmaps
//CommonJS
let nlmaps = require('nlmaps');

//ES2015 Modules
import nlmaps from 'nlmaps';</code></pre>
          <p>
            Leaflet, MapLibre GL JS of OpenLayers zullen ook beschikbaar moeten
            zijn in je webpagina. Een manier om dit voor elkaar te krijgen is om
            een package te installeren die je kaartbibliotheek wrapt voor Node:
            dat doe je met
            <code>npm install -S &lt;package-naam&gt;</code> (bijvoorbeeld,
            <a href="https://www.npmjs.com/package/leaflet">leaflet</a>,
            <a href="https://www.npmjs.com/package/maplibre-gl">maplibre-gl</a>
            or
            <a href="https://www.npmjs.com/package/ol">ol</a>). Je kan je
            kaartbibliotheek ook natuurlijk als script zetten in het
            html-bestand waar je app output in terecht komt.
          </p>
          <h3 id="api-documentation">API documentation</h3>
          <h4><code>nlmaps.createMap(options&lt;object&gt;)</code></h4>
          <p>
            Maakt een kaart met gebruik van Leaflet, waar een
            BRT-Achtergrondkaartlaag al aan is toegevoegd als achtergrondlaag.
            De kaart wordt geconfigureerd met een options object met de volgende
            eigenschappen:
          </p>
          <ul>
            <li>
              target: <em>string</em> (<strong>verplicht</strong>). De id van
              <code>div</code> waar de kaart in moet worden gemaakt.
            </li>
            <li>
              center: <em>object</em> (optioneel). Het object met de
              eigenschappen <code>latitude</code> en <code>longitude</code> om
              het initiële kaartbeeld in te stellen. De standaardwaarde is het
              centrum van Nederland.
            </li>
            <li>
              zoom: <em>number</em> (optioneel). Het zoomniveau voor het
              initiële kaartbeeld. De standaardwaarde is <code>8</code>.
            </li>
            <li>
              style: <em>string</em> (optioneel). De stijl van de
              referentiekaart. Gebruik er een van <code>'standaard'</code>,
              <code>'pastel'</code>, '<code>grijs'</code> of
              <code>'luchtfoto'</code>. De standaardwaarde is
              <code>'standaard'</code>.
            </li>
            <li>
              marker: <em>boolean</em> or <em>object</em> (optioneel). Gebruik
              <code>'true'</code> of <code>'false'</code> om in te stellen of er
              een marker wordt getoond op de locatie van <code>center</code>. De
              standaardwaarde is <code>'false'</code>. Om de positie expliciet
              in te stellen, geef een object met de eigenschappen
              <code>latitude</code> en <code>longitude</code>.
            </li>
            <li>
              overlay: <em>string</em> (optioneel). Hiermee stel je een kaart
              in, die over de BRT-Achtergrondkaart of luchtfoto wordt getoond.
              Gebruik er een van <code>'adressen'</code>,
              <code>'drone-no-fly-zones'</code>, <code>'gebouwen'</code>,
              <code>'gemeenten'</code>, <code>'hoogte'</code>,
              <code>'land'</code> <code>'percelen'</code> of
              <code>'provincies'</code>.
            </li>
            <li>
              search: <em>boolean</em> (optioneel). Gebruik
              <code>'true'</code> of <code>'false'</code> om in te stellen of er
              een zoekveld voor plaatsen en adressen wordt getoond. De
              standaardwaarde is <code>'false'</code>.
            </li>
          </ul>
          <p>Geeft een <code>map</code> object terug.</p>
          <p><strong>Voorbeeld</strong></p>
          <pre><code>const opts = {
  style: 'grijs',
  target: 'nlmaps-holder',
  center: {
    longitude: 5.4534,
    latitude: 52.3112
  },
  zoom: 15,
  marker: true,
  overlay: 'gemeenten',
  search: true
};
let map = nlmaps.createMap(opts);
</code></pre>
          <h4>
            <code
              >nlmaps.geoLocate(map&lt;map object&gt;,
              options&lt;object&gt;)</code
            >
          </h4>
          <p>
            Maakt een geolocator control en voegt deze toe aan de kaart. Een
            klik op de control initialiseert een verzoek aan de browser
            geolocation API en centreert de kaart op de resulterende locatie. De
            geolocator kan ook worden ingesteld om meteen een geolocation
            verzoek uit te voeren, zonder te wachten tot de gebruiker op de
            control klikt.
          </p>
          <ul>
            <li>
              map: <em>object map</em> (<strong>verplicht</strong>). De
              <code>map</code> waar de geolocator aan moet worden toegevoegd.
            </li>
            <li>
              options <em>object</em> (optioneel). Een object met een toegestane
              eigenschap: <code>start: true|false</code>. Indien de waarde
              <code>true</code> is ingesteld, dan wordt meteen een geolocation
              verzoek uitgevoerd.
            </li>
          </ul>
          <p>
            Geeft een <code>geolocator</code> object terug. Zie de
            <a href="https://www.npmjs.com/package/nlmaps-geolocator"
              >nlmaps-geolocator</a
            >
            package voor meer informatie.
          </p>
          <p><strong>Voorbeeld</strong></p>
          <pre><code>const map = nlmaps.createMap();
const geolocator = nlmaps.geoLocate(map, {start: true})</code></pre>
          <h4>
            <code>nlmaps.leaflet.bgLayer([style&lt;string&gt;])</code>
          </h4>
          <p>
            Maakt een laag voor Leaflet die tegels opvraagt voor de tegelset
            <code>style</code>. Als <code>style</code> wordt weggelaten, vraagt
            het de 'standaard' tegelset op.
          </p>
          <p>Argumenten:</p>
          <ul>
            <li>
              style: <em>string</em> (optioneel). Naam van de tegelset die
              geladen moet worden. Een van <code>'standaard'</code>,
              <code>'pastel'</code>,<code>'grijs'</code> of
              '<code>luchtfoto</code>'; standaardwaarde is
              <code>'standaard'</code>.
            </li>
          </ul>
          <p>Geeft een <code>layer</code> object terug.</p>
          <p><strong>Voorbeeld</strong></p>
          <pre><code>const layer = nlmaps.leaflet.bgLayer();
layer.addLayer(map);</code></pre>
          <h4>
            <code>nlmaps.leaflet.markerLayer([coords&lt;object&gt;])</code>
          </h4>
          <p>
            Maakt een laag voor Leaflet om een marker op de locatie
            <code>coords</code> te plaatsen.
          </p>
          <p>Arguments:</p>
          <ul>
            <li>
              coords: <em>object</em> (<strong>verplicht</strong>). Dit object
              heeft de eigenschappen <code>latitude</code> en
              <code>longitude</code> om de locatie van de marker in te stellen.
            </li>
          </ul>
          <p>Geeft een <code>layer</code> object terug.</p>
          <p><strong>Voorbeeld</strong></p>
          <pre><code>const marker = nlmaps.leaflet.markerLayer({
  longitude: 5.4534,
  latitude: 52.3112
});
marker.addTo(map);</code></pre>
          <h4>
            <code>nlmaps.leaflet.overlayLayer([overlay&lt;string&gt;])</code>
          </h4>
          <p>
            Maakt een laag voor Leaflet die afbeeldingen opvraagt voor een van
            de standaard <code>overlay</code> kaarten.
          </p>
          <p>Argumenten:</p>
          <ul>
            <li>
              overlay: <em>string</em> (<strong>verplicht</strong>). Naam van de
              kaart die geladen moet worden. Gebruik een van
              <code>'adressen'</code>, <code>'drone-no-fly-zones'</code>,
              <code>'gebouwen'</code>, <code>'gemeenten'</code>,
              <code>'hoogte'</code>, <code>'land'</code>
              <code>'percelen'</code> of <code>'provincies'</code>.
            </li>
          </ul>
          <p>Geeft een <code>layer</code> object terug.</p>
          <p><strong>Voorbeeld</strong></p>
          <pre><code>const overlay = nlmaps.leaflet.overlayLayer('gemeenten');</code></pre>
          <h4>
            <code
              >nlmaps.leaflet.overlayLayer([overlay&lt;string&gt;],[endpoint&lt;object&gt;])</code
            >
          </h4>
          <p>
            Maakt een laag voor Leaflet die afbeeldingen opvraagt voor een
            aanpasbare <code>overlay</code> <strong>W</strong>eb
            <strong>M</strong>apping <strong>S</strong>ervice (WMS). De service
            moet voldoen aan de
            <a href="http://www.opengeospatial.org/standards/wms"
              >OGC WMS specificatie</a
            >
            en de Spherical Mercator (EPSG:3857) projectie ondersteunen.
          </p>
          <p>Argumenten:</p>
          <ul>
            <li>
              overlay: <em>string</em> (<strong>verplicht</strong>). Naam van de
              kaart die geladen moet worden.
            </li>
            <li>
              endpoint: <em>object</em> (<strong>verplicht</strong>). Dit object
              heeft de eigenschappen <code>url</code>, <code>layerName</code> en
              <code>styleName</code> om de <strong>W</strong>eb
              <strong>M</strong>apping <strong>S</strong>ervice (WMS) in te
              stellen.
            </li>
          </ul>
          <p>Geeft een <code>layer</code> object terug.</p>
          <p><strong>Voorbeeld</strong></p>
          <pre><code>const endpoint = {
  url: 'https://service.pdok.nl/ez/fysischgeografischeregios/wms/v1_0?',
  layerName: 'fysischgeografischeregios',
  styleName: 'fysischgeografischeregios'
};
const overlay = nlmaps.leaflet.overlayLayer('fysisch-geografische-regios', endpoint);
map.addLayer(overlay);</code></pre>
          <h4>
            <code>nlmaps.leaflet.geoLocatorControl(geolocator)</code>
          </h4>
          <p>
            Maakt een control voor Leaflet die communiceert met de opgegeven
            <code>geolocator</code>. De control heeft een hele simpele
            interface: klik om een geolocation verzoek te initialiseren en de
            kaart op het resultaat te laten centreren. De aangemaakte control
            moet je zelf toevoegen aan de kaart.
          </p>
          <p>Argumenten:</p>
          <ul>
            <li>
              geolocator
              <em>object geolocator</em> (<strong>verplicht</strong>). De
              <code>geolocator</code> waar de control mee verbonden moet worden.
              Als je deze methode gebuikt, zul je waarschijnlijk de geolocator
              ook zelf aanmaken met de
              <a href="https://www.npmjs.com/package/nlmaps-geolocator"
                >nlmaps-geolocator</a
              >
              package.
            </li>
          </ul>
          <p>Geeft een <code>geolocator</code> control terug.</p>
          <p><strong>Voorbeeld</strong></p>
          <pre><code>import geoLocator from 'nlmaps-geolocator';
import geoLocatorControl from 'nlmaps-leaflet';
const geolocator = geoLocator();
const control = geoLocatorControl(geolocator);
control.addTo(map);</code></pre>
          <h3 id="geavanceerd-gebruik">Geavanceerd gebruik</h3>
          <p>
            Als je Leaflet al gebruikt in jouw project, kan je de
            <code>bgLayer()</code> functie van de betreffende bibliotheek
            gebruiken om een layer object te maken die je aan je bestaande kaart
            kunt toevoegen. Daarvoor moet je eerst zelf een kaart maken en het
            kaartbeeld instellen. Dit is wat <code>createMap</code> onder water
            doet met wat standaardinstellingen.
          </p>
          <h4>Leaflet</h4>
          <pre><code>let map = L.map('map').setView( new L.LatLng(52.20936, 5.970745), 10);
let mylayer = nlmaps.leaflet.bgLayer('grijs').addTo(map);
let marker = nlmaps.leaflet.markerLayer({longitude: 5.5, latitude: 52.5}).addTo(map);</code></pre>
          <h4>Neem alleen bibliotheek-specifieke functies op</h4>
          <p>
            Als je zoveel mogelijk bytes wil besparen, kun je in plaats van de
            hele <code>nlmaps</code> package de sub-module voor Leaflet direct
            toevoegen. Elk van deze modules heeft een
            <code>bgLayer()</code> functie die een laag voor de betreffende
            bibliotheek teruggeeft, en een
            <code>geoLocatorControl()</code> functie die een control voor de
            geolocator maakt.
          </p>
          <p><strong>Web browser:</strong></p>
          <p>
            Download de betreffende <code>nlmaps-&lt;maplib&gt;.iife.js</code>
            <a href="https://github.com/kadaster/nlmaps/releases/latest"
              >release</a
            >
            Download de broncode en pak het uit, en selecteer het betreffende
            bestand uit de <code>dist</code> map. Als je deze nu als script
            laadt in je webpagina, zul je een <code>bgLayer()</code> en
            <code>geoLocatorControl()</code> functie hebben die werkt met de
            betreffende kaartbibliotheek.
          </p>
          <p><strong>Node.js:</strong></p>
          <pre><code>npm install --save nlmaps-leaflet
//CommonJS
let bgLayer = require('nlmaps-leaflet').bgLayer; //note the use of property off of require
let marker = require('nlmaps-leaflet').markerLayer;

//ES2015
import { bgLayer, markerLayer } from 'nlmaps-leaflet';</code></pre>

          <p>
            Deze functies kunnen vervolgens op dezelfde manier worden gebruikt
            als de functies uit de <code>nlmaps</code> package.
          </p>
          <h4>De kaart of kaartlaag verwijderen of bewerken</h4>
          <p>
            Als je de kaart of kaartlaag wilt verwijderen of verder bewerken kun
            je de methodes gebruiken die de kaartbibliotheek beschikbaar stelt.
            De objecten die worden teruggegeven door <code>createMap()</code> en
            <code>bgLayer()</code> zijn gewoon <code>map</code> en
            <code>layer</code> objecten van de betreffende bibliotheken.
            Bijvoorbeeld: Leaflet heeft een <code>map.remove()</code> functie
            die de kaart verwijderd en alle event listeners wist.
          </p>
          <h4>De geolocator en de geoLocatorControls</h4>
          <p>
            Je kunt ook de <code>nlmaps-geolocator</code> package zelf
            gebruiken, in plaats van deze aan te roepen met
            <code>nlmaps.geoLocate</code>. Hiermee heb je de mogelijkheid om je
            eigen control te maken. De sub-packages voor elke kaartbibliotheek
            bieden elk een control aan die praat met de
            <code>nlmaps-geolocator</code> API, maar het zijn vrij simpele
            controls die momenteel met hard-coded css worden gestyled. In de
            toekomst zal <code>nlmaps</code> misschien ook een los css bestand
            leveren, maar voor nu kun je, indien je de plaatsing van de control
            wilt veranderen, beter je eigen css leveren en/of een eigen control
            maken.
          </p>
          <h3 id="ruwe-tegel-urls">Ruwe tegel URL's</h3>
          <p>
            De URL's naar de kaarttegels die <code>nlmaps</code> configureert
            volgen deze sjablonen:
          </p>
          <p>
            Voor de BRT-Achtergrondkaart serie:
            https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:3857/{z}/{x}/{y}.png
          </p>
          <p>
            Voor de luchtfoto's:
            https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1<em>0/Actueel</em>ortho25/EPSG:3857/{z}/{x}/{y}.jpeg
          </p>
          <h3 id="ontwikkelen">Ontwikkelen</h3>
          <h4>Algemene informatie over ontwikkelen</h4>
          <code>nlmaps</code> is ontwikkeld als monorepo met behulp van
          <code>Nx</code> and <code>pnpm</code>. De website is gemaakt op basis
          van <code>Vue JS</code>.
          <h4>Installatie/configuratie</h4>
          <p>
            Om aan <code>nlmaps</code> te werken, installeer je
            <code>pnpm</code> globaal:
          </p>
          <pre><code>npm install -g pnpm</code></pre>
          <p>Vervolgens installeer je <code>Nx</code> globaal:</p>
          <pre><code>pnpm add -g nx</code></pre>
          <p>Clone de repository:</p>
          <pre><code>git clone git@github.com:geo-frontend/nlmaps.git
cd nlmaps</code></pre>
          <p>Installeer de dependencies:</p>
          <pre><code>pnpm install</code></pre>
          <p>Om de website lokaal te serveren:</p>
          <pre><code>npx nx dev nlmaps-website</code></pre>
          <p>Om de voorbeelden lokaal te serveren:</p>
          <pre><code>npx nx dev nlmaps-examples</code></pre>
          <p>Om de website, voorbeelden en packages te bouwen:</p>
          <pre><code>npx nx run-many --target=build --all</code></pre>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>
<style lang="css">
.container {
  padding-right: 20px;
  padding-left: 20px;
  margin-right: auto;
  margin-left: auto;
}
.container:before,
.container:after {
  display: table;
  content: ' ';
}
.container:after {
  clear: both;
}
@media (min-width: 768px) {
  .container {
    width: 760px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 980px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1180px;
  }
}
.heading {
  margin-top: 0;
  font-size: inherit;
  font-weight: normal;
}
section,
nav {
  padding: 32px 0;
}
.section-brand {
  background: #006486;
  color: #fff;
}
.section-wizard {
  padding: 32px 0 0;
}
.section-intro {
  margin: 0 0 30px;
  text-align: center;
}
.section-heading {
  font-size: 20px;
  text-align: center;
}
.section-actions {
  position: relative;
  margin: 60px 0 0;
  text-align: center;
}
.section-actions .btn + .btn {
  margin-top: 20px;
}
.section-wizard .section-actions {
  color: #fff;
}
@media (min-width: 30em) {
  section,
  nav {
    padding: 60px 0;
  }
  .section-actions .btn + .btn {
    margin: 0 0 0 20px;
  }
}
@media (min-width: 48em) {
  section,
  nav {
    padding: 7vh 0;
  }
  .section-intro {
    margin: 0 0 48px;
  }
  .section-heading {
    font-size: 24px;
  }
}
@media (min-width: 75em) {
  section,
  nav {
    padding: 10vh 0;
  }
  .section-intro {
    margin: 0 0 60px;
  }
  .section-heading {
    font-size: 32px;
  }
}
.spotlight {
  position: relative;
  display: flex;
  justify-content: center;
  height: 80vh;
  min-height: 430px;
  padding: 150px 0 60px;
  flex-direction: column;
  background: url('@/assets/img/map-background.png') no-repeat center center
    #006486;
  background-size: cover;
  text-align: center;
  font-size: 20px;
}

.spotlight-heading {
  font-size: 28px;
}

.spotlight-description {
  margin: 0 0 1em;
}

.spotlight-map {
  display: none;
}
@media (min-width: 48em) {
  .spotlight {
    height: calc(60vh);
    min-height: 370px;
    padding: 120px 0;
    margin-bottom: 60px;
  }
  .spotlight-heading {
    font-size: 36px;
  }
  .spotlight-map {
    position: absolute;
    left: 50%;
    bottom: 0;
    display: none;
    -webkit-transform: translate(-50%, 50%) perspective(1000px) rotateX(70deg);
    transform: translate(-50%, 50%) perspective(1000px) rotateX(70deg);
    box-shadow: 0 10px 40px 10px rgba(0, 0, 0, 0.05);
  }
}
@media (min-width: 75em) {
  .spotlight {
    height: calc(70vh);
    min-height: 370px;
    padding: 120px 0;
    margin-bottom: 60px;
  }
  .spotlight-heading {
    font-size: 42px;
  }
}

#benefits {
  grid-area: benefits;
}

#wizard {
  grid-area: wizard;
}

.btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 4px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.btn:focus,
.btn.focus,
.btn:active:focus,
.btn:active.focus,
.btn.active:focus,
.btn.active.focus {
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
.btn:hover,
.btn:focus,
.btn.focus {
  color: #333;
  text-decoration: none;
}
.btn:active,
.btn.active {
  background-image: none;
  outline: 0;
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
}

.btn-secondary {
  background: #006486;
  color: #fff;
}

.btn-secondary:hover,
.btn-secondary:focus {
  background: #6c62a6;
  color: #fff;
}
.btn-primary {
  color: #fff;
  background-color: #6c62a6;
  border-color: #605698;
}
.btn-primary:focus,
.btn-primary.focus {
  color: #fff;
  background-color: #564d88;
  border-color: #2d2847;
}
.btn-primary:hover {
  color: #fff;
  background-color: #564d88;
  border-color: #474071;
}
.btn-primary:active,
.btn-primary.active,
.open > .btn-primary.dropdown-toggle {
  color: #fff;
  background-color: #564d88;
  background-image: none;
  border-color: #474071;
}
.btn-primary:active:hover,
.btn-primary:active:focus,
.btn-primary:active.focus,
.btn-primary.active:hover,
.btn-primary.active:focus,
.btn-primary.active.focus,
.open > .btn-primary.dropdown-toggle:hover,
.open > .btn-primary.dropdown-toggle:focus,
.open > .btn-primary.dropdown-toggle.focus {
  color: #fff;
  background-color: #474071;
  border-color: #2d2847;
}
.btn-primary.disabled:hover,
.btn-primary.disabled:focus,
.btn-primary.disabled.focus,
.btn-primary[disabled]:hover,
.btn-primary[disabled]:focus,
.btn-primary[disabled].focus,
fieldset[disabled] .btn-primary:hover,
fieldset[disabled] .btn-primary:focus,
fieldset[disabled] .btn-primary.focus {
  background-color: #6c62a6;
  border-color: #605698;
}
.btn-primary .badge {
  color: #6c62a6;
  background-color: #fff;
}

.btn {
  height: 45px;
  padding-left: 32px;
  padding-right: 32px;
  border-radius: 40px;
  line-height: 32px;
}

.btn-small {
  height: 32px;
  padding: 3px 16px;
  line-height: 24px;
}

.btn-mobile {
  margin-top: 10px;
}
@media (min-width: 27.5625em) {
  .btn-mobile {
    margin-top: 0;
  }
}

.btn-icon {
  padding-left: 8px;
}

.btn-github:before {
  content: '\f09b';
  display: inline-block;
  width: 1em;
  font-family: 'fontello';
  font-style: normal;
  font-weight: normal;
  text-decoration: inherit;
  text-align: center;
  font-variant: normal;
  text-transform: none;
  line-height: 1em;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  margin-right: 0.2em;
  margin-left: 0.2em;
  position: absolute;
  vertical-align: sub;
  margin: 0 10px 0 0;
  font-size: 2em;
  line-height: 1;
}

.btn-github span {
  padding-left: 45px;
}

.btn-inverted {
  background: #fff;
  color: #6c62a6;
}
</style>
