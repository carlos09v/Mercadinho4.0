import { FormEvent, useContext, useEffect, useLayoutEffect, useState } from "react"
import { SibeBarRefs } from "../../@types/web"
import { AuthContext } from "../../contexts/AuthContext"
import Modal from 'react-modal'
import { AiFillCloseSquare, AiFillDelete } from "react-icons/ai"
import { MdOutlineAttachMoney } from 'react-icons/md'
Modal.setAppElement('#root')
import './Cart.css'
import { api } from "../../lib/axios"
import { toast } from "react-toastify"
import { CountContext } from "../../contexts/CountContext"
import Pagination from "./TablePagination"

const Cart = ({ asideIconPrintRef, headerIconPrintRef }: SibeBarRefs) => {
  const { cart, getCart } = useContext(AuthContext)
  const { setProductsCount } = useContext(CountContext)
  const [showModal, setShowModal] = useState(false)
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8
  const lastProductIndex = currentPage * productsPerPage
  const firstProductIndex = lastProductIndex - productsPerPage
  const currentProducts = cart?.slice(firstProductIndex, lastProductIndex)
  // TotProductsPrice
  let totPrice = 0
  if(cart) {
    cart.forEach(prod => {
      totPrice += prod.productPrice
    })
  }

  useEffect(() => {
    if (!cart) {
      getCart()
    }
  }, [])

  // Delete Product
  const deleteProduct = async(e: FormEvent, id: string) => {
    e.preventDefault()

    try {
      const { data } = await api.delete(`/delete-product/${id}`)
      
      toast.success(data.message)
      getCart()
      setProductsCount(null)
    }catch (err: any) {
      if(err.response) return toast.error(err.response.data.errorMessage)
    }
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
      <h1 className="text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 !max-w-sm mb-5 self-start">Seu carrinho 🛒:</h1>

      {!cart || cart.length === 0 ? (
        <p className="text-lg font-semibold text-green-600 dark:text-green-400 text-center">- Não existe nenhum produto no carrinho :(</p>
      ) : (
        <div className="flex flex-col gap-6 items-center">
          <table className="max-w-[70%] mx-auto mt-4 dark:text-white rounded-lg overflow-hidden border-collapse shadow-lg">
            <thead>
              <tr className="text-xl bg-purple-400 dark:bg-blue-700">
                <th className="text-lg">No.</th>
                <th></th>
                <th>Nome do Prod.</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts?.map((prod, i) => (
                <tr key={i} className='font-semibold'>
                  <td>{i + 1}</td>
                  <td>{new Date(prod.addedAt).toLocaleDateString()}</td>
                  <td>{prod.productName}</td>
                  <td className="dark:text-green-400">R$ {prod.productPrice}</td>
                  <td className="absolute ml-3 rounded p-2 bg-red-500 cursor-pointer hover:scale-105 duration-300 group" onClick={e => deleteProduct(e, prod.id)}>
                    <AiFillDelete className="fill-white/90 hover:fill-white text-lg duration-300" />
                    <span className="deleteProduct-tooltip group-hover:scale-100">Excluir</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Table Paginaton  */}
          <Pagination totalProducts={cart.length} productsPerPage={productsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
          
          <button className="cashModal mt-4" onClick={() => setShowModal(true)}><span></span></button>

        </div>
      )}

      {/* Cash Modal */}
      <Modal isOpen={showModal} overlayClassName='modalExterior' className='modalInterior flex-col dark:text-white p-6'>
        <AiFillCloseSquare className="modalIconClose" onClick={() => setShowModal(false)} />
        <h1 className="text-2xl mb-8">O total dos seus produtos é <span className="font-bold text-green-500">R$ {totPrice.toFixed(2)}</span> !</h1>
        <div className="flex flex-col items-center gap-3 w-[40%]">
          <button onClick={() => setShowModal(false)} className="btn text-base bg-purple-500 w-[90%] font-thin">Continuar comprando 🛒</button>
          <span>OU</span>
          <button className="btn cashPayoutButton shadow-xl dark:after:bg-slate-100 after:bg-gray-800 w-full dark:text-black text-emerald-300 group font-semibold">
            OPÇÕES DE PAGAMENTO
            <span className="group-hover:scale-105 payoutButton-tooltip"><MdOutlineAttachMoney className="fill-green-500 text-xl" /></span>
          </button>
        </div>
        
      </Modal>


    </div>
  )
}

export default Cart