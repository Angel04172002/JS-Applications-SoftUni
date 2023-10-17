import { registerUser } from "../services/api.js";
import { renderHome } from "./home.js";
import { router } from "./router.js";
import * as authService from "../services/auth.js";

const registerSection = [...document.querySelectorAll('body > .container')][1];


const registerForm = registerSection.querySelector('form');

registerForm.addEventListener('submit', register);


async function register(e) {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePassword = formData.get('repeatPassword');



    try {

        if(password !== rePassword) {
            throw new Error('Passwords are different!');
        };

        if(email.length < 3) {
            throw new Error('Email must be at least 3 symbols long!');
        };

        if(password.length < 3) {
            throw new Error('Password must be at least 3 symbols long!');
        };


        registerUser(email, password)
            .then(user => {
                authService.saveUser(user);
                authService.updateAuth();
                registerForm.reset();
                router('/home');
            });

    } catch(e) {
        registerForm.reset();
        alert(e.message);
    }
}


export function renderRegister() {
    registerSection.style.display = 'block';
}

