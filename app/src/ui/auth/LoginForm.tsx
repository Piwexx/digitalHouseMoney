/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UserData } from '@/types/login';
import { getAuthenticated } from '@/services/auth';
import Step1 from './Form1';
import Step2 from './Form2';

const initialState = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const [userData, setUserData] = useState<UserData>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);
  const router = useRouter();


  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if(!value){
       setError('Campo requerido');
    }

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nextStep = () =>{
    if(!userData.email){
       return setError('Campo requerido');
    }
    setStep(2)
    setError(null)
  }

   const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if(!value){
       setError('Campo requerido');
    }

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async () => {
    try {
     
      await getAuthenticated(userData);

      router.push(`/dashboard`);
    } catch (e) {
      console.log(e)
      setError('Error al iniciar sesión intenta de nuevo');
    }
  };

  //Falta form STEP
  const handleBack = () => {
    setUserData(initialState);
    setError(null);
    setStep(1)
  };

  return (
    <div className='w-full max-w-sm'>
        {step === 1 && (
          <Step1 handleChange={handleChangeEmail} error={error} nextStep={nextStep}/>
        )}
        {step === 2 && (
          <>
            <Step2 handleChange={handleChangePassword} error={error}/>
            <button
            onClick={handleSubmit}
            disabled={false}
            className=' cursor-pointer text-base sm:text-lg text-black rounded-lg w-full btn-primary p-2 font-bold  mb-2 sm:min-h-[64px] sm:min-w-[360px] min-w-[300px] min-h-[50px]'
            >
            Ingresar
            </button>
          </>
        )}
        {error && (
          <div
            className='text-error flex items-center mt-4 mb-4 gap-2 cursor-pointer'
            onClick={handleBack}
          >
            <ArrowLeft className='w-6 h-6 ' />
            <p className='text-sm italic font-normal'>{error}</p>
          </div>
        )}
    </div>
  );
}
