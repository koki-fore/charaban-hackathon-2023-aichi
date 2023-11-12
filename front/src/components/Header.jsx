import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import logo from '../assets/logo.png'
import { Button } from '@mui/material'
import { Link as routerLink, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { useAuthContext } from '../context/AuthContext'

const Header = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const logout = () => {
    console.log('logout')
    auth.signOut()
    return navigate('/Login')
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'bgSky' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo} alt="logo" />

          <Box sx={{ flexGrow: 1, display: 'flex' }}></Box>
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                <MenuItem key="Profile" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem
                  key="Logout"
                  onClick={() => {
                    handleCloseUserMenu()
                    logout()
                  }}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: 'flex' }}>
              <Button
                variant="contained"
                component={routerLink}
                to="/SignUp"
                sx={{ borderRadius: 5, mr: 1, width: 100 }}>
                新規登録
              </Button>
              <Button
                variant="text"
                component={routerLink}
                to="/Login"
                sx={{ borderRadius: 5, ml: 1, backgroundColor: 'white', width: 100 }}>
                ログイン
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
