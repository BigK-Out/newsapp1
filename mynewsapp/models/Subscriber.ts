import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    },
    {
        timestamps: true,
    }
)

const Subscriber = mongoose.models.subscriber || mongoose.model("subscriber", subscriberSchema);

export default Subscriber;
