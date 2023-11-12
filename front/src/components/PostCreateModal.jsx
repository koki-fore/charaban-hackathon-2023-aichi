import {
  Box,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Stack,
  TextField,
} from '@mui/material'
import { MuiFileInput } from 'mui-file-input'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

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
  const { register, control, handleSubmit } = useForm()

  const toggleEdit = (e) => {
    setEditState(e.target.value)
  }

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Modal open={open} onClose={closeModal} sx={sx} className={className}>
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
        {editState === 'before' && (
          <ModalContentInput
            beforeOrAfter={'before'}
            register={register}
            control={control}
            sx={{ my: 2 }}
          />
        )}
        {editState === 'after' && (
          <ModalContentInput
            beforeOrAfter={'after'}
            register={register}
            control={control}
            sx={{ my: 2 }}
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ textAlign: 'right' }}>
            <Button type="Button" variant="outlined" onClick={closeModal}>
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
const ModalContentInput = ({ beforeOrAfter, register, control, sx, className }) => {
  const [image, setImage] = useState(null)
  const handleChangeImage = (file) => {
    setImage(file)
  }

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
        <Controller
          name={`${beforeOrAfter}_picture`}
          control={control}
          render={({ field, fieldState }) => (
            <MuiFileInput
              sx={{ mt: 2 }}
              {...field}
              onChange={handleChangeImage}
              value={image}
              helperText={fieldState.invalid ? 'File is invalid' : ''}
              error={fieldState.invalid}
            />
          )}
        />
      </Box>
    </>
  )
}
