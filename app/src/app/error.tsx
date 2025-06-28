// app/error.tsx
"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-red-500 mb-4">¡Algo salió mal!</h1>
      <p className="text-gray-200 mb-4">{error.message || "Error inesperado"}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
