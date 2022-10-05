import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveLikes, deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Box, Button } from '@mui/material'

const Blog = ({ user, blog }) => {
  const [visualForm, setVisualForm] = useState(true)
  const dispatch = useDispatch()

  const longFormVisible = { display: visualForm ? 'none' : '' }
  const shortFormVisible = { display: visualForm ? '' : 'none' }

  const toggleForm = () => {
    setVisualForm(!visualForm)
  }
  if (!user) {
    return null
  }
  const showDelete = blog.user.id.toString() === user[0].id.toString()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 3,
    marginBottom: 5,
    marginRight: 5,
    marginTop: 5,
  }

  return (
    <div>
      <Box>
        <div calssName="blog" style={longFormVisible}>
          {blog.title} {blog.author}
          <Button
            variant="contained"
            size="small"
            type="submit"
            onClick={toggleForm}
          >
            hide
          </Button>
          <br />
          {blog.url}
          <br />
          likes: {blog.likes}{' '}
          <Button
            variant="contained"
            size="small"
            type="submit"
            onClick={() => dispatch(saveLikes(blog))}
          >
            like
          </Button>
          <br />
          {blog.user.name}
          <br />
          {showDelete ? (
            <Button
              variant="contained"
              size="small"
              type="submit"
              onClick={() => dispatch(deleteBlog(blog))}
            >
              delete
            </Button>
          ) : (
            ''
          )}
        </div>
      </Box>
      <div style={Object.assign({}, blogStyle, shortFormVisible)}>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        <Button
          variant="contained"
          size="small"
          type="submit"
          onClick={toggleForm}
        >
          view
        </Button>
      </div>
    </div>
  )
}

export default Blog
