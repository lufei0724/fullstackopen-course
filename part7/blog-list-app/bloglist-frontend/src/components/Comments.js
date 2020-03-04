import React from 'react'
import { Button, TextField, Typography } from '@material-ui/core'
import {
  List,
  ListItem,
  Divider,
} from '@material-ui/core'

const Comments = (props) => {
  const { comments, addComment } = props

  const handleOnSubmit = (event) => {
    event.preventDefault()
    const newComment = {
      content: event.target.comment.value
    }
    addComment(newComment)
    event.target.comment.value = ''
  }

  const listComments = comments.map((comment) => (
    <Typography variant="body2" key={comment.id} component="div">
      <ListItem>
        {comment.content}
      </ListItem>
      <Divider />
    </Typography>
  )) 

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleOnSubmit}>
        <TextField
          name="comment"
        > 
        </TextField>
        <Button 
          type="submit"
          variant="contained"
          color="primary"
        >
          add comment
        </Button>
      </form>
      <List>
        {listComments}
      </List>
    </div>
  )
}

export default Comments