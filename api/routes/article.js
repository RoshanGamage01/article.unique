const { Article, validate } = require('../models/Article');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.get("/:id", async (req, res) => {
    const article = await Article.findById(req.params.id);
    if(!article) return res.status(404).send("Can't find article")
    
    res.send(article)
})

router.get("/", async (req, res) => {
    const article = await Article.find().sort({time: -1})
    if(!article) return res.status(404).send("There are no articles for show")

    res.send(article);
})

router.post('/new', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const article = await new Article(_.pick(req.body, ['writer', 'title', 'description', 'image', 'category']))

    await article.save();

    res.send(`${article.title} is published`)
})

module.exports = router;