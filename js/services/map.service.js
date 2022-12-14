export const mapService = {
    initMap,
    addMarker,
    panTo,
    updateLatLng,
}


// Var that is used throughout this Module (not global)
var gMap
var gSelectedLocation={
    lat:0,
    lng:0,
}
var gMarkers = [{position: {lat:0, lng:0},
    map: gMap,
    title: 'Hello World!'}]


function initMap(lat = 32.0749831, lng = 34.9120554) {

    return _connectGoogleApi()
        .then(() => {
            console.log('test available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap)
        })
        .then(() => {
            addLocListener()

        })
}

function addLocListener() {
    gMap.addListener('click', (mapsMouseEvent) => {
        const lat = mapsMouseEvent.latLng.lat()
        const lng = mapsMouseEvent.latLng.lng()
        const position = { lat, lng }
        addMarker(position)
            // onAddPlace(position, locationName)
    })
}

function addMarker(pos) {
    gSelectedLocation = pos
    var marker = new google.maps.Marker({
        position: gSelectedLocation,
        map: gMap,
        title: 'Hello World!'
    })
    gMarkers.push(marker)
    removeMarker(gMarkers.shift())
}

function updateLatLng(lat, lng) {
    gSelectedLocation = {lat, lng}
    return gSelectedLocation
}

function removeMarker(marker) {
    marker.setMap(null)
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBvTjJLgXv_JG78L_VC13fO7vJjnzeBzH8'
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}