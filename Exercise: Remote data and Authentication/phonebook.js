function attachEvents() {

    const baseUrl = 'http://localhost:3030/jsonstore/phonebook';
    const phonebookList = document.getElementById('phonebook');
    const loadBtnElement = document.getElementById('btnLoad');
    const createBtnElement = document.getElementById('btnCreate');

    loadBtnElement.addEventListener('click', loadEntries);
    createBtnElement.addEventListener('click', createEntry);


    async function loadEntries() {

        const response = await fetch(baseUrl);
        const data = await response.json();
        phonebookList.innerHTML = '';

        Object.values(data).forEach(x => {

            const liElement = document.createElement('li');
            const deleteBtn = document.createElement('button');

            deleteBtn.textContent = '[Delete]';
            deleteBtn.id = 'deleteBtn';
            liElement.textContent = `${x.person}: ${x.phone}`;
            liElement.id = x._id;

            deleteBtn.addEventListener('click', deleteEntry);

            liElement.appendChild(deleteBtn);
            phonebookList.appendChild(liElement);
        });
    }


    async function deleteEntry(e) {

        const parentElement = e.currentTarget.parentNode;
        e.currentTarget.parentNode.remove();

        await fetch(`${baseUrl}/${parentElement.id}`, {
            method: 'DELETE'
        });

    }

    async function createEntry() {

        const personInputElement = document.getElementById('person');
        const phoneInputElement = document.getElementById('phone');

        if(personInputElement.value === '' || phoneInputElement === '') {
            return;
        };

        await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                person: personInputElement.value,
                phone: phoneInputElement.value
            })
        });

        loadBtnElement.click();

        personInputElement.value = '';
        phoneInputElement.value = '';

    }
}

attachEvents();
