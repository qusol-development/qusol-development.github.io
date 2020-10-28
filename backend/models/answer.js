const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const userPublicProfile = require('./userPublicProfile');

const ansSchema = new mongoose.Schema({
    author: userPublicProfile,
    body: {
        type: String,
        required: true
    },
    question: {
        type: ObjectId,
        required:true,
        ref: 'Question'
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    isAnonymous: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    upvoteCount: {
        type: Number,
        default: 0
    },
    downvoteCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

ansSchema.methods.toJSON = function () {
    const ans = this
    const ansObject = ans.toObject()
    delete ansObject.isDeleted
    if (ansObject.isAnonymous)
        delete ansObject.author
    delete ansObject.isAnonymous
    return ansObject
}

const Answer = mongoose.model('Answer', ansSchema);

module.exports = Answer;