import { getService } from '@/services/service';
import ServiceWizard from '@/ui/dashboard/payments/ServiceWizard';
import { getAcountInfo } from '@/services/account';
import { getCards } from '@/services/card';
import { getTokenHeader } from '@/utils/getTokenHeader';

export default async function page() {
  const services = await getService()   
  const token = await getTokenHeader('x-access-token')
  const account = await getAcountInfo(token);
  const cards = await getCards(account.id,token)
      
  return (
    <ServiceWizard services={services} cards={cards} token={token} idAccount={account.id}/>
  )
}