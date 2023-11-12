import { Container, Box, Avatar, TextField, Button, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../firebase'
import { useEffect } from 'react'
import { onAuthStateChanged, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'
import googleSignInImage from '../assets/google/google_sign_in.png'

const Login = () => {
  const navigate = useNavigate('')
  // ログイン状態かどうかを判定するイベントを発動する
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      //console.log('user = '+user.uid)
      // ログインしている場合、ホームへリダイレクト
      if (user) {
        navigate('/')
      }
    })
  }, [])

  const googleLogin = () => {
    signInWithRedirect(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken

        // The signed-in user info.
        const user = result.user
        // IdP data available using getAdditionalUserInfo(result)
        
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)

        console.log(errorCode)
        console.log(errorMessage)
        console.log(email)
        console.log(credential)
      })
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Box mt={1}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            type="email"
            autoComplete="email"
            autoFocus
            InputProps={{
              sx: { borderRadius: 7 },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="パスワード"
            type="password"
            InputProps={{
              sx: { borderRadius: 7 },
            }}
          />
          <Button
            variant="contained"
            sx={{ width: 150, borderRadius: 5, display: 'flex', margin: '0 auto', mt: 3, mb: 2 }}>
            ログイン
          </Button>
          <Button
            onClick={googleLogin}
            sx={{ borderRadius: 5, display: 'flex', margin: '0 auto' }}
            style={{ padding: 0 }}>
            <img src={googleSignInImage} alt="sign in with google" />
          </Button>
          <Box
            mt={1}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Link>アカウントを作成する</Link>
          </Box>
          <Box
            mt={1}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Link>パスワードを忘れた場合</Link>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
export default Login
