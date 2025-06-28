import { ActivityItem } from "@/types/activity";
import {httpGet} from "./common/http";

export async function getActivitys(id: number, token: string, options = {}): Promise<ActivityItem []> {
	return httpGet(undefined,`/accounts/${id}/activity`, {
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

export async function getTransactions(id: number, token: string, options = {},idTransation:number): Promise<ActivityItem> {
	return httpGet(undefined,`/accounts/${id}/transactions/${idTransation}`, {
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