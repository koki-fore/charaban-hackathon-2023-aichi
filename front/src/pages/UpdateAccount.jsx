import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Container, Typography } from '@mui/material'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'

/**
 * @typedef {Object} Account
 * @property {string} username
 * @property {string} email
 * @property {string} photoURL
 * @property {string} introduction
 */

const UpdateAccount = () => {
  /** @type { Account } */
  const {register, handleSubmit, getValues, setValue} = useForm({
    username: '',
    email: '',
    photoURL: '',
    introduction: ''
  })

  // ユーザーのプロフィール写真のURLを入れる状態変数
  const [userPhotoURL, setUserPhotoURL] = useState('')
  // 新しくアップロードされた写真のオブジェクトURLを入れる状態変数  
  const [newUserPhotoObjectURL, setNewUserPhotoObjectURL] = useState('')

  const navigate = useNavigate()

  const dummy = {
    username: "hiro-creater",
    email: 'h-sasaki@safie.jp',
    // photoURL: '',
    photoURL: "https://www.trans.co.jp/column/knowledge/ai_image_generator/img/ai_image_generator_01.jpg",
    introduction: "こんにちは、よろしくおねがいします。"
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        /** @type { Account } */
        const data = dummy
        
        setValue('username', data.username)
        setValue('email', data.email)
        setValue('introduction', data.introduction)

        setUserPhotoURL(data.photoURL)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const submit = async (value) => {
    // TODO: 写真はどのように保存されるのかを話し合うこと
  }

  const handleUploadingFile = (picture) => {
    try {
      if (!picture.target.files || picture.target.files.length === 0) {
        throw new Error("You must select an image to upload.")
      }
      // 写真のデータそのものを取り出す。
      const file = picture.target.files[0]
      setNewUserPhotoObjectURL(URL.createObjectURL(file))
      setUserPhotoURL(file.name)
    } catch (error) {
      console.log("Error uploading your profile image")
      console.log(error.error_description || error.message)
      // TODO: ユーザーは、エラーが発生したときに、運営側に問い合わせるのか？
      alert("プロフィール写真のアップロードに失敗しました。")
    }
  }


  return (
    <Container component="main" maxWidth="sm" sx={{marginTop: 5}} >
      <form onSubmit={handleSubmit(submit)}>
        { userPhotoURL === '' ?
          <Box>
            <label htmlFor='newUserPhoto'>
              <AddPhotoAlternateIcon sx={{width:200, height:200}} />
            </label>
            <input
              style={{display: 'none'}}
              type="file" 
              id="newUserPhoto"
              accept="image/*"
              // TODO: アップロードされた写真データを保存、表示するためにはどうすればいいか、考えること
              onChange={handleUploadingFile}
            />
            <Typography variant='body1'>↑プロフィール写真を登録</Typography>
          </Box>
          :
          <Box sx={{position: 'relative'}}>
            <Box
              component='img'
              id='photoURL'
              src={newUserPhotoObjectURL === '' ? userPhotoURL : newUserPhotoObjectURL}
              alt="プロフィール画像"
              // TODO: プロフィール写真のサイズは予め決められているのか？
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
              // TODO: 更新された写真データを保存、表示するためにはどうすればいいか、考えること
              onChange={handleUploadingFile}
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
          sx={{backgroundColor:'#F0F', borderRadius:5, marginY:2}}
          // TODO: パスに関してはあとで聞くこと
          onClick={() => {navigate("/change_password")}}
        >
          パスワード変更
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{borderRadius:5, marginY:8}}
        >
          セーブ
        </Button>
      </form>
    </Container>
  )
}

export default UpdateAccount;
