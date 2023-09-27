import { updateAuth } from "../auth.js";


const loginSection = document.querySelector('.login');
const loginForm = loginSection.querySelector('form');

const url = 'http://localhost:3030/users/login'

loginForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get('email');
    const password = formData.get('password');


    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        }),
    })
        .then(res => res.json())
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            updateAuth();
            alert('Successfully logged in!');
        })
});

export function renderLogin() {

    loginSection.style.display = 'block';
}