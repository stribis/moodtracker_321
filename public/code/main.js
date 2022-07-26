
function setup () {
  // Disable p5JS Canvas
  noCanvas()

  // Capture Video
  const video = createCapture()
  video.parent('main-container')
  video.size(320, 240)

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

        aqi = data.aqi.data.aqi
        city = data.weather.name
        temp = data.weather.main.temp
        description = data.weather.weather[0].description

        const template = `
        <div class="more-info">
          <div>${temp}</div>
          <div>${description}</div>
          <hr>
          <div>${city}</div>
          <div><span>Lat: ${lat}</span><span>Lon: ${lon}</span></div>
          <div>AQI: ${aqi}</div>
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


  document.querySelector('form button').addEventListener('click', async e => {
    e.preventDefault()

    // Reset Messages
    if(document.querySelector('.success-message')) document.querySelector('.success-message').remove()
    if(document.querySelector('.error-message')) document.querySelector('.error-message').remove()

    // Read Input Text
    const mood = document.querySelector('#mood').value

    // Get current image
    video.loadPixels()
    const image64 = video.canvas.toDataURL()

    // Prepare Data package TODO: AQI
    const data = {
      mood,
      city,
      temp,
      description,
      image64,
      aqi
    }

    // Send data to server
    const options = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    }

    const response = await fetch('/api', options)
    const json = await response.json() 

    if (json.success) {
      const message = document.createElement('span')
      message.classList.add('success-message')
      message.innerText = 'Your mood has been added'
      document.querySelector('form').after(message)
    } else {
      const message = document.createElement('span')
      message.classList.add('error-message')
      message.innerText = 'Something went wrong, try again later'
      document.querySelector('form').after(message)
    }
  })
}


