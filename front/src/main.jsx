import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Top from './pages/Top'
import PrivateRoutes from './components/PrivateRoutes.jsx'

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
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
