export default {
    "version": 0.2,
    "basemaps": {
        "defaults": {
            "crs": "EPSG:3857",
            "attr": "Kaartgegevens &copy; <a href='https://www.kadaster.nl'>Kadaster</a> | <a href='https://www.verbeterdekaart.nl'>Verbeter de kaart</a>",
            "minZoom": 6,
            "maxZoom": 19,
            "type": "wmts",
            "format": "png",
            "url": "https://geodata.nationaalgeoregister.nl/tiles/service"
        },
        "layers": [
            {
                "name": "standaard",
                "layerName": "brtachtergrondkaart"
            },
            {
                "name": "grijs",
                "layerName": "brtachtergrondkaartgrijs"
            },
            {
                "name": "pastel",
                "layerName": "brtachtergrondkaartpastel"
            },{
                "name": "luchtfoto",
                "layerName": "2016_ortho25",
                "url": "https://geodata.nationaalgeoregister.nl/luchtfoto/rgb",
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
                "name": "gebouwen",
                "workSpaceName": "bag",
                "layerName": "pand"
            },
            {
                "name": "percelen",
                "workSpaceName": "bkadastralekaartv3ag",
                "layerName": "kadastralekaart"
            },
            {
                "name": "drone-no-fly-zones",
                "workSpaceName": "dronenoflyzones",
                "layerName": "luchtvaartgebieden,landingsite"
            },
            {
                "name": "hoogte",
                "workSpaceName": "ahn2",
                "layerName": "ahn2_05m_int",
                "styleName": "ahn2:ahn2_05m_detail"
            },
            {
                "name": "gemeenten",
                "workSpaceName": "bestuurlijkegrenzen",
                "layerName": "gemeenten",
                "styleName": "bestuurlijkegrenzen:bestuurlijkegrenzen_gemeentegrenzen"
            },
            {
                "name": "provincies",
                "workSpaceName": "bestuurlijkegrenzen",
                "layerName": "provincies",
                "styleName": "bestuurlijkegrenzen:bestuurlijkegrenzen_provinciegrenzen"
            }
        ]
    },
    "geocoder": {
        "suggestUrl": "https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?",
        "lookupUrl": "https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?"
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
