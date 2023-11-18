import { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Modal,
  CircularProgress,
  Collapse,
  Alert,
  IconButton,
} from '@mui/material'
import { useAuthContext } from '../context/AuthContext'
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage'
import dayjs from 'dayjs'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import axios from 'axios'

import '../styles/AccountRegister.css'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

/**
 * @typedef {Object} Account
 * @property {string} screen_name
 * @property {string} email
 * @property {string} profile_picture_path
 * @property {string} description
 */

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  minWidth: '300px',
  boxShadow: 24,
  p: 2,
}

const UpdateAccount = () => {
  /** @type { Account } */
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    screen_name: '',
    email: '',
    profile_picture_path: '',
    description: '',
  })
  const navigate = useNavigate()
  const { user, authApi } = useAuthContext()
  const timestamp = dayjs().format('YYMMDDHHmmss')
  const [profileImage, setProfileImage] = useState('')
  const [fileName, setFileName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [completedCrop, setCompletedCrop] = useState(null)
  const [crop, setCrop] = useState()
  const [open, setOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const imgRef = useRef(null)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (!user) return
    const fetchUser = () => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/me`, {
          headers: {
            Authorization: 'Bearer ' + user.accessToken,
          },
        })
        .then((res) => {
          const user = res.data
          setValue('screen_name', user.screen_name)
          setValue('profile_picture_path', user.profile_picture_path)
          setValue('description', user.description)
        })
        .catch((error) => {
          console.error(error)
        })
    }
    if (user) fetchUser()
  }, [user])

  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage()

  const inputFileChange = (event) => {
    if (!event.target.files) {
      return
    }
    // ファイル選択時にキャンセルしたとき写真を削除する
    if (!event.target.files.length) {
      setProfileImage('')
      return
    }
    const fileObject = event.target.files[0]
    setFileName(fileObject.name)
    setProfileImage(window.URL.createObjectURL(fileObject))
    handleOpen()
  }

  const submit = (data) => {
    setIsLoading(true)
    const profilePictureRef = ref(storage, 'users/' + timestamp + fileName)
    uploadString(profilePictureRef, profileImage.split(',')[1], 'base64').then(() => {
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
              setIsLoading(false)
            })
            .catch((e) => {
              console.error(e)
              setIsLoading(false)
              setShowAlert(true)
            })
        })
        .catch((e) => {
          console.error(e)
          setIsLoading(false)
          setShowAlert(true)
        })
    })
  }

  const aspectCrop = (mediaWidth, mediaHeight) => {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    )
  }

  const onImageLoad = (image) => {
    setCrop(aspectCrop(image.width, image.height))
    const size = Math.min(image.width, image.height)
    setCompletedCrop({ x: 0, y: 0, width: size, height: size, unit: 'px' })
  }

  const applyCrop = () => {
    const canvas = document.createElement('canvas')
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height
    canvas.width = completedCrop.width
    canvas.height = completedCrop.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height,
    )
    const base64Image = canvas.toDataURL('image/jpeg')
    setProfileImage(base64Image)
    handleClose()
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: 5 }}>
      <IconButton sx={{ mt: 1, ml: 1 }} onClick={() => navigate('/')}>
        <ArrowBackIcon />
      </IconButton>
      <form onSubmit={handleSubmit(submit)}>
        <Box
          sx={{
            position: 'relative',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <label
            htmlFor="input-image"
            className={errors.inputImage ? 'image-input-error' : 'image-input'}>
            <AddCircleIcon fontSize="large" sx={{ position: 'absolute', top: 5, right: 5 }} />
            {/* {profileImage === '' ? (
              <Typography color={errors.inputImage ? '#d32f2f' : '#666666'}>
                プロフィール写真
              </Typography>
            ) : (
              <img
                src={getValues('profile_picture_path')}
                className="profile-image"
                alt="プロフィール写真"
              />
            )} */}
            {profileImage ? (
              <img src={profileImage} className="profile-image" alt="プロフィール写真" />
            ) : watch('profile_picture_path') ? (
              <img
                src={getValues('profile_picture_path')}
                className="profile-image"
                alt="プロフィール写真"
              />
            ) : (
              <Typography color={errors.inputImage ? '#d32f2f' : '#666666'}>
                プロフィール写真
              </Typography>
            )}
          </label>
          <input
            type="file"
            hidden
            accept="image/*"
            id="input-image"
            {...register('inputImage')}
            onChange={(event) => {
              register('inputImage').onChange(event)
              inputFileChange(event)
            }}
          />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <ReactCrop
                crop={crop}
                aspect={1}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}>
                <img ref={imgRef} src={profileImage} onLoad={onImageLoad} />
              </ReactCrop>
              <Button onClick={() => applyCrop()}>適用する</Button>
            </Box>
          </Modal>
        </Box>
        <TextField
          sx={{ '.MuiOutlinedInput-root': { borderRadius: '18px' } }}
          {...register('screen_name', {
            required: true,
            value: getValues('screen_name'),
          })}
          variant="outlined"
          margin="normal"
          fullWidth
          id="screen_name"
          label="ユーザーネーム"
          defaultValue=" "
          name="screen_name"
        />
        {/* <TextField
          sx={{ '.MuiOutlinedInput-root': { borderRadius: '18px' } }}
          {...register('email', {
            required: true,
            value: getValues('email'),
          })}
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="メールアドレス"
          name="email"
          defaultValue=" "
        /> */}
        <TextField
          sx={{ '.MuiOutlinedInput-root': { borderRadius: '18px' } }}
          {...register('description', {
            required: true,
            value: getValues('description'),
          })}
          multiline
          minRows="3"
          variant="outlined"
          margin="normal"
          fullWidth
          id="description"
          label="自己紹介"
          name="description"
          defaultValue=" "
        />
        {/* <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ backgroundColor: '#F0F', borderRadius: 5, marginY: 2 }}
          // TODO: パスに関してはあとで聞くこと
          onClick={() => {
            navigate('/change_password')
          }}>
          パスワード変更
        </Button> */}
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
                プロフィール登録に失敗しました
              </Alert>
            </Collapse>
          </Box>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          sx={{ width: 200, borderRadius: 5, display: 'flex', margin: '0 auto', marginY: 4 }}>
          {isLoading ? (
            <>
              プロフィール登録中
              <CircularProgress
                color="grayText"
                size={24}
                sx={{ position: 'absolute', inset: 0, margin: 'auto' }}
              />
            </>
          ) : (
            'プロフィール登録'
          )}
        </Button>
      </form>
    </Container>
  )
}

export default UpdateAccount
