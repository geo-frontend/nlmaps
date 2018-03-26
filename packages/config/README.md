# nlmaps configuration

**version**:  `float` version of the configuration format, currently `0.1`

**basemaps**: `object` default settings for basemaps & extra parameters for each base-layers

**wms**: `object` default settings for wms servers & extra parameters for each wms-layers

**geocoder**: `object` urls for the goecoder services

## basemap object
**defaults**: `object` default settings for base-layers:
* **crs**: `string` epsg code to be used, eg `epsg:3857`
* **attr**: `html-string` attribution string to be shown on the map
* **minZoom**: `integer` minimum zoomlevel for the map
* **maxZoom**: `integer` maximum zoomlevel for the map
* **type**: `string` type of the baselayer service. Currently only `wmts` is supported
* **format**: `string` format of the baselayer, eg `png`, `jpeg`
* **baseUrl**: `string` default webservice url, can be overwritten with the `url` parameter in the `layers` object

**layers**: `array` layer specific settings:
* **name**: `string` user friendly name
* **layerName**: `string` name of the layer in the webservice
* **url**: `string` base url of the service, a typical wmts service `https://host/service/layername/{z}/{x}/{y}.png` would be split like this: `[url]/[layerName]/z.x.y.[format]`

## wms object
**defaults**: `object` default settings for wms-layers:
* **baseUrl**: `string` default webservice url, supports templating, currently only `{workSpaceName}`. Can be overwritten with the `url` parameter in the `layers` object 
* **version**: `string` WMS version eg `1.1.0`
* **transparent**: `boolean` WMS parameter whether or not to request transparency
* **format**: `string` WMS-style image format eg. `image/png`
* **minZoom**: `integer` minimum zoomlevel for the map
* **maxZoom**: `integer` maximum zoomlevel for the map

**layers**: `array` layer specific settings:
* **name**: `string` user friendly name
* **workSpaceName**: `string` with the workspace of the WMS layer, can be used for templating in the (base)url (common with Geoserver)
url
* **layerName**: `string` name of the layer in the webservice
* **styleName**: `string` name of the style to be applied on the layer
* **url**: `string` base url of the service, supports templating, currently only `{workSpaceName}`

## Geocoder object
**suggestUrl**: `string` the url to the suggest service (currently only locatieserver v3 supported)

**lookupUrl**: `string` the url to the geocoder service (currently only locatieserver v3 supported)

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
            "format": "png",
            "baseUrl": "https://geodata.nationaalgeoregister.nl/tiles/service"
        },
        "layers": [
            {
                "name": "standaard",
                "urlname": "brtachtergrondkaart"                
            },{
                "name": "luchtfoto",
                "urlname": "2016_ortho25",
                "url": "https://geodata.nationaalgeoregister.nl/luchtfoto/rgb",
                "format": "jpeg"
            }
        ]
    },
    "wms": {
        "defaults": {
            "baseUrl": "https://geodata.nationaalgeoregister.nl/{workSpaceName}/wms?",            
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
        "suggestUrl": "https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?",
        "lookupUrl": "https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?"
    }
}
```