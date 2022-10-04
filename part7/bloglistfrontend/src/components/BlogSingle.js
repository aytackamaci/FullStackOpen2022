import { useMatch } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { saveLikes, deleteBlog, addComment } from '../reducers/blogReducer'
import { useField } from '../hooks'

const BlogSingle = () => {
  const comment = useField('text')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const user = useSelector(({ login }) => {
    return login
  })

  const blogs = useSelector(({ blog }) => {
    return blog
  })

  const newComment = async (event) => {
    event.preventDefault()
    dispatch(
      addComment({
        comment: comment.field.value,
        id: blog.id,
      })
    )
    comment.reset()
  }

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find((blog) => blog.id === match.params.id.toString())
    : null

  if (!blog) {
    return null
  }

  if (!user) {
    return null
  }

  const showDelete = blog.user.id.toString() === user[0].id.toString()

  if (!blog) {
    return null
  }
  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a rel="noreferrer" target="_blank" href={blog.url}>
        {blog.url}
      </a>
      <div>
        {blog.likes} likes
        <button type="submit" onClick={() => dispatch(saveLikes(blog))}>
          like
        </button>
      </div>
      <div>added by {blog.author}</div>
      <div>
        {showDelete ? (
          <button type="submit" onClick={() => dispatch(deleteBlog(blog))}>
            delete
          </button>
        ) : (
          ''
        )}
      </div>
      <div>
        <h3>comments</h3>
        <form onSubmit={newComment}>
          <div>
            <input {...comment.field} />
          </div>
          <button type="submit">add comment</button>
        </form>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </div>
    </div>
  )
}

export default BlogSingle
