const mongoose = require('mongoose');
const userPublicProfile = require('./userPublicProfile');

const postSchema = new mongoose.Schema({
    author:userPublicProfile,
    title:{
        type:String,
    },
    body:{
        type:String,
        required:true
    },
    isPublished: {
        type: Boolean,
        default: false
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
    tags:[
        {
            tagid:{
                type:ObjectId,
                ref:'Tag'
            },
            text:{
                type:String
            }
        }
    ],
    categories:[
        {
            catid:{
                type:ObjectId,
                ref:'Category'
            },
            name:{
                type:String
            }
        }
    ]
}, {
    timestamps:true
});

const Post  = mongoose.model('Post', postSchema);

module.exports=Post;