import { Card } from '@/types/card';
import { Service } from '@/types/service';
import clsx from 'clsx';

interface props {
  onNext: () => void
  onSelect: (a : number) => void
  selected: Card
  cards:Card[]
  service:Service
}

export default function SelectCardStep({ onNext, onSelect, selected, cards, service }: props) {
  
  return (
    <>
      <div className="p-6 bg-secondary-color text-white rounded">
        <h2 className="text-primary-color font-bold text-lg mb-4 p-2 border-b-1 border-b-gray-300">{service.name}</h2>
        <div className='flex justify-between w-full p-2'>
          <h3 className='text-base font-bold'>Total a pagar</h3>
          <p className='text-base font-bold'>${service.invoice_value}</p>
        </div>
      </div>
      <div>
        <div className="bg-white p-4 rounded-lg text-black mb-4 mt-4">
          <h4 className='text-black font-bold p-4 mb-2 border-b-1 border-gray-300'>Tus Tarjetas</h4>
          {cards.map(card => (
            <div key={card.id} className="flex items-center justify-between mb-4 p-4 border-b-1 border-gray-200">
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-primary-color"></span>
                {`Terminada en ${card.number_id.toString().slice(-4)}`}
              </span>
              <input className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-black checked:border-lime-600"  type="radio" name="card" checked={selected.id === card.id} onChange={() => onSelect(card.id)} />
            </div>
          ))}
          </div>
          <div className='flex items-center justify-end mt-5'>
              <button
              className={clsx("text-black text-base  p-3 font-bold rounded-lg w-[210px]",{
                "bg-gray-300": !selected,
                 "btn-primary" : selected
              })}
              onClick={onNext}
              disabled={!selected}
            >
              Pagar
            </button>
        </div>
      </div>
    </>
  );
}