import { Link } from 'react-router-dom'

import Logo from './Logo'


const HeaderHome = () => {
  return (
    <header className='p-5 shadow-lg rounded-br-[50px] dark:bg-black/[75%] bg-[#f0f8ff5b] w-2/5 headerHomeLinks2:w-3/5'>
        <Logo  />

        <nav className='border-t border-[#111218] dark:border-blue-400'>
            <ul className='mt-3 flex justify-center gap-32 logo2:gap-10 text-xl logo2:text-lg headerHomeLinks3:text-base logo1:text-sm logo1:gap-2'>
                <li><Link to='/create-account' className='headerLink'>Criar conta</Link></li>
                <li className='duration-200'><Link to='/login' className='!px-3 headerLink'>Login</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default HeaderHome