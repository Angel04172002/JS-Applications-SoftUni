import { html, render } from "../node_modules/lit-html/lit-html.js";

const body = document.body;
const url = 'http://localhost:3030/jsonstore/advanced/dropdown';


async function addItem(e) {

    e.preventDefault();

    const inputValue = e.currentTarget.querySelector('input[type="text"]');

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ text: inputValue.value })
    });

    if (!response.ok) {
        return;
    };

    inputValue.value = '';

    update(await getRemoteData());

}


update(await getRemoteData());


function update(data) {

    render(dropdownTemplate(Object.values(data)), body);
}


async function getRemoteData() {

    const response = await fetch(url);
    return response.json();
}


function dropdownTemplate(data) {

    console.log(data);

    return html` 
        <article>
            <div>
                <select id="menu">

                ${data.map(x => optionTemplate(x))}

                </select>
            </div>
            <form @submit = ${addItem}>
                <label for="itemText">
                    Text:
                </label>
                <input type="text" id="itemText" />
                <input type="submit" value="Add">
            </form>
        </article>
    `

}

function optionTemplate(info) {
    return html`   
        <option value = ${info._id}>
            ${info.text}
        </option>
    `
}
