import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!, {
        // 45 seconds socket timeout
    });
    console.log("You're all good buddy!");
  } catch (error) {
    console.error("I am a broken piece of machinery. When the machine is broken… I am ready.");
    console.error("Error details:", error); // Log the actual error for more clarity
    process.exit(1);  // Exit the process in case of failure
  }
};

export default dbConnect;