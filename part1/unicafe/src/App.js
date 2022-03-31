import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodVote = () => {
    setGood(good + 1)
  }

  const handleNeutralVote = () => {
    setNeutral(neutral + 1)
  }

  const handleBadVote = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={handleGoodVote} text='good' />
      <Button handleClick={handleNeutralVote} text='neutral' />
      <Button handleClick={handleBadVote} text='bad' />
      <Header text='statistics' />
      <Feedback good={good} bad={bad} neutral={neutral} />
    </div>
  )
}


const Feedback = (props) => {
  if (props.good + props.bad + props.neutral === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <Statistics good={props.good} bad={props.bad} neutral={props.neutral} />
  )
}

const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='all' value={props.good + props.neutral + props.bad} />
        <StatisticLine text='average' value={(Math.round(((props.good - props.bad) / (props.good + props.neutral + props.bad)) * 100) / 100).toFixed(2)} />
        <StatisticLine text='positive' value={(Math.round(props.good / (props.good + props.neutral + props.bad)* 100)).toFixed(1) + ' %'} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

export default App
