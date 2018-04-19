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
    maxZoom: 24
}
CONFIG.BASEMAP_PROVIDERS = {};
CONFIG.WMS_PROVIDERS = {};
CONFIG.GEOCODER = {};
CONFIG.MAP = {};



function err(err) {
    throw(err);
}

if(config.version !== 0.1 ) {    
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
    CONFIG.GEOCODER.lookup = geocoder.lookupUrl;
    CONFIG.GEOCODER.suggest = geocoder.suggestUrl;
}
function parseMap(map) {
    CONFIG.MAP = mergeConfig({},map);
}

function formatBasemapUrl(layer) {
    switch(layer.type){
        case 'wmts':
            layer.url = `${layer.url}/${layer.type}/${layer.urlname}/${layer.crs}/{z}/{x}/{y}.${layer.format}`;
        break;
        case 'tms':
            layer.url = `${layer.url}/${layer.urlname}/{z}/{x}/{y}.${layer.format}`;
        break;
        default:
            layer.url = `${layer.url}/${layer.type}/${layer.urlname}/${layer.crs}/{z}/{x}/{y}.${layer.format}`;
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
parseMap(config.map);
parseBase(config.basemaps);
if(config.wms!==undefined)parseWMS(config.wms);
if(config.geocoder!==undefined)parseGeocoder(config.geocoder);
export { CONFIG };
