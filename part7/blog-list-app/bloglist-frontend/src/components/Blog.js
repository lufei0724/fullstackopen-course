import React from 'react'
import {
  Link as RouteLink,
} from 'react-router-dom'
import TableCell from '@material-ui/core/TableCell'
import Link from '@material-ui/core/Link'
import { Typography } from '@material-ui/core'

const Blog = (props) => {
  const { blog } = props

  return (
    <TableCell>
      <Link 
        component={RouteLink} 
        to={`/blogs/${blog.id}`}
        underline="none"
      >
        <Typography variant="h6" component="h3">
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" component="p">
          {blog.author}
        </Typography >
      </Link>
    </TableCell>
  )
}

export default Blog