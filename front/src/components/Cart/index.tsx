import { FormEvent, useContext, useLayoutEffect, useState } from "react"
import { SibeBarRefs } from "../../@types/web"
import { AuthContext } from "../../contexts/AuthContext"
import Modal from 'react-modal'
import { AiFillCloseSquare, AiFillDelete } from "react-icons/ai"
import { MdOutlineAttachMoney } from 'react-icons/md'
Modal.setAppElement('#root')
import './Cart.css'
import { useNavigate } from "react-router-dom"
import Table from "./Table"

const Cart = ({ asideIconPrintRef, headerIconPrintRef }: SibeBarRefs) => {
  const navigate = useNavigate()
  const { cart, getCart, user, totProd } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false)

  // get Cart
  if (!cart) {
    getCart()
  }

  // useLayoutEffect => You only want to use this hook when you need to do any DOM changes directly.
  // This hook is optimized, to allow the engineer to make changes to a DOM node directly before the browser has a chance to paint.
  useLayoutEffect(() => {
    // Show IconPrint from Sidebar
    if (headerIconPrintRef?.current?.style.display === 'none' || asideIconPrintRef?.current?.style.display === 'none') {
      if (headerIconPrintRef.current) headerIconPrintRef.current.style.display = 'block'
      if (asideIconPrintRef.current) asideIconPrintRef.current.style.display = 'block'
    }

  }, [])

  return (
    <div className="divMain flex flex-col justify-center max-w-4xl">
      <h1 className="text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 !max-w-sm mb-6 self-start">- Seu carrinho 🛒:</h1>
        
      <Table  />
      {cart && cart.length > 0 && (
        <div className="mx-auto mt-6">
          {/* Open Cash Modal */}
          <span onClick={() => setShowModal(true)} className="cashModal"><a href="#"></a></span>
        </div>
      )}
      

      {/* Cash Modal */}
      <Modal isOpen={showModal} overlayClassName='modalExterior' className='modalInterior flex-col dark:text-white p-6'>
        <AiFillCloseSquare className="modalIconClose" onClick={() => setShowModal(false)} />
        <h1 className="text-2xl mb-8">O total dos seus produtos é <span className="font-bold text-green-500">R$ {totProd.toFixed(2)}</span> !</h1>
        <div className="flex flex-col items-center gap-3 w-[40%]">
          <button onClick={() => setShowModal(false)} className="btn text-base bg-purple-500 w-[90%] font-thin">Continuar comprando 🛒</button>
          <span>OU</span>
          <button className="btn cashPayoutButton shadow-xl dark:after:bg-slate-100 after:bg-gray-800 w-full dark:text-black text-emerald-300 group font-semibold" onClick={() => navigate(`/payout/${user?.id}`)}>
            <span>OPÇÕES DE PAGAMENTO</span>
            <span className="group-hover:scale-105 payoutButton-tooltip"><MdOutlineAttachMoney className="fill-green-500 text-xl" /></span>
          </button>
        </div>
      </Modal>

    </div>
  )
}

export default Cart