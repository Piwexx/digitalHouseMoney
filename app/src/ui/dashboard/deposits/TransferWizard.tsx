/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState } from 'react';
import SelectCardStep from './SelectCardStep ';
import EnterAmountStep from './EnterAmountStep ';
import ReviewStep from './ReviewStep';
import SuccessStep from './SuccessStep';
import { Card } from '@/types/card';
import { postDeposits } from "@/services/deposit";
import { ToastContainer, toast } from 'react-toastify';

interface props {
  cards:Card[]
  cvu:string
  token:string
  accountId:number
}

export default function TransferWizard({cards,cvu,token,accountId}:props){
  const [step, setStep] = useState<number>(0);
  const [selectedCard, setSelectedCard] = useState<number>();
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());

  const next = () => setStep(prev => prev + 1);
  const back = () => setStep(prev => prev - 1);

  const topRightError = () => {
    toast.error('Hey 👋!, no se pudo depositar en la cuenta', {
      position: 'top-right',
    });
  };

  const onSubmit = async() => {
    const payload = {
      amount: amount,
      dated: new Date().toISOString(),
      destination: cvu,
      origin: String(cards.filter((card: Card) => card.id === selectedCard)[0]?.number_id)
    }
    try {
      const response = await postDeposits(accountId, payload, token);

      if (response) {
        next();
      }
    } catch (error) {
      topRightError()
    }
  }

  return (
    <>
      {step === 0 && <SelectCardStep onNext={next} onSelect={setSelectedCard} selected={selectedCard} cards={cards}/>}
      {step === 1 && <EnterAmountStep onNext={next}  onAmountChange={setAmount} amount={amount}/>}
      {step === 2 && <ReviewStep onSubmit={onSubmit} onBack={back} amount={amount} cvu={cvu} />}
      {step === 3 && <SuccessStep amount={amount} date={date} cvu={cvu}/>}
      <ToastContainer />
    </>
  );
};