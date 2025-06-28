import { UserData,GetTokenResponse,PostLoginBody,PostLoginResponse } from "@/types/login";
import { httpPost,httpGet} from "./common/http";
import {PostRegisterBody,PostRegisterResponse} from  '@/types/register'

const API_URL_PUBLIC = process.env.NEXT_PUBLIC_SITE_URL || ''

export async function login(
	body: PostLoginBody,
	options = {}
): Promise<PostLoginResponse> {
	return httpPost(undefined,"/login", body, {
		headers: {
			"Content-Type": "application/json",
		},
		...options,
	}) as Promise<PostLoginResponse>
}

export async function getToken(
	sessionID:string,
	options = {}
): Promise<GetTokenResponse> {
	return httpGet(API_URL_PUBLIC,`/api/redis?key=${sessionID}`,{
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${process.env.REDIS_API_KEY}`   
		},
		...options,
	}) as Promise<GetTokenResponse>
}

export async function getAuthenticated(userData: UserData): Promise<Response> {
  return httpPost(API_URL_PUBLIC,'/api/login', userData) as Promise<Response>;
}

export async function postRegister(
	body: PostRegisterBody,
	options = {}
): Promise<PostRegisterResponse> {
	return httpPost(undefined,"/users", body, {
		headers: {
			"Content-Type": "application/json",
		},
		...options,
	})
		.then((data) => {
			return data as PostRegisterResponse
		})
		.catch((error) => {
			throw error;
		});
}