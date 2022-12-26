import { createContext, ReactNode, useState } from "react";
import { CartProps, SignInData, UserProps } from "../@types/user";
import { AuthContextDataProps } from "../@types/auth";
import { api } from "../lib/axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { toast } from "react-toastify";


// Context + Provider
//Função que constroe o Provider e também permite Consumir os Dados Globais
export const AuthContext = createContext({} as AuthContextDataProps)

//Componente Provider para passar os valores para os Childrens
export function AuthProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartProps[] | null>(null)
    const [user, setUser] = useState<UserProps | null>(null)

    const signIn = async ({ email, password }: SignInData) => {
        // Validar o Email e Senha e Receber o Token JWT e o Cart[] do Back-end
        try {
            const { data } = await api.post(`/users`, {
                email,
                password
            })

            // Inserir o Token no Header das requisições
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

            // Create Cookie
            // Context + Cookie Name + Value + Params
            setCookie(undefined, 'auth.token', data.token, {
                maxAge: 60 * 60 * 24 // 24 Hours
            })

            data.cart ? setCart(data.cart) : null
        } catch (err: any) {
            if(err.response) return toast.error(err.response.data.message)
        }

        const { 'auth.token': token } = parseCookies()
        if(token) {
            // Receber o UserData
            try {
                const { data } = await api.get('/me')
                setUser(data.userDB)
            } catch (err) {
                console.log(err)
            }
        }else {
            console.log('Não existe token :(')
        }
    }

    const signOut = () => {
        destroyCookie(undefined, 'auth.token')
        setUser(null)
        setCart(null)
        // return <Navigate to='/' />
    }

    return (
        <AuthContext.Provider value={{ setCart, cart, user, setUser, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}