/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { FormEvent, useState } from "react";
import {RegisterData} from "@/types/register"
import { postRegister } from "@/services/auth";
import { useRouter } from "next/navigation";
import { schemaRegister } from "@/schemas/register";
import clsx from "clsx";

const initialState = {
  dni:  '',
  email: '',
  firstname: '',
  lastname: '',
  password: '',
  confirmPassword: '',
  phone: '',
};

export default function RegisterForm() {
  const [userData, setUserData] = useState<RegisterData>(initialState);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const inputClass = clsx('w-full p-2 rounded-xl text-black mb-4 bg-white text-base sm:text-lg sm:min-h-[64px] sm:min-w-[360px] min-w-[300px] min-h-[50px]',
                        {
                          'border-2 border-red-500': error,
                        })
                      
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(!value){
       setError('Campo requeridos');
    }

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault()
    
      const {dni} = userData

      const body = {
        ...userData,
        dni:Number(dni)
      }
      try {
        await schemaRegister.validate(userData)
        
        const resp = await postRegister(body);
      
       if(resp){
          router.push(`/register/success`);
         }
       
      } catch (err: any) {
        if (err.name === 'ValidationError') {
          console.log(err.errors[0])
         setError(err.errors[0]); 
        }else {
        setError('Error al registrar intenta de nuevo');
      }
      };
  }
  
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl p-8 rounded-lg"
      >
        <h2 className="w-full max-w-4xl mb-6 text-xl font-semibold text-center">Crear cuenta</h2>

        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-x-10">
          {/* border-red-500 border-2 */}
          <input
            onChange={handleChange}
            type="text"
            name="firstname"
            placeholder="Nombre*"
            className={inputClass}
          />
          <input
            onChange={handleChange}
            type="text"
            name="lastname"
            placeholder="Apellido*"
            className={inputClass}
          />
          <input
            onChange={handleChange}
            type="text"
            name="dni"
            placeholder="DNI*"
            className={inputClass}
          />
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Correo electrónico*"
            className={inputClass}
          />
        </div>

        <p className="text-sm text-white mt-2 mb-4 text-center">
          Usa entre 6 y 20 caracteres (debe contener al menos 1 carácter especial, una mayúscula y un número)
        </p>

        <div className="max-w-4xl  grid grid-cols-1 md:grid-cols-2 gap-x-10">
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Contraseña*"
            className={inputClass}
          />
          <input
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña*"
            className={inputClass}
          />
          <input
            onChange={handleChange}
            type="tel"
            name="phone"
            placeholder="Teléfono*"
            className={inputClass}
          />
          <button
            type="submit"
            className="cursor-pointer text-base sm:text-lg mb-4 rounded-lg w-full btn-primary p-2 font-bold text-black sm:min-h-[64px] sm:min-w-[360px] min-w-[300px] min-h-[50px]"
          >
            Crear cuenta
          </button>
        </div>
        {error && (
          <div
            className='text-error flex items-center mt-4 mb-4 gap-2 cursor-pointer'
          >
            <p className='text-sm italic font-normal text-red-500'>{error}</p>
          </div>
      )}
      </form>
    </>
  );

}
