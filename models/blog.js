import mongoose from 'mongoose';
import moment from 'moment-timezone';
var Schema = mongoose.Schema;

const BLOG_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: String,
    category: String,
    image: String,
    created_at: {
        type: Date,
        default: moment.tz(new Date(), "Asia/Kolkata")
    }
});

var blogSchema = mongoose.model("blogs", BLOG_SCHEMA);

export default blogSchema;