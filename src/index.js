import './scss/main.scss';

import L from 'leaflet';
import LeafletMap from './lib/leaflet-map';
import LayersData from './database/LayersData';

const zoom = 8;
const lat = 23.59280599185669;
const lng = 121.20139673233034;

const leafletMap = new LeafletMap();

let AQI = [];

window.onload = () => {

    leafletMap.init(lat, lng, zoom, false);

    const URL = './assets/AQI.json';

    loading(true);

    LoadMap();

    fetch(URL).then(response => response.json())
        .then(datas => {

            caculateScore(datas);

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

            LoadGeoLayer();

        }).catch(err => console.log(err));

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

function LoadMap() {
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
}

function LoadGeoLayer() {
    const MAXLEN = 22;
    let counter = 0;

    const geo = leafletMap.addGeoJsonLayer(require('./assets/county_feature.json')["features"], {
        onEachFeature: (feature, layer) => {
            counter++;
            if (counter >= MAXLEN) loading(false);
            if (feature.properties && feature.properties.COUNTYNAME) {
                const { score } = AQI.find(aqi => aqi.location === feature.properties.COUNTYNAME);
                layer.bindPopup(`<h5>整體總評</h5>${feature.properties.COUNTYNAME} : ${score}`);
                layer.addEventListener('click', e => {
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
}

/**
 * Caculate city or county score
 * @param {array} datas 
 */
function caculateScore(datas) {
    let county = [];
    datas.forEach(data => {
        const { County, Status } = data;
        if (county.find(({ location }) => { return location === County }) === undefined) {
            county.push({
                location: County,
                status: {
                    '良好': 0,
                    '普通': 0,
                    '對敏感族群不健康': 0,
                    '對所有族群不健康': 0,
                    '非常不健康': 0,
                    '危害': 0,
                },
                score: null,
            });
        }

        let c = county.find(({ location }) => { return location === County });
        c.status[Status]++;

        county.map(c => {
            let max = 0;
            let pointer = '';
            Object.keys(c.status).forEach(key => {
                if (c.status[key] > max) {
                    max = c.status[key];
                    pointer = key;
                }
            });
            c.score = pointer;
            return c;
        });
    });
    AQI = county;
    // console.log(AQI);
}


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