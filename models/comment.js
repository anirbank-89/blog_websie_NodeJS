import mongoose from 'mongoose';
import moment from 'moment-timezone';

var Schema = mongoose.Schema;

const COMMENT_SCHEMA = new Schema({
    postId: mongoose.Schema.Types.ObjectId,
    name: String,
    comment: {
        type: String,
        required: true
    },
    on_date: {
        type: Date,
        default: moment.tz(new Date(), "Asia/Kolkata")
    }
});

let commentInstance = mongoose.model("blog_comment", COMMENT_SCHEMA);

export default commentInstance;