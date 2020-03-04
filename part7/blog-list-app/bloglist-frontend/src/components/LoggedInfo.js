import React from 'react'
import { connect } from 'react-redux'
import { setLogout } from '../redux/loginUserRedux'
import { clearNotification } from '../redux/notificationRedux'
import { Typography, IconButton, makeStyles } from '@material-ui/core'
import ExitToApp from '@material-ui/icons/ExitToApp'

const useStyle = makeStyles(theme => ({
  loggedInfo: {
    display: "flex",
    alignItems: "center",
  },
}))
const LoggedInfo = (props) => {

  const classes = useStyle()

  const handleLogout = () => {
    window.localStorage.removeItem('myBlogToken')
    props.setLogout()
    props.clearNotification()
  } 

  return (
    <div className={classes.loggedInfo}>
      <Typography>
        {props.loginUser.username}
      </Typography>
      <IconButton 
        edge="end"
        aria-label="exit app"
        onClick={handleLogout}
        color="inherit"
      >
        <ExitToApp />
      </IconButton>  
    </div>
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