//For auth middleware
export const getUser = () => {
    let user = localStorage.getItem('user');

    if (user) {
        let parsedUser = JSON.parse(user);
        return parsedUser;
    }
}


export const deleteUser = () => {
    localStorage.removeItem('user');
};

//Helper methods
export const saveUser = (user) => {
    if (user.accessToken) {
        localStorage.setItem('user', JSON.stringify(user));
    }
};

export const getToken = () => {
    return getUser()?.accessToken;
}