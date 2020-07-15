import React from 'react'

const BlogForm = ({ newBlog, handleCreateNewBlog }) => {
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

export default BlogForm