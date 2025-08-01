import { useState } from 'react'


const Button = (props) =>{

    return (
        <button onClick={props.onClick}>{props.text}</button>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)

    const maxIndex = anecdotes.length

    // Stores vote counts.
    const votes = new Array(maxIndex).fill(0)
    const [allVotes, setAllVotes] = useState(votes)

    // Get a random anecdote.
    const setNextAnecdote = () =>{
        // Choose random number from 0 to maximum index of array.
        let random = Math.floor(Math.random() * maxIndex)
        setSelected(random)
    }

    // Add a vote to the current anecdote.
    const setVote = () =>{
        const copy = [...allVotes]
        copy[selected] += 1
        setAllVotes(copy)
    }

    return (
        <div>
            {anecdotes[selected]}
            <p>
                <Button onClick={setNextAnecdote} text={'Next Anecdote'}></Button>
                <Button onClick={setVote} text={'Vote'}></Button>
            </p>
        </div>
    )
}

export default App