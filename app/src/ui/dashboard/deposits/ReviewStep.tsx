import { SquarePen } from "lucide-react";

interface props {
  onSubmit: () => void
  onBack: () => void
  amount: number
  cvu:string
}

export default function ReviewStep({onSubmit, onBack, amount, cvu }: props) {
 
  return (
    <div className="p-6 flex flex-col bg-secondary-color text-white rounded">
      <h2 className="text-primary-color text-xl font-semibold mb-6">Revisá que está todo bien</h2>
      <div className="flex gap-4 items-center mb-2">
        <p className="text-base text-white">Vas a transferir</p>
        <SquarePen className="text-primary-color" onClick={onBack}/>
      </div>
      <p><strong>${amount}</strong></p>
      <p className="mt-5 text-sm">Para</p>
      <p className="mt-1 mb-4 text-base font-bold">Cuenta propia</p>
      <p className="text-base text-gray-300">Brubank</p>
      <p className="text-sm text-gray-300">CVU {cvu}</p>
      <div className="mt-4 md:self-end">
        <button onClick={onSubmit} className="bg-primary-color text-black font-semibold p-3 mt-5 rounded-lg w-full md:w-[200px]">Continuar</button>
      </div>
    </div>
  );
}