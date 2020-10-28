const mongoose = require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId;
const userPublicProfile = require('./userPublicProfile');

const articleSchema = new mongoose.Schema({
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
    tags: [
        String
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

const Article = mongoose.model('Article', articleSchema);

module.exports=Article;