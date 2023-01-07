import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { SibeBarRefs } from "../@types/web"
import { AuthContext } from "../contexts/AuthContext"
import Modal from 'react-modal'
import { AiFillCloseSquare } from "react-icons/ai"
Modal.setAppElement('#root')

const Cart = ({ asideIconPrintRef, headerIconPrintRef }: SibeBarRefs) => {
  const { cart, getCart } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!cart) {
      getCart()
    }
  }, [])

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
      <h1 className="text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 !max-w-sm mb-5 self-start">Seu carrinho 🛒:</h1>

      {!cart || cart.length === 0 ? (
        <p className="text-lg font-semibold text-green-600 dark:text-green-400 text-center">- Não existe nenhum produto no carrinho :(</p>
      ) : (
        <div className="flex flex-col gap-6 items-center">
          <table className="max-w-[70%] mx-auto mt-4  dark:text-white rounded-lg overflow-hidden border-collapse shadow-lg">
            <thead>
              <tr className="text-xl bg-purple-400 dark:bg-blue-700">
                <th className="text-lg">No.</th>
                <th className="text-lg">Added_at</th>
                <th>Nome do Prod.</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((prod, i) => (
                <tr key={i} className='font-semibold'>
                  <td>{i + 1}</td>
                  <td>{new Date(prod.addedAt).toLocaleDateString()}</td>
                  <td>{prod.productName}</td>
                  <td className="dark:text-green-400">R$ {prod.productPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <button className="button-41 w-[25%] font-semibold" onClick={() => setShowModal(true)}>Ir para o CAIXA</button>
        </div>
      )}

      {/* Cash Modal */}
      <Modal isOpen={showModal} overlayClassName='modalExterior' className='modalInterior'>
        <AiFillCloseSquare className="modalIconClose" onClick={() => setShowModal(false)} />
        
      </Modal>


    </div>
  )
}

export default Cart