import { useMatch } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { saveLikes, deleteBlog } from '../reducers/blogReducer'

const BlogSingle = () => {
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

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find((blog) => blog.id === match.params.id.toString())
    : null

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
    </div>
  )
}

export default BlogSingle
