export default {
    "version": 0.2,
    "basemaps": {
        "defaults": {
            "crs": "EPSG:3857",
            "attr": "Kaartgegevens &copy; <a href='https://www.kadaster.nl'>Kadaster</a> | <a href='https://www.verbeterdekaart.nl'>Verbeter de kaart</a>",
            "minZoom": 6,
            "maxZoom": 19,
            "type": "wmts",
            "format": "image/png",
            "url": "https://geodata.nationaalgeoregister.nl/tiles/service/wmts"
        },
        "layers": [
            {
                "url": "https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0",
                "crs": "EPSG:3857",
                "format": "png",
                "name": "standaard",
                "layerName": "standaard",
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
                "name": "foobar",
                "workSpaceName": "bash",
                "layerName": "peachy"
            },
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
        "suggestUrl": "https://api.pdok.nl/bzk/locatieserver/search/v3_1/suggest?",
        "lookupUrl": "https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?"
    },
    "featureQuery": {
        "baseUrl": "https://api.data.amsterdam.nl/bag/nummeraanduiding/?format=json&locatie=",
    },
    "map": {
        "style": 'standaard',
        "center": {
            "latitude": 52.093249,
            "longitude": 5.111994
        },
        "zoom": 8,
        "attribution": true,
        "extent": [-180,-90,180,90]
    }
}
