const express = require('express')
const fetch = require('node-fetch')
// TODO:
// require DB


// Start Express
const app = express()

const port = 3000

app.listen(port, ()=> {
  console.log(`App is listening at: http://127.0.0.1:${port}`)
})


// Setting up the server
app.use(express.static('public'))

// Weather API Get Route
app.get('/weather/:latlon',async (req, res) => {
  const latlon = req.params.latlon.split(',')
  //console.log(latlon)
  const weatherApiKey = '108c1179d5f49e7ba876cdd2b2e7f156'
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon[0]}&lon=${latlon[1]}&appid=${weatherApiKey}`

  // Request for weather data
  const weatherResponse = await fetch(weatherUrl)
  const weatherData = await weatherResponse.json()

  console.log(weatherData)

})