

// Get User geolocation

if ( 'geolocation' in navigator) {
  //console.log(navigator)

  navigator.geolocation.getCurrentPosition(position => {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
  })

} else {
  console.error('Your browser does not support geolocation')
}