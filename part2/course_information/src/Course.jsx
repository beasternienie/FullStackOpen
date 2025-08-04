const Header = ({title}) =>{
    return(
        <h1>{title}</h1>
    )
}

const Content = ({parts}) =>{
    return(
        <div>
            {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        </div>
    )
}

const Part = (props) =>{
    return(
        <p>{props.name} {props.exercises}</p>
    )
}

const Course = ({course}) =>{
    const title = course.name
    const parts = course.parts

    // Calculate the sum of the exercises in the course.
    const total = parts.reduce((acc, curr) =>{
        // Get the exercises field value for the current part.
        const exercises = curr.exercises
        // Add the value to the accumulator and return.
        return acc + exercises;
    }, 0)

    return (
        <div>
            <Header title={title} />
            <Content parts={parts} />
            <p>total of {total} exercises</p>
        </div>
    )
}

export default Course