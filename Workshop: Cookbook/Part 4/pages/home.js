import { getAllRecipes } from "../api.js";

const url = 'http://localhost:3030/data/recipes';
const homeSection = document.querySelector('.home');
const recipeList = homeSection.querySelector('.recipeList');


export function renderHome() {

    getAllRecipes()
        .then(recipes => {
            renderRecipes(recipes);
            homeSection.style.display = 'block';
            recipeList.style.display = 'block';
        });
}


function renderRecipes(recipes) {

    const fragment = document.createDocumentFragment();

    recipes.forEach(x => {
        fragment.appendChild(renderRecipe(x));
    });

    recipeList.innerHTML = '';
    recipeList.appendChild(fragment);
}


function renderRecipe(recipe) {

    return article(
        { class: 'preview' },
        div(
            { class: 'title' },
            h2(
                `${recipe.name}`
            ),
        ),
        div(
            { class: 'small' },
            img(
                { src: `${recipe.img}` }
            ),
        ),
    );
}

function createElement(type, props, ...data) {

    const element = document.createElement(type);

    for (let prop in props) {

        if (prop === 'class') {
            element.classList.add(props[prop]);
            continue;
        };

        element[prop] = props[prop];
    }

    for (let entry of data) {

        if (typeof entry === 'string' || typeof entry === 'number') {
            entry = document.createTextNode(entry);
        };

        element.appendChild(entry);
    }

    return element;
}

function article(props, ...data) {
    return createElement('article', props, ...data);
}
function div(props, ...data) {
    return createElement('div', props, ...data);
}

function h2(...data) {
    return createElement('h2', {}, ...data)
}

function img(props) {
    return createElement('img', props);
}





