import { Header, PostCard, PostCreateModal } from '../components'
import { useState } from 'react'

const Top = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Header sx={{ position: 'sticky', top: 0, zIndex: 999 }} />
      <button type="button" onClick={() => setOpen(true)}>
        debug
      </button>
      <PostCard sx={{ my: 1 }} />
      <PostCard sx={{ my: 1 }} />
      <PostCard sx={{ my: 1 }} />
      <PostCard sx={{ my: 1 }} />
      <PostCreateModal open={open} closeModal={() => setOpen(false)} />
    </>
  )
}

export default Top
