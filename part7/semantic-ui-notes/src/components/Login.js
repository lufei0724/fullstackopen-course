import React from 'react'
import {
  withRouter
} from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'

const LoginNoHistory = (props) => {
  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mattl')
    props.history.push('/')
  }

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>username</label>
          <input name='username'/>
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input name="password" type="password" />
        </Form.Field>
        <Form.Button type="submit" color="teal">
          Login
        </Form.Button>
      </Form>
    </div>
  )
}

const Login = withRouter(LoginNoHistory)

export default Login