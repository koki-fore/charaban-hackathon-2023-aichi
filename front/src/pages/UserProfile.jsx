import { useState, useEffect } from 'react'
import { Box, Container, Button, Typography, Grid } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { api } from '../util/axios'

const UserProfile = () => {
  const navigate = useNavigate()
  const { userId } = useParams()
  const { user } = useAuthContext()
  const [userInfo, setUserInfo] = useState()

  const fetchUser = () => {
    api
      .get(`/users/${userId}`)
      .then((res) => {
        const user = res.data
        setUserInfo(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (!user) return
    fetchUser()
  }, [user])

  return (
    userInfo && (
      <Container component="main" maxWidth="sm" sx={{ marginTop: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Box
            component="img"
            // src={userInfo.profile_picture_path}
            src=""
            alt="プロフィール画像"
            sx={{ width: '50%' }}
          />
          <Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ width: '50%', borderRadius: 5 }}
              onClick={() => {
                navigate('/updateAccount')
              }}>
              編集
            </Button>
          </Box>
        </Box>
        <Grid container alignItems="center">
          <Typography variant="body1">ユーザー名：</Typography>
          <Typography variant="h6">{userInfo.screen_name}</Typography>
        </Grid>
        <Grid container alignItems="center">
          <Typography variant="body1">自己紹介：</Typography>
          <Typography variant="h6">{userInfo.description}</Typography>
        </Grid>
      </Container>
    )
  )
}

export default UserProfile
