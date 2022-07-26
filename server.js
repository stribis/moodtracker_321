const express = require('express')
const fetch = require('node-fetch')
const Datastore = require('nedb')
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
app.use(express.json({
  limit: '300mb'
}))
const database = new Datastore('database/database.db')
database.loadDatabase()

// Weather API Get Route
app.get('/weather/:latlon',async (req, res) => {
  const latlon = req.params.latlon.split(',')

  // API Weather
  const weatherApiKey = '108c1179d5f49e7ba876cdd2b2e7f156'
  // API Key for AQI
  const aqiApiKey = 'e1f7a79f01fe686d0c03b7585a983a2e6c7d35b3'
  // Weather URL
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon[0]}&lon=${latlon[1]}&appid=${weatherApiKey}&units=metric`
  // AQI URL
  const aqiUrl =`https://api.waqi.info/feed/geo:${latlon[0]};${latlon[1]}/?token=${aqiApiKey}`

  // Request for weather data
  const weatherResponse = await fetch(weatherUrl)
  const weatherData = await weatherResponse.json()

  // Request for AQI
  const aqiResponse = await fetch(aqiUrl)
  const aqiData = await aqiResponse.json()
  //console.log(weatherData)

  const data = {
    weather: weatherData,
    aqi: aqiData
  }

  res.json(data)
})

app.post('/api', (req, res) => {
  const data = req.body
  //console.log(data)
  data.timestamp = Date.now()
  database.insert(data)
  data.success = true
  res.json(data)
})

app.get('/api', (req, res) => {
  // get data from database
  database.find({}, (err, data) => {
    if (err) {
      console.error(err)
      res.end()
    } else {
      console.log('Server is sending data to the client')
      res.json(data)
    }
  })
})