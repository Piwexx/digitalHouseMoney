import React from 'react'
import Cards from  '@/ui/dashboard/cards/Cards'
import Init from  '@/ui/dashboard/cards/Init'
import { getTokenHeader } from '@/utils/getTokenHeader'
import { getAcountInfo } from '@/services/account'
import { getCards } from '@/services/card'

export default async function page() {
  const token = await getTokenHeader('x-access-token')
  const account = await getAcountInfo(token);
  const cards = await getCards(account.id,token)
 
  return (
    <>
      <Init/>
      <Cards cards={cards} accountId={account.id} token={token}/>
    </>
  )
}
