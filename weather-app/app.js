const locationService = require('./utils/geocode')
const forecastService = require('./utils/forecast')

if (process.argv[2]) {
  locationService.geocode(process.argv[2], (error, {latitude, longitude, location}) => {
    if (error) return console.log(error)
    forecastService.forecast(latitude, longitude, (error, forecastData) => {
        if (error) return console.log(error)
        console.log(location)
        console.log(forecastData)
      }
    )
  })
} else {
  console.log('Please provide a location.')
}
