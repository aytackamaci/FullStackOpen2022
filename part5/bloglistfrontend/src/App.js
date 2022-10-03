import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState([null, 0])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        setBlogs(blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1)))
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage([
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        1,
      ])
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setNotificationMessage([null, 0])
      }, 5000)
    })
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

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
      setNotificationMessage(['Wrong credentials', 3])
      setTimeout(() => {
        setNotificationMessage([null, 0])
      }, 5000)
    }
  }

  const loginForm = () => <LoginForm loginUser={loginUser} />

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const likeBlog = async (changedBlog, id) => {
    const likedBlog = await blogService.update(changedBlog, id)
    setBlogs(blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1)))
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : likedBlog)))
  }

  const deleteBlog = async (id, user) => {
    await blogService.remove(id, user)
    setBlogs(blogs.filter((blog) => blog.id !== id))
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          {user.name} logged-in
          <button type="submit" onClick={handleLogout}>
            logout
          </button>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              id={blog.id}
              user={user.id}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
