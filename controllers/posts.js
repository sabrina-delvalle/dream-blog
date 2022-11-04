require('dotenv').config();
const jwt = require('jsonwebtoken')
const Post = require('../Models/Post');
const express = require("express");
const app = express();

app.use(express.json())


//Create Post
const postArticle = async (req, res) => {
    const article = new Post({
        title: req.body.title,
        autor: req.body.autor,
        quote: req.body.quote,
        //date: new Date(),
        article: req.body.article,
        image: req.body.image
    });
    try {
        let newArticle = await article.save();
        console.log("_id: ", article._id)
        console.log(await Post.findById('630ca02b5d1e9a053edf4112'))
        res.json(article)
    }catch(err){
        res.json({message: err});
    }
}

//GET - Read Post
const getArticle = async (req, res) => {
    try{
        //console.log(req.params._id)
        const article = await Post.find().sort({ _id: -1 }).limit(3)
        res.json(article)
    }catch(err){
        res.json({error: err})
    } 
}
//get new Extra
const getLatest = async (req, res) => {
    try{
        const article = await Post.find({ _id: {$lte: req.params.id}}).limit(3)
        console.log('last id: ', article)
        //console.log('type of: ', typeof(article[2]._id))
        console.log('params date: ', req.params.id)
        console.log('All articles: ', article.map((elem) => elem._id === req.params.id ))
        res.json(article)
    }catch(err){
        res.json({error: err})
    } 
}

//Delete Post
const deleteArticle = async (req, res) => {
    try {
        const article = await Post.findOneAndDelete({_id: req.params._id })  //it can be used also remove, it does return nothing
        console.log('post deleted.')
        res.json(article)
    }catch(err){
        res.json({error: err})
    }
}

//update Post
const updateArticle = async (req, res) => {
    try{
        let postToUpdate = await Post.updateOne({_id: req.params.id}, 
                                                {$set: {title: req.body.title,
                                                        autor: req.body.autor,
                                                        quote: req.body.quote,
                                                        article: req.body.article,
                                                        image: req.body.image} });
        console.log('Success, post updated.')
        res.json(postToUpdate);
    }catch(err){
        res.json({message: err})
    }
}



// check user to post

const createArticle = (req, res) => {
    
    const authHeader = req.headers['authorization'];  //remember it travels for header or other ways? and then extracted to only get token
    const token = authHeader.split(' ')[1]
    
    jwt.verify(token, process.env.SECRET_KEY, function(err, user) {
        if(err) return res.sendStatus(403) ;
        console.log("username: ", user.username, ' available to log in.')
        return res.status(200).send('<h1> Available to login </h1>')
    });
    
}

const toBackend = (req, res) => {
    res.json({"users": ['userOne', 'userTwo', 'userThree']})
}

module.exports = { postArticle, toBackend, getArticle, deleteArticle, updateArticle, createArticle, getLatest }