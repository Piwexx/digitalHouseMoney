import { User } from "@/types/user";
import { httpGet, httpPatch } from "./common/http";

export async function getUserInfo(id: number, token: string, options = {}): Promise<User> {
	return httpGet(undefined,`/users/${id}`,{
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

export async function patchUserInfo(id: number, body: any, options = {},token:string): Promise<any> {
	return httpPatch(undefined,`/users/${id}`,body, {
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