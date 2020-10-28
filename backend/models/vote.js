const mongoose = require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId;
const userPublicProfile = require('./userPublicProfile');

const voteSchema = new mongoose.Schema({
    user:userPublicProfile,
    value:{
        type:Boolean,
        required:true
    },
    parentType:{
        type:String,
        required:true
    },
    pid:{
        type:ObjectId
    }
}, {
    timestamps:true
});

voteSchema.index({user:1,parentType:1,pid:1},{unique:true});

const Vote = mongoose.model('Vote', voteSchema);

module.exports=Vote;