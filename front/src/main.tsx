import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import App from './App'
// Theme
import { themeCheck } from './config/theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Check the Theme System
themeCheck()
