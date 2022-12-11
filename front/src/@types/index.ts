import { FormEvent, ReactElement } from "react"

// ---- WebProps
type SideBarIconProps = {
    icon?: ReactElement
    text?: string
    to?: string
    style?: string
    styleTooltip?: string
    deleteCookie?: boolean
}

interface InputProps {
    id: string
    labelName: string
    placeholder: string
    value?: string
    type: string
    autoComplete?: string
    maxLength?: number
    onChange?: (e: FormEvent) => void
}


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

type UserProps = {
    id: string
    email: string
    name?: string
    avatarUrl?: string
    createdAt: string
    password: string
}

type UserDataDB = {
    name: string
    avatarUrl: string
}

type CartProps = {
    productName: string
    procuctPrice: number
}

type SignInData = {
    email: string
    password: string
}

export type { SideBarIconProps, InputProps, AuthContextDataProps, UserTokenProps, SignInData, CartProps, UserDataDB, UserProps }