import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { showAllBlogs } from '../redux/blogsRedux'
import Blog from './Blog'

const BlogList = (props) => {
  console.log('rendering BlogList')

  const { blogs, showAllBlogs } = props

  useEffect(() => {
    console.log('use effect in bloglist')
    showAllBlogs()
  }, [])

  return (
    blogs
      .concat()
      .sort((a, b) => b.likes - a.likes)
      .map((blog) =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  { showAllBlogs }
)(BlogList)