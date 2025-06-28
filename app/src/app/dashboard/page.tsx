import { getAcountInfo } from '@/services/account';
import { getActivitys } from '@/services/activity';
import { getTokenHeader } from '@/utils/getTokenHeader';
import BalanceCard from '@/ui/dashboard/BalanceCard';
import ActionButtons from '@/ui/dashboard/ActionButtons';
import Activity from '@/ui/dashboard/Activity';
import SearchInput from '@/ui/dashboard/SearchInput';


export default async function page() {
 const token = await getTokenHeader('x-access-token')
 const account = await getAcountInfo(token);
 const activities = await getActivitys(account.id, token);
 
  return (
    <>
        <BalanceCard amount={account.available_amount} />
        <ActionButtons />
        <SearchInput/>
        <Activity activities={activities} />
    </>
  )
}
