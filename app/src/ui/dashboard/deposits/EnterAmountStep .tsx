import clsx from "clsx";


interface props {
  onNext: () => void
  onAmountChange: (a: number) => void
  amount: number 
}

export default function EnterAmountStep({ onNext, onAmountChange, amount}: props) {
  
  return (
    <div className="p-6 bg-secondary-color rounded-lg">
      <div className="flex flex-col">
        <label className="text-primary-color text-xl font-semibold mb-2 block">¿Cuánto querés ingresar a la cuenta?</label>
        <input
          type="number"
          placeholder="$0"
          value={amount > 0 ? amount  : ''}
          className="bg-white rounded-lg p-3 mt-4 w-full md:w-[300px] text-black text-base border-2 input-border"
          onChange={e => onAmountChange(Number(e.target.value))}
        />
        <button 
          onClick={onNext} 
          className={clsx("text-black font-semibold text-base p-3 mt-5 rounded-lg w-full md:w-[150px] md:self-end",{
              "btn-primary": amount > 0,
              "bg-gray-300" : !amount
              })}
          disabled={!amount}
          >
          Continuar
          </button>
      </div>
    </div>
  );
}