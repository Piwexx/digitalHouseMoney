import { Card, CardPostPayload, CardPostResponse } from  '@/types/card'; // Assuming CardPostResponse and CardPostPayload types exist
import { httpDelete, httpGet, httpPost } from "./common/http";

export async function getCards(id: number, token: string, options = {}): Promise<Card[]> {
  const data = await httpGet(undefined, `/accounts/${id}/cards`, {
    headers: {
      // "Content-Type": "application/json", // Not needed for GET if defaultHeaders in http.ts covers Accept
      "Authorization": token,
    },
    ...options,
  });
  return data as Card[]; // Cast to the expected type
}

// Define a more specific type for body if available, e.g., CardPostPayload
// Assuming CardPostResponse is the expected response type for posting a card
export async function postCards(id: number, body: CardPostPayload, token: string, options = {}): Promise<CardPostResponse> {
  const data = await httpPost(undefined, `/accounts/${id}/cards`, body, {
    headers: {
      "Content-Type": "application/json", // Explicitly set for POST
      "Authorization": token,
    },
    ...options,
  });
  return data as CardPostResponse;
}

// Assuming delete operation might return nothing (null if 204) or some confirmation object
// Using Promise<void | null> if 204 is expected and returns null from handleResponse
// Or Promise<DeleteSuccessResponse> if it returns a body
export async function deleteCard(id: number, cardId: number, token: string, options = {}): Promise<void | null> {
  const data = await httpDelete(undefined, `/accounts/${id}/cards/${cardId}`, {
    headers: {
      // "Content-Type": "application/json", // Not usually needed for DELETE
      "Authorization": token,
    },
    ...options,
  });
  // If httpDelete's handleResponse returns null for 204, this cast might not be needed
  // or adjust based on actual expected success response (e.g. status message object)
  return data as (void | null);
}

export async function getCardById(id: number, token: string, cardId: string, options = {}): Promise<Card> {
  // Removed default id = 0 as it seems like an accountId and should likely always be provided
  const data = await httpGet(undefined, `/accounts/${id}/cards/${cardId}`, {
    headers: {
      // "Content-Type": "application/json",
      "Authorization": token,
    },
    ...options,
  });
  return data as Card;
}