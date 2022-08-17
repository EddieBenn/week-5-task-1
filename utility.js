import fs from 'fs';
import { request } from 'http';

export const writeDataToFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err);
        }
    })
}

export const getPostData = (request) => {
    return new Promise ((resolve, reject) => {
        try {
            let body = ''
            request.on('data', (chunk) => {
            body += chunk.toString()
            })

            request.on('end', () => {
                resolve(body);
            })
        } catch (error) { 
            reject(err);
        }
    })
}