import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Container, Typography } from '@mui/material'
import { database, storage } from '../firebase'
import { useAuthContext } from '../context/AuthContext'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'

/**
 * @typedef {Object} Account
 * @property {string} screen_name
 * @property {string} email
 * @property {string} profile_picture_path
 * @property {string} description
 */

const UpdateAccount = () => {
  /** @type { Account } */
  const {register, handleSubmit, getValues, setValue} = useForm({
    screen_name: '',
    email: '',
    profile_picture_path: '',
    description: ''
  })

  const { user } = useAuthContext()

  const [userData, setUserData] = useState([])
  // ユーザーのプロフィール写真のURLを入れる状態変数
  const [userPhotoURL, setUserPhotoURL] = useState('')
  // 新しくアップロードされた写真のファイルを入れる状態変数  
  const [newUserPhotoFile, setNewUserPhotoFile] = useState(null)

  const navigate = useNavigate()

  const dummy = {
    screen_name: "hiro-creater",
    email: 'h-sasaki@safie.jp',
    // profile_picture_path: '',
    profile_picture_path: "https://www.trans.co.jp/column/knowledge/ai_image_generator/img/ai_image_generator_01.jpg",
    description: "こんにちは、よろしくおねがいします。"
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user);
        // const dataRef = database.ref('users');
        // dataRef.get('value')
        //   .then((snapshot) => {
        //     // snapshot.val() で実際のデータを取得
        //     setUserData(snapshot.val())
        //   })
        //   .catch((error) => {
        //     console.error('データの取得中にエラーが発生しました:', error);
        //   });
        
        // setValue('screen_name', userData.screen_name)
        // setValue('email', userData.email)
        // setValue('description', userData.description)

        // setUserPhotoURL(userData.profile_picture_path)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const sendPhoto2Firebase = () => {
    const uploadTask = storage.put(newUserPhotoFile)
    uploadTask.on('state_changed',
      (snapShot) => {
        console.log(snapShot)
      },
      (err) => {
        console.log(err)
      },
      () => {
        storage.ref('images').child(newUserPhotoFile.name).getDownloadURL()
          .then((fireBaseUrl) => {
            console.log(fireBaseUrl)
            return fireBaseUrl
          })
      }
    )
  }

  const submit = async (value) => {
    if (newUserPhotoFile !== null) setValue("profile_picture_path", sendPhoto2Firebase())
    console.log(value);

    // const dataRef = database.ref('yourDataPath');

    // データを送信
    // dataRef.set(data)
    //   .then(() => {
    //     console.log('データが正常に送信されました。');
    //   })
    //   .catch((error) => {
    //     console.error('データの送信中にエラーが発生しました:', error);
    //   });
  }

  const handleUploadingFile = (picture) => {
    try {
      if (!picture.target.files || picture.target.files.length === 0) {
        throw new Error("You must select an image to upload.")
      }
      // 写真のデータそのものを取り出す。
      const file = picture.target.files[0]
      setNewUserPhotoFile(file)
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
              onChange={handleUploadingFile}
            />
            <Typography variant='body1'>↑プロフィール写真を登録</Typography>
          </Box>
          :
          <Box sx={{position: 'relative'}}>
            <Box
              component='img'
              id='profile_picture_path'
              src={newUserPhotoFile === null ? userPhotoURL : URL.createObjectURL(newUserPhotoFile)}
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
