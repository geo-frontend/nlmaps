<template>
  <ul class="usps">
    <li class="usps-item">
      <article class="usp usp-precise">
        <h2 class="heading usp-heading">
          De meest gedetailleerde kaart van Nederland
        </h2>
        <p class="usp-description">
          Zéér nauwkeurige weergave door middel van actuele topografische
          gegevens.
        </p>
      </article>
    </li>
    <li class="usps-item">
      <article class="usp usp-official">
        <h2 class="heading usp-heading">
          Op basis van officiële overheidsinformatie
        </h2>
        <p class="usp-description">
          Altijd actuele weergave door aanvulling en validatie met de laatste
          officiële overheids informatie van het Kadaster.
        </p>
      </article>
    </li>
    <li class="usps-item">
      <article class="usp usp-embedding">
        <h2 class="heading usp-heading">
          Makkelijk te integreren met tal van services
        </h2>
        <p class="usp-description">
          Ondersteuning voor Leaflet, OpenLayers &amp; MapLibre GL JS. Mis je
          een dienst?
          <a href="https://geoforum.nl/c/applicaties-en-diensten/nl-maps"
            >Laat het ons weten</a
          >
          of dien je eigen voorbeeldcode op
          <a href="https://github.com/geo-frontend/nlmaps/">Github in</a>.
        </p>
      </article>
    </li>
  </ul>
</template>
<style lang="css">
ul,
ol {
  margin-top: 0;
  margin-bottom: 12px;
}
.heading {
  margin-top: 0;
  font-size: inherit;
  font-weight: normal;
}
.usps {
  margin: 0;
  padding: 0;
  list-style: none;
}
.usps-item {
  padding: 0 0 16px;
}
.usps-item + .usps-item {
  padding-top: 30px;
  border-top: 1px solid #e5e5e5;
}
.usp {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
  padding: 90px 0 0;
  text-align: center;
}
.usp:before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 64px;
  height: 64px;
  -webkit-transform: translate(-50%, 0%);
  -ms-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  border-radius: 100%;
  background: #6c62a6;
}
.usp:after {
  content: '';
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
  top: 0;
  left: 50%;
  width: 64px;
  height: 64px;
  margin: 0;
  -webkit-transform: translate(-50%, 0%);
  -ms-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  font-size: 32px;
  line-height: 64px;
  text-align: center;
  color: #fff;
}
.usp-precise:after {
  font-size: 24px;
}
.usp-official:after {
  content: '\e839';
}
.usp-embedding:after {
  content: '\e838';
}
@media (min-width: 30em) {
  .usp {
    padding: 0 0 0 100px;
    text-align: left;
  }
  .usp:before {
    left: 0;
    width: 64px;
    height: 64px;
  }
  .usp:after {
    left: 0;
    width: 64px;
    height: 64px;
    font-size: 32px;
    line-height: 64px;
  }
}
@media (min-width: 48em) {
  .usps {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin: 0 -20px;
  }
  .usps-item {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding: 0 20px;
  }
  .usps-item + .usps-item {
    padding-top: 0;
    border-top: none;
  }
  .usp {
    padding: 95px 0 0;
  }
  .usp:before {
    left: 50%;
    width: 64px;
    height: 64px;
    -webkit-transform: translate(-50%, 0%);
    -ms-transform: translate(-50%, 0%);
    transform: translate(-50%, 0%);
  }
  .usp:after {
    left: 50%;
    width: 64px;
    height: 64px;
    -webkit-transform: translate(-50%, 0%);
    -ms-transform: translate(-50%, 0%);
    transform: translate(-50%, 0%);
    font-size: 32px;
    line-height: 64px;
  }
  .usp-precise:after {
    font-size: 48px;
  }
  .usp-heading {
    font-size: 20px;
  }
}
@media (min-width: 62em) {
  .usp {
    padding: 0 0 0 100px;
  }
  .usp:before {
    left: 0;
    width: 64px;
    height: 64px;
    -webkit-transform: inherit;
    -ms-transform: inherit;
    transform: inherit;
  }
  .usp:after {
    left: 0;
    width: 64px;
    height: 64px;
    -webkit-transform: inherit;
    -ms-transform: inherit;
    transform: inherit;
    font-size: 32px;
    line-height: 64px;
  }
  .usp-heading {
    font-size: 18px;
  }
}
@media (min-width: 75em) {
  .usp-heading {
    font-size: 20px;
  }
}
</style>
