import CreditCardForm from '@/ui/dashboard/cards/CreditCardForm'
import { getTokenHeader } from '@/utils/getTokenHeader'
import { getAcountInfo } from '@/services/account'


export default async function page() {
  const token = await getTokenHeader('x-access-token')
  const account = await getAcountInfo(token);
   
  return (
    <CreditCardForm accountId={account.id} token={token}/>
  )
}
