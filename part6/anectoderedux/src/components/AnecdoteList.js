import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { deleteMessage, setMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdote }) => {
    return anecdote
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  dispatch(vote(anecdote.id))
                  dispatch(setMessage(anecdote.content))
                  setTimeout(() => {
                    dispatch(deleteMessage())
                  }, 5000)
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
