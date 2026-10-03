import Link from "next/link";
import { getPosts, isOpinion } from "@/lib/posts";
import StoryCard from "../components/StoryCard";
import DemoNote from "../components/DemoNote";

export const dynamic = "force-dynamic";
export const metadata = { title: "Opinion · ForPeople News" };

export default async function Opinion() {
  const { posts, demo } = await getPosts();
  const opinions = posts.filter(isOpinion);
  return (
    <main className="wrap page">
      <DemoNote demo={demo} />
      <p className="eyebrow">Columns and editorials</p>
      <h1 className="page-title">Opinion</h1>
      <p className="muted section-intro">Arguments, not news. Our columnists write in their own voice; the Editorial Board speaks for the paper.</p>
      {opinions.length === 0 ? (
        <div className="empty">
          <h2>No columns yet</h2>
          <Link href="/createpostitems" className="btn">Write the first one</Link>
        </div>
      ) : (
        <div className="grid">
          {opinions.map((p) => <StoryCard key={p._id} post={p} />)}
        </div>
      )}
    </main>
  );
}
