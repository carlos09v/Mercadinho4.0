type UserProps = {
    id: string
    email: string
    name?: string
    avatarUrl?: string
    createdAt: string
    password: string
}

type UserDataDB = {
    name: string | undefined
    avatarUrl: string | undefined
}

type CartProps = {
    id: string
    userId: string
    productName: string
    productPrice: number
    addedAt: string
}

type SignInData = {
    email: string
    password: string
}

export type { SignInData, CartProps, UserDataDB, UserProps }