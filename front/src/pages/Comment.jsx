import { useParams, useNavigate } from 'react-router-dom'
import { Header, PostCard, CommentCard } from '../components'
import { useEffect, useState } from 'react'
import {
  Box,
  Divider,
  IconButton,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useAuthContext } from '../context/AuthContext'
import { api } from '../util/axios'
import axios from 'axios'

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} screen_name
 * @property {string} profile_picture_path
 */

/**
 * @typedef {Object} Comment
 * @property {number} id
 * @property {number} user_FK
 * @property {string} text
 * @property {string} created_at
 * @property {User} users
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
 * @property {User} users
 * @property {Comment[]} comments
 */

/**
 * @typedef {Object} Comment
 * @property {number} id
 * @property {number} user_FK
 * @property {number} post_FK
 * @property {string} text
 * @property {string} created_at
 * @property {User} users
 */

const Comment = () => {
  const { postId } = useParams()
  const [post, setPost] = useState({})
  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const fetchComments = () => {
    api.get(`/posts/${postId}/comments`).then((res) => {
      /** @type { PostResponse } */
      const data = res.data
      if (!data) return
      setPost(data)
    })
  }

  useEffect(() => {
    fetchComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sendComment = () => {
    setIsLoading(true)
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/comments`,
        {
          post_fk: postId,
          text: comment.replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;'),
          screen_name: 'string',
          profile_picture_path: 'string',
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        },
      )
      .then((res) => {
        console.log(res)
        setComment('')
        setOpen(false)
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setIsLoading(false)
        fetchComments()
      })
  }

  return (
    <>
      <Header sx={{ position: 'sticky', top: 0, zIndex: 998 }} />
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <IconButton sx={{ mt: 1, ml: 1 }} onClick={() => navigate('/')}>
          <ArrowBackIcon />
        </IconButton>
        {post && <PostCard post={post} sx={{ my: 1 }} />}
        {user && (
          <Box
            sx={{
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.35)',
              mx: { xs: 1, sm: 'auto' },
              my: 1,
              borderRadius: '5px',
            }}>
            <Accordion expanded={open}>
              <AccordionSummary
                sx={{
                  '.MuiAccordionSummary-content': { my: 0, mx: 0 },
                  '.MuiAccordionSummary-content.Mui-expanded': { my: 0 },
                }}>
                <Button
                  variant="text"
                  sx={{ width: '100%', color: 'primary', fontSize: 20 }}
                  onClick={() => setOpen(!open)}>
                  コメントする
                  <ExpandMoreIcon sx={{ rotate: open && '180deg' }} />
                </Button>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <TextField
                    sx={{ width: '100%', mt: 1 }}
                    label="コメント"
                    multiline
                    maxRows={4}
                    variant="outlined"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Box sx={{ textAlign: 'right', mt: 1 }}>
                    <Button variant="outlined" onClick={() => setOpen(false)}>
                      キャンセル
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ ml: 1 }}
                      onClick={() => sendComment()}
                      disabled={isLoading}>
                      {isLoading ? (
                        <>
                          投稿中
                          <CircularProgress
                            color="grayText"
                            size={24}
                            sx={{ position: 'absolute', inset: 0, margin: 'auto' }}
                          />
                        </>
                      ) : (
                        'コメント'
                      )}
                    </Button>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        )}
        <Box
          sx={{
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.35)',
            mx: { xs: 1, sm: 'auto' },
            my: 1,
            borderRadius: '5px',
          }}>
          {post.comments &&
            post.comments.map((comment, idx) => {
              let sx = {}
              if (idx === 0) sx['borderRadius'] = '5px 5px 0 0'
              if (idx === post.comments.length - 1) sx['borderRadius'] = '0 0 5px 5px'
              return (
                <Box key={comment.id}>
                  <CommentCard comment={comment} sx={sx} />
                  {idx !== post.comments.length - 1 && <Divider />}
                </Box>
              )
            })}
        </Box>
      </Box>
    </>
  )
}
export default Comment
