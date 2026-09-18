"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/types";
import StoryCard from "./StoryCard";
import { useSaved } from "./saved";

export default function SavedList() {
  const { ids } = useSaved();
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    fetch("/api/postitems")
      .then((r) => r.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]));
  }, []);

  if (posts === null) return <p className="muted">Loading your saved stories…</p>;
  const saved = posts.filter((p) => ids.includes(p._id));

  if (saved.length === 0) {
    return (
      <div className="empty">
        <h2>Nothing saved yet</h2>
        <p>Press the bookmark on any story to keep it here. Saved stories stay on this device.</p>
        <Link href="/postitems" className="btn">Browse latest stories</Link>
      </div>
    );
  }
  return (
    <div className="stack">
      {saved.map((p) => (
        <StoryCard key={p._id} post={p} layout="row" />
      ))}
    </div>
  );
}
