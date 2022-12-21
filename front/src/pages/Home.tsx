import HeaderHome from "../components/HeaderHome"
import { useEffect, useRef, useState } from "react"
import { motion } from 'framer-motion'

import Img1 from '../assets/3.jpg'
import HomeSvg from '../assets/sweet_home.svg'

const Home = () => {
  const images = [Img1, Img1, Img1, Img1, Img1, Img1]
  const carrossel = useRef<any>()
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // Largura Máxima do Drag no Carrossel
    // console.log(carrossel.current?.scrollWidth, carrossel.current?.offsetWidth)
    setWidth(carrossel.current?.scrollWidth - carrossel.current?.offsetWidth)
  }, [])
  
  return (
    <>
      <HeaderHome />
      
      <main className="divMain max-w-7xl">
        <div className="flex justify-around items-center justify-center">
          <div className="dark:text-[#ededed] text-[#111218] ">
            <h1 className="border-none !text-4xl">Simulando um</h1>
            <h1 className="border-[#111218] dark:border-blue-400 !text-5xl">E-commerce</h1>
          </div>

          <div>
            <img className="w-[400px]" src={HomeSvg} alt="HomeSvg" />
          </div>
        </div>


        {/* <motion.h1 animate={{ x: 200, y: 100 }}>Bem-vindo(a) 😁 !</motion.h1> */}
        <motion.div ref={carrossel} whileTap={{ cursor: 'grabbing' }} className="cursor-grab overflow-hidden">
          <motion.div  className="flex items-center justify-center mx-auto" drag='x' dragConstraints={{ right: 0, left: -width }} initial={{ x: 100 }} animate={{ x: 0 }} transition={{ duration: .8 }}>
            {images.map((img, i) => (
              <motion.div key={i} className="min-h-[200px] min-w-[300px] p-4">
                <img className="w-full h-[90%] rounded-xl pointer-events-none" src={img} alt="Carrossel Items" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </main>
    </>
  )
}

export default Home