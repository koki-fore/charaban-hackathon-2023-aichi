import Grid from '@mui/material/Unstable_Grid2'
import { IconButton, Avatar, Box, Typography } from '@mui/material'
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
      <Grid container justifyContent="space-between">
        <Grid container alignItems="center" spacing={2}>
          <Grid xs="auto">
            <IconButton onClick={handleNavigateToProfile} sx={{ p: 0 }}>
              <Avatar
                alt={user.screen_name}
                src={user.profile_picture_path}
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>
          </Grid>
          <Grid>
            <Typography className="post-card-header__user-name" variant="h6">
              {user.screen_name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs="auto" alignItems="center">
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
