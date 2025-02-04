const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

// Add a product (for admin purposes)
router.post('/', async (req, res) => {
    const { name, price, image, category } = req.body;
    try {
        const product = new Product({ name, price, image, category });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: 'Error adding product', error });
    }
});

module.exports = router;
