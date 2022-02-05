import fs from 'fs';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

export var uploadFile = async (req, folder) => {
    var fileName = "uploads/" + folder + "/" + req.file.originalname;
    fs.writeFileSync(fileName, req.file.buffer);
    return fileName;
}

const STORAGE = new GridFsStorage({
    url: 'mongodb+srv://ani_mongouser:mwf3to6@cluster0.nbyew.mongodb.net/test',
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