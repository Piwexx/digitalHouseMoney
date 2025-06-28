import { headers } from 'next/headers';

export async function getTokenHeader(name:string) {
  return (await headers()).get(name) || '';
}