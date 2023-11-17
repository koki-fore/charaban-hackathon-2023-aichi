import { IconButton, Avatar, Box, Typography, Grid } from '@mui/material'
import dayjs from 'dayjs'

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} screen_name
 * @property {string} profile_picture_path
 */

export const PostCardHeader = ({ /** @type {User} */ user, datetime, sx }) => {
  // TODO:ユーザーのプロフィールに移動
  const handleNavigateToProfile = () => {
    console.log('navigate to profile')
  }
  return (
    <Box sx={sx}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid container item xs="auto" spacing={2} alignItems="center">
          <Grid item>
            <IconButton onClick={handleNavigateToProfile} sx={{ p: 0 }}>
              <Avatar
                alt="avatar"
                src={user && user.profile_picture_path}
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography className="post-card-header__user-name" variant="h6">
              {user && user.screen_name}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography
            className="post-card-header__datetime"
            color="grayText"
            sx={{ fontSize: 14, fontWeight: 'medium' }}>
            {dayjs(datetime).format('YYYY年MM月D日 HH:mm')}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
