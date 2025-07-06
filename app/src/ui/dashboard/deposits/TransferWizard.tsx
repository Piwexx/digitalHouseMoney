'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { transferWizardSchema, TransferWizardFormInputs } from '@/schemas/transferWizard';
import SelectCardStep from './SelectCardStep ';
import EnterAmountStep from './EnterAmountStep ';
import ReviewStep from './ReviewStep';
import SuccessStep from './SuccessStep';
import { Card } from '@/types/card';
import { postDeposits } from "@/services/deposit";
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext'; // Import useAuth

interface Props {
  cards: Card[];
  cvu: string;
  // token and accountId will come from context
}

export default function TransferWizard({ cards, cvu }: Props) { // Removed token, accountId from props
  const { token, accountId } = useAuth(); // Get auth data from context
  const [step, setStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionDate, setTransactionDate] = useState<Date | null>(null);

  const {
    control, // For Controller component if needed in SelectCardStep
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    trigger,
    getValues, // To get form values for ReviewStep or submission
    setValue, // To set value from SelectCardStep
  } = useForm<TransferWizardFormInputs>({
    resolver: yupResolver(transferWizardSchema),
    mode: 'onChange', // Or 'onBlur'
    defaultValues: {
      selectedCardId: undefined,
      amount: 0,
    }
  });

  const handleNextStep0To1 = async () => {
    const isValid = await trigger('selectedCardId');
    if (isValid) setStep(1);
  };

  const handleNextStep1To2 = async () => {
    const isValid = await trigger('amount');
    if (isValid) setStep(2);
  };

  const handleBack = () => setStep(prev => prev - 1);

  const finalSubmit: SubmitHandler<TransferWizardFormInputs> = async (data) => {
    const cardUsed = cards.find((card: Card) => card.id === data.selectedCardId);
    if (!cardUsed) {
      // This should ideally be caught by validation if selectedCardId is non-nullable
      // or SelectCardStep ensures a valid ID is set.
      toast.error('Tarjeta seleccionada no válida.');
      return;
    }

    setIsLoading(true);
    const payload = {
      amount: data.amount,
      dated: new Date().toISOString(),
      destination: cvu,
      origin: String(cardUsed.number_id),
    };

    try {
      const response = await postDeposits(accountId, payload, token);
      if (response) {
        setTransactionDate(new Date());
        setStep(3); // Move to SuccessStep
      } else {
        toast.error('No se pudo procesar el depósito. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error processing deposit:', error);
      toast.error('Error al procesar el depósito. Intenta de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentFormData = getValues(); // For ReviewStep and SuccessStep

  return (
    // No top-level <form> tag here if steps are separate and ReviewStep triggers final submit
    // Or, wrap everything in a form and ReviewStep's button is type="submit"
    // For now, let's assume ReviewStep's button will call hookFormSubmit(finalSubmit)
    <>
      {step === 0 && (
        <SelectCardStep
          onNext={handleNextStep0To1}
          cards={cards}
          control={control} // Pass control for potential Controller usage
          setValue={setValue} // Pass setValue to update RHF state
          trigger={trigger} // Pass trigger to validate on change
          currentSelection={getValues("selectedCardId")} // Pass current value for radio state
          error={errors.selectedCardId?.message}
        />
      )}
      {step === 1 && (
        <EnterAmountStep
          onNext={handleNextStep1To2}
          register={register}
          error={errors.amount?.message}
          onBack={handleBack} // Added back button for amount step
        />
      )}
      {step === 2 && (
        <ReviewStep
          onSubmit={hookFormSubmit(finalSubmit)} // RHF's handleSubmit wraps our finalSubmit
          onBack={handleBack}
          amount={currentFormData.amount || 0} // Get value from RHF
          cvu={cvu}
          // Need to display selected card info, not just ID.
          // This might require finding the card from 'cards' array using currentFormData.selectedCardId
          selectedCardDisplay={cards.find(c => c.id === currentFormData.selectedCardId)?.number_id.toString().slice(-4) || "N/A"}
          isLoading={isLoading}
        />
      )}
      {step === 3 && transactionDate && currentFormData.amount && (
        <SuccessStep
          amount={currentFormData.amount}
          date={transactionDate}
          cvu={cvu}
        />
      )}
    </>
  );
}