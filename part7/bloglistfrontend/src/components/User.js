import { useMatch } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'

const User = () => {
  const dispatch = useDispatch()

  const match = useMatch('/users/:id')
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(({ user }) => {
    return user
  })
  const user = match
    ? users.find((user) => user.id === match.params.id.toString())
    : null

  if (!user) {
    return null
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      {user.blogs.map((blog) => (
        <li style={{ marginLeft: '0.8rem' }} key={blog.id}>
          {blog.title}
        </li>
      ))}
    </div>
  )
}

export default User
