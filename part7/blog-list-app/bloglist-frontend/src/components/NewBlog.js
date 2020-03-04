import React, { useState } from 'react'
import BlogForm from './BlogForm'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  addNew: {
    display: "flex",
    justifyContent: "flex-end"
  }
}))

const NewBlog = (props) => {
  const [showBlogForm, setShowBlogForm] = useState(false)
  const toggleBlogForm = () => setShowBlogForm(!showBlogForm)
  const classes = useStyles()
  return (
    <div>
      {(!showBlogForm) 
      ? <div className={classes.addNew}>
          <Button 
            color="primary" 
            onClick={toggleBlogForm}
          >
            New Blog
          </Button>
        </div>
      : <BlogForm 
          toggleBlogForm={toggleBlogForm}
        />
      }
    </div>
  )
}

export default NewBlog