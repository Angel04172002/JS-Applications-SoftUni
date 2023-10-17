import { router } from "./pages/router.js";
import { updateAuth } from "./services/auth.js";


const navElement = document.querySelector('.navbar');

updateAuth();
router('/');


navElement.addEventListener('click', (e) => {

    e.preventDefault();

    let target = e.target;
    const targetTagname = e.target.tagName;

    if(targetTagname === 'IMG') {
        target = e.target.parentNode;
    };

    if(target.tagName === 'A') {

        const url = new URL(target.href);
        router(url.pathname);
    };
})