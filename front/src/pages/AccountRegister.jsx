import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Typography, Modal } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { getStorage, ref, uploadString, getDownloadURL, uploadBytes } from 'firebase/storage'
import '../styles/AccountRegister.css'
import ReactCrop, { centerCrop, makeAspectCrop, convertToPixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import dayjs from 'dayjs'
import { useAuthContext } from '../context/AuthContext'

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

const AccountRegister = () => {
  const navigate = useNavigate()
  const timestamp = dayjs().format('YYMMDDHHmmss')
  const [profileImage, setProfileImage] = useState('')
  const [fileName, setFileName] = useState('')
  const { authApi } = useAuthContext()

  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage()

  const [completedCrop, setCompletedCrop] = useState(null)
  const [crop, setCrop] = useState()
  const [open, setOpen] = useState(false)
  const imgRef = useRef(null)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm()

  const submit = (data) => {
    const profilePictureRef = ref(storage, 'users/' + timestamp + fileName)
    uploadString(profilePictureRef, profileImage.split(',')[1], 'base64').then(() => {
      // complete updated
      getDownloadURL(profilePictureRef)
        .then((url) => {
          // axiosでユーザー情報を変更
          authApi
            .put('/users/me', {
              screen_name: data.screen_name,
              description: '',
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
    console.log(base64Image)
    handleClose()
  }

  return (
    <Box
      sx={{
        margin: '0 auto',
      }}>
      <form noValidate onSubmit={handleSubmit(submit)}>
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
            {profileImage === '' ? (
              <Typography color={errors.inputImage ? '#d32f2f' : '#666666'}>
                プロフィール写真
              </Typography>
            ) : (
              <img src={profileImage} className="profile-image" alt="プロフィール写真" />
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
          InputProps={{ sx: { borderRadius: 7 } }}
          {...register('screen_name', {
            required: true,
            value: getValues('screen_name'),
          })}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          helperText={errors.screen_name && '必須です'}
          error={errors.screen_name && true}
          id="screen_name"
          label="ユーザーネーム"
          name="screen_name"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: 200, borderRadius: 5, display: 'flex', margin: '0 auto', marginY: 4 }}>
          プロフィール登録
        </Button>
      </form>
    </Box>
  )
}
export default AccountRegister
