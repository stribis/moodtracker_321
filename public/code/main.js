

// Get User geolocation
let lat, lon, city, temp, description, aqi
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

      city = data.weather.name
      temp = data.weather.weather[0].description

      const template = `
      <div class="more-info">
        <div>${temp}</div>
        <div>${description}</div>
        <hr>
        <div>${city}</div>
        <div><span>Lat: ${lat}</span><span>Lon: ${lon}</span></div>
        <div>AQI: WiP</div>
      </div>
      `

      const weatherDiv = document.createElement('div')
      weatherDiv.innerHTML = template
      document.querySelector('#main-container').append(weatherDiv)

    } catch (err) {
      console.error(err)
    }

  })

} else {
  console.error('Your browser does not support geolocation')
}