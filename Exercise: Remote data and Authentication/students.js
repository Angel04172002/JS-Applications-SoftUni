const url = 'http://localhost:3030/jsonstore/collections/students';
const submitButtonElement = document.getElementById('submit');
submitButtonElement.addEventListener('click', displayData);


async function displayData(e) {

    e.preventDefault();

    const tableBody = document.querySelector('#results tbody');
    const firstNameInputElement = document.querySelector('.inputs input[name="firstName"]');
    const lastNameInputElement = document.querySelector('.inputs input[name="lastName"]');
    const facultyNumberInputElement = document.querySelector('.inputs input[name="facultyNumber"]');
    const gradeInputElement = document.querySelector('.inputs input[name="grade"]');

    const response = await fetch(url, {
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

    if(response.status !== 200) {
        return;
    };

    const data = await response.json();

    const trElement = document.createElement('tr');
    const dataKeys = Object.keys(data);

    dataKeys.map((x, i) => {

        if(i === dataKeys.length - 1) {
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


