import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification' 
import { useResource } from './hooks/index'
//import { blogs, blogService } from './services/blogs'
import loginService from './services/login'
import token from './services/token'
import { useField } from './hooks'

const BlogList = ({ blogs, blogService, currUser, setMessage }) => {
  return (
    blogs
      .concat()
      .sort((a, b) => b.likes - a.likes)
      .map((blog) =>
        <Blog
          key={blog.id}
          blog={blog}
          blogService={blogService}
          currUser={currUser}
          setMessage={setMessage}
        />
      )
  )
}

const LoggedInfo = ({ loggedUser, handleLogout }) => {
  return (
    <div>
      <p>{loggedUser.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  )
}

function App() {
  const username = useField('text')
  const password = useField('password')

  const [blogs, blogService] = useResource('/api/blogs')
  //const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()
  const [showBlogForm, setShowBlogForm] = useState(false)

  const initMessage = {
    type: '',
    text: '',
  }
  const [message, setMessage] = useState(initMessage)

  const newBlog = {
    title: useField('text'),
    author: useField('text'),
    url: useField('url'),
    reset() {
      this.title.reset()
      this.author.reset()
      this.url.reset()
    }
  }

  //const [newBlog, setNewBlog] = useState(initBlog)

  useEffect(() => { 
    checkToken()
  }, [])

  const checkToken = () => {
    const loggedUserJSON = window.localStorage.getItem('myBlogToken')
    if (!loggedUserJSON) {
      return
    }
    const parsedUser = JSON.parse(loggedUserJSON)
    token.setToken(parsedUser.token)
    blogService
      .getAll()
    //  .then((blogs) => {
     //   setBlogs(blogs)
      //})
    setUser(parsedUser)
  }

  const handleLogin = (event) => {
    event.preventDefault()
    setMessage(initMessage)
    loginService
      .login({ username: username.input.value, password: password.input.value })
      .then((loginUser) => {
        token.setToken(loginUser.token)
        return loginUser
      })
      .then((loginUser => {
        setUser(loginUser)
        return loginUser
      }))
      .then((loginUser) => {
        blogService
          //.getUserBlogs(loginUser.id)
          .getAll()
          //.then((blogs) => {
           // setBlogs(blogs)
          //})
        return loginUser
      })
      .then((loginUser) => {
        window.localStorage.setItem('myBlogToken', JSON.stringify(loginUser))
      })
      .catch((error) => {
        console.log(error)
        setMessage({ type: 'error', text: 'wrong username or password' })
        setUser('')
        username.reset()
        password.reset()
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('myBlogToken')
    setUser('')
    username.reset()
    password.reset()
    setShowBlogForm(false)
    setMessage(initMessage)
  }

  const handleCreateNewBlog = (event) => {
    event.preventDefault()
    const savingBlog = { 
        title: newBlog.title.input.value,
        author: newBlog.author.input.value,
        url: newBlog.url.input.value
      }
    blogService
      .create(savingBlog)
     // .then((savedBlog) => {
      //  setBlogs(blogs.concat(savedBlog))
      //})
    setMessage({ type: 'info', text: `a new blog ${savingBlog.title} by ${savingBlog.author} added` })
    newBlog.reset()
  }

  const toggleBlogForm = () => {
    setShowBlogForm(!showBlogForm)
  }

  return (
    <div>
      {!user ? (
        <div>
          <h1>log in to application</h1>
          <Notification
            message={message}
          />
          <LoginForm
            username={username.input}
            password={password.input}
            handleLogin={handleLogin}
            message={message}
          />
        </div>
      ) : (
        <div>
          <h1>Blogs</h1>
          <Notification
            message={message}
          />
          <LoggedInfo
            loggedUser={user}
            handleLogout={handleLogout}
          />
          <NewBlog showBlogForm={showBlogForm} handleOnClick={toggleBlogForm}>
            <BlogForm
              newBlog={newBlog}
              handleCreateNewBlog={handleCreateNewBlog}
            />
          </NewBlog>
          <BlogList
            blogs={blogs}
          //.  setBlogs={setBlogs}
            blogService={blogService}
            currUser={user}
            setMessage={setMessage}
          />
        </div>
      )}
    </div>
  )
}

export default App
