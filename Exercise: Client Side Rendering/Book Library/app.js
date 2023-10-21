import { html, render } from "../node_modules/lit-html/lit-html.js";


const url = 'http://localhost:3030/jsonstore/collections/books';


const body = document.body;
const formElement = document.getElementById('form');

update([]);


function setOnEditToFalse(data) {

    Object.values(data).forEach(x => x.onEditClick = false);

}


async function getAllBooksAndUpdate() {

    const response = await getAllBooks();
    setOnEditToFalse(response);
    update(response);
}

async function getAllBooks() {
    const response = await fetch(url);
    return response.json();
}


async function createNewBook(e) {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const author = formData.get('author');
    const title = formData.get('title');
    

    await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            author: author,
            title: title
        }),
    });

    update(await getAllBooks());
}


async function updateBook(book, id) {

    await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            author: book.author,
            title: book.title
        }),
    });

}



async function onEditClick(e) {

    e.preventDefault();

    const response = await getAllBooks();
    setOnEditToFalse(response);

    const id = e.target.parentNode.parentNode.id;
    const clickedBook = Object.entries(response).find(([key, value]) => key == id);

    clickedBook[1].onEditClick = true;

    update(response);
}

async function saveBook(e) {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const author = formData.get('author');
    const title = formData.get('title');

    const id = e.currentTarget.querySelector('input[type="number"]').id;
    await updateBook({author: author, title: title}, id);

    update(await getAllBooks());

}


function update(books = []) {

    render(mainTemplate({ books: Object?.entries(books), getAllBooks: getAllBooksAndUpdate }), body);
}


function mainTemplate(ctx) {



    const isFoundBook = ctx.books.find((x) => x[1].onEditClick == true);

    ctx.isFoundBook = undefined;


    if (isFoundBook !== undefined) {
        ctx.isFoundBook = isFoundBook;
    };


    return html`    
        <button id="loadBooks" @click = ${ctx.getAllBooks}>LOAD ALL BOOKS</button>
        ${booksTemplate(ctx)}
    `;
}


function booksTemplate(ctx) {


    return html` 
    
            ${ctx.books.length > 0
            ?
            displayBooksTemplate(ctx)
            :
            ''
            }
            
    `
}

function displayBooksTemplate(ctx) {
    return html`
    <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>

                ${ctx.books.map(([key, value]) => singleBookTemplate({ key, title: value.title, author: value.author }))}

            
            </tbody>
    </table>

    ${ctx.isFoundBook
            ?
            editFormTemplate(ctx.isFoundBook)
            :
            createFormTemplate()
        }
    `
}


function singleBookTemplate(x) {


    return html`  

        <tr id = ${x.key}>
            <td>${x.title}</td>
            <td>${x.author}</td>
            <td>
                <button @click = ${onEditClick}>Edit</button>
                <button>Delete</button>
            </td>
        </tr>
    `;
}



function createFormTemplate() {
    return html`
        <form id="create-form" @submit = ${createNewBook}>
            <input type="hidden" name="id">
            <h3>Add book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title...">
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author...">
            <input type="submit" value="Submit">
        </form> 
    `
}


function editFormTemplate(book) {

    const result = html` 
        <form id="edit-form" style = "display: block" @submit = ${saveBook}>
            <input type="hidden" name="id">
            <h3>Edit book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="${book[1].title}"
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="${book[1].author}">
            <input type="submit" value="Save">
            <input type = "number" style = "display: none" id = "${book[0]}">
        </form> 
    `;


    return result;
}
