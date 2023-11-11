import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
// import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header.jsx'
import { createTheme, ThemeProvider } from '@mui/material'
import { PostCard } from './components/'

const theme = createTheme({
  typography: {
    fontFamily: ['Noto Sans JP', 'sans-serif'].join(','),
  },
  palette: {
    text: {
      primary: '#333',
    },
    background: {
      default: '#F8F9FA',
    },
    grayText: '#979797',
    bgGray: '#F8F9FA',
    bgSky: '#84E9FF',
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <PostCard />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
