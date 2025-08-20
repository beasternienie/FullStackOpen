import {useEffect, useState} from "react";
import countryService from "./services/Countries";

// Country search bar.
const Searchbar = ({handleFilterChange}) =>{
    return(
        <div>
            search: <input onChange={handleFilterChange}></input>
        </div>
    )
}

// Show country data button.
const ShowButton = ({country, handler}) =>{
    return(
        <button onClick={() => handler(country)}>Show</button>
    )
}

const Weather = ({weatherData}) => {

    console.log(weatherData)

    if (Object.keys(weatherData).length !== 0) {

        if(weatherData.message.length === 0) {

            let temp = weatherData.temperature
            let wind = weatherData.wind
            let weatherImgURL = weatherData.imageURL

            return (
                <div>
                    <h2>Weather in {weatherData.name}</h2>
                    Temperature: {temp}° Celsius
                    <p><img src={weatherImgURL} alt="Weather Image"/></p>
                    Wind: {wind} mph
                </div>
            )
        }
        else{
            return (
                <div>
                    <h2>Weather</h2>
                    {weatherData.message}
                </div>
            )
        }
    }
    else{
        return(
            <div></div>
        )
    }
}

// Display country information.
const Country =({countries, countryHandler}) =>{

    if(countries.length === 0){
        return(
            <div>
            </div>
        )
    }
    // If multiple countries...
    else if (countries.length > 1){
        return(
            <div>
                <ul>
                    {countries.map(name => <li key={name}>{name} <ShowButton country={name} handler={countryHandler} /> </li>)}
                </ul>
            </div>
        )
    }
    else {
        // Get the country.
        let country = countries[0]
        // Get the languages.
        let languages = Object.entries(country.languages)
        return (
            <div>
                <h1>{country.name.common}</h1>
                Capital: {country.capital}<br/>
                Area: {country.area}
                <h2>Languages</h2>
                <ul>
                    {languages.map(language =>{
                        return <li key={language[0]}>{language[1]}</li>
                    })}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt}></img>
            </div>
        )
    }
}

// Display message.
const Message =({message}) =>{

    if({message} == null){
        return null
    }

    return(
        <div>
            {message}
        </div>
    )
}

const App =() => {

    // Handle the state of the search bar.
    const [filter, setFilter] = useState('')

    // Handle the message display.
    const [message, showMessage] = useState(null)

    // Handle the currently shown country data.
    const [countries, setCountries] = useState([])

    // Handle the currently shown weather data.
    const [weather, setWeather] = useState({})

    const handleFilterChange = (event) => {

        setFilter(event.target.value)

        console.log("Search:", event.target.value)

        countryService.getAll().then(response => {

            // Make a copy of the country data.
            let data = [...response]
            let filteredCountries = []

            // Only update filtered countries data if the search query is not empty.
            if(event.target.value.length > 0) {
                // Filter country data.
                filteredCountries = data.filter(country => {
                    return country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
                })
                console.log("Countries found:", filteredCountries.length)
            }

            return filteredCountries

        }).then((filteredCountries) => {

            // Return early if there is no search query.
            if(filteredCountries.length === 0 && event.target.value.length === 0){
                setCountries([])
                showMessage(null)
                return
            }
            // If there is no valid country...
            if(filteredCountries.length === 0){
                setCountries([])
                showMessage("No countries found.")
            }
            // If there is only 1 country to display...
            else if(filteredCountries.length === 1){

                if(countries.length === 1 && filteredCountries[0].name.common === countries[0].name.common){
                    // Check if the countries are equivalent.
                    console.log("Country not changed.")
                }
                else{
                    console.log("Country has changed.")
                    // Set country to filtered country data.
                    setCountries(filteredCountries)
                    showMessage(null)
                }

            }
            // If more than 10 countries exist...
            else if(filteredCountries.length > 10){
                // Set the filtered countries to empty.
                setCountries([])
                // Show message.
                showMessage("Too many countries to display. Please refine your search terms.")

            }
            // If there are 2-10 countries...
            else{
                // Set countries to the filtered country names.
                setCountries(filteredCountries.map(country =>{
                    return country.name.common
                }))
                showMessage(null)
            }
        })
    }

    // Get the data for a specific country by its name.
    const showCountry = (countryName) =>{

        let countryData = []

        console.log("Country name:", countryName)

        countryService.getCountry(countryName)
            .then(response => {
                // Add response country to country data.
                countryData.push(response)
                // Set country data.
                setCountries(countryData)
            })
            .catch(error => {
                console.log("Error fetching country data:", error)
            })

    }

    const getWeather = (country) =>{

        console.log("Country:", country)

        let lat
        let long

        console.log(country.latlng[0])
        console.log(country.capitalInfo)

        if(Object.keys(country.capitalInfo).length > 0){
            lat = country.capitalInfo.latlng[0]
            long = country.capitalInfo.latlng[1]
        }
        else{
            lat = country.latlng[0]
            long = country.latlng[1]
        }

        countryService.getWeather(lat, long)
            .then(response => {
                const weather={
                    name: response.location.name,
                    temperature: response.current.temp_c,
                    wind: response.current.wind_mph,
                    imageURL: response.current.condition.icon,
                    message: ""
                }
                console.log("Weather data:", weather)
                setWeather(weather)
            })
            .catch(error => {
                console.log("Error fetching weather data:", error)
                // Show message if no data can be retrieved.
                const weather={
                    message: error.response.data.error.message
                }
                setWeather(weather)
            })
    }

    // Run this when country data changes.
    useEffect(() =>{
        if(countries.length === 1){
            getWeather(countries[0])
        }
        else{
            setWeather({})
        }
    }, [countries])

    return (
        <div>
            <Searchbar handleFilterChange={handleFilterChange} />
            <Message message={message} />
            <Country countries={countries} filter={filter} countryHandler={showCountry}/>
            <Weather weatherData={weather}/>

        </div>
    )
}

export default App
