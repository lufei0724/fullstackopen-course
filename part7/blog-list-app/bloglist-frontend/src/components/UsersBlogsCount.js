import React, { useState, useEffect } from 'react'
import userService from '../services/users'

import {
  Link as RouteLink,
  useRouteMatch
} from 'react-router-dom'
import { 
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
 } from '@material-ui/core'
import Link from '@material-ui/core/Link'

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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              All Users
            </TableCell>
            <TableCell>
              Blogs Created
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => 
              <UserInfo 
                key={user.id}
                user={user}
              />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const UserInfo = (props) => {
  const match = useRouteMatch()

  return (
    <TableRow 
      hover={true}
    >
      <TableCell>
        <Link 
          to={`${match.url}/${props.user.id}`} 
          component={RouteLink}
        >
          <Typography 
            variant="body1" 
            component="div"
          >
            {props.user.username}
          </Typography>
        </Link> 
      </TableCell>
      <TableCell>
        {props.user.blogs.length}
      </TableCell>
    </TableRow>
  )
}


export default UsersBlogsCount