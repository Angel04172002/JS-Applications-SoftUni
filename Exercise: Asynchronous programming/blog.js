function attachEvents() {

    const postTitleElement = document.getElementById('post-title');
    const postBodyElement = document.getElementById('post-body');
    const loadButtonElement = document.getElementById('btnLoadPosts');
    const viewButtonElement = document.getElementById('btnViewPost');
    const postsList = document.getElementById('posts');
    const postCommentsList = document.getElementById('post-comments');


    const postUrl = 'http://localhost:3030/jsonstore/blog/posts';
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

    loadButtonElement.addEventListener('click', loadPosts);
    viewButtonElement.addEventListener('click', viewPosts);

    async function loadPosts() {

        postsList.innerHTML = '';
        const response = await fetch(postUrl);
        const data = await response.json();

        for (let item of Object.values(data)) {

            const optionElement = document.createElement('option');
            optionElement.value = item.id;
            optionElement.textContent = item.title;
            postsList.appendChild(optionElement);
        };
    }


    async function viewPosts(e) {
        
        const currentlySelectedPostId = postsList.value;

        const currentPostResponse = await fetch(postUrl);
        const currentPostData = await currentPostResponse.json();
        const commentsResponse = await fetch(commentsUrl);
        const commentsData = await commentsResponse.json();


        const currentPostComments = Object.entries(commentsData).filter(x => x[1].postId === currentlySelectedPostId);


        postTitleElement.textContent = postsList.options[postsList.selectedIndex].textContent;
        postBodyElement.textContent = currentPostData[currentlySelectedPostId].body;
        postCommentsList.innerHTML = '';
        
        for(let comment of currentPostComments) {
            
            const liElement = document.createElement('li');
            liElement.textContent = comment[1].text;
            postCommentsList.appendChild(liElement);
        }
    }
}

attachEvents();
