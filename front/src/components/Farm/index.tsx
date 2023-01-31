import { useContext, useLayoutEffect } from "react"
import { SibeBarRefs } from "../../@types/web"
import { CountContext } from "../../contexts/CountContext"
import Tree from '../../assets/tree1-unsplash.jpg'
import { api } from "../../lib/axios"
import { AuthContext } from "../../contexts/AuthContext"
import { toast } from "react-toastify"


const Farm = ({ asideIconPrintRef, headerIconPrintRef }: SibeBarRefs) => {
  const { cashCount, setCashCount } = useContext(CountContext)
  const { setUser, user } = useContext(AuthContext)

  const saveMoney = async () => {
    try {
      const { data } = await api.put('/save-money', {
        cash: cashCount
      })

      setUser({ ...user!, cash: data.user.cash })
      setCashCount(0)
      toast.success(data.message)
    } catch (error) {
      console.log(error)
      toast.error('Ocorreu algum erro !')
    }
  }

  // useLayoutEffect => You only want to use this hook when you need to do any DOM changes directly.
  // This hook is optimized, to allow the engineer to make changes to a DOM node directly before the browser has a chance to paint.
  useLayoutEffect(() => {
    // Hide IconPrint from Sidebar
    if (headerIconPrintRef?.current?.style.display === 'block' || asideIconPrintRef?.current?.style.display === 'block') {
      if (headerIconPrintRef.current) headerIconPrintRef.current.style.display = 'none'
      if (asideIconPrintRef.current) asideIconPrintRef.current.style.display = 'none'
    }
  }, [])

  return (
    <div className="divMain flex flex-col justify-center items-center max-w-4xl gap-6">
      <div className="bg-blackModified dark:bg-whiteModified dark:text-blackModified text-white p-3 text-3xl rounded-lg">R$ <span className="font-semibold">{cashCount.toFixed(2)}</span></div>

      <div className="w-[460px] h-[460px] rounded-full bg-gray-300 border-2 border-green-500 p-3 mt-2">
        <img src={Tree} alt="AvatarUrl" className="w-full h-full rounded-full hover:scale-105 duration-300 cursor-pointer" onClick={() => setCashCount(prevState => prevState += 0.20)} />
      </div>

      {cashCount ? (
        <button onClick={saveMoney} className="btn bg-purple-500 mt-4">Salvar na Carteira</button>
      ): (
        <div className="dark:text-whiteModified flex flex-col items-center">
          <p>👆 Clique na imagem para fazer dinheiro 👆</p>
          <i className="text-sm">(Obs: 20 cents per Click)</i>
        </div>
      )}
    </div>
  )
}

export default Farm