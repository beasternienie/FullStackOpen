const Header = ({title}) =>{
    return(
        <h1>{title}</h1>
    )
}

const Content = ({parts}) =>{
    return(
        <div>
            {parts.map(part => <Part name={part.name} exercises={part.exercises} />)}
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

    return (
        <div>
            <Header title={title} />
            <Content parts={parts} />
        </div>
    )
}

export default Course