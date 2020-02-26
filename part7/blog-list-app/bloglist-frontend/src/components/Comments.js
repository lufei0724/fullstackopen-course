import React from 'react'

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

  const listComments = comments.map((comment) => 
    <li key={comment.id}>{comment.content}</li>
  )

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="comment" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {listComments}
      </ul>
    </div>
  )
}

export default Comments