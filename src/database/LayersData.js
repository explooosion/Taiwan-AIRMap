const LayersData = [
    {
        id: 'openstreet',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        option: {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
    },
    {
        id: 'googlemap',
        url: '',
        option: {
            type: 'roadmap',
            // styles: [
            //     { elementType: 'labels', stylers: [{ visibility: 'off' }] },
            //     { featureType: 'water', stylers: [{ color: '#444444' }] }
            // ]
        },
    },
    {
        id: 'streets-v10',
        url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}',
        option: {},
    },
    {
        id: 'outdoors-v10',
        url: 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/{z}/{x}/{y}',
        option: {},
    },
    {
        id: 'light-v9',
        url: 'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}',
        option: {},
    },
    {
        id: 'dark-v9',
        url: 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/{z}/{x}/{y}',
        option: {},
    },
    {
        id: 'satellite-v9',
        url: 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}',
        option: {},
    },
    {
        id: 'satellite-streets-v10',
        url: 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/{z}/{x}/{y}',
        option: {},
    },
    {
        id: 'navigation-preview-day-v4',
        url: 'https://api.mapbox.com/styles/v1/mapbox/navigation-preview-day-v4/tiles/{z}/{x}/{y}',
        option: {},
    },
    {
        id: 'navigation-preview-night-v4',
        url: 'https://api.mapbox.com/styles/v1/mapbox/navigation-preview-night-v4/tiles/{z}/{x}/{y}',
        option: {},
    },
    {
        id: 'navigation-guidance-day-v4',
        url: 'https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-day-v4/tiles/{z}/{x}/{y}',
        option: {},
    },
    {
        id: 'navigation-guidance-night-v4',
        url: 'https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-night-v4/tiles/{z}/{x}/{y}',
        option: {},
    },
    {
        id: 'toner',
        url: '//{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
        option: {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            subdomains: 'abcd',
            maxZoom: 20,
            minZoom: 0,
            label: 'Toner',
            iconURL: '//stamen-tiles-a.a.ssl.fastly.net/toner/4/2/5.png',
        },
    },
    {
        id: 'toner-lite',
        url: '//{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png',
        option: {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            subdomains: 'abcd',
            maxZoom: 20,
            minZoom: 0,
            label: 'Toner Lite',
        },
    },
    {
        id: 'water-color',
        url: '//{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png',
        option: {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            subdomains: 'abcd',
            maxZoom: 16,
            minZoom: 1,
            label: 'Watercolor'
        },
    },
    {
        id: 'nasa-bluemarble',
        url: 'https://demo.boundlessgeo.com/geoserver/ows?',
        option: {
            layers: 'nasa:bluemarble',
        },
    },
    {
        id: 'nlsc.gov.tw.emap',
        url: 'https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}',
        option: {
            attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        },
    },
    {
        id: 'nlsc.gov.tw.emap96',
        url: 'https://wmts.nlsc.gov.tw/wmts/EMAP96/default/GoogleMapsCompatible/{z}/{y}/{x}',
        option: {
            attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        },
    },
    {
        id: 'nlsc.gov.tw.emap01',
        url: 'https://wmts.nlsc.gov.tw/wmts/EMAP01/default/GoogleMapsCompatible/{z}/{y}/{x}',
        option: {
            attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        },
    },
    {
        id: 'nlsc.gov.tw.emap5',
        url: 'https://wmts.nlsc.gov.tw/wmts/EMAP5/default/GoogleMapsCompatible/{z}/{y}/{x}',
        option: {
            attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        },
    },
    {
        id: 'nlsc.gov.tw.photo_mix',
        url: 'https://wmts.nlsc.gov.tw/wmts/PHOTO_MIX/default/GoogleMapsCompatible/{z}/{y}/{x}',
        option: {
            attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        },
    },
    {
        id: 'nlsc.gov.tw.city',
        url: 'https://wmts.nlsc.gov.tw/wmts/CITY/default/GoogleMapsCompatible/{z}/{y}/{x}',
        option: {
            attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        },
    },
    {
        id: 'nlsc.gov.tw.town',
        url: 'https://wmts.nlsc.gov.tw/wmts/TOWN/default/GoogleMapsCompatible/{z}/{y}/{x}',
        option: {
            attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        },
    },
    {
        id: 'nlsc.gov.tw.village',
        url: 'https://wmts.nlsc.gov.tw/wmts/Village/default/GoogleMapsCompatible/{z}/{y}/{x}',
        option: {
            attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        },
    },
];

export default LayersData;