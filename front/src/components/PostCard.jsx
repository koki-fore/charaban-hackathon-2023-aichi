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

export const PostCard = ({ /** @type {PostResponse} */ post, className, sx }) => {
  const childRef = useRef(null)
  const [postRotate, setPostRotate] = useState(false)
  const [frontChildRef, setFrontChildRef] = useState(null)
  const [backChildRef, setBackChildRef] = useState(null)
  const [contentHeight, setContentHeight] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [numLiked, setNumLiked] = useState(0)

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
    const height = children[1].offsetHeight + margin + (window.innerWidth < 600 ? 250 * 0.9 : 400)
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
      <Box sx={{ ...sx, maxWidth: 600, mx: 'auto' }} data-post-id={post.id}>
        <Stack
          className={className}
          sx={{
            ...sx,
            maxWidth: 600,
            mx: { xs: 1, sm: 0 },
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
      </Box>
    </>
  )
}
