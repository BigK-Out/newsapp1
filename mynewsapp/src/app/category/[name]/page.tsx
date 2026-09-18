import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { categoriesOf, categoryHref } from "@/lib/format";
import StoryCard from "../../components/StoryCard";
import DemoNote from "../../components/DemoNote";

export const dynamic = "force-dynamic";

export default async function Category({ params }: { params: { name: string } }) {
  const name = decodeURIComponent(params.name);
  const { posts, demo } = await getPosts();
  const inCategory = posts.filter((p) => p.category.toLowerCase() === name.toLowerCase());
  const label = inCategory[0]?.category ?? name;

  return (
    <main className="wrap page">
      <DemoNote demo={demo} />
      <p className="eyebrow">Category</p>
      <h1 className="page-title">{label}</h1>
      <nav className="chips" aria-label="Browse by category">
        {categoriesOf(posts).map((c) => (
          <Link key={c.name} href={categoryHref(c.name)} aria-current={c.name.toLowerCase() === name.toLowerCase() ? "page" : undefined}>
            {c.name} <span>{c.count}</span>
          </Link>
        ))}
      </nav>
      {inCategory.length === 0 ? (
        <div className="empty">
          <h2>No stories in “{label}”</h2>
          <p>Try another category above, or see everything.</p>
          <Link href="/postitems" className="btn">See all stories</Link>
        </div>
      ) : (
        <div className="grid">
          {inCategory.map((p) => <StoryCard key={p._id} post={p} />)}
        </div>
      )}
    </main>
  );
}
