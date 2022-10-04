import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './BlogList'
import BlogForm from './BlogForm'
import {
  loginUser,
  initializeLogin,
  logoutUser,
} from '../reducers/loginReducer'
import UserList from './UserList'
import User from './User'
import BlogSingle from './BlogSingle'
import { Route, Routes, Link } from 'react-router-dom'

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

  const padding = {
    padding: 3,
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
          <div className="mydiv">
            <Link style={padding} to={'/'}>
              home{' '}
            </Link>
            <Link style={padding} to={'/blogs'}>
              blogs{' '}
            </Link>
            <Link style={padding} to={'/users'}>
              users
            </Link>
            {user.name} logged-in
            <button type="submit" onClick={handleLogout}>
              logout
            </button>
          </div>
          <h2>blog app</h2>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <div>
                  <BlogForm />
                  <BlogList />
                </div>
              }
            />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<BlogSingle />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/blogs" element={<BlogList />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default LoginForm
