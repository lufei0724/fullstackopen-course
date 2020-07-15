import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  const {
    username,
    password,
    handleLogin
  } = props

  console.log('rending loginform')
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username: </label>
          <input
            id="username"
            name="username"  
            {...username}
            required autoFocus></input>
        </div>
        <div>
          <label htmlFor="password">password: </label>
          <input
            id="password"
            name="password"
            {...password}
            required></input>
        </div>
        <button>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm