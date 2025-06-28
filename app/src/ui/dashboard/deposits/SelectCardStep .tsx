import { LINK_BUTTON_ACTIONS } from '@/constants/constants';
import { Card } from '@/types/card';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

interface props {
  onNext: () => void
  onSelect: (a : number) => void
  selected: number | undefined
  cards:Card[]
}

export default function SelectCardStep({ onNext, onSelect, selected, cards }: props) {
  
  return (
    <div className="p-6 bg-secondary-color text-white rounded">
      <h2 className="text-primary-color font-bold text-xl mb-4">Seleccionar tarjeta</h2>
      <div className="bg-white p-4 rounded-lg text-black mb-4">
        {cards.map(card => (
          <div key={card.id} className="flex items-center justify-between mb-4 p-4 border-b-1 border-gray-200">
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-primary-color"></span>
              {`Terminada en ${card.number_id.toString().slice(-4)}`}
            </span>
            <input className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-black checked:border-lime-600"  type="radio" name="card" checked={selected === card.id} onChange={() => onSelect(card.id)} />
          </div>
        ))}
        </div>
        <div className='flex flex-col justify-between items-center gap-4 md:flex md:flex-row'>
          <div className='flex w-full gap-4 mt-4 items-center'>
            <PlusCircle className='text-primary-color w-8 h-8 boder-1'/>
            <Link href={LINK_BUTTON_ACTIONS['Nueva Tarjeta'].href} className='text-primary-color font-bold text-base'>
              Nueva tarjeta
            </Link>
          </div>
          <div className='bg-secondary-color text-white rounded w-full mt-5 md:w-[210px] md:self-end'>
            <button
            className=" text-black text-base btn-primary p-3 font-bold rounded-lg  w-full"
            onClick={onNext}
            disabled={!selected}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}