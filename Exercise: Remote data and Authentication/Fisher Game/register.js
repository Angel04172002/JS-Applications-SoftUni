const url = 'http://localhost:3030/users/register';
const homeBtn = document.getElementById('home');


const emailInputElement = document.querySelector('input[name="email"]');
const passwordInputElement = document.querySelector('input[name="password"]');
const rePasswordInputElement = document.querySelector('input[name="rePass"]');

const registerBtn = document.querySelector('#register-view button');
const spanElement = document.querySelector('nav p.email span');

registerBtn.addEventListener('click', register);


async function register(e) {

    e.preventDefault();

    try {

        if(emailInputElement.value === '' || passwordInputElement.value === '' || rePasswordInputElement.value === '') {
            throw new Error('All fields must be filled!');
        }

        if(passwordInputElement.value !== rePasswordInputElement.value) {
            throw new Error('Passwords don\'t match!');
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: emailInputElement.value,
                password: passwordInputElement.value
            })
        });

        if (!response.ok) {
            throw new Error('An error occurred!');
        };

        const data = await response.json();

        localStorage.setItem('user', JSON.stringify(data));
        resetRegisterForm();
        homeBtn.click();

    } catch (e) {
        resetRegisterForm();
        alert(e.message);
        
    }
}

function resetRegisterForm() {
    emailInputElement.value = '';
    passwordInputElement.value = '';
    rePasswordInputElement.value = '';
}

