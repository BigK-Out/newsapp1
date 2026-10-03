import { getPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const { posts } = await getPosts();
  const items = posts
    .slice(0, 30)
    .map((p) => {
      const url = `${origin}/postitems/${p._id}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <category>${esc(p.kind === "opinion" ? "Opinion" : p.category)}</category>${p.author ? `\n      <dc:creator>${esc(p.author)}</dc:creator>` : ""}
      <description>${esc(p.brief)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ForPeople News</title>
    <link>${origin}</link>
    <atom:link href="${origin}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Independent local news, read by the people it affects.</description>
    <language>en-gb</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
