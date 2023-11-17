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
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext'

export const Header = ({ sx }) => {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [userInfo, setUserInfo] = React.useState()
  const URL = import.meta.env.VITE_API_URL

  React.useEffect(() => {
    if (!user) return
    console.log('axios')
    console.log(user.accessToken)
    axios
      .get(URL + '/users/me', { headers: { Authorization: 'Bearer ' + user.accessToken } })
      .then((res) => {
        console.log(res)
        setUserInfo(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [user])

  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const logout = () => {
    auth.signOut()
    return navigate('/')
  }

  return (
    <AppBar position="static" sx={{ ...sx, backgroundColor: 'bgSky' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo} alt="logo" />

          <Box sx={{ flexGrow: 1, display: 'flex' }}></Box>
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Avatar" src={userInfo ? userInfo.profile_picture_path : ''} />
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
                <MenuItem
                  key="Profile"
                  onClick={() => {
                    handleCloseUserMenu()
                    navigate('/user-profile')
                  }}>
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
                to="/signup"
                sx={{ borderRadius: 5, mr: 1, width: 100 }}>
                新規登録
              </Button>
              <Button
                variant="text"
                component={routerLink}
                to="/login"
                sx={{
                  borderRadius: 5,
                  ml: 1,
                  backgroundColor: 'white',
                  width: 100,
                  '&:hover': { backgroundColor: '#d1d1d1' },
                }}>
                ログイン
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
