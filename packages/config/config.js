export default {
    "version": 0.2,
    "basemaps": {
        "defaults": {
            "crs": "EPSG:3857",
            "attribution": "Kaartgegevens &copy; <a href='https://www.kadaster.nl'>Kadaster</a> | \
            <a href='https://www.verbeterdekaart.nl'>Verbeter de kaart</a>",
            "minZoom": 6,
            "maxZoom": 19,
            "type": "wmts",
            "format": "png",
            "url": "https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0"
        },
        "layers": [
            {
                "url": "https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0",
                "crs": "EPSG:3857",
                "format": "png",
                "name": "standaard",
                "layerName": "standaard"
            },
            {
                "url": "https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0",
                "crs": "EPSG:3857",
                "format": "png",
                "name": "grijs",
                "layerName": "grijs"
            },
            {
                "url": "https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0",
                "crs": "EPSG:3857",
                "format": "png",
                "name": "pastel",
                "layerName": "pastel"
            },
            {
                "name": "luchtfoto",
                "crs": "EPSG:3857",
                "layerName": "Actueel_ortho25",
                "url": "https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0",
                "format": "jpeg"
            }
        ]
    },
    "wms": {
        "defaults": {
            "url": "https://geodata.nationaalgeoregister.nl/{workSpaceName}/wms?",
            "version": "1.1.1",
            "transparent": true,
            "format": "image/png",
            "minZoom": 0,
            "maxZoom": 24
        },
        "layers": [
            {
                "name": "percelen",
                "url": "https://geodata.nationaalgeoregister.nl/kadastralekaart/wms/v4_0?",
                "layerName": "kadastralekaart"
            },
            {
                "name": "gebouwen",
                "url": "https://geodata.nationaalgeoregister.nl/bag/wms/v1_1?",
                "layerName": "pand"
            },
            {
                "name": "drone-no-fly-zones",
                "url": "https://geodata.nationaalgeoregister.nl/dronenoflyzones/wms?",
                "layerName": "luchtvaartgebieden,landingsite"
            },
            {
                "name": "hoogte",
                "url": "https://geodata.nationaalgeoregister.nl/ahn3/wms?",
                "layerName": "ahn3_05m_dsm",
                "styleName": "ahn3:ahn3_05m_detail"
            },
            {
                "name": "gemeenten",
                "url": "https://geodata.nationaalgeoregister.nl/bestuurlijkegrenzen/wms?",
                "layerName": "gemeenten",
                "styleName": "bestuurlijkegrenzen:bestuurlijkegrenzen_gemeentegrenzen"
            },
            {
                "name": "provincies",
                "url": "https://geodata.nationaalgeoregister.nl/bestuurlijkegrenzen/wms?",
                "layerName": "provincies",
                "styleName": "bestuurlijkegrenzen:bestuurlijkegrenzen_provinciegrenzen"
            }
        ]
    },
    "geocoder": {
        "suggestUrl": "https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?",
        "lookupUrl": "https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?",
        "placeholder": "Zoomen naar adres ..."
    },
    "map": {
        "style": 'standaard',
        "center": {
            "latitude": 52.093249,
            "longitude": 5.111994
        },
        "zoom": 8,
        "attribution": true,
        "extent": [-180,-90,180,90],
        "zoomposition": "topright"
    },
    "marker": {
      "url": "https://rawgit.com/geo-frontend/nlmaps/master/dist/assets/img/marker_icon.svg",
      "iconSize": [64, 64],
      "iconAnchor": [32, 64]
    },
    "classnames": {
        'geocoderContainer': ['nlmaps-geocoder-control-container'],
        'geocoderSearch': ['nlmaps-geocoder-control-search'],
        'geocoderButton': ['nlmaps-geocoder-control-button'],
        'geocoderResultList': ['nlmaps-geocoder-result-list'],
        'geocoderResultItem' : ['nlmaps-geocoder-result-item'],
        'geocoderResultSelected' : ['nlmaps-geocoder-result-selected']
    }
}
