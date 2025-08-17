import {useEffect, useState} from 'react'
import axios from "axios";
import personService from "./services/persons";

// Represents a person entry in the phonebook.
const Person = ({person}) =>{

    const name = person.name
    const number = person.number

    return(
        <div>
            {name} {number}
        </div>
    )

}

// The filter component.
const Filter = ({handler}) =>{
    return(
        <div>
            filter shown with: <input name="filterField" onChange={handler} />
        </div>
    )
}

// Text input field.
const InputField = (props) =>{
    let label = props.label
    let value = props.value
    let handler = props.handler

    return(
        <div>
            {label}: <input name={label + "Field"} value={value} onChange={handler}/>
        </div>
    )
}

// The form to enter a new person into the phonebook.
const Form = (props) =>{
    return(
        <form onSubmit={props.addPerson}>
            <InputField label={"Name"} value={props.newName} handler={props.nameHandler} />
            <InputField label={"Number"} value ={props.newNumber} handler={props.numberHandler} />
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

// The display component for displaying the phonebook entries.
const Persons = ({filteredPersons}) =>{
    return(
        <div>
            {filteredPersons.map(person => <Person key={person.name} person={person} />)}
        </div>
    )
}

const App = () => {

    // State controls the list of people.
    const [persons, setPersons] = useState([])

    // State controls the name field input.
    const [newName, setNewName] = useState('')

    // State controls the form input for phone number.
    const [newNumber, setNewNumber] = useState('')

    // State controls the filter input.
    const [newFilterValue, setNewFilterValue] = useState('')

    // State controls which phonebook entries are shown. Shows all names by default.
    const [showAll, setShowAll] = useState(true)

    // Function adds a new person.
    const addPerson = (event) =>{
        event.preventDefault()

        // Check if person already exists with the name.
        if(persons.some(person => person.name === newName)){
            // Show alert.
            window.alert(`${newName} is already added to phonebook`)
        }
        else{
            // Add person.
            const person = {
                name: newName,
                id: persons.length + 1,
                number: newNumber
            }

            personService.create(person).then(returnedPerson =>{
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
            })

        }

    }

    // Function handles changing the name field value.
    const handlePersonChange = (event) =>{
        setNewName(event.target.value)
    }

    // Function handles the changing of the phone number field value.
    const handleNumberChange = (event) =>{
        setNewNumber(event.target.value)
    }

    // Filter the persons by the filter value. Ignores case. Matches partial strings.
    const filteredPersons = showAll ? persons: persons.filter(person =>
        person.name.toLowerCase().includes(newFilterValue.toLowerCase()))

    // Function handles the changing of the filter field.
    const handleFilterChange = (event) =>{
        if(event.target.value !== ''){
            setShowAll(false)
        }
        else{
            setShowAll(true)
        }

        setNewFilterValue(event.target.value)
    }

    // Event hook to initialize entry data.
    useEffect(() =>{
            personService
                .getAll()
                .then(initialPersons =>{
                    setPersons(initialPersons)
                })
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handler={handleFilterChange}/>
            <Form addPerson={addPerson} newName={newName} nameHandler={handlePersonChange}
                  newNumber={newNumber} numberHandler={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons filteredPersons={filteredPersons} />
        </div>
    )
}

export default App