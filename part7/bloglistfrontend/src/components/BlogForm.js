import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        author: author,
        title: title,
        url: url,
      })
    )
    dispatch(setNotification([`A new blog ${title} by ${author} added`, 5, 1]))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const blogFormRef = useRef()

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm
