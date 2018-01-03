function wmsBaseUrl(workSpaceName) {
  return 'https://geodata.nationaalgeoregister.nl/' + workSpaceName + '/wms?';
}

function mapWmsProvider(name, options){
  const wmsParameters = {
    workSpaceName: '',
    layerName: '',
    styleName: '',
    url: '',
    minZoom: 0,
    maxZoom: 24,
  };

  switch (name) {
    case 'gebouwen':
      wmsParameters.workSpaceName = 'bag';
      wmsParameters.layerName = 'pand';
      wmsParameters.styleName = '';
      break;
    case 'percelen':
      wmsParameters.workSpaceName = 'kadastralekaartv3';
      wmsParameters.layerName = 'kadastralekaart';
      wmsParameters.styleName = '';
      break;
    case 'drone-no-fly-zones':
      wmsParameters.workSpaceName = 'dronenoflyzones';
      wmsParameters.layerName = 'luchtvaartgebieden,landingsite';
      wmsParameters.styleName = '';
      break;
    case 'hoogte':
      wmsParameters.workSpaceName = 'ahn2';
      wmsParameters.layerName = 'ahn2_05m_int';
      wmsParameters.styleName = 'ahn2:ahn2_05m_detail';
      break;
    case 'gemeenten':
      wmsParameters.workSpaceName = 'bestuurlijkegrenzen';
      wmsParameters.layerName = 'gemeenten';
      wmsParameters.styleName = 'bestuurlijkegrenzen:bestuurlijkegrenzen_gemeentegrenzen';
      break;
    case 'provincies':
      wmsParameters.workSpaceName = 'bestuurlijkegrenzen';
      wmsParameters.layerName = 'provincies';
      wmsParameters.styleName = 'bestuurlijkegrenzen:bestuurlijkegrenzen_provinciegrenzen';
      break;
    default:
      wmsParameters.url = options.url;
      wmsParameters.layerName = options.layerName;
      wmsParameters.styleName = options.styleName;
    }

    wmsParameters.url = wmsBaseUrl(wmsParameters.workSpaceName);

    return wmsParameters;
  }

  function makeWmsProvider(name) {
    const wmsParameters = mapWmsProvider(name);
    return {
      url: wmsParameters.url,
      service: 'WMS',
      version: '1.1.1',
      request: 'GetMap',
      layers: wmsParameters.layerName,
      styles: wmsParameters.styleName,
      transparent: true,
      format: 'image/png',
    }
  }

  const WMS_PROVIDERS = {
    "gebouwen": makeWmsProvider('gebouwen'),
    "percelen": makeWmsProvider('percelen'),
    "drone-no-fly-zones": makeWmsProvider('drone-no-fly-zones'),
    "hoogte": makeWmsProvider('hoogte'),
    "gemeenten": makeWmsProvider('gemeenten'),
    "provincies": makeWmsProvider('provincies')
  };

  export { WMS_PROVIDERS, makeWmsProvider }
