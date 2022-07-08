const mongoose = require('mongoose');
const Joi = require('joi');

const articleSchema = new mongoose.Schema({
    writer: {
        type: String,
        minlength: 1,
        maxlength: 255,
        default: "Anonimus"
    },
    title:{
        type: String,
        minlength: 1,
        maxlength: 255,
        requied: true
    },
    description: {
        type: String,
        minlength: 50,
        required: true
    },
    image: {
        type: String,
        minlength: 1,
        maxlength: 255
    },
    category: {
        type: Array,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
},{timestamps: true});

const Article = mongoose.model('Article', articleSchema);

function validateArticle(request){
    const schema = {
        writer: Joi.string().min(1).max(255),
        title: Joi.string().min(1).max(255).required(),
        description: Joi.string().min(50).required(),
        category: Joi.array(),
        image: Joi.string().min(1).max(255), 
    }

    return Joi.validate(request, schema);
}

exports.validate = validateArticle;
exports.Article = Article;