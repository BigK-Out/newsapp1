import Link from "next/link";
import type { Post } from "@/lib/types";
import { readingMinutes } from "@/lib/format";

export default function MostRead({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <section aria-labelledby="read-title" className="most-read">
      <h2 id="read-title" className="sec-label"><span>Most read</span></h2>
      <ol>
        {posts.map((p, i) => (
          <li key={p._id}>
            <span className="rank" aria-hidden="true">{i + 1}</span>
            <div>
              <Link href={`/postitems/${p._id}`}>{p.title}</Link>
              <p className="meta">
                {p.kind === "opinion" ? "Opinion" : p.category} · {readingMinutes(p)} min
                {p.views > 0 && <> · {p.views.toLocaleString("en-GB")} {p.views === 1 ? "read" : "reads"}</>}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
