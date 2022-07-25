const { Article, validate } = require("../models/Article");
const { User } = require("../models/User");
const _ = require("lodash");
const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const path = require("path");
const { default: mongoose } = require("mongoose");

router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).send("Can't find article");

    const user = await User.findById(article.writer);
    if (!user) user.firstName = "none";

    let response = {
      title: article.title,
      writer: user.firstName,
      image: article.image,
      description: article.description,
      time: article.time,
      category: article.category,
      canEdit: false,
    };
    try {
      const decodedPayload = jwt.verify(
        req.header("x-auth-token"),
        config.get("jwtPrivateKey")
      );

      if (decodedPayload.id === article.writer) response.canEdit = true;
      res.send(response);
    } catch {
      res.send(response);
    }
  } catch (error) {
    res.status(400).send("Article not found");
  }
});

router.get("/", async (req, res) => {
  const article = await Article.find().sort({ time: -1 });
  if (!article) return res.status(404).send("There are no articles for show");

  res.send(article);
});

router.get("/post/recent/", async (req, res) => {
  const article = await Article.find().sort({ time: -1 });
  if (!article) return res.status(404).send("Can't find article");

  res.send(article[0]);
});

router.post("/new", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let coverImage;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded");
  }

  coverImage = req.files.coverImage;
  let fileName = new Date().getTime().toString() + path.extname(coverImage.name);
  uploadPath = path.join(__dirname + "/../public", "images/") + fileName;

  coverImage.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
  });

  const articleData = {
    _id : mongoose.Types.ObjectId(),
    writer: req.body.writer,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    image: `${req.protocol}://${req.get("host")}/images/${fileName}`,
  };

  const article = await new Article(
    _.pick(articleData, ["_id", "writer", "title", "description", "image", "category"])
  );

  await article.save();

  return res.send(`${article.title} is published`);
});

router.put("/update/:id", auth, async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
  });
  if (!article) res.status(400).send("Update Failed");

  res.send(article);
});

module.exports = router;
