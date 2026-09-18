import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, getPosts } from "@/lib/posts";
import { categoryHref, imgSrc, longDate, paragraphs, readingMinutes } from "@/lib/format";
import ProgressBar from "../../components/ProgressBar";
import SaveButton from "../../components/SaveButton";
import CopyLink from "../../components/CopyLink";
import DeleteButton from "../../components/DeleteButton";
import StoryCard from "../../components/StoryCard";
import DemoNote from "../../components/DemoNote";
import Icon from "../../components/Icon";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { post } = await getPost(params.id);
  return post ? { title: `${post.title} · ForPeople News`, description: post.brief } : { title: "Story not found" };
}

export default async function Story({ params }: { params: { id: string } }) {
  const { post, demo } = await getPost(params.id);
  if (!post) notFound();

  const { posts } = await getPosts();
  const others = posts.filter((p) => p._id !== post._id);
  const sameCategory = others.filter((p) => p.category === post.category);
  const related = [...sameCategory, ...others.filter((p) => p.category !== post.category)].slice(0, 3);

  const paras = paragraphs(post);
  const [lede, ...restParas] = paras;

  return (
    <>
      <ProgressBar />
      <main className="wrap article-wrap">
        <DemoNote demo={demo} />
        <article className="article">
          <header>
            <p className="kicker">
              <Link href={categoryHref(post.category)}>{post.category}</Link>
              <time dateTime={post.date}>{longDate(post.date)}</time>
            </p>
            <h1>{post.title}</h1>
            <p className="byline byline-lg">
              {post.author && (
                <span className="author">
                  {post.avatar && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imgSrc(post.avatar)} alt="" width={36} height={36} />
                  )}
                  {post.author}
                </span>
              )}
              <span>{readingMinutes(post)} min read</span>
            </p>
          </header>

          <figure className="article-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgSrc(post.img)} alt="" />
          </figure>

          <div className="prose">
            {lede && <p className="lede">{lede}</p>}
            {restParas.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className="article-actions">
            <SaveButton id={post._id} variant="full" />
            <CopyLink />
          </div>

          {!demo && (
            <details className="editor-tools">
              <summary>Editor tools</summary>
              <div className="actions">
                <Link href={`/createpostitems/${post._id}`} className="btn btn-ghost"><Icon name="pen" /> Edit story</Link>
                <DeleteButton id={post._id} />
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
