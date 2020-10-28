const express = require('express');
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const connectDB = require('./connect/index')
require('dotenv').config()

app.use(express.static(path.join(__dirname, 'client')));
const commentRoutes = require('./routes/comment')
const voteRoutes = require('./routes/vote')
const quesRoutes = require('./routes/question')
const ansRoutes = require('./routes/answer')
const feedRoutes = require('./routes/feed')
const userRoutes = require('./routes/user')
const articleRoutes = require('./routes/article')

const PORT = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next();
})

app.use(voteRoutes)
app.use(commentRoutes)
app.use(quesRoutes)
app.use(ansRoutes)
app.use(feedRoutes)
app.use(userRoutes)
app.use(articleRoutes)

app.get('/test', (req, res) => {
    res.status(200).send({
        message: "working"
    })
})

app.get('*', (req,res) =>{
    console.log("get : *")
    res.sendFile(path.join(__dirname+'/client/index.html'));
});

connectDB(() => {
    app.listen(PORT, () => {
        console.log(`server running on ${PORT}`);
    })
})