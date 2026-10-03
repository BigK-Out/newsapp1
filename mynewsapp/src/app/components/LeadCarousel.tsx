"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/types";
import { authorHref, categoryInk, readingMinutes, timeAgo } from "@/lib/format";
import Duo from "./Duo";
import SaveButton from "./SaveButton";
import CategoryTag from "./CategoryTag";

const INTERVAL = 8000;

export default function LeadCarousel({ stories }: { stories: Post[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = stories.length;

  // Autoplay only when motion is welcome; it never starts for reduced-motion users.
  useEffect(() => {
    setPlaying(count > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, [count]);

  useEffect(() => {
    if (!playing || hovered || focused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearTimeout(id);
  }, [playing, hovered, focused, index, count]);

  const go = (i: number) => {
    setIndex((i + count) % count);
    setPlaying(false); // a reader who picks a story wants it to stay put
  };

  if (count === 0) return null;

  return (
    <section
      className="carousel"
      aria-roledescription="carousel"
      aria-label="Top stories"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div className="carousel-slides" aria-live={playing ? "off" : "polite"}>
        {stories.map((p, i) => (
          <article
            key={p._id}
            className={`slide ink-${categoryInk(p.category)}`}
            hidden={i !== index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
          >
            <Link href={`/postitems/${p._id}`} className="lead-img" aria-hidden="true" tabIndex={-1}>
              <Duo src={p.img} ratio="16 / 10" eager={i === 0} />
            </Link>
            <p className="kicker">
              <CategoryTag post={p} />
              <span>{timeAgo(p.date)}</span>
            </p>
            <h2 className="lead-title">
              <Link href={`/postitems/${p._id}`}>{p.title}</Link>
            </h2>
            <p className="lead-dek">{p.brief}</p>
            <p className="byline">
              {p.author && <Link href={authorHref(p.author)} className="byline-author">{p.author}</Link>}
              <span>{readingMinutes(p)} min read</span>
              <SaveButton id={p._id} />
            </p>
          </article>
        ))}
      </div>

      {count > 1 && (
        <div className="carousel-controls">
          <ol className="pager" aria-label="Choose a top story">
            {stories.map((p, i) => (
              <li key={p._id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === index ? "true" : undefined}
                  aria-label={`Story ${i + 1}: ${p.title}`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ol>
          <button type="button" className="pager-toggle" onClick={() => setPlaying((v) => !v)} aria-pressed={!playing}>
            {playing ? "Pause" : "Play"}
          </button>
          {playing && !hovered && !focused && <span key={index} className="pager-timer" style={{ animationDuration: `${INTERVAL}ms` }} aria-hidden="true" />}
        </div>
      )}
    </section>
  );
}
