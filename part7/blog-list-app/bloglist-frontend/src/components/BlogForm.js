import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'
import { createBlog } from '../redux/blogsRedux'
import { Typography, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      margin: theme.spacing(1),
    },
    '& > div > .MuiTextField-root': {
      width: 300,
    },
  },
}))

const BlogForm = (props) => {
  const { toggleBlogForm } = props
  const classes = useStyles() 
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
      <Typography 
        variant="h5"
        component="h2"
        color="primary"
      >
        Create New Blog
      </Typography>
      <form 
        className={classes.form}  
        onSubmit={handleCreateNewBlog}>
        <div>
          <TextField 
            id="title" 
            label="Title"
            {...newBlog.title.input}
          />
        </div>
        <div>
          <TextField
            id="author"
            label="Author"
            {...newBlog.author.input}
          />
        </div>
        <div>
          <TextField 
            id="url"
            label="Url"
            {...newBlog.url.input}
          />
        </div>
        <div>
          <Button
            color="primary"
          >
            Create
          </Button>
          <Button 
            onClick={toggleBlogForm}
            color="secondary"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createBlog }
)(BlogForm)