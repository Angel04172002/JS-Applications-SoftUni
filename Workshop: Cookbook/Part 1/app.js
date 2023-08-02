const baseUrl = 'http://localhost:3030';



window.addEventListener('load', () => {

    fetch(`${baseUrl}/jsonstore/cookbook/recipes`)
        .then(res => res.json())
        .then(recipes => {
            renderRecipes(Object.values(recipes));
        })
        .catch(err => console.log(err));
});


function renderRecipes(recipes) {

    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';

    for (let item of recipes) {
        const recipe = createRecipe(item);
        mainElement.appendChild(recipe);
    };
}

function createRecipe(recipe) {

    const previewArticle = article(
        { class: 'preview' },
        div(
            { class: 'title' },
            createElement('h2', {}, recipe.name)
        ),
        div(
            { class: 'small' },
            img(
                { src: recipe.img }
            ),
        ),
    );

    previewArticle.addEventListener('click', (e) => {

        const currentElement = e.currentTarget;

        fetch(`${baseUrl}/jsonstore/cookbook/details/${recipe._id}`)
            .then(res => res.json())
            .then(recipe => {
                
                const mainArticle = renderDetais(recipe);
                currentElement.innerHTML = mainArticle.innerHTML;
            })
            .catch(err => console.log(err));
    });

    return previewArticle;
}



function div(props, ...data) {
    return createElement('div', props, ...data);
}

function article(props, ...data) {
    return createElement('article', props, ...data);
}

function img(props) {
    return createElement('img', props);
}

function ul(props, ...data) {
    return createElement('ul', props, ...data)
}

function li(...data) {
    return createElement('li', {}, ...data)
}
function p(...data) {
    return createElement('p', {}, ...data)
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

        if (typeof entry === 'number' || typeof entry === 'string') {
            entry = document.createTextNode(entry);
        };

        element.appendChild(entry);
    }

    return element;
}

function renderDetais(recipe) {
    const mainArticle = article(
        {},
        createElement('h2', {}, `${recipe.name}`),
        div (
            {class: 'band'},
            div(
                {class: 'thumb'},
                img(
                    {src: `${recipe.img}`}
                ),
            ),

            div(
                {class: 'ingredients'},
                createElement('h3', {}, 'Ingredients:'),
                ul(
                    {},
                    li(`${recipe.ingredients[0]}`),
                    li(`${recipe.ingredients[1]}`),
                    li(`${recipe.ingredients[2]}`),
                    li(`${recipe.ingredients[3]}`),
                ),
            ),
        ),

        div(
            {class: 'description'},
            createElement('h3', {}, 'Preparation:'),
            p(`${recipe.steps[0]}`),
            p(`${recipe.steps[1]}`),
            p(`${recipe.steps[2]}`),
        ),
    );

    return mainArticle;
}
