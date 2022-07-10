const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const { User, validate } = require('../models/User');
const { Article } = require('../models/Article');
const bcrypt = require('bcrypt');
const _ = require('lodash');

router.get('/me', auth, async (req, res) => {
    const me = await User.findOne({_id: req.user.id}).select("-password")
    const article = await Article.find({writer: req.user.id})

    res.send({me, article})
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select("-_id -password -email -profileImage");
    if(!user) return res.status(404).send("User does not exist")

    res.send(user)
})

router.post('/register', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send("User already registered")

    user = await new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'profileImage']));

    const salt = await bcrypt.genSalt(10);
    user.password =  await bcrypt.hash(req.body.password, salt)

    await user.save();

    const token = user.genarateAuthToken()

    res.header('x-auth-token', token).send({message: `${user.firstName} register successful`, token: token});
})

module.exports = router;