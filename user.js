const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const  Title  = require('./title');

const JWT_SECRET = process.env.KEY;

// User Schema and Model
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    favourites: [{ titleId: String }]
});

const User = mongoose.model('User', userSchema);

// Signup Handler
const signup = async (req, res) => {
    const { email, username, password } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: "Email, username, and password are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, username });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Login Handler
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET);
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Add Favourite Handler
const addFavourite = async (req, res) => {
    const { username, titleId } = req.body;

    if (!username || !titleId) {
        return res.status(400).json({ error: "Username and titleId are required" });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const existingFavourite = user.favourites.find(fav => fav.titleId === titleId);
        if (existingFavourite) {
            return res.status(400).json({ error: "Title already in favourites" });
        }

        user.favourites.push({ titleId });
        await user.save();

        res.status(200).json({ message: "Favourite added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get Favourites Handler
// Get Favourites Handler
const getFavourites = async (req, res) => {
  const { username } = req.query;

  if (!username) {
      return res.status(400).json({ error: "Username is required" });
  }

  try {
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      // Fetch titles based on user favourites
      const favourites = await Title.find({ titleid: { $in: user.favourites.map(fav => fav.titleId) } });

      // Map the results to the desired format
      const formattedFavourites = favourites.map(fav => ({
          title: fav.title,
          imageUrl: fav.imgurl,
          titleId: fav.titleid
      }));

      res.status(200).json({ favourites: formattedFavourites });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { signup, login, getFavourites, addFavourite };
