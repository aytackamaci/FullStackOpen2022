import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState([null, 0])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage(['Wrong credentials', 3])
      setTimeout(() => {
        setNotificationMessage([null, 0])
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged-in
        <button type="submit" onClick={handleLogout}>
          logout
        </button>
        <BlogForm
          title={title}
          author={author}
          url={url}
          addBlog={addBlog}
          onTitleChange={setTitle}
          onAuthorChange={setAuthor}
          onUrlChange={setUrl}
        />
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      author: author,
      title: title,
      url: url,
    }

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage([
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        1,
      ])
      setTimeout(() => {
        setNotificationMessage([null, 0])
      }, 5000)

      setTitle('')
      setAuthor('')
      setUrl('')
    })
  }

  return (
    <div>
      <Notification message={notificationMessage} />
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          onNameChange={setUsername}
          onPasswordChange={setPassword}
        />
      ) : (
        <div>{blogList()}</div>
      )}
    </div>
  )
}

export default App
