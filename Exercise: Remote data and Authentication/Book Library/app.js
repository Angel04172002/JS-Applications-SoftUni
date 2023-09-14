const url = 'http://localhost:3030/jsonstore/collections/books';
const tbody = document.querySelector('tbody');


const saveBtn = document.getElementById('save');

const titleInputElement = document.querySelector('#general input[name="title"]');
const authorInputElement = document.querySelector('#general input[name="author"]');

const titleEditInputElement = document.querySelector('#edit input[name="title"]');
const authorEditInputElement = document.querySelector('#edit input[name="author"]');

const generalNav = document.getElementById('general');
const editNav = document.getElementById('edit');
const body = document.querySelector('body');

const loadBtn = document.getElementById('loadBooks');
const submitBtn = document.getElementById('submit');
const mainForm = document.querySelector('form');

editNav.style.display = 'none';

function attachEvents() {

    loadBtn.addEventListener('click', loadBooks);
    submitBtn.addEventListener('click', createBook);
}

async function getBookById(id) {

    const response = await fetch(`${url}/${id}`);

    return await response.json();
}

async function getAllBooks(url) {
    const response = await fetch(url);
    return await response.json();
}


function createStructure(data = [])  {

    generalNav.style.display = 'block';
    editNav.style.display = 'none';

    const tbody = createTbody({});

    const tableEl = table(
        {},
        thead(
            {},
            tr(
                {},
                th({}, 'Title'),
                th({}, 'Author'),
                th({}, 'Action')
            ),
        ),
        tbody
    );


    if (Array.from(body.children).some(x => x.tagName === 'TABLE')) {
        body.children[1].remove();
    };


    Object.entries(data).forEach((x) => {

        const _id = x[0];
        const { title, author } = x[1];

        const editBtn = button({}, 'Edit');
        const deleteBtn = button({}, 'Delete');


        const tableRow = tr(
            {},
            td({}, title),
            td({}, author),
            td(
                {},
                editBtn,
                deleteBtn
            ),
        );

        tableRow._id = _id;
        tbody.appendChild(tableRow);
    });

    tbody.addEventListener('click', makeOperation);
    tableEl.appendChild(tbody);

    body.appendChild(tableEl);
    body.replaceChild(tableEl, loadBtn);
    body.prepend(loadBtn);
}


async function loadBooks(e) {

    e.preventDefault();

    const data = await getAllBooks(url);

    createStructure(data);

}

async function createBook(e) {

    e.preventDefault();


    if (titleInputElement.value === '' || authorInputElement.value === '') {
        alert('Fields must be filled!');
        return;
    };

    await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            title: titleInputElement.value,
            author: authorInputElement.value
        })
    });

    titleInputElement.value = '';
    authorInputElement.value = '';

    createStructure(await getAllBooks(url));
}


async function makeOperation(e) {

    e.preventDefault();

    if (e.target.tagName !== 'BUTTON') {
        return;
    };

    const id = e.target.parentNode.parentNode._id;
    const btnText = e.target.textContent;

    if (btnText === 'Edit') {
        await editBook(e, id);
    } else if (btnText === 'Delete') {
        await deleteBook(e, id);
    };
}


async function deleteBook(e, id) {

    e.preventDefault();

    await fetch(`${url}/${id}`, {
        method: 'DELETE'
    });

    createStructure(await getAllBooks(url));
}


async function editBook(e, id) {

    e.preventDefault();

    editNav.style.display = 'block';
    generalNav.style.display = 'none';

    const currentBook = await getBookById(id);

    titleEditInputElement.value = currentBook.title;
    authorEditInputElement.value = currentBook.author;

    saveBtn._id = id;
    saveBtn.addEventListener('click', saveBook);
}

async function saveBook(e) {

    e.preventDefault();

    const id = e.target._id;

    await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            author: authorEditInputElement.value,
            title: titleEditInputElement.value
        })
    });


    const data = await getAllBooks(url);
    createStructure(data);
}


function td(props, ...data) {
    return createElement('td', props, ...data)
}

function tr(props, ...data) {
    return createElement('tr', props, ...data)
}
function th(props, ...data) {
    return createElement('th', props, ...data)
}

function table(props, ...data) {
    return createElement('table', props, ...data);
}

function thead(props, ...data) {
    return createElement('thead', props, ...data)
}
function createTbody(props, ...data) {
    return createElement('tbody', props, ...data)
}

function button(props, ...data) {
    return createElement('button', props, ...data)
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

attachEvents();
