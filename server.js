const express = require('express')
const fetch = require('node-fetch')
const Datastore = require('nedb')
require('dotenv').config()


// Start Express
const app = express()

const port =  process.env.PORT || 3000

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
  const weatherApiKey = process.env.API_KEY_WEATHER
  // API Key for AQI
  const aqiApiKey = process.env.API_KEY_AQI
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

app.get('/delete/:id', (req, res) => {
  console.log(req.params.id)
  database.remove({ _id: req.params.id }, {}, function (err, numRemoved) {
    // numRemoved = 1
    console.log('Removed ' + numRemoved + 'item(s) from the database')
    res.json({success: true, itemsRemoved: numRemoved})
  });
})