type UserProps = {
    id: string
    cash: number
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
    category: CategoriesCart
    userId: string
    productName: string
    productPrice: number
    addedAt: string
}

enum CategoriesCart {
    Food,
    Fruits,
    Eletronics,
    Video_Games,
    Clothes,
    Sports,
    House,
    Others
}

type SignInData = {
    email: string
    password: string
}

export type { SignInData, CartProps, UserDataDB, UserProps }