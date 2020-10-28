const express = require('express');
const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId;
const Article = require('../models/article')
const verifyToken = require('../middlewares/auth');

// @GET /article/:id
router.get('/article/:id',async (req, res) => {
    const _id = req.params.id
    try {
        const art = await Article.findOne({ _id: ObjectId(_id), isDeleted: false})
        if (!art) {
            return res.status(404).send();
        }
        return res.status(200).send(art)
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

// @POST /article
router.post('/article',verifyToken, async (req, res) => {
    try {
        const art = new Article({
            ...req.body,
            author: req.user,
        })
        await art.save();
        res.status(201).send(art);
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})

module.exports = router