const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const { signup, login } = require('./user');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const mongoURI = process.env.URL;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connected to MongoDB Atlas");
})
.catch((err) => console.log("Error connecting to MongoDB:", err));

// Updated title schema to include comments
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

// Existing endpoint to get a title by ID
app.get('/title', async (req, res) => {
    const titleId = req.query.titleid;
    if (!titleId) {
        return res.status(400).json({ error: "Title ID not provided" });
    }

    try {
        const title = await Title.findOne({ titleid: titleId });
        if (!title) {
            return res.status(404).json({ error: "Title not found" });
        }

        res.json(title);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Endpoint to post a comment
app.post('/comment', async (req, res) => {
    const { username, comment, titleid} = req.body;

    if (!username || !comment) {
        return res.status(400).json({ error: "Username and comment are required" });
    }

    try {
        const title = await Title.findOne({ titleid: titleid });
        if (!title) {
            return res.status(404).json({ error: "Title not found" });
        }

        title.comments.push({ username, comment });
        await title.save();
        res.status(201).json(title);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Endpoint to get all comments for a title
app.get('/comments', async (req, res) => {
    const titleId = req.query.id;


    try {
        const title = await Title.findOne({ titleid: titleId });
        if (!title) {
            return res.status(404).json({ error: "Title not found" });
        }

        res.json(title.comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Authentication routes
app.post('/signup', signup);
app.post('/login', login);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
