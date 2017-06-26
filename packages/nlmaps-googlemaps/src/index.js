import { getProvider } from '../../lib/index.js';

function bgLayer (name='standaard') {
  if (typeof google === 'object' && typeof google.maps === 'object') {
    const provider = getProvider(name);
    let layer = new google.maps.ImageMapType({
      getTileUrl: function (coord, zoom) {
        let url = `${provider.bare_url}/${zoom}/${coord.x}/${coord.y}.png`;
        return url;
      },
      tileSize: new google.maps.Size(256, 256),
      isPng: true,
      name: provider.name,
      maxZoom: provider.maxZoom,
      minZoom: provider.minZoom
    });
    return layer;
  } else {
    const error = 'google is not defined'; 
    throw error;
  }

}



export { bgLayer };
