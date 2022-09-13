import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <Notification></Notification>
      <AnecdoteList></AnecdoteList>
      <AnecdoteForm></AnecdoteForm>
    </div>
  )
}

export default App
