import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import AppRouter from "./routes"
// Toastify
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
// Theme
import ToggleTheme from './components/ToggleTheme'


const App = () => {
  return (
    <AuthProvider>
      {/* <RouterProvider router={router} /> */}
      <AppRouter />
      <ToastContainer autoClose={1500} />
      <ToggleTheme />
    </AuthProvider>
  )
}

export default App