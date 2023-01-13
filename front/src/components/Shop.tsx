import { motion } from "framer-motion"
import { FormEvent, useContext, useLayoutEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { CartProps } from "../@types/user"
import { api } from "../lib/axios"
import { MdShoppingCart } from 'react-icons/md'
import Input from "./Input"
import { CountContext } from "../contexts/CountContext"
import { AuthContext } from "../contexts/AuthContext"
import { SibeBarRefs } from "../@types/web"


const Shop = ({ asideRef, headerRef, asideIconPrintRef, headerIconPrintRef, setToggleStage }: SibeBarRefs) => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [cartDataRegister, setCartDataRegister] = useState({ productName: '', productPrice: '' })
  const { productsCount, getProductsUserCount } = useContext(CountContext)
  const { user, getUser, setCart } = useContext(AuthContext)

  const carousel = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  // DERIVED STATES
  // https://www.youtube.com/watch?v=kCpca2z2cls&t=636s
  // const filteredData = filter.length > 0 ? data.filter(repo => data.name.includes(filter)) : []

  // Get User and ProductsCount
  if (!user) {
    getUser()
    getProductsUserCount()
  }
  

  // useLayoutEffect => You only want to use this hook when you need to do any DOM changes directly.
  // This hook is optimized, to allow the engineer to make changes to a DOM node directly before the browser has a chance to paint.
  useLayoutEffect(() => {
    // Largura Máxima do Drag no Carrossel
    // console.log(carrossel.current?.scrollWidth, carrossel.current?.offsetWidth)
    if (carousel?.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }

    // Colocar o sidebar type no localstorage caso ñ tenha
    if (!localStorage.getItem('sidebar')) {
      localStorage.setItem('sidebar', 'header')
    } else if (localStorage.getItem('sidebar') === 'aside') {
      asideRef?.current?.classList.remove('hidden')
      headerRef?.current?.classList.add('hidden')
    } else {
      asideRef?.current?.classList.add('hidden')
    }

    // Hide IconPrint from Sidebar
    if (headerIconPrintRef?.current?.style.display === 'block' || asideIconPrintRef?.current?.style.display === 'block') {
      if (headerIconPrintRef.current) headerIconPrintRef.current.style.display = 'none'
      if (asideIconPrintRef.current) asideIconPrintRef.current.style.display = 'none'
    }
  }, [])

  const getDataAPI = async (e: FormEvent) => {
    e.preventDefault()

    // Validações
    if (search.length < 3) return toast.warn('Preencha o campo!')

  }

  // Register Product
  const handleCartRegister = async (e: FormEvent) => {
    e.preventDefault()

    // Validações
    if (cartDataRegister.productName === '' || cartDataRegister.productPrice === '') return toast.warn('Preencha os dados do PRODUTO!')
    if (cartDataRegister.productName.length <= 2 || cartDataRegister.productName.length > 16) return toast.warn('O NOME precisa ter entre 2 e 16 dígitos !')

    try {
      const { data } = await api.post('/create-product', {
        productName: cartDataRegister.productName,
        productPrice: parseFloat(cartDataRegister.productPrice)
      })

      toast.success(data.message)
      getProductsUserCount()
      setCart(null) // Resetar o setCart pra ele fazer outra request qndo entrar no cart
      setCartDataRegister({ productPrice: '', productName: '' })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="divMain flex flex-col items-center max-w-4xl">
      {productsCount && (
        <button className="btn absolute top-20 right-3 !max-w-[160px] !py-1 !px-1 dark:bg-blue-500/90 bg-[#E34382]/90 flex flex-col items-center justify-center gap-1" onClick={() => setToggleStage !== undefined ? setToggleStage('Cart') : null}>
          <span className="text-green-500 px-4 py-1 bg-[#111218e1] text-3xl shadow-lg rounded-md">{productsCount}</span>
          <div className="flex gap-2 items-center">
            Ver carrinho <MdShoppingCart />
          </div>
        </button>
      )}
      
      {/* <motion.h1 animate={{ x: 200, y: 100 }}>Bem-vindo(a) 😁 !</motion.h1> */}
      <h1 className="text-green-600 dark:text-green-400 border-green-600 dark:border-green-400 !max-w-sm mb-5 self-start">- Bem-vindo(a) 😁 !</h1>

      {/* SEARCH QUERY */}
      {/* <form onSubmit={getDataAPI} className="flex items-center justify-center gap-6">
        <Input
          id="search"
          placeholder="Procurar produto..."
          type="text"
          onChange={e => setSearch((e.target as HTMLTextAreaElement).value)}
          value={search}
        />

        <button type="submit" className="bg-green-600 !w-[100px] mb-4">Enviar</button>
      </form> */}

      {/* FILTER */}
      {search.length > 0 && (
        <div className="w-[25%]">
          <Input
            id="filter"
            placeholder="Buscar..."
            type="text"
            onChange={e => setFilter((e.target as HTMLTextAreaElement).value)}
            value={filter}
          />
        </div>
      )}


      {/* <motion.div ref={carousel} whileTap={{ cursor: 'grabbing' }} className="cursor-grab overflow-hidden">
        <motion.div className="flex items-center justify-center mx-auto" drag='x' dragConstraints={{ right: 0, left: -width }} initial={{ x: 100 }} animate={{ x: 0 }} transition={{ duration: .8 }}>
          {filter.length > 0 ? (
            <ul>
              {filteredData.map((data, i) => (
                <motion.div key={i} className="h-[200px] w-[300px] p-4">
                  <div>
                    <img className="w-full h-[90%] rounded-xl pointer-events-none" src={data.img} alt="Carrossel Items" />
                  </div>
                  <div>
                    <span>{data.name}</span>
                    <span>{data.price}</span>
                  </div>
                </motion.div>
              ))}
            </ul>
          ) : (
            <ul>
              {data.map((data, i) => (
                <motion.div key={i} className="h-[200px] w-[300px] p-4">
                  <div>
                    <img className="w-full h-[90%] rounded-xl pointer-events-none" src={data.img} alt="Carrossel Items" />
                  </div>
                  <div>
                    <span>{data.name}</span>
                    <span>{data.price}</span>
                  </div>
                </motion.div>
              ))}
            </ul>
          )}
        </motion.div>
      </motion.div> */}

      <span className="font-semibold text-lg underline text-black dark:text-gray-200">Coming soon...</span>

      <div className="register-container !min-h-0 mt-3">
        <h1 className="!text-2xl dark:text-white border-green-600 dark:border-green-400">Adicionar produto</h1>
        {productsCount && productsCount >= 24 ? (
          <div className="text-lg font-semibold text-center">
            <p className="text-purple-500 dark:text-purple-400 mt-2">- Você atingiu o limite máximo de produtos no carrinho :( </p>
            <p className="text-green-600 dark:text-green-400 mt-2">Conclua a sua compra !</p>
          </div>
        ) : (
          <form onSubmit={handleCartRegister} className="mx-auto">
            <p className="mt-3"></p>
            <div className="flex gap-10 justify-center">

              <div className="flex gap-5 items-center font-bold">
                <label htmlFor="productName" className="mb-4 dark:text-[#ededed]">Nome:</label>
                <Input
                  id="productName"
                  placeholder="Ex: Amendoim"
                  type="text"
                  maxLength={16}
                  onChange={(e: FormEvent) => setCartDataRegister({ ...cartDataRegister, productName: (e.target as HTMLTextAreaElement).value })}
                  value={cartDataRegister.productName}
                // productNameIcon={<MdShoppingCart className="absolute text-xl left-7 fill-white" />}
                />
              </div>

              <div className=" flex gap-5 items-center font-bold">
                <label htmlFor="productPrice" className="mb-4 dark:text-[#ededed]">Preço:</label>
                <Input
                  id="productPrice"
                  placeholder="Ex: 3.78"
                  type="number"
                  step="0.01"
                  maxLength={4}
                  max={1000000}
                  min={0.01}
                  onChange={(e: FormEvent) => setCartDataRegister({ ...cartDataRegister, productPrice: (e.target as HTMLInputElement).value })}
                  value={cartDataRegister.productPrice}
                // productPriceIcon={<MdAttachMoney className="absolute text-xl left-7 fill-white" />}
                />
              </div>
            </div>
            <button type="submit" className="bg-purple-600 mx-auto block max-w-[35%] text-base">Adicionar ao carrinho</button>
          </form>
        )}
      </div>

    </div>
  )
}

export default Shop