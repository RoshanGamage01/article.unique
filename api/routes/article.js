const { Article, validate } = require("../models/Article");
const _ = require("lodash");
const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");

router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).send("Can't find article");

  let response = {
    title: article.title,
    writer: article.writer,
    image: article.image,
    description: article.description,
    time: article.time,
    category: article.category,
    canEdit: false
  }
  

  try{
    const decodedPayload = jwt.verify(req.header("x-auth-token"),config.get("jwtPrivateKey"));
    
    if(decodedPayload.id === article.writer) response.canEdit = true;
    res.send(response);
  }catch{
    res.send(response)
  }

  
});

router.get("/", async (req, res) => {
  const article = await Article.find().sort({ time: -1 });
  if (!article) return res.status(404).send("There are no articles for show");

  res.send(article);
});

router.post("/new", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const article = await new Article(
    _.pick(req.body, ["writer", "title", "description", "image", "category"])
  );

  await article.save();

  res.send(`${article.title} is published`);
});

router.put('/update/:id', auth, async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image
  });
  if(!article) res.status(400).send('Update Failed')

  res.send(article)
})

module.exports = router;
