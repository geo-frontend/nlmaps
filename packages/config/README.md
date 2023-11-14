# nlmaps configuration

**version**:  `float` version of the configuration format, currently `0.2`

**basemaps**: `object` default settings for basemaps & extra parameters for each base-layers

**wms**: `object` default settings for wms servers & extra parameters for each wms-layers

**geocoder**: `object` urls for the goecoder services and placeholder text for the search input

**map**: `object` default settings for the map

**classnames**: `object` classnames for various UI elments

## basemap object
**defaults**: `object` default settings for base-layers:
* **crs**: `string` epsg code to be used, eg `epsg:3857`
* **attribution**: `html-string` attribution string to be shown on the map
* **minZoom**: `integer` minimum zoomlevel for the base-layer
* **maxZoom**: `integer` maximum zoomlevel for the base-layer
* **type**: `string` type of the baselayer service. Currently only `wmts` (REST) and `tms` are supported
* **format**: `string` format of the baselayer, eg `png`, `jpeg`
* **url**: `string` default webservice url, can be overwritten with the `url` parameter in the `layers` object

**layers**: `array` layer specific settings:
* **name**: `string` computer friendly name
* **layerName**: `string` name of the layer in the webservice
* **url**: `string` base url of the service, a typical wmts service `https://host/service/layername/crs/{z}/{x}/{y}.png` would be split like this: `[url]/[type]/[layerName]/[crs]/z.x.y.[format]` and a tms service `https://host/layername/{z}/{x}/{y}.png` like this: `[url]/[layerName]/{z}/{x}/{y}.[format]`
* **subdomains**: `string` Subdomains of the tile service. Can be passed in the form of one string where each letter is a subdomain name: `'abcd'` needs a placholder `{s}` in the url

## wms object
**defaults**: `object` default settings for wms-layers:
* **url**: `string` default webservice url, supports templating, currently only `{workSpaceName}`. Can be overwritten with the `url` parameter in the `layers` object
* **version**: `string` WMS version eg `1.1.0`
* **transparent**: `boolean` WMS parameter whether or not to request transparency
* **format**: `string` WMS-style image format eg. `image/png`
* **minZoom**: `integer` minimum zoomlevel for the wms-layer
* **maxZoom**: `integer` maximum zoomlevel for the wms-layer

**layers**: `array` layer specific settings:
* **name**: `string` computer friendly name
* **workSpaceName**: `string` with the workspace of the WMS layer, can be used for templating in the (base)url (common with Geoserver)
url
* **layerName**: `string` name of the layer in the webservice
* **styleName**: `string` name of the style to be applied on the layer
* **url**: `string` base url of the service, supports templating, currently only `{workSpaceName}`

## Geocoder object
**suggestUrl**: `string` the url to the suggest service (currently only locatieserver v3 supported)

**lookupUrl**: `string` the url to the geocoder service (currently only locatieserver v3 supported)


## Map object
* **style**: `string` name of the basemaplayer to be used
* **center**: `object` latitude and longitude of the center of the map
* **zoom**: `integer` zoom level to start the map with
* **attribution**: `boolean` show attribution
* **extent**: `array` 4 floats defining the maximum extent of the map `[minX,minY,maxX,maxY]`


## Classnames object
A collection of arrays with classnames to be added to interface elements. This can be used to change the classnames to fit an organisation's design system. Nlmaps comes with a CSS stylesheet and the default classnames are the ones the CSS expects.
* **geocoderContainer** `array` used for the geocoder container. default: `nlmaps-geocoder-control-container`
* **geocoderSearch** `array` used for the search element. default: `nlmaps-geocoder-control-search`
* **geocoderButton** `array` used for the search button. default `nlmaps-geocoder-control-button`
* **geocoderResultList** `array` used for the result list. default `nlmaps-geocoder-result-list`
* **geocoderResultItem** `array` used for a single result item in the list. default `nlmaps-geocoder-result-item`
* **geocoderResultSelected** `array` used for the selected result item in the list. default `nlmaps-geocoder-result-selected`

## Example
```
 {
    "version": 0.1,
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
                "name": "gebouwen",
                "workSpaceName": "bag",
                "layerName": "pand"
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
        "suggestUrl": "https://api.pdok.nl/bzk/locatieserver/search/v3_1/suggest?",
        "lookupUrl": "https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?"
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
```
