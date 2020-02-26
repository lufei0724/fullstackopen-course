import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'
import UserBlogList from './UserBlogList'
import UsersBlogsCount from './UsersBlogsCount'
import BlogDetail from './BlogDetail'

const DisplayContainer = (props) => {
  console.log('rendering display container')
  return (
    <div>
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
      </Switch>
    </div>
  )
}

export default DisplayContainer