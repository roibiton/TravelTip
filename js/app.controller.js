import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos

function onInit() {
    locService.getCurrTime()
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker(pos) {
    mapService.addMarker(pos)
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            renderLocs(locs)
            // document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function renderLocs(locs) {
    // debugger
    console.log(locs)
    const elLocs = document.querySelector('.locs-container')
    const strHTML = locs.map((loc) => `
    <article class="loc">
        <h1>location name: ${loc.name}, lat: ${loc.lat}, lng: ${loc.lng}, created at: ${loc.createAt}</h1>
    </article>
    `
    )
    elLocs.innerHTML = strHTML.join('')
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            var position = mapService.updateLatLng(pos.coords.latitude, pos.coords.longitude)
            console.log('position',position)
            // mapService.updateLanLng() = pos.coords.latitude
            // mapService.gSelectedLocation =  pos.coords.longitude
            onAddMarker(position)
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function onAddLocation(position,locName){
    addLocation(position,locName)
    
}