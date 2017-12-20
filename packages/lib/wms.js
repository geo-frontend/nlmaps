function wmsBaseUrl(workSpaceName) {
    return 'https://geodata.nationaalgeoregister.nl/' + workSpaceName + '/wms?';
  }

function mapWmsProvider(name){
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
      case 'drone-no-fly-zone':
        wmsParameters.workSpaceName = 'dronenoflyzones';
        wmsParameters.layerName = 'luchtvaartgebieden';
        wmsParameters.styleName = '';
        break;
      case 'hoogtebestand':
        wmsParameters.workSpaceName = 'ahn2';
        wmsParameters.layerName = 'ahn2_05m_int';
        wmsParameters.styleName = 'ahn2:ahn2_05m_detail';
        break;
      case 'gemeentegrenzen':
        wmsParameters.workSpaceName = 'bestuurlijkegrenzen';
        wmsParameters.layerName = 'gemeenten';
        wmsParameters.styleName = 'bestuurlijkegrenzen:bestuurlijkegrenzen_gemeentegrenzen';
        break;
      case 'provinciegrenzen':
        wmsParameters.workSpaceName = 'bestuurlijkegrenzen';
        wmsParameters.layerName = 'provincies';
        wmsParameters.styleName = 'bestuurlijkegrenzen:bestuurlijkegrenzen_provinciegrenzen';
        break;
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
    "drone-no-fly-zone": makeWmsProvider('drone-no-fly-zone'),
    "hoogtebestand": makeWmsProvider('hoogtebestand'),
    "gemeentegrenzen": makeWmsProvider('gemeentegrenzen'),
    "provinciegrenzen": makeWmsProvider('provinciegrenzen')
  };

  export { WMS_PROVIDERS }
