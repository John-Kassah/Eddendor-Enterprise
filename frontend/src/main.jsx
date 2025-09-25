import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'

import HomePage from './pages/HomePage.jsx'
import toast, { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      
      <Toaster />

      <App />

      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
      
    </BrowserRouter>
  </StrictMode>,
)
