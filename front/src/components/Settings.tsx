import { FormEvent, useContext, useEffect, useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { UserDataDB } from "../@types/user"
import { SibeBarRefs } from "../@types/web"
import { AuthContext } from "../contexts/AuthContext"
import { AiFillCloseSquare } from "react-icons/ai"
import Modal from 'react-modal'
Modal.setAppElement('#root')
import { api } from "../lib/axios"
import Input from "./Input"

const Settings = ({ asideRef, headerRef, asideIconPrintRef, headerIconPrintRef }: SibeBarRefs) => {
  const [userDataRegister, setUserDataRegister] = useState<UserDataDB>({ name: '', avatarUrl: '' })
  const [confirmEmail, setConfirmEmail] = useState('')
  const { user, setUser, signOut } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()


  // Pegar o User Atualizado ao entrar no Settings
  useEffect(() => {
    // Pra n ter q ficar dando o get toda vez q entrar, coloquei pra ver se existe o user no contexto
    user ? setUserDataRegister({ name: user.name, avatarUrl: user.avatarUrl }) : navigate(0)
  }, [])

  // useLayoutEffect => You only want to use this hook when you need to do any DOM changes directly.
  // This hook is optimized, to allow the engineer to make changes to a DOM node directly before the browser has a chance to paint.
  useLayoutEffect(() => {
    // Hide IconPrint from Sidebar
    if(headerIconPrintRef?.current?.style.display === 'block' || asideIconPrintRef?.current?.style.display === 'block') {
      if(headerIconPrintRef.current) headerIconPrintRef.current.style.display = 'none'
      if(asideIconPrintRef.current) asideIconPrintRef.current.style.display = 'none'
    }  
  }, [])

  // Save UserData
  const handleSaveUser = (e: FormEvent) => {
    e.preventDefault()

    // Validar
    if (userDataRegister.name === '' && userDataRegister.avatarUrl === '') return toast.warn('Preencha os dos campos!')
    if(userDataRegister.avatarUrl === '') return toast.warn('Não é possivel remover sua foto ! (Coloque outra no lugar :)')
    // Evitar dar outro post se os dados do user forem os mesmos !
    if(user?.avatarUrl === userDataRegister.avatarUrl && user?.name === userDataRegister.name) return toast.warn('Nenhuma alteração feita!')

    // Update
    api.put('/update-user', {
      name: userDataRegister.name,
      avatarUrl: userDataRegister.avatarUrl
    }).then(res => {
      setUser(res.data.user)
      toast.success(res.data.message)
    }).catch(err => {
      console.log(err)
    })
  }

  // Delete Account
  const deleteAccountBtn = async(e: FormEvent) => {
    e.preventDefault()
    if(confirmEmail === '') return toast.warn('Preencha o campo !')

    try {
      const { data } = await api.delete(`/delete-user/${confirmEmail}`)

      toast.success(data.message)
      signOut()
      navigate('/')
    }catch (err: any) {
      if(err.response) return toast.error(err.response.data.message)
    }
  }

  return (
    <div className="divMain flex flex-col  justify-center max-w-4xl">
      <h1 className="text-gray-500 dark:text-gray-300 border-gray-500">Configurações</h1>

      <div className="flex mt-8 gap-12 items-center justify-center">

        {user?.avatarUrl && (
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-full bg-gray-300 border-2 border-gray-500 p-1">
              <img src={user.avatarUrl} alt="AvatarUrl" className="w-full rounded-full hover:scale-105 duration-300" />
            </div>
            {user?.name && (
              <p className="mt-4 font-semibold dark:text-[#ededed]">{user.name}</p>
            )}
          </div>
        )}

        <hr />

        <form onSubmit={handleSaveUser} className="flex flex-col w-6/12 p-4">
          <Input
            labelName="Nome:"
            id="name"
            placeholder="Insira seu Nome"
            maxLength={20}
            type='text'
            value={userDataRegister.name}
            onChange={(e: FormEvent) => setUserDataRegister({ ...userDataRegister, name: (e.target as HTMLTextAreaElement).value })}
          />

          <Input
            labelName="Foto de Perfil:"
            id="avatar"
            placeholder="Insira a URL da Imagem"
            type='url'
            value={userDataRegister.avatarUrl}
            onChange={(e: FormEvent) => setUserDataRegister({ ...userDataRegister, avatarUrl: (e.target as HTMLTextAreaElement).value })}
          />

          <button type="submit" className="bg-green-600 hover:bg-green-500 duration-200">Enviar</button>
        </form>
      </div>

      <hr className="my-6 bg-purple-500" />

      <div className="flex justify-around  dark:text-[#ededed] p-2">
        <div className="border-r-2 border-[#111218] dark:border-[#ededed] w-[50%]">
          <h2 className="text-center mb-4 max-w-[200px] border-b-2 border-purple-500 dark:border-blue-400 text-3xl rounded-b-xl">Interface:</h2>
          <div className="flex gap-8 border border-black dark:border-blue-400 bg-purple-500 dark:bg-blue-600/70 p-3 rounded font-bold items-center justify-center max-w-sm mx-auto text-white">
            <div className="flex flex-col items-center gap-3">
              <label htmlFor="setHeaderBar">Barra Superior</label>
              <input type="radio" name="radioSettings" id="setHeaderBar" defaultChecked={localStorage.getItem('sidebar') === 'header' ? true : false} onChange={() => {
                asideRef?.current?.classList.add('hidden')
                headerRef?.current?.classList.remove('hidden')
                localStorage.setItem('sidebar', 'header')
              }} />
            </div>

            <div className="flex flex-col items-center gap-3">
              <label htmlFor="setSideBar">Barra Lateral</label>
              <input type="radio" name="radioSettings" id="setSideBar" defaultChecked={localStorage.getItem('sidebar') === 'aside' ? true : false} onChange={() => {
                headerRef?.current?.classList.add('hidden')
                asideRef?.current?.classList.remove('hidden')
                localStorage.setItem('sidebar', 'aside')
              }} />
            </div>
          </div>
        </div>

        <div className="w-[50%] ml-4">
          <h2 className="mb-4 max-w-[220px] border-b-2 border-purple-500 dark:border-blue-400 text-3xl rounded-b-xl text-center">Privacidade:</h2>
          <button className="btn bg-red-500 !w-[40%] !text-base mx-auto block" onClick={() => setShowModal(true)}>Excluir conta</button>
          <p className="absolute right-0 bottom-0 text-sm">Made by <a href="https://github.com/carlos09v" target="_blank">@carlos09v</a> ✌️</p>
        </div>
      </div>

      {/* Confirm Delete Account Modal */}
      <Modal isOpen={showModal} overlayClassName='modalExterior' className='modalInterior'>
        <AiFillCloseSquare className="modalIconClose" onClick={() => setShowModal(false)} />
        <form onSubmit={deleteAccountBtn}>
          <p className="dark:text-blue-500 text-purple-500 font-semibold mb-4 text-lg">Tem certeza que deseja excluir sua conta ?</p>
          <div className="flex gap-3 items-center">
            <label htmlFor="emailDeleteAccount" className="dark:text-white">Email:</label>
            <input type="email" id="emailDeleteAccount" placeholder="Insira o seu email para confirmar..." className="p-3 rounded-2xl w-full" onChange={(e: FormEvent) => setConfirmEmail((e.target as HTMLTextAreaElement).value) } />
          </div>
          <button className="btn bg-red-500 mx-auto block mt-4" type="submit">Excluir</button>
        </form>
      </Modal>


    </div>
  )
}

export default Settings