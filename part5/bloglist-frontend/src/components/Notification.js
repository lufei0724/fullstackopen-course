import React from 'react'
import '../css/Notification.css'

const Notification = ({ message }) => {
  if ( message.text.length === 0 ) {
    return (
      <div></div>
    )
  }

  let className = 'noti'
  className =
    message.type === 'info'
      ? className.concat(' noti-info')
      : className.concat(' noti-error')

  return (
    <div className={className}>
      <p>{message.text}</p>
    </div>
  )
}

export default Notification