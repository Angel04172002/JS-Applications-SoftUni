import { showHome } from "./home.js";


const homeBtn = document.querySelector('header nav a');


homeBtn.addEventListener('click', showHome);

showHome();
