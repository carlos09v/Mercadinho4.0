import { useContext } from 'react'
import { useNavigate } from "react-router-dom"

import { SideBarIconProps } from "../@types/web"
import { AuthContext } from "../contexts/AuthContext"

const SideBarIcon = ({ icon, text = 'Vazio', to, style, styleTooltip, deleteCookie = false }: SideBarIconProps) => {
  const navigate = useNavigate()
  const { signOut } = useContext(AuthContext)
 
  return (
    <div id={`${style}`} className="nav-icon group" onClick={() => {
      to && navigate(`${to}`)
      deleteCookie && signOut()
      }}>
        {icon}
        <span id={`${styleTooltip}`} className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  )
}

const HeaderBarIcon = ({ icon, text = 'Vazio', to, style, styleTooltip, deleteCookie = false }: SideBarIconProps) => {
  const navigate = useNavigate()
  const { signOut } = useContext(AuthContext)
 
  return (
    <div id={`${style}`} className="nav-icon group" onClick={() => {
      to && navigate(`${to}`)
      deleteCookie && signOut()
      }}>
        {icon}
        <span id={`${styleTooltip}`} className="headerbar-tooltip group-hover:scale-100">{text}</span>
    </div>
  )
}



export { SideBarIcon, HeaderBarIcon }


