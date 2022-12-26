import { Link } from "react-router-dom"
import Logo from "../components/Logo"

const Error = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="register-container !min-h-[40vh] !max-w-xl flex flex-col justify-center items-center text-[#111218] dark:text-[#ededed]">
        <div className="register-header">
            <Logo />
        </div>
      
        <h1>Página não encontrada!</h1>
        <p>Esta página não existe :)</p>
        <Link className="bg-black/80 py-1 px-4 mt-4 rounded duration-500 text-[#ededed] dark:bg-blue-800 hover:bg-black/70 dark:hover:bg-blue-600 hover:scale-105 font-bold" to='/'>
          Voltar para Home
        </Link>
      </div>
    </div>
  )
}

export default Error