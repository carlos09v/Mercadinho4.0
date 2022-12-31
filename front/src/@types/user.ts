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
    productName: string
    productPrice: string
}

type SignInData = {
    email: string
    password: string
}

export type { SignInData, CartProps, UserDataDB, UserProps }