import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../redux/notificationRedux'
import { setLoginUser } from '../redux/loginUserRedux'
import { useField } from '../hooks/index'
import loginService from '../services/login'
import token from '../services/token'

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


  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username: </label>
          <input
            id="username"
            name="username"  
            {...username.input}
            required autoFocus></input>
        </div>
        <div>
          <label htmlFor="password">password: </label>
          <input
            id="password"
            name="password"
            {...password.input}
            required></input>
        </div>
        <button>login</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  {
    setNotification,
    setLoginUser,
  }
)(LoginForm)