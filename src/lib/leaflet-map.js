import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import L from 'leaflet';
import 'leaflet.gridlayer.googlemutant';
import 'leaflet.markercluster';
import 'leaflet.vectorgrid';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: marker,
    shadowUrl: markerShadow,
});

class LeafletMap {
    constructor() {
        this.map = null;
        this.geocoder = null;
        this.modes = { POINT: 'pointer', DRAG: 'drag', DRAW: 'draw', DELETE: 'delete' };
        this.markers = [];
        this.markerCluster = L.markerClusterGroup();
        this.circles = [];
        this.polygons = [];
        this.centerMarker = null;
        this.centerCircle = null;
        this.currentMode = this.modes.POINT;
    }

    /**
     * Initial Map
     * @param {number} lat 
     * @param {number} lng 
     * @param {number} zoom 
     * @param {boolean} defaultMap 
     */
    init(lat, lng, zoom, defaultMap = true) {
        this.map = L.map('map').setView({ lat, lng }, zoom);
        this.map.on('click', this.onMapClick);

        // Default Maps
        if (defaultMap)
            this.addTileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            });
    }

    /**
     * Add Layer
     * @param {string} url 
     * @param {object} option 
     */
    addTileLayer(url, option = null) {
        return L.tileLayer(url, option).addTo(this.map);
    }

    /**
     * Add OpenStree Layer
     * @param {string} url 
     * @param {object} option 
     */
    addOpenStreetLayer(url, option = null) {
        return L.tileLayer(url, option).addTo(this.map);
    }

    /**
     * Add MapBox Layer
     * @param {string} url 
     * @param {object} option 
     */
    addMapBoxLayer(url, option = null) {
        return L.tileLayer(url, option).addTo(this.map);
    }

    /**
     * Add GoogleMap Layer
     * @param {object} style 
     */
    addGoogleMapLayer(style) {
        // before use please include
        // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY" async defer></script>
        return L.gridLayer.googleMutant(style).addTo(this.map);
    }

    /**
     * Add WMS Layer
     * @param {string} url 
     * @param {object} option 
     */
    addWMSLayer(url, option = null) {
        return L.tileLayer.wms(url, option).addTo(this.map);
    }

    /**
     * Add GeoJson With FeatureCollection
     * @param {string} url 
     * @param {object} option 
     */
    addGeoJsonLayer(url, option = null) {
        return L.geoJSON(url, option).addTo(this.map);
    }

    /**
     * Add GeoJson Or TopoJSON
     * @param {string} url 
     * @param {object} option 
     */
    addVectorGridLayer(url, option = null) {
        return L.vectorGrid.slicer(url, option).addTo(this.map);
    }

    /**
     * Remove Layer
     * @param {object} layer 
     */
    removeTileLayer(layer) {
        layer.removeFrom(this.map);
    }

    /**
     * Add Marker
     * @param {number} lat 
     * @param {number} lng 
     * @param {object} option 
     * @param {string} popup 
     * @param {boolean} open 
     */
    addMarker(lat, lng, option = null, popup = null, open = false) {
        const marker = L.marker({ lat, lng }, option);
        if (popup) marker.bindPopup(popup);
        if (open) marker.openPopup();
        this.markers.push(marker);
        this.markerCluster.addLayer(marker);
        this.map.addLayer(this.markerCluster);
    }

    /**
     * Add Circle
     * @param {number} lat 
     * @param {number} lng 
     * @param {object} option 
     * @param {string} popup 
     * @param {boolean} open 
     */
    addCircle(lat, lng, option = null, popup = null, open = false) {
        const circle = L.circle({ lat, lng }, option).addTo(this.map);
        if (popup) circle.bindPopup(popup);
        if (open) circle.openPopup();
        this.circles.push(circle);
    }

    /**
     * Add Polygon
     * @param {array<object>} points 
     * @param {object} option 
     * @param {string} popup 
     * @param {boolean} open 
     */
    addPolygon(points, option = null, popup = null, open = false) {
        const polygon = L.polygon(points, option).addTo(this.map);
        if (popup) polygon.bindPopup(popup);
        if (open) polygon.openPopup();
        this.polygons.push(polygon);
    }

    onMapClick(event) {
        console.log(event);
    }

}

export default LeafletMap;