import { createBlogPost, getAllBlogPost, getOneBlogPostById, updateBlogPost, deleteBlogPost, getBlogPostByAuthor  } from "../controller/blogPostController.js";

import express from 'express';
const blogRouter = express.Router();

blogRouter.post('/createblog', createBlogPost);
blogRouter.get('/:id', getOneBlogPostById);
blogRouter.get('/allblogs', getAllBlogPost);
blogRouter.put('/blogs/:id', updateBlogPost);
blogRouter.delete('/blogs/:id', deleteBlogPost);
blogRouter.get('/author/:authorId', getBlogPostByAuthor);

export default blogRouter;