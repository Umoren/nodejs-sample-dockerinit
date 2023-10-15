const pool = require('./db');

// Functions for Products
async function createProduct(product) {
    const { name, description, price, image } = product;
    const res = await pool.query(
        'INSERT INTO products (name, description, price, image) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, image]
    );
    return res.rows[0];
}

async function fetchProducts() {
    const res = await pool.query('SELECT * FROM products');
    return res.rows;
}

async function updateProduct(id, updatedProduct) {
    const { name, description, price, image } = updatedProduct;
    const res = await pool.query(
        'UPDATE products SET name = $1, description = $2, price = $3, image = $4 WHERE id = $5 RETURNING *',
        [name, description, price, image, id]
    );
    return res.rows[0];
}

async function deleteProduct(id) {
    const res = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
}

// Functions for Orders
async function createOrder(order) {
    const { userId, products, total } = order;
    const res = await pool.query(
        'INSERT INTO orders (userId, products, total) VALUES ($1, $2, $3) RETURNING *',
        [userId, products, total]
    );
    return res.rows[0];
}

async function fetchOrders() {
    const res = await pool.query('SELECT * FROM orders');
    return res.rows;
}

async function updateOrder(id, updatedOrder) {
    const { userId, products, total } = updatedOrder;
    const res = await pool.query(
        'UPDATE orders SET userId = $1, products = $2, total = $3 WHERE id = $4 RETURNING *',
        [userId, products, total, id]
    );
    return res.rows[0];
}

async function deleteOrder(id) {
    const res = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
}

module.exports = {
    createProduct,
    fetchProducts,
    updateProduct,
    deleteProduct,
    createOrder,
    fetchOrders,
    updateOrder,
    deleteOrder,
};
