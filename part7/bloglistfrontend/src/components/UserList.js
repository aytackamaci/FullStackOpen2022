import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const UserList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(({ user }) => {
    return user
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(({ blog }) => {
    return blog
  })

  const getBlogCount = (user) => {
    return blogs.filter((blog) => blog.user.id === user.id).length
  }

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th> </th>
            <th> blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {' '}
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{getBlogCount(user)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
