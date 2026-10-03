"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("busy");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Couldn't sign you up. Try again.");
      setState("done");
      setMessage(data.message);
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Couldn't sign you up. Try again.");
    }
  };

  if (state === "done") {
    return <p className="newsletter-done" role="status">{message}</p>;
  }

  return (
    <form className="newsletter-form" onSubmit={submit}>
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <input
        id="nl-email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (state === "error") setState("idle");
        }}
        aria-invalid={state === "error" || undefined}
        aria-describedby={state === "error" ? "nl-error" : undefined}
      />
      <button type="submit" className="btn" disabled={state === "busy"}>
        {state === "busy" ? "Signing up…" : "Sign up"}
      </button>
      {state === "error" && <p id="nl-error" role="alert" className="form-error">{message}</p>}
    </form>
  );
}
