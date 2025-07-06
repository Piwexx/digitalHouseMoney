'use client';
import React from 'react';
import { Card } from '@/types/card';
import { deleteCard } from '@/services/card';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Button from '../../common/Button';
import { Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext'; // Import useAuth

interface Props {
  card: Card;
  // accountId and token will come from context
}

const CardItem: React.FC<Props> = ({ card }) => { // Removed accountId, token from props
  const router = useRouter();
  const { accountId, token } = useAuth(); // Get auth data from context

  // Note: <ToastContainer /> should be placed once in your app's layout (e.g., app/layout.tsx)
  // Remove it from here if it's rendered per item.

  const notifyCardDeleted = () => {
    toast.success('Tarjeta eliminada correctamente', {
      position: 'top-right',
    });
  };

  const notifyDeleteError = () => {
    toast.error('No se pudo eliminar la tarjeta. Intenta de nuevo.', {
      position: 'top-right',
    });
  };

  const handleDelete = async (id: number) => {
    // Add confirmation before deleting
    if (window.confirm(`¿Estás seguro de que deseas eliminar la tarjeta terminada en ${card.number_id.toString().slice(-4)}?`)) {
      try {
        await deleteCard(accountId, id, token);
        notifyCardDeleted();
        router.refresh(); // Refreshes Server Components and re-fetches data
      } catch (error) {
        console.error('Error deleting card:', error); // Log the actual error
        notifyDeleteError();
      }
    }
  };

  const last4Digits = card.number_id.toString().slice(-4);

  return (
    <li className='flex justify-between items-center border-b-2 border-gray-200 p-2'>
      <div className='flex items-center gap-2'>
        <span className='w-4 h-4 bg-primary-color rounded-full' aria-hidden="true" />
        <p className='text-secondary-color text-base'>{`Terminada en ${last4Digits}`}</p>
      </div>
      {/* <ToastContainer />  Ensure this is not rendered per item - move to global layout */}
      <div>
        <Button
          variant="destructive-tertiary" // Use the new variant for destructive text buttons
          onClick={() => handleDelete(card.id)}
          aria-label={`Eliminar tarjeta terminada en ${last4Digits}`}
          className="p-1" // Keep it compact like a text button
          size="medium" // Or a new 'small' size if needed for compact text buttons
          leftIcon={<Trash2 size={16} className="mr-1 hidden sm:inline"/>} // Optional icon
        >
          Eliminar
        </Button>
      </div>
    </li>
  );
}

// Wrap with React.memo for performance optimization if props are stable
export default React.memo(CardItem);
