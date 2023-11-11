import '../styles/PostCard.css'
import { PostCardHeader, PostCardContent, PostCardFooter } from './card'
import { Box } from '@material-ui/core'

export const PostCard = ({ /** @type {Post} */ post, sx }) => {
  return (
    <>
      <Box className="PostCard" sx={sx} data-post-id={post.id}>
        <PostCardHeader />
        <PostCardContent />
        <PostCardFooter />
      </Box>
    </>
  )
}
