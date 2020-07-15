import React from 'react'

const NewBlog = (props) => {
  const { showBlogForm, handleOnClick } = props
  return (
    <div>
      {(!showBlogForm) ? (
        <div>
          <button onClick={handleOnClick}>new note</button>
        </div>
      ) : (
        <div>
          {props.children}
          <button onClick={handleOnClick}>cancel</button>
        </div>
      )}
    </div>
  )
}

export default NewBlog