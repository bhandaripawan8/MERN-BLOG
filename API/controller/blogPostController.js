
import blogPostModel from '../Models/BlogPostModel.js';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

// multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        const uploadDir = '../uploads';
        if(!fs.existsSync(uploadDir)){
            fs.mkdir(uploadDir); //create upload directory if it doesn't exist
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+path.extname(file.originalname));
    }
})

// Multer file filter for image validation
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .jpg, and .png files are allowed'), false);
    }
};

// Initialize Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
    fileFilter: fileFilter
}).single('image'); // Handle single image upload

// Create Blog Post Controller
const createBlogPost = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        const { title, content, author } = req.body;
        // Validate required fields
        if (!title || !content || !author) {
            return res.status(400).json({ success: false, message: 'Title, content, and author are required.' });
        }
        try {
            // Prepare new blog data
            const newBlog = new blogPostModel({
                title,
                content,
                author,
                image: req.file ? req.file.path : null // Store image path if uploaded
            });
            // Save the blog post to the database
            const savedBlog = await newBlog.save();

            return res.status(201).json({
                success: true,
                message: 'Blog post created successfully!',
                blog: savedBlog
            });
        } catch (error) {
            console.error('Error creating blog post:', error);
            return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
        }
    });
};


const getAllBlogPost = async (req, res) =>{
    const allBlogs = await blogPostModel.find({});
    try {
        if(allBlogs.length === 0){
            return res.status(404).json({success: false, message: 'No blog found'})
        }
        else{
            return  res.status(200).json({success: true, data: allBlogs})
        }
    } catch (error) {
        console.error("error retriving blog posts:", error.message)
        return res.statu(500).json({success: false, message: "Server error, please try again later"})
    }

}

const getOneBlogPostById = async (req, res) =>{
    const {id} = req.params;
    try {
        const blog = await blogPostModel.findById(id).populate('author', 'username email')
        if(!blog){
            return res.status(404).json({success: false, message: 'Blog post not found'})
        }
        return res.status(200).json({success: true, message: "Blog post retrieved successfully", blog})
    } catch (error) {
        console.error('Error retrieving blog post:', error.message)
        return res.status(500).json({success: false, message: "server error, please try again later"})
    }
}

const updateBlogPost = async (req, res) => {
    const { id } = req.params;

    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }

        const { title, content } = req.body;

        try {
            const blog = await blogPostModel.findById(id);
            if (!blog) {
                return res.status(404).json({ success: false, message: 'Blog post not found' });
            }

            // Update fields
            blog.title = title || blog.title;
            blog.content = content || blog.content;
            if (req.file) {
                // Remove the old image from the file system
                if (blog.image) {
                    fs.unlinkSync(blog.image);
                }
                blog.image = req.file.path; // Set new image path
            }

            const updatedBlog = await blog.save();
            return res.status(200).json({
                success: true,
                message: 'Blog post updated successfully',
                blog: updatedBlog,
            });
        } catch (error) {
            console.error('Error updating blog post:', error);
            return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
        }
    });
};


const deleteBlogPost = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await blogPostModel.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog post not found' });
        }

        // Delete the associated image from the file system if it exists
        if (blog.image) {
            fs.unlinkSync(blog.image);
        }

        await blogPostModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'Blog post deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

const getBlogPostByAuthor = async (req, res) => {
    const { authorId } = req.params;

    try {
        const blogs = await blogPostModel.find({ author: authorId }).populate('author', 'username email');
        if (blogs.length === 0) {
            return res.status(404).json({ success: false, message: 'No blog posts found for this author' });
        }

        return res.status(200).json({
            success: true,
            message: 'Blog posts retrieved successfully',
            blogs,
        });
    } catch (error) {
        console.error('Error retrieving blogs by author:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};


export {createBlogPost, getAllBlogPost, getOneBlogPostById, updateBlogPost, deleteBlogPost, getBlogPostByAuthor};