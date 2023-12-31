import { Container, Box, Avatar, TextField, Button, Link, CircularProgress } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link as routerLink } from 'react-router-dom'
import { auth, provider } from '../firebase'
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import googleSignUpImage from '../assets/google/google_sign_up.png'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import AccountRegister from './AccountRegister'
import { api } from '../util/axios'

const SignUp = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm()

  const onSubmit = (event) => {
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, event.email, event.password)
      .then((userCredential) => {
        const user = userCredential.user
        api
          .post('/users', {
            firebase_id: user.uid,
            screen_name: '名無しさん',
            description: '',
            profile_picture_path: '',
          })
          .then((res) => {
            setIsSignUp(true)
            setIsLoading(false)
          })
          .catch((error) => {
            console.error(error)
            setShowAlert(true)
            setIsLoading(false)
          })
      })
      .catch((error) => {
        console.error(error)
        setShowAlert(true)
        setIsLoading(false)
      })
  }

  const googleSignUp = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        // IdP data available using getAdditionalUserInfo(result)
        console.info(token)
        console.info(user)

        api
          .post('/users', {
            firebase_id: user.uid,
            screen_name: '名無しさん',
            description: '',
            profile_picture_path: '',
          })
          .then(() => {
            setIsSignUp(true)
          })
          .catch((error) => {
            console.error(error)
          })
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)

        console.error(errorCode)
        console.error(errorMessage)
        console.error(email)
        console.error(credential)
      })
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
      {isSignUp ? (
        <AccountRegister />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box>
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
                {...register('password', {
                  required: '必須です',
                  onBlur: () => {
                    if (getValues('passwordConfirm')) {
                      trigger('passwordConfirm')
                    }
                  },
                  minLength: {
                    value: 8,
                    message: '8文字以上入力してください',
                  },
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*[1-9])[a-zA-Z0-9!-?./#%$+=_^(){};:'"<>~`@]/,
                    message: 'アルファベットと数字をそれぞれ1つは含むようにしてください',
                  },
                })}
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
              <TextField
                margin="normal"
                required
                {...register('passwordConfirm', {
                  required: '必須です',
                  validate: (value) => {
                    return value === getValues('password') || 'パスワードが一致しません'
                  },
                })}
                fullWidth
                id="passwordConfirm"
                label="パスワード（確認）"
                type="password"
                helperText={errors.passwordConfirm && errors.passwordConfirm.message}
                error={errors.passwordConfirm && true}
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
                      すでにそのメールアドレスは登録されています
                    </Alert>
                  </Collapse>
                </Box>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{
                  width: 150,
                  borderRadius: 5,
                  display: 'flex',
                  margin: '0 auto',
                  mt: 3,
                  mb: 2,
                }}>
                {isLoading ? (
                  <>
                    新規登録中
                    <CircularProgress
                      color="grayText"
                      size={24}
                      sx={{ position: 'absolute', inset: 0, margin: 'auto' }}
                    />
                  </>
                ) : (
                  '新規登録'
                )}
              </Button>
              <Button
                onClick={googleSignUp}
                sx={{ borderRadius: 5, display: 'flex', margin: '0 auto' }}
                style={{ padding: 0 }}>
                <img src={googleSignUpImage} alt="sign up with google" />
              </Button>
              <Box
                mt={1}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <Link to="/login" component={routerLink}>
                  ログインへ
                </Link>
              </Box>
            </form>
          </Box>
        </Box>
      )}
    </Container>
  )
}
export default SignUp
