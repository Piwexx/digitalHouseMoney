'use client'
import { Card } from '@/types/card';
import { deleteCard } from '@/services/card';
import { ToastContainer, toast } from 'react-toastify';
import {useRouter} from "next/navigation";

interface Props {
  card: Card;
  accountId: number;
  token: string;
}

export default function CardItem({ card, accountId, token }: Props) {
  const router = useRouter();
  
  const topRight = () => {
    toast.success('Hey 👋!, Tarjeta eliminada correctamente', {
      position: 'top-right',
    });
  };
  
  const topRightError = () => {
        toast.error('Hey 👋!, no se pudo eliminar la tarjeta', {
          position: 'top-right',
        });
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCard(accountId, id, token);
      topRight()
      router.refresh();
    } catch (error) {
      topRightError()
    }
  };

  return (
    <li className='flex  justify-between items-center border-b-2 border-gray-200 p-2 '>
      <div className='flex items-center gap-2'>
        <span className='text-secondary-color w-4 h-4 bg-primary-color rounded-full' />
        <p className='text-secondary-color text-base'>{`Terminada en ${card.number_id
          .toString()
          .slice(-4)}`}</p>
      </div>
       <ToastContainer />
      <div>
        <button
          className='text-black font-bold text-base cursor-pointer'
          onClick={() => handleDelete(card.id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}
