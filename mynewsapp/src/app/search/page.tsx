import Link from "next/link";
import { getPosts, matches } from "@/lib/posts";
import { categoriesOf, categoryHref } from "@/lib/format";
import StoryCard from "../components/StoryCard";
import DemoNote from "../components/DemoNote";

export const dynamic = "force-dynamic";
export const metadata = { title: "Search · ForPeople News" };

export default async function Search({ searchParams }: { searchParams: { q?: string | string[] } }) {
  const raw = searchParams.q;
  const q = ((Array.isArray(raw) ? raw[0] : raw) ?? "").trim();
  const { posts, demo } = await getPosts();
  const results = q ? posts.filter((p) => matches(p, q)) : [];

  return (
    <main className="wrap page">
      <DemoNote demo={demo} />
      <p className="eyebrow">Search</p>
      <h1 className="page-title">{q ? <>Results for “{q}”</> : "Search stories"}</h1>
      <form action="/search" role="search" className="search search-big">
        <label htmlFor="q2" className="sr-only">Search stories</label>
        <input id="q2" name="q" type="search" defaultValue={q} placeholder="Try “rent”, “bus” or a reporter's name" autoComplete="off" />
        <button type="submit" className="btn">Search</button>
      </form>

      {q && <p className="muted">{results.length} {results.length === 1 ? "story" : "stories"} found</p>}

      {q && results.length === 0 && (
        <div className="empty">
          <h2>Nothing matches “{q}”</h2>
          <p>Check the spelling, use fewer words, or browse a category:</p>
          <nav className="chips">
            {categoriesOf(posts).map((c) => <Link key={c.name} href={categoryHref(c.name)}>{c.name}</Link>)}
          </nav>
        </div>
      )}

      <div className="stack">
        {results.map((p) => <StoryCard key={p._id} post={p} layout="row" />)}
      </div>
    </main>
  );
}
