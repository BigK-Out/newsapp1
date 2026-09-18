import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { categoriesOf, categoryHref, readingMinutes, timeAgo } from "@/lib/format";
import Duo from "./components/Duo";
import Ticker from "./components/Ticker";
import StoryCard from "./components/StoryCard";
import SaveButton from "./components/SaveButton";
import DemoNote from "./components/DemoNote";
import Icon from "./components/Icon";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { posts, demo } = await getPosts();

  if (posts.length === 0) {
    return (
      <main className="wrap page">
        <div className="empty">
          <h2>No stories yet</h2>
          <p>The front page fills up as soon as the first story is published.</p>
          <Link href="/createpostitems" className="btn"><Icon name="plus" /> Write the first story</Link>
        </div>
      </main>
    );
  }

  const lead = posts.find((p) => p.top) ?? posts[0];
  const rest = posts.filter((p) => p._id !== lead._id);
  const topOfHour = rest.slice(0, 4);
  const more = rest.slice(4);
  const mostRead = (rest.filter((p) => p.trending).length ? rest.filter((p) => p.trending) : rest).slice(0, 5);
  const categories = categoriesOf(posts);

  return (
    <>
      <Ticker posts={posts} />
      <main className="wrap">
        <DemoNote demo={demo} />

        <section className="lead" aria-labelledby="lead-title">
          <div className="lead-main">
            <Link href={`/postitems/${lead._id}`} className="lead-img" aria-hidden="true" tabIndex={-1}>
              <Duo src={lead.img} ratio="4 / 3" eager />
            </Link>
            <p className="kicker">
              <Link href={categoryHref(lead.category)}>{lead.category}</Link>
              <span>{timeAgo(lead.date)}</span>
            </p>
            <h1 id="lead-title">
              <Link href={`/postitems/${lead._id}`}>{lead.title}</Link>
            </h1>
            <p className="lead-dek">{lead.brief}</p>
            <p className="byline">
              {lead.author && <span>{lead.author}</span>}
              <span>{readingMinutes(lead)} min read</span>
              <SaveButton id={lead._id} />
            </p>
          </div>

          <aside className="lead-side" aria-labelledby="side-title">
            <h2 id="side-title" className="sec-label"><span>Also today</span></h2>
            <div className="stack">
              {topOfHour.map((p) => (
                <StoryCard key={p._id} post={p} layout="compact" />
              ))}
            </div>
          </aside>
        </section>

        <nav className="chips" aria-label="Browse by category">
          {categories.map((c) => (
            <Link key={c.name} href={categoryHref(c.name)}>
              {c.name} <span>{c.count}</span>
            </Link>
          ))}
        </nav>

        <div className="cols">
          <section aria-labelledby="latest-title">
            <h2 id="latest-title" className="sec-label"><span>Latest</span></h2>
            {more.length > 0 ? (
              <div className="grid">
                {more.map((p) => (
                  <StoryCard key={p._id} post={p} />
                ))}
              </div>
            ) : (
              <p className="muted">That&apos;s everything for now.</p>
            )}
          </section>

          <aside aria-labelledby="read-title" className="most-read">
            <h2 id="read-title" className="sec-label"><span>Most read</span></h2>
            <ol>
              {mostRead.map((p, i) => (
                <li key={p._id}>
                  <span className="rank" aria-hidden="true">{i + 1}</span>
                  <div>
                    <Link href={`/postitems/${p._id}`}>{p.title}</Link>
                    <p className="meta">{p.category} · {readingMinutes(p)} min</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </main>
    </>
  );
}
