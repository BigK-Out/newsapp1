import { cache } from "react";
import mongoose from "mongoose";
import dbConnect from "../../config/db";
import PostItem from "../../models/PostItem";
import { SEED } from "./seed";
import type { Post } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serialize(d: any): Post {
  return {
    _id: String(d._id),
    title: d.title ?? "",
    category: d.category ?? "",
    kind: d.kind === "opinion" ? "opinion" : "news",
    img: d.img ?? "",
    caption: d.caption ?? "",
    brief: d.brief ?? "",
    body: d.body ?? "",
    author: d.author ?? "",
    avatar: d.avatar ?? "",
    date: new Date(d.date ?? d.createdAt ?? Date.now()).toISOString(),
    top: !!d.top,
    trending: !!d.trending,
    breaking: !!d.breaking,
    views: Number(d.views) || 0,
  };
}

/**
 * All posts, newest first. Falls back to read-only demo stories when the database is unreachable.
 * Cached per request, so the layout and the page share one query.
 */
export const getPosts = cache(async (): Promise<{ posts: Post[]; demo: boolean }> => {
  try {
    await dbConnect();
    const docs = await PostItem.find().sort({ date: -1 }).lean();
    return { posts: docs.map(serialize), demo: false };
  } catch {
    return { posts: [...SEED].sort((a, b) => +new Date(b.date) - +new Date(a.date)), demo: true };
  }
});

/** `offline` means the post may exist but the database couldn't be reached. */
export async function getPost(id: string): Promise<{ post: Post | null; demo: boolean; offline: boolean }> {
  if (id.startsWith("demo-")) {
    return { post: SEED.find((p) => p._id === id) ?? null, demo: true, offline: false };
  }
  if (!mongoose.isValidObjectId(id)) return { post: null, demo: false, offline: false };
  try {
    await dbConnect();
    const doc = await PostItem.findById(id).lean();
    return { post: doc ? serialize(doc) : null, demo: false, offline: false };
  } catch {
    return { post: null, demo: false, offline: true };
  }
}

export function matches(post: Post, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return false;
  return q.split(/\s+/).every((term) =>
    [post.title, post.brief, post.body, post.author, post.category].some((f) => f.toLowerCase().includes(term))
  );
}

export const isOpinion = (p: Post) => p.kind === "opinion";
export const isNews = (p: Post) => p.kind !== "opinion";

/** Ranked by real page views; stories nobody has opened yet fall back to the editor's "trending" flag, then recency. */
export function mostRead(posts: Post[], limit = 5) {
  return [...posts]
    .sort((a, b) => b.views - a.views || Number(b.trending) - Number(a.trending) || +new Date(b.date) - +new Date(a.date))
    .slice(0, limit);
}

/** The newest story flagged as breaking from the last 24 hours, if any. */
export function breakingStory(posts: Post[], now = Date.now()) {
  return posts.find((p) => p.breaking && now - +new Date(p.date) < 24 * 3600_000) ?? null;
}
