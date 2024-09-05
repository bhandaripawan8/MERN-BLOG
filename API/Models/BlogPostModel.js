
import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: {type: String, reqired: true},
    content: {type: String, required: true},
    image: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
}, {timestamps: true})

const blogPost = mongoose.model('BlogPost', blogSchema);

export default blogPost;