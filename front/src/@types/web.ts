import { FormEvent, ReactElement } from "react"

// ---- WebProps
type SideBarIconProps = {
    icon?: ReactElement
    text?: string
    to?: string
    style?: string
    styleTooltip?: string
    deleteCookie?: boolean
    isActive?: boolean
}

interface InputProps {
    id: string
    name?: string
    labelName?: string
    placeholder?: string
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
    setProductsCount: (value: React.SetStateAction<number | null>) => void
    getUsersCount: () => Promise<void>
    getCartsCount: () => Promise<void>
    getProductsUserCount: () => Promise<void>
    resetCounts: () => void
}

type SibeBarRefs = {
    asideRef?: React.RefObject<HTMLDivElement>
    headerRef?: React.RefObject<HTMLDivElement>
    asideIconPrintRef: React.RefObject<HTMLButtonElement>
    headerIconPrintRef: React.RefObject<HTMLButtonElement>
    setToggleStage?: (value: React.SetStateAction<string>) => void
}

/* Cart */
type TablePaginationProps = {
    totalProducts: number
    productsPerPage: number
    setCurrentPage: (value: React.SetStateAction<number>) => void
    currentPage: number
}

/* Payout */
type PayoutProps = {
    setCurrentStep: (value: React.SetStateAction<string>) => void
    setInputPayout?:  (value: React.SetStateAction<string>) => void
    inputPayout: string
    buttonBackRef?: React.RefObject<HTMLButtonElement>
}

export type { SideBarIconProps, SibeBarRefs, InputProps, CountContextProps, TablePaginationProps, PayoutProps }