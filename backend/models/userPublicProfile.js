const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const publicProfileSchema = new mongoose.Schema({
    uid: {
        type: String,
        ref: 'User',
        required: true
    },
    displayName: {
        type: String,
        trim: true,
        required:true
    },
    username: {
        type: String,
        trim: true
    },
    photoURL: {
        type: String,
        default: ""////put default profile image file url
    }
}, {
    _id: false
});

module.exports = publicProfileSchema;