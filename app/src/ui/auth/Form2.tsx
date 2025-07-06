import clsx from "clsx";
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { LoginFormInputs } from './LoginForm'; // Assuming LoginFormInputs is exported

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
      <input
        {...register("password")}
        type='password'
        placeholder='Contraseña'
        className={clsx(
          'w-full p-2 rounded-xl text-black mb-4 bg-white text-base sm:text-lg sm:min-h-[64px] sm:min-w-[360px] min-w-[300px] min-h-[50px]',
          {
            'border-2 border-red-500': errors.password,
          }
        )}
        aria-invalid={errors.password ? "true" : "false"}
      />
      {errors.password && (
        <p className='text-red-500 text-sm mb-2'>{errors.password.message}</p>
      )}
    </>
  );
}
