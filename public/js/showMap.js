mapboxgl.accessToken = mapToken;

const geoData = JSON.parse(local);

const map = new mapboxgl.Map({
    container: 'locationMap', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [geoData.geometry.coordinates[0], geoData.geometry.coordinates[1]], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

const marker2 = new mapboxgl.Marker({ color: 'black' })
    .setLngLat([geoData.geometry.coordinates[0], geoData.geometry.coordinates[1]])
    .addTo(map);

const marker = new mapboxgl.Marker()
    .setLngLat([geoData.geometry.coordinates[0], geoData.geometry.coordinates[1]])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML('<p class="m-3">' + geoData.title + '</p>')
    ) //
    .addTo(map);