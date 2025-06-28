import { cookies } from 'next/headers';

export async function getSessionFromCookie() {
  return  (await cookies()).get('SessionID')?.value || '';
}