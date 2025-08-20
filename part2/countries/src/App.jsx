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

// Current search results.
const SearchResults = ({filteredCountries}) =>{
    return(
        <div>

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
        // If single country...
        return (
            <div>
                <h1>{country.name.common}</h1>
                {country.capital}<br/>
                {country.area}
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

const App =() => {

    // Handle the state of the search bar.
    const [filter, setFilter] = useState('')

    // Handle the currently shown country data.
    const [countries, setCountries] = useState([])

    const handleFilterChange = (event) => {
        console.log("Current search:", event.target.value)
        setFilter(event.target.value)

        countryService.getAll().then(response => {
            // Make a copy of the country data.
            let data = [...response]

            // Filter country data.
            return data.filter(country => {
                return country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
            })

        }).then((filteredCountries) => {
            // Check the number of countries.
            if(filteredCountries.length > 10){
                console.log("Too many filtered items.")
                // Set the filtered countries to empty.
                setCountries([])
            }
            else if(filteredCountries.length === 1){
                console.log("One country found.")
                // Set country to filtered country data.
                setCountries(filteredCountries)
            }
            else{
                console.log("Multiple countries found.")
                // Set countries to the filtered country names.
                setCountries(filteredCountries.map(country =>{
                    return country.name.common
                }))
            }
        })
    }

    // Run this when country data changes.
    useEffect(() =>{
        console.log("Countries:", countries)
    }, [countries])

    // Retrieve data for a country by its name.
    const getCountry = (name) =>{
        countryService.getCountry(name)
            .then((country) =>{
                console.log("Country data retrieved for", country.name.common)
                // Create object.
                const newCountry = {
                    name: country.name.common,
                    capital: country.capital[0],
                    area: country.area,
                    languages: country.languages,
                    flagImage: country.flags.png,
                    flagAlt: country.flags.alt
                }
                console.log(newCountry)
                return newCountry
            })
            .catch((error) => {
                console.log("There was an error trying to get country data:", error)
            })
    }

    return (
        <div>
            <Searchbar handleFilterChange={handleFilterChange} />
            <Country countries={countries} filter={filter}/>
        </div>
    )
}

export default App
