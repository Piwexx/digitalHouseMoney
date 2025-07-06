'use client';
import React, { useState } from 'react'; // Added useState
import { Card } from '@/types/card';
import { deleteCard } from '@/services/card';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Button from '../../common/Button';
import { Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Modal from '../../common/Modal'; // Import Modal component

interface Props {
  card: Card;
}

const CardItem: React.FC<Props> = ({ card }) => {
  const router = useRouter();
  const { accountId, token } = useAuth();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const notifyCardDeleted = () => {
    toast.success('Tarjeta eliminada correctamente', { position: 'top-right' });
  };

  const notifyDeleteError = () => {
    toast.error('No se pudo eliminar la tarjeta. Intenta de nuevo.', { position: 'top-right' });
  };

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const confirmDelete = async () => {
    if (!accountId || !token) {
      notifyDeleteError(); // Or a more specific auth error
      console.error("Auth context not available for delete operation");
      return;
    }
    setIsLoadingDelete(true);
    try {
      await deleteCard(accountId, card.id, token);
      notifyCardDeleted();
      closeDeleteModal();
      router.refresh();
    } catch (error) {
      console.error('Error deleting card:', error);
      notifyDeleteError();
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const last4Digits = card.number_id.toString().slice(-4);

  return (
    <>
      <li className='flex justify-between items-center border-b-2 border-gray-200 p-2'>
        <div className='flex items-center gap-2'>
          <span className='w-4 h-4 bg-primary-color rounded-full' aria-hidden="true" />
          <p className='text-secondary-color text-base'>{`Terminada en ${last4Digits}`}</p>
        </div>
        <div>
          <Button
            variant="destructive-tertiary"
            onClick={openDeleteModal} // Opens the modal
            aria-label={`Eliminar tarjeta terminada en ${last4Digits}`}
            className="p-1"
            size="medium"
            leftIcon={<Trash2 size={16} className="mr-1 hidden sm:inline" />}
          >
            Eliminar
          </Button>
        </div>
      </li>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Confirmar Eliminación"
        titleId="delete-card-modal-title"
      >
        <p id="delete-card-modal-description">
          ¿Estás seguro de que deseas eliminar la tarjeta terminada en {last4Digits}? Esta acción no se puede deshacer.
        </p>
        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="secondary" onClick={closeDeleteModal} disabled={isLoadingDelete}>
            Cancelar
          </Button>
          <Button
            variant="primary" // Or a destructive variant if available in Button component
            onClick={confirmDelete}
            isLoading={isLoadingDelete}
            disabled={isLoadingDelete}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-500" // Destructive style override
          >
            {isLoadingDelete ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default React.memo(CardItem);
