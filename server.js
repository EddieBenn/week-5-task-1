import http  from 'http';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from './contollers/productController.js';

const server = http.createServer((request, response) => {
    if (request.url.match(/\/api\/products\/([0-9]+)/) && request.method === 'GET') {
        const print = request.url.split('/');
        console.log(print);
        const id = request.url.split('/')[3]
        getProduct(request, response, id)
    } else if (request.url.match(/\/api\/products\/([0-9]+)/) && request.method === 'PUT') {
        const id = request.url.split('/')[3];
        updateProduct(request, response, id);
    } else if (request.url.match(/\/api\/products\/([0-9]+)/) && request.method === 'DELETE') {
        const id = request.url.split('/')[3];
        deleteProduct(request, response, id);
    } else if (request.url.includes('api/products') && request.method === 'GET') {
        getProducts(request, response);
    } else if (request.url.includes('api/products') && request.method === 'POST') {
        createProduct(request, response);
    } else {
        response.writeHead(404, { 'Content-Type': 'application/json'})
        response.end(JSON.stringify({ message: 'Route Not Found'}));
    }

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


