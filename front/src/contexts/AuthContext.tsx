import { createContext, ReactNode, useState } from "react";

import { AuthContextDataProps, CartProps, UserProps } from "../@types";


// Context + Provider
//Função que constroe o Provider e também permite Consumir os Dados Globais
export const AuthContext = createContext({} as AuthContextDataProps)

//Componente Provider para passar os valores para os Childrens
export function AuthProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartProps | null>(null)
    const [user, setUser] = useState<UserProps | null>(null)

    // async function signIn({ email, password }: SignInData) {
    //     console.log(email, password)
    //     // Validar o Email e Senha e Receber o Token JWT e o Cart[] do Back-end
    //     const { data } = await api.post(`/users`, {
    //         email,
    //         password
    //     })
    //     console.log(data.message)
    //     setCart(data.cart)
    //     // Inserir o Token no Header das requisições
    //     api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    
    //     // Receber o UserData
    //     const UserData = await api.get('/me')
    //     setUser(UserData.data.user)

    //     navigate('/dashboard')
    // }

    return (
        <AuthContext.Provider value={{ setCart, cart, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}