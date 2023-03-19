import { InputProps } from "../@types/web"
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useRef, useState } from "react"




const Input = (props: InputProps) => {
  const [icon, setIcon] = useState(true)
  // useRef => Manipular DOM no React
  const inputRef = useRef<HTMLInputElement>(null)
  const { current } = inputRef

  const tooglePassword = () => {
    if(current) {
      if(current?.type === 'password') {
        current.type = 'text'
      }else {
        current.type = 'password'
      }
    }

    setIcon(!icon)
    current?.focus()
  }

  return (
    <div key={props.id} className="flex flex-col gap-2 mb-6 relative">
      {props.labelname && (
        <label className="font-bold text-[#111218] dark:text-[#ededed] text-base" htmlFor={props.id}>{props.labelname}</label>
      )}
      <input className="p-2 border-none rounded relative" name={props.type === 'radio' ? props.name : props.id} ref={props.id === 'password' ? inputRef : undefined} {...props}  />
      {/* {props.productNameIcon || props.productPriceIcon } */}

      {props.id === 'password' && icon && (
        <AiOutlineEye className="absolute top-[60%] right-3 text-xl fill-gray-500 hover:fill-gray-400 duration-200" onClick={tooglePassword} />
      )}
      {props.id === 'password' && !icon && (
        <AiOutlineEyeInvisible className="absolute top-[60%] right-3 text-xl fill-gray-500 hover:fill-gray-400 duration-200" onClick={tooglePassword} />
      )}

    </div>
  )
}

export default Input