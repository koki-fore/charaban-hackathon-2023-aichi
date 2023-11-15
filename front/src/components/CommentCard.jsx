import { Box } from '@mui/material'
import { Grid, IconButton, Avatar, Typography, Stack } from '@mui/material'
import dayjs from 'dayjs'

/**
 * @typedef {Object} Comment
 * @property {number} id
 * @property {number} user_FK
 * @property {number} post_FK
 * @property {string} text
 * @property {string} created_at
 * @property {User} user
 */

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} screen_name
 * @property {string} profile_picture_path
 */

export const CommentCard = ({ sx, /** @type {Comment} */ comment }) => {
  const handleNavigateToProfile = () => {
    console.log('navigate to profile')
  }
  return (
    <>
      <Stack
        sx={{
          ...sx,
          maxWidth: 600,
          mx: 'auto',
          backgroundColor: '#fff',
        }}>
        <Box sx={{ m: 2 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid container item xs="auto" spacing={2} alignItems="center">
              <Grid item>
                <IconButton onClick={handleNavigateToProfile} sx={{ p: 0 }}>
                  <Avatar
                    alt={comment.user.screen_name}
                    src={comment.user.profile_picture_path}
                    sx={{ width: 30, height: 30 }}
                  />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography className="post-card-header__user-name" sx={{ fontSize: 16 }}>
                  {comment.user.screen_name}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                className="post-card-header__datetime"
                color="grayText"
                sx={{ fontSize: 12, fontWeight: 'medium' }}>
                {dayjs(comment.created_at).format('YYYY年MM月D日 HH:mm')}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Typography sx={{ overflowWrap: 'normal', wordBreak: 'break-word', mx: 3, mb: 2 }}>
          {comment.text}
        </Typography>
      </Stack>
    </>
  )
}