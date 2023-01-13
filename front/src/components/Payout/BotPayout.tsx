
const BotPayout = () => {
    return (
        <div className="absolute top-4 left-2 flex flex-col items-center bg-blue-400 rounded-lg p-1 dark:bg-blue-500 border-dashed border-2 hidden">
            <span className="block">Horário: <span className="dark:text-green-300">{new Date().toLocaleTimeString()}</span></span>
            <span className="font-thin">Olá, me chamo Cleitin 😊</span>
            <span>Em que posso ajudar ?</span>
        </div>
    )
}

export default BotPayout