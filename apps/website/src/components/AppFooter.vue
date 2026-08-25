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

footer .logo-kadaster polyline,
footer .logo-kadaster path {
  fill: #fff;
}

@media (width >= 48em) {
  footer .logo-kadaster {
    width: 90px;
  }
}

@media (width >= 75em) {
  footer .logo-kadaster {
    width: 90px;
  }
}

footer .logo-kadaster svg {
  width: 80%;
  height: auto;
}
</style>
