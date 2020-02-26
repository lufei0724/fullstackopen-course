import React from 'react'
import { connect } from 'react-redux'
import '../css/Notification.css'

const Notification = (props) => {
  console.log('rendering nofification')
  const { message } = props
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

const mapStateToProps = (state) => {
  return {
    message: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)
