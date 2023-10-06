import { updateAuth, saveUser } from "../auth.js";
import { login } from "../api.js";

const loginSection = document.querySelector('.login');
const loginForm = loginSection.querySelector('form');


loginForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    
    let email = formData.get('email');
    let password = formData.get('password');

    login(email, password)
        .then(user => {
            saveUser(user);
            updateAuth();
            alert('Successfully logged in');
        })
});

export function renderLogin() {
    loginSection.style.display = 'block';
}
