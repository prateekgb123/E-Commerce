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
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // If no token, return unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid, return forbidden
        req.user = user; 
        next(); // Pass the execution to the next middleware
    });
}
app.post('/checkout', authenticateToken, async (req, res) => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const token = localStorage.getItem('token'); 

    if (!token) {
        alert("Please login to checkout.");
        window.location.href = 'sign.html'; 
        return;
    }

    const order = {
        id: `ORD${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString(),
        status: "Pending",
        items: cart.map(item => ({
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: 1 
        })),
        total: calculateCartTotal(),
    };

    orders.push(order);
    cart.length = 0; 
    updateCartCount();
    displayCart();
    alert("Order placed successfully!");

   
    if (document.getElementById('account-tab').classList.contains('active')) {
        displayOrders();
    }
});
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));