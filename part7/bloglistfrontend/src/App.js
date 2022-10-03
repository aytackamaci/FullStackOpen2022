//import Notification from './components/Notification'
//import Togglable from './components/Togglable'
//import { useRef } from 'react'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import RNotification from './components/RNotification'
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
      /*setNotificationMessage(['Wrong credentials', 3])
      setTimeout(() => {
        setNotificationMessage([null, 0])
      }, 5000)*/
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
      <RNotification />
      <LoginForm></LoginForm>
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

//const [blogs, setBlogs] = useState([])
//const [notificationMessage, setNotificationMessage] = useState([null, 0])
/*useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        setBlogs(blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1)))
      )
  }, [])*/

/*const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage([
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        1,
      ])
  dispatch(
    setNotification([
      `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      5,
      1,
    ])
  )
  blogFormRef.current.toggleVisibility()
  /*setTimeout(() => {
        setNotificationMessage([null, 0])
      }, 5000)
    })
  }*/

//const blogFormRef = useRef()

//const blogForm = () => (
//<Togglable buttonLabel="new blog" ref={blogFormRef}>
//<BlogForm /*createBlog={addBlog}*/ />
//</Togglable>
//)

/*const likeBlog = async (changedBlog, id) => {
    const likedBlog = await blogService.update(changedBlog, id)
    setBlogs(blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1)))
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : likedBlog)))
  }*/

/*const deleteBlog = async (id, user) => {
    await blogService.remove(id, user)
    setBlogs(blogs.filter((blog) => blog.id !== id))
  }*/
//<Notification message={notificationMessage} />
/*{blogForm()}*/

/*<Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              id={blog.id}
              user={user.id}
              deleteBlog={deleteBlog}
            /> */
