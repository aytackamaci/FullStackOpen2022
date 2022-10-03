/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: [null],
  reducers: {
    setUser(state, action) {
      return state.map((user) => action.payload)
    },
  },
})

export const { setUser } = loginSlice.actions

export const initializeLogin = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      dispatch(setUser(user))
    } catch (exception) {
      dispatch(setNotification(['Wrong credentials', 5, 3]))
    }
  }
}

export const logoutUser = (event, dispatch) => {
  window.localStorage.removeItem('loggedBlogAppUser')
  return async (dispatch) => {
    dispatch(setUser(null))
  }
}

export default loginSlice.reducer
