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
        lng: 5,
        lat: 52,
        zoom: 10,
      },
    }
  },
}
</script>
<template>
  <DefaultLayout>
    <section class="section section-brand spotlight">
      <div class="container">
        <h1 class="heading spotlight-heading">
          Dé officiële kaart van Nederland
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
      <BenefitsBlock />
    </section>
    <section class="section section-wizard" id="wizard">
      <div class="container">
        <div class="section-intro">
          <h2 class="heading section-heading">Gebruik NL Maps nu</h2>
          <p>
            Ben jij een developer? Bekijk de&nbsp;&nbsp;<a
              href="{{ routes.docs }}"
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
                        checked="checked"
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
                        data-clipboard-target="#map-code"
                      >
                        Kopieer code
                      </button>
                      <pre class="wizard-code" id="map-code">
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
          <div class="docs tab"></div>
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
          <a href="#" class="btn js-forum-link" target="_blank">Alles tonen</a>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>
<style lang="css" scoped>
.section-brand {
  background: #006486;
  color: #fff;
}

.spotlight {
  position: relative;
  display: flex;
  justify-content: center;
  height: calc(10vh);
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
  font-size: 42px;
}

.spotlight-description {
  margin: 0 0 1em;
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

#benefits {
  grid-area: benefits;
}

#wizard {
  grid-area: wizard;
}

.wizard-step-content {
  text-align: left;
}

.btn {
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: 16px;
  height: 45px;
  padding-left: 32px;
  padding-right: 32px;
  border-radius: 40px;
  line-height: 32px;
  color: #fff;
  background-color: #6c62a6;
  border-color: #605698;
}

.btn:hover {
  color: #fff;
  background-color: #564d88;
  border-color: #474071;
  text-decoration: none;
}

.section-actions .btn + .btn {
  margin: 0 0 0 20px;
}

.btn-github {
  &:before {
    content: '\f09b';
    font-family: 'fontello';
    position: absolute;
    vertical-align: sub;
    margin: 0 10px 0 0;
    font-size: 2em;
    line-height: 1;
  }
}

.btn-github span {
  padding-left: 45px;
}

.wizard {
  position: relative;
  padding: 0 0 15px;

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    width: 100vw;
    height: calc(100% - 60px);
    margin: 60px 0 0;
    transform: translateX(-50%);
    background: #6c62a6;
  }
}

.wizard-steps {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
  background: #fff;
  box-shadow: 0 10px 40px 10px rgba(#000, 0.08);
  counter-reset: step;
}

.wizard-step {
  display: flex;
  padding: 20px;
  counter-increment: step;

  & + & {
    border-top: 1px solid #333;
  }

  &:before {
    content: counter(step);
    display: inline-block;
    width: 32px;
    height: 32px;
    margin: 0 15px 0 0;
    border-radius: 100%;
    line-height: 32px;
    font-style: normal;
    text-align: center;
    background: #6c62a6;
    color: #fff;
  }
}

.wizard-step-heading {
  flex: 1;
  font-size: 1.5em;
  line-height: 1.2;
  font-family: 'Montserrat', 'Nunito', sans-serif;
  text-align: left;
}

.wizard-step-explanation {
  display: block;
  margin-right: 15px;
  color: #00387d;
  font-size: 13px;
}

.wizard-step-content {
  flex: 2;
  padding: 0;
}

.wizard-map {
  position: relative;
}

.wizard-geo {
  position: absolute;
  z-index: 1000;
  top: 10px;
  right: 10px;
  border: none;
  background-color: #6c62a6;
  color: #fff;

  &:before {
    content: '\e802';
    font-family: fontello;
    margin: 0 10px 0 0;
    padding: 0;
  }

  &:hover {
    background-color: #006486;
  }

  &:disabled {
    &:hover {
      background-color: #6c62a6;
      cursor: default;
    }

    &:before {
      content: '\e803';
      animation: spin 2s infinite linear;
    }
  }
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

  &:after {
    content: '\f0c5';
    font-family: 'fontello';
    margin: 0 0 0 10px;
  }

  &:hover,
  &:focus {
    background: #fff;
    color: #6c62a6;
    text-decoration: none;
  }
}

.wizard-code {
  display: block;
  padding: 50px 20px 20px;
  background: #f3f3f3;
  font-size: 1em;
  white-space: pre-wrap;
  word-break: break-word;
}

.wizard-option {
  position: relative;

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    border: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);

    &:checked + label {
      border-color: #006486;
    }
  }

  label {
    width: 100%;
    padding: 10px 16px;
    border: 2px solid transparent;
    border-radius: 10px;
    cursor: pointer;

    &:focus,
    &:hover {
      border-color: mix(#fff, #006486, 70%);
    }
  }
}
</style>
