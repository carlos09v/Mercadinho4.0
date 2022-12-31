import { createContext, ReactNode, useState } from "react";
import { CountContextProps } from "../@types/web";
import { api } from "../lib/axios";


// Context + Provider
//Função que constroe o Provider e também permite Consumir os Dados Globais
export const CountContext = createContext({} as CountContextProps)

//Componente Provider para passar os valores para os Childrens
export function CountProvider({ children }: { children: ReactNode }) {
    const [countUser, setCountUser] = useState<number | null>(null)
    const [countCart, setCountCart] = useState<number | null>(null)
    const [productsCount, setProductsCount] = useState<number | null>(null)

    // Reset
    const resetCounts = () => {
        setCountCart(null)
        setCountUser(null)
        setProductsCount(null)
    }

    const getUsersCount = async () => {
        const { data } = await api.get('/users/count')
        setCountUser(data.count)
    }
    const getCartsCount = async () => {
        const { data } = await api.get('/products/count')
        setCountCart(data.count)
    }

    // Get ProductsCount by User
    const getProductsUserCount = async () => {
        const { data } = await api.get('/cartUser/count')
        setProductsCount(data.countCartUser)
    }


    return (
        <CountContext.Provider value={{ countUser, countCart, getCartsCount, getUsersCount, getProductsUserCount, productsCount, resetCounts }}>
            {children}
        </CountContext.Provider>
    )
}