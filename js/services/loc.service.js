export const locService = {
    getLocs,
    getCurrTime,
}

const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384, createAt: getCurrTime()}, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581, createAt: getCurrTime()},
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function getCurrTime() {
    var today = new Date()
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    var dateTime = date+' '+time

    console.log(dateTime)
}

