import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { categoriesOf, categoryHref, categoryInk } from "@/lib/format";
import StoryCard from "../components/StoryCard";
import DemoNote from "../components/DemoNote";

export const dynamic = "force-dynamic";
export const metadata = { title: "Latest · ForPeople News" };

export default async function Latest() {
  const { posts, demo } = await getPosts();
  return (
    <main className="wrap page">
      <DemoNote demo={demo} />
      <p className="eyebrow">Everything, newest first</p>
      <h1 className="page-title">Latest</h1>
      <nav className="chips" aria-label="Browse by category">
        {categoriesOf(posts).map((c) => (
          <Link key={c.name} href={categoryHref(c.name)} className={`ink-${categoryInk(c.name)}`}>{c.name} <span>{c.count}</span></Link>
        ))}
      </nav>
      {posts.length === 0 ? (
        <div className="empty">
          <h2>No stories yet</h2>
          <Link href="/createpostitems" className="btn">Write the first story</Link>
        </div>
      ) : (
        <div className="grid">
          {posts.map((p) => <StoryCard key={p._id} post={p} />)}
        </div>
      )}
    </main>
  );
}
