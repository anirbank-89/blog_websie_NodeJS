import express from 'express';

/**======================Controllers section====================== */
import { register } from '../controllers/auth/user.js';
import { addFile, create, deleteBlog, editBlog, getAllBlogs, getBlogById, getFile } from '../controllers/user/Blog.js';
import { postComment } from '../controllers/user/Comment.js';
import upload from '../service/upload.js';
/**====================Controllers section end==================== */

var router = express.Router();

router.get('/', (req,res)=>{
    res.send("Hello world!");
});

router.post('/register', register);

router.post('/blog', create);
router.post('/blog/upload-image', upload.single("image"), addFile);
router.get('/uploads/blog_images/:filename', getFile);
router.get('/blog', getAllBlogs);
router.get('/blog/:id', getBlogById);
router.put('/blog/:id', editBlog);
router.delete('/blog/:id', deleteBlog);

router.post('/comment', postComment);

export default router;