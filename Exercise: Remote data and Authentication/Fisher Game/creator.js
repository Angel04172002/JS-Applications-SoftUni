import { getUser, getUserId } from "./auth.js";

function div(props, ...data) {
    return createElement('div', props, ...data);
}

function label(props) {
    return createElement('label', props);
}

function input(props) {
    return createElement('input', props);
}


function button(props, ...data) {
    return createElement('button', props, ...data);
}

function createElement(type, props, ...data) {

    const element = document.createElement(type);

    for (let prop in props) {

        if (prop === 'class') {
            element.classList.add(props[prop]);
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

export function newCatch(obj) {

    updateSpan();


    const isDisabled = obj._ownerId === getUserId() ? false : true;

    const result = div(

        { className: 'catch'},

        label('Angler'),
        input({type: 'text', class: 'angler', disabled: isDisabled, value: obj.angler}),

        label('Weight'),
        input({type: 'text', class: 'weight', disabled: isDisabled, value: obj.weight}),

        label('Species'),
        input({type: 'text', class: 'species', disabled: isDisabled, value: obj.species}),

        label('Location'),
        input({type: 'text', class: 'location', disabled: isDisabled, value: obj.location}),

        label('Bait'),
        input({type: 'text', class: 'bait', disabled: isDisabled, value: obj.bait}),

        label('Capture Time'),
        input({type: 'text', class: 'captureTime', disabled: isDisabled, value: obj.captureTime}),

        button({class: 'update', 'data-id': obj._id, disabled: isDisabled}, 'Update'),
        button({class: 'delete', 'data-id': obj._id, disabled: isDisabled}, 'Delete'),
    );

    return result;
}

function updateSpan() {

    const spanElement = document.querySelector('nav span');
    const user = getUser();

    if(user) {
        spanElement.textContent = user.email;
    }  else {
        spanElement.textContent = 'guest';
    }
}


