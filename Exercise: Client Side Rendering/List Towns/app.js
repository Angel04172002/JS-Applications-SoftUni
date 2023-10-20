import { html, render } from "../node_modules/lit-html/lit-html.js";

const rootElement = document.getElementById('root');
const loadBtn = document.getElementById('btnLoadTowns');
const townsInputElement = document.getElementById('towns');

const listTemplate = (towns) => html`  
        <ul>
            ${towns.map(t => html`<li>${t}</li>`)};
        </ul>`;

loadBtn.addEventListener('click', loadTowns);

function loadTowns(e) {

    e.preventDefault();

    if(townsInputElement.value === '') {
        return;
    };

    const towns = townsInputElement.value.split(', ');

    update(towns);
}

function update(towns) {
    
    const result = listTemplate(towns);
    render(result, rootElement);
}
    


