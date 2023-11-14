import {
  Box,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import imageCompression from 'browser-image-compression'

const style = {
  position: 'absolute',
  top: { xs: 0, sm: '50%' },
  left: '50%',
  transform: { xs: 'translate(-50%, 20px)', sm: 'translate(-50%, -50%)' },
  borderRadius: 2,
  width: { xs: '90%', sm: 600 },
  backgroundColor: '#fff',
  py: 3,
  px: 4,
}

const selectedStyle = {
  py: 1,
  px: 2,
  '&.Mui-selected': {
    backgroundColor: 'primary.main',
    color: 'white',
    '&:hover': {
      backgroundColor: 'info.main',
    },
  },
}

export const PostCreateModal = ({ open, closeModal, sx, className }) => {
  const [editState, setEditState] = useState('before')
  const [beforeImageUrl, setBeforeImageUrl] = useState('')
  const [afterImageUrl, setAfterImageUrl] = useState('')
  const { register, handleSubmit, reset } = useForm()

  const toggleEdit = (e) => {
    setEditState(e.target.value)
  }

  const onSubmit = (data) => {
    console.log(data)
  }

  const handleClose = () => {
    closeModal()
    setBeforeImageUrl('')
    setAfterImageUrl('')
    reset()
  }

  return (
    <Modal open={open} onClose={handleClose} sx={sx} className={className}>
      <Stack sx={{ ...style }}>
        <ToggleButtonGroup
          exclusive
          color="primary"
          value={editState}
          onChange={toggleEdit}
          aria-label="toggle edit">
          <ToggleButton value="before" sx={selectedStyle}>
            BEFORE
          </ToggleButton>
          <ToggleButton value="after" sx={selectedStyle}>
            AFTER
          </ToggleButton>
        </ToggleButtonGroup>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContentInput
            beforeOrAfter={'before'}
            register={register}
            sx={{ my: 2, display: editState !== 'before' && 'none' }}
            imageUrl={beforeImageUrl}
            setImageUrl={setBeforeImageUrl}
          />
          <ModalContentInput
            beforeOrAfter={'after'}
            register={register}
            sx={{ my: 2, display: editState !== 'after' && 'none' }}
            imageUrl={afterImageUrl}
            setImageUrl={setAfterImageUrl}
          />
          <Box sx={{ textAlign: 'right' }}>
            <Button type="button" variant="outlined" onClick={handleClose}>
              キャンセル
            </Button>
            <Button type="submit" variant="contained" sx={{ ml: 2 }}>
              投稿
            </Button>
          </Box>
        </form>
      </Stack>
    </Modal>
  )
}
// TODO: 画像のプレビュー機能
const ModalContentInput = ({ beforeOrAfter, register, imageUrl, setImageUrl, sx, className }) => {
  const imageInput = useRef(null)
  const [image, setImage] = useState(null)
  const handleChangeImage = async (e) => {
    const file = e.target.files[0]
    console.log('file', file)
    const options = {
      maxSizeMB: 1,
      useWebWorker: true,
    }
    try {
      const compressedFile = await imageCompression(file, options)
      setImage(compressedFile)
      const fileRader = new FileReader()
      fileRader.onload = () => {
        setImageUrl(fileRader.result)
      }
      fileRader.readAsDataURL(compressedFile)
    } catch (error) {
      console.log(error)
    }
  }

  const { ref, ...rest } = register(`${beforeOrAfter}_picture`, {
    onChange: handleChangeImage,
    required: true,
  })

  return (
    <>
      <Box sx={sx} className={className}>
        <TextField
          multiline
          label={`${beforeOrAfter}のテキスト`}
          placeholder={`${beforeOrAfter}のテキスト`}
          variant="outlined"
          rows={6}
          sx={{ width: '100%', maxHeight: '50vh' }}
          {...register(`${beforeOrAfter}_text`, { required: true })}
        />
        {!imageUrl && (
          <>
            <Stack alignItems="center" sx={{ mt: 2 }}>
              <img
                src="/cloud-arrow-up-solid.svg"
                width={100}
                onClick={() => imageInput.current.click()}
                style={{ cursor: 'pointer' }}
              />
              <Typography
                variant="button"
                color="grayText"
                sx={{ cursor: 'pointer' }}
                onClick={() => imageInput.current.click()}>
                画像をアップロード
              </Typography>
            </Stack>
          </>
        )}
        {imageUrl && (
          <Button type="button" onClick={() => imageInput.current.click()}>
            画像を変更
          </Button>
        )}
        <input
          type="file"
          ref={(e) => {
            ref(e)
            imageInput.current = e
          }}
          {...rest}
          style={{ display: 'none' }}
        />
        <Box
          sx={{
            height: imageUrl && { xs: 250, sm: 400 },
            width: { xs: '90%', sm: 500 },
            mx: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <img
            src={imageUrl}
            style={{
              height: '100%',
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              margin: 'auto',
            }}
          />
        </Box>
      </Box>
    </>
  )
}