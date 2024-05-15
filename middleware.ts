import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname === "/") {
      req.nextUrl.pathname = "/login"
      return NextResponse.redirect(req.nextUrl)
    }
    if (req.nextUrl.pathname === "/dashboard") {
        req.nextUrl.pathname = "/dashboard/current-shift"
        return NextResponse.redirect(req.nextUrl)
      }
      
    return NextResponse.next()
  }