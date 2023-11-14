import { useParams } from 'react-router-dom'
import { Header, PostCard, CommentCard } from '../components'
import { useEffect, useState } from 'react'
import { Box, Divider } from '@mui/material'

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
 * @property {User} user
 */

/**
 * @typedef {Object} Comment
 * @property {number} id
 * @property {number} user_FK
 * @property {number} post_FK
 * @property {string} text
 * @property {string} created_at
 * @property {User} user
 */

/** @type { PostResponse } */
const duymmyPost = {
  id: 1,
  user_FK: 1,
  before_picture_path: 'https://picsum.photos/200/300',
  after_picture_path: 'https://picsum.photos/400/300',
  after_text:
    '6イニング3自責点は ERA (Earned Run Average＝防御率) にすると 4.5 となり、あまり良いとは言えないように見えるが、2010年シーズン以降の MLB 全体の防御率が 4.08 (2010)、3.94 (2011)、4.01 (2012) であることを見れば、現在でも妥当なラインだと思われる。',
  before_text: 'before_text',
  created_at: '2021-10-01 00:00:00',
  user: {
    id: 1,
    screen_name: 'ユーザー名',
    profile_picture_path: 'https://picsum.photos/200/300',
  },
}

/** @type { Comment[] } */
const dummyComments = [
  {
    id: 1,
    user_FK: 1,
    post_FK: 1,
    text: 'コメント',
    created_at: '2021-10-01 00:00:00',
    user: {
      id: 1,
      screen_name: 'ユーザー名1',
      profile_picture_path: 'https://picsum.photos/200/300',
    },
  },
  {
    id: 2,
    user_FK: 1,
    post_FK: 1,
    text: 'コメント2',
    created_at: '2021-10-01 00:00:00',
    user: {
      id: 1,
      screen_name: 'ユーザー名2',
      profile_picture_path: 'https://picsum.photos/300/300',
    },
  },
  {
    id: 3,
    user_FK: 1,
    post_FK: 1,
    text: 'コメント3',
    created_at: '2021-10-01 00:00:00',
    user: {
      id: 1,
      screen_name: 'ユーザー名3',
      profile_picture_path: 'https://picsum.photos/200/400',
    },
  },
]

const Comment = () => {
  const { postId } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    // TODO: postIdを使ってコメントを取得する
    setPost(duymmyPost)
  }, [postId])

  return (
    <>
      <Header />
      <PostCard post={duymmyPost} sx={{ my: 1 }} />
      <Box
        sx={{
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.35)',
          maxWidth: 600,
          mx: { xs: 1, sm: 'auto' },
          my: 1,
          borderRadius: 5,
        }}>
        {dummyComments.map((comment, idx) => {
          let sx = {}
          if (idx === 0) sx['borderRadius'] = '5px 5px 0 0'
          if (idx === dummyComments.length - 1) sx['borderRadius'] = '0 0 5px 5px'
          return (
            <Box key={comment.id}>
              <CommentCard comment={comment} sx={sx} />
              {idx !== dummyComments.length - 1 && <Divider />}
            </Box>
          )
        })}
      </Box>
    </>
  )
}
export default Comment
