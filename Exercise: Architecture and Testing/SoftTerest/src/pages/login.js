import { loginUser } from "../services/api.js";
import * as authService from "../services/auth.js";
import { renderHome } from "./home.js";
import { router } from "./router.js";

const loginSection = [...document.querySelectorAll('body > .container')][2];

const loginForm = loginSection.querySelector('form');
loginForm.addEventListener('submit', login);


async function login(e) {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get('email');
    const password = formData.get('password');

    try {

        loginUser(email, password)
            .then(user => {
                authService.saveUser(user);
                authService.updateAuth();
                loginForm.reset();
                router('/home');
            });

    } catch(e) {
        loginForm.reset();
        alert(e.message);
    }
}

export function renderLogin() {
    loginSection.style.display = 'block';
}