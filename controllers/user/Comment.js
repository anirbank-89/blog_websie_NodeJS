import { Validator } from 'node-input-validator';
import mongoose from 'mongoose';

import commentSchema from '../../models/comment.js';

export var postComment = async (req, res) => {
    const V = new Validator(req.body, {
        comment: 'required'
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    try {
        req.body.postId = mongoose.Types.ObjectId(req.body.postId);

        const NEW_COMMENT = new commentSchema(req.body);
        let docs = await NEW_COMMENT.save();

        return res.status(200).json({
            status: true,
            message: "Data added successfully.",
            data: docs
        });
    }
    catch (err) {
        return res.status(500).json({
            status: false,
            message: "Failed to add data. Server error.",
            error: err.message
        });
    }
}

export var getComments = async (req, res) => {
    var id = req.params.blog_id;
    try {
        let comments = await commentSchema.find(
            { postId: mongoose.Types.ObjectId(id) }
        ).exec();

        if (comments.length > 0) {
            return res.status(200).json({
                status: true,
                message: "Data successfully get.",
                data: comments
            });
        }
        else {
            return res.status(200).json({
                status: true,
                message: "No comments on this blog.",
                data: []
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            status: false,
            message: "Invalid blog id. Server error.",
            error: err.message
        });
    }
}

export var deleteComment = async (req, res) => {
    var id = req.params.id;

    return commentSchema.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) })
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
                message: "Invalid blog id. Server error.",
                error: err.message
            });
        });
}