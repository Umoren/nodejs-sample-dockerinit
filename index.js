// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const bodyParser = require('body-parser');
const { products, orders } = require('./data');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'https://main.d308zysql7z2sz.amplifyapp.com' }));

// Define your endpoints
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === Number(req.params.id));
    if (!product) {
        return res.status(404).send('Product not found');
    }
    res.json(product);
});

// Apply Clerk's strict authentication middleware
app.get('/api/orders',
    ClerkExpressRequireAuth(),
    (req, res) => {
        // Your existing handler code
        const userOrders = orders.filter(order => order.userId === 'user');
        res.json(userOrders);
    }
);

app.post('/api/orders',
    ClerkExpressRequireAuth(),
    (req, res) => {
        // Your existing handler code
        const newOrder = {
            id: orders.length + 1,
            userId: req.auth.id,
            products: req.body.products,
            total: req.body.total,
        };
        orders.push(newOrder);
        res.status(201).json(newOrder);
    }
);

// Error handler for unauthorized requests
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(401).send('Unauthenticated!');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
