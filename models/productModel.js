import products from '../data/products.json' assert {type: 'json'};
import { v4 as uuidv4 } from 'uuid';
import { writeDataToFile } from '../utility.js';

export const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(products);
    })
}

export const findById = (id) => {
    return new Promise((resolve, reject) => {
        const product = products.find( (eachProduct) => eachProduct.id === id)
        resolve(product);
    })
}

export const create = (product) => {
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuidv4(), ...product}
        products.push(newProduct)
        writeDataToFile('./data/products.json', products)
        resolve(newProduct);
    })
}

export const update = (id, product) => {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((eachProduct) => eachProduct.id === id)
        products[index] = { id, ...product } 
        writeDataToFile('./data/products.json', products)
        resolve(products[index]);
    })
}

export const remove = (id) => {
    return new Promise((resolve, reject) => {
        let newProducts = products.filter((eachProduct) => eachProduct.id !== id )
        writeDataToFile('./data/products.json', newProducts)
        resolve();
    })
}

