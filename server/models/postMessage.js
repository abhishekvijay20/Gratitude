import mongoose from "mongoose";

const postSchema = mongoose.Schema ({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    public: {
        type: Boolean,
        default: true
    }
});

const PostMessage = mongoose.model('PostMessgae', postSchema);

export default PostMessage;