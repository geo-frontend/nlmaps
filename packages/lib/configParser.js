import config from '../config/config.js';


const CONFIG = {}

CONFIG.BASEMAP_PROVIDERS = {};
CONFIG.WMS_PROVIDERS = {};
CONFIG.GEOCODER = {};

if(config.version !== 0.1 ) {    
    err('unsupported config version');
} 
function err(err) {
    throw(err);
}
//TODO: write a better method to merge default settings object with settings object

//TODO: validate input
function parseBaseDefaults(d) {
    if(d===undefined||d===null) {
        d = {};
    }
    d.crs = d.crs?d.crs:"EPSG:3857";
    d.attr = d.attr?d.attr:"";
    d.minZoom = d.minZoom?d.minZoom:0;
    d.maxZoom = d.maxZoom?d.maxZoom:19;
    d.type = d.type?d.type:"wmts";
    d.format = d.format?d.format:"png";
    d.baseUrl = d.baseUrl?d.baseUrl:"";
    return d;
}
function parseBase(basemaps) {
    let defaults = parseBaseDefaults(basemaps.defaults);    
    if(!basemaps.layers || basemaps.layers.length < 0) {
        err('no basemap defined, please define a basemap in the configuration')
    }
    basemaps.layers.forEach(layer=>{
        let baselayer = {};
        baselayer.name = layer.name;
        baselayer.urlname = layer.urlname;
        baselayer.url = layer.url?layer.url:defaults.baseUrl;

        CONFIG.BASEMAP_PROVIDERS[layer.name] = baselayer;

    })

}

export { CONFIG }