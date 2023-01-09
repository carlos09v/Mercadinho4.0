import { createBrowserRouter, BrowserRouter, Routes, Route } from 'react-router-dom'

import CreateAccount from '../pages/CreateAccount'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Error from '../pages/Error'
import { PrivateRoutes } from './privateRoutes'
import Payout from '../pages/Payout'


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />
//   },
//   {
//     path: '/create-account',
//     element: <CreateAccount />
//   },
//   {
//     path: '/login',
//     element: <Login />
//   },
//   {
//     path: '/dashboard',
//     element:  <Dashboard />
//   },
//   {
//     path: '/*',
//     element: <Error />
//   },
// ])

// export { route }

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-account' element={<CreateAccount />} />
        <Route path='/login' element={<Login />} />

        {/* Private Routes */}
        <Route path='/dashboard' element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Route>
        <Route path='/payout' element={<PrivateRoutes />}>
          <Route path='/payout' element={<Payout />}></Route>
        </Route>

        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
