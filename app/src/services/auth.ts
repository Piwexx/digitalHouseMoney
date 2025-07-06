import { UserData, GetTokenResponse, PostLoginBody, PostLoginResponse } from "@/types/login";
import { httpPost, httpGet } from "./common/http";
import { PostRegisterBody, PostRegisterResponse } from '@/types/register';

// Used for internal Next.js API routes (e.g., /api/login, /api/redis)
// Falls back to empty string, but http.ts will throw if base URL is ultimately empty.
// Expected to be set in .env for deployed environments (e.g., https://yourdomain.com)
// For local dev, can be http://localhost:3000 if calling own API routes.
const API_URL_PUBLIC = process.env.NEXT_PUBLIC_SITE_URL || '';

// Placeholder for the actual response type of /api/login if different from PostLoginResponse
interface AuthenticatedUserResponse {
  // Define structure based on what /api/login returns, e.g.:
  userId: string;
  email: string;
  // ... other relevant user session fields
  // For now, let's assume it's a subset of PostLoginResponse or similar
  token?: string;
  user?: { id: number; username: string; email: string; };
}

export async function login(
  body: PostLoginBody,
  options = {}
): Promise<PostLoginResponse> {
  return httpPost(undefined, "/login", body, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  }) as Promise<PostLoginResponse>;
}

export async function getToken(
  sessionID: string,
  options = {}
): Promise<GetTokenResponse> {
  const redisApiKey = process.env.REDIS_API_KEY;
  if (!redisApiKey) {
    console.error("REDIS_API_KEY is not configured.");
    // Option 1: Throw an error
    // throw new Error("Redis API key is not configured. Cannot get token.");
    // Option 2: Return a promise that rejects or an error structure
    return Promise.resolve({ token: '', error: "Configuration error: Missing Redis API Key." });
  }
  return httpGet(API_URL_PUBLIC, `/api/redis?key=${sessionID}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${redisApiKey}`
    },
    ...options,
  }) as Promise<GetTokenResponse>;
}

// Changed return type from Promise<Response> to Promise<AuthenticatedUserResponse>
// This assumes /api/login returns a JSON object with user session info
export async function getAuthenticated(userData: UserData): Promise<AuthenticatedUserResponse> {
  // The actual response type from httpPost will be unknown due to handleResponse.
  // The 'as Promise<AuthenticatedUserResponse>' casts this.
  // Ensure /api/login actually returns something compatible with AuthenticatedUserResponse.
  return httpPost(API_URL_PUBLIC, '/api/login', userData) as Promise<AuthenticatedUserResponse>;
}

export async function postRegister(
  body: PostRegisterBody,
  options = {}
): Promise<PostRegisterResponse> {
  // Removed redundant .then and .catch, httpPost will throw HttpError on failure
  // and handleResponse already parses JSON.
  return httpPost(undefined, "/users", body, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  }) as Promise<PostRegisterResponse>;
}