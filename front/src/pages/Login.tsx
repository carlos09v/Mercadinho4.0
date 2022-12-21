import { FormEvent, useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { setCookie, parseCookies } from 'nookies'

import Input from "../components/Input"
import Logo from "../components/Logo"
import LoginSvg from '../assets/login_re_4vu2.svg'
import { api } from "../lib/axios"
import { AuthContext } from "../contexts/AuthContext"

const Login = () => {
  const [userDataRegister, setUserDataRegister] = useState({ email: '', password: '' })
  const { cart, setCart, setUser, user } = useContext(AuthContext)
  const navigate = useNavigate()

  // Verificar se o Cookie com o Token existe
  useEffect(() => {
    const { 'auth.token': token } = parseCookies()
    if (token) {
      navigate('/dashboard')
      toast.success('Você está logado !')
    }
  })


  // SignIn
  const handleLogin = async(e: FormEvent) => {
    e.preventDefault()

    // Validadar dados
    if (userDataRegister.email === '' || userDataRegister.password === '') return toast.warn('Preencha todos os campos !')

    if (userDataRegister.password.length < 6 || userDataRegister.password.length > 20) return toast.warn('A senha precisa ter entre 6 e 20 caracteres !')

    // Logar
    // await signIn(userDataRegister) // TAVA DANDO ERRO

    // Validar o Email e Senha e Receber o Token JWT e o Cart[] do Back-end
    api.post(`/users`, {
      email: userDataRegister.email,
      password: userDataRegister.password
    }).then(res => {
      // console.log(res)
      // res.data.cart ? setCart(res.data.cart) : null

      // Inserir o Token no Header das requisições
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`

      // Create Cookie
      // Context + Cookie Name + Value + Params
      setCookie(undefined, 'auth.token', res.data.token, {
        maxAge: 60 * 60 * 24 // 24 Hours
      })

      navigate('/dashboard')
    }).catch(err => {
      if(err.response) toast.error(err.response.data.message)
    })
  }

  const sendEmail = () => {

  }


  return (
    <div className="flex justify-center items-center min-h-screen">

      <div className="register-container">
        <div className="register-header">
          <Logo />
        </div>
        <div className="flex items-center justify-center gap-8 h-[350px]">
          <form className="flex flex-col justify-center w-1/2" onSubmit={handleLogin}>
            <Input
              id="email"
              labelName="Email:"
              placeholder="Digite o seu email..."
              type="email"
              onChange={(e: FormEvent) => setUserDataRegister({ ...userDataRegister, email: (e.target as HTMLTextAreaElement).value })}
            />
            <Input
              id="password"
              labelName="Senha:"
              placeholder="********"
              type="password"
              onChange={(e: FormEvent) => setUserDataRegister({ ...userDataRegister, password: (e.target as HTMLTextAreaElement).value })}
            />
            <button className="bg-[#3366ff] hover:bg-[#3366ffe3] duration-200" type="submit">Acessar</button>
      
            <p className="text-center mt-3 text-[#F50057] hover:underline cursor-pointer" onClick={sendEmail}>Esqueceu a senha ?</p>
          </form>
          <div className="w-1/2">
            <img className="w-full" src={LoginSvg} alt="loginSvg" />
          </div>
        </div>
        <p className="mt-12 text-center dark:text-[#ededed]">Ainda não possui uma conta? <Link className="text-purple-500 hover:scale105 duration-200" to='/create-account'>Clique aqui para criá-la.</Link></p>
      </div>

    </div>
  )
}

export default Login