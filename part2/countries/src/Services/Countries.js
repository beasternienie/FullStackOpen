import axios from 'axios'
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'

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
// Filter data by query.
const filterCountries = (query) =>{
    const request = axios.get(`${baseURL}/all`)
    return request.then(response => response.data.filter(country =>{
        country.name.common.includes(query)
    }))
}

export default{
    getAll,
    getCountry,
    filterCountries
}