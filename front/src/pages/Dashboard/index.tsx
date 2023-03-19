import { useLayoutEffect, useRef, useState } from "react"

import Settings from "../../components/Settings"
import SideBar from "../../components/Sidebar"
import Shop from "../../components/Shop"
import Cart from "../../components/Cart"
import './Dashboard.css'
import Farm from "../../components/Farm"

const Dashboard = () => {
  // NÃO CONSIGO USAR O CONTEXT
  // Obs: Uso o setUser e retorna o user null
  // Res => precisava prover (provider) pra aplicação
  const STAGES = ['Settings', 'Shop', 'Cart', 'Farm']
  const [toggleStage, setToggleStage] = useState(STAGES[1])
  const asideRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const asideIconPrintRef = useRef<HTMLButtonElement>(null)
  const headerIconPrintRef = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    // Colocar o sidebar type no localstorage caso ñ tenha
    if (!localStorage.getItem('sidebar')) {
      localStorage.setItem('sidebar', 'header')
    } else if (localStorage.getItem('sidebar') === 'aside') {
      asideRef?.current?.classList.remove('hidden')
      headerRef?.current?.classList.add('hidden')
    } else {
      asideRef?.current?.classList.add('hidden')
    }
    
  }, [])


  return (
    <>
      <SideBar type="header" innerRef={headerRef} refIconPrint={headerIconPrintRef} setToggleStage={setToggleStage} toggleStage={toggleStage}  />
      <SideBar type="aside" innerRef={asideRef} refIconPrint={asideIconPrintRef} setToggleStage={setToggleStage} toggleStage={toggleStage}  />
      

      {toggleStage === STAGES[0] && <Settings asideRef={asideRef} headerRef={headerRef} headerIconPrintRef={headerIconPrintRef} asideIconPrintRef={asideIconPrintRef} />}
      {toggleStage === STAGES[1] && <Shop headerIconPrintRef={headerIconPrintRef} asideIconPrintRef={asideIconPrintRef} setToggleStage={setToggleStage} />}
      {toggleStage === STAGES[2] && <Cart headerIconPrintRef={headerIconPrintRef} asideIconPrintRef={asideIconPrintRef} />}
      {toggleStage === STAGES[3] && <Farm headerIconPrintRef={headerIconPrintRef} asideIconPrintRef={asideIconPrintRef} />}
    </>
  )
}

export default Dashboard
