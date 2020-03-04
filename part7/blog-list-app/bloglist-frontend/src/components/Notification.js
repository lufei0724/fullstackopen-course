import React from 'react'
import { connect } from 'react-redux'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(theme => ({
  alert: {
    position: "absolute",
    bottom: "30px",
    right: "10px",
    width: "444px",
  },
}))

const Notification = (props) => {
  const { message } = props
  const classes = useStyle()

  return (
    <div>
      { message.text.length > 0 && 
        <Alert 
          severity={message.type}
          className={classes.alert}
        >
          {message.text}
        </Alert>
      }
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
