import mongoose from "mongoose";
import dbConnect from "../../../../../config/db";
import PostItem from "../../../../../models/PostItem";
import pickFields, { missingRequired } from "../../../../../models/pickFields";
import { requireEditor } from "../../../../lib/auth";

const notFound = () =>
    Response.json({ message: "Uh oh! How unfortunate, there seems to be no id nearby" }, { status: 404 });
const unavailable = () =>
    Response.json({ message: "The database is unreachable. Try again in a minute." }, { status: 503 });

type Ctx = { params: { id: string } };

export async function GET(_request: Request, { params }: Ctx) {
    if (!mongoose.isValidObjectId(params.id)) return notFound();
    try {
        await dbConnect();
        const postItem = await PostItem.findById(params.id).select("-__v");
        if (!postItem) return notFound();
        return Response.json(postItem);
    } catch {
        return unavailable();
    }
}

export async function PUT(request: Request, { params }: Ctx) {
    const denied = requireEditor();
    if (denied) return denied;
    if (!mongoose.isValidObjectId(params.id)) return notFound();

    let body;
    try {
        body = await request.json();
    } catch {
        return Response.json({ message: "Invalid JSON" }, { status: 400 });
    }
    const data = pickFields(body ?? {});
    if (missingRequired(data, true).length) {
        return Response.json({ message: "Headline, image, category and summary can't be blank." }, { status: 400 });
    }

    try {
        await dbConnect();
        const postItem = await PostItem.findByIdAndUpdate(params.id, data, {
            new: true,
            runValidators: true,
        });
        if (!postItem) return notFound();
        return Response.json(postItem);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
            return Response.json({ message: error.message }, { status: 400 });
        }
        return unavailable();
    }
}

export async function DELETE(_request: Request, { params }: Ctx) {
    const denied = requireEditor();
    if (denied) return denied;
    if (!mongoose.isValidObjectId(params.id)) return notFound();

    try {
        await dbConnect();
        const postItem = await PostItem.findByIdAndDelete(params.id);
        if (!postItem) return notFound();
        return Response.json(postItem);
    } catch {
        return unavailable();
    }
}
