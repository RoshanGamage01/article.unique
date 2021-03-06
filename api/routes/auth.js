const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const Joi = require('joi')
const bcrypt = require('bcrypt');
const _ = require('lodash');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send('Invalid email or password');
    
    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send("Invalid email or password")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send("Invalid email or password")

    const token = user.genarateAuthToken();
    res.header('x-auth-token', token).send({message: "login success", token});
})

function validate(request){
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password:  Joi.string().min(6).max(1024).required()
    }

    return Joi.validate(request, schema);
}

module.exports = router;