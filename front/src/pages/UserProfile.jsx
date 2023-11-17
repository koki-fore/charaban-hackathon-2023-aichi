import { useState, useEffect } from 'react'
import { Box, Container, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const UserProfile = () => {
    const navigate = useNavigate()
    const { authApi } = useAuthContext()
    const [userInfo, setUserInfo] = useState()

    useEffect(() => {
        const fetchUser = () => {
            authApi.get("/users/me").
            then( (user) => {
                setUserInfo(user)
            }).catch((error) => {
                console.log(error)
            })
        }
        fetchUser()
    }, [])

    return (
        <Container component="main" maxWidth="sm" sx={{ marginTop: 5 }} >
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Box
                    component='img'
                    // src={userInfo.profile_picture_path}
                    src=''
                    alt="プロフィール画像"
                    sx={{width: '50%'}}
                />
                <Box>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{width: '50%', borderRadius: 5}}
                        onClick={()=>{navigate("/updateAccount")}}
                    >
                    編集
                    </Button>
                </Box>
            </Box>
            <Typography variant='body1'>ユーザー名：</Typography>
            <Typography variant='h6'>{userInfo.screen_name}</Typography>
            <Typography variant='body1'>自己紹介：</Typography>
            <Typography variant='h6'>{userInfo.description}</Typography>
        </Container>
    )
}

export default UserProfile;