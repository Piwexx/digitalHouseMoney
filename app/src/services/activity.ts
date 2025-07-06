import { ActivityItem } from "@/types/activity";
import { httpGet } from "./common/http";

// Renamed function to follow camelCase convention: getActivitys -> getActivities
export async function getActivities(accountId: number, token: string, options = {}): Promise<ActivityItem[]> {
  const data = await httpGet(undefined, `/accounts/${accountId}/activity`, {
    headers: {
      // "Content-Type": "application/json", // Not needed for GET
      "Authorization": token,
    },
    ...options,
  });
  return data as ActivityItem[];
}

// Renamed idTransation to idTransaction for clarity and typo correction
export async function getTransactionById(accountId: number, token: string, idTransaction: number, options = {}): Promise<ActivityItem> {
  const data = await httpGet(undefined, `/accounts/${accountId}/transactions/${idTransaction}`, {
    headers: {
      // "Content-Type": "application/json",
      "Authorization": token,
    },
    ...options,
  });
  return data as ActivityItem;
}