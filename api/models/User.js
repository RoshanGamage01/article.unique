const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    profileImage: {
        type: String,
        default: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
        minlength: 6,
        maxlength: 255
    }
}, {timestamps: true});

userSchema.methods.genarateAuthToken = function(){
    const token = jwt.sign({id: this._id}, config.get('jwtPrivateKey'))
    return token
}

const User = mongoose.model('User', userSchema);

function userValidate(request){
    const schema = {
        firstName: Joi.string().min(1).max(255).required(),
        lastName: Joi.string().min(1).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password:  Joi.string().min(6).max(1024).required(),
        profileImage: Joi.string().min(1).max(255)
    }

    return Joi.validate(request, schema);
}

exports.User = User;
exports.validate = userValidate;