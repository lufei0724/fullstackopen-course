import React, {useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  useParams
} from 'react-router-dom'
import blogService from '../services/blogs'
import { updateBlog, removeBlog } from '../redux/blogsRedux'
import Comments from './Comments'

const BlogDetail = (props) => {
  const { blogId } = useParams() 
  const [blog, setBlog] = useState('')
  
  useEffect(() => {
    (async () => {
      const returnedBlog = await blogService.getSingleBlog(blogId)
      setBlog(returnedBlog)
    })()
  }, [blogId])

  const updateBlogLikes = () => {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      const message = { type: 'error', text: 'Failed to add likes' }
      props.updateBlog(updatedBlog, message)
      setBlog(updatedBlog)
  }

  const handleRemoveBlog = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
        props.removeBlog(blog)
    }
  }

  const addNewComment = async (content) => {
    await blogService.addComment(blog.id, content)
    const returnedBlog = await blogService.getSingleBlog(blog.id)
    setBlog(returnedBlog)
  }

  return (
    <div>
      { (!blog) ? null : (
        <div>
          <h1>{blog.title} {blog.author}</h1>      
          <p>{blog.url}</p>
          <p>{blog.likes}<button onClick={updateBlogLikes}>like</button></p>
          <p>added by {blog.user.name}</p>
          { (props.loginUser.id === blog.user.id) &&
            <button onClick={handleRemoveBlog}>remove</button>
          }
          <Comments 
            comments={blog.comments}
            addComment={addNewComment} 
          />
        </div>
      )}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser
  }
}

const mapDispatchToProps = {
  updateBlog,
  removeBlog,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(BlogDetail)