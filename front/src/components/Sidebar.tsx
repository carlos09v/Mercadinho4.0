import { useContext, useRef } from 'react'
import { useNavigate } from "react-router-dom"

import { SideBarIconProps } from "../@types/web"
import { AuthContext } from "../contexts/AuthContext"

const SideBarIcon = ({ icon, text = 'Vazio', to, style, styleTooltip, deleteCookie = false, isActive = false }: SideBarIconProps) => {
  const navigate = useNavigate()
  const activeRef = useRef<HTMLSpanElement>(null)
  const { current } = activeRef
  isActive ? current?.classList.remove('hidden') : current?.classList.add('hidden')
  const { signOut } = useContext(AuthContext)
 
  return (
    <div id={style} className="nav-icon group" onClick={() => {
      to && navigate(to)
      deleteCookie && signOut()
      }}>
        {icon}
        <span id={styleTooltip} className="sidebar-tooltip group-hover:scale-100">{text}</span>
        <span ref={activeRef} className='text-green-500 absolute left-14 font-bold'>{'<'}</span>
    </div>
  )
}

const HeaderBarIcon = ({ icon, text = 'Vazio', to, style, styleTooltip, deleteCookie = false, isActive = false }: SideBarIconProps) => {
  const navigate = useNavigate()
  const activeRef = useRef<HTMLSpanElement>(null)
  const { current } = activeRef
  isActive ? current?.classList.remove('hidden') : current?.classList.add('hidden')
  const { signOut } = useContext(AuthContext)
 
  return (
    <div id={style} className="nav-icon group" onClick={() => {
      to && navigate(to)
      deleteCookie && signOut()
      }}>
        {icon}
        <span id={styleTooltip} className="headerbar-tooltip group-hover:scale-100">{text}</span>
        <span ref={activeRef} className='text-green-500 absolute top-11 font-bold hidden'>^</span>
    </div>
  )
}



export { SideBarIcon, HeaderBarIcon }


