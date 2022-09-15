import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdote) => dispatch(setAnecdotes(anecdote)))
  }, [dispatch])
  return (
    <div>
      <Notification></Notification>
      <AnecdoteList></AnecdoteList>
      <AnecdoteForm></AnecdoteForm>
    </div>
  )
}

export default App
