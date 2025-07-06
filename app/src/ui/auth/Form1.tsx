import Link from 'next/link';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { LoginFormInputs } from './LoginForm';
import Button from '../common/Button';
import Input from '../common/Input'; // Import the new Input component

interface Props {
  register: UseFormRegister<LoginFormInputs>;
  errors: FieldErrors<LoginFormInputs>;
  onNextStep: () => void;
}

export default function Step1({ register, errors, onNextStep }: Props) {
  return (
    <>
      <h2 className='mb-6 text-base font-semibold text-center'>
        ¡Hola! Ingresá tu e-mail
      </h2>
      <Input
        // label="Correo electrónico" // Optional label
        type='email'
        placeholder='Correo electrónico'
        registration={register("email")}
        error={errors.email}
        // Apply specific height/width styling for this form if needed via inputClassName
        inputClassName='sm:text-lg sm:min-h-[64px] sm:min-w-[360px] min-w-[300px] min-h-[50px] p-2' // Kept p-2 from original, default is p-3
        // containerClassName="mb-4" // Default is mb-4, can adjust if needed
      />
      {/* Error display is now handled within the Input component */}
      {/* {errors.email && (
        <p className='text-red-500 text-sm mb-2'>{errors.email.message}</p>
      )} */}
      <Button
        type="button"
        onClick={onNextStep}
        variant="primary"
        size="large"
        fullWidth
        className="mb-2" // Added margin bottom as it was on the original button
      >
        Continuar
      </Button>
      {/* The Link component styled as a button can also be wrapped by our Button if we add an 'as' prop or specific LinkButton component */}
      {/* For now, keeping it as a Link, but it's a candidate for Button component with an 'as={Link}' prop or a wrapper */}
      <Link
        href='/register'
        className='cursor-pointer block text-center content-center text-base sm:text-lg rounded-lg w-full bg-gray-300 p-2 text-black font-bold sm:min-h-[64px] sm:min-w-[360px] min-w-[300px] min-h-[50px] hover:bg-gray-400 transition-colors'
        // This style is very similar to Button variant="secondary" size="large" fullWidth
      >
        Crear cuenta
      </Link>
    </>
  );
}