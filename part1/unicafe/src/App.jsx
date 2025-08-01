import { useState } from 'react'

// Header
const Header = (props) =>{
    return (
        <h1>{props.header}</h1>
    )
}

// Buttons
const Button = (props) =>{
    return (
        <button onClick = {props.onClick}>{props.name}</button>
    )
}

// Statistics Panel
const Stats = (props) =>{

    // Assign the props values to variables.
    const [good, neutral, bad] = props.states

    // Calculate the total value of all stats.
    let all = 0
    props.states.forEach(state => {all += state})

    // Calculate the average.
    let average = ((good * 1) + (bad * -1)) / all

    // Calculate the positive percentage.
    let positiveCount = good / all
    let positive = positiveCount * 100

    return (
        <div>
            <h1>Statistics</h1>
            <p>Good {good}</p>
            <p>Neutral {neutral}</p>
            <p>Bad {bad}</p>
            <p>All {all}</p>
            <p>Average {average}</p>
            <p>Positive {positive} %</p>
        </div>
    )
}

const App = () => {

    const header = 'Give Feedback'

    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const states = [good, neutral, bad]

    // Event methods. Add one to the relevant value.
    const increaseGood = () => setGood(good + 1)
    const increaseNeutral = () => setNeutral(neutral + 1)
    const increaseBad = () => setBad(bad + 1)

    return (
        <div>
            <Header header={header} />
            <Button name={'good'} onClick={increaseGood}/>
            <Button name ={'neutral'} onClick={increaseNeutral} />
            <Button name={'bad'} onClick={increaseBad}/>
            <Stats states={states}></Stats>
        </div>
    )
}

export default App