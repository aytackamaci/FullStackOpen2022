import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    login: loginReducer,
    blog: blogReducer,
    notification: notificationReducer,
    user: userReducer,
  },
})

export default store
