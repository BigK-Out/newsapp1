import mongoose from "mongoose";
import dbConnect from "../../../../../../config/db";
import PostItem from "../../../../../../models/PostItem";

type Ctx = { params: { id: string } };

// Public on purpose: anyone reading a story counts a view. The client sends at most one per story per session.
export async function POST(_request: Request, { params }: Ctx) {
    if (!mongoose.isValidObjectId(params.id)) return new Response(null, { status: 204 });
    try {
        await dbConnect();
        await PostItem.updateOne({ _id: params.id }, { $inc: { views: 1 } });
    } catch {
        // A missed view count isn't worth an error for the reader.
    }
    return new Response(null, { status: 204 });
}
