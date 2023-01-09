import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import Settings from "../../components/Settings"
import { SideBarIcon, HeaderBarIcon } from "../../components/Sidebar"
import { FiHome, FiSettings } from 'react-icons/fi'
import { BiLogOut } from 'react-icons/bi'
import { MdOutlineShoppingCart, MdOutlineLocalPrintshop } from 'react-icons/md'
import { BsCartCheck } from 'react-icons/bs'
import Shop from "../../components/Shop"
import Cart from "../../components/Cart/Cart"
import './Dashboard.css'

const Dashboard = () => {
  // NÃO CONSIGO USAR O CONTEXT
  // Obs: Uso o setUser e retorna o user null
  // Res => precisava prover (provider) pra aplicação
  const STAGES = ['Settings', 'Shop', 'Cart']
  const [toggleStage, setToggleStage] = useState(STAGES[1])
  const asideRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const asideIconPrintRef = useRef<HTMLButtonElement>(null)
  const headerIconPrintRef = useRef<HTMLButtonElement>(null)


  return (
    <div>
      <aside ref={asideRef} className="nav fixed top-0 left-0 h-screen px-4 flex flex-col border-r-2">
        <SideBarIcon deleteCookie={true} style="sidebar-logout" styleTooltip="sidebar-logout-tooltip" icon={<BiLogOut />} text='SAIR' to="/" />
        <SideBarIcon icon={<FiHome />} text='Home' to="/" />
        <button onClick={() => setToggleStage(STAGES[1])}>
          <SideBarIcon isActive={toggleStage === 'Shop' ? true : false} icon={<MdOutlineShoppingCart />} text='Shop' />
        </button>
        <button ref={asideIconPrintRef} style={{ display: 'none' }} onClick={window.print}>
          <SideBarIcon icon={<MdOutlineLocalPrintshop />} text='Imprimir/Print' style="sidebar-print" styleTooltip="sidebar-print-tooltip" />
        </button>
        <button onClick={() => setToggleStage(STAGES[2])}>
          <SideBarIcon style="sidebar-cart"
         styleTooltip="sidebar-cart-tooltip" isActive={toggleStage === 'Cart' ? true : false} icon={<BsCartCheck />} text='Carrinho/Cart' />
        </button>
        <button onClick={() => setToggleStage(STAGES[0])}>
          <SideBarIcon style='sidebar-setting' isActive={toggleStage === 'Settings' ? true : false} icon={<FiSettings />} text='Configurações' />
        </button>
      </aside>

      <header ref={headerRef} className="nav mx-auto flex justify-center items-center py-4 rounded-b-full max-w-3xl border-b-2 w-[90%]">
        <HeaderBarIcon deleteCookie={true} style="headbar-logout" styleTooltip="sidebar-logout-tooltip" icon={<BiLogOut />} text='SAIR' to="/" />
        <HeaderBarIcon icon={<FiHome />} text='Home' to="/" />
        <button onClick={() => setToggleStage(STAGES[1])}>
          <HeaderBarIcon isActive={toggleStage === 'Shop' ? true : false} icon={<MdOutlineShoppingCart />} text='Shop' />
        </button>
        <button ref={headerIconPrintRef} style={{ display: 'none' }} onClick={window.print}>
          <HeaderBarIcon icon={<MdOutlineLocalPrintshop />} text='Imprimir/Print' style="sidebar-print" styleTooltip="sidebar-print-tooltip" />
        </button>
        <button onClick={() => setToggleStage(STAGES[2])}>
          <HeaderBarIcon isActive={toggleStage === 'Cart' ? true : false} style="sidebar-cart" styleTooltip="sidebar-cart-tooltip" icon={<BsCartCheck />} text='Carrinho/Cart' />
        </button>
        <button onClick={() => setToggleStage(STAGES[0])}>
          <HeaderBarIcon isActive={toggleStage === 'Settings' ? true : false} style='sidebar-setting' icon={<FiSettings />} text='Configurações' />
        </button>
      </header>

      {toggleStage === STAGES[0] && <Settings asideRef={asideRef} headerRef={headerRef} headerIconPrintRef={headerIconPrintRef} asideIconPrintRef={asideIconPrintRef} />}
      {toggleStage === STAGES[1] && <Shop asideRef={asideRef} headerRef={headerRef} headerIconPrintRef={headerIconPrintRef} asideIconPrintRef={asideIconPrintRef} setToggleStage={setToggleStage} />}
      {toggleStage === STAGES[2] && <Cart headerIconPrintRef={headerIconPrintRef} asideIconPrintRef={asideIconPrintRef} />}

    </div>
  )
}

export default Dashboard
