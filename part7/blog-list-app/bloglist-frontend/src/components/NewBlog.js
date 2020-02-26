import React, { useState } from 'react'

const NewBlog = (props) => {
  const [showBlogForm, setShowBlogForm] = useState(false)
  //const { showBlogForm, handleOnClick } = props
  const toggleBlogForm = () => setShowBlogForm(!showBlogForm)

  return (
    <div>
      {(!showBlogForm) ? (
        <div>
          <button onClick={toggleBlogForm}>new note</button>
        </div>
      ) : (
        <div>
          {props.children}
          <button onClick={toggleBlogForm}>cancel</button>
        </div>
      )}
    </div>
  )
}

export default NewBlog