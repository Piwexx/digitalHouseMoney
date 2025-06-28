import ActivityList from '@/ui/dashboard/activity/ActivityList'
import { getActivitys } from '@/services/activity';
import { getTokenHeader } from '@/utils/getTokenHeader';
import { getAcountInfo } from '@/services/account';


export default async function page() {
   const token = await getTokenHeader('x-access-token')
     const account = await getAcountInfo(token);
     const activities = await getActivitys(account.id, token);
     
  return (
    <ActivityList activities={activities}/>
  )
}
