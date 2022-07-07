const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const { User, validate } = require('../models/User');
const bcrypt = require('bcrypt');
const _ = require('lodash');

router.get('/me', auth, async (req, res) => {
    const me = await User.findOne({_id: req.user.id}).select("-_id -password")

    res.send(me)
})

router.post('/register', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send("User already registered")

    user = await new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password =  await bcrypt.hash(req.body.password, salt)

    await user.save();

    const token = user.genarateAuthToken()

    res.header('x-auth-token', token).send({message: `${user.firstName} register successful`, token: token});
})

module.exports = router;