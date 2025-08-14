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
        { name: 'Arto Hellas', number: '040-1234567' }
    ])

    // State controls the form input.
    const [newName, setNewName] = useState('')

    // State controls the form input for phone number.
    const [newNumber, setNewNumber] = useState('')

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
                id: String(persons.length + 1),
                number: newNumber
            }

            setPersons(persons.concat(person))
            setNewName('')
            setNewNumber('')
        }

    }

    // Function handles changing the value in the field.
    const handlePersonChange = (event) =>{
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    // Function handles the changing of the phone number.
    const handleNumberChange = (event) =>{
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
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
                {persons.map(person => <Person key={person.name} person={person} />)}
            </div>
    )
}

export default App