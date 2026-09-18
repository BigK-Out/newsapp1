import mongoose from "mongoose";

// Cache the connection on globalThis so dev hot reloads reuse it.
const globalCache = globalThis as unknown as {
  mongooseConn?: Promise<typeof mongoose>;
};

const dbConnect = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not set");
  }
  if (!globalCache.mongooseConn) {
    globalCache.mongooseConn = mongoose.connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 4000 });
  }
  try {
    return await globalCache.mongooseConn;
  } catch (error) {
    globalCache.mongooseConn = undefined;
    console.error("Mongo connection failed:", error);
    throw error;
  }
};

export default dbConnect;
