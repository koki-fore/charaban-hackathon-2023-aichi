import { useState, useEffect } from 'react'
import { Box, Container, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        // axiosでユーザーの情報を取得し、状態変数accountInfoに入れる
        
    }, [])

    return (
        <Container component="main" maxWidth="sm" sx={{ marginTop: 5 }} >
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Box
                    component='img'
                    // src={}
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
            {/* <Typography variant='h6'>{accountInfo.username}</Typography> */}
            <Typography variant='body1'>自己紹介：</Typography>
            {/* <Typography variant='h6'>{accountInfo.introduction}</Typography> */}
        </Container>
    )
}

export default UserProfile;