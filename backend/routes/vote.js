const express = require('express');
const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId;

const Vote = require('../models/vote')
const Answer = require('../models/answer')
const Comment = require('../models/comment')
const Question = require('../models/question')
const verifyToken = require('../middlewares/auth');

const reviseVoteCounts = async (parentType, pid) => {
    const upvoteCount = await Vote.countDocuments({ pid, value: true, parentType });
    const downvoteCount = await Vote.countDocuments({ pid, value: false, parentType });
    switch (parentType) {
        case 'comment':
            Comment.updateOne({ _id: pid }, { upvoteCount, downvoteCount });
            break;
        case 'question':
            Question.updateOne({ _id: pid }, { upvoteCount, downvoteCount });
            break;
        case 'answer':
            const ans = await Answer.updateOne({ _id: pid }, { upvoteCount, downvoteCount });
            const questionId = ans.questionId;
            const bestAnswer = await Answer.findOne({ questionId }).sort('-upvoteCount');
            Question.updateOne({ _id: questionId }, { bestAnswer:bestAnswer._id });
            break;
        default:
            break;
    }
}

router.get('/:type/:id/vote',verifyToken, async (req, res) => {
    const parentType=req.params.type;
    const pid = req.params.id;
    try {
        const vote = await Vote.findOne({ user:req.user, parentType, pid })
        if (!vote) {
            return res.status(200).send({value:null});
        }
        return res.status(200).send({value:vote.value});
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

// @POST /upvote
router.post('/:type/:id/upvote',verifyToken, async (req, res) => {
    const parentType=req.params.type;
    const pid = req.params.id;
    try {
        let vote = await Vote.findOneAndUpdate({ user: req.user, pid, parentType }, { value: true }, { new: true })
        if (!vote) {
            vote = new Vote({
                user: req.user,
                pid,
                parentType,
                value: true
            })
            await vote.save()
        }
        res.send(vote);
        reviseVoteCounts(parentType, pid);
    } catch (e) {
        res.status(400).send(e)
    }
})

// @POST /downvote
router.post('/:type/:id/downvote', verifyToken, async (req, res) => {
    const parentType=req.params.type;
    const pid = req.params.id;
    try {
        let vote = await Vote.findOneAndUpdate({ user: req.user, pid, parentType }, { value: false }, { new: true })
        if (!vote) {
            vote = new Vote({
                user: req.user,
                pid,
                parentType,
                value: false
            })
            await vote.save()
        }
        res.send(vote);
        reviseVoteCounts(parentType, pid);
    } catch (e) {
        res.status(400).send(e)
    }
})

// @DELETE /upvote
router.delete('/:type/:id/vote', verifyToken, async (req, res) => {
    const parentType=req.params.type;
    const pid = req.params.id;
    try {
        const vote = await Vote.findOneAndDelete({ pid, user: req.user, parentType })
        if (!vote) {
            return res.status(404).send()
        }
        res.send(vote)
        reviseVoteCounts(vote.parentType, vote.pid);
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/downvote/:id', verifyToken, async (req, res) => {
    const { id } = req.params
    try {
        const vote = await Vote.findOneAndDelete({ _id: ObjectId(id), user: req.user, value:false })
        if (!vote) {
            return res.status(404).send();
        }
        res.send(vote)
        reviseVoteCounts(vote.parentType, vote.pid);
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router