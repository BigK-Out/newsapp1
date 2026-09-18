import Link from "next/link";
import type { Post } from "@/lib/types";
import { categoryHref, readingMinutes, timeAgo } from "@/lib/format";
import Duo from "./Duo";
import SaveButton from "./SaveButton";

export default function StoryCard({ post, layout = "card" }: { post: Post; layout?: "card" | "row" | "compact" }) {
  const href = `/postitems/${post._id}`;
  return (
    <article className={`story story-${layout}`}>
      {layout !== "compact" && (
        <Link href={href} className="story-img" tabIndex={-1} aria-hidden="true">
          <Duo src={post.img} ratio={layout === "row" ? "1 / 1" : "3 / 2"} />
        </Link>
      )}
      <div className="story-text">
        <p className="kicker">
          <Link href={categoryHref(post.category)}>{post.category}</Link>
          <span>{timeAgo(post.date)}</span>
        </p>
        <h3>
          <Link href={href}>{post.title}</Link>
        </h3>
        {layout === "card" && post.brief && <p className="dek">{post.brief}</p>}
        <p className="byline">
          {post.author && <span>{post.author}</span>}
          <span>{readingMinutes(post)} min read</span>
          <SaveButton id={post._id} />
        </p>
      </div>
    </article>
  );
}
