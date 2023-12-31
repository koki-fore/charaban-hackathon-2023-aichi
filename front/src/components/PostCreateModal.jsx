import {
  Box,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material'
import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import imageCompression from 'browser-image-compression'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useAuthContext } from '../context/AuthContext'
import dayjs from 'dayjs'

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

export const PostCreateModal = ({ open, closeModal, sx, className, fetchPosts }) => {
  const { authApi } = useAuthContext()
  const [editState, setEditState] = useState('before')
  const [beforeImage, setBeforeImage] = useState(null)
  const [afterImage, setAfterImage] = useState(null)
  const { register, handleSubmit, reset } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const timestamp = dayjs().format('YYMMDDHHmmss')

  const toggleEdit = (e) => {
    setEditState(e.target.value)
  }

  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage()

  const getUploadBytes = async (pictureRef, image, suffix) => {
    await uploadBytes(pictureRef, image)
    return getDownloadURL(pictureRef, 'posts/' + timestamp + pictureRef.name + suffix)
  }

  const onSubmit = (data) => {
    setIsLoading(true)
    data = {
      ...data,
      before_text: data.before_text.replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;'),
      after_text: data.after_text.replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;'),
    }
    // Child references can also take paths delimited by '/'
    const beforePictureRef = ref(storage, 'posts/' + timestamp + beforeImage.name + '.before')
    const afterPictureRef = ref(storage, 'posts/' + timestamp + afterImage.name + '.after')
    // Promise.allを使って並行処理と同期処理を同時に行う
    Promise.all([
      getUploadBytes(beforePictureRef, beforeImage, '.before'),
      getUploadBytes(afterPictureRef, afterImage, '.after'),
    ])
      .then(([beforeUrl, afterUrl]) => {
        console.info('imageurl', beforeUrl, afterUrl)
        return authApi.post('/posts', {
          ...data,
          before_picture_path: beforeUrl,
          after_picture_path: afterUrl,
        })
      })
      .then(() => {
        closeModal()
      })
      .finally(() => {
        setIsLoading(false)
        fetchPosts()
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
      <Stack sx={{ ...style, maxHeight: '90svh', overflowY: 'auto' }}>
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
            <Button type="button" variant="outlined" onClick={handleClose} sx={{ borderRadius: 6 }}>
              キャンセル
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ ml: 2, borderRadius: 6 }}
              disabled={isLoading}>
              {isLoading ? (
                <>
                  投稿中
                  <CircularProgress
                    color="grayText"
                    size={24}
                    sx={{ position: 'absolute', inset: 0, margin: 'auto' }}
                  />
                </>
              ) : (
                '投稿'
              )}
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
  const [isLoading, setIsLoading] = useState(false)
  const handleChangeImage = async (e) => {
    setIsLoading(true)
    const file = e.target.files[0]
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
      setIsLoading(false)
    } catch (error) {
      console.error(error)
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
          rows={4}
          sx={{ width: '100%', maxHeight: '50vh' }}
          {...register(`${beforeOrAfter}_text`)}
        />
        {!imageUrl && !isLoading && (
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
        {isLoading && <CircularProgress color="grayText" sx={{ margin: 'auto' }} />}
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
            height: imageUrl && { xs: 250, sm: 300 },
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
