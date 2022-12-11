import { InputProps } from "../@types"
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useState } from "react"


const Input = (props: InputProps) => {
  const [passwordShown, setPasswordShown] = useState(false)
  const tooglePassword = () => {
    const input = document.getElementById('password')
    setPasswordShown(!passwordShown)
    // passwordShown ? "text" : "password"
  }

  return (
    <div key={props.id} className="flex flex-col gap-2 mb-6 relative">
        <label className="font-bold text-[#111218] dark:text-[#ededed] text-base" htmlFor={props.id}>{props.labelName}</label>
        <input id={props.id} name={props.id} value={props.value} className="p-2 border-none rounded" type={props.type} placeholder={props.placeholder} onChange={props.onChange} maxLength={props.maxLength} />
        
        {props.id === 'password' && (
          <AiOutlineEye className="absolute top-[60%] right-3 text-xl fill-gray-500" onClick={tooglePassword} />
        )}
        

    </div>
  )
}

export default Input