import Link from "next/link";
import type { Post } from "@/lib/types";
import { authorHref, categoryInk, readingMinutes, timeAgo } from "@/lib/format";
import Duo from "./Duo";
import SaveButton from "./SaveButton";
import CategoryTag from "./CategoryTag";
import Avatar from "./Avatar";

export default function StoryCard({ post, layout = "card" }: { post: Post; layout?: "card" | "row" | "compact" }) {
  const href = `/postitems/${post._id}`;
  const opinion = post.kind === "opinion";
  return (
    <article className={`story story-${layout} ink-${categoryInk(post.category)}${opinion ? " is-opinion" : ""}`}>
      {layout !== "compact" && (
        <Link href={href} className="story-img" tabIndex={-1} aria-hidden="true">
          <Duo src={post.img} ratio={layout === "row" ? "1 / 1" : "3 / 2"} />
        </Link>
      )}
      <div className="story-text">
        <p className="kicker">
          <CategoryTag post={post} />
          <span>{timeAgo(post.date)}</span>
        </p>
        <h3>
          <Link href={href}>{post.title}</Link>
        </h3>
        {layout === "card" && post.brief && <p className="dek">{post.brief}</p>}
        <p className="byline">
          {post.author && (
            <Link href={authorHref(post.author)} className="byline-author">
              {opinion && <Avatar name={post.author} src={post.avatar} size={24} />}
              {post.author}
            </Link>
          )}
          <span>{readingMinutes(post)} min read</span>
          <SaveButton id={post._id} />
        </p>
      </div>
    </article>
  );
}
