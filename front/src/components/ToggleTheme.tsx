import { useState } from 'react'
import { CiLight, CiDark } from 'react-icons/ci'

const ToggleTheme = () => {
  const [iconToggle, setIconToggle] = useState(localStorage.getItem('theme') === 'dark' ? true : false)

  // Manual Theme Switch
  const themeSwitch = () => {
    setIconToggle(!iconToggle)

    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark')
      return localStorage.setItem('theme', 'light')
    }

    document.documentElement.classList.add('dark'
    )
    localStorage.setItem('theme', 'dark')
  }

  return (
    <>
      <div className='absolute flex items-center top-4 right-4 rounded-full p-3 text-3xl bg-[#f0f8ff70] dark:bg-black/[70%] shadow-md'>
        {iconToggle ? (
          <CiLight className='cursor-pointer hover:scale-110 duration-200 dark:fill-blue-100' onClick={themeSwitch} />
        ) : (
          <CiDark className='fill-red-500 cursor-pointer hover:scale-110 duration-200' onClick={themeSwitch} />
        )}
      </div>
      
      {/* version */}
      <span className='absolute bottom-0 text-sm right-4 font-bold bg-green-400 dark:bg-purple-700 dark:text-white p-2 rounded-t-full'>v.1.5</span>
      
    </>
  )
}

export default ToggleTheme