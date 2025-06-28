import TransferWizard from '@/ui/dashboard/deposits/TransferWizard'
import { getAcountInfo } from '@/services/account';
import { getCards } from '@/services/card';
import { getTokenHeader } from '@/utils/getTokenHeader';

export default async function page() {
   const token = await getTokenHeader('x-access-token')
   const account = await getAcountInfo(token);
   const cards = await getCards(account.id,token)
  
  return (
    <>
    <TransferWizard cards={cards} cvu={account.cvu} accountId={account.id} token={token}/>
    </>
  )
}
