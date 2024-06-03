"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sign } from "./jwtUtils";
import { TokenUser } from "@/definitions/types/Token";

export async function login(prevState: any, formData: FormData) {
    await delay(100)
    const KEY = process.env.JWT_KEY
    const password = formData.get("password")?.toString()
    const email = formData.get("email")?.toString()
    console.log(KEY, password, email)
    if (!KEY || password === undefined) {
        return { error: true }
    }
    if (email !== "wifeofwriter@gmail.com" || password !== "123") {
        return { error: true }
    }
    console.log("login")
    console.log(email, password)
    const db_user: TokenUser = { id: 0, fullName: "Maria", position: "admin", locationId: 0 };
    if (db_user) {
        const jwt = await sign(
            {
                id: db_user.id,
                fullName: db_user.fullName,
                position: db_user.position,
                locationId: db_user.locationId
            },
            KEY
        )
        cookies().set("currentUser", jwt)
        revalidatePath("/dashboard")
        redirect("/dashboard")
        return { error: false }
    }
    await delay(1500)
    return { error: true }
}

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }