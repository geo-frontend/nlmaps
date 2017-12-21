import $ from 'jquery';
import Clipboard from 'clipboard';
import geoLocator from 'nlmaps-geolocator';
const browser = require('browser-detect')();

const BRTAkAttr = 'NLMaps | Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a> | <a href="http://www.verbeterdekaart.nl">Verbeter de kaart</a>';
const baseTileUrl = 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart/EPSG:3857';

export default class Maps {
    constructor(selector = '.js-wizard-map') {
        this.$wizardMap = $(selector);
        if ( !this.$wizardMap.length ) {
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
        this.$wizardForm.on('change', () => {
            this.wizardFormValues = this.$wizardForm.serializeArray();
            this.wizardMapService = this.wizardFormValues[0].value;
            this.wizardMapColor = this.wizardFormValues[1].value;
            this.currentUrl = baseTileUrl;
            this.extension = 'png';

            switch (this.wizardMapColor) {
                case 'pastel':
                    this.currentUrl = 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaartpastel/EPSG:3857';
                break;
                case 'grey':
                    this.currentUrl = 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaartgrijs/EPSG:3857';
                break;
                case 'air':
                    this.currentUrl = 'https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/1.0.0/2016_ortho25/EPSG:3857';
                    this.extension = 'jpeg';
                break;
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
        let map = new google.maps.Map(document.getElementById(this.currentMap), {
            center: {
                lat: this.latitude,
                lng: this.longitude
            },
            zoom: this.zoom
        });

        // basemap from amsterdam for now
        let nlMap = new google.maps.ImageMapType({
            getTileUrl: (coord, zoom) => {
                return `${this.currentUrl}/${zoom}/${coord.x}/${coord.y}.${this.extension}`;
            },
            tileSize: new google.maps.Size(256, 256),
            isPng: true,
            name: BRTAkAttr,
            maxZoom: 22,
            minZoom: 8
        });

        map.mapTypes.set('NLmaps', nlMap);
        map.setOptions({
            mapTypeControl: false,
        });

        map.setMapTypeId('NLmaps');

        google.maps.event.addListener(map, 'center_changed', () => {
            let center = map.getCenter();
            this.latitude = center.lat().toFixed(6);
            this.longitude = center.lng().toFixed(6);

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
        let map = L.map(this.currentMap, {
            center: [this.latitude, this.longitude],
            layers: [
                new L.tileLayer(
                    `${this.currentUrl}/{z}/{x}/{y}.${this.extension}`, {
                        attribution: BRTAkAttr
                    }
                )
            ],
            zoom: this.zoom
        });
        /* eslint-enable */

        map.on('move', () => {
            let center = map.getCenter();
            this.latitude = center.lat.toFixed(6);
            this.longitude = center.lng.toFixed(6);
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
        let map = new ol.Map({
            controls: ol.control.defaults({
                attributionOptions: ({
                    collapsible: false
                })
            }),
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        url: `${this.currentUrl}/{z}/{x}/{y}.${this.extension}`,
                        attributions: [
                            new ol.Attribution({
                                html: BRTAkAttr
                            })
                        ]
                    })
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([this.longitude, this.latitude]),
                zoom: this.zoom
            }),
            target: this.currentMap
        });

        map.on('moveend', () => {
            let center = ol.proj.toLonLat(map.getView().getCenter());
            this.latitude = center[1].toFixed(6);
            this.longitude = center[0].toFixed(6);
            this.zoom = map.getView().getZoom();

            this.updateCode();
        });
        /* eslint-enable */

        this.updateCode();
    }

    setMapboxMap() {
        this.createMap();

        /* eslint-disable */
        const map = L.mapbox
                        .map(this.currentMap)
                        .setView([this.latitude, this.longitude], this.zoom);

        const layer = L.tileLayer(`${this.currentUrl}/{z}/{x}/{y}.${this.extension}`, {
            tms: false,
            attribution: BRTAkAttr
        });
        /* eslint-enable */
        layer.addTo(map);

        map.on('move', () => {
            let center = map.getCenter();
            this.latitude = center.lat.toFixed(6);
            this.longitude = center.lng.toFixed(6);
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

        let $map = $(`<div class="map" id="${this.currentMap}">`).appendTo(this.$wizardMap);

        return $map;
    }

    focusMap() {
        $('.map').hide(); // First hide all other maps
        $(`#${this.currentMap}`).show();
    }

    updateCode() {
        let code = this.getCodeTemplate();

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
