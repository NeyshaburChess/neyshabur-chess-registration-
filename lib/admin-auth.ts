import { cookies } from "next/headers";
import crypto from "crypto";
 
 
const COOKIE_NAME = "chess_admin_session";
 
 
export async function createSession(username: string) {
 
  const token = crypto
    .createHash("sha256")
    .update(
      username + process.env.ADMIN_SECRET
    )
    .digest("hex");
 
 
  const cookieStore = await cookies();
 
 
  cookieStore.set(
    COOKIE_NAME,
    token,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    }
  );
 
}
 
 
 
export async function checkSession() {
 
  const cookieStore = await cookies();
 
 
  const cookie = cookieStore.get(
    COOKIE_NAME
  );
 
 
  return !!cookie;
 
}
 
 
 
export async function logout() {
 
  const cookieStore = await cookies();
 
 
  cookieStore.delete(
    COOKIE_NAME
  );
 
}
 