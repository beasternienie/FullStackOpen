import { useState } from 'react'

const App = () => {

    // State controls the list of people.
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])

    // State controls the form input.
    const [newName, setNewName] = useState('')

    // Function adds a new person.
    const addPerson = (event) =>{
        event.preventDefault()
        console.log('form button clicked', event.target)

        const person = {
            name: newName,
            id: String(persons.length + 1)
        }

        setPersons(persons.concat(person))
        setNewName('')
    }

    // Function handles changing the value in the field.
    const handlePersonChange = (event) =>{
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input name="nameField" value={newName} onChange={handlePersonChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person => <li key={person.name}>{person.name}</li>)}
            </ul>
        </div>
    )
}

export default App