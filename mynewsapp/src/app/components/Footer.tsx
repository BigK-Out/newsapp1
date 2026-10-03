import Link from "next/link";
import { categoryHref } from "@/lib/format";
import NewsletterForm from "./NewsletterForm";
import Icon from "./Icon";

export default function Footer({ categories }: { categories: string[] }) {
  return (
    <footer className="footer">
      <section className="newsletter" aria-labelledby="nl-title">
        <div className="wrap newsletter-inner">
          <div>
            <h2 id="nl-title">The morning briefing</h2>
            <p>Five local stories worth your time, in your inbox at 7am. No ads, no tracking pixels.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <div className="wrap footer-grid">
        <div className="footer-brand">
          <p className="wordmark small">For<span>People</span></p>
          <p className="fine">Independent. Reader-first. Saved stories never leave your device.</p>
        </div>
        <nav aria-labelledby="f-sections">
          <h2 id="f-sections">Sections</h2>
          <ul>
            {categories.map((c) => (
              <li key={c}><Link href={categoryHref(c)}>{c}</Link></li>
            ))}
            <li><Link href="/opinion">Opinion</Link></li>
          </ul>
        </nav>
        <nav aria-labelledby="f-read">
          <h2 id="f-read">Read</h2>
          <ul>
            <li><Link href="/postitems">Latest</Link></li>
            <li><Link href="/saved">Saved stories</Link></li>
            <li><Link href="/search">Search</Link></li>
            <li><a href="/feed.xml"><Icon name="rss" size={14} /> RSS feed</a></li>
          </ul>
        </nav>
        <nav aria-labelledby="f-newsroom">
          <h2 id="f-newsroom">Newsroom</h2>
          <ul>
            <li><Link href="/createpostitems">Write a story</Link></li>
            <li><Link href="/login">Editor sign in</Link></li>
          </ul>
        </nav>
      </div>
      <p className="wrap footer-copy">© {new Date().getFullYear()} ForPeople News</p>
    </footer>
  );
}
