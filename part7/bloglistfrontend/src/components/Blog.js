import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveLikes, deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const Blog = ({ user, blog }) => {
  const [visualForm, setVisualForm] = useState(true)
  const dispatch = useDispatch()

  const longFormVisible = { display: visualForm ? 'none' : '' }
  const shortFormVisible = { display: visualForm ? '' : 'none' }

  const toggleForm = () => {
    setVisualForm(!visualForm)
  }

  const showDelete = blog.user.id.toString() === user[0].id.toString()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <div style={Object.assign({}, blogStyle, longFormVisible)}>
        {blog.title} {blog.author}
        <button type="submit" onClick={toggleForm}>
          hide
        </button>
        <br />
        {blog.url}
        <br />
        likes: {blog.likes}{' '}
        <button type="submit" onClick={() => dispatch(saveLikes(blog))}>
          like
        </button>
        <br />
        {blog.user.name}
        <br />
        {showDelete ? (
          <button type="submit" onClick={() => dispatch(deleteBlog(blog))}>
            delete
          </button>
        ) : (
          ''
        )}
      </div>
      <div style={Object.assign({}, blogStyle, shortFormVisible)}>
        <Link to={`blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        <button type="submit" onClick={toggleForm}>
          view
        </button>
      </div>
    </div>
  )
}

export default Blog
