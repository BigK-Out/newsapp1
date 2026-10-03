import mongoose from "mongoose";

const postItemSchema = new mongoose.Schema(
    {
        img: {type: String, required: true},
        caption: {type: String, default: null},
        category: {type: String, required: true},
        kind: {type: String, enum: ["news", "opinion"], default: "news"},
        date: {type: Date, default: Date.now },
        title: { type: String, required: true},
        brief: { type: String, default: null},
        body: { type: String, default: null},
        avatar: {type: String, default:null},
        author: {type: String, default:null},
        top: {type: Boolean, default:false},
        trending: {type: Boolean, default: false},
        breaking: {type: Boolean, default: false},
        views: {type: Number, default: 0, min: 0},
    },
    {
        timestamps: true,
    }
)

const PostItem = mongoose.models.postitem || mongoose.model("postitem", postItemSchema);

export default PostItem;
