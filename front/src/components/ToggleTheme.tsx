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
    <div className="absolute flex items-center top-4 right-4 rounded-full p-3 text-3xl bg-[#f0f8ff70] dark:bg-black/[70%] shadow-md">
      {iconToggle ? (
        <CiLight className='iconTheme' onClick={themeSwitch} />
      ) : (
        <CiDark className='iconTheme' onClick={themeSwitch} />
      )}
    </div>
  )
}

export default ToggleTheme