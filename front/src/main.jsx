import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
// import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <Header />
    </BrowserRouter>
  </React.StrictMode>,
)
