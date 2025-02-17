<template>
  <router-view />
</template>
<style lang="css">
body {
  margin: 0;
  overflow-x: hidden;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  background-color: #fff;
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

@font-face {
  font-family: 'Montserrat';
  src: url('@/assets/fonts/montserrat/Montserrat-Regular.eot');
  src:
    url('@/assets/fonts/montserrat/Montserrat-Regular.eot?#iefix')
      format('embedded-opentype'),
    url('@/assets/fonts/montserrat/Montserrat-Regular.woff2') format('woff2'),
    url('@/assets/fonts/montserrat/Montserrat-Regular.woff') format('woff'),
    url('@/assets/fonts/montserrat/Montserrat-Regular.ttf') format('truetype'),
    url('@/assets/fonts/montserrat/Montserrat-Regular.svg#Montserrat-Regular')
      format('svg');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Nunito';
  src: url('@/assets/fonts/nunito/Nunito-Regular.eot');
  src:
    url('@/assets/fonts/nunito/Nunito-Regular.eot?#iefix')
      format('embedded-opentype'),
    url('@/assets/fonts/nunito/Nunito-Regular.woff2') format('woff2'),
    url('@/assets/fonts/nunito/Nunito-Regular.woff') format('woff'),
    url('@/assets/fonts/nunito/Nunito-Regular.ttf') format('truetype'),
    url('@/assets/fonts/nunito/Nunito-Regular.svg#Nunito-Regular') format('svg');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'fontello';
  src: url('@/assets/fonts/fontello/fontello.eot?73410984');
  src:
    url('@/assets/fonts/fontello/fontello.eot?73410984#iefix')
      format('embedded-opentype'),
    url('@/assets/fonts/fontello/fontello.woff2?73410984') format('woff2'),
    url('@/assets/fonts/fontello/fontello.woff?73410984') format('woff'),
    url('@/assets/fonts/fontello/fontello.ttf?73410984') format('truetype'),
    url('@/assets/fonts/fontello/fontello.svg?73410984#fontello') format('svg');
  font-weight: normal;
  font-style: normal;
}

[class^='icon-']:before,
[class*=' icon-']:before {
  font-family: 'fontello';
  font-style: normal;
  font-weight: normal;

  display: inline-block;
  text-decoration: inherit;
  width: 1em;
  margin-right: 0.2em;
  text-align: center;
  /* opacity: .8; */

  /* For safety - reset parent styles, that can break glyph codes*/
  font-variant: normal;
  text-transform: none;

  /* fix buttons height, for twitter bootstrap */
  line-height: 1em;

  /* Animation center compensation - margins should be symmetric */
  /* remove if not needed */
  margin-left: 0.2em;

  /* you can be more comfortable with increased icons size */
  /* font-size: 120%; */

  /* Font smoothing. That was taken from TWBS */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Uncomment for 3D effect */
  /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */
}

.icon-comments:before {
  content: '\e800';
} /* '' */
.icon-upvote:before {
  content: '\e801';
} /* '' */
.icon-target:before {
  content: '\e802';
} /* '' */
.icon-spin5:before {
  content: '\e803';
} /* '' */
.icon-precise:before {
  content: '\e837';
} /* '' */
.icon-embedding:before {
  content: '\e838';
} /* '' */
.icon-official:before {
  content: '\e839';
} /* '' */
.icon-github-circled:before {
  content: '\f09b';
} /* '' */
.icon-docs:before {
  content: '\f0c5';
} /* '' */

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Montserrat', 'Nunito', sans-serif;
  font-weight: 400;
  line-height: 1.25;
  color: inherit;
}

a {
  text-decoration: none;
}

nav,
section {
  padding: 10vh 0;
  text-align: center;
}
</style>
