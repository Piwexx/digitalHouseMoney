'use client';
import { useState } from 'react';
import { useForm, SubmitHandler, FieldName } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { schemaCard } from "@/schemas/card";
import { postCards } from "@/services/card";
import { convertDateFormat } from "@/utils/converDataFormat";
import clsx from "clsx"; // May still be needed for button, or can be removed
import Input from "../../common/Input"; // Import Input component
import Button from "../../common/Button"; // Import Button component

interface Props {
  accountId: number;
  token: string;
}

// Type for form data, inferred from the schema
type CardFormInputs = yup.InferType<typeof schemaCard>;
type FocusedField = FieldName<CardFormInputs> | undefined;

export default function CreditCardForm({ accountId, token }: Props) {
  const [focused, setFocused] = useState<FocusedField>(undefined);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors, isValid }, // Use isValid for button disable state
    watch,
    setFocus, // RHF's setFocus can be used
  } = useForm<CardFormInputs>({
    resolver: yupResolver(schemaCard),
    mode: 'onChange', // Validate on change for better UX
    defaultValues: { // Provide defaultValues for controlled components
      number_id: '',
      first_last_name: '',
      expiration_date: '',
      cod: '',
    }
  });

  // Watch form values for the Cards component
  const watchedValues = watch();

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as FieldName<CardFormInputs>;
    setFocused(fieldName);
    // RHF's setFocus can be used to programmatically focus fields if needed,
    // but here we're setting the 'focused' prop for the Cards component.
  };

  const onSubmit: SubmitHandler<CardFormInputs> = async (data) => {
    setIsLoading(true);
    setServerError(null);

    const payload = {
      cod: Number(data.cod),
      expiration_date: convertDateFormat(data.expiration_date), // MM/YY -> YYYY-MM-DD
      first_last_name: data.first_last_name,
      number_id: Number(data.number_id.replace(/\s/g, '')), // Remove spaces for API
    };

    try {
      await postCards(accountId, payload, token);
      toast.success('Tarjeta agregada correctamente', { position: 'top-right' });
      router.push("/dashboard/cards");
    } catch (err: any) {
      console.error("Card submission error:", err);
      setServerError(err.message || 'No se pudo agregar la tarjeta. Intenta de nuevo.');
      toast.error('No se pudo agregar la tarjeta. Intenta de nuevo.', { position: 'top-right' });
    } finally {
      setIsLoading(false);
    }
  };

  const inputBaseClass = "rounded-lg p-4 w-full text-black text-base border-2 input-border";
  const errorTextClass = "text-red-600 text-sm ml-2 mt-1";


  return (
    <div className="min-h-[80%] flex flex-col items-center justify-center m-10">
      <div className="flex flex-col items-center justify-center gap-10 bg-white rounded-xl shadow-md p-6 w-full">
        <div className="w-full">
          <Cards
            number={watchedValues.number_id || ''}
            name={watchedValues.first_last_name || ''}
            expiry={watchedValues.expiration_date || ''} // react-credit-cards-2 expects MM/YY or MMYY
            cvc={watchedValues.cod || ''}
            focused={focused}
          />
        </div>

        <form
          onSubmit={hookFormSubmit(onSubmit)}
          noValidate
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-6 w-full" // Reduced gap-y slightly
        >
          <Input
            type="tel"
            placeholder="Número de la tarjeta*"
            registration={register("number_id")}
            error={errors.number_id}
            onFocus={handleInputFocus}
            inputClassName="rounded-lg p-4 w-full text-black text-base border-2 input-border"
            // containerClassName="mb-0" // Adjust if default mb-4 from Input is too much
          />
          <Input
            type="tel"
            placeholder="Fecha de vencimiento (MM/YY)*"
            registration={register("expiration_date")}
            error={errors.expiration_date}
            onFocus={handleInputFocus}
            inputClassName="rounded-lg p-4 w-full text-black text-base border-2 input-border"
          />
          <Input
            type="text"
            placeholder="Nombre y apellido*"
            registration={register("first_last_name")}
            error={errors.first_last_name}
            onFocus={handleInputFocus}
            inputClassName="rounded-lg p-4 w-full text-black text-base border-2 input-border"
          />
          <Input
            type="tel"
            placeholder="Código de seguridad*"
            registration={register("cod")}
            error={errors.cod}
            onFocus={handleInputFocus}
            inputClassName="rounded-lg p-4 w-full text-black text-base border-2 input-border"
          />

          <div className="md:col-span-2 flex justify-center">
            <Button
              type="submit"
              // Determine variant based on isValid, but Button handles disabled state styling
              variant={(isValid && !isLoading) ? "primary" : "secondary"}
              isLoading={isLoading}
              disabled={!isValid || isLoading}
              className="mt-4 w-full md:w-1/2 min-h-[50px] p-4" // Keep p-4 from original
              // size prop could also be used if 'large' matches p-4 and min-h-[50px]
            >
              {isLoading ? 'Agregando...' : 'Continuar'}
            </Button>
          </div>
        </form>
        {serverError && (
          <div className='text-red-600 text-sm mt-4 text-center'>
            {serverError}
          </div>
        )}
      </div>
      {/* <ToastContainer /> Ensure this is global */}
    </div>
  );
}