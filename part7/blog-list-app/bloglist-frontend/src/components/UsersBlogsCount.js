import React, { useState, useEffect } from 'react'
import userService from '../services/users'

import {
  Link,
  useRouteMatch
} from 'react-router-dom'

const UsersBlogsCount = (props) => {
  console.log('rendering UsersBlogsCount')
  const [users, setUsers] = useState([])

  useEffect(() => {
    (async () => {
      const returnedUsers = await userService.getAll()
      setUsers(returnedUsers)
    })()
    console.log('users blogs count effect')
  }, [])
  
  return (
    <div> 
     <table>
       <tbody>
         <tr>
           <th></th>
           <th>blogs created</th>
         </tr>
         {users.map((user) => 
           <UserInfo 
               key={user.id}
               user={user}
           />
         )}
       </tbody>
     </table> 
    </div>
  )
}

const UserInfo = (props) => {
  const match = useRouteMatch()

  return (
    <tr>
      <td>
        <Link to={`${match.url}/${props.user.id}`} >
          {props.user.username}
        </Link> 
      </td>
      <td>{props.user.blogs.length}</td>
    </tr>
  )
}


export default UsersBlogsCount