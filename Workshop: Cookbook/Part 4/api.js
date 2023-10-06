import { getToken } from "./auth.js";
import * as request from "./request.js";


const baseUrl = 'http://localhost:3030';

const recipesUrl = `${baseUrl}/data/recipes`;
const loginUrl = `${baseUrl}/users/login`;


export const getAllRecipes = () => request.get(recipesUrl);


export const createRecipe = (data) => {
    return request.post(recipesUrl, data);
};


export const login = (email, password) => {
    return request.post(loginUrl, { email, password });
};


