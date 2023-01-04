import { useContext, useEffect, useLayoutEffect } from "react"
import { SibeBarRefs } from "../@types/web"
import { AuthContext } from "../contexts/AuthContext"

const Cart = ({ asideRef, headerRef, asideIconPrintRef, headerIconPrintRef }: SibeBarRefs) => {
  const { cart, getCart } = useContext(AuthContext)


  useEffect(() => {
    // if(!cart) {
    //   getCart()
    // }
  }, [])

  // useLayoutEffect => You only want to use this hook when you need to do any DOM changes directly.
  // This hook is optimized, to allow the engineer to make changes to a DOM node directly before the browser has a chance to paint.
  useLayoutEffect(() => {
    // Show IconPrint from Sidebar
    if(headerIconPrintRef?.current?.style.display === 'none' || asideIconPrintRef?.current?.style.display === 'none') {
      if(headerIconPrintRef.current) headerIconPrintRef.current.style.display = 'block'
      if(asideIconPrintRef.current) asideIconPrintRef.current.style.display = 'block'
    } 

  }, [])

  return (
    <div className="divMain flex flex-col  justify-center max-w-4xl">
      <h1 className="text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 !max-w-sm mb-5 self-start">Seu carrinho 🛒:</h1>

      {!cart ? (
        <p className="text-lg font-semibold text-green-600 dark:text-green-400 text-center">- Não existe nenhum produto no carrinho :(</p>
      ) : (
        <p>oi</p>
      )}
    </div>
  )
}

export default Cart