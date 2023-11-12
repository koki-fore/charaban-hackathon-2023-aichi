import { Header, PostCard, PostCreateModal } from '../components'
import { Fab } from '@mui/material'
import { useState } from 'react'

const Top = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Header sx={{ position: 'sticky', top: 0, zIndex: 999 }} />
      <PostCard sx={{ my: 1 }} />
      <PostCard sx={{ my: 1 }} />
      <PostCard sx={{ my: 1 }} />
      <PostCard sx={{ my: 1 }} />
      <PostCreateModal open={open} closeModal={() => setOpen(false)} />
      <Fab
        color="primary"
        size="small"
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          left: { xs: '', sm: 'calc(50vw + 320px)' },
          right: { xs: 10, sm: '' },
          bottom: 20,
          fontSize: 24,
        }}>
        +
      </Fab>
    </>
  )
}

export default Top
