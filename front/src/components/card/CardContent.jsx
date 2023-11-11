import { Box, Typography, Stack } from '@mui/material'
import { useEffect, useRef } from 'react'

/**
 * @typedef {Object} Post
 * @property {number} id
 * @property {number} user_FK
 * @property {string} picture_path
 * @property {string} text
 * @property {string} created_at
 * @property {User} user
 */

export const PostCardContent = ({ /** @type {Post} */ post, sx, className, setChildRef }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      setChildRef(ref)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Stack sx={sx} className={className} ref={ref}>
        <Stack alignItems="center" sx={{ height: 400, width: 500, mx: 'auto' }}>
          <img
            src={post.picture_path}
            alt="image"
            style={{ height: '100%', maxHeight: 400, maxWidth: 500, objectFit: 'contain' }}
          />
        </Stack>
        <Box>
          <Typography sx={{ overflowWrap: 'normal', wordBreak: 'break-word', mx: 3 }}>
            {post.text}
          </Typography>
        </Box>
      </Stack>
    </>
  )
}
