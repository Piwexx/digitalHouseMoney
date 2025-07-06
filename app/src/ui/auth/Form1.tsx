import { clsx } from 'clsx';
import Link from 'next/link';


interface Props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  nextStep: () => void
}

export default function Step1({ handleChange, error, nextStep }: Props) {
  return (
    <>
        <h2 className='mb-6 text-base font-semibold text-center'>
          ¡Hola! Ingresá tu e-mail
        </h2>
        <input
          onChange={handleChange}
          name='email'
          type='email'
          required
          placeholder='Correo electrónico'
          className={clsx(
            'w-full p-2 rounded-xl text-black mb-4 bg-white text-base sm:text-lg sm:min-h-[64px] sm:min-w-[360px] min-w-[300px] min-h-[50px]',
            {
              'border-2 border-red-500': error,
            }
          )}
        />
        <button
          onClick={nextStep}
          className='cursor-pointer text-base sm:text-lg text-black rounded-lg w-full btn-primary p-2 font-bold mb-2 sm:min-h-[64px] sm:min-w-[360px] min-w-[300px] min-h-[50px]'
        >
          Continuar
        </button>
        <Link
          href='/register'
          className='cursor-pointer block text-center content-center text-base sm:text-lg rounded-lg w-full bg-gray-300 p-2 text-black font-bold sm:min-h-[64px] sm:min-w-[360px] min-w-[300px] min-h-[50px]'
        >
          Crear cuenta
        </Link>
    </>
  );
}
