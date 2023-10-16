//Navigations
const userNav = document.getElementById('user');
const guestNav = document.getElementById('guest');

export function updateAuth() {

    const user = localStorage.getItem('user');

    if (user) {
        userNav.style.display = 'block';
        guestNav.style.display = 'none';
    } else {
        guestNav.style.display = 'block';
        userNav.style.display = 'none';
    };

    toggleAddButton();
}

export function getUser() {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
}

export function getToken() {

    return getUser()?.accessToken;
}

export function getUserId() {
    return getUser()?._id;
}

export function toggleAddButton() {

    const addBtn = document.querySelector('button.add');
    const user = getUser();

    if (user) {
        addBtn?.removeAttribute('disabled');
    } else {
        addBtn?.setAttribute('disabled', true);
    }
}

export function updateSpan() {

    const spanElement = document.querySelector('nav span');
    const user = getUser();

    if(user) {
        spanElement.textContent = user.email;
    }  else {
        spanElement.textContent = 'guest';
    }
}


