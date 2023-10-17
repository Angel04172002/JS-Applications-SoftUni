import * as authService from "../services/auth.js";


function img(props) {
    return createElement('img', props);
}

function a(props, ...data) {
    return createElement('a', props, ...data);
}

function div(props, ...data) {
    return createElement('div', props, ...data);
}

function p(props, ...data) {
    return createElement('p', props, ...data);
}

function h2(props, ...data) {
    return createElement('h2', props, ...data);
}

function createElement(type, props, ...data) {

    const element = document.createElement(type);

    for (let prop in props) {

        if (prop === 'class') {
            element.classList.add(...props[prop].split(' '));
            continue;
        }

        element[prop] = props[prop];
    }

    for (let entry of data) {

        if (typeof entry === 'string' || typeof entry === 'number') {
            entry = document.createTextNode(entry);
        }

        element.appendChild(entry);
    }

    return element;
}


export function createNewIdeaPost(idea) {

    let isDisabled = idea._ownerId === authService.getUserId() ? false : true;

    return div({
        class: 'card overflow-hidden current-card details',
        style: 'width: 20 rem; height: 18 rem;'
    },
        div(
            { class: 'card-body' },
            p({ class: 'card-text' }, idea.title)
        ),
        img({ class: 'card-image', src: idea.image, alt: 'Card image cap' }),
        a({ className: 'btn', href: `#`, id: idea._id, style: `${isDisabled ? 'display: none' : 'display: block'}`}, 'Details')
    );
}



export function createPostDetails(idea) {

    let isDisabled = idea._ownerId === authService.getUserId() ? false : true;

    return div(
        { class: 'container home some' },
        img(
            { class: 'det-img', src: idea.image }
        ),
        div(
            { class: 'desc' },
            h2({ className: 'display-5' }, idea.title),
            p({ class: 'infoType' }, 'Description:'),
            p({ class: 'idea-description' }, idea.description),
        ),
        div(
            { class: 'text-center' },
            a({ class: 'btn detb', href: '#', disabled: isDisabled, id: idea._id, style: `${isDisabled ? 'display: none' : 'display: block'}`},
                'Delete'
            ),
        ),
    );

}
