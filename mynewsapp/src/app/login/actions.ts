"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { EDITOR_COOKIE, EDITOR_MAX_AGE, checkPassword, safeNext, tokenFor } from "@/lib/auth";

export async function login(formData: FormData) {
  const next = safeNext(formData.get("next"));
  const input = String(formData.get("password") ?? "");
  if (!checkPassword(input)) {
    redirect(`/login?error=1&next=${encodeURIComponent(next)}`);
  }
  cookies().set(EDITOR_COOKIE, tokenFor(input), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: EDITOR_MAX_AGE,
  });
  redirect(next);
}

export async function logout() {
  cookies().delete(EDITOR_COOKIE);
  redirect("/");
}
