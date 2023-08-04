const url = 'http://localhost:3030/jsonstore/collections/students';

async function solve() {

    const submitButtonElement = document.getElementById('submit');
    const tableBody = document.querySelector('#results tbody');

    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(x => {

        let { firstName, lastName, facultyNumber, grade } = x;
        grade = Number(grade);

        const trElement = document.createElement('tr');

        const firstNameTdElement = document.createElement('td');
        const lastNameTdElement = document.createElement('td');
        const facultyNumberTdElement = document.createElement('td');
        const gradeTdElement = document.createElement('td');

        firstNameTdElement.textContent = firstName;
        lastNameTdElement.textContent = lastName;
        facultyNumberTdElement.textContent = facultyNumber;
        gradeTdElement.textContent = grade;

        trElement.appendChild(firstNameTdElement);
        trElement.appendChild(lastNameTdElement);
        trElement.appendChild(facultyNumberTdElement);
        trElement.appendChild(gradeTdElement);

        tableBody.appendChild(trElement);
    });

    submitButtonElement.addEventListener('click', displayData);
}




async function displayData(e) {

    e.preventDefault();

    const firstNameInputElement = document.querySelector('.inputs input[name="firstName"]');
    const lastNameInputElement = document.querySelector('.inputs input[name="lastName"]');
    const facultyNumberInputElement = document.querySelector('.inputs input[name="facultyNumber"]');
    const gradeInputElement = document.querySelector('.inputs input[name="grade"]');

    if(isNaN(facultyNumberInputElement.value) || isNaN(gradeInputElement.value)) {
        return alert('Wrong input data');
    };

    if(firstNameInputElement.value === '' || lastNameInputElement.value === '' || facultyNumberInputElement.value === '' || gradeInputElement.value === '') {
        return;
    };

    const tableBody = document.querySelector('#results tbody');

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstNameInputElement.value,
            lastName: lastNameInputElement.value,
            facultyNumber: Number(facultyNumberInputElement.value),
            grade: Number(gradeInputElement.value)
        })
    });


    const data = await response.json();

    const trElement = document.createElement('tr');
    const dataKeys = Object.keys(data);

    dataKeys.map((x, i) => {

        if (i === dataKeys.length - 1) {
            return;
        };

        return data[dataKeys[i]];
    }).forEach(x => {

        const tdElement = document.createElement('td');
        tdElement.textContent = x;
        trElement.appendChild(tdElement);
    });

    tableBody.appendChild(trElement);

    firstNameInputElement.value = '';
    lastNameInputElement.value = '';
    facultyNumberInputElement.value = '';
    gradeInputElement.value = '';
}



solve();


