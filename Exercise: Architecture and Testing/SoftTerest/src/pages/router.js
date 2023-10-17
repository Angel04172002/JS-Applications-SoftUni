import { renderDashBoard } from "./dashboard.js";
import { renderCreate } from "./create.js";
import { renderLogin } from "./login.js";
import { renderRegister } from "./register.js";
import { renderLogout } from "./logout.js";
import { render404 } from "./404.js";
import { renderHome } from "./home.js";
import { hideContent } from "../services/auth.js";



const routes = {
    '/': renderHome,
    '/dashboard': renderDashBoard,
    '/create': renderCreate,
    '/home': renderHome,
    '/login': renderLogin,
    '/register': renderRegister,
    '/logout': renderLogout,
};

export function router(path) {

    hideContent();

    const renderer = routes[path] || render404;

    renderer();
}


