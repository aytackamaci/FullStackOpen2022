const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Full Stack 2022 is fun',
    author: 'Aytac Kamaci',
    url: 'aa.com.rr.bb',
    likes: 8,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((n) => n.title)
  expect(titles).toContain('Full Stack 2022 is fun')
})

test('if likes property misses it defaults to 0', async () => {
  const newBlog = {
    title: 'Full Stack 2022 is not a game',
    author: 'Aytac Kamacos',
    url: 'aa.com.rr.bb',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const likes = blogsAtEnd.map((n) => n.likes)
  expect(likes).not.toContain(undefined)
})

test('if title or url properties are missing it returns error', async () => {
  const newBlog = {
    title: 'Full Stack 2022 is not a game',
    author: 'Aytac Kamacos',
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('deletion succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const contents = blogsAtEnd.map((r) => r.title)

  expect(contents).not.toContain(blogToDelete.title)
})

test('updating blog with status code 200 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToUpdate = {
    title: blogsAtStart[0].title,
    author: blogsAtStart[0].author,
    url: blogsAtStart[0].url,
    likes: blogsAtStart[0].likes + 100,
  }
  await api
    .put(`/api/blogs/${blogsAtStart[0].id}`)
    .send(blogToUpdate)
    .expect(200)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[0].likes).toBe(helper.initialBlogs[0].likes + 100)
})

afterAll(() => {
  mongoose.connection.close()
})
