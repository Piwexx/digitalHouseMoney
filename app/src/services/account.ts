import { Account } from "@/types/account";
import { httpGet } from "./common/http";

export async function getAcountInfo(token: string, options = {}): Promise<Account> {
  const data = await httpGet(undefined, '/account', {
    headers: {
      // "Content-Type": "application/json", // Not needed for GET if defaultHeaders in http.ts covers Accept
      "Authorization": token,
    },
    ...options,
  });
  return data as Account;
}