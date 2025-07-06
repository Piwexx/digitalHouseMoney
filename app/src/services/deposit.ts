import { httpPost } from "./common/http";

// Assuming Deposit type might be used elsewhere, consider moving to @/types/deposit.ts
export interface DepositPayload { // Renamed to clarify it's a payload
  origin: string;
  destination: string;
  dated: string; // ISO date string
  amount: number;
}

export interface DepositResponse extends DepositPayload { // Assuming response includes payload fields
  id: number; // Plus an ID from the server
  status?: string; // Example additional field
}


export async function postDeposits(
  accountId: number,
  body: DepositPayload,
  token: string,
  options = {}
): Promise<DepositResponse> {
  const data = await httpPost(undefined, `/accounts/${accountId}/deposits`, body, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    ...options,
  });
  // The console.error can be removed if HttpError handling in http.ts is sufficient
  // or if callers are expected to handle and log errors.
  // For now, removing the .catch here to rely on httpPost's error propagation.
  return data as DepositResponse;
}