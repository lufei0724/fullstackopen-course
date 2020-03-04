import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { setLoginUser } from './redux/loginUserRedux'
import UserBlogList from './components/UserBlogList'
import UsersBlogsCount from './components/UsersBlogsCount'
import BlogDetail from './components/BlogDetail'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification' 
import NavMenu from './components/NavMenu'
import token from './services/token'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'

function App(props) {
  console.log('rendering App')

  useEffect(() => { 
    checkToken()
  }, [])

  const checkToken = async () => {
    const loggedUserJSON = await window.localStorage.getItem('myBlogToken')
    if (!loggedUserJSON) {
      return
    }
    const parsedUser = JSON.parse(loggedUserJSON)
    token.setToken(parsedUser.token)
    props.setLoginUser(parsedUser)
  }

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Notification />
      {!props.loginUser ? (
        <LoginForm />
      ) : (
        <Router>
          <NavMenu />
          <div style={{marginTop: '100px'}}>
            <Switch>
              <Route exact path="/users/:userId" >
                <UserBlogList />
              </Route>
              <Route exact path="/users" >
                <UsersBlogsCount/>
              </Route>       
              <Route exact path="/blogs/:blogId">
                <BlogDetail />
              </Route>
              <Route exact path="/blogs">
                <BlogList />
              </Route>
              <Route exact path="/">
                <Redirect 
                  to={{
                    pathname:"/blogs"
                  }}
                />>
              </Route>
            </Switch>
          </div>
        </Router>
      )}
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser
  }
}

const mapDispatchToProps = { 
  setLoginUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
