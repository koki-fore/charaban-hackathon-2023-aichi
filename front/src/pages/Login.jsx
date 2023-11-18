import { Container, Box, Avatar, TextField, Button, Link, CircularProgress } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../firebase'
import { Link as routerLink } from 'react-router-dom'
import { useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import googleSignInImage from '../assets/google/google_sign_in.png'
import { useForm } from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'

const Login = () => {
  const navigate = useNavigate('')

  const [showAlert, setShowAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (event) => {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, event.email, event.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        navigate('/')
        setIsLoading(false)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error(errorCode)
        console.error(errorMessage)
        setIsLoading(false)
        setShowAlert(true)
      })
  }

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken

        // The signed-in user info.
        const user = result.user
        // IdP data available using getAdditionalUserInfo(result)
        navigate('/')
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error)
        setShowAlert(true)

        console.error(error)
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
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              required
              {...register('email', { required: true })}
              fullWidth
              id="email"
              label="メールアドレス"
              type="email"
              autoComplete="email"
              autoFocus
              helperText={errors.email && '必須です'}
              error={errors.email && true}
              InputProps={{
                sx: { borderRadius: 7 },
              }}
            />
            <TextField
              margin="normal"
              required
              {...register('password', { required: '必須です' })}
              fullWidth
              id="password"
              label="パスワード"
              type="password"
              helperText={errors.password && errors.password.message}
              error={errors.password && true}
              InputProps={{
                sx: { borderRadius: 7 },
              }}
            />
            {showAlert && (
              <Box sx={{ width: '100%' }}>
                <Collapse in={showAlert}>
                  <Alert
                    severity="error"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setShowAlert(false)
                        }}>
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2, borderRadius: 6 }}>
                    メールアドレスかパスワードに誤りがあります
                  </Alert>
                </Collapse>
              </Box>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{ width: 150, borderRadius: 5, display: 'flex', margin: '0 auto', mt: 3, mb: 2 }}>
              {isLoading ? (
                <>
                  ログイン中
                  <CircularProgress
                    color="grayText"
                    size={24}
                    sx={{ position: 'absolute', inset: 0, margin: 'auto' }}
                  />
                </>
              ) : (
                'ログイン'
              )}
            </Button>
            <Button
              disabled={isLoading}
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
              <Link to="/signup" component={routerLink}>
                アカウントを作成する
              </Link>
            </Box>
            <Box
              mt={1}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Link to="/password-reset" component={routerLink}>
                パスワードを忘れた場合
              </Link>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  )
}
export default Login
