function attachEvents() {

    const submitButtonElement = document.getElementById('submit');
    const refreshButtonElement = document.getElementById('refresh');

    const baseUrl = 'http://localhost:3030/jsonstore/messenger';

    submitButtonElement.addEventListener('click', recordMessage);
    refreshButtonElement.addEventListener('click', displayMessages);

    function recordMessage() {

        const author = document.querySelector('input[name="author"]').value;
        const content = document.querySelector('input[name="content"]').value;

        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                author,
                content
            })
        });
    }

    async function displayMessages() {

        const response = await fetch(baseUrl);
        const data = await response.json();
        const messagesTextarea = document.getElementById('messages');
        const messages = Object.values(data);

        messagesTextarea.value = '';

        messages.forEach((x, i) => {
            messagesTextarea.value += `${x.author}: ${x.content}`;

            if(i !== messages.length - 1) {
                messagesTextarea.value += '\n';
            };
        });
    }
}

attachEvents();
