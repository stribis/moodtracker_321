fetchData ()
async function fetchData () {

  // Use fetch to get data from API (Our own API)

  const response = await fetch('/api')
  const data = await response.json()

  console.log(data)

  // Generate Template for data

  data.forEach((entry, i) => {
    const container = document.createElement('div')
    container.classList.add('entry')
    container.innerHTML = `
    <div onClick="deleteEntry('${entry._id}', ${i})" class="delete">x</div>
    <div>${entry.mood}</div>
    <div>${entry.temp}</div>
    <div>${entry.description}</div>
    <div>AQI: ${entry.aqi} - ${translateAqi(entry.aqi)}</div>
    <img src="${entry.image64}" alt="Current mood: ${entry.mood}"> 
    `

    document.querySelector('section').append(container)
  })

  
}

function translateAqi (aqi) {
  // Takes an index and returns a corresponding value
  if (aqi > 0 && aqi < 51) {
    return 'Good'
  } else if(aqi > 50 && aqi < 101) {
    return 'Moderate'
  } else if(aqi > 100 && aqi < 151) {
    return 'Unhealthy for Sensitive Groups'
  } else if(aqi > 150 && aqi < 201) {
    return 'Unhealthy'
  } else if(aqi > 200 && aqi < 301) {
    return 'Very Unhealthy'
  } else if(aqi > 300) {
    return 'Hazardous'
  } else {
    return 'AQI Missing'
  }
}


async function deleteEntry (id, index) {
  console.log(id)

  const response = await fetch(`/delete/${id}`)
  const data = await response.json()

  console.log(data)
  //document.querySelectorAll('.entry')[index].remove()

}