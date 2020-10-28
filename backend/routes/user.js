const express = require('express')
const User = require('../models/user')
const verifyToken = require('../middlewares/auth');
const router = express.Router()

const ObjectId = require('mongoose').Types.ObjectId;

router.get('/user/:uid', async (req, res) => {
    const uid = req.params.uid
    try {
        const user = await User.findOne({uid})
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/user', verifyToken, async (req, res) => {
    const user = new User({
        ...req.body,
        ...req.user
    })
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})

router.post('/user/:uid/follow',verifyToken, async(req,res)=>{
    try {
        await User.findOneAndUpdate(
            { uid: req.params.uid},
            {
                $addToSet: {
                   followers:req.user.uid
                }
            },
            { new: true }
        )
        const user = await User.findOneAndUpdate(
            { uid: req.user.uid},
            {
                $addToSet: {
                    following:req.params.uid
                }
            },
            { new: true }
        )
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/user/:uid/unfollow',verifyToken, async(req,res)=>{
    try {
        await User.findOneAndUpdate(
            { uid: req.params.uid},
            {
                $pull: {
                   followers:req.user.uid
                }
            },
            { new: true }
        )
        const user = await User.findOneAndUpdate(
            { uid: req.user.uid},
            {
                $pull: {
                    following:req.params.uid
                }
            },
            { new: true }
        )
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.patch('/user', verifyToken, async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { uid: req.user.uid},
            { ...req.body },
            { new: true }
        )
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router