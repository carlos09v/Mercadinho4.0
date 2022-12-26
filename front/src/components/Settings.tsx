import { FormEvent, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { UserDataDB } from "../@types/user"
import { AuthContext } from "../contexts/AuthContext"
import { api } from "../lib/axios"
import Input from "./Input"

const Settings = () => {
  const [userDataRegister, setUserDataRegister] = useState<UserDataDB>({ name: '', avatarUrl: '' } || null)
  const { user, setUser } = useContext(AuthContext)

  const getUser = async() => {
    const { data } = await api.get('/me')
    setUser(data.userDB)
    setUserDataRegister({ name: data.userDB.name, avatarUrl: data.userDB.avatarUrl })
  }

  // Pegar o User Atualizado ao entrar no Settings
  useEffect(() => {
    // Pra n ter q ficar dando o get toda vez q entrar, coloquei pra ver se existe o user no contexto
    !user ? getUser() : setUserDataRegister({ name: user.name, avatarUrl: user.avatarUrl })
  }, [])

  // Save UserData
  const handleSaveUser = (e: FormEvent) => {
    e.preventDefault()

    // Validar
    if (userDataRegister.name === '' && userDataRegister.avatarUrl === '') return toast.warn('Preencha um dos campos!')

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

          <button type="submit" className="bg-green-500 hover:bg-green-400 duration-200">Enviar</button>
        </form>
      </div>

      <button className="btn bg-red-500 hover:bg-red-400 duration-200 !w-[18%] mt-6">Excluir conta</button>
    </div>
  )
}

export default Settings