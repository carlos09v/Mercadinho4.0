import { FormEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { api } from "../lib/axios"
import { parseCookies } from "nookies"

import Input from "../components/Input"
import Logo from "../components/Logo"
import CreateSvg from '../assets/unDrawPics/create_re_57a3.svg'

const CreateAccount = () => {
  const [userDataRegister, setUserDataRegister] = useState({ email: '', password: '', confirmPassword: '' })
  const navigate = useNavigate()

  // Verificar se o Cookie com o Token existe
  useEffect(() => {
    const { 'auth.token': token } = parseCookies()
    if (token) {
      navigate('/dashboard')
      toast.success('Você está logado !')
    }
  })


  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()

    // Validar Dados
    if (userDataRegister.email === '' || userDataRegister.password === '' || userDataRegister.confirmPassword === '') return toast.warn('Preencha todos os campos!')

    if (userDataRegister.password.length < 6 || userDataRegister.password.length > 20) return toast.warn('A senha precisa ter entre 6 e 20 caracteres !')

    if (userDataRegister.password !== userDataRegister.confirmPassword) return toast.warn('As senha não conferem !')


    // Register
    try {
      const { data } = await api.post('/create-account', {
        email: userDataRegister.email,
        password: userDataRegister.password
      })

      if (data.idUser.id) {
        toast.success(data.message)
        navigate('/login')
      } else {
        toast.error('Erro ao cadastrar usuário!')
      }
    } catch (err: any) {
      if(err.response) return toast.error(err.response.data.message)
    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen">

      <div className="register-container">
        <div className="register-header">
          <Logo />
        </div>
        <div className="flex items-center justify-center gap-4 h-[350px]">
          <form className="flex flex-col justify-center w-1/2" onSubmit={handleRegister}>
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
              placeholder="Digite a sua senha..."
              type="password"
              onChange={(e: FormEvent) => setUserDataRegister({ ...userDataRegister, password: (e.target as HTMLTextAreaElement).value })}
              maxLength={20}
            />
            <Input
              id="confirm_password"
              labelName="Confirme a sua senha:"
              placeholder="Confirme a sua senha..."
              type="password"
              onChange={(e: FormEvent) => setUserDataRegister({ ...userDataRegister, confirmPassword: (e.target as HTMLTextAreaElement).value })}
              maxLength={20}
            />
            <button className="bg-[#3366ff] hover:bg-[#3366ffe3] duration-200" type="submit">Criar conta</button>
          </form>
          <div className="w-1/2">
            <img className="w-full" src={CreateSvg} alt="CreateSvg" />
          </div>
        </div>
        <p className="mt-12 text-center dark:text-[#ededed]">Já possui uma conta? <Link className="text-green-600 hover:scale-105 duration-200" to='/login'>Clique aqui para acessar.</Link></p>
      </div>

    </div>
  )
}

export default CreateAccount