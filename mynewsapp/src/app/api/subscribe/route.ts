import dbConnect from "../../../../config/db";
import Subscriber from "../../../../models/Subscriber";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
    let body;
    try {
        body = await request.json();
    } catch {
        return Response.json({ message: "Invalid JSON" }, { status: 400 });
    }
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!EMAIL.test(email) || email.length > 254) {
        return Response.json({ message: "That doesn't look like an email address." }, { status: 400 });
    }

    try {
        await dbConnect();
        // Upsert so signing up twice is harmless and doesn't reveal who is already on the list.
        await Subscriber.updateOne({ email }, { $setOnInsert: { email } }, { upsert: true });
        return Response.json({ message: "You're on the list. The morning briefing arrives at 7am." });
    } catch {
        return Response.json({ message: "Sign-ups are paused while the newsroom is offline. Try again soon." }, { status: 503 });
    }
}
