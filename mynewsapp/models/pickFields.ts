const ALLOWED_FIELDS = ["img", "category", "title", "brief", "avatar", "author", "top", "trending", "date", "body"];

export default function pickFields(body: Record<string, unknown>) {
    const picked: Record<string, unknown> = {};
    for (const key of ALLOWED_FIELDS) {
        if (body[key] !== undefined) picked[key] = body[key];
    }
    return picked;
}
