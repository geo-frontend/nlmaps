import config from '../config/.tmp/config.js';

const CONFIG = {};

CONFIG.BASE_DEFAULTS =  {
    crs: "EPSG:3857",
    attr: "",
    minZoom: 0,
    maxZoom: 19,
    type: "wmts",
    format: "png",
    url: ""
};
CONFIG.WMS_DEFAULTS = {
    url: "",
    version: "1.1.1",
    transparent: true,
    format: "image/png",
    minZoom: 0,
    maxZoom: 24,
    styleName: ""
}
CONFIG.BASEMAP_PROVIDERS = {};
CONFIG.WMS_PROVIDERS = {};
CONFIG.GEOCODER = {};
CONFIG.MAP = {
    "zoomposition": "bottomleft"
};
CONFIG.MARKER = {};
CONFIG.CLASSNAMES = {
    'geocoderContainer': ['nlmaps-geocoder-control-container'],
    'geocoderSearch': ['nlmaps-geocoder-control-search'],
    'geocoderButton': ['nlmaps-geocoder-control-button'],
    'geocoderResultList': ['nlmaps-geocoder-result-list'],
    'geocoderResultItem' : ['nlmaps-geocoder-result-item']
}


function err(err) {
    throw(err);
}

if(config.version !== 0.2 ) {
    err('unsupported config version');
}

function mergeConfig(defaults,config) {
    return Object.assign({},defaults,config);
}

function parseBase(basemaps) {
    let defaults = mergeConfig(CONFIG.BASE_DEFAULTS,basemaps.defaults);
    if(!basemaps.layers || basemaps.layers.length < 0) {
        err('no basemap defined, please define a basemap in the configuration')
    }
    basemaps.layers.forEach(layer=>{
        if(!layer.name||CONFIG.BASEMAP_PROVIDERS[layer.name]!==undefined) {
            err('basemap names need to be defined and unique: '+layer.name)
        }
        CONFIG.BASEMAP_PROVIDERS[layer.name] = formatBasemapUrl(mergeConfig(defaults,layer));
    });
}
function parseWMS(wms) {
    let defaults = mergeConfig(CONFIG.WMS_DEFAULTS,wms.defaults);
    if(wms.layers) {
        wms.layers.forEach(layer=>{
            if(!layer.name||CONFIG.WMS_PROVIDERS[layer.name]!==undefined) {
                err('wms names need to be defined and unique: '+layer.name)
            }
            CONFIG.WMS_PROVIDERS[layer.name] = applyTemplate(mergeConfig(defaults,layer));
        })
    }
}
function parseGeocoder(geocoder) {
    CONFIG.GEOCODER.lookupUrl = geocoder.lookupUrl;
    CONFIG.GEOCODER.suggestUrl = geocoder.suggestUrl;
}
function parseMap(map) {
    CONFIG.MAP = mergeConfig({},map);
}

function formatBasemapUrl(layer) {
    switch(layer.type){
        case 'wmts':
            layer.url = `${layer.url}/${layer.type}/${layer.layerName}/${layer.crs}/{z}/{x}/{y}.${layer.format}`;
        break;
        case 'tms':
            layer.url = `${layer.url}/${layer.layerName}/{z}/{x}/{y}.${layer.format}`;
        break;
        default:
            layer.url = `${layer.url}/${layer.type}/${layer.layerName}/${layer.crs}/{z}/{x}/{y}.${layer.format}`;
    }
  return layer;

}

function applyTemplate(layer) {
    //Check if the url is templated
    let start = layer.url.indexOf('{');
    if(start>-1) {
        let end = layer.url.indexOf('}');
        let template  = layer.url.slice(start+1,end);
        if(template.toLowerCase() === "workspacename") {
            layer.url = layer.url.slice(0,start)+layer.workSpaceName+layer.url.slice(end+1,-1);
        }
        else {
            err('only workspacename templates are supported for now');
        }
    }
    return layer;
}

function parseFeatureQuery(baseUrl) {
  CONFIG.FEATUREQUERYBASEURL = baseUrl;
}

function parseClasses(classes) {
    CONFIG.CLASSNAMES = mergeConfig(CONFIG.CLASSNAMES,classes);
}

function parseMarker(marker) {
    CONFIG.MARKER = marker;
}

if(config.featureQuery !== undefined ) parseFeatureQuery(config.featureQuery.baseUrl);
parseMap(config.map);
parseBase(config.basemaps);
if(config.wms!==undefined)parseWMS(config.wms);
if(config.geocoder!==undefined)parseGeocoder(config.geocoder);
if(config.marker!==undefined)parseMarker(config.marker);
if(config.classnames!==undefined)parseClasses(config.classnames);
export { CONFIG };
