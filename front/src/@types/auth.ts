import { Id } from "react-toastify"
import { CartProps, SignInData, UserProps } from "./user"

// --- AuthProps
interface AuthContextDataProps {
    signed?: boolean
    getUser: () => Promise<void>
    signIn: (data: SignInData) => Promise<JSX.Element | void | Id>
    signOut: () => void
    user: UserProps | null
    cart: CartProps[] | null
    setUser: (value: React.SetStateAction<UserProps | null>) => void
    setCart: (value: React.SetStateAction<CartProps[] | null>) => void
}

type UserTokenProps = {
    sub: string
    name?: string
    avatarUrl?: string
    email: string
}

export type { AuthContextDataProps, UserTokenProps }
