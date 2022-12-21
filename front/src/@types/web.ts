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
    value?: string
    type: string
    autoComplete?: string
    maxLength?: number
    onChange?: (e: FormEvent) => void
}

export type { SideBarIconProps, InputProps }