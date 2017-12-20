const lufostring = 'luchtfoto/rgb';
const brtstring = 'tiles/service';
const baseurl = '';
const servicecrs = '/EPSG:3857';
const attr = 'Kaartgegevens &copy; <a href="kadaster.nl">Kadaster</a> | <a href="http://www.verbeterdekaart.nl">verbeter de kaart</a>';
function baseUrl(name) {
  return `https://geodata.nationaalgeoregister.nl/${name === 'luchtfoto' ? lufostring : brtstring}/wmts/`
}

function mapLayerName(layername){
  let name;
  switch (layername) {
    case 'standaard':
      name = 'brtachtergrondkaart';
      break;
    case 'grijs':
      name = 'brtachtergrondkaartgrijs';
      break;
    case 'pastel' :
      name = 'brtachtergrondkaartpastel';
      break;
    case 'luchtfoto':
      name = '2016_ortho25';
      break;
    default:
      name = 'brtachtergrondkaart';
  }
  return name;
}

function makeProvider(name, format, minZoom, maxZoom) {
  const baseurl =  baseUrl(name);
  const urlname = mapLayerName(name);
  return {
    "bare_url":      [baseurl, urlname, servicecrs].join(""),
    "url":          [baseurl, urlname, servicecrs, "/{z}/{x}/{y}.", format].join(""),
    "format":         format,
    "minZoom":      minZoom,
    "maxZoom":      maxZoom,
    "attribution":  attr,
    "name":         `${name === 'luchtfoto' ? '' : 'NLMaps '} ${name}`
  };
};

const BASEMAP_PROVIDERS =  {
  "standaard":    makeProvider("standaard", "png", 6, 19),
  "pastel":       makeProvider("pastel", "png", 6, 19),
  "grijs":        makeProvider("grijs", "png", 6, 19),
  "luchtfoto":    makeProvider("luchtfoto", "jpeg", 6, 19)
};

export { BASEMAP_PROVIDERS }