import express from 'express';

/**======================Controllers section====================== */
import { create } from '../controllers/Blog.js';
/**====================Controllers section end==================== */

var router = express.Router();

router.get('/', (req,res)=>{
    res.send("Hello world!");
});

router.post('/create', create);

export default router;