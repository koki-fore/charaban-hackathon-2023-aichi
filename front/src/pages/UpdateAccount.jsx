import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, TextField, Button, Container, Typography, InputLabel } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const UpdateAccount = () => {
  const [newUserPhotoObjectURL, setNewUserPhotoObjectURL] = useState('')
  const {register, handleSubmit, watch, reset, errors, getValues, setValue} = useForm({
    username: '',
    email: '',
    photoURL: '',
    introduction: '',
  })

  const theme = createTheme({
    palette: {
      my: {
        main: '#FFF',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
    },
  });

  const dummy = {
    username: "hiro-creater",
    email: 'h-sasaki@safie.jp',
    photoURL: "https://www.trans.co.jp/column/knowledge/ai_image_generator/img/ai_image_generator_01.jpg",
    introduction: "こんにちは、よろしくおねがいします。"
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // データを取得する処理（例：APIからデータを取得）
        // const data = await fetchDataFromAPI()
        const data = dummy

        setValue('username', data.username)
        setValue('email', data.email)
        setValue('photoURL', data.photoURL)
        setValue('introduction', data.introduction)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const submit = async (data) => {
    console.log('Updating account information:', data) 
  }


  return (
    <Container component="main" maxWidth="sm" sx={{marginTop: 5}} >
      <form onSubmit={handleSubmit(submit)}>
        { getValues("photoURL") === '' ?
          <Box>
            <label htmlFor='newUserPhoto'>
              <AddPhotoAlternateIcon sx={{width:200, height:200}} />
            </label>
            <input
              style={{display: 'none'}}
              type="file" 
              id="newUserPhoto"
              accept="image/*"
              onChange={setNewUserPhotoObjectURL}
            />
            <Typography variant='body1'>↑プロフィール写真を登録</Typography>
          </Box>
          :
          <Box sx={{position: 'relative'}}>
            <Box
              component='img'
              id='photoURL'
              src={ newUserPhotoObjectURL === '' ? getValues("photoURL") : newUserPhotoObjectURL}
              alt="プロフィール画像"
              sx={{width: '50%'}}  
            />
            <label htmlFor='updateUserPhoto'>
              <InsertPhotoIcon 
                sx={{width: '10%', height:'30%', position: 'absolute', bottom: '0%', right: '50%', color: '#000', backgroundColor: '#D3D3D3'}}
              />
            </label>
            <input
              style={{display: 'none'}}
              type="file" 
              id="updateUserPhoto"
              accept="image/*"
              onChange={setNewUserPhotoObjectURL}
            />
          </Box>
        }

        <TextField
          sx={{'.MuiOutlinedInput-root': { borderRadius: '18px' }}}
          {...register("username", {
            required: true,
            value: getValues("username")
          })}
          variant="outlined"
          margin="normal"
          fullWidth
          id="username"
          label="ユーザーネーム"
          name="username"
        />
        <TextField
          sx={{'.MuiOutlinedInput-root': { borderRadius: '18px' }}}
          {...register("email", {
            required: true,
            value: getValues("email")
          })}
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="メールアドレス"
          name="email"
        />
        <TextField
          sx={{'.MuiOutlinedInput-root': { borderRadius: '18px' }}}
          {...register("introduction", {
            required: true,
            value: getValues("introduction")
          })}
          multiline
          minRows="3"
          variant="outlined"
          margin="normal"
          fullWidth
          id="introduction"
          label="自己紹介"
          name="introduction"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{borderRadius:5, marginY:5}}
        >
          セーブ
        </Button>
      </form>
    </Container>
  )
}

export default UpdateAccount;
