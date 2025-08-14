import { useState } from 'react'

const Person = ({person}) =>{

    const name = person.name
    const id = person.id

    return(
        <div>
            {name}
        </div>
    )

}

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

        // Check if person already exists with the name.
        if(persons.some(person => person.name === newName)){
            // Show alert.
            window.alert(`${newName} is already added to phonebook`)
        }
        else{
            // Add person.
            const person = {
                name: newName,
                id: String(persons.length + 1)
            }

            setPersons(persons.concat(person))
            setNewName('')
        }

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
                {persons.map(person => <Person key={person.name} person={person} />)}
            </div>
    )
}

export default App