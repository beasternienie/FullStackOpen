import { useState } from 'react'

const Person = ({person}) =>{

    const name = person.name
    const number = person.number

    return(
        <div>
            {name} {number}
        </div>
    )

}

const App = () => {

    // State controls the list of people.
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

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
        console.log('form button clicked', event.target)

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

            setPersons(persons.concat(person))
            setNewName('')
            setNewNumber('')
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

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with: <input name="filterField" onChange={handleFilterChange} />
            </div>
            <form onSubmit={addPerson}>
                <div>
                    name: <input name="nameField" value={newName} onChange={handlePersonChange}/>
                </div>
                <div>
                    number: <input name={"numberField"} value ={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
                {filteredPersons.map(person => <Person key={person.name} person={person} />)}
            </div>
    )
}

export default App