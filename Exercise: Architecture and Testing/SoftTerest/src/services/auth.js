const userNav = {
    dashboard: document.querySelector('a[href="/dashboard"]'),
    create: document.querySelector('a[href="/create"]'),
    logout: document.querySelector('a[href="/logout"]'),
}

const guestNav = {
    dashboard: document.querySelector('a[href="/dashboard"]'),
    login: document.querySelector('a[href="/login"]'),
    register: document.querySelector('a[href="/register"]'),
}


export function updateAuth() {

    const user = getUser();

    hideNavigations();

    if (user) {
        showNavigation(userNav);
    } else {
        showNavigation(guestNav);
    };
}


export function getUserToken() {
    return getUser()?.accessToken;
}

export function getUserId() {
    return getUser()?._id;
}

export function getUser() {

    const user = localStorage.getItem('user');
    return JSON?.parse(user);
}

export function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function logout() {
    localStorage.clear();
    updateAuth();
}


export function hideContent() {

    const divElements = document.querySelector('body').children;

    for (let i = 1; i < divElements.length - 1; i++) {
        divElements[i].style.display = 'none';
    }
}

function showNavigation(navigation) {

    for(let a in navigation) {
        navigation[a].style.display = 'block';
    };
}


function hideNavigations() {

    for(let a in userNav) {
        userNav[a].style.display = 'none';
    }

    for(let a in guestNav) {
        guestNav[a].style.display = 'none';
    }
}

