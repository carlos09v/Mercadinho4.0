import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link className="inline-block ml-4" to='/'>
        <h1 className="dark:text-[#ededed] text-[#111218] text-5xl logo2:text-4xl logo1:text-3xl pb-2">Mercadinho <span className="bg-clip-text text-transparent bg-gradient-to-t from-[#E18700] to-[#F50057]">4.0</span></h1>
    </Link>
  )
}

export default Logo