import { notFound } from "next/navigation";
import PostForm from "../../components/PostForm";
import DemoNote from "../../components/DemoNote";
import { getPost } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function EditPostItem({ params }: { params: { id: string } }) {
  const { post, demo } = await getPost(params.id);
  if (!post) notFound();
  return (
    <>
      <div className="wrap"><DemoNote demo={demo} /></div>
      <PostForm post={post} />
    </>
  );
}
