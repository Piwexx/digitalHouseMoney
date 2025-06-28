import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function SuccessContainer() {
  return (
   <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center m-5">
        <h1 className="text-3xl sm:text-5xl font-bold mb-6">Registro Exitoso</h1>

        <div className="flex justify-center mb-6">
          <CheckCircle className="text-primary-color" size={95} strokeWidth={2.5} />
        </div>

        <p className="mb-8 text-sm ">
          Hemos enviado un correo de confirmación para validar tu email,<br />
          por favor revísalo para iniciar sesión
        </p>

        <Link
          href='/login'
          className="cursor-pointer block text-center content-center btn-primary text-black text-base font-bold py-2 px-6  rounded-lg min-h-[50px] min-w-[300px] sm:min-h-[64px] sm:min-w-[360px] transition"
        >
          Continuar
        </Link>
      </div>
    </div>
  )
}
