import { FormEvent, useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { parseCookies } from 'nookies'
import { AiFillCloseSquare } from 'react-icons/ai'

import Input from "../components/Input"
import Logo from "../components/Logo"
import LoginSvg from '../assets/unDrawPics/login_re_4vu2.svg'
import { api, sendEmailApi } from "../lib/axios"
import { AuthContext } from "../contexts/AuthContext"
import Modal from 'react-modal'
Modal.setAppElement('#root') // Pegar do root

const Login = () => {
  const [showModal, setShowModal] = useState(false)
  const [userDataRegister, setUserDataRegister] = useState({ email: '', password: '' })
  const { signIn } = useContext(AuthContext)
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
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    // Validadar dados
    if (userDataRegister.email === '' || userDataRegister.password === '') return toast.warn('Preencha todos os campos !')

    if (userDataRegister.password.length < 6 || userDataRegister.password.length > 20) return toast.warn('A senha precisa ter entre 6 e 20 caracteres !')

    // Logar
    await signIn(userDataRegister)
  }

  // Enviar senha do usuário pro email
  const sendEmail = (e: FormEvent, emailUser: string) => {
    e.preventDefault()
    let senha: string

    if (emailUser === '') return toast.warn('Preencha o campo !')

    api.post('/forgot-password', {
      email: emailUser
    }).then(res => {
      // console.log(res)
      senha = res.data.passwordUser.password
      
      const sendEmailProps = {
        email: emailUser,
        password: senha
      }
      sendEmailApi(sendEmailProps)
      userDataRegister.email = ''
      setShowModal(false)
    }).catch(err => {
      // console.log(err)
      if (err.response) return toast.error(err.response.data.message)
    })
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
              value={userDataRegister.email}
            />
            <Input
              id="password"
              labelName="Senha:"
              placeholder="********"
              type="password"
              onChange={(e: FormEvent) => setUserDataRegister({ ...userDataRegister, password: (e.target as HTMLTextAreaElement).value })}
              value={userDataRegister.password}
              maxLength={20}
            />
            <button className="bg-[#3366ff] hover:bg-[#3366ffe3] duration-200" type="submit">Acessar</button>

            <p className="text-center mt-3 text-[#F50057] hover:underline cursor-pointer" onClick={() => setShowModal(true)}>Esqueceu a senha ?</p>
          </form>
          <div className="w-1/2">
            <img className="w-full" src={LoginSvg} alt="loginSvg" />
          </div>
        </div>
        <p className="mt-12 text-center dark:text-[#ededed]">Ainda não possui uma conta? <Link className="text-purple-500 hover:scale105 duration-200" to='/create-account'>Clique aqui para criá-la.</Link></p>
      </div>


      {/* Forgot Password Modal */}
      <Modal isOpen={showModal} overlayClassName="modalExterior" className="modalInterior">
        <AiFillCloseSquare className="modalIconClose" onClick={() => setShowModal(false)} />

        <form onSubmit={e => sendEmail(e, userDataRegister.email)} className="flex flex-col gap-4 w-[500px]">
          <div className="flex gap-3 items-center">
            <label htmlFor="sendEmailInput" className="font-semibold dark:text-white">Email:</label>
            <input type="email" id="sendEmailInput" placeholder="Insira o seu email..." className="p-2 rounded-2xl w-full dark:placeholder:text-blue-400" onChange={(e: FormEvent) => setUserDataRegister({ ...userDataRegister, email: (e.target as HTMLTextAreaElement).value })} />
          </div>
          <button className="bg-[#F50057] hover:bg-[#f50056d7] duration-200" type="submit">Enviar</button>
        </form>
      </Modal>

    </div>
  )
}

export default Login