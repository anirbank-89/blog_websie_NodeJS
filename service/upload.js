import fs from 'fs';
import multer from 'multer';
import dotenv from 'dotenv';
import { GridFsStorage } from 'multer-gridfs-storage';

dotenv.config();

export var uploadFile = async (req, folder) => {
    var fileName = "uploads/" + folder + "/" + req.file.originalname;
    fs.writeFileSync(fileName, req.file.buffer);
    return fileName;
}

const STORAGE = new GridFsStorage({
    url: process.env.MONGOURL,
    options: { useUnifiedTopology: true, useNewUrlParser: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpg"]

        if (match.indexOf(file.mimetype) === -1) {
            return `blog_${Date.now()}_${file.originalname}`
        }
        else {
            return {
                bucketName: "upload/blog_images",
                fileName: `blog_${Date.now()}_${file.originalname}`
            }
        }
    }
});

export default multer({ storage: STORAGE });