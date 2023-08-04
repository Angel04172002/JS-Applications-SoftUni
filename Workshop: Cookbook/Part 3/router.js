import { renderHome } from "./pages/home.js";
import { renderLogin } from "./pages/login.js";
import { renderRegister } from "./pages/register.js";
import { render404 } from "./pages/404.js";
import { renderCreate } from "./pages/create.js";
import { renderLogout } from "./pages/logout.js";

const routes = {
    '/': renderHome,
    '/login': renderLogin,
    '/register': renderRegister,
    '/create': renderCreate,
    '/logout': renderLogout
};

export function router(path) {

    hideContent();

    const renderer = routes[path] || render404;
    renderer();
}


function hideContent() {

    const main = document.querySelector('.home');

    for (const section of main.children) {
        section.style.display = 'none';
    };
}
