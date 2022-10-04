import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import { useField } from '../hooks'

const BlogForm = () => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        author: author.field.value,
        title: title.field.value,
        url: url.field.value,
      })
    )
    dispatch(
      setNotification([
        `A new blog ${title.field.value} by ${author.field.value} added`,
        5,
        1,
      ])
    )
    title.reset()
    author.reset()
    url.reset()
  }

  const blogFormRef = useRef()

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div>
          title
          <input {...title.field} />
        </div>
        <div>
          author
          <input {...author.field} />
        </div>
        <div>
          url
          <input {...url.field} />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm
