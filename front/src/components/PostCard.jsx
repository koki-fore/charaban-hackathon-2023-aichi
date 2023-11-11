import '../styles/PostCard.css'
import { PostCardHeader, PostCardContent, PostCardFooter } from './card'
import { Box, Stack } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

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
 * @typedef {Object} Post
 * @property {number} id
 * @property {number} user_FK
 * @property {string} picture_path
 * @property {string} text
 * @property {string} created_at
 * @property {User} user
 */

/** @type { Post } */
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

export const PostCard = ({ /** @type {PostResponse} */ post, sx }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [numLiked, setNumLiked] = useState(0)
  post = duymmyPost

  const handleLike = () => {
    console.log('like')
    // TODO: APIを投げてresponseをセットする
    if (isLiked) {
      setIsLiked(false)
    } else {
      setIsLiked(true)
      setNumLiked((prev) => prev + 1)
    }
  }

  return (
    <>
      <Box sx={{ ...sx, maxWidth: 600, mx: 'auto', p: 2 }} data-post-id={post.id}>
        <PostCardChild post={post} handleLike={handleLike} isLiked={isLiked} numLiked={numLiked} />
      </Box>
    </>
  )
}

const PostCardChild = ({
  /** @type {Post} */ post,
  className,
  handleLike,
  isLiked,
  numLiked,
  sx,
}) => {
  const childRef = useRef(null)
  const [postRotate, setPostRotate] = useState(false)
  const [frontChildRef, setFrontChildRef] = useState(null)
  const [backChildRef, setBackChildRef] = useState(null)
  const [contentHeight, setContentHeight] = useState(0)

  const toggleRotate = () => {
    setPostRotate(!postRotate)
  }

  useEffect(() => {
    if (!frontChildRef || !backChildRef) return
    const height = Math.max(
      0,
      calcHeight(Array.from(frontChildRef?.current?.children)) + 32,
      calcHeight(Array.from(backChildRef?.current?.children)) + 32,
    )
    setContentHeight(height)
  }, [frontChildRef, backChildRef])

  const calcHeight = (children) => {
    const style = window.getComputedStyle(children[1])
    const margin = parseFloat(style.marginTop) + parseFloat(style.marginBottom)
    const height = children[1].offsetHeight + margin + 400
    return height
  }

  // 前後の投稿を分離する
  /** @type {Post} */
  const beforePost = {
    ...post,
    picture_path: post.before_picture_path,
    text: post.before_text,
  }
  /** @type {Post} */
  const afterPost = {
    ...post,
    picture_path: post.after_picture_path,
    text: post.after_text,
  }

  return (
    <>
      <Stack
        className={className}
        sx={{
          ...sx,
          maxWidth: 600,
          mx: 'auto',
          m: 2,
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.35)',
          borderRadius: '5px',
          backgroundColor: 'grayText',
        }}
        data-post-id={post.id}
        ref={childRef}>
        <PostCardHeader
          user={post.user}
          datetime={post.created_at}
          sx={{
            backgroundColor: '#fff',
            p: 2,
            pb: 1,
            borderRadius: '5px 5px 0 0',
          }}
        />
        <Box
          sx={{ height: contentHeight }}
          className={`PostCard-content-wrapper ${
            postRotate && 'PostCard-content-wrapper--rotate'
          }`}>
          <PostCardContent
            post={beforePost}
            sx={{ flexGrow: 1, py: 1 }}
            className={'PostCard-content'}
            setChildRef={setFrontChildRef}
          />
          <PostCardContent
            post={afterPost}
            sx={{ flexGrow: 1, py: 1 }}
            className={'PostCard-content PostCard-content-back'}
            setChildRef={setBackChildRef}
          />
        </Box>
        <PostCardFooter
          sx={{
            backgroundColor: '#fff',
            p: 2,
            pt: 1,
            borderRadius: '0 0 5px 5px',
          }}
          toggleRotate={toggleRotate}
          handleLike={handleLike}
          isLiked={isLiked}
          numLiked={numLiked}
        />
      </Stack>
    </>
  )
}
