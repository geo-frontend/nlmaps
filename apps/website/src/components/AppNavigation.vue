<template>
  <div class="container">
    <div class="section-intro">
      <h2 class="heading section-heading">Handige links</h2>
    </div>
    <ul class="list">
      <li class="list-item">
        <a href="https://www.kadaster.nl" target="_blank" class="list-link"
          >Kadaster</a
        >
      </li>
      <li class="list-item">
        <a href="https://pdok.nl" target="_blank" class="list-link">PDOK</a>
      </li>
      <li class="list-item">
        <a href="https://geoforum.nl/" target="_blank" class="list-link"
          >PDOK Forum</a
        >
      </li>
      <li class="list-item">
        <a
          href="https://www.kadaster.nl/zakelijk/producten/geo-informatie/nl-maps"
          target="_blank"
          class="list-link"
          >Kadaster NL Maps</a
        >
      </li>
      <li class="list-item">
        <a href="https://app.pdok.nl/viewer" target="_blank" class="list-link"
          >PDOK Viewer</a
        >
      </li>
      <li class="list-item">
        <a
          href="https://www.pdok.nl/diensten#PDOK%20Fair%20Use"
          target="_blank"
          class="list-link"
          >PDOK fair-use</a
        >
      </li>
      <li class="list-item">
        <a
          href="https://github.com/geo-frontend/nlmaps/"
          target="_blank"
          class="list-link"
          >NL Maps op Github</a
        >
      </li>
      <li class="list-item">
        <a
          href="https://www.toegankelijkheidsverklaring.nl/register/2808"
          target="_blank"
          class="list-link"
          >Toegankelijkheid</a
        >
      </li>
      <li class="list-item">
        <a
          href="https://github.com/geo-frontend/nlmaps/blob/develop/PRIVACY.md"
          target="_blank"
          class="list-link"
          >Privacy</a
        >
      </li>
    </ul>
  </div>
</template>
<style lang="css" scoped>
.list {
  margin: 0 -20px;
  padding: 0;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  list-style: none;
}
.list-item {
  padding: 0 20px;
}
.list-link {
  display: block;
  padding: 12px 0;
  margin-top: -1px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  color: #fff;
  transition:
    background 0.3s linear,
    padding 0.3s linear;
}
.list-link:focus,
.list-link:hover {
  padding: 12px;
  text-decoration: none;
  background: #fff;
  color: #006486;
}
@media (min-width: 48em) {
  .list {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .list-item {
    width: 33.33333%;
  }
}
</style>
