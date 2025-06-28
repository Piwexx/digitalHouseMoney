import { Account } from "@/types/account";
import { httpGet } from "./common/http";


export async function getAcountInfo(token: string, options = {}): Promise<Account> {
	return httpGet(undefined,'/account',{
		headers: {
      "Content-Type": "application/json",
			"Authorization":token
		},
		...options,
	})
		.then((data) => data as any)
		.catch((error) => {
			throw error;
		});
}