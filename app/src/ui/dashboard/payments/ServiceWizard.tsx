/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState } from 'react';
import SelectCardStep from './SelectCardStep ';
import SuccessStep from './SuccessStep';
import PaymentList from './PaymentList';
import { Service } from '@/types/service';
import EnterAccountStep from './EnterAccountStep ';
import { getServiceById } from '@/services/service';
import { Card } from '@/types/card';
import { getCardById } from '@/services/card';

interface props {
  services:Service[]
  cards : Card[]
  token: string
  idAccount:number
}

export default function ServiceWizard({services,cards,token,idAccount}:props){
  const [step, setStep] = useState<number>(0);
  const [card, setCard] = useState<Card>({});
  const [account, setAccount] = useState<string>('');
  const [serviceDetail,setServiceDetail] = useState<Service>({})
 
  const next = () => setStep(prev => prev + 1);
  const back = () => setStep(prev => prev - 1);

  const onSubmit = async (id:number) => {
    const serviceDetail = await getServiceById(id)
    setServiceDetail(serviceDetail)
  }

  const onSelectedCard = async (idCard:string) => {
    const card = await getCardById(idAccount,token,idCard)
    setCard(card)
  }

  return (
    <>
      {step === 0 && <PaymentList services={services} onNext={next} onSubmit={onSubmit}/>}
      {step === 1 && <EnterAccountStep onNext={next}  onAccountChange={setAccount} account={account}/>}
      {step === 2 && <SelectCardStep service={serviceDetail} cards={cards} onNext={next} onSelect={onSelectedCard} selected={card}/>}
      {step === 3 && <SuccessStep service={serviceDetail} card={card}/>}
    </>
  );
};