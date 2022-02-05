import mongoose from 'mongoose';
import { Validator } from 'node-input-validator';
import Grid from 'gridfs-stream';

import blogSchema from '../../models/blog.js';

let gfs, gridFsBucket;
const CONN = mongoose.connection;
CONN.once('open', () => {
    gridFsBucket = new mongoose.mongo.GridFSBucket(CONN.db, { 
        bucketName: 'fs' 
    });

    gfs = Grid(CONN.db, mongoose.mongo);
    gfs.collection('fs');
});

export var create = async (req, res) => {
    const V = new Validator(req.body, {
        title: 'required',
        description: 'required'
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let saveData = {
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        category: req.body.category
    }
    if (
        req.body.image != "" ||
        req.body.image != null ||
        typeof req.body.image != "undefined"
    ) {
        saveData.image = req.body.image;
    }

    const NEW_BLOG = new blogSchema(saveData);

    try {
        var saveBlog = await NEW_BLOG.save();

        return res.status(200).json({
            status: true,
            message: "Data added successfully!",
            data: saveBlog
        });
    }
    catch (err) {
        return res.status(500).json({
            status: false,
            message: "Failed to save data. Server error.",
            error: err
        });
    }
}

export var addFile = async (req,res) => {
    // let imageUrl = '';
    // let image_url = await uploadFile(req, "blog_images");
    // if (req.file != "" || req.file != null || typeof req.file != "undefined") {
    //     imageUrl = image_url;
    // }

    // return res.status(200).json({
    //     status: true,
    //     message: "File uploaded successfully.",
    //     data: imageUrl
    // });

    try {
        if (!req.file) {
            return res.status(400).json({ 
                status: false,
                error: "File not found.",
                data: null
            });
        }
        let imageUrl = `uploads/blog_images/${req.file.filename}`
    
        return res.status(200).json({
            status: true,
            message: "Image link inserted.",
            image: imageUrl
        });
    }
    catch (err) {
        return res.status(500).json({
            status: false,
            message: "Failed to insert image",
            error: err.message
        });
    }
}

export var getFile = async (req,res) => {
    var filename = req.params.filename;

    try {
        let file = await gfs.files.findOne({ filename: filename });
        console.log("Blog image", file);
        var readStream = gridFsBucket.openDownloadStream(file._id);

        readStream.pipe(res);
    }
    catch (err) {
        console.log("Get blog image  error due to ", err);

        return res.status(500).json({
            status: false,
            message: "Failed to get data. Server error.",
            error: err.message
        });
    }
}

export var getAllBlogs = async (req, res) => {
    var author = req.query.author;
    var category = req.query.category;
    let blogs;

    if (author) {
        blogs = await blogSchema.find({ author: author }).exec();

        if (blogs.length > 0) {
            return res.status(200).json({
                status: true,
                message: "Data successfully get.",
                data: blogs
            });
        }
        else {
            return res.status(200).json({
                status: true,
                message: "No blogs posted yet.",
                data: []
            });
        }
    }
    else if (category) {
        blogs = await blogSchema.find({ category: category }).exec();

        if (blogs.length > 0) {
            return res.status(200).json({
                status: true,
                message: "Data successfully get.",
                data: blogs
            });
        }
        else {
            return res.status(200).json({
                status: true,
                message: "No blogs posted yet.",
                data: []
            });
        }
    }
    else {
        blogs = await blogSchema.find({}).exec();

        if (blogs.length > 0) {
            return res.status(200).json({
                status: true,
                message: "Data successfully get.",
                data: blogs
            });
        }
        else {
            return res.status(200).json({
                status: true,
                message: "No blogs posted yet.",
                data: []
            });
        }
    }
}

export var getBlogById = async (req, res) => {
    var id = req.params.id;

    try {
        let blog = await blogSchema.findById(id).exec();
        console.log(blog);

        return res.status(200).json({
            status: true,
            message: "Data get successfully!",
            data: blog
        });
    }
    catch (err) {
        return res.status(500).json({
            status: false,
            message: "Invalid id.",
            error: err.message
        });
    }
}

export var editBlog = async (req, res) => {
    var id = req.params.id;

    try {
        var docs = await blogSchema.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(id) },
            req.body,
            { new: true }
        ).exec();

        return res.status(200).json({
            status: true,
            message: "Data successfully edited.",
            data: docs
        });
    }
    catch (err) {
        return res.status(500).json({
            status: false,
            message: "Invalid id. Server error.",
            error: err.message
        });
    }
}

export var deleteBlog = async (req, res) => {
    var id = req.params.id;

    return blogSchema.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) })
        .then(docs => {
            res.status(200).json({
                status: true,
                message: "Data successfully deleted.",
                data: docs
            });
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Invalid id. Server error.",
                error: err.message
            });
        });
}