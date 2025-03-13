<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BenefitsBlock from '@/components/Benefits.vue'
import LeafletMap from '@/components/LeafletMap.vue'

import '@/assets/css/nlmaps.css'

export default {
  components: {
    DefaultLayout,
    BenefitsBlock,
    LeafletMap,
  },
  data() {
    return {
      options: {
        backgroundLayerName: 'standaard',
        geocoder: false,
        marker: false,
        overlay: 'false',
      },
      location: {
        lng: 5.9699,
        lat: 52.2112,
        zoom: 10,
      },
    }
  },
  methods: {
    copySourceCode() {
      navigator.clipboard.writeText(this.$refs.elText.innerText)
    },
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
          <a href="#wizard" class="btn btn-primary">Gebruik NL Maps nu</a>
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

    <section id="benefits">
      <div class="container">
        <BenefitsBlock />
      </div>
    </section>
    <section class="section-wizard" id="wizard">
      <div class="container">
        <div class="section-intro">
          <h2 class="heading section-heading">Gebruik NL Maps nu</h2>
          <p>
            Ben jij een developer? Bekijk de&nbsp;&nbsp;<a
              href="./docs"
              class="btn btn-secondary btn-small"
              >NL Maps Library</a
            >
          </p>
        </div>
        <div class="nlmaps-tools">
          <div class="wizard tab">
            <form class="js-wizard-form">
              <ol class="wizard-steps">
                <li
                  class="wizard-step"
                  role="group"
                  aria-labelledby="step-2-label"
                >
                  <span id="step-2-label" class="wizard-step-heading"
                    >Kies een referentiekaart</span
                  >
                  <div role="radiogroup" class="wizard-step-content">
                    <span class="wizard-option">
                      <input
                        type="radio"
                        value="standaard"
                        name="backgroundLayerName"
                        id="theme-default"
                        v-model="options.backgroundLayerName"
                      />
                      <label for="theme-default">standaard</label>
                    </span>
                    <span class="wizard-option">
                      <input
                        type="radio"
                        value="pastel"
                        name="backgroundLayerName"
                        id="theme-pastel"
                        v-model="options.backgroundLayerName"
                      />
                      <label for="theme-pastel">pastel</label>
                    </span>
                    <span class="wizard-option">
                      <input
                        type="radio"
                        value="grijs"
                        name="backgroundLayerName"
                        id="theme-grey"
                        v-model="options.backgroundLayerName"
                      />
                      <label for="theme-grey">grijs</label>
                    </span>
                    <span class="wizard-option">
                      <input
                        type="radio"
                        value="luchtfoto"
                        name="backgroundLayerName"
                        id="theme-air"
                        v-model="options.backgroundLayerName"
                      />
                      <label for="theme-air">luchtfoto</label>
                    </span>
                  </div>
                </li>
                <li
                  class="wizard-step"
                  role="group"
                  aria-labelledby="step-3-label"
                >
                  <span id="step-3-label" class="wizard-step-heading"
                    >Kies een marker
                    <span class="wizard-step-explanation">
                      De marker wordt automatisch op het midden van de kaart
                      geplaatst.
                    </span>
                  </span>
                  <div role="radiogroup" class="wizard-step-content">
                    <span class="wizard-option">
                      <input
                        type="radio"
                        :value="false"
                        name="marker"
                        id="marker-no"
                        v-model="options.marker"
                      />
                      <label for="marker-no">geen marker</label>
                    </span>
                    <span class="wizard-option">
                      <input
                        type="radio"
                        :value="true"
                        name="marker"
                        id="marker-yes"
                        v-model="options.marker"
                      />
                      <label for="marker-yes">marker</label>
                    </span>
                  </div>
                </li>
                <li
                  class="wizard-step"
                  role="group"
                  aria-labelledby="step-4-label"
                >
                  <span id="step-4-label" class="wizard-step-heading">
                    Kies kaartgegevens
                    <span class="wizard-step-explanation">
                      Sommige lagen zijn alleen beschikbaar als de kaart verder
                      is ingezoomd.
                    </span>
                  </span>
                  <div role="radiogroup" class="wizard-step-content">
                    <span class="wizard-option">
                      <input
                        type="radio"
                        value="false"
                        name="overlay"
                        id="overlay-false"
                        v-model="options.overlay"
                      />
                      <label for="overlay-false">geen</label>
                    </span>
                    <span class="wizard-option">
                      <input
                        type="radio"
                        value="percelen"
                        name="overlay"
                        id="overlay-percelen"
                        v-model="options.overlay"
                      />
                      <label for="overlay-percelen">percelen</label>
                    </span>
                    <span class="wizard-option">
                      <input
                        type="radio"
                        value="adressen"
                        name="overlay"
                        id="overlay-adressen"
                        v-model="options.overlay"
                      />
                      <label for="overlay-adressen">adressen</label>
                    </span>
                    <span class="wizard-option">
                      <input
                        type="radio"
                        value="gebouwen"
                        name="overlay"
                        id="overlay-gebouwen"
                        v-model="options.overlay"
                      />
                      <label for="overlay-gebouwen">gebouwen</label>
                    </span>
                    <span class="wizard-option">
                      <input
                        type="radio"
                        value="gemeenten"
                        name="overlay"
                        id="overlay-gemeenten"
                        v-model="options.overlay"
                      />
                      <label for="overlay-gemeenten">gemeenten</label>
                    </span>
                    <span class="wizard-option">
                      <input
                        type="radio"
                        value="provincies"
                        name="overlay"
                        id="overlay-provincies"
                        v-model="options.overlay"
                      />
                      <label for="overlay-provincies">provincies</label>
                    </span>
                    <span class="wizard-option">
                      <input
                        type="radio"
                        value="land"
                        name="overlay"
                        id="overlay-land"
                        v-model="options.overlay"
                      />
                      <label for="overlay-land">land</label>
                    </span>
                  </div>
                </li>
                <li
                  class="wizard-step"
                  role="group"
                  aria-labelledby="step-5-label"
                >
                  <span id="step-5-label" class="wizard-step-heading"
                    >Kies een zoekfunctie
                  </span>
                  <div role="radiogroup" class="wizard-step-content">
                    <span class="wizard-option">
                      <input
                        type="radio"
                        :value="false"
                        name="geocoder"
                        id="geocoder-no"
                        v-model="options.geocoder"
                      />
                      <label for="geocoder-no">geen zoekbalk</label>
                    </span>
                    <span class="wizard-option">
                      <input
                        type="radio"
                        :value="true"
                        name="geocoder"
                        id="geocoder-yes"
                        v-model="options.geocoder"
                      />
                      <label for="geocoder-yes">zoekbalk</label>
                    </span>
                  </div>
                </li>
                <li class="wizard-step">
                  <span class="wizard-step-heading">Kopieer de code</span>
                  <div class="wizard-step-content">
                    <div class="wizard-map js-wizard-map">
                      <LeafletMap
                        v-bind:mapOptions="options"
                        v-model:viewPort="location"
                      />
                      <button class="wizard-geo js-get-geo">locatie</button>
                    </div>
                    <div class="wizard-code-block">
                      <button
                        type="button"
                        class="wizard-copy js-copy-code"
                        @click="copySourceCode"
                      >
                        Kopieer code
                      </button>
                      <pre class="wizard-code" id="map-code" ref="elText">
&lt;div id="nlmaps-holder">&lt;/div>

&lt;link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
&lt;script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js">&lt;/script>
&lt;script src="https://rawgit.com/geo-frontend/nlmaps/master/dist/nlmaps.iife.js">&lt;/script>
&lt;script>
    var nlMapsHolder = document.getElementById('nlmaps-holder');
    nlMapsHolder.style.height = '300px'; // Change to required height
    
    var opts = {
        style: '{{ options.backgroundLayerName }}',
        target: 'nlmaps-holder',
        center: {
            longitude: {{ location.lng.toFixed(6) }},
            latitude: {{ location.lat.toFixed(6) }}
        },
        overlay: '{{ options.overlay }}',
        marker: {{ options.marker }},
        zoom: {{ location.zoom }},
        search: {{ options.geocoder }}
    };
    var map = nlmaps.createMap(opts);
&lt;/script>
</pre
                      >
                    </div>
                  </div>
                </li>
              </ol>
            </form>
            <div class="section-actions">
              <h2 class="heading section-heading">Uitgebreide documentatie?</h2>
              <p>Bekijk alle mogelijkheden op de NL Maps Github pagina.</p>
              <a
                href="https://github.com/geo-frontend/nlmaps/"
                target="_blank"
                class="btn btn-primary btn-icon btn-github btn-inverted btn-mobile"
              >
                <span>Bekijk op Github</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container container-narrow">
        <div class="section-intro">
          <h2 class="heading section-heading">Praat mee!</h2>
        </div>
        <ul class="forum js-forum"></ul>
        <div class="section-actions">
          <a href="#" class="btn btn-primary js-forum-link" target="_blank"
            >Alles tonen</a
          >
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

.wizard {
  position: relative;
  padding: 0 0 15px;
}
.wizard:before {
  content: '';
  position: absolute;
  left: 50%;
  width: 100vw;
  height: calc(100% - 60px);
  margin: 60px 0 0;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  background: #6c62a6;
}
.wizard-steps {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
  background: #fff;
  box-shadow: 0 10px 40px 10px rgba(0, 0, 0, 0.08);
  counter-reset: step;
}
.wizard-step {
  padding: 20px;
  counter-increment: step;
}
.wizard-step + .wizard-step {
  border-top: 1px solid #e5e5e5;
}
.wizard-step:before {
  content: counter(step);
  display: inline-block;
  width: 24px;
  height: 24px;
  margin: 0 6px 0 0;
  border-radius: 100%;
  line-height: 24px;
  font-style: normal;
  text-align: center;
  background: #6c62a6;
  color: #fff;
}
.wizard-step-heading {
  font-family: 'Montserrat', 'Nunito', sans-serif;
  font-size: 16px;
  line-height: 1;
}
.wizard-step-explanation {
  display: block;
  margin-right: 15px;
  color: #00387d;
  font-size: 13px;
}
.wizard-step-content {
  padding: 30px 0 0;
  text-align: left;
}
.wizard-map {
  position: relative;
}
.wizard-map .map {
  position: relative;
  display: block;
  width: 100%;
  height: 30vh;
}
.wizard-geo {
  position: absolute;
  z-index: 1000;
  top: 10px;
  right: 10px;
  border: none;
  background: #6c62a6;
  color: #fff;
}
.wizard-geo:before {
  content: '\e802';
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
  margin: 0 10px 0 0;
  padding: 0;
}
.wizard-geo:hover {
  background: #006486;
}
.wizard-geo:disabled:hover {
  background: #6c62a6;
  cursor: default;
}
.wizard-geo:disabled:before {
  content: '\e803';
  -webkit-animation: spin 2s infinite linear;
  animation: spin 2s infinite linear;
}
.wizard-code-block {
  position: relative;
}
.wizard-copy {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  padding: 5px 10px;
  border: none;
  background: #6c62a6;
  color: #fff;
}
.wizard-copy:after {
  content: '\f0c5';
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
  margin: 0 0 0 10px;
}
.wizard-copy:hover,
.wizard-copy:focus {
  background: #fff;
  color: #6c62a6;
  text-decoration: none;
}
.wizard-code {
  display: block;
  padding: 50px 20px 20px;
  background: #f3f3f3;
  font-size: 14px;
  white-space: pre-wrap;
  word-break: break-word;
}
.wizard-option {
  position: relative;
}
.wizard-option input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  border: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}
.wizard-option input:checked + label {
  border-color: #006486;
}
.wizard-option label {
  width: 100%;
  padding: 10px 16px;
  border: 2px solid transparent;
  border-radius: 10px;
  cursor: pointer;
}
.wizard-option label:focus,
.wizard-option label:hover {
  border-color: #b3d1db;
}
@media (min-width: 48em) {
  .wizard:before {
    height: 100%;
  }
  .wizard-step {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding: 40px;
  }
  .wizard-step:before {
    width: 32px;
    height: 32px;
    margin: 0 15px 0 0;
    font-size: 20px;
    line-height: 32px;
  }
  .wizard-step-heading {
    display: block;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: 24px;
    line-height: 1.25;
  }
  .wizard-step-content {
    -webkit-flex: 2;
    -ms-flex: 2;
    flex: 2;
    padding: 0;
  }
  .wizard-option + .wizard-option {
    margin: 0 0 0 15px;
  }
  .wizard-option label {
    width: auto;
  }
  .wizard-code {
    padding: 20px;
  }
}
</style>
