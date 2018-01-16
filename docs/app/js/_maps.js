import $ from 'jquery';
import Clipboard from 'clipboard';
import geoLocator from 'nlmaps-geolocator';
const browser = require('browser-detect')();

const BRTAkAttr = 'NLMaps | Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a> | <a href="http://www.verbeterdekaart.nl">Verbeter de kaart</a>';
const baseTileUrl = 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart/EPSG:3857';

export default class Maps {
    constructor(selector = '.js-wizard-map') {
        this.$wizardMap = $(selector);
        if (!this.$wizardMap.length) {
            return;
        }
        this.$geoButton = $('.js-get-geo');
        this.$wizardForm = $('.js-wizard-form');
        this.copyCodeSelector = '.js-copy-code';
        this.$copyCode = $(this.copyCodeSelector);
        this.$code = $(this.$copyCode.data('clipboard-target'));
        this.extension = 'png';

        this.setCodeTemplates();
        this.setmap();

        if ( browser.name === 'ie' ) {
            $(this.copyCodeSelector).text('Code selecteren');
        }
        new Clipboard(this.copyCodeSelector);

        this.geolocator = geoLocator();
    }

    setmap() {
        this.latitude = 52.2112;
        this.longitude = 5.9699;
        this.zoom = 10;

        this.handleForm();

        this.$geoButton.on('click', (e) => {
            e.preventDefault();
            this.geolocator.start();
            this.$geoButton.attr('disabled', true).addClass('is-loading');
            this.geolocator.on('position', (position) => {
                this.$geoButton.attr('disabled', false).removeClass('is-loading');
                this.setGeoLocation(position.coords);
            });
        });
    }

    handleForm() {
        this.$wizardForm.on('change', (e) => {
            // NOTE: Fallback for geocoder. This prevents the view from refreshing when clicking on a geocoding result.
            if (e.originalEvent != null) {
                const isGeocoder = e.originalEvent.target.id == 'nlmaps-geocoder-control-input';
                if (isGeocoder) {
                    return;
                }
            }

            this.wizardFormValues = this.$wizardForm.serializeArray();
            this.wizardMapService = this.wizardFormValues[0].value;
            this.wizardMapColor = this.wizardFormValues[1].value;
            this.wizardShowMarker = this.wizardFormValues[2].value;
            this.wizardOverlay = this.wizardFormValues[3].value;
            this.wizardShowGeocoder = this.wizardFormValues[4].value;
            this.currentUrl = baseTileUrl;
            this.extension = 'png';
            
            switch (this.wizardMapColor) {
                case 'default':
                    this.backgroundLayerName = 'standaard';
                    break;
                case 'pastel':
                    this.backgroundLayerName = 'pastel';
                    this.currentUrl = 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaartpastel/EPSG:3857';
                    break;
                case 'grey':
                    this.backgroundLayerName = 'grijs';
                    this.currentUrl = 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaartgrijs/EPSG:3857';
                    break;
                case 'air':
                    this.backgroundLayerName = 'luchtfoto';
                    this.currentUrl = 'https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/1.0.0/2016_ortho25/EPSG:3857';
                    this.extension = 'jpeg';
                    break;
            }

            switch (this.wizardOverlay) {
                case 'wms-none':
                    this.overlay = false;
                    break;
                case 'wms-percelen':
                    this.overlay = 'percelen';
                    break;
                case 'wms-gebouwen':
                    this.overlay = 'gebouwen';
                    break;
                case 'wms-hoogtebestand':
                    this.overlay = 'hoogte';
                    break;
                case 'wms-drone-no-fly-zone':
                    this.overlay = 'drone-no-fly-zones';
                    break;
            }

            switch (this.wizardShowMarker) {
                case 'marker-yes':
                    this.showMarker = true;
                    break;
                case 'marker-no':
                    this.showMarker = false;
                    break;
                default:
                    this.showMarker = true;
            }

            switch (this.wizardShowGeocoder) {
                case 'geocoder-yes':
                    this.geocoder = true;
                    break;
                case 'geocoder-no':
                    this.geocoder = false;
                    break;
                default:
                    this.geocoder = false;
            }

            switch (this.wizardMapService) {
                case 'google-maps':
                    this.currentMap = 'google-maps';
                    this.setGoogleMap();
                    break;
                case 'leaflet':
                    this.currentMap = 'leaflet';
                    this.setLeafletMap();
                    break;
                case 'open-layers':
                    this.currentMap = 'open-layers';
                    this.setOpenLayersMap();
                    break;
                case 'mapbox':
                    this.currentMap = 'mapbox';
                    this.setMapboxMap();
                    break;
            }

        }).trigger('change');
    }

    setGoogleMap() {
        this.createMap();

        /* eslint-disable */
        nlmaps.lib = 'googlemaps';
        var opts = {
            style: this.backgroundLayerName,
            target: this.currentMap,
            center: {
                longitude: this.longitude,
                latitude: this.latitude
            },
            overlay: this.overlay,
            marker: this.showMarker,
            zoom: this.zoom,
            search: this.geocoder
        };
        var map = nlmaps.createMap(opts);

        google.maps.event.addListener(map, 'center_changed', () => {
            let center = map.getCenter();
            this.latitude = center.lat();
            this.longitude = center.lng();

            this.updateCode();
        });

        google.maps.event.addListener(map, 'zoom_changed', () => {
            this.zoom = map.getZoom();

            this.updateCode();
        });
        /* eslint-enable */

        this.updateCode();
    }

