import Sidebar from "@/ui/dashboard/Sidebar";
import Header from "@/ui/home/Header";
import { getTokenHeader } from "@/utils/getTokenHeader";
import { getAcountInfo } from "@/services/account";
import { getUserInfo } from "@/services/userInfo";


export default async function Layout({ children }: { children: React.ReactNode }) {
  const token = await getTokenHeader('x-access-token')
  const account = await getAcountInfo(token);
  const userInfo = await getUserInfo(account.user_id, token, "user-info");
 
  return (
   <>
    <Header userInfo={userInfo} />
    <div className="flex flex-col md:flex-row">
      <Sidebar/>
      <main className="flex flex-col flex-1 p-4 sm:p-8 bg-gray-100 min-h-screen">
        {children}
      </main>
    </div>
   </>
  );
}