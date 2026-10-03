import Link from "next/link";
import type { Post } from "@/lib/types";
import { categoryHref, categoryInk, timeAgo } from "@/lib/format";
import Duo from "./Duo";

/** One category: a lead story with a picture plus a short list of headlines. */
export default function SectionBlock({ name, posts }: { name: string; posts: Post[] }) {
  const [first, ...rest] = posts;
  if (!first) return null;
  return (
    <section className={`section-block ink-${categoryInk(name)}`} aria-labelledby={`sec-${name}`}>
      <h2 id={`sec-${name}`} className="section-head">
        <Link href={categoryHref(name)}>{name} <span aria-hidden="true">›</span></Link>
      </h2>
      <div className="section-body">
        <article className="story">
          <Link href={`/postitems/${first._id}`} className="story-img" tabIndex={-1} aria-hidden="true">
            <Duo src={first.img} ratio="3 / 2" />
          </Link>
          <h3><Link href={`/postitems/${first._id}`}>{first.title}</Link></h3>
        </article>
        {rest.length > 0 && (
          <ul className="section-list">
            {rest.slice(0, 3).map((p) => (
              <li key={p._id}>
                <Link href={`/postitems/${p._id}`}>{p.title}</Link>
                <span className="meta">{timeAgo(p.date)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
