import { auth as proxy } from "@/auth";
import { NextResponse } from "next/server";
import { GetUserSessionWithRelations } from "./lib/Sessions/GetUserSessionWithRelations";
// =============================================
const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/cart", "/profile", "/order"];
// =====
export default proxy(async (req) => {
  const pathname = req.nextUrl.pathname;
  const userSession = await GetUserSessionWithRelations();
  if (authRoutes.includes(pathname) && userSession)
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  if (protectedRoutes.includes(pathname) && !userSession)
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  if (
    pathname.startsWith("/dashboard") &&
    (!userSession || userSession?.role == "USER")
  )
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  if (
    (pathname === "/dashboard/users" || pathname === "/dashboard/admins") &&
    userSession?.role !== "SUPER_ADMIN"
  )
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
});
export const config = {
  mathcer: [
    "/login",
    "/register",
    "/cart",
    "/profile",
    "/order",
    "/dashboard:path*",
  ],
};
