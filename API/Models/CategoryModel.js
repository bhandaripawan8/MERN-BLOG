import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, trim: true},
    slug: {type: String, required: true, lowercase: true, trim: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date}
});

categorySchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
})

const categoryBlog = mongoose.model('category', categorySchema)

export default categoryBlog;