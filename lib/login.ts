"use server"

import { EmployeeBasic } from "@/definitions/types/Employee";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sign } from "./jwtUtils";

export async function login(prevState: any, formData: FormData) {
    await delay(100)
    const KEY = process.env.JWT_KEY
    console.log(formData)
    const password = formData.get("password")?.toString()
    const email = formData.get("email")?.toString()
    console.log(password, email)
    if (!KEY || password === undefined) {
        return { error: true }
    }
    const db_user: EmployeeBasic = { id: 0, fullName: "Maria", location_id: 0 };
    if (db_user) {
        const jwt = await sign(
            {
                id: db_user.id,
                fullName: db_user.fullName,
                location_id: db_user.location_id
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