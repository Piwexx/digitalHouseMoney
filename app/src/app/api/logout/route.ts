/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    (await cookies()).delete('SessionID');

    return new NextResponse(JSON.stringify({ message: 'Sesión cerrada' }), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "No se pudo cerrar sesión. Intenta de nuevo." },
      { status: 400 }
    );
  }
}