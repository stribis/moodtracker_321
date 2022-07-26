fetchData ()
async function fetchData () {

  // Use fetch to get data from API (Our own API)

  const response = await fetch('/api')
  const data = await response.json()

  console.log(data)

  // Generate Template for data

  data.forEach(entry => {
    const container = document.createElement('div')
    container.innerHTML = `
    <div>${entry.mood}</div>
    <div>${entry.temp}</div>
    <div>${entry.description}</div>
    <div>AQI: ${entry.aqi}</div>
    <img src="${entry.image64}" alt="Current mood: ${entry.mood}"> 

    `

    document.querySelector('section').append(container)
  })

}