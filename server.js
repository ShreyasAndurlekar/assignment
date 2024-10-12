const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const { signup, login, addFavourite, getFavourites } = require('./user');
require('dotenv').config();
const Title = require('./title'); 


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || ['http://localhost:5000'].indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS')); 
      }
    },
    methods: ['GET', 'POST'], 
    credentials: true, // Allow credentials (cookies, authorization headers)
  };
  
  app.use(cors(corsOptions));
  

const mongoURI = process.env.URL;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB Atlas");
    })
    .catch((err) => console.log("Error connecting to MongoDB:", err));

// Title Schema


// Endpoint to get a title by ID
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
    const { username, comment, titleid } = req.body;

    if (!username || !comment || !titleid) {
        return res.status(400).json({ error: "Username, comment, and titleid are required" });
    }

    try {
        const title = await Title.findOne({ titleid });
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

    if (!titleId) {
        return res.status(400).json({ error: "Title ID not provided" });
    }

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
app.post('/add-favourite', addFavourite);
app.get('/get-favourites', getFavourites);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = Title