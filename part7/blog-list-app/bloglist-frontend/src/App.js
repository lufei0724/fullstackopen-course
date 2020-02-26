import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import { setLoginUser } from './redux/loginUserRedux'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification' 
import DisplayContainer from './components/DisplayContainer'
import NavMenu from './components/NavMenu'
import token from './services/token'


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
    <div>
      {!props.loginUser ? (
        <div>
          <h1>log in to application</h1>
          <Notification />
          <LoginForm />
        </div>
      ) : (
        <div>
          <Router>
            <NavMenu />
            <h1>blog app</h1>
            <Notification />
            <DisplayContainer />
            <NewBlog >
              <BlogForm />
            </NewBlog>
            <BlogList />
            </Router>
        </div>
      )}
    </div>
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
