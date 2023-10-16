const url = 'http://localhost:3030/users/login';

const homeBtn = document.getElementById('home');

const emailInputElement = document.querySelector('input[name="email"]');

const passwordInputElement = document.querySelector('input[name="password"]');
const loginBtn = document.querySelector('#login-view button');

export let emailVal;


loginBtn?.addEventListener('click', login);

async function login(e) {

    e.preventDefault();

    try {

        if(emailInputElement.value === '' || passwordInputElement.value === '') {
            throw new Error('All fields must be filled!');
        }


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
        resetLoginForm();
        homeBtn.click();

    } catch (e) {
        resetLoginForm();
        alert(e.message);
    }
}

function resetLoginForm() {
    emailInputElement.value = '';
    passwordInputElement.value = '';
}



