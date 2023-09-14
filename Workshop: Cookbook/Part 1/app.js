const url = 'http://localhost:3030/jsonstore/cookbook/recipes';
const detailsUrl = 'http://localhost:3030/jsonstore/cookbook/details';


window.onload = function () {

    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderRecipes(Object.values(data));
        })
        .catch(err => console.log(err));
};


function renderRecipes(recipes) {

    const mainElement = document.querySelector('main');

    mainElement.innerHTML = '';

    recipes.forEach(recipe => {
        mainElement.appendChild(createRecipe(recipe));
    });

    mainElement.addEventListener('click', showMoreInfo);
}


function createRecipe(recipe) {

    return article(
        { class: 'preview', _id: recipe._id },
        div(
            { class: 'title' },
            heading(2, {}, `${recipe.name}`)
        ),
        div(
            { class: 'small' },
            img({ src: `${recipe.img}` })
        ),
    );
}

function showMoreInfo(e) {

    if (e.target.tagName !== 'ARTICLE') {
        return;
    };

    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';

    fetch(`${detailsUrl}/${e.target._id}`)
        .then(res => res.json())
        .then(data => {
            mainElement.appendChild(renderDetails(data));
        })
        .catch(err => console.log(err))
}


function renderDetails(details) {

    return article(
        {},
        heading(2, {}, details.name),
        div(
            { class: 'band' },
            div(
                { class: 'thumb' },
                img({ src: details.img })
            ),
            div(
                {class: 'ingredients'},
                heading(3, {}, 'Ingredients:'),
                listElement('ul', details.ingredients.length, {}, ...details.ingredients)
            ),
        ),
        div(
            {class: 'description'},
            heading(3, {}, 'Preparation:'),
            ...(details.steps.map(x => p({}, x)))
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
    };

    if(data[0] === null) {
        return element;
    };

    for (let entry of data) {

        if (typeof entry === 'number' || typeof entry === 'string') {
            entry = document.createTextNode(entry);
        };

        element.appendChild(entry);
    };

    return element;
}


function article(props, ...data) {
    return createElement('article', props, ...data);
}
function div(props, ...data) {
    return createElement('div', props, ...data);
}
function p(props, ...data) {
    return createElement('p', props, ...data);
}
function heading(number, props, ...data) {
    return createElement(`h${number}`, props, ...data);
}
function img(props, ...data) {
    return createElement('img', props, ...data);
}

function listElement(type, numberOfLi, props, ...data) {

    const listEl = createElement(type, props, null);

    for (let i = 0; i < numberOfLi; i++) {
        listEl.appendChild(createElement('li', {}, data[i]));
    }

    return listEl;

}
