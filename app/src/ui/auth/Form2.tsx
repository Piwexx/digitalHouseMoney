// Removed clsx import as it's no longer needed if Input handles error styling
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { LoginFormInputs } from './LoginForm';
import Input from '../common/Input'; // Import the new Input component

interface Props {
  register: UseFormRegister<LoginFormInputs>;
  errors: FieldErrors<LoginFormInputs>;
}

export default function Step2({ register, errors }: Props) {
  return (
    <>
      {/* The <form> tag is in the parent LoginForm.tsx */}
      <h2 className='mb-6 text-base font-semibold text-center'>
        Ingresá tu contraseña
      </h2>
      <Input
        // label="Contraseña" // Optional label
        type='password'
        placeholder='Contraseña'
        registration={register("password")}
        error={errors.password}
        inputClassName='sm:text-lg sm:min-h-[64px] sm:min-w-[360px] min-w-[300px] min-h-[50px] p-2' // Keep original styling
        // containerClassName="mb-4" // Default is mb-4
      />
      {/* Error display is now handled within the Input component */}
      {/* {errors.password && (
        <p className='text-red-500 text-sm mb-2'>{errors.password.message}</p>
      )} */}
    </>
  );
}