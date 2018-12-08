import './scss/main.scss';

import L from 'leaflet';
import LeafletMap from './lib/leaflet-map';
import LayersData from './database/LayersData';

const zoom = 8;
const lat = 23.59280599185669;
const lng = 121.20139673233034;

const leafletMap = new LeafletMap();

window.onload = () => {

    leafletMap.init(lat, lng, zoom, false);

    const URL = './assets/AQI.json';
    let AQI = [];

    loading(true);
    fetch(URL).then(response => response.json())
        .then(datas => {
            AQI = datas;
            datas.forEach(data => {
                const popup = `
                <div class="popup">
                    <span class="title">地區：${data['County']}-${data['SiteName']}</span>
                    <span class="area">PM2.5-${data['PM2.5']}</span>
                    <span class="addr">狀態：${data['Status']}</span>
                </div> 
                `;
                leafletMap.addMarker(Number(data['Latitude']), Number(data['Longitude']), {}, popup);
            });
        }).catch(err => console.log(err));

    const maps = [];
    document.querySelectorAll('.tree input[type=checkbox]').forEach(node => {
        let layer = null;
        let id = node.value;
        let status = node.checked;
        if (status) layer = AddLayer(node.name, id);

        maps.push({ id, status, layer });

        node.addEventListener('click', e => {
            const map = maps.find(map => map.id === e.target.value);
            if (e.target.checked) {
                const { id } = map;
                map.layer = AddLayer(node.name, id);
                console.log(map.layer);
            } else {
                leafletMap.removeTileLayer(map.layer);
            }
        });
    });

    const MAXLEN = 22;
    let counter = 0;

    const geo = leafletMap.addGeoJsonLayer(require('./assets/county_feature.json')["features"], {
        onEachFeature: (feature, layer) => {
            counter++;
            if (counter >= 22) loading(false);
            if (feature.properties && feature.properties.COUNTYENG) {
                layer.bindPopup(feature.properties.COUNTYENG);
                layer.addEventListener('click', e => {
                    // layer.openPopup();
                    console.log(feature.properties, layer);
                });
            }
        },
        style: feature => {
            let color = null;
            switch (feature.properties.COUNTYENG) {
                case 'Lienchiang County':
                case 'Taitung County':
                case 'Hualien County':
                case 'Hsinchu City':
                    color = '#B3FBA6'; break;
                case 'Kinmen County':
                case 'Pingtung County':
                case 'Taichung City':
                case 'Tainan City':
                    color = '#7DFA4C';
                    break;
                case 'Yilan County':
                case 'Taipei City':
                case 'New Taipei City':
                case 'Taoyuan City':
                case 'Miaoli County':
                    color = '#EF8432';
                    break;
                case 'Changhua County':
                case 'Hsinchu County':
                case 'Chiayi City':
                    color = '#EB3323';
                    break;
                case 'Nantou County':
                case 'Penghu County':
                case 'Chiayi County':
                    color = '#854693';
                    break;
                case 'Yunlin County':
                case 'Kaohsiung City':
                case 'Keelung City':
                    color = '#731425';
                    break;
            }
            return {
                fillColor: color,
                opacity: 0.1,
                fillOpacity: 0.3,
                weight: 1,
            };
        },
    });

    document.querySelector('.pin').addEventListener('click', e => {
        const treeClass = document.querySelector('.tree').classList;
        const status = treeClass.value.includes('close');
        if (status) {
            treeClass.remove('close');
        } else {
            treeClass.add('close');
        }
    });
};



/**
 * Add Map Layer
 * @param {string} mapType Element Name
 * @param {string} id Map Styles
 */
function AddLayer(group, id) {
    const accessToken = 'pk.eyJ1IjoidGE3MzgyIiwiYSI6ImNqb2NvMXc0cjAwMWUza2tjZ2ducjlld2oifQ.CNYQV63IvyS-wzL7cNS0Pg';
    const { url, option } = LayersData.find(layer => layer.id === id);
    switch (group) {
        case 'googlemap':
            return leafletMap.addGoogleMapLayer(option);
        case 'openstreet':
            return leafletMap.addOpenStreetLayer(url, option);
        case 'mapbox':
            return leafletMap.addMapBoxLayer(`${url}?access_token=${accessToken}`, option);
        case 'stamen':
        case 'wmts':
            return leafletMap.addTileLayer(url, option);
        case 'wms':
            return leafletMap.addWMSLayer(url, option);
        default:
            return null;
    }
}

function loading(load) {
    document.querySelector('.loading').style.display = load ? 'block' : 'none';
}