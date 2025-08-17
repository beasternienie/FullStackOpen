import {useEffect, useState} from 'react'
import personService from "./services/persons";

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

// Delete button for deleting a person.
const DeleteButton = ({person, deleteHandler}) =>{

    const associatedPerson = person // The person associated with this delete button.

    return(
        // Call the delete handler passing the associated person's id.
        <button onClick={() => deleteHandler(associatedPerson)}>Delete</button>
    )
}

// The display component for displaying the phonebook entries.
const Persons = ({filteredPersons, deleteHandler}) =>{
    return(
        <div>
            {filteredPersons.map((person) =>
                <div key={person.name}>
                    {person.name} {person.number} <DeleteButton person={person} deleteHandler={deleteHandler} />
                </div>
            )}
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

            // If person exists, get the array for that person.
            const selectedPerson = persons.find(person => person.name === newName)

            // If the user is adding a new number, ask for confirmation...
            if(persons.some(person => person.number !== newNumber)){

                if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
                    // Copy existing person.
                    const updatedPerson = {...selectedPerson, number: newNumber}
                    // Send update request.
                    personService.update(selectedPerson.id, updatedPerson).then(() =>{
                        // If request is successful, update state.
                        setPersons(persons => persons.map(person => {
                            if(person.name === updatedPerson.name){
                                return updatedPerson
                            }
                            return person
                        }))
                        setNewName('')
                        setNewNumber('')
                    })
                }

            }

        }
        else{
            // Add person.
            const person = {
                name: newName,
                id: (persons.length + 1).toString(),
                number: newNumber
            }

            personService.create(person).then(returnedPerson =>{
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
            })

        }

    }

    // Delete a person.
    const deletePerson = (person) =>{

        const deletedPersonID = person.id

        console.log('Deleting person with id:', deletedPersonID)
        // Show message to ask for confirmation.
        if(confirm(`Are you sure you want to delete ${person.name}?`)){
            // If user confirms, send delete request.
            personService.requestDelete(deletedPersonID)
                .then(() => {
                        console.log('Delete was successful.')
                        // If request is successful, filter data to exclude the deleted person.
                        setPersons(persons.filter(person => person.id !== deletedPersonID))
                    }
                )
                .catch(error => console.log(error))
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
            <Persons filteredPersons={filteredPersons} deleteHandler={deletePerson} />
        </div>
    )
}

export default App