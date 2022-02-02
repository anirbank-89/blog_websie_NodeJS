import express from 'express';

/**======================Controllers section====================== */
import { create, deleteBlog, editBlog, getAllBlogs, getBlogById } from '../controllers/Blog.js';
/**====================Controllers section end==================== */

var router = express.Router();

router.get('/', (req,res)=>{
    res.send("Hello world!");
});

router.post('/blog', create);
router.get('/blog', getAllBlogs);
router.get('/blog/:id', getBlogById);
router.put('/blog/:id', editBlog);
router.delete('/blog/:id', deleteBlog);

export default router;