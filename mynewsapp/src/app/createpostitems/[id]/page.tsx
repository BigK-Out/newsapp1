import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import PostForm from "../../components/PostForm";
import DemoNote from "../../components/DemoNote";
import Offline from "../../components/Offline";
import { getPost } from "@/lib/posts";
import { isEditor } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function EditPostItem({ params }: { params: { id: string } }) {
  if (!isEditor()) redirect(`/login?next=${encodeURIComponent(`/createpostitems/${params.id}`)}`);
  const { post, demo, offline } = await getPost(params.id);
  if (offline) return <Offline />;
  if (!post) notFound();
  if (demo) {
    return (
      <main className="wrap page">
        <DemoNote demo />
        <div className="empty">
          <h2>Demo stories can&apos;t be edited</h2>
          <p>Editing comes back as soon as the database is reachable.</p>
          <Link href={`/postitems/${post._id}`} className="btn">Back to the story</Link>
        </div>
      </main>
    );
  }
  return <PostForm post={post} />;
}
