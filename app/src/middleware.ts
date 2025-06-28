/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import { getSessionFromCookie } from "./utils/getSessionFromCookie";
import { getToken } from "./services/auth";

export async function middleware(request: NextRequest) {

	try {
		const sessionID = await getSessionFromCookie();
  	const {token} = await getToken(sessionID)

		if(!token){
			return NextResponse.redirect(new URL('/login',request.url));
		}

		return  getAuthenticationHeaders(request,token)
	} catch (e) {
		return NextResponse.redirect(new URL('/login',request.url));
	}

}

const getAuthenticationHeaders = (request: NextRequest,token:string) => {
	const requestHeaders = new Headers(request.headers)
	requestHeaders.set('x-access-token',token)

	
	return NextResponse.next({
		request:{
			headers:requestHeaders
		}
	})
}

//define que rutas activas el middleware
export const config = {
	matcher: ["/dashboard/:path*","/logout"],
};