    setLeafletMap() {
        this.createMap();
        /* eslint-disable */
        nlmaps.lib = 'leaflet';
        var opts = {
            style: this.backgroundLayerName,
            target: this.currentMap,
            center: {
                longitude: this.longitude,
                latitude: this.latitude
            },
            search: this.geocoder,
            overlay: this.overlay,
            marker: this.showMarker,
            zoom: this.zoom
        };
        var map = nlmaps.createMap(opts);
        /* eslint-enable */

        map.on('move', () => {
            let center = map.getCenter();
            this.latitude = center.lat;
            this.longitude = center.lng;
            this.zoom = map.getZoom();

            this.updateCode();
        });

        map.on('zoom', () => {
            let center = map.getCenter();
            this.latitude = center.lat;
            this.longitude = center.lng;
            this.zoom = map.getZoom();

            this.updateCode();
        });

        this.updateCode();
    }

    setOpenLayersMap() {
        this.createMap();
        /* eslint-disable */        
        nlmaps.lib = 'openlayers';
        var opts = {
            style: this.backgroundLayerName,
            target: this.currentMap,
            center: {
                longitude: this.longitude,
                latitude: this.latitude
            },
            overlay: this.overlay,
            search: this.geocoder,
            marker: this.showMarker,
            zoom: this.zoom
        };

        var map = nlmaps.createMap(opts);
        map.on('moveend', () => {
            let center = ol.proj.toLonLat(map.getView().getCenter());
            this.latitude = center[1];
            this.longitude = center[0];
            this.zoom = map.getView().getZoom();
            this.updateCode();
        });
        /* eslint-enable */

        this.updateCode();
    }

    setMapboxMap() {
        this.createMap();

        /* eslint-disable */
        nlmaps.lib = 'leaflet';
        var opts = {
            style: this.backgroundLayerName,
            target: this.currentMap,
            center: {
                longitude: this.longitude,
                latitude: this.latitude
            },
            overlay: this.overlay,
            search: this.geocoder,
            marker: this.showMarker,
            zoom: this.zoom
        };
        var map = nlmaps.createMap(opts);
        /* eslint-enable */

        map.on('move', () => {
            let center = map.getCenter();
            this.latitude = center.lat;
            this.longitude = center.lng;
            this.zoom = map.getZoom();

            this.updateCode();
        });

        map.on('zoom', () => {
            let center = map.getCenter();
            this.latitude = center.lat;
            this.longitude = center.lng;
            this.zoom = map.getZoom();

            this.updateCode();
        });

        this.updateCode();
    }

    setGeoLocation(coords) {
        this.latitude = coords.latitude;
        this.longitude = coords.longitude;
        coonsole.log('Running another update cycle');
        switch (this.currentMap) {
            case 'google-maps':
                this.setGoogleMap();
                break;
            case 'leaflet':
                this.setLeafletMap();
                break;
            case 'open-layers':
                this.setOpenLayersMap();
                break;
            case 'mapbox':
                this.setMapboxMap();
                break;
        }
    }

    createMap() {
        $('.map').hide(); // First hide all other maps

        $(`#${this.currentMap}`).remove();
        $(`#nlmaps-geocoder-control-results`).remove();
        let $map = $(`<div class="map" id="${this.currentMap}">`).appendTo(this.$wizardMap);

        return $map;
    }

    focusMap() {
        $('.map').hide(); // First hide all other maps
        $(`#${this.currentMap}`).show();
    }

    updateCode() {
        let code = this.getCodeTemplate();
        code = code.replace(/{overlay}/g, this.overlay);
        code = code.replace(/{marker}/g, this.showMarker);
        code = code.replace(/{geocoder}/g, this.geocoder);
        code = code.replace(/{backgroundLayerName}/g, this.backgroundLayerName);
        code = code.replace(/{latitude}/g, this.latitude);
        code = code.replace(/{longitude}/g, this.longitude);
        code = code.replace(/{zoomlevel}/g, this.zoom);
        code = code.replace(/{url}/g, this.currentUrl);
        code = code.replace(/{extension}/g, this.extension);
        code = code.replace(/{attribution}/g, BRTAkAttr);
        this.$code.html(code);
    }

    setCodeTemplates() {
        this.googleMapsTemplate = $('#google-maps-template').text().replace(/(?:\r\n|\r|\n)/g, '<br />');
        this.leafletTemplate = $('#leaflet-template').text().replace(/(?:\r\n|\r|\n)/g, '<br />');
        this.openLayersTemplate = $('#open-layers-template').text().replace(/(?:\r\n|\r|\n)/g, '<br />');
        this.mapboxTemplate = $('#mapbox-template').text().replace(/(?:\r\n|\r|\n)/g, '<br />');
    }

    getCodeTemplate() {
        switch (this.currentMap) {
            case 'google-maps':
                return this.googleMapsTemplate;
            case 'leaflet':
                return this.leafletTemplate;
            case 'open-layers':
                return this.openLayersTemplate;
            case 'mapbox':
                return this.mapboxTemplate;
        }
    }
}
