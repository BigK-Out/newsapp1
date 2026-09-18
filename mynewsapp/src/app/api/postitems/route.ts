import dbConnect from "../../../../config/db";
import PostItem from "../../../../models/PostItem";
import pickFields from "../../../../models/pickFields";
import { getPosts } from "../../../lib/posts";

export const dynamic = "force-dynamic";

export async function GET() {
    const { posts, demo } = await getPosts();
    return Response.json(posts, { headers: demo ? { "x-demo-data": "1" } : {} });
}

export async function POST(request: Request) {
    let body;
    try {
        body = await request.json();
    } catch {
        return Response.json({ message: "Invalid JSON" }, { status: 400 });
    }
    const data = pickFields(body ?? {});
    if (!data.title || !data.img || !data.category) {
        return Response.json({ message: "Headline, image and category are required." }, { status: 400 });
    }

    try {
        await dbConnect();
        const savedItem = await new PostItem(data).save();
        return Response.json(savedItem, { status: 201 });
    } catch (error) {
        return Response.json({ message: "Couldn't save. The database is unreachable." }, { status: 503 });
    }
}
