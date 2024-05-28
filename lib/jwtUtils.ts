import { SignJWT, decodeJwt, jwtVerify } from "jose"
import { TokenUser } from "@/definitions/types/Token"
import { cookies } from "next/headers"

export async function sign(payload: TokenUser, secret: string): Promise<string> {
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + 60 * 60 // one hour

    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret))
}
export async function verify(token: string) {
    try {
        const secret = process.env.JWT_KEY
        await jwtVerify(token, new TextEncoder().encode(secret))
        return true
    } catch (e) {
        console.log("error:", e)
        return false
    }
}


export async function parse(token: string) {
    try {
        if (token && (await verify(token))) {
            const user = decodeJwt(token) as TokenUser
            return user
        }
        return null
    } catch (e) {
        return null
    }
}

export function getUserFromJWT() {
    const token = cookies().get("currentUser")?.value
    if (!token) {
        return {
            id: 0,
            fullName: "",
            position: "",
            locationId: 0,
        } as TokenUser
    }
    return decodeJwt(token) as TokenUser
}