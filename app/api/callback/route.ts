import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const AUTH_COOKIE = "__SecureAuth";
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const { code, clientId } = payload;

    if (!code || !clientId) {
      return NextResponse.json({ message: "No Code and clientId" });
    }

    const response = await fetch("http://domainone.com/api/sso", {
      method: "GET",
      headers: {
        identifierCode: code,
        clientId: clientId,
      },
    });

    const body = await response.json();

    if (response.status != 200) throw new Error(body.message);

    const jwtTokenRes = await fetch("http://domainone.com/api/sso/retrive", {
      method: "GET",
      headers: {
        tempToken: body.jwtToken,
      },
    });

    const nextbody = await jwtTokenRes.json();

    if (jwtTokenRes.status != 200) throw new Error(body.message);

    return new Response("Access Granted", {
      status: 200,
      headers: {
        "Set-Cookie": `${AUTH_COOKIE}=${nextbody.token}; HttpOnly; SameSite=Strict; Path=/`,
      },
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}
