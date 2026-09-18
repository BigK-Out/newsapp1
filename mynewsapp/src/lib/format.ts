import type { Post } from "./types";

export const imgSrc = (img: string) =>
  /^(https?:)?\/\//.test(img) || img.startsWith("/") ? img : `/${img}`;

export function readingMinutes(post: Pick<Post, "brief" | "body">) {
  const words = `${post.brief} ${post.body}`.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function paragraphs(post: Pick<Post, "brief" | "body">) {
  const text = post.body?.trim() || post.brief?.trim() || "";
  return text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
}

export function timeAgo(iso: string, now = Date.now()) {
  const mins = Math.max(0, Math.round((now - new Date(iso).getTime()) / 60000));
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 8) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function longDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const categoryHref = (category: string) => `/category/${encodeURIComponent(category.toLowerCase())}`;

export function categoriesOf(posts: Post[]) {
  const counts = new Map<string, number>();
  for (const p of posts) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }));
}
