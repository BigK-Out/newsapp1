"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Post } from "@/lib/types";
import Duo from "./Duo";

type Fields = Pick<Post, "title" | "category" | "img" | "author" | "brief" | "body" | "top" | "trending">;

const EMPTY: Fields = { title: "", category: "", img: "", author: "", brief: "", body: "", top: false, trending: false };
const SUGGESTED_CATEGORIES = ["City", "Transit", "Money", "Culture", "Health", "Sport"];

export default function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const editing = !!post;
  const [f, setF] = useState<Fields>(
    post
      ? { title: post.title, category: post.category, img: post.img, author: post.author, brief: post.brief, body: post.body, top: post.top, trending: post.trending }
      : EMPTY
  );
  const [missing, setMissing] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setF((prev) => ({ ...prev, [key]: value }));
    setMissing((m) => m.filter((k) => k !== key));
    setError("");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const required: (keyof Fields)[] = ["title", "category", "img", "brief"];
    const empty = required.filter((k) => !String(f[k]).trim());
    if (empty.length) {
      setMissing(empty);
      setError("Fill in the highlighted fields to publish.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(editing ? `/api/postitems/${post!._id}` : "/api/postitems", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Something went wrong on our side. Try again.");
      router.push(`/postitems/${data._id ?? post!._id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't publish. Try again.");
      setBusy(false);
    }
  };

  const bad = (k: string) => (missing.includes(k) ? { "aria-invalid": true } : {});

  return (
    <main className="wrap page">
      <p className="eyebrow">{editing ? "Editing" : "New story"}</p>
      <h1 className="page-title">{editing ? "Edit story" : "Write a story"}</h1>

      <form onSubmit={submit} className="form" noValidate>
        <div className="field wide">
          <label htmlFor="title">Headline</label>
          <input id="title" value={f.title} onChange={(e) => set("title", e.target.value)} {...bad("title")} />
        </div>

        <div className="field">
          <label htmlFor="category">Category</label>
          <input id="category" list="cats" value={f.category} onChange={(e) => set("category", e.target.value)} {...bad("category")} />
          <datalist id="cats">
            {SUGGESTED_CATEGORIES.map((c) => <option key={c} value={c} />)}
          </datalist>
        </div>

        <div className="field">
          <label htmlFor="author">Byline</label>
          <input id="author" value={f.author} onChange={(e) => set("author", e.target.value)} />
        </div>

        <div className="field wide">
          <label htmlFor="img">Image URL or path</label>
          <input id="img" value={f.img} onChange={(e) => set("img", e.target.value)} placeholder="https://… or assets/img/courier.jpg" {...bad("img")} />
          {f.img.trim() && (
            <div className="preview">
              <Duo src={f.img.trim()} ratio="3 / 2" />
              <span>Preview in listings</span>
            </div>
          )}
        </div>

        <div className="field wide">
          <label htmlFor="brief">Summary <small>{f.brief.length}/220</small></label>
          <textarea id="brief" rows={3} maxLength={220} value={f.brief} onChange={(e) => set("brief", e.target.value)} {...bad("brief")} />
        </div>

        <div className="field wide">
          <label htmlFor="body">Story <small>Separate paragraphs with a blank line</small></label>
          <textarea id="body" rows={12} value={f.body} onChange={(e) => set("body", e.target.value)} />
        </div>

        <fieldset className="field wide checks">
          <legend>Placement</legend>
          <label><input type="checkbox" checked={f.top} onChange={(e) => set("top", e.target.checked)} /> Lead story on the front page</label>
          <label><input type="checkbox" checked={f.trending} onChange={(e) => set("trending", e.target.checked)} /> Include in Most read</label>
        </fieldset>

        {error && <p role="alert" className="form-error wide">{error}</p>}

        <div className="wide actions">
          <button type="submit" className="btn" disabled={busy}>{busy ? "Publishing…" : editing ? "Save changes" : "Publish story"}</button>
          <button type="button" className="btn btn-ghost" onClick={() => router.back()}>Cancel</button>
        </div>
      </form>
    </main>
  );
}
