import { createPostHeader, createCommentStructure } from "./creator.js";

const postUrl = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const commentsUrl = 'http://localhost:3030/jsonstore/collections/myboard/comments';

const mainElement = document.querySelector('#main');
const detailsSection = document.querySelector('#details');

const form = detailsSection.querySelector('form');
const submitBtn = detailsSection.querySelector('button');
const postSection = detailsSection.querySelector('.postWrapper');
const commentsList = detailsSection.querySelector('#comments-list');
const commentSection = detailsSection.querySelector('.comment');

submitBtn.addEventListener('click', onSubmit);

detailsSection.remove();


async function onSubmit(e) {


    e.preventDefault();

    const postId = mainElement.querySelector('.postWrapper')._id;

    const postText = detailsSection.querySelector('textarea').value;
    const username = detailsSection.querySelector('input[name="username"]').value;

    const data = {
        username,
        postText,
        postId: postId,
        date: new Date()
    }

    await makeRequestForComments(data);

    showPost(postId);
    form.reset();
}

async function makeRequestForComments(data) {

    await fetch(commentsUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

}

export async function showDetails(e) {

    e && e.preventDefault();

    let target = e.target;



    if (target.tagName == 'H2') {
        target = e.target.parentNode;
    };

    if (target.tagName == 'A') {
        const id = target.id;
        await showPost(id);
    };
}

async function showPost(postId) {

    const response = await fetch(`${postUrl}/${postId}`);
    const data = await response.json();

    const commentsRes = await fetch(commentsUrl);
    const commentsData = await commentsRes.json();

    const postHeader = createPostHeader(data.topicName, data.username, data.postContent, data.timeCreated);
    postSection._id = postId;


    const filteredComments =
        Object.values(commentsData)
            .filter(x => x.postId == postId)
            .map(createCommentStructure);

    commentsList.replaceChildren(...filteredComments);
    commentSection.replaceChildren(postHeader, commentsList);
    mainElement.replaceChildren(detailsSection);
}