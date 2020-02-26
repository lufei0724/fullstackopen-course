import React, { useState, useEffect } from 'react'
import {
  useParams
} from 'react-router-dom'
import usersService from '../services/users'

const UserBlogList = (props) => {
  const { userId } = useParams()
  const [user, setUser] = useState({})

  useEffect(() => {
    (async () => {
      const returnUser = await usersService.getUserById(userId)
      setUser(returnUser)
    })()
  }, [userId])

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      { (!user.blogs) ? null :
        <ul>
          {user.blogs.map((blog) => {
            return (
              <li key={blog.id}>{blog.title}</li>
            )
          })}
        </ul>
      }
    </div>
  )
}

export default UserBlogList