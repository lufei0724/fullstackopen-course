import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { showAllBlogs } from '../redux/blogsRedux'
import NewBlog from './NewBlog'
import Blog from './Blog'
import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { Typography, TableBody } from '@material-ui/core'

const BlogList = (props) => {
  console.log('rendering BlogList')

  const { blogs, showAllBlogs } = props

  useEffect(() => {
    console.log('use effect in bloglist')
    showAllBlogs()
  }, [])

  return (
    <div>
      <NewBlog />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>
                  All Stories
                </Typography>
              </TableCell>
            </TableRow>          
          </TableHead>
          <TableBody>
            {blogs
              .concat()
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                 <TableRow 
                   key={blog.id}
                   hover={true}
                 >
                   <Blog blog={blog} />
                 </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  { showAllBlogs }
)(BlogList)