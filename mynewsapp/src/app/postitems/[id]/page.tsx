import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, getPosts } from "@/lib/posts";
import { authorHref, categoryInk, imgSrc, longDate, paragraphs, readingMinutes } from "@/lib/format";
import ProgressBar from "../../components/ProgressBar";
import SaveButton from "../../components/SaveButton";
import CopyLink from "../../components/CopyLink";
import DeleteButton from "../../components/DeleteButton";
import StoryCard from "../../components/StoryCard";
import DemoNote from "../../components/DemoNote";
import Icon from "../../components/Icon";
import Offline from "../../components/Offline";
import CategoryTag from "../../components/CategoryTag";
import Avatar from "../../components/Avatar";
import ListenButton from "../../components/ListenButton";
import ShareButton from "../../components/ShareButton";
import ViewTracker from "../../components/ViewTracker";
import { isEditor } from "@/lib/auth";
import { logout } from "../../login/actions";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { post, offline } = await getPost(params.id);
  if (offline) return { title: "Offline · ForPeople News" };
  return post ? { title: `${post.title} · ForPeople News`, description: post.brief } : { title: "Story not found" };
}

export default async function Story({ params }: { params: { id: string } }) {
  const { post, demo, offline } = await getPost(params.id);
  if (offline) return <Offline />;
  if (!post) notFound();

  const { posts } = await getPosts();
  const others = posts.filter((p) => p._id !== post._id);
  const sameCategory = others.filter((p) => p.category === post.category);
  const related = [...sameCategory, ...others.filter((p) => p.category !== post.category)].slice(0, 3);
  const opinion = post.kind === "opinion";
  const minutes = readingMinutes(post);

  const paras = paragraphs(post);
  const [lede, ...restParas] = paras;

  return (
    <>
      <ProgressBar />
      {!demo && <ViewTracker id={post._id} />}
      <main className={`wrap article-wrap ink-${categoryInk(post.category)}`}>
        <DemoNote demo={demo} />
        <article className={`article${opinion ? " article-opinion" : ""}`}>
          <header>
            <p className="kicker">
              <CategoryTag post={post} />
              <time dateTime={post.date}>{longDate(post.date)}</time>
            </p>
            <h1>{post.title}</h1>
            <p className="byline byline-lg">
              {post.author && (
                <Link href={authorHref(post.author)} className="author">
                  {(post.avatar || opinion) && <Avatar name={post.author} src={post.avatar} size={opinion ? 48 : 36} />}
                  {opinion ? <span>Opinion by <strong>{post.author}</strong></span> : post.author}
                </Link>
              )}
              <span>{minutes} min read</span>
            </p>
          </header>

          <figure className="article-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgSrc(post.img)} alt="" />
            {post.caption && <figcaption>{post.caption}</figcaption>}
          </figure>

          <div className="article-tools">
            <ListenButton text={[post.title, ...paras].join(". ")} minutes={minutes} />
          </div>

          <div className="prose">
            {lede && <p className="lede">{lede}</p>}
            {restParas.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className="article-actions">
            <SaveButton id={post._id} variant="full" />
            <ShareButton title={post.title} />
            <CopyLink />
          </div>

          {!demo && isEditor() && (
            <details className="editor-tools">
              <summary>Editor tools</summary>
              <div className="actions">
                <Link href={`/createpostitems/${post._id}`} className="btn btn-ghost"><Icon name="pen" /> Edit story</Link>
                <DeleteButton id={post._id} />
                <form action={logout}>
                  <button type="submit" className="btn btn-ghost">Sign out</button>
                </form>
              </div>
            </details>
          )}
        </article>

        <section className="keep-reading" aria-labelledby="kr">
          <h2 id="kr" className="sec-label"><span>Keep reading</span></h2>
          <div className="grid">
            {related.map((p) => <StoryCard key={p._id} post={p} />)}
          </div>
        </section>
      </main>
    </>
  );
}
