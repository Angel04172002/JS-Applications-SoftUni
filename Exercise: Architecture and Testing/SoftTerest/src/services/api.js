import * as request from "./request.js";

const baseUrl = 'http://localhost:3030';

const loginUrl = `${baseUrl}/users/login`;
const registerUrl = `${baseUrl}/users/register`;
const logoutUrl = `${baseUrl}/logout`;


export function loginUser(email, password) {
    return request.post(loginUrl, { email, password });
}

export function registerUser(email, password) {
    return request.post(registerUrl, { email, password });
}


export function logoutUser() {
    return request.get(logoutUrl);
}

