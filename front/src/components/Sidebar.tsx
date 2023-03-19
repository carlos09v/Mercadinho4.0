import { useContext, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import { FiHome, FiSettings } from 'react-icons/fi'
import { BiLogOut } from 'react-icons/bi'
import { MdOutlineShoppingCart, MdOutlineLocalPrintshop } from 'react-icons/md'
import { BsCartCheck } from 'react-icons/bs'
import { GiCash } from 'react-icons/gi'

import { SideBarIconProps } from "../@types/web"
import { AuthContext } from "../contexts/AuthContext"
import clsx from 'clsx'

const SideBarBody = ({ icon, text = 'Vazio', to, styleTooltip, isActive = false, deleteCookie = false, type, style }: SideBarIconProps) => {
  const iconsList = ['BiLogOut', 'FiHome', 'MdOutlineShoppingCart', 'GiCash', 'MdOutlineLocalPrintshop', 'BsCartCheck', 'FiSettings']
  const navigate = useNavigate()
  const activeRef = useRef<HTMLSpanElement>(null)
  const { current } = activeRef
  isActive ? current?.classList.remove('hidden') : current?.classList.add('hidden')
  const { signOut } = useContext(AuthContext)

  return (
    <div id={style} className='nav-icon group' onClick={() => {
      to && navigate(to)
      deleteCookie && signOut()
    }}>
      {icon}
      <span id={styleTooltip} className={clsx("group-hover:scale-100", {
        'headerbar-tooltip': type === 'header',
        'sidebar-tooltip': type === 'aside'
      })}>{text}</span>
      <span ref={activeRef} className={clsx('text-green-500 font-bold absolute', {
        'top-11': type === 'header',
        ['hidden left-14']: type === 'aside'
      })}>
        {type === 'header' ? '^' : '<'}
      </span>
    </div>
  )
}

const SideBar = ({ type, innerRef, refIconPrint, toggleStage, setToggleStage }: SideBarIconProps) => {

  return (
    <>
      {type === 'header' ? (
        <header ref={innerRef} className="nav mx-auto flex justify-center items-center rounded-b-full max-w-3xl border-b-2 w-[90%]" >
          <SideBarBody type='header' icon={<BiLogOut />} style="sidebar-logout" styleTooltip="sidebar-logout-tooltip" deleteCookie text="SAIR" to='/' />
          <SideBarBody type='header' icon={<FiHome />} text="Home" to='/' />
          <button onClick={() => setToggleStage!('Shop')}>
            <SideBarBody type='header' isActive={toggleStage === 'Shop' ? true : false} icon={<MdOutlineShoppingCart />} text='Shop' />
          </button>
          <button onClick={() => setToggleStage!('Farm')}>
            <SideBarBody type='header' isActive={toggleStage === 'Farm' ? true : false} icon={<GiCash />} text='Fazenda/Farm' />
          </button>
          <button ref={refIconPrint} style={{ display: 'none' }} onClick={window.print}>
            <SideBarBody type='header' icon={<MdOutlineLocalPrintshop />} text='Imprimir/Print' style="sidebar-print" styleTooltip="sidebar-print-tooltip" />
          </button>
          <button onClick={() => setToggleStage!('Cart')}>
            <SideBarBody type='header' style="sidebar-cart"
              styleTooltip="sidebar-cart-tooltip" isActive={toggleStage === 'Cart' ? true : false} icon={<BsCartCheck />} text='Carrinho/Cart' />
          </button>
          <button onClick={() => setToggleStage!('Settings')}>
            <SideBarBody type='header' style='sidebar-setting' isActive={toggleStage === 'Settings' ? true : false} icon={<FiSettings />} text='Configurações' />
          </button>
        </header>
      ) : (
        <aside ref={innerRef} className="nav fixed top-0 left-0 h-screen px-4 flex flex-col border-r-2">
          <SideBarBody type='aside' icon={<BiLogOut />} style="sidebar-logout" styleTooltip="sidebar-logout-tooltip" deleteCookie text="SAIR" to='/' />
          <SideBarBody type='aside' icon={<FiHome />} text="Home" to='/' />
          <button onClick={() => setToggleStage!('Shop')}>
            <SideBarBody type='aside' isActive={toggleStage === 'Shop' ? true : false} icon={<MdOutlineShoppingCart />} text='Shop' />
          </button>
          <button onClick={() => setToggleStage!('Farm')}>
            <SideBarBody type='aside' isActive={toggleStage === 'Farm' ? true : false} icon={<GiCash />} text='Fazenda/Farm' />
          </button>
          <button ref={refIconPrint} style={{ display: 'none' }} onClick={window.print}>
            <SideBarBody type='aside' icon={<MdOutlineLocalPrintshop />} text='Imprimir/Print' style="sidebar-print" styleTooltip="sidebar-print-tooltip" />
          </button>
          <button onClick={() => setToggleStage!('Cart')}>
            <SideBarBody type='aside' style="sidebar-cart"
              styleTooltip="sidebar-cart-tooltip" isActive={toggleStage === 'Cart' ? true : false} icon={<BsCartCheck />} text='Carrinho/Cart' />
          </button>
          <button onClick={() => setToggleStage!('Settings')}>
            <SideBarBody type='aside' style='sidebar-setting' isActive={toggleStage === 'Settings' ? true : false} icon={<FiSettings />} text='Configurações' />
          </button>
        </aside>
      )}
    </>
  )
}



export default SideBar


