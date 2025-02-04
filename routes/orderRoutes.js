const express = require('express');
const Order = require('../models/order');
const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('items.productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
});

// Place a new order
router.post('/', async (req, res) => {
    const { items, total } = req.body;
    try {
        const order = new Order({ items, total });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: 'Error placing order', error });
    }
});

module.exports = router;
