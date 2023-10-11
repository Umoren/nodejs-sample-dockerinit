// data.js
exports.products = [
    { id: 1, name: 'Product 1', description: 'Description 1', price: 100, image: 'https://source.unsplash.com/random/200x200?sig=1' },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 200, image: 'https://source.unsplash.com/random/200x200?sig=2' },
    { id: 3, name: 'Product 3', description: 'Description 3', price: 300, image: 'https://source.unsplash.com/random/200x200?sig=3' },
    { id: 4, name: 'Product 4', description: 'Description 4', price: 400, image: 'https://source.unsplash.com/random/200x200?sig=4' },
    { id: 5, name: 'Product 5', description: 'Description 5', price: 500, image: 'https://source.unsplash.com/random/200x200?sig=5' },
    { id: 6, name: 'Product 6', description: 'Description 6', price: 600, image: 'https://source.unsplash.com/random/200x200?sig=6' },
    { id: 7, name: 'Product 7', description: 'Description 7', price: 700, image: 'https://source.unsplash.com/random/200x200?sig=7' },
    { id: 8, name: 'Product 8', description: 'Description 8', price: 800, image: 'https://source.unsplash.com/random/200x200?sig=8' },
    { id: 9, name: 'Product 9', description: 'Description 9', price: 900, image: 'https://source.unsplash.com/random/200x200?sig=9' },
    { id: 10, name: 'Product 10', description: 'Description 10', price: 1000, image: 'https://source.unsplash.com/random/200x200?sig=10' },
];

exports.orders = [
    { id: 1, userId: 'user', products: [1, 2], total: 300 },
    { id: 2, userId: 'user', products: [3, 4], total: 700 },
    { id: 3, userId: 'user', products: [5, 6], total: 1100 },
    { id: 4, userId: 'user', products: [7, 8], total: 1500 },
    { id: 5, userId: 'user', products: [9, 10], total: 1900 },
    { id: 6, userId: 'user2', products: [1, 3, 5], total: 600 },
    { id: 7, userId: 'user2', products: [2, 4, 6], total: 1200 },
    { id: 8, userId: 'user2', products: [7, 9], total: 1600 },
    { id: 9, userId: 'user3', products: [2, 8], total: 1000 },
    { id: 10, userId: 'user3', products: [4, 6], total: 1000 },
];
