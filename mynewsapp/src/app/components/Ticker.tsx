import Link from "next/link";
import type { Post } from "@/lib/types";

export default function Ticker({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  const items = posts.slice(0, 8);
  return (
    <div className="ticker" aria-label="Latest headlines">
      <span className="ticker-label">Wire</span>
      <div className="ticker-viewport">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1}>
              {items.map((p) => (
                <li key={p._id}>
                  <Link href={`/postitems/${p._id}`} tabIndex={copy === 1 ? -1 : undefined}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
