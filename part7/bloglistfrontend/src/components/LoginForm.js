import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './BlogList'
import BlogForm from './BlogForm'
import {
  loginUser,
  initializeLogin,
  logoutUser,
} from '../reducers/loginReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleNameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  useEffect(() => {
    dispatch(initializeLogin())
  }, [dispatch])
  const user = useSelector(({ login }) => {
    return login[0]
  })

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }
  return (
    <div>
      {user === null ? (
        <form onSubmit={handleLogin}>
          <h2>log in to application</h2>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={handleNameChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      ) : (
        <div>
          {user.name} logged-in
          <button type="submit" onClick={handleLogout}>
            logout
          </button>
          <BlogForm />
          <BlogList />
        </div>
      )}
    </div>
  )
}

export default LoginForm
