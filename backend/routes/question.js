const express = require('express');
const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId;
const Question = require('../models/question')
const verifyToken = require('../middlewares/auth');


// @GET /question
router.get('/question', (req, res) => {
    const page = +req.query.page || 1;
    const QUESTIONS_PER_PAGE = 10;

    Question.find().skip((page - 1) * QUESTIONS_PER_PAGE).limit(QUESTIONS_PER_PAGE).populate('bestAnswer')
        .then(questions => {
            res.status(200).send({
                error: false,
                body: {
                    page: page,
                    questions: questions
                }
            })
        }).catch(e => {
            console.log(e);
        })
})


// @GET /question/:id
router.get('/question/:id',async (req, res) => {
    const _id = req.params.id
    try {
        const que = await Question.findOne({ _id: ObjectId(_id), isDeleted: false})
        if (!que) {
            return res.status(404).send();
        }
        await que.populate('bestAnswer').execPopulate()
        return res.status(200).send(que)
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

// @POST /question
router.post('/question',verifyToken, async (req, res) => {
    const { title, description = null, isAnonymous = false, tags = [] } = req.body
    const question = new Question({
        ...req.body,
        author: req.user,
    })
    try {
        await question.save();
        res.status(201).send(question);
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})

module.exports = router