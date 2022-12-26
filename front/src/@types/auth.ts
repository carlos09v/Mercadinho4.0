import { Id } from "react-toastify"
import { CartProps, SignInData, UserProps } from "./user"

// --- AuthProps
interface AuthContextDataProps {
    signed?: boolean
    signIn: (data: SignInData) => Promise<void | Id>
    signOut: () => void
    user: UserProps | null
    cart: CartProps[] | null
    setUser: any
    setCart: any
}

type UserTokenProps = {
    sub: string
    name?: string
    avatarUrl?: string
    email: string
}

export type { AuthContextDataProps, UserTokenProps }
