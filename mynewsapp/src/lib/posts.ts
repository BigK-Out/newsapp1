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
    img: d.img ?? "",
    brief: d.brief ?? "",
    body: d.body ?? "",
    author: d.author ?? "",
    avatar: d.avatar ?? "",
    date: new Date(d.date ?? d.createdAt ?? Date.now()).toISOString(),
    top: !!d.top,
    trending: !!d.trending,
  };
}

/** All posts, newest first. Falls back to read-only demo stories when the database is unreachable. */
export async function getPosts(): Promise<{ posts: Post[]; demo: boolean }> {
  try {
    await dbConnect();
    const docs = await PostItem.find().sort({ date: -1 }).lean();
    return { posts: docs.map(serialize), demo: false };
  } catch {
    return { posts: [...SEED].sort((a, b) => +new Date(b.date) - +new Date(a.date)), demo: true };
  }
}

export async function getPost(id: string): Promise<{ post: Post | null; demo: boolean }> {
  if (id.startsWith("demo-")) {
    return { post: SEED.find((p) => p._id === id) ?? null, demo: true };
  }
  try {
    await dbConnect();
    const doc = await PostItem.findById(id).lean();
    return { post: doc ? serialize(doc) : null, demo: false };
  } catch {
    return { post: null, demo: false };
  }
}

export function matches(post: Post, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return false;
  return q.split(/\s+/).every((term) =>
    [post.title, post.brief, post.body, post.author, post.category].some((f) => f.toLowerCase().includes(term))
  );
}
