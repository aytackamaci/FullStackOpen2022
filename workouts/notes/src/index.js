import ReactDOM from 'react-dom'
//import App from './App'
import AppReducer from './AppReducer'
import './index.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

//ReactDOM.render(<App />, document.getElementById('root'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AppReducer />
  </Provider>
)
