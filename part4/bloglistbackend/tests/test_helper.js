const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Aytac Kamaci',
    url: 'aa.com.rr.ds',
    likes: 12,
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'Yaren Gulec',
    url: 'bb.com.rr.ds',
    likes: 31,
  },
]
const createLoginAuthenticate = async () => {
  const loginUser = {
    username: 'aytackama',
    name: 'Aytaco Kamaco',
    password: '123456',
  }

  await api.post('/api/users').send(loginUser)

  const user = await api
    .post('/api/login')
    .send(loginUser)
    .expect('Content-Type', /application\/json/)

  return user
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'remove',
    url: 'no.com.aa',
    likes: 0,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  createLoginAuthenticate,
}
