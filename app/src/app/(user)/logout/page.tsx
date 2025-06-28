'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const cerrarSesion = async () => {
      const resp = await fetch('/api/logout');
      if(resp.ok){
        router.push('/');
      }
    };

    cerrarSesion();
  }, [router]);

  return <p>Cerrando sesión...</p>;
}