import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const EDITOR_COOKIE = "fp_editor";
export const EDITOR_MAX_AGE = 60 * 60 * 24 * 30;

const password = () => process.env.EDITOR_PASSWORD ?? "";

export const passwordConfigured = () => password() !== "";

/** With no EDITOR_PASSWORD set, editing is open in development and closed in production. */
export const editingOpen = () => !passwordConfigured() && process.env.NODE_ENV !== "production";

// The cookie holds an HMAC of the password, never the password itself. Changing the password signs everyone out.
export const tokenFor = (pw: string) => createHmac("sha256", pw).update("fp-editor-v1").digest("hex");

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function checkPassword(input: string) {
  return passwordConfigured() && safeEqual(tokenFor(input), tokenFor(password()));
}

export function isEditor() {
  if (editingOpen()) return true;
  if (!passwordConfigured()) return false;
  const token = cookies().get(EDITOR_COOKIE)?.value;
  return !!token && safeEqual(token, tokenFor(password()));
}

/** Returns a 401 response for non-editors, or null when the request may proceed. */
export function requireEditor() {
  return isEditor() ? null : Response.json({ message: "Sign in as an editor to do that." }, { status: 401 });
}

/** Only allow same-site relative redirects. */
export function safeNext(value: unknown) {
  const v = Array.isArray(value) ? value[0] : value;
  return typeof v === "string" && v.startsWith("/") && !v.startsWith("//") && !v.startsWith("/\\") ? v : "/";
}
