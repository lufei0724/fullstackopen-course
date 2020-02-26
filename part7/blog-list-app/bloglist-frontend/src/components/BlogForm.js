import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'
import { createBlog } from '../redux/blogsRedux'

const BlogForm = (props) => {

  const newBlog = {
    title: useField('text'),
    author: useField('text'),
    url: useField('url'),
    reset() {
      this.title.reset()
      this.author.reset()
      this.url.reset()
    }
  }

  const handleCreateNewBlog = (event) => {
    event.preventDefault()
    const savingBlog = { 
        title: newBlog.title.input.value,
        author: newBlog.author.input.value,
        url: newBlog.url.input.value
      }
    props.createBlog(savingBlog)
    newBlog.reset()
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreateNewBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            id="title"
            name="title"
            {...newBlog.title.input}
          >
          </input>
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            id="author"
            name="author"
            {...newBlog.author.input}
          >
          </input>
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input
            id="url"
            name="url"
            {...newBlog.url.input}
          >
          </input>
        </div>
        <div>
          <button>create</button>
        </div>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createBlog }
)(BlogForm)