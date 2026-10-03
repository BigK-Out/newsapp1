const ALLOWED_FIELDS = ["img", "caption", "category", "kind", "title", "brief", "avatar", "author", "top", "trending", "breaking", "date", "body"];

export default function pickFields(body: Record<string, unknown>) {
    const picked: Record<string, unknown> = {};
    for (const key of ALLOWED_FIELDS) {
        if (body[key] !== undefined) picked[key] = body[key];
    }
    return picked;
}

const REQUIRED_FIELDS = ["title", "img", "category", "brief"];

/** Required fields that are missing or blank. With `partial`, only fields present in `data` are checked (for updates). */
export function missingRequired(data: Record<string, unknown>, partial = false) {
    return REQUIRED_FIELDS.filter((key) => {
        if (partial && !(key in data)) return false;
        return typeof data[key] !== "string" || !(data[key] as string).trim();
    });
}
