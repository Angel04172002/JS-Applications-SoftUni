const homeSection = [...document.querySelectorAll('body > .container')][0];

export function renderHome() {
    homeSection.style.display = 'block';
}