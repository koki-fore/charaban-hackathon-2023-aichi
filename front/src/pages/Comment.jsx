import { useParams } from 'react-router-dom'
import { Header, PostCard, CommentCard } from '../components'
import { useEffect, useState } from 'react'

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

const Comment = () => {
  const { postId } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    console.log(postId)
    // TODO: postIdを使ってコメントを取得する
    setPost(duymmyPost)
  }, [postId])

  return (
    <>
      <Header />
      <PostCard post={post} sx={{ my: 1 }} />
    </>
  )
}
export default Comment
