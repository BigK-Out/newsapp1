import { redirect } from "next/navigation";
import { isEditor, passwordConfigured, safeNext } from "@/lib/auth";
import { login } from "./actions";

export const metadata = { title: "Editor sign in · ForPeople News" };

export default function Login({ searchParams }: { searchParams: { next?: string | string[]; error?: string } }) {
  const next = safeNext(searchParams.next);
  if (isEditor()) redirect(next);

  return (
    <main className="wrap page">
      <p className="eyebrow">Newsroom</p>
      <h1 className="page-title">Editor sign in</h1>
      {passwordConfigured() ? (
        <form action={login} className="form">
          <input type="hidden" name="next" value={next} />
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus {...(searchParams.error ? { "aria-invalid": true } : {})} />
          </div>
          {searchParams.error && <p role="alert" className="form-error wide">That password didn&apos;t work. Try again.</p>}
          <div className="wide actions">
            <button type="submit" className="btn">Sign in</button>
          </div>
        </form>
      ) : (
        <p className="muted">Editing is turned off. Set <code>EDITOR_PASSWORD</code> on the server to enable it.</p>
      )}
    </main>
  );
}
