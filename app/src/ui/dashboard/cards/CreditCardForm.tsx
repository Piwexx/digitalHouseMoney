'use client';
import { useState } from 'react';
import { useForm, SubmitHandler, FieldName } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { toast } from 'react-toastify'; // ToastContainer should be global
import { useRouter } from "next/navigation";
import { schemaCard } from "@/schemas/card";
import { postCards } from "@/services/card";
import { convertDateFormat } from "@/utils/converDataFormat";
import clsx from "clsx";

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
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6 w-full"
        >
          <div>
            <input
              {...register("number_id")}
              type="tel"
              placeholder="Número de la tarjeta*"
              onFocus={handleInputFocus}
              className={clsx(inputBaseClass, {'border-red-500': errors.number_id})}
              aria-invalid={errors.number_id ? "true" : "false"}
            />
            {errors.number_id && <p className={errorTextClass}>{errors.number_id.message}</p>}
          </div>
          <div>
            <input
              {...register("expiration_date")}
              type="tel" // Use tel for better mobile UX with formatting, schema handles format
              placeholder="Fecha de vencimiento (MM/YY)*"
              onFocus={handleInputFocus}
              className={clsx(inputBaseClass, {'border-red-500': errors.expiration_date})}
              aria-invalid={errors.expiration_date ? "true" : "false"}

            />
            {errors.expiration_date && <p className={errorTextClass}>{errors.expiration_date.message}</p>}
          </div>
          <div>
            <input
              {...register("first_last_name")}
              type="text"
              placeholder="Nombre y apellido*"
              onFocus={handleInputFocus}
              className={clsx(inputBaseClass, {'border-red-500': errors.first_last_name})}
              aria-invalid={errors.first_last_name ? "true" : "false"}
            />
            {errors.first_last_name && <p className={errorTextClass}>{errors.first_last_name.message}</p>}
          </div>
          <div>
            <input
              {...register("cod")}
              type="tel"
              placeholder="Código de seguridad*"
              onFocus={handleInputFocus}
              className={clsx(inputBaseClass, {'border-red-500': errors.cod})}
              aria-invalid={errors.cod ? "true" : "false"}
            />
            {errors.cod && <p className={errorTextClass}>{errors.cod.message}</p>}
          </div>

          <div className="md:col-span-2 flex justify-center">
            <button
              disabled={!isValid || isLoading} // Disable if form is not valid or loading
              type="submit"
              className={clsx(
                "mt-4 w-full md:w-1/2 bg-gray-300 hover:bg-gray-400 text-black text-base font-bold p-4 rounded-lg min-h-[50px]",
                {
                  "cursor-not-allowed opacity-50": !isValid || isLoading,
                  "bg-primary-color hover:bg-primary-color/90 text-black cursor-pointer": isValid && !isLoading,
                }
              )}
            >
              {isLoading ? 'Agregando...' : 'Continuar'}
            </button>
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