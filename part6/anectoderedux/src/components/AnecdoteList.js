import { useDispatch, useSelector } from 'react-redux'
import { saveVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdote, filter }) => {
    const filtered = anecdote.filter((anecdote) => {
      return anecdote.content.includes(filter)
    })
    return filtered
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter></Filter>
      <ul>
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  dispatch(saveVotes(anecdote))
                  dispatch(
                    setNotification(`you voted '${anecdote.content}'`, 5)
                  )
                }}
              >
                vote
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default AnecdoteList
