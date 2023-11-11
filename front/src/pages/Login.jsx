import { Container, Box, Avatar, TextField, Button, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const Login = () => {
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
