import { Card } from  '@/types/card'
import { httpDelete, httpGet, httpPost } from "./common/http";

export async function getCards(id: number, token: string, options = {}): Promise<Card[]> {
	return httpGet(undefined,`/accounts/${id}/cards`, {
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

export async function postCards(id: number, body: any, token: string ,options = {}): Promise<any> {
	return httpPost(undefined,`/accounts/${id}/cards`, body, {
		headers: {
			"Content-Type": "application/json",
      "Authorization": token
		},
		...options,
	})
		.then((data) => data as any)
		.catch((error) => {
			throw error;
		});
}


export async function deleteCard(id: number, cardId: number, token: string, options = {}): Promise<any> {
	return httpDelete(undefined,`/accounts/${id}/cards/${cardId}`, {
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

export async function getCardById(id: number = 0, token: string, cardId: string, options = {}): Promise<Card> {
	return httpGet(undefined,`/accounts/${id}/cards/${cardId}`,{
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