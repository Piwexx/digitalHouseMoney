/* eslint-disable @typescript-eslint/no-unused-vars */
import redisService from "@/services/redis";
import { getTokenHeader } from "@/utils/getTokenHeader";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request:NextRequest) {
  try {

    const authorization = await getTokenHeader('Authorization')

    if (!authorization.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const API_KEY = authorization.slice(7).trim();
  
    if (API_KEY !== process.env.REDIS_API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const {searchParams} = new URL(request.url)
    const key = searchParams.get("key") || ""

    const token = await redisService.get(key)

    if(!token){
       return NextResponse.json(
          { error: "No se pudo iniciar sesión. Intenta de nuevo." },
          { status: 403 }
        );
    }
            
    return NextResponse.json({token:token},{ status: 200 });
    
  } catch (e) {
    return NextResponse.json(
      { error: "No se pudo iniciar sesión. Intenta de nuevo." },
      { status: 400 }
    );
  }
}