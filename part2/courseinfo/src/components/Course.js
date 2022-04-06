const Course = ({ course }) => {

    return (
        <div>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>

    )
}

const Header = ({ courseName }) => <h1>{courseName}</h1>

const Content = ({ parts }) => {

    return (
        <div>
            {parts.map(part => <Part key={part.id} name={part.name} exercise={part.exercises}/>)}
        </div>
    )
}

const Part = ({ name, exercise }) => {

    return (
        <p>{name} {exercise}</p>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <h4>total of {total} exercises</h4>
    )
}

export default Course