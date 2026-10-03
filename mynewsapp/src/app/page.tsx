import Link from "next/link";
import { getPosts, isNews, isOpinion, mostRead } from "@/lib/posts";
import { categoriesOf, categoryHref, categoryInk } from "@/lib/format";
import Ticker from "./components/Ticker";
import StoryCard from "./components/StoryCard";
import DemoNote from "./components/DemoNote";
import Icon from "./components/Icon";
import LeadCarousel from "./components/LeadCarousel";
import OpinionRail from "./components/OpinionRail";
import MostRead from "./components/MostRead";
import SectionBlock from "./components/SectionBlock";

export const dynamic = "force-dynamic";

const CAROUSEL_SIZE = 5;

export default async function Home() {
  const { posts, demo } = await getPosts();
  const news = posts.filter(isNews);

  if (news.length === 0) {
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

  // Editor-picked lead stories first, topped up with the newest news.
  const picked = news.filter((p) => p.top);
  const carousel = [...picked, ...news.filter((p) => !p.top)].slice(0, CAROUSEL_SIZE);
  const inCarousel = new Set(carousel.map((p) => p._id));
  const latest = news.filter((p) => !inCarousel.has(p._id));
  const categories = categoriesOf(news);
  const sections = categories
    .map((c) => ({ name: c.name, posts: news.filter((p) => p.category === c.name) }))
    .filter((s) => s.posts.length >= 2);

  return (
    <>
      <Ticker posts={news} />
      <main className="wrap">
        <h1 className="sr-only">ForPeople News front page</h1>
        <DemoNote demo={demo} />

        <div className="front-top">
          <LeadCarousel stories={carousel} />
          <OpinionRail posts={posts.filter(isOpinion).slice(0, 4)} />
        </div>

        <nav className="chips" aria-label="Browse by category">
          {categories.map((c) => (
            <Link key={c.name} href={categoryHref(c.name)} className={`ink-${categoryInk(c.name)}`}>
              {c.name} <span>{c.count}</span>
            </Link>
          ))}
          <Link href="/opinion">Opinion</Link>
        </nav>

        <div className="cols">
          <section aria-labelledby="latest-title">
            <h2 id="latest-title" className="sec-label"><span>Latest</span></h2>
            {latest.length > 0 ? (
              <div className="grid">
                {latest.map((p) => (
                  <StoryCard key={p._id} post={p} />
                ))}
              </div>
            ) : (
              <p className="muted">That&apos;s everything for now.</p>
            )}
          </section>
          <MostRead posts={mostRead(posts)} />
        </div>

        {sections.length > 0 && (
          <div className="sections" aria-label="Sections">
            {sections.map((s) => (
              <SectionBlock key={s.name} name={s.name} posts={s.posts} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
