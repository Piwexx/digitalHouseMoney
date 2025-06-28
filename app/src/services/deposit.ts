import { httpPost } from "./common/http";

interface Deposit {
  origin: string;
  destination: string;
  dated: string;
  amount: number;
}

export async function postDeposits(id: number, body: Deposit, token:string, options = {}): Promise<Deposit> {
	return httpPost(undefined,`/accounts/${id}/deposits`, body, {
		headers: {
			"Content-Type": "application/json",
      "Authorization":token
		},
		...options,
	})
		.then((data) => data as any)
		.catch((error) => {
			console.error(error);
			throw error;
		});
}