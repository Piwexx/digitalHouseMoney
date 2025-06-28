import { getAcountInfo } from '@/services/account';
import { getTransactions } from '@/services/activity';
import DetailActivity from '@/ui/dashboard/activity/DetailActivity';
import { getTokenHeader } from '@/utils/getTokenHeader';

export default async function page({ searchParams }: { searchParams: { [key: string]: number } }) {
  const query = Number(searchParams.query)
  const token = await getTokenHeader('x-access-token')
  const account = await getAcountInfo(token);
  const activity = await getTransactions(account.id,token,{},query)
   
  return (
    <DetailActivity activity={activity}/>
  )
}
