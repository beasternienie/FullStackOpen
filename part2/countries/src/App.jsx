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

// Display country information.
const Country =({countries}) =>{

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
                    {countries.map(name => <li key={name}>{name}</li>)}
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

    const handleFilterChange = (event) => {

        setFilter(event.target.value)

        console.log("Search:", event.target.value)

        countryService.getAll().then(response => {

            // Make a copy of the country data.
            let data = [...response]
            let filteredCountries = null

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
            if(filteredCountries === null){
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
                // Set country to filtered country data.
                setCountries(filteredCountries)
                showMessage(null)
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

    // Run this when country data changes.
    useEffect(() =>{
        console.log("Countries:", countries)
    }, [countries])

    return (
        <div>
            <Searchbar handleFilterChange={handleFilterChange} />
            <Message message={message} />
            <Country countries={countries} filter={filter}/>
        </div>
    )
}

export default App
