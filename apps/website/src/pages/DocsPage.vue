<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BenefitsBlock from '@/components/Benefits.vue'
import LeafletMap from '@/components/LeafletMap.vue'

import '@/assets/css/nlmaps.css'

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
            <div class="markdown js-docs"></div>
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
