import { User } from "@/types/user";
import { httpGet, httpPatch } from "./common/http";

// Define a more specific type for the patch payload
// This usually contains a subset of User fields that are updatable.
export type UserInfoPatchPayload = Partial<Pick<User, 'firstname' | 'lastname' | 'phone'>>;
// Add other fields if they are also patchable, e.g. password, if handled here.

export async function getUserInfo(userId: number, token: string, options = {}): Promise<User> {
  const data = await httpGet(undefined, `/users/${userId}`, {
    headers: {
      // "Content-Type" not typically needed for GET requests
      "Authorization": token,
    },
    ...options,
  });
  return data as User;
}

// Assuming the patch operation returns the updated User object
export async function patchUserInfo(
  userId: number,
  body: UserInfoPatchPayload,
  // options = {} was present but not used for headers in the original, keeping for consistency
  // but typically headers are passed inside options if needed.
  // Let's assume options might contain other fetch settings.
  options = {},
  token: string
): Promise<User> {
  const data = await httpPatch(undefined, `/users/${userId}`, body, {
    headers: {
      "Content-Type": "application/json", // Required for PATCH with JSON body
      "Authorization": token,
    },
    ...options, // Spread options here to include any other fetch settings
  });
  return data as User; // Assuming API returns the updated user
}