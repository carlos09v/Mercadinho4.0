import { BsCash, BsFillCreditCard2BackFill, BsCardChecklist } from 'react-icons/bs'
import { PayoutProps } from '../../@types/web'

const ChoosePayout = ({ setCurrentStep, setInputPayout, inputPayout }: PayoutProps) => {
    return (
        <div className="choosePayout">
            <h1>- Escolha uma das opções de pagamento abaixo:</h1>
            <div className="options">
                <p><span><BsCash /></span>[ 1 ] Á vista dinheiro/cheque (<span>10% de desconto</span>)</p>
                <p><span><BsFillCreditCard2BackFill /></span>[ 2 ] Á vista Cartão débito (<span>5% de desconto</span>)</p>
                <p><span><BsFillCreditCard2BackFill /></span>[ 3 ] 2x no Cartão</p>
                <p><span><BsFillCreditCard2BackFill /></span>[ 4 ] Parcelar em até 12x no Cartão (<span id='juros'>20% de Juros</span>)</p>
            </div>
            
            <label className="mt-4" htmlFor="payoutOptions">Escolha uma opção:</label>
            <select className="mt-2 dark:text-black rounded" defaultValue={inputPayout} name="payoutOptions" id="payoutOptions" onChange={e => setInputPayout !== undefined ? setInputPayout(e.target.value) : null }>
                <option className='text-center' >--- ⬇️ ⬇️ ---</option>
                <option value="1">[1] Á vista dinheiro/cheque</option>
                <option value="2">[2] Á vista Cartão débito</option>
                <option value="3">[3] 2x no Cartão</option>
                <option value="4">[4] Parcelar até 12x no Cartão</option>
            </select>
            
            {parseInt(inputPayout) >= 1 && (
                <button onClick={() => setCurrentStep('ReviewPayout')} className='cashPayoutButton shadow-xl dark:after:bg-purple-500 after:bg-gray-800 w-full dark:text-white text-emerald-300 group font-semibold mt-6 btn max-w-[50%]' type='submit'>
                    <span>Revisar pagamento !</span>
                    <span className="group-hover:scale-105 payoutButton-tooltip left-[28rem]"><BsCardChecklist className="fill-green-500 text-xl" /></span>
                </button>
            )}

        </div>
    )
}

export default ChoosePayout