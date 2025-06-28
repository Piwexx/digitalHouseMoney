import { getAcountInfo } from '@/services/account';
import AccountInfo from '@/ui/dashboard/AccountInfo'
import { getTokenHeader } from '@/utils/getTokenHeader';
import React from 'react'

export default async function page() {
  const token = await getTokenHeader('x-access-token')
  const account = await getAcountInfo(token);
     
  return (
   <AccountInfo accoutInfo={account}/>
  )
}
