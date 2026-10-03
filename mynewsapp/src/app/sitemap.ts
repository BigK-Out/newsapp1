import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getPosts } from "@/lib/posts";
import { authorHref, categoriesOf, categoryHref } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const h = headers();
  const origin = `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;
  const { posts } = await getPosts();
  const authors = Array.from(new Set(posts.map((p) => p.author).filter(Boolean)));
  return [
    { url: `${origin}/`, changeFrequency: "hourly", priority: 1 },
    { url: `${origin}/postitems`, changeFrequency: "hourly" },
    { url: `${origin}/opinion`, changeFrequency: "daily" },
    ...categoriesOf(posts).map((c) => ({ url: origin + categoryHref(c.name) })),
    ...authors.map((a) => ({ url: origin + authorHref(a) })),
    ...posts.map((p) => ({ url: `${origin}/postitems/${p._id}`, lastModified: p.date })),
  ];
}
