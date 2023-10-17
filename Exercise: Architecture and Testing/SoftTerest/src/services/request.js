import { getUserToken } from "./auth.js";

export function request(method, url, data) {

    let options = {};
    const token = getUserToken();

    if (method !== 'GET') {
        options = {
            method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        };
    };

    if (method !== 'GET' && token) {
        options.headers['X-Authorization'] = token;
    };

    return fetch(url, options)
        .then(res => res.json());
}


export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');