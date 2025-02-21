<script setup>
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppNavigation from '@/components/AppNavigation.vue'
</script>
<template>
  <header>
    <AppHeader />
  </header>
  <main>
    <slot />
  </main>
  <nav class="section section-brand">
    <AppNavigation />
  </nav>
  <footer>
    <AppFooter />
  </footer>
</template>
<style lang="css">
html {
  font-size: 10px;
}

body {
  margin: 0;
  overflow-x: hidden;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  background-color: #fff;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Montserrat', 'Nunito', sans-serif;
  font-weight: 700;
  line-height: 1.25;
  color: inherit;
}

h1 {
  font-size: 32px;
  margin-top: 24px;
  margin-bottom: 12px;
}
h2 {
  font-size: 24px;
  margin-top: 24px;
  margin-bottom: 12px;
}
h3 {
  font-size: 20px;
  margin-top: 24px;
  margin-bottom: 12px;
}
h4 {
  font-size: 20px;
}
h5 {
  font-size: 16px;
}
h6 {
  font-size: 14px;
}
button {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  cursor: pointer;
}

label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: 700;
}

a {
  text-decoration: none;
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    'header'
    'benefits'
    'wizard'
    'navigation'
    'footer';
}

header,
footer,
nav {
  padding-left: 80px;
  padding-right: 80px;
}

header {
  grid-area: header;
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  padding: 20px 0 0;
}

@media (min-width: 48em) {
  header {
    padding-top: 24px;
  }
}
@media (min-width: 75em) {
  header {
    padding-top: 55px;
  }
}

nav {
  background-color: rgb(0, 100, 134);
  grid-area: navigation;
}

footer {
  background-color: rgb(0, 100, 134);
  grid-area: footer;
  padding: 30px 0 20px;
  text-align: center;
}
</style>
