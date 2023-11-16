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

const duymmyPosts = [
  {
    id: 1,
    user_FK: 1,
    before_picture_path: 'https://picsum.photos/200/300',
    after_picture_path: 'https://picsum.photos/400/300',
    after_text:
      '6イニング3自責点は ERA (Earned Run Average＝防御率) にすると 4.5 となり、あまり良いとは言えないように見えるが、2010年シーズン以降の MLB 全体の防御率が 4.08 (2010)、3.94 (2011)、4.01 (2012) であることを見れば、現在でも妥当なラインだと思われる。',
    before_text: 'before_text',
    created_at: '2021-10-01 00:00:00',
    users: {
      id: 1,
      screen_name: 'ユーザー名',
      profile_picture_path: 'https://picsum.photos/100/300',
    },
  },
  {
    id: 2,
    user_FK: 1,
    before_picture_path: 'https://picsum.photos/500/300',
    after_picture_path: 'https://picsum.photos/400/500',
    after_text:
      '6イニング3自責点は ERA (Earned Run Average＝防御率) にすると 4.5 となり、あまり良いとは言えないように見えるが、2010年シーズン以降の MLB 全体の防御率が 4.08 (2010)、3.94 (2011)、4.01 (2012) であることを見れば、現在でも妥当なラインだと思われる。',
    before_text: 'before_text',
    created_at: '2021-10-01 00:00:00',
    users: {
      id: 1,
      screen_name: 'ユーザー名',
      profile_picture_path: 'https://picsum.photos/300/300',
    },
  },
  {
    id: 3,
    user_FK: 1,
    before_picture_path: 'https://picsum.photos/600/600',
    after_picture_path: 'https://picsum.photos/400/400',
    after_text:
      '6イニング3自責点は ERA (Earned Run Average＝防御率) にすると 4.5 となり、あまり良いとは言えないように見えるが、2010年シーズン以降の MLB 全体の防御率が 4.08 (2010)、3.94 (2011)、4.01 (2012) であることを見れば、現在でも妥当なラインだと思われる。',
    before_text: 'before_text',
    created_at: '2021-10-01 00:00:00',
    users: {
      id: 1,
      screen_name: 'ユーザー名',
      profile_picture_path: 'https://picsum.photos/200/600',
    },
  },
]

const Top = () => {
  const [open, setOpen] = useState(false)
  const [posts, setPosts] = useState([])
  const { user } = useAuthContext()

  return (
    <>
      <Header sx={{ position: 'sticky', top: 0, zIndex: 999 }} />
      {duymmyPosts.map((post) => (
        <PostCard key={post.id} post={post} sx={{ my: 1 }} />
      ))}
      {user && (
        <>
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
      )}
    </>
  )
}

export default Top
