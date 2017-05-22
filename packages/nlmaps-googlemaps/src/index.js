import getProvider from '../../lib/providers.js';
let URL = 'http://tiles.energielabelatlas.nl/v2/osm';
let ATTR = 'Kaartgegevens &copy; <a href="cbs.nl">CBS</a>, <a href="kadaster.nl">Kadaster</a>, <a href="openstreetmap.org">OpenStreetMap contributors</a>';

function bgLayer () {
  if (typeof google === 'object' && typeof google.maps === 'object') {
    let ElaMap = new google.maps.ImageMapType({
      getTileUrl: function (coord, zoom) {
        let url = `${URL}/${zoom}/${coord.x}/${coord.y}.png`;
        return url;
      },
      tileSize: new google.maps.Size(256, 256),
      isPng: true,
      name: 'ELA',
      maxZoom: 22,
      minZoom: 8
    });
    return ElaMap;
  } else {
    let error = 'google is not defined'; 
    throw error;
  }

}



export { bgLayer };
