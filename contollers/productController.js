import { findAll, findById, create, update, remove } from '../models/productModel.js';
import { getPostData } from '../utility.js';

// @description   Gets All Products
// @route         GET /api/products
 export const getProducts = async (request, response) => {
    try {
        const products = await findAll();

        response.writeHead(200, { 'Content-Type': 'application/json'})
        response.end(JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }

}

// @description   Gets Single Product
// @route         GET /api/products/:id
export const getProduct = async (request, response, id) => {
    try {
        const product = await findById(id);

        if (!product) {
            response.writeHead(404, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ message: 'Product Not Found'}));
        } else {
            response.writeHead(200, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify(product));
        }
        
    } catch (error) {
        console.log(error);
    }
}

// @description   Create a Product
// @route         POST /api/products
export const createProduct = async (request, response) => {
    try {
        const body = await getPostData(request)

        const { organization,
            createdAt,
            updatedAt,
            products,
            marketValue,
            address,
            ceo,
            country,
            noOfEmployees,
            employees } = JSON.parse(body)

        const product = {
            organization,
            createdAt,
            updatedAt,
            products,
            marketValue,
            address,
            ceo,
            country,
            noOfEmployees,
            employees
            }

        const newProduct = await create(product);

        response.writeHead(201, { 'Content-Type': 'application/json' })
        return response.end(JSON.stringify(newProduct))
      
    } catch (error) {
        console.log(error);
    }

}

// @description   Update a Product
// @route         PUT /api/products/:id

export const updateProduct = async (request, response, id) => {
    try {
        const product = await findById(id)

        if (!product) {
            response.writeHead(404, { 'Content-Type': 'application/json'})
            response.end(JSON.stringify({ message: 'Product Not Found'}));
        } else {
            const body = await getPostData(request)

            const { organization,
                createdAt,
                updatedAt,
                products,
                marketValue,
                address,
                ceo,
                country,
                noOfEmployees,
                employees } = JSON.parse(body)

            const productData = {
                organization: organization || product.organization,
                createdAt: createdAt || product.createdAt,
                updatedAt: updatedAt || product.updatedAt,
                products: products || product.products,
                marketValue: marketValue || product.marketValue,
                address: address || product.address,
                ceo: ceo || product.ceo,
                country: country || product.country,
                noOfEmployees: noOfEmployees || product.noOfEmployees,
                employees: employees || product.employees
                }

            const updatedProduct = await update(id, productData);

            response.writeHead(200, { 'Content-Type': 'application/json' })
            return response.end(JSON.stringify(updatedProduct))
            }
    } catch (error) {
        console.log(error);
    }

}

// @description   Delete a Product
// @route         DELETE /api/products/:id
export const deleteProduct = async (request, response, id) => {
    try {
        const product = await findById(id);

        if (!product) {
            response.writeHead(404, { 'Content-Type': 'application/json'})
            response.end(JSON.stringify({ message: 'Product Not Found'}));
        } else {
            await remove(id)
            response.writeHead(200, { 'Content-Type': 'application/json'})
            response.end(JSON.stringify({ message: `Product ${id} removed `}));
        }
        
    } catch (error) {
        console.log(error);
    }
}