import { redirect } from "next/navigation";
import PostForm from "../components/PostForm";
import { isEditor } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const metadata = { title: "Write a story · ForPeople News" };

export default function CreatePostItem() {
  if (!isEditor()) redirect("/login?next=/createpostitems");
  return <PostForm />;
}
