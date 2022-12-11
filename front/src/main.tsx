import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { router } from './App'
// Toastify
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
// Theme
import ToggleTheme from './components/ToggleTheme'
import { themeCheck } from './config/theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastContainer autoClose={1500} />
      <RouterProvider router={router} />
      <ToggleTheme />
    </AuthProvider>
  </React.StrictMode>
)

// Check the Theme System
themeCheck()
