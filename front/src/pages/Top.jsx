import { Header, PostCard, PostCreateModal } from '../components'
import { Fab } from '@mui/material'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { api } from '../util/axios'

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} screen_name
 * @property {string} profile_picture_path
 */

/**
 * @typedef {Object} PostResponse
 * @property {number} id
 * @property {number} user_FK
 * @property {string} before_picture_path
 * @property {string} after_picture_path
 * @property {string} after_text
 * @property {string} before_text
 * @property {string} created_at
 * @property {User} users
 */

const Top = () => {
  const [open, setOpen] = useState(false)
  const [posts, setPosts] = useState([])
  const { user } = useAuthContext()

  const fetchPosts = () => {
    api
      .get('/posts')
      .then((res) => {
        /** @type {PostResponse[]} */
        const data = res.data
        if (!data || data.length === 0) return
        setPosts(data)
        console.log(data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <>
      <Header sx={{ position: 'sticky', top: 0, zIndex: 999 }} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} sx={{ my: 1 }} />
      ))}
      {user && (
        <>
          <PostCreateModal open={open} closeModal={() => setOpen(false)} fetchPosts={fetchPosts} />
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
      )}
    </>
  )
}

export default Top
