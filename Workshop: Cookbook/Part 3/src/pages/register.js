import { updateAuth } from "../auth.js";

const registerSection = document.querySelector('.register');
const registerForm = registerSection.querySelector('form');

const url = 'http://localhost:3030/users/register'

registerForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    
    const email = formData.get('email');
    const password = formData.get('password');
    const rePassword = formData.get('rePass');

    if(password !== rePassword) {
        alert('Passwords don\'t match!');
        return;
    };

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
        .then((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            updateAuth();
            alert('Successfully registered!');
        })

})

export function renderRegister() {
    registerSection.style.display = 'block';
}