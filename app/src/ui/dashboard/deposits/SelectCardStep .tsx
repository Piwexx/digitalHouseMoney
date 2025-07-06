import { LINK_BUTTON_ACTIONS } from '@/constants/constants';
import { Card } from '@/types/card';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { UseFormSetValue, UseFormTrigger, Control } from 'react-hook-form'; // Import Controller if using it
import { TransferWizardFormInputs } from '@/schemas/transferWizard';
import clsx from 'clsx';

interface Props {
  onNext: () => void;
  cards: Card[];
  // RHF props
  setValue: UseFormSetValue<TransferWizardFormInputs>;
  trigger: UseFormTrigger<TransferWizardFormInputs>;
  currentSelection?: number; // from getValues('selectedCardId')
  error?: string;
  control: Control<TransferWizardFormInputs>; // Keep for Controller if needed, otherwise can remove
}

export default function SelectCardStep({ onNext, cards, setValue, trigger, currentSelection, error }: Props) {
  
  const handleSelect = (cardId: number) => {
    setValue('selectedCardId', cardId, { shouldValidate: true, shouldDirty: true });
    // Trigger validation explicitly if needed, though setValue with shouldValidate should do it.
    // trigger('selectedCardId');
  };

  return (
    <div className="p-6 bg-secondary-color text-white rounded">
      <h2 className="text-primary-color font-bold text-xl mb-4">Seleccionar tarjeta</h2>
      <div className={clsx("bg-white p-4 rounded-lg text-black mb-4", { "border-2 border-red-500": error })}>
        {cards.length === 0 && <p className="text-center text-gray-500">No tienes tarjetas agregadas.</p>}
        {cards.map(card => (
          <label // Use label for better accessibility with radio buttons
            key={card.id}
            className="flex items-center justify-between mb-4 p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 last:border-b-0"
            htmlFor={`card-${card.id}`}
          >
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-primary-color"></span>
              {`Terminada en ${card.number_id.toString().slice(-4)}`}
            </span>
            <input
              id={`card-${card.id}`}
              className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-black checked:border-lime-600 focus:ring-2 focus:ring-lime-500"
              type="radio"
              name="selectedCardId" // RHF will manage this through setValue
              checked={currentSelection === card.id}
              onChange={() => handleSelect(card.id)}
              value={card.id} // Good practice to have a value attr
            />
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <div className='flex flex-col justify-between items-center gap-4 md:flex md:flex-row'>
        <div className='flex w-full gap-4 mt-4 items-center'>
          <PlusCircle className='text-primary-color w-8 h-8'/> {/* Removed boder-1, likely a typo */}
          <Link href={LINK_BUTTON_ACTIONS['Nueva Tarjeta'].href} className='text-primary-color font-bold text-base'>
            Nueva tarjeta
          </Link>
        </div>
        <div className='bg-secondary-color text-white rounded w-full mt-5 md:w-[210px] md:self-end'>
          <button
            type="button" // Ensure it doesn't submit if a parent form exists by chance
            className=" text-black text-base btn-primary p-3 font-bold rounded-lg w-full disabled:opacity-50 disabled:bg-gray-300"
            onClick={onNext}
            disabled={currentSelection === undefined} // Disable if no card is selected
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}