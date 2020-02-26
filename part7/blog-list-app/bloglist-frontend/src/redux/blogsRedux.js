import blogService from '../services/blogs'
import { setNotification } from './notificationRedux'

const blogsReducer = (state=[], action) => {
  switch (action.type) {
    case "SHOW_ALL_BLOGS":
      return action.data
    case "CREATE_BLOG":
      return [...state, action.data]
    case "UPDATE_BLOG":
      return state.map((blog) =>
        blog.id === action.data.id
          ? action.data
          : blog)
    case "REMOVE_BLOG":
      return state.filter((blog) => blog.id !== action.data.id)
    case "GET_SINGLE_BLOG":
      return action.data
    default:
      return state
  }
}

export const showAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: "SHOW_ALL_BLOGS",
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      console.log('create blog')
      const newBlog = await blogService.create(blog)
      dispatch({
        type: "CREATE_BLOG",
        data: newBlog
      })
      const message = { type: 'info', text: `a new blog ${blog.title} by ${blog.author} added` }
      dispatch(setNotification(message))
    } catch (error) {
      const message = { type: 'error', text: `Failed to add the new blog ${blog.title}` }
      dispatch(setNotification(message))
    }
  }
}

export const updateBlog = (blog, message) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog)
      dispatch({
        type: "UPDATE_BLOG",
        data: updatedBlog
      })
    } catch (error) {
      dispatch(setNotification(message))
    }
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch({
        type: "REMOVE_BLOG",
        data: blog
      })
      const message = { type: 'info', text: `${blog.title} has been deleted` }
      dispatch(setNotification(message))
    } catch (error) {
      const message = { type: 'error', text: error.response.data.error }
      dispatch(setNotification(message))
    }
  }
}

export const getSingleBlog = (id) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.getSingleBlog(id)
      dispatch({
        type: "GET_SINGLE_BLOG",
        data: blog
      })
    } catch (error) {
      const message = { type: 'error', text: error.response.data.error }
      dispatch(setNotification(message))
    }
  }
}

export default blogsReducer