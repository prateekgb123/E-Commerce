const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

// Register Route
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.json({ message: "User registered successfully!" });
});

// Login Route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));