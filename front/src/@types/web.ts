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
    labelName?: string
    placeholder: string
    value?: string | number | undefined
    type: string
    step?: string
    autoComplete?: string
    maxLength?: number
    max?: number
    min?: number
    onChange?: (e: FormEvent) => void
    productNameIcon?: ReactElement
    productPriceIcon?: ReactElement
}

interface CountContextProps {
    countUser: number | null
    countCart: number | null
    productsCount: number | null
    getUsersCount: () => Promise<void>
    getCartsCount: () => Promise<void>
    getProductsUserCount: () => Promise<void>
    resetCounts: () => void
}

export type { SideBarIconProps, InputProps, CountContextProps }