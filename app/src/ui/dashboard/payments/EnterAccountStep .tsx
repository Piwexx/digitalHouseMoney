import clsx from "clsx";


interface props {
  onNext: () => void
  onAccountChange: (a: string) => void
  account: string
}

export default function EnterAccountStep({ onNext, onAccountChange , account}: props) {

  return (
    <div className="p-6 bg-secondary-color rounded-lg">
      <div className="flex flex-col">
        <label className="text-primary-color text-xl font-semibold mb-2 block">Número de cuenta sin el primer 2</label>
        <input
          type="text"
          placeholder="00000000000"
          value={account}
          className="bg-white rounded-xl p-3 mt-4 w-full md:w-[400px] text-black text-base border-2 input-border"
          onChange={e => onAccountChange(e.target.value)}
        />
        <p className="text-xs text-gray-200 text-wrap mt-1">Son 11 números sin espacios, sin el “2” inicial. Agregá ceros adelante si tenés menos.</p>
        <button 
          onClick={onNext} 
          className={clsx("text-black font-semibold text-base p-3 mt-5 rounded-lg w-[150px] self-end",{
              "btn-primary": (Number(account.length)  === 11 && account[0] !==  '2' ),
              "bg-gray-100" : !(Number(account.length)  === 11 && account[0] !==  '2' )
              })}
          disabled={!(Number(account.length)  === 11 && account[0] !==  '2' )}
          >
          Continuar
          </button>
      </div>
    </div>
  );
}