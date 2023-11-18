import { Box, IconButton, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const PostCardFooter = ({ toggleRotate, handleLike, isLiked, numLiked, postId, sx }) => {
  const navigate = useNavigate()

  return (
    <>
      <Box sx={sx}>
        <Grid container justifyContent="space-around" alignItems="center">
          <Grid item>
            <IconButton sx={{ p: 0 }} onClick={() => navigate(`/comment/${postId}`)}>
              <Box sx={{ width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 } }}>
                <img src="/comment.svg" alt="to comment" width="100%" height="100%" />
              </Box>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton sx={{ p: 0 }} onClick={() => handleLike()}>
              <Box
                sx={{
                  width: { xs: 20, sm: 30 },
                  height: { xs: 20, sm: 30 },
                  '&::after': {
                    content: `'${numLiked || ''}'`,
                    position: 'absolute',
                    top: '50%',
                    left: '110%',
                    transform: 'translate(0, -25%)',
                    color: 'grayText',
                    fontSize: 14,
                  },
                }}>
                <img
                  src={isLiked ? '/stared.svg' : '/star-outline.svg'}
                  alt="like"
                  width="100%"
                  height="100%"
                />
              </Box>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton sx={{ p: 0 }} onClick={() => toggleRotate()}>
              <Box sx={{ width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 } }}>
                <img src="/Z.png" alt="rotete" height="100%" />
              </Box>
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
