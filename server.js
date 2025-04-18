const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Razorpay = require('razorpay');

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
    dbName: "ECOM",
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { collection: "user" });

const User = mongoose.model("User", UserSchema);
const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderId: { type: String, required: true },
    paymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
}, { collection: "orders" });

const Order = mongoose.model("Order", OrderSchema);

app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists. Please log in." });
        }

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Signup successful! Please log in." });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message: "Invalid credentials. Please sign up first." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "30d" });
    res.json({ token, username: user.username });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); 

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user; 
        next(); 
    });
}


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


app.post('/create-order', authenticateToken, async (req, res) => {
    const amount = req.body.amount;
    const currency = 'INR';

    const options = {
        amount: amount * 100, 
        currency,
        receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
        payment_capture: 1,
    };

    try {
        const response = await razorpay.orders.create(options);
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});


app.post('/confirm-order', authenticateToken, async (req, res) => {
    const { order, payment_id } = req.body;

    if (!order || !payment_id) {
        return res.status(400).json({ message: "Order and payment ID are required" });
    }

    try {
        const newOrder = new Order({
            userId: req.user.userId,
            orderId: order.id,
            paymentId: payment_id,
            amount: order.amount / 100, 
        });

        await newOrder.save();

        res.status(200).json({ message: "Order confirmed and saved", order });
    } catch (err) {
        console.error("Error saving order:", err);
        res.status(500).json({ message: "Failed to save order" });
    }
});

app.get('/order-history', authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.userId }).sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (err) {
        console.error("Failed to fetch order history:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

const PORT =5000;
app.listen(PORT, () => console.log(`Server running on {PORT}`));