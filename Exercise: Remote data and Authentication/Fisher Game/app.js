import { updateAuth, getToken, updateSpan } from "./auth.js";
import * as creator from './creator.js';

const baseUrl = 'http://localhost:3030/data/catches';

const homeBtn = document.getElementById('home');
const mainElement = document.querySelector('#catches');

const createBtn = document.querySelector('button.add');
const loadBtn = document.querySelector('button.load');
const logoutBtn = document.getElementById('logout');

const getInputElements = (target) => ({
    anglerInputElement: target.querySelector('input.angler'),
    weightInputElement: target.querySelector('input.weight'),
    speciesInputElement: target.querySelector('input.species'),
    locationInputElement: target.querySelector('input.location'),
    baitInputElement: target.querySelector('input.bait'),
    captureTimeInputElement: target.querySelector('input.captureTime'),
});


updateAuth();
updateSpan();

logoutBtn.addEventListener('click', async (e) => {

    e.preventDefault();

    const response = await fetch('http://localhost:3030/users/logout', {
        headers: {
            'X-Authorization': user.accessToken
        },
    });

    localStorage.clear();


    updateAuth();
    updateSpan();
    showCatches();

    homeBtn.click();
});


loadBtn?.addEventListener('click', showCatches);
createBtn?.addEventListener('click', createCatch);
//mainElement?.addEventListener('click', makeOperation);


export async function showCatches(e) {

    e && e.preventDefault();

    const response = await fetch(baseUrl);
    const data = await response.json();

    mainElement.replaceChildren(...data.map(creator.newCatch));
    mainElement?.addEventListener('click', makeOperation);
}


async function createCatch(e) {


    e.preventDefault();

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': getToken()
        },
        body: JSON.stringify(getRequestData(e))
    });


    resetForm(e);
    showCatches();
}


async function updateCatch(e) {

    e.preventDefault();

    try {

        if (Object.values(getInputElements(e.currentTarget.parentNode)).some(x => x === '')) {
            throw new Error('All fields must be filled!');
        };

        const response = await fetch(`${baseUrl}/${e.target['data-id']}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': getToken()
            },
            body: JSON.stringify(getRequestData(e))
        });

        const data = await response.json();

        showCatches();
    } catch (e) {
        alert(e.message);
    }
}


async function deleteCatch(e) {

    e.preventDefault();

    try {

        const response = await fetch(`${baseUrl}/${e.target['data-id']}`, {
            method: 'DELETE',
            headers: {
                'X-Authorization': getToken()
            },
        });

        showCatches();

    } catch(e) {
        alert(e.message);
    }
}


function makeOperation(e) {

    e.preventDefault();

    const text = e.target.textContent;

    if (text === 'Update') {
        updateCatch(e);
    } else if (text === 'Delete') {
        deleteCatch(e);
    };

}


function getRequestData(e) {


    const inputElements = getInputElements(e.target.parentNode);

    return {
        angler: inputElements.anglerInputElement.value,
        weight: inputElements.weightInputElement.value,
        species: inputElements.speciesInputElement.value,
        location: inputElements.locationInputElement.value,
        bait: inputElements.baitInputElement.value,
        captureTime: inputElements.captureTimeInputElement.value
    };
}


function resetForm(e) {

    const inputElements = getInputElements(e.target.parentNode);

    inputElements.anglerInputElement.value = '';
    inputElements.weightInputElement.value = '';
    inputElements.speciesInputElement.value = '';
    inputElements.locationInputElement.value = '';
    inputElements.baitInputElement.value = '';
    inputElements.captureTimeInputElement.value = '';

}
