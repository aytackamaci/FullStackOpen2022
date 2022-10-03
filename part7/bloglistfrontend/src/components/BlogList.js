import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ login }) => {
    return login
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  const blogs = useSelector(({ blog }) => {
    return blog
  })

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} user={user} blog={blog}></Blog>
      ))}
    </div>
  )
}

export default BlogList
