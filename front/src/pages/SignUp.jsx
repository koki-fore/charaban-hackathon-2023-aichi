import { Container, Box, Avatar, TextField, Button, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link as routerLink, useNavigate } from 'react-router-dom'
import { auth, provider } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from 'firebase/auth'
import { useForm } from 'react-hook-form'
import googleSignUpImage from '../assets/google/google_sign_up.png'

const SignUp = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm()

  const onSubmit = (event) => {
    console.log(event.email, event.password)
    createUserWithEmailAndPassword(auth, event.email, event.password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const googleSignUp = () => {
    signInWithRedirect(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken

        // The signed-in user info.
        const user = result.user
        // IdP data available using getAdditionalUserInfo(result)
        console.log(token)
        console.log(user)
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
                  if (getValues('emailConfirm')) {
                    trigger('emailConfirm')
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
            <Button
              type="submit"
              variant="contained"
              sx={{ width: 150, borderRadius: 5, display: 'flex', margin: '0 auto', mt: 3, mb: 2 }}>
              新規登録
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
              <Link to='/Login' component={routerLink} >ログインへ</Link>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  )
}
export default SignUp
