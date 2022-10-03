import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    like(state, action) {
      const id = action.payload
      const blogToChange = state.find((n) => n.id === id)
      const likedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      saveLikes(id, likedBlog)
      return state
        .map((blog) => (blog.id !== id ? blog : likedBlog))
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload.sort((a, b) => (a.likes > b.likes ? -1 : 1))
    },
    removeBlog(state, action) {
      return state.filter((blog) => action.payload.id !== blog.id)
    },
  },
})

export const { like, setBlogs, removeBlog, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (blog) => {
  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
    return async (dispatch) => {
      await blogService.remove(blog.id, blog.user)
      dispatch(removeBlog(blog))
    }
  }
}

export const saveLikes = (blog) => {
  const votedBlog = {
    ...blog,
    likes: blog.likes + 1,
  }
  return async (dispatch) => {
    const { id } = await blogService.update(votedBlog, blog.id)
    dispatch(like(id))
  }
}

export default blogSlice.reducer
