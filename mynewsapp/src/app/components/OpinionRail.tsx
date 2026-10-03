import Link from "next/link";
import type { Post } from "@/lib/types";
import { authorHref } from "@/lib/format";
import Avatar from "./Avatar";

export default function OpinionRail({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="opinion-rail" aria-labelledby="opinion-title">
      <h2 id="opinion-title" className="sec-label">
        <Link href="/opinion"><span>Opinion ›</span></Link>
      </h2>
      <ul>
        {posts.map((p) => (
          <li key={p._id}>
            <div>
              {p.author && <Link href={authorHref(p.author)} className="opinion-author">{p.author}</Link>}
              <Link href={`/postitems/${p._id}`} className="opinion-title">{p.title}</Link>
            </div>
            <Avatar name={p.author || "?"} src={p.avatar} size={52} />
          </li>
        ))}
      </ul>
    </section>
  );
}
