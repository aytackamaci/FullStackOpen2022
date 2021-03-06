import { useState } from 'react'

const Blog = ({ blog, likeBlog, id, user, deleteBlog }) => {
  const [visualForm, setVisualForm] = useState(true)

  const longFormVisible = { display: visualForm ? 'none' : '' }
  const shortFormVisible = { display: visualForm ? '' : 'none' }

  const toggleForm = () => {
    setVisualForm(!visualForm)
  }

  const handleLike = () => {
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    likeBlog(changedBlog, id)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(id, user)
    }
  }

  const showDelete = blog.user.id.toString() === user.toString()

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
        <button type="submit" onClick={handleLike}>
          like
        </button>
        <br />
        {blog.user.name}
        <br />
        {showDelete ? (
          <button type="submit" onClick={handleDelete}>
            delete
          </button>
        ) : (
          ''
        )}
      </div>
      <div style={Object.assign({}, blogStyle, shortFormVisible)}>
        {blog.title} {blog.author}
        <button type="submit" onClick={toggleForm}>
          view
        </button>
      </div>
    </div>
  )
}

export default Blog
