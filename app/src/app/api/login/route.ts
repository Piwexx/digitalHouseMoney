/* eslint-disable @typescript-eslint/no-unused-vars */
import { login } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";
import { schemaLogin } from "@/schemas/login";
import { setUuid } from "@/utils/uuid";
import { cookieHeader } from "@/utils/cookieHeader";
import redisService from "@/services/redis";
import { EXPIRES } from "@/constants/constants";



export async function POST(request:NextRequest) {
  try {

    const {email,password} = await schemaLogin.validate(await request.json())
    const resp = await login({email,password})

    if(!resp.token) throw new Error("Login inválido")
     
    const sessionId = setUuid()
  
    await redisService.set(sessionId,resp.token,{EX: EXPIRES})
    
    const authCookie = cookieHeader({
      name:'SessionID',
      value:sessionId,
      hours:1
    })

    //New cuando queremos enviar cookie
    return new NextResponse(JSON.stringify({ok:true}),{
      status: 200,
      headers:{'Set-Cookie': authCookie}
    })

  } catch (e) {
    return NextResponse.json(
      { error: "No se pudo iniciar sesión. Intenta de nuevo." },
      { status: 400 }
    );
  }
}