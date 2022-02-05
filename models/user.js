import mongoose from 'mongoose';
import moment from 'moment-timezone';

var Schema = mongoose.Schema;

const USER_SCHEMA = new Schema({
    name: {
        type: String,
        default: 'Single User'
    },
    email: {
        type: String,
        default: 'singleuser@static.com'
    },
    password: {
        type: String,
        required: true
    },
    image: String,
    date: { 
        type: Date,
        default: moment.tz(new Date(), "Asia/Kolkata")
    },
    status: {
        type: Boolean,
        default: true
    }
});

let userInstance = mongoose.model("bloguser", USER_SCHEMA);

export default userInstance;