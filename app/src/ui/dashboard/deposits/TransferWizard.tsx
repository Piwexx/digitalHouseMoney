'use client';
import { useState } from 'react';
import SelectCardStep from './SelectCardStep ';
import EnterAmountStep from './EnterAmountStep ';
import ReviewStep from './ReviewStep';
import SuccessStep from './SuccessStep';
import { Card } from '@/types/card';
import { postDeposits } from "@/services/deposit";
import { toast } from 'react-toastify'; // ToastContainer should be global

interface Props { // Changed from props to Props
  cards: Card[];
  cvu: string;
  token: string;
  accountId: number;
}

export default function TransferWizard({ cards, cvu, token, accountId }: Props) {
  const [step, setStep] = useState<number>(0);
  const [selectedCardId, setSelectedCardId] = useState<number | undefined>(); // Explicitly undefined
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionDate, setTransactionDate] = useState<Date | null>(null); // For success step

  const next = () => setStep(prev => prev + 1);
  const back = () => setStep(prev => prev - 1);

  const notifyDepositError = () => {
    toast.error('No se pudo procesar el depósito. Intenta de nuevo.', {
      position: 'top-right',
    });
  };

  const onSubmit = async () => {
    if (selectedCardId === undefined) {
      toast.error('Por favor, selecciona una tarjeta.'); // Should ideally not happen if SelectCardStep is robust
      return;
    }
    const cardUsed = cards.find((card: Card) => card.id === selectedCardId);
    if (!cardUsed) {
      toast.error('Tarjeta seleccionada no válida.'); // Should also ideally not happen
      return;
    }

    setIsLoading(true);
    const payload = {
      amount: amount,
      dated: new Date().toISOString(), // Transaction date is current time
      destination: cvu,
      origin: String(cardUsed.number_id),
    };

    try {
      const response = await postDeposits(accountId, payload, token);
      // Assuming postDeposits throws an error on failure or returns a specific success indicator
      if (response) { // This condition might need to be more specific based on API response
        setTransactionDate(new Date()); // Set transaction date for success step
        next(); // Proceed to success step
      } else {
        // Handle cases where API returns a falsy value but doesn't throw (if applicable)
        notifyDepositError();
      }
    } catch (error) {
      console.error('Error processing deposit:', error);
      notifyDepositError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {step === 0 && <SelectCardStep onNext={next} onSelect={setSelectedCardId} selected={selectedCardId} cards={cards} />}
      {step === 1 && <EnterAmountStep onNext={next} onAmountChange={setAmount} amount={amount} />}
      {step === 2 && <ReviewStep onSubmit={onSubmit} onBack={back} amount={amount} cvu={cvu} isLoading={isLoading} />}
      {/* Pass transactionDate to SuccessStep, ensure it's not null */}
      {step === 3 && transactionDate && <SuccessStep amount={amount} date={transactionDate} cvu={cvu} />}
      {/* <ToastContainer /> Ensure this is not rendered per item - move to global layout */}
    </>
  );
}