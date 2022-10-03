import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  const blogs = useSelector(({ blog }) => {
    return blog
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginUser = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
    } catch (exception) {
      dispatch(setNotification(['Wrong credentials', 5, 3]))
    }
  }

  const loginForm = () => <LoginForm loginUser={loginUser} />

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          {user.name} logged-in
          <button type="submit" onClick={handleLogout}>
            logout
          </button>
          <BlogForm></BlogForm>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
