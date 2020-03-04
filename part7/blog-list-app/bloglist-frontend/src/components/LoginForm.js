import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../redux/notificationRedux'
import { setLoginUser } from '../redux/loginUserRedux'
import { useField } from '../hooks/index'
import loginService from '../services/login'
import token from '../services/token'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CheckBox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))
const LoginForm = (props) => {

  console.log('rendering loginform')

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loginUser = await loginService
        .login({ username: username.input.value, password: password.input.value })
      token.setToken(loginUser.token)
      props.setLoginUser(loginUser)
      window.localStorage.setItem('myBlogToken', JSON.stringify(loginUser))
    } catch (error) {
      console.log(error)
      props.setNotification({ type: 'error', text: 'wrong username or password' })
      username.reset()
      password.reset()
    }
  }

  const classes = useStyles()

  return (
    <Container maxWidth="xs" >
    <div className={classes.paper}>
      <Avatar className={classes.avatar} >
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" varaiant="h1">
        Log in to application
      </Typography>
      <form onSubmit={handleLogin} className={classes.form} noValidate>
          <TextField 
            id="username"
            name="username"
            label="Username"
            {...username.input}
            variant="outlined"
            fullWidth
            margin="normal"
            autoFocus
            autoComplete="username"
          />
          <TextField 
            id="password"
            name="password"
            label="Password"
            {...password.input}
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<CheckBox value="remeber" color="primary" />}
            label="Remeber me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="classes.submit"
          >
            Login
          </Button>
      </form>
    </div>
    </Container>
  )
}

export default connect(
  null,
  {
    setNotification,
    setLoginUser,
  }
)(LoginForm)