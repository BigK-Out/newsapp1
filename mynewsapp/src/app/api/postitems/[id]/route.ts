import dbConnect from "../../../../../config/db";
import PostItem from "../../../../../models/PostItem";
import pickFields from "../../../../../models/pickFields";

const notFound = () =>
    Response.json({ message: "Uh oh! How unfortunate, there seems to be no id nearby" }, { status: 404 });
const serverError = () =>
    Response.json({ message: "Our server is having problems, oops" }, { status: 500 });

type Ctx = { params: { id: string } };

export async function GET(_request: Request, { params }: Ctx) {
    try {
        await dbConnect();
        const postItem = await PostItem.findById(params.id).select("-__v");
        if (!postItem) return notFound();
        return Response.json(postItem);
    } catch (error) {
        // invalid ObjectId (CastError) also lands here
        return notFound();
    }
}

export async function PUT(request: Request, { params }: Ctx) {
    let body;
    try {
        body = await request.json();
    } catch {
        return Response.json({ message: "Invalid JSON" }, { status: 400 });
    }
    try {
        await dbConnect();
        const postItem = await PostItem.findByIdAndUpdate(params.id, pickFields(body ?? {}), {
            new: true,
            runValidators: true,
        });
        if (!postItem) return notFound();
        return Response.json(postItem);
    } catch (error) {
        return serverError();
    }
}

export async function DELETE(_request: Request, { params }: Ctx) {
    try {
        await dbConnect();
        const postItem = await PostItem.findByIdAndDelete(params.id);
        if (!postItem) return notFound();
        return Response.json(postItem);
    } catch (error) {
        return serverError();
    }
}
