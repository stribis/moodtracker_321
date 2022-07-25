

// Get User geolocation
let lat, lon
if ( 'geolocation' in navigator) {
  //console.log(navigator)

  navigator.geolocation.getCurrentPosition(async position => {

    try {
      lat = position.coords.latitude
      lon = position.coords.longitude

      // Prepare for http request
      const apiUrl = `weather/${lat},${lon}`

      // Get response from server
      const response = await fetch(apiUrl)
      const data = await response.json()

      console.log(data)

    } catch (err) {
      console.error(err)
    }

  })

} else {
  console.error('Your browser does not support geolocation')
}