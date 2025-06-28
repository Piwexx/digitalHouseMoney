import { getAcountInfo } from '@/services/account';
import { getUserInfo } from '@/services/userInfo';
import AccountInfo from '@/ui/dashboard/AccountInfo';
import ActionButtons from '@/ui/dashboard/profile/ActionButtons';
import Profile from '@/ui/dashboard/profile/Profile';

import { getTokenHeader } from '@/utils/getTokenHeader';


export default async function page() {
  const token = await getTokenHeader('x-access-token')
  const account = await getAcountInfo(token);
  const userInfo = await getUserInfo(account.user_id,token)
   
  return (
    <>
      <Profile userInfo={userInfo} token={token}/>
      <ActionButtons/>
      <AccountInfo accoutInfo={account}/>
    </>
  )
}
