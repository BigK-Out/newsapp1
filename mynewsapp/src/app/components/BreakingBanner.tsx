import Link from "next/link";
import type { Post } from "@/lib/types";
import { timeAgo } from "@/lib/format";

export default function BreakingBanner({ post }: { post: Post | null }) {
  if (!post) return null;
  return (
    <div className="breaking" role="region" aria-label="Breaking news">
      <div className="wrap breaking-inner">
        <strong className="breaking-label">Breaking</strong>
        <Link href={`/postitems/${post._id}`}>{post.title}</Link>
        <span className="breaking-time">{timeAgo(post.date)}</span>
      </div>
    </div>
  );
}
