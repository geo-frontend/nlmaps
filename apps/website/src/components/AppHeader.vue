<template>
  <div class="container">
    <span class="logo-nlmaps"><NLMapsLogo /></span>
    <a href="https://kadaster.nl" target="_blank" class="logo-kadaster"
      ><KadasterLogo
    /></a>
  </div>
</template>
<script setup>
import KadasterLogo from '../assets/img/logo-kadaster.svg'
import NLMapsLogo from '../assets/img/logo-nlmaps.svg'
</script>
<style lang="css">
header .container {
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 1140px;
}
.logo-kadaster polyline,
.logo-kadaster path {
  fill: #fff;
}
</style>
