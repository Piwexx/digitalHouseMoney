import Sidebar from "@/ui/dashboard/Sidebar";
import Header from "@/ui/home/Header"; // Assuming Header might become a client component or use useAuth
import { getTokenHeader } from "@/utils/getTokenHeader";
import { getAcountInfo } from "@/services/account";
import { getUserInfo } from "@/services/userInfo";
import { AuthProvider } from "@/context/AuthContext"; // Import AuthProvider

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const token = await getTokenHeader('x-access-token'); // Assuming this works server-side

  // Initialize to nulls in case of errors, though services might throw
  let account = null;
  let userInfo = null;

  if (token) {
    try {
      account = await getAcountInfo(token);
      if (account) {
        // Pass a revalidation tag if getUserInfo is set up to use it for server-side fetch
        // For now, assuming "user-info" is a placeholder or not used by this specific getUserInfo call.
        userInfo = await getUserInfo(account.user_id, token /*, "user-info" */);
      }
    } catch (error) {
      console.error("Error fetching initial auth data in DashboardLayout:", error);
      // Handle error appropriately, e.g., redirect to login, show error page
      // For now, user and account will remain null, and AuthProvider will pass that down.
      // Depending on app structure, might redirect here.
    }
  } else {
    console.warn("No token found in DashboardLayout. User might not be authenticated.");
    // Redirect to login would typically happen here or in middleware
  }
 
  return (
    <AuthProvider
      initialUser={userInfo}
      initialToken={token}
      initialAccountId={account?.id || null}
    >
      {/* Header might be refactored to use useAuth() if it becomes a client component */}
      {/* Or, if Header remains a server component, it continues to receive userInfo as prop */}
      <Header userInfo={userInfo} />
      <div className="flex flex-col md:flex-row">
        <Sidebar/> {/* Sidebar might also use useAuth() if it needs user info and becomes client component */}
        <main className="flex flex-col flex-1 p-4 sm:p-8 bg-gray-100 min-h-screen">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}