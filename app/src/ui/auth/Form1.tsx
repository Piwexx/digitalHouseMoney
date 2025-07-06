import { clsx } from 'clsx';
import Link from 'next/link';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { LoginFormInputs } from './LoginForm'; // Assuming LoginFormInputs is exported or define locally
import Button from '../common/Button'; // Import the new Button component

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
      {/* TODO: Refactor input to a reusable Input component in a later step */}
      <input
        {...register("email")}
        type='email'
        placeholder='Correo electrónico'
        className={clsx(
          'w-full p-2 rounded-xl text-black mb-4 bg-white text-base sm:text-lg sm:min-h-[64px] sm:min-w-[360px] min-w-[300px] min-h-[50px]',
          {
            'border-2 border-red-500': errors.email,
          }
        )}
        aria-invalid={errors.email ? "true" : "false"}
      />
      {errors.email && (
        <p className='text-red-500 text-sm mb-2'>{errors.email.message}</p>
      )}
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
