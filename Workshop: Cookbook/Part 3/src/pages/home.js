const homeSection = document.querySelector('.home');
const recipeList = homeSection.querySelector('.recipe-list');
const url = 'http://localhost:3030/data/recipes '

export function renderHome() {

    fetch(url)
        .then(res => res.json())
        .then(recipes => {
            renderRecipes(Object.values(recipes));
            homeSection.style.display = 'block';
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
    const recipeElement = article(
        {class: 'preview'},
        div(
            {class: 'title'},
            heading(2, {}, `${recipe.name}`)
        ),
        div(
            {class: 'small'},
            img(
                {src: `${recipe.img}`}
            ),
        ),
    );

    return recipeElement;
}

function article(props, ...data) {
    return createElement('article', props, ...data);
}

function div(props, ...data) {
    return createElement('div', props, ...data);
}
function img(props, ...data) {
    return createElement('img', props, ...data);
}
function heading(number, props, ...data) {
    return createElement(`h${number}`, props, ...data);
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

 


{/* <article class="preview">
    <div class="title">
        <h2>Title</h2>
    </div>
    <div class="small">
        <img src="assets/lasagna.jpg">
    </div>
</article>
<article class="preview">
    <div class="title">
        <h2>Title</h2>
    </div>
    <div class="small">
        <img src="assets/lasagna.jpg">
    </div>
</article>
<article class="preview">
    <div class="title">
        <h2>Title</h2>
    </div>
    <div class="small">
        <img src="assets/lasagna.jpg">
    </div>
</article>  */}