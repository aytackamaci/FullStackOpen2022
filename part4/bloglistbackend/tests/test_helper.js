const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
