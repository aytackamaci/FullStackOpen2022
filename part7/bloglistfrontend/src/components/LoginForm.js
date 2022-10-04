import React, { useEffect } from 'react'
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
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeLogin())
  }, [dispatch])
  const user = useSelector(({ login }) => {
    return login[0]
  })

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser(username.field.value, password.field.value))
    username.reset()
    password.reset()
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser())
    navigate('/')
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
            <input {...username.field} />
          </div>
          <div>
            password
            <input {...password.field} />
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
