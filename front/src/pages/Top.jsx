import { Header, PostCard, PostCreateModal } from '../components'
import { Fab } from '@mui/material'
import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'

const Top = () => {
  const [open, setOpen] = useState(false)
  const { user } = useAuthContext()

  return (
    <>
      <Header sx={{ position: 'sticky', top: 0, zIndex: 999 }} />
      <PostCard sx={{ my: 1 }} />
      <PostCard sx={{ my: 1 }} />
      <PostCard sx={{ my: 1 }} />
      <PostCard sx={{ my: 1 }} />
      {user && <>
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
      </>}
    </>
  )
}

export default Top
