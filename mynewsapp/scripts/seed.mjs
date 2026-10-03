// Fills an empty database with the demo stories from src/lib/seed.ts.
// Usage: npm run seed   (reads MONGO_URL from .env; needs Node 22.18+ to import .ts files)
import mongoose from "mongoose";
import PostItem from "../models/PostItem.ts";
import { SEED } from "../src/lib/seed.ts";

const url = process.env.MONGO_URL?.trim();
if (!url) {
  console.error("MONGO_URL is not set. Add it to .env first.");
  process.exit(1);
}

try {
  await mongoose.connect(url, { serverSelectionTimeoutMS: 8000 });
  const existing = await PostItem.countDocuments();
  if (existing > 0) {
    console.log(`Database already has ${existing} stories. Nothing to do.`);
  } else {
    // Drop the "demo-N" ids so Mongo assigns real ObjectIds.
    await PostItem.insertMany(SEED.map(({ _id, ...post }) => post));
    console.log(`Added ${SEED.length} stories to "${mongoose.connection.name}".`);
  }
} catch (error) {
  console.error("Seeding failed:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
