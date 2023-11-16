import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import '../styles/AccountRegister.css'

const AccountRegister = () => {
  const navigate = useNavigate()

  const [profileImage, setProfileImage] = useState('')

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
    setProfileImage(window.URL.createObjectURL(fileObject))
  }

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm()

  const submit = () => {
    console.log('submit')
    // TODO: axiosでuserのput処理記述
    navigate('/login')
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
