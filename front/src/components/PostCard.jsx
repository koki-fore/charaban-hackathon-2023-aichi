import '../styles/PostCard.css'
import { PostCardHeader, PostCardContent, PostCardFooter } from './card'
import { Box } from '@mui/material'
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
  after_text: 'after_text',
  before_text: 'before_text',
  created_at: '2021-10-01 00:00:00',
  user: {
    id: 1,
    screen_name: 'ユーザー名',
    profile_picture_path: 'https://picsum.photos/200/300',
  },
}

export const PostCard = ({ /** @type {PostResponse} */ post, sx }) => {
  const [postRotate, setPostRotate] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [numLiked, setNumLiked] = useState(0)
  const [frontChildRef, setFrontChildRef] = useState(null)
  const [backChildRef, setBackChildRef] = useState(null)
  const [cardHeight, setCardHeight] = useState(0)
  post = duymmyPost

  const toggleRotate = () => {
    setPostRotate(!postRotate)
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

  const calcHeight = (children) => {
    return children.reduce((acc, cur) => {
      const style = window.getComputedStyle(cur)
      const margin = parseFloat(style.marginTop) + parseFloat(style.marginBottom)
      const height = cur.offsetHeight + margin
      return acc + height
    }, 0)
  }

  useEffect(() => {
    if (!frontChildRef || !backChildRef) return
    const height = Math.max(
      0,
      calcHeight(Array.from(frontChildRef?.current?.children)) + 32,
      calcHeight(Array.from(backChildRef?.current?.children)) + 32,
    )
    setCardHeight(height)
  }, [frontChildRef, backChildRef])

  return (
    <>
      <Box
        className={`PostCard-wrapper ${postRotate && 'PostCard-wrapper--rotate'}`}
        sx={{ ...sx, maxWidth: 600, mx: 'auto', p: 2, height: cardHeight }}
        data-post-id={post.id}>
        <PostCardChild
          post={beforePost}
          className={'PostCard PostCard-front'}
          toggleRotate={toggleRotate}
          handleLike={handleLike}
          isLiked={isLiked}
          numLiked={numLiked}
          setChildRef={setFrontChildRef}
        />
        <PostCardChild
          post={afterPost}
          className={'PostCard PostCard-back'}
          toggleRotate={toggleRotate}
          handleLike={handleLike}
          isLiked={isLiked}
          numLiked={numLiked}
          setChildRef={setBackChildRef}
        />
      </Box>
    </>
  )
}

const PostCardChild = ({
  /** @type {Post} */ post,
  className,
  toggleRotate,
  handleLike,
  isLiked,
  numLiked,
  setChildRef,
  sx,
}) => {
  const childRef = useRef(null)

  useEffect(() => {
    if (childRef.current) {
      setChildRef(childRef)
    }
  }, [])

  return (
    <>
      <Box
        className={className}
        sx={{ ...sx, maxWidth: 600, mx: 'auto', p: 2 }}
        data-post-id={post.id}
        ref={childRef}>
        <PostCardHeader user={post.user} datetime={post.created_at} />
        <PostCardContent post={post} sx={{ mt: 2 }} />
        <PostCardFooter
          sx={{ mt: 2 }}
          toggleRotate={toggleRotate}
          handleLike={handleLike}
          isLiked={isLiked}
          numLiked={numLiked}
        />
      </Box>
    </>
  )
}
