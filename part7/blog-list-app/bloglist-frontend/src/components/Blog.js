import React from 'react'
import {
  Link,
} from 'react-router-dom'

import '../css/Blog.css'

const Blog = (props) => {
  const { blog } = props

  return (
    <div className="blogContainer">
      <div className="blogHeader" >
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  )
}

export default Blog