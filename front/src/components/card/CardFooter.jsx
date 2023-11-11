import { Box, IconButton } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

export const PostCardFooter = ({ toggleRotate, handleLike, isLiked, numLiked, sx }) => {
  const handleComment = () => {
    console.log('comment')
  }

  return (
    <>
      <Box sx={sx}>
        <Grid container justifyContent="space-around">
          <Grid xs="auto">
            <IconButton sx={{ p: 0 }}>
              <Box sx={{ width: 30, height: 30 }}>
                <img
                  src="/comment.svg"
                  alt="to comment"
                  onClick={handleComment}
                  width={30}
                  height={30}
                />
              </Box>
            </IconButton>
          </Grid>
          <Grid xs="auto">
            <IconButton sx={{ p: 0 }}>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  '&::after': {
                    content: `'${numLiked || ''}'`,
                    position: 'absolute',
                    top: '50%',
                    left: '110%',
                    transform: 'translate(0, -50%)',
                    color: 'grayText',
                    fontSize: 14,
                  },
                }}>
                <img
                  src={isLiked ? '/stared.svg' : '/star-outline.svg'}
                  alt="like"
                  onClick={() => handleLike()}
                  width={30}
                  height={30}
                />
              </Box>
            </IconButton>
          </Grid>
          <Grid xs="auto">
            <IconButton sx={{ p: 0 }}>
              <Box sx={{ width: 30, height: 30 }}>
                <img src="/Z.png" alt="rotete" onClick={() => toggleRotate()} height={30} />
              </Box>
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
