// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
    createProduct,
    fetchProducts,
    updateProduct,
    deleteProduct,
    createOrder,
    fetchOrders,
    updateOrder,
    deleteOrder,
} = require('./data');

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

// Products
app.get('/api/products', async (req, res) => {
    const products = await fetchProducts();
    res.json(products);
});

app.post('/api/products', async (req, res) => {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
});

app.put('/api/products/:id', async (req, res) => {
    const updatedProduct = await updateProduct(req.params.id, req.body);
    res.json(updatedProduct);
});

app.delete('/api/products/:id', async (req, res) => {
    const deletedProduct = await deleteProduct(req.params.id);
    res.json(deletedProduct);
});

// Orders
app.get('/api/orders',
    ClerkExpressRequireAuth(),
    async (req, res) => {
        const userOrders = await fetchOrders();
        res.json(userOrders);
    }
);

app.post('/api/orders',
    ClerkExpressRequireAuth(),
    async (req, res) => {
        const newOrder = await createOrder({
            userId: req.auth.id,
            products: req.body.products,
            total: req.body.total,
        });
        res.status(201).json(newOrder);
    }
);

app.put('/api/orders/:id',
    ClerkExpressRequireAuth(),
    async (req, res) => {
        const updatedOrder = await updateOrder(req.params.id, req.body);
        res.json(updatedOrder);
    }
);

app.delete('/api/orders/:id',
    ClerkExpressRequireAuth(),
    async (req, res) => {
        const deletedOrder = await deleteOrder(req.params.id);
        res.json(deletedOrder);
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
