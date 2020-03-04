import React, { useState } from 'react'
import {
  Link as RouteLink,
} from 'react-router-dom'
import LoggedInfo from './LoggedInfo'
import SearchInput from './SearchInput'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Link from '@material-ui/core/Link'

import MenuIcon from '@material-ui/icons/Menu'


const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    }
  }
}))
const NavMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.grow}>
    <AppBar position="fixed" >
      <Toolbar component="nav">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
        <MenuIcon />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link 
              to="/blogs"
              component={RouteLink} 
              underline="none"
            >
              Blogs
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
          <Link 
            to="/users"
            component={RouteLink}
            underline="none"
          >
            Users
          </Link>
          </MenuItem>
        </Menu>
        <Typography className={classes.title} variant="h6" noWrap>
          Simplest Blogs
        </Typography>
        <SearchInput /> 
        <div className={classes.grow} />
        <LoggedInfo />
      </Toolbar>
    </AppBar>
    </div>
  )
}


export default NavMenu