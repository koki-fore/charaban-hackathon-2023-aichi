import '../styles/PostCard.css'
import { PostCardHeader, PostCardContent, PostCardFooter } from './card'
import { Box } from '@mui/material'

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} screen_name
 * @property {string} profile_picture_path
 */

/**
 * @typedef {Object} Post
 * @property {number} id
 * @property {number} user_FK
 * @property {string} before_picture_path
 * @property {string} after_picture_path
 * @property {string} after_text
 * @property {string} before_text
 * @property {string} created_at
 * @property {User} user
 */

/** @type { Post } */
const duymmyPost = {
  id: 1,
  user_FK: 1,
  before_picture_path: 'https://picsum.photos/200/300',
  after_picture_path: 'https://picsum.photos/200/300',
  after_text: 'after_text',
  before_text: 'before_text',
  created_at: '2021-10-01 00:00:00',
  user: {
    id: 1,
    screen_name: 'screen_name',
    profile_picture_path: 'https://picsum.photos/200/300',
  },
}

export const PostCard = ({ /** @type {Post} */ post, sx }) => {
  post = duymmyPost
  return (
    <>
      <Box className="PostCard" sx={sx} data-post-id={post.id}>
        <PostCardHeader />
        <PostCardContent />
        <PostCardFooter />
      </Box>
    </>
  )
}
