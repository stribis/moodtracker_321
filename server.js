const express = require('express')
// TODO:
// require DB
// http-request Library


// Start Express
const app = express()

const port = 3000

app.listen(port, ()=> {
  console.log(`App is listening at: http://127.0.0.1:${port}`)
})

// Setting up the server
app.use(express.static('public'))