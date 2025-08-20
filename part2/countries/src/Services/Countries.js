import axios from 'axios'
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherURL = 'https://api.weatherapi.com/v1/current.json?'
const weatherKey = import.meta.env.VITE_SOME_KEY

// Get all countries.
const getAll = () =>{
    const request = axios.get(`${baseURL}/all`)
    return request.then(response => response.data)
}
// Get a country by name.
const getCountry = (name) =>{
    const request = axios.get(`${baseURL}/name/${name}`)
    return request.then(response => response.data)
}

// Get weather data by country name.
const getWeather = (lat, long) =>{
    const request = axios.get(`${weatherURL}key=${weatherKey}&q=${lat},${long}`)
    return request.then(response => response.data)
}

export default{
    getAll,
    getCountry,
    getWeather
}