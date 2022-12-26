import { parseCookies } from "nookies"
import { Navigate, Outlet } from "react-router-dom"

export const PrivateRoutes = () => {
    const { 'auth.token': token } = parseCookies()
    return token ? <Outlet /> : <Navigate to='/login' />
}
