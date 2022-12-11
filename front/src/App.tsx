import { createBrowserRouter } from 'react-router-dom'

import CreateAccount from './pages/CreateAccount'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Error from './pages/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/create-account',
    element: <CreateAccount />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element:  <Dashboard />  
  },
  {
    path: '/*',
    element: <Error />
  },
])

export { router }
