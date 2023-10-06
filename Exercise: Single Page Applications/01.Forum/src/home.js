
import { createPostComponent } from "./creator.js";
import { showDetails } from "./details.js";

const postUrl = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const mainElement = document.querySelector('#main');
const homeSection = document.getElementById('home-view');

const postContainer = homeSection.querySelector('div.topic-title');
const cancelBtn = homeSection.querySelector('button.cancel');
const formElement = homeSection.querySelector('.new-topic-border form');

formElement.addEventListener('submit', createPost);
cancelBtn.addEventListener('click', resetForm);
postContainer.addEventListener('click', showDetails);

homeSection.remove();


function resetForm() {
    formElement.reset();
}


async function createPost(e) {

    e && e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const topicName = formData.get('topicName');
    const username = formData.get('username');
    const postContent = formData.get('postText');

    const data = {
        topicName,
        username,
        postContent,
        timeCreated: new Date()
    };

    if (Object.values(data).some(x => x === '')) {
        alert('All fields must be filled!');
        return;
    };

    try {

        const response = await fetch(postUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(!response.ok) {
            const error = await response.json();
            throw new Error(error);
        };

    } catch(err) {
        alert(err.message);
    }

    showHome();
    resetForm();
}


export async function showHome(e) {

    e && e.preventDefault();

    const response = await fetch(postUrl);
    const data = await response.json();

    postContainer.replaceChildren(...
        Object.values(data)
            .map(createPostComponent));


    mainElement.replaceChildren(homeSection);
}








