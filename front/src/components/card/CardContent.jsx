import { Box, Typography, Stack } from '@mui/material'

/**
 * @typedef {Object} Post
 * @property {number} id
 * @property {number} user_FK
 * @property {string} picture_path
 * @property {string} text
 * @property {string} created_at
 * @property {User} user
 */

export const PostCardContent = ({ /** @type {Post} */ post, sx }) => {
  return (
    <>
      <Stack sx={sx}>
        <Stack alignItems="center">
          <img
            src={post.picture_path}
            alt="image"
            style={{ maxHeight: '500px', maxWidth: '300px' }}
          />
        </Stack>
        <Box>
          <Typography>{post.text}</Typography>
        </Box>
      </Stack>
    </>
  )
}
