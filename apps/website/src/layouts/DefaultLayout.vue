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
<style lang="css" scoped>
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
