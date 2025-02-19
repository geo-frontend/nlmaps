<template>
  <div class="container">
    <a href="https://kadaster.nl" class="logo-kadaster"><KadasterLogo /></a>
  </div>
</template>
<script setup>
import KadasterLogo from '../assets/img/logo-kadaster.svg'
</script>
<style lang="css">
footer .logo-kadaster {
  display: inline-block;
  width: 60px;
}
footer .logo-kadaster svg {
  width: 100%;
  height: auto;
}

svg:not(:root) {
  overflow: hidden;
}

footer .logo-kadaster polyline,
footer .logo-kadaster path {
  fill: #fff;
}

@media (min-width: 48em) {
  footer .logo-kadaster {
    width: 90px;
  }
}
@media (min-width: 75em) {
  footer .logo-kadaster {
    width: 90px;
  }
}
</style>
