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


const titleSchema = new mongoose.Schema({
    titleid: String,
    description: String,
    title: String,
    imgurl: String
});

const Title = mongoose.model('Title', titleSchema);


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


app.post('/signup', signup);
app.post('/login', login);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
