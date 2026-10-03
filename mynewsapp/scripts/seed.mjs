// Loads the demo stories from src/lib/seed.ts into the database.
//   npm run seed           fill an empty database
//   npm run seed -- --sync add missing demo stories and refresh existing ones (matched by title);
//                          never touches view counts or stories you wrote yourself
// Reads MONGO_URL from .env; needs Node 22.18+ to import .ts files.
import mongoose from "mongoose";
import PostItem from "../models/PostItem.ts";
import { SEED } from "../src/lib/seed.ts";

const sync = process.argv.includes("--sync");
const url = process.env.MONGO_URL?.trim();
if (!url) {
  console.error("MONGO_URL is not set. Add it to .env first.");
  process.exit(1);
}

// Drop the "demo-N" ids so Mongo assigns real ObjectIds, and start every story at 0 views.
const docs = SEED.map(({ _id, views, ...post }) => post);

try {
  await mongoose.connect(url, { serverSelectionTimeoutMS: 8000 });
  const existing = await PostItem.countDocuments();
  if (sync) {
    const ops = docs.map(({ date, ...fields }) => ({
      updateOne: {
        filter: { title: fields.title },
        // Keep the original publish date and view count on stories that already exist.
        update: { $set: fields, $setOnInsert: { date, views: 0 } },
        upsert: true,
      },
    }));
    const r = await PostItem.bulkWrite(ops);
    console.log(`Synced: ${r.upsertedCount} added, ${r.modifiedCount} updated.`);
  } else if (existing > 0) {
    console.log(`Database already has ${existing} stories. Use --sync to add or refresh the demo stories.`);
  } else {
    await PostItem.insertMany(docs);
    console.log(`Added ${docs.length} stories to "${mongoose.connection.name}".`);
  }
} catch (error) {
  console.error("Seeding failed:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
