export default {
  version: 0.2,
  basemaps: {
    defaults: {
      crs: 'EPSG:3857',
      attribution:
        "Kaartgegevens &copy; <a href='https://www.kadaster.nl'>Kadaster</a> | \
            <a href='https://www.verbeterdekaart.nl'>Verbeter de kaart</a>",
      minZoom: 6,
      maxZoom: 19,
      type: 'wmts',
      format: 'png',
      url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0'
    },
    layers: [
      {
        url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0',
        crs: 'EPSG:3857',
        format: 'png',
        name: 'standaard',
        layerName: 'standaard'
      },
      {
        url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0',
        crs: 'EPSG:3857',
        format: 'png',
        name: 'grijs',
        layerName: 'grijs'
      },
      {
        url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0',
        crs: 'EPSG:3857',
        format: 'png',
        name: 'pastel',
        layerName: 'pastel'
      },
      {
        name: 'luchtfoto',
        crs: 'EPSG:3857',
        layerName: 'Actueel_ortho25',
        url: 'https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0',
        format: 'jpeg'
      }
    ]
  },
  wms: {
    defaults: {
      url: 'https://service.pdok.nl/{workSpaceName}?',
      version: '1.1.1',
      transparent: true,
      format: 'image/png',
      minZoom: 0,
      maxZoom: 24
    },
    layers: [
      {
        name: 'adressen',
        url: 'https://service.pdok.nl/kadaster/adressen/wms/v1_0?',
        layerName: 'adressen'
      },
      {
        name: 'percelen',
        url: 'https://service.pdok.nl/kadaster/kadastralekaart/wms/v5_0?',
        layerName: 'Kadastralekaart'
      },
      {
        name: 'gebouwen',
        url: 'https://service.pdok.nl/lv/bag/wms/v2_0?',
        layerName: 'pand'
      },
      {
        name: 'drone-no-fly-zones',
        url: 'https://service.pdok.nl/lvnl/drone-no-flyzones/wms/v1_0?',
        layerName: 'luchtvaartgebieden,landingsite'
      },
      {
        name: 'hoogte',
        url: 'https://service.pdok.nl/rws/ahn/wms/v1_0?',
        layerName: 'dsm_05m'
      },
      {
        name: 'gemeenten',
        url: 'https://service.pdok.nl/kadaster/bestuurlijkegebieden/wms/v1_0?',
        layerName: 'Gemeentegebied',
        styleName: 'Gemeentegebied'
      },
      {
        name: 'provincies',
        url: 'https://service.pdok.nl/kadaster/bestuurlijkegebieden/wms/v1_0?',
        layerName: 'Provinciegebied',
        styleName: 'Provinciegebied'
      },
      {
        name: 'land',
        url: 'https://service.pdok.nl/kadaster/bestuurlijkegebieden/wms/v1_0?',
        layerName: 'Landgebied',
        styleName: 'Landgebied'
      }
    ]
  },
  geocoder: {
    suggestUrl: 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/suggest?',
    lookupUrl: 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?',
    placeholder: 'Zoomen naar adres ...'
  },
  map: {
    style: 'standaard',
    center: {
      latitude: 52.093249,
      longitude: 5.111994
    },
    zoom: 8,
    attribution: true,
    extent: [-180, -90, 180, 90],
    zoomposition: 'topleft'
  },
  marker: {
    url: 'https://rawgit.com/geo-frontend/nlmaps/master/dist/assets/img/marker_icon.svg',
    iconSize: [64, 64],
    iconAnchor: [32, 64]
  },
  classnames: {
    geocoderContainer: ['nlmaps-geocoder-control-container'],
    geocoderSearch: ['nlmaps-geocoder-control-search'],
    geocoderButton: ['nlmaps-geocoder-control-button'],
    geocoderResultList: ['nlmaps-geocoder-result-list'],
    geocoderResultItem: ['nlmaps-geocoder-result-item'],
    geocoderResultSelected: ['nlmaps-geocoder-result-selected']
  }
}
