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

export type { SignInData, CartProps, UserDataDB, UserProps }