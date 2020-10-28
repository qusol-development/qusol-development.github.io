const express = require('express');
const router = express.Router()
const Question = require('../models/question')
const verifyToken = require('../middlewares/auth');

// @GET /feed
router.get('/feed',async (req, res) => {
    console.log('feed');
    try {
        const questions = await Question.find().populate('bestAnswer')
        res.status(200).send(questions)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router