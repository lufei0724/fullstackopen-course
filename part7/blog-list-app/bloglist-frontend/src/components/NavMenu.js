import React from 'react'
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom'
import LoggedInfo from './LoggedInfo'

const ulStyle = {
  listStyleType:"none",
  padding: "5px"
}

const liStyle ={
  display:"inline",
  margin:"5px"
}

const NavMenu = () => {
  return (
    <nav style={{backgroundColor:"grey"}}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li style={liStyle}>
          <Link to="/Users">Users</Link>
        </li>
        <li style={liStyle}>
          <LoggedInfo />
        </li>
      </ul>
    </nav>
  )
}

export default NavMenu