import dbConnect from "../../../../config/db";
import PostItem from "../../../../models/PostItem";
import pickFields, { missingRequired } from "../../../../models/pickFields";
import { getPosts } from "../../../lib/posts";
import { requireEditor } from "../../../lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
    const { posts, demo } = await getPosts();
    return Response.json(posts, { headers: demo ? { "x-demo-data": "1" } : {} });
}

export async function POST(request: Request) {
    const denied = requireEditor();
    if (denied) return denied;

    let body;
    try {
        body = await request.json();
    } catch {
        return Response.json({ message: "Invalid JSON" }, { status: 400 });
    }
    const data = pickFields(body ?? {});
    if (missingRequired(data).length) {
        return Response.json({ message: "Headline, image, category and summary are required." }, { status: 400 });
    }

    try {
        await dbConnect();
        const savedItem = await new PostItem(data).save();
        return Response.json(savedItem, { status: 201 });
    } catch {
        return Response.json({ message: "Couldn't save. The database is unreachable." }, { status: 503 });
    }
}
