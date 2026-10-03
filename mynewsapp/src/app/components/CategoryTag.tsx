import Link from "next/link";
import type { Post } from "@/lib/types";
import { categoryHref, categoryInk } from "@/lib/format";

/** Ink-coloured label. Opinion pieces are labelled "Opinion" and link to the opinion section. */
export default function CategoryTag({ post }: { post: Pick<Post, "category" | "kind"> }) {
  if (post.kind === "opinion") {
    return <Link href="/opinion" className="tag tag-opinion">Opinion</Link>;
  }
  return (
    <Link href={categoryHref(post.category)} className={`tag ink-${categoryInk(post.category)}`}>
      {post.category}
    </Link>
  );
}
