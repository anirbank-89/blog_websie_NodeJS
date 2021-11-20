import mongoose from 'mongoose';
import { Validator } from 'node-input-validator';

import blogSchema from '../models/blog.js';

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

export var getAllBlogs = async (req, res) => {
    var blogs = await blogSchema.find().exec();

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
            data: null
        });
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