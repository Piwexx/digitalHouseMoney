import clsx from "clsx";

interface Props {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null
}

export default function Step2({handleChange,error}:Props) {
  return (
    <>
      <form>
        <h2 className='mb-6 text-base font-semibold text-center'>
          Ingresá tu contraseña
        </h2>
        <input
          onChange={handleChange}
          name='password'
          type='password'
          required
          placeholder='Contraseña'
          className={clsx(
            'w-full p-2 rounded-xl text-black mb-4 bg-white text-base sm:text-lg sm:min-h-[64px] sm:min-w-[360px] min-w-[300px] min-h-[50px]',
            {
              'border-2 border-red-500': error,
            }
          )}
        />
      </form>
    </>
  );
}
