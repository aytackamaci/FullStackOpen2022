/*import { useMatch } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { initializeBlogs } from '../reducers/blogReducer'*/

const BlogSingle = () => {
  /*const dispatch = useDispatch()
  console.log('asdas')
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const users = useSelector(({ user }) => {
    return user
  })

  const blogs = useSelector(({ blog }) => {
    return blog
  })

  const match = useMatch('/blogs/:id')

  const blog = match
    ? blogs.find((blog) => blog.id === match.params.id.toString())
    : null
  console.log(match.params.id.toString())
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <h2>added blogs</h2>
    </div>

  */

  return <div>asda</div>
}

export default BlogSingle
