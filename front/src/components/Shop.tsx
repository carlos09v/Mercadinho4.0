import { useState } from "react"
import Input from "./Input"


const Shop = () => {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  // DERIVED STATES
  // https://www.youtube.com/watch?v=kCpca2z2cls&t=636s
  // const filteredData = search.length > 0 ? data.filter(repo => data.name.includes(search)) : []

  return (
    <div className="divMain flex flex-col  justify-center max-w-4xl">
         {/* <motion.h1 animate={{ x: 200, y: 100 }}>Bem-vindo(a) 😁 !</motion.h1> */}
        <h1 className="text-green-600 dark:text-green-400 border-green-600 dark:border-green-400 !max-w-sm mb-5">Bem-vindo(a) 😁 !</h1>
        
        {/* FILTER */}
        <div className="w-[50%] mx-auto">
          <Input
            id="search"
            placeholder="Buscar..."
            type="text"
            onChange={e => setSearch((e.target as HTMLTextAreaElement).value)}
            value={search}
          />
        </div>

        {/* { search.length > 0 ? (

        ) : (

        )} */}
        
    </div>
  )
}

export default Shop