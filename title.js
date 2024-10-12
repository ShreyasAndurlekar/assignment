const mongoose = require('mongoose')

const titleSchema = new mongoose.Schema({
    titleid: String,
    description: String,
    title: String,
    imgurl: String,
    comments: [
        {
            username: String,
            comment: String,
            createdAt: { type: Date, default: Date.now }
        }
    ]
});

const Title = mongoose.model('Title', titleSchema);

module.exports = Title