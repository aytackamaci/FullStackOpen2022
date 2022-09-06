import NewNote from './reducers/NewNote'
import Notes from './reducers/Notes'

const AppReducer = () => {
  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  )
}

export default AppReducer
