import { useEffect, useState } from "react"

import { parseCookies } from "nookies"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import Settings from "../components/Settings"
import { SideBarIcon, HeaderBarIcon } from "../components/Sidebar"
import { FiHome, FiSettings } from 'react-icons/fi'
import { BiLogOut } from 'react-icons/bi'
import { MdOutlineShoppingCart, MdOutlineLocalPrintshop } from 'react-icons/md'
import Shop from "../components/Shop"

const Dashboard = () => {
  // NÃO CONSIGO USAR O CONTEXT
  // Obs: Uso o setUser e retorna o user null
  const STAGES = ['Settings', 'Shop']
  const [toggle, setToggle] = useState(STAGES[1])
  const navigate = useNavigate()
  
  // Verificar se o user está autenticado
  useEffect(() => {
    // Verificar se o Cookie com o Token existe
    const { 'auth.token': token } = parseCookies()
    if (!token) {
      navigate('/login')
      toast.error('Você precisa efetuar o login!')
    }
  }, [])


  return (
    <div>
      <aside className="nav fixed top-0 left-0 h-screen px-6 flex flex-col border-r-2 hidden">
        <SideBarIcon deleteCookie={true} style="sidebar-logout" styleTooltip="sidebar-logout-tooltip" icon={<BiLogOut />} text='SAIR' to="/" />
        <SideBarIcon icon={<FiHome />} text='Home' to="/" />
        <SideBarIcon icon={<MdOutlineShoppingCart />} text='Shop' to="/" />
        <SideBarIcon icon={<MdOutlineLocalPrintshop />} text='Imprimir/Print' to="/" />
        <SideBarIcon style='sidebar-setting' icon={<FiSettings />} text='Configurações' />
      </aside>

      <header className="nav mx-auto flex justify-center items-center py-4 rounded-b-full max-w-3xl border-b-2">
        <HeaderBarIcon deleteCookie={true} style="headbar-logout" styleTooltip="sidebar-logout-tooltip" icon={<BiLogOut />} text='SAIR' to="/" />
        <HeaderBarIcon icon={<FiHome />} text='Home' to="/" />
        <button onClick={() => setToggle(STAGES[1])}>
          <HeaderBarIcon icon={<MdOutlineShoppingCart />} text='Shop' />
        </button>
        <HeaderBarIcon icon={<MdOutlineLocalPrintshop />} text='Imprimir/Print' to="/" />
        <button onClick={() => setToggle(STAGES[0])}>
          <HeaderBarIcon style='sidebar-setting' icon={<FiSettings />} text='Configurações' />
        </button>
      </header>

      {toggle === STAGES[0] && <Settings />}
      {toggle === STAGES[1] && <Shop />}

    </div>
  )
}

export default Dashboard