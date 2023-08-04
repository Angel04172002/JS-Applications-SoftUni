const guestNavigation = document.querySelector('#guest');
const userNavigation = document.querySelector('#user');


export function updateAuth() {

    let serialiazedUser = localStorage.getItem('user');

    if (serialiazedUser) {

        userNavigation.style.display = 'block';
        guestNavigation.style.display = 'none';

    } else {

        guestNavigation.style.display = 'block';
        userNavigation.style.display = 'none';
    }
}

export function logout() {

    updateAuth();
    localStorage.clear();
}

export function getToken() {

    let serialiazedUser = localStorage.getItem('user');

    if(serialiazedUser) {
        let user = JSON.parse(serialiazedUser);
        return user.accessToken;
    }
}
