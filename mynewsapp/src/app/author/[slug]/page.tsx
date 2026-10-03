import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";
import { slugify } from "@/lib/format";
import StoryCard from "../../components/StoryCard";
import DemoNote from "../../components/DemoNote";
import Avatar from "../../components/Avatar";

export const dynamic = "force-dynamic";

async function byAuthor(slug: string) {
  const { posts, demo } = await getPosts();
  const theirs = posts.filter((p) => p.author && slugify(p.author) === slug);
  return { theirs, demo };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { theirs } = await byAuthor(params.slug);
  return { title: theirs[0] ? `${theirs[0].author} · ForPeople News` : "Writer not found" };
}

export default async function Author({ params }: { params: { slug: string } }) {
  const { theirs, demo } = await byAuthor(params.slug);
  if (theirs.length === 0) notFound();

  const name = theirs[0].author;
  const avatar = theirs.find((p) => p.avatar)?.avatar;
  const columns = theirs.filter((p) => p.kind === "opinion").length;
  const categories = Array.from(new Set(theirs.filter((p) => p.kind !== "opinion").map((p) => p.category)));
  const role = columns === theirs.length ? "Columnist" : columns > 0 ? "Reporter and columnist" : "Reporter";

  return (
    <main className="wrap page">
      <DemoNote demo={demo} />
      <header className="author-head">
        <Avatar name={name} src={avatar} size={96} />
        <div>
          <p className="eyebrow">{role}</p>
          <h1 className="page-title">{name}</h1>
          <p className="muted">
            {theirs.length} {theirs.length === 1 ? "story" : "stories"}
            {categories.length > 0 && <> · covers {categories.join(", ")}</>}
          </p>
        </div>
      </header>
      <div className="grid">
        {theirs.map((p) => <StoryCard key={p._id} post={p} />)}
      </div>
    </main>
  );
}
