<template>
  <div class="container">
    <div class="section-intro">
      <h2 class="heading section-heading">Handige links</h2>
    </div>
    <ul>
      <li><a href="https://www.kadaster.nl" target="_blank">Kadaster</a></li>
      <li><a href="https://pdok.nl" target="_blank">PDOK</a></li>
      <li><a href="https://geoforum.nl/" target="_blank">PDOK Forum</a></li>
      <li>
        <a
          href="https://www.kadaster.nl/zakelijk/producten/geo-informatie/nl-maps"
          target="_blank"
          >Kadaster NL Maps</a
        >
      </li>
      <li>
        <a href="https://app.pdok.nl/viewer" target="_blank">PDOK Viewer</a>
      </li>
      <li>
        <a href="https://www.pdok.nl/diensten#PDOK%20Fair%20Use" target="_blank"
          >PDOK fair-use</a
        >
      </li>
      <li>
        <a href="https://github.com/geo-frontend/nlmaps/" target="_blank"
          >NL Maps op Github</a
        >
      </li>
      <li>
        <a
          href="https://www.toegankelijkheidsverklaring.nl/register/2808"
          target="_blank"
          >Toegankelijkheid</a
        >
      </li>
      <li>
        <a
          href="https://github.com/geo-frontend/nlmaps/blob/develop/PRIVACY.md"
          target="_blank"
          >Privacy</a
        >
      </li>
    </ul>
  </div>
</template>
<style lang="css" scoped>
.container {
  text-align: center;
  max-width: 84em;
  margin: 0 auto;
  padding: 0 20px;
}
h2 {
  color: #fff;
  font-size: 2em;
  font-weight: 400;
}
ul {
  margin: 0 -20px;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  max-width: 84em;
}
li {
  text-align: left;
  list-style: none;
  width: 30%;
  padding: 0 20px;
}
a {
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

a:focus,
a:hover {
  padding: 12px;
  text-decoration: none;
  background: #fff;
  color: #006486;
}
</style>
