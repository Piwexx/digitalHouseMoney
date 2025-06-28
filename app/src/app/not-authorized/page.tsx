import Link from "next/link";

export default function NotAuthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-yellow-500 mb-4">403</h1>
      <p className="text-2xl font-semibold mb-2">Acceso denegado</p>
      <p className="text-gray-200 mb-6">
        No tienes permiso para ver esta página.
      </p>
      <Link href="/" className="text-blue-200 hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
}
