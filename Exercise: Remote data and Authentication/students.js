const url = 'http://localhost:3030/jsonstore/collections/students';


const firstNameInputElement = document.querySelector('input[name="firstName"]');
const lastNameInputElement = document.querySelector('input[name="lastName"]');
const facultyNumberInputElement = document.querySelector('input[name="facultyNumber"]');
const gradeInputElement = document.querySelector('input[name="grade"]');
const submitBtnElement = document.getElementById('submit');
const resultTable = document.querySelector('#results tbody');

submitBtnElement.addEventListener('click', createRow);


async function solve() {

    const response = await fetch(url);
    const data = await response.json();

    resultTable.innerHTML = '';

    Object.values(data).forEach(({ firstName, lastName, facultyNumber, grade, _id }) => {

        const tableRow = tr(
            {},
            td({}, firstName),
            td({}, lastName),
            td({}, facultyNumber),
            td({}, grade)
        );

        tableRow._id = _id;
        resultTable.appendChild(tableRow);
    });

}

async function createRow() {

    if (firstNameInputElement.value === '' || lastNameInputElement.value === '' ||
        facultyNumberInputElement.value === '' || gradeInputElement.value === '') {
        return;
    };

    await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstNameInputElement.value,
            lastName: lastNameInputElement.value,
            facultyNumber: facultyNumberInputElement.value,
            grade: gradeInputElement.value,
        })
    });

    solve();
}


function tr(props, ...data) {
    return createElement('tr', props, ...data);
}

function td(props, ...data) {
    return createElement('td', props, ...data);
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


    for (let entry of data) {

        if (typeof entry === 'number' || typeof entry === 'string') {
            entry = document.createTextNode(entry);
        };

        element.appendChild(entry);
    };

    return element;
}


solve();

