const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { User, validate } = require("../models/User");
const { Article } = require("../models/Article");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const path = require('path');

router.get("/me", auth, async (req, res) => {
  const me = await User.findOne({ _id: req.user.id }).select("-password");
  const article = await Article.find({ writer: req.user.id });

  res.send({ me, article });
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select(
    "-_id -password -email -profileImage"
  );
  if (!user) return res.status(404).send("User does not exist");

  res.send(user);
});

router.post("/register", async (req, res) => {
  let profileImage;
  let uploadPath;

  if(!req.files || Object.keys(req.files).length === 0){
    return res.status(400).send('No files were uploaded');
  }

  profileImage = req.files.profileImage;
  let fileName = new Date().getTime().toString() + path.extname(profileImage.name)
  uploadPath = path.join(__dirname+"/../public","images/")+fileName;

  profileImage.mv(uploadPath, function(err){
    if(err) return res.status(500).send(err)
  })

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  const userDetails = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    profileImage: `${req.protocol}://${req.get("host")}/images/${fileName}`
  }

  user = await new User(
    _.pick(userDetails, [
      "firstName",
      "lastName",
      "email",
      "password",
      "profileImage",
    ])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();

  const token = user.genarateAuthToken();

  res.header('x-auth-token', token).send({message: `${user.firstName} register successful`, token: token});
});

module.exports = router;
