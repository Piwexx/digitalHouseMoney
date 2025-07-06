'use client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { UserData } from '@/types/login';
import { getAuthenticated } from '@/services/auth';
import Step1 from './Form1';
import Step2 from './Form2';

const initialState: UserData = {
  email: '',
  password: '',
};

enum ErrorType {
  FieldRequired = 'Campo requerido',
  EmailRequired = 'Email es requerido',
  PasswordRequired = 'Contraseña es requerida',
  LoginError = 'Error al iniciar sesión, intenta de nuevo',
}

export default function LoginForm() {
  const [userData, setUserData] = useState<UserData>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error === ErrorType.FieldRequired || error === ErrorType.EmailRequired || error === ErrorType.PasswordRequired) {
      setError(null);
    }
     // If it was a login error, and user changes password, clear error
     if (name === 'password' && error === ErrorType.LoginError) {
      setError(null);
    }
  }, [error]);

  const nextStep = useCallback(() => {
    if (!userData.email) {
      return setError(ErrorType.EmailRequired);
    }
    setError(null);
    setStep(2);
  },[userData.email]);

  const handleSubmit = async () => {
    if (!userData.password) {
      return setError(ErrorType.PasswordRequired);
    }
    setError(null);
    setIsLoading(true);
    try {
      await getAuthenticated(userData);
      router.push(`/dashboard`);
    } catch (e) {
      console.error(e);
      setError(ErrorType.LoginError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateBack = () => {
    if (step === 2) {
      setStep(1);
      // Keep email, clear password and error
      setUserData((prev) => ({ ...prev, password: '' }));
      setError(null);
    }
  };

  const handleErrorClick = () => {
    if (error === ErrorType.LoginError) {
      // If it's a login error, stay on step 2, clear password and error
      setUserData((prev) => ({ ...prev, password: '' }));
      setError(null);
      // Optionally, focus the password input here
    } else if (error === ErrorType.EmailRequired || error === ErrorType.FieldRequired && step === 1) {
      setError(null); // Just clear field related error, user will correct it by typing
    } else if (error === ErrorType.PasswordRequired && step === 2) {
      setError(null); // Just clear field related error
    }
  };

  return (
    <div className='w-full max-w-sm'>
      {step === 1 && (
        <Step1 handleChange={handleChange} error={error} nextStep={nextStep} />
      )}
      {step === 2 && (
        <>
          {/* Added a dedicated back button for better UX */}
          <button
            onClick={handleNavigateBack}
            className="text-sm text-gray-600 hover:text-gray-800 mb-4 flex items-center"
            aria-label="Volver al paso anterior"
          >
            <ArrowLeft className='w-4 h-4 mr-1' />
            Volver
          </button>
          <Step2 handleChange={handleChange} error={error} />
          <button
            onClick={handleSubmit}
            disabled={isLoading || !userData.password}
            className='cursor-pointer text-base sm:text-lg text-black rounded-lg w-full btn-primary p-2 font-bold mb-2 sm:min-h-[64px] sm:min-w-[360px] min-w-[300px] min-h-[50px] disabled:opacity-50'
          >
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </>
      )}
      {error && (
        <div
          className='text-error flex items-center mt-4 mb-4 gap-2 cursor-pointer'
          onClick={handleErrorClick} // Changed from handleBack to handleErrorClick
        >
          <ArrowLeft className='w-6 h-6 ' /> {/* This icon might be misleading now, consider changing or removing */}
          <p className='text-sm italic font-normal'>{error}</p>
        </div>
      )}
    </div>
  );
}
