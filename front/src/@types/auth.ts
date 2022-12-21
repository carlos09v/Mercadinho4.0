import { CartProps } from "./user"

// --- AuthProps
interface AuthContextDataProps {
    isAuthenticated?: boolean
    // signIn: (data: SignInData) => Promise<void>
    user?: UserTokenProps | null
    cart: CartProps | null
    setUser?: any
    setCart: any
}

type UserTokenProps = {
    sub: string
    name?: string
    avatarUrl?: string
    email: string
}

export type { AuthContextDataProps, UserTokenProps }
