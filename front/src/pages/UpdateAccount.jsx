import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Container, Typography } from '@mui/material'
import { storage } from '../firebase'
import { useAuthContext } from '../context/AuthContext'
import { getStorage, ref, uploadString, getDownloadURL, uploadBytes } from 'firebase/storage'
import dayjs from 'dayjs'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import axios from 'axios'

/**
 * @typedef {Object} Account
 * @property {string} screen_name
 * @property {string} email
 * @property {string} profile_picture_path
 * @property {string} description
 */

const UpdateAccount = () => {
  /** @type { Account } */
  const {register, handleSubmit, getValues} = useForm({
    screen_name: '',
    email: '',
    profile_picture_path: '',
    description: ''
  })
  const [userInfo, setUserInfo] = useState([])
  // ユーザーのプロフィール写真のURLを入れる状態変数
  const [userPhotoFileName, setUserPhotoFileName] = useState('')
  // 新しくアップロードされた写真のファイルを入れる状態変数  
  const [newUserPhotoFile, setNewUserPhotoFile] = useState(null)
  const navigate = useNavigate()
  const { user, authApi } = useAuthContext()
  const timestamp = dayjs().format('YYMMDDHHmmss')
  const URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchUser = () => {
      axios.get("/users/me", {
        headers: {
          Authorization: 'Bearer ' + user.accessToken
        }
      }).
      then( (user) => {
          setUserInfo(user)
      }).catch((error) => {
          console.log(error)
      })
    }
    if (user) fetchUser()
  }, [])

  const submit = (data) => {
    const profilePictureRef = ref(storage, 'users/' + timestamp + userPhotoFileName)
    uploadString(profilePictureRef, newUserPhotoFile.split(',')[1], 'base64').then(() => {
      // complete updated
      getDownloadURL(profilePictureRef)
        .then((url) => {
          // axiosでユーザー情報を変更
          authApi
            .put('/users/me', {
              screen_name: data.screen_name,
              description: data.description,
              profile_picture_path: url,
            })
            .then(() => {
              navigate('/')
            })
            .catch((e) => {
              console.error(e)
            })
        })
        .catch((e) => {
          console.error(e)
        })
    })
  }

  const handleUploadingFile = (picture) => {
    try {
      if (!picture.target.files || picture.target.files.length === 0) {
        throw new Error("You must select an image to upload.")
      }
      // 写真のデータそのものを取り出す。
      const file = picture.target.files[0]
      setNewUserPhotoFile(file)
      setUserPhotoFileName(file.name)
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
        { userPhotoFileName === '' ?
          <Box>
            <label htmlFor='newUserPhoto'>
              <AddPhotoAlternateIcon sx={{width:200, height:200}} />
            </label>
            <input
              style={{display: 'none'}}
              type="file" 
              id="newUserPhoto"
              accept="image/*"
              onChange={handleUploadingFile}
            />
            <Typography variant='body1'>↑プロフィール写真を登録</Typography>
          </Box>
          :
          <Box sx={{position: 'relative'}}>
            <Box
              component='img'
              id='profile_picture_path'
              src={newUserPhotoFile === null ? userPhotoFileName : URL.createObjectURL(newUserPhotoFile)}
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
              onChange={handleUploadingFile}
            />
          </Box>
        }
        <TextField
          sx={{'.MuiOutlinedInput-root': { borderRadius: '18px' }}}
          {...register("screen_name", {
            required: true,
            value: getValues("screen_name")
          })}
          variant="outlined"
          margin="normal"
          fullWidth
          id="screen_name"
          label="ユーザーネーム"
          name="screen_name"
          defaultValue={userInfo.screen_name}
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
          defaultValue={userInfo.email}
        />
        <TextField
          sx={{'.MuiOutlinedInput-root': { borderRadius: '18px' }}}
          {...register("description", {
            required: true,
            value: getValues("description")
          })}
          multiline
          minRows="3"
          variant="outlined"
          margin="normal"
          fullWidth
          id="description"
          label="自己紹介"
          name="description"
          defaultValue={userInfo.description}
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

export default UpdateAccount
