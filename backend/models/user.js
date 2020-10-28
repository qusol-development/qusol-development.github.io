const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userPublicProfile = require('./userPublicProfile');

const userSchema = new mongoose.Schema({
    uid:{
        type:String
    },
    username: {
        type: String,
        unique: true,
    },
    isDeleted: Boolean,
    isVerified: Boolean,
    displayName: String,
    coverImageUrl: {
        type: String
    },
    photoURL: {
        type: String,
        default: "https://image.flaticon.com/icons/svg/2922/2922506.svg"
    },
    bio: String,
    phoneNumber:{
        type:String,
        unique: true,
    },
    location: {
        type: String
    },
    work:{
        type:String
    },
    college:{
        type:String
    },
    school:{
        type:String
    },
    email:{
        type:String,
        unique: true,
    },
    twitter:{
        type:String
    },
    instagram:{
        type:String
    },
    interests:{
        type: mongoose.Schema.Types.Mixed,
        default:{}
    },
    followers:[{type:String}],
    following:[{type:String}],
},
    {
        timestamps: true,
        minimize:false
    })

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    return {
        uid: userObject.uid,
        username: userObject.username,
        displayName: userObject.displayName,
        email: userObject.email,
        coverImageUrl: userObject.coverImageUrl,
        profileImageUrl: userObject.profileImageUrl,
        bio: userObject.bio,
        work: userObject.work,
        college: userObject.college,
        school: userObject.school,
        phoneNumber: userObject.phoneNumber,
        twitter: userObject.twitter,
        instagram: userObject.instagram,
        createdAt: userObject.createdAt,
        updatedAt: userObject.updatedAt,
        interests: userObject.interests,
        followers:userObject.followers,
        following:userObject.following
    }
}

// token generation
userSchema.methods.generateAuthToken = function () {
    let user = this
    console.log(process.env.SECRET)
    let token = jwt.sign(
        { username: user.username, uid: user._id.toString(), displayname: user.displayname, profileImageUrl: user.profileImageUrl },
        process.env.SECRET,
        { expiresIn: '7 days' }
    )
    return token
}

module.exports = mongoose.model('User', userSchema) 