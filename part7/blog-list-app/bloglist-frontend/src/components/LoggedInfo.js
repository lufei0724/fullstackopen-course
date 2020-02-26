import React from 'react'
import { connect } from 'react-redux'
import { setLogout } from '../redux/loginUserRedux'
import { clearNotification } from '../redux/notificationRedux'

const LoggedInfo = (props) => {

  const handleLogout = () => {
    window.localStorage.removeItem('myBlogToken')
    props.setLogout()
    props.clearNotification()
  } 

  return (
      <p style={{display:"inline"}}>{props.loginUser.username} logged in 
        <button onClick={handleLogout}>logout</button>
      </p>
  )
}

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser
  }
}

export default connect(
  mapStateToProps,
  {
    setLogout,
    clearNotification
  },
)
(LoggedInfo)