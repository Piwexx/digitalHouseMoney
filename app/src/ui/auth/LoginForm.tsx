'use client';
import { ArrowLeft, AlertCircle } from 'lucide-react'; // Added AlertCircle
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserData } from '@/types/login'; // This is { email: string, password?: string }
import { getAuthenticated } from '@/services/auth';
import { schemaLogin } from '@/schemas/login';
import Step1 from './Form1';
import Step2 from './Form2';
import Button from '../common/Button'; // Import the new Button component

// If UserData from @/types/login is just { email: string, password?: string }
// and schemaLogin is { email, password }, we should use a type derived from schema for form data.
export type LoginFormInputs = yup.InferType<typeof schemaLogin>; // Exported type

enum ServerErrorType {
  LoginError = 'Error al iniciar sesión, intenta de nuevo',
}

export default function LoginForm() {
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    trigger,
    watch,
    resetField,
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schemaLogin),
    mode: 'onChange', // Validate on change for better UX for field errors
  });

  const currentPassword = watch('password');

  const handleNextStep = async () => {
    const emailIsValid = await trigger("email");
    if (emailIsValid) {
      setStep(2);
      setServerError(null); // Clear server error when moving to next step
    }
  };

  const handleNavigateBack = () => {
    if (step === 2) {
      setStep(1);
      // Optionally clear password field when going back if desired
      // resetField('password'); // Clears password and its errors
      setServerError(null); // Clear server error
    }
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    setServerError(null);
    try {
      // Assuming getAuthenticated expects UserData which might be slightly different from LoginFormInputs
      // Ensure data passed to getAuthenticated matches its expected type.
      // If UserData can have an undefined password, and LoginFormInputs requires it, this is fine.
      await getAuthenticated(data as UserData);
      router.push(`/dashboard`);
    } catch (e) {
      console.error(e);
      setServerError(ServerErrorType.LoginError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleErrorDisplayClick = () => {
    if (serverError === ServerErrorType.LoginError) {
      // Clear server error and potentially password to allow retry
      setServerError(null);
      resetField('password');
    }
    // For field errors, react-hook-form handles them, no need for this click handler
  };

  return (
    <div className='w-full max-w-sm'>
      {/* Using a single form element to wrap all steps for react-hook-form */}
      <form onSubmit={hookFormSubmit(onSubmit)} noValidate>
        {step === 1 && (
          <Step1
            register={register}
            errors={errors}
            onNextStep={handleNextStep}
          />
        )}
        {step === 2 && (
          <>
            <Button
              type="button"
              variant="tertiary"
              onClick={handleNavigateBack}
              className="mb-4 self-start px-0 py-0 text-sm text-gray-600 hover:text-gray-800"
              leftIcon={<ArrowLeft className='w-4 h-4' />}
              aria-label="Volver al paso anterior"
            >
              Volver
            </Button>
            <Step2 register={register} errors={errors} />
            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              isLoading={isLoading}
              disabled={isLoading || !currentPassword || !!errors.password}
              className="mb-2"
            >
              {isLoading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </>
        )}
      </form>
      {/* Display server error from API submission */}
      {serverError && (
        <div
          className='text-error flex items-center mt-4 mb-4 gap-2 cursor-pointer'
          onClick={handleErrorDisplayClick} // Clicking this clears the error and resets password
        >
          <AlertCircle className='w-6 h-6 text-red-500' /> {/* Changed Icon */}
          <p className='text-sm italic font-normal'>{serverError}</p>
        </div>
      )}
      {/* Field-specific errors are now handled by Step1 and Step2 via props.errors */}
    </div>
  );
}