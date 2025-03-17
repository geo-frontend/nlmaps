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
  padding-left: 20px;
  padding-right: 20px;
  margin-right: auto;
  margin-left: auto;
}

header .container:before,
header .container:after {
  display: table;
  content: ' ';
}

header .container:after {
  clear: both;
}
@media (min-width: 768px) {
  header .container {
    width: 760px;
  }
}
@media (min-width: 992px) {
  header .container {
    width: 980px;
  }
}
@media (min-width: 1200px) {
  header .container {
    width: 1180px;
  }
}

header .logo-nlmaps {
  display: inline-block;
  width: 100px;
}
header .logo-nlmaps svg {
  width: 100%;
  height: auto;
}
header .logo-kadaster {
  display: inline-block;
  width: 60px;
}
header .logo-kadaster svg {
  width: 100%;
  height: auto;
}
header .logo-kadaster polyline,
header .logo-kadaster path {
  fill: #fff;
}
header .logo-kadaster {
  float: right;
}

@media (min-width: 48em) {
  header .logo-nlmaps {
    width: 142px;
  }
  header .logo-kadaster {
    width: 90px;
  }
}
@media (min-width: 75em) {
  header .logo-nlmaps {
    width: 142px;
  }
  header .logo-kadaster {
    width: 90px;
  }
}
</style>
