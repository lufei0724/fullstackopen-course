import React, { useState } from 'react'
import '../css/Blog.css'
//import blogService from '../services/blogs'

const Blog = (props) => {
  const initBlog = props.blog
  const blogService = props.blogService
  const currUser = props.currUser
  const setMessage = props.setMessage
  const [showBlogDetail, setShowBlogDetail] = useState(false)
  const [blog, setBlog] = useState(initBlog)

  const handleOnClick = () => {
    setShowBlogDetail(!showBlogDetail)
  }

  const updateBlogLikes = async () => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      setBlog(updatedBlog)
      await blogService.update(blog.id, updatedBlog)
    } catch (error) {
      setBlog(initBlog)
      setMessage({ type: 'error', text: 'Failed to add likes' })
    }
  }

  const handleRemoveBlog = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        setMessage({ type: 'info', text: `${blog.title} has been deleted` })
      } catch (error) {
        setMessage({ type: 'error', text: error.response.data.error })
      }
    }
  }

  return (
    <div className="blogContainer">
      <div className="blogHeader" onClick={handleOnClick}>
        {blog.title} {blog.author}
      </div>
      { showBlogDetail &&
        <div>
          <p>
            {blog.url}
          </p>
          <p>
            {blog.likes} likes
            <button onClick={updateBlogLikes}>like</button>
          </p>
          <p>
            added by {blog.user.username}
          </p>
          {(currUser.id === blog.user.id) &&
            <button onClick={handleRemoveBlog}>remove</button>
          }
        </div>
      }
    </div>
  )
}

export default Blog