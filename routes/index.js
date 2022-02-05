import express from 'express';

/**======================Controllers section====================== */
import { addFile, create, deleteBlog, editBlog, getAllBlogs, getBlogById, getFile } from '../controllers/Blog.js';
import upload from '../service/upload.js';
/**====================Controllers section end==================== */

var router = express.Router();

router.get('/', (req,res)=>{
    res.send("Hello world!");
});

router.post('/blog', create);
router.post('/blog/upload-image', upload.single("image"), addFile);
router.get('/uploads/blog_images/:filename', getFile);
router.get('/blog', getAllBlogs);
router.get('/blog/:id', getBlogById);
router.put('/blog/:id', editBlog);
router.delete('/blog/:id', deleteBlog);

export default router;