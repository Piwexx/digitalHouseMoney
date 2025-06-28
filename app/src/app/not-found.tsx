import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Página no encontrada</p>
      <p className="text-gray-50 mb-6">
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <Link href="/" className="text-blue-200 hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
}
