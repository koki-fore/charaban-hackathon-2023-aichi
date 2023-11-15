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
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

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
  const [beforeImage, setBeforeImage] = useState(null)
  const [afterImage, setAfterImage] = useState(null)
  const [beforeDownloadUrl, setBeforeDownloadUrl] = useState('')
  const [afterDownloadUrl, setAfterDownloadUrl] = useState('')
  const { register, handleSubmit, reset } = useForm()

  const toggleEdit = (e) => {
    setEditState(e.target.value)
  }

  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage()

  // Create a storage reference from our storage service
  const postsRef = ref(storage, 'posts')

  const getUploadBytes = async (beforePictureRef, beforeImage, suffix) => {
    await uploadBytes(beforePictureRef, beforeImage)
    return getDownloadURL(beforePictureRef, 'posts/' + beforePictureRef.name + suffix)
  }

  const onSubmit = (data) => {
    console.log(data)
    // Child references can also take paths delimited by '/'
    const beforePictureRef = ref(storage, 'posts/' + beforeImage.name + '.before')
    const afterPictureRef = ref(storage, 'posts/' + afterImage.name + '.after')
    Promise.all([
      getUploadBytes(beforePictureRef, beforeImage, '.before'),
      getUploadBytes(afterPictureRef, afterImage, '.after'),
    ]).then(([beforeUrl, afterUrl]) => {
      console.log(beforeUrl, afterUrl)
      // TODO: axiosでPosts
    })
  }

  const handleClose = () => {
    closeModal()
    setBeforeImage(null)
    setAfterImage(null)
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
            setImage={setBeforeImage}
          />
          <ModalContentInput
            beforeOrAfter={'after'}
            register={register}
            sx={{ my: 2, display: editState !== 'after' && 'none' }}
            setImage={setAfterImage}
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

const ModalContentInput = ({ beforeOrAfter, register, setImage, sx, className }) => {
  const imageInput = useRef(null)
  const [imageUrl, setImageUrl] = useState(null)
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
          {...register(`${beforeOrAfter}_text`)}
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
