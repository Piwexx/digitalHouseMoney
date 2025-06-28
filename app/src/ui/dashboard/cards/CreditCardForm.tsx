'use client';
import { schemaCard } from "@/schemas/card";
import { postCards } from "@/services/card"
import { FormEvent, useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { ToastContainer, toast } from 'react-toastify';
import {useRouter} from "next/navigation";
import { convertDateFormat } from "@/utils/converDataFormat";
import { ValidationError } from "yup";
import clsx from "clsx";

interface props {
  accountId:number
  token:string
}

type Payload = {
  cod: number;
  expiration_date: string;
  first_last_name: string;
  number_id: number;
};

type FocusedField = 'number' | 'name' | 'expiry' | 'cvc' | undefined;


export default function CreditCardForm({accountId, token}: props) {
  const [errors, setErrors] = useState<Partial<Record<keyof Payload, string>>>({});
  const router = useRouter();
  const [cardData, setCardData] = useState<{
    number_id: string;
    first_last_name: string;
    expiration_date: string;
    cod: string;
    focus: FocusedField;
  }>({
    number_id: '',
    first_last_name: '',
    expiration_date: '',
    cod: '',
    focus: undefined,
  });

  const topRight = () => {
    toast.success('Hey 👋!, Tarjeta agregada correctamente', {
      position: 'top-right',
    });
  };
  
  const topRightError = () => {
        toast.error('Hey 👋!, no se pudo agregar la tarjeta', {
          position: 'top-right',
        });
  };

  const getFormattedExpiry = () => {
    const parts = cardData.expiration_date.split('/');
    return parts.length === 2 ? `${parts[0]}${parts[1].slice(-2)}` : '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const handleInputFocus = (e) => {
    setCardData({ ...cardData, focus: e.target.name });
    setErrors({});
  };

  const isFormComplete = () => {
    return (
      cardData.number_id.trim() !== '' &&
      cardData.expiration_date.trim() !== '' &&
      cardData.first_last_name.trim() !== '' &&
      cardData.cod.trim() !== ''
    );
  };

  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await schemaCard.validate(cardData,{ abortEarly:false })
      
      const payload = {
        cod: Number(cardData.cod),
        expiration_date: convertDateFormat(cardData.expiration_date),
        first_last_name: cardData.first_last_name,
        number_id: Number(cardData.number_id),
      };
      
      await postCards(accountId,payload,token)
      
      topRight()
      router.push("/dashboard/cards");

    } catch (err) {
      if (err instanceof ValidationError) {
          const validationErrors: Partial<Record<keyof Payload, string>> = {};
          err.inner.forEach((err) => {
             if (err.path) validationErrors[err.path as keyof Payload] = err.message;
          });
          setErrors(validationErrors);
          return;
      }
      topRightError();
    }
  };

  return (
    <div className="min-h-[80%] flex flex-col items-center justify-center m-10">
      <div className="flex flex-col items-center justify-center gap-10 bg-white rounded-xl shadow-md p-6 w-full">
        <div className="w-full">
          <Cards
            number={cardData.number_id}
            name={cardData.first_last_name}
            expiry={getFormattedExpiry()}
            cvc={cardData.cod}
            focused={cardData.focus}
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 w-full"
        >
          <input
            type="tel"
            name="number_id"
            placeholder="Número de la tarjeta*"
            value={cardData.number_id}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="rounded-lg p-4 w-full text-black text-base border-2 input-border"
          />
          {errors.number_id && (
            <span className="text-red-600 text-sm ml-2">{errors.number_id}</span>
          )}
          <input
            type="text"
            name="expiration_date"
            placeholder="Fecha de vencimiento (MM/YYYY)*"
            value={cardData.expiration_date}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="rounded-lg p-4 w-full text-black text-base border-2 input-border"
          />
          {errors.expiration_date && (
            <span className="text-red-600 text-sm ml-2">{errors.expiration_date}</span>
          )}
          <input
            type="text"
            name="first_last_name"
            placeholder="Nombre y apellido*"
            value={cardData.first_last_name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="rounded-lg p-4 w-full text-black text-base border-2 input-border"
          />
          {errors.first_last_name && (
            <span className="text-red-600 text-sm ml-2">{errors.first_last_name}</span>
          )}
          <input
            type="tel"
            name="cod"
            placeholder="Código de seguridad*"
            value={cardData.cod}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="rounded-lg p-4 w-full text-black text-base border-2 input-border"
          />
          {errors.cod && (
            <span className="text-red-600 text-sm ml-2">{errors.cod}</span>
          )}
          <button
            disabled={!isFormComplete()}
            type="submit"
            className={clsx(
              "mt-4 md:col-span-1 md:col-start-2 bg-gray-300 hover:bg-gray-400 text-black text-base font-bold p-4 rounded-lg  min-h[50px]",
              {
                 "bg-gray-300 hover:bg-gray-400 text-black cursor-pointe cursor-not-allowed": !isFormComplete(),
                 "bg-primary-color text-black cursor-pointer": isFormComplete(),
              }
            )}
          >
            Continuar
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}