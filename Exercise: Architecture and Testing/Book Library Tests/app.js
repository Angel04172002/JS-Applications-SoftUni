const url = 'http://localhost:3030/jsonstore/collections/books';
const loadBtnElement = document.getElementById('loadBooks');

const editBtnElement = document.getElementById('edit');
const deleteBtnElement = document.getElementById('delete');
const submitBtnElement = document.getElementById('submit');

const formElement = document.querySelector('form');
const h3Element = document.querySelector('form h3');

const title = document.querySelector('form input[name="title"]');
const author = document.querySelector('form input[name="author"]');
const tbodyElement = document.querySelector('table tbody');


loadBtnElement.addEventListener('click', loadBooks);
formElement.addEventListener('submit', createNewBook);

async function loadBooks(e) {

    e.preventDefault();

    h3Element.textContent = 'FORM';
    submitBtnElement.textContent = 'Submit';
    tbodyElement.innerHTML = '';

    const response = await fetch(url);
    const data = await response.json();


    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    deleteBtn.textContent = 'Delete';

    Object.values(data).forEach(x => {

        const { author, title } = x;

        const trEl = tr(
            {},
            td(`${author}`),
            td(`${title}`),
            td(editBtn.cloneNode(true), deleteBtn.cloneNode(true))
        );

        tbodyElement.appendChild(trEl);
    });
}



async function editBook(e) {

    e.preventDefault();

    h3Element.textContent = 'Edit FORM';
    submitBtnElement.textContent = 'Save';
    

    submitBtnElement.addEventListener('click', async (e) => {

        const editBtn = e.currentTarget.parentNode.previousElementSibling;

        await fetch(`${url}/${currentElement._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                author: author.value,
                title: title.value
            })
        });

        loadBtnElement.click();
    });
}


async function createNewBook(e) {

    e.preventDefault();


    if (title.value === '' || author.value === '') {
        return;
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            author: author.value,
            title: title.value
        })
    });

    if (response.status !== 200) {
        return;
    };

    const data = await response.json();


    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    deleteBtn.textContent = 'Delete';

    const trElement = tr(
        {},
        td(`${data.title}`),
        td(`${data.author}`),
        td(editBtn, deleteBtn)
    );

    tbodyElement.appendChild(trElement);

    editBtn.bookId = data._id;
    editBtn.addEventListener('click', editBook);

    // deleteBtn.addEventListener('click', () => {

    //     fetch(`${url}/${data._id}`, {
    //         method: 'DELETE'
    //     });

    //     location.reload();
    // });

    title.value = '';
    author.value = '';

}


function td(...data) {
    return createElement('td', {}, ...data)
}

function tr(props, ...data) {
    return createElement('tr', props, ...data)
}

function button(props, ...data) {
    return createElement('button', props, ...data)
}


function createElement(type, props, ...data) {
    const element = document.createElement(type);

    for (let prop in props) {

        if (prop === 'class') {
            element.classList.add(props[prop]);
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
