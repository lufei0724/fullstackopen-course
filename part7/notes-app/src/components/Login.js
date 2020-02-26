import React from 'react'
import {
  withRouter
} from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

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
        <Form.Group >
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" />
        </Form.Group> 
        <Form.Group >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group> 
        <Button Variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

const Login = withRouter(LoginNoHistory)

export default Login